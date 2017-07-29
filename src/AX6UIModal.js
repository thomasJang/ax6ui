import jQuery from "jqmin";
import AX6UICore from "./AX6UICore.js";
import U from "./AX6Util";
import info from "./AX6Info";
import mustache from "./AX6Mustache";
import "./AX6UIModal/index.scss";

let tmpl = {
  modal() {
    return ` 
<div data-ax6ui-modal="{{modalId}}" data-modal-els="root" class="{{theme}} {{fullscreen}}" style="{{styles}}">
    {{#header}}
    <div class="ax-modal-header" data-modal-els="header">
        {{{title}}}
        {{#btns}}
            <div class="ax-modal-header-addon">
            {{#@each}}
            <button tabindex="-1" data-modal-header-btn="{{@key}}" class="{{@value.theme}}">{{{@value.label}}}</button>
            {{/@each}}
            </div>
        {{/btns}}
    </div>
    {{/header}}
    <div class="ax-modal-body" data-modal-els="body">
    {{#iframe}}
        <div data-modal-els="iframe-wrap" style="-webkit-overflow-scrolling: touch; overflow: auto;position: relative;">
            <table data-modal-els="iframe-loading" style="width:100%;height:100%;"><tr><td style="text-align: center;vertical-align: middle">{{{iframeLoadingMsg}}}</td></tr></table>
            <iframe name="{{modalId}}-frame" src="" width="100%" height="100%" frameborder="0" data-modal-els="iframe" style="position: absolute;left:0;top:0;"></iframe>
        </div>
        <form name="{{modalId}}-form" data-modal-els="iframe-form">
        <input type="hidden" name="modalId" value="{{modalId}}" />
        {{#param}}
        {{#@each}}
        <input type="hidden" name="{{@key}}" value="{{@value}}" />
        {{/@each}}
        {{/param}}
        </form>
    {{/iframe}}
    {{^iframe}}
        <div data-modal-els="body-frame" style="position: absolute;left:0;top:0;width:100%;height:100%;"></div>
    {{/iframe}}
    </div>
    {{^disableResize}}
    <div data-ax6ui-modal-resizer="top"></div>
    <div data-ax6ui-modal-resizer="right"></div>
    <div data-ax6ui-modal-resizer="bottom"></div>
    <div data-ax6ui-modal-resizer="left"></div>
    <div data-ax6ui-modal-resizer="top-left"></div>
    <div data-ax6ui-modal-resizer="top-right"></div>
    <div data-ax6ui-modal-resizer="bottom-left"></div>
    <div data-ax6ui-modal-resizer="bottom-right"></div>
    {{/disableResize}}
</div>`;
  }
};
let ENM = {
  "mousedown": (info.supportTouch) ? "touchstart" : "mousedown",
  "mousemove": (info.supportTouch) ? "touchmove" : "mousemove",
  "mouseup": (info.supportTouch) ? "touchend" : "mouseup"
};
const getMousePosition = function (e) {
  let mouseObj = e;
  if ('changedTouches' in e && e.changedTouches) {
    mouseObj = e.changedTouches[0];
  }
  return {
    clientX: mouseObj.clientX,
    clientY: mouseObj.clientY
  }
};

const onStateChanged = function (opts, that) {
  const eventProcessor = {
    "resize": function (that) {
      if (opts && opts.onResize) {
        opts.onResize.call(that, that);
      }
      else if (this.onResize) {
        this.onResize.call(that, that);
      }
    },
    "move": function () {

    }
  };
  if (that.state in eventProcessor) {
    eventProcessor[that.state].call(this, that);
  }

  if (opts && opts.onStateChanged) {
    opts.onStateChanged.call(that, that);
  }
  else if (this.onStateChanged) {
    this.onStateChanged.call(that, that);
  }
  return true;
};
const getContent = function (modalId, opts) {
  let data = {
    modalId: modalId,
    theme: opts.theme,
    header: opts.header,
    fullScreen: (opts.fullScreen ? "fullscreen" : ""),
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

  return mustache.render(tmpl.modal.call(this), data);
};
const open = function (opts, callback) {
  let that;

  this.modalConfig = opts;
  this.$activeModal = jQuery(getContent.call(this, opts.id, opts));

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
  }
  else {
    this.$["body-frame"] = this.$activeModal.find('[data-modal-els="body-frame"]');
  }

  jQuery(document.body).append(this.$activeModal);
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
    this.$["iframe-wrap"].css({height: opts.height});
    this.$["iframe"].css({height: opts.height});

    // iframe content load
    this.$["iframe-form"].attr({"method": opts.iframe.method});
    this.$["iframe-form"].attr({"target": opts.id + "-frame"});
    this.$["iframe-form"].attr({"action": opts.iframe.url});
    this.$["iframe"].on("load", (function () {
      that.state = "load";
      if (opts.iframeLoadingMsg) {
        this.$["iframe-loading"].hide();
      }
      onStateChanged.call(this, opts, that);
    }).bind(this));
    if (!opts.iframeLoadingMsg) {
      this.$["iframe"].show();
    }
    this.$["iframe-form"].submit();
  }

  if (callback) callback.call(that, that);

  onStateChanged.call(this, opts, that);

  // bind key event
  if (opts.closeToEsc) {
    jQuery(window).on("keydown.ax-modal", e => {
      onkeyup.call(this, e || window.event);
    });
  }

  jQuery(window).on("resize.ax-modal", e => {
    this.align(null, e || window.event);
  });

  this.$.header
    .off(ENM["mousedown"])
    .off("dragstart")
    .on(ENM["mousedown"], e => {
      /// 이벤트 필터링 추가 : 버튼엘리먼트로 부터 발생된 이벤트이면 moveModal 시작하지 않도록 필터링
      let isButton = U.findParentNode(e.currentTarget, function (_target) {
        if (_target.getAttribute("data-modal-header-btn")) {
          return true;
        }
      });

      if (!opts.isFullScreen && !isButton && opts.disableDrag != true) {
        this.mousePosition = getMousePosition(e);
        moveModal.on.call(this);
      }
      if (isButton) {
        btnOnClick.call(this, e || window.event, opts);
      }
    })
    .on("dragstart", e => {
      U.stopEvent(e.originalEvent);
      return false;
    });

  this.$activeModal
    .off(ENM["mousedown"])
    .off("dragstart")
    .on(ENM["mousedown"], "[data-ax6ui-modal-resizer]", e => {
      if (opts.disableDrag || opts.isFullScreen) return false;
      this.mousePosition = getMousePosition(e);
      resizeModal.on.call(this, e.currentTarget.getAttribute("data-ax6ui-modal-resizer"));
    })
    .on("dragstart", e => {
      U.stopEvent(e.originalEvent);
      return false;
    });
};
const btnOnClick = function (e, opts, callback, target, k) {
  let that;
  if (e.srcElement) e.target = e.srcElement;

  target = U.findParentNode(e.target, function (target) {
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
const onkeyup = function (e) {
  if (e.keyCode == info.eventKeys.ESC) {
    this.close();
  }
};
const alignProcessor = {
  "top-left": function () {
    this.align({left: "left", top: "top"});
  },
  "top-right": function () {
    this.align({left: "right", top: "top"});
  },
  "bottom-left": function () {
    this.align({left: "left", top: "bottom"});
  },
  "bottom-right": function () {
    this.align({left: "right", top: "bottom"});
  },
  "center-middle": function () {
    this.align({left: "center", top: "middle"});
  }
};
const moveModal = {
  "on": function () {
    let modalZIndex = this.$activeModal.css("z-index"),
      modalOffset = this.$activeModal.position(),
      modalBox = {
        width: this.$activeModal.outerWidth(), height: this.$activeModal.outerHeight()
      },
      windowBox = {
        width: jQuery(window).width(),
        height: jQuery(window).height(),
        scrollLeft: (this.modalConfig.absolute) ? 0 : jQuery(document).scrollLeft(),
        scrollTop: (this.modalConfig.absolute) ? 0 : jQuery(document).scrollTop(),
      },
      getResizerPosition = function (e) {
        this.__dx = e.clientX - this.mousePosition.clientX;
        this.__dy = e.clientY - this.mousePosition.clientY;

        if (minX > modalOffset.left + this.__dx) {
          this.__dx = -modalOffset.left;
        }
        else if (maxX < modalOffset.left + this.__dx) {
          this.__dx = (maxX) - modalOffset.left;
        }

        if (minY > modalOffset.top + this.__dy) {
          this.__dy = -modalOffset.top;
        }
        else if (maxY < modalOffset.top + this.__dy) {
          this.__dy = (maxY) - modalOffset.top;
        }

        return {
          left: modalOffset.left + this.__dx + windowBox.scrollLeft,
          top: modalOffset.top + this.__dy + windowBox.scrollTop
        };
      };

    let minX = 0, maxX = windowBox.width - modalBox.width,
      minY = 0, maxY = windowBox.height - modalBox.height;

    this.__dx = 0; // 변화량 X
    this.__dy = 0; // 변화량 Y

    // this.$resizerBg : body 가 window보다 작을 때 문제 해결을 위한 DIV
    this.$resizerBg.css({zIndex: modalZIndex});
    this.$resizer.css({
      left: modalOffset.left + windowBox.scrollLeft,
      top: modalOffset.top + windowBox.scrollTop,
      width: modalBox.width,
      height: modalBox.height,
      zIndex: modalZIndex + 1
    });

    jQuery(document.body)
      .append(this.$resizerBg)
      .append(this.$resizer);

    this.$activeModal.addClass("draged");

    jQuery(document.body)
      .on(ENM["mousemove"] + ".ax6modal-move-" + this.instanceId, U.throttle(function (e) {
        this.$resizer.css(getResizerPosition.call(this, e));
      }, 30).bind(this))
      .on(ENM["mouseup"] + ".ax6modal-move-" + this.instanceId, e => {
        moveModal.off.call(this);
      })
      .on("mouseleave.ax6modal-move-" + this.instanceId, e => {
        moveModal.off.call(this);
      });

    jQuery(document.body)
      .attr('unselectable', 'on')
      .css('user-select', 'none')
      .on('selectstart', false);
  },
  "off": function () {
    const setModalPosition = function () {
      let box = this.$resizer.offset();
      if (!this.modalConfig.absolute) {
        box.left -= jQuery(document).scrollLeft();
        box.top -= jQuery(document).scrollTop();
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

    jQuery(document.body)
      .off(ENM["mousemove"] + ".ax6modal-move-" + this.instanceId)
      .off(ENM["mouseup"] + ".ax6modal-move-" + this.instanceId)
      .off("mouseleave.ax6modal-move-" + this.instanceId);

    jQuery(document.body)
      .removeAttr('unselectable')
      .css('user-select', 'auto')
      .off('selectstart');

    onStateChanged.call(this, this.modalConfig, {
      self: this,
      state: "move"
    });

  }
};
const resizeModal = {
  "on": function (resizerType) {
    let modalZIndex = this.$activeModal.css("z-index"),
      modalOffset = this.$activeModal.position(),
      modalBox = {
        width: this.$activeModal.outerWidth(), height: this.$activeModal.outerHeight()
      },
      windowBox = {
        width: jQuery(window).width(),
        height: jQuery(window).height(),
        scrollLeft: (this.modalConfig.absolute) ? 0 : jQuery(document).scrollLeft(),
        scrollTop: (this.modalConfig.absolute) ? 0 : jQuery(document).scrollTop(),
      },
      resizerProcessor = {
        "top": function (e) {

          if (minHeight > modalBox.height - this.__dy) {
            this.__dy = modalBox.height - (minHeight);
          }

          if (e.shiftKey) {

            if (minHeight > modalBox.height - (this.__dy * 2)) {
              this.__dy = (modalBox.height - (minHeight)) / 2;
            }

            return {
              left: modalOffset.left,
              top: modalOffset.top + this.__dy,
              width: modalBox.width,
              height: modalBox.height - (this.__dy * 2)
            };
          }
          else if (e.altKey) {

            if (minHeight > modalBox.height - (this.__dy * 2)) {
              this.__dy = (modalBox.height - (minHeight)) / 2;
            }

            return {
              left: modalOffset.left + this.__dy,
              top: modalOffset.top + this.__dy,
              width: modalBox.width - (this.__dy * 2),
              height: modalBox.height - (this.__dy * 2)
            };
          }
          else {
            return {
              left: modalOffset.left,
              top: modalOffset.top + this.__dy,
              width: modalBox.width,
              height: modalBox.height - this.__dy,
            };
          }
        },
        "bottom": function (e) {

          if (minHeight > modalBox.height + this.__dy) {
            this.__dy = -modalBox.height + (minHeight);
          }

          if (e.shiftKey) {

            if (minHeight > modalBox.height + (this.__dy * 2)) {
              this.__dy = (-modalBox.height + (minHeight)) / 2;
            }

            return {
              left: modalOffset.left,
              top: modalOffset.top - this.__dy,
              width: modalBox.width,
              height: modalBox.height + (this.__dy * 2)
            };
          }
          else if (e.altKey) {

            if (minHeight > modalBox.height + (this.__dy * 2)) {
              this.__dy = (-modalBox.height + (minHeight)) / 2;
            }

            return {
              left: modalOffset.left - this.__dy,
              top: modalOffset.top - this.__dy,
              width: modalBox.width + (this.__dy * 2),
              height: modalBox.height + (this.__dy * 2),
            };
          }
          else {
            return {
              left: modalOffset.left,
              top: modalOffset.top,
              width: modalBox.width,
              height: modalBox.height + this.__dy,
            };
          }
        },
        "left": function (e) {

          if (minWidth > modalBox.width - this.__dx) {
            this.__dx = modalBox.width - (minWidth);
          }

          if (e.shiftKey) {

            if (minWidth > modalBox.width - (this.__dx * 2)) {
              this.__dx = (modalBox.width - (minWidth)) / 2;
            }

            return {
              left: modalOffset.left + this.__dx,
              top: modalOffset.top,
              width: modalBox.width - (this.__dx * 2),
              height: modalBox.height
            };
          }
          else if (e.altKey) {

            if (minWidth > modalBox.width - (this.__dx * 2)) {
              this.__dx = (modalBox.width - (minWidth)) / 2;
            }

            return {
              left: modalOffset.left + this.__dx,
              top: modalOffset.top + this.__dx,
              width: modalBox.width - (this.__dx * 2),
              height: modalBox.height - (this.__dx * 2),
            };
          }
          else {
            return {
              left: modalOffset.left + this.__dx,
              top: modalOffset.top,
              width: modalBox.width - this.__dx,
              height: modalBox.height,
            };
          }
        },
        "right": function (e) {

          if (minWidth > modalBox.width + this.__dx) {
            this.__dx = -modalBox.width + (minWidth);
          }

          if (e.shiftKey) {

            if (minWidth > modalBox.width + (this.__dx * 2)) {
              this.__dx = (-modalBox.width + (minWidth)) / 2;
            }

            return {
              left: modalOffset.left - this.__dx,
              top: modalOffset.top,
              width: modalBox.width + (this.__dx * 2),
              height: modalBox.height,
            };
          }
          else if (e.altKey) {

            if (minWidth > modalBox.width + (this.__dx * 2)) {
              this.__dx = (-modalBox.width + (minWidth)) / 2;
            }

            return {
              left: modalOffset.left - this.__dx,
              top: modalOffset.top - this.__dx,
              width: modalBox.width + (this.__dx * 2),
              height: modalBox.height + (this.__dx * 2),
            };
          }
          else {
            return {
              left: modalOffset.left,
              top: modalOffset.top,
              width: modalBox.width + this.__dx,
              height: modalBox.height,
            };
          }
        },
        "top-left": function (e) {

          if (minWidth > modalBox.width - this.__dx) {
            this.__dx = modalBox.width - (minWidth);
          }

          if (minHeight > modalBox.height - this.__dy) {
            this.__dy = modalBox.height - (minHeight);
          }

          if (e.shiftKey || e.altKey) {

            if (minHeight > modalBox.height - (this.__dy * 2)) {
              this.__dy = (modalBox.height - (minHeight)) / 2;
            }
            if (minWidth > modalBox.width - (this.__dx * 2)) {
              this.__dx = (modalBox.width - (minWidth)) / 2;
            }

            return {
              left: modalOffset.left + this.__dx,
              top: modalOffset.top + this.__dy,
              width: modalBox.width - (this.__dx * 2),
              height: modalBox.height - (this.__dy * 2),
            };
          }
          else {

            if (minHeight > modalBox.height - (this.__dy * 2)) {
              this.__dy = (modalBox.height - (minHeight)) / 2;
            }
            if (minWidth > modalBox.width - (this.__dx * 2)) {
              this.__dx = (modalBox.width - (minWidth)) / 2;
            }

            return {
              left: modalOffset.left + this.__dx,
              top: modalOffset.top + this.__dy,
              width: modalBox.width - this.__dx,
              height: modalBox.height - this.__dy,
            };
          }
        },
        "top-right": function (e) {

          if (minWidth > modalBox.width + this.__dx) {
            this.__dx = -modalBox.width + (minWidth);
          }

          if (minHeight > modalBox.height - this.__dy) {
            this.__dy = modalBox.height - (minHeight);
          }

          if (e.shiftKey || e.altKey) {

            if (minHeight > modalBox.height - (this.__dy * 2)) {
              this.__dy = (modalBox.height - (minHeight)) / 2;
            }
            if (minWidth > modalBox.width + (this.__dx * 2)) {
              this.__dx = (-modalBox.width + (minWidth)) / 2;
            }

            return {
              left: modalOffset.left - this.__dx,
              top: modalOffset.top + this.__dy,
              width: modalBox.width + (this.__dx * 2),
              height: modalBox.height - (this.__dy * 2),
            };
          }
          else {
            return {
              left: modalOffset.left,
              top: modalOffset.top + this.__dy,
              width: modalBox.width + this.__dx,
              height: modalBox.height - this.__dy,
            };
          }
        },
        "bottom-left": function (e) {

          if (minWidth > modalBox.width - this.__dx) {
            this.__dx = modalBox.width - (minWidth);
          }

          if (minHeight > modalBox.height + this.__dy) {
            this.__dy = -modalBox.height + (minHeight);
          }

          if (e.shiftKey || e.altKey) {
            if (minWidth > modalBox.width - (this.__dx * 2)) {
              this.__dx = (modalBox.width - (minWidth)) / 2;
            }
            if (minHeight > modalBox.height + (this.__dy * 2)) {
              this.__dy = (-modalBox.height + (minHeight)) / 2;
            }
            return {
              left: modalOffset.left + this.__dx,
              top: modalOffset.top - this.__dy,
              width: modalBox.width - (this.__dx * 2),
              height: modalBox.height + (this.__dy * 2),
            };
          }
          else {
            return {
              left: modalOffset.left + this.__dx,
              top: modalOffset.top,
              width: modalBox.width - this.__dx,
              height: modalBox.height + this.__dy,
            };
          }
        },
        "bottom-right": function (e) {

          if (minWidth > modalBox.width + this.__dx) {
            this.__dx = -modalBox.width + (minWidth);
          }

          if (minHeight > modalBox.height + this.__dy) {
            this.__dy = -modalBox.height + (minHeight);
          }

          if (e.shiftKey || e.altKey) {
            if (minWidth > modalBox.width + (this.__dx * 2)) {
              this.__dx = (-modalBox.width + (minWidth)) / 2;
            }
            if (minHeight > modalBox.height + (this.__dy * 2)) {
              this.__dy = (-modalBox.height + (minHeight)) / 2;
            }
            return {
              left: modalOffset.left - this.__dx,
              top: modalOffset.top - this.__dy,
              width: modalBox.width + (this.__dx * 2),
              height: modalBox.height + (this.__dy * 2),
            };
          }
          else {
            return {
              left: modalOffset.left,
              top: modalOffset.top,
              width: modalBox.width + this.__dx,
              height: modalBox.height + this.__dy,
            };
          }
        },
      },
      getResizerPosition = function (e) {
        this.__dx = e.clientX - this.mousePosition.clientX;
        this.__dy = e.clientY - this.mousePosition.clientY;

        return resizerProcessor[resizerType](e);
      };

    if (!this.modalConfig.absolute) {
      modalOffset.left += windowBox.scrollLeft;
      modalOffset.top += windowBox.scrollTop;
    }

    let minWidth = 100,
      minHeight = 100;

    let cursorType = {
      "top": "row-resize",
      "bottom": "row-resize",
      "left": "col-resize",
      "right": "col-resize",
      "top-left": "nwse-resize",
      "top-right": "nesw-resize",
      "bottom-left": "nesw-resize",
      "bottom-right": "nwse-resize",
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

    jQuery(document.body)
      .append(this.$resizerBg)
      .append(this.$resizer);

    this.$activeModal.addClass("draged");

    jQuery(document.body)
      .on(ENM["mousemove"] + ".ax6modal-resize-" + this.instanceId, U.throttle(function (e) {
        this.$resizer.css(getResizerPosition.call(e));
      }, 30).bind(this))
      .on(ENM["mouseup"] + ".ax6modal-resize-" + this.instanceId, e => {
        resizeModal.off.call(this);
      })
      .on("mouseleave.ax6modal-resize-" + this.instanceId, e => {
        resizeModal.off.call(this);
      });

    jQuery(document.body)
      .attr('unselectable', 'on')
      .css('user-select', 'none')
      .bind('selectstart', false);
  },
  "off": function () {
    let setModalPosition = function () {
      let box = this.$resizer.offset();
      jQuery.extend(box, {
        width: this.$resizer.width(),
        height: this.$resizer.height(),
      });
      if (!this.modalConfig.absolute) {
        box.left -= jQuery(document).scrollLeft();
        box.top -= jQuery(document).scrollTop();
      }
      this.$activeModal.css(box);

      this.modalConfig.left = box.left;
      this.modalConfig.top = box.top;
      this.modalConfig.width = box.width;
      this.modalConfig.height = box.height;
      this.$["body"].css({height: box.height - this.modalConfig.headerHeight});
      if (this.modalConfig.iframe) {
        this.$["iframe-wrap"].css({height: box.height - this.modalConfig.headerHeight});
        this.$["iframe"].css({height: box.height - this.modalConfig.headerHeight});
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

    jQuery(document.body)
      .off(ENM["mousemove"] + ".ax6modal-resize-" + this.instanceId)
      .off(ENM["mouseup"] + ".ax6modal-resize-" + this.instanceId)
      .off("mouseleave.ax6modal-resize-" + this.instanceId);

    jQuery(document.body)
      .removeAttr('unselectable')
      .css('user-select', 'auto')
      .off('selectstart');

  }
};


/**
 * @class
 */
class AX6UIModal extends AX6UICore {
  /**
   * @constructor
   * @param config
   */
  constructor(config) {
    super();

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
    this.config = {
      id: 'ax6ui-modal-' + this.instanceId,
      position: {
        left: "center",
        top: "middle",
        margin: 10
      },
      minimizePosition: "bottom-right",
      clickEventName: (('ontouchstart' in document.documentElement) ? "touchstart" : "click"),
      theme: 'default',
      width: 300,
      height: 400,
      closeToEsc: true,
      disableDrag: false,
      disableResize: false,
      animateTime: 250,
      iframe: false
    };
    jQuery.extend(true, this.config, config);

    // 멤버 변수 초기화
    /**
     * 열려있는 상태에서 다시 open이 되면 queue에 보관 하였다가 close후 open
     * @member {Array}
     */
    this.queue = [];
    /**
     * @member {jQueryElement}
     */
    this.$activeModal = null;
    this.$ = {};

    this.$resizerBg = jQuery('<div data-ax6ui-modal-resizer-background="" ondragstart="return false;"></div>');
    this.$resizer = jQuery('<div data-ax6ui-modal-resizer="" ondragstart="return false;"></div>');

    if (typeof config !== "undefined") this.init();
  }

  /**
   * @method
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
  open(opts, callback) {
    if (typeof opts === "undefined") {
      opts = {}
    }

    opts = jQuery.extend(true, {}, this.config, opts);

    if (this.$activeModal) {
      opts.callback = callback;
      this.queue.push(opts);
    } else {
      open.call(this, opts, callback);
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
  close(_option) {
    let opts, that;

    if (this.$activeModal) {
      opts = this.modalConfig;

      this.$activeModal.addClass("destroy");
      jQuery(window)
        .off("keydown.ax-modal")
        .off("resize.ax-modal");

      setTimeout((function () {
        // 프레임 제거
        if (opts.iframe) {
          let $iframe = this.$["iframe"]; // iframe jQuery Object
          if ($iframe) {
            let iframeObject = $iframe.get(0),
              idoc = (iframeObject.contentDocument) ? iframeObject.contentDocument : iframeObject.contentWindow.document;

            try {
              $(idoc.body).children().each(function () {
                $(this).remove();
              });
            }
            catch (e) {

            }
            idoc.innerHTML = "";
            $iframe
              .attr('src', 'about:blank')
              .remove();

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

        if (_option && U.isFunction(_option.callback)) {
          _option.callback.call(that, that);
        } else if (opts.callback && (!_option || !_option.doNotCallback)) {
          opts.callback.call(that, that);
        }

        if (opts && opts.onStateChanged) {
          opts.onStateChanged.call(that, that);
        }
        else if (this.onStateChanged) {
          this.onStateChanged.call(that, that);
        }

        // 열려야 할 큐가 남아 있다면 큐아이템으로 다시 open
        if (this.queue && this.queue.length) {
          open.call(this, this.queue.shift());
        }

        opts = null;
        that = null;
      }).bind(this), this.config.animateTime);
    }

    this.minimized = false; // hoksi

    return this;
  };

  /**
   * @method
   * @returns {AX6UIModal}
   */
  minimize(minimizePosition) {
    if (this.minimized !== true) {

      let opts = this.modalConfig;
      if (typeof minimizePosition === "undefined") minimizePosition = cfg.minimizePosition;

      this.minimized = true;
      this.$.body.css({display: "none"});
      this.modalConfig.originalHeight = opts.height;
      this.modalConfig.height = 0;
      alignProcessor[minimizePosition].call(this);

      onStateChanged.call(this, opts, {
        self: this,
        state: "minimize"
      });
    }

    return this;
  };

  /**
   * @method ax5modal.restore
   * @returns {AX6UIModal}
   */
  restore() {
    let opts = this.modalConfig;
    if (this.minimized) {
      this.minimized = false;
      this.$.body.css({display: "block"});
      this.modalConfig.height = this.modalConfig.originalHeight;
      this.modalConfig.originalHeight = undefined;

      this.align({left: "center", top: "middle"});
      onStateChanged.call(this, opts, {
        self: this,
        state: "restore"
      });
    }
    return this;
  };

  /**
   * setCSS
   * @method ax5modal.css
   * @param {Object} css -
   * @returns {AX6UIModal}
   */
  css(css) {
    if (this.$activeModal && !this.fullScreen) {
      this.$activeModal.css(css);
      if (typeof css.width !== "undefined") {
        this.modalConfig.width = css.width;
      }
      if (typeof css.height !== "undefined") {
        this.modalConfig.height = css.height;
      }

      this.align();
    }
    return this;
  };

  /**
   * @method
   * @param _config
   * @returns {AX6UIModal}
   */
  setModalConfig(_config) {
    this.modalConfig = jQuery.extend({}, this.modalConfig, _config);
    this.align();
    return this;
  };

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
  align(position, e) {
    if (!this.$activeModal) return this;

    let opts = this.modalConfig,
      box = {
        width: opts.width,
        height: opts.height
      };

    const fullScreen = opts.isFullScreen = (function (_fullScreen) {
      if (typeof _fullScreen === "undefined") {
        return false;
      } else if (U.isFunction(_fullScreen)) {
        return _fullScreen();
      }
    })(opts.fullScreen);

    if (fullScreen) {
      if (opts.header) this.$.header.show();
      if (opts.header) {
        opts.headerHeight = this.$.header.outerHeight();
        box.height += opts.headerHeight;
      } else {
        opts.headerHeight = 0;
      }
      box.width = jQuery(window).width();
      box.height = opts.height;
      box.left = 0;
      box.top = 0;
    }
    else {
      if (opts.header) this.$.header.show();
      if (position) {
        jQuery.extend(true, opts.position, position);
      }

      if (opts.header) {
        opts.headerHeight = this.$.header.outerHeight();
        box.height += opts.headerHeight;
      } else {
        opts.headerHeight = 0;
      }

      //- position 정렬
      if (opts.position.left == "left") {
        box.left = (opts.position.margin || 0);
      }
      else if (opts.position.left == "right") {
        // window.innerWidth;
        box.left = jQuery(window).width() - box.width - (opts.position.margin || 0);
      }
      else if (opts.position.left == "center") {
        box.left = jQuery(window).width() / 2 - box.width / 2;
      }
      else {
        box.left = opts.position.left || 0;
      }

      if (opts.position.top == "top") {
        box.top = (opts.position.margin || 0);
      }
      else if (opts.position.top == "bottom") {
        box.top = jQuery(window).height() - box.height - (opts.position.margin || 0);
      }
      else if (opts.position.top == "middle") {
        box.top = jQuery(window).height() / 2 - box.height / 2;
      }
      else {
        box.top = opts.position.top || 0;
      }
      if (box.left < 0) box.left = 0;
      if (box.top < 0) box.top = 0;
    }

    this.$activeModal.css(box);
    this.$["body"].css({height: box.height - (opts.headerHeight || 0)});

    if (opts.iframe) {
      this.$["iframe-wrap"].css({height: box.height - opts.headerHeight});
      this.$["iframe"].css({height: box.height - opts.headerHeight});
    } else {

    }
    return this;
  }

}

export default AX6UIModal;