'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jqmin = require('jqmin');

var _jqmin2 = _interopRequireDefault(_jqmin);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _AX6UICore2 = require('./AX6UICore');

var _AX6UICore3 = _interopRequireDefault(_AX6UICore2);

var _AX6Mustache = require('./AX6Mustache');

var _AX6Mustache2 = _interopRequireDefault(_AX6Mustache);

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
var getBodyTmpl = function getBodyTmpl(data, columnKeys) {
    var defaultMask = function defaultMask(columnKeys) {
        return '\n            <div class="ax-mask {{theme}}" id="{{maskId}}">\n                <div class="ax-mask-bg"></div>\n                <div class="ax-mask-content">\n                    <div class="ax-mask-body">\n                    {{{body}}}\n                    </div>\n                </div>\n            </div>\n        ';
    };
    return _AX6Mustache2.default.render(defaultMask.call(this, columnKeys), data);
};
var setBody = function setBody(content) {
    this.maskContent = content;
};

/**
 * @class AX6UIMask
 * @classdesc 웹페이지 마스크
 */

var AX6UIMask = function (_AX6UICore) {
    _inherits(AX6UIMask, _AX6UICore);

    /**
     * @constructor
     * @param config
     * @param [config.theme]
     * @param [config.target]
     * @param [config.anmateTime]
     * @param [config.onStateChanged]
     * @param [config.onClick]
     * @param [config.content]
     */
    function AX6UIMask(config) {
        _classCallCheck(this, AX6UIMask);

        var _this = _possibleConstructorReturn(this, (AX6UIMask.__proto__ || Object.getPrototypeOf(AX6UIMask)).call(this));

        _this.config = {
            theme: '',
            target: (0, _jqmin2.default)(document.body).get(0),
            animateTime: 250
        };
        _jqmin2.default.extend(true, _this.config, config);

        // 멤버 변수 초기화
        _this.maskContent = '';
        _this.status = "off";
        _this.activeConfig = {};

        _this.init();
        return _this;
    }

    /**
     * @method AX6UIMask.setConfig
     * @param config
     * @param [config.theme]
     * @param [config.target]
     * @param [config.anmateTime]
     * @param [config.onStateChanged]
     * @param [config.onClick]
     * @param [config.content]
     */

    _createClass(AX6UIMask, [{
        key: 'init',
        value: function init() {
            this.onStateChanged = this.config.onStateChanged;
            delete this.config.onStateChanged;
            this.onClick = this.config.onClick;
            delete this.config.onClick;

            if (this.config.content) setBody.call(this, this.config.content);

            // init 호출 여부
            this.initOnce();
        }
    }, {
        key: 'initOnce',
        value: function initOnce() {
            if (this.initialized) return this;
            this.initialized = true;
        }

        /**
         * @method AX6UIMask.open
         * @param options
         * @return {AX6UIMask}
         */

    }, {
        key: 'open',
        value: function open(options) {
            var self = this;

            if (this.status === "on") this.close();
            if (options && options.content) setBody.call(this, options.content);

            var _cfg = _lodash2.default.merge({}, this.config, options),
                target = _cfg.target,
                $target = (0, _jqmin2.default)(target),
                maskId = 'ax-mask-' + this.instanceId,
                $mask = void 0,
                css = {},
                that = {},
                templateName = _cfg.templateName,
                body = getBodyTmpl({
                theme: _cfg.theme,
                maskId: maskId,
                body: this.maskContent,
                templateName: templateName
            }).trim();

            (0, _jqmin2.default)(document.body).append(body);

            // 마스크의 타겟이 html body 가 아니라면
            if (target && target !== (0, _jqmin2.default)(document.body).get(0)) {
                css = {
                    position: _cfg.position || "absolute",
                    left: $target.offset().left,
                    top: $target.offset().top,
                    width: $target.outerWidth(),
                    height: $target.outerHeight()
                };

                $target.addClass("ax-masking");

                // 마스크의 타겟이 html body가 아닌경우 window resize 이벤트를 추적하여 엘리먼트 마스크의 CSS 속성 변경

                (0, _jqmin2.default)(window).on("resize.ax5mask-" + this.instanceId, function () {
                    this.align();
                }.bind(this));
            }

            if (typeof _cfg.zIndex !== "undefined") {
                css["z-index"] = _cfg.zIndex;
            }

            this.$mask = $mask = (0, _jqmin2.default)("#" + maskId);
            this.$target = $target;
            this.status = "on";
            $mask.css(css);

            if (this.onClick) {
                $mask.on("click", function (e) {
                    that = {
                        self: self,
                        state: "open",
                        type: "click"
                    };
                    self.onClick.call(that, that);
                });
            }

            onStateChanged.call(this, null, {
                self: this,
                state: "open"
            });

            // 현재 활성화된 설정 기억
            this.activeConfig = _cfg;

            options = null;
            _cfg = null;
            target = null;
            $target = null;
            maskId = null;
            $mask = null;
            css = null;
            that = null;
            templateName = null;
            body = null;

            return this;
        }

        /**
         * @method AX6UIMask.close
         * @param delay
         * @return {AX6UIMask}
         */

    }, {
        key: 'close',
        value: function close(delay) {
            if (this.$mask) {

                var _close = function _close() {
                    this.status = "off";
                    this.$mask.remove();
                    this.$target.removeClass("ax-masking");

                    onStateChanged.call(this, null, {
                        self: this,
                        state: "close"
                    });

                    (0, _jqmin2.default)(window).off("resize.ax5mask-" + this.instanceId);
                };

                if (delay) {
                    setTimeout(function () {
                        _close.call(this);
                    }.bind(this), delay);
                } else {
                    _close.call(this);
                }
            }
            return this;
        }

        /**
         * @method AX6UIMask.fadeOut
         * @return {AX6UIMask}
         */

    }, {
        key: 'fadeOut',
        value: function fadeOut() {
            if (this.$mask) {
                var _close = function _close() {
                    this.status = "off";
                    this.$mask.remove();
                    this.$target.removeClass("ax-masking");

                    onStateChanged.call(this, null, {
                        self: this,
                        state: "close"
                    });

                    (0, _jqmin2.default)(window).off("resize.ax5mask-" + this.instanceId);
                };

                this.$mask.addClass("fade-out");
                setTimeout(function () {
                    _close.call(this);
                }.bind(this), this.activeConfig.animateTime);
            }
            return this;
        }

        /**
         * @method AX6UIMask.align
         * @return {AX6UIMask}
         */

    }, {
        key: 'align',
        value: function align() {
            if (this.$mask && this.activeConfig && this.activeConfig.target && this.activeConfig.target !== (0, _jqmin2.default)(document.body).get(0)) {
                try {
                    var css = {
                        position: this.activeConfig.position || "absolute",
                        left: this.$target.offset().left,
                        top: this.$target.offset().top,
                        width: this.$target.outerWidth(),
                        height: this.$target.outerHeight()
                    };
                    this.$mask.css(css);
                } catch (e) {}
            }
            return this;
        }
    }]);

    return AX6UIMask;
}(_AX6UICore3.default);

exports.default = AX6UIMask;