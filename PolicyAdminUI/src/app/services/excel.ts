import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  private apiUrl = `${environment.apiUrl}/excel/policies`;

  constructor(private http: HttpClient) {
  }

  exportPolicies(): Observable<Blob> {

    return this.http.get(
      `${this.apiUrl}/export`,
      {
        responseType: 'blob'
      }
    );
  }

  importPolicies(file: File): Observable<any> {

    const formData = new FormData();

    formData.append('file', file);

    return this.http.post(
      `${this.apiUrl}/import`,
      formData
    );
  }
}