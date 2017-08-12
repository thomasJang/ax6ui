import jQuery from "jqmin";
import AX6UICore from "./AX6UICore.js";
/* ~~~~~~~~~~~~~~~~~~ end of import  ~~~~~~~~~~~~~~~~~~~~ */

let EasingFunctions = {
  // no easing, no acceleration
  linear: function (t) {
    return t
  },
  // accelerating from zero velocity
  easeInQuad: function (t) {
    return t * t
  },
  // decelerating to zero velocity
  easeOutQuad: function (t) {
    return t * (2 - t)
  },
  // acceleration until halfway, then deceleration
  easeInOutQuad: function (t) {
    return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t
  },
  // accelerating from zero velocity
  easeInCubic: function (t) {
    return t * t * t
  },
  // decelerating to zero velocity
  easeOutCubic: function (t) {
    return (--t) * t * t + 1
  },
  // acceleration until halfway, then deceleration
  easeInOutCubic: function (t) {
    return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  },
  // accelerating from zero velocity
  easeInQuart: function (t) {
    return t * t * t * t
  },
  // decelerating to zero velocity
  easeOutQuart: function (t) {
    return 1 - (--t) * t * t * t
  },
  // acceleration until halfway, then deceleration
  easeInOutQuart: function (t) {
    return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
  },
  // accelerating from zero velocity
  easeInQuint: function (t) {
    return t * t * t * t * t
  },
  // decelerating to zero velocity
  easeOutQuint: function (t) {
    return 1 + (--t) * t * t * t * t
  },
  // acceleration until halfway, then deceleration
  easeInOutQuint: function (t) {
    return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
  }
};

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
      duration: 300
    };
    jQuery.extend(true, this.config, config);

    // 멤버 변수 초기화
    this.$targetMenu = null;
    this.$targetPanel = null;

    this.animating = false;

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

    this.$targetMenu
      .css({width: this.config.menu.width})
      .attr("data-ax6ui-sidenav-position", this.config.menu.position);
    this.$targetPanel.attr("data-ax6ui-sidenav-position", this.config.menu.position);

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
    if(this.animating) return this;


/*
for (let i = 0, l = 11; i < l; i++) {
  console.log(i, EasingFunctions.easeOutQuad(i/10));
}
*/
    return this;
  }
}

export default AX6UISideNav;