"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jqmin = require("jqmin");

var _jqmin2 = _interopRequireDefault(_jqmin);

var _AX6UICore2 = require("./AX6UICore");

var _AX6UICore3 = _interopRequireDefault(_AX6UICore2);

var _AX6Info = require("./AX6Info");

var _AX6Info2 = _interopRequireDefault(_AX6Info);

var _AX6Util = require("./AX6Util");

var _AX6Util2 = _interopRequireDefault(_AX6Util);

var _AX6UIFormatter_formatter = require("./AX6UIFormatter/AX6UIFormatter_formatter");

var _AX6UIFormatter_formatter2 = _interopRequireDefault(_AX6UIFormatter_formatter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
      formatter = _formatter;
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
  }]);

  return AX6UIFormatter;
}(_AX6UICore3.default);

exports.default = AX6UIFormatter;