import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute }  from '@angular/router';

import { ProfileService } from './profile.service';
import { User } from './user';
import { AlbumComponent } from './albums/album.component';

@Component({
  selector: 'pic-it-profile',
  template: `
		<div *ngFor="let info of user">
			<h1>{{info.name}}</h1>
			<p>My Bio: {{info.bio}}</p>
			<h3>My Albums:</h3>
			<br>
			<br/>
			<pic-it-album #albumy></pic-it-album>
			<br>
			<br/>
			<div class="newAlbum">
				<label>
				  <input class="inputBox" placeholder="New Album Name" #newAlbum />
				</label>
				<button type="button" (click)="goGet(info, newAlbum.value); 
				 newAlbum.value=''">
			 	   Create Album
				</button>
			</div>	
		</div>	
  `
})
export class ProfileComponent implements OnInit, OnDestroy {

	@ViewChild(AlbumComponent)
 	private albumy: AlbumComponent;
	user: User[] = [];
  private alive: boolean = true;

	constructor(private route: ActivatedRoute, private profileService: ProfileService) { }

	ngOnInit(): void {
   		this.profileService.currentUser.takeWhile(() => this.alive)
   																	 .subscribe((data: User) => this.user.push(data));								
	}	

	goGet(info, title) {
		this.albumy.albumCreator(info, title);
	}

	ngOnDestroy() {
		this.alive = false;
	}

}
