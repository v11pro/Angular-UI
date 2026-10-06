import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExcelService } from '../../services/excel';

@Component({
  selector: 'app-excel',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './excel.html',
  styleUrl: './excel.css'
})
export class Excel {

  selectedFile?: File;

  message = '';
  errorMessage = '';

  importing = false;
  exporting = false;

  constructor(
    private excelService: ExcelService
  ) {
  }

  onFileSelected(event: Event): void {

    const input =
      event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {

      this.selectedFile =
        input.files[0];

    }
  }

  importPolicies(): void {

    if (!this.selectedFile) {

      this.errorMessage =
        'Please select an Excel file.';

      return;
    }

    this.importing = true;
    this.message = '';
    this.errorMessage = '';

    this.excelService
      .importPolicies(this.selectedFile)
      .subscribe({

        next: () => {

          this.importing = false;

          this.message =
            'Policies imported successfully.';

        },

        error: (error) => {

          console.error(error);

          this.importing = false;

          this.errorMessage =
            error?.error?.message ||
            'Unable to import policies.';
        }

      });
  }

  exportPolicies(): void {

    this.exporting = true;
    this.message = '';
    this.errorMessage = '';

    this.excelService
      .exportPolicies()
      .subscribe({

        next: (blob) => {

          const url =
            window.URL.createObjectURL(blob);

          const link =
            document.createElement('a');

          link.href = url;

          link.download =
            'policies.xlsx';

          link.click();

          window.URL.revokeObjectURL(url);

          this.exporting = false;

          this.message =
            'Policies exported successfully.';
        },

        error: (error) => {

          console.error(error);

          this.exporting = false;

          this.errorMessage =
            'Unable to export policies.';
        }

      });
  }
}