"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jqmin = require("jqmin");

var _jqmin2 = _interopRequireDefault(_jqmin);

var _AX6Util = require("./AX6Util.js");

var _AX6Util2 = _interopRequireDefault(_AX6Util);

var _AX6UICore2 = require("./AX6UICore.js");

var _AX6UICore3 = _interopRequireDefault(_AX6UICore2);

var _AX6Mustache = require("./AX6Mustache");

var _AX6Mustache2 = _interopRequireDefault(_AX6Mustache);

require("./AX6UIToast/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var tmpl = {
    display: function display(columnKeys) {
        return "\n<div id=\"{{toastId}}\" data-ax6ui-toast=\"\" class=\"{{theme}}\">\n    {{#icon}}\n    <div class=\"ax-toast-icon\">{{{.}}}</div>\n    {{/icon}}\n    <div class=\"ax-toast-body\">{{{msg}}}</div>\n    {{#btns}}\n    <div class=\"ax-toast-buttons\">\n        <div class=\"ax-button-wrap\">\n            {{#@each}}\n            <button type=\"button\" data-ax-toast-btn=\"{{@key}}\" class=\"btn btn-{{@value.theme}}\">{{{@value.label}}}</button>\n            {{/@each}}\n        </div>\n    </div>\n    {{/btns}}\n    {{^btns}}\n        <a class=\"ax-toast-close\" data-ax-toast-btn=\"ok\">{{{closeIcon}}}</a>\n    {{/btns}}\n    <div style=\"clear:both;\"></div>\n</div>";
    }
};

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
var getContent = function getContent(toastId, opts) {
    var data = {
        toastId: toastId,
        theme: opts.theme,
        icon: opts.icon,
        msg: (opts.msg || "").replace(/\n/g, "<br/>"),
        btns: opts.btns,
        closeIcon: opts.closeIcon
    };

    try {
        return _AX6Mustache2.default.render(tmpl.display.call(this), data);
    } finally {
        toastId = null;
        data = null;
    }
};
var open = function open(opts, callback) {
    var _this = this;

    if (this.toastSeqClear) clearTimeout(this.toastSeqClear);

    var $toastBox = void 0,
        box = {
        width: opts.width
    };

    opts.id = 'ax6ui-toast-' + this.instanceId + '-' + ++this.toastSeq;

    if ((0, _jqmin2.default)('#' + opts.id).get(0)) return this;

    $toastBox = (0, _jqmin2.default)(getContent(opts.id, opts));
    $toastBox.css({ width: this.$toastContainer.width() });

    if (_AX6Util2.default.left(this.config.containerPosition, '-') == 'bottom') {
        this.$toastContainer.append($toastBox);
    } else {
        this.$toastContainer.prepend($toastBox);
    }

    opts.$toastBox = $toastBox;
    this.queue.push(opts);

    onStateChanged.call(this, opts, {
        self: this,
        state: "open",
        toastId: opts.id
    });

    if (opts.toastType === "push") {
        // 자동 제거 타이머 시작
        setTimeout(function () {
            _this.close(opts, callback);
        }, this.config.displayTime);

        $toastBox.on(this.config.clickEventName, '[data-ax-toast-btn]', function (e) {
            btnOnClick.call(_this, e || window.event, opts, $toastBox, callback);
        });
    } else if (opts.toastType === "confirm") {
        $toastBox.on(this.config.clickEventName, '[data-ax-toast-btn]', function (e) {
            btnOnClick.call(_this, e || window.event, opts, $toastBox, callback);
        });
    }

    box = null;
};
var btnOnClick = function btnOnClick(e, opts, $toastBox, callback, target, k) {
    target = _AX6Util2.default.findParentNode(e.target, function (target) {
        if (target.getAttribute("data-ax-toast-btn")) {
            return true;
        }
    });

    if (target) {
        k = target.getAttribute("data-ax-toast-btn");

        var that = {
            key: k, value: opts.btns ? opts.btns[k] : k,
            toastId: opts.id,
            btn_target: target
        };

        if (opts.btns && opts.btns[k].onClick) {
            opts.btns[k].onClick.call(that, that);
        } else if (opts.toastType === "push") {
            if (callback) callback.call(that, that);
            this.close(opts, callback);
        } else if (opts.toastType === "confirm") {
            if (callback) callback.call(that, that);
            this.close(opts);
        }
    }

    e = null;
    opts = null;
    $toastBox = null;
    callback = null;
    target = null;
    k = null;
};

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
         * @param [config.theme='default']
         * @param [config.width=300]
         * @param [config.icon='']
         * @param [config.closeIcon='']
         * @param [config.msg='']
         * @param [config.lang]
         * @param [config.lang.ok='ok']
         * @param [config.lang.cancel='cancel']
         * @param [config.displayTime=3000]
         * @param [config.animateTime=250]
         * @param [config.containerPosition='bottom-left']
         */
        var _this2 = _possibleConstructorReturn(this, (AX6UIToast.__proto__ || Object.getPrototypeOf(AX6UIToast)).call(this));

        _this2.config = {
            clickEventName: "click",
            theme: 'default',
            width: 300,
            icon: '',
            closeIcon: '',
            msg: '',
            lang: {
                "ok": "ok", "cancel": "cancel"
            },
            displayTime: 3000,
            animateTime: 250,
            containerPosition: "bottom-left",
            zIndex: 9999
        };
        _jqmin2.default.extend(true, _this2.config, config);

        // 멤버 변수 초기화
        _this2.$toastContainer = (0, _jqmin2.default)('<div data-ax6ui-toast-container="' + _this2.instanceId + '" data-toast-container-position=""></div>');
        _this2.queue = [];
        _this2.toastSeq = 0;
        _this2.toastSeqClear = null;

        (0, _jqmin2.default)(document.body).append(_this2.$toastContainer);

        _this2.init();
        return _this2;
    }

    /**
     * @method
     */


    _createClass(AX6UIToast, [{
        key: "init",
        value: function init() {
            this.onStateChanged = this.config.onStateChanged;
            delete this.config.onStateChanged;

            this.$toastContainer.css({ "z-index": this.config.zIndex, width: this.config.width, "max-width": "100%" }).attr("data-toast-container-position", this.config.containerPosition);

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

        /**
         * @method
         * @param opts
         * @param callback
         * @return {AX6UIToast}
         * @example
         * ```js
         * import {AX6UIToast as Toast} from "ax6ui";
         *
         * let toast = new Toast({
         *  containerPosition: "bottom-right"
         * });
         *
         * toast.push("toast messages");
         * ```
         */

    }, {
        key: "push",
        value: function push(opts, callback) {
            if (_AX6Util2.default.isString(opts)) {
                opts = {
                    title: this.config.title,
                    msg: opts
                };
            }

            opts.toastType = "push";
            opts = _jqmin2.default.extend(true, {}, this.config, opts);
            open.call(this, opts, callback);

            opts = null;
            callback = null;
            return this;
        }

        /**
         * @method
         * @param opts
         * @param callback
         * @returns {AX6UIToast}
         * @example
         * ```js
         * import {AX6UIToast as Toast} from "ax6ui";
         *
         * let toast = new Toast({
         *  containerPosition: "bottom-right"
         * });
         *
         * toast.confirm({
         *  title: "예/아니오",
         *  msg: "당신은 개발자 입니까?",
         *  btns: {
         *      Y: {label: "예"},
         *      N: {label: "아니오"}
         *  }
         * }, function(res){
         *  console.log(res);
         * });
         * ```
         */

    }, {
        key: "confirm",
        value: function confirm(opts, callback) {
            if (_AX6Util2.default.isString(opts)) {
                opts = {
                    title: this.config.title,
                    msg: opts
                };
            }

            opts.toastType = "confirm";
            opts = _jqmin2.default.extend(true, {}, this.config, opts);
            if (typeof opts.btns === "undefined") {
                opts.btns = {
                    ok: { label: opts.lang["ok"], theme: opts.theme }
                };
            }
            open.call(this, opts, callback);

            opts = null;
            callback = null;
            return this;
        }

        /**
         * close the toast
         * @method
         * @returns {AX6UIToast}
         * @example
         * ```
         * toast.close();
         * ```
         */

    }, {
        key: "close",
        value: function close(opts, callback) {
            var $toastBox = opts.$toastBox;
            $toastBox.addClass(opts.toastType == "push" ? "removed" : "destroy");
            this.queue = _AX6Util2.default.filter(this.queue, function () {
                return opts.id != this.id;
            });

            setTimeout(function () {
                var that = {
                    toastId: opts.id
                };

                $toastBox.remove();
                if (callback) callback.call(that, that);

                that = {
                    self: this,
                    state: "close",
                    toastId: opts.id
                };
                onStateChanged.call(this, opts, that);

                // 3초후에도 아무 일이 없다면 완전히 제거
                if (this.queue.length === 0) {
                    if (this.toastSeqClear) clearTimeout(this.toastSeqClear);
                    this.toastSeqClear = setTimeout(function () {
                        /// console.log("try clear seq");
                        if (this.queue.length === 0) this.toastSeq = 0;
                    }.bind(this), 3000);
                }

                that = null;
                opts = null;
                callback = null;
                $toastBox = null;
            }.bind(this), opts.animateTime);

            return this;
        }
    }]);

    return AX6UIToast;
}(_AX6UICore3.default);

exports.default = AX6UIToast;