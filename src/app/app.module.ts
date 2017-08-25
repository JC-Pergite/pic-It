import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
//Third-Party Modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
//Feature Modules
import { PhotoDataService }  from './photo-data.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './user/login.component';
import { CategoryModule } from './main/categories/category.module';
import { UserModule } from './user/user.module';
import { CategoryResolver } from './main/categories/category.resolver';

@NgModule({
  declarations: [ AppComponent, LoginComponent ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    InMemoryWebApiModule.forRoot(PhotoDataService),
    CategoryModule,
    UserModule
  ],
  providers: [ CategoryResolver ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
