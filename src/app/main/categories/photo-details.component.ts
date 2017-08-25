import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap }  from '@angular/router';

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
  	  <div *ngFor="let pic of photos">
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
        <div class="commentary">
          <p>{{pic?.comments}}</p>
        </div>  
      </div>
  `  
})
export class PhotoDetailsComponent implements OnInit { 
	albumPhotos: Album[] = [];
	albums: any;
  choice = '';
  collection: Album;
	photos: Photo[];

	constructor(private route: ActivatedRoute, private categoryService: CategoryService,
							private profileService: ProfileService) { }

	ngOnInit(): void {
			this.route.paramMap
    	.switchMap((params: ParamMap) =>
     		 this.categoryService.getPhoto(params.get('id')))
															.subscribe((pic: Photo[]) => 
															{ 
																{ this.photos = pic}; { console.log(pic) } 
															});
		this.viewAlbums();
	}

	viewAlbums() {
		this.profileService.getAlbums().subscribe(data => this.albums = data);
	}

  albumChosen(album): void {
      this.choice = album;
      this.albumPhotos = album.photos;
  }

  addPhoto(newPhoto): void {
      this.albumPhotos.push(newPhoto);
      this.profileService.addPhoto(this.choice)
          .subscribe(data => this.collection = data)
  }

	addComment(pic, comment): void { // needs alteration for changeDetection trigger
    let commentary = pic.comments;
    commentary.push(comment); 
    this.categoryService.newComment(pic)
                     			.subscribe(data => { pic = data }, 
                                		error => { console.log("Battsu!") }
                          );
  }

}



