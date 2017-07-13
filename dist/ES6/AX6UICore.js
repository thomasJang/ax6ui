class AX6UICore {
    constructor() {
        // this.instanceId = ax5.getGuid();
        this.config = {};
    }

    setConfig(config) {
        this.config = Object.assign(this.config, config);
    }
}

export default AX6UICore;