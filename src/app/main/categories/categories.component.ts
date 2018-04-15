import { Component, OnInit, Input, ContentChildren, QueryList, OnDestroy,
         ChangeDetectionStrategy, ChangeDetectorRef, HostBinding  } from '@angular/core';
import { Router, ActivatedRoute, Params }  from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AsyncPipe } from '@angular/common';
import { Category } from '../../shared/category';
import { CategoryService } from './category.service';
import { SlicePipe, NgClass } from '@angular/common';
import { trigger, state, style, animate, transition,
         keyframes, AnimationEvent, query, stagger } from '@angular/animations';
import { Photo } from '../../shared/photo';

@Component({
  selector: 'pic-it-categories',
  template: `
    <div class="categories" *ngFor="let category of categories; let i = index">
      <div class="categoryHeader">
    	  <a  class="categoryName" (click)="setter(category)">
          <h2 class="categoryTitle">{{category.name}}</h2>
        </a>
      </div>  
  		<div class="categoryPics flipper" *ngFor="let pic of category.photos | slice:start:end;
        let i = index; trackBy: trackByFn" [@flipAnimation]="category.photos.length">
          <img [routerLink]="['./' + category.id + '/photo/' + pic.id]" src="{{pic.photoUrl}}"
              alt="Responsive image"  id="img-responsive" (click)="setter(category, pic)"
          />
      </div>    
    </div>  
    <div class="trending" *ngIf="trender.length">
      <h2 class="trendHead">Trending</h2>
      <ul class="trendMaster">
        <table class="table table-striped table-hover table-bordered" *ngFor="let trend of trender">
          <thead class="thead-dark">
            <tr (click)="trends(trend)">
              <th>
                <img src="{{trend.photoUrl}}" alt="Responsive image" id="miniTrender">
              </th>
                <td>
                  {{trend.type}}
                  <br><br>
                  <i [ngClass]="iconify(trend.type)" id="trendType"></i>
                  <h1 class="coolest">{{trend.name}}</h1>
                </td>
            </tr>
          </thead>
        </table> 
      </ul>
    </div>
  `,
  styleUrls: ['./categories.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('flipAnimation', [
      state('category.photos.length', style({transform: 'rotateX(0)', position: 'sticky'})),
      transition('* => void', [
        query('div', [ 
          stagger(1000,
            animate(3000, style({ opacity: 1, transform: 'rotateX(-180deg)', position: 'absolute'}))
          )], 
         { optional: true }
        )
      ]),
      transition('void => *', [
        query('img', [ 
            stagger(1000,
            animate(3000, style({ opacity: 0.3, transform: 'rotateX(180deg)', position: 'relative'}))
          )],
         { optional: true }
        )
      ])
    ])
  ]    
})
export class CategoriesComponent implements OnInit, OnDestroy {
  private trendiest: number;
  public trender: Photo[] = [];
  @Input() categories: Category[] = []; 
  private start = 0;
  private end = 3;
  private shuffler : any;
  getEm = [];
  @Input() category: Category;
  thePic: Photo[] = [];
  private alive: boolean = true;
  food = "fas fa-utensils";
  voyage = "fas fa-plane";
  public iconify(trendType) {
    switch(trendType) {
        case 'Culinary':
           trendType = this.food;
        break;
        case 'Travel':
          trendType = this.voyage;
        break;
        default:
        trendType = "fas fa-smile";
    }
    return trendType
  }  

  constructor(private route: ActivatedRoute, private categoryService: CategoryService,
    private ref: ChangeDetectorRef, private router: Router) { 
      this.trendiest = this.categoryService.getCoolLimiter();
  }

  ngOnInit() { 
    if(this.categoryService.getAllCats()[0] ===  undefined){
      this.categoryService.getCategories().takeWhile(() => this.alive)
        .subscribe(categoriess => 
          { 
                       this.getEm.push(categoriess);
                       this.categories = this.getEm[0];
                       this.categoryService.trending.push(this.categories[0].photos[2], 
                       this.categories[0].photos[1], this.categories[1].photos[2]);
                       this.trender = this.categoryService.trending;
                       this.shuffleAway(this.categories); 
                       this.ref.markForCheck(); 
          });
    }
    else {
      this.categories = this.categoryService.getAllCats();
      this.shuffleAway(this.categories);
      this.trender = this.categoryService.trending;
      this.ref.markForCheck();  
    }
  }    

  shuffleAway(categories) {  
      let categoryPhotos = null;
      this.shuffler = setInterval(() => {
      for (var i = 0; i < categories.length; i++) {
            categoryPhotos = categories[i].photos;
        for (var j =0; j < categoryPhotos.length; j++) {
          var randomIndex = Math.floor(Math.random()*(j+1)); 
          var itemAtIndex = categoryPhotos[randomIndex]; 
          categoryPhotos[randomIndex] = categoryPhotos[j]; 
          categoryPhotos[j] = itemAtIndex;
        }
          this.ref.markForCheck();  
      } 
    }, 5000);
      return categoryPhotos; 
  }       

  trendSetter(pics?) {
    this.trendiest = this.categoryService.getCoolLimiter();
    if(!this.categoryService.trending.length || this.trender.length !> 4) {
      for (var i = 0; i < pics.length; i++) {
        let num = pics[i];
        if(this.categoryService.trending.length >= 5 && num.likes.likes > this.trendiest) {
          this.categoryService.setTrending(pics[i]);
        }
      }
      this.trender = this.categoryService.trending;
      this.ref.markForCheck();  
    }
    else { 
      this.trender = this.categoryService.trending;
      this.ref.markForCheck();  
    } 
  }

  setter(cat, pic?) { 
    if(pic === undefined) {
      this.router.navigate(['/categories/' + cat.id]);
          this.ref.markForCheck();
    }
    else {
      this.categoryService.currentPhotoComments.subscribe((data) => { this.thePic = data });
      if (pic.id != this.thePic['id']) {
        this.categoryService.setPhotoComments(pic);
            this.ref.markForCheck();
      }
      else {
        this.categoryService.setPhotoComments(this.thePic);
        pic = this.thePic;
            this.ref.markForCheck();
      } 
    }
    this.categoryService.setCats(Array(cat));
    this.ref.detectChanges();
  }

  trends(pic) {
    for (var i = 0; i < this.categories.length; i++) {
      for (const name in this.categories[i]) {
        if (pic.type == this.categories[i][name]) {
          let coolCat = this.categories[i].id;
          this.categoryService.setCats(Array(this.categories[i]));
          this.categoryService.setPhotoComments(pic);
          this.router.navigate(['/categories/' + coolCat + '/photo/' + pic.id]);
          this.ref.markForCheck();
        }
      }
    } 
  }

  trackByFn(index, item) { 
    return item.id;
  } 
 
 ngOnDestroy() {
   clearInterval(this.shuffler);
 }

}