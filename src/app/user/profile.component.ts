import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute }  from '@angular/router';

import { ProfileService } from './profile.service';
import { User } from './user';
import { Album } from './albums/album';
import { Photo } from '../shared/photo';
import { AlbumComponent } from './albums/album.component';

@Component({
  selector: 'pic-it-profile',
  template: `
    <div>
    	<a [routerLink]="['/categories']">Category</a>
    </div>
		<div *ngFor="let info of user">
			<h1>{{info.name}}</h1>
			<p>{{info.bio}}</p>
			<h3>My Albums:</h3>
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
		<pic-it-album #albumy></pic-it-album>
		</div>	
  `
})
export class ProfileComponent implements OnInit {
	@ViewChild(AlbumComponent)
 	private albumy: AlbumComponent;

	user: User;

	constructor(private profileService: ProfileService) { }

	ngOnInit(): void {
   	this.profileService.getUsers()
   	.subscribe( 
   		profile =>  this.user = profile
		);
	}	

	goGet(info, title) {
		this.albumy.albumCreator(info, title);
	}

}


