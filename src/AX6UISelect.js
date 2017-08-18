import jQuery from "jqmin";
import AX6UICore from "./AX6UICore.js";
import info from "./AX6Info";
import U from "./AX6Util";
import mustache from "./AX6Mustache";
/* ~~~~~~~~~~~~~~~~~~ end of import  ~~~~~~~~~~~~~~~~~~~~ */

let ctrlKeys = {
  "18": "KEY_ALT",
  "8": "KEY_BACKSPACE",
  "17": "KEY_CONTROL",
  "46": "KEY_DELETE",
  "40": "KEY_DOWN",
  "35": "KEY_END",
  "187": "KEY_EQUAL",
  "27": "KEY_ESC",
  "36": "KEY_HOME",
  "45": "KEY_INSERT",
  "37": "KEY_LEFT",
  "189": "KEY_MINUS",
  "34": "KEY_PAGEDOWN",
  "33": "KEY_PAGEUP",
  // "190": "KEY_PERIOD",
  "13": "KEY_RETURN",
  "39": "KEY_RIGHT",
  "16": "KEY_SHIFT",
  // "32": "KEY_SPACE",
  "9": "KEY_TAB",
  "38": "KEY_UP",
  "91": "KEY_WINDOW"
  //"107" : "NUMPAD_ADD",
  //"194" : "NUMPAD_COMMA",
  //"110" : "NUMPAD_DECIMAL",
  //"111" : "NUMPAD_DIVIDE",
  //"12" : "NUMPAD_EQUAL",
  //"106" : "NUMPAD_MULTIPLY",
  //"109" : "NUMPAD_SUBTRACT"
};
let tmpl = {
  "display"(columnKeys){
    return `
<a {{^tabIndex}}href="#ax6ui-select-{{id}}" {{/tabIndex}}{{#tabIndex}}tabindex="{{tabIndex}}" {{/tabIndex}}class="ax6ui-select-display {{theme}}" 
data-ax6ui-select-display="{{id}}" data-ax6ui-select-instance="{{instanceId}}" style="height: {{height}}px;">
    <div class="ax6ui-select-display-table" data-els="display-table">
        <div data-ax6ui-select-display="label">{{label}}</div>
        <div data-ax6ui-select-display="addon"> 
            {{#multiple}}{{#reset}}
            <span class="addon-icon-reset" data-selected-clear="true">{{{.}}}</span>
            {{/reset}}{{/multiple}}
            {{#icons}}
            <span class="addon-icon-closed">{{clesed}}</span>
            <span class="addon-icon-opened">{{opened}}</span>
            {{/icons}}
            {{^icons}}
            <span class="addon-icon-closed"><span class="addon-icon-arrow"></span></span>
            <span class="addon-icon-opened"><span class="addon-icon-arrow"></span></span>
            {{/icons}}
        </div>
    </div>
    <input type="text" tabindex="-1" data-ax6ui-select-display="input" 
    style="position:absolute;z-index:0;left:0px;top:0px;font-size:1px;opacity: 0;width:1px;height:1px;border: 0 none;color : transparent;text-indent: -9999em;" />
</a>
`;
  },
  "select"(columnKeys){
    return `
<select tabindex="-1" class="" name="{{name}}" {{#multiple}}multiple="multiple"{{/multiple}} style="height: {{height}}px;"></select>
`;
  },
  "optionGroup"(columnKeys){
    return `
<div class="ax6ui-select-option-group {{theme}}" data-ax6ui-select-option-group="{{id}}">
    <div class="ax-select-body">
        <div class="ax-select-option-group-content" data-els="content"></div>
    </div>
    <div class="ax-select-arrow"></div> 
</div>
`;
  },
  "options"(columnKeys){
    return `
{{#waitOptions}}
    <div class="ax-select-option-item">
            <div class="ax-select-option-item-holder">
                <span class="ax-select-option-item-cell ax-select-option-item-label">
                    {{{lang.loading}}}
                </span>
            </div>
        </div>
{{/waitOptions}}
{{^waitOptions}}
    {{#options}}
        {{#optgroup}}
            <div class="ax-select-option-group">
                <div class="ax-select-option-item-holder">
                    <span class="ax-select-option-group-label">
                        {{{.}}}
                    </span>
                </div>
                {{#options}}
                <div class="ax-select-option-item" data-option-focus-index="{{@findex}}" data-option-group-index="{{@gindex}}" data-option-index="{{@index}}" 
                data-option-value="{{${columnKeys.optionValue}}}" 
                {{#${columnKeys.optionSelected}}}data-option-selected="true"{{/${columnKeys.optionSelected}}}>
                    <div class="ax-select-option-item-holder">
                        {{#multiple}}
                        <span class="ax-select-option-item-cell ax-select-option-item-checkbox">
                            <span class="item-checkbox-wrap useCheckBox" data-option-checkbox-index="{{@i}}"></span>
                        </span>
                        {{/multiple}}
                        <span class="ax-select-option-item-cell ax-select-option-item-label">{{{${columnKeys.optionText}}}}</span>
                    </div>
                </div>
                {{/options}}
            </div>                            
        {{/optgroup}}
        {{^optgroup}}
        <div class="ax-select-option-item" data-option-focus-index="{{@findex}}" data-option-index="{{@index}}" data-option-value="{{${columnKeys.optionValue}}}" {{#${columnKeys.optionSelected}}}data-option-selected="true"{{/${columnKeys.optionSelected}}}>
            <div class="ax-select-option-item-holder">
                {{#multiple}}
                <span class="ax-select-option-item-cell ax-select-option-item-checkbox">
                    <span class="item-checkbox-wrap useCheckBox" data-option-checkbox-index="{{@i}}"></span>
                </span>
                {{/multiple}}
                <span class="ax-select-option-item-cell ax-select-option-item-label">{{{${columnKeys.optionText}}}}</span>
            </div>
        </div>
        {{/optgroup}}
    {{/options}}
    {{^options}}
        <div class="ax-select-option-item">
            <div class="ax-select-option-item-holder">
                <span class="ax-select-option-item-cell ax-select-option-item-label">
                    {{{lang.noOptions}}}
                </span>
            </div>
        </div>
    {{/options}}
{{/waitOptions}}
`;
  },
};

const $window = jQuery(window);
const onStateChanged = function (item, that) {
  if (item && item.onStateChanged) {
    item.onStateChanged.call(that, that);
  }
  else if (this.onStateChanged) {
    this.onStateChanged.call(that, that);
  }

  if (that.state == "changeValue") {
    if (item && item.onChange) {
      item.onChange.call(that, that);
    }
    else if (this.onChange) {
      this.onChange.call(that, that);
    }
  }

  item = null;
  that = null;
  return true;
};
const alignSelectDisplay = function () {
  let i = this.queue.length, w;
  while (i--) {
    if (this.queue[i].$display) {
      w = Math.max(this.queue[i].$select.outerWidth(), U.number(this.queue[i].minWidth));
      this.queue[i].$display.css({
        "min-width": w
      });
      if (this.queue[i].reset) {
        this.queue[i].$display.find(".addon-icon-reset").css({
          "line-height": this.queue[i].$display.height() + "px"
        });
      }
    }
  }

  i = null;
  w = null;
  return this;
};
const alignSelectOptionGroup = function (append) {
  if (!this.activeSelectOptionGroup) return this;

  let item = this.queue[this.activeSelectQueueIndex],
    pos = {}, positionMargin = 0,
    dim = {}, pickerDim = {},
    pickerDirection;

  if (append) jQuery(document.body).append(this.activeSelectOptionGroup);

  pos = item.$target.offset();
  dim = {
    width: item.$target.outerWidth(),
    height: item.$target.outerHeight()
  };
  pickerDim = {
    winWidth: Math.max($window.width(), jQuery(document.body).width()),
    winHeight: Math.max($window.height(), jQuery(document.body).height()),
    width: this.activeSelectOptionGroup.outerWidth(),
    height: this.activeSelectOptionGroup.outerHeight()
  };

  // picker css(width, left, top) & direction 결정
  if (!item.direction || item.direction === "" || item.direction === "auto") {
    // set direction
    pickerDirection = "top";

    if (pos.top - pickerDim.height - positionMargin < 0) {
      pickerDirection = "top";
    } else if (pos.top + dim.height + pickerDim.height + positionMargin > pickerDim.winHeight) {
      pickerDirection = "bottom";
    }
  } else {
    pickerDirection = item.direction;
  }
  // todo : 표현할 공간이 없다면..
  if (append) {
    this.activeSelectOptionGroup
      .addClass("direction-" + pickerDirection);
  }
  this.activeSelectOptionGroup
    .css((function () {
      if (pickerDirection == "top") {
        if (pos.top + dim.height + pickerDim.height + positionMargin > pickerDim.winHeight) {

          var newTop = pos.top + dim.height / 2 - pickerDim.height / 2;
          if (newTop + pickerDim.height + positionMargin > pickerDim.winHeight) {
            newTop = 0;
          }
          if (newTop < 0) {
            newTop = 0;
          }

          return {
            left: pos.left,
            top: newTop,
            width: dim.width
          }
        }
        return {
          left: pos.left,
          top: pos.top + dim.height + 1,
          width: dim.width
        }
      }
      else if (pickerDirection == "bottom") {
        return {
          left: pos.left,
          top: pos.top - pickerDim.height - 1,
          width: dim.width
        }
      }
    }).call(this));
};
const onBodyClick = function (e, target) {
  if (!this.activeSelectOptionGroup) return this;

  let item = this.queue[this.activeSelectQueueIndex],
    clickEl = "display";

  target = U.findParentNode(e.target, function (target) {
    if (target.getAttribute("data-option-value") || target.getAttribute("data-option-value") == "") {
      clickEl = "optionItem";
      return true;
    }
    else if (item.$target.get(0) == target) {
      clickEl = "display";
      return true;
    }
  });

  if (!target) {
    this.close();
    return this;
  }
  else if (clickEl === "optionItem") {
    this.val(item.id, {
      index: {
        gindex: target.getAttribute("data-option-group-index"),
        index: target.getAttribute("data-option-index")
      }
    }, undefined, "internal");
    item.$select.trigger("change");
    item.$display.trigger("focus");
    if (!item.multiple) this.close();
  }
  else {
    //open and display click
    //console.log(this.instanceId);
  }

  return this;
};
const onBodyKeyup = function (e) {
  if (e.keyCode == info.eventKeys.ESC) {
    this.close();
  }
  else if (e.which == info.eventKeys.RETURN) {
    if (this.queue[this.activeSelectQueueIndex].optionFocusIndex > -1) { // 아이템에 포커스가 활성화 된 후, 마우스 이벤트 이면 무시
      let $option = this.activeSelectOptionGroup.find('[data-option-focus-index="' + this.queue[this.activeSelectQueueIndex].optionFocusIndex + '"]');
      this.val(this.queue[this.activeSelectQueueIndex].id, {
        index: {
          gindex: $option.attr("data-option-group-index"),
          index: $option.attr("data-option-index")
        }
      }, undefined, "internal");
      this.queue[this.activeSelectQueueIndex].$select.trigger("change");
      if (!this.queue[this.activeSelectQueueIndex].multiple) this.close();
    } else {
      this.close();
    }
  }
};
const getLabel = function (queIdx) {
  let item = this.queue[queIdx],
    labels = [];

  if (U.isArray(item.selected) && item.selected.length > 0) {
    item.selected.forEach(function (n) {
      if (n.selected) labels.push(n[item.columnKeys.optionText]);
    });
  }
  else {
    if (!item.multiple && item.options && item.options[0]) {
      if (item.options[0].optgroup) {
        labels[0] = item.options[0].options[0][item.columnKeys.optionText];
      }
      else {
        labels[0] = item.options[0][item.columnKeys.optionText];
      }
    }
    else {
      labels[0] = item.lang.noSelected;
    }
  }

  return (function () {
    if (item.multiple && labels.length > 1) {
      let data = {
        label: labels[0],
        length: labels.length - 1
      };
      return mustache.render(item.lang.multipleLabel, data);
    }
    else {
      return labels[0];
    }
  })();
};
const syncLabel = function (queIdx) {
  this.queue[queIdx].$displayLabel
    .html(getLabel.call(this, queIdx));
};
const focusWord = function (queIdx, searchWord) {
  let options = [], i = -1, l = this.queue[queIdx].indexedOptions.length - 1, n;
  if (searchWord) {
    while (l - i++) {
      n = this.queue[queIdx].indexedOptions[i];
      if (('' + n.value).toLowerCase() == searchWord.toLowerCase()) {
        options = [{'@findex': n['@findex'], optionsSort: 0}];
        break;
      } else {
        let sort = ('' + n.value).toLowerCase().search(searchWord.toLowerCase());
        if (sort > -1) {
          options.push({'@findex': n['@findex'], optionsSort: sort});
          if (options.length > 2) break;
        }
        sort = null;
      }
    }
    options.sort(function (a, b) {
      return a.optionsSort - b.optionsSort;
    });
  }
  if (options && options.length > 0) {
    focusMove.call(this, queIdx, undefined, options[0]['@findex']);
  }

  try {
    return options;
  }
  finally {
    options = null;
    i = null;
    l = null;
    n = null;
  }
};
const focusMove = function (queIdx, direction, findex) {
  let _focusIndex,
    _prevFocusIndex,
    focusOptionEl,
    optionGroupScrollContainer;

  if (this.activeSelectOptionGroup && this.queue[queIdx].options && this.queue[queIdx].options.length > 0) {

    if (typeof findex !== "undefined") {
      _focusIndex = findex
    }
    else {
      _prevFocusIndex = (this.queue[queIdx].optionFocusIndex == -1) ? this.queue[queIdx].optionSelectedIndex || -1 : this.queue[queIdx].optionFocusIndex;
      if (_prevFocusIndex == -1) {
        _focusIndex = (direction > 0) ? 0 : this.queue[queIdx].optionItemLength - 1;
      }
      else {
        _focusIndex = _prevFocusIndex + direction;
        if (_focusIndex < 0) _focusIndex = 0;
        else if (_focusIndex > this.queue[queIdx].optionItemLength - 1) _focusIndex = this.queue[queIdx].optionItemLength - 1;
      }
    }

    this.queue[queIdx].optionFocusIndex = _focusIndex;

    this.activeSelectOptionGroup
      .find('[data-option-focus-index]')
      .removeClass("hover");

    focusOptionEl = this.activeSelectOptionGroup
      .find('[data-option-focus-index="' + _focusIndex + '"]')
      .addClass("hover");

    optionGroupScrollContainer = this.activeSelectOptionGroup.find('[data-els="content"]');

    let focusOptionElHeight = focusOptionEl.outerHeight(),
      optionGroupScrollContainerHeight = optionGroupScrollContainer.innerHeight(),
      optionGroupScrollContainerScrollTop = optionGroupScrollContainer.scrollTop(),
      focusOptionElTop = focusOptionEl.position().top + optionGroupScrollContainer.scrollTop();

    if (optionGroupScrollContainerHeight + optionGroupScrollContainerScrollTop < focusOptionElTop + focusOptionElHeight) {
      optionGroupScrollContainer.scrollTop(focusOptionElTop + focusOptionElHeight - optionGroupScrollContainerHeight);
    }
    else if (optionGroupScrollContainerScrollTop > focusOptionElTop) {
      optionGroupScrollContainer.scrollTop(focusOptionElTop);
    }
    // optionGroup scroll check
  }
};
const bindSelectTarget = function (queIdx) {
  const selectEvent = {
    'click': function (queIdx, e) {
      let target = U.findParentNode(e.target, function (target) {
        if (target.getAttribute("data-selected-clear")) {
          //clickEl = "clear";
          return true;
        }
      });

      if (target) {
        this.val(queIdx, {clear: true});
      }
      else {
        if (this.activeSelectQueueIndex == queIdx) {
          if (this.queue[queIdx].optionFocusIndex == -1) { // 아이템에 포커스가 활성화 된 후, 마우스 이벤트 이면 무시
            this.close();
          }
        }
        else {
          this.open(queIdx);
          U.stopEvent(e);
        }
      }
    },
    'keyUp': function (queIdx, e) {
      if (e.which == info.eventKeys.SPACE) {
        selectEvent.click.call(this, queIdx, e);
      }
      else if (!ctrlKeys[e.which]) {
        // 사용자 입력이 뜸해지면 찾고 검색 값 제거...
        U.debounce(function (searchWord, queIdx) {
          focusWord.call(this, queIdx, searchWord);
          this.queue[queIdx].$displayInput.val('');
        }, 300).call(this, this.queue[queIdx].$displayInput.val(), queIdx);
      }
    },
    'keyDown': function (queIdx, e) {
      if (e.which == info.eventKeys.DOWN) {
        focusMove.call(this, queIdx, 1);
        U.stopEvent(e);
      }
      else if (e.which == info.eventKeys.UP) {
        focusMove.call(this, queIdx, -1);
        U.stopEvent(e);
      }
    },
    'blur': function (queIdx, e) {

    },
    'selectChange': function (queIdx, e) {
      this.val(queIdx, this.queue[queIdx].$select.val(), true);
    }
  };

  let item = this.queue[queIdx], data = {};

  // find selected
  item.selected = [];
  if (!item.options) item.options = [];
  item.options.forEach((n) => {
    if (n[this.config.columnKeys.optionSelected]) item.selected.push(jQuery.extend({}, n));
  });

  if (!item.$display) {
    /// 템플릿에 전달할 오브젝트 선언
    data.instanceId = this.instanceId;
    data.id = item.id;
    data.name = item.name;
    data.theme = item.theme;
    data.tabIndex = item.tabIndex;
    data.multiple = item.multiple;
    data.reset = item.reset;
    data.height = item.height;
    data.label = getLabel.call(this, queIdx);

    item.$display = jQuery(mustache.render(tmpl.display.call(this), data));
    //item.$display.css({height: item.height});
    item.$displayLabel = item.$display.find('[data-ax6ui-select-display="label"]');

    if (item.$target.find("select").get(0)) {
      item.$select = item.$target.find("select");
      // select 속성만 변경
      item.$select
        .attr("tabindex", "-1")
        .css({height: data.height});

      if (data.name) {
        item.$select.attr("name", "name");
      }
      if (data.multiple) {
        item.$select.attr("multiple", "multiple");
      }
    }
    else {
      item.$select = jQuery(mustache.render(tmpl.select.call(this), data));
      item.$target.append(item.$select);
      // select append
    }

    item.$target.append(item.$display);
    item.$displayInput = item.$display.find('[data-ax6ui-select-display="input"]'); // 사용자 입력값을 받기위한 숨음 입력필드
    item.options = syncSelectOptions.call(this, queIdx, item.options);

    alignSelectDisplay.call(this);

    item.$displayInput
      .off("blur.ax6ui-select")
      .on("blur.ax6ui-select", selectEvent.blur.bind(this, queIdx))
      .off('keyup.ax6ui-select')
      .on('keyup.ax6ui-select', selectEvent.keyUp.bind(this, queIdx))
      .off("keydown.ax6ui-select")
      .on("keydown.ax6ui-select", selectEvent.keyDown.bind(this, queIdx));
  }
  else {
    item.$displayLabel
      .html(getLabel.call(this, queIdx));
    item.options = syncSelectOptions.call(this, queIdx, item.options);

    alignSelectDisplay.call(this);
  }

  item.$display
    .off('click.ax6ui-select')
    .on('click.ax6ui-select', selectEvent.click.bind(this, queIdx))
    .off('keyup.ax6ui-select')
    .on('keyup.ax6ui-select', selectEvent.keyUp.bind(this, queIdx));

  // select 태그에 대한 change 이벤트 감시
  item.$select
    .off('change.ax6ui-select')
    .on('change.ax6ui-select', selectEvent.selectChange.bind(this, queIdx));

  data = null;
  item = null;
  queIdx = null;
  return this;
};
const syncSelectOptions = function (queIdx, options) {
  const setSelected = function (queIdx, O) {
    if (!O) {
      this.queue[queIdx].selected = [];
    }
    else {
      if (this.queue[queIdx].multiple) this.queue[queIdx].selected.push(jQuery.extend({}, O));
      else this.queue[queIdx].selected[0] = jQuery.extend({}, O);
    }
  };

  let item = this.queue[queIdx],
    po, elementOptions, newOptions, focusIndex = 0;

  setSelected.call(this, queIdx, false); // item.selected 초기화

  if (options) {
    item.options = options;
    item.indexedOptions = [];

    // select options 태그 생성
    po = [];
    item.options.forEach((O, OIndex) => {
      if (O.optgroup) {

        O['@gindex'] = OIndex;
        O.options.forEach((OO, OOIndex) => {
          OO['@index'] = OOIndex;
          OO['@findex'] = focusIndex;
          po.push('<option value="' + OO[item.columnKeys.optionValue] + '" '
            + (OO[item.columnKeys.optionSelected] ? ' selected="selected"' : '') + '>'
            + OO[item.columnKeys.optionText] + '</option>');
          if (OO[item.columnKeys.optionSelected]) {
            setSelected.call(this, queIdx, OO);
          }

          item.indexedOptions.push({
            '@findex': focusIndex, value: OO[item.columnKeys.optionValue], text: OO[item.columnKeys.optionText]
          });
          focusIndex++;
        });
      }
      else {
        O['@index'] = OIndex;
        O['@findex'] = focusIndex;
        po.push('<option value="' + O[item.columnKeys.optionValue] + '" '
          + (O[item.columnKeys.optionSelected] ? ' selected="selected"' : '') + '>'
          + O[item.columnKeys.optionText] + '</option>');
        if (O[item.columnKeys.optionSelected]) {
          setSelected.call(this, queIdx, O);
        }

        item.indexedOptions.push({
          '@findex': focusIndex, value: O[item.columnKeys.optionValue], text: O[item.columnKeys.optionText]
        });
        focusIndex++;
      }
    });
    item.optionItemLength = focusIndex;
    item.$select.html(po.join(''));
  }
  else {
    /// select > options 태그로 스크립트 options를 만들어주는 역할
    elementOptions = U.toArray(item.$select.get(0).options);
    // select option 스크립트 생성
    newOptions = [];
    elementOptions.forEach((O, OIndex) => {
      let option = {};

      option[item.columnKeys.optionValue] = O.value;
      option[item.columnKeys.optionText] = O.text;
      option[item.columnKeys.optionSelected] = O.selected;
      option['@index'] = OIndex;
      option['@findex'] = OIndex;
      if (O.selected) setSelected.call(this, queIdx, option);
      newOptions.push(option);

      option = null;
    });
    item.options = newOptions;
    item.indexedOptions = newOptions;
  }

  if (!item.multiple && item.selected.length == 0 && item.options && item.options[0]) {
    if (item.options[0].optgroup) {
      item.options[0].options[0][item.columnKeys.optionSelected] = true;
      item.selected.push(jQuery.extend({}, item.options[0].options[0]));
    }
    else {
      item.options[0][item.columnKeys.optionSelected] = true;
      item.selected.push(jQuery.extend({}, item.options[0]));
    }
  }

  po = null;
  elementOptions = null;
  newOptions = null;
  return item.options;
};
const getQueIdx = function (boundID) {
  if (!U.isString(boundID)) {
    boundID = jQuery(boundID).data("data-ax6ui-select-id");
  }
  if (!U.isString(boundID)) {
    console.log(info.getError("ax6ui-select", "402", "getQueIdx"));
    return;
  }
  return U.search(this.queue, function () {
    return this.id == boundID;
  });
};
/* ~~~~~~~~~~~~~~~~~~ end of private  ~~~~~~~~~~~~~~~~~~~~ */

/**
 * @class
 */
class AX6UISelect extends AX6UICore {
  /**
   * @constructor
   * @param config
   */
  constructor(config) {
    super();

    /**
     * @member {JSON}
     * @param config
     * @param [config.theme='default']
     * @param [config.animateTime=100]
     * @param [config.height=34]
     * @param [config.lang] - 메세지들
     * @param [config.lang.noSelected='']
     * @param [config.lang.noOptions='no options']
     * @param [config.lang.loading='now loading..']
     * @param [config.lang.multipleLabel='"{{label}}"외 {{length}}건']
     * @param [config.columnKeys] - 내부에서 사용 JSON key 정의
     * @param [config.columnKeys.optionValue='value']
     * @param [config.columnKeys.optionText='text']
     * @param [config.columnKeys.optionSelected='selected']
     */
    this.config = {
      theme: 'default',
      animateTime: 100,
      height: 34,
      lang: {
        noSelected: '',
        noOptions: 'no options',
        loading: 'now loading..',
        multipleLabel: '"{{label}}"외 {{length}}건'
      },
      columnKeys: {
        optionValue: 'value',
        optionText: 'text',
        optionSelected: 'selected'
      }
    };
    jQuery.extend(true, this.config, config);

    // 멤버 변수 초기화
    /**
     * bind를 통해 연결된 select가 저장되는 변수
     * @member {Array}
     */
    this.queue = [];
    /**
     * @member {Object}
     */
    this.activeSelectOptionGroup = null;
    /**
     * @member {Number}
     */
    this.activeSelectQueueIndex = -1;
    /**
     * @member {Object}
     */
    this.openTimer = null;
    /**
     * @member {Object}
     */
    this.closeTimer = null;
    /**
     * @member {Function}
     */
    this.waitOptionsCallback = null;
    /**
     * @member {Object}
     */
    this.keyUpTimer = null;
    /**
     * @member {Object}
     */
    this.xvar = {};

    this.init();
  }

  /**
   * @method
   * @param config
   */
  init() {
    this.onStateChanged = this.config.onStateChanged;
    delete this.config.onStateChanged;
    this.onChange = this.config.onChange;
    delete this.config.onChange;

    // init 호출 여부
    this.initOnce();
  }

  /**
   * @method
   */
  initOnce() {
    if (this.initialized) return this;
    this.initialized = true;

    // throttledResize
    $window.on("resize.ax6ui-select-display-" + this.instanceId, U.throttle(function (e) {
      alignSelectDisplay.call(this, e || window.event);
      alignSelectOptionGroup.call(this);
    }, 100).bind(this));
  }

  /**
   * @method
   * @param item
   * @return {AX6UISelect}
   */
  bind(item) {
    let queIdx;
    item = jQuery.extend(true, {}, this.config, item);

    if (!item.target) {
      console.log(info.getError("ax6ui-select", "401", "bind"));
      return this;
    }
    item.$target = jQuery(item.target);

    if (!item.id) item.id = item.$target.data("data-ax6ui-select-id");
    if (!item.id) {
      item.id = 'ax6ui-select-' + AX6UICore.getInstanceId();
      item.$target.data("data-ax6ui-select-id", item.id);
    }
    item.name = item.$target.attr("data-ax6ui-select");

    if (item.options) {
      item.options = JSON.parse(JSON.stringify(item.options));
    }

    // target attribute data
    (function (data) {
      if (U.isObject(data) && !data.error) {
        item = jQuery.extend(true, item, data);
      }
    })(U.parseJson(item.$target.attr("data-ax6ui-select-config"), true));

    queIdx = U.search(this.queue, function () {
      return this.id == item.id;
    });

    if (queIdx === -1) {
      this.queue.push(item);
      bindSelectTarget.call(this, this.queue.length - 1);
    }
    else {
      this.queue[queIdx].selected = [];
      this.queue[queIdx].options = item.options;
      this.queue[queIdx] = jQuery.extend(true, {}, this.queue[queIdx], item);
      bindSelectTarget.call(this, queIdx);
    }

    queIdx = null;
    return this;
  };

  /**
   * @method
   * @param boundID
   * @param tryCount
   * @return {AX6UISelect}
   */
  open(boundID, tryCount) {
    const onExpand = function (item) {
      item.onExpand.call({
        self: this,
        item: item
      }, O => {
        if (this.waitOptionsCallback) {
          let data = {};
          let item = this.queue[this.activeSelectQueueIndex];

          /// 현재 selected 검증후 처리
          (function (item, O) {
            let optionsMap = {};
            O.options.forEach((_O, _OIndex) => {
              _O["@index"] = _OIndex;
              optionsMap[_O[item.columnKeys.optionValue]] = _O;
            });
            if (U.isArray(item.selected)) {
              item.selected.forEach((_O) => {
                if (optionsMap[_O[item.columnKeys.optionValue]]) {
                  O.options[optionsMap[_O[item.columnKeys.optionValue]]["@index"]][item.columnKeys.optionSelected] = true;
                }
              });
            }
          })(item, O);


          item.$displayLabel
            .html(getLabel.call(this, this.activeSelectQueueIndex));
          item.options = syncSelectOptions.call(this, this.activeSelectQueueIndex, O.options);

          alignSelectDisplay.call(this);

          /// 템플릿에 전달할 오브젝트 선언
          data.id = item.id;
          data.theme = item.theme;
          data.multiple = item.multiple;
          data.lang = item.lang;
          data.options = item.options;
          this.activeSelectOptionGroup.find('[data-els="content"]').html(mustache.render(tmpl.options.call(this, item.columnKeys), data));
        }
      });
    };
    this.waitOptionsCallback = null;

    /**
     * open select from the outside
     */
    let queIdx = (U.isNumber(boundID)) ? boundID : getQueIdx.call(this, boundID),
      item = this.queue[queIdx],
      data = {}, focusTop, selectedOptionEl;

    if (item.$display.attr("disabled")) return this;

    if (this.openTimer) clearTimeout(this.openTimer);
    if (this.activeSelectOptionGroup) {
      if (this.activeSelectQueueIndex == queIdx) {
        return this;
      }

      if (tryCount > 2) return this;
      this.close();
      this.openTimer = setTimeout((function () {
        this.open(queIdx, (tryCount || 0) + 1);
      }).bind(this), this.config.animateTime);

      return this;
    }

    item.optionFocusIndex = -1; // optionGroup이 열리면 포커스 인덱스 초기화 -1로
    if (item.selected && item.selected.length > 0) {
      item.optionSelectedIndex = item.selected[0]["@findex"];
    }

    /// 템플릿에 전달할 오브젝트 선언
    data.id = item.id;
    data.theme = item.theme;
    data.multiple = item.multiple;

    data.lang = item.lang;
    item.$display.attr("data-select-option-group-opened", "true");

    if (item.onExpand) {
      // onExpand 인 경우 UI 대기모드 추가
      data.waitOptions = true;
    }

    data.options = item.options;
    this.activeSelectOptionGroup = jQuery(mustache.render(tmpl.optionGroup.call(this), data));
    this.activeSelectOptionGroup.find('[data-els="content"]').html(mustache.render(tmpl.options.call(this, item.columnKeys), data));
    this.activeSelectQueueIndex = queIdx;

    alignSelectOptionGroup.call(this, "append"); // alignSelectOptionGroup 에서 body append

    /// 사용자 입력으로 옵션을 검색하기 위한 시나리오
    // 옵션그룹이 활성화 되면 사용자 입력을 받기위한 input 값 초기화 및 포커스 다른 select가 닫히면서 display focus 이벤트와 충돌하는 문제가 있으므로
    // 1밀리세컨 지연후 포커스 처리. input에 포커스가 되므로 input value로 options를 검색 할 수 있게 됩니다.
    item.$displayInput.val('');

    setTimeout(() => {

      if (item.selected && item.selected.length > 0) {
        selectedOptionEl = this.activeSelectOptionGroup.find('[data-option-index="' + item.selected[0]["@index"] + '"]');
        if (selectedOptionEl.get(0)) {
          focusTop = selectedOptionEl.position().top - this.activeSelectOptionGroup.height() / 3;
          this.activeSelectOptionGroup.find('[data-els="content"]').scrollTop(focusTop);
        }
      }

      item.$displayInput.trigger("focus");

      jQuery(window).on("keyup.ax6ui-select-" + this.instanceId, (function (e) {
        e = e || window.event;
        onBodyKeyup.call(this, e);
        U.stopEvent(e);
      }).bind(this));

      jQuery(window).on("click.ax6ui-select-" + this.instanceId, (function (e) {
        e = e || window.event;
        onBodyClick.call(this, e);
        U.stopEvent(e);
      }).bind(this));

    }, this.config.animateTime);

    onStateChanged.call(this, item, {
      self: this,
      state: "open",
      item: item
    });

    // waitOption timer
    if (item.onExpand) {
      this.waitOptionsCallback = true;
      onExpand.call(this, item);
    }

    data = null;
    focusTop = null;
    selectedOptionEl = null;
    return this;
  }

  /**
   * @method
   * @param _item
   * @return {AX6UISelect}
   */
  update(_item) {
    this.bind(_item);
    return this;
  };

  /**
   * @method
   * @param boundID
   * @param options
   * @return {AX6UISelect}
   */
  setOptions(boundID, options) {
    let queIdx = getQueIdx.call(this, boundID);
    this.queue[queIdx].selected = [];
    this.queue[queIdx].options = options;
    bindSelectTarget.call(this, queIdx);
    return this;
  }

  /**
   * @method
   * @param boundID
   * @param value
   * @param selected
   * @param internal
   * @return {*}
   */
  val(boundID, value, selected, internal) {
    const getSelected = function (_item, o, selected) {
        if (typeof selected === "undefined") {
          return (_item.multiple) ? !o : true;
        } else {
          return selected;
        }
      },
      clearSelected = function (queIdx) {
        this.queue[queIdx].options.forEach(n => {
          if (n.optgroup) {
            n.options.forEach(nn => {
              nn.selected = false;
            });
          }
          else {
            n.selected = false;
          }
        });
      },
      processor = {
        'index': function (queIdx, value, selected) {
          // 클래스 내부에서 호출된 형태, 그런 이유로 옵션그룹에 대한 상태를 변경 하고 있다.
          let item = this.queue[queIdx];

          if (U.isString(value.index.gindex)) {
            item.options[value.index.gindex].options[value.index.index][item.columnKeys.optionSelected] = getSelected(item, item.options[value.index.gindex].options[value.index.index][item.columnKeys.optionSelected], selected);
            this.activeSelectOptionGroup
              .find('[data-option-group-index="' + value.index.gindex + '"][data-option-index="' + value.index.index + '"]')
              .attr("data-option-selected", item.options[value.index.gindex].options[value.index.index][item.columnKeys.optionSelected].toString());
          }
          else {
            item.options[value.index.index][item.columnKeys.optionSelected] = getSelected(item, item.options[value.index.index][item.columnKeys.optionSelected], selected);
            this.activeSelectOptionGroup
              .find('[data-option-index="' + value.index.index + '"]')
              .attr("data-option-selected", item.options[value.index.index][item.columnKeys.optionSelected].toString());

          }

          syncSelectOptions.call(this, queIdx, item.options);
          syncLabel.call(this, queIdx);
          alignSelectOptionGroup.call(this);
        },
        'arr': function (queIdx, values, selected) {
          values.forEach(value => {
            if (U.isString(value) || U.isNumber(value)) {
              processor.value.call(this, queIdx, value, selected);
            }
            else {
              for (let key in processor) {
                if (value[key]) {
                  processor[key].call(this, queIdx, value, selected);
                  break;
                }
              }
            }
          });
        },
        'value': function (queIdx, value, selected) {
          let item = this.queue[queIdx],
            optionIndex = U.search(item.options, function () {
              return this[item.columnKeys.optionValue] == value;
            });
          if (optionIndex > -1) {
            item.options[optionIndex][item.columnKeys.optionSelected] = getSelected(item, item.options[optionIndex][item.columnKeys.optionSelected], selected);
          }
          else {
            console.log(info.getError("ax6ui-select", "501", "val"));
            return;
          }

          syncSelectOptions.call(this, queIdx, item.options);
          syncLabel.call(this, queIdx);
        },
        'text': function (queIdx, value, selected) {
          let item = this.queue[queIdx],
            optionIndex = U.search(item.options, function () {
              return this[item.columnKeys.optionText] == value;
            });
          if (optionIndex > -1) {
            item.options[optionIndex][item.columnKeys.optionSelected] = getSelected(item, item.options[optionIndex][item.columnKeys.optionSelected], selected);
          }
          else {
            console.log(info.getError("ax6ui-select", "501", "val"));
            return;
          }

          syncSelectOptions.call(this, queIdx, item.options);
          syncLabel.call(this, queIdx);
        },
        'clear': function (queIdx) {
          clearSelected.call(this, queIdx);
          syncSelectOptions.call(this, queIdx, this.queue[queIdx].options);
          syncLabel.call(this, queIdx);

          if (this.activeSelectOptionGroup) {
            this.activeSelectOptionGroup
              .find('[data-option-index]')
              .attr("data-option-selected", "false");
          }
        }
      };

    let queIdx = (U.isNumber(boundID)) ? boundID : getQueIdx.call(this, boundID);
    if (!this.queue[queIdx]) {
      return this;
    }
    if (typeof value !== "undefined" && !this.queue[queIdx].multiple) {
      clearSelected.call(this, queIdx);
    }

    if (typeof value == "undefined") {
      return this.queue[queIdx].selected;
    }
    else if (U.isArray(value)) {
      processor.arr.call(this, queIdx, value, selected);
    }
    else if (U.isString(value) || U.isNumber(value)) {
      processor.value.call(this, queIdx, value, selected);
    }
    else {
      if (value === null) {
        processor.clear.call(this, queIdx);
      }
      else {
        for (var key in processor) {
          if (value[key]) {
            processor[key].call(this, queIdx, value, selected);
            break;
          }
        }
      }
    }

    if (typeof value !== "undefined") {
      onStateChanged.call(this, this.queue[queIdx], {
        self: this,
        item: this.queue[queIdx],
        state: (internal) ? "changeValue" : "setValue",
        value: this.queue[queIdx].selected,
        internal: internal
      });
    }

    boundID = null;
    return this;
  }

  /**
   * @method
   * @param item
   * @return {AX6UISelect}
   */
  close(item) {
    if (this.closeTimer) clearTimeout(this.closeTimer);
    if (!this.activeSelectOptionGroup) return this;

    item = this.queue[this.activeSelectQueueIndex];
    item.optionFocusIndex = -1;

    item.$displayInput.val('').trigger("blur");
    item.$display.removeAttr("data-select-option-group-opened").trigger("focus");

    this.activeSelectOptionGroup.addClass("destroy");

    jQuery(window)
      .off("resize.ax6ui-select-" + this.instanceId)
      .off("click.ax6ui-select-" + this.instanceId)
      .off("keyup.ax6ui-select-" + this.instanceId);

    this.closeTimer = setTimeout(() => {
      if (this.activeSelectOptionGroup) this.activeSelectOptionGroup.remove();
      this.activeSelectOptionGroup = null;
      this.activeSelectQueueIndex = -1;

      let that = {
        self: this,
        item: item,
        value: item.selected,
        state: "close"
      };

      onStateChanged.call(this, item, that);

      // waitOption timer
      if (item.onClose) {
        item.onClose.call(that);
      }

    }, this.config.animateTime);
    this.waitOptionsCallback = null;
    return this;
  };

  /**
   * @method
   * @param boundID
   * @return {AX6UISelect}
   */
  enable(boundID) {
    let queIdx = getQueIdx.call(this, boundID);
    this.queue[queIdx].$display.removeAttr("disabled");
    this.queue[queIdx].$select.removeAttr("disabled");

    onStateChanged.call(this, this.queue[queIdx], {
      self: this,
      state: "enable"
    });

    return this;
  };

  /**
   * @method
   * @param boundID
   * @return {AX6UISelect}
   */
  disable(boundID) {
    let queIdx = getQueIdx.call(this, boundID);
    this.queue[queIdx].$display.attr("disabled", "disabled");
    this.queue[queIdx].$select.attr("disabled", "disabled");

    onStateChanged.call(this, this.queue[queIdx], {
      self: this,
      state: "disable"
    });

    return this;
  };

}

export default AX6UISelect;