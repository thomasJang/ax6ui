import jQuery from "jqmin";
import AX6UICore from "./AX6UICore";
import info from "./AX6Info";
import U from "./AX6Util";


const onStateChanged = function (opts, that) {
    if (opts && opts.onStateChanged) {
        opts.onStateChanged.call(that, that);
    }
    else if (this.onStateChanged) {
        this.onStateChanged.call(that, that);
    }

    that = null;
};
const getFrame = function () {
    var
        data = jQuery.extend(true, {}, cfg, {
            controlCSS: {},
            controlButtonCSS: {}
        });

    data.controlButtonCSS["height"] = data.controlCSS["height"] = U.cssNumber(this.config.dimensions.controlHeight);
    data.controlButtonCSS["line-height"] = data.controlCSS["line-height"] = U.cssNumber(this.config.dimensions.controlHeight);
    data.controlButtonCSS["width"] = U.cssNumber(this.config.dimensions.controlHeight);

    data.controlCSS = U.css(data.controlCSS);
    data.controlButtonCSS = U.css(data.controlButtonCSS);

    try {
        return CALENDAR.tmpl.get.call(this, "frameTmpl", data);
    }
    finally {
        data = null;
    }
};
const setDisplay = function () {
    var
        myDate = U.date(this.config.displayDate),
        yy = "",
        mm = "",
        yy1, yy2;

    if (this.config.control) {
        if (this.config.mode == "day" || this.config.mode == "d") {
            yy = (this.config.control.yearTmpl) ? this.config.control.yearTmpl.replace('%s', myDate.getFullYear()) : myDate.getFullYear();
            mm = (this.config.control.monthTmpl) ? this.config.control.monthTmpl.replace('%s', this.config.lang.months[myDate.getMonth()]) : this.config.lang.months[myDate.getMonth()];

            this.$["control-display"].html((function () {
                if (this.config.control.yearFirst) {
                    return '<span data-calendar-display="year">' + yy + '</span>' +
                        '<span data-calendar-display="month">' + mm + '</span>';
                }
                else {
                    return '<span data-calendar-display="month">' + mm + '</span>' +
                        '<span data-calendar-display="year">' + yy + '</span>';
                }

            })());
        }
        else if (this.config.mode == "month" || this.config.mode == "m") {
            yy = (this.config.control.yearTmpl) ? this.config.control.yearTmpl.replace('%s', myDate.getFullYear()) : myDate.getFullYear();
            this.$["control-display"].html('<span data-calendar-display="year">' + yy + '</span>');
        }
        else if (this.config.mode == "year" || this.config.mode == "y") {
            yy1 = (this.config.control.yearTmpl) ? this.config.control.yearTmpl.replace('%s', myDate.getFullYear() - 10) : myDate.getFullYear() - 10;
            yy2 = (this.config.control.yearTmpl) ? this.config.control.yearTmpl.replace('%s', Number(myDate.getFullYear()) + 9) : Number(myDate.getFullYear()) + 9;
            this.$["control-display"].html(yy1 + ' ~ ' + yy2);
        }

        this.$["control-display"].find('[data-calendar-display]').on(this.config.clickEventName, (function (e) {
            var target = U.findParentNode(e.target, function (target) {
                if (target.getAttribute("data-calendar-display")) {
                    return true;
                }
            }), mode;
            if (target) {
                mode = target.getAttribute("data-calendar-display");
                this.changeMode(mode);
            }
            target = null;
            mode = null;
        }).bind(this));
    }

    myDate = null;
    yy = null;
    mm = null;
    yy1 = null;
    yy2 = null;
    return this;
};
const printDay = function (nowDate) {
    var
        dotDate = U.date(nowDate),
        monthStratDate = new Date(dotDate.getFullYear(), dotDate.getMonth(), 1, 12),
        _today = this.config.displayDate,
        tableStartDate = (function () {
            var day = monthStratDate.getDay();
            if (day == 0) day = 7;
            day -= this.config.startOfWeek;

            try {
                return U.date(monthStratDate, {add: {d: -day}});
            }
            finally {
                day = null;
            }
        })(),
        loopDate,
        thisMonth = dotDate.getMonth(),
        itemStyles = {},
        i,
        k, _k,
        frameWidth = this.$["body"].width(),
        frameHeight = Math.floor(frameWidth * (6 / 7)), // 1week = 7days, 1month = 6weeks
        data,
        tmpl;

    if (this.config.dimensions.height) {
        frameHeight = U.number(this.config.dimensions.height) - U.number(this.config.dimensions.colHeadHeight);
    }

    itemStyles['height'] = Math.floor(frameHeight / 6) - U.number(this.config.dimensions.itemPadding) * 2 + 'px';
    itemStyles['line-height'] = itemStyles['height'];
    itemStyles['padding'] = U.cssNumber(this.config.dimensions.itemPadding);

    data = {
        weekNames: [].concat(ax5.info.weekNames),
        list: []
    };

    if (this.config.startOfWeek) {
        data.weekNames = data.weekNames.concat(data.weekNames.slice(0, this.config.startOfWeek)).splice(this.config.startOfWeek);
    }

    data.weekNames.forEach(function (n) {
        n.colHeadHeight = U.cssNumber(this.config.dimensions.colHeadHeight);
    });

    loopDate = tableStartDate;
    i = 0;
    while (i < 6) {
        k = 0;
        while (k < 7) {
            _k = (7 + (k - this.config.startOfWeek)) % 7;
            var
                thisDate = '' + U.date(loopDate, {"return": this.config.dateFormat}),
                _date = {
                    'row': i,
                    'col': k,
                    isStartOfWeek: (k == 0),
                    thisDate: '' + thisDate,
                    thisDataLabel: this.config.lang.dayTmpl.replace('%s', loopDate.getDate()),
                    itemStyles: U.css(itemStyles),
                    addClass: (function () {

                        var classNames = "";

                        if (this.config.selectable) {
                            if (self.selectableMap[thisDate]) {
                                classNames += ( loopDate.getMonth() == thisMonth ) ? " live" : "";
                            }
                            else {
                                classNames += " disable";
                            }
                        }
                        else {
                            if (loopDate.getMonth() == thisMonth) {
                                if (thisDate == U.date(_today, {"return": "yyyyMMdd"})) {
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
                    })()
                    + ' '
                    + (function () {
                        return (self.markerMap[thisDate]) ? self.markerMap[thisDate].theme || this.config.defaultMarkerTheme : '';
                    })()
                    + ' '
                    + (function () {
                        return (self.selectionMap[thisDate]) ? "selected-day" : '';
                    })()
                };
            data.list.push(_date);

            k++;
            loopDate = U.date(loopDate, {add: {d: 1}});

            thisDate = null;
            _date = null;
        }
        i++;
    }
    tmpl = CALENDAR.tmpl.get.call(this, "dayTmpl", data);
    this.$["body"].html(tmpl);
    this.$["body"].find('[data-calendar-item-date]').on(this.config.clickEventName, function (e) {
        e = e || window.event;
        onclick.call(self, e, 'date');
        U.stopEvent(e);
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
    tmpl = null;
};
const printMonth = function (nowDate) {
    var
        dotDate = U.date(nowDate),
        nMonth = dotDate.getMonth(),
        itemStyles = {},
        i,
        k,
        m,
        tableStartMonth,
        frameWidth = this.$["body"].width(),
        frameHeight = Math.floor(frameWidth * (6 / 7)),
        data,
        tmpl;

    if (this.config.dimensions.height) {
        frameHeight = U.number(this.config.dimensions.height) - U.number(this.config.dimensions.colHeadHeight);
    }

    itemStyles['height'] = Math.floor(frameHeight / 4) - U.number(this.config.dimensions.itemPadding) * 2 + 'px';
    itemStyles['line-height'] = itemStyles['height'];
    itemStyles['padding'] = U.cssNumber(this.config.dimensions.itemPadding);

    data = {
        colHeadHeight: U.cssNumber(this.config.dimensions.colHeadHeight),
        colHeadLabel: this.config.lang.monthHeading,
        list: []
    };

    tableStartMonth = 0;
    m = 0;
    i = 0;
    while (i < 4) {
        k = 0;
        while (k < 3) {
            var
                _month = {
                    row: i,
                    col: k,
                    isStartOfRow: (k == 0),
                    thisMonth: dotDate.getFullYear() + '-' + U.setDigit(m + 1, 2) + '-' + U.setDigit(dotDate.getDate(), 2),
                    thisMonthLabel: this.config.lang.months[m],
                    itemStyles: U.css(itemStyles),
                    addClass: (function () {
                        if (this.config.selectable) {
                            return (self.selectableMap[m]) ? 'live' : 'disable';
                        }
                        else {
                            return 'live';
                        }
                    })()
                    + ' '
                    + (function () {
                        return ( m == nMonth ) ? "focus" : "";
                    })()
                    + ' '
                    + (function () {
                        return (self.markerMap[m]) ? self.markerMap[m].theme || this.config.defaultMarkerTheme : '';
                    })()
                };
            data.list.push(_month);
            m++;
            k++;
            _month = null;
        }
        i++;
    }
    tmpl = CALENDAR.tmpl.get.call(this, "monthTmpl", data);
    this.$["body"].html(tmpl);
    this.$["body"].find('[data-calendar-item-month]').on(this.config.clickEventName, function (e) {
        e = e || window.event;
        onclick.call(self, e, 'month');
        U.stopEvent(e);
    });

    this.printedDay = {
        start: dotDate.getFullYear() + '-' + U.setDigit(tableStartMonth + 1, 2),
        end: dotDate.getFullYear() + '-' + U.setDigit(m, 2)
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
    tmpl = null;
};
const printYear = function (nowDate) {
    var
        dotDate = U.date(nowDate),
        nYear = dotDate.getFullYear(),
        itemStyles = {},
        i,
        k,
        y,
        tableStartYear,
        frameWidth = this.$["body"].width(),
        frameHeight = Math.floor(frameWidth * (6 / 7)),
        data,
        tmpl;

    if (this.config.dimensions.height) {
        frameHeight = U.number(this.config.dimensions.height) - U.number(this.config.dimensions.colHeadHeight);
    }

    itemStyles['height'] = Math.floor(frameHeight / 5) - U.number(this.config.dimensions.itemPadding) * 2 + 'px';
    itemStyles['line-height'] = itemStyles['height'];
    itemStyles['padding'] = U.cssNumber(this.config.dimensions.itemPadding);

    data = {
        colHeadHeight: U.cssNumber(this.config.dimensions.colHeadHeight),
        colHeadLabel: this.config.lang.yearHeading,
        list: []
    };

    tableStartYear = nYear - 10;
    y = nYear - 10;
    i = 0;
    while (i < 5) {
        k = 0;
        while (k < 4) {
            var
                _year = {
                    row: i,
                    col: k,
                    isStartOfRow: (k == 0),
                    thisYear: y + '-' + U.setDigit(dotDate.getMonth() + 1, 2) + '-' + U.setDigit(dotDate.getDate(), 2),
                    thisYearLabel: this.config.lang.yearTmpl.replace('%s', (y)),
                    itemStyles: U.css(itemStyles),
                    addClass: (function () {
                        if (this.config.selectable) {
                            return (self.selectableMap[y]) ? 'live' : 'disable';
                        }
                        else {
                            return 'live';
                        }
                    })()
                    + ' '
                    + (function () {
                        return ( y == nYear ) ? "focus" : "";
                    })()
                    + ' '
                    + (function () {
                        return (self.selectableMap[y]) ? self.selectableMap[y].theme || this.config.defaultMarkerTheme : '';
                    })()
                };
            data.list.push(_year);
            y++;
            k++;
            _year = null;
        }
        i++;
    }
    tmpl = CALENDAR.tmpl.get.call(this, "yearTmpl", data);
    this.$["body"].html(tmpl);
    this.$["body"].find('[data-calendar-item-year]').on(this.config.clickEventName, function (e) {
        e = (e || window.event);
        onclick.call(this, e, 'year');
        U.stopEvent(e);
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
    tmpl = null;
};
const onclick = function (e, mode, target, value) {
    var
        removed,
        dt,
        selectable;

    mode = mode || "date";
    target = U.findParentNode(e.target, function (target) {
        if (target.getAttribute("data-calendar-item-" + mode)) {
            return true;
        }
    });
    if (target) {
        value = target.getAttribute("data-calendar-item-" + mode);

        dt = U.date(value, {"return": this.config.dateFormat});
        selectable = true;
        selectableCount = (this.config.multipleSelect) ? (U.isNumber(this.config.multipleSelect)) ? this.config.multipleSelect : 2 : 1;

        if (this.config.selectable) {
            if (!self.selectableMap[dt]) selectable = false;
        }

        if (mode == "date") {
            if (selectable) {

                if (self.selection.length >= selectableCount) {
                    removed = self.selection.splice(0, self.selection.length - (selectableCount - 1));
                    removed.forEach(function (d) {
                        self.$["body"].find('[data-calendar-item-date="' + U.date(d, {"return": this.config.dateFormat}) + '"]').removeClass("selected-day");
                    });
                }

                jQuery(target).addClass("selected-day");
                self.selection.push(value);

                if (self.onClick) {
                    self.onClick.call({
                        self: this, date: value, target: this.target, dateElement: target
                    });
                }
            }
        }
        else if (mode == "month") {
            if (this.config.selectMode == "month") {
                if (selectable) {
                    if (self.selection.length >= selectableCount) {
                        removed = self.selection.splice(0, self.selection.length - (selectableCount - 1));
                        removed.forEach(function (d) {
                            self.$["body"].find('[data-calendar-item-month="' + U.date(d, {"return": 'yyyy-MM-dd'}) + '"]').removeClass("selected-month");
                        });
                    }

                    jQuery(target).addClass("selected-month");
                    self.selection.push(value);

                    if (self.onClick) {
                        self.onClick.call({
                            self: this, date: value, target: this.target, dateElement: target
                        });
                    }
                }
            }
            else {
                self.changeMode("day", value);
            }
        }
        else if (mode == "year") {
            if (this.config.selectMode == "year") {
                if (selectable) {
                    if (self.selection.length >= selectableCount) {
                        removed = self.selection.splice(0, self.selection.length - (selectableCount - 1));
                        removed.forEach(function (d) {
                            self.$["body"].find('[data-calendar-item-year="' + U.date(d, {"return": 'yyyy-MM-dd'}) + '"]').removeClass("selected-year");
                        });
                    }

                    jQuery(target).addClass("selected-year");
                    self.selection.push(value);

                    if (self.onClick) {
                        self.onClick.call({
                            self: this, date: value, target: this.target, dateElement: target
                        });
                    }
                }
            }
            else {
                self.changeMode("month", value);
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
const move = function (e, target, value) {
    target = U.findParentNode(e.target, function (target) {
        if (target.getAttribute("data-calendar-move")) {
            return true;
        }
    });
    if (target) {
        value = target.getAttribute("data-calendar-move");
        if (this.config.mode == "day" || this.config.mode == "d") {
            if (value == "left") {
                this.config.displayDate = U.date(this.config.displayDate, {add: {m: -1}});
            }
            else {
                this.config.displayDate = U.date(this.config.displayDate, {add: {m: 1}});
            }
            printDay.call(this, this.config.displayDate);
        }
        else if (this.config.mode == "month" || this.config.mode == "m") {
            if (value == "left") {
                this.config.displayDate = U.date(this.config.displayDate, {add: {y: -1}});
            }
            else {
                this.config.displayDate = U.date(this.config.displayDate, {add: {y: 1}});
            }
            printMonth.call(this, this.config.displayDate);
        }
        else if (this.config.mode == "year" || this.config.mode == "y") {
            if (value == "left") {
                this.config.displayDate = U.date(this.config.displayDate, {add: {y: -10}});
            }
            else {
                this.config.displayDate = U.date(this.config.displayDate, {add: {y: 10}});
            }
            printYear.call(this, this.config.displayDate);
        }
    }

    target = null;
    value = null;
};
const applyMarkerMap = function () {
    setTimeout((function () {
        if (this.config.mode === "day" || this.config.mode === "d") {
            for (var k in this.markerMap) {
                this.$["body"].find('[data-calendar-item-date="' + k + '"]').addClass(this.markerMap[k].theme || this.config.defaultMarkerTheme);
            }
        }
    }).bind(this));
};
const applySelectionMap = function () {
    setTimeout((function () {
        for (var k in this.selectionMap) {
            this.$["body"].find('[data-calendar-item-date="' + k + '"]').addClass("selected-day");
        }
    }).bind(this));
};
const applyPeriodMap = function () {
    setTimeout((function () {
        if (this.config.mode === "day" || this.config.mode === "d") {
            for (var k in this.periodMap) {
                if (this.periodMap[k].label) {
                    this.$["body"].find('[data-calendar-item-date="' + k + '"]').find(".addon-footer").html(this.periodMap[k].label);
                }
                this.$["body"].find('[data-calendar-item-date="' + k + '"]').addClass(this.periodMap[k].theme);
            }
        }
    }).bind(this));
};
const clearPeriodMap = function () {
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
class AX6UICalendar extends AX6UICore {
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
    constructor(config) {
        super();

        this.config = {
            clickEventName: "click",
            theme: 'default',
            startOfWeek: 0,
            mode: 'day', // day|month|year,
            dateFormat: 'yyyy-MM-dd',
            displayDate: (new Date()),
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
                months: info.months || ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
                dayTmpl: "%s"
            },
            multipleSelect: false,
            selectMode: 'day',
            defaultMarkerTheme: 'holiday',
            defaultPeriodTheme: 'period'
        };
        jQuery.extend(true, this.config, config);

        // 멤버 변수 초기화
        this.$target = null;
        this.selection = [];
        this.selectionMap = {};
        this.selectableMap = {};
        this.markerMap = {};
        this.printedDay = {
            start: "", end: ""
        };
        this.selectableCount = 1;

        this.init();
    }

    /**
     * @method
     * @param config
     * @param [config.theme]
     * @param [config.target]
     * @param [config.anmateTime]
     * @param [config.onStateChanged]
     * @param [config.onClick]
     * @param [config.content]
     */
    init(){
        this.onStateChanged = this.config.onStateChanged;
        delete this.config.onStateChanged;
        this.onClick = this.config.onClick;
        delete this.config.onClick;

        if (!this.config.target) {
            console.log(info.getError("ax6calendar", "401", "setConfig"));
        }
        this.$target = jQuery(this.config.target);
        this.config.displayDate = U.date(this.config.displayDate);

        this.$target.html(getFrame.call(this));

        // 부속수집
        this.$ = {
            "root": this.$target.find('[data-calendar-els="root"]'),
            "control": this.$target.find('[data-calendar-els="control"]'),
            "control-display": this.$target.find('[data-calendar-els="control-display"]'),
            "body": this.$target.find('[data-calendar-els="body"]')
        };

        if (this.config.control) {
            this.$["root"].on(this.config.clickEventName, '[data-calendar-move]', (e) => {
                move.call(this, e || window.event);
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

        setTimeout((function () {
            if (this.config.mode === "day" || this.config.mode === "d") {
                printDay.call(this, this.config.displayDate);
            }
            else if (this.config.mode === "month" || this.config.mode === "m") {
                printMonth.call(this, this.config.displayDate);
            }
            else if (this.config.mode === "year" || this.config.mode === "y") {
                printYear.call(this, this.config.displayDate);
            }
        }).bind(this));

        // init 호출 여부
        this.initOnce();
    }

    /**
     * @method
     * @return {AX6UIMask}
     */
    initOnce(){
        if(this.initialized) return this;
        this.initialized = true;
    }

    /**
     * @method
     * @param mode
     * @param changeDate
     * @return {AX6UICalendar}
     */
    changeMode(mode, changeDate) {
        if (typeof changeDate != "undefined") this.config.displayDate = changeDate;
        if (mode) this.config.mode = mode;

        this.$["body"].removeClass("fadein").addClass("fadeout");
        setTimeout((function () {
            if (this.config.mode == "day" || this.config.mode == "d") {
                printDay.call(this, this.config.displayDate);
            }
            else if (this.config.mode == "month" || this.config.mode == "m") {
                printMonth.call(this, this.config.displayDate);
            }
            else if (this.config.mode == "year" || this.config.mode == "y") {
                printYear.call(this, this.config.displayDate);
            }
            this.$["body"].removeClass("fadeout").addClass("fadein");
        }).bind(this), this.config.animateTime);

        return this;
    }

    setSelection(selection, isPrint) {
        this.selectionMap = {};
        let result = {};
        const processor = {
            'arr': function (v, map, count) {
                map = {};
                if (!U.isArray(v)) return map;
                self.selection = v = v.splice(0, count);
                v.forEach(function (n) {
                    if (U.isDate(n))
                        n = U.date(n, {'return': this.config.dateFormat});
                    map[n] = true;
                });
                return map;
            }
        };

        this.selectableCount = (this.config.multipleSelect) ? (U.isNumber(this.config.multipleSelect)) ? this.config.multipleSelect : 2 : 1;

        if (this.config.selection = selection) {
            if (U.isArray(selection)) {
                result = processor.arr(selection, {}, this.selectableCount);
            } else {
                return this;
            }
        }

        this.selectionMap = jQuery.extend({}, result);
        // 변경내용 적용하여 출력

        if (isPrint !== false) applySelectionMap.call(this);

        result = null;

        return this;
    }

    getSelection() {
        return this.selection;
    }

    setSelectable(selection, isPrint) {
        this.selectableMap = {};
        let key, result = {};
        const processor = {
            'arr': function (v, map) {
                map = {};
                if (!U.isArray(v)) return map;
                v.forEach(function (n) {
                    if (U.isDate(n))
                        n = U.date(n, {'return': this.config.dateFormat});
                    map[n] = true;
                });
                return map;
            },
            'obj': function (v, map) {
                map = {};
                if (U.isArray(v)) return map;
                if (v.range) return map;
                for (var k in v) {
                    map[k] = v[k];
                }
                return map;
            },
            'range': function (v, map) {
                map = {};
                if (U.isArray(v)) return map;
                if (!v.range) return map;

                v.range.forEach(function (n) {
                    if (U.isDateFormat(n.from) && U.isDateFormat(n.to)) {
                        for (var d = U.date(n.from); d <= U.date(n.to); d.setDate(d.getDate() + 1)) {
                            map[U.date(d, {"return": this.config.dateFormat})] = true;
                        }
                    }
                    else {
                        for (var i = n.from; i <= n.to; i++) {
                            map[i] = true;
                        }
                    }
                });

                return map;
            }
        };

        if (this.config.selectable = selectable) {
            if (U.isArray(selectable)) {
                result = processor.arr(selectable);
            }
            else {
                for (key in processor) {
                    if (selectable[key]) {
                        result = processor[key](selectable);
                        break;
                    }
                }
                if (Object.keys(result).length === 0) {
                    result = processor.obj(selectable);
                }
            }
        }

        this.selectableMap = result;
        // 변경내용 적용하여 출력
        if (isPrint !== false) this.changeMode();

        return this;
    }

    setMarker(marker, isApply) {
        this.markerMap = {};
        let key, result = {};
        const processor = {
            'obj': function (v, map) {
                map = {};
                if (U.isArray(v)) return map;
                if (v.range) return map;
                for (var k in v) {
                    map[k] = v[k];
                }

                v = null;
                return map;
            },
            'range': function (v, map) {
                map = {};
                if (U.isArray(v)) return map;
                if (!v.range) return map;

                v.range.forEach(function (n) {
                    if (U.isDateFormat(n.from) && U.isDateFormat(n.to)) {
                        for (var d = U.date(n.from); d <= U.date(n.to); d.setDate(d.getDate() + 1)) {
                            map[U.date(d, {"return": this.config.dateFormat})] = {theme: n.theme, label: n.label};
                        }
                    }
                    else {
                        for (var i = n.from; i <= n.to; i++) {
                            map[i] = {theme: n.theme, label: n.label};
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
                    result = processor[key](marker);
                    break;
                }
            }
            if (Object.keys(result).length === 0) {
                result = processor.obj(marker);
            }
        }

        this.markerMap = result;
        // 변경내용 적용하여 출력
        if (isApply !== false) applyMarkerMap.call(this);
        return this;
    }

    setPeriod(period, isApply) {
        this.periodMap = {};
        let key, result = {};
        const processor = {
            'range': function (v, map) {
                map = {};
                if (U.isArray(v)) return map;
                if (!v.range) return map;

                v.range.forEach(function (n) {
                    if (U.isDateFormat(n.from) && U.isDateFormat(n.to)) {
                        for (var d = new Date(U.date(n.from)); d <= U.date(n.to); d.setDate(d.getDate() + 1)) {
                            if (d.getTime() == U.date(n.from).getTime()) {
                                map[U.date(d, {"return": this.config.dateFormat})] = {theme: n.theme || this.config.defaultPeriodTheme, label: n.fromLabel};
                            } else if (d.getTime() == U.date(n.to).getTime()) {
                                map[U.date(d, {"return": this.config.dateFormat})] = {theme: n.theme || this.config.defaultPeriodTheme, label: n.toLabel};
                            } else {
                                map[U.date(d, {"return": this.config.dateFormat})] = {theme: n.theme || this.config.defaultPeriodTheme};
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
            result = processor.range(period);
        }

        this.periodMap = result;

        // 변경내용 적용하여 출력
        if (isApply !== false) {
            applyPeriodMap.call(this);
        }
        return this;
    }
}

export default AX6UICalendar;