import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import { PolicyService } from '../../services/policy';
import { QuoteService } from '../../services/quote';

import { Quote } from '../../models/quote.model';
import { CreatePolicy as CreatePolicyModel } from '../../models/policy.model';

@Component({
  selector: 'app-create-policy',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-policy.html',
  styleUrl: './create-policy.css'
})
export class CreatePolicy implements OnInit {

  form!: FormGroup;

  quotes: Quote[] = [];

  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private policyService: PolicyService,
    private quoteService: QuoteService,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    this.form = this.fb.group({

      quoteId: [
        '',
        Validators.required
      ],

      policyNumber: [
        '',
        Validators.required
      ],

      startDate: [
        '',
        Validators.required
      ],

      endDate: [
        '',
        Validators.required
      ],

      paymentFrequency: [
        'Monthly',
        Validators.required
      ],

      annualPremium: [
        0,
        [
          Validators.required,
          Validators.min(0)
        ]
      ],

      coverageType: [
        '',
        Validators.required
      ],

      annualLimit: [
        0,
        [
          Validators.required,
          Validators.min(0)
        ]
      ],

      deductible: [
        0,
        [
          Validators.required,
          Validators.min(0)
        ]
      ],

      reimbursementPct: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.max(100)
        ]
      ]

    });

    this.loadApprovedQuotes();
  }

  loadApprovedQuotes(): void {

    this.quoteService.getQuotes('Approved').subscribe({

      next: (data) => {
        this.quotes = data;
      },

      error: (error) => {
        console.error(error);
        this.errorMessage = 'Unable to load approved quotes.';
      }

    });
  }

  selectQuote(event: Event): void {

    const select = event.target as HTMLSelectElement;

    const quoteId = select.value;

    const quote = this.quotes.find(
      q => q.quoteId === quoteId
    );

    if (!quote) {
      return;
    }

    this.form.patchValue({

      quoteId: quote.quoteId,

      annualPremium: quote.annualPremium,

      paymentFrequency: quote.paymentFrequency,

      coverageType: quote.coverageType,

      annualLimit: quote.annualLimit,

      deductible: quote.deductible,

      reimbursementPct: quote.reimbursementPct

    });
  }

  submit(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const model: CreatePolicyModel = this.form.value;

    this.policyService.createPolicy(model).subscribe({

      next: (policy) => {

        this.loading = false;

        this.successMessage =
          'Policy created successfully.';

        this.router.navigate([
          '/policies',
          policy.policyNumber
        ]);

      },

      error: (error) => {

        console.error(error);

        this.loading = false;

        this.errorMessage =
          error?.error?.message ||
          'Unable to create policy.';
      }

    });
  }
}