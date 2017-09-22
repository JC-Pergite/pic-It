import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }  from '@angular/router';

import { CategoryService } from './category.service';
import { Category } from '../../shared/category';

@Component({
  selector: 'pic-it-category-details',
  template: `
		<div *ngFor="let type of category">
			<h1>{{type.name}}</h1>
			<div *ngFor="let pic of type?.photos">
				<ul> 
					<li>{{pic.name}}</li>
					<img src={{pic.photoUrl}} width="333" height="333" class="img-responsive" 
						alt="Responsive image"/>
	  	   	<a [routerLink]="['photo/' + pic.id]">
	    			Show me da Deets!
	 				</a>
				</ul>
		  </div>
		</div>	
  `
})
export class CategoryDetailsComponent implements OnInit {

  category: Category;

  constructor(private route: ActivatedRoute, private categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategory(); 
  }

  getCategory() {
	this.category = this.route.snapshot.data['category'];
  }
	
}
