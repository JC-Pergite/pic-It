import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap }  from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ProfileService } from '../profile.service';
import { User } from '../user';
import { Album } from './album';

@Component({
  selector: 'pic-it-album',
  template: `
<div *ngFor="let collection of album">
			<div id="albums">
				<a [routerLink]="['./album/' + collection.id]">
					<h4>{{collection?.title}}</h4>
				</a>	
			</div>	
		</div>               
  `,
      styleUrls: ['album.component.css']
})
export class AlbumComponent implements OnInit {
	@Input() album: Album;
	usersAlbums;
	choice;
	private id: number;

	constructor(private route: ActivatedRoute, private profileService: ProfileService) { }
	
	ngOnInit(): void {
			this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        this.profileService
          .getAlbums()
				.subscribe(data =>  {
					{ this.album = data }                           

      			})
		});
  	}

   trackByFn(index, item) {
    return item.id;
   } 

   albumCreator(info, title) { 
      let makeNew = new Album(this.id, title, []);
      this.usersAlbums = [];
      this.profileService.addAlbum(makeNew)
          								 .subscribe(newAlbum =>  
	           									{ this.usersAlbums.push(newAlbum); console.log(this.usersAlbums) },                            
	                     			  error => { console.log("Battsu!"); },
					                    () => {
					                     		this.choice = this.usersAlbums[this.usersAlbums.length -1];
					                     		info.albums.push(this.choice) 
					                    });
  }

}

