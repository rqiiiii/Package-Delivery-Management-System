import { Component } from '@angular/core';
import { Package } from '../models/package';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-package',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-package.component.html',
  styleUrl: './add-package.component.css'
})
export class AddPackageComponent {
  packageDB: any[]=[];
  driverDB: any[] = [];
  package: Package = new Package();
  selectedDriverId = ''

  constructor(private db:DatabaseService,private router:Router){}

  addPackage() {
    this.package.driverId = this.selectedDriverId;
    this.db.createPackage(this.package).subscribe(
      (data: any) => {
        // On success, navigate to list-packages
        this.router.navigate(['list-packages']);
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
  }

  ngOnInit() {
    this.db.getDrivers().subscribe((drivers: any) => {
      this.driverDB = drivers; // Assign the fetched drivers to driverDB
    })

  }
    
}

