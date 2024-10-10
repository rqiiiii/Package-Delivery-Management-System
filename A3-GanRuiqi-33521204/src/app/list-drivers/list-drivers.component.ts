import { Component } from '@angular/core';
import { Driver } from '../models/driver';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router'; 
import { UpperPipe } from '../pipes/upper.pipe';
import { Package } from '../models/package';
import { CommonModule } from '@angular/common';
import { KgtogPipe } from '../pipes/kgtog.pipe';

@Component({
  selector: 'app-list-drivers',
  standalone: true,
  imports: [UpperPipe,CommonModule,KgtogPipe],
  templateUrl: './list-drivers.component.html',
  styleUrls: ['./list-drivers.component.css'] // Corrected styleUrls (plural)
})
export class ListDriversComponent {

  driverDB: Driver[] = [];
  packageDB: Package[] = [];
  packageData:any = []
  packagesFetched: boolean = false;

  constructor(private db: DatabaseService, private router: Router) {}

  onDeleteDriver(driverId: any) {
    this.db.deleteDriver(driverId).subscribe(() => {
      console.log('Driver deleted');
      this.ngOnInit();
      this.router.navigate(['list-drivers'])
    });
  }

    onFindPackage(driverId: any) {
      this.db.findDriver(driverId).subscribe((data)=>{
        this.packageData= []
        console.log(data,"hbadolq")
        console.log("find package")

        const packageIds = data.assigned_packages;
        console.log(packageIds)
        
        if (Array.isArray(packageIds) && packageIds.length > 0) {
          // Iterate over each package ID
          packageIds.forEach(packageId => {
            this.db.findPackage(packageId).subscribe(
              (packageData) => {
                this.packageData.push(packageData); // Store each package data in the array
                console.log(packageData, "Package data for ID:", packageId);
              }, (error) => {
                  console.error(`Error fetching package with ID ${packageId}`, error);
              });
          });
          this.packagesFetched = true;
      } else {
          console.log("No assigned packages found for this driver.");
      }
  }, (error) => {
      console.error('Error fetching driver data', error);
  });
  }



    ngOnInit() {
    this.db.getDrivers().subscribe((drivers: any) => {
      this.driverDB = drivers; // Assign the fetched drivers to driverDB
    })
    // Initial load of drivers
    this.db.getDrivers().subscribe();
  }
}

