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
	albumCreated: boolean = false;

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
		this.albumCreated = true;		
		setTimeout(()=> {
				this.albumCreated = false;
			    this.ref.markForCheck();	
			}, 2000);	
	    this.ref.markForCheck();	
  	}

  	setter(album) {
		this.profileService.setUserAlbum(album);
    }

    albumRanger(value) { 
    	let albumPreview = 1 * value;
    	let length = this.albums.length;
    	switch(albumPreview) {
		    case 1:
		        if (length < 6) {
		    		if(this.end <= length -2) {
		    			this.start += length - this.end;
			    		this.end += 2;
		    		}
		    		else {
    		    		this.start += 2;
		    		}
    			}
	    		else {
			    	let halfish = Math.round(length / 2);
		    		if(halfish%2 == 0 && length < this.end +3) {
		    			let compromise = Math.abs(length - this.end);
		    			this.start += compromise;
		    			this.end += compromise;
		    			if(Math.abs(this.start - this.end) <= 2) {
	    					this.end += Math.abs(this.start - this.end);
		    			}
		    			if(Math.abs(this.start - this.end) > 3) {
		    				this.end -= Math.abs(this.start - this.end);
		    			}
		    		}
		    		else {
			    		this.start += 3;
			    		this.end += 3;    			
		    		}
	    		}
			    this.ref.markForCheck();	
		        break;
		    case 2:
		        if(length >= 6 && 0 <= this.start -2) {
	    			if(0 > this.start -2 ){
		    			this.start = 0;
	    			}
	    			else {
	    				this.start -= 2;
	    			}
	    			this.end -= 2;
	    		}
	    		if(this.start == 0 && this.end == length) {
			    	let halfish = Math.round(length / 2);
	    			this.end -= halfish; 
	    			if(Math.abs(this.start - this.end) <= 2) {
	    				this.end += 1;
	    			}
	    			if(Math.abs(this.start - this.end) > 3) {
	    				this.end -= 1;
	    			}
	    		}
    	    	if(length < 6 && 0 <= this.start -2 && this.end >= this.start +2) {
    				this.start -= length - this.end;
	    			this.end -= this.start;
	    		} 
		    	if (length < 6 && this.start != 0) {
		    			this.start -= 2;
	    				this.end -= 2;
		    	}
		    	this.ref.markForCheck();
		        break;
	        case 3:
		        this.start = 0;
	    		this.end = this.albums.length;  
			    this.ref.markForCheck();
		        break;
		    default:
				if(this.end > length || this.start < 0) {
		    		this.start = 0;
		    		this.end = 3;
				}
				if(this.end < 3  || this.start < 0) {
		    		this.start = 0;
		    		this.end = 3;
				}
			    this.ref.markForCheck();			
		}		
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