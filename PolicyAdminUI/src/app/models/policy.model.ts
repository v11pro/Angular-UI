export interface Policy {
    policyId: number;
    policyNumber: string;
  
    quoteId: string;
  
    customerId: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
  
    petId: string;
    petName: string;
    petType: string;
    breed: string;
    age: number;
  
    startDate: string;
    endDate: string;
  
    premium: number;
    paymentFrequency: string;
  
    status: string;
  
    coverages: PolicyCoverage[];
    transactions: PolicyTransaction[];
    renewals: PolicyRenewal[];
  }
  
  export interface PolicyCoverage {
    policyCoverageId: number;
    policyId: number;
  
    coverageType: string;
    annualLimit: number;
    deductible: number;
    reimbursementPct: number;
  }
  
  export interface PolicyTransaction {
    transactionId: number;
    policyId: number;
  
    transactionType: string;
    effectiveDate: string;
    notes: string;
  }
  
  export interface PolicyRenewal {
    renewalId: number;
    policyId: number;
  
    previousEndDate: string;
    newStartDate: string;
    newEndDate: string;
  
    previousPremium: number;
    newPremium: number;
  
    renewalDate: string;
  }
  
  export interface CreatePolicy {
    quoteId: string;
    policyNumber: string;
  
    startDate: string;
    endDate: string;
  
    paymentFrequency: string;
    annualPremium: number;
  
    coverageType: string;
    annualLimit: number;
    deductible: number;
    reimbursementPct: number;
  }
  
  export interface UpdatePolicy {
    customerEmail: string;
    customerPhone: string;
    paymentFrequency: string;
  }
  
  export interface RenewPolicy {
    proposedPremium: number;
    extensionYears: number;
    notes: string;
  }
  
  export interface CancelPolicy {
    cancellationDate: string;
    reason: string;
    notes: string;
  }