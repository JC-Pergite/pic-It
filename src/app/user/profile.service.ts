import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { User } from './user';
import { Album } from './albums/album';
import { Photo } from '../shared/photo';

@Injectable() 
  export class ProfileService {

  private userUrl = 'http://localhost:4200/pic-it/users';
  private albumUrl = 'http://localhost:4200/pic-it/albums';
  public currentUser: any = undefined;

  constructor (private http: Http) { }

  getUsers(): Observable<any> {
    return this.http
      .get(this.userUrl)
        .map((res: Response) => <User>res.json().data || {} )
        .do(user => this.currentUser = JSON.parse(JSON.stringify(user)))
        .catch((error: any) => Observable.throw(error.json().error || 'Server error')) 
  }

  saveUser(newUser): Observable<User> {
    let body = JSON.parse(JSON.stringify(newUser));
    console.log(body);
    let headers    = new Headers({ 'Content-Type': 'application/json' }); 
    let options    = new RequestOptions({ headers: headers });
    return this.http
      .post(this.userUrl, body, options)
        .map((res: Response) => <User>res.json().data || {} )
        .do(user => this.currentUser = JSON.parse(JSON.stringify(user)))
        .catch((error: any) => Observable.throw(error.json().error || 'Server error')) 

  }

  getUser(id): Observable<any> {
        console.log(id);
    return this.http
      .get(`{$this.userUrl}/{$id}`) 
        .map(res => (<User[]>res.json().data).filter(user => user.id == id))
        .do(data => console.log(JSON.parse(JSON.stringify(data))))
        .catch((error: any) => Observable.throw(error.json().error || 'Server error')) 
    }

  addPhoto (pic): Observable<any> {
    console.log(pic);
    let body = JSON.parse(JSON.stringify(pic));
    let headers    = new Headers({ 'Content-Type': 'application/json' }); 
    let options    = new RequestOptions({ headers: headers });
    return this.http
        .post(`${this.albumUrl}`, body, options) //added the body part...nvm but maybe
          .map((res:Response) => res.json().data) 
          .do(data => console.log(JSON.parse(JSON.stringify(data))))
          .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

  getAlbums(): Observable<any> {
    return this.http
      .get(`${this.albumUrl}`) 
        .map((res: Response) => <any>res.json().data || {} )
        .do(album => console.log(JSON.parse(JSON.stringify(album))))
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'))  
  }

  getAlbum(id): Observable<Album[]> {
    return this.http
        .get(`${this.albumUrl}`) 
          .map(res => (<Album[]>res.json().data).filter(album => album.id == id))
          .do(album => console.log(JSON.parse(JSON.stringify(album))))
          .catch((error: any) => Observable.throw(error.json().error || 'Server error'))    
  }

  updateUser (user): Observable<User> {
      let body = JSON.parse(JSON.stringify(user));
      console.log(body)
      let headers = new Headers({ 'Content-Type': 'application/json' }); 
      let options = new RequestOptions({ headers: headers });
      return this.http
        .put(`${this.userUrl}/${body['id']}`,body, options)
          .map((res:Response) => res.json().data as User) 
          .do(user => this.currentUser = JSON.parse(JSON.stringify(user)))
          .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  } 

  addAlbum (newAlbum): Observable<Album> {
      let body = JSON.parse(JSON.stringify(newAlbum));
      console.log(body)
      let headers    = new Headers({ 'Content-Type': 'application/json' }); 
      let options    = new RequestOptions({ headers: headers });
      return this.http
        .post(`${this.albumUrl}`, body, options)
          .map((res:Response) => res.json().data as Album) 
          .do(album => console.log(JSON.parse(JSON.stringify(album))))
          .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  } 

  
}