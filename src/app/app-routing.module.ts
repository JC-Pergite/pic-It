import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { PopupCreateComponent } from './popup-create.component';
import { PopupLikersComponent } from './popup-likers.component';

const appRoutes: Routes = [
      { path: 'createAlbum', component: PopupCreateComponent, outlet: 'albumPopUp' },
      { path: 'viewLikers', component: PopupLikersComponent, outlet: 'likersPopUp' },
      { path: 'categories', redirectTo: 'categories', pathMatch: 'full' },
  	  { path: 'login', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
      // { enableTracing: true }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}