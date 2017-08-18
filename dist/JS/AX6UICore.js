"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jqmin = require("jqmin");

var _jqmin2 = _interopRequireDefault(_jqmin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UI_INSTANCE_ID = 0;

/**
 *  @class
 */

var AX6UICore = function () {
  _createClass(AX6UICore, null, [{
    key: "getInstanceId",
    value: function getInstanceId() {
      return UI_INSTANCE_ID++;
    }

    /**
     * @constructor
     */

  }]);

  function AX6UICore() {
    _classCallCheck(this, AX6UICore);

    this.initialized = false;
    this.instanceId = AX6UICore.getInstanceId();
  }

  /**
   * @method
   * @param config
   * @return {AX6UICore}
   */


  _createClass(AX6UICore, [{
    key: "setConfig",
    value: function setConfig(config) {
      _jqmin2.default.extend(this.config, config);

      this.init();
      return this;
    }

    /**
     * UI가 생성될 때, config 속성이 바뀔때 호출 되는 내부 메서드
     * @method
     */

  }, {
    key: "init",
    value: function init() {
      // 초기화 함수,

      this.initOnce();
    }

    /**
     * UI가 랜더링 될 때 1회만 호출되는 메소드 repaint가 필요한 상황엔 별도의 repaint 메서드를 이용할 것을 권장
     * @method
     */

  }, {
    key: "initOnce",
    value: function initOnce() {
      // 1회만 호출되어야 하는 초기화 함수
      if (this.initialized) return this;
      this.initialized = true;
      //
    }

    /**
     * @method
     */

  }, {
    key: "destory",
    value: function destory() {}
  }]);

  return AX6UICore;
}();

exports.default = AX6UICore;