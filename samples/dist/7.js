webpackJsonp([7],{

/***/ 105:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jqmin = __webpack_require__(2);

var _jqmin2 = _interopRequireDefault(_jqmin);

var _AX6UICore2 = __webpack_require__(5);

var _AX6UICore3 = _interopRequireDefault(_AX6UICore2);

var _AX6Util = __webpack_require__(1);

var _AX6Util2 = _interopRequireDefault(_AX6Util);

var _AX6Info = __webpack_require__(4);

var _AX6Info2 = _interopRequireDefault(_AX6Info);

var _AX6Mustache = __webpack_require__(36);

var _AX6Mustache2 = _interopRequireDefault(_AX6Mustache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* ~~~~~~~~~~~~~~~~~~ end of import  ~~~~~~~~~~~~~~~~~~~~ */

var tmpl = {
  modal: function modal() {
    return " \n<div data-ax6ui-modal=\"{{modalId}}\" data-modal-els=\"root\" class=\"{{theme}} {{fullscreen}}\" style=\"{{styles}}\">\n    {{#header}}\n    <div class=\"ax-modal-header\" data-modal-els=\"header\">\n        {{{title}}}\n        {{#btns}}\n            <div class=\"ax-modal-header-addon\">\n            {{#@each}}\n            <button tabindex=\"-1\" data-modal-header-btn=\"{{@key}}\" class=\"{{@value.theme}}\">{{{@value.label}}}</button>\n            {{/@each}}\n            </div>\n        {{/btns}}\n    </div>\n    {{/header}}\n    <div class=\"ax-modal-body\" data-modal-els=\"body\">\n    {{#iframe}}\n        <div data-modal-els=\"iframe-wrap\" style=\"-webkit-overflow-scrolling: touch; overflow: auto;position: relative;\">\n            <table data-modal-els=\"iframe-loading\" style=\"width:100%;height:100%;\"><tr><td style=\"text-align: center;vertical-align: middle\">{{{iframeLoadingMsg}}}</td></tr></table>\n            <iframe name=\"{{modalId}}-frame\" src=\"\" width=\"100%\" height=\"100%\" frameborder=\"0\" data-modal-els=\"iframe\" style=\"position: absolute;left:0;top:0;\"></iframe>\n        </div>\n        <form name=\"{{modalId}}-form\" data-modal-els=\"iframe-form\">\n        <input type=\"hidden\" name=\"modalId\" value=\"{{modalId}}\" />\n        {{#param}}\n        {{#@each}}\n        <input type=\"hidden\" name=\"{{@key}}\" value=\"{{@value}}\" />\n        {{/@each}}\n        {{/param}}\n        </form>\n    {{/iframe}}\n    {{^iframe}}\n        <div data-modal-els=\"body-frame\" style=\"position: absolute;left:0;top:0;width:100%;height:100%;\"></div>\n    {{/iframe}}\n    </div>\n    {{^disableResize}}\n    <div data-ax6ui-modal-resizer=\"top\"></div>\n    <div data-ax6ui-modal-resizer=\"right\"></div>\n    <div data-ax6ui-modal-resizer=\"bottom\"></div>\n    <div data-ax6ui-modal-resizer=\"left\"></div>\n    <div data-ax6ui-modal-resizer=\"top-left\"></div>\n    <div data-ax6ui-modal-resizer=\"top-right\"></div>\n    <div data-ax6ui-modal-resizer=\"bottom-left\"></div>\n    <div data-ax6ui-modal-resizer=\"bottom-right\"></div>\n    {{/disableResize}}\n</div>";
  }
};
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
};
var getContent = function getContent(modalId, opts) {
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

  return _AX6Mustache2.default.render(tmpl.modal.call(this), data);
};
var _open = function _open(opts, callback) {
  var _this = this;

  var that = void 0;

  this.modalConfig = opts;
  this.$activeModal = (0, _jqmin2.default)(getContent.call(this, opts.id, opts));

  if (typeof callback === "undefined") {
    callback = opts.callback;
  }

  // 파트수집
  this.$ = {
    "root": this.$activeModal,
    "header": this.$activeModal.find('[data-modal-els="header"]'),
    "body": this.$activeModal.find('[data-modal-els="body"]')
  };

  if (opts.iframe) {
    this.$["iframe-wrap"] = this.$activeModal.find('[data-modal-els="iframe-wrap"]');
    this.$["iframe"] = this.$activeModal.find('[data-modal-els="iframe"]');
    this.$["iframe-form"] = this.$activeModal.find('[data-modal-els="iframe-form"]');
    this.$["iframe-loading"] = this.$activeModal.find('[data-modal-els="iframe-loading"]');
  } else {
    this.$["body-frame"] = this.$activeModal.find('[data-modal-els="body-frame"]');
  }

  (0, _jqmin2.default)(document.body).append(this.$activeModal);
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

  onStateChanged.call(this, opts, that);

  // bind key event
  if (opts.closeToEsc) {
    (0, _jqmin2.default)(window).on("keydown.ax-modal", function (e) {
      onkeyup.call(_this, e || window.event);
    });
  }

  (0, _jqmin2.default)(window).on("resize.ax-modal", function (e) {
    _this.align(null, e || window.event);
  });

  this.$.header.off(ENM["mousedown"]).off("dragstart").on(ENM["mousedown"], function (e) {
    /// 이벤트 필터링 추가 : 버튼엘리먼트로 부터 발생된 이벤트이면 moveModal 시작하지 않도록 필터링
    var isButton = _AX6Util2.default.findParentNode(e.currentTarget, function (_target) {
      if (_target.getAttribute("data-modal-header-btn")) {
        return true;
      }
    });

    if (!opts.isFullScreen && !isButton && opts.disableDrag != true) {
      _this.mousePosition = getMousePosition(e);
      moveModal.on.call(_this);
    }
    if (isButton) {
      btnOnClick.call(_this, e || window.event, opts);
    }
  }).on("dragstart", function (e) {
    _AX6Util2.default.stopEvent(e.originalEvent);
    return false;
  });

  this.$activeModal.off(ENM["mousedown"]).off("dragstart").on(ENM["mousedown"], "[data-ax6ui-modal-resizer]", function (e) {
    if (opts.disableDrag || opts.isFullScreen) return false;
    _this.mousePosition = getMousePosition(e);
    resizeModal.on.call(_this, e.currentTarget.getAttribute("data-ax6ui-modal-resizer"));
  }).on("dragstart", function (e) {
    _AX6Util2.default.stopEvent(e.originalEvent);
    return false;
  });
};
var btnOnClick = function btnOnClick(e, opts, callback, target, k) {
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
      opts.header.btns[k].onClick.call(that, that);
    }
  }

  that = null;
  opts = null;
  callback = null;
  target = null;
  k = null;
};
var onkeyup = function onkeyup(e) {
  if (e.keyCode == _AX6Info2.default.eventKeys.ESC) {
    this.close();
  }
};
var alignProcessor = {
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
};
var moveModal = {
  "on": function on() {
    var _this2 = this;

    var modalZIndex = this.$activeModal.css("z-index"),
        modalOffset = this.$activeModal.position(),
        modalBox = {
      width: this.$activeModal.outerWidth(), height: this.$activeModal.outerHeight()
    },
        windowBox = {
      width: (0, _jqmin2.default)(window).width(),
      height: (0, _jqmin2.default)(window).height(),
      scrollLeft: this.modalConfig.absolute ? 0 : (0, _jqmin2.default)(document).scrollLeft(),
      scrollTop: this.modalConfig.absolute ? 0 : (0, _jqmin2.default)(document).scrollTop()
    },
        getResizerPosition = function getResizerPosition(e) {
      this.__dx = e.clientX - this.mousePosition.clientX;
      this.__dy = e.clientY - this.mousePosition.clientY;

      if (minX > modalOffset.left + this.__dx) {
        this.__dx = -modalOffset.left;
      } else if (maxX < modalOffset.left + this.__dx) {
        this.__dx = maxX - modalOffset.left;
      }

      if (minY > modalOffset.top + this.__dy) {
        this.__dy = -modalOffset.top;
      } else if (maxY < modalOffset.top + this.__dy) {
        this.__dy = maxY - modalOffset.top;
      }

      return {
        left: modalOffset.left + this.__dx + windowBox.scrollLeft,
        top: modalOffset.top + this.__dy + windowBox.scrollTop
      };
    };

    var minX = 0,
        maxX = windowBox.width - modalBox.width,
        minY = 0,
        maxY = windowBox.height - modalBox.height;

    this.__dx = 0; // 변화량 X
    this.__dy = 0; // 변화량 Y

    // this.$resizerBg : body 가 window보다 작을 때 문제 해결을 위한 DIV
    this.$resizerBg.css({ zIndex: modalZIndex });
    this.$resizer.css({
      left: modalOffset.left + windowBox.scrollLeft,
      top: modalOffset.top + windowBox.scrollTop,
      width: modalBox.width,
      height: modalBox.height,
      zIndex: modalZIndex + 1
    });

    (0, _jqmin2.default)(document.body).append(this.$resizerBg).append(this.$resizer);

    this.$activeModal.addClass("draged");

    (0, _jqmin2.default)(document.body).on(ENM["mousemove"] + ".ax6modal-move-" + this.instanceId, _AX6Util2.default.throttle(function (e) {
      this.$resizer.css(getResizerPosition.call(this, e));
    }, 30).bind(this)).on(ENM["mouseup"] + ".ax6modal-move-" + this.instanceId, function (e) {
      moveModal.off.call(_this2);
    }).on("mouseleave.ax6modal-move-" + this.instanceId, function (e) {
      moveModal.off.call(_this2);
    });

    (0, _jqmin2.default)(document.body).attr('unselectable', 'on').css('user-select', 'none').on('selectstart', false);
  },
  "off": function off() {
    var setModalPosition = function setModalPosition() {
      var box = this.$resizer.offset();
      if (!this.modalConfig.absolute) {
        box.left -= (0, _jqmin2.default)(document).scrollLeft();
        box.top -= (0, _jqmin2.default)(document).scrollTop();
      }
      this.$activeModal.css(box);
      this.modalConfig.left = box.left;
      this.modalConfig.top = box.top;

      box = null;
    };

    this.$activeModal.removeClass("draged");
    setModalPosition.call(this);

    this.$resizer.remove();
    this.$resizer = null;
    this.$resizerBg.remove();
    this.$resizerBg = null;

    (0, _jqmin2.default)(document.body).off(ENM["mousemove"] + ".ax6modal-move-" + this.instanceId).off(ENM["mouseup"] + ".ax6modal-move-" + this.instanceId).off("mouseleave.ax6modal-move-" + this.instanceId);

    (0, _jqmin2.default)(document.body).removeAttr('unselectable').css('user-select', 'auto').off('selectstart');

    onStateChanged.call(this, this.modalConfig, {
      self: this,
      state: "move"
    });
  }
};
var resizeModal = {
  "on": function on(resizerType) {
    var _this3 = this;

    var modalZIndex = this.$activeModal.css("z-index"),
        modalOffset = this.$activeModal.position(),
        modalBox = {
      width: this.$activeModal.outerWidth(), height: this.$activeModal.outerHeight()
    },
        windowBox = {
      width: (0, _jqmin2.default)(window).width(),
      height: (0, _jqmin2.default)(window).height(),
      scrollLeft: this.modalConfig.absolute ? 0 : (0, _jqmin2.default)(document).scrollLeft(),
      scrollTop: this.modalConfig.absolute ? 0 : (0, _jqmin2.default)(document).scrollTop()
    },
        resizerProcessor = {
      "top": function top(e) {

        if (minHeight > modalBox.height - this.__dy) {
          this.__dy = modalBox.height - minHeight;
        }

        if (e.shiftKey) {

          if (minHeight > modalBox.height - this.__dy * 2) {
            this.__dy = (modalBox.height - minHeight) / 2;
          }

          return {
            left: modalOffset.left,
            top: modalOffset.top + this.__dy,
            width: modalBox.width,
            height: modalBox.height - this.__dy * 2
          };
        } else if (e.altKey) {

          if (minHeight > modalBox.height - this.__dy * 2) {
            this.__dy = (modalBox.height - minHeight) / 2;
          }

          return {
            left: modalOffset.left + this.__dy,
            top: modalOffset.top + this.__dy,
            width: modalBox.width - this.__dy * 2,
            height: modalBox.height - this.__dy * 2
          };
        } else {
          return {
            left: modalOffset.left,
            top: modalOffset.top + this.__dy,
            width: modalBox.width,
            height: modalBox.height - this.__dy
          };
        }
      },
      "bottom": function bottom(e) {

        if (minHeight > modalBox.height + this.__dy) {
          this.__dy = -modalBox.height + minHeight;
        }

        if (e.shiftKey) {

          if (minHeight > modalBox.height + this.__dy * 2) {
            this.__dy = (-modalBox.height + minHeight) / 2;
          }

          return {
            left: modalOffset.left,
            top: modalOffset.top - this.__dy,
            width: modalBox.width,
            height: modalBox.height + this.__dy * 2
          };
        } else if (e.altKey) {

          if (minHeight > modalBox.height + this.__dy * 2) {
            this.__dy = (-modalBox.height + minHeight) / 2;
          }

          return {
            left: modalOffset.left - this.__dy,
            top: modalOffset.top - this.__dy,
            width: modalBox.width + this.__dy * 2,
            height: modalBox.height + this.__dy * 2
          };
        } else {
          return {
            left: modalOffset.left,
            top: modalOffset.top,
            width: modalBox.width,
            height: modalBox.height + this.__dy
          };
        }
      },
      "left": function left(e) {

        if (minWidth > modalBox.width - this.__dx) {
          this.__dx = modalBox.width - minWidth;
        }

        if (e.shiftKey) {

          if (minWidth > modalBox.width - this.__dx * 2) {
            this.__dx = (modalBox.width - minWidth) / 2;
          }

          return {
            left: modalOffset.left + this.__dx,
            top: modalOffset.top,
            width: modalBox.width - this.__dx * 2,
            height: modalBox.height
          };
        } else if (e.altKey) {

          if (minWidth > modalBox.width - this.__dx * 2) {
            this.__dx = (modalBox.width - minWidth) / 2;
          }

          return {
            left: modalOffset.left + this.__dx,
            top: modalOffset.top + this.__dx,
            width: modalBox.width - this.__dx * 2,
            height: modalBox.height - this.__dx * 2
          };
        } else {
          return {
            left: modalOffset.left + this.__dx,
            top: modalOffset.top,
            width: modalBox.width - this.__dx,
            height: modalBox.height
          };
        }
      },
      "right": function right(e) {

        if (minWidth > modalBox.width + this.__dx) {
          this.__dx = -modalBox.width + minWidth;
        }

        if (e.shiftKey) {

          if (minWidth > modalBox.width + this.__dx * 2) {
            this.__dx = (-modalBox.width + minWidth) / 2;
          }

          return {
            left: modalOffset.left - this.__dx,
            top: modalOffset.top,
            width: modalBox.width + this.__dx * 2,
            height: modalBox.height
          };
        } else if (e.altKey) {

          if (minWidth > modalBox.width + this.__dx * 2) {
            this.__dx = (-modalBox.width + minWidth) / 2;
          }

          return {
            left: modalOffset.left - this.__dx,
            top: modalOffset.top - this.__dx,
            width: modalBox.width + this.__dx * 2,
            height: modalBox.height + this.__dx * 2
          };
        } else {
          return {
            left: modalOffset.left,
            top: modalOffset.top,
            width: modalBox.width + this.__dx,
            height: modalBox.height
          };
        }
      },
      "top-left": function topLeft(e) {

        if (minWidth > modalBox.width - this.__dx) {
          this.__dx = modalBox.width - minWidth;
        }

        if (minHeight > modalBox.height - this.__dy) {
          this.__dy = modalBox.height - minHeight;
        }

        if (e.shiftKey || e.altKey) {

          if (minHeight > modalBox.height - this.__dy * 2) {
            this.__dy = (modalBox.height - minHeight) / 2;
          }
          if (minWidth > modalBox.width - this.__dx * 2) {
            this.__dx = (modalBox.width - minWidth) / 2;
          }

          return {
            left: modalOffset.left + this.__dx,
            top: modalOffset.top + this.__dy,
            width: modalBox.width - this.__dx * 2,
            height: modalBox.height - this.__dy * 2
          };
        } else {

          if (minHeight > modalBox.height - this.__dy * 2) {
            this.__dy = (modalBox.height - minHeight) / 2;
          }
          if (minWidth > modalBox.width - this.__dx * 2) {
            this.__dx = (modalBox.width - minWidth) / 2;
          }

          return {
            left: modalOffset.left + this.__dx,
            top: modalOffset.top + this.__dy,
            width: modalBox.width - this.__dx,
            height: modalBox.height - this.__dy
          };
        }
      },
      "top-right": function topRight(e) {

        if (minWidth > modalBox.width + this.__dx) {
          this.__dx = -modalBox.width + minWidth;
        }

        if (minHeight > modalBox.height - this.__dy) {
          this.__dy = modalBox.height - minHeight;
        }

        if (e.shiftKey || e.altKey) {

          if (minHeight > modalBox.height - this.__dy * 2) {
            this.__dy = (modalBox.height - minHeight) / 2;
          }
          if (minWidth > modalBox.width + this.__dx * 2) {
            this.__dx = (-modalBox.width + minWidth) / 2;
          }

          return {
            left: modalOffset.left - this.__dx,
            top: modalOffset.top + this.__dy,
            width: modalBox.width + this.__dx * 2,
            height: modalBox.height - this.__dy * 2
          };
        } else {
          return {
            left: modalOffset.left,
            top: modalOffset.top + this.__dy,
            width: modalBox.width + this.__dx,
            height: modalBox.height - this.__dy
          };
        }
      },
      "bottom-left": function bottomLeft(e) {

        if (minWidth > modalBox.width - this.__dx) {
          this.__dx = modalBox.width - minWidth;
        }

        if (minHeight > modalBox.height + this.__dy) {
          this.__dy = -modalBox.height + minHeight;
        }

        if (e.shiftKey || e.altKey) {
          if (minWidth > modalBox.width - this.__dx * 2) {
            this.__dx = (modalBox.width - minWidth) / 2;
          }
          if (minHeight > modalBox.height + this.__dy * 2) {
            this.__dy = (-modalBox.height + minHeight) / 2;
          }
          return {
            left: modalOffset.left + this.__dx,
            top: modalOffset.top - this.__dy,
            width: modalBox.width - this.__dx * 2,
            height: modalBox.height + this.__dy * 2
          };
        } else {
          return {
            left: modalOffset.left + this.__dx,
            top: modalOffset.top,
            width: modalBox.width - this.__dx,
            height: modalBox.height + this.__dy
          };
        }
      },
      "bottom-right": function bottomRight(e) {

        if (minWidth > modalBox.width + this.__dx) {
          this.__dx = -modalBox.width + minWidth;
        }

        if (minHeight > modalBox.height + this.__dy) {
          this.__dy = -modalBox.height + minHeight;
        }

        if (e.shiftKey || e.altKey) {
          if (minWidth > modalBox.width + this.__dx * 2) {
            this.__dx = (-modalBox.width + minWidth) / 2;
          }
          if (minHeight > modalBox.height + this.__dy * 2) {
            this.__dy = (-modalBox.height + minHeight) / 2;
          }
          return {
            left: modalOffset.left - this.__dx,
            top: modalOffset.top - this.__dy,
            width: modalBox.width + this.__dx * 2,
            height: modalBox.height + this.__dy * 2
          };
        } else {
          return {
            left: modalOffset.left,
            top: modalOffset.top,
            width: modalBox.width + this.__dx,
            height: modalBox.height + this.__dy
          };
        }
      }
    },
        getResizerPosition = function getResizerPosition(e) {
      this.__dx = e.clientX - this.mousePosition.clientX;
      this.__dy = e.clientY - this.mousePosition.clientY;

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

    this.__dx = 0; // 변화량 X
    this.__dy = 0; // 변화량 Y

    // this.$resizerBg : body 가 window보다 작을 때 문제 해결을 위한 DIV
    this.$resizerBg.css({
      zIndex: modalZIndex,
      cursor: cursorType[resizerType]
    });
    this.$resizer.css({
      left: modalOffset.left,
      top: modalOffset.top,
      width: modalBox.width,
      height: modalBox.height,
      zIndex: modalZIndex + 1,
      cursor: cursorType[resizerType]
    });

    (0, _jqmin2.default)(document.body).append(this.$resizerBg).append(this.$resizer);

    this.$activeModal.addClass("draged");

    (0, _jqmin2.default)(document.body).on(ENM["mousemove"] + ".ax6modal-resize-" + this.instanceId, _AX6Util2.default.throttle(function (e) {
      this.$resizer.css(getResizerPosition.call(e));
    }, 30).bind(this)).on(ENM["mouseup"] + ".ax6modal-resize-" + this.instanceId, function (e) {
      resizeModal.off.call(_this3);
    }).on("mouseleave.ax6modal-resize-" + this.instanceId, function (e) {
      resizeModal.off.call(_this3);
    });

    (0, _jqmin2.default)(document.body).attr('unselectable', 'on').css('user-select', 'none').bind('selectstart', false);
  },
  "off": function off() {
    var setModalPosition = function setModalPosition() {
      var box = this.$resizer.offset();
      _jqmin2.default.extend(box, {
        width: this.$resizer.width(),
        height: this.$resizer.height()
      });
      if (!this.modalConfig.absolute) {
        box.left -= (0, _jqmin2.default)(document).scrollLeft();
        box.top -= (0, _jqmin2.default)(document).scrollTop();
      }
      this.$activeModal.css(box);

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

    this.$activeModal.removeClass("draged");
    setModalPosition.call(this);

    this.$resizer.remove();
    this.$resizerBg.remove();

    onStateChanged.call(this, this.modalConfig, {
      self: this,
      state: "resize"
    });

    (0, _jqmin2.default)(document.body).off(ENM["mousemove"] + ".ax6modal-resize-" + this.instanceId).off(ENM["mouseup"] + ".ax6modal-resize-" + this.instanceId).off("mouseleave.ax6modal-resize-" + this.instanceId);

    (0, _jqmin2.default)(document.body).removeAttr('unselectable').css('user-select', 'auto').off('selectstart');
  }
};
/* ~~~~~~~~~~~~~~~~~~ end of private  ~~~~~~~~~~~~~~~~~~~~ */

/**
 * @class
 */

var AX6UIModal = function (_AX6UICore) {
  _inherits(AX6UIModal, _AX6UICore);

  /**
   * @constructor
   * @param config
   */
  function AX6UIModal(config) {
    _classCallCheck(this, AX6UIModal);

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
    var _this4 = _possibleConstructorReturn(this, (AX6UIModal.__proto__ || Object.getPrototypeOf(AX6UIModal)).call(this));

    _this4.config = {
      id: 'ax6ui-modal-' + _this4.instanceId,
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
    _jqmin2.default.extend(true, _this4.config, config);

    // 멤버 변수 초기화
    /**
     * 열려있는 상태에서 다시 open이 되면 queue에 보관 하였다가 close후 open
     * @member {Array}
     */
    _this4.queue = [];
    /**
     * @member {jQueryElement}
     */
    _this4.$activeModal = null;
    _this4.$ = {};

    _this4.$resizerBg = (0, _jqmin2.default)('<div data-ax6ui-modal-resizer-background="" ondragstart="return false;"></div>');
    _this4.$resizer = (0, _jqmin2.default)('<div data-ax6ui-modal-resizer="" ondragstart="return false;"></div>');

    if (typeof config !== "undefined") _this4.init();
    return _this4;
  }

  /**
   * @method
   */


  _createClass(AX6UIModal, [{
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

    /**
     * open the modal
     * @method
     * @returns {AX6UIModal}
     * @example
     * ```
     * modal.open();
     * modal.open({
               *  width: 500,
               *  height: 500
               * });
     * moaal.open({}, function(){
               *  console.log(this);
               * });
     * ```
     */

  }, {
    key: "open",
    value: function open(opts, callback) {
      if (typeof opts === "undefined") {
        opts = {};
      }

      opts = _jqmin2.default.extend(true, {}, this.config, opts);

      if (this.$activeModal) {
        opts.callback = callback;
        this.queue.push(opts);
      } else {
        _open.call(this, opts, callback);
      }

      return this;
    }

    /**
     * close the modal
     * @method
     * @param _option
     * @returns {AX6UIModal}
     * @example
     * ```
     * modal.close();
     * modal.close({callback: function(){
       *  // on close event
       * });
       * // close 함수에 callback을 전달하면 정확한 close 타이밍을 캐치할 수 있습니다
       * ```
       */

  }, {
    key: "close",
    value: function close(_option) {
      var opts = void 0,
          that = void 0;

      if (this.$activeModal) {
        opts = this.modalConfig;

        this.$activeModal.addClass("destroy");
        (0, _jqmin2.default)(window).off("keydown.ax-modal").off("resize.ax-modal");

        setTimeout(function () {
          // 프레임 제거
          if (opts.iframe) {
            var $iframe = this.$["iframe"]; // iframe jQuery Object
            if ($iframe) {
              var iframeObject = $iframe.get(0),
                  idoc = iframeObject.contentDocument ? iframeObject.contentDocument : iframeObject.contentWindow.document;

              try {
                $(idoc.body).children().each(function () {
                  $(this).remove();
                });
              } catch (e) {}
              idoc.innerHTML = "";
              $iframe.attr('src', 'about:blank').remove();

              // force garbarge collection for IE only
              window.CollectGarbage && window.CollectGarbage();
            }
          }

          if (this.$activeModal) {
            this.$activeModal.remove();
            this.$activeModal = null;
          }

          that = {
            self: this,
            id: opts.id,
            theme: opts.theme,
            width: opts.width,
            height: opts.height,
            state: "close",
            $: this.$
          };

          if (_option && _AX6Util2.default.isFunction(_option.callback)) {
            _option.callback.call(that, that);
          } else if (opts.callback && (!_option || !_option.doNotCallback)) {
            opts.callback.call(that, that);
          }

          if (opts && opts.onStateChanged) {
            opts.onStateChanged.call(that, that);
          } else if (this.onStateChanged) {
            this.onStateChanged.call(that, that);
          }

          // 열려야 할 큐가 남아 있다면 큐아이템으로 다시 open
          if (this.queue && this.queue.length) {
            _open.call(this, this.queue.shift());
          }

          opts = null;
          that = null;
        }.bind(this), this.config.animateTime);
      }

      this.minimized = false; // hoksi

      return this;
    }
  }, {
    key: "minimize",


    /**
     * @method
     * @returns {AX6UIModal}
     */
    value: function minimize(minimizePosition) {
      if (this.minimized !== true) {

        var opts = this.modalConfig;
        if (typeof minimizePosition === "undefined") minimizePosition = cfg.minimizePosition;

        this.minimized = true;
        this.$.body.css({ display: "none" });
        this.modalConfig.originalHeight = opts.height;
        this.modalConfig.height = 0;
        alignProcessor[minimizePosition].call(this);

        onStateChanged.call(this, opts, {
          self: this,
          state: "minimize"
        });
      }

      return this;
    }
  }, {
    key: "restore",


    /**
     * @method ax5modal.restore
     * @returns {AX6UIModal}
     */
    value: function restore() {
      var opts = this.modalConfig;
      if (this.minimized) {
        this.minimized = false;
        this.$.body.css({ display: "block" });
        this.modalConfig.height = this.modalConfig.originalHeight;
        this.modalConfig.originalHeight = undefined;

        this.align({ left: "center", top: "middle" });
        onStateChanged.call(this, opts, {
          self: this,
          state: "restore"
        });
      }
      return this;
    }
  }, {
    key: "css",


    /**
     * setCSS
     * @method ax5modal.css
     * @param {Object} css -
     * @returns {AX6UIModal}
     */
    value: function css(_css) {
      if (this.$activeModal && !this.fullScreen) {
        this.$activeModal.css(_css);
        if (typeof _css.width !== "undefined") {
          this.modalConfig.width = _css.width;
        }
        if (typeof _css.height !== "undefined") {
          this.modalConfig.height = _css.height;
        }

        this.align();
      }
      return this;
    }
  }, {
    key: "setModalConfig",


    /**
     * @method
     * @param _config
     * @returns {AX6UIModal}
     */
    value: function setModalConfig(_config) {
      this.modalConfig = _jqmin2.default.extend({}, this.modalConfig, _config);
      this.align();
      return this;
    }
  }, {
    key: "align",


    /**
     * @method ax5modal.align
     * @param position
     * @param e
     * @returns {ax5modal}
     * @example
     * ```js
     * modal.align({left:"center", top:"middle"});
     * modal.align({left:"left", top:"top", margin: 20});
     * ```
     */
    value: function align(position, e) {
      if (!this.$activeModal) return this;

      var opts = this.modalConfig,
          box = {
        width: opts.width,
        height: opts.height
      };

      var fullScreen = opts.isFullScreen = function (_fullScreen) {
        if (typeof _fullScreen === "undefined") {
          return false;
        } else if (_AX6Util2.default.isFunction(_fullScreen)) {
          return _fullScreen();
        }
      }(opts.fullScreen);

      if (fullScreen) {
        if (opts.header) this.$.header.show();
        if (opts.header) {
          opts.headerHeight = this.$.header.outerHeight();
          box.height += opts.headerHeight;
        } else {
          opts.headerHeight = 0;
        }
        box.width = (0, _jqmin2.default)(window).width();
        box.height = opts.height;
        box.left = 0;
        box.top = 0;
      } else {
        if (opts.header) this.$.header.show();
        if (position) {
          _jqmin2.default.extend(true, opts.position, position);
        }

        if (opts.header) {
          opts.headerHeight = this.$.header.outerHeight();
          box.height += opts.headerHeight;
        } else {
          opts.headerHeight = 0;
        }

        //- position 정렬
        if (opts.position.left == "left") {
          box.left = opts.position.margin || 0;
        } else if (opts.position.left == "right") {
          // window.innerWidth;
          box.left = (0, _jqmin2.default)(window).width() - box.width - (opts.position.margin || 0);
        } else if (opts.position.left == "center") {
          box.left = (0, _jqmin2.default)(window).width() / 2 - box.width / 2;
        } else {
          box.left = opts.position.left || 0;
        }

        if (opts.position.top == "top") {
          box.top = opts.position.margin || 0;
        } else if (opts.position.top == "bottom") {
          box.top = (0, _jqmin2.default)(window).height() - box.height - (opts.position.margin || 0);
        } else if (opts.position.top == "middle") {
          box.top = (0, _jqmin2.default)(window).height() / 2 - box.height / 2;
        } else {
          box.top = opts.position.top || 0;
        }
        if (box.left < 0) box.left = 0;
        if (box.top < 0) box.top = 0;
      }

      this.$activeModal.css(box);
      this.$["body"].css({ height: box.height - (opts.headerHeight || 0) });

      if (opts.iframe) {
        this.$["iframe-wrap"].css({ height: box.height - opts.headerHeight });
        this.$["iframe"].css({ height: box.height - opts.headerHeight });
      } else {}
      return this;
    }
  }]);

  return AX6UIModal;
}(_AX6UICore3.default);

exports.default = AX6UIModal;

/***/ }),

/***/ 106:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(107);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../samples/node_modules/css-loader/index.js!../../samples/node_modules/sass-loader/lib/loader.js!./style.scss", function() {
			var newContent = require("!!../../samples/node_modules/css-loader/index.js!../../samples/node_modules/sass-loader/lib/loader.js!./style.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 107:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "@-webkit-keyframes ax-modal {\n  0% {\n    opacity: 0.0;\n    -webkit-transform: scale(0.8); }\n  100% {\n    opacity: 1.0;\n    -webkit-transform: scale(1); } }\n\n@-moz-keyframes ax-modal {\n  0% {\n    opacity: 0.0;\n    -moz-transform: scale(0.8); }\n  100% {\n    opacity: 1.0;\n    -moz-transform: scale(1); } }\n\n@keyframes ax-modal {\n  0% {\n    opacity: 0.0;\n    -webkit-transform: scale(0.8);\n    -moz-transform: scale(0.8);\n    -ms-transform: scale(0.8);\n    -o-transform: scale(0.8);\n    transform: scale(0.8); }\n  100% {\n    opacity: 1.0;\n    -webkit-transform: scale(1);\n    -moz-transform: scale(1);\n    -ms-transform: scale(1);\n    -o-transform: scale(1);\n    transform: scale(1); } }\n\n@-webkit-keyframes ax-modal-destroy {\n  100% {\n    opacity: 0.0;\n    -webkit-transform: translateY(20%); }\n  0% {\n    opacity: 1.0;\n    -webkit-transform: translateY(0); } }\n\n@-moz-keyframes ax-modal-destroy {\n  100% {\n    opacity: 0.0;\n    -moz-transform: translateY(20%); }\n  0% {\n    opacity: 1.0;\n    -moz-transform: translateY(0); } }\n\n@keyframes ax-modal-destroy {\n  100% {\n    opacity: 0.0;\n    -webkit-transform: translateY(20%);\n    -moz-transform: translateY(20%);\n    -ms-transform: translateY(20%);\n    -o-transform: translateY(20%);\n    transform: translateY(20%); }\n  0% {\n    opacity: 1.0;\n    -webkit-transform: translateY(0);\n    -moz-transform: translateY(0);\n    -ms-transform: translateY(0);\n    -o-transform: translateY(0);\n    transform: translateY(0); } }\n\n@-webkit-keyframes ax-modal-fullscreen {\n  0% {\n    -webkit-transform: translateY(20%); }\n  100% {\n    -webkit-transform: translateY(0); } }\n\n@-moz-keyframes ax-modal-fullscreen {\n  0% {\n    -moz-transform: translateY(20%); }\n  100% {\n    -moz-transform: translateY(0); } }\n\n@keyframes ax-modal-fullscreen {\n  0% {\n    -webkit-transform: translateY(20%);\n    -moz-transform: translateY(20%);\n    -ms-transform: translateY(20%);\n    -o-transform: translateY(20%);\n    transform: translateY(20%); }\n  100% {\n    -webkit-transform: translateY(0);\n    -moz-transform: translateY(0);\n    -ms-transform: translateY(0);\n    -o-transform: translateY(0);\n    transform: translateY(0); } }\n\n@-webkit-keyframes ax-modal-fullscreen-destroy {\n  0% {\n    -webkit-transform: translateY(0); }\n  100% {\n    -webkit-transform: translateY(100%); } }\n\n@-moz-keyframes ax-modal-fullscreen-destroy {\n  0% {\n    -moz-transform: translateY(0); }\n  100% {\n    -moz-transform: translateY(100%); } }\n\n@keyframes ax-modal-fullscreen-destroy {\n  0% {\n    -webkit-transform: translateY(0);\n    -moz-transform: translateY(0);\n    -ms-transform: translateY(0);\n    -o-transform: translateY(0);\n    transform: translateY(0); }\n  100% {\n    -webkit-transform: translateY(100%);\n    -moz-transform: translateY(100%);\n    -ms-transform: translateY(100%);\n    -o-transform: translateY(100%);\n    transform: translateY(100%); } }\n\n@-webkit-keyframes ax-modal-fade-in {\n  0% {\n    opacity: 0.0; }\n  100% {\n    opacity: 1.0; } }\n\n@-moz-keyframes ax-modal-fade-in {\n  0% {\n    opacity: 0.0; }\n  100% {\n    opacity: 1.0; } }\n\n@keyframes ax-modal-fade-in {\n  0% {\n    opacity: 0.0; }\n  100% {\n    opacity: 1.0; } }\n\n@-webkit-keyframes ax-modal-fade-out {\n  0% {\n    opacity: 1.0; }\n  100% {\n    opacity: 0.0; } }\n\n@-moz-keyframes ax-modal-fade-out {\n  0% {\n    opacity: 1.0; }\n  100% {\n    opacity: 0.0; } }\n\n@keyframes ax-modal-fade-out {\n  0% {\n    opacity: 1.0; }\n  100% {\n    opacity: 0.0; } }\n\n[data-ax6ui-modal] {\n  -webkit-animation: ax-modal 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;\n  -moz-animation: ax-modal 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;\n  animation: ax-modal 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;\n  -webkit-transform: translateZ(0px);\n  -moz-transform: translateZ(0px);\n  -ms-transform: translateZ(0px);\n  -o-transform: translateZ(0px);\n  transform: translateZ(0px);\n  background-color: #fff;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.6);\n  z-index: 2000;\n  position: fixed;\n  left: 0px;\n  top: 0px;\n  box-sizing: content-box; }\n  [data-ax6ui-modal] * {\n    box-sizing: border-box; }\n  [data-ax6ui-modal] *:before,\n  [data-ax6ui-modal] *:after {\n    box-sizing: border-box; }\n  [data-ax6ui-modal] *,\n  [data-ax6ui-modal] *:before,\n  [data-ax6ui-modal] *:after {\n    box-sizing: border-box; }\n  [data-ax6ui-modal] .ax-modal-header {\n    user-select: none;\n    font-weight: 600;\n    padding: 10px 15px;\n    border-bottom: 1px solid transparent;\n    border-top-left-radius: 4px;\n    border-top-right-radius: 4px;\n    cursor: move; }\n    [data-ax6ui-modal] .ax-modal-header .ax-modal-header-addon {\n      position: absolute;\n      right: 0px;\n      top: 0px;\n      padding: 10px 10px; }\n      [data-ax6ui-modal] .ax-modal-header .ax-modal-header-addon [data-modal-header-btn] {\n        border: 0;\n        padding: 0px 2px;\n        background: transparent;\n        display: inline-block;\n        text-align: center;\n        cursor: pointer;\n        outline: 0; }\n  [data-ax6ui-modal] .ax-modal-body {\n    border-bottom-left-radius: 4px;\n    border-bottom-right-radius: 4px;\n    padding: 0px;\n    text-align: center;\n    -webkit-box-flex: 1;\n    -moz-box-flex: 1;\n    box-flex: 1;\n    -webkit-flex: 1;\n    -moz-flex: 1;\n    -ms-flex: 1;\n    flex: 1;\n    position: relative;\n    overflow: hidden; }\n    [data-ax6ui-modal] .ax-modal-body iframe {\n      border: 0 none; }\n    [data-ax6ui-modal] .ax-modal-body .fadeIn {\n      -webkit-animation: ax-modal-fade-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;\n      -moz-animation: ax-modal-fade-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;\n      animation: ax-modal-fade-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }\n    [data-ax6ui-modal] .ax-modal-body .fadeOut {\n      -webkit-animation: ax-modal-fade-out 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;\n      -moz-animation: ax-modal-fade-out 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;\n      animation: ax-modal-fade-out 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }\n  [data-ax6ui-modal] .ax-modal-header {\n    color: #333;\n    background: #f5f5f5; }\n    [data-ax6ui-modal] .ax-modal-header .ax-modal-header-addon a {\n      color: #333;\n      outline: 0; }\n  [data-ax6ui-modal].destroy {\n    -webkit-animation: ax-modal-destroy 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;\n    -moz-animation: ax-modal-destroy 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;\n    animation: ax-modal-destroy 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }\n  [data-ax6ui-modal].fullscreen {\n    border: 0px none;\n    border-radius: 0px;\n    box-shadow: none;\n    -webkit-animation: ax-modal-fullscreen 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;\n    -moz-animation: ax-modal-fullscreen 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;\n    animation: ax-modal-fullscreen 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }\n    [data-ax6ui-modal].fullscreen.destroy {\n      -webkit-animation: ax-modal-fullscreen-destroy 0.3s cubic-bezier(0.19, 1, 0.22, 1) forwards;\n      -moz-animation: ax-modal-fullscreen-destroy 0.3s cubic-bezier(0.19, 1, 0.22, 1) forwards;\n      animation: ax-modal-fullscreen-destroy 0.3s cubic-bezier(0.19, 1, 0.22, 1) forwards; }\n  [data-ax6ui-modal].draged .ax-modal-header {\n    opacity: 0.5; }\n  [data-ax6ui-modal].draged .ax-modal-body {\n    opacity: 0.5; }\n  [data-ax6ui-modal] [data-ax6modal-resizer] {\n    position: absolute;\n    display: block; }\n    [data-ax6ui-modal] [data-ax6modal-resizer]:before {\n      position: absolute;\n      content: ' ';\n      display: block;\n      width: auto;\n      height: auto;\n      left: auto;\n      top: auto;\n      right: auto;\n      bottom: auto; }\n    [data-ax6ui-modal] [data-ax6modal-resizer][data-ax6modal-resizer=\"top\"] {\n      left: 0;\n      top: 0;\n      width: 100%;\n      height: 0; }\n      [data-ax6ui-modal] [data-ax6modal-resizer][data-ax6modal-resizer=\"top\"]:before {\n        width: 100%;\n        height: 8px;\n        left: 0;\n        top: -4px;\n        cursor: row-resize; }\n    [data-ax6ui-modal] [data-ax6modal-resizer][data-ax6modal-resizer=\"bottom\"] {\n      left: 0;\n      bottom: 0;\n      width: 100%;\n      height: 0; }\n      [data-ax6ui-modal] [data-ax6modal-resizer][data-ax6modal-resizer=\"bottom\"]:before {\n        width: 100%;\n        height: 8px;\n        left: 0;\n        top: -4px;\n        cursor: row-resize; }\n    [data-ax6ui-modal] [data-ax6modal-resizer][data-ax6modal-resizer=\"left\"] {\n      left: 0;\n      top: 0;\n      width: 0;\n      height: 100%; }\n      [data-ax6ui-modal] [data-ax6modal-resizer][data-ax6modal-resizer=\"left\"]:before {\n        width: 8px;\n        height: 100%;\n        left: -4px;\n        top: 0;\n        cursor: col-resize; }\n    [data-ax6ui-modal] [data-ax6modal-resizer][data-ax6modal-resizer=\"right\"] {\n      right: 0;\n      top: 0;\n      width: 0;\n      height: 100%; }\n      [data-ax6ui-modal] [data-ax6modal-resizer][data-ax6modal-resizer=\"right\"]:before {\n        width: 8px;\n        height: 100%;\n        left: -4px;\n        top: 0;\n        cursor: col-resize; }\n    [data-ax6ui-modal] [data-ax6modal-resizer][data-ax6modal-resizer=\"top-left\"] {\n      left: 0;\n      top: 0;\n      width: 0;\n      height: 0; }\n      [data-ax6ui-modal] [data-ax6modal-resizer][data-ax6modal-resizer=\"top-left\"]:before {\n        width: 8px;\n        height: 8px;\n        left: -4px;\n        top: -4px;\n        cursor: nwse-resize; }\n    [data-ax6ui-modal] [data-ax6modal-resizer][data-ax6modal-resizer=\"top-right\"] {\n      right: 0;\n      top: 0;\n      width: 0;\n      height: 0; }\n      [data-ax6ui-modal] [data-ax6modal-resizer][data-ax6modal-resizer=\"top-right\"]:before {\n        width: 8px;\n        height: 8px;\n        left: -4px;\n        top: -4px;\n        cursor: nesw-resize; }\n    [data-ax6ui-modal] [data-ax6modal-resizer][data-ax6modal-resizer=\"bottom-left\"] {\n      left: 0;\n      bottom: 0;\n      width: 0;\n      height: 0; }\n      [data-ax6ui-modal] [data-ax6modal-resizer][data-ax6modal-resizer=\"bottom-left\"]:before {\n        width: 8px;\n        height: 8px;\n        left: -4px;\n        top: -4px;\n        cursor: nesw-resize; }\n    [data-ax6ui-modal] [data-ax6modal-resizer][data-ax6modal-resizer=\"bottom-right\"] {\n      right: 0;\n      bottom: 0;\n      width: 0;\n      height: 0; }\n      [data-ax6ui-modal] [data-ax6modal-resizer][data-ax6modal-resizer=\"bottom-right\"]:before {\n        width: 8px;\n        height: 8px;\n        left: -4px;\n        top: -4px;\n        cursor: nwse-resize; }\n\n[data-ax6ui-modal-resizer-background] {\n  position: fixed;\n  left: 0px;\n  top: 0px;\n  width: 100%;\n  height: 100%;\n  background: transparent;\n  z-index: 2000;\n  cursor: move; }\n\n[data-ax6ui-modal-resizer] {\n  position: absolute;\n  left: 0;\n  top: 0;\n  z-index: 2001;\n  cursor: move;\n  box-sizing: border-box;\n  background-color: #ccc;\n  border: 1px solid #ff0000;\n  opacity: 0.3;\n  border-radius: 4px;\n  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.6); }\n", ""]);

// exports


/***/ }),

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jqmin = __webpack_require__(6);

var _jqmin2 = _interopRequireDefault(_jqmin);

var _AX6UIModal = __webpack_require__(105);

var _AX6UIModal2 = _interopRequireDefault(_AX6UIModal);

__webpack_require__(106);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var html = "\n<a class=\"waves-effect waves-light btn\" data-btn=\"modal\">modal</a>\n";
var fn = {
  moduleRun: function moduleRun($body) {

    var _modal = new _AX6UIModal2.default();
    _modal.setConfig({});

    $body.on("click", '[data-btn]', function (e) {
      var btn = e.currentTarget.getAttribute("data-btn");
      var processor = {
        modal: function modal() {
          _modal.open({
            position: {
              left: "center",
              top: "middle",
              margin: 10
            },
            width: 800,
            height: 600,
            disableDrag: false,
            fullScreen: function fullScreen() {
              return (0, _jqmin2.default)(window).width() < 600;
            }
          }, function () {
            this.$.body.append('<h1>div contents</h1>');
          });
        }
      };

      if (btn in processor) {
        processor[btn]();
      }
    });
  },
  moduleDestroy: function moduleDestroy($body) {
    $body.off("click");
  }
};

exports.default = {
  html: html,
  fn: fn
};

/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 * https://github.com/thomasJang/mustache.js -- imporove some variables
 */

/**
 * AX6Mustache는 http://github.com/janl/mustache.js에 몇가지 최소한의 기능을 튜닝하여 사용하는 템플릿 엔진입니다.
 * @namespace AX6Mustache
 */

/**
 * @method AX6Mustache.render
 * @example
 * ```js
 * ax5.mustache.render(template, view)
 *
 *
 * //Array @i
 * //{{#beatles}}
 * //{{firstName}} {{lastName}} ({{@i}}) ({{@first}})
 * //{{/beatles}}
 *
 * //Object @each
 * {{#beatles}}
 *  {{#@each}}
 *      {{@key}} : {{@value.firstName}} {{@value.lastName}}
 *  {{/@each}}
 * {{/beatles}}
 *
 * ```
 */

var AX6 = {};

(function defineMustache(global, factory) {

  factory(global.mustache = {});
})(AX6, function mustacheFactory(mustache) {

  var objectToString = Object.prototype.toString;
  var isArray = Array.isArray || function isArrayPolyfill(object) {
    return objectToString.call(object) === '[object Array]';
  };

  function isFunction(object) {
    return typeof object === 'function';
  }

  /**
   * More correct typeof string handling array
   * which normally returns typeof 'object'
   */
  function typeStr(obj) {
    return isArray(obj) ? 'array' : typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
  }

  function escapeRegExp(string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
  }

  /**
   * Null safe way of checking whether or not an object,
   * including its prototype, has a given property
   */
  function hasProperty(obj, propName) {
    return obj != null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && propName in obj;
  }

  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
  // See https://github.com/janl/mustache.js/issues/189
  var regExpTest = RegExp.prototype.test;

  function testRegExp(re, string) {
    return regExpTest.call(re, string);
  }

  var nonSpaceRe = /\S/;

  function isWhitespace(string) {
    return !testRegExp(nonSpaceRe, string);
  }

  var entityMap = {
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '/': '&#x2F;'
  };

  function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function fromEntityMap(s) {
      return entityMap[s];
    });
  }

  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var equalsRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;

  /**
   * Breaks up the given `template` string into a tree of tokens. If the `tags`
   * argument is given here it must be an array with two string values: the
   * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
   * course, the default is to use mustaches (i.e. mustache.tags).
   *
   * A token is an array with at least 4 elements. The first element is the
   * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
   * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
   * all text that appears outside a symbol this element is "text".
   *
   * The second element of a token is its "value". For mustache tags this is
   * whatever else was inside the tag besides the opening symbol. For text tokens
   * this is the text itself.
   *
   * The third and fourth elements of the token are the start and end indices,
   * respectively, of the token in the original template.
   *
   * Tokens that are the root node of a subtree contain two more elements: 1) an
   * array of tokens in the subtree and 2) the index in the original template at
   * which the closing tag for that section begins.
   */
  function parseTemplate(template, tags) {
    if (!template) return [];

    var sections = []; // Stack to hold section tokens
    var tokens = []; // Buffer to hold the tokens
    var spaces = []; // Indices of whitespace tokens on the current line
    var hasTag = false; // Is there a {{tag}} on the current line?
    var nonSpace = false; // Is there a non-space char on the current line?

    // Strips all whitespace tokens array for the current line
    // if there was a {{#tag}} on it and otherwise only space.
    function stripSpace() {
      if (hasTag && !nonSpace) {
        while (spaces.length) {
          delete tokens[spaces.pop()];
        }
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    }

    var openingTagRe, closingTagRe, closingCurlyRe;

    function compileTags(tagsToCompile) {
      if (typeof tagsToCompile === 'string') tagsToCompile = tagsToCompile.split(spaceRe, 2);

      if (!isArray(tagsToCompile) || tagsToCompile.length !== 2) throw new Error('Invalid tags: ' + tagsToCompile);

      openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + '\\s*');
      closingTagRe = new RegExp('\\s*' + escapeRegExp(tagsToCompile[1]));
      closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tagsToCompile[1]));
    }

    compileTags(tags || mustache.tags);

    var scanner = new Scanner(template);

    var start, type, value, chr, token, openSection;
    while (!scanner.eos()) {
      start = scanner.pos;

      // Match any text between tags.
      value = scanner.scanUntil(openingTagRe);

      if (value) {
        for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
          chr = value.charAt(i);

          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
          } else {
            nonSpace = true;
          }

          tokens.push(['text', chr, start, start + 1]);
          start += 1;

          // Check for whitespace on the current line.
          if (chr === '\n') stripSpace();
        }
      }

      // Match the opening tag.
      if (!scanner.scan(openingTagRe)) break;

      hasTag = true;

      // Get the tag type.
      type = scanner.scan(tagRe) || 'name';
      scanner.scan(whiteRe);

      // Get the tag value.
      if (type === '=') {
        value = scanner.scanUntil(equalsRe);
        scanner.scan(equalsRe);
        scanner.scanUntil(closingTagRe);
      } else if (type === '{') {
        value = scanner.scanUntil(closingCurlyRe);
        scanner.scan(curlyRe);
        scanner.scanUntil(closingTagRe);
        type = '&';
      } else {
        value = scanner.scanUntil(closingTagRe);
      }

      // Match the closing tag.
      if (!scanner.scan(closingTagRe)) throw new Error('Unclosed tag at ' + scanner.pos);

      token = [type, value, start, scanner.pos];
      tokens.push(token);

      if (type === '#' || type === '^') {
        sections.push(token);
      } else if (type === '/') {
        // Check section nesting.
        openSection = sections.pop();

        if (!openSection) throw new Error('Unopened section "' + value + '" at ' + start);

        if (openSection[1] !== value) throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
      } else if (type === 'name' || type === '{' || type === '&') {
        nonSpace = true;
      } else if (type === '=') {
        // Set the tags for the next time around.
        compileTags(value);
      }
    }

    // Make sure there are no open sections when we're done.
    openSection = sections.pop();

    if (openSection) throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);

    return nestTokens(squashTokens(tokens));
  }

  /**
   * Combines the values of consecutive text tokens in the given `tokens` array
   * to a single token.
   */
  function squashTokens(tokens) {
    var squashedTokens = [];

    var token, lastToken;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];

      if (token) {
        if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
          lastToken[1] += token[1];
          lastToken[3] = token[3];
        } else {
          squashedTokens.push(token);
          lastToken = token;
        }
      }
    }

    return squashedTokens;
  }

  /**
   * Forms the given array of `tokens` into a nested tree structure where
   * tokens that represent a section have two additional items: 1) an array of
   * all tokens that appear in that section and 2) the index in the original
   * template that represents the end of that section.
   */
  function nestTokens(tokens) {
    var nestedTokens = [];
    var collector = nestedTokens;
    var sections = [];

    var token, section;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];

      switch (token[0]) {
        case '#':
        case '^':
          collector.push(token);
          sections.push(token);
          collector = token[4] = [];
          break;
        case '/':
          section = sections.pop();
          section[5] = token[2];
          collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
          break;
        default:
          collector.push(token);
      }
    }

    return nestedTokens;
  }

  /**
   * A simple string scanner that is used by the template parser to find
   * tokens in template strings.
   */
  function Scanner(string) {
    this.string = string;
    this.tail = string;
    this.pos = 0;
  }

  /**
   * Returns `true` if the tail is empty (end of string).
   */
  Scanner.prototype.eos = function eos() {
    return this.tail === '';
  };

  /**
   * Tries to match the given regular expression at the current position.
   * Returns the matched text if it can match, the empty string otherwise.
   */
  Scanner.prototype.scan = function scan(re) {
    var match = this.tail.match(re);

    if (!match || match.index !== 0) return '';

    var string = match[0];

    this.tail = this.tail.substring(string.length);
    this.pos += string.length;

    return string;
  };

  /**
   * Skips all text until the given regular expression can be matched. Returns
   * the skipped string, which is the entire tail if no match can be made.
   */
  Scanner.prototype.scanUntil = function scanUntil(re) {
    var index = this.tail.search(re),
        match;

    switch (index) {
      case -1:
        match = this.tail;
        this.tail = '';
        break;
      case 0:
        match = '';
        break;
      default:
        match = this.tail.substring(0, index);
        this.tail = this.tail.substring(index);
    }

    this.pos += match.length;

    return match;
  };

  /**
   * Represents a rendering context by wrapping a view object and
   * maintaining a reference to the parent context.
   */
  function Context(view, parentContext) {
    this.view = view;
    this.cache = {
      '.': this.view,
      '@each': function each() {
        var returns = [];
        for (var k in this) {
          returns.push({ '@key': k, '@value': this[k] });
        }
        return returns;
      }
    };
    this.parent = parentContext;
  }

  /**
   * Creates a new context using the given view with this context
   * as the parent.
   */
  Context.prototype.push = function push(view) {
    return new Context(view, this);
  };

  /**
   * Returns the value of the given name in this context, traversing
   * up the context hierarchy if the value is absent in this context's view.
   */
  Context.prototype.lookup = function lookup(name) {
    var cache = this.cache;

    var value;
    if (cache.hasOwnProperty(name)) {
      value = cache[name];
    } else {
      var context = this,
          names,
          index,
          lookupHit = false;

      while (context) {
        if (name.indexOf('.') > 0) {
          value = context.view;
          names = name.split('.');
          index = 0;

          /**
           * Using the dot notion path in `name`, we descend through the
           * nested objects.
           *
           * To be certain that the lookup has been successful, we have to
           * check if the last object in the path actually has the property
           * we are looking for. We store the result in `lookupHit`.
           *
           * This is specially necessary for when the value has been set to
           * `undefined` and we want to avoid looking up parent contexts.
           **/
          while (value != null && index < names.length) {
            if (index === names.length - 1) lookupHit = hasProperty(value, names[index]);

            value = value[names[index++]];
          }
        } else {
          value = context.view[name];
          lookupHit = hasProperty(context.view, name);
        }

        if (lookupHit) break;

        context = context.parent;
      }

      cache[name] = value;
    }

    if (isFunction(value)) value = value.call(this.view);

    return value;
  };

  /**
   * A Writer knows how to take a stream of tokens and render them to a
   * string, given a context. It also maintains a cache of templates to
   * avoid the need to parse the same template twice.
   */
  function Writer() {
    this.cache = {};
  }

  /**
   * Clears all cached templates in this writer.
   */
  Writer.prototype.clearCache = function clearCache() {
    this.cache = {};
  };

  /**
   * Parses and caches the given `template` and returns the array of tokens
   * that is generated from the parse.
   */
  Writer.prototype.parse = function parse(template, tags) {
    var cache = this.cache;
    var tokens = cache[template];

    if (tokens == null) tokens = cache[template] = parseTemplate(template, tags);

    return tokens;
  };

  /**
   * High-level method that is used to render the given `template` with
   * the given `view`.
   *
   * The optional `partials` argument may be an object that contains the
   * names and templates of partials that are used in the template. It may
   * also be a function that is used to load partial templates on the fly
   * that takes a single argument: the name of the partial.
   */
  Writer.prototype.render = function render(template, view, partials) {
    var tokens = this.parse(template);
    var context = view instanceof Context ? view : new Context(view);
    return this.renderTokens(tokens, context, partials, template);
  };

  /**
   * Low-level method that renders the given array of `tokens` using
   * the given `context` and `partials`.
   *
   * Note: The `originalTemplate` is only ever used to extract the portion
   * of the original template that was contained in a higher-order section.
   * If the template doesn't use higher-order sections, this argument may
   * be omitted.
   */
  Writer.prototype.renderTokens = function renderTokens(tokens, context, partials, originalTemplate) {
    var buffer = '';
    var token, symbol, value;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      value = undefined;
      token = tokens[i];
      symbol = token[0];

      if (symbol === '#') value = this.renderSection(token, context, partials, originalTemplate);else if (symbol === '^') value = this.renderInverted(token, context, partials, originalTemplate);else if (symbol === '>') value = this.renderPartial(token, context, partials, originalTemplate);else if (symbol === '&') value = this.unescapedValue(token, context);else if (symbol === 'name') value = this.escapedValue(token, context);else if (symbol === 'text') value = this.rawValue(token);

      if (value !== undefined) buffer += value;
    }

    return buffer;
  };

  Writer.prototype.renderSection = function renderSection(token, context, partials, originalTemplate) {
    var self = this;
    var buffer = '';

    var value = context.lookup(token[1]);

    // This function is used to render an arbitrary template
    // in the current context by higher-order sections.
    function subRender(template) {
      return self.render(template, context, partials);
    }

    if (!value) return;

    if (isArray(value)) {
      for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
        if (value[j]) {
          if (_typeof(value[j]) === 'object') {
            value[j]['@i'] = j;
            value[j]['@first'] = j === 0;
          }

          buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate);
        }
      }
    } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' || typeof value === 'string' || typeof value === 'number') {
      buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate);
    } else if (isFunction(value)) {
      if (typeof originalTemplate !== 'string') throw new Error('Cannot use higher-order sections without the original template');

      // Extract the portion of the original template that the section contains.
      value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);

      if (value != null) buffer += value;
    } else {
      buffer += this.renderTokens(token[4], context, partials, originalTemplate);
    }
    return buffer;
  };

  Writer.prototype.renderInverted = function renderInverted(token, context, partials, originalTemplate) {
    var value = context.lookup(token[1]);

    // Use JavaScript's definition of falsy. Include empty arrays.
    // See https://github.com/janl/mustache.js/issues/186
    if (!value || isArray(value) && value.length === 0) return this.renderTokens(token[4], context, partials, originalTemplate);
  };

  Writer.prototype.renderPartial = function renderPartial(token, context, partials) {
    if (!partials) return;

    var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
    if (value != null) return this.renderTokens(this.parse(value), context, partials, value);
  };

  Writer.prototype.unescapedValue = function unescapedValue(token, context) {
    var value = context.lookup(token[1]);
    if (value != null) return value;
  };

  Writer.prototype.escapedValue = function escapedValue(token, context) {
    var value = context.lookup(token[1]);
    if (value != null) return mustache.escape(value);
  };

  Writer.prototype.rawValue = function rawValue(token) {
    return token[1];
  };

  mustache.name = 'mustache.js';
  mustache.version = '2.1.3';
  mustache.tags = ['{{', '}}'];

  // All high-level mustache.* functions use this writer.
  var defaultWriter = new Writer();

  /**
   * Clears all cached templates in the default writer.
   */
  mustache.clearCache = function clearCache() {
    return defaultWriter.clearCache();
  };

  /**
   * Parses and caches the given template in the default writer and returns the
   * array of tokens it contains. Doing this ahead of time avoids the need to
   * parse templates on the fly as they are rendered.
   */
  mustache.parse = function parse(template, tags) {
    return defaultWriter.parse(template, tags);
  };

  /**
   * Renders the `template` with the given `view` and `partials` using the
   * default writer.
   */
  mustache.render = function render(template, view, partials) {
    if (typeof template !== 'string') {
      throw new TypeError('Invalid template! Template should be a "string" ' + 'but "' + typeStr(template) + '" was given as the first ' + 'argument for mustache#render(template, view, partials)');
    }

    return defaultWriter.render(template, view, partials);
  };

  // This is here for backwards compatibility with 0.4.x.,
  /*eslint-disable */ // eslint wants camel cased function name
  mustache.to_html = function to_html(template, view, partials, send) {
    /*eslint-enable*/

    var result = mustache.render(template, view, partials);

    if (isFunction(send)) {
      send(result);
    } else {
      return result;
    }
  };

  // Export the escaping function so that the user may override it.
  // See https://github.com/janl/mustache.js/issues/244
  mustache.escape = escapeHtml;

  // Export these mainly for testing, but also for advanced usage.
  mustache.Scanner = Scanner;
  mustache.Context = Context;
  mustache.Writer = Writer;
});

exports.default = AX6.mustache;

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vc3JjL0FYNlVJTW9kYWwuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9BWDZVSU1vZGFsL3N0eWxlLnNjc3M/NjQ1MCIsIndlYnBhY2s6Ly8vLi4vc3JjL0FYNlVJTW9kYWwvc3R5bGUuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvbW9kYWwuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9BWDZNdXN0YWNoZS5qcyJdLCJuYW1lcyI6WyJ0bXBsIiwibW9kYWwiLCJFTk0iLCJzdXBwb3J0VG91Y2giLCJnZXRNb3VzZVBvc2l0aW9uIiwiZSIsIm1vdXNlT2JqIiwiY2hhbmdlZFRvdWNoZXMiLCJjbGllbnRYIiwiY2xpZW50WSIsIm9uU3RhdGVDaGFuZ2VkIiwib3B0cyIsInRoYXQiLCJldmVudFByb2Nlc3NvciIsIm9uUmVzaXplIiwiY2FsbCIsInN0YXRlIiwiZ2V0Q29udGVudCIsIm1vZGFsSWQiLCJkYXRhIiwidGhlbWUiLCJoZWFkZXIiLCJmdWxsU2NyZWVuIiwic3R5bGVzIiwiaWZyYW1lIiwiaWZyYW1lTG9hZGluZ01zZyIsImRpc2FibGVSZXNpemUiLCJ6SW5kZXgiLCJhYnNvbHV0ZSIsInBhcmFtIiwiYXg1IiwidXRpbCIsInJlbmRlciIsIm9wZW4iLCJjYWxsYmFjayIsIm1vZGFsQ29uZmlnIiwiJGFjdGl2ZU1vZGFsIiwiaWQiLCIkIiwiZmluZCIsImRvY3VtZW50IiwiYm9keSIsImFwcGVuZCIsImFsaWduIiwic2VsZiIsIndpZHRoIiwiaGVpZ2h0IiwiY3NzIiwiYXR0ciIsIm1ldGhvZCIsInVybCIsIm9uIiwiaGlkZSIsImJpbmQiLCJzaG93Iiwic3VibWl0IiwiY2xvc2VUb0VzYyIsIndpbmRvdyIsIm9ua2V5dXAiLCJldmVudCIsIm9mZiIsImlzQnV0dG9uIiwiZmluZFBhcmVudE5vZGUiLCJjdXJyZW50VGFyZ2V0IiwiX3RhcmdldCIsImdldEF0dHJpYnV0ZSIsImlzRnVsbFNjcmVlbiIsImRpc2FibGVEcmFnIiwibW91c2VQb3NpdGlvbiIsIm1vdmVNb2RhbCIsImJ0bk9uQ2xpY2siLCJzdG9wRXZlbnQiLCJvcmlnaW5hbEV2ZW50IiwicmVzaXplTW9kYWwiLCJ0YXJnZXQiLCJrIiwic3JjRWxlbWVudCIsImtleSIsInZhbHVlIiwiYnRucyIsImRpYWxvZ0lkIiwiYnRuVGFyZ2V0Iiwib25DbGljayIsImtleUNvZGUiLCJldmVudEtleXMiLCJFU0MiLCJjbG9zZSIsImFsaWduUHJvY2Vzc29yIiwibGVmdCIsInRvcCIsIm1vZGFsWkluZGV4IiwibW9kYWxPZmZzZXQiLCJwb3NpdGlvbiIsIm1vZGFsQm94Iiwib3V0ZXJXaWR0aCIsIm91dGVySGVpZ2h0Iiwid2luZG93Qm94Iiwic2Nyb2xsTGVmdCIsInNjcm9sbFRvcCIsImdldFJlc2l6ZXJQb3NpdGlvbiIsIl9fZHgiLCJfX2R5IiwibWluWCIsIm1heFgiLCJtaW5ZIiwibWF4WSIsIiRyZXNpemVyQmciLCIkcmVzaXplciIsImFkZENsYXNzIiwiaW5zdGFuY2VJZCIsInRocm90dGxlIiwic2V0TW9kYWxQb3NpdGlvbiIsImJveCIsIm9mZnNldCIsInJlbW92ZUNsYXNzIiwicmVtb3ZlIiwicmVtb3ZlQXR0ciIsInJlc2l6ZXJUeXBlIiwicmVzaXplclByb2Nlc3NvciIsIm1pbkhlaWdodCIsInNoaWZ0S2V5IiwiYWx0S2V5IiwibWluV2lkdGgiLCJjdXJzb3JUeXBlIiwiY3Vyc29yIiwiZXh0ZW5kIiwiaGVhZGVySGVpZ2h0IiwiQVg2VUlNb2RhbCIsImNvbmZpZyIsIm1hcmdpbiIsIm1pbmltaXplUG9zaXRpb24iLCJjbGlja0V2ZW50TmFtZSIsImRvY3VtZW50RWxlbWVudCIsImFuaW1hdGVUaW1lIiwicXVldWUiLCJpbml0IiwiaW5pdE9uY2UiLCJpbml0aWFsaXplZCIsInB1c2giLCJfb3B0aW9uIiwic2V0VGltZW91dCIsIiRpZnJhbWUiLCJpZnJhbWVPYmplY3QiLCJnZXQiLCJpZG9jIiwiY29udGVudERvY3VtZW50IiwiY29udGVudFdpbmRvdyIsImNoaWxkcmVuIiwiZWFjaCIsImlubmVySFRNTCIsIkNvbGxlY3RHYXJiYWdlIiwiaXNGdW5jdGlvbiIsImRvTm90Q2FsbGJhY2siLCJsZW5ndGgiLCJzaGlmdCIsIm1pbmltaXplZCIsImNmZyIsImRpc3BsYXkiLCJvcmlnaW5hbEhlaWdodCIsInVuZGVmaW5lZCIsIl9jb25maWciLCJfZnVsbFNjcmVlbiIsImh0bWwiLCJmbiIsIm1vZHVsZVJ1biIsIiRib2R5Iiwic2V0Q29uZmlnIiwiYnRuIiwicHJvY2Vzc29yIiwibW9kdWxlRGVzdHJveSIsIkFYNiIsImRlZmluZU11c3RhY2hlIiwiZ2xvYmFsIiwiZmFjdG9yeSIsIm11c3RhY2hlIiwibXVzdGFjaGVGYWN0b3J5Iiwib2JqZWN0VG9TdHJpbmciLCJPYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImlzQXJyYXkiLCJBcnJheSIsImlzQXJyYXlQb2x5ZmlsbCIsIm9iamVjdCIsInR5cGVTdHIiLCJvYmoiLCJlc2NhcGVSZWdFeHAiLCJzdHJpbmciLCJyZXBsYWNlIiwiaGFzUHJvcGVydHkiLCJwcm9wTmFtZSIsInJlZ0V4cFRlc3QiLCJSZWdFeHAiLCJ0ZXN0IiwidGVzdFJlZ0V4cCIsInJlIiwibm9uU3BhY2VSZSIsImlzV2hpdGVzcGFjZSIsImVudGl0eU1hcCIsImVzY2FwZUh0bWwiLCJTdHJpbmciLCJmcm9tRW50aXR5TWFwIiwicyIsIndoaXRlUmUiLCJzcGFjZVJlIiwiZXF1YWxzUmUiLCJjdXJseVJlIiwidGFnUmUiLCJwYXJzZVRlbXBsYXRlIiwidGVtcGxhdGUiLCJ0YWdzIiwic2VjdGlvbnMiLCJ0b2tlbnMiLCJzcGFjZXMiLCJoYXNUYWciLCJub25TcGFjZSIsInN0cmlwU3BhY2UiLCJwb3AiLCJvcGVuaW5nVGFnUmUiLCJjbG9zaW5nVGFnUmUiLCJjbG9zaW5nQ3VybHlSZSIsImNvbXBpbGVUYWdzIiwidGFnc1RvQ29tcGlsZSIsInNwbGl0IiwiRXJyb3IiLCJzY2FubmVyIiwiU2Nhbm5lciIsInN0YXJ0IiwidHlwZSIsImNociIsInRva2VuIiwib3BlblNlY3Rpb24iLCJlb3MiLCJwb3MiLCJzY2FuVW50aWwiLCJpIiwidmFsdWVMZW5ndGgiLCJjaGFyQXQiLCJzY2FuIiwibmVzdFRva2VucyIsInNxdWFzaFRva2VucyIsInNxdWFzaGVkVG9rZW5zIiwibGFzdFRva2VuIiwibnVtVG9rZW5zIiwibmVzdGVkVG9rZW5zIiwiY29sbGVjdG9yIiwic2VjdGlvbiIsInRhaWwiLCJtYXRjaCIsImluZGV4Iiwic3Vic3RyaW5nIiwic2VhcmNoIiwiQ29udGV4dCIsInZpZXciLCJwYXJlbnRDb250ZXh0IiwiY2FjaGUiLCJyZXR1cm5zIiwicGFyZW50IiwibG9va3VwIiwibmFtZSIsImhhc093blByb3BlcnR5IiwiY29udGV4dCIsIm5hbWVzIiwibG9va3VwSGl0IiwiaW5kZXhPZiIsIldyaXRlciIsImNsZWFyQ2FjaGUiLCJwYXJzZSIsInBhcnRpYWxzIiwicmVuZGVyVG9rZW5zIiwib3JpZ2luYWxUZW1wbGF0ZSIsImJ1ZmZlciIsInN5bWJvbCIsInJlbmRlclNlY3Rpb24iLCJyZW5kZXJJbnZlcnRlZCIsInJlbmRlclBhcnRpYWwiLCJ1bmVzY2FwZWRWYWx1ZSIsImVzY2FwZWRWYWx1ZSIsInJhd1ZhbHVlIiwic3ViUmVuZGVyIiwiaiIsInNsaWNlIiwiZXNjYXBlIiwidmVyc2lvbiIsImRlZmF1bHRXcml0ZXIiLCJUeXBlRXJyb3IiLCJ0b19odG1sIiwic2VuZCIsInJlc3VsdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFDQTs7QUFFQSxJQUFJQSxPQUFPO0FBQ1RDLE9BRFMsbUJBQ0Q7QUFDTjtBQTRDRDtBQTlDUSxDQUFYO0FBZ0RBLElBQUlDLE1BQU07QUFDUixlQUFjLGtCQUFLQyxZQUFOLEdBQXNCLFlBQXRCLEdBQXFDLFdBRDFDO0FBRVIsZUFBYyxrQkFBS0EsWUFBTixHQUFzQixXQUF0QixHQUFvQyxXQUZ6QztBQUdSLGFBQVksa0JB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RixHQVhEOztBQWFBO0FBQ0E7QUFDQWxILFdBQVM0RyxNQUFULEdBQWtCbkYsVUFBbEI7O0FBRUE7QUFDQXpCLFdBQVNvRCxPQUFULEdBQW1CQSxPQUFuQjtBQUNBcEQsV0FBUzhFLE9BQVQsR0FBbUJBLE9BQW5CO0FBQ0E5RSxXQUFTMkYsTUFBVCxHQUFrQkEsTUFBbEI7QUFFRCxDQWhvQkEsQ0FBRDs7a0JBa29CZS9GLElBQUlJLFEiLCJmaWxlIjoiNy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBqUXVlcnkgZnJvbSBcImpxbWluXCI7XG5pbXBvcnQgQVg2VUlDb3JlIGZyb20gXCIuL0FYNlVJQ29yZS5qc1wiO1xuaW1wb3J0IFUgZnJvbSBcIi4vQVg2VXRpbFwiO1xuaW1wb3J0IGluZm8gZnJvbSBcIi4vQVg2SW5mb1wiO1xuaW1wb3J0IG11c3RhY2hlIGZyb20gXCIuL0FYNk11c3RhY2hlXCI7XG4vKiB+fn5+fn5+fn5+fn5+fn5+fn4gZW5kIG9mIGltcG9ydCAgfn5+fn5+fn5+fn5+fn5+fn5+fn4gKi9cblxubGV0IHRtcGwgPSB7XG4gIG1vZGFsKCkge1xuICAgIHJldHVybiBgIFxuPGRpdiBkYXRhLWF4NnVpLW1vZGFsPVwie3ttb2RhbElkfX1cIiBkYXRhLW1vZGFsLWVscz1cInJvb3RcIiBjbGFzcz1cInt7dGhlbWV9fSB7e2Z1bGxzY3JlZW59fVwiIHN0eWxlPVwie3tzdHlsZXN9fVwiPlxuICAgIHt7I2hlYWRlcn19XG4gICAgPGRpdiBjbGFzcz1cImF4LW1vZGFsLWhlYWRlclwiIGRhdGEtbW9kYWwtZWxzPVwiaGVhZGVyXCI+XG4gICAgICAgIHt7e3RpdGxlfX19XG4gICAgICAgIHt7I2J0bnN9fVxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImF4LW1vZGFsLWhlYWRlci1hZGRvblwiPlxuICAgICAgICAgICAge3sjQGVhY2h9fVxuICAgICAgICAgICAgPGJ1dHRvbiB0YWJpbmRleD1cIi0xXCIgZGF0YS1tb2RhbC1oZWFkZXItYnRuPVwie3tAa2V5fX1cIiBjbGFzcz1cInt7QHZhbHVlLnRoZW1lfX1cIj57e3tAdmFsdWUubGFiZWx9fX08L2J1dHRvbj5cbiAgICAgICAgICAgIHt7L0BlYWNofX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICB7ey9idG5zfX1cbiAgICA8L2Rpdj5cbiAgICB7ey9oZWFkZXJ9fVxuICAgIDxkaXYgY2xhc3M9XCJheC1tb2RhbC1ib2R5XCIgZGF0YS1tb2RhbC1lbHM9XCJib2R5XCI+XG4gICAge3sjaWZyYW1lfX1cbiAgICAgICAgPGRpdiBkYXRhLW1vZGFsLWVscz1cImlmcmFtZS13cmFwXCIgc3R5bGU9XCItd2Via2l0LW92ZXJmbG93LXNjcm9sbGluZzogdG91Y2g7IG92ZXJmbG93OiBhdXRvO3Bvc2l0aW9uOiByZWxhdGl2ZTtcIj5cbiAgICAgICAgICAgIDx0YWJsZSBkYXRhLW1vZGFsLWVscz1cImlmcmFtZS1sb2FkaW5nXCIgc3R5bGU9XCJ3aWR0aDoxMDAlO2hlaWdodDoxMDAlO1wiPjx0cj48dGQgc3R5bGU9XCJ0ZXh0LWFsaWduOiBjZW50ZXI7dmVydGljYWwtYWxpZ246IG1pZGRsZVwiPnt7e2lmcmFtZUxvYWRpbmdNc2d9fX08L3RkPjwvdHI+PC90YWJsZT5cbiAgICAgICAgICAgIDxpZnJhbWUgbmFtZT1cInt7bW9kYWxJZH19LWZyYW1lXCIgc3JjPVwiXCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIGZyYW1lYm9yZGVyPVwiMFwiIGRhdGEtbW9kYWwtZWxzPVwiaWZyYW1lXCIgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7bGVmdDowO3RvcDowO1wiPjwvaWZyYW1lPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGZvcm0gbmFtZT1cInt7bW9kYWxJZH19LWZvcm1cIiBkYXRhLW1vZGFsLWVscz1cImlmcmFtZS1mb3JtXCI+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cIm1vZGFsSWRcIiB2YWx1ZT1cInt7bW9kYWxJZH19XCIgLz5cbiAgICAgICAge3sjcGFyYW19fVxuICAgICAgICB7eyNAZWFjaH19XG4gICAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cInt7QGtleX19XCIgdmFsdWU9XCJ7e0B2YWx1ZX19XCIgLz5cbiAgICAgICAge3svQGVhY2h9fVxuICAgICAgICB7ey9wYXJhbX19XG4gICAgICAgIDwvZm9ybT5cbiAgICB7ey9pZnJhbWV9fVxuICAgIHt7XmlmcmFtZX19XG4gICAgICAgIDxkaXYgZGF0YS1tb2RhbC1lbHM9XCJib2R5LWZyYW1lXCIgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7bGVmdDowO3RvcDowO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7XCI+PC9kaXY+XG4gICAge3svaWZyYW1lfX1cbiAgICA8L2Rpdj5cbiAgICB7e15kaXNhYmxlUmVzaXplfX1cbiAgICA8ZGl2IGRhdGEtYXg2dWktbW9kYWwtcmVzaXplcj1cInRvcFwiPjwvZGl2PlxuICAgIDxkaXYgZGF0YS1heDZ1aS1tb2RhbC1yZXNpemVyPVwicmlnaHRcIj48L2Rpdj5cbiAgICA8ZGl2IGRhdGEtYXg2dWktbW9kYWwtcmVzaXplcj1cImJvdHRvbVwiPjwvZGl2PlxuICAgIDxkaXYgZGF0YS1heDZ1aS1tb2RhbC1yZXNpemVyPVwibGVmdFwiPjwvZGl2PlxuICAgIDxkaXYgZGF0YS1heDZ1aS1tb2RhbC1yZXNpemVyPVwidG9wLWxlZnRcIj48L2Rpdj5cbiAgICA8ZGl2IGRhdGEtYXg2dWktbW9kYWwtcmVzaXplcj1cInRvcC1yaWdodFwiPjwvZGl2PlxuICAgIDxkaXYgZGF0YS1heDZ1aS1tb2RhbC1yZXNpemVyPVwiYm90dG9tLWxlZnRcIj48L2Rpdj5cbiAgICA8ZGl2IGRhdGEtYXg2dWktbW9kYWwtcmVzaXplcj1cImJvdHRvbS1yaWdodFwiPjwvZGl2PlxuICAgIHt7L2Rpc2FibGVSZXNpemV9fVxuPC9kaXY+YDtcbiAgfVxufTtcbmxldCBFTk0gPSB7XG4gIFwibW91c2Vkb3duXCI6IChpbmZvLnN1cHBvcnRUb3VjaCkgPyBcInRvdWNoc3RhcnRcIiA6IFwibW91c2Vkb3duXCIsXG4gIFwibW91c2Vtb3ZlXCI6IChpbmZvLnN1cHBvcnRUb3VjaCkgPyBcInRvdWNobW92ZVwiIDogXCJtb3VzZW1vdmVcIixcbiAgXCJtb3VzZXVwXCI6IChpbmZvLnN1cHBvcnRUb3VjaCkgPyBcInRvdWNoZW5kXCIgOiBcIm1vdXNldXBcIlxufTtcblxuY29uc3QgZ2V0TW91c2VQb3NpdGlvbiA9IGZ1bmN0aW9uIChlKSB7XG4gIGxldCBtb3VzZU9iaiA9IGU7XG4gIGlmICgnY2hhbmdlZFRvdWNoZXMnIGluIGUgJiYgZS5jaGFuZ2VkVG91Y2hlcykge1xuICAgIG1vdXNlT2JqID0gZS5jaGFuZ2VkVG91Y2hlc1swXTtcbiAgfVxuICByZXR1cm4ge1xuICAgIGNsaWVudFg6IG1vdXNlT2JqLmNsaWVudFgsXG4gICAgY2xpZW50WTogbW91c2VPYmouY2xpZW50WVxuICB9XG59O1xuY29uc3Qgb25TdGF0ZUNoYW5nZWQgPSBmdW5jdGlvbiAob3B0cywgdGhhdCkge1xuICBjb25zdCBldmVudFByb2Nlc3NvciA9IHtcbiAgICBcInJlc2l6ZVwiOiBmdW5jdGlvbiAodGhhdCkge1xuICAgICAgaWYgKG9wdHMgJiYgb3B0cy5vblJlc2l6ZSkge1xuICAgICAgICBvcHRzLm9uUmVzaXplLmNhbGwodGhhdCwgdGhhdCk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0aGlzLm9uUmVzaXplKSB7XG4gICAgICAgIHRoaXMub25SZXNpemUuY2FsbCh0aGF0LCB0aGF0KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFwibW92ZVwiOiBmdW5jdGlvbiAoKSB7XG5cbiAgICB9XG4gIH07XG4gIGlmICh0aGF0LnN0YXRlIGluIGV2ZW50UHJvY2Vzc29yKSB7XG4gICAgZXZlbnRQcm9jZXNzb3JbdGhhdC5zdGF0ZV0uY2FsbCh0aGlzLCB0aGF0KTtcbiAgfVxuXG4gIGlmIChvcHRzICYmIG9wdHMub25TdGF0ZUNoYW5nZWQpIHtcbiAgICBvcHRzLm9uU3RhdGVDaGFuZ2VkLmNhbGwodGhhdCwgdGhhdCk7XG4gIH1cbiAgZWxzZSBpZiAodGhpcy5vblN0YXRlQ2hhbmdlZCkge1xuICAgIHRoaXMub25TdGF0ZUNoYW5nZWQuY2FsbCh0aGF0LCB0aGF0KTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn07XG5jb25zdCBnZXRDb250ZW50ID0gZnVuY3Rpb24gKG1vZGFsSWQsIG9wdHMpIHtcbiAgbGV0IGRhdGEgPSB7XG4gICAgbW9kYWxJZDogbW9kYWxJZCxcbiAgICB0aGVtZTogb3B0cy50aGVtZSxcbiAgICBoZWFkZXI6IG9wdHMuaGVhZGVyLFxuICAgIGZ1bGxTY3JlZW46IChvcHRzLmZ1bGxTY3JlZW4gPyBcImZ1bGxzY3JlZW5cIiA6IFwiXCIpLFxuICAgIHN0eWxlczogXCJcIixcbiAgICBpZnJhbWU6IG9wdHMuaWZyYW1lLFxuICAgIGlmcmFtZUxvYWRpbmdNc2c6IG9wdHMuaWZyYW1lTG9hZGluZ01zZyxcbiAgICBkaXNhYmxlUmVzaXplOiBvcHRzLmRpc2FibGVSZXNpemVcbiAgfTtcblxuICBpZiAob3B0cy56SW5kZXgpIHtcbiAgICBkYXRhLnN0eWxlcyArPSBcInotaW5kZXg6XCIgKyBvcHRzLnpJbmRleCArIFwiO1wiO1xuICB9XG4gIGlmIChvcHRzLmFic29sdXRlKSB7XG4gICAgZGF0YS5zdHlsZXMgKz0gXCJwb3NpdGlvbjphYnNvbHV0ZTtcIjtcbiAgfVxuXG4gIGlmIChkYXRhLmlmcmFtZSAmJiB0eXBlb2YgZGF0YS5pZnJhbWUucGFyYW0gPT09IFwic3RyaW5nXCIpIHtcbiAgICBkYXRhLmlmcmFtZS5wYXJhbSA9IGF4NS51dGlsLnBhcmFtKGRhdGEuaWZyYW1lLnBhcmFtKTtcbiAgfVxuXG4gIHJldHVybiBtdXN0YWNoZS5yZW5kZXIodG1wbC5tb2RhbC5jYWxsKHRoaXMpLCBkYXRhKTtcbn07XG5jb25zdCBvcGVuID0gZnVuY3Rpb24gKG9wdHMsIGNhbGxiYWNrKSB7XG4gIGxldCB0aGF0O1xuXG4gIHRoaXMubW9kYWxDb25maWcgPSBvcHRzO1xuICB0aGlzLiRhY3RpdmVNb2RhbCA9IGpRdWVyeShnZXRDb250ZW50LmNhbGwodGhpcywgb3B0cy5pZCwgb3B0cykpO1xuXG4gIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjYWxsYmFjayA9IG9wdHMuY2FsbGJhY2s7XG4gIH1cblxuICAvLyDtjIztirjsiJjsp5FcbiAgdGhpcy4kID0ge1xuICAgIFwicm9vdFwiOiB0aGlzLiRhY3RpdmVNb2RhbCxcbiAgICBcImhlYWRlclwiOiB0aGlzLiRhY3RpdmVNb2RhbC5maW5kKCdbZGF0YS1tb2RhbC1lbHM9XCJoZWFkZXJcIl0nKSxcbiAgICBcImJvZHlcIjogdGhpcy4kYWN0aXZlTW9kYWwuZmluZCgnW2RhdGEtbW9kYWwtZWxzPVwiYm9keVwiXScpXG4gIH07XG5cbiAgaWYgKG9wdHMuaWZyYW1lKSB7XG4gICAgdGhpcy4kW1wiaWZyYW1lLXdyYXBcIl0gPSB0aGlzLiRhY3RpdmVNb2RhbC5maW5kKCdbZGF0YS1tb2RhbC1lbHM9XCJpZnJhbWUtd3JhcFwiXScpO1xuICAgIHRoaXMuJFtcImlmcmFtZVwiXSA9IHRoaXMuJGFjdGl2ZU1vZGFsLmZpbmQoJ1tkYXRhLW1vZGFsLWVscz1cImlmcmFtZVwiXScpO1xuICAgIHRoaXMuJFtcImlmcmFtZS1mb3JtXCJdID0gdGhpcy4kYWN0aXZlTW9kYWwuZmluZCgnW2RhdGEtbW9kYWwtZWxzPVwiaWZyYW1lLWZvcm1cIl0nKTtcbiAgICB0aGlzLiRbXCJpZnJhbWUtbG9hZGluZ1wiXSA9IHRoaXMuJGFjdGl2ZU1vZGFsLmZpbmQoJ1tkYXRhLW1vZGFsLWVscz1cImlmcmFtZS1sb2FkaW5nXCJdJyk7XG4gIH1cbiAgZWxzZSB7XG4gICAgdGhpcy4kW1wiYm9keS1mcmFtZVwiXSA9IHRoaXMuJGFjdGl2ZU1vZGFsLmZpbmQoJ1tkYXRhLW1vZGFsLWVscz1cImJvZHktZnJhbWVcIl0nKTtcbiAgfVxuXG4gIGpRdWVyeShkb2N1bWVudC5ib2R5KS5hcHBlbmQodGhpcy4kYWN0aXZlTW9kYWwpO1xuICAvLy0gcG9zaXRpb24g7KCV66CsXG4gIHRoaXMuYWxpZ24oKTtcblxuICB0aGF0ID0ge1xuICAgIHNlbGY6IHRoaXMsXG4gICAgaWQ6IG9wdHMuaWQsXG4gICAgdGhlbWU6IG9wdHMudGhlbWUsXG4gICAgd2lkdGg6IG9wdHMud2lkdGgsXG4gICAgaGVpZ2h0OiBvcHRzLmhlaWdodCxcbiAgICBzdGF0ZTogXCJvcGVuXCIsXG4gICAgJDogdGhpcy4kXG4gIH07XG5cbiAgaWYgKG9wdHMuaWZyYW1lKSB7XG4gICAgdGhpcy4kW1wiaWZyYW1lLXdyYXBcIl0uY3NzKHtoZWlnaHQ6IG9wdHMuaGVpZ2h0fSk7XG4gICAgdGhpcy4kW1wiaWZyYW1lXCJdLmNzcyh7aGVpZ2h0OiBvcHRzLmhlaWdodH0pO1xuXG4gICAgLy8gaWZyYW1lIGNvbnRlbnQgbG9hZFxuICAgIHRoaXMuJFtcImlmcmFtZS1mb3JtXCJdLmF0dHIoe1wibWV0aG9kXCI6IG9wdHMuaWZyYW1lLm1ldGhvZH0pO1xuICAgIHRoaXMuJFtcImlmcmFtZS1mb3JtXCJdLmF0dHIoe1widGFyZ2V0XCI6IG9wdHMuaWQgKyBcIi1mcmFtZVwifSk7XG4gICAgdGhpcy4kW1wiaWZyYW1lLWZvcm1cIl0uYXR0cih7XCJhY3Rpb25cIjogb3B0cy5pZnJhbWUudXJsfSk7XG4gICAgdGhpcy4kW1wiaWZyYW1lXCJdLm9uKFwibG9hZFwiLCAoZnVuY3Rpb24gKCkge1xuICAgICAgdGhhdC5zdGF0ZSA9IFwibG9hZFwiO1xuICAgICAgaWYgKG9wdHMuaWZyYW1lTG9hZGluZ01zZykge1xuICAgICAgICB0aGlzLiRbXCJpZnJhbWUtbG9hZGluZ1wiXS5oaWRlKCk7XG4gICAgICB9XG4gICAgICBvblN0YXRlQ2hhbmdlZC5jYWxsKHRoaXMsIG9wdHMsIHRoYXQpO1xuICAgIH0pLmJpbmQodGhpcykpO1xuICAgIGlmICghb3B0cy5pZnJhbWVMb2FkaW5nTXNnKSB7XG4gICAgICB0aGlzLiRbXCJpZnJhbWVcIl0uc2hvdygpO1xuICAgIH1cbiAgICB0aGlzLiRbXCJpZnJhbWUtZm9ybVwiXS5zdWJtaXQoKTtcbiAgfVxuXG4gIGlmIChjYWxsYmFjaykgY2FsbGJhY2suY2FsbCh0aGF0LCB0aGF0KTtcblxuICBvblN0YXRlQ2hhbmdlZC5jYWxsKHRoaXMsIG9wdHMsIHRoYXQpO1xuXG4gIC8vIGJpbmQga2V5IGV2ZW50XG4gIGlmIChvcHRzLmNsb3NlVG9Fc2MpIHtcbiAgICBqUXVlcnkod2luZG93KS5vbihcImtleWRvd24uYXgtbW9kYWxcIiwgZSA9PiB7XG4gICAgICBvbmtleXVwLmNhbGwodGhpcywgZSB8fCB3aW5kb3cuZXZlbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgalF1ZXJ5KHdpbmRvdykub24oXCJyZXNpemUuYXgtbW9kYWxcIiwgZSA9PiB7XG4gICAgdGhpcy5hbGlnbihudWxsLCBlIHx8IHdpbmRvdy5ldmVudCk7XG4gIH0pO1xuXG4gIHRoaXMuJC5oZWFkZXJcbiAgICAub2ZmKEVOTVtcIm1vdXNlZG93blwiXSlcbiAgICAub2ZmKFwiZHJhZ3N0YXJ0XCIpXG4gICAgLm9uKEVOTVtcIm1vdXNlZG93blwiXSwgZSA9PiB7XG4gICAgICAvLy8g7J2067Kk7Yq4IO2VhO2EsOungSDstpTqsIAgOiDrsoTtirzsl5jrpqzrqLztirjroZwg67aA7YSwIOuwnOyDneuQnCDsnbTrsqTtirjsnbTrqbQgbW92ZU1vZGFsIOyLnOyeke2VmOyngCDslYrrj4TroZ0g7ZWE7YSw66eBXG4gICAgICBsZXQgaXNCdXR0b24gPSBVLmZpbmRQYXJlbnROb2RlKGUuY3VycmVudFRhcmdldCwgZnVuY3Rpb24gKF90YXJnZXQpIHtcbiAgICAgICAgaWYgKF90YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1tb2RhbC1oZWFkZXItYnRuXCIpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIW9wdHMuaXNGdWxsU2NyZWVuICYmICFpc0J1dHRvbiAmJiBvcHRzLmRpc2FibGVEcmFnICE9IHRydWUpIHtcbiAgICAgICAgdGhpcy5tb3VzZVBvc2l0aW9uID0gZ2V0TW91c2VQb3NpdGlvbihlKTtcbiAgICAgICAgbW92ZU1vZGFsLm9uLmNhbGwodGhpcyk7XG4gICAgICB9XG4gICAgICBpZiAoaXNCdXR0b24pIHtcbiAgICAgICAgYnRuT25DbGljay5jYWxsKHRoaXMsIGUgfHwgd2luZG93LmV2ZW50LCBvcHRzKTtcbiAgICAgIH1cbiAgICB9KVxuICAgIC5vbihcImRyYWdzdGFydFwiLCBlID0+IHtcbiAgICAgIFUuc3RvcEV2ZW50KGUub3JpZ2luYWxFdmVudCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG5cbiAgdGhpcy4kYWN0aXZlTW9kYWxcbiAgICAub2ZmKEVOTVtcIm1vdXNlZG93blwiXSlcbiAgICAub2ZmKFwiZHJhZ3N0YXJ0XCIpXG4gICAgLm9uKEVOTVtcIm1vdXNlZG93blwiXSwgXCJbZGF0YS1heDZ1aS1tb2RhbC1yZXNpemVyXVwiLCBlID0+IHtcbiAgICAgIGlmIChvcHRzLmRpc2FibGVEcmFnIHx8IG9wdHMuaXNGdWxsU2NyZWVuKSByZXR1cm4gZmFsc2U7XG4gICAgICB0aGlzLm1vdXNlUG9zaXRpb24gPSBnZXRNb3VzZVBvc2l0aW9uKGUpO1xuICAgICAgcmVzaXplTW9kYWwub24uY2FsbCh0aGlzLCBlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1heDZ1aS1tb2RhbC1yZXNpemVyXCIpKTtcbiAgICB9KVxuICAgIC5vbihcImRyYWdzdGFydFwiLCBlID0+IHtcbiAgICAgIFUuc3RvcEV2ZW50KGUub3JpZ2luYWxFdmVudCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG59O1xuY29uc3QgYnRuT25DbGljayA9IGZ1bmN0aW9uIChlLCBvcHRzLCBjYWxsYmFjaywgdGFyZ2V0LCBrKSB7XG4gIGxldCB0aGF0O1xuICBpZiAoZS5zcmNFbGVtZW50KSBlLnRhcmdldCA9IGUuc3JjRWxlbWVudDtcblxuICB0YXJnZXQgPSBVLmZpbmRQYXJlbnROb2RlKGUudGFyZ2V0LCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgaWYgKHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLW1vZGFsLWhlYWRlci1idG5cIikpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSk7XG5cbiAgaWYgKHRhcmdldCkge1xuICAgIGsgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1tb2RhbC1oZWFkZXItYnRuXCIpO1xuXG4gICAgdGhhdCA9IHtcbiAgICAgIHNlbGY6IHRoaXMsXG4gICAgICBrZXk6IGssIHZhbHVlOiBvcHRzLmhlYWRlci5idG5zW2tdLFxuICAgICAgZGlhbG9nSWQ6IG9wdHMuaWQsXG4gICAgICBidG5UYXJnZXQ6IHRhcmdldFxuICAgIH07XG5cbiAgICBpZiAob3B0cy5oZWFkZXIuYnRuc1trXS5vbkNsaWNrKSB7XG4gICAgICBvcHRzLmhlYWRlci5idG5zW2tdLm9uQ2xpY2suY2FsbCh0aGF0LCB0aGF0KTtcbiAgICB9XG4gIH1cblxuICB0aGF0ID0gbnVsbDtcbiAgb3B0cyA9IG51bGw7XG4gIGNhbGxiYWNrID0gbnVsbDtcbiAgdGFyZ2V0ID0gbnVsbDtcbiAgayA9IG51bGw7XG59O1xuY29uc3Qgb25rZXl1cCA9IGZ1bmN0aW9uIChlKSB7XG4gIGlmIChlLmtleUNvZGUgPT0gaW5mby5ldmVudEtleXMuRVNDKSB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG59O1xuY29uc3QgYWxpZ25Qcm9jZXNzb3IgPSB7XG4gIFwidG9wLWxlZnRcIjogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuYWxpZ24oe2xlZnQ6IFwibGVmdFwiLCB0b3A6IFwidG9wXCJ9KTtcbiAgfSxcbiAgXCJ0b3AtcmlnaHRcIjogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuYWxpZ24oe2xlZnQ6IFwicmlnaHRcIiwgdG9wOiBcInRvcFwifSk7XG4gIH0sXG4gIFwiYm90dG9tLWxlZnRcIjogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuYWxpZ24oe2xlZnQ6IFwibGVmdFwiLCB0b3A6IFwiYm90dG9tXCJ9KTtcbiAgfSxcbiAgXCJib3R0b20tcmlnaHRcIjogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuYWxpZ24oe2xlZnQ6IFwicmlnaHRcIiwgdG9wOiBcImJvdHRvbVwifSk7XG4gIH0sXG4gIFwiY2VudGVyLW1pZGRsZVwiOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5hbGlnbih7bGVmdDogXCJjZW50ZXJcIiwgdG9wOiBcIm1pZGRsZVwifSk7XG4gIH1cbn07XG5jb25zdCBtb3ZlTW9kYWwgPSB7XG4gIFwib25cIjogZnVuY3Rpb24gKCkge1xuICAgIGxldCBtb2RhbFpJbmRleCA9IHRoaXMuJGFjdGl2ZU1vZGFsLmNzcyhcInotaW5kZXhcIiksXG4gICAgICBtb2RhbE9mZnNldCA9IHRoaXMuJGFjdGl2ZU1vZGFsLnBvc2l0aW9uKCksXG4gICAgICBtb2RhbEJveCA9IHtcbiAgICAgICAgd2lkdGg6IHRoaXMuJGFjdGl2ZU1vZGFsLm91dGVyV2lkdGgoKSwgaGVpZ2h0OiB0aGlzLiRhY3RpdmVNb2RhbC5vdXRlckhlaWdodCgpXG4gICAgICB9LFxuICAgICAgd2luZG93Qm94ID0ge1xuICAgICAgICB3aWR0aDogalF1ZXJ5KHdpbmRvdykud2lkdGgoKSxcbiAgICAgICAgaGVpZ2h0OiBqUXVlcnkod2luZG93KS5oZWlnaHQoKSxcbiAgICAgICAgc2Nyb2xsTGVmdDogKHRoaXMubW9kYWxDb25maWcuYWJzb2x1dGUpID8gMCA6IGpRdWVyeShkb2N1bWVudCkuc2Nyb2xsTGVmdCgpLFxuICAgICAgICBzY3JvbGxUb3A6ICh0aGlzLm1vZGFsQ29uZmlnLmFic29sdXRlKSA/IDAgOiBqUXVlcnkoZG9jdW1lbnQpLnNjcm9sbFRvcCgpLFxuICAgICAgfSxcbiAgICAgIGdldFJlc2l6ZXJQb3NpdGlvbiA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHRoaXMuX19keCA9IGUuY2xpZW50WCAtIHRoaXMubW91c2VQb3NpdGlvbi5jbGllbnRYO1xuICAgICAgICB0aGlzLl9fZHkgPSBlLmNsaWVudFkgLSB0aGlzLm1vdXNlUG9zaXRpb24uY2xpZW50WTtcblxuICAgICAgICBpZiAobWluWCA+IG1vZGFsT2Zmc2V0LmxlZnQgKyB0aGlzLl9fZHgpIHtcbiAgICAgICAgICB0aGlzLl9fZHggPSAtbW9kYWxPZmZzZXQubGVmdDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChtYXhYIDwgbW9kYWxPZmZzZXQubGVmdCArIHRoaXMuX19keCkge1xuICAgICAgICAgIHRoaXMuX19keCA9IChtYXhYKSAtIG1vZGFsT2Zmc2V0LmxlZnQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWluWSA+IG1vZGFsT2Zmc2V0LnRvcCArIHRoaXMuX19keSkge1xuICAgICAgICAgIHRoaXMuX19keSA9IC1tb2RhbE9mZnNldC50b3A7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobWF4WSA8IG1vZGFsT2Zmc2V0LnRvcCArIHRoaXMuX19keSkge1xuICAgICAgICAgIHRoaXMuX19keSA9IChtYXhZKSAtIG1vZGFsT2Zmc2V0LnRvcDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbGVmdDogbW9kYWxPZmZzZXQubGVmdCArIHRoaXMuX19keCArIHdpbmRvd0JveC5zY3JvbGxMZWZ0LFxuICAgICAgICAgIHRvcDogbW9kYWxPZmZzZXQudG9wICsgdGhpcy5fX2R5ICsgd2luZG93Qm94LnNjcm9sbFRvcFxuICAgICAgICB9O1xuICAgICAgfTtcblxuICAgIGxldCBtaW5YID0gMCwgbWF4WCA9IHdpbmRvd0JveC53aWR0aCAtIG1vZGFsQm94LndpZHRoLFxuICAgICAgbWluWSA9IDAsIG1heFkgPSB3aW5kb3dCb3guaGVpZ2h0IC0gbW9kYWxCb3guaGVpZ2h0O1xuXG4gICAgdGhpcy5fX2R4ID0gMDsgLy8g67OA7ZmU65+JIFhcbiAgICB0aGlzLl9fZHkgPSAwOyAvLyDrs4DtmZTrn4kgWVxuXG4gICAgLy8gdGhpcy4kcmVzaXplckJnIDogYm9keSDqsIAgd2luZG9367O064ukIOyekeydhCDrlYwg66y47KCcIO2VtOqysOydhCDsnITtlZwgRElWXG4gICAgdGhpcy4kcmVzaXplckJnLmNzcyh7ekluZGV4OiBtb2RhbFpJbmRleH0pO1xuICAgIHRoaXMuJHJlc2l6ZXIuY3NzKHtcbiAgICAgIGxlZnQ6IG1vZGFsT2Zmc2V0LmxlZnQgKyB3aW5kb3dCb3guc2Nyb2xsTGVmdCxcbiAgICAgIHRvcDogbW9kYWxPZmZzZXQudG9wICsgd2luZG93Qm94LnNjcm9sbFRvcCxcbiAgICAgIHdpZHRoOiBtb2RhbEJveC53aWR0aCxcbiAgICAgIGhlaWdodDogbW9kYWxCb3guaGVpZ2h0LFxuICAgICAgekluZGV4OiBtb2RhbFpJbmRleCArIDFcbiAgICB9KTtcblxuICAgIGpRdWVyeShkb2N1bWVudC5ib2R5KVxuICAgICAgLmFwcGVuZCh0aGlzLiRyZXNpemVyQmcpXG4gICAgICAuYXBwZW5kKHRoaXMuJHJlc2l6ZXIpO1xuXG4gICAgdGhpcy4kYWN0aXZlTW9kYWwuYWRkQ2xhc3MoXCJkcmFnZWRcIik7XG5cbiAgICBqUXVlcnkoZG9jdW1lbnQuYm9keSlcbiAgICAgIC5vbihFTk1bXCJtb3VzZW1vdmVcIl0gKyBcIi5heDZtb2RhbC1tb3ZlLVwiICsgdGhpcy5pbnN0YW5jZUlkLCBVLnRocm90dGxlKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHRoaXMuJHJlc2l6ZXIuY3NzKGdldFJlc2l6ZXJQb3NpdGlvbi5jYWxsKHRoaXMsIGUpKTtcbiAgICAgIH0sIDMwKS5iaW5kKHRoaXMpKVxuICAgICAgLm9uKEVOTVtcIm1vdXNldXBcIl0gKyBcIi5heDZtb2RhbC1tb3ZlLVwiICsgdGhpcy5pbnN0YW5jZUlkLCBlID0+IHtcbiAgICAgICAgbW92ZU1vZGFsLm9mZi5jYWxsKHRoaXMpO1xuICAgICAgfSlcbiAgICAgIC5vbihcIm1vdXNlbGVhdmUuYXg2bW9kYWwtbW92ZS1cIiArIHRoaXMuaW5zdGFuY2VJZCwgZSA9PiB7XG4gICAgICAgIG1vdmVNb2RhbC5vZmYuY2FsbCh0aGlzKTtcbiAgICAgIH0pO1xuXG4gICAgalF1ZXJ5KGRvY3VtZW50LmJvZHkpXG4gICAgICAuYXR0cigndW5zZWxlY3RhYmxlJywgJ29uJylcbiAgICAgIC5jc3MoJ3VzZXItc2VsZWN0JywgJ25vbmUnKVxuICAgICAgLm9uKCdzZWxlY3RzdGFydCcsIGZhbHNlKTtcbiAgfSxcbiAgXCJvZmZcIjogZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHNldE1vZGFsUG9zaXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgYm94ID0gdGhpcy4kcmVzaXplci5vZmZzZXQoKTtcbiAgICAgIGlmICghdGhpcy5tb2RhbENvbmZpZy5hYnNvbHV0ZSkge1xuICAgICAgICBib3gubGVmdCAtPSBqUXVlcnkoZG9jdW1lbnQpLnNjcm9sbExlZnQoKTtcbiAgICAgICAgYm94LnRvcCAtPSBqUXVlcnkoZG9jdW1lbnQpLnNjcm9sbFRvcCgpO1xuICAgICAgfVxuICAgICAgdGhpcy4kYWN0aXZlTW9kYWwuY3NzKGJveCk7XG4gICAgICB0aGlzLm1vZGFsQ29uZmlnLmxlZnQgPSBib3gubGVmdDtcbiAgICAgIHRoaXMubW9kYWxDb25maWcudG9wID0gYm94LnRvcDtcblxuICAgICAgYm94ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgdGhpcy4kYWN0aXZlTW9kYWwucmVtb3ZlQ2xhc3MoXCJkcmFnZWRcIik7XG4gICAgc2V0TW9kYWxQb3NpdGlvbi5jYWxsKHRoaXMpO1xuXG4gICAgdGhpcy4kcmVzaXplci5yZW1vdmUoKTtcbiAgICB0aGlzLiRyZXNpemVyID0gbnVsbDtcbiAgICB0aGlzLiRyZXNpemVyQmcucmVtb3ZlKCk7XG4gICAgdGhpcy4kcmVzaXplckJnID0gbnVsbDtcblxuICAgIGpRdWVyeShkb2N1bWVudC5ib2R5KVxuICAgICAgLm9mZihFTk1bXCJtb3VzZW1vdmVcIl0gKyBcIi5heDZtb2RhbC1tb3ZlLVwiICsgdGhpcy5pbnN0YW5jZUlkKVxuICAgICAgLm9mZihFTk1bXCJtb3VzZXVwXCJdICsgXCIuYXg2bW9kYWwtbW92ZS1cIiArIHRoaXMuaW5zdGFuY2VJZClcbiAgICAgIC5vZmYoXCJtb3VzZWxlYXZlLmF4Nm1vZGFsLW1vdmUtXCIgKyB0aGlzLmluc3RhbmNlSWQpO1xuXG4gICAgalF1ZXJ5KGRvY3VtZW50LmJvZHkpXG4gICAgICAucmVtb3ZlQXR0cigndW5zZWxlY3RhYmxlJylcbiAgICAgIC5jc3MoJ3VzZXItc2VsZWN0JywgJ2F1dG8nKVxuICAgICAgLm9mZignc2VsZWN0c3RhcnQnKTtcblxuICAgIG9uU3RhdGVDaGFuZ2VkLmNhbGwodGhpcywgdGhpcy5tb2RhbENvbmZpZywge1xuICAgICAgc2VsZjogdGhpcyxcbiAgICAgIHN0YXRlOiBcIm1vdmVcIlxuICAgIH0pO1xuXG4gIH1cbn07XG5jb25zdCByZXNpemVNb2RhbCA9IHtcbiAgXCJvblwiOiBmdW5jdGlvbiAocmVzaXplclR5cGUpIHtcbiAgICBsZXQgbW9kYWxaSW5kZXggPSB0aGlzLiRhY3RpdmVNb2RhbC5jc3MoXCJ6LWluZGV4XCIpLFxuICAgICAgbW9kYWxPZmZzZXQgPSB0aGlzLiRhY3RpdmVNb2RhbC5wb3NpdGlvbigpLFxuICAgICAgbW9kYWxCb3ggPSB7XG4gICAgICAgIHdpZHRoOiB0aGlzLiRhY3RpdmVNb2RhbC5vdXRlcldpZHRoKCksIGhlaWdodDogdGhpcy4kYWN0aXZlTW9kYWwub3V0ZXJIZWlnaHQoKVxuICAgICAgfSxcbiAgICAgIHdpbmRvd0JveCA9IHtcbiAgICAgICAgd2lkdGg6IGpRdWVyeSh3aW5kb3cpLndpZHRoKCksXG4gICAgICAgIGhlaWdodDogalF1ZXJ5KHdpbmRvdykuaGVpZ2h0KCksXG4gICAgICAgIHNjcm9sbExlZnQ6ICh0aGlzLm1vZGFsQ29uZmlnLmFic29sdXRlKSA/IDAgOiBqUXVlcnkoZG9jdW1lbnQpLnNjcm9sbExlZnQoKSxcbiAgICAgICAgc2Nyb2xsVG9wOiAodGhpcy5tb2RhbENvbmZpZy5hYnNvbHV0ZSkgPyAwIDogalF1ZXJ5KGRvY3VtZW50KS5zY3JvbGxUb3AoKSxcbiAgICAgIH0sXG4gICAgICByZXNpemVyUHJvY2Vzc29yID0ge1xuICAgICAgICBcInRvcFwiOiBmdW5jdGlvbiAoZSkge1xuXG4gICAgICAgICAgaWYgKG1pbkhlaWdodCA+IG1vZGFsQm94LmhlaWdodCAtIHRoaXMuX19keSkge1xuICAgICAgICAgICAgdGhpcy5fX2R5ID0gbW9kYWxCb3guaGVpZ2h0IC0gKG1pbkhlaWdodCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGUuc2hpZnRLZXkpIHtcblxuICAgICAgICAgICAgaWYgKG1pbkhlaWdodCA+IG1vZGFsQm94LmhlaWdodCAtICh0aGlzLl9fZHkgKiAyKSkge1xuICAgICAgICAgICAgICB0aGlzLl9fZHkgPSAobW9kYWxCb3guaGVpZ2h0IC0gKG1pbkhlaWdodCkpIC8gMjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgbGVmdDogbW9kYWxPZmZzZXQubGVmdCxcbiAgICAgICAgICAgICAgdG9wOiBtb2RhbE9mZnNldC50b3AgKyB0aGlzLl9fZHksXG4gICAgICAgICAgICAgIHdpZHRoOiBtb2RhbEJveC53aWR0aCxcbiAgICAgICAgICAgICAgaGVpZ2h0OiBtb2RhbEJveC5oZWlnaHQgLSAodGhpcy5fX2R5ICogMilcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKGUuYWx0S2V5KSB7XG5cbiAgICAgICAgICAgIGlmIChtaW5IZWlnaHQgPiBtb2RhbEJveC5oZWlnaHQgLSAodGhpcy5fX2R5ICogMikpIHtcbiAgICAgICAgICAgICAgdGhpcy5fX2R5ID0gKG1vZGFsQm94LmhlaWdodCAtIChtaW5IZWlnaHQpKSAvIDI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGxlZnQ6IG1vZGFsT2Zmc2V0LmxlZnQgKyB0aGlzLl9fZHksXG4gICAgICAgICAgICAgIHRvcDogbW9kYWxPZmZzZXQudG9wICsgdGhpcy5fX2R5LFxuICAgICAgICAgICAgICB3aWR0aDogbW9kYWxCb3gud2lkdGggLSAodGhpcy5fX2R5ICogMiksXG4gICAgICAgICAgICAgIGhlaWdodDogbW9kYWxCb3guaGVpZ2h0IC0gKHRoaXMuX19keSAqIDIpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGxlZnQ6IG1vZGFsT2Zmc2V0LmxlZnQsXG4gICAgICAgICAgICAgIHRvcDogbW9kYWxPZmZzZXQudG9wICsgdGhpcy5fX2R5LFxuICAgICAgICAgICAgICB3aWR0aDogbW9kYWxCb3gud2lkdGgsXG4gICAgICAgICAgICAgIGhlaWdodDogbW9kYWxCb3guaGVpZ2h0IC0gdGhpcy5fX2R5LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiYm90dG9tXCI6IGZ1bmN0aW9uIChlKSB7XG5cbiAgICAgICAgICBpZiAobWluSGVpZ2h0ID4gbW9kYWxCb3guaGVpZ2h0ICsgdGhpcy5fX2R5KSB7XG4gICAgICAgICAgICB0aGlzLl9fZHkgPSAtbW9kYWxCb3guaGVpZ2h0ICsgKG1pbkhlaWdodCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGUuc2hpZnRLZXkpIHtcblxuICAgICAgICAgICAgaWYgKG1pbkhlaWdodCA+IG1vZGFsQm94LmhlaWdodCArICh0aGlzLl9fZHkgKiAyKSkge1xuICAgICAgICAgICAgICB0aGlzLl9fZHkgPSAoLW1vZGFsQm94LmhlaWdodCArIChtaW5IZWlnaHQpKSAvIDI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGxlZnQ6IG1vZGFsT2Zmc2V0LmxlZnQsXG4gICAgICAgICAgICAgIHRvcDogbW9kYWxPZmZzZXQudG9wIC0gdGhpcy5fX2R5LFxuICAgICAgICAgICAgICB3aWR0aDogbW9kYWxCb3gud2lkdGgsXG4gICAgICAgICAgICAgIGhlaWdodDogbW9kYWxCb3guaGVpZ2h0ICsgKHRoaXMuX19keSAqIDIpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmIChlLmFsdEtleSkge1xuXG4gICAgICAgICAgICBpZiAobWluSGVpZ2h0ID4gbW9kYWxCb3guaGVpZ2h0ICsgKHRoaXMuX19keSAqIDIpKSB7XG4gICAgICAgICAgICAgIHRoaXMuX19keSA9ICgtbW9kYWxCb3guaGVpZ2h0ICsgKG1pbkhlaWdodCkpIC8gMjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgbGVmdDogbW9kYWxPZmZzZXQubGVmdCAtIHRoaXMuX19keSxcbiAgICAgICAgICAgICAgdG9wOiBtb2RhbE9mZnNldC50b3AgLSB0aGlzLl9fZHksXG4gICAgICAgICAgICAgIHdpZHRoOiBtb2RhbEJveC53aWR0aCArICh0aGlzLl9fZHkgKiAyKSxcbiAgICAgICAgICAgICAgaGVpZ2h0OiBtb2RhbEJveC5oZWlnaHQgKyAodGhpcy5fX2R5ICogMiksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGxlZnQ6IG1vZGFsT2Zmc2V0LmxlZnQsXG4gICAgICAgICAgICAgIHRvcDogbW9kYWxPZmZzZXQudG9wLFxuICAgICAgICAgICAgICB3aWR0aDogbW9kYWxCb3gud2lkdGgsXG4gICAgICAgICAgICAgIGhlaWdodDogbW9kYWxCb3guaGVpZ2h0ICsgdGhpcy5fX2R5LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwibGVmdFwiOiBmdW5jdGlvbiAoZSkge1xuXG4gICAgICAgICAgaWYgKG1pbldpZHRoID4gbW9kYWxCb3gud2lkdGggLSB0aGlzLl9fZHgpIHtcbiAgICAgICAgICAgIHRoaXMuX19keCA9IG1vZGFsQm94LndpZHRoIC0gKG1pbldpZHRoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoZS5zaGlmdEtleSkge1xuXG4gICAgICAgICAgICBpZiAobWluV2lkdGggPiBtb2RhbEJveC53aWR0aCAtICh0aGlzLl9fZHggKiAyKSkge1xuICAgICAgICAgICAgICB0aGlzLl9fZHggPSAobW9kYWxCb3gud2lkdGggLSAobWluV2lkdGgpKSAvIDI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGxlZnQ6IG1vZGFsT2Zmc2V0LmxlZnQgKyB0aGlzLl9fZHgsXG4gICAgICAgICAgICAgIHRvcDogbW9kYWxPZmZzZXQudG9wLFxuICAgICAgICAgICAgICB3aWR0aDogbW9kYWxCb3gud2lkdGggLSAodGhpcy5fX2R4ICogMiksXG4gICAgICAgICAgICAgIGhlaWdodDogbW9kYWxCb3guaGVpZ2h0XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmIChlLmFsdEtleSkge1xuXG4gICAgICAgICAgICBpZiAobWluV2lkdGggPiBtb2RhbEJveC53aWR0aCAtICh0aGlzLl9fZHggKiAyKSkge1xuICAgICAgICAgICAgICB0aGlzLl9fZHggPSAobW9kYWxCb3gud2lkdGggLSAobWluV2lkdGgpKSAvIDI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGxlZnQ6IG1vZGFsT2Zmc2V0LmxlZnQgKyB0aGlzLl9fZHgsXG4gICAgICAgICAgICAgIHRvcDogbW9kYWxPZmZzZXQudG9wICsgdGhpcy5fX2R4LFxuICAgICAgICAgICAgICB3aWR0aDogbW9kYWxCb3gud2lkdGggLSAodGhpcy5fX2R4ICogMiksXG4gICAgICAgICAgICAgIGhlaWdodDogbW9kYWxCb3guaGVpZ2h0IC0gKHRoaXMuX19keCAqIDIpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBsZWZ0OiBtb2RhbE9mZnNldC5sZWZ0ICsgdGhpcy5fX2R4LFxuICAgICAgICAgICAgICB0b3A6IG1vZGFsT2Zmc2V0LnRvcCxcbiAgICAgICAgICAgICAgd2lkdGg6IG1vZGFsQm94LndpZHRoIC0gdGhpcy5fX2R4LFxuICAgICAgICAgICAgICBoZWlnaHQ6IG1vZGFsQm94LmhlaWdodCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInJpZ2h0XCI6IGZ1bmN0aW9uIChlKSB7XG5cbiAgICAgICAgICBpZiAobWluV2lkdGggPiBtb2RhbEJveC53aWR0aCArIHRoaXMuX19keCkge1xuICAgICAgICAgICAgdGhpcy5fX2R4ID0gLW1vZGFsQm94LndpZHRoICsgKG1pbldpZHRoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoZS5zaGlmdEtleSkge1xuXG4gICAgICAgICAgICBpZiAobWluV2lkdGggPiBtb2RhbEJveC53aWR0aCArICh0aGlzLl9fZHggKiAyKSkge1xuICAgICAgICAgICAgICB0aGlzLl9fZHggPSAoLW1vZGFsQm94LndpZHRoICsgKG1pbldpZHRoKSkgLyAyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBsZWZ0OiBtb2RhbE9mZnNldC5sZWZ0IC0gdGhpcy5fX2R4LFxuICAgICAgICAgICAgICB0b3A6IG1vZGFsT2Zmc2V0LnRvcCxcbiAgICAgICAgICAgICAgd2lkdGg6IG1vZGFsQm94LndpZHRoICsgKHRoaXMuX19keCAqIDIpLFxuICAgICAgICAgICAgICBoZWlnaHQ6IG1vZGFsQm94LmhlaWdodCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKGUuYWx0S2V5KSB7XG5cbiAgICAgICAgICAgIGlmIChtaW5XaWR0aCA+IG1vZGFsQm94LndpZHRoICsgKHRoaXMuX19keCAqIDIpKSB7XG4gICAgICAgICAgICAgIHRoaXMuX19keCA9ICgtbW9kYWxCb3gud2lkdGggKyAobWluV2lkdGgpKSAvIDI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGxlZnQ6IG1vZGFsT2Zmc2V0LmxlZnQgLSB0aGlzLl9fZHgsXG4gICAgICAgICAgICAgIHRvcDogbW9kYWxPZmZzZXQudG9wIC0gdGhpcy5fX2R4LFxuICAgICAgICAgICAgICB3aWR0aDogbW9kYWxCb3gud2lkdGggKyAodGhpcy5fX2R4ICogMiksXG4gICAgICAgICAgICAgIGhlaWdodDogbW9kYWxCb3guaGVpZ2h0ICsgKHRoaXMuX19keCAqIDIpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBsZWZ0OiBtb2RhbE9mZnNldC5sZWZ0LFxuICAgICAgICAgICAgICB0b3A6IG1vZGFsT2Zmc2V0LnRvcCxcbiAgICAgICAgICAgICAgd2lkdGg6IG1vZGFsQm94LndpZHRoICsgdGhpcy5fX2R4LFxuICAgICAgICAgICAgICBoZWlnaHQ6IG1vZGFsQm94LmhlaWdodCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInRvcC1sZWZ0XCI6IGZ1bmN0aW9uIChlKSB7XG5cbiAgICAgICAgICBpZiAobWluV2lkdGggPiBtb2RhbEJveC53aWR0aCAtIHRoaXMuX19keCkge1xuICAgICAgICAgICAgdGhpcy5fX2R4ID0gbW9kYWxCb3gud2lkdGggLSAobWluV2lkdGgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChtaW5IZWlnaHQgPiBtb2RhbEJveC5oZWlnaHQgLSB0aGlzLl9fZHkpIHtcbiAgICAgICAgICAgIHRoaXMuX19keSA9IG1vZGFsQm94LmhlaWdodCAtIChtaW5IZWlnaHQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChlLnNoaWZ0S2V5IHx8IGUuYWx0S2V5KSB7XG5cbiAgICAgICAgICAgIGlmIChtaW5IZWlnaHQgPiBtb2RhbEJveC5oZWlnaHQgLSAodGhpcy5fX2R5ICogMikpIHtcbiAgICAgICAgICAgICAgdGhpcy5fX2R5ID0gKG1vZGFsQm94LmhlaWdodCAtIChtaW5IZWlnaHQpKSAvIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobWluV2lkdGggPiBtb2RhbEJveC53aWR0aCAtICh0aGlzLl9fZHggKiAyKSkge1xuICAgICAgICAgICAgICB0aGlzLl9fZHggPSAobW9kYWxCb3gud2lkdGggLSAobWluV2lkdGgpKSAvIDI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGxlZnQ6IG1vZGFsT2Zmc2V0LmxlZnQgKyB0aGlzLl9fZHgsXG4gICAgICAgICAgICAgIHRvcDogbW9kYWxPZmZzZXQudG9wICsgdGhpcy5fX2R5LFxuICAgICAgICAgICAgICB3aWR0aDogbW9kYWxCb3gud2lkdGggLSAodGhpcy5fX2R4ICogMiksXG4gICAgICAgICAgICAgIGhlaWdodDogbW9kYWxCb3guaGVpZ2h0IC0gKHRoaXMuX19keSAqIDIpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgIGlmIChtaW5IZWlnaHQgPiBtb2RhbEJveC5oZWlnaHQgLSAodGhpcy5fX2R5ICogMikpIHtcbiAgICAgICAgICAgICAgdGhpcy5fX2R5ID0gKG1vZGFsQm94LmhlaWdodCAtIChtaW5IZWlnaHQpKSAvIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobWluV2lkdGggPiBtb2RhbEJveC53aWR0aCAtICh0aGlzLl9fZHggKiAyKSkge1xuICAgICAgICAgICAgICB0aGlzLl9fZHggPSAobW9kYWxCb3gud2lkdGggLSAobWluV2lkdGgpKSAvIDI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGxlZnQ6IG1vZGFsT2Zmc2V0LmxlZnQgKyB0aGlzLl9fZHgsXG4gICAgICAgICAgICAgIHRvcDogbW9kYWxPZmZzZXQudG9wICsgdGhpcy5fX2R5LFxuICAgICAgICAgICAgICB3aWR0aDogbW9kYWxCb3gud2lkdGggLSB0aGlzLl9fZHgsXG4gICAgICAgICAgICAgIGhlaWdodDogbW9kYWxCb3guaGVpZ2h0IC0gdGhpcy5fX2R5LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwidG9wLXJpZ2h0XCI6IGZ1bmN0aW9uIChlKSB7XG5cbiAgICAgICAgICBpZiAobWluV2lkdGggPiBtb2RhbEJveC53aWR0aCArIHRoaXMuX19keCkge1xuICAgICAgICAgICAgdGhpcy5fX2R4ID0gLW1vZGFsQm94LndpZHRoICsgKG1pbldpZHRoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAobWluSGVpZ2h0ID4gbW9kYWxCb3guaGVpZ2h0IC0gdGhpcy5fX2R5KSB7XG4gICAgICAgICAgICB0aGlzLl9fZHkgPSBtb2RhbEJveC5oZWlnaHQgLSAobWluSGVpZ2h0KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoZS5zaGlmdEtleSB8fCBlLmFsdEtleSkge1xuXG4gICAgICAgICAgICBpZiAobWluSGVpZ2h0ID4gbW9kYWxCb3guaGVpZ2h0IC0gKHRoaXMuX19keSAqIDIpKSB7XG4gICAgICAgICAgICAgIHRoaXMuX19keSA9IChtb2RhbEJveC5oZWlnaHQgLSAobWluSGVpZ2h0KSkgLyAyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1pbldpZHRoID4gbW9kYWxCb3gud2lkdGggKyAodGhpcy5fX2R4ICogMikpIHtcbiAgICAgICAgICAgICAgdGhpcy5fX2R4ID0gKC1tb2RhbEJveC53aWR0aCArIChtaW5XaWR0aCkpIC8gMjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgbGVmdDogbW9kYWxPZmZzZXQubGVmdCAtIHRoaXMuX19keCxcbiAgICAgICAgICAgICAgdG9wOiBtb2RhbE9mZnNldC50b3AgKyB0aGlzLl9fZHksXG4gICAgICAgICAgICAgIHdpZHRoOiBtb2RhbEJveC53aWR0aCArICh0aGlzLl9fZHggKiAyKSxcbiAgICAgICAgICAgICAgaGVpZ2h0OiBtb2RhbEJveC5oZWlnaHQgLSAodGhpcy5fX2R5ICogMiksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGxlZnQ6IG1vZGFsT2Zmc2V0LmxlZnQsXG4gICAgICAgICAgICAgIHRvcDogbW9kYWxPZmZzZXQudG9wICsgdGhpcy5fX2R5LFxuICAgICAgICAgICAgICB3aWR0aDogbW9kYWxCb3gud2lkdGggKyB0aGlzLl9fZHgsXG4gICAgICAgICAgICAgIGhlaWdodDogbW9kYWxCb3guaGVpZ2h0IC0gdGhpcy5fX2R5LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwiYm90dG9tLWxlZnRcIjogZnVuY3Rpb24gKGUpIHtcblxuICAgICAgICAgIGlmIChtaW5XaWR0aCA+IG1vZGFsQm94LndpZHRoIC0gdGhpcy5fX2R4KSB7XG4gICAgICAgICAgICB0aGlzLl9fZHggPSBtb2RhbEJveC53aWR0aCAtIChtaW5XaWR0aCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKG1pbkhlaWdodCA+IG1vZGFsQm94LmhlaWdodCArIHRoaXMuX19keSkge1xuICAgICAgICAgICAgdGhpcy5fX2R5ID0gLW1vZGFsQm94LmhlaWdodCArIChtaW5IZWlnaHQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChlLnNoaWZ0S2V5IHx8IGUuYWx0S2V5KSB7XG4gICAgICAgICAgICBpZiAobWluV2lkdGggPiBtb2RhbEJveC53aWR0aCAtICh0aGlzLl9fZHggKiAyKSkge1xuICAgICAgICAgICAgICB0aGlzLl9fZHggPSAobW9kYWxCb3gud2lkdGggLSAobWluV2lkdGgpKSAvIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobWluSGVpZ2h0ID4gbW9kYWxCb3guaGVpZ2h0ICsgKHRoaXMuX19keSAqIDIpKSB7XG4gICAgICAgICAgICAgIHRoaXMuX19keSA9ICgtbW9kYWxCb3guaGVpZ2h0ICsgKG1pbkhlaWdodCkpIC8gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGxlZnQ6IG1vZGFsT2Zmc2V0LmxlZnQgKyB0aGlzLl9fZHgsXG4gICAgICAgICAgICAgIHRvcDogbW9kYWxPZmZzZXQudG9wIC0gdGhpcy5fX2R5LFxuICAgICAgICAgICAgICB3aWR0aDogbW9kYWxCb3gud2lkdGggLSAodGhpcy5fX2R4ICogMiksXG4gICAgICAgICAgICAgIGhlaWdodDogbW9kYWxCb3guaGVpZ2h0ICsgKHRoaXMuX19keSAqIDIpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBsZWZ0OiBtb2RhbE9mZnNldC5sZWZ0ICsgdGhpcy5fX2R4LFxuICAgICAgICAgICAgICB0b3A6IG1vZGFsT2Zmc2V0LnRvcCxcbiAgICAgICAgICAgICAgd2lkdGg6IG1vZGFsQm94LndpZHRoIC0gdGhpcy5fX2R4LFxuICAgICAgICAgICAgICBoZWlnaHQ6IG1vZGFsQm94LmhlaWdodCArIHRoaXMuX19keSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImJvdHRvbS1yaWdodFwiOiBmdW5jdGlvbiAoZSkge1xuXG4gICAgICAgICAgaWYgKG1pbldpZHRoID4gbW9kYWxCb3gud2lkdGggKyB0aGlzLl9fZHgpIHtcbiAgICAgICAgICAgIHRoaXMuX19keCA9IC1tb2RhbEJveC53aWR0aCArIChtaW5XaWR0aCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKG1pbkhlaWdodCA+IG1vZGFsQm94LmhlaWdodCArIHRoaXMuX19keSkge1xuICAgICAgICAgICAgdGhpcy5fX2R5ID0gLW1vZGFsQm94LmhlaWdodCArIChtaW5IZWlnaHQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChlLnNoaWZ0S2V5IHx8IGUuYWx0S2V5KSB7XG4gICAgICAgICAgICBpZiAobWluV2lkdGggPiBtb2RhbEJveC53aWR0aCArICh0aGlzLl9fZHggKiAyKSkge1xuICAgICAgICAgICAgICB0aGlzLl9fZHggPSAoLW1vZGFsQm94LndpZHRoICsgKG1pbldpZHRoKSkgLyAyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1pbkhlaWdodCA+IG1vZGFsQm94LmhlaWdodCArICh0aGlzLl9fZHkgKiAyKSkge1xuICAgICAgICAgICAgICB0aGlzLl9fZHkgPSAoLW1vZGFsQm94LmhlaWdodCArIChtaW5IZWlnaHQpKSAvIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBsZWZ0OiBtb2RhbE9mZnNldC5sZWZ0IC0gdGhpcy5fX2R4LFxuICAgICAgICAgICAgICB0b3A6IG1vZGFsT2Zmc2V0LnRvcCAtIHRoaXMuX19keSxcbiAgICAgICAgICAgICAgd2lkdGg6IG1vZGFsQm94LndpZHRoICsgKHRoaXMuX19keCAqIDIpLFxuICAgICAgICAgICAgICBoZWlnaHQ6IG1vZGFsQm94LmhlaWdodCArICh0aGlzLl9fZHkgKiAyKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgbGVmdDogbW9kYWxPZmZzZXQubGVmdCxcbiAgICAgICAgICAgICAgdG9wOiBtb2RhbE9mZnNldC50b3AsXG4gICAgICAgICAgICAgIHdpZHRoOiBtb2RhbEJveC53aWR0aCArIHRoaXMuX19keCxcbiAgICAgICAgICAgICAgaGVpZ2h0OiBtb2RhbEJveC5oZWlnaHQgKyB0aGlzLl9fZHksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBnZXRSZXNpemVyUG9zaXRpb24gPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICB0aGlzLl9fZHggPSBlLmNsaWVudFggLSB0aGlzLm1vdXNlUG9zaXRpb24uY2xpZW50WDtcbiAgICAgICAgdGhpcy5fX2R5ID0gZS5jbGllbnRZIC0gdGhpcy5tb3VzZVBvc2l0aW9uLmNsaWVudFk7XG5cbiAgICAgICAgcmV0dXJuIHJlc2l6ZXJQcm9jZXNzb3JbcmVzaXplclR5cGVdKGUpO1xuICAgICAgfTtcblxuICAgIGlmICghdGhpcy5tb2RhbENvbmZpZy5hYnNvbHV0ZSkge1xuICAgICAgbW9kYWxPZmZzZXQubGVmdCArPSB3aW5kb3dCb3guc2Nyb2xsTGVmdDtcbiAgICAgIG1vZGFsT2Zmc2V0LnRvcCArPSB3aW5kb3dCb3guc2Nyb2xsVG9wO1xuICAgIH1cblxuICAgIGxldCBtaW5XaWR0aCA9IDEwMCxcbiAgICAgIG1pbkhlaWdodCA9IDEwMDtcblxuICAgIGxldCBjdXJzb3JUeXBlID0ge1xuICAgICAgXCJ0b3BcIjogXCJyb3ctcmVzaXplXCIsXG4gICAgICBcImJvdHRvbVwiOiBcInJvdy1yZXNpemVcIixcbiAgICAgIFwibGVmdFwiOiBcImNvbC1yZXNpemVcIixcbiAgICAgIFwicmlnaHRcIjogXCJjb2wtcmVzaXplXCIsXG4gICAgICBcInRvcC1sZWZ0XCI6IFwibndzZS1yZXNpemVcIixcbiAgICAgIFwidG9wLXJpZ2h0XCI6IFwibmVzdy1yZXNpemVcIixcbiAgICAgIFwiYm90dG9tLWxlZnRcIjogXCJuZXN3LXJlc2l6ZVwiLFxuICAgICAgXCJib3R0b20tcmlnaHRcIjogXCJud3NlLXJlc2l6ZVwiLFxuICAgIH07XG5cbiAgICB0aGlzLl9fZHggPSAwOyAvLyDrs4DtmZTrn4kgWFxuICAgIHRoaXMuX19keSA9IDA7IC8vIOuzgO2ZlOufiSBZXG5cbiAgICAvLyB0aGlzLiRyZXNpemVyQmcgOiBib2R5IOqwgCB3aW5kb3frs7Tri6Qg7J6R7J2EIOuVjCDrrLjsoJwg7ZW06rKw7J2EIOychO2VnCBESVZcbiAgICB0aGlzLiRyZXNpemVyQmcuY3NzKHtcbiAgICAgIHpJbmRleDogbW9kYWxaSW5kZXgsXG4gICAgICBjdXJzb3I6IGN1cnNvclR5cGVbcmVzaXplclR5cGVdXG4gICAgfSk7XG4gICAgdGhpcy4kcmVzaXplci5jc3Moe1xuICAgICAgbGVmdDogbW9kYWxPZmZzZXQubGVmdCxcbiAgICAgIHRvcDogbW9kYWxPZmZzZXQudG9wLFxuICAgICAgd2lkdGg6IG1vZGFsQm94LndpZHRoLFxuICAgICAgaGVpZ2h0OiBtb2RhbEJveC5oZWlnaHQsXG4gICAgICB6SW5kZXg6IG1vZGFsWkluZGV4ICsgMSxcbiAgICAgIGN1cnNvcjogY3Vyc29yVHlwZVtyZXNpemVyVHlwZV1cbiAgICB9KTtcblxuICAgIGpRdWVyeShkb2N1bWVudC5ib2R5KVxuICAgICAgLmFwcGVuZCh0aGlzLiRyZXNpemVyQmcpXG4gICAgICAuYXBwZW5kKHRoaXMuJHJlc2l6ZXIpO1xuXG4gICAgdGhpcy4kYWN0aXZlTW9kYWwuYWRkQ2xhc3MoXCJkcmFnZWRcIik7XG5cbiAgICBqUXVlcnkoZG9jdW1lbnQuYm9keSlcbiAgICAgIC5vbihFTk1bXCJtb3VzZW1vdmVcIl0gKyBcIi5heDZtb2RhbC1yZXNpemUtXCIgKyB0aGlzLmluc3RhbmNlSWQsIFUudGhyb3R0bGUoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdGhpcy4kcmVzaXplci5jc3MoZ2V0UmVzaXplclBvc2l0aW9uLmNhbGwoZSkpO1xuICAgICAgfSwgMzApLmJpbmQodGhpcykpXG4gICAgICAub24oRU5NW1wibW91c2V1cFwiXSArIFwiLmF4Nm1vZGFsLXJlc2l6ZS1cIiArIHRoaXMuaW5zdGFuY2VJZCwgZSA9PiB7XG4gICAgICAgIHJlc2l6ZU1vZGFsLm9mZi5jYWxsKHRoaXMpO1xuICAgICAgfSlcbiAgICAgIC5vbihcIm1vdXNlbGVhdmUuYXg2bW9kYWwtcmVzaXplLVwiICsgdGhpcy5pbnN0YW5jZUlkLCBlID0+IHtcbiAgICAgICAgcmVzaXplTW9kYWwub2ZmLmNhbGwodGhpcyk7XG4gICAgICB9KTtcblxuICAgIGpRdWVyeShkb2N1bWVudC5ib2R5KVxuICAgICAgLmF0dHIoJ3Vuc2VsZWN0YWJsZScsICdvbicpXG4gICAgICAuY3NzKCd1c2VyLXNlbGVjdCcsICdub25lJylcbiAgICAgIC5iaW5kKCdzZWxlY3RzdGFydCcsIGZhbHNlKTtcbiAgfSxcbiAgXCJvZmZcIjogZnVuY3Rpb24gKCkge1xuICAgIGxldCBzZXRNb2RhbFBvc2l0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IGJveCA9IHRoaXMuJHJlc2l6ZXIub2Zmc2V0KCk7XG4gICAgICBqUXVlcnkuZXh0ZW5kKGJveCwge1xuICAgICAgICB3aWR0aDogdGhpcy4kcmVzaXplci53aWR0aCgpLFxuICAgICAgICBoZWlnaHQ6IHRoaXMuJHJlc2l6ZXIuaGVpZ2h0KCksXG4gICAgICB9KTtcbiAgICAgIGlmICghdGhpcy5tb2RhbENvbmZpZy5hYnNvbHV0ZSkge1xuICAgICAgICBib3gubGVmdCAtPSBqUXVlcnkoZG9jdW1lbnQpLnNjcm9sbExlZnQoKTtcbiAgICAgICAgYm94LnRvcCAtPSBqUXVlcnkoZG9jdW1lbnQpLnNjcm9sbFRvcCgpO1xuICAgICAgfVxuICAgICAgdGhpcy4kYWN0aXZlTW9kYWwuY3NzKGJveCk7XG5cbiAgICAgIHRoaXMubW9kYWxDb25maWcubGVmdCA9IGJveC5sZWZ0O1xuICAgICAgdGhpcy5tb2RhbENvbmZpZy50b3AgPSBib3gudG9wO1xuICAgICAgdGhpcy5tb2RhbENvbmZpZy53aWR0aCA9IGJveC53aWR0aDtcbiAgICAgIHRoaXMubW9kYWxDb25maWcuaGVpZ2h0ID0gYm94LmhlaWdodDtcbiAgICAgIHRoaXMuJFtcImJvZHlcIl0uY3NzKHtoZWlnaHQ6IGJveC5oZWlnaHQgLSB0aGlzLm1vZGFsQ29uZmlnLmhlYWRlckhlaWdodH0pO1xuICAgICAgaWYgKHRoaXMubW9kYWxDb25maWcuaWZyYW1lKSB7XG4gICAgICAgIHRoaXMuJFtcImlmcmFtZS13cmFwXCJdLmNzcyh7aGVpZ2h0OiBib3guaGVpZ2h0IC0gdGhpcy5tb2RhbENvbmZpZy5oZWFkZXJIZWlnaHR9KTtcbiAgICAgICAgdGhpcy4kW1wiaWZyYW1lXCJdLmNzcyh7aGVpZ2h0OiBib3guaGVpZ2h0IC0gdGhpcy5tb2RhbENvbmZpZy5oZWFkZXJIZWlnaHR9KTtcbiAgICAgIH1cblxuICAgICAgYm94ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgdGhpcy4kYWN0aXZlTW9kYWwucmVtb3ZlQ2xhc3MoXCJkcmFnZWRcIik7XG4gICAgc2V0TW9kYWxQb3NpdGlvbi5jYWxsKHRoaXMpO1xuXG4gICAgdGhpcy4kcmVzaXplci5yZW1vdmUoKTtcbiAgICB0aGlzLiRyZXNpemVyQmcucmVtb3ZlKCk7XG5cbiAgICBvblN0YXRlQ2hhbmdlZC5jYWxsKHRoaXMsIHRoaXMubW9kYWxDb25maWcsIHtcbiAgICAgIHNlbGY6IHRoaXMsXG4gICAgICBzdGF0ZTogXCJyZXNpemVcIlxuICAgIH0pO1xuXG4gICAgalF1ZXJ5KGRvY3VtZW50LmJvZHkpXG4gICAgICAub2ZmKEVOTVtcIm1vdXNlbW92ZVwiXSArIFwiLmF4Nm1vZGFsLXJlc2l6ZS1cIiArIHRoaXMuaW5zdGFuY2VJZClcbiAgICAgIC5vZmYoRU5NW1wibW91c2V1cFwiXSArIFwiLmF4Nm1vZGFsLXJlc2l6ZS1cIiArIHRoaXMuaW5zdGFuY2VJZClcbiAgICAgIC5vZmYoXCJtb3VzZWxlYXZlLmF4Nm1vZGFsLXJlc2l6ZS1cIiArIHRoaXMuaW5zdGFuY2VJZCk7XG5cbiAgICBqUXVlcnkoZG9jdW1lbnQuYm9keSlcbiAgICAgIC5yZW1vdmVBdHRyKCd1bnNlbGVjdGFibGUnKVxuICAgICAgLmNzcygndXNlci1zZWxlY3QnLCAnYXV0bycpXG4gICAgICAub2ZmKCdzZWxlY3RzdGFydCcpO1xuXG4gIH1cbn07XG4vKiB+fn5+fn5+fn5+fn5+fn5+fn4gZW5kIG9mIHByaXZhdGUgIH5+fn5+fn5+fn5+fn5+fn5+fn5+ICovXG5cbi8qKlxuICogQGNsYXNzXG4gKi9cbmNsYXNzIEFYNlVJTW9kYWwgZXh0ZW5kcyBBWDZVSUNvcmUge1xuICAvKipcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBjb25maWdcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgIHN1cGVyKCk7XG5cbiAgICAvKipcbiAgICAgKiBAbWVtYmVyIHtKU09OfVxuICAgICAqIEBwYXJhbSBjb25maWdcbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5pZD0nYXg2dWktbW9kYWwtJyArIHRoaXMuaW5zdGFuY2VJZF1cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5wb3NpdGlvbl1cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5wb3NpdGlvbi5sZWZ0PSdjZW5lciddXG4gICAgICogQHBhcmFtIFtjb25maWcucG9zaXRpb24udG9wPSdtaWRkbGUnXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLnBvc2l0aW9uLm1hcmdpbj0xMF1cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5taW5pbWl6ZVBvc2l0aW9uPSdib3R0b20tcmlnaHQnXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmNsaWNrRXZlbnROYW1lXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLnRoZW1lXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLndpZHRoPTMwMF1cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5oZWlnaHQ9NDAwXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmNsb3NlVG9Fc2NdXG4gICAgICogQHBhcmFtIFtjb25maWcuZGlzYWJsZURyYWddXG4gICAgICogQHBhcmFtIFtjb25maWcuZGlzYWJsZVJlc2l6ZV1cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5hbmltYXRlVGltZT0yNTBdXG4gICAgICogQHBhcmFtIFtjb25maWcuaWZyYW1lPWZhbHNlXVxuICAgICAqL1xuICAgIHRoaXMuY29uZmlnID0ge1xuICAgICAgaWQ6ICdheDZ1aS1tb2RhbC0nICsgdGhpcy5pbnN0YW5jZUlkLFxuICAgICAgcG9zaXRpb246IHtcbiAgICAgICAgbGVmdDogXCJjZW50ZXJcIixcbiAgICAgICAgdG9wOiBcIm1pZGRsZVwiLFxuICAgICAgICBtYXJnaW46IDEwXG4gICAgICB9LFxuICAgICAgbWluaW1pemVQb3NpdGlvbjogXCJib3R0b20tcmlnaHRcIixcbiAgICAgIGNsaWNrRXZlbnROYW1lOiAoKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkgPyBcInRvdWNoc3RhcnRcIiA6IFwiY2xpY2tcIiksXG4gICAgICB0aGVtZTogJ2RlZmF1bHQnLFxuICAgICAgd2lkdGg6IDMwMCxcbiAgICAgIGhlaWdodDogNDAwLFxuICAgICAgY2xvc2VUb0VzYzogdHJ1ZSxcbiAgICAgIGRpc2FibGVEcmFnOiBmYWxzZSxcbiAgICAgIGRpc2FibGVSZXNpemU6IGZhbHNlLFxuICAgICAgYW5pbWF0ZVRpbWU6IDI1MCxcbiAgICAgIGlmcmFtZTogZmFsc2VcbiAgICB9O1xuICAgIGpRdWVyeS5leHRlbmQodHJ1ZSwgdGhpcy5jb25maWcsIGNvbmZpZyk7XG5cbiAgICAvLyDrqaTrsoQg67OA7IiYIOy0iOq4sO2ZlFxuICAgIC8qKlxuICAgICAqIOyXtOugpOyeiOuKlCDsg4Htg5zsl5DshJwg64uk7IucIG9wZW7snbQg65CY66m0IHF1ZXVl7JeQIOuztOq0gCDtlZjsmIDri6TqsIAgY2xvc2Xtm4Qgb3BlblxuICAgICAqIEBtZW1iZXIge0FycmF5fVxuICAgICAqL1xuICAgIHRoaXMucXVldWUgPSBbXTtcbiAgICAvKipcbiAgICAgKiBAbWVtYmVyIHtqUXVlcnlFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMuJGFjdGl2ZU1vZGFsID0gbnVsbDtcbiAgICB0aGlzLiQgPSB7fTtcblxuICAgIHRoaXMuJHJlc2l6ZXJCZyA9IGpRdWVyeSgnPGRpdiBkYXRhLWF4NnVpLW1vZGFsLXJlc2l6ZXItYmFja2dyb3VuZD1cIlwiIG9uZHJhZ3N0YXJ0PVwicmV0dXJuIGZhbHNlO1wiPjwvZGl2PicpO1xuICAgIHRoaXMuJHJlc2l6ZXIgPSBqUXVlcnkoJzxkaXYgZGF0YS1heDZ1aS1tb2RhbC1yZXNpemVyPVwiXCIgb25kcmFnc3RhcnQ9XCJyZXR1cm4gZmFsc2U7XCI+PC9kaXY+Jyk7XG5cbiAgICBpZiAodHlwZW9mIGNvbmZpZyAhPT0gXCJ1bmRlZmluZWRcIikgdGhpcy5pbml0KCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKi9cbiAgaW5pdCgpIHtcbiAgICB0aGlzLm9uU3RhdGVDaGFuZ2VkID0gdGhpcy5jb25maWcub25TdGF0ZUNoYW5nZWQ7XG4gICAgZGVsZXRlIHRoaXMuY29uZmlnLm9uU3RhdGVDaGFuZ2VkO1xuXG4gICAgLy8gaW5pdCDtmLjstpwg7Jes67aAXG4gICAgdGhpcy5pbml0T25jZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICovXG4gIGluaXRPbmNlKCkge1xuICAgIGlmICh0aGlzLmluaXRpYWxpemVkKSByZXR1cm4gdGhpcztcbiAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIG9wZW4gdGhlIG1vZGFsXG4gICAqIEBtZXRob2RcbiAgICogQHJldHVybnMge0FYNlVJTW9kYWx9XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYFxuICAgKiBtb2RhbC5vcGVuKCk7XG4gICAqIG1vZGFsLm9wZW4oe1xuICAgICAgICAgICAgICogIHdpZHRoOiA1MDAsXG4gICAgICAgICAgICAgKiAgaGVpZ2h0OiA1MDBcbiAgICAgICAgICAgICAqIH0pO1xuICAgKiBtb2FhbC5vcGVuKHt9LCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICogIGNvbnNvbGUubG9nKHRoaXMpO1xuICAgICAgICAgICAgICogfSk7XG4gICAqIGBgYFxuICAgKi9cbiAgb3BlbihvcHRzLCBjYWxsYmFjaykge1xuICAgIGlmICh0eXBlb2Ygb3B0cyA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgb3B0cyA9IHt9XG4gICAgfVxuXG4gICAgb3B0cyA9IGpRdWVyeS5leHRlbmQodHJ1ZSwge30sIHRoaXMuY29uZmlnLCBvcHRzKTtcblxuICAgIGlmICh0aGlzLiRhY3RpdmVNb2RhbCkge1xuICAgICAgb3B0cy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgdGhpcy5xdWV1ZS5wdXNoKG9wdHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcGVuLmNhbGwodGhpcywgb3B0cywgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIGNsb3NlIHRoZSBtb2RhbFxuICAgKiBAbWV0aG9kXG4gICAqIEBwYXJhbSBfb3B0aW9uXG4gICAqIEByZXR1cm5zIHtBWDZVSU1vZGFsfVxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBcbiAgICogbW9kYWwuY2xvc2UoKTtcbiAgICogbW9kYWwuY2xvc2Uoe2NhbGxiYWNrOiBmdW5jdGlvbigpe1xuICAgICAqICAvLyBvbiBjbG9zZSBldmVudFxuICAgICAqIH0pO1xuICAgICAqIC8vIGNsb3NlIO2VqOyImOyXkCBjYWxsYmFja+ydhCDsoITri6ztlZjrqbQg7KCV7ZmV7ZWcIGNsb3NlIO2DgOydtOuwjeydhCDsupDsuZjtlaAg7IiYIOyeiOyKteuLiOuLpFxuICAgICAqIGBgYFxuICAgICAqL1xuICBjbG9zZShfb3B0aW9uKSB7XG4gICAgbGV0IG9wdHMsIHRoYXQ7XG5cbiAgICBpZiAodGhpcy4kYWN0aXZlTW9kYWwpIHtcbiAgICAgIG9wdHMgPSB0aGlzLm1vZGFsQ29uZmlnO1xuXG4gICAgICB0aGlzLiRhY3RpdmVNb2RhbC5hZGRDbGFzcyhcImRlc3Ryb3lcIik7XG4gICAgICBqUXVlcnkod2luZG93KVxuICAgICAgICAub2ZmKFwia2V5ZG93bi5heC1tb2RhbFwiKVxuICAgICAgICAub2ZmKFwicmVzaXplLmF4LW1vZGFsXCIpO1xuXG4gICAgICBzZXRUaW1lb3V0KChmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIO2UhOugiOyehCDsoJzqsbBcbiAgICAgICAgaWYgKG9wdHMuaWZyYW1lKSB7XG4gICAgICAgICAgbGV0ICRpZnJhbWUgPSB0aGlzLiRbXCJpZnJhbWVcIl07IC8vIGlmcmFtZSBqUXVlcnkgT2JqZWN0XG4gICAgICAgICAgaWYgKCRpZnJhbWUpIHtcbiAgICAgICAgICAgIGxldCBpZnJhbWVPYmplY3QgPSAkaWZyYW1lLmdldCgwKSxcbiAgICAgICAgICAgICAgaWRvYyA9IChpZnJhbWVPYmplY3QuY29udGVudERvY3VtZW50KSA/IGlmcmFtZU9iamVjdC5jb250ZW50RG9jdW1lbnQgOiBpZnJhbWVPYmplY3QuY29udGVudFdpbmRvdy5kb2N1bWVudDtcblxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgJChpZG9jLmJvZHkpLmNoaWxkcmVuKCkuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZG9jLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgICAgICAkaWZyYW1lXG4gICAgICAgICAgICAgIC5hdHRyKCdzcmMnLCAnYWJvdXQ6YmxhbmsnKVxuICAgICAgICAgICAgICAucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgIC8vIGZvcmNlIGdhcmJhcmdlIGNvbGxlY3Rpb24gZm9yIElFIG9ubHlcbiAgICAgICAgICAgIHdpbmRvdy5Db2xsZWN0R2FyYmFnZSAmJiB3aW5kb3cuQ29sbGVjdEdhcmJhZ2UoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy4kYWN0aXZlTW9kYWwpIHtcbiAgICAgICAgICB0aGlzLiRhY3RpdmVNb2RhbC5yZW1vdmUoKTtcbiAgICAgICAgICB0aGlzLiRhY3RpdmVNb2RhbCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB0aGF0ID0ge1xuICAgICAgICAgIHNlbGY6IHRoaXMsXG4gICAgICAgICAgaWQ6IG9wdHMuaWQsXG4gICAgICAgICAgdGhlbWU6IG9wdHMudGhlbWUsXG4gICAgICAgICAgd2lkdGg6IG9wdHMud2lkdGgsXG4gICAgICAgICAgaGVpZ2h0OiBvcHRzLmhlaWdodCxcbiAgICAgICAgICBzdGF0ZTogXCJjbG9zZVwiLFxuICAgICAgICAgICQ6IHRoaXMuJFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChfb3B0aW9uICYmIFUuaXNGdW5jdGlvbihfb3B0aW9uLmNhbGxiYWNrKSkge1xuICAgICAgICAgIF9vcHRpb24uY2FsbGJhY2suY2FsbCh0aGF0LCB0aGF0KTtcbiAgICAgICAgfSBlbHNlIGlmIChvcHRzLmNhbGxiYWNrICYmICghX29wdGlvbiB8fCAhX29wdGlvbi5kb05vdENhbGxiYWNrKSkge1xuICAgICAgICAgIG9wdHMuY2FsbGJhY2suY2FsbCh0aGF0LCB0aGF0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRzICYmIG9wdHMub25TdGF0ZUNoYW5nZWQpIHtcbiAgICAgICAgICBvcHRzLm9uU3RhdGVDaGFuZ2VkLmNhbGwodGhhdCwgdGhhdCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5vblN0YXRlQ2hhbmdlZCkge1xuICAgICAgICAgIHRoaXMub25TdGF0ZUNoYW5nZWQuY2FsbCh0aGF0LCB0aGF0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOyXtOugpOyVvCDtlaAg7YGQ6rCAIOuCqOyVhCDsnojri6TrqbQg7YGQ7JWE7J207YWc7Jy866GcIOuLpOyLnCBvcGVuXG4gICAgICAgIGlmICh0aGlzLnF1ZXVlICYmIHRoaXMucXVldWUubGVuZ3RoKSB7XG4gICAgICAgICAgb3Blbi5jYWxsKHRoaXMsIHRoaXMucXVldWUuc2hpZnQoKSk7XG4gICAgICAgIH1cblxuICAgICAgICBvcHRzID0gbnVsbDtcbiAgICAgICAgdGhhdCA9IG51bGw7XG4gICAgICB9KS5iaW5kKHRoaXMpLCB0aGlzLmNvbmZpZy5hbmltYXRlVGltZSk7XG4gICAgfVxuXG4gICAgdGhpcy5taW5pbWl6ZWQgPSBmYWxzZTsgLy8gaG9rc2lcblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEByZXR1cm5zIHtBWDZVSU1vZGFsfVxuICAgKi9cbiAgbWluaW1pemUobWluaW1pemVQb3NpdGlvbikge1xuICAgIGlmICh0aGlzLm1pbmltaXplZCAhPT0gdHJ1ZSkge1xuXG4gICAgICBsZXQgb3B0cyA9IHRoaXMubW9kYWxDb25maWc7XG4gICAgICBpZiAodHlwZW9mIG1pbmltaXplUG9zaXRpb24gPT09IFwidW5kZWZpbmVkXCIpIG1pbmltaXplUG9zaXRpb24gPSBjZmcubWluaW1pemVQb3NpdGlvbjtcblxuICAgICAgdGhpcy5taW5pbWl6ZWQgPSB0cnVlO1xuICAgICAgdGhpcy4kLmJvZHkuY3NzKHtkaXNwbGF5OiBcIm5vbmVcIn0pO1xuICAgICAgdGhpcy5tb2RhbENvbmZpZy5vcmlnaW5hbEhlaWdodCA9IG9wdHMuaGVpZ2h0O1xuICAgICAgdGhpcy5tb2RhbENvbmZpZy5oZWlnaHQgPSAwO1xuICAgICAgYWxpZ25Qcm9jZXNzb3JbbWluaW1pemVQb3NpdGlvbl0uY2FsbCh0aGlzKTtcblxuICAgICAgb25TdGF0ZUNoYW5nZWQuY2FsbCh0aGlzLCBvcHRzLCB7XG4gICAgICAgIHNlbGY6IHRoaXMsXG4gICAgICAgIHN0YXRlOiBcIm1pbmltaXplXCJcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGF4NW1vZGFsLnJlc3RvcmVcbiAgICogQHJldHVybnMge0FYNlVJTW9kYWx9XG4gICAqL1xuICByZXN0b3JlKCkge1xuICAgIGxldCBvcHRzID0gdGhpcy5tb2RhbENvbmZpZztcbiAgICBpZiAodGhpcy5taW5pbWl6ZWQpIHtcbiAgICAgIHRoaXMubWluaW1pemVkID0gZmFsc2U7XG4gICAgICB0aGlzLiQuYm9keS5jc3Moe2Rpc3BsYXk6IFwiYmxvY2tcIn0pO1xuICAgICAgdGhpcy5tb2RhbENvbmZpZy5oZWlnaHQgPSB0aGlzLm1vZGFsQ29uZmlnLm9yaWdpbmFsSGVpZ2h0O1xuICAgICAgdGhpcy5tb2RhbENvbmZpZy5vcmlnaW5hbEhlaWdodCA9IHVuZGVmaW5lZDtcblxuICAgICAgdGhpcy5hbGlnbih7bGVmdDogXCJjZW50ZXJcIiwgdG9wOiBcIm1pZGRsZVwifSk7XG4gICAgICBvblN0YXRlQ2hhbmdlZC5jYWxsKHRoaXMsIG9wdHMsIHtcbiAgICAgICAgc2VsZjogdGhpcyxcbiAgICAgICAgc3RhdGU6IFwicmVzdG9yZVwiXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIHNldENTU1xuICAgKiBAbWV0aG9kIGF4NW1vZGFsLmNzc1xuICAgKiBAcGFyYW0ge09iamVjdH0gY3NzIC1cbiAgICogQHJldHVybnMge0FYNlVJTW9kYWx9XG4gICAqL1xuICBjc3MoY3NzKSB7XG4gICAgaWYgKHRoaXMuJGFjdGl2ZU1vZGFsICYmICF0aGlzLmZ1bGxTY3JlZW4pIHtcbiAgICAgIHRoaXMuJGFjdGl2ZU1vZGFsLmNzcyhjc3MpO1xuICAgICAgaWYgKHR5cGVvZiBjc3Mud2lkdGggIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgdGhpcy5tb2RhbENvbmZpZy53aWR0aCA9IGNzcy53aWR0aDtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgY3NzLmhlaWdodCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICB0aGlzLm1vZGFsQ29uZmlnLmhlaWdodCA9IGNzcy5oZWlnaHQ7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYWxpZ24oKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQHBhcmFtIF9jb25maWdcbiAgICogQHJldHVybnMge0FYNlVJTW9kYWx9XG4gICAqL1xuICBzZXRNb2RhbENvbmZpZyhfY29uZmlnKSB7XG4gICAgdGhpcy5tb2RhbENvbmZpZyA9IGpRdWVyeS5leHRlbmQoe30sIHRoaXMubW9kYWxDb25maWcsIF9jb25maWcpO1xuICAgIHRoaXMuYWxpZ24oKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogQG1ldGhvZCBheDVtb2RhbC5hbGlnblxuICAgKiBAcGFyYW0gcG9zaXRpb25cbiAgICogQHBhcmFtIGVcbiAgICogQHJldHVybnMge2F4NW1vZGFsfVxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBqc1xuICAgKiBtb2RhbC5hbGlnbih7bGVmdDpcImNlbnRlclwiLCB0b3A6XCJtaWRkbGVcIn0pO1xuICAgKiBtb2RhbC5hbGlnbih7bGVmdDpcImxlZnRcIiwgdG9wOlwidG9wXCIsIG1hcmdpbjogMjB9KTtcbiAgICogYGBgXG4gICAqL1xuICBhbGlnbihwb3NpdGlvbiwgZSkge1xuICAgIGlmICghdGhpcy4kYWN0aXZlTW9kYWwpIHJldHVybiB0aGlzO1xuXG4gICAgbGV0IG9wdHMgPSB0aGlzLm1vZGFsQ29uZmlnLFxuICAgICAgYm94ID0ge1xuICAgICAgICB3aWR0aDogb3B0cy53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBvcHRzLmhlaWdodFxuICAgICAgfTtcblxuICAgIGNvbnN0IGZ1bGxTY3JlZW4gPSBvcHRzLmlzRnVsbFNjcmVlbiA9IChmdW5jdGlvbiAoX2Z1bGxTY3JlZW4pIHtcbiAgICAgIGlmICh0eXBlb2YgX2Z1bGxTY3JlZW4gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIGlmIChVLmlzRnVuY3Rpb24oX2Z1bGxTY3JlZW4pKSB7XG4gICAgICAgIHJldHVybiBfZnVsbFNjcmVlbigpO1xuICAgICAgfVxuICAgIH0pKG9wdHMuZnVsbFNjcmVlbik7XG5cbiAgICBpZiAoZnVsbFNjcmVlbikge1xuICAgICAgaWYgKG9wdHMuaGVhZGVyKSB0aGlzLiQuaGVhZGVyLnNob3coKTtcbiAgICAgIGlmIChvcHRzLmhlYWRlcikge1xuICAgICAgICBvcHRzLmhlYWRlckhlaWdodCA9IHRoaXMuJC5oZWFkZXIub3V0ZXJIZWlnaHQoKTtcbiAgICAgICAgYm94LmhlaWdodCArPSBvcHRzLmhlYWRlckhlaWdodDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9wdHMuaGVhZGVySGVpZ2h0ID0gMDtcbiAgICAgIH1cbiAgICAgIGJveC53aWR0aCA9IGpRdWVyeSh3aW5kb3cpLndpZHRoKCk7XG4gICAgICBib3guaGVpZ2h0ID0gb3B0cy5oZWlnaHQ7XG4gICAgICBib3gubGVmdCA9IDA7XG4gICAgICBib3gudG9wID0gMDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpZiAob3B0cy5oZWFkZXIpIHRoaXMuJC5oZWFkZXIuc2hvdygpO1xuICAgICAgaWYgKHBvc2l0aW9uKSB7XG4gICAgICAgIGpRdWVyeS5leHRlbmQodHJ1ZSwgb3B0cy5wb3NpdGlvbiwgcG9zaXRpb24pO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0cy5oZWFkZXIpIHtcbiAgICAgICAgb3B0cy5oZWFkZXJIZWlnaHQgPSB0aGlzLiQuaGVhZGVyLm91dGVySGVpZ2h0KCk7XG4gICAgICAgIGJveC5oZWlnaHQgKz0gb3B0cy5oZWFkZXJIZWlnaHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcHRzLmhlYWRlckhlaWdodCA9IDA7XG4gICAgICB9XG5cbiAgICAgIC8vLSBwb3NpdGlvbiDsoJXroKxcbiAgICAgIGlmIChvcHRzLnBvc2l0aW9uLmxlZnQgPT0gXCJsZWZ0XCIpIHtcbiAgICAgICAgYm94LmxlZnQgPSAob3B0cy5wb3NpdGlvbi5tYXJnaW4gfHwgMCk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChvcHRzLnBvc2l0aW9uLmxlZnQgPT0gXCJyaWdodFwiKSB7XG4gICAgICAgIC8vIHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICBib3gubGVmdCA9IGpRdWVyeSh3aW5kb3cpLndpZHRoKCkgLSBib3gud2lkdGggLSAob3B0cy5wb3NpdGlvbi5tYXJnaW4gfHwgMCk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChvcHRzLnBvc2l0aW9uLmxlZnQgPT0gXCJjZW50ZXJcIikge1xuICAgICAgICBib3gubGVmdCA9IGpRdWVyeSh3aW5kb3cpLndpZHRoKCkgLyAyIC0gYm94LndpZHRoIC8gMjtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBib3gubGVmdCA9IG9wdHMucG9zaXRpb24ubGVmdCB8fCAwO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0cy5wb3NpdGlvbi50b3AgPT0gXCJ0b3BcIikge1xuICAgICAgICBib3gudG9wID0gKG9wdHMucG9zaXRpb24ubWFyZ2luIHx8IDApO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAob3B0cy5wb3NpdGlvbi50b3AgPT0gXCJib3R0b21cIikge1xuICAgICAgICBib3gudG9wID0galF1ZXJ5KHdpbmRvdykuaGVpZ2h0KCkgLSBib3guaGVpZ2h0IC0gKG9wdHMucG9zaXRpb24ubWFyZ2luIHx8IDApO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAob3B0cy5wb3NpdGlvbi50b3AgPT0gXCJtaWRkbGVcIikge1xuICAgICAgICBib3gudG9wID0galF1ZXJ5KHdpbmRvdykuaGVpZ2h0KCkgLyAyIC0gYm94LmhlaWdodCAvIDI7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgYm94LnRvcCA9IG9wdHMucG9zaXRpb24udG9wIHx8IDA7XG4gICAgICB9XG4gICAgICBpZiAoYm94LmxlZnQgPCAwKSBib3gubGVmdCA9IDA7XG4gICAgICBpZiAoYm94LnRvcCA8IDApIGJveC50b3AgPSAwO1xuICAgIH1cblxuICAgIHRoaXMuJGFjdGl2ZU1vZGFsLmNzcyhib3gpO1xuICAgIHRoaXMuJFtcImJvZHlcIl0uY3NzKHtoZWlnaHQ6IGJveC5oZWlnaHQgLSAob3B0cy5oZWFkZXJIZWlnaHQgfHwgMCl9KTtcblxuICAgIGlmIChvcHRzLmlmcmFtZSkge1xuICAgICAgdGhpcy4kW1wiaWZyYW1lLXdyYXBcIl0uY3NzKHtoZWlnaHQ6IGJveC5oZWlnaHQgLSBvcHRzLmhlYWRlckhlaWdodH0pO1xuICAgICAgdGhpcy4kW1wiaWZyYW1lXCJdLmNzcyh7aGVpZ2h0OiBib3guaGVpZ2h0IC0gb3B0cy5oZWFkZXJIZWlnaHR9KTtcbiAgICB9IGVsc2Uge1xuXG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQVg2VUlNb2RhbDtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vc3JjL0FYNlVJTW9kYWwuanMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGUuc2Nzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7fVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zdHlsZS5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zdHlsZS5zY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9zcmMvQVg2VUlNb2RhbC9zdHlsZS5zY3NzXG4vLyBtb2R1bGUgaWQgPSAxMDZcbi8vIG1vZHVsZSBjaHVua3MgPSA3IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHVuZGVmaW5lZCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJALXdlYmtpdC1rZXlmcmFtZXMgYXgtbW9kYWwge1xcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAwLjA7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwLjgpOyB9XFxuICAxMDAlIHtcXG4gICAgb3BhY2l0eTogMS4wO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMSk7IH0gfVxcblxcbkAtbW96LWtleWZyYW1lcyBheC1tb2RhbCB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDAuMDtcXG4gICAgLW1vei10cmFuc2Zvcm06IHNjYWxlKDAuOCk7IH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAxLjA7XFxuICAgIC1tb3otdHJhbnNmb3JtOiBzY2FsZSgxKTsgfSB9XFxuXFxuQGtleWZyYW1lcyBheC1tb2RhbCB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDAuMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDAuOCk7XFxuICAgIC1tb3otdHJhbnNmb3JtOiBzY2FsZSgwLjgpO1xcbiAgICAtbXMtdHJhbnNmb3JtOiBzY2FsZSgwLjgpO1xcbiAgICAtby10cmFuc2Zvcm06IHNjYWxlKDAuOCk7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMC44KTsgfVxcbiAgMTAwJSB7XFxuICAgIG9wYWNpdHk6IDEuMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICAtbW96LXRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICAgIC1tcy10cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICAtby10cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEpOyB9IH1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgYXgtbW9kYWwtZGVzdHJveSB7XFxuICAxMDAlIHtcXG4gICAgb3BhY2l0eTogMC4wO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMCUpOyB9XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDEuMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7IH0gfVxcblxcbkAtbW96LWtleWZyYW1lcyBheC1tb2RhbC1kZXN0cm95IHtcXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAwLjA7XFxuICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwJSk7IH1cXG4gIDAlIHtcXG4gICAgb3BhY2l0eTogMS4wO1xcbiAgICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTsgfSB9XFxuXFxuQGtleWZyYW1lcyBheC1tb2RhbC1kZXN0cm95IHtcXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAwLjA7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwJSk7XFxuICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwJSk7XFxuICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMjAlKTtcXG4gICAgLW8tdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwJSk7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMCUpOyB9XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDEuMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XFxuICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xcbiAgICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xcbiAgICAtby10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTsgfSB9XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIGF4LW1vZGFsLWZ1bGxzY3JlZW4ge1xcbiAgMCUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMCUpOyB9XFxuICAxMDAlIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7IH0gfVxcblxcbkAtbW96LWtleWZyYW1lcyBheC1tb2RhbC1mdWxsc2NyZWVuIHtcXG4gIDAlIHtcXG4gICAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMjAlKTsgfVxcbiAgMTAwJSB7XFxuICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIGF4LW1vZGFsLWZ1bGxzY3JlZW4ge1xcbiAgMCUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMCUpO1xcbiAgICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMCUpO1xcbiAgICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDIwJSk7XFxuICAgIC1vLXRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMCUpO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMjAlKTsgfVxcbiAgMTAwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xcbiAgICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcXG4gICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcXG4gICAgLW8tdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7IH0gfVxcblxcbkAtd2Via2l0LWtleWZyYW1lcyBheC1tb2RhbC1mdWxsc2NyZWVuLWRlc3Ryb3kge1xcbiAgMCUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTsgfVxcbiAgMTAwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDEwMCUpOyB9IH1cXG5cXG5ALW1vei1rZXlmcmFtZXMgYXgtbW9kYWwtZnVsbHNjcmVlbi1kZXN0cm95IHtcXG4gIDAlIHtcXG4gICAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7IH1cXG4gIDEwMCUge1xcbiAgICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgxMDAlKTsgfSB9XFxuXFxuQGtleWZyYW1lcyBheC1tb2RhbC1mdWxsc2NyZWVuLWRlc3Ryb3kge1xcbiAgMCUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcXG4gICAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XFxuICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XFxuICAgIC1vLXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApOyB9XFxuICAxMDAlIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMTAwJSk7XFxuICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDEwMCUpO1xcbiAgICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDEwMCUpO1xcbiAgICAtby10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMTAwJSk7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgxMDAlKTsgfSB9XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIGF4LW1vZGFsLWZhZGUtaW4ge1xcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAwLjA7IH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAxLjA7IH0gfVxcblxcbkAtbW96LWtleWZyYW1lcyBheC1tb2RhbC1mYWRlLWluIHtcXG4gIDAlIHtcXG4gICAgb3BhY2l0eTogMC4wOyB9XFxuICAxMDAlIHtcXG4gICAgb3BhY2l0eTogMS4wOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIGF4LW1vZGFsLWZhZGUtaW4ge1xcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAwLjA7IH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAxLjA7IH0gfVxcblxcbkAtd2Via2l0LWtleWZyYW1lcyBheC1tb2RhbC1mYWRlLW91dCB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDEuMDsgfVxcbiAgMTAwJSB7XFxuICAgIG9wYWNpdHk6IDAuMDsgfSB9XFxuXFxuQC1tb3ota2V5ZnJhbWVzIGF4LW1vZGFsLWZhZGUtb3V0IHtcXG4gIDAlIHtcXG4gICAgb3BhY2l0eTogMS4wOyB9XFxuICAxMDAlIHtcXG4gICAgb3BhY2l0eTogMC4wOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIGF4LW1vZGFsLWZhZGUtb3V0IHtcXG4gIDAlIHtcXG4gICAgb3BhY2l0eTogMS4wOyB9XFxuICAxMDAlIHtcXG4gICAgb3BhY2l0eTogMC4wOyB9IH1cXG5cXG5bZGF0YS1heDZ1aS1tb2RhbF0ge1xcbiAgLXdlYmtpdC1hbmltYXRpb246IGF4LW1vZGFsIDAuM3MgY3ViaWMtYmV6aWVyKDAuMTc1LCAwLjg4NSwgMC4zMiwgMS4yNzUpIGZvcndhcmRzO1xcbiAgLW1vei1hbmltYXRpb246IGF4LW1vZGFsIDAuM3MgY3ViaWMtYmV6aWVyKDAuMTc1LCAwLjg4NSwgMC4zMiwgMS4yNzUpIGZvcndhcmRzO1xcbiAgYW5pbWF0aW9uOiBheC1tb2RhbCAwLjNzIGN1YmljLWJlemllcigwLjE3NSwgMC44ODUsIDAuMzIsIDEuMjc1KSBmb3J3YXJkcztcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDBweCk7XFxuICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlWigwcHgpO1xcbiAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWigwcHgpO1xcbiAgLW8tdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDBweCk7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVooMHB4KTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgYm94LXNoYWRvdzogMHB4IDBweCA1cHggMHB4IHJnYmEoMCwgMCwgMCwgMC42KTtcXG4gIHotaW5kZXg6IDIwMDA7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICBsZWZ0OiAwcHg7XFxuICB0b3A6IDBweDtcXG4gIGJveC1zaXppbmc6IGNvbnRlbnQtYm94OyB9XFxuICBbZGF0YS1heDZ1aS1tb2RhbF0gKiB7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IH1cXG4gIFtkYXRhLWF4NnVpLW1vZGFsXSAqOmJlZm9yZSxcXG4gIFtkYXRhLWF4NnVpLW1vZGFsXSAqOmFmdGVyIHtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDsgfVxcbiAgW2RhdGEtYXg2dWktbW9kYWxdICosXFxuICBbZGF0YS1heDZ1aS1tb2RhbF0gKjpiZWZvcmUsXFxuICBbZGF0YS1heDZ1aS1tb2RhbF0gKjphZnRlciB7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IH1cXG4gIFtkYXRhLWF4NnVpLW1vZGFsXSAuYXgtbW9kYWwtaGVhZGVyIHtcXG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICAgIHBhZGRpbmc6IDEwcHggMTVweDtcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiA0cHg7XFxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA0cHg7XFxuICAgIGN1cnNvcjogbW92ZTsgfVxcbiAgICBbZGF0YS1heDZ1aS1tb2RhbF0gLmF4LW1vZGFsLWhlYWRlciAuYXgtbW9kYWwtaGVhZGVyLWFkZG9uIHtcXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgcmlnaHQ6IDBweDtcXG4gICAgICB0b3A6IDBweDtcXG4gICAgICBwYWRkaW5nOiAxMHB4IDEwcHg7IH1cXG4gICAgICBbZGF0YS1heDZ1aS1tb2RhbF0gLmF4LW1vZGFsLWhlYWRlciAuYXgtbW9kYWwtaGVhZGVyLWFkZG9uIFtkYXRhLW1vZGFsLWhlYWRlci1idG5dIHtcXG4gICAgICAgIGJvcmRlcjogMDtcXG4gICAgICAgIHBhZGRpbmc6IDBweCAycHg7XFxuICAgICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgICAgIG91dGxpbmU6IDA7IH1cXG4gIFtkYXRhLWF4NnVpLW1vZGFsXSAuYXgtbW9kYWwtYm9keSB7XFxuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDRweDtcXG4gICAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDRweDtcXG4gICAgcGFkZGluZzogMHB4O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIC13ZWJraXQtYm94LWZsZXg6IDE7XFxuICAgIC1tb3otYm94LWZsZXg6IDE7XFxuICAgIGJveC1mbGV4OiAxO1xcbiAgICAtd2Via2l0LWZsZXg6IDE7XFxuICAgIC1tb3otZmxleDogMTtcXG4gICAgLW1zLWZsZXg6IDE7XFxuICAgIGZsZXg6IDE7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxcbiAgICBbZGF0YS1heDZ1aS1tb2RhbF0gLmF4LW1vZGFsLWJvZHkgaWZyYW1lIHtcXG4gICAgICBib3JkZXI6IDAgbm9uZTsgfVxcbiAgICBbZGF0YS1heDZ1aS1tb2RhbF0gLmF4LW1vZGFsLWJvZHkgLmZhZGVJbiB7XFxuICAgICAgLXdlYmtpdC1hbmltYXRpb246IGF4LW1vZGFsLWZhZGUtaW4gMC4zcyBjdWJpYy1iZXppZXIoMC4xNzUsIDAuODg1LCAwLjMyLCAxLjI3NSkgZm9yd2FyZHM7XFxuICAgICAgLW1vei1hbmltYXRpb246IGF4LW1vZGFsLWZhZGUtaW4gMC4zcyBjdWJpYy1iZXppZXIoMC4xNzUsIDAuODg1LCAwLjMyLCAxLjI3NSkgZm9yd2FyZHM7XFxuICAgICAgYW5pbWF0aW9uOiBheC1tb2RhbC1mYWRlLWluIDAuM3MgY3ViaWMtYmV6aWVyKDAuMTc1LCAwLjg4NSwgMC4zMiwgMS4yNzUpIGZvcndhcmRzOyB9XFxuICAgIFtkYXRhLWF4NnVpLW1vZGFsXSAuYXgtbW9kYWwtYm9keSAuZmFkZU91dCB7XFxuICAgICAgLXdlYmtpdC1hbmltYXRpb246IGF4LW1vZGFsLWZhZGUtb3V0IDAuM3MgY3ViaWMtYmV6aWVyKDAuMTc1LCAwLjg4NSwgMC4zMiwgMS4yNzUpIGZvcndhcmRzO1xcbiAgICAgIC1tb3otYW5pbWF0aW9uOiBheC1tb2RhbC1mYWRlLW91dCAwLjNzIGN1YmljLWJlemllcigwLjE3NSwgMC44ODUsIDAuMzIsIDEuMjc1KSBmb3J3YXJkcztcXG4gICAgICBhbmltYXRpb246IGF4LW1vZGFsLWZhZGUtb3V0IDAuM3MgY3ViaWMtYmV6aWVyKDAuMTc1LCAwLjg4NSwgMC4zMiwgMS4yNzUpIGZvcndhcmRzOyB9XFxuICBbZGF0YS1heDZ1aS1tb2RhbF0gLmF4LW1vZGFsLWhlYWRlciB7XFxuICAgIGNvbG9yOiAjMzMzO1xcbiAgICBiYWNrZ3JvdW5kOiAjZjVmNWY1OyB9XFxuICAgIFtkYXRhLWF4NnVpLW1vZGFsXSAuYXgtbW9kYWwtaGVhZGVyIC5heC1tb2RhbC1oZWFkZXItYWRkb24gYSB7XFxuICAgICAgY29sb3I6ICMzMzM7XFxuICAgICAgb3V0bGluZTogMDsgfVxcbiAgW2RhdGEtYXg2dWktbW9kYWxdLmRlc3Ryb3kge1xcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogYXgtbW9kYWwtZGVzdHJveSAwLjNzIGN1YmljLWJlemllcigwLjE3NSwgMC44ODUsIDAuMzIsIDEuMjc1KSBmb3J3YXJkcztcXG4gICAgLW1vei1hbmltYXRpb246IGF4LW1vZGFsLWRlc3Ryb3kgMC4zcyBjdWJpYy1iZXppZXIoMC4xNzUsIDAuODg1LCAwLjMyLCAxLjI3NSkgZm9yd2FyZHM7XFxuICAgIGFuaW1hdGlvbjogYXgtbW9kYWwtZGVzdHJveSAwLjNzIGN1YmljLWJlemllcigwLjE3NSwgMC44ODUsIDAuMzIsIDEuMjc1KSBmb3J3YXJkczsgfVxcbiAgW2RhdGEtYXg2dWktbW9kYWxdLmZ1bGxzY3JlZW4ge1xcbiAgICBib3JkZXI6IDBweCBub25lO1xcbiAgICBib3JkZXItcmFkaXVzOiAwcHg7XFxuICAgIGJveC1zaGFkb3c6IG5vbmU7XFxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBheC1tb2RhbC1mdWxsc2NyZWVuIDAuM3MgY3ViaWMtYmV6aWVyKDAuMTc1LCAwLjg4NSwgMC4zMiwgMS4yNzUpIGZvcndhcmRzO1xcbiAgICAtbW96LWFuaW1hdGlvbjogYXgtbW9kYWwtZnVsbHNjcmVlbiAwLjNzIGN1YmljLWJlemllcigwLjE3NSwgMC44ODUsIDAuMzIsIDEuMjc1KSBmb3J3YXJkcztcXG4gICAgYW5pbWF0aW9uOiBheC1tb2RhbC1mdWxsc2NyZWVuIDAuM3MgY3ViaWMtYmV6aWVyKDAuMTc1LCAwLjg4NSwgMC4zMiwgMS4yNzUpIGZvcndhcmRzOyB9XFxuICAgIFtkYXRhLWF4NnVpLW1vZGFsXS5mdWxsc2NyZWVuLmRlc3Ryb3kge1xcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uOiBheC1tb2RhbC1mdWxsc2NyZWVuLWRlc3Ryb3kgMC4zcyBjdWJpYy1iZXppZXIoMC4xOSwgMSwgMC4yMiwgMSkgZm9yd2FyZHM7XFxuICAgICAgLW1vei1hbmltYXRpb246IGF4LW1vZGFsLWZ1bGxzY3JlZW4tZGVzdHJveSAwLjNzIGN1YmljLWJlemllcigwLjE5LCAxLCAwLjIyLCAxKSBmb3J3YXJkcztcXG4gICAgICBhbmltYXRpb246IGF4LW1vZGFsLWZ1bGxzY3JlZW4tZGVzdHJveSAwLjNzIGN1YmljLWJlemllcigwLjE5LCAxLCAwLjIyLCAxKSBmb3J3YXJkczsgfVxcbiAgW2RhdGEtYXg2dWktbW9kYWxdLmRyYWdlZCAuYXgtbW9kYWwtaGVhZGVyIHtcXG4gICAgb3BhY2l0eTogMC41OyB9XFxuICBbZGF0YS1heDZ1aS1tb2RhbF0uZHJhZ2VkIC5heC1tb2RhbC1ib2R5IHtcXG4gICAgb3BhY2l0eTogMC41OyB9XFxuICBbZGF0YS1heDZ1aS1tb2RhbF0gW2RhdGEtYXg2bW9kYWwtcmVzaXplcl0ge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGRpc3BsYXk6IGJsb2NrOyB9XFxuICAgIFtkYXRhLWF4NnVpLW1vZGFsXSBbZGF0YS1heDZtb2RhbC1yZXNpemVyXTpiZWZvcmUge1xcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICBjb250ZW50OiAnICc7XFxuICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgd2lkdGg6IGF1dG87XFxuICAgICAgaGVpZ2h0OiBhdXRvO1xcbiAgICAgIGxlZnQ6IGF1dG87XFxuICAgICAgdG9wOiBhdXRvO1xcbiAgICAgIHJpZ2h0OiBhdXRvO1xcbiAgICAgIGJvdHRvbTogYXV0bzsgfVxcbiAgICBbZGF0YS1heDZ1aS1tb2RhbF0gW2RhdGEtYXg2bW9kYWwtcmVzaXplcl1bZGF0YS1heDZtb2RhbC1yZXNpemVyPVxcXCJ0b3BcXFwiXSB7XFxuICAgICAgbGVmdDogMDtcXG4gICAgICB0b3A6IDA7XFxuICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgaGVpZ2h0OiAwOyB9XFxuICAgICAgW2RhdGEtYXg2dWktbW9kYWxdIFtkYXRhLWF4Nm1vZGFsLXJlc2l6ZXJdW2RhdGEtYXg2bW9kYWwtcmVzaXplcj1cXFwidG9wXFxcIl06YmVmb3JlIHtcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICAgICAgaGVpZ2h0OiA4cHg7XFxuICAgICAgICBsZWZ0OiAwO1xcbiAgICAgICAgdG9wOiAtNHB4O1xcbiAgICAgICAgY3Vyc29yOiByb3ctcmVzaXplOyB9XFxuICAgIFtkYXRhLWF4NnVpLW1vZGFsXSBbZGF0YS1heDZtb2RhbC1yZXNpemVyXVtkYXRhLWF4Nm1vZGFsLXJlc2l6ZXI9XFxcImJvdHRvbVxcXCJdIHtcXG4gICAgICBsZWZ0OiAwO1xcbiAgICAgIGJvdHRvbTogMDtcXG4gICAgICB3aWR0aDogMTAwJTtcXG4gICAgICBoZWlnaHQ6IDA7IH1cXG4gICAgICBbZGF0YS1heDZ1aS1tb2RhbF0gW2RhdGEtYXg2bW9kYWwtcmVzaXplcl1bZGF0YS1heDZtb2RhbC1yZXNpemVyPVxcXCJib3R0b21cXFwiXTpiZWZvcmUge1xcbiAgICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgICBoZWlnaHQ6IDhweDtcXG4gICAgICAgIGxlZnQ6IDA7XFxuICAgICAgICB0b3A6IC00cHg7XFxuICAgICAgICBjdXJzb3I6IHJvdy1yZXNpemU7IH1cXG4gICAgW2RhdGEtYXg2dWktbW9kYWxdIFtkYXRhLWF4Nm1vZGFsLXJlc2l6ZXJdW2RhdGEtYXg2bW9kYWwtcmVzaXplcj1cXFwibGVmdFxcXCJdIHtcXG4gICAgICBsZWZ0OiAwO1xcbiAgICAgIHRvcDogMDtcXG4gICAgICB3aWR0aDogMDtcXG4gICAgICBoZWlnaHQ6IDEwMCU7IH1cXG4gICAgICBbZGF0YS1heDZ1aS1tb2RhbF0gW2RhdGEtYXg2bW9kYWwtcmVzaXplcl1bZGF0YS1heDZtb2RhbC1yZXNpemVyPVxcXCJsZWZ0XFxcIl06YmVmb3JlIHtcXG4gICAgICAgIHdpZHRoOiA4cHg7XFxuICAgICAgICBoZWlnaHQ6IDEwMCU7XFxuICAgICAgICBsZWZ0OiAtNHB4O1xcbiAgICAgICAgdG9wOiAwO1xcbiAgICAgICAgY3Vyc29yOiBjb2wtcmVzaXplOyB9XFxuICAgIFtkYXRhLWF4NnVpLW1vZGFsXSBbZGF0YS1heDZtb2RhbC1yZXNpemVyXVtkYXRhLWF4Nm1vZGFsLXJlc2l6ZXI9XFxcInJpZ2h0XFxcIl0ge1xcbiAgICAgIHJpZ2h0OiAwO1xcbiAgICAgIHRvcDogMDtcXG4gICAgICB3aWR0aDogMDtcXG4gICAgICBoZWlnaHQ6IDEwMCU7IH1cXG4gICAgICBbZGF0YS1heDZ1aS1tb2RhbF0gW2RhdGEtYXg2bW9kYWwtcmVzaXplcl1bZGF0YS1heDZtb2RhbC1yZXNpemVyPVxcXCJyaWdodFxcXCJdOmJlZm9yZSB7XFxuICAgICAgICB3aWR0aDogOHB4O1xcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xcbiAgICAgICAgbGVmdDogLTRweDtcXG4gICAgICAgIHRvcDogMDtcXG4gICAgICAgIGN1cnNvcjogY29sLXJlc2l6ZTsgfVxcbiAgICBbZGF0YS1heDZ1aS1tb2RhbF0gW2RhdGEtYXg2bW9kYWwtcmVzaXplcl1bZGF0YS1heDZtb2RhbC1yZXNpemVyPVxcXCJ0b3AtbGVmdFxcXCJdIHtcXG4gICAgICBsZWZ0OiAwO1xcbiAgICAgIHRvcDogMDtcXG4gICAgICB3aWR0aDogMDtcXG4gICAgICBoZWlnaHQ6IDA7IH1cXG4gICAgICBbZGF0YS1heDZ1aS1tb2RhbF0gW2RhdGEtYXg2bW9kYWwtcmVzaXplcl1bZGF0YS1heDZtb2RhbC1yZXNpemVyPVxcXCJ0b3AtbGVmdFxcXCJdOmJlZm9yZSB7XFxuICAgICAgICB3aWR0aDogOHB4O1xcbiAgICAgICAgaGVpZ2h0OiA4cHg7XFxuICAgICAgICBsZWZ0OiAtNHB4O1xcbiAgICAgICAgdG9wOiAtNHB4O1xcbiAgICAgICAgY3Vyc29yOiBud3NlLXJlc2l6ZTsgfVxcbiAgICBbZGF0YS1heDZ1aS1tb2RhbF0gW2RhdGEtYXg2bW9kYWwtcmVzaXplcl1bZGF0YS1heDZtb2RhbC1yZXNpemVyPVxcXCJ0b3AtcmlnaHRcXFwiXSB7XFxuICAgICAgcmlnaHQ6IDA7XFxuICAgICAgdG9wOiAwO1xcbiAgICAgIHdpZHRoOiAwO1xcbiAgICAgIGhlaWdodDogMDsgfVxcbiAgICAgIFtkYXRhLWF4NnVpLW1vZGFsXSBbZGF0YS1heDZtb2RhbC1yZXNpemVyXVtkYXRhLWF4Nm1vZGFsLXJlc2l6ZXI9XFxcInRvcC1yaWdodFxcXCJdOmJlZm9yZSB7XFxuICAgICAgICB3aWR0aDogOHB4O1xcbiAgICAgICAgaGVpZ2h0OiA4cHg7XFxuICAgICAgICBsZWZ0OiAtNHB4O1xcbiAgICAgICAgdG9wOiAtNHB4O1xcbiAgICAgICAgY3Vyc29yOiBuZXN3LXJlc2l6ZTsgfVxcbiAgICBbZGF0YS1heDZ1aS1tb2RhbF0gW2RhdGEtYXg2bW9kYWwtcmVzaXplcl1bZGF0YS1heDZtb2RhbC1yZXNpemVyPVxcXCJib3R0b20tbGVmdFxcXCJdIHtcXG4gICAgICBsZWZ0OiAwO1xcbiAgICAgIGJvdHRvbTogMDtcXG4gICAgICB3aWR0aDogMDtcXG4gICAgICBoZWlnaHQ6IDA7IH1cXG4gICAgICBbZGF0YS1heDZ1aS1tb2RhbF0gW2RhdGEtYXg2bW9kYWwtcmVzaXplcl1bZGF0YS1heDZtb2RhbC1yZXNpemVyPVxcXCJib3R0b20tbGVmdFxcXCJdOmJlZm9yZSB7XFxuICAgICAgICB3aWR0aDogOHB4O1xcbiAgICAgICAgaGVpZ2h0OiA4cHg7XFxuICAgICAgICBsZWZ0OiAtNHB4O1xcbiAgICAgICAgdG9wOiAtNHB4O1xcbiAgICAgICAgY3Vyc29yOiBuZXN3LXJlc2l6ZTsgfVxcbiAgICBbZGF0YS1heDZ1aS1tb2RhbF0gW2RhdGEtYXg2bW9kYWwtcmVzaXplcl1bZGF0YS1heDZtb2RhbC1yZXNpemVyPVxcXCJib3R0b20tcmlnaHRcXFwiXSB7XFxuICAgICAgcmlnaHQ6IDA7XFxuICAgICAgYm90dG9tOiAwO1xcbiAgICAgIHdpZHRoOiAwO1xcbiAgICAgIGhlaWdodDogMDsgfVxcbiAgICAgIFtkYXRhLWF4NnVpLW1vZGFsXSBbZGF0YS1heDZtb2RhbC1yZXNpemVyXVtkYXRhLWF4Nm1vZGFsLXJlc2l6ZXI9XFxcImJvdHRvbS1yaWdodFxcXCJdOmJlZm9yZSB7XFxuICAgICAgICB3aWR0aDogOHB4O1xcbiAgICAgICAgaGVpZ2h0OiA4cHg7XFxuICAgICAgICBsZWZ0OiAtNHB4O1xcbiAgICAgICAgdG9wOiAtNHB4O1xcbiAgICAgICAgY3Vyc29yOiBud3NlLXJlc2l6ZTsgfVxcblxcbltkYXRhLWF4NnVpLW1vZGFsLXJlc2l6ZXItYmFja2dyb3VuZF0ge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgbGVmdDogMHB4O1xcbiAgdG9wOiAwcHg7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbiAgei1pbmRleDogMjAwMDtcXG4gIGN1cnNvcjogbW92ZTsgfVxcblxcbltkYXRhLWF4NnVpLW1vZGFsLXJlc2l6ZXJdIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDA7XFxuICB0b3A6IDA7XFxuICB6LWluZGV4OiAyMDAxO1xcbiAgY3Vyc29yOiBtb3ZlO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNjY2M7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjZmYwMDAwO1xcbiAgb3BhY2l0eTogMC4zO1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgYm94LXNoYWRvdzogMHB4IDBweCA1cHggMHB4IHJnYmEoMCwgMCwgMCwgMC42KTsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIhLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi9zcmMvQVg2VUlNb2RhbC9zdHlsZS5zY3NzXG4vLyBtb2R1bGUgaWQgPSAxMDdcbi8vIG1vZHVsZSBjaHVua3MgPSA3IiwiaW1wb3J0ICQgZnJvbSBcImpxbWluXCI7XG5pbXBvcnQgTW9kYWwgZnJvbSBcIi4uLy4uL3NyYy9BWDZVSU1vZGFsXCI7XG5pbXBvcnQgXCIuLi8uLi9zcmMvQVg2VUlNb2RhbC9zdHlsZS5zY3NzXCI7XG5cbmxldCBodG1sID0gYFxuPGEgY2xhc3M9XCJ3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHQgYnRuXCIgZGF0YS1idG49XCJtb2RhbFwiPm1vZGFsPC9hPlxuYDtcbmxldCBmbiA9IHtcbiAgbW9kdWxlUnVuOiBmdW5jdGlvbiAoJGJvZHkpIHtcblxuICAgIGxldCBtb2RhbCA9IG5ldyBNb2RhbCgpO1xuICAgIG1vZGFsLnNldENvbmZpZyh7fSk7XG5cbiAgICAkYm9keS5vbihcImNsaWNrXCIsICdbZGF0YS1idG5dJywgKGUpID0+IHtcbiAgICAgIGxldCBidG4gPSBlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1idG5cIik7XG4gICAgICBsZXQgcHJvY2Vzc29yID0ge1xuICAgICAgICBtb2RhbCgpIHtcbiAgICAgICAgICBtb2RhbC5vcGVuKHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiB7XG4gICAgICAgICAgICAgIGxlZnQ6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgIHRvcDogXCJtaWRkbGVcIixcbiAgICAgICAgICAgICAgbWFyZ2luOiAxMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHdpZHRoOiA4MDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDYwMCxcbiAgICAgICAgICAgIGRpc2FibGVEcmFnOiBmYWxzZSxcbiAgICAgICAgICAgIGZ1bGxTY3JlZW46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICgkKHdpbmRvdykud2lkdGgoKSA8IDYwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy4kLmJvZHkuYXBwZW5kKCc8aDE+ZGl2IGNvbnRlbnRzPC9oMT4nKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIGlmIChidG4gaW4gcHJvY2Vzc29yKSB7XG4gICAgICAgIHByb2Nlc3NvcltidG5dKCk7XG4gICAgICB9XG4gICAgfSk7XG5cblxuICB9LFxuICBtb2R1bGVEZXN0cm95OiBmdW5jdGlvbiAoJGJvZHkpIHtcbiAgICAkYm9keS5vZmYoXCJjbGlja1wiKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBodG1sOiBodG1sLFxuICBmbjogZm5cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbW9kYWwuanMiLCIvKiFcbiAqIG11c3RhY2hlLmpzIC0gTG9naWMtbGVzcyB7e211c3RhY2hlfX0gdGVtcGxhdGVzIHdpdGggSmF2YVNjcmlwdFxuICogaHR0cDovL2dpdGh1Yi5jb20vamFubC9tdXN0YWNoZS5qc1xuICogaHR0cHM6Ly9naXRodWIuY29tL3Rob21hc0phbmcvbXVzdGFjaGUuanMgLS0gaW1wb3JvdmUgc29tZSB2YXJpYWJsZXNcbiAqL1xuXG5cbi8qKlxuICogQVg2TXVzdGFjaGXripQgaHR0cDovL2dpdGh1Yi5jb20vamFubC9tdXN0YWNoZS5qc+yXkCDrqofqsIDsp4Ag7LWc7IaM7ZWc7J2YIOq4sOuKpeydhCDtipzri53tlZjsl6wg7IKs7Jqp7ZWY64qUIO2FnO2UjOumvyDsl5Tsp4TsnoXri4jri6QuXG4gKiBAbmFtZXNwYWNlIEFYNk11c3RhY2hlXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIEFYNk11c3RhY2hlLnJlbmRlclxuICogQGV4YW1wbGVcbiAqIGBgYGpzXG4gKiBheDUubXVzdGFjaGUucmVuZGVyKHRlbXBsYXRlLCB2aWV3KVxuICpcbiAqXG4gKiAvL0FycmF5IEBpXG4gKiAvL3t7I2JlYXRsZXN9fVxuICogLy97e2ZpcnN0TmFtZX19IHt7bGFzdE5hbWV9fSAoe3tAaX19KSAoe3tAZmlyc3R9fSlcbiAqIC8ve3svYmVhdGxlc319XG4gKlxuICogLy9PYmplY3QgQGVhY2hcbiAqIHt7I2JlYXRsZXN9fVxuICogIHt7I0BlYWNofX1cbiAqICAgICAge3tAa2V5fX0gOiB7e0B2YWx1ZS5maXJzdE5hbWV9fSB7e0B2YWx1ZS5sYXN0TmFtZX19XG4gKiAge3svQGVhY2h9fVxuICoge3svYmVhdGxlc319XG4gKlxuICogYGBgXG4gKi9cblxuXG5cbmxldCBBWDYgPSB7fTtcblxuKGZ1bmN0aW9uIGRlZmluZU11c3RhY2hlKGdsb2JhbCwgZmFjdG9yeSkge1xuXG4gIGZhY3RvcnkoZ2xvYmFsLm11c3RhY2hlID0ge30pO1xuXG59KEFYNiwgZnVuY3Rpb24gbXVzdGFjaGVGYWN0b3J5KG11c3RhY2hlKSB7XG5cbiAgdmFyIG9iamVjdFRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbiAgdmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIGlzQXJyYXlQb2x5ZmlsbChvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0VG9TdHJpbmcuY2FsbChvYmplY3QpID09PSAnW29iamVjdCBBcnJheV0nO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGlzRnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmplY3QgPT09ICdmdW5jdGlvbic7XG4gIH1cblxuICAvKipcbiAgICogTW9yZSBjb3JyZWN0IHR5cGVvZiBzdHJpbmcgaGFuZGxpbmcgYXJyYXlcbiAgICogd2hpY2ggbm9ybWFsbHkgcmV0dXJucyB0eXBlb2YgJ29iamVjdCdcbiAgICovXG4gIGZ1bmN0aW9uIHR5cGVTdHIob2JqKSB7XG4gICAgcmV0dXJuIGlzQXJyYXkob2JqKSA/ICdhcnJheScgOiB0eXBlb2Ygb2JqO1xuICB9XG5cbiAgZnVuY3Rpb24gZXNjYXBlUmVnRXhwKHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvW1xcLVxcW1xcXXt9KCkqKz8uLFxcXFxcXF4kfCNcXHNdL2csICdcXFxcJCYnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOdWxsIHNhZmUgd2F5IG9mIGNoZWNraW5nIHdoZXRoZXIgb3Igbm90IGFuIG9iamVjdCxcbiAgICogaW5jbHVkaW5nIGl0cyBwcm90b3R5cGUsIGhhcyBhIGdpdmVuIHByb3BlcnR5XG4gICAqL1xuICBmdW5jdGlvbiBoYXNQcm9wZXJ0eShvYmosIHByb3BOYW1lKSB7XG4gICAgcmV0dXJuIG9iaiAhPSBudWxsICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIChwcm9wTmFtZSBpbiBvYmopO1xuICB9XG5cbiAgLy8gV29ya2Fyb3VuZCBmb3IgaHR0cHM6Ly9pc3N1ZXMuYXBhY2hlLm9yZy9qaXJhL2Jyb3dzZS9DT1VDSERCLTU3N1xuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2phbmwvbXVzdGFjaGUuanMvaXNzdWVzLzE4OVxuICB2YXIgcmVnRXhwVGVzdCA9IFJlZ0V4cC5wcm90b3R5cGUudGVzdDtcblxuICBmdW5jdGlvbiB0ZXN0UmVnRXhwKHJlLCBzdHJpbmcpIHtcbiAgICByZXR1cm4gcmVnRXhwVGVzdC5jYWxsKHJlLCBzdHJpbmcpO1xuICB9XG5cbiAgdmFyIG5vblNwYWNlUmUgPSAvXFxTLztcblxuICBmdW5jdGlvbiBpc1doaXRlc3BhY2Uoc3RyaW5nKSB7XG4gICAgcmV0dXJuICF0ZXN0UmVnRXhwKG5vblNwYWNlUmUsIHN0cmluZyk7XG4gIH1cblxuICB2YXIgZW50aXR5TWFwID0ge1xuICAgICcmJzogJyZhbXA7JywgJzwnOiAnJmx0OycsICc+JzogJyZndDsnLCAnXCInOiAnJnF1b3Q7JywgXCInXCI6ICcmIzM5OycsICcvJzogJyYjeDJGOydcbiAgfTtcblxuICBmdW5jdGlvbiBlc2NhcGVIdG1sKHN0cmluZykge1xuICAgIHJldHVybiBTdHJpbmcoc3RyaW5nKS5yZXBsYWNlKC9bJjw+XCInXFwvXS9nLCBmdW5jdGlvbiBmcm9tRW50aXR5TWFwKHMpIHtcbiAgICAgIHJldHVybiBlbnRpdHlNYXBbc107XG4gICAgfSk7XG4gIH1cblxuICB2YXIgd2hpdGVSZSA9IC9cXHMqLztcbiAgdmFyIHNwYWNlUmUgPSAvXFxzKy87XG4gIHZhciBlcXVhbHNSZSA9IC9cXHMqPS87XG4gIHZhciBjdXJseVJlID0gL1xccypcXH0vO1xuICB2YXIgdGFnUmUgPSAvI3xcXF58XFwvfD58XFx7fCZ8PXwhLztcblxuICAvKipcbiAgICogQnJlYWtzIHVwIHRoZSBnaXZlbiBgdGVtcGxhdGVgIHN0cmluZyBpbnRvIGEgdHJlZSBvZiB0b2tlbnMuIElmIHRoZSBgdGFnc2BcbiAgICogYXJndW1lbnQgaXMgZ2l2ZW4gaGVyZSBpdCBtdXN0IGJlIGFuIGFycmF5IHdpdGggdHdvIHN0cmluZyB2YWx1ZXM6IHRoZVxuICAgKiBvcGVuaW5nIGFuZCBjbG9zaW5nIHRhZ3MgdXNlZCBpbiB0aGUgdGVtcGxhdGUgKGUuZy4gWyBcIjwlXCIsIFwiJT5cIiBdKS4gT2ZcbiAgICogY291cnNlLCB0aGUgZGVmYXVsdCBpcyB0byB1c2UgbXVzdGFjaGVzIChpLmUuIG11c3RhY2hlLnRhZ3MpLlxuICAgKlxuICAgKiBBIHRva2VuIGlzIGFuIGFycmF5IHdpdGggYXQgbGVhc3QgNCBlbGVtZW50cy4gVGhlIGZpcnN0IGVsZW1lbnQgaXMgdGhlXG4gICAqIG11c3RhY2hlIHN5bWJvbCB0aGF0IHdhcyB1c2VkIGluc2lkZSB0aGUgdGFnLCBlLmcuIFwiI1wiIG9yIFwiJlwiLiBJZiB0aGUgdGFnXG4gICAqIGRpZCBub3QgY29udGFpbiBhIHN5bWJvbCAoaS5lLiB7e215VmFsdWV9fSkgdGhpcyBlbGVtZW50IGlzIFwibmFtZVwiLiBGb3JcbiAgICogYWxsIHRleHQgdGhhdCBhcHBlYXJzIG91dHNpZGUgYSBzeW1ib2wgdGhpcyBlbGVtZW50IGlzIFwidGV4dFwiLlxuICAgKlxuICAgKiBUaGUgc2Vjb25kIGVsZW1lbnQgb2YgYSB0b2tlbiBpcyBpdHMgXCJ2YWx1ZVwiLiBGb3IgbXVzdGFjaGUgdGFncyB0aGlzIGlzXG4gICAqIHdoYXRldmVyIGVsc2Ugd2FzIGluc2lkZSB0aGUgdGFnIGJlc2lkZXMgdGhlIG9wZW5pbmcgc3ltYm9sLiBGb3IgdGV4dCB0b2tlbnNcbiAgICogdGhpcyBpcyB0aGUgdGV4dCBpdHNlbGYuXG4gICAqXG4gICAqIFRoZSB0aGlyZCBhbmQgZm91cnRoIGVsZW1lbnRzIG9mIHRoZSB0b2tlbiBhcmUgdGhlIHN0YXJ0IGFuZCBlbmQgaW5kaWNlcyxcbiAgICogcmVzcGVjdGl2ZWx5LCBvZiB0aGUgdG9rZW4gaW4gdGhlIG9yaWdpbmFsIHRlbXBsYXRlLlxuICAgKlxuICAgKiBUb2tlbnMgdGhhdCBhcmUgdGhlIHJvb3Qgbm9kZSBvZiBhIHN1YnRyZWUgY29udGFpbiB0d28gbW9yZSBlbGVtZW50czogMSkgYW5cbiAgICogYXJyYXkgb2YgdG9rZW5zIGluIHRoZSBzdWJ0cmVlIGFuZCAyKSB0aGUgaW5kZXggaW4gdGhlIG9yaWdpbmFsIHRlbXBsYXRlIGF0XG4gICAqIHdoaWNoIHRoZSBjbG9zaW5nIHRhZyBmb3IgdGhhdCBzZWN0aW9uIGJlZ2lucy5cbiAgICovXG4gIGZ1bmN0aW9uIHBhcnNlVGVtcGxhdGUodGVtcGxhdGUsIHRhZ3MpIHtcbiAgICBpZiAoIXRlbXBsYXRlKVxuICAgICAgcmV0dXJuIFtdO1xuXG4gICAgdmFyIHNlY3Rpb25zID0gW107ICAgICAvLyBTdGFjayB0byBob2xkIHNlY3Rpb24gdG9rZW5zXG4gICAgdmFyIHRva2VucyA9IFtdOyAgICAgICAvLyBCdWZmZXIgdG8gaG9sZCB0aGUgdG9rZW5zXG4gICAgdmFyIHNwYWNlcyA9IFtdOyAgICAgICAvLyBJbmRpY2VzIG9mIHdoaXRlc3BhY2UgdG9rZW5zIG9uIHRoZSBjdXJyZW50IGxpbmVcbiAgICB2YXIgaGFzVGFnID0gZmFsc2U7ICAgIC8vIElzIHRoZXJlIGEge3t0YWd9fSBvbiB0aGUgY3VycmVudCBsaW5lP1xuICAgIHZhciBub25TcGFjZSA9IGZhbHNlOyAgLy8gSXMgdGhlcmUgYSBub24tc3BhY2UgY2hhciBvbiB0aGUgY3VycmVudCBsaW5lP1xuXG4gICAgLy8gU3RyaXBzIGFsbCB3aGl0ZXNwYWNlIHRva2VucyBhcnJheSBmb3IgdGhlIGN1cnJlbnQgbGluZVxuICAgIC8vIGlmIHRoZXJlIHdhcyBhIHt7I3RhZ319IG9uIGl0IGFuZCBvdGhlcndpc2Ugb25seSBzcGFjZS5cbiAgICBmdW5jdGlvbiBzdHJpcFNwYWNlKCkge1xuICAgICAgaWYgKGhhc1RhZyAmJiAhbm9uU3BhY2UpIHtcbiAgICAgICAgd2hpbGUgKHNwYWNlcy5sZW5ndGgpXG4gICAgICAgICAgZGVsZXRlIHRva2Vuc1tzcGFjZXMucG9wKCldO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHNwYWNlcyA9IFtdO1xuICAgICAgfVxuXG4gICAgICBoYXNUYWcgPSBmYWxzZTtcbiAgICAgIG5vblNwYWNlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIG9wZW5pbmdUYWdSZSwgY2xvc2luZ1RhZ1JlLCBjbG9zaW5nQ3VybHlSZTtcblxuICAgIGZ1bmN0aW9uIGNvbXBpbGVUYWdzKHRhZ3NUb0NvbXBpbGUpIHtcbiAgICAgIGlmICh0eXBlb2YgdGFnc1RvQ29tcGlsZSA9PT0gJ3N0cmluZycpXG4gICAgICAgIHRhZ3NUb0NvbXBpbGUgPSB0YWdzVG9Db21waWxlLnNwbGl0KHNwYWNlUmUsIDIpO1xuXG4gICAgICBpZiAoIWlzQXJyYXkodGFnc1RvQ29tcGlsZSkgfHwgdGFnc1RvQ29tcGlsZS5sZW5ndGggIT09IDIpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCB0YWdzOiAnICsgdGFnc1RvQ29tcGlsZSk7XG5cbiAgICAgIG9wZW5pbmdUYWdSZSA9IG5ldyBSZWdFeHAoZXNjYXBlUmVnRXhwKHRhZ3NUb0NvbXBpbGVbMF0pICsgJ1xcXFxzKicpO1xuICAgICAgY2xvc2luZ1RhZ1JlID0gbmV3IFJlZ0V4cCgnXFxcXHMqJyArIGVzY2FwZVJlZ0V4cCh0YWdzVG9Db21waWxlWzFdKSk7XG4gICAgICBjbG9zaW5nQ3VybHlSZSA9IG5ldyBSZWdFeHAoJ1xcXFxzKicgKyBlc2NhcGVSZWdFeHAoJ30nICsgdGFnc1RvQ29tcGlsZVsxXSkpO1xuICAgIH1cblxuICAgIGNvbXBpbGVUYWdzKHRhZ3MgfHwgbXVzdGFjaGUudGFncyk7XG5cbiAgICB2YXIgc2Nhbm5lciA9IG5ldyBTY2FubmVyKHRlbXBsYXRlKTtcblxuICAgIHZhciBzdGFydCwgdHlwZSwgdmFsdWUsIGNociwgdG9rZW4sIG9wZW5TZWN0aW9uO1xuICAgIHdoaWxlICghc2Nhbm5lci5lb3MoKSkge1xuICAgICAgc3RhcnQgPSBzY2FubmVyLnBvcztcblxuICAgICAgLy8gTWF0Y2ggYW55IHRleHQgYmV0d2VlbiB0YWdzLlxuICAgICAgdmFsdWUgPSBzY2FubmVyLnNjYW5VbnRpbChvcGVuaW5nVGFnUmUpO1xuXG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHZhbHVlTGVuZ3RoID0gdmFsdWUubGVuZ3RoOyBpIDwgdmFsdWVMZW5ndGg7ICsraSkge1xuICAgICAgICAgIGNociA9IHZhbHVlLmNoYXJBdChpKTtcblxuICAgICAgICAgIGlmIChpc1doaXRlc3BhY2UoY2hyKSkge1xuICAgICAgICAgICAgc3BhY2VzLnB1c2godG9rZW5zLmxlbmd0aCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbm9uU3BhY2UgPSB0cnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRva2Vucy5wdXNoKFsndGV4dCcsIGNociwgc3RhcnQsIHN0YXJ0ICsgMV0pO1xuICAgICAgICAgIHN0YXJ0ICs9IDE7XG5cbiAgICAgICAgICAvLyBDaGVjayBmb3Igd2hpdGVzcGFjZSBvbiB0aGUgY3VycmVudCBsaW5lLlxuICAgICAgICAgIGlmIChjaHIgPT09ICdcXG4nKVxuICAgICAgICAgICAgc3RyaXBTcGFjZSgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIE1hdGNoIHRoZSBvcGVuaW5nIHRhZy5cbiAgICAgIGlmICghc2Nhbm5lci5zY2FuKG9wZW5pbmdUYWdSZSkpXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBoYXNUYWcgPSB0cnVlO1xuXG4gICAgICAvLyBHZXQgdGhlIHRhZyB0eXBlLlxuICAgICAgdHlwZSA9IHNjYW5uZXIuc2Nhbih0YWdSZSkgfHwgJ25hbWUnO1xuICAgICAgc2Nhbm5lci5zY2FuKHdoaXRlUmUpO1xuXG4gICAgICAvLyBHZXQgdGhlIHRhZyB2YWx1ZS5cbiAgICAgIGlmICh0eXBlID09PSAnPScpIHtcbiAgICAgICAgdmFsdWUgPSBzY2FubmVyLnNjYW5VbnRpbChlcXVhbHNSZSk7XG4gICAgICAgIHNjYW5uZXIuc2NhbihlcXVhbHNSZSk7XG4gICAgICAgIHNjYW5uZXIuc2NhblVudGlsKGNsb3NpbmdUYWdSZSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0eXBlID09PSAneycpIHtcbiAgICAgICAgdmFsdWUgPSBzY2FubmVyLnNjYW5VbnRpbChjbG9zaW5nQ3VybHlSZSk7XG4gICAgICAgIHNjYW5uZXIuc2NhbihjdXJseVJlKTtcbiAgICAgICAgc2Nhbm5lci5zY2FuVW50aWwoY2xvc2luZ1RhZ1JlKTtcbiAgICAgICAgdHlwZSA9ICcmJztcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IHNjYW5uZXIuc2NhblVudGlsKGNsb3NpbmdUYWdSZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIE1hdGNoIHRoZSBjbG9zaW5nIHRhZy5cbiAgICAgIGlmICghc2Nhbm5lci5zY2FuKGNsb3NpbmdUYWdSZSkpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5jbG9zZWQgdGFnIGF0ICcgKyBzY2FubmVyLnBvcyk7XG5cbiAgICAgIHRva2VuID0gW3R5cGUsIHZhbHVlLCBzdGFydCwgc2Nhbm5lci5wb3NdO1xuICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuXG4gICAgICBpZiAodHlwZSA9PT0gJyMnIHx8IHR5cGUgPT09ICdeJykge1xuICAgICAgICBzZWN0aW9ucy5wdXNoKHRva2VuKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICcvJykge1xuICAgICAgICAvLyBDaGVjayBzZWN0aW9uIG5lc3RpbmcuXG4gICAgICAgIG9wZW5TZWN0aW9uID0gc2VjdGlvbnMucG9wKCk7XG5cbiAgICAgICAgaWYgKCFvcGVuU2VjdGlvbilcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vub3BlbmVkIHNlY3Rpb24gXCInICsgdmFsdWUgKyAnXCIgYXQgJyArIHN0YXJ0KTtcblxuICAgICAgICBpZiAob3BlblNlY3Rpb25bMV0gIT09IHZhbHVlKVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5jbG9zZWQgc2VjdGlvbiBcIicgKyBvcGVuU2VjdGlvblsxXSArICdcIiBhdCAnICsgc3RhcnQpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJ25hbWUnIHx8IHR5cGUgPT09ICd7JyB8fCB0eXBlID09PSAnJicpIHtcbiAgICAgICAgbm9uU3BhY2UgPSB0cnVlO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJz0nKSB7XG4gICAgICAgIC8vIFNldCB0aGUgdGFncyBmb3IgdGhlIG5leHQgdGltZSBhcm91bmQuXG4gICAgICAgIGNvbXBpbGVUYWdzKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhlcmUgYXJlIG5vIG9wZW4gc2VjdGlvbnMgd2hlbiB3ZSdyZSBkb25lLlxuICAgIG9wZW5TZWN0aW9uID0gc2VjdGlvbnMucG9wKCk7XG5cbiAgICBpZiAob3BlblNlY3Rpb24pXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuY2xvc2VkIHNlY3Rpb24gXCInICsgb3BlblNlY3Rpb25bMV0gKyAnXCIgYXQgJyArIHNjYW5uZXIucG9zKTtcblxuICAgIHJldHVybiBuZXN0VG9rZW5zKHNxdWFzaFRva2Vucyh0b2tlbnMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21iaW5lcyB0aGUgdmFsdWVzIG9mIGNvbnNlY3V0aXZlIHRleHQgdG9rZW5zIGluIHRoZSBnaXZlbiBgdG9rZW5zYCBhcnJheVxuICAgKiB0byBhIHNpbmdsZSB0b2tlbi5cbiAgICovXG4gIGZ1bmN0aW9uIHNxdWFzaFRva2Vucyh0b2tlbnMpIHtcbiAgICB2YXIgc3F1YXNoZWRUb2tlbnMgPSBbXTtcblxuICAgIHZhciB0b2tlbiwgbGFzdFRva2VuO1xuICAgIGZvciAodmFyIGkgPSAwLCBudW1Ub2tlbnMgPSB0b2tlbnMubGVuZ3RoOyBpIDwgbnVtVG9rZW5zOyArK2kpIHtcbiAgICAgIHRva2VuID0gdG9rZW5zW2ldO1xuXG4gICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgaWYgKHRva2VuWzBdID09PSAndGV4dCcgJiYgbGFzdFRva2VuICYmIGxhc3RUb2tlblswXSA9PT0gJ3RleHQnKSB7XG4gICAgICAgICAgbGFzdFRva2VuWzFdICs9IHRva2VuWzFdO1xuICAgICAgICAgIGxhc3RUb2tlblszXSA9IHRva2VuWzNdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHNxdWFzaGVkVG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICAgIGxhc3RUb2tlbiA9IHRva2VuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNxdWFzaGVkVG9rZW5zO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvcm1zIHRoZSBnaXZlbiBhcnJheSBvZiBgdG9rZW5zYCBpbnRvIGEgbmVzdGVkIHRyZWUgc3RydWN0dXJlIHdoZXJlXG4gICAqIHRva2VucyB0aGF0IHJlcHJlc2VudCBhIHNlY3Rpb24gaGF2ZSB0d28gYWRkaXRpb25hbCBpdGVtczogMSkgYW4gYXJyYXkgb2ZcbiAgICogYWxsIHRva2VucyB0aGF0IGFwcGVhciBpbiB0aGF0IHNlY3Rpb24gYW5kIDIpIHRoZSBpbmRleCBpbiB0aGUgb3JpZ2luYWxcbiAgICogdGVtcGxhdGUgdGhhdCByZXByZXNlbnRzIHRoZSBlbmQgb2YgdGhhdCBzZWN0aW9uLlxuICAgKi9cbiAgZnVuY3Rpb24gbmVzdFRva2Vucyh0b2tlbnMpIHtcbiAgICB2YXIgbmVzdGVkVG9rZW5zID0gW107XG4gICAgdmFyIGNvbGxlY3RvciA9IG5lc3RlZFRva2VucztcbiAgICB2YXIgc2VjdGlvbnMgPSBbXTtcblxuICAgIHZhciB0b2tlbiwgc2VjdGlvbjtcbiAgICBmb3IgKHZhciBpID0gMCwgbnVtVG9rZW5zID0gdG9rZW5zLmxlbmd0aDsgaSA8IG51bVRva2VuczsgKytpKSB7XG4gICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcblxuICAgICAgc3dpdGNoICh0b2tlblswXSkge1xuICAgICAgICBjYXNlICcjJzpcbiAgICAgICAgY2FzZSAnXic6XG4gICAgICAgICAgY29sbGVjdG9yLnB1c2godG9rZW4pO1xuICAgICAgICAgIHNlY3Rpb25zLnB1c2godG9rZW4pO1xuICAgICAgICAgIGNvbGxlY3RvciA9IHRva2VuWzRdID0gW107XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJy8nOlxuICAgICAgICAgIHNlY3Rpb24gPSBzZWN0aW9ucy5wb3AoKTtcbiAgICAgICAgICBzZWN0aW9uWzVdID0gdG9rZW5bMl07XG4gICAgICAgICAgY29sbGVjdG9yID0gc2VjdGlvbnMubGVuZ3RoID4gMCA/IHNlY3Rpb25zW3NlY3Rpb25zLmxlbmd0aCAtIDFdWzRdIDogbmVzdGVkVG9rZW5zO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGNvbGxlY3Rvci5wdXNoKHRva2VuKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmVzdGVkVG9rZW5zO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgc2ltcGxlIHN0cmluZyBzY2FubmVyIHRoYXQgaXMgdXNlZCBieSB0aGUgdGVtcGxhdGUgcGFyc2VyIHRvIGZpbmRcbiAgICogdG9rZW5zIGluIHRlbXBsYXRlIHN0cmluZ3MuXG4gICAqL1xuICBmdW5jdGlvbiBTY2FubmVyKHN0cmluZykge1xuICAgIHRoaXMuc3RyaW5nID0gc3RyaW5nO1xuICAgIHRoaXMudGFpbCA9IHN0cmluZztcbiAgICB0aGlzLnBvcyA9IDA7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHRhaWwgaXMgZW1wdHkgKGVuZCBvZiBzdHJpbmcpLlxuICAgKi9cbiAgU2Nhbm5lci5wcm90b3R5cGUuZW9zID0gZnVuY3Rpb24gZW9zKCkge1xuICAgIHJldHVybiB0aGlzLnRhaWwgPT09ICcnO1xuICB9O1xuXG4gIC8qKlxuICAgKiBUcmllcyB0byBtYXRjaCB0aGUgZ2l2ZW4gcmVndWxhciBleHByZXNzaW9uIGF0IHRoZSBjdXJyZW50IHBvc2l0aW9uLlxuICAgKiBSZXR1cm5zIHRoZSBtYXRjaGVkIHRleHQgaWYgaXQgY2FuIG1hdGNoLCB0aGUgZW1wdHkgc3RyaW5nIG90aGVyd2lzZS5cbiAgICovXG4gIFNjYW5uZXIucHJvdG90eXBlLnNjYW4gPSBmdW5jdGlvbiBzY2FuKHJlKSB7XG4gICAgdmFyIG1hdGNoID0gdGhpcy50YWlsLm1hdGNoKHJlKTtcblxuICAgIGlmICghbWF0Y2ggfHwgbWF0Y2guaW5kZXggIT09IDApXG4gICAgICByZXR1cm4gJyc7XG5cbiAgICB2YXIgc3RyaW5nID0gbWF0Y2hbMF07XG5cbiAgICB0aGlzLnRhaWwgPSB0aGlzLnRhaWwuc3Vic3RyaW5nKHN0cmluZy5sZW5ndGgpO1xuICAgIHRoaXMucG9zICs9IHN0cmluZy5sZW5ndGg7XG5cbiAgICByZXR1cm4gc3RyaW5nO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTa2lwcyBhbGwgdGV4dCB1bnRpbCB0aGUgZ2l2ZW4gcmVndWxhciBleHByZXNzaW9uIGNhbiBiZSBtYXRjaGVkLiBSZXR1cm5zXG4gICAqIHRoZSBza2lwcGVkIHN0cmluZywgd2hpY2ggaXMgdGhlIGVudGlyZSB0YWlsIGlmIG5vIG1hdGNoIGNhbiBiZSBtYWRlLlxuICAgKi9cbiAgU2Nhbm5lci5wcm90b3R5cGUuc2NhblVudGlsID0gZnVuY3Rpb24gc2NhblVudGlsKHJlKSB7XG4gICAgdmFyIGluZGV4ID0gdGhpcy50YWlsLnNlYXJjaChyZSksIG1hdGNoO1xuXG4gICAgc3dpdGNoIChpbmRleCkge1xuICAgICAgY2FzZSAtMTpcbiAgICAgICAgbWF0Y2ggPSB0aGlzLnRhaWw7XG4gICAgICAgIHRoaXMudGFpbCA9ICcnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgbWF0Y2ggPSAnJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBtYXRjaCA9IHRoaXMudGFpbC5zdWJzdHJpbmcoMCwgaW5kZXgpO1xuICAgICAgICB0aGlzLnRhaWwgPSB0aGlzLnRhaWwuc3Vic3RyaW5nKGluZGV4KTtcbiAgICB9XG5cbiAgICB0aGlzLnBvcyArPSBtYXRjaC5sZW5ndGg7XG5cbiAgICByZXR1cm4gbWF0Y2g7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudHMgYSByZW5kZXJpbmcgY29udGV4dCBieSB3cmFwcGluZyBhIHZpZXcgb2JqZWN0IGFuZFxuICAgKiBtYWludGFpbmluZyBhIHJlZmVyZW5jZSB0byB0aGUgcGFyZW50IGNvbnRleHQuXG4gICAqL1xuICBmdW5jdGlvbiBDb250ZXh0KHZpZXcsIHBhcmVudENvbnRleHQpIHtcbiAgICB0aGlzLnZpZXcgPSB2aWV3O1xuICAgIHRoaXMuY2FjaGUgPSB7XG4gICAgICAnLic6IHRoaXMudmlldyxcbiAgICAgICdAZWFjaCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJldHVybnMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgayBpbiB0aGlzKSB7XG4gICAgICAgICAgcmV0dXJucy5wdXNoKHsnQGtleSc6IGssICdAdmFsdWUnOiB0aGlzW2tdfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldHVybnM7XG4gICAgICB9XG4gICAgfTtcbiAgICB0aGlzLnBhcmVudCA9IHBhcmVudENvbnRleHQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBjb250ZXh0IHVzaW5nIHRoZSBnaXZlbiB2aWV3IHdpdGggdGhpcyBjb250ZXh0XG4gICAqIGFzIHRoZSBwYXJlbnQuXG4gICAqL1xuICBDb250ZXh0LnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gcHVzaCh2aWV3KSB7XG4gICAgcmV0dXJuIG5ldyBDb250ZXh0KHZpZXcsIHRoaXMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gbmFtZSBpbiB0aGlzIGNvbnRleHQsIHRyYXZlcnNpbmdcbiAgICogdXAgdGhlIGNvbnRleHQgaGllcmFyY2h5IGlmIHRoZSB2YWx1ZSBpcyBhYnNlbnQgaW4gdGhpcyBjb250ZXh0J3Mgdmlldy5cbiAgICovXG4gIENvbnRleHQucHJvdG90eXBlLmxvb2t1cCA9IGZ1bmN0aW9uIGxvb2t1cChuYW1lKSB7XG4gICAgdmFyIGNhY2hlID0gdGhpcy5jYWNoZTtcblxuICAgIHZhciB2YWx1ZTtcbiAgICBpZiAoY2FjaGUuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgIHZhbHVlID0gY2FjaGVbbmFtZV07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLCBuYW1lcywgaW5kZXgsIGxvb2t1cEhpdCA9IGZhbHNlO1xuXG4gICAgICB3aGlsZSAoY29udGV4dCkge1xuICAgICAgICBpZiAobmFtZS5pbmRleE9mKCcuJykgPiAwKSB7XG4gICAgICAgICAgdmFsdWUgPSBjb250ZXh0LnZpZXc7XG4gICAgICAgICAgbmFtZXMgPSBuYW1lLnNwbGl0KCcuJyk7XG4gICAgICAgICAgaW5kZXggPSAwO1xuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogVXNpbmcgdGhlIGRvdCBub3Rpb24gcGF0aCBpbiBgbmFtZWAsIHdlIGRlc2NlbmQgdGhyb3VnaCB0aGVcbiAgICAgICAgICAgKiBuZXN0ZWQgb2JqZWN0cy5cbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIFRvIGJlIGNlcnRhaW4gdGhhdCB0aGUgbG9va3VwIGhhcyBiZWVuIHN1Y2Nlc3NmdWwsIHdlIGhhdmUgdG9cbiAgICAgICAgICAgKiBjaGVjayBpZiB0aGUgbGFzdCBvYmplY3QgaW4gdGhlIHBhdGggYWN0dWFsbHkgaGFzIHRoZSBwcm9wZXJ0eVxuICAgICAgICAgICAqIHdlIGFyZSBsb29raW5nIGZvci4gV2Ugc3RvcmUgdGhlIHJlc3VsdCBpbiBgbG9va3VwSGl0YC5cbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIFRoaXMgaXMgc3BlY2lhbGx5IG5lY2Vzc2FyeSBmb3Igd2hlbiB0aGUgdmFsdWUgaGFzIGJlZW4gc2V0IHRvXG4gICAgICAgICAgICogYHVuZGVmaW5lZGAgYW5kIHdlIHdhbnQgdG8gYXZvaWQgbG9va2luZyB1cCBwYXJlbnQgY29udGV4dHMuXG4gICAgICAgICAgICoqL1xuICAgICAgICAgIHdoaWxlICh2YWx1ZSAhPSBudWxsICYmIGluZGV4IDwgbmFtZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IG5hbWVzLmxlbmd0aCAtIDEpXG4gICAgICAgICAgICAgIGxvb2t1cEhpdCA9IGhhc1Byb3BlcnR5KHZhbHVlLCBuYW1lc1tpbmRleF0pO1xuXG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlW25hbWVzW2luZGV4KytdXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdmFsdWUgPSBjb250ZXh0LnZpZXdbbmFtZV07XG4gICAgICAgICAgbG9va3VwSGl0ID0gaGFzUHJvcGVydHkoY29udGV4dC52aWV3LCBuYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsb29rdXBIaXQpXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY29udGV4dCA9IGNvbnRleHQucGFyZW50O1xuICAgICAgfVxuXG4gICAgICBjYWNoZVtuYW1lXSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSlcbiAgICAgIHZhbHVlID0gdmFsdWUuY2FsbCh0aGlzLnZpZXcpO1xuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBIFdyaXRlciBrbm93cyBob3cgdG8gdGFrZSBhIHN0cmVhbSBvZiB0b2tlbnMgYW5kIHJlbmRlciB0aGVtIHRvIGFcbiAgICogc3RyaW5nLCBnaXZlbiBhIGNvbnRleHQuIEl0IGFsc28gbWFpbnRhaW5zIGEgY2FjaGUgb2YgdGVtcGxhdGVzIHRvXG4gICAqIGF2b2lkIHRoZSBuZWVkIHRvIHBhcnNlIHRoZSBzYW1lIHRlbXBsYXRlIHR3aWNlLlxuICAgKi9cbiAgZnVuY3Rpb24gV3JpdGVyKCkge1xuICAgIHRoaXMuY2FjaGUgPSB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgYWxsIGNhY2hlZCB0ZW1wbGF0ZXMgaW4gdGhpcyB3cml0ZXIuXG4gICAqL1xuICBXcml0ZXIucHJvdG90eXBlLmNsZWFyQ2FjaGUgPSBmdW5jdGlvbiBjbGVhckNhY2hlKCkge1xuICAgIHRoaXMuY2FjaGUgPSB7fTtcbiAgfTtcblxuICAvKipcbiAgICogUGFyc2VzIGFuZCBjYWNoZXMgdGhlIGdpdmVuIGB0ZW1wbGF0ZWAgYW5kIHJldHVybnMgdGhlIGFycmF5IG9mIHRva2Vuc1xuICAgKiB0aGF0IGlzIGdlbmVyYXRlZCBmcm9tIHRoZSBwYXJzZS5cbiAgICovXG4gIFdyaXRlci5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbiBwYXJzZSh0ZW1wbGF0ZSwgdGFncykge1xuICAgIHZhciBjYWNoZSA9IHRoaXMuY2FjaGU7XG4gICAgdmFyIHRva2VucyA9IGNhY2hlW3RlbXBsYXRlXTtcblxuICAgIGlmICh0b2tlbnMgPT0gbnVsbClcbiAgICAgIHRva2VucyA9IGNhY2hlW3RlbXBsYXRlXSA9IHBhcnNlVGVtcGxhdGUodGVtcGxhdGUsIHRhZ3MpO1xuXG4gICAgcmV0dXJuIHRva2VucztcbiAgfTtcblxuICAvKipcbiAgICogSGlnaC1sZXZlbCBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIHJlbmRlciB0aGUgZ2l2ZW4gYHRlbXBsYXRlYCB3aXRoXG4gICAqIHRoZSBnaXZlbiBgdmlld2AuXG4gICAqXG4gICAqIFRoZSBvcHRpb25hbCBgcGFydGlhbHNgIGFyZ3VtZW50IG1heSBiZSBhbiBvYmplY3QgdGhhdCBjb250YWlucyB0aGVcbiAgICogbmFtZXMgYW5kIHRlbXBsYXRlcyBvZiBwYXJ0aWFscyB0aGF0IGFyZSB1c2VkIGluIHRoZSB0ZW1wbGF0ZS4gSXQgbWF5XG4gICAqIGFsc28gYmUgYSBmdW5jdGlvbiB0aGF0IGlzIHVzZWQgdG8gbG9hZCBwYXJ0aWFsIHRlbXBsYXRlcyBvbiB0aGUgZmx5XG4gICAqIHRoYXQgdGFrZXMgYSBzaW5nbGUgYXJndW1lbnQ6IHRoZSBuYW1lIG9mIHRoZSBwYXJ0aWFsLlxuICAgKi9cbiAgV3JpdGVyLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIodGVtcGxhdGUsIHZpZXcsIHBhcnRpYWxzKSB7XG4gICAgdmFyIHRva2VucyA9IHRoaXMucGFyc2UodGVtcGxhdGUpO1xuICAgIHZhciBjb250ZXh0ID0gKHZpZXcgaW5zdGFuY2VvZiBDb250ZXh0KSA/IHZpZXcgOiBuZXcgQ29udGV4dCh2aWV3KTtcbiAgICByZXR1cm4gdGhpcy5yZW5kZXJUb2tlbnModG9rZW5zLCBjb250ZXh0LCBwYXJ0aWFscywgdGVtcGxhdGUpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBMb3ctbGV2ZWwgbWV0aG9kIHRoYXQgcmVuZGVycyB0aGUgZ2l2ZW4gYXJyYXkgb2YgYHRva2Vuc2AgdXNpbmdcbiAgICogdGhlIGdpdmVuIGBjb250ZXh0YCBhbmQgYHBhcnRpYWxzYC5cbiAgICpcbiAgICogTm90ZTogVGhlIGBvcmlnaW5hbFRlbXBsYXRlYCBpcyBvbmx5IGV2ZXIgdXNlZCB0byBleHRyYWN0IHRoZSBwb3J0aW9uXG4gICAqIG9mIHRoZSBvcmlnaW5hbCB0ZW1wbGF0ZSB0aGF0IHdhcyBjb250YWluZWQgaW4gYSBoaWdoZXItb3JkZXIgc2VjdGlvbi5cbiAgICogSWYgdGhlIHRlbXBsYXRlIGRvZXNuJ3QgdXNlIGhpZ2hlci1vcmRlciBzZWN0aW9ucywgdGhpcyBhcmd1bWVudCBtYXlcbiAgICogYmUgb21pdHRlZC5cbiAgICovXG4gIFdyaXRlci5wcm90b3R5cGUucmVuZGVyVG9rZW5zID0gZnVuY3Rpb24gcmVuZGVyVG9rZW5zKHRva2VucywgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpIHtcbiAgICB2YXIgYnVmZmVyID0gJyc7XG4gICAgdmFyIHRva2VuLCBzeW1ib2wsIHZhbHVlO1xuICAgIGZvciAodmFyIGkgPSAwLCBudW1Ub2tlbnMgPSB0b2tlbnMubGVuZ3RoOyBpIDwgbnVtVG9rZW5zOyArK2kpIHtcbiAgICAgIHZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgICBzeW1ib2wgPSB0b2tlblswXTtcblxuICAgICAgaWYgKHN5bWJvbCA9PT0gJyMnKSB2YWx1ZSA9IHRoaXMucmVuZGVyU2VjdGlvbih0b2tlbiwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xuICAgICAgZWxzZSBpZiAoc3ltYm9sID09PSAnXicpIHZhbHVlID0gdGhpcy5yZW5kZXJJbnZlcnRlZCh0b2tlbiwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xuICAgICAgZWxzZSBpZiAoc3ltYm9sID09PSAnPicpIHZhbHVlID0gdGhpcy5yZW5kZXJQYXJ0aWFsKHRva2VuLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XG4gICAgICBlbHNlIGlmIChzeW1ib2wgPT09ICcmJykgdmFsdWUgPSB0aGlzLnVuZXNjYXBlZFZhbHVlKHRva2VuLCBjb250ZXh0KTtcbiAgICAgIGVsc2UgaWYgKHN5bWJvbCA9PT0gJ25hbWUnKSB2YWx1ZSA9IHRoaXMuZXNjYXBlZFZhbHVlKHRva2VuLCBjb250ZXh0KTtcbiAgICAgIGVsc2UgaWYgKHN5bWJvbCA9PT0gJ3RleHQnKSB2YWx1ZSA9IHRoaXMucmF3VmFsdWUodG9rZW4pO1xuXG4gICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgYnVmZmVyICs9IHZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiBidWZmZXI7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5yZW5kZXJTZWN0aW9uID0gZnVuY3Rpb24gcmVuZGVyU2VjdGlvbih0b2tlbiwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGJ1ZmZlciA9ICcnO1xuXG4gICAgdmFyIHZhbHVlID0gY29udGV4dC5sb29rdXAodG9rZW5bMV0pO1xuXG4gICAgLy8gVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIHJlbmRlciBhbiBhcmJpdHJhcnkgdGVtcGxhdGVcbiAgICAvLyBpbiB0aGUgY3VycmVudCBjb250ZXh0IGJ5IGhpZ2hlci1vcmRlciBzZWN0aW9ucy5cbiAgICBmdW5jdGlvbiBzdWJSZW5kZXIodGVtcGxhdGUpIHtcbiAgICAgIHJldHVybiBzZWxmLnJlbmRlcih0ZW1wbGF0ZSwgY29udGV4dCwgcGFydGlhbHMpO1xuICAgIH1cblxuICAgIGlmICghdmFsdWUpIHJldHVybjtcblxuICAgIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgZm9yICh2YXIgaiA9IDAsIHZhbHVlTGVuZ3RoID0gdmFsdWUubGVuZ3RoOyBqIDwgdmFsdWVMZW5ndGg7ICsraikge1xuICAgICAgICBpZiAodmFsdWVbal0pIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlW2pdID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdmFsdWVbal1bJ0BpJ10gPSBqO1xuICAgICAgICAgICAgdmFsdWVbal1bJ0BmaXJzdCddID0gKGogPT09IDApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJ1ZmZlciArPSB0aGlzLnJlbmRlclRva2Vucyh0b2tlbls0XSwgY29udGV4dC5wdXNoKHZhbHVlW2pdKSwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICBidWZmZXIgKz0gdGhpcy5yZW5kZXJUb2tlbnModG9rZW5bNF0sIGNvbnRleHQucHVzaCh2YWx1ZSksIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICAgIGlmICh0eXBlb2Ygb3JpZ2luYWxUZW1wbGF0ZSAhPT0gJ3N0cmluZycpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHVzZSBoaWdoZXItb3JkZXIgc2VjdGlvbnMgd2l0aG91dCB0aGUgb3JpZ2luYWwgdGVtcGxhdGUnKTtcblxuICAgICAgLy8gRXh0cmFjdCB0aGUgcG9ydGlvbiBvZiB0aGUgb3JpZ2luYWwgdGVtcGxhdGUgdGhhdCB0aGUgc2VjdGlvbiBjb250YWlucy5cbiAgICAgIHZhbHVlID0gdmFsdWUuY2FsbChjb250ZXh0LnZpZXcsIG9yaWdpbmFsVGVtcGxhdGUuc2xpY2UodG9rZW5bM10sIHRva2VuWzVdKSwgc3ViUmVuZGVyKTtcblxuICAgICAgaWYgKHZhbHVlICE9IG51bGwpXG4gICAgICAgIGJ1ZmZlciArPSB2YWx1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBidWZmZXIgKz0gdGhpcy5yZW5kZXJUb2tlbnModG9rZW5bNF0sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgICB9XG4gICAgcmV0dXJuIGJ1ZmZlcjtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLnJlbmRlckludmVydGVkID0gZnVuY3Rpb24gcmVuZGVySW52ZXJ0ZWQodG9rZW4sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKSB7XG4gICAgdmFyIHZhbHVlID0gY29udGV4dC5sb29rdXAodG9rZW5bMV0pO1xuXG4gICAgLy8gVXNlIEphdmFTY3JpcHQncyBkZWZpbml0aW9uIG9mIGZhbHN5LiBJbmNsdWRlIGVtcHR5IGFycmF5cy5cbiAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2phbmwvbXVzdGFjaGUuanMvaXNzdWVzLzE4NlxuICAgIGlmICghdmFsdWUgfHwgKGlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmxlbmd0aCA9PT0gMCkpXG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJUb2tlbnModG9rZW5bNF0sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLnJlbmRlclBhcnRpYWwgPSBmdW5jdGlvbiByZW5kZXJQYXJ0aWFsKHRva2VuLCBjb250ZXh0LCBwYXJ0aWFscykge1xuICAgIGlmICghcGFydGlhbHMpIHJldHVybjtcblxuICAgIHZhciB2YWx1ZSA9IGlzRnVuY3Rpb24ocGFydGlhbHMpID8gcGFydGlhbHModG9rZW5bMV0pIDogcGFydGlhbHNbdG9rZW5bMV1dO1xuICAgIGlmICh2YWx1ZSAhPSBudWxsKVxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyVG9rZW5zKHRoaXMucGFyc2UodmFsdWUpLCBjb250ZXh0LCBwYXJ0aWFscywgdmFsdWUpO1xuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUudW5lc2NhcGVkVmFsdWUgPSBmdW5jdGlvbiB1bmVzY2FwZWRWYWx1ZSh0b2tlbiwgY29udGV4dCkge1xuICAgIHZhciB2YWx1ZSA9IGNvbnRleHQubG9va3VwKHRva2VuWzFdKTtcbiAgICBpZiAodmFsdWUgIT0gbnVsbClcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLmVzY2FwZWRWYWx1ZSA9IGZ1bmN0aW9uIGVzY2FwZWRWYWx1ZSh0b2tlbiwgY29udGV4dCkge1xuICAgIHZhciB2YWx1ZSA9IGNvbnRleHQubG9va3VwKHRva2VuWzFdKTtcbiAgICBpZiAodmFsdWUgIT0gbnVsbClcbiAgICAgIHJldHVybiBtdXN0YWNoZS5lc2NhcGUodmFsdWUpO1xuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUucmF3VmFsdWUgPSBmdW5jdGlvbiByYXdWYWx1ZSh0b2tlbikge1xuICAgIHJldHVybiB0b2tlblsxXTtcbiAgfTtcblxuICBtdXN0YWNoZS5uYW1lID0gJ211c3RhY2hlLmpzJztcbiAgbXVzdGFjaGUudmVyc2lvbiA9ICcyLjEuMyc7XG4gIG11c3RhY2hlLnRhZ3MgPSBbJ3t7JywgJ319J107XG5cbiAgLy8gQWxsIGhpZ2gtbGV2ZWwgbXVzdGFjaGUuKiBmdW5jdGlvbnMgdXNlIHRoaXMgd3JpdGVyLlxuICB2YXIgZGVmYXVsdFdyaXRlciA9IG5ldyBXcml0ZXIoKTtcblxuICAvKipcbiAgICogQ2xlYXJzIGFsbCBjYWNoZWQgdGVtcGxhdGVzIGluIHRoZSBkZWZhdWx0IHdyaXRlci5cbiAgICovXG4gIG11c3RhY2hlLmNsZWFyQ2FjaGUgPSBmdW5jdGlvbiBjbGVhckNhY2hlKCkge1xuICAgIHJldHVybiBkZWZhdWx0V3JpdGVyLmNsZWFyQ2FjaGUoKTtcbiAgfTtcblxuICAvKipcbiAgICogUGFyc2VzIGFuZCBjYWNoZXMgdGhlIGdpdmVuIHRlbXBsYXRlIGluIHRoZSBkZWZhdWx0IHdyaXRlciBhbmQgcmV0dXJucyB0aGVcbiAgICogYXJyYXkgb2YgdG9rZW5zIGl0IGNvbnRhaW5zLiBEb2luZyB0aGlzIGFoZWFkIG9mIHRpbWUgYXZvaWRzIHRoZSBuZWVkIHRvXG4gICAqIHBhcnNlIHRlbXBsYXRlcyBvbiB0aGUgZmx5IGFzIHRoZXkgYXJlIHJlbmRlcmVkLlxuICAgKi9cbiAgbXVzdGFjaGUucGFyc2UgPSBmdW5jdGlvbiBwYXJzZSh0ZW1wbGF0ZSwgdGFncykge1xuICAgIHJldHVybiBkZWZhdWx0V3JpdGVyLnBhcnNlKHRlbXBsYXRlLCB0YWdzKTtcbiAgfTtcblxuICAvKipcbiAgICogUmVuZGVycyB0aGUgYHRlbXBsYXRlYCB3aXRoIHRoZSBnaXZlbiBgdmlld2AgYW5kIGBwYXJ0aWFsc2AgdXNpbmcgdGhlXG4gICAqIGRlZmF1bHQgd3JpdGVyLlxuICAgKi9cbiAgbXVzdGFjaGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscykge1xuICAgIGlmICh0eXBlb2YgdGVtcGxhdGUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIHRlbXBsYXRlISBUZW1wbGF0ZSBzaG91bGQgYmUgYSBcInN0cmluZ1wiICcgKyAnYnV0IFwiJyArIHR5cGVTdHIodGVtcGxhdGUpICsgJ1wiIHdhcyBnaXZlbiBhcyB0aGUgZmlyc3QgJyArICdhcmd1bWVudCBmb3IgbXVzdGFjaGUjcmVuZGVyKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscyknKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVmYXVsdFdyaXRlci5yZW5kZXIodGVtcGxhdGUsIHZpZXcsIHBhcnRpYWxzKTtcbiAgfTtcblxuICAvLyBUaGlzIGlzIGhlcmUgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5IHdpdGggMC40LnguLFxuICAvKmVzbGludC1kaXNhYmxlICovIC8vIGVzbGludCB3YW50cyBjYW1lbCBjYXNlZCBmdW5jdGlvbiBuYW1lXG4gIG11c3RhY2hlLnRvX2h0bWwgPSBmdW5jdGlvbiB0b19odG1sKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscywgc2VuZCkge1xuICAgIC8qZXNsaW50LWVuYWJsZSovXG5cbiAgICB2YXIgcmVzdWx0ID0gbXVzdGFjaGUucmVuZGVyKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscyk7XG5cbiAgICBpZiAoaXNGdW5jdGlvbihzZW5kKSkge1xuICAgICAgc2VuZChyZXN1bHQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9O1xuXG4gIC8vIEV4cG9ydCB0aGUgZXNjYXBpbmcgZnVuY3Rpb24gc28gdGhhdCB0aGUgdXNlciBtYXkgb3ZlcnJpZGUgaXQuXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vamFubC9tdXN0YWNoZS5qcy9pc3N1ZXMvMjQ0XG4gIG11c3RhY2hlLmVzY2FwZSA9IGVzY2FwZUh0bWw7XG5cbiAgLy8gRXhwb3J0IHRoZXNlIG1haW5seSBmb3IgdGVzdGluZywgYnV0IGFsc28gZm9yIGFkdmFuY2VkIHVzYWdlLlxuICBtdXN0YWNoZS5TY2FubmVyID0gU2Nhbm5lcjtcbiAgbXVzdGFjaGUuQ29udGV4dCA9IENvbnRleHQ7XG4gIG11c3RhY2hlLldyaXRlciA9IFdyaXRlcjtcblxufSkpO1xuXG5leHBvcnQgZGVmYXVsdCBBWDYubXVzdGFjaGU7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL3NyYy9BWDZNdXN0YWNoZS5qcyJdLCJzb3VyY2VSb290IjoiIn0=