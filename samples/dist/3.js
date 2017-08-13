webpackJsonp([3],{

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jqmin = __webpack_require__(6);

var _jqmin2 = _interopRequireDefault(_jqmin);

var _AX6Util = __webpack_require__(1);

var _AX6Util2 = _interopRequireDefault(_AX6Util);

var _AX6UIPicker = __webpack_require__(88);

var _AX6UIPicker2 = _interopRequireDefault(_AX6UIPicker);

__webpack_require__(44);

__webpack_require__(71);

__webpack_require__(73);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var html = "\n<div class=\"row\">\n    <div class=\"input-field col s12\">\n        <input type=\"text\" id=\"picker-date\" value=\"\" placeholder=\"\" onchange=\"console.log('picker-date = ' + this.value)\"/>\n        <label for=\"picker-date\">yyyy/mm/dd</label>\n    </div>\n</div>\n\n<div class=\"row\" data-picker=\"date-se\">\n    <div class=\"input-field col s6\">\n        <input type=\"text\" id=\"picker-date-s\" value=\"\" placeholder=\"\"/>\n        <label for=\"picker-date-s\">\uC2DC\uC791\uC77C</label>\n    </div>\n    <div class=\"input-field col s6\">\n        <input type=\"text\" id=\"picker-date-e\" value=\"\" placeholder=\"\"/>\n        <label for=\"picker-date-e\">\uC885\uB8CC\uC77C</label>\n    </div>\n</div>\n\n<div class=\"row\">\n    <div class=\"input-field col s12\">\n        <input type=\"text\" id=\"secure-num\" placeholder=\"\"  maxlength=\"4\" readonly=\"readonly\" />\n        <label for=\"secure-num\">Secure Number</label>\n    </div>\n</div>\n\n<div class=\"row\">\n    <div class=\"input-field col s12\">\n        <input type=\"text\" id=\"keyboard-0\" placeholder=\"\" />\n        <label for=\"keyboard-0\">Keyboard</label>\n    </div>\n</div>\n\n<div class=\"row\">\n    <div class=\"input-field col s12\">\n        <input type=\"text\" id=\"numpad-0\" placeholder=\"\" />\n        <label for=\"numpad-0\">Numpad</label>\n    </div>\n</div>\n\n<div class=\"row\">\n    <div class=\"input-field col s12\">\n        <input type=\"text\" id=\"custom-0\" placeholder=\"\" />\n        <label for=\"custom-0\">Custom</label>\n    </div>\n</div>\n\n<div class=\"row\">\n    <div class=\"input-field col s12\">\n        <input type=\"text\" id=\"color-0\" placeholder=\"\" />\n        <label for=\"color-0\">Color</label>\n    </div>\n</div>\n";
var fn = {
  moduleRun: function moduleRun($body) {
    var today = new Date();
    var picker = new _AX6UIPicker2.default();

    // 단일 날짜 바인드
    picker.bind({
      zIndex: 4000,
      target: (0, _jqmin2.default)('#picker-date'),
      direction: "auto",
      content: {
        type: 'date',
        config: {
          mode: "year",
          selectMode: "month"
        },
        formatter: {
          pattern: 'date(month)'
        }
      },
      onStateChanged: function onStateChanged() {
        // console.log(this.values);
      }
    });

    // 기간 바인드
    picker.bind({
      zIndex: 4000,
      target: (0, _jqmin2.default)('[data-picker="date-se"]'),
      content: {
        width: 270,
        margin: 10,
        type: 'date',
        config: {
          control: {
            left: '<i class="material-icons">keyboard_arrow_left</i>',
            yearTmpl: '%s',
            monthTmpl: '%s',
            right: '<i class="material-icons">keyboard_arrow_right</i>'
          },
          lang: {
            yearTmpl: "%s년",
            months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
            dayTmpl: "%s"
          }
        },
        formatter: {
          pattern: 'date'
        }
      },
      btns: {
        today: {
          label: "오늘", theme: "waves-effect waves-light btn blue-grey", onClick: function onClick() {
            if (this.item.inputLength == 1) {
              this.self.setContentValue(this.item.id, 0, _AX6Util2.default.date(new Date(), { "return": "yyyy-MM-dd" }));
            } else {
              this.self.setContentValue(this.item.id, 0, _AX6Util2.default.date(new Date(), { "return": "yyyy-MM-dd" }));
              this.self.setContentValue(this.item.id, 1, _AX6Util2.default.date(new Date(), { "return": "yyyy-MM-dd" }));
              this.self.close();
            }
          }
        },
        thisMonth: {
          label: "이번달 1일", theme: "waves-effect waves-light btn blue-grey", onClick: function onClick() {
            var today = new Date();
            if (this.item.inputLength == 1) {
              this.self.setContentValue(this.item.id, 0, _AX6Util2.default.date(today, { "return": "yyyy-MM-01" }));
            } else {
              this.self.setContentValue(this.item.id, 0, _AX6Util2.default.date(today, { "return": "yyyy-MM-01" }));
              this.self.setContentValue(this.item.id, 1, _AX6Util2.default.date(today, { "return": "yyyy-MM" }) + '-' + _AX6Util2.default.daysOfMonth(today.getFullYear(), today.getMonth()));
              this.self.close();
            }
          }
        },
        ok: { label: "확인", theme: "waves-effect waves-light btn light-blue" }
      },
      onStateChanged: function onStateChanged(a) {
        if (this.state == "open") {
          if (this.item && this.item.calendar) {
            this.item.pickerCalendar[0].calendar.setSelection([_AX6Util2.default.date(today, { 'add': { d: 0 } })]);
            if (this.item.pickerCalendar[1]) this.item.pickerCalendar[1].calendar.setSelection([_AX6Util2.default.date(today, { 'add': { d: 0 } })]);
          }
        } else if (this.state == "changeValue") {
          if (this.item.content.type == "date" && this.values.length > 1) {
            if (this.inputIndex == 0) {}
          }
        }
      }
    });

    // 보안번호
    picker.bind({
      target: (0, _jqmin2.default)('#secure-num'),
      direction: "top",
      content: {
        width: 200,
        margin: 10,
        type: 'secure-num',
        config: {
          btnWrapStyle: "padding:3px;width:25%;",
          btnStyle: "width:100%",
          btnTheme: "waves-effect btn blue-grey",
          specialBtnTheme: "waves-effect btn pink"
        },
        formatter: {
          pattern: 'number'
        }
      },
      btns: {
        ok: { label: "확인", theme: "waves-effect waves-light btn light-blue" }
      },
      onStateChanged: function onStateChanged() {
        console.log(this);
        if (this.value && this.value.length > 3) {
          picker.close();
        }
      }
    });

    // 키보드
    picker.bind({
      target: (0, _jqmin2.default)('#keyboard-0'),
      direction: "auto",
      content: {
        width: 550,
        margin: 10,
        type: 'keyboard',
        config: {
          btnWrapStyle: "padding:2px;",
          btnStyle: "width: 35px;",
          btnTheme: "btn",
          specialBtnWrapStyle: "padding:2px;",
          specialBtnStyle: "",
          specialBtnTheme: "btn blue-grey"
        }
      },
      onStateChanged: function onStateChanged() {}
    });

    // 숫자 키패드
    picker.bind({
      target: (0, _jqmin2.default)('#numpad-0'),
      direction: "auto",
      content: {
        width: 200,
        margin: 10,
        type: 'numpad',
        config: {
          btnWrapStyle: "padding:3px;width:25%;",
          btnStyle: "width:100%",
          btnTheme: "btn",
          specialBtnWrapStyle: "padding:3px;width:25%;",
          specialBtnStyle: "width:100%;padding-left:0px;padding-right:0px;",
          specialBtnTheme: "btn blue-grey"
          /*
           keyArray: [
           {value: "7"},
           {value: "8"},
           {value: "9"},
           {label: "BS", fn: "back"},
           {value: "4"},
           {value: "5"},
           {value: "6"},
           {value: "-"},
           {value: "1"},
           {value: "2"},
           {value: "3"},
           {value: ""},
           {value: "."},
           {value: "0"},
           {value: ""},
           {label: "OK", fn: "close"}
           ]
           */
        },
        formatter: {
          pattern: 'number'
        }
      },
      onStateChanged: function onStateChanged() {
        console.log(this);
      }
    });

    // 커스텀
    picker.bind({
      target: (0, _jqmin2.default)('#custom-0'),
      direction: "top",
      contentWidth: 200,
      content: function content(callback) {
        var html = '' + '가나다라마바사' + '<div style="padding: 10px;">' + '<button class="btn btn-default">기능 1</button>' + '</div>';
        callback(html);
      }
    });

    // 팔렛트
    picker.bind({
      target: (0, _jqmin2.default)("#color-0"),
      direction: "auto",
      content: {
        width: 250,
        margin: 10,
        type: 'color',
        config: {}
      },
      onStateChanged: function onStateChanged() {}
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

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 * https://github.com/thomasJang/mustache.js -- imporove some variables
 */

/**
 * AX6Mustache는 http://github.com/janl/mustache.js에 몇가지 최소한의 기능을 튜닝하여 사용하는 템플릿 엔진입니다.
 * @namespace AX6Mustache
 */

/**
 * @method AX6Mustache.render
 * @example
 * ```js
 * ax5.mustache.render(template, view)
 *
 *
 * //Array @i
 * //{{#beatles}}
 * //{{firstName}} {{lastName}} ({{@i}}) ({{@first}})
 * //{{/beatles}}
 *
 * //Object @each
 * {{#beatles}}
 *  {{#@each}}
 *      {{@key}} : {{@value.firstName}} {{@value.lastName}}
 *  {{/@each}}
 * {{/beatles}}
 *
 * ```
 */

var AX6 = {};

(function defineMustache(global, factory) {

  factory(global.mustache = {});
})(AX6, function mustacheFactory(mustache) {

  var objectToString = Object.prototype.toString;
  var isArray = Array.isArray || function isArrayPolyfill(object) {
    return objectToString.call(object) === '[object Array]';
  };

  function isFunction(object) {
    return typeof object === 'function';
  }

  /**
   * More correct typeof string handling array
   * which normally returns typeof 'object'
   */
  function typeStr(obj) {
    return isArray(obj) ? 'array' : typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
  }

  function escapeRegExp(string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
  }

  /**
   * Null safe way of checking whether or not an object,
   * including its prototype, has a given property
   */
  function hasProperty(obj, propName) {
    return obj != null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && propName in obj;
  }

  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
  // See https://github.com/janl/mustache.js/issues/189
  var regExpTest = RegExp.prototype.test;

  function testRegExp(re, string) {
    return regExpTest.call(re, string);
  }

  var nonSpaceRe = /\S/;

  function isWhitespace(string) {
    return !testRegExp(nonSpaceRe, string);
  }

  var entityMap = {
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '/': '&#x2F;'
  };

  function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function fromEntityMap(s) {
      return entityMap[s];
    });
  }

  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var equalsRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;

  /**
   * Breaks up the given `template` string into a tree of tokens. If the `tags`
   * argument is given here it must be an array with two string values: the
   * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
   * course, the default is to use mustaches (i.e. mustache.tags).
   *
   * A token is an array with at least 4 elements. The first element is the
   * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
   * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
   * all text that appears outside a symbol this element is "text".
   *
   * The second element of a token is its "value". For mustache tags this is
   * whatever else was inside the tag besides the opening symbol. For text tokens
   * this is the text itself.
   *
   * The third and fourth elements of the token are the start and end indices,
   * respectively, of the token in the original template.
   *
   * Tokens that are the root node of a subtree contain two more elements: 1) an
   * array of tokens in the subtree and 2) the index in the original template at
   * which the closing tag for that section begins.
   */
  function parseTemplate(template, tags) {
    if (!template) return [];

    var sections = []; // Stack to hold section tokens
    var tokens = []; // Buffer to hold the tokens
    var spaces = []; // Indices of whitespace tokens on the current line
    var hasTag = false; // Is there a {{tag}} on the current line?
    var nonSpace = false; // Is there a non-space char on the current line?

    // Strips all whitespace tokens array for the current line
    // if there was a {{#tag}} on it and otherwise only space.
    function stripSpace() {
      if (hasTag && !nonSpace) {
        while (spaces.length) {
          delete tokens[spaces.pop()];
        }
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    }

    var openingTagRe, closingTagRe, closingCurlyRe;

    function compileTags(tagsToCompile) {
      if (typeof tagsToCompile === 'string') tagsToCompile = tagsToCompile.split(spaceRe, 2);

      if (!isArray(tagsToCompile) || tagsToCompile.length !== 2) throw new Error('Invalid tags: ' + tagsToCompile);

      openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + '\\s*');
      closingTagRe = new RegExp('\\s*' + escapeRegExp(tagsToCompile[1]));
      closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tagsToCompile[1]));
    }

    compileTags(tags || mustache.tags);

    var scanner = new Scanner(template);

    var start, type, value, chr, token, openSection;
    while (!scanner.eos()) {
      start = scanner.pos;

      // Match any text between tags.
      value = scanner.scanUntil(openingTagRe);

      if (value) {
        for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
          chr = value.charAt(i);

          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
          } else {
            nonSpace = true;
          }

          tokens.push(['text', chr, start, start + 1]);
          start += 1;

          // Check for whitespace on the current line.
          if (chr === '\n') stripSpace();
        }
      }

      // Match the opening tag.
      if (!scanner.scan(openingTagRe)) break;

      hasTag = true;

      // Get the tag type.
      type = scanner.scan(tagRe) || 'name';
      scanner.scan(whiteRe);

      // Get the tag value.
      if (type === '=') {
        value = scanner.scanUntil(equalsRe);
        scanner.scan(equalsRe);
        scanner.scanUntil(closingTagRe);
      } else if (type === '{') {
        value = scanner.scanUntil(closingCurlyRe);
        scanner.scan(curlyRe);
        scanner.scanUntil(closingTagRe);
        type = '&';
      } else {
        value = scanner.scanUntil(closingTagRe);
      }

      // Match the closing tag.
      if (!scanner.scan(closingTagRe)) throw new Error('Unclosed tag at ' + scanner.pos);

      token = [type, value, start, scanner.pos];
      tokens.push(token);

      if (type === '#' || type === '^') {
        sections.push(token);
      } else if (type === '/') {
        // Check section nesting.
        openSection = sections.pop();

        if (!openSection) throw new Error('Unopened section "' + value + '" at ' + start);

        if (openSection[1] !== value) throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
      } else if (type === 'name' || type === '{' || type === '&') {
        nonSpace = true;
      } else if (type === '=') {
        // Set the tags for the next time around.
        compileTags(value);
      }
    }

    // Make sure there are no open sections when we're done.
    openSection = sections.pop();

    if (openSection) throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);

    return nestTokens(squashTokens(tokens));
  }

  /**
   * Combines the values of consecutive text tokens in the given `tokens` array
   * to a single token.
   */
  function squashTokens(tokens) {
    var squashedTokens = [];

    var token, lastToken;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];

      if (token) {
        if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
          lastToken[1] += token[1];
          lastToken[3] = token[3];
        } else {
          squashedTokens.push(token);
          lastToken = token;
        }
      }
    }

    return squashedTokens;
  }

  /**
   * Forms the given array of `tokens` into a nested tree structure where
   * tokens that represent a section have two additional items: 1) an array of
   * all tokens that appear in that section and 2) the index in the original
   * template that represents the end of that section.
   */
  function nestTokens(tokens) {
    var nestedTokens = [];
    var collector = nestedTokens;
    var sections = [];

    var token, section;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];

      switch (token[0]) {
        case '#':
        case '^':
          collector.push(token);
          sections.push(token);
          collector = token[4] = [];
          break;
        case '/':
          section = sections.pop();
          section[5] = token[2];
          collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
          break;
        default:
          collector.push(token);
      }
    }

    return nestedTokens;
  }

  /**
   * A simple string scanner that is used by the template parser to find
   * tokens in template strings.
   */
  function Scanner(string) {
    this.string = string;
    this.tail = string;
    this.pos = 0;
  }

  /**
   * Returns `true` if the tail is empty (end of string).
   */
  Scanner.prototype.eos = function eos() {
    return this.tail === '';
  };

  /**
   * Tries to match the given regular expression at the current position.
   * Returns the matched text if it can match, the empty string otherwise.
   */
  Scanner.prototype.scan = function scan(re) {
    var match = this.tail.match(re);

    if (!match || match.index !== 0) return '';

    var string = match[0];

    this.tail = this.tail.substring(string.length);
    this.pos += string.length;

    return string;
  };

  /**
   * Skips all text until the given regular expression can be matched. Returns
   * the skipped string, which is the entire tail if no match can be made.
   */
  Scanner.prototype.scanUntil = function scanUntil(re) {
    var index = this.tail.search(re),
        match;

    switch (index) {
      case -1:
        match = this.tail;
        this.tail = '';
        break;
      case 0:
        match = '';
        break;
      default:
        match = this.tail.substring(0, index);
        this.tail = this.tail.substring(index);
    }

    this.pos += match.length;

    return match;
  };

  /**
   * Represents a rendering context by wrapping a view object and
   * maintaining a reference to the parent context.
   */
  function Context(view, parentContext) {
    this.view = view;
    this.cache = {
      '.': this.view,
      '@each': function each() {
        var returns = [];
        for (var k in this) {
          returns.push({ '@key': k, '@value': this[k] });
        }
        return returns;
      }
    };
    this.parent = parentContext;
  }

  /**
   * Creates a new context using the given view with this context
   * as the parent.
   */
  Context.prototype.push = function push(view) {
    return new Context(view, this);
  };

  /**
   * Returns the value of the given name in this context, traversing
   * up the context hierarchy if the value is absent in this context's view.
   */
  Context.prototype.lookup = function lookup(name) {
    var cache = this.cache;

    var value;
    if (cache.hasOwnProperty(name)) {
      value = cache[name];
    } else {
      var context = this,
          names,
          index,
          lookupHit = false;

      while (context) {
        if (name.indexOf('.') > 0) {
          value = context.view;
          names = name.split('.');
          index = 0;

          /**
           * Using the dot notion path in `name`, we descend through the
           * nested objects.
           *
           * To be certain that the lookup has been successful, we have to
           * check if the last object in the path actually has the property
           * we are looking for. We store the result in `lookupHit`.
           *
           * This is specially necessary for when the value has been set to
           * `undefined` and we want to avoid looking up parent contexts.
           **/
          while (value != null && index < names.length) {
            if (index === names.length - 1) lookupHit = hasProperty(value, names[index]);

            value = value[names[index++]];
          }
        } else {
          value = context.view[name];
          lookupHit = hasProperty(context.view, name);
        }

        if (lookupHit) break;

        context = context.parent;
      }

      cache[name] = value;
    }

    if (isFunction(value)) value = value.call(this.view);

    return value;
  };

  /**
   * A Writer knows how to take a stream of tokens and render them to a
   * string, given a context. It also maintains a cache of templates to
   * avoid the need to parse the same template twice.
   */
  function Writer() {
    this.cache = {};
  }

  /**
   * Clears all cached templates in this writer.
   */
  Writer.prototype.clearCache = function clearCache() {
    this.cache = {};
  };

  /**
   * Parses and caches the given `template` and returns the array of tokens
   * that is generated from the parse.
   */
  Writer.prototype.parse = function parse(template, tags) {
    var cache = this.cache;
    var tokens = cache[template];

    if (tokens == null) tokens = cache[template] = parseTemplate(template, tags);

    return tokens;
  };

  /**
   * High-level method that is used to render the given `template` with
   * the given `view`.
   *
   * The optional `partials` argument may be an object that contains the
   * names and templates of partials that are used in the template. It may
   * also be a function that is used to load partial templates on the fly
   * that takes a single argument: the name of the partial.
   */
  Writer.prototype.render = function render(template, view, partials) {
    var tokens = this.parse(template);
    var context = view instanceof Context ? view : new Context(view);
    return this.renderTokens(tokens, context, partials, template);
  };

  /**
   * Low-level method that renders the given array of `tokens` using
   * the given `context` and `partials`.
   *
   * Note: The `originalTemplate` is only ever used to extract the portion
   * of the original template that was contained in a higher-order section.
   * If the template doesn't use higher-order sections, this argument may
   * be omitted.
   */
  Writer.prototype.renderTokens = function renderTokens(tokens, context, partials, originalTemplate) {
    var buffer = '';
    var token, symbol, value;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      value = undefined;
      token = tokens[i];
      symbol = token[0];

      if (symbol === '#') value = this.renderSection(token, context, partials, originalTemplate);else if (symbol === '^') value = this.renderInverted(token, context, partials, originalTemplate);else if (symbol === '>') value = this.renderPartial(token, context, partials, originalTemplate);else if (symbol === '&') value = this.unescapedValue(token, context);else if (symbol === 'name') value = this.escapedValue(token, context);else if (symbol === 'text') value = this.rawValue(token);

      if (value !== undefined) buffer += value;
    }

    return buffer;
  };

  Writer.prototype.renderSection = function renderSection(token, context, partials, originalTemplate) {
    var self = this;
    var buffer = '';

    var value = context.lookup(token[1]);

    // This function is used to render an arbitrary template
    // in the current context by higher-order sections.
    function subRender(template) {
      return self.render(template, context, partials);
    }

    if (!value) return;

    if (isArray(value)) {
      for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
        if (value[j]) {
          if (_typeof(value[j]) === 'object') {
            value[j]['@i'] = j;
            value[j]['@first'] = j === 0;
          }

          buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate);
        }
      }
    } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' || typeof value === 'string' || typeof value === 'number') {
      buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate);
    } else if (isFunction(value)) {
      if (typeof originalTemplate !== 'string') throw new Error('Cannot use higher-order sections without the original template');

      // Extract the portion of the original template that the section contains.
      value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);

      if (value != null) buffer += value;
    } else {
      buffer += this.renderTokens(token[4], context, partials, originalTemplate);
    }
    return buffer;
  };

  Writer.prototype.renderInverted = function renderInverted(token, context, partials, originalTemplate) {
    var value = context.lookup(token[1]);

    // Use JavaScript's definition of falsy. Include empty arrays.
    // See https://github.com/janl/mustache.js/issues/186
    if (!value || isArray(value) && value.length === 0) return this.renderTokens(token[4], context, partials, originalTemplate);
  };

  Writer.prototype.renderPartial = function renderPartial(token, context, partials) {
    if (!partials) return;

    var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
    if (value != null) return this.renderTokens(this.parse(value), context, partials, value);
  };

  Writer.prototype.unescapedValue = function unescapedValue(token, context) {
    var value = context.lookup(token[1]);
    if (value != null) return value;
  };

  Writer.prototype.escapedValue = function escapedValue(token, context) {
    var value = context.lookup(token[1]);
    if (value != null) return mustache.escape(value);
  };

  Writer.prototype.rawValue = function rawValue(token) {
    return token[1];
  };

  mustache.name = 'mustache.js';
  mustache.version = '2.1.3';
  mustache.tags = ['{{', '}}'];

  // All high-level mustache.* functions use this writer.
  var defaultWriter = new Writer();

  /**
   * Clears all cached templates in the default writer.
   */
  mustache.clearCache = function clearCache() {
    return defaultWriter.clearCache();
  };

  /**
   * Parses and caches the given template in the default writer and returns the
   * array of tokens it contains. Doing this ahead of time avoids the need to
   * parse templates on the fly as they are rendered.
   */
  mustache.parse = function parse(template, tags) {
    return defaultWriter.parse(template, tags);
  };

  /**
   * Renders the `template` with the given `view` and `partials` using the
   * default writer.
   */
  mustache.render = function render(template, view, partials) {
    if (typeof template !== 'string') {
      throw new TypeError('Invalid template! Template should be a "string" ' + 'but "' + typeStr(template) + '" was given as the first ' + 'argument for mustache#render(template, view, partials)');
    }

    return defaultWriter.render(template, view, partials);
  };

  // This is here for backwards compatibility with 0.4.x.,
  /*eslint-disable */ // eslint wants camel cased function name
  mustache.to_html = function to_html(template, view, partials, send) {
    /*eslint-enable*/

    var result = mustache.render(template, view, partials);

    if (isFunction(send)) {
      send(result);
    } else {
      return result;
    }
  };

  // Export the escaping function so that the user may override it.
  // See https://github.com/janl/mustache.js/issues/244
  mustache.escape = escapeHtml;

  // Export these mainly for testing, but also for advanced usage.
  mustache.Scanner = Scanner;
  mustache.Context = Context;
  mustache.Writer = Writer;
});

exports.default = AX6.mustache;

/***/ }),

/***/ 44:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(45);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../samples/node_modules/css-loader/index.js!../../samples/node_modules/sass-loader/lib/loader.js!./style.scss", function() {
			var newContent = require("!!../../samples/node_modules/css-loader/index.js!../../samples/node_modules/sass-loader/lib/loader.js!./style.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "@-webkit-keyframes ax6-ui-calendar-fadeout {\n  from {\n    opacity: 1.0; }\n  to {\n    opacity: 0.5; } }\n\n@-moz-keyframes ax6-ui-calendar-fadeout {\n  from {\n    opacity: 1.0; }\n  to {\n    opacity: 0.5; } }\n\n@keyframes ax6-ui-calendar-fadeout {\n  from {\n    opacity: 1.0; }\n  to {\n    opacity: 0.5; } }\n\n@-webkit-keyframes ax6-ui-calendar-fadein {\n  from {\n    opacity: 0.5; }\n  to {\n    opacity: 1.0; } }\n\n@-moz-keyframes ax6-ui-calendar-fadein {\n  from {\n    opacity: 0.5; }\n  to {\n    opacity: 1.0; } }\n\n@keyframes ax6-ui-calendar-fadein {\n  from {\n    opacity: 0.5; }\n  to {\n    opacity: 1.0; } }\n\n[data-ax6ui-calendar] {\n  box-sizing: border-box;\n  position: relative; }\n  [data-ax6ui-calendar] * {\n    box-sizing: border-box; }\n  [data-ax6ui-calendar] .calendar-control {\n    position: relative;\n    box-sizing: content-box;\n    background-color: #f5f5f5;\n    background-image: -webkit-linear-gradient(bottom, #f5f5f5);\n    background-image: linear-gradient(to top,#f5f5f5);\n    border: 1px solid #ddd;\n    border-radius: 5px;\n    font-size: 18px;\n    margin-bottom: 5px;\n    padding: 0;\n    color: #333; }\n    [data-ax6ui-calendar] .calendar-control .date-move-left, [data-ax6ui-calendar] .calendar-control .date-move-right {\n      display: block;\n      position: absolute;\n      overflow: hidden;\n      text-align: center;\n      font-size: 22px;\n      cursor: pointer;\n      text-decoration: none;\n      padding: 0; }\n      [data-ax6ui-calendar] .calendar-control .date-move-left i, [data-ax6ui-calendar] .calendar-control .date-move-left span, [data-ax6ui-calendar] .calendar-control .date-move-right i, [data-ax6ui-calendar] .calendar-control .date-move-right span {\n        line-height: inherit; }\n    [data-ax6ui-calendar] .calendar-control .date-move-left {\n      left: 0px;\n      top: 0px; }\n    [data-ax6ui-calendar] .calendar-control .date-move-right {\n      right: 0px;\n      top: 0px; }\n    [data-ax6ui-calendar] .calendar-control .date-display {\n      text-align: center; }\n      [data-ax6ui-calendar] .calendar-control .date-display [data-calendar-display] {\n        margin: 0px 10px;\n        cursor: pointer;\n        text-decoration: underline; }\n    [data-ax6ui-calendar] .calendar-control a {\n      color: #333; }\n    [data-ax6ui-calendar] .calendar-control a:hover {\n      color: #337ab7; }\n  [data-ax6ui-calendar] .calendar-body.fadein {\n    -webkit-animation: ax6-ui-calendar-fadein 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);\n    -moz-animation: ax6-ui-calendar-fadein 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);\n    animation: ax6-ui-calendar-fadein 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);\n    opacity: 1.0; }\n  [data-ax6ui-calendar] .calendar-body.fadeout {\n    -webkit-animation: ax6-ui-calendar-fadeout 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);\n    -moz-animation: ax6-ui-calendar-fadeout 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);\n    animation: ax6-ui-calendar-fadeout 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);\n    opacity: 0.0; }\n  [data-ax6ui-calendar] .calendar-body table {\n    box-sizing: border-box;\n    table-layout: fixed;\n    border-collapse: collapse;\n    border-spacing: 0;\n    border: 0 none; }\n    [data-ax6ui-calendar] .calendar-body table thead {\n      border: 0 none; }\n      [data-ax6ui-calendar] .calendar-body table thead td, [data-ax6ui-calendar] .calendar-body table thead th {\n        box-sizing: border-box;\n        vertical-align: middle;\n        line-height: 1em;\n        cursor: pointer;\n        text-align: center;\n        font-size: 12px;\n        padding: 0px 2px;\n        border: 0px none;\n        overflow: hidden;\n        background-color: #FFFFFF;\n        background-image: -webkit-linear-gradient(bottom, #FFFFFF, #FFFFFF);\n        background-image: linear-gradient(to top,#FFFFFF, #FFFFFF);\n        color: #6D6E70; }\n        [data-ax6ui-calendar] .calendar-body table thead td.calendar-col-0, [data-ax6ui-calendar] .calendar-body table thead th.calendar-col-0 {\n          color: #C78B81; }\n        [data-ax6ui-calendar] .calendar-body table thead td.calendar-col-6, [data-ax6ui-calendar] .calendar-body table thead th.calendar-col-6 {\n          color: #32B4DC; }\n    [data-ax6ui-calendar] .calendar-body table tbody {\n      border: 0 none; }\n      [data-ax6ui-calendar] .calendar-body table tbody td, [data-ax6ui-calendar] .calendar-body table tbody th {\n        box-sizing: border-box;\n        vertical-align: middle;\n        line-height: 1em;\n        cursor: pointer;\n        text-align: center;\n        font-size: 14px;\n        border: 0px none;\n        background-color: #FFFFFF;\n        background-image: -webkit-linear-gradient(bottom, #FFFFFF, #FFFFFF);\n        background-image: linear-gradient(to top,#FFFFFF, #FFFFFF);\n        overflow: hidden;\n        /*\n          &.calendar-col-0 {\n              .calendar-item-day.live {\n                  color: $ax6ui-calendar-sun-text-color;\n                  @include extend-item-theme();\n              }\n          }\n          &.calendar-col-6 {\n              .calendar-item-day.live {\n                  color: $ax6ui-calendar-sat-text-color;\n                  @include extend-item-theme();\n              }\n          }\n          */ }\n        [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day {\n          position: relative;\n          display: block;\n          width: 100%;\n          height: 100%;\n          vertical-align: middle;\n          border-radius: 5px;\n          overflow: hidden;\n          line-height: inherit;\n          background-color: #FFFFFF;\n          background-image: -webkit-linear-gradient(bottom, #FFFFFF, #FFFFFF);\n          background-image: linear-gradient(to top,#FFFFFF, #FFFFFF);\n          color: #C3C4C6;\n          font-size: 14px; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day span.addon, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day span.addon {\n            position: absolute;\n            width: 100%;\n            text-align: center;\n            line-height: 11.2px;\n            font-size: 11.2px; }\n            [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day span.addon.addon-header, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day span.addon.addon-header {\n              left: 0px;\n              top: 1px; }\n            [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day span.addon.addon-footer, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day span.addon.addon-footer {\n              left: 0px;\n              bottom: 1px; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day.live, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day.live {\n            background-color: #F0F0F0;\n            background-image: -webkit-linear-gradient(bottom, #F0F0F0, #F0F0F0);\n            background-image: linear-gradient(to top,#F0F0F0, #F0F0F0);\n            color: #6D6E70; }\n            [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day.live span.addon, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day.live span.addon {\n              color: #A1A1A1; }\n            [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day.live.sunday, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day.live.sunday {\n              color: #C78B81; }\n            [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day.live.saturday, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day.live.saturday {\n              color: #32B4DC; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day.focus, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day.focus {\n            background-color: #E67241;\n            background-image: -webkit-linear-gradient(bottom, #E67241, #E67241);\n            background-image: linear-gradient(to top,#E67241, #E67241);\n            color: #fff; }\n            [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day.focus span.addon, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day.focus span.addon {\n              color: #fff; }\n            [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day.focus.hover, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day.focus.hover {\n              background-color: #32B4DC;\n              background-image: -webkit-linear-gradient(bottom, #32B4DC, #32B4DC);\n              background-image: linear-gradient(to top,#32B4DC, #32B4DC);\n              color: #fff !important; }\n              [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day.focus.hover span.addon, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day.focus.hover span.addon {\n                color: #fff; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day.period, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day.period {\n            background-color: #82d3fa;\n            background-image: -webkit-linear-gradient(bottom, #82d3fa, #82d3fa);\n            background-image: linear-gradient(to top,#82d3fa, #82d3fa);\n            color: #fff !important; }\n            [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day.period span.addon, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day.period span.addon {\n              color: #fff; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day.selected-day, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day.selected-day {\n            background-color: #32B4DC;\n            background-image: -webkit-linear-gradient(bottom, #32B4DC, #32B4DC);\n            background-image: linear-gradient(to top,#32B4DC, #32B4DC);\n            color: #fff !important; }\n            [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day.selected-day span.addon, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day.selected-day span.addon {\n              color: #fff; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day.disable, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day.disable {\n            background-color: #FFFFFF;\n            background-image: -webkit-linear-gradient(bottom, #FFFFFF, #FFFFFF);\n            background-image: linear-gradient(to top,#FFFFFF, #FFFFFF);\n            color: #dddedf; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-day.holiday, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-day.holiday {\n            color: #C78B81; }\n        [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-month, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-month {\n          display: block;\n          width: 100%;\n          height: 100%;\n          vertical-align: middle;\n          border-radius: 5px;\n          overflow: hidden;\n          line-height: inherit;\n          background-color: #FFFFFF;\n          background-image: -webkit-linear-gradient(bottom, #FFFFFF, #FFFFFF);\n          background-image: linear-gradient(to top,#FFFFFF, #FFFFFF);\n          color: #C3C4C6;\n          font-size: 14px; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-month.live, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-month.live {\n            background-color: #F0F0F0;\n            background-image: -webkit-linear-gradient(bottom, #F0F0F0, #F0F0F0);\n            background-image: linear-gradient(to top,#F0F0F0, #F0F0F0);\n            color: #6D6E70; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-month.hover, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-month.hover {\n            background-color: #32B4DC;\n            background-image: -webkit-linear-gradient(bottom, #32B4DC, #32B4DC);\n            background-image: linear-gradient(to top,#32B4DC, #32B4DC);\n            color: #fff; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-month.focus, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-month.focus {\n            background-color: #E67241;\n            background-image: -webkit-linear-gradient(bottom, #E67241, #E67241);\n            background-image: linear-gradient(to top,#E67241, #E67241);\n            color: #fff; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-month.selected-month, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-month.selected-month {\n            background-color: #32B4DC;\n            background-image: -webkit-linear-gradient(bottom, #32B4DC, #32B4DC);\n            background-image: linear-gradient(to top,#32B4DC, #32B4DC);\n            color: #fff !important; }\n            [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-month.selected-month span.addon, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-month.selected-month span.addon {\n              color: #fff; }\n            [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-month.selected-month span.lunar, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-month.selected-month span.lunar {\n              color: #fff; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-month.disable, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-month.disable {\n            background-color: #FFFFFF;\n            background-image: -webkit-linear-gradient(bottom, #FFFFFF, #FFFFFF);\n            background-image: linear-gradient(to top,#FFFFFF, #FFFFFF);\n            color: #dddedf; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-month.holiday, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-month.holiday {\n            color: #C78B81; }\n        [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-year, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-year {\n          display: block;\n          width: 100%;\n          height: 100%;\n          vertical-align: middle;\n          border-radius: 5px;\n          overflow: hidden;\n          line-height: inherit;\n          background-color: #FFFFFF;\n          background-image: -webkit-linear-gradient(bottom, #FFFFFF, #FFFFFF);\n          background-image: linear-gradient(to top,#FFFFFF, #FFFFFF);\n          color: #C3C4C6;\n          font-size: 14px; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-year.live, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-year.live {\n            background-color: #F0F0F0;\n            background-image: -webkit-linear-gradient(bottom, #F0F0F0, #F0F0F0);\n            background-image: linear-gradient(to top,#F0F0F0, #F0F0F0);\n            color: #6D6E70; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-year.hover, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-year.hover {\n            background-color: #32B4DC;\n            background-image: -webkit-linear-gradient(bottom, #32B4DC, #32B4DC);\n            background-image: linear-gradient(to top,#32B4DC, #32B4DC);\n            color: #fff; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-year.focus, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-year.focus {\n            background-color: #E67241;\n            background-image: -webkit-linear-gradient(bottom, #E67241, #E67241);\n            background-image: linear-gradient(to top,#E67241, #E67241);\n            color: #fff; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-year.selected-year, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-year.selected-year {\n            background-color: #32B4DC;\n            background-image: -webkit-linear-gradient(bottom, #32B4DC, #32B4DC);\n            background-image: linear-gradient(to top,#32B4DC, #32B4DC);\n            color: #fff !important; }\n            [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-year.selected-year span.addon, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-year.selected-year span.addon {\n              color: #fff; }\n            [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-year.selected-year span.lunar, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-year.selected-year span.lunar {\n              color: #fff; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-year.disable, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-year.disable {\n            background-color: #FFFFFF;\n            background-image: -webkit-linear-gradient(bottom, #FFFFFF, #FFFFFF);\n            background-image: linear-gradient(to top,#FFFFFF, #FFFFFF);\n            color: #dddedf; }\n          [data-ax6ui-calendar] .calendar-body table tbody td .calendar-item-year.holiday, [data-ax6ui-calendar] .calendar-body table tbody th .calendar-item-year.holiday {\n            color: #C78B81; }\n", ""]);

// exports


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

/***/ }),

/***/ 69:
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

var _AX6Info = __webpack_require__(4);

var _AX6Info2 = _interopRequireDefault(_AX6Info);

var _AX6Util = __webpack_require__(1);

var _AX6Util2 = _interopRequireDefault(_AX6Util);

var _AX6Mustache = __webpack_require__(36);

var _AX6Mustache2 = _interopRequireDefault(_AX6Mustache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* ~~~~~~~~~~~~~~~~~~ end of import  ~~~~~~~~~~~~~~~~~~~~ */

var tmpl = {
  frame: function frame(columnKeys) {
    return "\n<div data-ax6ui-calendar=\"\" class=\"ax6-ui-calendar {{theme}}\" data-calendar-els=\"root\" onselectstart=\"return false;\">\n    {{#control}}\n    <div class=\"calendar-control\" data-calendar-els=\"control\" style=\"{{controlCSS}}\">\n        <a class=\"date-move-left\" data-calendar-move=\"left\" style=\"{{controlButtonCSS}}\">{{{left}}}</a>\n        <div class=\"date-display\" data-calendar-els=\"control-display\" style=\"{{controlCSS}}\"></div>\n        <a class=\"date-move-right\" data-calendar-move=\"right\" style=\"{{controlButtonCSS}}\">{{{right}}}</a>\n    </div>\n    {{/control}}\n    <div class=\"calendar-body\" data-calendar-els=\"body\"></div>\n</div>\n";
  },
  day: function day(columnKeys) {
    return "\n<table data-calendar-table=\"day\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%;\">\n    <thead>\n        <tr>\n        {{#weekNames}}\n            <td class=\"calendar-col-{{col}}\" style=\"height: {{colHeadHeight}}\">\n            {{label}}\n            </td>\n        {{/weekNames}}\n        </tr>\n    </thead>\n    <tbody>\n        <tr>\n            {{#list}}    \n            {{#isStartOfWeek}}\n            {{^@first}}\n        </tr>\n        <tr>\n            {{/@first}}\n            {{/isStartOfWeek}}\n            <td class=\"calendar-col-{{col}}\" style=\"{{itemStyles}}\">\n                <a class=\"calendar-item-day {{addClass}}\" data-calendar-item-date=\"{{thisDate}}\">\n                    <span class=\"addon addon-header\"></span>\n                    {{thisDataLabel}}\n                    <span class=\"addon addon-footer\"></span>\n                </a>\n            </td>\n            {{/list}}\n        </tr>\n    </tbody>\n</table>\n";
  },
  month: function month(columnKeys) {
    return "\n<table data-calendar-table=\"month\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%;\">\n    <thead>\n        <tr>\n            <td class=\"calendar-col-0\" colspan=\"3\" style=\"height: {{colHeadHeight}}\">\n            {{colHeadLabel}}\n            </td>\n        </tr>\n    </thead>\n    <tbody>\n        <tr>\n            {{#list}}    \n            {{#isStartOfRow}}\n            {{^@first}}\n        </tr>\n        <tr>\n            {{/@first}}\n            {{/isStartOfRow}}\n            <td class=\"calendar-col-{{col}}\" style=\"{{itemStyles}}\">\n                <a class=\"calendar-item-month {{addClass}}\" data-calendar-item-month=\"{{thisMonth}}\">\n                    <span class=\"addon\"></span>\n                    {{thisMonthLabel}}\n                    <span class=\"lunar\"></span>\n                </a>\n            </td>\n            {{/list}}\n        </tr>\n    </tbody>\n</table>\n";
  },
  year: function year(columnKeys) {
    return "\n<table data-calendar-table=\"year\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:100%;\">\n    <thead>\n        <tr>\n            <td class=\"calendar-col-0\" colspan=\"4\" style=\"height: {{colHeadHeight}}\">\n            {{colHeadLabel}}\n            </td>\n        </tr>\n    </thead>\n    <tbody>\n        <tr>\n            {{#list}}    \n            {{#isStartOfRow}}\n            {{^@first}}\n        </tr>\n        <tr>\n            {{/@first}}\n            {{/isStartOfRow}}\n            <td class=\"calendar-col-{{col}}\" style=\"{{itemStyles}}\">\n                <a class=\"calendar-item-year {{addClass}}\" data-calendar-item-year=\"{{thisYear}}\">\n                    <span class=\"addon\"></span>\n                    {{thisYearLabel}}\n                    <span class=\"lunar\"></span>\n                </a>\n            </td>\n            {{/list}}\n        </tr>\n    </tbody>\n</table>\n";
  }
};

var onStateChanged = function onStateChanged(opts, that) {
  if (opts && opts.onStateChanged) {
    opts.onStateChanged.call(that, that);
  } else if (this.onStateChanged) {
    this.onStateChanged.call(that, that);
  }

  that = null;
};
var getFrame = function getFrame() {
  var data = _jqmin2.default.extend(true, {}, this.config, {
    controlCSS: {},
    controlButtonCSS: {}
  });

  data.controlButtonCSS["height"] = data.controlCSS["height"] = _AX6Util2.default.cssNumber(this.config.dimensions.controlHeight);
  data.controlButtonCSS["line-height"] = data.controlCSS["line-height"] = _AX6Util2.default.cssNumber(this.config.dimensions.controlHeight);
  data.controlButtonCSS["width"] = _AX6Util2.default.cssNumber(this.config.dimensions.controlHeight);

  data.controlCSS = _AX6Util2.default.css(data.controlCSS);
  data.controlButtonCSS = _AX6Util2.default.css(data.controlButtonCSS);

  try {
    return _AX6Mustache2.default.render(tmpl.frame.call(this), data);
  } finally {
    data = null;
  }
};
var setDisplay = function setDisplay() {
  var _this = this;

  var myDate = _AX6Util2.default.date(this.config.displayDate),
      yy = "",
      mm = "",
      yy1 = void 0,
      yy2 = void 0;

  if (this.config.control) {
    if (this.config.mode == "day" || this.config.mode == "d") {
      yy = this.config.control.yearTmpl ? this.config.control.yearTmpl.replace('%s', myDate.getFullYear()) : myDate.getFullYear();
      mm = this.config.control.monthTmpl ? this.config.control.monthTmpl.replace('%s', this.config.lang.months[myDate.getMonth()]) : this.config.lang.months[myDate.getMonth()];

      this.$["control-display"].html(function () {
        if (_this.config.control.yearFirst) {
          return '<span data-calendar-display="year">' + yy + '</span>' + '<span data-calendar-display="month">' + mm + '</span>';
        } else {
          return '<span data-calendar-display="month">' + mm + '</span>' + '<span data-calendar-display="year">' + yy + '</span>';
        }
      }());
    } else if (this.config.mode == "month" || this.config.mode == "m") {
      yy = this.config.control.yearTmpl ? this.config.control.yearTmpl.replace('%s', myDate.getFullYear()) : myDate.getFullYear();
      this.$["control-display"].html('<span data-calendar-display="year">' + yy + '</span>');
    } else if (this.config.mode == "year" || this.config.mode == "y") {
      yy1 = this.config.control.yearTmpl ? this.config.control.yearTmpl.replace('%s', myDate.getFullYear() - 10) : myDate.getFullYear() - 10;
      yy2 = this.config.control.yearTmpl ? this.config.control.yearTmpl.replace('%s', Number(myDate.getFullYear()) + 9) : Number(myDate.getFullYear()) + 9;
      this.$["control-display"].html(yy1 + ' ~ ' + yy2);
    }

    this.$["control-display"].off(this.config.clickEventName).on(this.config.clickEventName, '[data-calendar-display]', function (e) {
      var target = _AX6Util2.default.findParentNode(e.target, function (target) {
        if (target.getAttribute("data-calendar-display")) {
          return true;
        }
      }),
          mode = void 0;
      if (target) {
        mode = target.getAttribute("data-calendar-display");
        this.changeMode(mode);
      }
      target = null;
      mode = null;
    }.bind(this));
  }

  myDate = null;
  yy = null;
  mm = null;
  yy1 = null;
  yy2 = null;
  return this;
};
var printDay = function printDay(nowDate) {
  var _this2 = this;

  var dotDate = _AX6Util2.default.date(nowDate),
      monthStratDate = new Date(dotDate.getFullYear(), dotDate.getMonth(), 1, 12),
      _today = this.config.displayDate,
      tableStartDate = function () {
    var day = monthStratDate.getDay();
    if (day == 0) day = 7;
    day -= _this2.config.startOfWeek;

    try {
      return _AX6Util2.default.date(monthStratDate, { add: { d: -day } });
    } finally {
      day = null;
    }
  }(),
      loopDate = void 0,
      thisMonth = dotDate.getMonth(),
      itemStyles = {},
      i = void 0,
      k = void 0,
      _k = void 0,
      frameWidth = this.$["body"].width(),
      frameHeight = Math.floor(frameWidth * (6 / 7)),
      // 1week = 7days, 1month = 6weeks
  data = void 0;

  if (this.config.dimensions.height) {
    frameHeight = _AX6Util2.default.number(this.config.dimensions.height) - _AX6Util2.default.number(this.config.dimensions.colHeadHeight);
  }

  itemStyles['height'] = Math.floor(frameHeight / 6) - _AX6Util2.default.number(this.config.dimensions.itemPadding) * 2 + 'px';
  itemStyles['line-height'] = itemStyles['height'];
  itemStyles['padding'] = _AX6Util2.default.cssNumber(this.config.dimensions.itemPadding);

  data = {
    weekNames: [].concat(_AX6Info2.default.weekNames),
    list: []
  };

  if (this.config.startOfWeek) {
    data.weekNames = data.weekNames.concat(data.weekNames.slice(0, this.config.startOfWeek)).splice(this.config.startOfWeek);
  }

  data.weekNames.forEach(function (n) {
    n.colHeadHeight = _AX6Util2.default.cssNumber(_this2.config.dimensions.colHeadHeight);
  });

  loopDate = tableStartDate;
  i = 0;
  while (i < 6) {
    k = 0;

    var _loop = function _loop() {
      _k = (7 + (k - _this2.config.startOfWeek)) % 7;
      var thisDate = '' + _AX6Util2.default.date(loopDate, { "return": _this2.config.dateFormat }),
          _date = {
        'row': i,
        'col': k,
        isStartOfWeek: k == 0,
        thisDate: '' + thisDate,
        thisDataLabel: _this2.config.lang.dayTmpl.replace('%s', loopDate.getDate()),
        itemStyles: _AX6Util2.default.css(itemStyles),
        addClass: function () {
          var classNames = "";

          if (_this2.config.selectable) {
            if (_this2.selectableMap[thisDate]) {
              classNames += loopDate.getMonth() == thisMonth ? " live" : "";
            } else {
              classNames += " disable";
            }
          } else {
            if (loopDate.getMonth() == thisMonth) {
              if (thisDate == _AX6Util2.default.date(_today, { "return": "yyyyMMdd" })) {
                classNames += " focus";
              } else {
                classNames += " live";
              }

              if (loopDate.getDay() == 0) {
                classNames += " sunday";
              }
              if (loopDate.getDay() == 6) {
                classNames += " saturday";
              }
            }
          }

          return classNames;
        }() + ' ' + function () {
          return _this2.markerMap[thisDate] ? _this2.markerMap[thisDate].theme || _this2.config.defaultMarkerTheme : '';
        }() + ' ' + function () {
          return _this2.selectionMap[thisDate] ? "selected-day" : '';
        }()
      };
      data.list.push(_date);

      k++;
      loopDate = _AX6Util2.default.date(loopDate, { add: { d: 1 } });

      thisDate = null;
      _date = null;
    };

    while (k < 7) {
      _loop();
    }
    i++;
  }

  this.$["body"].html(_AX6Mustache2.default.render(tmpl.day.call(this), data)).off(this.config.clickEventName).on(this.config.clickEventName, '[data-calendar-item-date]', function (e) {
    e = e || window.event;
    onclick.call(_this2, e, 'date');
    _AX6Util2.default.stopEvent(e);
  });

  this.printedDay = {
    start: tableStartDate, end: loopDate
  };

  onStateChanged.call(this, null, {
    self: this,
    action: "printDay",
    printedDay: this.printedDay
  });
  setDisplay.call(this);

  dotDate = null;
  monthStratDate = null;
  _today = null;
  tableStartDate = null;
  loopDate = null;
  thisMonth = null;
  itemStyles = null;
  i = null;
  k = null;
  frameWidth = null;
  frameHeight = null;
  data = null;
};
var printMonth = function printMonth(nowDate) {
  var _this3 = this;

  var dotDate = _AX6Util2.default.date(nowDate),
      nMonth = dotDate.getMonth(),
      itemStyles = {},
      i = void 0,
      k = void 0,
      m = void 0,
      tableStartMonth = void 0,
      frameWidth = this.$["body"].width(),
      frameHeight = Math.floor(frameWidth * (6 / 7)),
      data = void 0;

  if (this.config.dimensions.height) {
    frameHeight = _AX6Util2.default.number(this.config.dimensions.height) - _AX6Util2.default.number(this.config.dimensions.colHeadHeight);
  }

  itemStyles['height'] = Math.floor(frameHeight / 4) - _AX6Util2.default.number(this.config.dimensions.itemPadding) * 2 + 'px';
  itemStyles['line-height'] = itemStyles['height'];
  itemStyles['padding'] = _AX6Util2.default.cssNumber(this.config.dimensions.itemPadding);

  data = {
    colHeadHeight: _AX6Util2.default.cssNumber(this.config.dimensions.colHeadHeight),
    colHeadLabel: this.config.lang.monthHeading,
    list: []
  };

  tableStartMonth = 0;
  m = 0;
  i = 0;
  while (i < 4) {
    k = 0;
    while (k < 3) {
      var _month = {
        row: i,
        col: k,
        isStartOfRow: k == 0,
        thisMonth: dotDate.getFullYear() + '-' + _AX6Util2.default.setDigit(m + 1, 2) + '-' + _AX6Util2.default.setDigit(dotDate.getDate(), 2),
        thisMonthLabel: this.config.lang.months[m],
        itemStyles: _AX6Util2.default.css(itemStyles),
        addClass: function () {
          if (_this3.config.selectable) {
            return _this3.selectableMap[m] ? 'live' : 'disable';
          } else {
            return 'live';
          }
        }() + ' ' + function () {
          return m == nMonth ? "focus" : "";
        }() + ' ' + function () {
          return _this3.markerMap[m] ? _this3.markerMap[m].theme || _this3.config.defaultMarkerTheme : '';
        }()
      };
      data.list.push(_month);
      m++;
      k++;
      _month = null;
    }
    i++;
  }

  this.$["body"].html(_AX6Mustache2.default.render(tmpl.month.call(this), data)).off(this.config.clickEventName).on(this.config.clickEventName, '[data-calendar-item-month]', function (e) {
    e = e || window.event;
    onclick.call(_this3, e, 'month');
    _AX6Util2.default.stopEvent(e);
  });

  this.printedDay = {
    start: dotDate.getFullYear() + '-' + _AX6Util2.default.setDigit(tableStartMonth + 1, 2),
    end: dotDate.getFullYear() + '-' + _AX6Util2.default.setDigit(m, 2)
  };

  onStateChanged.call(this, null, {
    self: this,
    action: "printMonth",
    printedDay: this.printedDay
  });
  setDisplay.call(this);

  dotDate = null;
  nMonth = null;
  itemStyles = null;
  i = null;
  k = null;
  m = null;
  tableStartMonth = null;
  frameWidth = null;
  frameHeight = null;
  data = null;
};
var printYear = function printYear(nowDate) {
  var _this4 = this;

  var dotDate = _AX6Util2.default.date(nowDate),
      nYear = dotDate.getFullYear(),
      itemStyles = {},
      i = void 0,
      k = void 0,
      y = void 0,
      tableStartYear = void 0,
      frameWidth = this.$["body"].width(),
      frameHeight = Math.floor(frameWidth * (6 / 7)),
      data = void 0;

  if (this.config.dimensions.height) {
    frameHeight = _AX6Util2.default.number(this.config.dimensions.height) - _AX6Util2.default.number(this.config.dimensions.colHeadHeight);
  }

  itemStyles['height'] = Math.floor(frameHeight / 5) - _AX6Util2.default.number(this.config.dimensions.itemPadding) * 2 + 'px';
  itemStyles['line-height'] = itemStyles['height'];
  itemStyles['padding'] = _AX6Util2.default.cssNumber(this.config.dimensions.itemPadding);

  data = {
    colHeadHeight: _AX6Util2.default.cssNumber(this.config.dimensions.colHeadHeight),
    colHeadLabel: this.config.lang.yearHeading,
    list: []
  };

  tableStartYear = nYear - 10;
  y = nYear - 10;
  i = 0;
  while (i < 5) {
    k = 0;
    while (k < 4) {
      var _year = {
        row: i,
        col: k,
        isStartOfRow: k == 0,
        thisYear: y + '-' + _AX6Util2.default.setDigit(dotDate.getMonth() + 1, 2) + '-' + _AX6Util2.default.setDigit(dotDate.getDate(), 2),
        thisYearLabel: this.config.lang.yearTmpl.replace('%s', y),
        itemStyles: _AX6Util2.default.css(itemStyles),
        addClass: function () {
          if (_this4.config.selectable) {
            return _this4.selectableMap[y] ? 'live' : 'disable';
          } else {
            return 'live';
          }
        }() + ' ' + function () {
          return y == nYear ? "focus" : "";
        }() + ' ' + function () {
          return _this4.selectableMap[y] ? _this4.selectableMap[y].theme || _this4.config.defaultMarkerTheme : '';
        }()
      };
      data.list.push(_year);
      y++;
      k++;
      _year = null;
    }
    i++;
  }

  this.$["body"].html(_AX6Mustache2.default.render(tmpl.year.call(this), data)).off(this.config.clickEventName).on(this.config.clickEventName, '[data-calendar-item-year]', function (e) {
    e = e || window.event;
    onclick.call(_this4, e, 'year');
    _AX6Util2.default.stopEvent(e);
  });

  this.printedDay = {
    start: tableStartYear, end: y - 1
  };

  onStateChanged.call(this, null, {
    self: this,
    action: "printYear",
    printedDay: this.printedDay
  });
  setDisplay.call(this);

  dotDate = null;
  nYear = null;
  itemStyles = null;
  i = null;
  k = null;
  y = null;
  tableStartYear = null;
  frameWidth = null;
  frameHeight = null;
  data = null;
};
var onclick = function onclick(e, mode, target, value) {
  var _this5 = this;

  var removed = void 0,
      dt = void 0,
      selectable = void 0;

  mode = mode || "date";
  target = _AX6Util2.default.findParentNode(e.target, function (target) {
    if (target.getAttribute("data-calendar-item-" + mode)) {
      return true;
    }
  });
  if (target) {
    value = target.getAttribute("data-calendar-item-" + mode);

    dt = _AX6Util2.default.date(value, { "return": this.config.dateFormat });
    selectable = true;
    this.selectableCount = this.config.multipleSelect ? _AX6Util2.default.isNumber(this.config.multipleSelect) ? this.config.multipleSelect : 2 : 1;

    if (this.config.selectable) {
      if (!this.selectableMap[dt]) selectable = false;
    }

    if (mode == "date") {
      if (selectable) {

        if (this.selection.length >= this.selectableCount) {
          removed = this.selection.splice(0, this.selection.length - (this.selectableCount - 1));
          removed.forEach(function (d) {
            _this5.$["body"].find('[data-calendar-item-date="' + _AX6Util2.default.date(d, { "return": _this5.config.dateFormat }) + '"]').removeClass("selected-day");
          });
        }

        (0, _jqmin2.default)(target).addClass("selected-day");
        this.selection.push(value);

        if (this.onClick) {
          this.onClick.call({
            self: this, date: value, target: this.target, dateElement: target
          });
        }
      }
    } else if (mode == "month") {
      if (this.config.selectMode == "month") {
        if (selectable) {
          if (this.selection.length >= this.selectableCount) {
            removed = this.selection.splice(0, this.selection.length - (this.selectableCount - 1));
            removed.forEach(function (d) {
              _this5.$["body"].find('[data-calendar-item-month="' + _AX6Util2.default.date(d, { "return": 'yyyy-MM-dd' }) + '"]').removeClass("selected-month");
            });
          }

          (0, _jqmin2.default)(target).addClass("selected-month");
          this.selection.push(value);

          if (this.onClick) {
            this.onClick.call({
              self: this, date: value, target: this.target, dateElement: target
            });
          }
        }
      } else {
        this.changeMode("day", value);
      }
    } else if (mode == "year") {
      if (this.config.selectMode == "year") {
        if (selectable) {
          if (this.selection.length >= this.selectableCount) {
            removed = this.selection.splice(0, this.selection.length - (this.selectableCount - 1));
            removed.forEach(function (d) {
              _this5.$["body"].find('[data-calendar-item-year="' + _AX6Util2.default.date(d, { "return": 'yyyy-MM-dd' }) + '"]').removeClass("selected-year");
            });
          }

          (0, _jqmin2.default)(target).addClass("selected-year");
          this.selection.push(value);

          if (this.onClick) {
            this.onClick.call({
              self: this, date: value, target: this.target, dateElement: target
            });
          }
        }
      } else {
        this.changeMode("month", value);
      }
    }
  }

  mode = null;
  target = null;
  value = null;
  removed = null;
  dt = null;
  selectable = null;
};
var move = function move(e, target, value) {
  target = _AX6Util2.default.findParentNode(e.target, function (target) {
    if (target.getAttribute("data-calendar-move")) {
      return true;
    }
  });
  if (target) {
    value = target.getAttribute("data-calendar-move");
    if (this.config.mode == "day" || this.config.mode == "d") {
      if (value == "left") {
        this.config.displayDate = _AX6Util2.default.date(this.config.displayDate, { add: { m: -1 } });
      } else {
        this.config.displayDate = _AX6Util2.default.date(this.config.displayDate, { add: { m: 1 } });
      }
      printDay.call(this, this.config.displayDate);
    } else if (this.config.mode == "month" || this.config.mode == "m") {
      if (value == "left") {
        this.config.displayDate = _AX6Util2.default.date(this.config.displayDate, { add: { y: -1 } });
      } else {
        this.config.displayDate = _AX6Util2.default.date(this.config.displayDate, { add: { y: 1 } });
      }
      printMonth.call(this, this.config.displayDate);
    } else if (this.config.mode == "year" || this.config.mode == "y") {
      if (value == "left") {
        this.config.displayDate = _AX6Util2.default.date(this.config.displayDate, { add: { y: -10 } });
      } else {
        this.config.displayDate = _AX6Util2.default.date(this.config.displayDate, { add: { y: 10 } });
      }
      printYear.call(this, this.config.displayDate);
    }
  }

  target = null;
  value = null;
};
var applyMarkerMap = function applyMarkerMap() {
  setTimeout(function () {
    if (this.config.mode === "day" || this.config.mode === "d") {
      for (var k in this.markerMap) {
        this.$["body"].find('[data-calendar-item-date="' + k + '"]').addClass(this.markerMap[k].theme || this.config.defaultMarkerTheme);
      }
    }
  }.bind(this));
};
var applySelectionMap = function applySelectionMap() {
  setTimeout(function () {
    for (var k in this.selectionMap) {
      this.$["body"].find('[data-calendar-item-date="' + k + '"]').addClass("selected-day");
    }
  }.bind(this));
};
var applyPeriodMap = function applyPeriodMap() {
  setTimeout(function () {
    if (this.config.mode === "day" || this.config.mode === "d") {
      for (var k in this.periodMap) {
        if (this.periodMap[k].label) {
          this.$["body"].find('[data-calendar-item-date="' + k + '"]').find(".addon-footer").html(this.periodMap[k].label);
        }
        this.$["body"].find('[data-calendar-item-date="' + k + '"]').addClass(this.periodMap[k].theme);
      }
    }
  }.bind(this));
};
var clearPeriodMap = function clearPeriodMap() {
  if (this.config.mode === "day" || this.config.mode === "d") {
    for (var k in this.periodMap) {
      this.$["body"].find('[data-calendar-item-date="' + k + '"]').find(".addon-footer").empty();
      this.$["body"].find('[data-calendar-item-date="' + k + '"]').removeClass(this.periodMap[k].theme);
    }
  }
};
/* ~~~~~~~~~~~~~~~~~~ end of private  ~~~~~~~~~~~~~~~~~~~~ */

/**
 * @class
 */

var AX6UICalendar = function (_AX6UICore) {
  _inherits(AX6UICalendar, _AX6UICore);

  /**
   * @constructor
   * @param {object} config
   * @param {string} [config.theme = 'default']
   * @param {!(object|string)} [config.target]
   * @param {number} [config.animateTime = 100]
   * @param {function} [config.onStateChanged]
   * @param {function} [config.onClick]
   * @param [config.content]
   * @example
   * ```js
   * var myCalendar = new AX6UICalendar();
   * ```
   */
  function AX6UICalendar(config) {
    _classCallCheck(this, AX6UICalendar);

    var _this6 = _possibleConstructorReturn(this, (AX6UICalendar.__proto__ || Object.getPrototypeOf(AX6UICalendar)).call(this));

    _this6.config = {
      clickEventName: "click",
      theme: 'default',
      startOfWeek: 0,
      mode: 'day', // day|month|year,
      dateFormat: 'yyyy-MM-dd',
      displayDate: new Date(),
      animateTime: 100,
      dimensions: {
        controlHeight: '40',
        controlButtonWidth: '40',
        colHeadHeight: '30',
        itemPadding: 2
      },
      lang: {
        yearHeading: "Choose the year",
        monthHeading: "Choose the month",
        yearTmpl: "%s",
        months: _AX6Info2.default.months || ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        dayTmpl: "%s"
      },
      multipleSelect: false,
      selectMode: 'day',
      defaultMarkerTheme: 'holiday',
      defaultPeriodTheme: 'period'
    };
    _jqmin2.default.extend(true, _this6.config, config);

    // 멤버 변수 초기화
    _this6.$target = null;
    _this6.selection = [];
    _this6.selectionMap = {};
    _this6.selectableMap = {};
    _this6.markerMap = {};
    _this6.printedDay = {
      start: "", end: ""
    };
    _this6.selectableCount = 1;

    _this6.init();
    return _this6;
  }

  /**
   * @method AX6UICalendar.init
   * @example
   * ```js
   * myCalendar.init();
   * ```
   */


  _createClass(AX6UICalendar, [{
    key: "init",
    value: function init() {
      var _this7 = this;

      this.onStateChanged = this.config.onStateChanged;
      delete this.config.onStateChanged;
      this.onClick = this.config.onClick;
      delete this.config.onClick;

      if (!this.config.target) {
        console.log(_AX6Info2.default.getError("ax6calendar", "401", "setConfig"));
      }
      this.$target = (0, _jqmin2.default)(this.config.target);
      this.config.displayDate = _AX6Util2.default.date(this.config.displayDate);

      this.$target.html(getFrame.call(this));

      // 부속수집
      this.$ = {
        "root": this.$target.find('[data-calendar-els="root"]'),
        "control": this.$target.find('[data-calendar-els="control"]'),
        "control-display": this.$target.find('[data-calendar-els="control-display"]'),
        "body": this.$target.find('[data-calendar-els="body"]')
      };

      if (this.config.control) {
        this.$["root"].on(this.config.clickEventName, '[data-calendar-move]', function (e) {
          move.call(_this7, e || window.event);
        });
      }

      // collect selectableMap
      if (this.config.selection) {
        this.setSelection(this.config.selection, false);
      }
      // collect selectableMap
      if (this.config.selectable) {
        this.setSelectable(this.config.selectable, false);
      }
      // collect markerMap
      if (this.config.marker) {
        this.setMarker(this.config.marker, false);
      }

      setTimeout(function () {
        if (this.config.mode === "day" || this.config.mode === "d") {
          printDay.call(this, this.config.displayDate);
        } else if (this.config.mode === "month" || this.config.mode === "m") {
          printMonth.call(this, this.config.displayDate);
        } else if (this.config.mode === "year" || this.config.mode === "y") {
          printYear.call(this, this.config.displayDate);
        }
      }.bind(this));

      // init 호출 여부
      this.initOnce();
    }

    /**
     * @method AX6UICalendar.initOnce
     * @example
     * ```js
     * myCalendar.initOnce();
     * ```
     */

  }, {
    key: "initOnce",
    value: function initOnce() {
      if (this.initialized) return this;
      this.initialized = true;
    }

    /**
     * Outputs to the screen in the output mode defined in the Calendar. If you pass an argument, you can change the output mode and output reference date.
     * 캘린더의 모드를 변경합니다.
     * @method AX6UICalendar.changeMode
     * @param {string} mode - day, d, month, m , year, y
     * @param {(Date|string)} [changeDate]
     * @return {AX6UICalendar}
     * @example
     * ```js
     * myCalendar.changeMode("y");
     * myCalendar.changeMode("year");
     * myCalendar.changeMode("month");
     * myCalendar.changeMode("m");
     * myCalendar.changeMode("day");
     * myCalendar.changeMode("d");
     * ```
     */

  }, {
    key: "changeMode",
    value: function changeMode(mode, changeDate) {
      var _this8 = this;

      if (typeof changeDate != "undefined") this.config.displayDate = changeDate;
      if (mode) this.config.mode = mode;

      this.$["body"].removeClass("fadein").addClass("fadeout");

      setTimeout(function () {
        if (_this8.config.mode == "day" || _this8.config.mode == "d") {
          printDay.call(_this8, _this8.config.displayDate);
        } else if (_this8.config.mode == "month" || _this8.config.mode == "m") {
          printMonth.call(_this8, _this8.config.displayDate);
        } else if (_this8.config.mode == "year" || _this8.config.mode == "y") {
          printYear.call(_this8, _this8.config.displayDate);
        }
        _this8.$["body"].removeClass("fadeout").addClass("fadein");
      }, this.config.animateTime);

      return this;
    }

    /**
     * Changes to state a date is selected, which is included in the selection.
     * 캘린더에 해당일자를 선택된 상태로 설정합니다.
     * @method AX6UICalendar.setSelection
     * @param {Array} selection
     * @param {boolean} [isPrint]
     * @return {AX6UICalendar}
     * @example
     * ```js
     * myCalendar.setSelection([new Date()]);
     * ```
     */

  }, {
    key: "setSelection",
    value: function setSelection(selection, isPrint) {
      this.selectionMap = {};
      var result = {};
      var processor = {
        'arr': function arr(v, map, count) {
          var _this9 = this;

          map = {};
          if (!_AX6Util2.default.isArray(v)) return map;
          this.selection = v = v.splice(0, count);
          v.forEach(function (n) {
            if (_AX6Util2.default.isDate(n)) n = _AX6Util2.default.date(n, { 'return': _this9.config.dateFormat });
            map[n] = true;
          });
          return map;
        }
      };

      this.selectableCount = this.config.multipleSelect ? _AX6Util2.default.isNumber(this.config.multipleSelect) ? this.config.multipleSelect : 2 : 1;

      if (this.config.selection = selection) {
        if (_AX6Util2.default.isArray(selection)) {
          result = processor.arr.call(this, selection, {}, this.selectableCount);
        } else {
          return this;
        }
      }

      this.selectionMap = _jqmin2.default.extend({}, result);
      // 변경내용 적용하여 출력

      if (isPrint !== false) applySelectionMap.call(this);

      result = null;

      return this;
    }

    /**
     * 캘린더에서 선택된 일자를 반환합니다.
     * @method AX6UICalendar.getSelection
     * @return {Array}
     * @example
     * ```js
     * myCalendar.getSelection();
     * ```
     */

  }, {
    key: "getSelection",
    value: function getSelection() {
      return this.selection;
    }

    /**
     * Set the date / year / month that can be selected from the Calendar. selectable is, Array and Object({from: '', to: ''}) is made up of.
     * 캘린더에 해당일자를 선택할 수 있는 상태로 설정합니다.
     * @method AX6UICalendar.setSelectable
     * @param {Array} selectable
     * @param {boolean} [isPrint]
     * @return {AX6UICalendar}
     * @example
     * ```js
     * myCalendar.setSelectable(['2016-01-01', ...]);
     * myCalendar.setSelectable([new Date(), ...]);
     * myCalendar.setSelectable({ range: [{from: '2016-01-01', to: '2016-01-10'}] });
     * myCalendar.setSelectable({ range: [{from: new Date(), to: new Date()}] });
     * myCalendar.setSelectable({ '2016-01-01': true, '2016-01-02': true });
     * ```
     */

  }, {
    key: "setSelectable",
    value: function setSelectable(selectable, isPrint) {
      this.selectableMap = {};
      var key = void 0,
          result = {};
      var processor = {
        'arr': function arr(v, map) {
          var _this10 = this;

          map = {};
          if (!_AX6Util2.default.isArray(v)) return map;
          v.forEach(function (n) {
            if (_AX6Util2.default.isDate(n)) n = _AX6Util2.default.date(n, { 'return': _this10.config.dateFormat });
            map[n] = true;
          });
          return map;
        },
        'obj': function obj(v, map) {
          map = {};
          if (_AX6Util2.default.isArray(v)) return map;
          if (v.range) return map;
          for (var k in v) {
            map[k] = v[k];
          }
          return map;
        },
        'range': function range(v, map) {
          var _this11 = this;

          map = {};
          if (_AX6Util2.default.isArray(v)) return map;
          if (!v.range) return map;

          v.range.forEach(function (n) {
            if (_AX6Util2.default.isDateFormat(n.from) && _AX6Util2.default.isDateFormat(n.to)) {
              for (var d = _AX6Util2.default.date(n.from); d <= _AX6Util2.default.date(n.to); d.setDate(d.getDate() + 1)) {
                map[_AX6Util2.default.date(d, { "return": _this11.config.dateFormat })] = true;
              }
            } else {
              for (var i = n.from; i <= n.to; i++) {
                map[i] = true;
              }
            }
          });

          return map;
        }
      };

      if (this.config.selectable = selectable) {
        if (_AX6Util2.default.isArray(selectable)) {
          result = processor.arr.call(this, selectable);
        } else {
          for (key in processor) {
            if (selectable[key]) {
              result = processor[key].call(this, selectable);
              break;
            }
          }
          if (Object.keys(result).length === 0) {
            result = processor.obj.call(this, selectable);
          }
        }
      }

      this.selectableMap = result;
      // 변경내용 적용하여 출력
      if (isPrint !== false) this.changeMode();

      return this;
    }

    /**
     * 캘린더에 휴일을 표시합니다.
     * @method AX6UICalendar.marker
     * @param {Object} marker
     * @param {boolean} [isApply]
     * @return {AX6UICalendar}
     * @example
     * ```js
     * myCalendar.setMarker({
       * '2016-02-07': {theme: 'holiday', label: '설날'},
       * '2016-02-08': {theme: 'holiday', label: '설날'},
       * '2016-02-09': {theme: 'holiday', label: '설날'},
       * '2016-02-10': {theme: 'holiday', label: '대체휴일'}
       *  });
     * ```
     */

  }, {
    key: "setMarker",
    value: function setMarker(marker, isApply) {
      this.markerMap = {};
      var key = void 0,
          result = {};
      var processor = {
        'obj': function obj(v, map) {
          map = {};
          if (_AX6Util2.default.isArray(v)) return map;
          if (v.range) return map;
          for (var k in v) {
            map[k] = v[k];
          }

          v = null;
          return map;
        },
        'range': function range(v, map) {
          var _this12 = this;

          map = {};
          if (_AX6Util2.default.isArray(v)) return map;
          if (!v.range) return map;

          v.range.forEach(function (n) {
            if (_AX6Util2.default.isDateFormat(n.from) && _AX6Util2.default.isDateFormat(n.to)) {
              for (var d = _AX6Util2.default.date(n.from); d <= _AX6Util2.default.date(n.to); d.setDate(d.getDate() + 1)) {
                map[_AX6Util2.default.date(d, { "return": _this12.config.dateFormat })] = { theme: n.theme, label: n.label };
              }
            } else {
              for (var i = n.from; i <= n.to; i++) {
                map[i] = { theme: n.theme, label: n.label };
              }
            }
          });

          v = null;
          return map;
        }
      };

      if (this.config.marker = marker) {
        for (key in processor) {
          if (marker[key]) {
            result = processor[key].call(this, marker);
            break;
          }
        }
        if (Object.keys(result).length === 0) {
          result = processor.obj.call(this, marker);
        }
      }

      this.markerMap = result;
      // 변경내용 적용하여 출력
      if (isApply !== false) applyMarkerMap.call(this);
      return this;
    }

    /**
     * @method AX6UICalendar.setPeriod
     * @param {Object} period
     * @param {boolean} [isApply]
     * @return {AX6UICalendar}
     * @example
     * ```js
     * myCalendar.setPeriod({
       *  range: [
       *      {from: '2016-07-05', to: '2016-07-09', fromLabel: '시작', toLabel: '종료'},
       *      {from: '2016-07-11', to: '2016-07-15', fromLabel: '시작', toLabel: '종료'}
       *  ]
       * });
     * ```
     */

  }, {
    key: "setPeriod",
    value: function setPeriod(period, isApply) {
      var key = void 0,
          result = {};
      var processor = {
        'range': function range(v, map) {
          var _this13 = this;

          map = {};
          if (_AX6Util2.default.isArray(v)) return map;
          if (!v.range) return map;

          v.range.forEach(function (n) {
            if (_AX6Util2.default.isDateFormat(n.from) && _AX6Util2.default.isDateFormat(n.to)) {
              for (var d = new Date(_AX6Util2.default.date(n.from)); d <= _AX6Util2.default.date(n.to); d.setDate(d.getDate() + 1)) {
                if (d.getTime() == _AX6Util2.default.date(n.from).getTime()) {
                  map[_AX6Util2.default.date(d, { "return": _this13.config.dateFormat })] = {
                    theme: n.theme || _this13.config.defaultPeriodTheme,
                    label: n.fromLabel
                  };
                } else if (d.getTime() == _AX6Util2.default.date(n.to).getTime()) {
                  map[_AX6Util2.default.date(d, { "return": _this13.config.dateFormat })] = {
                    theme: n.theme || _this13.config.defaultPeriodTheme,
                    label: n.toLabel
                  };
                } else {
                  map[_AX6Util2.default.date(d, { "return": _this13.config.dateFormat })] = { theme: n.theme || _this13.config.defaultPeriodTheme };
                }
              }
            }
          });

          v = null;
          return map;
        }
      };

      // 변경내용 적용하여 출력
      if (isApply !== false) {
        clearPeriodMap.call(this);
      }

      if (this.config.period = period) {
        result = processor.range.call(this, period);
      }

      this.periodMap = result;

      // 변경내용 적용하여 출력
      if (isApply !== false) {
        applyPeriodMap.call(this);
      }
      return this;
    }
  }]);

  return AX6UICalendar;
}(_AX6UICore3.default);

exports.default = AX6UICalendar;

/***/ }),

/***/ 70:
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

var _AX6Info = __webpack_require__(4);

var _AX6Info2 = _interopRequireDefault(_AX6Info);

var _AX6Util = __webpack_require__(1);

var _AX6Util2 = _interopRequireDefault(_AX6Util);

var _AX6Mustache = __webpack_require__(36);

var _AX6Mustache2 = _interopRequireDefault(_AX6Mustache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* ~~~~~~~~~~~~~~~~~~ end of import  ~~~~~~~~~~~~~~~~~~~~ */

var frameTmpl = function frameTmpl(columnKeys) {
  return "\n<div data-ax6ui-palette=\"\">\n<div data-ax6palette-container=\"root\">\n    <div data-ax6palette-container=\"colors\"></div>\n    <div data-ax6palette-container=\"controls\"></div>\n</div>\n</div>\n";
};
var colorsTmpl = function colorsTmpl(columnKeys) {
  return "\n{{#colors}}\n{{#list}}\n<div data-ax6palette-color=\"{{label}}\" data-ax6palette-color-index=\"{{@i}}\">\n    <div data-panel=\"color-preview\" style=\"padding:{{preview.cellPadding}}px;width:{{preview.cellWidth}}px;\">\n        <div data-panel=\"color-box\" style=\"width:{{preview.width}}px;height:{{preview.height}}px;\"><div data-panel=\"color\" style=\"background-color:{{value}};\"></div></div>\n    </div>\n    <div data-panel=\"color-label\" style=\"width:{{label.width}}px;\">{{label}}</div>\n    <div data-panel=\"color-slider\">\n        <div data-panel=\"color-track\" style=\"height:{{slider.trackHeight}}px;background: linear-gradient(90deg, {{_color0value}}, {{_color1value}}, {{_color2value}}); \">\n            <div data-panel=\"color-handle\">\n                <div data-panel=\"color-handle-after\" style=\"width:{{slider.handleWidth}}px;height:{{slider.handleWidth}}px;left:{{slider.handleLeft}}px;top:{{slider.handleLeft}}px;\"></div>\n            </div>\n        </div>\n    </div>\n</div>\n{{/list}}\n{{/colors}}\n";
};
var ENM = {
  "mousedown": _AX6Info2.default.supportTouch ? "touchstart" : "mousedown",
  "mousemove": _AX6Info2.default.supportTouch ? "touchmove" : "mousemove",
  "mouseup": _AX6Info2.default.supportTouch ? "touchend" : "mouseup"
};
var onStateChanged = function onStateChanged(opts, that) {
  if (opts && opts.onStateChanged) {
    opts.onStateChanged.call(that, that);
  } else if (this.onStateChanged) {
    this.onStateChanged.call(that, that);
  }

  that = null;
};
var getMousePosition = function getMousePosition(e) {
  var mouseObj = void 0,
      originalEvent = e.originalEvent ? e.originalEvent : e;
  mouseObj = 'changedTouches' in originalEvent && originalEvent.changedTouches ? originalEvent.changedTouches[0] : originalEvent;
  // clientX, Y 쓰면 스크롤에서 문제 발생
  return {
    clientX: mouseObj.pageX,
    clientY: mouseObj.pageY
  };
};
var bindHandle = function bindHandle(item) {
  var _this = this;

  item.originalTrackWidth = item.$track.width();
  item.trackWidth = item.originalTrackWidth - this.config.colors.slider.handleWidth / 5;
  var handleLeft = amountToHandleLeft.call(this, item, item._amount);

  // handleLeft 가 범위를 벗어나면?
  if (handleLeft < 0 || handleLeft > item.trackWidth) {
    var amount = void 0;
    handleLeft = handleLeft < 0 ? 0 : handleLeft > item.trackWidth ? item.trackWidth : handleLeft;
    amount = handleLeftToAmount.call(this, item, handleLeft);
    updatePreviewColor.call(this, item, amountToColor.call(this, item, amount));
  }

  item.$handle.css({ left: handleLeft });
  item.$item.off(ENM["mousedown"]).on(ENM["mousedown"], '[data-panel="color-handle"]', function (e) {
    var mouseObj = getMousePosition(e);
    item._originalHandleClientX = mouseObj.clientX;
    item._originalHandleLeft = item.$handle.position().left;
    handleMoveEvent.on.call(_this, item);
    _AX6Util2.default.stopEvent(e.originalEvent);
  }).off("click").on("click", '[data-panel="color-label"], [data-panel="color-preview"]', function (e) {
    if (_this.onClick) {
      _this.onClick.call(item, '#' + item._selectedColor.toUpperCase(), e);
    }
  }).on("click", '[data-panel="color-track"]', function (e) {
    if (e.target.getAttribute("data-panel") == "color-track") {
      var mouseObj = getMousePosition(e),
          newHandleLeft = mouseObj.clientX - item.$track.offset().left,
          _amount2 = handleLeftToAmount(item, newHandleLeft);

      item.$handle.css({ left: newHandleLeft });
      updatePreviewColor.call(_this, item, amountToColor.call(_this, item, _amount2), e);

      mouseObj = null;
      newHandleLeft = null;
      _amount2 = null;
    }
  });
};
var updatePreviewColor = function updatePreviewColor(item, color, event) {
  item.$preview.css({ "background-color": '#' + color });
  item.$label.html('#' + color.toUpperCase());
  item._selectedColor = color;

  if (event && this.onUpdateColor) {
    this.onUpdateColor.call(item, '#' + item._selectedColor.toUpperCase());
  }
};
var amountToColor = function amountToColor(item, amount) {
  var processor = {
    "black": function black(_color, _amount) {
      return _color.lighten(this.config.colors.slider.amount / 2).darken(_amount).getHexValue();
    },
    "white": function white(_color, _amount) {
      return _color.darken(this.config.colors.slider.amount / 2).darken(_amount).getHexValue();
    },
    "normal": function normal(_color, _amount) {
      return _color.darken(_amount).getHexValue();
    }
  };

  if (item._uniqColor in processor) {
    return processor[item._uniqColor].call(this, item._color, amount);
  } else {
    return processor["normal"].call(this, item._color, amount);
  }
};
var colorToAmount = function colorToAmount(item, color) {
  /// todo : 색상에 가까운 색 표현.
  var processor = {
    "black": function black(_color, _diffColor) {
      var color1 = _color.lighten(this.config.colors.slider.amount / 2);
      return (color1.getHsl().l - _diffColor.getHsl().l) * 100;
    },
    "white": function white(_color, _diffColor) {
      var color1 = _color.darken(this.config.colors.slider.amount / 2);
      return (color1.getHsl().l - _diffColor.getHsl().l) * 100;
    },
    "normal": function normal(_color, _diffColor) {
      return (_color.getHsl().l - _diffColor.getHsl().l) * 100;
    }
  };

  if (item._uniqColor in processor) {
    return processor[item._uniqColor].call(this, item._color, color);
  } else {
    return processor["normal"].call(this, item._color, color);
  }
};
var handleLeftToAmount = function handleLeftToAmount(item, handleLeft) {
  return this.config.colors.slider.amount * (handleLeft - item.trackWidth / 2) / (item.originalTrackWidth / 2);
};
var amountToHandleLeft = function amountToHandleLeft(item, amount) {
  return amount * (item.originalTrackWidth / 2) / this.config.colors.slider.amount + item.trackWidth / 2;
};
var handleMoveEvent = {
  "on": function on(item) {
    var _this2 = this;

    (0, _jqmin2.default)(document.body).on(ENM["mousemove"] + ".ax6palette-" + this.instanceId, function (e) {
      var mouseObj = getMousePosition(e),
          da = mouseObj.clientX - item._originalHandleClientX,
          newHandleLeft = item._originalHandleLeft + da,
          amount = void 0;

      newHandleLeft = newHandleLeft < 0 ? 0 : newHandleLeft > item.trackWidth ? item.trackWidth : newHandleLeft;
      item.$handle.css({ left: newHandleLeft });
      amount = handleLeftToAmount.call(_this2, item, newHandleLeft);

      updatePreviewColor.call(_this2, item, amountToColor.call(_this2, item, amount), e);

      mouseObj = null;
      da = null;
    }).on(ENM["mouseup"] + ".ax6palette-" + this.instanceId, function (e) {
      handleMoveEvent.off.call(_this2);
      _AX6Util2.default.stopEvent(e);
    }).on("mouseleave.ax6palette-" + this.instanceId, function (e) {
      handleMoveEvent.off.call(_this2);
      _AX6Util2.default.stopEvent(e);
    });

    (0, _jqmin2.default)(document.body).attr('unselectable', 'on').css('user-select', 'none').on('selectstart', false);
  },
  "off": function off() {
    this.xvar.resizerLived = false;

    (0, _jqmin2.default)(document.body).off(ENM["mousemove"] + ".ax6palette-" + this.instanceId).off(ENM["mouseup"] + ".ax6palette-" + this.instanceId).off("mouseleave.ax6palette-" + this.instanceId);

    (0, _jqmin2.default)(document.body).removeAttr('unselectable').css('user-select', 'auto').off('selectstart');
  }
};
var _repaint = function _repaint(selectedColor) {
  var _this3 = this;

  var box = {
    width: this.$target.innerWidth(),
    height: this.$target.innerHeight()
  };

  // 패널 프레임 초기화
  this.$target.html(_AX6Mustache2.default.render(frameTmpl.call(this), {}, this.config.columnKeys));

  // 각 패널들을 캐싱~
  this.$ = {
    "root": this.$target.find('[data-ax6palette-container="root"]'),
    "colors": this.$target.find('[data-ax6palette-container="colors"]'),
    "controls": this.$target.find('[data-ax6palette-container="controls"]')
  };

  // todo : controls 나중에 고민하여 구현
  // this.$["controls"].css({height: this.config.controls.height});

  /// colors.list 색상 범위 결정 / 초기화
  this.config.colors.list.forEach(function (c) {
    c._color = _AX6Util2.default.color(c.value);
    c._selectedColor = c._color.getHexValue();
    if (c._color.r == 0 && c._color.g == 0 && c._color.b == 0) {
      c._amount = _this3.config.colors.slider.amount;
      c._uniqColor = "black";
      c._color0value = "#" + c._color.lighten(_this3.config.colors.slider.amount).getHexValue();
      c._color1value = "#" + c._color.lighten(_this3.config.colors.slider.amount / 2).getHexValue();
      c._color2value = "#" + c._color.getHexValue();
    } else if (c._color.r == 255 && c._color.g == 255 && c._color.b == 255) {
      c._amount = -_this3.config.colors.slider.amount;
      c._uniqColor = "white";
      c._color0value = "#" + c._color.getHexValue();
      c._color1value = "#" + c._color.darken(_this3.config.colors.slider.amount / 2).getHexValue();
      c._color2value = "#" + c._color.darken(_this3.config.colors.slider.amount).getHexValue();
    } else {
      c._amount = 0;
      c._color0value = "#" + c._color.lighten(_this3.config.colors.slider.amount).getHexValue();
      c._color1value = "#" + c._color.getHexValue();
      c._color2value = "#" + c._color.darken(_this3.config.colors.slider.amount).getHexValue();
    }
  });

  // 색생조절 핸들의 위치 조정this.config.colors.list[minDiffColorIndex]
  this.config.colors.slider.handleLeft = -this.config.colors.slider.handleWidth / 2;
  this.config.colors.slider.handleTop = -this.config.colors.slider.handleHeight / 2;

  // 팔렛트 컬러 패널 초기화
  this.$["colors"].html(_AX6Mustache2.default.render(colorsTmpl.call(this), this.config, this.config.columnKeys));

  this.$["colors"].find('[data-ax6palette-color-index]').each(function (elIdx, el) {
    var idx = el.getAttribute("data-ax6palette-color-index");
    var color = _this3.config.colors.list[idx];
    var item = _jqmin2.default.extend({}, color);
    item._index = idx;
    item.$item = (0, _jqmin2.default)(el);
    item.$preview = item.$item.find('[data-panel="color"]');
    item.$label = item.$item.find('[data-panel="color-label"]');
    item.$track = item.$item.find('[data-panel="color-track"]');
    item.$handle = item.$item.find('[data-panel="color-handle"]');
    bindHandle.call(_this3, item);
    /////
    _this3.colors.push(item);
  });

  if (selectedColor) {
    this.setSelectedColor(selectedColor);
  }
};
/* ~~~~~~~~~~~~~~~~~~ end of private  ~~~~~~~~~~~~~~~~~~~~ */

/**
 * @class
 */

var AX6UIPalette = function (_AX6UICore) {
  _inherits(AX6UIPalette, _AX6UICore);

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
  function AX6UIPalette(config) {
    _classCallCheck(this, AX6UIPalette);

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
    var _this4 = _possibleConstructorReturn(this, (AX6UIPalette.__proto__ || Object.getPrototypeOf(AX6UIPalette)).call(this));

    _this4.config = {
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
    _jqmin2.default.extend(true, _this4.config, config);

    // 멤버 변수 초기화
    /**
     * @member {Object}
     */
    _this4.$target = null;
    /**
     * @member {Object}
     */
    _this4.xvar = {};
    /**
     * @member {Array}
     */
    _this4.colors = [];

    _this4.init();
    return _this4;
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


  _createClass(AX6UIPalette, [{
    key: "init",
    value: function init() {
      var _this5 = this;

      this.onStateChanged = this.config.onStateChanged;
      delete this.config.onStateChanged;
      this.onClick = this.config.onClick;
      delete this.config.onClick;
      this.onUpdateColor = this.config.onUpdateColor;
      delete this.config.onUpdateColor;

      if (!this.config.target) {
        console.log(_AX6Info2.default.getError("ax6palette", "401", "setConfig"));
      }
      this.$target = (0, _jqmin2.default)(this.config.target);

      setTimeout(function () {
        _repaint.call(_this5, (_this5.config.selectedColor || "").trim()); // 팔렛트 그리기.
      });

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
    }

    /**
     * @method
     * @return {AX6UIPalette}
     */

  }, {
    key: "repaint",
    value: function repaint() {
      _repaint.call(this);
      return this;
    }

    /**
     * @method
     * @param selectedColor
     * @return {AX6UIPalette}
     */

  }, {
    key: "setSelectedColor",
    value: function setSelectedColor(selectedColor) {
      var sColor = _AX6Util2.default.color(selectedColor.trim());
      // 지정된 색이 가장 가까운 파렛 검색
      var minDiffColor = 255 * 3,
          minDiffColorIndex = -1;

      this.colors.forEach(function (c, cidx) {
        var c1hsl = c._color.getHsl(),
            c2hsl = sColor.getHsl();
        var diffColor = Math.abs(c1hsl.h - c2hsl.h) + Math.abs(c1hsl.s - c2hsl.s) + Math.abs(c1hsl.l - c2hsl.l);
        if (diffColor < minDiffColor) {
          minDiffColor = diffColor;
          minDiffColorIndex = cidx;
        }
      });

      if (minDiffColorIndex > -1) {
        var amount = void 0,
            handleLeft = void 0,
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
  }]);

  return AX6UIPalette;
}(_AX6UICore3.default);

exports.default = AX6UIPalette;

/***/ }),

/***/ 71:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(72);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../samples/node_modules/css-loader/index.js!../../samples/node_modules/sass-loader/lib/loader.js!./style.scss", function() {
			var newContent = require("!!../../samples/node_modules/css-loader/index.js!../../samples/node_modules/sass-loader/lib/loader.js!./style.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 72:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "@-webkit-keyframes something-animation {\n  from {\n    opacity: 1.0; }\n  to {\n    opacity: 0.5; } }\n\n@-moz-keyframes something-animation {\n  from {\n    opacity: 1.0; }\n  to {\n    opacity: 0.5; } }\n\n@keyframes something-animation {\n  from {\n    opacity: 1.0; }\n  to {\n    opacity: 0.5; } }\n\n[data-ax6ui-palette] {\n  box-sizing: border-box;\n  position: relative; }\n  [data-ax6ui-palette] *,\n  [data-ax6ui-palette] *:before,\n  [data-ax6ui-palette] *:after {\n    box-sizing: border-box; }\n  [data-ax6ui-palette] [data-ax6palette-container=\"root\"] [data-ax6palette-container=\"colors\"] {\n    display: table;\n    width: 100%; }\n    [data-ax6ui-palette] [data-ax6palette-container=\"root\"] [data-ax6palette-container=\"colors\"] [data-ax6palette-color] {\n      display: table-row;\n      user-select: none;\n      text-align: left; }\n      [data-ax6ui-palette] [data-ax6palette-container=\"root\"] [data-ax6palette-container=\"colors\"] [data-ax6palette-color] [data-panel] {\n        vertical-align: middle; }\n      [data-ax6ui-palette] [data-ax6palette-container=\"root\"] [data-ax6palette-container=\"colors\"] [data-ax6palette-color]:hover [data-panel=\"color-preview\"] [data-panel=\"color-box\"] {\n        background: #ccc;\n        border-color: #B9BABC; }\n      [data-ax6ui-palette] [data-ax6palette-container=\"root\"] [data-ax6palette-container=\"colors\"] [data-ax6palette-color]:hover [data-panel=\"color-preview\"] [data-panel=\"color\"] {\n        border-color: #B9BABC; }\n      [data-ax6ui-palette] [data-ax6palette-container=\"root\"] [data-ax6palette-container=\"colors\"] [data-ax6palette-color]:hover [data-panel=\"color-label\"] {\n        color: #ccc; }\n      [data-ax6ui-palette] [data-ax6palette-container=\"root\"] [data-ax6palette-container=\"colors\"] [data-ax6palette-color]:active [data-panel=\"color-preview\"] [data-panel=\"color-box\"] {\n        background: #0a68b4;\n        border-color: #000; }\n      [data-ax6ui-palette] [data-ax6palette-container=\"root\"] [data-ax6palette-container=\"colors\"] [data-ax6palette-color]:active [data-panel=\"color-preview\"] [data-panel=\"color\"] {\n        border-color: #000; }\n      [data-ax6ui-palette] [data-ax6palette-container=\"root\"] [data-ax6palette-container=\"colors\"] [data-ax6palette-color]:active [data-panel=\"color-label\"] {\n        color: #0a68b4; }\n      [data-ax6ui-palette] [data-ax6palette-container=\"root\"] [data-ax6palette-container=\"colors\"] [data-ax6palette-color] [data-panel=\"color-preview\"] {\n        display: table-cell;\n        padding: 3px 0;\n        cursor: pointer; }\n        [data-ax6ui-palette] [data-ax6palette-container=\"root\"] [data-ax6palette-container=\"colors\"] [data-ax6palette-color] [data-panel=\"color-preview\"] [data-panel=\"color-box\"] {\n          border-radius: 5px;\n          padding: 2px;\n          border-width: 1px;\n          border-style: solid;\n          border-color: #B9BABC;\n          background: #fff; }\n        [data-ax6ui-palette] [data-ax6palette-container=\"root\"] [data-ax6palette-container=\"colors\"] [data-ax6palette-color] [data-panel=\"color-preview\"] [data-panel=\"color\"] {\n          border-radius: 3px;\n          border-color: #B9BABC;\n          border-width: 1px;\n          border-style: solid;\n          height: 100%;\n          box-shadow: inset 1px 1px 1px rgba(255, 255, 255, 0.5); }\n      [data-ax6ui-palette] [data-ax6palette-container=\"root\"] [data-ax6palette-container=\"colors\"] [data-ax6palette-color] [data-panel=\"color-label\"] {\n        display: table-cell;\n        cursor: pointer; }\n      [data-ax6ui-palette] [data-ax6palette-container=\"root\"] [data-ax6palette-container=\"colors\"] [data-ax6palette-color] [data-panel=\"color-slider\"] {\n        display: table-cell; }\n        [data-ax6ui-palette] [data-ax6palette-container=\"root\"] [data-ax6palette-container=\"colors\"] [data-ax6palette-color] [data-panel=\"color-slider\"] [data-panel=\"color-track\"] {\n          position: relative;\n          display: block;\n          height: 10px;\n          border-radius: 5px;\n          box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.5); }\n        [data-ax6ui-palette] [data-ax6palette-container=\"root\"] [data-ax6palette-container=\"colors\"] [data-ax6palette-color] [data-panel=\"color-slider\"] [data-panel=\"color-handle\"] {\n          position: absolute;\n          left: 50%;\n          top: 50%; }\n          [data-ax6ui-palette] [data-ax6palette-container=\"root\"] [data-ax6palette-container=\"colors\"] [data-ax6palette-color] [data-panel=\"color-slider\"] [data-panel=\"color-handle\"] [data-panel=\"color-handle-after\"] {\n            display: block;\n            position: absolute;\n            left: -10px;\n            top: -10px;\n            width: 20px;\n            height: 20px;\n            border-width: 1px;\n            border-style: solid;\n            border-color: #B9BABC;\n            background-color: #EAEAEA;\n            background-image: -webkit-linear-gradient(bottom, #EAEAEA, #FBFBFB);\n            background-image: linear-gradient(to top,#EAEAEA, #FBFBFB);\n            box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);\n            opacity: 0.8;\n            border-radius: 50%;\n            cursor: col-resize; }\n", ""]);

// exports


/***/ }),

/***/ 73:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(74);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(3)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../samples/node_modules/css-loader/index.js!../../samples/node_modules/sass-loader/lib/loader.js!./style.scss", function() {
			var newContent = require("!!../../samples/node_modules/css-loader/index.js!../../samples/node_modules/sass-loader/lib/loader.js!./style.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "@-webkit-keyframes ax-picker {\n  0% {\n    opacity: 0.0;\n    -webkit-transform: translate(0, 0%); }\n  100% {\n    opacity: 1.0;\n    -webkit-transform: translate(0, 0); } }\n\n@-moz-keyframes ax-picker {\n  0% {\n    opacity: 0.0;\n    -moz-transform: translate(0, 0%); }\n  100% {\n    opacity: 1.0;\n    -moz-transform: translate(0, 0); } }\n\n@keyframes ax-picker {\n  0% {\n    opacity: 0.0;\n    -webkit-transform: translate(0, 0%);\n    -moz-transform: translate(0, 0%);\n    -ms-transform: translate(0, 0%);\n    -o-transform: translate(0, 0%);\n    transform: translate(0, 0%); }\n  100% {\n    opacity: 1.0;\n    -webkit-transform: translate(0, 0);\n    -moz-transform: translate(0, 0);\n    -ms-transform: translate(0, 0);\n    -o-transform: translate(0, 0);\n    transform: translate(0, 0); } }\n\n@-webkit-keyframes ax-picker-destroy {\n  from {\n    opacity: 1.0;\n    -webkit-transform: translate(0, 0); }\n  to {\n    opacity: 0.0;\n    -webkit-transform: scale(0.8) translate(0, -10%); } }\n\n@-moz-keyframes ax-picker-destroy {\n  from {\n    opacity: 1.0;\n    -moz-transform: translate(0, 0); }\n  to {\n    opacity: 0.0;\n    -moz-transform: scale(0.8) translate(0, -10%); } }\n\n@keyframes ax-picker-destroy {\n  from {\n    opacity: 1.0;\n    -webkit-transform: translate(0, 0);\n    -moz-transform: translate(0, 0);\n    -ms-transform: translate(0, 0);\n    -o-transform: translate(0, 0);\n    transform: translate(0, 0); }\n  to {\n    opacity: 0.0;\n    -webkit-transform: scale(0.8) translate(0, -10%);\n    -moz-transform: scale(0.8) translate(0, -10%);\n    -ms-transform: scale(0.8) translate(0, -10%);\n    -o-transform: scale(0.8) translate(0, -10%);\n    transform: scale(0.8) translate(0, -10%); } }\n\n[data-ax6ui-picker] {\n  box-sizing: border-box;\n  z-index: 2000;\n  position: absolute;\n  left: 0;\n  top: 0;\n  -webkit-perspective: 1000;\n  -moz-perspective: 1000;\n  perspective: 1000;\n  -webkit-transform-style: preserve-3d;\n  -moz-transform-style: preserve-3d;\n  -ms-transform-style: preserve-3d;\n  -o-transform-style: preserve-3d;\n  transform-style: preserve-3d;\n  -webkit-animation: ax-picker 0.1s cubic-bezier(0.55, 0.055, 0.675, 0.19) forwards;\n  -moz-animation: ax-picker 0.1s cubic-bezier(0.55, 0.055, 0.675, 0.19) forwards;\n  animation: ax-picker 0.1s cubic-bezier(0.55, 0.055, 0.675, 0.19) forwards;\n  -webkit-transform: translateZ(0);\n  -moz-transform: translateZ(0);\n  -ms-transform: translateZ(0);\n  -o-transform: translateZ(0);\n  transform: translateZ(0);\n  -webkit-transform-origin: center top;\n  -moz-transform-origin: center top;\n  -ms-transform-origin: center top;\n  -o-transform-origin: center top;\n  transform-origin: center top;\n  /* flip type\n  @include backface-visibility(visible);\n  @include transform(translateY(0%) rotateX(0deg));\n  */\n  background-color: #fff;\n  background-image: -webkit-linear-gradient(bottom, #fff);\n  background-image: linear-gradient(to top,#fff);\n  border: 1px solid;\n  border-color: #ddd;\n  border-radius: 5px;\n  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.175); }\n  [data-ax6ui-picker] *,\n  [data-ax6ui-picker] *:before,\n  [data-ax6ui-picker] *:after {\n    box-sizing: border-box; }\n  [data-ax6ui-picker] .ax-picker-heading {\n    font-weight: 600;\n    padding: 10px 15px;\n    border-bottom: 1px solid transparent;\n    border-top-left-radius: 4px;\n    border-top-right-radius: 4px;\n    color: #333;\n    background-color: #f5f5f5;\n    background-image: -webkit-linear-gradient(bottom, #f5f5f5);\n    background-image: linear-gradient(to top,#f5f5f5); }\n    [data-ax6ui-picker] .ax-picker-heading .badge {\n      font-size: 0.8em;\n      color: #f5f5f5;\n      background-color: #333;\n      background-image: -webkit-linear-gradient(bottom, #333);\n      background-image: linear-gradient(to top,#333); }\n  [data-ax6ui-picker] .ax-picker-body {\n    padding: 5px;\n    text-align: center; }\n    [data-ax6ui-picker] .ax-picker-body .ax-picker-content {\n      min-width: 50px; }\n      [data-ax6ui-picker] .ax-picker-body .ax-picker-content .ax-picker-content-box {\n        border: 0px solid;\n        border-color: none;\n        border-radius: 0px;\n        padding: 0px;\n        overflow: hidden; }\n    [data-ax6ui-picker] .ax-picker-body .ax-picker-buttons {\n      padding: 10px 0px 5px 0px; }\n      [data-ax6ui-picker] .ax-picker-body .ax-picker-buttons button:not(:last-child) {\n        margin-right: 3px; }\n  [data-ax6ui-picker].direction-top .ax-picker-arrow {\n    position: absolute;\n    width: 0;\n    height: 0;\n    left: 50%;\n    top: 0; }\n    [data-ax6ui-picker].direction-top .ax-picker-arrow:before {\n      content: ' ';\n      position: absolute;\n      width: 0;\n      height: 0;\n      left: -10px;\n      top: -20px;\n      border-left: 10px solid transparent;\n      border-right: 10px solid transparent;\n      border-bottom: 20px solid #ddd; }\n    [data-ax6ui-picker].direction-top .ax-picker-arrow:after {\n      content: ' ';\n      position: absolute;\n      width: 0;\n      height: 0;\n      left: -10px;\n      top: -18px;\n      border-left: 10px solid transparent;\n      border-right: 10px solid transparent;\n      border-bottom: 20px solid #fff; }\n  [data-ax6ui-picker].direction-right .ax-picker-arrow {\n    position: absolute;\n    width: 0;\n    height: 0;\n    right: 0;\n    top: 50%; }\n    [data-ax6ui-picker].direction-right .ax-picker-arrow:before {\n      content: ' ';\n      position: absolute;\n      width: 0;\n      height: 0;\n      right: -20px;\n      top: -10px;\n      border-top: 10px solid transparent;\n      border-bottom: 10px solid transparent;\n      border-left: 20px solid #ddd; }\n    [data-ax6ui-picker].direction-right .ax-picker-arrow:after {\n      content: ' ';\n      position: absolute;\n      width: 0;\n      height: 0;\n      right: -18px;\n      top: -10px;\n      border-top: 10px solid transparent;\n      border-bottom: 10px solid transparent;\n      border-left: 20px solid #fff; }\n  [data-ax6ui-picker].direction-bottom .ax-picker-arrow {\n    position: absolute;\n    width: 0;\n    height: 0;\n    left: 50%;\n    bottom: 0; }\n    [data-ax6ui-picker].direction-bottom .ax-picker-arrow:before {\n      content: ' ';\n      position: absolute;\n      width: 0;\n      height: 0;\n      left: -10px;\n      bottom: -20px;\n      border-left: 10px solid transparent;\n      border-right: 10px solid transparent;\n      border-top: 20px solid #ddd; }\n    [data-ax6ui-picker].direction-bottom .ax-picker-arrow:after {\n      content: ' ';\n      position: absolute;\n      width: 0;\n      height: 0;\n      left: -10px;\n      bottom: -18px;\n      border-left: 10px solid transparent;\n      border-right: 10px solid transparent;\n      border-top: 20px solid #fff; }\n  [data-ax6ui-picker].direction-left .ax-picker-arrow {\n    position: absolute;\n    width: 0;\n    height: 0;\n    left: 0;\n    top: 50%; }\n    [data-ax6ui-picker].direction-left .ax-picker-arrow:before {\n      content: ' ';\n      position: absolute;\n      width: 0;\n      height: 0;\n      left: -20px;\n      top: -10px;\n      border-top: 10px solid transparent;\n      border-bottom: 10px solid transparent;\n      border-right: 20px solid #ddd; }\n    [data-ax6ui-picker].direction-left .ax-picker-arrow:after {\n      content: ' ';\n      position: absolute;\n      width: 0;\n      height: 0;\n      left: -18px;\n      top: -10px;\n      border-top: 10px solid transparent;\n      border-bottom: 10px solid transparent;\n      border-right: 20px solid #fff; }\n  [data-ax6ui-picker].destroy {\n    -webkit-animation: ax-picker-destroy 0.1s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;\n    -moz-animation: ax-picker-destroy 0.1s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;\n    animation: ax-picker-destroy 0.1s cubic-bezier(0.215, 0.61, 0.355, 1) forwards; }\n  [data-ax6ui-picker].direction-top {\n    -webkit-transform-origin: center top;\n    -moz-transform-origin: center top;\n    -ms-transform-origin: center top;\n    -o-transform-origin: center top;\n    transform-origin: center top; }\n  [data-ax6ui-picker].direction-right {\n    -webkit-transform-origin: right center;\n    -moz-transform-origin: right center;\n    -ms-transform-origin: right center;\n    -o-transform-origin: right center;\n    transform-origin: right center; }\n  [data-ax6ui-picker].direction-bottom {\n    -webkit-transform-origin: center bottom;\n    -moz-transform-origin: center bottom;\n    -ms-transform-origin: center bottom;\n    -o-transform-origin: center bottom;\n    transform-origin: center bottom; }\n  [data-ax6ui-picker].direction-left {\n    -webkit-transform-origin: left center;\n    -moz-transform-origin: left center;\n    -ms-transform-origin: left center;\n    -o-transform-origin: left center;\n    transform-origin: left center; }\n\n.input-group[data-ax6picker] .input-group-addon {\n  cursor: pointer; }\n  .input-group[data-ax6picker] .input-group-addon:not(:last-child) {\n    border-left: 0 none;\n    border-right: 0 none; }\n  .input-group[data-ax6picker] .input-group-addon.color-preview {\n    padding: 0; }\n  .input-group[data-ax6picker] .input-group-addon [data-ax6picker-color=\"preview\"] {\n    display: block; }\n\n.form-group[data-ax6picker] .input-group-addon {\n  cursor: pointer; }\n  .form-group[data-ax6picker] .input-group-addon:not(:last-child) {\n    border-left: 0 none;\n    border-right: 0 none; }\n  .form-group[data-ax6picker] .input-group-addon.color-preview {\n    padding: 0; }\n  .form-group[data-ax6picker] .input-group-addon [data-ax6picker-color=\"preview\"] {\n    display: block; }\n", ""]);

// exports


/***/ }),

/***/ 88:
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

var _AX6Info = __webpack_require__(4);

var _AX6Info2 = _interopRequireDefault(_AX6Info);

var _AX6Util = __webpack_require__(1);

var _AX6Util2 = _interopRequireDefault(_AX6Util);

var _AX6Mustache = __webpack_require__(36);

var _AX6Mustache2 = _interopRequireDefault(_AX6Mustache);

var _AX6UIFormatter = __webpack_require__(67);

var _AX6UIFormatter2 = _interopRequireDefault(_AX6UIFormatter);

var _AX6UICalendar = __webpack_require__(69);

var _AX6UICalendar2 = _interopRequireDefault(_AX6UICalendar);

var _AX6UIPalette = __webpack_require__(70);

var _AX6UIPalette2 = _interopRequireDefault(_AX6UIPalette);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* ~~~~~~~~~~~~~~~~~~ end of import  ~~~~~~~~~~~~~~~~~~~~ */

var tmpl = {
  pickerTmpl: function pickerTmpl(columnKeys) {
    return "\n<div data-ax6ui-picker=\"\" class=\"{{theme}}\" id=\"{{id}}\" data-picker-els=\"root\" {{#zIndex}}style=\"z-index:{{zIndex}};\"{{/zIndex}}>\n    {{#title}}\n        <div class=\"ax-picker-heading\">{{title}}</div>\n    {{/title}}\n    <div class=\"ax-picker-body\">\n        <div class=\"ax-picker-content\" data-picker-els=\"content\" style=\"width:{{contentWidth}}px;\"></div>\n        {{#btns}}\n            <div class=\"ax-picker-buttons\">\n            {{#btns}}\n                {{#@each}}\n                <button data-picker-btn=\"{{@key}}\" class=\"{{@value.theme}}\">{{@value.label}}</button>\n                {{/@each}}\n            {{/btns}}\n            </div>\n        {{/btns}}\n    </div>\n    <div class=\"ax-picker-arrow\"></div>\n</div>\n";
  }
};

var onStateChanged = function onStateChanged(item, that) {
  if (item && item.onStateChanged) {
    item.onStateChanged.call(that, that);
  } else if (this.onStateChanged) {
    this.onStateChanged.call(that, that);
  }
  return true;
};
var bindPickerTarget = function () {
  var pickerEvent = {
    'focus': function focus(queIdx, e) {
      this.open(queIdx);
    },
    'click': function click(queIdx, e) {
      this.open(queIdx);
    }
  };
  var pickerType = {
    '@fn': function fn(queIdx, _input) {
      var item = this.queue[queIdx],
          inputLength = _input.length,
          config = {
        inputLength: inputLength || 1
      };

      if (inputLength > 1) {
        config.btns = {
          ok: { label: this.config.lang["ok"], theme: this.config.theme }
        };
      }

      this.queue[queIdx] = _jqmin2.default.extend(true, config, item);

      config = null;
      inputLength = null;
    },
    'date': function date(queIdx, _input) {
      var item = this.queue[queIdx],
          contentWidth = item.content ? item.content.width || 270 : 270,
          contentMargin = item.content ? item.content.margin || 5 : 5,
          inputLength = _input.length,
          config = {
        contentWidth: contentWidth * inputLength + (inputLength - 1) * contentMargin,
        content: { width: contentWidth, margin: contentMargin },
        inputLength: inputLength || 1
      };

      if (inputLength > 1 && !item.btns) {
        config.btns = {
          ok: { label: this.config.lang["ok"], theme: this.config.theme }
        };
      }

      this.queue[queIdx] = _jqmin2.default.extend(true, config, item);

      contentWidth = null;
      contentMargin = null;
      config = null;
      inputLength = null;
    },
    'secure-num': function secureNum(queIdx, _input) {
      var item = this.queue[queIdx],
          inputLength = _input.length,
          config = {
        inputLength: inputLength || 1
      };

      this.queue[queIdx] = _jqmin2.default.extend(true, config, item);

      config = null;
      inputLength = null;
    },
    'keyboard': function keyboard(queIdx, _input) {
      var item = this.queue[queIdx],
          inputLength = _input.length,
          config = {
        inputLength: inputLength || 1
      };

      this.queue[queIdx] = _jqmin2.default.extend(true, config, item);

      config = null;
      inputLength = null;
    },
    'numpad': function numpad(queIdx, _input) {
      var item = this.queue[queIdx],
          inputLength = _input.length,
          config = {
        inputLength: inputLength || 1
      };

      this.queue[queIdx] = _jqmin2.default.extend(true, config, item);

      config = null;
      inputLength = null;
    },
    'color': function color(queIdx, _input) {
      var item = this.queue[queIdx],
          contentWidth = item.content ? item.content.width || 270 : 270,
          contentMargin = item.content ? item.content.margin || 5 : 5,
          inputLength = _input.length,
          config = {
        contentWidth: contentWidth * inputLength + (inputLength - 1) * contentMargin,
        content: { width: contentWidth, margin: contentMargin },
        inputLength: inputLength || 1
      },
          $colorPreview = item.$target.find('[data-ax6picker-color="preview"]');

      if ($colorPreview.get(0)) {
        $colorPreview.css({ "background-color": "#" + _AX6Util2.default.color(_input.val() || "#000000").getHexValue() });
        // 컬러 피커인 경우 input의 값이 변경되면 preview를 수정
        _input.on("change", function () {
          $colorPreview.css({ "background-color": "#" + _AX6Util2.default.color(this.value || "#000000").getHexValue() });
        });
      }

      if (inputLength > 1 && !item.btns) {
        config.btns = {
          ok: { label: this.config.lang["ok"], theme: this.config.theme }
        };
      }

      this.queue[queIdx] = _jqmin2.default.extend(true, config, item);

      contentWidth = null;
      contentMargin = null;
      config = null;
      inputLength = null;
    }
  };

  return function (queIdx) {
    var item = this.queue[queIdx],
        input = void 0;

    if (!item.content) {
      console.log(_AX6Info2.default.getError("ax6picker", "501", "bind"));
      return this;
    }

    input = item.$target.get(0).tagName.toUpperCase() == "INPUT" ? item.$target : item.$target.find('input[type]');

    // 함수타입
    if (_AX6Util2.default.isFunction(item.content)) {
      pickerType["@fn"].call(this, queIdx, input);
    } else {
      for (var key in pickerType) {
        if (item.content.type == key) {
          pickerType[key].call(this, queIdx, input);
          break;
        }
      }
    }

    input.off('focus.ax6picker').off('click.ax6picker').on('focus.ax6picker', pickerEvent.focus.bind(this, queIdx)).on('click.ax6picker', pickerEvent.click.bind(this, queIdx));

    item.$target.find('.input-group-addon').off('click.ax6picker').on('click.ax6picker', pickerEvent.click.bind(this, queIdx));

    if (item.content.formatter) {
      this.formatter.bind(_jqmin2.default.extend({}, item.content.formatter, { target: input }));
    }

    input = null;
    item = null;
    queIdx = null;
    return this;
  };
}();
var alignPicker = function alignPicker(append) {
  if (!this.activePicker) return this;

  var _alignPicker = function _alignPicker(item) {
    var $window = (0, _jqmin2.default)(window),
        $body = (0, _jqmin2.default)(document.body);
    var pos = {},
        positionMargin = 12,
        dim = {},
        pickerDim = {},
        pickerDirection = void 0;

    pos = item.$target.offset();
    dim = {
      width: item.$target.outerWidth(),
      height: item.$target.outerHeight()
    };
    pickerDim = {
      winWidth: Math.max($window.width(), $body.width()),
      winHeight: Math.max($window.height(), $body.height()),
      width: this.activePicker.outerWidth(),
      height: this.activePicker.outerHeight()
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

    if (append) {
      this.activePicker.addClass("direction-" + pickerDirection);
    }

    var positionCSS = function () {
      var css = { left: 0, top: 0 };
      switch (pickerDirection) {
        case "top":
          css.left = pos.left + dim.width / 2 - pickerDim.width / 2;
          css.top = pos.top + dim.height + positionMargin;
          break;
        case "bottom":
          css.left = pos.left + dim.width / 2 - pickerDim.width / 2;
          css.top = pos.top - pickerDim.height - positionMargin;
          break;
        case "left":
          css.left = pos.left + dim.width + positionMargin;
          css.top = pos.top - pickerDim.height / 2 + dim.height / 2;
          break;
        case "right":
          css.left = pos.left - pickerDim.width - positionMargin;
          css.top = pos.top - pickerDim.height / 2 + dim.height / 2;
          break;
      }
      return css;
    }();

    {
      if (pickerDirection == "top" || pickerDirection == "bottom") {
        if (positionCSS.left < 0) {
          positionCSS.left = positionMargin;
          this.activePickerArrow.css({ left: pos.left + dim.width / 2 - positionCSS.left });
        } else if (positionCSS.left + pickerDim.width > pickerDim.winWidth) {
          positionCSS.left = pickerDim.winWidth - pickerDim.width - positionMargin;
          this.activePickerArrow.css({ left: pos.left + dim.width / 2 - positionCSS.left });
        }
      }
    }

    this.activePicker.css(positionCSS);
  };
  var item = this.queue[this.activePickerQueueIndex];

  if (append) {
    this.activePicker.css({ top: -999 });
    (0, _jqmin2.default)(document.body).append(this.activePicker);
  }

  setTimeout(function () {
    _alignPicker.call(this, item);
  }.bind(this));
};
var onBodyClick = function onBodyClick(e, target) {
  if (!this.activePicker) return this;

  var item = this.queue[this.activePickerQueueIndex];

  target = _AX6Util2.default.findParentNode(e.target, function (target) {
    if (target.getAttribute("data-picker-els")) {
      return true;
    } else if (item.$target.get(0) == target) {
      return true;
    }
  });
  if (!target) {
    this.close();
    return this;
  }
  //console.log("i'm picker");
  return this;
};
var onBtnClick = function onBtnClick(e, target) {
  // console.log('btn click');
  if (e.srcElement) e.target = e.srcElement;

  target = _AX6Util2.default.findParentNode(e.target, function (target) {
    if (target.getAttribute("data-picker-btn")) {
      return true;
    }
  });

  if (target) {
    var item = this.queue[this.activePickerQueueIndex],
        k = target.getAttribute("data-picker-btn");

    if (item.btns && item.btns[k].onClick) {
      var that = {
        key: k,
        value: item.btns[k],
        self: this,
        item: item
      };
      item.btns[k].onClick.call(that, k);
    } else {
      this.close();
    }
  }
};
var onBodyKeyup = function onBodyKeyup(e) {
  if (e.keyCode == _AX6Info2.default.eventKeys.ESC) {
    this.close();
  }
};
var getQueIdx = function getQueIdx(boundID) {
  if (!_AX6Util2.default.isString(boundID)) {
    boundID = (0, _jqmin2.default)(boundID).data("data-axpicker-id");
  }
  if (!_AX6Util2.default.isString(boundID)) {
    console.log(_AX6Info2.default.getError("ax6picker", "402", "getQueIdx"));
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

var AX6UIPicker = function (_AX6UICore) {
  _inherits(AX6UIPicker, _AX6UICore);

  /**
   * @constructor
   * @param config
   * @param [config.theme]
   * @param [config.target]
   * @param [config.animateTime]
   * @param [config.onStateChanged]
   * @param [config.onClick]
   * @param [config.content]
   */
  function AX6UIPicker(config) {
    _classCallCheck(this, AX6UIPicker);

    /**
     * @member {JSON}
     * @param config
     * @param [config.theme=default]
     * @param config.target
     * @param [config.animateTime=100]
     * @param [config.calendar]
     * @param [config.calendar.multipleSelect=false]
     * @param [config.calendar.control]
     * @param [config.calendar.control.left='&#x02190']
     * @param [config.calendar.control.yearTmpl='%s']
     * @param [config.calendar.control.monthTmpl='%s']
     * @param [config.calendar.control.right='&#x02192']
     * @param [config.calendar.control.yearFirst=true]
     * @param [config.palette={}]
     * @param [config.formatter={}]
     * @param [config.onStateChanged]
     * @param [config.onClick]
     */
    var _this = _possibleConstructorReturn(this, (AX6UIPicker.__proto__ || Object.getPrototypeOf(AX6UIPicker)).call(this));

    _this.config = {
      clickEventName: "click", //(('ontouchstart' in document.documentElement) ? "touchend" : "click"),
      theme: 'default',
      title: '',
      lang: {
        "ok": "ok",
        "cancel": "cancel"
      },
      animateTime: 100,
      calendar: {
        multipleSelect: false,
        control: {
          left: '&#x02190',
          yearTmpl: '%s',
          monthTmpl: '%s',
          right: '&#x02192',
          yearFirst: true
        }
      },
      palette: {},
      formatter: {}
    };
    _jqmin2.default.extend(true, _this.config, config);

    // 멤버 변수 초기화
    /**
     * @member {Array}
     */
    _this.queue = [];
    /**
     * @member {Object}
     */
    _this.activePicker = null;
    /**
     * @member {Number}
     */
    _this.activePickerQueueIndex = -1;
    /**
     * @member {Object}
     */
    _this.openTimer = null;
    /**
     * @member {Object}
     */
    _this.closeTimer = null;

    _this.init();
    return _this;
  }

  /**
   * @method
   * @param config
   * @param [config.theme]
   * @param [config.target]
   * @param [config.animateTime]
   * @param [config.onStateChanged]
   * @param [config.onClick]
   * @param [config.content]
   */


  _createClass(AX6UIPicker, [{
    key: "init",
    value: function init() {
      this.onStateChanged = this.config.onStateChanged;
      delete this.config.onStateChanged;

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

      // formatter 인스턴스
      this.formatter = new _AX6UIFormatter2.default();
    }

    /**
     * @method
     * @param item
     * @param {Element} item.target
     * @param {String} item.direction - top|left|right|bottom|auto
     * @param {Number} item.contentWidth
     * @param {Boolean} item.disableChangeTrigger
     * @param {Function} item.onStateChanged
     * @param {Object} item.btns
     * @param {Object} item.content
     * @param {Number} item.content.width
     * @param {Number} item.content.margin
     * @param {String} item.content.type
     * @param {Object} item.content.config - binded UI config
     * @param {Object} item.content.formatter
     * @param {String} item.content.formatter.pattern
     * @return {AX6UIPicker}
     * @example
     * ```js
     * import $ from "jqmin";
     * import Picker from "../../src/AX6UIPicker";
     *
     * let picker = new Picker();
     * picker.bind({
       *     target: $("#color-0"),
       *     direction: "auto",
       *     content: {
       *         width: 250,
       *         margin: 10,
       *         type: 'color',
       *         config: {
       *
       *         }
       *     },
       *     onStateChanged: function () {
       *
       *     }
       * });
     * ```
     */

  }, {
    key: "bind",
    value: function bind(item) {
      var pickerConfig = {},
          queIdx = void 0;
      item = _jqmin2.default.extend(true, pickerConfig, this.config, item);

      if (!item.target) {
        console.log(_AX6Info2.default.getError("ax6picker", "401", "bind"));
        return this;
      }
      item.$target = (0, _jqmin2.default)(item.target);

      if (!item.$target.get(0)) {
        console.log(_AX6Info2.default.getError("ax6picker", "401", "bind"));
        return this;
      }

      if (!item.id) item.id = item.$target.data("data-axpicker-id");
      if (!item.id) {
        item.id = 'ax6-picker-' + _AX6UICore3.default.getInstanceId();
        item.$target.data("data-axpicker-id", item.id);
      }
      queIdx = _AX6Util2.default.search(this.queue, function () {
        return this.id == item.id;
      });

      if (queIdx === -1) {
        this.queue.push(item);
        bindPickerTarget.call(this, this.queue.length - 1);
      } else {
        this.queue[queIdx] = _jqmin2.default.extend(true, {}, this.queue[queIdx], item);
        bindPickerTarget.call(this, queIdx);
      }

      pickerConfig = null;
      queIdx = null;
      return this;
    }

    /**
     * @method
     * @param boundID
     * @param inputIndex
     * @param val
     * @param _option
     * @return {AX6UIPicker}
     */

  }, {
    key: "setContentValue",
    value: function setContentValue(boundID, inputIndex, val, _option) {
      var multipleInputProcessor = {
        "date": function date(_item, _inputIndex, _val) {
          var values = [],
              diffDay,
              prevInputValue,
              nextInputValue;

          if (_item.$target.get(0).tagName.toUpperCase() !== "INPUT") {
            _item.$target.find('input[type]').each(function () {
              values.push(this.value);
            });
          }

          if (_inputIndex == 0) {
            if (values.length > 1 && values[1] !== "") {
              // 값 검증
              diffDay = _AX6Util2.default.dday(values[1], { today: values[0] });
              if (diffDay < 0) {
                // 다음날짜 달력을 변경합니다.
                nextInputValue = _val;
              } else {}
            } else {
              nextInputValue = _val;
            }

            if (nextInputValue) {
              _item.pickerCalendar[1].calendar.setSelection([nextInputValue], false).changeMode("d", nextInputValue);
              this.setContentValue(_item.id, 1, nextInputValue);
            }

            return _val;
          } else if (_inputIndex == 1) {

            if (values.length > 1) {
              // 값 검증
              diffDay = _AX6Util2.default.dday(values[1], { today: values[0] });
              if (diffDay < 0) {
                // 다음날짜 달력을 변경합니다.
                prevInputValue = values[1];
              }
            }

            if (prevInputValue) {
              _item.pickerCalendar[0].calendar.setSelection([prevInputValue], false).changeMode("d", prevInputValue);
              this.setContentValue(_item.id, 0, prevInputValue);
            }

            return _val;
          }
        }
      };

      var queIdx = _AX6Util2.default.isNumber(boundID) ? boundID : getQueIdx.call(this, boundID),
          item = this.queue[queIdx],
          _input = void 0;

      if (!_option) _option = {};
      if (item) {

        _input = item.$target.get(0).tagName.toUpperCase() == "INPUT" ? item.$target : (0, _jqmin2.default)(item.$target.find('input[type]').get(inputIndex));
        _input.val(val);

        if (!item.disableChangeTrigger) {
          _input.trigger("change");
        } else {
          var $colorPreview = item.$target.find('[data-ax6picker-color="preview"]');
          if ($colorPreview.get(0)) {
            $colorPreview.css({ "background-color": val });
          }
        }

        // picker의 입력이 2개이상인 경우
        //console.log(item.inputLength);
        if (item.inputLength > 1) {
          // 경우에 따라 첫번 선택에 따라 해야할 일들 처리
          if (multipleInputProcessor[item.content.type]) {
            val = multipleInputProcessor[item.content.type].call(this, item, inputIndex, val);
          }
        }

        var that = {
          self: this,
          state: "changeValue",
          item: item,
          inputIndex: inputIndex,
          value: val,
          values: [val]
        };
        if (item.$target.get(0).tagName.toUpperCase() !== "INPUT") {
          that.values = [];
          item.$target.find('input[type]').each(function () {
            that.values.push(this.value);
          });
        }

        onStateChanged.call(this, item, that);

        if (item.inputLength == 1 && !_option.doNotClose) {
          this.close();
        }
      }

      item = null;
      boundID = null;
      inputIndex = null;
      val = null;
      return this;
    }

    /**
     * @method
     * @param boundID
     * @param inputIndex
     * @return {*}
     */

  }, {
    key: "getContentValue",
    value: function getContentValue(boundID, inputIndex) {
      var queIdx = _AX6Util2.default.isNumber(boundID) ? boundID : getQueIdx.call(this, boundID),
          item = this.queue[queIdx],
          _input = void 0;

      if (item) {
        _input = item.$target.get(0).tagName.toUpperCase() == "INPUT" ? item.$target : (0, _jqmin2.default)(item.$target.find('input[type]').get(inputIndex));
        return _input.val();
      }

      item = null;
      boundID = null;
      inputIndex = null;
      return this;
    }

    /**
     * @method
     * @param boundID
     * @param tryCount
     * @return {AX6UIPicker}
     */

  }, {
    key: "open",
    value: function open(boundID, tryCount) {
      var _this3 = this;

      var pickerContent = {
        '@fn': function fn(queIdx, callback) {
          var item = this.queue[queIdx];
          item.content.call(item, function (html) {
            callback(html);
          });
          return true;
        },
        'date': function date(queIdx) {
          var item = this.queue[queIdx],
              html = [],
              calendarConfig = _jqmin2.default.extend({}, this.config.calendar, { displayDate: new Date() }),
              input = item.$target.get(0).tagName.toUpperCase() == "INPUT" ? item.$target : item.$target.find('input[type]');

          for (var i = 0; i < item.inputLength; i++) {
            html.push('<div ' + 'style="width:' + _AX6Util2.default.cssNumber(item.content.width) + ';float:left;" ' + 'class="ax-picker-content-box" ' + 'data-calendar-target="' + i + '"></div>');
            if (i < item.inputLength - 1) html.push('<div style="width:' + item.content.margin + 'px;float:left;height: 5px;"></div>');
          }
          html.push('<div style="clear:both;"></div>');
          item.pickerContent.html(html.join(''));

          // calendar bind
          item.pickerCalendar = [];
          item.pickerContent.find('[data-calendar-target]').each(function () {

            // calendarConfig extend ~
            var idx = this.getAttribute("data-calendar-target"),
                dValue = input.get(idx).value,
                d = _AX6Util2.default.date(dValue),
                dateConvert = {
              "year": function year(_d) {
                return _AX6Util2.default.date(_d, { "return": "yyyy" });
              },
              "month": function month(_d) {
                return _AX6Util2.default.date(_d, { "return": "yyyy-MM" });
              },
              "day": function day(_d) {
                return _d;
              }
            };

            calendarConfig.displayDate = d;

            if (dValue) calendarConfig.selection = [d];

            calendarConfig = _jqmin2.default.extend(true, calendarConfig, item.content.config || {});
            calendarConfig.target = this;
            calendarConfig.onClick = function () {
              self.setContentValue(item.id, idx, dateConvert[calendarConfig.selectMode || "day"](this.date));
            };

            item.pickerCalendar.push({
              itemId: item.id,
              inputIndex: idx,
              calendar: new _AX6UICalendar2.default(calendarConfig)
            });
          });
        },
        'secure-num': function secureNum(queIdx) {
          var _this2 = this;

          var item = this.queue[queIdx],
              html = [];
          for (var i = 0; i < item.inputLength; i++) {
            html.push('<div ' + 'style="width:' + _AX6Util2.default.cssNumber(item.content.width) + ';float:left;" ' + 'class="ax-picker-content-box" ' + 'data-secure-num-target="' + i + '"></div>');
            if (i < item.inputLength - 1) html.push('<div style="width:' + item.content.margin + 'px;float:left;height: 5px;"></div>');
          }
          html.push('<div style="clear:both;"></div>');
          item.pickerContent.html(html.join(''));

          // secure-num bind
          item.pickerContent.find('[data-secure-num-target]').each(function (elIdx, el) {
            var idx = el.getAttribute("data-secure-num-target"),
                po = [];

            var numArray = function (a) {
              var j = void 0,
                  x = void 0,
                  i = void 0;
              for (i = a.length; i; i -= 1) {
                j = Math.floor(Math.random() * i);
                x = a[i - 1];
                a[i - 1] = a[j];
                a[j] = x;
              }
              return a;
            }([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

            var specialArray = [{ label: "&#x02190", fn: "back" }, { label: "C", fn: "clear" }];

            numArray.forEach(function (n) {
              po.push('<div style="float:left;' + item.content.config.btnWrapStyle + '">');
              po.push('<button class="' + item.content.config.btnTheme + '" ' + 'style="' + item.content.config.btnStyle + '" data-secure-num-value="' + n + '">' + n + '</button>');
              po.push('</div>');
            });
            specialArray.forEach(function (n) {
              po.push('<div style="float:left;' + item.content.config.btnWrapStyle + '">');
              po.push('<button class="' + item.content.config.specialBtnTheme + '" ' + 'style="' + item.content.config.btnStyle + '" data-secure-num-value="' + n.fn + '">' + n.label + '</button>');
              po.push('</div>');
            });

            po.push('<div style="clear:both;"></div>');

            $(el).html(po.join('')).on("click", '[data-secure-num-value]', function (e) {
              var act = e.currentTarget.getAttribute("data-secure-num-value");
              var _input = item.$target.get(0).tagName.toUpperCase() == "INPUT" ? item.$target : (0, _jqmin2.default)(item.$target.find('input[type]').get(idx));
              var val = _input.val();

              if (act == "back") {
                _input.val(val.substring(0, val.length - 1));
              } else if (act == "clear") {
                _input.val('');
              } else {
                _input.val(val + act);
              }

              onStateChanged.call(_this2, item, {
                self: _this2,
                state: "changeValue",
                item: item,
                value: _input.val()
              });
            });
          });
        },
        'keyboard': function keyboard(queIdx) {
          var item = this.queue[queIdx];
          var html = [];
          for (var i = 0; i < item.inputLength; i++) {
            html.push('<div ' + 'style="width:' + _AX6Util2.default.cssNumber(item.content.width) + ';float:left;" ' + 'class="ax-picker-content-box" ' + 'data-keyboard-target="' + i + '"></div>');
            if (i < item.inputLength - 1) html.push('<div style="width:' + item.content.margin + 'px;float:left;height: 5px;"></div>');
          }
          html.push('<div style="clear:both;"></div>');
          item.pickerContent.html(html.join(''));

          var keyArray = [[{ value: "`", shiftValue: "~" }, { value: "1", shiftValue: "!" }, { value: "2", shiftValue: "@" }, { value: "3", shiftValue: "#" }, { value: "4", shiftValue: "$" }, { value: "5", shiftValue: "%" }, { value: "6", shiftValue: "^" }, { value: "7", shiftValue: "&" }, { value: "8", shiftValue: "*" }, { value: "9", shiftValue: "(" }, { value: "0", shiftValue: ")" }, { value: "-", shiftValue: "_" }, { value: "=", shiftValue: "+" }, { label: "&#x02190", fn: "back" }], [{ value: "q", shiftValue: "Q" }, { value: "w", shiftValue: "W" }, { value: "e", shiftValue: "E" }, { value: "r", shiftValue: "R" }, { value: "t", shiftValue: "T" }, { value: "y", shiftValue: "Y" }, { value: "u", shiftValue: "U" }, { value: "i", shiftValue: "I" }, { value: "o", shiftValue: "O" }, { value: "p", shiftValue: "P" }, { value: "[", shiftValue: "{" }, { value: "]", shiftValue: "}" }, { value: "\\", shiftValue: "|" }], [{ label: "Clear", fn: "clear" }, { value: "a", shiftValue: "A" }, { value: "s", shiftValue: "S" }, { value: "d", shiftValue: "D" }, { value: "f", shiftValue: "F" }, { value: "g", shiftValue: "G" }, { value: "h", shiftValue: "H" }, { value: "j", shiftValue: "J" }, { value: "k", shiftValue: "K" }, { value: "l", shiftValue: "L" }, { value: ";", shiftValue: ":" }, { value: "'", shiftValue: "\"" }], [{ label: "Shift", fn: "shift" }, { value: "z", shiftValue: "Z" }, { value: "x", shiftValue: "X" }, { value: "c", shiftValue: "C" }, { value: "v", shiftValue: "V" }, { value: "b", shiftValue: "B" }, { value: "n", shiftValue: "N" }, { value: "m", shiftValue: "M" }, { value: ",", shiftValue: "<" }, { value: ".", shiftValue: ">" }, { value: "/", shiftValue: "?" }, { label: "Close", fn: "close" }]];
          var specialArray = [{ label: "&#x02190", fn: "back" }, { label: "C", fn: "clear" }];
          var getKeyBoard = function getKeyBoard(isShiftKey) {
            var po = [];
            keyArray.forEach(function (row) {
              po.push('<div style="display: table;margin:0 auto;">');
              row.forEach(function (n) {

                var keyValue = void 0,
                    keyLabel = void 0,
                    btnWrapStyle = void 0,
                    btnTheme = void 0,
                    btnStyle = void 0;
                if (n.fn) {
                  keyValue = n.fn;
                  keyLabel = n.label;
                  btnWrapStyle = item.content.config.specialBtnWrapStyle;
                  btnTheme = item.content.config.specialBtnTheme;
                  btnStyle = item.content.config.specialBtnStyle;
                } else {
                  keyLabel = keyValue = isShiftKey ? n.shiftValue : n.value;
                  btnWrapStyle = item.content.config.btnWrapStyle;
                  btnTheme = item.content.config.btnTheme;
                  btnStyle = item.content.config.btnStyle;
                }

                po.push('<div style="display: table-cell;' + btnWrapStyle + '">');
                po.push('<button class="' + btnTheme + '" ' + 'style="' + btnStyle + '" data-keyboard-value="' + keyValue + '">' + keyLabel + '</button>');
                po.push('</div>');
              });
              po.push('</div>');
            });
            return po.join('');
          };

          // secure-num bind
          item.pickerContent.find('[data-keyboard-target]').each(function () {
            var idx = this.getAttribute("data-keyboard-target"),
                $this = $(this),
                isShiftKey = false,
                toggleShift = function toggleShift() {
              isShiftKey = !isShiftKey;
              $this.html(getKeyBoard(isShiftKey));
            };

            $this.html(getKeyBoard(isShiftKey)).on("mousedown", '[data-keyboard-value]', function () {
              var act = this.getAttribute("data-keyboard-value"),
                  _input = item.$target.get(0).tagName.toUpperCase() == "INPUT" ? item.$target : (0, _jqmin2.default)(item.$target.find('input[type]').get(idx)),
                  val = _input.val();

              switch (act) {
                case "back":
                  _input.val(val.substring(0, val.length - 1));
                  break;
                case "clear":
                  _input.val('');
                  break;
                case "shift":
                  toggleShift();
                  return false;
                  break;
                case "close":
                  self.close();
                  return false;
                  break;
                default:
                  _input.val(val + act);
              }

              onStateChanged.call(this, item, {
                self: self,
                state: "changeValue",
                item: item,
                value: _input.val()
              });
            });
          });
        },
        'numpad': function numpad(queIdx) {
          var item = this.queue[queIdx],
              html = [];
          for (var i = 0; i < item.inputLength; i++) {
            html.push('<div ' + 'style="width:' + _AX6Util2.default.cssNumber(item.content.width) + ';float:left;" ' + 'class="ax-picker-content-box" ' + 'data-numpad-target="' + i + '"></div>');
            if (i < item.inputLength - 1) html.push('<div style="width:' + item.content.margin + 'px;float:left;height: 5px;"></div>');
          }
          html.push('<div style="clear:both;"></div>');
          item.pickerContent.html(html.join(''));

          // secure-num bind
          item.pickerContent.find('[data-numpad-target]').each(function () {
            var idx = this.getAttribute("data-numpad-target"),
                po = [],
                keyArray = item.content.config.keyArray || [{ value: "7" }, { value: "8" }, { value: "9" }, { label: "BS", fn: "back" }, { value: "4" }, { value: "5" }, { value: "6" }, { label: "CLS", fn: "clear" }, { value: "1" }, { value: "2" }, { value: "3" }, { value: "" }, { value: "." }, { value: "0" }, { value: "" }, { label: "OK", fn: "enter" }];

            keyArray.forEach(function (n) {
              var keyValue = void 0,
                  keyLabel = void 0,
                  btnWrapStyle = void 0,
                  btnTheme = void 0,
                  btnStyle = void 0;

              if (n.fn) {
                keyValue = n.fn;
                keyLabel = n.label;
                btnTheme = item.content.config.specialBtnTheme;
                btnWrapStyle = item.content.config.specialBtnWrapStyle;
                btnStyle = item.content.config.specialBtnStyle;
              } else {
                keyLabel = keyValue = n.value;
                btnTheme = keyValue ? item.content.config.btnTheme : "";
                btnWrapStyle = item.content.config.btnWrapStyle;
                btnStyle = item.content.config.btnStyle;
              }

              po.push('<div style="float:left;' + btnWrapStyle + '">');
              po.push('<button class="btn btn-default btn-' + btnTheme + '" ' + 'style="' + btnStyle + '" data-numpad-value="' + keyValue + '">' + (keyLabel || "&nbsp;") + '</button>');
              po.push('</div>');
            });

            po.push('<div style="clear:both;"></div>');

            $(this).html(po.join('')).on("mousedown", '[data-numpad-value]', function () {
              var act = this.getAttribute("data-numpad-value"),
                  _input = item.$target.get(0).tagName.toUpperCase() == "INPUT" ? item.$target : (0, _jqmin2.default)(item.$target.find('input[type]').get(idx)),
                  val = _input.val(),
                  state = "";

              switch (act) {
                case "back":
                  state = "changeValue";
                  _input.val(val.substring(0, val.length - 1));
                  break;
                case "clear":
                  state = "changeValue";
                  _input.val('');
                  break;
                case "enter":
                  self.close(item, "enter");
                  return false;
                  break;
                case "close":
                  self.close();
                  return false;
                  break;
                default:
                  state = "changeValue";
                  _input.val(val + act);
              }

              onStateChanged.call(this, item, {
                self: self,
                state: state,
                item: item,
                value: _input.val()
              });
            });
          });
        },
        'color': function color(queIdx) {
          var item = this.queue[queIdx],
              html = [],
              paletteConfig = _jqmin2.default.extend({}, this.config.palette),
              input = item.$target.get(0).tagName.toUpperCase() == "INPUT" ? item.$target : item.$target.find('input[type]');

          for (var i = 0; i < item.inputLength; i++) {
            html.push('<div ' + 'style="padding: 5px;width:' + _AX6Util2.default.cssNumber(item.content.width) + ';float:left;" ' + 'class="ax-picker-content-box" ' + 'data-palette-target="' + i + '" data-ax5palette="ax6picker-' + item.id + '"></div>');
            if (i < item.inputLength - 1) html.push('<div style="width:' + item.content.margin + 'px;float:left;height: 5px;"></div>');
          }
          html.push('<div style="clear:both;"></div>');
          item.pickerContent.html(html.join(''));

          // calendar bind
          item.pickerPalette = [];
          item.pickerContent.find('[data-palette-target]').each(function () {
            // calendarConfig extend ~
            var idx = this.getAttribute("data-palette-target"),
                dColor = input.get(idx).value;

            paletteConfig.selectedColor = dColor;
            paletteConfig = _jqmin2.default.extend(true, paletteConfig, item.content.config || {});
            paletteConfig.target = this;
            paletteConfig.onClick = function (color) {
              self.setContentValue(item.id, idx, color);
            };
            paletteConfig.onUpdateColor = function (color) {
              self.setContentValue(item.id, idx, color, { doNotClose: true });
            };

            item.pickerPalette.push({
              itemId: item.id,
              inputIndex: idx,
              palette: new _AX6UIPalette2.default(paletteConfig)
            });
          });
        }
      };

      var self = this;
      var queIdx = _AX6Util2.default.isNumber(boundID) ? boundID : getQueIdx.call(this, boundID),
          item = this.queue[queIdx];

      /**
       다른 피커가 있는 경우와 다른 피커를 닫고 다시 오픈 명령이 내려진 경우에 대한 예외 처리 구문
       */
      if (this.openTimer) clearTimeout(this.openTimer);
      if (this.activePicker) {
        if (this.activePickerQueueIndex == queIdx) {
          return this;
        }

        if (tryCount > 2) return this;
        this.close();
        this.openTimer = setTimeout(function () {
          this.open(queIdx, (tryCount || 0) + 1);
        }.bind(this), this.config.animateTime);
        return this;
      }

      this.activePicker = (0, _jqmin2.default)(_AX6Mustache2.default.render(tmpl.pickerTmpl.call(this), item));
      this.activePickerArrow = this.activePicker.find(".ax-picker-arrow");
      this.activePickerQueueIndex = queIdx;
      item.pickerContent = this.activePicker.find('[data-picker-els="content"]');

      if (_AX6Util2.default.isFunction(item.content)) {
        // 함수타입
        item.pickerContent.html("Loading..");
        pickerContent["@fn"].call(this, queIdx, function (html) {
          item.pickerContent.html(html);
        });
      } else {
        if (item.content.type in pickerContent) {
          pickerContent[item.content.type].call(this, queIdx);
        }
      }

      // bind event picker btns
      this.activePicker.find("[data-picker-btn]").on(this.config.clickEventName, function (e) {
        onBtnClick.call(this, e || window.event, queIdx);
      }.bind(this));

      alignPicker.call(this, "append");

      (0, _jqmin2.default)(window).on("resize.ax6picker", _AX6Util2.default.throttle(function (e) {
        alignPicker.call(this, e || window.event);
      }, 100).bind(this)).on("keyup.ax6picker", function (e) {
        e = e || window.event;
        onBodyKeyup.call(_this3, e);
        _AX6Util2.default.stopEvent(e);
      }).on("click.ax6picker", function (e) {
        e = e || window.event;
        onBodyClick.call(_this3, e);
        _AX6Util2.default.stopEvent(e);
      });

      onStateChanged.call(this, item, {
        self: this,
        state: "open",
        item: item
      });

      return this;
    }

    /**
     * @method
     * @param item
     * @param state
     * @return {AX6UIPicker}
     */

  }, {
    key: "close",
    value: function close(item, state) {
      if (this.closeTimer) clearTimeout(this.closeTimer);
      if (!this.activePicker) return this;

      item = this.queue[this.activePickerQueueIndex];

      this.activePicker.addClass("destroy");
      (0, _jqmin2.default)(window).off("resize.ax6picker");
      (0, _jqmin2.default)(window).off("click.ax6picker");
      (0, _jqmin2.default)(window).off("keyup.ax6picker");

      this.closeTimer = setTimeout(function () {
        if (this.activePicker) this.activePicker.remove();
        this.activePicker = null;
        this.activePickerQueueIndex = -1;

        onStateChanged.call(this, item, {
          self: this,
          state: state || "close"
        });
      }.bind(this), this.config.animateTime);

      return this;
    }
  }]);

  return AX6UIPicker;
}(_AX6UICore3.default);

exports.default = AX6UIPicker;

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcGlja2VyLmpzIiwid2VicGFjazovLy8uLi9zcmMvQVg2TXVzdGFjaGUuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9BWDZVSUNhbGVuZGFyL3N0eWxlLnNjc3M/YmQ0NyIsIndlYnBhY2s6Ly8vLi4vc3JjL0FYNlVJQ2FsZW5kYXIvc3R5bGUuc2NzcyIsIndlYnBhY2s6Ly8vLi4vc3JjL0FYNlVJRm9ybWF0dGVyLmpzIiwid2VicGFjazovLy8uLi9zcmMvQVg2VUlGb3JtYXR0ZXIvQVg2VUlGb3JtYXR0ZXJfZm9ybWF0dGVyLmpzIiwid2VicGFjazovLy8uLi9zcmMvQVg2VUlDYWxlbmRhci5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL0FYNlVJUGFsZXR0ZS5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL0FYNlVJUGFsZXR0ZS9zdHlsZS5zY3NzPzVkMzEiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9BWDZVSVBhbGV0dGUvc3R5bGUuc2NzcyIsIndlYnBhY2s6Ly8vLi4vc3JjL0FYNlVJUGlja2VyL3N0eWxlLnNjc3M/NDFiNSIsIndlYnBhY2s6Ly8vLi4vc3JjL0FYNlVJUGlja2VyL3N0eWxlLnNjc3MiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9BWDZVSVBpY2tlci5qcyJdLCJuYW1lcyI6WyJodG1sIiwiZm4iLCJtb2R1bGVSdW4iLCIkYm9keSIsInRvZGF5IiwiRGF0ZSIsInBpY2tlciIsImJpbmQiLCJ6SW5kZXgiLCJ0YXJnZXQiLCJkaXJlY3Rpb24iLCJjb250ZW50IiwidHlwZSIsImNvbmZpZyIsIm1vZGUiLCJzZWxlY3RNb2RlIiwiZm9ybWF0dGVyIiwicGF0dGVybiIsIm9uU3RhdGVDaGFuZ2VkIiwid2lkdGgiLCJtYXJnaW4iLCJjb250cm9sIiwibGVmdCIsInllYXJUbXBsIiwibW9udGhUbXBsIiwicmlnaHQiLCJsYW5nIiwibW9udGhzIiwiZGF5VG1wbCIsImJ0bnMiLCJsYWJlbCIsInRoZW1lIiwib25DbGljayIsIml0ZW0iLCJpbnB1dExlbmd0aCIsInNlbGYiLCJzZXRDb250ZW50VmFsdWUiLCJpZCIsImRhdGUiLCJjbG9zZSIsInRoaXNNb250aCIsImRheXNPZk1vbnRoIiwiZ2V0RnVsbFllYXIiLCJnZXRNb250aCIsIm9rIiwiYSIsInN0YXRlIiwiY2FsZW5kYXIiLCJwaWNrZXJDYWxlbmRhciIsInNldFNlbGVjdGlvbiIsImQiLCJ2YWx1ZXMiLCJsZW5ndGgiLCJpbnB1dEluZGV4IiwiYnRuV3JhcFN0eWxlIiwiYnRuU3R5bGUiLCJidG5UaGVtZSIsInNwZWNpYWxCdG5UaGVtZSIsImNvbnNvbGUiLCJsb2ciLCJ2YWx1ZSIsInNwZWNpYWxCdG5XcmFwU3R5bGUiLCJzcGVjaWFsQnRuU3R5bGUiLCJjb250ZW50V2lkdGgiLCJjYWxsYmFjayIsIm1vZHVsZURlc3Ryb3kiLCJvZmYiLCJBWDYiLCJkZWZpbmVNdXN0YWNoZSIsImdsb2JhbCIsImZhY3RvcnkiLCJtdXN0YWNoZSIsIm11c3RhY2hlRmFjdG9yeSIsIm9iamVjdFRvU3RyaW5nIiwiT2JqZWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJpc0FycmF5IiwiQXJyYXkiLCJpc0FycmF5UG9seWZpbGwiLCJvYmplY3QiLCJjYWxsIiwiaXNGdW5jdGlvbiIsInR5cGVTdHIiLCJvYmoiLCJlc2NhcGVSZWdFeHAiLCJzdHJpbmciLCJyZXBsYWNlIiwiaGFzUHJvcGVydHkiLCJwcm9wTmFtZSIsInJlZ0V4cFRlc3QiLCJSZWdFeHAiLCJ0ZXN0IiwidGVzdFJlZ0V4cCIsInJlIiwibm9uU3BhY2VSZSIsImlzV2hpdGVzcGFjZSIsImVudGl0eU1hcCIsImVzY2FwZUh0bWwiLCJTdHJpbmciLCJmcm9tRW50aXR5TWFwIiwicyIsIndoaXRlUmUiLCJzcGFjZVJlIiwiZXF1YWxzUmUiLCJjdXJseVJlIiwidGFnUmUiLCJwYXJzZVRlbXBsYXRlIiwidGVtcGxhdGUiLCJ0YWdzIiwic2VjdGlvbnMiLCJ0b2tlbnMiLCJzcGFjZXMiLCJoYXNUYWciLCJub25TcGFjZSIsInN0cmlwU3BhY2UiLCJwb3AiLCJvcGVuaW5nVGFnUmUiLCJjbG9zaW5nVGFnUmUiLCJjbG9zaW5nQ3VybHlSZSIsImNvbXBpbGVUYWdzIiwidGFnc1RvQ29tcGlsZSIsInNwbGl0IiwiRXJyb3IiLCJzY2FubmVyIiwiU2Nhbm5lciIsInN0YXJ0IiwiY2hyIiwidG9rZW4iLCJvcGVuU2VjdGlvbiIsImVvcyIsInBvcyIsInNjYW5VbnRpbCIsImkiLCJ2YWx1ZUxlbmd0aCIsImNoYXJBdCIsInB1c2giLCJzY2FuIiwibmVzdFRva2VucyIsInNxdWFzaFRva2VucyIsInNxdWFzaGVkVG9rZW5zIiwibGFzdFRva2VuIiwibnVtVG9rZW5zIiwibmVzdGVkVG9rZW5zIiwiY29sbGVjdG9yIiwic2VjdGlvbiIsInRhaWwiLCJtYXRjaCIsImluZGV4Iiwic3Vic3RyaW5nIiwic2VhcmNoIiwiQ29udGV4dCIsInZpZXciLCJwYXJlbnRDb250ZXh0IiwiY2FjaGUiLCJyZXR1cm5zIiwiayIsInBhcmVudCIsImxvb2t1cCIsIm5hbWUiLCJoYXNPd25Qcm9wZXJ0eSIsImNvbnRleHQiLCJuYW1lcyIsImxvb2t1cEhpdCIsImluZGV4T2YiLCJXcml0ZXIiLCJjbGVhckNhY2hlIiwicGFyc2UiLCJyZW5kZXIiLCJwYXJ0aWFscyIsInJlbmRlclRva2VucyIsIm9yaWdpbmFsVGVtcGxhdGUiLCJidWZmZXIiLCJzeW1ib2wiLCJ1bmRlZmluZWQiLCJyZW5kZXJTZWN0aW9uIiwicmVuZGVySW52ZXJ0ZWQiLCJyZW5kZXJQYXJ0aWFsIiwidW5lc2NhcGVkVmFsdWUiLCJlc2NhcGVkVmFsdWUiLCJyYXdWYWx1ZSIsInN1YlJlbmRlciIsImoiLCJzbGljZSIsImVzY2FwZSIsInZlcnNpb24iLCJkZWZhdWx0V3JpdGVyIiwiVHlwZUVycm9yIiwidG9faHRtbCIsInNlbmQiLCJyZXN1bHQiLCJzZXRTZWxlY3Rpb25SYW5nZSIsImlucHV0IiwiZm9jdXMiLCJjcmVhdGVUZXh0UmFuZ2UiLCJyYW5nZSIsImNvbGxhcHNlIiwibW92ZUVuZCIsIm1vdmVTdGFydCIsInNlbGVjdCIsInNlbGVjdGlvblN0YXJ0Iiwic2VsZWN0aW9uRW5kIiwiZm9ybWF0dGVyRXZlbnQiLCJvcHRzIiwib3B0SWR4IiwiZSIsIiRpbnB1dCIsImRhdGEiLCJ2YWwiLCJpc1N0b3AiLCJlbnRlcmFibGVLZXlDb2RlcyIsIndoaWNoIiwibWV0YUtleSIsImN0cmxLZXkiLCJzaGlmdEtleSIsInN0b3BFdmVudCIsImVsZW0iLCJnZXQiLCJlbGVtRm9jdXNQb3NpdGlvbiIsImJlZm9yZVZhbHVlIiwibmV3VmFsdWUiLCJzZWxlY3Rpb24iLCJzZWxlY3Rpb25MZW5ndGgiLCJkb2N1bWVudCIsImNyZWF0ZVJhbmdlIiwidGV4dCIsImN1c3RvbUZvcm1hdHRlciIsImdldFBhdHRlcm5WYWx1ZSIsInRyaWdnZXIiLCJfZm9yY2UiLCJyZW1vdmVEYXRhIiwiYmluZEZvcm1hdHRlclRhcmdldCIsIiR0YXJnZXQiLCJ0YWdOYW1lIiwiYXR0ciIsImZpbmQiLCJnZXRFcnJvciIsIm1hdGNoZWQiLCJwYXR0ZXJuQXJndW1lbnQiLCJnZXRFbnRlcmFibGVLZXlDb2RlcyIsIm9uIiwicXVldWUiLCJrZXlkb3duIiwia2V5dXAiLCJibHVyIiwidW5iaW5kRm9ybWF0dGVyVGFyZ2V0IiwiZ2V0UXVlSWR4IiwiYm91bmRJRCIsImlzU3RyaW5nIiwiQVg2VUlGb3JtYXR0ZXIiLCJhbmltYXRlVGltZSIsImV4dGVuZCIsIm9wZW5UaW1lciIsImNsb3NlVGltZXIiLCJpbml0IiwiaW5pdE9uY2UiLCJpbml0aWFsaXplZCIsImZvcm1hdHRlckNvbmZpZyIsImdldEZvcm1hdHRlciIsImVhY2giLCJnZXRJbnN0YW5jZUlkIiwicXVlSWR4IiwiaXNOdW1iZXIiLCJ1bmJpbmQiLCJzcGxpY2UiLCJfZm9ybWF0dGVyIiwiYXNzaWduIiwiY3RybEtleXMiLCJudW1LZXlzIiwiVE9EQVkiLCJwYXR0ZXJuX21vbmV5IiwiX29wdHMiLCJlVHlwZSIsInJlZ0V4cFBhdHRlcm4iLCJhcnJOdW1iZXIiLCJyZXR1cm5WYWx1ZSIsIm1heFJvdW5kIiwiam9pbiIsInBhdHRlcm5fbnVtYmVyIiwicGF0dGVybl9kYXRlIiwibWF0Y2hlZFBhdHRlcm4iLCJpbnNwZWN0VmFsdWUiLCJmb3JtYXQiLCJpbnNwZWN0IiwiX3ZhbCIsInYiLCJzZXREaWdpdCIsImdldERhdGUiLCJkTGVuIiwiYiIsIm52YWwiLCJhcmd1bWVudHMiLCJwYXR0ZXJuX3RpbWUiLCJwYXR0ZXJuX2Jpem5vIiwicGF0dGVybl9waG9uZSIsInJlZ0V4cFBhdHRlcm4zIiwic3Vic3RyIiwicGF0dGVybl9jcmVkaXQiLCJwYXR0ZXJuX2N1c3RvbSIsImV2ZW50IiwibW9uZXkiLCJudW1iZXIiLCJ0aW1lIiwiYml6bm8iLCJwaG9uZSIsImNyZWRpdCIsImN1c3RvbSIsInRtcGwiLCJmcmFtZSIsImNvbHVtbktleXMiLCJkYXkiLCJtb250aCIsInllYXIiLCJ0aGF0IiwiZ2V0RnJhbWUiLCJjb250cm9sQ1NTIiwiY29udHJvbEJ1dHRvbkNTUyIsImNzc051bWJlciIsImRpbWVuc2lvbnMiLCJjb250cm9sSGVpZ2h0IiwiY3NzIiwic2V0RGlzcGxheSIsIm15RGF0ZSIsImRpc3BsYXlEYXRlIiwieXkiLCJtbSIsInl5MSIsInl5MiIsIiQiLCJ5ZWFyRmlyc3QiLCJOdW1iZXIiLCJjbGlja0V2ZW50TmFtZSIsImZpbmRQYXJlbnROb2RlIiwiZ2V0QXR0cmlidXRlIiwiY2hhbmdlTW9kZSIsInByaW50RGF5Iiwibm93RGF0ZSIsImRvdERhdGUiLCJtb250aFN0cmF0RGF0ZSIsIl90b2RheSIsInRhYmxlU3RhcnREYXRlIiwiZ2V0RGF5Iiwic3RhcnRPZldlZWsiLCJhZGQiLCJsb29wRGF0ZSIsIml0ZW1TdHlsZXMiLCJfayIsImZyYW1lV2lkdGgiLCJmcmFtZUhlaWdodCIsIk1hdGgiLCJmbG9vciIsImhlaWdodCIsImNvbEhlYWRIZWlnaHQiLCJpdGVtUGFkZGluZyIsIndlZWtOYW1lcyIsImNvbmNhdCIsImxpc3QiLCJmb3JFYWNoIiwibiIsInRoaXNEYXRlIiwiZGF0ZUZvcm1hdCIsIl9kYXRlIiwiaXNTdGFydE9mV2VlayIsInRoaXNEYXRhTGFiZWwiLCJhZGRDbGFzcyIsImNsYXNzTmFtZXMiLCJzZWxlY3RhYmxlIiwic2VsZWN0YWJsZU1hcCIsIm1hcmtlck1hcCIsImRlZmF1bHRNYXJrZXJUaGVtZSIsInNlbGVjdGlvbk1hcCIsIndpbmRvdyIsIm9uY2xpY2siLCJwcmludGVkRGF5IiwiZW5kIiwiYWN0aW9uIiwicHJpbnRNb250aCIsIm5Nb250aCIsIm0iLCJ0YWJsZVN0YXJ0TW9udGgiLCJjb2xIZWFkTGFiZWwiLCJtb250aEhlYWRpbmciLCJfbW9udGgiLCJyb3ciLCJjb2wiLCJpc1N0YXJ0T2ZSb3ciLCJ0aGlzTW9udGhMYWJlbCIsInByaW50WWVhciIsIm5ZZWFyIiwieSIsInRhYmxlU3RhcnRZZWFyIiwieWVhckhlYWRpbmciLCJfeWVhciIsInRoaXNZZWFyIiwidGhpc1llYXJMYWJlbCIsInJlbW92ZWQiLCJkdCIsInNlbGVjdGFibGVDb3VudCIsIm11bHRpcGxlU2VsZWN0IiwicmVtb3ZlQ2xhc3MiLCJkYXRlRWxlbWVudCIsIm1vdmUiLCJhcHBseU1hcmtlck1hcCIsInNldFRpbWVvdXQiLCJhcHBseVNlbGVjdGlvbk1hcCIsImFwcGx5UGVyaW9kTWFwIiwicGVyaW9kTWFwIiwiY2xlYXJQZXJpb2RNYXAiLCJlbXB0eSIsIkFYNlVJQ2FsZW5kYXIiLCJjb250cm9sQnV0dG9uV2lkdGgiLCJkZWZhdWx0UGVyaW9kVGhlbWUiLCJzZXRTZWxlY3RhYmxlIiwibWFya2VyIiwic2V0TWFya2VyIiwiY2hhbmdlRGF0ZSIsImlzUHJpbnQiLCJwcm9jZXNzb3IiLCJtYXAiLCJjb3VudCIsImlzRGF0ZSIsImFyciIsImtleSIsImlzRGF0ZUZvcm1hdCIsImZyb20iLCJ0byIsInNldERhdGUiLCJrZXlzIiwiaXNBcHBseSIsInBlcmlvZCIsImdldFRpbWUiLCJmcm9tTGFiZWwiLCJ0b0xhYmVsIiwiZnJhbWVUbXBsIiwiY29sb3JzVG1wbCIsIkVOTSIsInN1cHBvcnRUb3VjaCIsImdldE1vdXNlUG9zaXRpb24iLCJtb3VzZU9iaiIsIm9yaWdpbmFsRXZlbnQiLCJjaGFuZ2VkVG91Y2hlcyIsImNsaWVudFgiLCJwYWdlWCIsImNsaWVudFkiLCJwYWdlWSIsImJpbmRIYW5kbGUiLCJvcmlnaW5hbFRyYWNrV2lkdGgiLCIkdHJhY2siLCJ0cmFja1dpZHRoIiwiY29sb3JzIiwic2xpZGVyIiwiaGFuZGxlV2lkdGgiLCJoYW5kbGVMZWZ0IiwiYW1vdW50VG9IYW5kbGVMZWZ0IiwiX2Ftb3VudCIsImFtb3VudCIsImhhbmRsZUxlZnRUb0Ftb3VudCIsInVwZGF0ZVByZXZpZXdDb2xvciIsImFtb3VudFRvQ29sb3IiLCIkaGFuZGxlIiwiJGl0ZW0iLCJfb3JpZ2luYWxIYW5kbGVDbGllbnRYIiwiX29yaWdpbmFsSGFuZGxlTGVmdCIsInBvc2l0aW9uIiwiaGFuZGxlTW92ZUV2ZW50IiwiX3NlbGVjdGVkQ29sb3IiLCJ0b1VwcGVyQ2FzZSIsIm5ld0hhbmRsZUxlZnQiLCJvZmZzZXQiLCJjb2xvciIsIiRwcmV2aWV3IiwiJGxhYmVsIiwib25VcGRhdGVDb2xvciIsIl9jb2xvciIsImxpZ2h0ZW4iLCJkYXJrZW4iLCJnZXRIZXhWYWx1ZSIsIl91bmlxQ29sb3IiLCJjb2xvclRvQW1vdW50IiwiX2RpZmZDb2xvciIsImNvbG9yMSIsImdldEhzbCIsImwiLCJib2R5IiwiaW5zdGFuY2VJZCIsImRhIiwieHZhciIsInJlc2l6ZXJMaXZlZCIsInJlbW92ZUF0dHIiLCJyZXBhaW50Iiwic2VsZWN0ZWRDb2xvciIsImJveCIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsImMiLCJyIiwiZyIsIl9jb2xvcjB2YWx1ZSIsIl9jb2xvcjF2YWx1ZSIsIl9jb2xvcjJ2YWx1ZSIsImhhbmRsZVRvcCIsImhhbmRsZUhlaWdodCIsImVsSWR4IiwiZWwiLCJpZHgiLCJfaW5kZXgiLCJzZXRTZWxlY3RlZENvbG9yIiwiQVg2VUlQYWxldHRlIiwicHJldmlldyIsImNlbGxXaWR0aCIsInRyYWNrSGVpZ2h0IiwiY29udHJvbHMiLCJ0cmltIiwic0NvbG9yIiwibWluRGlmZkNvbG9yIiwibWluRGlmZkNvbG9ySW5kZXgiLCJjaWR4IiwiYzFoc2wiLCJjMmhzbCIsImRpZmZDb2xvciIsImFicyIsImgiLCJwaWNrZXJUbXBsIiwiYmluZFBpY2tlclRhcmdldCIsInBpY2tlckV2ZW50Iiwib3BlbiIsInBpY2tlclR5cGUiLCJfaW5wdXQiLCJjb250ZW50TWFyZ2luIiwiJGNvbG9yUHJldmlldyIsImNsaWNrIiwiYWxpZ25QaWNrZXIiLCJhcHBlbmQiLCJhY3RpdmVQaWNrZXIiLCJfYWxpZ25QaWNrZXIiLCIkd2luZG93IiwicG9zaXRpb25NYXJnaW4iLCJkaW0iLCJwaWNrZXJEaW0iLCJwaWNrZXJEaXJlY3Rpb24iLCJvdXRlcldpZHRoIiwib3V0ZXJIZWlnaHQiLCJ3aW5XaWR0aCIsIm1heCIsIndpbkhlaWdodCIsInRvcCIsInBvc2l0aW9uQ1NTIiwiYWN0aXZlUGlja2VyQXJyb3ciLCJhY3RpdmVQaWNrZXJRdWV1ZUluZGV4Iiwib25Cb2R5Q2xpY2siLCJvbkJ0bkNsaWNrIiwic3JjRWxlbWVudCIsIm9uQm9keUtleXVwIiwia2V5Q29kZSIsImV2ZW50S2V5cyIsIkVTQyIsIkFYNlVJUGlja2VyIiwidGl0bGUiLCJwYWxldHRlIiwicGlja2VyQ29uZmlnIiwiX29wdGlvbiIsIm11bHRpcGxlSW5wdXRQcm9jZXNzb3IiLCJfaXRlbSIsIl9pbnB1dEluZGV4IiwiZGlmZkRheSIsInByZXZJbnB1dFZhbHVlIiwibmV4dElucHV0VmFsdWUiLCJkZGF5IiwiZGlzYWJsZUNoYW5nZVRyaWdnZXIiLCJkb05vdENsb3NlIiwidHJ5Q291bnQiLCJwaWNrZXJDb250ZW50IiwiY2FsZW5kYXJDb25maWciLCJkVmFsdWUiLCJkYXRlQ29udmVydCIsIl9kIiwiaXRlbUlkIiwicG8iLCJudW1BcnJheSIsIngiLCJyYW5kb20iLCJzcGVjaWFsQXJyYXkiLCJhY3QiLCJjdXJyZW50VGFyZ2V0Iiwia2V5QXJyYXkiLCJzaGlmdFZhbHVlIiwiZ2V0S2V5Qm9hcmQiLCJpc1NoaWZ0S2V5Iiwia2V5VmFsdWUiLCJrZXlMYWJlbCIsIiR0aGlzIiwidG9nZ2xlU2hpZnQiLCJwYWxldHRlQ29uZmlnIiwicGlja2VyUGFsZXR0ZSIsImRDb2xvciIsImNsZWFyVGltZW91dCIsInRocm90dGxlIiwicmVtb3ZlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUdBLElBQUlBLGl2REFBSjtBQXNEQSxJQUFJQyxLQUFLO0FBQ1BDLGFBQVcsbUJBQVVDLEtBQVYsRUFBaUI7QUFDMUIsUUFBSUMsUUFBUSxJQUFJQyxJQUFKLEVBQVo7QUFDQSxRQUFJQyxTQUFTLDJCQUFiOztBQUVBO0FBQ0FBLFdBQU9DLElBQVAsQ0FBWTtBQUNWQyxjQUFRLElBREU7QUFFVkMsY0FBUSxxQkFBRSxjQUFGLENBRkU7QUFHVkMsaUJBQVcsTUFIRDtBQUlWQyxlQUFTO0FBQ1BDLGNBQU0sTUFEQztBQUVQQyxnQkFBUTtBQUNOQyxnQkFBTSxNQURBO0FBRU5DLHNCQUFZO0FBRk4sU0FGRDtBQU1QQyxtQkFBVztBQUNUQyxtQkFBUztBQURBO0FBTkosT0FKQztBQWNWQyxzQkFBZ0IsMEJBQVk7QUFDMUI7QUFDRDtBQWhCUyxLQUFaOztBQW1CQTtBQUNBWixXQUFPQyxJQUFQLENBQVk7QUFDVkMsY0FBUSxJQURFO0FBRVZDLGNBQVEscUJBQUUseUJBQUYsQ0FGRTtBQUdWRSxlQUFTO0FBQ1BRLGVBQU8sR0FEQTtBQUVQQyxnQkFBUSxFQUZEO0FBR1BSLGNBQU0sTUFIQztBQUlQQyxnQkFBUTtBQUNOUSxtQkFBUztBQUNQQyxrQkFBTSxtREFEQztBQUVQQyxzQkFBVSxJQUZIO0FBR1BDLHVCQUFXLElBSEo7QUFJUEMsbUJBQU87QUFKQSxXQURIO0FBT05DLGdCQUFNO0FBQ0pILHNCQUFVLEtBRE47QUFFSkksb0JBQVEsQ0FBQyxJQUFELEVBQU8sSUFBUCxFQUFhLElBQWIsRUFBbUIsSUFBbkIsRUFBeUIsSUFBekIsRUFBK0IsSUFBL0IsRUFBcUMsSUFBckMsRUFBMkMsSUFBM0MsRUFBaUQsSUFBakQsRUFBdUQsSUFBdkQsRUFBNkQsSUFBN0QsRUFBbUUsSUFBbkUsQ0FGSjtBQUdKQyxxQkFBUztBQUhMO0FBUEEsU0FKRDtBQWlCUFosbUJBQVc7QUFDVEMsbUJBQVM7QUFEQTtBQWpCSixPQUhDO0FBd0JWWSxZQUFNO0FBQ0p6QixlQUFPO0FBQ0wwQixpQkFBTyxJQURGLEVBQ1FDLE9BQU8sd0NBRGYsRUFDeURDLFNBQVMsbUJBQVk7QUFDakYsZ0JBQUksS0FBS0MsSUFBTCxDQUFVQyxXQUFWLElBQXlCLENBQTdCLEVBQWdDO0FBQzlCLG1CQUFLQyxJQUFMLENBQVVDLGVBQVYsQ0FBMEIsS0FBS0gsSUFBTCxDQUFVSSxFQUFwQyxFQUF3QyxDQUF4QyxFQUEyQyxrQkFBS0MsSUFBTCxDQUFVLElBQUlqQyxJQUFKLEVBQVYsRUFBc0IsRUFBQyxVQUFVLFlBQVgsRUFBdEIsQ0FBM0M7QUFDRCxhQUZELE1BR0s7QUFDSCxtQkFBSzhCLElBQUwsQ0FBVUMsZUFBVixDQUEwQixLQUFLSCxJQUFMLENBQVVJLEVBQXBDLEVBQXdDLENBQXhDLEVBQTJDLGtCQUFLQyxJQUFMLENBQVUsSUFBSWpDLElBQUosRUFBVixFQUFzQixFQUFDLFVBQVUsWUFBWCxFQUF0QixDQUEzQztBQUNBLG1CQUFLOEIsSUFBTCxDQUFVQyxlQUFWLENBQTBCLEtBQUtILElBQUwsQ0FBVUksRUFBcEMsRUFBd0MsQ0FBeEMsRUFBMkMsa0JBQUtDLElBQUwsQ0FBVSxJQUFJakMsSUFBSixFQUFWLEVBQXNCLEVBQUMsVUFBVSxZQUFYLEVBQXRCLENBQTNDO0FBQ0EsbUJBQUs4QixJQUFMLENBQVVJLEtBQVY7QUFDRDtBQUNGO0FBVkksU0FESDtBQWFKQyxtQkFBVztBQUNUVixpQkFBTyxRQURFLEVBQ1FDLE9BQU8sd0NBRGYsRUFDeURDLFNBQVMsbUJBQVk7QUFDckYsZ0JBQUk1QixRQUFRLElBQUlDLElBQUosRUFBWjtBQUNBLGdCQUFJLEtBQUs0QixJQUFMLENBQVVDLFdBQVYsSUFBeUIsQ0FBN0IsRUFBZ0M7QUFDOUIsbUJBQUtDLElBQUwsQ0FBVUMsZUFBVixDQUEwQixLQUFLSCxJQUFMLENBQVVJLEVBQXBDLEVBQXdDLENBQXhDLEVBQTJDLGtCQUFLQyxJQUFMLENBQVVsQyxLQUFWLEVBQWlCLEVBQUMsVUFBVSxZQUFYLEVBQWpCLENBQTNDO0FBQ0QsYUFGRCxNQUdLO0FBQ0gsbUJBQUsrQixJQUFMLENBQVVDLGVBQVYsQ0FBMEIsS0FBS0gsSUFBTCxDQUFVSSxFQUFwQyxFQUF3QyxDQUF4QyxFQUEyQyxrQkFBS0MsSUFBTCxDQUFVbEMsS0FBVixFQUFpQixFQUFDLFVBQVUsWUFBWCxFQUFqQixDQUEzQztBQUNBLG1CQUFLK0IsSUFBTCxDQUFVQyxlQUFWLENBQTBCLEtBQUtILElBQUwsQ0FBVUksRUFBcEMsRUFBd0MsQ0FBeEMsRUFBMkMsa0JBQUtDLElBQUwsQ0FBVWxDLEtBQVYsRUFBaUIsRUFBQyxVQUFVLFNBQVgsRUFBakIsSUFBMEMsR0FBMUMsR0FBZ0Qsa0JBQUtxQyxXQUFMLENBQWlCckMsTUFBTXNDLFdBQU4sRUFBakIsRUFBc0N0QyxNQUFNdUMsUUFBTixFQUF0QyxDQUEzRjtBQUNBLG1CQUFLUixJQUFMLENBQVVJLEtBQVY7QUFDRDtBQUNGO0FBWFEsU0FiUDtBQTBCSkssWUFBSSxFQUFDZCxPQUFPLElBQVIsRUFBY0MsT0FBTyx5Q0FBckI7QUExQkEsT0F4Qkk7QUFvRFZiLHNCQUFnQix3QkFBVTJCLENBQVYsRUFBYTtBQUMzQixZQUFJLEtBQUtDLEtBQUwsSUFBYyxNQUFsQixFQUEwQjtBQUN4QixjQUFJLEtBQUtiLElBQUwsSUFBYSxLQUFLQSxJQUFMLENBQVVjLFFBQTNCLEVBQXFDO0FBQ25DLGlCQUFLZCxJQUFMLENBQVVlLGNBQVYsQ0FBeUIsQ0FBekIsRUFBNEJELFFBQTVCLENBQXFDRSxZQUFyQyxDQUFrRCxDQUFDLGtCQUFLWCxJQUFMLENBQVVsQyxLQUFWLEVBQWlCLEVBQUMsT0FBTyxFQUFDOEMsR0FBRyxDQUFKLEVBQVIsRUFBakIsQ0FBRCxDQUFsRDtBQUNBLGdCQUFJLEtBQUtqQixJQUFMLENBQVVlLGNBQVYsQ0FBeUIsQ0FBekIsQ0FBSixFQUFpQyxLQUFLZixJQUFMLENBQVVlLGNBQVYsQ0FBeUIsQ0FBekIsRUFBNEJELFFBQTVCLENBQXFDRSxZQUFyQyxDQUFrRCxDQUFDLGtCQUFLWCxJQUFMLENBQVVsQyxLQUFWLEVBQWlCLEVBQUMsT0FBTyxFQUFDOEMsR0FBRyxDQUFKLEVBQVIsRUFBakIsQ0FBRCxDQUFsRDtBQUNsQztBQUNGLFNBTEQsTUFNSyxJQUFJLEtBQUtKLEtBQUwsSUFBYyxhQUFsQixFQUFpQztBQUNwQyxjQUFJLEtBQUtiLElBQUwsQ0FBVXRCLE9BQVYsQ0FBa0JDLElBQWxCLElBQTBCLE1BQTFCLElBQW9DLEtBQUt1QyxNQUFMLENBQVlDLE1BQVosR0FBcUIsQ0FBN0QsRUFBZ0U7QUFDOUQsZ0JBQUksS0FBS0MsVUFBTCxJQUFtQixDQUF2QixFQUEwQixDQUV6QjtBQUNGO0FBQ0Y7QUFDRjtBQWxFUyxLQUFaOztBQXFFQTtBQUNBL0MsV0FBT0MsSUFBUCxDQUFZO0FBQ1ZFLGNBQVEscUJBQUUsYUFBRixDQURFO0FBRVZDLGlCQUFXLEtBRkQ7QUFHVkMsZUFBUztBQUNQUSxlQUFPLEdBREE7QUFFUEMsZ0JBQVEsRUFGRDtBQUdQUixjQUFNLFlBSEM7QUFJUEMsZ0JBQVE7QUFDTnlDLHdCQUFjLHdCQURSO0FBRU5DLG9CQUFVLFlBRko7QUFHTkMsb0JBQVUsNEJBSEo7QUFJTkMsMkJBQWlCO0FBSlgsU0FKRDtBQVVQekMsbUJBQVc7QUFDVEMsbUJBQVM7QUFEQTtBQVZKLE9BSEM7QUFpQlZZLFlBQU07QUFDSmUsWUFBSSxFQUFDZCxPQUFPLElBQVIsRUFBY0MsT0FBTyx5Q0FBckI7QUFEQSxPQWpCSTtBQW9CVmIsc0JBQWdCLDBCQUFZO0FBQzFCd0MsZ0JBQVFDLEdBQVIsQ0FBWSxJQUFaO0FBQ0EsWUFBSSxLQUFLQyxLQUFMLElBQWMsS0FBS0EsS0FBTCxDQUFXUixNQUFYLEdBQW9CLENBQXRDLEVBQXlDO0FBQ3ZDOUMsaUJBQU9pQyxLQUFQO0FBQ0Q7QUFDRjtBQXpCUyxLQUFaOztBQTRCQTtBQUNBakMsV0FBT0MsSUFBUCxDQUFZO0FBQ1ZFLGNBQVEscUJBQUUsYUFBRixDQURFO0FBRVZDLGlCQUFXLE1BRkQ7QUFHVkMsZUFBUztBQUNQUSxlQUFPLEdBREE7QUFFUEMsZ0JBQVEsRUFGRDtBQUdQUixjQUFNLFVBSEM7QUFJUEMsZ0JBQVE7QUFDTnlDLHdCQUFjLGNBRFI7QUFFTkMsb0JBQVUsY0FGSjtBQUdOQyxvQkFBVSxLQUhKO0FBSU5LLCtCQUFxQixjQUpmO0FBS05DLDJCQUFpQixFQUxYO0FBTU5MLDJCQUFpQjtBQU5YO0FBSkQsT0FIQztBQWdCVnZDLHNCQUFnQiwwQkFBWSxDQUUzQjtBQWxCUyxLQUFaOztBQXFCQTtBQUNBWixXQUFPQyxJQUFQLENBQVk7QUFDVkUsY0FBUSxxQkFBRSxXQUFGLENBREU7QUFFVkMsaUJBQVcsTUFGRDtBQUdWQyxlQUFTO0FBQ1BRLGVBQU8sR0FEQTtBQUVQQyxnQkFBUSxFQUZEO0FBR1BSLGNBQU0sUUFIQztBQUlQQyxnQkFBUTtBQUNOeUMsd0JBQWMsd0JBRFI7QUFFTkMsb0JBQVUsWUFGSjtBQUdOQyxvQkFBVSxLQUhKO0FBSU5LLCtCQUFxQix3QkFKZjtBQUtOQywyQkFBaUIsZ0RBTFg7QUFNTkwsMkJBQWlCO0FBQ2pCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVBNLFNBSkQ7QUFnQ1B6QyxtQkFBVztBQUNUQyxtQkFBUztBQURBO0FBaENKLE9BSEM7QUF1Q1ZDLHNCQUFnQiwwQkFBWTtBQUMxQndDLGdCQUFRQyxHQUFSLENBQVksSUFBWjtBQUNEO0FBekNTLEtBQVo7O0FBNENBO0FBQ0FyRCxXQUFPQyxJQUFQLENBQVk7QUFDVkUsY0FBUSxxQkFBRSxXQUFGLENBREU7QUFFVkMsaUJBQVcsS0FGRDtBQUdWcUQsb0JBQWMsR0FISjtBQUlWcEQsZUFBUyxpQkFBVXFELFFBQVYsRUFBb0I7QUFDM0IsWUFBSWhFLE9BQU8sS0FDUCxTQURPLEdBRVAsOEJBRk8sR0FHUCwrQ0FITyxHQUlQLFFBSko7QUFNQWdFLGlCQUFTaEUsSUFBVDtBQUNEO0FBWlMsS0FBWjs7QUFlQTtBQUNBTSxXQUFPQyxJQUFQLENBQVk7QUFDVkUsY0FBUSxxQkFBRSxVQUFGLENBREU7QUFFVkMsaUJBQVcsTUFGRDtBQUdWQyxlQUFTO0FBQ1BRLGVBQU8sR0FEQTtBQUVQQyxnQkFBUSxFQUZEO0FBR1BSLGNBQU0sT0FIQztBQUlQQyxnQkFBUTtBQUpELE9BSEM7QUFTVkssc0JBQWdCLDBCQUFZLENBRTNCO0FBWFMsS0FBWjtBQWFELEdBN05NO0FBOE5QK0MsaUJBQWUsdUJBQVU5RCxLQUFWLEVBQWlCO0FBQzlCQSxVQUFNK0QsR0FBTixDQUFVLE9BQVY7QUFDRDtBQWhPTSxDQUFUOztrQkFtT2U7QUFDYmxFLFFBQU1BLElBRE87QUFFYkMsTUFBSUE7QUFGUyxDOzs7Ozs7Ozs7Ozs7Ozs7O0FDalNmOzs7Ozs7QUFPQTs7Ozs7QUFLQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCQSxJQUFJa0UsTUFBTSxFQUFWOztBQUVDLFVBQVNDLGNBQVQsQ0FBd0JDLE1BQXhCLEVBQWdDQyxPQUFoQyxFQUF5Qzs7QUFFeENBLFVBQVFELE9BQU9FLFFBQVAsR0FBa0IsRUFBMUI7QUFFRCxDQUpBLEVBSUNKLEdBSkQsRUFJTSxTQUFTSyxlQUFULENBQXlCRCxRQUF6QixFQUFtQzs7QUFFeEMsTUFBSUUsaUJBQWlCQyxPQUFPQyxTQUFQLENBQWlCQyxRQUF0QztBQUNBLE1BQUlDLFVBQVVDLE1BQU1ELE9BQU4sSUFBaUIsU0FBU0UsZUFBVCxDQUF5QkMsTUFBekIsRUFBaUM7QUFDOUQsV0FBT1AsZUFBZVEsSUFBZixDQUFvQkQsTUFBcEIsTUFBZ0MsZ0JBQXZDO0FBQ0QsR0FGRDs7QUFJQSxXQUFTRSxVQUFULENBQW9CRixNQUFwQixFQUE0QjtBQUMxQixXQUFPLE9BQU9BLE1BQVAsS0FBa0IsVUFBekI7QUFDRDs7QUFFRDs7OztBQUlBLFdBQVNHLE9BQVQsQ0FBaUJDLEdBQWpCLEVBQXNCO0FBQ3BCLFdBQU9QLFFBQVFPLEdBQVIsSUFBZSxPQUFmLFVBQWdDQSxHQUFoQyx5Q0FBZ0NBLEdBQWhDLENBQVA7QUFDRDs7QUFFRCxXQUFTQyxZQUFULENBQXNCQyxNQUF0QixFQUE4QjtBQUM1QixXQUFPQSxPQUFPQyxPQUFQLENBQWUsNkJBQWYsRUFBOEMsTUFBOUMsQ0FBUDtBQUNEOztBQUVEOzs7O0FBSUEsV0FBU0MsV0FBVCxDQUFxQkosR0FBckIsRUFBMEJLLFFBQTFCLEVBQW9DO0FBQ2xDLFdBQU9MLE9BQU8sSUFBUCxJQUFlLFFBQU9BLEdBQVAseUNBQU9BLEdBQVAsT0FBZSxRQUE5QixJQUEyQ0ssWUFBWUwsR0FBOUQ7QUFDRDs7QUFFRDtBQUNBO0FBQ0EsTUFBSU0sYUFBYUMsT0FBT2hCLFNBQVAsQ0FBaUJpQixJQUFsQzs7QUFFQSxXQUFTQyxVQUFULENBQW9CQyxFQUFwQixFQUF3QlIsTUFBeEIsRUFBZ0M7QUFDOUIsV0FBT0ksV0FBV1QsSUFBWCxDQUFnQmEsRUFBaEIsRUFBb0JSLE1BQXBCLENBQVA7QUFDRDs7QUFFRCxNQUFJUyxhQUFhLElBQWpCOztBQUVBLFdBQVNDLFlBQVQsQ0FBc0JWLE1BQXRCLEVBQThCO0FBQzVCLFdBQU8sQ0FBQ08sV0FBV0UsVUFBWCxFQUF1QlQsTUFBdkIsQ0FBUjtBQUNEOztBQUVELE1BQUlXLFlBQVk7QUFDZCxTQUFLLE9BRFMsRUFDQSxLQUFLLE1BREwsRUFDYSxLQUFLLE1BRGxCLEVBQzBCLEtBQUssUUFEL0IsRUFDeUMsS0FBSyxPQUQ5QyxFQUN1RCxLQUFLO0FBRDVELEdBQWhCOztBQUlBLFdBQVNDLFVBQVQsQ0FBb0JaLE1BQXBCLEVBQTRCO0FBQzFCLFdBQU9hLE9BQU9iLE1BQVAsRUFBZUMsT0FBZixDQUF1QixZQUF2QixFQUFxQyxTQUFTYSxhQUFULENBQXVCQyxDQUF2QixFQUEwQjtBQUNwRSxhQUFPSixVQUFVSSxDQUFWLENBQVA7QUFDRCxLQUZNLENBQVA7QUFHRDs7QUFFRCxNQUFJQyxVQUFVLEtBQWQ7QUFDQSxNQUFJQyxVQUFVLEtBQWQ7QUFDQSxNQUFJQyxXQUFXLE1BQWY7QUFDQSxNQUFJQyxVQUFVLE9BQWQ7QUFDQSxNQUFJQyxRQUFRLG9CQUFaOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLFdBQVNDLGFBQVQsQ0FBdUJDLFFBQXZCLEVBQWlDQyxJQUFqQyxFQUF1QztBQUNyQyxRQUFJLENBQUNELFFBQUwsRUFDRSxPQUFPLEVBQVA7O0FBRUYsUUFBSUUsV0FBVyxFQUFmLENBSnFDLENBSWQ7QUFDdkIsUUFBSUMsU0FBUyxFQUFiLENBTHFDLENBS2Q7QUFDdkIsUUFBSUMsU0FBUyxFQUFiLENBTnFDLENBTWQ7QUFDdkIsUUFBSUMsU0FBUyxLQUFiLENBUHFDLENBT2Q7QUFDdkIsUUFBSUMsV0FBVyxLQUFmLENBUnFDLENBUWQ7O0FBRXZCO0FBQ0E7QUFDQSxhQUFTQyxVQUFULEdBQXNCO0FBQ3BCLFVBQUlGLFVBQVUsQ0FBQ0MsUUFBZixFQUF5QjtBQUN2QixlQUFPRixPQUFPNUQsTUFBZDtBQUNFLGlCQUFPMkQsT0FBT0MsT0FBT0ksR0FBUCxFQUFQLENBQVA7QUFERjtBQUVELE9BSEQsTUFJSztBQUNISixpQkFBUyxFQUFUO0FBQ0Q7O0FBRURDLGVBQVMsS0FBVDtBQUNBQyxpQkFBVyxLQUFYO0FBQ0Q7O0FBRUQsUUFBSUcsWUFBSixFQUFrQkMsWUFBbEIsRUFBZ0NDLGNBQWhDOztBQUVBLGFBQVNDLFdBQVQsQ0FBcUJDLGFBQXJCLEVBQW9DO0FBQ2xDLFVBQUksT0FBT0EsYUFBUCxLQUF5QixRQUE3QixFQUNFQSxnQkFBZ0JBLGNBQWNDLEtBQWQsQ0FBb0JuQixPQUFwQixFQUE2QixDQUE3QixDQUFoQjs7QUFFRixVQUFJLENBQUMxQixRQUFRNEMsYUFBUixDQUFELElBQTJCQSxjQUFjckUsTUFBZCxLQUF5QixDQUF4RCxFQUNFLE1BQU0sSUFBSXVFLEtBQUosQ0FBVSxtQkFBbUJGLGFBQTdCLENBQU47O0FBRUZKLHFCQUFlLElBQUkxQixNQUFKLENBQVdOLGFBQWFvQyxjQUFjLENBQWQsQ0FBYixJQUFpQyxNQUE1QyxDQUFmO0FBQ0FILHFCQUFlLElBQUkzQixNQUFKLENBQVcsU0FBU04sYUFBYW9DLGNBQWMsQ0FBZCxDQUFiLENBQXBCLENBQWY7QUFDQUYsdUJBQWlCLElBQUk1QixNQUFKLENBQVcsU0FBU04sYUFBYSxNQUFNb0MsY0FBYyxDQUFkLENBQW5CLENBQXBCLENBQWpCO0FBQ0Q7O0FBRURELGdCQUFZWCxRQUFRdEMsU0FBU3NDLElBQTdCOztBQUVBLFFBQUllLFVBQVUsSUFBSUMsT0FBSixDQUFZakIsUUFBWixDQUFkOztBQUVBLFFBQUlrQixLQUFKLEVBQVdsSCxJQUFYLEVBQWlCZ0QsS0FBakIsRUFBd0JtRSxHQUF4QixFQUE2QkMsS0FBN0IsRUFBb0NDLFdBQXBDO0FBQ0EsV0FBTyxDQUFDTCxRQUFRTSxHQUFSLEVBQVIsRUFBdUI7QUFDckJKLGNBQVFGLFFBQVFPLEdBQWhCOztBQUVBO0FBQ0F2RSxjQUFRZ0UsUUFBUVEsU0FBUixDQUFrQmYsWUFBbEIsQ0FBUjs7QUFFQSxVQUFJekQsS0FBSixFQUFXO0FBQ1QsYUFBSyxJQUFJeUUsSUFBSSxDQUFSLEVBQVdDLGNBQWMxRSxNQUFNUixNQUFwQyxFQUE0Q2lGLElBQUlDLFdBQWhELEVBQTZELEVBQUVELENBQS9ELEVBQWtFO0FBQ2hFTixnQkFBTW5FLE1BQU0yRSxNQUFOLENBQWFGLENBQWIsQ0FBTjs7QUFFQSxjQUFJckMsYUFBYStCLEdBQWIsQ0FBSixFQUF1QjtBQUNyQmYsbUJBQU93QixJQUFQLENBQVl6QixPQUFPM0QsTUFBbkI7QUFDRCxXQUZELE1BR0s7QUFDSDhELHVCQUFXLElBQVg7QUFDRDs7QUFFREgsaUJBQU95QixJQUFQLENBQVksQ0FBQyxNQUFELEVBQVNULEdBQVQsRUFBY0QsS0FBZCxFQUFxQkEsUUFBUSxDQUE3QixDQUFaO0FBQ0FBLG1CQUFTLENBQVQ7O0FBRUE7QUFDQSxjQUFJQyxRQUFRLElBQVosRUFDRVo7QUFDSDtBQUNGOztBQUVEO0FBQ0EsVUFBSSxDQUFDUyxRQUFRYSxJQUFSLENBQWFwQixZQUFiLENBQUwsRUFDRTs7QUFFRkosZUFBUyxJQUFUOztBQUVBO0FBQ0FyRyxhQUFPZ0gsUUFBUWEsSUFBUixDQUFhL0IsS0FBYixLQUF1QixNQUE5QjtBQUNBa0IsY0FBUWEsSUFBUixDQUFhbkMsT0FBYjs7QUFFQTtBQUNBLFVBQUkxRixTQUFTLEdBQWIsRUFBa0I7QUFDaEJnRCxnQkFBUWdFLFFBQVFRLFNBQVIsQ0FBa0I1QixRQUFsQixDQUFSO0FBQ0FvQixnQkFBUWEsSUFBUixDQUFhakMsUUFBYjtBQUNBb0IsZ0JBQVFRLFNBQVIsQ0FBa0JkLFlBQWxCO0FBQ0QsT0FKRCxNQUtLLElBQUkxRyxTQUFTLEdBQWIsRUFBa0I7QUFDckJnRCxnQkFBUWdFLFFBQVFRLFNBQVIsQ0FBa0JiLGNBQWxCLENBQVI7QUFDQUssZ0JBQVFhLElBQVIsQ0FBYWhDLE9BQWI7QUFDQW1CLGdCQUFRUSxTQUFSLENBQWtCZCxZQUFsQjtBQUNBMUcsZUFBTyxHQUFQO0FBQ0QsT0FMSSxNQU1BO0FBQ0hnRCxnQkFBUWdFLFFBQVFRLFNBQVIsQ0FBa0JkLFlBQWxCLENBQVI7QUFDRDs7QUFFRDtBQUNBLFVBQUksQ0FBQ00sUUFBUWEsSUFBUixDQUFhbkIsWUFBYixDQUFMLEVBQ0UsTUFBTSxJQUFJSyxLQUFKLENBQVUscUJBQXFCQyxRQUFRTyxHQUF2QyxDQUFOOztBQUVGSCxjQUFRLENBQUNwSCxJQUFELEVBQU9nRCxLQUFQLEVBQWNrRSxLQUFkLEVBQXFCRixRQUFRTyxHQUE3QixDQUFSO0FBQ0FwQixhQUFPeUIsSUFBUCxDQUFZUixLQUFaOztBQUVBLFVBQUlwSCxTQUFTLEdBQVQsSUFBZ0JBLFNBQVMsR0FBN0IsRUFBa0M7QUFDaENrRyxpQkFBUzBCLElBQVQsQ0FBY1IsS0FBZDtBQUNELE9BRkQsTUFHSyxJQUFJcEgsU0FBUyxHQUFiLEVBQWtCO0FBQ3JCO0FBQ0FxSCxzQkFBY25CLFNBQVNNLEdBQVQsRUFBZDs7QUFFQSxZQUFJLENBQUNhLFdBQUwsRUFDRSxNQUFNLElBQUlOLEtBQUosQ0FBVSx1QkFBdUIvRCxLQUF2QixHQUErQixPQUEvQixHQUF5Q2tFLEtBQW5ELENBQU47O0FBRUYsWUFBSUcsWUFBWSxDQUFaLE1BQW1CckUsS0FBdkIsRUFDRSxNQUFNLElBQUkrRCxLQUFKLENBQVUsdUJBQXVCTSxZQUFZLENBQVosQ0FBdkIsR0FBd0MsT0FBeEMsR0FBa0RILEtBQTVELENBQU47QUFDSCxPQVRJLE1BVUEsSUFBSWxILFNBQVMsTUFBVCxJQUFtQkEsU0FBUyxHQUE1QixJQUFtQ0EsU0FBUyxHQUFoRCxFQUFxRDtBQUN4RHNHLG1CQUFXLElBQVg7QUFDRCxPQUZJLE1BR0EsSUFBSXRHLFNBQVMsR0FBYixFQUFrQjtBQUNyQjtBQUNBNEcsb0JBQVk1RCxLQUFaO0FBQ0Q7QUFDRjs7QUFFRDtBQUNBcUUsa0JBQWNuQixTQUFTTSxHQUFULEVBQWQ7O0FBRUEsUUFBSWEsV0FBSixFQUNFLE1BQU0sSUFBSU4sS0FBSixDQUFVLHVCQUF1Qk0sWUFBWSxDQUFaLENBQXZCLEdBQXdDLE9BQXhDLEdBQWtETCxRQUFRTyxHQUFwRSxDQUFOOztBQUVGLFdBQU9PLFdBQVdDLGFBQWE1QixNQUFiLENBQVgsQ0FBUDtBQUNEOztBQUVEOzs7O0FBSUEsV0FBUzRCLFlBQVQsQ0FBc0I1QixNQUF0QixFQUE4QjtBQUM1QixRQUFJNkIsaUJBQWlCLEVBQXJCOztBQUVBLFFBQUlaLEtBQUosRUFBV2EsU0FBWDtBQUNBLFNBQUssSUFBSVIsSUFBSSxDQUFSLEVBQVdTLFlBQVkvQixPQUFPM0QsTUFBbkMsRUFBMkNpRixJQUFJUyxTQUEvQyxFQUEwRCxFQUFFVCxDQUE1RCxFQUErRDtBQUM3REwsY0FBUWpCLE9BQU9zQixDQUFQLENBQVI7O0FBRUEsVUFBSUwsS0FBSixFQUFXO0FBQ1QsWUFBSUEsTUFBTSxDQUFOLE1BQWEsTUFBYixJQUF1QmEsU0FBdkIsSUFBb0NBLFVBQVUsQ0FBVixNQUFpQixNQUF6RCxFQUFpRTtBQUMvREEsb0JBQVUsQ0FBVixLQUFnQmIsTUFBTSxDQUFOLENBQWhCO0FBQ0FhLG9CQUFVLENBQVYsSUFBZWIsTUFBTSxDQUFOLENBQWY7QUFDRCxTQUhELE1BSUs7QUFDSFkseUJBQWVKLElBQWYsQ0FBb0JSLEtBQXBCO0FBQ0FhLHNCQUFZYixLQUFaO0FBQ0Q7QUFDRjtBQUNGOztBQUVELFdBQU9ZLGNBQVA7QUFDRDs7QUFFRDs7Ozs7O0FBTUEsV0FBU0YsVUFBVCxDQUFvQjNCLE1BQXBCLEVBQTRCO0FBQzFCLFFBQUlnQyxlQUFlLEVBQW5CO0FBQ0EsUUFBSUMsWUFBWUQsWUFBaEI7QUFDQSxRQUFJakMsV0FBVyxFQUFmOztBQUVBLFFBQUlrQixLQUFKLEVBQVdpQixPQUFYO0FBQ0EsU0FBSyxJQUFJWixJQUFJLENBQVIsRUFBV1MsWUFBWS9CLE9BQU8zRCxNQUFuQyxFQUEyQ2lGLElBQUlTLFNBQS9DLEVBQTBELEVBQUVULENBQTVELEVBQStEO0FBQzdETCxjQUFRakIsT0FBT3NCLENBQVAsQ0FBUjs7QUFFQSxjQUFRTCxNQUFNLENBQU4sQ0FBUjtBQUNFLGFBQUssR0FBTDtBQUNBLGFBQUssR0FBTDtBQUNFZ0Isb0JBQVVSLElBQVYsQ0FBZVIsS0FBZjtBQUNBbEIsbUJBQVMwQixJQUFULENBQWNSLEtBQWQ7QUFDQWdCLHNCQUFZaEIsTUFBTSxDQUFOLElBQVcsRUFBdkI7QUFDQTtBQUNGLGFBQUssR0FBTDtBQUNFaUIsb0JBQVVuQyxTQUFTTSxHQUFULEVBQVY7QUFDQTZCLGtCQUFRLENBQVIsSUFBYWpCLE1BQU0sQ0FBTixDQUFiO0FBQ0FnQixzQkFBWWxDLFNBQVMxRCxNQUFULEdBQWtCLENBQWxCLEdBQXNCMEQsU0FBU0EsU0FBUzFELE1BQVQsR0FBa0IsQ0FBM0IsRUFBOEIsQ0FBOUIsQ0FBdEIsR0FBeUQyRixZQUFyRTtBQUNBO0FBQ0Y7QUFDRUMsb0JBQVVSLElBQVYsQ0FBZVIsS0FBZjtBQWJKO0FBZUQ7O0FBRUQsV0FBT2UsWUFBUDtBQUNEOztBQUVEOzs7O0FBSUEsV0FBU2xCLE9BQVQsQ0FBaUJ2QyxNQUFqQixFQUF5QjtBQUN2QixTQUFLQSxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFLNEQsSUFBTCxHQUFZNUQsTUFBWjtBQUNBLFNBQUs2QyxHQUFMLEdBQVcsQ0FBWDtBQUNEOztBQUVEOzs7QUFHQU4sVUFBUWxELFNBQVIsQ0FBa0J1RCxHQUFsQixHQUF3QixTQUFTQSxHQUFULEdBQWU7QUFDckMsV0FBTyxLQUFLZ0IsSUFBTCxLQUFjLEVBQXJCO0FBQ0QsR0FGRDs7QUFJQTs7OztBQUlBckIsVUFBUWxELFNBQVIsQ0FBa0I4RCxJQUFsQixHQUF5QixTQUFTQSxJQUFULENBQWMzQyxFQUFkLEVBQWtCO0FBQ3pDLFFBQUlxRCxRQUFRLEtBQUtELElBQUwsQ0FBVUMsS0FBVixDQUFnQnJELEVBQWhCLENBQVo7O0FBRUEsUUFBSSxDQUFDcUQsS0FBRCxJQUFVQSxNQUFNQyxLQUFOLEtBQWdCLENBQTlCLEVBQ0UsT0FBTyxFQUFQOztBQUVGLFFBQUk5RCxTQUFTNkQsTUFBTSxDQUFOLENBQWI7O0FBRUEsU0FBS0QsSUFBTCxHQUFZLEtBQUtBLElBQUwsQ0FBVUcsU0FBVixDQUFvQi9ELE9BQU9sQyxNQUEzQixDQUFaO0FBQ0EsU0FBSytFLEdBQUwsSUFBWTdDLE9BQU9sQyxNQUFuQjs7QUFFQSxXQUFPa0MsTUFBUDtBQUNELEdBWkQ7O0FBY0E7Ozs7QUFJQXVDLFVBQVFsRCxTQUFSLENBQWtCeUQsU0FBbEIsR0FBOEIsU0FBU0EsU0FBVCxDQUFtQnRDLEVBQW5CLEVBQXVCO0FBQ25ELFFBQUlzRCxRQUFRLEtBQUtGLElBQUwsQ0FBVUksTUFBVixDQUFpQnhELEVBQWpCLENBQVo7QUFBQSxRQUFrQ3FELEtBQWxDOztBQUVBLFlBQVFDLEtBQVI7QUFDRSxXQUFLLENBQUMsQ0FBTjtBQUNFRCxnQkFBUSxLQUFLRCxJQUFiO0FBQ0EsYUFBS0EsSUFBTCxHQUFZLEVBQVo7QUFDQTtBQUNGLFdBQUssQ0FBTDtBQUNFQyxnQkFBUSxFQUFSO0FBQ0E7QUFDRjtBQUNFQSxnQkFBUSxLQUFLRCxJQUFMLENBQVVHLFNBQVYsQ0FBb0IsQ0FBcEIsRUFBdUJELEtBQXZCLENBQVI7QUFDQSxhQUFLRixJQUFMLEdBQVksS0FBS0EsSUFBTCxDQUFVRyxTQUFWLENBQW9CRCxLQUFwQixDQUFaO0FBVko7O0FBYUEsU0FBS2pCLEdBQUwsSUFBWWdCLE1BQU0vRixNQUFsQjs7QUFFQSxXQUFPK0YsS0FBUDtBQUNELEdBbkJEOztBQXFCQTs7OztBQUlBLFdBQVNJLE9BQVQsQ0FBaUJDLElBQWpCLEVBQXVCQyxhQUF2QixFQUFzQztBQUNwQyxTQUFLRCxJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLRSxLQUFMLEdBQWE7QUFDWCxXQUFLLEtBQUtGLElBREM7QUFFWCxlQUFTLGdCQUFZO0FBQ25CLFlBQUlHLFVBQVUsRUFBZDtBQUNBLGFBQUssSUFBSUMsQ0FBVCxJQUFjLElBQWQsRUFBb0I7QUFDbEJELGtCQUFRbkIsSUFBUixDQUFhLEVBQUMsUUFBUW9CLENBQVQsRUFBWSxVQUFVLEtBQUtBLENBQUwsQ0FBdEIsRUFBYjtBQUNEO0FBQ0QsZUFBT0QsT0FBUDtBQUNEO0FBUlUsS0FBYjtBQVVBLFNBQUtFLE1BQUwsR0FBY0osYUFBZDtBQUNEOztBQUVEOzs7O0FBSUFGLFVBQVE1RSxTQUFSLENBQWtCNkQsSUFBbEIsR0FBeUIsU0FBU0EsSUFBVCxDQUFjZ0IsSUFBZCxFQUFvQjtBQUMzQyxXQUFPLElBQUlELE9BQUosQ0FBWUMsSUFBWixFQUFrQixJQUFsQixDQUFQO0FBQ0QsR0FGRDs7QUFJQTs7OztBQUlBRCxVQUFRNUUsU0FBUixDQUFrQm1GLE1BQWxCLEdBQTJCLFNBQVNBLE1BQVQsQ0FBZ0JDLElBQWhCLEVBQXNCO0FBQy9DLFFBQUlMLFFBQVEsS0FBS0EsS0FBakI7O0FBRUEsUUFBSTlGLEtBQUo7QUFDQSxRQUFJOEYsTUFBTU0sY0FBTixDQUFxQkQsSUFBckIsQ0FBSixFQUFnQztBQUM5Qm5HLGNBQVE4RixNQUFNSyxJQUFOLENBQVI7QUFDRCxLQUZELE1BR0s7QUFDSCxVQUFJRSxVQUFVLElBQWQ7QUFBQSxVQUFvQkMsS0FBcEI7QUFBQSxVQUEyQmQsS0FBM0I7QUFBQSxVQUFrQ2UsWUFBWSxLQUE5Qzs7QUFFQSxhQUFPRixPQUFQLEVBQWdCO0FBQ2QsWUFBSUYsS0FBS0ssT0FBTCxDQUFhLEdBQWIsSUFBb0IsQ0FBeEIsRUFBMkI7QUFDekJ4RyxrQkFBUXFHLFFBQVFULElBQWhCO0FBQ0FVLGtCQUFRSCxLQUFLckMsS0FBTCxDQUFXLEdBQVgsQ0FBUjtBQUNBMEIsa0JBQVEsQ0FBUjs7QUFFQTs7Ozs7Ozs7Ozs7QUFXQSxpQkFBT3hGLFNBQVMsSUFBVCxJQUFpQndGLFFBQVFjLE1BQU05RyxNQUF0QyxFQUE4QztBQUM1QyxnQkFBSWdHLFVBQVVjLE1BQU05RyxNQUFOLEdBQWUsQ0FBN0IsRUFDRStHLFlBQVkzRSxZQUFZNUIsS0FBWixFQUFtQnNHLE1BQU1kLEtBQU4sQ0FBbkIsQ0FBWjs7QUFFRnhGLG9CQUFRQSxNQUFNc0csTUFBTWQsT0FBTixDQUFOLENBQVI7QUFDRDtBQUNGLFNBdEJELE1BdUJLO0FBQ0h4RixrQkFBUXFHLFFBQVFULElBQVIsQ0FBYU8sSUFBYixDQUFSO0FBQ0FJLHNCQUFZM0UsWUFBWXlFLFFBQVFULElBQXBCLEVBQTBCTyxJQUExQixDQUFaO0FBQ0Q7O0FBRUQsWUFBSUksU0FBSixFQUNFOztBQUVGRixrQkFBVUEsUUFBUUosTUFBbEI7QUFDRDs7QUFFREgsWUFBTUssSUFBTixJQUFjbkcsS0FBZDtBQUNEOztBQUVELFFBQUlzQixXQUFXdEIsS0FBWCxDQUFKLEVBQ0VBLFFBQVFBLE1BQU1xQixJQUFOLENBQVcsS0FBS3VFLElBQWhCLENBQVI7O0FBRUYsV0FBTzVGLEtBQVA7QUFDRCxHQXBERDs7QUFzREE7Ozs7O0FBS0EsV0FBU3lHLE1BQVQsR0FBa0I7QUFDaEIsU0FBS1gsS0FBTCxHQUFhLEVBQWI7QUFDRDs7QUFFRDs7O0FBR0FXLFNBQU8xRixTQUFQLENBQWlCMkYsVUFBakIsR0FBOEIsU0FBU0EsVUFBVCxHQUFzQjtBQUNsRCxTQUFLWixLQUFMLEdBQWEsRUFBYjtBQUNELEdBRkQ7O0FBSUE7Ozs7QUFJQVcsU0FBTzFGLFNBQVAsQ0FBaUI0RixLQUFqQixHQUF5QixTQUFTQSxLQUFULENBQWUzRCxRQUFmLEVBQXlCQyxJQUF6QixFQUErQjtBQUN0RCxRQUFJNkMsUUFBUSxLQUFLQSxLQUFqQjtBQUNBLFFBQUkzQyxTQUFTMkMsTUFBTTlDLFFBQU4sQ0FBYjs7QUFFQSxRQUFJRyxVQUFVLElBQWQsRUFDRUEsU0FBUzJDLE1BQU05QyxRQUFOLElBQWtCRCxjQUFjQyxRQUFkLEVBQXdCQyxJQUF4QixDQUEzQjs7QUFFRixXQUFPRSxNQUFQO0FBQ0QsR0FSRDs7QUFVQTs7Ozs7Ozs7O0FBU0FzRCxTQUFPMUYsU0FBUCxDQUFpQjZGLE1BQWpCLEdBQTBCLFNBQVNBLE1BQVQsQ0FBZ0I1RCxRQUFoQixFQUEwQjRDLElBQTFCLEVBQWdDaUIsUUFBaEMsRUFBMEM7QUFDbEUsUUFBSTFELFNBQVMsS0FBS3dELEtBQUwsQ0FBVzNELFFBQVgsQ0FBYjtBQUNBLFFBQUlxRCxVQUFXVCxnQkFBZ0JELE9BQWpCLEdBQTRCQyxJQUE1QixHQUFtQyxJQUFJRCxPQUFKLENBQVlDLElBQVosQ0FBakQ7QUFDQSxXQUFPLEtBQUtrQixZQUFMLENBQWtCM0QsTUFBbEIsRUFBMEJrRCxPQUExQixFQUFtQ1EsUUFBbkMsRUFBNkM3RCxRQUE3QyxDQUFQO0FBQ0QsR0FKRDs7QUFNQTs7Ozs7Ozs7O0FBU0F5RCxTQUFPMUYsU0FBUCxDQUFpQitGLFlBQWpCLEdBQWdDLFNBQVNBLFlBQVQsQ0FBc0IzRCxNQUF0QixFQUE4QmtELE9BQTlCLEVBQXVDUSxRQUF2QyxFQUFpREUsZ0JBQWpELEVBQW1FO0FBQ2pHLFFBQUlDLFNBQVMsRUFBYjtBQUNBLFFBQUk1QyxLQUFKLEVBQVc2QyxNQUFYLEVBQW1CakgsS0FBbkI7QUFDQSxTQUFLLElBQUl5RSxJQUFJLENBQVIsRUFBV1MsWUFBWS9CLE9BQU8zRCxNQUFuQyxFQUEyQ2lGLElBQUlTLFNBQS9DLEVBQTBELEVBQUVULENBQTVELEVBQStEO0FBQzdEekUsY0FBUWtILFNBQVI7QUFDQTlDLGNBQVFqQixPQUFPc0IsQ0FBUCxDQUFSO0FBQ0F3QyxlQUFTN0MsTUFBTSxDQUFOLENBQVQ7O0FBRUEsVUFBSTZDLFdBQVcsR0FBZixFQUFvQmpILFFBQVEsS0FBS21ILGFBQUwsQ0FBbUIvQyxLQUFuQixFQUEwQmlDLE9BQTFCLEVBQW1DUSxRQUFuQyxFQUE2Q0UsZ0JBQTdDLENBQVIsQ0FBcEIsS0FDSyxJQUFJRSxXQUFXLEdBQWYsRUFBb0JqSCxRQUFRLEtBQUtvSCxjQUFMLENBQW9CaEQsS0FBcEIsRUFBMkJpQyxPQUEzQixFQUFvQ1EsUUFBcEMsRUFBOENFLGdCQUE5QyxDQUFSLENBQXBCLEtBQ0EsSUFBSUUsV0FBVyxHQUFmLEVBQW9CakgsUUFBUSxLQUFLcUgsYUFBTCxDQUFtQmpELEtBQW5CLEVBQTBCaUMsT0FBMUIsRUFBbUNRLFFBQW5DLEVBQTZDRSxnQkFBN0MsQ0FBUixDQUFwQixLQUNBLElBQUlFLFdBQVcsR0FBZixFQUFvQmpILFFBQVEsS0FBS3NILGNBQUwsQ0FBb0JsRCxLQUFwQixFQUEyQmlDLE9BQTNCLENBQVIsQ0FBcEIsS0FDQSxJQUFJWSxXQUFXLE1BQWYsRUFBdUJqSCxRQUFRLEtBQUt1SCxZQUFMLENBQWtCbkQsS0FBbEIsRUFBeUJpQyxPQUF6QixDQUFSLENBQXZCLEtBQ0EsSUFBSVksV0FBVyxNQUFmLEVBQXVCakgsUUFBUSxLQUFLd0gsUUFBTCxDQUFjcEQsS0FBZCxDQUFSOztBQUU1QixVQUFJcEUsVUFBVWtILFNBQWQsRUFDRUYsVUFBVWhILEtBQVY7QUFDSDs7QUFFRCxXQUFPZ0gsTUFBUDtBQUNELEdBcEJEOztBQXNCQVAsU0FBTzFGLFNBQVAsQ0FBaUJvRyxhQUFqQixHQUFpQyxTQUFTQSxhQUFULENBQXVCL0MsS0FBdkIsRUFBOEJpQyxPQUE5QixFQUF1Q1EsUUFBdkMsRUFBaURFLGdCQUFqRCxFQUFtRTtBQUNsRyxRQUFJeEksT0FBTyxJQUFYO0FBQ0EsUUFBSXlJLFNBQVMsRUFBYjs7QUFFQSxRQUFJaEgsUUFBUXFHLFFBQVFILE1BQVIsQ0FBZTlCLE1BQU0sQ0FBTixDQUFmLENBQVo7O0FBRUE7QUFDQTtBQUNBLGFBQVNxRCxTQUFULENBQW1CekUsUUFBbkIsRUFBNkI7QUFDM0IsYUFBT3pFLEtBQUtxSSxNQUFMLENBQVk1RCxRQUFaLEVBQXNCcUQsT0FBdEIsRUFBK0JRLFFBQS9CLENBQVA7QUFDRDs7QUFFRCxRQUFJLENBQUM3RyxLQUFMLEVBQVk7O0FBRVosUUFBSWlCLFFBQVFqQixLQUFSLENBQUosRUFBb0I7QUFDbEIsV0FBSyxJQUFJMEgsSUFBSSxDQUFSLEVBQVdoRCxjQUFjMUUsTUFBTVIsTUFBcEMsRUFBNENrSSxJQUFJaEQsV0FBaEQsRUFBNkQsRUFBRWdELENBQS9ELEVBQWtFO0FBQ2hFLFlBQUkxSCxNQUFNMEgsQ0FBTixDQUFKLEVBQWM7QUFDWixjQUFJLFFBQU8xSCxNQUFNMEgsQ0FBTixDQUFQLE1BQW9CLFFBQXhCLEVBQWtDO0FBQ2hDMUgsa0JBQU0wSCxDQUFOLEVBQVMsSUFBVCxJQUFpQkEsQ0FBakI7QUFDQTFILGtCQUFNMEgsQ0FBTixFQUFTLFFBQVQsSUFBc0JBLE1BQU0sQ0FBNUI7QUFDRDs7QUFFRFYsb0JBQVUsS0FBS0YsWUFBTCxDQUFrQjFDLE1BQU0sQ0FBTixDQUFsQixFQUE0QmlDLFFBQVF6QixJQUFSLENBQWE1RSxNQUFNMEgsQ0FBTixDQUFiLENBQTVCLEVBQW9EYixRQUFwRCxFQUE4REUsZ0JBQTlELENBQVY7QUFDRDtBQUNGO0FBQ0YsS0FYRCxNQVlLLElBQUksUUFBTy9HLEtBQVAseUNBQU9BLEtBQVAsT0FBaUIsUUFBakIsSUFBNkIsT0FBT0EsS0FBUCxLQUFpQixRQUE5QyxJQUEwRCxPQUFPQSxLQUFQLEtBQWlCLFFBQS9FLEVBQXlGO0FBQzVGZ0gsZ0JBQVUsS0FBS0YsWUFBTCxDQUFrQjFDLE1BQU0sQ0FBTixDQUFsQixFQUE0QmlDLFFBQVF6QixJQUFSLENBQWE1RSxLQUFiLENBQTVCLEVBQWlENkcsUUFBakQsRUFBMkRFLGdCQUEzRCxDQUFWO0FBQ0QsS0FGSSxNQUdBLElBQUl6RixXQUFXdEIsS0FBWCxDQUFKLEVBQXVCO0FBQzFCLFVBQUksT0FBTytHLGdCQUFQLEtBQTRCLFFBQWhDLEVBQ0UsTUFBTSxJQUFJaEQsS0FBSixDQUFVLGdFQUFWLENBQU47O0FBRUY7QUFDQS9ELGNBQVFBLE1BQU1xQixJQUFOLENBQVdnRixRQUFRVCxJQUFuQixFQUF5Qm1CLGlCQUFpQlksS0FBakIsQ0FBdUJ2RCxNQUFNLENBQU4sQ0FBdkIsRUFBaUNBLE1BQU0sQ0FBTixDQUFqQyxDQUF6QixFQUFxRXFELFNBQXJFLENBQVI7O0FBRUEsVUFBSXpILFNBQVMsSUFBYixFQUNFZ0gsVUFBVWhILEtBQVY7QUFDSCxLQVRJLE1BVUE7QUFDSGdILGdCQUFVLEtBQUtGLFlBQUwsQ0FBa0IxQyxNQUFNLENBQU4sQ0FBbEIsRUFBNEJpQyxPQUE1QixFQUFxQ1EsUUFBckMsRUFBK0NFLGdCQUEvQyxDQUFWO0FBQ0Q7QUFDRCxXQUFPQyxNQUFQO0FBQ0QsR0EzQ0Q7O0FBNkNBUCxTQUFPMUYsU0FBUCxDQUFpQnFHLGNBQWpCLEdBQWtDLFNBQVNBLGNBQVQsQ0FBd0JoRCxLQUF4QixFQUErQmlDLE9BQS9CLEVBQXdDUSxRQUF4QyxFQUFrREUsZ0JBQWxELEVBQW9FO0FBQ3BHLFFBQUkvRyxRQUFRcUcsUUFBUUgsTUFBUixDQUFlOUIsTUFBTSxDQUFOLENBQWYsQ0FBWjs7QUFFQTtBQUNBO0FBQ0EsUUFBSSxDQUFDcEUsS0FBRCxJQUFXaUIsUUFBUWpCLEtBQVIsS0FBa0JBLE1BQU1SLE1BQU4sS0FBaUIsQ0FBbEQsRUFDRSxPQUFPLEtBQUtzSCxZQUFMLENBQWtCMUMsTUFBTSxDQUFOLENBQWxCLEVBQTRCaUMsT0FBNUIsRUFBcUNRLFFBQXJDLEVBQStDRSxnQkFBL0MsQ0FBUDtBQUNILEdBUEQ7O0FBU0FOLFNBQU8xRixTQUFQLENBQWlCc0csYUFBakIsR0FBaUMsU0FBU0EsYUFBVCxDQUF1QmpELEtBQXZCLEVBQThCaUMsT0FBOUIsRUFBdUNRLFFBQXZDLEVBQWlEO0FBQ2hGLFFBQUksQ0FBQ0EsUUFBTCxFQUFlOztBQUVmLFFBQUk3RyxRQUFRc0IsV0FBV3VGLFFBQVgsSUFBdUJBLFNBQVN6QyxNQUFNLENBQU4sQ0FBVCxDQUF2QixHQUE0Q3lDLFNBQVN6QyxNQUFNLENBQU4sQ0FBVCxDQUF4RDtBQUNBLFFBQUlwRSxTQUFTLElBQWIsRUFDRSxPQUFPLEtBQUs4RyxZQUFMLENBQWtCLEtBQUtILEtBQUwsQ0FBVzNHLEtBQVgsQ0FBbEIsRUFBcUNxRyxPQUFyQyxFQUE4Q1EsUUFBOUMsRUFBd0Q3RyxLQUF4RCxDQUFQO0FBQ0gsR0FORDs7QUFRQXlHLFNBQU8xRixTQUFQLENBQWlCdUcsY0FBakIsR0FBa0MsU0FBU0EsY0FBVCxDQUF3QmxELEtBQXhCLEVBQStCaUMsT0FBL0IsRUFBd0M7QUFDeEUsUUFBSXJHLFFBQVFxRyxRQUFRSCxNQUFSLENBQWU5QixNQUFNLENBQU4sQ0FBZixDQUFaO0FBQ0EsUUFBSXBFLFNBQVMsSUFBYixFQUNFLE9BQU9BLEtBQVA7QUFDSCxHQUpEOztBQU1BeUcsU0FBTzFGLFNBQVAsQ0FBaUJ3RyxZQUFqQixHQUFnQyxTQUFTQSxZQUFULENBQXNCbkQsS0FBdEIsRUFBNkJpQyxPQUE3QixFQUFzQztBQUNwRSxRQUFJckcsUUFBUXFHLFFBQVFILE1BQVIsQ0FBZTlCLE1BQU0sQ0FBTixDQUFmLENBQVo7QUFDQSxRQUFJcEUsU0FBUyxJQUFiLEVBQ0UsT0FBT1csU0FBU2lILE1BQVQsQ0FBZ0I1SCxLQUFoQixDQUFQO0FBQ0gsR0FKRDs7QUFNQXlHLFNBQU8xRixTQUFQLENBQWlCeUcsUUFBakIsR0FBNEIsU0FBU0EsUUFBVCxDQUFrQnBELEtBQWxCLEVBQXlCO0FBQ25ELFdBQU9BLE1BQU0sQ0FBTixDQUFQO0FBQ0QsR0FGRDs7QUFJQXpELFdBQVN3RixJQUFULEdBQWdCLGFBQWhCO0FBQ0F4RixXQUFTa0gsT0FBVCxHQUFtQixPQUFuQjtBQUNBbEgsV0FBU3NDLElBQVQsR0FBZ0IsQ0FBQyxJQUFELEVBQU8sSUFBUCxDQUFoQjs7QUFFQTtBQUNBLE1BQUk2RSxnQkFBZ0IsSUFBSXJCLE1BQUosRUFBcEI7O0FBRUE7OztBQUdBOUYsV0FBUytGLFVBQVQsR0FBc0IsU0FBU0EsVUFBVCxHQUFzQjtBQUMxQyxXQUFPb0IsY0FBY3BCLFVBQWQsRUFBUDtBQUNELEdBRkQ7O0FBSUE7Ozs7O0FBS0EvRixXQUFTZ0csS0FBVCxHQUFpQixTQUFTQSxLQUFULENBQWUzRCxRQUFmLEVBQXlCQyxJQUF6QixFQUErQjtBQUM5QyxXQUFPNkUsY0FBY25CLEtBQWQsQ0FBb0IzRCxRQUFwQixFQUE4QkMsSUFBOUIsQ0FBUDtBQUNELEdBRkQ7O0FBSUE7Ozs7QUFJQXRDLFdBQVNpRyxNQUFULEdBQWtCLFNBQVNBLE1BQVQsQ0FBZ0I1RCxRQUFoQixFQUEwQjRDLElBQTFCLEVBQWdDaUIsUUFBaEMsRUFBMEM7QUFDMUQsUUFBSSxPQUFPN0QsUUFBUCxLQUFvQixRQUF4QixFQUFrQztBQUNoQyxZQUFNLElBQUkrRSxTQUFKLENBQWMscURBQXFELE9BQXJELEdBQStEeEcsUUFBUXlCLFFBQVIsQ0FBL0QsR0FBbUYsMkJBQW5GLEdBQWlILHdEQUEvSCxDQUFOO0FBQ0Q7O0FBRUQsV0FBTzhFLGNBQWNsQixNQUFkLENBQXFCNUQsUUFBckIsRUFBK0I0QyxJQUEvQixFQUFxQ2lCLFFBQXJDLENBQVA7QUFDRCxHQU5EOztBQVFBO0FBQ0EscUJBcm1Cd0MsQ0FxbUJwQjtBQUNwQmxHLFdBQVNxSCxPQUFULEdBQW1CLFNBQVNBLE9BQVQsQ0FBaUJoRixRQUFqQixFQUEyQjRDLElBQTNCLEVBQWlDaUIsUUFBakMsRUFBMkNvQixJQUEzQyxFQUFpRDtBQUNsRTs7QUFFQSxRQUFJQyxTQUFTdkgsU0FBU2lHLE1BQVQsQ0FBZ0I1RCxRQUFoQixFQUEwQjRDLElBQTFCLEVBQWdDaUIsUUFBaEMsQ0FBYjs7QUFFQSxRQUFJdkYsV0FBVzJHLElBQVgsQ0FBSixFQUFzQjtBQUNwQkEsV0FBS0MsTUFBTDtBQUNELEtBRkQsTUFHSztBQUNILGFBQU9BLE1BQVA7QUFDRDtBQUNGLEdBWEQ7O0FBYUE7QUFDQTtBQUNBdkgsV0FBU2lILE1BQVQsR0FBa0J0RixVQUFsQjs7QUFFQTtBQUNBM0IsV0FBU3NELE9BQVQsR0FBbUJBLE9BQW5CO0FBQ0F0RCxXQUFTZ0YsT0FBVCxHQUFtQkEsT0FBbkI7QUFDQWhGLFdBQVM4RixNQUFULEdBQWtCQSxNQUFsQjtBQUVELENBaG9CQSxDQUFEOztrQkFrb0JlbEcsSUFBSUksUTs7Ozs7OztBQ3hxQm5COztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMsQzs7Ozs7OztBQ3pCQTtBQUNBOzs7QUFHQTtBQUNBLHFFQUFzRSxVQUFVLG1CQUFtQixFQUFFLFFBQVEsbUJBQW1CLEVBQUUsRUFBRSw2Q0FBNkMsVUFBVSxtQkFBbUIsRUFBRSxRQUFRLG1CQUFtQixFQUFFLEVBQUUsd0NBQXdDLFVBQVUsbUJBQW1CLEVBQUUsUUFBUSxtQkFBbUIsRUFBRSxFQUFFLCtDQUErQyxVQUFVLG1CQUFtQixFQUFFLFFBQVEsbUJBQW1CLEVBQUUsRUFBRSw0Q0FBNEMsVUFBVSxtQkFBbUIsRUFBRSxRQUFRLG1CQUFtQixFQUFFLEVBQUUsdUNBQXVDLFVBQVUsbUJBQW1CLEVBQUUsUUFBUSxtQkFBbUIsRUFBRSxFQUFFLDJCQUEyQiwyQkFBMkIsdUJBQXVCLEVBQUUsNkJBQTZCLDZCQUE2QixFQUFFLDZDQUE2Qyx5QkFBeUIsOEJBQThCLGdDQUFnQyxpRUFBaUUsd0RBQXdELDZCQUE2Qix5QkFBeUIsc0JBQXNCLHlCQUF5QixpQkFBaUIsa0JBQWtCLEVBQUUseUhBQXlILHVCQUF1QiwyQkFBMkIseUJBQXlCLDJCQUEyQix3QkFBd0Isd0JBQXdCLDhCQUE4QixtQkFBbUIsRUFBRSw0UEFBNFAsK0JBQStCLEVBQUUsK0RBQStELGtCQUFrQixpQkFBaUIsRUFBRSxnRUFBZ0UsbUJBQW1CLGlCQUFpQixFQUFFLDZEQUE2RCwyQkFBMkIsRUFBRSx1RkFBdUYsMkJBQTJCLDBCQUEwQixxQ0FBcUMsRUFBRSxpREFBaUQsb0JBQW9CLEVBQUUsdURBQXVELHVCQUF1QixFQUFFLGlEQUFpRCx5RkFBeUYsc0ZBQXNGLGlGQUFpRixtQkFBbUIsRUFBRSxrREFBa0QsMEZBQTBGLHVGQUF1RixrRkFBa0YsbUJBQW1CLEVBQUUsZ0RBQWdELDZCQUE2QiwwQkFBMEIsZ0NBQWdDLHdCQUF3QixxQkFBcUIsRUFBRSx3REFBd0QsdUJBQXVCLEVBQUUsa0hBQWtILGlDQUFpQyxpQ0FBaUMsMkJBQTJCLDBCQUEwQiw2QkFBNkIsMEJBQTBCLDJCQUEyQiwyQkFBMkIsMkJBQTJCLG9DQUFvQyw4RUFBOEUscUVBQXFFLHlCQUF5QixFQUFFLGtKQUFrSiwyQkFBMkIsRUFBRSxrSkFBa0osMkJBQTJCLEVBQUUsd0RBQXdELHVCQUF1QixFQUFFLGtIQUFrSCxpQ0FBaUMsaUNBQWlDLDJCQUEyQiwwQkFBMEIsNkJBQTZCLDBCQUEwQiwyQkFBMkIsb0NBQW9DLDhFQUE4RSxxRUFBcUUsMkJBQTJCLDBDQUEwQyx5Q0FBeUMsMERBQTBELGlEQUFpRCxpQkFBaUIsYUFBYSw4QkFBOEIseUNBQXlDLDBEQUEwRCxpREFBaUQsaUJBQWlCLGFBQWEsZ0JBQWdCLDBKQUEwSiwrQkFBK0IsMkJBQTJCLHdCQUF3Qix5QkFBeUIsbUNBQW1DLCtCQUErQiw2QkFBNkIsaUNBQWlDLHNDQUFzQyxnRkFBZ0YsdUVBQXVFLDJCQUEyQiw0QkFBNEIsRUFBRSxrTEFBa0wsaUNBQWlDLDBCQUEwQixpQ0FBaUMsa0NBQWtDLGdDQUFnQyxFQUFFLDhNQUE4TSwwQkFBMEIseUJBQXlCLEVBQUUsOE1BQThNLDBCQUEwQiw0QkFBNEIsRUFBRSxzS0FBc0ssd0NBQXdDLGtGQUFrRix5RUFBeUUsNkJBQTZCLEVBQUUsOExBQThMLCtCQUErQixFQUFFLHNMQUFzTCwrQkFBK0IsRUFBRSwwTEFBMEwsK0JBQStCLEVBQUUsd0tBQXdLLHdDQUF3QyxrRkFBa0YseUVBQXlFLDBCQUEwQixFQUFFLGdNQUFnTSw0QkFBNEIsRUFBRSxzTEFBc0wsMENBQTBDLG9GQUFvRiwyRUFBMkUsdUNBQXVDLEVBQUUsOE1BQThNLDhCQUE4QixFQUFFLDBLQUEwSyx3Q0FBd0Msa0ZBQWtGLHlFQUF5RSxxQ0FBcUMsRUFBRSxrTUFBa00sNEJBQTRCLEVBQUUsc0xBQXNMLHdDQUF3QyxrRkFBa0YseUVBQXlFLHFDQUFxQyxFQUFFLDhNQUE4TSw0QkFBNEIsRUFBRSw0S0FBNEssd0NBQXdDLGtGQUFrRix5RUFBeUUsNkJBQTZCLEVBQUUsNEtBQTRLLDZCQUE2QixFQUFFLDhKQUE4SiwyQkFBMkIsd0JBQXdCLHlCQUF5QixtQ0FBbUMsK0JBQStCLDZCQUE2QixpQ0FBaUMsc0NBQXNDLGdGQUFnRix1RUFBdUUsMkJBQTJCLDRCQUE0QixFQUFFLDBLQUEwSyx3Q0FBd0Msa0ZBQWtGLHlFQUF5RSw2QkFBNkIsRUFBRSw0S0FBNEssd0NBQXdDLGtGQUFrRix5RUFBeUUsMEJBQTBCLEVBQUUsNEtBQTRLLHdDQUF3QyxrRkFBa0YseUVBQXlFLDBCQUEwQixFQUFFLDhMQUE4TCx3Q0FBd0Msa0ZBQWtGLHlFQUF5RSxxQ0FBcUMsRUFBRSxzTkFBc04sNEJBQTRCLEVBQUUsc05BQXNOLDRCQUE0QixFQUFFLGdMQUFnTCx3Q0FBd0Msa0ZBQWtGLHlFQUF5RSw2QkFBNkIsRUFBRSxnTEFBZ0wsNkJBQTZCLEVBQUUsNEpBQTRKLDJCQUEyQix3QkFBd0IseUJBQXlCLG1DQUFtQywrQkFBK0IsNkJBQTZCLGlDQUFpQyxzQ0FBc0MsZ0ZBQWdGLHVFQUF1RSwyQkFBMkIsNEJBQTRCLEVBQUUsd0tBQXdLLHdDQUF3QyxrRkFBa0YseUVBQXlFLDZCQUE2QixFQUFFLDBLQUEwSyx3Q0FBd0Msa0ZBQWtGLHlFQUF5RSwwQkFBMEIsRUFBRSwwS0FBMEssd0NBQXdDLGtGQUFrRix5RUFBeUUsMEJBQTBCLEVBQUUsMExBQTBMLHdDQUF3QyxrRkFBa0YseUVBQXlFLHFDQUFxQyxFQUFFLGtOQUFrTiw0QkFBNEIsRUFBRSxrTkFBa04sNEJBQTRCLEVBQUUsOEtBQThLLHdDQUF3QyxrRkFBa0YseUVBQXlFLDZCQUE2QixFQUFFLDhLQUE4Syw2QkFBNkIsRUFBRTs7QUFFbnRpQjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFDQTs7QUFFQSxJQUFJdkQsWUFBWSxFQUFoQjs7QUFFQSxJQUFNK0ssb0JBQW9CLFNBQXBCQSxpQkFBb0IsQ0FBVUMsS0FBVixFQUFpQjdELEdBQWpCLEVBQXNCO0FBQzlDLE1BQUksT0FBT0EsR0FBUCxJQUFjLFdBQWxCLEVBQStCO0FBQzdCQSxVQUFNNkQsTUFBTXBJLEtBQU4sQ0FBWVIsTUFBbEI7QUFDRDtBQUNELE1BQUk0SSxNQUFNRCxpQkFBVixFQUE2QjtBQUMzQkMsVUFBTUMsS0FBTjtBQUNBRCxVQUFNRCxpQkFBTixDQUF3QjVELEdBQXhCLEVBQTZCQSxHQUE3QjtBQUNELEdBSEQsTUFJSyxJQUFJNkQsTUFBTUUsZUFBVixFQUEyQjtBQUM5QixRQUFJQyxRQUFRSCxNQUFNRSxlQUFOLEVBQVo7QUFDQUMsVUFBTUMsUUFBTixDQUFlLElBQWY7QUFDQUQsVUFBTUUsT0FBTixDQUFjLFdBQWQsRUFBMkJsRSxHQUEzQjtBQUNBZ0UsVUFBTUcsU0FBTixDQUFnQixXQUFoQixFQUE2Qm5FLEdBQTdCO0FBQ0FnRSxVQUFNSSxNQUFOO0FBQ0QsR0FOSSxNQU9BLElBQUlQLE1BQU1RLGNBQVYsRUFBMEI7QUFDN0JSLFVBQU1DLEtBQU47QUFDQUQsVUFBTVEsY0FBTixHQUF1QnJFLEdBQXZCO0FBQ0E2RCxVQUFNUyxZQUFOLEdBQXFCdEUsR0FBckI7QUFDRDtBQUNGLENBcEJEO0FBcUJBLElBQU11RSxpQkFBaUI7QUFDckIsV0FBUyxlQUFVQyxJQUFWLEVBQWdCQyxNQUFoQixFQUF3QkMsQ0FBeEIsRUFBMkI7QUFDbEMsUUFBSSxDQUFDRixLQUFLRyxNQUFMLENBQVlDLElBQVosQ0FBaUIsaUJBQWpCLENBQUwsRUFBMENKLEtBQUtHLE1BQUwsQ0FBWUMsSUFBWixDQUFpQixpQkFBakIsRUFBb0NKLEtBQUtHLE1BQUwsQ0FBWUUsR0FBWixFQUFwQztBQUMzQyxHQUhvQjtBQUlyQjtBQUNBLGFBQVcsaUJBQVVMLElBQVYsRUFBZ0JDLE1BQWhCLEVBQXdCQyxDQUF4QixFQUEyQjtBQUNwQyxRQUFJSSxTQUFTLEtBQWI7QUFDQSxRQUFJLENBQUNOLEtBQUtPLGlCQUFWLEVBQTZCLENBRTVCLENBRkQsTUFHSyxJQUFJTCxFQUFFTSxLQUFGLElBQVdSLEtBQUtPLGlCQUFMLENBQXVCTCxFQUFFTSxLQUF6QixDQUFmLEVBQWdELENBRXBELENBRkksTUFHQSxJQUFJLENBQUNOLEVBQUVPLE9BQUgsSUFBYyxDQUFDUCxFQUFFUSxPQUFqQixJQUE0QixDQUFDUixFQUFFUyxRQUFuQyxFQUE2QztBQUNoRDtBQUNBTCxlQUFTLElBQVQ7QUFDRDtBQUNELFFBQUlBLE1BQUosRUFBWSxrQkFBRU0sU0FBRixDQUFZVixDQUFaO0FBQ2IsR0FsQm9CO0FBbUJyQjtBQUNBLFdBQVMsZUFBVUYsSUFBVixFQUFnQkMsTUFBaEIsRUFBd0JDLENBQXhCLEVBQTJCO0FBQ2xDLFFBQUlXLE9BQU9iLEtBQUtHLE1BQUwsQ0FBWVcsR0FBWixDQUFnQixDQUFoQixDQUFYO0FBQUEsUUFDRUMsMEJBREY7QUFBQSxRQUVFQyxvQkFGRjtBQUFBLFFBR0VDLGlCQUhGO0FBQUEsUUFJRUMsa0JBSkY7QUFBQSxRQUlhQyx3QkFKYjs7QUFNQSxRQUFJLG9CQUFvQk4sSUFBeEIsRUFBOEI7QUFDNUI7QUFDQUUsMEJBQW9CRixLQUFLaEIsY0FBekI7QUFDRCxLQUhELE1BSUssSUFBSXVCLFNBQVNGLFNBQWIsRUFBd0I7QUFDM0I7QUFDQTtBQUNBQSxrQkFBWUUsU0FBU0YsU0FBVCxDQUFtQkcsV0FBbkIsRUFBWjtBQUNBRix3QkFBa0JDLFNBQVNGLFNBQVQsQ0FBbUJHLFdBQW5CLEdBQWlDQyxJQUFqQyxDQUFzQzdLLE1BQXhEO0FBQ0F5SyxnQkFBVXZCLFNBQVYsQ0FBb0IsV0FBcEIsRUFBaUMsQ0FBQ2tCLEtBQUs1SixLQUFMLENBQVdSLE1BQTdDO0FBQ0FzSywwQkFBb0JHLFVBQVVJLElBQVYsQ0FBZTdLLE1BQWYsR0FBd0IwSyxlQUE1QztBQUNEOztBQUVESCxrQkFBY0gsS0FBSzVKLEtBQW5CO0FBQ0EsUUFBSStJLEtBQUsxTCxPQUFMLElBQWdCLEtBQUtpTixlQUF6QixFQUEwQztBQUN4Q04saUJBQVcsS0FBS00sZUFBTCxDQUFxQnZCLEtBQUsxTCxPQUExQixFQUFtQ2tOLGVBQW5DLENBQW1EbEosSUFBbkQsQ0FBd0QsSUFBeEQsRUFBOEQwSCxJQUE5RCxFQUFvRUMsTUFBcEUsRUFBNEVDLENBQTVFLEVBQStFVyxLQUFLNUosS0FBcEYsQ0FBWDtBQUNELEtBRkQsTUFFTyxJQUFJK0ksS0FBSzFMLE9BQUwsc0NBQUosRUFBK0I7QUFDcEMyTSxpQkFBVyxtQ0FBVWpCLEtBQUsxTCxPQUFmLEVBQXdCa04sZUFBeEIsQ0FBd0NsSixJQUF4QyxDQUE2QyxJQUE3QyxFQUFtRDBILElBQW5ELEVBQXlEQyxNQUF6RCxFQUFpRUMsQ0FBakUsRUFBb0VXLEtBQUs1SixLQUF6RSxDQUFYO0FBQ0QsS0FGTSxNQUVBO0FBQ0xnSyxpQkFBV0QsV0FBWDtBQUNEOztBQUVELFFBQUlDLFlBQVlELFdBQWhCLEVBQTZCO0FBQzNCaEIsV0FBS0csTUFBTCxDQUFZRSxHQUFaLENBQWdCWSxRQUFoQixFQUEwQlEsT0FBMUIsQ0FBa0MsUUFBbEM7QUFDQXJDLHdCQUFrQnlCLElBQWxCLEVBQXdCRSxvQkFBb0JFLFNBQVN4SyxNQUE3QixHQUFzQ3VLLFlBQVl2SyxNQUExRTtBQUNEO0FBQ0YsR0FyRG9CO0FBc0RyQixVQUFRLGNBQVV1SixJQUFWLEVBQWdCQyxNQUFoQixFQUF3QkMsQ0FBeEIsRUFBMkJ3QixNQUEzQixFQUFtQztBQUN6QyxRQUFJYixPQUFPYixLQUFLRyxNQUFMLENBQVlXLEdBQVosQ0FBZ0IsQ0FBaEIsQ0FBWDtBQUFBLFFBQ0VFLG9CQURGO0FBQUEsUUFFRUMsaUJBRkY7O0FBS0FqQixTQUFLRyxNQUFMLENBQVl3QixVQUFaLENBQXVCLGlCQUF2Qjs7QUFFQVgsa0JBQWNILEtBQUs1SixLQUFuQjtBQUNBLFFBQUkrSSxLQUFLMUwsT0FBTCxJQUFnQixLQUFLaU4sZUFBekIsRUFBMEM7QUFDeENOLGlCQUFXLEtBQUtNLGVBQUwsQ0FBcUJ2QixLQUFLMUwsT0FBMUIsRUFBbUNrTixlQUFuQyxDQUFtRGxKLElBQW5ELENBQXdELElBQXhELEVBQThEMEgsSUFBOUQsRUFBb0VDLE1BQXBFLEVBQTRFQyxDQUE1RSxFQUErRVcsS0FBSzVKLEtBQXBGLEVBQTJGLE1BQTNGLENBQVg7QUFDRCxLQUZELE1BRU8sSUFBSStJLEtBQUsxTCxPQUFMLHNDQUFKLEVBQStCO0FBQ3BDMk0saUJBQVcsbUNBQVVqQixLQUFLMUwsT0FBZixFQUF3QmtOLGVBQXhCLENBQXdDbEosSUFBeEMsQ0FBNkMsSUFBN0MsRUFBbUQwSCxJQUFuRCxFQUF5REMsTUFBekQsRUFBaUVDLENBQWpFLEVBQW9FVyxLQUFLNUosS0FBekUsRUFBZ0YsTUFBaEYsQ0FBWDtBQUNELEtBRk0sTUFFQTtBQUNMZ0ssaUJBQVdELFdBQVg7QUFDRDs7QUFFRCxRQUFJVSxNQUFKLEVBQVk7QUFDVjFCLFdBQUtHLE1BQUwsQ0FBWUUsR0FBWixDQUFnQlksUUFBaEI7QUFDRCxLQUZELE1BRU87QUFDTCxVQUFJQSxZQUFZRCxXQUFoQixFQUE2QjtBQUMzQmhCLGFBQUtHLE1BQUwsQ0FBWUUsR0FBWixDQUFnQlksUUFBaEIsRUFBMEJRLE9BQTFCLENBQWtDLFFBQWxDO0FBQ0Q7QUFDRjtBQUNGO0FBOUVvQixDQUF2QjtBQWdGQSxJQUFNRyxzQkFBc0IsU0FBdEJBLG1CQUFzQixDQUFVNUIsSUFBVixFQUFnQkMsTUFBaEIsRUFBd0I7QUFDbEQsTUFBSSxDQUFDRCxLQUFLMUwsT0FBVixFQUFtQjtBQUNqQixRQUFJMEwsS0FBSzZCLE9BQUwsQ0FBYWYsR0FBYixDQUFpQixDQUFqQixFQUFvQmdCLE9BQXBCLElBQStCLE9BQW5DLEVBQTRDO0FBQzFDOUIsV0FBSzFMLE9BQUwsR0FBZTBMLEtBQUs2QixPQUFMLENBQ1pFLElBRFksQ0FDUCxtQkFETyxDQUFmO0FBRUQsS0FIRCxNQUlLO0FBQ0gvQixXQUFLMUwsT0FBTCxHQUFlMEwsS0FBSzZCLE9BQUwsQ0FDWkcsSUFEWSxDQUNQLG9CQURPLEVBRVpELElBRlksQ0FFUCxtQkFGTyxDQUFmO0FBR0Q7QUFDRCxRQUFJLENBQUMvQixLQUFLMUwsT0FBVixFQUFtQjtBQUNqQnlDLGNBQVFDLEdBQVIsQ0FBWSxrQkFBS2lMLFFBQUwsQ0FBYyxjQUFkLEVBQThCLEtBQTlCLEVBQXFDLE1BQXJDLENBQVo7QUFDQWxMLGNBQVFDLEdBQVIsQ0FBWWdKLEtBQUtsTSxNQUFqQjtBQUNBLGFBQU8sSUFBUDtBQUNEO0FBQ0Y7O0FBRUQsTUFBSXFGLEtBQUssY0FBVDtBQUFBLE1BQ0UrSSxVQUFVbEMsS0FBSzFMLE9BQUwsQ0FBYWtJLEtBQWIsQ0FBbUJyRCxFQUFuQixDQURaOztBQUdBNkcsT0FBSzFMLE9BQUwsR0FBZTROLFFBQVEsQ0FBUixDQUFmO0FBQ0FsQyxPQUFLbUMsZUFBTCxHQUF1QkQsUUFBUSxDQUFSLEtBQWMsRUFBckM7O0FBRUE7QUFDQSxNQUFJbEMsS0FBSzFMLE9BQUwsSUFBZ0IsS0FBS2lOLGVBQXpCLEVBQTBDO0FBQ3hDdkIsU0FBS08saUJBQUwsR0FBeUIsS0FBS2dCLGVBQUwsQ0FBcUJ2QixLQUFLMUwsT0FBMUIsRUFBbUM4TixvQkFBbkMsQ0FBd0Q5SixJQUF4RCxDQUE2RCxJQUE3RCxFQUFtRTBILElBQW5FLEVBQXlFQyxNQUF6RSxDQUF6QjtBQUNELEdBRkQsTUFFTyxJQUFJRCxLQUFLMUwsT0FBTCxzQ0FBSixFQUErQjtBQUNwQzBMLFNBQUtPLGlCQUFMLEdBQXlCLG1DQUFVUCxLQUFLMUwsT0FBZixFQUF3QjhOLG9CQUF4QixDQUE2QzlKLElBQTdDLENBQWtELElBQWxELEVBQXdEMEgsSUFBeEQsRUFBOERDLE1BQTlELENBQXpCO0FBQ0Q7O0FBRURELE9BQUtHLE1BQUwsQ0FDRzVJLEdBREgsQ0FDTyxvQkFEUCxFQUVHOEssRUFGSCxDQUVNLG9CQUZOLEVBRTRCdEMsZUFBZVQsS0FBZixDQUFxQjFMLElBQXJCLENBQTBCLElBQTFCLEVBQWdDLEtBQUswTyxLQUFMLENBQVdyQyxNQUFYLENBQWhDLEVBQW9EQSxNQUFwRCxDQUY1QixFQUdHMUksR0FISCxDQUdPLHNCQUhQLEVBSUc4SyxFQUpILENBSU0sc0JBSk4sRUFJOEJ0QyxlQUFld0MsT0FBZixDQUF1QjNPLElBQXZCLENBQTRCLElBQTVCLEVBQWtDLEtBQUswTyxLQUFMLENBQVdyQyxNQUFYLENBQWxDLEVBQXNEQSxNQUF0RCxDQUo5QixFQUtHMUksR0FMSCxDQUtPLG9CQUxQLEVBTUc4SyxFQU5ILENBTU0sb0JBTk4sRUFNNEJ0QyxlQUFleUMsS0FBZixDQUFxQjVPLElBQXJCLENBQTBCLElBQTFCLEVBQWdDLEtBQUswTyxLQUFMLENBQVdyQyxNQUFYLENBQWhDLEVBQW9EQSxNQUFwRCxDQU41QixFQU9HMUksR0FQSCxDQU9PLG1CQVBQLEVBUUc4SyxFQVJILENBUU0sbUJBUk4sRUFRMkJ0QyxlQUFlMEMsSUFBZixDQUFvQjdPLElBQXBCLENBQXlCLElBQXpCLEVBQStCLEtBQUswTyxLQUFMLENBQVdyQyxNQUFYLENBQS9CLEVBQW1EQSxNQUFuRCxDQVIzQjs7QUFVQUYsaUJBQWUwQyxJQUFmLENBQW9CbkssSUFBcEIsQ0FBeUIsSUFBekIsRUFBK0IsS0FBS2dLLEtBQUwsQ0FBV3JDLE1BQVgsQ0FBL0IsRUFBbURBLE1BQW5EOztBQUVBLFNBQU8sSUFBUDtBQUNELENBNUNEO0FBNkNBLElBQU15Qyx3QkFBd0IsU0FBeEJBLHFCQUF3QixDQUFVMUMsSUFBVixFQUFnQkMsTUFBaEIsRUFBd0I7QUFDcERELE9BQUtHLE1BQUwsQ0FDRzVJLEdBREgsQ0FDTyxvQkFEUCxFQUVHQSxHQUZILENBRU8sc0JBRlAsRUFHR0EsR0FISCxDQUdPLG9CQUhQLEVBSUdBLEdBSkgsQ0FJTyxtQkFKUDs7QUFNQSxTQUFPLElBQVA7QUFDRCxDQVJEO0FBU0EsSUFBTW9MLFlBQVksU0FBWkEsU0FBWSxDQUFVQyxPQUFWLEVBQW1CO0FBQ25DLE1BQUksQ0FBQyxrQkFBRUMsUUFBRixDQUFXRCxPQUFYLENBQUwsRUFBMEI7QUFDeEJBLGNBQVUscUJBQU9BLE9BQVAsRUFBZ0J4QyxJQUFoQixDQUFxQixnQkFBckIsQ0FBVjtBQUNEO0FBQ0Q7Ozs7OztBQU1BLFNBQU8sa0JBQUV6RCxNQUFGLENBQVMsS0FBSzJGLEtBQWQsRUFBcUIsWUFBWTtBQUN0QyxXQUFPLEtBQUs1TSxFQUFMLElBQVdrTixPQUFsQjtBQUNELEdBRk0sQ0FBUDtBQUdELENBYkQ7QUFjQTs7QUFFQTs7OztJQUdNRSxjOzs7QUFDSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtDQSwwQkFBWTVPLE1BQVosRUFBb0I7QUFBQTs7QUFHbEI7Ozs7O0FBSGtCOztBQVFsQixVQUFLQSxNQUFMLEdBQWM7QUFDWjZPLG1CQUFhO0FBREQsS0FBZDtBQUdBLG9CQUFPQyxNQUFQLENBQWMsSUFBZCxFQUFvQixNQUFLOU8sTUFBekIsRUFBaUNBLE1BQWpDOztBQUVBO0FBQ0E7Ozs7QUFJQSxVQUFLb08sS0FBTCxHQUFhLEVBQWI7QUFDQSxVQUFLVyxTQUFMLEdBQWlCLElBQWpCO0FBQ0EsVUFBS0MsVUFBTCxHQUFrQixJQUFsQjs7QUFFQSxVQUFLQyxJQUFMO0FBdEJrQjtBQXVCbkI7O0FBRUQ7Ozs7Ozs7MkJBR087O0FBRUw7QUFDQSxXQUFLQyxRQUFMO0FBQ0Q7O0FBRUQ7Ozs7Ozs7K0JBSVc7QUFDVCxVQUFJLEtBQUtDLFdBQVQsRUFBc0IsT0FBTyxJQUFQO0FBQ3RCLFdBQUtBLFdBQUwsR0FBbUIsSUFBbkI7QUFDRDs7QUFFRDs7Ozs7Ozs7O3lCQU1LckQsSSxFQUFNO0FBQ1QsVUFBSXNELGtCQUFrQixFQUF0QjtBQUFBLFVBQTBCckQsZUFBMUI7O0FBRUE7QUFDQSxXQUFLc0IsZUFBTCxHQUF1QnVCLGVBQWVTLFlBQWYsRUFBdkI7O0FBRUEsc0JBQU9QLE1BQVAsQ0FBYyxJQUFkLEVBQW9CTSxlQUFwQixFQUFxQyxLQUFLcFAsTUFBMUM7QUFDQSxVQUFJOEwsSUFBSixFQUFVLGdCQUFPZ0QsTUFBUCxDQUFjLElBQWQsRUFBb0JNLGVBQXBCLEVBQXFDdEQsSUFBckM7QUFDVkEsYUFBT3NELGVBQVA7O0FBRUEsVUFBSSxDQUFDdEQsS0FBS2xNLE1BQVYsRUFBa0I7QUFDaEJpRCxnQkFBUUMsR0FBUixDQUFZLGtCQUFLaUwsUUFBTCxDQUFjLGNBQWQsRUFBOEIsS0FBOUIsRUFBcUMsTUFBckMsQ0FBWjtBQUNBLGVBQU8sSUFBUDtBQUNEO0FBQ0RqQyxXQUFLNkIsT0FBTCxHQUFlLHFCQUFPN0IsS0FBS2xNLE1BQVosQ0FBZjtBQUNBLFVBQUcsQ0FBQ2tNLEtBQUs2QixPQUFMLENBQWFmLEdBQWIsQ0FBaUIsQ0FBakIsQ0FBSixFQUF3QjtBQUN0Qi9KLGdCQUFRQyxHQUFSLENBQVksa0JBQUtpTCxRQUFMLENBQWMsY0FBZCxFQUE4QixLQUE5QixFQUFxQyw0QkFBckMsQ0FBWjtBQUNBLGVBQU8sSUFBUDtBQUNEOztBQUVELFVBQUlqQyxLQUFLNkIsT0FBTCxDQUFhZixHQUFiLENBQWlCLENBQWpCLEVBQW9CZ0IsT0FBcEIsSUFBK0IsT0FBbkMsRUFBNEM7QUFDMUM5QixhQUFLRyxNQUFMLEdBQWNILEtBQUs2QixPQUFuQjtBQUNELE9BRkQsTUFHSztBQUNIN0IsYUFBS0csTUFBTCxHQUFjSCxLQUFLNkIsT0FBTCxDQUFhRyxJQUFiLENBQWtCLG9CQUFsQixDQUFkO0FBQ0EsWUFBSWhDLEtBQUtHLE1BQUwsQ0FBWTFKLE1BQVosR0FBcUIsQ0FBekIsRUFBNEI7QUFDMUJ1SixlQUFLRyxNQUFMLENBQVlxRCxJQUFaLENBQWlCLFlBQVk7QUFDM0J4RCxpQkFBS2xNLE1BQUwsR0FBYyxJQUFkO0FBQ0EwQixpQkFBSzVCLElBQUwsQ0FBVW9NLElBQVY7QUFDRCxXQUhEO0FBSUEsaUJBQU8sSUFBUDtBQUNEO0FBQ0Y7O0FBRURBLFdBQUtHLE1BQUwsR0FBZUgsS0FBSzZCLE9BQUwsQ0FBYWYsR0FBYixDQUFpQixDQUFqQixFQUFvQmdCLE9BQXBCLElBQStCLE9BQWhDLEdBQTJDOUIsS0FBSzZCLE9BQWhELEdBQTBEN0IsS0FBSzZCLE9BQUwsQ0FBYUcsSUFBYixDQUFrQixvQkFBbEIsQ0FBeEU7O0FBRUEsVUFBSSxDQUFDaEMsS0FBS3RLLEVBQVYsRUFBY3NLLEtBQUt0SyxFQUFMLEdBQVVzSyxLQUFLRyxNQUFMLENBQVlDLElBQVosQ0FBaUIsZUFBakIsQ0FBVjs7QUFFZCxVQUFJLENBQUNKLEtBQUt0SyxFQUFWLEVBQWM7QUFDWnNLLGFBQUt0SyxFQUFMLEdBQVUsbUJBQW1CLG9CQUFVK04sYUFBVixFQUE3QjtBQUNBekQsYUFBS0csTUFBTCxDQUFZQyxJQUFaLENBQWlCLGVBQWpCLEVBQWtDSixLQUFLdEssRUFBdkM7QUFDRDtBQUNEdUssZUFBUyxrQkFBRXRELE1BQUYsQ0FBUyxLQUFLMkYsS0FBZCxFQUFxQixZQUFZO0FBQ3hDLGVBQU8sS0FBSzVNLEVBQUwsSUFBV3NLLEtBQUt0SyxFQUF2QjtBQUNELE9BRlEsQ0FBVDs7QUFJQSxVQUFJdUssV0FBVyxDQUFDLENBQWhCLEVBQW1CO0FBQ2pCLGFBQUtxQyxLQUFMLENBQVd6RyxJQUFYLENBQWdCbUUsSUFBaEI7QUFDQTRCLDRCQUFvQnRKLElBQXBCLENBQXlCLElBQXpCLEVBQStCLEtBQUtnSyxLQUFMLENBQVcsS0FBS0EsS0FBTCxDQUFXN0wsTUFBWCxHQUFvQixDQUEvQixDQUEvQixFQUFrRSxLQUFLNkwsS0FBTCxDQUFXN0wsTUFBWCxHQUFvQixDQUF0RjtBQUNELE9BSEQsTUFJSztBQUNILGFBQUs2TCxLQUFMLENBQVdyQyxNQUFYLElBQXFCRCxJQUFyQjtBQUNBNEIsNEJBQW9CdEosSUFBcEIsQ0FBeUIsSUFBekIsRUFBK0IsS0FBS2dLLEtBQUwsQ0FBV3JDLE1BQVgsQ0FBL0IsRUFBbURBLE1BQW5EO0FBQ0Q7O0FBRUQsYUFBTyxJQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7aUNBSWE7QUFDWCxVQUFJeUQsU0FBVSxrQkFBRUMsUUFBRixDQUFXZixPQUFYLENBQUQsR0FBd0JBLE9BQXhCLEdBQWtDRCxVQUFVckssSUFBVixDQUFlLElBQWYsRUFBcUJzSyxPQUFyQixDQUEvQztBQUNBLFVBQUljLFdBQVcsQ0FBQyxDQUFoQixFQUFtQjtBQUNqQixZQUFJaEksSUFBSSxLQUFLNEcsS0FBTCxDQUFXN0wsTUFBbkI7QUFDQSxlQUFPaUYsR0FBUCxFQUFZO0FBQ1ZxRSx5QkFBZTBDLElBQWYsQ0FBb0JuSyxJQUFwQixDQUF5QixJQUF6QixFQUErQixLQUFLZ0ssS0FBTCxDQUFXNUcsQ0FBWCxDQUEvQixFQUE4Q0EsQ0FBOUMsRUFBaUQsSUFBakQsRUFBdUQsSUFBdkQ7QUFDRDtBQUNGLE9BTEQsTUFLTztBQUNMcUUsdUJBQWUwQyxJQUFmLENBQW9CbkssSUFBcEIsQ0FBeUIsSUFBekIsRUFBK0IsS0FBS2dLLEtBQUwsQ0FBV29CLE1BQVgsQ0FBL0IsRUFBbURBLE1BQW5ELEVBQTJELElBQTNELEVBQWlFLElBQWpFO0FBQ0Q7QUFDRCxhQUFPLElBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7MkJBS08xRCxJLEVBQU07QUFDWCxVQUFJeEssT0FBTyxJQUFYO0FBQ0EsVUFBSXlLLGVBQUo7O0FBRUEsVUFBSSxDQUFDRCxLQUFLbE0sTUFBVixFQUFrQjtBQUNoQmlELGdCQUFRQyxHQUFSLENBQVksa0JBQUtpTCxRQUFMLENBQWMsY0FBZCxFQUE4QixLQUE5QixFQUFxQyxRQUFyQyxDQUFaO0FBQ0EsZUFBTyxJQUFQO0FBQ0Q7QUFDRGpDLFdBQUs2QixPQUFMLEdBQWUscUJBQU83QixLQUFLbE0sTUFBWixDQUFmOztBQUVBLFVBQUlrTSxLQUFLNkIsT0FBTCxDQUFhZixHQUFiLENBQWlCLENBQWpCLEVBQW9CZ0IsT0FBcEIsSUFBK0IsT0FBbkMsRUFBNEM7QUFDMUM5QixhQUFLRyxNQUFMLEdBQWNILEtBQUs2QixPQUFuQjtBQUNELE9BRkQsTUFHSztBQUNIN0IsYUFBS0csTUFBTCxHQUFjSCxLQUFLNkIsT0FBTCxDQUFhRyxJQUFiLENBQWtCLG9CQUFsQixDQUFkO0FBQ0EsWUFBSWhDLEtBQUtHLE1BQUwsQ0FBWTFKLE1BQVosR0FBcUIsQ0FBekIsRUFBNEI7QUFDMUJ1SixlQUFLRyxNQUFMLENBQVlxRCxJQUFaLENBQWlCLFlBQVk7QUFDM0J4RCxpQkFBS2xNLE1BQUwsR0FBYyxJQUFkO0FBQ0EwQixpQkFBS29PLE1BQUwsQ0FBWTVELElBQVo7QUFDRCxXQUhEO0FBSUEsaUJBQU8sSUFBUDtBQUNEO0FBQ0Y7O0FBRURBLFdBQUtHLE1BQUwsR0FBZUgsS0FBSzZCLE9BQUwsQ0FBYWYsR0FBYixDQUFpQixDQUFqQixFQUFvQmdCLE9BQXBCLElBQStCLE9BQWhDLEdBQTJDOUIsS0FBSzZCLE9BQWhELEdBQTBEN0IsS0FBSzZCLE9BQUwsQ0FBYUcsSUFBYixDQUFrQixvQkFBbEIsQ0FBeEU7QUFDQWhDLFdBQUt0SyxFQUFMLEdBQVVzSyxLQUFLRyxNQUFMLENBQVlDLElBQVosQ0FBaUIsZUFBakIsQ0FBVjs7QUFFQSxVQUFJSixLQUFLdEssRUFBVCxFQUFhO0FBQ1h1SyxpQkFBUyxrQkFBRXRELE1BQUYsQ0FBUyxLQUFLMkYsS0FBZCxFQUFxQixZQUFZO0FBQ3hDLGlCQUFPLEtBQUs1TSxFQUFMLElBQVdzSyxLQUFLdEssRUFBdkI7QUFDRCxTQUZRLENBQVQ7O0FBSUFnTiw4QkFBc0JwSyxJQUF0QixDQUEyQixJQUEzQixFQUFpQyxLQUFLZ0ssS0FBTCxDQUFXckMsTUFBWCxDQUFqQztBQUNBLGFBQUtxQyxLQUFMLENBQVd1QixNQUFYLENBQWtCNUQsTUFBbEIsRUFBMEIsQ0FBMUI7QUFDRDs7QUFFRCxhQUFPLElBQVA7QUFDRDs7QUFFRDs7Ozs7OztpQ0FJb0I2RCxVLEVBQVk7QUFDOUIsYUFBT3pQLFlBQVkwRCxPQUFPZ00sTUFBUCxDQUFjMVAsU0FBZCxFQUF5QnlQLFVBQXpCLENBQW5CO0FBQ0Q7O0FBRUQ7Ozs7Ozs7bUNBSXNCO0FBQ3BCLGFBQU96UCxhQUFhLEVBQXBCO0FBQ0Q7O0FBRUQ7Ozs7Ozs7a0NBSW9CO0FBQ2xCLGFBQU8sbUNBQVUyUCxRQUFqQjtBQUNEOztBQUVEOzs7Ozs7O2lDQUltQjtBQUNqQixhQUFPLG1DQUFVQyxPQUFqQjtBQUNEOzs7Ozs7a0JBR1luQixjOzs7Ozs7Ozs7Ozs7OztBQ25hZjs7Ozs7O0FBRUEsSUFBSW9CLFFBQVEsSUFBSXhRLElBQUosRUFBWjs7QUFFQTs7OztBQUlBLElBQUlzUSxXQUFXO0FBQ2IsUUFBTSxTQURPO0FBRWIsT0FBSyxlQUZRO0FBR2IsUUFBTSxhQUhPO0FBSWIsUUFBTSxZQUpPO0FBS2IsUUFBTSxVQUxPO0FBTWIsUUFBTSxTQU5PO0FBT2IsU0FBTyxXQVBNO0FBUWIsUUFBTSxTQVJPO0FBU2IsUUFBTSxVQVRPO0FBVWIsUUFBTSxZQVZPO0FBV2IsUUFBTSxVQVhPO0FBWWIsU0FBTyxXQVpNO0FBYWIsUUFBTSxjQWJPO0FBY2IsUUFBTSxZQWRPO0FBZWI7QUFDQSxRQUFNLFlBaEJPO0FBaUJiLFFBQU0sV0FqQk87QUFrQmIsUUFBTSxXQWxCTztBQW1CYjtBQUNBLE9BQUssU0FwQlE7QUFxQmIsUUFBTSxRQXJCTztBQXNCYixRQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUE3QmEsQ0FBZjs7QUFnQ0EsSUFBSUMsVUFBVTtBQUNaLFFBQU0sQ0FETSxFQUNILE1BQU0sQ0FESCxFQUNNLE1BQU0sQ0FEWixFQUNlLE1BQU0sQ0FEckIsRUFDd0IsTUFBTSxDQUQ5QixFQUNpQyxNQUFNLENBRHZDLEVBQzBDLE1BQU0sQ0FEaEQsRUFDbUQsTUFBTSxDQUR6RCxFQUM0RCxNQUFNLENBRGxFLEVBQ3FFLE1BQU0sQ0FEM0U7QUFFWixRQUFNLENBRk0sRUFFSCxNQUFNLENBRkgsRUFFTSxNQUFNLENBRlosRUFFZSxNQUFNLENBRnJCLEVBRXdCLE9BQU8sQ0FGL0IsRUFFa0MsT0FBTyxDQUZ6QyxFQUU0QyxPQUFPLENBRm5ELEVBRXNELE9BQU8sQ0FGN0QsRUFFZ0UsT0FBTyxDQUZ2RSxFQUUwRSxPQUFPO0FBRmpGLENBQWQ7O0FBS0EsSUFBSUUsZ0JBQWdCO0FBQ2xCL0Isd0JBQXNCLDhCQUFVZ0MsS0FBVixFQUFpQjtBQUNyQyxRQUFJN0Qsb0JBQW9CO0FBQ3RCLGFBQU87QUFEZSxLQUF4QjtBQUdBLFFBQUk2RCxNQUFNakMsZUFBTixJQUF5QixLQUE3QixFQUFvQztBQUNsQztBQUNELEtBRkQsTUFHSztBQUNINUIsd0JBQWtCLEtBQWxCLElBQTJCLEdBQTNCLENBREcsQ0FDNkI7QUFDakM7QUFDRCxXQUFPeEksT0FBT2dNLE1BQVAsQ0FBY3hELGlCQUFkLEVBQWlDeUQsUUFBakMsRUFBMkNDLE9BQTNDLENBQVA7QUFDRCxHQVppQjtBQWFsQnpDLG1CQUFpQix5QkFBVTRDLEtBQVYsRUFBaUJuRSxNQUFqQixFQUF5QkMsQ0FBekIsRUFBNEJHLEdBQTVCLEVBQWlDZ0UsS0FBakMsRUFBd0M7QUFDdkRoRSxVQUFNQSxJQUFJekgsT0FBSixDQUFZLGVBQVosRUFBNkIsRUFBN0IsQ0FBTjtBQUNBLFFBQUkwTCxnQkFBZ0IsSUFBSXRMLE1BQUosQ0FBVyw4QkFBWCxDQUFwQjtBQUFBLFFBQ0V1TCxZQUFZbEUsSUFBSXRGLEtBQUosQ0FBVSxHQUFWLENBRGQ7QUFBQSxRQUVFeUosb0JBRkY7O0FBSUFELGNBQVUsQ0FBVixLQUFnQixHQUFoQjs7QUFFQSxPQUFHO0FBQ0RBLGdCQUFVLENBQVYsSUFBZUEsVUFBVSxDQUFWLEVBQWEzTCxPQUFiLENBQXFCMEwsYUFBckIsRUFBb0MsT0FBcEMsQ0FBZjtBQUNELEtBRkQsUUFFU0EsY0FBY3JMLElBQWQsQ0FBbUJzTCxVQUFVLENBQVYsQ0FBbkIsQ0FGVDs7QUFJQSxRQUFJQSxVQUFVOU4sTUFBVixHQUFtQixDQUF2QixFQUEwQjtBQUN4QixVQUFJLGtCQUFFa04sUUFBRixDQUFXUyxNQUFNSyxRQUFqQixDQUFKLEVBQWdDO0FBQzlCRCxzQkFBY0QsVUFBVSxDQUFWLElBQWUsa0JBQUU1UCxJQUFGLENBQU80UCxVQUFVLENBQVYsQ0FBUCxFQUFxQkgsTUFBTUssUUFBM0IsQ0FBN0I7QUFDRCxPQUZELE1BR0s7QUFDSEQsc0JBQWNELFVBQVVHLElBQVYsQ0FBZSxFQUFmLENBQWQ7QUFDRDtBQUNGLEtBUEQsTUFRSztBQUNIRixvQkFBY0QsVUFBVSxDQUFWLEVBQWF4SixLQUFiLENBQW1CLEdBQW5CLEVBQXdCLENBQXhCLENBQWQ7QUFDRDs7QUFFRCxXQUFPeUosV0FBUDtBQUNEO0FBdENpQixDQUFwQjs7QUF5Q0EsSUFBSUcsaUJBQWlCO0FBQ25CdkMsd0JBQXNCLFNBQVNBLG9CQUFULENBQThCZ0MsS0FBOUIsRUFBcUM7QUFDekQsUUFBSTdELG9CQUFvQjtBQUN0QixhQUFPLEdBRGU7QUFFdEIsYUFBTzs7QUFGZSxLQUF4QjtBQUtBLFdBQU94SSxPQUFPZ00sTUFBUCxDQUFjeEQsaUJBQWQsRUFBaUN5RCxRQUFqQyxFQUEyQ0MsT0FBM0MsQ0FBUDtBQUNELEdBUmtCO0FBU25CekMsbUJBQWlCLHlCQUFVNEMsS0FBVixFQUFpQm5FLE1BQWpCLEVBQXlCQyxDQUF6QixFQUE0QkcsR0FBNUIsRUFBaUNnRSxLQUFqQyxFQUF3QztBQUN2RGhFLFVBQU1BLElBQUl6SCxPQUFKLENBQVksZUFBWixFQUE2QixFQUE3QixDQUFOO0FBQ0EsUUFBSTJMLFlBQVlsRSxJQUFJdEYsS0FBSixDQUFVLEdBQVYsQ0FBaEI7QUFBQSxRQUNFeUosb0JBREY7O0FBSUFELGNBQVUsQ0FBVixLQUFnQixHQUFoQjs7QUFFQSxRQUFJQSxVQUFVOU4sTUFBVixHQUFtQixDQUF2QixFQUEwQjtBQUN4QixVQUFJLGtCQUFFa04sUUFBRixDQUFXUyxNQUFNSyxRQUFqQixDQUFKLEVBQWdDO0FBQzlCRCxzQkFBY0QsVUFBVSxDQUFWLElBQWUsa0JBQUU1UCxJQUFGLENBQU80UCxVQUFVLENBQVYsQ0FBUCxFQUFxQkgsTUFBTUssUUFBM0IsQ0FBN0I7QUFDRCxPQUZELE1BR0s7QUFDSEQsc0JBQWNELFVBQVVHLElBQVYsQ0FBZSxFQUFmLENBQWQ7QUFDRDtBQUNGLEtBUEQsTUFRSztBQUNIRixvQkFBY0QsVUFBVSxDQUFWLEVBQWF4SixLQUFiLENBQW1CLEdBQW5CLEVBQXdCLENBQXhCLENBQWQ7QUFDRDs7QUFFRCxXQUFPeUosV0FBUDtBQUNEO0FBOUJrQixDQUFyQjs7QUFpQ0EsSUFBSUksZUFBZTtBQUNqQnhDLHdCQUFzQiw4QkFBVWdDLEtBQVYsRUFBaUI7QUFDckMsUUFBSTdELG9CQUFvQjtBQUN0QixhQUFPLEdBRGUsRUFDVixPQUFPO0FBREcsS0FBeEI7QUFHQSxXQUFPeEksT0FBT2dNLE1BQVAsQ0FBY3hELGlCQUFkLEVBQWlDeUQsUUFBakMsRUFBMkNDLE9BQTNDLENBQVA7QUFDRCxHQU5nQjtBQU9qQnpDLG1CQUFpQix5QkFBVTRDLEtBQVYsRUFBaUJuRSxNQUFqQixFQUF5QkMsQ0FBekIsRUFBNEJHLEdBQTVCLEVBQWlDZ0UsS0FBakMsRUFBd0M7QUFDdkRoRSxVQUFNQSxJQUFJekgsT0FBSixDQUFZLEtBQVosRUFBbUIsRUFBbkIsQ0FBTjtBQUNBLFFBQUl5SCxPQUFPLEVBQVgsRUFBZSxPQUFPQSxHQUFQO0FBQ2YsUUFBSWlFLGdCQUFnQixnREFBcEI7O0FBRUEsUUFBSUYsTUFBTWpDLGVBQU4sSUFBeUIsTUFBN0IsRUFBcUM7QUFDbkNtQyxzQkFBZ0IsNkZBQWhCO0FBQ0QsS0FGRCxNQUVPLElBQUlGLE1BQU1qQyxlQUFOLElBQXlCLE1BQTdCLEVBQXFDO0FBQzFDbUMsc0JBQWdCLG1CQUFoQjtBQUNELEtBRk0sTUFFQSxJQUFJRixNQUFNakMsZUFBTixJQUF5QixPQUE3QixFQUFzQztBQUMzQ21DLHNCQUFnQixnQ0FBaEI7QUFDRDs7QUFFRCxRQUFJTyxpQkFBaUJ4RSxJQUFJN0QsS0FBSixDQUFVOEgsYUFBVixDQUFyQjtBQUFBLFFBQ0VFLGNBQWMsRUFEaEI7QUFBQSxRQUVFTSxlQUFlLFNBQWZBLFlBQWUsQ0FBVXpFLEdBQVYsRUFBZTBFLE1BQWYsRUFBdUJDLE9BQXZCLEVBQWdDNUUsSUFBaEMsRUFBc0M7QUFDbkQsVUFBSTZFLE9BQU87QUFDVCxhQUFLLFdBQVVDLENBQVYsRUFBYTtBQUNoQixjQUFJLE9BQU9BLENBQVAsSUFBWSxXQUFoQixFQUE2QkEsSUFBSWhCLE1BQU1uTyxXQUFOLEVBQUo7QUFDN0IsY0FBSW1QLEtBQUssRUFBTCxJQUFXQSxLQUFLLE1BQXBCLEVBQTRCQSxJQUFJaEIsTUFBTW5PLFdBQU4sRUFBSjtBQUM1QixpQkFBUW1QLEVBQUV6TyxNQUFGLEdBQVcsQ0FBWixHQUFpQixrQkFBRTBPLFFBQUYsQ0FBV0QsQ0FBWCxFQUFjLENBQWQsQ0FBakIsR0FBb0NBLENBQTNDO0FBQ0QsU0FMUTtBQU1ULGFBQUssV0FBVUEsQ0FBVixFQUFhO0FBQ2hCLGNBQUksT0FBT0EsQ0FBUCxJQUFZLFdBQWhCLEVBQTZCQSxJQUFJaEIsTUFBTWxPLFFBQU4sS0FBbUIsQ0FBdkI7QUFDN0IsaUJBQU9rUCxJQUFJLEVBQUosR0FBUyxFQUFULEdBQWNBLEtBQUssQ0FBTCxHQUFTLElBQVQsR0FBZ0Isa0JBQUVDLFFBQUYsQ0FBV0QsQ0FBWCxFQUFjLENBQWQsQ0FBckM7QUFDRCxTQVRRO0FBVVQsYUFBSyxXQUFVQSxDQUFWLEVBQWE7QUFDaEIsY0FBSSxPQUFPQSxDQUFQLElBQVksV0FBaEIsRUFBNkJBLElBQUloQixNQUFNa0IsT0FBTixLQUFrQixDQUF0QjtBQUM3QixjQUFJQyxPQUFPLGtCQUFFdlAsV0FBRixDQUFjc0ssS0FBSyxDQUFMLENBQWQsRUFBdUJBLEtBQUssQ0FBTCxJQUFVLENBQWpDLENBQVg7QUFDQSxpQkFBTzhFLElBQUlHLElBQUosR0FBV0EsSUFBWCxHQUFrQkgsS0FBSyxDQUFMLEdBQVMsSUFBVCxHQUFnQixrQkFBRUMsUUFBRixDQUFXRCxDQUFYLEVBQWMsQ0FBZCxDQUF6QztBQUNELFNBZFE7QUFlVCxhQUFLLFdBQVVBLENBQVYsRUFBYTtBQUNoQixjQUFJLENBQUNBLENBQUwsRUFBUUEsSUFBSSxDQUFKO0FBQ1IsaUJBQU9BLElBQUksRUFBSixHQUFTLEVBQVQsR0FBYyxrQkFBRUMsUUFBRixDQUFXRCxDQUFYLEVBQWMsQ0FBZCxDQUFyQjtBQUNELFNBbEJRO0FBbUJULGFBQUssV0FBVUEsQ0FBVixFQUFhO0FBQ2hCLGNBQUksQ0FBQ0EsQ0FBTCxFQUFRQSxJQUFJLENBQUo7QUFDUixpQkFBT0EsSUFBSSxFQUFKLEdBQVMsRUFBVCxHQUFjLGtCQUFFQyxRQUFGLENBQVdELENBQVgsRUFBYyxDQUFkLENBQXJCO0FBQ0QsU0F0QlE7QUF1QlQsYUFBSyxXQUFVQSxDQUFWLEVBQWE7QUFDaEIsY0FBSSxDQUFDQSxDQUFMLEVBQVFBLElBQUksQ0FBSjtBQUNSLGlCQUFPQSxJQUFJLEVBQUosR0FBUyxFQUFULEdBQWMsa0JBQUVDLFFBQUYsQ0FBV0QsQ0FBWCxFQUFjLENBQWQsQ0FBckI7QUFDRDtBQTFCUSxPQUFYO0FBNEJBLGFBQVFGLE9BQUQsR0FBWUMsS0FBS0YsTUFBTCxFQUFhMUUsR0FBYixDQUFaLEdBQWdDQSxHQUF2QztBQUNELEtBaENIOztBQWtDQW1FLGtCQUFjbkUsSUFBSXpILE9BQUosQ0FBWTBMLGFBQVosRUFBMkIsVUFBVXBPLENBQVYsRUFBYW9QLENBQWIsRUFBZ0I7QUFDdkQsVUFBSUMsT0FBTyxFQUFYOztBQUVBLFVBQUluQixNQUFNakMsZUFBTixJQUF5QixNQUE3QixFQUFxQztBQUNuQ29ELGFBQUsxSixJQUFMLENBQVVpSixhQUFhVSxVQUFVLENBQVYsQ0FBYixFQUEyQixHQUEzQixFQUFnQ25CLEtBQWhDLENBQVY7QUFDRCxPQUZELE1BR0ssSUFBSUQsTUFBTWpDLGVBQU4sSUFBeUIsT0FBN0IsRUFBc0M7QUFDekNvRCxhQUFLMUosSUFBTCxDQUFVaUosYUFBYVUsVUFBVSxDQUFWLENBQWIsRUFBMkIsR0FBM0IsRUFBZ0NuQixLQUFoQyxDQUFWO0FBQ0EsWUFBSW1CLFVBQVUsQ0FBVixLQUFnQm5CLEtBQXBCLEVBQTJCa0IsS0FBSzFKLElBQUwsQ0FBVSxNQUFNaUosYUFBYVUsVUFBVSxDQUFWLENBQWIsRUFBMkIsR0FBM0IsRUFBZ0NuQixLQUFoQyxDQUFoQjtBQUM1QixPQUhJLE1BSUEsSUFBSUQsTUFBTWpDLGVBQU4sSUFBeUIsTUFBN0IsRUFBcUM7QUFDeENvRCxhQUFLMUosSUFBTCxDQUFVaUosYUFBYVUsVUFBVSxDQUFWLENBQWIsRUFBMkIsR0FBM0IsRUFBZ0NuQixLQUFoQyxDQUFWO0FBQ0EsWUFBSW1CLFVBQVUsQ0FBVixLQUFnQm5CLEtBQXBCLEVBQTJCa0IsS0FBSzFKLElBQUwsQ0FBVSxNQUFNaUosYUFBYVUsVUFBVSxDQUFWLENBQWIsRUFBMkIsR0FBM0IsRUFBZ0NuQixLQUFoQyxDQUFoQjtBQUMzQixZQUFJbUIsVUFBVSxDQUFWLEtBQWdCbkIsS0FBcEIsRUFBMkJrQixLQUFLMUosSUFBTCxDQUFVLE1BQU1pSixhQUFhVSxVQUFVLENBQVYsQ0FBYixFQUEyQixHQUEzQixFQUFnQ25CLEtBQWhDLEVBQXVDbUIsU0FBdkMsQ0FBaEI7QUFDM0IsWUFBSUEsVUFBVSxDQUFWLEtBQWdCbkIsS0FBcEIsRUFBMkJrQixLQUFLMUosSUFBTCxDQUFVLE1BQU1pSixhQUFhVSxVQUFVLENBQVYsQ0FBYixFQUEyQixHQUEzQixFQUFnQ25CLEtBQWhDLENBQWhCO0FBQzNCLFlBQUltQixVQUFVLENBQVYsS0FBZ0JuQixLQUFwQixFQUEyQmtCLEtBQUsxSixJQUFMLENBQVUsTUFBTWlKLGFBQWFVLFVBQVUsQ0FBVixDQUFiLEVBQTJCLEdBQTNCLEVBQWdDbkIsS0FBaEMsQ0FBaEI7QUFDM0IsWUFBSW1CLFVBQVUsQ0FBVixLQUFnQm5CLEtBQXBCLEVBQTJCa0IsS0FBSzFKLElBQUwsQ0FBVSxNQUFNaUosYUFBYVUsVUFBVSxDQUFWLENBQWIsRUFBMkIsR0FBM0IsRUFBZ0NuQixLQUFoQyxDQUFoQjtBQUM1QixPQVBJLE1BUUE7QUFDSGtCLGFBQUsxSixJQUFMLENBQVVpSixhQUFhVSxVQUFVLENBQVYsQ0FBYixFQUEyQixHQUEzQixFQUFnQ25CLEtBQWhDLENBQVY7QUFDQSxZQUFJbUIsVUFBVSxDQUFWLEtBQWdCbkIsS0FBcEIsRUFBMkJrQixLQUFLMUosSUFBTCxDQUFVLE1BQU1pSixhQUFhVSxVQUFVLENBQVYsQ0FBYixFQUEyQixHQUEzQixFQUFnQ25CLEtBQWhDLENBQWhCO0FBQzNCLFlBQUltQixVQUFVLENBQVYsS0FBZ0JuQixLQUFwQixFQUEyQmtCLEtBQUsxSixJQUFMLENBQVUsTUFBTWlKLGFBQWFVLFVBQVUsQ0FBVixDQUFiLEVBQTJCLEdBQTNCLEVBQWdDbkIsS0FBaEMsRUFBdUNtQixTQUF2QyxDQUFoQjtBQUM1QjtBQUNELGFBQU9ELEtBQUtiLElBQUwsQ0FBVSxFQUFWLENBQVA7QUFDRCxLQXhCYSxDQUFkOztBQTBCQSxRQUFJTCxTQUFTLE1BQVQsSUFBbUIsQ0FBQ1EsY0FBeEIsRUFBd0M7QUFDdENMLG9CQUFlLFlBQVk7QUFDekIsWUFBSWUsT0FBTyxFQUFYOztBQUVBLFlBQUluQixNQUFNakMsZUFBTixJQUF5QixNQUE3QixFQUFxQztBQUNuQ29ELGVBQUsxSixJQUFMLENBQVVpSixhQUFhLENBQWIsRUFBZ0IsR0FBaEIsRUFBcUJULEtBQXJCLENBQVY7QUFDRCxTQUZELE1BR0ssSUFBSUQsTUFBTWpDLGVBQU4sSUFBeUIsT0FBN0IsRUFBc0M7QUFDekNvRCxlQUFLMUosSUFBTCxDQUFVaUosYUFBYSxDQUFiLEVBQWdCLEdBQWhCLEVBQXFCVCxLQUFyQixDQUFWO0FBQ0FrQixlQUFLMUosSUFBTCxDQUFVLE1BQU1pSixhQUFhLENBQWIsRUFBZ0IsR0FBaEIsRUFBcUJULEtBQXJCLENBQWhCO0FBQ0QsU0FISSxNQUlBLElBQUlELE1BQU1qQyxlQUFOLElBQXlCLE1BQTdCLEVBQXFDO0FBQ3hDb0QsZUFBSzFKLElBQUwsQ0FBVWlKLGFBQWEsQ0FBYixFQUFnQixHQUFoQixFQUFxQlQsS0FBckIsQ0FBVjtBQUNBa0IsZUFBSzFKLElBQUwsQ0FBVSxNQUFNaUosYUFBYSxDQUFiLEVBQWdCLEdBQWhCLEVBQXFCVCxLQUFyQixDQUFoQjtBQUNBa0IsZUFBSzFKLElBQUwsQ0FBVSxNQUFNaUosYUFBYSxDQUFiLEVBQWdCLEdBQWhCLEVBQXFCVCxLQUFyQixFQUE0Qm1CLFNBQTVCLENBQWhCO0FBQ0FELGVBQUsxSixJQUFMLENBQVUsTUFBTWlKLGFBQWEsQ0FBYixFQUFnQixHQUFoQixFQUFxQlQsS0FBckIsQ0FBaEI7QUFDQWtCLGVBQUsxSixJQUFMLENBQVUsTUFBTWlKLGFBQWEsQ0FBYixFQUFnQixHQUFoQixFQUFxQlQsS0FBckIsQ0FBaEI7QUFDQWtCLGVBQUsxSixJQUFMLENBQVUsTUFBTWlKLGFBQWEsQ0FBYixFQUFnQixHQUFoQixFQUFxQlQsS0FBckIsQ0FBaEI7QUFDRCxTQVBJLE1BT0U7QUFDTGtCLGVBQUsxSixJQUFMLENBQVVpSixhQUFhLENBQWIsRUFBZ0IsR0FBaEIsRUFBcUJULEtBQXJCLENBQVY7QUFDQWtCLGVBQUsxSixJQUFMLENBQVUsTUFBTWlKLGFBQWEsQ0FBYixFQUFnQixHQUFoQixFQUFxQlQsS0FBckIsQ0FBaEI7QUFDQWtCLGVBQUsxSixJQUFMLENBQVUsTUFBTWlKLGFBQWEsQ0FBYixFQUFnQixHQUFoQixFQUFxQlQsS0FBckIsRUFBNEJtQixTQUE1QixDQUFoQjtBQUNEO0FBQ0QsZUFBT0QsS0FBS2IsSUFBTCxDQUFVLEVBQVYsQ0FBUDtBQUNELE9BdkJhLEVBQWQ7QUF3QkQsS0F6QkQsTUEwQkssSUFBSSxDQUFDRyxjQUFMLEVBQXFCTCxjQUFlQSxZQUFZL04sTUFBWixHQUFxQixDQUF0QixHQUEyQixrQkFBRTlCLElBQUYsQ0FBTzZQLFdBQVAsRUFBb0IsQ0FBcEIsQ0FBM0IsR0FBb0RBLFdBQWxFOztBQUUxQixXQUFPQSxXQUFQO0FBQ0Q7QUE3R2dCLENBQW5COztBQWdIQSxJQUFJaUIsZUFBZTtBQUNqQnJELHdCQUFzQiw4QkFBVWdDLEtBQVYsRUFBaUI7QUFDckMsUUFBSTdELG9CQUFvQjtBQUN0QixhQUFPO0FBRGUsS0FBeEI7QUFHQSxXQUFPeEksT0FBT2dNLE1BQVAsQ0FBY3hELGlCQUFkLEVBQWlDeUQsUUFBakMsRUFBMkNDLE9BQTNDLENBQVA7QUFDRCxHQU5nQjtBQU9qQnpDLG1CQUFpQix5QkFBVTRDLEtBQVYsRUFBaUJuRSxNQUFqQixFQUF5QkMsQ0FBekIsRUFBNEJHLEdBQTVCLEVBQWlDZ0UsS0FBakMsRUFBd0M7QUFDdkRoRSxVQUFNQSxJQUFJekgsT0FBSixDQUFZLEtBQVosRUFBbUIsRUFBbkIsQ0FBTjtBQUNBLFFBQUkwTCxnQkFBZ0IsaURBQXBCOztBQUVBLFFBQUlPLGlCQUFpQnhFLElBQUk3RCxLQUFKLENBQVU4SCxhQUFWLENBQXJCO0FBQUEsUUFDRUUsY0FBY25FLElBQUl6SCxPQUFKLENBQVkwTCxhQUFaLEVBQTJCLFVBQVVwTyxDQUFWLEVBQWFvUCxDQUFiLEVBQWdCO0FBQ3ZELFVBQUlDLE9BQU8sQ0FBQ0MsVUFBVSxDQUFWLENBQUQsQ0FBWDtBQUNBLFVBQUlBLFVBQVUsQ0FBVixDQUFKLEVBQWtCRCxLQUFLMUosSUFBTCxDQUFVLE1BQU0ySixVQUFVLENBQVYsQ0FBaEI7QUFDbEIsVUFBSUEsVUFBVSxDQUFWLENBQUosRUFBa0JELEtBQUsxSixJQUFMLENBQVUsTUFBTTJKLFVBQVUsQ0FBVixDQUFoQjtBQUNsQixhQUFPRCxLQUFLYixJQUFMLENBQVUsRUFBVixDQUFQO0FBQ0QsS0FMYSxDQURoQjs7QUFRQSxRQUFJLENBQUNHLGNBQUwsRUFBcUJMLGNBQWVBLFlBQVkvTixNQUFaLEdBQXFCLENBQXRCLEdBQTJCLGtCQUFFOUIsSUFBRixDQUFPNlAsV0FBUCxFQUFvQixDQUFwQixDQUEzQixHQUFvREEsV0FBbEU7O0FBRXJCLFdBQU9BLFdBQVA7QUFDRDtBQXRCZ0IsQ0FBbkI7O0FBeUJBLElBQUlrQixnQkFBZ0I7QUFDbEJ0RCx3QkFBc0IsOEJBQVVnQyxLQUFWLEVBQWlCO0FBQ3JDLFFBQUk3RCxvQkFBb0I7QUFDdEIsYUFBTztBQURlLEtBQXhCO0FBR0EsV0FBT3hJLE9BQU9nTSxNQUFQLENBQWN4RCxpQkFBZCxFQUFpQ3lELFFBQWpDLEVBQTJDQyxPQUEzQyxDQUFQO0FBQ0QsR0FOaUI7QUFPbEJ6QyxtQkFBaUIseUJBQVU0QyxLQUFWLEVBQWlCbkUsTUFBakIsRUFBeUJDLENBQXpCLEVBQTRCRyxHQUE1QixFQUFpQ2dFLEtBQWpDLEVBQXdDO0FBQ3ZEaEUsVUFBTUEsSUFBSXpILE9BQUosQ0FBWSxLQUFaLEVBQW1CLEVBQW5CLENBQU47QUFDQSxRQUFJMEwsZ0JBQWdCLGdEQUFwQjtBQUFBLFFBQ0VFLGNBQWNuRSxJQUFJekgsT0FBSixDQUFZMEwsYUFBWixFQUEyQixVQUFVcE8sQ0FBVixFQUFhb1AsQ0FBYixFQUFnQjtBQUN2RCxVQUFJQyxPQUFPLENBQUNDLFVBQVUsQ0FBVixDQUFELENBQVg7QUFDQSxVQUFJQSxVQUFVLENBQVYsQ0FBSixFQUFrQkQsS0FBSzFKLElBQUwsQ0FBVTJKLFVBQVUsQ0FBVixDQUFWO0FBQ2xCLFVBQUlBLFVBQVUsQ0FBVixDQUFKLEVBQWtCRCxLQUFLMUosSUFBTCxDQUFVMkosVUFBVSxDQUFWLENBQVY7QUFDbEIsYUFBT0QsS0FBS2IsSUFBTCxDQUFVLEdBQVYsQ0FBUDtBQUNELEtBTGEsQ0FEaEI7O0FBUUEsV0FBT0YsV0FBUDtBQUNEO0FBbEJpQixDQUFwQjs7QUFxQkEsSUFBSW1CLGdCQUFnQjtBQUNsQnZELHdCQUFzQiw4QkFBVWdDLEtBQVYsRUFBaUI7QUFDckMsUUFBSTdELG9CQUFvQjtBQUN0QixhQUFPLEdBRGUsRUFDVixPQUFPO0FBREcsS0FBeEI7QUFHQSxXQUFPeEksT0FBT2dNLE1BQVAsQ0FBY3hELGlCQUFkLEVBQWlDeUQsUUFBakMsRUFBMkNDLE9BQTNDLENBQVA7QUFDRCxHQU5pQjtBQU9sQnpDLG1CQUFpQix5QkFBVTRDLEtBQVYsRUFBaUJuRSxNQUFqQixFQUF5QkMsQ0FBekIsRUFBNEJHLEdBQTVCLEVBQWlDZ0UsS0FBakMsRUFBd0M7QUFDdkRoRSxVQUFNQSxJQUFJekgsT0FBSixDQUFZLEtBQVosRUFBbUIsRUFBbkIsQ0FBTjtBQUNBLFFBQUlnTixpQkFBaUIsNkVBQXJCO0FBQ0EsUUFBSXZGLElBQUl3RixNQUFKLENBQVcsQ0FBWCxFQUFjLENBQWQsS0FBb0IsSUFBeEIsRUFBOEI7QUFDNUJELHVCQUFpQiw2RUFBakI7QUFDRDs7QUFFRCxRQUFJcEIsY0FBY25FLElBQUl6SCxPQUFKLENBQVlnTixjQUFaLEVBQTRCLFVBQVUxUCxDQUFWLEVBQWFvUCxDQUFiLEVBQWdCO0FBQzVELFVBQUlDLE9BQU8sQ0FBQ0MsVUFBVSxDQUFWLENBQUQsQ0FBWDtBQUNBLFVBQUlBLFVBQVUsQ0FBVixDQUFKLEVBQWtCRCxLQUFLMUosSUFBTCxDQUFVMkosVUFBVSxDQUFWLENBQVY7QUFDbEIsVUFBSUEsVUFBVSxDQUFWLENBQUosRUFBa0JELEtBQUsxSixJQUFMLENBQVUySixVQUFVLENBQVYsQ0FBVjtBQUNsQixVQUFJQSxVQUFVLENBQVYsQ0FBSixFQUFrQkQsS0FBSzFKLElBQUwsQ0FBVTJKLFVBQVUsQ0FBVixDQUFWO0FBQ2xCLFVBQUlBLFVBQVUsQ0FBVixDQUFKLEVBQWtCRCxLQUFLMUosSUFBTCxDQUFVMkosVUFBVSxDQUFWLENBQVY7QUFDbEIsYUFBT0QsS0FBS2IsSUFBTCxDQUFVLEdBQVYsQ0FBUDtBQUNELEtBUGlCLENBQWxCO0FBUUEsV0FBT0YsV0FBUDtBQUNEO0FBdkJpQixDQUFwQjs7QUEwQkEsSUFBSXNCLGlCQUFpQjtBQUNuQjFELHdCQUFzQiw4QkFBVWdDLEtBQVYsRUFBaUI7QUFDckMsUUFBSTdELG9CQUFvQjtBQUN0QixhQUFPO0FBRGUsS0FBeEI7QUFHQSxXQUFPeEksT0FBT2dNLE1BQVAsQ0FBY3hELGlCQUFkLEVBQWlDeUQsUUFBakMsRUFBMkNDLE9BQTNDLENBQVA7QUFDRCxHQU5rQjtBQU9uQnpDLG1CQUFpQix5QkFBVTRDLEtBQVYsRUFBaUJuRSxNQUFqQixFQUF5QkMsQ0FBekIsRUFBNEJHLEdBQTVCLEVBQWlDZ0UsS0FBakMsRUFBd0M7QUFDdkRoRSxVQUFNQSxJQUFJekgsT0FBSixDQUFZLEtBQVosRUFBbUIsRUFBbkIsRUFBdUI4RCxTQUF2QixDQUFpQyxDQUFqQyxFQUFvQyxFQUFwQyxDQUFOOztBQUVBLFFBQUlrSixpQkFBaUIsdURBQXJCO0FBQUEsUUFDRXBCLGNBQWNuRSxJQUFJekgsT0FBSixDQUFZZ04sY0FBWixFQUE0QixVQUFVMVAsQ0FBVixFQUFhb1AsQ0FBYixFQUFnQjtBQUN4RCxVQUFJQyxPQUFPLENBQUNDLFVBQVUsQ0FBVixDQUFELENBQVg7QUFDQSxVQUFJQSxVQUFVLENBQVYsQ0FBSixFQUFrQkQsS0FBSzFKLElBQUwsQ0FBVTJKLFVBQVUsQ0FBVixDQUFWO0FBQ2xCLFVBQUlBLFVBQVUsQ0FBVixDQUFKLEVBQWtCRCxLQUFLMUosSUFBTCxDQUFVMkosVUFBVSxDQUFWLENBQVY7QUFDbEIsVUFBSUEsVUFBVSxDQUFWLENBQUosRUFBa0JELEtBQUsxSixJQUFMLENBQVUySixVQUFVLENBQVYsQ0FBVjtBQUNsQixhQUFPRCxLQUFLYixJQUFMLENBQVUsR0FBVixDQUFQO0FBQ0QsS0FOYSxDQURoQjtBQVFBLFdBQU9GLFdBQVA7QUFDRDtBQW5Ca0IsQ0FBckI7O0FBc0JBLElBQUl1QixpQkFBaUI7QUFDbkIzRCx3QkFBc0IsOEJBQVVnQyxLQUFWLEVBQWlCO0FBQ3JDLFFBQUlBLE1BQU1oQyxvQkFBVixFQUFnQztBQUM5QixhQUFPZ0MsTUFBTWhDLG9CQUFOLENBQTJCOUosSUFBM0IsQ0FBZ0M4TCxLQUFoQyxFQUF1QyxFQUFDakUsUUFBUWlFLE1BQU1qRSxNQUFmLEVBQXZDLENBQVA7QUFDRCxLQUZELE1BR0s7QUFDSCxhQUFPLElBQVA7QUFDRDtBQUNGLEdBUmtCO0FBU25CcUIsbUJBQWlCLHlCQUFVNEMsS0FBVixFQUFpQm5FLE1BQWpCLEVBQXlCQyxDQUF6QixFQUE0QkcsR0FBNUIsRUFBaUNnRSxLQUFqQyxFQUF3QztBQUN2RCxRQUFJRCxNQUFNNUMsZUFBVixFQUEyQjtBQUN6QixhQUFPNEMsTUFBTTVDLGVBQU4sQ0FBc0JsSixJQUF0QixDQUEyQjhMLEtBQTNCLEVBQWtDLEVBQUM0QixPQUFPOUYsQ0FBUixFQUFXQyxRQUFRaUUsTUFBTWpFLE1BQXpCLEVBQWlDbEosT0FBT29KLEdBQXhDLEVBQWxDLENBQVA7QUFDRDtBQUNGO0FBYmtCLENBQXJCOztrQkFnQmU7QUFDYjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE2QkEyRCxZQUFVQSxRQTlCRztBQStCYjs7Ozs7Ozs7OztBQVVBQyxXQUFTQSxPQXpDSTtBQTBDYjs7O0FBR0FnQyxTQUFPOUIsYUE3Q007QUE4Q2I7OztBQUdBK0IsVUFBUXZCLGNBakRLO0FBa0RiOzs7QUFHQWhQLFFBQU1pUCxZQXJETztBQXNEYjs7O0FBR0F1QixRQUFNVixZQXpETztBQTBEYjs7O0FBR0FXLFNBQU9WLGFBN0RNO0FBOERiOzs7QUFHQVcsU0FBT1YsYUFqRU07QUFrRWJXLFVBQVFSLGNBbEVLO0FBbUViOzs7QUFHQVMsVUFBUVI7QUF0RUssQzs7Ozs7Ozs7Ozs7Ozs7OztBQ3JWZjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFDQTs7QUFFQSxJQUFJUyxPQUFPO0FBQ1RDLE9BRFMsaUJBQ0hDLFVBREcsRUFDUztBQUNoQjtBQVlELEdBZFE7QUFlVEMsS0FmUyxlQWVMRCxVQWZLLEVBZU87QUFDZDtBQWdDRCxHQWhEUTtBQWlEVEUsT0FqRFMsaUJBaURIRixVQWpERyxFQWlEUztBQUNoQjtBQThCRCxHQWhGUTtBQWlGVEcsTUFqRlMsZ0JBaUZKSCxVQWpGSSxFQWlGUTtBQUNmO0FBOEJEO0FBaEhRLENBQVg7O0FBbUhBLElBQU1uUyxpQkFBaUIsU0FBakJBLGNBQWlCLENBQVV5TCxJQUFWLEVBQWdCOEcsSUFBaEIsRUFBc0I7QUFDM0MsTUFBSTlHLFFBQVFBLEtBQUt6TCxjQUFqQixFQUFpQztBQUMvQnlMLFNBQUt6TCxjQUFMLENBQW9CK0QsSUFBcEIsQ0FBeUJ3TyxJQUF6QixFQUErQkEsSUFBL0I7QUFDRCxHQUZELE1BR0ssSUFBSSxLQUFLdlMsY0FBVCxFQUF5QjtBQUM1QixTQUFLQSxjQUFMLENBQW9CK0QsSUFBcEIsQ0FBeUJ3TyxJQUF6QixFQUErQkEsSUFBL0I7QUFDRDs7QUFFREEsU0FBTyxJQUFQO0FBQ0QsQ0FURDtBQVVBLElBQU1DLFdBQVcsU0FBWEEsUUFBVyxHQUFZO0FBQzNCLE1BQUkzRyxPQUFPLGdCQUFPNEMsTUFBUCxDQUFjLElBQWQsRUFBb0IsRUFBcEIsRUFBd0IsS0FBSzlPLE1BQTdCLEVBQXFDO0FBQzlDOFMsZ0JBQVksRUFEa0M7QUFFOUNDLHNCQUFrQjtBQUY0QixHQUFyQyxDQUFYOztBQUtBN0csT0FBSzZHLGdCQUFMLENBQXNCLFFBQXRCLElBQWtDN0csS0FBSzRHLFVBQUwsQ0FBZ0IsUUFBaEIsSUFBNEIsa0JBQUVFLFNBQUYsQ0FBWSxLQUFLaFQsTUFBTCxDQUFZaVQsVUFBWixDQUF1QkMsYUFBbkMsQ0FBOUQ7QUFDQWhILE9BQUs2RyxnQkFBTCxDQUFzQixhQUF0QixJQUF1QzdHLEtBQUs0RyxVQUFMLENBQWdCLGFBQWhCLElBQWlDLGtCQUFFRSxTQUFGLENBQVksS0FBS2hULE1BQUwsQ0FBWWlULFVBQVosQ0FBdUJDLGFBQW5DLENBQXhFO0FBQ0FoSCxPQUFLNkcsZ0JBQUwsQ0FBc0IsT0FBdEIsSUFBaUMsa0JBQUVDLFNBQUYsQ0FBWSxLQUFLaFQsTUFBTCxDQUFZaVQsVUFBWixDQUF1QkMsYUFBbkMsQ0FBakM7O0FBRUFoSCxPQUFLNEcsVUFBTCxHQUFrQixrQkFBRUssR0FBRixDQUFNakgsS0FBSzRHLFVBQVgsQ0FBbEI7QUFDQTVHLE9BQUs2RyxnQkFBTCxHQUF3QixrQkFBRUksR0FBRixDQUFNakgsS0FBSzZHLGdCQUFYLENBQXhCOztBQUVBLE1BQUk7QUFDRixXQUFPLHNCQUFTcEosTUFBVCxDQUFnQjJJLEtBQUtDLEtBQUwsQ0FBV25PLElBQVgsQ0FBZ0IsSUFBaEIsQ0FBaEIsRUFBdUM4SCxJQUF2QyxDQUFQO0FBQ0QsR0FGRCxTQUdRO0FBQ05BLFdBQU8sSUFBUDtBQUNEO0FBQ0YsQ0FuQkQ7QUFvQkEsSUFBTWtILGFBQWEsU0FBYkEsVUFBYSxHQUFZO0FBQUE7O0FBQzdCLE1BQUlDLFNBQVMsa0JBQUU1UixJQUFGLENBQU8sS0FBS3pCLE1BQUwsQ0FBWXNULFdBQW5CLENBQWI7QUFBQSxNQUNFQyxLQUFLLEVBRFA7QUFBQSxNQUVFQyxLQUFLLEVBRlA7QUFBQSxNQUdFQyxZQUhGO0FBQUEsTUFHT0MsWUFIUDs7QUFLQSxNQUFJLEtBQUsxVCxNQUFMLENBQVlRLE9BQWhCLEVBQXlCO0FBQ3ZCLFFBQUksS0FBS1IsTUFBTCxDQUFZQyxJQUFaLElBQW9CLEtBQXBCLElBQTZCLEtBQUtELE1BQUwsQ0FBWUMsSUFBWixJQUFvQixHQUFyRCxFQUEwRDtBQUN4RHNULFdBQU0sS0FBS3ZULE1BQUwsQ0FBWVEsT0FBWixDQUFvQkUsUUFBckIsR0FBaUMsS0FBS1YsTUFBTCxDQUFZUSxPQUFaLENBQW9CRSxRQUFwQixDQUE2QmdFLE9BQTdCLENBQXFDLElBQXJDLEVBQTJDMk8sT0FBT3hSLFdBQVAsRUFBM0MsQ0FBakMsR0FBb0d3UixPQUFPeFIsV0FBUCxFQUF6RztBQUNBMlIsV0FBTSxLQUFLeFQsTUFBTCxDQUFZUSxPQUFaLENBQW9CRyxTQUFyQixHQUFrQyxLQUFLWCxNQUFMLENBQVlRLE9BQVosQ0FBb0JHLFNBQXBCLENBQThCK0QsT0FBOUIsQ0FBc0MsSUFBdEMsRUFBNEMsS0FBSzFFLE1BQUwsQ0FBWWEsSUFBWixDQUFpQkMsTUFBakIsQ0FBd0J1UyxPQUFPdlIsUUFBUCxFQUF4QixDQUE1QyxDQUFsQyxHQUE0SCxLQUFLOUIsTUFBTCxDQUFZYSxJQUFaLENBQWlCQyxNQUFqQixDQUF3QnVTLE9BQU92UixRQUFQLEVBQXhCLENBQWpJOztBQUVBLFdBQUs2UixDQUFMLENBQU8saUJBQVAsRUFBMEJ4VSxJQUExQixDQUFnQyxZQUFNO0FBQ3BDLFlBQUksTUFBS2EsTUFBTCxDQUFZUSxPQUFaLENBQW9Cb1QsU0FBeEIsRUFBbUM7QUFDakMsaUJBQU8sd0NBQXdDTCxFQUF4QyxHQUE2QyxTQUE3QyxHQUNMLHNDQURLLEdBQ29DQyxFQURwQyxHQUN5QyxTQURoRDtBQUVELFNBSEQsTUFJSztBQUNILGlCQUFPLHlDQUF5Q0EsRUFBekMsR0FBOEMsU0FBOUMsR0FDTCxxQ0FESyxHQUNtQ0QsRUFEbkMsR0FDd0MsU0FEL0M7QUFFRDtBQUNGLE9BVDhCLEVBQS9CO0FBVUQsS0FkRCxNQWVLLElBQUksS0FBS3ZULE1BQUwsQ0FBWUMsSUFBWixJQUFvQixPQUFwQixJQUErQixLQUFLRCxNQUFMLENBQVlDLElBQVosSUFBb0IsR0FBdkQsRUFBNEQ7QUFDL0RzVCxXQUFNLEtBQUt2VCxNQUFMLENBQVlRLE9BQVosQ0FBb0JFLFFBQXJCLEdBQWlDLEtBQUtWLE1BQUwsQ0FBWVEsT0FBWixDQUFvQkUsUUFBcEIsQ0FBNkJnRSxPQUE3QixDQUFxQyxJQUFyQyxFQUEyQzJPLE9BQU94UixXQUFQLEVBQTNDLENBQWpDLEdBQW9Hd1IsT0FBT3hSLFdBQVAsRUFBekc7QUFDQSxXQUFLOFIsQ0FBTCxDQUFPLGlCQUFQLEVBQTBCeFUsSUFBMUIsQ0FBK0Isd0NBQXdDb1UsRUFBeEMsR0FBNkMsU0FBNUU7QUFDRCxLQUhJLE1BSUEsSUFBSSxLQUFLdlQsTUFBTCxDQUFZQyxJQUFaLElBQW9CLE1BQXBCLElBQThCLEtBQUtELE1BQUwsQ0FBWUMsSUFBWixJQUFvQixHQUF0RCxFQUEyRDtBQUM5RHdULFlBQU8sS0FBS3pULE1BQUwsQ0FBWVEsT0FBWixDQUFvQkUsUUFBckIsR0FBaUMsS0FBS1YsTUFBTCxDQUFZUSxPQUFaLENBQW9CRSxRQUFwQixDQUE2QmdFLE9BQTdCLENBQXFDLElBQXJDLEVBQTJDMk8sT0FBT3hSLFdBQVAsS0FBdUIsRUFBbEUsQ0FBakMsR0FBeUd3UixPQUFPeFIsV0FBUCxLQUF1QixFQUF0STtBQUNBNlIsWUFBTyxLQUFLMVQsTUFBTCxDQUFZUSxPQUFaLENBQW9CRSxRQUFyQixHQUFpQyxLQUFLVixNQUFMLENBQVlRLE9BQVosQ0FBb0JFLFFBQXBCLENBQTZCZ0UsT0FBN0IsQ0FBcUMsSUFBckMsRUFBMkNtUCxPQUFPUixPQUFPeFIsV0FBUCxFQUFQLElBQStCLENBQTFFLENBQWpDLEdBQWdIZ1MsT0FBT1IsT0FBT3hSLFdBQVAsRUFBUCxJQUErQixDQUFySjtBQUNBLFdBQUs4UixDQUFMLENBQU8saUJBQVAsRUFBMEJ4VSxJQUExQixDQUErQnNVLE1BQU0sS0FBTixHQUFjQyxHQUE3QztBQUNEOztBQUVELFNBQUtDLENBQUwsQ0FBTyxpQkFBUCxFQUNHdFEsR0FESCxDQUNPLEtBQUtyRCxNQUFMLENBQVk4VCxjQURuQixFQUVHM0YsRUFGSCxDQUVNLEtBQUtuTyxNQUFMLENBQVk4VCxjQUZsQixFQUVrQyx5QkFGbEMsRUFFOEQsVUFBVTlILENBQVYsRUFBYTtBQUN2RSxVQUFJcE0sU0FBUyxrQkFBRW1VLGNBQUYsQ0FBaUIvSCxFQUFFcE0sTUFBbkIsRUFBMkIsVUFBVUEsTUFBVixFQUFrQjtBQUN4RCxZQUFJQSxPQUFPb1UsWUFBUCxDQUFvQix1QkFBcEIsQ0FBSixFQUFrRDtBQUNoRCxpQkFBTyxJQUFQO0FBQ0Q7QUFDRixPQUpZLENBQWI7QUFBQSxVQUlJL1QsYUFKSjtBQUtBLFVBQUlMLE1BQUosRUFBWTtBQUNWSyxlQUFPTCxPQUFPb1UsWUFBUCxDQUFvQix1QkFBcEIsQ0FBUDtBQUNBLGFBQUtDLFVBQUwsQ0FBZ0JoVSxJQUFoQjtBQUNEO0FBQ0RMLGVBQVMsSUFBVDtBQUNBSyxhQUFPLElBQVA7QUFDRCxLQVowRCxDQVl4RFAsSUFad0QsQ0FZbkQsSUFabUQsQ0FGN0Q7QUFlRDs7QUFFRDJULFdBQVMsSUFBVDtBQUNBRSxPQUFLLElBQUw7QUFDQUMsT0FBSyxJQUFMO0FBQ0FDLFFBQU0sSUFBTjtBQUNBQyxRQUFNLElBQU47QUFDQSxTQUFPLElBQVA7QUFDRCxDQXZERDtBQXdEQSxJQUFNUSxXQUFXLFNBQVhBLFFBQVcsQ0FBVUMsT0FBVixFQUFtQjtBQUFBOztBQUNsQyxNQUFJQyxVQUFVLGtCQUFFM1MsSUFBRixDQUFPMFMsT0FBUCxDQUFkO0FBQUEsTUFDRUUsaUJBQWlCLElBQUk3VSxJQUFKLENBQVM0VSxRQUFRdlMsV0FBUixFQUFULEVBQWdDdVMsUUFBUXRTLFFBQVIsRUFBaEMsRUFBb0QsQ0FBcEQsRUFBdUQsRUFBdkQsQ0FEbkI7QUFBQSxNQUVFd1MsU0FBUyxLQUFLdFUsTUFBTCxDQUFZc1QsV0FGdkI7QUFBQSxNQUdFaUIsaUJBQWtCLFlBQU07QUFDdEIsUUFBSTlCLE1BQU00QixlQUFlRyxNQUFmLEVBQVY7QUFDQSxRQUFJL0IsT0FBTyxDQUFYLEVBQWNBLE1BQU0sQ0FBTjtBQUNkQSxXQUFPLE9BQUt6UyxNQUFMLENBQVl5VSxXQUFuQjs7QUFFQSxRQUFJO0FBQ0YsYUFBTyxrQkFBRWhULElBQUYsQ0FBTzRTLGNBQVAsRUFBdUIsRUFBQ0ssS0FBSyxFQUFDclMsR0FBRyxDQUFDb1EsR0FBTCxFQUFOLEVBQXZCLENBQVA7QUFDRCxLQUZELFNBR1E7QUFDTkEsWUFBTSxJQUFOO0FBQ0Q7QUFDRixHQVhnQixFQUhuQjtBQUFBLE1BZUVrQyxpQkFmRjtBQUFBLE1BZ0JFaFQsWUFBWXlTLFFBQVF0UyxRQUFSLEVBaEJkO0FBQUEsTUFpQkU4UyxhQUFhLEVBakJmO0FBQUEsTUFrQkVwTixVQWxCRjtBQUFBLE1BbUJFdUIsVUFuQkY7QUFBQSxNQW1CSzhMLFdBbkJMO0FBQUEsTUFvQkVDLGFBQWEsS0FBS25CLENBQUwsQ0FBTyxNQUFQLEVBQWVyVCxLQUFmLEVBcEJmO0FBQUEsTUFxQkV5VSxjQUFjQyxLQUFLQyxLQUFMLENBQVdILGNBQWMsSUFBSSxDQUFsQixDQUFYLENBckJoQjtBQUFBLE1BcUJrRDtBQUNoRDVJLGVBdEJGOztBQXdCQSxNQUFJLEtBQUtsTSxNQUFMLENBQVlpVCxVQUFaLENBQXVCaUMsTUFBM0IsRUFBbUM7QUFDakNILGtCQUFjLGtCQUFFL0MsTUFBRixDQUFTLEtBQUtoUyxNQUFMLENBQVlpVCxVQUFaLENBQXVCaUMsTUFBaEMsSUFBMEMsa0JBQUVsRCxNQUFGLENBQVMsS0FBS2hTLE1BQUwsQ0FBWWlULFVBQVosQ0FBdUJrQyxhQUFoQyxDQUF4RDtBQUNEOztBQUVEUCxhQUFXLFFBQVgsSUFBdUJJLEtBQUtDLEtBQUwsQ0FBV0YsY0FBYyxDQUF6QixJQUE4QixrQkFBRS9DLE1BQUYsQ0FBUyxLQUFLaFMsTUFBTCxDQUFZaVQsVUFBWixDQUF1Qm1DLFdBQWhDLElBQStDLENBQTdFLEdBQWlGLElBQXhHO0FBQ0FSLGFBQVcsYUFBWCxJQUE0QkEsV0FBVyxRQUFYLENBQTVCO0FBQ0FBLGFBQVcsU0FBWCxJQUF3QixrQkFBRTVCLFNBQUYsQ0FBWSxLQUFLaFQsTUFBTCxDQUFZaVQsVUFBWixDQUF1Qm1DLFdBQW5DLENBQXhCOztBQUVBbEosU0FBTztBQUNMbUosZUFBVyxHQUFHQyxNQUFILENBQVUsa0JBQUtELFNBQWYsQ0FETjtBQUVMRSxVQUFNO0FBRkQsR0FBUDs7QUFLQSxNQUFJLEtBQUt2VixNQUFMLENBQVl5VSxXQUFoQixFQUE2QjtBQUMzQnZJLFNBQUttSixTQUFMLEdBQWlCbkosS0FBS21KLFNBQUwsQ0FBZUMsTUFBZixDQUFzQnBKLEtBQUttSixTQUFMLENBQWUzSyxLQUFmLENBQXFCLENBQXJCLEVBQXdCLEtBQUsxSyxNQUFMLENBQVl5VSxXQUFwQyxDQUF0QixFQUF3RTlFLE1BQXhFLENBQStFLEtBQUszUCxNQUFMLENBQVl5VSxXQUEzRixDQUFqQjtBQUNEOztBQUVEdkksT0FBS21KLFNBQUwsQ0FBZUcsT0FBZixDQUF1QixVQUFDQyxDQUFELEVBQU87QUFDNUJBLE1BQUVOLGFBQUYsR0FBa0Isa0JBQUVuQyxTQUFGLENBQVksT0FBS2hULE1BQUwsQ0FBWWlULFVBQVosQ0FBdUJrQyxhQUFuQyxDQUFsQjtBQUNELEdBRkQ7O0FBSUFSLGFBQVdKLGNBQVg7QUFDQS9NLE1BQUksQ0FBSjtBQUNBLFNBQU9BLElBQUksQ0FBWCxFQUFjO0FBQ1p1QixRQUFJLENBQUo7O0FBRFk7QUFHVjhMLFdBQUssQ0FBQyxLQUFLOUwsSUFBSSxPQUFLL0ksTUFBTCxDQUFZeVUsV0FBckIsQ0FBRCxJQUFzQyxDQUEzQztBQUNBLFVBQUlpQixXQUFXLEtBQUssa0JBQUVqVSxJQUFGLENBQU9rVCxRQUFQLEVBQWlCLEVBQUMsVUFBVSxPQUFLM1UsTUFBTCxDQUFZMlYsVUFBdkIsRUFBakIsQ0FBcEI7QUFBQSxVQUNFQyxRQUFRO0FBQ04sZUFBT3BPLENBREQ7QUFFTixlQUFPdUIsQ0FGRDtBQUdOOE0sdUJBQWdCOU0sS0FBSyxDQUhmO0FBSU4yTSxrQkFBVSxLQUFLQSxRQUpUO0FBS05JLHVCQUFlLE9BQUs5VixNQUFMLENBQVlhLElBQVosQ0FBaUJFLE9BQWpCLENBQXlCMkQsT0FBekIsQ0FBaUMsSUFBakMsRUFBdUNpUSxTQUFTekQsT0FBVCxFQUF2QyxDQUxUO0FBTU4wRCxvQkFBWSxrQkFBRXpCLEdBQUYsQ0FBTXlCLFVBQU4sQ0FOTjtBQU9ObUIsa0JBQVcsWUFBTTtBQUNmLGNBQUlDLGFBQWEsRUFBakI7O0FBRUEsY0FBSSxPQUFLaFcsTUFBTCxDQUFZaVcsVUFBaEIsRUFBNEI7QUFDMUIsZ0JBQUksT0FBS0MsYUFBTCxDQUFtQlIsUUFBbkIsQ0FBSixFQUFrQztBQUNoQ00sNEJBQWdCckIsU0FBUzdTLFFBQVQsTUFBdUJILFNBQXpCLEdBQXVDLE9BQXZDLEdBQWlELEVBQS9EO0FBQ0QsYUFGRCxNQUdLO0FBQ0hxVSw0QkFBYyxVQUFkO0FBQ0Q7QUFDRixXQVBELE1BUUs7QUFDSCxnQkFBSXJCLFNBQVM3UyxRQUFULE1BQXVCSCxTQUEzQixFQUFzQztBQUNwQyxrQkFBSStULFlBQVksa0JBQUVqVSxJQUFGLENBQU82UyxNQUFQLEVBQWUsRUFBQyxVQUFVLFVBQVgsRUFBZixDQUFoQixFQUF3RDtBQUN0RDBCLDhCQUFjLFFBQWQ7QUFDRCxlQUZELE1BRU87QUFDTEEsOEJBQWMsT0FBZDtBQUNEOztBQUVELGtCQUFJckIsU0FBU0gsTUFBVCxNQUFxQixDQUF6QixFQUE0QjtBQUMxQndCLDhCQUFjLFNBQWQ7QUFDRDtBQUNELGtCQUFJckIsU0FBU0gsTUFBVCxNQUFxQixDQUF6QixFQUE0QjtBQUMxQndCLDhCQUFjLFdBQWQ7QUFDRDtBQUNGO0FBQ0Y7O0FBRUQsaUJBQU9BLFVBQVA7QUFDRCxTQTdCUyxLQThCUixHQTlCUSxHQStCUCxZQUFNO0FBQ1AsaUJBQVEsT0FBS0csU0FBTCxDQUFlVCxRQUFmLENBQUQsR0FBNkIsT0FBS1MsU0FBTCxDQUFlVCxRQUFmLEVBQXlCeFUsS0FBekIsSUFBa0MsT0FBS2xCLE1BQUwsQ0FBWW9XLGtCQUEzRSxHQUFnRyxFQUF2RztBQUNELFNBRkMsRUEvQlEsR0FrQ1IsR0FsQ1EsR0FtQ1AsWUFBTTtBQUNQLGlCQUFRLE9BQUtDLFlBQUwsQ0FBa0JYLFFBQWxCLENBQUQsR0FBZ0MsY0FBaEMsR0FBaUQsRUFBeEQ7QUFDRCxTQUZDO0FBMUNJLE9BRFY7QUErQ0F4SixXQUFLcUosSUFBTCxDQUFVNU4sSUFBVixDQUFlaU8sS0FBZjs7QUFFQTdNO0FBQ0E0TCxpQkFBVyxrQkFBRWxULElBQUYsQ0FBT2tULFFBQVAsRUFBaUIsRUFBQ0QsS0FBSyxFQUFDclMsR0FBRyxDQUFKLEVBQU4sRUFBakIsQ0FBWDs7QUFFQXFULGlCQUFXLElBQVg7QUFDQUUsY0FBUSxJQUFSO0FBekRVOztBQUVaLFdBQU83TSxJQUFJLENBQVgsRUFBYztBQUFBO0FBd0RiO0FBQ0R2QjtBQUNEOztBQUVELE9BQUttTSxDQUFMLENBQU8sTUFBUCxFQUNHeFUsSUFESCxDQUNRLHNCQUFTd0ssTUFBVCxDQUFnQjJJLEtBQUtHLEdBQUwsQ0FBU3JPLElBQVQsQ0FBYyxJQUFkLENBQWhCLEVBQXFDOEgsSUFBckMsQ0FEUixFQUVHN0ksR0FGSCxDQUVPLEtBQUtyRCxNQUFMLENBQVk4VCxjQUZuQixFQUdHM0YsRUFISCxDQUdNLEtBQUtuTyxNQUFMLENBQVk4VCxjQUhsQixFQUdrQywyQkFIbEMsRUFHK0QsVUFBQzlILENBQUQsRUFBTztBQUNsRUEsUUFBSUEsS0FBS3NLLE9BQU94RSxLQUFoQjtBQUNBeUUsWUFBUW5TLElBQVIsU0FBbUI0SCxDQUFuQixFQUFzQixNQUF0QjtBQUNBLHNCQUFFVSxTQUFGLENBQVlWLENBQVo7QUFDRCxHQVBIOztBQVNBLE9BQUt3SyxVQUFMLEdBQWtCO0FBQ2hCdlAsV0FBT3NOLGNBRFMsRUFDT2tDLEtBQUs5QjtBQURaLEdBQWxCOztBQUlBdFUsaUJBQWUrRCxJQUFmLENBQW9CLElBQXBCLEVBQTBCLElBQTFCLEVBQWdDO0FBQzlCOUMsVUFBTSxJQUR3QjtBQUU5Qm9WLFlBQVEsVUFGc0I7QUFHOUJGLGdCQUFZLEtBQUtBO0FBSGEsR0FBaEM7QUFLQXBELGFBQVdoUCxJQUFYLENBQWdCLElBQWhCOztBQUVBZ1EsWUFBVSxJQUFWO0FBQ0FDLG1CQUFpQixJQUFqQjtBQUNBQyxXQUFTLElBQVQ7QUFDQUMsbUJBQWlCLElBQWpCO0FBQ0FJLGFBQVcsSUFBWDtBQUNBaFQsY0FBWSxJQUFaO0FBQ0FpVCxlQUFhLElBQWI7QUFDQXBOLE1BQUksSUFBSjtBQUNBdUIsTUFBSSxJQUFKO0FBQ0ErTCxlQUFhLElBQWI7QUFDQUMsZ0JBQWMsSUFBZDtBQUNBN0ksU0FBTyxJQUFQO0FBQ0QsQ0E5SUQ7QUErSUEsSUFBTXlLLGFBQWEsU0FBYkEsVUFBYSxDQUFVeEMsT0FBVixFQUFtQjtBQUFBOztBQUNwQyxNQUFJQyxVQUFVLGtCQUFFM1MsSUFBRixDQUFPMFMsT0FBUCxDQUFkO0FBQUEsTUFDRXlDLFNBQVN4QyxRQUFRdFMsUUFBUixFQURYO0FBQUEsTUFFRThTLGFBQWEsRUFGZjtBQUFBLE1BR0VwTixVQUhGO0FBQUEsTUFJRXVCLFVBSkY7QUFBQSxNQUtFOE4sVUFMRjtBQUFBLE1BTUVDLHdCQU5GO0FBQUEsTUFPRWhDLGFBQWEsS0FBS25CLENBQUwsQ0FBTyxNQUFQLEVBQWVyVCxLQUFmLEVBUGY7QUFBQSxNQVFFeVUsY0FBY0MsS0FBS0MsS0FBTCxDQUFXSCxjQUFjLElBQUksQ0FBbEIsQ0FBWCxDQVJoQjtBQUFBLE1BU0U1SSxhQVRGOztBQVdBLE1BQUksS0FBS2xNLE1BQUwsQ0FBWWlULFVBQVosQ0FBdUJpQyxNQUEzQixFQUFtQztBQUNqQ0gsa0JBQWMsa0JBQUUvQyxNQUFGLENBQVMsS0FBS2hTLE1BQUwsQ0FBWWlULFVBQVosQ0FBdUJpQyxNQUFoQyxJQUEwQyxrQkFBRWxELE1BQUYsQ0FBUyxLQUFLaFMsTUFBTCxDQUFZaVQsVUFBWixDQUF1QmtDLGFBQWhDLENBQXhEO0FBQ0Q7O0FBRURQLGFBQVcsUUFBWCxJQUF1QkksS0FBS0MsS0FBTCxDQUFXRixjQUFjLENBQXpCLElBQThCLGtCQUFFL0MsTUFBRixDQUFTLEtBQUtoUyxNQUFMLENBQVlpVCxVQUFaLENBQXVCbUMsV0FBaEMsSUFBK0MsQ0FBN0UsR0FBaUYsSUFBeEc7QUFDQVIsYUFBVyxhQUFYLElBQTRCQSxXQUFXLFFBQVgsQ0FBNUI7QUFDQUEsYUFBVyxTQUFYLElBQXdCLGtCQUFFNUIsU0FBRixDQUFZLEtBQUtoVCxNQUFMLENBQVlpVCxVQUFaLENBQXVCbUMsV0FBbkMsQ0FBeEI7O0FBRUFsSixTQUFPO0FBQ0xpSixtQkFBZSxrQkFBRW5DLFNBQUYsQ0FBWSxLQUFLaFQsTUFBTCxDQUFZaVQsVUFBWixDQUF1QmtDLGFBQW5DLENBRFY7QUFFTDRCLGtCQUFjLEtBQUsvVyxNQUFMLENBQVlhLElBQVosQ0FBaUJtVyxZQUYxQjtBQUdMekIsVUFBTTtBQUhELEdBQVA7O0FBTUF1QixvQkFBa0IsQ0FBbEI7QUFDQUQsTUFBSSxDQUFKO0FBQ0FyUCxNQUFJLENBQUo7QUFDQSxTQUFPQSxJQUFJLENBQVgsRUFBYztBQUNadUIsUUFBSSxDQUFKO0FBQ0EsV0FBT0EsSUFBSSxDQUFYLEVBQWM7QUFDWixVQUFJa08sU0FBUztBQUNYQyxhQUFLMVAsQ0FETTtBQUVYMlAsYUFBS3BPLENBRk07QUFHWHFPLHNCQUFlck8sS0FBSyxDQUhUO0FBSVhwSCxtQkFBV3lTLFFBQVF2UyxXQUFSLEtBQXdCLEdBQXhCLEdBQThCLGtCQUFFb1AsUUFBRixDQUFXNEYsSUFBSSxDQUFmLEVBQWtCLENBQWxCLENBQTlCLEdBQXFELEdBQXJELEdBQTJELGtCQUFFNUYsUUFBRixDQUFXbUQsUUFBUWxELE9BQVIsRUFBWCxFQUE4QixDQUE5QixDQUozRDtBQUtYbUcsd0JBQWdCLEtBQUtyWCxNQUFMLENBQVlhLElBQVosQ0FBaUJDLE1BQWpCLENBQXdCK1YsQ0FBeEIsQ0FMTDtBQU1YakMsb0JBQVksa0JBQUV6QixHQUFGLENBQU15QixVQUFOLENBTkQ7QUFPWG1CLGtCQUFXLFlBQU07QUFDZixjQUFJLE9BQUsvVixNQUFMLENBQVlpVyxVQUFoQixFQUE0QjtBQUMxQixtQkFBUSxPQUFLQyxhQUFMLENBQW1CVyxDQUFuQixDQUFELEdBQTBCLE1BQTFCLEdBQW1DLFNBQTFDO0FBQ0QsV0FGRCxNQUdLO0FBQ0gsbUJBQU8sTUFBUDtBQUNEO0FBQ0YsU0FQUyxLQVFSLEdBUlEsR0FTUCxZQUFNO0FBQ1AsaUJBQVNBLEtBQUtELE1BQVAsR0FBa0IsT0FBbEIsR0FBNEIsRUFBbkM7QUFDRCxTQUZDLEVBVFEsR0FZUixHQVpRLEdBYVAsWUFBTTtBQUNQLGlCQUFRLE9BQUtULFNBQUwsQ0FBZVUsQ0FBZixDQUFELEdBQXNCLE9BQUtWLFNBQUwsQ0FBZVUsQ0FBZixFQUFrQjNWLEtBQWxCLElBQTJCLE9BQUtsQixNQUFMLENBQVlvVyxrQkFBN0QsR0FBa0YsRUFBekY7QUFDRCxTQUZDO0FBcEJTLE9BQWI7QUF3QkFsSyxXQUFLcUosSUFBTCxDQUFVNU4sSUFBVixDQUFlc1AsTUFBZjtBQUNBSjtBQUNBOU47QUFDQWtPLGVBQVMsSUFBVDtBQUNEO0FBQ0R6UDtBQUNEOztBQUVELE9BQUttTSxDQUFMLENBQU8sTUFBUCxFQUNHeFUsSUFESCxDQUNRLHNCQUFTd0ssTUFBVCxDQUFnQjJJLEtBQUtJLEtBQUwsQ0FBV3RPLElBQVgsQ0FBZ0IsSUFBaEIsQ0FBaEIsRUFBdUM4SCxJQUF2QyxDQURSLEVBRUc3SSxHQUZILENBRU8sS0FBS3JELE1BQUwsQ0FBWThULGNBRm5CLEVBR0czRixFQUhILENBR00sS0FBS25PLE1BQUwsQ0FBWThULGNBSGxCLEVBR2tDLDRCQUhsQyxFQUdnRSxVQUFDOUgsQ0FBRCxFQUFPO0FBQ25FQSxRQUFJQSxLQUFLc0ssT0FBT3hFLEtBQWhCO0FBQ0F5RSxZQUFRblMsSUFBUixTQUFtQjRILENBQW5CLEVBQXNCLE9BQXRCO0FBQ0Esc0JBQUVVLFNBQUYsQ0FBWVYsQ0FBWjtBQUNELEdBUEg7O0FBU0EsT0FBS3dLLFVBQUwsR0FBa0I7QUFDaEJ2UCxXQUFPbU4sUUFBUXZTLFdBQVIsS0FBd0IsR0FBeEIsR0FBOEIsa0JBQUVvUCxRQUFGLENBQVc2RixrQkFBa0IsQ0FBN0IsRUFBZ0MsQ0FBaEMsQ0FEckI7QUFFaEJMLFNBQUtyQyxRQUFRdlMsV0FBUixLQUF3QixHQUF4QixHQUE4QixrQkFBRW9QLFFBQUYsQ0FBVzRGLENBQVgsRUFBYyxDQUFkO0FBRm5CLEdBQWxCOztBQUtBeFcsaUJBQWUrRCxJQUFmLENBQW9CLElBQXBCLEVBQTBCLElBQTFCLEVBQWdDO0FBQzlCOUMsVUFBTSxJQUR3QjtBQUU5Qm9WLFlBQVEsWUFGc0I7QUFHOUJGLGdCQUFZLEtBQUtBO0FBSGEsR0FBaEM7QUFLQXBELGFBQVdoUCxJQUFYLENBQWdCLElBQWhCOztBQUVBZ1EsWUFBVSxJQUFWO0FBQ0F3QyxXQUFTLElBQVQ7QUFDQWhDLGVBQWEsSUFBYjtBQUNBcE4sTUFBSSxJQUFKO0FBQ0F1QixNQUFJLElBQUo7QUFDQThOLE1BQUksSUFBSjtBQUNBQyxvQkFBa0IsSUFBbEI7QUFDQWhDLGVBQWEsSUFBYjtBQUNBQyxnQkFBYyxJQUFkO0FBQ0E3SSxTQUFPLElBQVA7QUFDRCxDQS9GRDtBQWdHQSxJQUFNb0wsWUFBWSxTQUFaQSxTQUFZLENBQVVuRCxPQUFWLEVBQW1CO0FBQUE7O0FBQ25DLE1BQUlDLFVBQVUsa0JBQUUzUyxJQUFGLENBQU8wUyxPQUFQLENBQWQ7QUFBQSxNQUNFb0QsUUFBUW5ELFFBQVF2UyxXQUFSLEVBRFY7QUFBQSxNQUVFK1MsYUFBYSxFQUZmO0FBQUEsTUFHRXBOLFVBSEY7QUFBQSxNQUlFdUIsVUFKRjtBQUFBLE1BS0V5TyxVQUxGO0FBQUEsTUFNRUMsdUJBTkY7QUFBQSxNQU9FM0MsYUFBYSxLQUFLbkIsQ0FBTCxDQUFPLE1BQVAsRUFBZXJULEtBQWYsRUFQZjtBQUFBLE1BUUV5VSxjQUFjQyxLQUFLQyxLQUFMLENBQVdILGNBQWMsSUFBSSxDQUFsQixDQUFYLENBUmhCO0FBQUEsTUFTRTVJLGFBVEY7O0FBV0EsTUFBSSxLQUFLbE0sTUFBTCxDQUFZaVQsVUFBWixDQUF1QmlDLE1BQTNCLEVBQW1DO0FBQ2pDSCxrQkFBYyxrQkFBRS9DLE1BQUYsQ0FBUyxLQUFLaFMsTUFBTCxDQUFZaVQsVUFBWixDQUF1QmlDLE1BQWhDLElBQTBDLGtCQUFFbEQsTUFBRixDQUFTLEtBQUtoUyxNQUFMLENBQVlpVCxVQUFaLENBQXVCa0MsYUFBaEMsQ0FBeEQ7QUFDRDs7QUFFRFAsYUFBVyxRQUFYLElBQXVCSSxLQUFLQyxLQUFMLENBQVdGLGNBQWMsQ0FBekIsSUFBOEIsa0JBQUUvQyxNQUFGLENBQVMsS0FBS2hTLE1BQUwsQ0FBWWlULFVBQVosQ0FBdUJtQyxXQUFoQyxJQUErQyxDQUE3RSxHQUFpRixJQUF4RztBQUNBUixhQUFXLGFBQVgsSUFBNEJBLFdBQVcsUUFBWCxDQUE1QjtBQUNBQSxhQUFXLFNBQVgsSUFBd0Isa0JBQUU1QixTQUFGLENBQVksS0FBS2hULE1BQUwsQ0FBWWlULFVBQVosQ0FBdUJtQyxXQUFuQyxDQUF4Qjs7QUFFQWxKLFNBQU87QUFDTGlKLG1CQUFlLGtCQUFFbkMsU0FBRixDQUFZLEtBQUtoVCxNQUFMLENBQVlpVCxVQUFaLENBQXVCa0MsYUFBbkMsQ0FEVjtBQUVMNEIsa0JBQWMsS0FBSy9XLE1BQUwsQ0FBWWEsSUFBWixDQUFpQjZXLFdBRjFCO0FBR0xuQyxVQUFNO0FBSEQsR0FBUDs7QUFNQWtDLG1CQUFpQkYsUUFBUSxFQUF6QjtBQUNBQyxNQUFJRCxRQUFRLEVBQVo7QUFDQS9QLE1BQUksQ0FBSjtBQUNBLFNBQU9BLElBQUksQ0FBWCxFQUFjO0FBQ1p1QixRQUFJLENBQUo7QUFDQSxXQUFPQSxJQUFJLENBQVgsRUFBYztBQUNaLFVBQUk0TyxRQUFRO0FBQ1ZULGFBQUsxUCxDQURLO0FBRVYyUCxhQUFLcE8sQ0FGSztBQUdWcU8sc0JBQWVyTyxLQUFLLENBSFY7QUFJVjZPLGtCQUFVSixJQUFJLEdBQUosR0FBVSxrQkFBRXZHLFFBQUYsQ0FBV21ELFFBQVF0UyxRQUFSLEtBQXFCLENBQWhDLEVBQW1DLENBQW5DLENBQVYsR0FBa0QsR0FBbEQsR0FBd0Qsa0JBQUVtUCxRQUFGLENBQVdtRCxRQUFRbEQsT0FBUixFQUFYLEVBQThCLENBQTlCLENBSnhEO0FBS1YyRyx1QkFBZSxLQUFLN1gsTUFBTCxDQUFZYSxJQUFaLENBQWlCSCxRQUFqQixDQUEwQmdFLE9BQTFCLENBQWtDLElBQWxDLEVBQXlDOFMsQ0FBekMsQ0FMTDtBQU1WNUMsb0JBQVksa0JBQUV6QixHQUFGLENBQU15QixVQUFOLENBTkY7QUFPVm1CLGtCQUFXLFlBQU07QUFDZixjQUFJLE9BQUsvVixNQUFMLENBQVlpVyxVQUFoQixFQUE0QjtBQUMxQixtQkFBUSxPQUFLQyxhQUFMLENBQW1Cc0IsQ0FBbkIsQ0FBRCxHQUEwQixNQUExQixHQUFtQyxTQUExQztBQUNELFdBRkQsTUFHSztBQUNILG1CQUFPLE1BQVA7QUFDRDtBQUNGLFNBUFMsS0FRUixHQVJRLEdBU1AsWUFBTTtBQUNQLGlCQUFTQSxLQUFLRCxLQUFQLEdBQWlCLE9BQWpCLEdBQTJCLEVBQWxDO0FBQ0QsU0FGQyxFQVRRLEdBWVIsR0FaUSxHQWFQLFlBQU07QUFDUCxpQkFBUSxPQUFLckIsYUFBTCxDQUFtQnNCLENBQW5CLENBQUQsR0FBMEIsT0FBS3RCLGFBQUwsQ0FBbUJzQixDQUFuQixFQUFzQnRXLEtBQXRCLElBQStCLE9BQUtsQixNQUFMLENBQVlvVyxrQkFBckUsR0FBMEYsRUFBakc7QUFDRCxTQUZDO0FBcEJRLE9BQVo7QUF3QkFsSyxXQUFLcUosSUFBTCxDQUFVNU4sSUFBVixDQUFlZ1EsS0FBZjtBQUNBSDtBQUNBek87QUFDQTRPLGNBQVEsSUFBUjtBQUNEO0FBQ0RuUTtBQUNEOztBQUVELE9BQUttTSxDQUFMLENBQU8sTUFBUCxFQUNHeFUsSUFESCxDQUNRLHNCQUFTd0ssTUFBVCxDQUFnQjJJLEtBQUtLLElBQUwsQ0FBVXZPLElBQVYsQ0FBZSxJQUFmLENBQWhCLEVBQXNDOEgsSUFBdEMsQ0FEUixFQUVHN0ksR0FGSCxDQUVPLEtBQUtyRCxNQUFMLENBQVk4VCxjQUZuQixFQUdHM0YsRUFISCxDQUdNLEtBQUtuTyxNQUFMLENBQVk4VCxjQUhsQixFQUdrQywyQkFIbEMsRUFHK0QsVUFBQzlILENBQUQsRUFBTztBQUNsRUEsUUFBS0EsS0FBS3NLLE9BQU94RSxLQUFqQjtBQUNBeUUsWUFBUW5TLElBQVIsU0FBbUI0SCxDQUFuQixFQUFzQixNQUF0QjtBQUNBLHNCQUFFVSxTQUFGLENBQVlWLENBQVo7QUFDRCxHQVBIOztBQVNBLE9BQUt3SyxVQUFMLEdBQWtCO0FBQ2hCdlAsV0FBT3dRLGNBRFMsRUFDT2hCLEtBQUtlLElBQUk7QUFEaEIsR0FBbEI7O0FBSUFuWCxpQkFBZStELElBQWYsQ0FBb0IsSUFBcEIsRUFBMEIsSUFBMUIsRUFBZ0M7QUFDOUI5QyxVQUFNLElBRHdCO0FBRTlCb1YsWUFBUSxXQUZzQjtBQUc5QkYsZ0JBQVksS0FBS0E7QUFIYSxHQUFoQztBQUtBcEQsYUFBV2hQLElBQVgsQ0FBZ0IsSUFBaEI7O0FBRUFnUSxZQUFVLElBQVY7QUFDQW1ELFVBQVEsSUFBUjtBQUNBM0MsZUFBYSxJQUFiO0FBQ0FwTixNQUFJLElBQUo7QUFDQXVCLE1BQUksSUFBSjtBQUNBeU8sTUFBSSxJQUFKO0FBQ0FDLG1CQUFpQixJQUFqQjtBQUNBM0MsZUFBYSxJQUFiO0FBQ0FDLGdCQUFjLElBQWQ7QUFDQTdJLFNBQU8sSUFBUDtBQUNELENBOUZEO0FBK0ZBLElBQU1xSyxVQUFVLFNBQVZBLE9BQVUsQ0FBVXZLLENBQVYsRUFBYS9MLElBQWIsRUFBbUJMLE1BQW5CLEVBQTJCbUQsS0FBM0IsRUFBa0M7QUFBQTs7QUFDaEQsTUFBSStVLGdCQUFKO0FBQUEsTUFDRUMsV0FERjtBQUFBLE1BRUU5QixtQkFGRjs7QUFJQWhXLFNBQU9BLFFBQVEsTUFBZjtBQUNBTCxXQUFTLGtCQUFFbVUsY0FBRixDQUFpQi9ILEVBQUVwTSxNQUFuQixFQUEyQixVQUFVQSxNQUFWLEVBQWtCO0FBQ3BELFFBQUlBLE9BQU9vVSxZQUFQLENBQW9CLHdCQUF3Qi9ULElBQTVDLENBQUosRUFBdUQ7QUFDckQsYUFBTyxJQUFQO0FBQ0Q7QUFDRixHQUpRLENBQVQ7QUFLQSxNQUFJTCxNQUFKLEVBQVk7QUFDVm1ELFlBQVFuRCxPQUFPb1UsWUFBUCxDQUFvQix3QkFBd0IvVCxJQUE1QyxDQUFSOztBQUVBOFgsU0FBSyxrQkFBRXRXLElBQUYsQ0FBT3NCLEtBQVAsRUFBYyxFQUFDLFVBQVUsS0FBSy9DLE1BQUwsQ0FBWTJWLFVBQXZCLEVBQWQsQ0FBTDtBQUNBTSxpQkFBYSxJQUFiO0FBQ0EsU0FBSytCLGVBQUwsR0FBd0IsS0FBS2hZLE1BQUwsQ0FBWWlZLGNBQWIsR0FBZ0Msa0JBQUV4SSxRQUFGLENBQVcsS0FBS3pQLE1BQUwsQ0FBWWlZLGNBQXZCLENBQUQsR0FBMkMsS0FBS2pZLE1BQUwsQ0FBWWlZLGNBQXZELEdBQXdFLENBQXZHLEdBQTJHLENBQWxJOztBQUVBLFFBQUksS0FBS2pZLE1BQUwsQ0FBWWlXLFVBQWhCLEVBQTRCO0FBQzFCLFVBQUksQ0FBQyxLQUFLQyxhQUFMLENBQW1CNkIsRUFBbkIsQ0FBTCxFQUE2QjlCLGFBQWEsS0FBYjtBQUM5Qjs7QUFFRCxRQUFJaFcsUUFBUSxNQUFaLEVBQW9CO0FBQ2xCLFVBQUlnVyxVQUFKLEVBQWdCOztBQUVkLFlBQUksS0FBS2pKLFNBQUwsQ0FBZXpLLE1BQWYsSUFBeUIsS0FBS3lWLGVBQWxDLEVBQW1EO0FBQ2pERixvQkFBVSxLQUFLOUssU0FBTCxDQUFlMkMsTUFBZixDQUFzQixDQUF0QixFQUF5QixLQUFLM0MsU0FBTCxDQUFlekssTUFBZixJQUF5QixLQUFLeVYsZUFBTCxHQUF1QixDQUFoRCxDQUF6QixDQUFWO0FBQ0FGLGtCQUFRdEMsT0FBUixDQUFnQixVQUFDblQsQ0FBRCxFQUFPO0FBQ3JCLG1CQUFLc1IsQ0FBTCxDQUFPLE1BQVAsRUFBZTdGLElBQWYsQ0FBb0IsK0JBQStCLGtCQUFFck0sSUFBRixDQUFPWSxDQUFQLEVBQVUsRUFBQyxVQUFVLE9BQUtyQyxNQUFMLENBQVkyVixVQUF2QixFQUFWLENBQS9CLEdBQStFLElBQW5HLEVBQXlHdUMsV0FBekcsQ0FBcUgsY0FBckg7QUFDRCxXQUZEO0FBR0Q7O0FBRUQsNkJBQU90WSxNQUFQLEVBQWVtVyxRQUFmLENBQXdCLGNBQXhCO0FBQ0EsYUFBSy9JLFNBQUwsQ0FBZXJGLElBQWYsQ0FBb0I1RSxLQUFwQjs7QUFFQSxZQUFJLEtBQUs1QixPQUFULEVBQWtCO0FBQ2hCLGVBQUtBLE9BQUwsQ0FBYWlELElBQWIsQ0FBa0I7QUFDaEI5QyxrQkFBTSxJQURVLEVBQ0pHLE1BQU1zQixLQURGLEVBQ1NuRCxRQUFRLEtBQUtBLE1BRHRCLEVBQzhCdVksYUFBYXZZO0FBRDNDLFdBQWxCO0FBR0Q7QUFDRjtBQUNGLEtBbkJELE1Bb0JLLElBQUlLLFFBQVEsT0FBWixFQUFxQjtBQUN4QixVQUFJLEtBQUtELE1BQUwsQ0FBWUUsVUFBWixJQUEwQixPQUE5QixFQUF1QztBQUNyQyxZQUFJK1YsVUFBSixFQUFnQjtBQUNkLGNBQUksS0FBS2pKLFNBQUwsQ0FBZXpLLE1BQWYsSUFBeUIsS0FBS3lWLGVBQWxDLEVBQW1EO0FBQ2pERixzQkFBVSxLQUFLOUssU0FBTCxDQUFlMkMsTUFBZixDQUFzQixDQUF0QixFQUF5QixLQUFLM0MsU0FBTCxDQUFlekssTUFBZixJQUF5QixLQUFLeVYsZUFBTCxHQUF1QixDQUFoRCxDQUF6QixDQUFWO0FBQ0FGLG9CQUFRdEMsT0FBUixDQUFnQixVQUFDblQsQ0FBRCxFQUFPO0FBQ3JCLHFCQUFLc1IsQ0FBTCxDQUFPLE1BQVAsRUFBZTdGLElBQWYsQ0FBb0IsZ0NBQWdDLGtCQUFFck0sSUFBRixDQUFPWSxDQUFQLEVBQVUsRUFBQyxVQUFVLFlBQVgsRUFBVixDQUFoQyxHQUFzRSxJQUExRixFQUFnRzZWLFdBQWhHLENBQTRHLGdCQUE1RztBQUNELGFBRkQ7QUFHRDs7QUFFRCwrQkFBT3RZLE1BQVAsRUFBZW1XLFFBQWYsQ0FBd0IsZ0JBQXhCO0FBQ0EsZUFBSy9JLFNBQUwsQ0FBZXJGLElBQWYsQ0FBb0I1RSxLQUFwQjs7QUFFQSxjQUFJLEtBQUs1QixPQUFULEVBQWtCO0FBQ2hCLGlCQUFLQSxPQUFMLENBQWFpRCxJQUFiLENBQWtCO0FBQ2hCOUMsb0JBQU0sSUFEVSxFQUNKRyxNQUFNc0IsS0FERixFQUNTbkQsUUFBUSxLQUFLQSxNQUR0QixFQUM4QnVZLGFBQWF2WTtBQUQzQyxhQUFsQjtBQUdEO0FBQ0Y7QUFDRixPQWxCRCxNQW1CSztBQUNILGFBQUtxVSxVQUFMLENBQWdCLEtBQWhCLEVBQXVCbFIsS0FBdkI7QUFDRDtBQUNGLEtBdkJJLE1Bd0JBLElBQUk5QyxRQUFRLE1BQVosRUFBb0I7QUFDdkIsVUFBSSxLQUFLRCxNQUFMLENBQVlFLFVBQVosSUFBMEIsTUFBOUIsRUFBc0M7QUFDcEMsWUFBSStWLFVBQUosRUFBZ0I7QUFDZCxjQUFJLEtBQUtqSixTQUFMLENBQWV6SyxNQUFmLElBQXlCLEtBQUt5VixlQUFsQyxFQUFtRDtBQUNqREYsc0JBQVUsS0FBSzlLLFNBQUwsQ0FBZTJDLE1BQWYsQ0FBc0IsQ0FBdEIsRUFBeUIsS0FBSzNDLFNBQUwsQ0FBZXpLLE1BQWYsSUFBeUIsS0FBS3lWLGVBQUwsR0FBdUIsQ0FBaEQsQ0FBekIsQ0FBVjtBQUNBRixvQkFBUXRDLE9BQVIsQ0FBZ0IsVUFBQ25ULENBQUQsRUFBTztBQUNyQixxQkFBS3NSLENBQUwsQ0FBTyxNQUFQLEVBQWU3RixJQUFmLENBQW9CLCtCQUErQixrQkFBRXJNLElBQUYsQ0FBT1ksQ0FBUCxFQUFVLEVBQUMsVUFBVSxZQUFYLEVBQVYsQ0FBL0IsR0FBcUUsSUFBekYsRUFBK0Y2VixXQUEvRixDQUEyRyxlQUEzRztBQUNELGFBRkQ7QUFHRDs7QUFFRCwrQkFBT3RZLE1BQVAsRUFBZW1XLFFBQWYsQ0FBd0IsZUFBeEI7QUFDQSxlQUFLL0ksU0FBTCxDQUFlckYsSUFBZixDQUFvQjVFLEtBQXBCOztBQUVBLGNBQUksS0FBSzVCLE9BQVQsRUFBa0I7QUFDaEIsaUJBQUtBLE9BQUwsQ0FBYWlELElBQWIsQ0FBa0I7QUFDaEI5QyxvQkFBTSxJQURVLEVBQ0pHLE1BQU1zQixLQURGLEVBQ1NuRCxRQUFRLEtBQUtBLE1BRHRCLEVBQzhCdVksYUFBYXZZO0FBRDNDLGFBQWxCO0FBR0Q7QUFDRjtBQUNGLE9BbEJELE1BbUJLO0FBQ0gsYUFBS3FVLFVBQUwsQ0FBZ0IsT0FBaEIsRUFBeUJsUixLQUF6QjtBQUNEO0FBQ0Y7QUFDRjs7QUFFRDlDLFNBQU8sSUFBUDtBQUNBTCxXQUFTLElBQVQ7QUFDQW1ELFVBQVEsSUFBUjtBQUNBK1UsWUFBVSxJQUFWO0FBQ0FDLE9BQUssSUFBTDtBQUNBOUIsZUFBYSxJQUFiO0FBQ0QsQ0FsR0Q7QUFtR0EsSUFBTW1DLE9BQU8sU0FBUEEsSUFBTyxDQUFVcE0sQ0FBVixFQUFhcE0sTUFBYixFQUFxQm1ELEtBQXJCLEVBQTRCO0FBQ3ZDbkQsV0FBUyxrQkFBRW1VLGNBQUYsQ0FBaUIvSCxFQUFFcE0sTUFBbkIsRUFBMkIsVUFBVUEsTUFBVixFQUFrQjtBQUNwRCxRQUFJQSxPQUFPb1UsWUFBUCxDQUFvQixvQkFBcEIsQ0FBSixFQUErQztBQUM3QyxhQUFPLElBQVA7QUFDRDtBQUNGLEdBSlEsQ0FBVDtBQUtBLE1BQUlwVSxNQUFKLEVBQVk7QUFDVm1ELFlBQVFuRCxPQUFPb1UsWUFBUCxDQUFvQixvQkFBcEIsQ0FBUjtBQUNBLFFBQUksS0FBS2hVLE1BQUwsQ0FBWUMsSUFBWixJQUFvQixLQUFwQixJQUE2QixLQUFLRCxNQUFMLENBQVlDLElBQVosSUFBb0IsR0FBckQsRUFBMEQ7QUFDeEQsVUFBSThDLFNBQVMsTUFBYixFQUFxQjtBQUNuQixhQUFLL0MsTUFBTCxDQUFZc1QsV0FBWixHQUEwQixrQkFBRTdSLElBQUYsQ0FBTyxLQUFLekIsTUFBTCxDQUFZc1QsV0FBbkIsRUFBZ0MsRUFBQ29CLEtBQUssRUFBQ21DLEdBQUcsQ0FBQyxDQUFMLEVBQU4sRUFBaEMsQ0FBMUI7QUFDRCxPQUZELE1BR0s7QUFDSCxhQUFLN1csTUFBTCxDQUFZc1QsV0FBWixHQUEwQixrQkFBRTdSLElBQUYsQ0FBTyxLQUFLekIsTUFBTCxDQUFZc1QsV0FBbkIsRUFBZ0MsRUFBQ29CLEtBQUssRUFBQ21DLEdBQUcsQ0FBSixFQUFOLEVBQWhDLENBQTFCO0FBQ0Q7QUFDRDNDLGVBQVM5UCxJQUFULENBQWMsSUFBZCxFQUFvQixLQUFLcEUsTUFBTCxDQUFZc1QsV0FBaEM7QUFDRCxLQVJELE1BU0ssSUFBSSxLQUFLdFQsTUFBTCxDQUFZQyxJQUFaLElBQW9CLE9BQXBCLElBQStCLEtBQUtELE1BQUwsQ0FBWUMsSUFBWixJQUFvQixHQUF2RCxFQUE0RDtBQUMvRCxVQUFJOEMsU0FBUyxNQUFiLEVBQXFCO0FBQ25CLGFBQUsvQyxNQUFMLENBQVlzVCxXQUFaLEdBQTBCLGtCQUFFN1IsSUFBRixDQUFPLEtBQUt6QixNQUFMLENBQVlzVCxXQUFuQixFQUFnQyxFQUFDb0IsS0FBSyxFQUFDOEMsR0FBRyxDQUFDLENBQUwsRUFBTixFQUFoQyxDQUExQjtBQUNELE9BRkQsTUFHSztBQUNILGFBQUt4WCxNQUFMLENBQVlzVCxXQUFaLEdBQTBCLGtCQUFFN1IsSUFBRixDQUFPLEtBQUt6QixNQUFMLENBQVlzVCxXQUFuQixFQUFnQyxFQUFDb0IsS0FBSyxFQUFDOEMsR0FBRyxDQUFKLEVBQU4sRUFBaEMsQ0FBMUI7QUFDRDtBQUNEYixpQkFBV3ZTLElBQVgsQ0FBZ0IsSUFBaEIsRUFBc0IsS0FBS3BFLE1BQUwsQ0FBWXNULFdBQWxDO0FBQ0QsS0FSSSxNQVNBLElBQUksS0FBS3RULE1BQUwsQ0FBWUMsSUFBWixJQUFvQixNQUFwQixJQUE4QixLQUFLRCxNQUFMLENBQVlDLElBQVosSUFBb0IsR0FBdEQsRUFBMkQ7QUFDOUQsVUFBSThDLFNBQVMsTUFBYixFQUFxQjtBQUNuQixhQUFLL0MsTUFBTCxDQUFZc1QsV0FBWixHQUEwQixrQkFBRTdSLElBQUYsQ0FBTyxLQUFLekIsTUFBTCxDQUFZc1QsV0FBbkIsRUFBZ0MsRUFBQ29CLEtBQUssRUFBQzhDLEdBQUcsQ0FBQyxFQUFMLEVBQU4sRUFBaEMsQ0FBMUI7QUFDRCxPQUZELE1BR0s7QUFDSCxhQUFLeFgsTUFBTCxDQUFZc1QsV0FBWixHQUEwQixrQkFBRTdSLElBQUYsQ0FBTyxLQUFLekIsTUFBTCxDQUFZc1QsV0FBbkIsRUFBZ0MsRUFBQ29CLEtBQUssRUFBQzhDLEdBQUcsRUFBSixFQUFOLEVBQWhDLENBQTFCO0FBQ0Q7QUFDREYsZ0JBQVVsVCxJQUFWLENBQWUsSUFBZixFQUFxQixLQUFLcEUsTUFBTCxDQUFZc1QsV0FBakM7QUFDRDtBQUNGOztBQUVEMVQsV0FBUyxJQUFUO0FBQ0FtRCxVQUFRLElBQVI7QUFDRCxDQXZDRDtBQXdDQSxJQUFNc1YsaUJBQWlCLFNBQWpCQSxjQUFpQixHQUFZO0FBQ2pDQyxhQUFZLFlBQVk7QUFDdEIsUUFBSSxLQUFLdFksTUFBTCxDQUFZQyxJQUFaLEtBQXFCLEtBQXJCLElBQThCLEtBQUtELE1BQUwsQ0FBWUMsSUFBWixLQUFxQixHQUF2RCxFQUE0RDtBQUMxRCxXQUFLLElBQUk4SSxDQUFULElBQWMsS0FBS29OLFNBQW5CLEVBQThCO0FBQzVCLGFBQUt4QyxDQUFMLENBQU8sTUFBUCxFQUFlN0YsSUFBZixDQUFvQiwrQkFBK0IvRSxDQUEvQixHQUFtQyxJQUF2RCxFQUE2RGdOLFFBQTdELENBQXNFLEtBQUtJLFNBQUwsQ0FBZXBOLENBQWYsRUFBa0I3SCxLQUFsQixJQUEyQixLQUFLbEIsTUFBTCxDQUFZb1csa0JBQTdHO0FBQ0Q7QUFDRjtBQUNGLEdBTlUsQ0FNUjFXLElBTlEsQ0FNSCxJQU5HLENBQVg7QUFPRCxDQVJEO0FBU0EsSUFBTTZZLG9CQUFvQixTQUFwQkEsaUJBQW9CLEdBQVk7QUFDcENELGFBQVksWUFBWTtBQUN0QixTQUFLLElBQUl2UCxDQUFULElBQWMsS0FBS3NOLFlBQW5CLEVBQWlDO0FBQy9CLFdBQUsxQyxDQUFMLENBQU8sTUFBUCxFQUFlN0YsSUFBZixDQUFvQiwrQkFBK0IvRSxDQUEvQixHQUFtQyxJQUF2RCxFQUE2RGdOLFFBQTdELENBQXNFLGNBQXRFO0FBQ0Q7QUFDRixHQUpVLENBSVJyVyxJQUpRLENBSUgsSUFKRyxDQUFYO0FBS0QsQ0FORDtBQU9BLElBQU04WSxpQkFBaUIsU0FBakJBLGNBQWlCLEdBQVk7QUFDakNGLGFBQVksWUFBWTtBQUN0QixRQUFJLEtBQUt0WSxNQUFMLENBQVlDLElBQVosS0FBcUIsS0FBckIsSUFBOEIsS0FBS0QsTUFBTCxDQUFZQyxJQUFaLEtBQXFCLEdBQXZELEVBQTREO0FBQzFELFdBQUssSUFBSThJLENBQVQsSUFBYyxLQUFLMFAsU0FBbkIsRUFBOEI7QUFDNUIsWUFBSSxLQUFLQSxTQUFMLENBQWUxUCxDQUFmLEVBQWtCOUgsS0FBdEIsRUFBNkI7QUFDM0IsZUFBSzBTLENBQUwsQ0FBTyxNQUFQLEVBQWU3RixJQUFmLENBQW9CLCtCQUErQi9FLENBQS9CLEdBQW1DLElBQXZELEVBQTZEK0UsSUFBN0QsQ0FBa0UsZUFBbEUsRUFBbUYzTyxJQUFuRixDQUF3RixLQUFLc1osU0FBTCxDQUFlMVAsQ0FBZixFQUFrQjlILEtBQTFHO0FBQ0Q7QUFDRCxhQUFLMFMsQ0FBTCxDQUFPLE1BQVAsRUFBZTdGLElBQWYsQ0FBb0IsK0JBQStCL0UsQ0FBL0IsR0FBbUMsSUFBdkQsRUFBNkRnTixRQUE3RCxDQUFzRSxLQUFLMEMsU0FBTCxDQUFlMVAsQ0FBZixFQUFrQjdILEtBQXhGO0FBQ0Q7QUFDRjtBQUNGLEdBVFUsQ0FTUnhCLElBVFEsQ0FTSCxJQVRHLENBQVg7QUFVRCxDQVhEO0FBWUEsSUFBTWdaLGlCQUFpQixTQUFqQkEsY0FBaUIsR0FBWTtBQUNqQyxNQUFJLEtBQUsxWSxNQUFMLENBQVlDLElBQVosS0FBcUIsS0FBckIsSUFBOEIsS0FBS0QsTUFBTCxDQUFZQyxJQUFaLEtBQXFCLEdBQXZELEVBQTREO0FBQzFELFNBQUssSUFBSThJLENBQVQsSUFBYyxLQUFLMFAsU0FBbkIsRUFBOEI7QUFDNUIsV0FBSzlFLENBQUwsQ0FBTyxNQUFQLEVBQWU3RixJQUFmLENBQW9CLCtCQUErQi9FLENBQS9CLEdBQW1DLElBQXZELEVBQTZEK0UsSUFBN0QsQ0FBa0UsZUFBbEUsRUFBbUY2SyxLQUFuRjtBQUNBLFdBQUtoRixDQUFMLENBQU8sTUFBUCxFQUFlN0YsSUFBZixDQUFvQiwrQkFBK0IvRSxDQUEvQixHQUFtQyxJQUF2RCxFQUE2RG1QLFdBQTdELENBQXlFLEtBQUtPLFNBQUwsQ0FBZTFQLENBQWYsRUFBa0I3SCxLQUEzRjtBQUNEO0FBQ0Y7QUFDRixDQVBEO0FBUUE7O0FBRUE7Ozs7SUFHTTBYLGE7OztBQUNKOzs7Ozs7Ozs7Ozs7OztBQWNBLHlCQUFZNVksTUFBWixFQUFvQjtBQUFBOztBQUFBOztBQUdsQixXQUFLQSxNQUFMLEdBQWM7QUFDWjhULHNCQUFnQixPQURKO0FBRVo1UyxhQUFPLFNBRks7QUFHWnVULG1CQUFhLENBSEQ7QUFJWnhVLFlBQU0sS0FKTSxFQUlDO0FBQ2IwVixrQkFBWSxZQUxBO0FBTVpyQyxtQkFBYyxJQUFJOVQsSUFBSixFQU5GO0FBT1pxUCxtQkFBYSxHQVBEO0FBUVpvRSxrQkFBWTtBQUNWQyx1QkFBZSxJQURMO0FBRVYyRiw0QkFBb0IsSUFGVjtBQUdWMUQsdUJBQWUsSUFITDtBQUlWQyxxQkFBYTtBQUpILE9BUkE7QUFjWnZVLFlBQU07QUFDSjZXLHFCQUFhLGlCQURUO0FBRUpWLHNCQUFjLGtCQUZWO0FBR0p0VyxrQkFBVSxJQUhOO0FBSUpJLGdCQUFRLGtCQUFLQSxNQUFMLElBQWUsQ0FBQyxLQUFELEVBQVEsS0FBUixFQUFlLEtBQWYsRUFBc0IsS0FBdEIsRUFBNkIsS0FBN0IsRUFBb0MsS0FBcEMsRUFBMkMsS0FBM0MsRUFBa0QsS0FBbEQsRUFBeUQsS0FBekQsRUFBZ0UsS0FBaEUsRUFBdUUsS0FBdkUsRUFBOEUsS0FBOUUsQ0FKbkI7QUFLSkMsaUJBQVM7QUFMTCxPQWRNO0FBcUJaa1gsc0JBQWdCLEtBckJKO0FBc0JaL1gsa0JBQVksS0F0QkE7QUF1QlprVywwQkFBb0IsU0F2QlI7QUF3QlowQywwQkFBb0I7QUF4QlIsS0FBZDtBQTBCQSxvQkFBT2hLLE1BQVAsQ0FBYyxJQUFkLEVBQW9CLE9BQUs5TyxNQUF6QixFQUFpQ0EsTUFBakM7O0FBRUE7QUFDQSxXQUFLMk4sT0FBTCxHQUFlLElBQWY7QUFDQSxXQUFLWCxTQUFMLEdBQWlCLEVBQWpCO0FBQ0EsV0FBS3FKLFlBQUwsR0FBb0IsRUFBcEI7QUFDQSxXQUFLSCxhQUFMLEdBQXFCLEVBQXJCO0FBQ0EsV0FBS0MsU0FBTCxHQUFpQixFQUFqQjtBQUNBLFdBQUtLLFVBQUwsR0FBa0I7QUFDaEJ2UCxhQUFPLEVBRFMsRUFDTHdQLEtBQUs7QUFEQSxLQUFsQjtBQUdBLFdBQUt1QixlQUFMLEdBQXVCLENBQXZCOztBQUVBLFdBQUsvSSxJQUFMO0FBMUNrQjtBQTJDbkI7O0FBRUQ7Ozs7Ozs7Ozs7OzJCQU9PO0FBQUE7O0FBQ0wsV0FBSzVPLGNBQUwsR0FBc0IsS0FBS0wsTUFBTCxDQUFZSyxjQUFsQztBQUNBLGFBQU8sS0FBS0wsTUFBTCxDQUFZSyxjQUFuQjtBQUNBLFdBQUtjLE9BQUwsR0FBZSxLQUFLbkIsTUFBTCxDQUFZbUIsT0FBM0I7QUFDQSxhQUFPLEtBQUtuQixNQUFMLENBQVltQixPQUFuQjs7QUFFQSxVQUFJLENBQUMsS0FBS25CLE1BQUwsQ0FBWUosTUFBakIsRUFBeUI7QUFDdkJpRCxnQkFBUUMsR0FBUixDQUFZLGtCQUFLaUwsUUFBTCxDQUFjLGFBQWQsRUFBNkIsS0FBN0IsRUFBb0MsV0FBcEMsQ0FBWjtBQUNEO0FBQ0QsV0FBS0osT0FBTCxHQUFlLHFCQUFPLEtBQUszTixNQUFMLENBQVlKLE1BQW5CLENBQWY7QUFDQSxXQUFLSSxNQUFMLENBQVlzVCxXQUFaLEdBQTBCLGtCQUFFN1IsSUFBRixDQUFPLEtBQUt6QixNQUFMLENBQVlzVCxXQUFuQixDQUExQjs7QUFFQSxXQUFLM0YsT0FBTCxDQUFheE8sSUFBYixDQUFrQjBULFNBQVN6TyxJQUFULENBQWMsSUFBZCxDQUFsQjs7QUFFQTtBQUNBLFdBQUt1UCxDQUFMLEdBQVM7QUFDUCxnQkFBUSxLQUFLaEcsT0FBTCxDQUFhRyxJQUFiLENBQWtCLDRCQUFsQixDQUREO0FBRVAsbUJBQVcsS0FBS0gsT0FBTCxDQUFhRyxJQUFiLENBQWtCLCtCQUFsQixDQUZKO0FBR1AsMkJBQW1CLEtBQUtILE9BQUwsQ0FBYUcsSUFBYixDQUFrQix1Q0FBbEIsQ0FIWjtBQUlQLGdCQUFRLEtBQUtILE9BQUwsQ0FBYUcsSUFBYixDQUFrQiw0QkFBbEI7QUFKRCxPQUFUOztBQU9BLFVBQUksS0FBSzlOLE1BQUwsQ0FBWVEsT0FBaEIsRUFBeUI7QUFDdkIsYUFBS21ULENBQUwsQ0FBTyxNQUFQLEVBQWV4RixFQUFmLENBQWtCLEtBQUtuTyxNQUFMLENBQVk4VCxjQUE5QixFQUE4QyxzQkFBOUMsRUFBc0UsVUFBQzlILENBQUQsRUFBTztBQUMzRW9NLGVBQUtoVSxJQUFMLFNBQWdCNEgsS0FBS3NLLE9BQU94RSxLQUE1QjtBQUNELFNBRkQ7QUFHRDs7QUFFRDtBQUNBLFVBQUksS0FBSzlSLE1BQUwsQ0FBWWdOLFNBQWhCLEVBQTJCO0FBQ3pCLGFBQUs1SyxZQUFMLENBQWtCLEtBQUtwQyxNQUFMLENBQVlnTixTQUE5QixFQUF5QyxLQUF6QztBQUNEO0FBQ0Q7QUFDQSxVQUFJLEtBQUtoTixNQUFMLENBQVlpVyxVQUFoQixFQUE0QjtBQUMxQixhQUFLOEMsYUFBTCxDQUFtQixLQUFLL1ksTUFBTCxDQUFZaVcsVUFBL0IsRUFBMkMsS0FBM0M7QUFDRDtBQUNEO0FBQ0EsVUFBSSxLQUFLalcsTUFBTCxDQUFZZ1osTUFBaEIsRUFBd0I7QUFDdEIsYUFBS0MsU0FBTCxDQUFlLEtBQUtqWixNQUFMLENBQVlnWixNQUEzQixFQUFtQyxLQUFuQztBQUNEOztBQUVEVixpQkFBWSxZQUFZO0FBQ3RCLFlBQUksS0FBS3RZLE1BQUwsQ0FBWUMsSUFBWixLQUFxQixLQUFyQixJQUE4QixLQUFLRCxNQUFMLENBQVlDLElBQVosS0FBcUIsR0FBdkQsRUFBNEQ7QUFDMURpVSxtQkFBUzlQLElBQVQsQ0FBYyxJQUFkLEVBQW9CLEtBQUtwRSxNQUFMLENBQVlzVCxXQUFoQztBQUNELFNBRkQsTUFHSyxJQUFJLEtBQUt0VCxNQUFMLENBQVlDLElBQVosS0FBcUIsT0FBckIsSUFBZ0MsS0FBS0QsTUFBTCxDQUFZQyxJQUFaLEtBQXFCLEdBQXpELEVBQThEO0FBQ2pFMFcscUJBQVd2UyxJQUFYLENBQWdCLElBQWhCLEVBQXNCLEtBQUtwRSxNQUFMLENBQVlzVCxXQUFsQztBQUNELFNBRkksTUFHQSxJQUFJLEtBQUt0VCxNQUFMLENBQVlDLElBQVosS0FBcUIsTUFBckIsSUFBK0IsS0FBS0QsTUFBTCxDQUFZQyxJQUFaLEtBQXFCLEdBQXhELEVBQTZEO0FBQ2hFcVgsb0JBQVVsVCxJQUFWLENBQWUsSUFBZixFQUFxQixLQUFLcEUsTUFBTCxDQUFZc1QsV0FBakM7QUFDRDtBQUNGLE9BVlUsQ0FVUjVULElBVlEsQ0FVSCxJQVZHLENBQVg7O0FBWUE7QUFDQSxXQUFLd1AsUUFBTDtBQUNEOztBQUVEOzs7Ozs7Ozs7OytCQU9XO0FBQ1QsVUFBSSxLQUFLQyxXQUFULEVBQXNCLE9BQU8sSUFBUDtBQUN0QixXQUFLQSxXQUFMLEdBQW1CLElBQW5CO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OytCQWlCV2xQLEksRUFBTWlaLFUsRUFBWTtBQUFBOztBQUMzQixVQUFJLE9BQU9BLFVBQVAsSUFBcUIsV0FBekIsRUFBc0MsS0FBS2xaLE1BQUwsQ0FBWXNULFdBQVosR0FBMEI0RixVQUExQjtBQUN0QyxVQUFJalosSUFBSixFQUFVLEtBQUtELE1BQUwsQ0FBWUMsSUFBWixHQUFtQkEsSUFBbkI7O0FBRVYsV0FBSzBULENBQUwsQ0FBTyxNQUFQLEVBQ0d1RSxXQURILENBQ2UsUUFEZixFQUVHbkMsUUFGSCxDQUVZLFNBRlo7O0FBSUF1QyxpQkFBVyxZQUFNO0FBQ2YsWUFBSSxPQUFLdFksTUFBTCxDQUFZQyxJQUFaLElBQW9CLEtBQXBCLElBQTZCLE9BQUtELE1BQUwsQ0FBWUMsSUFBWixJQUFvQixHQUFyRCxFQUEwRDtBQUN4RGlVLG1CQUFTOVAsSUFBVCxTQUFvQixPQUFLcEUsTUFBTCxDQUFZc1QsV0FBaEM7QUFDRCxTQUZELE1BR0ssSUFBSSxPQUFLdFQsTUFBTCxDQUFZQyxJQUFaLElBQW9CLE9BQXBCLElBQStCLE9BQUtELE1BQUwsQ0FBWUMsSUFBWixJQUFvQixHQUF2RCxFQUE0RDtBQUMvRDBXLHFCQUFXdlMsSUFBWCxTQUFzQixPQUFLcEUsTUFBTCxDQUFZc1QsV0FBbEM7QUFDRCxTQUZJLE1BR0EsSUFBSSxPQUFLdFQsTUFBTCxDQUFZQyxJQUFaLElBQW9CLE1BQXBCLElBQThCLE9BQUtELE1BQUwsQ0FBWUMsSUFBWixJQUFvQixHQUF0RCxFQUEyRDtBQUM5RHFYLG9CQUFVbFQsSUFBVixTQUFxQixPQUFLcEUsTUFBTCxDQUFZc1QsV0FBakM7QUFDRDtBQUNELGVBQUtLLENBQUwsQ0FBTyxNQUFQLEVBQWV1RSxXQUFmLENBQTJCLFNBQTNCLEVBQXNDbkMsUUFBdEMsQ0FBK0MsUUFBL0M7QUFDRCxPQVhELEVBV0csS0FBSy9WLE1BQUwsQ0FBWTZPLFdBWGY7O0FBYUEsYUFBTyxJQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7OztpQ0FZYTdCLFMsRUFBV21NLE8sRUFBUztBQUMvQixXQUFLOUMsWUFBTCxHQUFvQixFQUFwQjtBQUNBLFVBQUlwTCxTQUFTLEVBQWI7QUFDQSxVQUFNbU8sWUFBWTtBQUNoQixlQUFPLGFBQVVwSSxDQUFWLEVBQWFxSSxHQUFiLEVBQWtCQyxLQUFsQixFQUF5QjtBQUFBOztBQUM5QkQsZ0JBQU0sRUFBTjtBQUNBLGNBQUksQ0FBQyxrQkFBRXJWLE9BQUYsQ0FBVWdOLENBQVYsQ0FBTCxFQUFtQixPQUFPcUksR0FBUDtBQUNuQixlQUFLck0sU0FBTCxHQUFpQmdFLElBQUlBLEVBQUVyQixNQUFGLENBQVMsQ0FBVCxFQUFZMkosS0FBWixDQUFyQjtBQUNBdEksWUFBRXdFLE9BQUYsQ0FBVSxVQUFDQyxDQUFELEVBQU87QUFDZixnQkFBSSxrQkFBRThELE1BQUYsQ0FBUzlELENBQVQsQ0FBSixFQUNFQSxJQUFJLGtCQUFFaFUsSUFBRixDQUFPZ1UsQ0FBUCxFQUFVLEVBQUMsVUFBVSxPQUFLelYsTUFBTCxDQUFZMlYsVUFBdkIsRUFBVixDQUFKO0FBQ0YwRCxnQkFBSTVELENBQUosSUFBUyxJQUFUO0FBQ0QsV0FKRDtBQUtBLGlCQUFPNEQsR0FBUDtBQUNEO0FBWGUsT0FBbEI7O0FBY0EsV0FBS3JCLGVBQUwsR0FBd0IsS0FBS2hZLE1BQUwsQ0FBWWlZLGNBQWIsR0FBZ0Msa0JBQUV4SSxRQUFGLENBQVcsS0FBS3pQLE1BQUwsQ0FBWWlZLGNBQXZCLENBQUQsR0FBMkMsS0FBS2pZLE1BQUwsQ0FBWWlZLGNBQXZELEdBQXdFLENBQXZHLEdBQTJHLENBQWxJOztBQUVBLFVBQUksS0FBS2pZLE1BQUwsQ0FBWWdOLFNBQVosR0FBd0JBLFNBQTVCLEVBQXVDO0FBQ3JDLFlBQUksa0JBQUVoSixPQUFGLENBQVVnSixTQUFWLENBQUosRUFBMEI7QUFDeEIvQixtQkFBU21PLFVBQVVJLEdBQVYsQ0FBY3BWLElBQWQsQ0FBbUIsSUFBbkIsRUFBeUI0SSxTQUF6QixFQUFvQyxFQUFwQyxFQUF3QyxLQUFLZ0wsZUFBN0MsQ0FBVDtBQUNELFNBRkQsTUFFTztBQUNMLGlCQUFPLElBQVA7QUFDRDtBQUNGOztBQUVELFdBQUszQixZQUFMLEdBQW9CLGdCQUFPdkgsTUFBUCxDQUFjLEVBQWQsRUFBa0I3RCxNQUFsQixDQUFwQjtBQUNBOztBQUVBLFVBQUlrTyxZQUFZLEtBQWhCLEVBQXVCWixrQkFBa0JuVSxJQUFsQixDQUF1QixJQUF2Qjs7QUFFdkI2RyxlQUFTLElBQVQ7O0FBRUEsYUFBTyxJQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7OzttQ0FTZTtBQUNiLGFBQU8sS0FBSytCLFNBQVo7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQ0FnQmNpSixVLEVBQVlrRCxPLEVBQVM7QUFDakMsV0FBS2pELGFBQUwsR0FBcUIsRUFBckI7QUFDQSxVQUFJdUQsWUFBSjtBQUFBLFVBQVN4TyxTQUFTLEVBQWxCO0FBQ0EsVUFBTW1PLFlBQVk7QUFDaEIsZUFBTyxhQUFVcEksQ0FBVixFQUFhcUksR0FBYixFQUFrQjtBQUFBOztBQUN2QkEsZ0JBQU0sRUFBTjtBQUNBLGNBQUksQ0FBQyxrQkFBRXJWLE9BQUYsQ0FBVWdOLENBQVYsQ0FBTCxFQUFtQixPQUFPcUksR0FBUDtBQUNuQnJJLFlBQUV3RSxPQUFGLENBQVUsVUFBQ0MsQ0FBRCxFQUFPO0FBQ2YsZ0JBQUksa0JBQUU4RCxNQUFGLENBQVM5RCxDQUFULENBQUosRUFBaUJBLElBQUksa0JBQUVoVSxJQUFGLENBQU9nVSxDQUFQLEVBQVUsRUFBQyxVQUFVLFFBQUt6VixNQUFMLENBQVkyVixVQUF2QixFQUFWLENBQUo7QUFDakIwRCxnQkFBSTVELENBQUosSUFBUyxJQUFUO0FBQ0QsV0FIRDtBQUlBLGlCQUFPNEQsR0FBUDtBQUNELFNBVGU7QUFVaEIsZUFBTyxhQUFVckksQ0FBVixFQUFhcUksR0FBYixFQUFrQjtBQUN2QkEsZ0JBQU0sRUFBTjtBQUNBLGNBQUksa0JBQUVyVixPQUFGLENBQVVnTixDQUFWLENBQUosRUFBa0IsT0FBT3FJLEdBQVA7QUFDbEIsY0FBSXJJLEVBQUUxRixLQUFOLEVBQWEsT0FBTytOLEdBQVA7QUFDYixlQUFLLElBQUl0USxDQUFULElBQWNpSSxDQUFkLEVBQWlCO0FBQ2ZxSSxnQkFBSXRRLENBQUosSUFBU2lJLEVBQUVqSSxDQUFGLENBQVQ7QUFDRDtBQUNELGlCQUFPc1EsR0FBUDtBQUNELFNBbEJlO0FBbUJoQixpQkFBUyxlQUFVckksQ0FBVixFQUFhcUksR0FBYixFQUFrQjtBQUFBOztBQUN6QkEsZ0JBQU0sRUFBTjtBQUNBLGNBQUksa0JBQUVyVixPQUFGLENBQVVnTixDQUFWLENBQUosRUFBa0IsT0FBT3FJLEdBQVA7QUFDbEIsY0FBSSxDQUFDckksRUFBRTFGLEtBQVAsRUFBYyxPQUFPK04sR0FBUDs7QUFFZHJJLFlBQUUxRixLQUFGLENBQVFrSyxPQUFSLENBQWdCLFVBQUNDLENBQUQsRUFBTztBQUNyQixnQkFBSSxrQkFBRWlFLFlBQUYsQ0FBZWpFLEVBQUVrRSxJQUFqQixLQUEwQixrQkFBRUQsWUFBRixDQUFlakUsRUFBRW1FLEVBQWpCLENBQTlCLEVBQW9EO0FBQ2xELG1CQUFLLElBQUl2WCxJQUFJLGtCQUFFWixJQUFGLENBQU9nVSxFQUFFa0UsSUFBVCxDQUFiLEVBQTZCdFgsS0FBSyxrQkFBRVosSUFBRixDQUFPZ1UsRUFBRW1FLEVBQVQsQ0FBbEMsRUFBZ0R2WCxFQUFFd1gsT0FBRixDQUFVeFgsRUFBRTZPLE9BQUYsS0FBYyxDQUF4QixDQUFoRCxFQUE0RTtBQUMxRW1JLG9CQUFJLGtCQUFFNVgsSUFBRixDQUFPWSxDQUFQLEVBQVUsRUFBQyxVQUFVLFFBQUtyQyxNQUFMLENBQVkyVixVQUF2QixFQUFWLENBQUosSUFBcUQsSUFBckQ7QUFDRDtBQUNGLGFBSkQsTUFLSztBQUNILG1CQUFLLElBQUluTyxJQUFJaU8sRUFBRWtFLElBQWYsRUFBcUJuUyxLQUFLaU8sRUFBRW1FLEVBQTVCLEVBQWdDcFMsR0FBaEMsRUFBcUM7QUFDbkM2UixvQkFBSTdSLENBQUosSUFBUyxJQUFUO0FBQ0Q7QUFDRjtBQUNGLFdBWEQ7O0FBYUEsaUJBQU82UixHQUFQO0FBQ0Q7QUF0Q2UsT0FBbEI7O0FBeUNBLFVBQUksS0FBS3JaLE1BQUwsQ0FBWWlXLFVBQVosR0FBeUJBLFVBQTdCLEVBQXlDO0FBQ3ZDLFlBQUksa0JBQUVqUyxPQUFGLENBQVVpUyxVQUFWLENBQUosRUFBMkI7QUFDekJoTCxtQkFBU21PLFVBQVVJLEdBQVYsQ0FBY3BWLElBQWQsQ0FBbUIsSUFBbkIsRUFBeUI2UixVQUF6QixDQUFUO0FBQ0QsU0FGRCxNQUdLO0FBQ0gsZUFBS3dELEdBQUwsSUFBWUwsU0FBWixFQUF1QjtBQUNyQixnQkFBSW5ELFdBQVd3RCxHQUFYLENBQUosRUFBcUI7QUFDbkJ4Tyx1QkFBU21PLFVBQVVLLEdBQVYsRUFBZXJWLElBQWYsQ0FBb0IsSUFBcEIsRUFBMEI2UixVQUExQixDQUFUO0FBQ0E7QUFDRDtBQUNGO0FBQ0QsY0FBSXBTLE9BQU9pVyxJQUFQLENBQVk3TyxNQUFaLEVBQW9CMUksTUFBcEIsS0FBK0IsQ0FBbkMsRUFBc0M7QUFDcEMwSSxxQkFBU21PLFVBQVU3VSxHQUFWLENBQWNILElBQWQsQ0FBbUIsSUFBbkIsRUFBeUI2UixVQUF6QixDQUFUO0FBQ0Q7QUFDRjtBQUNGOztBQUVELFdBQUtDLGFBQUwsR0FBcUJqTCxNQUFyQjtBQUNBO0FBQ0EsVUFBSWtPLFlBQVksS0FBaEIsRUFBdUIsS0FBS2xGLFVBQUw7O0FBRXZCLGFBQU8sSUFBUDtBQUNEOztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQWdCVStFLE0sRUFBUWUsTyxFQUFTO0FBQ3pCLFdBQUs1RCxTQUFMLEdBQWlCLEVBQWpCO0FBQ0EsVUFBSXNELFlBQUo7QUFBQSxVQUFTeE8sU0FBUyxFQUFsQjtBQUNBLFVBQU1tTyxZQUFZO0FBQ2hCLGVBQU8sYUFBVXBJLENBQVYsRUFBYXFJLEdBQWIsRUFBa0I7QUFDdkJBLGdCQUFNLEVBQU47QUFDQSxjQUFJLGtCQUFFclYsT0FBRixDQUFVZ04sQ0FBVixDQUFKLEVBQWtCLE9BQU9xSSxHQUFQO0FBQ2xCLGNBQUlySSxFQUFFMUYsS0FBTixFQUFhLE9BQU8rTixHQUFQO0FBQ2IsZUFBSyxJQUFJdFEsQ0FBVCxJQUFjaUksQ0FBZCxFQUFpQjtBQUNmcUksZ0JBQUl0USxDQUFKLElBQVNpSSxFQUFFakksQ0FBRixDQUFUO0FBQ0Q7O0FBRURpSSxjQUFJLElBQUo7QUFDQSxpQkFBT3FJLEdBQVA7QUFDRCxTQVhlO0FBWWhCLGlCQUFTLGVBQVVySSxDQUFWLEVBQWFxSSxHQUFiLEVBQWtCO0FBQUE7O0FBQ3pCQSxnQkFBTSxFQUFOO0FBQ0EsY0FBSSxrQkFBRXJWLE9BQUYsQ0FBVWdOLENBQVYsQ0FBSixFQUFrQixPQUFPcUksR0FBUDtBQUNsQixjQUFJLENBQUNySSxFQUFFMUYsS0FBUCxFQUFjLE9BQU8rTixHQUFQOztBQUVkckksWUFBRTFGLEtBQUYsQ0FBUWtLLE9BQVIsQ0FBZ0IsVUFBQ0MsQ0FBRCxFQUFPO0FBQ3JCLGdCQUFJLGtCQUFFaUUsWUFBRixDQUFlakUsRUFBRWtFLElBQWpCLEtBQTBCLGtCQUFFRCxZQUFGLENBQWVqRSxFQUFFbUUsRUFBakIsQ0FBOUIsRUFBb0Q7QUFDbEQsbUJBQUssSUFBSXZYLElBQUksa0JBQUVaLElBQUYsQ0FBT2dVLEVBQUVrRSxJQUFULENBQWIsRUFBNkJ0WCxLQUFLLGtCQUFFWixJQUFGLENBQU9nVSxFQUFFbUUsRUFBVCxDQUFsQyxFQUFnRHZYLEVBQUV3WCxPQUFGLENBQVV4WCxFQUFFNk8sT0FBRixLQUFjLENBQXhCLENBQWhELEVBQTRFO0FBQzFFbUksb0JBQUksa0JBQUU1WCxJQUFGLENBQU9ZLENBQVAsRUFBVSxFQUFDLFVBQVUsUUFBS3JDLE1BQUwsQ0FBWTJWLFVBQXZCLEVBQVYsQ0FBSixJQUFxRCxFQUFDelUsT0FBT3VVLEVBQUV2VSxLQUFWLEVBQWlCRCxPQUFPd1UsRUFBRXhVLEtBQTFCLEVBQXJEO0FBQ0Q7QUFDRixhQUpELE1BS0s7QUFDSCxtQkFBSyxJQUFJdUcsSUFBSWlPLEVBQUVrRSxJQUFmLEVBQXFCblMsS0FBS2lPLEVBQUVtRSxFQUE1QixFQUFnQ3BTLEdBQWhDLEVBQXFDO0FBQ25DNlIsb0JBQUk3UixDQUFKLElBQVMsRUFBQ3RHLE9BQU91VSxFQUFFdlUsS0FBVixFQUFpQkQsT0FBT3dVLEVBQUV4VSxLQUExQixFQUFUO0FBQ0Q7QUFDRjtBQUNGLFdBWEQ7O0FBYUErUCxjQUFJLElBQUo7QUFDQSxpQkFBT3FJLEdBQVA7QUFDRDtBQWhDZSxPQUFsQjs7QUFtQ0EsVUFBSSxLQUFLclosTUFBTCxDQUFZZ1osTUFBWixHQUFxQkEsTUFBekIsRUFBaUM7QUFDL0IsYUFBS1MsR0FBTCxJQUFZTCxTQUFaLEVBQXVCO0FBQ3JCLGNBQUlKLE9BQU9TLEdBQVAsQ0FBSixFQUFpQjtBQUNmeE8scUJBQVNtTyxVQUFVSyxHQUFWLEVBQWVyVixJQUFmLENBQW9CLElBQXBCLEVBQTBCNFUsTUFBMUIsQ0FBVDtBQUNBO0FBQ0Q7QUFDRjtBQUNELFlBQUluVixPQUFPaVcsSUFBUCxDQUFZN08sTUFBWixFQUFvQjFJLE1BQXBCLEtBQStCLENBQW5DLEVBQXNDO0FBQ3BDMEksbUJBQVNtTyxVQUFVN1UsR0FBVixDQUFjSCxJQUFkLENBQW1CLElBQW5CLEVBQXlCNFUsTUFBekIsQ0FBVDtBQUNEO0FBQ0Y7O0FBRUQsV0FBSzdDLFNBQUwsR0FBaUJsTCxNQUFqQjtBQUNBO0FBQ0EsVUFBSThPLFlBQVksS0FBaEIsRUFBdUIxQixlQUFlalUsSUFBZixDQUFvQixJQUFwQjtBQUN2QixhQUFPLElBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQWVVNFYsTSxFQUFRRCxPLEVBQVM7QUFDekIsVUFBSU4sWUFBSjtBQUFBLFVBQVN4TyxTQUFTLEVBQWxCO0FBQ0EsVUFBTW1PLFlBQVk7QUFDaEIsaUJBQVMsZUFBVXBJLENBQVYsRUFBYXFJLEdBQWIsRUFBa0I7QUFBQTs7QUFDekJBLGdCQUFNLEVBQU47QUFDQSxjQUFJLGtCQUFFclYsT0FBRixDQUFVZ04sQ0FBVixDQUFKLEVBQWtCLE9BQU9xSSxHQUFQO0FBQ2xCLGNBQUksQ0FBQ3JJLEVBQUUxRixLQUFQLEVBQWMsT0FBTytOLEdBQVA7O0FBRWRySSxZQUFFMUYsS0FBRixDQUFRa0ssT0FBUixDQUFnQixVQUFDQyxDQUFELEVBQU87QUFDckIsZ0JBQUksa0JBQUVpRSxZQUFGLENBQWVqRSxFQUFFa0UsSUFBakIsS0FBMEIsa0JBQUVELFlBQUYsQ0FBZWpFLEVBQUVtRSxFQUFqQixDQUE5QixFQUFvRDtBQUNsRCxtQkFBSyxJQUFJdlgsSUFBSSxJQUFJN0MsSUFBSixDQUFTLGtCQUFFaUMsSUFBRixDQUFPZ1UsRUFBRWtFLElBQVQsQ0FBVCxDQUFiLEVBQXVDdFgsS0FBSyxrQkFBRVosSUFBRixDQUFPZ1UsRUFBRW1FLEVBQVQsQ0FBNUMsRUFBMER2WCxFQUFFd1gsT0FBRixDQUFVeFgsRUFBRTZPLE9BQUYsS0FBYyxDQUF4QixDQUExRCxFQUFzRjtBQUNwRixvQkFBSTdPLEVBQUU0WCxPQUFGLE1BQWUsa0JBQUV4WSxJQUFGLENBQU9nVSxFQUFFa0UsSUFBVCxFQUFlTSxPQUFmLEVBQW5CLEVBQTZDO0FBQzNDWixzQkFBSSxrQkFBRTVYLElBQUYsQ0FBT1ksQ0FBUCxFQUFVLEVBQUMsVUFBVSxRQUFLckMsTUFBTCxDQUFZMlYsVUFBdkIsRUFBVixDQUFKLElBQXFEO0FBQ25EelUsMkJBQU91VSxFQUFFdlUsS0FBRixJQUFXLFFBQUtsQixNQUFMLENBQVk4WSxrQkFEcUI7QUFFbkQ3WCwyQkFBT3dVLEVBQUV5RTtBQUYwQyxtQkFBckQ7QUFJRCxpQkFMRCxNQUtPLElBQUk3WCxFQUFFNFgsT0FBRixNQUFlLGtCQUFFeFksSUFBRixDQUFPZ1UsRUFBRW1FLEVBQVQsRUFBYUssT0FBYixFQUFuQixFQUEyQztBQUNoRFosc0JBQUksa0JBQUU1WCxJQUFGLENBQU9ZLENBQVAsRUFBVSxFQUFDLFVBQVUsUUFBS3JDLE1BQUwsQ0FBWTJWLFVBQXZCLEVBQVYsQ0FBSixJQUFxRDtBQUNuRHpVLDJCQUFPdVUsRUFBRXZVLEtBQUYsSUFBVyxRQUFLbEIsTUFBTCxDQUFZOFksa0JBRHFCO0FBRW5EN1gsMkJBQU93VSxFQUFFMEU7QUFGMEMsbUJBQXJEO0FBSUQsaUJBTE0sTUFLQTtBQUNMZCxzQkFBSSxrQkFBRTVYLElBQUYsQ0FBT1ksQ0FBUCxFQUFVLEVBQUMsVUFBVSxRQUFLckMsTUFBTCxDQUFZMlYsVUFBdkIsRUFBVixDQUFKLElBQXFELEVBQUN6VSxPQUFPdVUsRUFBRXZVLEtBQUYsSUFBVyxRQUFLbEIsTUFBTCxDQUFZOFksa0JBQS9CLEVBQXJEO0FBQ0Q7QUFDRjtBQUNGO0FBQ0YsV0FsQkQ7O0FBb0JBOUgsY0FBSSxJQUFKO0FBQ0EsaUJBQU9xSSxHQUFQO0FBQ0Q7QUE1QmUsT0FBbEI7O0FBK0JBO0FBQ0EsVUFBSVUsWUFBWSxLQUFoQixFQUF1QjtBQUNyQnJCLHVCQUFldFUsSUFBZixDQUFvQixJQUFwQjtBQUNEOztBQUVELFVBQUksS0FBS3BFLE1BQUwsQ0FBWWdhLE1BQVosR0FBcUJBLE1BQXpCLEVBQWlDO0FBQy9CL08saUJBQVNtTyxVQUFVOU4sS0FBVixDQUFnQmxILElBQWhCLENBQXFCLElBQXJCLEVBQTJCNFYsTUFBM0IsQ0FBVDtBQUNEOztBQUVELFdBQUt2QixTQUFMLEdBQWlCeE4sTUFBakI7O0FBRUE7QUFDQSxVQUFJOE8sWUFBWSxLQUFoQixFQUF1QjtBQUNyQnZCLHVCQUFlcFUsSUFBZixDQUFvQixJQUFwQjtBQUNEO0FBQ0QsYUFBTyxJQUFQO0FBQ0Q7Ozs7OztrQkFHWXdVLGE7Ozs7Ozs7Ozs7Ozs7Ozs7QUNocUNmOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUNBOztBQUVBLElBQU13QixZQUFZLFNBQVpBLFNBQVksQ0FBVTVILFVBQVYsRUFBc0I7QUFDdEM7QUFRRCxDQVREO0FBVUEsSUFBTTZILGFBQWEsU0FBYkEsVUFBYSxDQUFVN0gsVUFBVixFQUFzQjtBQUN2QztBQW1CRCxDQXBCRDtBQXFCQSxJQUFNOEgsTUFBTTtBQUNWLGVBQWMsa0JBQUtDLFlBQU4sR0FBc0IsWUFBdEIsR0FBcUMsV0FEeEM7QUFFVixlQUFjLGtCQUFLQSxZQUFOLEdBQXNCLFdBQXRCLEdBQW9DLFdBRnZDO0FBR1YsYUFBWSxrQkFBS0EsWUFBTixHQUFzQixVQUF0QixHQUFtQztBQUhwQyxDQUFaO0FBS0EsSUFBTWxhLGlCQUFpQixTQUFqQkEsY0FBaUIsQ0FBVXlMLElBQVYsRUFBZ0I4RyxJQUFoQixFQUFzQjtBQUMzQyxNQUFJOUcsUUFBUUEsS0FBS3pMLGNBQWpCLEVBQWlDO0FBQy9CeUwsU0FBS3pMLGNBQUwsQ0FBb0IrRCxJQUFwQixDQUF5QndPLElBQXpCLEVBQStCQSxJQUEvQjtBQUNELEdBRkQsTUFHSyxJQUFJLEtBQUt2UyxjQUFULEVBQXlCO0FBQzVCLFNBQUtBLGNBQUwsQ0FBb0IrRCxJQUFwQixDQUF5QndPLElBQXpCLEVBQStCQSxJQUEvQjtBQUNEOztBQUVEQSxTQUFPLElBQVA7QUFDRCxDQVREO0FBVUEsSUFBTTRILG1CQUFtQixTQUFuQkEsZ0JBQW1CLENBQVV4TyxDQUFWLEVBQWE7QUFDcEMsTUFBSXlPLGlCQUFKO0FBQUEsTUFBY0MsZ0JBQWlCMU8sRUFBRTBPLGFBQUgsR0FBb0IxTyxFQUFFME8sYUFBdEIsR0FBc0MxTyxDQUFwRTtBQUNBeU8sYUFBWSxvQkFBb0JDLGFBQXBCLElBQXFDQSxjQUFjQyxjQUFwRCxHQUFzRUQsY0FBY0MsY0FBZCxDQUE2QixDQUE3QixDQUF0RSxHQUF3R0QsYUFBbkg7QUFDQTtBQUNBLFNBQU87QUFDTEUsYUFBU0gsU0FBU0ksS0FEYjtBQUVMQyxhQUFTTCxTQUFTTTtBQUZiLEdBQVA7QUFJRCxDQVJEO0FBU0EsSUFBTUMsYUFBYSxTQUFiQSxVQUFhLENBQVU1WixJQUFWLEVBQWdCO0FBQUE7O0FBQ2pDQSxPQUFLNlosa0JBQUwsR0FBMEI3WixLQUFLOFosTUFBTCxDQUFZNWEsS0FBWixFQUExQjtBQUNBYyxPQUFLK1osVUFBTCxHQUFrQi9aLEtBQUs2WixrQkFBTCxHQUEyQixLQUFLamIsTUFBTCxDQUFZb2IsTUFBWixDQUFtQkMsTUFBbkIsQ0FBMEJDLFdBQTFCLEdBQXdDLENBQXJGO0FBQ0EsTUFBSUMsYUFBYUMsbUJBQW1CcFgsSUFBbkIsQ0FBd0IsSUFBeEIsRUFBOEJoRCxJQUE5QixFQUFvQ0EsS0FBS3FhLE9BQXpDLENBQWpCOztBQUVBO0FBQ0EsTUFBSUYsYUFBYSxDQUFiLElBQWtCQSxhQUFhbmEsS0FBSytaLFVBQXhDLEVBQW9EO0FBQ2xELFFBQUlPLGVBQUo7QUFDQUgsaUJBQWFBLGFBQWEsQ0FBYixHQUFpQixDQUFqQixHQUFxQkEsYUFBYW5hLEtBQUsrWixVQUFsQixHQUErQi9aLEtBQUsrWixVQUFwQyxHQUFpREksVUFBbkY7QUFDQUcsYUFBU0MsbUJBQW1CdlgsSUFBbkIsQ0FBd0IsSUFBeEIsRUFBOEJoRCxJQUE5QixFQUFvQ21hLFVBQXBDLENBQVQ7QUFDQUssdUJBQW1CeFgsSUFBbkIsQ0FBd0IsSUFBeEIsRUFBOEJoRCxJQUE5QixFQUFvQ3lhLGNBQWN6WCxJQUFkLENBQW1CLElBQW5CLEVBQXlCaEQsSUFBekIsRUFBK0JzYSxNQUEvQixDQUFwQztBQUNEOztBQUVEdGEsT0FBSzBhLE9BQUwsQ0FBYTNJLEdBQWIsQ0FBaUIsRUFBQzFTLE1BQU04YSxVQUFQLEVBQWpCO0FBQ0FuYSxPQUFLMmEsS0FBTCxDQUNHMVksR0FESCxDQUNPaVgsSUFBSSxXQUFKLENBRFAsRUFFR25NLEVBRkgsQ0FFTW1NLElBQUksV0FBSixDQUZOLEVBRXdCLDZCQUZ4QixFQUV1RCxVQUFDdE8sQ0FBRCxFQUFPO0FBQzFELFFBQUl5TyxXQUFXRCxpQkFBaUJ4TyxDQUFqQixDQUFmO0FBQ0E1SyxTQUFLNGEsc0JBQUwsR0FBOEJ2QixTQUFTRyxPQUF2QztBQUNBeFosU0FBSzZhLG1CQUFMLEdBQTJCN2EsS0FBSzBhLE9BQUwsQ0FBYUksUUFBYixHQUF3QnpiLElBQW5EO0FBQ0EwYixvQkFBZ0JoTyxFQUFoQixDQUFtQi9KLElBQW5CLFFBQThCaEQsSUFBOUI7QUFDQSxzQkFBRXNMLFNBQUYsQ0FBWVYsRUFBRTBPLGFBQWQ7QUFDRCxHQVJILEVBU0dyWCxHQVRILENBU08sT0FUUCxFQVVHOEssRUFWSCxDQVVNLE9BVk4sRUFVZSwwREFWZixFQVUyRSxVQUFDbkMsQ0FBRCxFQUFPO0FBQzlFLFFBQUksTUFBSzdLLE9BQVQsRUFBa0I7QUFDaEIsWUFBS0EsT0FBTCxDQUFhaUQsSUFBYixDQUFrQmhELElBQWxCLEVBQXdCLE1BQU1BLEtBQUtnYixjQUFMLENBQW9CQyxXQUFwQixFQUE5QixFQUFpRXJRLENBQWpFO0FBQ0Q7QUFDRixHQWRILEVBZUdtQyxFQWZILENBZU0sT0FmTixFQWVlLDRCQWZmLEVBZTZDLFVBQUNuQyxDQUFELEVBQU87QUFDaEQsUUFBSUEsRUFBRXBNLE1BQUYsQ0FBU29VLFlBQVQsQ0FBc0IsWUFBdEIsS0FBdUMsYUFBM0MsRUFBMEQ7QUFDeEQsVUFBSXlHLFdBQVdELGlCQUFpQnhPLENBQWpCLENBQWY7QUFBQSxVQUNFc1EsZ0JBQWdCN0IsU0FBU0csT0FBVCxHQUFtQnhaLEtBQUs4WixNQUFMLENBQVlxQixNQUFaLEdBQXFCOWIsSUFEMUQ7QUFBQSxVQUVFaWIsV0FBU0MsbUJBQW1CdmEsSUFBbkIsRUFBeUJrYixhQUF6QixDQUZYOztBQUlBbGIsV0FBSzBhLE9BQUwsQ0FBYTNJLEdBQWIsQ0FBaUIsRUFBQzFTLE1BQU02YixhQUFQLEVBQWpCO0FBQ0FWLHlCQUFtQnhYLElBQW5CLFFBQThCaEQsSUFBOUIsRUFBb0N5YSxjQUFjelgsSUFBZCxRQUF5QmhELElBQXpCLEVBQStCc2EsUUFBL0IsQ0FBcEMsRUFBNEUxUCxDQUE1RTs7QUFFQXlPLGlCQUFXLElBQVg7QUFDQTZCLHNCQUFnQixJQUFoQjtBQUNBWixpQkFBUyxJQUFUO0FBQ0Q7QUFDRixHQTVCSDtBQTZCRCxDQTNDRDtBQTRDQSxJQUFNRSxxQkFBcUIsU0FBckJBLGtCQUFxQixDQUFVeGEsSUFBVixFQUFnQm9iLEtBQWhCLEVBQXVCMUssS0FBdkIsRUFBOEI7QUFDdkQxUSxPQUFLcWIsUUFBTCxDQUNHdEosR0FESCxDQUNPLEVBQUMsb0JBQW9CLE1BQU1xSixLQUEzQixFQURQO0FBRUFwYixPQUFLc2IsTUFBTCxDQUFZdmQsSUFBWixDQUFpQixNQUFNcWQsTUFBTUgsV0FBTixFQUF2QjtBQUNBamIsT0FBS2diLGNBQUwsR0FBc0JJLEtBQXRCOztBQUVBLE1BQUkxSyxTQUFTLEtBQUs2SyxhQUFsQixFQUFpQztBQUMvQixTQUFLQSxhQUFMLENBQW1CdlksSUFBbkIsQ0FBd0JoRCxJQUF4QixFQUE4QixNQUFNQSxLQUFLZ2IsY0FBTCxDQUFvQkMsV0FBcEIsRUFBcEM7QUFDRDtBQUNGLENBVEQ7QUFVQSxJQUFNUixnQkFBZ0IsU0FBaEJBLGFBQWdCLENBQVV6YSxJQUFWLEVBQWdCc2EsTUFBaEIsRUFBd0I7QUFDNUMsTUFBTXRDLFlBQVk7QUFDaEIsV0FEZ0IsaUJBQ1J3RCxNQURRLEVBQ0FuQixPQURBLEVBQ1M7QUFDdkIsYUFBT21CLE9BQU9DLE9BQVAsQ0FBZSxLQUFLN2MsTUFBTCxDQUFZb2IsTUFBWixDQUFtQkMsTUFBbkIsQ0FBMEJLLE1BQTFCLEdBQW1DLENBQWxELEVBQXFEb0IsTUFBckQsQ0FBNERyQixPQUE1RCxFQUFxRXNCLFdBQXJFLEVBQVA7QUFDRCxLQUhlO0FBSWhCLFdBSmdCLGlCQUlSSCxNQUpRLEVBSUFuQixPQUpBLEVBSVM7QUFDdkIsYUFBT21CLE9BQU9FLE1BQVAsQ0FBYyxLQUFLOWMsTUFBTCxDQUFZb2IsTUFBWixDQUFtQkMsTUFBbkIsQ0FBMEJLLE1BQTFCLEdBQW1DLENBQWpELEVBQW9Eb0IsTUFBcEQsQ0FBMkRyQixPQUEzRCxFQUFvRXNCLFdBQXBFLEVBQVA7QUFDRCxLQU5lO0FBT2hCLFlBUGdCLGtCQU9QSCxNQVBPLEVBT0NuQixPQVBELEVBT1U7QUFDeEIsYUFBT21CLE9BQU9FLE1BQVAsQ0FBY3JCLE9BQWQsRUFBdUJzQixXQUF2QixFQUFQO0FBQ0Q7QUFUZSxHQUFsQjs7QUFZQSxNQUFJM2IsS0FBSzRiLFVBQUwsSUFBbUI1RCxTQUF2QixFQUFrQztBQUNoQyxXQUFPQSxVQUFVaFksS0FBSzRiLFVBQWYsRUFBMkI1WSxJQUEzQixDQUFnQyxJQUFoQyxFQUFzQ2hELEtBQUt3YixNQUEzQyxFQUFtRGxCLE1BQW5ELENBQVA7QUFDRCxHQUZELE1BRU87QUFDTCxXQUFPdEMsVUFBVSxRQUFWLEVBQW9CaFYsSUFBcEIsQ0FBeUIsSUFBekIsRUFBK0JoRCxLQUFLd2IsTUFBcEMsRUFBNENsQixNQUE1QyxDQUFQO0FBQ0Q7QUFDRixDQWxCRDtBQW1CQSxJQUFNdUIsZ0JBQWdCLFNBQWhCQSxhQUFnQixDQUFVN2IsSUFBVixFQUFnQm9iLEtBQWhCLEVBQXVCO0FBQzNDO0FBQ0EsTUFBTXBELFlBQVk7QUFDaEIsV0FEZ0IsaUJBQ1J3RCxNQURRLEVBQ0FNLFVBREEsRUFDWTtBQUMxQixVQUFJQyxTQUFTUCxPQUFPQyxPQUFQLENBQWUsS0FBSzdjLE1BQUwsQ0FBWW9iLE1BQVosQ0FBbUJDLE1BQW5CLENBQTBCSyxNQUExQixHQUFtQyxDQUFsRCxDQUFiO0FBQ0EsYUFBTyxDQUFDeUIsT0FBT0MsTUFBUCxHQUFnQkMsQ0FBaEIsR0FBb0JILFdBQVdFLE1BQVgsR0FBb0JDLENBQXpDLElBQThDLEdBQXJEO0FBQ0QsS0FKZTtBQUtoQixXQUxnQixpQkFLUlQsTUFMUSxFQUtBTSxVQUxBLEVBS1k7QUFDMUIsVUFBSUMsU0FBU1AsT0FBT0UsTUFBUCxDQUFjLEtBQUs5YyxNQUFMLENBQVlvYixNQUFaLENBQW1CQyxNQUFuQixDQUEwQkssTUFBMUIsR0FBbUMsQ0FBakQsQ0FBYjtBQUNBLGFBQU8sQ0FBQ3lCLE9BQU9DLE1BQVAsR0FBZ0JDLENBQWhCLEdBQW9CSCxXQUFXRSxNQUFYLEdBQW9CQyxDQUF6QyxJQUE4QyxHQUFyRDtBQUNELEtBUmU7QUFTaEIsWUFUZ0Isa0JBU1BULE1BVE8sRUFTQ00sVUFURCxFQVNhO0FBQzNCLGFBQU8sQ0FBQ04sT0FBT1EsTUFBUCxHQUFnQkMsQ0FBaEIsR0FBb0JILFdBQVdFLE1BQVgsR0FBb0JDLENBQXpDLElBQThDLEdBQXJEO0FBQ0Q7QUFYZSxHQUFsQjs7QUFjQSxNQUFJamMsS0FBSzRiLFVBQUwsSUFBbUI1RCxTQUF2QixFQUFrQztBQUNoQyxXQUFPQSxVQUFVaFksS0FBSzRiLFVBQWYsRUFBMkI1WSxJQUEzQixDQUFnQyxJQUFoQyxFQUFzQ2hELEtBQUt3YixNQUEzQyxFQUFtREosS0FBbkQsQ0FBUDtBQUNELEdBRkQsTUFFTztBQUNMLFdBQU9wRCxVQUFVLFFBQVYsRUFBb0JoVixJQUFwQixDQUF5QixJQUF6QixFQUErQmhELEtBQUt3YixNQUFwQyxFQUE0Q0osS0FBNUMsQ0FBUDtBQUNEO0FBQ0YsQ0FyQkQ7QUFzQkEsSUFBTWIscUJBQXFCLFNBQXJCQSxrQkFBcUIsQ0FBVXZhLElBQVYsRUFBZ0JtYSxVQUFoQixFQUE0QjtBQUNyRCxTQUFPLEtBQUt2YixNQUFMLENBQVlvYixNQUFaLENBQW1CQyxNQUFuQixDQUEwQkssTUFBMUIsSUFBb0NILGFBQWNuYSxLQUFLK1osVUFBTCxHQUFrQixDQUFwRSxLQUEyRS9aLEtBQUs2WixrQkFBTCxHQUEwQixDQUFyRyxDQUFQO0FBQ0QsQ0FGRDtBQUdBLElBQU1PLHFCQUFxQixTQUFyQkEsa0JBQXFCLENBQVVwYSxJQUFWLEVBQWdCc2EsTUFBaEIsRUFBd0I7QUFDakQsU0FBUUEsVUFBVXRhLEtBQUs2WixrQkFBTCxHQUEwQixDQUFwQyxJQUF5QyxLQUFLamIsTUFBTCxDQUFZb2IsTUFBWixDQUFtQkMsTUFBbkIsQ0FBMEJLLE1BQXBFLEdBQStFdGEsS0FBSytaLFVBQUwsR0FBa0IsQ0FBeEc7QUFDRCxDQUZEO0FBR0EsSUFBTWdCLGtCQUFrQjtBQUN0QixNQURzQixjQUNqQi9hLElBRGlCLEVBQ1g7QUFBQTs7QUFDVCx5QkFBTzhMLFNBQVNvUSxJQUFoQixFQUNHblAsRUFESCxDQUNNbU0sSUFBSSxXQUFKLElBQW1CLGNBQW5CLEdBQW9DLEtBQUtpRCxVQUQvQyxFQUMyRCxVQUFDdlIsQ0FBRCxFQUFPO0FBQzlELFVBQUl5TyxXQUFXRCxpQkFBaUJ4TyxDQUFqQixDQUFmO0FBQUEsVUFDRXdSLEtBQUsvQyxTQUFTRyxPQUFULEdBQW1CeFosS0FBSzRhLHNCQUQvQjtBQUFBLFVBRUVNLGdCQUFnQmxiLEtBQUs2YSxtQkFBTCxHQUEyQnVCLEVBRjdDO0FBQUEsVUFHRTlCLGVBSEY7O0FBS0FZLHNCQUFnQkEsZ0JBQWdCLENBQWhCLEdBQW9CLENBQXBCLEdBQXdCQSxnQkFBZ0JsYixLQUFLK1osVUFBckIsR0FBa0MvWixLQUFLK1osVUFBdkMsR0FBb0RtQixhQUE1RjtBQUNBbGIsV0FBSzBhLE9BQUwsQ0FBYTNJLEdBQWIsQ0FBaUIsRUFBQzFTLE1BQU02YixhQUFQLEVBQWpCO0FBQ0FaLGVBQVNDLG1CQUFtQnZYLElBQW5CLFNBQThCaEQsSUFBOUIsRUFBb0NrYixhQUFwQyxDQUFUOztBQUVBVix5QkFBbUJ4WCxJQUFuQixTQUE4QmhELElBQTlCLEVBQW9DeWEsY0FBY3pYLElBQWQsU0FBeUJoRCxJQUF6QixFQUErQnNhLE1BQS9CLENBQXBDLEVBQTRFMVAsQ0FBNUU7O0FBRUF5TyxpQkFBVyxJQUFYO0FBQ0ErQyxXQUFLLElBQUw7QUFDRCxLQWZILEVBZ0JHclAsRUFoQkgsQ0FnQk1tTSxJQUFJLFNBQUosSUFBaUIsY0FBakIsR0FBa0MsS0FBS2lELFVBaEI3QyxFQWdCeUQsVUFBQ3ZSLENBQUQsRUFBTztBQUM1RG1RLHNCQUFnQjlZLEdBQWhCLENBQW9CZSxJQUFwQjtBQUNBLHdCQUFFc0ksU0FBRixDQUFZVixDQUFaO0FBQ0QsS0FuQkgsRUFvQkdtQyxFQXBCSCxDQW9CTSwyQkFBMkIsS0FBS29QLFVBcEJ0QyxFQW9Ca0QsVUFBQ3ZSLENBQUQsRUFBTztBQUNyRG1RLHNCQUFnQjlZLEdBQWhCLENBQW9CZSxJQUFwQjtBQUNBLHdCQUFFc0ksU0FBRixDQUFZVixDQUFaO0FBQ0QsS0F2Qkg7O0FBeUJBLHlCQUFPa0IsU0FBU29RLElBQWhCLEVBQ0d6UCxJQURILENBQ1EsY0FEUixFQUN3QixJQUR4QixFQUVHc0YsR0FGSCxDQUVPLGFBRlAsRUFFc0IsTUFGdEIsRUFHR2hGLEVBSEgsQ0FHTSxhQUhOLEVBR3FCLEtBSHJCO0FBSUQsR0EvQnFCO0FBZ0N0QixPQWhDc0IsaUJBZ0NkO0FBQ04sU0FBS3NQLElBQUwsQ0FBVUMsWUFBVixHQUF5QixLQUF6Qjs7QUFFQSx5QkFBT3hRLFNBQVNvUSxJQUFoQixFQUNHamEsR0FESCxDQUNPaVgsSUFBSSxXQUFKLElBQW1CLGNBQW5CLEdBQW9DLEtBQUtpRCxVQURoRCxFQUVHbGEsR0FGSCxDQUVPaVgsSUFBSSxTQUFKLElBQWlCLGNBQWpCLEdBQWtDLEtBQUtpRCxVQUY5QyxFQUdHbGEsR0FISCxDQUdPLDJCQUEyQixLQUFLa2EsVUFIdkM7O0FBS0EseUJBQU9yUSxTQUFTb1EsSUFBaEIsRUFDR0ssVUFESCxDQUNjLGNBRGQsRUFFR3hLLEdBRkgsQ0FFTyxhQUZQLEVBRXNCLE1BRnRCLEVBR0c5UCxHQUhILENBR08sYUFIUDtBQUlEO0FBNUNxQixDQUF4QjtBQThDQSxJQUFNdWEsV0FBVSxTQUFWQSxRQUFVLENBQVVDLGFBQVYsRUFBeUI7QUFBQTs7QUFDdkMsTUFBSUMsTUFBTTtBQUNSeGQsV0FBTyxLQUFLcU4sT0FBTCxDQUFhb1EsVUFBYixFQURDO0FBRVI3SSxZQUFRLEtBQUt2SCxPQUFMLENBQWFxUSxXQUFiO0FBRkEsR0FBVjs7QUFLQTtBQUNBLE9BQUtyUSxPQUFMLENBQWF4TyxJQUFiLENBQWtCLHNCQUFTd0ssTUFBVCxDQUFnQnlRLFVBQVVoVyxJQUFWLENBQWUsSUFBZixDQUFoQixFQUFzQyxFQUF0QyxFQUEwQyxLQUFLcEUsTUFBTCxDQUFZd1MsVUFBdEQsQ0FBbEI7O0FBR0E7QUFDQSxPQUFLbUIsQ0FBTCxHQUFTO0FBQ1AsWUFBUSxLQUFLaEcsT0FBTCxDQUFhRyxJQUFiLENBQWtCLG9DQUFsQixDQUREO0FBRVAsY0FBVSxLQUFLSCxPQUFMLENBQWFHLElBQWIsQ0FBa0Isc0NBQWxCLENBRkg7QUFHUCxnQkFBWSxLQUFLSCxPQUFMLENBQWFHLElBQWIsQ0FBa0Isd0NBQWxCO0FBSEwsR0FBVDs7QUFNQTtBQUNBOztBQUVBO0FBQ0EsT0FBSzlOLE1BQUwsQ0FBWW9iLE1BQVosQ0FBbUI3RixJQUFuQixDQUF3QkMsT0FBeEIsQ0FBZ0MsVUFBQ3lJLENBQUQsRUFBTztBQUNyQ0EsTUFBRXJCLE1BQUYsR0FBVyxrQkFBRUosS0FBRixDQUFReUIsRUFBRWxiLEtBQVYsQ0FBWDtBQUNBa2IsTUFBRTdCLGNBQUYsR0FBbUI2QixFQUFFckIsTUFBRixDQUFTRyxXQUFULEVBQW5CO0FBQ0EsUUFBSWtCLEVBQUVyQixNQUFGLENBQVNzQixDQUFULElBQWMsQ0FBZCxJQUFtQkQsRUFBRXJCLE1BQUYsQ0FBU3VCLENBQVQsSUFBYyxDQUFqQyxJQUFzQ0YsRUFBRXJCLE1BQUYsQ0FBU3hMLENBQVQsSUFBYyxDQUF4RCxFQUEyRDtBQUN6RDZNLFFBQUV4QyxPQUFGLEdBQVksT0FBS3piLE1BQUwsQ0FBWW9iLE1BQVosQ0FBbUJDLE1BQW5CLENBQTBCSyxNQUF0QztBQUNBdUMsUUFBRWpCLFVBQUYsR0FBZSxPQUFmO0FBQ0FpQixRQUFFRyxZQUFGLEdBQWlCLE1BQU1ILEVBQUVyQixNQUFGLENBQVNDLE9BQVQsQ0FBaUIsT0FBSzdjLE1BQUwsQ0FBWW9iLE1BQVosQ0FBbUJDLE1BQW5CLENBQTBCSyxNQUEzQyxFQUFtRHFCLFdBQW5ELEVBQXZCO0FBQ0FrQixRQUFFSSxZQUFGLEdBQWlCLE1BQU1KLEVBQUVyQixNQUFGLENBQVNDLE9BQVQsQ0FBaUIsT0FBSzdjLE1BQUwsQ0FBWW9iLE1BQVosQ0FBbUJDLE1BQW5CLENBQTBCSyxNQUExQixHQUFtQyxDQUFwRCxFQUF1RHFCLFdBQXZELEVBQXZCO0FBQ0FrQixRQUFFSyxZQUFGLEdBQWlCLE1BQU1MLEVBQUVyQixNQUFGLENBQVNHLFdBQVQsRUFBdkI7QUFDRCxLQU5ELE1BTU8sSUFBSWtCLEVBQUVyQixNQUFGLENBQVNzQixDQUFULElBQWMsR0FBZCxJQUFxQkQsRUFBRXJCLE1BQUYsQ0FBU3VCLENBQVQsSUFBYyxHQUFuQyxJQUEwQ0YsRUFBRXJCLE1BQUYsQ0FBU3hMLENBQVQsSUFBYyxHQUE1RCxFQUFpRTtBQUN0RTZNLFFBQUV4QyxPQUFGLEdBQVksQ0FBQyxPQUFLemIsTUFBTCxDQUFZb2IsTUFBWixDQUFtQkMsTUFBbkIsQ0FBMEJLLE1BQXZDO0FBQ0F1QyxRQUFFakIsVUFBRixHQUFlLE9BQWY7QUFDQWlCLFFBQUVHLFlBQUYsR0FBaUIsTUFBTUgsRUFBRXJCLE1BQUYsQ0FBU0csV0FBVCxFQUF2QjtBQUNBa0IsUUFBRUksWUFBRixHQUFpQixNQUFNSixFQUFFckIsTUFBRixDQUFTRSxNQUFULENBQWdCLE9BQUs5YyxNQUFMLENBQVlvYixNQUFaLENBQW1CQyxNQUFuQixDQUEwQkssTUFBMUIsR0FBbUMsQ0FBbkQsRUFBc0RxQixXQUF0RCxFQUF2QjtBQUNBa0IsUUFBRUssWUFBRixHQUFpQixNQUFNTCxFQUFFckIsTUFBRixDQUFTRSxNQUFULENBQWdCLE9BQUs5YyxNQUFMLENBQVlvYixNQUFaLENBQW1CQyxNQUFuQixDQUEwQkssTUFBMUMsRUFBa0RxQixXQUFsRCxFQUF2QjtBQUNELEtBTk0sTUFNQTtBQUNMa0IsUUFBRXhDLE9BQUYsR0FBWSxDQUFaO0FBQ0F3QyxRQUFFRyxZQUFGLEdBQWlCLE1BQU1ILEVBQUVyQixNQUFGLENBQVNDLE9BQVQsQ0FBaUIsT0FBSzdjLE1BQUwsQ0FBWW9iLE1BQVosQ0FBbUJDLE1BQW5CLENBQTBCSyxNQUEzQyxFQUFtRHFCLFdBQW5ELEVBQXZCO0FBQ0FrQixRQUFFSSxZQUFGLEdBQWlCLE1BQU1KLEVBQUVyQixNQUFGLENBQVNHLFdBQVQsRUFBdkI7QUFDQWtCLFFBQUVLLFlBQUYsR0FBaUIsTUFBTUwsRUFBRXJCLE1BQUYsQ0FBU0UsTUFBVCxDQUFnQixPQUFLOWMsTUFBTCxDQUFZb2IsTUFBWixDQUFtQkMsTUFBbkIsQ0FBMEJLLE1BQTFDLEVBQWtEcUIsV0FBbEQsRUFBdkI7QUFDRDtBQUNGLEdBckJEOztBQXVCQTtBQUNBLE9BQUsvYyxNQUFMLENBQVlvYixNQUFaLENBQW1CQyxNQUFuQixDQUEwQkUsVUFBMUIsR0FBdUMsQ0FBQyxLQUFLdmIsTUFBTCxDQUFZb2IsTUFBWixDQUFtQkMsTUFBbkIsQ0FBMEJDLFdBQTNCLEdBQXlDLENBQWhGO0FBQ0EsT0FBS3RiLE1BQUwsQ0FBWW9iLE1BQVosQ0FBbUJDLE1BQW5CLENBQTBCa0QsU0FBMUIsR0FBc0MsQ0FBQyxLQUFLdmUsTUFBTCxDQUFZb2IsTUFBWixDQUFtQkMsTUFBbkIsQ0FBMEJtRCxZQUEzQixHQUEwQyxDQUFoRjs7QUFFQTtBQUNBLE9BQUs3SyxDQUFMLENBQU8sUUFBUCxFQUFpQnhVLElBQWpCLENBQXNCLHNCQUFTd0ssTUFBVCxDQUFnQjBRLFdBQVdqVyxJQUFYLENBQWdCLElBQWhCLENBQWhCLEVBQXVDLEtBQUtwRSxNQUE1QyxFQUFvRCxLQUFLQSxNQUFMLENBQVl3UyxVQUFoRSxDQUF0Qjs7QUFFQSxPQUFLbUIsQ0FBTCxDQUFPLFFBQVAsRUFBaUI3RixJQUFqQixDQUFzQiwrQkFBdEIsRUFBdUR3QixJQUF2RCxDQUE0RCxVQUFDbVAsS0FBRCxFQUFRQyxFQUFSLEVBQWU7QUFDekUsUUFBSUMsTUFBTUQsR0FBRzFLLFlBQUgsQ0FBZ0IsNkJBQWhCLENBQVY7QUFDQSxRQUFJd0ksUUFBUSxPQUFLeGMsTUFBTCxDQUFZb2IsTUFBWixDQUFtQjdGLElBQW5CLENBQXdCb0osR0FBeEIsQ0FBWjtBQUNBLFFBQUl2ZCxPQUFPLGdCQUFPME4sTUFBUCxDQUFjLEVBQWQsRUFBa0IwTixLQUFsQixDQUFYO0FBQ0FwYixTQUFLd2QsTUFBTCxHQUFjRCxHQUFkO0FBQ0F2ZCxTQUFLMmEsS0FBTCxHQUFhLHFCQUFPMkMsRUFBUCxDQUFiO0FBQ0F0ZCxTQUFLcWIsUUFBTCxHQUFnQnJiLEtBQUsyYSxLQUFMLENBQVdqTyxJQUFYLENBQWdCLHNCQUFoQixDQUFoQjtBQUNBMU0sU0FBS3NiLE1BQUwsR0FBY3RiLEtBQUsyYSxLQUFMLENBQVdqTyxJQUFYLENBQWdCLDRCQUFoQixDQUFkO0FBQ0ExTSxTQUFLOFosTUFBTCxHQUFjOVosS0FBSzJhLEtBQUwsQ0FBV2pPLElBQVgsQ0FBZ0IsNEJBQWhCLENBQWQ7QUFDQTFNLFNBQUswYSxPQUFMLEdBQWUxYSxLQUFLMmEsS0FBTCxDQUFXak8sSUFBWCxDQUFnQiw2QkFBaEIsQ0FBZjtBQUNBa04sZUFBVzVXLElBQVgsU0FBc0JoRCxJQUF0QjtBQUNBO0FBQ0EsV0FBS2dhLE1BQUwsQ0FBWXpULElBQVosQ0FBaUJ2RyxJQUFqQjtBQUNELEdBYkQ7O0FBZUEsTUFBSXljLGFBQUosRUFBbUI7QUFDakIsU0FBS2dCLGdCQUFMLENBQXNCaEIsYUFBdEI7QUFDRDtBQUNGLENBckVEO0FBc0VBOztBQUVBOzs7O0lBR01pQixZOzs7QUFDSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxREEsd0JBQVk5ZSxNQUFaLEVBQW9CO0FBQUE7O0FBR2xCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSGtCOztBQStCbEIsV0FBS0EsTUFBTCxHQUFjO0FBQ1o4VCxzQkFBZ0IsT0FESjtBQUVaNVMsYUFBTyxTQUZLO0FBR1oyTixtQkFBYSxHQUhEO0FBSVp1TSxjQUFRO0FBQ04yRCxpQkFBUztBQUNQemUsaUJBQU8sRUFEQTtBQUVQNFUsa0JBQVEsRUFGRDtBQUdQOEoscUJBQVc7QUFISixTQURIO0FBTU4vZCxlQUFPO0FBQ0xYLGlCQUFPO0FBREYsU0FORDtBQVNOK2EsZ0JBQVE7QUFDTjRELHVCQUFhLENBRFA7QUFFTnZELGtCQUFRLEVBRkY7QUFHTkosdUJBQWEsRUFIUDtBQUlOa0Qsd0JBQWM7QUFKUixTQVRGO0FBZU5qSixjQUFNLENBQ0osRUFBQ3RVLE9BQU8sS0FBUixFQUFlOEIsT0FBTyxTQUF0QixFQURJLEVBRUosRUFBQzlCLE9BQU8sUUFBUixFQUFrQjhCLE9BQU8sU0FBekIsRUFGSSxFQUdKLEVBQUM5QixPQUFPLFFBQVIsRUFBa0I4QixPQUFPLFNBQXpCLEVBSEksRUFJSixFQUFDOUIsT0FBTyxPQUFSLEVBQWlCOEIsT0FBTyxTQUF4QixFQUpJLEVBS0osRUFBQzlCLE9BQU8sTUFBUixFQUFnQjhCLE9BQU8sU0FBdkIsRUFMSSxFQU1KLEVBQUM5QixPQUFPLFFBQVIsRUFBa0I4QixPQUFPLFNBQXpCLEVBTkk7QUFPSjtBQUNBO0FBQ0EsVUFBQzlCLE9BQU8sT0FBUixFQUFpQjhCLE9BQU8sU0FBeEIsRUFUSSxFQVVKLEVBQUM5QixPQUFPLE9BQVIsRUFBaUI4QixPQUFPLFNBQXhCLEVBVkk7QUFmQSxPQUpJO0FBZ0NabWMsZ0JBQVU7QUFDUmhLLGdCQUFRO0FBREEsT0FoQ0U7QUFtQ1oxQyxrQkFBWTtBQW5DQSxLQUFkO0FBcUNBLG9CQUFPMUQsTUFBUCxDQUFjLElBQWQsRUFBb0IsT0FBSzlPLE1BQXpCLEVBQWlDQSxNQUFqQzs7QUFFQTtBQUNBOzs7QUFHQSxXQUFLMk4sT0FBTCxHQUFlLElBQWY7QUFDQTs7O0FBR0EsV0FBSzhQLElBQUwsR0FBWSxFQUFaO0FBQ0E7OztBQUdBLFdBQUtyQyxNQUFMLEdBQWMsRUFBZDs7QUFFQSxXQUFLbk0sSUFBTDtBQXBGa0I7QUFxRm5COztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsyQkE0Qk87QUFBQTs7QUFDTCxXQUFLNU8sY0FBTCxHQUFzQixLQUFLTCxNQUFMLENBQVlLLGNBQWxDO0FBQ0EsYUFBTyxLQUFLTCxNQUFMLENBQVlLLGNBQW5CO0FBQ0EsV0FBS2MsT0FBTCxHQUFlLEtBQUtuQixNQUFMLENBQVltQixPQUEzQjtBQUNBLGFBQU8sS0FBS25CLE1BQUwsQ0FBWW1CLE9BQW5CO0FBQ0EsV0FBS3diLGFBQUwsR0FBcUIsS0FBSzNjLE1BQUwsQ0FBWTJjLGFBQWpDO0FBQ0EsYUFBTyxLQUFLM2MsTUFBTCxDQUFZMmMsYUFBbkI7O0FBRUEsVUFBSSxDQUFDLEtBQUszYyxNQUFMLENBQVlKLE1BQWpCLEVBQXlCO0FBQ3ZCaUQsZ0JBQVFDLEdBQVIsQ0FBWSxrQkFBS2lMLFFBQUwsQ0FBYyxZQUFkLEVBQTRCLEtBQTVCLEVBQW1DLFdBQW5DLENBQVo7QUFDRDtBQUNELFdBQUtKLE9BQUwsR0FBZSxxQkFBTyxLQUFLM04sTUFBTCxDQUFZSixNQUFuQixDQUFmOztBQUVBMFksaUJBQVcsWUFBTTtBQUNmc0YsaUJBQVF4WixJQUFSLFNBQW1CLENBQUMsT0FBS3BFLE1BQUwsQ0FBWTZkLGFBQVosSUFBNkIsRUFBOUIsRUFBa0NzQixJQUFsQyxFQUFuQixFQURlLENBQytDO0FBQy9ELE9BRkQ7O0FBSUE7QUFDQSxXQUFLalEsUUFBTDtBQUNEOztBQUVEOzs7Ozs7K0JBR1c7QUFDVCxVQUFJLEtBQUtDLFdBQVQsRUFBc0IsT0FBTyxJQUFQO0FBQ3RCLFdBQUtBLFdBQUwsR0FBbUIsSUFBbkI7QUFDRDs7QUFFRDs7Ozs7Ozs4QkFJVTtBQUNSeU8sZUFBUXhaLElBQVIsQ0FBYSxJQUFiO0FBQ0EsYUFBTyxJQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7O3FDQUtpQnlaLGEsRUFBZTtBQUM5QixVQUFJdUIsU0FBUyxrQkFBRTVDLEtBQUYsQ0FBUXFCLGNBQWNzQixJQUFkLEVBQVIsQ0FBYjtBQUNBO0FBQ0EsVUFBSUUsZUFBZSxNQUFNLENBQXpCO0FBQUEsVUFBNEJDLG9CQUFvQixDQUFDLENBQWpEOztBQUVBLFdBQUtsRSxNQUFMLENBQVk1RixPQUFaLENBQW9CLFVBQVV5SSxDQUFWLEVBQWFzQixJQUFiLEVBQW1CO0FBQ3JDLFlBQUlDLFFBQVF2QixFQUFFckIsTUFBRixDQUFTUSxNQUFULEVBQVo7QUFBQSxZQUErQnFDLFFBQVFMLE9BQU9oQyxNQUFQLEVBQXZDO0FBQ0EsWUFBSXNDLFlBQVkxSyxLQUFLMkssR0FBTCxDQUFTSCxNQUFNSSxDQUFOLEdBQVVILE1BQU1HLENBQXpCLElBQThCNUssS0FBSzJLLEdBQUwsQ0FBU0gsTUFBTWhhLENBQU4sR0FBVWlhLE1BQU1qYSxDQUF6QixDQUE5QixHQUE0RHdQLEtBQUsySyxHQUFMLENBQVNILE1BQU1uQyxDQUFOLEdBQVVvQyxNQUFNcEMsQ0FBekIsQ0FBNUU7QUFDQSxZQUFJcUMsWUFBWUwsWUFBaEIsRUFBOEI7QUFDNUJBLHlCQUFlSyxTQUFmO0FBQ0FKLDhCQUFvQkMsSUFBcEI7QUFDRDtBQUNGLE9BUEQ7O0FBU0EsVUFBSUQsb0JBQW9CLENBQUMsQ0FBekIsRUFBNEI7QUFDMUIsWUFBSTVELGVBQUo7QUFBQSxZQUFZSCxtQkFBWjtBQUFBLFlBQ0VuYSxPQUFPLEtBQUtnYSxNQUFMLENBQVlrRSxpQkFBWixDQURUOztBQUdBbGUsYUFBS3FhLE9BQUwsR0FBZXdCLGNBQWM3WSxJQUFkLENBQW1CLElBQW5CLEVBQXlCaEQsSUFBekIsRUFBK0JnZSxNQUEvQixDQUFmO0FBQ0E3RCxxQkFBYUMsbUJBQW1CcFgsSUFBbkIsQ0FBd0IsSUFBeEIsRUFBOEJoRCxJQUE5QixFQUFvQ0EsS0FBS3FhLE9BQXpDLENBQWI7QUFDQTtBQUNBcmEsYUFBSzBhLE9BQUwsQ0FBYTNJLEdBQWIsQ0FBaUIsRUFBQzFTLE1BQU04YSxVQUFQLEVBQWpCOztBQUVBRyxpQkFBU0MsbUJBQW1CdlgsSUFBbkIsQ0FBd0IsSUFBeEIsRUFBOEJoRCxJQUE5QixFQUFvQ21hLFVBQXBDLENBQVQ7QUFDQUssMkJBQW1CeFgsSUFBbkIsQ0FBd0IsSUFBeEIsRUFBOEJoRCxJQUE5QixFQUFvQ3lhLGNBQWN6WCxJQUFkLENBQW1CLElBQW5CLEVBQXlCaEQsSUFBekIsRUFBK0JzYSxNQUEvQixDQUFwQztBQUNEOztBQUVELGFBQU8sSUFBUDtBQUNEOzs7Ozs7a0JBR1lvRCxZOzs7Ozs7O0FDL2dCZjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxnQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDLEM7Ozs7Ozs7QUN6QkE7QUFDQTs7O0FBR0E7QUFDQSxpRUFBa0UsVUFBVSxtQkFBbUIsRUFBRSxRQUFRLG1CQUFtQixFQUFFLEVBQUUseUNBQXlDLFVBQVUsbUJBQW1CLEVBQUUsUUFBUSxtQkFBbUIsRUFBRSxFQUFFLG9DQUFvQyxVQUFVLG1CQUFtQixFQUFFLFFBQVEsbUJBQW1CLEVBQUUsRUFBRSwwQkFBMEIsMkJBQTJCLHVCQUF1QixFQUFFLCtGQUErRiw2QkFBNkIsRUFBRSxzR0FBc0cscUJBQXFCLGtCQUFrQixFQUFFLGdJQUFnSSwyQkFBMkIsMEJBQTBCLHlCQUF5QixFQUFFLCtJQUErSSxpQ0FBaUMsRUFBRSxrTUFBa00sMkJBQTJCLGdDQUFnQyxFQUFFLDhMQUE4TCxnQ0FBZ0MsRUFBRSxxS0FBcUssc0JBQXNCLEVBQUUsbU1BQW1NLDhCQUE4Qiw2QkFBNkIsRUFBRSwrTEFBK0wsNkJBQTZCLEVBQUUsc0tBQXNLLHlCQUF5QixFQUFFLGlLQUFpSyw4QkFBOEIseUJBQXlCLDBCQUEwQixFQUFFLDhMQUE4TCwrQkFBK0IseUJBQXlCLDhCQUE4QixnQ0FBZ0Msa0NBQWtDLDZCQUE2QixFQUFFLDBMQUEwTCwrQkFBK0Isa0NBQWtDLDhCQUE4QixnQ0FBZ0MseUJBQXlCLG1FQUFtRSxFQUFFLCtKQUErSiw4QkFBOEIsMEJBQTBCLEVBQUUsZ0tBQWdLLDhCQUE4QixFQUFFLCtMQUErTCwrQkFBK0IsMkJBQTJCLHlCQUF5QiwrQkFBK0IseURBQXlELEVBQUUsZ01BQWdNLCtCQUErQixzQkFBc0IscUJBQXFCLEVBQUUsc09BQXNPLDZCQUE2QixpQ0FBaUMsMEJBQTBCLHlCQUF5QiwwQkFBMEIsMkJBQTJCLGdDQUFnQyxrQ0FBa0Msb0NBQW9DLHdDQUF3QyxrRkFBa0YseUVBQXlFLHVEQUF1RCwyQkFBMkIsaUNBQWlDLGlDQUFpQyxFQUFFOztBQUU3cks7Ozs7Ozs7O0FDUEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDOzs7Ozs7O0FDekJBO0FBQ0E7OztBQUdBO0FBQ0EsdURBQXdELFFBQVEsbUJBQW1CLDBDQUEwQyxFQUFFLFVBQVUsbUJBQW1CLHlDQUF5QyxFQUFFLEVBQUUsK0JBQStCLFFBQVEsbUJBQW1CLHVDQUF1QyxFQUFFLFVBQVUsbUJBQW1CLHNDQUFzQyxFQUFFLEVBQUUsMEJBQTBCLFFBQVEsbUJBQW1CLDBDQUEwQyx1Q0FBdUMsc0NBQXNDLHFDQUFxQyxrQ0FBa0MsRUFBRSxVQUFVLG1CQUFtQix5Q0FBeUMsc0NBQXNDLHFDQUFxQyxvQ0FBb0MsaUNBQWlDLEVBQUUsRUFBRSwwQ0FBMEMsVUFBVSxtQkFBbUIseUNBQXlDLEVBQUUsUUFBUSxtQkFBbUIsdURBQXVELEVBQUUsRUFBRSx1Q0FBdUMsVUFBVSxtQkFBbUIsc0NBQXNDLEVBQUUsUUFBUSxtQkFBbUIsb0RBQW9ELEVBQUUsRUFBRSxrQ0FBa0MsVUFBVSxtQkFBbUIseUNBQXlDLHNDQUFzQyxxQ0FBcUMsb0NBQW9DLGlDQUFpQyxFQUFFLFFBQVEsbUJBQW1CLHVEQUF1RCxvREFBb0QsbURBQW1ELGtEQUFrRCwrQ0FBK0MsRUFBRSxFQUFFLHlCQUF5QiwyQkFBMkIsa0JBQWtCLHVCQUF1QixZQUFZLFdBQVcsOEJBQThCLDJCQUEyQixzQkFBc0IseUNBQXlDLHNDQUFzQyxxQ0FBcUMsb0NBQW9DLGlDQUFpQyxzRkFBc0YsbUZBQW1GLDhFQUE4RSxxQ0FBcUMsa0NBQWtDLGlDQUFpQyxnQ0FBZ0MsNkJBQTZCLHlDQUF5QyxzQ0FBc0MscUNBQXFDLG9DQUFvQyxpQ0FBaUMsMERBQTBELHFEQUFxRCxpQ0FBaUMsNERBQTRELG1EQUFtRCxzQkFBc0IsdUJBQXVCLHVCQUF1QixxREFBcUQsRUFBRSw0RkFBNEYsNkJBQTZCLEVBQUUsNENBQTRDLHVCQUF1Qix5QkFBeUIsMkNBQTJDLGtDQUFrQyxtQ0FBbUMsa0JBQWtCLGdDQUFnQyxpRUFBaUUsd0RBQXdELEVBQUUscURBQXFELHlCQUF5Qix1QkFBdUIsK0JBQStCLGdFQUFnRSx1REFBdUQsRUFBRSx5Q0FBeUMsbUJBQW1CLHlCQUF5QixFQUFFLDhEQUE4RCx3QkFBd0IsRUFBRSx1RkFBdUYsNEJBQTRCLDZCQUE2Qiw2QkFBNkIsdUJBQXVCLDJCQUEyQixFQUFFLDhEQUE4RCxrQ0FBa0MsRUFBRSx3RkFBd0YsNEJBQTRCLEVBQUUsd0RBQXdELHlCQUF5QixlQUFlLGdCQUFnQixnQkFBZ0IsYUFBYSxFQUFFLGlFQUFpRSxxQkFBcUIsMkJBQTJCLGlCQUFpQixrQkFBa0Isb0JBQW9CLG1CQUFtQiw0Q0FBNEMsNkNBQTZDLHVDQUF1QyxFQUFFLGdFQUFnRSxxQkFBcUIsMkJBQTJCLGlCQUFpQixrQkFBa0Isb0JBQW9CLG1CQUFtQiw0Q0FBNEMsNkNBQTZDLHVDQUF1QyxFQUFFLDBEQUEwRCx5QkFBeUIsZUFBZSxnQkFBZ0IsZUFBZSxlQUFlLEVBQUUsbUVBQW1FLHFCQUFxQiwyQkFBMkIsaUJBQWlCLGtCQUFrQixxQkFBcUIsbUJBQW1CLDJDQUEyQyw4Q0FBOEMscUNBQXFDLEVBQUUsa0VBQWtFLHFCQUFxQiwyQkFBMkIsaUJBQWlCLGtCQUFrQixxQkFBcUIsbUJBQW1CLDJDQUEyQyw4Q0FBOEMscUNBQXFDLEVBQUUsMkRBQTJELHlCQUF5QixlQUFlLGdCQUFnQixnQkFBZ0IsZ0JBQWdCLEVBQUUsb0VBQW9FLHFCQUFxQiwyQkFBMkIsaUJBQWlCLGtCQUFrQixvQkFBb0Isc0JBQXNCLDRDQUE0Qyw2Q0FBNkMsb0NBQW9DLEVBQUUsbUVBQW1FLHFCQUFxQiwyQkFBMkIsaUJBQWlCLGtCQUFrQixvQkFBb0Isc0JBQXNCLDRDQUE0Qyw2Q0FBNkMsb0NBQW9DLEVBQUUseURBQXlELHlCQUF5QixlQUFlLGdCQUFnQixjQUFjLGVBQWUsRUFBRSxrRUFBa0UscUJBQXFCLDJCQUEyQixpQkFBaUIsa0JBQWtCLG9CQUFvQixtQkFBbUIsMkNBQTJDLDhDQUE4QyxzQ0FBc0MsRUFBRSxpRUFBaUUscUJBQXFCLDJCQUEyQixpQkFBaUIsa0JBQWtCLG9CQUFvQixtQkFBbUIsMkNBQTJDLDhDQUE4QyxzQ0FBc0MsRUFBRSxpQ0FBaUMsNkZBQTZGLDBGQUEwRixxRkFBcUYsRUFBRSx1Q0FBdUMsMkNBQTJDLHdDQUF3Qyx1Q0FBdUMsc0NBQXNDLG1DQUFtQyxFQUFFLHlDQUF5Qyw2Q0FBNkMsMENBQTBDLHlDQUF5Qyx3Q0FBd0MscUNBQXFDLEVBQUUsMENBQTBDLDhDQUE4QywyQ0FBMkMsMENBQTBDLHlDQUF5QyxzQ0FBc0MsRUFBRSx3Q0FBd0MsNENBQTRDLHlDQUF5Qyx3Q0FBd0MsdUNBQXVDLG9DQUFvQyxFQUFFLHFEQUFxRCxvQkFBb0IsRUFBRSxzRUFBc0UsMEJBQTBCLDJCQUEyQixFQUFFLG1FQUFtRSxpQkFBaUIsRUFBRSx3RkFBd0YscUJBQXFCLEVBQUUsb0RBQW9ELG9CQUFvQixFQUFFLHFFQUFxRSwwQkFBMEIsMkJBQTJCLEVBQUUsa0VBQWtFLGlCQUFpQixFQUFFLHVGQUF1RixxQkFBcUIsRUFBRTs7QUFFaDlTOzs7Ozs7Ozs7Ozs7Ozs7OztBQ1BBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUNBOztBQUVBLElBQUl4TSxPQUFPO0FBQ1R1TixZQURTLHNCQUNFck4sVUFERixFQUNjO0FBQ3JCO0FBb0JEO0FBdEJRLENBQVg7O0FBeUJBLElBQU1uUyxpQkFBaUIsU0FBakJBLGNBQWlCLENBQVVlLElBQVYsRUFBZ0J3UixJQUFoQixFQUFzQjtBQUMzQyxNQUFJeFIsUUFBUUEsS0FBS2YsY0FBakIsRUFBaUM7QUFDL0JlLFNBQUtmLGNBQUwsQ0FBb0IrRCxJQUFwQixDQUF5QndPLElBQXpCLEVBQStCQSxJQUEvQjtBQUNELEdBRkQsTUFHSyxJQUFJLEtBQUt2UyxjQUFULEVBQXlCO0FBQzVCLFNBQUtBLGNBQUwsQ0FBb0IrRCxJQUFwQixDQUF5QndPLElBQXpCLEVBQStCQSxJQUEvQjtBQUNEO0FBQ0QsU0FBTyxJQUFQO0FBQ0QsQ0FSRDtBQVNBLElBQU1rTixtQkFBb0IsWUFBWTtBQUNwQyxNQUFNQyxjQUFjO0FBQ2xCLGFBQVMsZUFBVXZRLE1BQVYsRUFBa0J4RCxDQUFsQixFQUFxQjtBQUM1QixXQUFLZ1UsSUFBTCxDQUFVeFEsTUFBVjtBQUNELEtBSGlCO0FBSWxCLGFBQVMsZUFBVUEsTUFBVixFQUFrQnhELENBQWxCLEVBQXFCO0FBQzVCLFdBQUtnVSxJQUFMLENBQVV4USxNQUFWO0FBQ0Q7QUFOaUIsR0FBcEI7QUFRQSxNQUFNeVEsYUFBYTtBQUNqQixXQUFPLFlBQVV6USxNQUFWLEVBQWtCMFEsTUFBbEIsRUFBMEI7QUFDL0IsVUFBSTllLE9BQU8sS0FBS2dOLEtBQUwsQ0FBV29CLE1BQVgsQ0FBWDtBQUFBLFVBQ0VuTyxjQUFjNmUsT0FBTzNkLE1BRHZCO0FBQUEsVUFFRXZDLFNBQVM7QUFDUHFCLHFCQUFhQSxlQUFlO0FBRHJCLE9BRlg7O0FBTUEsVUFBSUEsY0FBYyxDQUFsQixFQUFxQjtBQUNuQnJCLGVBQU9nQixJQUFQLEdBQWM7QUFDWmUsY0FBSSxFQUFDZCxPQUFPLEtBQUtqQixNQUFMLENBQVlhLElBQVosQ0FBaUIsSUFBakIsQ0FBUixFQUFnQ0ssT0FBTyxLQUFLbEIsTUFBTCxDQUFZa0IsS0FBbkQ7QUFEUSxTQUFkO0FBR0Q7O0FBRUQsV0FBS2tOLEtBQUwsQ0FBV29CLE1BQVgsSUFBcUIsZ0JBQU9WLE1BQVAsQ0FBYyxJQUFkLEVBQW9COU8sTUFBcEIsRUFBNEJvQixJQUE1QixDQUFyQjs7QUFFQXBCLGVBQVMsSUFBVDtBQUNBcUIsb0JBQWMsSUFBZDtBQUNELEtBbEJnQjtBQW1CakIsWUFBUSxjQUFVbU8sTUFBVixFQUFrQjBRLE1BQWxCLEVBQTBCO0FBQ2hDLFVBQUk5ZSxPQUFPLEtBQUtnTixLQUFMLENBQVdvQixNQUFYLENBQVg7QUFBQSxVQUNFdE0sZUFBZ0I5QixLQUFLdEIsT0FBTixHQUFpQnNCLEtBQUt0QixPQUFMLENBQWFRLEtBQWIsSUFBc0IsR0FBdkMsR0FBNkMsR0FEOUQ7QUFBQSxVQUVFNmYsZ0JBQWlCL2UsS0FBS3RCLE9BQU4sR0FBaUJzQixLQUFLdEIsT0FBTCxDQUFhUyxNQUFiLElBQXVCLENBQXhDLEdBQTRDLENBRjlEO0FBQUEsVUFHRWMsY0FBYzZlLE9BQU8zZCxNQUh2QjtBQUFBLFVBSUV2QyxTQUFTO0FBQ1BrRCxzQkFBZUEsZUFBZTdCLFdBQWhCLEdBQWdDLENBQUNBLGNBQWMsQ0FBZixJQUFvQjhlLGFBRDNEO0FBRVByZ0IsaUJBQVMsRUFBQ1EsT0FBTzRDLFlBQVIsRUFBc0IzQyxRQUFRNGYsYUFBOUIsRUFGRjtBQUdQOWUscUJBQWFBLGVBQWU7QUFIckIsT0FKWDs7QUFVQSxVQUFJQSxjQUFjLENBQWQsSUFBbUIsQ0FBQ0QsS0FBS0osSUFBN0IsRUFBbUM7QUFDakNoQixlQUFPZ0IsSUFBUCxHQUFjO0FBQ1plLGNBQUksRUFBQ2QsT0FBTyxLQUFLakIsTUFBTCxDQUFZYSxJQUFaLENBQWlCLElBQWpCLENBQVIsRUFBZ0NLLE9BQU8sS0FBS2xCLE1BQUwsQ0FBWWtCLEtBQW5EO0FBRFEsU0FBZDtBQUdEOztBQUVELFdBQUtrTixLQUFMLENBQVdvQixNQUFYLElBQXFCLGdCQUFPVixNQUFQLENBQWMsSUFBZCxFQUFvQjlPLE1BQXBCLEVBQTRCb0IsSUFBNUIsQ0FBckI7O0FBRUE4QixxQkFBZSxJQUFmO0FBQ0FpZCxzQkFBZ0IsSUFBaEI7QUFDQW5nQixlQUFTLElBQVQ7QUFDQXFCLG9CQUFjLElBQWQ7QUFDRCxLQTFDZ0I7QUEyQ2pCLGtCQUFjLG1CQUFVbU8sTUFBVixFQUFrQjBRLE1BQWxCLEVBQTBCO0FBQ3RDLFVBQUk5ZSxPQUFPLEtBQUtnTixLQUFMLENBQVdvQixNQUFYLENBQVg7QUFBQSxVQUNFbk8sY0FBYzZlLE9BQU8zZCxNQUR2QjtBQUFBLFVBRUV2QyxTQUFTO0FBQ1BxQixxQkFBYUEsZUFBZTtBQURyQixPQUZYOztBQU1BLFdBQUsrTSxLQUFMLENBQVdvQixNQUFYLElBQXFCLGdCQUFPVixNQUFQLENBQWMsSUFBZCxFQUFvQjlPLE1BQXBCLEVBQTRCb0IsSUFBNUIsQ0FBckI7O0FBRUFwQixlQUFTLElBQVQ7QUFDQXFCLG9CQUFjLElBQWQ7QUFDRCxLQXREZ0I7QUF1RGpCLGdCQUFZLGtCQUFVbU8sTUFBVixFQUFrQjBRLE1BQWxCLEVBQTBCO0FBQ3BDLFVBQUk5ZSxPQUFPLEtBQUtnTixLQUFMLENBQVdvQixNQUFYLENBQVg7QUFBQSxVQUNFbk8sY0FBYzZlLE9BQU8zZCxNQUR2QjtBQUFBLFVBRUV2QyxTQUFTO0FBQ1BxQixxQkFBYUEsZUFBZTtBQURyQixPQUZYOztBQU1BLFdBQUsrTSxLQUFMLENBQVdvQixNQUFYLElBQXFCLGdCQUFPVixNQUFQLENBQWMsSUFBZCxFQUFvQjlPLE1BQXBCLEVBQTRCb0IsSUFBNUIsQ0FBckI7O0FBRUFwQixlQUFTLElBQVQ7QUFDQXFCLG9CQUFjLElBQWQ7QUFDRCxLQWxFZ0I7QUFtRWpCLGNBQVUsZ0JBQVVtTyxNQUFWLEVBQWtCMFEsTUFBbEIsRUFBMEI7QUFDbEMsVUFBSTllLE9BQU8sS0FBS2dOLEtBQUwsQ0FBV29CLE1BQVgsQ0FBWDtBQUFBLFVBQ0VuTyxjQUFjNmUsT0FBTzNkLE1BRHZCO0FBQUEsVUFFRXZDLFNBQVM7QUFDUHFCLHFCQUFhQSxlQUFlO0FBRHJCLE9BRlg7O0FBTUEsV0FBSytNLEtBQUwsQ0FBV29CLE1BQVgsSUFBcUIsZ0JBQU9WLE1BQVAsQ0FBYyxJQUFkLEVBQW9COU8sTUFBcEIsRUFBNEJvQixJQUE1QixDQUFyQjs7QUFFQXBCLGVBQVMsSUFBVDtBQUNBcUIsb0JBQWMsSUFBZDtBQUNELEtBOUVnQjtBQStFakIsYUFBUyxlQUFVbU8sTUFBVixFQUFrQjBRLE1BQWxCLEVBQTBCO0FBQ2pDLFVBQUk5ZSxPQUFPLEtBQUtnTixLQUFMLENBQVdvQixNQUFYLENBQVg7QUFBQSxVQUNFdE0sZUFBZ0I5QixLQUFLdEIsT0FBTixHQUFpQnNCLEtBQUt0QixPQUFMLENBQWFRLEtBQWIsSUFBc0IsR0FBdkMsR0FBNkMsR0FEOUQ7QUFBQSxVQUVFNmYsZ0JBQWlCL2UsS0FBS3RCLE9BQU4sR0FBaUJzQixLQUFLdEIsT0FBTCxDQUFhUyxNQUFiLElBQXVCLENBQXhDLEdBQTRDLENBRjlEO0FBQUEsVUFHRWMsY0FBYzZlLE9BQU8zZCxNQUh2QjtBQUFBLFVBSUV2QyxTQUFTO0FBQ1BrRCxzQkFBZUEsZUFBZTdCLFdBQWhCLEdBQWdDLENBQUNBLGNBQWMsQ0FBZixJQUFvQjhlLGFBRDNEO0FBRVByZ0IsaUJBQVMsRUFBQ1EsT0FBTzRDLFlBQVIsRUFBc0IzQyxRQUFRNGYsYUFBOUIsRUFGRjtBQUdQOWUscUJBQWFBLGVBQWU7QUFIckIsT0FKWDtBQUFBLFVBU0UrZSxnQkFBZ0JoZixLQUFLdU0sT0FBTCxDQUFhRyxJQUFiLENBQWtCLGtDQUFsQixDQVRsQjs7QUFXQSxVQUFJc1MsY0FBY3hULEdBQWQsQ0FBa0IsQ0FBbEIsQ0FBSixFQUEwQjtBQUN4QndULHNCQUFjak4sR0FBZCxDQUFrQixFQUFDLG9CQUFvQixNQUFNLGtCQUFFcUosS0FBRixDQUFRMEQsT0FBTy9ULEdBQVAsTUFBZ0IsU0FBeEIsRUFBbUM0USxXQUFuQyxFQUEzQixFQUFsQjtBQUNBO0FBQ0FtRCxlQUFPL1IsRUFBUCxDQUFVLFFBQVYsRUFBb0IsWUFBWTtBQUM5QmlTLHdCQUFjak4sR0FBZCxDQUFrQixFQUFDLG9CQUFvQixNQUFNLGtCQUFFcUosS0FBRixDQUFRLEtBQUt6WixLQUFMLElBQWMsU0FBdEIsRUFBaUNnYSxXQUFqQyxFQUEzQixFQUFsQjtBQUNELFNBRkQ7QUFHRDs7QUFFRCxVQUFJMWIsY0FBYyxDQUFkLElBQW1CLENBQUNELEtBQUtKLElBQTdCLEVBQW1DO0FBQ2pDaEIsZUFBT2dCLElBQVAsR0FBYztBQUNaZSxjQUFJLEVBQUNkLE9BQU8sS0FBS2pCLE1BQUwsQ0FBWWEsSUFBWixDQUFpQixJQUFqQixDQUFSLEVBQWdDSyxPQUFPLEtBQUtsQixNQUFMLENBQVlrQixLQUFuRDtBQURRLFNBQWQ7QUFHRDs7QUFFRCxXQUFLa04sS0FBTCxDQUFXb0IsTUFBWCxJQUFxQixnQkFBT1YsTUFBUCxDQUFjLElBQWQsRUFBb0I5TyxNQUFwQixFQUE0Qm9CLElBQTVCLENBQXJCOztBQUVBOEIscUJBQWUsSUFBZjtBQUNBaWQsc0JBQWdCLElBQWhCO0FBQ0FuZ0IsZUFBUyxJQUFUO0FBQ0FxQixvQkFBYyxJQUFkO0FBQ0Q7QUEvR2dCLEdBQW5COztBQWtIQSxTQUFPLFVBQVVtTyxNQUFWLEVBQWtCO0FBQ3ZCLFFBQUlwTyxPQUFPLEtBQUtnTixLQUFMLENBQVdvQixNQUFYLENBQVg7QUFBQSxRQUNFckUsY0FERjs7QUFHQSxRQUFJLENBQUMvSixLQUFLdEIsT0FBVixFQUFtQjtBQUNqQitDLGNBQVFDLEdBQVIsQ0FBWSxrQkFBS2lMLFFBQUwsQ0FBYyxXQUFkLEVBQTJCLEtBQTNCLEVBQWtDLE1BQWxDLENBQVo7QUFDQSxhQUFPLElBQVA7QUFDRDs7QUFFRDVDLFlBQVMvSixLQUFLdU0sT0FBTCxDQUFhZixHQUFiLENBQWlCLENBQWpCLEVBQW9CZ0IsT0FBcEIsQ0FBNEJ5TyxXQUE1QixNQUE2QyxPQUE5QyxHQUF5RGpiLEtBQUt1TSxPQUE5RCxHQUF3RXZNLEtBQUt1TSxPQUFMLENBQWFHLElBQWIsQ0FBa0IsYUFBbEIsQ0FBaEY7O0FBRUE7QUFDQSxRQUFJLGtCQUFFekosVUFBRixDQUFhakQsS0FBS3RCLE9BQWxCLENBQUosRUFBZ0M7QUFDOUJtZ0IsaUJBQVcsS0FBWCxFQUFrQjdiLElBQWxCLENBQXVCLElBQXZCLEVBQTZCb0wsTUFBN0IsRUFBcUNyRSxLQUFyQztBQUNELEtBRkQsTUFHSztBQUNILFdBQUssSUFBSXNPLEdBQVQsSUFBZ0J3RyxVQUFoQixFQUE0QjtBQUMxQixZQUFJN2UsS0FBS3RCLE9BQUwsQ0FBYUMsSUFBYixJQUFxQjBaLEdBQXpCLEVBQThCO0FBQzVCd0cscUJBQVd4RyxHQUFYLEVBQWdCclYsSUFBaEIsQ0FBcUIsSUFBckIsRUFBMkJvTCxNQUEzQixFQUFtQ3JFLEtBQW5DO0FBQ0E7QUFDRDtBQUNGO0FBQ0Y7O0FBRURBLFVBQ0c5SCxHQURILENBQ08saUJBRFAsRUFFR0EsR0FGSCxDQUVPLGlCQUZQLEVBR0c4SyxFQUhILENBR00saUJBSE4sRUFHeUI0UixZQUFZM1UsS0FBWixDQUFrQjFMLElBQWxCLENBQXVCLElBQXZCLEVBQTZCOFAsTUFBN0IsQ0FIekIsRUFJR3JCLEVBSkgsQ0FJTSxpQkFKTixFQUl5QjRSLFlBQVlNLEtBQVosQ0FBa0IzZ0IsSUFBbEIsQ0FBdUIsSUFBdkIsRUFBNkI4UCxNQUE3QixDQUp6Qjs7QUFNQXBPLFNBQUt1TSxPQUFMLENBQ0dHLElBREgsQ0FDUSxvQkFEUixFQUVHekssR0FGSCxDQUVPLGlCQUZQLEVBR0c4SyxFQUhILENBR00saUJBSE4sRUFHeUI0UixZQUFZTSxLQUFaLENBQWtCM2dCLElBQWxCLENBQXVCLElBQXZCLEVBQTZCOFAsTUFBN0IsQ0FIekI7O0FBS0EsUUFBSXBPLEtBQUt0QixPQUFMLENBQWFLLFNBQWpCLEVBQTRCO0FBQzFCLFdBQUtBLFNBQUwsQ0FBZVQsSUFBZixDQUFvQixnQkFBT29QLE1BQVAsQ0FBYyxFQUFkLEVBQWtCMU4sS0FBS3RCLE9BQUwsQ0FBYUssU0FBL0IsRUFBMEMsRUFBQ1AsUUFBUXVMLEtBQVQsRUFBMUMsQ0FBcEI7QUFDRDs7QUFFREEsWUFBUSxJQUFSO0FBQ0EvSixXQUFPLElBQVA7QUFDQW9PLGFBQVMsSUFBVDtBQUNBLFdBQU8sSUFBUDtBQUNELEdBM0NEO0FBNENELENBdkt3QixFQUF6QjtBQXdLQSxJQUFNOFEsY0FBYyxTQUFkQSxXQUFjLENBQVVDLE1BQVYsRUFBa0I7QUFDcEMsTUFBSSxDQUFDLEtBQUtDLFlBQVYsRUFBd0IsT0FBTyxJQUFQOztBQUV4QixNQUFJQyxlQUFlLFNBQWZBLFlBQWUsQ0FBVXJmLElBQVYsRUFBZ0I7QUFDakMsUUFBSXNmLFVBQVUscUJBQU9wSyxNQUFQLENBQWQ7QUFBQSxRQUE4QmhYLFFBQVEscUJBQU80TixTQUFTb1EsSUFBaEIsQ0FBdEM7QUFDQSxRQUFJaFcsTUFBTSxFQUFWO0FBQUEsUUFBY3FaLGlCQUFpQixFQUEvQjtBQUFBLFFBQ0VDLE1BQU0sRUFEUjtBQUFBLFFBQ1lDLFlBQVksRUFEeEI7QUFBQSxRQUVFQyx3QkFGRjs7QUFJQXhaLFVBQU1sRyxLQUFLdU0sT0FBTCxDQUFhNE8sTUFBYixFQUFOO0FBQ0FxRSxVQUFNO0FBQ0p0Z0IsYUFBT2MsS0FBS3VNLE9BQUwsQ0FBYW9ULFVBQWIsRUFESDtBQUVKN0wsY0FBUTlULEtBQUt1TSxPQUFMLENBQWFxVCxXQUFiO0FBRkosS0FBTjtBQUlBSCxnQkFBWTtBQUNWSSxnQkFBVWpNLEtBQUtrTSxHQUFMLENBQVNSLFFBQVFwZ0IsS0FBUixFQUFULEVBQTBCaEIsTUFBTWdCLEtBQU4sRUFBMUIsQ0FEQTtBQUVWNmdCLGlCQUFXbk0sS0FBS2tNLEdBQUwsQ0FBU1IsUUFBUXhMLE1BQVIsRUFBVCxFQUEyQjVWLE1BQU00VixNQUFOLEVBQTNCLENBRkQ7QUFHVjVVLGFBQU8sS0FBS2tnQixZQUFMLENBQWtCTyxVQUFsQixFQUhHO0FBSVY3TCxjQUFRLEtBQUtzTCxZQUFMLENBQWtCUSxXQUFsQjtBQUpFLEtBQVo7O0FBT0E7O0FBRUEsUUFBSSxDQUFDNWYsS0FBS3ZCLFNBQU4sSUFBbUJ1QixLQUFLdkIsU0FBTCxLQUFtQixFQUF0QyxJQUE0Q3VCLEtBQUt2QixTQUFMLEtBQW1CLE1BQW5FLEVBQTJFO0FBQ3pFO0FBQ0FpaEIsd0JBQWtCLEtBQWxCO0FBQ0EsVUFBSXhaLElBQUk4WixHQUFKLEdBQVVQLFVBQVUzTCxNQUFwQixHQUE2QnlMLGNBQTdCLEdBQThDLENBQWxELEVBQXFEO0FBQ25ERywwQkFBa0IsS0FBbEI7QUFDRCxPQUZELE1BRU8sSUFBSXhaLElBQUk4WixHQUFKLEdBQVVSLElBQUkxTCxNQUFkLEdBQXVCMkwsVUFBVTNMLE1BQWpDLEdBQTBDeUwsY0FBMUMsR0FBMkRFLFVBQVVNLFNBQXpFLEVBQW9GO0FBQ3pGTCwwQkFBa0IsUUFBbEI7QUFDRDtBQUNGLEtBUkQsTUFRTztBQUNMQSx3QkFBa0IxZixLQUFLdkIsU0FBdkI7QUFDRDs7QUFFRCxRQUFJMGdCLE1BQUosRUFBWTtBQUNWLFdBQUtDLFlBQUwsQ0FDR3pLLFFBREgsQ0FDWSxlQUFlK0ssZUFEM0I7QUFFRDs7QUFFRCxRQUFJTyxjQUFlLFlBQVk7QUFDN0IsVUFBSWxPLE1BQU0sRUFBQzFTLE1BQU0sQ0FBUCxFQUFVMmdCLEtBQUssQ0FBZixFQUFWO0FBQ0EsY0FBUU4sZUFBUjtBQUNFLGFBQUssS0FBTDtBQUNFM04sY0FBSTFTLElBQUosR0FBVzZHLElBQUk3RyxJQUFKLEdBQVdtZ0IsSUFBSXRnQixLQUFKLEdBQVksQ0FBdkIsR0FBMkJ1Z0IsVUFBVXZnQixLQUFWLEdBQWtCLENBQXhEO0FBQ0E2UyxjQUFJaU8sR0FBSixHQUFVOVosSUFBSThaLEdBQUosR0FBVVIsSUFBSTFMLE1BQWQsR0FBdUJ5TCxjQUFqQztBQUNBO0FBQ0YsYUFBSyxRQUFMO0FBQ0V4TixjQUFJMVMsSUFBSixHQUFXNkcsSUFBSTdHLElBQUosR0FBV21nQixJQUFJdGdCLEtBQUosR0FBWSxDQUF2QixHQUEyQnVnQixVQUFVdmdCLEtBQVYsR0FBa0IsQ0FBeEQ7QUFDQTZTLGNBQUlpTyxHQUFKLEdBQVU5WixJQUFJOFosR0FBSixHQUFVUCxVQUFVM0wsTUFBcEIsR0FBNkJ5TCxjQUF2QztBQUNBO0FBQ0YsYUFBSyxNQUFMO0FBQ0V4TixjQUFJMVMsSUFBSixHQUFXNkcsSUFBSTdHLElBQUosR0FBV21nQixJQUFJdGdCLEtBQWYsR0FBdUJxZ0IsY0FBbEM7QUFDQXhOLGNBQUlpTyxHQUFKLEdBQVU5WixJQUFJOFosR0FBSixHQUFVUCxVQUFVM0wsTUFBVixHQUFtQixDQUE3QixHQUFpQzBMLElBQUkxTCxNQUFKLEdBQWEsQ0FBeEQ7QUFDQTtBQUNGLGFBQUssT0FBTDtBQUNFL0IsY0FBSTFTLElBQUosR0FBVzZHLElBQUk3RyxJQUFKLEdBQVdvZ0IsVUFBVXZnQixLQUFyQixHQUE2QnFnQixjQUF4QztBQUNBeE4sY0FBSWlPLEdBQUosR0FBVTlaLElBQUk4WixHQUFKLEdBQVVQLFVBQVUzTCxNQUFWLEdBQW1CLENBQTdCLEdBQWlDMEwsSUFBSTFMLE1BQUosR0FBYSxDQUF4RDtBQUNBO0FBaEJKO0FBa0JBLGFBQU8vQixHQUFQO0FBQ0QsS0FyQmlCLEVBQWxCOztBQXVCQTtBQUNFLFVBQUkyTixtQkFBbUIsS0FBbkIsSUFBNEJBLG1CQUFtQixRQUFuRCxFQUE2RDtBQUMzRCxZQUFJTyxZQUFZNWdCLElBQVosR0FBbUIsQ0FBdkIsRUFBMEI7QUFDeEI0Z0Isc0JBQVk1Z0IsSUFBWixHQUFtQmtnQixjQUFuQjtBQUNBLGVBQUtXLGlCQUFMLENBQXVCbk8sR0FBdkIsQ0FBMkIsRUFBQzFTLE1BQU82RyxJQUFJN0csSUFBSixHQUFXbWdCLElBQUl0Z0IsS0FBSixHQUFZLENBQXhCLEdBQTZCK2dCLFlBQVk1Z0IsSUFBaEQsRUFBM0I7QUFDRCxTQUhELE1BR08sSUFBSTRnQixZQUFZNWdCLElBQVosR0FBbUJvZ0IsVUFBVXZnQixLQUE3QixHQUFxQ3VnQixVQUFVSSxRQUFuRCxFQUE2RDtBQUNsRUksc0JBQVk1Z0IsSUFBWixHQUFtQm9nQixVQUFVSSxRQUFWLEdBQXFCSixVQUFVdmdCLEtBQS9CLEdBQXVDcWdCLGNBQTFEO0FBQ0EsZUFBS1csaUJBQUwsQ0FBdUJuTyxHQUF2QixDQUEyQixFQUFDMVMsTUFBTzZHLElBQUk3RyxJQUFKLEdBQVdtZ0IsSUFBSXRnQixLQUFKLEdBQVksQ0FBeEIsR0FBNkIrZ0IsWUFBWTVnQixJQUFoRCxFQUEzQjtBQUNEO0FBQ0Y7QUFDRjs7QUFFRCxTQUFLK2YsWUFBTCxDQUNHck4sR0FESCxDQUNPa08sV0FEUDtBQUVELEdBMUVEO0FBMkVBLE1BQUlqZ0IsT0FBTyxLQUFLZ04sS0FBTCxDQUFXLEtBQUttVCxzQkFBaEIsQ0FBWDs7QUFFQSxNQUFJaEIsTUFBSixFQUFZO0FBQ1YsU0FBS0MsWUFBTCxDQUFrQnJOLEdBQWxCLENBQXNCLEVBQUNpTyxLQUFLLENBQUMsR0FBUCxFQUF0QjtBQUNBLHlCQUFPbFUsU0FBU29RLElBQWhCLEVBQXNCaUQsTUFBdEIsQ0FBNkIsS0FBS0MsWUFBbEM7QUFDRDs7QUFFRGxJLGFBQVksWUFBWTtBQUN0Qm1JLGlCQUFhcmMsSUFBYixDQUFrQixJQUFsQixFQUF3QmhELElBQXhCO0FBQ0QsR0FGVSxDQUVSMUIsSUFGUSxDQUVILElBRkcsQ0FBWDtBQUdELENBeEZEO0FBeUZBLElBQU04aEIsY0FBYyxTQUFkQSxXQUFjLENBQVV4VixDQUFWLEVBQWFwTSxNQUFiLEVBQXFCO0FBQ3ZDLE1BQUksQ0FBQyxLQUFLNGdCLFlBQVYsRUFBd0IsT0FBTyxJQUFQOztBQUV4QixNQUFJcGYsT0FBTyxLQUFLZ04sS0FBTCxDQUFXLEtBQUttVCxzQkFBaEIsQ0FBWDs7QUFFQTNoQixXQUFTLGtCQUFFbVUsY0FBRixDQUFpQi9ILEVBQUVwTSxNQUFuQixFQUEyQixVQUFVQSxNQUFWLEVBQWtCO0FBQ3BELFFBQUlBLE9BQU9vVSxZQUFQLENBQW9CLGlCQUFwQixDQUFKLEVBQTRDO0FBQzFDLGFBQU8sSUFBUDtBQUNELEtBRkQsTUFHSyxJQUFJNVMsS0FBS3VNLE9BQUwsQ0FBYWYsR0FBYixDQUFpQixDQUFqQixLQUF1QmhOLE1BQTNCLEVBQW1DO0FBQ3RDLGFBQU8sSUFBUDtBQUNEO0FBQ0YsR0FQUSxDQUFUO0FBUUEsTUFBSSxDQUFDQSxNQUFMLEVBQWE7QUFDWCxTQUFLOEIsS0FBTDtBQUNBLFdBQU8sSUFBUDtBQUNEO0FBQ0Q7QUFDQSxTQUFPLElBQVA7QUFDRCxDQW5CRDtBQW9CQSxJQUFNK2YsYUFBYSxTQUFiQSxVQUFhLENBQVV6VixDQUFWLEVBQWFwTSxNQUFiLEVBQXFCO0FBQ3RDO0FBQ0EsTUFBSW9NLEVBQUUwVixVQUFOLEVBQWtCMVYsRUFBRXBNLE1BQUYsR0FBV29NLEVBQUUwVixVQUFiOztBQUVsQjloQixXQUFTLGtCQUFFbVUsY0FBRixDQUFpQi9ILEVBQUVwTSxNQUFuQixFQUEyQixVQUFVQSxNQUFWLEVBQWtCO0FBQ3BELFFBQUlBLE9BQU9vVSxZQUFQLENBQW9CLGlCQUFwQixDQUFKLEVBQTRDO0FBQzFDLGFBQU8sSUFBUDtBQUNEO0FBQ0YsR0FKUSxDQUFUOztBQU1BLE1BQUlwVSxNQUFKLEVBQVk7QUFDVixRQUNFd0IsT0FBTyxLQUFLZ04sS0FBTCxDQUFXLEtBQUttVCxzQkFBaEIsQ0FEVDtBQUFBLFFBRUV4WSxJQUFJbkosT0FBT29VLFlBQVAsQ0FBb0IsaUJBQXBCLENBRk47O0FBS0EsUUFBSTVTLEtBQUtKLElBQUwsSUFBYUksS0FBS0osSUFBTCxDQUFVK0gsQ0FBVixFQUFhNUgsT0FBOUIsRUFBdUM7QUFDckMsVUFBSXlSLE9BQU87QUFDVDZHLGFBQUsxUSxDQURJO0FBRVRoRyxlQUFPM0IsS0FBS0osSUFBTCxDQUFVK0gsQ0FBVixDQUZFO0FBR1R6SCxjQUFNLElBSEc7QUFJVEYsY0FBTUE7QUFKRyxPQUFYO0FBTUFBLFdBQUtKLElBQUwsQ0FBVStILENBQVYsRUFBYTVILE9BQWIsQ0FBcUJpRCxJQUFyQixDQUEwQndPLElBQTFCLEVBQWdDN0osQ0FBaEM7QUFDRCxLQVJELE1BU0s7QUFDSCxXQUFLckgsS0FBTDtBQUNEO0FBQ0Y7QUFDRixDQTdCRDtBQThCQSxJQUFNaWdCLGNBQWMsU0FBZEEsV0FBYyxDQUFVM1YsQ0FBVixFQUFhO0FBQy9CLE1BQUlBLEVBQUU0VixPQUFGLElBQWEsa0JBQUtDLFNBQUwsQ0FBZUMsR0FBaEMsRUFBcUM7QUFDbkMsU0FBS3BnQixLQUFMO0FBQ0Q7QUFDRixDQUpEO0FBS0EsSUFBTStNLFlBQVksU0FBWkEsU0FBWSxDQUFVQyxPQUFWLEVBQW1CO0FBQ25DLE1BQUksQ0FBQyxrQkFBRUMsUUFBRixDQUFXRCxPQUFYLENBQUwsRUFBMEI7QUFDeEJBLGNBQVUscUJBQU9BLE9BQVAsRUFBZ0J4QyxJQUFoQixDQUFxQixrQkFBckIsQ0FBVjtBQUNEO0FBQ0QsTUFBSSxDQUFDLGtCQUFFeUMsUUFBRixDQUFXRCxPQUFYLENBQUwsRUFBMEI7QUFDeEI3TCxZQUFRQyxHQUFSLENBQVksa0JBQUtpTCxRQUFMLENBQWMsV0FBZCxFQUEyQixLQUEzQixFQUFrQyxXQUFsQyxDQUFaO0FBQ0E7QUFDRDtBQUNELFNBQU8sa0JBQUV0RixNQUFGLENBQVMsS0FBSzJGLEtBQWQsRUFBcUIsWUFBWTtBQUN0QyxXQUFPLEtBQUs1TSxFQUFMLElBQVdrTixPQUFsQjtBQUNELEdBRk0sQ0FBUDtBQUdELENBWEQ7QUFZQTs7QUFFQTs7OztJQUdNcVQsVzs7O0FBQ0o7Ozs7Ozs7Ozs7QUFVQSx1QkFBWS9oQixNQUFaLEVBQW9CO0FBQUE7O0FBR2xCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSGtCOztBQXNCbEIsVUFBS0EsTUFBTCxHQUFjO0FBQ1o4VCxzQkFBZ0IsT0FESixFQUNhO0FBQ3pCNVMsYUFBTyxTQUZLO0FBR1o4Z0IsYUFBTyxFQUhLO0FBSVpuaEIsWUFBTTtBQUNKLGNBQU0sSUFERjtBQUVKLGtCQUFVO0FBRk4sT0FKTTtBQVFaZ08sbUJBQWEsR0FSRDtBQVNaM00sZ0JBQVU7QUFDUitWLHdCQUFnQixLQURSO0FBRVJ6WCxpQkFBUztBQUNQQyxnQkFBTSxVQURDO0FBRVBDLG9CQUFVLElBRkg7QUFHUEMscUJBQVcsSUFISjtBQUlQQyxpQkFBTyxVQUpBO0FBS1BnVCxxQkFBVztBQUxKO0FBRkQsT0FURTtBQW1CWnFPLGVBQVMsRUFuQkc7QUFvQlo5aEIsaUJBQVc7QUFwQkMsS0FBZDtBQXNCQSxvQkFBTzJPLE1BQVAsQ0FBYyxJQUFkLEVBQW9CLE1BQUs5TyxNQUF6QixFQUFpQ0EsTUFBakM7O0FBRUE7QUFDQTs7O0FBR0EsVUFBS29PLEtBQUwsR0FBYSxFQUFiO0FBQ0E7OztBQUdBLFVBQUtvUyxZQUFMLEdBQW9CLElBQXBCO0FBQ0E7OztBQUdBLFVBQUtlLHNCQUFMLEdBQThCLENBQUMsQ0FBL0I7QUFDQTs7O0FBR0EsVUFBS3hTLFNBQUwsR0FBaUIsSUFBakI7QUFDQTs7O0FBR0EsVUFBS0MsVUFBTCxHQUFrQixJQUFsQjs7QUFFQSxVQUFLQyxJQUFMO0FBcEVrQjtBQXFFbkI7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7OzJCQVVPO0FBQ0wsV0FBSzVPLGNBQUwsR0FBc0IsS0FBS0wsTUFBTCxDQUFZSyxjQUFsQztBQUNBLGFBQU8sS0FBS0wsTUFBTCxDQUFZSyxjQUFuQjs7QUFFQTtBQUNBLFdBQUs2TyxRQUFMO0FBQ0Q7O0FBRUQ7Ozs7OzsrQkFHVztBQUNULFVBQUksS0FBS0MsV0FBVCxFQUFzQixPQUFPLElBQVA7QUFDdEIsV0FBS0EsV0FBTCxHQUFtQixJQUFuQjs7QUFFQTtBQUNBLFdBQUtoUCxTQUFMLEdBQWlCLDhCQUFqQjtBQUNEOztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3lCQXdDS2lCLEksRUFBTTtBQUNULFVBQUk4Z0IsZUFBZSxFQUFuQjtBQUFBLFVBQXVCMVMsZUFBdkI7QUFDQXBPLGFBQU8sZ0JBQU8wTixNQUFQLENBQWMsSUFBZCxFQUFvQm9ULFlBQXBCLEVBQWtDLEtBQUtsaUIsTUFBdkMsRUFBK0NvQixJQUEvQyxDQUFQOztBQUVBLFVBQUksQ0FBQ0EsS0FBS3hCLE1BQVYsRUFBa0I7QUFDaEJpRCxnQkFBUUMsR0FBUixDQUFZLGtCQUFLaUwsUUFBTCxDQUFjLFdBQWQsRUFBMkIsS0FBM0IsRUFBa0MsTUFBbEMsQ0FBWjtBQUNBLGVBQU8sSUFBUDtBQUNEO0FBQ0QzTSxXQUFLdU0sT0FBTCxHQUFlLHFCQUFPdk0sS0FBS3hCLE1BQVosQ0FBZjs7QUFFQSxVQUFJLENBQUN3QixLQUFLdU0sT0FBTCxDQUFhZixHQUFiLENBQWlCLENBQWpCLENBQUwsRUFBMEI7QUFDeEIvSixnQkFBUUMsR0FBUixDQUFZLGtCQUFLaUwsUUFBTCxDQUFjLFdBQWQsRUFBMkIsS0FBM0IsRUFBa0MsTUFBbEMsQ0FBWjtBQUNBLGVBQU8sSUFBUDtBQUNEOztBQUVELFVBQUksQ0FBQzNNLEtBQUtJLEVBQVYsRUFBY0osS0FBS0ksRUFBTCxHQUFVSixLQUFLdU0sT0FBTCxDQUFhekIsSUFBYixDQUFrQixrQkFBbEIsQ0FBVjtBQUNkLFVBQUksQ0FBQzlLLEtBQUtJLEVBQVYsRUFBYztBQUNaSixhQUFLSSxFQUFMLEdBQVUsZ0JBQWdCLG9CQUFVK04sYUFBVixFQUExQjtBQUNBbk8sYUFBS3VNLE9BQUwsQ0FBYXpCLElBQWIsQ0FBa0Isa0JBQWxCLEVBQXNDOUssS0FBS0ksRUFBM0M7QUFDRDtBQUNEZ08sZUFBUyxrQkFBRS9HLE1BQUYsQ0FBUyxLQUFLMkYsS0FBZCxFQUFxQixZQUFZO0FBQ3hDLGVBQU8sS0FBSzVNLEVBQUwsSUFBV0osS0FBS0ksRUFBdkI7QUFDRCxPQUZRLENBQVQ7O0FBSUEsVUFBSWdPLFdBQVcsQ0FBQyxDQUFoQixFQUFtQjtBQUNqQixhQUFLcEIsS0FBTCxDQUFXekcsSUFBWCxDQUFnQnZHLElBQWhCO0FBQ0EwZSx5QkFBaUIxYixJQUFqQixDQUFzQixJQUF0QixFQUE0QixLQUFLZ0ssS0FBTCxDQUFXN0wsTUFBWCxHQUFvQixDQUFoRDtBQUNELE9BSEQsTUFJSztBQUNILGFBQUs2TCxLQUFMLENBQVdvQixNQUFYLElBQXFCLGdCQUFPVixNQUFQLENBQWMsSUFBZCxFQUFvQixFQUFwQixFQUF3QixLQUFLVixLQUFMLENBQVdvQixNQUFYLENBQXhCLEVBQTRDcE8sSUFBNUMsQ0FBckI7QUFDQTBlLHlCQUFpQjFiLElBQWpCLENBQXNCLElBQXRCLEVBQTRCb0wsTUFBNUI7QUFDRDs7QUFFRDBTLHFCQUFlLElBQWY7QUFDQTFTLGVBQVMsSUFBVDtBQUNBLGFBQU8sSUFBUDtBQUNEOztBQUVEOzs7Ozs7Ozs7OztvQ0FRZ0JkLE8sRUFBU2xNLFUsRUFBWTJKLEcsRUFBS2dXLE8sRUFBUztBQUNqRCxVQUFNQyx5QkFBeUI7QUFDN0IsZ0JBQVEsY0FBVUMsS0FBVixFQUFpQkMsV0FBakIsRUFBOEJ2UixJQUE5QixFQUFvQztBQUMxQyxjQUFJek8sU0FBUyxFQUFiO0FBQUEsY0FDRWlnQixPQURGO0FBQUEsY0FDV0MsY0FEWDtBQUFBLGNBQzJCQyxjQUQzQjs7QUFHQSxjQUFJSixNQUFNMVUsT0FBTixDQUFjZixHQUFkLENBQWtCLENBQWxCLEVBQXFCZ0IsT0FBckIsQ0FBNkJ5TyxXQUE3QixPQUErQyxPQUFuRCxFQUE0RDtBQUMxRGdHLGtCQUFNMVUsT0FBTixDQUFjRyxJQUFkLENBQW1CLGFBQW5CLEVBQWtDd0IsSUFBbEMsQ0FBdUMsWUFBWTtBQUNqRGhOLHFCQUFPcUYsSUFBUCxDQUFZLEtBQUs1RSxLQUFqQjtBQUNELGFBRkQ7QUFHRDs7QUFFRCxjQUFJdWYsZUFBZSxDQUFuQixFQUFzQjtBQUNwQixnQkFBSWhnQixPQUFPQyxNQUFQLEdBQWdCLENBQWhCLElBQXFCRCxPQUFPLENBQVAsTUFBYyxFQUF2QyxFQUEyQztBQUN6QztBQUNBaWdCLHdCQUFVLGtCQUFFRyxJQUFGLENBQU9wZ0IsT0FBTyxDQUFQLENBQVAsRUFBa0IsRUFBQy9DLE9BQU8rQyxPQUFPLENBQVAsQ0FBUixFQUFsQixDQUFWO0FBQ0Esa0JBQUlpZ0IsVUFBVSxDQUFkLEVBQWlCO0FBQ2Y7QUFDQUUsaUNBQWlCMVIsSUFBakI7QUFDRCxlQUhELE1BR08sQ0FFTjtBQUNGLGFBVEQsTUFTTztBQUNMMFIsK0JBQWlCMVIsSUFBakI7QUFDRDs7QUFFRCxnQkFBSTBSLGNBQUosRUFBb0I7QUFDbEJKLG9CQUFNbGdCLGNBQU4sQ0FBcUIsQ0FBckIsRUFBd0JELFFBQXhCLENBQWlDRSxZQUFqQyxDQUE4QyxDQUFDcWdCLGNBQUQsQ0FBOUMsRUFBZ0UsS0FBaEUsRUFBdUV4TyxVQUF2RSxDQUFrRixHQUFsRixFQUF1RndPLGNBQXZGO0FBQ0EsbUJBQUtsaEIsZUFBTCxDQUFxQjhnQixNQUFNN2dCLEVBQTNCLEVBQStCLENBQS9CLEVBQWtDaWhCLGNBQWxDO0FBQ0Q7O0FBRUQsbUJBQU8xUixJQUFQO0FBRUQsV0FyQkQsTUFxQk8sSUFBSXVSLGVBQWUsQ0FBbkIsRUFBc0I7O0FBRTNCLGdCQUFJaGdCLE9BQU9DLE1BQVAsR0FBZ0IsQ0FBcEIsRUFBdUI7QUFDckI7QUFDQWdnQix3QkFBVSxrQkFBRUcsSUFBRixDQUFPcGdCLE9BQU8sQ0FBUCxDQUFQLEVBQWtCLEVBQUMvQyxPQUFPK0MsT0FBTyxDQUFQLENBQVIsRUFBbEIsQ0FBVjtBQUNBLGtCQUFJaWdCLFVBQVUsQ0FBZCxFQUFpQjtBQUNmO0FBQ0FDLGlDQUFpQmxnQixPQUFPLENBQVAsQ0FBakI7QUFDRDtBQUNGOztBQUVELGdCQUFJa2dCLGNBQUosRUFBb0I7QUFDbEJILG9CQUFNbGdCLGNBQU4sQ0FBcUIsQ0FBckIsRUFBd0JELFFBQXhCLENBQWlDRSxZQUFqQyxDQUE4QyxDQUFDb2dCLGNBQUQsQ0FBOUMsRUFBZ0UsS0FBaEUsRUFBdUV2TyxVQUF2RSxDQUFrRixHQUFsRixFQUF1RnVPLGNBQXZGO0FBQ0EsbUJBQUtqaEIsZUFBTCxDQUFxQjhnQixNQUFNN2dCLEVBQTNCLEVBQStCLENBQS9CLEVBQWtDZ2hCLGNBQWxDO0FBQ0Q7O0FBRUQsbUJBQU96UixJQUFQO0FBQ0Q7QUFDRjtBQWxENEIsT0FBL0I7O0FBcURBLFVBQUl2QixTQUFVLGtCQUFFQyxRQUFGLENBQVdmLE9BQVgsQ0FBRCxHQUF3QkEsT0FBeEIsR0FBa0NELFVBQVVySyxJQUFWLENBQWUsSUFBZixFQUFxQnNLLE9BQXJCLENBQS9DO0FBQUEsVUFDRXROLE9BQU8sS0FBS2dOLEtBQUwsQ0FBV29CLE1BQVgsQ0FEVDtBQUFBLFVBRUUwUSxlQUZGOztBQUlBLFVBQUksQ0FBQ2lDLE9BQUwsRUFBY0EsVUFBVSxFQUFWO0FBQ2QsVUFBSS9nQixJQUFKLEVBQVU7O0FBRVI4ZSxpQkFBVTllLEtBQUt1TSxPQUFMLENBQWFmLEdBQWIsQ0FBaUIsQ0FBakIsRUFBb0JnQixPQUFwQixDQUE0QnlPLFdBQTVCLE1BQTZDLE9BQTlDLEdBQXlEamIsS0FBS3VNLE9BQTlELEdBQXdFLHFCQUFPdk0sS0FBS3VNLE9BQUwsQ0FBYUcsSUFBYixDQUFrQixhQUFsQixFQUFpQ2xCLEdBQWpDLENBQXFDcEssVUFBckMsQ0FBUCxDQUFqRjtBQUNBMGQsZUFBTy9ULEdBQVAsQ0FBV0EsR0FBWDs7QUFFQSxZQUFJLENBQUMvSyxLQUFLdWhCLG9CQUFWLEVBQWdDO0FBQzlCekMsaUJBQU8zUyxPQUFQLENBQWUsUUFBZjtBQUNELFNBRkQsTUFFTztBQUNMLGNBQUk2UyxnQkFBZ0JoZixLQUFLdU0sT0FBTCxDQUFhRyxJQUFiLENBQWtCLGtDQUFsQixDQUFwQjtBQUNBLGNBQUlzUyxjQUFjeFQsR0FBZCxDQUFrQixDQUFsQixDQUFKLEVBQTBCO0FBQ3hCd1QsMEJBQWNqTixHQUFkLENBQWtCLEVBQUMsb0JBQW9CaEgsR0FBckIsRUFBbEI7QUFDRDtBQUNGOztBQUVEO0FBQ0E7QUFDQSxZQUFJL0ssS0FBS0MsV0FBTCxHQUFtQixDQUF2QixFQUEwQjtBQUN4QjtBQUNBLGNBQUkrZ0IsdUJBQXVCaGhCLEtBQUt0QixPQUFMLENBQWFDLElBQXBDLENBQUosRUFBK0M7QUFDN0NvTSxrQkFBTWlXLHVCQUF1QmhoQixLQUFLdEIsT0FBTCxDQUFhQyxJQUFwQyxFQUEwQ3FFLElBQTFDLENBQStDLElBQS9DLEVBQXFEaEQsSUFBckQsRUFBMkRvQixVQUEzRCxFQUF1RTJKLEdBQXZFLENBQU47QUFDRDtBQUNGOztBQUVELFlBQUl5RyxPQUFPO0FBQ1R0UixnQkFBTSxJQURHO0FBRVRXLGlCQUFPLGFBRkU7QUFHVGIsZ0JBQU1BLElBSEc7QUFJVG9CLHNCQUFZQSxVQUpIO0FBS1RPLGlCQUFPb0osR0FMRTtBQU1UN0osa0JBQVEsQ0FBQzZKLEdBQUQ7QUFOQyxTQUFYO0FBUUEsWUFBSS9LLEtBQUt1TSxPQUFMLENBQWFmLEdBQWIsQ0FBaUIsQ0FBakIsRUFBb0JnQixPQUFwQixDQUE0QnlPLFdBQTVCLE9BQThDLE9BQWxELEVBQTJEO0FBQ3pEekosZUFBS3RRLE1BQUwsR0FBYyxFQUFkO0FBQ0FsQixlQUFLdU0sT0FBTCxDQUFhRyxJQUFiLENBQWtCLGFBQWxCLEVBQWlDd0IsSUFBakMsQ0FBc0MsWUFBWTtBQUNoRHNELGlCQUFLdFEsTUFBTCxDQUFZcUYsSUFBWixDQUFpQixLQUFLNUUsS0FBdEI7QUFDRCxXQUZEO0FBR0Q7O0FBRUQxQyx1QkFBZStELElBQWYsQ0FBb0IsSUFBcEIsRUFBMEJoRCxJQUExQixFQUFnQ3dSLElBQWhDOztBQUVBLFlBQUl4UixLQUFLQyxXQUFMLElBQW9CLENBQXBCLElBQXlCLENBQUM4Z0IsUUFBUVMsVUFBdEMsRUFBa0Q7QUFDaEQsZUFBS2xoQixLQUFMO0FBQ0Q7QUFDRjs7QUFFRE4sYUFBTyxJQUFQO0FBQ0FzTixnQkFBVSxJQUFWO0FBQ0FsTSxtQkFBYSxJQUFiO0FBQ0EySixZQUFNLElBQU47QUFDQSxhQUFPLElBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7O29DQU1nQnVDLE8sRUFBU2xNLFUsRUFBWTtBQUNuQyxVQUFJZ04sU0FBVSxrQkFBRUMsUUFBRixDQUFXZixPQUFYLENBQUQsR0FBd0JBLE9BQXhCLEdBQWtDRCxVQUFVckssSUFBVixDQUFlLElBQWYsRUFBcUJzSyxPQUFyQixDQUEvQztBQUFBLFVBQ0V0TixPQUFPLEtBQUtnTixLQUFMLENBQVdvQixNQUFYLENBRFQ7QUFBQSxVQUVFMFEsZUFGRjs7QUFJQSxVQUFJOWUsSUFBSixFQUFVO0FBQ1I4ZSxpQkFBVTllLEtBQUt1TSxPQUFMLENBQWFmLEdBQWIsQ0FBaUIsQ0FBakIsRUFBb0JnQixPQUFwQixDQUE0QnlPLFdBQTVCLE1BQTZDLE9BQTlDLEdBQXlEamIsS0FBS3VNLE9BQTlELEdBQXdFLHFCQUFPdk0sS0FBS3VNLE9BQUwsQ0FBYUcsSUFBYixDQUFrQixhQUFsQixFQUFpQ2xCLEdBQWpDLENBQXFDcEssVUFBckMsQ0FBUCxDQUFqRjtBQUNBLGVBQU8wZCxPQUFPL1QsR0FBUCxFQUFQO0FBQ0Q7O0FBRUQvSyxhQUFPLElBQVA7QUFDQXNOLGdCQUFVLElBQVY7QUFDQWxNLG1CQUFhLElBQWI7QUFDQSxhQUFPLElBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7O3lCQU1La00sTyxFQUFTbVUsUSxFQUFVO0FBQUE7O0FBQ3RCLFVBQU1DLGdCQUFnQjtBQUNwQixlQUFPLFlBQVV0VCxNQUFWLEVBQWtCck0sUUFBbEIsRUFBNEI7QUFDakMsY0FBSS9CLE9BQU8sS0FBS2dOLEtBQUwsQ0FBV29CLE1BQVgsQ0FBWDtBQUNBcE8sZUFBS3RCLE9BQUwsQ0FBYXNFLElBQWIsQ0FBa0JoRCxJQUFsQixFQUF3QixVQUFVakMsSUFBVixFQUFnQjtBQUN0Q2dFLHFCQUFTaEUsSUFBVDtBQUNELFdBRkQ7QUFHQSxpQkFBTyxJQUFQO0FBQ0QsU0FQbUI7QUFRcEIsZ0JBQVEsY0FBVXFRLE1BQVYsRUFBa0I7QUFDeEIsY0FBSXBPLE9BQU8sS0FBS2dOLEtBQUwsQ0FBV29CLE1BQVgsQ0FBWDtBQUFBLGNBQ0VyUSxPQUFPLEVBRFQ7QUFBQSxjQUVFNGpCLGlCQUFpQixnQkFBT2pVLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLEtBQUs5TyxNQUFMLENBQVlrQyxRQUE5QixFQUF3QyxFQUFDb1IsYUFBYyxJQUFJOVQsSUFBSixFQUFmLEVBQXhDLENBRm5CO0FBQUEsY0FHRTJMLFFBQVMvSixLQUFLdU0sT0FBTCxDQUFhZixHQUFiLENBQWlCLENBQWpCLEVBQW9CZ0IsT0FBcEIsQ0FBNEJ5TyxXQUE1QixNQUE2QyxPQUE5QyxHQUF5RGpiLEtBQUt1TSxPQUE5RCxHQUF3RXZNLEtBQUt1TSxPQUFMLENBQWFHLElBQWIsQ0FBa0IsYUFBbEIsQ0FIbEY7O0FBS0EsZUFBSyxJQUFJdEcsSUFBSSxDQUFiLEVBQWdCQSxJQUFJcEcsS0FBS0MsV0FBekIsRUFBc0NtRyxHQUF0QyxFQUEyQztBQUN6Q3JJLGlCQUFLd0ksSUFBTCxDQUFVLFVBQ04sZUFETSxHQUNZLGtCQUFFcUwsU0FBRixDQUFZNVIsS0FBS3RCLE9BQUwsQ0FBYVEsS0FBekIsQ0FEWixHQUM4QyxnQkFEOUMsR0FFTixnQ0FGTSxHQUdOLHdCQUhNLEdBR3FCa0gsQ0FIckIsR0FHeUIsVUFIbkM7QUFJQSxnQkFBSUEsSUFBSXBHLEtBQUtDLFdBQUwsR0FBbUIsQ0FBM0IsRUFBOEJsQyxLQUFLd0ksSUFBTCxDQUFVLHVCQUF1QnZHLEtBQUt0QixPQUFMLENBQWFTLE1BQXBDLEdBQTZDLG9DQUF2RDtBQUMvQjtBQUNEcEIsZUFBS3dJLElBQUwsQ0FBVSxpQ0FBVjtBQUNBdkcsZUFBSzBoQixhQUFMLENBQW1CM2pCLElBQW5CLENBQXdCQSxLQUFLcVIsSUFBTCxDQUFVLEVBQVYsQ0FBeEI7O0FBRUE7QUFDQXBQLGVBQUtlLGNBQUwsR0FBc0IsRUFBdEI7QUFDQWYsZUFBSzBoQixhQUFMLENBQW1CaFYsSUFBbkIsQ0FBd0Isd0JBQXhCLEVBQWtEd0IsSUFBbEQsQ0FBdUQsWUFBWTs7QUFFakU7QUFDQSxnQkFBSXFQLE1BQU0sS0FBSzNLLFlBQUwsQ0FBa0Isc0JBQWxCLENBQVY7QUFBQSxnQkFDRWdQLFNBQVM3WCxNQUFNeUIsR0FBTixDQUFVK1IsR0FBVixFQUFlNWIsS0FEMUI7QUFBQSxnQkFFRVYsSUFBSSxrQkFBRVosSUFBRixDQUFPdWhCLE1BQVAsQ0FGTjtBQUFBLGdCQUdFQyxjQUFjO0FBQ1osb0JBRFksZ0JBQ0xDLEVBREssRUFDRDtBQUNULHVCQUFPLGtCQUFFemhCLElBQUYsQ0FBT3loQixFQUFQLEVBQVcsRUFBQyxVQUFVLE1BQVgsRUFBWCxDQUFQO0FBQ0QsZUFIVztBQUlaLHFCQUpZLGlCQUlKQSxFQUpJLEVBSUE7QUFDVix1QkFBTyxrQkFBRXpoQixJQUFGLENBQU95aEIsRUFBUCxFQUFXLEVBQUMsVUFBVSxTQUFYLEVBQVgsQ0FBUDtBQUNELGVBTlc7QUFPWixtQkFQWSxlQU9OQSxFQVBNLEVBT0Y7QUFDUix1QkFBT0EsRUFBUDtBQUNEO0FBVFcsYUFIaEI7O0FBZUFILDJCQUFlelAsV0FBZixHQUE2QmpSLENBQTdCOztBQUVBLGdCQUFJMmdCLE1BQUosRUFBWUQsZUFBZS9WLFNBQWYsR0FBMkIsQ0FBQzNLLENBQUQsQ0FBM0I7O0FBRVowZ0IsNkJBQWlCLGdCQUFPalUsTUFBUCxDQUFjLElBQWQsRUFBb0JpVSxjQUFwQixFQUFvQzNoQixLQUFLdEIsT0FBTCxDQUFhRSxNQUFiLElBQXVCLEVBQTNELENBQWpCO0FBQ0EraUIsMkJBQWVuakIsTUFBZixHQUF3QixJQUF4QjtBQUNBbWpCLDJCQUFlNWhCLE9BQWYsR0FBeUIsWUFBWTtBQUNuQ0csbUJBQUtDLGVBQUwsQ0FBcUJILEtBQUtJLEVBQTFCLEVBQThCbWQsR0FBOUIsRUFBbUNzRSxZQUFZRixlQUFlN2lCLFVBQWYsSUFBNkIsS0FBekMsRUFBZ0QsS0FBS3VCLElBQXJELENBQW5DO0FBQ0QsYUFGRDs7QUFJQUwsaUJBQUtlLGNBQUwsQ0FBb0J3RixJQUFwQixDQUF5QjtBQUN2QndiLHNCQUFRL2hCLEtBQUtJLEVBRFU7QUFFdkJnQiwwQkFBWW1jLEdBRlc7QUFHdkJ6Yyx3QkFBVSw0QkFBYTZnQixjQUFiO0FBSGEsYUFBekI7QUFLRCxXQWpDRDtBQW1DRCxTQTdEbUI7QUE4RHBCLHNCQUFjLG1CQUFVdlQsTUFBVixFQUFrQjtBQUFBOztBQUM5QixjQUFJcE8sT0FBTyxLQUFLZ04sS0FBTCxDQUFXb0IsTUFBWCxDQUFYO0FBQUEsY0FDRXJRLE9BQU8sRUFEVDtBQUVBLGVBQUssSUFBSXFJLElBQUksQ0FBYixFQUFnQkEsSUFBSXBHLEtBQUtDLFdBQXpCLEVBQXNDbUcsR0FBdEMsRUFBMkM7QUFDekNySSxpQkFBS3dJLElBQUwsQ0FBVSxVQUNOLGVBRE0sR0FDWSxrQkFBRXFMLFNBQUYsQ0FBWTVSLEtBQUt0QixPQUFMLENBQWFRLEtBQXpCLENBRFosR0FDOEMsZ0JBRDlDLEdBRU4sZ0NBRk0sR0FHTiwwQkFITSxHQUd1QmtILENBSHZCLEdBRzJCLFVBSHJDO0FBSUEsZ0JBQUlBLElBQUlwRyxLQUFLQyxXQUFMLEdBQW1CLENBQTNCLEVBQThCbEMsS0FBS3dJLElBQUwsQ0FBVSx1QkFBdUJ2RyxLQUFLdEIsT0FBTCxDQUFhUyxNQUFwQyxHQUE2QyxvQ0FBdkQ7QUFDL0I7QUFDRHBCLGVBQUt3SSxJQUFMLENBQVUsaUNBQVY7QUFDQXZHLGVBQUswaEIsYUFBTCxDQUFtQjNqQixJQUFuQixDQUF3QkEsS0FBS3FSLElBQUwsQ0FBVSxFQUFWLENBQXhCOztBQUVBO0FBQ0FwUCxlQUFLMGhCLGFBQUwsQ0FBbUJoVixJQUFuQixDQUF3QiwwQkFBeEIsRUFBb0R3QixJQUFwRCxDQUF5RCxVQUFDbVAsS0FBRCxFQUFRQyxFQUFSLEVBQWU7QUFDdEUsZ0JBQUlDLE1BQU1ELEdBQUcxSyxZQUFILENBQWdCLHdCQUFoQixDQUFWO0FBQUEsZ0JBQ0VvUCxLQUFLLEVBRFA7O0FBR0EsZ0JBQUlDLFdBQVksVUFBVXJoQixDQUFWLEVBQWE7QUFDM0Isa0JBQUl5SSxVQUFKO0FBQUEsa0JBQU82WSxVQUFQO0FBQUEsa0JBQVU5YixVQUFWO0FBQ0EsbUJBQUtBLElBQUl4RixFQUFFTyxNQUFYLEVBQW1CaUYsQ0FBbkIsRUFBc0JBLEtBQUssQ0FBM0IsRUFBOEI7QUFDNUJpRCxvQkFBSXVLLEtBQUtDLEtBQUwsQ0FBV0QsS0FBS3VPLE1BQUwsS0FBZ0IvYixDQUEzQixDQUFKO0FBQ0E4YixvQkFBSXRoQixFQUFFd0YsSUFBSSxDQUFOLENBQUo7QUFDQXhGLGtCQUFFd0YsSUFBSSxDQUFOLElBQVd4RixFQUFFeUksQ0FBRixDQUFYO0FBQ0F6SSxrQkFBRXlJLENBQUYsSUFBTzZZLENBQVA7QUFDRDtBQUNELHFCQUFPdGhCLENBQVA7QUFDRCxhQVRjLENBU1osQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QixDQUE1QixDQVRZLENBQWY7O0FBV0EsZ0JBQUl3aEIsZUFBZSxDQUNqQixFQUFDdmlCLE9BQU8sVUFBUixFQUFvQjdCLElBQUksTUFBeEIsRUFEaUIsRUFDZ0IsRUFBQzZCLE9BQU8sR0FBUixFQUFhN0IsSUFBSSxPQUFqQixFQURoQixDQUFuQjs7QUFJQWlrQixxQkFBUzdOLE9BQVQsQ0FBaUIsVUFBVUMsQ0FBVixFQUFhO0FBQzVCMk4saUJBQUd6YixJQUFILENBQVEsNEJBQTRCdkcsS0FBS3RCLE9BQUwsQ0FBYUUsTUFBYixDQUFvQnlDLFlBQWhELEdBQStELElBQXZFO0FBQ0EyZ0IsaUJBQUd6YixJQUFILENBQVEsb0JBQW9CdkcsS0FBS3RCLE9BQUwsQ0FBYUUsTUFBYixDQUFvQjJDLFFBQXhDLEdBQW1ELElBQW5ELEdBQ0osU0FESSxHQUNRdkIsS0FBS3RCLE9BQUwsQ0FBYUUsTUFBYixDQUFvQjBDLFFBRDVCLEdBQ3VDLDJCQUR2QyxHQUNxRStTLENBRHJFLEdBQ3lFLElBRHpFLEdBQ2dGQSxDQURoRixHQUNvRixXQUQ1RjtBQUVBMk4saUJBQUd6YixJQUFILENBQVEsUUFBUjtBQUNELGFBTEQ7QUFNQTZiLHlCQUFhaE8sT0FBYixDQUFxQixVQUFVQyxDQUFWLEVBQWE7QUFDaEMyTixpQkFBR3piLElBQUgsQ0FBUSw0QkFBNEJ2RyxLQUFLdEIsT0FBTCxDQUFhRSxNQUFiLENBQW9CeUMsWUFBaEQsR0FBK0QsSUFBdkU7QUFDQTJnQixpQkFBR3piLElBQUgsQ0FBUSxvQkFBb0J2RyxLQUFLdEIsT0FBTCxDQUFhRSxNQUFiLENBQW9CNEMsZUFBeEMsR0FBMEQsSUFBMUQsR0FDSixTQURJLEdBQ1F4QixLQUFLdEIsT0FBTCxDQUFhRSxNQUFiLENBQW9CMEMsUUFENUIsR0FDdUMsMkJBRHZDLEdBQ3FFK1MsRUFBRXJXLEVBRHZFLEdBQzRFLElBRDVFLEdBQ21GcVcsRUFBRXhVLEtBRHJGLEdBQzZGLFdBRHJHO0FBRUFtaUIsaUJBQUd6YixJQUFILENBQVEsUUFBUjtBQUNELGFBTEQ7O0FBT0F5YixlQUFHemIsSUFBSCxDQUFRLGlDQUFSOztBQUVBZ00sY0FBRStLLEVBQUYsRUFBTXZmLElBQU4sQ0FBV2lrQixHQUFHNVMsSUFBSCxDQUFRLEVBQVIsQ0FBWCxFQUF3QnJDLEVBQXhCLENBQTJCLE9BQTNCLEVBQW9DLHlCQUFwQyxFQUErRCxVQUFDbkMsQ0FBRCxFQUFPO0FBQ3BFLGtCQUFJeVgsTUFBTXpYLEVBQUUwWCxhQUFGLENBQWdCMVAsWUFBaEIsQ0FBNkIsdUJBQTdCLENBQVY7QUFDQSxrQkFBSWtNLFNBQVU5ZSxLQUFLdU0sT0FBTCxDQUFhZixHQUFiLENBQWlCLENBQWpCLEVBQW9CZ0IsT0FBcEIsQ0FBNEJ5TyxXQUE1QixNQUE2QyxPQUE5QyxHQUF5RGpiLEtBQUt1TSxPQUE5RCxHQUF3RSxxQkFBT3ZNLEtBQUt1TSxPQUFMLENBQWFHLElBQWIsQ0FBa0IsYUFBbEIsRUFBaUNsQixHQUFqQyxDQUFxQytSLEdBQXJDLENBQVAsQ0FBckY7QUFDQSxrQkFBSXhTLE1BQU0rVCxPQUFPL1QsR0FBUCxFQUFWOztBQUVBLGtCQUFJc1gsT0FBTyxNQUFYLEVBQW1CO0FBQ2pCdkQsdUJBQU8vVCxHQUFQLENBQVdBLElBQUkzRCxTQUFKLENBQWMsQ0FBZCxFQUFpQjJELElBQUk1SixNQUFKLEdBQWEsQ0FBOUIsQ0FBWDtBQUNELGVBRkQsTUFHSyxJQUFJa2hCLE9BQU8sT0FBWCxFQUFvQjtBQUN2QnZELHVCQUFPL1QsR0FBUCxDQUFXLEVBQVg7QUFDRCxlQUZJLE1BR0E7QUFDSCtULHVCQUFPL1QsR0FBUCxDQUFXQSxNQUFNc1gsR0FBakI7QUFDRDs7QUFFRHBqQiw2QkFBZStELElBQWYsU0FBMEJoRCxJQUExQixFQUFnQztBQUM5QkUsNEJBRDhCO0FBRTlCVyx1QkFBTyxhQUZ1QjtBQUc5QmIsc0JBQU1BLElBSHdCO0FBSTlCMkIsdUJBQU9tZCxPQUFPL1QsR0FBUDtBQUp1QixlQUFoQztBQU1ELGFBckJEO0FBc0JELFdBeEREO0FBeURELFNBckltQjtBQXNJcEIsb0JBQVksa0JBQVVxRCxNQUFWLEVBQWtCO0FBQzVCLGNBQUlwTyxPQUFPLEtBQUtnTixLQUFMLENBQVdvQixNQUFYLENBQVg7QUFDQSxjQUFJclEsT0FBTyxFQUFYO0FBQ0EsZUFBSyxJQUFJcUksSUFBSSxDQUFiLEVBQWdCQSxJQUFJcEcsS0FBS0MsV0FBekIsRUFBc0NtRyxHQUF0QyxFQUEyQztBQUN6Q3JJLGlCQUFLd0ksSUFBTCxDQUFVLFVBQ04sZUFETSxHQUNZLGtCQUFFcUwsU0FBRixDQUFZNVIsS0FBS3RCLE9BQUwsQ0FBYVEsS0FBekIsQ0FEWixHQUM4QyxnQkFEOUMsR0FFTixnQ0FGTSxHQUdOLHdCQUhNLEdBR3FCa0gsQ0FIckIsR0FHeUIsVUFIbkM7QUFJQSxnQkFBSUEsSUFBSXBHLEtBQUtDLFdBQUwsR0FBbUIsQ0FBM0IsRUFBOEJsQyxLQUFLd0ksSUFBTCxDQUFVLHVCQUF1QnZHLEtBQUt0QixPQUFMLENBQWFTLE1BQXBDLEdBQTZDLG9DQUF2RDtBQUMvQjtBQUNEcEIsZUFBS3dJLElBQUwsQ0FBVSxpQ0FBVjtBQUNBdkcsZUFBSzBoQixhQUFMLENBQW1CM2pCLElBQW5CLENBQXdCQSxLQUFLcVIsSUFBTCxDQUFVLEVBQVYsQ0FBeEI7O0FBRUEsY0FBSW1ULFdBQVcsQ0FDYixDQUNFLEVBQUM1Z0IsT0FBTyxHQUFSLEVBQWE2Z0IsWUFBWSxHQUF6QixFQURGLEVBRUUsRUFBQzdnQixPQUFPLEdBQVIsRUFBYTZnQixZQUFZLEdBQXpCLEVBRkYsRUFHRSxFQUFDN2dCLE9BQU8sR0FBUixFQUFhNmdCLFlBQVksR0FBekIsRUFIRixFQUlFLEVBQUM3Z0IsT0FBTyxHQUFSLEVBQWE2Z0IsWUFBWSxHQUF6QixFQUpGLEVBS0UsRUFBQzdnQixPQUFPLEdBQVIsRUFBYTZnQixZQUFZLEdBQXpCLEVBTEYsRUFNRSxFQUFDN2dCLE9BQU8sR0FBUixFQUFhNmdCLFlBQVksR0FBekIsRUFORixFQU9FLEVBQUM3Z0IsT0FBTyxHQUFSLEVBQWE2Z0IsWUFBWSxHQUF6QixFQVBGLEVBUUUsRUFBQzdnQixPQUFPLEdBQVIsRUFBYTZnQixZQUFZLEdBQXpCLEVBUkYsRUFTRSxFQUFDN2dCLE9BQU8sR0FBUixFQUFhNmdCLFlBQVksR0FBekIsRUFURixFQVVFLEVBQUM3Z0IsT0FBTyxHQUFSLEVBQWE2Z0IsWUFBWSxHQUF6QixFQVZGLEVBV0UsRUFBQzdnQixPQUFPLEdBQVIsRUFBYTZnQixZQUFZLEdBQXpCLEVBWEYsRUFZRSxFQUFDN2dCLE9BQU8sR0FBUixFQUFhNmdCLFlBQVksR0FBekIsRUFaRixFQWFFLEVBQUM3Z0IsT0FBTyxHQUFSLEVBQWE2Z0IsWUFBWSxHQUF6QixFQWJGLEVBY0UsRUFBQzNpQixPQUFPLFVBQVIsRUFBb0I3QixJQUFJLE1BQXhCLEVBZEYsQ0FEYSxFQWlCYixDQUNFLEVBQUMyRCxPQUFPLEdBQVIsRUFBYTZnQixZQUFZLEdBQXpCLEVBREYsRUFFRSxFQUFDN2dCLE9BQU8sR0FBUixFQUFhNmdCLFlBQVksR0FBekIsRUFGRixFQUdFLEVBQUM3Z0IsT0FBTyxHQUFSLEVBQWE2Z0IsWUFBWSxHQUF6QixFQUhGLEVBSUUsRUFBQzdnQixPQUFPLEdBQVIsRUFBYTZnQixZQUFZLEdBQXpCLEVBSkYsRUFLRSxFQUFDN2dCLE9BQU8sR0FBUixFQUFhNmdCLFlBQVksR0FBekIsRUFMRixFQU1FLEVBQUM3Z0IsT0FBTyxHQUFSLEVBQWE2Z0IsWUFBWSxHQUF6QixFQU5GLEVBT0UsRUFBQzdnQixPQUFPLEdBQVIsRUFBYTZnQixZQUFZLEdBQXpCLEVBUEYsRUFRRSxFQUFDN2dCLE9BQU8sR0FBUixFQUFhNmdCLFlBQVksR0FBekIsRUFSRixFQVNFLEVBQUM3Z0IsT0FBTyxHQUFSLEVBQWE2Z0IsWUFBWSxHQUF6QixFQVRGLEVBVUUsRUFBQzdnQixPQUFPLEdBQVIsRUFBYTZnQixZQUFZLEdBQXpCLEVBVkYsRUFXRSxFQUFDN2dCLE9BQU8sR0FBUixFQUFhNmdCLFlBQVksR0FBekIsRUFYRixFQVlFLEVBQUM3Z0IsT0FBTyxHQUFSLEVBQWE2Z0IsWUFBWSxHQUF6QixFQVpGLEVBYUUsRUFBQzdnQixPQUFPLElBQVIsRUFBYzZnQixZQUFZLEdBQTFCLEVBYkYsQ0FqQmEsRUFnQ2IsQ0FDRSxFQUFDM2lCLE9BQU8sT0FBUixFQUFpQjdCLElBQUksT0FBckIsRUFERixFQUVFLEVBQUMyRCxPQUFPLEdBQVIsRUFBYTZnQixZQUFZLEdBQXpCLEVBRkYsRUFHRSxFQUFDN2dCLE9BQU8sR0FBUixFQUFhNmdCLFlBQVksR0FBekIsRUFIRixFQUlFLEVBQUM3Z0IsT0FBTyxHQUFSLEVBQWE2Z0IsWUFBWSxHQUF6QixFQUpGLEVBS0UsRUFBQzdnQixPQUFPLEdBQVIsRUFBYTZnQixZQUFZLEdBQXpCLEVBTEYsRUFNRSxFQUFDN2dCLE9BQU8sR0FBUixFQUFhNmdCLFlBQVksR0FBekIsRUFORixFQU9FLEVBQUM3Z0IsT0FBTyxHQUFSLEVBQWE2Z0IsWUFBWSxHQUF6QixFQVBGLEVBUUUsRUFBQzdnQixPQUFPLEdBQVIsRUFBYTZnQixZQUFZLEdBQXpCLEVBUkYsRUFTRSxFQUFDN2dCLE9BQU8sR0FBUixFQUFhNmdCLFlBQVksR0FBekIsRUFURixFQVVFLEVBQUM3Z0IsT0FBTyxHQUFSLEVBQWE2Z0IsWUFBWSxHQUF6QixFQVZGLEVBV0UsRUFBQzdnQixPQUFPLEdBQVIsRUFBYTZnQixZQUFZLEdBQXpCLEVBWEYsRUFZRSxFQUFDN2dCLE9BQU8sR0FBUixFQUFhNmdCLFlBQVksSUFBekIsRUFaRixDQWhDYSxFQThDYixDQUNFLEVBQUMzaUIsT0FBTyxPQUFSLEVBQWlCN0IsSUFBSSxPQUFyQixFQURGLEVBRUUsRUFBQzJELE9BQU8sR0FBUixFQUFhNmdCLFlBQVksR0FBekIsRUFGRixFQUdFLEVBQUM3Z0IsT0FBTyxHQUFSLEVBQWE2Z0IsWUFBWSxHQUF6QixFQUhGLEVBSUUsRUFBQzdnQixPQUFPLEdBQVIsRUFBYTZnQixZQUFZLEdBQXpCLEVBSkYsRUFLRSxFQUFDN2dCLE9BQU8sR0FBUixFQUFhNmdCLFlBQVksR0FBekIsRUFMRixFQU1FLEVBQUM3Z0IsT0FBTyxHQUFSLEVBQWE2Z0IsWUFBWSxHQUF6QixFQU5GLEVBT0UsRUFBQzdnQixPQUFPLEdBQVIsRUFBYTZnQixZQUFZLEdBQXpCLEVBUEYsRUFRRSxFQUFDN2dCLE9BQU8sR0FBUixFQUFhNmdCLFlBQVksR0FBekIsRUFSRixFQVNFLEVBQUM3Z0IsT0FBTyxHQUFSLEVBQWE2Z0IsWUFBWSxHQUF6QixFQVRGLEVBVUUsRUFBQzdnQixPQUFPLEdBQVIsRUFBYTZnQixZQUFZLEdBQXpCLEVBVkYsRUFXRSxFQUFDN2dCLE9BQU8sR0FBUixFQUFhNmdCLFlBQVksR0FBekIsRUFYRixFQVlFLEVBQUMzaUIsT0FBTyxPQUFSLEVBQWlCN0IsSUFBSSxPQUFyQixFQVpGLENBOUNhLENBQWY7QUE2REEsY0FBSW9rQixlQUFlLENBQ2pCLEVBQUN2aUIsT0FBTyxVQUFSLEVBQW9CN0IsSUFBSSxNQUF4QixFQURpQixFQUNnQixFQUFDNkIsT0FBTyxHQUFSLEVBQWE3QixJQUFJLE9BQWpCLEVBRGhCLENBQW5CO0FBR0EsY0FBTXlrQixjQUFjLFNBQWRBLFdBQWMsQ0FBVUMsVUFBVixFQUFzQjtBQUN4QyxnQkFBSVYsS0FBSyxFQUFUO0FBQ0FPLHFCQUFTbk8sT0FBVCxDQUFpQixVQUFVMEIsR0FBVixFQUFlO0FBQzlCa00saUJBQUd6YixJQUFILENBQVEsNkNBQVI7QUFDQXVQLGtCQUFJMUIsT0FBSixDQUFZLFVBQVVDLENBQVYsRUFBYTs7QUFFdkIsb0JBQUlzTyxpQkFBSjtBQUFBLG9CQUFjQyxpQkFBZDtBQUFBLG9CQUF3QnZoQixxQkFBeEI7QUFBQSxvQkFBc0NFLGlCQUF0QztBQUFBLG9CQUFnREQsaUJBQWhEO0FBQ0Esb0JBQUkrUyxFQUFFclcsRUFBTixFQUFVO0FBQ1Iya0IsNkJBQVd0TyxFQUFFclcsRUFBYjtBQUNBNGtCLDZCQUFXdk8sRUFBRXhVLEtBQWI7QUFDQXdCLGlDQUFlckIsS0FBS3RCLE9BQUwsQ0FBYUUsTUFBYixDQUFvQmdELG1CQUFuQztBQUNBTCw2QkFBV3ZCLEtBQUt0QixPQUFMLENBQWFFLE1BQWIsQ0FBb0I0QyxlQUEvQjtBQUNBRiw2QkFBV3RCLEtBQUt0QixPQUFMLENBQWFFLE1BQWIsQ0FBb0JpRCxlQUEvQjtBQUNELGlCQU5ELE1BTU87QUFDTCtnQiw2QkFBV0QsV0FBYUQsVUFBRCxHQUFlck8sRUFBRW1PLFVBQWpCLEdBQThCbk8sRUFBRTFTLEtBQXZEO0FBQ0FOLGlDQUFlckIsS0FBS3RCLE9BQUwsQ0FBYUUsTUFBYixDQUFvQnlDLFlBQW5DO0FBQ0FFLDZCQUFXdkIsS0FBS3RCLE9BQUwsQ0FBYUUsTUFBYixDQUFvQjJDLFFBQS9CO0FBQ0FELDZCQUFXdEIsS0FBS3RCLE9BQUwsQ0FBYUUsTUFBYixDQUFvQjBDLFFBQS9CO0FBQ0Q7O0FBRUQwZ0IsbUJBQUd6YixJQUFILENBQVEscUNBQXFDbEYsWUFBckMsR0FBb0QsSUFBNUQ7QUFDQTJnQixtQkFBR3piLElBQUgsQ0FBUSxvQkFBb0JoRixRQUFwQixHQUErQixJQUEvQixHQUNKLFNBREksR0FDUUQsUUFEUixHQUNtQix5QkFEbkIsR0FDK0NxaEIsUUFEL0MsR0FDMEQsSUFEMUQsR0FDaUVDLFFBRGpFLEdBQzRFLFdBRHBGO0FBRUFaLG1CQUFHemIsSUFBSCxDQUFRLFFBQVI7QUFDRCxlQXBCRDtBQXFCQXliLGlCQUFHemIsSUFBSCxDQUFRLFFBQVI7QUFDRCxhQXhCRDtBQXlCQSxtQkFBT3liLEdBQUc1UyxJQUFILENBQVEsRUFBUixDQUFQO0FBQ0QsV0E1QkQ7O0FBOEJBO0FBQ0FwUCxlQUFLMGhCLGFBQUwsQ0FBbUJoVixJQUFuQixDQUF3Qix3QkFBeEIsRUFBa0R3QixJQUFsRCxDQUF1RCxZQUFZO0FBQ2pFLGdCQUFJcVAsTUFBTSxLQUFLM0ssWUFBTCxDQUFrQixzQkFBbEIsQ0FBVjtBQUFBLGdCQUNFaVEsUUFBUXRRLEVBQUUsSUFBRixDQURWO0FBQUEsZ0JBRUVtUSxhQUFhLEtBRmY7QUFBQSxnQkFHRUksY0FBYyxTQUFkQSxXQUFjLEdBQVk7QUFDeEJKLDJCQUFhLENBQUNBLFVBQWQ7QUFDQUcsb0JBQU05a0IsSUFBTixDQUFXMGtCLFlBQVlDLFVBQVosQ0FBWDtBQUNELGFBTkg7O0FBUUFHLGtCQUFNOWtCLElBQU4sQ0FBVzBrQixZQUFZQyxVQUFaLENBQVgsRUFBb0MzVixFQUFwQyxDQUF1QyxXQUF2QyxFQUFvRCx1QkFBcEQsRUFBNkUsWUFBWTtBQUN2RixrQkFBSXNWLE1BQU0sS0FBS3pQLFlBQUwsQ0FBa0IscUJBQWxCLENBQVY7QUFBQSxrQkFDRWtNLFNBQVU5ZSxLQUFLdU0sT0FBTCxDQUFhZixHQUFiLENBQWlCLENBQWpCLEVBQW9CZ0IsT0FBcEIsQ0FBNEJ5TyxXQUE1QixNQUE2QyxPQUE5QyxHQUF5RGpiLEtBQUt1TSxPQUE5RCxHQUF3RSxxQkFBT3ZNLEtBQUt1TSxPQUFMLENBQWFHLElBQWIsQ0FBa0IsYUFBbEIsRUFBaUNsQixHQUFqQyxDQUFxQytSLEdBQXJDLENBQVAsQ0FEbkY7QUFBQSxrQkFFRXhTLE1BQU0rVCxPQUFPL1QsR0FBUCxFQUZSOztBQUlBLHNCQUFRc1gsR0FBUjtBQUNFLHFCQUFLLE1BQUw7QUFDRXZELHlCQUFPL1QsR0FBUCxDQUFXQSxJQUFJM0QsU0FBSixDQUFjLENBQWQsRUFBaUIyRCxJQUFJNUosTUFBSixHQUFhLENBQTlCLENBQVg7QUFDQTtBQUNGLHFCQUFLLE9BQUw7QUFDRTJkLHlCQUFPL1QsR0FBUCxDQUFXLEVBQVg7QUFDQTtBQUNGLHFCQUFLLE9BQUw7QUFDRStYO0FBQ0EseUJBQU8sS0FBUDtBQUNBO0FBQ0YscUJBQUssT0FBTDtBQUNFNWlCLHVCQUFLSSxLQUFMO0FBQ0EseUJBQU8sS0FBUDtBQUNBO0FBQ0Y7QUFDRXdlLHlCQUFPL1QsR0FBUCxDQUFXQSxNQUFNc1gsR0FBakI7QUFoQko7O0FBbUJBcGpCLDZCQUFlK0QsSUFBZixDQUFvQixJQUFwQixFQUEwQmhELElBQTFCLEVBQWdDO0FBQzlCRSxzQkFBTUEsSUFEd0I7QUFFOUJXLHVCQUFPLGFBRnVCO0FBRzlCYixzQkFBTUEsSUFId0I7QUFJOUIyQix1QkFBT21kLE9BQU8vVCxHQUFQO0FBSnVCLGVBQWhDO0FBTUQsYUE5QkQ7QUErQkQsV0F4Q0Q7QUF5Q0QsU0EzUm1CO0FBNFJwQixrQkFBVSxnQkFBVXFELE1BQVYsRUFBa0I7QUFDMUIsY0FBSXBPLE9BQU8sS0FBS2dOLEtBQUwsQ0FBV29CLE1BQVgsQ0FBWDtBQUFBLGNBQ0VyUSxPQUFPLEVBRFQ7QUFFQSxlQUFLLElBQUlxSSxJQUFJLENBQWIsRUFBZ0JBLElBQUlwRyxLQUFLQyxXQUF6QixFQUFzQ21HLEdBQXRDLEVBQTJDO0FBQ3pDckksaUJBQUt3SSxJQUFMLENBQVUsVUFDTixlQURNLEdBQ1ksa0JBQUVxTCxTQUFGLENBQVk1UixLQUFLdEIsT0FBTCxDQUFhUSxLQUF6QixDQURaLEdBQzhDLGdCQUQ5QyxHQUVOLGdDQUZNLEdBR04sc0JBSE0sR0FHbUJrSCxDQUhuQixHQUd1QixVQUhqQztBQUlBLGdCQUFJQSxJQUFJcEcsS0FBS0MsV0FBTCxHQUFtQixDQUEzQixFQUE4QmxDLEtBQUt3SSxJQUFMLENBQVUsdUJBQXVCdkcsS0FBS3RCLE9BQUwsQ0FBYVMsTUFBcEMsR0FBNkMsb0NBQXZEO0FBQy9CO0FBQ0RwQixlQUFLd0ksSUFBTCxDQUFVLGlDQUFWO0FBQ0F2RyxlQUFLMGhCLGFBQUwsQ0FBbUIzakIsSUFBbkIsQ0FBd0JBLEtBQUtxUixJQUFMLENBQVUsRUFBVixDQUF4Qjs7QUFFQTtBQUNBcFAsZUFBSzBoQixhQUFMLENBQW1CaFYsSUFBbkIsQ0FBd0Isc0JBQXhCLEVBQWdEd0IsSUFBaEQsQ0FBcUQsWUFBWTtBQUMvRCxnQkFBSXFQLE1BQU0sS0FBSzNLLFlBQUwsQ0FBa0Isb0JBQWxCLENBQVY7QUFBQSxnQkFDRW9QLEtBQUssRUFEUDtBQUFBLGdCQUVFTyxXQUFXdmlCLEtBQUt0QixPQUFMLENBQWFFLE1BQWIsQ0FBb0IyakIsUUFBcEIsSUFBZ0MsQ0FDekMsRUFBQzVnQixPQUFPLEdBQVIsRUFEeUMsRUFFekMsRUFBQ0EsT0FBTyxHQUFSLEVBRnlDLEVBR3pDLEVBQUNBLE9BQU8sR0FBUixFQUh5QyxFQUl6QyxFQUFDOUIsT0FBTyxJQUFSLEVBQWM3QixJQUFJLE1BQWxCLEVBSnlDLEVBS3pDLEVBQUMyRCxPQUFPLEdBQVIsRUFMeUMsRUFNekMsRUFBQ0EsT0FBTyxHQUFSLEVBTnlDLEVBT3pDLEVBQUNBLE9BQU8sR0FBUixFQVB5QyxFQVF6QyxFQUFDOUIsT0FBTyxLQUFSLEVBQWU3QixJQUFJLE9BQW5CLEVBUnlDLEVBU3pDLEVBQUMyRCxPQUFPLEdBQVIsRUFUeUMsRUFVekMsRUFBQ0EsT0FBTyxHQUFSLEVBVnlDLEVBV3pDLEVBQUNBLE9BQU8sR0FBUixFQVh5QyxFQVl6QyxFQUFDQSxPQUFPLEVBQVIsRUFaeUMsRUFhekMsRUFBQ0EsT0FBTyxHQUFSLEVBYnlDLEVBY3pDLEVBQUNBLE9BQU8sR0FBUixFQWR5QyxFQWV6QyxFQUFDQSxPQUFPLEVBQVIsRUFmeUMsRUFnQnpDLEVBQUM5QixPQUFPLElBQVIsRUFBYzdCLElBQUksT0FBbEIsRUFoQnlDLENBRjdDOztBQXFCQXVrQixxQkFBU25PLE9BQVQsQ0FBaUIsVUFBVUMsQ0FBVixFQUFhO0FBQzVCLGtCQUFJc08saUJBQUo7QUFBQSxrQkFBY0MsaUJBQWQ7QUFBQSxrQkFBd0J2aEIscUJBQXhCO0FBQUEsa0JBQXNDRSxpQkFBdEM7QUFBQSxrQkFBZ0RELGlCQUFoRDs7QUFFQSxrQkFBSStTLEVBQUVyVyxFQUFOLEVBQVU7QUFDUjJrQiwyQkFBV3RPLEVBQUVyVyxFQUFiO0FBQ0E0a0IsMkJBQVd2TyxFQUFFeFUsS0FBYjtBQUNBMEIsMkJBQVd2QixLQUFLdEIsT0FBTCxDQUFhRSxNQUFiLENBQW9CNEMsZUFBL0I7QUFDQUgsK0JBQWVyQixLQUFLdEIsT0FBTCxDQUFhRSxNQUFiLENBQW9CZ0QsbUJBQW5DO0FBQ0FOLDJCQUFXdEIsS0FBS3RCLE9BQUwsQ0FBYUUsTUFBYixDQUFvQmlELGVBQS9CO0FBQ0QsZUFORCxNQU1PO0FBQ0wrZ0IsMkJBQVdELFdBQVd0TyxFQUFFMVMsS0FBeEI7QUFDQUosMkJBQVlvaEIsUUFBRCxHQUFhM2lCLEtBQUt0QixPQUFMLENBQWFFLE1BQWIsQ0FBb0IyQyxRQUFqQyxHQUE0QyxFQUF2RDtBQUNBRiwrQkFBZXJCLEtBQUt0QixPQUFMLENBQWFFLE1BQWIsQ0FBb0J5QyxZQUFuQztBQUNBQywyQkFBV3RCLEtBQUt0QixPQUFMLENBQWFFLE1BQWIsQ0FBb0IwQyxRQUEvQjtBQUNEOztBQUVEMGdCLGlCQUFHemIsSUFBSCxDQUFRLDRCQUE0QmxGLFlBQTVCLEdBQTJDLElBQW5EO0FBQ0EyZ0IsaUJBQUd6YixJQUFILENBQVEsd0NBQXdDaEYsUUFBeEMsR0FBbUQsSUFBbkQsR0FDSixTQURJLEdBQ1FELFFBRFIsR0FDbUIsdUJBRG5CLEdBQzZDcWhCLFFBRDdDLEdBQ3dELElBRHhELElBQ2dFQyxZQUFZLFFBRDVFLElBQ3dGLFdBRGhHO0FBRUFaLGlCQUFHemIsSUFBSCxDQUFRLFFBQVI7QUFDRCxhQXBCRDs7QUFzQkF5YixlQUFHemIsSUFBSCxDQUFRLGlDQUFSOztBQUVBZ00sY0FBRSxJQUFGLEVBQVF4VSxJQUFSLENBQWFpa0IsR0FBRzVTLElBQUgsQ0FBUSxFQUFSLENBQWIsRUFBMEJyQyxFQUExQixDQUE2QixXQUE3QixFQUEwQyxxQkFBMUMsRUFBaUUsWUFBWTtBQUMzRSxrQkFBSXNWLE1BQU0sS0FBS3pQLFlBQUwsQ0FBa0IsbUJBQWxCLENBQVY7QUFBQSxrQkFDRWtNLFNBQVU5ZSxLQUFLdU0sT0FBTCxDQUFhZixHQUFiLENBQWlCLENBQWpCLEVBQW9CZ0IsT0FBcEIsQ0FBNEJ5TyxXQUE1QixNQUE2QyxPQUE5QyxHQUF5RGpiLEtBQUt1TSxPQUE5RCxHQUF3RSxxQkFBT3ZNLEtBQUt1TSxPQUFMLENBQWFHLElBQWIsQ0FBa0IsYUFBbEIsRUFBaUNsQixHQUFqQyxDQUFxQytSLEdBQXJDLENBQVAsQ0FEbkY7QUFBQSxrQkFFRXhTLE1BQU0rVCxPQUFPL1QsR0FBUCxFQUZSO0FBQUEsa0JBR0VsSyxRQUFRLEVBSFY7O0FBS0Esc0JBQVF3aEIsR0FBUjtBQUNFLHFCQUFLLE1BQUw7QUFDRXhoQiwwQkFBUSxhQUFSO0FBQ0FpZSx5QkFBTy9ULEdBQVAsQ0FBV0EsSUFBSTNELFNBQUosQ0FBYyxDQUFkLEVBQWlCMkQsSUFBSTVKLE1BQUosR0FBYSxDQUE5QixDQUFYO0FBQ0E7QUFDRixxQkFBSyxPQUFMO0FBQ0VOLDBCQUFRLGFBQVI7QUFDQWllLHlCQUFPL1QsR0FBUCxDQUFXLEVBQVg7QUFDQTtBQUNGLHFCQUFLLE9BQUw7QUFDRTdLLHVCQUFLSSxLQUFMLENBQVdOLElBQVgsRUFBaUIsT0FBakI7QUFDQSx5QkFBTyxLQUFQO0FBQ0E7QUFDRixxQkFBSyxPQUFMO0FBQ0VFLHVCQUFLSSxLQUFMO0FBQ0EseUJBQU8sS0FBUDtBQUNBO0FBQ0Y7QUFDRU8sMEJBQVEsYUFBUjtBQUNBaWUseUJBQU8vVCxHQUFQLENBQVdBLE1BQU1zWCxHQUFqQjtBQW5CSjs7QUFzQkFwakIsNkJBQWUrRCxJQUFmLENBQW9CLElBQXBCLEVBQTBCaEQsSUFBMUIsRUFBZ0M7QUFDOUJFLHNCQUFNQSxJQUR3QjtBQUU5QlcsdUJBQU9BLEtBRnVCO0FBRzlCYixzQkFBTUEsSUFId0I7QUFJOUIyQix1QkFBT21kLE9BQU8vVCxHQUFQO0FBSnVCLGVBQWhDO0FBTUQsYUFsQ0Q7QUFtQ0QsV0FqRkQ7QUFrRkQsU0E1WG1CO0FBNlhwQixpQkFBUyxlQUFVcUQsTUFBVixFQUFrQjtBQUN6QixjQUFJcE8sT0FBTyxLQUFLZ04sS0FBTCxDQUFXb0IsTUFBWCxDQUFYO0FBQUEsY0FDRXJRLE9BQU8sRUFEVDtBQUFBLGNBRUVnbEIsZ0JBQWdCLGdCQUFPclYsTUFBUCxDQUFjLEVBQWQsRUFBa0IsS0FBSzlPLE1BQUwsQ0FBWWlpQixPQUE5QixDQUZsQjtBQUFBLGNBR0U5VyxRQUFTL0osS0FBS3VNLE9BQUwsQ0FBYWYsR0FBYixDQUFpQixDQUFqQixFQUFvQmdCLE9BQXBCLENBQTRCeU8sV0FBNUIsTUFBNkMsT0FBOUMsR0FBeURqYixLQUFLdU0sT0FBOUQsR0FBd0V2TSxLQUFLdU0sT0FBTCxDQUFhRyxJQUFiLENBQWtCLGFBQWxCLENBSGxGOztBQUtBLGVBQUssSUFBSXRHLElBQUksQ0FBYixFQUFnQkEsSUFBSXBHLEtBQUtDLFdBQXpCLEVBQXNDbUcsR0FBdEMsRUFBMkM7QUFDekNySSxpQkFBS3dJLElBQUwsQ0FBVSxVQUNOLDRCQURNLEdBQ3lCLGtCQUFFcUwsU0FBRixDQUFZNVIsS0FBS3RCLE9BQUwsQ0FBYVEsS0FBekIsQ0FEekIsR0FDMkQsZ0JBRDNELEdBRU4sZ0NBRk0sR0FHTix1QkFITSxHQUdvQmtILENBSHBCLEdBR3dCLCtCQUh4QixHQUcwRHBHLEtBQUtJLEVBSC9ELEdBR29FLFVBSDlFO0FBSUEsZ0JBQUlnRyxJQUFJcEcsS0FBS0MsV0FBTCxHQUFtQixDQUEzQixFQUE4QmxDLEtBQUt3SSxJQUFMLENBQVUsdUJBQXVCdkcsS0FBS3RCLE9BQUwsQ0FBYVMsTUFBcEMsR0FBNkMsb0NBQXZEO0FBQy9CO0FBQ0RwQixlQUFLd0ksSUFBTCxDQUFVLGlDQUFWO0FBQ0F2RyxlQUFLMGhCLGFBQUwsQ0FBbUIzakIsSUFBbkIsQ0FBd0JBLEtBQUtxUixJQUFMLENBQVUsRUFBVixDQUF4Qjs7QUFFQTtBQUNBcFAsZUFBS2dqQixhQUFMLEdBQXFCLEVBQXJCO0FBQ0FoakIsZUFBSzBoQixhQUFMLENBQW1CaFYsSUFBbkIsQ0FBd0IsdUJBQXhCLEVBQWlEd0IsSUFBakQsQ0FBc0QsWUFBWTtBQUNoRTtBQUNBLGdCQUFJcVAsTUFBTSxLQUFLM0ssWUFBTCxDQUFrQixxQkFBbEIsQ0FBVjtBQUFBLGdCQUNFcVEsU0FBU2xaLE1BQU15QixHQUFOLENBQVUrUixHQUFWLEVBQWU1YixLQUQxQjs7QUFHQW9oQiwwQkFBY3RHLGFBQWQsR0FBOEJ3RyxNQUE5QjtBQUNBRiw0QkFBZ0IsZ0JBQU9yVixNQUFQLENBQWMsSUFBZCxFQUFvQnFWLGFBQXBCLEVBQW1DL2lCLEtBQUt0QixPQUFMLENBQWFFLE1BQWIsSUFBdUIsRUFBMUQsQ0FBaEI7QUFDQW1rQiwwQkFBY3ZrQixNQUFkLEdBQXVCLElBQXZCO0FBQ0F1a0IsMEJBQWNoakIsT0FBZCxHQUF3QixVQUFVcWIsS0FBVixFQUFpQjtBQUN2Q2xiLG1CQUFLQyxlQUFMLENBQXFCSCxLQUFLSSxFQUExQixFQUE4Qm1kLEdBQTlCLEVBQW1DbkMsS0FBbkM7QUFDRCxhQUZEO0FBR0EySCwwQkFBY3hILGFBQWQsR0FBOEIsVUFBVUgsS0FBVixFQUFpQjtBQUM3Q2xiLG1CQUFLQyxlQUFMLENBQXFCSCxLQUFLSSxFQUExQixFQUE4Qm1kLEdBQTlCLEVBQW1DbkMsS0FBbkMsRUFBMEMsRUFBQ29HLFlBQVksSUFBYixFQUExQztBQUNELGFBRkQ7O0FBSUF4aEIsaUJBQUtnakIsYUFBTCxDQUFtQnpjLElBQW5CLENBQXdCO0FBQ3RCd2Isc0JBQVEvaEIsS0FBS0ksRUFEUztBQUV0QmdCLDBCQUFZbWMsR0FGVTtBQUd0QnNELHVCQUFTLDJCQUFZa0MsYUFBWjtBQUhhLGFBQXhCO0FBS0QsV0FwQkQ7QUFzQkQ7QUFyYW1CLE9BQXRCOztBQXdhQSxVQUFJN2lCLE9BQU8sSUFBWDtBQUNBLFVBQUlrTyxTQUFVLGtCQUFFQyxRQUFGLENBQVdmLE9BQVgsQ0FBRCxHQUF3QkEsT0FBeEIsR0FBa0NELFVBQVVySyxJQUFWLENBQWUsSUFBZixFQUFxQnNLLE9BQXJCLENBQS9DO0FBQUEsVUFDRXROLE9BQU8sS0FBS2dOLEtBQUwsQ0FBV29CLE1BQVgsQ0FEVDs7QUFHQTs7O0FBR0EsVUFBSSxLQUFLVCxTQUFULEVBQW9CdVYsYUFBYSxLQUFLdlYsU0FBbEI7QUFDcEIsVUFBSSxLQUFLeVIsWUFBVCxFQUF1QjtBQUNyQixZQUFJLEtBQUtlLHNCQUFMLElBQStCL1IsTUFBbkMsRUFBMkM7QUFDekMsaUJBQU8sSUFBUDtBQUNEOztBQUVELFlBQUlxVCxXQUFXLENBQWYsRUFBa0IsT0FBTyxJQUFQO0FBQ2xCLGFBQUtuaEIsS0FBTDtBQUNBLGFBQUtxTixTQUFMLEdBQWlCdUosV0FBWSxZQUFZO0FBQ3ZDLGVBQUswSCxJQUFMLENBQVV4USxNQUFWLEVBQWtCLENBQUNxVCxZQUFZLENBQWIsSUFBa0IsQ0FBcEM7QUFDRCxTQUYyQixDQUV6Qm5qQixJQUZ5QixDQUVwQixJQUZvQixDQUFYLEVBRUYsS0FBS00sTUFBTCxDQUFZNk8sV0FGVixDQUFqQjtBQUdBLGVBQU8sSUFBUDtBQUNEOztBQUVELFdBQUsyUixZQUFMLEdBQW9CLHFCQUFPLHNCQUFTN1csTUFBVCxDQUFnQjJJLEtBQUt1TixVQUFMLENBQWdCemIsSUFBaEIsQ0FBcUIsSUFBckIsQ0FBaEIsRUFBNENoRCxJQUE1QyxDQUFQLENBQXBCO0FBQ0EsV0FBS2tnQixpQkFBTCxHQUF5QixLQUFLZCxZQUFMLENBQWtCMVMsSUFBbEIsQ0FBdUIsa0JBQXZCLENBQXpCO0FBQ0EsV0FBS3lULHNCQUFMLEdBQThCL1IsTUFBOUI7QUFDQXBPLFdBQUswaEIsYUFBTCxHQUFxQixLQUFLdEMsWUFBTCxDQUFrQjFTLElBQWxCLENBQXVCLDZCQUF2QixDQUFyQjs7QUFFQSxVQUFJLGtCQUFFekosVUFBRixDQUFhakQsS0FBS3RCLE9BQWxCLENBQUosRUFBZ0M7QUFDOUI7QUFDQXNCLGFBQUswaEIsYUFBTCxDQUFtQjNqQixJQUFuQixDQUF3QixXQUF4QjtBQUNBMmpCLHNCQUFjLEtBQWQsRUFBcUIxZSxJQUFyQixDQUEwQixJQUExQixFQUFnQ29MLE1BQWhDLEVBQXdDLFVBQVVyUSxJQUFWLEVBQWdCO0FBQ3REaUMsZUFBSzBoQixhQUFMLENBQW1CM2pCLElBQW5CLENBQXdCQSxJQUF4QjtBQUNELFNBRkQ7QUFHRCxPQU5ELE1BT0s7QUFDSCxZQUFJaUMsS0FBS3RCLE9BQUwsQ0FBYUMsSUFBYixJQUFxQitpQixhQUF6QixFQUF3QztBQUN0Q0Esd0JBQWMxaEIsS0FBS3RCLE9BQUwsQ0FBYUMsSUFBM0IsRUFBaUNxRSxJQUFqQyxDQUFzQyxJQUF0QyxFQUE0Q29MLE1BQTVDO0FBQ0Q7QUFDRjs7QUFFRDtBQUNBLFdBQUtnUixZQUFMLENBQWtCMVMsSUFBbEIsQ0FBdUIsbUJBQXZCLEVBQTRDSyxFQUE1QyxDQUErQyxLQUFLbk8sTUFBTCxDQUFZOFQsY0FBM0QsRUFBNEUsVUFBVTlILENBQVYsRUFBYTtBQUN2RnlWLG1CQUFXcmQsSUFBWCxDQUFnQixJQUFoQixFQUFzQjRILEtBQUtzSyxPQUFPeEUsS0FBbEMsRUFBeUN0QyxNQUF6QztBQUNELE9BRjBFLENBRXhFOVAsSUFGd0UsQ0FFbkUsSUFGbUUsQ0FBM0U7O0FBSUE0Z0Isa0JBQVlsYyxJQUFaLENBQWlCLElBQWpCLEVBQXVCLFFBQXZCOztBQUVBLDJCQUFPa1MsTUFBUCxFQUNHbkksRUFESCxDQUNNLGtCQUROLEVBQzBCLGtCQUFFb1csUUFBRixDQUFXLFVBQVV2WSxDQUFWLEVBQWE7QUFDOUNzVSxvQkFBWWxjLElBQVosQ0FBaUIsSUFBakIsRUFBdUI0SCxLQUFLc0ssT0FBT3hFLEtBQW5DO0FBQ0QsT0FGdUIsRUFFckIsR0FGcUIsRUFFaEJwUyxJQUZnQixDQUVYLElBRlcsQ0FEMUIsRUFJR3lPLEVBSkgsQ0FJTSxpQkFKTixFQUl5QixVQUFDbkMsQ0FBRCxFQUFPO0FBQzVCQSxZQUFJQSxLQUFLc0ssT0FBT3hFLEtBQWhCO0FBQ0E2UCxvQkFBWXZkLElBQVosU0FBdUI0SCxDQUF2QjtBQUNBLDBCQUFFVSxTQUFGLENBQVlWLENBQVo7QUFDRCxPQVJILEVBU0dtQyxFQVRILENBU00saUJBVE4sRUFTeUIsVUFBQ25DLENBQUQsRUFBTztBQUM1QkEsWUFBSUEsS0FBS3NLLE9BQU94RSxLQUFoQjtBQUNBMFAsb0JBQVlwZCxJQUFaLFNBQXVCNEgsQ0FBdkI7QUFDQSwwQkFBRVUsU0FBRixDQUFZVixDQUFaO0FBQ0QsT0FiSDs7QUFlQTNMLHFCQUFlK0QsSUFBZixDQUFvQixJQUFwQixFQUEwQmhELElBQTFCLEVBQWdDO0FBQzlCRSxjQUFNLElBRHdCO0FBRTlCVyxlQUFPLE1BRnVCO0FBRzlCYixjQUFNQTtBQUh3QixPQUFoQzs7QUFNQSxhQUFPLElBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7OzBCQU1NQSxJLEVBQU1hLEssRUFBTztBQUNqQixVQUFJLEtBQUsrTSxVQUFULEVBQXFCc1YsYUFBYSxLQUFLdFYsVUFBbEI7QUFDckIsVUFBSSxDQUFDLEtBQUt3UixZQUFWLEVBQXdCLE9BQU8sSUFBUDs7QUFFeEJwZixhQUFPLEtBQUtnTixLQUFMLENBQVcsS0FBS21ULHNCQUFoQixDQUFQOztBQUVBLFdBQUtmLFlBQUwsQ0FBa0J6SyxRQUFsQixDQUEyQixTQUEzQjtBQUNBLDJCQUFPTyxNQUFQLEVBQWVqVCxHQUFmLENBQW1CLGtCQUFuQjtBQUNBLDJCQUFPaVQsTUFBUCxFQUFlalQsR0FBZixDQUFtQixpQkFBbkI7QUFDQSwyQkFBT2lULE1BQVAsRUFBZWpULEdBQWYsQ0FBbUIsaUJBQW5COztBQUVBLFdBQUsyTCxVQUFMLEdBQWtCc0osV0FBWSxZQUFZO0FBQ3hDLFlBQUksS0FBS2tJLFlBQVQsRUFBdUIsS0FBS0EsWUFBTCxDQUFrQmdFLE1BQWxCO0FBQ3ZCLGFBQUtoRSxZQUFMLEdBQW9CLElBQXBCO0FBQ0EsYUFBS2Usc0JBQUwsR0FBOEIsQ0FBQyxDQUEvQjs7QUFFQWxoQix1QkFBZStELElBQWYsQ0FBb0IsSUFBcEIsRUFBMEJoRCxJQUExQixFQUFnQztBQUM5QkUsZ0JBQU0sSUFEd0I7QUFFOUJXLGlCQUFPQSxTQUFTO0FBRmMsU0FBaEM7QUFLRCxPQVY0QixDQVUxQnZDLElBVjBCLENBVXJCLElBVnFCLENBQVgsRUFVSCxLQUFLTSxNQUFMLENBQVk2TyxXQVZULENBQWxCOztBQVlBLGFBQU8sSUFBUDtBQUNEOzs7Ozs7a0JBR1lrVCxXIiwiZmlsZSI6IjMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tIFwianFtaW5cIjtcbmltcG9ydCB1dGlsIGZyb20gXCIuLi8uLi9zcmMvQVg2VXRpbFwiO1xuaW1wb3J0IFBpY2tlciBmcm9tIFwiLi4vLi4vc3JjL0FYNlVJUGlja2VyXCI7XG5pbXBvcnQgXCIuLi8uLi9zcmMvQVg2VUlDYWxlbmRhci9zdHlsZS5zY3NzXCI7XG5pbXBvcnQgXCIuLi8uLi9zcmMvQVg2VUlQYWxldHRlL3N0eWxlLnNjc3NcIjtcbmltcG9ydCBcIi4uLy4uL3NyYy9BWDZVSVBpY2tlci9zdHlsZS5zY3NzXCI7XG5cblxubGV0IGh0bWwgPSBgXG48ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkIGNvbCBzMTJcIj5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJwaWNrZXItZGF0ZVwiIHZhbHVlPVwiXCIgcGxhY2Vob2xkZXI9XCJcIiBvbmNoYW5nZT1cImNvbnNvbGUubG9nKCdwaWNrZXItZGF0ZSA9ICcgKyB0aGlzLnZhbHVlKVwiLz5cbiAgICAgICAgPGxhYmVsIGZvcj1cInBpY2tlci1kYXRlXCI+eXl5eS9tbS9kZDwvbGFiZWw+XG4gICAgPC9kaXY+XG48L2Rpdj5cblxuPGRpdiBjbGFzcz1cInJvd1wiIGRhdGEtcGlja2VyPVwiZGF0ZS1zZVwiPlxuICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZCBjb2wgczZcIj5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJwaWNrZXItZGF0ZS1zXCIgdmFsdWU9XCJcIiBwbGFjZWhvbGRlcj1cIlwiLz5cbiAgICAgICAgPGxhYmVsIGZvcj1cInBpY2tlci1kYXRlLXNcIj7si5zsnpHsnbw8L2xhYmVsPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZCBjb2wgczZcIj5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJwaWNrZXItZGF0ZS1lXCIgdmFsdWU9XCJcIiBwbGFjZWhvbGRlcj1cIlwiLz5cbiAgICAgICAgPGxhYmVsIGZvcj1cInBpY2tlci1kYXRlLWVcIj7sooXro4zsnbw8L2xhYmVsPlxuICAgIDwvZGl2PlxuPC9kaXY+XG5cbjxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZmllbGQgY29sIHMxMlwiPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cInNlY3VyZS1udW1cIiBwbGFjZWhvbGRlcj1cIlwiICBtYXhsZW5ndGg9XCI0XCIgcmVhZG9ubHk9XCJyZWFkb25seVwiIC8+XG4gICAgICAgIDxsYWJlbCBmb3I9XCJzZWN1cmUtbnVtXCI+U2VjdXJlIE51bWJlcjwvbGFiZWw+XG4gICAgPC9kaXY+XG48L2Rpdj5cblxuPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZCBjb2wgczEyXCI+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwia2V5Ym9hcmQtMFwiIHBsYWNlaG9sZGVyPVwiXCIgLz5cbiAgICAgICAgPGxhYmVsIGZvcj1cImtleWJvYXJkLTBcIj5LZXlib2FyZDwvbGFiZWw+XG4gICAgPC9kaXY+XG48L2Rpdj5cblxuPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZCBjb2wgczEyXCI+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwibnVtcGFkLTBcIiBwbGFjZWhvbGRlcj1cIlwiIC8+XG4gICAgICAgIDxsYWJlbCBmb3I9XCJudW1wYWQtMFwiPk51bXBhZDwvbGFiZWw+XG4gICAgPC9kaXY+XG48L2Rpdj5cblxuPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZCBjb2wgczEyXCI+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiY3VzdG9tLTBcIiBwbGFjZWhvbGRlcj1cIlwiIC8+XG4gICAgICAgIDxsYWJlbCBmb3I9XCJjdXN0b20tMFwiPkN1c3RvbTwvbGFiZWw+XG4gICAgPC9kaXY+XG48L2Rpdj5cblxuPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1maWVsZCBjb2wgczEyXCI+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiY29sb3ItMFwiIHBsYWNlaG9sZGVyPVwiXCIgLz5cbiAgICAgICAgPGxhYmVsIGZvcj1cImNvbG9yLTBcIj5Db2xvcjwvbGFiZWw+XG4gICAgPC9kaXY+XG48L2Rpdj5cbmA7XG5sZXQgZm4gPSB7XG4gIG1vZHVsZVJ1bjogZnVuY3Rpb24gKCRib2R5KSB7XG4gICAgbGV0IHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICBsZXQgcGlja2VyID0gbmV3IFBpY2tlcigpO1xuXG4gICAgLy8g64uo7J28IOuCoOynnCDrsJTsnbjrk5xcbiAgICBwaWNrZXIuYmluZCh7XG4gICAgICB6SW5kZXg6IDQwMDAsXG4gICAgICB0YXJnZXQ6ICQoJyNwaWNrZXItZGF0ZScpLFxuICAgICAgZGlyZWN0aW9uOiBcImF1dG9cIixcbiAgICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgdHlwZTogJ2RhdGUnLFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICBtb2RlOiBcInllYXJcIixcbiAgICAgICAgICBzZWxlY3RNb2RlOiBcIm1vbnRoXCJcbiAgICAgICAgfSxcbiAgICAgICAgZm9ybWF0dGVyOiB7XG4gICAgICAgICAgcGF0dGVybjogJ2RhdGUobW9udGgpJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgb25TdGF0ZUNoYW5nZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy52YWx1ZXMpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8g6riw6rCEIOuwlOyduOuTnFxuICAgIHBpY2tlci5iaW5kKHtcbiAgICAgIHpJbmRleDogNDAwMCxcbiAgICAgIHRhcmdldDogJCgnW2RhdGEtcGlja2VyPVwiZGF0ZS1zZVwiXScpLFxuICAgICAgY29udGVudDoge1xuICAgICAgICB3aWR0aDogMjcwLFxuICAgICAgICBtYXJnaW46IDEwLFxuICAgICAgICB0eXBlOiAnZGF0ZScsXG4gICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgIGNvbnRyb2w6IHtcbiAgICAgICAgICAgIGxlZnQ6ICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+a2V5Ym9hcmRfYXJyb3dfbGVmdDwvaT4nLFxuICAgICAgICAgICAgeWVhclRtcGw6ICclcycsXG4gICAgICAgICAgICBtb250aFRtcGw6ICclcycsXG4gICAgICAgICAgICByaWdodDogJzxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5rZXlib2FyZF9hcnJvd19yaWdodDwvaT4nLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgbGFuZzoge1xuICAgICAgICAgICAgeWVhclRtcGw6IFwiJXPrhYRcIixcbiAgICAgICAgICAgIG1vbnRoczogWycwMScsICcwMicsICcwMycsICcwNCcsICcwNScsICcwNicsICcwNycsICcwOCcsICcwOScsICcxMCcsICcxMScsICcxMiddLFxuICAgICAgICAgICAgZGF5VG1wbDogXCIlc1wiXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBmb3JtYXR0ZXI6IHtcbiAgICAgICAgICBwYXR0ZXJuOiAnZGF0ZSdcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGJ0bnM6IHtcbiAgICAgICAgdG9kYXk6IHtcbiAgICAgICAgICBsYWJlbDogXCLsmKTriphcIiwgdGhlbWU6IFwid2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0IGJ0biBibHVlLWdyZXlcIiwgb25DbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXRlbS5pbnB1dExlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICAgIHRoaXMuc2VsZi5zZXRDb250ZW50VmFsdWUodGhpcy5pdGVtLmlkLCAwLCB1dGlsLmRhdGUobmV3IERhdGUoKSwge1wicmV0dXJuXCI6IFwieXl5eS1NTS1kZFwifSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuc2VsZi5zZXRDb250ZW50VmFsdWUodGhpcy5pdGVtLmlkLCAwLCB1dGlsLmRhdGUobmV3IERhdGUoKSwge1wicmV0dXJuXCI6IFwieXl5eS1NTS1kZFwifSkpO1xuICAgICAgICAgICAgICB0aGlzLnNlbGYuc2V0Q29udGVudFZhbHVlKHRoaXMuaXRlbS5pZCwgMSwgdXRpbC5kYXRlKG5ldyBEYXRlKCksIHtcInJldHVyblwiOiBcInl5eXktTU0tZGRcIn0pKTtcbiAgICAgICAgICAgICAgdGhpcy5zZWxmLmNsb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB0aGlzTW9udGg6IHtcbiAgICAgICAgICBsYWJlbDogXCLsnbTrsojri6wgMeydvFwiLCB0aGVtZTogXCJ3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHQgYnRuIGJsdWUtZ3JleVwiLCBvbkNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgdG9kYXkgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXRlbS5pbnB1dExlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICAgIHRoaXMuc2VsZi5zZXRDb250ZW50VmFsdWUodGhpcy5pdGVtLmlkLCAwLCB1dGlsLmRhdGUodG9kYXksIHtcInJldHVyblwiOiBcInl5eXktTU0tMDFcIn0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLnNlbGYuc2V0Q29udGVudFZhbHVlKHRoaXMuaXRlbS5pZCwgMCwgdXRpbC5kYXRlKHRvZGF5LCB7XCJyZXR1cm5cIjogXCJ5eXl5LU1NLTAxXCJ9KSk7XG4gICAgICAgICAgICAgIHRoaXMuc2VsZi5zZXRDb250ZW50VmFsdWUodGhpcy5pdGVtLmlkLCAxLCB1dGlsLmRhdGUodG9kYXksIHtcInJldHVyblwiOiBcInl5eXktTU1cIn0pICsgJy0nICsgdXRpbC5kYXlzT2ZNb250aCh0b2RheS5nZXRGdWxsWWVhcigpLCB0b2RheS5nZXRNb250aCgpKSk7XG4gICAgICAgICAgICAgIHRoaXMuc2VsZi5jbG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb2s6IHtsYWJlbDogXCLtmZXsnbhcIiwgdGhlbWU6IFwid2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0IGJ0biBsaWdodC1ibHVlXCJ9XG4gICAgICB9LFxuICAgICAgb25TdGF0ZUNoYW5nZWQ6IGZ1bmN0aW9uIChhKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlID09IFwib3BlblwiKSB7XG4gICAgICAgICAgaWYgKHRoaXMuaXRlbSAmJiB0aGlzLml0ZW0uY2FsZW5kYXIpIHtcbiAgICAgICAgICAgIHRoaXMuaXRlbS5waWNrZXJDYWxlbmRhclswXS5jYWxlbmRhci5zZXRTZWxlY3Rpb24oW3V0aWwuZGF0ZSh0b2RheSwgeydhZGQnOiB7ZDogMH19KV0pO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXRlbS5waWNrZXJDYWxlbmRhclsxXSkgdGhpcy5pdGVtLnBpY2tlckNhbGVuZGFyWzFdLmNhbGVuZGFyLnNldFNlbGVjdGlvbihbdXRpbC5kYXRlKHRvZGF5LCB7J2FkZCc6IHtkOiAwfX0pXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGUgPT0gXCJjaGFuZ2VWYWx1ZVwiKSB7XG4gICAgICAgICAgaWYgKHRoaXMuaXRlbS5jb250ZW50LnR5cGUgPT0gXCJkYXRlXCIgJiYgdGhpcy52YWx1ZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaW5wdXRJbmRleCA9PSAwKSB7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIOuztOyViOuyiO2YuFxuICAgIHBpY2tlci5iaW5kKHtcbiAgICAgIHRhcmdldDogJCgnI3NlY3VyZS1udW0nKSxcbiAgICAgIGRpcmVjdGlvbjogXCJ0b3BcIixcbiAgICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgd2lkdGg6IDIwMCxcbiAgICAgICAgbWFyZ2luOiAxMCxcbiAgICAgICAgdHlwZTogJ3NlY3VyZS1udW0nLFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICBidG5XcmFwU3R5bGU6IFwicGFkZGluZzozcHg7d2lkdGg6MjUlO1wiLFxuICAgICAgICAgIGJ0blN0eWxlOiBcIndpZHRoOjEwMCVcIixcbiAgICAgICAgICBidG5UaGVtZTogXCJ3YXZlcy1lZmZlY3QgYnRuIGJsdWUtZ3JleVwiLFxuICAgICAgICAgIHNwZWNpYWxCdG5UaGVtZTogXCJ3YXZlcy1lZmZlY3QgYnRuIHBpbmtcIlxuICAgICAgICB9LFxuICAgICAgICBmb3JtYXR0ZXI6IHtcbiAgICAgICAgICBwYXR0ZXJuOiAnbnVtYmVyJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgYnRuczoge1xuICAgICAgICBvazoge2xhYmVsOiBcIu2ZleyduFwiLCB0aGVtZTogXCJ3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHQgYnRuIGxpZ2h0LWJsdWVcIn1cbiAgICAgIH0sXG4gICAgICBvblN0YXRlQ2hhbmdlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzKTtcbiAgICAgICAgaWYgKHRoaXMudmFsdWUgJiYgdGhpcy52YWx1ZS5sZW5ndGggPiAzKSB7XG4gICAgICAgICAgcGlja2VyLmNsb3NlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIO2CpOuztOuTnFxuICAgIHBpY2tlci5iaW5kKHtcbiAgICAgIHRhcmdldDogJCgnI2tleWJvYXJkLTAnKSxcbiAgICAgIGRpcmVjdGlvbjogXCJhdXRvXCIsXG4gICAgICBjb250ZW50OiB7XG4gICAgICAgIHdpZHRoOiA1NTAsXG4gICAgICAgIG1hcmdpbjogMTAsXG4gICAgICAgIHR5cGU6ICdrZXlib2FyZCcsXG4gICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgIGJ0bldyYXBTdHlsZTogXCJwYWRkaW5nOjJweDtcIixcbiAgICAgICAgICBidG5TdHlsZTogXCJ3aWR0aDogMzVweDtcIixcbiAgICAgICAgICBidG5UaGVtZTogXCJidG5cIixcbiAgICAgICAgICBzcGVjaWFsQnRuV3JhcFN0eWxlOiBcInBhZGRpbmc6MnB4O1wiLFxuICAgICAgICAgIHNwZWNpYWxCdG5TdHlsZTogXCJcIixcbiAgICAgICAgICBzcGVjaWFsQnRuVGhlbWU6IFwiYnRuIGJsdWUtZ3JleVwiXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBvblN0YXRlQ2hhbmdlZDogZnVuY3Rpb24gKCkge1xuXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyDsiKvsnpAg7YKk7Yyo65OcXG4gICAgcGlja2VyLmJpbmQoe1xuICAgICAgdGFyZ2V0OiAkKCcjbnVtcGFkLTAnKSxcbiAgICAgIGRpcmVjdGlvbjogXCJhdXRvXCIsXG4gICAgICBjb250ZW50OiB7XG4gICAgICAgIHdpZHRoOiAyMDAsXG4gICAgICAgIG1hcmdpbjogMTAsXG4gICAgICAgIHR5cGU6ICdudW1wYWQnLFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICBidG5XcmFwU3R5bGU6IFwicGFkZGluZzozcHg7d2lkdGg6MjUlO1wiLFxuICAgICAgICAgIGJ0blN0eWxlOiBcIndpZHRoOjEwMCVcIixcbiAgICAgICAgICBidG5UaGVtZTogXCJidG5cIixcbiAgICAgICAgICBzcGVjaWFsQnRuV3JhcFN0eWxlOiBcInBhZGRpbmc6M3B4O3dpZHRoOjI1JTtcIixcbiAgICAgICAgICBzcGVjaWFsQnRuU3R5bGU6IFwid2lkdGg6MTAwJTtwYWRkaW5nLWxlZnQ6MHB4O3BhZGRpbmctcmlnaHQ6MHB4O1wiLFxuICAgICAgICAgIHNwZWNpYWxCdG5UaGVtZTogXCJidG4gYmx1ZS1ncmV5XCJcbiAgICAgICAgICAvKlxuICAgICAgICAgICBrZXlBcnJheTogW1xuICAgICAgICAgICB7dmFsdWU6IFwiN1wifSxcbiAgICAgICAgICAge3ZhbHVlOiBcIjhcIn0sXG4gICAgICAgICAgIHt2YWx1ZTogXCI5XCJ9LFxuICAgICAgICAgICB7bGFiZWw6IFwiQlNcIiwgZm46IFwiYmFja1wifSxcbiAgICAgICAgICAge3ZhbHVlOiBcIjRcIn0sXG4gICAgICAgICAgIHt2YWx1ZTogXCI1XCJ9LFxuICAgICAgICAgICB7dmFsdWU6IFwiNlwifSxcbiAgICAgICAgICAge3ZhbHVlOiBcIi1cIn0sXG4gICAgICAgICAgIHt2YWx1ZTogXCIxXCJ9LFxuICAgICAgICAgICB7dmFsdWU6IFwiMlwifSxcbiAgICAgICAgICAge3ZhbHVlOiBcIjNcIn0sXG4gICAgICAgICAgIHt2YWx1ZTogXCJcIn0sXG4gICAgICAgICAgIHt2YWx1ZTogXCIuXCJ9LFxuICAgICAgICAgICB7dmFsdWU6IFwiMFwifSxcbiAgICAgICAgICAge3ZhbHVlOiBcIlwifSxcbiAgICAgICAgICAge2xhYmVsOiBcIk9LXCIsIGZuOiBcImNsb3NlXCJ9XG4gICAgICAgICAgIF1cbiAgICAgICAgICAgKi9cbiAgICAgICAgfSxcbiAgICAgICAgZm9ybWF0dGVyOiB7XG4gICAgICAgICAgcGF0dGVybjogJ251bWJlcidcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG9uU3RhdGVDaGFuZ2VkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8g7Luk7Iqk7YWAXG4gICAgcGlja2VyLmJpbmQoe1xuICAgICAgdGFyZ2V0OiAkKCcjY3VzdG9tLTAnKSxcbiAgICAgIGRpcmVjdGlvbjogXCJ0b3BcIixcbiAgICAgIGNvbnRlbnRXaWR0aDogMjAwLFxuICAgICAgY29udGVudDogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBodG1sID0gJydcbiAgICAgICAgICArICfqsIDrgpjri6Trnbzrp4jrsJTsgqwnXG4gICAgICAgICAgKyAnPGRpdiBzdHlsZT1cInBhZGRpbmc6IDEwcHg7XCI+J1xuICAgICAgICAgICsgJzxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIj7quLDriqUgMTwvYnV0dG9uPidcbiAgICAgICAgICArICc8L2Rpdj4nXG4gICAgICAgIDtcbiAgICAgICAgY2FsbGJhY2soaHRtbCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyDtjJTroJvtirhcbiAgICBwaWNrZXIuYmluZCh7XG4gICAgICB0YXJnZXQ6ICQoXCIjY29sb3ItMFwiKSxcbiAgICAgIGRpcmVjdGlvbjogXCJhdXRvXCIsXG4gICAgICBjb250ZW50OiB7XG4gICAgICAgIHdpZHRoOiAyNTAsXG4gICAgICAgIG1hcmdpbjogMTAsXG4gICAgICAgIHR5cGU6ICdjb2xvcicsXG4gICAgICAgIGNvbmZpZzoge31cbiAgICAgIH0sXG4gICAgICBvblN0YXRlQ2hhbmdlZDogZnVuY3Rpb24gKCkge1xuXG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG4gIG1vZHVsZURlc3Ryb3k6IGZ1bmN0aW9uICgkYm9keSkge1xuICAgICRib2R5Lm9mZihcImNsaWNrXCIpO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGh0bWw6IGh0bWwsXG4gIGZuOiBmblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BpY2tlci5qcyIsIi8qIVxuICogbXVzdGFjaGUuanMgLSBMb2dpYy1sZXNzIHt7bXVzdGFjaGV9fSB0ZW1wbGF0ZXMgd2l0aCBKYXZhU2NyaXB0XG4gKiBodHRwOi8vZ2l0aHViLmNvbS9qYW5sL211c3RhY2hlLmpzXG4gKiBodHRwczovL2dpdGh1Yi5jb20vdGhvbWFzSmFuZy9tdXN0YWNoZS5qcyAtLSBpbXBvcm92ZSBzb21lIHZhcmlhYmxlc1xuICovXG5cblxuLyoqXG4gKiBBWDZNdXN0YWNoZeuKlCBodHRwOi8vZ2l0aHViLmNvbS9qYW5sL211c3RhY2hlLmpz7JeQIOuqh+qwgOyngCDstZzshoztlZzsnZgg6riw64ql7J2EIO2KnOuLne2VmOyXrCDsgqzsmqntlZjripQg7YWc7ZSM66a/IOyXlOynhOyeheuLiOuLpC5cbiAqIEBuYW1lc3BhY2UgQVg2TXVzdGFjaGVcbiAqL1xuXG4vKipcbiAqIEBtZXRob2QgQVg2TXVzdGFjaGUucmVuZGVyXG4gKiBAZXhhbXBsZVxuICogYGBganNcbiAqIGF4NS5tdXN0YWNoZS5yZW5kZXIodGVtcGxhdGUsIHZpZXcpXG4gKlxuICpcbiAqIC8vQXJyYXkgQGlcbiAqIC8ve3sjYmVhdGxlc319XG4gKiAvL3t7Zmlyc3ROYW1lfX0ge3tsYXN0TmFtZX19ICh7e0BpfX0pICh7e0BmaXJzdH19KVxuICogLy97ey9iZWF0bGVzfX1cbiAqXG4gKiAvL09iamVjdCBAZWFjaFxuICoge3sjYmVhdGxlc319XG4gKiAge3sjQGVhY2h9fVxuICogICAgICB7e0BrZXl9fSA6IHt7QHZhbHVlLmZpcnN0TmFtZX19IHt7QHZhbHVlLmxhc3ROYW1lfX1cbiAqICB7ey9AZWFjaH19XG4gKiB7ey9iZWF0bGVzfX1cbiAqXG4gKiBgYGBcbiAqL1xuXG5cblxubGV0IEFYNiA9IHt9O1xuXG4oZnVuY3Rpb24gZGVmaW5lTXVzdGFjaGUoZ2xvYmFsLCBmYWN0b3J5KSB7XG5cbiAgZmFjdG9yeShnbG9iYWwubXVzdGFjaGUgPSB7fSk7XG5cbn0oQVg2LCBmdW5jdGlvbiBtdXN0YWNoZUZhY3RvcnkobXVzdGFjaGUpIHtcblxuICB2YXIgb2JqZWN0VG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuICB2YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gaXNBcnJheVBvbHlmaWxsKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3RUb1N0cmluZy5jYWxsKG9iamVjdCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gIH07XG5cbiAgZnVuY3Rpb24gaXNGdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gJ2Z1bmN0aW9uJztcbiAgfVxuXG4gIC8qKlxuICAgKiBNb3JlIGNvcnJlY3QgdHlwZW9mIHN0cmluZyBoYW5kbGluZyBhcnJheVxuICAgKiB3aGljaCBub3JtYWxseSByZXR1cm5zIHR5cGVvZiAnb2JqZWN0J1xuICAgKi9cbiAgZnVuY3Rpb24gdHlwZVN0cihvYmopIHtcbiAgICByZXR1cm4gaXNBcnJheShvYmopID8gJ2FycmF5JyA6IHR5cGVvZiBvYmo7XG4gIH1cblxuICBmdW5jdGlvbiBlc2NhcGVSZWdFeHAoc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC9bXFwtXFxbXFxde30oKSorPy4sXFxcXFxcXiR8I1xcc10vZywgJ1xcXFwkJicpO1xuICB9XG5cbiAgLyoqXG4gICAqIE51bGwgc2FmZSB3YXkgb2YgY2hlY2tpbmcgd2hldGhlciBvciBub3QgYW4gb2JqZWN0LFxuICAgKiBpbmNsdWRpbmcgaXRzIHByb3RvdHlwZSwgaGFzIGEgZ2l2ZW4gcHJvcGVydHlcbiAgICovXG4gIGZ1bmN0aW9uIGhhc1Byb3BlcnR5KG9iaiwgcHJvcE5hbWUpIHtcbiAgICByZXR1cm4gb2JqICE9IG51bGwgJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgKHByb3BOYW1lIGluIG9iaik7XG4gIH1cblxuICAvLyBXb3JrYXJvdW5kIGZvciBodHRwczovL2lzc3Vlcy5hcGFjaGUub3JnL2ppcmEvYnJvd3NlL0NPVUNIREItNTc3XG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vamFubC9tdXN0YWNoZS5qcy9pc3N1ZXMvMTg5XG4gIHZhciByZWdFeHBUZXN0ID0gUmVnRXhwLnByb3RvdHlwZS50ZXN0O1xuXG4gIGZ1bmN0aW9uIHRlc3RSZWdFeHAocmUsIHN0cmluZykge1xuICAgIHJldHVybiByZWdFeHBUZXN0LmNhbGwocmUsIHN0cmluZyk7XG4gIH1cblxuICB2YXIgbm9uU3BhY2VSZSA9IC9cXFMvO1xuXG4gIGZ1bmN0aW9uIGlzV2hpdGVzcGFjZShzdHJpbmcpIHtcbiAgICByZXR1cm4gIXRlc3RSZWdFeHAobm9uU3BhY2VSZSwgc3RyaW5nKTtcbiAgfVxuXG4gIHZhciBlbnRpdHlNYXAgPSB7XG4gICAgJyYnOiAnJmFtcDsnLCAnPCc6ICcmbHQ7JywgJz4nOiAnJmd0OycsICdcIic6ICcmcXVvdDsnLCBcIidcIjogJyYjMzk7JywgJy8nOiAnJiN4MkY7J1xuICB9O1xuXG4gIGZ1bmN0aW9uIGVzY2FwZUh0bWwoc3RyaW5nKSB7XG4gICAgcmV0dXJuIFN0cmluZyhzdHJpbmcpLnJlcGxhY2UoL1smPD5cIidcXC9dL2csIGZ1bmN0aW9uIGZyb21FbnRpdHlNYXAocykge1xuICAgICAgcmV0dXJuIGVudGl0eU1hcFtzXTtcbiAgICB9KTtcbiAgfVxuXG4gIHZhciB3aGl0ZVJlID0gL1xccyovO1xuICB2YXIgc3BhY2VSZSA9IC9cXHMrLztcbiAgdmFyIGVxdWFsc1JlID0gL1xccyo9LztcbiAgdmFyIGN1cmx5UmUgPSAvXFxzKlxcfS87XG4gIHZhciB0YWdSZSA9IC8jfFxcXnxcXC98PnxcXHt8Jnw9fCEvO1xuXG4gIC8qKlxuICAgKiBCcmVha3MgdXAgdGhlIGdpdmVuIGB0ZW1wbGF0ZWAgc3RyaW5nIGludG8gYSB0cmVlIG9mIHRva2Vucy4gSWYgdGhlIGB0YWdzYFxuICAgKiBhcmd1bWVudCBpcyBnaXZlbiBoZXJlIGl0IG11c3QgYmUgYW4gYXJyYXkgd2l0aCB0d28gc3RyaW5nIHZhbHVlczogdGhlXG4gICAqIG9wZW5pbmcgYW5kIGNsb3NpbmcgdGFncyB1c2VkIGluIHRoZSB0ZW1wbGF0ZSAoZS5nLiBbIFwiPCVcIiwgXCIlPlwiIF0pLiBPZlxuICAgKiBjb3Vyc2UsIHRoZSBkZWZhdWx0IGlzIHRvIHVzZSBtdXN0YWNoZXMgKGkuZS4gbXVzdGFjaGUudGFncykuXG4gICAqXG4gICAqIEEgdG9rZW4gaXMgYW4gYXJyYXkgd2l0aCBhdCBsZWFzdCA0IGVsZW1lbnRzLiBUaGUgZmlyc3QgZWxlbWVudCBpcyB0aGVcbiAgICogbXVzdGFjaGUgc3ltYm9sIHRoYXQgd2FzIHVzZWQgaW5zaWRlIHRoZSB0YWcsIGUuZy4gXCIjXCIgb3IgXCImXCIuIElmIHRoZSB0YWdcbiAgICogZGlkIG5vdCBjb250YWluIGEgc3ltYm9sIChpLmUuIHt7bXlWYWx1ZX19KSB0aGlzIGVsZW1lbnQgaXMgXCJuYW1lXCIuIEZvclxuICAgKiBhbGwgdGV4dCB0aGF0IGFwcGVhcnMgb3V0c2lkZSBhIHN5bWJvbCB0aGlzIGVsZW1lbnQgaXMgXCJ0ZXh0XCIuXG4gICAqXG4gICAqIFRoZSBzZWNvbmQgZWxlbWVudCBvZiBhIHRva2VuIGlzIGl0cyBcInZhbHVlXCIuIEZvciBtdXN0YWNoZSB0YWdzIHRoaXMgaXNcbiAgICogd2hhdGV2ZXIgZWxzZSB3YXMgaW5zaWRlIHRoZSB0YWcgYmVzaWRlcyB0aGUgb3BlbmluZyBzeW1ib2wuIEZvciB0ZXh0IHRva2Vuc1xuICAgKiB0aGlzIGlzIHRoZSB0ZXh0IGl0c2VsZi5cbiAgICpcbiAgICogVGhlIHRoaXJkIGFuZCBmb3VydGggZWxlbWVudHMgb2YgdGhlIHRva2VuIGFyZSB0aGUgc3RhcnQgYW5kIGVuZCBpbmRpY2VzLFxuICAgKiByZXNwZWN0aXZlbHksIG9mIHRoZSB0b2tlbiBpbiB0aGUgb3JpZ2luYWwgdGVtcGxhdGUuXG4gICAqXG4gICAqIFRva2VucyB0aGF0IGFyZSB0aGUgcm9vdCBub2RlIG9mIGEgc3VidHJlZSBjb250YWluIHR3byBtb3JlIGVsZW1lbnRzOiAxKSBhblxuICAgKiBhcnJheSBvZiB0b2tlbnMgaW4gdGhlIHN1YnRyZWUgYW5kIDIpIHRoZSBpbmRleCBpbiB0aGUgb3JpZ2luYWwgdGVtcGxhdGUgYXRcbiAgICogd2hpY2ggdGhlIGNsb3NpbmcgdGFnIGZvciB0aGF0IHNlY3Rpb24gYmVnaW5zLlxuICAgKi9cbiAgZnVuY3Rpb24gcGFyc2VUZW1wbGF0ZSh0ZW1wbGF0ZSwgdGFncykge1xuICAgIGlmICghdGVtcGxhdGUpXG4gICAgICByZXR1cm4gW107XG5cbiAgICB2YXIgc2VjdGlvbnMgPSBbXTsgICAgIC8vIFN0YWNrIHRvIGhvbGQgc2VjdGlvbiB0b2tlbnNcbiAgICB2YXIgdG9rZW5zID0gW107ICAgICAgIC8vIEJ1ZmZlciB0byBob2xkIHRoZSB0b2tlbnNcbiAgICB2YXIgc3BhY2VzID0gW107ICAgICAgIC8vIEluZGljZXMgb2Ygd2hpdGVzcGFjZSB0b2tlbnMgb24gdGhlIGN1cnJlbnQgbGluZVxuICAgIHZhciBoYXNUYWcgPSBmYWxzZTsgICAgLy8gSXMgdGhlcmUgYSB7e3RhZ319IG9uIHRoZSBjdXJyZW50IGxpbmU/XG4gICAgdmFyIG5vblNwYWNlID0gZmFsc2U7ICAvLyBJcyB0aGVyZSBhIG5vbi1zcGFjZSBjaGFyIG9uIHRoZSBjdXJyZW50IGxpbmU/XG5cbiAgICAvLyBTdHJpcHMgYWxsIHdoaXRlc3BhY2UgdG9rZW5zIGFycmF5IGZvciB0aGUgY3VycmVudCBsaW5lXG4gICAgLy8gaWYgdGhlcmUgd2FzIGEge3sjdGFnfX0gb24gaXQgYW5kIG90aGVyd2lzZSBvbmx5IHNwYWNlLlxuICAgIGZ1bmN0aW9uIHN0cmlwU3BhY2UoKSB7XG4gICAgICBpZiAoaGFzVGFnICYmICFub25TcGFjZSkge1xuICAgICAgICB3aGlsZSAoc3BhY2VzLmxlbmd0aClcbiAgICAgICAgICBkZWxldGUgdG9rZW5zW3NwYWNlcy5wb3AoKV07XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgc3BhY2VzID0gW107XG4gICAgICB9XG5cbiAgICAgIGhhc1RhZyA9IGZhbHNlO1xuICAgICAgbm9uU3BhY2UgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgb3BlbmluZ1RhZ1JlLCBjbG9zaW5nVGFnUmUsIGNsb3NpbmdDdXJseVJlO1xuXG4gICAgZnVuY3Rpb24gY29tcGlsZVRhZ3ModGFnc1RvQ29tcGlsZSkge1xuICAgICAgaWYgKHR5cGVvZiB0YWdzVG9Db21waWxlID09PSAnc3RyaW5nJylcbiAgICAgICAgdGFnc1RvQ29tcGlsZSA9IHRhZ3NUb0NvbXBpbGUuc3BsaXQoc3BhY2VSZSwgMik7XG5cbiAgICAgIGlmICghaXNBcnJheSh0YWdzVG9Db21waWxlKSB8fCB0YWdzVG9Db21waWxlLmxlbmd0aCAhPT0gMilcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHRhZ3M6ICcgKyB0YWdzVG9Db21waWxlKTtcblxuICAgICAgb3BlbmluZ1RhZ1JlID0gbmV3IFJlZ0V4cChlc2NhcGVSZWdFeHAodGFnc1RvQ29tcGlsZVswXSkgKyAnXFxcXHMqJyk7XG4gICAgICBjbG9zaW5nVGFnUmUgPSBuZXcgUmVnRXhwKCdcXFxccyonICsgZXNjYXBlUmVnRXhwKHRhZ3NUb0NvbXBpbGVbMV0pKTtcbiAgICAgIGNsb3NpbmdDdXJseVJlID0gbmV3IFJlZ0V4cCgnXFxcXHMqJyArIGVzY2FwZVJlZ0V4cCgnfScgKyB0YWdzVG9Db21waWxlWzFdKSk7XG4gICAgfVxuXG4gICAgY29tcGlsZVRhZ3ModGFncyB8fCBtdXN0YWNoZS50YWdzKTtcblxuICAgIHZhciBzY2FubmVyID0gbmV3IFNjYW5uZXIodGVtcGxhdGUpO1xuXG4gICAgdmFyIHN0YXJ0LCB0eXBlLCB2YWx1ZSwgY2hyLCB0b2tlbiwgb3BlblNlY3Rpb247XG4gICAgd2hpbGUgKCFzY2FubmVyLmVvcygpKSB7XG4gICAgICBzdGFydCA9IHNjYW5uZXIucG9zO1xuXG4gICAgICAvLyBNYXRjaCBhbnkgdGV4dCBiZXR3ZWVuIHRhZ3MuXG4gICAgICB2YWx1ZSA9IHNjYW5uZXIuc2NhblVudGlsKG9wZW5pbmdUYWdSZSk7XG5cbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgdmFsdWVMZW5ndGggPSB2YWx1ZS5sZW5ndGg7IGkgPCB2YWx1ZUxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgY2hyID0gdmFsdWUuY2hhckF0KGkpO1xuXG4gICAgICAgICAgaWYgKGlzV2hpdGVzcGFjZShjaHIpKSB7XG4gICAgICAgICAgICBzcGFjZXMucHVzaCh0b2tlbnMubGVuZ3RoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBub25TcGFjZSA9IHRydWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdG9rZW5zLnB1c2goWyd0ZXh0JywgY2hyLCBzdGFydCwgc3RhcnQgKyAxXSk7XG4gICAgICAgICAgc3RhcnQgKz0gMTtcblxuICAgICAgICAgIC8vIENoZWNrIGZvciB3aGl0ZXNwYWNlIG9uIHRoZSBjdXJyZW50IGxpbmUuXG4gICAgICAgICAgaWYgKGNociA9PT0gJ1xcbicpXG4gICAgICAgICAgICBzdHJpcFNwYWNlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gTWF0Y2ggdGhlIG9wZW5pbmcgdGFnLlxuICAgICAgaWYgKCFzY2FubmVyLnNjYW4ob3BlbmluZ1RhZ1JlKSlcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGhhc1RhZyA9IHRydWU7XG5cbiAgICAgIC8vIEdldCB0aGUgdGFnIHR5cGUuXG4gICAgICB0eXBlID0gc2Nhbm5lci5zY2FuKHRhZ1JlKSB8fCAnbmFtZSc7XG4gICAgICBzY2FubmVyLnNjYW4od2hpdGVSZSk7XG5cbiAgICAgIC8vIEdldCB0aGUgdGFnIHZhbHVlLlxuICAgICAgaWYgKHR5cGUgPT09ICc9Jykge1xuICAgICAgICB2YWx1ZSA9IHNjYW5uZXIuc2NhblVudGlsKGVxdWFsc1JlKTtcbiAgICAgICAgc2Nhbm5lci5zY2FuKGVxdWFsc1JlKTtcbiAgICAgICAgc2Nhbm5lci5zY2FuVW50aWwoY2xvc2luZ1RhZ1JlKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICd7Jykge1xuICAgICAgICB2YWx1ZSA9IHNjYW5uZXIuc2NhblVudGlsKGNsb3NpbmdDdXJseVJlKTtcbiAgICAgICAgc2Nhbm5lci5zY2FuKGN1cmx5UmUpO1xuICAgICAgICBzY2FubmVyLnNjYW5VbnRpbChjbG9zaW5nVGFnUmUpO1xuICAgICAgICB0eXBlID0gJyYnO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHZhbHVlID0gc2Nhbm5lci5zY2FuVW50aWwoY2xvc2luZ1RhZ1JlKTtcbiAgICAgIH1cblxuICAgICAgLy8gTWF0Y2ggdGhlIGNsb3NpbmcgdGFnLlxuICAgICAgaWYgKCFzY2FubmVyLnNjYW4oY2xvc2luZ1RhZ1JlKSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmNsb3NlZCB0YWcgYXQgJyArIHNjYW5uZXIucG9zKTtcblxuICAgICAgdG9rZW4gPSBbdHlwZSwgdmFsdWUsIHN0YXJ0LCBzY2FubmVyLnBvc107XG4gICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG5cbiAgICAgIGlmICh0eXBlID09PSAnIycgfHwgdHlwZSA9PT0gJ14nKSB7XG4gICAgICAgIHNlY3Rpb25zLnB1c2godG9rZW4pO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJy8nKSB7XG4gICAgICAgIC8vIENoZWNrIHNlY3Rpb24gbmVzdGluZy5cbiAgICAgICAgb3BlblNlY3Rpb24gPSBzZWN0aW9ucy5wb3AoKTtcblxuICAgICAgICBpZiAoIW9wZW5TZWN0aW9uKVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5vcGVuZWQgc2VjdGlvbiBcIicgKyB2YWx1ZSArICdcIiBhdCAnICsgc3RhcnQpO1xuXG4gICAgICAgIGlmIChvcGVuU2VjdGlvblsxXSAhPT0gdmFsdWUpXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmNsb3NlZCBzZWN0aW9uIFwiJyArIG9wZW5TZWN0aW9uWzFdICsgJ1wiIGF0ICcgKyBzdGFydCk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0eXBlID09PSAnbmFtZScgfHwgdHlwZSA9PT0gJ3snIHx8IHR5cGUgPT09ICcmJykge1xuICAgICAgICBub25TcGFjZSA9IHRydWU7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0eXBlID09PSAnPScpIHtcbiAgICAgICAgLy8gU2V0IHRoZSB0YWdzIGZvciB0aGUgbmV4dCB0aW1lIGFyb3VuZC5cbiAgICAgICAgY29tcGlsZVRhZ3ModmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIE1ha2Ugc3VyZSB0aGVyZSBhcmUgbm8gb3BlbiBzZWN0aW9ucyB3aGVuIHdlJ3JlIGRvbmUuXG4gICAgb3BlblNlY3Rpb24gPSBzZWN0aW9ucy5wb3AoKTtcblxuICAgIGlmIChvcGVuU2VjdGlvbilcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5jbG9zZWQgc2VjdGlvbiBcIicgKyBvcGVuU2VjdGlvblsxXSArICdcIiBhdCAnICsgc2Nhbm5lci5wb3MpO1xuXG4gICAgcmV0dXJuIG5lc3RUb2tlbnMoc3F1YXNoVG9rZW5zKHRva2VucykpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbWJpbmVzIHRoZSB2YWx1ZXMgb2YgY29uc2VjdXRpdmUgdGV4dCB0b2tlbnMgaW4gdGhlIGdpdmVuIGB0b2tlbnNgIGFycmF5XG4gICAqIHRvIGEgc2luZ2xlIHRva2VuLlxuICAgKi9cbiAgZnVuY3Rpb24gc3F1YXNoVG9rZW5zKHRva2Vucykge1xuICAgIHZhciBzcXVhc2hlZFRva2VucyA9IFtdO1xuXG4gICAgdmFyIHRva2VuLCBsYXN0VG9rZW47XG4gICAgZm9yICh2YXIgaSA9IDAsIG51bVRva2VucyA9IHRva2Vucy5sZW5ndGg7IGkgPCBudW1Ub2tlbnM7ICsraSkge1xuICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XG5cbiAgICAgIGlmICh0b2tlbikge1xuICAgICAgICBpZiAodG9rZW5bMF0gPT09ICd0ZXh0JyAmJiBsYXN0VG9rZW4gJiYgbGFzdFRva2VuWzBdID09PSAndGV4dCcpIHtcbiAgICAgICAgICBsYXN0VG9rZW5bMV0gKz0gdG9rZW5bMV07XG4gICAgICAgICAgbGFzdFRva2VuWzNdID0gdG9rZW5bM107XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgc3F1YXNoZWRUb2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgICAgbGFzdFRva2VuID0gdG9rZW47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3F1YXNoZWRUb2tlbnM7XG4gIH1cblxuICAvKipcbiAgICogRm9ybXMgdGhlIGdpdmVuIGFycmF5IG9mIGB0b2tlbnNgIGludG8gYSBuZXN0ZWQgdHJlZSBzdHJ1Y3R1cmUgd2hlcmVcbiAgICogdG9rZW5zIHRoYXQgcmVwcmVzZW50IGEgc2VjdGlvbiBoYXZlIHR3byBhZGRpdGlvbmFsIGl0ZW1zOiAxKSBhbiBhcnJheSBvZlxuICAgKiBhbGwgdG9rZW5zIHRoYXQgYXBwZWFyIGluIHRoYXQgc2VjdGlvbiBhbmQgMikgdGhlIGluZGV4IGluIHRoZSBvcmlnaW5hbFxuICAgKiB0ZW1wbGF0ZSB0aGF0IHJlcHJlc2VudHMgdGhlIGVuZCBvZiB0aGF0IHNlY3Rpb24uXG4gICAqL1xuICBmdW5jdGlvbiBuZXN0VG9rZW5zKHRva2Vucykge1xuICAgIHZhciBuZXN0ZWRUb2tlbnMgPSBbXTtcbiAgICB2YXIgY29sbGVjdG9yID0gbmVzdGVkVG9rZW5zO1xuICAgIHZhciBzZWN0aW9ucyA9IFtdO1xuXG4gICAgdmFyIHRva2VuLCBzZWN0aW9uO1xuICAgIGZvciAodmFyIGkgPSAwLCBudW1Ub2tlbnMgPSB0b2tlbnMubGVuZ3RoOyBpIDwgbnVtVG9rZW5zOyArK2kpIHtcbiAgICAgIHRva2VuID0gdG9rZW5zW2ldO1xuXG4gICAgICBzd2l0Y2ggKHRva2VuWzBdKSB7XG4gICAgICAgIGNhc2UgJyMnOlxuICAgICAgICBjYXNlICdeJzpcbiAgICAgICAgICBjb2xsZWN0b3IucHVzaCh0b2tlbik7XG4gICAgICAgICAgc2VjdGlvbnMucHVzaCh0b2tlbik7XG4gICAgICAgICAgY29sbGVjdG9yID0gdG9rZW5bNF0gPSBbXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnLyc6XG4gICAgICAgICAgc2VjdGlvbiA9IHNlY3Rpb25zLnBvcCgpO1xuICAgICAgICAgIHNlY3Rpb25bNV0gPSB0b2tlblsyXTtcbiAgICAgICAgICBjb2xsZWN0b3IgPSBzZWN0aW9ucy5sZW5ndGggPiAwID8gc2VjdGlvbnNbc2VjdGlvbnMubGVuZ3RoIC0gMV1bNF0gOiBuZXN0ZWRUb2tlbnM7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgY29sbGVjdG9yLnB1c2godG9rZW4pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBuZXN0ZWRUb2tlbnM7XG4gIH1cblxuICAvKipcbiAgICogQSBzaW1wbGUgc3RyaW5nIHNjYW5uZXIgdGhhdCBpcyB1c2VkIGJ5IHRoZSB0ZW1wbGF0ZSBwYXJzZXIgdG8gZmluZFxuICAgKiB0b2tlbnMgaW4gdGVtcGxhdGUgc3RyaW5ncy5cbiAgICovXG4gIGZ1bmN0aW9uIFNjYW5uZXIoc3RyaW5nKSB7XG4gICAgdGhpcy5zdHJpbmcgPSBzdHJpbmc7XG4gICAgdGhpcy50YWlsID0gc3RyaW5nO1xuICAgIHRoaXMucG9zID0gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdGFpbCBpcyBlbXB0eSAoZW5kIG9mIHN0cmluZykuXG4gICAqL1xuICBTY2FubmVyLnByb3RvdHlwZS5lb3MgPSBmdW5jdGlvbiBlb3MoKSB7XG4gICAgcmV0dXJuIHRoaXMudGFpbCA9PT0gJyc7XG4gIH07XG5cbiAgLyoqXG4gICAqIFRyaWVzIHRvIG1hdGNoIHRoZSBnaXZlbiByZWd1bGFyIGV4cHJlc3Npb24gYXQgdGhlIGN1cnJlbnQgcG9zaXRpb24uXG4gICAqIFJldHVybnMgdGhlIG1hdGNoZWQgdGV4dCBpZiBpdCBjYW4gbWF0Y2gsIHRoZSBlbXB0eSBzdHJpbmcgb3RoZXJ3aXNlLlxuICAgKi9cbiAgU2Nhbm5lci5wcm90b3R5cGUuc2NhbiA9IGZ1bmN0aW9uIHNjYW4ocmUpIHtcbiAgICB2YXIgbWF0Y2ggPSB0aGlzLnRhaWwubWF0Y2gocmUpO1xuXG4gICAgaWYgKCFtYXRjaCB8fCBtYXRjaC5pbmRleCAhPT0gMClcbiAgICAgIHJldHVybiAnJztcblxuICAgIHZhciBzdHJpbmcgPSBtYXRjaFswXTtcblxuICAgIHRoaXMudGFpbCA9IHRoaXMudGFpbC5zdWJzdHJpbmcoc3RyaW5nLmxlbmd0aCk7XG4gICAgdGhpcy5wb3MgKz0gc3RyaW5nLmxlbmd0aDtcblxuICAgIHJldHVybiBzdHJpbmc7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNraXBzIGFsbCB0ZXh0IHVudGlsIHRoZSBnaXZlbiByZWd1bGFyIGV4cHJlc3Npb24gY2FuIGJlIG1hdGNoZWQuIFJldHVybnNcbiAgICogdGhlIHNraXBwZWQgc3RyaW5nLCB3aGljaCBpcyB0aGUgZW50aXJlIHRhaWwgaWYgbm8gbWF0Y2ggY2FuIGJlIG1hZGUuXG4gICAqL1xuICBTY2FubmVyLnByb3RvdHlwZS5zY2FuVW50aWwgPSBmdW5jdGlvbiBzY2FuVW50aWwocmUpIHtcbiAgICB2YXIgaW5kZXggPSB0aGlzLnRhaWwuc2VhcmNoKHJlKSwgbWF0Y2g7XG5cbiAgICBzd2l0Y2ggKGluZGV4KSB7XG4gICAgICBjYXNlIC0xOlxuICAgICAgICBtYXRjaCA9IHRoaXMudGFpbDtcbiAgICAgICAgdGhpcy50YWlsID0gJyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAwOlxuICAgICAgICBtYXRjaCA9ICcnO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIG1hdGNoID0gdGhpcy50YWlsLnN1YnN0cmluZygwLCBpbmRleCk7XG4gICAgICAgIHRoaXMudGFpbCA9IHRoaXMudGFpbC5zdWJzdHJpbmcoaW5kZXgpO1xuICAgIH1cblxuICAgIHRoaXMucG9zICs9IG1hdGNoLmxlbmd0aDtcblxuICAgIHJldHVybiBtYXRjaDtcbiAgfTtcblxuICAvKipcbiAgICogUmVwcmVzZW50cyBhIHJlbmRlcmluZyBjb250ZXh0IGJ5IHdyYXBwaW5nIGEgdmlldyBvYmplY3QgYW5kXG4gICAqIG1haW50YWluaW5nIGEgcmVmZXJlbmNlIHRvIHRoZSBwYXJlbnQgY29udGV4dC5cbiAgICovXG4gIGZ1bmN0aW9uIENvbnRleHQodmlldywgcGFyZW50Q29udGV4dCkge1xuICAgIHRoaXMudmlldyA9IHZpZXc7XG4gICAgdGhpcy5jYWNoZSA9IHtcbiAgICAgICcuJzogdGhpcy52aWV3LFxuICAgICAgJ0BlYWNoJzogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcmV0dXJucyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBrIGluIHRoaXMpIHtcbiAgICAgICAgICByZXR1cm5zLnB1c2goeydAa2V5JzogaywgJ0B2YWx1ZSc6IHRoaXNba119KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0dXJucztcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMucGFyZW50ID0gcGFyZW50Q29udGV4dDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGNvbnRleHQgdXNpbmcgdGhlIGdpdmVuIHZpZXcgd2l0aCB0aGlzIGNvbnRleHRcbiAgICogYXMgdGhlIHBhcmVudC5cbiAgICovXG4gIENvbnRleHQucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiBwdXNoKHZpZXcpIHtcbiAgICByZXR1cm4gbmV3IENvbnRleHQodmlldywgdGhpcyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHZhbHVlIG9mIHRoZSBnaXZlbiBuYW1lIGluIHRoaXMgY29udGV4dCwgdHJhdmVyc2luZ1xuICAgKiB1cCB0aGUgY29udGV4dCBoaWVyYXJjaHkgaWYgdGhlIHZhbHVlIGlzIGFic2VudCBpbiB0aGlzIGNvbnRleHQncyB2aWV3LlxuICAgKi9cbiAgQ29udGV4dC5wcm90b3R5cGUubG9va3VwID0gZnVuY3Rpb24gbG9va3VwKG5hbWUpIHtcbiAgICB2YXIgY2FjaGUgPSB0aGlzLmNhY2hlO1xuXG4gICAgdmFyIHZhbHVlO1xuICAgIGlmIChjYWNoZS5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgdmFsdWUgPSBjYWNoZVtuYW1lXTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YXIgY29udGV4dCA9IHRoaXMsIG5hbWVzLCBpbmRleCwgbG9va3VwSGl0ID0gZmFsc2U7XG5cbiAgICAgIHdoaWxlIChjb250ZXh0KSB7XG4gICAgICAgIGlmIChuYW1lLmluZGV4T2YoJy4nKSA+IDApIHtcbiAgICAgICAgICB2YWx1ZSA9IGNvbnRleHQudmlldztcbiAgICAgICAgICBuYW1lcyA9IG5hbWUuc3BsaXQoJy4nKTtcbiAgICAgICAgICBpbmRleCA9IDA7XG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBVc2luZyB0aGUgZG90IG5vdGlvbiBwYXRoIGluIGBuYW1lYCwgd2UgZGVzY2VuZCB0aHJvdWdoIHRoZVxuICAgICAgICAgICAqIG5lc3RlZCBvYmplY3RzLlxuICAgICAgICAgICAqXG4gICAgICAgICAgICogVG8gYmUgY2VydGFpbiB0aGF0IHRoZSBsb29rdXAgaGFzIGJlZW4gc3VjY2Vzc2Z1bCwgd2UgaGF2ZSB0b1xuICAgICAgICAgICAqIGNoZWNrIGlmIHRoZSBsYXN0IG9iamVjdCBpbiB0aGUgcGF0aCBhY3R1YWxseSBoYXMgdGhlIHByb3BlcnR5XG4gICAgICAgICAgICogd2UgYXJlIGxvb2tpbmcgZm9yLiBXZSBzdG9yZSB0aGUgcmVzdWx0IGluIGBsb29rdXBIaXRgLlxuICAgICAgICAgICAqXG4gICAgICAgICAgICogVGhpcyBpcyBzcGVjaWFsbHkgbmVjZXNzYXJ5IGZvciB3aGVuIHRoZSB2YWx1ZSBoYXMgYmVlbiBzZXQgdG9cbiAgICAgICAgICAgKiBgdW5kZWZpbmVkYCBhbmQgd2Ugd2FudCB0byBhdm9pZCBsb29raW5nIHVwIHBhcmVudCBjb250ZXh0cy5cbiAgICAgICAgICAgKiovXG4gICAgICAgICAgd2hpbGUgKHZhbHVlICE9IG51bGwgJiYgaW5kZXggPCBuYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gbmFtZXMubGVuZ3RoIC0gMSlcbiAgICAgICAgICAgICAgbG9va3VwSGl0ID0gaGFzUHJvcGVydHkodmFsdWUsIG5hbWVzW2luZGV4XSk7XG5cbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWVbbmFtZXNbaW5kZXgrK11dO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB2YWx1ZSA9IGNvbnRleHQudmlld1tuYW1lXTtcbiAgICAgICAgICBsb29rdXBIaXQgPSBoYXNQcm9wZXJ0eShjb250ZXh0LnZpZXcsIG5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxvb2t1cEhpdClcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjb250ZXh0ID0gY29udGV4dC5wYXJlbnQ7XG4gICAgICB9XG5cbiAgICAgIGNhY2hlW25hbWVdID0gdmFsdWU7XG4gICAgfVxuXG4gICAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKVxuICAgICAgdmFsdWUgPSB2YWx1ZS5jYWxsKHRoaXMudmlldyk7XG5cbiAgICByZXR1cm4gdmFsdWU7XG4gIH07XG5cbiAgLyoqXG4gICAqIEEgV3JpdGVyIGtub3dzIGhvdyB0byB0YWtlIGEgc3RyZWFtIG9mIHRva2VucyBhbmQgcmVuZGVyIHRoZW0gdG8gYVxuICAgKiBzdHJpbmcsIGdpdmVuIGEgY29udGV4dC4gSXQgYWxzbyBtYWludGFpbnMgYSBjYWNoZSBvZiB0ZW1wbGF0ZXMgdG9cbiAgICogYXZvaWQgdGhlIG5lZWQgdG8gcGFyc2UgdGhlIHNhbWUgdGVtcGxhdGUgdHdpY2UuXG4gICAqL1xuICBmdW5jdGlvbiBXcml0ZXIoKSB7XG4gICAgdGhpcy5jYWNoZSA9IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFycyBhbGwgY2FjaGVkIHRlbXBsYXRlcyBpbiB0aGlzIHdyaXRlci5cbiAgICovXG4gIFdyaXRlci5wcm90b3R5cGUuY2xlYXJDYWNoZSA9IGZ1bmN0aW9uIGNsZWFyQ2FjaGUoKSB7XG4gICAgdGhpcy5jYWNoZSA9IHt9O1xuICB9O1xuXG4gIC8qKlxuICAgKiBQYXJzZXMgYW5kIGNhY2hlcyB0aGUgZ2l2ZW4gYHRlbXBsYXRlYCBhbmQgcmV0dXJucyB0aGUgYXJyYXkgb2YgdG9rZW5zXG4gICAqIHRoYXQgaXMgZ2VuZXJhdGVkIGZyb20gdGhlIHBhcnNlLlxuICAgKi9cbiAgV3JpdGVyLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uIHBhcnNlKHRlbXBsYXRlLCB0YWdzKSB7XG4gICAgdmFyIGNhY2hlID0gdGhpcy5jYWNoZTtcbiAgICB2YXIgdG9rZW5zID0gY2FjaGVbdGVtcGxhdGVdO1xuXG4gICAgaWYgKHRva2VucyA9PSBudWxsKVxuICAgICAgdG9rZW5zID0gY2FjaGVbdGVtcGxhdGVdID0gcGFyc2VUZW1wbGF0ZSh0ZW1wbGF0ZSwgdGFncyk7XG5cbiAgICByZXR1cm4gdG9rZW5zO1xuICB9O1xuXG4gIC8qKlxuICAgKiBIaWdoLWxldmVsIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gcmVuZGVyIHRoZSBnaXZlbiBgdGVtcGxhdGVgIHdpdGhcbiAgICogdGhlIGdpdmVuIGB2aWV3YC5cbiAgICpcbiAgICogVGhlIG9wdGlvbmFsIGBwYXJ0aWFsc2AgYXJndW1lbnQgbWF5IGJlIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIHRoZVxuICAgKiBuYW1lcyBhbmQgdGVtcGxhdGVzIG9mIHBhcnRpYWxzIHRoYXQgYXJlIHVzZWQgaW4gdGhlIHRlbXBsYXRlLiBJdCBtYXlcbiAgICogYWxzbyBiZSBhIGZ1bmN0aW9uIHRoYXQgaXMgdXNlZCB0byBsb2FkIHBhcnRpYWwgdGVtcGxhdGVzIG9uIHRoZSBmbHlcbiAgICogdGhhdCB0YWtlcyBhIHNpbmdsZSBhcmd1bWVudDogdGhlIG5hbWUgb2YgdGhlIHBhcnRpYWwuXG4gICAqL1xuICBXcml0ZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcih0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMpIHtcbiAgICB2YXIgdG9rZW5zID0gdGhpcy5wYXJzZSh0ZW1wbGF0ZSk7XG4gICAgdmFyIGNvbnRleHQgPSAodmlldyBpbnN0YW5jZW9mIENvbnRleHQpID8gdmlldyA6IG5ldyBDb250ZXh0KHZpZXcpO1xuICAgIHJldHVybiB0aGlzLnJlbmRlclRva2Vucyh0b2tlbnMsIGNvbnRleHQsIHBhcnRpYWxzLCB0ZW1wbGF0ZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIExvdy1sZXZlbCBtZXRob2QgdGhhdCByZW5kZXJzIHRoZSBnaXZlbiBhcnJheSBvZiBgdG9rZW5zYCB1c2luZ1xuICAgKiB0aGUgZ2l2ZW4gYGNvbnRleHRgIGFuZCBgcGFydGlhbHNgLlxuICAgKlxuICAgKiBOb3RlOiBUaGUgYG9yaWdpbmFsVGVtcGxhdGVgIGlzIG9ubHkgZXZlciB1c2VkIHRvIGV4dHJhY3QgdGhlIHBvcnRpb25cbiAgICogb2YgdGhlIG9yaWdpbmFsIHRlbXBsYXRlIHRoYXQgd2FzIGNvbnRhaW5lZCBpbiBhIGhpZ2hlci1vcmRlciBzZWN0aW9uLlxuICAgKiBJZiB0aGUgdGVtcGxhdGUgZG9lc24ndCB1c2UgaGlnaGVyLW9yZGVyIHNlY3Rpb25zLCB0aGlzIGFyZ3VtZW50IG1heVxuICAgKiBiZSBvbWl0dGVkLlxuICAgKi9cbiAgV3JpdGVyLnByb3RvdHlwZS5yZW5kZXJUb2tlbnMgPSBmdW5jdGlvbiByZW5kZXJUb2tlbnModG9rZW5zLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSkge1xuICAgIHZhciBidWZmZXIgPSAnJztcbiAgICB2YXIgdG9rZW4sIHN5bWJvbCwgdmFsdWU7XG4gICAgZm9yICh2YXIgaSA9IDAsIG51bVRva2VucyA9IHRva2Vucy5sZW5ndGg7IGkgPCBudW1Ub2tlbnM7ICsraSkge1xuICAgICAgdmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcbiAgICAgIHN5bWJvbCA9IHRva2VuWzBdO1xuXG4gICAgICBpZiAoc3ltYm9sID09PSAnIycpIHZhbHVlID0gdGhpcy5yZW5kZXJTZWN0aW9uKHRva2VuLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XG4gICAgICBlbHNlIGlmIChzeW1ib2wgPT09ICdeJykgdmFsdWUgPSB0aGlzLnJlbmRlckludmVydGVkKHRva2VuLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XG4gICAgICBlbHNlIGlmIChzeW1ib2wgPT09ICc+JykgdmFsdWUgPSB0aGlzLnJlbmRlclBhcnRpYWwodG9rZW4sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgICAgIGVsc2UgaWYgKHN5bWJvbCA9PT0gJyYnKSB2YWx1ZSA9IHRoaXMudW5lc2NhcGVkVmFsdWUodG9rZW4sIGNvbnRleHQpO1xuICAgICAgZWxzZSBpZiAoc3ltYm9sID09PSAnbmFtZScpIHZhbHVlID0gdGhpcy5lc2NhcGVkVmFsdWUodG9rZW4sIGNvbnRleHQpO1xuICAgICAgZWxzZSBpZiAoc3ltYm9sID09PSAndGV4dCcpIHZhbHVlID0gdGhpcy5yYXdWYWx1ZSh0b2tlbik7XG5cbiAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICBidWZmZXIgKz0gdmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1ZmZlcjtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLnJlbmRlclNlY3Rpb24gPSBmdW5jdGlvbiByZW5kZXJTZWN0aW9uKHRva2VuLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgYnVmZmVyID0gJyc7XG5cbiAgICB2YXIgdmFsdWUgPSBjb250ZXh0Lmxvb2t1cCh0b2tlblsxXSk7XG5cbiAgICAvLyBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gcmVuZGVyIGFuIGFyYml0cmFyeSB0ZW1wbGF0ZVxuICAgIC8vIGluIHRoZSBjdXJyZW50IGNvbnRleHQgYnkgaGlnaGVyLW9yZGVyIHNlY3Rpb25zLlxuICAgIGZ1bmN0aW9uIHN1YlJlbmRlcih0ZW1wbGF0ZSkge1xuICAgICAgcmV0dXJuIHNlbGYucmVuZGVyKHRlbXBsYXRlLCBjb250ZXh0LCBwYXJ0aWFscyk7XG4gICAgfVxuXG4gICAgaWYgKCF2YWx1ZSkgcmV0dXJuO1xuXG4gICAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgICBmb3IgKHZhciBqID0gMCwgdmFsdWVMZW5ndGggPSB2YWx1ZS5sZW5ndGg7IGogPCB2YWx1ZUxlbmd0aDsgKytqKSB7XG4gICAgICAgIGlmICh2YWx1ZVtqXSkge1xuICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWVbal0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB2YWx1ZVtqXVsnQGknXSA9IGo7XG4gICAgICAgICAgICB2YWx1ZVtqXVsnQGZpcnN0J10gPSAoaiA9PT0gMCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnVmZmVyICs9IHRoaXMucmVuZGVyVG9rZW5zKHRva2VuWzRdLCBjb250ZXh0LnB1c2godmFsdWVbal0pLCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIGJ1ZmZlciArPSB0aGlzLnJlbmRlclRva2Vucyh0b2tlbls0XSwgY29udGV4dC5wdXNoKHZhbHVlKSwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgICAgaWYgKHR5cGVvZiBvcmlnaW5hbFRlbXBsYXRlICE9PSAnc3RyaW5nJylcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgdXNlIGhpZ2hlci1vcmRlciBzZWN0aW9ucyB3aXRob3V0IHRoZSBvcmlnaW5hbCB0ZW1wbGF0ZScpO1xuXG4gICAgICAvLyBFeHRyYWN0IHRoZSBwb3J0aW9uIG9mIHRoZSBvcmlnaW5hbCB0ZW1wbGF0ZSB0aGF0IHRoZSBzZWN0aW9uIGNvbnRhaW5zLlxuICAgICAgdmFsdWUgPSB2YWx1ZS5jYWxsKGNvbnRleHQudmlldywgb3JpZ2luYWxUZW1wbGF0ZS5zbGljZSh0b2tlblszXSwgdG9rZW5bNV0pLCBzdWJSZW5kZXIpO1xuXG4gICAgICBpZiAodmFsdWUgIT0gbnVsbClcbiAgICAgICAgYnVmZmVyICs9IHZhbHVlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGJ1ZmZlciArPSB0aGlzLnJlbmRlclRva2Vucyh0b2tlbls0XSwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xuICAgIH1cbiAgICByZXR1cm4gYnVmZmVyO1xuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUucmVuZGVySW52ZXJ0ZWQgPSBmdW5jdGlvbiByZW5kZXJJbnZlcnRlZCh0b2tlbiwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpIHtcbiAgICB2YXIgdmFsdWUgPSBjb250ZXh0Lmxvb2t1cCh0b2tlblsxXSk7XG5cbiAgICAvLyBVc2UgSmF2YVNjcmlwdCdzIGRlZmluaXRpb24gb2YgZmFsc3kuIEluY2x1ZGUgZW1wdHkgYXJyYXlzLlxuICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vamFubC9tdXN0YWNoZS5qcy9pc3N1ZXMvMTg2XG4gICAgaWYgKCF2YWx1ZSB8fCAoaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID09PSAwKSlcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlclRva2Vucyh0b2tlbls0XSwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUucmVuZGVyUGFydGlhbCA9IGZ1bmN0aW9uIHJlbmRlclBhcnRpYWwodG9rZW4sIGNvbnRleHQsIHBhcnRpYWxzKSB7XG4gICAgaWYgKCFwYXJ0aWFscykgcmV0dXJuO1xuXG4gICAgdmFyIHZhbHVlID0gaXNGdW5jdGlvbihwYXJ0aWFscykgPyBwYXJ0aWFscyh0b2tlblsxXSkgOiBwYXJ0aWFsc1t0b2tlblsxXV07XG4gICAgaWYgKHZhbHVlICE9IG51bGwpXG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJUb2tlbnModGhpcy5wYXJzZSh2YWx1ZSksIGNvbnRleHQsIHBhcnRpYWxzLCB2YWx1ZSk7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS51bmVzY2FwZWRWYWx1ZSA9IGZ1bmN0aW9uIHVuZXNjYXBlZFZhbHVlKHRva2VuLCBjb250ZXh0KSB7XG4gICAgdmFyIHZhbHVlID0gY29udGV4dC5sb29rdXAodG9rZW5bMV0pO1xuICAgIGlmICh2YWx1ZSAhPSBudWxsKVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUuZXNjYXBlZFZhbHVlID0gZnVuY3Rpb24gZXNjYXBlZFZhbHVlKHRva2VuLCBjb250ZXh0KSB7XG4gICAgdmFyIHZhbHVlID0gY29udGV4dC5sb29rdXAodG9rZW5bMV0pO1xuICAgIGlmICh2YWx1ZSAhPSBudWxsKVxuICAgICAgcmV0dXJuIG11c3RhY2hlLmVzY2FwZSh2YWx1ZSk7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5yYXdWYWx1ZSA9IGZ1bmN0aW9uIHJhd1ZhbHVlKHRva2VuKSB7XG4gICAgcmV0dXJuIHRva2VuWzFdO1xuICB9O1xuXG4gIG11c3RhY2hlLm5hbWUgPSAnbXVzdGFjaGUuanMnO1xuICBtdXN0YWNoZS52ZXJzaW9uID0gJzIuMS4zJztcbiAgbXVzdGFjaGUudGFncyA9IFsne3snLCAnfX0nXTtcblxuICAvLyBBbGwgaGlnaC1sZXZlbCBtdXN0YWNoZS4qIGZ1bmN0aW9ucyB1c2UgdGhpcyB3cml0ZXIuXG4gIHZhciBkZWZhdWx0V3JpdGVyID0gbmV3IFdyaXRlcigpO1xuXG4gIC8qKlxuICAgKiBDbGVhcnMgYWxsIGNhY2hlZCB0ZW1wbGF0ZXMgaW4gdGhlIGRlZmF1bHQgd3JpdGVyLlxuICAgKi9cbiAgbXVzdGFjaGUuY2xlYXJDYWNoZSA9IGZ1bmN0aW9uIGNsZWFyQ2FjaGUoKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRXcml0ZXIuY2xlYXJDYWNoZSgpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBQYXJzZXMgYW5kIGNhY2hlcyB0aGUgZ2l2ZW4gdGVtcGxhdGUgaW4gdGhlIGRlZmF1bHQgd3JpdGVyIGFuZCByZXR1cm5zIHRoZVxuICAgKiBhcnJheSBvZiB0b2tlbnMgaXQgY29udGFpbnMuIERvaW5nIHRoaXMgYWhlYWQgb2YgdGltZSBhdm9pZHMgdGhlIG5lZWQgdG9cbiAgICogcGFyc2UgdGVtcGxhdGVzIG9uIHRoZSBmbHkgYXMgdGhleSBhcmUgcmVuZGVyZWQuXG4gICAqL1xuICBtdXN0YWNoZS5wYXJzZSA9IGZ1bmN0aW9uIHBhcnNlKHRlbXBsYXRlLCB0YWdzKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRXcml0ZXIucGFyc2UodGVtcGxhdGUsIHRhZ3MpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZW5kZXJzIHRoZSBgdGVtcGxhdGVgIHdpdGggdGhlIGdpdmVuIGB2aWV3YCBhbmQgYHBhcnRpYWxzYCB1c2luZyB0aGVcbiAgICogZGVmYXVsdCB3cml0ZXIuXG4gICAqL1xuICBtdXN0YWNoZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIodGVtcGxhdGUsIHZpZXcsIHBhcnRpYWxzKSB7XG4gICAgaWYgKHR5cGVvZiB0ZW1wbGF0ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgdGVtcGxhdGUhIFRlbXBsYXRlIHNob3VsZCBiZSBhIFwic3RyaW5nXCIgJyArICdidXQgXCInICsgdHlwZVN0cih0ZW1wbGF0ZSkgKyAnXCIgd2FzIGdpdmVuIGFzIHRoZSBmaXJzdCAnICsgJ2FyZ3VtZW50IGZvciBtdXN0YWNoZSNyZW5kZXIodGVtcGxhdGUsIHZpZXcsIHBhcnRpYWxzKScpO1xuICAgIH1cblxuICAgIHJldHVybiBkZWZhdWx0V3JpdGVyLnJlbmRlcih0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMpO1xuICB9O1xuXG4gIC8vIFRoaXMgaXMgaGVyZSBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkgd2l0aCAwLjQueC4sXG4gIC8qZXNsaW50LWRpc2FibGUgKi8gLy8gZXNsaW50IHdhbnRzIGNhbWVsIGNhc2VkIGZ1bmN0aW9uIG5hbWVcbiAgbXVzdGFjaGUudG9faHRtbCA9IGZ1bmN0aW9uIHRvX2h0bWwodGVtcGxhdGUsIHZpZXcsIHBhcnRpYWxzLCBzZW5kKSB7XG4gICAgLyplc2xpbnQtZW5hYmxlKi9cblxuICAgIHZhciByZXN1bHQgPSBtdXN0YWNoZS5yZW5kZXIodGVtcGxhdGUsIHZpZXcsIHBhcnRpYWxzKTtcblxuICAgIGlmIChpc0Z1bmN0aW9uKHNlbmQpKSB7XG4gICAgICBzZW5kKHJlc3VsdCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gIH07XG5cbiAgLy8gRXhwb3J0IHRoZSBlc2NhcGluZyBmdW5jdGlvbiBzbyB0aGF0IHRoZSB1c2VyIG1heSBvdmVycmlkZSBpdC5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qYW5sL211c3RhY2hlLmpzL2lzc3Vlcy8yNDRcbiAgbXVzdGFjaGUuZXNjYXBlID0gZXNjYXBlSHRtbDtcblxuICAvLyBFeHBvcnQgdGhlc2UgbWFpbmx5IGZvciB0ZXN0aW5nLCBidXQgYWxzbyBmb3IgYWR2YW5jZWQgdXNhZ2UuXG4gIG11c3RhY2hlLlNjYW5uZXIgPSBTY2FubmVyO1xuICBtdXN0YWNoZS5Db250ZXh0ID0gQ29udGV4dDtcbiAgbXVzdGFjaGUuV3JpdGVyID0gV3JpdGVyO1xuXG59KSk7XG5cbmV4cG9ydCBkZWZhdWx0IEFYNi5tdXN0YWNoZTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vc3JjL0FYNk11c3RhY2hlLmpzIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3N0eWxlLnNjc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge31cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGUuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGUuc2Nzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vc3JjL0FYNlVJQ2FsZW5kYXIvc3R5bGUuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDMgMTEiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodW5kZWZpbmVkKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIkAtd2Via2l0LWtleWZyYW1lcyBheDYtdWktY2FsZW5kYXItZmFkZW91dCB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMS4wOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDAuNTsgfSB9XFxuXFxuQC1tb3ota2V5ZnJhbWVzIGF4Ni11aS1jYWxlbmRhci1mYWRlb3V0IHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAxLjA7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMC41OyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIGF4Ni11aS1jYWxlbmRhci1mYWRlb3V0IHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAxLjA7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMC41OyB9IH1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgYXg2LXVpLWNhbGVuZGFyLWZhZGVpbiB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMC41OyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDEuMDsgfSB9XFxuXFxuQC1tb3ota2V5ZnJhbWVzIGF4Ni11aS1jYWxlbmRhci1mYWRlaW4ge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDAuNTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxLjA7IH0gfVxcblxcbkBrZXlmcmFtZXMgYXg2LXVpLWNhbGVuZGFyLWZhZGVpbiB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMC41OyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDEuMDsgfSB9XFxuXFxuW2RhdGEtYXg2dWktY2FsZW5kYXJdIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG4gIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAqIHtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDsgfVxcbiAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1jb250cm9sIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoYm90dG9tLCAjZjVmNWY1KTtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIHRvcCwjZjVmNWY1KTtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgICBmb250LXNpemU6IDE4cHg7XFxuICAgIG1hcmdpbi1ib3R0b206IDVweDtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgY29sb3I6ICMzMzM7IH1cXG4gICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1jb250cm9sIC5kYXRlLW1vdmUtbGVmdCwgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1jb250cm9sIC5kYXRlLW1vdmUtcmlnaHQge1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgICBmb250LXNpemU6IDIycHg7XFxuICAgICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gICAgICBwYWRkaW5nOiAwOyB9XFxuICAgICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1jb250cm9sIC5kYXRlLW1vdmUtbGVmdCBpLCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWNvbnRyb2wgLmRhdGUtbW92ZS1sZWZ0IHNwYW4sIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItY29udHJvbCAuZGF0ZS1tb3ZlLXJpZ2h0IGksIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItY29udHJvbCAuZGF0ZS1tb3ZlLXJpZ2h0IHNwYW4ge1xcbiAgICAgICAgbGluZS1oZWlnaHQ6IGluaGVyaXQ7IH1cXG4gICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1jb250cm9sIC5kYXRlLW1vdmUtbGVmdCB7XFxuICAgICAgbGVmdDogMHB4O1xcbiAgICAgIHRvcDogMHB4OyB9XFxuICAgIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItY29udHJvbCAuZGF0ZS1tb3ZlLXJpZ2h0IHtcXG4gICAgICByaWdodDogMHB4O1xcbiAgICAgIHRvcDogMHB4OyB9XFxuICAgIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItY29udHJvbCAuZGF0ZS1kaXNwbGF5IHtcXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cXG4gICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWNvbnRyb2wgLmRhdGUtZGlzcGxheSBbZGF0YS1jYWxlbmRhci1kaXNwbGF5XSB7XFxuICAgICAgICBtYXJnaW46IDBweCAxMHB4O1xcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IH1cXG4gICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1jb250cm9sIGEge1xcbiAgICAgIGNvbG9yOiAjMzMzOyB9XFxuICAgIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItY29udHJvbCBhOmhvdmVyIHtcXG4gICAgICBjb2xvcjogIzMzN2FiNzsgfVxcbiAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5LmZhZGVpbiB7XFxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBheDYtdWktY2FsZW5kYXItZmFkZWluIDAuM3MgY3ViaWMtYmV6aWVyKDAuMzksIDAuNTc1LCAwLjU2NSwgMSk7XFxuICAgIC1tb3otYW5pbWF0aW9uOiBheDYtdWktY2FsZW5kYXItZmFkZWluIDAuM3MgY3ViaWMtYmV6aWVyKDAuMzksIDAuNTc1LCAwLjU2NSwgMSk7XFxuICAgIGFuaW1hdGlvbjogYXg2LXVpLWNhbGVuZGFyLWZhZGVpbiAwLjNzIGN1YmljLWJlemllcigwLjM5LCAwLjU3NSwgMC41NjUsIDEpO1xcbiAgICBvcGFjaXR5OiAxLjA7IH1cXG4gIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keS5mYWRlb3V0IHtcXG4gICAgLXdlYmtpdC1hbmltYXRpb246IGF4Ni11aS1jYWxlbmRhci1mYWRlb3V0IDAuM3MgY3ViaWMtYmV6aWVyKDAuMzksIDAuNTc1LCAwLjU2NSwgMSk7XFxuICAgIC1tb3otYW5pbWF0aW9uOiBheDYtdWktY2FsZW5kYXItZmFkZW91dCAwLjNzIGN1YmljLWJlemllcigwLjM5LCAwLjU3NSwgMC41NjUsIDEpO1xcbiAgICBhbmltYXRpb246IGF4Ni11aS1jYWxlbmRhci1mYWRlb3V0IDAuM3MgY3ViaWMtYmV6aWVyKDAuMzksIDAuNTc1LCAwLjU2NSwgMSk7XFxuICAgIG9wYWNpdHk6IDAuMDsgfVxcbiAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgdGFibGUtbGF5b3V0OiBmaXhlZDtcXG4gICAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG4gICAgYm9yZGVyLXNwYWNpbmc6IDA7XFxuICAgIGJvcmRlcjogMCBub25lOyB9XFxuICAgIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0aGVhZCB7XFxuICAgICAgYm9yZGVyOiAwIG5vbmU7IH1cXG4gICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGhlYWQgdGQsIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0aGVhZCB0aCB7XFxuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAxZW07XFxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgICAgICBmb250LXNpemU6IDEycHg7XFxuICAgICAgICBwYWRkaW5nOiAwcHggMnB4O1xcbiAgICAgICAgYm9yZGVyOiAwcHggbm9uZTtcXG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGRkZGO1xcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoYm90dG9tLCAjRkZGRkZGLCAjRkZGRkZGKTtcXG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byB0b3AsI0ZGRkZGRiwgI0ZGRkZGRik7XFxuICAgICAgICBjb2xvcjogIzZENkU3MDsgfVxcbiAgICAgICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRoZWFkIHRkLmNhbGVuZGFyLWNvbC0wLCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGhlYWQgdGguY2FsZW5kYXItY29sLTAge1xcbiAgICAgICAgICBjb2xvcjogI0M3OEI4MTsgfVxcbiAgICAgICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRoZWFkIHRkLmNhbGVuZGFyLWNvbC02LCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGhlYWQgdGguY2FsZW5kYXItY29sLTYge1xcbiAgICAgICAgICBjb2xvcjogIzMyQjREQzsgfVxcbiAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkge1xcbiAgICAgIGJvcmRlcjogMCBub25lOyB9XFxuICAgICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRkLCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGgge1xcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxuICAgICAgICBsaW5lLWhlaWdodDogMWVtO1xcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICAgICAgYm9yZGVyOiAwcHggbm9uZTtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNGRkZGRkY7XFxuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudChib3R0b20sICNGRkZGRkYsICNGRkZGRkYpO1xcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIHRvcCwjRkZGRkZGLCAjRkZGRkZGKTtcXG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgICAgICAvKlxcbiAgICAgICAgICAmLmNhbGVuZGFyLWNvbC0wIHtcXG4gICAgICAgICAgICAgIC5jYWxlbmRhci1pdGVtLWRheS5saXZlIHtcXG4gICAgICAgICAgICAgICAgICBjb2xvcjogJGF4NnVpLWNhbGVuZGFyLXN1bi10ZXh0LWNvbG9yO1xcbiAgICAgICAgICAgICAgICAgIEBpbmNsdWRlIGV4dGVuZC1pdGVtLXRoZW1lKCk7XFxuICAgICAgICAgICAgICB9XFxuICAgICAgICAgIH1cXG4gICAgICAgICAgJi5jYWxlbmRhci1jb2wtNiB7XFxuICAgICAgICAgICAgICAuY2FsZW5kYXItaXRlbS1kYXkubGl2ZSB7XFxuICAgICAgICAgICAgICAgICAgY29sb3I6ICRheDZ1aS1jYWxlbmRhci1zYXQtdGV4dC1jb2xvcjtcXG4gICAgICAgICAgICAgICAgICBAaW5jbHVkZSBleHRlbmQtaXRlbS10aGVtZSgpO1xcbiAgICAgICAgICAgICAgfVxcbiAgICAgICAgICB9XFxuICAgICAgICAgICovIH1cXG4gICAgICAgIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0ZCAuY2FsZW5kYXItaXRlbS1kYXksIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0aCAuY2FsZW5kYXItaXRlbS1kYXkge1xcbiAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgICAgICB3aWR0aDogMTAwJTtcXG4gICAgICAgICAgaGVpZ2h0OiAxMDAlO1xcbiAgICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgICAgICAgIGxpbmUtaGVpZ2h0OiBpbmhlcml0O1xcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGRkZGO1xcbiAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudChib3R0b20sICNGRkZGRkYsICNGRkZGRkYpO1xcbiAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gdG9wLCNGRkZGRkYsICNGRkZGRkYpO1xcbiAgICAgICAgICBjb2xvcjogI0MzQzRDNjtcXG4gICAgICAgICAgZm9udC1zaXplOiAxNHB4OyB9XFxuICAgICAgICAgIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0ZCAuY2FsZW5kYXItaXRlbS1kYXkgc3Bhbi5hZGRvbiwgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRoIC5jYWxlbmRhci1pdGVtLWRheSBzcGFuLmFkZG9uIHtcXG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiAxMS4ycHg7XFxuICAgICAgICAgICAgZm9udC1zaXplOiAxMS4ycHg7IH1cXG4gICAgICAgICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGQgLmNhbGVuZGFyLWl0ZW0tZGF5IHNwYW4uYWRkb24uYWRkb24taGVhZGVyLCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGggLmNhbGVuZGFyLWl0ZW0tZGF5IHNwYW4uYWRkb24uYWRkb24taGVhZGVyIHtcXG4gICAgICAgICAgICAgIGxlZnQ6IDBweDtcXG4gICAgICAgICAgICAgIHRvcDogMXB4OyB9XFxuICAgICAgICAgICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRkIC5jYWxlbmRhci1pdGVtLWRheSBzcGFuLmFkZG9uLmFkZG9uLWZvb3RlciwgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRoIC5jYWxlbmRhci1pdGVtLWRheSBzcGFuLmFkZG9uLmFkZG9uLWZvb3RlciB7XFxuICAgICAgICAgICAgICBsZWZ0OiAwcHg7XFxuICAgICAgICAgICAgICBib3R0b206IDFweDsgfVxcbiAgICAgICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGQgLmNhbGVuZGFyLWl0ZW0tZGF5LmxpdmUsIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0aCAuY2FsZW5kYXItaXRlbS1kYXkubGl2ZSB7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI0YwRjBGMDtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudChib3R0b20sICNGMEYwRjAsICNGMEYwRjApO1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byB0b3AsI0YwRjBGMCwgI0YwRjBGMCk7XFxuICAgICAgICAgICAgY29sb3I6ICM2RDZFNzA7IH1cXG4gICAgICAgICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGQgLmNhbGVuZGFyLWl0ZW0tZGF5LmxpdmUgc3Bhbi5hZGRvbiwgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRoIC5jYWxlbmRhci1pdGVtLWRheS5saXZlIHNwYW4uYWRkb24ge1xcbiAgICAgICAgICAgICAgY29sb3I6ICNBMUExQTE7IH1cXG4gICAgICAgICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGQgLmNhbGVuZGFyLWl0ZW0tZGF5LmxpdmUuc3VuZGF5LCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGggLmNhbGVuZGFyLWl0ZW0tZGF5LmxpdmUuc3VuZGF5IHtcXG4gICAgICAgICAgICAgIGNvbG9yOiAjQzc4QjgxOyB9XFxuICAgICAgICAgICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRkIC5jYWxlbmRhci1pdGVtLWRheS5saXZlLnNhdHVyZGF5LCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGggLmNhbGVuZGFyLWl0ZW0tZGF5LmxpdmUuc2F0dXJkYXkge1xcbiAgICAgICAgICAgICAgY29sb3I6ICMzMkI0REM7IH1cXG4gICAgICAgICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRkIC5jYWxlbmRhci1pdGVtLWRheS5mb2N1cywgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRoIC5jYWxlbmRhci1pdGVtLWRheS5mb2N1cyB7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI0U2NzI0MTtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudChib3R0b20sICNFNjcyNDEsICNFNjcyNDEpO1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byB0b3AsI0U2NzI0MSwgI0U2NzI0MSk7XFxuICAgICAgICAgICAgY29sb3I6ICNmZmY7IH1cXG4gICAgICAgICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGQgLmNhbGVuZGFyLWl0ZW0tZGF5LmZvY3VzIHNwYW4uYWRkb24sIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0aCAuY2FsZW5kYXItaXRlbS1kYXkuZm9jdXMgc3Bhbi5hZGRvbiB7XFxuICAgICAgICAgICAgICBjb2xvcjogI2ZmZjsgfVxcbiAgICAgICAgICAgIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0ZCAuY2FsZW5kYXItaXRlbS1kYXkuZm9jdXMuaG92ZXIsIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0aCAuY2FsZW5kYXItaXRlbS1kYXkuZm9jdXMuaG92ZXIge1xcbiAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzMyQjREQztcXG4gICAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KGJvdHRvbSwgIzMyQjREQywgIzMyQjREQyk7XFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gdG9wLCMzMkI0REMsICMzMkI0REMpO1xcbiAgICAgICAgICAgICAgY29sb3I6ICNmZmYgIWltcG9ydGFudDsgfVxcbiAgICAgICAgICAgICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRkIC5jYWxlbmRhci1pdGVtLWRheS5mb2N1cy5ob3ZlciBzcGFuLmFkZG9uLCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGggLmNhbGVuZGFyLWl0ZW0tZGF5LmZvY3VzLmhvdmVyIHNwYW4uYWRkb24ge1xcbiAgICAgICAgICAgICAgICBjb2xvcjogI2ZmZjsgfVxcbiAgICAgICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGQgLmNhbGVuZGFyLWl0ZW0tZGF5LnBlcmlvZCwgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRoIC5jYWxlbmRhci1pdGVtLWRheS5wZXJpb2Qge1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICM4MmQzZmE7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoYm90dG9tLCAjODJkM2ZhLCAjODJkM2ZhKTtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gdG9wLCM4MmQzZmEsICM4MmQzZmEpO1xcbiAgICAgICAgICAgIGNvbG9yOiAjZmZmICFpbXBvcnRhbnQ7IH1cXG4gICAgICAgICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGQgLmNhbGVuZGFyLWl0ZW0tZGF5LnBlcmlvZCBzcGFuLmFkZG9uLCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGggLmNhbGVuZGFyLWl0ZW0tZGF5LnBlcmlvZCBzcGFuLmFkZG9uIHtcXG4gICAgICAgICAgICAgIGNvbG9yOiAjZmZmOyB9XFxuICAgICAgICAgIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0ZCAuY2FsZW5kYXItaXRlbS1kYXkuc2VsZWN0ZWQtZGF5LCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGggLmNhbGVuZGFyLWl0ZW0tZGF5LnNlbGVjdGVkLWRheSB7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzMyQjREQztcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudChib3R0b20sICMzMkI0REMsICMzMkI0REMpO1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byB0b3AsIzMyQjREQywgIzMyQjREQyk7XFxuICAgICAgICAgICAgY29sb3I6ICNmZmYgIWltcG9ydGFudDsgfVxcbiAgICAgICAgICAgIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0ZCAuY2FsZW5kYXItaXRlbS1kYXkuc2VsZWN0ZWQtZGF5IHNwYW4uYWRkb24sIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0aCAuY2FsZW5kYXItaXRlbS1kYXkuc2VsZWN0ZWQtZGF5IHNwYW4uYWRkb24ge1xcbiAgICAgICAgICAgICAgY29sb3I6ICNmZmY7IH1cXG4gICAgICAgICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRkIC5jYWxlbmRhci1pdGVtLWRheS5kaXNhYmxlLCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGggLmNhbGVuZGFyLWl0ZW0tZGF5LmRpc2FibGUge1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNGRkZGRkY7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoYm90dG9tLCAjRkZGRkZGLCAjRkZGRkZGKTtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gdG9wLCNGRkZGRkYsICNGRkZGRkYpO1xcbiAgICAgICAgICAgIGNvbG9yOiAjZGRkZWRmOyB9XFxuICAgICAgICAgIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0ZCAuY2FsZW5kYXItaXRlbS1kYXkuaG9saWRheSwgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRoIC5jYWxlbmRhci1pdGVtLWRheS5ob2xpZGF5IHtcXG4gICAgICAgICAgICBjb2xvcjogI0M3OEI4MTsgfVxcbiAgICAgICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRkIC5jYWxlbmRhci1pdGVtLW1vbnRoLCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGggLmNhbGVuZGFyLWl0ZW0tbW9udGgge1xcbiAgICAgICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgICAgIGhlaWdodDogMTAwJTtcXG4gICAgICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICAgICAgICBsaW5lLWhlaWdodDogaW5oZXJpdDtcXG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRkZGRjtcXG4gICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoYm90dG9tLCAjRkZGRkZGLCAjRkZGRkZGKTtcXG4gICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIHRvcCwjRkZGRkZGLCAjRkZGRkZGKTtcXG4gICAgICAgICAgY29sb3I6ICNDM0M0QzY7XFxuICAgICAgICAgIGZvbnQtc2l6ZTogMTRweDsgfVxcbiAgICAgICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGQgLmNhbGVuZGFyLWl0ZW0tbW9udGgubGl2ZSwgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRoIC5jYWxlbmRhci1pdGVtLW1vbnRoLmxpdmUge1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNGMEYwRjA7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoYm90dG9tLCAjRjBGMEYwLCAjRjBGMEYwKTtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gdG9wLCNGMEYwRjAsICNGMEYwRjApO1xcbiAgICAgICAgICAgIGNvbG9yOiAjNkQ2RTcwOyB9XFxuICAgICAgICAgIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0ZCAuY2FsZW5kYXItaXRlbS1tb250aC5ob3ZlciwgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRoIC5jYWxlbmRhci1pdGVtLW1vbnRoLmhvdmVyIHtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzJCNERDO1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KGJvdHRvbSwgIzMyQjREQywgIzMyQjREQyk7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIHRvcCwjMzJCNERDLCAjMzJCNERDKTtcXG4gICAgICAgICAgICBjb2xvcjogI2ZmZjsgfVxcbiAgICAgICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGQgLmNhbGVuZGFyLWl0ZW0tbW9udGguZm9jdXMsIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0aCAuY2FsZW5kYXItaXRlbS1tb250aC5mb2N1cyB7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI0U2NzI0MTtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudChib3R0b20sICNFNjcyNDEsICNFNjcyNDEpO1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byB0b3AsI0U2NzI0MSwgI0U2NzI0MSk7XFxuICAgICAgICAgICAgY29sb3I6ICNmZmY7IH1cXG4gICAgICAgICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRkIC5jYWxlbmRhci1pdGVtLW1vbnRoLnNlbGVjdGVkLW1vbnRoLCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGggLmNhbGVuZGFyLWl0ZW0tbW9udGguc2VsZWN0ZWQtbW9udGgge1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMzMkI0REM7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoYm90dG9tLCAjMzJCNERDLCAjMzJCNERDKTtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gdG9wLCMzMkI0REMsICMzMkI0REMpO1xcbiAgICAgICAgICAgIGNvbG9yOiAjZmZmICFpbXBvcnRhbnQ7IH1cXG4gICAgICAgICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGQgLmNhbGVuZGFyLWl0ZW0tbW9udGguc2VsZWN0ZWQtbW9udGggc3Bhbi5hZGRvbiwgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRoIC5jYWxlbmRhci1pdGVtLW1vbnRoLnNlbGVjdGVkLW1vbnRoIHNwYW4uYWRkb24ge1xcbiAgICAgICAgICAgICAgY29sb3I6ICNmZmY7IH1cXG4gICAgICAgICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGQgLmNhbGVuZGFyLWl0ZW0tbW9udGguc2VsZWN0ZWQtbW9udGggc3Bhbi5sdW5hciwgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRoIC5jYWxlbmRhci1pdGVtLW1vbnRoLnNlbGVjdGVkLW1vbnRoIHNwYW4ubHVuYXIge1xcbiAgICAgICAgICAgICAgY29sb3I6ICNmZmY7IH1cXG4gICAgICAgICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRkIC5jYWxlbmRhci1pdGVtLW1vbnRoLmRpc2FibGUsIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0aCAuY2FsZW5kYXItaXRlbS1tb250aC5kaXNhYmxlIHtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGRkZGO1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KGJvdHRvbSwgI0ZGRkZGRiwgI0ZGRkZGRik7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIHRvcCwjRkZGRkZGLCAjRkZGRkZGKTtcXG4gICAgICAgICAgICBjb2xvcjogI2RkZGVkZjsgfVxcbiAgICAgICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGQgLmNhbGVuZGFyLWl0ZW0tbW9udGguaG9saWRheSwgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRoIC5jYWxlbmRhci1pdGVtLW1vbnRoLmhvbGlkYXkge1xcbiAgICAgICAgICAgIGNvbG9yOiAjQzc4QjgxOyB9XFxuICAgICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGQgLmNhbGVuZGFyLWl0ZW0teWVhciwgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRoIC5jYWxlbmRhci1pdGVtLXllYXIge1xcbiAgICAgICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgICAgIGhlaWdodDogMTAwJTtcXG4gICAgICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICAgICAgICBsaW5lLWhlaWdodDogaW5oZXJpdDtcXG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRkZGRjtcXG4gICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoYm90dG9tLCAjRkZGRkZGLCAjRkZGRkZGKTtcXG4gICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIHRvcCwjRkZGRkZGLCAjRkZGRkZGKTtcXG4gICAgICAgICAgY29sb3I6ICNDM0M0QzY7XFxuICAgICAgICAgIGZvbnQtc2l6ZTogMTRweDsgfVxcbiAgICAgICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGQgLmNhbGVuZGFyLWl0ZW0teWVhci5saXZlLCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGggLmNhbGVuZGFyLWl0ZW0teWVhci5saXZlIHtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjBGMEYwO1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KGJvdHRvbSwgI0YwRjBGMCwgI0YwRjBGMCk7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIHRvcCwjRjBGMEYwLCAjRjBGMEYwKTtcXG4gICAgICAgICAgICBjb2xvcjogIzZENkU3MDsgfVxcbiAgICAgICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGQgLmNhbGVuZGFyLWl0ZW0teWVhci5ob3ZlciwgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRoIC5jYWxlbmRhci1pdGVtLXllYXIuaG92ZXIge1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMzMkI0REM7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoYm90dG9tLCAjMzJCNERDLCAjMzJCNERDKTtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gdG9wLCMzMkI0REMsICMzMkI0REMpO1xcbiAgICAgICAgICAgIGNvbG9yOiAjZmZmOyB9XFxuICAgICAgICAgIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0ZCAuY2FsZW5kYXItaXRlbS15ZWFyLmZvY3VzLCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGggLmNhbGVuZGFyLWl0ZW0teWVhci5mb2N1cyB7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI0U2NzI0MTtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudChib3R0b20sICNFNjcyNDEsICNFNjcyNDEpO1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byB0b3AsI0U2NzI0MSwgI0U2NzI0MSk7XFxuICAgICAgICAgICAgY29sb3I6ICNmZmY7IH1cXG4gICAgICAgICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRkIC5jYWxlbmRhci1pdGVtLXllYXIuc2VsZWN0ZWQteWVhciwgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRoIC5jYWxlbmRhci1pdGVtLXllYXIuc2VsZWN0ZWQteWVhciB7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzMyQjREQztcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudChib3R0b20sICMzMkI0REMsICMzMkI0REMpO1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byB0b3AsIzMyQjREQywgIzMyQjREQyk7XFxuICAgICAgICAgICAgY29sb3I6ICNmZmYgIWltcG9ydGFudDsgfVxcbiAgICAgICAgICAgIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0ZCAuY2FsZW5kYXItaXRlbS15ZWFyLnNlbGVjdGVkLXllYXIgc3Bhbi5hZGRvbiwgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRoIC5jYWxlbmRhci1pdGVtLXllYXIuc2VsZWN0ZWQteWVhciBzcGFuLmFkZG9uIHtcXG4gICAgICAgICAgICAgIGNvbG9yOiAjZmZmOyB9XFxuICAgICAgICAgICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRkIC5jYWxlbmRhci1pdGVtLXllYXIuc2VsZWN0ZWQteWVhciBzcGFuLmx1bmFyLCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGggLmNhbGVuZGFyLWl0ZW0teWVhci5zZWxlY3RlZC15ZWFyIHNwYW4ubHVuYXIge1xcbiAgICAgICAgICAgICAgY29sb3I6ICNmZmY7IH1cXG4gICAgICAgICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRkIC5jYWxlbmRhci1pdGVtLXllYXIuZGlzYWJsZSwgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRoIC5jYWxlbmRhci1pdGVtLXllYXIuZGlzYWJsZSB7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRkZGRjtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudChib3R0b20sICNGRkZGRkYsICNGRkZGRkYpO1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byB0b3AsI0ZGRkZGRiwgI0ZGRkZGRik7XFxuICAgICAgICAgICAgY29sb3I6ICNkZGRlZGY7IH1cXG4gICAgICAgICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRkIC5jYWxlbmRhci1pdGVtLXllYXIuaG9saWRheSwgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRoIC5jYWxlbmRhci1pdGVtLXllYXIuaG9saWRheSB7XFxuICAgICAgICAgICAgY29sb3I6ICNDNzhCODE7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vc3JjL0FYNlVJQ2FsZW5kYXIvc3R5bGUuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDMgMTEiLCJpbXBvcnQgalF1ZXJ5IGZyb20gXCJqcW1pblwiO1xuaW1wb3J0IEFYNlVJQ29yZSBmcm9tIFwiLi9BWDZVSUNvcmVcIjtcbmltcG9ydCBVIGZyb20gXCIuL0FYNlV0aWxcIjtcbmltcG9ydCBpbmZvIGZyb20gXCIuL0FYNkluZm9cIjtcbmltcG9ydCBGT1JNQVRURVIgZnJvbSBcIi4vQVg2VUlGb3JtYXR0ZXIvQVg2VUlGb3JtYXR0ZXJfZm9ybWF0dGVyXCI7XG4vKiB+fn5+fn5+fn5+fn5+fn5+fn4gZW5kIG9mIGltcG9ydCAgfn5+fn5+fn5+fn5+fn5+fn5+fn4gKi9cblxubGV0IGZvcm1hdHRlciA9IHt9O1xuXG5jb25zdCBzZXRTZWxlY3Rpb25SYW5nZSA9IGZ1bmN0aW9uIChpbnB1dCwgcG9zKSB7XG4gIGlmICh0eXBlb2YgcG9zID09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBwb3MgPSBpbnB1dC52YWx1ZS5sZW5ndGg7XG4gIH1cbiAgaWYgKGlucHV0LnNldFNlbGVjdGlvblJhbmdlKSB7XG4gICAgaW5wdXQuZm9jdXMoKTtcbiAgICBpbnB1dC5zZXRTZWxlY3Rpb25SYW5nZShwb3MsIHBvcyk7XG4gIH1cbiAgZWxzZSBpZiAoaW5wdXQuY3JlYXRlVGV4dFJhbmdlKSB7XG4gICAgdmFyIHJhbmdlID0gaW5wdXQuY3JlYXRlVGV4dFJhbmdlKCk7XG4gICAgcmFuZ2UuY29sbGFwc2UodHJ1ZSk7XG4gICAgcmFuZ2UubW92ZUVuZCgnY2hhcmFjdGVyJywgcG9zKTtcbiAgICByYW5nZS5tb3ZlU3RhcnQoJ2NoYXJhY3RlcicsIHBvcyk7XG4gICAgcmFuZ2Uuc2VsZWN0KCk7XG4gIH1cbiAgZWxzZSBpZiAoaW5wdXQuc2VsZWN0aW9uU3RhcnQpIHtcbiAgICBpbnB1dC5mb2N1cygpO1xuICAgIGlucHV0LnNlbGVjdGlvblN0YXJ0ID0gcG9zO1xuICAgIGlucHV0LnNlbGVjdGlvbkVuZCA9IHBvcztcbiAgfVxufTtcbmNvbnN0IGZvcm1hdHRlckV2ZW50ID0ge1xuICAnZm9jdXMnOiBmdW5jdGlvbiAob3B0cywgb3B0SWR4LCBlKSB7XG4gICAgaWYgKCFvcHRzLiRpbnB1dC5kYXRhKFwiX19vcmlnaW5WYWx1ZV9fXCIpKSBvcHRzLiRpbnB1dC5kYXRhKFwiX19vcmlnaW5WYWx1ZV9fXCIsIG9wdHMuJGlucHV0LnZhbCgpKTtcbiAgfSxcbiAgLyog7YKkIOuLpOyatCDsnbTrsqTtirjsl5DshJwg7J6F66Cl7ZWgIOyImCDsl4bripQg7YKkIOyeheugpeydhCDrsKnslrQgKi9cbiAgJ2tleWRvd24nOiBmdW5jdGlvbiAob3B0cywgb3B0SWR4LCBlKSB7XG4gICAgbGV0IGlzU3RvcCA9IGZhbHNlO1xuICAgIGlmICghb3B0cy5lbnRlcmFibGVLZXlDb2Rlcykge1xuXG4gICAgfVxuICAgIGVsc2UgaWYgKGUud2hpY2ggJiYgb3B0cy5lbnRlcmFibGVLZXlDb2Rlc1tlLndoaWNoXSkge1xuXG4gICAgfVxuICAgIGVsc2UgaWYgKCFlLm1ldGFLZXkgJiYgIWUuY3RybEtleSAmJiAhZS5zaGlmdEtleSkge1xuICAgICAgLy9jb25zb2xlLmxvZyhlLndoaWNoLCBvcHRzLmVudGVyYWJsZUtleUNvZGVzKTtcbiAgICAgIGlzU3RvcCA9IHRydWU7XG4gICAgfVxuICAgIGlmIChpc1N0b3ApIFUuc3RvcEV2ZW50KGUpO1xuICB9LFxuICAvKiDtgqQg7JeFIOydtOuypO2KuOyXkOyEnCDtjKjthLTsnYQg7KCB7JqpICovXG4gICdrZXl1cCc6IGZ1bmN0aW9uIChvcHRzLCBvcHRJZHgsIGUpIHtcbiAgICBsZXQgZWxlbSA9IG9wdHMuJGlucHV0LmdldCgwKSxcbiAgICAgIGVsZW1Gb2N1c1Bvc2l0aW9uLFxuICAgICAgYmVmb3JlVmFsdWUsXG4gICAgICBuZXdWYWx1ZSxcbiAgICAgIHNlbGVjdGlvbiwgc2VsZWN0aW9uTGVuZ3RoO1xuXG4gICAgaWYgKCdzZWxlY3Rpb25TdGFydCcgaW4gZWxlbSkge1xuICAgICAgLy8gU3RhbmRhcmQtY29tcGxpYW50IGJyb3dzZXJzXG4gICAgICBlbGVtRm9jdXNQb3NpdGlvbiA9IGVsZW0uc2VsZWN0aW9uU3RhcnQ7XG4gICAgfVxuICAgIGVsc2UgaWYgKGRvY3VtZW50LnNlbGVjdGlvbikge1xuICAgICAgLy8gSUVcbiAgICAgIC8vZWxlbS5mb2N1cygpO1xuICAgICAgc2VsZWN0aW9uID0gZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCk7XG4gICAgICBzZWxlY3Rpb25MZW5ndGggPSBkb2N1bWVudC5zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKS50ZXh0Lmxlbmd0aDtcbiAgICAgIHNlbGVjdGlvbi5tb3ZlU3RhcnQoJ2NoYXJhY3RlcicsIC1lbGVtLnZhbHVlLmxlbmd0aCk7XG4gICAgICBlbGVtRm9jdXNQb3NpdGlvbiA9IHNlbGVjdGlvbi50ZXh0Lmxlbmd0aCAtIHNlbGVjdGlvbkxlbmd0aDtcbiAgICB9XG5cbiAgICBiZWZvcmVWYWx1ZSA9IGVsZW0udmFsdWU7XG4gICAgaWYgKG9wdHMucGF0dGVybiBpbiB0aGlzLmN1c3RvbUZvcm1hdHRlcikge1xuICAgICAgbmV3VmFsdWUgPSB0aGlzLmN1c3RvbUZvcm1hdHRlcltvcHRzLnBhdHRlcm5dLmdldFBhdHRlcm5WYWx1ZS5jYWxsKHRoaXMsIG9wdHMsIG9wdElkeCwgZSwgZWxlbS52YWx1ZSk7XG4gICAgfSBlbHNlIGlmIChvcHRzLnBhdHRlcm4gaW4gRk9STUFUVEVSKSB7XG4gICAgICBuZXdWYWx1ZSA9IEZPUk1BVFRFUltvcHRzLnBhdHRlcm5dLmdldFBhdHRlcm5WYWx1ZS5jYWxsKHRoaXMsIG9wdHMsIG9wdElkeCwgZSwgZWxlbS52YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld1ZhbHVlID0gYmVmb3JlVmFsdWVcbiAgICB9XG5cbiAgICBpZiAobmV3VmFsdWUgIT0gYmVmb3JlVmFsdWUpIHtcbiAgICAgIG9wdHMuJGlucHV0LnZhbChuZXdWYWx1ZSkudHJpZ2dlcihcImNoYW5nZVwiKTtcbiAgICAgIHNldFNlbGVjdGlvblJhbmdlKGVsZW0sIGVsZW1Gb2N1c1Bvc2l0aW9uICsgbmV3VmFsdWUubGVuZ3RoIC0gYmVmb3JlVmFsdWUubGVuZ3RoKTtcbiAgICB9XG4gIH0sXG4gICdibHVyJzogZnVuY3Rpb24gKG9wdHMsIG9wdElkeCwgZSwgX2ZvcmNlKSB7XG4gICAgbGV0IGVsZW0gPSBvcHRzLiRpbnB1dC5nZXQoMCksXG4gICAgICBiZWZvcmVWYWx1ZSxcbiAgICAgIG5ld1ZhbHVlXG4gICAgO1xuXG4gICAgb3B0cy4kaW5wdXQucmVtb3ZlRGF0YShcIl9fb3JpZ2luVmFsdWVfX1wiKTtcblxuICAgIGJlZm9yZVZhbHVlID0gZWxlbS52YWx1ZTtcbiAgICBpZiAob3B0cy5wYXR0ZXJuIGluIHRoaXMuY3VzdG9tRm9ybWF0dGVyKSB7XG4gICAgICBuZXdWYWx1ZSA9IHRoaXMuY3VzdG9tRm9ybWF0dGVyW29wdHMucGF0dGVybl0uZ2V0UGF0dGVyblZhbHVlLmNhbGwodGhpcywgb3B0cywgb3B0SWR4LCBlLCBlbGVtLnZhbHVlLCAnYmx1cicpO1xuICAgIH0gZWxzZSBpZiAob3B0cy5wYXR0ZXJuIGluIEZPUk1BVFRFUikge1xuICAgICAgbmV3VmFsdWUgPSBGT1JNQVRURVJbb3B0cy5wYXR0ZXJuXS5nZXRQYXR0ZXJuVmFsdWUuY2FsbCh0aGlzLCBvcHRzLCBvcHRJZHgsIGUsIGVsZW0udmFsdWUsICdibHVyJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld1ZhbHVlID0gYmVmb3JlVmFsdWVcbiAgICB9XG5cbiAgICBpZiAoX2ZvcmNlKSB7XG4gICAgICBvcHRzLiRpbnB1dC52YWwobmV3VmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAobmV3VmFsdWUgIT0gYmVmb3JlVmFsdWUpIHtcbiAgICAgICAgb3B0cy4kaW5wdXQudmFsKG5ld1ZhbHVlKS50cmlnZ2VyKFwiY2hhbmdlXCIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcbmNvbnN0IGJpbmRGb3JtYXR0ZXJUYXJnZXQgPSBmdW5jdGlvbiAob3B0cywgb3B0SWR4KSB7XG4gIGlmICghb3B0cy5wYXR0ZXJuKSB7XG4gICAgaWYgKG9wdHMuJHRhcmdldC5nZXQoMCkudGFnTmFtZSA9PSBcIklOUFVUXCIpIHtcbiAgICAgIG9wdHMucGF0dGVybiA9IG9wdHMuJHRhcmdldFxuICAgICAgICAuYXR0cignZGF0YS1heDZmb3JtYXR0ZXInKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBvcHRzLnBhdHRlcm4gPSBvcHRzLiR0YXJnZXRcbiAgICAgICAgLmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJylcbiAgICAgICAgLmF0dHIoJ2RhdGEtYXg2Zm9ybWF0dGVyJyk7XG4gICAgfVxuICAgIGlmICghb3B0cy5wYXR0ZXJuKSB7XG4gICAgICBjb25zb2xlLmxvZyhpbmZvLmdldEVycm9yKFwiYXg2Zm9ybWF0dGVyXCIsIFwiNTAxXCIsIFwiYmluZFwiKSk7XG4gICAgICBjb25zb2xlLmxvZyhvcHRzLnRhcmdldCk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH1cblxuICBsZXQgcmUgPSAvW15cXCheXFwpKV0rL2dpLFxuICAgIG1hdGNoZWQgPSBvcHRzLnBhdHRlcm4ubWF0Y2gocmUpO1xuXG4gIG9wdHMucGF0dGVybiA9IG1hdGNoZWRbMF07XG4gIG9wdHMucGF0dGVybkFyZ3VtZW50ID0gbWF0Y2hlZFsxXSB8fCBcIlwiO1xuXG4gIC8vIO2VqOyImO2DgOyehVxuICBpZiAob3B0cy5wYXR0ZXJuIGluIHRoaXMuY3VzdG9tRm9ybWF0dGVyKSB7XG4gICAgb3B0cy5lbnRlcmFibGVLZXlDb2RlcyA9IHRoaXMuY3VzdG9tRm9ybWF0dGVyW29wdHMucGF0dGVybl0uZ2V0RW50ZXJhYmxlS2V5Q29kZXMuY2FsbCh0aGlzLCBvcHRzLCBvcHRJZHgpO1xuICB9IGVsc2UgaWYgKG9wdHMucGF0dGVybiBpbiBGT1JNQVRURVIpIHtcbiAgICBvcHRzLmVudGVyYWJsZUtleUNvZGVzID0gRk9STUFUVEVSW29wdHMucGF0dGVybl0uZ2V0RW50ZXJhYmxlS2V5Q29kZXMuY2FsbCh0aGlzLCBvcHRzLCBvcHRJZHgpO1xuICB9XG5cbiAgb3B0cy4kaW5wdXRcbiAgICAub2ZmKCdmb2N1cy5heDZmb3JtYXR0ZXInKVxuICAgIC5vbignZm9jdXMuYXg2Zm9ybWF0dGVyJywgZm9ybWF0dGVyRXZlbnQuZm9jdXMuYmluZCh0aGlzLCB0aGlzLnF1ZXVlW29wdElkeF0sIG9wdElkeCkpXG4gICAgLm9mZigna2V5ZG93bi5heDZmb3JtYXR0ZXInKVxuICAgIC5vbigna2V5ZG93bi5heDZmb3JtYXR0ZXInLCBmb3JtYXR0ZXJFdmVudC5rZXlkb3duLmJpbmQodGhpcywgdGhpcy5xdWV1ZVtvcHRJZHhdLCBvcHRJZHgpKVxuICAgIC5vZmYoJ2tleXVwLmF4NmZvcm1hdHRlcicpXG4gICAgLm9uKCdrZXl1cC5heDZmb3JtYXR0ZXInLCBmb3JtYXR0ZXJFdmVudC5rZXl1cC5iaW5kKHRoaXMsIHRoaXMucXVldWVbb3B0SWR4XSwgb3B0SWR4KSlcbiAgICAub2ZmKCdibHVyLmF4NmZvcm1hdHRlcicpXG4gICAgLm9uKCdibHVyLmF4NmZvcm1hdHRlcicsIGZvcm1hdHRlckV2ZW50LmJsdXIuYmluZCh0aGlzLCB0aGlzLnF1ZXVlW29wdElkeF0sIG9wdElkeCkpO1xuXG4gIGZvcm1hdHRlckV2ZW50LmJsdXIuY2FsbCh0aGlzLCB0aGlzLnF1ZXVlW29wdElkeF0sIG9wdElkeCk7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuY29uc3QgdW5iaW5kRm9ybWF0dGVyVGFyZ2V0ID0gZnVuY3Rpb24gKG9wdHMsIG9wdElkeCkge1xuICBvcHRzLiRpbnB1dFxuICAgIC5vZmYoJ2ZvY3VzLmF4NmZvcm1hdHRlcicpXG4gICAgLm9mZigna2V5ZG93bi5heDZmb3JtYXR0ZXInKVxuICAgIC5vZmYoJ2tleXVwLmF4NmZvcm1hdHRlcicpXG4gICAgLm9mZignYmx1ci5heDZmb3JtYXR0ZXInKTtcblxuICByZXR1cm4gdGhpcztcbn07XG5jb25zdCBnZXRRdWVJZHggPSBmdW5jdGlvbiAoYm91bmRJRCkge1xuICBpZiAoIVUuaXNTdHJpbmcoYm91bmRJRCkpIHtcbiAgICBib3VuZElEID0galF1ZXJ5KGJvdW5kSUQpLmRhdGEoXCJkYXRhLWZvcm1hdHRlclwiKTtcbiAgfVxuICAvKlxuICAgaWYgKCFVLmlzU3RyaW5nKGJvdW5kSUQpKSB7XG4gICBjb25zb2xlLmxvZyhpbmZvLmdldEVycm9yKFwiYXg2Zm9ybWF0dGVyXCIsIFwiNDAyXCIsIFwiZ2V0UXVlSWR4XCIpKTtcbiAgIHJldHVybjtcbiAgIH1cbiAgICovXG4gIHJldHVybiBVLnNlYXJjaCh0aGlzLnF1ZXVlLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuaWQgPT0gYm91bmRJRDtcbiAgfSk7XG59O1xuLyogfn5+fn5+fn5+fn5+fn5+fn5+IGVuZCBvZiBwcml2YXRlICB+fn5+fn5+fn5+fn5+fn5+fn5+fiAqL1xuXG4vKipcbiAqIEBjbGFzc1xuICovXG5jbGFzcyBBWDZVSUZvcm1hdHRlciBleHRlbmRzIEFYNlVJQ29yZSB7XG4gIC8qKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIGNvbmZpZ1xuICAgKiBAcGFyYW0ge09iamVjdH0gW2NvbmZpZy5mb3JtYXR0ZXJdXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqIHZhciBmb3JtYXR0ZXIgPSBuZXcgRm9ybWF0dGVyKCk7XG4gICAqXG4gICAqIC8vIEV4dGVuZCBmb3JtYXR0ZXJcbiAgICogdmFyIG15Rm9ybWF0dGVyID0gbmV3IEZvcm1hdHRlcih7XG4gICAgICogIGZvcm1hdHRlcjoge1xuICAgICAqICAgICAgXCJteXN0eWxlXCI6IHtcbiAgICAgKiAgICAgICAgICBnZXRFbnRlcmFibGVLZXlDb2RlczogZnVuY3Rpb24gKF9vcHRzKSB7XG4gICAgICogICAgICAgICAgICAgIHZhciBlbnRlcmFibGVLZXlDb2RlcyA9IHtcbiAgICAgKiAgICAgICAgICAgICAgICAgICcxODknOiAnLScgLy8gZXZlbnRLZXlDb2RlXG4gICAgICogICAgICAgICAgICAgIH07XG4gICAgICogICAgICAgICAgICAgIHJldHVybiBqUXVlcnkuZXh0ZW5kKGVudGVyYWJsZUtleUNvZGVzLCB7fSk7XG4gICAgICogICAgICAgICAgfVxuICAgICAqICAgICAgICAgIGdldFBhdHRlcm5WYWx1ZTogZnVuY3Rpb24gKF9vcHRzLCBvcHRJZHgsIGUsIHZhbCwgZVR5cGUpIHtcbiAgICAgKiAgICAgICAgICAgICAgdmFsID0gdmFsLnJlcGxhY2UoL1xcRC9nLCBcIlwiKTtcbiAgICAgKiAgICAgICAgICAgICAgdmFyIHJlZ0V4cFBhdHRlcm4gPSAvXihbMC05XXsyfSlcXC0/KFswLTldezJ9KT9cXC0/KFswLTldezJ9KT9cXC0/KFswLTldezJ9KT8vO1xuICAgICAqICAgICAgICAgICAgICByZXR1cm4gdmFsLnJlcGxhY2UocmVnRXhwUGF0dGVybiwgZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgKiAgICAgICAgICAgICAgICAgIHZhciBudmFsID0gW2FyZ3VtZW50c1sxXV07XG4gICAgICogICAgICAgICAgICAgICAgICBpZiAoYXJndW1lbnRzWzJdKSBudmFsLnB1c2goYXJndW1lbnRzWzJdKTtcbiAgICAgKiAgICAgICAgICAgICAgICAgIGlmIChhcmd1bWVudHNbM10pIG52YWwucHVzaChhcmd1bWVudHNbM10pO1xuICAgICAqICAgICAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50c1s0XSkgbnZhbC5wdXNoKGFyZ3VtZW50c1s0XSk7XG4gICAgICogICAgICAgICAgICAgICAgICByZXR1cm4gbnZhbC5qb2luKFwiLVwiKTtcbiAgICAgKiAgICAgICAgICAgICAgfSk7XG4gICAgICogICAgICAgICAgfVxuICAgICAqICAgICAgfVxuICAgICAqICB9XG4gICAgICogfSk7XG4gICAqIGBgYFxuICAgKi9cbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIC8qKlxuICAgICAqIEBtZW1iZXIge0pTT059XG4gICAgICogQHBhcmFtIGNvbmZpZ1xuICAgICAqIEBwYXJhbSBbY29uZmlnLmFuaW1hdGVUaW1lPTI1MF1cbiAgICAgKi9cbiAgICB0aGlzLmNvbmZpZyA9IHtcbiAgICAgIGFuaW1hdGVUaW1lOiAyNTBcbiAgICB9O1xuICAgIGpRdWVyeS5leHRlbmQodHJ1ZSwgdGhpcy5jb25maWcsIGNvbmZpZyk7XG5cbiAgICAvLyDrqaTrsoQg67OA7IiYIOy0iOq4sO2ZlFxuICAgIC8qKlxuICAgICAqIEBtZW1iZXJcbiAgICAgKiBAdHlwZSB7QXJyYXl9XG4gICAgICovXG4gICAgdGhpcy5xdWV1ZSA9IFtdO1xuICAgIHRoaXMub3BlblRpbWVyID0gbnVsbDtcbiAgICB0aGlzLmNsb3NlVGltZXIgPSBudWxsO1xuXG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKi9cbiAgaW5pdCgpIHtcblxuICAgIC8vIGluaXQg7Zi47LacIOyXrOu2gFxuICAgIHRoaXMuaW5pdE9uY2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEByZXR1cm4ge0FYNlVJRm9ybWF0dGVyfVxuICAgKi9cbiAgaW5pdE9uY2UoKSB7XG4gICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpIHJldHVybiB0aGlzO1xuICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAgICogQHBhcmFtIHtFbGVtZW50fSBvcHRzLnRhcmdldFxuICAgKiBAcmV0dXJuIHtBWDZVSUZvcm1hdHRlcn1cbiAgICovXG4gIGJpbmQob3B0cykge1xuICAgIGxldCBmb3JtYXR0ZXJDb25maWcgPSB7fSwgb3B0SWR4O1xuXG4gICAgLy8g7IKs7Jqp7J6QIO2PrOuplO2EsCDssrTtgaxcbiAgICB0aGlzLmN1c3RvbUZvcm1hdHRlciA9IEFYNlVJRm9ybWF0dGVyLmdldEZvcm1hdHRlcigpO1xuXG4gICAgalF1ZXJ5LmV4dGVuZCh0cnVlLCBmb3JtYXR0ZXJDb25maWcsIHRoaXMuY29uZmlnKTtcbiAgICBpZiAob3B0cykgalF1ZXJ5LmV4dGVuZCh0cnVlLCBmb3JtYXR0ZXJDb25maWcsIG9wdHMpO1xuICAgIG9wdHMgPSBmb3JtYXR0ZXJDb25maWc7XG5cbiAgICBpZiAoIW9wdHMudGFyZ2V0KSB7XG4gICAgICBjb25zb2xlLmxvZyhpbmZvLmdldEVycm9yKFwiYXg2Zm9ybWF0dGVyXCIsIFwiNDAxXCIsIFwiYmluZFwiKSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgb3B0cy4kdGFyZ2V0ID0galF1ZXJ5KG9wdHMudGFyZ2V0KTtcbiAgICBpZighb3B0cy4kdGFyZ2V0LmdldCgwKSl7XG4gICAgICBjb25zb2xlLmxvZyhpbmZvLmdldEVycm9yKFwiYXg2Zm9ybWF0dGVyXCIsIFwiNDAxXCIsIFwiY2FuJ3QgZm91bmQgdGFyZ2V0IGVsZW1lbnRcIikpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaWYgKG9wdHMuJHRhcmdldC5nZXQoMCkudGFnTmFtZSA9PSBcIklOUFVUXCIpIHtcbiAgICAgIG9wdHMuJGlucHV0ID0gb3B0cy4kdGFyZ2V0O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIG9wdHMuJGlucHV0ID0gb3B0cy4kdGFyZ2V0LmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJyk7XG4gICAgICBpZiAob3B0cy4kaW5wdXQubGVuZ3RoID4gMSkge1xuICAgICAgICBvcHRzLiRpbnB1dC5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBvcHRzLnRhcmdldCA9IHRoaXM7XG4gICAgICAgICAgc2VsZi5iaW5kKG9wdHMpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgb3B0cy4kaW5wdXQgPSAob3B0cy4kdGFyZ2V0LmdldCgwKS50YWdOYW1lID09IFwiSU5QVVRcIikgPyBvcHRzLiR0YXJnZXQgOiBvcHRzLiR0YXJnZXQuZmluZCgnaW5wdXRbdHlwZT1cInRleHRcIl0nKTtcblxuICAgIGlmICghb3B0cy5pZCkgb3B0cy5pZCA9IG9wdHMuJGlucHV0LmRhdGEoXCJheDYtZm9ybWF0dGVyXCIpO1xuXG4gICAgaWYgKCFvcHRzLmlkKSB7XG4gICAgICBvcHRzLmlkID0gJ2F4Ni1mb3JtYXR0ZXItJyArIEFYNlVJQ29yZS5nZXRJbnN0YW5jZUlkKCk7XG4gICAgICBvcHRzLiRpbnB1dC5kYXRhKFwiYXg2LWZvcm1hdHRlclwiLCBvcHRzLmlkKTtcbiAgICB9XG4gICAgb3B0SWR4ID0gVS5zZWFyY2godGhpcy5xdWV1ZSwgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaWQgPT0gb3B0cy5pZDtcbiAgICB9KTtcblxuICAgIGlmIChvcHRJZHggPT09IC0xKSB7XG4gICAgICB0aGlzLnF1ZXVlLnB1c2gob3B0cyk7XG4gICAgICBiaW5kRm9ybWF0dGVyVGFyZ2V0LmNhbGwodGhpcywgdGhpcy5xdWV1ZVt0aGlzLnF1ZXVlLmxlbmd0aCAtIDFdLCB0aGlzLnF1ZXVlLmxlbmd0aCAtIDEpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMucXVldWVbb3B0SWR4XSA9IG9wdHM7XG4gICAgICBiaW5kRm9ybWF0dGVyVGFyZ2V0LmNhbGwodGhpcywgdGhpcy5xdWV1ZVtvcHRJZHhdLCBvcHRJZHgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQHJldHVybiB7QVg2VUlGb3JtYXR0ZXJ9XG4gICAqL1xuICBmb3JtYXR0aW5nKCkge1xuICAgIGxldCBxdWVJZHggPSAoVS5pc051bWJlcihib3VuZElEKSkgPyBib3VuZElEIDogZ2V0UXVlSWR4LmNhbGwodGhpcywgYm91bmRJRCk7XG4gICAgaWYgKHF1ZUlkeCA9PT0gLTEpIHtcbiAgICAgIGxldCBpID0gdGhpcy5xdWV1ZS5sZW5ndGg7XG4gICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIGZvcm1hdHRlckV2ZW50LmJsdXIuY2FsbCh0aGlzLCB0aGlzLnF1ZXVlW2ldLCBpLCBudWxsLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9ybWF0dGVyRXZlbnQuYmx1ci5jYWxsKHRoaXMsIHRoaXMucXVldWVbcXVlSWR4XSwgcXVlSWR4LCBudWxsLCB0cnVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAcGFyYW0gb3B0c1xuICAgKiBAcmV0dXJuIHtBWDZVSUZvcm1hdHRlcn1cbiAgICovXG4gIHVuYmluZChvcHRzKSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgIGxldCBvcHRJZHg7XG5cbiAgICBpZiAoIW9wdHMudGFyZ2V0KSB7XG4gICAgICBjb25zb2xlLmxvZyhpbmZvLmdldEVycm9yKFwiYXg2Zm9ybWF0dGVyXCIsIFwiNDAxXCIsIFwidW5iaW5kXCIpKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBvcHRzLiR0YXJnZXQgPSBqUXVlcnkob3B0cy50YXJnZXQpO1xuXG4gICAgaWYgKG9wdHMuJHRhcmdldC5nZXQoMCkudGFnTmFtZSA9PSBcIklOUFVUXCIpIHtcbiAgICAgIG9wdHMuJGlucHV0ID0gb3B0cy4kdGFyZ2V0O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIG9wdHMuJGlucHV0ID0gb3B0cy4kdGFyZ2V0LmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJyk7XG4gICAgICBpZiAob3B0cy4kaW5wdXQubGVuZ3RoID4gMSkge1xuICAgICAgICBvcHRzLiRpbnB1dC5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBvcHRzLnRhcmdldCA9IHRoaXM7XG4gICAgICAgICAgc2VsZi51bmJpbmQob3B0cyk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBvcHRzLiRpbnB1dCA9IChvcHRzLiR0YXJnZXQuZ2V0KDApLnRhZ05hbWUgPT0gXCJJTlBVVFwiKSA/IG9wdHMuJHRhcmdldCA6IG9wdHMuJHRhcmdldC5maW5kKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpO1xuICAgIG9wdHMuaWQgPSBvcHRzLiRpbnB1dC5kYXRhKFwiYXg2LWZvcm1hdHRlclwiKTtcblxuICAgIGlmIChvcHRzLmlkKSB7XG4gICAgICBvcHRJZHggPSBVLnNlYXJjaCh0aGlzLnF1ZXVlLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlkID09IG9wdHMuaWQ7XG4gICAgICB9KTtcblxuICAgICAgdW5iaW5kRm9ybWF0dGVyVGFyZ2V0LmNhbGwodGhpcywgdGhpcy5xdWV1ZVtvcHRJZHhdKTtcbiAgICAgIHRoaXMucXVldWUuc3BsaWNlKG9wdElkeCwgMSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQHN0YXRpY1xuICAgKiBAcGFyYW0gX2Zvcm1hdHRlclxuICAgKi9cbiAgc3RhdGljIHNldEZvcm1hdHRlcihfZm9ybWF0dGVyKSB7XG4gICAgcmV0dXJuIGZvcm1hdHRlciA9IE9iamVjdC5hc3NpZ24oZm9ybWF0dGVyLCBfZm9ybWF0dGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAc3RhdGljXG4gICAqIEByZXR1cm4ge3t9fVxuICAgKi9cbiAgc3RhdGljIGdldEZvcm1hdHRlcigpIHtcbiAgICByZXR1cm4gZm9ybWF0dGVyIHx8IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIEBzdGF0aWNcbiAgICogQHJldHVybiB7e319XG4gICAqL1xuICBzdGF0aWMgZ2V0Q3RybEtleXMoKXtcbiAgICByZXR1cm4gRk9STUFUVEVSLmN0cmxLZXlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBzdGF0aWNcbiAgICogQHJldHVybiB7e319XG4gICAqL1xuICBzdGF0aWMgZ2V0TnVtS2V5cygpe1xuICAgIHJldHVybiBGT1JNQVRURVIubnVtS2V5cztcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBWDZVSUZvcm1hdHRlcjtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vc3JjL0FYNlVJRm9ybWF0dGVyLmpzIiwiaW1wb3J0IFUgZnJvbSBcIi4uL0FYNlV0aWxcIjtcblxubGV0IFRPREFZID0gbmV3IERhdGUoKTtcblxuLyoqXG4gKiBAbW9kdWxlIEFYNlVJRm9ybWF0dGVyX2Zvcm1hdHRlclxuICovXG5cbmxldCBjdHJsS2V5cyA9IHtcbiAgXCIxOFwiOiBcIktFWV9BTFRcIixcbiAgXCI4XCI6IFwiS0VZX0JBQ0tTUEFDRVwiLFxuICBcIjE3XCI6IFwiS0VZX0NPTlRST0xcIixcbiAgXCI0NlwiOiBcIktFWV9ERUxFVEVcIixcbiAgXCI0MFwiOiBcIktFWV9ET1dOXCIsXG4gIFwiMzVcIjogXCJLRVlfRU5EXCIsXG4gIFwiMTg3XCI6IFwiS0VZX0VRVUFMXCIsXG4gIFwiMjdcIjogXCJLRVlfRVNDXCIsXG4gIFwiMzZcIjogXCJLRVlfSE9NRVwiLFxuICBcIjQ1XCI6IFwiS0VZX0lOU0VSVFwiLFxuICBcIjM3XCI6IFwiS0VZX0xFRlRcIixcbiAgXCIxODlcIjogXCJLRVlfTUlOVVNcIixcbiAgXCIzNFwiOiBcIktFWV9QQUdFRE9XTlwiLFxuICBcIjMzXCI6IFwiS0VZX1BBR0VVUFwiLFxuICAvLyBcIjE5MFwiOiBcIktFWV9QRVJJT0RcIixcbiAgXCIxM1wiOiBcIktFWV9SRVRVUk5cIixcbiAgXCIzOVwiOiBcIktFWV9SSUdIVFwiLFxuICBcIjE2XCI6IFwiS0VZX1NISUZUXCIsXG4gIC8vIFwiMzJcIjogXCJLRVlfU1BBQ0VcIixcbiAgXCI5XCI6IFwiS0VZX1RBQlwiLFxuICBcIjM4XCI6IFwiS0VZX1VQXCIsXG4gIFwiOTFcIjogXCJLRVlfV0lORE9XXCJcbiAgLy9cIjEwN1wiIDogXCJOVU1QQURfQUREXCIsXG4gIC8vXCIxOTRcIiA6IFwiTlVNUEFEX0NPTU1BXCIsXG4gIC8vXCIxMTBcIiA6IFwiTlVNUEFEX0RFQ0lNQUxcIixcbiAgLy9cIjExMVwiIDogXCJOVU1QQURfRElWSURFXCIsXG4gIC8vXCIxMlwiIDogXCJOVU1QQURfRVFVQUxcIixcbiAgLy9cIjEwNlwiIDogXCJOVU1QQURfTVVMVElQTFlcIixcbiAgLy9cIjEwOVwiIDogXCJOVU1QQURfU1VCVFJBQ1RcIlxufTtcblxubGV0IG51bUtleXMgPSB7XG4gICc0OCc6IDEsICc0OSc6IDEsICc1MCc6IDEsICc1MSc6IDEsICc1Mic6IDEsICc1Myc6IDEsICc1NCc6IDEsICc1NSc6IDEsICc1Nic6IDEsICc1Nyc6IDEsXG4gICc5Nic6IDEsICc5Nyc6IDEsICc5OCc6IDEsICc5OSc6IDEsICcxMDAnOiAxLCAnMTAxJzogMSwgJzEwMic6IDEsICcxMDMnOiAxLCAnMTA0JzogMSwgJzEwNSc6IDFcbn07XG5cbmxldCBwYXR0ZXJuX21vbmV5ID0ge1xuICBnZXRFbnRlcmFibGVLZXlDb2RlczogZnVuY3Rpb24gKF9vcHRzKSB7XG4gICAgbGV0IGVudGVyYWJsZUtleUNvZGVzID0ge1xuICAgICAgJzE4OCc6ICcsJ1xuICAgIH07XG4gICAgaWYgKF9vcHRzLnBhdHRlcm5Bcmd1bWVudCA9PSBcImludFwiKSB7XG4gICAgICAvLyDshozsiJjsoJAg7J6F66ClIOyViOuQqFxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGVudGVyYWJsZUtleUNvZGVzWycxOTAnXSA9IFwiLlwiOyAvLyDshozsiJjsoJAg7J6F66ClIO2XiOyaqVxuICAgIH1cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihlbnRlcmFibGVLZXlDb2RlcywgY3RybEtleXMsIG51bUtleXMpO1xuICB9LFxuICBnZXRQYXR0ZXJuVmFsdWU6IGZ1bmN0aW9uIChfb3B0cywgb3B0SWR4LCBlLCB2YWwsIGVUeXBlKSB7XG4gICAgdmFsID0gdmFsLnJlcGxhY2UoL1teMC05XlxcLl5cXC1dL2csIFwiXCIpO1xuICAgIGxldCByZWdFeHBQYXR0ZXJuID0gbmV3IFJlZ0V4cCgnKFswLTldKShbMC05XVswLTldWzAtOV1bLC5dKScpLFxuICAgICAgYXJyTnVtYmVyID0gdmFsLnNwbGl0KCcuJyksXG4gICAgICByZXR1cm5WYWx1ZTtcblxuICAgIGFyck51bWJlclswXSArPSAnLic7XG5cbiAgICBkbyB7XG4gICAgICBhcnJOdW1iZXJbMF0gPSBhcnJOdW1iZXJbMF0ucmVwbGFjZShyZWdFeHBQYXR0ZXJuLCAnJDEsJDInKTtcbiAgICB9IHdoaWxlIChyZWdFeHBQYXR0ZXJuLnRlc3QoYXJyTnVtYmVyWzBdKSk7XG5cbiAgICBpZiAoYXJyTnVtYmVyLmxlbmd0aCA+IDEpIHtcbiAgICAgIGlmIChVLmlzTnVtYmVyKF9vcHRzLm1heFJvdW5kKSkge1xuICAgICAgICByZXR1cm5WYWx1ZSA9IGFyck51bWJlclswXSArIFUubGVmdChhcnJOdW1iZXJbMV0sIF9vcHRzLm1heFJvdW5kKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZXR1cm5WYWx1ZSA9IGFyck51bWJlci5qb2luKCcnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm5WYWx1ZSA9IGFyck51bWJlclswXS5zcGxpdCgnLicpWzBdO1xuICAgIH1cblxuICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgfVxufTtcblxubGV0IHBhdHRlcm5fbnVtYmVyID0ge1xuICBnZXRFbnRlcmFibGVLZXlDb2RlczogZnVuY3Rpb24gZ2V0RW50ZXJhYmxlS2V5Q29kZXMoX29wdHMpIHtcbiAgICBsZXQgZW50ZXJhYmxlS2V5Q29kZXMgPSB7XG4gICAgICAnMTkwJzogJy4nLFxuICAgICAgJzExMCc6ICcuJ1xuXG4gICAgfTtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihlbnRlcmFibGVLZXlDb2RlcywgY3RybEtleXMsIG51bUtleXMpO1xuICB9LFxuICBnZXRQYXR0ZXJuVmFsdWU6IGZ1bmN0aW9uIChfb3B0cywgb3B0SWR4LCBlLCB2YWwsIGVUeXBlKSB7XG4gICAgdmFsID0gdmFsLnJlcGxhY2UoL1teMC05XlxcLl5cXC1dL2csIFwiXCIpO1xuICAgIGxldCBhcnJOdW1iZXIgPSB2YWwuc3BsaXQoJy4nKSxcbiAgICAgIHJldHVyblZhbHVlXG4gICAgO1xuXG4gICAgYXJyTnVtYmVyWzBdICs9IFwiLlwiO1xuXG4gICAgaWYgKGFyck51bWJlci5sZW5ndGggPiAxKSB7XG4gICAgICBpZiAoVS5pc051bWJlcihfb3B0cy5tYXhSb3VuZCkpIHtcbiAgICAgICAgcmV0dXJuVmFsdWUgPSBhcnJOdW1iZXJbMF0gKyBVLmxlZnQoYXJyTnVtYmVyWzFdLCBfb3B0cy5tYXhSb3VuZCk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuVmFsdWUgPSBhcnJOdW1iZXIuam9pbignJyk7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuVmFsdWUgPSBhcnJOdW1iZXJbMF0uc3BsaXQoJy4nKVswXTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gIH1cbn07XG5cbmxldCBwYXR0ZXJuX2RhdGUgPSB7XG4gIGdldEVudGVyYWJsZUtleUNvZGVzOiBmdW5jdGlvbiAoX29wdHMpIHtcbiAgICBsZXQgZW50ZXJhYmxlS2V5Q29kZXMgPSB7XG4gICAgICAnMTg5JzogJy0nLCAnMTkxJzogJy8nXG4gICAgfTtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihlbnRlcmFibGVLZXlDb2RlcywgY3RybEtleXMsIG51bUtleXMpO1xuICB9LFxuICBnZXRQYXR0ZXJuVmFsdWU6IGZ1bmN0aW9uIChfb3B0cywgb3B0SWR4LCBlLCB2YWwsIGVUeXBlKSB7XG4gICAgdmFsID0gdmFsLnJlcGxhY2UoL1xcRC9nLCBcIlwiKTtcbiAgICBpZiAodmFsID09IFwiXCIpIHJldHVybiB2YWw7XG4gICAgbGV0IHJlZ0V4cFBhdHRlcm4gPSAvXihbMC05XXs0fSlcXC0/KFswLTldezEsMn0pP1xcLT8oWzAtOV17MSwyfSk/LiokLztcblxuICAgIGlmIChfb3B0cy5wYXR0ZXJuQXJndW1lbnQgPT0gXCJ0aW1lXCIpIHtcbiAgICAgIHJlZ0V4cFBhdHRlcm4gPSAvXihbMC05XXs0fSlcXC0/KFswLTldezEsMn0pP1xcLT8oWzAtOV17MSwyfSk/ID8oWzAtOV17MSwyfSk/Oj8oWzAtOV17MSwyfSk/Oj8oWzAtOV17MSwyfSk/LiokLztcbiAgICB9IGVsc2UgaWYgKF9vcHRzLnBhdHRlcm5Bcmd1bWVudCA9PSBcInllYXJcIikge1xuICAgICAgcmVnRXhwUGF0dGVybiA9IC9eKFswLTldezAsNH0pPy4qJC87XG4gICAgfSBlbHNlIGlmIChfb3B0cy5wYXR0ZXJuQXJndW1lbnQgPT0gXCJtb250aFwiKSB7XG4gICAgICByZWdFeHBQYXR0ZXJuID0gL14oWzAtOV17NH0pXFwtPyhbMC05XXsxLDJ9KT8uKiQvO1xuICAgIH1cblxuICAgIGxldCBtYXRjaGVkUGF0dGVybiA9IHZhbC5tYXRjaChyZWdFeHBQYXR0ZXJuKSxcbiAgICAgIHJldHVyblZhbHVlID0gXCJcIixcbiAgICAgIGluc3BlY3RWYWx1ZSA9IGZ1bmN0aW9uICh2YWwsIGZvcm1hdCwgaW5zcGVjdCwgZGF0YSkge1xuICAgICAgICBsZXQgX3ZhbCA9IHtcbiAgICAgICAgICAnWSc6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHYgPT0gXCJ1bmRlZmluZWRcIikgdiA9IFRPREFZLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgICAgICBpZiAodiA9PSAnJyB8fCB2ID09ICcwMDAwJykgdiA9IFRPREFZLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgICAgICByZXR1cm4gKHYubGVuZ3RoIDwgNCkgPyBVLnNldERpZ2l0KHYsIDQpIDogdjtcbiAgICAgICAgICB9LFxuICAgICAgICAgICdNJzogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdiA9PSBcInVuZGVmaW5lZFwiKSB2ID0gVE9EQVkuZ2V0TW9udGgoKSArIDE7XG4gICAgICAgICAgICByZXR1cm4gdiA+IDEyID8gMTIgOiB2ID09IDAgPyAnMDEnIDogVS5zZXREaWdpdCh2LCAyKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgICdEJzogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdiA9PSBcInVuZGVmaW5lZFwiKSB2ID0gVE9EQVkuZ2V0RGF0ZSgpICsgMTtcbiAgICAgICAgICAgIGxldCBkTGVuID0gVS5kYXlzT2ZNb250aChkYXRhWzFdLCBkYXRhWzJdIC0gMSk7XG4gICAgICAgICAgICByZXR1cm4gdiA+IGRMZW4gPyBkTGVuIDogdiA9PSAwID8gJzAxJyA6IFUuc2V0RGlnaXQodiwgMik7XG4gICAgICAgICAgfSxcbiAgICAgICAgICAnaCc6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICBpZiAoIXYpIHYgPSAwO1xuICAgICAgICAgICAgcmV0dXJuIHYgPiAyMyA/IDIzIDogVS5zZXREaWdpdCh2LCAyKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgICdtJzogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgIGlmICghdikgdiA9IDA7XG4gICAgICAgICAgICByZXR1cm4gdiA+IDU5ID8gNTkgOiBVLnNldERpZ2l0KHYsIDIpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgJ3MnOiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgaWYgKCF2KSB2ID0gMDtcbiAgICAgICAgICAgIHJldHVybiB2ID4gNTkgPyA1OSA6IFUuc2V0RGlnaXQodiwgMik7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gKGluc3BlY3QpID8gX3ZhbFtmb3JtYXRdKHZhbCkgOiB2YWw7XG4gICAgICB9O1xuXG4gICAgcmV0dXJuVmFsdWUgPSB2YWwucmVwbGFjZShyZWdFeHBQYXR0ZXJuLCBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgbGV0IG52YWwgPSBbXTtcblxuICAgICAgaWYgKF9vcHRzLnBhdHRlcm5Bcmd1bWVudCA9PSBcInllYXJcIikge1xuICAgICAgICBudmFsLnB1c2goaW5zcGVjdFZhbHVlKGFyZ3VtZW50c1sxXSwgXCJZXCIsIGVUeXBlKSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChfb3B0cy5wYXR0ZXJuQXJndW1lbnQgPT0gXCJtb250aFwiKSB7XG4gICAgICAgIG52YWwucHVzaChpbnNwZWN0VmFsdWUoYXJndW1lbnRzWzFdLCBcIllcIiwgZVR5cGUpKTtcbiAgICAgICAgaWYgKGFyZ3VtZW50c1syXSB8fCBlVHlwZSkgbnZhbC5wdXNoKCctJyArIGluc3BlY3RWYWx1ZShhcmd1bWVudHNbMl0sIFwiTVwiLCBlVHlwZSkpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoX29wdHMucGF0dGVybkFyZ3VtZW50ID09IFwidGltZVwiKSB7XG4gICAgICAgIG52YWwucHVzaChpbnNwZWN0VmFsdWUoYXJndW1lbnRzWzFdLCBcIllcIiwgZVR5cGUpKTtcbiAgICAgICAgaWYgKGFyZ3VtZW50c1syXSB8fCBlVHlwZSkgbnZhbC5wdXNoKCctJyArIGluc3BlY3RWYWx1ZShhcmd1bWVudHNbMl0sIFwiTVwiLCBlVHlwZSkpO1xuICAgICAgICBpZiAoYXJndW1lbnRzWzNdIHx8IGVUeXBlKSBudmFsLnB1c2goJy0nICsgaW5zcGVjdFZhbHVlKGFyZ3VtZW50c1szXSwgXCJEXCIsIGVUeXBlLCBhcmd1bWVudHMpKTtcbiAgICAgICAgaWYgKGFyZ3VtZW50c1s0XSB8fCBlVHlwZSkgbnZhbC5wdXNoKCcgJyArIGluc3BlY3RWYWx1ZShhcmd1bWVudHNbNF0sIFwiaFwiLCBlVHlwZSkpO1xuICAgICAgICBpZiAoYXJndW1lbnRzWzVdIHx8IGVUeXBlKSBudmFsLnB1c2goJzonICsgaW5zcGVjdFZhbHVlKGFyZ3VtZW50c1s1XSwgXCJtXCIsIGVUeXBlKSk7XG4gICAgICAgIGlmIChhcmd1bWVudHNbNl0gfHwgZVR5cGUpIG52YWwucHVzaCgnOicgKyBpbnNwZWN0VmFsdWUoYXJndW1lbnRzWzZdLCBcInNcIiwgZVR5cGUpKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBudmFsLnB1c2goaW5zcGVjdFZhbHVlKGFyZ3VtZW50c1sxXSwgXCJZXCIsIGVUeXBlKSk7XG4gICAgICAgIGlmIChhcmd1bWVudHNbMl0gfHwgZVR5cGUpIG52YWwucHVzaCgnLScgKyBpbnNwZWN0VmFsdWUoYXJndW1lbnRzWzJdLCBcIk1cIiwgZVR5cGUpKTtcbiAgICAgICAgaWYgKGFyZ3VtZW50c1szXSB8fCBlVHlwZSkgbnZhbC5wdXNoKCctJyArIGluc3BlY3RWYWx1ZShhcmd1bWVudHNbM10sIFwiRFwiLCBlVHlwZSwgYXJndW1lbnRzKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnZhbC5qb2luKCcnKTtcbiAgICB9KTtcblxuICAgIGlmIChlVHlwZSA9PSAnYmx1cicgJiYgIW1hdGNoZWRQYXR0ZXJuKSB7XG4gICAgICByZXR1cm5WYWx1ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBudmFsID0gW107XG5cbiAgICAgICAgaWYgKF9vcHRzLnBhdHRlcm5Bcmd1bWVudCA9PSBcInllYXJcIikge1xuICAgICAgICAgIG52YWwucHVzaChpbnNwZWN0VmFsdWUoMCwgXCJZXCIsIGVUeXBlKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoX29wdHMucGF0dGVybkFyZ3VtZW50ID09IFwibW9udGhcIikge1xuICAgICAgICAgIG52YWwucHVzaChpbnNwZWN0VmFsdWUoMCwgXCJZXCIsIGVUeXBlKSk7XG4gICAgICAgICAgbnZhbC5wdXNoKCctJyArIGluc3BlY3RWYWx1ZSgwLCBcIk1cIiwgZVR5cGUpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChfb3B0cy5wYXR0ZXJuQXJndW1lbnQgPT0gXCJ0aW1lXCIpIHtcbiAgICAgICAgICBudmFsLnB1c2goaW5zcGVjdFZhbHVlKDAsIFwiWVwiLCBlVHlwZSkpO1xuICAgICAgICAgIG52YWwucHVzaCgnLScgKyBpbnNwZWN0VmFsdWUoMCwgXCJNXCIsIGVUeXBlKSk7XG4gICAgICAgICAgbnZhbC5wdXNoKCctJyArIGluc3BlY3RWYWx1ZSgwLCBcIkRcIiwgZVR5cGUsIGFyZ3VtZW50cykpO1xuICAgICAgICAgIG52YWwucHVzaCgnICcgKyBpbnNwZWN0VmFsdWUoMCwgXCJoXCIsIGVUeXBlKSk7XG4gICAgICAgICAgbnZhbC5wdXNoKCc6JyArIGluc3BlY3RWYWx1ZSgwLCBcIm1cIiwgZVR5cGUpKTtcbiAgICAgICAgICBudmFsLnB1c2goJzonICsgaW5zcGVjdFZhbHVlKDAsIFwic1wiLCBlVHlwZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG52YWwucHVzaChpbnNwZWN0VmFsdWUoMCwgXCJZXCIsIGVUeXBlKSk7XG4gICAgICAgICAgbnZhbC5wdXNoKCctJyArIGluc3BlY3RWYWx1ZSgwLCBcIk1cIiwgZVR5cGUpKTtcbiAgICAgICAgICBudmFsLnB1c2goJy0nICsgaW5zcGVjdFZhbHVlKDAsIFwiRFwiLCBlVHlwZSwgYXJndW1lbnRzKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG52YWwuam9pbignJyk7XG4gICAgICB9KSgpO1xuICAgIH1cbiAgICBlbHNlIGlmICghbWF0Y2hlZFBhdHRlcm4pIHJldHVyblZhbHVlID0gKHJldHVyblZhbHVlLmxlbmd0aCA+IDQpID8gVS5sZWZ0KHJldHVyblZhbHVlLCA0KSA6IHJldHVyblZhbHVlO1xuXG4gICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICB9XG59O1xuXG5sZXQgcGF0dGVybl90aW1lID0ge1xuICBnZXRFbnRlcmFibGVLZXlDb2RlczogZnVuY3Rpb24gKF9vcHRzKSB7XG4gICAgbGV0IGVudGVyYWJsZUtleUNvZGVzID0ge1xuICAgICAgJzE4Nic6ICc6J1xuICAgIH07XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oZW50ZXJhYmxlS2V5Q29kZXMsIGN0cmxLZXlzLCBudW1LZXlzKTtcbiAgfSxcbiAgZ2V0UGF0dGVyblZhbHVlOiBmdW5jdGlvbiAoX29wdHMsIG9wdElkeCwgZSwgdmFsLCBlVHlwZSkge1xuICAgIHZhbCA9IHZhbC5yZXBsYWNlKC9cXEQvZywgXCJcIik7XG4gICAgbGV0IHJlZ0V4cFBhdHRlcm4gPSAvXihbMC05XXsxLDJ9KT86PyhbMC05XXsxLDJ9KT86PyhbMC05XXsxLDJ9KT8uKiQvO1xuXG4gICAgbGV0IG1hdGNoZWRQYXR0ZXJuID0gdmFsLm1hdGNoKHJlZ0V4cFBhdHRlcm4pLFxuICAgICAgcmV0dXJuVmFsdWUgPSB2YWwucmVwbGFjZShyZWdFeHBQYXR0ZXJuLCBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICBsZXQgbnZhbCA9IFthcmd1bWVudHNbMV1dO1xuICAgICAgICBpZiAoYXJndW1lbnRzWzJdKSBudmFsLnB1c2goJzonICsgYXJndW1lbnRzWzJdKTtcbiAgICAgICAgaWYgKGFyZ3VtZW50c1szXSkgbnZhbC5wdXNoKCc6JyArIGFyZ3VtZW50c1szXSk7XG4gICAgICAgIHJldHVybiBudmFsLmpvaW4oJycpO1xuICAgICAgfSk7XG5cbiAgICBpZiAoIW1hdGNoZWRQYXR0ZXJuKSByZXR1cm5WYWx1ZSA9IChyZXR1cm5WYWx1ZS5sZW5ndGggPiAyKSA/IFUubGVmdChyZXR1cm5WYWx1ZSwgMikgOiByZXR1cm5WYWx1ZTtcblxuICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgfVxufTtcblxubGV0IHBhdHRlcm5fYml6bm8gPSB7XG4gIGdldEVudGVyYWJsZUtleUNvZGVzOiBmdW5jdGlvbiAoX29wdHMpIHtcbiAgICBsZXQgZW50ZXJhYmxlS2V5Q29kZXMgPSB7XG4gICAgICAnMTg5JzogJy0nXG4gICAgfTtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihlbnRlcmFibGVLZXlDb2RlcywgY3RybEtleXMsIG51bUtleXMpO1xuICB9LFxuICBnZXRQYXR0ZXJuVmFsdWU6IGZ1bmN0aW9uIChfb3B0cywgb3B0SWR4LCBlLCB2YWwsIGVUeXBlKSB7XG4gICAgdmFsID0gdmFsLnJlcGxhY2UoL1xcRC9nLCBcIlwiKTtcbiAgICBsZXQgcmVnRXhwUGF0dGVybiA9IC9eKFswLTldezN9KVxcLT8oWzAtOV17MSwyfSk/XFwtPyhbMC05XXsxLDV9KT8uKiQvLFxuICAgICAgcmV0dXJuVmFsdWUgPSB2YWwucmVwbGFjZShyZWdFeHBQYXR0ZXJuLCBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICBsZXQgbnZhbCA9IFthcmd1bWVudHNbMV1dO1xuICAgICAgICBpZiAoYXJndW1lbnRzWzJdKSBudmFsLnB1c2goYXJndW1lbnRzWzJdKTtcbiAgICAgICAgaWYgKGFyZ3VtZW50c1szXSkgbnZhbC5wdXNoKGFyZ3VtZW50c1szXSk7XG4gICAgICAgIHJldHVybiBudmFsLmpvaW4oXCItXCIpO1xuICAgICAgfSk7XG5cbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gIH1cbn07XG5cbmxldCBwYXR0ZXJuX3Bob25lID0ge1xuICBnZXRFbnRlcmFibGVLZXlDb2RlczogZnVuY3Rpb24gKF9vcHRzKSB7XG4gICAgbGV0IGVudGVyYWJsZUtleUNvZGVzID0ge1xuICAgICAgJzE4OSc6ICctJywgJzE4OCc6ICcsJ1xuICAgIH07XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oZW50ZXJhYmxlS2V5Q29kZXMsIGN0cmxLZXlzLCBudW1LZXlzKTtcbiAgfSxcbiAgZ2V0UGF0dGVyblZhbHVlOiBmdW5jdGlvbiAoX29wdHMsIG9wdElkeCwgZSwgdmFsLCBlVHlwZSkge1xuICAgIHZhbCA9IHZhbC5yZXBsYWNlKC9cXEQvZywgXCJcIik7XG4gICAgbGV0IHJlZ0V4cFBhdHRlcm4zID0gL14oWzAtOV17M30pXFwtPyhbMC05XXsxLDR9KT9cXC0/KFswLTldezEsNH0pP1xcLT8oWzAtOV17MSw0fSk/XFwtPyhbMC05XXsxLDR9KT8vO1xuICAgIGlmICh2YWwuc3Vic3RyKDAsIDIpID09IFwiMDJcIikge1xuICAgICAgcmVnRXhwUGF0dGVybjMgPSAvXihbMC05XXsyfSlcXC0/KFswLTldezEsNH0pP1xcLT8oWzAtOV17MSw0fSk/XFwtPyhbMC05XXsxLDR9KT9cXC0/KFswLTldezEsNH0pPy87XG4gICAgfVxuXG4gICAgbGV0IHJldHVyblZhbHVlID0gdmFsLnJlcGxhY2UocmVnRXhwUGF0dGVybjMsIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICBsZXQgbnZhbCA9IFthcmd1bWVudHNbMV1dO1xuICAgICAgaWYgKGFyZ3VtZW50c1syXSkgbnZhbC5wdXNoKGFyZ3VtZW50c1syXSk7XG4gICAgICBpZiAoYXJndW1lbnRzWzNdKSBudmFsLnB1c2goYXJndW1lbnRzWzNdKTtcbiAgICAgIGlmIChhcmd1bWVudHNbNF0pIG52YWwucHVzaChhcmd1bWVudHNbNF0pO1xuICAgICAgaWYgKGFyZ3VtZW50c1s1XSkgbnZhbC5wdXNoKGFyZ3VtZW50c1s1XSk7XG4gICAgICByZXR1cm4gbnZhbC5qb2luKFwiLVwiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gIH1cbn07XG5cbmxldCBwYXR0ZXJuX2NyZWRpdCA9IHtcbiAgZ2V0RW50ZXJhYmxlS2V5Q29kZXM6IGZ1bmN0aW9uIChfb3B0cykge1xuICAgIGxldCBlbnRlcmFibGVLZXlDb2RlcyA9IHtcbiAgICAgICcxODknOiAnLSdcbiAgICB9O1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKGVudGVyYWJsZUtleUNvZGVzLCBjdHJsS2V5cywgbnVtS2V5cyk7XG4gIH0sXG4gIGdldFBhdHRlcm5WYWx1ZTogZnVuY3Rpb24gKF9vcHRzLCBvcHRJZHgsIGUsIHZhbCwgZVR5cGUpIHtcbiAgICB2YWwgPSB2YWwucmVwbGFjZSgvXFxEL2csIFwiXCIpLnN1YnN0cmluZygwLCAxNik7XG5cbiAgICBsZXQgcmVnRXhwUGF0dGVybjMgPSAvXihbMC05XXs0fSlcXC0/KFswLTldezR9KT9cXC0/KFswLTldezR9KT9cXC0/KFswLTldezR9KT8vLFxuICAgICAgcmV0dXJuVmFsdWUgPSB2YWwucmVwbGFjZShyZWdFeHBQYXR0ZXJuMywgZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgbGV0IG52YWwgPSBbYXJndW1lbnRzWzFdXTtcbiAgICAgICAgaWYgKGFyZ3VtZW50c1syXSkgbnZhbC5wdXNoKGFyZ3VtZW50c1syXSk7XG4gICAgICAgIGlmIChhcmd1bWVudHNbM10pIG52YWwucHVzaChhcmd1bWVudHNbM10pO1xuICAgICAgICBpZiAoYXJndW1lbnRzWzRdKSBudmFsLnB1c2goYXJndW1lbnRzWzRdKTtcbiAgICAgICAgcmV0dXJuIG52YWwuam9pbihcIi1cIik7XG4gICAgICB9KTtcbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gIH1cbn07XG5cbmxldCBwYXR0ZXJuX2N1c3RvbSA9IHtcbiAgZ2V0RW50ZXJhYmxlS2V5Q29kZXM6IGZ1bmN0aW9uIChfb3B0cykge1xuICAgIGlmIChfb3B0cy5nZXRFbnRlcmFibGVLZXlDb2Rlcykge1xuICAgICAgcmV0dXJuIF9vcHRzLmdldEVudGVyYWJsZUtleUNvZGVzLmNhbGwoX29wdHMsIHskaW5wdXQ6IF9vcHRzLiRpbnB1dH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfSxcbiAgZ2V0UGF0dGVyblZhbHVlOiBmdW5jdGlvbiAoX29wdHMsIG9wdElkeCwgZSwgdmFsLCBlVHlwZSkge1xuICAgIGlmIChfb3B0cy5nZXRQYXR0ZXJuVmFsdWUpIHtcbiAgICAgIHJldHVybiBfb3B0cy5nZXRQYXR0ZXJuVmFsdWUuY2FsbChfb3B0cywge2V2ZW50OiBlLCAkaW5wdXQ6IF9vcHRzLiRpbnB1dCwgdmFsdWU6IHZhbH0pO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICAvKipcbiAgICog7Luo7Yq466GkIGtleWNvZGVzXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqIGxldCBjdHJsS2V5cyA9IHtcbiAgICBcIjE4XCI6IFwiS0VZX0FMVFwiLFxuICAgIFwiOFwiOiBcIktFWV9CQUNLU1BBQ0VcIixcbiAgICBcIjE3XCI6IFwiS0VZX0NPTlRST0xcIixcbiAgICBcIjQ2XCI6IFwiS0VZX0RFTEVURVwiLFxuICAgIFwiNDBcIjogXCJLRVlfRE9XTlwiLFxuICAgIFwiMzVcIjogXCJLRVlfRU5EXCIsXG4gICAgXCIxODdcIjogXCJLRVlfRVFVQUxcIixcbiAgICBcIjI3XCI6IFwiS0VZX0VTQ1wiLFxuICAgIFwiMzZcIjogXCJLRVlfSE9NRVwiLFxuICAgIFwiNDVcIjogXCJLRVlfSU5TRVJUXCIsXG4gICAgXCIzN1wiOiBcIktFWV9MRUZUXCIsXG4gICAgXCIxODlcIjogXCJLRVlfTUlOVVNcIixcbiAgICBcIjM0XCI6IFwiS0VZX1BBR0VET1dOXCIsXG4gICAgXCIzM1wiOiBcIktFWV9QQUdFVVBcIixcbiAgICBcIjEzXCI6IFwiS0VZX1JFVFVSTlwiLFxuICAgIFwiMzlcIjogXCJLRVlfUklHSFRcIixcbiAgICBcIjE2XCI6IFwiS0VZX1NISUZUXCIsXG4gICAgLy8gXCIzMlwiOiBcIktFWV9TUEFDRVwiLFxuICAgIFwiOVwiOiBcIktFWV9UQUJcIixcbiAgICBcIjM4XCI6IFwiS0VZX1VQXCIsXG4gICAgXCI5MVwiOiBcIktFWV9XSU5ET1dcIlxufTtcbiAgICogYGBgXG4gICAqL1xuICBjdHJsS2V5czogY3RybEtleXMsXG4gIC8qKlxuICAgKiDsiKvsnpDtgqTtjKjrk5wga2V5Y29kZXNcbiAgICogQGV4YW1wbGVcbiAgICogYGBganNcbiAgICogbGV0IG51bUtleXMgPSB7XG4gICAgJzQ4JzogMSwgJzQ5JzogMSwgJzUwJzogMSwgJzUxJzogMSwgJzUyJzogMSwgJzUzJzogMSwgJzU0JzogMSwgJzU1JzogMSwgJzU2JzogMSwgJzU3JzogMSxcbiAgICAnOTYnOiAxLCAnOTcnOiAxLCAnOTgnOiAxLCAnOTknOiAxLCAnMTAwJzogMSwgJzEwMSc6IDEsICcxMDInOiAxLCAnMTAzJzogMSwgJzEwNCc6IDEsICcxMDUnOiAxXG59O1xuICAgKiBgYGBcbiAgICovXG4gIG51bUtleXM6IG51bUtleXMsXG4gIC8qKlxuICAgKiDthrXtmZTtjKjthLRcbiAgICovXG4gIG1vbmV5OiBwYXR0ZXJuX21vbmV5LFxuICAvKipcbiAgICog7Iir7J6Q7Yyo7YS0XG4gICAqL1xuICBudW1iZXI6IHBhdHRlcm5fbnVtYmVyLFxuICAvKipcbiAgICog64Kg7Kec7Yyo7YS0XG4gICAqL1xuICBkYXRlOiBwYXR0ZXJuX2RhdGUsXG4gIC8qKlxuICAgKiDsi5zqsITtjKjthLRcbiAgICovXG4gIHRpbWU6IHBhdHRlcm5fdGltZSxcbiAgLyoqXG4gICAqIO2VnOq1rSDsgqzsl4XsnpAg67KI7Zi4IO2MqO2EtFxuICAgKi9cbiAgYml6bm86IHBhdHRlcm5fYml6bm8sXG4gIC8qKlxuICAgKiDsoITtmZTrsojtmLgg7Yyo7YS0XG4gICAqL1xuICBwaG9uZTogcGF0dGVybl9waG9uZSxcbiAgY3JlZGl0OiBwYXR0ZXJuX2NyZWRpdCxcbiAgLyoqXG4gICAqIOyCrOyaqeyekCDsoJXsnZgg7Yyo7YS0IOyCrOyaqeyLnFxuICAgKi9cbiAgY3VzdG9tOiBwYXR0ZXJuX2N1c3RvbVxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vc3JjL0FYNlVJRm9ybWF0dGVyL0FYNlVJRm9ybWF0dGVyX2Zvcm1hdHRlci5qcyIsImltcG9ydCBqUXVlcnkgZnJvbSBcImpxbWluXCI7XG5pbXBvcnQgQVg2VUlDb3JlIGZyb20gXCIuL0FYNlVJQ29yZVwiO1xuaW1wb3J0IGluZm8gZnJvbSBcIi4vQVg2SW5mb1wiO1xuaW1wb3J0IFUgZnJvbSBcIi4vQVg2VXRpbFwiO1xuaW1wb3J0IG11c3RhY2hlIGZyb20gXCIuL0FYNk11c3RhY2hlXCI7XG4vKiB+fn5+fn5+fn5+fn5+fn5+fn4gZW5kIG9mIGltcG9ydCAgfn5+fn5+fn5+fn5+fn5+fn5+fn4gKi9cblxubGV0IHRtcGwgPSB7XG4gIGZyYW1lKGNvbHVtbktleXMpIHtcbiAgICByZXR1cm4gYFxuPGRpdiBkYXRhLWF4NnVpLWNhbGVuZGFyPVwiXCIgY2xhc3M9XCJheDYtdWktY2FsZW5kYXIge3t0aGVtZX19XCIgZGF0YS1jYWxlbmRhci1lbHM9XCJyb290XCIgb25zZWxlY3RzdGFydD1cInJldHVybiBmYWxzZTtcIj5cbiAgICB7eyNjb250cm9sfX1cbiAgICA8ZGl2IGNsYXNzPVwiY2FsZW5kYXItY29udHJvbFwiIGRhdGEtY2FsZW5kYXItZWxzPVwiY29udHJvbFwiIHN0eWxlPVwie3tjb250cm9sQ1NTfX1cIj5cbiAgICAgICAgPGEgY2xhc3M9XCJkYXRlLW1vdmUtbGVmdFwiIGRhdGEtY2FsZW5kYXItbW92ZT1cImxlZnRcIiBzdHlsZT1cInt7Y29udHJvbEJ1dHRvbkNTU319XCI+e3t7bGVmdH19fTwvYT5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRhdGUtZGlzcGxheVwiIGRhdGEtY2FsZW5kYXItZWxzPVwiY29udHJvbC1kaXNwbGF5XCIgc3R5bGU9XCJ7e2NvbnRyb2xDU1N9fVwiPjwvZGl2PlxuICAgICAgICA8YSBjbGFzcz1cImRhdGUtbW92ZS1yaWdodFwiIGRhdGEtY2FsZW5kYXItbW92ZT1cInJpZ2h0XCIgc3R5bGU9XCJ7e2NvbnRyb2xCdXR0b25DU1N9fVwiPnt7e3JpZ2h0fX19PC9hPlxuICAgIDwvZGl2PlxuICAgIHt7L2NvbnRyb2x9fVxuICAgIDxkaXYgY2xhc3M9XCJjYWxlbmRhci1ib2R5XCIgZGF0YS1jYWxlbmRhci1lbHM9XCJib2R5XCI+PC9kaXY+XG48L2Rpdj5cbmA7XG4gIH0sXG4gIGRheShjb2x1bW5LZXlzKSB7XG4gICAgcmV0dXJuIGBcbjx0YWJsZSBkYXRhLWNhbGVuZGFyLXRhYmxlPVwiZGF5XCIgY2VsbHBhZGRpbmc9XCIwXCIgY2VsbHNwYWNpbmc9XCIwXCIgc3R5bGU9XCJ3aWR0aDoxMDAlO1wiPlxuICAgIDx0aGVhZD5cbiAgICAgICAgPHRyPlxuICAgICAgICB7eyN3ZWVrTmFtZXN9fVxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiY2FsZW5kYXItY29sLXt7Y29sfX1cIiBzdHlsZT1cImhlaWdodDoge3tjb2xIZWFkSGVpZ2h0fX1cIj5cbiAgICAgICAgICAgIHt7bGFiZWx9fVxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAge3svd2Vla05hbWVzfX1cbiAgICAgICAgPC90cj5cbiAgICA8L3RoZWFkPlxuICAgIDx0Ym9keT5cbiAgICAgICAgPHRyPlxuICAgICAgICAgICAge3sjbGlzdH19ICAgIFxuICAgICAgICAgICAge3sjaXNTdGFydE9mV2Vla319XG4gICAgICAgICAgICB7e15AZmlyc3R9fVxuICAgICAgICA8L3RyPlxuICAgICAgICA8dHI+XG4gICAgICAgICAgICB7ey9AZmlyc3R9fVxuICAgICAgICAgICAge3svaXNTdGFydE9mV2Vla319XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJjYWxlbmRhci1jb2wte3tjb2x9fVwiIHN0eWxlPVwie3tpdGVtU3R5bGVzfX1cIj5cbiAgICAgICAgICAgICAgICA8YSBjbGFzcz1cImNhbGVuZGFyLWl0ZW0tZGF5IHt7YWRkQ2xhc3N9fVwiIGRhdGEtY2FsZW5kYXItaXRlbS1kYXRlPVwie3t0aGlzRGF0ZX19XCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYWRkb24gYWRkb24taGVhZGVyXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICB7e3RoaXNEYXRhTGFiZWx9fVxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFkZG9uIGFkZG9uLWZvb3RlclwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAge3svbGlzdH19XG4gICAgICAgIDwvdHI+XG4gICAgPC90Ym9keT5cbjwvdGFibGU+XG5gO1xuICB9LFxuICBtb250aChjb2x1bW5LZXlzKSB7XG4gICAgcmV0dXJuIGBcbjx0YWJsZSBkYXRhLWNhbGVuZGFyLXRhYmxlPVwibW9udGhcIiBjZWxscGFkZGluZz1cIjBcIiBjZWxsc3BhY2luZz1cIjBcIiBzdHlsZT1cIndpZHRoOjEwMCU7XCI+XG4gICAgPHRoZWFkPlxuICAgICAgICA8dHI+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJjYWxlbmRhci1jb2wtMFwiIGNvbHNwYW49XCIzXCIgc3R5bGU9XCJoZWlnaHQ6IHt7Y29sSGVhZEhlaWdodH19XCI+XG4gICAgICAgICAgICB7e2NvbEhlYWRMYWJlbH19XG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICA8L3RyPlxuICAgIDwvdGhlYWQ+XG4gICAgPHRib2R5PlxuICAgICAgICA8dHI+XG4gICAgICAgICAgICB7eyNsaXN0fX0gICAgXG4gICAgICAgICAgICB7eyNpc1N0YXJ0T2ZSb3d9fVxuICAgICAgICAgICAge3teQGZpcnN0fX1cbiAgICAgICAgPC90cj5cbiAgICAgICAgPHRyPlxuICAgICAgICAgICAge3svQGZpcnN0fX1cbiAgICAgICAgICAgIHt7L2lzU3RhcnRPZlJvd319XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJjYWxlbmRhci1jb2wte3tjb2x9fVwiIHN0eWxlPVwie3tpdGVtU3R5bGVzfX1cIj5cbiAgICAgICAgICAgICAgICA8YSBjbGFzcz1cImNhbGVuZGFyLWl0ZW0tbW9udGgge3thZGRDbGFzc319XCIgZGF0YS1jYWxlbmRhci1pdGVtLW1vbnRoPVwie3t0aGlzTW9udGh9fVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFkZG9uXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICB7e3RoaXNNb250aExhYmVsfX1cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsdW5hclwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAge3svbGlzdH19XG4gICAgICAgIDwvdHI+XG4gICAgPC90Ym9keT5cbjwvdGFibGU+XG5gO1xuICB9LFxuICB5ZWFyKGNvbHVtbktleXMpIHtcbiAgICByZXR1cm4gYFxuPHRhYmxlIGRhdGEtY2FsZW5kYXItdGFibGU9XCJ5ZWFyXCIgY2VsbHBhZGRpbmc9XCIwXCIgY2VsbHNwYWNpbmc9XCIwXCIgc3R5bGU9XCJ3aWR0aDoxMDAlO1wiPlxuICAgIDx0aGVhZD5cbiAgICAgICAgPHRyPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiY2FsZW5kYXItY29sLTBcIiBjb2xzcGFuPVwiNFwiIHN0eWxlPVwiaGVpZ2h0OiB7e2NvbEhlYWRIZWlnaHR9fVwiPlxuICAgICAgICAgICAge3tjb2xIZWFkTGFiZWx9fVxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgPC90cj5cbiAgICA8L3RoZWFkPlxuICAgIDx0Ym9keT5cbiAgICAgICAgPHRyPlxuICAgICAgICAgICAge3sjbGlzdH19ICAgIFxuICAgICAgICAgICAge3sjaXNTdGFydE9mUm93fX1cbiAgICAgICAgICAgIHt7XkBmaXJzdH19XG4gICAgICAgIDwvdHI+XG4gICAgICAgIDx0cj5cbiAgICAgICAgICAgIHt7L0BmaXJzdH19XG4gICAgICAgICAgICB7ey9pc1N0YXJ0T2ZSb3d9fVxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiY2FsZW5kYXItY29sLXt7Y29sfX1cIiBzdHlsZT1cInt7aXRlbVN0eWxlc319XCI+XG4gICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJjYWxlbmRhci1pdGVtLXllYXIge3thZGRDbGFzc319XCIgZGF0YS1jYWxlbmRhci1pdGVtLXllYXI9XCJ7e3RoaXNZZWFyfX1cIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhZGRvblwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAge3t0aGlzWWVhckxhYmVsfX1cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsdW5hclwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAge3svbGlzdH19XG4gICAgICAgIDwvdHI+XG4gICAgPC90Ym9keT5cbjwvdGFibGU+XG5gO1xuICB9XG59O1xuXG5jb25zdCBvblN0YXRlQ2hhbmdlZCA9IGZ1bmN0aW9uIChvcHRzLCB0aGF0KSB7XG4gIGlmIChvcHRzICYmIG9wdHMub25TdGF0ZUNoYW5nZWQpIHtcbiAgICBvcHRzLm9uU3RhdGVDaGFuZ2VkLmNhbGwodGhhdCwgdGhhdCk7XG4gIH1cbiAgZWxzZSBpZiAodGhpcy5vblN0YXRlQ2hhbmdlZCkge1xuICAgIHRoaXMub25TdGF0ZUNoYW5nZWQuY2FsbCh0aGF0LCB0aGF0KTtcbiAgfVxuXG4gIHRoYXQgPSBudWxsO1xufTtcbmNvbnN0IGdldEZyYW1lID0gZnVuY3Rpb24gKCkge1xuICBsZXQgZGF0YSA9IGpRdWVyeS5leHRlbmQodHJ1ZSwge30sIHRoaXMuY29uZmlnLCB7XG4gICAgY29udHJvbENTUzoge30sXG4gICAgY29udHJvbEJ1dHRvbkNTUzoge31cbiAgfSk7XG5cbiAgZGF0YS5jb250cm9sQnV0dG9uQ1NTW1wiaGVpZ2h0XCJdID0gZGF0YS5jb250cm9sQ1NTW1wiaGVpZ2h0XCJdID0gVS5jc3NOdW1iZXIodGhpcy5jb25maWcuZGltZW5zaW9ucy5jb250cm9sSGVpZ2h0KTtcbiAgZGF0YS5jb250cm9sQnV0dG9uQ1NTW1wibGluZS1oZWlnaHRcIl0gPSBkYXRhLmNvbnRyb2xDU1NbXCJsaW5lLWhlaWdodFwiXSA9IFUuY3NzTnVtYmVyKHRoaXMuY29uZmlnLmRpbWVuc2lvbnMuY29udHJvbEhlaWdodCk7XG4gIGRhdGEuY29udHJvbEJ1dHRvbkNTU1tcIndpZHRoXCJdID0gVS5jc3NOdW1iZXIodGhpcy5jb25maWcuZGltZW5zaW9ucy5jb250cm9sSGVpZ2h0KTtcblxuICBkYXRhLmNvbnRyb2xDU1MgPSBVLmNzcyhkYXRhLmNvbnRyb2xDU1MpO1xuICBkYXRhLmNvbnRyb2xCdXR0b25DU1MgPSBVLmNzcyhkYXRhLmNvbnRyb2xCdXR0b25DU1MpO1xuXG4gIHRyeSB7XG4gICAgcmV0dXJuIG11c3RhY2hlLnJlbmRlcih0bXBsLmZyYW1lLmNhbGwodGhpcyksIGRhdGEpO1xuICB9XG4gIGZpbmFsbHkge1xuICAgIGRhdGEgPSBudWxsO1xuICB9XG59O1xuY29uc3Qgc2V0RGlzcGxheSA9IGZ1bmN0aW9uICgpIHtcbiAgbGV0IG15RGF0ZSA9IFUuZGF0ZSh0aGlzLmNvbmZpZy5kaXNwbGF5RGF0ZSksXG4gICAgeXkgPSBcIlwiLFxuICAgIG1tID0gXCJcIixcbiAgICB5eTEsIHl5MjtcblxuICBpZiAodGhpcy5jb25maWcuY29udHJvbCkge1xuICAgIGlmICh0aGlzLmNvbmZpZy5tb2RlID09IFwiZGF5XCIgfHwgdGhpcy5jb25maWcubW9kZSA9PSBcImRcIikge1xuICAgICAgeXkgPSAodGhpcy5jb25maWcuY29udHJvbC55ZWFyVG1wbCkgPyB0aGlzLmNvbmZpZy5jb250cm9sLnllYXJUbXBsLnJlcGxhY2UoJyVzJywgbXlEYXRlLmdldEZ1bGxZZWFyKCkpIDogbXlEYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICBtbSA9ICh0aGlzLmNvbmZpZy5jb250cm9sLm1vbnRoVG1wbCkgPyB0aGlzLmNvbmZpZy5jb250cm9sLm1vbnRoVG1wbC5yZXBsYWNlKCclcycsIHRoaXMuY29uZmlnLmxhbmcubW9udGhzW215RGF0ZS5nZXRNb250aCgpXSkgOiB0aGlzLmNvbmZpZy5sYW5nLm1vbnRoc1tteURhdGUuZ2V0TW9udGgoKV07XG5cbiAgICAgIHRoaXMuJFtcImNvbnRyb2wtZGlzcGxheVwiXS5odG1sKCgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5jb250cm9sLnllYXJGaXJzdCkge1xuICAgICAgICAgIHJldHVybiAnPHNwYW4gZGF0YS1jYWxlbmRhci1kaXNwbGF5PVwieWVhclwiPicgKyB5eSArICc8L3NwYW4+JyArXG4gICAgICAgICAgICAnPHNwYW4gZGF0YS1jYWxlbmRhci1kaXNwbGF5PVwibW9udGhcIj4nICsgbW0gKyAnPC9zcGFuPic7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgcmV0dXJuICc8c3BhbiBkYXRhLWNhbGVuZGFyLWRpc3BsYXk9XCJtb250aFwiPicgKyBtbSArICc8L3NwYW4+JyArXG4gICAgICAgICAgICAnPHNwYW4gZGF0YS1jYWxlbmRhci1kaXNwbGF5PVwieWVhclwiPicgKyB5eSArICc8L3NwYW4+JztcbiAgICAgICAgfVxuICAgICAgfSkoKSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMuY29uZmlnLm1vZGUgPT0gXCJtb250aFwiIHx8IHRoaXMuY29uZmlnLm1vZGUgPT0gXCJtXCIpIHtcbiAgICAgIHl5ID0gKHRoaXMuY29uZmlnLmNvbnRyb2wueWVhclRtcGwpID8gdGhpcy5jb25maWcuY29udHJvbC55ZWFyVG1wbC5yZXBsYWNlKCclcycsIG15RGF0ZS5nZXRGdWxsWWVhcigpKSA6IG15RGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgdGhpcy4kW1wiY29udHJvbC1kaXNwbGF5XCJdLmh0bWwoJzxzcGFuIGRhdGEtY2FsZW5kYXItZGlzcGxheT1cInllYXJcIj4nICsgeXkgKyAnPC9zcGFuPicpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLmNvbmZpZy5tb2RlID09IFwieWVhclwiIHx8IHRoaXMuY29uZmlnLm1vZGUgPT0gXCJ5XCIpIHtcbiAgICAgIHl5MSA9ICh0aGlzLmNvbmZpZy5jb250cm9sLnllYXJUbXBsKSA/IHRoaXMuY29uZmlnLmNvbnRyb2wueWVhclRtcGwucmVwbGFjZSgnJXMnLCBteURhdGUuZ2V0RnVsbFllYXIoKSAtIDEwKSA6IG15RGF0ZS5nZXRGdWxsWWVhcigpIC0gMTA7XG4gICAgICB5eTIgPSAodGhpcy5jb25maWcuY29udHJvbC55ZWFyVG1wbCkgPyB0aGlzLmNvbmZpZy5jb250cm9sLnllYXJUbXBsLnJlcGxhY2UoJyVzJywgTnVtYmVyKG15RGF0ZS5nZXRGdWxsWWVhcigpKSArIDkpIDogTnVtYmVyKG15RGF0ZS5nZXRGdWxsWWVhcigpKSArIDk7XG4gICAgICB0aGlzLiRbXCJjb250cm9sLWRpc3BsYXlcIl0uaHRtbCh5eTEgKyAnIH4gJyArIHl5Mik7XG4gICAgfVxuXG4gICAgdGhpcy4kW1wiY29udHJvbC1kaXNwbGF5XCJdXG4gICAgICAub2ZmKHRoaXMuY29uZmlnLmNsaWNrRXZlbnROYW1lKVxuICAgICAgLm9uKHRoaXMuY29uZmlnLmNsaWNrRXZlbnROYW1lLCAnW2RhdGEtY2FsZW5kYXItZGlzcGxheV0nLCAoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgbGV0IHRhcmdldCA9IFUuZmluZFBhcmVudE5vZGUoZS50YXJnZXQsIGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgICBpZiAodGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtY2FsZW5kYXItZGlzcGxheVwiKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KSwgbW9kZTtcbiAgICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICAgIG1vZGUgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jYWxlbmRhci1kaXNwbGF5XCIpO1xuICAgICAgICAgIHRoaXMuY2hhbmdlTW9kZShtb2RlKTtcbiAgICAgICAgfVxuICAgICAgICB0YXJnZXQgPSBudWxsO1xuICAgICAgICBtb2RlID0gbnVsbDtcbiAgICAgIH0pLmJpbmQodGhpcykpO1xuICB9XG5cbiAgbXlEYXRlID0gbnVsbDtcbiAgeXkgPSBudWxsO1xuICBtbSA9IG51bGw7XG4gIHl5MSA9IG51bGw7XG4gIHl5MiA9IG51bGw7XG4gIHJldHVybiB0aGlzO1xufTtcbmNvbnN0IHByaW50RGF5ID0gZnVuY3Rpb24gKG5vd0RhdGUpIHtcbiAgbGV0IGRvdERhdGUgPSBVLmRhdGUobm93RGF0ZSksXG4gICAgbW9udGhTdHJhdERhdGUgPSBuZXcgRGF0ZShkb3REYXRlLmdldEZ1bGxZZWFyKCksIGRvdERhdGUuZ2V0TW9udGgoKSwgMSwgMTIpLFxuICAgIF90b2RheSA9IHRoaXMuY29uZmlnLmRpc3BsYXlEYXRlLFxuICAgIHRhYmxlU3RhcnREYXRlID0gKCgpID0+IHtcbiAgICAgIGxldCBkYXkgPSBtb250aFN0cmF0RGF0ZS5nZXREYXkoKTtcbiAgICAgIGlmIChkYXkgPT0gMCkgZGF5ID0gNztcbiAgICAgIGRheSAtPSB0aGlzLmNvbmZpZy5zdGFydE9mV2VlaztcblxuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIFUuZGF0ZShtb250aFN0cmF0RGF0ZSwge2FkZDoge2Q6IC1kYXl9fSk7XG4gICAgICB9XG4gICAgICBmaW5hbGx5IHtcbiAgICAgICAgZGF5ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9KSgpLFxuICAgIGxvb3BEYXRlLFxuICAgIHRoaXNNb250aCA9IGRvdERhdGUuZ2V0TW9udGgoKSxcbiAgICBpdGVtU3R5bGVzID0ge30sXG4gICAgaSxcbiAgICBrLCBfayxcbiAgICBmcmFtZVdpZHRoID0gdGhpcy4kW1wiYm9keVwiXS53aWR0aCgpLFxuICAgIGZyYW1lSGVpZ2h0ID0gTWF0aC5mbG9vcihmcmFtZVdpZHRoICogKDYgLyA3KSksIC8vIDF3ZWVrID0gN2RheXMsIDFtb250aCA9IDZ3ZWVrc1xuICAgIGRhdGE7XG5cbiAgaWYgKHRoaXMuY29uZmlnLmRpbWVuc2lvbnMuaGVpZ2h0KSB7XG4gICAgZnJhbWVIZWlnaHQgPSBVLm51bWJlcih0aGlzLmNvbmZpZy5kaW1lbnNpb25zLmhlaWdodCkgLSBVLm51bWJlcih0aGlzLmNvbmZpZy5kaW1lbnNpb25zLmNvbEhlYWRIZWlnaHQpO1xuICB9XG5cbiAgaXRlbVN0eWxlc1snaGVpZ2h0J10gPSBNYXRoLmZsb29yKGZyYW1lSGVpZ2h0IC8gNikgLSBVLm51bWJlcih0aGlzLmNvbmZpZy5kaW1lbnNpb25zLml0ZW1QYWRkaW5nKSAqIDIgKyAncHgnO1xuICBpdGVtU3R5bGVzWydsaW5lLWhlaWdodCddID0gaXRlbVN0eWxlc1snaGVpZ2h0J107XG4gIGl0ZW1TdHlsZXNbJ3BhZGRpbmcnXSA9IFUuY3NzTnVtYmVyKHRoaXMuY29uZmlnLmRpbWVuc2lvbnMuaXRlbVBhZGRpbmcpO1xuXG4gIGRhdGEgPSB7XG4gICAgd2Vla05hbWVzOiBbXS5jb25jYXQoaW5mby53ZWVrTmFtZXMpLFxuICAgIGxpc3Q6IFtdXG4gIH07XG5cbiAgaWYgKHRoaXMuY29uZmlnLnN0YXJ0T2ZXZWVrKSB7XG4gICAgZGF0YS53ZWVrTmFtZXMgPSBkYXRhLndlZWtOYW1lcy5jb25jYXQoZGF0YS53ZWVrTmFtZXMuc2xpY2UoMCwgdGhpcy5jb25maWcuc3RhcnRPZldlZWspKS5zcGxpY2UodGhpcy5jb25maWcuc3RhcnRPZldlZWspO1xuICB9XG5cbiAgZGF0YS53ZWVrTmFtZXMuZm9yRWFjaCgobikgPT4ge1xuICAgIG4uY29sSGVhZEhlaWdodCA9IFUuY3NzTnVtYmVyKHRoaXMuY29uZmlnLmRpbWVuc2lvbnMuY29sSGVhZEhlaWdodCk7XG4gIH0pO1xuXG4gIGxvb3BEYXRlID0gdGFibGVTdGFydERhdGU7XG4gIGkgPSAwO1xuICB3aGlsZSAoaSA8IDYpIHtcbiAgICBrID0gMDtcbiAgICB3aGlsZSAoayA8IDcpIHtcbiAgICAgIF9rID0gKDcgKyAoayAtIHRoaXMuY29uZmlnLnN0YXJ0T2ZXZWVrKSkgJSA3O1xuICAgICAgbGV0IHRoaXNEYXRlID0gJycgKyBVLmRhdGUobG9vcERhdGUsIHtcInJldHVyblwiOiB0aGlzLmNvbmZpZy5kYXRlRm9ybWF0fSksXG4gICAgICAgIF9kYXRlID0ge1xuICAgICAgICAgICdyb3cnOiBpLFxuICAgICAgICAgICdjb2wnOiBrLFxuICAgICAgICAgIGlzU3RhcnRPZldlZWs6IChrID09IDApLFxuICAgICAgICAgIHRoaXNEYXRlOiAnJyArIHRoaXNEYXRlLFxuICAgICAgICAgIHRoaXNEYXRhTGFiZWw6IHRoaXMuY29uZmlnLmxhbmcuZGF5VG1wbC5yZXBsYWNlKCclcycsIGxvb3BEYXRlLmdldERhdGUoKSksXG4gICAgICAgICAgaXRlbVN0eWxlczogVS5jc3MoaXRlbVN0eWxlcyksXG4gICAgICAgICAgYWRkQ2xhc3M6ICgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY2xhc3NOYW1lcyA9IFwiXCI7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5zZWxlY3RhYmxlKSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGFibGVNYXBbdGhpc0RhdGVdKSB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lcyArPSAoIGxvb3BEYXRlLmdldE1vbnRoKCkgPT0gdGhpc01vbnRoICkgPyBcIiBsaXZlXCIgOiBcIlwiO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZXMgKz0gXCIgZGlzYWJsZVwiO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKGxvb3BEYXRlLmdldE1vbnRoKCkgPT0gdGhpc01vbnRoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXNEYXRlID09IFUuZGF0ZShfdG9kYXksIHtcInJldHVyblwiOiBcInl5eXlNTWRkXCJ9KSkge1xuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lcyArPSBcIiBmb2N1c1wiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWVzICs9IFwiIGxpdmVcIjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAobG9vcERhdGUuZ2V0RGF5KCkgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lcyArPSBcIiBzdW5kYXlcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGxvb3BEYXRlLmdldERheSgpID09IDYpIHtcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZXMgKz0gXCIgc2F0dXJkYXlcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGNsYXNzTmFtZXM7XG4gICAgICAgICAgfSkoKVxuICAgICAgICAgICsgJyAnXG4gICAgICAgICAgKyAoKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLm1hcmtlck1hcFt0aGlzRGF0ZV0pID8gdGhpcy5tYXJrZXJNYXBbdGhpc0RhdGVdLnRoZW1lIHx8IHRoaXMuY29uZmlnLmRlZmF1bHRNYXJrZXJUaGVtZSA6ICcnO1xuICAgICAgICAgIH0pKClcbiAgICAgICAgICArICcgJ1xuICAgICAgICAgICsgKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5zZWxlY3Rpb25NYXBbdGhpc0RhdGVdKSA/IFwic2VsZWN0ZWQtZGF5XCIgOiAnJztcbiAgICAgICAgICB9KSgpXG4gICAgICAgIH07XG4gICAgICBkYXRhLmxpc3QucHVzaChfZGF0ZSk7XG5cbiAgICAgIGsrKztcbiAgICAgIGxvb3BEYXRlID0gVS5kYXRlKGxvb3BEYXRlLCB7YWRkOiB7ZDogMX19KTtcblxuICAgICAgdGhpc0RhdGUgPSBudWxsO1xuICAgICAgX2RhdGUgPSBudWxsO1xuICAgIH1cbiAgICBpKys7XG4gIH1cblxuICB0aGlzLiRbXCJib2R5XCJdXG4gICAgLmh0bWwobXVzdGFjaGUucmVuZGVyKHRtcGwuZGF5LmNhbGwodGhpcyksIGRhdGEpKVxuICAgIC5vZmYodGhpcy5jb25maWcuY2xpY2tFdmVudE5hbWUpXG4gICAgLm9uKHRoaXMuY29uZmlnLmNsaWNrRXZlbnROYW1lLCAnW2RhdGEtY2FsZW5kYXItaXRlbS1kYXRlXScsIChlKSA9PiB7XG4gICAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XG4gICAgICBvbmNsaWNrLmNhbGwodGhpcywgZSwgJ2RhdGUnKTtcbiAgICAgIFUuc3RvcEV2ZW50KGUpO1xuICAgIH0pO1xuXG4gIHRoaXMucHJpbnRlZERheSA9IHtcbiAgICBzdGFydDogdGFibGVTdGFydERhdGUsIGVuZDogbG9vcERhdGVcbiAgfTtcblxuICBvblN0YXRlQ2hhbmdlZC5jYWxsKHRoaXMsIG51bGwsIHtcbiAgICBzZWxmOiB0aGlzLFxuICAgIGFjdGlvbjogXCJwcmludERheVwiLFxuICAgIHByaW50ZWREYXk6IHRoaXMucHJpbnRlZERheVxuICB9KTtcbiAgc2V0RGlzcGxheS5jYWxsKHRoaXMpO1xuXG4gIGRvdERhdGUgPSBudWxsO1xuICBtb250aFN0cmF0RGF0ZSA9IG51bGw7XG4gIF90b2RheSA9IG51bGw7XG4gIHRhYmxlU3RhcnREYXRlID0gbnVsbDtcbiAgbG9vcERhdGUgPSBudWxsO1xuICB0aGlzTW9udGggPSBudWxsO1xuICBpdGVtU3R5bGVzID0gbnVsbDtcbiAgaSA9IG51bGw7XG4gIGsgPSBudWxsO1xuICBmcmFtZVdpZHRoID0gbnVsbDtcbiAgZnJhbWVIZWlnaHQgPSBudWxsO1xuICBkYXRhID0gbnVsbDtcbn07XG5jb25zdCBwcmludE1vbnRoID0gZnVuY3Rpb24gKG5vd0RhdGUpIHtcbiAgbGV0IGRvdERhdGUgPSBVLmRhdGUobm93RGF0ZSksXG4gICAgbk1vbnRoID0gZG90RGF0ZS5nZXRNb250aCgpLFxuICAgIGl0ZW1TdHlsZXMgPSB7fSxcbiAgICBpLFxuICAgIGssXG4gICAgbSxcbiAgICB0YWJsZVN0YXJ0TW9udGgsXG4gICAgZnJhbWVXaWR0aCA9IHRoaXMuJFtcImJvZHlcIl0ud2lkdGgoKSxcbiAgICBmcmFtZUhlaWdodCA9IE1hdGguZmxvb3IoZnJhbWVXaWR0aCAqICg2IC8gNykpLFxuICAgIGRhdGE7XG5cbiAgaWYgKHRoaXMuY29uZmlnLmRpbWVuc2lvbnMuaGVpZ2h0KSB7XG4gICAgZnJhbWVIZWlnaHQgPSBVLm51bWJlcih0aGlzLmNvbmZpZy5kaW1lbnNpb25zLmhlaWdodCkgLSBVLm51bWJlcih0aGlzLmNvbmZpZy5kaW1lbnNpb25zLmNvbEhlYWRIZWlnaHQpO1xuICB9XG5cbiAgaXRlbVN0eWxlc1snaGVpZ2h0J10gPSBNYXRoLmZsb29yKGZyYW1lSGVpZ2h0IC8gNCkgLSBVLm51bWJlcih0aGlzLmNvbmZpZy5kaW1lbnNpb25zLml0ZW1QYWRkaW5nKSAqIDIgKyAncHgnO1xuICBpdGVtU3R5bGVzWydsaW5lLWhlaWdodCddID0gaXRlbVN0eWxlc1snaGVpZ2h0J107XG4gIGl0ZW1TdHlsZXNbJ3BhZGRpbmcnXSA9IFUuY3NzTnVtYmVyKHRoaXMuY29uZmlnLmRpbWVuc2lvbnMuaXRlbVBhZGRpbmcpO1xuXG4gIGRhdGEgPSB7XG4gICAgY29sSGVhZEhlaWdodDogVS5jc3NOdW1iZXIodGhpcy5jb25maWcuZGltZW5zaW9ucy5jb2xIZWFkSGVpZ2h0KSxcbiAgICBjb2xIZWFkTGFiZWw6IHRoaXMuY29uZmlnLmxhbmcubW9udGhIZWFkaW5nLFxuICAgIGxpc3Q6IFtdXG4gIH07XG5cbiAgdGFibGVTdGFydE1vbnRoID0gMDtcbiAgbSA9IDA7XG4gIGkgPSAwO1xuICB3aGlsZSAoaSA8IDQpIHtcbiAgICBrID0gMDtcbiAgICB3aGlsZSAoayA8IDMpIHtcbiAgICAgIGxldCBfbW9udGggPSB7XG4gICAgICAgIHJvdzogaSxcbiAgICAgICAgY29sOiBrLFxuICAgICAgICBpc1N0YXJ0T2ZSb3c6IChrID09IDApLFxuICAgICAgICB0aGlzTW9udGg6IGRvdERhdGUuZ2V0RnVsbFllYXIoKSArICctJyArIFUuc2V0RGlnaXQobSArIDEsIDIpICsgJy0nICsgVS5zZXREaWdpdChkb3REYXRlLmdldERhdGUoKSwgMiksXG4gICAgICAgIHRoaXNNb250aExhYmVsOiB0aGlzLmNvbmZpZy5sYW5nLm1vbnRoc1ttXSxcbiAgICAgICAgaXRlbVN0eWxlczogVS5jc3MoaXRlbVN0eWxlcyksXG4gICAgICAgIGFkZENsYXNzOiAoKCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5zZWxlY3RhYmxlKSB7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuc2VsZWN0YWJsZU1hcFttXSkgPyAnbGl2ZScgOiAnZGlzYWJsZSc7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICdsaXZlJztcbiAgICAgICAgICB9XG4gICAgICAgIH0pKClcbiAgICAgICAgKyAnICdcbiAgICAgICAgKyAoKCkgPT4ge1xuICAgICAgICAgIHJldHVybiAoIG0gPT0gbk1vbnRoICkgPyBcImZvY3VzXCIgOiBcIlwiO1xuICAgICAgICB9KSgpXG4gICAgICAgICsgJyAnXG4gICAgICAgICsgKCgpID0+IHtcbiAgICAgICAgICByZXR1cm4gKHRoaXMubWFya2VyTWFwW21dKSA/IHRoaXMubWFya2VyTWFwW21dLnRoZW1lIHx8IHRoaXMuY29uZmlnLmRlZmF1bHRNYXJrZXJUaGVtZSA6ICcnO1xuICAgICAgICB9KSgpXG4gICAgICB9O1xuICAgICAgZGF0YS5saXN0LnB1c2goX21vbnRoKTtcbiAgICAgIG0rKztcbiAgICAgIGsrKztcbiAgICAgIF9tb250aCA9IG51bGw7XG4gICAgfVxuICAgIGkrKztcbiAgfVxuXG4gIHRoaXMuJFtcImJvZHlcIl1cbiAgICAuaHRtbChtdXN0YWNoZS5yZW5kZXIodG1wbC5tb250aC5jYWxsKHRoaXMpLCBkYXRhKSlcbiAgICAub2ZmKHRoaXMuY29uZmlnLmNsaWNrRXZlbnROYW1lKVxuICAgIC5vbih0aGlzLmNvbmZpZy5jbGlja0V2ZW50TmFtZSwgJ1tkYXRhLWNhbGVuZGFyLWl0ZW0tbW9udGhdJywgKGUpID0+IHtcbiAgICAgIGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcbiAgICAgIG9uY2xpY2suY2FsbCh0aGlzLCBlLCAnbW9udGgnKTtcbiAgICAgIFUuc3RvcEV2ZW50KGUpO1xuICAgIH0pO1xuXG4gIHRoaXMucHJpbnRlZERheSA9IHtcbiAgICBzdGFydDogZG90RGF0ZS5nZXRGdWxsWWVhcigpICsgJy0nICsgVS5zZXREaWdpdCh0YWJsZVN0YXJ0TW9udGggKyAxLCAyKSxcbiAgICBlbmQ6IGRvdERhdGUuZ2V0RnVsbFllYXIoKSArICctJyArIFUuc2V0RGlnaXQobSwgMilcbiAgfTtcblxuICBvblN0YXRlQ2hhbmdlZC5jYWxsKHRoaXMsIG51bGwsIHtcbiAgICBzZWxmOiB0aGlzLFxuICAgIGFjdGlvbjogXCJwcmludE1vbnRoXCIsXG4gICAgcHJpbnRlZERheTogdGhpcy5wcmludGVkRGF5XG4gIH0pO1xuICBzZXREaXNwbGF5LmNhbGwodGhpcyk7XG5cbiAgZG90RGF0ZSA9IG51bGw7XG4gIG5Nb250aCA9IG51bGw7XG4gIGl0ZW1TdHlsZXMgPSBudWxsO1xuICBpID0gbnVsbDtcbiAgayA9IG51bGw7XG4gIG0gPSBudWxsO1xuICB0YWJsZVN0YXJ0TW9udGggPSBudWxsO1xuICBmcmFtZVdpZHRoID0gbnVsbDtcbiAgZnJhbWVIZWlnaHQgPSBudWxsO1xuICBkYXRhID0gbnVsbDtcbn07XG5jb25zdCBwcmludFllYXIgPSBmdW5jdGlvbiAobm93RGF0ZSkge1xuICBsZXQgZG90RGF0ZSA9IFUuZGF0ZShub3dEYXRlKSxcbiAgICBuWWVhciA9IGRvdERhdGUuZ2V0RnVsbFllYXIoKSxcbiAgICBpdGVtU3R5bGVzID0ge30sXG4gICAgaSxcbiAgICBrLFxuICAgIHksXG4gICAgdGFibGVTdGFydFllYXIsXG4gICAgZnJhbWVXaWR0aCA9IHRoaXMuJFtcImJvZHlcIl0ud2lkdGgoKSxcbiAgICBmcmFtZUhlaWdodCA9IE1hdGguZmxvb3IoZnJhbWVXaWR0aCAqICg2IC8gNykpLFxuICAgIGRhdGE7XG5cbiAgaWYgKHRoaXMuY29uZmlnLmRpbWVuc2lvbnMuaGVpZ2h0KSB7XG4gICAgZnJhbWVIZWlnaHQgPSBVLm51bWJlcih0aGlzLmNvbmZpZy5kaW1lbnNpb25zLmhlaWdodCkgLSBVLm51bWJlcih0aGlzLmNvbmZpZy5kaW1lbnNpb25zLmNvbEhlYWRIZWlnaHQpO1xuICB9XG5cbiAgaXRlbVN0eWxlc1snaGVpZ2h0J10gPSBNYXRoLmZsb29yKGZyYW1lSGVpZ2h0IC8gNSkgLSBVLm51bWJlcih0aGlzLmNvbmZpZy5kaW1lbnNpb25zLml0ZW1QYWRkaW5nKSAqIDIgKyAncHgnO1xuICBpdGVtU3R5bGVzWydsaW5lLWhlaWdodCddID0gaXRlbVN0eWxlc1snaGVpZ2h0J107XG4gIGl0ZW1TdHlsZXNbJ3BhZGRpbmcnXSA9IFUuY3NzTnVtYmVyKHRoaXMuY29uZmlnLmRpbWVuc2lvbnMuaXRlbVBhZGRpbmcpO1xuXG4gIGRhdGEgPSB7XG4gICAgY29sSGVhZEhlaWdodDogVS5jc3NOdW1iZXIodGhpcy5jb25maWcuZGltZW5zaW9ucy5jb2xIZWFkSGVpZ2h0KSxcbiAgICBjb2xIZWFkTGFiZWw6IHRoaXMuY29uZmlnLmxhbmcueWVhckhlYWRpbmcsXG4gICAgbGlzdDogW11cbiAgfTtcblxuICB0YWJsZVN0YXJ0WWVhciA9IG5ZZWFyIC0gMTA7XG4gIHkgPSBuWWVhciAtIDEwO1xuICBpID0gMDtcbiAgd2hpbGUgKGkgPCA1KSB7XG4gICAgayA9IDA7XG4gICAgd2hpbGUgKGsgPCA0KSB7XG4gICAgICBsZXQgX3llYXIgPSB7XG4gICAgICAgIHJvdzogaSxcbiAgICAgICAgY29sOiBrLFxuICAgICAgICBpc1N0YXJ0T2ZSb3c6IChrID09IDApLFxuICAgICAgICB0aGlzWWVhcjogeSArICctJyArIFUuc2V0RGlnaXQoZG90RGF0ZS5nZXRNb250aCgpICsgMSwgMikgKyAnLScgKyBVLnNldERpZ2l0KGRvdERhdGUuZ2V0RGF0ZSgpLCAyKSxcbiAgICAgICAgdGhpc1llYXJMYWJlbDogdGhpcy5jb25maWcubGFuZy55ZWFyVG1wbC5yZXBsYWNlKCclcycsICh5KSksXG4gICAgICAgIGl0ZW1TdHlsZXM6IFUuY3NzKGl0ZW1TdHlsZXMpLFxuICAgICAgICBhZGRDbGFzczogKCgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5jb25maWcuc2VsZWN0YWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLnNlbGVjdGFibGVNYXBbeV0pID8gJ2xpdmUnIDogJ2Rpc2FibGUnO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAnbGl2ZSc7XG4gICAgICAgICAgfVxuICAgICAgICB9KSgpXG4gICAgICAgICsgJyAnXG4gICAgICAgICsgKCgpID0+IHtcbiAgICAgICAgICByZXR1cm4gKCB5ID09IG5ZZWFyICkgPyBcImZvY3VzXCIgOiBcIlwiO1xuICAgICAgICB9KSgpXG4gICAgICAgICsgJyAnXG4gICAgICAgICsgKCgpID0+IHtcbiAgICAgICAgICByZXR1cm4gKHRoaXMuc2VsZWN0YWJsZU1hcFt5XSkgPyB0aGlzLnNlbGVjdGFibGVNYXBbeV0udGhlbWUgfHwgdGhpcy5jb25maWcuZGVmYXVsdE1hcmtlclRoZW1lIDogJyc7XG4gICAgICAgIH0pKClcbiAgICAgIH07XG4gICAgICBkYXRhLmxpc3QucHVzaChfeWVhcik7XG4gICAgICB5Kys7XG4gICAgICBrKys7XG4gICAgICBfeWVhciA9IG51bGw7XG4gICAgfVxuICAgIGkrKztcbiAgfVxuXG4gIHRoaXMuJFtcImJvZHlcIl1cbiAgICAuaHRtbChtdXN0YWNoZS5yZW5kZXIodG1wbC55ZWFyLmNhbGwodGhpcyksIGRhdGEpKVxuICAgIC5vZmYodGhpcy5jb25maWcuY2xpY2tFdmVudE5hbWUpXG4gICAgLm9uKHRoaXMuY29uZmlnLmNsaWNrRXZlbnROYW1lLCAnW2RhdGEtY2FsZW5kYXItaXRlbS15ZWFyXScsIChlKSA9PiB7XG4gICAgICBlID0gKGUgfHwgd2luZG93LmV2ZW50KTtcbiAgICAgIG9uY2xpY2suY2FsbCh0aGlzLCBlLCAneWVhcicpO1xuICAgICAgVS5zdG9wRXZlbnQoZSk7XG4gICAgfSk7XG5cbiAgdGhpcy5wcmludGVkRGF5ID0ge1xuICAgIHN0YXJ0OiB0YWJsZVN0YXJ0WWVhciwgZW5kOiB5IC0gMVxuICB9O1xuXG4gIG9uU3RhdGVDaGFuZ2VkLmNhbGwodGhpcywgbnVsbCwge1xuICAgIHNlbGY6IHRoaXMsXG4gICAgYWN0aW9uOiBcInByaW50WWVhclwiLFxuICAgIHByaW50ZWREYXk6IHRoaXMucHJpbnRlZERheVxuICB9KTtcbiAgc2V0RGlzcGxheS5jYWxsKHRoaXMpO1xuXG4gIGRvdERhdGUgPSBudWxsO1xuICBuWWVhciA9IG51bGw7XG4gIGl0ZW1TdHlsZXMgPSBudWxsO1xuICBpID0gbnVsbDtcbiAgayA9IG51bGw7XG4gIHkgPSBudWxsO1xuICB0YWJsZVN0YXJ0WWVhciA9IG51bGw7XG4gIGZyYW1lV2lkdGggPSBudWxsO1xuICBmcmFtZUhlaWdodCA9IG51bGw7XG4gIGRhdGEgPSBudWxsO1xufTtcbmNvbnN0IG9uY2xpY2sgPSBmdW5jdGlvbiAoZSwgbW9kZSwgdGFyZ2V0LCB2YWx1ZSkge1xuICBsZXQgcmVtb3ZlZCxcbiAgICBkdCxcbiAgICBzZWxlY3RhYmxlO1xuXG4gIG1vZGUgPSBtb2RlIHx8IFwiZGF0ZVwiO1xuICB0YXJnZXQgPSBVLmZpbmRQYXJlbnROb2RlKGUudGFyZ2V0LCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgaWYgKHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNhbGVuZGFyLWl0ZW0tXCIgKyBtb2RlKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9KTtcbiAgaWYgKHRhcmdldCkge1xuICAgIHZhbHVlID0gdGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtY2FsZW5kYXItaXRlbS1cIiArIG1vZGUpO1xuXG4gICAgZHQgPSBVLmRhdGUodmFsdWUsIHtcInJldHVyblwiOiB0aGlzLmNvbmZpZy5kYXRlRm9ybWF0fSk7XG4gICAgc2VsZWN0YWJsZSA9IHRydWU7XG4gICAgdGhpcy5zZWxlY3RhYmxlQ291bnQgPSAodGhpcy5jb25maWcubXVsdGlwbGVTZWxlY3QpID8gKFUuaXNOdW1iZXIodGhpcy5jb25maWcubXVsdGlwbGVTZWxlY3QpKSA/IHRoaXMuY29uZmlnLm11bHRpcGxlU2VsZWN0IDogMiA6IDE7XG5cbiAgICBpZiAodGhpcy5jb25maWcuc2VsZWN0YWJsZSkge1xuICAgICAgaWYgKCF0aGlzLnNlbGVjdGFibGVNYXBbZHRdKSBzZWxlY3RhYmxlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKG1vZGUgPT0gXCJkYXRlXCIpIHtcbiAgICAgIGlmIChzZWxlY3RhYmxlKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uLmxlbmd0aCA+PSB0aGlzLnNlbGVjdGFibGVDb3VudCkge1xuICAgICAgICAgIHJlbW92ZWQgPSB0aGlzLnNlbGVjdGlvbi5zcGxpY2UoMCwgdGhpcy5zZWxlY3Rpb24ubGVuZ3RoIC0gKHRoaXMuc2VsZWN0YWJsZUNvdW50IC0gMSkpO1xuICAgICAgICAgIHJlbW92ZWQuZm9yRWFjaCgoZCkgPT4ge1xuICAgICAgICAgICAgdGhpcy4kW1wiYm9keVwiXS5maW5kKCdbZGF0YS1jYWxlbmRhci1pdGVtLWRhdGU9XCInICsgVS5kYXRlKGQsIHtcInJldHVyblwiOiB0aGlzLmNvbmZpZy5kYXRlRm9ybWF0fSkgKyAnXCJdJykucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZC1kYXlcIik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBqUXVlcnkodGFyZ2V0KS5hZGRDbGFzcyhcInNlbGVjdGVkLWRheVwiKTtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb24ucHVzaCh2YWx1ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMub25DbGljaykge1xuICAgICAgICAgIHRoaXMub25DbGljay5jYWxsKHtcbiAgICAgICAgICAgIHNlbGY6IHRoaXMsIGRhdGU6IHZhbHVlLCB0YXJnZXQ6IHRoaXMudGFyZ2V0LCBkYXRlRWxlbWVudDogdGFyZ2V0XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAobW9kZSA9PSBcIm1vbnRoXCIpIHtcbiAgICAgIGlmICh0aGlzLmNvbmZpZy5zZWxlY3RNb2RlID09IFwibW9udGhcIikge1xuICAgICAgICBpZiAoc2VsZWN0YWJsZSkge1xuICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbi5sZW5ndGggPj0gdGhpcy5zZWxlY3RhYmxlQ291bnQpIHtcbiAgICAgICAgICAgIHJlbW92ZWQgPSB0aGlzLnNlbGVjdGlvbi5zcGxpY2UoMCwgdGhpcy5zZWxlY3Rpb24ubGVuZ3RoIC0gKHRoaXMuc2VsZWN0YWJsZUNvdW50IC0gMSkpO1xuICAgICAgICAgICAgcmVtb3ZlZC5mb3JFYWNoKChkKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuJFtcImJvZHlcIl0uZmluZCgnW2RhdGEtY2FsZW5kYXItaXRlbS1tb250aD1cIicgKyBVLmRhdGUoZCwge1wicmV0dXJuXCI6ICd5eXl5LU1NLWRkJ30pICsgJ1wiXScpLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWQtbW9udGhcIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBqUXVlcnkodGFyZ2V0KS5hZGRDbGFzcyhcInNlbGVjdGVkLW1vbnRoXCIpO1xuICAgICAgICAgIHRoaXMuc2VsZWN0aW9uLnB1c2godmFsdWUpO1xuXG4gICAgICAgICAgaWYgKHRoaXMub25DbGljaykge1xuICAgICAgICAgICAgdGhpcy5vbkNsaWNrLmNhbGwoe1xuICAgICAgICAgICAgICBzZWxmOiB0aGlzLCBkYXRlOiB2YWx1ZSwgdGFyZ2V0OiB0aGlzLnRhcmdldCwgZGF0ZUVsZW1lbnQ6IHRhcmdldFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VNb2RlKFwiZGF5XCIsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAobW9kZSA9PSBcInllYXJcIikge1xuICAgICAgaWYgKHRoaXMuY29uZmlnLnNlbGVjdE1vZGUgPT0gXCJ5ZWFyXCIpIHtcbiAgICAgICAgaWYgKHNlbGVjdGFibGUpIHtcbiAgICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb24ubGVuZ3RoID49IHRoaXMuc2VsZWN0YWJsZUNvdW50KSB7XG4gICAgICAgICAgICByZW1vdmVkID0gdGhpcy5zZWxlY3Rpb24uc3BsaWNlKDAsIHRoaXMuc2VsZWN0aW9uLmxlbmd0aCAtICh0aGlzLnNlbGVjdGFibGVDb3VudCAtIDEpKTtcbiAgICAgICAgICAgIHJlbW92ZWQuZm9yRWFjaCgoZCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLiRbXCJib2R5XCJdLmZpbmQoJ1tkYXRhLWNhbGVuZGFyLWl0ZW0teWVhcj1cIicgKyBVLmRhdGUoZCwge1wicmV0dXJuXCI6ICd5eXl5LU1NLWRkJ30pICsgJ1wiXScpLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWQteWVhclwiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGpRdWVyeSh0YXJnZXQpLmFkZENsYXNzKFwic2VsZWN0ZWQteWVhclwiKTtcbiAgICAgICAgICB0aGlzLnNlbGVjdGlvbi5wdXNoKHZhbHVlKTtcblxuICAgICAgICAgIGlmICh0aGlzLm9uQ2xpY2spIHtcbiAgICAgICAgICAgIHRoaXMub25DbGljay5jYWxsKHtcbiAgICAgICAgICAgICAgc2VsZjogdGhpcywgZGF0ZTogdmFsdWUsIHRhcmdldDogdGhpcy50YXJnZXQsIGRhdGVFbGVtZW50OiB0YXJnZXRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMuY2hhbmdlTW9kZShcIm1vbnRoXCIsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBtb2RlID0gbnVsbDtcbiAgdGFyZ2V0ID0gbnVsbDtcbiAgdmFsdWUgPSBudWxsO1xuICByZW1vdmVkID0gbnVsbDtcbiAgZHQgPSBudWxsO1xuICBzZWxlY3RhYmxlID0gbnVsbDtcbn07XG5jb25zdCBtb3ZlID0gZnVuY3Rpb24gKGUsIHRhcmdldCwgdmFsdWUpIHtcbiAgdGFyZ2V0ID0gVS5maW5kUGFyZW50Tm9kZShlLnRhcmdldCwgZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGlmICh0YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jYWxlbmRhci1tb3ZlXCIpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuICBpZiAodGFyZ2V0KSB7XG4gICAgdmFsdWUgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jYWxlbmRhci1tb3ZlXCIpO1xuICAgIGlmICh0aGlzLmNvbmZpZy5tb2RlID09IFwiZGF5XCIgfHwgdGhpcy5jb25maWcubW9kZSA9PSBcImRcIikge1xuICAgICAgaWYgKHZhbHVlID09IFwibGVmdFwiKSB7XG4gICAgICAgIHRoaXMuY29uZmlnLmRpc3BsYXlEYXRlID0gVS5kYXRlKHRoaXMuY29uZmlnLmRpc3BsYXlEYXRlLCB7YWRkOiB7bTogLTF9fSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5jb25maWcuZGlzcGxheURhdGUgPSBVLmRhdGUodGhpcy5jb25maWcuZGlzcGxheURhdGUsIHthZGQ6IHttOiAxfX0pO1xuICAgICAgfVxuICAgICAgcHJpbnREYXkuY2FsbCh0aGlzLCB0aGlzLmNvbmZpZy5kaXNwbGF5RGF0ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMuY29uZmlnLm1vZGUgPT0gXCJtb250aFwiIHx8IHRoaXMuY29uZmlnLm1vZGUgPT0gXCJtXCIpIHtcbiAgICAgIGlmICh2YWx1ZSA9PSBcImxlZnRcIikge1xuICAgICAgICB0aGlzLmNvbmZpZy5kaXNwbGF5RGF0ZSA9IFUuZGF0ZSh0aGlzLmNvbmZpZy5kaXNwbGF5RGF0ZSwge2FkZDoge3k6IC0xfX0pO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMuY29uZmlnLmRpc3BsYXlEYXRlID0gVS5kYXRlKHRoaXMuY29uZmlnLmRpc3BsYXlEYXRlLCB7YWRkOiB7eTogMX19KTtcbiAgICAgIH1cbiAgICAgIHByaW50TW9udGguY2FsbCh0aGlzLCB0aGlzLmNvbmZpZy5kaXNwbGF5RGF0ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMuY29uZmlnLm1vZGUgPT0gXCJ5ZWFyXCIgfHwgdGhpcy5jb25maWcubW9kZSA9PSBcInlcIikge1xuICAgICAgaWYgKHZhbHVlID09IFwibGVmdFwiKSB7XG4gICAgICAgIHRoaXMuY29uZmlnLmRpc3BsYXlEYXRlID0gVS5kYXRlKHRoaXMuY29uZmlnLmRpc3BsYXlEYXRlLCB7YWRkOiB7eTogLTEwfX0pO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMuY29uZmlnLmRpc3BsYXlEYXRlID0gVS5kYXRlKHRoaXMuY29uZmlnLmRpc3BsYXlEYXRlLCB7YWRkOiB7eTogMTB9fSk7XG4gICAgICB9XG4gICAgICBwcmludFllYXIuY2FsbCh0aGlzLCB0aGlzLmNvbmZpZy5kaXNwbGF5RGF0ZSk7XG4gICAgfVxuICB9XG5cbiAgdGFyZ2V0ID0gbnVsbDtcbiAgdmFsdWUgPSBudWxsO1xufTtcbmNvbnN0IGFwcGx5TWFya2VyTWFwID0gZnVuY3Rpb24gKCkge1xuICBzZXRUaW1lb3V0KChmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuY29uZmlnLm1vZGUgPT09IFwiZGF5XCIgfHwgdGhpcy5jb25maWcubW9kZSA9PT0gXCJkXCIpIHtcbiAgICAgIGZvciAobGV0IGsgaW4gdGhpcy5tYXJrZXJNYXApIHtcbiAgICAgICAgdGhpcy4kW1wiYm9keVwiXS5maW5kKCdbZGF0YS1jYWxlbmRhci1pdGVtLWRhdGU9XCInICsgayArICdcIl0nKS5hZGRDbGFzcyh0aGlzLm1hcmtlck1hcFtrXS50aGVtZSB8fCB0aGlzLmNvbmZpZy5kZWZhdWx0TWFya2VyVGhlbWUpO1xuICAgICAgfVxuICAgIH1cbiAgfSkuYmluZCh0aGlzKSk7XG59O1xuY29uc3QgYXBwbHlTZWxlY3Rpb25NYXAgPSBmdW5jdGlvbiAoKSB7XG4gIHNldFRpbWVvdXQoKGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKGxldCBrIGluIHRoaXMuc2VsZWN0aW9uTWFwKSB7XG4gICAgICB0aGlzLiRbXCJib2R5XCJdLmZpbmQoJ1tkYXRhLWNhbGVuZGFyLWl0ZW0tZGF0ZT1cIicgKyBrICsgJ1wiXScpLmFkZENsYXNzKFwic2VsZWN0ZWQtZGF5XCIpO1xuICAgIH1cbiAgfSkuYmluZCh0aGlzKSk7XG59O1xuY29uc3QgYXBwbHlQZXJpb2RNYXAgPSBmdW5jdGlvbiAoKSB7XG4gIHNldFRpbWVvdXQoKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5jb25maWcubW9kZSA9PT0gXCJkYXlcIiB8fCB0aGlzLmNvbmZpZy5tb2RlID09PSBcImRcIikge1xuICAgICAgZm9yIChsZXQgayBpbiB0aGlzLnBlcmlvZE1hcCkge1xuICAgICAgICBpZiAodGhpcy5wZXJpb2RNYXBba10ubGFiZWwpIHtcbiAgICAgICAgICB0aGlzLiRbXCJib2R5XCJdLmZpbmQoJ1tkYXRhLWNhbGVuZGFyLWl0ZW0tZGF0ZT1cIicgKyBrICsgJ1wiXScpLmZpbmQoXCIuYWRkb24tZm9vdGVyXCIpLmh0bWwodGhpcy5wZXJpb2RNYXBba10ubGFiZWwpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuJFtcImJvZHlcIl0uZmluZCgnW2RhdGEtY2FsZW5kYXItaXRlbS1kYXRlPVwiJyArIGsgKyAnXCJdJykuYWRkQ2xhc3ModGhpcy5wZXJpb2RNYXBba10udGhlbWUpO1xuICAgICAgfVxuICAgIH1cbiAgfSkuYmluZCh0aGlzKSk7XG59O1xuY29uc3QgY2xlYXJQZXJpb2RNYXAgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLmNvbmZpZy5tb2RlID09PSBcImRheVwiIHx8IHRoaXMuY29uZmlnLm1vZGUgPT09IFwiZFwiKSB7XG4gICAgZm9yIChsZXQgayBpbiB0aGlzLnBlcmlvZE1hcCkge1xuICAgICAgdGhpcy4kW1wiYm9keVwiXS5maW5kKCdbZGF0YS1jYWxlbmRhci1pdGVtLWRhdGU9XCInICsgayArICdcIl0nKS5maW5kKFwiLmFkZG9uLWZvb3RlclwiKS5lbXB0eSgpO1xuICAgICAgdGhpcy4kW1wiYm9keVwiXS5maW5kKCdbZGF0YS1jYWxlbmRhci1pdGVtLWRhdGU9XCInICsgayArICdcIl0nKS5yZW1vdmVDbGFzcyh0aGlzLnBlcmlvZE1hcFtrXS50aGVtZSk7XG4gICAgfVxuICB9XG59O1xuLyogfn5+fn5+fn5+fn5+fn5+fn5+IGVuZCBvZiBwcml2YXRlICB+fn5+fn5+fn5+fn5+fn5+fn5+fiAqL1xuXG4vKipcbiAqIEBjbGFzc1xuICovXG5jbGFzcyBBWDZVSUNhbGVuZGFyIGV4dGVuZHMgQVg2VUlDb3JlIHtcbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge29iamVjdH0gY29uZmlnXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbY29uZmlnLnRoZW1lID0gJ2RlZmF1bHQnXVxuICAgKiBAcGFyYW0geyEob2JqZWN0fHN0cmluZyl9IFtjb25maWcudGFyZ2V0XVxuICAgKiBAcGFyYW0ge251bWJlcn0gW2NvbmZpZy5hbmltYXRlVGltZSA9IDEwMF1cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gW2NvbmZpZy5vblN0YXRlQ2hhbmdlZF1cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gW2NvbmZpZy5vbkNsaWNrXVxuICAgKiBAcGFyYW0gW2NvbmZpZy5jb250ZW50XVxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBqc1xuICAgKiB2YXIgbXlDYWxlbmRhciA9IG5ldyBBWDZVSUNhbGVuZGFyKCk7XG4gICAqIGBgYFxuICAgKi9cbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuY29uZmlnID0ge1xuICAgICAgY2xpY2tFdmVudE5hbWU6IFwiY2xpY2tcIixcbiAgICAgIHRoZW1lOiAnZGVmYXVsdCcsXG4gICAgICBzdGFydE9mV2VlazogMCxcbiAgICAgIG1vZGU6ICdkYXknLCAvLyBkYXl8bW9udGh8eWVhcixcbiAgICAgIGRhdGVGb3JtYXQ6ICd5eXl5LU1NLWRkJyxcbiAgICAgIGRpc3BsYXlEYXRlOiAobmV3IERhdGUoKSksXG4gICAgICBhbmltYXRlVGltZTogMTAwLFxuICAgICAgZGltZW5zaW9uczoge1xuICAgICAgICBjb250cm9sSGVpZ2h0OiAnNDAnLFxuICAgICAgICBjb250cm9sQnV0dG9uV2lkdGg6ICc0MCcsXG4gICAgICAgIGNvbEhlYWRIZWlnaHQ6ICczMCcsXG4gICAgICAgIGl0ZW1QYWRkaW5nOiAyXG4gICAgICB9LFxuICAgICAgbGFuZzoge1xuICAgICAgICB5ZWFySGVhZGluZzogXCJDaG9vc2UgdGhlIHllYXJcIixcbiAgICAgICAgbW9udGhIZWFkaW5nOiBcIkNob29zZSB0aGUgbW9udGhcIixcbiAgICAgICAgeWVhclRtcGw6IFwiJXNcIixcbiAgICAgICAgbW9udGhzOiBpbmZvLm1vbnRocyB8fCBbJ0pBTicsICdGRUInLCAnTUFSJywgJ0FQUicsICdNQVknLCAnSlVOJywgJ0pVTCcsICdBVUcnLCAnU0VQJywgJ09DVCcsICdOT1YnLCAnREVDJ10sXG4gICAgICAgIGRheVRtcGw6IFwiJXNcIlxuICAgICAgfSxcbiAgICAgIG11bHRpcGxlU2VsZWN0OiBmYWxzZSxcbiAgICAgIHNlbGVjdE1vZGU6ICdkYXknLFxuICAgICAgZGVmYXVsdE1hcmtlclRoZW1lOiAnaG9saWRheScsXG4gICAgICBkZWZhdWx0UGVyaW9kVGhlbWU6ICdwZXJpb2QnXG4gICAgfTtcbiAgICBqUXVlcnkuZXh0ZW5kKHRydWUsIHRoaXMuY29uZmlnLCBjb25maWcpO1xuXG4gICAgLy8g66mk67KEIOuzgOyImCDstIjquLDtmZRcbiAgICB0aGlzLiR0YXJnZXQgPSBudWxsO1xuICAgIHRoaXMuc2VsZWN0aW9uID0gW107XG4gICAgdGhpcy5zZWxlY3Rpb25NYXAgPSB7fTtcbiAgICB0aGlzLnNlbGVjdGFibGVNYXAgPSB7fTtcbiAgICB0aGlzLm1hcmtlck1hcCA9IHt9O1xuICAgIHRoaXMucHJpbnRlZERheSA9IHtcbiAgICAgIHN0YXJ0OiBcIlwiLCBlbmQ6IFwiXCJcbiAgICB9O1xuICAgIHRoaXMuc2VsZWN0YWJsZUNvdW50ID0gMTtcblxuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgQVg2VUlDYWxlbmRhci5pbml0XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqIG15Q2FsZW5kYXIuaW5pdCgpO1xuICAgKiBgYGBcbiAgICovXG4gIGluaXQoKSB7XG4gICAgdGhpcy5vblN0YXRlQ2hhbmdlZCA9IHRoaXMuY29uZmlnLm9uU3RhdGVDaGFuZ2VkO1xuICAgIGRlbGV0ZSB0aGlzLmNvbmZpZy5vblN0YXRlQ2hhbmdlZDtcbiAgICB0aGlzLm9uQ2xpY2sgPSB0aGlzLmNvbmZpZy5vbkNsaWNrO1xuICAgIGRlbGV0ZSB0aGlzLmNvbmZpZy5vbkNsaWNrO1xuXG4gICAgaWYgKCF0aGlzLmNvbmZpZy50YXJnZXQpIHtcbiAgICAgIGNvbnNvbGUubG9nKGluZm8uZ2V0RXJyb3IoXCJheDZjYWxlbmRhclwiLCBcIjQwMVwiLCBcInNldENvbmZpZ1wiKSk7XG4gICAgfVxuICAgIHRoaXMuJHRhcmdldCA9IGpRdWVyeSh0aGlzLmNvbmZpZy50YXJnZXQpO1xuICAgIHRoaXMuY29uZmlnLmRpc3BsYXlEYXRlID0gVS5kYXRlKHRoaXMuY29uZmlnLmRpc3BsYXlEYXRlKTtcblxuICAgIHRoaXMuJHRhcmdldC5odG1sKGdldEZyYW1lLmNhbGwodGhpcykpO1xuXG4gICAgLy8g67aA7IaN7IiY7KeRXG4gICAgdGhpcy4kID0ge1xuICAgICAgXCJyb290XCI6IHRoaXMuJHRhcmdldC5maW5kKCdbZGF0YS1jYWxlbmRhci1lbHM9XCJyb290XCJdJyksXG4gICAgICBcImNvbnRyb2xcIjogdGhpcy4kdGFyZ2V0LmZpbmQoJ1tkYXRhLWNhbGVuZGFyLWVscz1cImNvbnRyb2xcIl0nKSxcbiAgICAgIFwiY29udHJvbC1kaXNwbGF5XCI6IHRoaXMuJHRhcmdldC5maW5kKCdbZGF0YS1jYWxlbmRhci1lbHM9XCJjb250cm9sLWRpc3BsYXlcIl0nKSxcbiAgICAgIFwiYm9keVwiOiB0aGlzLiR0YXJnZXQuZmluZCgnW2RhdGEtY2FsZW5kYXItZWxzPVwiYm9keVwiXScpXG4gICAgfTtcblxuICAgIGlmICh0aGlzLmNvbmZpZy5jb250cm9sKSB7XG4gICAgICB0aGlzLiRbXCJyb290XCJdLm9uKHRoaXMuY29uZmlnLmNsaWNrRXZlbnROYW1lLCAnW2RhdGEtY2FsZW5kYXItbW92ZV0nLCAoZSkgPT4ge1xuICAgICAgICBtb3ZlLmNhbGwodGhpcywgZSB8fCB3aW5kb3cuZXZlbnQpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gY29sbGVjdCBzZWxlY3RhYmxlTWFwXG4gICAgaWYgKHRoaXMuY29uZmlnLnNlbGVjdGlvbikge1xuICAgICAgdGhpcy5zZXRTZWxlY3Rpb24odGhpcy5jb25maWcuc2VsZWN0aW9uLCBmYWxzZSk7XG4gICAgfVxuICAgIC8vIGNvbGxlY3Qgc2VsZWN0YWJsZU1hcFxuICAgIGlmICh0aGlzLmNvbmZpZy5zZWxlY3RhYmxlKSB7XG4gICAgICB0aGlzLnNldFNlbGVjdGFibGUodGhpcy5jb25maWcuc2VsZWN0YWJsZSwgZmFsc2UpO1xuICAgIH1cbiAgICAvLyBjb2xsZWN0IG1hcmtlck1hcFxuICAgIGlmICh0aGlzLmNvbmZpZy5tYXJrZXIpIHtcbiAgICAgIHRoaXMuc2V0TWFya2VyKHRoaXMuY29uZmlnLm1hcmtlciwgZmFsc2UpO1xuICAgIH1cblxuICAgIHNldFRpbWVvdXQoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLmNvbmZpZy5tb2RlID09PSBcImRheVwiIHx8IHRoaXMuY29uZmlnLm1vZGUgPT09IFwiZFwiKSB7XG4gICAgICAgIHByaW50RGF5LmNhbGwodGhpcywgdGhpcy5jb25maWcuZGlzcGxheURhdGUpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodGhpcy5jb25maWcubW9kZSA9PT0gXCJtb250aFwiIHx8IHRoaXMuY29uZmlnLm1vZGUgPT09IFwibVwiKSB7XG4gICAgICAgIHByaW50TW9udGguY2FsbCh0aGlzLCB0aGlzLmNvbmZpZy5kaXNwbGF5RGF0ZSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0aGlzLmNvbmZpZy5tb2RlID09PSBcInllYXJcIiB8fCB0aGlzLmNvbmZpZy5tb2RlID09PSBcInlcIikge1xuICAgICAgICBwcmludFllYXIuY2FsbCh0aGlzLCB0aGlzLmNvbmZpZy5kaXNwbGF5RGF0ZSk7XG4gICAgICB9XG4gICAgfSkuYmluZCh0aGlzKSk7XG5cbiAgICAvLyBpbml0IO2YuOy2nCDsl6zrtoBcbiAgICB0aGlzLmluaXRPbmNlKCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBBWDZVSUNhbGVuZGFyLmluaXRPbmNlXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqIG15Q2FsZW5kYXIuaW5pdE9uY2UoKTtcbiAgICogYGBgXG4gICAqL1xuICBpbml0T25jZSgpIHtcbiAgICBpZiAodGhpcy5pbml0aWFsaXplZCkgcmV0dXJuIHRoaXM7XG4gICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogT3V0cHV0cyB0byB0aGUgc2NyZWVuIGluIHRoZSBvdXRwdXQgbW9kZSBkZWZpbmVkIGluIHRoZSBDYWxlbmRhci4gSWYgeW91IHBhc3MgYW4gYXJndW1lbnQsIHlvdSBjYW4gY2hhbmdlIHRoZSBvdXRwdXQgbW9kZSBhbmQgb3V0cHV0IHJlZmVyZW5jZSBkYXRlLlxuICAgKiDsupjrprDrjZTsnZgg66qo65Oc66W8IOuzgOqyve2VqeuLiOuLpC5cbiAgICogQG1ldGhvZCBBWDZVSUNhbGVuZGFyLmNoYW5nZU1vZGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1vZGUgLSBkYXksIGQsIG1vbnRoLCBtICwgeWVhciwgeVxuICAgKiBAcGFyYW0geyhEYXRlfHN0cmluZyl9IFtjaGFuZ2VEYXRlXVxuICAgKiBAcmV0dXJuIHtBWDZVSUNhbGVuZGFyfVxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBqc1xuICAgKiBteUNhbGVuZGFyLmNoYW5nZU1vZGUoXCJ5XCIpO1xuICAgKiBteUNhbGVuZGFyLmNoYW5nZU1vZGUoXCJ5ZWFyXCIpO1xuICAgKiBteUNhbGVuZGFyLmNoYW5nZU1vZGUoXCJtb250aFwiKTtcbiAgICogbXlDYWxlbmRhci5jaGFuZ2VNb2RlKFwibVwiKTtcbiAgICogbXlDYWxlbmRhci5jaGFuZ2VNb2RlKFwiZGF5XCIpO1xuICAgKiBteUNhbGVuZGFyLmNoYW5nZU1vZGUoXCJkXCIpO1xuICAgKiBgYGBcbiAgICovXG4gIGNoYW5nZU1vZGUobW9kZSwgY2hhbmdlRGF0ZSkge1xuICAgIGlmICh0eXBlb2YgY2hhbmdlRGF0ZSAhPSBcInVuZGVmaW5lZFwiKSB0aGlzLmNvbmZpZy5kaXNwbGF5RGF0ZSA9IGNoYW5nZURhdGU7XG4gICAgaWYgKG1vZGUpIHRoaXMuY29uZmlnLm1vZGUgPSBtb2RlO1xuXG4gICAgdGhpcy4kW1wiYm9keVwiXVxuICAgICAgLnJlbW92ZUNsYXNzKFwiZmFkZWluXCIpXG4gICAgICAuYWRkQ2xhc3MoXCJmYWRlb3V0XCIpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5jb25maWcubW9kZSA9PSBcImRheVwiIHx8IHRoaXMuY29uZmlnLm1vZGUgPT0gXCJkXCIpIHtcbiAgICAgICAgcHJpbnREYXkuY2FsbCh0aGlzLCB0aGlzLmNvbmZpZy5kaXNwbGF5RGF0ZSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0aGlzLmNvbmZpZy5tb2RlID09IFwibW9udGhcIiB8fCB0aGlzLmNvbmZpZy5tb2RlID09IFwibVwiKSB7XG4gICAgICAgIHByaW50TW9udGguY2FsbCh0aGlzLCB0aGlzLmNvbmZpZy5kaXNwbGF5RGF0ZSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0aGlzLmNvbmZpZy5tb2RlID09IFwieWVhclwiIHx8IHRoaXMuY29uZmlnLm1vZGUgPT0gXCJ5XCIpIHtcbiAgICAgICAgcHJpbnRZZWFyLmNhbGwodGhpcywgdGhpcy5jb25maWcuZGlzcGxheURhdGUpO1xuICAgICAgfVxuICAgICAgdGhpcy4kW1wiYm9keVwiXS5yZW1vdmVDbGFzcyhcImZhZGVvdXRcIikuYWRkQ2xhc3MoXCJmYWRlaW5cIik7XG4gICAgfSwgdGhpcy5jb25maWcuYW5pbWF0ZVRpbWUpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQ2hhbmdlcyB0byBzdGF0ZSBhIGRhdGUgaXMgc2VsZWN0ZWQsIHdoaWNoIGlzIGluY2x1ZGVkIGluIHRoZSBzZWxlY3Rpb24uXG4gICAqIOy6mOumsOuNlOyXkCDtlbTri7nsnbzsnpDrpbwg7ISg7YOd65CcIOyDge2DnOuhnCDshKTsoJXtlanri4jri6QuXG4gICAqIEBtZXRob2QgQVg2VUlDYWxlbmRhci5zZXRTZWxlY3Rpb25cbiAgICogQHBhcmFtIHtBcnJheX0gc2VsZWN0aW9uXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzUHJpbnRdXG4gICAqIEByZXR1cm4ge0FYNlVJQ2FsZW5kYXJ9XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqIG15Q2FsZW5kYXIuc2V0U2VsZWN0aW9uKFtuZXcgRGF0ZSgpXSk7XG4gICAqIGBgYFxuICAgKi9cbiAgc2V0U2VsZWN0aW9uKHNlbGVjdGlvbiwgaXNQcmludCkge1xuICAgIHRoaXMuc2VsZWN0aW9uTWFwID0ge307XG4gICAgbGV0IHJlc3VsdCA9IHt9O1xuICAgIGNvbnN0IHByb2Nlc3NvciA9IHtcbiAgICAgICdhcnInOiBmdW5jdGlvbiAodiwgbWFwLCBjb3VudCkge1xuICAgICAgICBtYXAgPSB7fTtcbiAgICAgICAgaWYgKCFVLmlzQXJyYXkodikpIHJldHVybiBtYXA7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uID0gdiA9IHYuc3BsaWNlKDAsIGNvdW50KTtcbiAgICAgICAgdi5mb3JFYWNoKChuKSA9PiB7XG4gICAgICAgICAgaWYgKFUuaXNEYXRlKG4pKVxuICAgICAgICAgICAgbiA9IFUuZGF0ZShuLCB7J3JldHVybic6IHRoaXMuY29uZmlnLmRhdGVGb3JtYXR9KTtcbiAgICAgICAgICBtYXBbbl0gPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG1hcDtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5zZWxlY3RhYmxlQ291bnQgPSAodGhpcy5jb25maWcubXVsdGlwbGVTZWxlY3QpID8gKFUuaXNOdW1iZXIodGhpcy5jb25maWcubXVsdGlwbGVTZWxlY3QpKSA/IHRoaXMuY29uZmlnLm11bHRpcGxlU2VsZWN0IDogMiA6IDE7XG5cbiAgICBpZiAodGhpcy5jb25maWcuc2VsZWN0aW9uID0gc2VsZWN0aW9uKSB7XG4gICAgICBpZiAoVS5pc0FycmF5KHNlbGVjdGlvbikpIHtcbiAgICAgICAgcmVzdWx0ID0gcHJvY2Vzc29yLmFyci5jYWxsKHRoaXMsIHNlbGVjdGlvbiwge30sIHRoaXMuc2VsZWN0YWJsZUNvdW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuc2VsZWN0aW9uTWFwID0galF1ZXJ5LmV4dGVuZCh7fSwgcmVzdWx0KTtcbiAgICAvLyDrs4Dqsr3rgrTsmqkg7KCB7Jqp7ZWY7JesIOy2nOugpVxuXG4gICAgaWYgKGlzUHJpbnQgIT09IGZhbHNlKSBhcHBseVNlbGVjdGlvbk1hcC5jYWxsKHRoaXMpO1xuXG4gICAgcmVzdWx0ID0gbnVsbDtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIOy6mOumsOuNlOyXkOyEnCDshKDtg53rkJwg7J287J6Q66W8IOuwmO2ZmO2VqeuLiOuLpC5cbiAgICogQG1ldGhvZCBBWDZVSUNhbGVuZGFyLmdldFNlbGVjdGlvblxuICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICogQGV4YW1wbGVcbiAgICogYGBganNcbiAgICogbXlDYWxlbmRhci5nZXRTZWxlY3Rpb24oKTtcbiAgICogYGBgXG4gICAqL1xuICBnZXRTZWxlY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgZGF0ZSAvIHllYXIgLyBtb250aCB0aGF0IGNhbiBiZSBzZWxlY3RlZCBmcm9tIHRoZSBDYWxlbmRhci4gc2VsZWN0YWJsZSBpcywgQXJyYXkgYW5kIE9iamVjdCh7ZnJvbTogJycsIHRvOiAnJ30pIGlzIG1hZGUgdXAgb2YuXG4gICAqIOy6mOumsOuNlOyXkCDtlbTri7nsnbzsnpDrpbwg7ISg7YOd7ZWgIOyImCDsnojripQg7IOB7YOc66GcIOyEpOygle2VqeuLiOuLpC5cbiAgICogQG1ldGhvZCBBWDZVSUNhbGVuZGFyLnNldFNlbGVjdGFibGVcbiAgICogQHBhcmFtIHtBcnJheX0gc2VsZWN0YWJsZVxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtpc1ByaW50XVxuICAgKiBAcmV0dXJuIHtBWDZVSUNhbGVuZGFyfVxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBqc1xuICAgKiBteUNhbGVuZGFyLnNldFNlbGVjdGFibGUoWycyMDE2LTAxLTAxJywgLi4uXSk7XG4gICAqIG15Q2FsZW5kYXIuc2V0U2VsZWN0YWJsZShbbmV3IERhdGUoKSwgLi4uXSk7XG4gICAqIG15Q2FsZW5kYXIuc2V0U2VsZWN0YWJsZSh7IHJhbmdlOiBbe2Zyb206ICcyMDE2LTAxLTAxJywgdG86ICcyMDE2LTAxLTEwJ31dIH0pO1xuICAgKiBteUNhbGVuZGFyLnNldFNlbGVjdGFibGUoeyByYW5nZTogW3tmcm9tOiBuZXcgRGF0ZSgpLCB0bzogbmV3IERhdGUoKX1dIH0pO1xuICAgKiBteUNhbGVuZGFyLnNldFNlbGVjdGFibGUoeyAnMjAxNi0wMS0wMSc6IHRydWUsICcyMDE2LTAxLTAyJzogdHJ1ZSB9KTtcbiAgICogYGBgXG4gICAqL1xuICBzZXRTZWxlY3RhYmxlKHNlbGVjdGFibGUsIGlzUHJpbnQpIHtcbiAgICB0aGlzLnNlbGVjdGFibGVNYXAgPSB7fTtcbiAgICBsZXQga2V5LCByZXN1bHQgPSB7fTtcbiAgICBjb25zdCBwcm9jZXNzb3IgPSB7XG4gICAgICAnYXJyJzogZnVuY3Rpb24gKHYsIG1hcCkge1xuICAgICAgICBtYXAgPSB7fTtcbiAgICAgICAgaWYgKCFVLmlzQXJyYXkodikpIHJldHVybiBtYXA7XG4gICAgICAgIHYuZm9yRWFjaCgobikgPT4ge1xuICAgICAgICAgIGlmIChVLmlzRGF0ZShuKSkgbiA9IFUuZGF0ZShuLCB7J3JldHVybic6IHRoaXMuY29uZmlnLmRhdGVGb3JtYXR9KTtcbiAgICAgICAgICBtYXBbbl0gPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG1hcDtcbiAgICAgIH0sXG4gICAgICAnb2JqJzogZnVuY3Rpb24gKHYsIG1hcCkge1xuICAgICAgICBtYXAgPSB7fTtcbiAgICAgICAgaWYgKFUuaXNBcnJheSh2KSkgcmV0dXJuIG1hcDtcbiAgICAgICAgaWYgKHYucmFuZ2UpIHJldHVybiBtYXA7XG4gICAgICAgIGZvciAobGV0IGsgaW4gdikge1xuICAgICAgICAgIG1hcFtrXSA9IHZba107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hcDtcbiAgICAgIH0sXG4gICAgICAncmFuZ2UnOiBmdW5jdGlvbiAodiwgbWFwKSB7XG4gICAgICAgIG1hcCA9IHt9O1xuICAgICAgICBpZiAoVS5pc0FycmF5KHYpKSByZXR1cm4gbWFwO1xuICAgICAgICBpZiAoIXYucmFuZ2UpIHJldHVybiBtYXA7XG5cbiAgICAgICAgdi5yYW5nZS5mb3JFYWNoKChuKSA9PiB7XG4gICAgICAgICAgaWYgKFUuaXNEYXRlRm9ybWF0KG4uZnJvbSkgJiYgVS5pc0RhdGVGb3JtYXQobi50bykpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGQgPSBVLmRhdGUobi5mcm9tKTsgZCA8PSBVLmRhdGUobi50byk7IGQuc2V0RGF0ZShkLmdldERhdGUoKSArIDEpKSB7XG4gICAgICAgICAgICAgIG1hcFtVLmRhdGUoZCwge1wicmV0dXJuXCI6IHRoaXMuY29uZmlnLmRhdGVGb3JtYXR9KV0gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBuLmZyb207IGkgPD0gbi50bzsgaSsrKSB7XG4gICAgICAgICAgICAgIG1hcFtpXSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gbWFwO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAodGhpcy5jb25maWcuc2VsZWN0YWJsZSA9IHNlbGVjdGFibGUpIHtcbiAgICAgIGlmIChVLmlzQXJyYXkoc2VsZWN0YWJsZSkpIHtcbiAgICAgICAgcmVzdWx0ID0gcHJvY2Vzc29yLmFyci5jYWxsKHRoaXMsIHNlbGVjdGFibGUpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGZvciAoa2V5IGluIHByb2Nlc3Nvcikge1xuICAgICAgICAgIGlmIChzZWxlY3RhYmxlW2tleV0pIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHByb2Nlc3NvcltrZXldLmNhbGwodGhpcywgc2VsZWN0YWJsZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKHJlc3VsdCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmVzdWx0ID0gcHJvY2Vzc29yLm9iai5jYWxsKHRoaXMsIHNlbGVjdGFibGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5zZWxlY3RhYmxlTWFwID0gcmVzdWx0O1xuICAgIC8vIOuzgOqyveuCtOyaqSDsoIHsmqntlZjsl6wg7Lac66ClXG4gICAgaWYgKGlzUHJpbnQgIT09IGZhbHNlKSB0aGlzLmNoYW5nZU1vZGUoKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIOy6mOumsOuNlOyXkCDtnLTsnbzsnYQg7ZGc7Iuc7ZWp64uI64ukLlxuICAgKiBAbWV0aG9kIEFYNlVJQ2FsZW5kYXIubWFya2VyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBtYXJrZXJcbiAgICogQHBhcmFtIHtib29sZWFufSBbaXNBcHBseV1cbiAgICogQHJldHVybiB7QVg2VUlDYWxlbmRhcn1cbiAgICogQGV4YW1wbGVcbiAgICogYGBganNcbiAgICogbXlDYWxlbmRhci5zZXRNYXJrZXIoe1xuICAgICAqICcyMDE2LTAyLTA3Jzoge3RoZW1lOiAnaG9saWRheScsIGxhYmVsOiAn7ISk64KgJ30sXG4gICAgICogJzIwMTYtMDItMDgnOiB7dGhlbWU6ICdob2xpZGF5JywgbGFiZWw6ICfshKTrgqAnfSxcbiAgICAgKiAnMjAxNi0wMi0wOSc6IHt0aGVtZTogJ2hvbGlkYXknLCBsYWJlbDogJ+yEpOuCoCd9LFxuICAgICAqICcyMDE2LTAyLTEwJzoge3RoZW1lOiAnaG9saWRheScsIGxhYmVsOiAn64yA7LK07Zy07J28J31cbiAgICAgKiAgfSk7XG4gICAqIGBgYFxuICAgKi9cbiAgc2V0TWFya2VyKG1hcmtlciwgaXNBcHBseSkge1xuICAgIHRoaXMubWFya2VyTWFwID0ge307XG4gICAgbGV0IGtleSwgcmVzdWx0ID0ge307XG4gICAgY29uc3QgcHJvY2Vzc29yID0ge1xuICAgICAgJ29iaic6IGZ1bmN0aW9uICh2LCBtYXApIHtcbiAgICAgICAgbWFwID0ge307XG4gICAgICAgIGlmIChVLmlzQXJyYXkodikpIHJldHVybiBtYXA7XG4gICAgICAgIGlmICh2LnJhbmdlKSByZXR1cm4gbWFwO1xuICAgICAgICBmb3IgKGxldCBrIGluIHYpIHtcbiAgICAgICAgICBtYXBba10gPSB2W2tdO1xuICAgICAgICB9XG5cbiAgICAgICAgdiA9IG51bGw7XG4gICAgICAgIHJldHVybiBtYXA7XG4gICAgICB9LFxuICAgICAgJ3JhbmdlJzogZnVuY3Rpb24gKHYsIG1hcCkge1xuICAgICAgICBtYXAgPSB7fTtcbiAgICAgICAgaWYgKFUuaXNBcnJheSh2KSkgcmV0dXJuIG1hcDtcbiAgICAgICAgaWYgKCF2LnJhbmdlKSByZXR1cm4gbWFwO1xuXG4gICAgICAgIHYucmFuZ2UuZm9yRWFjaCgobikgPT4ge1xuICAgICAgICAgIGlmIChVLmlzRGF0ZUZvcm1hdChuLmZyb20pICYmIFUuaXNEYXRlRm9ybWF0KG4udG8pKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBkID0gVS5kYXRlKG4uZnJvbSk7IGQgPD0gVS5kYXRlKG4udG8pOyBkLnNldERhdGUoZC5nZXREYXRlKCkgKyAxKSkge1xuICAgICAgICAgICAgICBtYXBbVS5kYXRlKGQsIHtcInJldHVyblwiOiB0aGlzLmNvbmZpZy5kYXRlRm9ybWF0fSldID0ge3RoZW1lOiBuLnRoZW1lLCBsYWJlbDogbi5sYWJlbH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IG4uZnJvbTsgaSA8PSBuLnRvOyBpKyspIHtcbiAgICAgICAgICAgICAgbWFwW2ldID0ge3RoZW1lOiBuLnRoZW1lLCBsYWJlbDogbi5sYWJlbH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB2ID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIG1hcDtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuY29uZmlnLm1hcmtlciA9IG1hcmtlcikge1xuICAgICAgZm9yIChrZXkgaW4gcHJvY2Vzc29yKSB7XG4gICAgICAgIGlmIChtYXJrZXJba2V5XSkge1xuICAgICAgICAgIHJlc3VsdCA9IHByb2Nlc3NvcltrZXldLmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKE9iamVjdC5rZXlzKHJlc3VsdCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJlc3VsdCA9IHByb2Nlc3Nvci5vYmouY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMubWFya2VyTWFwID0gcmVzdWx0O1xuICAgIC8vIOuzgOqyveuCtOyaqSDsoIHsmqntlZjsl6wg7Lac66ClXG4gICAgaWYgKGlzQXBwbHkgIT09IGZhbHNlKSBhcHBseU1hcmtlck1hcC5jYWxsKHRoaXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgQVg2VUlDYWxlbmRhci5zZXRQZXJpb2RcbiAgICogQHBhcmFtIHtPYmplY3R9IHBlcmlvZFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0FwcGx5XVxuICAgKiBAcmV0dXJuIHtBWDZVSUNhbGVuZGFyfVxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBqc1xuICAgKiBteUNhbGVuZGFyLnNldFBlcmlvZCh7XG4gICAgICogIHJhbmdlOiBbXG4gICAgICogICAgICB7ZnJvbTogJzIwMTYtMDctMDUnLCB0bzogJzIwMTYtMDctMDknLCBmcm9tTGFiZWw6ICfsi5zsnpEnLCB0b0xhYmVsOiAn7KKF66OMJ30sXG4gICAgICogICAgICB7ZnJvbTogJzIwMTYtMDctMTEnLCB0bzogJzIwMTYtMDctMTUnLCBmcm9tTGFiZWw6ICfsi5zsnpEnLCB0b0xhYmVsOiAn7KKF66OMJ31cbiAgICAgKiAgXVxuICAgICAqIH0pO1xuICAgKiBgYGBcbiAgICovXG4gIHNldFBlcmlvZChwZXJpb2QsIGlzQXBwbHkpIHtcbiAgICBsZXQga2V5LCByZXN1bHQgPSB7fTtcbiAgICBjb25zdCBwcm9jZXNzb3IgPSB7XG4gICAgICAncmFuZ2UnOiBmdW5jdGlvbiAodiwgbWFwKSB7XG4gICAgICAgIG1hcCA9IHt9O1xuICAgICAgICBpZiAoVS5pc0FycmF5KHYpKSByZXR1cm4gbWFwO1xuICAgICAgICBpZiAoIXYucmFuZ2UpIHJldHVybiBtYXA7XG5cbiAgICAgICAgdi5yYW5nZS5mb3JFYWNoKChuKSA9PiB7XG4gICAgICAgICAgaWYgKFUuaXNEYXRlRm9ybWF0KG4uZnJvbSkgJiYgVS5pc0RhdGVGb3JtYXQobi50bykpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGQgPSBuZXcgRGF0ZShVLmRhdGUobi5mcm9tKSk7IGQgPD0gVS5kYXRlKG4udG8pOyBkLnNldERhdGUoZC5nZXREYXRlKCkgKyAxKSkge1xuICAgICAgICAgICAgICBpZiAoZC5nZXRUaW1lKCkgPT0gVS5kYXRlKG4uZnJvbSkuZ2V0VGltZSgpKSB7XG4gICAgICAgICAgICAgICAgbWFwW1UuZGF0ZShkLCB7XCJyZXR1cm5cIjogdGhpcy5jb25maWcuZGF0ZUZvcm1hdH0pXSA9IHtcbiAgICAgICAgICAgICAgICAgIHRoZW1lOiBuLnRoZW1lIHx8IHRoaXMuY29uZmlnLmRlZmF1bHRQZXJpb2RUaGVtZSxcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiBuLmZyb21MYWJlbFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoZC5nZXRUaW1lKCkgPT0gVS5kYXRlKG4udG8pLmdldFRpbWUoKSkge1xuICAgICAgICAgICAgICAgIG1hcFtVLmRhdGUoZCwge1wicmV0dXJuXCI6IHRoaXMuY29uZmlnLmRhdGVGb3JtYXR9KV0gPSB7XG4gICAgICAgICAgICAgICAgICB0aGVtZTogbi50aGVtZSB8fCB0aGlzLmNvbmZpZy5kZWZhdWx0UGVyaW9kVGhlbWUsXG4gICAgICAgICAgICAgICAgICBsYWJlbDogbi50b0xhYmVsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtYXBbVS5kYXRlKGQsIHtcInJldHVyblwiOiB0aGlzLmNvbmZpZy5kYXRlRm9ybWF0fSldID0ge3RoZW1lOiBuLnRoZW1lIHx8IHRoaXMuY29uZmlnLmRlZmF1bHRQZXJpb2RUaGVtZX07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHYgPSBudWxsO1xuICAgICAgICByZXR1cm4gbWFwO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyDrs4Dqsr3rgrTsmqkg7KCB7Jqp7ZWY7JesIOy2nOugpVxuICAgIGlmIChpc0FwcGx5ICE9PSBmYWxzZSkge1xuICAgICAgY2xlYXJQZXJpb2RNYXAuY2FsbCh0aGlzKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb25maWcucGVyaW9kID0gcGVyaW9kKSB7XG4gICAgICByZXN1bHQgPSBwcm9jZXNzb3IucmFuZ2UuY2FsbCh0aGlzLCBwZXJpb2QpO1xuICAgIH1cblxuICAgIHRoaXMucGVyaW9kTWFwID0gcmVzdWx0O1xuXG4gICAgLy8g67OA6rK964K07JqpIOyggeyaqe2VmOyXrCDstpzroKVcbiAgICBpZiAoaXNBcHBseSAhPT0gZmFsc2UpIHtcbiAgICAgIGFwcGx5UGVyaW9kTWFwLmNhbGwodGhpcyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFYNlVJQ2FsZW5kYXI7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL3NyYy9BWDZVSUNhbGVuZGFyLmpzIiwiaW1wb3J0IGpRdWVyeSBmcm9tIFwianFtaW5cIjtcbmltcG9ydCBBWDZVSUNvcmUgZnJvbSBcIi4vQVg2VUlDb3JlXCI7XG5pbXBvcnQgaW5mbyBmcm9tIFwiLi9BWDZJbmZvXCI7XG5pbXBvcnQgVSBmcm9tIFwiLi9BWDZVdGlsXCI7XG5pbXBvcnQgbXVzdGFjaGUgZnJvbSBcIi4vQVg2TXVzdGFjaGVcIjtcbi8qIH5+fn5+fn5+fn5+fn5+fn5+fiBlbmQgb2YgaW1wb3J0ICB+fn5+fn5+fn5+fn5+fn5+fn5+fiAqL1xuXG5jb25zdCBmcmFtZVRtcGwgPSBmdW5jdGlvbiAoY29sdW1uS2V5cykge1xuICByZXR1cm4gYFxuPGRpdiBkYXRhLWF4NnVpLXBhbGV0dGU9XCJcIj5cbjxkaXYgZGF0YS1heDZwYWxldHRlLWNvbnRhaW5lcj1cInJvb3RcIj5cbiAgICA8ZGl2IGRhdGEtYXg2cGFsZXR0ZS1jb250YWluZXI9XCJjb2xvcnNcIj48L2Rpdj5cbiAgICA8ZGl2IGRhdGEtYXg2cGFsZXR0ZS1jb250YWluZXI9XCJjb250cm9sc1wiPjwvZGl2PlxuPC9kaXY+XG48L2Rpdj5cbmA7XG59O1xuY29uc3QgY29sb3JzVG1wbCA9IGZ1bmN0aW9uIChjb2x1bW5LZXlzKSB7XG4gIHJldHVybiBgXG57eyNjb2xvcnN9fVxue3sjbGlzdH19XG48ZGl2IGRhdGEtYXg2cGFsZXR0ZS1jb2xvcj1cInt7bGFiZWx9fVwiIGRhdGEtYXg2cGFsZXR0ZS1jb2xvci1pbmRleD1cInt7QGl9fVwiPlxuICAgIDxkaXYgZGF0YS1wYW5lbD1cImNvbG9yLXByZXZpZXdcIiBzdHlsZT1cInBhZGRpbmc6e3twcmV2aWV3LmNlbGxQYWRkaW5nfX1weDt3aWR0aDp7e3ByZXZpZXcuY2VsbFdpZHRofX1weDtcIj5cbiAgICAgICAgPGRpdiBkYXRhLXBhbmVsPVwiY29sb3ItYm94XCIgc3R5bGU9XCJ3aWR0aDp7e3ByZXZpZXcud2lkdGh9fXB4O2hlaWdodDp7e3ByZXZpZXcuaGVpZ2h0fX1weDtcIj48ZGl2IGRhdGEtcGFuZWw9XCJjb2xvclwiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjp7e3ZhbHVlfX07XCI+PC9kaXY+PC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBkYXRhLXBhbmVsPVwiY29sb3ItbGFiZWxcIiBzdHlsZT1cIndpZHRoOnt7bGFiZWwud2lkdGh9fXB4O1wiPnt7bGFiZWx9fTwvZGl2PlxuICAgIDxkaXYgZGF0YS1wYW5lbD1cImNvbG9yLXNsaWRlclwiPlxuICAgICAgICA8ZGl2IGRhdGEtcGFuZWw9XCJjb2xvci10cmFja1wiIHN0eWxlPVwiaGVpZ2h0Ont7c2xpZGVyLnRyYWNrSGVpZ2h0fX1weDtiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsIHt7X2NvbG9yMHZhbHVlfX0sIHt7X2NvbG9yMXZhbHVlfX0sIHt7X2NvbG9yMnZhbHVlfX0pOyBcIj5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1wYW5lbD1cImNvbG9yLWhhbmRsZVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1wYW5lbD1cImNvbG9yLWhhbmRsZS1hZnRlclwiIHN0eWxlPVwid2lkdGg6e3tzbGlkZXIuaGFuZGxlV2lkdGh9fXB4O2hlaWdodDp7e3NsaWRlci5oYW5kbGVXaWR0aH19cHg7bGVmdDp7e3NsaWRlci5oYW5kbGVMZWZ0fX1weDt0b3A6e3tzbGlkZXIuaGFuZGxlTGVmdH19cHg7XCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L2Rpdj5cbnt7L2xpc3R9fVxue3svY29sb3JzfX1cbmA7XG59O1xuY29uc3QgRU5NID0ge1xuICBcIm1vdXNlZG93blwiOiAoaW5mby5zdXBwb3J0VG91Y2gpID8gXCJ0b3VjaHN0YXJ0XCIgOiBcIm1vdXNlZG93blwiLFxuICBcIm1vdXNlbW92ZVwiOiAoaW5mby5zdXBwb3J0VG91Y2gpID8gXCJ0b3VjaG1vdmVcIiA6IFwibW91c2Vtb3ZlXCIsXG4gIFwibW91c2V1cFwiOiAoaW5mby5zdXBwb3J0VG91Y2gpID8gXCJ0b3VjaGVuZFwiIDogXCJtb3VzZXVwXCJcbn07XG5jb25zdCBvblN0YXRlQ2hhbmdlZCA9IGZ1bmN0aW9uIChvcHRzLCB0aGF0KSB7XG4gIGlmIChvcHRzICYmIG9wdHMub25TdGF0ZUNoYW5nZWQpIHtcbiAgICBvcHRzLm9uU3RhdGVDaGFuZ2VkLmNhbGwodGhhdCwgdGhhdCk7XG4gIH1cbiAgZWxzZSBpZiAodGhpcy5vblN0YXRlQ2hhbmdlZCkge1xuICAgIHRoaXMub25TdGF0ZUNoYW5nZWQuY2FsbCh0aGF0LCB0aGF0KTtcbiAgfVxuXG4gIHRoYXQgPSBudWxsO1xufTtcbmNvbnN0IGdldE1vdXNlUG9zaXRpb24gPSBmdW5jdGlvbiAoZSkge1xuICBsZXQgbW91c2VPYmosIG9yaWdpbmFsRXZlbnQgPSAoZS5vcmlnaW5hbEV2ZW50KSA/IGUub3JpZ2luYWxFdmVudCA6IGU7XG4gIG1vdXNlT2JqID0gKCdjaGFuZ2VkVG91Y2hlcycgaW4gb3JpZ2luYWxFdmVudCAmJiBvcmlnaW5hbEV2ZW50LmNoYW5nZWRUb3VjaGVzKSA/IG9yaWdpbmFsRXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0gOiBvcmlnaW5hbEV2ZW50O1xuICAvLyBjbGllbnRYLCBZIOyTsOuptCDsiqTtgazroaTsl5DshJwg66y47KCcIOuwnOyDnVxuICByZXR1cm4ge1xuICAgIGNsaWVudFg6IG1vdXNlT2JqLnBhZ2VYLFxuICAgIGNsaWVudFk6IG1vdXNlT2JqLnBhZ2VZXG4gIH1cbn07XG5jb25zdCBiaW5kSGFuZGxlID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgaXRlbS5vcmlnaW5hbFRyYWNrV2lkdGggPSBpdGVtLiR0cmFjay53aWR0aCgpO1xuICBpdGVtLnRyYWNrV2lkdGggPSBpdGVtLm9yaWdpbmFsVHJhY2tXaWR0aCAtICh0aGlzLmNvbmZpZy5jb2xvcnMuc2xpZGVyLmhhbmRsZVdpZHRoIC8gNSk7XG4gIGxldCBoYW5kbGVMZWZ0ID0gYW1vdW50VG9IYW5kbGVMZWZ0LmNhbGwodGhpcywgaXRlbSwgaXRlbS5fYW1vdW50KTtcblxuICAvLyBoYW5kbGVMZWZ0IOqwgCDrspTsnITrpbwg67KX7Ja064KY66m0P1xuICBpZiAoaGFuZGxlTGVmdCA8IDAgfHwgaGFuZGxlTGVmdCA+IGl0ZW0udHJhY2tXaWR0aCkge1xuICAgIGxldCBhbW91bnQ7XG4gICAgaGFuZGxlTGVmdCA9IGhhbmRsZUxlZnQgPCAwID8gMCA6IGhhbmRsZUxlZnQgPiBpdGVtLnRyYWNrV2lkdGggPyBpdGVtLnRyYWNrV2lkdGggOiBoYW5kbGVMZWZ0O1xuICAgIGFtb3VudCA9IGhhbmRsZUxlZnRUb0Ftb3VudC5jYWxsKHRoaXMsIGl0ZW0sIGhhbmRsZUxlZnQpO1xuICAgIHVwZGF0ZVByZXZpZXdDb2xvci5jYWxsKHRoaXMsIGl0ZW0sIGFtb3VudFRvQ29sb3IuY2FsbCh0aGlzLCBpdGVtLCBhbW91bnQpKTtcbiAgfVxuXG4gIGl0ZW0uJGhhbmRsZS5jc3Moe2xlZnQ6IGhhbmRsZUxlZnR9KTtcbiAgaXRlbS4kaXRlbVxuICAgIC5vZmYoRU5NW1wibW91c2Vkb3duXCJdKVxuICAgIC5vbihFTk1bXCJtb3VzZWRvd25cIl0sICdbZGF0YS1wYW5lbD1cImNvbG9yLWhhbmRsZVwiXScsIChlKSA9PiB7XG4gICAgICBsZXQgbW91c2VPYmogPSBnZXRNb3VzZVBvc2l0aW9uKGUpO1xuICAgICAgaXRlbS5fb3JpZ2luYWxIYW5kbGVDbGllbnRYID0gbW91c2VPYmouY2xpZW50WDtcbiAgICAgIGl0ZW0uX29yaWdpbmFsSGFuZGxlTGVmdCA9IGl0ZW0uJGhhbmRsZS5wb3NpdGlvbigpLmxlZnQ7XG4gICAgICBoYW5kbGVNb3ZlRXZlbnQub24uY2FsbCh0aGlzLCBpdGVtKTtcbiAgICAgIFUuc3RvcEV2ZW50KGUub3JpZ2luYWxFdmVudCk7XG4gICAgfSlcbiAgICAub2ZmKFwiY2xpY2tcIilcbiAgICAub24oXCJjbGlja1wiLCAnW2RhdGEtcGFuZWw9XCJjb2xvci1sYWJlbFwiXSwgW2RhdGEtcGFuZWw9XCJjb2xvci1wcmV2aWV3XCJdJywgKGUpID0+IHtcbiAgICAgIGlmICh0aGlzLm9uQ2xpY2spIHtcbiAgICAgICAgdGhpcy5vbkNsaWNrLmNhbGwoaXRlbSwgJyMnICsgaXRlbS5fc2VsZWN0ZWRDb2xvci50b1VwcGVyQ2FzZSgpLCBlKTtcbiAgICAgIH1cbiAgICB9KVxuICAgIC5vbihcImNsaWNrXCIsICdbZGF0YS1wYW5lbD1cImNvbG9yLXRyYWNrXCJdJywgKGUpID0+IHtcbiAgICAgIGlmIChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBhbmVsXCIpID09IFwiY29sb3ItdHJhY2tcIikge1xuICAgICAgICBsZXQgbW91c2VPYmogPSBnZXRNb3VzZVBvc2l0aW9uKGUpLFxuICAgICAgICAgIG5ld0hhbmRsZUxlZnQgPSBtb3VzZU9iai5jbGllbnRYIC0gaXRlbS4kdHJhY2sub2Zmc2V0KCkubGVmdCxcbiAgICAgICAgICBhbW91bnQgPSBoYW5kbGVMZWZ0VG9BbW91bnQoaXRlbSwgbmV3SGFuZGxlTGVmdCk7XG5cbiAgICAgICAgaXRlbS4kaGFuZGxlLmNzcyh7bGVmdDogbmV3SGFuZGxlTGVmdH0pO1xuICAgICAgICB1cGRhdGVQcmV2aWV3Q29sb3IuY2FsbCh0aGlzLCBpdGVtLCBhbW91bnRUb0NvbG9yLmNhbGwodGhpcywgaXRlbSwgYW1vdW50KSwgZSk7XG5cbiAgICAgICAgbW91c2VPYmogPSBudWxsO1xuICAgICAgICBuZXdIYW5kbGVMZWZ0ID0gbnVsbDtcbiAgICAgICAgYW1vdW50ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcbn07XG5jb25zdCB1cGRhdGVQcmV2aWV3Q29sb3IgPSBmdW5jdGlvbiAoaXRlbSwgY29sb3IsIGV2ZW50KSB7XG4gIGl0ZW0uJHByZXZpZXdcbiAgICAuY3NzKHtcImJhY2tncm91bmQtY29sb3JcIjogJyMnICsgY29sb3J9KTtcbiAgaXRlbS4kbGFiZWwuaHRtbCgnIycgKyBjb2xvci50b1VwcGVyQ2FzZSgpKTtcbiAgaXRlbS5fc2VsZWN0ZWRDb2xvciA9IGNvbG9yO1xuXG4gIGlmIChldmVudCAmJiB0aGlzLm9uVXBkYXRlQ29sb3IpIHtcbiAgICB0aGlzLm9uVXBkYXRlQ29sb3IuY2FsbChpdGVtLCAnIycgKyBpdGVtLl9zZWxlY3RlZENvbG9yLnRvVXBwZXJDYXNlKCkpO1xuICB9XG59O1xuY29uc3QgYW1vdW50VG9Db2xvciA9IGZ1bmN0aW9uIChpdGVtLCBhbW91bnQpIHtcbiAgY29uc3QgcHJvY2Vzc29yID0ge1xuICAgIFwiYmxhY2tcIihfY29sb3IsIF9hbW91bnQpIHtcbiAgICAgIHJldHVybiBfY29sb3IubGlnaHRlbih0aGlzLmNvbmZpZy5jb2xvcnMuc2xpZGVyLmFtb3VudCAvIDIpLmRhcmtlbihfYW1vdW50KS5nZXRIZXhWYWx1ZSgpO1xuICAgIH0sXG4gICAgXCJ3aGl0ZVwiKF9jb2xvciwgX2Ftb3VudCkge1xuICAgICAgcmV0dXJuIF9jb2xvci5kYXJrZW4odGhpcy5jb25maWcuY29sb3JzLnNsaWRlci5hbW91bnQgLyAyKS5kYXJrZW4oX2Ftb3VudCkuZ2V0SGV4VmFsdWUoKTtcbiAgICB9LFxuICAgIFwibm9ybWFsXCIoX2NvbG9yLCBfYW1vdW50KSB7XG4gICAgICByZXR1cm4gX2NvbG9yLmRhcmtlbihfYW1vdW50KS5nZXRIZXhWYWx1ZSgpO1xuICAgIH1cbiAgfTtcblxuICBpZiAoaXRlbS5fdW5pcUNvbG9yIGluIHByb2Nlc3Nvcikge1xuICAgIHJldHVybiBwcm9jZXNzb3JbaXRlbS5fdW5pcUNvbG9yXS5jYWxsKHRoaXMsIGl0ZW0uX2NvbG9yLCBhbW91bnQpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBwcm9jZXNzb3JbXCJub3JtYWxcIl0uY2FsbCh0aGlzLCBpdGVtLl9jb2xvciwgYW1vdW50KTtcbiAgfVxufTtcbmNvbnN0IGNvbG9yVG9BbW91bnQgPSBmdW5jdGlvbiAoaXRlbSwgY29sb3IpIHtcbiAgLy8vIHRvZG8gOiDsg4nsg4Hsl5Ag6rCA6rmM7Jq0IOyDiSDtkZztmIQuXG4gIGNvbnN0IHByb2Nlc3NvciA9IHtcbiAgICBcImJsYWNrXCIoX2NvbG9yLCBfZGlmZkNvbG9yKSB7XG4gICAgICBsZXQgY29sb3IxID0gX2NvbG9yLmxpZ2h0ZW4odGhpcy5jb25maWcuY29sb3JzLnNsaWRlci5hbW91bnQgLyAyKTtcbiAgICAgIHJldHVybiAoY29sb3IxLmdldEhzbCgpLmwgLSBfZGlmZkNvbG9yLmdldEhzbCgpLmwpICogMTAwO1xuICAgIH0sXG4gICAgXCJ3aGl0ZVwiKF9jb2xvciwgX2RpZmZDb2xvcikge1xuICAgICAgbGV0IGNvbG9yMSA9IF9jb2xvci5kYXJrZW4odGhpcy5jb25maWcuY29sb3JzLnNsaWRlci5hbW91bnQgLyAyKTtcbiAgICAgIHJldHVybiAoY29sb3IxLmdldEhzbCgpLmwgLSBfZGlmZkNvbG9yLmdldEhzbCgpLmwpICogMTAwO1xuICAgIH0sXG4gICAgXCJub3JtYWxcIihfY29sb3IsIF9kaWZmQ29sb3IpIHtcbiAgICAgIHJldHVybiAoX2NvbG9yLmdldEhzbCgpLmwgLSBfZGlmZkNvbG9yLmdldEhzbCgpLmwpICogMTAwO1xuICAgIH1cbiAgfTtcblxuICBpZiAoaXRlbS5fdW5pcUNvbG9yIGluIHByb2Nlc3Nvcikge1xuICAgIHJldHVybiBwcm9jZXNzb3JbaXRlbS5fdW5pcUNvbG9yXS5jYWxsKHRoaXMsIGl0ZW0uX2NvbG9yLCBjb2xvcik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHByb2Nlc3NvcltcIm5vcm1hbFwiXS5jYWxsKHRoaXMsIGl0ZW0uX2NvbG9yLCBjb2xvcik7XG4gIH1cbn07XG5jb25zdCBoYW5kbGVMZWZ0VG9BbW91bnQgPSBmdW5jdGlvbiAoaXRlbSwgaGFuZGxlTGVmdCkge1xuICByZXR1cm4gdGhpcy5jb25maWcuY29sb3JzLnNsaWRlci5hbW91bnQgKiAoaGFuZGxlTGVmdCAtIChpdGVtLnRyYWNrV2lkdGggLyAyKSkgLyAoaXRlbS5vcmlnaW5hbFRyYWNrV2lkdGggLyAyKVxufTtcbmNvbnN0IGFtb3VudFRvSGFuZGxlTGVmdCA9IGZ1bmN0aW9uIChpdGVtLCBhbW91bnQpIHtcbiAgcmV0dXJuIChhbW91bnQgKiAoaXRlbS5vcmlnaW5hbFRyYWNrV2lkdGggLyAyKSAvIHRoaXMuY29uZmlnLmNvbG9ycy5zbGlkZXIuYW1vdW50KSArIChpdGVtLnRyYWNrV2lkdGggLyAyKVxufTtcbmNvbnN0IGhhbmRsZU1vdmVFdmVudCA9IHtcbiAgXCJvblwiKGl0ZW0pIHtcbiAgICBqUXVlcnkoZG9jdW1lbnQuYm9keSlcbiAgICAgIC5vbihFTk1bXCJtb3VzZW1vdmVcIl0gKyBcIi5heDZwYWxldHRlLVwiICsgdGhpcy5pbnN0YW5jZUlkLCAoZSkgPT4ge1xuICAgICAgICBsZXQgbW91c2VPYmogPSBnZXRNb3VzZVBvc2l0aW9uKGUpLFxuICAgICAgICAgIGRhID0gbW91c2VPYmouY2xpZW50WCAtIGl0ZW0uX29yaWdpbmFsSGFuZGxlQ2xpZW50WCxcbiAgICAgICAgICBuZXdIYW5kbGVMZWZ0ID0gaXRlbS5fb3JpZ2luYWxIYW5kbGVMZWZ0ICsgZGEsXG4gICAgICAgICAgYW1vdW50O1xuXG4gICAgICAgIG5ld0hhbmRsZUxlZnQgPSBuZXdIYW5kbGVMZWZ0IDwgMCA/IDAgOiBuZXdIYW5kbGVMZWZ0ID4gaXRlbS50cmFja1dpZHRoID8gaXRlbS50cmFja1dpZHRoIDogbmV3SGFuZGxlTGVmdDtcbiAgICAgICAgaXRlbS4kaGFuZGxlLmNzcyh7bGVmdDogbmV3SGFuZGxlTGVmdH0pO1xuICAgICAgICBhbW91bnQgPSBoYW5kbGVMZWZ0VG9BbW91bnQuY2FsbCh0aGlzLCBpdGVtLCBuZXdIYW5kbGVMZWZ0KTtcblxuICAgICAgICB1cGRhdGVQcmV2aWV3Q29sb3IuY2FsbCh0aGlzLCBpdGVtLCBhbW91bnRUb0NvbG9yLmNhbGwodGhpcywgaXRlbSwgYW1vdW50KSwgZSk7XG5cbiAgICAgICAgbW91c2VPYmogPSBudWxsO1xuICAgICAgICBkYSA9IG51bGw7XG4gICAgICB9KVxuICAgICAgLm9uKEVOTVtcIm1vdXNldXBcIl0gKyBcIi5heDZwYWxldHRlLVwiICsgdGhpcy5pbnN0YW5jZUlkLCAoZSkgPT4ge1xuICAgICAgICBoYW5kbGVNb3ZlRXZlbnQub2ZmLmNhbGwodGhpcyk7XG4gICAgICAgIFUuc3RvcEV2ZW50KGUpO1xuICAgICAgfSlcbiAgICAgIC5vbihcIm1vdXNlbGVhdmUuYXg2cGFsZXR0ZS1cIiArIHRoaXMuaW5zdGFuY2VJZCwgKGUpID0+IHtcbiAgICAgICAgaGFuZGxlTW92ZUV2ZW50Lm9mZi5jYWxsKHRoaXMpO1xuICAgICAgICBVLnN0b3BFdmVudChlKTtcbiAgICAgIH0pO1xuXG4gICAgalF1ZXJ5KGRvY3VtZW50LmJvZHkpXG4gICAgICAuYXR0cigndW5zZWxlY3RhYmxlJywgJ29uJylcbiAgICAgIC5jc3MoJ3VzZXItc2VsZWN0JywgJ25vbmUnKVxuICAgICAgLm9uKCdzZWxlY3RzdGFydCcsIGZhbHNlKTtcbiAgfSxcbiAgXCJvZmZcIigpIHtcbiAgICB0aGlzLnh2YXIucmVzaXplckxpdmVkID0gZmFsc2U7XG5cbiAgICBqUXVlcnkoZG9jdW1lbnQuYm9keSlcbiAgICAgIC5vZmYoRU5NW1wibW91c2Vtb3ZlXCJdICsgXCIuYXg2cGFsZXR0ZS1cIiArIHRoaXMuaW5zdGFuY2VJZClcbiAgICAgIC5vZmYoRU5NW1wibW91c2V1cFwiXSArIFwiLmF4NnBhbGV0dGUtXCIgKyB0aGlzLmluc3RhbmNlSWQpXG4gICAgICAub2ZmKFwibW91c2VsZWF2ZS5heDZwYWxldHRlLVwiICsgdGhpcy5pbnN0YW5jZUlkKTtcblxuICAgIGpRdWVyeShkb2N1bWVudC5ib2R5KVxuICAgICAgLnJlbW92ZUF0dHIoJ3Vuc2VsZWN0YWJsZScpXG4gICAgICAuY3NzKCd1c2VyLXNlbGVjdCcsICdhdXRvJylcbiAgICAgIC5vZmYoJ3NlbGVjdHN0YXJ0Jyk7XG4gIH1cbn07XG5jb25zdCByZXBhaW50ID0gZnVuY3Rpb24gKHNlbGVjdGVkQ29sb3IpIHtcbiAgbGV0IGJveCA9IHtcbiAgICB3aWR0aDogdGhpcy4kdGFyZ2V0LmlubmVyV2lkdGgoKSxcbiAgICBoZWlnaHQ6IHRoaXMuJHRhcmdldC5pbm5lckhlaWdodCgpLFxuICB9O1xuXG4gIC8vIO2MqOuEkCDtlITroIjsnoQg7LSI6riw7ZmUXG4gIHRoaXMuJHRhcmdldC5odG1sKG11c3RhY2hlLnJlbmRlcihmcmFtZVRtcGwuY2FsbCh0aGlzKSwge30sIHRoaXMuY29uZmlnLmNvbHVtbktleXMpKTtcblxuXG4gIC8vIOqwgSDtjKjrhJDrk6TsnYQg7LqQ7IuxflxuICB0aGlzLiQgPSB7XG4gICAgXCJyb290XCI6IHRoaXMuJHRhcmdldC5maW5kKCdbZGF0YS1heDZwYWxldHRlLWNvbnRhaW5lcj1cInJvb3RcIl0nKSxcbiAgICBcImNvbG9yc1wiOiB0aGlzLiR0YXJnZXQuZmluZCgnW2RhdGEtYXg2cGFsZXR0ZS1jb250YWluZXI9XCJjb2xvcnNcIl0nKSxcbiAgICBcImNvbnRyb2xzXCI6IHRoaXMuJHRhcmdldC5maW5kKCdbZGF0YS1heDZwYWxldHRlLWNvbnRhaW5lcj1cImNvbnRyb2xzXCJdJyksXG4gIH07XG5cbiAgLy8gdG9kbyA6IGNvbnRyb2xzIOuCmOykkeyXkCDqs6Drr7ztlZjsl6wg6rWs7ZiEXG4gIC8vIHRoaXMuJFtcImNvbnRyb2xzXCJdLmNzcyh7aGVpZ2h0OiB0aGlzLmNvbmZpZy5jb250cm9scy5oZWlnaHR9KTtcblxuICAvLy8gY29sb3JzLmxpc3Qg7IOJ7IOBIOuylOychCDqsrDsoJUgLyDstIjquLDtmZRcbiAgdGhpcy5jb25maWcuY29sb3JzLmxpc3QuZm9yRWFjaCgoYykgPT4ge1xuICAgIGMuX2NvbG9yID0gVS5jb2xvcihjLnZhbHVlKTtcbiAgICBjLl9zZWxlY3RlZENvbG9yID0gYy5fY29sb3IuZ2V0SGV4VmFsdWUoKTtcbiAgICBpZiAoYy5fY29sb3IuciA9PSAwICYmIGMuX2NvbG9yLmcgPT0gMCAmJiBjLl9jb2xvci5iID09IDApIHtcbiAgICAgIGMuX2Ftb3VudCA9IHRoaXMuY29uZmlnLmNvbG9ycy5zbGlkZXIuYW1vdW50O1xuICAgICAgYy5fdW5pcUNvbG9yID0gXCJibGFja1wiO1xuICAgICAgYy5fY29sb3IwdmFsdWUgPSBcIiNcIiArIGMuX2NvbG9yLmxpZ2h0ZW4odGhpcy5jb25maWcuY29sb3JzLnNsaWRlci5hbW91bnQpLmdldEhleFZhbHVlKCk7XG4gICAgICBjLl9jb2xvcjF2YWx1ZSA9IFwiI1wiICsgYy5fY29sb3IubGlnaHRlbih0aGlzLmNvbmZpZy5jb2xvcnMuc2xpZGVyLmFtb3VudCAvIDIpLmdldEhleFZhbHVlKCk7XG4gICAgICBjLl9jb2xvcjJ2YWx1ZSA9IFwiI1wiICsgYy5fY29sb3IuZ2V0SGV4VmFsdWUoKTtcbiAgICB9IGVsc2UgaWYgKGMuX2NvbG9yLnIgPT0gMjU1ICYmIGMuX2NvbG9yLmcgPT0gMjU1ICYmIGMuX2NvbG9yLmIgPT0gMjU1KSB7XG4gICAgICBjLl9hbW91bnQgPSAtdGhpcy5jb25maWcuY29sb3JzLnNsaWRlci5hbW91bnQ7XG4gICAgICBjLl91bmlxQ29sb3IgPSBcIndoaXRlXCI7XG4gICAgICBjLl9jb2xvcjB2YWx1ZSA9IFwiI1wiICsgYy5fY29sb3IuZ2V0SGV4VmFsdWUoKTtcbiAgICAgIGMuX2NvbG9yMXZhbHVlID0gXCIjXCIgKyBjLl9jb2xvci5kYXJrZW4odGhpcy5jb25maWcuY29sb3JzLnNsaWRlci5hbW91bnQgLyAyKS5nZXRIZXhWYWx1ZSgpO1xuICAgICAgYy5fY29sb3IydmFsdWUgPSBcIiNcIiArIGMuX2NvbG9yLmRhcmtlbih0aGlzLmNvbmZpZy5jb2xvcnMuc2xpZGVyLmFtb3VudCkuZ2V0SGV4VmFsdWUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYy5fYW1vdW50ID0gMDtcbiAgICAgIGMuX2NvbG9yMHZhbHVlID0gXCIjXCIgKyBjLl9jb2xvci5saWdodGVuKHRoaXMuY29uZmlnLmNvbG9ycy5zbGlkZXIuYW1vdW50KS5nZXRIZXhWYWx1ZSgpO1xuICAgICAgYy5fY29sb3IxdmFsdWUgPSBcIiNcIiArIGMuX2NvbG9yLmdldEhleFZhbHVlKCk7XG4gICAgICBjLl9jb2xvcjJ2YWx1ZSA9IFwiI1wiICsgYy5fY29sb3IuZGFya2VuKHRoaXMuY29uZmlnLmNvbG9ycy5zbGlkZXIuYW1vdW50KS5nZXRIZXhWYWx1ZSgpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8g7IOJ7IOd7KGw7KCIIO2VuOuTpOydmCDsnITsuZgg7KGw7KCVdGhpcy5jb25maWcuY29sb3JzLmxpc3RbbWluRGlmZkNvbG9ySW5kZXhdXG4gIHRoaXMuY29uZmlnLmNvbG9ycy5zbGlkZXIuaGFuZGxlTGVmdCA9IC10aGlzLmNvbmZpZy5jb2xvcnMuc2xpZGVyLmhhbmRsZVdpZHRoIC8gMjtcbiAgdGhpcy5jb25maWcuY29sb3JzLnNsaWRlci5oYW5kbGVUb3AgPSAtdGhpcy5jb25maWcuY29sb3JzLnNsaWRlci5oYW5kbGVIZWlnaHQgLyAyO1xuXG4gIC8vIO2MlOugm+2KuCDsu6zrn6wg7Yyo64SQIOy0iOq4sO2ZlFxuICB0aGlzLiRbXCJjb2xvcnNcIl0uaHRtbChtdXN0YWNoZS5yZW5kZXIoY29sb3JzVG1wbC5jYWxsKHRoaXMpLCB0aGlzLmNvbmZpZywgdGhpcy5jb25maWcuY29sdW1uS2V5cykpO1xuXG4gIHRoaXMuJFtcImNvbG9yc1wiXS5maW5kKCdbZGF0YS1heDZwYWxldHRlLWNvbG9yLWluZGV4XScpLmVhY2goKGVsSWR4LCBlbCkgPT4ge1xuICAgIGxldCBpZHggPSBlbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWF4NnBhbGV0dGUtY29sb3ItaW5kZXhcIik7XG4gICAgbGV0IGNvbG9yID0gdGhpcy5jb25maWcuY29sb3JzLmxpc3RbaWR4XTtcbiAgICBsZXQgaXRlbSA9IGpRdWVyeS5leHRlbmQoe30sIGNvbG9yKTtcbiAgICBpdGVtLl9pbmRleCA9IGlkeDtcbiAgICBpdGVtLiRpdGVtID0galF1ZXJ5KGVsKTtcbiAgICBpdGVtLiRwcmV2aWV3ID0gaXRlbS4kaXRlbS5maW5kKCdbZGF0YS1wYW5lbD1cImNvbG9yXCJdJyk7XG4gICAgaXRlbS4kbGFiZWwgPSBpdGVtLiRpdGVtLmZpbmQoJ1tkYXRhLXBhbmVsPVwiY29sb3ItbGFiZWxcIl0nKTtcbiAgICBpdGVtLiR0cmFjayA9IGl0ZW0uJGl0ZW0uZmluZCgnW2RhdGEtcGFuZWw9XCJjb2xvci10cmFja1wiXScpO1xuICAgIGl0ZW0uJGhhbmRsZSA9IGl0ZW0uJGl0ZW0uZmluZCgnW2RhdGEtcGFuZWw9XCJjb2xvci1oYW5kbGVcIl0nKTtcbiAgICBiaW5kSGFuZGxlLmNhbGwodGhpcywgaXRlbSk7XG4gICAgLy8vLy9cbiAgICB0aGlzLmNvbG9ycy5wdXNoKGl0ZW0pO1xuICB9KTtcblxuICBpZiAoc2VsZWN0ZWRDb2xvcikge1xuICAgIHRoaXMuc2V0U2VsZWN0ZWRDb2xvcihzZWxlY3RlZENvbG9yKTtcbiAgfVxufTtcbi8qIH5+fn5+fn5+fn5+fn5+fn5+fiBlbmQgb2YgcHJpdmF0ZSAgfn5+fn5+fn5+fn5+fn5+fn5+fn4gKi9cblxuLyoqXG4gKiBAY2xhc3NcbiAqL1xuY2xhc3MgQVg2VUlQYWxldHRlIGV4dGVuZHMgQVg2VUlDb3JlIHtcbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gY29uZmlnXG4gICAqIEBwYXJhbSBbY29uZmlnLnRoZW1lXVxuICAgKiBAcGFyYW0gY29uZmlnLnRhcmdldFxuICAgKiBAcGFyYW0gW2NvbmZpZy5hbmltYXRlVGltZV1cbiAgICogQHBhcmFtIHtTdHJpbmd9IFtjb25maWcuc2VsZWN0ZWRDb2xvcl1cbiAgICogQHBhcmFtIHtPYmplY3R9IFtjb25maWcuY29sb3JzXVxuICAgKiBAcGFyYW0ge09iamVjdH0gW2NvbmZpZy5jb2xvcnMucHJldmlld11cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtjb25maWcuY29sb3JzLnByZXZpZXcud2lkdGg9MjRdXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbY29uZmlnLmNvbG9ycy5wcmV2aWV3LmhlaWdodD0yNF1cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtjb25maWcuY29sb3JzLnByZXZpZXcuY2VsbFdpZHRoPTMwXVxuICAgKiBAcGFyYW0ge09iamVjdH0gW2NvbmZpZy5jb2xvcnMubGFiZWxdXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbY29uZmlnLmNvbG9ycy5sYWJlbC53aWR0aD04MF1cbiAgICogQHBhcmFtIHtPYmplY3R9IFtjb25maWcuY29sb3JzLnNsaWRlcl1cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtjb25maWcuY29sb3JzLnNsaWRlci50cmFja0hlaWdodD04XVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2NvbmZpZy5jb2xvcnMuc2xpZGVyLmFtb3VudD0zMl1cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtjb25maWcuY29sb3JzLnNsaWRlci5oYW5kbGVXaWR0aD0xOF1cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtjb25maWcuY29sb3JzLnNsaWRlci5oYW5kbGVIZWlnaHQ9MThdXG4gICAqIEBwYXJhbSB7T2JqZWN0W119IFtjb25maWcuY29sb3JzLmxpc3Q9W3JlZCxvcmFuZ2UseWVsbG93LGdyZWVuLGJsdWUscHVycGxlLGJsYWNrLHdoaXRlXV1cbiAgICogQHBhcmFtIHtTdHJpbmd9IGNvbmZpZy5jb2xvcnMubGlzdFtdLmxhYmVsXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBjb25maWcuY29sb3JzLmxpc3RbXS52YWx1ZVxuICAgKiBAcGFyYW0ge09iamVjdH0gW2NvbmZpZy5jb250cm9sc11cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtjb25maWcuY29udHJvbHMuaGVpZ2h0PTBdXG4gICAqIEBwYXJhbSBbY29uZmlnLm9uU3RhdGVDaGFuZ2VkXVxuICAgKiBAcGFyYW0gW2NvbmZpZy5vbkNsaWNrXVxuICAgKiBAcGFyYW0gW2NvbmZpZy5vblVwZGF0ZUNvbG9yXVxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBqc1xuICAgKiBteVBhbGV0dGUgPSBuZXcgUGFsZXR0ZSh7XG4gICAgICogIHRhcmdldDogJCgnW2RhdGEtYXg1cGFsZXR0ZT1cIjAxXCJdJyksXG4gICAgICogIG9uQ2xpY2s6IGZ1bmN0aW9uIChoZXhDb2xvcikge1xuICAgICAqICAgICAgYWxlcnQoaGV4Q29sb3IpO1xuICAgICAqICB9XG4gICAgICogfSk7XG4gICAqXG4gICAqIG15UGFsZXR0ZSA9IG5ldyBQYWxldHRlKHtcbiAgICAgKiAgdGFyZ2V0OiAkKCdbZGF0YS1heDVwYWxldHRlPVwiMDFcIl0nKSxcbiAgICAgKiAgY29sb3JzOiB7XG4gICAgICogICAgICBsaXN0OiBbXG4gICAgICogICAgICAgICAge2xhYmVsOiBcInJlZFwiLCB2YWx1ZTogXCIjZmYwMDAwXCJ9LFxuICAgICAqICAgICAgICAgIHtsYWJlbDogXCJvcmFuZ2VcIiwgdmFsdWU6IFwiI2ZmOTgwMlwifSxcbiAgICAgKiAgICAgICAgICB7bGFiZWw6IFwieWVsbG93XCIsIHZhbHVlOiBcIiNmZmZmMDBcIn0sXG4gICAgICogICAgICAgICAge2xhYmVsOiBcInNreWJsdWVcIiwgdmFsdWU6IFwiIzg0ZTRmZlwifSxcbiAgICAgKiAgICAgICAgICB7bGFiZWw6IFwid2hpdGVcIiwgdmFsdWU6IFwiI2ZmZmZmZlwifVxuICAgICAqICAgICAgXVxuICAgICAqICB9XG4gICAgICogIG9uQ2xpY2s6IGZ1bmN0aW9uIChoZXhDb2xvcikge1xuICAgICAqXG4gICAgICogIH1cbiAgICAgKiB9KTtcbiAgICogYGBgXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgLyoqXG4gICAgICogQG1lbWJlciB7SlNPTn1cbiAgICAgKiBAcGFyYW0gY29uZmlnXG4gICAgICogQHBhcmFtIGNvbmZpZy50YXJnZXRcbiAgICAgKiBAcGFyYW0gW2NvbmZpZy50aGVtZT1kZWZhdWx0XVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmNsaWNrRXZlbnROYW1lPVwiY2xpY2tcIl1cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5hbmltYXRlVGltZT0xMDBdXG4gICAgICogQHBhcmFtIFtjb25maWcuY29sb3JzXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmNvbG9ycy5wcmV2aWV3XVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmNvbG9ycy5wcmV2aWV3LndpZHRoPTI0XVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmNvbG9ycy5wcmV2aWV3LGhlaWdodD0yNF1cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5jb2xvcnMucHJldmlldy5jZWxsV2lkdGg9MzBdXG4gICAgICogQHBhcmFtIFtjb25maWcuY29sb3JzLmxhYmVsXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmNvbG9ycy5sYWJlbC53aWR0aD04MF1cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5jb2xvcnMuc2xpZGVyXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmNvbG9ycy5zbGlkZXIudHJhY2tIZWlnaHQ9OF1cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5jb2xvcnMuc2xpZGVyLmFtb3VudD0zMl1cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5jb2xvcnMuc2xpZGVyLmhhbmRsZVdpZHRoPTE4XVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmNvbG9ycy5zbGlkZXIuaGFuZGxlSGVpZ2h0PTE4XVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmNvbG9ycy5saXN0XVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmNvbG9ycy5saXN0W10ubGFiZWxdXG4gICAgICogQHBhcmFtIFtjb25maWcuY29sb3JzLmxpc3RbXS52YWx1ZV1cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5jb250cm9sc11cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5jb250cm9scy5oZWlnaHQ9MF1cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5jb2x1bW5LZXlzPXt9XVxuICAgICAqIEBwYXJhbSBbY29uZmlnLm9uU3RhdGVDaGFuZ2VkXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLm9uQ2xpY2tdXG4gICAgICovXG4gICAgdGhpcy5jb25maWcgPSB7XG4gICAgICBjbGlja0V2ZW50TmFtZTogXCJjbGlja1wiLFxuICAgICAgdGhlbWU6ICdkZWZhdWx0JyxcbiAgICAgIGFuaW1hdGVUaW1lOiAxMDAsXG4gICAgICBjb2xvcnM6IHtcbiAgICAgICAgcHJldmlldzoge1xuICAgICAgICAgIHdpZHRoOiAyNCxcbiAgICAgICAgICBoZWlnaHQ6IDI0LFxuICAgICAgICAgIGNlbGxXaWR0aDogMzBcbiAgICAgICAgfSxcbiAgICAgICAgbGFiZWw6IHtcbiAgICAgICAgICB3aWR0aDogODBcbiAgICAgICAgfSxcbiAgICAgICAgc2xpZGVyOiB7XG4gICAgICAgICAgdHJhY2tIZWlnaHQ6IDgsXG4gICAgICAgICAgYW1vdW50OiAzMixcbiAgICAgICAgICBoYW5kbGVXaWR0aDogMTgsXG4gICAgICAgICAgaGFuZGxlSGVpZ2h0OiAxOCxcbiAgICAgICAgfSxcbiAgICAgICAgbGlzdDogW1xuICAgICAgICAgIHtsYWJlbDogXCJyZWRcIiwgdmFsdWU6IFwiI2ZmMDAwMFwifSxcbiAgICAgICAgICB7bGFiZWw6IFwib3JhbmdlXCIsIHZhbHVlOiBcIiNmZjk4MDJcIn0sXG4gICAgICAgICAge2xhYmVsOiBcInllbGxvd1wiLCB2YWx1ZTogXCIjZmZmZjAwXCJ9LFxuICAgICAgICAgIHtsYWJlbDogXCJncmVlblwiLCB2YWx1ZTogXCIjMDBmZjM2XCJ9LFxuICAgICAgICAgIHtsYWJlbDogXCJibHVlXCIsIHZhbHVlOiBcIiMwMDAwZmZcIn0sXG4gICAgICAgICAge2xhYmVsOiBcInB1cnBsZVwiLCB2YWx1ZTogXCIjYmEwMGZmXCJ9LFxuICAgICAgICAgIC8ve2xhYmVsOiBcInNreWJsdWVcIiwgdmFsdWU6IFwiIzg0ZTRmZlwifSxcbiAgICAgICAgICAvL3tsYWJlbDogXCJwaW5rXCIsIHZhbHVlOiBcIiNmZjc3YzRcIn0sXG4gICAgICAgICAge2xhYmVsOiBcImJsYWNrXCIsIHZhbHVlOiBcIiMwMDAwMDBcIn0sXG4gICAgICAgICAge2xhYmVsOiBcIndoaXRlXCIsIHZhbHVlOiBcIiNmZmZmZmZcIn0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAgY29udHJvbHM6IHtcbiAgICAgICAgaGVpZ2h0OiAwLFxuICAgICAgfSxcbiAgICAgIGNvbHVtbktleXM6IHt9XG4gICAgfTtcbiAgICBqUXVlcnkuZXh0ZW5kKHRydWUsIHRoaXMuY29uZmlnLCBjb25maWcpO1xuXG4gICAgLy8g66mk67KEIOuzgOyImCDstIjquLDtmZRcbiAgICAvKipcbiAgICAgKiBAbWVtYmVyIHtPYmplY3R9XG4gICAgICovXG4gICAgdGhpcy4kdGFyZ2V0ID0gbnVsbDtcbiAgICAvKipcbiAgICAgKiBAbWVtYmVyIHtPYmplY3R9XG4gICAgICovXG4gICAgdGhpcy54dmFyID0ge307XG4gICAgLyoqXG4gICAgICogQG1lbWJlciB7QXJyYXl9XG4gICAgICovXG4gICAgdGhpcy5jb2xvcnMgPSBbXTtcblxuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQHBhcmFtIGNvbmZpZ1xuICAgKiBAcGFyYW0gW2NvbmZpZy50aGVtZV1cbiAgICogQHBhcmFtIGNvbmZpZy50YXJnZXRcbiAgICogQHBhcmFtIFtjb25maWcuYW5pbWF0ZVRpbWVdXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbY29uZmlnLnNlbGVjdGVkQ29sb3JdXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbY29uZmlnLmNvbG9yc11cbiAgICogQHBhcmFtIHtPYmplY3R9IFtjb25maWcuY29sb3JzLnByZXZpZXddXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbY29uZmlnLmNvbG9ycy5wcmV2aWV3LndpZHRoPTI0XVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2NvbmZpZy5jb2xvcnMucHJldmlldy5oZWlnaHQ9MjRdXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbY29uZmlnLmNvbG9ycy5wcmV2aWV3LmNlbGxXaWR0aD0zMF1cbiAgICogQHBhcmFtIHtPYmplY3R9IFtjb25maWcuY29sb3JzLmxhYmVsXVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2NvbmZpZy5jb2xvcnMubGFiZWwud2lkdGg9ODBdXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbY29uZmlnLmNvbG9ycy5zbGlkZXJdXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbY29uZmlnLmNvbG9ycy5zbGlkZXIudHJhY2tIZWlnaHQ9OF1cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtjb25maWcuY29sb3JzLnNsaWRlci5hbW91bnQ9MzJdXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbY29uZmlnLmNvbG9ycy5zbGlkZXIuaGFuZGxlV2lkdGg9MThdXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbY29uZmlnLmNvbG9ycy5zbGlkZXIuaGFuZGxlSGVpZ2h0PTE4XVxuICAgKiBAcGFyYW0ge09iamVjdFtdfSBbY29uZmlnLmNvbG9ycy5saXN0PVtyZWQsb3JhbmdlLHllbGxvdyxncmVlbixibHVlLHB1cnBsZSxibGFjayx3aGl0ZV1dXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBjb25maWcuY29sb3JzLmxpc3RbXS5sYWJlbFxuICAgKiBAcGFyYW0ge1N0cmluZ30gY29uZmlnLmNvbG9ycy5saXN0W10udmFsdWVcbiAgICogQHBhcmFtIHtPYmplY3R9IFtjb25maWcuY29udHJvbHNdXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbY29uZmlnLmNvbnRyb2xzLmhlaWdodD0wXVxuICAgKiBAcGFyYW0gW2NvbmZpZy5vblN0YXRlQ2hhbmdlZF1cbiAgICogQHBhcmFtIFtjb25maWcub25DbGlja11cbiAgICogQHBhcmFtIFtjb25maWcub25VcGRhdGVDb2xvcl1cbiAgICovXG4gIGluaXQoKSB7XG4gICAgdGhpcy5vblN0YXRlQ2hhbmdlZCA9IHRoaXMuY29uZmlnLm9uU3RhdGVDaGFuZ2VkO1xuICAgIGRlbGV0ZSB0aGlzLmNvbmZpZy5vblN0YXRlQ2hhbmdlZDtcbiAgICB0aGlzLm9uQ2xpY2sgPSB0aGlzLmNvbmZpZy5vbkNsaWNrO1xuICAgIGRlbGV0ZSB0aGlzLmNvbmZpZy5vbkNsaWNrO1xuICAgIHRoaXMub25VcGRhdGVDb2xvciA9IHRoaXMuY29uZmlnLm9uVXBkYXRlQ29sb3I7XG4gICAgZGVsZXRlIHRoaXMuY29uZmlnLm9uVXBkYXRlQ29sb3I7XG5cbiAgICBpZiAoIXRoaXMuY29uZmlnLnRhcmdldCkge1xuICAgICAgY29uc29sZS5sb2coaW5mby5nZXRFcnJvcihcImF4NnBhbGV0dGVcIiwgXCI0MDFcIiwgXCJzZXRDb25maWdcIikpO1xuICAgIH1cbiAgICB0aGlzLiR0YXJnZXQgPSBqUXVlcnkodGhpcy5jb25maWcudGFyZ2V0KTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgcmVwYWludC5jYWxsKHRoaXMsICh0aGlzLmNvbmZpZy5zZWxlY3RlZENvbG9yIHx8IFwiXCIpLnRyaW0oKSk7IC8vIO2MlOugm+2KuCDqt7jrpqzquLAuXG4gICAgfSk7XG5cbiAgICAvLyBpbml0IO2YuOy2nCDsl6zrtoBcbiAgICB0aGlzLmluaXRPbmNlKCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKi9cbiAgaW5pdE9uY2UoKSB7XG4gICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpIHJldHVybiB0aGlzO1xuICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQHJldHVybiB7QVg2VUlQYWxldHRlfVxuICAgKi9cbiAgcmVwYWludCgpIHtcbiAgICByZXBhaW50LmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAcGFyYW0gc2VsZWN0ZWRDb2xvclxuICAgKiBAcmV0dXJuIHtBWDZVSVBhbGV0dGV9XG4gICAqL1xuICBzZXRTZWxlY3RlZENvbG9yKHNlbGVjdGVkQ29sb3IpIHtcbiAgICBsZXQgc0NvbG9yID0gVS5jb2xvcihzZWxlY3RlZENvbG9yLnRyaW0oKSk7XG4gICAgLy8g7KeA7KCV65CcIOyDieydtCDqsIDsnqUg6rCA6rmM7Jq0IO2MjOugmyDqsoDsg4lcbiAgICBsZXQgbWluRGlmZkNvbG9yID0gMjU1ICogMywgbWluRGlmZkNvbG9ySW5kZXggPSAtMTtcblxuICAgIHRoaXMuY29sb3JzLmZvckVhY2goZnVuY3Rpb24gKGMsIGNpZHgpIHtcbiAgICAgIGxldCBjMWhzbCA9IGMuX2NvbG9yLmdldEhzbCgpLCBjMmhzbCA9IHNDb2xvci5nZXRIc2woKTtcbiAgICAgIGxldCBkaWZmQ29sb3IgPSBNYXRoLmFicyhjMWhzbC5oIC0gYzJoc2wuaCkgKyBNYXRoLmFicyhjMWhzbC5zIC0gYzJoc2wucykgKyBNYXRoLmFicyhjMWhzbC5sIC0gYzJoc2wubCk7XG4gICAgICBpZiAoZGlmZkNvbG9yIDwgbWluRGlmZkNvbG9yKSB7XG4gICAgICAgIG1pbkRpZmZDb2xvciA9IGRpZmZDb2xvcjtcbiAgICAgICAgbWluRGlmZkNvbG9ySW5kZXggPSBjaWR4O1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKG1pbkRpZmZDb2xvckluZGV4ID4gLTEpIHtcbiAgICAgIGxldCBhbW91bnQsIGhhbmRsZUxlZnQsXG4gICAgICAgIGl0ZW0gPSB0aGlzLmNvbG9yc1ttaW5EaWZmQ29sb3JJbmRleF07XG5cbiAgICAgIGl0ZW0uX2Ftb3VudCA9IGNvbG9yVG9BbW91bnQuY2FsbCh0aGlzLCBpdGVtLCBzQ29sb3IpO1xuICAgICAgaGFuZGxlTGVmdCA9IGFtb3VudFRvSGFuZGxlTGVmdC5jYWxsKHRoaXMsIGl0ZW0sIGl0ZW0uX2Ftb3VudCk7XG4gICAgICAvL2hhbmRsZUxlZnQgPSBoYW5kbGVMZWZ0IDwgMCA/IDAgOiBoYW5kbGVMZWZ0ID4gaXRlbS50cmFja1dpZHRoID8gaXRlbS50cmFja1dpZHRoIDogaGFuZGxlTGVmdDtcbiAgICAgIGl0ZW0uJGhhbmRsZS5jc3Moe2xlZnQ6IGhhbmRsZUxlZnR9KTtcblxuICAgICAgYW1vdW50ID0gaGFuZGxlTGVmdFRvQW1vdW50LmNhbGwodGhpcywgaXRlbSwgaGFuZGxlTGVmdCk7XG4gICAgICB1cGRhdGVQcmV2aWV3Q29sb3IuY2FsbCh0aGlzLCBpdGVtLCBhbW91bnRUb0NvbG9yLmNhbGwodGhpcywgaXRlbSwgYW1vdW50KSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQVg2VUlQYWxldHRlO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9zcmMvQVg2VUlQYWxldHRlLmpzIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3N0eWxlLnNjc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge31cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGUuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGUuc2Nzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vc3JjL0FYNlVJUGFsZXR0ZS9zdHlsZS5zY3NzXG4vLyBtb2R1bGUgaWQgPSA3MVxuLy8gbW9kdWxlIGNodW5rcyA9IDMgNiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh1bmRlZmluZWQpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiQC13ZWJraXQta2V5ZnJhbWVzIHNvbWV0aGluZy1hbmltYXRpb24ge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDEuMDsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAwLjU7IH0gfVxcblxcbkAtbW96LWtleWZyYW1lcyBzb21ldGhpbmctYW5pbWF0aW9uIHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAxLjA7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMC41OyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIHNvbWV0aGluZy1hbmltYXRpb24ge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDEuMDsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAwLjU7IH0gfVxcblxcbltkYXRhLWF4NnVpLXBhbGV0dGVdIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG4gIFtkYXRhLWF4NnVpLXBhbGV0dGVdICosXFxuICBbZGF0YS1heDZ1aS1wYWxldHRlXSAqOmJlZm9yZSxcXG4gIFtkYXRhLWF4NnVpLXBhbGV0dGVdICo6YWZ0ZXIge1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94OyB9XFxuICBbZGF0YS1heDZ1aS1wYWxldHRlXSBbZGF0YS1heDZwYWxldHRlLWNvbnRhaW5lcj1cXFwicm9vdFxcXCJdIFtkYXRhLWF4NnBhbGV0dGUtY29udGFpbmVyPVxcXCJjb2xvcnNcXFwiXSB7XFxuICAgIGRpc3BsYXk6IHRhYmxlO1xcbiAgICB3aWR0aDogMTAwJTsgfVxcbiAgICBbZGF0YS1heDZ1aS1wYWxldHRlXSBbZGF0YS1heDZwYWxldHRlLWNvbnRhaW5lcj1cXFwicm9vdFxcXCJdIFtkYXRhLWF4NnBhbGV0dGUtY29udGFpbmVyPVxcXCJjb2xvcnNcXFwiXSBbZGF0YS1heDZwYWxldHRlLWNvbG9yXSB7XFxuICAgICAgZGlzcGxheTogdGFibGUtcm93O1xcbiAgICAgIHVzZXItc2VsZWN0OiBub25lO1xcbiAgICAgIHRleHQtYWxpZ246IGxlZnQ7IH1cXG4gICAgICBbZGF0YS1heDZ1aS1wYWxldHRlXSBbZGF0YS1heDZwYWxldHRlLWNvbnRhaW5lcj1cXFwicm9vdFxcXCJdIFtkYXRhLWF4NnBhbGV0dGUtY29udGFpbmVyPVxcXCJjb2xvcnNcXFwiXSBbZGF0YS1heDZwYWxldHRlLWNvbG9yXSBbZGF0YS1wYW5lbF0ge1xcbiAgICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgfVxcbiAgICAgIFtkYXRhLWF4NnVpLXBhbGV0dGVdIFtkYXRhLWF4NnBhbGV0dGUtY29udGFpbmVyPVxcXCJyb290XFxcIl0gW2RhdGEtYXg2cGFsZXR0ZS1jb250YWluZXI9XFxcImNvbG9yc1xcXCJdIFtkYXRhLWF4NnBhbGV0dGUtY29sb3JdOmhvdmVyIFtkYXRhLXBhbmVsPVxcXCJjb2xvci1wcmV2aWV3XFxcIl0gW2RhdGEtcGFuZWw9XFxcImNvbG9yLWJveFxcXCJdIHtcXG4gICAgICAgIGJhY2tncm91bmQ6ICNjY2M7XFxuICAgICAgICBib3JkZXItY29sb3I6ICNCOUJBQkM7IH1cXG4gICAgICBbZGF0YS1heDZ1aS1wYWxldHRlXSBbZGF0YS1heDZwYWxldHRlLWNvbnRhaW5lcj1cXFwicm9vdFxcXCJdIFtkYXRhLWF4NnBhbGV0dGUtY29udGFpbmVyPVxcXCJjb2xvcnNcXFwiXSBbZGF0YS1heDZwYWxldHRlLWNvbG9yXTpob3ZlciBbZGF0YS1wYW5lbD1cXFwiY29sb3ItcHJldmlld1xcXCJdIFtkYXRhLXBhbmVsPVxcXCJjb2xvclxcXCJdIHtcXG4gICAgICAgIGJvcmRlci1jb2xvcjogI0I5QkFCQzsgfVxcbiAgICAgIFtkYXRhLWF4NnVpLXBhbGV0dGVdIFtkYXRhLWF4NnBhbGV0dGUtY29udGFpbmVyPVxcXCJyb290XFxcIl0gW2RhdGEtYXg2cGFsZXR0ZS1jb250YWluZXI9XFxcImNvbG9yc1xcXCJdIFtkYXRhLWF4NnBhbGV0dGUtY29sb3JdOmhvdmVyIFtkYXRhLXBhbmVsPVxcXCJjb2xvci1sYWJlbFxcXCJdIHtcXG4gICAgICAgIGNvbG9yOiAjY2NjOyB9XFxuICAgICAgW2RhdGEtYXg2dWktcGFsZXR0ZV0gW2RhdGEtYXg2cGFsZXR0ZS1jb250YWluZXI9XFxcInJvb3RcXFwiXSBbZGF0YS1heDZwYWxldHRlLWNvbnRhaW5lcj1cXFwiY29sb3JzXFxcIl0gW2RhdGEtYXg2cGFsZXR0ZS1jb2xvcl06YWN0aXZlIFtkYXRhLXBhbmVsPVxcXCJjb2xvci1wcmV2aWV3XFxcIl0gW2RhdGEtcGFuZWw9XFxcImNvbG9yLWJveFxcXCJdIHtcXG4gICAgICAgIGJhY2tncm91bmQ6ICMwYTY4YjQ7XFxuICAgICAgICBib3JkZXItY29sb3I6ICMwMDA7IH1cXG4gICAgICBbZGF0YS1heDZ1aS1wYWxldHRlXSBbZGF0YS1heDZwYWxldHRlLWNvbnRhaW5lcj1cXFwicm9vdFxcXCJdIFtkYXRhLWF4NnBhbGV0dGUtY29udGFpbmVyPVxcXCJjb2xvcnNcXFwiXSBbZGF0YS1heDZwYWxldHRlLWNvbG9yXTphY3RpdmUgW2RhdGEtcGFuZWw9XFxcImNvbG9yLXByZXZpZXdcXFwiXSBbZGF0YS1wYW5lbD1cXFwiY29sb3JcXFwiXSB7XFxuICAgICAgICBib3JkZXItY29sb3I6ICMwMDA7IH1cXG4gICAgICBbZGF0YS1heDZ1aS1wYWxldHRlXSBbZGF0YS1heDZwYWxldHRlLWNvbnRhaW5lcj1cXFwicm9vdFxcXCJdIFtkYXRhLWF4NnBhbGV0dGUtY29udGFpbmVyPVxcXCJjb2xvcnNcXFwiXSBbZGF0YS1heDZwYWxldHRlLWNvbG9yXTphY3RpdmUgW2RhdGEtcGFuZWw9XFxcImNvbG9yLWxhYmVsXFxcIl0ge1xcbiAgICAgICAgY29sb3I6ICMwYTY4YjQ7IH1cXG4gICAgICBbZGF0YS1heDZ1aS1wYWxldHRlXSBbZGF0YS1heDZwYWxldHRlLWNvbnRhaW5lcj1cXFwicm9vdFxcXCJdIFtkYXRhLWF4NnBhbGV0dGUtY29udGFpbmVyPVxcXCJjb2xvcnNcXFwiXSBbZGF0YS1heDZwYWxldHRlLWNvbG9yXSBbZGF0YS1wYW5lbD1cXFwiY29sb3ItcHJldmlld1xcXCJdIHtcXG4gICAgICAgIGRpc3BsYXk6IHRhYmxlLWNlbGw7XFxuICAgICAgICBwYWRkaW5nOiAzcHggMDtcXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjsgfVxcbiAgICAgICAgW2RhdGEtYXg2dWktcGFsZXR0ZV0gW2RhdGEtYXg2cGFsZXR0ZS1jb250YWluZXI9XFxcInJvb3RcXFwiXSBbZGF0YS1heDZwYWxldHRlLWNvbnRhaW5lcj1cXFwiY29sb3JzXFxcIl0gW2RhdGEtYXg2cGFsZXR0ZS1jb2xvcl0gW2RhdGEtcGFuZWw9XFxcImNvbG9yLXByZXZpZXdcXFwiXSBbZGF0YS1wYW5lbD1cXFwiY29sb3ItYm94XFxcIl0ge1xcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICAgICAgICAgIHBhZGRpbmc6IDJweDtcXG4gICAgICAgICAgYm9yZGVyLXdpZHRoOiAxcHg7XFxuICAgICAgICAgIGJvcmRlci1zdHlsZTogc29saWQ7XFxuICAgICAgICAgIGJvcmRlci1jb2xvcjogI0I5QkFCQztcXG4gICAgICAgICAgYmFja2dyb3VuZDogI2ZmZjsgfVxcbiAgICAgICAgW2RhdGEtYXg2dWktcGFsZXR0ZV0gW2RhdGEtYXg2cGFsZXR0ZS1jb250YWluZXI9XFxcInJvb3RcXFwiXSBbZGF0YS1heDZwYWxldHRlLWNvbnRhaW5lcj1cXFwiY29sb3JzXFxcIl0gW2RhdGEtYXg2cGFsZXR0ZS1jb2xvcl0gW2RhdGEtcGFuZWw9XFxcImNvbG9yLXByZXZpZXdcXFwiXSBbZGF0YS1wYW5lbD1cXFwiY29sb3JcXFwiXSB7XFxuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDNweDtcXG4gICAgICAgICAgYm9yZGVyLWNvbG9yOiAjQjlCQUJDO1xcbiAgICAgICAgICBib3JkZXItd2lkdGg6IDFweDtcXG4gICAgICAgICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcXG4gICAgICAgICAgaGVpZ2h0OiAxMDAlO1xcbiAgICAgICAgICBib3gtc2hhZG93OiBpbnNldCAxcHggMXB4IDFweCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNSk7IH1cXG4gICAgICBbZGF0YS1heDZ1aS1wYWxldHRlXSBbZGF0YS1heDZwYWxldHRlLWNvbnRhaW5lcj1cXFwicm9vdFxcXCJdIFtkYXRhLWF4NnBhbGV0dGUtY29udGFpbmVyPVxcXCJjb2xvcnNcXFwiXSBbZGF0YS1heDZwYWxldHRlLWNvbG9yXSBbZGF0YS1wYW5lbD1cXFwiY29sb3ItbGFiZWxcXFwiXSB7XFxuICAgICAgICBkaXNwbGF5OiB0YWJsZS1jZWxsO1xcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyOyB9XFxuICAgICAgW2RhdGEtYXg2dWktcGFsZXR0ZV0gW2RhdGEtYXg2cGFsZXR0ZS1jb250YWluZXI9XFxcInJvb3RcXFwiXSBbZGF0YS1heDZwYWxldHRlLWNvbnRhaW5lcj1cXFwiY29sb3JzXFxcIl0gW2RhdGEtYXg2cGFsZXR0ZS1jb2xvcl0gW2RhdGEtcGFuZWw9XFxcImNvbG9yLXNsaWRlclxcXCJdIHtcXG4gICAgICAgIGRpc3BsYXk6IHRhYmxlLWNlbGw7IH1cXG4gICAgICAgIFtkYXRhLWF4NnVpLXBhbGV0dGVdIFtkYXRhLWF4NnBhbGV0dGUtY29udGFpbmVyPVxcXCJyb290XFxcIl0gW2RhdGEtYXg2cGFsZXR0ZS1jb250YWluZXI9XFxcImNvbG9yc1xcXCJdIFtkYXRhLWF4NnBhbGV0dGUtY29sb3JdIFtkYXRhLXBhbmVsPVxcXCJjb2xvci1zbGlkZXJcXFwiXSBbZGF0YS1wYW5lbD1cXFwiY29sb3ItdHJhY2tcXFwiXSB7XFxuICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgICAgIGhlaWdodDogMTBweDtcXG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgICAgICAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgMnB4IHJnYmEoMCwgMCwgMCwgMC41KTsgfVxcbiAgICAgICAgW2RhdGEtYXg2dWktcGFsZXR0ZV0gW2RhdGEtYXg2cGFsZXR0ZS1jb250YWluZXI9XFxcInJvb3RcXFwiXSBbZGF0YS1heDZwYWxldHRlLWNvbnRhaW5lcj1cXFwiY29sb3JzXFxcIl0gW2RhdGEtYXg2cGFsZXR0ZS1jb2xvcl0gW2RhdGEtcGFuZWw9XFxcImNvbG9yLXNsaWRlclxcXCJdIFtkYXRhLXBhbmVsPVxcXCJjb2xvci1oYW5kbGVcXFwiXSB7XFxuICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICAgICAgbGVmdDogNTAlO1xcbiAgICAgICAgICB0b3A6IDUwJTsgfVxcbiAgICAgICAgICBbZGF0YS1heDZ1aS1wYWxldHRlXSBbZGF0YS1heDZwYWxldHRlLWNvbnRhaW5lcj1cXFwicm9vdFxcXCJdIFtkYXRhLWF4NnBhbGV0dGUtY29udGFpbmVyPVxcXCJjb2xvcnNcXFwiXSBbZGF0YS1heDZwYWxldHRlLWNvbG9yXSBbZGF0YS1wYW5lbD1cXFwiY29sb3Itc2xpZGVyXFxcIl0gW2RhdGEtcGFuZWw9XFxcImNvbG9yLWhhbmRsZVxcXCJdIFtkYXRhLXBhbmVsPVxcXCJjb2xvci1oYW5kbGUtYWZ0ZXJcXFwiXSB7XFxuICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgICAgICAgIGxlZnQ6IC0xMHB4O1xcbiAgICAgICAgICAgIHRvcDogLTEwcHg7XFxuICAgICAgICAgICAgd2lkdGg6IDIwcHg7XFxuICAgICAgICAgICAgaGVpZ2h0OiAyMHB4O1xcbiAgICAgICAgICAgIGJvcmRlci13aWR0aDogMXB4O1xcbiAgICAgICAgICAgIGJvcmRlci1zdHlsZTogc29saWQ7XFxuICAgICAgICAgICAgYm9yZGVyLWNvbG9yOiAjQjlCQUJDO1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNFQUVBRUE7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoYm90dG9tLCAjRUFFQUVBLCAjRkJGQkZCKTtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gdG9wLCNFQUVBRUEsICNGQkZCRkIpO1xcbiAgICAgICAgICAgIGJveC1zaGFkb3c6IDAgMXB4IDAgMCByZ2JhKDAsIDAsIDAsIDAuMSk7XFxuICAgICAgICAgICAgb3BhY2l0eTogMC44O1xcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgICAgICAgICBjdXJzb3I6IGNvbC1yZXNpemU7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vc3JjL0FYNlVJUGFsZXR0ZS9zdHlsZS5zY3NzXG4vLyBtb2R1bGUgaWQgPSA3MlxuLy8gbW9kdWxlIGNodW5rcyA9IDMgNiIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zdHlsZS5zY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHt9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3N0eWxlLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3N0eWxlLnNjc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL3NyYy9BWDZVSVBpY2tlci9zdHlsZS5zY3NzXG4vLyBtb2R1bGUgaWQgPSA3M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh1bmRlZmluZWQpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiQC13ZWJraXQta2V5ZnJhbWVzIGF4LXBpY2tlciB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDAuMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAwJSk7IH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAxLjA7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCk7IH0gfVxcblxcbkAtbW96LWtleWZyYW1lcyBheC1waWNrZXIge1xcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAwLjA7XFxuICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCUpOyB9XFxuICAxMDAlIHtcXG4gICAgb3BhY2l0eTogMS4wO1xcbiAgICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDApOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIGF4LXBpY2tlciB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDAuMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAwJSk7XFxuICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCUpO1xcbiAgICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCUpO1xcbiAgICAtby10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAwJSk7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDAlKTsgfVxcbiAgMTAwJSB7XFxuICAgIG9wYWNpdHk6IDEuMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAwKTtcXG4gICAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAwKTtcXG4gICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDApO1xcbiAgICAtby10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAwKTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCk7IH0gfVxcblxcbkAtd2Via2l0LWtleWZyYW1lcyBheC1waWNrZXItZGVzdHJveSB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMS4wO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDApOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDAuMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDAuOCkgdHJhbnNsYXRlKDAsIC0xMCUpOyB9IH1cXG5cXG5ALW1vei1rZXlmcmFtZXMgYXgtcGlja2VyLWRlc3Ryb3kge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDEuMDtcXG4gICAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAwKTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAwLjA7XFxuICAgIC1tb3otdHJhbnNmb3JtOiBzY2FsZSgwLjgpIHRyYW5zbGF0ZSgwLCAtMTAlKTsgfSB9XFxuXFxuQGtleWZyYW1lcyBheC1waWNrZXItZGVzdHJveSB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMS4wO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDApO1xcbiAgICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDApO1xcbiAgICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCk7XFxuICAgIC1vLXRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDApO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAwKTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAwLjA7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwLjgpIHRyYW5zbGF0ZSgwLCAtMTAlKTtcXG4gICAgLW1vei10cmFuc2Zvcm06IHNjYWxlKDAuOCkgdHJhbnNsYXRlKDAsIC0xMCUpO1xcbiAgICAtbXMtdHJhbnNmb3JtOiBzY2FsZSgwLjgpIHRyYW5zbGF0ZSgwLCAtMTAlKTtcXG4gICAgLW8tdHJhbnNmb3JtOiBzY2FsZSgwLjgpIHRyYW5zbGF0ZSgwLCAtMTAlKTtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjgpIHRyYW5zbGF0ZSgwLCAtMTAlKTsgfSB9XFxuXFxuW2RhdGEtYXg2dWktcGlja2VyXSB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgei1pbmRleDogMjAwMDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDA7XFxuICB0b3A6IDA7XFxuICAtd2Via2l0LXBlcnNwZWN0aXZlOiAxMDAwO1xcbiAgLW1vei1wZXJzcGVjdGl2ZTogMTAwMDtcXG4gIHBlcnNwZWN0aXZlOiAxMDAwO1xcbiAgLXdlYmtpdC10cmFuc2Zvcm0tc3R5bGU6IHByZXNlcnZlLTNkO1xcbiAgLW1vei10cmFuc2Zvcm0tc3R5bGU6IHByZXNlcnZlLTNkO1xcbiAgLW1zLXRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XFxuICAtby10cmFuc2Zvcm0tc3R5bGU6IHByZXNlcnZlLTNkO1xcbiAgdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcXG4gIC13ZWJraXQtYW5pbWF0aW9uOiBheC1waWNrZXIgMC4xcyBjdWJpYy1iZXppZXIoMC41NSwgMC4wNTUsIDAuNjc1LCAwLjE5KSBmb3J3YXJkcztcXG4gIC1tb3otYW5pbWF0aW9uOiBheC1waWNrZXIgMC4xcyBjdWJpYy1iZXppZXIoMC41NSwgMC4wNTUsIDAuNjc1LCAwLjE5KSBmb3J3YXJkcztcXG4gIGFuaW1hdGlvbjogYXgtcGlja2VyIDAuMXMgY3ViaWMtYmV6aWVyKDAuNTUsIDAuMDU1LCAwLjY3NSwgMC4xOSkgZm9yd2FyZHM7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWigwKTtcXG4gIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDApO1xcbiAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWigwKTtcXG4gIC1vLXRyYW5zZm9ybTogdHJhbnNsYXRlWigwKTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWigwKTtcXG4gIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIHRvcDtcXG4gIC1tb3otdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIHRvcDtcXG4gIC1tcy10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgdG9wO1xcbiAgLW8tdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIHRvcDtcXG4gIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciB0b3A7XFxuICAvKiBmbGlwIHR5cGVcXG4gIEBpbmNsdWRlIGJhY2tmYWNlLXZpc2liaWxpdHkodmlzaWJsZSk7XFxuICBAaW5jbHVkZSB0cmFuc2Zvcm0odHJhbnNsYXRlWSgwJSkgcm90YXRlWCgwZGVnKSk7XFxuICAqL1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KGJvdHRvbSwgI2ZmZik7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gdG9wLCNmZmYpO1xcbiAgYm9yZGVyOiAxcHggc29saWQ7XFxuICBib3JkZXItY29sb3I6ICNkZGQ7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBib3gtc2hhZG93OiAwcHggMHB4IDNweCAwcHggcmdiYSgwLCAwLCAwLCAwLjE3NSk7IH1cXG4gIFtkYXRhLWF4NnVpLXBpY2tlcl0gKixcXG4gIFtkYXRhLWF4NnVpLXBpY2tlcl0gKjpiZWZvcmUsXFxuICBbZGF0YS1heDZ1aS1waWNrZXJdICo6YWZ0ZXIge1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94OyB9XFxuICBbZGF0YS1heDZ1aS1waWNrZXJdIC5heC1waWNrZXItaGVhZGluZyB7XFxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICAgIHBhZGRpbmc6IDEwcHggMTVweDtcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiA0cHg7XFxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA0cHg7XFxuICAgIGNvbG9yOiAjMzMzO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1O1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudChib3R0b20sICNmNWY1ZjUpO1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gdG9wLCNmNWY1ZjUpOyB9XFxuICAgIFtkYXRhLWF4NnVpLXBpY2tlcl0gLmF4LXBpY2tlci1oZWFkaW5nIC5iYWRnZSB7XFxuICAgICAgZm9udC1zaXplOiAwLjhlbTtcXG4gICAgICBjb2xvcjogI2Y1ZjVmNTtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzMzO1xcbiAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KGJvdHRvbSwgIzMzMyk7XFxuICAgICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIHRvcCwjMzMzKTsgfVxcbiAgW2RhdGEtYXg2dWktcGlja2VyXSAuYXgtcGlja2VyLWJvZHkge1xcbiAgICBwYWRkaW5nOiA1cHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjsgfVxcbiAgICBbZGF0YS1heDZ1aS1waWNrZXJdIC5heC1waWNrZXItYm9keSAuYXgtcGlja2VyLWNvbnRlbnQge1xcbiAgICAgIG1pbi13aWR0aDogNTBweDsgfVxcbiAgICAgIFtkYXRhLWF4NnVpLXBpY2tlcl0gLmF4LXBpY2tlci1ib2R5IC5heC1waWNrZXItY29udGVudCAuYXgtcGlja2VyLWNvbnRlbnQtYm94IHtcXG4gICAgICAgIGJvcmRlcjogMHB4IHNvbGlkO1xcbiAgICAgICAgYm9yZGVyLWNvbG9yOiBub25lO1xcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMHB4O1xcbiAgICAgICAgcGFkZGluZzogMHB4O1xcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxcbiAgICBbZGF0YS1heDZ1aS1waWNrZXJdIC5heC1waWNrZXItYm9keSAuYXgtcGlja2VyLWJ1dHRvbnMge1xcbiAgICAgIHBhZGRpbmc6IDEwcHggMHB4IDVweCAwcHg7IH1cXG4gICAgICBbZGF0YS1heDZ1aS1waWNrZXJdIC5heC1waWNrZXItYm9keSAuYXgtcGlja2VyLWJ1dHRvbnMgYnV0dG9uOm5vdCg6bGFzdC1jaGlsZCkge1xcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAzcHg7IH1cXG4gIFtkYXRhLWF4NnVpLXBpY2tlcl0uZGlyZWN0aW9uLXRvcCAuYXgtcGlja2VyLWFycm93IHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMDtcXG4gICAgaGVpZ2h0OiAwO1xcbiAgICBsZWZ0OiA1MCU7XFxuICAgIHRvcDogMDsgfVxcbiAgICBbZGF0YS1heDZ1aS1waWNrZXJdLmRpcmVjdGlvbi10b3AgLmF4LXBpY2tlci1hcnJvdzpiZWZvcmUge1xcbiAgICAgIGNvbnRlbnQ6ICcgJztcXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgd2lkdGg6IDA7XFxuICAgICAgaGVpZ2h0OiAwO1xcbiAgICAgIGxlZnQ6IC0xMHB4O1xcbiAgICAgIHRvcDogLTIwcHg7XFxuICAgICAgYm9yZGVyLWxlZnQ6IDEwcHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICAgICAgYm9yZGVyLXJpZ2h0OiAxMHB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICAgIGJvcmRlci1ib3R0b206IDIwcHggc29saWQgI2RkZDsgfVxcbiAgICBbZGF0YS1heDZ1aS1waWNrZXJdLmRpcmVjdGlvbi10b3AgLmF4LXBpY2tlci1hcnJvdzphZnRlciB7XFxuICAgICAgY29udGVudDogJyAnO1xcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICB3aWR0aDogMDtcXG4gICAgICBoZWlnaHQ6IDA7XFxuICAgICAgbGVmdDogLTEwcHg7XFxuICAgICAgdG9wOiAtMThweDtcXG4gICAgICBib3JkZXItbGVmdDogMTBweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gICAgICBib3JkZXItcmlnaHQ6IDEwcHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICAgICAgYm9yZGVyLWJvdHRvbTogMjBweCBzb2xpZCAjZmZmOyB9XFxuICBbZGF0YS1heDZ1aS1waWNrZXJdLmRpcmVjdGlvbi1yaWdodCAuYXgtcGlja2VyLWFycm93IHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMDtcXG4gICAgaGVpZ2h0OiAwO1xcbiAgICByaWdodDogMDtcXG4gICAgdG9wOiA1MCU7IH1cXG4gICAgW2RhdGEtYXg2dWktcGlja2VyXS5kaXJlY3Rpb24tcmlnaHQgLmF4LXBpY2tlci1hcnJvdzpiZWZvcmUge1xcbiAgICAgIGNvbnRlbnQ6ICcgJztcXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgd2lkdGg6IDA7XFxuICAgICAgaGVpZ2h0OiAwO1xcbiAgICAgIHJpZ2h0OiAtMjBweDtcXG4gICAgICB0b3A6IC0xMHB4O1xcbiAgICAgIGJvcmRlci10b3A6IDEwcHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICAgICAgYm9yZGVyLWJvdHRvbTogMTBweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gICAgICBib3JkZXItbGVmdDogMjBweCBzb2xpZCAjZGRkOyB9XFxuICAgIFtkYXRhLWF4NnVpLXBpY2tlcl0uZGlyZWN0aW9uLXJpZ2h0IC5heC1waWNrZXItYXJyb3c6YWZ0ZXIge1xcbiAgICAgIGNvbnRlbnQ6ICcgJztcXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgd2lkdGg6IDA7XFxuICAgICAgaGVpZ2h0OiAwO1xcbiAgICAgIHJpZ2h0OiAtMThweDtcXG4gICAgICB0b3A6IC0xMHB4O1xcbiAgICAgIGJvcmRlci10b3A6IDEwcHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICAgICAgYm9yZGVyLWJvdHRvbTogMTBweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gICAgICBib3JkZXItbGVmdDogMjBweCBzb2xpZCAjZmZmOyB9XFxuICBbZGF0YS1heDZ1aS1waWNrZXJdLmRpcmVjdGlvbi1ib3R0b20gLmF4LXBpY2tlci1hcnJvdyB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDA7XFxuICAgIGhlaWdodDogMDtcXG4gICAgbGVmdDogNTAlO1xcbiAgICBib3R0b206IDA7IH1cXG4gICAgW2RhdGEtYXg2dWktcGlja2VyXS5kaXJlY3Rpb24tYm90dG9tIC5heC1waWNrZXItYXJyb3c6YmVmb3JlIHtcXG4gICAgICBjb250ZW50OiAnICc7XFxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgIHdpZHRoOiAwO1xcbiAgICAgIGhlaWdodDogMDtcXG4gICAgICBsZWZ0OiAtMTBweDtcXG4gICAgICBib3R0b206IC0yMHB4O1xcbiAgICAgIGJvcmRlci1sZWZ0OiAxMHB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICAgIGJvcmRlci1yaWdodDogMTBweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gICAgICBib3JkZXItdG9wOiAyMHB4IHNvbGlkICNkZGQ7IH1cXG4gICAgW2RhdGEtYXg2dWktcGlja2VyXS5kaXJlY3Rpb24tYm90dG9tIC5heC1waWNrZXItYXJyb3c6YWZ0ZXIge1xcbiAgICAgIGNvbnRlbnQ6ICcgJztcXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgd2lkdGg6IDA7XFxuICAgICAgaGVpZ2h0OiAwO1xcbiAgICAgIGxlZnQ6IC0xMHB4O1xcbiAgICAgIGJvdHRvbTogLTE4cHg7XFxuICAgICAgYm9yZGVyLWxlZnQ6IDEwcHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICAgICAgYm9yZGVyLXJpZ2h0OiAxMHB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICAgIGJvcmRlci10b3A6IDIwcHggc29saWQgI2ZmZjsgfVxcbiAgW2RhdGEtYXg2dWktcGlja2VyXS5kaXJlY3Rpb24tbGVmdCAuYXgtcGlja2VyLWFycm93IHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMDtcXG4gICAgaGVpZ2h0OiAwO1xcbiAgICBsZWZ0OiAwO1xcbiAgICB0b3A6IDUwJTsgfVxcbiAgICBbZGF0YS1heDZ1aS1waWNrZXJdLmRpcmVjdGlvbi1sZWZ0IC5heC1waWNrZXItYXJyb3c6YmVmb3JlIHtcXG4gICAgICBjb250ZW50OiAnICc7XFxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgIHdpZHRoOiAwO1xcbiAgICAgIGhlaWdodDogMDtcXG4gICAgICBsZWZ0OiAtMjBweDtcXG4gICAgICB0b3A6IC0xMHB4O1xcbiAgICAgIGJvcmRlci10b3A6IDEwcHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICAgICAgYm9yZGVyLWJvdHRvbTogMTBweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gICAgICBib3JkZXItcmlnaHQ6IDIwcHggc29saWQgI2RkZDsgfVxcbiAgICBbZGF0YS1heDZ1aS1waWNrZXJdLmRpcmVjdGlvbi1sZWZ0IC5heC1waWNrZXItYXJyb3c6YWZ0ZXIge1xcbiAgICAgIGNvbnRlbnQ6ICcgJztcXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgd2lkdGg6IDA7XFxuICAgICAgaGVpZ2h0OiAwO1xcbiAgICAgIGxlZnQ6IC0xOHB4O1xcbiAgICAgIHRvcDogLTEwcHg7XFxuICAgICAgYm9yZGVyLXRvcDogMTBweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gICAgICBib3JkZXItYm90dG9tOiAxMHB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICAgIGJvcmRlci1yaWdodDogMjBweCBzb2xpZCAjZmZmOyB9XFxuICBbZGF0YS1heDZ1aS1waWNrZXJdLmRlc3Ryb3kge1xcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogYXgtcGlja2VyLWRlc3Ryb3kgMC4xcyBjdWJpYy1iZXppZXIoMC4yMTUsIDAuNjEsIDAuMzU1LCAxKSBmb3J3YXJkcztcXG4gICAgLW1vei1hbmltYXRpb246IGF4LXBpY2tlci1kZXN0cm95IDAuMXMgY3ViaWMtYmV6aWVyKDAuMjE1LCAwLjYxLCAwLjM1NSwgMSkgZm9yd2FyZHM7XFxuICAgIGFuaW1hdGlvbjogYXgtcGlja2VyLWRlc3Ryb3kgMC4xcyBjdWJpYy1iZXppZXIoMC4yMTUsIDAuNjEsIDAuMzU1LCAxKSBmb3J3YXJkczsgfVxcbiAgW2RhdGEtYXg2dWktcGlja2VyXS5kaXJlY3Rpb24tdG9wIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgdG9wO1xcbiAgICAtbW96LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciB0b3A7XFxuICAgIC1tcy10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgdG9wO1xcbiAgICAtby10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgdG9wO1xcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgdG9wOyB9XFxuICBbZGF0YS1heDZ1aS1waWNrZXJdLmRpcmVjdGlvbi1yaWdodCB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogcmlnaHQgY2VudGVyO1xcbiAgICAtbW96LXRyYW5zZm9ybS1vcmlnaW46IHJpZ2h0IGNlbnRlcjtcXG4gICAgLW1zLXRyYW5zZm9ybS1vcmlnaW46IHJpZ2h0IGNlbnRlcjtcXG4gICAgLW8tdHJhbnNmb3JtLW9yaWdpbjogcmlnaHQgY2VudGVyO1xcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiByaWdodCBjZW50ZXI7IH1cXG4gIFtkYXRhLWF4NnVpLXBpY2tlcl0uZGlyZWN0aW9uLWJvdHRvbSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIGJvdHRvbTtcXG4gICAgLW1vei10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgYm90dG9tO1xcbiAgICAtbXMtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIGJvdHRvbTtcXG4gICAgLW8tdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIGJvdHRvbTtcXG4gICAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIGJvdHRvbTsgfVxcbiAgW2RhdGEtYXg2dWktcGlja2VyXS5kaXJlY3Rpb24tbGVmdCB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogbGVmdCBjZW50ZXI7XFxuICAgIC1tb3otdHJhbnNmb3JtLW9yaWdpbjogbGVmdCBjZW50ZXI7XFxuICAgIC1tcy10cmFuc2Zvcm0tb3JpZ2luOiBsZWZ0IGNlbnRlcjtcXG4gICAgLW8tdHJhbnNmb3JtLW9yaWdpbjogbGVmdCBjZW50ZXI7XFxuICAgIHRyYW5zZm9ybS1vcmlnaW46IGxlZnQgY2VudGVyOyB9XFxuXFxuLmlucHV0LWdyb3VwW2RhdGEtYXg2cGlja2VyXSAuaW5wdXQtZ3JvdXAtYWRkb24ge1xcbiAgY3Vyc29yOiBwb2ludGVyOyB9XFxuICAuaW5wdXQtZ3JvdXBbZGF0YS1heDZwaWNrZXJdIC5pbnB1dC1ncm91cC1hZGRvbjpub3QoOmxhc3QtY2hpbGQpIHtcXG4gICAgYm9yZGVyLWxlZnQ6IDAgbm9uZTtcXG4gICAgYm9yZGVyLXJpZ2h0OiAwIG5vbmU7IH1cXG4gIC5pbnB1dC1ncm91cFtkYXRhLWF4NnBpY2tlcl0gLmlucHV0LWdyb3VwLWFkZG9uLmNvbG9yLXByZXZpZXcge1xcbiAgICBwYWRkaW5nOiAwOyB9XFxuICAuaW5wdXQtZ3JvdXBbZGF0YS1heDZwaWNrZXJdIC5pbnB1dC1ncm91cC1hZGRvbiBbZGF0YS1heDZwaWNrZXItY29sb3I9XFxcInByZXZpZXdcXFwiXSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrOyB9XFxuXFxuLmZvcm0tZ3JvdXBbZGF0YS1heDZwaWNrZXJdIC5pbnB1dC1ncm91cC1hZGRvbiB7XFxuICBjdXJzb3I6IHBvaW50ZXI7IH1cXG4gIC5mb3JtLWdyb3VwW2RhdGEtYXg2cGlja2VyXSAuaW5wdXQtZ3JvdXAtYWRkb246bm90KDpsYXN0LWNoaWxkKSB7XFxuICAgIGJvcmRlci1sZWZ0OiAwIG5vbmU7XFxuICAgIGJvcmRlci1yaWdodDogMCBub25lOyB9XFxuICAuZm9ybS1ncm91cFtkYXRhLWF4NnBpY2tlcl0gLmlucHV0LWdyb3VwLWFkZG9uLmNvbG9yLXByZXZpZXcge1xcbiAgICBwYWRkaW5nOiAwOyB9XFxuICAuZm9ybS1ncm91cFtkYXRhLWF4NnBpY2tlcl0gLmlucHV0LWdyb3VwLWFkZG9uIFtkYXRhLWF4NnBpY2tlci1jb2xvcj1cXFwicHJldmlld1xcXCJdIHtcXG4gICAgZGlzcGxheTogYmxvY2s7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vc3JjL0FYNlVJUGlja2VyL3N0eWxlLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDc0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAzIiwiaW1wb3J0IGpRdWVyeSBmcm9tIFwianFtaW5cIjtcbmltcG9ydCBBWDZVSUNvcmUgZnJvbSBcIi4vQVg2VUlDb3JlXCI7XG5pbXBvcnQgaW5mbyBmcm9tIFwiLi9BWDZJbmZvXCI7XG5pbXBvcnQgVSBmcm9tIFwiLi9BWDZVdGlsXCI7XG5pbXBvcnQgbXVzdGFjaGUgZnJvbSBcIi4vQVg2TXVzdGFjaGVcIjtcbmltcG9ydCBGb3JtYXR0ZXIgZnJvbSBcIi4vQVg2VUlGb3JtYXR0ZXJcIjtcbmltcG9ydCBDYWxlbmRhciBmcm9tIFwiLi9BWDZVSUNhbGVuZGFyXCI7XG5pbXBvcnQgUGFsZXR0ZSBmcm9tIFwiLi9BWDZVSVBhbGV0dGVcIjtcbi8qIH5+fn5+fn5+fn5+fn5+fn5+fiBlbmQgb2YgaW1wb3J0ICB+fn5+fn5+fn5+fn5+fn5+fn5+fiAqL1xuXG5sZXQgdG1wbCA9IHtcbiAgcGlja2VyVG1wbChjb2x1bW5LZXlzKSB7XG4gICAgcmV0dXJuIGBcbjxkaXYgZGF0YS1heDZ1aS1waWNrZXI9XCJcIiBjbGFzcz1cInt7dGhlbWV9fVwiIGlkPVwie3tpZH19XCIgZGF0YS1waWNrZXItZWxzPVwicm9vdFwiIHt7I3pJbmRleH19c3R5bGU9XCJ6LWluZGV4Ont7ekluZGV4fX07XCJ7ey96SW5kZXh9fT5cbiAgICB7eyN0aXRsZX19XG4gICAgICAgIDxkaXYgY2xhc3M9XCJheC1waWNrZXItaGVhZGluZ1wiPnt7dGl0bGV9fTwvZGl2PlxuICAgIHt7L3RpdGxlfX1cbiAgICA8ZGl2IGNsYXNzPVwiYXgtcGlja2VyLWJvZHlcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImF4LXBpY2tlci1jb250ZW50XCIgZGF0YS1waWNrZXItZWxzPVwiY29udGVudFwiIHN0eWxlPVwid2lkdGg6e3tjb250ZW50V2lkdGh9fXB4O1wiPjwvZGl2PlxuICAgICAgICB7eyNidG5zfX1cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJheC1waWNrZXItYnV0dG9uc1wiPlxuICAgICAgICAgICAge3sjYnRuc319XG4gICAgICAgICAgICAgICAge3sjQGVhY2h9fVxuICAgICAgICAgICAgICAgIDxidXR0b24gZGF0YS1waWNrZXItYnRuPVwie3tAa2V5fX1cIiBjbGFzcz1cInt7QHZhbHVlLnRoZW1lfX1cIj57e0B2YWx1ZS5sYWJlbH19PC9idXR0b24+XG4gICAgICAgICAgICAgICAge3svQGVhY2h9fVxuICAgICAgICAgICAge3svYnRuc319XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAge3svYnRuc319XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImF4LXBpY2tlci1hcnJvd1wiPjwvZGl2PlxuPC9kaXY+XG5gO1xuICB9XG59O1xuXG5jb25zdCBvblN0YXRlQ2hhbmdlZCA9IGZ1bmN0aW9uIChpdGVtLCB0aGF0KSB7XG4gIGlmIChpdGVtICYmIGl0ZW0ub25TdGF0ZUNoYW5nZWQpIHtcbiAgICBpdGVtLm9uU3RhdGVDaGFuZ2VkLmNhbGwodGhhdCwgdGhhdCk7XG4gIH1cbiAgZWxzZSBpZiAodGhpcy5vblN0YXRlQ2hhbmdlZCkge1xuICAgIHRoaXMub25TdGF0ZUNoYW5nZWQuY2FsbCh0aGF0LCB0aGF0KTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn07XG5jb25zdCBiaW5kUGlja2VyVGFyZ2V0ID0gKGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgcGlja2VyRXZlbnQgPSB7XG4gICAgJ2ZvY3VzJzogZnVuY3Rpb24gKHF1ZUlkeCwgZSkge1xuICAgICAgdGhpcy5vcGVuKHF1ZUlkeCk7XG4gICAgfSxcbiAgICAnY2xpY2snOiBmdW5jdGlvbiAocXVlSWR4LCBlKSB7XG4gICAgICB0aGlzLm9wZW4ocXVlSWR4KTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IHBpY2tlclR5cGUgPSB7XG4gICAgJ0Bmbic6IGZ1bmN0aW9uIChxdWVJZHgsIF9pbnB1dCkge1xuICAgICAgbGV0IGl0ZW0gPSB0aGlzLnF1ZXVlW3F1ZUlkeF0sXG4gICAgICAgIGlucHV0TGVuZ3RoID0gX2lucHV0Lmxlbmd0aCxcbiAgICAgICAgY29uZmlnID0ge1xuICAgICAgICAgIGlucHV0TGVuZ3RoOiBpbnB1dExlbmd0aCB8fCAxXG4gICAgICAgIH07XG5cbiAgICAgIGlmIChpbnB1dExlbmd0aCA+IDEpIHtcbiAgICAgICAgY29uZmlnLmJ0bnMgPSB7XG4gICAgICAgICAgb2s6IHtsYWJlbDogdGhpcy5jb25maWcubGFuZ1tcIm9rXCJdLCB0aGVtZTogdGhpcy5jb25maWcudGhlbWV9XG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHRoaXMucXVldWVbcXVlSWR4XSA9IGpRdWVyeS5leHRlbmQodHJ1ZSwgY29uZmlnLCBpdGVtKTtcblxuICAgICAgY29uZmlnID0gbnVsbDtcbiAgICAgIGlucHV0TGVuZ3RoID0gbnVsbDtcbiAgICB9LFxuICAgICdkYXRlJzogZnVuY3Rpb24gKHF1ZUlkeCwgX2lucHV0KSB7XG4gICAgICBsZXQgaXRlbSA9IHRoaXMucXVldWVbcXVlSWR4XSxcbiAgICAgICAgY29udGVudFdpZHRoID0gKGl0ZW0uY29udGVudCkgPyBpdGVtLmNvbnRlbnQud2lkdGggfHwgMjcwIDogMjcwLFxuICAgICAgICBjb250ZW50TWFyZ2luID0gKGl0ZW0uY29udGVudCkgPyBpdGVtLmNvbnRlbnQubWFyZ2luIHx8IDUgOiA1LFxuICAgICAgICBpbnB1dExlbmd0aCA9IF9pbnB1dC5sZW5ndGgsXG4gICAgICAgIGNvbmZpZyA9IHtcbiAgICAgICAgICBjb250ZW50V2lkdGg6IChjb250ZW50V2lkdGggKiBpbnB1dExlbmd0aCkgKyAoKGlucHV0TGVuZ3RoIC0gMSkgKiBjb250ZW50TWFyZ2luKSxcbiAgICAgICAgICBjb250ZW50OiB7d2lkdGg6IGNvbnRlbnRXaWR0aCwgbWFyZ2luOiBjb250ZW50TWFyZ2lufSxcbiAgICAgICAgICBpbnB1dExlbmd0aDogaW5wdXRMZW5ndGggfHwgMVxuICAgICAgICB9O1xuXG4gICAgICBpZiAoaW5wdXRMZW5ndGggPiAxICYmICFpdGVtLmJ0bnMpIHtcbiAgICAgICAgY29uZmlnLmJ0bnMgPSB7XG4gICAgICAgICAgb2s6IHtsYWJlbDogdGhpcy5jb25maWcubGFuZ1tcIm9rXCJdLCB0aGVtZTogdGhpcy5jb25maWcudGhlbWV9XG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHRoaXMucXVldWVbcXVlSWR4XSA9IGpRdWVyeS5leHRlbmQodHJ1ZSwgY29uZmlnLCBpdGVtKTtcblxuICAgICAgY29udGVudFdpZHRoID0gbnVsbDtcbiAgICAgIGNvbnRlbnRNYXJnaW4gPSBudWxsO1xuICAgICAgY29uZmlnID0gbnVsbDtcbiAgICAgIGlucHV0TGVuZ3RoID0gbnVsbDtcbiAgICB9LFxuICAgICdzZWN1cmUtbnVtJzogZnVuY3Rpb24gKHF1ZUlkeCwgX2lucHV0KSB7XG4gICAgICBsZXQgaXRlbSA9IHRoaXMucXVldWVbcXVlSWR4XSxcbiAgICAgICAgaW5wdXRMZW5ndGggPSBfaW5wdXQubGVuZ3RoLFxuICAgICAgICBjb25maWcgPSB7XG4gICAgICAgICAgaW5wdXRMZW5ndGg6IGlucHV0TGVuZ3RoIHx8IDFcbiAgICAgICAgfTtcblxuICAgICAgdGhpcy5xdWV1ZVtxdWVJZHhdID0galF1ZXJ5LmV4dGVuZCh0cnVlLCBjb25maWcsIGl0ZW0pO1xuXG4gICAgICBjb25maWcgPSBudWxsO1xuICAgICAgaW5wdXRMZW5ndGggPSBudWxsO1xuICAgIH0sXG4gICAgJ2tleWJvYXJkJzogZnVuY3Rpb24gKHF1ZUlkeCwgX2lucHV0KSB7XG4gICAgICBsZXQgaXRlbSA9IHRoaXMucXVldWVbcXVlSWR4XSxcbiAgICAgICAgaW5wdXRMZW5ndGggPSBfaW5wdXQubGVuZ3RoLFxuICAgICAgICBjb25maWcgPSB7XG4gICAgICAgICAgaW5wdXRMZW5ndGg6IGlucHV0TGVuZ3RoIHx8IDFcbiAgICAgICAgfTtcblxuICAgICAgdGhpcy5xdWV1ZVtxdWVJZHhdID0galF1ZXJ5LmV4dGVuZCh0cnVlLCBjb25maWcsIGl0ZW0pO1xuXG4gICAgICBjb25maWcgPSBudWxsO1xuICAgICAgaW5wdXRMZW5ndGggPSBudWxsO1xuICAgIH0sXG4gICAgJ251bXBhZCc6IGZ1bmN0aW9uIChxdWVJZHgsIF9pbnB1dCkge1xuICAgICAgbGV0IGl0ZW0gPSB0aGlzLnF1ZXVlW3F1ZUlkeF0sXG4gICAgICAgIGlucHV0TGVuZ3RoID0gX2lucHV0Lmxlbmd0aCxcbiAgICAgICAgY29uZmlnID0ge1xuICAgICAgICAgIGlucHV0TGVuZ3RoOiBpbnB1dExlbmd0aCB8fCAxXG4gICAgICAgIH07XG5cbiAgICAgIHRoaXMucXVldWVbcXVlSWR4XSA9IGpRdWVyeS5leHRlbmQodHJ1ZSwgY29uZmlnLCBpdGVtKTtcblxuICAgICAgY29uZmlnID0gbnVsbDtcbiAgICAgIGlucHV0TGVuZ3RoID0gbnVsbDtcbiAgICB9LFxuICAgICdjb2xvcic6IGZ1bmN0aW9uIChxdWVJZHgsIF9pbnB1dCkge1xuICAgICAgbGV0IGl0ZW0gPSB0aGlzLnF1ZXVlW3F1ZUlkeF0sXG4gICAgICAgIGNvbnRlbnRXaWR0aCA9IChpdGVtLmNvbnRlbnQpID8gaXRlbS5jb250ZW50LndpZHRoIHx8IDI3MCA6IDI3MCxcbiAgICAgICAgY29udGVudE1hcmdpbiA9IChpdGVtLmNvbnRlbnQpID8gaXRlbS5jb250ZW50Lm1hcmdpbiB8fCA1IDogNSxcbiAgICAgICAgaW5wdXRMZW5ndGggPSBfaW5wdXQubGVuZ3RoLFxuICAgICAgICBjb25maWcgPSB7XG4gICAgICAgICAgY29udGVudFdpZHRoOiAoY29udGVudFdpZHRoICogaW5wdXRMZW5ndGgpICsgKChpbnB1dExlbmd0aCAtIDEpICogY29udGVudE1hcmdpbiksXG4gICAgICAgICAgY29udGVudDoge3dpZHRoOiBjb250ZW50V2lkdGgsIG1hcmdpbjogY29udGVudE1hcmdpbn0sXG4gICAgICAgICAgaW5wdXRMZW5ndGg6IGlucHV0TGVuZ3RoIHx8IDFcbiAgICAgICAgfSxcbiAgICAgICAgJGNvbG9yUHJldmlldyA9IGl0ZW0uJHRhcmdldC5maW5kKCdbZGF0YS1heDZwaWNrZXItY29sb3I9XCJwcmV2aWV3XCJdJyk7XG5cbiAgICAgIGlmICgkY29sb3JQcmV2aWV3LmdldCgwKSkge1xuICAgICAgICAkY29sb3JQcmV2aWV3LmNzcyh7XCJiYWNrZ3JvdW5kLWNvbG9yXCI6IFwiI1wiICsgVS5jb2xvcihfaW5wdXQudmFsKCkgfHwgXCIjMDAwMDAwXCIpLmdldEhleFZhbHVlKCl9KTtcbiAgICAgICAgLy8g7Lus65+sIO2UvOy7pOyduCDqsr3smrAgaW5wdXTsnZgg6rCS7J20IOuzgOqyveuQmOuptCBwcmV2aWV366W8IOyImOyglVxuICAgICAgICBfaW5wdXQub24oXCJjaGFuZ2VcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICRjb2xvclByZXZpZXcuY3NzKHtcImJhY2tncm91bmQtY29sb3JcIjogXCIjXCIgKyBVLmNvbG9yKHRoaXMudmFsdWUgfHwgXCIjMDAwMDAwXCIpLmdldEhleFZhbHVlKCl9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChpbnB1dExlbmd0aCA+IDEgJiYgIWl0ZW0uYnRucykge1xuICAgICAgICBjb25maWcuYnRucyA9IHtcbiAgICAgICAgICBvazoge2xhYmVsOiB0aGlzLmNvbmZpZy5sYW5nW1wib2tcIl0sIHRoZW1lOiB0aGlzLmNvbmZpZy50aGVtZX1cbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5xdWV1ZVtxdWVJZHhdID0galF1ZXJ5LmV4dGVuZCh0cnVlLCBjb25maWcsIGl0ZW0pO1xuXG4gICAgICBjb250ZW50V2lkdGggPSBudWxsO1xuICAgICAgY29udGVudE1hcmdpbiA9IG51bGw7XG4gICAgICBjb25maWcgPSBudWxsO1xuICAgICAgaW5wdXRMZW5ndGggPSBudWxsO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gZnVuY3Rpb24gKHF1ZUlkeCkge1xuICAgIGxldCBpdGVtID0gdGhpcy5xdWV1ZVtxdWVJZHhdLFxuICAgICAgaW5wdXQ7XG5cbiAgICBpZiAoIWl0ZW0uY29udGVudCkge1xuICAgICAgY29uc29sZS5sb2coaW5mby5nZXRFcnJvcihcImF4NnBpY2tlclwiLCBcIjUwMVwiLCBcImJpbmRcIikpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaW5wdXQgPSAoaXRlbS4kdGFyZ2V0LmdldCgwKS50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT0gXCJJTlBVVFwiKSA/IGl0ZW0uJHRhcmdldCA6IGl0ZW0uJHRhcmdldC5maW5kKCdpbnB1dFt0eXBlXScpO1xuXG4gICAgLy8g7ZWo7IiY7YOA7J6FXG4gICAgaWYgKFUuaXNGdW5jdGlvbihpdGVtLmNvbnRlbnQpKSB7XG4gICAgICBwaWNrZXJUeXBlW1wiQGZuXCJdLmNhbGwodGhpcywgcXVlSWR4LCBpbnB1dCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZm9yICh2YXIga2V5IGluIHBpY2tlclR5cGUpIHtcbiAgICAgICAgaWYgKGl0ZW0uY29udGVudC50eXBlID09IGtleSkge1xuICAgICAgICAgIHBpY2tlclR5cGVba2V5XS5jYWxsKHRoaXMsIHF1ZUlkeCwgaW5wdXQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaW5wdXRcbiAgICAgIC5vZmYoJ2ZvY3VzLmF4NnBpY2tlcicpXG4gICAgICAub2ZmKCdjbGljay5heDZwaWNrZXInKVxuICAgICAgLm9uKCdmb2N1cy5heDZwaWNrZXInLCBwaWNrZXJFdmVudC5mb2N1cy5iaW5kKHRoaXMsIHF1ZUlkeCkpXG4gICAgICAub24oJ2NsaWNrLmF4NnBpY2tlcicsIHBpY2tlckV2ZW50LmNsaWNrLmJpbmQodGhpcywgcXVlSWR4KSk7XG5cbiAgICBpdGVtLiR0YXJnZXRcbiAgICAgIC5maW5kKCcuaW5wdXQtZ3JvdXAtYWRkb24nKVxuICAgICAgLm9mZignY2xpY2suYXg2cGlja2VyJylcbiAgICAgIC5vbignY2xpY2suYXg2cGlja2VyJywgcGlja2VyRXZlbnQuY2xpY2suYmluZCh0aGlzLCBxdWVJZHgpKTtcblxuICAgIGlmIChpdGVtLmNvbnRlbnQuZm9ybWF0dGVyKSB7XG4gICAgICB0aGlzLmZvcm1hdHRlci5iaW5kKGpRdWVyeS5leHRlbmQoe30sIGl0ZW0uY29udGVudC5mb3JtYXR0ZXIsIHt0YXJnZXQ6IGlucHV0fSkpO1xuICAgIH1cblxuICAgIGlucHV0ID0gbnVsbDtcbiAgICBpdGVtID0gbnVsbDtcbiAgICBxdWVJZHggPSBudWxsO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG59KSgpO1xuY29uc3QgYWxpZ25QaWNrZXIgPSBmdW5jdGlvbiAoYXBwZW5kKSB7XG4gIGlmICghdGhpcy5hY3RpdmVQaWNrZXIpIHJldHVybiB0aGlzO1xuXG4gIGxldCBfYWxpZ25QaWNrZXIgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgIGxldCAkd2luZG93ID0galF1ZXJ5KHdpbmRvdyksICRib2R5ID0galF1ZXJ5KGRvY3VtZW50LmJvZHkpO1xuICAgIGxldCBwb3MgPSB7fSwgcG9zaXRpb25NYXJnaW4gPSAxMixcbiAgICAgIGRpbSA9IHt9LCBwaWNrZXJEaW0gPSB7fSxcbiAgICAgIHBpY2tlckRpcmVjdGlvbjtcblxuICAgIHBvcyA9IGl0ZW0uJHRhcmdldC5vZmZzZXQoKTtcbiAgICBkaW0gPSB7XG4gICAgICB3aWR0aDogaXRlbS4kdGFyZ2V0Lm91dGVyV2lkdGgoKSxcbiAgICAgIGhlaWdodDogaXRlbS4kdGFyZ2V0Lm91dGVySGVpZ2h0KClcbiAgICB9O1xuICAgIHBpY2tlckRpbSA9IHtcbiAgICAgIHdpbldpZHRoOiBNYXRoLm1heCgkd2luZG93LndpZHRoKCksICRib2R5LndpZHRoKCkpLFxuICAgICAgd2luSGVpZ2h0OiBNYXRoLm1heCgkd2luZG93LmhlaWdodCgpLCAkYm9keS5oZWlnaHQoKSksXG4gICAgICB3aWR0aDogdGhpcy5hY3RpdmVQaWNrZXIub3V0ZXJXaWR0aCgpLFxuICAgICAgaGVpZ2h0OiB0aGlzLmFjdGl2ZVBpY2tlci5vdXRlckhlaWdodCgpXG4gICAgfTtcblxuICAgIC8vIHBpY2tlciBjc3Mod2lkdGgsIGxlZnQsIHRvcCkgJiBkaXJlY3Rpb24g6rKw7KCVXG5cbiAgICBpZiAoIWl0ZW0uZGlyZWN0aW9uIHx8IGl0ZW0uZGlyZWN0aW9uID09PSBcIlwiIHx8IGl0ZW0uZGlyZWN0aW9uID09PSBcImF1dG9cIikge1xuICAgICAgLy8gc2V0IGRpcmVjdGlvblxuICAgICAgcGlja2VyRGlyZWN0aW9uID0gXCJ0b3BcIjtcbiAgICAgIGlmIChwb3MudG9wIC0gcGlja2VyRGltLmhlaWdodCAtIHBvc2l0aW9uTWFyZ2luIDwgMCkge1xuICAgICAgICBwaWNrZXJEaXJlY3Rpb24gPSBcInRvcFwiO1xuICAgICAgfSBlbHNlIGlmIChwb3MudG9wICsgZGltLmhlaWdodCArIHBpY2tlckRpbS5oZWlnaHQgKyBwb3NpdGlvbk1hcmdpbiA+IHBpY2tlckRpbS53aW5IZWlnaHQpIHtcbiAgICAgICAgcGlja2VyRGlyZWN0aW9uID0gXCJib3R0b21cIjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcGlja2VyRGlyZWN0aW9uID0gaXRlbS5kaXJlY3Rpb247XG4gICAgfVxuXG4gICAgaWYgKGFwcGVuZCkge1xuICAgICAgdGhpcy5hY3RpdmVQaWNrZXJcbiAgICAgICAgLmFkZENsYXNzKFwiZGlyZWN0aW9uLVwiICsgcGlja2VyRGlyZWN0aW9uKTtcbiAgICB9XG5cbiAgICBsZXQgcG9zaXRpb25DU1MgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IGNzcyA9IHtsZWZ0OiAwLCB0b3A6IDB9O1xuICAgICAgc3dpdGNoIChwaWNrZXJEaXJlY3Rpb24pIHtcbiAgICAgICAgY2FzZSBcInRvcFwiOlxuICAgICAgICAgIGNzcy5sZWZ0ID0gcG9zLmxlZnQgKyBkaW0ud2lkdGggLyAyIC0gcGlja2VyRGltLndpZHRoIC8gMjtcbiAgICAgICAgICBjc3MudG9wID0gcG9zLnRvcCArIGRpbS5oZWlnaHQgKyBwb3NpdGlvbk1hcmdpbjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImJvdHRvbVwiOlxuICAgICAgICAgIGNzcy5sZWZ0ID0gcG9zLmxlZnQgKyBkaW0ud2lkdGggLyAyIC0gcGlja2VyRGltLndpZHRoIC8gMjtcbiAgICAgICAgICBjc3MudG9wID0gcG9zLnRvcCAtIHBpY2tlckRpbS5oZWlnaHQgLSBwb3NpdGlvbk1hcmdpbjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgICBjc3MubGVmdCA9IHBvcy5sZWZ0ICsgZGltLndpZHRoICsgcG9zaXRpb25NYXJnaW47XG4gICAgICAgICAgY3NzLnRvcCA9IHBvcy50b3AgLSBwaWNrZXJEaW0uaGVpZ2h0IC8gMiArIGRpbS5oZWlnaHQgLyAyO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgICAgICBjc3MubGVmdCA9IHBvcy5sZWZ0IC0gcGlja2VyRGltLndpZHRoIC0gcG9zaXRpb25NYXJnaW47XG4gICAgICAgICAgY3NzLnRvcCA9IHBvcy50b3AgLSBwaWNrZXJEaW0uaGVpZ2h0IC8gMiArIGRpbS5oZWlnaHQgLyAyO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNzcztcbiAgICB9KSgpO1xuXG4gICAge1xuICAgICAgaWYgKHBpY2tlckRpcmVjdGlvbiA9PSBcInRvcFwiIHx8IHBpY2tlckRpcmVjdGlvbiA9PSBcImJvdHRvbVwiKSB7XG4gICAgICAgIGlmIChwb3NpdGlvbkNTUy5sZWZ0IDwgMCkge1xuICAgICAgICAgIHBvc2l0aW9uQ1NTLmxlZnQgPSBwb3NpdGlvbk1hcmdpbjtcbiAgICAgICAgICB0aGlzLmFjdGl2ZVBpY2tlckFycm93LmNzcyh7bGVmdDogKHBvcy5sZWZ0ICsgZGltLndpZHRoIC8gMikgLSBwb3NpdGlvbkNTUy5sZWZ0fSk7XG4gICAgICAgIH0gZWxzZSBpZiAocG9zaXRpb25DU1MubGVmdCArIHBpY2tlckRpbS53aWR0aCA+IHBpY2tlckRpbS53aW5XaWR0aCkge1xuICAgICAgICAgIHBvc2l0aW9uQ1NTLmxlZnQgPSBwaWNrZXJEaW0ud2luV2lkdGggLSBwaWNrZXJEaW0ud2lkdGggLSBwb3NpdGlvbk1hcmdpbjtcbiAgICAgICAgICB0aGlzLmFjdGl2ZVBpY2tlckFycm93LmNzcyh7bGVmdDogKHBvcy5sZWZ0ICsgZGltLndpZHRoIC8gMikgLSBwb3NpdGlvbkNTUy5sZWZ0fSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmFjdGl2ZVBpY2tlclxuICAgICAgLmNzcyhwb3NpdGlvbkNTUyk7XG4gIH07XG4gIGxldCBpdGVtID0gdGhpcy5xdWV1ZVt0aGlzLmFjdGl2ZVBpY2tlclF1ZXVlSW5kZXhdO1xuXG4gIGlmIChhcHBlbmQpIHtcbiAgICB0aGlzLmFjdGl2ZVBpY2tlci5jc3Moe3RvcDogLTk5OX0pO1xuICAgIGpRdWVyeShkb2N1bWVudC5ib2R5KS5hcHBlbmQodGhpcy5hY3RpdmVQaWNrZXIpO1xuICB9XG5cbiAgc2V0VGltZW91dCgoZnVuY3Rpb24gKCkge1xuICAgIF9hbGlnblBpY2tlci5jYWxsKHRoaXMsIGl0ZW0pO1xuICB9KS5iaW5kKHRoaXMpKTtcbn07XG5jb25zdCBvbkJvZHlDbGljayA9IGZ1bmN0aW9uIChlLCB0YXJnZXQpIHtcbiAgaWYgKCF0aGlzLmFjdGl2ZVBpY2tlcikgcmV0dXJuIHRoaXM7XG5cbiAgbGV0IGl0ZW0gPSB0aGlzLnF1ZXVlW3RoaXMuYWN0aXZlUGlja2VyUXVldWVJbmRleF07XG5cbiAgdGFyZ2V0ID0gVS5maW5kUGFyZW50Tm9kZShlLnRhcmdldCwgZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGlmICh0YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1waWNrZXItZWxzXCIpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXRlbS4kdGFyZ2V0LmdldCgwKSA9PSB0YXJnZXQpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8vY29uc29sZS5sb2coXCJpJ20gcGlja2VyXCIpO1xuICByZXR1cm4gdGhpcztcbn07XG5jb25zdCBvbkJ0bkNsaWNrID0gZnVuY3Rpb24gKGUsIHRhcmdldCkge1xuICAvLyBjb25zb2xlLmxvZygnYnRuIGNsaWNrJyk7XG4gIGlmIChlLnNyY0VsZW1lbnQpIGUudGFyZ2V0ID0gZS5zcmNFbGVtZW50O1xuXG4gIHRhcmdldCA9IFUuZmluZFBhcmVudE5vZGUoZS50YXJnZXQsIGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICBpZiAodGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtcGlja2VyLWJ0blwiKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9KTtcblxuICBpZiAodGFyZ2V0KSB7XG4gICAgbGV0XG4gICAgICBpdGVtID0gdGhpcy5xdWV1ZVt0aGlzLmFjdGl2ZVBpY2tlclF1ZXVlSW5kZXhdLFxuICAgICAgayA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBpY2tlci1idG5cIilcbiAgICA7XG5cbiAgICBpZiAoaXRlbS5idG5zICYmIGl0ZW0uYnRuc1trXS5vbkNsaWNrKSB7XG4gICAgICBsZXQgdGhhdCA9IHtcbiAgICAgICAga2V5OiBrLFxuICAgICAgICB2YWx1ZTogaXRlbS5idG5zW2tdLFxuICAgICAgICBzZWxmOiB0aGlzLFxuICAgICAgICBpdGVtOiBpdGVtXG4gICAgICB9O1xuICAgICAgaXRlbS5idG5zW2tdLm9uQ2xpY2suY2FsbCh0aGF0LCBrKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfVxuICB9XG59O1xuY29uc3Qgb25Cb2R5S2V5dXAgPSBmdW5jdGlvbiAoZSkge1xuICBpZiAoZS5rZXlDb2RlID09IGluZm8uZXZlbnRLZXlzLkVTQykge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxufTtcbmNvbnN0IGdldFF1ZUlkeCA9IGZ1bmN0aW9uIChib3VuZElEKSB7XG4gIGlmICghVS5pc1N0cmluZyhib3VuZElEKSkge1xuICAgIGJvdW5kSUQgPSBqUXVlcnkoYm91bmRJRCkuZGF0YShcImRhdGEtYXhwaWNrZXItaWRcIik7XG4gIH1cbiAgaWYgKCFVLmlzU3RyaW5nKGJvdW5kSUQpKSB7XG4gICAgY29uc29sZS5sb2coaW5mby5nZXRFcnJvcihcImF4NnBpY2tlclwiLCBcIjQwMlwiLCBcImdldFF1ZUlkeFwiKSk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHJldHVybiBVLnNlYXJjaCh0aGlzLnF1ZXVlLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuaWQgPT0gYm91bmRJRDtcbiAgfSk7XG59O1xuLyogfn5+fn5+fn5+fn5+fn5+fn5+IGVuZCBvZiBwcml2YXRlICB+fn5+fn5+fn5+fn5+fn5+fn5+fiAqL1xuXG4vKipcbiAqIEBjbGFzc1xuICovXG5jbGFzcyBBWDZVSVBpY2tlciBleHRlbmRzIEFYNlVJQ29yZSB7XG4gIC8qKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIGNvbmZpZ1xuICAgKiBAcGFyYW0gW2NvbmZpZy50aGVtZV1cbiAgICogQHBhcmFtIFtjb25maWcudGFyZ2V0XVxuICAgKiBAcGFyYW0gW2NvbmZpZy5hbmltYXRlVGltZV1cbiAgICogQHBhcmFtIFtjb25maWcub25TdGF0ZUNoYW5nZWRdXG4gICAqIEBwYXJhbSBbY29uZmlnLm9uQ2xpY2tdXG4gICAqIEBwYXJhbSBbY29uZmlnLmNvbnRlbnRdXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgLyoqXG4gICAgICogQG1lbWJlciB7SlNPTn1cbiAgICAgKiBAcGFyYW0gY29uZmlnXG4gICAgICogQHBhcmFtIFtjb25maWcudGhlbWU9ZGVmYXVsdF1cbiAgICAgKiBAcGFyYW0gY29uZmlnLnRhcmdldFxuICAgICAqIEBwYXJhbSBbY29uZmlnLmFuaW1hdGVUaW1lPTEwMF1cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5jYWxlbmRhcl1cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5jYWxlbmRhci5tdWx0aXBsZVNlbGVjdD1mYWxzZV1cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5jYWxlbmRhci5jb250cm9sXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmNhbGVuZGFyLmNvbnRyb2wubGVmdD0nJiN4MDIxOTAnXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmNhbGVuZGFyLmNvbnRyb2wueWVhclRtcGw9JyVzJ11cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5jYWxlbmRhci5jb250cm9sLm1vbnRoVG1wbD0nJXMnXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmNhbGVuZGFyLmNvbnRyb2wucmlnaHQ9JyYjeDAyMTkyJ11cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5jYWxlbmRhci5jb250cm9sLnllYXJGaXJzdD10cnVlXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLnBhbGV0dGU9e31dXG4gICAgICogQHBhcmFtIFtjb25maWcuZm9ybWF0dGVyPXt9XVxuICAgICAqIEBwYXJhbSBbY29uZmlnLm9uU3RhdGVDaGFuZ2VkXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLm9uQ2xpY2tdXG4gICAgICovXG4gICAgdGhpcy5jb25maWcgPSB7XG4gICAgICBjbGlja0V2ZW50TmFtZTogXCJjbGlja1wiLCAvLygoJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSA/IFwidG91Y2hlbmRcIiA6IFwiY2xpY2tcIiksXG4gICAgICB0aGVtZTogJ2RlZmF1bHQnLFxuICAgICAgdGl0bGU6ICcnLFxuICAgICAgbGFuZzoge1xuICAgICAgICBcIm9rXCI6IFwib2tcIixcbiAgICAgICAgXCJjYW5jZWxcIjogXCJjYW5jZWxcIlxuICAgICAgfSxcbiAgICAgIGFuaW1hdGVUaW1lOiAxMDAsXG4gICAgICBjYWxlbmRhcjoge1xuICAgICAgICBtdWx0aXBsZVNlbGVjdDogZmFsc2UsXG4gICAgICAgIGNvbnRyb2w6IHtcbiAgICAgICAgICBsZWZ0OiAnJiN4MDIxOTAnLFxuICAgICAgICAgIHllYXJUbXBsOiAnJXMnLFxuICAgICAgICAgIG1vbnRoVG1wbDogJyVzJyxcbiAgICAgICAgICByaWdodDogJyYjeDAyMTkyJyxcbiAgICAgICAgICB5ZWFyRmlyc3Q6IHRydWVcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHBhbGV0dGU6IHt9LFxuICAgICAgZm9ybWF0dGVyOiB7fVxuICAgIH07XG4gICAgalF1ZXJ5LmV4dGVuZCh0cnVlLCB0aGlzLmNvbmZpZywgY29uZmlnKTtcblxuICAgIC8vIOuppOuyhCDrs4DsiJgg7LSI6riw7ZmUXG4gICAgLyoqXG4gICAgICogQG1lbWJlciB7QXJyYXl9XG4gICAgICovXG4gICAgdGhpcy5xdWV1ZSA9IFtdO1xuICAgIC8qKlxuICAgICAqIEBtZW1iZXIge09iamVjdH1cbiAgICAgKi9cbiAgICB0aGlzLmFjdGl2ZVBpY2tlciA9IG51bGw7XG4gICAgLyoqXG4gICAgICogQG1lbWJlciB7TnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMuYWN0aXZlUGlja2VyUXVldWVJbmRleCA9IC0xO1xuICAgIC8qKlxuICAgICAqIEBtZW1iZXIge09iamVjdH1cbiAgICAgKi9cbiAgICB0aGlzLm9wZW5UaW1lciA9IG51bGw7XG4gICAgLyoqXG4gICAgICogQG1lbWJlciB7T2JqZWN0fVxuICAgICAqL1xuICAgIHRoaXMuY2xvc2VUaW1lciA9IG51bGw7XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBwYXJhbSBjb25maWdcbiAgICogQHBhcmFtIFtjb25maWcudGhlbWVdXG4gICAqIEBwYXJhbSBbY29uZmlnLnRhcmdldF1cbiAgICogQHBhcmFtIFtjb25maWcuYW5pbWF0ZVRpbWVdXG4gICAqIEBwYXJhbSBbY29uZmlnLm9uU3RhdGVDaGFuZ2VkXVxuICAgKiBAcGFyYW0gW2NvbmZpZy5vbkNsaWNrXVxuICAgKiBAcGFyYW0gW2NvbmZpZy5jb250ZW50XVxuICAgKi9cbiAgaW5pdCgpIHtcbiAgICB0aGlzLm9uU3RhdGVDaGFuZ2VkID0gdGhpcy5jb25maWcub25TdGF0ZUNoYW5nZWQ7XG4gICAgZGVsZXRlIHRoaXMuY29uZmlnLm9uU3RhdGVDaGFuZ2VkO1xuXG4gICAgLy8gaW5pdCDtmLjstpwg7Jes67aAXG4gICAgdGhpcy5pbml0T25jZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICovXG4gIGluaXRPbmNlKCkge1xuICAgIGlmICh0aGlzLmluaXRpYWxpemVkKSByZXR1cm4gdGhpcztcbiAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcblxuICAgIC8vIGZvcm1hdHRlciDsnbjsiqTthLTsiqRcbiAgICB0aGlzLmZvcm1hdHRlciA9IG5ldyBGb3JtYXR0ZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBwYXJhbSBpdGVtXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gaXRlbS50YXJnZXRcbiAgICogQHBhcmFtIHtTdHJpbmd9IGl0ZW0uZGlyZWN0aW9uIC0gdG9wfGxlZnR8cmlnaHR8Ym90dG9tfGF1dG9cbiAgICogQHBhcmFtIHtOdW1iZXJ9IGl0ZW0uY29udGVudFdpZHRoXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gaXRlbS5kaXNhYmxlQ2hhbmdlVHJpZ2dlclxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVtLm9uU3RhdGVDaGFuZ2VkXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtLmJ0bnNcbiAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0uY29udGVudFxuICAgKiBAcGFyYW0ge051bWJlcn0gaXRlbS5jb250ZW50LndpZHRoXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBpdGVtLmNvbnRlbnQubWFyZ2luXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBpdGVtLmNvbnRlbnQudHlwZVxuICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbS5jb250ZW50LmNvbmZpZyAtIGJpbmRlZCBVSSBjb25maWdcbiAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0uY29udGVudC5mb3JtYXR0ZXJcbiAgICogQHBhcmFtIHtTdHJpbmd9IGl0ZW0uY29udGVudC5mb3JtYXR0ZXIucGF0dGVyblxuICAgKiBAcmV0dXJuIHtBWDZVSVBpY2tlcn1cbiAgICogQGV4YW1wbGVcbiAgICogYGBganNcbiAgICogaW1wb3J0ICQgZnJvbSBcImpxbWluXCI7XG4gICAqIGltcG9ydCBQaWNrZXIgZnJvbSBcIi4uLy4uL3NyYy9BWDZVSVBpY2tlclwiO1xuICAgKlxuICAgKiBsZXQgcGlja2VyID0gbmV3IFBpY2tlcigpO1xuICAgKiBwaWNrZXIuYmluZCh7XG4gICAgICogICAgIHRhcmdldDogJChcIiNjb2xvci0wXCIpLFxuICAgICAqICAgICBkaXJlY3Rpb246IFwiYXV0b1wiLFxuICAgICAqICAgICBjb250ZW50OiB7XG4gICAgICogICAgICAgICB3aWR0aDogMjUwLFxuICAgICAqICAgICAgICAgbWFyZ2luOiAxMCxcbiAgICAgKiAgICAgICAgIHR5cGU6ICdjb2xvcicsXG4gICAgICogICAgICAgICBjb25maWc6IHtcbiAgICAgKlxuICAgICAqICAgICAgICAgfVxuICAgICAqICAgICB9LFxuICAgICAqICAgICBvblN0YXRlQ2hhbmdlZDogZnVuY3Rpb24gKCkge1xuICAgICAqXG4gICAgICogICAgIH1cbiAgICAgKiB9KTtcbiAgICogYGBgXG4gICAqL1xuICBiaW5kKGl0ZW0pIHtcbiAgICBsZXQgcGlja2VyQ29uZmlnID0ge30sIHF1ZUlkeDtcbiAgICBpdGVtID0galF1ZXJ5LmV4dGVuZCh0cnVlLCBwaWNrZXJDb25maWcsIHRoaXMuY29uZmlnLCBpdGVtKTtcblxuICAgIGlmICghaXRlbS50YXJnZXQpIHtcbiAgICAgIGNvbnNvbGUubG9nKGluZm8uZ2V0RXJyb3IoXCJheDZwaWNrZXJcIiwgXCI0MDFcIiwgXCJiaW5kXCIpKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBpdGVtLiR0YXJnZXQgPSBqUXVlcnkoaXRlbS50YXJnZXQpO1xuXG4gICAgaWYgKCFpdGVtLiR0YXJnZXQuZ2V0KDApKSB7XG4gICAgICBjb25zb2xlLmxvZyhpbmZvLmdldEVycm9yKFwiYXg2cGlja2VyXCIsIFwiNDAxXCIsIFwiYmluZFwiKSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpZiAoIWl0ZW0uaWQpIGl0ZW0uaWQgPSBpdGVtLiR0YXJnZXQuZGF0YShcImRhdGEtYXhwaWNrZXItaWRcIik7XG4gICAgaWYgKCFpdGVtLmlkKSB7XG4gICAgICBpdGVtLmlkID0gJ2F4Ni1waWNrZXItJyArIEFYNlVJQ29yZS5nZXRJbnN0YW5jZUlkKCk7XG4gICAgICBpdGVtLiR0YXJnZXQuZGF0YShcImRhdGEtYXhwaWNrZXItaWRcIiwgaXRlbS5pZCk7XG4gICAgfVxuICAgIHF1ZUlkeCA9IFUuc2VhcmNoKHRoaXMucXVldWUsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmlkID09IGl0ZW0uaWQ7XG4gICAgfSk7XG5cbiAgICBpZiAocXVlSWR4ID09PSAtMSkge1xuICAgICAgdGhpcy5xdWV1ZS5wdXNoKGl0ZW0pO1xuICAgICAgYmluZFBpY2tlclRhcmdldC5jYWxsKHRoaXMsIHRoaXMucXVldWUubGVuZ3RoIC0gMSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5xdWV1ZVtxdWVJZHhdID0galF1ZXJ5LmV4dGVuZCh0cnVlLCB7fSwgdGhpcy5xdWV1ZVtxdWVJZHhdLCBpdGVtKTtcbiAgICAgIGJpbmRQaWNrZXJUYXJnZXQuY2FsbCh0aGlzLCBxdWVJZHgpO1xuICAgIH1cblxuICAgIHBpY2tlckNvbmZpZyA9IG51bGw7XG4gICAgcXVlSWR4ID0gbnVsbDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBwYXJhbSBib3VuZElEXG4gICAqIEBwYXJhbSBpbnB1dEluZGV4XG4gICAqIEBwYXJhbSB2YWxcbiAgICogQHBhcmFtIF9vcHRpb25cbiAgICogQHJldHVybiB7QVg2VUlQaWNrZXJ9XG4gICAqL1xuICBzZXRDb250ZW50VmFsdWUoYm91bmRJRCwgaW5wdXRJbmRleCwgdmFsLCBfb3B0aW9uKSB7XG4gICAgY29uc3QgbXVsdGlwbGVJbnB1dFByb2Nlc3NvciA9IHtcbiAgICAgIFwiZGF0ZVwiOiBmdW5jdGlvbiAoX2l0ZW0sIF9pbnB1dEluZGV4LCBfdmFsKSB7XG4gICAgICAgIHZhciB2YWx1ZXMgPSBbXSxcbiAgICAgICAgICBkaWZmRGF5LCBwcmV2SW5wdXRWYWx1ZSwgbmV4dElucHV0VmFsdWU7XG5cbiAgICAgICAgaWYgKF9pdGVtLiR0YXJnZXQuZ2V0KDApLnRhZ05hbWUudG9VcHBlckNhc2UoKSAhPT0gXCJJTlBVVFwiKSB7XG4gICAgICAgICAgX2l0ZW0uJHRhcmdldC5maW5kKCdpbnB1dFt0eXBlXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFsdWVzLnB1c2godGhpcy52YWx1ZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoX2lucHV0SW5kZXggPT0gMCkge1xuICAgICAgICAgIGlmICh2YWx1ZXMubGVuZ3RoID4gMSAmJiB2YWx1ZXNbMV0gIT09IFwiXCIpIHtcbiAgICAgICAgICAgIC8vIOqwkiDqsoDspp1cbiAgICAgICAgICAgIGRpZmZEYXkgPSBVLmRkYXkodmFsdWVzWzFdLCB7dG9kYXk6IHZhbHVlc1swXX0pO1xuICAgICAgICAgICAgaWYgKGRpZmZEYXkgPCAwKSB7XG4gICAgICAgICAgICAgIC8vIOuLpOydjOuCoOynnCDri6zroKXsnYQg67OA6rK97ZWp64uI64ukLlxuICAgICAgICAgICAgICBuZXh0SW5wdXRWYWx1ZSA9IF92YWw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5leHRJbnB1dFZhbHVlID0gX3ZhbDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAobmV4dElucHV0VmFsdWUpIHtcbiAgICAgICAgICAgIF9pdGVtLnBpY2tlckNhbGVuZGFyWzFdLmNhbGVuZGFyLnNldFNlbGVjdGlvbihbbmV4dElucHV0VmFsdWVdLCBmYWxzZSkuY2hhbmdlTW9kZShcImRcIiwgbmV4dElucHV0VmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5zZXRDb250ZW50VmFsdWUoX2l0ZW0uaWQsIDEsIG5leHRJbnB1dFZhbHVlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gX3ZhbDtcblxuICAgICAgICB9IGVsc2UgaWYgKF9pbnB1dEluZGV4ID09IDEpIHtcblxuICAgICAgICAgIGlmICh2YWx1ZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgLy8g6rCSIOqygOymnVxuICAgICAgICAgICAgZGlmZkRheSA9IFUuZGRheSh2YWx1ZXNbMV0sIHt0b2RheTogdmFsdWVzWzBdfSk7XG4gICAgICAgICAgICBpZiAoZGlmZkRheSA8IDApIHtcbiAgICAgICAgICAgICAgLy8g64uk7J2M64Kg7KecIOuLrOugpeydhCDrs4Dqsr3tlanri4jri6QuXG4gICAgICAgICAgICAgIHByZXZJbnB1dFZhbHVlID0gdmFsdWVzWzFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChwcmV2SW5wdXRWYWx1ZSkge1xuICAgICAgICAgICAgX2l0ZW0ucGlja2VyQ2FsZW5kYXJbMF0uY2FsZW5kYXIuc2V0U2VsZWN0aW9uKFtwcmV2SW5wdXRWYWx1ZV0sIGZhbHNlKS5jaGFuZ2VNb2RlKFwiZFwiLCBwcmV2SW5wdXRWYWx1ZSk7XG4gICAgICAgICAgICB0aGlzLnNldENvbnRlbnRWYWx1ZShfaXRlbS5pZCwgMCwgcHJldklucHV0VmFsdWUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBfdmFsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIGxldCBxdWVJZHggPSAoVS5pc051bWJlcihib3VuZElEKSkgPyBib3VuZElEIDogZ2V0UXVlSWR4LmNhbGwodGhpcywgYm91bmRJRCksXG4gICAgICBpdGVtID0gdGhpcy5xdWV1ZVtxdWVJZHhdLFxuICAgICAgX2lucHV0O1xuXG4gICAgaWYgKCFfb3B0aW9uKSBfb3B0aW9uID0ge307XG4gICAgaWYgKGl0ZW0pIHtcblxuICAgICAgX2lucHV0ID0gKGl0ZW0uJHRhcmdldC5nZXQoMCkudGFnTmFtZS50b1VwcGVyQ2FzZSgpID09IFwiSU5QVVRcIikgPyBpdGVtLiR0YXJnZXQgOiBqUXVlcnkoaXRlbS4kdGFyZ2V0LmZpbmQoJ2lucHV0W3R5cGVdJykuZ2V0KGlucHV0SW5kZXgpKTtcbiAgICAgIF9pbnB1dC52YWwodmFsKTtcblxuICAgICAgaWYgKCFpdGVtLmRpc2FibGVDaGFuZ2VUcmlnZ2VyKSB7XG4gICAgICAgIF9pbnB1dC50cmlnZ2VyKFwiY2hhbmdlXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0ICRjb2xvclByZXZpZXcgPSBpdGVtLiR0YXJnZXQuZmluZCgnW2RhdGEtYXg2cGlja2VyLWNvbG9yPVwicHJldmlld1wiXScpO1xuICAgICAgICBpZiAoJGNvbG9yUHJldmlldy5nZXQoMCkpIHtcbiAgICAgICAgICAkY29sb3JQcmV2aWV3LmNzcyh7XCJiYWNrZ3JvdW5kLWNvbG9yXCI6IHZhbH0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHBpY2tlcuydmCDsnoXroKXsnbQgMuqwnOydtOyDgeyduCDqsr3smrBcbiAgICAgIC8vY29uc29sZS5sb2coaXRlbS5pbnB1dExlbmd0aCk7XG4gICAgICBpZiAoaXRlbS5pbnB1dExlbmd0aCA+IDEpIHtcbiAgICAgICAgLy8g6rK97Jqw7JeQIOuUsOudvCDssqvrsogg7ISg7YOd7JeQIOuUsOudvCDtlbTslbztlaAg7J2865OkIOyymOumrFxuICAgICAgICBpZiAobXVsdGlwbGVJbnB1dFByb2Nlc3NvcltpdGVtLmNvbnRlbnQudHlwZV0pIHtcbiAgICAgICAgICB2YWwgPSBtdWx0aXBsZUlucHV0UHJvY2Vzc29yW2l0ZW0uY29udGVudC50eXBlXS5jYWxsKHRoaXMsIGl0ZW0sIGlucHV0SW5kZXgsIHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGV0IHRoYXQgPSB7XG4gICAgICAgIHNlbGY6IHRoaXMsXG4gICAgICAgIHN0YXRlOiBcImNoYW5nZVZhbHVlXCIsXG4gICAgICAgIGl0ZW06IGl0ZW0sXG4gICAgICAgIGlucHV0SW5kZXg6IGlucHV0SW5kZXgsXG4gICAgICAgIHZhbHVlOiB2YWwsXG4gICAgICAgIHZhbHVlczogW3ZhbF1cbiAgICAgIH07XG4gICAgICBpZiAoaXRlbS4kdGFyZ2V0LmdldCgwKS50YWdOYW1lLnRvVXBwZXJDYXNlKCkgIT09IFwiSU5QVVRcIikge1xuICAgICAgICB0aGF0LnZhbHVlcyA9IFtdO1xuICAgICAgICBpdGVtLiR0YXJnZXQuZmluZCgnaW5wdXRbdHlwZV0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGF0LnZhbHVlcy5wdXNoKHRoaXMudmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgb25TdGF0ZUNoYW5nZWQuY2FsbCh0aGlzLCBpdGVtLCB0aGF0KTtcblxuICAgICAgaWYgKGl0ZW0uaW5wdXRMZW5ndGggPT0gMSAmJiAhX29wdGlvbi5kb05vdENsb3NlKSB7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpdGVtID0gbnVsbDtcbiAgICBib3VuZElEID0gbnVsbDtcbiAgICBpbnB1dEluZGV4ID0gbnVsbDtcbiAgICB2YWwgPSBudWxsO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQHBhcmFtIGJvdW5kSURcbiAgICogQHBhcmFtIGlucHV0SW5kZXhcbiAgICogQHJldHVybiB7Kn1cbiAgICovXG4gIGdldENvbnRlbnRWYWx1ZShib3VuZElELCBpbnB1dEluZGV4KSB7XG4gICAgbGV0IHF1ZUlkeCA9IChVLmlzTnVtYmVyKGJvdW5kSUQpKSA/IGJvdW5kSUQgOiBnZXRRdWVJZHguY2FsbCh0aGlzLCBib3VuZElEKSxcbiAgICAgIGl0ZW0gPSB0aGlzLnF1ZXVlW3F1ZUlkeF0sXG4gICAgICBfaW5wdXQ7XG5cbiAgICBpZiAoaXRlbSkge1xuICAgICAgX2lucHV0ID0gKGl0ZW0uJHRhcmdldC5nZXQoMCkudGFnTmFtZS50b1VwcGVyQ2FzZSgpID09IFwiSU5QVVRcIikgPyBpdGVtLiR0YXJnZXQgOiBqUXVlcnkoaXRlbS4kdGFyZ2V0LmZpbmQoJ2lucHV0W3R5cGVdJykuZ2V0KGlucHV0SW5kZXgpKTtcbiAgICAgIHJldHVybiBfaW5wdXQudmFsKCk7XG4gICAgfVxuXG4gICAgaXRlbSA9IG51bGw7XG4gICAgYm91bmRJRCA9IG51bGw7XG4gICAgaW5wdXRJbmRleCA9IG51bGw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAcGFyYW0gYm91bmRJRFxuICAgKiBAcGFyYW0gdHJ5Q291bnRcbiAgICogQHJldHVybiB7QVg2VUlQaWNrZXJ9XG4gICAqL1xuICBvcGVuKGJvdW5kSUQsIHRyeUNvdW50KSB7XG4gICAgY29uc3QgcGlja2VyQ29udGVudCA9IHtcbiAgICAgICdAZm4nOiBmdW5jdGlvbiAocXVlSWR4LCBjYWxsYmFjaykge1xuICAgICAgICBsZXQgaXRlbSA9IHRoaXMucXVldWVbcXVlSWR4XTtcbiAgICAgICAgaXRlbS5jb250ZW50LmNhbGwoaXRlbSwgZnVuY3Rpb24gKGh0bWwpIHtcbiAgICAgICAgICBjYWxsYmFjayhodG1sKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSxcbiAgICAgICdkYXRlJzogZnVuY3Rpb24gKHF1ZUlkeCkge1xuICAgICAgICBsZXQgaXRlbSA9IHRoaXMucXVldWVbcXVlSWR4XSxcbiAgICAgICAgICBodG1sID0gW10sXG4gICAgICAgICAgY2FsZW5kYXJDb25maWcgPSBqUXVlcnkuZXh0ZW5kKHt9LCB0aGlzLmNvbmZpZy5jYWxlbmRhciwge2Rpc3BsYXlEYXRlOiAobmV3IERhdGUoKSl9KSxcbiAgICAgICAgICBpbnB1dCA9IChpdGVtLiR0YXJnZXQuZ2V0KDApLnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PSBcIklOUFVUXCIpID8gaXRlbS4kdGFyZ2V0IDogaXRlbS4kdGFyZ2V0LmZpbmQoJ2lucHV0W3R5cGVdJyk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtLmlucHV0TGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBodG1sLnB1c2goJzxkaXYgJ1xuICAgICAgICAgICAgKyAnc3R5bGU9XCJ3aWR0aDonICsgVS5jc3NOdW1iZXIoaXRlbS5jb250ZW50LndpZHRoKSArICc7ZmxvYXQ6bGVmdDtcIiAnXG4gICAgICAgICAgICArICdjbGFzcz1cImF4LXBpY2tlci1jb250ZW50LWJveFwiICdcbiAgICAgICAgICAgICsgJ2RhdGEtY2FsZW5kYXItdGFyZ2V0PVwiJyArIGkgKyAnXCI+PC9kaXY+Jyk7XG4gICAgICAgICAgaWYgKGkgPCBpdGVtLmlucHV0TGVuZ3RoIC0gMSkgaHRtbC5wdXNoKCc8ZGl2IHN0eWxlPVwid2lkdGg6JyArIGl0ZW0uY29udGVudC5tYXJnaW4gKyAncHg7ZmxvYXQ6bGVmdDtoZWlnaHQ6IDVweDtcIj48L2Rpdj4nKTtcbiAgICAgICAgfVxuICAgICAgICBodG1sLnB1c2goJzxkaXYgc3R5bGU9XCJjbGVhcjpib3RoO1wiPjwvZGl2PicpO1xuICAgICAgICBpdGVtLnBpY2tlckNvbnRlbnQuaHRtbChodG1sLmpvaW4oJycpKTtcblxuICAgICAgICAvLyBjYWxlbmRhciBiaW5kXG4gICAgICAgIGl0ZW0ucGlja2VyQ2FsZW5kYXIgPSBbXTtcbiAgICAgICAgaXRlbS5waWNrZXJDb250ZW50LmZpbmQoJ1tkYXRhLWNhbGVuZGFyLXRhcmdldF0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgIC8vIGNhbGVuZGFyQ29uZmlnIGV4dGVuZCB+XG4gICAgICAgICAgbGV0IGlkeCA9IHRoaXMuZ2V0QXR0cmlidXRlKFwiZGF0YS1jYWxlbmRhci10YXJnZXRcIiksXG4gICAgICAgICAgICBkVmFsdWUgPSBpbnB1dC5nZXQoaWR4KS52YWx1ZSxcbiAgICAgICAgICAgIGQgPSBVLmRhdGUoZFZhbHVlKSxcbiAgICAgICAgICAgIGRhdGVDb252ZXJ0ID0ge1xuICAgICAgICAgICAgICBcInllYXJcIihfZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBVLmRhdGUoX2QsIHtcInJldHVyblwiOiBcInl5eXlcIn0pXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwibW9udGhcIihfZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBVLmRhdGUoX2QsIHtcInJldHVyblwiOiBcInl5eXktTU1cIn0pXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiZGF5XCIoX2QpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2RcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgIGNhbGVuZGFyQ29uZmlnLmRpc3BsYXlEYXRlID0gZDtcblxuICAgICAgICAgIGlmIChkVmFsdWUpIGNhbGVuZGFyQ29uZmlnLnNlbGVjdGlvbiA9IFtkXTtcblxuICAgICAgICAgIGNhbGVuZGFyQ29uZmlnID0galF1ZXJ5LmV4dGVuZCh0cnVlLCBjYWxlbmRhckNvbmZpZywgaXRlbS5jb250ZW50LmNvbmZpZyB8fCB7fSk7XG4gICAgICAgICAgY2FsZW5kYXJDb25maWcudGFyZ2V0ID0gdGhpcztcbiAgICAgICAgICBjYWxlbmRhckNvbmZpZy5vbkNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi5zZXRDb250ZW50VmFsdWUoaXRlbS5pZCwgaWR4LCBkYXRlQ29udmVydFtjYWxlbmRhckNvbmZpZy5zZWxlY3RNb2RlIHx8IFwiZGF5XCJdKHRoaXMuZGF0ZSkpO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICBpdGVtLnBpY2tlckNhbGVuZGFyLnB1c2goe1xuICAgICAgICAgICAgaXRlbUlkOiBpdGVtLmlkLFxuICAgICAgICAgICAgaW5wdXRJbmRleDogaWR4LFxuICAgICAgICAgICAgY2FsZW5kYXI6IG5ldyBDYWxlbmRhcihjYWxlbmRhckNvbmZpZylcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgIH0sXG4gICAgICAnc2VjdXJlLW51bSc6IGZ1bmN0aW9uIChxdWVJZHgpIHtcbiAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnF1ZXVlW3F1ZUlkeF0sXG4gICAgICAgICAgaHRtbCA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW0uaW5wdXRMZW5ndGg7IGkrKykge1xuICAgICAgICAgIGh0bWwucHVzaCgnPGRpdiAnXG4gICAgICAgICAgICArICdzdHlsZT1cIndpZHRoOicgKyBVLmNzc051bWJlcihpdGVtLmNvbnRlbnQud2lkdGgpICsgJztmbG9hdDpsZWZ0O1wiICdcbiAgICAgICAgICAgICsgJ2NsYXNzPVwiYXgtcGlja2VyLWNvbnRlbnQtYm94XCIgJ1xuICAgICAgICAgICAgKyAnZGF0YS1zZWN1cmUtbnVtLXRhcmdldD1cIicgKyBpICsgJ1wiPjwvZGl2PicpO1xuICAgICAgICAgIGlmIChpIDwgaXRlbS5pbnB1dExlbmd0aCAtIDEpIGh0bWwucHVzaCgnPGRpdiBzdHlsZT1cIndpZHRoOicgKyBpdGVtLmNvbnRlbnQubWFyZ2luICsgJ3B4O2Zsb2F0OmxlZnQ7aGVpZ2h0OiA1cHg7XCI+PC9kaXY+Jyk7XG4gICAgICAgIH1cbiAgICAgICAgaHRtbC5wdXNoKCc8ZGl2IHN0eWxlPVwiY2xlYXI6Ym90aDtcIj48L2Rpdj4nKTtcbiAgICAgICAgaXRlbS5waWNrZXJDb250ZW50Lmh0bWwoaHRtbC5qb2luKCcnKSk7XG5cbiAgICAgICAgLy8gc2VjdXJlLW51bSBiaW5kXG4gICAgICAgIGl0ZW0ucGlja2VyQ29udGVudC5maW5kKCdbZGF0YS1zZWN1cmUtbnVtLXRhcmdldF0nKS5lYWNoKChlbElkeCwgZWwpID0+IHtcbiAgICAgICAgICBsZXQgaWR4ID0gZWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1zZWN1cmUtbnVtLXRhcmdldFwiKSxcbiAgICAgICAgICAgIHBvID0gW107XG5cbiAgICAgICAgICBsZXQgbnVtQXJyYXkgPSAoZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgICAgIGxldCBqLCB4LCBpO1xuICAgICAgICAgICAgZm9yIChpID0gYS5sZW5ndGg7IGk7IGkgLT0gMSkge1xuICAgICAgICAgICAgICBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaSk7XG4gICAgICAgICAgICAgIHggPSBhW2kgLSAxXTtcbiAgICAgICAgICAgICAgYVtpIC0gMV0gPSBhW2pdO1xuICAgICAgICAgICAgICBhW2pdID0geDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhO1xuICAgICAgICAgIH0pKFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5XSk7XG5cbiAgICAgICAgICBsZXQgc3BlY2lhbEFycmF5ID0gW1xuICAgICAgICAgICAge2xhYmVsOiBcIiYjeDAyMTkwXCIsIGZuOiBcImJhY2tcIn0sIHtsYWJlbDogXCJDXCIsIGZuOiBcImNsZWFyXCJ9XG4gICAgICAgICAgXTtcblxuICAgICAgICAgIG51bUFycmF5LmZvckVhY2goZnVuY3Rpb24gKG4pIHtcbiAgICAgICAgICAgIHBvLnB1c2goJzxkaXYgc3R5bGU9XCJmbG9hdDpsZWZ0OycgKyBpdGVtLmNvbnRlbnQuY29uZmlnLmJ0bldyYXBTdHlsZSArICdcIj4nKTtcbiAgICAgICAgICAgIHBvLnB1c2goJzxidXR0b24gY2xhc3M9XCInICsgaXRlbS5jb250ZW50LmNvbmZpZy5idG5UaGVtZSArICdcIiAnXG4gICAgICAgICAgICAgICsgJ3N0eWxlPVwiJyArIGl0ZW0uY29udGVudC5jb25maWcuYnRuU3R5bGUgKyAnXCIgZGF0YS1zZWN1cmUtbnVtLXZhbHVlPVwiJyArIG4gKyAnXCI+JyArIG4gKyAnPC9idXR0b24+Jyk7XG4gICAgICAgICAgICBwby5wdXNoKCc8L2Rpdj4nKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBzcGVjaWFsQXJyYXkuZm9yRWFjaChmdW5jdGlvbiAobikge1xuICAgICAgICAgICAgcG8ucHVzaCgnPGRpdiBzdHlsZT1cImZsb2F0OmxlZnQ7JyArIGl0ZW0uY29udGVudC5jb25maWcuYnRuV3JhcFN0eWxlICsgJ1wiPicpO1xuICAgICAgICAgICAgcG8ucHVzaCgnPGJ1dHRvbiBjbGFzcz1cIicgKyBpdGVtLmNvbnRlbnQuY29uZmlnLnNwZWNpYWxCdG5UaGVtZSArICdcIiAnXG4gICAgICAgICAgICAgICsgJ3N0eWxlPVwiJyArIGl0ZW0uY29udGVudC5jb25maWcuYnRuU3R5bGUgKyAnXCIgZGF0YS1zZWN1cmUtbnVtLXZhbHVlPVwiJyArIG4uZm4gKyAnXCI+JyArIG4ubGFiZWwgKyAnPC9idXR0b24+Jyk7XG4gICAgICAgICAgICBwby5wdXNoKCc8L2Rpdj4nKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHBvLnB1c2goJzxkaXYgc3R5bGU9XCJjbGVhcjpib3RoO1wiPjwvZGl2PicpO1xuXG4gICAgICAgICAgJChlbCkuaHRtbChwby5qb2luKCcnKSkub24oXCJjbGlja1wiLCAnW2RhdGEtc2VjdXJlLW51bS12YWx1ZV0nLCAoZSkgPT4ge1xuICAgICAgICAgICAgbGV0IGFjdCA9IGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXNlY3VyZS1udW0tdmFsdWVcIik7XG4gICAgICAgICAgICBsZXQgX2lucHV0ID0gKGl0ZW0uJHRhcmdldC5nZXQoMCkudGFnTmFtZS50b1VwcGVyQ2FzZSgpID09IFwiSU5QVVRcIikgPyBpdGVtLiR0YXJnZXQgOiBqUXVlcnkoaXRlbS4kdGFyZ2V0LmZpbmQoJ2lucHV0W3R5cGVdJykuZ2V0KGlkeCkpO1xuICAgICAgICAgICAgbGV0IHZhbCA9IF9pbnB1dC52YWwoKTtcblxuICAgICAgICAgICAgaWYgKGFjdCA9PSBcImJhY2tcIikge1xuICAgICAgICAgICAgICBfaW5wdXQudmFsKHZhbC5zdWJzdHJpbmcoMCwgdmFsLmxlbmd0aCAtIDEpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGFjdCA9PSBcImNsZWFyXCIpIHtcbiAgICAgICAgICAgICAgX2lucHV0LnZhbCgnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgX2lucHV0LnZhbCh2YWwgKyBhY3QpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvblN0YXRlQ2hhbmdlZC5jYWxsKHRoaXMsIGl0ZW0sIHtcbiAgICAgICAgICAgICAgc2VsZjogdGhpcyxcbiAgICAgICAgICAgICAgc3RhdGU6IFwiY2hhbmdlVmFsdWVcIixcbiAgICAgICAgICAgICAgaXRlbTogaXRlbSxcbiAgICAgICAgICAgICAgdmFsdWU6IF9pbnB1dC52YWwoKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgICdrZXlib2FyZCc6IGZ1bmN0aW9uIChxdWVJZHgpIHtcbiAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnF1ZXVlW3F1ZUlkeF07XG4gICAgICAgIGxldCBodG1sID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbS5pbnB1dExlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaHRtbC5wdXNoKCc8ZGl2ICdcbiAgICAgICAgICAgICsgJ3N0eWxlPVwid2lkdGg6JyArIFUuY3NzTnVtYmVyKGl0ZW0uY29udGVudC53aWR0aCkgKyAnO2Zsb2F0OmxlZnQ7XCIgJ1xuICAgICAgICAgICAgKyAnY2xhc3M9XCJheC1waWNrZXItY29udGVudC1ib3hcIiAnXG4gICAgICAgICAgICArICdkYXRhLWtleWJvYXJkLXRhcmdldD1cIicgKyBpICsgJ1wiPjwvZGl2PicpO1xuICAgICAgICAgIGlmIChpIDwgaXRlbS5pbnB1dExlbmd0aCAtIDEpIGh0bWwucHVzaCgnPGRpdiBzdHlsZT1cIndpZHRoOicgKyBpdGVtLmNvbnRlbnQubWFyZ2luICsgJ3B4O2Zsb2F0OmxlZnQ7aGVpZ2h0OiA1cHg7XCI+PC9kaXY+Jyk7XG4gICAgICAgIH1cbiAgICAgICAgaHRtbC5wdXNoKCc8ZGl2IHN0eWxlPVwiY2xlYXI6Ym90aDtcIj48L2Rpdj4nKTtcbiAgICAgICAgaXRlbS5waWNrZXJDb250ZW50Lmh0bWwoaHRtbC5qb2luKCcnKSk7XG5cbiAgICAgICAgbGV0IGtleUFycmF5ID0gW1xuICAgICAgICAgIFtcbiAgICAgICAgICAgIHt2YWx1ZTogXCJgXCIsIHNoaWZ0VmFsdWU6IFwiflwifSxcbiAgICAgICAgICAgIHt2YWx1ZTogXCIxXCIsIHNoaWZ0VmFsdWU6IFwiIVwifSxcbiAgICAgICAgICAgIHt2YWx1ZTogXCIyXCIsIHNoaWZ0VmFsdWU6IFwiQFwifSxcbiAgICAgICAgICAgIHt2YWx1ZTogXCIzXCIsIHNoaWZ0VmFsdWU6IFwiI1wifSxcbiAgICAgICAgICAgIHt2YWx1ZTogXCI0XCIsIHNoaWZ0VmFsdWU6IFwiJFwifSxcbiAgICAgICAgICAgIHt2YWx1ZTogXCI1XCIsIHNoaWZ0VmFsdWU6IFwiJVwifSxcbiAgICAgICAgICAgIHt2YWx1ZTogXCI2XCIsIHNoaWZ0VmFsdWU6IFwiXlwifSxcbiAgICAgICAgICAgIHt2YWx1ZTogXCI3XCIsIHNoaWZ0VmFsdWU6IFwiJlwifSxcbiAgICAgICAgICAgIHt2YWx1ZTogXCI4XCIsIHNoaWZ0VmFsdWU6IFwiKlwifSxcbiAgICAgICAgICAgIHt2YWx1ZTogXCI5XCIsIHNoaWZ0VmFsdWU6IFwiKFwifSxcbiAgICAgICAgICAgIHt2YWx1ZTogXCIwXCIsIHNoaWZ0VmFsdWU6IFwiKVwifSxcbiAgICAgICAgICAgIHt2YWx1ZTogXCItXCIsIHNoaWZ0VmFsdWU6IFwiX1wifSxcbiAgICAgICAgICAgIHt2YWx1ZTogXCI9XCIsIHNoaWZ0VmFsdWU6IFwiK1wifSxcbiAgICAgICAgICAgIHtsYWJlbDogXCImI3gwMjE5MFwiLCBmbjogXCJiYWNrXCJ9XG4gICAgICAgICAgXSxcbiAgICAgICAgICBbXG4gICAgICAgICAgICB7dmFsdWU6IFwicVwiLCBzaGlmdFZhbHVlOiBcIlFcIn0sXG4gICAgICAgICAgICB7dmFsdWU6IFwid1wiLCBzaGlmdFZhbHVlOiBcIldcIn0sXG4gICAgICAgICAgICB7dmFsdWU6IFwiZVwiLCBzaGlmdFZhbHVlOiBcIkVcIn0sXG4gICAgICAgICAgICB7dmFsdWU6IFwiclwiLCBzaGlmdFZhbHVlOiBcIlJcIn0sXG4gICAgICAgICAgICB7dmFsdWU6IFwidFwiLCBzaGlmdFZhbHVlOiBcIlRcIn0sXG4gICAgICAgICAgICB7dmFsdWU6IFwieVwiLCBzaGlmdFZhbHVlOiBcIllcIn0sXG4gICAgICAgICAgICB7dmFsdWU6IFwidVwiLCBzaGlmdFZhbHVlOiBcIlVcIn0sXG4gICAgICAgICAgICB7dmFsdWU6IFwiaVwiLCBzaGlmdFZhbHVlOiBcIklcIn0sXG4gICAgICAgICAgICB7dmFsdWU6IFwib1wiLCBzaGlmdFZhbHVlOiBcIk9cIn0sXG4gICAgICAgICAgICB7dmFsdWU6IFwicFwiLCBzaGlmdFZhbHVlOiBcIlBcIn0sXG4gICAgICAgICAgICB7dmFsdWU6IFwiW1wiLCBzaGlmdFZhbHVlOiBcIntcIn0sXG4gICAgICAgICAgICB7dmFsdWU6IFwiXVwiLCBzaGlmdFZhbHVlOiBcIn1cIn0sXG4gICAgICAgICAgICB7dmFsdWU6IFwiXFxcXFwiLCBzaGlmdFZhbHVlOiBcInxcIn1cbiAgICAgICAgICBdLFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIHtsYWJlbDogXCJDbGVhclwiLCBmbjogXCJjbGVhclwifSxcbiAgICAgICAgICAgIHt2YWx1ZTogXCJhXCIsIHNoaWZ0VmFsdWU6IFwiQVwifSxcbiAgICAgICAgICAgIHt2YWx1ZTogXCJzXCIsIHNoaWZ0VmFsdWU6IFwiU1wifSxcbiAgICAgICAgICAgIHt2YWx1ZTogXCJkXCIsIHNoaWZ0VmFsdWU6IFwiRFwifSxcbiAgICAgICAgICAgIHt2YWx1ZTogXCJmXCIsIHNoaWZ0VmFsdWU6IFwiRlwifSxcbiAgICAgICAgICAgIHt2YWx1ZTogXCJnXCIsIHNoaWZ0VmFsdWU6IFwiR1wifSxcbiAgICAgICAgICAgIHt2YWx1ZTogXCJoXCIsIHNoaWZ0VmFsdWU6IFwiSFwifSxcbiAgICAgICAgICAgIHt2YWx1ZTogXCJqXCIsIHNoaWZ0VmFsdWU6IFwiSlwifSxcbiAgICAgICAgICAgIHt2YWx1ZTogXCJrXCIsIHNoaWZ0VmFsdWU6IFwiS1wifSxcbiAgICAgICAgICAgIHt2YWx1ZTogXCJsXCIsIHNoaWZ0VmFsdWU6IFwiTFwifSxcbiAgICAgICAgICAgIHt2YWx1ZTogXCI7XCIsIHNoaWZ0VmFsdWU6IFwiOlwifSxcbiAgICAgICAgICAgIHt2YWx1ZTogXCInXCIsIHNoaWZ0VmFsdWU6IFwiXFxcIlwifVxuICAgICAgICAgIF0sXG4gICAgICAgICAgW1xuICAgICAgICAgICAge2xhYmVsOiBcIlNoaWZ0XCIsIGZuOiBcInNoaWZ0XCJ9LFxuICAgICAgICAgICAge3ZhbHVlOiBcInpcIiwgc2hpZnRWYWx1ZTogXCJaXCJ9LFxuICAgICAgICAgICAge3ZhbHVlOiBcInhcIiwgc2hpZnRWYWx1ZTogXCJYXCJ9LFxuICAgICAgICAgICAge3ZhbHVlOiBcImNcIiwgc2hpZnRWYWx1ZTogXCJDXCJ9LFxuICAgICAgICAgICAge3ZhbHVlOiBcInZcIiwgc2hpZnRWYWx1ZTogXCJWXCJ9LFxuICAgICAgICAgICAge3ZhbHVlOiBcImJcIiwgc2hpZnRWYWx1ZTogXCJCXCJ9LFxuICAgICAgICAgICAge3ZhbHVlOiBcIm5cIiwgc2hpZnRWYWx1ZTogXCJOXCJ9LFxuICAgICAgICAgICAge3ZhbHVlOiBcIm1cIiwgc2hpZnRWYWx1ZTogXCJNXCJ9LFxuICAgICAgICAgICAge3ZhbHVlOiBcIixcIiwgc2hpZnRWYWx1ZTogXCI8XCJ9LFxuICAgICAgICAgICAge3ZhbHVlOiBcIi5cIiwgc2hpZnRWYWx1ZTogXCI+XCJ9LFxuICAgICAgICAgICAge3ZhbHVlOiBcIi9cIiwgc2hpZnRWYWx1ZTogXCI/XCJ9LFxuICAgICAgICAgICAge2xhYmVsOiBcIkNsb3NlXCIsIGZuOiBcImNsb3NlXCJ9XG4gICAgICAgICAgXVxuICAgICAgICBdO1xuICAgICAgICBsZXQgc3BlY2lhbEFycmF5ID0gW1xuICAgICAgICAgIHtsYWJlbDogXCImI3gwMjE5MFwiLCBmbjogXCJiYWNrXCJ9LCB7bGFiZWw6IFwiQ1wiLCBmbjogXCJjbGVhclwifVxuICAgICAgICBdO1xuICAgICAgICBjb25zdCBnZXRLZXlCb2FyZCA9IGZ1bmN0aW9uIChpc1NoaWZ0S2V5KSB7XG4gICAgICAgICAgbGV0IHBvID0gW107XG4gICAgICAgICAga2V5QXJyYXkuZm9yRWFjaChmdW5jdGlvbiAocm93KSB7XG4gICAgICAgICAgICBwby5wdXNoKCc8ZGl2IHN0eWxlPVwiZGlzcGxheTogdGFibGU7bWFyZ2luOjAgYXV0bztcIj4nKTtcbiAgICAgICAgICAgIHJvdy5mb3JFYWNoKGZ1bmN0aW9uIChuKSB7XG5cbiAgICAgICAgICAgICAgbGV0IGtleVZhbHVlLCBrZXlMYWJlbCwgYnRuV3JhcFN0eWxlLCBidG5UaGVtZSwgYnRuU3R5bGU7XG4gICAgICAgICAgICAgIGlmIChuLmZuKSB7XG4gICAgICAgICAgICAgICAga2V5VmFsdWUgPSBuLmZuO1xuICAgICAgICAgICAgICAgIGtleUxhYmVsID0gbi5sYWJlbDtcbiAgICAgICAgICAgICAgICBidG5XcmFwU3R5bGUgPSBpdGVtLmNvbnRlbnQuY29uZmlnLnNwZWNpYWxCdG5XcmFwU3R5bGU7XG4gICAgICAgICAgICAgICAgYnRuVGhlbWUgPSBpdGVtLmNvbnRlbnQuY29uZmlnLnNwZWNpYWxCdG5UaGVtZTtcbiAgICAgICAgICAgICAgICBidG5TdHlsZSA9IGl0ZW0uY29udGVudC5jb25maWcuc3BlY2lhbEJ0blN0eWxlO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGtleUxhYmVsID0ga2V5VmFsdWUgPSAoKGlzU2hpZnRLZXkpID8gbi5zaGlmdFZhbHVlIDogbi52YWx1ZSk7XG4gICAgICAgICAgICAgICAgYnRuV3JhcFN0eWxlID0gaXRlbS5jb250ZW50LmNvbmZpZy5idG5XcmFwU3R5bGU7XG4gICAgICAgICAgICAgICAgYnRuVGhlbWUgPSBpdGVtLmNvbnRlbnQuY29uZmlnLmJ0blRoZW1lO1xuICAgICAgICAgICAgICAgIGJ0blN0eWxlID0gaXRlbS5jb250ZW50LmNvbmZpZy5idG5TdHlsZTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHBvLnB1c2goJzxkaXYgc3R5bGU9XCJkaXNwbGF5OiB0YWJsZS1jZWxsOycgKyBidG5XcmFwU3R5bGUgKyAnXCI+Jyk7XG4gICAgICAgICAgICAgIHBvLnB1c2goJzxidXR0b24gY2xhc3M9XCInICsgYnRuVGhlbWUgKyAnXCIgJ1xuICAgICAgICAgICAgICAgICsgJ3N0eWxlPVwiJyArIGJ0blN0eWxlICsgJ1wiIGRhdGEta2V5Ym9hcmQtdmFsdWU9XCInICsga2V5VmFsdWUgKyAnXCI+JyArIGtleUxhYmVsICsgJzwvYnV0dG9uPicpO1xuICAgICAgICAgICAgICBwby5wdXNoKCc8L2Rpdj4nKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcG8ucHVzaCgnPC9kaXY+Jyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIHBvLmpvaW4oJycpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHNlY3VyZS1udW0gYmluZFxuICAgICAgICBpdGVtLnBpY2tlckNvbnRlbnQuZmluZCgnW2RhdGEta2V5Ym9hcmQtdGFyZ2V0XScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGxldCBpZHggPSB0aGlzLmdldEF0dHJpYnV0ZShcImRhdGEta2V5Ym9hcmQtdGFyZ2V0XCIpLFxuICAgICAgICAgICAgJHRoaXMgPSAkKHRoaXMpLFxuICAgICAgICAgICAgaXNTaGlmdEtleSA9IGZhbHNlLFxuICAgICAgICAgICAgdG9nZ2xlU2hpZnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIGlzU2hpZnRLZXkgPSAhaXNTaGlmdEtleTtcbiAgICAgICAgICAgICAgJHRoaXMuaHRtbChnZXRLZXlCb2FyZChpc1NoaWZ0S2V5KSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgJHRoaXMuaHRtbChnZXRLZXlCb2FyZChpc1NoaWZ0S2V5KSkub24oXCJtb3VzZWRvd25cIiwgJ1tkYXRhLWtleWJvYXJkLXZhbHVlXScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxldCBhY3QgPSB0aGlzLmdldEF0dHJpYnV0ZShcImRhdGEta2V5Ym9hcmQtdmFsdWVcIiksXG4gICAgICAgICAgICAgIF9pbnB1dCA9IChpdGVtLiR0YXJnZXQuZ2V0KDApLnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PSBcIklOUFVUXCIpID8gaXRlbS4kdGFyZ2V0IDogalF1ZXJ5KGl0ZW0uJHRhcmdldC5maW5kKCdpbnB1dFt0eXBlXScpLmdldChpZHgpKSxcbiAgICAgICAgICAgICAgdmFsID0gX2lucHV0LnZhbCgpO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKGFjdCkge1xuICAgICAgICAgICAgICBjYXNlIFwiYmFja1wiOlxuICAgICAgICAgICAgICAgIF9pbnB1dC52YWwodmFsLnN1YnN0cmluZygwLCB2YWwubGVuZ3RoIC0gMSkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIFwiY2xlYXJcIjpcbiAgICAgICAgICAgICAgICBfaW5wdXQudmFsKCcnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSBcInNoaWZ0XCI6XG4gICAgICAgICAgICAgICAgdG9nZ2xlU2hpZnQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgXCJjbG9zZVwiOlxuICAgICAgICAgICAgICAgIHNlbGYuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgX2lucHV0LnZhbCh2YWwgKyBhY3QpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvblN0YXRlQ2hhbmdlZC5jYWxsKHRoaXMsIGl0ZW0sIHtcbiAgICAgICAgICAgICAgc2VsZjogc2VsZixcbiAgICAgICAgICAgICAgc3RhdGU6IFwiY2hhbmdlVmFsdWVcIixcbiAgICAgICAgICAgICAgaXRlbTogaXRlbSxcbiAgICAgICAgICAgICAgdmFsdWU6IF9pbnB1dC52YWwoKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgICdudW1wYWQnOiBmdW5jdGlvbiAocXVlSWR4KSB7XG4gICAgICAgIGxldCBpdGVtID0gdGhpcy5xdWV1ZVtxdWVJZHhdLFxuICAgICAgICAgIGh0bWwgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtLmlucHV0TGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBodG1sLnB1c2goJzxkaXYgJ1xuICAgICAgICAgICAgKyAnc3R5bGU9XCJ3aWR0aDonICsgVS5jc3NOdW1iZXIoaXRlbS5jb250ZW50LndpZHRoKSArICc7ZmxvYXQ6bGVmdDtcIiAnXG4gICAgICAgICAgICArICdjbGFzcz1cImF4LXBpY2tlci1jb250ZW50LWJveFwiICdcbiAgICAgICAgICAgICsgJ2RhdGEtbnVtcGFkLXRhcmdldD1cIicgKyBpICsgJ1wiPjwvZGl2PicpO1xuICAgICAgICAgIGlmIChpIDwgaXRlbS5pbnB1dExlbmd0aCAtIDEpIGh0bWwucHVzaCgnPGRpdiBzdHlsZT1cIndpZHRoOicgKyBpdGVtLmNvbnRlbnQubWFyZ2luICsgJ3B4O2Zsb2F0OmxlZnQ7aGVpZ2h0OiA1cHg7XCI+PC9kaXY+Jyk7XG4gICAgICAgIH1cbiAgICAgICAgaHRtbC5wdXNoKCc8ZGl2IHN0eWxlPVwiY2xlYXI6Ym90aDtcIj48L2Rpdj4nKTtcbiAgICAgICAgaXRlbS5waWNrZXJDb250ZW50Lmh0bWwoaHRtbC5qb2luKCcnKSk7XG5cbiAgICAgICAgLy8gc2VjdXJlLW51bSBiaW5kXG4gICAgICAgIGl0ZW0ucGlja2VyQ29udGVudC5maW5kKCdbZGF0YS1udW1wYWQtdGFyZ2V0XScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGxldCBpZHggPSB0aGlzLmdldEF0dHJpYnV0ZShcImRhdGEtbnVtcGFkLXRhcmdldFwiKSxcbiAgICAgICAgICAgIHBvID0gW10sXG4gICAgICAgICAgICBrZXlBcnJheSA9IGl0ZW0uY29udGVudC5jb25maWcua2V5QXJyYXkgfHwgW1xuICAgICAgICAgICAgICB7dmFsdWU6IFwiN1wifSxcbiAgICAgICAgICAgICAge3ZhbHVlOiBcIjhcIn0sXG4gICAgICAgICAgICAgIHt2YWx1ZTogXCI5XCJ9LFxuICAgICAgICAgICAgICB7bGFiZWw6IFwiQlNcIiwgZm46IFwiYmFja1wifSxcbiAgICAgICAgICAgICAge3ZhbHVlOiBcIjRcIn0sXG4gICAgICAgICAgICAgIHt2YWx1ZTogXCI1XCJ9LFxuICAgICAgICAgICAgICB7dmFsdWU6IFwiNlwifSxcbiAgICAgICAgICAgICAge2xhYmVsOiBcIkNMU1wiLCBmbjogXCJjbGVhclwifSxcbiAgICAgICAgICAgICAge3ZhbHVlOiBcIjFcIn0sXG4gICAgICAgICAgICAgIHt2YWx1ZTogXCIyXCJ9LFxuICAgICAgICAgICAgICB7dmFsdWU6IFwiM1wifSxcbiAgICAgICAgICAgICAge3ZhbHVlOiBcIlwifSxcbiAgICAgICAgICAgICAge3ZhbHVlOiBcIi5cIn0sXG4gICAgICAgICAgICAgIHt2YWx1ZTogXCIwXCJ9LFxuICAgICAgICAgICAgICB7dmFsdWU6IFwiXCJ9LFxuICAgICAgICAgICAgICB7bGFiZWw6IFwiT0tcIiwgZm46IFwiZW50ZXJcIn1cbiAgICAgICAgICAgIF07XG5cbiAgICAgICAgICBrZXlBcnJheS5mb3JFYWNoKGZ1bmN0aW9uIChuKSB7XG4gICAgICAgICAgICBsZXQga2V5VmFsdWUsIGtleUxhYmVsLCBidG5XcmFwU3R5bGUsIGJ0blRoZW1lLCBidG5TdHlsZTtcblxuICAgICAgICAgICAgaWYgKG4uZm4pIHtcbiAgICAgICAgICAgICAga2V5VmFsdWUgPSBuLmZuO1xuICAgICAgICAgICAgICBrZXlMYWJlbCA9IG4ubGFiZWw7XG4gICAgICAgICAgICAgIGJ0blRoZW1lID0gaXRlbS5jb250ZW50LmNvbmZpZy5zcGVjaWFsQnRuVGhlbWU7XG4gICAgICAgICAgICAgIGJ0bldyYXBTdHlsZSA9IGl0ZW0uY29udGVudC5jb25maWcuc3BlY2lhbEJ0bldyYXBTdHlsZTtcbiAgICAgICAgICAgICAgYnRuU3R5bGUgPSBpdGVtLmNvbnRlbnQuY29uZmlnLnNwZWNpYWxCdG5TdHlsZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGtleUxhYmVsID0ga2V5VmFsdWUgPSBuLnZhbHVlO1xuICAgICAgICAgICAgICBidG5UaGVtZSA9IChrZXlWYWx1ZSkgPyBpdGVtLmNvbnRlbnQuY29uZmlnLmJ0blRoZW1lIDogXCJcIjtcbiAgICAgICAgICAgICAgYnRuV3JhcFN0eWxlID0gaXRlbS5jb250ZW50LmNvbmZpZy5idG5XcmFwU3R5bGU7XG4gICAgICAgICAgICAgIGJ0blN0eWxlID0gaXRlbS5jb250ZW50LmNvbmZpZy5idG5TdHlsZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcG8ucHVzaCgnPGRpdiBzdHlsZT1cImZsb2F0OmxlZnQ7JyArIGJ0bldyYXBTdHlsZSArICdcIj4nKTtcbiAgICAgICAgICAgIHBvLnB1c2goJzxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgYnRuLScgKyBidG5UaGVtZSArICdcIiAnXG4gICAgICAgICAgICAgICsgJ3N0eWxlPVwiJyArIGJ0blN0eWxlICsgJ1wiIGRhdGEtbnVtcGFkLXZhbHVlPVwiJyArIGtleVZhbHVlICsgJ1wiPicgKyAoa2V5TGFiZWwgfHwgXCImbmJzcDtcIikgKyAnPC9idXR0b24+Jyk7XG4gICAgICAgICAgICBwby5wdXNoKCc8L2Rpdj4nKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHBvLnB1c2goJzxkaXYgc3R5bGU9XCJjbGVhcjpib3RoO1wiPjwvZGl2PicpO1xuXG4gICAgICAgICAgJCh0aGlzKS5odG1sKHBvLmpvaW4oJycpKS5vbihcIm1vdXNlZG93blwiLCAnW2RhdGEtbnVtcGFkLXZhbHVlXScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxldCBhY3QgPSB0aGlzLmdldEF0dHJpYnV0ZShcImRhdGEtbnVtcGFkLXZhbHVlXCIpLFxuICAgICAgICAgICAgICBfaW5wdXQgPSAoaXRlbS4kdGFyZ2V0LmdldCgwKS50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT0gXCJJTlBVVFwiKSA/IGl0ZW0uJHRhcmdldCA6IGpRdWVyeShpdGVtLiR0YXJnZXQuZmluZCgnaW5wdXRbdHlwZV0nKS5nZXQoaWR4KSksXG4gICAgICAgICAgICAgIHZhbCA9IF9pbnB1dC52YWwoKSxcbiAgICAgICAgICAgICAgc3RhdGUgPSBcIlwiO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKGFjdCkge1xuICAgICAgICAgICAgICBjYXNlIFwiYmFja1wiOlxuICAgICAgICAgICAgICAgIHN0YXRlID0gXCJjaGFuZ2VWYWx1ZVwiO1xuICAgICAgICAgICAgICAgIF9pbnB1dC52YWwodmFsLnN1YnN0cmluZygwLCB2YWwubGVuZ3RoIC0gMSkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIFwiY2xlYXJcIjpcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IFwiY2hhbmdlVmFsdWVcIjtcbiAgICAgICAgICAgICAgICBfaW5wdXQudmFsKCcnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSBcImVudGVyXCI6XG4gICAgICAgICAgICAgICAgc2VsZi5jbG9zZShpdGVtLCBcImVudGVyXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSBcImNsb3NlXCI6XG4gICAgICAgICAgICAgICAgc2VsZi5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IFwiY2hhbmdlVmFsdWVcIjtcbiAgICAgICAgICAgICAgICBfaW5wdXQudmFsKHZhbCArIGFjdCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG9uU3RhdGVDaGFuZ2VkLmNhbGwodGhpcywgaXRlbSwge1xuICAgICAgICAgICAgICBzZWxmOiBzZWxmLFxuICAgICAgICAgICAgICBzdGF0ZTogc3RhdGUsXG4gICAgICAgICAgICAgIGl0ZW06IGl0ZW0sXG4gICAgICAgICAgICAgIHZhbHVlOiBfaW5wdXQudmFsKClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICAnY29sb3InOiBmdW5jdGlvbiAocXVlSWR4KSB7XG4gICAgICAgIGxldCBpdGVtID0gdGhpcy5xdWV1ZVtxdWVJZHhdLFxuICAgICAgICAgIGh0bWwgPSBbXSxcbiAgICAgICAgICBwYWxldHRlQ29uZmlnID0galF1ZXJ5LmV4dGVuZCh7fSwgdGhpcy5jb25maWcucGFsZXR0ZSksXG4gICAgICAgICAgaW5wdXQgPSAoaXRlbS4kdGFyZ2V0LmdldCgwKS50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT0gXCJJTlBVVFwiKSA/IGl0ZW0uJHRhcmdldCA6IGl0ZW0uJHRhcmdldC5maW5kKCdpbnB1dFt0eXBlXScpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbS5pbnB1dExlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaHRtbC5wdXNoKCc8ZGl2ICdcbiAgICAgICAgICAgICsgJ3N0eWxlPVwicGFkZGluZzogNXB4O3dpZHRoOicgKyBVLmNzc051bWJlcihpdGVtLmNvbnRlbnQud2lkdGgpICsgJztmbG9hdDpsZWZ0O1wiICdcbiAgICAgICAgICAgICsgJ2NsYXNzPVwiYXgtcGlja2VyLWNvbnRlbnQtYm94XCIgJ1xuICAgICAgICAgICAgKyAnZGF0YS1wYWxldHRlLXRhcmdldD1cIicgKyBpICsgJ1wiIGRhdGEtYXg1cGFsZXR0ZT1cImF4NnBpY2tlci0nICsgaXRlbS5pZCArICdcIj48L2Rpdj4nKTtcbiAgICAgICAgICBpZiAoaSA8IGl0ZW0uaW5wdXRMZW5ndGggLSAxKSBodG1sLnB1c2goJzxkaXYgc3R5bGU9XCJ3aWR0aDonICsgaXRlbS5jb250ZW50Lm1hcmdpbiArICdweDtmbG9hdDpsZWZ0O2hlaWdodDogNXB4O1wiPjwvZGl2PicpO1xuICAgICAgICB9XG4gICAgICAgIGh0bWwucHVzaCgnPGRpdiBzdHlsZT1cImNsZWFyOmJvdGg7XCI+PC9kaXY+Jyk7XG4gICAgICAgIGl0ZW0ucGlja2VyQ29udGVudC5odG1sKGh0bWwuam9pbignJykpO1xuXG4gICAgICAgIC8vIGNhbGVuZGFyIGJpbmRcbiAgICAgICAgaXRlbS5waWNrZXJQYWxldHRlID0gW107XG4gICAgICAgIGl0ZW0ucGlja2VyQ29udGVudC5maW5kKCdbZGF0YS1wYWxldHRlLXRhcmdldF0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAvLyBjYWxlbmRhckNvbmZpZyBleHRlbmQgflxuICAgICAgICAgIGxldCBpZHggPSB0aGlzLmdldEF0dHJpYnV0ZShcImRhdGEtcGFsZXR0ZS10YXJnZXRcIiksXG4gICAgICAgICAgICBkQ29sb3IgPSBpbnB1dC5nZXQoaWR4KS52YWx1ZTtcblxuICAgICAgICAgIHBhbGV0dGVDb25maWcuc2VsZWN0ZWRDb2xvciA9IGRDb2xvcjtcbiAgICAgICAgICBwYWxldHRlQ29uZmlnID0galF1ZXJ5LmV4dGVuZCh0cnVlLCBwYWxldHRlQ29uZmlnLCBpdGVtLmNvbnRlbnQuY29uZmlnIHx8IHt9KTtcbiAgICAgICAgICBwYWxldHRlQ29uZmlnLnRhcmdldCA9IHRoaXM7XG4gICAgICAgICAgcGFsZXR0ZUNvbmZpZy5vbkNsaWNrID0gZnVuY3Rpb24gKGNvbG9yKSB7XG4gICAgICAgICAgICBzZWxmLnNldENvbnRlbnRWYWx1ZShpdGVtLmlkLCBpZHgsIGNvbG9yKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHBhbGV0dGVDb25maWcub25VcGRhdGVDb2xvciA9IGZ1bmN0aW9uIChjb2xvcikge1xuICAgICAgICAgICAgc2VsZi5zZXRDb250ZW50VmFsdWUoaXRlbS5pZCwgaWR4LCBjb2xvciwge2RvTm90Q2xvc2U6IHRydWV9KTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgaXRlbS5waWNrZXJQYWxldHRlLnB1c2goe1xuICAgICAgICAgICAgaXRlbUlkOiBpdGVtLmlkLFxuICAgICAgICAgICAgaW5wdXRJbmRleDogaWR4LFxuICAgICAgICAgICAgcGFsZXR0ZTogbmV3IFBhbGV0dGUocGFsZXR0ZUNvbmZpZylcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgIH0sXG4gICAgfTtcblxuICAgIGxldCBzZWxmID0gdGhpcztcbiAgICBsZXQgcXVlSWR4ID0gKFUuaXNOdW1iZXIoYm91bmRJRCkpID8gYm91bmRJRCA6IGdldFF1ZUlkeC5jYWxsKHRoaXMsIGJvdW5kSUQpLFxuICAgICAgaXRlbSA9IHRoaXMucXVldWVbcXVlSWR4XTtcblxuICAgIC8qKlxuICAgICDri6Trpbgg7ZS87Luk6rCAIOyeiOuKlCDqsr3smrDsmYAg64uk66W4IO2UvOy7pOulvCDri6vqs6Ag64uk7IucIOyYpO2UiCDrqoXroLnsnbQg64K066Ck7KeEIOqyveyasOyXkCDrjIDtlZwg7JiI7Jm4IOyymOumrCDqtazrrLhcbiAgICAgKi9cbiAgICBpZiAodGhpcy5vcGVuVGltZXIpIGNsZWFyVGltZW91dCh0aGlzLm9wZW5UaW1lcik7XG4gICAgaWYgKHRoaXMuYWN0aXZlUGlja2VyKSB7XG4gICAgICBpZiAodGhpcy5hY3RpdmVQaWNrZXJRdWV1ZUluZGV4ID09IHF1ZUlkeCkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgaWYgKHRyeUNvdW50ID4gMikgcmV0dXJuIHRoaXM7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICB0aGlzLm9wZW5UaW1lciA9IHNldFRpbWVvdXQoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5vcGVuKHF1ZUlkeCwgKHRyeUNvdW50IHx8IDApICsgMSk7XG4gICAgICB9KS5iaW5kKHRoaXMpLCB0aGlzLmNvbmZpZy5hbmltYXRlVGltZSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB0aGlzLmFjdGl2ZVBpY2tlciA9IGpRdWVyeShtdXN0YWNoZS5yZW5kZXIodG1wbC5waWNrZXJUbXBsLmNhbGwodGhpcyksIGl0ZW0pKTtcbiAgICB0aGlzLmFjdGl2ZVBpY2tlckFycm93ID0gdGhpcy5hY3RpdmVQaWNrZXIuZmluZChcIi5heC1waWNrZXItYXJyb3dcIik7XG4gICAgdGhpcy5hY3RpdmVQaWNrZXJRdWV1ZUluZGV4ID0gcXVlSWR4O1xuICAgIGl0ZW0ucGlja2VyQ29udGVudCA9IHRoaXMuYWN0aXZlUGlja2VyLmZpbmQoJ1tkYXRhLXBpY2tlci1lbHM9XCJjb250ZW50XCJdJyk7XG5cbiAgICBpZiAoVS5pc0Z1bmN0aW9uKGl0ZW0uY29udGVudCkpIHtcbiAgICAgIC8vIO2VqOyImO2DgOyehVxuICAgICAgaXRlbS5waWNrZXJDb250ZW50Lmh0bWwoXCJMb2FkaW5nLi5cIik7XG4gICAgICBwaWNrZXJDb250ZW50W1wiQGZuXCJdLmNhbGwodGhpcywgcXVlSWR4LCBmdW5jdGlvbiAoaHRtbCkge1xuICAgICAgICBpdGVtLnBpY2tlckNvbnRlbnQuaHRtbChodG1sKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGlmIChpdGVtLmNvbnRlbnQudHlwZSBpbiBwaWNrZXJDb250ZW50KSB7XG4gICAgICAgIHBpY2tlckNvbnRlbnRbaXRlbS5jb250ZW50LnR5cGVdLmNhbGwodGhpcywgcXVlSWR4KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBiaW5kIGV2ZW50IHBpY2tlciBidG5zXG4gICAgdGhpcy5hY3RpdmVQaWNrZXIuZmluZChcIltkYXRhLXBpY2tlci1idG5dXCIpLm9uKHRoaXMuY29uZmlnLmNsaWNrRXZlbnROYW1lLCAoZnVuY3Rpb24gKGUpIHtcbiAgICAgIG9uQnRuQ2xpY2suY2FsbCh0aGlzLCBlIHx8IHdpbmRvdy5ldmVudCwgcXVlSWR4KTtcbiAgICB9KS5iaW5kKHRoaXMpKTtcblxuICAgIGFsaWduUGlja2VyLmNhbGwodGhpcywgXCJhcHBlbmRcIik7XG5cbiAgICBqUXVlcnkod2luZG93KVxuICAgICAgLm9uKFwicmVzaXplLmF4NnBpY2tlclwiLCBVLnRocm90dGxlKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGFsaWduUGlja2VyLmNhbGwodGhpcywgZSB8fCB3aW5kb3cuZXZlbnQpO1xuICAgICAgfSwgMTAwKS5iaW5kKHRoaXMpKVxuICAgICAgLm9uKFwia2V5dXAuYXg2cGlja2VyXCIsIChlKSA9PiB7XG4gICAgICAgIGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcbiAgICAgICAgb25Cb2R5S2V5dXAuY2FsbCh0aGlzLCBlKTtcbiAgICAgICAgVS5zdG9wRXZlbnQoZSk7XG4gICAgICB9KVxuICAgICAgLm9uKFwiY2xpY2suYXg2cGlja2VyXCIsIChlKSA9PiB7XG4gICAgICAgIGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcbiAgICAgICAgb25Cb2R5Q2xpY2suY2FsbCh0aGlzLCBlKTtcbiAgICAgICAgVS5zdG9wRXZlbnQoZSk7XG4gICAgICB9KTtcblxuICAgIG9uU3RhdGVDaGFuZ2VkLmNhbGwodGhpcywgaXRlbSwge1xuICAgICAgc2VsZjogdGhpcyxcbiAgICAgIHN0YXRlOiBcIm9wZW5cIixcbiAgICAgIGl0ZW06IGl0ZW1cbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQHBhcmFtIGl0ZW1cbiAgICogQHBhcmFtIHN0YXRlXG4gICAqIEByZXR1cm4ge0FYNlVJUGlja2VyfVxuICAgKi9cbiAgY2xvc2UoaXRlbSwgc3RhdGUpIHtcbiAgICBpZiAodGhpcy5jbG9zZVRpbWVyKSBjbGVhclRpbWVvdXQodGhpcy5jbG9zZVRpbWVyKTtcbiAgICBpZiAoIXRoaXMuYWN0aXZlUGlja2VyKSByZXR1cm4gdGhpcztcblxuICAgIGl0ZW0gPSB0aGlzLnF1ZXVlW3RoaXMuYWN0aXZlUGlja2VyUXVldWVJbmRleF07XG5cbiAgICB0aGlzLmFjdGl2ZVBpY2tlci5hZGRDbGFzcyhcImRlc3Ryb3lcIik7XG4gICAgalF1ZXJ5KHdpbmRvdykub2ZmKFwicmVzaXplLmF4NnBpY2tlclwiKTtcbiAgICBqUXVlcnkod2luZG93KS5vZmYoXCJjbGljay5heDZwaWNrZXJcIik7XG4gICAgalF1ZXJ5KHdpbmRvdykub2ZmKFwia2V5dXAuYXg2cGlja2VyXCIpO1xuXG4gICAgdGhpcy5jbG9zZVRpbWVyID0gc2V0VGltZW91dCgoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHRoaXMuYWN0aXZlUGlja2VyKSB0aGlzLmFjdGl2ZVBpY2tlci5yZW1vdmUoKTtcbiAgICAgIHRoaXMuYWN0aXZlUGlja2VyID0gbnVsbDtcbiAgICAgIHRoaXMuYWN0aXZlUGlja2VyUXVldWVJbmRleCA9IC0xO1xuXG4gICAgICBvblN0YXRlQ2hhbmdlZC5jYWxsKHRoaXMsIGl0ZW0sIHtcbiAgICAgICAgc2VsZjogdGhpcyxcbiAgICAgICAgc3RhdGU6IHN0YXRlIHx8IFwiY2xvc2VcIlxuICAgICAgfSk7XG5cbiAgICB9KS5iaW5kKHRoaXMpLCB0aGlzLmNvbmZpZy5hbmltYXRlVGltZSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBWDZVSVBpY2tlcjtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vc3JjL0FYNlVJUGlja2VyLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==