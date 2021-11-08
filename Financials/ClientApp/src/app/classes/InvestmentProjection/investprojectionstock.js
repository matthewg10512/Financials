"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InvestProjectionStock = /** @class */ (function () {
    function InvestProjectionStock() {
        this.historicalPrices = [];
        this.dividends = [];
        this.investProjections = [];
        this.priceFind = [];
        this.priceCount = 0;
    }
    //  {{investProjectionStock.securityRecord.currentPrice}}
    //{{investProjectionStock.priorCost}}
    InvestProjectionStock.prototype.getCurrentPercentageChange = function () {
        var percentage = ((this.priorCost - this.securityRecord.currentPrice) / this.priorCost) * 100;
        if (percentage < 0) {
            percentage = 0;
        }
        return percentage;
    };
    InvestProjectionStock.prototype.setNextDate = function () {
        var investProjectionLength = this.investProjections.length;
        for (var i = 0; i < investProjectionLength; i++) {
            this.investProjections[i].calculateNextDate();
        }
    };
    InvestProjectionStock.prototype.setNextPurchasePrices = function () {
        var investProjectionLength = this.investProjections.length;
        for (var i = 0; i < investProjectionLength; i++) {
            var yearlyAmountCount = this.investProjections[i].purchaseYearlyAmount.length;
            for (var i2 = yearlyAmountCount - 1; i2 >= 0; i2--) {
                if (this.investProjections[i].purchaseYearlyAmount[i2].totalPurchase() != 0) {
                    var totalPurchase = this.investProjections[i].purchaseYearlyAmount[i2].totalPurchase();
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
    InvestProjectionStock.prototype.getPotentialFutureValue = function () {
        return this.securityRecord.currentPrice + ((this.securityRecord.currentPrice * this.averageRisePrice) / 100);
    };
    InvestProjectionStock.prototype.getTodayAverageGainsFromPastYears = function () {
        var currentDate = new Date();
        var historicalPriceCount = this.historicalPrices.length;
        this.priceFind = [];
        this.priceCount = 0;
        for (var i = 0; i < historicalPriceCount; i++) {
            var dayRange = Math.floor(currentDate.getTime() - new Date(this.historicalPrices[i].historicDate).getTime() / (60 * 24 * 60 * 1000)) % 365;
            if (dayRange < 5) {
                this.priceFind.push(this.historicalPrices[i].open);
                i += 5;
                this.priceCount += 1;
            }
            // currentDate
            //(new Date() - thisYear) / (60 * 24 * 60 * 1000) % 365
        }
        var priceFindCount = this.priceFind.length;
        var priceAverageCount = 0;
        var priceAverageTotal = 0;
        for (var i = 1; i < priceFindCount; i++) {
            var averageMove = ((this.priceFind[i] - this.priceFind[i - 1]) / this.priceFind[i - 1]) * 100;
            priceAverageTotal += averageMove;
            priceAverageCount += 1;
        }
        this.averageRisePrice = Math.floor(priceAverageTotal / priceAverageCount);
    };
    return InvestProjectionStock;
}());
exports.InvestProjectionStock = InvestProjectionStock;
//# sourceMappingURL=investprojectionstock.js.map