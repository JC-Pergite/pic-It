import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesComponent } from './categories/categories.component';
import { CategoryDetailsComponent } from './categories/category-details.component';
import { CategoryService } from './categories/category.service';
import { PhotoDetailsComponent } from './categories/photo-details.component';

const mainRoutes: Routes = [
		{ path: 'categories',
			children: 
				[
				  { path: ':id',
				      children: 
						[
							{ path: 'photo',
								children:
									[
										{ path: ':id', component: PhotoDetailsComponent }
									]
							},
							{ path: '', component: CategoryDetailsComponent }		
						]
				  },
				  { path: '', component: CategoriesComponent, pathMatch:'full' } 
				]
		},
];

export const mainRouting: ModuleWithProviders =
RouterModule.forChild(mainRoutes)