import { Component, HostBinding } from '@angular/core';
import { Router }                 from '@angular/router';

import { ProfileService } from './user/profile.service';
import { User } from './user/user';
import { Album } from './user/albums/album';

@Component({
  template: `
  <div class="modal create">
    <div class="modal-dialog" role="document">
      <div class="modal-content create">
        <div class="modal-body">
          <label><input class="inputBox create" placeholder="New Album" #newAlbum /></label>
          <p id="create">It's always so hard to pick a name, isn't it {{user[0].name}} ?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-success create" (click)="send(newAlbum.value); 
           newAlbum.value=''">
            Save New
          </button>
          <button type="button" class="btn btn-outline-danger create" data-dismiss="modal"
          (click)="closePopup()">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>   
  `,
  styleUrls: ['./popup.component.css']
})
export class PopupCreateComponent { 
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';
  details: string;
  sending = false;
  album: Album[];
  user: User[] = [];
  public userId: number;

  constructor(private router: Router, private profileService: ProfileService) {
    let getUser = this.profileService.getCurrentUser();
    this.user.push(getUser);
    this.userId = this.user[0].id;
    this.album = this.user[0].albums;
  }

  send(title) {
    this.details = title;
    let makeNew = new Album(null, title, [], this.userId);
    this.album.push(makeNew);  
    this.closePopup();
  }

  closePopup() {
    this.router.navigate([{ outlets: { albumPopUp: null }}]);
  }
}