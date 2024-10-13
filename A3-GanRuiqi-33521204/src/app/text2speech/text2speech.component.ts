import { Component } from '@angular/core';
import { Driver } from '../models/driver';
import { Package } from '../models/package';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { UpperPipe } from '../pipes/upper.pipe';
import { response } from 'express';
import { io } from 'socket.io-client';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-text2speech',
  standalone: true,
  imports: [UpperPipe,CommonModule],
  templateUrl: './text2speech.component.html',
  styleUrl: './text2speech.component.css'
})

export class Text2speechComponent {
  socket: any;
  driverDB: any = [];
  data: any;
  speechUrl: any;
  text: any;

  constructor(private db: DatabaseService, private router: Router) {
    this.socket = io();  // Initialize socket connection
    this.socket.on('t2sServerEvent', (data: any) => {
      setTimeout(() => {
        this.speechUrl = data.file; // Set the speech file path
        this.text = data.text; // Set the original text
        this.ngOnInit(); 
        this.playAudio(this.speechUrl);
      }, 300);
    });
  }

  ngOnInit() {
    this.db.getDrivers().subscribe((drivers: any) => {
      this.driverDB = drivers; 
    });
  }

  playAudio(data: any) {
    const audioElement = document.getElementById("speech") as HTMLAudioElement;
    const audioSource = document.getElementById("speech2") as HTMLSourceElement;

    if (audioElement && audioSource) {
      audioSource.src = ''; // Clear existing source
      setTimeout(() => {
        audioElement.pause(); // Pause any currently playing audio
        audioSource.src = data; // Set new source
        audioElement.load(); // Load new audio
        audioElement.play().catch(error => {
          console.error('Error playing audio:', error);
        });
      }, 50);
    }
  }

  onSpeech(text: any) {
    this.text = text;
    const data = {
      text,
      file: this.speechUrl
    };
    this.data = data;
    this.socket.emit('t2sEvent', this.data);
  }


}


