import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, ParamMap }  from '@angular/router';

import { CategoryService } from './category.service';
import { Category } from '../../shared/category';
import { Observable } from 'rxjs/Observable';
import { Photo } from '../../shared/photo';

@Component({
  selector: 'pic-it-category-details',
  template: `
		<div class="photo-container" *ngFor="let type of category | async">
			<h1 class="type-title">{{type.name}}</h1>
			<div *ngFor="let pic of type?.photos">
				<ul class="pics"> 
					<img [routerLink]="['./' + 'photo/' + pic.id]" src="{{pic.photoUrl}}"
                class="img-responsive" alt="Responsive image" (click)="setter(pic)" 
          /> 
	   			<a id="details" [routerLink]="['photo/' + pic.id]" (click)="setter(pic)">
	    				See Details
	 				</a>
				</ul>
		  	</div>
		</div>	
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,  
  styleUrls: ['./category-details.component.css']

})
export class CategoryDetailsComponent implements OnInit, OnDestroy {

  categoryy: Observable<Array<Category>>;
  category: Observable<Category>;
  bana: Photo[] = [];
  name: any;
  private alive: boolean = true;

  constructor(private route: ActivatedRoute, private categoryService: CategoryService,
               private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.ref.detectChanges();
    this.getCategory(); 
  }
  
  getCategory() {  
    this.category = this.route.paramMap
      .switchMap((params: ParamMap) => 
        this.categoryService.getCategory(+params.get('id'))
      ) ;
    this.ref.markForCheck(); 
  }

  setter(pic) {
    this.categoryService.currentPhotoComments
                          .subscribe((data) => {
                            console.log(data);
                            this.name = data;
                            this.ref.markForCheck();
                          });

    if (pic.id != this.name['id']) {
        this.categoryService.setPhotoComments(pic);
    }
    else {
        this.categoryService.setPhotoComments(this.name);
        pic = this.name;
    }
    this.ref.markForCheck();
    this.ref.detectChanges();
  }

  ngOnDestroy() {
    this.alive = false; 
  }
	
}