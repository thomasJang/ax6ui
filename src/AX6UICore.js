import jQuery from 'jqLite';
import _ from 'lodash';

let UI_INSTANCE_ID = 0;

class AX6UICore {
    static getInstanceId() {
        return UI_INSTANCE_ID++;
    };

    constructor(config) {
        this.config = config || {};
        this.instanceId = AX6UICore.getInstanceId();
    }

    setConfig(config) {
        _.merge(this.config, config);
    }
}

export default AX6UICore;