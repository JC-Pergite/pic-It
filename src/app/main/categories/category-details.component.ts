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
  			<div *ngFor="let pic of type?.photos">
  				<ul class="pics"> 
            <div id="pictures" class="card mb-3 photoDetails" [routerLink]="['photo/' + pic.id]" 
            (click)="setter(pic)">
              <img src="{{pic.photoUrl}}" class="img-responsive" alt="Card image" />
              <div class="card-footer text-muted photoDetails">
                <h5 class="card-title photoDetails" (click)="setter(pic)">
                   {{pic?.name}}
                </h5>
                <h6 class="card-subtitle text-muted photoDetails">Likes: {{pic?.likes?.likes}}</h6> 
              </div>
            </div>  
  				</ul>
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