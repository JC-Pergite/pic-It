import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from './profile.service';
import { User } from './user';
import { Album } from './albums/album';

@Component({
  selector: 'pic-it-login',
  template: `
  <form class="form-horizontal" novalidate (ngSubmit)="onSubmit(user)" [formGroup]="user">
	  <fieldset>
	    <legend>Who Art Thou?</legend>
	    <div class="form-group" has-warning>
	      <label for="inputName" class="col-lg-2 control-label">Name</label>
	      <div class="col-lg-10">
	        <input type="text" class="form-control" id="inputWarning" 
	        	   placeholder="Username" 
	        	   formControlName="name"
	        />
	      </div>
	    </div>
	    <div formGroupName="account" class="form-group">
	      <label for="inputEmail" class="col-lg-2 control-label">Email</label>
	      <div class="col-lg-10">
	        <input type="text" class="form-control" id="inputEmail" 
	        	   placeholder="Email" 
	        	   formControlName="email"
	       	/>
	      </div>
	      <label for="inputPassword" class="col-lg-2 control-label">Password</label>
	      <div class="col-lg-10">
	        <input type="password" class="form-control" id="inputPassword" 
	        		 placeholder="Password" 
	        	   formControlName="password"
	        />
	      </div>
	    </div>
	    <div class="form-group">
	      <label for="textArea" class="col-lg-2 control-label">Bio:</label>
	      <div class="col-lg-10">
	        <textarea class="form-control" formControlName="bio" rows="3" id="textArea"></textarea>
	        <span class="help-block">A longer block of help text that breaks onto a new line and may extend beyond one line.</span>
	      </div>
	    </div>
	    <div class="form-group">
	      <div class="col-lg-10 col-lg-offset-2">
	        <button type="reset" class="btn btn-default">Cancel</button>
	        <button type="submit" class="btn btn-primary" [disabled]="user.invalid">Submit</button>
	      </div>
	    </div>
	  </fieldset>
	</form>
  `
})
export class LoginComponent implements OnInit {

  user: FormGroup;
  currentUser: User;

  constructor(private fb: FormBuilder, private profileService: ProfileService) { }

  ngOnInit() {
   	this.user = this.fb.group({
     	name: ['', [Validators.required, Validators.minLength(2)]],
     	bio: ['', Validators.required],
     	account: this.fb.group({
       	email: ['', Validators.required],
       	password: ['', Validators.required]
     	}),
     	albums: this.fb.array([])
    });
	}

 	onSubmit({ value, valid }: { value: User, valid: boolean }) {
    this.profileService.saveUser(value)
    					.subscribe(data => { 
				  			{ this.currentUser = data}; {console.log(this.currentUser) } 
				  		});
  }

}
