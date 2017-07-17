import jQuery from "jqmin";
import AX6UICore from "./AX6UICore";
import info from "./AX6Info";
import U from "./AX6Util";
import FORMATTER from "./AX6UIFormatter-formatter";

const setSelectionRange = function (input, pos) {
    if (typeof pos == "undefined") {
        pos = input.value.length;
    }
    if (input.setSelectionRange) {
        input.focus();
        input.setSelectionRange(pos, pos);
    }
    else if (input.createTextRange) {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
    else if (input.selectionStart) {
        input.focus();
        input.selectionStart = pos;
        input.selectionEnd = pos;
    }
};
const formatterEvent = {
    'focus': function (opts, optIdx, e) {
        if (!opts.$input.data("__originValue__")) opts.$input.data("__originValue__", opts.$input.val());
    },
    /* 키 다운 이벤트에서 입력할 수 없는 키 입력을 방어 */
    'keydown': function (opts, optIdx, e) {
        let isStop = false;
        if (!opts.enterableKeyCodes) {

        }
        else if (e.which && opts.enterableKeyCodes[e.which]) {

        }
        else if (!e.metaKey && !e.ctrlKey && !e.shiftKey) {
            //console.log(e.which, opts.enterableKeyCodes);
            isStop = true;
        }
        if (isStop) U.stopEvent(e);
    },
    /* 키 업 이벤트에서 패턴을 적용 */
    'keyup': function (opts, optIdx, e) {
        let elem = opts.$input.get(0),
            elemFocusPosition,
            beforeValue,
            newValue,
            selection, selectionLength
        ;

        if ('selectionStart' in elem) {
            // Standard-compliant browsers
            elemFocusPosition = elem.selectionStart;
        }
        else if (document.selection) {
            // IE
            //elem.focus();
            selection = document.selection.createRange();
            selectionLength = document.selection.createRange().text.length;
            selection.moveStart('character', -elem.value.length);
            elemFocusPosition = selection.text.length - selectionLength;
        }

        beforeValue = elem.value;
        if (opts.pattern in FORMATTER) {
            newValue = FORMATTER[opts.pattern].getPatternValue.call(this, opts, optIdx, e, elem.value);
        } else {
            newValue = beforeValue
        }

        if (newValue != beforeValue) {
            opts.$input.val(newValue).trigger("change");
            setSelectionRange(elem, elemFocusPosition + newValue.length - beforeValue.length);
        }
    },
    'blur': function (opts, optIdx, e, _force) {
        let elem = opts.$input.get(0),
            beforeValue,
            newValue
        ;

        opts.$input.removeData("__originValue__");

        beforeValue = elem.value;
        if (opts.pattern in FORMATTER) {
            newValue = FORMATTER[opts.pattern].getPatternValue.call(this, opts, optIdx, e, elem.value, 'blur');
        } else {
            newValue = beforeValue
        }

        if (_force) {
            opts.$input.val(newValue);
        } else {
            if (newValue != beforeValue) {
                opts.$input.val(newValue).trigger("change");
            }
        }
    }
};
const bindFormatterTarget = function (opts, optIdx) {
    if (!opts.pattern) {
        if (opts.$target.get(0).tagName == "INPUT") {
            opts.pattern = opts.$target
                .attr('data-ax6formatter');
        }
        else {
            opts.pattern = opts.$target
                .find('input[type="text"]')
                .attr('data-ax6formatter');
        }
        if (!opts.pattern) {
            console.log(info.getError("ax6formatter", "501", "bind"));
            console.log(opts.target);
            return this;
        }
    }

    let re = /[^\(^\))]+/gi,
        matched = opts.pattern.match(re);

    opts.pattern = matched[0];
    opts.patternArgument = matched[1] || "";

    // 함수타입
    if (opts.pattern in FORMATTER) {
        opts.enterableKeyCodes = FORMATTER[opts.pattern].getEnterableKeyCodes.call(this, opts, optIdx);
    } else if(opts.pattern in this.config.formatter) {

    }

    opts.$input
        .off('focus.ax6formatter')
        .on('focus.ax6formatter', formatterEvent.focus.bind(this, this.queue[optIdx], optIdx))
        .off('keydown.ax6formatter')
        .on('keydown.ax6formatter', formatterEvent.keydown.bind(this, this.queue[optIdx], optIdx))
        .off('keyup.ax6formatter')
        .on('keyup.ax6formatter', formatterEvent.keyup.bind(this, this.queue[optIdx], optIdx))
        .off('blur.ax6formatter')
        .on('blur.ax6formatter', formatterEvent.blur.bind(this, this.queue[optIdx], optIdx));

    formatterEvent.blur.call(this, this.queue[optIdx], optIdx);

    return this;
};
const unbindFormatterTarget = function (opts, optIdx) {
    opts.$input
        .off('focus.ax6formatter')
        .off('keydown.ax6formatter')
        .off('keyup.ax6formatter')
        .off('blur.ax6formatter');

    return this;
};

const getQueIdx = function (boundID) {
    if (!U.isString(boundID)) {
        boundID = jQuery(boundID).data("data-formatter");
    }
    /*
     if (!U.isString(boundID)) {
     console.log(info.getError("ax6formatter", "402", "getQueIdx"));
     return;
     }
     */
    return U.search(this.queue, function () {
        return this.id == boundID;
    });
};

/**
 * @class
 */
class AX6UIFormatter extends AX6UICore {
    /**
     * @constructor
     * @param config
     * @param {Object} [config.formatter]
     * @example
     * ```js
     * var formatter = new Formatter();
     *
     * // Extend formatter
     * var myFormatter = new Formatter({
     *  formatter: {
     *      "mystyle": {
     *          getEnterableKeyCodes: function (_opts) {
     *              var enterableKeyCodes = {
     *                  '189': '-' // eventKeyCode
     *              };
     *              return jQuery.extend(enterableKeyCodes, {});
     *          }
     *          getPatternValue: function (_opts, optIdx, e, val, eType) {
     *              val = val.replace(/\D/g, "");
     *              var regExpPattern = /^([0-9]{2})\-?([0-9]{2})?\-?([0-9]{2})?\-?([0-9]{2})?/;
     *              return val.replace(regExpPattern, function (a, b) {
     *                  var nval = [arguments[1]];
     *                  if (arguments[2]) nval.push(arguments[2]);
     *                  if (arguments[3]) nval.push(arguments[3]);
     *                  if (arguments[4]) nval.push(arguments[4]);
     *                  return nval.join("-");
     *              });
     *          }
     *      }
     *  }
     * });
     * ```
     */
    constructor(config) {
        super();

        /**
         * @member {JSON}
         * @param config
         * @param [config.animateTime=250]
         */
        this.config = {
            animateTime: 250
        };
        jQuery.extend(true, this.config, config);

        // 멤버 변수 초기화
        /**
         * @member
         * @type {Array}
         */
        this.queue = [];
        this.openTimer = null;
        this.closeTimer = null;

        this.init();
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
     * @return {AX6UIFormatter}
     */
    initOnce() {
        if (this.initialized) return this;
        this.initialized = true;
    }

    /**
     * @method
     * @param {Object} opts
     * @param {Element} opts.target
     * @return {AX6UIFormatter}
     */
    bind(opts) {
        let self = this;
        let formatterConfig = {},
            optIdx;

        jQuery.extend(true, formatterConfig, this.config);
        if (opts) jQuery.extend(true, formatterConfig, opts);
        opts = formatterConfig;

        if (!opts.target) {
            console.log(info.getError("ax6formatter", "401", "bind"));
            return this;
        }
        opts.$target = jQuery(opts.target);

        if (opts.$target.get(0).tagName == "INPUT") {
            opts.$input = opts.$target;
        }
        else {
            opts.$input = opts.$target.find('input[type="text"]');
            if (opts.$input.length > 1) {
                opts.$input.each(function () {
                    opts.target = this;
                    self.bind(opts);
                });
                return this;
            }
        }

        opts.$input = (opts.$target.get(0).tagName == "INPUT") ? opts.$target : opts.$target.find('input[type="text"]');

        if (!opts.id) opts.id = opts.$input.data("ax6-formatter");

        if (!opts.id) {
            opts.id = 'ax6-formatter-' + AX6UICore.getInstanceId();
            opts.$input.data("ax6-formatter", opts.id);
        }
        optIdx = U.search(this.queue, function () {
            return this.id == opts.id;
        });

        if (optIdx === -1) {
            this.queue.push(opts);
            bindFormatterTarget.call(this, this.queue[this.queue.length - 1], this.queue.length - 1);
        }
        else {
            this.queue[optIdx] = opts;
            bindFormatterTarget.call(this, this.queue[optIdx], optIdx);
        }

        return this;
    }

    /**
     * @method
     * @return {AX6UIFormatter}
     */
    formatting() {
        let queIdx = (U.isNumber(boundID)) ? boundID : getQueIdx.call(this, boundID);
        if (queIdx === -1) {
            let i = this.queue.length;
            while (i--) {
                formatterEvent.blur.call(this, this.queue[i], i, null, true);
            }
        } else {
            formatterEvent.blur.call(this, this.queue[queIdx], queIdx, null, true);
        }
        return this;
    }

    /**
     * @method
     * @param opts
     * @return {AX6UIFormatter}
     */
    unbind(opts) {
        let self = this;
        let optIdx;

        if (!opts.target) {
            console.log(info.getError("ax6formatter", "401", "unbind"));
            return this;
        }
        opts.$target = jQuery(opts.target);

        if (opts.$target.get(0).tagName == "INPUT") {
            opts.$input = opts.$target;
        }
        else {
            opts.$input = opts.$target.find('input[type="text"]');
            if (opts.$input.length > 1) {
                opts.$input.each(function () {
                    opts.target = this;
                    self.unbind(opts);
                });
                return this;
            }
        }

        opts.$input = (opts.$target.get(0).tagName == "INPUT") ? opts.$target : opts.$target.find('input[type="text"]');
        opts.id = opts.$input.data("ax6-formatter");

        if (opts.id) {
            optIdx = U.search(this.queue, function () {
                return this.id == opts.id;
            });

            unbindFormatterTarget.call(this, this.queue[optIdx]);
            this.queue.splice(optIdx, 1);
        }
        
        return this;
    }
}

export default AX6UIFormatter;