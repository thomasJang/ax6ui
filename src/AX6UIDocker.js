import jQuery from "jqmin";
import AX6UICore from "./AX6UICore.js";
import U from "./AX6Util";
import mustache from "./AX6Mustache";
/* ~~~~~~~~~~~~~~~~~~ end of import  ~~~~~~~~~~~~~~~~~~~~ */


/**
 * @class
 */
class AX6UIDocker extends AX6UICore {
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
    this.config = {
      board: {
        rowSize: 2,
        colSize: 2
      }
    };
    jQuery.extend(true, this.config, config);

    // 멤버 변수 초기화
    this.panels = [];
    this.board = [];

    // new 할 때 config가 있다면.
    if (typeof config !== "undefined") this.init();
  }

  /**
   * @method
   */
  init() {


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

  repaint(){

    this.panels = [

    ];

    let panel_tmpl = ``;




  }

}

export default AX6UIDocker;