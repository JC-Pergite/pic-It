import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, ParamMap }  from '@angular/router';

import { CategoryService } from './category.service';
import { Category } from '../../shared/category';
import { Observable } from 'rxjs/Observable';
import { Photo } from '../../shared/photo';

@Component({
  selector: 'pic-it-category-details',
  template: `
  <div>
		<div *ngFor="let type of category | async">
			<h1 class="type-title">{{type.name}}</h1>
      <div id="main" class="mainDeets container">
  			<div *ngFor="let pic of type?.photos" id="pictures">
  				<ul class="pics"> 
  					<img [routerLink]="['./' + 'photo/' + pic.id]" src="{{pic.photoUrl}}"
                  class="img-responsive" alt="Responsive image" (click)="setter(pic)" 
            /> 
  	   			<a id="details" [routerLink]="['photo/' + pic.id]" (click)="setter(pic)">
  	    				{{pic?.name}}
  	 				</a>
  				</ul>
  		 	</div>
		  </div>
    </div>	
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,  
  styleUrls: ['./category-details.component.css']

})
export class CategoryDetailsComponent implements OnInit, OnDestroy {

  category: Observable<Category[]>;
  photo: string;
  private alive: boolean = true;

  constructor(private route: ActivatedRoute, private categoryService: CategoryService,
               private ref: ChangeDetectorRef) {}

  ngOnInit() {
    if(this.categoryService.getCurrentCats()[0] ===  undefined ) {
      this.getCategory();
    }
    else {
      this.category = this.categoryService.currentCats;
      this.ref.markForCheck(); 
    }
    this.ref.detectChanges();
  }
  
  getCategory() {  
   this.category = this.route.paramMap
        .switchMap((params: ParamMap) => 
          this.categoryService.getCategory(+params.get('id')))
              this.ref.markForCheck(); 
  }

  setter(pic) {
    this.categoryService.currentPhotoComments.takeWhile(() => this.alive)
                          .subscribe((data) => {
                            this.photo = data;
                            this.ref.markForCheck();
                          });

    if (pic.id != this.photo['id']) {
        this.categoryService.setPhotoComments(pic);
    }
    else {
        this.categoryService.setPhotoComments(this.photo);
        pic = this.photo;
    }
    this.ref.markForCheck();
    this.ref.detectChanges();
  }

  ngOnDestroy() {
    this.alive = false; 
  }
	
}