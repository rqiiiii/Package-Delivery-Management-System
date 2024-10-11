import { Component } from '@angular/core';
import { Package } from '../models/package';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-translate',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './translate.component.html',
  styleUrl: './translate.component.css'
})
export class TranslateComponent {
  
  packageDB: Package[] = [];
  driverData:any =[];
  targetLanguage:any =""
  data:any 
  translatedData: any =[]
  translated:boolean = false;


  constructor(private db: DatabaseService, private router: Router) {}


    // onFindDriver(){
    //   this.db.getDrivers().subscribe();
    // }

    ngOnInit() {
    this.db.getPackages().subscribe((packages: any) => {
      this.packageDB = packages; 
    })

    this.db.getPackages().subscribe();
    }

    onTranslate(description:any){
      if (this.targetLanguage) {
        const data = {
          description,
          targetLanguage: this.targetLanguage
        };
        this.data =data
        console.log(this.data,"data")
        this.db.getTranslation(this.data).subscribe((response:any) => {
          console.log('Translation result:', response);
          this.translatedData.push(response);
          this.translated = true;
        }, (error) => {
          console.error('Translation failed', error);
        });
      } else {
        alert('Please select a target language.');
      }
    
    }

       

  
}
