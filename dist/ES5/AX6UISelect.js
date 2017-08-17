"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jqmin = require("jqmin");

var _jqmin2 = _interopRequireDefault(_jqmin);

var _AX6UICore2 = require("./AX6UICore.js");

var _AX6UICore3 = _interopRequireDefault(_AX6UICore2);

var _AX6Info = require("./AX6Info");

var _AX6Info2 = _interopRequireDefault(_AX6Info);

var _AX6Util = require("./AX6Util");

var _AX6Util2 = _interopRequireDefault(_AX6Util);

var _AX6Mustache = require("./AX6Mustache");

var _AX6Mustache2 = _interopRequireDefault(_AX6Mustache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* ~~~~~~~~~~~~~~~~~~ end of import  ~~~~~~~~~~~~~~~~~~~~ */

var ctrlKeys = {
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
var tmpl = {
  "display": function display(columnKeys) {
    return "\n<a {{^tabIndex}}href=\"#ax6ui-select-{{id}}\" {{/tabIndex}}{{#tabIndex}}tabindex=\"{{tabIndex}}\" {{/tabIndex}}class=\"ax6ui-select-display {{theme}}\" \ndata-ax6ui-select-display=\"{{id}}\" data-ax6ui-select-instance=\"{{instanceId}}\" style=\"height: {{height}}px;\">\n    <div class=\"ax6ui-select-display-table\" data-els=\"display-table\">\n        <div data-ax6ui-select-display=\"label\">{{label}}</div>\n        <div data-ax6ui-select-display=\"addon\"> \n            {{#multiple}}{{#reset}}\n            <span class=\"addon-icon-reset\" data-selected-clear=\"true\">{{{.}}}</span>\n            {{/reset}}{{/multiple}}\n            {{#icons}}\n            <span class=\"addon-icon-closed\">{{clesed}}</span>\n            <span class=\"addon-icon-opened\">{{opened}}</span>\n            {{/icons}}\n            {{^icons}}\n            <span class=\"addon-icon-closed\"><span class=\"addon-icon-arrow\"></span></span>\n            <span class=\"addon-icon-opened\"><span class=\"addon-icon-arrow\"></span></span>\n            {{/icons}}\n        </div>\n    </div>\n    <input type=\"text\" tabindex=\"-1\" data-ax6ui-select-display=\"input\" \n    style=\"position:absolute;z-index:0;left:0px;top:0px;font-size:1px;opacity: 0;width:1px;height:1px;border: 0 none;color : transparent;text-indent: -9999em;\" />\n</a>\n";
  },
  "select": function select(columnKeys) {
    return "\n<select tabindex=\"-1\" class=\"\" name=\"{{name}}\" {{#multiple}}multiple=\"multiple\"{{/multiple}} style=\"height: {{height}}px;\"></select>\n";
  },
  "optionGroup": function optionGroup(columnKeys) {
    return "\n<div class=\"ax6ui-select-option-group {{theme}}\" data-ax6ui-select-option-group=\"{{id}}\">\n    <div class=\"ax-select-body\">\n        <div class=\"ax-select-option-group-content\" data-els=\"content\"></div>\n    </div>\n    <div class=\"ax-select-arrow\"></div> \n</div>\n";
  },
  "options": function options(columnKeys) {
    return "\n{{#waitOptions}}\n    <div class=\"ax-select-option-item\">\n            <div class=\"ax-select-option-item-holder\">\n                <span class=\"ax-select-option-item-cell ax-select-option-item-label\">\n                    {{{lang.loading}}}\n                </span>\n            </div>\n        </div>\n{{/waitOptions}}\n{{^waitOptions}}\n    {{#options}}\n        {{#optgroup}}\n            <div class=\"ax-select-option-group\">\n                <div class=\"ax-select-option-item-holder\">\n                    <span class=\"ax-select-option-group-label\">\n                        {{{.}}}\n                    </span>\n                </div>\n                {{#options}}\n                <div class=\"ax-select-option-item\" data-option-focus-index=\"{{@findex}}\" data-option-group-index=\"{{@gindex}}\" data-option-index=\"{{@index}}\" \n                data-option-value=\"{{" + columnKeys.optionValue + "}}\" \n                {{#" + columnKeys.optionSelected + "}}data-option-selected=\"true\"{{/" + columnKeys.optionSelected + "}}>\n                    <div class=\"ax-select-option-item-holder\">\n                        {{#multiple}}\n                        <span class=\"ax-select-option-item-cell ax-select-option-item-checkbox\">\n                            <span class=\"item-checkbox-wrap useCheckBox\" data-option-checkbox-index=\"{{@i}}\"></span>\n                        </span>\n                        {{/multiple}}\n                        <span class=\"ax-select-option-item-cell ax-select-option-item-label\">{{{" + columnKeys.optionText + "}}}</span>\n                    </div>\n                </div>\n                {{/options}}\n            </div>                            \n        {{/optgroup}}\n        {{^optgroup}}\n        <div class=\"ax-select-option-item\" data-option-focus-index=\"{{@findex}}\" data-option-index=\"{{@index}}\" data-option-value=\"{{" + columnKeys.optionValue + "}}\" {{#" + columnKeys.optionSelected + "}}data-option-selected=\"true\"{{/" + columnKeys.optionSelected + "}}>\n            <div class=\"ax-select-option-item-holder\">\n                {{#multiple}}\n                <span class=\"ax-select-option-item-cell ax-select-option-item-checkbox\">\n                    <span class=\"item-checkbox-wrap useCheckBox\" data-option-checkbox-index=\"{{@i}}\"></span>\n                </span>\n                {{/multiple}}\n                <span class=\"ax-select-option-item-cell ax-select-option-item-label\">{{{" + columnKeys.optionText + "}}}</span>\n            </div>\n        </div>\n        {{/optgroup}}\n    {{/options}}\n    {{^options}}\n        <div class=\"ax-select-option-item\">\n            <div class=\"ax-select-option-item-holder\">\n                <span class=\"ax-select-option-item-cell ax-select-option-item-label\">\n                    {{{lang.noOptions}}}\n                </span>\n            </div>\n        </div>\n    {{/options}}\n{{/waitOptions}}\n";
  }
};

var $window = (0, _jqmin2.default)(window);
var onStateChanged = function onStateChanged(item, that) {
  if (item && item.onStateChanged) {
    item.onStateChanged.call(that, that);
  } else if (this.onStateChanged) {
    this.onStateChanged.call(that, that);
  }

  if (that.state == "changeValue") {
    if (item && item.onChange) {
      item.onChange.call(that, that);
    } else if (this.onChange) {
      this.onChange.call(that, that);
    }
  }

  item = null;
  that = null;
  return true;
};
var alignSelectDisplay = function alignSelectDisplay() {
  var i = this.queue.length,
      w = void 0;
  while (i--) {
    if (this.queue[i].$display) {
      w = Math.max(this.queue[i].$select.outerWidth(), _AX6Util2.default.number(this.queue[i].minWidth));
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
var alignSelectOptionGroup = function alignSelectOptionGroup(append) {
  if (!this.activeSelectOptionGroup) return this;

  var item = this.queue[this.activeSelectQueueIndex],
      pos = {},
      positionMargin = 0,
      dim = {},
      pickerDim = {},
      pickerDirection = void 0;

  if (append) (0, _jqmin2.default)(document.body).append(this.activeSelectOptionGroup);

  pos = item.$target.offset();
  dim = {
    width: item.$target.outerWidth(),
    height: item.$target.outerHeight()
  };
  pickerDim = {
    winWidth: Math.max($window.width(), (0, _jqmin2.default)(document.body).width()),
    winHeight: Math.max($window.height(), (0, _jqmin2.default)(document.body).height()),
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
    this.activeSelectOptionGroup.addClass("direction-" + pickerDirection);
  }
  this.activeSelectOptionGroup.css(function () {
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
        };
      }
      return {
        left: pos.left,
        top: pos.top + dim.height + 1,
        width: dim.width
      };
    } else if (pickerDirection == "bottom") {
      return {
        left: pos.left,
        top: pos.top - pickerDim.height - 1,
        width: dim.width
      };
    }
  }.call(this));
};
var onBodyClick = function onBodyClick(e, target) {
  if (!this.activeSelectOptionGroup) return this;

  var item = this.queue[this.activeSelectQueueIndex],
      clickEl = "display";

  target = _AX6Util2.default.findParentNode(e.target, function (target) {
    if (target.getAttribute("data-option-value") || target.getAttribute("data-option-value") == "") {
      clickEl = "optionItem";
      return true;
    } else if (item.$target.get(0) == target) {
      clickEl = "display";
      return true;
    }
  });

  if (!target) {
    this.close();
    return this;
  } else if (clickEl === "optionItem") {
    this.val(item.id, {
      index: {
        gindex: target.getAttribute("data-option-group-index"),
        index: target.getAttribute("data-option-index")
      }
    }, undefined, "internal");
    item.$select.trigger("change");
    item.$display.focus();
    if (!item.multiple) this.close();
  } else {
    //open and display click
    //console.log(this.instanceId);
  }

  return this;
};
var onBodyKeyup = function onBodyKeyup(e) {
  if (e.keyCode == _AX6Info2.default.eventKeys.ESC) {
    this.close();
  } else if (e.which == _AX6Info2.default.eventKeys.RETURN) {
    if (this.queue[this.activeSelectQueueIndex].optionFocusIndex > -1) {
      // 아이템에 포커스가 활성화 된 후, 마우스 이벤트 이면 무시
      var $option = this.activeSelectOptionGroup.find('[data-option-focus-index="' + this.queue[this.activeSelectQueueIndex].optionFocusIndex + '"]');
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
var getLabel = function getLabel(queIdx) {
  var item = this.queue[queIdx],
      labels = [];

  if (_AX6Util2.default.isArray(item.selected) && item.selected.length > 0) {
    item.selected.forEach(function (n) {
      if (n.selected) labels.push(n[item.columnKeys.optionText]);
    });
  } else {
    if (!item.multiple && item.options && item.options[0]) {
      if (item.options[0].optgroup) {
        labels[0] = item.options[0].options[0][item.columnKeys.optionText];
      } else {
        labels[0] = item.options[0][item.columnKeys.optionText];
      }
    } else {
      labels[0] = item.lang.noSelected;
    }
  }

  return function () {
    if (item.multiple && labels.length > 1) {
      var data = {
        label: labels[0],
        length: labels.length - 1
      };
      return _AX6Mustache2.default.render(item.lang.multipleLabel, data);
    } else {
      return labels[0];
    }
  }();
};
var syncLabel = function syncLabel(queIdx) {
  this.queue[queIdx].$displayLabel.html(getLabel.call(this, queIdx));
};
var focusWord = function focusWord(queIdx, searchWord) {
  var options = [],
      i = -1,
      l = this.queue[queIdx].indexedOptions.length - 1,
      n = void 0;
  if (searchWord) {
    while (l - i++) {
      n = this.queue[queIdx].indexedOptions[i];
      if (('' + n.value).toLowerCase() == searchWord.toLowerCase()) {
        options = [{ '@findex': n['@findex'], optionsSort: 0 }];
        break;
      } else {
        var sort = ('' + n.value).toLowerCase().search(searchWord.toLowerCase());
        if (sort > -1) {
          options.push({ '@findex': n['@findex'], optionsSort: sort });
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
  } finally {
    options = null;
    i = null;
    l = null;
    n = null;
  }
};
var focusMove = function focusMove(queIdx, direction, findex) {
  var _focusIndex = void 0,
      _prevFocusIndex = void 0,
      focusOptionEl = void 0,
      optionGroupScrollContainer = void 0;

  if (this.activeSelectOptionGroup && this.queue[queIdx].options && this.queue[queIdx].options.length > 0) {

    if (typeof findex !== "undefined") {
      _focusIndex = findex;
    } else {
      _prevFocusIndex = this.queue[queIdx].optionFocusIndex == -1 ? this.queue[queIdx].optionSelectedIndex || -1 : this.queue[queIdx].optionFocusIndex;
      if (_prevFocusIndex == -1) {
        _focusIndex = direction > 0 ? 0 : this.queue[queIdx].optionItemLength - 1;
      } else {
        _focusIndex = _prevFocusIndex + direction;
        if (_focusIndex < 0) _focusIndex = 0;else if (_focusIndex > this.queue[queIdx].optionItemLength - 1) _focusIndex = this.queue[queIdx].optionItemLength - 1;
      }
    }

    this.queue[queIdx].optionFocusIndex = _focusIndex;

    this.activeSelectOptionGroup.find('[data-option-focus-index]').removeClass("hover");

    focusOptionEl = this.activeSelectOptionGroup.find('[data-option-focus-index="' + _focusIndex + '"]').addClass("hover");

    optionGroupScrollContainer = this.activeSelectOptionGroup.find('[data-els="content"]');

    var focusOptionElHeight = focusOptionEl.outerHeight(),
        optionGroupScrollContainerHeight = optionGroupScrollContainer.innerHeight(),
        optionGroupScrollContainerScrollTop = optionGroupScrollContainer.scrollTop(),
        focusOptionElTop = focusOptionEl.position().top + optionGroupScrollContainer.scrollTop();

    if (optionGroupScrollContainerHeight + optionGroupScrollContainerScrollTop < focusOptionElTop + focusOptionElHeight) {
      optionGroupScrollContainer.scrollTop(focusOptionElTop + focusOptionElHeight - optionGroupScrollContainerHeight);
    } else if (optionGroupScrollContainerScrollTop > focusOptionElTop) {
      optionGroupScrollContainer.scrollTop(focusOptionElTop);
    }
    // optionGroup scroll check
  }
};
var bindSelectTarget = function bindSelectTarget(queIdx) {
  var _this = this;

  var selectEvent = {
    'click': function click(queIdx, e) {
      var target = _AX6Util2.default.findParentNode(e.target, function (target) {
        if (target.getAttribute("data-selected-clear")) {
          //clickEl = "clear";
          return true;
        }
      });

      if (target) {
        this.val(queIdx, { clear: true });
      } else {
        if (this.activeSelectQueueIndex == queIdx) {
          if (this.queue[queIdx].optionFocusIndex == -1) {
            // 아이템에 포커스가 활성화 된 후, 마우스 이벤트 이면 무시
            this.close();
          }
        } else {
          this.open(queIdx);
          _AX6Util2.default.stopEvent(e);
        }
      }
    },
    'keyUp': function keyUp(queIdx, e) {
      if (e.which == _AX6Info2.default.eventKeys.SPACE) {
        selectEvent.click.call(this, queIdx, e);
      } else if (!ctrlKeys[e.which]) {
        // 사용자 입력이 뜸해지면 찾고 검색 값 제거...
        _AX6Util2.default.debounce(function (searchWord, queIdx) {
          focusWord.call(this, queIdx, searchWord);
          this.queue[queIdx].$displayInput.val('');
        }, 300).call(this, this.queue[queIdx].$displayInput.val(), queIdx);
      }
    },
    'keyDown': function keyDown(queIdx, e) {
      if (e.which == _AX6Info2.default.eventKeys.DOWN) {
        focusMove.call(this, queIdx, 1);
        _AX6Util2.default.stopEvent(e);
      } else if (e.which == _AX6Info2.default.eventKeys.UP) {
        focusMove.call(this, queIdx, -1);
        _AX6Util2.default.stopEvent(e);
      }
    },
    'blur': function blur(queIdx, e) {},
    'selectChange': function selectChange(queIdx, e) {
      this.val(queIdx, this.queue[queIdx].$select.val(), true);
    }
  };

  var item = this.queue[queIdx],
      data = {};

  // find selected
  item.selected = [];
  if (!item.options) item.options = [];
  item.options.forEach(function (n) {
    if (n[_this.config.columnKeys.optionSelected]) item.selected.push(_jqmin2.default.extend({}, n));
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

    item.$display = (0, _jqmin2.default)(_AX6Mustache2.default.render(tmpl.display.call(this), data));
    //item.$display.css({height: item.height});
    item.$displayLabel = item.$display.find('[data-ax6ui-select-display="label"]');

    if (item.$target.find("select").get(0)) {
      item.$select = item.$target.find("select");
      // select 속성만 변경
      item.$select.attr("tabindex", "-1").css({ height: data.height });

      if (data.name) {
        item.$select.attr("name", "name");
      }
      if (data.multiple) {
        item.$select.attr("multiple", "multiple");
      }
    } else {
      item.$select = (0, _jqmin2.default)(_AX6Mustache2.default.render(tmpl.select.call(this), data));
      item.$target.append(item.$select);
      // select append
    }

    item.$target.append(item.$display);
    item.$displayInput = item.$display.find('[data-ax6ui-select-display="input"]'); // 사용자 입력값을 받기위한 숨음 입력필드
    item.options = syncSelectOptions.call(this, queIdx, item.options);

    alignSelectDisplay.call(this);

    item.$displayInput.off("blur.ax6ui-select").on("blur.ax6ui-select", selectEvent.blur.bind(this, queIdx)).off('keyup.ax6ui-select').on('keyup.ax6ui-select', selectEvent.keyUp.bind(this, queIdx)).off("keydown.ax6ui-select").on("keydown.ax6ui-select", selectEvent.keyDown.bind(this, queIdx));
  } else {
    item.$displayLabel.html(getLabel.call(this, queIdx));
    item.options = syncSelectOptions.call(this, queIdx, item.options);

    alignSelectDisplay.call(this);
  }

  item.$display.off('click.ax6ui-select').on('click.ax6ui-select', selectEvent.click.bind(this, queIdx)).off('keyup.ax6ui-select').on('keyup.ax6ui-select', selectEvent.keyUp.bind(this, queIdx));

  // select 태그에 대한 change 이벤트 감시
  item.$select.off('change.ax6ui-select').on('change.ax6ui-select', selectEvent.selectChange.bind(this, queIdx));

  data = null;
  item = null;
  queIdx = null;
  return this;
};
var syncSelectOptions = function syncSelectOptions(queIdx, options) {
  var _this2 = this;

  var setSelected = function setSelected(queIdx, O) {
    if (!O) {
      this.queue[queIdx].selected = [];
    } else {
      if (this.queue[queIdx].multiple) this.queue[queIdx].selected.push(_jqmin2.default.extend({}, O));else this.queue[queIdx].selected[0] = _jqmin2.default.extend({}, O);
    }
  };

  var item = this.queue[queIdx],
      po = void 0,
      elementOptions = void 0,
      newOptions = void 0,
      focusIndex = 0;

  setSelected.call(this, queIdx, false); // item.selected 초기화

  if (options) {
    item.options = options;
    item.indexedOptions = [];

    // select options 태그 생성
    po = [];
    item.options.forEach(function (O, OIndex) {
      if (O.optgroup) {

        O['@gindex'] = OIndex;
        O.options.forEach(function (OO, OOIndex) {
          OO['@index'] = OOIndex;
          OO['@findex'] = focusIndex;
          po.push('<option value="' + OO[item.columnKeys.optionValue] + '" ' + (OO[item.columnKeys.optionSelected] ? ' selected="selected"' : '') + '>' + OO[item.columnKeys.optionText] + '</option>');
          if (OO[item.columnKeys.optionSelected]) {
            setSelected.call(_this2, queIdx, OO);
          }

          item.indexedOptions.push({
            '@findex': focusIndex, value: OO[item.columnKeys.optionValue], text: OO[item.columnKeys.optionText]
          });
          focusIndex++;
        });
      } else {
        O['@index'] = OIndex;
        O['@findex'] = focusIndex;
        po.push('<option value="' + O[item.columnKeys.optionValue] + '" ' + (O[item.columnKeys.optionSelected] ? ' selected="selected"' : '') + '>' + O[item.columnKeys.optionText] + '</option>');
        if (O[item.columnKeys.optionSelected]) {
          setSelected.call(_this2, queIdx, O);
        }

        item.indexedOptions.push({
          '@findex': focusIndex, value: O[item.columnKeys.optionValue], text: O[item.columnKeys.optionText]
        });
        focusIndex++;
      }
    });
    item.optionItemLength = focusIndex;
    item.$select.html(po.join(''));
  } else {
    /// select > options 태그로 스크립트 options를 만들어주는 역할
    elementOptions = _AX6Util2.default.toArray(item.$select.get(0).options);
    // select option 스크립트 생성
    newOptions = [];
    elementOptions.forEach(function (O, OIndex) {
      var option = {};

      option[item.columnKeys.optionValue] = O.value;
      option[item.columnKeys.optionText] = O.text;
      option[item.columnKeys.optionSelected] = O.selected;
      option['@index'] = OIndex;
      option['@findex'] = OIndex;
      if (O.selected) setSelected.call(_this2, queIdx, option);
      newOptions.push(option);

      option = null;
    });
    item.options = newOptions;
    item.indexedOptions = newOptions;
  }

  if (!item.multiple && item.selected.length == 0 && item.options && item.options[0]) {
    if (item.options[0].optgroup) {
      item.options[0].options[0][item.columnKeys.optionSelected] = true;
      item.selected.push(_jqmin2.default.extend({}, item.options[0].options[0]));
    } else {
      item.options[0][item.columnKeys.optionSelected] = true;
      item.selected.push(_jqmin2.default.extend({}, item.options[0]));
    }
  }

  po = null;
  elementOptions = null;
  newOptions = null;
  return item.options;
};
var getQueIdx = function getQueIdx(boundID) {
  if (!_AX6Util2.default.isString(boundID)) {
    boundID = (0, _jqmin2.default)(boundID).data("data-ax6ui-select-id");
  }
  if (!_AX6Util2.default.isString(boundID)) {
    console.log(_AX6Info2.default.getError("ax6ui-select", "402", "getQueIdx"));
    return;
  }
  return _AX6Util2.default.search(this.queue, function () {
    return this.id == boundID;
  });
};
/* ~~~~~~~~~~~~~~~~~~ end of private  ~~~~~~~~~~~~~~~~~~~~ */

/**
 * @class
 */

var AX6UISelect = function (_AX6UICore) {
  _inherits(AX6UISelect, _AX6UICore);

  /**
   * @constructor
   * @param config
   */
  function AX6UISelect(config) {
    _classCallCheck(this, AX6UISelect);

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
    var _this3 = _possibleConstructorReturn(this, (AX6UISelect.__proto__ || Object.getPrototypeOf(AX6UISelect)).call(this));

    _this3.config = {
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
    _jqmin2.default.extend(true, _this3.config, config);

    // 멤버 변수 초기화
    /**
     * bind를 통해 연결된 select가 저장되는 변수
     * @member {Array}
     */
    _this3.queue = [];
    /**
     * @member {Object}
     */
    _this3.activeSelectOptionGroup = null;
    /**
     * @member {Number}
     */
    _this3.activeSelectQueueIndex = -1;
    /**
     * @member {Object}
     */
    _this3.openTimer = null;
    /**
     * @member {Object}
     */
    _this3.closeTimer = null;
    /**
     * @member {Function}
     */
    _this3.waitOptionsCallback = null;
    /**
     * @member {Object}
     */
    _this3.keyUpTimer = null;
    /**
     * @member {Object}
     */
    _this3.xvar = {};

    _this3.init();
    return _this3;
  }

  /**
   * @method
   * @param config
   */


  _createClass(AX6UISelect, [{
    key: "init",
    value: function init() {
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

  }, {
    key: "initOnce",
    value: function initOnce() {
      if (this.initialized) return this;
      this.initialized = true;

      // throttledResize
      $window.on("resize.ax6ui-select-display-" + this.instanceId, _AX6Util2.default.throttle(function (e) {
        alignSelectDisplay.call(this, e || window.event);
        alignSelectOptionGroup.call(this);
      }, 100).bind(this));
    }

    /**
     * @method
     * @param item
     * @return {AX6UISelect}
     */

  }, {
    key: "bind",
    value: function bind(item) {
      var queIdx = void 0;
      item = _jqmin2.default.extend(true, {}, this.config, item);

      if (!item.target) {
        console.log(_AX6Info2.default.getError("ax6ui-select", "401", "bind"));
        return this;
      }
      item.$target = (0, _jqmin2.default)(item.target);

      if (!item.id) item.id = item.$target.data("data-ax6ui-select-id");
      if (!item.id) {
        item.id = 'ax6ui-select-' + _AX6UICore3.default.getInstanceId();
        item.$target.data("data-ax6ui-select-id", item.id);
      }
      item.name = item.$target.attr("data-ax6ui-select");

      if (item.options) {
        item.options = JSON.parse(JSON.stringify(item.options));
      }

      // target attribute data
      (function (data) {
        if (_AX6Util2.default.isObject(data) && !data.error) {
          item = _jqmin2.default.extend(true, item, data);
        }
      })(_AX6Util2.default.parseJson(item.$target.attr("data-ax6ui-select-config"), true));

      queIdx = _AX6Util2.default.search(this.queue, function () {
        return this.id == item.id;
      });

      if (queIdx === -1) {
        this.queue.push(item);
        bindSelectTarget.call(this, this.queue.length - 1);
      } else {
        this.queue[queIdx].selected = [];
        this.queue[queIdx].options = item.options;
        this.queue[queIdx] = _jqmin2.default.extend(true, {}, this.queue[queIdx], item);
        bindSelectTarget.call(this, queIdx);
      }

      queIdx = null;
      return this;
    }
  }, {
    key: "open",


    /**
     * @method
     * @param boundID
     * @param tryCount
     * @return {AX6UISelect}
     */
    value: function open(boundID, tryCount) {
      var _this5 = this;

      var onExpand = function onExpand(item) {
        var _this4 = this;

        item.onExpand.call({
          self: this,
          item: item
        }, function (O) {
          if (_this4.waitOptionsCallback) {
            var _data = {};
            var _item2 = _this4.queue[_this4.activeSelectQueueIndex];

            /// 현재 selected 검증후 처리
            (function (item, O) {
              var optionsMap = {};
              O.options.forEach(function (_O, _OIndex) {
                _O["@index"] = _OIndex;
                optionsMap[_O[item.columnKeys.optionValue]] = _O;
              });
              if (_AX6Util2.default.isArray(item.selected)) {
                item.selected.forEach(function (_O) {
                  if (optionsMap[_O[item.columnKeys.optionValue]]) {
                    O.options[optionsMap[_O[item.columnKeys.optionValue]]["@index"]][item.columnKeys.optionSelected] = true;
                  }
                });
              }
            })(_item2, O);

            _item2.$displayLabel.html(getLabel.call(_this4, _this4.activeSelectQueueIndex));
            _item2.options = syncSelectOptions.call(_this4, _this4.activeSelectQueueIndex, O.options);

            alignSelectDisplay.call(_this4);

            /// 템플릿에 전달할 오브젝트 선언
            _data.id = _item2.id;
            _data.theme = _item2.theme;
            _data.multiple = _item2.multiple;
            _data.lang = _item2.lang;
            _data.options = _item2.options;
            _this4.activeSelectOptionGroup.find('[data-els="content"]').html(_AX6Mustache2.default.render(tmpl.options.call(_this4, _item2.columnKeys), _data));
          }
        });
      };
      this.waitOptionsCallback = null;

      /**
       * open select from the outside
       */
      var queIdx = _AX6Util2.default.isNumber(boundID) ? boundID : getQueIdx.call(this, boundID),
          item = this.queue[queIdx],
          data = {},
          focusTop = void 0,
          selectedOptionEl = void 0;

      if (item.$display.attr("disabled")) return this;

      if (this.openTimer) clearTimeout(this.openTimer);
      if (this.activeSelectOptionGroup) {
        if (this.activeSelectQueueIndex == queIdx) {
          return this;
        }

        if (tryCount > 2) return this;
        this.close();
        this.openTimer = setTimeout(function () {
          this.open(queIdx, (tryCount || 0) + 1);
        }.bind(this), this.config.animateTime);

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
      this.activeSelectOptionGroup = (0, _jqmin2.default)(_AX6Mustache2.default.render(tmpl.optionGroup.call(this), data));
      this.activeSelectOptionGroup.find('[data-els="content"]').html(_AX6Mustache2.default.render(tmpl.options.call(this, item.columnKeys), data));
      this.activeSelectQueueIndex = queIdx;

      alignSelectOptionGroup.call(this, "append"); // alignSelectOptionGroup 에서 body append

      /// 사용자 입력으로 옵션을 검색하기 위한 시나리오
      // 옵션그룹이 활성화 되면 사용자 입력을 받기위한 input 값 초기화 및 포커스 다른 select가 닫히면서 display focus 이벤트와 충돌하는 문제가 있으므로
      // 1밀리세컨 지연후 포커스 처리. input에 포커스가 되므로 input value로 options를 검색 할 수 있게 됩니다.
      item.$displayInput.val('');

      setTimeout(function () {

        if (item.selected && item.selected.length > 0) {
          selectedOptionEl = _this5.activeSelectOptionGroup.find('[data-option-index="' + item.selected[0]["@index"] + '"]');
          if (selectedOptionEl.get(0)) {
            focusTop = selectedOptionEl.position().top - _this5.activeSelectOptionGroup.height() / 3;
            _this5.activeSelectOptionGroup.find('[data-els="content"]').scrollTop(focusTop);
          }
        }

        item.$displayInput.trigger("focus");

        (0, _jqmin2.default)(window).on("keyup.ax6ui-select-" + _this5.instanceId, function (e) {
          e = e || window.event;
          onBodyKeyup.call(this, e);
          _AX6Util2.default.stopEvent(e);
        }.bind(_this5));

        (0, _jqmin2.default)(window).on("click.ax6ui-select-" + _this5.instanceId, function (e) {
          e = e || window.event;
          onBodyClick.call(this, e);
          _AX6Util2.default.stopEvent(e);
        }.bind(_this5));
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

  }, {
    key: "update",
    value: function update(_item) {
      this.bind(_item);
      return this;
    }
  }, {
    key: "setOptions",


    /**
     * @method
     * @param boundID
     * @param options
     * @return {AX6UISelect}
     */
    value: function setOptions(boundID, options) {
      var queIdx = getQueIdx.call(this, boundID);
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

  }, {
    key: "val",
    value: function val(boundID, value, selected, internal) {
      var getSelected = function getSelected(_item, o, selected) {
        if (typeof selected === "undefined") {
          return _item.multiple ? !o : true;
        } else {
          return selected;
        }
      },
          clearSelected = function clearSelected(queIdx) {
        this.queue[queIdx].options.forEach(function (n) {
          if (n.optgroup) {
            n.options.forEach(function (nn) {
              nn.selected = false;
            });
          } else {
            n.selected = false;
          }
        });
      },
          processor = {
        'index': function index(queIdx, value, selected) {
          // 클래스 내부에서 호출된 형태, 그런 이유로 옵션그룹에 대한 상태를 변경 하고 있다.
          var item = this.queue[queIdx];

          if (_AX6Util2.default.isString(value.index.gindex)) {
            item.options[value.index.gindex].options[value.index.index][item.columnKeys.optionSelected] = getSelected(item, item.options[value.index.gindex].options[value.index.index][item.columnKeys.optionSelected], selected);
            this.activeSelectOptionGroup.find('[data-option-group-index="' + value.index.gindex + '"][data-option-index="' + value.index.index + '"]').attr("data-option-selected", item.options[value.index.gindex].options[value.index.index][item.columnKeys.optionSelected].toString());
          } else {
            item.options[value.index.index][item.columnKeys.optionSelected] = getSelected(item, item.options[value.index.index][item.columnKeys.optionSelected], selected);
            this.activeSelectOptionGroup.find('[data-option-index="' + value.index.index + '"]').attr("data-option-selected", item.options[value.index.index][item.columnKeys.optionSelected].toString());
          }

          syncSelectOptions.call(this, queIdx, item.options);
          syncLabel.call(this, queIdx);
          alignSelectOptionGroup.call(this);
        },
        'arr': function arr(queIdx, values, selected) {
          var _this6 = this;

          values.forEach(function (value) {
            if (_AX6Util2.default.isString(value) || _AX6Util2.default.isNumber(value)) {
              processor.value.call(_this6, queIdx, value, selected);
            } else {
              for (var _key in processor) {
                if (value[_key]) {
                  processor[_key].call(_this6, queIdx, value, selected);
                  break;
                }
              }
            }
          });
        },
        'value': function value(queIdx, _value, selected) {
          var item = this.queue[queIdx],
              optionIndex = _AX6Util2.default.search(item.options, function () {
            return this[item.columnKeys.optionValue] == _value;
          });
          if (optionIndex > -1) {
            item.options[optionIndex][item.columnKeys.optionSelected] = getSelected(item, item.options[optionIndex][item.columnKeys.optionSelected], selected);
          } else {
            console.log(_AX6Info2.default.getError("ax6ui-select", "501", "val"));
            return;
          }

          syncSelectOptions.call(this, queIdx, item.options);
          syncLabel.call(this, queIdx);
        },
        'text': function text(queIdx, value, selected) {
          var item = this.queue[queIdx],
              optionIndex = _AX6Util2.default.search(item.options, function () {
            return this[item.columnKeys.optionText] == value;
          });
          if (optionIndex > -1) {
            item.options[optionIndex][item.columnKeys.optionSelected] = getSelected(item, item.options[optionIndex][item.columnKeys.optionSelected], selected);
          } else {
            console.log(_AX6Info2.default.getError("ax6ui-select", "501", "val"));
            return;
          }

          syncSelectOptions.call(this, queIdx, item.options);
          syncLabel.call(this, queIdx);
        },
        'clear': function clear(queIdx) {
          clearSelected.call(this, queIdx);
          syncSelectOptions.call(this, queIdx, this.queue[queIdx].options);
          syncLabel.call(this, queIdx);

          if (this.activeSelectOptionGroup) {
            this.activeSelectOptionGroup.find('[data-option-index]').attr("data-option-selected", "false");
          }
        }
      };

      var queIdx = _AX6Util2.default.isNumber(boundID) ? boundID : getQueIdx.call(this, boundID);
      if (!this.queue[queIdx]) {
        return this;
      }
      if (typeof value !== "undefined" && !this.queue[queIdx].multiple) {
        clearSelected.call(this, queIdx);
      }

      if (typeof value == "undefined") {
        return this.queue[queIdx].selected;
      } else if (_AX6Util2.default.isArray(value)) {
        processor.arr.call(this, queIdx, value, selected);
      } else if (_AX6Util2.default.isString(value) || _AX6Util2.default.isNumber(value)) {
        processor.value.call(this, queIdx, value, selected);
      } else {
        if (value === null) {
          processor.clear.call(this, queIdx);
        } else {
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
          state: internal ? "changeValue" : "setValue",
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

  }, {
    key: "close",
    value: function close(item) {
      var _this7 = this;

      if (this.closeTimer) clearTimeout(this.closeTimer);
      if (!this.activeSelectOptionGroup) return this;

      item = this.queue[this.activeSelectQueueIndex];
      item.optionFocusIndex = -1;

      item.$displayInput.val('').trigger("blur");
      item.$display.removeAttr("data-select-option-group-opened").trigger("focus");

      this.activeSelectOptionGroup.addClass("destroy");

      (0, _jqmin2.default)(window).off("resize.ax6ui-select-" + this.instanceId).off("click.ax6ui-select-" + this.instanceId).off("keyup.ax6ui-select-" + this.instanceId);

      this.closeTimer = setTimeout(function () {
        if (_this7.activeSelectOptionGroup) _this7.activeSelectOptionGroup.remove();
        _this7.activeSelectOptionGroup = null;
        _this7.activeSelectQueueIndex = -1;

        var that = {
          self: _this7,
          item: item,
          value: item.selected,
          state: "close"
        };

        onStateChanged.call(_this7, item, that);

        // waitOption timer
        if (item.onClose) {
          item.onClose.call(that);
        }
      }, this.config.animateTime);
      this.waitOptionsCallback = null;
      return this;
    }
  }, {
    key: "enable",


    /**
     * @method
     * @param boundID
     * @return {AX6UISelect}
     */
    value: function enable(boundID) {
      var queIdx = getQueIdx.call(this, boundID);
      this.queue[queIdx].$display.removeAttr("disabled");
      this.queue[queIdx].$select.removeAttr("disabled");

      onStateChanged.call(this, this.queue[queIdx], {
        self: this,
        state: "enable"
      });

      return this;
    }
  }, {
    key: "disable",


    /**
     * @method
     * @param boundID
     * @return {AX6UISelect}
     */
    value: function disable(boundID) {
      var queIdx = getQueIdx.call(this, boundID);
      this.queue[queIdx].$display.attr("disabled", "disabled");
      this.queue[queIdx].$select.attr("disabled", "disabled");

      onStateChanged.call(this, this.queue[queIdx], {
        self: this,
        state: "disable"
      });

      return this;
    }
  }]);

  return AX6UISelect;
}(_AX6UICore3.default);

exports.default = AX6UISelect;