'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jqLite = require('jqLite');

var _jqLite2 = _interopRequireDefault(_jqLite);

var _AX6UICore2 = require('./AX6UICore');

var _AX6UICore3 = _interopRequireDefault(_AX6UICore2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var onStateChanged = function onStateChanged(opts, that) {
    if (opts && opts.onStateChanged) {
        opts.onStateChanged.call(that, that);
    } else if (this.onStateChanged) {
        this.onStateChanged.call(that, that);
    }

    opts = null;
    that = null;
    return true;
};
var getBodyTmpl = function getBodyTmpl(data) {
    if (typeof data.templateName === "undefined") data.templateName = "defaultMask";
    return MASK.tmpl.get.call(this, data.templateName, data);
};
var setBody = function setBody(content) {
    this.maskContent = content;
};

var AX6UIMask = function (_AX6UICore) {
    _inherits(AX6UIMask, _AX6UICore);

    function AX6UIMask(config) {
        _classCallCheck(this, AX6UIMask);

        // this.instanceId = ax5.getGuid();
        var _this = _possibleConstructorReturn(this, (AX6UIMask.__proto__ || Object.getPrototypeOf(AX6UIMask)).call(this, config));

        _this.config = {
            theme: '',
            target: (0, _jqLite2.default)(document.body).get(0),
            animateTime: 250
        };
        _this.maskContent = '';
        _this.status = "off";
        return _this;
    }

    return AX6UIMask;
}(_AX6UICore3.default);

exports.default = AX6UIMask;