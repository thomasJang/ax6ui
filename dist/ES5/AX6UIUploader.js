"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jqmin = require("jqmin");

var _jqmin2 = _interopRequireDefault(_jqmin);

var _AX6UICore2 = require("./AX6UICore.js");

var _AX6UICore3 = _interopRequireDefault(_AX6UICore2);

var _AX6Util = require("./AX6Util");

var _AX6Util2 = _interopRequireDefault(_AX6Util);

var _AX6Mustache = require("./AX6Mustache.js");

var _AX6Mustache2 = _interopRequireDefault(_AX6Mustache);

require("./AX6UIToast/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class
 */
var AX6UIToast = function (_AX6UICore) {
  _inherits(AX6UIToast, _AX6UICore);

  /**
   * @constructor
   * @param config
   */
  function AX6UIToast(config) {
    _classCallCheck(this, AX6UIToast);

    /**
     * @member {JSON}
     * @param config
     *
     */
    var _this = _possibleConstructorReturn(this, (AX6UIToast.__proto__ || Object.getPrototypeOf(AX6UIToast)).call(this));

    _this.config = {};
    _jqmin2.default.extend(true, _this.config, config);

    // 멤버 변수 초기화

    if (typeof config !== "undefined") _this.init();
    return _this;
  }

  /**
   * @method
   */


  _createClass(AX6UIToast, [{
    key: "init",
    value: function init() {
      this.onStateChanged = this.config.onStateChanged;
      delete this.config.onStateChanged;

      // init 호출 여부
      this.initOnce();
    }

    /**
     * @method
     */

  }, {
    key: "initOnce",
    value: function initOnce() {
      if (this.initialized) return this;
      this.initialized = true;
    }
  }]);

  return AX6UIToast;
}(_AX6UICore3.default);

exports.default = AX6UIToast;