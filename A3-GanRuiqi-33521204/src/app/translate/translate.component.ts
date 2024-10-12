import { Component } from '@angular/core';
import { Package } from '../models/package';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { io } from 'socket.io-client';


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
  data:any  = []
  translatedData: any =[]
  socket: any;

  constructor(private db: DatabaseService, private router: Router) {
    this.socket = io();  // Initialize socket connection
    this.socket.on('translateServerEvent', (translatedData: any) => {
      this.translatedData.push(translatedData);  // Update response when event is received
      console.log(this.translatedData,"data");  // Log the response from the server
    });
  }

    ngOnInit() {
    this.db.getPackages().subscribe((packages: any) => {
      this.packageDB = packages; 
    })

    this.db.getPackages().subscribe();
    }

  onTranslate(description:any) {
    console.log(description,"des")
    console.log(this.targetLanguage)
    const data = {
              description,
              targetLanguage: this.targetLanguage
            };
    this.data=data
    console.log(this.data,"msg");  // Log the message to be sent
    this.socket.emit('translateEvent', this.data);  // Emit the message to the server
  }

       

  
}
