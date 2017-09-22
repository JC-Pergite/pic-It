import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute }  from '@angular/router';

import { ProfileService } from '../profile.service';
import { User } from '../user';
import { Album } from './album';

@Component({
  selector: 'pic-it-album',
  template: `
	<div *ngFor="let collection of album; let i = index; trackBy: trackByFn">
		<div id="albums">
			<a [routerLink]="['./album/' + collection?.id]">
				<h4>{{collection?.title}}</h4>
			</a>	
		</div>	
	</div>               
  `,
  styleUrls: ['album.component.css']
})
export class AlbumComponent implements OnInit {

	@Input() album: Album[];
	user: User[] = [];
	makeNew: any;
	usersAlbums;
	choice;
	private id: number;

	constructor(private route: ActivatedRoute, private profileService: ProfileService) { }
	
	ngOnInit(): void {
		let getUser = this.profileService.getCurrentUser();
		this.user.push(getUser);
		this.album = this.user[0].albums;
  	}

  trackByFn(index, item) {
   	item.id = index;
    return item.id;
   } 

	albumCreator(info, title) {   
	  this.makeNew = [];
  	this.makeNew = new Album(this.id, title, []);
  	this.album.push(this.makeNew);		
  }

}
