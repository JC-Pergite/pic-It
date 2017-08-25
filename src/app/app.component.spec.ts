import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the picIt', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const picIt = fixture.debugElement.componentInstance;
    expect(picIt).toBeTruthy();
  }));

  it(`should have as title 'picIt'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const picIt = fixture.debugElement.componentInstance;
    expect(picIt.title).toEqual('picIt');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to picIt!!');
  }));
});
