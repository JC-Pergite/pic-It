import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute }  from '@angular/router';

import { ProfileService } from '../../user/profile.service';
import { CategoryService } from './category.service';
import { Photo } from '../../shared/photo';
import { Comment } from '../../shared/comment';
import { Category } from '../../shared/category';
import { User } from '../../user/user';

@Component({
  selector: 'pic-it-photo-details',
  template: `
  	  

  `  
})
export class PhotoDetailsComponent { }