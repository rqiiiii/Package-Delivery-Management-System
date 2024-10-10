// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { catchError, throwError } from 'rxjs';
// import { Router } from '@angular/router';

// const  API_URL = '/33521204/ruiqi/api/v1'

// const httpOptions = {
//   headers: new HttpHeaders({"Content-Type":"application/json"}),
// };

// @Injectable({
//   providedIn: 'root'
// })
// export class DatabaseService {

//   constructor(private http:HttpClient) { }

//   createDriver(driver: any) {
//     return this.http.post(API_URL + '/drivers', driver, httpOptions).pipe(
//       catchError((error) => {
//         // Check if the error status is 400 (Bad Request)
//         if (error.status === 400) {
//           this.router.navigate(['/invalid-data']); // Redirect to invalid data component
//         }
//         return throwError(error); // Rethrow the error for further handling
//       })
//     );
//   }

//   getDrivers() {
//     return this.http.get(API_URL + '/drivers');
//   }

//   deleteDriver(driverId:string){
//     return this.http.delete(API_URL + '/drivers/'+driverId,httpOptions)
//   }
    
// }

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Driver } from './models/driver';
import { Package } from './models/package';

const API_URL = '/33521204/ruiqi/api/v1';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  
  // private driverList = new BehaviorSubject<any[]>([]);
  // private packageList = new BehaviorSubject<any[]>([]);

  // constructor(private http: HttpClient, private router: Router) { }

  //   createDriver(driver: any) {
  //   return this.http.post(API_URL + '/drivers', driver, httpOptions).pipe(
  //     catchError((error) => {
  //       // Check if the error status is 400 (Bad Request)
  //       if (error.status === 400) {
  //         this.router.navigate(['/invalid-data']); // Redirect to invalid data component
  //       }
  //       return throwError(error); // Rethrow the error for further handling
  //     })
  //   );
  // }

  // createPackage(packages: any) {
  //   console.log("hi1")

  //   return this.http.post(API_URL + '/packages', packages, httpOptions).pipe(
      
  //     catchError((error) => {
  //       // Check if the error status is 400 (Bad Request)
  //       if (error.status === 400) {
  //         this.router.navigate(['/invalid-data']); // Redirect to invalid data component
  //       }
  //       return throwError(error); // Rethrow the error for further handling
  //     })
  //   );
  // }

  // // Method to get the list of drivers and update BehaviorSubject
  // getDrivers() {
  //   return this.http.get<any[]>(API_URL + '/drivers').pipe(
  //     tap(drivers => this.driverList.next(drivers)),  // Update the BehaviorSubject with new drivers
  //     catchError(error => {
  //       console.error('Error fetching drivers', error);
  //       this.router.navigate(['/invalid-data']);
  //       throw error;
  //     })
  //   );
  // }

  // getPackage() {
  //   return this.http.get<any[]>(API_URL + '/packages').pipe(
  //     tap(packages => this.packageList.next(packages)),  // Update the BehaviorSubject with new drivers
  //     catchError(error => {
  //       console.error('Error fetching drivers', error);
  //       this.router.navigate(['/invalid-data']);
  //       throw error;
  //     })
  //   );
  // }

  // // Expose the driver list as an Observable
  // getDriverList() {
  //   return this.driverList.asObservable();
  // }

  //   // Expose the driver list as an Observable
  //   getPackageList() {
  //     return this.packageList.asObservable();
  //   }

  // // Delete driver and update the list
  // deleteDriver(driverId: string) {
  //   return this.http.delete(API_URL + '/drivers/' + driverId, httpOptions).pipe(
  //     tap(() => {
  //       // Refresh the list after a driver is deleted
  //       this.getDrivers().subscribe(); // Ensure the driver list is updated
  //     }),
  //     catchError(error => {
  //       console.error('Error deleting driver', error);
  //       this.router.navigate(['/invalid-data']);
  //       throw error;
  //     })
  //   );
  // }

  // updateDriver(driverId:string,data:any){
  //   console.log(data,"wahha")
  //   return this.http.put(API_URL + "/drivers/"+driverId, data ,httpOptions)
  // }

  constructor(private http: HttpClient, private router: Router) { }

  createDriver(driver: any) {
    return this.http.post(API_URL + '/drivers', driver, httpOptions).pipe(
      catchError((error) => {
        if (error.status === 400) {
          this.router.navigate(['/invalid-data']);
        }
        return throwError(error);
      })
    );
  }

  createPackage(packages: any){
    return this.http.post(API_URL + '/packages', packages, httpOptions).pipe(
      catchError((error) => {
        if (error.status === 400) {
          this.router.navigate(['/invalid-data']);
        }
        return throwError(error);
      })
    );
  }

  getDrivers() {
    return this.http.get(API_URL + '/drivers').pipe(
      catchError(error => {
        console.error('Error fetching drivers', error);
        this.router.navigate(['/invalid-data']);
        return throwError(error);
      })
    );
  }

  getPackages() {
    return this.http.get(API_URL + '/packages').pipe(
      catchError(error => {
        console.error('Error fetching packages', error);
        this.router.navigate(['/invalid-data']);
        return throwError(error);
      })
    );
  }

  deleteDriver(driverId: string){
    return this.http.delete(API_URL + '/drivers/' + driverId, httpOptions).pipe(
      catchError(error => {
        console.error('Error deleting driver', error);
        this.router.navigate(['/invalid-data']);
        return throwError(error);
      })
    );
  }

  deletePackage(packageId: string){
    return this.http.delete(API_URL + '/packages/' + packageId, httpOptions).pipe(
      catchError(error => {
        console.error('Error deleting package', error);
        this.router.navigate(['/invalid-data']);
        return throwError(error);
      })
    );
  }

  updateDriver(driverId: string, data: any) {
    return this.http.put(API_URL + "/drivers/" + driverId, data, httpOptions);
  }

  updatePackage(packageId:string,data:any){
    return this.http.put(API_URL+"/packages/"+ packageId, data,httpOptions)
  }

  findDriver(driverId: string){
    return this.http.get<Driver>(API_URL + '/drivers/' +driverId, httpOptions).pipe(
      catchError(error => {
        console.error('Error finding driver', error);
        this.router.navigate(['/invalid-data']);
        return throwError(error);
      })
    );
  }

  findPackage(packageId: string) {
    return this.http.get<Package>(API_URL + '/packages/' +packageId, httpOptions);
  }

  getStatistics() {
    return this.http.get(API_URL+'/stats'); // Adjust the endpoint accordingly
  }
  // incrementOperationCount(operation: string): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/api/incrementOperation`, { operation });
  // }
}

