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
		<div class="frame">
			<div class="mystic" [ngClass]="{'poof': whenOneDoorCloses}">
		      <h2 class="userName">{{info.name}}</h2>
		    </div>  
      	</div>  
		<div id="bio">
			<h3 class="myBio">Bit Of Me </h3>
			<p class="text-warning bio">{{info?.bio}}</p>
		</div>	
			<br>
			<br/>
			<pic-it-album #albumy></pic-it-album>
			<br>
			<br/>
			<div class="newAlbum">
				<label>
				  <input class="inputBox" type="album" placeholder="{{placeAlbum}}" #newAlbum 
				  [attr.maxLength]="7"/>
				</label>
				<button type="button" (click)="goGet(info, newAlbum.value); 
				 newAlbum.value=''" class="btn btn-outline-success">
			 	   Create Album
				</button>
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
	public whenOneDoorCloses: boolean = false;
  	private alive: boolean = true;
  	public placeAlbum: string = "New Album Name";

	constructor(private router: Router, private route: ActivatedRoute,
				private profileService: ProfileService, public authService: AuthService) { }

	ngOnInit(): void {

   		this.profileService.currentUser.takeWhile(() => this.alive)
   																	 .subscribe((data: User) => { 
   																	 	this.user.push(data);
   																	 });
		
		if(this.authService.firstLogIn == true)  { 	
			this.whenOneDoorCloses = true;																 
			setTimeout(() => {
		 	  this.whenOneDoorCloses = false;																 
              this.authService.firstLogIn = false;
			}, 2000);	
		}
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