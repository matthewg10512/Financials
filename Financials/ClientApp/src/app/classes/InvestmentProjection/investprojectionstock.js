"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InvestProjectionStock = /** @class */ (function () {
    function InvestProjectionStock() {
        this.historicalPrices = [];
        this.dividends = [];
        this.investProjections = [];
    }
    InvestProjectionStock.prototype.getCurrentPercentageChange = function () {
        var percentage = ((this.priorCost - this.securityRecord.currentPrice) / this.priorCost) * 100;
        if (percentage < 0) {
            percentage = 0;
        }
        return percentage;
    };
    InvestProjectionStock.prototype.setNextDate = function (purchaseFrequency) {
        var investProjectionLength = this.investProjections.length;
        for (var i = 0; i < investProjectionLength; i++) {
            this.investProjections[i].calculateNextDate(purchaseFrequency);
        }
    };
    InvestProjectionStock.prototype.setNextPurchasePrices = function (totalPurchase) {
        var investProjectionLength = this.investProjections.length;
        for (var i = 0; i < investProjectionLength; i++) {
            var yearlyAmountCount = this.investProjections[i].purchaseYearlyAmount.length;
            for (var i2 = yearlyAmountCount - 1; i2 >= 0; i2--) {
                if (this.investProjections[i].purchaseYearlyAmount[i2].totalPurchase() != 0) {
                    //var totalPurchase = this.investProjections[i].purchaseYearlyAmount[i2].totalPurchase();
                    var potentialFutureValue = this.getPotentialFutureValue();
                    this.investProjections[i].recommendYearlyShare = totalPurchase / potentialFutureValue;
                    break;
                }
            }
            this.investProjections[i].calculateNewShares(this.getCurrentPercentageChange());
        }
    };
    //Matt jump back on this
    InvestProjectionStock.prototype.getNextPurchasePrice = function () {
        var investProjectionLength = this.investProjections.length;
        if (investProjectionLength == 0) {
            return 0;
        }
        if (this.investProjections[investProjectionLength - 1].purchaseYearlyAmount) {
            var yearlyAmount = this.investProjections[investProjectionLength - 1].purchaseYearlyAmount.length;
            if (yearlyAmount == 0) {
                return 0;
            }
            return this.investProjections[investProjectionLength - 1].purchaseYearlyAmount[yearlyAmount - 1].totalPurchase() / this.getPotentialFutureValue();
        }
        else {
            return 0;
        }
    };
    InvestProjectionStock.prototype.getNextYear = function () {
        var curDate = new Date();
        curDate.setDate(curDate.getDate() + 365);
        return curDate.toDateString();
    };
    /*Gets the potential value of the stock.  This is based on the current price added by the average rise price percent
     */
    InvestProjectionStock.prototype.getPotentialFutureValue = function () {
        return this.securityRecord.currentPrice + ((this.securityRecord.currentPrice * this.yearlyaAveragePercent) / 100);
    };
    InvestProjectionStock.prototype.getTodayAverageGainsFromPastYears = function () {
        var currentDate = new Date();
        var historicalPriceCount = this.historicalPrices.length;
        var yearlyPrices = [];
        for (var i = 0; i < historicalPriceCount; i++) {
            var dayRange = Math.floor(currentDate.getTime() - new Date(this.historicalPrices[i].historicDate).getTime() / (60 * 24 * 60 * 1000)) % 365;
            if (dayRange < 5) { //meant to retrieve each year open value to get the average
                yearlyPrices.push(this.historicalPrices[i].open);
                i += 5;
            }
        }
        var priceFindCount = yearlyPrices.length;
        var percentAverageCount = 0;
        var percentAverageTotal = 0;
        for (var i = 1; i < priceFindCount; i++) { // gets the average between prior years
            var averageMove = ((yearlyPrices[i] - yearlyPrices[i - 1]) / yearlyPrices[i - 1]) * 100; // the average percentage from one year to the next year
            percentAverageTotal += averageMove; //add the average to the average
            percentAverageCount += 1;
        }
        this.yearlyaAveragePercent = Math.floor(percentAverageTotal / percentAverageCount);
    };
    InvestProjectionStock.prototype.setProjectionStock = function () {
        this.selectedinvestProjection = this.investProjections[3];
    };
    return InvestProjectionStock;
}());
exports.InvestProjectionStock = InvestProjectionStock;
//# sourceMappingURL=investprojectionstock.js.map