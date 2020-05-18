export interface InsightVenue {
  id: number;
  venue: string;
  product: {label: string, value?: string | number};
  passRate: number;
  failureRate: number;
  materials: number;
  packaging: number;
  appearance: number;
  hideCol: string;
  techMes: number;
  relatedProducts?: Array<{ label: string, value?: string | number }>;
}
