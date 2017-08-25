import { Component, OnInit } from '@angular/core';
import { Category } from '../../shared/category';
import { CategoryService } from './category.service';

@Component({
  selector: 'pic-it-categories',
  template: `
  			<div>
  				<div *ngFor="let category of categories">
  					 <a [routerLink]="['./' + category.id]">{{category.name}}</a>
             <a [routerLink]="['/profile']">Profile</a>
  					 <div *ngFor="let pic of category?.photos">
        	      <img src={{pic.photoUrl}} width="333" height="333" class="img-responsive" 
        	      	alt="Responsive image">
        	   </div>
  			  </div>
  			</div>		
  `,
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category[];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
  	this.categoryService.getCategories().subscribe(categoriess => this.categories = categoriess)
  }

}
