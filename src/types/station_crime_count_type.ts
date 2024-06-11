export interface FirTypeCount {
  id?: string;
  stationId: string;
  Theft: number;
  Robbery: number;
  Assault: number;
  Burglary: number;
  Fraud: number;
  Murder: number;
  SexualAssault: number;
  DrugTrafficking: number;
  Cybercrime: number;
  Kidnapping: number;
  MoneyLaundering: number;
  Bribery: number;
  Stalking: number;
  DomesticViolence: number;
  IdentityTheft: number;
  Counterfeiting: number;
  Harassment: number;
}

export interface FIRCountsType {
  cases_registered: number;
  cases_open: number;
  cases_closed: number;
}
