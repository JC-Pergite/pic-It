import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute }  from '@angular/router';

import { ProfileService } from './profile.service';
import { AuthService }      from './auth.service';
import { User } from './user';
import { AlbumComponent } from './albums/album.component';
import { Album } from './albums/album';


@Component({
  selector: 'pic-it-profile',
  template: `
	<div *ngFor="let info of user">
		<div id="bio">
	      	<h2 class="userName">
	      		<span class="quote">"A wonderful picturebook as curated by </span>
	      		{{info.name}}"
	      	</h2>
			<p class="about">- {{info?.bio}}</p>
		</div>	
			<pic-it-album #albumy></pic-it-album>

			<div id="newAlbum" class="card mb-3">
				<label class="card-header createAlbum">
					  <input class="inputBox" type="album" placeholder="{{placeAlbum}}" #newAlbum 
					  [attr.maxLength]="15"/>
				</label>
				<div class="card-body createAlbum">
					<button type="button" (click)="goGet(info, newAlbum.value); newAlbum.value=''" 
						class="btn btn-outline-success">
						+
					</button>
			  </div>
			</div>	
	</div>			
  `,
   styleUrls: ['profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {

	@ViewChild(AlbumComponent)
 	private albumy: AlbumComponent;
	user: User[] = [];
	@Input() albums: Album[];
	private alive: boolean = true;
	public placeAlbum: string = "Add Album Name";

	constructor(private router: Router, private route: ActivatedRoute,
				private profileService: ProfileService, public authService: AuthService) { }

	ngOnInit(): void {
   		this.profileService.currentUser.takeWhile(() => this.alive)
   																	 .subscribe((data: User) => { 
   																	 	this.user.push(data);
   																	 });		
	}	

	goGet(info, title) {
		if(title.length) {
			this.albumy.albumCreator(title);
		}
		else {
			this.placeAlbum = "Umm..Name Me?";
			setTimeout(()=> {
				this.placeAlbum = "New Album Name";
			}, 2500);
		}
	}

	logout() {
	    this.authService.logout();
		this.router.navigate(['/categories']);  
  	}

	ngOnDestroy() {
		this.alive = false;
	}
}