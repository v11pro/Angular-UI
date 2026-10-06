import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolicyService } from '../../services/policy';
import { Dashboard as DashboardModel } from '../../models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  dashboard?: DashboardModel;

  loading = false;
  errorMessage = '';

  constructor(
    private policyService: PolicyService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {

    this.loading = true;
    this.errorMessage = '';

    this.policyService.getDashboard().subscribe({

      next: (data) => {

        console.log('Dashboard received:', data);

        this.dashboard = data;
        this.loading = false;

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error('Dashboard API Error:', error);

        this.errorMessage = 'Unable to load dashboard.';
        this.loading = false;

        this.cdr.detectChanges();
      }

    });
  }
}