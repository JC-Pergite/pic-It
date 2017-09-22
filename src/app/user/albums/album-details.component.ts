import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Params }  from '@angular/router';

import { ProfileService } from '../profile.service';
import { User } from '../user';
import { Album } from './album';

@Component({
  selector: 'pic-it-album-details',
  template: `
			<h2>{{album.title}}</h2>
			<div id="albums">
				<ul *ngFor="let pic of album?.photos">
					<li>
						<a [routerLink]="['./' + 'photo/' + pic.id]">
							<h4>{{pic.name}}</h4>
						</a>
						<img src={{pic.photoUrl}} width="180" height="160" />
					</li>
				</ul>	
			</div>
  `,
})
export class AlbumDetailsComponent implements OnInit, OnDestroy {
	@Input() album: any;
	user: User[] = [];
	private id: number;
  private alive: boolean = true;

	constructor(private route: ActivatedRoute, private profileService: ProfileService) { }

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

	ngOnDestroy() {
		this.alive = false;
	}

}
	