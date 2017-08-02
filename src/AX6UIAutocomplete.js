import jQuery from "jqmin";
import AX6UICore from "./AX6UICore.js";
import info from "./AX6Info";
import U from "./AX6Util";
import mustache from "./AX6Mustache";
/** ~~~~~~~~~~~~~~~~~~ end of import  ~~~~~~~~~~~~~~~~~~~~ **/

/** ~~~~~~~~~~~~~~~~~~ end of private  ~~~~~~~~~~~~~~~~~~~~ **/

/**
 * @class
 */
class AX6UIAutocomplete extends AX6UICore {
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
     * @param [config.animateTime=100]
     * @param [config.lang] - 메세지들
     * @param [config.lang.noSelected='']
     * @param [config.lang.noOptions='no options']
     * @param [config.lang.loading='now loading..']
     * @param [config.lang.multipleLabel='"{{label}}"외 {{length}}건']
     * @param [config.columnKeys] - 내부에서 사용 JSON key 정의
     * @param [config.columnKeys.optionValue='value']
     * @param [config.columnKeys.optionText='text']
     * @param [config.columnKeys.optionSelected='selected']
     */
    this.config = {

    };
    jQuery.extend(true, this.config, config);

    // 멤버 변수 초기화


    this.init();
  }

  /**
   * @method
   * @param config
   */
  init() {
    this.onStateChanged = this.config.onStateChanged;
    delete this.config.onStateChanged;
    this.onChange = this.config.onChange;
    delete this.config.onChange;

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

export default AX6UIAutocomplete;