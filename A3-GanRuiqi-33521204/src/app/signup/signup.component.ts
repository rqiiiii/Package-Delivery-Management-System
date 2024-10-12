import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupObj ={
    "username":"",
    "password":"",
    "confirmPassword":""
  }

  constructor(private db: DatabaseService, private router: Router) {}
  
  onSignup(){
    this.db.signup(this.signupObj).subscribe((response: any) => {
      
    });
    this.router.navigate([""])
  }
}