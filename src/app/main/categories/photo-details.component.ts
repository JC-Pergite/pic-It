import { Component, OnInit, OnDestroy, Input,
  ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute, ParamMap, Router }  from '@angular/router';
import { fromJS, Map } from 'immutable';
import { ProfileService } from '../../user/profile.service';
import { CategoryService } from './category.service';
import { Photo } from '../../shared/photo';
import { Comment } from '../../shared/comment';
import { Category } from '../../shared/category';
import { User } from '../../user/user';
import { Album } from '../../user/albums/album';
import { Observable } from 'rxjs/Observable';
   
@Component({
  selector: 'pic-it-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush  
})
export class PhotoDetailsComponent implements OnInit, OnDestroy { 
  albumPhotos: Album[];
  albums: Album[] = []; 
  choice: any;
  selectedAlbum: Album;
  class1 = true;
  green = false;
  @Input() photos: Photo[] = [];
  private paramId: number;
  public id: number;
  user: User[] = [];
  private alive: boolean = true;
  public albumsExist: boolean = false;
  public likes: number;
  trendiest = this.categoryService.getCoolLimiter();
  public userId: number;
  whenClicked = [true];
  likerId: number;
  beenLiked: boolean;
  private lovingIt: boolean = false;
  public noMore: boolean = false;
  public noLess: boolean = false;
  currentCategory: Category[] = [];

  constructor(private route: ActivatedRoute, private categoryService: CategoryService, 
              private profileService: ProfileService, private ref: ChangeDetectorRef, 
              private router: Router) { 

       this.route.parent.params.takeWhile(() => this.alive)
                        .subscribe(params => this.paramId = +params['id']); 
                        let currentCat = this.categoryService.getCurrentCats();
                        if(!currentCat.length) {
                          this.currentCategory.push(currentCat);
                        }
                        else {
                          this.currentCategory = currentCat;
                        }
                        // console.log(Object.is(currentCat, this.currentCategory));

  }                      

  ngOnInit(): void { 
    let be = this.categoryService.getCurrentComments();
    this.photos.push(be);    
    this.likeOmeter(this.photos[0]);
    this.viewAlbums();
    this.ref.markForCheck();
  }

  viewAlbums(): void { 
    let getuser = this.profileService.getCurrentUser();
    this.user.push(getuser);
    this.userId = this.user[0].id;
    if (this.user[0].albums != undefined && this.user[0].albums.length != 0) {
      this.albumsExist = true;
      this.albums = this.user[0].albums;
      this.ref.detectChanges();
    }
    this.ref.markForCheck();
  }

  newAlbum() {
    this.router.navigate([{ outlets: { albumPopUp: ['createAlbum'] } }]);
    setTimeout(() => {
      this.albumsExist = true;
      this.albums = this.user[0].albums;
      this.ref.markForCheck();
    }, 4500);
      this.ref.markForCheck();
  }

  albumChosen(selection: Album): void {
    this.profileService.setUserAlbum(selection);
    this.selectedAlbum = selection;
    this.profileService.currentUserAlbum
                         .takeWhile(() => this.alive) 
                         .subscribe(album => {
                           this.choice = album ;
                         });                          
  }
  
  trackByFn(index, item) {
    if (item.id != undefined) {
        return item.id
    } 
    else {  
       item.id = index;
        return item.id; 
    }  
  } 

  // trackLikers(index, item) {
  //    return item.name;
  // } 

  likeOmeter(photo) {
     if(photo.likes.user_id == [] || undefined || null){
            photo.likes.user_id.push(10);
    }
      if(photo.likes.likes == undefined){
            photo.likes.likes = 0;
      this.likes = photo.likes.likes;
    }
    else {
      this.likes = photo.likes.likes; 
      if(photo.likes.user_id.find((user: User) => user.id !== this.userId)) {
        this.beenLiked = true;
        this.lovingIt = true;
        this.whenClicked = [false];
      }
      else {
        this.beenLiked = false;
        this.lovingIt = false;
        this.whenClicked = [true];
      }   
      this.ref.markForCheck(); 
    }
  }

  likedBy(pic) {
    let photoLiker = this.photos[0].likes.user_id;
    if(photoLiker.find((user: User) => user.id === this.userId)) {
    }
    else {
      photoLiker.push(this.user[0]);
      this.photos[0].likes.likes += 1;
      this.likes = this.photos[0].likes.likes;
    };
    if(this.likes > this.trendiest) {
      this.categoryService.setTrending(pic);          
    }
    this.lovingIt = true;
    this.beenLiked = true;
    this.ref.markForCheck();
  }

  likers() {
      this.router.navigate([{ outlets: { likersPopUp: ['viewLikers'] } }]);
  }

  noBueno(pic) {
    let photoLiker = this.photos[0].likes.user_id;
    for (var i = 0; i < photoLiker.length; i++) {
      let noLikey = photoLiker.indexOf(photoLiker[i]);
      if(noLikey != -1) {
        photoLiker.splice(noLikey, 1);
      }
      this.ref.markForCheck();
    }
    this.beenLiked = false;
  }

  addPhoto(newPhoto): void { 
    let pics = this.choice.photos;
    this.green = true;
    if(pics.find((photo: Photo) => photo.name === newPhoto.name )) {   
        console.log("Whoops; duplicate!");
    }
    else {
      let permanentPic = Map({
        id: newPhoto.id,
        name: newPhoto.name,
        type: newPhoto.type,
        photoUrl: newPhoto.photoUrl,
        comments: newPhoto.comments
      });
      let userPic = permanentPic.merge({
        id: this.id,
        comments: null,
      });
      let userPhoto = userPic.toObject();
      pics.push(userPhoto);
      this.profileService.setUserAlbum(this.choice);
    };
  }

  addComment(comment): void { 
    let commentary = this.photos[0].comments;
    let makeNew = new Comment(this.id, comment, this.photos[0].id, this.user[0].id); 
    commentary.push(makeNew)
    this.ref.markForCheck();
  }

  deleteComment(comment, index) { 
    this.ref.detectChanges();
      let commentary = this.photos[0].comments;
      let commentId = commentary[index].id
      for (var i = 0; i < commentary.length; i++) {
            if ( commentId === commentary[i].id  ) {
              commentary.splice(index, 1);
            }
            this.ref.markForCheck();
      }      
  }

  forward() {
    let nextId = this.photos[0].id + 1; 
    let nextPic = this.currentCategory[0].photos[nextId];
    let finalPic = this.currentCategory[0].photos.length; 
    if(nextId >= finalPic) {
      this.noMore = true;
    }
    else {
      this.router.navigate(['/categories/' + this.currentCategory[0].id + '/photo/' + nextId]);
      this.photos.splice(0, 1, nextPic);
      this.categoryService.setPhotoComments(nextPic);
      this.likeOmeter(this.photos[0]);  
      this.ref.markForCheck();
    }
  }

  backwards() {
    let priorId = this.photos[0].id - 1;
    let priorPic = this.currentCategory[0].photos[priorId];
    if(priorId < 0) {
      this.noLess = true;
    }
    else {
      this.router.navigate(['/categories/' + this.currentCategory[0].id + '/photo/' + priorId]);
      this.photos.splice(0, 1, priorPic);
      this.categoryService.setPhotoComments(priorPic);
      this.likeOmeter(this.photos[0]);  
      this.ref.markForCheck();
    }
  }
  
  ngOnDestroy() {
    this.alive = false; 
  }
}