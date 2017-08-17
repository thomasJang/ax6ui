import jQuery from "jqmin";
import AX6UICore from "./AX6UICore";
import U from "./AX6Util";
/* ~~~~~~~~~~~~~~~~~~ end of import  ~~~~~~~~~~~~~~~~~~~~ */

/* ~~~~~~~~~~~~~~~~~~ end of private  ~~~~~~~~~~~~~~~~~~~~ */

/**
 * @class
 */
class AX6UISideNav extends AX6UICore {
  /**
   * @constructor
   * @param config
   */
  constructor(config) {
    super();

    /**
     * @member {JSON}
     * @param config
     * @param config.menu
     * @param [config.menu.width=256]
     * @param [config.menu.position='left']
     * @param config.menu.target
     * @param config.panel
     * @param config.panel.target
     *
     */
    this.config = {
      menu: {
        width: 256,
        position: "left"
      },
      panel: {},
      transition: {
        duration: 300,
        easing: 'ease'
      }

    };
    U.extend(true, this.config, config);

    // 멤버 변수 초기화
    this.$targetMenu = null;
    this.$targetPanel = null;

    this.animating = false;
    this.opened = false;

    if (typeof config !== "undefined") this.init();
  }

  /**
   * @method
   */
  init() {
    if (!this.config.menu.target || !this.config.panel.target) {
      console.error('Can not found config.menu.target, config.panel.target');
    }

    this.$targetMenu = jQuery(this.config.menu.target);
    this.$targetPanel = jQuery(this.config.panel.target);

    this.$targetMenu.css({ width: this.config.menu.width }).attr("data-ax6ui-sidenav-position", this.config.menu.position);
    this.$targetPanel.attr("data-ax6ui-sidenav-position", this.config.menu.position).on('click', e => {
      if (this.opened) this.close();
    });

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

  open() {
    if (this.animating) return this;

    jQuery('html').attr('data-ax6ui-sidenav-open', 'true');

    this.$targetPanel.css({
      'transform': 'translateX(' + this.config.menu.width + 'px)',
      '-webkit-transition': 'transform ' + this.config.transition.duration + 'ms ' + this.config.transition.easing
    });

    setTimeout(() => {
      this.opened = true;
    }, this.config.transition.duration);

    return this;
  }

  close() {
    if (this.animating) return this;

    this.$targetPanel.css({
      'transform': 'translateX(0px)',
      '-webkit-transition': 'transform ' + this.config.transition.duration + 'ms ' + this.config.transition.easing
    });

    setTimeout(() => {
      jQuery('html').attr('data-ax6ui-sidenav-open', null);
      this.opened = false;
    }, this.config.transition.duration);

    return this;
  }
}

export default AX6UISideNav;