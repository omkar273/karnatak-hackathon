export interface TaskCountsType {
  tasks_registered: number;
  tasks_open: number;
  tasks_pending: number;
  tasks_closed: number;
}

export interface TaskCounts {
  fir: number;
  patrolling: number;
  evidence_collection: number;
  case_investigation: number;
  forensic: number;
}

