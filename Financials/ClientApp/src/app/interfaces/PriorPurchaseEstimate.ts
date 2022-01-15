export interface PriorPurchaseEstimate {
  id: number;
  securityId: number;
  dateCreated: Date;
  dateModified: Date;
  shares: number;
  purchasePrice: number;
  firstPurchaseDate: Date;
  purchaseFrequency: number;
}
