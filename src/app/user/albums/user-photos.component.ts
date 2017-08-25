import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap }  from '@angular/router';

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
        <div class="commentary">
          <p>{{pic?.comments}}</p>
        </div>  
      </div>
  `  
})
export class UserPhotosComponent implements OnInit {

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
  }

  addComment(pic, comment){  
    let commentary = pic.comments;
    commentary.push(comment); 
    this.categoryService.newComment(pic) 
                           .subscribe(data => { pic = data }, 
                                error => { console.log("Battsu!") } 
                           );
  }

} 
