import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { CategoryService } from './main/categories/category.service';
import { PopupCreateComponent } from './popup-create.component';
import { PopupLikersComponent } from './popup-likers.component';


@NgModule({
  declarations: [ AppComponent, LoginComponent, PopupCreateComponent, PopupLikersComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    InMemoryWebApiModule.forRoot(PhotoDataService, { delay: 500 }),
    CategoryModule,
    UserModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }