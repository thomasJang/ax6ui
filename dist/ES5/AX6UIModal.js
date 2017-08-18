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

var _AX6Mustache = require("./AX6Mustache");

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
                (0, _jqmin2.default)(idoc.body).children().each(function () {
                  (0, _jqmin2.default)(this).remove();
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