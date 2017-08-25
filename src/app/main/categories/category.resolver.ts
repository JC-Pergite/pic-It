import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Resolve, ActivatedRouteSnapshot, 
		 RouterStateSnapshot, Router } from '@angular/router';

import { CategoryService } from './category.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CategoryResolver implements Resolve<any> {

  constructor(private categoryService: CategoryService, 
  			  private router: Router, private http: Http) { }
  
  resolve(route: ActivatedRouteSnapshot): Observable<any> { 
  	let id = route.params['id'];
    return this.categoryService.getCategory(id)
  }
  
}