export interface Dashboard {
    totalPolicies: number;
    activeCount: number;
    expiringSoonCount: number;
    expiredCount: number;
    cancelledCount: number;
    pendingCount: number;
  
    totalWrittenPremium: number;
  
    statusBreakdown: StatusSummary[];
  }
  
  export interface StatusSummary {
    status: string;
    count: number;
    totalPremium: number;
  }