import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { PolicyService } from '../../services/policy';

@Component({
  selector: 'app-cancel-policy',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './cancel-policy.html',
  styleUrl: './cancel-policy.css'
})
export class CancelPolicy implements OnInit {

  form!: FormGroup;

  policyNumber = '';

  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private policyService: PolicyService
  ) {
  }

  ngOnInit(): void {

    this.form = this.fb.group({

      cancellationDate: [
        '',
        Validators.required
      ],

      reason: [
        '',
        Validators.required
      ],

      notes: [
        ''
      ]

    });

    this.policyNumber =
      this.route.snapshot.paramMap.get('policyNumber') || '';
  }

  submit(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }

    this.loading = true;

    this.policyService
      .cancelPolicy(
        this.policyNumber,
        this.form.value
      )
      .subscribe({

        next: () => {

          this.loading = false;

          this.router.navigate([
            '/policies',
            this.policyNumber
          ]);

        },

        error: (error) => {

          console.error(error);

          this.loading = false;

          this.errorMessage =
            error?.error?.message ||
            'Unable to cancel policy.';
        }

      });
  }
}