"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var purchaseYearly = /** @class */ (function () {
    function purchaseYearly() {
        this.sharePurchaseHistory = [];
        this.percentageShares = 1;
        this.dividendProfit = 0;
    }
    purchaseYearly.prototype.totalShares = function () {
        var shareAmount = 0;
        var shareCount = this.sharePurchaseHistory.length;
        for (var i = 0; i < shareCount; i++) {
            shareAmount += this.sharePurchaseHistory[i].shares;
        }
        return shareAmount;
    };
    purchaseYearly.prototype.totalPurchase = function () {
        var shareAmount = 0;
        var shareCount = this.sharePurchaseHistory.length;
        for (var i = 0; i < shareCount; i++) {
            shareAmount += this.sharePurchaseHistory[i].purchaseAmount;
        }
        return shareAmount;
    };
    purchaseYearly.prototype.GetAverageCost = function () {
        return this.totalPurchase() / this.totalShares();
    };
    return purchaseYearly;
}());
exports.purchaseYearly = purchaseYearly;
//# sourceMappingURL=purchaseyearly.js.map