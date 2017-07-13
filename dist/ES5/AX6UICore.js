"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AX6UICore = function () {
    function AX6UICore() {
        _classCallCheck(this, AX6UICore);

        // this.instanceId = ax5.getGuid();
        this.config = {};
    }

    _createClass(AX6UICore, [{
        key: "setConfig",
        value: function setConfig(config) {
            this.config = Object.assign(this.config, config);
        }
    }]);

    return AX6UICore;
}();

exports.default = AX6UICore;