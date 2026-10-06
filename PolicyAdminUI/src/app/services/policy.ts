import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import {
  Policy,
  CreatePolicy,
  UpdatePolicy,
  RenewPolicy,
  CancelPolicy
} from '../models/policy.model';

import { Dashboard } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  private apiUrl = `${environment.apiUrl}/policies`;

  constructor(private http: HttpClient) {
  }

  getPolicies(status?: string): Observable<Policy[]> {

    if (status) {
      return this.http.get<Policy[]>(
        `${this.apiUrl}?status=${encodeURIComponent(status)}`
      );
    }

    return this.http.get<Policy[]>(this.apiUrl);
  }

  getPolicy(policyNumber: string): Observable<Policy> {

    return this.http.get<Policy>(
      `${this.apiUrl}/${encodeURIComponent(policyNumber)}`
    );
  }

  createPolicy(policy: CreatePolicy): Observable<Policy> {

    return this.http.post<Policy>(
      this.apiUrl,
      policy
    );
  }

  updatePolicy(
    policyNumber: string,
    policy: UpdatePolicy
  ): Observable<Policy> {

    return this.http.put<Policy>(
      `${this.apiUrl}/${encodeURIComponent(policyNumber)}`,
      policy
    );
  }

  renewPolicy(
    policyNumber: string,
    renewal: RenewPolicy
  ): Observable<Policy> {

    return this.http.post<Policy>(
      `${this.apiUrl}/${encodeURIComponent(policyNumber)}/renew`,
      renewal
    );
  }

  cancelPolicy(
    policyNumber: string,
    cancellation: CancelPolicy
  ): Observable<Policy> {

    return this.http.post<Policy>(
      `${this.apiUrl}/${encodeURIComponent(policyNumber)}/cancel`,
      cancellation
    );
  }

  getExpiringPolicies(
    withinDays: number = 30
  ): Observable<Policy[]> {

    return this.http.get<Policy[]>(
      `${this.apiUrl}/expiring?withinDays=${withinDays}`
    );
  }

  getDashboard(): Observable<Dashboard> {

    return this.http.get<Dashboard>(
      `${this.apiUrl}/dashboard`
    );
  }
}