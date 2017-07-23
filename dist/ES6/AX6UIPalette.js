import jQuery from "jqmin";
import AX6UICore from "./AX6UICore";
import info from "./AX6Info";
import U from "./AX6Util";
import mustache from "./AX6Mustache";
import "./AX6UIPalette/index.scss";

const frameTmpl = function (columnKeys) {
    return `
<div data-ax6ui-palette="">
<div data-ax6palette-container="root">
    <div data-ax6palette-container="colors"></div>
    <div data-ax6palette-container="controls"></div>
</div>
</div>
`;
};
const colorsTmpl = function (columnKeys) {
    return `
{{#colors}}
{{#list}}
<div data-ax6palette-color="{{label}}" data-ax6palette-color-index="{{@i}}">
    <div data-panel="color-preview" style="padding:{{preview.cellPadding}}px;width:{{preview.cellWidth}}px;">
        <div data-panel="color-box" style="width:{{preview.width}}px;height:{{preview.height}}px;"><div data-panel="color" style="background-color:{{value}};"></div></div>
    </div>
    <div data-panel="color-label" style="width:{{label.width}}px;">{{label}}</div>
    <div data-panel="color-slider">
        <div data-panel="color-track" style="height:{{slider.trackHeight}}px;background: linear-gradient(90deg, {{_color0value}}, {{_color1value}}, {{_color2value}}); ">
            <div data-panel="color-handle">
                <div data-panel="color-handle-after" style="width:{{slider.handleWidth}}px;height:{{slider.handleWidth}}px;left:{{slider.handleLeft}}px;top:{{slider.handleLeft}}px;"></div>
            </div>
        </div>
    </div>
</div>
{{/list}}
{{/colors}}
`;
};
const ENM = {
    "mousedown": info.supportTouch ? "touchstart" : "mousedown",
    "mousemove": info.supportTouch ? "touchmove" : "mousemove",
    "mouseup": info.supportTouch ? "touchend" : "mouseup"
};
const onStateChanged = function (opts, that) {
    if (opts && opts.onStateChanged) {
        opts.onStateChanged.call(that, that);
    } else if (this.onStateChanged) {
        this.onStateChanged.call(that, that);
    }

    that = null;
};
const getMousePosition = function (e) {
    let mouseObj,
        originalEvent = e.originalEvent ? e.originalEvent : e;
    mouseObj = 'changedTouches' in originalEvent && originalEvent.changedTouches ? originalEvent.changedTouches[0] : originalEvent;
    // clientX, Y 쓰면 스크롤에서 문제 발생
    return {
        clientX: mouseObj.pageX,
        clientY: mouseObj.pageY
    };
};
const bindHandle = function (item) {
    item.originalTrackWidth = item.$track.width();
    item.trackWidth = item.originalTrackWidth - this.config.colors.slider.handleWidth / 5;
    let handleLeft = amountToHandleLeft.call(this, item, item._amount);

    // handleLeft 가 범위를 벗어나면?
    if (handleLeft < 0 || handleLeft > item.trackWidth) {
        let amount;
        handleLeft = handleLeft < 0 ? 0 : handleLeft > item.trackWidth ? item.trackWidth : handleLeft;
        amount = handleLeftToAmount.call(this, item, handleLeft);
        updatePreviewColor.call(this, item, amountToColor.call(this, item, amount));
    }

    item.$handle.css({ left: handleLeft });
    item.$item.off(ENM["mousedown"]).on(ENM["mousedown"], '[data-panel="color-handle"]', e => {
        let mouseObj = getMousePosition(e);
        item._originalHandleClientX = mouseObj.clientX;
        item._originalHandleLeft = item.$handle.position().left;
        handleMoveEvent.on.call(this, item);
        U.stopEvent(e.originalEvent);
    }).off("click").on("click", '[data-panel="color-label"], [data-panel="color-preview"]', e => {
        if (this.onClick) {
            this.onClick.call(item, '#' + item._selectedColor.toUpperCase(), e);
        }
    }).on("click", '[data-panel="color-track"]', e => {
        if (e.target.getAttribute("data-panel") == "color-track") {
            let mouseObj = getMousePosition(e),
                newHandleLeft = mouseObj.clientX - item.$track.offset().left,
                amount = handleLeftToAmount(item, newHandleLeft);

            item.$handle.css({ left: newHandleLeft });
            updatePreviewColor.call(this, item, amountToColor.call(this, item, amount), e);

            mouseObj = null;
            newHandleLeft = null;
            amount = null;
        }
    });
};
const updatePreviewColor = function (item, color, event) {
    item.$preview.css({ "background-color": '#' + color });
    item.$label.html('#' + color.toUpperCase());
    item._selectedColor = color;

    if (event && this.onUpdateColor) {
        this.onUpdateColor.call(item, '#' + item._selectedColor.toUpperCase());
    }
};
const amountToColor = function (item, amount) {
    const processor = {
        "black"(_color, _amount) {
            return _color.lighten(this.config.colors.slider.amount / 2).darken(_amount).getHexValue();
        },
        "white"(_color, _amount) {
            return _color.darken(this.config.colors.slider.amount / 2).darken(_amount).getHexValue();
        },
        "normal"(_color, _amount) {
            return _color.darken(_amount).getHexValue();
        }
    };

    if (item._uniqColor in processor) {
        return processor[item._uniqColor].call(this, item._color, amount);
    } else {
        return processor["normal"].call(this, item._color, amount);
    }
};
const colorToAmount = function (item, color) {
    /// todo : 색상에 가까운 색 표현.
    const processor = {
        "black"(_color, _diffColor) {
            let color1 = _color.lighten(this.config.colors.slider.amount / 2);
            return (color1.getHsl().l - _diffColor.getHsl().l) * 100;
        },
        "white"(_color, _diffColor) {
            let color1 = _color.darken(this.config.colors.slider.amount / 2);
            return (color1.getHsl().l - _diffColor.getHsl().l) * 100;
        },
        "normal"(_color, _diffColor) {
            return (_color.getHsl().l - _diffColor.getHsl().l) * 100;
        }
    };

    if (item._uniqColor in processor) {
        return processor[item._uniqColor].call(this, item._color, color);
    } else {
        return processor["normal"].call(this, item._color, color);
    }
};
const handleLeftToAmount = function (item, handleLeft) {
    return this.config.colors.slider.amount * (handleLeft - item.trackWidth / 2) / (item.originalTrackWidth / 2);
};
const amountToHandleLeft = function (item, amount) {
    return amount * (item.originalTrackWidth / 2) / this.config.colors.slider.amount + item.trackWidth / 2;
};
const handleMoveEvent = {
    "on"(item) {
        jQuery(document.body).on(ENM["mousemove"] + ".ax6palette-" + this.instanceId, e => {
            let mouseObj = getMousePosition(e),
                da = mouseObj.clientX - item._originalHandleClientX,
                newHandleLeft = item._originalHandleLeft + da,
                amount;

            newHandleLeft = newHandleLeft < 0 ? 0 : newHandleLeft > item.trackWidth ? item.trackWidth : newHandleLeft;
            item.$handle.css({ left: newHandleLeft });
            amount = handleLeftToAmount.call(this, item, newHandleLeft);

            updatePreviewColor.call(this, item, amountToColor.call(this, item, amount), e);

            mouseObj = null;
            da = null;
        }).on(ENM["mouseup"] + ".ax6palette-" + this.instanceId, e => {
            handleMoveEvent.off.call(this);
            U.stopEvent(e);
        }).on("mouseleave.ax6palette-" + this.instanceId, e => {
            handleMoveEvent.off.call(this);
            U.stopEvent(e);
        });

        jQuery(document.body).attr('unselectable', 'on').css('user-select', 'none').on('selectstart', false);
    },
    "off"() {
        this.xvar.resizerLived = false;

        jQuery(document.body).off(ENM["mousemove"] + ".ax6palette-" + this.instanceId).off(ENM["mouseup"] + ".ax6palette-" + this.instanceId).off("mouseleave.ax6palette-" + this.instanceId);

        jQuery(document.body).removeAttr('unselectable').css('user-select', 'auto').off('selectstart');
    }
};
const repaint = function (selectedColor) {
    let box = {
        width: this.$target.innerWidth(),
        height: this.$target.innerHeight()
    };

    // 패널 프레임 초기화
    this.$target.html(mustache.render(frameTmpl.call(this), {}, this.config.columnKeys));

    // 각 패널들을 캐싱~
    this.$ = {
        "root": this.$target.find('[data-ax6palette-container="root"]'),
        "colors": this.$target.find('[data-ax6palette-container="colors"]'),
        "controls": this.$target.find('[data-ax6palette-container="controls"]')
    };

    // todo : controls 나중에 고민하여 구현
    // this.$["controls"].css({height: this.config.controls.height});

    /// colors.list 색상 범위 결정 / 초기화
    this.config.colors.list.forEach(c => {
        c._color = U.color(c.value);
        c._selectedColor = c._color.getHexValue();
        if (c._color.r == 0 && c._color.g == 0 && c._color.b == 0) {
            c._amount = this.config.colors.slider.amount;
            c._uniqColor = "black";
            c._color0value = "#" + c._color.lighten(this.config.colors.slider.amount).getHexValue();
            c._color1value = "#" + c._color.lighten(this.config.colors.slider.amount / 2).getHexValue();
            c._color2value = "#" + c._color.getHexValue();
        } else if (c._color.r == 255 && c._color.g == 255 && c._color.b == 255) {
            c._amount = -this.config.colors.slider.amount;
            c._uniqColor = "white";
            c._color0value = "#" + c._color.getHexValue();
            c._color1value = "#" + c._color.darken(this.config.colors.slider.amount / 2).getHexValue();
            c._color2value = "#" + c._color.darken(this.config.colors.slider.amount).getHexValue();
        } else {
            c._amount = 0;
            c._color0value = "#" + c._color.lighten(this.config.colors.slider.amount).getHexValue();
            c._color1value = "#" + c._color.getHexValue();
            c._color2value = "#" + c._color.darken(this.config.colors.slider.amount).getHexValue();
        }
    });

    // 색생조절 핸들의 위치 조정this.config.colors.list[minDiffColorIndex]
    this.config.colors.slider.handleLeft = -this.config.colors.slider.handleWidth / 2;
    this.config.colors.slider.handleTop = -this.config.colors.slider.handleHeight / 2;

    // 팔렛트 컬러 패널 초기화
    this.$["colors"].html(mustache.render(colorsTmpl.call(this), this.config, this.config.columnKeys));

    this.$["colors"].find('[data-ax6palette-color-index]').each((elIdx, el) => {
        let idx = el.getAttribute("data-ax6palette-color-index");
        let color = this.config.colors.list[idx];
        let item = jQuery.extend({}, color);
        item._index = idx;
        item.$item = jQuery(el);
        item.$preview = item.$item.find('[data-panel="color"]');
        item.$label = item.$item.find('[data-panel="color-label"]');
        item.$track = item.$item.find('[data-panel="color-track"]');
        item.$handle = item.$item.find('[data-panel="color-handle"]');
        bindHandle.call(this, item);
        /////
        this.colors.push(item);
    });

    if (selectedColor) {
        this.setSelectedColor(selectedColor);
    }
};

/**
 * @class
 */
class AX6UIPalette extends AX6UICore {
    /**
     * @constructor
     * @param config
     * @param [config.theme]
     * @param config.target
     * @param [config.animateTime]
     * @param {String} [config.selectedColor]
     * @param {Object} [config.colors]
     * @param {Object} [config.colors.preview]
     * @param {Number} [config.colors.preview.width=24]
     * @param {Number} [config.colors.preview.height=24]
     * @param {Number} [config.colors.preview.cellWidth=30]
     * @param {Object} [config.colors.label]
     * @param {Number} [config.colors.label.width=80]
     * @param {Object} [config.colors.slider]
     * @param {Number} [config.colors.slider.trackHeight=8]
     * @param {Number} [config.colors.slider.amount=32]
     * @param {Number} [config.colors.slider.handleWidth=18]
     * @param {Number} [config.colors.slider.handleHeight=18]
     * @param {Object[]} [config.colors.list=[red,orange,yellow,green,blue,purple,black,white]]
     * @param {String} config.colors.list[].label
     * @param {String} config.colors.list[].value
     * @param {Object} [config.controls]
     * @param {Number} [config.controls.height=0]
     * @param [config.onStateChanged]
     * @param [config.onClick]
     * @param [config.onUpdateColor]
     * @example
     * ```js
     * myPalette = new Palette({
     *  target: $('[data-ax5palette="01"]'),
     *  onClick: function (hexColor) {
     *      alert(hexColor);
     *  }
     * });
     *
     * myPalette = new Palette({
     *  target: $('[data-ax5palette="01"]'),
     *  colors: {
     *      list: [
     *          {label: "red", value: "#ff0000"},
     *          {label: "orange", value: "#ff9802"},
     *          {label: "yellow", value: "#ffff00"},
     *          {label: "skyblue", value: "#84e4ff"},
     *          {label: "white", value: "#ffffff"}
     *      ]
     *  }
     *  onClick: function (hexColor) {
     *
     *  }
     * });
     * ```
     */
    constructor(config) {
        super();

        /**
         * @member {JSON}
         * @param config
         * @param config.target
         * @param [config.theme=default]
         * @param [config.clickEventName="click"]
         * @param [config.animateTime=100]
         * @param [config.colors]
         * @param [config.colors.preview]
         * @param [config.colors.preview.width=24]
         * @param [config.colors.preview,height=24]
         * @param [config.colors.preview.cellWidth=30]
         * @param [config.colors.label]
         * @param [config.colors.label.width=80]
         * @param [config.colors.slider]
         * @param [config.colors.slider.trackHeight=8]
         * @param [config.colors.slider.amount=32]
         * @param [config.colors.slider.handleWidth=18]
         * @param [config.colors.slider.handleHeight=18]
         * @param [config.colors.list]
         * @param [config.colors.list[].label]
         * @param [config.colors.list[].value]
         * @param [config.controls]
         * @param [config.controls.height=0]
         * @param [config.columnKeys={}]
         * @param [config.onStateChanged]
         * @param [config.onClick]
         */
        this.config = {
            clickEventName: "click",
            theme: 'default',
            animateTime: 100,
            colors: {
                preview: {
                    width: 24,
                    height: 24,
                    cellWidth: 30
                },
                label: {
                    width: 80
                },
                slider: {
                    trackHeight: 8,
                    amount: 32,
                    handleWidth: 18,
                    handleHeight: 18
                },
                list: [{ label: "red", value: "#ff0000" }, { label: "orange", value: "#ff9802" }, { label: "yellow", value: "#ffff00" }, { label: "green", value: "#00ff36" }, { label: "blue", value: "#0000ff" }, { label: "purple", value: "#ba00ff" },
                //{label: "skyblue", value: "#84e4ff"},
                //{label: "pink", value: "#ff77c4"},
                { label: "black", value: "#000000" }, { label: "white", value: "#ffffff" }]
            },
            controls: {
                height: 0
            },
            columnKeys: {}
        };
        jQuery.extend(true, this.config, config);

        // 멤버 변수 초기화
        /**
         * @member {Object}
         */
        this.$target = null;
        /**
         * @member {Object}
         */
        this.xvar = {};
        /**
         * @member {Array}
         */
        this.colors = [];

        this.init();
    }

    /**
     * @method
     * @param config
     * @param [config.theme]
     * @param config.target
     * @param [config.animateTime]
     * @param {String} [config.selectedColor]
     * @param {Object} [config.colors]
     * @param {Object} [config.colors.preview]
     * @param {Number} [config.colors.preview.width=24]
     * @param {Number} [config.colors.preview.height=24]
     * @param {Number} [config.colors.preview.cellWidth=30]
     * @param {Object} [config.colors.label]
     * @param {Number} [config.colors.label.width=80]
     * @param {Object} [config.colors.slider]
     * @param {Number} [config.colors.slider.trackHeight=8]
     * @param {Number} [config.colors.slider.amount=32]
     * @param {Number} [config.colors.slider.handleWidth=18]
     * @param {Number} [config.colors.slider.handleHeight=18]
     * @param {Object[]} [config.colors.list=[red,orange,yellow,green,blue,purple,black,white]]
     * @param {String} config.colors.list[].label
     * @param {String} config.colors.list[].value
     * @param {Object} [config.controls]
     * @param {Number} [config.controls.height=0]
     * @param [config.onStateChanged]
     * @param [config.onClick]
     * @param [config.onUpdateColor]
     */
    init() {
        this.onStateChanged = this.config.onStateChanged;
        delete this.config.onStateChanged;
        this.onClick = this.config.onClick;
        delete this.config.onClick;
        this.onUpdateColor = this.config.onUpdateColor;
        delete this.config.onUpdateColor;

        if (!this.config.target) {
            console.log(info.getError("ax6palette", "401", "setConfig"));
        }
        this.$target = jQuery(this.config.target);

        setTimeout(() => {
            repaint.call(this, (this.config.selectedColor || "").trim()); // 팔렛트 그리기.
        });

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

    /**
     * @method
     * @return {AX6UIPalette}
     */
    repaint() {
        repaint.call(this);
        return this;
    }

    /**
     * @method
     * @param selectedColor
     * @return {AX6UIPalette}
     */
    setSelectedColor(selectedColor) {
        let sColor = U.color(selectedColor.trim());
        // 지정된 색이 가장 가까운 파렛 검색
        let minDiffColor = 255 * 3,
            minDiffColorIndex = -1;

        this.colors.forEach(function (c, cidx) {
            let c1hsl = c._color.getHsl(),
                c2hsl = sColor.getHsl();
            let diffColor = Math.abs(c1hsl.h - c2hsl.h) + Math.abs(c1hsl.s - c2hsl.s) + Math.abs(c1hsl.l - c2hsl.l);
            if (diffColor < minDiffColor) {
                minDiffColor = diffColor;
                minDiffColorIndex = cidx;
            }
        });

        if (minDiffColorIndex > -1) {
            let amount,
                handleLeft,
                item = this.colors[minDiffColorIndex];

            item._amount = colorToAmount.call(this, item, sColor);
            handleLeft = amountToHandleLeft.call(this, item, item._amount);
            //handleLeft = handleLeft < 0 ? 0 : handleLeft > item.trackWidth ? item.trackWidth : handleLeft;
            item.$handle.css({ left: handleLeft });

            amount = handleLeftToAmount.call(this, item, handleLeft);
            updatePreviewColor.call(this, item, amountToColor.call(this, item, amount));
        }

        return this;
    }
}

export default AX6UIPalette;