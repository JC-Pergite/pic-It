import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params}  from '@angular/router';

import { ProfileService } from '../profile.service';
import { CategoryService } from '../../main/categories/category.service';
import { Photo } from '../../shared/photo';
import { Comment } from '../../shared/comment';
import { User } from '../user';
import { Album } from './album';

@Component({
  selector: 'pic-it-user-photos',
  template: `
  <div *ngFor="let pic of photos">
    <h2>{{pic.name}}</h2>
    <img src={{pic.photoUrl}} width="333" height="333" />
    <div class="comentator">
      <label><input class="inputBox" placeholder="Written Thoughts" #newComment /></label>
      <button type="button" (click)="addComment(pic, newComment.value); newComment.value=''">
        Comment
      </button>
    </div>  
    <div class="commentary" *ngFor="let comment of pic?.comments; let i = index; trackBy: trackByFn">
      <ul>
        <li>{{(comment)?.content | json}}</li>
      </ul>        
    </div>  
  </div>
  `  
})
export class UserPhotosComponent implements OnInit, OnDestroy {

  @Input() photos: Photo[] =[];
  private id: number;
  private album: any; 
  private alive: boolean = true;
  
  constructor(private route: ActivatedRoute, private categoryService: CategoryService,
              private profileService: ProfileService) { }

  ngOnInit(): void { 
    this.photos = [];
    this.searchIt();
  }

  searchIt(): void {  
    this.route.params
    .switchMap((params: Params) =>
        this.profileService.currentUserAlbum.map((album: any) => 
         album.photos.find(photo => photo.id == params['id'])))
                            .takeWhile(() => this.alive)
                            .subscribe((photo: Photo) => { 
                               this.photos.push(photo);
                            });
  }
          
  trackByFn(index, item) {
    item.id = index;
    return item.id;
   } 

  addComment(pic, comment): void { 
    let commentary = pic.comments;
    if (pic.comments != null) {
      let makeNew = new Comment(this.id, comment); 
      pic.comments.push(makeNew);
    } 
    else {
      pic.comments = [];
      let makeNew = new Comment(this.id, comment); 
      pic.comments.push(makeNew); 
    }
  }
  
  ngOnDestroy() {
    this.alive = false;
  }

} 