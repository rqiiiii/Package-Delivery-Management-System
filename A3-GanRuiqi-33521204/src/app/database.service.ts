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
    );
  }

  findPackage(packageId: string) {
    return this.http.get<Package>(API_URL + '/packages/' +packageId, httpOptions);
  }

  getStatistics() {
    return this.http.get(API_URL+'/stats'); 
  }


  login(loginObj:any){
    return this.http.post(API_URL+"/login",loginObj,httpOptions)
  }

  signup(signupObj:any){
    return this.http.post(API_URL+"/signup",signupObj,httpOptions)
  }

}

