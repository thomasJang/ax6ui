import jQuery from "jqmin";
import AX6UICore from "./AX6UICore.js";
import U from "./AX6Util";
import mustache from "./AX6Mustache.js";
/** ~~~~~~~~~~~~~~~~~~ end of import  ~~~~~~~~~~~~~~~~~~~~ **/

/** ~~~~~~~~~~~~~~~~~~ end of private  ~~~~~~~~~~~~~~~~~~~~ **/

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

}

export default AX6UISideNav;