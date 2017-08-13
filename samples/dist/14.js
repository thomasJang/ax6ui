webpackJsonp([14],{

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jqmin = __webpack_require__(6);

var _jqmin2 = _interopRequireDefault(_jqmin);

var _AX6UIFormatter = __webpack_require__(67);

var _AX6UIFormatter2 = _interopRequireDefault(_AX6UIFormatter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var html = "\n<div class=\"row\">\n    <div class=\"col s12 m6\">\n        <label for=\"money_formatter\">Money Formatter</label>\n        <input type=\"text\" id=\"money_formatter\" data-ax6formatter=\"money\" value=\"\" />\n    </div>\n    <div class=\"col s12 m6\">\n        <button class=\"btn\" data-btn=\"bind-money\">bind</button>\n        <button class=\"btn\" data-btn=\"unbind-money\">unbind</button>\n    </div>\n</div>\n\n<div class=\"row\">\n    <div class=\"col s12\">\n        <label for=\"money_int_formatter\">Money(int) Formatter</label>\n        <input type=\"text\" id=\"money_int_formatter\" data-ax6formatter=\"money(int)\" value=\"\" />\n        \n    </div>\n</div>\n\n<div class=\"row\">\n    <div class=\"col s12 m6\">\n        <label for=\"date_formatter\">Date Formatter</label>\n        <input type=\"text\" id=\"date_formatter\" data-ax6formatter=\"date\" value=\"\" />\n        \n    </div>\n    <div class=\"col s12 m6\">\n        <button class=\"btn\" data-btn=\"bind-date\">bind</button>\n        <button class=\"btn\" data-btn=\"unbind-date\">unbind</button>\n    </div>\n</div>\n\n<div class=\"row\">\n    <div class=\"col s12\">\n        <label for=\"date_time_formatter\">Date(time) Formatter</label>\n        <input type=\"text\" id=\"date_time_formatter\" data-ax6formatter=\"date(time)\" value=\"\" />\n        \n    </div>\n</div>\n\n<div class=\"row\">\n    <div class=\"col s12\">\n        <label for=\"time_formatter\">Time Formatter</label>\n        <input type=\"text\" id=\"time_formatter\" data-ax6formatter=\"time\" value=\"\" />\n    </div>\n</div>\n\n<div class=\"row\">\n    <div class=\"col s12\">\n        <label for=\"my_formatter\">myPattern</label>\n        <input type=\"text\" id=\"my_formatter\" data-ax6formatter=\"myPattern\" value=\"\" />\n    </div>\n</div>\n";
var fn = {
  moduleRun: function moduleRun($body) {
    var formatter = new _AX6UIFormatter2.default();

    formatter.bind({
      target: (0, _jqmin2.default)('[data-ax6formatter="money(int)"]')
    });
    formatter.bind({
      target: (0, _jqmin2.default)('[data-ax6formatter="date(time)"]')
    });
    formatter.bind({
      target: (0, _jqmin2.default)('[data-ax6formatter="time"]')
    });

    // 사용자 정의 포멧터 정의
    _AX6UIFormatter2.default.setFormatter({
      "myPattern": {
        getEnterableKeyCodes: function getEnterableKeyCodes(_opts) {
          var enterableKeyCodes = {
            '189': '-' // eventKeyCode
          };
          return Object.assign(enterableKeyCodes, _AX6UIFormatter2.default.getCtrlKeys(), _AX6UIFormatter2.default.getNumKeys());
        },
        getPatternValue: function getPatternValue(_opts, optIdx, e, val, eType) {
          val = val.replace(/\D/g, "");
          var regExpPattern = /^([0-9]{2})\-?([0-9]{2})?\-?([0-9]{2})?\-?([0-9]{2})?/;
          return val.replace(regExpPattern, function (a, b) {
            var nval = [arguments[1]];
            if (arguments[2]) nval.push(arguments[2]);
            if (arguments[3]) nval.push(arguments[3]);
            if (arguments[4]) nval.push(arguments[4]);
            return nval.join("-");
          });
        }
      }
    });

    formatter.bind({
      target: (0, _jqmin2.default)('[data-ax6formatter="myPattern"]')
    });

    $body.on("click", '[data-btn]', function () {
      var btn = this.getAttribute("data-btn");
      var processor = {
        "bind-money": function bindMoney() {
          formatter.bind({
            target: (0, _jqmin2.default)('[data-ax6formatter="money"]')
          });
        },
        "unbind-money": function unbindMoney() {
          formatter.unbind({
            target: (0, _jqmin2.default)('[data-ax6formatter="money"]')
          });
        },
        "bind-date": function bindDate() {
          formatter.bind({
            target: (0, _jqmin2.default)('[data-ax6formatter="date"]')
          });
        },
        "unbind-date": function unbindDate() {
          formatter.unbind({
            target: (0, _jqmin2.default)('[data-ax6formatter="date"]')
          });
        }
      };
      processor[btn]();
    });
  },
  moduleDestroy: function moduleDestroy($body) {
    $body.off("click");
  }
};

exports.default = {
  html: html,
  fn: fn
};

/***/ }),

/***/ 67:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jqmin = __webpack_require__(2);

var _jqmin2 = _interopRequireDefault(_jqmin);

var _AX6UICore2 = __webpack_require__(5);

var _AX6UICore3 = _interopRequireDefault(_AX6UICore2);

var _AX6Util = __webpack_require__(1);

var _AX6Util2 = _interopRequireDefault(_AX6Util);

var _AX6Info = __webpack_require__(4);

var _AX6Info2 = _interopRequireDefault(_AX6Info);

var _AX6UIFormatter_formatter = __webpack_require__(68);

var _AX6UIFormatter_formatter2 = _interopRequireDefault(_AX6UIFormatter_formatter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* ~~~~~~~~~~~~~~~~~~ end of import  ~~~~~~~~~~~~~~~~~~~~ */

var formatter = {};

var setSelectionRange = function setSelectionRange(input, pos) {
  if (typeof pos == "undefined") {
    pos = input.value.length;
  }
  if (input.setSelectionRange) {
    input.focus();
    input.setSelectionRange(pos, pos);
  } else if (input.createTextRange) {
    var range = input.createTextRange();
    range.collapse(true);
    range.moveEnd('character', pos);
    range.moveStart('character', pos);
    range.select();
  } else if (input.selectionStart) {
    input.focus();
    input.selectionStart = pos;
    input.selectionEnd = pos;
  }
};
var formatterEvent = {
  'focus': function focus(opts, optIdx, e) {
    if (!opts.$input.data("__originValue__")) opts.$input.data("__originValue__", opts.$input.val());
  },
  /* 키 다운 이벤트에서 입력할 수 없는 키 입력을 방어 */
  'keydown': function keydown(opts, optIdx, e) {
    var isStop = false;
    if (!opts.enterableKeyCodes) {} else if (e.which && opts.enterableKeyCodes[e.which]) {} else if (!e.metaKey && !e.ctrlKey && !e.shiftKey) {
      //console.log(e.which, opts.enterableKeyCodes);
      isStop = true;
    }
    if (isStop) _AX6Util2.default.stopEvent(e);
  },
  /* 키 업 이벤트에서 패턴을 적용 */
  'keyup': function keyup(opts, optIdx, e) {
    var elem = opts.$input.get(0),
        elemFocusPosition = void 0,
        beforeValue = void 0,
        newValue = void 0,
        selection = void 0,
        selectionLength = void 0;

    if ('selectionStart' in elem) {
      // Standard-compliant browsers
      elemFocusPosition = elem.selectionStart;
    } else if (document.selection) {
      // IE
      //elem.focus();
      selection = document.selection.createRange();
      selectionLength = document.selection.createRange().text.length;
      selection.moveStart('character', -elem.value.length);
      elemFocusPosition = selection.text.length - selectionLength;
    }

    beforeValue = elem.value;
    if (opts.pattern in this.customFormatter) {
      newValue = this.customFormatter[opts.pattern].getPatternValue.call(this, opts, optIdx, e, elem.value);
    } else if (opts.pattern in _AX6UIFormatter_formatter2.default) {
      newValue = _AX6UIFormatter_formatter2.default[opts.pattern].getPatternValue.call(this, opts, optIdx, e, elem.value);
    } else {
      newValue = beforeValue;
    }

    if (newValue != beforeValue) {
      opts.$input.val(newValue).trigger("change");
      setSelectionRange(elem, elemFocusPosition + newValue.length - beforeValue.length);
    }
  },
  'blur': function blur(opts, optIdx, e, _force) {
    var elem = opts.$input.get(0),
        beforeValue = void 0,
        newValue = void 0;

    opts.$input.removeData("__originValue__");

    beforeValue = elem.value;
    if (opts.pattern in this.customFormatter) {
      newValue = this.customFormatter[opts.pattern].getPatternValue.call(this, opts, optIdx, e, elem.value, 'blur');
    } else if (opts.pattern in _AX6UIFormatter_formatter2.default) {
      newValue = _AX6UIFormatter_formatter2.default[opts.pattern].getPatternValue.call(this, opts, optIdx, e, elem.value, 'blur');
    } else {
      newValue = beforeValue;
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
var bindFormatterTarget = function bindFormatterTarget(opts, optIdx) {
  if (!opts.pattern) {
    if (opts.$target.get(0).tagName == "INPUT") {
      opts.pattern = opts.$target.attr('data-ax6formatter');
    } else {
      opts.pattern = opts.$target.find('input[type="text"]').attr('data-ax6formatter');
    }
    if (!opts.pattern) {
      console.log(_AX6Info2.default.getError("ax6formatter", "501", "bind"));
      console.log(opts.target);
      return this;
    }
  }

  var re = /[^\(^\))]+/gi,
      matched = opts.pattern.match(re);

  opts.pattern = matched[0];
  opts.patternArgument = matched[1] || "";

  // 함수타입
  if (opts.pattern in this.customFormatter) {
    opts.enterableKeyCodes = this.customFormatter[opts.pattern].getEnterableKeyCodes.call(this, opts, optIdx);
  } else if (opts.pattern in _AX6UIFormatter_formatter2.default) {
    opts.enterableKeyCodes = _AX6UIFormatter_formatter2.default[opts.pattern].getEnterableKeyCodes.call(this, opts, optIdx);
  }

  opts.$input.off('focus.ax6formatter').on('focus.ax6formatter', formatterEvent.focus.bind(this, this.queue[optIdx], optIdx)).off('keydown.ax6formatter').on('keydown.ax6formatter', formatterEvent.keydown.bind(this, this.queue[optIdx], optIdx)).off('keyup.ax6formatter').on('keyup.ax6formatter', formatterEvent.keyup.bind(this, this.queue[optIdx], optIdx)).off('blur.ax6formatter').on('blur.ax6formatter', formatterEvent.blur.bind(this, this.queue[optIdx], optIdx));

  formatterEvent.blur.call(this, this.queue[optIdx], optIdx);

  return this;
};
var unbindFormatterTarget = function unbindFormatterTarget(opts, optIdx) {
  opts.$input.off('focus.ax6formatter').off('keydown.ax6formatter').off('keyup.ax6formatter').off('blur.ax6formatter');

  return this;
};
var getQueIdx = function getQueIdx(boundID) {
  if (!_AX6Util2.default.isString(boundID)) {
    boundID = (0, _jqmin2.default)(boundID).data("data-formatter");
  }
  /*
   if (!U.isString(boundID)) {
   console.log(info.getError("ax6formatter", "402", "getQueIdx"));
   return;
   }
   */
  return _AX6Util2.default.search(this.queue, function () {
    return this.id == boundID;
  });
};
/* ~~~~~~~~~~~~~~~~~~ end of private  ~~~~~~~~~~~~~~~~~~~~ */

/**
 * @class
 */

var AX6UIFormatter = function (_AX6UICore) {
  _inherits(AX6UIFormatter, _AX6UICore);

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
  function AX6UIFormatter(config) {
    _classCallCheck(this, AX6UIFormatter);

    /**
     * @member {JSON}
     * @param config
     * @param [config.animateTime=250]
     */
    var _this = _possibleConstructorReturn(this, (AX6UIFormatter.__proto__ || Object.getPrototypeOf(AX6UIFormatter)).call(this));

    _this.config = {
      animateTime: 250
    };
    _jqmin2.default.extend(true, _this.config, config);

    // 멤버 변수 초기화
    /**
     * @member
     * @type {Array}
     */
    _this.queue = [];
    _this.openTimer = null;
    _this.closeTimer = null;

    _this.init();
    return _this;
  }

  /**
   * @method
   */


  _createClass(AX6UIFormatter, [{
    key: "init",
    value: function init() {

      // init 호출 여부
      this.initOnce();
    }

    /**
     * @method
     * @return {AX6UIFormatter}
     */

  }, {
    key: "initOnce",
    value: function initOnce() {
      if (this.initialized) return this;
      this.initialized = true;
    }

    /**
     * @method
     * @param {Object} opts
     * @param {Element} opts.target
     * @return {AX6UIFormatter}
     */

  }, {
    key: "bind",
    value: function bind(opts) {
      var formatterConfig = {},
          optIdx = void 0;

      // 사용자 포메터 체크
      this.customFormatter = AX6UIFormatter.getFormatter();

      _jqmin2.default.extend(true, formatterConfig, this.config);
      if (opts) _jqmin2.default.extend(true, formatterConfig, opts);
      opts = formatterConfig;

      if (!opts.target) {
        console.log(_AX6Info2.default.getError("ax6formatter", "401", "bind"));
        return this;
      }
      opts.$target = (0, _jqmin2.default)(opts.target);
      if (!opts.$target.get(0)) {
        console.log(_AX6Info2.default.getError("ax6formatter", "401", "can't found target element"));
        return this;
      }

      if (opts.$target.get(0).tagName == "INPUT") {
        opts.$input = opts.$target;
      } else {
        opts.$input = opts.$target.find('input[type="text"]');
        if (opts.$input.length > 1) {
          opts.$input.each(function () {
            opts.target = this;
            self.bind(opts);
          });
          return this;
        }
      }

      opts.$input = opts.$target.get(0).tagName == "INPUT" ? opts.$target : opts.$target.find('input[type="text"]');

      if (!opts.id) opts.id = opts.$input.data("ax6-formatter");

      if (!opts.id) {
        opts.id = 'ax6-formatter-' + _AX6UICore3.default.getInstanceId();
        opts.$input.data("ax6-formatter", opts.id);
      }
      optIdx = _AX6Util2.default.search(this.queue, function () {
        return this.id == opts.id;
      });

      if (optIdx === -1) {
        this.queue.push(opts);
        bindFormatterTarget.call(this, this.queue[this.queue.length - 1], this.queue.length - 1);
      } else {
        this.queue[optIdx] = opts;
        bindFormatterTarget.call(this, this.queue[optIdx], optIdx);
      }

      return this;
    }

    /**
     * @method
     * @return {AX6UIFormatter}
     */

  }, {
    key: "formatting",
    value: function formatting() {
      var queIdx = _AX6Util2.default.isNumber(boundID) ? boundID : getQueIdx.call(this, boundID);
      if (queIdx === -1) {
        var i = this.queue.length;
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

  }, {
    key: "unbind",
    value: function unbind(opts) {
      var self = this;
      var optIdx = void 0;

      if (!opts.target) {
        console.log(_AX6Info2.default.getError("ax6formatter", "401", "unbind"));
        return this;
      }
      opts.$target = (0, _jqmin2.default)(opts.target);

      if (opts.$target.get(0).tagName == "INPUT") {
        opts.$input = opts.$target;
      } else {
        opts.$input = opts.$target.find('input[type="text"]');
        if (opts.$input.length > 1) {
          opts.$input.each(function () {
            opts.target = this;
            self.unbind(opts);
          });
          return this;
        }
      }

      opts.$input = opts.$target.get(0).tagName == "INPUT" ? opts.$target : opts.$target.find('input[type="text"]');
      opts.id = opts.$input.data("ax6-formatter");

      if (opts.id) {
        optIdx = _AX6Util2.default.search(this.queue, function () {
          return this.id == opts.id;
        });

        unbindFormatterTarget.call(this, this.queue[optIdx]);
        this.queue.splice(optIdx, 1);
      }

      return this;
    }

    /**
     * @static
     * @param _formatter
     */

  }], [{
    key: "setFormatter",
    value: function setFormatter(_formatter) {
      return formatter = Object.assign(formatter, _formatter);
    }

    /**
     * @static
     * @return {{}}
     */

  }, {
    key: "getFormatter",
    value: function getFormatter() {
      return formatter || {};
    }

    /**
     * @static
     * @return {{}}
     */

  }, {
    key: "getCtrlKeys",
    value: function getCtrlKeys() {
      return _AX6UIFormatter_formatter2.default.ctrlKeys;
    }

    /**
     * @static
     * @return {{}}
     */

  }, {
    key: "getNumKeys",
    value: function getNumKeys() {
      return _AX6UIFormatter_formatter2.default.numKeys;
    }
  }]);

  return AX6UIFormatter;
}(_AX6UICore3.default);

exports.default = AX6UIFormatter;

/***/ }),

/***/ 68:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AX6Util = __webpack_require__(1);

var _AX6Util2 = _interopRequireDefault(_AX6Util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TODAY = new Date();

/**
 * @module AX6UIFormatter_formatter
 */

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

var numKeys = {
  '48': 1, '49': 1, '50': 1, '51': 1, '52': 1, '53': 1, '54': 1, '55': 1, '56': 1, '57': 1,
  '96': 1, '97': 1, '98': 1, '99': 1, '100': 1, '101': 1, '102': 1, '103': 1, '104': 1, '105': 1
};

var pattern_money = {
  getEnterableKeyCodes: function getEnterableKeyCodes(_opts) {
    var enterableKeyCodes = {
      '188': ','
    };
    if (_opts.patternArgument == "int") {
      // 소수점 입력 안됨
    } else {
      enterableKeyCodes['190'] = "."; // 소수점 입력 허용
    }
    return Object.assign(enterableKeyCodes, ctrlKeys, numKeys);
  },
  getPatternValue: function getPatternValue(_opts, optIdx, e, val, eType) {
    val = val.replace(/[^0-9^\.^\-]/g, "");
    var regExpPattern = new RegExp('([0-9])([0-9][0-9][0-9][,.])'),
        arrNumber = val.split('.'),
        returnValue = void 0;

    arrNumber[0] += '.';

    do {
      arrNumber[0] = arrNumber[0].replace(regExpPattern, '$1,$2');
    } while (regExpPattern.test(arrNumber[0]));

    if (arrNumber.length > 1) {
      if (_AX6Util2.default.isNumber(_opts.maxRound)) {
        returnValue = arrNumber[0] + _AX6Util2.default.left(arrNumber[1], _opts.maxRound);
      } else {
        returnValue = arrNumber.join('');
      }
    } else {
      returnValue = arrNumber[0].split('.')[0];
    }

    return returnValue;
  }
};

var pattern_number = {
  getEnterableKeyCodes: function getEnterableKeyCodes(_opts) {
    var enterableKeyCodes = {
      '190': '.',
      '110': '.'

    };
    return Object.assign(enterableKeyCodes, ctrlKeys, numKeys);
  },
  getPatternValue: function getPatternValue(_opts, optIdx, e, val, eType) {
    val = val.replace(/[^0-9^\.^\-]/g, "");
    var arrNumber = val.split('.'),
        returnValue = void 0;

    arrNumber[0] += ".";

    if (arrNumber.length > 1) {
      if (_AX6Util2.default.isNumber(_opts.maxRound)) {
        returnValue = arrNumber[0] + _AX6Util2.default.left(arrNumber[1], _opts.maxRound);
      } else {
        returnValue = arrNumber.join('');
      }
    } else {
      returnValue = arrNumber[0].split('.')[0];
    }

    return returnValue;
  }
};

var pattern_date = {
  getEnterableKeyCodes: function getEnterableKeyCodes(_opts) {
    var enterableKeyCodes = {
      '189': '-', '191': '/'
    };
    return Object.assign(enterableKeyCodes, ctrlKeys, numKeys);
  },
  getPatternValue: function getPatternValue(_opts, optIdx, e, val, eType) {
    val = val.replace(/\D/g, "");
    if (val == "") return val;
    var regExpPattern = /^([0-9]{4})\-?([0-9]{1,2})?\-?([0-9]{1,2})?.*$/;

    if (_opts.patternArgument == "time") {
      regExpPattern = /^([0-9]{4})\-?([0-9]{1,2})?\-?([0-9]{1,2})? ?([0-9]{1,2})?:?([0-9]{1,2})?:?([0-9]{1,2})?.*$/;
    } else if (_opts.patternArgument == "year") {
      regExpPattern = /^([0-9]{0,4})?.*$/;
    } else if (_opts.patternArgument == "month") {
      regExpPattern = /^([0-9]{4})\-?([0-9]{1,2})?.*$/;
    }

    var matchedPattern = val.match(regExpPattern),
        returnValue = "",
        inspectValue = function inspectValue(val, format, inspect, data) {
      var _val = {
        'Y': function Y(v) {
          if (typeof v == "undefined") v = TODAY.getFullYear();
          if (v == '' || v == '0000') v = TODAY.getFullYear();
          return v.length < 4 ? _AX6Util2.default.setDigit(v, 4) : v;
        },
        'M': function M(v) {
          if (typeof v == "undefined") v = TODAY.getMonth() + 1;
          return v > 12 ? 12 : v == 0 ? '01' : _AX6Util2.default.setDigit(v, 2);
        },
        'D': function D(v) {
          if (typeof v == "undefined") v = TODAY.getDate() + 1;
          var dLen = _AX6Util2.default.daysOfMonth(data[1], data[2] - 1);
          return v > dLen ? dLen : v == 0 ? '01' : _AX6Util2.default.setDigit(v, 2);
        },
        'h': function h(v) {
          if (!v) v = 0;
          return v > 23 ? 23 : _AX6Util2.default.setDigit(v, 2);
        },
        'm': function m(v) {
          if (!v) v = 0;
          return v > 59 ? 59 : _AX6Util2.default.setDigit(v, 2);
        },
        's': function s(v) {
          if (!v) v = 0;
          return v > 59 ? 59 : _AX6Util2.default.setDigit(v, 2);
        }
      };
      return inspect ? _val[format](val) : val;
    };

    returnValue = val.replace(regExpPattern, function (a, b) {
      var nval = [];

      if (_opts.patternArgument == "year") {
        nval.push(inspectValue(arguments[1], "Y", eType));
      } else if (_opts.patternArgument == "month") {
        nval.push(inspectValue(arguments[1], "Y", eType));
        if (arguments[2] || eType) nval.push('-' + inspectValue(arguments[2], "M", eType));
      } else if (_opts.patternArgument == "time") {
        nval.push(inspectValue(arguments[1], "Y", eType));
        if (arguments[2] || eType) nval.push('-' + inspectValue(arguments[2], "M", eType));
        if (arguments[3] || eType) nval.push('-' + inspectValue(arguments[3], "D", eType, arguments));
        if (arguments[4] || eType) nval.push(' ' + inspectValue(arguments[4], "h", eType));
        if (arguments[5] || eType) nval.push(':' + inspectValue(arguments[5], "m", eType));
        if (arguments[6] || eType) nval.push(':' + inspectValue(arguments[6], "s", eType));
      } else {
        nval.push(inspectValue(arguments[1], "Y", eType));
        if (arguments[2] || eType) nval.push('-' + inspectValue(arguments[2], "M", eType));
        if (arguments[3] || eType) nval.push('-' + inspectValue(arguments[3], "D", eType, arguments));
      }
      return nval.join('');
    });

    if (eType == 'blur' && !matchedPattern) {
      returnValue = function () {
        var nval = [];

        if (_opts.patternArgument == "year") {
          nval.push(inspectValue(0, "Y", eType));
        } else if (_opts.patternArgument == "month") {
          nval.push(inspectValue(0, "Y", eType));
          nval.push('-' + inspectValue(0, "M", eType));
        } else if (_opts.patternArgument == "time") {
          nval.push(inspectValue(0, "Y", eType));
          nval.push('-' + inspectValue(0, "M", eType));
          nval.push('-' + inspectValue(0, "D", eType, arguments));
          nval.push(' ' + inspectValue(0, "h", eType));
          nval.push(':' + inspectValue(0, "m", eType));
          nval.push(':' + inspectValue(0, "s", eType));
        } else {
          nval.push(inspectValue(0, "Y", eType));
          nval.push('-' + inspectValue(0, "M", eType));
          nval.push('-' + inspectValue(0, "D", eType, arguments));
        }
        return nval.join('');
      }();
    } else if (!matchedPattern) returnValue = returnValue.length > 4 ? _AX6Util2.default.left(returnValue, 4) : returnValue;

    return returnValue;
  }
};

var pattern_time = {
  getEnterableKeyCodes: function getEnterableKeyCodes(_opts) {
    var enterableKeyCodes = {
      '186': ':'
    };
    return Object.assign(enterableKeyCodes, ctrlKeys, numKeys);
  },
  getPatternValue: function getPatternValue(_opts, optIdx, e, val, eType) {
    val = val.replace(/\D/g, "");
    var regExpPattern = /^([0-9]{1,2})?:?([0-9]{1,2})?:?([0-9]{1,2})?.*$/;

    var matchedPattern = val.match(regExpPattern),
        returnValue = val.replace(regExpPattern, function (a, b) {
      var nval = [arguments[1]];
      if (arguments[2]) nval.push(':' + arguments[2]);
      if (arguments[3]) nval.push(':' + arguments[3]);
      return nval.join('');
    });

    if (!matchedPattern) returnValue = returnValue.length > 2 ? _AX6Util2.default.left(returnValue, 2) : returnValue;

    return returnValue;
  }
};

var pattern_bizno = {
  getEnterableKeyCodes: function getEnterableKeyCodes(_opts) {
    var enterableKeyCodes = {
      '189': '-'
    };
    return Object.assign(enterableKeyCodes, ctrlKeys, numKeys);
  },
  getPatternValue: function getPatternValue(_opts, optIdx, e, val, eType) {
    val = val.replace(/\D/g, "");
    var regExpPattern = /^([0-9]{3})\-?([0-9]{1,2})?\-?([0-9]{1,5})?.*$/,
        returnValue = val.replace(regExpPattern, function (a, b) {
      var nval = [arguments[1]];
      if (arguments[2]) nval.push(arguments[2]);
      if (arguments[3]) nval.push(arguments[3]);
      return nval.join("-");
    });

    return returnValue;
  }
};

var pattern_phone = {
  getEnterableKeyCodes: function getEnterableKeyCodes(_opts) {
    var enterableKeyCodes = {
      '189': '-', '188': ','
    };
    return Object.assign(enterableKeyCodes, ctrlKeys, numKeys);
  },
  getPatternValue: function getPatternValue(_opts, optIdx, e, val, eType) {
    val = val.replace(/\D/g, "");
    var regExpPattern3 = /^([0-9]{3})\-?([0-9]{1,4})?\-?([0-9]{1,4})?\-?([0-9]{1,4})?\-?([0-9]{1,4})?/;
    if (val.substr(0, 2) == "02") {
      regExpPattern3 = /^([0-9]{2})\-?([0-9]{1,4})?\-?([0-9]{1,4})?\-?([0-9]{1,4})?\-?([0-9]{1,4})?/;
    }

    var returnValue = val.replace(regExpPattern3, function (a, b) {
      var nval = [arguments[1]];
      if (arguments[2]) nval.push(arguments[2]);
      if (arguments[3]) nval.push(arguments[3]);
      if (arguments[4]) nval.push(arguments[4]);
      if (arguments[5]) nval.push(arguments[5]);
      return nval.join("-");
    });
    return returnValue;
  }
};

var pattern_credit = {
  getEnterableKeyCodes: function getEnterableKeyCodes(_opts) {
    var enterableKeyCodes = {
      '189': '-'
    };
    return Object.assign(enterableKeyCodes, ctrlKeys, numKeys);
  },
  getPatternValue: function getPatternValue(_opts, optIdx, e, val, eType) {
    val = val.replace(/\D/g, "").substring(0, 16);

    var regExpPattern3 = /^([0-9]{4})\-?([0-9]{4})?\-?([0-9]{4})?\-?([0-9]{4})?/,
        returnValue = val.replace(regExpPattern3, function (a, b) {
      var nval = [arguments[1]];
      if (arguments[2]) nval.push(arguments[2]);
      if (arguments[3]) nval.push(arguments[3]);
      if (arguments[4]) nval.push(arguments[4]);
      return nval.join("-");
    });
    return returnValue;
  }
};

var pattern_custom = {
  getEnterableKeyCodes: function getEnterableKeyCodes(_opts) {
    if (_opts.getEnterableKeyCodes) {
      return _opts.getEnterableKeyCodes.call(_opts, { $input: _opts.$input });
    } else {
      return null;
    }
  },
  getPatternValue: function getPatternValue(_opts, optIdx, e, val, eType) {
    if (_opts.getPatternValue) {
      return _opts.getPatternValue.call(_opts, { event: e, $input: _opts.$input, value: val });
    }
  }
};

exports.default = {
  /**
   * 컨트롤 keycodes
   * @example
   * ```js
   * let ctrlKeys = {
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
    "13": "KEY_RETURN",
    "39": "KEY_RIGHT",
    "16": "KEY_SHIFT",
    // "32": "KEY_SPACE",
    "9": "KEY_TAB",
    "38": "KEY_UP",
    "91": "KEY_WINDOW"
  };
   * ```
   */
  ctrlKeys: ctrlKeys,
  /**
   * 숫자키패드 keycodes
   * @example
   * ```js
   * let numKeys = {
    '48': 1, '49': 1, '50': 1, '51': 1, '52': 1, '53': 1, '54': 1, '55': 1, '56': 1, '57': 1,
    '96': 1, '97': 1, '98': 1, '99': 1, '100': 1, '101': 1, '102': 1, '103': 1, '104': 1, '105': 1
  };
   * ```
   */
  numKeys: numKeys,
  /**
   * 통화패턴
   */
  money: pattern_money,
  /**
   * 숫자패턴
   */
  number: pattern_number,
  /**
   * 날짜패턴
   */
  date: pattern_date,
  /**
   * 시간패턴
   */
  time: pattern_time,
  /**
   * 한국 사업자 번호 패턴
   */
  bizno: pattern_bizno,
  /**
   * 전화번호 패턴
   */
  phone: pattern_phone,
  credit: pattern_credit,
  /**
   * 사용자 정의 패턴 사용시
   */
  custom: pattern_custom
};

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZm9ybWF0dGVyLmpzIiwid2VicGFjazovLy8uLi9zcmMvQVg2VUlGb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9BWDZVSUZvcm1hdHRlci9BWDZVSUZvcm1hdHRlcl9mb3JtYXR0ZXIuanMiXSwibmFtZXMiOlsiaHRtbCIsImZuIiwibW9kdWxlUnVuIiwiJGJvZHkiLCJmb3JtYXR0ZXIiLCJiaW5kIiwidGFyZ2V0Iiwic2V0Rm9ybWF0dGVyIiwiZ2V0RW50ZXJhYmxlS2V5Q29kZXMiLCJfb3B0cyIsImVudGVyYWJsZUtleUNvZGVzIiwiT2JqZWN0IiwiYXNzaWduIiwiZ2V0Q3RybEtleXMiLCJnZXROdW1LZXlzIiwiZ2V0UGF0dGVyblZhbHVlIiwib3B0SWR4IiwiZSIsInZhbCIsImVUeXBlIiwicmVwbGFjZSIsInJlZ0V4cFBhdHRlcm4iLCJhIiwiYiIsIm52YWwiLCJhcmd1bWVudHMiLCJwdXNoIiwiam9pbiIsIm9uIiwiYnRuIiwiZ2V0QXR0cmlidXRlIiwicHJvY2Vzc29yIiwidW5iaW5kIiwibW9kdWxlRGVzdHJveSIsIm9mZiIsInNldFNlbGVjdGlvblJhbmdlIiwiaW5wdXQiLCJwb3MiLCJ2YWx1ZSIsImxlbmd0aCIsImZvY3VzIiwiY3JlYXRlVGV4dFJhbmdlIiwicmFuZ2UiLCJjb2xsYXBzZSIsIm1vdmVFbmQiLCJtb3ZlU3RhcnQiLCJzZWxlY3QiLCJzZWxlY3Rpb25TdGFydCIsInNlbGVjdGlvbkVuZCIsImZvcm1hdHRlckV2ZW50Iiwib3B0cyIsIiRpbnB1dCIsImRhdGEiLCJpc1N0b3AiLCJ3aGljaCIsIm1ldGFLZXkiLCJjdHJsS2V5Iiwic2hpZnRLZXkiLCJzdG9wRXZlbnQiLCJlbGVtIiwiZ2V0IiwiZWxlbUZvY3VzUG9zaXRpb24iLCJiZWZvcmVWYWx1ZSIsIm5ld1ZhbHVlIiwic2VsZWN0aW9uIiwic2VsZWN0aW9uTGVuZ3RoIiwiZG9jdW1lbnQiLCJjcmVhdGVSYW5nZSIsInRleHQiLCJwYXR0ZXJuIiwiY3VzdG9tRm9ybWF0dGVyIiwiY2FsbCIsInRyaWdnZXIiLCJfZm9yY2UiLCJyZW1vdmVEYXRhIiwiYmluZEZvcm1hdHRlclRhcmdldCIsIiR0YXJnZXQiLCJ0YWdOYW1lIiwiYXR0ciIsImZpbmQiLCJjb25zb2xlIiwibG9nIiwiZ2V0RXJyb3IiLCJyZSIsIm1hdGNoZWQiLCJtYXRjaCIsInBhdHRlcm5Bcmd1bWVudCIsInF1ZXVlIiwia2V5ZG93biIsImtleXVwIiwiYmx1ciIsInVuYmluZEZvcm1hdHRlclRhcmdldCIsImdldFF1ZUlkeCIsImJvdW5kSUQiLCJpc1N0cmluZyIsInNlYXJjaCIsImlkIiwiQVg2VUlGb3JtYXR0ZXIiLCJjb25maWciLCJhbmltYXRlVGltZSIsImV4dGVuZCIsIm9wZW5UaW1lciIsImNsb3NlVGltZXIiLCJpbml0IiwiaW5pdE9uY2UiLCJpbml0aWFsaXplZCIsImZvcm1hdHRlckNvbmZpZyIsImdldEZvcm1hdHRlciIsImVhY2giLCJzZWxmIiwiZ2V0SW5zdGFuY2VJZCIsInF1ZUlkeCIsImlzTnVtYmVyIiwiaSIsInNwbGljZSIsIl9mb3JtYXR0ZXIiLCJjdHJsS2V5cyIsIm51bUtleXMiLCJUT0RBWSIsIkRhdGUiLCJwYXR0ZXJuX21vbmV5IiwiUmVnRXhwIiwiYXJyTnVtYmVyIiwic3BsaXQiLCJyZXR1cm5WYWx1ZSIsInRlc3QiLCJtYXhSb3VuZCIsImxlZnQiLCJwYXR0ZXJuX251bWJlciIsInBhdHRlcm5fZGF0ZSIsIm1hdGNoZWRQYXR0ZXJuIiwiaW5zcGVjdFZhbHVlIiwiZm9ybWF0IiwiaW5zcGVjdCIsIl92YWwiLCJ2IiwiZ2V0RnVsbFllYXIiLCJzZXREaWdpdCIsImdldE1vbnRoIiwiZ2V0RGF0ZSIsImRMZW4iLCJkYXlzT2ZNb250aCIsInBhdHRlcm5fdGltZSIsInBhdHRlcm5fYml6bm8iLCJwYXR0ZXJuX3Bob25lIiwicmVnRXhwUGF0dGVybjMiLCJzdWJzdHIiLCJwYXR0ZXJuX2NyZWRpdCIsInN1YnN0cmluZyIsInBhdHRlcm5fY3VzdG9tIiwiZXZlbnQiLCJtb25leSIsIm51bWJlciIsImRhdGUiLCJ0aW1lIiwiYml6bm8iLCJwaG9uZSIsImNyZWRpdCIsImN1c3RvbSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0FBR0EsSUFBSUEsNnhEQUFKO0FBc0RBLElBQUlDLEtBQUs7QUFDUEMsYUFBVyxtQkFBVUMsS0FBVixFQUFpQjtBQUMxQixRQUFJQyxZQUFZLDhCQUFoQjs7QUFFQUEsY0FBVUMsSUFBVixDQUFlO0FBQ2JDLGNBQVEscUJBQUUsa0NBQUY7QUFESyxLQUFmO0FBR0FGLGNBQVVDLElBQVYsQ0FBZTtBQUNiQyxjQUFRLHFCQUFFLGtDQUFGO0FBREssS0FBZjtBQUdBRixjQUFVQyxJQUFWLENBQWU7QUFDYkMsY0FBUSxxQkFBRSw0QkFBRjtBQURLLEtBQWY7O0FBSUE7QUFDQSw2QkFBVUMsWUFBVixDQUF1QjtBQUNyQixtQkFBYTtBQUNYQyw4QkFBc0IsOEJBQVVDLEtBQVYsRUFBaUI7QUFDckMsY0FBSUMsb0JBQW9CO0FBQ3RCLG1CQUFPLEdBRGUsQ0FDWDtBQURXLFdBQXhCO0FBR0EsaUJBQU9DLE9BQU9DLE1BQVAsQ0FDTEYsaUJBREssRUFFTCx5QkFBVUcsV0FBVixFQUZLLEVBR0wseUJBQVVDLFVBQVYsRUFISyxDQUFQO0FBS0QsU0FWVTtBQVdYQyx5QkFBaUIseUJBQVVOLEtBQVYsRUFBaUJPLE1BQWpCLEVBQXlCQyxDQUF6QixFQUE0QkMsR0FBNUIsRUFBaUNDLEtBQWpDLEVBQXdDO0FBQ3ZERCxnQkFBTUEsSUFBSUUsT0FBSixDQUFZLEtBQVosRUFBbUIsRUFBbkIsQ0FBTjtBQUNBLGNBQUlDLGdCQUFnQix1REFBcEI7QUFDQSxpQkFBT0gsSUFBSUUsT0FBSixDQUFZQyxhQUFaLEVBQTJCLFVBQVVDLENBQVYsRUFBYUMsQ0FBYixFQUFnQjtBQUNoRCxnQkFBSUMsT0FBTyxDQUFDQyxVQUFVLENBQVYsQ0FBRCxDQUFYO0FBQ0EsZ0JBQUlBLFVBQVUsQ0FBVixDQUFKLEVBQWtC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c291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSBcImpxbWluXCI7XG5pbXBvcnQgRm9ybWF0dGVyIGZyb20gXCIuLi8uLi9zcmMvQVg2VUlGb3JtYXR0ZXJcIjtcblxuXG5sZXQgaHRtbCA9IGBcbjxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICA8ZGl2IGNsYXNzPVwiY29sIHMxMiBtNlwiPlxuICAgICAgICA8bGFiZWwgZm9yPVwibW9uZXlfZm9ybWF0dGVyXCI+TW9uZXkgRm9ybWF0dGVyPC9sYWJlbD5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJtb25leV9mb3JtYXR0ZXJcIiBkYXRhLWF4NmZvcm1hdHRlcj1cIm1vbmV5XCIgdmFsdWU9XCJcIiAvPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJjb2wgczEyIG02XCI+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG5cIiBkYXRhLWJ0bj1cImJpbmQtbW9uZXlcIj5iaW5kPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG5cIiBkYXRhLWJ0bj1cInVuYmluZC1tb25leVwiPnVuYmluZDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuPC9kaXY+XG5cbjxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICA8ZGl2IGNsYXNzPVwiY29sIHMxMlwiPlxuICAgICAgICA8bGFiZWwgZm9yPVwibW9uZXlfaW50X2Zvcm1hdHRlclwiPk1vbmV5KGludCkgRm9ybWF0dGVyPC9sYWJlbD5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJtb25leV9pbnRfZm9ybWF0dGVyXCIgZGF0YS1heDZmb3JtYXR0ZXI9XCJtb25leShpbnQpXCIgdmFsdWU9XCJcIiAvPlxuICAgICAgICBcbiAgICA8L2Rpdj5cbjwvZGl2PlxuXG48ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgPGRpdiBjbGFzcz1cImNvbCBzMTIgbTZcIj5cbiAgICAgICAgPGxhYmVsIGZvcj1cImRhdGVfZm9ybWF0dGVyXCI+RGF0ZSBGb3JtYXR0ZXI8L2xhYmVsPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImRhdGVfZm9ybWF0dGVyXCIgZGF0YS1heDZmb3JtYXR0ZXI9XCJkYXRlXCIgdmFsdWU9XCJcIiAvPlxuICAgICAgICBcbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY29sIHMxMiBtNlwiPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuXCIgZGF0YS1idG49XCJiaW5kLWRhdGVcIj5iaW5kPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG5cIiBkYXRhLWJ0bj1cInVuYmluZC1kYXRlXCI+dW5iaW5kPC9idXR0b24+XG4gICAgPC9kaXY+XG48L2Rpdj5cblxuPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgIDxkaXYgY2xhc3M9XCJjb2wgczEyXCI+XG4gICAgICAgIDxsYWJlbCBmb3I9XCJkYXRlX3RpbWVfZm9ybWF0dGVyXCI+RGF0ZSh0aW1lKSBGb3JtYXR0ZXI8L2xhYmVsPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImRhdGVfdGltZV9mb3JtYXR0ZXJcIiBkYXRhLWF4NmZvcm1hdHRlcj1cImRhdGUodGltZSlcIiB2YWx1ZT1cIlwiIC8+XG4gICAgICAgIFxuICAgIDwvZGl2PlxuPC9kaXY+XG5cbjxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICA8ZGl2IGNsYXNzPVwiY29sIHMxMlwiPlxuICAgICAgICA8bGFiZWwgZm9yPVwidGltZV9mb3JtYXR0ZXJcIj5UaW1lIEZvcm1hdHRlcjwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwidGltZV9mb3JtYXR0ZXJcIiBkYXRhLWF4NmZvcm1hdHRlcj1cInRpbWVcIiB2YWx1ZT1cIlwiIC8+XG4gICAgPC9kaXY+XG48L2Rpdj5cblxuPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgIDxkaXYgY2xhc3M9XCJjb2wgczEyXCI+XG4gICAgICAgIDxsYWJlbCBmb3I9XCJteV9mb3JtYXR0ZXJcIj5teVBhdHRlcm48L2xhYmVsPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cIm15X2Zvcm1hdHRlclwiIGRhdGEtYXg2Zm9ybWF0dGVyPVwibXlQYXR0ZXJuXCIgdmFsdWU9XCJcIiAvPlxuICAgIDwvZGl2PlxuPC9kaXY+XG5gO1xubGV0IGZuID0ge1xuICBtb2R1bGVSdW46IGZ1bmN0aW9uICgkYm9keSkge1xuICAgIGxldCBmb3JtYXR0ZXIgPSBuZXcgRm9ybWF0dGVyKCk7XG5cbiAgICBmb3JtYXR0ZXIuYmluZCh7XG4gICAgICB0YXJnZXQ6ICQoJ1tkYXRhLWF4NmZvcm1hdHRlcj1cIm1vbmV5KGludClcIl0nKVxuICAgIH0pO1xuICAgIGZvcm1hdHRlci5iaW5kKHtcbiAgICAgIHRhcmdldDogJCgnW2RhdGEtYXg2Zm9ybWF0dGVyPVwiZGF0ZSh0aW1lKVwiXScpXG4gICAgfSk7XG4gICAgZm9ybWF0dGVyLmJpbmQoe1xuICAgICAgdGFyZ2V0OiAkKCdbZGF0YS1heDZmb3JtYXR0ZXI9XCJ0aW1lXCJdJylcbiAgICB9KTtcblxuICAgIC8vIOyCrOyaqeyekCDsoJXsnZgg7Y+s66mn7YSwIOygleydmFxuICAgIEZvcm1hdHRlci5zZXRGb3JtYXR0ZXIoe1xuICAgICAgXCJteVBhdHRlcm5cIjoge1xuICAgICAgICBnZXRFbnRlcmFibGVLZXlDb2RlczogZnVuY3Rpb24gKF9vcHRzKSB7XG4gICAgICAgICAgbGV0IGVudGVyYWJsZUtleUNvZGVzID0ge1xuICAgICAgICAgICAgJzE4OSc6ICctJyAvLyBldmVudEtleUNvZGVcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKFxuICAgICAgICAgICAgZW50ZXJhYmxlS2V5Q29kZXMsXG4gICAgICAgICAgICBGb3JtYXR0ZXIuZ2V0Q3RybEtleXMoKSxcbiAgICAgICAgICAgIEZvcm1hdHRlci5nZXROdW1LZXlzKClcbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICBnZXRQYXR0ZXJuVmFsdWU6IGZ1bmN0aW9uIChfb3B0cywgb3B0SWR4LCBlLCB2YWwsIGVUeXBlKSB7XG4gICAgICAgICAgdmFsID0gdmFsLnJlcGxhY2UoL1xcRC9nLCBcIlwiKTtcbiAgICAgICAgICBsZXQgcmVnRXhwUGF0dGVybiA9IC9eKFswLTldezJ9KVxcLT8oWzAtOV17Mn0pP1xcLT8oWzAtOV17Mn0pP1xcLT8oWzAtOV17Mn0pPy87XG4gICAgICAgICAgcmV0dXJuIHZhbC5yZXBsYWNlKHJlZ0V4cFBhdHRlcm4sIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICBsZXQgbnZhbCA9IFthcmd1bWVudHNbMV1dO1xuICAgICAgICAgICAgaWYgKGFyZ3VtZW50c1syXSkgbnZhbC5wdXNoKGFyZ3VtZW50c1syXSk7XG4gICAgICAgICAgICBpZiAoYXJndW1lbnRzWzNdKSBudmFsLnB1c2goYXJndW1lbnRzWzNdKTtcbiAgICAgICAgICAgIGlmIChhcmd1bWVudHNbNF0pIG52YWwucHVzaChhcmd1bWVudHNbNF0pO1xuICAgICAgICAgICAgcmV0dXJuIG52YWwuam9pbihcIi1cIik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGZvcm1hdHRlci5iaW5kKHtcbiAgICAgIHRhcmdldDogJCgnW2RhdGEtYXg2Zm9ybWF0dGVyPVwibXlQYXR0ZXJuXCJdJylcbiAgICB9KTtcblxuICAgICRib2R5Lm9uKFwiY2xpY2tcIiwgJ1tkYXRhLWJ0bl0nLCBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgYnRuID0gdGhpcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWJ0blwiKTtcbiAgICAgIGxldCBwcm9jZXNzb3IgPSB7XG4gICAgICAgIFwiYmluZC1tb25leVwiKCkge1xuICAgICAgICAgIGZvcm1hdHRlci5iaW5kKHtcbiAgICAgICAgICAgIHRhcmdldDogJCgnW2RhdGEtYXg2Zm9ybWF0dGVyPVwibW9uZXlcIl0nKVxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBcInVuYmluZC1tb25leVwiKCkge1xuICAgICAgICAgIGZvcm1hdHRlci51bmJpbmQoe1xuICAgICAgICAgICAgdGFyZ2V0OiAkKCdbZGF0YS1heDZmb3JtYXR0ZXI9XCJtb25leVwiXScpXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIFwiYmluZC1kYXRlXCIoKSB7XG4gICAgICAgICAgZm9ybWF0dGVyLmJpbmQoe1xuICAgICAgICAgICAgdGFyZ2V0OiAkKCdbZGF0YS1heDZmb3JtYXR0ZXI9XCJkYXRlXCJdJylcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgXCJ1bmJpbmQtZGF0ZVwiKCkge1xuICAgICAgICAgIGZvcm1hdHRlci51bmJpbmQoe1xuICAgICAgICAgICAgdGFyZ2V0OiAkKCdbZGF0YS1heDZmb3JtYXR0ZXI9XCJkYXRlXCJdJylcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHByb2Nlc3NvcltidG5dKCk7XG4gICAgfSlcbiAgfSxcbiAgbW9kdWxlRGVzdHJveTogZnVuY3Rpb24gKCRib2R5KSB7XG4gICAgJGJvZHkub2ZmKFwiY2xpY2tcIik7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaHRtbDogaHRtbCxcbiAgZm46IGZuXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Zvcm1hdHRlci5qcyIsImltcG9ydCBqUXVlcnkgZnJvbSBcImpxbWluXCI7XG5pbXBvcnQgQVg2VUlDb3JlIGZyb20gXCIuL0FYNlVJQ29yZVwiO1xuaW1wb3J0IFUgZnJvbSBcIi4vQVg2VXRpbFwiO1xuaW1wb3J0IGluZm8gZnJvbSBcIi4vQVg2SW5mb1wiO1xuaW1wb3J0IEZPUk1BVFRFUiBmcm9tIFwiLi9BWDZVSUZvcm1hdHRlci9BWDZVSUZvcm1hdHRlcl9mb3JtYXR0ZXJcIjtcbi8qIH5+fn5+fn5+fn5+fn5+fn5+fiBlbmQgb2YgaW1wb3J0ICB+fn5+fn5+fn5+fn5+fn5+fn5+fiAqL1xuXG5sZXQgZm9ybWF0dGVyID0ge307XG5cbmNvbnN0IHNldFNlbGVjdGlvblJhbmdlID0gZnVuY3Rpb24gKGlucHV0LCBwb3MpIHtcbiAgaWYgKHR5cGVvZiBwb3MgPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHBvcyA9IGlucHV0LnZhbHVlLmxlbmd0aDtcbiAgfVxuICBpZiAoaW5wdXQuc2V0U2VsZWN0aW9uUmFuZ2UpIHtcbiAgICBpbnB1dC5mb2N1cygpO1xuICAgIGlucHV0LnNldFNlbGVjdGlvblJhbmdlKHBvcywgcG9zKTtcbiAgfVxuICBlbHNlIGlmIChpbnB1dC5jcmVhdGVUZXh0UmFuZ2UpIHtcbiAgICB2YXIgcmFuZ2UgPSBpbnB1dC5jcmVhdGVUZXh0UmFuZ2UoKTtcbiAgICByYW5nZS5jb2xsYXBzZSh0cnVlKTtcbiAgICByYW5nZS5tb3ZlRW5kKCdjaGFyYWN0ZXInLCBwb3MpO1xuICAgIHJhbmdlLm1vdmVTdGFydCgnY2hhcmFjdGVyJywgcG9zKTtcbiAgICByYW5nZS5zZWxlY3QoKTtcbiAgfVxuICBlbHNlIGlmIChpbnB1dC5zZWxlY3Rpb25TdGFydCkge1xuICAgIGlucHV0LmZvY3VzKCk7XG4gICAgaW5wdXQuc2VsZWN0aW9uU3RhcnQgPSBwb3M7XG4gICAgaW5wdXQuc2VsZWN0aW9uRW5kID0gcG9zO1xuICB9XG59O1xuY29uc3QgZm9ybWF0dGVyRXZlbnQgPSB7XG4gICdmb2N1cyc6IGZ1bmN0aW9uIChvcHRzLCBvcHRJZHgsIGUpIHtcbiAgICBpZiAoIW9wdHMuJGlucHV0LmRhdGEoXCJfX29yaWdpblZhbHVlX19cIikpIG9wdHMuJGlucHV0LmRhdGEoXCJfX29yaWdpblZhbHVlX19cIiwgb3B0cy4kaW5wdXQudmFsKCkpO1xuICB9LFxuICAvKiDtgqQg64uk7Jq0IOydtOuypO2KuOyXkOyEnCDsnoXroKXtlaAg7IiYIOyXhuuKlCDtgqQg7J6F66Cl7J2EIOuwqeyWtCAqL1xuICAna2V5ZG93bic6IGZ1bmN0aW9uIChvcHRzLCBvcHRJZHgsIGUpIHtcbiAgICBsZXQgaXNTdG9wID0gZmFsc2U7XG4gICAgaWYgKCFvcHRzLmVudGVyYWJsZUtleUNvZGVzKSB7XG5cbiAgICB9XG4gICAgZWxzZSBpZiAoZS53aGljaCAmJiBvcHRzLmVudGVyYWJsZUtleUNvZGVzW2Uud2hpY2hdKSB7XG5cbiAgICB9XG4gICAgZWxzZSBpZiAoIWUubWV0YUtleSAmJiAhZS5jdHJsS2V5ICYmICFlLnNoaWZ0S2V5KSB7XG4gICAgICAvL2NvbnNvbGUubG9nKGUud2hpY2gsIG9wdHMuZW50ZXJhYmxlS2V5Q29kZXMpO1xuICAgICAgaXNTdG9wID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGlzU3RvcCkgVS5zdG9wRXZlbnQoZSk7XG4gIH0sXG4gIC8qIO2CpCDsl4Ug7J2067Kk7Yq47JeQ7IScIO2MqO2EtOydhCDsoIHsmqkgKi9cbiAgJ2tleXVwJzogZnVuY3Rpb24gKG9wdHMsIG9wdElkeCwgZSkge1xuICAgIGxldCBlbGVtID0gb3B0cy4kaW5wdXQuZ2V0KDApLFxuICAgICAgZWxlbUZvY3VzUG9zaXRpb24sXG4gICAgICBiZWZvcmVWYWx1ZSxcbiAgICAgIG5ld1ZhbHVlLFxuICAgICAgc2VsZWN0aW9uLCBzZWxlY3Rpb25MZW5ndGg7XG5cbiAgICBpZiAoJ3NlbGVjdGlvblN0YXJ0JyBpbiBlbGVtKSB7XG4gICAgICAvLyBTdGFuZGFyZC1jb21wbGlhbnQgYnJvd3NlcnNcbiAgICAgIGVsZW1Gb2N1c1Bvc2l0aW9uID0gZWxlbS5zZWxlY3Rpb25TdGFydDtcbiAgICB9XG4gICAgZWxzZSBpZiAoZG9jdW1lbnQuc2VsZWN0aW9uKSB7XG4gICAgICAvLyBJRVxuICAgICAgLy9lbGVtLmZvY3VzKCk7XG4gICAgICBzZWxlY3Rpb24gPSBkb2N1bWVudC5zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKTtcbiAgICAgIHNlbGVjdGlvbkxlbmd0aCA9IGRvY3VtZW50LnNlbGVjdGlvbi5jcmVhdGVSYW5nZSgpLnRleHQubGVuZ3RoO1xuICAgICAgc2VsZWN0aW9uLm1vdmVTdGFydCgnY2hhcmFjdGVyJywgLWVsZW0udmFsdWUubGVuZ3RoKTtcbiAgICAgIGVsZW1Gb2N1c1Bvc2l0aW9uID0gc2VsZWN0aW9uLnRleHQubGVuZ3RoIC0gc2VsZWN0aW9uTGVuZ3RoO1xuICAgIH1cblxuICAgIGJlZm9yZVZhbHVlID0gZWxlbS52YWx1ZTtcbiAgICBpZiAob3B0cy5wYXR0ZXJuIGluIHRoaXMuY3VzdG9tRm9ybWF0dGVyKSB7XG4gICAgICBuZXdWYWx1ZSA9IHRoaXMuY3VzdG9tRm9ybWF0dGVyW29wdHMucGF0dGVybl0uZ2V0UGF0dGVyblZhbHVlLmNhbGwodGhpcywgb3B0cywgb3B0SWR4LCBlLCBlbGVtLnZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKG9wdHMucGF0dGVybiBpbiBGT1JNQVRURVIpIHtcbiAgICAgIG5ld1ZhbHVlID0gRk9STUFUVEVSW29wdHMucGF0dGVybl0uZ2V0UGF0dGVyblZhbHVlLmNhbGwodGhpcywgb3B0cywgb3B0SWR4LCBlLCBlbGVtLnZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3VmFsdWUgPSBiZWZvcmVWYWx1ZVxuICAgIH1cblxuICAgIGlmIChuZXdWYWx1ZSAhPSBiZWZvcmVWYWx1ZSkge1xuICAgICAgb3B0cy4kaW5wdXQudmFsKG5ld1ZhbHVlKS50cmlnZ2VyKFwiY2hhbmdlXCIpO1xuICAgICAgc2V0U2VsZWN0aW9uUmFuZ2UoZWxlbSwgZWxlbUZvY3VzUG9zaXRpb24gKyBuZXdWYWx1ZS5sZW5ndGggLSBiZWZvcmVWYWx1ZS5sZW5ndGgpO1xuICAgIH1cbiAgfSxcbiAgJ2JsdXInOiBmdW5jdGlvbiAob3B0cywgb3B0SWR4LCBlLCBfZm9yY2UpIHtcbiAgICBsZXQgZWxlbSA9IG9wdHMuJGlucHV0LmdldCgwKSxcbiAgICAgIGJlZm9yZVZhbHVlLFxuICAgICAgbmV3VmFsdWVcbiAgICA7XG5cbiAgICBvcHRzLiRpbnB1dC5yZW1vdmVEYXRhKFwiX19vcmlnaW5WYWx1ZV9fXCIpO1xuXG4gICAgYmVmb3JlVmFsdWUgPSBlbGVtLnZhbHVlO1xuICAgIGlmIChvcHRzLnBhdHRlcm4gaW4gdGhpcy5jdXN0b21Gb3JtYXR0ZXIpIHtcbiAgICAgIG5ld1ZhbHVlID0gdGhpcy5jdXN0b21Gb3JtYXR0ZXJbb3B0cy5wYXR0ZXJuXS5nZXRQYXR0ZXJuVmFsdWUuY2FsbCh0aGlzLCBvcHRzLCBvcHRJZHgsIGUsIGVsZW0udmFsdWUsICdibHVyJyk7XG4gICAgfSBlbHNlIGlmIChvcHRzLnBhdHRlcm4gaW4gRk9STUFUVEVSKSB7XG4gICAgICBuZXdWYWx1ZSA9IEZPUk1BVFRFUltvcHRzLnBhdHRlcm5dLmdldFBhdHRlcm5WYWx1ZS5jYWxsKHRoaXMsIG9wdHMsIG9wdElkeCwgZSwgZWxlbS52YWx1ZSwgJ2JsdXInKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3VmFsdWUgPSBiZWZvcmVWYWx1ZVxuICAgIH1cblxuICAgIGlmIChfZm9yY2UpIHtcbiAgICAgIG9wdHMuJGlucHV0LnZhbChuZXdWYWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChuZXdWYWx1ZSAhPSBiZWZvcmVWYWx1ZSkge1xuICAgICAgICBvcHRzLiRpbnB1dC52YWwobmV3VmFsdWUpLnRyaWdnZXIoXCJjaGFuZ2VcIik7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuY29uc3QgYmluZEZvcm1hdHRlclRhcmdldCA9IGZ1bmN0aW9uIChvcHRzLCBvcHRJZHgpIHtcbiAgaWYgKCFvcHRzLnBhdHRlcm4pIHtcbiAgICBpZiAob3B0cy4kdGFyZ2V0LmdldCgwKS50YWdOYW1lID09IFwiSU5QVVRcIikge1xuICAgICAgb3B0cy5wYXR0ZXJuID0gb3B0cy4kdGFyZ2V0XG4gICAgICAgIC5hdHRyKCdkYXRhLWF4NmZvcm1hdHRlcicpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIG9wdHMucGF0dGVybiA9IG9wdHMuJHRhcmdldFxuICAgICAgICAuZmluZCgnaW5wdXRbdHlwZT1cInRleHRcIl0nKVxuICAgICAgICAuYXR0cignZGF0YS1heDZmb3JtYXR0ZXInKTtcbiAgICB9XG4gICAgaWYgKCFvcHRzLnBhdHRlcm4pIHtcbiAgICAgIGNvbnNvbGUubG9nKGluZm8uZ2V0RXJyb3IoXCJheDZmb3JtYXR0ZXJcIiwgXCI1MDFcIiwgXCJiaW5kXCIpKTtcbiAgICAgIGNvbnNvbGUubG9nKG9wdHMudGFyZ2V0KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfVxuXG4gIGxldCByZSA9IC9bXlxcKF5cXCkpXSsvZ2ksXG4gICAgbWF0Y2hlZCA9IG9wdHMucGF0dGVybi5tYXRjaChyZSk7XG5cbiAgb3B0cy5wYXR0ZXJuID0gbWF0Y2hlZFswXTtcbiAgb3B0cy5wYXR0ZXJuQXJndW1lbnQgPSBtYXRjaGVkWzFdIHx8IFwiXCI7XG5cbiAgLy8g7ZWo7IiY7YOA7J6FXG4gIGlmIChvcHRzLnBhdHRlcm4gaW4gdGhpcy5jdXN0b21Gb3JtYXR0ZXIpIHtcbiAgICBvcHRzLmVudGVyYWJsZUtleUNvZGVzID0gdGhpcy5jdXN0b21Gb3JtYXR0ZXJbb3B0cy5wYXR0ZXJuXS5nZXRFbnRlcmFibGVLZXlDb2Rlcy5jYWxsKHRoaXMsIG9wdHMsIG9wdElkeCk7XG4gIH0gZWxzZSBpZiAob3B0cy5wYXR0ZXJuIGluIEZPUk1BVFRFUikge1xuICAgIG9wdHMuZW50ZXJhYmxlS2V5Q29kZXMgPSBGT1JNQVRURVJbb3B0cy5wYXR0ZXJuXS5nZXRFbnRlcmFibGVLZXlDb2Rlcy5jYWxsKHRoaXMsIG9wdHMsIG9wdElkeCk7XG4gIH1cblxuICBvcHRzLiRpbnB1dFxuICAgIC5vZmYoJ2ZvY3VzLmF4NmZvcm1hdHRlcicpXG4gICAgLm9uKCdmb2N1cy5heDZmb3JtYXR0ZXInLCBmb3JtYXR0ZXJFdmVudC5mb2N1cy5iaW5kKHRoaXMsIHRoaXMucXVldWVbb3B0SWR4XSwgb3B0SWR4KSlcbiAgICAub2ZmKCdrZXlkb3duLmF4NmZvcm1hdHRlcicpXG4gICAgLm9uKCdrZXlkb3duLmF4NmZvcm1hdHRlcicsIGZvcm1hdHRlckV2ZW50LmtleWRvd24uYmluZCh0aGlzLCB0aGlzLnF1ZXVlW29wdElkeF0sIG9wdElkeCkpXG4gICAgLm9mZigna2V5dXAuYXg2Zm9ybWF0dGVyJylcbiAgICAub24oJ2tleXVwLmF4NmZvcm1hdHRlcicsIGZvcm1hdHRlckV2ZW50LmtleXVwLmJpbmQodGhpcywgdGhpcy5xdWV1ZVtvcHRJZHhdLCBvcHRJZHgpKVxuICAgIC5vZmYoJ2JsdXIuYXg2Zm9ybWF0dGVyJylcbiAgICAub24oJ2JsdXIuYXg2Zm9ybWF0dGVyJywgZm9ybWF0dGVyRXZlbnQuYmx1ci5iaW5kKHRoaXMsIHRoaXMucXVldWVbb3B0SWR4XSwgb3B0SWR4KSk7XG5cbiAgZm9ybWF0dGVyRXZlbnQuYmx1ci5jYWxsKHRoaXMsIHRoaXMucXVldWVbb3B0SWR4XSwgb3B0SWR4KTtcblxuICByZXR1cm4gdGhpcztcbn07XG5jb25zdCB1bmJpbmRGb3JtYXR0ZXJUYXJnZXQgPSBmdW5jdGlvbiAob3B0cywgb3B0SWR4KSB7XG4gIG9wdHMuJGlucHV0XG4gICAgLm9mZignZm9jdXMuYXg2Zm9ybWF0dGVyJylcbiAgICAub2ZmKCdrZXlkb3duLmF4NmZvcm1hdHRlcicpXG4gICAgLm9mZigna2V5dXAuYXg2Zm9ybWF0dGVyJylcbiAgICAub2ZmKCdibHVyLmF4NmZvcm1hdHRlcicpO1xuXG4gIHJldHVybiB0aGlzO1xufTtcbmNvbnN0IGdldFF1ZUlkeCA9IGZ1bmN0aW9uIChib3VuZElEKSB7XG4gIGlmICghVS5pc1N0cmluZyhib3VuZElEKSkge1xuICAgIGJvdW5kSUQgPSBqUXVlcnkoYm91bmRJRCkuZGF0YShcImRhdGEtZm9ybWF0dGVyXCIpO1xuICB9XG4gIC8qXG4gICBpZiAoIVUuaXNTdHJpbmcoYm91bmRJRCkpIHtcbiAgIGNvbnNvbGUubG9nKGluZm8uZ2V0RXJyb3IoXCJheDZmb3JtYXR0ZXJcIiwgXCI0MDJcIiwgXCJnZXRRdWVJZHhcIikpO1xuICAgcmV0dXJuO1xuICAgfVxuICAgKi9cbiAgcmV0dXJuIFUuc2VhcmNoKHRoaXMucXVldWUsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5pZCA9PSBib3VuZElEO1xuICB9KTtcbn07XG4vKiB+fn5+fn5+fn5+fn5+fn5+fn4gZW5kIG9mIHByaXZhdGUgIH5+fn5+fn5+fn5+fn5+fn5+fn5+ICovXG5cbi8qKlxuICogQGNsYXNzXG4gKi9cbmNsYXNzIEFYNlVJRm9ybWF0dGVyIGV4dGVuZHMgQVg2VUlDb3JlIHtcbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gY29uZmlnXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbY29uZmlnLmZvcm1hdHRlcl1cbiAgICogQGV4YW1wbGVcbiAgICogYGBganNcbiAgICogdmFyIGZvcm1hdHRlciA9IG5ldyBGb3JtYXR0ZXIoKTtcbiAgICpcbiAgICogLy8gRXh0ZW5kIGZvcm1hdHRlclxuICAgKiB2YXIgbXlGb3JtYXR0ZXIgPSBuZXcgRm9ybWF0dGVyKHtcbiAgICAgKiAgZm9ybWF0dGVyOiB7XG4gICAgICogICAgICBcIm15c3R5bGVcIjoge1xuICAgICAqICAgICAgICAgIGdldEVudGVyYWJsZUtleUNvZGVzOiBmdW5jdGlvbiAoX29wdHMpIHtcbiAgICAgKiAgICAgICAgICAgICAgdmFyIGVudGVyYWJsZUtleUNvZGVzID0ge1xuICAgICAqICAgICAgICAgICAgICAgICAgJzE4OSc6ICctJyAvLyBldmVudEtleUNvZGVcbiAgICAgKiAgICAgICAgICAgICAgfTtcbiAgICAgKiAgICAgICAgICAgICAgcmV0dXJuIGpRdWVyeS5leHRlbmQoZW50ZXJhYmxlS2V5Q29kZXMsIHt9KTtcbiAgICAgKiAgICAgICAgICB9XG4gICAgICogICAgICAgICAgZ2V0UGF0dGVyblZhbHVlOiBmdW5jdGlvbiAoX29wdHMsIG9wdElkeCwgZSwgdmFsLCBlVHlwZSkge1xuICAgICAqICAgICAgICAgICAgICB2YWwgPSB2YWwucmVwbGFjZSgvXFxEL2csIFwiXCIpO1xuICAgICAqICAgICAgICAgICAgICB2YXIgcmVnRXhwUGF0dGVybiA9IC9eKFswLTldezJ9KVxcLT8oWzAtOV17Mn0pP1xcLT8oWzAtOV17Mn0pP1xcLT8oWzAtOV17Mn0pPy87XG4gICAgICogICAgICAgICAgICAgIHJldHVybiB2YWwucmVwbGFjZShyZWdFeHBQYXR0ZXJuLCBmdW5jdGlvbiAoYSwgYikge1xuICAgICAqICAgICAgICAgICAgICAgICAgdmFyIG52YWwgPSBbYXJndW1lbnRzWzFdXTtcbiAgICAgKiAgICAgICAgICAgICAgICAgIGlmIChhcmd1bWVudHNbMl0pIG52YWwucHVzaChhcmd1bWVudHNbMl0pO1xuICAgICAqICAgICAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50c1szXSkgbnZhbC5wdXNoKGFyZ3VtZW50c1szXSk7XG4gICAgICogICAgICAgICAgICAgICAgICBpZiAoYXJndW1lbnRzWzRdKSBudmFsLnB1c2goYXJndW1lbnRzWzRdKTtcbiAgICAgKiAgICAgICAgICAgICAgICAgIHJldHVybiBudmFsLmpvaW4oXCItXCIpO1xuICAgICAqICAgICAgICAgICAgICB9KTtcbiAgICAgKiAgICAgICAgICB9XG4gICAgICogICAgICB9XG4gICAgICogIH1cbiAgICAgKiB9KTtcbiAgICogYGBgXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgLyoqXG4gICAgICogQG1lbWJlciB7SlNPTn1cbiAgICAgKiBAcGFyYW0gY29uZmlnXG4gICAgICogQHBhcmFtIFtjb25maWcuYW5pbWF0ZVRpbWU9MjUwXVxuICAgICAqL1xuICAgIHRoaXMuY29uZmlnID0ge1xuICAgICAgYW5pbWF0ZVRpbWU6IDI1MFxuICAgIH07XG4gICAgalF1ZXJ5LmV4dGVuZCh0cnVlLCB0aGlzLmNvbmZpZywgY29uZmlnKTtcblxuICAgIC8vIOuppOuyhCDrs4DsiJgg7LSI6riw7ZmUXG4gICAgLyoqXG4gICAgICogQG1lbWJlclxuICAgICAqIEB0eXBlIHtBcnJheX1cbiAgICAgKi9cbiAgICB0aGlzLnF1ZXVlID0gW107XG4gICAgdGhpcy5vcGVuVGltZXIgPSBudWxsO1xuICAgIHRoaXMuY2xvc2VUaW1lciA9IG51bGw7XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqL1xuICBpbml0KCkge1xuXG4gICAgLy8gaW5pdCDtmLjstpwg7Jes67aAXG4gICAgdGhpcy5pbml0T25jZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQHJldHVybiB7QVg2VUlGb3JtYXR0ZXJ9XG4gICAqL1xuICBpbml0T25jZSgpIHtcbiAgICBpZiAodGhpcy5pbml0aWFsaXplZCkgcmV0dXJuIHRoaXM7XG4gICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICAgKiBAcGFyYW0ge0VsZW1lbnR9IG9wdHMudGFyZ2V0XG4gICAqIEByZXR1cm4ge0FYNlVJRm9ybWF0dGVyfVxuICAgKi9cbiAgYmluZChvcHRzKSB7XG4gICAgbGV0IGZvcm1hdHRlckNvbmZpZyA9IHt9LCBvcHRJZHg7XG5cbiAgICAvLyDsgqzsmqnsnpAg7Y+s66mU7YSwIOyytO2BrFxuICAgIHRoaXMuY3VzdG9tRm9ybWF0dGVyID0gQVg2VUlGb3JtYXR0ZXIuZ2V0Rm9ybWF0dGVyKCk7XG5cbiAgICBqUXVlcnkuZXh0ZW5kKHRydWUsIGZvcm1hdHRlckNvbmZpZywgdGhpcy5jb25maWcpO1xuICAgIGlmIChvcHRzKSBqUXVlcnkuZXh0ZW5kKHRydWUsIGZvcm1hdHRlckNvbmZpZywgb3B0cyk7XG4gICAgb3B0cyA9IGZvcm1hdHRlckNvbmZpZztcblxuICAgIGlmICghb3B0cy50YXJnZXQpIHtcbiAgICAgIGNvbnNvbGUubG9nKGluZm8uZ2V0RXJyb3IoXCJheDZmb3JtYXR0ZXJcIiwgXCI0MDFcIiwgXCJiaW5kXCIpKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBvcHRzLiR0YXJnZXQgPSBqUXVlcnkob3B0cy50YXJnZXQpO1xuICAgIGlmKCFvcHRzLiR0YXJnZXQuZ2V0KDApKXtcbiAgICAgIGNvbnNvbGUubG9nKGluZm8uZ2V0RXJyb3IoXCJheDZmb3JtYXR0ZXJcIiwgXCI0MDFcIiwgXCJjYW4ndCBmb3VuZCB0YXJnZXQgZWxlbWVudFwiKSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpZiAob3B0cy4kdGFyZ2V0LmdldCgwKS50YWdOYW1lID09IFwiSU5QVVRcIikge1xuICAgICAgb3B0cy4kaW5wdXQgPSBvcHRzLiR0YXJnZXQ7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgb3B0cy4kaW5wdXQgPSBvcHRzLiR0YXJnZXQuZmluZCgnaW5wdXRbdHlwZT1cInRleHRcIl0nKTtcbiAgICAgIGlmIChvcHRzLiRpbnB1dC5sZW5ndGggPiAxKSB7XG4gICAgICAgIG9wdHMuJGlucHV0LmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIG9wdHMudGFyZ2V0ID0gdGhpcztcbiAgICAgICAgICBzZWxmLmJpbmQob3B0cyk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBvcHRzLiRpbnB1dCA9IChvcHRzLiR0YXJnZXQuZ2V0KDApLnRhZ05hbWUgPT0gXCJJTlBVVFwiKSA/IG9wdHMuJHRhcmdldCA6IG9wdHMuJHRhcmdldC5maW5kKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpO1xuXG4gICAgaWYgKCFvcHRzLmlkKSBvcHRzLmlkID0gb3B0cy4kaW5wdXQuZGF0YShcImF4Ni1mb3JtYXR0ZXJcIik7XG5cbiAgICBpZiAoIW9wdHMuaWQpIHtcbiAgICAgIG9wdHMuaWQgPSAnYXg2LWZvcm1hdHRlci0nICsgQVg2VUlDb3JlLmdldEluc3RhbmNlSWQoKTtcbiAgICAgIG9wdHMuJGlucHV0LmRhdGEoXCJheDYtZm9ybWF0dGVyXCIsIG9wdHMuaWQpO1xuICAgIH1cbiAgICBvcHRJZHggPSBVLnNlYXJjaCh0aGlzLnF1ZXVlLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5pZCA9PSBvcHRzLmlkO1xuICAgIH0pO1xuXG4gICAgaWYgKG9wdElkeCA9PT0gLTEpIHtcbiAgICAgIHRoaXMucXVldWUucHVzaChvcHRzKTtcbiAgICAgIGJpbmRGb3JtYXR0ZXJUYXJnZXQuY2FsbCh0aGlzLCB0aGlzLnF1ZXVlW3RoaXMucXVldWUubGVuZ3RoIC0gMV0sIHRoaXMucXVldWUubGVuZ3RoIC0gMSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5xdWV1ZVtvcHRJZHhdID0gb3B0cztcbiAgICAgIGJpbmRGb3JtYXR0ZXJUYXJnZXQuY2FsbCh0aGlzLCB0aGlzLnF1ZXVlW29wdElkeF0sIG9wdElkeCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAcmV0dXJuIHtBWDZVSUZvcm1hdHRlcn1cbiAgICovXG4gIGZvcm1hdHRpbmcoKSB7XG4gICAgbGV0IHF1ZUlkeCA9IChVLmlzTnVtYmVyKGJvdW5kSUQpKSA/IGJvdW5kSUQgOiBnZXRRdWVJZHguY2FsbCh0aGlzLCBib3VuZElEKTtcbiAgICBpZiAocXVlSWR4ID09PSAtMSkge1xuICAgICAgbGV0IGkgPSB0aGlzLnF1ZXVlLmxlbmd0aDtcbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgZm9ybWF0dGVyRXZlbnQuYmx1ci5jYWxsKHRoaXMsIHRoaXMucXVldWVbaV0sIGksIG51bGwsIHRydWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3JtYXR0ZXJFdmVudC5ibHVyLmNhbGwodGhpcywgdGhpcy5xdWV1ZVtxdWVJZHhdLCBxdWVJZHgsIG51bGwsIHRydWUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBwYXJhbSBvcHRzXG4gICAqIEByZXR1cm4ge0FYNlVJRm9ybWF0dGVyfVxuICAgKi9cbiAgdW5iaW5kKG9wdHMpIHtcbiAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgbGV0IG9wdElkeDtcblxuICAgIGlmICghb3B0cy50YXJnZXQpIHtcbiAgICAgIGNvbnNvbGUubG9nKGluZm8uZ2V0RXJyb3IoXCJheDZmb3JtYXR0ZXJcIiwgXCI0MDFcIiwgXCJ1bmJpbmRcIikpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIG9wdHMuJHRhcmdldCA9IGpRdWVyeShvcHRzLnRhcmdldCk7XG5cbiAgICBpZiAob3B0cy4kdGFyZ2V0LmdldCgwKS50YWdOYW1lID09IFwiSU5QVVRcIikge1xuICAgICAgb3B0cy4kaW5wdXQgPSBvcHRzLiR0YXJnZXQ7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgb3B0cy4kaW5wdXQgPSBvcHRzLiR0YXJnZXQuZmluZCgnaW5wdXRbdHlwZT1cInRleHRcIl0nKTtcbiAgICAgIGlmIChvcHRzLiRpbnB1dC5sZW5ndGggPiAxKSB7XG4gICAgICAgIG9wdHMuJGlucHV0LmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIG9wdHMudGFyZ2V0ID0gdGhpcztcbiAgICAgICAgICBzZWxmLnVuYmluZChvcHRzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgIH1cblxuICAgIG9wdHMuJGlucHV0ID0gKG9wdHMuJHRhcmdldC5nZXQoMCkudGFnTmFtZSA9PSBcIklOUFVUXCIpID8gb3B0cy4kdGFyZ2V0IDogb3B0cy4kdGFyZ2V0LmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJyk7XG4gICAgb3B0cy5pZCA9IG9wdHMuJGlucHV0LmRhdGEoXCJheDYtZm9ybWF0dGVyXCIpO1xuXG4gICAgaWYgKG9wdHMuaWQpIHtcbiAgICAgIG9wdElkeCA9IFUuc2VhcmNoKHRoaXMucXVldWUsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaWQgPT0gb3B0cy5pZDtcbiAgICAgIH0pO1xuXG4gICAgICB1bmJpbmRGb3JtYXR0ZXJUYXJnZXQuY2FsbCh0aGlzLCB0aGlzLnF1ZXVlW29wdElkeF0pO1xuICAgICAgdGhpcy5xdWV1ZS5zcGxpY2Uob3B0SWR4LCAxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAc3RhdGljXG4gICAqIEBwYXJhbSBfZm9ybWF0dGVyXG4gICAqL1xuICBzdGF0aWMgc2V0Rm9ybWF0dGVyKF9mb3JtYXR0ZXIpIHtcbiAgICByZXR1cm4gZm9ybWF0dGVyID0gT2JqZWN0LmFzc2lnbihmb3JtYXR0ZXIsIF9mb3JtYXR0ZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBzdGF0aWNcbiAgICogQHJldHVybiB7e319XG4gICAqL1xuICBzdGF0aWMgZ2V0Rm9ybWF0dGVyKCkge1xuICAgIHJldHVybiBmb3JtYXR0ZXIgfHwge307XG4gIH1cblxuICAvKipcbiAgICogQHN0YXRpY1xuICAgKiBAcmV0dXJuIHt7fX1cbiAgICovXG4gIHN0YXRpYyBnZXRDdHJsS2V5cygpe1xuICAgIHJldHVybiBGT1JNQVRURVIuY3RybEtleXM7XG4gIH1cblxuICAvKipcbiAgICogQHN0YXRpY1xuICAgKiBAcmV0dXJuIHt7fX1cbiAgICovXG4gIHN0YXRpYyBnZXROdW1LZXlzKCl7XG4gICAgcmV0dXJuIEZPUk1BVFRFUi5udW1LZXlzO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFYNlVJRm9ybWF0dGVyO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9zcmMvQVg2VUlGb3JtYXR0ZXIuanMiLCJpbXBvcnQgVSBmcm9tIFwiLi4vQVg2VXRpbFwiO1xuXG5sZXQgVE9EQVkgPSBuZXcgRGF0ZSgpO1xuXG4vKipcbiAqIEBtb2R1bGUgQVg2VUlGb3JtYXR0ZXJfZm9ybWF0dGVyXG4gKi9cblxubGV0IGN0cmxLZXlzID0ge1xuICBcIjE4XCI6IFwiS0VZX0FMVFwiLFxuICBcIjhcIjogXCJLRVlfQkFDS1NQQUNFXCIsXG4gIFwiMTdcIjogXCJLRVlfQ09OVFJPTFwiLFxuICBcIjQ2XCI6IFwiS0VZX0RFTEVURVwiLFxuICBcIjQwXCI6IFwiS0VZX0RPV05cIixcbiAgXCIzNVwiOiBcIktFWV9FTkRcIixcbiAgXCIxODdcIjogXCJLRVlfRVFVQUxcIixcbiAgXCIyN1wiOiBcIktFWV9FU0NcIixcbiAgXCIzNlwiOiBcIktFWV9IT01FXCIsXG4gIFwiNDVcIjogXCJLRVlfSU5TRVJUXCIsXG4gIFwiMzdcIjogXCJLRVlfTEVGVFwiLFxuICBcIjE4OVwiOiBcIktFWV9NSU5VU1wiLFxuICBcIjM0XCI6IFwiS0VZX1BBR0VET1dOXCIsXG4gIFwiMzNcIjogXCJLRVlfUEFHRVVQXCIsXG4gIC8vIFwiMTkwXCI6IFwiS0VZX1BFUklPRFwiLFxuICBcIjEzXCI6IFwiS0VZX1JFVFVSTlwiLFxuICBcIjM5XCI6IFwiS0VZX1JJR0hUXCIsXG4gIFwiMTZcIjogXCJLRVlfU0hJRlRcIixcbiAgLy8gXCIzMlwiOiBcIktFWV9TUEFDRVwiLFxuICBcIjlcIjogXCJLRVlfVEFCXCIsXG4gIFwiMzhcIjogXCJLRVlfVVBcIixcbiAgXCI5MVwiOiBcIktFWV9XSU5ET1dcIlxuICAvL1wiMTA3XCIgOiBcIk5VTVBBRF9BRERcIixcbiAgLy9cIjE5NFwiIDogXCJOVU1QQURfQ09NTUFcIixcbiAgLy9cIjExMFwiIDogXCJOVU1QQURfREVDSU1BTFwiLFxuICAvL1wiMTExXCIgOiBcIk5VTVBBRF9ESVZJREVcIixcbiAgLy9cIjEyXCIgOiBcIk5VTVBBRF9FUVVBTFwiLFxuICAvL1wiMTA2XCIgOiBcIk5VTVBBRF9NVUxUSVBMWVwiLFxuICAvL1wiMTA5XCIgOiBcIk5VTVBBRF9TVUJUUkFDVFwiXG59O1xuXG5sZXQgbnVtS2V5cyA9IHtcbiAgJzQ4JzogMSwgJzQ5JzogMSwgJzUwJzogMSwgJzUxJzogMSwgJzUyJzogMSwgJzUzJzogMSwgJzU0JzogMSwgJzU1JzogMSwgJzU2JzogMSwgJzU3JzogMSxcbiAgJzk2JzogMSwgJzk3JzogMSwgJzk4JzogMSwgJzk5JzogMSwgJzEwMCc6IDEsICcxMDEnOiAxLCAnMTAyJzogMSwgJzEwMyc6IDEsICcxMDQnOiAxLCAnMTA1JzogMVxufTtcblxubGV0IHBhdHRlcm5fbW9uZXkgPSB7XG4gIGdldEVudGVyYWJsZUtleUNvZGVzOiBmdW5jdGlvbiAoX29wdHMpIHtcbiAgICBsZXQgZW50ZXJhYmxlS2V5Q29kZXMgPSB7XG4gICAgICAnMTg4JzogJywnXG4gICAgfTtcbiAgICBpZiAoX29wdHMucGF0dGVybkFyZ3VtZW50ID09IFwiaW50XCIpIHtcbiAgICAgIC8vIOyGjOyImOygkCDsnoXroKUg7JWI65CoXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZW50ZXJhYmxlS2V5Q29kZXNbJzE5MCddID0gXCIuXCI7IC8vIOyGjOyImOygkCDsnoXroKUg7ZeI7JqpXG4gICAgfVxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKGVudGVyYWJsZUtleUNvZGVzLCBjdHJsS2V5cywgbnVtS2V5cyk7XG4gIH0sXG4gIGdldFBhdHRlcm5WYWx1ZTogZnVuY3Rpb24gKF9vcHRzLCBvcHRJZHgsIGUsIHZhbCwgZVR5cGUpIHtcbiAgICB2YWwgPSB2YWwucmVwbGFjZSgvW14wLTleXFwuXlxcLV0vZywgXCJcIik7XG4gICAgbGV0IHJlZ0V4cFBhdHRlcm4gPSBuZXcgUmVnRXhwKCcoWzAtOV0pKFswLTldWzAtOV1bMC05XVssLl0pJyksXG4gICAgICBhcnJOdW1iZXIgPSB2YWwuc3BsaXQoJy4nKSxcbiAgICAgIHJldHVyblZhbHVlO1xuXG4gICAgYXJyTnVtYmVyWzBdICs9ICcuJztcblxuICAgIGRvIHtcbiAgICAgIGFyck51bWJlclswXSA9IGFyck51bWJlclswXS5yZXBsYWNlKHJlZ0V4cFBhdHRlcm4sICckMSwkMicpO1xuICAgIH0gd2hpbGUgKHJlZ0V4cFBhdHRlcm4udGVzdChhcnJOdW1iZXJbMF0pKTtcblxuICAgIGlmIChhcnJOdW1iZXIubGVuZ3RoID4gMSkge1xuICAgICAgaWYgKFUuaXNOdW1iZXIoX29wdHMubWF4Um91bmQpKSB7XG4gICAgICAgIHJldHVyblZhbHVlID0gYXJyTnVtYmVyWzBdICsgVS5sZWZ0KGFyck51bWJlclsxXSwgX29wdHMubWF4Um91bmQpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJldHVyblZhbHVlID0gYXJyTnVtYmVyLmpvaW4oJycpO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVyblZhbHVlID0gYXJyTnVtYmVyWzBdLnNwbGl0KCcuJylbMF07XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICB9XG59O1xuXG5sZXQgcGF0dGVybl9udW1iZXIgPSB7XG4gIGdldEVudGVyYWJsZUtleUNvZGVzOiBmdW5jdGlvbiBnZXRFbnRlcmFibGVLZXlDb2Rlcyhfb3B0cykge1xuICAgIGxldCBlbnRlcmFibGVLZXlDb2RlcyA9IHtcbiAgICAgICcxOTAnOiAnLicsXG4gICAgICAnMTEwJzogJy4nXG5cbiAgICB9O1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKGVudGVyYWJsZUtleUNvZGVzLCBjdHJsS2V5cywgbnVtS2V5cyk7XG4gIH0sXG4gIGdldFBhdHRlcm5WYWx1ZTogZnVuY3Rpb24gKF9vcHRzLCBvcHRJZHgsIGUsIHZhbCwgZVR5cGUpIHtcbiAgICB2YWwgPSB2YWwucmVwbGFjZSgvW14wLTleXFwuXlxcLV0vZywgXCJcIik7XG4gICAgbGV0IGFyck51bWJlciA9IHZhbC5zcGxpdCgnLicpLFxuICAgICAgcmV0dXJuVmFsdWVcbiAgICA7XG5cbiAgICBhcnJOdW1iZXJbMF0gKz0gXCIuXCI7XG5cbiAgICBpZiAoYXJyTnVtYmVyLmxlbmd0aCA+IDEpIHtcbiAgICAgIGlmIChVLmlzTnVtYmVyKF9vcHRzLm1heFJvdW5kKSkge1xuICAgICAgICByZXR1cm5WYWx1ZSA9IGFyck51bWJlclswXSArIFUubGVmdChhcnJOdW1iZXJbMV0sIF9vcHRzLm1heFJvdW5kKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZXR1cm5WYWx1ZSA9IGFyck51bWJlci5qb2luKCcnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm5WYWx1ZSA9IGFyck51bWJlclswXS5zcGxpdCgnLicpWzBdO1xuICAgIH1cblxuICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgfVxufTtcblxubGV0IHBhdHRlcm5fZGF0ZSA9IHtcbiAgZ2V0RW50ZXJhYmxlS2V5Q29kZXM6IGZ1bmN0aW9uIChfb3B0cykge1xuICAgIGxldCBlbnRlcmFibGVLZXlDb2RlcyA9IHtcbiAgICAgICcxODknOiAnLScsICcxOTEnOiAnLydcbiAgICB9O1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKGVudGVyYWJsZUtleUNvZGVzLCBjdHJsS2V5cywgbnVtS2V5cyk7XG4gIH0sXG4gIGdldFBhdHRlcm5WYWx1ZTogZnVuY3Rpb24gKF9vcHRzLCBvcHRJZHgsIGUsIHZhbCwgZVR5cGUpIHtcbiAgICB2YWwgPSB2YWwucmVwbGFjZSgvXFxEL2csIFwiXCIpO1xuICAgIGlmICh2YWwgPT0gXCJcIikgcmV0dXJuIHZhbDtcbiAgICBsZXQgcmVnRXhwUGF0dGVybiA9IC9eKFswLTldezR9KVxcLT8oWzAtOV17MSwyfSk/XFwtPyhbMC05XXsxLDJ9KT8uKiQvO1xuXG4gICAgaWYgKF9vcHRzLnBhdHRlcm5Bcmd1bWVudCA9PSBcInRpbWVcIikge1xuICAgICAgcmVnRXhwUGF0dGVybiA9IC9eKFswLTldezR9KVxcLT8oWzAtOV17MSwyfSk/XFwtPyhbMC05XXsxLDJ9KT8gPyhbMC05XXsxLDJ9KT86PyhbMC05XXsxLDJ9KT86PyhbMC05XXsxLDJ9KT8uKiQvO1xuICAgIH0gZWxzZSBpZiAoX29wdHMucGF0dGVybkFyZ3VtZW50ID09IFwieWVhclwiKSB7XG4gICAgICByZWdFeHBQYXR0ZXJuID0gL14oWzAtOV17MCw0fSk/LiokLztcbiAgICB9IGVsc2UgaWYgKF9vcHRzLnBhdHRlcm5Bcmd1bWVudCA9PSBcIm1vbnRoXCIpIHtcbiAgICAgIHJlZ0V4cFBhdHRlcm4gPSAvXihbMC05XXs0fSlcXC0/KFswLTldezEsMn0pPy4qJC87XG4gICAgfVxuXG4gICAgbGV0IG1hdGNoZWRQYXR0ZXJuID0gdmFsLm1hdGNoKHJlZ0V4cFBhdHRlcm4pLFxuICAgICAgcmV0dXJuVmFsdWUgPSBcIlwiLFxuICAgICAgaW5zcGVjdFZhbHVlID0gZnVuY3Rpb24gKHZhbCwgZm9ybWF0LCBpbnNwZWN0LCBkYXRhKSB7XG4gICAgICAgIGxldCBfdmFsID0ge1xuICAgICAgICAgICdZJzogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdiA9PSBcInVuZGVmaW5lZFwiKSB2ID0gVE9EQVkuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgICAgIGlmICh2ID09ICcnIHx8IHYgPT0gJzAwMDAnKSB2ID0gVE9EQVkuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgICAgIHJldHVybiAodi5sZW5ndGggPCA0KSA/IFUuc2V0RGlnaXQodiwgNCkgOiB2O1xuICAgICAgICAgIH0sXG4gICAgICAgICAgJ00nOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2ID09IFwidW5kZWZpbmVkXCIpIHYgPSBUT0RBWS5nZXRNb250aCgpICsgMTtcbiAgICAgICAgICAgIHJldHVybiB2ID4gMTIgPyAxMiA6IHYgPT0gMCA/ICcwMScgOiBVLnNldERpZ2l0KHYsIDIpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgJ0QnOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2ID09IFwidW5kZWZpbmVkXCIpIHYgPSBUT0RBWS5nZXREYXRlKCkgKyAxO1xuICAgICAgICAgICAgbGV0IGRMZW4gPSBVLmRheXNPZk1vbnRoKGRhdGFbMV0sIGRhdGFbMl0gLSAxKTtcbiAgICAgICAgICAgIHJldHVybiB2ID4gZExlbiA/IGRMZW4gOiB2ID09IDAgPyAnMDEnIDogVS5zZXREaWdpdCh2LCAyKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgICdoJzogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgIGlmICghdikgdiA9IDA7XG4gICAgICAgICAgICByZXR1cm4gdiA+IDIzID8gMjMgOiBVLnNldERpZ2l0KHYsIDIpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgJ20nOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgaWYgKCF2KSB2ID0gMDtcbiAgICAgICAgICAgIHJldHVybiB2ID4gNTkgPyA1OSA6IFUuc2V0RGlnaXQodiwgMik7XG4gICAgICAgICAgfSxcbiAgICAgICAgICAncyc6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICBpZiAoIXYpIHYgPSAwO1xuICAgICAgICAgICAgcmV0dXJuIHYgPiA1OSA/IDU5IDogVS5zZXREaWdpdCh2LCAyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiAoaW5zcGVjdCkgPyBfdmFsW2Zvcm1hdF0odmFsKSA6IHZhbDtcbiAgICAgIH07XG5cbiAgICByZXR1cm5WYWx1ZSA9IHZhbC5yZXBsYWNlKHJlZ0V4cFBhdHRlcm4sIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICBsZXQgbnZhbCA9IFtdO1xuXG4gICAgICBpZiAoX29wdHMucGF0dGVybkFyZ3VtZW50ID09IFwieWVhclwiKSB7XG4gICAgICAgIG52YWwucHVzaChpbnNwZWN0VmFsdWUoYXJndW1lbnRzWzFdLCBcIllcIiwgZVR5cGUpKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKF9vcHRzLnBhdHRlcm5Bcmd1bWVudCA9PSBcIm1vbnRoXCIpIHtcbiAgICAgICAgbnZhbC5wdXNoKGluc3BlY3RWYWx1ZShhcmd1bWVudHNbMV0sIFwiWVwiLCBlVHlwZSkpO1xuICAgICAgICBpZiAoYXJndW1lbnRzWzJdIHx8IGVUeXBlKSBudmFsLnB1c2goJy0nICsgaW5zcGVjdFZhbHVlKGFyZ3VtZW50c1syXSwgXCJNXCIsIGVUeXBlKSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChfb3B0cy5wYXR0ZXJuQXJndW1lbnQgPT0gXCJ0aW1lXCIpIHtcbiAgICAgICAgbnZhbC5wdXNoKGluc3BlY3RWYWx1ZShhcmd1bWVudHNbMV0sIFwiWVwiLCBlVHlwZSkpO1xuICAgICAgICBpZiAoYXJndW1lbnRzWzJdIHx8IGVUeXBlKSBudmFsLnB1c2goJy0nICsgaW5zcGVjdFZhbHVlKGFyZ3VtZW50c1syXSwgXCJNXCIsIGVUeXBlKSk7XG4gICAgICAgIGlmIChhcmd1bWVudHNbM10gfHwgZVR5cGUpIG52YWwucHVzaCgnLScgKyBpbnNwZWN0VmFsdWUoYXJndW1lbnRzWzNdLCBcIkRcIiwgZVR5cGUsIGFyZ3VtZW50cykpO1xuICAgICAgICBpZiAoYXJndW1lbnRzWzRdIHx8IGVUeXBlKSBudmFsLnB1c2goJyAnICsgaW5zcGVjdFZhbHVlKGFyZ3VtZW50c1s0XSwgXCJoXCIsIGVUeXBlKSk7XG4gICAgICAgIGlmIChhcmd1bWVudHNbNV0gfHwgZVR5cGUpIG52YWwucHVzaCgnOicgKyBpbnNwZWN0VmFsdWUoYXJndW1lbnRzWzVdLCBcIm1cIiwgZVR5cGUpKTtcbiAgICAgICAgaWYgKGFyZ3VtZW50c1s2XSB8fCBlVHlwZSkgbnZhbC5wdXNoKCc6JyArIGluc3BlY3RWYWx1ZShhcmd1bWVudHNbNl0sIFwic1wiLCBlVHlwZSkpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIG52YWwucHVzaChpbnNwZWN0VmFsdWUoYXJndW1lbnRzWzFdLCBcIllcIiwgZVR5cGUpKTtcbiAgICAgICAgaWYgKGFyZ3VtZW50c1syXSB8fCBlVHlwZSkgbnZhbC5wdXNoKCctJyArIGluc3BlY3RWYWx1ZShhcmd1bWVudHNbMl0sIFwiTVwiLCBlVHlwZSkpO1xuICAgICAgICBpZiAoYXJndW1lbnRzWzNdIHx8IGVUeXBlKSBudmFsLnB1c2goJy0nICsgaW5zcGVjdFZhbHVlKGFyZ3VtZW50c1szXSwgXCJEXCIsIGVUeXBlLCBhcmd1bWVudHMpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudmFsLmpvaW4oJycpO1xuICAgIH0pO1xuXG4gICAgaWYgKGVUeXBlID09ICdibHVyJyAmJiAhbWF0Y2hlZFBhdHRlcm4pIHtcbiAgICAgIHJldHVyblZhbHVlID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IG52YWwgPSBbXTtcblxuICAgICAgICBpZiAoX29wdHMucGF0dGVybkFyZ3VtZW50ID09IFwieWVhclwiKSB7XG4gICAgICAgICAgbnZhbC5wdXNoKGluc3BlY3RWYWx1ZSgwLCBcIllcIiwgZVR5cGUpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChfb3B0cy5wYXR0ZXJuQXJndW1lbnQgPT0gXCJtb250aFwiKSB7XG4gICAgICAgICAgbnZhbC5wdXNoKGluc3BlY3RWYWx1ZSgwLCBcIllcIiwgZVR5cGUpKTtcbiAgICAgICAgICBudmFsLnB1c2goJy0nICsgaW5zcGVjdFZhbHVlKDAsIFwiTVwiLCBlVHlwZSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKF9vcHRzLnBhdHRlcm5Bcmd1bWVudCA9PSBcInRpbWVcIikge1xuICAgICAgICAgIG52YWwucHVzaChpbnNwZWN0VmFsdWUoMCwgXCJZXCIsIGVUeXBlKSk7XG4gICAgICAgICAgbnZhbC5wdXNoKCctJyArIGluc3BlY3RWYWx1ZSgwLCBcIk1cIiwgZVR5cGUpKTtcbiAgICAgICAgICBudmFsLnB1c2goJy0nICsgaW5zcGVjdFZhbHVlKDAsIFwiRFwiLCBlVHlwZSwgYXJndW1lbnRzKSk7XG4gICAgICAgICAgbnZhbC5wdXNoKCcgJyArIGluc3BlY3RWYWx1ZSgwLCBcImhcIiwgZVR5cGUpKTtcbiAgICAgICAgICBudmFsLnB1c2goJzonICsgaW5zcGVjdFZhbHVlKDAsIFwibVwiLCBlVHlwZSkpO1xuICAgICAgICAgIG52YWwucHVzaCgnOicgKyBpbnNwZWN0VmFsdWUoMCwgXCJzXCIsIGVUeXBlKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbnZhbC5wdXNoKGluc3BlY3RWYWx1ZSgwLCBcIllcIiwgZVR5cGUpKTtcbiAgICAgICAgICBudmFsLnB1c2goJy0nICsgaW5zcGVjdFZhbHVlKDAsIFwiTVwiLCBlVHlwZSkpO1xuICAgICAgICAgIG52YWwucHVzaCgnLScgKyBpbnNwZWN0VmFsdWUoMCwgXCJEXCIsIGVUeXBlLCBhcmd1bWVudHMpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnZhbC5qb2luKCcnKTtcbiAgICAgIH0pKCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKCFtYXRjaGVkUGF0dGVybikgcmV0dXJuVmFsdWUgPSAocmV0dXJuVmFsdWUubGVuZ3RoID4gNCkgPyBVLmxlZnQocmV0dXJuVmFsdWUsIDQpIDogcmV0dXJuVmFsdWU7XG5cbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gIH1cbn07XG5cbmxldCBwYXR0ZXJuX3RpbWUgPSB7XG4gIGdldEVudGVyYWJsZUtleUNvZGVzOiBmdW5jdGlvbiAoX29wdHMpIHtcbiAgICBsZXQgZW50ZXJhYmxlS2V5Q29kZXMgPSB7XG4gICAgICAnMTg2JzogJzonXG4gICAgfTtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihlbnRlcmFibGVLZXlDb2RlcywgY3RybEtleXMsIG51bUtleXMpO1xuICB9LFxuICBnZXRQYXR0ZXJuVmFsdWU6IGZ1bmN0aW9uIChfb3B0cywgb3B0SWR4LCBlLCB2YWwsIGVUeXBlKSB7XG4gICAgdmFsID0gdmFsLnJlcGxhY2UoL1xcRC9nLCBcIlwiKTtcbiAgICBsZXQgcmVnRXhwUGF0dGVybiA9IC9eKFswLTldezEsMn0pPzo/KFswLTldezEsMn0pPzo/KFswLTldezEsMn0pPy4qJC87XG5cbiAgICBsZXQgbWF0Y2hlZFBhdHRlcm4gPSB2YWwubWF0Y2gocmVnRXhwUGF0dGVybiksXG4gICAgICByZXR1cm5WYWx1ZSA9IHZhbC5yZXBsYWNlKHJlZ0V4cFBhdHRlcm4sIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIGxldCBudmFsID0gW2FyZ3VtZW50c1sxXV07XG4gICAgICAgIGlmIChhcmd1bWVudHNbMl0pIG52YWwucHVzaCgnOicgKyBhcmd1bWVudHNbMl0pO1xuICAgICAgICBpZiAoYXJndW1lbnRzWzNdKSBudmFsLnB1c2goJzonICsgYXJndW1lbnRzWzNdKTtcbiAgICAgICAgcmV0dXJuIG52YWwuam9pbignJyk7XG4gICAgICB9KTtcblxuICAgIGlmICghbWF0Y2hlZFBhdHRlcm4pIHJldHVyblZhbHVlID0gKHJldHVyblZhbHVlLmxlbmd0aCA+IDIpID8gVS5sZWZ0KHJldHVyblZhbHVlLCAyKSA6IHJldHVyblZhbHVlO1xuXG4gICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICB9XG59O1xuXG5sZXQgcGF0dGVybl9iaXpubyA9IHtcbiAgZ2V0RW50ZXJhYmxlS2V5Q29kZXM6IGZ1bmN0aW9uIChfb3B0cykge1xuICAgIGxldCBlbnRlcmFibGVLZXlDb2RlcyA9IHtcbiAgICAgICcxODknOiAnLSdcbiAgICB9O1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKGVudGVyYWJsZUtleUNvZGVzLCBjdHJsS2V5cywgbnVtS2V5cyk7XG4gIH0sXG4gIGdldFBhdHRlcm5WYWx1ZTogZnVuY3Rpb24gKF9vcHRzLCBvcHRJZHgsIGUsIHZhbCwgZVR5cGUpIHtcbiAgICB2YWwgPSB2YWwucmVwbGFjZSgvXFxEL2csIFwiXCIpO1xuICAgIGxldCByZWdFeHBQYXR0ZXJuID0gL14oWzAtOV17M30pXFwtPyhbMC05XXsxLDJ9KT9cXC0/KFswLTldezEsNX0pPy4qJC8sXG4gICAgICByZXR1cm5WYWx1ZSA9IHZhbC5yZXBsYWNlKHJlZ0V4cFBhdHRlcm4sIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIGxldCBudmFsID0gW2FyZ3VtZW50c1sxXV07XG4gICAgICAgIGlmIChhcmd1bWVudHNbMl0pIG52YWwucHVzaChhcmd1bWVudHNbMl0pO1xuICAgICAgICBpZiAoYXJndW1lbnRzWzNdKSBudmFsLnB1c2goYXJndW1lbnRzWzNdKTtcbiAgICAgICAgcmV0dXJuIG52YWwuam9pbihcIi1cIik7XG4gICAgICB9KTtcblxuICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgfVxufTtcblxubGV0IHBhdHRlcm5fcGhvbmUgPSB7XG4gIGdldEVudGVyYWJsZUtleUNvZGVzOiBmdW5jdGlvbiAoX29wdHMpIHtcbiAgICBsZXQgZW50ZXJhYmxlS2V5Q29kZXMgPSB7XG4gICAgICAnMTg5JzogJy0nLCAnMTg4JzogJywnXG4gICAgfTtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihlbnRlcmFibGVLZXlDb2RlcywgY3RybEtleXMsIG51bUtleXMpO1xuICB9LFxuICBnZXRQYXR0ZXJuVmFsdWU6IGZ1bmN0aW9uIChfb3B0cywgb3B0SWR4LCBlLCB2YWwsIGVUeXBlKSB7XG4gICAgdmFsID0gdmFsLnJlcGxhY2UoL1xcRC9nLCBcIlwiKTtcbiAgICBsZXQgcmVnRXhwUGF0dGVybjMgPSAvXihbMC05XXszfSlcXC0/KFswLTldezEsNH0pP1xcLT8oWzAtOV17MSw0fSk/XFwtPyhbMC05XXsxLDR9KT9cXC0/KFswLTldezEsNH0pPy87XG4gICAgaWYgKHZhbC5zdWJzdHIoMCwgMikgPT0gXCIwMlwiKSB7XG4gICAgICByZWdFeHBQYXR0ZXJuMyA9IC9eKFswLTldezJ9KVxcLT8oWzAtOV17MSw0fSk/XFwtPyhbMC05XXsxLDR9KT9cXC0/KFswLTldezEsNH0pP1xcLT8oWzAtOV17MSw0fSk/LztcbiAgICB9XG5cbiAgICBsZXQgcmV0dXJuVmFsdWUgPSB2YWwucmVwbGFjZShyZWdFeHBQYXR0ZXJuMywgZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIGxldCBudmFsID0gW2FyZ3VtZW50c1sxXV07XG4gICAgICBpZiAoYXJndW1lbnRzWzJdKSBudmFsLnB1c2goYXJndW1lbnRzWzJdKTtcbiAgICAgIGlmIChhcmd1bWVudHNbM10pIG52YWwucHVzaChhcmd1bWVudHNbM10pO1xuICAgICAgaWYgKGFyZ3VtZW50c1s0XSkgbnZhbC5wdXNoKGFyZ3VtZW50c1s0XSk7XG4gICAgICBpZiAoYXJndW1lbnRzWzVdKSBudmFsLnB1c2goYXJndW1lbnRzWzVdKTtcbiAgICAgIHJldHVybiBudmFsLmpvaW4oXCItXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgfVxufTtcblxubGV0IHBhdHRlcm5fY3JlZGl0ID0ge1xuICBnZXRFbnRlcmFibGVLZXlDb2RlczogZnVuY3Rpb24gKF9vcHRzKSB7XG4gICAgbGV0IGVudGVyYWJsZUtleUNvZGVzID0ge1xuICAgICAgJzE4OSc6ICctJ1xuICAgIH07XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oZW50ZXJhYmxlS2V5Q29kZXMsIGN0cmxLZXlzLCBudW1LZXlzKTtcbiAgfSxcbiAgZ2V0UGF0dGVyblZhbHVlOiBmdW5jdGlvbiAoX29wdHMsIG9wdElkeCwgZSwgdmFsLCBlVHlwZSkge1xuICAgIHZhbCA9IHZhbC5yZXBsYWNlKC9cXEQvZywgXCJcIikuc3Vic3RyaW5nKDAsIDE2KTtcblxuICAgIGxldCByZWdFeHBQYXR0ZXJuMyA9IC9eKFswLTldezR9KVxcLT8oWzAtOV17NH0pP1xcLT8oWzAtOV17NH0pP1xcLT8oWzAtOV17NH0pPy8sXG4gICAgICByZXR1cm5WYWx1ZSA9IHZhbC5yZXBsYWNlKHJlZ0V4cFBhdHRlcm4zLCBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICBsZXQgbnZhbCA9IFthcmd1bWVudHNbMV1dO1xuICAgICAgICBpZiAoYXJndW1lbnRzWzJdKSBudmFsLnB1c2goYXJndW1lbnRzWzJdKTtcbiAgICAgICAgaWYgKGFyZ3VtZW50c1szXSkgbnZhbC5wdXNoKGFyZ3VtZW50c1szXSk7XG4gICAgICAgIGlmIChhcmd1bWVudHNbNF0pIG52YWwucHVzaChhcmd1bWVudHNbNF0pO1xuICAgICAgICByZXR1cm4gbnZhbC5qb2luKFwiLVwiKTtcbiAgICAgIH0pO1xuICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgfVxufTtcblxubGV0IHBhdHRlcm5fY3VzdG9tID0ge1xuICBnZXRFbnRlcmFibGVLZXlDb2RlczogZnVuY3Rpb24gKF9vcHRzKSB7XG4gICAgaWYgKF9vcHRzLmdldEVudGVyYWJsZUtleUNvZGVzKSB7XG4gICAgICByZXR1cm4gX29wdHMuZ2V0RW50ZXJhYmxlS2V5Q29kZXMuY2FsbChfb3B0cywgeyRpbnB1dDogX29wdHMuJGlucHV0fSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9LFxuICBnZXRQYXR0ZXJuVmFsdWU6IGZ1bmN0aW9uIChfb3B0cywgb3B0SWR4LCBlLCB2YWwsIGVUeXBlKSB7XG4gICAgaWYgKF9vcHRzLmdldFBhdHRlcm5WYWx1ZSkge1xuICAgICAgcmV0dXJuIF9vcHRzLmdldFBhdHRlcm5WYWx1ZS5jYWxsKF9vcHRzLCB7ZXZlbnQ6IGUsICRpbnB1dDogX29wdHMuJGlucHV0LCB2YWx1ZTogdmFsfSk7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIC8qKlxuICAgKiDsu6jtirjroaQga2V5Y29kZXNcbiAgICogQGV4YW1wbGVcbiAgICogYGBganNcbiAgICogbGV0IGN0cmxLZXlzID0ge1xuICAgIFwiMThcIjogXCJLRVlfQUxUXCIsXG4gICAgXCI4XCI6IFwiS0VZX0JBQ0tTUEFDRVwiLFxuICAgIFwiMTdcIjogXCJLRVlfQ09OVFJPTFwiLFxuICAgIFwiNDZcIjogXCJLRVlfREVMRVRFXCIsXG4gICAgXCI0MFwiOiBcIktFWV9ET1dOXCIsXG4gICAgXCIzNVwiOiBcIktFWV9FTkRcIixcbiAgICBcIjE4N1wiOiBcIktFWV9FUVVBTFwiLFxuICAgIFwiMjdcIjogXCJLRVlfRVNDXCIsXG4gICAgXCIzNlwiOiBcIktFWV9IT01FXCIsXG4gICAgXCI0NVwiOiBcIktFWV9JTlNFUlRcIixcbiAgICBcIjM3XCI6IFwiS0VZX0xFRlRcIixcbiAgICBcIjE4OVwiOiBcIktFWV9NSU5VU1wiLFxuICAgIFwiMzRcIjogXCJLRVlfUEFHRURPV05cIixcbiAgICBcIjMzXCI6IFwiS0VZX1BBR0VVUFwiLFxuICAgIFwiMTNcIjogXCJLRVlfUkVUVVJOXCIsXG4gICAgXCIzOVwiOiBcIktFWV9SSUdIVFwiLFxuICAgIFwiMTZcIjogXCJLRVlfU0hJRlRcIixcbiAgICAvLyBcIjMyXCI6IFwiS0VZX1NQQUNFXCIsXG4gICAgXCI5XCI6IFwiS0VZX1RBQlwiLFxuICAgIFwiMzhcIjogXCJLRVlfVVBcIixcbiAgICBcIjkxXCI6IFwiS0VZX1dJTkRPV1wiXG59O1xuICAgKiBgYGBcbiAgICovXG4gIGN0cmxLZXlzOiBjdHJsS2V5cyxcbiAgLyoqXG4gICAqIOyIq+yekO2CpO2MqOuTnCBrZXljb2Rlc1xuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBqc1xuICAgKiBsZXQgbnVtS2V5cyA9IHtcbiAgICAnNDgnOiAxLCAnNDknOiAxLCAnNTAnOiAxLCAnNTEnOiAxLCAnNTInOiAxLCAnNTMnOiAxLCAnNTQnOiAxLCAnNTUnOiAxLCAnNTYnOiAxLCAnNTcnOiAxLFxuICAgICc5Nic6IDEsICc5Nyc6IDEsICc5OCc6IDEsICc5OSc6IDEsICcxMDAnOiAxLCAnMTAxJzogMSwgJzEwMic6IDEsICcxMDMnOiAxLCAnMTA0JzogMSwgJzEwNSc6IDFcbn07XG4gICAqIGBgYFxuICAgKi9cbiAgbnVtS2V5czogbnVtS2V5cyxcbiAgLyoqXG4gICAqIO2Gte2ZlO2MqO2EtFxuICAgKi9cbiAgbW9uZXk6IHBhdHRlcm5fbW9uZXksXG4gIC8qKlxuICAgKiDsiKvsnpDtjKjthLRcbiAgICovXG4gIG51bWJlcjogcGF0dGVybl9udW1iZXIsXG4gIC8qKlxuICAgKiDrgqDsp5ztjKjthLRcbiAgICovXG4gIGRhdGU6IHBhdHRlcm5fZGF0ZSxcbiAgLyoqXG4gICAqIOyLnOqwhO2MqO2EtFxuICAgKi9cbiAgdGltZTogcGF0dGVybl90aW1lLFxuICAvKipcbiAgICog7ZWc6rWtIOyCrOyXheyekCDrsojtmLgg7Yyo7YS0XG4gICAqL1xuICBiaXpubzogcGF0dGVybl9iaXpubyxcbiAgLyoqXG4gICAqIOyghO2ZlOuyiO2YuCDtjKjthLRcbiAgICovXG4gIHBob25lOiBwYXR0ZXJuX3Bob25lLFxuICBjcmVkaXQ6IHBhdHRlcm5fY3JlZGl0LFxuICAvKipcbiAgICog7IKs7Jqp7J6QIOygleydmCDtjKjthLQg7IKs7Jqp7IucXG4gICAqL1xuICBjdXN0b206IHBhdHRlcm5fY3VzdG9tXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9zcmMvQVg2VUlGb3JtYXR0ZXIvQVg2VUlGb3JtYXR0ZXJfZm9ybWF0dGVyLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==