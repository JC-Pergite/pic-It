import { Component, OnInit } 				  from '@angular/core';
import { FormArray, FormControl, 
		 FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } 		  from '@angular/router';

import { AuthService }      from './auth.service';
import { ProfileService }   from './profile.service';
import { User }     		from './user';
import { Album } 			from './albums/album';

@Component({
  selector: 'pic-it-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

  user: FormGroup;
  currentUser: User;
  public whenClicked = true;
  
  constructor(private router: Router, private fb: FormBuilder, 
  			  private profileService: ProfileService, public authService: AuthService) { 
  }

  ngOnInit() {
   	this.user = this.fb.group({
     	// name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(9)]],
     	// bio: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(6)]],
      name: ['', [Validators.required]],
     bio: ['', [Validators]],
     	account: this.fb.group({
       	email: ['', Validators],
       	password: ['', Validators]
     	}),
     	albums: this.fb.array([])
    });
	}

  onSubmit({ value, valid }: { value: User, valid: boolean }) {
    this.whenClicked = false;
    this.profileService.saveUser(value)
    					.subscribe((data: User) => 
				  			 {this.currentUser = data },
				  			 error => { console.log('Whoops') },
				  			 () => { this.login(); }
				  		);
    this.authService.firstLogIn = true;
  }

  login() {
    this.authService.login().subscribe(() => {
      if (this.authService.isLoggedIn) {
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/profile';
        setTimeout(() => {
          this.router.navigate([redirect]);
        }, 3000)
      }
    });
  }
}