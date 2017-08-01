import jQuery from "jqmin";
import AX6UICore from "./AX6UICore.js";
import U from "./AX6Util.js";
import info from "./AX6Info.js";
import mustache from "./AX6Mustache.js";
/** ~~~~~~~~~~~~~~~~~~ end of import  ~~~~~~~~~~~~~~~~~~~~ **/

const dialogTmpl = function (columnKeys) {
  return ` 
<div id="{{dialogId}}" data-dialog-els="root" data-ax6ui-dialog="" class="{{theme}}">
    <div class="ax-dialog-header" data-dialog-els="header">
        {{{title}}}
    </div>
    <div class="ax-dialog-body" data-dialog-els="body">
        <div class="ax-dialog-msg">{{{msg}}}</div>
        
        {{#input}}
        <div class="ax-dialog-prompt">
            {{#@each}}
            <div class="form-group">
            {{#@value.label}}
            <label>{{#_crlf}}{{{.}}}{{/_crlf}}</label>
            {{/@value.label}}
            <input type="{{@value.type}}" placeholder="{{@value.placeholder}}" class="form-control {{@value.theme}}" data-dialog-prompt="{{@key}}" style="width:100%;" value="{{@value.value}}" />
            {{#@value.help}}
            <p class="help-block">{{#_crlf}}{{.}}{{/_crlf}}</p>
            {{/@value.help}}
            </div>
            {{/@each}}
        </div>
        {{/input}}
        
        <div class="ax-dialog-buttons" data-dialog-els="buttons">
            <div class="ax-button-wrap">
            {{#btns}}
                {{#@each}}
                <button type="button" data-dialog-btn="{{@key}}" class="btn btn-{{@value.theme}}">{{@value.label}}</button>
                {{/@each}}
            {{/btns}}
            </div>
        </div>
        
        {{#additionalContent}}
        <div data-dialog-els="additional-content">{{{.}}}</div>
        {{/additionalContent}}
    </div>
</div>  
`;
};
const onStateChanged = function (opts, that) {
  if (opts && opts.onStateChanged) {
    opts.onStateChanged.call(that, that);
  }
  else if (this.onStateChanged) {
    this.onStateChanged.call(that, that);
  }

  opts = null;
  that = null;
  return true;
};
const getContent = function (dialogId, opts) {
  let data = {
    dialogId: dialogId,
    title: (opts.title || this.config.title || ""),
    msg: (opts.msg || this.config.msg || "").replace(/\n/g, "<br/>"),
    input: opts.input,
    btns: opts.btns,
    '_crlf': function () {
      return this.replace(/\n/g, "<br/>");
    },
    additionalContent: (function (additionalContent) {
      if (U.isFunction(additionalContent)) {
        return additionalContent.call(opts);
      }
      else {
        return additionalContent;
      }
    })(opts.additionalContent)
  };

  return mustache.render(dialogTmpl.call(this), data);
};
const open = function (opts, callback) {
  let pos = {},
    box = {
      width: opts.width
    };

  this.dialogConfig = opts;
  this.$activeDialog = jQuery(getContent.call(this, opts.id, opts));
  this.$activeDialog.css({width: box.width});
  jQuery(document.body).append(this.$activeDialog);

  if (typeof callback === "undefined") {
    callback = opts.callback;
  }

  // dialog 높이 구하기 - 너비가 정해지면 높이가 변경 될 것.
  opts.height = box.height = this.$activeDialog.height();

  //- position 정렬
  if (typeof opts.position === "undefined" || opts.position === "center") {
    pos.top = jQuery(window).height() / 2 - box.height / 2;
    pos.left = jQuery(window).width() / 2 - box.width / 2;
  }
  else {
    pos.left = opts.position.left || 0;
    pos.top = opts.position.top || 0;
  }
  if (this.config.zIndex) {
    pos["z-index"] = this.config.zIndex;
  }

  this.$activeDialog
    .css(pos)
    .on(opts.clickEventName, "[data-dialog-btn]", (e) => {
      btnOnClick.call(this, e || window.event, opts, callback);
    })
    .find(opts.dialogType === "prompt" ? "[data-dialog-prompt]" : "[data-dialog-btn]").trigger("focus");



  // bind key event
  jQuery(window)
    .on("keydown.ax6dialog", (e) => {
      onKeyup.call(this, e || window.event, opts, callback);
    })
    .on("resize.ax6dialog", U.throttle(function (e) {
      align.call(this, e || window.event);
    }, 30).bind(this));

  onStateChanged.call(this, opts, {
    self: this,
    state: "open"
  });

  if (opts.autoCloseTime) {
    this.autoCloseTimer = setTimeout(() => {
      this.close();
    }, opts.autoCloseTime);
  }

  pos = null;
  box = null;
};
const align = function (e) {
  if (!this.$activeDialog) return this;
  let opts = this.dialogConfig,
    box = {
      width: opts.width,
      height: opts.height
    };

  //- position 정렬
  if (typeof opts.position === "undefined" || opts.position === "center") {
    box.top = window.innerHeight / 2 - box.height / 2;
    box.left = window.innerWidth / 2 - box.width / 2;
  }
  else {
    box.left = opts.position.left || 0;
    box.top = opts.position.top || 0;
  }
  if (box.left < 0) box.left = 0;
  if (box.top < 0) box.top = 0;

  this.$activeDialog.css(box);

  opts = null;
  box = null;

  return this;
};
const btnOnClick = function (e, opts, callback, target, k) {
  let that,
    emptyKey = null;

  if (e.srcElement) e.target = e.srcElement;

  target = U.findParentNode(e.target, function (target) {
    if (target.getAttribute("data-dialog-btn")) {
      return true;
    }
  });

  if (target) {
    k = target.getAttribute("data-dialog-btn");

    that = {
      self: this,
      key: k, value: opts.btns[k],
      dialogId: opts.id,
      btnTarget: target
    };
    if (opts.dialogType === "prompt") {
      for (let oi in opts.input) {
        that[oi] = this.$activeDialog.find('[data-dialog-prompt=' + oi + ']').val();
        if (that[oi] == "" || that[oi] == null) {
          emptyKey = oi;
          break;
        }
      }
    }
    if (opts.btns[k].onClick) {
      opts.btns[k].onClick.call(that, that);
    }
    else if (opts.dialogType === "alert") {
      if (callback) callback.call(that, that);
      this.close({doNotCallback: true});
    }
    else if (opts.dialogType === "confirm") {
      if (callback) callback.call(that, that);
      this.close({doNotCallback: true});
    }
    else if (opts.dialogType === "prompt") {
      if (k === 'ok') {
        if (emptyKey) {
          this.$activeDialog.find('[data-dialog-prompt="' + emptyKey + '"]').get(0).focus();
          return false;
        }
      }
      if (callback) callback.call(that, that);
      this.close({doNotCallback: true});
    }
  }

  that = null;
  opts = null;
  callback = null;
  target = null;
  k = null;
};
const onKeyup = function (e, opts, callback, target, k) {
  let that,
    emptyKey = null;

  if (e.keyCode == info.eventKeys.ESC) {
    this.close();
  }
  if (opts.dialogType === "prompt") {
    if (e.keyCode == info.eventKeys.RETURN) {
      that = {
        self: this,
        key: k, value: opts.btns[k],
        dialogId: opts.id,
        btnTarget: target
      };

      for (let oi in opts.input) {
        that[oi] = this.$activeDialog.find('[data-dialog-prompt=' + oi + ']').val();
        if (that[oi] == "" || that[oi] == null) {
          emptyKey = oi;
          break;
        }
      }
      if (emptyKey) {
        that = null;
        emptyKey = null;
        return false;
      }
      if (callback) callback.call(that, that);
      this.close({doNotCallback: true});
    }
  }

  that = null;
  emptyKey = null;
  opts = null;
  callback = null;
  target = null;
  k = null;
};
/** ~~~~~~~~~~~~~~~~~~ end of private  ~~~~~~~~~~~~~~~~~~~~ **/

/**
 * @class
 */
class AX6UIDialog extends AX6UICore {
  /**
   * @constructor
   * @param config
   */
  constructor(config) {
    super();

    /**
     * @member {JSON}
     * @param config
     * @param [config.theme='default']
     * @param [config.width=300]
     * @param [config.title='']
     * @param [config.msg='']
     * @param [config.lang]
     * @param [config.lang.ok='ok']
     * @param [config.lang.cancel='cancel']
     * @param [config.animateTime=150]
     * @param [config.autoCloseTime=0]
     * @param [config.onStateChanged]
     *
     */
    this.config = {
      id: 'ax6-dialog-' + this.instanceId,
      clickEventName: "click",
      theme: 'default',
      width: 300,
      title: 'AX6UIDialog',
      msg: '',
      lang: {
        "ok": "ok", "cancel": "cancel"
      },
      animateTime: 150,
      autoCloseTime: 0
    };
    jQuery.extend(true, this.config, config);

    // 멤버 변수 초기화
    /**
     * dialog가 열려있는 상태에서 다시 open이 되면 queue에 보관 하였다가 close후 open
     * @member {Array}
     */
    this.queue = [];
    /**
     * @member {jQueryElement}
     */
    this.$activeDialog = null;
    /**
     * @member {Object}
     */
    this.autoCloseTimer = null;

    this.init();
  }

  /**
   * @method
   * @param config
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
   * @method
   * @param opts
   * @param callback
   * @param tryCount
   * @return {AX6UIDialog}
   * @example
   * ```js
   * import {Dialog} from "ax6ui"
   *
   * const dialog = new Dialog();
   * dialog.alert("Alert Message");
   * dialog.alert({
     *     title: "Title",
     *     msg: "Alert Message"
     * });
   * ```
   */
  alert(opts, callback, tryCount) {
    if (typeof opts === "undefined") {
      opts = {
        title: this.config.title,
        msg: ""
      }
    } else if (U.isString(opts)) {
      opts = {
        title: this.config.title,
        msg: opts
      }
    }

    opts = jQuery.extend(true, {}, this.config, opts, {
      dialogType: "alert",
      callback: callback
    });

    if (typeof opts.btns === "undefined") {
      opts.btns = {
        ok: {label: opts.lang["ok"], theme: opts.theme}
      };
    }

    if (this.$activeDialog) {
      this.queue.push(opts);
    } else {
      open.call(this, opts, callback);
    }
  }

  /**
   * @method
   * @param opts
   * @param callback
   * @param tryCount
   * @return {AX6UIDialog}
   * @example
   * ```js
   * import {Dialog} from "ax6ui"
   *
   * const dialog = new Dialog();
   * dialog.confirm({
     *     title: "확인",
     *     msg: "확인 또는 취소를 누르세요"
     * }, function (res) {
     *     //console.log(this, a, b);
     *     if(res.key == "ok"){
     *         console.log("OK");
     *     }
     *     else if(res.key == "cancel"){
     *         console.log("CANCEL");
     *     }
     * });
   *
   * // btns custom
   * dialog.config({
     *  title: "예/아니오",
     *  msg: "당신은 개발자 입니까?",
     *  btns: {
     *      Y: {label: "예"},
     *      N: {label: "아니오"}
     *  }
     * }, function (res) {
     *      console.log(res);
     * });
   * ```
   */
  confirm(opts, callback, tryCount) {
    if (typeof opts === "undefined") {
      opts = {
        title: this.config.title,
        msg: ""
      }
    } else if (U.isString(opts)) {
      opts = {
        title: this.config.title,
        msg: opts
      }
    }

    opts = jQuery.extend(true, {}, this.config, opts, {
      dialogType: "confirm",
      callback: callback
    });

    if (typeof opts.btns === "undefined") {
      opts.btns = {
        ok: {label: opts.lang["ok"], theme: opts.theme},
        cancel: {label: opts.lang["cancel"]}
      };
    }

    if (this.$activeDialog) {
      this.queue.push(opts);
    } else {
      open.call(this, opts, callback);
    }

    return this;
  }

  /**
   * @method
   * @param opts
   * @param callback
   * @param tryCount
   * @return {AX6UIDialog}
   * @example
   * ```js
   * import {Dialog} from "ax6ui"
   *
   * const dialog = new Dialog();
   *
   * dialog.prompt({
     *  title: "prompt",
     *  msg: '다음의 값을 입력하세요.',
     *  input: {
     *      data1: {label: "data1의 라벨", type: "password"},
     *      data2: {label: "data2의 라벨"}
     *  }
     * }, function(res){
     *      console.log(res);
     * });
   * ```
   */
  prompt(opts, callback, tryCount) {
    if (typeof opts === "undefined") {
      opts = {
        title: this.config.title,
        msg: ""
      }
    } else if (U.isString(opts)) {
      opts = {
        title: this.config.title,
        msg: opts
      }
    }

    opts = jQuery.extend(true, {}, this.config, opts, {
      dialogType: "prompt",
      callback: callback
    });

    if (typeof opts.input === "undefined") {
      opts.input = {
        value: {label: ""}
      };
    }
    if (typeof opts.btns === "undefined") {
      opts.btns = {
        ok: {label: opts.lang["ok"], theme: opts.theme},
        cancel: {label: opts.lang["cancel"]}
      };
    }

    if (this.$activeDialog) {
      this.queue.push(opts);
    } else {
      open.call(this, opts, callback);
    }

    return this;
  }

  /**
   * @method
   * @param _option
   * @return {AX6UIDialog}
   * @example
   * ```js
   * dialog.close();
   * dialog.close({callback: function(){
     *
     * });
     * ```
     */
  close(_option) {
    let opts, that;

    if (this.$activeDialog) {
      if (this.autoCloseTimer) clearTimeout(this.autoCloseTimer);

      opts = this.dialogConfig;

      this.$activeDialog.addClass("destroy");
      jQuery(window)
        .off("keydown.ax6dialog")
        .off("resize.ax6dialog");

      setTimeout((function () {
        if (this.$activeDialog) {
          this.$activeDialog.remove();
          this.$activeDialog = null;
        }

        that = {
          self: this,
          state: "close",
          dialogId: opts.id
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
    return this;
  }
}

export default AX6UIDialog;