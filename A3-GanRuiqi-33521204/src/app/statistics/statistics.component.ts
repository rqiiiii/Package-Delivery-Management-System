import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent {

  data: any;

  constructor(private db: DatabaseService, private router: Router) {}

  ngOnInit(): void {
    this.db.getStatistics().subscribe((data:any) => {
      this.data = data.data; 
    })
    this.db.getStatistics().subscribe();
    }

}

