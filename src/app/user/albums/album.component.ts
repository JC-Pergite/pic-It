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
		this.user = Array(this.profileService.getCurrentUser());
		this.albums = this.user[0].albums;
		this.userId = this.user[0].id;
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
    	console.log(value)
  //   	let albumPreview = 1 * value;
  //   	    	console.log(albumPreview)
  //   	if (albumPreview === 1) {
	 //    		this.start += 1;
	 //    		this.end += 1;
  //   				    this.ref.markForCheck();	
  //   	}
  //   	if (albumPreview === 2) {
	 //    		this.start -= 1;
	 //    		this.end -= 1;
	 //    		    			console.log('if2', this.start, this.end)
  //   				    		    			console.log('else2', albumPreview)

  //   				    this.ref.markForCheck();	
  //   	}
		// if (albumPreview === 3) {
  //   		this.start = 0;
  //   		this.end = this.albums.length;  
  //   			    		    			console.log('else', this.start, this.end)
	 //    				    		    			console.log('else', albumPreview)

  //   				    this.ref.markForCheck();	
  //   	}
  //   	    				    // this.ref.markForCheck();	
  //   	    				    console.log(this.start, this.end)
    	// setTimeout(() => {
    	// 	this.chosen = false;
    	// 			    this.ref.markForCheck();	
    	// }, 1100);
	    // this.ref.markForCheck();	
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