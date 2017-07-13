import jQuery from 'jqLite';
import AX6UICore from './AX6UICore';

const onStateChanged = function (opts, that) {
    if (opts && opts.onStateChanged) {
        opts.onStateChanged.call(that, that);
    } else if (this.onStateChanged) {
        this.onStateChanged.call(that, that);
    }

    opts = null;
    that = null;
    return true;
};
const getBodyTmpl = function (data) {
    if (typeof data.templateName === "undefined") data.templateName = "defaultMask";
    return MASK.tmpl.get.call(this, data.templateName, data);
};
const setBody = function (content) {
    this.maskContent = content;
};

class AX6UIMask extends AX6UICore {
    constructor(config) {

        super(config);

        this.config = {
            theme: '',
            target: jQuery(document.body).get(0),
            animateTime: 250
        };
        this.maskContent = '';
        this.status = "off";
    }

}

export default AX6UIMask;