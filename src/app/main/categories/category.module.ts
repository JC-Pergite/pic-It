import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { CategoriesComponent } from './categories.component';
import { CategoryDetailsComponent } from './category-details.component';
import { mainRouting } from '../main.routing';
import { CategoryService } from './category.service';
import { PhotoDetailsComponent } from './photo-details.component';

@NgModule ({
	imports: [ SharedModule, mainRouting ], 
	declarations: [ 
					CategoriesComponent,
					CategoryDetailsComponent,
					PhotoDetailsComponent
				  ],
	providers: [ CategoryService ]
})
export class CategoryModule { }