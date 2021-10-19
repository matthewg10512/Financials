import { Security } from "./security";

export interface AutoSecurityTradeSecurity {
  id: number;
  securityId: number;
  purchaseDate: Date;
  sellDate: Date;
  purchasePrice: number;
  sellPrice: number;
  sharesBought: number;
  percentageLevel: number;
  security: Security
  totalamount: number;

}
