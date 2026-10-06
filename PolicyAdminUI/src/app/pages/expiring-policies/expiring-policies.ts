import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { PolicyService } from '../../services/policy';
import { Policy } from '../../models/policy.model';

@Component({
  selector: 'app-expiring-policies',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './expiring-policies.html',
  styleUrl: './expiring-policies.css'
})
export class ExpiringPolicies implements OnInit {

  policies: Policy[] = [];

  withinDays = 30;

  loading = false;
  errorMessage = '';

  constructor(
    private policyService: PolicyService
  ) {
  }

  ngOnInit(): void {
    this.loadPolicies();
  }

  loadPolicies(): void {

    this.loading = true;

    this.policyService
      .getExpiringPolicies(this.withinDays)
      .subscribe({

        next: (data) => {

          this.policies = data;

          this.loading = false;
        },

        error: (error) => {

          console.error(error);

          this.errorMessage =
            'Unable to load expiring policies.';

          this.loading = false;
        }

      });
  }
}