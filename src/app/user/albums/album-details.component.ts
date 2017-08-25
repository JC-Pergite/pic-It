import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap }  from '@angular/router';

import { ProfileService } from '../profile.service';
import { User } from '../user';
import { Album } from './album';

@Component({
  selector: 'pic-it-album-details',
  template: `
    <div *ngFor="let albumm of album">
					<h3>{{albumm?.title}}</h3>
			<div id="albums">
				<ul *ngFor="let pic of albumm?.photos">
					<li>
						<a [routerLink]="['./' + 'photo/' + pic.id]">
							<h4>{{pic.name}}</h4>
						</a>
						<img src={{pic.photoUrl}} width="180" height="160" />
					</li>
				</ul>	
			</div>
	</div>			
  `,
})
export class AlbumDetailsComponent implements OnInit {
	user: User;
	album: Album[];

	constructor(private route: ActivatedRoute, private profileService: ProfileService) { }

	ngOnInit(): void {
		this.getDetails();
	}

	getDetails() {
		this.route.paramMap
    	.switchMap((params: ParamMap) =>
     		 this.profileService.getAlbum(params.get('id')))
															.subscribe((album: Album[]) => { 
																{ this.album = album}; { console.log(album) } 
															});
	}

}	