"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _AX6Util = require("./AX6Util");

var _AX6Util2 = _interopRequireDefault(_AX6Util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UI_INSTANCE_ID = 0;

var AX6UICore = function () {
    _createClass(AX6UICore, null, [{
        key: "getInstanceId",
        value: function getInstanceId() {
            return UI_INSTANCE_ID++;
        }
    }]);

    function AX6UICore() {
        _classCallCheck(this, AX6UICore);

        this.initialized = false;
        this.instanceId = AX6UICore.getInstanceId();
    }

    _createClass(AX6UICore, [{
        key: "setConfig",
        value: function setConfig(config, callInit) {
            _lodash2.default.merge(this.config, config);

            this.init();
            return this;
        }
    }, {
        key: "init",
        value: function init() {
            // 초기화 함수,

            this.initOnce();
        }
    }, {
        key: "initOnce",
        value: function initOnce() {
            // 1회만 호출되어야 하는 초기화 함수
            if (this.initialized) return this;
            this.initialized = true;
            //
        }
    }]);

    return AX6UICore;
}();

exports.default = AX6UICore;