"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jqmin = require("jqmin");

var _jqmin2 = _interopRequireDefault(_jqmin);

var _AX6UICore2 = require("./AX6UICore.js");

var _AX6UICore3 = _interopRequireDefault(_AX6UICore2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* ~~~~~~~~~~~~~~~~~~ end of import  ~~~~~~~~~~~~~~~~~~~~ */

/**
 * @class
 */
var AX6UIDocker = function (_AX6UICore) {
    _inherits(AX6UIDocker, _AX6UICore);

    /**
     * @constructor
     * @param config
     */
    function AX6UIDocker(config) {
        _classCallCheck(this, AX6UIDocker);

        /**
         * @member {JSON}
         * @param config
         *
         */
        var _this = _possibleConstructorReturn(this, (AX6UIDocker.__proto__ || Object.getPrototypeOf(AX6UIDocker)).call(this));

        _this.config = {};
        _jqmin2.default.extend(true, _this.config, config);

        // 멤버 변수 초기화
        _this.panels = [];
        _this.board = [];

        // new 할 때 config가 있다면.
        if (typeof config !== "undefined") _this.init();
        return _this;
    }

    /**
     * @method
     */


    _createClass(AX6UIDocker, [{
        key: "init",
        value: function init() {

            if (!this.config.target) {
                console.error("can not find target");
            }

            this.$target = (0, _jqmin2.default)(this.config.target);

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
        key: "repaint",
        value: function repaint() {

            this.panels = [];

            var panel_tmpl = "\n<ax6ui-docker>\n    <ax6ui-docker-pane-axis class=\"horizontal\">\n        <ax6ui-docker-pane-axis class=\"vertical\">\n            \n            <ax6ui-docker-pane class=\"active\" style=\"flex-grow:1;\">\n              <!-- pane -->\n                <ul class=\"item-tabs\">\n                    <li class=\"\">\n                        <title>untitle</title>\n                        <close></close>\n                    </li>\n                    <li class=\"active\">\n                        <title>untitle</title>\n                        <close></close>\n                    </li>\n                </ul>\n                <div class=\"item-views\">\n                    <ax6ui-docker-view class=\"\"></ax6ui-docker-view>\n                    <ax6ui-docker-view class=\"is-focused\"></ax6ui-docker-view>\n                </div>\n              <!-- pane -->\n            </ax6ui-docker-pane>\n            <ax6ui-docker-pane-resize-handle class=\"vertical\"></ax6ui-docker-pane-resize-handle>\n            <ax6ui-docker-pane class=\"\" style=\"flex-grow:1;\">\n              <!-- pane -->\n                <ul class=\"item-tabs\">\n                    <li class=\"\">\n                        <title>untitle</title>\n                        <close></close>\n                    </li>\n                </ul>\n                <div class=\"item-views\">\n                    <ax6ui-docker-view class=\"\"></ax6ui-docker-view>\n                </div>\n              <!-- pane -->\n            </ax6ui-docker-pane>    \n            \n        </ax6ui-docker-pane-axis>\n        <ax6ui-docker-pane-resize-handle class=\"horizontal\"></ax6ui-docker-pane-resize-handle>\n        <ax6ui-docker-pane class=\"\" style=\"flex-grow:1;\">\n            <!-- pane -->\n                <ul class=\"item-tabs\">\n                    <li class=\"\">\n                        <title>untitle</title>\n                        <close></close>\n                    </li>\n                </ul>\n                <div class=\"item-views\">\n                    <ax6ui-docker-view class=\"\"></ax6ui-docker-view>\n                </div>\n            <!-- pane -->\n        </ax6ui-docker-pane>\n    </ax6ui-docker-pane-axis>\n</ax6ui-docker>\n";
        }
    }]);

    return AX6UIDocker;
}(_AX6UICore3.default);

exports.default = AX6UIDocker;