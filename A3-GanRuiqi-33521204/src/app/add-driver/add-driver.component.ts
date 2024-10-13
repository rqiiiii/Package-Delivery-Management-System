import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { Driver } from '../models/driver';

@Component({
  selector: 'app-add-driver',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-driver.component.html',
  styleUrl: './add-driver.component.css'
})
export class AddDriverComponent {
  driver: Driver = new Driver();

  constructor(private db:DatabaseService,private router:Router){}

  addDriver(){
    this.db.createDriver(this.driver).subscribe(
      (data: any) => {
        // Assuming the backend returns success status or driver data on successful creation
          this.router.navigate(['list-drivers']);
        
      },
      (error: any) => {
        // If there is an error (like invalid data), redirect to the invalid-data page
        if (error.status === 400) {  // Assuming the backend returns a 400 status code for invalid data
          this.router.navigate(['invalid-data']);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    );
}}
