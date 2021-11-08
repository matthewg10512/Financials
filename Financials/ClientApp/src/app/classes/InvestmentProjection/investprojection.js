"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var purchaseYearly = /** @class */ (function () {
    function purchaseYearly() {
    }
    return purchaseYearly;
}());
exports.purchaseYearly = purchaseYearly;
var InvestProjection = /** @class */ (function () {
    function InvestProjection() {
        this.currentPurchaseShares = 1;
        this.numberOfShares = 0;
        this.dividendProfit = 0;
        this.purchaseAmount = 0;
    }
    InvestProjection.prototype.calculateShares = function (priorCost, newCost, currentYear) {
        switch (Number(this.projectionTypeId)) {
            case 0:
                this.currentPurchaseShares = 1;
                break;
            case 1:
                if (this.currentPurchaseShares < 5) {
                    this.currentPurchaseShares += 1;
                }
                break;
            case 2:
                var percentDrop = Math.floor(((priorCost - newCost) / priorCost * 100)
                    / 5);
                this.currentPurchaseShares = 1 + percentDrop;
                break;
            case 3:
                var percentDrop2 = Math.floor(((priorCost - newCost) / priorCost * 100)
                    / 3);
                this.currentPurchaseShares = 1 + percentDrop2;
                break;
        }
        this.AddShares(newCost);
    };
    InvestProjection.prototype.GetAverageCost = function () {
        return this.purchaseAmount / this.numberOfShares;
    };
    InvestProjection.prototype.AddShares = function (newCost) {
        this.numberOfShares += this.currentPurchaseShares;
        this.purchaseAmount += newCost * this.currentPurchaseShares;
    };
    InvestProjection.prototype.AddDividends = function (dividend) {
        this.dividendProfit += (dividend * this.numberOfShares);
    };
    return InvestProjection;
}());
exports.InvestProjection = InvestProjection;
//# sourceMappingURL=investprojection.js.map