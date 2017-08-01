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

require("./AX6UICalendar/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var tmpl = {
    frame: function frame(columnKeys) {
        return "\n<div data-ax6ui-calendar=\"\" class=\"ax6-ui-calendar {{theme}}\" data-calendar-els=\"root\" onselectstart=\"return false;\">\n    {{#control}}\n    <div class=\"calendar-control\" data-calendar-els=\"control\" style=\"{{controlCSS}}\">\n        <a class=\"date-move-left\" data-calendar-move=\"left\" style=\"{{controlButtonCSS}}\">{{{left}}}</a>\n        <div class=\"date-display\" data-calendar-els=\"control-display\" style=\"{{controlCSS}}\"></div>\n        <a class=\"date-move-right\" data-calendar-move=\"right\" style=\"{{controlButtonCSS}}\">{{{right}}}</a>\n    </div>\n    {{/control}}\n    <div class=\"calendar-body\" data-calendar-els=\"body\"></div>\n</div>\n";
    },
    day: function day(columnKeys) {
        return "\n<table data-calendar-table=\"day\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%;\">\n    <thead>\n        <tr>\n        {{#weekNames}}\n            <td class=\"calendar-col-{{col}}\" style=\"height: {{colHeadHeight}}\">\n            {{label}}\n            </td>\n        {{/weekNames}}\n        </tr>\n    </thead>\n    <tbody>\n        <tr>\n            {{#list}}    \n            {{#isStartOfWeek}}\n            {{^@first}}\n        </tr>\n        <tr>\n            {{/@first}}\n            {{/isStartOfWeek}}\n            <td class=\"calendar-col-{{col}}\" style=\"{{itemStyles}}\">\n                <a class=\"calendar-item-day {{addClass}}\" data-calendar-item-date=\"{{thisDate}}\">\n                    <span class=\"addon addon-header\"></span>\n                    {{thisDataLabel}}\n                    <span class=\"addon addon-footer\"></span>\n                </a>\n            </td>\n            {{/list}}\n        </tr>\n    </tbody>\n</table>\n";
    },
    month: function month(columnKeys) {
        return "\n<table data-calendar-table=\"month\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%;\">\n    <thead>\n        <tr>\n            <td class=\"calendar-col-0\" colspan=\"3\" style=\"height: {{colHeadHeight}}\">\n            {{colHeadLabel}}\n            </td>\n        </tr>\n    </thead>\n    <tbody>\n        <tr>\n            {{#list}}    \n            {{#isStartOfRow}}\n            {{^@first}}\n        </tr>\n        <tr>\n            {{/@first}}\n            {{/isStartOfRow}}\n            <td class=\"calendar-col-{{col}}\" style=\"{{itemStyles}}\">\n                <a class=\"calendar-item-month {{addClass}}\" data-calendar-item-month=\"{{thisMonth}}\">\n                    <span class=\"addon\"></span>\n                    {{thisMonthLabel}}\n                    <span class=\"lunar\"></span>\n                </a>\n            </td>\n            {{/list}}\n        </tr>\n    </tbody>\n</table>\n";
    },
    year: function year(columnKeys) {
        return "\n<table data-calendar-table=\"year\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%;\">\n    <thead>\n        <tr>\n            <td class=\"calendar-col-0\" colspan=\"4\" style=\"height: {{colHeadHeight}}\">\n            {{colHeadLabel}}\n            </td>\n        </tr>\n    </thead>\n    <tbody>\n        <tr>\n            {{#list}}    \n            {{#isStartOfRow}}\n            {{^@first}}\n        </tr>\n        <tr>\n            {{/@first}}\n            {{/isStartOfRow}}\n            <td class=\"calendar-col-{{col}}\" style=\"{{itemStyles}}\">\n                <a class=\"calendar-item-year {{addClass}}\" data-calendar-item-year=\"{{thisYear}}\">\n                    <span class=\"addon\"></span>\n                    {{thisYearLabel}}\n                    <span class=\"lunar\"></span>\n                </a>\n            </td>\n            {{/list}}\n        </tr>\n    </tbody>\n</table>\n";
    }
};

var onStateChanged = function onStateChanged(opts, that) {
    if (opts && opts.onStateChanged) {
        opts.onStateChanged.call(that, that);
    } else if (this.onStateChanged) {
        this.onStateChanged.call(that, that);
    }

    that = null;
};
var getFrame = function getFrame() {
    var data = _jqmin2.default.extend(true, {}, this.config, {
        controlCSS: {},
        controlButtonCSS: {}
    });

    data.controlButtonCSS["height"] = data.controlCSS["height"] = _AX6Util2.default.cssNumber(this.config.dimensions.controlHeight);
    data.controlButtonCSS["line-height"] = data.controlCSS["line-height"] = _AX6Util2.default.cssNumber(this.config.dimensions.controlHeight);
    data.controlButtonCSS["width"] = _AX6Util2.default.cssNumber(this.config.dimensions.controlHeight);

    data.controlCSS = _AX6Util2.default.css(data.controlCSS);
    data.controlButtonCSS = _AX6Util2.default.css(data.controlButtonCSS);

    try {
        return _AX6Mustache2.default.render(tmpl.frame.call(this), data);
    } finally {
        data = null;
    }
};
var setDisplay = function setDisplay() {
    var _this = this;

    var myDate = _AX6Util2.default.date(this.config.displayDate),
        yy = "",
        mm = "",
        yy1 = void 0,
        yy2 = void 0;

    if (this.config.control) {
        if (this.config.mode == "day" || this.config.mode == "d") {
            yy = this.config.control.yearTmpl ? this.config.control.yearTmpl.replace('%s', myDate.getFullYear()) : myDate.getFullYear();
            mm = this.config.control.monthTmpl ? this.config.control.monthTmpl.replace('%s', this.config.lang.months[myDate.getMonth()]) : this.config.lang.months[myDate.getMonth()];

            this.$["control-display"].html(function () {
                if (_this.config.control.yearFirst) {
                    return '<span data-calendar-display="year">' + yy + '</span>' + '<span data-calendar-display="month">' + mm + '</span>';
                } else {
                    return '<span data-calendar-display="month">' + mm + '</span>' + '<span data-calendar-display="year">' + yy + '</span>';
                }
            }());
        } else if (this.config.mode == "month" || this.config.mode == "m") {
            yy = this.config.control.yearTmpl ? this.config.control.yearTmpl.replace('%s', myDate.getFullYear()) : myDate.getFullYear();
            this.$["control-display"].html('<span data-calendar-display="year">' + yy + '</span>');
        } else if (this.config.mode == "year" || this.config.mode == "y") {
            yy1 = this.config.control.yearTmpl ? this.config.control.yearTmpl.replace('%s', myDate.getFullYear() - 10) : myDate.getFullYear() - 10;
            yy2 = this.config.control.yearTmpl ? this.config.control.yearTmpl.replace('%s', Number(myDate.getFullYear()) + 9) : Number(myDate.getFullYear()) + 9;
            this.$["control-display"].html(yy1 + ' ~ ' + yy2);
        }

        this.$["control-display"].off(this.config.clickEventName).on(this.config.clickEventName, '[data-calendar-display]', function (e) {
            var target = _AX6Util2.default.findParentNode(e.target, function (target) {
                if (target.getAttribute("data-calendar-display")) {
                    return true;
                }
            }),
                mode = void 0;
            if (target) {
                mode = target.getAttribute("data-calendar-display");
                this.changeMode(mode);
            }
            target = null;
            mode = null;
        }.bind(this));
    }

    myDate = null;
    yy = null;
    mm = null;
    yy1 = null;
    yy2 = null;
    return this;
};
var printDay = function printDay(nowDate) {
    var _this2 = this;

    var dotDate = _AX6Util2.default.date(nowDate),
        monthStratDate = new Date(dotDate.getFullYear(), dotDate.getMonth(), 1, 12),
        _today = this.config.displayDate,
        tableStartDate = function () {
        var day = monthStratDate.getDay();
        if (day == 0) day = 7;
        day -= _this2.config.startOfWeek;

        try {
            return _AX6Util2.default.date(monthStratDate, { add: { d: -day } });
        } finally {
            day = null;
        }
    }(),
        loopDate = void 0,
        thisMonth = dotDate.getMonth(),
        itemStyles = {},
        i = void 0,
        k = void 0,
        _k = void 0,
        frameWidth = this.$["body"].width(),
        frameHeight = Math.floor(frameWidth * (6 / 7)),
        // 1week = 7days, 1month = 6weeks
    data = void 0;

    if (this.config.dimensions.height) {
        frameHeight = _AX6Util2.default.number(this.config.dimensions.height) - _AX6Util2.default.number(this.config.dimensions.colHeadHeight);
    }

    itemStyles['height'] = Math.floor(frameHeight / 6) - _AX6Util2.default.number(this.config.dimensions.itemPadding) * 2 + 'px';
    itemStyles['line-height'] = itemStyles['height'];
    itemStyles['padding'] = _AX6Util2.default.cssNumber(this.config.dimensions.itemPadding);

    data = {
        weekNames: [].concat(_AX6Info2.default.weekNames),
        list: []
    };

    if (this.config.startOfWeek) {
        data.weekNames = data.weekNames.concat(data.weekNames.slice(0, this.config.startOfWeek)).splice(this.config.startOfWeek);
    }

    data.weekNames.forEach(function (n) {
        n.colHeadHeight = _AX6Util2.default.cssNumber(_this2.config.dimensions.colHeadHeight);
    });

    loopDate = tableStartDate;
    i = 0;
    while (i < 6) {
        k = 0;

        var _loop = function _loop() {
            _k = (7 + (k - _this2.config.startOfWeek)) % 7;
            var thisDate = '' + _AX6Util2.default.date(loopDate, { "return": _this2.config.dateFormat }),
                _date = {
                'row': i,
                'col': k,
                isStartOfWeek: k == 0,
                thisDate: '' + thisDate,
                thisDataLabel: _this2.config.lang.dayTmpl.replace('%s', loopDate.getDate()),
                itemStyles: _AX6Util2.default.css(itemStyles),
                addClass: function () {
                    var classNames = "";

                    if (_this2.config.selectable) {
                        if (_this2.selectableMap[thisDate]) {
                            classNames += loopDate.getMonth() == thisMonth ? " live" : "";
                        } else {
                            classNames += " disable";
                        }
                    } else {
                        if (loopDate.getMonth() == thisMonth) {
                            if (thisDate == _AX6Util2.default.date(_today, { "return": "yyyyMMdd" })) {
                                classNames += " focus";
                            } else {
                                classNames += " live";
                            }

                            if (loopDate.getDay() == 0) {
                                classNames += " sunday";
                            }
                            if (loopDate.getDay() == 6) {
                                classNames += " saturday";
                            }
                        }
                    }

                    return classNames;
                }() + ' ' + function () {
                    return _this2.markerMap[thisDate] ? _this2.markerMap[thisDate].theme || _this2.config.defaultMarkerTheme : '';
                }() + ' ' + function () {
                    return _this2.selectionMap[thisDate] ? "selected-day" : '';
                }()
            };
            data.list.push(_date);

            k++;
            loopDate = _AX6Util2.default.date(loopDate, { add: { d: 1 } });

            thisDate = null;
            _date = null;
        };

        while (k < 7) {
            _loop();
        }
        i++;
    }

    this.$["body"].html(_AX6Mustache2.default.render(tmpl.day.call(this), data)).off(this.config.clickEventName).on(this.config.clickEventName, '[data-calendar-item-date]', function (e) {
        e = e || window.event;
        onclick.call(_this2, e, 'date');
        _AX6Util2.default.stopEvent(e);
    });

    this.printedDay = {
        start: tableStartDate, end: loopDate
    };

    onStateChanged.call(this, null, {
        self: this,
        action: "printDay",
        printedDay: this.printedDay
    });
    setDisplay.call(this);

    dotDate = null;
    monthStratDate = null;
    _today = null;
    tableStartDate = null;
    loopDate = null;
    thisMonth = null;
    itemStyles = null;
    i = null;
    k = null;
    frameWidth = null;
    frameHeight = null;
    data = null;
};
var printMonth = function printMonth(nowDate) {
    var _this3 = this;

    var dotDate = _AX6Util2.default.date(nowDate),
        nMonth = dotDate.getMonth(),
        itemStyles = {},
        i = void 0,
        k = void 0,
        m = void 0,
        tableStartMonth = void 0,
        frameWidth = this.$["body"].width(),
        frameHeight = Math.floor(frameWidth * (6 / 7)),
        data = void 0;

    if (this.config.dimensions.height) {
        frameHeight = _AX6Util2.default.number(this.config.dimensions.height) - _AX6Util2.default.number(this.config.dimensions.colHeadHeight);
    }

    itemStyles['height'] = Math.floor(frameHeight / 4) - _AX6Util2.default.number(this.config.dimensions.itemPadding) * 2 + 'px';
    itemStyles['line-height'] = itemStyles['height'];
    itemStyles['padding'] = _AX6Util2.default.cssNumber(this.config.dimensions.itemPadding);

    data = {
        colHeadHeight: _AX6Util2.default.cssNumber(this.config.dimensions.colHeadHeight),
        colHeadLabel: this.config.lang.monthHeading,
        list: []
    };

    tableStartMonth = 0;
    m = 0;
    i = 0;
    while (i < 4) {
        k = 0;
        while (k < 3) {
            var _month = {
                row: i,
                col: k,
                isStartOfRow: k == 0,
                thisMonth: dotDate.getFullYear() + '-' + _AX6Util2.default.setDigit(m + 1, 2) + '-' + _AX6Util2.default.setDigit(dotDate.getDate(), 2),
                thisMonthLabel: this.config.lang.months[m],
                itemStyles: _AX6Util2.default.css(itemStyles),
                addClass: function () {
                    if (_this3.config.selectable) {
                        return _this3.selectableMap[m] ? 'live' : 'disable';
                    } else {
                        return 'live';
                    }
                }() + ' ' + function () {
                    return m == nMonth ? "focus" : "";
                }() + ' ' + function () {
                    return _this3.markerMap[m] ? _this3.markerMap[m].theme || _this3.config.defaultMarkerTheme : '';
                }()
            };
            data.list.push(_month);
            m++;
            k++;
            _month = null;
        }
        i++;
    }

    this.$["body"].html(_AX6Mustache2.default.render(tmpl.month.call(this), data)).off(this.config.clickEventName).on(this.config.clickEventName, '[data-calendar-item-month]', function (e) {
        e = e || window.event;
        onclick.call(_this3, e, 'month');
        _AX6Util2.default.stopEvent(e);
    });

    this.printedDay = {
        start: dotDate.getFullYear() + '-' + _AX6Util2.default.setDigit(tableStartMonth + 1, 2),
        end: dotDate.getFullYear() + '-' + _AX6Util2.default.setDigit(m, 2)
    };

    onStateChanged.call(this, null, {
        self: this,
        action: "printMonth",
        printedDay: this.printedDay
    });
    setDisplay.call(this);

    dotDate = null;
    nMonth = null;
    itemStyles = null;
    i = null;
    k = null;
    m = null;
    tableStartMonth = null;
    frameWidth = null;
    frameHeight = null;
    data = null;
};
var printYear = function printYear(nowDate) {
    var _this4 = this;

    var dotDate = _AX6Util2.default.date(nowDate),
        nYear = dotDate.getFullYear(),
        itemStyles = {},
        i = void 0,
        k = void 0,
        y = void 0,
        tableStartYear = void 0,
        frameWidth = this.$["body"].width(),
        frameHeight = Math.floor(frameWidth * (6 / 7)),
        data = void 0;

    if (this.config.dimensions.height) {
        frameHeight = _AX6Util2.default.number(this.config.dimensions.height) - _AX6Util2.default.number(this.config.dimensions.colHeadHeight);
    }

    itemStyles['height'] = Math.floor(frameHeight / 5) - _AX6Util2.default.number(this.config.dimensions.itemPadding) * 2 + 'px';
    itemStyles['line-height'] = itemStyles['height'];
    itemStyles['padding'] = _AX6Util2.default.cssNumber(this.config.dimensions.itemPadding);

    data = {
        colHeadHeight: _AX6Util2.default.cssNumber(this.config.dimensions.colHeadHeight),
        colHeadLabel: this.config.lang.yearHeading,
        list: []
    };

    tableStartYear = nYear - 10;
    y = nYear - 10;
    i = 0;
    while (i < 5) {
        k = 0;
        while (k < 4) {
            var _year = {
                row: i,
                col: k,
                isStartOfRow: k == 0,
                thisYear: y + '-' + _AX6Util2.default.setDigit(dotDate.getMonth() + 1, 2) + '-' + _AX6Util2.default.setDigit(dotDate.getDate(), 2),
                thisYearLabel: this.config.lang.yearTmpl.replace('%s', y),
                itemStyles: _AX6Util2.default.css(itemStyles),
                addClass: function () {
                    if (_this4.config.selectable) {
                        return _this4.selectableMap[y] ? 'live' : 'disable';
                    } else {
                        return 'live';
                    }
                }() + ' ' + function () {
                    return y == nYear ? "focus" : "";
                }() + ' ' + function () {
                    return _this4.selectableMap[y] ? _this4.selectableMap[y].theme || _this4.config.defaultMarkerTheme : '';
                }()
            };
            data.list.push(_year);
            y++;
            k++;
            _year = null;
        }
        i++;
    }

    this.$["body"].html(_AX6Mustache2.default.render(tmpl.year.call(this), data)).off(this.config.clickEventName).on(this.config.clickEventName, '[data-calendar-item-year]', function (e) {
        e = e || window.event;
        onclick.call(_this4, e, 'year');
        _AX6Util2.default.stopEvent(e);
    });

    this.printedDay = {
        start: tableStartYear, end: y - 1
    };

    onStateChanged.call(this, null, {
        self: this,
        action: "printYear",
        printedDay: this.printedDay
    });
    setDisplay.call(this);

    dotDate = null;
    nYear = null;
    itemStyles = null;
    i = null;
    k = null;
    y = null;
    tableStartYear = null;
    frameWidth = null;
    frameHeight = null;
    data = null;
};
var onclick = function onclick(e, mode, target, value) {
    var _this5 = this;

    var removed = void 0,
        dt = void 0,
        selectable = void 0;

    mode = mode || "date";
    target = _AX6Util2.default.findParentNode(e.target, function (target) {
        if (target.getAttribute("data-calendar-item-" + mode)) {
            return true;
        }
    });
    if (target) {
        value = target.getAttribute("data-calendar-item-" + mode);

        dt = _AX6Util2.default.date(value, { "return": this.config.dateFormat });
        selectable = true;
        this.selectableCount = this.config.multipleSelect ? _AX6Util2.default.isNumber(this.config.multipleSelect) ? this.config.multipleSelect : 2 : 1;

        if (this.config.selectable) {
            if (!this.selectableMap[dt]) selectable = false;
        }

        if (mode == "date") {
            if (selectable) {

                if (this.selection.length >= this.selectableCount) {
                    removed = this.selection.splice(0, this.selection.length - (this.selectableCount - 1));
                    removed.forEach(function (d) {
                        _this5.$["body"].find('[data-calendar-item-date="' + _AX6Util2.default.date(d, { "return": _this5.config.dateFormat }) + '"]').removeClass("selected-day");
                    });
                }

                (0, _jqmin2.default)(target).addClass("selected-day");
                this.selection.push(value);

                if (this.onClick) {
                    this.onClick.call({
                        self: this, date: value, target: this.target, dateElement: target
                    });
                }
            }
        } else if (mode == "month") {
            if (this.config.selectMode == "month") {
                if (selectable) {
                    if (this.selection.length >= this.selectableCount) {
                        removed = this.selection.splice(0, this.selection.length - (this.selectableCount - 1));
                        removed.forEach(function (d) {
                            _this5.$["body"].find('[data-calendar-item-month="' + _AX6Util2.default.date(d, { "return": 'yyyy-MM-dd' }) + '"]').removeClass("selected-month");
                        });
                    }

                    (0, _jqmin2.default)(target).addClass("selected-month");
                    this.selection.push(value);

                    if (this.onClick) {
                        this.onClick.call({
                            self: this, date: value, target: this.target, dateElement: target
                        });
                    }
                }
            } else {
                this.changeMode("day", value);
            }
        } else if (mode == "year") {
            if (this.config.selectMode == "year") {
                if (selectable) {
                    if (this.selection.length >= this.selectableCount) {
                        removed = this.selection.splice(0, this.selection.length - (this.selectableCount - 1));
                        removed.forEach(function (d) {
                            _this5.$["body"].find('[data-calendar-item-year="' + _AX6Util2.default.date(d, { "return": 'yyyy-MM-dd' }) + '"]').removeClass("selected-year");
                        });
                    }

                    (0, _jqmin2.default)(target).addClass("selected-year");
                    this.selection.push(value);

                    if (this.onClick) {
                        this.onClick.call({
                            self: this, date: value, target: this.target, dateElement: target
                        });
                    }
                }
            } else {
                this.changeMode("month", value);
            }
        }
    }

    mode = null;
    target = null;
    value = null;
    removed = null;
    dt = null;
    selectable = null;
};
var move = function move(e, target, value) {
    target = _AX6Util2.default.findParentNode(e.target, function (target) {
        if (target.getAttribute("data-calendar-move")) {
            return true;
        }
    });
    if (target) {
        value = target.getAttribute("data-calendar-move");
        if (this.config.mode == "day" || this.config.mode == "d") {
            if (value == "left") {
                this.config.displayDate = _AX6Util2.default.date(this.config.displayDate, { add: { m: -1 } });
            } else {
                this.config.displayDate = _AX6Util2.default.date(this.config.displayDate, { add: { m: 1 } });
            }
            printDay.call(this, this.config.displayDate);
        } else if (this.config.mode == "month" || this.config.mode == "m") {
            if (value == "left") {
                this.config.displayDate = _AX6Util2.default.date(this.config.displayDate, { add: { y: -1 } });
            } else {
                this.config.displayDate = _AX6Util2.default.date(this.config.displayDate, { add: { y: 1 } });
            }
            printMonth.call(this, this.config.displayDate);
        } else if (this.config.mode == "year" || this.config.mode == "y") {
            if (value == "left") {
                this.config.displayDate = _AX6Util2.default.date(this.config.displayDate, { add: { y: -10 } });
            } else {
                this.config.displayDate = _AX6Util2.default.date(this.config.displayDate, { add: { y: 10 } });
            }
            printYear.call(this, this.config.displayDate);
        }
    }

    target = null;
    value = null;
};
var applyMarkerMap = function applyMarkerMap() {
    setTimeout(function () {
        if (this.config.mode === "day" || this.config.mode === "d") {
            for (var k in this.markerMap) {
                this.$["body"].find('[data-calendar-item-date="' + k + '"]').addClass(this.markerMap[k].theme || this.config.defaultMarkerTheme);
            }
        }
    }.bind(this));
};
var applySelectionMap = function applySelectionMap() {
    setTimeout(function () {
        for (var k in this.selectionMap) {
            this.$["body"].find('[data-calendar-item-date="' + k + '"]').addClass("selected-day");
        }
    }.bind(this));
};
var applyPeriodMap = function applyPeriodMap() {
    setTimeout(function () {
        if (this.config.mode === "day" || this.config.mode === "d") {
            for (var k in this.periodMap) {
                if (this.periodMap[k].label) {
                    this.$["body"].find('[data-calendar-item-date="' + k + '"]').find(".addon-footer").html(this.periodMap[k].label);
                }
                this.$["body"].find('[data-calendar-item-date="' + k + '"]').addClass(this.periodMap[k].theme);
            }
        }
    }.bind(this));
};
var clearPeriodMap = function clearPeriodMap() {
    if (this.config.mode === "day" || this.config.mode === "d") {
        for (var k in this.periodMap) {
            this.$["body"].find('[data-calendar-item-date="' + k + '"]').find(".addon-footer").empty();
            this.$["body"].find('[data-calendar-item-date="' + k + '"]').removeClass(this.periodMap[k].theme);
        }
    }
};

/**
 * @class
 */

var AX6UICalendar = function (_AX6UICore) {
    _inherits(AX6UICalendar, _AX6UICore);

    /**
     * @constructor
     * @param {object} config
     * @param {string} [config.theme = 'default']
     * @param {!(object|string)} [config.target]
     * @param {number} [config.animateTime = 100]
     * @param {function} [config.onStateChanged]
     * @param {function} [config.onClick]
     * @param [config.content]
     * @example
     * ```js
     * var myCalendar = new AX6UICalendar();
     * ```
     */
    function AX6UICalendar(config) {
        _classCallCheck(this, AX6UICalendar);

        var _this6 = _possibleConstructorReturn(this, (AX6UICalendar.__proto__ || Object.getPrototypeOf(AX6UICalendar)).call(this));

        _this6.config = {
            clickEventName: "click",
            theme: 'default',
            startOfWeek: 0,
            mode: 'day', // day|month|year,
            dateFormat: 'yyyy-MM-dd',
            displayDate: new Date(),
            animateTime: 100,
            dimensions: {
                controlHeight: '40',
                controlButtonWidth: '40',
                colHeadHeight: '30',
                itemPadding: 2
            },
            lang: {
                yearHeading: "Choose the year",
                monthHeading: "Choose the month",
                yearTmpl: "%s",
                months: _AX6Info2.default.months || ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
                dayTmpl: "%s"
            },
            multipleSelect: false,
            selectMode: 'day',
            defaultMarkerTheme: 'holiday',
            defaultPeriodTheme: 'period'
        };
        _jqmin2.default.extend(true, _this6.config, config);

        // 멤버 변수 초기화
        _this6.$target = null;
        _this6.selection = [];
        _this6.selectionMap = {};
        _this6.selectableMap = {};
        _this6.markerMap = {};
        _this6.printedDay = {
            start: "", end: ""
        };
        _this6.selectableCount = 1;

        _this6.init();
        return _this6;
    }

    /**
     * @method AX6UICalendar.init
     * @example
     * ```js
     * myCalendar.init();
     * ```
     */


    _createClass(AX6UICalendar, [{
        key: "init",
        value: function init() {
            var _this7 = this;

            this.onStateChanged = this.config.onStateChanged;
            delete this.config.onStateChanged;
            this.onClick = this.config.onClick;
            delete this.config.onClick;

            if (!this.config.target) {
                console.log(_AX6Info2.default.getError("ax6calendar", "401", "setConfig"));
            }
            this.$target = (0, _jqmin2.default)(this.config.target);
            this.config.displayDate = _AX6Util2.default.date(this.config.displayDate);

            this.$target.html(getFrame.call(this));

            // 부속수집
            this.$ = {
                "root": this.$target.find('[data-calendar-els="root"]'),
                "control": this.$target.find('[data-calendar-els="control"]'),
                "control-display": this.$target.find('[data-calendar-els="control-display"]'),
                "body": this.$target.find('[data-calendar-els="body"]')
            };

            if (this.config.control) {
                this.$["root"].on(this.config.clickEventName, '[data-calendar-move]', function (e) {
                    move.call(_this7, e || window.event);
                });
            }

            // collect selectableMap
            if (this.config.selection) {
                this.setSelection(this.config.selection, false);
            }
            // collect selectableMap
            if (this.config.selectable) {
                this.setSelectable(this.config.selectable, false);
            }
            // collect markerMap
            if (this.config.marker) {
                this.setMarker(this.config.marker, false);
            }

            setTimeout(function () {
                if (this.config.mode === "day" || this.config.mode === "d") {
                    printDay.call(this, this.config.displayDate);
                } else if (this.config.mode === "month" || this.config.mode === "m") {
                    printMonth.call(this, this.config.displayDate);
                } else if (this.config.mode === "year" || this.config.mode === "y") {
                    printYear.call(this, this.config.displayDate);
                }
            }.bind(this));

            // init 호출 여부
            this.initOnce();
        }

        /**
         * @method AX6UICalendar.initOnce
         * @example
         * ```js
         * myCalendar.initOnce();
         * ```
         */

    }, {
        key: "initOnce",
        value: function initOnce() {
            if (this.initialized) return this;
            this.initialized = true;
        }

        /**
         * Outputs to the screen in the output mode defined in the Calendar. If you pass an argument, you can change the output mode and output reference date.
         * 캘린더의 모드를 변경합니다.
         * @method AX6UICalendar.changeMode
         * @param {string} mode - day, d, month, m , year, y
         * @param {(Date|string)} [changeDate]
         * @return {AX6UICalendar}
         * @example
         * ```js
         * myCalendar.changeMode("y");
         * myCalendar.changeMode("year");
         * myCalendar.changeMode("month");
         * myCalendar.changeMode("m");
         * myCalendar.changeMode("day");
         * myCalendar.changeMode("d");
         * ```
         */

    }, {
        key: "changeMode",
        value: function changeMode(mode, changeDate) {
            var _this8 = this;

            if (typeof changeDate != "undefined") this.config.displayDate = changeDate;
            if (mode) this.config.mode = mode;

            this.$["body"].removeClass("fadein").addClass("fadeout");

            setTimeout(function () {
                if (_this8.config.mode == "day" || _this8.config.mode == "d") {
                    printDay.call(_this8, _this8.config.displayDate);
                } else if (_this8.config.mode == "month" || _this8.config.mode == "m") {
                    printMonth.call(_this8, _this8.config.displayDate);
                } else if (_this8.config.mode == "year" || _this8.config.mode == "y") {
                    printYear.call(_this8, _this8.config.displayDate);
                }
                _this8.$["body"].removeClass("fadeout").addClass("fadein");
            }, this.config.animateTime);

            return this;
        }

        /**
         * Changes to state a date is selected, which is included in the selection.
         * 캘린더에 해당일자를 선택된 상태로 설정합니다.
         * @method AX6UICalendar.setSelection
         * @param {Array} selection
         * @param {boolean} [isPrint]
         * @return {AX6UICalendar}
         * @example
         * ```js
         * myCalendar.setSelection([new Date()]);
         * ```
         */

    }, {
        key: "setSelection",
        value: function setSelection(selection, isPrint) {
            this.selectionMap = {};
            var result = {};
            var processor = {
                'arr': function arr(v, map, count) {
                    var _this9 = this;

                    map = {};
                    if (!_AX6Util2.default.isArray(v)) return map;
                    this.selection = v = v.splice(0, count);
                    v.forEach(function (n) {
                        if (_AX6Util2.default.isDate(n)) n = _AX6Util2.default.date(n, { 'return': _this9.config.dateFormat });
                        map[n] = true;
                    });
                    return map;
                }
            };

            this.selectableCount = this.config.multipleSelect ? _AX6Util2.default.isNumber(this.config.multipleSelect) ? this.config.multipleSelect : 2 : 1;

            if (this.config.selection = selection) {
                if (_AX6Util2.default.isArray(selection)) {
                    result = processor.arr.call(this, selection, {}, this.selectableCount);
                } else {
                    return this;
                }
            }

            this.selectionMap = _jqmin2.default.extend({}, result);
            // 변경내용 적용하여 출력

            if (isPrint !== false) applySelectionMap.call(this);

            result = null;

            return this;
        }

        /**
         * 캘린더에서 선택된 일자를 반환합니다.
         * @method AX6UICalendar.getSelection
         * @return {Array}
         * @example
         * ```js
         * myCalendar.getSelection();
         * ```
         */

    }, {
        key: "getSelection",
        value: function getSelection() {
            return this.selection;
        }

        /**
         * Set the date / year / month that can be selected from the Calendar. selectable is, Array and Object({from: '', to: ''}) is made up of.
         * 캘린더에 해당일자를 선택할 수 있는 상태로 설정합니다.
         * @method AX6UICalendar.setSelectable
         * @param {Array} selectable
         * @param {boolean} [isPrint]
         * @return {AX6UICalendar}
         * @example
         * ```js
         * myCalendar.setSelectable(['2016-01-01', ...]);
         * myCalendar.setSelectable([new Date(), ...]);
         * myCalendar.setSelectable({ range: [{from: '2016-01-01', to: '2016-01-10'}] });
         * myCalendar.setSelectable({ range: [{from: new Date(), to: new Date()}] });
         * myCalendar.setSelectable({ '2016-01-01': true, '2016-01-02': true });
         * ```
         */

    }, {
        key: "setSelectable",
        value: function setSelectable(selectable, isPrint) {
            this.selectableMap = {};
            var key = void 0,
                result = {};
            var processor = {
                'arr': function arr(v, map) {
                    var _this10 = this;

                    map = {};
                    if (!_AX6Util2.default.isArray(v)) return map;
                    v.forEach(function (n) {
                        if (_AX6Util2.default.isDate(n)) n = _AX6Util2.default.date(n, { 'return': _this10.config.dateFormat });
                        map[n] = true;
                    });
                    return map;
                },
                'obj': function obj(v, map) {
                    map = {};
                    if (_AX6Util2.default.isArray(v)) return map;
                    if (v.range) return map;
                    for (var k in v) {
                        map[k] = v[k];
                    }
                    return map;
                },
                'range': function range(v, map) {
                    var _this11 = this;

                    map = {};
                    if (_AX6Util2.default.isArray(v)) return map;
                    if (!v.range) return map;

                    v.range.forEach(function (n) {
                        if (_AX6Util2.default.isDateFormat(n.from) && _AX6Util2.default.isDateFormat(n.to)) {
                            for (var d = _AX6Util2.default.date(n.from); d <= _AX6Util2.default.date(n.to); d.setDate(d.getDate() + 1)) {
                                map[_AX6Util2.default.date(d, { "return": _this11.config.dateFormat })] = true;
                            }
                        } else {
                            for (var i = n.from; i <= n.to; i++) {
                                map[i] = true;
                            }
                        }
                    });

                    return map;
                }
            };

            if (this.config.selectable = selectable) {
                if (_AX6Util2.default.isArray(selectable)) {
                    result = processor.arr.call(this, selectable);
                } else {
                    for (key in processor) {
                        if (selectable[key]) {
                            result = processor[key].call(this, selectable);
                            break;
                        }
                    }
                    if (Object.keys(result).length === 0) {
                        result = processor.obj.call(this, selectable);
                    }
                }
            }

            this.selectableMap = result;
            // 변경내용 적용하여 출력
            if (isPrint !== false) this.changeMode();

            return this;
        }

        /**
         * 캘린더에 휴일을 표시합니다.
         * @method AX6UICalendar.marker
         * @param {Object} marker
         * @param {boolean} [isApply]
         * @return {AX6UICalendar}
         * @example
         * ```js
         * myCalendar.setMarker({
         * '2016-02-07': {theme: 'holiday', label: '설날'},
         * '2016-02-08': {theme: 'holiday', label: '설날'},
         * '2016-02-09': {theme: 'holiday', label: '설날'},
         * '2016-02-10': {theme: 'holiday', label: '대체휴일'}
         *  });
         * ```
         */

    }, {
        key: "setMarker",
        value: function setMarker(marker, isApply) {
            this.markerMap = {};
            var key = void 0,
                result = {};
            var processor = {
                'obj': function obj(v, map) {
                    map = {};
                    if (_AX6Util2.default.isArray(v)) return map;
                    if (v.range) return map;
                    for (var k in v) {
                        map[k] = v[k];
                    }

                    v = null;
                    return map;
                },
                'range': function range(v, map) {
                    var _this12 = this;

                    map = {};
                    if (_AX6Util2.default.isArray(v)) return map;
                    if (!v.range) return map;

                    v.range.forEach(function (n) {
                        if (_AX6Util2.default.isDateFormat(n.from) && _AX6Util2.default.isDateFormat(n.to)) {
                            for (var d = _AX6Util2.default.date(n.from); d <= _AX6Util2.default.date(n.to); d.setDate(d.getDate() + 1)) {
                                map[_AX6Util2.default.date(d, { "return": _this12.config.dateFormat })] = { theme: n.theme, label: n.label };
                            }
                        } else {
                            for (var i = n.from; i <= n.to; i++) {
                                map[i] = { theme: n.theme, label: n.label };
                            }
                        }
                    });

                    v = null;
                    return map;
                }
            };

            if (this.config.marker = marker) {
                for (key in processor) {
                    if (marker[key]) {
                        result = processor[key].call(this, marker);
                        break;
                    }
                }
                if (Object.keys(result).length === 0) {
                    result = processor.obj.call(this, marker);
                }
            }

            this.markerMap = result;
            // 변경내용 적용하여 출력
            if (isApply !== false) applyMarkerMap.call(this);
            return this;
        }

        /**
         * @method AX6UICalendar.setPeriod
         * @param {Object} period
         * @param {boolean} [isApply]
         * @return {AX6UICalendar}
         * @example
         * ```js
         * myCalendar.setPeriod({
         *  range: [
         *      {from: '2016-07-05', to: '2016-07-09', fromLabel: '시작', toLabel: '종료'},
         *      {from: '2016-07-11', to: '2016-07-15', fromLabel: '시작', toLabel: '종료'}
         *  ]
         * });
         * ```
         */

    }, {
        key: "setPeriod",
        value: function setPeriod(period, isApply) {
            var key = void 0,
                result = {};
            var processor = {
                'range': function range(v, map) {
                    var _this13 = this;

                    map = {};
                    if (_AX6Util2.default.isArray(v)) return map;
                    if (!v.range) return map;

                    v.range.forEach(function (n) {
                        if (_AX6Util2.default.isDateFormat(n.from) && _AX6Util2.default.isDateFormat(n.to)) {
                            for (var d = new Date(_AX6Util2.default.date(n.from)); d <= _AX6Util2.default.date(n.to); d.setDate(d.getDate() + 1)) {
                                if (d.getTime() == _AX6Util2.default.date(n.from).getTime()) {
                                    map[_AX6Util2.default.date(d, { "return": _this13.config.dateFormat })] = {
                                        theme: n.theme || _this13.config.defaultPeriodTheme,
                                        label: n.fromLabel
                                    };
                                } else if (d.getTime() == _AX6Util2.default.date(n.to).getTime()) {
                                    map[_AX6Util2.default.date(d, { "return": _this13.config.dateFormat })] = {
                                        theme: n.theme || _this13.config.defaultPeriodTheme,
                                        label: n.toLabel
                                    };
                                } else {
                                    map[_AX6Util2.default.date(d, { "return": _this13.config.dateFormat })] = { theme: n.theme || _this13.config.defaultPeriodTheme };
                                }
                            }
                        }
                    });

                    v = null;
                    return map;
                }
            };

            // 변경내용 적용하여 출력
            if (isApply !== false) {
                clearPeriodMap.call(this);
            }

            if (this.config.period = period) {
                result = processor.range.call(this, period);
            }

            this.periodMap = result;

            // 변경내용 적용하여 출력
            if (isApply !== false) {
                applyPeriodMap.call(this);
            }
            return this;
        }
    }]);

    return AX6UICalendar;
}(_AX6UICore3.default);

exports.default = AX6UICalendar;