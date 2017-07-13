class AX6UICore {
    constructor() {
        this.config = {};
        this.instanceId = AX6UICore.getInstanceId();
    }

    setConfig(config) {
        this.config = Object.assign(this.config, config);
    }

    static getInstanceId() {
        if (typeof this.instanceId === "undefined") {
            this.instanceId = 0;
        }
        return this.instanceId++;
    };
}

export default AX6UICore;