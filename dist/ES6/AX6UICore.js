import _ from 'lodash';
import U from "./AX6Util";

let UI_INSTANCE_ID = 0;

class AX6UICore {
    static getInstanceId() {
        return UI_INSTANCE_ID++;
    }

    constructor() {
        this.initialized = false;
        this.instanceId = AX6UICore.getInstanceId();
    }

    setConfig(config, callInit) {
        _.merge(this.config, config);

        this.init();
        return this;
    }

    init() {
        // 초기화 함수,

        this.initOnce();
    }

    initOnce() {
        // 1회만 호출되어야 하는 초기화 함수
        if (this.initialized) return this;
        this.initialized = true;
        //
    }
}

export default AX6UICore;