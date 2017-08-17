import jQuery from "jqmin";
import AX6UICore from "./AX6UICore.js";

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
        this.config = {};
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

        if (!this.config.target) {
            console.error("can not find target");
        }

        this.$target = jQuery(this.config.target);

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

    repaint() {

        this.panels = [];

        let panel_tmpl = `
<ax6ui-docker>
    <ax6ui-docker-pane-axis class="horizontal">
        <ax6ui-docker-pane-axis class="vertical">
            
            <ax6ui-docker-pane class="active" style="flex-grow:1;">
              <!-- pane -->
                <ul class="item-tabs">
                    <li class="">
                        <title>untitle</title>
                        <close></close>
                    </li>
                    <li class="active">
                        <title>untitle</title>
                        <close></close>
                    </li>
                </ul>
                <div class="item-views">
                    <ax6ui-docker-view class=""></ax6ui-docker-view>
                    <ax6ui-docker-view class="is-focused"></ax6ui-docker-view>
                </div>
              <!-- pane -->
            </ax6ui-docker-pane>
            <ax6ui-docker-pane-resize-handle class="vertical"></ax6ui-docker-pane-resize-handle>
            <ax6ui-docker-pane class="" style="flex-grow:1;">
              <!-- pane -->
                <ul class="item-tabs">
                    <li class="">
                        <title>untitle</title>
                        <close></close>
                    </li>
                </ul>
                <div class="item-views">
                    <ax6ui-docker-view class=""></ax6ui-docker-view>
                </div>
              <!-- pane -->
            </ax6ui-docker-pane>    
            
        </ax6ui-docker-pane-axis>
        <ax6ui-docker-pane-resize-handle class="horizontal"></ax6ui-docker-pane-resize-handle>
        <ax6ui-docker-pane class="" style="flex-grow:1;">
            <!-- pane -->
                <ul class="item-tabs">
                    <li class="">
                        <title>untitle</title>
                        <close></close>
                    </li>
                </ul>
                <div class="item-views">
                    <ax6ui-docker-view class=""></ax6ui-docker-view>
                </div>
            <!-- pane -->
        </ax6ui-docker-pane>
    </ax6ui-docker-pane-axis>
</ax6ui-docker>
`;
    }

}

export default AX6UIDocker;