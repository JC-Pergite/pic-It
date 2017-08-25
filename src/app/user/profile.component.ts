import { Component, OnInit } from '@angular/core';
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
			<h2>Albums</h2>
			<pic-it-album *ngFor="let album of info?.albums" [album]="albums | async">	
			</pic-it-album>
			<div class="newAlbum">
				<label>
				  <input class="inputBox" placeholder="New Album Name" #newAlbum />
				</label>
				<button type="button" (click)="albumCreator(info, newAlbum.value); 
				 newAlbum.value=''">
			 	   Create Album
				</button>
			</div>	
		</div>	
  `
})
export class ProfileComponent implements OnInit {

	usersAlbums;
	user: User;
	choice;
	private id: number;

	constructor(private profileService: ProfileService) { }

	ngOnInit(): void {
   	this.profileService.getUsers()
   	.subscribe( 
   		profile =>  this.user = profile
		);
	}	

	userUpdate(userInfo, entry) {
		console.log(userInfo);
				console.log(entry);

 		userInfo.albums.push(entry);
 		this.profileService.updateUser(userInfo)
 												.subscribe(data => {
										 				{ this.user = data }; {console.log(data)} 
 												});
 	}

	albumCreator(info, title) { 
      let makeNew = new Album(this.id, title, []);
      this.usersAlbums = [];
      this.profileService.addAlbum(makeNew)
          								 .subscribe(newAlbum =>  
	           									{ this.usersAlbums.push(newAlbum); console.log(this.usersAlbums) },                            
	                     			  error => { console.log("Batsu!"); },
					                    () => {
					                     		this.choice = this.usersAlbums[this.usersAlbums.length -1];
					                     		this.userUpdate(info, this.choice) 
					                    });
  }

}

