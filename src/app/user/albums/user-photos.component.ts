import { Component, OnInit, Input, OnDestroy,
         ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params, Router}  from '@angular/router';

import { ProfileService } from '../profile.service';
import { CategoryService } from '../../main/categories/category.service';
import { Photo } from '../../shared/photo';
import { Comment } from '../../shared/comment';
import { User } from '../user';
import { Album } from './album';

@Component({
  selector: 'pic-it-user-photos',
  templateUrl: './user-photos.component.html',
  styleUrls: ['./user-photos.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush  
})
export class UserPhotosComponent implements OnInit, OnDestroy {

  @Input() photos: Photo[] = [];
  private id: number;
  private alive: boolean = true;
  user: User[] = [];
  private userId: number;
  album: Album[] = [];
  commentary: string[];
  private albumId: number;
  public noMore: boolean = false;
  public noLess: boolean = false;
  
  constructor(private route: ActivatedRoute, private router: Router, 
              private categoryService: CategoryService,
              private profileService: ProfileService, private ref: ChangeDetectorRef) { 
      this.user = Array(this.profileService.getCurrentUser());
      this.userId = this.user[0].id;
      this.album.push(this.profileService.getCurrentAlbum());
  }

  ngOnInit(): void { 
    this.photos = [];
    this.searchIt();
    this.albumId = this.album[0].id;
  }

  searchIt(): void {  
    this.route.params
    .switchMap((params: Params) =>
        this.profileService.currentUserAlbum.map((album: any) => 
         album.photos.find(photo => photo.id == params['id'])))
                            .takeWhile(() => this.alive)
                            .subscribe((photo: Photo) => { 
                               this.photos.push(photo);
                               this.ref.markForCheck();
                            });
  }
          
  commentTracker(index, item) {
    if (item.id != undefined || null) {
        return item.id
    } 
    else {  
       item.id = index;
        return item.id; 
    }  
  } 

  addComment(pic, comment): void { 
    if (pic.comments != null) {
      let makeNew = new Comment(this.id, comment, pic.id, this.user[0].id); 
      pic.comments.push(makeNew);
    } 
    else {
      pic.comments = [];
      let makeNew = new Comment(this.id, comment, pic.id, this.user[0].id); 
      pic.comments.push(makeNew); 
    }
    this.ref.markForCheck();
  }

  deleteComment(index) { 
   this.ref.detectChanges();
    let commentary = this.photos[0].comments;
    let commentId = commentary[index].id
    for (var i = 0; i < commentary.length; i++) {
          if ( commentId === commentary[i].id  ) {
            commentary.splice(index, 1);
            this.ref.markForCheck();
          }
    }      
  }

  deletePhoto(pic, index) { 
    let pics = this.album[0].photos;
    let prev = pics.indexOf(pic);
    if(prev != -1) {
      pics.splice(prev, 1);
    }
    if(pics.length == 0) {
      this.router.navigate(['/profile']);
    } 
    else {
      this.router.navigate(['/profile/album', this.albumId ]);
    } 
    this.ref.markForCheck();
  }

  forward(pic: Photo) {
    let nextPic = pic.id + 1;
    let finalPic = this.album[0].photos.length; 
    if(nextPic >= finalPic) {
      this.noMore = true;
    }
    else {
      this.router.navigate(['/profile/album/' + this.albumId + '/photo/' + nextPic]);
      this.photos = [];
      if(this.noLess) {
        this.noLess = false;
      }
      this.ref.markForCheck();
    }
  }

  backwards(pic: Photo) {
    let priorPic = pic.id - 1;
    if(priorPic < 0) {
      this.noLess = true;
    }
    else {
     this.router.navigate(['/profile/album/' + this.albumId + '/photo/' + priorPic]);
     this.photos = [];
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