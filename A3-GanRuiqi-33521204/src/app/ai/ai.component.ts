import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import { io } from 'socket.io-client';
import { Package } from '../models/package';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ai',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ai.component.html',
  styleUrl: './ai.component.css'
})
export class AiComponent {
  packageDB: Package[] = [];
  driverData:any =[];
  socket:any;
  distance:any="";



  constructor(private db: DatabaseService, private router: Router) {
    this.socket = io();  // Initialize socket connection
    this.socket.on('aiServerEvent', (aiData: any) => {
      this.distance=aiData;  // Update response when event is received
    });
  }

    ngOnInit() {
    this.db.getPackages().subscribe((packages: any) => {
      this.packageDB = packages; 
    })

    this.db.getPackages().subscribe();
    }
    onAi(destination:any){
      this.socket.emit("aiEvent",destination)

    }
}

