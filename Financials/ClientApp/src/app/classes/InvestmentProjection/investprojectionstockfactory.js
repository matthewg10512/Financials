"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InvestProjectionModel_1 = require("./InvestProjectionModel");
var InvestProjectionStockFactory = /** @class */ (function () {
    //securities: Security[];
    function InvestProjectionStockFactory() {
        this.investProjectionStocks = [];
        this.investProjectionModel = new InvestProjectionModel_1.InvestProjectionModel();
        this.userId = 1;
    }
    InvestProjectionStockFactory.prototype.UpdateStockPrices = function () {
        var investStocks = this.investProjectionStocks.length;
        for (var i = 0; i < investStocks; i++) {
            this.investProjectionStocks[i].UpdateStockPrices();
        }
    };
    InvestProjectionStockFactory.prototype.DetermineAverageGain = function () {
        var investStocks = this.investProjectionStocks.length;
        for (var i = 0; i < investStocks; i++) {
            this.investProjectionStocks[i].getTodayAverageGainsFromPastYears();
        }
    };
    return InvestProjectionStockFactory;
}());
exports.InvestProjectionStockFactory = InvestProjectionStockFactory;
//# sourceMappingURL=investprojectionstockfactory.js.map