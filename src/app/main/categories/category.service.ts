import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Category } from '../../shared/category';
import { Photo } from '../../shared/photo';
import { Comment } from '../../shared/comment';

@Injectable()

export class CategoryService {

	private categoryUrl = 'http://localhost:4200/pic-it/categories';
	private photoUrl = 'http://localhost:4200/pic-it/photos';

	constructor (private http: Http) { }

  getCategories(): Observable<any> {
    return this.http
      .get(this.categoryUrl)
        .map((res: Response) => res.json().data || {} )
        // .do(category => console.log(JSON.parse(JSON.stringify(category))))
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'))  
    }

  getCategory(id): Observable<any> {
    console.log(id);
    return this.http
      .get(this.categoryUrl) 
        .map(res => (<Category[]>res.json().data).filter(category => category.id == id))
        // .do(category => console.log(JSON.parse(JSON.stringify(category))))
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'))    
    }

	getPhotos(): Observable<any> {
		return this.http
			.get(this.photoUrl)
  			.map((res: Response) => <Photo>res.json().data || {} )
  			// .do(photos => console.log(JSON.parse(JSON.stringify(photos))))
  			.catch((error: any) => Observable.throw(error.json().error || 'Server error'))	
	}

	getPhoto(id): Observable<any> {
    console.log(id);
    return this.http
      .get(this.photoUrl) 
        .map(res => (<Photo[]>res.json().data).filter(photo => photo.id == id))
        // .do(photo => console.log(JSON.parse(JSON.stringify(photo))))
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'))    
    }

  newComment (pic): Observable<Photo> { 
    let body = JSON.parse(JSON.stringify(pic));
    let headers    = new Headers({ 'Content-Type': 'application/json' }); 
    let options    = new RequestOptions({ headers: headers });
    return this.http
      .post(this.photoUrl, body, options)
        .map((res:Response) => <Photo>res.json().data as Photo) 
        // .do(photo => console.log(JSON.parse(JSON.stringify(photo))))
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

}