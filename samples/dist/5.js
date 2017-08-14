webpackJsonp([5],{

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jqmin = __webpack_require__(6);

var _jqmin2 = _interopRequireDefault(_jqmin);

var _AX6UISelect = __webpack_require__(92);

var _AX6UISelect2 = _interopRequireDefault(_AX6UISelect);

__webpack_require__(93);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var html = "\n<div class=\"row\">\n    <div class=\"input-field col s12\">\n        <div data-ax6ui-select=\"select1\" data-ax6ui-select-config='{}'>\n            <select data-ax-path=\"select1\"></select>\n        </div>\n    </div>\n</div>\n";
var fn = {
  moduleRun: function moduleRun($body) {
    var select = new _AX6UISelect2.default();
    var options = [];
    options.push({ id: "", alias: "-- 전체 --" });
    for (var i = 0; i < 20; i++) {
      options.push({ id: i, alias: "optionText" + i });
    }

    select.bind({
      target: (0, _jqmin2.default)('[data-ax6ui-select="select1"]'),
      //height: 30,
      columnKeys: {
        optionValue: 'id',
        optionText: 'alias'
      },
      options: options
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

/***/ 92:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jqmin = __webpack_require__(2);

var _jqmin2 = _interopRequireDefault(_jqmin);

var _AX6UICore2 = __webpack_require__(4);

var _AX6UICore3 = _interopRequireDefault(_AX6UICore2);

var _AX6Info = __webpack_require__(5);

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

/***/ }),

/***/ 93:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(94);
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

/***/ 94:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "@-webkit-keyframes ax-select-option-group {\n  from {\n    -webkit-transform: scale(1, 0);\n    max-height: 0;\n    opacity: 0; }\n  to {\n    -webkit-transform: scale(1, 1);\n    opacity: 1; } }\n\n@-moz-keyframes ax-select-option-group {\n  from {\n    -moz-transform: scale(1, 0);\n    max-height: 0;\n    opacity: 0; }\n  to {\n    -moz-transform: scale(1, 1);\n    opacity: 1; } }\n\n@keyframes ax-select-option-group {\n  from {\n    -webkit-transform: scale(1, 0);\n    -moz-transform: scale(1, 0);\n    -ms-transform: scale(1, 0);\n    -o-transform: scale(1, 0);\n    transform: scale(1, 0);\n    max-height: 0;\n    opacity: 0; }\n  to {\n    -webkit-transform: scale(1, 1);\n    -moz-transform: scale(1, 1);\n    -ms-transform: scale(1, 1);\n    -o-transform: scale(1, 1);\n    transform: scale(1, 1);\n    opacity: 1; } }\n\n@-webkit-keyframes ax-select-option-group-destroy {\n  from {\n    -webkit-transform: scale(1, 1);\n    opacity: 1; }\n  to {\n    -webkit-transform: scale(1, 0);\n    opacity: 0; } }\n\n@-moz-keyframes ax-select-option-group-destroy {\n  from {\n    -moz-transform: scale(1, 1);\n    opacity: 1; }\n  to {\n    -moz-transform: scale(1, 0);\n    opacity: 0; } }\n\n@keyframes ax-select-option-group-destroy {\n  from {\n    -webkit-transform: scale(1, 1);\n    -moz-transform: scale(1, 1);\n    -ms-transform: scale(1, 1);\n    -o-transform: scale(1, 1);\n    transform: scale(1, 1);\n    opacity: 1; }\n  to {\n    -webkit-transform: scale(1, 0);\n    -moz-transform: scale(1, 0);\n    -ms-transform: scale(1, 0);\n    -o-transform: scale(1, 0);\n    transform: scale(1, 0);\n    opacity: 0; } }\n\n[data-ax6ui-select] {\n  position: relative;\n  overflow: visible;\n  display: block;\n  box-sizing: border-box;\n  margin: 0; }\n  [data-ax6ui-select] *,\n  [data-ax6ui-select] *:before,\n  [data-ax6ui-select] *:after {\n    box-sizing: border-box; }\n  [data-ax6ui-select] select {\n    z-index: 1;\n    position: absolute;\n    opacity: 0;\n    user-select: none; }\n\n.ax6ui-select-display {\n  position: relative;\n  z-index: 2;\n  padding: 0;\n  display: block;\n  height: 32px;\n  font-size: 14px;\n  border-radius: 4px;\n  background-color: #fff;\n  background-image: -webkit-linear-gradient(top, #fff, #eee);\n  background-image: linear-gradient(to bottom,#fff, #eee);\n  border: 1px solid #ccc;\n  color: #444;\n  text-decoration: none;\n  box-shadow: none; }\n  .ax6ui-select-display:hover, .ax6ui-select-display:focus {\n    text-decoration: none; }\n  .ax6ui-select-display .ax6ui-select-display-table {\n    width: 100%;\n    height: 100%;\n    display: table;\n    border-collapse: collapse;\n    user-select: none; }\n    .ax6ui-select-display .ax6ui-select-display-table [data-ax6ui-select-display=\"label\"] {\n      display: table-cell;\n      vertical-align: middle;\n      padding: 0px 7px;\n      color: #444;\n      white-space: nowrap; }\n    .ax6ui-select-display .ax6ui-select-display-table [data-ax6ui-select-display=\"addon\"] {\n      display: table-cell;\n      vertical-align: middle;\n      width: 16px;\n      text-align: center; }\n      .ax6ui-select-display .ax6ui-select-display-table [data-ax6ui-select-display=\"addon\"] .addon-icon-reset {\n        display: none; }\n      .ax6ui-select-display .ax6ui-select-display-table [data-ax6ui-select-display=\"addon\"] .addon-icon-closed {\n        display: block; }\n      .ax6ui-select-display .ax6ui-select-display-table [data-ax6ui-select-display=\"addon\"] .addon-icon-opened {\n        display: none; }\n      .ax6ui-select-display .ax6ui-select-display-table [data-ax6ui-select-display=\"addon\"] .addon-icon-closed {\n        width: 16px;\n        text-align: left;\n        line-height: 6.363px; }\n        .ax6ui-select-display .ax6ui-select-display-table [data-ax6ui-select-display=\"addon\"] .addon-icon-closed .addon-icon-arrow {\n          content: '';\n          width: 0px;\n          height: 0px;\n          display: inline-block;\n          border-left: 4.5px solid transparent;\n          border-right: 4.5px solid transparent;\n          border-top: 6.363px solid #444;\n          background: transparent;\n          opacity: 1; }\n      .ax6ui-select-display .ax6ui-select-display-table [data-ax6ui-select-display=\"addon\"] .addon-icon-opened {\n        width: 16px;\n        text-align: left;\n        line-height: 6.363px; }\n        .ax6ui-select-display .ax6ui-select-display-table [data-ax6ui-select-display=\"addon\"] .addon-icon-opened .addon-icon-arrow {\n          content: '';\n          width: 0px;\n          height: 0px;\n          display: inline-block;\n          border-left: 4.5px solid transparent;\n          border-right: 4.5px solid transparent;\n          border-bottom: 6.363px solid #444;\n          background: transparent;\n          opacity: 1; }\n  .ax6ui-select-display[data-select-option-group-opened] {\n    box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.2);\n    background-image: none; }\n    .ax6ui-select-display[data-select-option-group-opened] .ax6ui-select-display-table [data-ax6ui-select-display=\"addon\"] .addon-icon-reset {\n      display: block;\n      position: absolute;\n      right: 23px;\n      top: 0px;\n      height: 100%; }\n    .ax6ui-select-display[data-select-option-group-opened] .ax6ui-select-display-table [data-ax6ui-select-display=\"addon\"] .addon-icon-closed {\n      display: none; }\n    .ax6ui-select-display[data-select-option-group-opened] .ax6ui-select-display-table [data-ax6ui-select-display=\"addon\"] .addon-icon-opened {\n      display: block; }\n  .ax6ui-select-display.default:hover:not([disabled]), .ax6ui-select-display.default:active:not([disabled]), .ax6ui-select-display.default:focus:not([disabled]), .ax6ui-select-display.default[data-select-option-group-opened]:not([disabled]) {\n    border-color: #ccc;\n    color: #555;\n    text-decoration: none; }\n    .ax6ui-select-display.default:hover:not([disabled]) .ax6select-display-table [data-ax6ui-select-display=\"addon\"] .addon-icon-closed .addon-icon-arrow, .ax6ui-select-display.default:active:not([disabled]) .ax6select-display-table [data-ax6ui-select-display=\"addon\"] .addon-icon-closed .addon-icon-arrow, .ax6ui-select-display.default:focus:not([disabled]) .ax6select-display-table [data-ax6ui-select-display=\"addon\"] .addon-icon-closed .addon-icon-arrow, .ax6ui-select-display.default[data-select-option-group-opened]:not([disabled]) .ax6select-display-table [data-ax6ui-select-display=\"addon\"] .addon-icon-closed .addon-icon-arrow {\n      border-top-color: #555; }\n    .ax6ui-select-display.default:hover:not([disabled]) .ax6select-display-table [data-ax6ui-select-display=\"addon\"] .addon-icon-opened .addon-icon-arrow, .ax6ui-select-display.default:active:not([disabled]) .ax6select-display-table [data-ax6ui-select-display=\"addon\"] .addon-icon-opened .addon-icon-arrow, .ax6ui-select-display.default:focus:not([disabled]) .ax6select-display-table [data-ax6ui-select-display=\"addon\"] .addon-icon-opened .addon-icon-arrow, .ax6ui-select-display.default[data-select-option-group-opened]:not([disabled]) .ax6select-display-table [data-ax6ui-select-display=\"addon\"] .addon-icon-opened .addon-icon-arrow {\n      border-bottom-color: #555; }\n  .ax6ui-select-display.default [disabled] {\n    user-select: none; }\n\n.ax6ui-select-option-group {\n  box-sizing: border-box;\n  z-index: 2000;\n  position: absolute;\n  left: 0;\n  top: 0;\n  border-radius: 5px;\n  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.175);\n  border: 1px solid;\n  overflow: hidden;\n  background-color: #fbfbfb;\n  background-image: -webkit-linear-gradient(bottom, #fbfbfb);\n  background-image: linear-gradient(to top,#fbfbfb);\n  -webkit-animation: ax-select-option-group 0.1s cubic-bezier(0.19, 1, 0.22, 1) forwards;\n  -moz-animation: ax-select-option-group 0.1s cubic-bezier(0.19, 1, 0.22, 1) forwards;\n  animation: ax-select-option-group 0.1s cubic-bezier(0.19, 1, 0.22, 1) forwards;\n  -webkit-transform: translateZ(0);\n  -moz-transform: translateZ(0);\n  -ms-transform: translateZ(0);\n  -o-transform: translateZ(0);\n  transform: translateZ(0);\n  -webkit-transform-origin: center top;\n  -moz-transform-origin: center top;\n  -ms-transform-origin: center top;\n  -o-transform-origin: center top;\n  transform-origin: center top; }\n  .ax6ui-select-option-group.destroy {\n    -webkit-animation: ax-select-option-group-destroy 0.1s cubic-bezier(0.95, 0.05, 0.795, 0.035) forwards;\n    -moz-animation: ax-select-option-group-destroy 0.1s cubic-bezier(0.95, 0.05, 0.795, 0.035) forwards;\n    animation: ax-select-option-group-destroy 0.1s cubic-bezier(0.95, 0.05, 0.795, 0.035) forwards; }\n  .ax6ui-select-option-group.direction-top {\n    -webkit-transform-origin: center top;\n    -moz-transform-origin: center top;\n    -ms-transform-origin: center top;\n    -o-transform-origin: center top;\n    transform-origin: center top; }\n  .ax6ui-select-option-group.direction-bottom {\n    -webkit-transform-origin: center bottom;\n    -moz-transform-origin: center bottom;\n    -ms-transform-origin: center bottom;\n    -o-transform-origin: center bottom;\n    transform-origin: center bottom; }\n  .ax6ui-select-option-group.default {\n    border-color: #ccc;\n    color: #555; }\n    .ax6ui-select-option-group.default .ax-select-body .ax-select-option-group-content .ax-select-option-item:hover, .ax6ui-select-option-group.default .ax-select-body .ax-select-option-group-content .ax-select-option-item.hover {\n      background: #a6a6a6 !important;\n      color: #222222; }\n      .ax6ui-select-option-group.default .ax-select-body .ax-select-option-group-content .ax-select-option-item:hover .ax-select-option-item-holder .ax-select-option-item-cell.ax-select-option-item-checkbox .item-checkbox-wrap.useCheckBox:after, .ax6ui-select-option-group.default .ax-select-body .ax-select-option-group-content .ax-select-option-item.hover .ax-select-option-item-holder .ax-select-option-item-cell.ax-select-option-item-checkbox .item-checkbox-wrap.useCheckBox:after {\n        border-color: #222222 !important; }\n    .ax6ui-select-option-group.default .ax-select-body .ax-select-option-group-content .ax-select-option-item[data-option-selected=\"true\"] {\n      background: #ccc;\n      color: #222222; }\n      .ax6ui-select-option-group.default .ax-select-body .ax-select-option-group-content .ax-select-option-item[data-option-selected=\"true\"] .ax-select-option-item-holder .ax-select-option-item-cell.ax-select-option-item-checkbox .item-checkbox-wrap.useCheckBox:after {\n        border-color: #222222 !important; }\n    .ax6ui-select-option-group.default .ax-select-body .ax-select-option-group-content .ax-select-option-group .ax-select-option-item-holder .ax-select-option-group-label {\n      background: #eee; }\n    .ax6ui-select-option-group.default .ax-select-body .ax-select-option-group-buttons {\n      border-top: 1px solid;\n      border-color: #ccc; }\n  .ax6ui-select-option-group .ax-select-body {\n    padding: 0px; }\n    .ax6ui-select-option-group .ax-select-body .ax-select-option-group-content {\n      max-height: 170px;\n      overflow-y: auto;\n      -webkit-overflow-scrolling: touch;\n      position: relative; }\n      .ax6ui-select-option-group .ax-select-body .ax-select-option-group-content .ax-select-option-item {\n        padding: 3px 0px;\n        text-align: left;\n        cursor: pointer;\n        font-size: 12px;\n        position: relative;\n        box-sizing: border-box;\n        overflow: hidden; }\n        .ax6ui-select-option-group .ax-select-body .ax-select-option-group-content .ax-select-option-item .ax-select-option-item-holder {\n          display: table;\n          position: relative;\n          border-collapse: separate;\n          overflow: hidden;\n          width: 100%;\n          height: 17px; }\n          .ax6ui-select-option-group .ax-select-body .ax-select-option-group-content .ax-select-option-item .ax-select-option-item-holder .ax-select-option-item-cell {\n            box-sizing: border-box;\n            display: table-cell;\n            vertical-align: middle;\n            white-space: nowrap;\n            font-size: 12px;\n            line-height: 17px;\n            padding: 0px 0px 0px 0px;\n            user-select: none; }\n            .ax6ui-select-option-group .ax-select-body .ax-select-option-group-content .ax-select-option-item .ax-select-option-item-holder .ax-select-option-item-cell.ax-select-option-item-checkbox {\n              overflow: hidden;\n              width: 12px;\n              text-align: center; }\n              .ax6ui-select-option-group .ax-select-body .ax-select-option-group-content .ax-select-option-item .ax-select-option-item-holder .ax-select-option-item-cell.ax-select-option-item-checkbox .item-checkbox-wrap {\n                position: relative;\n                display: block;\n                width: 12px;\n                height: 17px; }\n                .ax6ui-select-option-group .ax-select-body .ax-select-option-group-content .ax-select-option-item .ax-select-option-item-holder .ax-select-option-item-cell.ax-select-option-item-checkbox .item-checkbox-wrap.useCheckBox:after {\n                  content: '';\n                  width: 8px;\n                  height: 4px;\n                  position: absolute;\n                  top: 4.25px;\n                  right: 0px;\n                  border: 2px solid #000;\n                  border-top: none;\n                  border-right: none;\n                  background: transparent;\n                  opacity: 0.1;\n                  -webkit-transform: rotate(-50deg);\n                  -moz-transform: rotate(-50deg);\n                  -ms-transform: rotate(-50deg);\n                  -o-transform: rotate(-50deg);\n                  transform: rotate(-50deg); }\n            .ax6ui-select-option-group .ax-select-body .ax-select-option-group-content .ax-select-option-item .ax-select-option-item-holder .ax-select-option-item-cell.ax-select-option-item-label {\n              padding: 0px 7px;\n              padding-right: 8px; }\n        .ax6ui-select-option-group .ax-select-body .ax-select-option-group-content .ax-select-option-item[data-option-selected=\"true\"] .ax-select-option-item-holder .ax-select-option-item-cell.ax-select-option-item-checkbox .item-checkbox-wrap.useCheckBox:after {\n          opacity: 1; }\n      .ax6ui-select-option-group .ax-select-body .ax-select-option-group-content .ax-select-option-group .ax-select-option-item-holder {\n        display: table;\n        position: relative;\n        border-collapse: separate;\n        overflow: hidden;\n        width: 100%;\n        height: 17px; }\n        .ax6ui-select-option-group .ax-select-body .ax-select-option-group-content .ax-select-option-group .ax-select-option-item-holder .ax-select-option-group-label {\n          box-sizing: border-box;\n          display: table-cell;\n          vertical-align: middle;\n          white-space: nowrap;\n          font-size: 12px;\n          line-height: 17px;\n          padding: 5px 10px;\n          user-select: none; }\n    .ax6ui-select-option-group .ax-select-body .ax-select-option-group-buttons {\n      text-align: center;\n      padding: 3px 0px; }\n", ""]);

// exports


/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2VsZWN0LmpzIiwid2VicGFjazovLy8uLi9zcmMvQVg2TXVzdGFjaGUuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9BWDZVSVNlbGVjdC5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL0FYNlVJU2VsZWN0L3N0eWxlLnNjc3M/ZmQ0YyIsIndlYnBhY2s6Ly8vLi4vc3JjL0FYNlVJU2VsZWN0L3N0eWxlLnNjc3MiXSwibmFtZXMiOlsiaHRtbCIsImZuIiwibW9kdWxlUnVuIiwiJGJvZHkiLCJzZWxlY3QiLCJvcHRpb25zIiwicHVzaCIsImlkIiwiYWxpYXMiLCJpIiwiYmluZCIsInRhcmdldCIsImNvbHVtbktleXMiLCJvcHRpb25WYWx1ZSIsIm9wdGlvblRleHQiLCJtb2R1bGVEZXN0cm95Iiwib2ZmIiwiQVg2IiwiZGVmaW5lTXVzdGFjaGUiLCJnbG9iYWwiLCJmYWN0b3J5IiwibXVzdGFjaGUiLCJtdXN0YWNoZUZhY3RvcnkiLCJvYmplY3RUb1N0cmluZyIsIk9iamVjdCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwiaXNBcnJheSIsIkFycmF5IiwiaXNBcnJheVBvbHlmaWxsIiwib2JqZWN0IiwiY2FsbCIsImlzRnVuY3Rpb24iLCJ0eXBlU3RyIiwib2JqIiwiZXNjYXBlUmVnRXhwIiwic3RyaW5nIiwicmVwbGFjZSIsImhhc1Byb3BlcnR5IiwicHJvcE5hbWUiLCJyZWdFeHBUZXN0IiwiUmVnRXhwIiwidGVzdCIsInRlc3RSZWdFeHAiLCJyZSIsIm5vblNwYWNlUmUiLCJpc1doaXRlc3BhY2UiLCJlbnRpdHlNYXAiLCJlc2NhcGVIdG1sIiwiU3RyaW5nIiwiZnJvbUVudGl0eU1hcCIsInMiLCJ3aGl0ZVJlIiwic3BhY2VSZSIsImVxdWFsc1JlIiwiY3VybHlSZSIsInRhZ1JlIiwicGFyc2VUZW1wbGF0ZSIsInRlbXBsYXRlIiwidGFncyIsInNlY3Rpb25zIiwidG9rZW5zIiwic3BhY2VzIiwiaGFzVGFnIiwibm9uU3BhY2UiLCJzdHJpcFNwYWNlIiwibGVuZ3RoIiwicG9wIiwib3BlbmluZ1RhZ1JlIiwiY2xvc2luZ1RhZ1JlIiwiY2xvc2luZ0N1cmx5UmUiLCJjb21waWxlVGFncyIsInRhZ3NUb0NvbXBpbGUiLCJzcGxpdCIsIkVycm9yIiwic2Nhbm5lciIsIlNjYW5uZXIiLCJzdGFydCIsInR5cGUiLCJ2YWx1ZSIsImNociIsInRva2VuIiwib3BlblNlY3Rpb24iLCJlb3MiLCJwb3MiLCJzY2FuVW50aWwiLCJ2YWx1ZUxlbmd0aCIsImNoYXJBdCIsInNjYW4iLCJuZXN0VG9rZW5zIiwic3F1YXNoVG9rZW5zIiwic3F1YXNoZWRUb2tlbnMiLCJsYXN0VG9rZW4iLCJudW1Ub2tlbnMiLCJuZXN0ZWRUb2tlbnMiLCJjb2xsZWN0b3IiLCJzZWN0aW9uIiwidGFpbCIsIm1hdGNoIiwiaW5kZXgiLCJzdWJzdHJpbmciLCJzZWFyY2giLCJDb250ZXh0IiwidmlldyIsInBhcmVudENvbnRleHQiLCJjYWNoZSIsInJldHVybnMiLCJrIiwicGFyZW50IiwibG9va3VwIiwibmFtZSIsImhhc093blByb3BlcnR5IiwiY29udGV4dCIsIm5hbWVzIiwibG9va3VwSGl0IiwiaW5kZXhPZiIsIldyaXRlciIsImNsZWFyQ2FjaGUiLCJwYXJzZSIsInJlbmRlciIsInBhcnRpYWxzIiwicmVuZGVyVG9rZW5zIiwib3JpZ2luYWxUZW1wbGF0ZSIsImJ1ZmZlciIsInN5bWJvbCIsInVuZGVmaW5lZCIsInJlbmRlclNlY3Rpb24iLCJyZW5kZXJJbnZlcnRlZCIsInJlbmRlclBhcnRpYWwiLCJ1bmVzY2FwZWRWYWx1ZSIsImVzY2FwZWRWYWx1ZSIsInJhd1ZhbHVlIiwic2VsZiIsInN1YlJlbmRlciIsImoiLCJzbGljZSIsImVzY2FwZSIsInZlcnNpb24iLCJkZWZhdWx0V3JpdGVyIiwiVHlwZUVycm9yIiwidG9faHRtbCIsInNlbmQiLCJyZXN1bHQiLCJjdHJsS2V5cyIsInRtcGwiLCJvcHRpb25TZWxlY3RlZCIsIiR3aW5kb3ciLCJ3aW5kb3ciLCJvblN0YXRlQ2hhbmdlZCIsIml0ZW0iLCJ0aGF0Iiwic3RhdGUiLCJvbkNoYW5nZSIsImFsaWduU2VsZWN0RGlzcGxheSIsInF1ZXVlIiwidyIsIiRkaXNwbGF5IiwiTWF0aCIsIm1heCIsIiRzZWxlY3QiLCJvdXRlcldpZHRoIiwibnVtYmVyIiwibWluV2lkdGgiLCJjc3MiLCJyZXNldCIsImZpbmQiLCJoZWlnaHQiLCJhbGlnblNlbGVjdE9wdGlvbkdyb3VwIiwiYXBwZW5kIiwiYWN0aXZlU2VsZWN0T3B0aW9uR3JvdXAiLCJhY3RpdmVTZWxlY3RRdWV1ZUluZGV4IiwicG9zaXRpb25NYXJnaW4iLCJkaW0iLCJwaWNrZXJEaW0iLCJwaWNrZXJEaXJlY3Rpb24iLCJkb2N1bWVudCIsImJvZHkiLCIkdGFyZ2V0Iiwib2Zmc2V0Iiwid2lkdGgiLCJvdXRlckhlaWdodCIsIndpbldpZHRoIiwid2luSGVpZ2h0IiwiZGlyZWN0aW9uIiwidG9wIiwiYWRkQ2xhc3MiLCJuZXdUb3AiLCJsZWZ0Iiwib25Cb2R5Q2xpY2siLCJlIiwiY2xpY2tFbCIsImZpbmRQYXJlbnROb2RlIiwiZ2V0QXR0cmlidXRlIiwiZ2V0IiwiY2xvc2UiLCJ2YWwiLCJnaW5kZXgiLCJ0cmlnZ2VyIiwiZm9jdXMiLCJtdWx0aXBsZSIsIm9uQm9keUtleXVwIiwia2V5Q29kZSIsImV2ZW50S2V5cyIsIkVTQyIsIndoaWNoIiwiUkVUVVJOIiwib3B0aW9uRm9jdXNJbmRleCIsIiRvcHRpb24iLCJhdHRyIiwiZ2V0TGFiZWwiLCJxdWVJZHgiLCJsYWJlbHMiLCJzZWxlY3RlZCIsImZvckVhY2giLCJuIiwib3B0Z3JvdXAiLCJsYW5nIiwibm9TZWxlY3RlZCIsImRhdGEiLCJsYWJlbCIsIm11bHRpcGxlTGFiZWwiLCJzeW5jTGFiZWwiLCIkZGlzcGxheUxhYmVsIiwiZm9jdXNXb3JkIiwic2VhcmNoV29yZCIsImwiLCJpbmRleGVkT3B0aW9ucyIsInRvTG93ZXJDYXNlIiwib3B0aW9uc1NvcnQiLCJzb3J0IiwiYSIsImIiLCJmb2N1c01vdmUiLCJmaW5kZXgiLCJfZm9jdXNJbmRleCIsIl9wcmV2Rm9jdXNJbmRleCIsImZvY3VzT3B0aW9uRWwiLCJvcHRpb25Hcm91cFNjcm9sbENvbnRhaW5lciIsIm9wdGlvblNlbGVjdGVkSW5kZXgiLCJvcHRpb25JdGVtTGVuZ3RoIiwicmVtb3ZlQ2xhc3MiLCJmb2N1c09wdGlvbkVsSGVpZ2h0Iiwib3B0aW9uR3JvdXBTY3JvbGxDb250YWluZXJIZWlnaHQiLCJpbm5lckhlaWdodCIsIm9wdGlvbkdyb3VwU2Nyb2xsQ29udGFpbmVyU2Nyb2xsVG9wIiwic2Nyb2xsVG9wIiwiZm9jdXNPcHRpb25FbFRvcCIsInBvc2l0aW9uIiwiYmluZFNlbGVjdFRhcmdldCIsInNlbGVjdEV2ZW50IiwiY2xlYXIiLCJvcGVuIiwic3RvcEV2ZW50IiwiU1BBQ0UiLCJjbGljayIsImRlYm91bmNlIiwiJGRpc3BsYXlJbnB1dCIsIkRPV04iLCJVUCIsImNvbmZpZyIsImV4dGVuZCIsImluc3RhbmNlSWQiLCJ0aGVtZSIsInRhYkluZGV4IiwiZGlzcGxheSIsInN5bmNTZWxlY3RPcHRpb25zIiwib24iLCJibHVyIiwia2V5VXAiLCJrZXlEb3duIiwic2VsZWN0Q2hhbmdlIiwic2V0U2VsZWN0ZWQiLCJPIiwicG8iLCJlbGVtZW50T3B0aW9ucyIsIm5ld09wdGlvbnMiLCJmb2N1c0luZGV4IiwiT0luZGV4IiwiT08iLCJPT0luZGV4IiwidGV4dCIsImpvaW4iLCJ0b0FycmF5Iiwib3B0aW9uIiwiZ2V0UXVlSWR4IiwiYm91bmRJRCIsImlzU3RyaW5nIiwiY29uc29sZSIsImxvZyIsImdldEVycm9yIiwiQVg2VUlTZWxlY3QiLCJhbmltYXRlVGltZSIsIm5vT3B0aW9ucyIsImxvYWRpbmciLCJvcGVuVGltZXIiLCJjbG9zZVRpbWVyIiwid2FpdE9wdGlvbnNDYWxsYmFjayIsImtleVVwVGltZXIiLCJ4dmFyIiwiaW5pdCIsImluaXRPbmNlIiwiaW5pdGlhbGl6ZWQiLCJ0aHJvdHRsZSIsImV2ZW50IiwiZ2V0SW5zdGFuY2VJZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJpc09iamVjdCIsImVycm9yIiwicGFyc2VKc29uIiwidHJ5Q291bnQiLCJvbkV4cGFuZCIsIm9wdGlvbnNNYXAiLCJfTyIsIl9PSW5kZXgiLCJpc051bWJlciIsImZvY3VzVG9wIiwic2VsZWN0ZWRPcHRpb25FbCIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJ3YWl0T3B0aW9ucyIsIm9wdGlvbkdyb3VwIiwiX2l0ZW0iLCJpbnRlcm5hbCIsImdldFNlbGVjdGVkIiwibyIsImNsZWFyU2VsZWN0ZWQiLCJubiIsInByb2Nlc3NvciIsInZhbHVlcyIsImtleSIsIm9wdGlvbkluZGV4IiwiYXJyIiwicmVtb3ZlQXR0ciIsInJlbW92ZSIsIm9uQ2xvc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBLElBQUlBLGdQQUFKO0FBU0EsSUFBSUMsS0FBSztBQUNQQyxhQUFXLG1CQUFVQyxLQUFWLEVBQWlCO0FBQzFCLFFBQUlDLFNBQVMsMkJBQWI7QUFDQSxRQUFJQyxVQUFVLEVBQWQ7QUFDQUEsWUFBUUMsSUFBUixDQUFhLEVBQUNDLElBQUksRUFBTCxFQUFTQyxPQUFPLFVBQWhCLEVBQWI7QUFDQSxTQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSSxFQUFwQixFQUF3QkEsR0FBeEIsRUFBNkI7QUFDM0JKLGNBQVFDLElBQVIsQ0FBYSxFQUFDQyxJQUFJRSxDQUFMLEVBQVFELE9BQU8sZUFBZUMsQ0FBOUIsRUFBYjtBQUNEOztBQUVETCxXQUFPTSxJQUFQLENBQVk7QUFDVkMsY0FBUSxxQkFBRSwrQkFBRixDQURFO0FBRVY7QUFDQUMsa0JBQVk7QUFDVkMscUJBQWEsSUFESDtBQUVWQyxvQkFBWTtBQUZGLE9BSEY7QUFPVlQsZUFBU0E7QUFQQyxLQUFaO0FBU0QsR0FsQk07QUFtQlBVLGlCQUFlLHVCQUFVWixLQUFWLEVBQWlCO0FBQzlCQSxVQUFNYSxHQUFOLENBQVUsT0FBVjtBQUNEO0FBckJNLENBQVQ7O2tC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dCBTZWxlY3QgZnJvbSBcIi4uLy4uL3NyYy9BWDZVSVNlbGVjdFwiO1xuaW1wb3J0IFwiLi4vLi4vc3JjL0FYNlVJU2VsZWN0L3N0eWxlLnNjc3NcIjtcblxubGV0IGh0bWwgPSBgXG48ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkIGNvbCBzMTJcIj5cbiAgICAgICAgPGRpdiBkYXRhLWF4NnVpLXNlbGVjdD1cInNlbGVjdDFcIiBkYXRhLWF4NnVpLXNlbGVjdC1jb25maWc9J3t9Jz5cbiAgICAgICAgICAgIDxzZWxlY3QgZGF0YS1heC1wYXRoPVwic2VsZWN0MVwiPjwvc2VsZWN0PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuYDtcbmxldCBmbiA9IHtcbiAgbW9kdWxlUnVuOiBmdW5jdGlvbiAoJGJvZHkpIHtcbiAgICBsZXQgc2VsZWN0ID0gbmV3IFNlbGVjdCgpO1xuICAgIGxldCBvcHRpb25zID0gW107XG4gICAgb3B0aW9ucy5wdXNoKHtpZDogXCJcIiwgYWxpYXM6IFwiLS0g7KCE7LK0IC0tXCJ9KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDIwOyBpKyspIHtcbiAgICAgIG9wdGlvbnMucHVzaCh7aWQ6IGksIGFsaWFzOiBcIm9wdGlvblRleHRcIiArIGl9KTtcbiAgICB9XG5cbiAgICBzZWxlY3QuYmluZCh7XG4gICAgICB0YXJnZXQ6ICQoJ1tkYXRhLWF4NnVpLXNlbGVjdD1cInNlbGVjdDFcIl0nKSxcbiAgICAgIC8vaGVpZ2h0OiAzMCxcbiAgICAgIGNvbHVtbktleXM6IHtcbiAgICAgICAgb3B0aW9uVmFsdWU6ICdpZCcsXG4gICAgICAgIG9wdGlvblRleHQ6ICdhbGlhcydcbiAgICAgIH0sXG4gICAgICBvcHRpb25zOiBvcHRpb25zXG4gICAgfSk7XG4gIH0sXG4gIG1vZHVsZURlc3Ryb3k6IGZ1bmN0aW9uICgkYm9keSkge1xuICAgICRib2R5Lm9mZihcImNsaWNrXCIpO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGh0bWw6IGh0bWwsXG4gIGZuOiBmblxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zZWxlY3QuanMiLCIvKiFcbiAqIG11c3RhY2hlLmpzIC0gTG9naWMtbGVzcyB7e211c3RhY2hlfX0gdGVtcGxhdGVzIHdpdGggSmF2YVNjcmlwdFxuICogaHR0cDovL2dpdGh1Yi5jb20vamFubC9tdXN0YWNoZS5qc1xuICogaHR0cHM6Ly9naXRodWIuY29tL3Rob21hc0phbmcvbXVzdGFjaGUuanMgLS0gaW1wb3JvdmUgc29tZSB2YXJpYWJsZXNcbiAqL1xuXG5cbi8qKlxuICogQVg2TXVzdGFjaGXripQgaHR0cDovL2dpdGh1Yi5jb20vamFubC9tdXN0YWNoZS5qc+yXkCDrqofqsIDsp4Ag7LWc7IaM7ZWc7J2YIOq4sOuKpeydhCDtipzri53tlZjsl6wg7IKs7Jqp7ZWY64qUIO2FnO2UjOumvyDsl5Tsp4TsnoXri4jri6QuXG4gKiBAbmFtZXNwYWNlIEFYNk11c3RhY2hlXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIEFYNk11c3RhY2hlLnJlbmRlclxuICogQGV4YW1wbGVcbiAqIGBgYGpzXG4gKiBheDUubXVzdGFjaGUucmVuZGVyKHRlbXBsYXRlLCB2aWV3KVxuICpcbiAqXG4gKiAvL0FycmF5IEBpXG4gKiAvL3t7I2JlYXRsZXN9fVxuICogLy97e2ZpcnN0TmFtZX19IHt7bGFzdE5hbWV9fSAoe3tAaX19KSAoe3tAZmlyc3R9fSlcbiAqIC8ve3svYmVhdGxlc319XG4gKlxuICogLy9PYmplY3QgQGVhY2hcbiAqIHt7I2JlYXRsZXN9fVxuICogIHt7I0BlYWNofX1cbiAqICAgICAge3tAa2V5fX0gOiB7e0B2YWx1ZS5maXJzdE5hbWV9fSB7e0B2YWx1ZS5sYXN0TmFtZX19XG4gKiAge3svQGVhY2h9fVxuICoge3svYmVhdGxlc319XG4gKlxuICogYGBgXG4gKi9cblxuXG5cbmxldCBBWDYgPSB7fTtcblxuKGZ1bmN0aW9uIGRlZmluZU11c3RhY2hlKGdsb2JhbCwgZmFjdG9yeSkge1xuXG4gIGZhY3RvcnkoZ2xvYmFsLm11c3RhY2hlID0ge30pO1xuXG59KEFYNiwgZnVuY3Rpb24gbXVzdGFjaGVGYWN0b3J5KG11c3RhY2hlKSB7XG5cbiAgdmFyIG9iamVjdFRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbiAgdmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIGlzQXJyYXlQb2x5ZmlsbChvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0VG9TdHJpbmcuY2FsbChvYmplY3QpID09PSAnW29iamVjdCBBcnJheV0nO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGlzRnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmplY3QgPT09ICdmdW5jdGlvbic7XG4gIH1cblxuICAvKipcbiAgICogTW9yZSBjb3JyZWN0IHR5cGVvZiBzdHJpbmcgaGFuZGxpbmcgYXJyYXlcbiAgICogd2hpY2ggbm9ybWFsbHkgcmV0dXJucyB0eXBlb2YgJ29iamVjdCdcbiAgICovXG4gIGZ1bmN0aW9uIHR5cGVTdHIob2JqKSB7XG4gICAgcmV0dXJuIGlzQXJyYXkob2JqKSA/ICdhcnJheScgOiB0eXBlb2Ygb2JqO1xuICB9XG5cbiAgZnVuY3Rpb24gZXNjYXBlUmVnRXhwKHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvW1xcLVxcW1xcXXt9KCkqKz8uLFxcXFxcXF4kfCNcXHNdL2csICdcXFxcJCYnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOdWxsIHNhZmUgd2F5IG9mIGNoZWNraW5nIHdoZXRoZXIgb3Igbm90IGFuIG9iamVjdCxcbiAgICogaW5jbHVkaW5nIGl0cyBwcm90b3R5cGUsIGhhcyBhIGdpdmVuIHByb3BlcnR5XG4gICAqL1xuICBmdW5jdGlvbiBoYXNQcm9wZXJ0eShvYmosIHByb3BOYW1lKSB7XG4gICAgcmV0dXJuIG9iaiAhPSBudWxsICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIChwcm9wTmFtZSBpbiBvYmopO1xuICB9XG5cbiAgLy8gV29ya2Fyb3VuZCBmb3IgaHR0cHM6Ly9pc3N1ZXMuYXBhY2hlLm9yZy9qaXJhL2Jyb3dzZS9DT1VDSERCLTU3N1xuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2phbmwvbXVzdGFjaGUuanMvaXNzdWVzLzE4OVxuICB2YXIgcmVnRXhwVGVzdCA9IFJlZ0V4cC5wcm90b3R5cGUudGVzdDtcblxuICBmdW5jdGlvbiB0ZXN0UmVnRXhwKHJlLCBzdHJpbmcpIHtcbiAgICByZXR1cm4gcmVnRXhwVGVzdC5jYWxsKHJlLCBzdHJpbmcpO1xuICB9XG5cbiAgdmFyIG5vblNwYWNlUmUgPSAvXFxTLztcblxuICBmdW5jdGlvbiBpc1doaXRlc3BhY2Uoc3RyaW5nKSB7XG4gICAgcmV0dXJuICF0ZXN0UmVnRXhwKG5vblNwYWNlUmUsIHN0cmluZyk7XG4gIH1cblxuICB2YXIgZW50aXR5TWFwID0ge1xuICAgICcmJzogJyZhbXA7JywgJzwnOiAnJmx0OycsICc+JzogJyZndDsnLCAnXCInOiAnJnF1b3Q7JywgXCInXCI6ICcmIzM5OycsICcvJzogJyYjeDJGOydcbiAgfTtcblxuICBmdW5jdGlvbiBlc2NhcGVIdG1sKHN0cmluZykge1xuICAgIHJldHVybiBTdHJpbmcoc3RyaW5nKS5yZXBsYWNlKC9bJjw+XCInXFwvXS9nLCBmdW5jdGlvbiBmcm9tRW50aXR5TWFwKHMpIHtcbiAgICAgIHJldHVybiBlbnRpdHlNYXBbc107XG4gICAgfSk7XG4gIH1cblxuICB2YXIgd2hpdGVSZSA9IC9cXHMqLztcbiAgdmFyIHNwYWNlUmUgPSAvXFxzKy87XG4gIHZhciBlcXVhbHNSZSA9IC9cXHMqPS87XG4gIHZhciBjdXJseVJlID0gL1xccypcXH0vO1xuICB2YXIgdGFnUmUgPSAvI3xcXF58XFwvfD58XFx7fCZ8PXwhLztcblxuICAvKipcbiAgICogQnJlYWtzIHVwIHRoZSBnaXZlbiBgdGVtcGxhdGVgIHN0cmluZyBpbnRvIGEgdHJlZSBvZiB0b2tlbnMuIElmIHRoZSBgdGFnc2BcbiAgICogYXJndW1lbnQgaXMgZ2l2ZW4gaGVyZSBpdCBtdXN0IGJlIGFuIGFycmF5IHdpdGggdHdvIHN0cmluZyB2YWx1ZXM6IHRoZVxuICAgKiBvcGVuaW5nIGFuZCBjbG9zaW5nIHRhZ3MgdXNlZCBpbiB0aGUgdGVtcGxhdGUgKGUuZy4gWyBcIjwlXCIsIFwiJT5cIiBdKS4gT2ZcbiAgICogY291cnNlLCB0aGUgZGVmYXVsdCBpcyB0byB1c2UgbXVzdGFjaGVzIChpLmUuIG11c3RhY2hlLnRhZ3MpLlxuICAgKlxuICAgKiBBIHRva2VuIGlzIGFuIGFycmF5IHdpdGggYXQgbGVhc3QgNCBlbGVtZW50cy4gVGhlIGZpcnN0IGVsZW1lbnQgaXMgdGhlXG4gICAqIG11c3RhY2hlIHN5bWJvbCB0aGF0IHdhcyB1c2VkIGluc2lkZSB0aGUgdGFnLCBlLmcuIFwiI1wiIG9yIFwiJlwiLiBJZiB0aGUgdGFnXG4gICAqIGRpZCBub3QgY29udGFpbiBhIHN5bWJvbCAoaS5lLiB7e215VmFsdWV9fSkgdGhpcyBlbGVtZW50IGlzIFwibmFtZVwiLiBGb3JcbiAgICogYWxsIHRleHQgdGhhdCBhcHBlYXJzIG91dHNpZGUgYSBzeW1ib2wgdGhpcyBlbGVtZW50IGlzIFwidGV4dFwiLlxuICAgKlxuICAgKiBUaGUgc2Vjb25kIGVsZW1lbnQgb2YgYSB0b2tlbiBpcyBpdHMgXCJ2YWx1ZVwiLiBGb3IgbXVzdGFjaGUgdGFncyB0aGlzIGlzXG4gICAqIHdoYXRldmVyIGVsc2Ugd2FzIGluc2lkZSB0aGUgdGFnIGJlc2lkZXMgdGhlIG9wZW5pbmcgc3ltYm9sLiBGb3IgdGV4dCB0b2tlbnNcbiAgICogdGhpcyBpcyB0aGUgdGV4dCBpdHNlbGYuXG4gICAqXG4gICAqIFRoZSB0aGlyZCBhbmQgZm91cnRoIGVsZW1lbnRzIG9mIHRoZSB0b2tlbiBhcmUgdGhlIHN0YXJ0IGFuZCBlbmQgaW5kaWNlcyxcbiAgICogcmVzcGVjdGl2ZWx5LCBvZiB0aGUgdG9rZW4gaW4gdGhlIG9yaWdpbmFsIHRlbXBsYXRlLlxuICAgKlxuICAgKiBUb2tlbnMgdGhhdCBhcmUgdGhlIHJvb3Qgbm9kZSBvZiBhIHN1YnRyZWUgY29udGFpbiB0d28gbW9yZSBlbGVtZW50czogMSkgYW5cbiAgICogYXJyYXkgb2YgdG9rZW5zIGluIHRoZSBzdWJ0cmVlIGFuZCAyKSB0aGUgaW5kZXggaW4gdGhlIG9yaWdpbmFsIHRlbXBsYXRlIGF0XG4gICAqIHdoaWNoIHRoZSBjbG9zaW5nIHRhZyBmb3IgdGhhdCBzZWN0aW9uIGJlZ2lucy5cbiAgICovXG4gIGZ1bmN0aW9uIHBhcnNlVGVtcGxhdGUodGVtcGxhdGUsIHRhZ3MpIHtcbiAgICBpZiAoIXRlbXBsYXRlKVxuICAgICAgcmV0dXJuIFtdO1xuXG4gICAgdmFyIHNlY3Rpb25zID0gW107ICAgICAvLyBTdGFjayB0byBob2xkIHNlY3Rpb24gdG9rZW5zXG4gICAgdmFyIHRva2VucyA9IFtdOyAgICAgICAvLyBCdWZmZXIgdG8gaG9sZCB0aGUgdG9rZW5zXG4gICAgdmFyIHNwYWNlcyA9IFtdOyAgICAgICAvLyBJbmRpY2VzIG9mIHdoaXRlc3BhY2UgdG9rZW5zIG9uIHRoZSBjdXJyZW50IGxpbmVcbiAgICB2YXIgaGFzVGFnID0gZmFsc2U7ICAgIC8vIElzIHRoZXJlIGEge3t0YWd9fSBvbiB0aGUgY3VycmVudCBsaW5lP1xuICAgIHZhciBub25TcGFjZSA9IGZhbHNlOyAgLy8gSXMgdGhlcmUgYSBub24tc3BhY2UgY2hhciBvbiB0aGUgY3VycmVudCBsaW5lP1xuXG4gICAgLy8gU3RyaXBzIGFsbCB3aGl0ZXNwYWNlIHRva2VucyBhcnJheSBmb3IgdGhlIGN1cnJlbnQgbGluZVxuICAgIC8vIGlmIHRoZXJlIHdhcyBhIHt7I3RhZ319IG9uIGl0IGFuZCBvdGhlcndpc2Ugb25seSBzcGFjZS5cbiAgICBmdW5jdGlvbiBzdHJpcFNwYWNlKCkge1xuICAgICAgaWYgKGhhc1RhZyAmJiAhbm9uU3BhY2UpIHtcbiAgICAgICAgd2hpbGUgKHNwYWNlcy5sZW5ndGgpXG4gICAgICAgICAgZGVsZXRlIHRva2Vuc1tzcGFjZXMucG9wKCldO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHNwYWNlcyA9IFtdO1xuICAgICAgfVxuXG4gICAgICBoYXNUYWcgPSBmYWxzZTtcbiAgICAgIG5vblNwYWNlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIG9wZW5pbmdUYWdSZSwgY2xvc2luZ1RhZ1JlLCBjbG9zaW5nQ3VybHlSZTtcblxuICAgIGZ1bmN0aW9uIGNvbXBpbGVUYWdzKHRhZ3NUb0NvbXBpbGUpIHtcbiAgICAgIGlmICh0eXBlb2YgdGFnc1RvQ29tcGlsZSA9PT0gJ3N0cmluZycpXG4gICAgICAgIHRhZ3NUb0NvbXBpbGUgPSB0YWdzVG9Db21waWxlLnNwbGl0KHNwYWNlUmUsIDIpO1xuXG4gICAgICBpZiAoIWlzQXJyYXkodGFnc1RvQ29tcGlsZSkgfHwgdGFnc1RvQ29tcGlsZS5sZW5ndGggIT09IDIpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCB0YWdzOiAnICsgdGFnc1RvQ29tcGlsZSk7XG5cbiAgICAgIG9wZW5pbmdUYWdSZSA9IG5ldyBSZWdFeHAoZXNjYXBlUmVnRXhwKHRhZ3NUb0NvbXBpbGVbMF0pICsgJ1xcXFxzKicpO1xuICAgICAgY2xvc2luZ1RhZ1JlID0gbmV3IFJlZ0V4cCgnXFxcXHMqJyArIGVzY2FwZVJlZ0V4cCh0YWdzVG9Db21waWxlWzFdKSk7XG4gICAgICBjbG9zaW5nQ3VybHlSZSA9IG5ldyBSZWdFeHAoJ1xcXFxzKicgKyBlc2NhcGVSZWdFeHAoJ30nICsgdGFnc1RvQ29tcGlsZVsxXSkpO1xuICAgIH1cblxuICAgIGNvbXBpbGVUYWdzKHRhZ3MgfHwgbXVzdGFjaGUudGFncyk7XG5cbiAgICB2YXIgc2Nhbm5lciA9IG5ldyBTY2FubmVyKHRlbXBsYXRlKTtcblxuICAgIHZhciBzdGFydCwgdHlwZSwgdmFsdWUsIGNociwgdG9rZW4sIG9wZW5TZWN0aW9uO1xuICAgIHdoaWxlICghc2Nhbm5lci5lb3MoKSkge1xuICAgICAgc3RhcnQgPSBzY2FubmVyLnBvcztcblxuICAgICAgLy8gTWF0Y2ggYW55IHRleHQgYmV0d2VlbiB0YWdzLlxuICAgICAgdmFsdWUgPSBzY2FubmVyLnNjYW5VbnRpbChvcGVuaW5nVGFnUmUpO1xuXG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHZhbHVlTGVuZ3RoID0gdmFsdWUubGVuZ3RoOyBpIDwgdmFsdWVMZW5ndGg7ICsraSkge1xuICAgICAgICAgIGNociA9IHZhbHVlLmNoYXJBdChpKTtcblxuICAgICAgICAgIGlmIChpc1doaXRlc3BhY2UoY2hyKSkge1xuICAgICAgICAgICAgc3BhY2VzLnB1c2godG9rZW5zLmxlbmd0aCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbm9uU3BhY2UgPSB0cnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRva2Vucy5wdXNoKFsndGV4dCcsIGNociwgc3RhcnQsIHN0YXJ0ICsgMV0pO1xuICAgICAgICAgIHN0YXJ0ICs9IDE7XG5cbiAgICAgICAgICAvLyBDaGVjayBmb3Igd2hpdGVzcGFjZSBvbiB0aGUgY3VycmVudCBsaW5lLlxuICAgICAgICAgIGlmIChjaHIgPT09ICdcXG4nKVxuICAgICAgICAgICAgc3RyaXBTcGFjZSgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIE1hdGNoIHRoZSBvcGVuaW5nIHRhZy5cbiAgICAgIGlmICghc2Nhbm5lci5zY2FuKG9wZW5pbmdUYWdSZSkpXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBoYXNUYWcgPSB0cnVlO1xuXG4gICAgICAvLyBHZXQgdGhlIHRhZyB0eXBlLlxuICAgICAgdHlwZSA9IHNjYW5uZXIuc2Nhbih0YWdSZSkgfHwgJ25hbWUnO1xuICAgICAgc2Nhbm5lci5zY2FuKHdoaXRlUmUpO1xuXG4gICAgICAvLyBHZXQgdGhlIHRhZyB2YWx1ZS5cbiAgICAgIGlmICh0eXBlID09PSAnPScpIHtcbiAgICAgICAgdmFsdWUgPSBzY2FubmVyLnNjYW5VbnRpbChlcXVhbHNSZSk7XG4gICAgICAgIHNjYW5uZXIuc2NhbihlcXVhbHNSZSk7XG4gICAgICAgIHNjYW5uZXIuc2NhblVudGlsKGNsb3NpbmdUYWdSZSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0eXBlID09PSAneycpIHtcbiAgICAgICAgdmFsdWUgPSBzY2FubmVyLnNjYW5VbnRpbChjbG9zaW5nQ3VybHlSZSk7XG4gICAgICAgIHNjYW5uZXIuc2NhbihjdXJseVJlKTtcbiAgICAgICAgc2Nhbm5lci5zY2FuVW50aWwoY2xvc2luZ1RhZ1JlKTtcbiAgICAgICAgdHlwZSA9ICcmJztcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IHNjYW5uZXIuc2NhblVudGlsKGNsb3NpbmdUYWdSZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIE1hdGNoIHRoZSBjbG9zaW5nIHRhZy5cbiAgICAgIGlmICghc2Nhbm5lci5zY2FuKGNsb3NpbmdUYWdSZSkpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5jbG9zZWQgdGFnIGF0ICcgKyBzY2FubmVyLnBvcyk7XG5cbiAgICAgIHRva2VuID0gW3R5cGUsIHZhbHVlLCBzdGFydCwgc2Nhbm5lci5wb3NdO1xuICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuXG4gICAgICBpZiAodHlwZSA9PT0gJyMnIHx8IHR5cGUgPT09ICdeJykge1xuICAgICAgICBzZWN0aW9ucy5wdXNoKHRva2VuKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICcvJykge1xuICAgICAgICAvLyBDaGVjayBzZWN0aW9uIG5lc3RpbmcuXG4gICAgICAgIG9wZW5TZWN0aW9uID0gc2VjdGlvbnMucG9wKCk7XG5cbiAgICAgICAgaWYgKCFvcGVuU2VjdGlvbilcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vub3BlbmVkIHNlY3Rpb24gXCInICsgdmFsdWUgKyAnXCIgYXQgJyArIHN0YXJ0KTtcblxuICAgICAgICBpZiAob3BlblNlY3Rpb25bMV0gIT09IHZhbHVlKVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5jbG9zZWQgc2VjdGlvbiBcIicgKyBvcGVuU2VjdGlvblsxXSArICdcIiBhdCAnICsgc3RhcnQpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJ25hbWUnIHx8IHR5cGUgPT09ICd7JyB8fCB0eXBlID09PSAnJicpIHtcbiAgICAgICAgbm9uU3BhY2UgPSB0cnVlO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJz0nKSB7XG4gICAgICAgIC8vIFNldCB0aGUgdGFncyBmb3IgdGhlIG5leHQgdGltZSBhcm91bmQuXG4gICAgICAgIGNvbXBpbGVUYWdzKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhlcmUgYXJlIG5vIG9wZW4gc2VjdGlvbnMgd2hlbiB3ZSdyZSBkb25lLlxuICAgIG9wZW5TZWN0aW9uID0gc2VjdGlvbnMucG9wKCk7XG5cbiAgICBpZiAob3BlblNlY3Rpb24pXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuY2xvc2VkIHNlY3Rpb24gXCInICsgb3BlblNlY3Rpb25bMV0gKyAnXCIgYXQgJyArIHNjYW5uZXIucG9zKTtcblxuICAgIHJldHVybiBuZXN0VG9rZW5zKHNxdWFzaFRva2Vucyh0b2tlbnMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21iaW5lcyB0aGUgdmFsdWVzIG9mIGNvbnNlY3V0aXZlIHRleHQgdG9rZW5zIGluIHRoZSBnaXZlbiBgdG9rZW5zYCBhcnJheVxuICAgKiB0byBhIHNpbmdsZSB0b2tlbi5cbiAgICovXG4gIGZ1bmN0aW9uIHNxdWFzaFRva2Vucyh0b2tlbnMpIHtcbiAgICB2YXIgc3F1YXNoZWRUb2tlbnMgPSBbXTtcblxuICAgIHZhciB0b2tlbiwgbGFzdFRva2VuO1xuICAgIGZvciAodmFyIGkgPSAwLCBudW1Ub2tlbnMgPSB0b2tlbnMubGVuZ3RoOyBpIDwgbnVtVG9rZW5zOyArK2kpIHtcbiAgICAgIHRva2VuID0gdG9rZW5zW2ldO1xuXG4gICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgaWYgKHRva2VuWzBdID09PSAndGV4dCcgJiYgbGFzdFRva2VuICYmIGxhc3RUb2tlblswXSA9PT0gJ3RleHQnKSB7XG4gICAgICAgICAgbGFzdFRva2VuWzFdICs9IHRva2VuWzFdO1xuICAgICAgICAgIGxhc3RUb2tlblszXSA9IHRva2VuWzNdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHNxdWFzaGVkVG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICAgIGxhc3RUb2tlbiA9IHRva2VuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNxdWFzaGVkVG9rZW5zO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvcm1zIHRoZSBnaXZlbiBhcnJheSBvZiBgdG9rZW5zYCBpbnRvIGEgbmVzdGVkIHRyZWUgc3RydWN0dXJlIHdoZXJlXG4gICAqIHRva2VucyB0aGF0IHJlcHJlc2VudCBhIHNlY3Rpb24gaGF2ZSB0d28gYWRkaXRpb25hbCBpdGVtczogMSkgYW4gYXJyYXkgb2ZcbiAgICogYWxsIHRva2VucyB0aGF0IGFwcGVhciBpbiB0aGF0IHNlY3Rpb24gYW5kIDIpIHRoZSBpbmRleCBpbiB0aGUgb3JpZ2luYWxcbiAgICogdGVtcGxhdGUgdGhhdCByZXByZXNlbnRzIHRoZSBlbmQgb2YgdGhhdCBzZWN0aW9uLlxuICAgKi9cbiAgZnVuY3Rpb24gbmVzdFRva2Vucyh0b2tlbnMpIHtcbiAgICB2YXIgbmVzdGVkVG9rZW5zID0gW107XG4gICAgdmFyIGNvbGxlY3RvciA9IG5lc3RlZFRva2VucztcbiAgICB2YXIgc2VjdGlvbnMgPSBbXTtcblxuICAgIHZhciB0b2tlbiwgc2VjdGlvbjtcbiAgICBmb3IgKHZhciBpID0gMCwgbnVtVG9rZW5zID0gdG9rZW5zLmxlbmd0aDsgaSA8IG51bVRva2VuczsgKytpKSB7XG4gICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcblxuICAgICAgc3dpdGNoICh0b2tlblswXSkge1xuICAgICAgICBjYXNlICcjJzpcbiAgICAgICAgY2FzZSAnXic6XG4gICAgICAgICAgY29sbGVjdG9yLnB1c2godG9rZW4pO1xuICAgICAgICAgIHNlY3Rpb25zLnB1c2godG9rZW4pO1xuICAgICAgICAgIGNvbGxlY3RvciA9IHRva2VuWzRdID0gW107XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJy8nOlxuICAgICAgICAgIHNlY3Rpb24gPSBzZWN0aW9ucy5wb3AoKTtcbiAgICAgICAgICBzZWN0aW9uWzVdID0gdG9rZW5bMl07XG4gICAgICAgICAgY29sbGVjdG9yID0gc2VjdGlvbnMubGVuZ3RoID4gMCA/IHNlY3Rpb25zW3NlY3Rpb25zLmxlbmd0aCAtIDFdWzRdIDogbmVzdGVkVG9rZW5zO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGNvbGxlY3Rvci5wdXNoKHRva2VuKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmVzdGVkVG9rZW5zO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgc2ltcGxlIHN0cmluZyBzY2FubmVyIHRoYXQgaXMgdXNlZCBieSB0aGUgdGVtcGxhdGUgcGFyc2VyIHRvIGZpbmRcbiAgICogdG9rZW5zIGluIHRlbXBsYXRlIHN0cmluZ3MuXG4gICAqL1xuICBmdW5jdGlvbiBTY2FubmVyKHN0cmluZykge1xuICAgIHRoaXMuc3RyaW5nID0gc3RyaW5nO1xuICAgIHRoaXMudGFpbCA9IHN0cmluZztcbiAgICB0aGlzLnBvcyA9IDA7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHRhaWwgaXMgZW1wdHkgKGVuZCBvZiBzdHJpbmcpLlxuICAgKi9cbiAgU2Nhbm5lci5wcm90b3R5cGUuZW9zID0gZnVuY3Rpb24gZW9zKCkge1xuICAgIHJldHVybiB0aGlzLnRhaWwgPT09ICcnO1xuICB9O1xuXG4gIC8qKlxuICAgKiBUcmllcyB0byBtYXRjaCB0aGUgZ2l2ZW4gcmVndWxhciBleHByZXNzaW9uIGF0IHRoZSBjdXJyZW50IHBvc2l0aW9uLlxuICAgKiBSZXR1cm5zIHRoZSBtYXRjaGVkIHRleHQgaWYgaXQgY2FuIG1hdGNoLCB0aGUgZW1wdHkgc3RyaW5nIG90aGVyd2lzZS5cbiAgICovXG4gIFNjYW5uZXIucHJvdG90eXBlLnNjYW4gPSBmdW5jdGlvbiBzY2FuKHJlKSB7XG4gICAgdmFyIG1hdGNoID0gdGhpcy50YWlsLm1hdGNoKHJlKTtcblxuICAgIGlmICghbWF0Y2ggfHwgbWF0Y2guaW5kZXggIT09IDApXG4gICAgICByZXR1cm4gJyc7XG5cbiAgICB2YXIgc3RyaW5nID0gbWF0Y2hbMF07XG5cbiAgICB0aGlzLnRhaWwgPSB0aGlzLnRhaWwuc3Vic3RyaW5nKHN0cmluZy5sZW5ndGgpO1xuICAgIHRoaXMucG9zICs9IHN0cmluZy5sZW5ndGg7XG5cbiAgICByZXR1cm4gc3RyaW5nO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTa2lwcyBhbGwgdGV4dCB1bnRpbCB0aGUgZ2l2ZW4gcmVndWxhciBleHByZXNzaW9uIGNhbiBiZSBtYXRjaGVkLiBSZXR1cm5zXG4gICAqIHRoZSBza2lwcGVkIHN0cmluZywgd2hpY2ggaXMgdGhlIGVudGlyZSB0YWlsIGlmIG5vIG1hdGNoIGNhbiBiZSBtYWRlLlxuICAgKi9cbiAgU2Nhbm5lci5wcm90b3R5cGUuc2NhblVudGlsID0gZnVuY3Rpb24gc2NhblVudGlsKHJlKSB7XG4gICAgdmFyIGluZGV4ID0gdGhpcy50YWlsLnNlYXJjaChyZSksIG1hdGNoO1xuXG4gICAgc3dpdGNoIChpbmRleCkge1xuICAgICAgY2FzZSAtMTpcbiAgICAgICAgbWF0Y2ggPSB0aGlzLnRhaWw7XG4gICAgICAgIHRoaXMudGFpbCA9ICcnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgbWF0Y2ggPSAnJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBtYXRjaCA9IHRoaXMudGFpbC5zdWJzdHJpbmcoMCwgaW5kZXgpO1xuICAgICAgICB0aGlzLnRhaWwgPSB0aGlzLnRhaWwuc3Vic3RyaW5nKGluZGV4KTtcbiAgICB9XG5cbiAgICB0aGlzLnBvcyArPSBtYXRjaC5sZW5ndGg7XG5cbiAgICByZXR1cm4gbWF0Y2g7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudHMgYSByZW5kZXJpbmcgY29udGV4dCBieSB3cmFwcGluZyBhIHZpZXcgb2JqZWN0IGFuZFxuICAgKiBtYWludGFpbmluZyBhIHJlZmVyZW5jZSB0byB0aGUgcGFyZW50IGNvbnRleHQuXG4gICAqL1xuICBmdW5jdGlvbiBDb250ZXh0KHZpZXcsIHBhcmVudENvbnRleHQpIHtcbiAgICB0aGlzLnZpZXcgPSB2aWV3O1xuICAgIHRoaXMuY2FjaGUgPSB7XG4gICAgICAnLic6IHRoaXMudmlldyxcbiAgICAgICdAZWFjaCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJldHVybnMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgayBpbiB0aGlzKSB7XG4gICAgICAgICAgcmV0dXJucy5wdXNoKHsnQGtleSc6IGssICdAdmFsdWUnOiB0aGlzW2tdfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldHVybnM7XG4gICAgICB9XG4gICAgfTtcbiAgICB0aGlzLnBhcmVudCA9IHBhcmVudENvbnRleHQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBjb250ZXh0IHVzaW5nIHRoZSBnaXZlbiB2aWV3IHdpdGggdGhpcyBjb250ZXh0XG4gICAqIGFzIHRoZSBwYXJlbnQuXG4gICAqL1xuICBDb250ZXh0LnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gcHVzaCh2aWV3KSB7XG4gICAgcmV0dXJuIG5ldyBDb250ZXh0KHZpZXcsIHRoaXMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gbmFtZSBpbiB0aGlzIGNvbnRleHQsIHRyYXZlcnNpbmdcbiAgICogdXAgdGhlIGNvbnRleHQgaGllcmFyY2h5IGlmIHRoZSB2YWx1ZSBpcyBhYnNlbnQgaW4gdGhpcyBjb250ZXh0J3Mgdmlldy5cbiAgICovXG4gIENvbnRleHQucHJvdG90eXBlLmxvb2t1cCA9IGZ1bmN0aW9uIGxvb2t1cChuYW1lKSB7XG4gICAgdmFyIGNhY2hlID0gdGhpcy5jYWNoZTtcblxuICAgIHZhciB2YWx1ZTtcbiAgICBpZiAoY2FjaGUuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgIHZhbHVlID0gY2FjaGVbbmFtZV07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLCBuYW1lcywgaW5kZXgsIGxvb2t1cEhpdCA9IGZhbHNlO1xuXG4gICAgICB3aGlsZSAoY29udGV4dCkge1xuICAgICAgICBpZiAobmFtZS5pbmRleE9mKCcuJykgPiAwKSB7XG4gICAgICAgICAgdmFsdWUgPSBjb250ZXh0LnZpZXc7XG4gICAgICAgICAgbmFtZXMgPSBuYW1lLnNwbGl0KCcuJyk7XG4gICAgICAgICAgaW5kZXggPSAwO1xuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogVXNpbmcgdGhlIGRvdCBub3Rpb24gcGF0aCBpbiBgbmFtZWAsIHdlIGRlc2NlbmQgdGhyb3VnaCB0aGVcbiAgICAgICAgICAgKiBuZXN0ZWQgb2JqZWN0cy5cbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIFRvIGJlIGNlcnRhaW4gdGhhdCB0aGUgbG9va3VwIGhhcyBiZWVuIHN1Y2Nlc3NmdWwsIHdlIGhhdmUgdG9cbiAgICAgICAgICAgKiBjaGVjayBpZiB0aGUgbGFzdCBvYmplY3QgaW4gdGhlIHBhdGggYWN0dWFsbHkgaGFzIHRoZSBwcm9wZXJ0eVxuICAgICAgICAgICAqIHdlIGFyZSBsb29raW5nIGZvci4gV2Ugc3RvcmUgdGhlIHJlc3VsdCBpbiBgbG9va3VwSGl0YC5cbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIFRoaXMgaXMgc3BlY2lhbGx5IG5lY2Vzc2FyeSBmb3Igd2hlbiB0aGUgdmFsdWUgaGFzIGJlZW4gc2V0IHRvXG4gICAgICAgICAgICogYHVuZGVmaW5lZGAgYW5kIHdlIHdhbnQgdG8gYXZvaWQgbG9va2luZyB1cCBwYXJlbnQgY29udGV4dHMuXG4gICAgICAgICAgICoqL1xuICAgICAgICAgIHdoaWxlICh2YWx1ZSAhPSBudWxsICYmIGluZGV4IDwgbmFtZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IG5hbWVzLmxlbmd0aCAtIDEpXG4gICAgICAgICAgICAgIGxvb2t1cEhpdCA9IGhhc1Byb3BlcnR5KHZhbHVlLCBuYW1lc1tpbmRleF0pO1xuXG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlW25hbWVzW2luZGV4KytdXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdmFsdWUgPSBjb250ZXh0LnZpZXdbbmFtZV07XG4gICAgICAgICAgbG9va3VwSGl0ID0gaGFzUHJvcGVydHkoY29udGV4dC52aWV3LCBuYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsb29rdXBIaXQpXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY29udGV4dCA9IGNvbnRleHQucGFyZW50O1xuICAgICAgfVxuXG4gICAgICBjYWNoZVtuYW1lXSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSlcbiAgICAgIHZhbHVlID0gdmFsdWUuY2FsbCh0aGlzLnZpZXcpO1xuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBIFdyaXRlciBrbm93cyBob3cgdG8gdGFrZSBhIHN0cmVhbSBvZiB0b2tlbnMgYW5kIHJlbmRlciB0aGVtIHRvIGFcbiAgICogc3RyaW5nLCBnaXZlbiBhIGNvbnRleHQuIEl0IGFsc28gbWFpbnRhaW5zIGEgY2FjaGUgb2YgdGVtcGxhdGVzIHRvXG4gICAqIGF2b2lkIHRoZSBuZWVkIHRvIHBhcnNlIHRoZSBzYW1lIHRlbXBsYXRlIHR3aWNlLlxuICAgKi9cbiAgZnVuY3Rpb24gV3JpdGVyKCkge1xuICAgIHRoaXMuY2FjaGUgPSB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgYWxsIGNhY2hlZCB0ZW1wbGF0ZXMgaW4gdGhpcyB3cml0ZXIuXG4gICAqL1xuICBXcml0ZXIucHJvdG90eXBlLmNsZWFyQ2FjaGUgPSBmdW5jdGlvbiBjbGVhckNhY2hlKCkge1xuICAgIHRoaXMuY2FjaGUgPSB7fTtcbiAgfTtcblxuICAvKipcbiAgICogUGFyc2VzIGFuZCBjYWNoZXMgdGhlIGdpdmVuIGB0ZW1wbGF0ZWAgYW5kIHJldHVybnMgdGhlIGFycmF5IG9mIHRva2Vuc1xuICAgKiB0aGF0IGlzIGdlbmVyYXRlZCBmcm9tIHRoZSBwYXJzZS5cbiAgICovXG4gIFdyaXRlci5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbiBwYXJzZSh0ZW1wbGF0ZSwgdGFncykge1xuICAgIHZhciBjYWNoZSA9IHRoaXMuY2FjaGU7XG4gICAgdmFyIHRva2VucyA9IGNhY2hlW3RlbXBsYXRlXTtcblxuICAgIGlmICh0b2tlbnMgPT0gbnVsbClcbiAgICAgIHRva2VucyA9IGNhY2hlW3RlbXBsYXRlXSA9IHBhcnNlVGVtcGxhdGUodGVtcGxhdGUsIHRhZ3MpO1xuXG4gICAgcmV0dXJuIHRva2VucztcbiAgfTtcblxuICAvKipcbiAgICogSGlnaC1sZXZlbCBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIHJlbmRlciB0aGUgZ2l2ZW4gYHRlbXBsYXRlYCB3aXRoXG4gICAqIHRoZSBnaXZlbiBgdmlld2AuXG4gICAqXG4gICAqIFRoZSBvcHRpb25hbCBgcGFydGlhbHNgIGFyZ3VtZW50IG1heSBiZSBhbiBvYmplY3QgdGhhdCBjb250YWlucyB0aGVcbiAgICogbmFtZXMgYW5kIHRlbXBsYXRlcyBvZiBwYXJ0aWFscyB0aGF0IGFyZSB1c2VkIGluIHRoZSB0ZW1wbGF0ZS4gSXQgbWF5XG4gICAqIGFsc28gYmUgYSBmdW5jdGlvbiB0aGF0IGlzIHVzZWQgdG8gbG9hZCBwYXJ0aWFsIHRlbXBsYXRlcyBvbiB0aGUgZmx5XG4gICAqIHRoYXQgdGFrZXMgYSBzaW5nbGUgYXJndW1lbnQ6IHRoZSBuYW1lIG9mIHRoZSBwYXJ0aWFsLlxuICAgKi9cbiAgV3JpdGVyLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIodGVtcGxhdGUsIHZpZXcsIHBhcnRpYWxzKSB7XG4gICAgdmFyIHRva2VucyA9IHRoaXMucGFyc2UodGVtcGxhdGUpO1xuICAgIHZhciBjb250ZXh0ID0gKHZpZXcgaW5zdGFuY2VvZiBDb250ZXh0KSA/IHZpZXcgOiBuZXcgQ29udGV4dCh2aWV3KTtcbiAgICByZXR1cm4gdGhpcy5yZW5kZXJUb2tlbnModG9rZW5zLCBjb250ZXh0LCBwYXJ0aWFscywgdGVtcGxhdGUpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBMb3ctbGV2ZWwgbWV0aG9kIHRoYXQgcmVuZGVycyB0aGUgZ2l2ZW4gYXJyYXkgb2YgYHRva2Vuc2AgdXNpbmdcbiAgICogdGhlIGdpdmVuIGBjb250ZXh0YCBhbmQgYHBhcnRpYWxzYC5cbiAgICpcbiAgICogTm90ZTogVGhlIGBvcmlnaW5hbFRlbXBsYXRlYCBpcyBvbmx5IGV2ZXIgdXNlZCB0byBleHRyYWN0IHRoZSBwb3J0aW9uXG4gICAqIG9mIHRoZSBvcmlnaW5hbCB0ZW1wbGF0ZSB0aGF0IHdhcyBjb250YWluZWQgaW4gYSBoaWdoZXItb3JkZXIgc2VjdGlvbi5cbiAgICogSWYgdGhlIHRlbXBsYXRlIGRvZXNuJ3QgdXNlIGhpZ2hlci1vcmRlciBzZWN0aW9ucywgdGhpcyBhcmd1bWVudCBtYXlcbiAgICogYmUgb21pdHRlZC5cbiAgICovXG4gIFdyaXRlci5wcm90b3R5cGUucmVuZGVyVG9rZW5zID0gZnVuY3Rpb24gcmVuZGVyVG9rZW5zKHRva2VucywgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpIHtcbiAgICB2YXIgYnVmZmVyID0gJyc7XG4gICAgdmFyIHRva2VuLCBzeW1ib2wsIHZhbHVlO1xuICAgIGZvciAodmFyIGkgPSAwLCBudW1Ub2tlbnMgPSB0b2tlbnMubGVuZ3RoOyBpIDwgbnVtVG9rZW5zOyArK2kpIHtcbiAgICAgIHZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgICBzeW1ib2wgPSB0b2tlblswXTtcblxuICAgICAgaWYgKHN5bWJvbCA9PT0gJyMnKSB2YWx1ZSA9IHRoaXMucmVuZGVyU2VjdGlvbih0b2tlbiwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xuICAgICAgZWxzZSBpZiAoc3ltYm9sID09PSAnXicpIHZhbHVlID0gdGhpcy5yZW5kZXJJbnZlcnRlZCh0b2tlbiwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xuICAgICAgZWxzZSBpZiAoc3ltYm9sID09PSAnPicpIHZhbHVlID0gdGhpcy5yZW5kZXJQYXJ0aWFsKHRva2VuLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XG4gICAgICBlbHNlIGlmIChzeW1ib2wgPT09ICcmJykgdmFsdWUgPSB0aGlzLnVuZXNjYXBlZFZhbHVlKHRva2VuLCBjb250ZXh0KTtcbiAgICAgIGVsc2UgaWYgKHN5bWJvbCA9PT0gJ25hbWUnKSB2YWx1ZSA9IHRoaXMuZXNjYXBlZFZhbHVlKHRva2VuLCBjb250ZXh0KTtcbiAgICAgIGVsc2UgaWYgKHN5bWJvbCA9PT0gJ3RleHQnKSB2YWx1ZSA9IHRoaXMucmF3VmFsdWUodG9rZW4pO1xuXG4gICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgYnVmZmVyICs9IHZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiBidWZmZXI7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5yZW5kZXJTZWN0aW9uID0gZnVuY3Rpb24gcmVuZGVyU2VjdGlvbih0b2tlbiwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGJ1ZmZlciA9ICcnO1xuXG4gICAgdmFyIHZhbHVlID0gY29udGV4dC5sb29rdXAodG9rZW5bMV0pO1xuXG4gICAgLy8gVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIHJlbmRlciBhbiBhcmJpdHJhcnkgdGVtcGxhdGVcbiAgICAvLyBpbiB0aGUgY3VycmVudCBjb250ZXh0IGJ5IGhpZ2hlci1vcmRlciBzZWN0aW9ucy5cbiAgICBmdW5jdGlvbiBzdWJSZW5kZXIodGVtcGxhdGUpIHtcbiAgICAgIHJldHVybiBzZWxmLnJlbmRlcih0ZW1wbGF0ZSwgY29udGV4dCwgcGFydGlhbHMpO1xuICAgIH1cblxuICAgIGlmICghdmFsdWUpIHJldHVybjtcblxuICAgIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgZm9yICh2YXIgaiA9IDAsIHZhbHVlTGVuZ3RoID0gdmFsdWUubGVuZ3RoOyBqIDwgdmFsdWVMZW5ndGg7ICsraikge1xuICAgICAgICBpZiAodmFsdWVbal0pIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlW2pdID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdmFsdWVbal1bJ0BpJ10gPSBqO1xuICAgICAgICAgICAgdmFsdWVbal1bJ0BmaXJzdCddID0gKGogPT09IDApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJ1ZmZlciArPSB0aGlzLnJlbmRlclRva2Vucyh0b2tlbls0XSwgY29udGV4dC5wdXNoKHZhbHVlW2pdKSwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICBidWZmZXIgKz0gdGhpcy5yZW5kZXJUb2tlbnModG9rZW5bNF0sIGNvbnRleHQucHVzaCh2YWx1ZSksIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICAgIGlmICh0eXBlb2Ygb3JpZ2luYWxUZW1wbGF0ZSAhPT0gJ3N0cmluZycpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHVzZSBoaWdoZXItb3JkZXIgc2VjdGlvbnMgd2l0aG91dCB0aGUgb3JpZ2luYWwgdGVtcGxhdGUnKTtcblxuICAgICAgLy8gRXh0cmFjdCB0aGUgcG9ydGlvbiBvZiB0aGUgb3JpZ2luYWwgdGVtcGxhdGUgdGhhdCB0aGUgc2VjdGlvbiBjb250YWlucy5cbiAgICAgIHZhbHVlID0gdmFsdWUuY2FsbChjb250ZXh0LnZpZXcsIG9yaWdpbmFsVGVtcGxhdGUuc2xpY2UodG9rZW5bM10sIHRva2VuWzVdKSwgc3ViUmVuZGVyKTtcblxuICAgICAgaWYgKHZhbHVlICE9IG51bGwpXG4gICAgICAgIGJ1ZmZlciArPSB2YWx1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBidWZmZXIgKz0gdGhpcy5yZW5kZXJUb2tlbnModG9rZW5bNF0sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgICB9XG4gICAgcmV0dXJuIGJ1ZmZlcjtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLnJlbmRlckludmVydGVkID0gZnVuY3Rpb24gcmVuZGVySW52ZXJ0ZWQodG9rZW4sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKSB7XG4gICAgdmFyIHZhbHVlID0gY29udGV4dC5sb29rdXAodG9rZW5bMV0pO1xuXG4gICAgLy8gVXNlIEphdmFTY3JpcHQncyBkZWZpbml0aW9uIG9mIGZhbHN5LiBJbmNsdWRlIGVtcHR5IGFycmF5cy5cbiAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2phbmwvbXVzdGFjaGUuanMvaXNzdWVzLzE4NlxuICAgIGlmICghdmFsdWUgfHwgKGlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmxlbmd0aCA9PT0gMCkpXG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJUb2tlbnModG9rZW5bNF0sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLnJlbmRlclBhcnRpYWwgPSBmdW5jdGlvbiByZW5kZXJQYXJ0aWFsKHRva2VuLCBjb250ZXh0LCBwYXJ0aWFscykge1xuICAgIGlmICghcGFydGlhbHMpIHJldHVybjtcblxuICAgIHZhciB2YWx1ZSA9IGlzRnVuY3Rpb24ocGFydGlhbHMpID8gcGFydGlhbHModG9rZW5bMV0pIDogcGFydGlhbHNbdG9rZW5bMV1dO1xuICAgIGlmICh2YWx1ZSAhPSBudWxsKVxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyVG9rZW5zKHRoaXMucGFyc2UodmFsdWUpLCBjb250ZXh0LCBwYXJ0aWFscywgdmFsdWUpO1xuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUudW5lc2NhcGVkVmFsdWUgPSBmdW5jdGlvbiB1bmVzY2FwZWRWYWx1ZSh0b2tlbiwgY29udGV4dCkge1xuICAgIHZhciB2YWx1ZSA9IGNvbnRleHQubG9va3VwKHRva2VuWzFdKTtcbiAgICBpZiAodmFsdWUgIT0gbnVsbClcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLmVzY2FwZWRWYWx1ZSA9IGZ1bmN0aW9uIGVzY2FwZWRWYWx1ZSh0b2tlbiwgY29udGV4dCkge1xuICAgIHZhciB2YWx1ZSA9IGNvbnRleHQubG9va3VwKHRva2VuWzFdKTtcbiAgICBpZiAodmFsdWUgIT0gbnVsbClcbiAgICAgIHJldHVybiBtdXN0YWNoZS5lc2NhcGUodmFsdWUpO1xuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUucmF3VmFsdWUgPSBmdW5jdGlvbiByYXdWYWx1ZSh0b2tlbikge1xuICAgIHJldHVybiB0b2tlblsxXTtcbiAgfTtcblxuICBtdXN0YWNoZS5uYW1lID0gJ211c3RhY2hlLmpzJztcbiAgbXVzdGFjaGUudmVyc2lvbiA9ICcyLjEuMyc7XG4gIG11c3RhY2hlLnRhZ3MgPSBbJ3t7JywgJ319J107XG5cbiAgLy8gQWxsIGhpZ2gtbGV2ZWwgbXVzdGFjaGUuKiBmdW5jdGlvbnMgdXNlIHRoaXMgd3JpdGVyLlxuICB2YXIgZGVmYXVsdFdyaXRlciA9IG5ldyBXcml0ZXIoKTtcblxuICAvKipcbiAgICogQ2xlYXJzIGFsbCBjYWNoZWQgdGVtcGxhdGVzIGluIHRoZSBkZWZhdWx0IHdyaXRlci5cbiAgICovXG4gIG11c3RhY2hlLmNsZWFyQ2FjaGUgPSBmdW5jdGlvbiBjbGVhckNhY2hlKCkge1xuICAgIHJldHVybiBkZWZhdWx0V3JpdGVyLmNsZWFyQ2FjaGUoKTtcbiAgfTtcblxuICAvKipcbiAgICogUGFyc2VzIGFuZCBjYWNoZXMgdGhlIGdpdmVuIHRlbXBsYXRlIGluIHRoZSBkZWZhdWx0IHdyaXRlciBhbmQgcmV0dXJucyB0aGVcbiAgICogYXJyYXkgb2YgdG9rZW5zIGl0IGNvbnRhaW5zLiBEb2luZyB0aGlzIGFoZWFkIG9mIHRpbWUgYXZvaWRzIHRoZSBuZWVkIHRvXG4gICAqIHBhcnNlIHRlbXBsYXRlcyBvbiB0aGUgZmx5IGFzIHRoZXkgYXJlIHJlbmRlcmVkLlxuICAgKi9cbiAgbXVzdGFjaGUucGFyc2UgPSBmdW5jdGlvbiBwYXJzZSh0ZW1wbGF0ZSwgdGFncykge1xuICAgIHJldHVybiBkZWZhdWx0V3JpdGVyLnBhcnNlKHRlbXBsYXRlLCB0YWdzKTtcbiAgfTtcblxuICAvKipcbiAgICogUmVuZGVycyB0aGUgYHRlbXBsYXRlYCB3aXRoIHRoZSBnaXZlbiBgdmlld2AgYW5kIGBwYXJ0aWFsc2AgdXNpbmcgdGhlXG4gICAqIGRlZmF1bHQgd3JpdGVyLlxuICAgKi9cbiAgbXVzdGFjaGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscykge1xuICAgIGlmICh0eXBlb2YgdGVtcGxhdGUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIHRlbXBsYXRlISBUZW1wbGF0ZSBzaG91bGQgYmUgYSBcInN0cmluZ1wiICcgKyAnYnV0IFwiJyArIHR5cGVTdHIodGVtcGxhdGUpICsgJ1wiIHdhcyBnaXZlbiBhcyB0aGUgZmlyc3QgJyArICdhcmd1bWVudCBmb3IgbXVzdGFjaGUjcmVuZGVyKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscyknKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVmYXVsdFdyaXRlci5yZW5kZXIodGVtcGxhdGUsIHZpZXcsIHBhcnRpYWxzKTtcbiAgfTtcblxuICAvLyBUaGlzIGlzIGhlcmUgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5IHdpdGggMC40LnguLFxuICAvKmVzbGludC1kaXNhYmxlICovIC8vIGVzbGludCB3YW50cyBjYW1lbCBjYXNlZCBmdW5jdGlvbiBuYW1lXG4gIG11c3RhY2hlLnRvX2h0bWwgPSBmdW5jdGlvbiB0b19odG1sKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscywgc2VuZCkge1xuICAgIC8qZXNsaW50LWVuYWJsZSovXG5cbiAgICB2YXIgcmVzdWx0ID0gbXVzdGFjaGUucmVuZGVyKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscyk7XG5cbiAgICBpZiAoaXNGdW5jdGlvbihzZW5kKSkge1xuICAgICAgc2VuZChyZXN1bHQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9O1xuXG4gIC8vIEV4cG9ydCB0aGUgZXNjYXBpbmcgZnVuY3Rpb24gc28gdGhhdCB0aGUgdXNlciBtYXkgb3ZlcnJpZGUgaXQuXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vamFubC9tdXN0YWNoZS5qcy9pc3N1ZXMvMjQ0XG4gIG11c3RhY2hlLmVzY2FwZSA9IGVzY2FwZUh0bWw7XG5cbiAgLy8gRXhwb3J0IHRoZXNlIG1haW5seSBmb3IgdGVzdGluZywgYnV0IGFsc28gZm9yIGFkdmFuY2VkIHVzYWdlLlxuICBtdXN0YWNoZS5TY2FubmVyID0gU2Nhbm5lcjtcbiAgbXVzdGFjaGUuQ29udGV4dCA9IENvbnRleHQ7XG4gIG11c3RhY2hlLldyaXRlciA9IFdyaXRlcjtcblxufSkpO1xuXG5leHBvcnQgZGVmYXVsdCBBWDYubXVzdGFjaGU7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL3NyYy9BWDZNdXN0YWNoZS5qcyIsImltcG9ydCBqUXVlcnkgZnJvbSBcImpxbWluXCI7XG5pbXBvcnQgQVg2VUlDb3JlIGZyb20gXCIuL0FYNlVJQ29yZS5qc1wiO1xuaW1wb3J0IGluZm8gZnJvbSBcIi4vQVg2SW5mb1wiO1xuaW1wb3J0IFUgZnJvbSBcIi4vQVg2VXRpbFwiO1xuaW1wb3J0IG11c3RhY2hlIGZyb20gXCIuL0FYNk11c3RhY2hlXCI7XG4vKiB+fn5+fn5+fn5+fn5+fn5+fn4gZW5kIG9mIGltcG9ydCAgfn5+fn5+fn5+fn5+fn5+fn5+fn4gKi9cblxubGV0IGN0cmxLZXlzID0ge1xuICBcIjE4XCI6IFwiS0VZX0FMVFwiLFxuICBcIjhcIjogXCJLRVlfQkFDS1NQQUNFXCIsXG4gIFwiMTdcIjogXCJLRVlfQ09OVFJPTFwiLFxuICBcIjQ2XCI6IFwiS0VZX0RFTEVURVwiLFxuICBcIjQwXCI6IFwiS0VZX0RPV05cIixcbiAgXCIzNVwiOiBcIktFWV9FTkRcIixcbiAgXCIxODdcIjogXCJLRVlfRVFVQUxcIixcbiAgXCIyN1wiOiBcIktFWV9FU0NcIixcbiAgXCIzNlwiOiBcIktFWV9IT01FXCIsXG4gIFwiNDVcIjogXCJLRVlfSU5TRVJUXCIsXG4gIFwiMzdcIjogXCJLRVlfTEVGVFwiLFxuICBcIjE4OVwiOiBcIktFWV9NSU5VU1wiLFxuICBcIjM0XCI6IFwiS0VZX1BBR0VET1dOXCIsXG4gIFwiMzNcIjogXCJLRVlfUEFHRVVQXCIsXG4gIC8vIFwiMTkwXCI6IFwiS0VZX1BFUklPRFwiLFxuICBcIjEzXCI6IFwiS0VZX1JFVFVSTlwiLFxuICBcIjM5XCI6IFwiS0VZX1JJR0hUXCIsXG4gIFwiMTZcIjogXCJLRVlfU0hJRlRcIixcbiAgLy8gXCIzMlwiOiBcIktFWV9TUEFDRVwiLFxuICBcIjlcIjogXCJLRVlfVEFCXCIsXG4gIFwiMzhcIjogXCJLRVlfVVBcIixcbiAgXCI5MVwiOiBcIktFWV9XSU5ET1dcIlxuICAvL1wiMTA3XCIgOiBcIk5VTVBBRF9BRERcIixcbiAgLy9cIjE5NFwiIDogXCJOVU1QQURfQ09NTUFcIixcbiAgLy9cIjExMFwiIDogXCJOVU1QQURfREVDSU1BTFwiLFxuICAvL1wiMTExXCIgOiBcIk5VTVBBRF9ESVZJREVcIixcbiAgLy9cIjEyXCIgOiBcIk5VTVBBRF9FUVVBTFwiLFxuICAvL1wiMTA2XCIgOiBcIk5VTVBBRF9NVUxUSVBMWVwiLFxuICAvL1wiMTA5XCIgOiBcIk5VTVBBRF9TVUJUUkFDVFwiXG59O1xubGV0IHRtcGwgPSB7XG4gIFwiZGlzcGxheVwiKGNvbHVtbktleXMpe1xuICAgIHJldHVybiBgXG48YSB7e150YWJJbmRleH19aHJlZj1cIiNheDZ1aS1zZWxlY3Qte3tpZH19XCIge3svdGFiSW5kZXh9fXt7I3RhYkluZGV4fX10YWJpbmRleD1cInt7dGFiSW5kZXh9fVwiIHt7L3RhYkluZGV4fX1jbGFzcz1cImF4NnVpLXNlbGVjdC1kaXNwbGF5IHt7dGhlbWV9fVwiIFxuZGF0YS1heDZ1aS1zZWxlY3QtZGlzcGxheT1cInt7aWR9fVwiIGRhdGEtYXg2dWktc2VsZWN0LWluc3RhbmNlPVwie3tpbnN0YW5jZUlkfX1cIiBzdHlsZT1cImhlaWdodDoge3toZWlnaHR9fXB4O1wiPlxuICAgIDxkaXYgY2xhc3M9XCJheDZ1aS1zZWxlY3QtZGlzcGxheS10YWJsZVwiIGRhdGEtZWxzPVwiZGlzcGxheS10YWJsZVwiPlxuICAgICAgICA8ZGl2IGRhdGEtYXg2dWktc2VsZWN0LWRpc3BsYXk9XCJsYWJlbFwiPnt7bGFiZWx9fTwvZGl2PlxuICAgICAgICA8ZGl2IGRhdGEtYXg2dWktc2VsZWN0LWRpc3BsYXk9XCJhZGRvblwiPiBcbiAgICAgICAgICAgIHt7I211bHRpcGxlfX17eyNyZXNldH19XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFkZG9uLWljb24tcmVzZXRcIiBkYXRhLXNlbGVjdGVkLWNsZWFyPVwidHJ1ZVwiPnt7ey59fX08L3NwYW4+XG4gICAgICAgICAgICB7ey9yZXNldH19e3svbXVsdGlwbGV9fVxuICAgICAgICAgICAge3sjaWNvbnN9fVxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhZGRvbi1pY29uLWNsb3NlZFwiPnt7Y2xlc2VkfX08L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFkZG9uLWljb24tb3BlbmVkXCI+e3tvcGVuZWR9fTwvc3Bhbj5cbiAgICAgICAgICAgIHt7L2ljb25zfX1cbiAgICAgICAgICAgIHt7Xmljb25zfX1cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYWRkb24taWNvbi1jbG9zZWRcIj48c3BhbiBjbGFzcz1cImFkZG9uLWljb24tYXJyb3dcIj48L3NwYW4+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhZGRvbi1pY29uLW9wZW5lZFwiPjxzcGFuIGNsYXNzPVwiYWRkb24taWNvbi1hcnJvd1wiPjwvc3Bhbj48L3NwYW4+XG4gICAgICAgICAgICB7ey9pY29uc319XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHRhYmluZGV4PVwiLTFcIiBkYXRhLWF4NnVpLXNlbGVjdC1kaXNwbGF5PVwiaW5wdXRcIiBcbiAgICBzdHlsZT1cInBvc2l0aW9uOmFic29sdXRlO3otaW5kZXg6MDtsZWZ0OjBweDt0b3A6MHB4O2ZvbnQtc2l6ZToxcHg7b3BhY2l0eTogMDt3aWR0aDoxcHg7aGVpZ2h0OjFweDtib3JkZXI6IDAgbm9uZTtjb2xvciA6IHRyYW5zcGFyZW50O3RleHQtaW5kZW50OiAtOTk5OWVtO1wiIC8+XG48L2E+XG5gO1xuICB9LFxuICBcInNlbGVjdFwiKGNvbHVtbktleXMpe1xuICAgIHJldHVybiBgXG48c2VsZWN0IHRhYmluZGV4PVwiLTFcIiBjbGFzcz1cIlwiIG5hbWU9XCJ7e25hbWV9fVwiIHt7I211bHRpcGxlfX1tdWx0aXBsZT1cIm11bHRpcGxlXCJ7ey9tdWx0aXBsZX19IHN0eWxlPVwiaGVpZ2h0OiB7e2hlaWdodH19cHg7XCI+PC9zZWxlY3Q+XG5gO1xuICB9LFxuICBcIm9wdGlvbkdyb3VwXCIoY29sdW1uS2V5cyl7XG4gICAgcmV0dXJuIGBcbjxkaXYgY2xhc3M9XCJheDZ1aS1zZWxlY3Qtb3B0aW9uLWdyb3VwIHt7dGhlbWV9fVwiIGRhdGEtYXg2dWktc2VsZWN0LW9wdGlvbi1ncm91cD1cInt7aWR9fVwiPlxuICAgIDxkaXYgY2xhc3M9XCJheC1zZWxlY3QtYm9keVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYXgtc2VsZWN0LW9wdGlvbi1ncm91cC1jb250ZW50XCIgZGF0YS1lbHM9XCJjb250ZW50XCI+PC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImF4LXNlbGVjdC1hcnJvd1wiPjwvZGl2PiBcbjwvZGl2PlxuYDtcbiAgfSxcbiAgXCJvcHRpb25zXCIoY29sdW1uS2V5cyl7XG4gICAgcmV0dXJuIGBcbnt7I3dhaXRPcHRpb25zfX1cbiAgICA8ZGl2IGNsYXNzPVwiYXgtc2VsZWN0LW9wdGlvbi1pdGVtXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXgtc2VsZWN0LW9wdGlvbi1pdGVtLWhvbGRlclwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXgtc2VsZWN0LW9wdGlvbi1pdGVtLWNlbGwgYXgtc2VsZWN0LW9wdGlvbi1pdGVtLWxhYmVsXCI+XG4gICAgICAgICAgICAgICAgICAgIHt7e2xhbmcubG9hZGluZ319fVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbnt7L3dhaXRPcHRpb25zfX1cbnt7XndhaXRPcHRpb25zfX1cbiAgICB7eyNvcHRpb25zfX1cbiAgICAgICAge3sjb3B0Z3JvdXB9fVxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImF4LXNlbGVjdC1vcHRpb24tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXgtc2VsZWN0LW9wdGlvbi1pdGVtLWhvbGRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImF4LXNlbGVjdC1vcHRpb24tZ3JvdXAtbGFiZWxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7ey59fX1cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHt7I29wdGlvbnN9fVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJheC1zZWxlY3Qtb3B0aW9uLWl0ZW1cIiBkYXRhLW9wdGlvbi1mb2N1cy1pbmRleD1cInt7QGZpbmRleH19XCIgZGF0YS1vcHRpb24tZ3JvdXAtaW5kZXg9XCJ7e0BnaW5kZXh9fVwiIGRhdGEtb3B0aW9uLWluZGV4PVwie3tAaW5kZXh9fVwiIFxuICAgICAgICAgICAgICAgIGRhdGEtb3B0aW9uLXZhbHVlPVwie3ske2NvbHVtbktleXMub3B0aW9uVmFsdWV9fX1cIiBcbiAgICAgICAgICAgICAgICB7eyMke2NvbHVtbktleXMub3B0aW9uU2VsZWN0ZWR9fX1kYXRhLW9wdGlvbi1zZWxlY3RlZD1cInRydWVcInt7LyR7Y29sdW1uS2V5cy5vcHRpb25TZWxlY3RlZH19fT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImF4LXNlbGVjdC1vcHRpb24taXRlbS1ob2xkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7I211bHRpcGxlfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXgtc2VsZWN0LW9wdGlvbi1pdGVtLWNlbGwgYXgtc2VsZWN0LW9wdGlvbi1pdGVtLWNoZWNrYm94XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpdGVtLWNoZWNrYm94LXdyYXAgdXNlQ2hlY2tCb3hcIiBkYXRhLW9wdGlvbi1jaGVja2JveC1pbmRleD1cInt7QGl9fVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7L211bHRpcGxlfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXgtc2VsZWN0LW9wdGlvbi1pdGVtLWNlbGwgYXgtc2VsZWN0LW9wdGlvbi1pdGVtLWxhYmVsXCI+e3t7JHtjb2x1bW5LZXlzLm9wdGlvblRleHR9fX19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB7ey9vcHRpb25zfX1cbiAgICAgICAgICAgIDwvZGl2PiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAge3svb3B0Z3JvdXB9fVxuICAgICAgICB7e15vcHRncm91cH19XG4gICAgICAgIDxkaXYgY2xhc3M9XCJheC1zZWxlY3Qtb3B0aW9uLWl0ZW1cIiBkYXRhLW9wdGlvbi1mb2N1cy1pbmRleD1cInt7QGZpbmRleH19XCIgZGF0YS1vcHRpb24taW5kZXg9XCJ7e0BpbmRleH19XCIgZGF0YS1vcHRpb24tdmFsdWU9XCJ7eyR7Y29sdW1uS2V5cy5vcHRpb25WYWx1ZX19fVwiIHt7IyR7Y29sdW1uS2V5cy5vcHRpb25TZWxlY3RlZH19fWRhdGEtb3B0aW9uLXNlbGVjdGVkPVwidHJ1ZVwie3svJHtjb2x1bW5LZXlzLm9wdGlvblNlbGVjdGVkfX19PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImF4LXNlbGVjdC1vcHRpb24taXRlbS1ob2xkZXJcIj5cbiAgICAgICAgICAgICAgICB7eyNtdWx0aXBsZX19XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJheC1zZWxlY3Qtb3B0aW9uLWl0ZW0tY2VsbCBheC1zZWxlY3Qtb3B0aW9uLWl0ZW0tY2hlY2tib3hcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpdGVtLWNoZWNrYm94LXdyYXAgdXNlQ2hlY2tCb3hcIiBkYXRhLW9wdGlvbi1jaGVja2JveC1pbmRleD1cInt7QGl9fVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAge3svbXVsdGlwbGV9fVxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXgtc2VsZWN0LW9wdGlvbi1pdGVtLWNlbGwgYXgtc2VsZWN0LW9wdGlvbi1pdGVtLWxhYmVsXCI+e3t7JHtjb2x1bW5LZXlzLm9wdGlvblRleHR9fX19PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7ey9vcHRncm91cH19XG4gICAge3svb3B0aW9uc319XG4gICAge3teb3B0aW9uc319XG4gICAgICAgIDxkaXYgY2xhc3M9XCJheC1zZWxlY3Qtb3B0aW9uLWl0ZW1cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJheC1zZWxlY3Qtb3B0aW9uLWl0ZW0taG9sZGVyXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJheC1zZWxlY3Qtb3B0aW9uLWl0ZW0tY2VsbCBheC1zZWxlY3Qtb3B0aW9uLWl0ZW0tbGFiZWxcIj5cbiAgICAgICAgICAgICAgICAgICAge3t7bGFuZy5ub09wdGlvbnN9fX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAge3svb3B0aW9uc319XG57ey93YWl0T3B0aW9uc319XG5gO1xuICB9LFxufTtcblxuY29uc3QgJHdpbmRvdyA9IGpRdWVyeSh3aW5kb3cpO1xuY29uc3Qgb25TdGF0ZUNoYW5nZWQgPSBmdW5jdGlvbiAoaXRlbSwgdGhhdCkge1xuICBpZiAoaXRlbSAmJiBpdGVtLm9uU3RhdGVDaGFuZ2VkKSB7XG4gICAgaXRlbS5vblN0YXRlQ2hhbmdlZC5jYWxsKHRoYXQsIHRoYXQpO1xuICB9XG4gIGVsc2UgaWYgKHRoaXMub25TdGF0ZUNoYW5nZWQpIHtcbiAgICB0aGlzLm9uU3RhdGVDaGFuZ2VkLmNhbGwodGhhdCwgdGhhdCk7XG4gIH1cblxuICBpZiAodGhhdC5zdGF0ZSA9PSBcImNoYW5nZVZhbHVlXCIpIHtcbiAgICBpZiAoaXRlbSAmJiBpdGVtLm9uQ2hhbmdlKSB7XG4gICAgICBpdGVtLm9uQ2hhbmdlLmNhbGwodGhhdCwgdGhhdCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMub25DaGFuZ2UpIHtcbiAgICAgIHRoaXMub25DaGFuZ2UuY2FsbCh0aGF0LCB0aGF0KTtcbiAgICB9XG4gIH1cblxuICBpdGVtID0gbnVsbDtcbiAgdGhhdCA9IG51bGw7XG4gIHJldHVybiB0cnVlO1xufTtcbmNvbnN0IGFsaWduU2VsZWN0RGlzcGxheSA9IGZ1bmN0aW9uICgpIHtcbiAgbGV0IGkgPSB0aGlzLnF1ZXVlLmxlbmd0aCwgdztcbiAgd2hpbGUgKGktLSkge1xuICAgIGlmICh0aGlzLnF1ZXVlW2ldLiRkaXNwbGF5KSB7XG4gICAgICB3ID0gTWF0aC5tYXgodGhpcy5xdWV1ZVtpXS4kc2VsZWN0Lm91dGVyV2lkdGgoKSwgVS5udW1iZXIodGhpcy5xdWV1ZVtpXS5taW5XaWR0aCkpO1xuICAgICAgdGhpcy5xdWV1ZVtpXS4kZGlzcGxheS5jc3Moe1xuICAgICAgICBcIm1pbi13aWR0aFwiOiB3XG4gICAgICB9KTtcbiAgICAgIGlmICh0aGlzLnF1ZXVlW2ldLnJlc2V0KSB7XG4gICAgICAgIHRoaXMucXVldWVbaV0uJGRpc3BsYXkuZmluZChcIi5hZGRvbi1pY29uLXJlc2V0XCIpLmNzcyh7XG4gICAgICAgICAgXCJsaW5lLWhlaWdodFwiOiB0aGlzLnF1ZXVlW2ldLiRkaXNwbGF5LmhlaWdodCgpICsgXCJweFwiXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGkgPSBudWxsO1xuICB3ID0gbnVsbDtcbiAgcmV0dXJuIHRoaXM7XG59O1xuY29uc3QgYWxpZ25TZWxlY3RPcHRpb25Hcm91cCA9IGZ1bmN0aW9uIChhcHBlbmQpIHtcbiAgaWYgKCF0aGlzLmFjdGl2ZVNlbGVjdE9wdGlvbkdyb3VwKSByZXR1cm4gdGhpcztcblxuICBsZXQgaXRlbSA9IHRoaXMucXVldWVbdGhpcy5hY3RpdmVTZWxlY3RRdWV1ZUluZGV4XSxcbiAgICBwb3MgPSB7fSwgcG9zaXRpb25NYXJnaW4gPSAwLFxuICAgIGRpbSA9IHt9LCBwaWNrZXJEaW0gPSB7fSxcbiAgICBwaWNrZXJEaXJlY3Rpb247XG5cbiAgaWYgKGFwcGVuZCkgalF1ZXJ5KGRvY3VtZW50LmJvZHkpLmFwcGVuZCh0aGlzLmFjdGl2ZVNlbGVjdE9wdGlvbkdyb3VwKTtcblxuICBwb3MgPSBpdGVtLiR0YXJnZXQub2Zmc2V0KCk7XG4gIGRpbSA9IHtcbiAgICB3aWR0aDogaXRlbS4kdGFyZ2V0Lm91dGVyV2lkdGgoKSxcbiAgICBoZWlnaHQ6IGl0ZW0uJHRhcmdldC5vdXRlckhlaWdodCgpXG4gIH07XG4gIHBpY2tlckRpbSA9IHtcbiAgICB3aW5XaWR0aDogTWF0aC5tYXgoJHdpbmRvdy53aWR0aCgpLCBqUXVlcnkoZG9jdW1lbnQuYm9keSkud2lkdGgoKSksXG4gICAgd2luSGVpZ2h0OiBNYXRoLm1heCgkd2luZG93LmhlaWdodCgpLCBqUXVlcnkoZG9jdW1lbnQuYm9keSkuaGVpZ2h0KCkpLFxuICAgIHdpZHRoOiB0aGlzLmFjdGl2ZVNlbGVjdE9wdGlvbkdyb3VwLm91dGVyV2lkdGgoKSxcbiAgICBoZWlnaHQ6IHRoaXMuYWN0aXZlU2VsZWN0T3B0aW9uR3JvdXAub3V0ZXJIZWlnaHQoKVxuICB9O1xuXG4gIC8vIHBpY2tlciBjc3Mod2lkdGgsIGxlZnQsIHRvcCkgJiBkaXJlY3Rpb24g6rKw7KCVXG4gIGlmICghaXRlbS5kaXJlY3Rpb24gfHwgaXRlbS5kaXJlY3Rpb24gPT09IFwiXCIgfHwgaXRlbS5kaXJlY3Rpb24gPT09IFwiYXV0b1wiKSB7XG4gICAgLy8gc2V0IGRpcmVjdGlvblxuICAgIHBpY2tlckRpcmVjdGlvbiA9IFwidG9wXCI7XG5cbiAgICBpZiAocG9zLnRvcCAtIHBpY2tlckRpbS5oZWlnaHQgLSBwb3NpdGlvbk1hcmdpbiA8IDApIHtcbiAgICAgIHBpY2tlckRpcmVjdGlvbiA9IFwidG9wXCI7XG4gICAgfSBlbHNlIGlmIChwb3MudG9wICsgZGltLmhlaWdodCArIHBpY2tlckRpbS5oZWlnaHQgKyBwb3NpdGlvbk1hcmdpbiA+IHBpY2tlckRpbS53aW5IZWlnaHQpIHtcbiAgICAgIHBpY2tlckRpcmVjdGlvbiA9IFwiYm90dG9tXCI7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHBpY2tlckRpcmVjdGlvbiA9IGl0ZW0uZGlyZWN0aW9uO1xuICB9XG4gIC8vIHRvZG8gOiDtkZztmITtlaAg6rO16rCE7J20IOyXhuuLpOuptC4uXG4gIGlmIChhcHBlbmQpIHtcbiAgICB0aGlzLmFjdGl2ZVNlbGVjdE9wdGlvbkdyb3VwXG4gICAgICAuYWRkQ2xhc3MoXCJkaXJlY3Rpb24tXCIgKyBwaWNrZXJEaXJlY3Rpb24pO1xuICB9XG4gIHRoaXMuYWN0aXZlU2VsZWN0T3B0aW9uR3JvdXBcbiAgICAuY3NzKChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAocGlja2VyRGlyZWN0aW9uID09IFwidG9wXCIpIHtcbiAgICAgICAgaWYgKHBvcy50b3AgKyBkaW0uaGVpZ2h0ICsgcGlja2VyRGltLmhlaWdodCArIHBvc2l0aW9uTWFyZ2luID4gcGlja2VyRGltLndpbkhlaWdodCkge1xuXG4gICAgICAgICAgdmFyIG5ld1RvcCA9IHBvcy50b3AgKyBkaW0uaGVpZ2h0IC8gMiAtIHBpY2tlckRpbS5oZWlnaHQgLyAyO1xuICAgICAgICAgIGlmIChuZXdUb3AgKyBwaWNrZXJEaW0uaGVpZ2h0ICsgcG9zaXRpb25NYXJnaW4gPiBwaWNrZXJEaW0ud2luSGVpZ2h0KSB7XG4gICAgICAgICAgICBuZXdUb3AgPSAwO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobmV3VG9wIDwgMCkge1xuICAgICAgICAgICAgbmV3VG9wID0gMDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbGVmdDogcG9zLmxlZnQsXG4gICAgICAgICAgICB0b3A6IG5ld1RvcCxcbiAgICAgICAgICAgIHdpZHRoOiBkaW0ud2lkdGhcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBsZWZ0OiBwb3MubGVmdCxcbiAgICAgICAgICB0b3A6IHBvcy50b3AgKyBkaW0uaGVpZ2h0ICsgMSxcbiAgICAgICAgICB3aWR0aDogZGltLndpZHRoXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHBpY2tlckRpcmVjdGlvbiA9PSBcImJvdHRvbVwiKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbGVmdDogcG9zLmxlZnQsXG4gICAgICAgICAgdG9wOiBwb3MudG9wIC0gcGlja2VyRGltLmhlaWdodCAtIDEsXG4gICAgICAgICAgd2lkdGg6IGRpbS53aWR0aFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSkuY2FsbCh0aGlzKSk7XG59O1xuY29uc3Qgb25Cb2R5Q2xpY2sgPSBmdW5jdGlvbiAoZSwgdGFyZ2V0KSB7XG4gIGlmICghdGhpcy5hY3RpdmVTZWxlY3RPcHRpb25Hcm91cCkgcmV0dXJuIHRoaXM7XG5cbiAgbGV0IGl0ZW0gPSB0aGlzLnF1ZXVlW3RoaXMuYWN0aXZlU2VsZWN0UXVldWVJbmRleF0sXG4gICAgY2xpY2tFbCA9IFwiZGlzcGxheVwiO1xuXG4gIHRhcmdldCA9IFUuZmluZFBhcmVudE5vZGUoZS50YXJnZXQsIGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICBpZiAodGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtb3B0aW9uLXZhbHVlXCIpIHx8IHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLW9wdGlvbi12YWx1ZVwiKSA9PSBcIlwiKSB7XG4gICAgICBjbGlja0VsID0gXCJvcHRpb25JdGVtXCI7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXRlbS4kdGFyZ2V0LmdldCgwKSA9PSB0YXJnZXQpIHtcbiAgICAgIGNsaWNrRWwgPSBcImRpc3BsYXlcIjtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgZWxzZSBpZiAoY2xpY2tFbCA9PT0gXCJvcHRpb25JdGVtXCIpIHtcbiAgICB0aGlzLnZhbChpdGVtLmlkLCB7XG4gICAgICBpbmRleDoge1xuICAgICAgICBnaW5kZXg6IHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLW9wdGlvbi1ncm91cC1pbmRleFwiKSxcbiAgICAgICAgaW5kZXg6IHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLW9wdGlvbi1pbmRleFwiKVxuICAgICAgfVxuICAgIH0sIHVuZGVmaW5lZCwgXCJpbnRlcm5hbFwiKTtcbiAgICBpdGVtLiRzZWxlY3QudHJpZ2dlcihcImNoYW5nZVwiKTtcbiAgICBpdGVtLiRkaXNwbGF5LmZvY3VzKCk7XG4gICAgaWYgKCFpdGVtLm11bHRpcGxlKSB0aGlzLmNsb3NlKCk7XG4gIH1cbiAgZWxzZSB7XG4gICAgLy9vcGVuIGFuZCBkaXNwbGF5IGNsaWNrXG4gICAgLy9jb25zb2xlLmxvZyh0aGlzLmluc3RhbmNlSWQpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuY29uc3Qgb25Cb2R5S2V5dXAgPSBmdW5jdGlvbiAoZSkge1xuICBpZiAoZS5rZXlDb2RlID09IGluZm8uZXZlbnRLZXlzLkVTQykge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuICBlbHNlIGlmIChlLndoaWNoID09IGluZm8uZXZlbnRLZXlzLlJFVFVSTikge1xuICAgIGlmICh0aGlzLnF1ZXVlW3RoaXMuYWN0aXZlU2VsZWN0UXVldWVJbmRleF0ub3B0aW9uRm9jdXNJbmRleCA+IC0xKSB7IC8vIOyVhOydtO2FnOyXkCDtj6zsu6TsiqTqsIAg7Zmc7ISx7ZmUIOuQnCDtm4QsIOuniOyasOyKpCDsnbTrsqTtirgg7J2066m0IOustOyLnFxuICAgICAgbGV0ICRvcHRpb24gPSB0aGlzLmFjdGl2ZVNlbGVjdE9wdGlvbkdyb3VwLmZpbmQoJ1tkYXRhLW9wdGlvbi1mb2N1cy1pbmRleD1cIicgKyB0aGlzLnF1ZXVlW3RoaXMuYWN0aXZlU2VsZWN0UXVldWVJbmRleF0ub3B0aW9uRm9jdXNJbmRleCArICdcIl0nKTtcbiAgICAgIHRoaXMudmFsKHRoaXMucXVldWVbdGhpcy5hY3RpdmVTZWxlY3RRdWV1ZUluZGV4XS5pZCwge1xuICAgICAgICBpbmRleDoge1xuICAgICAgICAgIGdpbmRleDogJG9wdGlvbi5hdHRyKFwiZGF0YS1vcHRpb24tZ3JvdXAtaW5kZXhcIiksXG4gICAgICAgICAgaW5kZXg6ICRvcHRpb24uYXR0cihcImRhdGEtb3B0aW9uLWluZGV4XCIpXG4gICAgICAgIH1cbiAgICAgIH0sIHVuZGVmaW5lZCwgXCJpbnRlcm5hbFwiKTtcbiAgICAgIHRoaXMucXVldWVbdGhpcy5hY3RpdmVTZWxlY3RRdWV1ZUluZGV4XS4kc2VsZWN0LnRyaWdnZXIoXCJjaGFuZ2VcIik7XG4gICAgICBpZiAoIXRoaXMucXVldWVbdGhpcy5hY3RpdmVTZWxlY3RRdWV1ZUluZGV4XS5tdWx0aXBsZSkgdGhpcy5jbG9zZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfVxuICB9XG59O1xuY29uc3QgZ2V0TGFiZWwgPSBmdW5jdGlvbiAocXVlSWR4KSB7XG4gIGxldCBpdGVtID0gdGhpcy5xdWV1ZVtxdWVJZHhdLFxuICAgIGxhYmVscyA9IFtdO1xuXG4gIGlmIChVLmlzQXJyYXkoaXRlbS5zZWxlY3RlZCkgJiYgaXRlbS5zZWxlY3RlZC5sZW5ndGggPiAwKSB7XG4gICAgaXRlbS5zZWxlY3RlZC5mb3JFYWNoKGZ1bmN0aW9uIChuKSB7XG4gICAgICBpZiAobi5zZWxlY3RlZCkgbGFiZWxzLnB1c2gobltpdGVtLmNvbHVtbktleXMub3B0aW9uVGV4dF0pO1xuICAgIH0pO1xuICB9XG4gIGVsc2Uge1xuICAgIGlmICghaXRlbS5tdWx0aXBsZSAmJiBpdGVtLm9wdGlvbnMgJiYgaXRlbS5vcHRpb25zWzBdKSB7XG4gICAgICBpZiAoaXRlbS5vcHRpb25zWzBdLm9wdGdyb3VwKSB7XG4gICAgICAgIGxhYmVsc1swXSA9IGl0ZW0ub3B0aW9uc1swXS5vcHRpb25zWzBdW2l0ZW0uY29sdW1uS2V5cy5vcHRpb25UZXh0XTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBsYWJlbHNbMF0gPSBpdGVtLm9wdGlvbnNbMF1baXRlbS5jb2x1bW5LZXlzLm9wdGlvblRleHRdO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGxhYmVsc1swXSA9IGl0ZW0ubGFuZy5ub1NlbGVjdGVkO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAoZnVuY3Rpb24gKCkge1xuICAgIGlmIChpdGVtLm11bHRpcGxlICYmIGxhYmVscy5sZW5ndGggPiAxKSB7XG4gICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgbGFiZWw6IGxhYmVsc1swXSxcbiAgICAgICAgbGVuZ3RoOiBsYWJlbHMubGVuZ3RoIC0gMVxuICAgICAgfTtcbiAgICAgIHJldHVybiBtdXN0YWNoZS5yZW5kZXIoaXRlbS5sYW5nLm11bHRpcGxlTGFiZWwsIGRhdGEpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiBsYWJlbHNbMF07XG4gICAgfVxuICB9KSgpO1xufTtcbmNvbnN0IHN5bmNMYWJlbCA9IGZ1bmN0aW9uIChxdWVJZHgpIHtcbiAgdGhpcy5xdWV1ZVtxdWVJZHhdLiRkaXNwbGF5TGFiZWxcbiAgICAuaHRtbChnZXRMYWJlbC5jYWxsKHRoaXMsIHF1ZUlkeCkpO1xufTtcbmNvbnN0IGZvY3VzV29yZCA9IGZ1bmN0aW9uIChxdWVJZHgsIHNlYXJjaFdvcmQpIHtcbiAgbGV0IG9wdGlvbnMgPSBbXSwgaSA9IC0xLCBsID0gdGhpcy5xdWV1ZVtxdWVJZHhdLmluZGV4ZWRPcHRpb25zLmxlbmd0aCAtIDEsIG47XG4gIGlmIChzZWFyY2hXb3JkKSB7XG4gICAgd2hpbGUgKGwgLSBpKyspIHtcbiAgICAgIG4gPSB0aGlzLnF1ZXVlW3F1ZUlkeF0uaW5kZXhlZE9wdGlvbnNbaV07XG4gICAgICBpZiAoKCcnICsgbi52YWx1ZSkudG9Mb3dlckNhc2UoKSA9PSBzZWFyY2hXb3JkLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgb3B0aW9ucyA9IFt7J0BmaW5kZXgnOiBuWydAZmluZGV4J10sIG9wdGlvbnNTb3J0OiAwfV07XG4gICAgICAgIGJyZWFrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHNvcnQgPSAoJycgKyBuLnZhbHVlKS50b0xvd2VyQ2FzZSgpLnNlYXJjaChzZWFyY2hXb3JkLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICBpZiAoc29ydCA+IC0xKSB7XG4gICAgICAgICAgb3B0aW9ucy5wdXNoKHsnQGZpbmRleCc6IG5bJ0BmaW5kZXgnXSwgb3B0aW9uc1NvcnQ6IHNvcnR9KTtcbiAgICAgICAgICBpZiAob3B0aW9ucy5sZW5ndGggPiAyKSBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBzb3J0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgb3B0aW9ucy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gYS5vcHRpb25zU29ydCAtIGIub3B0aW9uc1NvcnQ7XG4gICAgfSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgZm9jdXNNb3ZlLmNhbGwodGhpcywgcXVlSWR4LCB1bmRlZmluZWQsIG9wdGlvbnNbMF1bJ0BmaW5kZXgnXSk7XG4gIH1cblxuICB0cnkge1xuICAgIHJldHVybiBvcHRpb25zO1xuICB9XG4gIGZpbmFsbHkge1xuICAgIG9wdGlvbnMgPSBudWxsO1xuICAgIGkgPSBudWxsO1xuICAgIGwgPSBudWxsO1xuICAgIG4gPSBudWxsO1xuICB9XG59O1xuY29uc3QgZm9jdXNNb3ZlID0gZnVuY3Rpb24gKHF1ZUlkeCwgZGlyZWN0aW9uLCBmaW5kZXgpIHtcbiAgbGV0IF9mb2N1c0luZGV4LFxuICAgIF9wcmV2Rm9jdXNJbmRleCxcbiAgICBmb2N1c09wdGlvbkVsLFxuICAgIG9wdGlvbkdyb3VwU2Nyb2xsQ29udGFpbmVyO1xuXG4gIGlmICh0aGlzLmFjdGl2ZVNlbGVjdE9wdGlvbkdyb3VwICYmIHRoaXMucXVldWVbcXVlSWR4XS5vcHRpb25zICYmIHRoaXMucXVldWVbcXVlSWR4XS5vcHRpb25zLmxlbmd0aCA+IDApIHtcblxuICAgIGlmICh0eXBlb2YgZmluZGV4ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBfZm9jdXNJbmRleCA9IGZpbmRleFxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIF9wcmV2Rm9jdXNJbmRleCA9ICh0aGlzLnF1ZXVlW3F1ZUlkeF0ub3B0aW9uRm9jdXNJbmRleCA9PSAtMSkgPyB0aGlzLnF1ZXVlW3F1ZUlkeF0ub3B0aW9uU2VsZWN0ZWRJbmRleCB8fCAtMSA6IHRoaXMucXVldWVbcXVlSWR4XS5vcHRpb25Gb2N1c0luZGV4O1xuICAgICAgaWYgKF9wcmV2Rm9jdXNJbmRleCA9PSAtMSkge1xuICAgICAgICBfZm9jdXNJbmRleCA9IChkaXJlY3Rpb24gPiAwKSA/IDAgOiB0aGlzLnF1ZXVlW3F1ZUlkeF0ub3B0aW9uSXRlbUxlbmd0aCAtIDE7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgX2ZvY3VzSW5kZXggPSBfcHJldkZvY3VzSW5kZXggKyBkaXJlY3Rpb247XG4gICAgICAgIGlmIChfZm9jdXNJbmRleCA8IDApIF9mb2N1c0luZGV4ID0gMDtcbiAgICAgICAgZWxzZSBpZiAoX2ZvY3VzSW5kZXggPiB0aGlzLnF1ZXVlW3F1ZUlkeF0ub3B0aW9uSXRlbUxlbmd0aCAtIDEpIF9mb2N1c0luZGV4ID0gdGhpcy5xdWV1ZVtxdWVJZHhdLm9wdGlvbkl0ZW1MZW5ndGggLSAxO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMucXVldWVbcXVlSWR4XS5vcHRpb25Gb2N1c0luZGV4ID0gX2ZvY3VzSW5kZXg7XG5cbiAgICB0aGlzLmFjdGl2ZVNlbGVjdE9wdGlvbkdyb3VwXG4gICAgICAuZmluZCgnW2RhdGEtb3B0aW9uLWZvY3VzLWluZGV4XScpXG4gICAgICAucmVtb3ZlQ2xhc3MoXCJob3ZlclwiKTtcblxuICAgIGZvY3VzT3B0aW9uRWwgPSB0aGlzLmFjdGl2ZVNlbGVjdE9wdGlvbkdyb3VwXG4gICAgICAuZmluZCgnW2RhdGEtb3B0aW9uLWZvY3VzLWluZGV4PVwiJyArIF9mb2N1c0luZGV4ICsgJ1wiXScpXG4gICAgICAuYWRkQ2xhc3MoXCJob3ZlclwiKTtcblxuICAgIG9wdGlvbkdyb3VwU2Nyb2xsQ29udGFpbmVyID0gdGhpcy5hY3RpdmVTZWxlY3RPcHRpb25Hcm91cC5maW5kKCdbZGF0YS1lbHM9XCJjb250ZW50XCJdJyk7XG5cbiAgICBsZXQgZm9jdXNPcHRpb25FbEhlaWdodCA9IGZvY3VzT3B0aW9uRWwub3V0ZXJIZWlnaHQoKSxcbiAgICAgIG9wdGlvbkdyb3VwU2Nyb2xsQ29udGFpbmVySGVpZ2h0ID0gb3B0aW9uR3JvdXBTY3JvbGxDb250YWluZXIuaW5uZXJIZWlnaHQoKSxcbiAgICAgIG9wdGlvbkdyb3VwU2Nyb2xsQ29udGFpbmVyU2Nyb2xsVG9wID0gb3B0aW9uR3JvdXBTY3JvbGxDb250YWluZXIuc2Nyb2xsVG9wKCksXG4gICAgICBmb2N1c09wdGlvbkVsVG9wID0gZm9jdXNPcHRpb25FbC5wb3NpdGlvbigpLnRvcCArIG9wdGlvbkdyb3VwU2Nyb2xsQ29udGFpbmVyLnNjcm9sbFRvcCgpO1xuXG4gICAgaWYgKG9wdGlvbkdyb3VwU2Nyb2xsQ29udGFpbmVySGVpZ2h0ICsgb3B0aW9uR3JvdXBTY3JvbGxDb250YWluZXJTY3JvbGxUb3AgPCBmb2N1c09wdGlvbkVsVG9wICsgZm9jdXNPcHRpb25FbEhlaWdodCkge1xuICAgICAgb3B0aW9uR3JvdXBTY3JvbGxDb250YWluZXIuc2Nyb2xsVG9wKGZvY3VzT3B0aW9uRWxUb3AgKyBmb2N1c09wdGlvbkVsSGVpZ2h0IC0gb3B0aW9uR3JvdXBTY3JvbGxDb250YWluZXJIZWlnaHQpO1xuICAgIH1cbiAgICBlbHNlIGlmIChvcHRpb25Hcm91cFNjcm9sbENvbnRhaW5lclNjcm9sbFRvcCA+IGZvY3VzT3B0aW9uRWxUb3ApIHtcbiAgICAgIG9wdGlvbkdyb3VwU2Nyb2xsQ29udGFpbmVyLnNjcm9sbFRvcChmb2N1c09wdGlvbkVsVG9wKTtcbiAgICB9XG4gICAgLy8gb3B0aW9uR3JvdXAgc2Nyb2xsIGNoZWNrXG4gIH1cbn07XG5jb25zdCBiaW5kU2VsZWN0VGFyZ2V0ID0gZnVuY3Rpb24gKHF1ZUlkeCkge1xuICBjb25zdCBzZWxlY3RFdmVudCA9IHtcbiAgICAnY2xpY2snOiBmdW5jdGlvbiAocXVlSWR4LCBlKSB7XG4gICAgICBsZXQgdGFyZ2V0ID0gVS5maW5kUGFyZW50Tm9kZShlLnRhcmdldCwgZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICBpZiAodGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtc2VsZWN0ZWQtY2xlYXJcIikpIHtcbiAgICAgICAgICAvL2NsaWNrRWwgPSBcImNsZWFyXCI7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgIHRoaXMudmFsKHF1ZUlkeCwge2NsZWFyOiB0cnVlfSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlU2VsZWN0UXVldWVJbmRleCA9PSBxdWVJZHgpIHtcbiAgICAgICAgICBpZiAodGhpcy5xdWV1ZVtxdWVJZHhdLm9wdGlvbkZvY3VzSW5kZXggPT0gLTEpIHsgLy8g7JWE7J207YWc7JeQIO2PrOy7pOyKpOqwgCDtmZzshLHtmZQg65CcIO2bhCwg66eI7Jqw7IqkIOydtOuypO2KuCDsnbTrqbQg66y07IucXG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHRoaXMub3BlbihxdWVJZHgpO1xuICAgICAgICAgIFUuc3RvcEV2ZW50KGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICAna2V5VXAnOiBmdW5jdGlvbiAocXVlSWR4LCBlKSB7XG4gICAgICBpZiAoZS53aGljaCA9PSBpbmZvLmV2ZW50S2V5cy5TUEFDRSkge1xuICAgICAgICBzZWxlY3RFdmVudC5jbGljay5jYWxsKHRoaXMsIHF1ZUlkeCwgZSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICghY3RybEtleXNbZS53aGljaF0pIHtcbiAgICAgICAgLy8g7IKs7Jqp7J6QIOyeheugpeydtCDrnLjtlbTsp4DrqbQg7LC+6rOgIOqygOyDiSDqsJIg7KCc6rGwLi4uXG4gICAgICAgIFUuZGVib3VuY2UoZnVuY3Rpb24gKHNlYXJjaFdvcmQsIHF1ZUlkeCkge1xuICAgICAgICAgIGZvY3VzV29yZC5jYWxsKHRoaXMsIHF1ZUlkeCwgc2VhcmNoV29yZCk7XG4gICAgICAgICAgdGhpcy5xdWV1ZVtxdWVJZHhdLiRkaXNwbGF5SW5wdXQudmFsKCcnKTtcbiAgICAgICAgfSwgMzAwKS5jYWxsKHRoaXMsIHRoaXMucXVldWVbcXVlSWR4XS4kZGlzcGxheUlucHV0LnZhbCgpLCBxdWVJZHgpO1xuICAgICAgfVxuICAgIH0sXG4gICAgJ2tleURvd24nOiBmdW5jdGlvbiAocXVlSWR4LCBlKSB7XG4gICAgICBpZiAoZS53aGljaCA9PSBpbmZvLmV2ZW50S2V5cy5ET1dOKSB7XG4gICAgICAgIGZvY3VzTW92ZS5jYWxsKHRoaXMsIHF1ZUlkeCwgMSk7XG4gICAgICAgIFUuc3RvcEV2ZW50KGUpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoZS53aGljaCA9PSBpbmZvLmV2ZW50S2V5cy5VUCkge1xuICAgICAgICBmb2N1c01vdmUuY2FsbCh0aGlzLCBxdWVJZHgsIC0xKTtcbiAgICAgICAgVS5zdG9wRXZlbnQoZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICAnYmx1cic6IGZ1bmN0aW9uIChxdWVJZHgsIGUpIHtcblxuICAgIH0sXG4gICAgJ3NlbGVjdENoYW5nZSc6IGZ1bmN0aW9uIChxdWVJZHgsIGUpIHtcbiAgICAgIHRoaXMudmFsKHF1ZUlkeCwgdGhpcy5xdWV1ZVtxdWVJZHhdLiRzZWxlY3QudmFsKCksIHRydWUpO1xuICAgIH1cbiAgfTtcblxuICBsZXQgaXRlbSA9IHRoaXMucXVldWVbcXVlSWR4XSwgZGF0YSA9IHt9O1xuXG4gIC8vIGZpbmQgc2VsZWN0ZWRcbiAgaXRlbS5zZWxlY3RlZCA9IFtdO1xuICBpZiAoIWl0ZW0ub3B0aW9ucykgaXRlbS5vcHRpb25zID0gW107XG4gIGl0ZW0ub3B0aW9ucy5mb3JFYWNoKChuKSA9PiB7XG4gICAgaWYgKG5bdGhpcy5jb25maWcuY29sdW1uS2V5cy5vcHRpb25TZWxlY3RlZF0pIGl0ZW0uc2VsZWN0ZWQucHVzaChqUXVlcnkuZXh0ZW5kKHt9LCBuKSk7XG4gIH0pO1xuXG4gIGlmICghaXRlbS4kZGlzcGxheSkge1xuICAgIC8vLyDthZztlIzrpr/sl5Ag7KCE64us7ZWgIOyYpOu4jOygne2KuCDshKDslrhcbiAgICBkYXRhLmluc3RhbmNlSWQgPSB0aGlzLmluc3RhbmNlSWQ7XG4gICAgZGF0YS5pZCA9IGl0ZW0uaWQ7XG4gICAgZGF0YS5uYW1lID0gaXRlbS5uYW1lO1xuICAgIGRhdGEudGhlbWUgPSBpdGVtLnRoZW1lO1xuICAgIGRhdGEudGFiSW5kZXggPSBpdGVtLnRhYkluZGV4O1xuICAgIGRhdGEubXVsdGlwbGUgPSBpdGVtLm11bHRpcGxlO1xuICAgIGRhdGEucmVzZXQgPSBpdGVtLnJlc2V0O1xuICAgIGRhdGEuaGVpZ2h0ID0gaXRlbS5oZWlnaHQ7XG4gICAgZGF0YS5sYWJlbCA9IGdldExhYmVsLmNhbGwodGhpcywgcXVlSWR4KTtcblxuICAgIGl0ZW0uJGRpc3BsYXkgPSBqUXVlcnkobXVzdGFjaGUucmVuZGVyKHRtcGwuZGlzcGxheS5jYWxsKHRoaXMpLCBkYXRhKSk7XG4gICAgLy9pdGVtLiRkaXNwbGF5LmNzcyh7aGVpZ2h0OiBpdGVtLmhlaWdodH0pO1xuICAgIGl0ZW0uJGRpc3BsYXlMYWJlbCA9IGl0ZW0uJGRpc3BsYXkuZmluZCgnW2RhdGEtYXg2dWktc2VsZWN0LWRpc3BsYXk9XCJsYWJlbFwiXScpO1xuXG4gICAgaWYgKGl0ZW0uJHRhcmdldC5maW5kKFwic2VsZWN0XCIpLmdldCgwKSkge1xuICAgICAgaXRlbS4kc2VsZWN0ID0gaXRlbS4kdGFyZ2V0LmZpbmQoXCJzZWxlY3RcIik7XG4gICAgICAvLyBzZWxlY3Qg7IaN7ISx66eMIOuzgOqyvVxuICAgICAgaXRlbS4kc2VsZWN0XG4gICAgICAgIC5hdHRyKFwidGFiaW5kZXhcIiwgXCItMVwiKVxuICAgICAgICAuY3NzKHtoZWlnaHQ6IGRhdGEuaGVpZ2h0fSk7XG5cbiAgICAgIGlmIChkYXRhLm5hbWUpIHtcbiAgICAgICAgaXRlbS4kc2VsZWN0LmF0dHIoXCJuYW1lXCIsIFwibmFtZVwiKTtcbiAgICAgIH1cbiAgICAgIGlmIChkYXRhLm11bHRpcGxlKSB7XG4gICAgICAgIGl0ZW0uJHNlbGVjdC5hdHRyKFwibXVsdGlwbGVcIiwgXCJtdWx0aXBsZVwiKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpdGVtLiRzZWxlY3QgPSBqUXVlcnkobXVzdGFjaGUucmVuZGVyKHRtcGwuc2VsZWN0LmNhbGwodGhpcyksIGRhdGEpKTtcbiAgICAgIGl0ZW0uJHRhcmdldC5hcHBlbmQoaXRlbS4kc2VsZWN0KTtcbiAgICAgIC8vIHNlbGVjdCBhcHBlbmRcbiAgICB9XG5cbiAgICBpdGVtLiR0YXJnZXQuYXBwZW5kKGl0ZW0uJGRpc3BsYXkpO1xuICAgIGl0ZW0uJGRpc3BsYXlJbnB1dCA9IGl0ZW0uJGRpc3BsYXkuZmluZCgnW2RhdGEtYXg2dWktc2VsZWN0LWRpc3BsYXk9XCJpbnB1dFwiXScpOyAvLyDsgqzsmqnsnpAg7J6F66Cl6rCS7J2EIOuwm+q4sOychO2VnCDsiKjsnYwg7J6F66Cl7ZWE65OcXG4gICAgaXRlbS5vcHRpb25zID0gc3luY1NlbGVjdE9wdGlvbnMuY2FsbCh0aGlzLCBxdWVJZHgsIGl0ZW0ub3B0aW9ucyk7XG5cbiAgICBhbGlnblNlbGVjdERpc3BsYXkuY2FsbCh0aGlzKTtcblxuICAgIGl0ZW0uJGRpc3BsYXlJbnB1dFxuICAgICAgLm9mZihcImJsdXIuYXg2dWktc2VsZWN0XCIpXG4gICAgICAub24oXCJibHVyLmF4NnVpLXNlbGVjdFwiLCBzZWxlY3RFdmVudC5ibHVyLmJpbmQodGhpcywgcXVlSWR4KSlcbiAgICAgIC5vZmYoJ2tleXVwLmF4NnVpLXNlbGVjdCcpXG4gICAgICAub24oJ2tleXVwLmF4NnVpLXNlbGVjdCcsIHNlbGVjdEV2ZW50LmtleVVwLmJpbmQodGhpcywgcXVlSWR4KSlcbiAgICAgIC5vZmYoXCJrZXlkb3duLmF4NnVpLXNlbGVjdFwiKVxuICAgICAgLm9uKFwia2V5ZG93bi5heDZ1aS1zZWxlY3RcIiwgc2VsZWN0RXZlbnQua2V5RG93bi5iaW5kKHRoaXMsIHF1ZUlkeCkpO1xuICB9XG4gIGVsc2Uge1xuICAgIGl0ZW0uJGRpc3BsYXlMYWJlbFxuICAgICAgLmh0bWwoZ2V0TGFiZWwuY2FsbCh0aGlzLCBxdWVJZHgpKTtcbiAgICBpdGVtLm9wdGlvbnMgPSBzeW5jU2VsZWN0T3B0aW9ucy5jYWxsKHRoaXMsIHF1ZUlkeCwgaXRlbS5vcHRpb25zKTtcblxuICAgIGFsaWduU2VsZWN0RGlzcGxheS5jYWxsKHRoaXMpO1xuICB9XG5cbiAgaXRlbS4kZGlzcGxheVxuICAgIC5vZmYoJ2NsaWNrLmF4NnVpLXNlbGVjdCcpXG4gICAgLm9uKCdjbGljay5heDZ1aS1zZWxlY3QnLCBzZWxlY3RFdmVudC5jbGljay5iaW5kKHRoaXMsIHF1ZUlkeCkpXG4gICAgLm9mZigna2V5dXAuYXg2dWktc2VsZWN0JylcbiAgICAub24oJ2tleXVwLmF4NnVpLXNlbGVjdCcsIHNlbGVjdEV2ZW50LmtleVVwLmJpbmQodGhpcywgcXVlSWR4KSk7XG5cbiAgLy8gc2VsZWN0IO2DnOq3uOyXkCDrjIDtlZwgY2hhbmdlIOydtOuypO2KuCDqsJDsi5xcbiAgaXRlbS4kc2VsZWN0XG4gICAgLm9mZignY2hhbmdlLmF4NnVpLXNlbGVjdCcpXG4gICAgLm9uKCdjaGFuZ2UuYXg2dWktc2VsZWN0Jywgc2VsZWN0RXZlbnQuc2VsZWN0Q2hhbmdlLmJpbmQodGhpcywgcXVlSWR4KSk7XG5cbiAgZGF0YSA9IG51bGw7XG4gIGl0ZW0gPSBudWxsO1xuICBxdWVJZHggPSBudWxsO1xuICByZXR1cm4gdGhpcztcbn07XG5jb25zdCBzeW5jU2VsZWN0T3B0aW9ucyA9IGZ1bmN0aW9uIChxdWVJZHgsIG9wdGlvbnMpIHtcbiAgY29uc3Qgc2V0U2VsZWN0ZWQgPSBmdW5jdGlvbiAocXVlSWR4LCBPKSB7XG4gICAgaWYgKCFPKSB7XG4gICAgICB0aGlzLnF1ZXVlW3F1ZUlkeF0uc2VsZWN0ZWQgPSBbXTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpZiAodGhpcy5xdWV1ZVtxdWVJZHhdLm11bHRpcGxlKSB0aGlzLnF1ZXVlW3F1ZUlkeF0uc2VsZWN0ZWQucHVzaChqUXVlcnkuZXh0ZW5kKHt9LCBPKSk7XG4gICAgICBlbHNlIHRoaXMucXVldWVbcXVlSWR4XS5zZWxlY3RlZFswXSA9IGpRdWVyeS5leHRlbmQoe30sIE8pO1xuICAgIH1cbiAgfTtcblxuICBsZXQgaXRlbSA9IHRoaXMucXVldWVbcXVlSWR4XSxcbiAgICBwbywgZWxlbWVudE9wdGlvbnMsIG5ld09wdGlvbnMsIGZvY3VzSW5kZXggPSAwO1xuXG4gIHNldFNlbGVjdGVkLmNhbGwodGhpcywgcXVlSWR4LCBmYWxzZSk7IC8vIGl0ZW0uc2VsZWN0ZWQg7LSI6riw7ZmUXG5cbiAgaWYgKG9wdGlvbnMpIHtcbiAgICBpdGVtLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIGl0ZW0uaW5kZXhlZE9wdGlvbnMgPSBbXTtcblxuICAgIC8vIHNlbGVjdCBvcHRpb25zIO2DnOq3uCDsg53shLFcbiAgICBwbyA9IFtdO1xuICAgIGl0ZW0ub3B0aW9ucy5mb3JFYWNoKChPLCBPSW5kZXgpID0+IHtcbiAgICAgIGlmIChPLm9wdGdyb3VwKSB7XG5cbiAgICAgICAgT1snQGdpbmRleCddID0gT0luZGV4O1xuICAgICAgICBPLm9wdGlvbnMuZm9yRWFjaCgoT08sIE9PSW5kZXgpID0+IHtcbiAgICAgICAgICBPT1snQGluZGV4J10gPSBPT0luZGV4O1xuICAgICAgICAgIE9PWydAZmluZGV4J10gPSBmb2N1c0luZGV4O1xuICAgICAgICAgIHBvLnB1c2goJzxvcHRpb24gdmFsdWU9XCInICsgT09baXRlbS5jb2x1bW5LZXlzLm9wdGlvblZhbHVlXSArICdcIiAnXG4gICAgICAgICAgICArIChPT1tpdGVtLmNvbHVtbktleXMub3B0aW9uU2VsZWN0ZWRdID8gJyBzZWxlY3RlZD1cInNlbGVjdGVkXCInIDogJycpICsgJz4nXG4gICAgICAgICAgICArIE9PW2l0ZW0uY29sdW1uS2V5cy5vcHRpb25UZXh0XSArICc8L29wdGlvbj4nKTtcbiAgICAgICAgICBpZiAoT09baXRlbS5jb2x1bW5LZXlzLm9wdGlvblNlbGVjdGVkXSkge1xuICAgICAgICAgICAgc2V0U2VsZWN0ZWQuY2FsbCh0aGlzLCBxdWVJZHgsIE9PKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpdGVtLmluZGV4ZWRPcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgJ0BmaW5kZXgnOiBmb2N1c0luZGV4LCB2YWx1ZTogT09baXRlbS5jb2x1bW5LZXlzLm9wdGlvblZhbHVlXSwgdGV4dDogT09baXRlbS5jb2x1bW5LZXlzLm9wdGlvblRleHRdXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgZm9jdXNJbmRleCsrO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBPWydAaW5kZXgnXSA9IE9JbmRleDtcbiAgICAgICAgT1snQGZpbmRleCddID0gZm9jdXNJbmRleDtcbiAgICAgICAgcG8ucHVzaCgnPG9wdGlvbiB2YWx1ZT1cIicgKyBPW2l0ZW0uY29sdW1uS2V5cy5vcHRpb25WYWx1ZV0gKyAnXCIgJ1xuICAgICAgICAgICsgKE9baXRlbS5jb2x1bW5LZXlzLm9wdGlvblNlbGVjdGVkXSA/ICcgc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiJyA6ICcnKSArICc+J1xuICAgICAgICAgICsgT1tpdGVtLmNvbHVtbktleXMub3B0aW9uVGV4dF0gKyAnPC9vcHRpb24+Jyk7XG4gICAgICAgIGlmIChPW2l0ZW0uY29sdW1uS2V5cy5vcHRpb25TZWxlY3RlZF0pIHtcbiAgICAgICAgICBzZXRTZWxlY3RlZC5jYWxsKHRoaXMsIHF1ZUlkeCwgTyk7XG4gICAgICAgIH1cblxuICAgICAgICBpdGVtLmluZGV4ZWRPcHRpb25zLnB1c2goe1xuICAgICAgICAgICdAZmluZGV4JzogZm9jdXNJbmRleCwgdmFsdWU6IE9baXRlbS5jb2x1bW5LZXlzLm9wdGlvblZhbHVlXSwgdGV4dDogT1tpdGVtLmNvbHVtbktleXMub3B0aW9uVGV4dF1cbiAgICAgICAgfSk7XG4gICAgICAgIGZvY3VzSW5kZXgrKztcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpdGVtLm9wdGlvbkl0ZW1MZW5ndGggPSBmb2N1c0luZGV4O1xuICAgIGl0ZW0uJHNlbGVjdC5odG1sKHBvLmpvaW4oJycpKTtcbiAgfVxuICBlbHNlIHtcbiAgICAvLy8gc2VsZWN0ID4gb3B0aW9ucyDtg5zqt7jroZwg7Iqk7YGs66a97Yq4IG9wdGlvbnPrpbwg66eM65Ok7Ja07KO864qUIOyXre2VoFxuICAgIGVsZW1lbnRPcHRpb25zID0gVS50b0FycmF5KGl0ZW0uJHNlbGVjdC5nZXQoMCkub3B0aW9ucyk7XG4gICAgLy8gc2VsZWN0IG9wdGlvbiDsiqTtgazrpr3tirgg7IOd7ISxXG4gICAgbmV3T3B0aW9ucyA9IFtdO1xuICAgIGVsZW1lbnRPcHRpb25zLmZvckVhY2goKE8sIE9JbmRleCkgPT4ge1xuICAgICAgbGV0IG9wdGlvbiA9IHt9O1xuXG4gICAgICBvcHRpb25baXRlbS5jb2x1bW5LZXlzLm9wdGlvblZhbHVlXSA9IE8udmFsdWU7XG4gICAgICBvcHRpb25baXRlbS5jb2x1bW5LZXlzLm9wdGlvblRleHRdID0gTy50ZXh0O1xuICAgICAgb3B0aW9uW2l0ZW0uY29sdW1uS2V5cy5vcHRpb25TZWxlY3RlZF0gPSBPLnNlbGVjdGVkO1xuICAgICAgb3B0aW9uWydAaW5kZXgnXSA9IE9JbmRleDtcbiAgICAgIG9wdGlvblsnQGZpbmRleCddID0gT0luZGV4O1xuICAgICAgaWYgKE8uc2VsZWN0ZWQpIHNldFNlbGVjdGVkLmNhbGwodGhpcywgcXVlSWR4LCBvcHRpb24pO1xuICAgICAgbmV3T3B0aW9ucy5wdXNoKG9wdGlvbik7XG5cbiAgICAgIG9wdGlvbiA9IG51bGw7XG4gICAgfSk7XG4gICAgaXRlbS5vcHRpb25zID0gbmV3T3B0aW9ucztcbiAgICBpdGVtLmluZGV4ZWRPcHRpb25zID0gbmV3T3B0aW9ucztcbiAgfVxuXG4gIGlmICghaXRlbS5tdWx0aXBsZSAmJiBpdGVtLnNlbGVjdGVkLmxlbmd0aCA9PSAwICYmIGl0ZW0ub3B0aW9ucyAmJiBpdGVtLm9wdGlvbnNbMF0pIHtcbiAgICBpZiAoaXRlbS5vcHRpb25zWzBdLm9wdGdyb3VwKSB7XG4gICAgICBpdGVtLm9wdGlvbnNbMF0ub3B0aW9uc1swXVtpdGVtLmNvbHVtbktleXMub3B0aW9uU2VsZWN0ZWRdID0gdHJ1ZTtcbiAgICAgIGl0ZW0uc2VsZWN0ZWQucHVzaChqUXVlcnkuZXh0ZW5kKHt9LCBpdGVtLm9wdGlvbnNbMF0ub3B0aW9uc1swXSkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGl0ZW0ub3B0aW9uc1swXVtpdGVtLmNvbHVtbktleXMub3B0aW9uU2VsZWN0ZWRdID0gdHJ1ZTtcbiAgICAgIGl0ZW0uc2VsZWN0ZWQucHVzaChqUXVlcnkuZXh0ZW5kKHt9LCBpdGVtLm9wdGlvbnNbMF0pKTtcbiAgICB9XG4gIH1cblxuICBwbyA9IG51bGw7XG4gIGVsZW1lbnRPcHRpb25zID0gbnVsbDtcbiAgbmV3T3B0aW9ucyA9IG51bGw7XG4gIHJldHVybiBpdGVtLm9wdGlvbnM7XG59O1xuY29uc3QgZ2V0UXVlSWR4ID0gZnVuY3Rpb24gKGJvdW5kSUQpIHtcbiAgaWYgKCFVLmlzU3RyaW5nKGJvdW5kSUQpKSB7XG4gICAgYm91bmRJRCA9IGpRdWVyeShib3VuZElEKS5kYXRhKFwiZGF0YS1heDZ1aS1zZWxlY3QtaWRcIik7XG4gIH1cbiAgaWYgKCFVLmlzU3RyaW5nKGJvdW5kSUQpKSB7XG4gICAgY29uc29sZS5sb2coaW5mby5nZXRFcnJvcihcImF4NnVpLXNlbGVjdFwiLCBcIjQwMlwiLCBcImdldFF1ZUlkeFwiKSk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHJldHVybiBVLnNlYXJjaCh0aGlzLnF1ZXVlLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuaWQgPT0gYm91bmRJRDtcbiAgfSk7XG59O1xuLyogfn5+fn5+fn5+fn5+fn5+fn5+IGVuZCBvZiBwcml2YXRlICB+fn5+fn5+fn5+fn5+fn5+fn5+fiAqL1xuXG4vKipcbiAqIEBjbGFzc1xuICovXG5jbGFzcyBBWDZVSVNlbGVjdCBleHRlbmRzIEFYNlVJQ29yZSB7XG4gIC8qKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIGNvbmZpZ1xuICAgKi9cbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIC8qKlxuICAgICAqIEBtZW1iZXIge0pTT059XG4gICAgICogQHBhcmFtIGNvbmZpZ1xuICAgICAqIEBwYXJhbSBbY29uZmlnLnRoZW1lPSdkZWZhdWx0J11cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5hbmltYXRlVGltZT0xMDBdXG4gICAgICogQHBhcmFtIFtjb25maWcuaGVpZ2h0PTM0XVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmxhbmddIC0g66mU7IS47KeA65OkXG4gICAgICogQHBhcmFtIFtjb25maWcubGFuZy5ub1NlbGVjdGVkPScnXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmxhbmcubm9PcHRpb25zPSdubyBvcHRpb25zJ11cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5sYW5nLmxvYWRpbmc9J25vdyBsb2FkaW5nLi4nXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmxhbmcubXVsdGlwbGVMYWJlbD0nXCJ7e2xhYmVsfX1cIuyZuCB7e2xlbmd0aH196rG0J11cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5jb2x1bW5LZXlzXSAtIOuCtOu2gOyXkOyEnCDsgqzsmqkgSlNPTiBrZXkg7KCV7J2YXG4gICAgICogQHBhcmFtIFtjb25maWcuY29sdW1uS2V5cy5vcHRpb25WYWx1ZT0ndmFsdWUnXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmNvbHVtbktleXMub3B0aW9uVGV4dD0ndGV4dCddXG4gICAgICogQHBhcmFtIFtjb25maWcuY29sdW1uS2V5cy5vcHRpb25TZWxlY3RlZD0nc2VsZWN0ZWQnXVxuICAgICAqL1xuICAgIHRoaXMuY29uZmlnID0ge1xuICAgICAgdGhlbWU6ICdkZWZhdWx0JyxcbiAgICAgIGFuaW1hdGVUaW1lOiAxMDAsXG4gICAgICBoZWlnaHQ6IDM0LFxuICAgICAgbGFuZzoge1xuICAgICAgICBub1NlbGVjdGVkOiAnJyxcbiAgICAgICAgbm9PcHRpb25zOiAnbm8gb3B0aW9ucycsXG4gICAgICAgIGxvYWRpbmc6ICdub3cgbG9hZGluZy4uJyxcbiAgICAgICAgbXVsdGlwbGVMYWJlbDogJ1wie3tsYWJlbH19XCLsmbgge3tsZW5ndGh9feqxtCdcbiAgICAgIH0sXG4gICAgICBjb2x1bW5LZXlzOiB7XG4gICAgICAgIG9wdGlvblZhbHVlOiAndmFsdWUnLFxuICAgICAgICBvcHRpb25UZXh0OiAndGV4dCcsXG4gICAgICAgIG9wdGlvblNlbGVjdGVkOiAnc2VsZWN0ZWQnXG4gICAgICB9XG4gICAgfTtcbiAgICBqUXVlcnkuZXh0ZW5kKHRydWUsIHRoaXMuY29uZmlnLCBjb25maWcpO1xuXG4gICAgLy8g66mk67KEIOuzgOyImCDstIjquLDtmZRcbiAgICAvKipcbiAgICAgKiBiaW5k66W8IO2Gte2VtCDsl7DqsrDrkJwgc2VsZWN06rCAIOyggOyepeuQmOuKlCDrs4DsiJhcbiAgICAgKiBAbWVtYmVyIHtBcnJheX1cbiAgICAgKi9cbiAgICB0aGlzLnF1ZXVlID0gW107XG4gICAgLyoqXG4gICAgICogQG1lbWJlciB7T2JqZWN0fVxuICAgICAqL1xuICAgIHRoaXMuYWN0aXZlU2VsZWN0T3B0aW9uR3JvdXAgPSBudWxsO1xuICAgIC8qKlxuICAgICAqIEBtZW1iZXIge051bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLmFjdGl2ZVNlbGVjdFF1ZXVlSW5kZXggPSAtMTtcbiAgICAvKipcbiAgICAgKiBAbWVtYmVyIHtPYmplY3R9XG4gICAgICovXG4gICAgdGhpcy5vcGVuVGltZXIgPSBudWxsO1xuICAgIC8qKlxuICAgICAqIEBtZW1iZXIge09iamVjdH1cbiAgICAgKi9cbiAgICB0aGlzLmNsb3NlVGltZXIgPSBudWxsO1xuICAgIC8qKlxuICAgICAqIEBtZW1iZXIge0Z1bmN0aW9ufVxuICAgICAqL1xuICAgIHRoaXMud2FpdE9wdGlvbnNDYWxsYmFjayA9IG51bGw7XG4gICAgLyoqXG4gICAgICogQG1lbWJlciB7T2JqZWN0fVxuICAgICAqL1xuICAgIHRoaXMua2V5VXBUaW1lciA9IG51bGw7XG4gICAgLyoqXG4gICAgICogQG1lbWJlciB7T2JqZWN0fVxuICAgICAqL1xuICAgIHRoaXMueHZhciA9IHt9O1xuXG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAcGFyYW0gY29uZmlnXG4gICAqL1xuICBpbml0KCkge1xuICAgIHRoaXMub25TdGF0ZUNoYW5nZWQgPSB0aGlzLmNvbmZpZy5vblN0YXRlQ2hhbmdlZDtcbiAgICBkZWxldGUgdGhpcy5jb25maWcub25TdGF0ZUNoYW5nZWQ7XG4gICAgdGhpcy5vbkNoYW5nZSA9IHRoaXMuY29uZmlnLm9uQ2hhbmdlO1xuICAgIGRlbGV0ZSB0aGlzLmNvbmZpZy5vbkNoYW5nZTtcblxuICAgIC8vIGluaXQg7Zi47LacIOyXrOu2gFxuICAgIHRoaXMuaW5pdE9uY2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqL1xuICBpbml0T25jZSgpIHtcbiAgICBpZiAodGhpcy5pbml0aWFsaXplZCkgcmV0dXJuIHRoaXM7XG4gICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG5cbiAgICAvLyB0aHJvdHRsZWRSZXNpemVcbiAgICAkd2luZG93Lm9uKFwicmVzaXplLmF4NnVpLXNlbGVjdC1kaXNwbGF5LVwiICsgdGhpcy5pbnN0YW5jZUlkLCBVLnRocm90dGxlKGZ1bmN0aW9uIChlKSB7XG4gICAgICBhbGlnblNlbGVjdERpc3BsYXkuY2FsbCh0aGlzLCBlIHx8IHdpbmRvdy5ldmVudCk7XG4gICAgICBhbGlnblNlbGVjdE9wdGlvbkdyb3VwLmNhbGwodGhpcyk7XG4gICAgfSwgMTAwKS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBwYXJhbSBpdGVtXG4gICAqIEByZXR1cm4ge0FYNlVJU2VsZWN0fVxuICAgKi9cbiAgYmluZChpdGVtKSB7XG4gICAgbGV0IHF1ZUlkeDtcbiAgICBpdGVtID0galF1ZXJ5LmV4dGVuZCh0cnVlLCB7fSwgdGhpcy5jb25maWcsIGl0ZW0pO1xuXG4gICAgaWYgKCFpdGVtLnRhcmdldCkge1xuICAgICAgY29uc29sZS5sb2coaW5mby5nZXRFcnJvcihcImF4NnVpLXNlbGVjdFwiLCBcIjQwMVwiLCBcImJpbmRcIikpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGl0ZW0uJHRhcmdldCA9IGpRdWVyeShpdGVtLnRhcmdldCk7XG5cbiAgICBpZiAoIWl0ZW0uaWQpIGl0ZW0uaWQgPSBpdGVtLiR0YXJnZXQuZGF0YShcImRhdGEtYXg2dWktc2VsZWN0LWlkXCIpO1xuICAgIGlmICghaXRlbS5pZCkge1xuICAgICAgaXRlbS5pZCA9ICdheDZ1aS1zZWxlY3QtJyArIEFYNlVJQ29yZS5nZXRJbnN0YW5jZUlkKCk7XG4gICAgICBpdGVtLiR0YXJnZXQuZGF0YShcImRhdGEtYXg2dWktc2VsZWN0LWlkXCIsIGl0ZW0uaWQpO1xuICAgIH1cbiAgICBpdGVtLm5hbWUgPSBpdGVtLiR0YXJnZXQuYXR0cihcImRhdGEtYXg2dWktc2VsZWN0XCIpO1xuXG4gICAgaWYgKGl0ZW0ub3B0aW9ucykge1xuICAgICAgaXRlbS5vcHRpb25zID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShpdGVtLm9wdGlvbnMpKTtcbiAgICB9XG5cbiAgICAvLyB0YXJnZXQgYXR0cmlidXRlIGRhdGFcbiAgICAoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIGlmIChVLmlzT2JqZWN0KGRhdGEpICYmICFkYXRhLmVycm9yKSB7XG4gICAgICAgIGl0ZW0gPSBqUXVlcnkuZXh0ZW5kKHRydWUsIGl0ZW0sIGRhdGEpO1xuICAgICAgfVxuICAgIH0pKFUucGFyc2VKc29uKGl0ZW0uJHRhcmdldC5hdHRyKFwiZGF0YS1heDZ1aS1zZWxlY3QtY29uZmlnXCIpLCB0cnVlKSk7XG5cbiAgICBxdWVJZHggPSBVLnNlYXJjaCh0aGlzLnF1ZXVlLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5pZCA9PSBpdGVtLmlkO1xuICAgIH0pO1xuXG4gICAgaWYgKHF1ZUlkeCA9PT0gLTEpIHtcbiAgICAgIHRoaXMucXVldWUucHVzaChpdGVtKTtcbiAgICAgIGJpbmRTZWxlY3RUYXJnZXQuY2FsbCh0aGlzLCB0aGlzLnF1ZXVlLmxlbmd0aCAtIDEpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMucXVldWVbcXVlSWR4XS5zZWxlY3RlZCA9IFtdO1xuICAgICAgdGhpcy5xdWV1ZVtxdWVJZHhdLm9wdGlvbnMgPSBpdGVtLm9wdGlvbnM7XG4gICAgICB0aGlzLnF1ZXVlW3F1ZUlkeF0gPSBqUXVlcnkuZXh0ZW5kKHRydWUsIHt9LCB0aGlzLnF1ZXVlW3F1ZUlkeF0sIGl0ZW0pO1xuICAgICAgYmluZFNlbGVjdFRhcmdldC5jYWxsKHRoaXMsIHF1ZUlkeCk7XG4gICAgfVxuXG4gICAgcXVlSWR4ID0gbnVsbDtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAcGFyYW0gYm91bmRJRFxuICAgKiBAcGFyYW0gdHJ5Q291bnRcbiAgICogQHJldHVybiB7QVg2VUlTZWxlY3R9XG4gICAqL1xuICBvcGVuKGJvdW5kSUQsIHRyeUNvdW50KSB7XG4gICAgY29uc3Qgb25FeHBhbmQgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgaXRlbS5vbkV4cGFuZC5jYWxsKHtcbiAgICAgICAgc2VsZjogdGhpcyxcbiAgICAgICAgaXRlbTogaXRlbVxuICAgICAgfSwgTyA9PiB7XG4gICAgICAgIGlmICh0aGlzLndhaXRPcHRpb25zQ2FsbGJhY2spIHtcbiAgICAgICAgICBsZXQgZGF0YSA9IHt9O1xuICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5xdWV1ZVt0aGlzLmFjdGl2ZVNlbGVjdFF1ZXVlSW5kZXhdO1xuXG4gICAgICAgICAgLy8vIO2YhOyerCBzZWxlY3RlZCDqsoDspp3tm4Qg7LKY66asXG4gICAgICAgICAgKGZ1bmN0aW9uIChpdGVtLCBPKSB7XG4gICAgICAgICAgICBsZXQgb3B0aW9uc01hcCA9IHt9O1xuICAgICAgICAgICAgTy5vcHRpb25zLmZvckVhY2goKF9PLCBfT0luZGV4KSA9PiB7XG4gICAgICAgICAgICAgIF9PW1wiQGluZGV4XCJdID0gX09JbmRleDtcbiAgICAgICAgICAgICAgb3B0aW9uc01hcFtfT1tpdGVtLmNvbHVtbktleXMub3B0aW9uVmFsdWVdXSA9IF9PO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoVS5pc0FycmF5KGl0ZW0uc2VsZWN0ZWQpKSB7XG4gICAgICAgICAgICAgIGl0ZW0uc2VsZWN0ZWQuZm9yRWFjaCgoX08pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9uc01hcFtfT1tpdGVtLmNvbHVtbktleXMub3B0aW9uVmFsdWVdXSkge1xuICAgICAgICAgICAgICAgICAgTy5vcHRpb25zW29wdGlvbnNNYXBbX09baXRlbS5jb2x1bW5LZXlzLm9wdGlvblZhbHVlXV1bXCJAaW5kZXhcIl1dW2l0ZW0uY29sdW1uS2V5cy5vcHRpb25TZWxlY3RlZF0gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkoaXRlbSwgTyk7XG5cblxuICAgICAgICAgIGl0ZW0uJGRpc3BsYXlMYWJlbFxuICAgICAgICAgICAgLmh0bWwoZ2V0TGFiZWwuY2FsbCh0aGlzLCB0aGlzLmFjdGl2ZVNlbGVjdFF1ZXVlSW5kZXgpKTtcbiAgICAgICAgICBpdGVtLm9wdGlvbnMgPSBzeW5jU2VsZWN0T3B0aW9ucy5jYWxsKHRoaXMsIHRoaXMuYWN0aXZlU2VsZWN0UXVldWVJbmRleCwgTy5vcHRpb25zKTtcblxuICAgICAgICAgIGFsaWduU2VsZWN0RGlzcGxheS5jYWxsKHRoaXMpO1xuXG4gICAgICAgICAgLy8vIO2FnO2UjOumv+yXkCDsoITri6ztlaAg7Jik67iM7KCd7Yq4IOyEoOyWuFxuICAgICAgICAgIGRhdGEuaWQgPSBpdGVtLmlkO1xuICAgICAgICAgIGRhdGEudGhlbWUgPSBpdGVtLnRoZW1lO1xuICAgICAgICAgIGRhdGEubXVsdGlwbGUgPSBpdGVtLm11bHRpcGxlO1xuICAgICAgICAgIGRhdGEubGFuZyA9IGl0ZW0ubGFuZztcbiAgICAgICAgICBkYXRhLm9wdGlvbnMgPSBpdGVtLm9wdGlvbnM7XG4gICAgICAgICAgdGhpcy5hY3RpdmVTZWxlY3RPcHRpb25Hcm91cC5maW5kKCdbZGF0YS1lbHM9XCJjb250ZW50XCJdJykuaHRtbChtdXN0YWNoZS5yZW5kZXIodG1wbC5vcHRpb25zLmNhbGwodGhpcywgaXRlbS5jb2x1bW5LZXlzKSwgZGF0YSkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHRoaXMud2FpdE9wdGlvbnNDYWxsYmFjayA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBvcGVuIHNlbGVjdCBmcm9tIHRoZSBvdXRzaWRlXG4gICAgICovXG4gICAgbGV0IHF1ZUlkeCA9IChVLmlzTnVtYmVyKGJvdW5kSUQpKSA/IGJvdW5kSUQgOiBnZXRRdWVJZHguY2FsbCh0aGlzLCBib3VuZElEKSxcbiAgICAgIGl0ZW0gPSB0aGlzLnF1ZXVlW3F1ZUlkeF0sXG4gICAgICBkYXRhID0ge30sIGZvY3VzVG9wLCBzZWxlY3RlZE9wdGlvbkVsO1xuXG4gICAgaWYgKGl0ZW0uJGRpc3BsYXkuYXR0cihcImRpc2FibGVkXCIpKSByZXR1cm4gdGhpcztcblxuICAgIGlmICh0aGlzLm9wZW5UaW1lcikgY2xlYXJUaW1lb3V0KHRoaXMub3BlblRpbWVyKTtcbiAgICBpZiAodGhpcy5hY3RpdmVTZWxlY3RPcHRpb25Hcm91cCkge1xuICAgICAgaWYgKHRoaXMuYWN0aXZlU2VsZWN0UXVldWVJbmRleCA9PSBxdWVJZHgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGlmICh0cnlDb3VudCA+IDIpIHJldHVybiB0aGlzO1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgdGhpcy5vcGVuVGltZXIgPSBzZXRUaW1lb3V0KChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMub3BlbihxdWVJZHgsICh0cnlDb3VudCB8fCAwKSArIDEpO1xuICAgICAgfSkuYmluZCh0aGlzKSwgdGhpcy5jb25maWcuYW5pbWF0ZVRpbWUpO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpdGVtLm9wdGlvbkZvY3VzSW5kZXggPSAtMTsgLy8gb3B0aW9uR3JvdXDsnbQg7Je066as66m0IO2PrOy7pOyKpCDsnbjrjbHsiqQg7LSI6riw7ZmUIC0x66GcXG4gICAgaWYgKGl0ZW0uc2VsZWN0ZWQgJiYgaXRlbS5zZWxlY3RlZC5sZW5ndGggPiAwKSB7XG4gICAgICBpdGVtLm9wdGlvblNlbGVjdGVkSW5kZXggPSBpdGVtLnNlbGVjdGVkWzBdW1wiQGZpbmRleFwiXTtcbiAgICB9XG5cbiAgICAvLy8g7YWc7ZSM66a/7JeQIOyghOuLrO2VoCDsmKTruIzsoJ3tirgg7ISg7Ja4XG4gICAgZGF0YS5pZCA9IGl0ZW0uaWQ7XG4gICAgZGF0YS50aGVtZSA9IGl0ZW0udGhlbWU7XG4gICAgZGF0YS5tdWx0aXBsZSA9IGl0ZW0ubXVsdGlwbGU7XG5cbiAgICBkYXRhLmxhbmcgPSBpdGVtLmxhbmc7XG4gICAgaXRlbS4kZGlzcGxheS5hdHRyKFwiZGF0YS1zZWxlY3Qtb3B0aW9uLWdyb3VwLW9wZW5lZFwiLCBcInRydWVcIik7XG5cbiAgICBpZiAoaXRlbS5vbkV4cGFuZCkge1xuICAgICAgLy8gb25FeHBhbmQg7J24IOqyveyasCBVSSDrjIDquLDrqqjrk5wg7LaU6rCAXG4gICAgICBkYXRhLndhaXRPcHRpb25zID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBkYXRhLm9wdGlvbnMgPSBpdGVtLm9wdGlvbnM7XG4gICAgdGhpcy5hY3RpdmVTZWxlY3RPcHRpb25Hcm91cCA9IGpRdWVyeShtdXN0YWNoZS5yZW5kZXIodG1wbC5vcHRpb25Hcm91cC5jYWxsKHRoaXMpLCBkYXRhKSk7XG4gICAgdGhpcy5hY3RpdmVTZWxlY3RPcHRpb25Hcm91cC5maW5kKCdbZGF0YS1lbHM9XCJjb250ZW50XCJdJykuaHRtbChtdXN0YWNoZS5yZW5kZXIodG1wbC5vcHRpb25zLmNhbGwodGhpcywgaXRlbS5jb2x1bW5LZXlzKSwgZGF0YSkpO1xuICAgIHRoaXMuYWN0aXZlU2VsZWN0UXVldWVJbmRleCA9IHF1ZUlkeDtcblxuICAgIGFsaWduU2VsZWN0T3B0aW9uR3JvdXAuY2FsbCh0aGlzLCBcImFwcGVuZFwiKTsgLy8gYWxpZ25TZWxlY3RPcHRpb25Hcm91cCDsl5DshJwgYm9keSBhcHBlbmRcblxuICAgIC8vLyDsgqzsmqnsnpAg7J6F66Cl7Jy866GcIOyYteyFmOydhCDqsoDsg4ntlZjquLAg7JyE7ZWcIOyLnOuCmOumrOyYpFxuICAgIC8vIOyYteyFmOq3uOujueydtCDtmZzshLHtmZQg65CY66m0IOyCrOyaqeyekCDsnoXroKXsnYQg67Cb6riw7JyE7ZWcIGlucHV0IOqwkiDstIjquLDtmZQg67CPIO2PrOy7pOyKpCDri6Trpbggc2VsZWN06rCAIOuLq+2eiOuptOyEnCBkaXNwbGF5IGZvY3VzIOydtOuypO2KuOyZgCDstqnrj4ztlZjripQg66y47KCc6rCAIOyeiOycvOuvgOuhnFxuICAgIC8vIDHrsIDrpqzshLjsu6gg7KeA7Jew7ZuEIO2PrOy7pOyKpCDsspjrpqwuIGlucHV07JeQIO2PrOy7pOyKpOqwgCDrkJjrr4DroZwgaW5wdXQgdmFsdWXroZwgb3B0aW9uc+ulvCDqsoDsg4kg7ZWgIOyImCDsnojqsowg65Cp64uI64ukLlxuICAgIGl0ZW0uJGRpc3BsYXlJbnB1dC52YWwoJycpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgIGlmIChpdGVtLnNlbGVjdGVkICYmIGl0ZW0uc2VsZWN0ZWQubGVuZ3RoID4gMCkge1xuICAgICAgICBzZWxlY3RlZE9wdGlvbkVsID0gdGhpcy5hY3RpdmVTZWxlY3RPcHRpb25Hcm91cC5maW5kKCdbZGF0YS1vcHRpb24taW5kZXg9XCInICsgaXRlbS5zZWxlY3RlZFswXVtcIkBpbmRleFwiXSArICdcIl0nKTtcbiAgICAgICAgaWYgKHNlbGVjdGVkT3B0aW9uRWwuZ2V0KDApKSB7XG4gICAgICAgICAgZm9jdXNUb3AgPSBzZWxlY3RlZE9wdGlvbkVsLnBvc2l0aW9uKCkudG9wIC0gdGhpcy5hY3RpdmVTZWxlY3RPcHRpb25Hcm91cC5oZWlnaHQoKSAvIDM7XG4gICAgICAgICAgdGhpcy5hY3RpdmVTZWxlY3RPcHRpb25Hcm91cC5maW5kKCdbZGF0YS1lbHM9XCJjb250ZW50XCJdJykuc2Nyb2xsVG9wKGZvY3VzVG9wKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpdGVtLiRkaXNwbGF5SW5wdXQudHJpZ2dlcihcImZvY3VzXCIpO1xuXG4gICAgICBqUXVlcnkod2luZG93KS5vbihcImtleXVwLmF4NnVpLXNlbGVjdC1cIiArIHRoaXMuaW5zdGFuY2VJZCwgKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcbiAgICAgICAgb25Cb2R5S2V5dXAuY2FsbCh0aGlzLCBlKTtcbiAgICAgICAgVS5zdG9wRXZlbnQoZSk7XG4gICAgICB9KS5iaW5kKHRoaXMpKTtcblxuICAgICAgalF1ZXJ5KHdpbmRvdykub24oXCJjbGljay5heDZ1aS1zZWxlY3QtXCIgKyB0aGlzLmluc3RhbmNlSWQsIChmdW5jdGlvbiAoZSkge1xuICAgICAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XG4gICAgICAgIG9uQm9keUNsaWNrLmNhbGwodGhpcywgZSk7XG4gICAgICAgIFUuc3RvcEV2ZW50KGUpO1xuICAgICAgfSkuYmluZCh0aGlzKSk7XG5cbiAgICB9LCB0aGlzLmNvbmZpZy5hbmltYXRlVGltZSk7XG5cbiAgICBvblN0YXRlQ2hhbmdlZC5jYWxsKHRoaXMsIGl0ZW0sIHtcbiAgICAgIHNlbGY6IHRoaXMsXG4gICAgICBzdGF0ZTogXCJvcGVuXCIsXG4gICAgICBpdGVtOiBpdGVtXG4gICAgfSk7XG5cbiAgICAvLyB3YWl0T3B0aW9uIHRpbWVyXG4gICAgaWYgKGl0ZW0ub25FeHBhbmQpIHtcbiAgICAgIHRoaXMud2FpdE9wdGlvbnNDYWxsYmFjayA9IHRydWU7XG4gICAgICBvbkV4cGFuZC5jYWxsKHRoaXMsIGl0ZW0pO1xuICAgIH1cblxuICAgIGRhdGEgPSBudWxsO1xuICAgIGZvY3VzVG9wID0gbnVsbDtcbiAgICBzZWxlY3RlZE9wdGlvbkVsID0gbnVsbDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBwYXJhbSBfaXRlbVxuICAgKiBAcmV0dXJuIHtBWDZVSVNlbGVjdH1cbiAgICovXG4gIHVwZGF0ZShfaXRlbSkge1xuICAgIHRoaXMuYmluZChfaXRlbSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQHBhcmFtIGJvdW5kSURcbiAgICogQHBhcmFtIG9wdGlvbnNcbiAgICogQHJldHVybiB7QVg2VUlTZWxlY3R9XG4gICAqL1xuICBzZXRPcHRpb25zKGJvdW5kSUQsIG9wdGlvbnMpIHtcbiAgICBsZXQgcXVlSWR4ID0gZ2V0UXVlSWR4LmNhbGwodGhpcywgYm91bmRJRCk7XG4gICAgdGhpcy5xdWV1ZVtxdWVJZHhdLnNlbGVjdGVkID0gW107XG4gICAgdGhpcy5xdWV1ZVtxdWVJZHhdLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIGJpbmRTZWxlY3RUYXJnZXQuY2FsbCh0aGlzLCBxdWVJZHgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQHBhcmFtIGJvdW5kSURcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqIEBwYXJhbSBzZWxlY3RlZFxuICAgKiBAcGFyYW0gaW50ZXJuYWxcbiAgICogQHJldHVybiB7Kn1cbiAgICovXG4gIHZhbChib3VuZElELCB2YWx1ZSwgc2VsZWN0ZWQsIGludGVybmFsKSB7XG4gICAgY29uc3QgZ2V0U2VsZWN0ZWQgPSBmdW5jdGlvbiAoX2l0ZW0sIG8sIHNlbGVjdGVkKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2VsZWN0ZWQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICByZXR1cm4gKF9pdGVtLm11bHRpcGxlKSA/ICFvIDogdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gc2VsZWN0ZWQ7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjbGVhclNlbGVjdGVkID0gZnVuY3Rpb24gKHF1ZUlkeCkge1xuICAgICAgICB0aGlzLnF1ZXVlW3F1ZUlkeF0ub3B0aW9ucy5mb3JFYWNoKG4gPT4ge1xuICAgICAgICAgIGlmIChuLm9wdGdyb3VwKSB7XG4gICAgICAgICAgICBuLm9wdGlvbnMuZm9yRWFjaChubiA9PiB7XG4gICAgICAgICAgICAgIG5uLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBuLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBwcm9jZXNzb3IgPSB7XG4gICAgICAgICdpbmRleCc6IGZ1bmN0aW9uIChxdWVJZHgsIHZhbHVlLCBzZWxlY3RlZCkge1xuICAgICAgICAgIC8vIO2BtOuemOyKpCDrgrTrtoDsl5DshJwg7Zi47Lac65CcIO2Yle2DnCwg6re465+wIOydtOycoOuhnCDsmLXshZjqt7jro7nsl5Ag64yA7ZWcIOyDge2DnOulvCDrs4Dqsr0g7ZWY6rOgIOyeiOuLpC5cbiAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMucXVldWVbcXVlSWR4XTtcblxuICAgICAgICAgIGlmIChVLmlzU3RyaW5nKHZhbHVlLmluZGV4LmdpbmRleCkpIHtcbiAgICAgICAgICAgIGl0ZW0ub3B0aW9uc1t2YWx1ZS5pbmRleC5naW5kZXhdLm9wdGlvbnNbdmFsdWUuaW5kZXguaW5kZXhdW2l0ZW0uY29sdW1uS2V5cy5vcHRpb25TZWxlY3RlZF0gPSBnZXRTZWxlY3RlZChpdGVtLCBpdGVtLm9wdGlvbnNbdmFsdWUuaW5kZXguZ2luZGV4XS5vcHRpb25zW3ZhbHVlLmluZGV4LmluZGV4XVtpdGVtLmNvbHVtbktleXMub3B0aW9uU2VsZWN0ZWRdLCBzZWxlY3RlZCk7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVNlbGVjdE9wdGlvbkdyb3VwXG4gICAgICAgICAgICAgIC5maW5kKCdbZGF0YS1vcHRpb24tZ3JvdXAtaW5kZXg9XCInICsgdmFsdWUuaW5kZXguZ2luZGV4ICsgJ1wiXVtkYXRhLW9wdGlvbi1pbmRleD1cIicgKyB2YWx1ZS5pbmRleC5pbmRleCArICdcIl0nKVxuICAgICAgICAgICAgICAuYXR0cihcImRhdGEtb3B0aW9uLXNlbGVjdGVkXCIsIGl0ZW0ub3B0aW9uc1t2YWx1ZS5pbmRleC5naW5kZXhdLm9wdGlvbnNbdmFsdWUuaW5kZXguaW5kZXhdW2l0ZW0uY29sdW1uS2V5cy5vcHRpb25TZWxlY3RlZF0udG9TdHJpbmcoKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaXRlbS5vcHRpb25zW3ZhbHVlLmluZGV4LmluZGV4XVtpdGVtLmNvbHVtbktleXMub3B0aW9uU2VsZWN0ZWRdID0gZ2V0U2VsZWN0ZWQoaXRlbSwgaXRlbS5vcHRpb25zW3ZhbHVlLmluZGV4LmluZGV4XVtpdGVtLmNvbHVtbktleXMub3B0aW9uU2VsZWN0ZWRdLCBzZWxlY3RlZCk7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVNlbGVjdE9wdGlvbkdyb3VwXG4gICAgICAgICAgICAgIC5maW5kKCdbZGF0YS1vcHRpb24taW5kZXg9XCInICsgdmFsdWUuaW5kZXguaW5kZXggKyAnXCJdJylcbiAgICAgICAgICAgICAgLmF0dHIoXCJkYXRhLW9wdGlvbi1zZWxlY3RlZFwiLCBpdGVtLm9wdGlvbnNbdmFsdWUuaW5kZXguaW5kZXhdW2l0ZW0uY29sdW1uS2V5cy5vcHRpb25TZWxlY3RlZF0udG9TdHJpbmcoKSk7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzeW5jU2VsZWN0T3B0aW9ucy5jYWxsKHRoaXMsIHF1ZUlkeCwgaXRlbS5vcHRpb25zKTtcbiAgICAgICAgICBzeW5jTGFiZWwuY2FsbCh0aGlzLCBxdWVJZHgpO1xuICAgICAgICAgIGFsaWduU2VsZWN0T3B0aW9uR3JvdXAuY2FsbCh0aGlzKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2Fycic6IGZ1bmN0aW9uIChxdWVJZHgsIHZhbHVlcywgc2VsZWN0ZWQpIHtcbiAgICAgICAgICB2YWx1ZXMuZm9yRWFjaCh2YWx1ZSA9PiB7XG4gICAgICAgICAgICBpZiAoVS5pc1N0cmluZyh2YWx1ZSkgfHwgVS5pc051bWJlcih2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgcHJvY2Vzc29yLnZhbHVlLmNhbGwodGhpcywgcXVlSWR4LCB2YWx1ZSwgc2VsZWN0ZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiBwcm9jZXNzb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWVba2V5XSkge1xuICAgICAgICAgICAgICAgICAgcHJvY2Vzc29yW2tleV0uY2FsbCh0aGlzLCBxdWVJZHgsIHZhbHVlLCBzZWxlY3RlZCk7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgJ3ZhbHVlJzogZnVuY3Rpb24gKHF1ZUlkeCwgdmFsdWUsIHNlbGVjdGVkKSB7XG4gICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnF1ZXVlW3F1ZUlkeF0sXG4gICAgICAgICAgICBvcHRpb25JbmRleCA9IFUuc2VhcmNoKGl0ZW0ub3B0aW9ucywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpc1tpdGVtLmNvbHVtbktleXMub3B0aW9uVmFsdWVdID09IHZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKG9wdGlvbkluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIGl0ZW0ub3B0aW9uc1tvcHRpb25JbmRleF1baXRlbS5jb2x1bW5LZXlzLm9wdGlvblNlbGVjdGVkXSA9IGdldFNlbGVjdGVkKGl0ZW0sIGl0ZW0ub3B0aW9uc1tvcHRpb25JbmRleF1baXRlbS5jb2x1bW5LZXlzLm9wdGlvblNlbGVjdGVkXSwgc2VsZWN0ZWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGluZm8uZ2V0RXJyb3IoXCJheDZ1aS1zZWxlY3RcIiwgXCI1MDFcIiwgXCJ2YWxcIikpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHN5bmNTZWxlY3RPcHRpb25zLmNhbGwodGhpcywgcXVlSWR4LCBpdGVtLm9wdGlvbnMpO1xuICAgICAgICAgIHN5bmNMYWJlbC5jYWxsKHRoaXMsIHF1ZUlkeCk7XG4gICAgICAgIH0sXG4gICAgICAgICd0ZXh0JzogZnVuY3Rpb24gKHF1ZUlkeCwgdmFsdWUsIHNlbGVjdGVkKSB7XG4gICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLnF1ZXVlW3F1ZUlkeF0sXG4gICAgICAgICAgICBvcHRpb25JbmRleCA9IFUuc2VhcmNoKGl0ZW0ub3B0aW9ucywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpc1tpdGVtLmNvbHVtbktleXMub3B0aW9uVGV4dF0gPT0gdmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAob3B0aW9uSW5kZXggPiAtMSkge1xuICAgICAgICAgICAgaXRlbS5vcHRpb25zW29wdGlvbkluZGV4XVtpdGVtLmNvbHVtbktleXMub3B0aW9uU2VsZWN0ZWRdID0gZ2V0U2VsZWN0ZWQoaXRlbSwgaXRlbS5vcHRpb25zW29wdGlvbkluZGV4XVtpdGVtLmNvbHVtbktleXMub3B0aW9uU2VsZWN0ZWRdLCBzZWxlY3RlZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coaW5mby5nZXRFcnJvcihcImF4NnVpLXNlbGVjdFwiLCBcIjUwMVwiLCBcInZhbFwiKSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc3luY1NlbGVjdE9wdGlvbnMuY2FsbCh0aGlzLCBxdWVJZHgsIGl0ZW0ub3B0aW9ucyk7XG4gICAgICAgICAgc3luY0xhYmVsLmNhbGwodGhpcywgcXVlSWR4KTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2NsZWFyJzogZnVuY3Rpb24gKHF1ZUlkeCkge1xuICAgICAgICAgIGNsZWFyU2VsZWN0ZWQuY2FsbCh0aGlzLCBxdWVJZHgpO1xuICAgICAgICAgIHN5bmNTZWxlY3RPcHRpb25zLmNhbGwodGhpcywgcXVlSWR4LCB0aGlzLnF1ZXVlW3F1ZUlkeF0ub3B0aW9ucyk7XG4gICAgICAgICAgc3luY0xhYmVsLmNhbGwodGhpcywgcXVlSWR4KTtcblxuICAgICAgICAgIGlmICh0aGlzLmFjdGl2ZVNlbGVjdE9wdGlvbkdyb3VwKSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVNlbGVjdE9wdGlvbkdyb3VwXG4gICAgICAgICAgICAgIC5maW5kKCdbZGF0YS1vcHRpb24taW5kZXhdJylcbiAgICAgICAgICAgICAgLmF0dHIoXCJkYXRhLW9wdGlvbi1zZWxlY3RlZFwiLCBcImZhbHNlXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgIGxldCBxdWVJZHggPSAoVS5pc051bWJlcihib3VuZElEKSkgPyBib3VuZElEIDogZ2V0UXVlSWR4LmNhbGwodGhpcywgYm91bmRJRCk7XG4gICAgaWYgKCF0aGlzLnF1ZXVlW3F1ZUlkeF0pIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcInVuZGVmaW5lZFwiICYmICF0aGlzLnF1ZXVlW3F1ZUlkeF0ubXVsdGlwbGUpIHtcbiAgICAgIGNsZWFyU2VsZWN0ZWQuY2FsbCh0aGlzLCBxdWVJZHgpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgcmV0dXJuIHRoaXMucXVldWVbcXVlSWR4XS5zZWxlY3RlZDtcbiAgICB9XG4gICAgZWxzZSBpZiAoVS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgcHJvY2Vzc29yLmFyci5jYWxsKHRoaXMsIHF1ZUlkeCwgdmFsdWUsIHNlbGVjdGVkKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoVS5pc1N0cmluZyh2YWx1ZSkgfHwgVS5pc051bWJlcih2YWx1ZSkpIHtcbiAgICAgIHByb2Nlc3Nvci52YWx1ZS5jYWxsKHRoaXMsIHF1ZUlkeCwgdmFsdWUsIHNlbGVjdGVkKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgcHJvY2Vzc29yLmNsZWFyLmNhbGwodGhpcywgcXVlSWR4KTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gcHJvY2Vzc29yKSB7XG4gICAgICAgICAgaWYgKHZhbHVlW2tleV0pIHtcbiAgICAgICAgICAgIHByb2Nlc3NvcltrZXldLmNhbGwodGhpcywgcXVlSWR4LCB2YWx1ZSwgc2VsZWN0ZWQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgb25TdGF0ZUNoYW5nZWQuY2FsbCh0aGlzLCB0aGlzLnF1ZXVlW3F1ZUlkeF0sIHtcbiAgICAgICAgc2VsZjogdGhpcyxcbiAgICAgICAgaXRlbTogdGhpcy5xdWV1ZVtxdWVJZHhdLFxuICAgICAgICBzdGF0ZTogKGludGVybmFsKSA/IFwiY2hhbmdlVmFsdWVcIiA6IFwic2V0VmFsdWVcIixcbiAgICAgICAgdmFsdWU6IHRoaXMucXVldWVbcXVlSWR4XS5zZWxlY3RlZCxcbiAgICAgICAgaW50ZXJuYWw6IGludGVybmFsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBib3VuZElEID0gbnVsbDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBwYXJhbSBpdGVtXG4gICAqIEByZXR1cm4ge0FYNlVJU2VsZWN0fVxuICAgKi9cbiAgY2xvc2UoaXRlbSkge1xuICAgIGlmICh0aGlzLmNsb3NlVGltZXIpIGNsZWFyVGltZW91dCh0aGlzLmNsb3NlVGltZXIpO1xuICAgIGlmICghdGhpcy5hY3RpdmVTZWxlY3RPcHRpb25Hcm91cCkgcmV0dXJuIHRoaXM7XG5cbiAgICBpdGVtID0gdGhpcy5xdWV1ZVt0aGlzLmFjdGl2ZVNlbGVjdFF1ZXVlSW5kZXhdO1xuICAgIGl0ZW0ub3B0aW9uRm9jdXNJbmRleCA9IC0xO1xuXG4gICAgaXRlbS4kZGlzcGxheUlucHV0LnZhbCgnJykudHJpZ2dlcihcImJsdXJcIik7XG4gICAgaXRlbS4kZGlzcGxheS5yZW1vdmVBdHRyKFwiZGF0YS1zZWxlY3Qtb3B0aW9uLWdyb3VwLW9wZW5lZFwiKS50cmlnZ2VyKFwiZm9jdXNcIik7XG5cbiAgICB0aGlzLmFjdGl2ZVNlbGVjdE9wdGlvbkdyb3VwLmFkZENsYXNzKFwiZGVzdHJveVwiKTtcblxuICAgIGpRdWVyeSh3aW5kb3cpXG4gICAgICAub2ZmKFwicmVzaXplLmF4NnVpLXNlbGVjdC1cIiArIHRoaXMuaW5zdGFuY2VJZClcbiAgICAgIC5vZmYoXCJjbGljay5heDZ1aS1zZWxlY3QtXCIgKyB0aGlzLmluc3RhbmNlSWQpXG4gICAgICAub2ZmKFwia2V5dXAuYXg2dWktc2VsZWN0LVwiICsgdGhpcy5pbnN0YW5jZUlkKTtcblxuICAgIHRoaXMuY2xvc2VUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuYWN0aXZlU2VsZWN0T3B0aW9uR3JvdXApIHRoaXMuYWN0aXZlU2VsZWN0T3B0aW9uR3JvdXAucmVtb3ZlKCk7XG4gICAgICB0aGlzLmFjdGl2ZVNlbGVjdE9wdGlvbkdyb3VwID0gbnVsbDtcbiAgICAgIHRoaXMuYWN0aXZlU2VsZWN0UXVldWVJbmRleCA9IC0xO1xuXG4gICAgICBsZXQgdGhhdCA9IHtcbiAgICAgICAgc2VsZjogdGhpcyxcbiAgICAgICAgaXRlbTogaXRlbSxcbiAgICAgICAgdmFsdWU6IGl0ZW0uc2VsZWN0ZWQsXG4gICAgICAgIHN0YXRlOiBcImNsb3NlXCJcbiAgICAgIH07XG5cbiAgICAgIG9uU3RhdGVDaGFuZ2VkLmNhbGwodGhpcywgaXRlbSwgdGhhdCk7XG5cbiAgICAgIC8vIHdhaXRPcHRpb24gdGltZXJcbiAgICAgIGlmIChpdGVtLm9uQ2xvc2UpIHtcbiAgICAgICAgaXRlbS5vbkNsb3NlLmNhbGwodGhhdCk7XG4gICAgICB9XG5cbiAgICB9LCB0aGlzLmNvbmZpZy5hbmltYXRlVGltZSk7XG4gICAgdGhpcy53YWl0T3B0aW9uc0NhbGxiYWNrID0gbnVsbDtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAcGFyYW0gYm91bmRJRFxuICAgKiBAcmV0dXJuIHtBWDZVSVNlbGVjdH1cbiAgICovXG4gIGVuYWJsZShib3VuZElEKSB7XG4gICAgbGV0IHF1ZUlkeCA9IGdldFF1ZUlkeC5jYWxsKHRoaXMsIGJvdW5kSUQpO1xuICAgIHRoaXMucXVldWVbcXVlSWR4XS4kZGlzcGxheS5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIik7XG4gICAgdGhpcy5xdWV1ZVtxdWVJZHhdLiRzZWxlY3QucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpO1xuXG4gICAgb25TdGF0ZUNoYW5nZWQuY2FsbCh0aGlzLCB0aGlzLnF1ZXVlW3F1ZUlkeF0sIHtcbiAgICAgIHNlbGY6IHRoaXMsXG4gICAgICBzdGF0ZTogXCJlbmFibGVcIlxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQHBhcmFtIGJvdW5kSURcbiAgICogQHJldHVybiB7QVg2VUlTZWxlY3R9XG4gICAqL1xuICBkaXNhYmxlKGJvdW5kSUQpIHtcbiAgICBsZXQgcXVlSWR4ID0gZ2V0UXVlSWR4LmNhbGwodGhpcywgYm91bmRJRCk7XG4gICAgdGhpcy5xdWV1ZVtxdWVJZHhdLiRkaXNwbGF5LmF0dHIoXCJkaXNhYmxlZFwiLCBcImRpc2FibGVkXCIpO1xuICAgIHRoaXMucXVldWVbcXVlSWR4XS4kc2VsZWN0LmF0dHIoXCJkaXNhYmxlZFwiLCBcImRpc2FibGVkXCIpO1xuXG4gICAgb25TdGF0ZUNoYW5nZWQuY2FsbCh0aGlzLCB0aGlzLnF1ZXVlW3F1ZUlkeF0sIHtcbiAgICAgIHNlbGY6IHRoaXMsXG4gICAgICBzdGF0ZTogXCJkaXNhYmxlXCJcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEFYNlVJU2VsZWN0O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9zcmMvQVg2VUlTZWxlY3QuanMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGUuc2Nzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7fVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zdHlsZS5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zdHlsZS5zY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9zcmMvQVg2VUlTZWxlY3Qvc3R5bGUuc2Nzc1xuLy8gbW9kdWxlIGlkID0gOTNcbi8vIG1vZHVsZSBjaHVua3MgPSA1IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHVuZGVmaW5lZCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJALXdlYmtpdC1rZXlmcmFtZXMgYXgtc2VsZWN0LW9wdGlvbi1ncm91cCB7XFxuICBmcm9tIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEsIDApO1xcbiAgICBtYXgtaGVpZ2h0OiAwO1xcbiAgICBvcGFjaXR5OiAwOyB9XFxuICB0byB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxLCAxKTtcXG4gICAgb3BhY2l0eTogMTsgfSB9XFxuXFxuQC1tb3ota2V5ZnJhbWVzIGF4LXNlbGVjdC1vcHRpb24tZ3JvdXAge1xcbiAgZnJvbSB7XFxuICAgIC1tb3otdHJhbnNmb3JtOiBzY2FsZSgxLCAwKTtcXG4gICAgbWF4LWhlaWdodDogMDtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgdG8ge1xcbiAgICAtbW96LXRyYW5zZm9ybTogc2NhbGUoMSwgMSk7XFxuICAgIG9wYWNpdHk6IDE7IH0gfVxcblxcbkBrZXlmcmFtZXMgYXgtc2VsZWN0LW9wdGlvbi1ncm91cCB7XFxuICBmcm9tIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEsIDApO1xcbiAgICAtbW96LXRyYW5zZm9ybTogc2NhbGUoMSwgMCk7XFxuICAgIC1tcy10cmFuc2Zvcm06IHNjYWxlKDEsIDApO1xcbiAgICAtby10cmFuc2Zvcm06IHNjYWxlKDEsIDApO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEsIDApO1xcbiAgICBtYXgtaGVpZ2h0OiAwO1xcbiAgICBvcGFjaXR5OiAwOyB9XFxuICB0byB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxLCAxKTtcXG4gICAgLW1vei10cmFuc2Zvcm06IHNjYWxlKDEsIDEpO1xcbiAgICAtbXMtdHJhbnNmb3JtOiBzY2FsZSgxLCAxKTtcXG4gICAgLW8tdHJhbnNmb3JtOiBzY2FsZSgxLCAxKTtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLCAxKTtcXG4gICAgb3BhY2l0eTogMTsgfSB9XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIGF4LXNlbGVjdC1vcHRpb24tZ3JvdXAtZGVzdHJveSB7XFxuICBmcm9tIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEsIDEpO1xcbiAgICBvcGFjaXR5OiAxOyB9XFxuICB0byB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxLCAwKTtcXG4gICAgb3BhY2l0eTogMDsgfSB9XFxuXFxuQC1tb3ota2V5ZnJhbWVzIGF4LXNlbGVjdC1vcHRpb24tZ3JvdXAtZGVzdHJveSB7XFxuICBmcm9tIHtcXG4gICAgLW1vei10cmFuc2Zvcm06IHNjYWxlKDEsIDEpO1xcbiAgICBvcGFjaXR5OiAxOyB9XFxuICB0byB7XFxuICAgIC1tb3otdHJhbnNmb3JtOiBzY2FsZSgxLCAwKTtcXG4gICAgb3BhY2l0eTogMDsgfSB9XFxuXFxuQGtleWZyYW1lcyBheC1zZWxlY3Qtb3B0aW9uLWdyb3VwLWRlc3Ryb3kge1xcbiAgZnJvbSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxLCAxKTtcXG4gICAgLW1vei10cmFuc2Zvcm06IHNjYWxlKDEsIDEpO1xcbiAgICAtbXMtdHJhbnNmb3JtOiBzY2FsZSgxLCAxKTtcXG4gICAgLW8tdHJhbnNmb3JtOiBzY2FsZSgxLCAxKTtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLCAxKTtcXG4gICAgb3BhY2l0eTogMTsgfVxcbiAgdG8ge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMSwgMCk7XFxuICAgIC1tb3otdHJhbnNmb3JtOiBzY2FsZSgxLCAwKTtcXG4gICAgLW1zLXRyYW5zZm9ybTogc2NhbGUoMSwgMCk7XFxuICAgIC1vLXRyYW5zZm9ybTogc2NhbGUoMSwgMCk7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMSwgMCk7XFxuICAgIG9wYWNpdHk6IDA7IH0gfVxcblxcbltkYXRhLWF4NnVpLXNlbGVjdF0ge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgb3ZlcmZsb3c6IHZpc2libGU7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBtYXJnaW46IDA7IH1cXG4gIFtkYXRhLWF4NnVpLXNlbGVjdF0gKixcXG4gIFtkYXRhLWF4NnVpLXNlbGVjdF0gKjpiZWZvcmUsXFxuICBbZGF0YS1heDZ1aS1zZWxlY3RdICo6YWZ0ZXIge1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94OyB9XFxuICBbZGF0YS1heDZ1aS1zZWxlY3RdIHNlbGVjdCB7XFxuICAgIHotaW5kZXg6IDE7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7IH1cXG5cXG4uYXg2dWktc2VsZWN0LWRpc3BsYXkge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgei1pbmRleDogMjtcXG4gIHBhZGRpbmc6IDA7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIGhlaWdodDogMzJweDtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AsICNmZmYsICNlZWUpO1xcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwjZmZmLCAjZWVlKTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XFxuICBjb2xvcjogIzQ0NDtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGJveC1zaGFkb3c6IG5vbmU7IH1cXG4gIC5heDZ1aS1zZWxlY3QtZGlzcGxheTpob3ZlciwgLmF4NnVpLXNlbGVjdC1kaXNwbGF5OmZvY3VzIHtcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lOyB9XFxuICAuYXg2dWktc2VsZWN0LWRpc3BsYXkgLmF4NnVpLXNlbGVjdC1kaXNwbGF5LXRhYmxlIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgZGlzcGxheTogdGFibGU7XFxuICAgIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxuICAgIHVzZXItc2VsZWN0OiBub25lOyB9XFxuICAgIC5heDZ1aS1zZWxlY3QtZGlzcGxheSAuYXg2dWktc2VsZWN0LWRpc3BsYXktdGFibGUgW2RhdGEtYXg2dWktc2VsZWN0LWRpc3BsYXk9XFxcImxhYmVsXFxcIl0ge1xcbiAgICAgIGRpc3BsYXk6IHRhYmxlLWNlbGw7XFxuICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gICAgICBwYWRkaW5nOiAwcHggN3B4O1xcbiAgICAgIGNvbG9yOiAjNDQ0O1xcbiAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7IH1cXG4gICAgLmF4NnVpLXNlbGVjdC1kaXNwbGF5IC5heDZ1aS1zZWxlY3QtZGlzcGxheS10YWJsZSBbZGF0YS1heDZ1aS1zZWxlY3QtZGlzcGxheT1cXFwiYWRkb25cXFwiXSB7XFxuICAgICAgZGlzcGxheTogdGFibGUtY2VsbDtcXG4gICAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgICAgIHdpZHRoOiAxNnB4O1xcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjsgfVxcbiAgICAgIC5heDZ1aS1zZWxlY3QtZGlzcGxheSAuYXg2dWktc2VsZWN0LWRpc3BsYXktdGFibGUgW2RhdGEtYXg2dWktc2VsZWN0LWRpc3BsYXk9XFxcImFkZG9uXFxcIl0gLmFkZG9uLWljb24tcmVzZXQge1xcbiAgICAgICAgZGlzcGxheTogbm9uZTsgfVxcbiAgICAgIC5heDZ1aS1zZWxlY3QtZGlzcGxheSAuYXg2dWktc2VsZWN0LWRpc3BsYXktdGFibGUgW2RhdGEtYXg2dWktc2VsZWN0LWRpc3BsYXk9XFxcImFkZG9uXFxcIl0gLmFkZG9uLWljb24tY2xvc2VkIHtcXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrOyB9XFxuICAgICAgLmF4NnVpLXNlbGVjdC1kaXNwbGF5IC5heDZ1aS1zZWxlY3QtZGlzcGxheS10YWJsZSBbZGF0YS1heDZ1aS1zZWxlY3QtZGlzcGxheT1cXFwiYWRkb25cXFwiXSAuYWRkb24taWNvbi1vcGVuZWQge1xcbiAgICAgICAgZGlzcGxheTogbm9uZTsgfVxcbiAgICAgIC5heDZ1aS1zZWxlY3QtZGlzcGxheSAuYXg2dWktc2VsZWN0LWRpc3BsYXktdGFibGUgW2RhdGEtYXg2dWktc2VsZWN0LWRpc3BsYXk9XFxcImFkZG9uXFxcIl0gLmFkZG9uLWljb24tY2xvc2VkIHtcXG4gICAgICAgIHdpZHRoOiAxNnB4O1xcbiAgICAgICAgdGV4dC1hbGlnbjogbGVmdDtcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiA2LjM2M3B4OyB9XFxuICAgICAgICAuYXg2dWktc2VsZWN0LWRpc3BsYXkgLmF4NnVpLXNlbGVjdC1kaXNwbGF5LXRhYmxlIFtkYXRhLWF4NnVpLXNlbGVjdC1kaXNwbGF5PVxcXCJhZGRvblxcXCJdIC5hZGRvbi1pY29uLWNsb3NlZCAuYWRkb24taWNvbi1hcnJvdyB7XFxuICAgICAgICAgIGNvbnRlbnQ6ICcnO1xcbiAgICAgICAgICB3aWR0aDogMHB4O1xcbiAgICAgICAgICBoZWlnaHQ6IDBweDtcXG4gICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICAgICAgICBib3JkZXItbGVmdDogNC41cHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICAgICAgICAgIGJvcmRlci1yaWdodDogNC41cHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICAgICAgICAgIGJvcmRlci10b3A6IDYuMzYzcHggc29saWQgIzQ0NDtcXG4gICAgICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxuICAgICAgICAgIG9wYWNpdHk6IDE7IH1cXG4gICAgICAuYXg2dWktc2VsZWN0LWRpc3BsYXkgLmF4NnVpLXNlbGVjdC1kaXNwbGF5LXRhYmxlIFtkYXRhLWF4NnVpLXNlbGVjdC1kaXNwbGF5PVxcXCJhZGRvblxcXCJdIC5hZGRvbi1pY29uLW9wZW5lZCB7XFxuICAgICAgICB3aWR0aDogMTZweDtcXG4gICAgICAgIHRleHQtYWxpZ246IGxlZnQ7XFxuICAgICAgICBsaW5lLWhlaWdodDogNi4zNjNweDsgfVxcbiAgICAgICAgLmF4NnVpLXNlbGVjdC1kaXNwbGF5IC5heDZ1aS1zZWxlY3QtZGlzcGxheS10YWJsZSBbZGF0YS1heDZ1aS1zZWxlY3QtZGlzcGxheT1cXFwiYWRkb25cXFwiXSAuYWRkb24taWNvbi1vcGVuZWQgLmFkZG9uLWljb24tYXJyb3cge1xcbiAgICAgICAgICBjb250ZW50OiAnJztcXG4gICAgICAgICAgd2lkdGg6IDBweDtcXG4gICAgICAgICAgaGVpZ2h0OiAwcHg7XFxuICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgICAgICAgYm9yZGVyLWxlZnQ6IDQuNXB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICAgICAgICBib3JkZXItcmlnaHQ6IDQuNXB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICAgICAgICBib3JkZXItYm90dG9tOiA2LjM2M3B4IHNvbGlkICM0NDQ7XFxuICAgICAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbiAgICAgICAgICBvcGFjaXR5OiAxOyB9XFxuICAuYXg2dWktc2VsZWN0LWRpc3BsYXlbZGF0YS1zZWxlY3Qtb3B0aW9uLWdyb3VwLW9wZW5lZF0ge1xcbiAgICBib3gtc2hhZG93OiBpbnNldCAxcHggMXB4IDNweCByZ2JhKDAsIDAsIDAsIDAuMik7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IG5vbmU7IH1cXG4gICAgLmF4NnVpLXNlbGVjdC1kaXNwbGF5W2RhdGEtc2VsZWN0LW9wdGlvbi1ncm91cC1vcGVuZWRdIC5heDZ1aS1zZWxlY3QtZGlzcGxheS10YWJsZSBbZGF0YS1heDZ1aS1zZWxlY3QtZGlzcGxheT1cXFwiYWRkb25cXFwiXSAuYWRkb24taWNvbi1yZXNldCB7XFxuICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgIHJpZ2h0OiAyM3B4O1xcbiAgICAgIHRvcDogMHB4O1xcbiAgICAgIGhlaWdodDogMTAwJTsgfVxcbiAgICAuYXg2dWktc2VsZWN0LWRpc3BsYXlbZGF0YS1zZWxlY3Qtb3B0aW9uLWdyb3VwLW9wZW5lZF0gLmF4NnVpLXNlbGVjdC1kaXNwbGF5LXRhYmxlIFtkYXRhLWF4NnVpLXNlbGVjdC1kaXNwbGF5PVxcXCJhZGRvblxcXCJdIC5hZGRvbi1pY29uLWNsb3NlZCB7XFxuICAgICAgZGlzcGxheTogbm9uZTsgfVxcbiAgICAuYXg2dWktc2VsZWN0LWRpc3BsYXlbZGF0YS1zZWxlY3Qtb3B0aW9uLWdyb3VwLW9wZW5lZF0gLmF4NnVpLXNlbGVjdC1kaXNwbGF5LXRhYmxlIFtkYXRhLWF4NnVpLXNlbGVjdC1kaXNwbGF5PVxcXCJhZGRvblxcXCJdIC5hZGRvbi1pY29uLW9wZW5lZCB7XFxuICAgICAgZGlzcGxheTogYmxvY2s7IH1cXG4gIC5heDZ1aS1zZWxlY3QtZGlzcGxheS5kZWZhdWx0OmhvdmVyOm5vdChbZGlzYWJsZWRdKSwgLmF4NnVpLXNlbGVjdC1kaXNwbGF5LmRlZmF1bHQ6YWN0aXZlOm5vdChbZGlzYWJsZWRdKSwgLmF4NnVpLXNlbGVjdC1kaXNwbGF5LmRlZmF1bHQ6Zm9jdXM6bm90KFtkaXNhYmxlZF0pLCAuYXg2dWktc2VsZWN0LWRpc3BsYXkuZGVmYXVsdFtkYXRhLXNlbGVjdC1vcHRpb24tZ3JvdXAtb3BlbmVkXTpub3QoW2Rpc2FibGVkXSkge1xcbiAgICBib3JkZXItY29sb3I6ICNjY2M7XFxuICAgIGNvbG9yOiAjNTU1O1xcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7IH1cXG4gICAgLmF4NnVpLXNlbGVjdC1kaXNwbGF5LmRlZmF1bHQ6aG92ZXI6bm90KFtkaXNhYmxlZF0pIC5heDZzZWxlY3QtZGlzcGxheS10YWJsZSBbZGF0YS1heDZ1aS1zZWxlY3QtZGlzcGxheT1cXFwiYWRkb25cXFwiXSAuYWRkb24taWNvbi1jbG9zZWQgLmFkZG9uLWljb24tYXJyb3csIC5heDZ1aS1zZWxlY3QtZGlzcGxheS5kZWZhdWx0OmFjdGl2ZTpub3QoW2Rpc2FibGVkXSkgLmF4NnNlbGVjdC1kaXNwbGF5LXRhYmxlIFtkYXRhLWF4NnVpLXNlbGVjdC1kaXNwbGF5PVxcXCJhZGRvblxcXCJdIC5hZGRvbi1pY29uLWNsb3NlZCAuYWRkb24taWNvbi1hcnJvdywgLmF4NnVpLXNlbGVjdC1kaXNwbGF5LmRlZmF1bHQ6Zm9jdXM6bm90KFtkaXNhYmxlZF0pIC5heDZzZWxlY3QtZGlzcGxheS10YWJsZSBbZGF0YS1heDZ1aS1zZWxlY3QtZGlzcGxheT1cXFwiYWRkb25cXFwiXSAuYWRkb24taWNvbi1jbG9zZWQgLmFkZG9uLWljb24tYXJyb3csIC5heDZ1aS1zZWxlY3QtZGlzcGxheS5kZWZhdWx0W2RhdGEtc2VsZWN0LW9wdGlvbi1ncm91cC1vcGVuZWRdOm5vdChbZGlzYWJsZWRdKSAuYXg2c2VsZWN0LWRpc3BsYXktdGFibGUgW2RhdGEtYXg2dWktc2VsZWN0LWRpc3BsYXk9XFxcImFkZG9uXFxcIl0gLmFkZG9uLWljb24tY2xvc2VkIC5hZGRvbi1pY29uLWFycm93IHtcXG4gICAgICBib3JkZXItdG9wLWNvbG9yOiAjNTU1OyB9XFxuICAgIC5heDZ1aS1zZWxlY3QtZGlzcGxheS5kZWZhdWx0OmhvdmVyOm5vdChbZGlzYWJsZWRdKSAuYXg2c2VsZWN0LWRpc3BsYXktdGFibGUgW2RhdGEtYXg2dWktc2VsZWN0LWRpc3BsYXk9XFxcImFkZG9uXFxcIl0gLmFkZG9uLWljb24tb3BlbmVkIC5hZGRvbi1pY29uLWFycm93LCAuYXg2dWktc2VsZWN0LWRpc3BsYXkuZGVmYXVsdDphY3RpdmU6bm90KFtkaXNhYmxlZF0pIC5heDZzZWxlY3QtZGlzcGxheS10YWJsZSBbZGF0YS1heDZ1aS1zZWxlY3QtZGlzcGxheT1cXFwiYWRkb25cXFwiXSAuYWRkb24taWNvbi1vcGVuZWQgLmFkZG9uLWljb24tYXJyb3csIC5heDZ1aS1zZWxlY3QtZGlzcGxheS5kZWZhdWx0OmZvY3VzOm5vdChbZGlzYWJsZWRdKSAuYXg2c2VsZWN0LWRpc3BsYXktdGFibGUgW2RhdGEtYXg2dWktc2VsZWN0LWRpc3BsYXk9XFxcImFkZG9uXFxcIl0gLmFkZG9uLWljb24tb3BlbmVkIC5hZGRvbi1pY29uLWFycm93LCAuYXg2dWktc2VsZWN0LWRpc3BsYXkuZGVmYXVsdFtkYXRhLXNlbGVjdC1vcHRpb24tZ3JvdXAtb3BlbmVkXTpub3QoW2Rpc2FibGVkXSkgLmF4NnNlbGVjdC1kaXNwbGF5LXRhYmxlIFtkYXRhLWF4NnVpLXNlbGVjdC1kaXNwbGF5PVxcXCJhZGRvblxcXCJdIC5hZGRvbi1pY29uLW9wZW5lZCAuYWRkb24taWNvbi1hcnJvdyB7XFxuICAgICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogIzU1NTsgfVxcbiAgLmF4NnVpLXNlbGVjdC1kaXNwbGF5LmRlZmF1bHQgW2Rpc2FibGVkXSB7XFxuICAgIHVzZXItc2VsZWN0OiBub25lOyB9XFxuXFxuLmF4NnVpLXNlbGVjdC1vcHRpb24tZ3JvdXAge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIHotaW5kZXg6IDIwMDA7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiAwO1xcbiAgdG9wOiAwO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgYm94LXNoYWRvdzogMHB4IDBweCAzcHggMHB4IHJnYmEoMCwgMCwgMCwgMC4xNzUpO1xcbiAgYm9yZGVyOiAxcHggc29saWQ7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZiZmJmYjtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KGJvdHRvbSwgI2ZiZmJmYik7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gdG9wLCNmYmZiZmIpO1xcbiAgLXdlYmtpdC1hbmltYXRpb246IGF4LXNlbGVjdC1vcHRpb24tZ3JvdXAgMC4xcyBjdWJpYy1iZXppZXIoMC4xOSwgMSwgMC4yMiwgMSkgZm9yd2FyZHM7XFxuICAtbW96LWFuaW1hdGlvbjogYXgtc2VsZWN0LW9wdGlvbi1ncm91cCAwLjFzIGN1YmljLWJlemllcigwLjE5LCAxLCAwLjIyLCAxKSBmb3J3YXJkcztcXG4gIGFuaW1hdGlvbjogYXgtc2VsZWN0LW9wdGlvbi1ncm91cCAwLjFzIGN1YmljLWJlemllcigwLjE5LCAxLCAwLjIyLCAxKSBmb3J3YXJkcztcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDApO1xcbiAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7XFxuICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDApO1xcbiAgLW8tdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDApO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDApO1xcbiAgLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgdG9wO1xcbiAgLW1vei10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgdG9wO1xcbiAgLW1zLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciB0b3A7XFxuICAtby10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgdG9wO1xcbiAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIHRvcDsgfVxcbiAgLmF4NnVpLXNlbGVjdC1vcHRpb24tZ3JvdXAuZGVzdHJveSB7XFxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBheC1zZWxlY3Qtb3B0aW9uLWdyb3VwLWRlc3Ryb3kgMC4xcyBjdWJpYy1iZXppZXIoMC45NSwgMC4wNSwgMC43OTUsIDAuMDM1KSBmb3J3YXJkcztcXG4gICAgLW1vei1hbmltYXRpb246IGF4LXNlbGVjdC1vcHRpb24tZ3JvdXAtZGVzdHJveSAwLjFzIGN1YmljLWJlemllcigwLjk1LCAwLjA1LCAwLjc5NSwgMC4wMzUpIGZvcndhcmRzO1xcbiAgICBhbmltYXRpb246IGF4LXNlbGVjdC1vcHRpb24tZ3JvdXAtZGVzdHJveSAwLjFzIGN1YmljLWJlemllcigwLjk1LCAwLjA1LCAwLjc5NSwgMC4wMzUpIGZvcndhcmRzOyB9XFxuICAuYXg2dWktc2VsZWN0LW9wdGlvbi1ncm91cC5kaXJlY3Rpb24tdG9wIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgdG9wO1xcbiAgICAtbW96LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciB0b3A7XFxuICAgIC1tcy10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgdG9wO1xcbiAgICAtby10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgdG9wO1xcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgdG9wOyB9XFxuICAuYXg2dWktc2VsZWN0LW9wdGlvbi1ncm91cC5kaXJlY3Rpb24tYm90dG9tIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgYm90dG9tO1xcbiAgICAtbW96LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciBib3R0b207XFxuICAgIC1tcy10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgYm90dG9tO1xcbiAgICAtby10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgYm90dG9tO1xcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgYm90dG9tOyB9XFxuICAuYXg2dWktc2VsZWN0LW9wdGlvbi1ncm91cC5kZWZhdWx0IHtcXG4gICAgYm9yZGVyLWNvbG9yOiAjY2NjO1xcbiAgICBjb2xvcjogIzU1NTsgfVxcbiAgICAuYXg2dWktc2VsZWN0LW9wdGlvbi1ncm91cC5kZWZhdWx0IC5heC1zZWxlY3QtYm9keSAuYXgtc2VsZWN0LW9wdGlvbi1ncm91cC1jb250ZW50IC5heC1zZWxlY3Qtb3B0aW9uLWl0ZW06aG92ZXIsIC5heDZ1aS1zZWxlY3Qtb3B0aW9uLWdyb3VwLmRlZmF1bHQgLmF4LXNlbGVjdC1ib2R5IC5heC1zZWxlY3Qtb3B0aW9uLWdyb3VwLWNvbnRlbnQgLmF4LXNlbGVjdC1vcHRpb24taXRlbS5ob3ZlciB7XFxuICAgICAgYmFja2dyb3VuZDogI2E2YTZhNiAhaW1wb3J0YW50O1xcbiAgICAgIGNvbG9yOiAjMjIyMjIyOyB9XFxuICAgICAgLmF4NnVpLXNlbGVjdC1vcHRpb24tZ3JvdXAuZGVmYXVsdCAuYXgtc2VsZWN0LWJvZHkgLmF4LXNlbGVjdC1vcHRpb24tZ3JvdXAtY29udGVudCAuYXgtc2VsZWN0LW9wdGlvbi1pdGVtOmhvdmVyIC5heC1zZWxlY3Qtb3B0aW9uLWl0ZW0taG9sZGVyIC5heC1zZWxlY3Qtb3B0aW9uLWl0ZW0tY2VsbC5heC1zZWxlY3Qtb3B0aW9uLWl0ZW0tY2hlY2tib3ggLml0ZW0tY2hlY2tib3gtd3JhcC51c2VDaGVja0JveDphZnRlciwgLmF4NnVpLXNlbGVjdC1vcHRpb24tZ3JvdXAuZGVmYXVsdCAuYXgtc2VsZWN0LWJvZHkgLmF4LXNlbGVjdC1vcHRpb24tZ3JvdXAtY29udGVudCAuYXgtc2VsZWN0LW9wdGlvbi1pdGVtLmhvdmVyIC5heC1zZWxlY3Qtb3B0aW9uLWl0ZW0taG9sZGVyIC5heC1zZWxlY3Qtb3B0aW9uLWl0ZW0tY2VsbC5heC1zZWxlY3Qtb3B0aW9uLWl0ZW0tY2hlY2tib3ggLml0ZW0tY2hlY2tib3gtd3JhcC51c2VDaGVja0JveDphZnRlciB7XFxuICAgICAgICBib3JkZXItY29sb3I6ICMyMjIyMjIgIWltcG9ydGFudDsgfVxcbiAgICAuYXg2dWktc2VsZWN0LW9wdGlvbi1ncm91cC5kZWZhdWx0IC5heC1zZWxlY3QtYm9keSAuYXgtc2VsZWN0LW9wdGlvbi1ncm91cC1jb250ZW50IC5heC1zZWxlY3Qtb3B0aW9uLWl0ZW1bZGF0YS1vcHRpb24tc2VsZWN0ZWQ9XFxcInRydWVcXFwiXSB7XFxuICAgICAgYmFja2dyb3VuZDogI2NjYztcXG4gICAgICBjb2xvcjogIzIyMjIyMjsgfVxcbiAgICAgIC5heDZ1aS1zZWxlY3Qtb3B0aW9uLWdyb3VwLmRlZmF1bHQgLmF4LXNlbGVjdC1ib2R5IC5heC1zZWxlY3Qtb3B0aW9uLWdyb3VwLWNvbnRlbnQgLmF4LXNlbGVjdC1vcHRpb24taXRlbVtkYXRhLW9wdGlvbi1zZWxlY3RlZD1cXFwidHJ1ZVxcXCJdIC5heC1zZWxlY3Qtb3B0aW9uLWl0ZW0taG9sZGVyIC5heC1zZWxlY3Qtb3B0aW9uLWl0ZW0tY2VsbC5heC1zZWxlY3Qtb3B0aW9uLWl0ZW0tY2hlY2tib3ggLml0ZW0tY2hlY2tib3gtd3JhcC51c2VDaGVja0JveDphZnRlciB7XFxuICAgICAgICBib3JkZXItY29sb3I6ICMyMjIyMjIgIWltcG9ydGFudDsgfVxcbiAgICAuYXg2dWktc2VsZWN0LW9wdGlvbi1ncm91cC5kZWZhdWx0IC5heC1zZWxlY3QtYm9keSAuYXgtc2VsZWN0LW9wdGlvbi1ncm91cC1jb250ZW50IC5heC1zZWxlY3Qtb3B0aW9uLWdyb3VwIC5heC1zZWxlY3Qtb3B0aW9uLWl0ZW0taG9sZGVyIC5heC1zZWxlY3Qtb3B0aW9uLWdyb3VwLWxhYmVsIHtcXG4gICAgICBiYWNrZ3JvdW5kOiAjZWVlOyB9XFxuICAgIC5heDZ1aS1zZWxlY3Qtb3B0aW9uLWdyb3VwLmRlZmF1bHQgLmF4LXNlbGVjdC1ib2R5IC5heC1zZWxlY3Qtb3B0aW9uLWdyb3VwLWJ1dHRvbnMge1xcbiAgICAgIGJvcmRlci10b3A6IDFweCBzb2xpZDtcXG4gICAgICBib3JkZXItY29sb3I6ICNjY2M7IH1cXG4gIC5heDZ1aS1zZWxlY3Qtb3B0aW9uLWdyb3VwIC5heC1zZWxlY3QtYm9keSB7XFxuICAgIHBhZGRpbmc6IDBweDsgfVxcbiAgICAuYXg2dWktc2VsZWN0LW9wdGlvbi1ncm91cCAuYXgtc2VsZWN0LWJvZHkgLmF4LXNlbGVjdC1vcHRpb24tZ3JvdXAtY29udGVudCB7XFxuICAgICAgbWF4LWhlaWdodDogMTcwcHg7XFxuICAgICAgb3ZlcmZsb3cteTogYXV0bztcXG4gICAgICAtd2Via2l0LW92ZXJmbG93LXNjcm9sbGluZzogdG91Y2g7XFxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuICAgICAgLmF4NnVpLXNlbGVjdC1vcHRpb24tZ3JvdXAgLmF4LXNlbGVjdC1ib2R5IC5heC1zZWxlY3Qtb3B0aW9uLWdyb3VwLWNvbnRlbnQgLmF4LXNlbGVjdC1vcHRpb24taXRlbSB7XFxuICAgICAgICBwYWRkaW5nOiAzcHggMHB4O1xcbiAgICAgICAgdGV4dC1hbGlnbjogbGVmdDtcXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgICAgIGZvbnQtc2l6ZTogMTJweDtcXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgICAgICBvdmVyZmxvdzogaGlkZGVuOyB9XFxuICAgICAgICAuYXg2dWktc2VsZWN0LW9wdGlvbi1ncm91cCAuYXgtc2VsZWN0LWJvZHkgLmF4LXNlbGVjdC1vcHRpb24tZ3JvdXAtY29udGVudCAuYXgtc2VsZWN0LW9wdGlvbi1pdGVtIC5heC1zZWxlY3Qtb3B0aW9uLWl0ZW0taG9sZGVyIHtcXG4gICAgICAgICAgZGlzcGxheTogdGFibGU7XFxuICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgICAgICAgYm9yZGVyLWNvbGxhcHNlOiBzZXBhcmF0ZTtcXG4gICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgICAgIGhlaWdodDogMTdweDsgfVxcbiAgICAgICAgICAuYXg2dWktc2VsZWN0LW9wdGlvbi1ncm91cCAuYXgtc2VsZWN0LWJvZHkgLmF4LXNlbGVjdC1vcHRpb24tZ3JvdXAtY29udGVudCAuYXgtc2VsZWN0LW9wdGlvbi1pdGVtIC5heC1zZWxlY3Qtb3B0aW9uLWl0ZW0taG9sZGVyIC5heC1zZWxlY3Qtb3B0aW9uLWl0ZW0tY2VsbCB7XFxuICAgICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgICAgICAgICBkaXNwbGF5OiB0YWJsZS1jZWxsO1xcbiAgICAgICAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxuICAgICAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gICAgICAgICAgICBmb250LXNpemU6IDEycHg7XFxuICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDE3cHg7XFxuICAgICAgICAgICAgcGFkZGluZzogMHB4IDBweCAwcHggMHB4O1xcbiAgICAgICAgICAgIHVzZXItc2VsZWN0OiBub25lOyB9XFxuICAgICAgICAgICAgLmF4NnVpLXNlbGVjdC1vcHRpb24tZ3JvdXAgLmF4LXNlbGVjdC1ib2R5IC5heC1zZWxlY3Qtb3B0aW9uLWdyb3VwLWNvbnRlbnQgLmF4LXNlbGVjdC1vcHRpb24taXRlbSAuYXgtc2VsZWN0LW9wdGlvbi1pdGVtLWhvbGRlciAuYXgtc2VsZWN0LW9wdGlvbi1pdGVtLWNlbGwuYXgtc2VsZWN0LW9wdGlvbi1pdGVtLWNoZWNrYm94IHtcXG4gICAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgICAgICAgICAgICB3aWR0aDogMTJweDtcXG4gICAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjsgfVxcbiAgICAgICAgICAgICAgLmF4NnVpLXNlbGVjdC1vcHRpb24tZ3JvdXAgLmF4LXNlbGVjdC1ib2R5IC5heC1zZWxlY3Qtb3B0aW9uLWdyb3VwLWNvbnRlbnQgLmF4LXNlbGVjdC1vcHRpb24taXRlbSAuYXgtc2VsZWN0LW9wdGlvbi1pdGVtLWhvbGRlciAuYXgtc2VsZWN0LW9wdGlvbi1pdGVtLWNlbGwuYXgtc2VsZWN0LW9wdGlvbi1pdGVtLWNoZWNrYm94IC5pdGVtLWNoZWNrYm94LXdyYXAge1xcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgICAgICAgICAgICB3aWR0aDogMTJweDtcXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAxN3B4OyB9XFxuICAgICAgICAgICAgICAgIC5heDZ1aS1zZWxlY3Qtb3B0aW9uLWdyb3VwIC5heC1zZWxlY3QtYm9keSAuYXgtc2VsZWN0LW9wdGlvbi1ncm91cC1jb250ZW50IC5heC1zZWxlY3Qtb3B0aW9uLWl0ZW0gLmF4LXNlbGVjdC1vcHRpb24taXRlbS1ob2xkZXIgLmF4LXNlbGVjdC1vcHRpb24taXRlbS1jZWxsLmF4LXNlbGVjdC1vcHRpb24taXRlbS1jaGVja2JveCAuaXRlbS1jaGVja2JveC13cmFwLnVzZUNoZWNrQm94OmFmdGVyIHtcXG4gICAgICAgICAgICAgICAgICBjb250ZW50OiAnJztcXG4gICAgICAgICAgICAgICAgICB3aWR0aDogOHB4O1xcbiAgICAgICAgICAgICAgICAgIGhlaWdodDogNHB4O1xcbiAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICAgICAgICAgICAgICB0b3A6IDQuMjVweDtcXG4gICAgICAgICAgICAgICAgICByaWdodDogMHB4O1xcbiAgICAgICAgICAgICAgICAgIGJvcmRlcjogMnB4IHNvbGlkICMwMDA7XFxuICAgICAgICAgICAgICAgICAgYm9yZGVyLXRvcDogbm9uZTtcXG4gICAgICAgICAgICAgICAgICBib3JkZXItcmlnaHQ6IG5vbmU7XFxuICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxuICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMC4xO1xcbiAgICAgICAgICAgICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoLTUwZGVnKTtcXG4gICAgICAgICAgICAgICAgICAtbW96LXRyYW5zZm9ybTogcm90YXRlKC01MGRlZyk7XFxuICAgICAgICAgICAgICAgICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKC01MGRlZyk7XFxuICAgICAgICAgICAgICAgICAgLW8tdHJhbnNmb3JtOiByb3RhdGUoLTUwZGVnKTtcXG4gICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtNTBkZWcpOyB9XFxuICAgICAgICAgICAgLmF4NnVpLXNlbGVjdC1vcHRpb24tZ3JvdXAgLmF4LXNlbGVjdC1ib2R5IC5heC1zZWxlY3Qtb3B0aW9uLWdyb3VwLWNvbnRlbnQgLmF4LXNlbGVjdC1vcHRpb24taXRlbSAuYXgtc2VsZWN0LW9wdGlvbi1pdGVtLWhvbGRlciAuYXgtc2VsZWN0LW9wdGlvbi1pdGVtLWNlbGwuYXgtc2VsZWN0LW9wdGlvbi1pdGVtLWxhYmVsIHtcXG4gICAgICAgICAgICAgIHBhZGRpbmc6IDBweCA3cHg7XFxuICAgICAgICAgICAgICBwYWRkaW5nLXJpZ2h0OiA4cHg7IH1cXG4gICAgICAgIC5heDZ1aS1zZWxlY3Qtb3B0aW9uLWdyb3VwIC5heC1zZWxlY3QtYm9keSAuYXgtc2VsZWN0LW9wdGlvbi1ncm91cC1jb250ZW50IC5heC1zZWxlY3Qtb3B0aW9uLWl0ZW1bZGF0YS1vcHRpb24tc2VsZWN0ZWQ9XFxcInRydWVcXFwiXSAuYXgtc2VsZWN0LW9wdGlvbi1pdGVtLWhvbGRlciAuYXgtc2VsZWN0LW9wdGlvbi1pdGVtLWNlbGwuYXgtc2VsZWN0LW9wdGlvbi1pdGVtLWNoZWNrYm94IC5pdGVtLWNoZWNrYm94LXdyYXAudXNlQ2hlY2tCb3g6YWZ0ZXIge1xcbiAgICAgICAgICBvcGFjaXR5OiAxOyB9XFxuICAgICAgLmF4NnVpLXNlbGVjdC1vcHRpb24tZ3JvdXAgLmF4LXNlbGVjdC1ib2R5IC5heC1zZWxlY3Qtb3B0aW9uLWdyb3VwLWNvbnRlbnQgLmF4LXNlbGVjdC1vcHRpb24tZ3JvdXAgLmF4LXNlbGVjdC1vcHRpb24taXRlbS1ob2xkZXIge1xcbiAgICAgICAgZGlzcGxheTogdGFibGU7XFxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgICAgICBib3JkZXItY29sbGFwc2U6IHNlcGFyYXRlO1xcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICAgICAgaGVpZ2h0OiAxN3B4OyB9XFxuICAgICAgICAuYXg2dWktc2VsZWN0LW9wdGlvbi1ncm91cCAuYXgtc2VsZWN0LWJvZHkgLmF4LXNlbGVjdC1vcHRpb24tZ3JvdXAtY29udGVudCAuYXgtc2VsZWN0LW9wdGlvbi1ncm91cCAuYXgtc2VsZWN0LW9wdGlvbi1pdGVtLWhvbGRlciAuYXgtc2VsZWN0LW9wdGlvbi1ncm91cC1sYWJlbCB7XFxuICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgICAgICAgIGRpc3BsYXk6IHRhYmxlLWNlbGw7XFxuICAgICAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxuICAgICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcXG4gICAgICAgICAgbGluZS1oZWlnaHQ6IDE3cHg7XFxuICAgICAgICAgIHBhZGRpbmc6IDVweCAxMHB4O1xcbiAgICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTsgfVxcbiAgICAuYXg2dWktc2VsZWN0LW9wdGlvbi1ncm91cCAuYXgtc2VsZWN0LWJvZHkgLmF4LXNlbGVjdC1vcHRpb24tZ3JvdXAtYnV0dG9ucyB7XFxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICAgIHBhZGRpbmc6IDNweCAwcHg7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vc3JjL0FYNlVJU2VsZWN0L3N0eWxlLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDk0XG4vLyBtb2R1bGUgY2h1bmtzID0gNSJdLCJzb3VyY2VSb290IjoiIn0=