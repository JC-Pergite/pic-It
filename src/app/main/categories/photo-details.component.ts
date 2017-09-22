import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap }  from '@angular/router';
import { fromJS, Map } from 'immutable';
import { ProfileService } from '../../user/profile.service';
import { CategoryService } from './category.service';
import { Photo } from '../../shared/photo';
import { Comment } from '../../shared/comment';
import { Category } from '../../shared/category';
import { User } from '../../user/user';
import { Album } from '../../user/albums/album';

@Component({
  selector: 'pic-it-photo-details',
  template: `
	<div>
    <button type="button" id="dropdownMenuButton"> 
       {{choice?.title}}
    </button>
		<div>
			<h2>Album Selections Include: </h2>
      <ul *ngFor="let album of albums">
        <li class="dropdown-item" (click)="albumChosen(album)">
        	<h3>{{album.title}}</h3>
        </li>
      </ul>
    </div>
  </div> 
  <div *ngFor="let pic of photo">
    <h2>{{pic.name}}</h2>
	  <button type="button" (click)="addPhoto(pic)">
      Collect!
    </button>
    <img src={{pic.photoUrl}} width="333" height="333" />
    <div class="comentator">
      <label><input class="inputBox" placeholder="Written Thoughts" #newComment /></label>
      <button type="button" (click)="addComment(pic, newComment.value); newComment.value=''">
        Comment
      </button>
    </div>  
    <div class="commentary" *ngFor="let comment of pic?.comments; let i = index; trackBy: trackByFn">
      <ul>
        <li>{{comment}}</li>
      </ul>  
    </div>  
  </div>
  `  
})
export class PhotoDetailsComponent implements OnInit, OnDestroy { 
	albumPhotos: Album[];
	albums: any;
  choice: any;
	photo: Photo[];
	public id: number;
	user: User[] = [];
  private alive: boolean = true;

	constructor(private route: ActivatedRoute, private categoryService: CategoryService,
							private profileService: ProfileService) { }

	ngOnInit(): void {
		this.route.paramMap
  	.switchMap((params: ParamMap) =>
   		 this.categoryService.getPhoto(params.get('id')))
              .takeWhile(() => this.alive)
														.subscribe((pic: Photo[]) => 
														{ 
															this.photo = pic
														});
		this.viewAlbums();
	}

	viewAlbums(): void { 
		let getuser = this.profileService.getCurrentUser();
		this.user.push(getuser);
					this.albums = this.user[0].albums;
	}

  albumChosen(selection): void {
    this.profileService.setUserAlbum(selection);
              this.profileService.currentUserAlbum
                                 .takeWhile(() => this.alive) 
                                 .subscribe(album => 
                                            this.choice = album
                                           );
  }
  
  trackByFn(index, item) {
    return index;
  } 

  addPhoto(newPhoto): void { 
    let currentAlbum = this.choice;
    let pics = currentAlbum.photos;

    if (pics.length) {
      this.id = pics.length + 1 
    } else {
      this.id = 1;
    };                                  

	  let permanentPic = Map({
  		id: newPhoto.id,
  		name: newPhoto.name,
  		type: newPhoto.type,
  		photoUrl: newPhoto.photoUrl,
  		comments: newPhoto.comments
  	});

  	let userPic = permanentPic.merge({
			id: this.id,
			comments: null
  	});
  	
  	let userPhoto = userPic.toObject();
  	pics.push(userPhoto);

  }

	addComment(pic, comment): void { 
    let commentary = pic.comments;
    commentary.push(comment); 
    this.categoryService.newComment(pic)
                     			.subscribe(data => { pic = data }, 
                                		error => { console.log("Battsu!") }
                          );
  }

  ngOnDestroy() {
    this.alive = false; 
  }


  //for Admin to add photo:
    // createPhoto() {

    //        this.profileService
    //       .postPhotoInAlbum(this.choice, userPhoto)
        // .subscribe((results: any) => {
       //      // results[0].albums = results[1];
       //      // this.user = results[0];
       //    
       //                  // this.collection = results // when results equals album
       //                  this.albumPhotos.push(results[0]) // when results equal photos

       //      // console.log(results[1]);
       //                  // console.log(results[0].albums);

       //    });
    // }
}