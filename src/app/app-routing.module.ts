import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

const appRoutes: Routes = [
  	// { path: 'profile', redirectTo: 'profile', pathMatch: 'full' },
      { path: '', redirectTo: 'categories', pathMatch: 'full' },
  	  { path: 'login', redirectTo: 'login', pathMatch: 'full' }
  	
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
      // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}