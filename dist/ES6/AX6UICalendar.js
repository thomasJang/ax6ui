import jQuery from "jqmin";
import _ from "lodash";
import AX6UICore from "./AX6UICore";
import mustache from "./AX6Mustache";

/**
 * @class
 */
class AX6UICalendar extends AX6UICore {
    /**
     * @constructor
     * @param config
     * @param [config.theme]
     * @param [config.target]
     * @param [config.anmateTime]
     * @param [config.onStateChanged]
     * @param [config.onClick]
     * @param [config.content]
     */
    constructor(config) {
        super();

        this.config = {
            theme: '',
            animateTime: 250
        };
        jQuery.extend(true, this.config, config);

        // 멤버 변수 초기화
        this.maskContent = '';
        this.status = "off";
        this.activeConfig = {};

        this.init();
    }

    /**
     * @method
     * @param config
     * @param [config.theme]
     * @param [config.target]
     * @param [config.anmateTime]
     * @param [config.onStateChanged]
     * @param [config.onClick]
     * @param [config.content]
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
     * @return {AX6UIMask}
     */
    initOnce() {
        if (this.initialized) return this;
        this.initialized = true;
    }

}

export default AX6UIMask;