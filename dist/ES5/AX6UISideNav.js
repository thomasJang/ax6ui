"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jqmin = require("jqmin");

var _jqmin2 = _interopRequireDefault(_jqmin);

var _AX6UICore2 = require("./AX6UICore");

var _AX6UICore3 = _interopRequireDefault(_AX6UICore2);

var _AX6Util = require("./AX6Util");

var _AX6Util2 = _interopRequireDefault(_AX6Util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* ~~~~~~~~~~~~~~~~~~ end of import  ~~~~~~~~~~~~~~~~~~~~ */

/* ~~~~~~~~~~~~~~~~~~ end of private  ~~~~~~~~~~~~~~~~~~~~ */

/**
 * @class
 */
var AX6UISideNav = function (_AX6UICore) {
  _inherits(AX6UISideNav, _AX6UICore);

  /**
   * @constructor
   * @param config
   */
  function AX6UISideNav(config) {
    _classCallCheck(this, AX6UISideNav);

    /**
     * @member {JSON}
     * @param config
     * @param config.menu
     * @param [config.menu.width=256]
     * @param [config.menu.position='left']
     * @param config.menu.target
     * @param config.panel
     * @param config.panel.target
     *
     */
    var _this = _possibleConstructorReturn(this, (AX6UISideNav.__proto__ || Object.getPrototypeOf(AX6UISideNav)).call(this));

    _this.config = {
      menu: {
        width: 256,
        position: "left"
      },
      panel: {},
      transition: {
        duration: 300,
        easing: 'ease'
      }

    };
    _AX6Util2.default.extend(true, _this.config, config);

    // 멤버 변수 초기화
    _this.$targetMenu = null;
    _this.$targetPanel = null;

    _this.animating = false;
    _this.opened = false;

    if (typeof config !== "undefined") _this.init();
    return _this;
  }

  /**
   * @method
   */


  _createClass(AX6UISideNav, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      if (!this.config.menu.target || !this.config.panel.target) {
        console.error('Can not found config.menu.target, config.panel.target');
      }

      this.$targetMenu = (0, _jqmin2.default)(this.config.menu.target);
      this.$targetPanel = (0, _jqmin2.default)(this.config.panel.target);

      this.$targetMenu.css({ width: this.config.menu.width }).attr("data-ax6ui-sidenav-position", this.config.menu.position);
      this.$targetPanel.attr("data-ax6ui-sidenav-position", this.config.menu.position).on('click', function (e) {
        if (_this2.opened) _this2.close();
      });

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
  }, {
    key: "open",
    value: function open() {
      var _this3 = this;

      if (this.animating) return this;

      (0, _jqmin2.default)('html').attr('data-ax6ui-sidenav-open', 'true');

      this.$targetPanel.css({
        'transform': 'translateX(' + this.config.menu.width + 'px)',
        '-webkit-transition': 'transform ' + this.config.transition.duration + 'ms ' + this.config.transition.easing
      });

      setTimeout(function () {
        _this3.opened = true;
      }, this.config.transition.duration);

      return this;
    }
  }, {
    key: "close",
    value: function close() {
      var _this4 = this;

      if (this.animating) return this;

      this.$targetPanel.css({
        'transform': 'translateX(0px)',
        '-webkit-transition': 'transform ' + this.config.transition.duration + 'ms ' + this.config.transition.easing
      });

      setTimeout(function () {
        (0, _jqmin2.default)('html').attr('data-ax6ui-sidenav-open', null);
        _this4.opened = false;
      }, this.config.transition.duration);

      return this;
    }
  }]);

  return AX6UISideNav;
}(_AX6UICore3.default);

exports.default = AX6UISideNav;