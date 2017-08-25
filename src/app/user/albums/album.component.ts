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
					<h3>{{collection?.title}}</h3>
				</a>	
			</div>	
		</div>        
  `
})
export class AlbumComponent implements OnInit {
	@Input() album: Array<Album>;
	private id: number;

	constructor(private route: ActivatedRoute, private profileService: ProfileService) { }

	ngOnInit(): void {
	this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        this.profileService
          .getAlbums()
          	.subscribe(data => this.album = data);
      });
  	}


}

