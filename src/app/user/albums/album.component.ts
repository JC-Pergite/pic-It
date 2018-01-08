import { Component, OnInit, Input, 
				 ChangeDetectionStrategy, ChangeDetectorRef  } from '@angular/core';
import { ActivatedRoute }  from '@angular/router';
import { SlicePipe, NgClass } from '@angular/common';

import { ProfileService } from '../profile.service';
import { User } from '../user';
import { Album } from './album';

@Component({
  selector: 'pic-it-album',
  templateUrl: './album.component.html',
  styleUrls: ['album.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush  
})
export class AlbumComponent implements OnInit {
	@Input() albums: Album[];
	user: User[] = [];
	usersAlbums;
	choice;
	private id: number;
	public userId: number;
	public start = 0;
  	public end = 3;
  	public chosen: boolean = false;

	constructor(private route: ActivatedRoute, private profileService: ProfileService,
							private ref: ChangeDetectorRef) { }
	
	ngOnInit(): void {
		let getUser = this.profileService.getCurrentUser();
		this.user.push(getUser);
		this.albums = this.user[0].albums;
		this.userId = this.user[0].id;
		console.log(this.userId);
		console.log(this.albums);
  	}

  	albumTracker(index, item) {
	    if (item.id == undefined || null) {
	        item.id = index;
	        return item.id;
	    } 
	    else {
	    	return item.id;
	    }
    } 

  	albumCreator(title) {
		let makeNew = new Album(this.id, title, [], this.userId);
		this.albums.push(makeNew);	
	    this.ref.markForCheck();	
  	}

  	setter(album) {
		this.profileService.setUserAlbum(album);
    }

    albumRanger(value) { 
    	this.chosen = true;
    	let albumPreview = 1 * value;
    	if (albumPreview === 1 && this.albums.length +3) {
    		if(this.albums.length < 6) {
    			this.start += this.albums.length - 3;
    			this.end += this.albums.length - 3;
    		}
    		else {
	    		this.start += 3;
	    		this.end += 3;
    		}
    	}
    	if (albumPreview === 2 && this.albums.length -3 > 0) {
			if(this.albums.length < 6) {
    			this.start -= this.albums.length - 3;
    			this.end -= this.albums.length - 3;
    		}
    		else {
	    		this.start -= 3;
	    		this.end -= 3;
    		} 
    	}
    	else {
    		this.start = 0;
    		this.end = this.albums.length;    	
    	}
    	setTimeout(() => {
    		this.chosen = false;
    	}, 4500);
	    this.ref.markForCheck();	
    }

   	deleteAlbum(index) { 
	   	this.ref.detectChanges();
	    let albumId = this.albums[index].id; 
	    for (var i = 0; i < this.albums.length; i++) {
	          if ( albumId === this.albums[i].id  ) {
	            this.albums.splice(index, 1);
	          }
	      this.ref.markForCheck();
	    }  
  	}
}