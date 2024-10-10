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

  addPackage(){
    this.package.driverId = this.selectedDriverId;
    this.db.createPackage(this.package).subscribe((data:any)=>{
      this.router.navigate(['list-packages'])
    });
  }

  ngOnInit() {
    this.db.getDrivers().subscribe((drivers: any) => {
      this.driverDB = drivers; // Assign the fetched drivers to driverDB
    })

  }
    
}

