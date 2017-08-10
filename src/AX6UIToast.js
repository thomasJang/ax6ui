import jQuery from "jqmin";
import U from "./AX6Util.js";
import AX6UICore from "./AX6UICore.js";
import mustache from "./AX6Mustache";
/* ~~~~~~~~~~~~~~~~~~ end of import  ~~~~~~~~~~~~~~~~~~~~ */

let tmpl = {
  display(columnKeys) {
    return `
<div id="{{toastId}}" data-ax6ui-toast="" class="{{theme}}">
    {{#icon}}
    <div class="ax-toast-icon">{{{.}}}</div>
    {{/icon}}
    <div class="ax-toast-body">{{{msg}}}</div>
    {{#btns}}
    <div class="ax-toast-buttons">
        <div class="ax-button-wrap">
            {{#@each}}
            <button type="button" data-ax-toast-btn="{{@key}}" class="btn btn-{{@value.theme}}">{{{@value.label}}}</button>
            {{/@each}}
        </div>
    </div>
    {{/btns}}
    {{^btns}}
        <a class="ax-toast-close" data-ax-toast-btn="ok">{{{closeIcon}}}</a>
    {{/btns}}
    <div style="clear:both;"></div>
</div>`;
  }
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
const getContent = function (toastId, opts) {
  let data = {
    toastId: toastId,
    theme: opts.theme,
    icon: opts.icon,
    msg: (opts.msg || "").replace(/\n/g, "<br/>"),
    btns: opts.btns,
    closeIcon: opts.closeIcon
  };

  try {
    return mustache.render(tmpl.display.call(this), data);
  }
  finally {
    toastId = null;
    data = null;
  }
};
const open = function (opts, callback) {
  if (this.toastSeqClear) clearTimeout(this.toastSeqClear);

  let $toastBox,
    box = {
      width: opts.width
    };

  opts.id = 'ax6ui-toast-' + this.instanceId + '-' + (++this.toastSeq);

  if (jQuery('#' + opts.id).get(0)) return this;

  $toastBox = jQuery(getContent(opts.id, opts));
  $toastBox.css({width: this.$toastContainer.width()});

  if (U.left(this.config.containerPosition, '-') == 'bottom') {
    this.$toastContainer.append($toastBox);
  }
  else {
    this.$toastContainer.prepend($toastBox);
  }

  opts.$toastBox = $toastBox;
  this.queue.push(opts);

  onStateChanged.call(this, opts, {
    self: this,
    state: "open",
    toastId: opts.id
  });

  if (opts.toastType === "push") {
    // 자동 제거 타이머 시작
    setTimeout(() => {
      this.close(opts, callback);
    }, this.config.displayTime);

    $toastBox.on(this.config.clickEventName, '[data-ax-toast-btn]', e => {
      btnOnClick.call(this, e || window.event, opts, $toastBox, callback);
    });
  }
  else if (opts.toastType === "confirm") {
    $toastBox.on(this.config.clickEventName, '[data-ax-toast-btn]', e => {
      btnOnClick.call(this, e || window.event, opts, $toastBox, callback);
    });
  }

  box = null;
};
const btnOnClick = function (e, opts, $toastBox, callback, target, k) {
  target = U.findParentNode(e.target, function (target) {
    if (target.getAttribute("data-ax-toast-btn")) {
      return true;
    }
  });

  if (target) {
    k = target.getAttribute("data-ax-toast-btn");

    let that = {
      key: k, value: (opts.btns) ? opts.btns[k] : k,
      toastId: opts.id,
      btn_target: target
    };

    if (opts.btns && opts.btns[k].onClick) {
      opts.btns[k].onClick.call(that, that);
    }
    else if (opts.toastType === "push") {
      if (callback) callback.call(that, that);
      this.close(opts, callback);
    }
    else if (opts.toastType === "confirm") {
      if (callback) callback.call(that, that);
      this.close(opts);
    }
  }

  e = null;
  opts = null;
  $toastBox = null;
  callback = null;
  target = null;
  k = null;
};
/* ~~~~~~~~~~~~~~~~~~ end of private  ~~~~~~~~~~~~~~~~~~~~ */

/**
 * @class
 */
class AX6UIToast extends AX6UICore {
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
     * @param [config.icon='']
     * @param [config.closeIcon='']
     * @param [config.msg='']
     * @param [config.lang]
     * @param [config.lang.ok='ok']
     * @param [config.lang.cancel='cancel']
     * @param [config.displayTime=3000]
     * @param [config.animateTime=250]
     * @param [config.containerPosition='bottom-left']
     */
    this.config = {
      clickEventName: "click",
      theme: 'default',
      width: 300,
      icon: '',
      closeIcon: '',
      msg: '',
      lang: {
        "ok": "ok", "cancel": "cancel"
      },
      displayTime: 3000,
      animateTime: 250,
      containerPosition: "bottom-left",
      zIndex: 9999
    };
    jQuery.extend(true, this.config, config);

    // 멤버 변수 초기화
    this.$toastContainer = jQuery('<div data-ax6ui-toast-container="' + this.instanceId + '" data-toast-container-position=""></div>');
    this.queue = [];
    this.toastSeq = 0;
    this.toastSeqClear = null;

    jQuery(document.body).append(this.$toastContainer);

    this.init();
  }

  /**
   * @method
   */
  init() {
    this.onStateChanged = this.config.onStateChanged;
    delete this.config.onStateChanged;

    this.$toastContainer
      .css({"z-index": this.config.zIndex, width: this.config.width, "max-width": "100%"})
      .attr("data-toast-container-position", this.config.containerPosition);

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
   * @return {AX6UIToast}
   * @example
   * ```js
   * import {AX6UIToast as Toast} from "ax6ui";
   *
   * let toast = new Toast({
     *  containerPosition: "bottom-right"
     * });
   *
   * toast.push("toast messages");
   * ```
   */
  push(opts, callback) {
    if (U.isString(opts)) {
      opts = {
        title: this.config.title,
        msg: opts
      }
    }

    opts.toastType = "push";
    opts = jQuery.extend(true, {}, this.config, opts);
    open.call(this, opts, callback);

    opts = null;
    callback = null;
    return this;
  }

  /**
   * @method
   * @param opts
   * @param callback
   * @returns {AX6UIToast}
   * @example
   * ```js
   * import {AX6UIToast as Toast} from "ax6ui";
   *
   * let toast = new Toast({
     *  containerPosition: "bottom-right"
     * });
   *
   * toast.confirm({
     *  title: "예/아니오",
     *  msg: "당신은 개발자 입니까?",
     *  btns: {
     *      Y: {label: "예"},
     *      N: {label: "아니오"}
     *  }
     * }, function(res){
     *  console.log(res);
     * });
   * ```
   */
  confirm(opts, callback) {
    if (U.isString(opts)) {
      opts = {
        title: this.config.title,
        msg: opts
      }
    }

    opts.toastType = "confirm";
    opts = jQuery.extend(true, {}, this.config, opts);
    if (typeof opts.btns === "undefined") {
      opts.btns = {
        ok: {label: opts.lang["ok"], theme: opts.theme}
      };
    }
    open.call(this, opts, callback);

    opts = null;
    callback = null;
    return this;
  }

  /**
   * close the toast
   * @method
   * @returns {AX6UIToast}
   * @example
   * ```
   * toast.close();
   * ```
   */
  close(opts, callback) {
    let $toastBox = opts.$toastBox;
    $toastBox.addClass((opts.toastType == "push") ? "removed" : "destroy");
    this.queue = U.filter(this.queue, function () {
      return opts.id != this.id;
    });

    setTimeout((function () {
      var that = {
        toastId: opts.id
      };

      $toastBox.remove();
      if (callback) callback.call(that, that);

      that = {
        self: this,
        state: "close",
        toastId: opts.id
      };
      onStateChanged.call(this, opts, that);

      // 3초후에도 아무 일이 없다면 완전히 제거
      if (this.queue.length === 0) {
        if (this.toastSeqClear) clearTimeout(this.toastSeqClear);
        this.toastSeqClear = setTimeout((function () {
          /// console.log("try clear seq");
          if (this.queue.length === 0) this.toastSeq = 0;
        }).bind(this), 3000);
      }

      that = null;
      opts = null;
      callback = null;
      $toastBox = null;
    }).bind(this), opts.animateTime);

    return this;
  }

}

export default AX6UIToast;