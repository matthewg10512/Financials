export class CurrentPeakRange {
  id: number;
  securityId: number;
  rangeName: string;
  dateCreated: Date;
  dateModified: Date;
  rangeLength: number;
  rangeDateStart: Date;
  peakRangeCurrentPercentage: number;
  lastOpenHigh: number;


   getLengthFromRangeDateStart(): string {
    return  'test';
  }

  // var currentDate = new Date;

//var Difference_In_Time = currentDate.getTime(); -  this.rangeDateStart.getTime();

// To calculate the no. of days between two dates
//var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

}
