import { Component, HostBinding, Input } from '@angular/core';
import { Router }                 from '@angular/router';

import { CategoryService } from './main/categories/category.service';
import { Photo } from './shared/photo';

@Component({
  template: `
    <div class="modal likers">
      <div class="modal-dialog" role="document">
        <div class="modal-content likers">
          <div *ngIf="!(photo.likes.user_id).length; then viewer else participant"></div>
          <ng-template #participant>
            <div class="modal-body" *ngFor="let liker of photo.likes?.user_id; let i = index; 
              trackBy: trackLikers">
              <ul class="likerList">
                <li class="likers">{{liker?.name}}</li>
                <li class="likers">Max</li>
                <li class="likers">Joe</li>
                <li class="likers">Matthew</li>
                <li class="likers">Aron</li>
                <li class="likers">Billy</li>
                <li class="likers">Alejandro</li>
                <li class="likers">Jimmy</li>
                <li class="likers">Karen</li>
                <li class="likers">Jack</li>
                <li class="likers">Will</li>
                <li class="likers">Grace</li>
                <li class="likers">Katherine</li>
              </ul>        
           </div>
         </ng-template>
         <ng-template #viewer>
            <div class="modal-body">
              <ul class="likerList">
                <li class="likers">Max</li>
                <li class="likers">Joe</li>
                <li class="likers">Matthew</li>
                <li class="likers">Aron</li>
                <li class="likers">Billy</li>
                <li class="likers">Alejandro</li>
                <li class="likers">Jimmy</li>
                <li class="likers">Karen</li>
                <li class="likers">Jack</li>
                <li class="likers">Will</li>
                <li class="likers">Grace</li>
                <li class="likers">Katherine</li>
              </ul>        
           </div>
         </ng-template>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-danger likers" data-dismiss="modal"
            (click)="close()">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>   
  `,
  styleUrls: ['./popup.component.css']
})
export class PopupLikersComponent { 
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';
  @Input() photo: Photo[];

  constructor(private router: Router, private categoryService: CategoryService) {
    let currentPic = this.categoryService.getCurrentComments();
    this.photo = currentPic;
  }

  trackLikers(index, item) {
     return item.name;
  } 

  close() {
    this.router.navigate([{ outlets: { likersPopUp: null }}]);
  }
}