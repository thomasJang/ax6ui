"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _AX6Util = require("./AX6Util");

var _AX6Util2 = _interopRequireDefault(_AX6Util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var money = function money() {
    if (typeof this.value !== "undefined") {
        var val = ('' + this.value).replace(/[^0-9^\.^\-]/g, ""),
            regExpPattern = new RegExp('([0-9])([0-9][0-9][0-9][,.])'),
            arrNumber = val.split('.'),
            returnValue = void 0;

        arrNumber[0] += '.';

        do {
            arrNumber[0] = arrNumber[0].replace(regExpPattern, '$1,$2');
        } while (regExpPattern.test(arrNumber[0]));

        return arrNumber.length > 1 ? arrNumber[0] + _AX6Util2.default.left(arrNumber[1], 2) : arrNumber[0].split('.')[0];
    } else {
        return "";
    }
};

exports.default = {
    money: money
};