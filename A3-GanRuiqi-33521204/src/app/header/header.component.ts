import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router:Router){}
  onLogout(){
    // Remove the token from local storage or cookies
    localStorage.removeItem('jwt'); // or sessionStorage.removeItem('token'); or document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT;"
    

    this.router.navigate(["login"])
  }
}
