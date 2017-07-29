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

var _AX6UIFormatter = require("./AX6UIFormatter");

var _AX6UIFormatter2 = _interopRequireDefault(_AX6UIFormatter);

var _AX6UICalendar = require("./AX6UICalendar");

var _AX6UICalendar2 = _interopRequireDefault(_AX6UICalendar);

var _AX6UIPalette = require("./AX6UIPalette");

var _AX6UIPalette2 = _interopRequireDefault(_AX6UIPalette);

require("./AX6UIPicker/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var tmpl = {
    pickerTmpl: function pickerTmpl(columnKeys) {
        return "\n<div data-ax6ui-picker=\"\" class=\"{{theme}}\" id=\"{{id}}\" data-picker-els=\"root\" {{#zIndex}}style=\"z-index:{{zIndex}};\"{{/zIndex}}>\n    {{#title}}\n        <div class=\"ax-picker-heading\">{{title}}</div>\n    {{/title}}\n    <div class=\"ax-picker-body\">\n        <div class=\"ax-picker-content\" data-picker-els=\"content\" style=\"width:{{contentWidth}}px;\"></div>\n        {{#btns}}\n            <div class=\"ax-picker-buttons\">\n            {{#btns}}\n                {{#@each}}\n                <button data-picker-btn=\"{{@key}}\" class=\"{{@value.theme}}\">{{@value.label}}</button>\n                {{/@each}}\n            {{/btns}}\n            </div>\n        {{/btns}}\n    </div>\n    <div class=\"ax-picker-arrow\"></div>\n</div>\n";
    }
};
var onStateChanged = function onStateChanged(item, that) {
    if (item && item.onStateChanged) {
        item.onStateChanged.call(that, that);
    } else if (this.onStateChanged) {
        this.onStateChanged.call(that, that);
    }
    return true;
};
var bindPickerTarget = function () {
    var pickerEvent = {
        'focus': function focus(queIdx, e) {
            this.open(queIdx);
        },
        'click': function click(queIdx, e) {
            this.open(queIdx);
        }
    };
    var pickerType = {
        '@fn': function fn(queIdx, _input) {
            var item = this.queue[queIdx],
                inputLength = _input.length,
                config = {
                inputLength: inputLength || 1
            };

            if (inputLength > 1) {
                config.btns = {
                    ok: { label: this.config.lang["ok"], theme: this.config.theme }
                };
            }

            this.queue[queIdx] = _jqmin2.default.extend(true, config, item);

            config = null;
            inputLength = null;
        },
        'date': function date(queIdx, _input) {
            var item = this.queue[queIdx],
                contentWidth = item.content ? item.content.width || 270 : 270,
                contentMargin = item.content ? item.content.margin || 5 : 5,
                inputLength = _input.length,
                config = {
                contentWidth: contentWidth * inputLength + (inputLength - 1) * contentMargin,
                content: { width: contentWidth, margin: contentMargin },
                inputLength: inputLength || 1
            };

            if (inputLength > 1 && !item.btns) {
                config.btns = {
                    ok: { label: this.config.lang["ok"], theme: this.config.theme }
                };
            }

            this.queue[queIdx] = _jqmin2.default.extend(true, config, item);

            contentWidth = null;
            contentMargin = null;
            config = null;
            inputLength = null;
        },
        'secure-num': function secureNum(queIdx, _input) {
            var item = this.queue[queIdx],
                inputLength = _input.length,
                config = {
                inputLength: inputLength || 1
            };

            this.queue[queIdx] = _jqmin2.default.extend(true, config, item);

            config = null;
            inputLength = null;
        },
        'keyboard': function keyboard(queIdx, _input) {
            var item = this.queue[queIdx],
                inputLength = _input.length,
                config = {
                inputLength: inputLength || 1
            };

            this.queue[queIdx] = _jqmin2.default.extend(true, config, item);

            config = null;
            inputLength = null;
        },
        'numpad': function numpad(queIdx, _input) {
            var item = this.queue[queIdx],
                inputLength = _input.length,
                config = {
                inputLength: inputLength || 1
            };

            this.queue[queIdx] = _jqmin2.default.extend(true, config, item);

            config = null;
            inputLength = null;
        },
        'color': function color(queIdx, _input) {
            var item = this.queue[queIdx],
                contentWidth = item.content ? item.content.width || 270 : 270,
                contentMargin = item.content ? item.content.margin || 5 : 5,
                inputLength = _input.length,
                config = {
                contentWidth: contentWidth * inputLength + (inputLength - 1) * contentMargin,
                content: { width: contentWidth, margin: contentMargin },
                inputLength: inputLength || 1
            },
                $colorPreview = item.$target.find('[data-ax6picker-color="preview"]');

            if ($colorPreview.get(0)) {
                $colorPreview.css({ "background-color": "#" + _AX6Util2.default.color(_input.val() || "#000000").getHexValue() });
                // 컬러 피커인 경우 input의 값이 변경되면 preview를 수정
                _input.on("change", function () {
                    $colorPreview.css({ "background-color": "#" + _AX6Util2.default.color(this.value || "#000000").getHexValue() });
                });
            }

            if (inputLength > 1 && !item.btns) {
                config.btns = {
                    ok: { label: this.config.lang["ok"], theme: this.config.theme }
                };
            }

            this.queue[queIdx] = _jqmin2.default.extend(true, config, item);

            contentWidth = null;
            contentMargin = null;
            config = null;
            inputLength = null;
        }
    };

    return function (queIdx) {
        var item = this.queue[queIdx],
            input = void 0;

        if (!item.content) {
            console.log(_AX6Info2.default.getError("ax6picker", "501", "bind"));
            return this;
        }

        input = item.$target.get(0).tagName.toUpperCase() == "INPUT" ? item.$target : item.$target.find('input[type]');

        // 함수타입
        if (_AX6Util2.default.isFunction(item.content)) {
            pickerType["@fn"].call(this, queIdx, input);
        } else {
            for (var key in pickerType) {
                if (item.content.type == key) {
                    pickerType[key].call(this, queIdx, input);
                    break;
                }
            }
        }

        input.off('focus.ax6picker').off('click.ax6picker').on('focus.ax6picker', pickerEvent.focus.bind(this, queIdx)).on('click.ax6picker', pickerEvent.click.bind(this, queIdx));

        item.$target.find('.input-group-addon').off('click.ax6picker').on('click.ax6picker', pickerEvent.click.bind(this, queIdx));

        if (item.content.formatter) {
            this.formatter.bind(_jqmin2.default.extend({}, item.content.formatter, { target: input }));
        }

        input = null;
        item = null;
        queIdx = null;
        return this;
    };
}();
var alignPicker = function alignPicker(append) {
    if (!this.activePicker) return this;

    var _alignPicker = function _alignPicker(item) {
        var $window = (0, _jqmin2.default)(window),
            $body = (0, _jqmin2.default)(document.body);
        var pos = {},
            positionMargin = 12,
            dim = {},
            pickerDim = {},
            pickerDirection = void 0;

        pos = item.$target.offset();
        dim = {
            width: item.$target.outerWidth(),
            height: item.$target.outerHeight()
        };
        pickerDim = {
            winWidth: Math.max($window.width(), $body.width()),
            winHeight: Math.max($window.height(), $body.height()),
            width: this.activePicker.outerWidth(),
            height: this.activePicker.outerHeight()
        };

        // picker css(width, left, top) & direction 결정

        if (!item.direction || item.direction === "" || item.direction === "auto") {
            // set direction
            pickerDirection = "top";
            if (pos.top - pickerDim.height - positionMargin < 0) {
                pickerDirection = "top";
            } else if (pos.top + dim.height + pickerDim.height + positionMargin > pickerDim.winHeight) {
                pickerDirection = "bottom";
            }
        } else {
            pickerDirection = item.direction;
        }

        if (append) {
            this.activePicker.addClass("direction-" + pickerDirection);
        }

        var positionCSS = function () {
            var css = { left: 0, top: 0 };
            switch (pickerDirection) {
                case "top":
                    css.left = pos.left + dim.width / 2 - pickerDim.width / 2;
                    css.top = pos.top + dim.height + positionMargin;
                    break;
                case "bottom":
                    css.left = pos.left + dim.width / 2 - pickerDim.width / 2;
                    css.top = pos.top - pickerDim.height - positionMargin;
                    break;
                case "left":
                    css.left = pos.left + dim.width + positionMargin;
                    css.top = pos.top - pickerDim.height / 2 + dim.height / 2;
                    break;
                case "right":
                    css.left = pos.left - pickerDim.width - positionMargin;
                    css.top = pos.top - pickerDim.height / 2 + dim.height / 2;
                    break;
            }
            return css;
        }();

        {
            if (pickerDirection == "top" || pickerDirection == "bottom") {
                if (positionCSS.left < 0) {
                    positionCSS.left = positionMargin;
                    this.activePickerArrow.css({ left: pos.left + dim.width / 2 - positionCSS.left });
                } else if (positionCSS.left + pickerDim.width > pickerDim.winWidth) {
                    positionCSS.left = pickerDim.winWidth - pickerDim.width - positionMargin;
                    this.activePickerArrow.css({ left: pos.left + dim.width / 2 - positionCSS.left });
                }
            }
        }

        this.activePicker.css(positionCSS);
    };
    var item = this.queue[this.activePickerQueueIndex];

    if (append) {
        this.activePicker.css({ top: -999 });
        (0, _jqmin2.default)(document.body).append(this.activePicker);
    }

    setTimeout(function () {
        _alignPicker.call(this, item);
    }.bind(this));
};
var onBodyClick = function onBodyClick(e, target) {
    if (!this.activePicker) return this;

    var item = this.queue[this.activePickerQueueIndex];

    target = _AX6Util2.default.findParentNode(e.target, function (target) {
        if (target.getAttribute("data-picker-els")) {
            return true;
        } else if (item.$target.get(0) == target) {
            return true;
        }
    });
    if (!target) {
        this.close();
        return this;
    }
    //console.log("i'm picker");
    return this;
};
var onBtnClick = function onBtnClick(e, target) {
    // console.log('btn click');
    if (e.srcElement) e.target = e.srcElement;

    target = _AX6Util2.default.findParentNode(e.target, function (target) {
        if (target.getAttribute("data-picker-btn")) {
            return true;
        }
    });

    if (target) {
        var item = this.queue[this.activePickerQueueIndex],
            k = target.getAttribute("data-picker-btn");

        if (item.btns && item.btns[k].onClick) {
            var that = {
                key: k,
                value: item.btns[k],
                self: this,
                item: item
            };
            item.btns[k].onClick.call(that, k);
        } else {
            this.close();
        }
    }
};
var onBodyKeyup = function onBodyKeyup(e) {
    if (e.keyCode == _AX6Info2.default.eventKeys.ESC) {
        this.close();
    }
};
var getQueIdx = function getQueIdx(boundID) {
    if (!_AX6Util2.default.isString(boundID)) {
        boundID = (0, _jqmin2.default)(boundID).data("data-axpicker-id");
    }
    if (!_AX6Util2.default.isString(boundID)) {
        console.log(_AX6Info2.default.getError("ax6picker", "402", "getQueIdx"));
        return;
    }
    return _AX6Util2.default.search(this.queue, function () {
        return this.id == boundID;
    });
};

/**
 * @class
 */

var AX6UIPicker = function (_AX6UICore) {
    _inherits(AX6UIPicker, _AX6UICore);

    /**
     * @constructor
     * @param config
     * @param [config.theme]
     * @param [config.target]
     * @param [config.animateTime]
     * @param [config.onStateChanged]
     * @param [config.onClick]
     * @param [config.content]
     */
    function AX6UIPicker(config) {
        _classCallCheck(this, AX6UIPicker);

        /**
         * @member {JSON}
         * @param config
         * @param [config.theme=default]
         * @param config.target
         * @param [config.animateTime=100]
         * @param [config.calendar]
         * @param [config.calendar.multipleSelect=false]
         * @param [config.calendar.control]
         * @param [config.calendar.control.left='&#x02190']
         * @param [config.calendar.control.yearTmpl='%s']
         * @param [config.calendar.control.monthTmpl='%s']
         * @param [config.calendar.control.right='&#x02192']
         * @param [config.calendar.control.yearFirst=true]
         * @param [config.palette={}]
         * @param [config.formatter={}]
         * @param [config.onStateChanged]
         * @param [config.onClick]
         */
        var _this = _possibleConstructorReturn(this, (AX6UIPicker.__proto__ || Object.getPrototypeOf(AX6UIPicker)).call(this));

        _this.config = {
            clickEventName: "click", //(('ontouchstart' in document.documentElement) ? "touchend" : "click"),
            theme: 'default',
            title: '',
            lang: {
                "ok": "ok",
                "cancel": "cancel"
            },
            animateTime: 100,
            calendar: {
                multipleSelect: false,
                control: {
                    left: '&#x02190',
                    yearTmpl: '%s',
                    monthTmpl: '%s',
                    right: '&#x02192',
                    yearFirst: true
                }
            },
            palette: {},
            formatter: {}
        };
        _jqmin2.default.extend(true, _this.config, config);

        // 멤버 변수 초기화
        /**
         * @member {Array}
         */
        _this.queue = [];
        /**
         * @member {Object}
         */
        _this.activePicker = null;
        /**
         * @member {Number}
         */
        _this.activePickerQueueIndex = -1;
        /**
         * @member {Object}
         */
        _this.openTimer = null;
        /**
         * @member {Object}
         */
        _this.closeTimer = null;

        _this.init();
        return _this;
    }

    /**
     * @method
     * @param config
     * @param [config.theme]
     * @param [config.target]
     * @param [config.animateTime]
     * @param [config.onStateChanged]
     * @param [config.onClick]
     * @param [config.content]
     */


    _createClass(AX6UIPicker, [{
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

            // formatter 인스턴스
            this.formatter = new _AX6UIFormatter2.default();
        }

        /**
         * @method
         * @param item
         * @param {Element} item.target
         * @param {String} item.direction - top|left|right|bottom|auto
         * @param {Number} item.contentWidth
         * @param {Boolean} item.disableChangeTrigger
         * @param {Function} item.onStateChanged
         * @param {Object} item.btns
         * @param {Object} item.content
         * @param {Number} item.content.width
         * @param {Number} item.content.margin
         * @param {String} item.content.type
         * @param {Object} item.content.config - binded UI config
         * @param {Object} item.content.formatter
         * @param {String} item.content.formatter.pattern
         * @return {AX6UIPicker}
         * @example
         * ```js
         * import $ from "jqmin";
         * import Picker from "../../src/AX6UIPicker";
         *
         * let picker = new Picker();
         * picker.bind({
         *     target: $("#color-0"),
         *     direction: "auto",
         *     content: {
         *         width: 250,
         *         margin: 10,
         *         type: 'color',
         *         config: {
         *
         *         }
         *     },
         *     onStateChanged: function () {
         *
         *     }
         * });
         * ```
         */

    }, {
        key: "bind",
        value: function bind(item) {
            var pickerConfig = {},
                queIdx = void 0;
            item = _jqmin2.default.extend(true, pickerConfig, this.config, item);

            if (!item.target) {
                console.log(_AX6Info2.default.getError("ax6picker", "401", "bind"));
                return this;
            }
            item.$target = (0, _jqmin2.default)(item.target);

            if (!item.$target.get(0)) {
                console.log(_AX6Info2.default.getError("ax6picker", "401", "bind"));
                return this;
            }

            if (!item.id) item.id = item.$target.data("data-axpicker-id");
            if (!item.id) {
                item.id = 'ax6-picker-' + _AX6UICore3.default.getInstanceId();
                item.$target.data("data-axpicker-id", item.id);
            }
            queIdx = _AX6Util2.default.search(this.queue, function () {
                return this.id == item.id;
            });

            if (queIdx === -1) {
                this.queue.push(item);
                bindPickerTarget.call(this, this.queue.length - 1);
            } else {
                this.queue[queIdx] = _jqmin2.default.extend(true, {}, this.queue[queIdx], item);
                bindPickerTarget.call(this, queIdx);
            }

            pickerConfig = null;
            queIdx = null;
            return this;
        }

        /**
         * @method
         * @param boundID
         * @param inputIndex
         * @param val
         * @param _option
         * @return {AX6UIPicker}
         */

    }, {
        key: "setContentValue",
        value: function setContentValue(boundID, inputIndex, val, _option) {
            var multipleInputProcessor = {
                "date": function date(_item, _inputIndex, _val) {
                    var values = [],
                        diffDay,
                        prevInputValue,
                        nextInputValue;

                    if (_item.$target.get(0).tagName.toUpperCase() !== "INPUT") {
                        _item.$target.find('input[type]').each(function () {
                            values.push(this.value);
                        });
                    }

                    if (_inputIndex == 0) {
                        if (values.length > 1 && values[1] !== "") {
                            // 값 검증
                            diffDay = _AX6Util2.default.dday(values[1], { today: values[0] });
                            if (diffDay < 0) {
                                // 다음날짜 달력을 변경합니다.
                                nextInputValue = _val;
                            } else {}
                        } else {
                            nextInputValue = _val;
                        }

                        if (nextInputValue) {
                            _item.pickerCalendar[1].calendar.setSelection([nextInputValue], false).changeMode("d", nextInputValue);
                            this.setContentValue(_item.id, 1, nextInputValue);
                        }

                        return _val;
                    } else if (_inputIndex == 1) {

                        if (values.length > 1) {
                            // 값 검증
                            diffDay = _AX6Util2.default.dday(values[1], { today: values[0] });
                            if (diffDay < 0) {
                                // 다음날짜 달력을 변경합니다.
                                prevInputValue = values[1];
                            }
                        }

                        if (prevInputValue) {
                            _item.pickerCalendar[0].calendar.setSelection([prevInputValue], false).changeMode("d", prevInputValue);
                            this.setContentValue(_item.id, 0, prevInputValue);
                        }

                        return _val;
                    }
                }
            };

            var queIdx = _AX6Util2.default.isNumber(boundID) ? boundID : getQueIdx.call(this, boundID),
                item = this.queue[queIdx],
                _input = void 0;

            if (!_option) _option = {};
            if (item) {

                _input = item.$target.get(0).tagName.toUpperCase() == "INPUT" ? item.$target : (0, _jqmin2.default)(item.$target.find('input[type]').get(inputIndex));
                _input.val(val);

                if (!item.disableChangeTrigger) {
                    _input.trigger("change");
                } else {
                    var $colorPreview = item.$target.find('[data-ax6picker-color="preview"]');
                    if ($colorPreview.get(0)) {
                        $colorPreview.css({ "background-color": val });
                    }
                }

                // picker의 입력이 2개이상인 경우
                //console.log(item.inputLength);
                if (item.inputLength > 1) {
                    // 경우에 따라 첫번 선택에 따라 해야할 일들 처리
                    if (multipleInputProcessor[item.content.type]) {
                        val = multipleInputProcessor[item.content.type].call(this, item, inputIndex, val);
                    }
                }

                var that = {
                    self: this,
                    state: "changeValue",
                    item: item,
                    inputIndex: inputIndex,
                    value: val,
                    values: [val]
                };
                if (item.$target.get(0).tagName.toUpperCase() !== "INPUT") {
                    that.values = [];
                    item.$target.find('input[type]').each(function () {
                        that.values.push(this.value);
                    });
                }

                onStateChanged.call(this, item, that);

                if (item.inputLength == 1 && !_option.doNotClose) {
                    this.close();
                }
            }

            item = null;
            boundID = null;
            inputIndex = null;
            val = null;
            return this;
        }

        /**
         * @method
         * @param boundID
         * @param inputIndex
         * @return {*}
         */

    }, {
        key: "getContentValue",
        value: function getContentValue(boundID, inputIndex) {
            var queIdx = _AX6Util2.default.isNumber(boundID) ? boundID : getQueIdx.call(this, boundID),
                item = this.queue[queIdx],
                _input = void 0;

            if (item) {
                _input = item.$target.get(0).tagName.toUpperCase() == "INPUT" ? item.$target : (0, _jqmin2.default)(item.$target.find('input[type]').get(inputIndex));
                return _input.val();
            }

            item = null;
            boundID = null;
            inputIndex = null;
            return this;
        }

        /**
         * @method
         * @param boundID
         * @param tryCount
         * @return {AX6UIPicker}
         */

    }, {
        key: "open",
        value: function open(boundID, tryCount) {
            var _this3 = this;

            var pickerContent = {
                '@fn': function fn(queIdx, callback) {
                    var item = this.queue[queIdx];
                    item.content.call(item, function (html) {
                        callback(html);
                    });
                    return true;
                },
                'date': function date(queIdx) {
                    var item = this.queue[queIdx],
                        html = [],
                        calendarConfig = _jqmin2.default.extend({}, this.config.calendar, { displayDate: new Date() }),
                        input = item.$target.get(0).tagName.toUpperCase() == "INPUT" ? item.$target : item.$target.find('input[type]');

                    for (var i = 0; i < item.inputLength; i++) {
                        html.push('<div ' + 'style="width:' + _AX6Util2.default.cssNumber(item.content.width) + ';float:left;" ' + 'class="ax-picker-content-box" ' + 'data-calendar-target="' + i + '"></div>');
                        if (i < item.inputLength - 1) html.push('<div style="width:' + item.content.margin + 'px;float:left;height: 5px;"></div>');
                    }
                    html.push('<div style="clear:both;"></div>');
                    item.pickerContent.html(html.join(''));

                    // calendar bind
                    item.pickerCalendar = [];
                    item.pickerContent.find('[data-calendar-target]').each(function () {

                        // calendarConfig extend ~
                        var idx = this.getAttribute("data-calendar-target"),
                            dValue = input.get(idx).value,
                            d = _AX6Util2.default.date(dValue),
                            dateConvert = {
                            "year": function year(_d) {
                                return _AX6Util2.default.date(_d, { "return": "yyyy" });
                            },
                            "month": function month(_d) {
                                return _AX6Util2.default.date(_d, { "return": "yyyy-MM" });
                            },
                            "day": function day(_d) {
                                return _d;
                            }
                        };

                        calendarConfig.displayDate = d;

                        if (dValue) calendarConfig.selection = [d];

                        calendarConfig = _jqmin2.default.extend(true, calendarConfig, item.content.config || {});
                        calendarConfig.target = this;
                        calendarConfig.onClick = function () {
                            self.setContentValue(item.id, idx, dateConvert[calendarConfig.selectMode || "day"](this.date));
                        };

                        item.pickerCalendar.push({
                            itemId: item.id,
                            inputIndex: idx,
                            calendar: new _AX6UICalendar2.default(calendarConfig)
                        });
                    });
                },
                'secure-num': function secureNum(queIdx) {
                    var _this2 = this;

                    var item = this.queue[queIdx],
                        html = [];
                    for (var i = 0; i < item.inputLength; i++) {
                        html.push('<div ' + 'style="width:' + _AX6Util2.default.cssNumber(item.content.width) + ';float:left;" ' + 'class="ax-picker-content-box" ' + 'data-secure-num-target="' + i + '"></div>');
                        if (i < item.inputLength - 1) html.push('<div style="width:' + item.content.margin + 'px;float:left;height: 5px;"></div>');
                    }
                    html.push('<div style="clear:both;"></div>');
                    item.pickerContent.html(html.join(''));

                    // secure-num bind
                    item.pickerContent.find('[data-secure-num-target]').each(function (elIdx, el) {
                        var idx = el.getAttribute("data-secure-num-target"),
                            po = [];

                        var numArray = function (a) {
                            var j = void 0,
                                x = void 0,
                                i = void 0;
                            for (i = a.length; i; i -= 1) {
                                j = Math.floor(Math.random() * i);
                                x = a[i - 1];
                                a[i - 1] = a[j];
                                a[j] = x;
                            }
                            return a;
                        }([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

                        var specialArray = [{ label: "&#x02190", fn: "back" }, { label: "C", fn: "clear" }];

                        numArray.forEach(function (n) {
                            po.push('<div style="float:left;' + item.content.config.btnWrapStyle + '">');
                            po.push('<button class="' + item.content.config.btnTheme + '" ' + 'style="' + item.content.config.btnStyle + '" data-secure-num-value="' + n + '">' + n + '</button>');
                            po.push('</div>');
                        });
                        specialArray.forEach(function (n) {
                            po.push('<div style="float:left;' + item.content.config.btnWrapStyle + '">');
                            po.push('<button class="' + item.content.config.specialBtnTheme + '" ' + 'style="' + item.content.config.btnStyle + '" data-secure-num-value="' + n.fn + '">' + n.label + '</button>');
                            po.push('</div>');
                        });

                        po.push('<div style="clear:both;"></div>');

                        $(el).html(po.join('')).on("click", '[data-secure-num-value]', function (e) {
                            var act = e.currentTarget.getAttribute("data-secure-num-value");
                            var _input = item.$target.get(0).tagName.toUpperCase() == "INPUT" ? item.$target : (0, _jqmin2.default)(item.$target.find('input[type]').get(idx));
                            var val = _input.val();

                            if (act == "back") {
                                _input.val(val.substring(0, val.length - 1));
                            } else if (act == "clear") {
                                _input.val('');
                            } else {
                                _input.val(val + act);
                            }

                            onStateChanged.call(_this2, item, {
                                self: _this2,
                                state: "changeValue",
                                item: item,
                                value: _input.val()
                            });
                        });
                    });
                },
                'keyboard': function keyboard(queIdx) {
                    var item = this.queue[queIdx];
                    var html = [];
                    for (var i = 0; i < item.inputLength; i++) {
                        html.push('<div ' + 'style="width:' + _AX6Util2.default.cssNumber(item.content.width) + ';float:left;" ' + 'class="ax-picker-content-box" ' + 'data-keyboard-target="' + i + '"></div>');
                        if (i < item.inputLength - 1) html.push('<div style="width:' + item.content.margin + 'px;float:left;height: 5px;"></div>');
                    }
                    html.push('<div style="clear:both;"></div>');
                    item.pickerContent.html(html.join(''));

                    var keyArray = [[{ value: "`", shiftValue: "~" }, { value: "1", shiftValue: "!" }, { value: "2", shiftValue: "@" }, { value: "3", shiftValue: "#" }, { value: "4", shiftValue: "$" }, { value: "5", shiftValue: "%" }, { value: "6", shiftValue: "^" }, { value: "7", shiftValue: "&" }, { value: "8", shiftValue: "*" }, { value: "9", shiftValue: "(" }, { value: "0", shiftValue: ")" }, { value: "-", shiftValue: "_" }, { value: "=", shiftValue: "+" }, { label: "&#x02190", fn: "back" }], [{ value: "q", shiftValue: "Q" }, { value: "w", shiftValue: "W" }, { value: "e", shiftValue: "E" }, { value: "r", shiftValue: "R" }, { value: "t", shiftValue: "T" }, { value: "y", shiftValue: "Y" }, { value: "u", shiftValue: "U" }, { value: "i", shiftValue: "I" }, { value: "o", shiftValue: "O" }, { value: "p", shiftValue: "P" }, { value: "[", shiftValue: "{" }, { value: "]", shiftValue: "}" }, { value: "\\", shiftValue: "|" }], [{ label: "Clear", fn: "clear" }, { value: "a", shiftValue: "A" }, { value: "s", shiftValue: "S" }, { value: "d", shiftValue: "D" }, { value: "f", shiftValue: "F" }, { value: "g", shiftValue: "G" }, { value: "h", shiftValue: "H" }, { value: "j", shiftValue: "J" }, { value: "k", shiftValue: "K" }, { value: "l", shiftValue: "L" }, { value: ";", shiftValue: ":" }, { value: "'", shiftValue: "\"" }], [{ label: "Shift", fn: "shift" }, { value: "z", shiftValue: "Z" }, { value: "x", shiftValue: "X" }, { value: "c", shiftValue: "C" }, { value: "v", shiftValue: "V" }, { value: "b", shiftValue: "B" }, { value: "n", shiftValue: "N" }, { value: "m", shiftValue: "M" }, { value: ",", shiftValue: "<" }, { value: ".", shiftValue: ">" }, { value: "/", shiftValue: "?" }, { label: "Close", fn: "close" }]];
                    var specialArray = [{ label: "&#x02190", fn: "back" }, { label: "C", fn: "clear" }];
                    var getKeyBoard = function getKeyBoard(isShiftKey) {
                        var po = [];
                        keyArray.forEach(function (row) {
                            po.push('<div style="display: table;margin:0 auto;">');
                            row.forEach(function (n) {

                                var keyValue = void 0,
                                    keyLabel = void 0,
                                    btnWrapStyle = void 0,
                                    btnTheme = void 0,
                                    btnStyle = void 0;
                                if (n.fn) {
                                    keyValue = n.fn;
                                    keyLabel = n.label;
                                    btnWrapStyle = item.content.config.specialBtnWrapStyle;
                                    btnTheme = item.content.config.specialBtnTheme;
                                    btnStyle = item.content.config.specialBtnStyle;
                                } else {
                                    keyLabel = keyValue = isShiftKey ? n.shiftValue : n.value;
                                    btnWrapStyle = item.content.config.btnWrapStyle;
                                    btnTheme = item.content.config.btnTheme;
                                    btnStyle = item.content.config.btnStyle;
                                }

                                po.push('<div style="display: table-cell;' + btnWrapStyle + '">');
                                po.push('<button class="' + btnTheme + '" ' + 'style="' + btnStyle + '" data-keyboard-value="' + keyValue + '">' + keyLabel + '</button>');
                                po.push('</div>');
                            });
                            po.push('</div>');
                        });
                        return po.join('');
                    };

                    // secure-num bind
                    item.pickerContent.find('[data-keyboard-target]').each(function () {
                        var idx = this.getAttribute("data-keyboard-target"),
                            $this = $(this),
                            isShiftKey = false,
                            toggleShift = function toggleShift() {
                            isShiftKey = !isShiftKey;
                            $this.html(getKeyBoard(isShiftKey));
                        };

                        $this.html(getKeyBoard(isShiftKey)).on("mousedown", '[data-keyboard-value]', function () {
                            var act = this.getAttribute("data-keyboard-value"),
                                _input = item.$target.get(0).tagName.toUpperCase() == "INPUT" ? item.$target : (0, _jqmin2.default)(item.$target.find('input[type]').get(idx)),
                                val = _input.val();

                            switch (act) {
                                case "back":
                                    _input.val(val.substring(0, val.length - 1));
                                    break;
                                case "clear":
                                    _input.val('');
                                    break;
                                case "shift":
                                    toggleShift();
                                    return false;
                                    break;
                                case "close":
                                    self.close();
                                    return false;
                                    break;
                                default:
                                    _input.val(val + act);
                            }

                            onStateChanged.call(this, item, {
                                self: self,
                                state: "changeValue",
                                item: item,
                                value: _input.val()
                            });
                        });
                    });
                },
                'numpad': function numpad(queIdx) {
                    var item = this.queue[queIdx],
                        html = [];
                    for (var i = 0; i < item.inputLength; i++) {
                        html.push('<div ' + 'style="width:' + _AX6Util2.default.cssNumber(item.content.width) + ';float:left;" ' + 'class="ax-picker-content-box" ' + 'data-numpad-target="' + i + '"></div>');
                        if (i < item.inputLength - 1) html.push('<div style="width:' + item.content.margin + 'px;float:left;height: 5px;"></div>');
                    }
                    html.push('<div style="clear:both;"></div>');
                    item.pickerContent.html(html.join(''));

                    // secure-num bind
                    item.pickerContent.find('[data-numpad-target]').each(function () {
                        var idx = this.getAttribute("data-numpad-target"),
                            po = [],
                            keyArray = item.content.config.keyArray || [{ value: "7" }, { value: "8" }, { value: "9" }, { label: "BS", fn: "back" }, { value: "4" }, { value: "5" }, { value: "6" }, { label: "CLS", fn: "clear" }, { value: "1" }, { value: "2" }, { value: "3" }, { value: "" }, { value: "." }, { value: "0" }, { value: "" }, { label: "OK", fn: "enter" }];

                        keyArray.forEach(function (n) {
                            var keyValue = void 0,
                                keyLabel = void 0,
                                btnWrapStyle = void 0,
                                btnTheme = void 0,
                                btnStyle = void 0;

                            if (n.fn) {
                                keyValue = n.fn;
                                keyLabel = n.label;
                                btnTheme = item.content.config.specialBtnTheme;
                                btnWrapStyle = item.content.config.specialBtnWrapStyle;
                                btnStyle = item.content.config.specialBtnStyle;
                            } else {
                                keyLabel = keyValue = n.value;
                                btnTheme = keyValue ? item.content.config.btnTheme : "";
                                btnWrapStyle = item.content.config.btnWrapStyle;
                                btnStyle = item.content.config.btnStyle;
                            }

                            po.push('<div style="float:left;' + btnWrapStyle + '">');
                            po.push('<button class="btn btn-default btn-' + btnTheme + '" ' + 'style="' + btnStyle + '" data-numpad-value="' + keyValue + '">' + (keyLabel || "&nbsp;") + '</button>');
                            po.push('</div>');
                        });

                        po.push('<div style="clear:both;"></div>');

                        $(this).html(po.join('')).on("mousedown", '[data-numpad-value]', function () {
                            var act = this.getAttribute("data-numpad-value"),
                                _input = item.$target.get(0).tagName.toUpperCase() == "INPUT" ? item.$target : (0, _jqmin2.default)(item.$target.find('input[type]').get(idx)),
                                val = _input.val(),
                                state = "";

                            switch (act) {
                                case "back":
                                    state = "changeValue";
                                    _input.val(val.substring(0, val.length - 1));
                                    break;
                                case "clear":
                                    state = "changeValue";
                                    _input.val('');
                                    break;
                                case "enter":
                                    self.close(item, "enter");
                                    return false;
                                    break;
                                case "close":
                                    self.close();
                                    return false;
                                    break;
                                default:
                                    state = "changeValue";
                                    _input.val(val + act);
                            }

                            onStateChanged.call(this, item, {
                                self: self,
                                state: state,
                                item: item,
                                value: _input.val()
                            });
                        });
                    });
                },
                'color': function color(queIdx) {
                    var item = this.queue[queIdx],
                        html = [],
                        paletteConfig = _jqmin2.default.extend({}, this.config.palette),
                        input = item.$target.get(0).tagName.toUpperCase() == "INPUT" ? item.$target : item.$target.find('input[type]');

                    for (var i = 0; i < item.inputLength; i++) {
                        html.push('<div ' + 'style="padding: 5px;width:' + _AX6Util2.default.cssNumber(item.content.width) + ';float:left;" ' + 'class="ax-picker-content-box" ' + 'data-palette-target="' + i + '" data-ax5palette="ax6picker-' + item.id + '"></div>');
                        if (i < item.inputLength - 1) html.push('<div style="width:' + item.content.margin + 'px;float:left;height: 5px;"></div>');
                    }
                    html.push('<div style="clear:both;"></div>');
                    item.pickerContent.html(html.join(''));

                    // calendar bind
                    item.pickerPalette = [];
                    item.pickerContent.find('[data-palette-target]').each(function () {
                        // calendarConfig extend ~
                        var idx = this.getAttribute("data-palette-target"),
                            dColor = input.get(idx).value;

                        paletteConfig.selectedColor = dColor;
                        paletteConfig = _jqmin2.default.extend(true, paletteConfig, item.content.config || {});
                        paletteConfig.target = this;
                        paletteConfig.onClick = function (color) {
                            self.setContentValue(item.id, idx, color);
                        };
                        paletteConfig.onUpdateColor = function (color) {
                            self.setContentValue(item.id, idx, color, { doNotClose: true });
                        };

                        item.pickerPalette.push({
                            itemId: item.id,
                            inputIndex: idx,
                            palette: new _AX6UIPalette2.default(paletteConfig)
                        });
                    });
                }
            };

            var self = this;
            var queIdx = _AX6Util2.default.isNumber(boundID) ? boundID : getQueIdx.call(this, boundID),
                item = this.queue[queIdx];

            /**
             다른 피커가 있는 경우와 다른 피커를 닫고 다시 오픈 명령이 내려진 경우에 대한 예외 처리 구문
             */
            if (this.openTimer) clearTimeout(this.openTimer);
            if (this.activePicker) {
                if (this.activePickerQueueIndex == queIdx) {
                    return this;
                }

                if (tryCount > 2) return this;
                this.close();
                this.openTimer = setTimeout(function () {
                    this.open(queIdx, (tryCount || 0) + 1);
                }.bind(this), this.config.animateTime);
                return this;
            }

            this.activePicker = (0, _jqmin2.default)(_AX6Mustache2.default.render(tmpl.pickerTmpl.call(this), item));
            this.activePickerArrow = this.activePicker.find(".ax-picker-arrow");
            this.activePickerQueueIndex = queIdx;
            item.pickerContent = this.activePicker.find('[data-picker-els="content"]');

            if (_AX6Util2.default.isFunction(item.content)) {
                // 함수타입
                item.pickerContent.html("Loading..");
                pickerContent["@fn"].call(this, queIdx, function (html) {
                    item.pickerContent.html(html);
                });
            } else {
                if (item.content.type in pickerContent) {
                    pickerContent[item.content.type].call(this, queIdx);
                }
            }

            // bind event picker btns
            this.activePicker.find("[data-picker-btn]").on(this.config.clickEventName, function (e) {
                onBtnClick.call(this, e || window.event, queIdx);
            }.bind(this));

            alignPicker.call(this, "append");

            (0, _jqmin2.default)(window).on("resize.ax6picker", _AX6Util2.default.throttle(function (e) {
                alignPicker.call(this, e || window.event);
            }, 100).bind(this)).on("keyup.ax6picker", function (e) {
                e = e || window.event;
                onBodyKeyup.call(_this3, e);
                _AX6Util2.default.stopEvent(e);
            }).on("click.ax6picker", function (e) {
                e = e || window.event;
                onBodyClick.call(_this3, e);
                _AX6Util2.default.stopEvent(e);
            });

            onStateChanged.call(this, item, {
                self: this,
                state: "open",
                item: item
            });

            return this;
        }

        /**
         * @method
         * @param item
         * @param state
         * @return {AX6UIPicker}
         */

    }, {
        key: "close",
        value: function close(item, state) {
            if (this.closeTimer) clearTimeout(this.closeTimer);
            if (!this.activePicker) return this;

            item = this.queue[this.activePickerQueueIndex];

            this.activePicker.addClass("destroy");
            (0, _jqmin2.default)(window).off("resize.ax6picker");
            (0, _jqmin2.default)(window).off("click.ax6picker");
            (0, _jqmin2.default)(window).off("keyup.ax6picker");

            this.closeTimer = setTimeout(function () {
                if (this.activePicker) this.activePicker.remove();
                this.activePicker = null;
                this.activePickerQueueIndex = -1;

                onStateChanged.call(this, item, {
                    self: this,
                    state: state || "close"
                });
            }.bind(this), this.config.animateTime);

            return this;
        }
    }]);

    return AX6UIPicker;
}(_AX6UICore3.default);

exports.default = AX6UIPicker;