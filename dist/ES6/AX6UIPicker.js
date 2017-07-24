import jQuery from "jqmin";
import AX6UICore from "./AX6UICore";
import info from "./AX6Info";
import U from "./AX6Util";
import mustache from "./AX6Mustache";
import Formatter from "./AX6UIFormatter";
import Calendar from "./AX6UICalendar";
import Palette from "./AX6UIPalette";
import "./AX6UIPicker/index.scss";

const pickerTmpl = function (columnKeys) {
    return `
<div data-ax5picker="" class="{{theme}}" id="{{id}}" data-picker-els="root" {{#zIndex}}style="z-index:{{zIndex}};"{{/zIndex}}>
    {{#title}}
        <div class="ax-picker-heading">{{title}}</div>
    {{/title}}
    <div class="ax-picker-body">
        <div class="ax-picker-content" data-picker-els="content" style="width:{{contentWidth}}px;"></div>
        {{#btns}}
            <div class="ax-picker-buttons">
            {{#btns}}
                {{#@each}}
                <button data-picker-btn="{{@key}}" class="{{@value.theme}}">{{@value.label}}</button>
                {{/@each}}
            {{/btns}}
            </div>
        {{/btns}}
    </div>
    <div class="ax-picker-arrow"></div>
</div>
`;
};
const onStateChanged = function (item, that) {
    if (item && item.onStateChanged) {
        item.onStateChanged.call(that, that);
    } else if (this.onStateChanged) {
        this.onStateChanged.call(that, that);
    }
    return true;
};
const bindPickerTarget = function () {
    const pickerEvent = {
        'focus': function (queIdx, e) {
            this.open(queIdx);
        },
        'click': function (queIdx, e) {
            this.open(queIdx);
        }
    };
    const pickerType = {
        '@fn': function (queIdx, _input) {
            let item = this.queue[queIdx],
                inputLength = _input.length,
                config = {
                inputLength: inputLength || 1
            };

            if (inputLength > 1) {
                config.btns = {
                    ok: { label: this.config.lang["ok"], theme: this.config.theme }
                };
            }

            this.queue[queIdx] = jQuery.extend(true, config, item);

            config = null;
            inputLength = null;
        },
        'date': function (queIdx, _input) {
            let item = this.queue[queIdx],
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

            this.queue[queIdx] = jQuery.extend(true, config, item);

            contentWidth = null;
            contentMargin = null;
            config = null;
            inputLength = null;
        },
        'secure-num': function (queIdx, _input) {
            let item = this.queue[queIdx],
                inputLength = _input.length,
                config = {
                inputLength: inputLength || 1
            };

            this.queue[queIdx] = jQuery.extend(true, config, item);

            config = null;
            inputLength = null;
        },
        'keyboard': function (queIdx, _input) {
            let item = this.queue[queIdx],
                inputLength = _input.length,
                config = {
                inputLength: inputLength || 1
            };

            this.queue[queIdx] = jQuery.extend(true, config, item);

            config = null;
            inputLength = null;
        },
        'numpad': function (queIdx, _input) {
            let item = this.queue[queIdx],
                inputLength = _input.length,
                config = {
                inputLength: inputLength || 1
            };

            this.queue[queIdx] = jQuery.extend(true, config, item);

            config = null;
            inputLength = null;
        },
        'color': function (queIdx, _input) {
            let item = this.queue[queIdx],
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
                $colorPreview.css({ "background-color": "#" + U.color(_input.val() || "#000000").getHexValue() });
                // 컬러 피커인 경우 input의 값이 변경되면 preview를 수정
                _input.on("change", function () {
                    $colorPreview.css({ "background-color": "#" + U.color(this.value || "#000000").getHexValue() });
                });
            }

            if (inputLength > 1 && !item.btns) {
                config.btns = {
                    ok: { label: this.config.lang["ok"], theme: this.config.theme }
                };
            }

            this.queue[queIdx] = jQuery.extend(true, config, item);

            contentWidth = null;
            contentMargin = null;
            config = null;
            inputLength = null;
        }
    };

    return function (queIdx) {
        let item = this.queue[queIdx],
            input;

        if (!item.content) {
            console.log(info.getError("ax6picker", "501", "bind"));
            return this;
        }

        input = item.$target.get(0).tagName.toUpperCase() == "INPUT" ? item.$target : item.$target.find('input[type]');

        // 함수타입
        if (U.isFunction(item.content)) {
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
            this.formatter.bind(jQuery.extend({}, item.content.formatter, { target: input }));
        }

        input = null;
        item = null;
        queIdx = null;
        return this;
    };
}();
const alignPicker = function (append) {
    if (!this.activePicker) return this;

    let _alignPicker = function (item) {
        let $window = jQuery(window),
            $body = jQuery(document.body);
        let pos = {},
            positionMargin = 12,
            dim = {},
            pickerDim = {},
            pickerDirection;

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

        let positionCSS = function () {
            let css = { left: 0, top: 0 };
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
    let item = this.queue[this.activePickerQueueIndex];

    if (append) {
        this.activePicker.css({ top: -999 });
        jQuery(document.body).append(this.activePicker);
    }

    setTimeout(function () {
        _alignPicker.call(this, item);
    }.bind(this));
};
const onBodyClick = function (e, target) {
    if (!this.activePicker) return this;

    let item = this.queue[this.activePickerQueueIndex];

    target = U.findParentNode(e.target, function (target) {
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
const onBtnClick = function (e, target) {
    // console.log('btn click');
    if (e.srcElement) e.target = e.srcElement;

    target = U.findParentNode(e.target, function (target) {
        if (target.getAttribute("data-picker-btn")) {
            return true;
        }
    });

    if (target) {
        let item = this.queue[this.activePickerQueueIndex],
            k = target.getAttribute("data-picker-btn");

        if (item.btns && item.btns[k].onClick) {
            let that = {
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
const onBodyKeyup = function (e) {
    if (e.keyCode == info.eventKeys.ESC) {
        this.close();
    }
};
const getQueIdx = function (boundID) {
    if (!U.isString(boundID)) {
        boundID = jQuery(boundID).data("data-axpicker-id");
    }
    if (!U.isString(boundID)) {
        console.log(info.getError("ax6picker", "402", "getQueIdx"));
        return;
    }
    return U.search(this.queue, function () {
        return this.id == boundID;
    });
};

/**
 * @class
 */
class AX6UIPicker extends AX6UICore {
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
    constructor(config) {
        super();

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
        this.config = {
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
        jQuery.extend(true, this.config, config);

        // 멤버 변수 초기화
        /**
         * @member {Array}
         */
        this.queue = [];
        /**
         * @member {Object}
         */
        this.activePicker = null;
        /**
         * @member {Number}
         */
        this.activePickerQueueIndex = -1;
        /**
         * @member {Object}
         */
        this.openTimer = null;
        /**
         * @member {Object}
         */
        this.closeTimer = null;

        this.init();
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
    init() {
        this.onStateChanged = this.config.onStateChanged;
        delete this.config.onStateChanged;

        // init 호출 여부
        this.initOnce();
    }

    /**
     * @method
     */
    initOnce() {
        if (this.initialized) return this;
        this.initialized = true;

        // formatter 인스턴스
        this.formatter = new Formatter();
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
    bind(item) {
        let pickerConfig = {},
            queIdx;
        item = jQuery.extend(true, pickerConfig, this.config, item);

        if (!item.target) {
            console.log(info.getError("ax6picker", "401", "bind"));
            return this;
        }
        item.$target = jQuery(item.target);

        if (!item.$target.get(0)) {
            console.log(info.getError("ax6picker", "401", "bind"));
            return this;
        }

        if (!item.id) item.id = item.$target.data("data-axpicker-id");
        if (!item.id) {
            item.id = 'ax6-picker-' + AX6UICore.getInstanceId();
            item.$target.data("data-axpicker-id", item.id);
        }
        queIdx = U.search(this.queue, function () {
            return this.id == item.id;
        });

        if (queIdx === -1) {
            this.queue.push(item);
            bindPickerTarget.call(this, this.queue.length - 1);
        } else {
            this.queue[queIdx] = jQuery.extend(true, {}, this.queue[queIdx], item);
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
    setContentValue(boundID, inputIndex, val, _option) {
        const multipleInputProcessor = {
            "date": function (_item, _inputIndex, _val) {
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
                        diffDay = U.dday(values[1], { today: values[0] });
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
                        diffDay = U.dday(values[1], { today: values[0] });
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

        let queIdx = U.isNumber(boundID) ? boundID : getQueIdx.call(this, boundID),
            item = this.queue[queIdx],
            _input;

        if (!_option) _option = {};
        if (item) {

            _input = item.$target.get(0).tagName.toUpperCase() == "INPUT" ? item.$target : jQuery(item.$target.find('input[type]').get(inputIndex));
            _input.val(val);

            if (!item.disableChangeTrigger) {
                _input.trigger("change");
            } else {
                let $colorPreview = item.$target.find('[data-ax6picker-color="preview"]');
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

            let that = {
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
    getContentValue(boundID, inputIndex) {
        let queIdx = U.isNumber(boundID) ? boundID : getQueIdx.call(this, boundID),
            item = this.queue[queIdx],
            _input;

        if (item) {
            _input = item.$target.get(0).tagName.toUpperCase() == "INPUT" ? item.$target : jQuery(item.$target.find('input[type]').get(inputIndex));
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
    open(boundID, tryCount) {
        const pickerContent = {
            '@fn': function (queIdx, callback) {
                let item = this.queue[queIdx];
                item.content.call(item, function (html) {
                    callback(html);
                });
                return true;
            },
            'date': function (queIdx) {
                let item = this.queue[queIdx],
                    html = [],
                    calendarConfig = jQuery.extend({}, this.config.calendar, { displayDate: new Date() }),
                    input = item.$target.get(0).tagName.toUpperCase() == "INPUT" ? item.$target : item.$target.find('input[type]');

                for (let i = 0; i < item.inputLength; i++) {
                    html.push('<div ' + 'style="width:' + U.cssNumber(item.content.width) + ';float:left;" ' + 'class="ax-picker-content-box" ' + 'data-calendar-target="' + i + '"></div>');
                    if (i < item.inputLength - 1) html.push('<div style="width:' + item.content.margin + 'px;float:left;height: 5px;"></div>');
                }
                html.push('<div style="clear:both;"></div>');
                item.pickerContent.html(html.join(''));

                // calendar bind
                item.pickerCalendar = [];
                item.pickerContent.find('[data-calendar-target]').each(function () {

                    // calendarConfig extend ~
                    let idx = this.getAttribute("data-calendar-target"),
                        dValue = input.get(idx).value,
                        d = U.date(dValue),
                        dateConvert = {
                        "year"(_d) {
                            return U.date(_d, { "return": "yyyy" });
                        },
                        "month"(_d) {
                            return U.date(_d, { "return": "yyyy-MM" });
                        },
                        "day"(_d) {
                            return _d;
                        }
                    };

                    calendarConfig.displayDate = d;

                    if (dValue) calendarConfig.selection = [d];

                    calendarConfig = jQuery.extend(true, calendarConfig, item.content.config || {});
                    calendarConfig.target = this;
                    calendarConfig.onClick = function () {
                        self.setContentValue(item.id, idx, dateConvert[calendarConfig.selectMode || "day"](this.date));
                    };

                    item.pickerCalendar.push({
                        itemId: item.id,
                        inputIndex: idx,
                        calendar: new Calendar(calendarConfig)
                    });
                });
            },
            'secure-num': function (queIdx) {
                let item = this.queue[queIdx],
                    html = [];
                for (let i = 0; i < item.inputLength; i++) {
                    html.push('<div ' + 'style="width:' + U.cssNumber(item.content.width) + ';float:left;" ' + 'class="ax-picker-content-box" ' + 'data-secure-num-target="' + i + '"></div>');
                    if (i < item.inputLength - 1) html.push('<div style="width:' + item.content.margin + 'px;float:left;height: 5px;"></div>');
                }
                html.push('<div style="clear:both;"></div>');
                item.pickerContent.html(html.join(''));

                // secure-num bind
                item.pickerContent.find('[data-secure-num-target]').each((elIdx, el) => {
                    let idx = el.getAttribute("data-secure-num-target"),
                        po = [];

                    let numArray = function (a) {
                        let j, x, i;
                        for (i = a.length; i; i -= 1) {
                            j = Math.floor(Math.random() * i);
                            x = a[i - 1];
                            a[i - 1] = a[j];
                            a[j] = x;
                        }
                        return a;
                    }([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

                    let specialArray = [{ label: "&#x02190", fn: "back" }, { label: "C", fn: "clear" }];

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

                    $(el).html(po.join('')).on("click", '[data-secure-num-value]', e => {
                        let act = e.currentTarget.getAttribute("data-secure-num-value");
                        let _input = item.$target.get(0).tagName.toUpperCase() == "INPUT" ? item.$target : jQuery(item.$target.find('input[type]').get(idx));
                        let val = _input.val();

                        if (act == "back") {
                            _input.val(val.substring(0, val.length - 1));
                        } else if (act == "clear") {
                            _input.val('');
                        } else {
                            _input.val(val + act);
                        }

                        onStateChanged.call(this, item, {
                            self: this,
                            state: "changeValue",
                            item: item,
                            value: _input.val()
                        });
                    });
                });
            },
            'keyboard': function (queIdx) {
                let item = this.queue[queIdx];
                let html = [];
                for (let i = 0; i < item.inputLength; i++) {
                    html.push('<div ' + 'style="width:' + U.cssNumber(item.content.width) + ';float:left;" ' + 'class="ax-picker-content-box" ' + 'data-keyboard-target="' + i + '"></div>');
                    if (i < item.inputLength - 1) html.push('<div style="width:' + item.content.margin + 'px;float:left;height: 5px;"></div>');
                }
                html.push('<div style="clear:both;"></div>');
                item.pickerContent.html(html.join(''));

                let keyArray = [[{ value: "`", shiftValue: "~" }, { value: "1", shiftValue: "!" }, { value: "2", shiftValue: "@" }, { value: "3", shiftValue: "#" }, { value: "4", shiftValue: "$" }, { value: "5", shiftValue: "%" }, { value: "6", shiftValue: "^" }, { value: "7", shiftValue: "&" }, { value: "8", shiftValue: "*" }, { value: "9", shiftValue: "(" }, { value: "0", shiftValue: ")" }, { value: "-", shiftValue: "_" }, { value: "=", shiftValue: "+" }, { label: "&#x02190", fn: "back" }], [{ value: "q", shiftValue: "Q" }, { value: "w", shiftValue: "W" }, { value: "e", shiftValue: "E" }, { value: "r", shiftValue: "R" }, { value: "t", shiftValue: "T" }, { value: "y", shiftValue: "Y" }, { value: "u", shiftValue: "U" }, { value: "i", shiftValue: "I" }, { value: "o", shiftValue: "O" }, { value: "p", shiftValue: "P" }, { value: "[", shiftValue: "{" }, { value: "]", shiftValue: "}" }, { value: "\\", shiftValue: "|" }], [{ label: "Clear", fn: "clear" }, { value: "a", shiftValue: "A" }, { value: "s", shiftValue: "S" }, { value: "d", shiftValue: "D" }, { value: "f", shiftValue: "F" }, { value: "g", shiftValue: "G" }, { value: "h", shiftValue: "H" }, { value: "j", shiftValue: "J" }, { value: "k", shiftValue: "K" }, { value: "l", shiftValue: "L" }, { value: ";", shiftValue: ":" }, { value: "'", shiftValue: "\"" }], [{ label: "Shift", fn: "shift" }, { value: "z", shiftValue: "Z" }, { value: "x", shiftValue: "X" }, { value: "c", shiftValue: "C" }, { value: "v", shiftValue: "V" }, { value: "b", shiftValue: "B" }, { value: "n", shiftValue: "N" }, { value: "m", shiftValue: "M" }, { value: ",", shiftValue: "<" }, { value: ".", shiftValue: ">" }, { value: "/", shiftValue: "?" }, { label: "Close", fn: "close" }]];
                let specialArray = [{ label: "&#x02190", fn: "back" }, { label: "C", fn: "clear" }];
                const getKeyBoard = function (isShiftKey) {
                    let po = [];
                    keyArray.forEach(function (row) {
                        po.push('<div style="display: table;margin:0 auto;">');
                        row.forEach(function (n) {

                            let keyValue, keyLabel, btnWrapStyle, btnTheme, btnStyle;
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
                    let idx = this.getAttribute("data-keyboard-target"),
                        $this = $(this),
                        isShiftKey = false,
                        toggleShift = function () {
                        isShiftKey = !isShiftKey;
                        $this.html(getKeyBoard(isShiftKey));
                    };

                    $this.html(getKeyBoard(isShiftKey)).on("mousedown", '[data-keyboard-value]', function () {
                        let act = this.getAttribute("data-keyboard-value"),
                            _input = item.$target.get(0).tagName.toUpperCase() == "INPUT" ? item.$target : jQuery(item.$target.find('input[type]').get(idx)),
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
            'numpad': function (queIdx) {
                let item = this.queue[queIdx],
                    html = [];
                for (let i = 0; i < item.inputLength; i++) {
                    html.push('<div ' + 'style="width:' + U.cssNumber(item.content.width) + ';float:left;" ' + 'class="ax-picker-content-box" ' + 'data-numpad-target="' + i + '"></div>');
                    if (i < item.inputLength - 1) html.push('<div style="width:' + item.content.margin + 'px;float:left;height: 5px;"></div>');
                }
                html.push('<div style="clear:both;"></div>');
                item.pickerContent.html(html.join(''));

                // secure-num bind
                item.pickerContent.find('[data-numpad-target]').each(function () {
                    let idx = this.getAttribute("data-numpad-target"),
                        po = [],
                        keyArray = item.content.config.keyArray || [{ value: "7" }, { value: "8" }, { value: "9" }, { label: "BS", fn: "back" }, { value: "4" }, { value: "5" }, { value: "6" }, { label: "CLS", fn: "clear" }, { value: "1" }, { value: "2" }, { value: "3" }, { value: "" }, { value: "." }, { value: "0" }, { value: "" }, { label: "OK", fn: "enter" }];

                    keyArray.forEach(function (n) {
                        let keyValue, keyLabel, btnWrapStyle, btnTheme, btnStyle;

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
                        let act = this.getAttribute("data-numpad-value"),
                            _input = item.$target.get(0).tagName.toUpperCase() == "INPUT" ? item.$target : jQuery(item.$target.find('input[type]').get(idx)),
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
            'color': function (queIdx) {
                let item = this.queue[queIdx],
                    html = [],
                    paletteConfig = jQuery.extend({}, this.config.palette),
                    input = item.$target.get(0).tagName.toUpperCase() == "INPUT" ? item.$target : item.$target.find('input[type]');

                for (let i = 0; i < item.inputLength; i++) {
                    html.push('<div ' + 'style="padding: 5px;width:' + U.cssNumber(item.content.width) + ';float:left;" ' + 'class="ax-picker-content-box" ' + 'data-palette-target="' + i + '" data-ax5palette="ax6picker-' + item.id + '"></div>');
                    if (i < item.inputLength - 1) html.push('<div style="width:' + item.content.margin + 'px;float:left;height: 5px;"></div>');
                }
                html.push('<div style="clear:both;"></div>');
                item.pickerContent.html(html.join(''));

                // calendar bind
                item.pickerPalette = [];
                item.pickerContent.find('[data-palette-target]').each(function () {
                    // calendarConfig extend ~
                    let idx = this.getAttribute("data-palette-target"),
                        dColor = input.get(idx).value;

                    paletteConfig.selectedColor = dColor;
                    paletteConfig = jQuery.extend(true, paletteConfig, item.content.config || {});
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
                        palette: new Palette(paletteConfig)
                    });
                });
            }
        };

        let self = this;
        let queIdx = U.isNumber(boundID) ? boundID : getQueIdx.call(this, boundID),
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

        this.activePicker = jQuery(mustache.render(pickerTmpl.call(this), item));
        this.activePickerArrow = this.activePicker.find(".ax-picker-arrow");
        this.activePickerQueueIndex = queIdx;
        item.pickerContent = this.activePicker.find('[data-picker-els="content"]');

        if (U.isFunction(item.content)) {
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

        jQuery(window).on("resize.ax6picker", U.throttle(function (e) {
            alignPicker.call(this, e || window.event);
        }, 100).bind(this)).on("keyup.ax6picker", e => {
            e = e || window.event;
            onBodyKeyup.call(this, e);
            U.stopEvent(e);
        }).on("click.ax6picker", e => {
            e = e || window.event;
            onBodyClick.call(this, e);
            U.stopEvent(e);
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
    close(item, state) {
        if (this.closeTimer) clearTimeout(this.closeTimer);
        if (!this.activePicker) return this;

        item = this.queue[this.activePickerQueueIndex];

        this.activePicker.addClass("destroy");
        jQuery(window).off("resize.ax6picker");
        jQuery(window).off("click.ax6picker");
        jQuery(window).off("keyup.ax6picker");

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
}

export default AX6UIPicker;