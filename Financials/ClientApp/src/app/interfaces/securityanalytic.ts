export interface SecurityAnalytic {
  id: number;
  securityId: number;
  movingAverageDay10: number;
  movingAverageDay20: number;
  movingAverageDay30: number;
  movingAverageDay50: number;
  movingAverageDay100: number;
  movingAverageDay200: number;
  movingAverageYear1: number;
  movingAverageYear2: number;

  maxPriceDay10: number;
  maxPriceDay20: number;
  maxPriceDay30: number;
  maxPriceDay50: number;
  maxPriceDay100: number;
  maxPriceDay200: number;
  maxPriceYear1: number;
  maxPriceYear2: number;

  minPriceDay10: number;
  minPriceDay20: number;
  minPriceDay30: number;
  minPriceDay50: number;
  minPriceDay100: number;
  minPriceDay200: number;
  minPriceYear1: number;
  minPriceYear2: number;

  lastModified: Date;
  latestDateChecked: Date;
  topMoverDetails: string;


}
