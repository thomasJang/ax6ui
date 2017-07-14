import jQuery from 'jqmin';
import _ from 'lodash';
import AX6UICore from './AX6UICore';
import mustache from './AX6Mustache';


let CFG;
const onStateChanged = function (opts, that) {
    if (opts && opts.onStateChanged) {
        opts.onStateChanged.call(that, that);
    }
    else if (this.onStateChanged) {
        this.onStateChanged.call(that, that);
    }

    opts = null;
    that = null;
    return true;
};
const getBodyTmpl = function (data, columnKeys) {
    const defaultMask = function(columnKeys) {
        return `
            <div class="ax-mask {{theme}}" id="{{maskId}}">
                <div class="ax-mask-bg"></div>
                <div class="ax-mask-content">
                    <div class="ax-mask-body">
                    {{{body}}}
                    </div>
                </div>
            </div>
        `;
    };
    return mustache.render(defaultMask.call(this, columnKeys), data);
};
const setBody = function (content) {
    this.maskContent = content;
};


class AX6UIMask extends AX6UICore {
    constructor(config) {
        
        console.log(jQuery(document.body).get(0));
        
        
        super({
            theme: '',
            target: jQuery(document.body).get(0),
            animateTime: 250
        });
        jQuery.extend(true, this.config, config);

        this.maskContent = '';
        this.status = "off";

        CFG = this.config;
    }

    open(options) {
        let self = this;

        if (this.status === "on") this.close();
        if (options && options.content) setBody.call(this, options.content);
        if (options && typeof options.templateName === "undefined") options.templateName = "defaultMask";

        let _cfg = _.merge({}, this.config, options),
            target = _cfg.target,
            $target = jQuery(target),
            maskId = 'ax-mask-' + this.instanceId,
            $mask,
            css = {},
            that = {},
            templateName = _cfg.templateName,
            body = getBodyTmpl({
                theme: _cfg.theme,
                maskId: maskId,
                body: this.maskContent,
                templateName: templateName
            }).trim();

        jQuery(document.body).append(body);

        // 마스크의 타겟이 html body 가 아니라면
        
        console.log(target);
        
        if (target && target !== jQuery(document.body).get(0)) {
            css = {
                position: _cfg.position || "absolute",
                left: $target.offset().left,
                top: $target.offset().top,
                width: $target.width(),
                height: $target.height()
            };

            $target.addClass("ax-masking");

            // 마스크의 타겟이 html body가 아닌경우 window resize 이벤트를 추적하여 엘리먼트 마스크의 CSS 속성 변경
            jQuery(window).on("resize.ax5mask-" + this.instanceId, (function (_$target) {
                this.align();
            }).bind(this));
        }

        if (typeof _cfg.zIndex !== "undefined") {
            css["z-index"] = _cfg.zIndex;
        }

        this.$mask = $mask = jQuery("#" + maskId);
        this.$target = $target;
        this.status = "on";
        $mask.css(css);

        if (_cfg.onClick) {
            $mask.on("click", function (e) {
                that = {
                    self: self,
                    state: "open",
                    type: "click"
                };
                self.maskConfig.onClick.call(that, that);
            });
        }

        onStateChanged.call(this, null, {
            self: this,
            state: "open"
        });

        options = null;
        _cfg = null;
        target = null;
        $target = null;
        maskId = null;
        $mask = null;
        css = null;
        that = null;
        templateName = null;
        body = null;

        return this;
    }
}

export default AX6UIMask;
