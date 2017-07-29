"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jqmin = require("jqmin");

var _jqmin2 = _interopRequireDefault(_jqmin);

var _AX6Util = require("../AX6Util");

var _AX6Util2 = _interopRequireDefault(_AX6Util);

var _AX6Info = require("../AX6Info");

var _AX6Info2 = _interopRequireDefault(_AX6Info);

var _AX6UIGrid_util = require("./AX6UIGrid_util");

var _AX6UIGrid_util2 = _interopRequireDefault(_AX6UIGrid_util);

var _AX6UIGrid_header = require("./AX6UIGrid_header");

var _AX6UIGrid_header2 = _interopRequireDefault(_AX6UIGrid_header);

var _AX6UIGrid_body = require("./AX6UIGrid_body");

var _AX6UIGrid_body2 = _interopRequireDefault(_AX6UIGrid_body);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moveout_timer = new Date().getTime();

var convertScrollPosition = {
    "vertical": function vertical(css, _var) {
        var _content_height = _var._content_height - _var._panel_height,
            _scroller_height = _var._vertical_scroller_height - _var.verticalScrollBarHeight,
            top = _content_height * css.top / _scroller_height;

        if (top < 0) top = 0;else if (_content_height < top) {
            top = _content_height;
        }
        return {
            top: -top
        };
    },
    "horizontal": function horizontal(css, _var) {
        var _content_width = _var._content_width - _var._panel_width,
            _scroller_width = _var._horizontal_scroller_width - _var.horizontalScrollBarWidth,
            left = _content_width * css.left / _scroller_width;

        if (left < 0) left = 0;else if (_content_width < left) {
            left = _content_width;
        }
        return {
            left: -left
        };
    }
};

var convertScrollBarPosition = {
    "vertical": function vertical(_top, _var) {

        var self = this,
            type = "vertical",
            _content_height = _var._content_height - _var._panel_height,
            _scroller_height = _var._vertical_scroller_height - _var.verticalScrollBarHeight,
            top = _scroller_height * _top / _content_height,
            scrollPositon = void 0;

        if (-top > _scroller_height) {
            top = -_scroller_height;

            scrollPositon = convertScrollPosition[type].call(this, { top: -top }, {
                _content_width: _var._content_width,
                _content_height: _var._content_height,
                _panel_width: _var._panel_width,
                _panel_height: _var._panel_height,
                _horizontal_scroller_width: _var._horizontal_scroller_width,
                _vertical_scroller_height: _var._vertical_scroller_height,
                verticalScrollBarHeight: _var.verticalScrollBarHeight,
                horizontalScrollBarWidth: _var.horizontalScrollBarWidth
            });

            _AX6UIGrid_body2.default.scrollTo.call(self, scrollPositon);
        }

        return -top;
    },
    "horizontal": function horizontal(_left, _var) {
        var self = this,
            type = "horizontal",
            _content_width = _var._content_width - _var._panel_width,
            _scroller_width = _var._horizontal_scroller_width - _var.horizontalScrollBarWidth,
            left = _scroller_width * _left / _content_width,
            scrollPositon = void 0;

        if (-left > _scroller_width) {
            left = -_scroller_width;
            scrollPositon = convertScrollPosition[type].call(this, { left: -left }, {
                _content_width: _var._content_width,
                _content_height: _var._content_height,
                _panel_width: _var._panel_width,
                _panel_height: _var._panel_height,
                _horizontal_scroller_width: _var._horizontal_scroller_width,
                _vertical_scroller_height: _var._vertical_scroller_height,
                verticalScrollBarHeight: _var.verticalScrollBarHeight,
                horizontalScrollBarWidth: _var.horizontalScrollBarWidth
            });

            _AX6UIGrid_header2.default.scrollTo.call(self, scrollPositon);
            _AX6UIGrid_body2.default.scrollTo.call(self, scrollPositon);
        }

        return -left;
    }
};

var scrollBarMover = {
    "click": function click(track, bar, type, e) {

        // 마우스 무브 완료 타임과 클릭타임 차이가 20 보다 작으면 클릭이벤트 막기.
        if (new Date().getTime() - moveout_timer < 20) {
            return false;
        }

        var self = this,
            trackOffset = track.offset(),
            barBox = {
            width: bar.outerWidth(), height: bar.outerHeight()
        },
            trackBox = {
            width: track.innerWidth(), height: track.innerHeight()
        },
            _vertical_scroller_height = self.$["scroller"]["vertical"].innerHeight(),
            _panel_height = self.$["panel"]["body"].height(),
            _horizontal_scroller_width = self.$["scroller"]["horizontal"].innerWidth(),
            _panel_width = self.$["panel"]["body"].width(),
            _content_height = self.xvar.scrollContentHeight,
            _content_width = self.xvar.scrollContentWidth,
            verticalScrollBarHeight = self.$["scroller"]["vertical-bar"].outerHeight(),
            horizontalScrollBarWidth = self.$["scroller"]["horizontal-bar"].outerWidth(),
            getScrollerPosition = {
            "vertical": function vertical(e) {
                var mouseObj = _AX6UIGrid_util2.default.getMousePosition(e);
                // track을 벗어 나지 안도록 범위 체크
                var newTop = mouseObj.clientY - trackOffset.top;
                if (newTop < 0) {
                    newTop = 0;
                } else if (newTop + barBox.height > trackBox.height) {
                    newTop = trackBox.height - barBox.height;
                }
                return { top: newTop };
            },
            "horizontal": function horizontal(e) {
                var mouseObj = _AX6UIGrid_util2.default.getMousePosition(e);
                // track을 벗어 나지 안도록 범위 체크
                var newLeft = mouseObj.clientX - trackOffset.left;
                if (newLeft < 0) {
                    newLeft = 0;
                } else if (newLeft + barBox.width > trackBox.width) {
                    newLeft = trackBox.width - barBox.width;
                }
                return { left: newLeft };
            }
        },
            css = getScrollerPosition[type](e);

        bar.css(css);

        var scrollPositon = convertScrollPosition[type].call(self, css, {
            _content_width: _content_width,
            _content_height: _content_height,
            _panel_width: _panel_width,
            _panel_height: _panel_height,
            _horizontal_scroller_width: _horizontal_scroller_width,
            _vertical_scroller_height: _vertical_scroller_height,
            verticalScrollBarHeight: verticalScrollBarHeight,
            horizontalScrollBarWidth: horizontalScrollBarWidth
        });
        if (type === "horizontal") _AX6UIGrid_header2.default.scrollTo.call(self, scrollPositon);
        _AX6UIGrid_body2.default.scrollTo.call(self, scrollPositon);

        scrollPositon = null;
    },
    "on": function on(track, bar, type, e) {
        var self = this,
            barOffset = bar.position(),
            barBox = {
            width: bar.outerWidth(), height: bar.outerHeight()
        },
            trackBox = {
            width: track.innerWidth(), height: track.innerHeight()
        },
            _vertical_scroller_height = self.$["scroller"]["vertical"].innerHeight(),
            _panel_height = self.$["panel"]["body"].height(),
            _horizontal_scroller_width = self.$["scroller"]["horizontal"].innerWidth(),
            _panel_width = self.$["panel"]["body"].width(),
            _content_height = self.xvar.scrollContentHeight,
            _content_width = self.xvar.scrollContentWidth,
            verticalScrollBarHeight = self.$["scroller"]["vertical-bar"].outerHeight(),
            horizontalScrollBarWidth = self.$["scroller"]["horizontal-bar"].outerWidth(),
            getScrollerPosition = {
            "vertical": function vertical(e) {
                var mouseObj = _AX6UIGrid_util2.default.getMousePosition(e);
                self.xvar.__da = mouseObj.clientY - self.xvar.mousePosition.clientY;
                // track을 벗어 나지 안도록 범위 체크
                var newTop = barOffset.top + self.xvar.__da;
                if (newTop < 0) {
                    newTop = 0;
                } else if (newTop + barBox.height > trackBox.height) {
                    newTop = trackBox.height - barBox.height;
                }
                return { top: newTop };
            },
            "horizontal": function horizontal(e) {
                var mouseObj = _AX6UIGrid_util2.default.getMousePosition(e);
                self.xvar.__da = mouseObj.clientX - self.xvar.mousePosition.clientX;
                // track을 벗어 나지 안도록 범위 체크
                var newLeft = barOffset.left + self.xvar.__da;
                if (newLeft < 0) {
                    newLeft = 0;
                } else if (newLeft + barBox.width > trackBox.width) {
                    newLeft = trackBox.width - barBox.width;
                }
                return { left: newLeft };
            }
        };

        self.xvar.__da = 0; // 이동량 변수 초기화 (계산이 잘못 될까바)

        (0, _jqmin2.default)(document.body).on(_AX6UIGrid_util2.default.ENM["mousemove"] + ".ax6grid-" + this.instanceId, function (e) {
            var css = getScrollerPosition[type](e);
            bar.css(css);

            var scrollPositon = convertScrollPosition[type].call(self, css, {
                _content_width: _content_width,
                _content_height: _content_height,
                _panel_width: _panel_width,
                _panel_height: _panel_height,
                _horizontal_scroller_width: _horizontal_scroller_width,
                _vertical_scroller_height: _vertical_scroller_height,
                verticalScrollBarHeight: verticalScrollBarHeight,
                horizontalScrollBarWidth: horizontalScrollBarWidth
            });

            if (type === "horizontal") _AX6UIGrid_header2.default.scrollTo.call(self, scrollPositon);

            _AX6UIGrid_body2.default.scrollTo.call(self, scrollPositon);
        }).on(_AX6UIGrid_util2.default.ENM["mouseup"] + ".ax6grid-" + this.instanceId, function (e) {
            scrollBarMover.off.call(self);
        }).on("mouseleave.ax6grid-" + this.instanceId, function (e) {
            scrollBarMover.off.call(self);
        });

        (0, _jqmin2.default)(document.body).attr('unselectable', 'on').css('user-select', 'none').on('selectstart', false);
    },
    "off": function off() {
        moveout_timer = new Date().getTime();

        (0, _jqmin2.default)(document.body).off(_AX6UIGrid_util2.default.ENM["mousemove"] + ".ax6grid-" + this.instanceId).off(_AX6UIGrid_util2.default.ENM["mouseup"] + ".ax6grid-" + this.instanceId).off("mouseleave.ax6grid-" + this.instanceId);

        (0, _jqmin2.default)(document.body).removeAttr('unselectable').css('user-select', 'auto').off('selectstart');
    }
};

var scrollContentMover = {
    "wheel": function wheel(delta) {
        var self = this,
            _body_scroll_position = self.$["panel"]["body-scroll"].position(),
            _panel_height = self.xvar.body_panel_height,
            _panel_width = self.xvar.body_panel_width,
            _content_height = self.xvar.scrollContentHeight,
            _content_width = self.xvar.scrollContentWidth;

        if (isNaN(_content_height) || isNaN(_content_width)) {
            return false;
        }

        var newLeft = void 0,
            newTop = void 0,
            _top_is_end = false,
            _left_is_end = false;

        newLeft = _body_scroll_position.left - delta.x;
        newTop = _body_scroll_position.top - delta.y;

        // newTop이 범위를 넘었는지 체크
        if (newTop >= 0) {
            newTop = 0;
            _top_is_end = true;
        } else if (newTop <= _panel_height - _content_height) {
            newTop = _panel_height - _content_height;
            if (newTop >= 0) newTop = 0;
            _top_is_end = true;
        } else {
            if (delta.y == 0) _top_is_end = true;
        }

        // newLeft이 범위를 넘었는지 체크
        if (newLeft >= 0) {
            newLeft = 0;
            _left_is_end = true;
        } else if (newLeft <= _panel_width - _content_width) {
            newLeft = _panel_width - _content_width;
            if (newLeft >= 0) newLeft = 0;
            _left_is_end = true;
        } else {
            if (delta.x == 0) _left_is_end = true;
        }

        _AX6UIGrid_header2.default.scrollTo.call(self, { left: newLeft });
        _AX6UIGrid_body2.default.scrollTo.call(self, { left: newLeft, top: newTop }, {
            callback: function callback() {
                resize.call(self);
            }
        });

        return !_top_is_end || !_left_is_end;
    },
    "on": function on() {
        var self = this,
            _body_scroll_position = self.$["panel"]["body-scroll"].position(),
            _panel_height = self.xvar.body_panel_height,
            _panel_width = self.xvar.body_panel_width,
            _content_height = self.xvar.scrollContentHeight,
            _content_width = self.xvar.scrollContentWidth,
            getContentPosition = function getContentPosition(e) {
            var mouseObj = _AX6UIGrid_util2.default.getMousePosition(e),
                newLeft = void 0,
                newTop = void 0;

            self.xvar.__x_da = mouseObj.clientX - self.xvar.mousePosition.clientX;
            self.xvar.__y_da = mouseObj.clientY - self.xvar.mousePosition.clientY;

            newLeft = _body_scroll_position.left + self.xvar.__x_da;
            newTop = _body_scroll_position.top + self.xvar.__y_da;

            // newTop이 범위를 넘었는지 체크
            if (newTop >= 0) {
                newTop = 0;
            } else if (newTop <= _panel_height - _content_height) {
                newTop = _panel_height - _content_height;
                if (newTop >= 0) newTop = 0;
            }

            // newLeft이 범위를 넘었는지 체크
            if (newLeft >= 0) {
                newLeft = 0;
            } else if (newLeft <= _panel_width - _content_width) {
                newLeft = _panel_width - _content_width;
                if (newLeft >= 0) newLeft = 0;
            }

            return {
                left: newLeft, top: newTop
            };
        };

        this.xvar.__x_da = 0; // 이동량 변수 초기화
        this.xvar.__y_da = 0; // 계산이 잘못 될까바
        this.xvar.touchmoved = false;

        (0, _jqmin2.default)(document.body).on("touchmove" + ".ax6grid-" + this.instanceId, function (e) {
            var css = getContentPosition(e);

            resize.call(self);
            _AX6UIGrid_header2.default.scrollTo.call(self, { left: css.left });
            _AX6UIGrid_body2.default.scrollTo.call(self, css, { noRepaint: "noRepaint" });
            _AX6Util2.default.stopEvent(e.originalEvent);
            self.xvar.touchmoved = true;
        }).on("touchend" + ".ax6grid-" + this.instanceId, function (e) {
            if (self.xvar.touchmoved) {
                var css = getContentPosition(e);

                resize.call(self);
                _AX6UIGrid_header2.default.scrollTo.call(self, { left: css.left });
                _AX6UIGrid_body2.default.scrollTo.call(self, css);
                _AX6Util2.default.stopEvent(e.originalEvent);
                scrollContentMover.off.call(self);
            }
        });

        (0, _jqmin2.default)(document.body).attr('unselectable', 'on').css('user-select', 'none').on('selectstart', false);
    },
    "off": function off() {

        (0, _jqmin2.default)(document.body).off("touchmove" + ".ax6grid-" + this.instanceId).off("touchend" + ".ax6grid-" + this.instanceId);

        (0, _jqmin2.default)(document.body).removeAttr('unselectable').css('user-select', 'auto').off('selectstart');
    }
};

var init = function init() {
    var self = this,
        margin = this.config.scroller.trackPadding;

    if (margin == 0) {
        this.$["scroller"]["vertical-bar"].css({ width: this.config.scroller.size, left: -1 });
        this.$["scroller"]["horizontal-bar"].css({ height: this.config.scroller.size, top: -1 });
    } else {
        this.$["scroller"]["vertical-bar"].css({ width: this.config.scroller.size - (margin + 1), left: margin / 2 });
        this.$["scroller"]["horizontal-bar"].css({ height: this.config.scroller.size - (margin + 1), top: margin / 2 });
    }

    this.$["scroller"]["vertical-bar"].on(_AX6UIGrid_util2.default.ENM["mousedown"], function (e) {
        this.xvar.mousePosition = _AX6UIGrid_util2.default.getMousePosition(e);
        scrollBarMover.on.call(this, this.$["scroller"]["vertical"], this.$["scroller"]["vertical-bar"], "vertical", e);
    }.bind(this)).on("dragstart", function (e) {
        _AX6Util2.default.stopEvent(e);
        return false;
    });

    this.$["scroller"]["vertical"].on("click", function (e) {
        if (e.target.getAttribute("data-ax6grid-scroller") == "vertical") {
            scrollBarMover.click.call(this, this.$["scroller"]["vertical"], this.$["scroller"]["vertical-bar"], "vertical", e);
        }
    }.bind(this));

    this.$["scroller"]["horizontal-bar"].on(_AX6UIGrid_util2.default.ENM["mousedown"], function (e) {
        this.xvar.mousePosition = _AX6UIGrid_util2.default.getMousePosition(e);
        scrollBarMover.on.call(this, this.$["scroller"]["horizontal"], this.$["scroller"]["horizontal-bar"], "horizontal", e);
    }.bind(this)).on("dragstart", function (e) {
        _AX6Util2.default.stopEvent(e);
        return false;
    });

    this.$["scroller"]["horizontal"].on("click", function (e) {
        if (e.target.getAttribute("data-ax6grid-scroller") == "horizontal") {
            scrollBarMover.click.call(this, this.$["scroller"]["horizontal"], this.$["scroller"]["horizontal-bar"], "horizontal", e);
        }
    }.bind(this));

    this.$["container"]["body"].on('mousewheel DOMMouseScroll', function (e) {
        var E = e.originalEvent,
            delta = { x: 0, y: 0 };

        if (E.detail) {
            delta.y = E.detail * 10;
        } else {
            if (typeof E.deltaY === "undefined") {
                delta.y = -E.wheelDelta;
                delta.x = 0;
            } else {
                delta.y = E.deltaY;
                delta.x = E.deltaX;
            }
        }

        if (scrollContentMover.wheel.call(this, delta)) {
            _AX6Util2.default.stopEvent(e);
        }
    }.bind(this));

    if (_AX6Info2.default.supportTouch) {
        this.$["container"]["body"].on("touchstart", '[data-ax6grid-panel]', function (e) {
            self.xvar.mousePosition = _AX6UIGrid_util2.default.getMousePosition(e);
            scrollContentMover.on.call(self);
        });
    }

    this.xvar.body_panel_height = this.$["panel"]["body"].height();
    this.xvar.body_panel_width = this.$["panel"]["body"].width();
};

var resize = function resize() {
    var _vertical_scroller_height = this.$["scroller"]["vertical"].height(),
        _horizontal_scroller_width = this.$["scroller"]["horizontal"].width(),
        _panel_height = this.$["panel"]["body"].height(),
        _panel_width = this.$["panel"]["body"].width(),
        _content_height = this.xvar.scrollContentHeight,
        _content_width = this.xvar.scrollContentWidth,
        verticalScrollBarHeight = _panel_height * _vertical_scroller_height / _content_height,
        horizontalScrollBarWidth = _panel_width * _horizontal_scroller_width / _content_width;

    if (verticalScrollBarHeight < this.config.scroller.barMinSize) verticalScrollBarHeight = this.config.scroller.barMinSize;
    if (horizontalScrollBarWidth < this.config.scroller.barMinSize) horizontalScrollBarWidth = this.config.scroller.barMinSize;

    this.$["scroller"]["vertical-bar"].css({
        top: convertScrollBarPosition.vertical.call(this, this.$.panel["body-scroll"].position().top, {
            _content_width: _content_width,
            _content_height: _content_height,
            _panel_width: _panel_width,
            _panel_height: _panel_height,
            _horizontal_scroller_width: _horizontal_scroller_width,
            _vertical_scroller_height: _vertical_scroller_height,
            verticalScrollBarHeight: verticalScrollBarHeight,
            horizontalScrollBarWidth: horizontalScrollBarWidth
        }),
        height: verticalScrollBarHeight
    });

    this.$["scroller"]["horizontal-bar"].css({
        left: convertScrollBarPosition.horizontal.call(this, this.$.panel["body-scroll"].position().left, {
            _content_width: _content_width,
            _content_height: _content_height,
            _panel_width: _panel_width,
            _panel_height: _panel_height,
            _horizontal_scroller_width: _horizontal_scroller_width,
            _vertical_scroller_height: _vertical_scroller_height,
            verticalScrollBarHeight: verticalScrollBarHeight,
            horizontalScrollBarWidth: horizontalScrollBarWidth
        }),
        width: horizontalScrollBarWidth
    });

    this.xvar.body_panel_height = _panel_height;
    this.xvar.body_panel_width = _panel_width;

    _vertical_scroller_height = null;
    _horizontal_scroller_width = null;
    _panel_height = null;
    _panel_width = null;
    _content_height = null;
    _content_width = null;
    verticalScrollBarHeight = null;
    horizontalScrollBarWidth = null;
};

exports.default = {
    // 타이머
    moveout_timer: moveout_timer,
    init: init,
    resize: resize
};