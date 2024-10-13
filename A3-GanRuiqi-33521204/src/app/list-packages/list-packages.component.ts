import { Component } from '@angular/core';
import { Package } from '../models/package';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { KgtogPipe } from '../pipes/kgtog.pipe';
import { UpperPipe } from '../pipes/upper.pipe';
import { Driver } from '../models/driver';

@Component({
  selector: 'app-list-packages',
  standalone: true,
  imports: [KgtogPipe,UpperPipe],
  templateUrl: './list-packages.component.html',
  styleUrl: './list-packages.component.css'
})
export class ListPackagesComponent {

  packageDB: Package[] = [];
  driverDB: Driver[] =[];
  driverData:any =[];
  driverFetched:boolean = false;

  constructor(private db: DatabaseService, private router: Router) {}

  onDeletePackage(packageId: any) {
    this.db.deletePackage(packageId).subscribe(() => {
      console.log('Package deleted');
      this.ngOnInit();
      this.router.navigate(['list-packages'])
    });
  }

    ngOnInit() {
    this.db.getPackages().subscribe((packages: any) => {
      this.packageDB = packages; 
    })

    this.db.getPackages().subscribe();
    }


    onFindDriver(packageId: any) {
      this.driverFetched = true
      this.db.findPackage(packageId).subscribe((data)=>{
        this.driverData= []

        // Check if driverId exists
        if (data.driverId) {
          // Use findDriver instead of findPackage to get driver data
          this.db.findDriver(data.driverId).subscribe((driverData) => {
              this.driverData.push(driverData)
              console.log(this.driverData)
          }, (error) => {
              console.error('Error fetching driver data:', error);
          });
      } else {
          console.warn('No driverId found for package:', packageId);
      }
  }, (error) => {
      console.error('Error fetching package data:', error);
  });        

  }
}