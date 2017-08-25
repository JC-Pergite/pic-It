import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesComponent } from './categories/categories.component';
import { CategoryDetailsComponent } from './categories/category-details.component';
import { CategoryService } from './categories/category.service';
import { CategoryResolver } from './categories/category.resolver';

import { PhotoDetailsComponent } from './categories/photo-details.component';

const mainRoutes: Routes = [
			
			{ path: 'categories', component: CategoriesComponent },
			{ path: 'categories/:id', 
				  resolve: 
					  {
							category: CategoryResolver
						},		
				 	children: [
				  		{ path:'', component: CategoryDetailsComponent },
				  		{ path:'photo/:id', component: PhotoDetailsComponent }      					
					]
			}
];
export const mainRouting: ModuleWithProviders =
RouterModule.forChild(mainRoutes)