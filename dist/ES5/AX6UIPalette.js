"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jqmin = require("jqmin");

var _jqmin2 = _interopRequireDefault(_jqmin);

var _AX6UICore2 = require("./AX6UICore");

var _AX6UICore3 = _interopRequireDefault(_AX6UICore2);

var _AX6Info = require("./AX6Info");

var _AX6Info2 = _interopRequireDefault(_AX6Info);

var _AX6Util = require("./AX6Util");

var _AX6Util2 = _interopRequireDefault(_AX6Util);

var _AX6Mustache = require("./AX6Mustache");

var _AX6Mustache2 = _interopRequireDefault(_AX6Mustache);

require("./AX6UIPalette/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var frameTmpl = function frameTmpl(columnKeys) {
    return "\n<div data-ax6palette>\n<div data-ax6palette-container=\"root\">\n    <div data-ax6palette-container=\"colors\"></div>\n    <div data-ax6palette-container=\"controls\"></div>\n</div>\n</div>\n";
};
var colorsTmpl = function colorsTmpl(columnKeys) {
    return "\n{{#colors}}\n{{#list}}\n<div data-ax6palette-color=\"{{label}}\" data-ax6palette-color-index=\"{{@i}}\">\n    <div data-panel=\"color-preview\" style=\"padding:{{preview.cellPadding}}px;width:{{preview.cellWidth}}px;\">\n        <div data-panel=\"color-box\" style=\"width:{{preview.width}}px;height:{{preview.height}}px;\"><div data-panel=\"color\" style=\"background-color:{{value}};\"></div></div>\n    </div>\n    <div data-panel=\"color-label\" style=\"width:{{label.width}}px;\">{{label}}</div>\n    <div data-panel=\"color-slider\">\n        <div data-panel=\"color-track\" style=\"height:{{slider.trackHeight}}px;background: linear-gradient(90deg, {{_color0value}}, {{_color1value}}, {{_color2value}}); \">\n            <div data-panel=\"color-handle\">\n                <div data-panel=\"color-handle-after\" style=\"width:{{slider.handleWidth}}px;height:{{slider.handleWidth}}px;left:{{slider.handleLeft}}px;top:{{slider.handleLeft}}px;\"></div>\n            </div>\n        </div>\n    </div>\n</div>\n{{/list}}\n{{/colors}}\n";
};
var ENM = {
    "mousedown": _AX6Info2.default.supportTouch ? "touchstart" : "mousedown",
    "mousemove": _AX6Info2.default.supportTouch ? "touchmove" : "mousemove",
    "mouseup": _AX6Info2.default.supportTouch ? "touchend" : "mouseup"
};
var onStateChanged = function onStateChanged(opts, that) {
    if (opts && opts.onStateChanged) {
        opts.onStateChanged.call(that, that);
    } else if (this.onStateChanged) {
        this.onStateChanged.call(that, that);
    }

    that = null;
};
var getMousePosition = function getMousePosition(e) {
    var mouseObj = void 0,
        originalEvent = e.originalEvent ? e.originalEvent : e;
    mouseObj = 'changedTouches' in originalEvent && originalEvent.changedTouches ? originalEvent.changedTouches[0] : originalEvent;
    // clientX, Y 쓰면 스크롤에서 문제 발생
    return {
        clientX: mouseObj.pageX,
        clientY: mouseObj.pageY
    };
};
var bindHandle = function bindHandle(item) {
    var _this = this;

    item.originalTrackWidth = item.$track.width();
    item.trackWidth = item.originalTrackWidth - this.config.colors.slider.handleWidth / 5;
    var handleLeft = amountToHandleLeft.call(this, item, item._amount);

    // handleLeft 가 범위를 벗어나면?
    if (handleLeft < 0 || handleLeft > item.trackWidth) {
        var amount = void 0;
        handleLeft = handleLeft < 0 ? 0 : handleLeft > item.trackWidth ? item.trackWidth : handleLeft;
        amount = handleLeftToAmount.call(this, item, handleLeft);
        updatePreviewColor.call(this, item, amountToColor.call(this, item, amount));
    }

    item.$handle.css({ left: handleLeft });
    item.$item.off(ENM["mousedown"]).on(ENM["mousedown"], '[data-panel="color-handle"]', function (e) {
        var mouseObj = getMousePosition(e);
        item._originalHandleClientX = mouseObj.clientX;
        item._originalHandleLeft = item.$handle.position().left;
        handleMoveEvent.on.call(_this, item);
        _AX6Util2.default.stopEvent(e.originalEvent);
    }).off("click").on("click", '[data-panel="color-label"], [data-panel="color-preview"]', function (e) {
        if (_this.onClick) {
            _this.onClick.call(item, '#' + item._selectedColor.toUpperCase(), e);
        }
    }).on("click", '[data-panel="color-track"]', function (e) {
        if (e.target.getAttribute("data-panel") == "color-track") {
            var mouseObj = getMousePosition(e),
                newHandleLeft = mouseObj.clientX - item.$track.offset().left,
                _amount2 = handleLeftToAmount(item, newHandleLeft);

            item.$handle.css({ left: newHandleLeft });
            updatePreviewColor.call(_this, item, amountToColor.call(_this, item, _amount2), e);

            mouseObj = null;
            newHandleLeft = null;
            _amount2 = null;
        }
    });
};
var updatePreviewColor = function updatePreviewColor(item, color, event) {
    item.$preview.css({ "background-color": '#' + color });
    item.$label.html('#' + color.toUpperCase());
    item._selectedColor = color;

    if (event && this.onUpdateColor) {
        this.onUpdateColor.call(item, '#' + item._selectedColor.toUpperCase());
    }
};
var amountToColor = function amountToColor(item, amount) {
    var processor = {
        "black": function black(_color, _amount) {
            return _color.lighten(this.config.colors.slider.amount / 2).darken(_amount).getHexValue();
        },
        "white": function white(_color, _amount) {
            return _color.darken(this.config.colors.slider.amount / 2).darken(_amount).getHexValue();
        },
        "normal": function normal(_color, _amount) {
            return _color.darken(_amount).getHexValue();
        }
    };

    if (item._uniqColor in processor) {
        return processor[item._uniqColor].call(this, item._color, amount);
    } else {
        return processor["normal"].call(this, item._color, amount);
    }
};
var colorToAmount = function colorToAmount(item, color) {
    /// todo : 색상에 가까운 색 표현.
    var processor = {
        "black": function black(_color, _diffColor) {
            var color1 = _color.lighten(this.config.colors.slider.amount / 2);
            return (color1.getHsl().l - _diffColor.getHsl().l) * 100;
        },
        "white": function white(_color, _diffColor) {
            var color1 = _color.darken(this.config.colors.slider.amount / 2);
            return (color1.getHsl().l - _diffColor.getHsl().l) * 100;
        },
        "normal": function normal(_color, _diffColor) {
            return (_color.getHsl().l - _diffColor.getHsl().l) * 100;
        }
    };

    if (item._uniqColor in processor) {
        return processor[item._uniqColor].call(this, item._color, color);
    } else {
        return processor["normal"].call(this, item._color, color);
    }
};
var handleLeftToAmount = function handleLeftToAmount(item, handleLeft) {
    return this.config.colors.slider.amount * (handleLeft - item.trackWidth / 2) / (item.originalTrackWidth / 2);
};
var amountToHandleLeft = function amountToHandleLeft(item, amount) {
    return amount * (item.originalTrackWidth / 2) / this.config.colors.slider.amount + item.trackWidth / 2;
};
var handleMoveEvent = {
    "on": function on(item) {
        var _this2 = this;

        (0, _jqmin2.default)(document.body).on(ENM["mousemove"] + ".ax6palette-" + this.instanceId, function (e) {
            var mouseObj = getMousePosition(e),
                da = mouseObj.clientX - item._originalHandleClientX,
                newHandleLeft = item._originalHandleLeft + da,
                amount = void 0;

            newHandleLeft = newHandleLeft < 0 ? 0 : newHandleLeft > item.trackWidth ? item.trackWidth : newHandleLeft;
            item.$handle.css({ left: newHandleLeft });
            amount = handleLeftToAmount.call(_this2, item, newHandleLeft);

            updatePreviewColor.call(_this2, item, amountToColor.call(_this2, item, amount), e);

            mouseObj = null;
            da = null;
        }).on(ENM["mouseup"] + ".ax6palette-" + this.instanceId, function (e) {
            handleMoveEvent.off.call(_this2);
            _AX6Util2.default.stopEvent(e);
        }).on("mouseleave.ax6palette-" + this.instanceId, function (e) {
            handleMoveEvent.off.call(_this2);
            _AX6Util2.default.stopEvent(e);
        });

        (0, _jqmin2.default)(document.body).attr('unselectable', 'on').css('user-select', 'none').on('selectstart', false);
    },
    "off": function off() {
        this.xvar.resizerLived = false;

        (0, _jqmin2.default)(document.body).off(ENM["mousemove"] + ".ax6palette-" + this.instanceId).off(ENM["mouseup"] + ".ax6palette-" + this.instanceId).off("mouseleave.ax6palette-" + this.instanceId);

        (0, _jqmin2.default)(document.body).removeAttr('unselectable').css('user-select', 'auto').off('selectstart');
    }
};
var _repaint = function _repaint(selectedColor) {
    var _this3 = this;

    var box = {
        width: this.$target.innerWidth(),
        height: this.$target.innerHeight()
    };

    // 패널 프레임 초기화
    this.$target.html(_AX6Mustache2.default.render(frameTmpl.call(this), {}, this.config.columnKeys));

    // 각 패널들을 캐싱~
    this.$ = {
        "root": this.$target.find('[data-ax6palette-container="root"]'),
        "colors": this.$target.find('[data-ax6palette-container="colors"]'),
        "controls": this.$target.find('[data-ax6palette-container="controls"]')
    };

    // todo : controls 나중에 고민하여 구현
    // this.$["controls"].css({height: this.config.controls.height});

    /// colors.list 색상 범위 결정 / 초기화
    this.config.colors.list.forEach(function (c) {
        c._color = _AX6Util2.default.color(c.value);
        c._selectedColor = c._color.getHexValue();
        if (c._color.r == 0 && c._color.g == 0 && c._color.b == 0) {
            c._amount = _this3.config.colors.slider.amount;
            c._uniqColor = "black";
            c._color0value = "#" + c._color.lighten(_this3.config.colors.slider.amount).getHexValue();
            c._color1value = "#" + c._color.lighten(_this3.config.colors.slider.amount / 2).getHexValue();
            c._color2value = "#" + c._color.getHexValue();
        } else if (c._color.r == 255 && c._color.g == 255 && c._color.b == 255) {
            c._amount = -_this3.config.colors.slider.amount;
            c._uniqColor = "white";
            c._color0value = "#" + c._color.getHexValue();
            c._color1value = "#" + c._color.darken(_this3.config.colors.slider.amount / 2).getHexValue();
            c._color2value = "#" + c._color.darken(_this3.config.colors.slider.amount).getHexValue();
        } else {
            c._amount = 0;
            c._color0value = "#" + c._color.lighten(_this3.config.colors.slider.amount).getHexValue();
            c._color1value = "#" + c._color.getHexValue();
            c._color2value = "#" + c._color.darken(_this3.config.colors.slider.amount).getHexValue();
        }
    });

    // 색생조절 핸들의 위치 조정this.config.colors.list[minDiffColorIndex]
    this.config.colors.slider.handleLeft = -this.config.colors.slider.handleWidth / 2;
    this.config.colors.slider.handleTop = -this.config.colors.slider.handleHeight / 2;

    // 팔렛트 컬러 패널 초기화
    this.$["colors"].html(_AX6Mustache2.default.render(colorsTmpl.call(this), this.config, this.config.columnKeys));

    this.$["colors"].find('[data-ax6palette-color-index]').each(function (elIdx, el) {
        var idx = el.getAttribute("data-ax6palette-color-index");
        var color = _this3.config.colors.list[idx];
        var item = _jqmin2.default.extend({}, color);
        item._index = idx;
        item.$item = (0, _jqmin2.default)(el);
        item.$preview = item.$item.find('[data-panel="color"]');
        item.$label = item.$item.find('[data-panel="color-label"]');
        item.$track = item.$item.find('[data-panel="color-track"]');
        item.$handle = item.$item.find('[data-panel="color-handle"]');
        bindHandle.call(_this3, item);
        /////
        _this3.colors.push(item);
    });

    if (selectedColor) {
        this.setSelectedColor(selectedColor);
    }
};

/**
 * @class
 */

var AX6UIPalette = function (_AX6UICore) {
    _inherits(AX6UIPalette, _AX6UICore);

    /**
     * @constructor
     * @param config
     * @param [config.theme]
     * @param config.target
     * @param [config.animateTime]
     * @param {String} [config.selectedColor]
     * @param {Object} [config.colors]
     * @param {Object} [config.colors.preview]
     * @param {Number} [config.colors.preview.width=24]
     * @param {Number} [config.colors.preview.height=24]
     * @param {Number} [config.colors.preview.cellWidth=30]
     * @param {Object} [config.colors.label]
     * @param {Number} [config.colors.label.width=80]
     * @param {Object} [config.colors.slider]
     * @param {Number} [config.colors.slider.trackHeight=8]
     * @param {Number} [config.colors.slider.amount=32]
     * @param {Number} [config.colors.slider.handleWidth=18]
     * @param {Number} [config.colors.slider.handleHeight=18]
     * @param {Object[]} [config.colors.list=[red,orange,yellow,green,blue,purple,black,white]]
     * @param {String} config.colors.list[].label
     * @param {String} config.colors.list[].value
     * @param {Object} [config.controls]
     * @param {Number} [config.controls.height=0]
     * @param [config.onStateChanged]
     * @param [config.onClick]
     * @param [config.onUpdateColor]
     * @example
     * ```js
     * myPalette = new Palette({
     *  target: $('[data-ax5palette="01"]'),
     *  onClick: function (hexColor) {
     *      alert(hexColor);
     *  }
     * });
     *
     * myPalette = new Palette({
     *  target: $('[data-ax5palette="01"]'),
     *  colors: {
     *      list: [
     *          {label: "red", value: "#ff0000"},
     *          {label: "orange", value: "#ff9802"},
     *          {label: "yellow", value: "#ffff00"},
     *          {label: "skyblue", value: "#84e4ff"},
     *          {label: "white", value: "#ffffff"}
     *      ]
     *  }
     *  onClick: function (hexColor) {
     *
     *  }
     * });
     * ```
     */
    function AX6UIPalette(config) {
        _classCallCheck(this, AX6UIPalette);

        var _this4 = _possibleConstructorReturn(this, (AX6UIPalette.__proto__ || Object.getPrototypeOf(AX6UIPalette)).call(this));

        _this4.config = {
            clickEventName: "click",
            theme: 'default',
            animateTime: 100,
            colors: {
                preview: {
                    width: 24,
                    height: 24,
                    cellWidth: 30
                },
                label: {
                    width: 80
                },
                slider: {
                    trackHeight: 8,
                    amount: 32,
                    handleWidth: 18,
                    handleHeight: 18
                },
                list: [{ label: "red", value: "#ff0000" }, { label: "orange", value: "#ff9802" }, { label: "yellow", value: "#ffff00" }, { label: "green", value: "#00ff36" }, { label: "blue", value: "#0000ff" }, { label: "purple", value: "#ba00ff" },
                //{label: "skyblue", value: "#84e4ff"},
                //{label: "pink", value: "#ff77c4"},
                { label: "black", value: "#000000" }, { label: "white", value: "#ffffff" }]
            },
            controls: {
                height: 0
            },
            columnKeys: {}
        };
        _jqmin2.default.extend(true, _this4.config, config);

        // 멤버 변수 초기화
        _this4.$target = null;
        _this4.xvar = {};
        _this4.colors = [];

        _this4.init();
        return _this4;
    }

    /**
     * @method
     * @param config
     * @param [config.theme]
     * @param config.target
     * @param [config.animateTime]
     * @param {String} [config.selectedColor]
     * @param {Object} [config.colors]
     * @param {Object} [config.colors.preview]
     * @param {Number} [config.colors.preview.width=24]
     * @param {Number} [config.colors.preview.height=24]
     * @param {Number} [config.colors.preview.cellWidth=30]
     * @param {Object} [config.colors.label]
     * @param {Number} [config.colors.label.width=80]
     * @param {Object} [config.colors.slider]
     * @param {Number} [config.colors.slider.trackHeight=8]
     * @param {Number} [config.colors.slider.amount=32]
     * @param {Number} [config.colors.slider.handleWidth=18]
     * @param {Number} [config.colors.slider.handleHeight=18]
     * @param {Object[]} [config.colors.list=[red,orange,yellow,green,blue,purple,black,white]]
     * @param {String} config.colors.list[].label
     * @param {String} config.colors.list[].value
     * @param {Object} [config.controls]
     * @param {Number} [config.controls.height=0]
     * @param [config.onStateChanged]
     * @param [config.onClick]
     * @param [config.onUpdateColor]
     */


    _createClass(AX6UIPalette, [{
        key: "init",
        value: function init() {
            var _this5 = this;

            this.onStateChanged = this.config.onStateChanged;
            delete this.config.onStateChanged;
            this.onClick = this.config.onClick;
            delete this.config.onClick;
            this.onUpdateColor = this.config.onUpdateColor;
            delete this.config.onUpdateColor;

            if (!this.config.target) {
                console.log(_AX6Info2.default.getError("ax6palette", "401", "setConfig"));
            }
            this.$target = (0, _jqmin2.default)(this.config.target);

            setTimeout(function () {
                _repaint.call(_this5, (_this5.config.selectedColor || "").trim()); // 팔렛트 그리기.
            });

            // init 호출 여부
            this.initOnce();
        }

        /**
         * @method
         * @return {AX6UIMask}
         */

    }, {
        key: "initOnce",
        value: function initOnce() {
            if (this.initialized) return this;
            this.initialized = true;
        }

        /**
         * @method
         * @return {AX6UIPalette}
         */

    }, {
        key: "repaint",
        value: function repaint() {
            _repaint.call(this);
            return this;
        }

        /**
         * @method
         * @param selectedColor
         * @return {AX6UIPalette}
         */

    }, {
        key: "setSelectedColor",
        value: function setSelectedColor(selectedColor) {
            var sColor = _AX6Util2.default.color(selectedColor.trim());
            // 지정된 색이 가장 가까운 파렛 검색
            var minDiffColor = 255 * 3,
                minDiffColorIndex = -1;

            this.colors.forEach(function (c, cidx) {
                var c1hsl = c._color.getHsl(),
                    c2hsl = sColor.getHsl();
                var diffColor = Math.abs(c1hsl.h - c2hsl.h) + Math.abs(c1hsl.s - c2hsl.s) + Math.abs(c1hsl.l - c2hsl.l);
                if (diffColor < minDiffColor) {
                    minDiffColor = diffColor;
                    minDiffColorIndex = cidx;
                }
            });

            if (minDiffColorIndex > -1) {
                var amount = void 0,
                    handleLeft = void 0,
                    item = this.colors[minDiffColorIndex];

                item._amount = colorToAmount.call(this, item, sColor);
                handleLeft = amountToHandleLeft.call(this, item, item._amount);
                //handleLeft = handleLeft < 0 ? 0 : handleLeft > item.trackWidth ? item.trackWidth : handleLeft;
                item.$handle.css({ left: handleLeft });

                amount = handleLeftToAmount.call(this, item, handleLeft);
                updatePreviewColor.call(this, item, amountToColor.call(this, item, amount));
            }

            return this;
        }
    }]);

    return AX6UIPalette;
}(_AX6UICore3.default);

exports.default = AX6UIPalette;