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
  private choice: any;
  selectedAlbum: Album;
  @Input() photos: Photo[] = [];
  private paramId: number;
  public id: number;
  user: User[];
  private alive: boolean = true;
  public albumsExist: boolean = false;
  public likes: number;
  trendiest = this.categoryService.getCoolLimiter();
  private userId: number;
  whenClicked = [true];
  private beenLiked: boolean = false;
  private lovingIt: boolean = false;
  private noMore: boolean;
  private noLess: boolean;
  currentCategory: Category[] = [];
  private guest: boolean = true;
  private guestLiked: boolean = false;
  private guestAttempted: boolean = false;
  popup: boolean = false;

  constructor(private route: ActivatedRoute, private categoryService: CategoryService, 
              private profileService: ProfileService, private ref: ChangeDetectorRef, 
              private router: Router) 
  { 
                this.guest = this.profileService.guest;
                if(!this.guest){
                  this.user = Array(this.profileService.getCurrentUser());
                  this.userId = this.user[0].id;
                }
                this.currentCategory = this.categoryService.getCurrentCats();
  }                      

  ngOnInit(): void { 
    this.photos = Array(this.categoryService.getCurrentComments());  
    if(!this.guest){
      this.viewAlbums();
    }
    this.likeOmeter(this.photos[0]);
    this.ref.markForCheck();
  }

  viewAlbums(): void { 
    if (this.user[0].albums != undefined && this.user[0].albums.length != 0) {
      this.albumsExist = true;
      this.albums = this.user[0].albums;
      this.ref.detectChanges();
      this.ref.markForCheck();
    }
  }

  newAlbum() {
    this.albums = this.user[0].albums;
    this.albumsExist = true;
    let original = this.albums.length;
    this.router.navigate([{ outlets: { albumPopUp: ['createAlbum'] } }]);
    this.popup = true;
    let creator = setInterval(() => {
      if(this.albums.length > original) {
        this.popup = false;
        clearInterval(creator);
      }
      this.ref.markForCheck();
    }, 1500);
    this.ref.markForCheck();
  }

  albumChosen(selection: Album): void {
    this.profileService.setUserAlbum(selection);
    this.profileService.currentUserAlbum
                         .takeWhile(() => this.alive) 
                         .subscribe(album => {
                           this.selectedAlbum = album;
                           this.ref.markForCheck();                        
                         }); 
    this.ref.markForCheck();                        
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

  likeOmeter(photo) {
    if(photo.likes.user_id == [] || undefined || null){
        photo.likes.user_id.push(10);
    }
    if(photo.likes.likes == undefined){
        photo.likes.likes = 0;
        this.likes = photo.likes.likes;
        this.ref.markForCheck(); 
    }
    else {
      this.likes = photo.likes.likes; 
      if(photo.likes.user_id.find((user: User) => user.id == this.userId)) {
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
    if(!this.guest){
      let photoLiker = this.photos[0].likes.user_id;
      photoLiker.push(this.user[0]);
      this.photos[0].likes.likes += 1;
      this.likes = this.photos[0].likes.likes;
      this.ref.markForCheck();
      if(this.likes > this.trendiest) {
        this.categoryService.setTrending(pic);          
      }
      setTimeout(() => {
        this.lovingIt = true;
        this.beenLiked = true;
        this.ref.markForCheck();
      }, 1500);
    }
    else {
      this.guestLiked = true;
      setTimeout(() => {
         this.guestLiked = false;  
         this.whenClicked = [true];
         this.ref.markForCheck();
      }, 2000);
      this.ref.markForCheck();
    }
  }

  likers() {
      this.router.navigate([{ outlets: { likersPopUp: ['viewLikers'] } }]);
  }

  noBueno(pic) {
    let photoLiker = this.photos[0].likes.user_id;
    for (var i = 0; i < photoLiker.length; i++) {
      let noLikey = photoLiker.indexOf(photoLiker[i]);
      if(noLikey != -1) {
        this.photos[0].likes.likes -= 1;
        this.likes = this.photos[0].likes.likes;
        photoLiker.splice(noLikey, 1);
        this.lovingIt = false;
        this.beenLiked = false;
        this.whenClicked = [false];
        this.ref.markForCheck();
      }
    }
  }

  addPhoto(newPhoto): void { 
    if (!this.guest) {
      if(this.selectedAlbum.photos.find((photo: Photo) => photo.name === newPhoto.name )) {   
          console.log("Whoops; duplicate!");
      }
      else {
        this.choice = this.selectedAlbum;
        let pics = this.choice.photos;
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
      this.ref.markForCheck();
    }
    else {
      this.guestAttempted = true;
      setTimeout(() => {
         this.guestAttempted = false;  
         this.whenClicked = [true];
         this.ref.markForCheck();
      }, 2000);
      this.ref.markForCheck();
    }
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
    let nextId = this.currentCategory[0]['photos'].indexOf(this.photos[0]) + 1; 
    let nextPic = this.currentCategory[0]['photos'][nextId];
    let finalPic = this.currentCategory[0].photos.length; 
    if(nextId >= finalPic) {
      this.noMore = true;
    }
    else {
      this.router.navigate(['/categories/' + this.currentCategory[0].id + '/photo/' + nextPic.id]);
      this.photos.splice(0, 1, nextPic);
      this.categoryService.setPhotoComments(nextPic);
      this.likeOmeter(this.photos[0]);
      if(this.noLess) {
        this.noLess = false;
      }  
      this.ref.markForCheck();
    }
  }

  backwards() {
    let priorId = this.currentCategory[0]['photos'].indexOf(this.photos[0]) - 1;
    let priorPic = this.currentCategory[0]['photos'][priorId];
    if(priorId < 0) {
      this.noLess = true;
    }
    else {
      this.router.navigate(['/categories/' + this.currentCategory[0].id + '/photo/' + priorPic.id]);
      this.photos.splice(0, 1, priorPic);
      this.categoryService.setPhotoComments(priorPic);
      this.likeOmeter(this.photos[0]);
      if(this.noMore) {
        this.noMore = false;
      }
      this.ref.markForCheck();
    }
  }
  
  ngOnDestroy() {
    this.alive = false; 
  }
}