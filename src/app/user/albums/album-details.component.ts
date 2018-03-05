import { Component, OnInit, OnDestroy, Input, 
		 ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params }  from '@angular/router';

import { ProfileService } from '../profile.service';
import { User } from '../user';
import { Album } from './album';

@Component({
  selector: 'pic-it-album-details',
  template: `
	<h1 class="album-title">{{album?.title}}</h1>
  <div id="main" class="mainDeets container">
		<div id="albums" *ngFor="let pic of album?.photos; let i = index; trackBy: picsTracker">
			<ul class="pics">
				<li>
					<a class="details" [routerLink]="['./' + 'photo/' + pic.id]">
						<h3 class="details">{{pic?.name}}</h3>
					</a>
					<img [routerLink]="['./' + 'photo/' + pic.id]" src="{{pic?.photoUrl}}"
		              alt="Responsive image"  id="img-responsive" />
					<button type="button" *ngIf="album.user_id === this.userId" (click)="deletePhoto(i)"
				 			class="btn btn-outline-danger eliminate">
			            Destroy
			        </button>
			    <li>    
			</ul>	
		</div>
	</div>
  `,
    styleUrls: ['./album-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush  
})
export class AlbumDetailsComponent implements OnInit, OnDestroy {
	@Input() album: Album;
	user: User[] = [];
	public userId: number;
	private id: number;
    private alive: boolean = true;

	constructor(private route: ActivatedRoute, private profileService: ProfileService,
				private ref: ChangeDetectorRef) { 
		let getUser = this.profileService.getCurrentUser();
		this.userId = getUser['id'];
	}

	ngOnInit(): void {
		this.getDetails();
	}
															
	getDetails() {
		this.route.params
	    	.switchMap((params: Params) =>
	     		 this.profileService.currentUser.map((user: any) => 
		   			user.albums.find(album => album.id == params['id'])))
	    	                                   .takeWhile(() => this.alive) 
									   .subscribe((album: any) => { 
											 this.album = album;
									    });									   
		this.setter();
	}

	setter() {
		this.profileService.setUserAlbum(this.album);
	}

	picsTracker(index, item) {
 		if (item.id == undefined || null) {
 			item.id = index;
	        return item.id;
	    } 
	    else {
	    	return index;
	    }
   } 

	deletePhoto(index) { 
   		this.ref.detectChanges();
	    let pics = this.album.photos;
	    let photoId = pics[index].id
	    for (var i = 0; i < pics.length; i++) {
	          if ( photoId === pics[i].id  ) {
	            pics.splice(index, 1);
	          }
	      this.ref.markForCheck();
	    }      
  }

	ngOnDestroy() {
		this.alive = false;
	}
}