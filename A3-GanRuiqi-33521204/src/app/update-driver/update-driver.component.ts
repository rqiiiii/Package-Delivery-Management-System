import { Component } from '@angular/core';
import { Driver } from '../models/driver';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UpperCasePipe } from '@angular/common';
import { UpperPipe } from '../pipes/upper.pipe';

@Component({
  selector: 'app-update-driver',
  standalone: true,
  imports: [FormsModule,UpperPipe],
  templateUrl: './update-driver.component.html',
  styleUrl: './update-driver.component.css'
})
export class UpdateDriverComponent {
  driverDB: Driver[] = [];
  driverId: string = '';
  updatedDriver = { licence: '', department: '' };
  fetchForm:boolean = false

  constructor(private db: DatabaseService, private router: Router) {}

  onUpdate(driverId:any){
    this.fetchForm=true
    this.driverId =driverId;
  }
  // Update the selected driver
  onUpdateDriver(updatedDriver:any) {
    console.log(updatedDriver)
    console.log(this.driverDB)
    // if (!this.driverId) {
    //   console.error('No driver selected');
    //   return; // Prevent further execution if no driver is selected
    // }

    // Prepare the data object for updating
    const data = {
    licence: this.updatedDriver.licence,
      department: this.updatedDriver.department,
    };

    // Update the driver via the database service
    this.db.updateDriver(this.driverId, data).subscribe(
      () => {
        console.log('Driver updated');
        this.router.navigate(['/list-drivers']); // Redirect to the drivers list or any other page after update
      },
      (error) => {
        this.router.navigate(['/invalid-data'])
        console.error('Error updating driver', error);
        // Optionally navigate to an error page or show an error message
      }
    );
  }

  ngOnInit() {
    this.db.getDrivers().subscribe((drivers: any) => {
      this.driverDB = drivers; 
    })
  }
}
