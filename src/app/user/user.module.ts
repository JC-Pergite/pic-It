import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { userRouting } from './user.routing';

import { ProfileComponent } from './profile.component';
import { AlbumComponent } from './albums/album.component';
import { AlbumDetailsComponent } from './albums/album-details.component';
import { ProfileService } from './profile.service';
import { UserPhotosComponent } from './albums/user-photos.component';
import { AuthGuard }            from './auth-guard.service';
import { AuthService }          from './auth.service';

@NgModule ({
	imports: [ SharedModule, userRouting ],
	declarations: [ 
					ProfileComponent,
					AlbumComponent,
					AlbumDetailsComponent,
					UserPhotosComponent
				  ],
	providers: [ ProfileService, AuthGuard, AuthService ]
})
export class UserModule { }