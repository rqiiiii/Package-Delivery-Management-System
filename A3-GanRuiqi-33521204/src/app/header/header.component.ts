import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  onLogout(){
    // Remove the token from local storage or cookies
    localStorage.removeItem('jwt'); // or sessionStorage.removeItem('token'); or document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT;"
    
    // Optionally, redirect the user to the login page
    window.location.href = '/login'; // Adjust the path as needed
  }
}
