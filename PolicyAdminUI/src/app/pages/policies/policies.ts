import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { PolicyService } from '../../services/policy';
import { Policy } from '../../models/policy.model';

@Component({
  selector: 'app-policies',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './policies.html',
  styleUrl: './policies.css'
})
export class Policies implements OnInit {

  policies: Policy[] = [];

  loading = false;
  errorMessage = '';

  constructor(
    private policyService: PolicyService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadPolicies();
  }

  loadPolicies(): void {

    this.loading = true;
    this.errorMessage = '';

    this.policyService.getPolicies().subscribe({

      next: (data) => {

        console.log('Policies received:', data);

        this.policies = data;
        this.loading = false;

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error('Policies API Error:', error);

        this.errorMessage = 'Unable to load policies.';
        this.loading = false;

        this.cdr.detectChanges();
      }

    });
  }
}