import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObj:any ={
    "username":"",
    "password":""
  }

  data:any
  http=inject(HttpClient);
  constructor(private db: DatabaseService, private router: Router) {}

  onLogin(){
    const username = this.loginObj.username;
    const password = this.loginObj.password;
    console.log(username,password,"ubsnipda")

    this.db.login(this.loginObj).subscribe((response: any) => {
      if (response.token) {  // Assuming the server sends back a JWT token
        localStorage.setItem("jwt", response.token);  // Store the token in localStorage
        this.router.navigate([""]);  // Redirect to a protected page
      } else {
        this.router.navigate(["invalid-data"])
        alert(response.message);  // Handle login failure
      }
    });
  }

  onLogout(){
    // Remove the token from local storage or cookies
    localStorage.removeItem('jwt'); // or sessionStorage.removeItem('token'); or document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT;"
    
    // Optionally, redirect the user to the login page
    window.location.href = '/login'; // Adjust the path as needed
  }

  onSignup(){
    this.router.navigate(['signup'])
  }
}
