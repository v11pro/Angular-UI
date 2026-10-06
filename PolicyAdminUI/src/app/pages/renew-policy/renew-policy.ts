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
  selector: 'app-renew-policy',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './renew-policy.html',
  styleUrl: './renew-policy.css'
})
export class RenewPolicy implements OnInit {

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

      proposedPremium: [
        0,
        [
          Validators.required,
          Validators.min(0)
        ]
      ],

      extensionYears: [
        1,
        [
          Validators.required,
          Validators.min(1)
        ]
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
      .renewPolicy(
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
            'Unable to renew policy.';
        }

      });
  }
}