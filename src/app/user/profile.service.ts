import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from './user';
import { Album } from './albums/album';
import { Photo } from '../shared/photo';

@Injectable()

 export class ProfileService {

  private userUrl = 'http://localhost:4200/pic-it/users';
  private albumUrl = 'http://localhost:4200/pic-it/albums';

  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(User);
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

  // //User Album:
  public currentUserAlbumSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public currentUserAlbum = this.currentUserAlbumSubject.asObservable().distinctUntilChanged();

  constructor (private http: Http) { }

  setUserAlbum(album) {
    console.log(album);
    this.currentUserAlbumSubject.next(album);
 }

  setUser(user: User) {
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  getCurrentAlbum(): any {
    return this.currentUserAlbumSubject.value;
  }

  saveUser(newUser): Observable<User> {
    let body = JSON.parse(JSON.stringify(newUser));
    let headers    = new Headers({ 'Content-Type': 'application/json' }); 
    let options    = new RequestOptions({ headers: headers });
    return this.http
      .post(this.userUrl, body, options)
      .mergeMap(userData => { this.setUser(userData.json().data); 
        return  Observable.of([userData.json().data]) })
      .do(data => console.log(JSON.parse(JSON.stringify(data))))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')) 
  }

  addPhoto (pic): Observable<any> {
    let body = JSON.parse(JSON.stringify(pic));
    let headers    = new Headers({ 'Content-Type': 'application/json' }); 
    let options    = new RequestOptions({ headers: headers });
    return this.http
        .post(`${this.albumUrl}`, body, options)
          .map((res:Response) => res.json().data) 
          .do(data => console.log(JSON.parse(JSON.stringify(data))))
          .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

  addAlbum (newAlbum): Observable<Album> {
      let body = JSON.parse(JSON.stringify(newAlbum));
      let headers    = new Headers({ 'Content-Type': 'application/json' }); 
      let options    = new RequestOptions({ headers: headers });
      return this.http
        .post(`${this.albumUrl}`, body, options)
          .map((res:Response) => res.json().data as Album) 
          .do(album => console.log(JSON.parse(JSON.stringify(album))))
          .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  } 
}