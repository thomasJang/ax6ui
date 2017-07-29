"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jqmin = require("jqmin");

var _jqmin2 = _interopRequireDefault(_jqmin);

var _AX6UICore2 = require("./AX6UICore.js");

var _AX6UICore3 = _interopRequireDefault(_AX6UICore2);

var _AX6Util = require("./AX6Util");

var _AX6Util2 = _interopRequireDefault(_AX6Util);

var _AX6Info = require("./AX6Info");

var _AX6Info2 = _interopRequireDefault(_AX6Info);

var _AX6Mustache = require("./AX6Mustache.js");

var _AX6Mustache2 = _interopRequireDefault(_AX6Mustache);

require("./AX6UIToast/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ENM = {
    "mousedown": _AX6Info2.default.supportTouch ? "touchstart" : "mousedown",
    "mousemove": _AX6Info2.default.supportTouch ? "touchmove" : "mousemove",
    "mouseup": _AX6Info2.default.supportTouch ? "touchend" : "mouseup"
};
var getMousePosition = function getMousePosition(e) {
    var mouseObj = e;
    if ('changedTouches' in e && e.changedTouches) {
        mouseObj = e.changedTouches[0];
    }
    return {
        clientX: mouseObj.clientX,
        clientY: mouseObj.clientY
    };
};

var onStateChanged = function onStateChanged(opts, that) {
    var eventProcessor = {
        "resize": function resize(that) {
            if (opts && opts.onResize) {
                opts.onResize.call(that, that);
            } else if (this.onResize) {
                this.onResize.call(that, that);
            }
        },
        "move": function move() {}
    };
    if (that.state in eventProcessor) {
        eventProcessor[that.state].call(this, that);
    }

    if (opts && opts.onStateChanged) {
        opts.onStateChanged.call(that, that);
    } else if (this.onStateChanged) {
        this.onStateChanged.call(that, that);
    }
    return true;
},
    getContent = function getContent(modalId, opts) {
    var data = {
        modalId: modalId,
        theme: opts.theme,
        header: opts.header,
        fullScreen: opts.fullScreen ? "fullscreen" : "",
        styles: "",
        iframe: opts.iframe,
        iframeLoadingMsg: opts.iframeLoadingMsg,
        disableResize: opts.disableResize
    };

    if (opts.zIndex) {
        data.styles += "z-index:" + opts.zIndex + ";";
    }
    if (opts.absolute) {
        data.styles += "position:absolute;";
    }

    if (data.iframe && typeof data.iframe.param === "string") {
        data.iframe.param = ax5.util.param(data.iframe.param);
    }

    return MODAL.tmpl.get.call(this, "content", data, {});
},
    open = function open(opts, callback) {
    var that = void 0;
    (0, _jqmin2.default)(document.body).append(getContent.call(this, opts.id, opts));

    this.activeModal = (0, _jqmin2.default)('#' + opts.id);
    // 파트수집
    this.$ = {
        "root": this.activeModal,
        "header": this.activeModal.find('[data-modal-els="header"]'),
        "body": this.activeModal.find('[data-modal-els="body"]')
    };

    if (opts.iframe) {
        this.$["iframe-wrap"] = this.activeModal.find('[data-modal-els="iframe-wrap"]');
        this.$["iframe"] = this.activeModal.find('[data-modal-els="iframe"]');
        this.$["iframe-form"] = this.activeModal.find('[data-modal-els="iframe-form"]');
        this.$["iframe-loading"] = this.activeModal.find('[data-modal-els="iframe-loading"]');
    } else {
        this.$["body-frame"] = this.activeModal.find('[data-modal-els="body-frame"]');
    }

    //- position 정렬
    this.align();

    that = {
        self: this,
        id: opts.id,
        theme: opts.theme,
        width: opts.width,
        height: opts.height,
        state: "open",
        $: this.$
    };

    if (opts.iframe) {
        this.$["iframe-wrap"].css({ height: opts.height });
        this.$["iframe"].css({ height: opts.height });

        // iframe content load
        this.$["iframe-form"].attr({ "method": opts.iframe.method });
        this.$["iframe-form"].attr({ "target": opts.id + "-frame" });
        this.$["iframe-form"].attr({ "action": opts.iframe.url });
        this.$["iframe"].on("load", function () {
            that.state = "load";
            if (opts.iframeLoadingMsg) {
                this.$["iframe-loading"].hide();
            }
            onStateChanged.call(this, opts, that);
        }.bind(this));
        if (!opts.iframeLoadingMsg) {
            this.$["iframe"].show();
        }
        this.$["iframe-form"].submit();
    }

    if (callback) callback.call(that, that);

    if (!this.watingModal) {
        onStateChanged.call(this, opts, that);
    }

    // bind key event
    if (opts.closeToEsc) {
        (0, _jqmin2.default)(window).bind("keydown.ax-modal", function (e) {
            onkeyup.call(this, e || window.event);
        }.bind(this));
    }

    (0, _jqmin2.default)(window).bind("resize.ax-modal", function (e) {
        this.align(null, e || window.event);
    }.bind(this));

    this.$.header.off(ENM["mousedown"]).off("dragstart").on(ENM["mousedown"], function (e) {
        /// 이벤트 필터링 추가 : 버튼엘리먼트로 부터 발생된 이벤트이면 moveModal 시작하지 않도록 필터링
        var isButton = _AX6Util2.default.findParentNode(e.target, function (_target) {
            if (_target.getAttribute("data-modal-header-btn")) {
                return true;
            }
        });

        if (!opts.isFullScreen && !isButton && opts.disableDrag != true) {
            self.mousePosition = getMousePosition(e);
            moveModal.on.call(self);
        }
        if (isButton) {
            btnOnClick.call(self, e || window.event, opts);
        }
    }).on("dragstart", function (e) {
        _AX6Util2.default.stopEvent(e.originalEvent);
        return false;
    });

    this.activeModal.off(ENM["mousedown"]).off("dragstart").on(ENM["mousedown"], "[data-ax5modal-resizer]", function (e) {
        if (opts.disableDrag || opts.isFullScreen) return false;
        self.mousePosition = getMousePosition(e);
        resizeModal.on.call(self, this.getAttribute("data-ax5modal-resizer"));
    }).on("dragstart", function (e) {
        _AX6Util2.default.stopEvent(e.originalEvent);
        return false;
    });
},
    btnOnClick = function btnOnClick(e, opts, callback, target, k) {
    var that = void 0;
    if (e.srcElement) e.target = e.srcElement;

    target = _AX6Util2.default.findParentNode(e.target, function (target) {
        if (target.getAttribute("data-modal-header-btn")) {
            return true;
        }
    });

    if (target) {
        k = target.getAttribute("data-modal-header-btn");

        that = {
            self: this,
            key: k, value: opts.header.btns[k],
            dialogId: opts.id,
            btnTarget: target
        };

        if (opts.header.btns[k].onClick) {
            opts.header.btns[k].onClick.call(that, k);
        }
    }

    that = null;
    opts = null;
    callback = null;
    target = null;
    k = null;
},
    onkeyup = function onkeyup(e) {
    if (e.keyCode == ax5.info.eventKeys.ESC) {
        this.close();
    }
},
    alignProcessor = {
    "top-left": function topLeft() {
        this.align({ left: "left", top: "top" });
    },
    "top-right": function topRight() {
        this.align({ left: "right", top: "top" });
    },
    "bottom-left": function bottomLeft() {
        this.align({ left: "left", top: "bottom" });
    },
    "bottom-right": function bottomRight() {
        this.align({ left: "right", top: "bottom" });
    },
    "center-middle": function centerMiddle() {
        this.align({ left: "center", top: "middle" });
    }
},
    moveModal = {
    "on": function on() {
        var modalZIndex = this.activeModal.css("z-index"),
            modalOffset = this.activeModal.position(),
            modalBox = {
            width: this.activeModal.outerWidth(), height: this.activeModal.outerHeight()
        },
            windowBox = {
            width: (0, _jqmin2.default)(window).width(),
            height: (0, _jqmin2.default)(window).height(),
            scrollLeft: self.modalConfig.absolute ? 0 : (0, _jqmin2.default)(document).scrollLeft(),
            scrollTop: self.modalConfig.absolute ? 0 : (0, _jqmin2.default)(document).scrollTop()
        },
            getResizerPosition = function getResizerPosition(e) {
            self.__dx = e.clientX - self.mousePosition.clientX;
            self.__dy = e.clientY - self.mousePosition.clientY;

            if (minX > modalOffset.left + self.__dx) {
                self.__dx = -modalOffset.left;
            } else if (maxX < modalOffset.left + self.__dx) {
                self.__dx = maxX - modalOffset.left;
            }

            if (minY > modalOffset.top + self.__dy) {
                self.__dy = -modalOffset.top;
            } else if (maxY < modalOffset.top + self.__dy) {
                self.__dy = maxY - modalOffset.top;
            }

            return {
                left: modalOffset.left + self.__dx + windowBox.scrollLeft,
                top: modalOffset.top + self.__dy + windowBox.scrollTop
            };
        };

        var minX = 0,
            maxX = windowBox.width - modalBox.width,
            minY = 0,
            maxY = windowBox.height - modalBox.height;

        self.__dx = 0; // 변화량 X
        self.__dy = 0; // 변화량 Y

        // self.resizerBg : body 가 window보다 작을 때 문제 해결을 위한 DIV
        self.resizerBg = (0, _jqmin2.default)('<div class="ax5modal-resizer-background" ondragstart="return false;"></div>');
        self.resizer = (0, _jqmin2.default)('<div class="ax5modal-resizer" ondragstart="return false;"></div>');
        self.resizerBg.css({ zIndex: modalZIndex });
        self.resizer.css({
            left: modalOffset.left + windowBox.scrollLeft,
            top: modalOffset.top + windowBox.scrollTop,
            width: modalBox.width,
            height: modalBox.height,
            zIndex: modalZIndex + 1
        });

        (0, _jqmin2.default)(document.body).append(self.resizerBg).append(self.resizer);
        self.activeModal.addClass("draged");

        (0, _jqmin2.default)(document.body).on(ENM["mousemove"] + ".ax5modal-move-" + this.instanceId, function (e) {
            self.resizer.css(getResizerPosition(e));
        }).on(ENM["mouseup"] + ".ax5modal-move-" + this.instanceId, function (e) {
            moveModal.off.call(self);
        }).on("mouseleave.ax5modal-move-" + this.instanceId, function (e) {
            moveModal.off.call(self);
        });

        (0, _jqmin2.default)(document.body).attr('unselectable', 'on').css('user-select', 'none').on('selectstart', false);
    },
    "off": function off() {
        var setModalPosition = function setModalPosition() {
            var box = this.resizer.offset();
            if (!this.modalConfig.absolute) {
                box.left -= (0, _jqmin2.default)(document).scrollLeft();
                box.top -= (0, _jqmin2.default)(document).scrollTop();
            }
            this.activeModal.css(box);
            this.modalConfig.left = box.left;
            this.modalConfig.top = box.top;

            box = null;
        };

        this.activeModal.removeClass("draged");
        setModalPosition.call(this);

        this.resizer.remove();
        this.resizer = null;
        this.resizerBg.remove();
        this.resizerBg = null;
        //this.align();

        (0, _jqmin2.default)(document.body).off(ENM["mousemove"] + ".ax5modal-move-" + this.instanceId).off(ENM["mouseup"] + ".ax5modal-move-" + this.instanceId).off("mouseleave.ax5modal-move-" + this.instanceId);

        (0, _jqmin2.default)(document.body).removeAttr('unselectable').css('user-select', 'auto').off('selectstart');

        onStateChanged.call(this, self.modalConfig, {
            self: this,
            state: "move"
        });
    }
},
    resizeModal = {
    "on": function on(resizerType) {
        var modalZIndex = this.activeModal.css("z-index"),
            modalOffset = this.activeModal.position(),
            modalBox = {
            width: this.activeModal.outerWidth(), height: this.activeModal.outerHeight()
        },
            windowBox = {
            width: (0, _jqmin2.default)(window).width(),
            height: (0, _jqmin2.default)(window).height(),
            scrollLeft: this.modalConfig.absolute ? 0 : (0, _jqmin2.default)(document).scrollLeft(),
            scrollTop: this.modalConfig.absolute ? 0 : (0, _jqmin2.default)(document).scrollTop()
        },
            resizerProcessor = {
            "top": function top(e) {

                if (minHeight > modalBox.height - self.__dy) {
                    self.__dy = modalBox.height - minHeight;
                }

                if (e.shiftKey) {

                    if (minHeight > modalBox.height - self.__dy * 2) {
                        self.__dy = (modalBox.height - minHeight) / 2;
                    }

                    return {
                        left: modalOffset.left,
                        top: modalOffset.top + self.__dy,
                        width: modalBox.width,
                        height: modalBox.height - self.__dy * 2
                    };
                } else if (e.altKey) {

                    if (minHeight > modalBox.height - self.__dy * 2) {
                        self.__dy = (modalBox.height - minHeight) / 2;
                    }

                    return {
                        left: modalOffset.left + self.__dy,
                        top: modalOffset.top + self.__dy,
                        width: modalBox.width - self.__dy * 2,
                        height: modalBox.height - self.__dy * 2
                    };
                } else {
                    return {
                        left: modalOffset.left,
                        top: modalOffset.top + self.__dy,
                        width: modalBox.width,
                        height: modalBox.height - self.__dy
                    };
                }
            },
            "bottom": function bottom(e) {

                if (minHeight > modalBox.height + self.__dy) {
                    self.__dy = -modalBox.height + minHeight;
                }

                if (e.shiftKey) {

                    if (minHeight > modalBox.height + self.__dy * 2) {
                        self.__dy = (-modalBox.height + minHeight) / 2;
                    }

                    return {
                        left: modalOffset.left,
                        top: modalOffset.top - self.__dy,
                        width: modalBox.width,
                        height: modalBox.height + self.__dy * 2
                    };
                } else if (e.altKey) {

                    if (minHeight > modalBox.height + self.__dy * 2) {
                        self.__dy = (-modalBox.height + minHeight) / 2;
                    }

                    return {
                        left: modalOffset.left - self.__dy,
                        top: modalOffset.top - self.__dy,
                        width: modalBox.width + self.__dy * 2,
                        height: modalBox.height + self.__dy * 2
                    };
                } else {
                    return {
                        left: modalOffset.left,
                        top: modalOffset.top,
                        width: modalBox.width,
                        height: modalBox.height + self.__dy
                    };
                }
            },
            "left": function left(e) {

                if (minWidth > modalBox.width - self.__dx) {
                    self.__dx = modalBox.width - minWidth;
                }

                if (e.shiftKey) {

                    if (minWidth > modalBox.width - self.__dx * 2) {
                        self.__dx = (modalBox.width - minWidth) / 2;
                    }

                    return {
                        left: modalOffset.left + self.__dx,
                        top: modalOffset.top,
                        width: modalBox.width - self.__dx * 2,
                        height: modalBox.height
                    };
                } else if (e.altKey) {

                    if (minWidth > modalBox.width - self.__dx * 2) {
                        self.__dx = (modalBox.width - minWidth) / 2;
                    }

                    return {
                        left: modalOffset.left + self.__dx,
                        top: modalOffset.top + self.__dx,
                        width: modalBox.width - self.__dx * 2,
                        height: modalBox.height - self.__dx * 2
                    };
                } else {
                    return {
                        left: modalOffset.left + self.__dx,
                        top: modalOffset.top,
                        width: modalBox.width - self.__dx,
                        height: modalBox.height
                    };
                }
            },
            "right": function right(e) {

                if (minWidth > modalBox.width + self.__dx) {
                    self.__dx = -modalBox.width + minWidth;
                }

                if (e.shiftKey) {

                    if (minWidth > modalBox.width + self.__dx * 2) {
                        self.__dx = (-modalBox.width + minWidth) / 2;
                    }

                    return {
                        left: modalOffset.left - self.__dx,
                        top: modalOffset.top,
                        width: modalBox.width + self.__dx * 2,
                        height: modalBox.height
                    };
                } else if (e.altKey) {

                    if (minWidth > modalBox.width + self.__dx * 2) {
                        self.__dx = (-modalBox.width + minWidth) / 2;
                    }

                    return {
                        left: modalOffset.left - self.__dx,
                        top: modalOffset.top - self.__dx,
                        width: modalBox.width + self.__dx * 2,
                        height: modalBox.height + self.__dx * 2
                    };
                } else {
                    return {
                        left: modalOffset.left,
                        top: modalOffset.top,
                        width: modalBox.width + self.__dx,
                        height: modalBox.height
                    };
                }
            },
            "top-left": function topLeft(e) {

                if (minWidth > modalBox.width - self.__dx) {
                    self.__dx = modalBox.width - minWidth;
                }

                if (minHeight > modalBox.height - self.__dy) {
                    self.__dy = modalBox.height - minHeight;
                }

                if (e.shiftKey || e.altKey) {

                    if (minHeight > modalBox.height - self.__dy * 2) {
                        self.__dy = (modalBox.height - minHeight) / 2;
                    }
                    if (minWidth > modalBox.width - self.__dx * 2) {
                        self.__dx = (modalBox.width - minWidth) / 2;
                    }

                    return {
                        left: modalOffset.left + self.__dx,
                        top: modalOffset.top + self.__dy,
                        width: modalBox.width - self.__dx * 2,
                        height: modalBox.height - self.__dy * 2
                    };
                } else {

                    if (minHeight > modalBox.height - self.__dy * 2) {
                        self.__dy = (modalBox.height - minHeight) / 2;
                    }
                    if (minWidth > modalBox.width - self.__dx * 2) {
                        self.__dx = (modalBox.width - minWidth) / 2;
                    }

                    return {
                        left: modalOffset.left + self.__dx,
                        top: modalOffset.top + self.__dy,
                        width: modalBox.width - self.__dx,
                        height: modalBox.height - self.__dy
                    };
                }
            },
            "top-right": function topRight(e) {

                if (minWidth > modalBox.width + self.__dx) {
                    self.__dx = -modalBox.width + minWidth;
                }

                if (minHeight > modalBox.height - self.__dy) {
                    self.__dy = modalBox.height - minHeight;
                }

                if (e.shiftKey || e.altKey) {

                    if (minHeight > modalBox.height - self.__dy * 2) {
                        self.__dy = (modalBox.height - minHeight) / 2;
                    }
                    if (minWidth > modalBox.width + self.__dx * 2) {
                        self.__dx = (-modalBox.width + minWidth) / 2;
                    }

                    return {
                        left: modalOffset.left - self.__dx,
                        top: modalOffset.top + self.__dy,
                        width: modalBox.width + self.__dx * 2,
                        height: modalBox.height - self.__dy * 2
                    };
                } else {
                    return {
                        left: modalOffset.left,
                        top: modalOffset.top + self.__dy,
                        width: modalBox.width + self.__dx,
                        height: modalBox.height - self.__dy
                    };
                }
            },
            "bottom-left": function bottomLeft(e) {

                if (minWidth > modalBox.width - self.__dx) {
                    self.__dx = modalBox.width - minWidth;
                }

                if (minHeight > modalBox.height + self.__dy) {
                    self.__dy = -modalBox.height + minHeight;
                }

                if (e.shiftKey || e.altKey) {
                    if (minWidth > modalBox.width - self.__dx * 2) {
                        self.__dx = (modalBox.width - minWidth) / 2;
                    }
                    if (minHeight > modalBox.height + self.__dy * 2) {
                        self.__dy = (-modalBox.height + minHeight) / 2;
                    }
                    return {
                        left: modalOffset.left + self.__dx,
                        top: modalOffset.top - self.__dy,
                        width: modalBox.width - self.__dx * 2,
                        height: modalBox.height + self.__dy * 2
                    };
                } else {
                    return {
                        left: modalOffset.left + self.__dx,
                        top: modalOffset.top,
                        width: modalBox.width - self.__dx,
                        height: modalBox.height + self.__dy
                    };
                }
            },
            "bottom-right": function bottomRight(e) {

                if (minWidth > modalBox.width + self.__dx) {
                    self.__dx = -modalBox.width + minWidth;
                }

                if (minHeight > modalBox.height + self.__dy) {
                    self.__dy = -modalBox.height + minHeight;
                }

                if (e.shiftKey || e.altKey) {
                    if (minWidth > modalBox.width + self.__dx * 2) {
                        self.__dx = (-modalBox.width + minWidth) / 2;
                    }
                    if (minHeight > modalBox.height + self.__dy * 2) {
                        self.__dy = (-modalBox.height + minHeight) / 2;
                    }
                    return {
                        left: modalOffset.left - self.__dx,
                        top: modalOffset.top - self.__dy,
                        width: modalBox.width + self.__dx * 2,
                        height: modalBox.height + self.__dy * 2
                    };
                } else {
                    return {
                        left: modalOffset.left,
                        top: modalOffset.top,
                        width: modalBox.width + self.__dx,
                        height: modalBox.height + self.__dy
                    };
                }
            }
        },
            getResizerPosition = function getResizerPosition(e) {
            self.__dx = e.clientX - self.mousePosition.clientX;
            self.__dy = e.clientY - self.mousePosition.clientY;

            return resizerProcessor[resizerType](e);
        };

        if (!this.modalConfig.absolute) {
            modalOffset.left += windowBox.scrollLeft;
            modalOffset.top += windowBox.scrollTop;
        }

        var minWidth = 100,
            minHeight = 100;

        var cursorType = {
            "top": "row-resize",
            "bottom": "row-resize",
            "left": "col-resize",
            "right": "col-resize",
            "top-left": "nwse-resize",
            "top-right": "nesw-resize",
            "bottom-left": "nesw-resize",
            "bottom-right": "nwse-resize"
        };

        self.__dx = 0; // 변화량 X
        self.__dy = 0; // 변화량 Y

        // self.resizerBg : body 가 window보다 작을 때 문제 해결을 위한 DIV
        self.resizerBg = (0, _jqmin2.default)('<div class="ax5modal-resizer-background" ondragstart="return false;"></div>');
        self.resizer = (0, _jqmin2.default)('<div class="ax5modal-resizer" ondragstart="return false;"></div>');
        self.resizerBg.css({
            zIndex: modalZIndex,
            cursor: cursorType[resizerType]
        });
        self.resizer.css({
            left: modalOffset.left,
            top: modalOffset.top,
            width: modalBox.width,
            height: modalBox.height,
            zIndex: modalZIndex + 1,
            cursor: cursorType[resizerType]
        });
        (0, _jqmin2.default)(document.body).append(self.resizerBg).append(self.resizer);
        self.activeModal.addClass("draged");

        (0, _jqmin2.default)(document.body).bind(ENM["mousemove"] + ".ax5modal-resize-" + this.instanceId, function (e) {
            self.resizer.css(getResizerPosition(e));
        }).bind(ENM["mouseup"] + ".ax5modal-resize-" + this.instanceId, function (e) {
            resizeModal.off.call(self);
        }).bind("mouseleave.ax5modal-resize-" + this.instanceId, function (e) {
            resizeModal.off.call(self);
        });

        (0, _jqmin2.default)(document.body).attr('unselectable', 'on').css('user-select', 'none').bind('selectstart', false);
    },
    "off": function off() {
        var setModalPosition = function setModalPosition() {
            var box = this.resizer.offset();
            _jqmin2.default.extend(box, {
                width: this.resizer.width(),
                height: this.resizer.height()
            });
            if (!this.modalConfig.absolute) {
                box.left -= (0, _jqmin2.default)(document).scrollLeft();
                box.top -= (0, _jqmin2.default)(document).scrollTop();
            }
            this.activeModal.css(box);

            this.modalConfig.left = box.left;
            this.modalConfig.top = box.top;
            this.modalConfig.width = box.width;
            this.modalConfig.height = box.height;
            this.$["body"].css({ height: box.height - this.modalConfig.headerHeight });
            if (this.modalConfig.iframe) {
                this.$["iframe-wrap"].css({ height: box.height - this.modalConfig.headerHeight });
                this.$["iframe"].css({ height: box.height - this.modalConfig.headerHeight });
            }

            box = null;
        };

        this.activeModal.removeClass("draged");
        setModalPosition.call(this);

        this.resizer.remove();
        this.resizer = null;
        this.resizerBg.remove();
        this.resizerBg = null;

        onStateChanged.call(this, self.modalConfig, {
            self: this,
            state: "resize"
        });

        (0, _jqmin2.default)(document.body).unbind(ENM["mousemove"] + ".ax5modal-resize-" + this.instanceId).unbind(ENM["mouseup"] + ".ax5modal-resize-" + this.instanceId).unbind("mouseleave.ax5modal-resize-" + this.instanceId);

        (0, _jqmin2.default)(document.body).removeAttr('unselectable').css('user-select', 'auto').unbind('selectstart');
    }
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
         * @param [config.id='ax6ui-modal-' + this.instanceId]
         * @param [config.position]
         * @param [config.position.left='cener']
         * @param [config.position.top='middle']
         * @param [config.position.margin=10]
         * @param [config.minimizePosition='bottom-right']
         * @param [config.clickEventName]
         * @param [config.theme]
         * @param [config.width=300]
         * @param [config.height=400]
         * @param [config.closeToEsc]
         * @param [config.disableDrag]
         * @param [config.disableResize]
         * @param [config.animateTime=250]
         * @param [config.iframe=false]
         */
        var _this = _possibleConstructorReturn(this, (AX6UIToast.__proto__ || Object.getPrototypeOf(AX6UIToast)).call(this));

        _this.config = {
            id: 'ax6ui-modal-' + _this.instanceId,
            position: {
                left: "center",
                top: "middle",
                margin: 10
            },
            minimizePosition: "bottom-right",
            clickEventName: 'ontouchstart' in document.documentElement ? "touchstart" : "click",
            theme: 'default',
            width: 300,
            height: 400,
            closeToEsc: true,
            disableDrag: false,
            disableResize: false,
            animateTime: 250,
            iframe: false
        };
        _jqmin2.default.extend(true, _this.config, config);

        // 멤버 변수 초기화
        /**
         * @member {jQueryElement}
         */
        _this.$activeModal = null;
        /**
         * @member
         */
        _this.watingModal = false;
        _this.$ = {};

        if (typeof config !== "undefined") _this.init();
        return _this;
    }

    /**
     * @method
     */


    _createClass(AX6UIToast, [{
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
        }
    }]);

    return AX6UIToast;
}(_AX6UICore3.default);

exports.default = AX6UIToast;