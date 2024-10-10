import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';
import { Driver } from '../models/driver';
import { Package } from '../models/package';
import { KgtogPipe } from '../pipes/kgtog.pipe';
import { UpperPipe } from '../pipes/upper.pipe';

@Component({
  selector: 'app-delete-driver',
  standalone: true,
  imports: [FormsModule,KgtogPipe,UpperPipe],
  templateUrl: './delete-driver.component.html',
  styleUrl: './delete-driver.component.css'
})
export class DeleteDriverComponent {
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

