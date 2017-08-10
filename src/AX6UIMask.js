import jQuery from "jqmin";
import AX6UICore from "./AX6UICore.js";
import U from "./AX6Util";
import mustache from "./AX6Mustache.js";
/* ~~~~~~~~~~~~~~~~~~ end of import  ~~~~~~~~~~~~~~~~~~~~ */

const getBodyTmpl = function (data, columnKeys) {
  const defaultMask = function (columnKeys) {
    return `
            <div data-ax6ui-mask="" class="{{theme}}" id="{{maskId}}">
                <div class="ax-mask-bg"></div>
                <div class="ax-mask-content">
                    <div class="ax-mask-body">
                    {{{body}}}
                    </div>
                </div>
            </div>
        `;
  };
  return mustache.render(defaultMask.call(this, columnKeys), data);
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
const setBody = function (content) {
  this.maskContent = content;
};
/* ~~~~~~~~~~~~~~~~~~ end of private  ~~~~~~~~~~~~~~~~~~~~ */

/**
 * @class
 */
class AX6UIMask extends AX6UICore {
  /**
   * @constructor
   * @param config
   */
  constructor(config) {
    super();

    /**
     * @member {JSON}
     * @param config
     * @param [config.theme]
     * @param [config.target=document.body]
     * @param [config.animateTime=250]
     * @param [config.onStateChanged]
     * @param [config.onClick]
     * @param [config.content]
     *
     */
    this.config = {
      theme: '',
      target: jQuery(document.body).get(0),
      animateTime: 250
    };
    jQuery.extend(true, this.config, config);

    // 멤버 변수 초기화
    /**
     * @member {String}
     */
    this.maskContent = '';
    /**
     * @member {String}
     */
    this.status = "off";
    /**
     * @member {JSON}
     */
    this.activeConfig = {};

    if (typeof config !== "undefined") this.init();
  }

  /**
   * @method
   */
  init() {
    this.onStateChanged = this.config.onStateChanged;
    delete this.config.onStateChanged;
    this.onClick = this.config.onClick;
    delete this.config.onClick;

    setBody.call(this, this.config.content || "");

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
   * @param options
   * @param {number} [options.zIndex] - 마스크 엘리먼트의 z-index 값을 정합니다
   * @return {AX6UIMask}
   * @example
   * ```js
   * let myMask = new Mask();
   * myMask.setConfig({
     *  zIndex: 1000
     * });
   *
   * myMask.open();
   * ```
   */
  open(options) {
    if (this.status === "on") this.close();
    setBody.call(this, (options) ? options.content || "" : "");

    let _cfg = jQuery.extend(true, this.config, options),
      target = _cfg.target,
      $target = jQuery(target),
      maskId = 'ax-mask-' + this.instanceId,
      $mask,
      css = {},
      that = {},
      templateName = _cfg.templateName,
      body = getBodyTmpl({
        theme: _cfg.theme,
        maskId: maskId,
        body: this.maskContent,
        templateName: templateName
      }).trim();

    jQuery(document.body).append(body);

    // 마스크의 타겟이 html body 가 아니라면
    if (target && target !== jQuery(document.body).get(0)) {
      css = {
        position: _cfg.position || "absolute",
        left: $target.offset().left,
        top: $target.offset().top,
        width: $target.outerWidth(),
        height: $target.outerHeight()
      };

      $target.addClass("ax-masking");

      // 마스크의 타겟이 html body가 아닌경우 window resize 이벤트를 추적하여 엘리먼트 마스크의 CSS 속성 변경
      jQuery(window).on("resize.ax5mask-" + this.instanceId, U.throttle(function (e) {
        this.align();
      }, 100).bind(this));
    }

    if (typeof _cfg.zIndex !== "undefined") {
      css["z-index"] = _cfg.zIndex;
    }

    this.$mask = $mask = jQuery("#" + maskId);
    this.$target = $target;
    this.status = "on";
    $mask.css(css);

    if (this.onClick) {
      $mask.on("click", (e) => {
        that = {
          self: this,
          state: "open",
          type: "click"
        };
        this.onClick.call(that, that);
      });
    }

    onStateChanged.call(this, null, {
      self: this,
      state: "open"
    });

    // 현재 활성화된 설정 기억
    this.activeConfig = _cfg;

    options = null;
    _cfg = null;
    target = null;
    $target = null;
    maskId = null;
    $mask = null;
    css = null;
    that = null;
    templateName = null;
    body = null;

    return this;
  }

  /**
   * @method
   * @param delay
   * @return {AX6UIMask}
   */
  close(delay) {
    if (this.$mask) {

      let _close = function () {
        this.status = "off";
        this.$mask.remove();
        this.$target.removeClass("ax-masking");

        onStateChanged.call(this, null, {
          self: this,
          state: "close"
        });

        jQuery(window).off("resize.ax5mask-" + this.instanceId);
      };

      if (delay) {
        setTimeout((function () {
          _close.call(this);
        }).bind(this), delay);
      } else {
        _close.call(this);
      }
    }
    return this;
  }

  /**
   * @method
   * @return {AX6UIMask}
   */
  fadeOut() {
    if (this.$mask) {
      let _close = function () {
        this.status = "off";
        this.$mask.remove();
        this.$target.removeClass("ax-masking");

        onStateChanged.call(this, null, {
          self: this,
          state: "close"
        });

        jQuery(window).off("resize.ax5mask-" + this.instanceId);
      };


      this.$mask.addClass("fade-out");
      setTimeout((function () {
        _close.call(this);
      }).bind(this), this.activeConfig.animateTime);
    }
    return this;
  }

  /**
   * @method
   * @return {AX6UIMask}
   */
  align() {
    if (this.$mask && this.activeConfig && this.activeConfig.target && this.activeConfig.target !== jQuery(document.body).get(0)) {
      try {
        let css = {
          position: this.activeConfig.position || "absolute",
          left: this.$target.offset().left,
          top: this.$target.offset().top,
          width: this.$target.outerWidth(),
          height: this.$target.outerHeight()
        };
        this.$mask.css(css);
      }
      catch (e) {

      }
    }
    return this;
  }
}

export default AX6UIMask;