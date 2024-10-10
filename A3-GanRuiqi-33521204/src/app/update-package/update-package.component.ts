import { Component } from '@angular/core';
import { Driver } from '../models/driver';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { Package } from '../models/package';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-update-package',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-package.component.html',
  styleUrl: './update-package.component.css'
})
export class UpdatePackageComponent {
  driverDB: Driver[] = [];
  packageId: string = '';
  updatedPackage = { destination: ''};

  constructor(private db: DatabaseService, private router: Router) {}

  onSelectUpdate(packages:Package) {
    this.updatedPackage.destination = packages.packageDestination; 
  }

  // Update the selected driver
  onUpdatePackage(packageId:string,updatedPackage:any) {
    console.log(packageId)
    console.log(updatedPackage)
    if (!this.packageId) {
      console.error('No package selected');
      return; // Prevent further execution if no driver is selected
    }

    // Prepare the data object for updating
    const data = {
    destination: this.updatedPackage.destination
    };

    // Update the driver via the database service
    this.db.updatePackage(packageId, data).subscribe(
      () => {
        console.log('Package updated',data);
        this.router.navigate(['/list-packages']); // Redirect to the drivers list or any other page after update
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
    this.db.getPackages().subscribe();
  }

}
