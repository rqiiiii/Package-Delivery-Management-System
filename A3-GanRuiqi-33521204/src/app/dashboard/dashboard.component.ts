import { Component } from '@angular/core';
import { Driver } from '../models/driver';
import { Package } from '../models/package';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  driverDB: Driver[] = [];
  packageDB: Package[] = [];
  packageData:any = []
  packagesFetched: boolean = false;

  constructor(private db: DatabaseService, private router: Router) {}

  ngOnInit() {
    this.db.getDrivers().subscribe((drivers: any) => {
      this.driverDB = drivers; // Assign the fetched drivers to driverDB
    })
    this.db.getPackages().subscribe((packages: any) => {
      this.packageDB= packages; // Assign the fetched drivers to driverDB
    })
  }
}
