import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { ProfileComponent } from './profile.component';
import { AlbumComponent } from './albums/album.component';
import { AlbumDetailsComponent } from './albums/album-details.component';
import { UserPhotosComponent } from './albums/user-photos.component';

const userRoutes: Routes = [
			{ path: 'login', component: LoginComponent },
			{ path: 'profile',
				children: 
					[
					  { path: ':id', component: ProfileComponent }, 
					  { path: 'album', 
					      children: 
							[
								{ path: '', component: AlbumComponent },
								{ path: ':id', component: AlbumDetailsComponent },
								{ path: ':id/photo/:id', component: UserPhotosComponent }
							]
					  },
					  { path: '', component: ProfileComponent } 
					]
			}
];
export const userRouting: ModuleWithProviders =
RouterModule.forChild(userRoutes)