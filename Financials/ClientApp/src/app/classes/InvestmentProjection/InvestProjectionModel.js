"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InvestProjectionModel = /** @class */ (function () {
    function InvestProjectionModel() {
        this.projectionName = '';
        this.repeatInvestmentAmount = 10000;
        this.repeatInvestmentFrequency = 1;
        this.purchaseFrequency = 5;
        this.yearRangeLow = 2015;
        this.yearRangeHigh = new Date().getFullYear();
    }
    return InvestProjectionModel;
}());
exports.InvestProjectionModel = InvestProjectionModel;
//# sourceMappingURL=InvestProjectionModel.js.map