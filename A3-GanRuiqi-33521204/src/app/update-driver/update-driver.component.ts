import { Component } from '@angular/core';
import { Driver } from '../models/driver';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-driver',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-driver.component.html',
  styleUrl: './update-driver.component.css'
})
export class UpdateDriverComponent {
  driverDB: Driver[] = [];
  driverId: string = '';
  updatedDriver = { licence: '', department: '' };

  constructor(private db: DatabaseService, private router: Router) {}

  // // Select a driver for updating
  // onSelectUpdate(driver: Driver) {
  //   this.updatedDriver.licence = driver.driverLicence; 
  //   this.updatedDriver.department = driver.driverDepartment; // Pre-fill department
  // }

  // Update the selected driver
  onUpdateDriver(driverId:string,updatedDriver:any) {
    console.log(driverId)
    console.log(updatedDriver)
    console.log(this.driverDB)
    if (!this.driverId) {
      console.error('No driver selected');
      return; // Prevent further execution if no driver is selected
    }

    // Prepare the data object for updating
    const data = {
    licence: this.updatedDriver.licence,
      department: this.updatedDriver.department,
    };

    // Update the driver via the database service
    this.db.updateDriver(driverId, data).subscribe(
      () => {
        console.log('Driver updated');
        this.router.navigate(['/list-drivers']); // Redirect to the drivers list or any other page after update
      },
      (error) => {
        console.error('Error updating driver', error);
        // Optionally navigate to an error page or show an error message
      }
    );
  }

  ngOnInit() {
    // Subscribe to the central driver list
    // this.db.getDriverList().subscribe((drivers) => {
    //   this.driverDB = drivers; // Populate the driver list
    // });

    // Initial load of drivers
    this.db.getDrivers().subscribe();
  }
}
