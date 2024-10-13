import { Component } from '@angular/core';
import { Driver } from '../models/driver';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { Package } from '../models/package';
import { FormsModule } from '@angular/forms';
import { KgtogPipe } from '../pipes/kgtog.pipe';


@Component({
  selector: 'app-update-package',
  standalone: true,
  imports: [FormsModule,KgtogPipe],
  templateUrl: './update-package.component.html',
  styleUrl: './update-package.component.css'
})
export class UpdatePackageComponent {
  driverDB: Driver[] = [];
  packageId: string = '';
  updatedPackage = { destination: ''};
  packageDB: Package[] =[];
  fetchForm:boolean = false;

  constructor(private db: DatabaseService, private router: Router) {}

  // onSelectUpdate(packages:Package) {
  //   this.updatedPackage.destination = packages.packageDestination; 
  // }
  onUpdate(packageId:any){
    this.fetchForm =true;
    this.packageId = packageId
  }

  onUpdatePackage(packageId:string,updatedPackage:any) {
    if (!this.packageId) {
      console.error('No package selected');
      return; 
    }

    const data = {
    destination: this.updatedPackage.destination
    };

    this.db.updatePackage(packageId, data).subscribe(
      () => {
        console.log('Package updated',data);
        this.router.navigate(['/list-packages']);
      },
      (error) => {
        this.router.navigate(['/invalid-data']); 
        console.error('Error updating driver', error);
      }
    );
  }

  ngOnInit() {
    this.db.getPackages().subscribe((packages: any) => {
      this.packageDB = packages; 
    })

    this.db.getPackages().subscribe();
    }

}
