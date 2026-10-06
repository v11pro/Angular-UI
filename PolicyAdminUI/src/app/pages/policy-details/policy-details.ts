import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { PolicyService } from '../../services/policy';
import { Policy } from '../../models/policy.model';

@Component({
  selector: 'app-policy-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './policy-details.html',
  styleUrl: './policy-details.css'
})
export class PolicyDetails implements OnInit {

  policy?: Policy;

  loading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private policyService: PolicyService
  ) {
  }

  ngOnInit(): void {

    const policyNumber =
      this.route.snapshot.paramMap.get('policyNumber');

    if (policyNumber) {
      this.loadPolicy(policyNumber);
    }
  }

  loadPolicy(policyNumber: string): void {

    this.loading = true;

    this.policyService.getPolicy(policyNumber).subscribe({

      next: (data) => {
        this.policy = data;
        this.loading = false;
      },

      error: (error) => {

        console.error(error);

        this.errorMessage =
          'Unable to load policy details.';

        this.loading = false;
      }

    });
  }
}