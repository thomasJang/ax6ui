import jQuery from "jqmin";
import AX6UICore from "./AX6UICore.js";
import "./AX6UIToast/index.scss";

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
     *
     */
    this.config = {};
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

export default AX6UIToast;