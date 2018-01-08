import './rxjs-operators';
import { Component } from '@angular/core';
import { AuthService }      from './user/auth.service';
import { Router }  from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'picIt';

  constructor(private router: Router, public authService: AuthService) { }

  logout() {
	    this.authService.logout();
		this.router.navigate(['/categories']);  
  	}
}
