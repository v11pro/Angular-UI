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
  selector: 'app-edit-policy',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-policy.html',
  styleUrl: './edit-policy.css'
})
export class EditPolicy implements OnInit {

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

      customerEmail: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      customerPhone: [
        '',
        Validators.required
      ],

      paymentFrequency: [
        '',
        Validators.required
      ]

    });

    this.policyNumber =
      this.route.snapshot.paramMap.get('policyNumber') || '';

    this.loadPolicy();
  }

  loadPolicy(): void {

    this.policyService
      .getPolicy(this.policyNumber)
      .subscribe({

        next: (policy) => {

          this.form.patchValue({

            customerEmail: policy.customerEmail,

            customerPhone: policy.customerPhone,

            paymentFrequency: policy.paymentFrequency

          });

        },

        error: (error) => {

          console.error(error);

          this.errorMessage =
            'Unable to load policy.';
        }

      });
  }

  submit(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }

    this.loading = true;

    this.policyService
      .updatePolicy(
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
            'Unable to update policy.';
        }

      });
  }
}