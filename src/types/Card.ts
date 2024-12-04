export interface Card {
  id: number;
  name: string;
  url: string;
  imageUrl: string;
  brand: string;
  brandImageUrl: string;
  firstYearFee: string;
  annualFee: string;
  freeCondition?: string;
  additionalCards: string;
  additionalCardFee: string;
  pointRate: string;
  mileRate?: string;
  mileConversionRate?: string;
  etcFee: string;
  requirements: string;
  accountingSoftware: string;
  creditLimit: string;
  insurance: string;
  features: string;
  issuanceTime: string;
  billingCycle: string;
  maxPaymentCycle: string;
  priorityPass?: string;
}

export interface FilterOptions {
  annualFee: string[];
  brand: string[];
  additionalCards: string[];
  pointRate: string[];
  mileRate: string[];
  priorityPass: boolean;
  etcCard: boolean;
  insurance: boolean;
}

export type SortOption = 'mileRate' | 'pointRate' | 'annualFeeAsc' | 'annualFeeDsc';