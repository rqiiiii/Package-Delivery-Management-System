import { Component } from '@angular/core';
import { Package } from '../models/package';
import { Driver } from '../models/driver';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { UpperPipe } from '../pipes/upper.pipe';
import { KgtogPipe } from '../pipes/kgtog.pipe';


@Component({
  selector: 'app-delete-package',
  standalone: true,
  imports: [KgtogPipe,UpperPipe],
  templateUrl: './delete-package.component.html',
  styleUrl: './delete-package.component.css'
})
export class DeletePackageComponent {
  packageDB: Package[] = [];
  driverDB: Driver[] =[];
  driverData:any =[];
  driverFetched:boolean = false;
  packageId:any=""

  constructor(private db: DatabaseService, private router: Router) {}

  onDeletePackage(packageId: any) {
    this.packageId = null
    this.db.deletePackage(packageId).subscribe(() => {
      console.log('Package deleted');
      this.ngOnInit();
      this.router.navigate(['list-packages'])
    });
  }

    // onFindDriver(){
    //   this.db.getDrivers().subscribe();
    // }

    ngOnInit() {
    this.db.getPackages().subscribe((packages: any) => {
      this.packageDB = packages; 
    })

    this.db.getPackages().subscribe();
    }

    onFindDriver(packageId: any) {
      this.packageId = packageId
      this.db.findPackage(packageId).subscribe((data)=>{
        this.driverData= []

        // Check if driverId exists
        if (data.driverId) {
          // Use findDriver instead of findPackage to get driver data
          this.db.findDriver(data.driverId).subscribe((driverData) => {
              this.driverData.push(driverData)
          }, (error) => {
              console.error('Error fetching driver data:', error);
          });
          this.driverFetched = true;
      } else {
          console.warn('No driverId found for package:', packageId);
      }
  }, (error) => {
      console.error('Error fetching package data:', error);
  });        

  }
}
