import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { Quote } from '../models/quote.model';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  private apiUrl = `${environment.apiUrl}/quotes`;

  constructor(private http: HttpClient) {
  }

  getQuotes(status?: string): Observable<Quote[]> {

    if (status) {
      return this.http.get<Quote[]>(
        `${this.apiUrl}?status=${encodeURIComponent(status)}`
      );
    }

    return this.http.get<Quote[]>(this.apiUrl);
  }

  getQuote(quoteId: string): Observable<Quote> {

    return this.http.get<Quote>(
      `${this.apiUrl}/${encodeURIComponent(quoteId)}`
    );
  }
}