"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _AX6Util = require("../AX6Util");

var _AX6Util2 = _interopRequireDefault(_AX6Util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sum = function sum() {
    var value = 0,
        i = this.list.length;
    while (i--) {
        if (!("__groupingList" in this.list[i])) {
            value += _AX6Util2.default.number(this.list[i][this.key]);
        }
    }
    return value;
};

var avg = function avg() {
    var value = 0,
        i = this.list.length,
        listLength = 0;
    while (i--) {
        if (!("__groupingList" in this.list[i])) {
            value += _AX6Util2.default.number(this.list[i][this.key]);
            listLength++;
        }
    }
    return _AX6Util2.default.number(value / (listLength || 1), { "round": 2 });
};

exports.default = {
    sum: sum,
    avg: avg
};