import jQuery from "jqmin";

let UI_INSTANCE_ID = 0;

/**
 *  @class
 */
class AX6UICore {

    static getInstanceId() {
        return UI_INSTANCE_ID++;
    };

    /**
     * @constructor
     */
    constructor() {
        this.initialized = false;
        this.instanceId = AX6UICore.getInstanceId();

    }

    /**
     * @method
     * @param config
     * @return {AX6UICore}
     */
    setConfig(config) {
        jQuery.extend(this.config, config);

        this.init();
        return this;
    }

    /**
     * UI가 생성될 때, config 속성이 바뀔때 호출 되는 내부 메서드
     * @method
     */
    init(){ // 초기화 함수,

        this.initOnce();
    }

    /**
     * UI가 랜더링 될 때 1회만 호출되는 메소드 repaint가 필요한 상황엔 별도의 repaint 메서드를 이용할 것을 권장
     * @method
     */
    initOnce(){ // 1회만 호출되어야 하는 초기화 함수
        if(this.initialized) return this;
        this.initialized = true;
        //
    }

    /**
     * @method
     */
    destory(){

    }
}

export default AX6UICore;