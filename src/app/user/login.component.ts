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

  userForm: FormGroup;
  currentUser: User;
  public whenClicked = true;
  
  constructor(private router: Router, private fb: FormBuilder, 
  			  private profileService: ProfileService, public authService: AuthService) { 
  }

  ngOnInit() {
   	this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(9)]],
     	bio: ['', [Validators.required, Validators.maxLength(250)]],
     	account: this.fb.group({
       	email: ['', Validators],
       	password: ['', Validators]
     	}),
     	albums: this.fb.array([])
    });
	}

   get name() { return this.userForm.get('name'); }

   get bio() { return this.userForm.get('bio'); }

  onSubmit({ value, valid }: { value: User, valid: boolean }) {
    this.whenClicked = false;
    this.profileService.saveUser(value)
    					.subscribe((data: User) => 
				  			 {this.currentUser = data },
				  			 error => { console.log('Whoops') },
				  			 () => { this.login(); this.profileService.guest = false }
				  		);
    this.authService.firstLogIn = true;
  }

  login() {
    this.authService.login().subscribe(() => {
      if (this.authService.isLoggedIn) {
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/profile';
        this.router.navigate([redirect]);
      }
    });
  }
}