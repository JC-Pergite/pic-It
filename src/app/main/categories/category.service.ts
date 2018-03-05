import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Category } from '../../shared/category';
import { Photo } from '../../shared/photo';
import { Comment } from '../../shared/comment';
import { User } from '../../user/user';

@Injectable()

export class CategoryService {

  public trending: Photo[] = []; 
  public topRanks = [];
  public likedPic: Photo;
  // public likedSubject: BehaviorSubject<any> = new BehaviorSubject<Photo[]>([]);
	private categoryUrl = 'http://localhost:4200/pic-it/categories';
	private photoUrl = 'http://localhost:4200/pic-it/photos';


  // public currentLikeToD : BehaviorSubject<any> = new BehaviorSubject<boolean>(true);

  //multiple Cats
  private everySubject: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
  public allCats = this.everySubject.asObservable().distinctUntilChanged();

  //single Cat
  private currentSubject: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
  public currentCats = this.currentSubject.asObservable().distinctUntilChanged();

  private currentPhotoCommentsSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public currentPhotoComments = this.currentPhotoCommentsSubject.asObservable().distinctUntilChanged();

  private coolLimiterSubject: BehaviorSubject<number> = new BehaviorSubject<number>(4);
  public coolLimiter = this.coolLimiterSubject.asObservable().distinctUntilChanged();

  private currentTrendingSubject: BehaviorSubject<any> = new BehaviorSubject<Photo[]>([]);
  public currentTrendiest = this.currentTrendingSubject.asObservable().distinctUntilChanged();
  

	constructor (private http: Http) { } 

                    
 setTrending(trends) { 
    let doppleganger = false;
    if(this.trending.find((photo: Photo) => photo.id === trends.id)) {       
        console.log("Whoops; doppleganger!");
        doppleganger = true;
    }
    else {
      if(!doppleganger && this.trending.length <= 4 && 
        trends.likes.likes > this.coolLimiterSubject.value) { 
          this.trending.push(trends); 
          this.currentTrendingSubject.next(this.trending.length - 1);
      }
      if(trends.likes.likes <= this.coolLimiterSubject.value) { 
        console.log('Not cool enough');
      }   
      else {
        console.log('Trendy!');
        if (!doppleganger && this.trending.length === 5){  
          for (var i = 0; i < this.trending.length; i++) {
             if (this.trending[i].likes.likes > this.coolLimiterSubject.value){ 
              let surpassed = this.trending.indexOf(this.trending[i]);
              console.log(this.trending[i].name + ' has been SURPASSED!');
              this.trending.splice(surpassed, 1, trends);
              this.topRanks.push(trends.likes.likes);
              this.currentTrendingSubject.next(this.trending);
              this.trendyRanking();
            }
          }  
        }  
      }
    }
  }

  trendyRanking() {
    let coolMin = Math.min(...this.topRanks);
    this.coolLimiterSubject.next(coolMin +2);
  }

  // setCurrentPicLiker(likedPic, picLiker) {
  //   if(likedPic.likes.user_id.find((user: User) => user.id !== picLiker)) {
  //     console.log('Over-enthusistic much?');
  //   }
  //   else {
  //     console.log('else setCurrentLiker');
  //     this.currentLikeToD.next(false);
  //     this.likedPic = likedPic;
  //     this.likedSubject.next(likedPic.likes.user_id);
  //     console.log(this.likedSubject.value);
  //   }
  // }
  
  getCoolLimiter() {
    return this.coolLimiterSubject.value;
  }

  getTrending() {
    return this.currentTrendingSubject.value;
  }

  setCats(cat) {
    console.log("activated", cat)

    this.currentSubject.next(cat)
  }

  setPhotoComments(data: any) { 
    this.currentPhotoCommentsSubject.next(data);
  }

  getCurrentComments(): any  { //photo
    return this.currentPhotoCommentsSubject.value;
  }

  getCurrentCats(): any { //category
    return this.currentSubject.value;
  }

  setAllCats(cats): any {
    this.everySubject.next(cats);
  }

  getAllCats(): any {
    return this.everySubject.value;
  }

  getCategories(): Observable<Category[]>  {
    return this.http
    .get(this.categoryUrl)
    .mergeMap((res:Response) => {
      this.setAllCats(<Category[]>res.json().data as Category[]) ;
      return this.allCats;
    })      
      .do(categories => console.log(JSON.parse(JSON.stringify(categories))))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));  
  }

  deleteComment (pic): Observable<Photo> { 
  let body = JSON.parse(JSON.stringify(pic));
  let headers    = new Headers({ 'Content-Type': 'application/json' }); 
  let options    = new RequestOptions({ headers: headers });
  return this.http
    .put(`${this.photoUrl}/${body['id']}`, body, options)
      .map((res:Response) => <Photo>res.json().data as Photo) 
      .do(photo => console.log(JSON.parse(JSON.stringify(photo))))
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getCategory(id): Observable<Category[]> {
    return this.http
    .get('/pic-it/categories/' + id) 
    .mergeMap((res:Response) => {
      console.log(this.currentSubject.value);
      this.setCats( Array(<Category[]>res.json().data as Category[]) );
      return this.currentCats;
    })
      .do(category => console.log(JSON.parse(JSON.stringify(category))))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'))    
  }

}