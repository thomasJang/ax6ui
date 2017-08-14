webpackJsonp([12],{

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jqmin = __webpack_require__(6);

var _jqmin2 = _interopRequireDefault(_jqmin);

var _AX6UIAutocomplete = __webpack_require__(95);

var _AX6UIAutocomplete2 = _interopRequireDefault(_AX6UIAutocomplete);

__webpack_require__(96);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var html = "\n<div class=\"row\">\n    <div class=\"input-field col s12\">\n        <div data-ax6ui-autocomplete=\"ac1\" data-ax6ui-autocomplete-config='{}'></div>\n    </div>\n</div>\n";
var fn = {
  moduleRun: function moduleRun($body) {
    var options = [];
    options.push({ value: "1", text: "string" });
    options.push({ value: "2", text: "number" });
    options.push({ value: "3", text: "substr" });
    options.push({ value: "4", text: "substring" });
    options.push({ value: "5", text: "search" });
    options.push({ value: "6", text: "parseInt" });
    options.push({ value: "7", text: "toFixed" });
    options.push({ value: "8", text: "min" });
    options.push({ value: "9", text: "max" });
    options.push({ value: "10", text: "장기영" });
    options.push({ value: "11", text: "장서우" });
    options.push({ value: "12", text: "이영희" });
    options.push({ value: "13", text: "황인서" });
    options.push({ value: "14", text: "황세진" });
    options.push({ value: "15", text: "이서연" });
    options.push({ value: "16", text: "액시스제이" });
    options.push({ value: "17", text: "ax5" });
    options.push({ value: "18", text: "ax5grid" });
    options.push({ value: "19", text: "ax5combobox" });
    options.push({ value: "20", text: "ax5autocomplete" });
    options.push({ value: "21", text: "ax5binder" });
    options.push({ value: "22", text: "ax5select" });
    options.push({ value: "23", text: "ax5mask" });
    options.push({ value: "24", text: "ax5toast" });
    options.push({ value: "25", text: "ax5dialog" });
    options.push({ value: "26", text: "ax5modal" });

    var autocomplete = new _AX6UIAutocomplete2.default({
      removeIcon: '<i class="tiny material-icons">close</i>'
    });

    autocomplete.bind({
      target: (0, _jqmin2.default)('[data-ax6ui-autocomplete="ac1"]'),
      height: 40,
      optionItemHeight: 30,
      onSearch: function onSearch(callback) {
        var searchWord = this.searchWord;

        setTimeout(function () {
          var regExp = new RegExp(searchWord);
          var myOptions = [];
          options.forEach(function (n) {
            if (n.text.match(regExp)) {
              myOptions.push({
                value: n.value,
                text: n.text
              });
            }
          });

          callback({
            options: myOptions
          });
        }, 150);
      }
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

/***/ 95:
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
  //"8": "KEY_BACKSPACE",
  "17": "KEY_CONTROL",
  "46": "KEY_DELETE",
  "40": "KEY_DOWN",
  "35": "KEY_END",
  "187": "KEY_EQUAL",
  //"27": "KEY_ESC",
  "36": "KEY_HOME",
  "45": "KEY_INSERT",
  "37": "KEY_LEFT",
  "189": "KEY_MINUS",
  "34": "KEY_PAGEDOWN",
  "33": "KEY_PAGEUP",
  // "190": "KEY_PERIOD",
  //"13": "KEY_RETURN",
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
  "optionGroup": function optionGroup(columnKeys) {
    return "\n<div class=\"ax6ui-autocomplete-option-group {{theme}} {{size}}\" data-ax6ui-autocomplete-option-group=\"{{id}}\">\n    <div class=\"ax-autocomplete-body\">\n        <div class=\"ax-autocomplete-option-group-content\" data-els=\"content\"></div>\n    </div>\n    <div class=\"ax-autocomplete-arrow\"></div> \n</div>\n";
  },
  "autocompleteDisplay": function autocompleteDisplay(columnKeys) {
    return " \n<input tabindex=\"-1\" type=\"text\" data-input-dummy=\"\" style=\"display: none;\" />\n<div class=\"ax6ui-autocomplete-display {{theme}}\" data-ax6ui-autocomplete-display=\"{{id}}\" data-ax6ui-autocomplete-instance=\"{{instanceId}}\" style=\"height: {{height}}px;\">\n    <div class=\"ax6ui-autocomplete-display-table\" data-els=\"display-table\">\n        <div data-ax6ui-autocomplete-display=\"label-holder\"> \n          <a {{^tabIndex}}{{/tabIndex}}{{#tabIndex}}tabindex=\"{{tabIndex}}\" {{/tabIndex}} data-ax6ui-autocomplete-display=\"label\" spellcheck=\"false\" style=\"padding: 0 {{paddingLeft}}px;\">\n              <input type=\"text\" data-ax6ui-autocomplete-display=\"input\" style=\"border:0 none;height: {{optionItemHeight}}px;line-height: {{optionItemHeight}}px;\" />\n          </a>\n        </div>\n        <div data-ax6ui-autocomplete-display=\"addon\"> \n            {{#multiple}}{{#reset}}\n            <span class=\"addon-icon-reset\" data-selected-clear=\"true\">{{{.}}}</span>\n            {{/reset}}{{/multiple}}\n        </div>\n    </div>\n</div>\n";
  },
  "formSelect": function formSelect(columnKeys) {
    return "\n<select tabindex=\"-1\" class=\"form-control {{formSize}}\" name=\"{{name}}\" multiple=\"multiple\"></select>\n";
  },
  "formSelectOptions": function formSelectOptions(columnKeys) {
    return "\n{{#selected}}\n<option value=\"{{" + columnKeys.optionValue + "}}\" selected=\"true\">{{" + columnKeys.optionText + "}}</option>\n{{/selected}}\n";
  },
  "options": function options(columnKeys) {
    return "\n{{#waitOptions}}\n    <div class=\"ax-autocomplete-option-item\">\n            <div class=\"ax-autocomplete-option-item-holder\">\n                <span class=\"ax-autocomplete-option-item-cell ax-autocomplete-option-item-label\">\n                    {{{lang.loading}}}\n                </span>\n            </div>\n        </div>\n{{/waitOptions}}\n{{^waitOptions}}\n    {{#options}}\n        {{^hide}}\n        <div class=\"ax-autocomplete-option-item\" data-option-focus-index=\"{{@findex}}\" data-option-index=\"{{@index}}\" data-option-value=\"{{" + columnKeys.optionValue + "}}\" {{#" + columnKeys.optionSelected + "}}data-option-selected=\"true\"{{/" + columnKeys.optionSelected + "}}>\n            <div class=\"ax-autocomplete-option-item-holder\">\n                <span class=\"ax-autocomplete-option-item-cell ax-autocomplete-option-item-label\">{{" + columnKeys.optionText + "}}</span>\n            </div>\n        </div>\n        {{/hide}}\n    {{/options}}\n    {{^options}}\n        <div class=\"ax-autocomplete-option-item\">\n            <div class=\"ax-autocomplete-option-item-holder\">\n                <span class=\"ax-autocomplete-option-item-cell ax-autocomplete-option-item-label\">\n                    {{{lang.noOptions}}}\n                </span>\n            </div>\n        </div>\n    {{/options}}\n{{/waitOptions}}\n";
  },
  "label": function label(columnKeys) {
    return "{{#selected}}\n<div tabindex=\"-1\" data-ax6ui-autocomplete-selected-label=\"{{@i}}\" data-ax6ui-autocomplete-selected-text=\"{{text}}\" style=\"height: {{optionItemHeight}}px;\">  \n  <div class=\"label-cell\">{{" + columnKeys.optionText + "}}</div>\n  <div class=\"label-cell\" data-ax6ui-autocomplete-remove=\"true\" data-ax6ui-autocomplete-remove-index=\"{{@i}}\">{{{removeIcon}}}</div>\n</div>{{/selected}}";
  }
};

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
var alignAutocompleteDisplay = function alignAutocompleteDisplay() {
  var _this = this;

  var i = this.queue.length,
      w = void 0;

  var _loop = function _loop() {
    var item = _this.queue[i];
    if (item.$display) {
      w = Math.max(item.$select.outerWidth(), _AX6Util2.default.number(item.minWidth));
      item.$display.css({
        "min-width": w
      });
      if (item.reset) {
        item.$display.find(".addon-icon-reset").css({
          "line-height": _this.queue[i].$display.height() + "px"
        });
      }

      // 높이조절 처리
      if (item.multiple) {
        displayTableHeightAdjust = function () {
          return _AX6Util2.default.number(item.$display.css("border-top-width")) + _AX6Util2.default.number(item.$display.css("border-bottom-width"));
        }.call(_this);

        item.$target.height('');
        item.$display.height('');

        displayTableHeight = item.$displayTable.outerHeight();

        if (Math.abs(displayTableHeight - item.$target.height()) > displayTableHeightAdjust) {
          item.$target.css({ height: displayTableHeight + displayTableHeightAdjust + 4 });
          item.$display.css({ height: displayTableHeight + displayTableHeightAdjust + 4 });
        }
      }
    }
  };

  while (i--) {
    var displayTableHeightAdjust;
    var displayTableHeight;

    _loop();
  }

  i = null;
  w = null;
  return this;
};
var alignAutocompleteOptionGroup = function alignAutocompleteOptionGroup(append) {
  if (append && !this.activeautocompleteOptionGroup) return this;

  var item = this.queue[this.activeautocompleteQueueIndex],
      pos = {},
      positionMargin = 0,
      dim = {},
      pickerDim = {},
      pickerDirection = void 0;

  if (!item) return this;
  if (append) (0, _jqmin2.default)(document.body).append(this.activeautocompleteOptionGroup);

  pos = item.$target.offset();
  dim = {
    width: item.$target.outerWidth(),
    height: item.$target.outerHeight()
  };
  pickerDim = {
    winWidth: Math.max((0, _jqmin2.default)(window).width(), (0, _jqmin2.default)(document.body).width()),
    winHeight: Math.max((0, _jqmin2.default)(window).height(), (0, _jqmin2.default)(document.body).height()),
    width: this.activeautocompleteOptionGroup.outerWidth(),
    height: this.activeautocompleteOptionGroup.outerHeight()
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
    this.activeautocompleteOptionGroup.addClass("direction-" + pickerDirection);
  }
  this.activeautocompleteOptionGroup.css(function () {
    if (pickerDirection == "top") {
      if (pos.top + dim.height + pickerDim.height + positionMargin > pickerDim.winHeight) {

        var newTop = pos.top + pickerDim.height;
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
  if (!this.activeautocompleteOptionGroup) return this;

  var item = this.queue[this.activeautocompleteQueueIndex],
      clickEl = "display";

  target = _AX6Util2.default.findParentNode(e.target, function (target) {
    if (target.getAttribute("data-option-value")) {
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
    setSelected.call(this, item.id, {
      optionIndex: {
        index: target.getAttribute("data-option-index")
      }
    }, undefined, "optionItemClick");
    alignAutocompleteDisplay.call(this);
    alignAutocompleteOptionGroup.call(this);
    if (!item.multiple) {
      this.close();
    }
  } else {}

  return this;
};
var getLabel = function getLabel(queIdx) {
  var item = this.queue[queIdx];

  // 템플릿에 전달 해야할 데이터 선언
  var data = {};
  data.id = item.id;
  data.theme = item.theme;
  data.multiple = item.multiple;
  data.lang = item.lang;
  data.options = item.options;
  data.selected = item.selected;
  data.hasSelected = data.selected && data.selected.length > 0;
  data.removeIcon = item.removeIcon;
  data.height = item.height;
  data.optionItemHeight = item.optionItemHeight;

  return _AX6Mustache2.default.render(tmpl.label.call(this, item.columnKeys), data);
};
var syncLabel = function syncLabel(queIdx) {
  var item = this.queue[queIdx];

  if (!item.multiple && item.selected && item.selected.length > 0) {
    item.selected = [].concat(item.selected[item.selected.length - 1]);
  }

  item.selected.forEach(function (n, nindex) {
    n["@index"] = nindex;
  });

  item.$select.html(_AX6Mustache2.default.render(tmpl.formSelectOptions.call(this, item.columnKeys), {
    selected: item.selected
  }));
};
var printLabel = function printLabel(queIdx) {
  var item = this.queue[queIdx];

  item.$displayLabel.find('[data-ax6ui-autocomplete-selected-label]').remove();
  item.$displayLabelInput.before(getLabel.call(this, queIdx));
};
var focusLabel = function focusLabel(queIdx) {
  if (this.queue[queIdx].disabled) return this;

  this.queue[queIdx].$displayLabel.trigger("focus");
  this.queue[queIdx].$displayLabelInput.focus();
};
var clearLabel = function clearLabel(queIdx) {
  this.queue[queIdx].$displayLabelInput.val('');
};
var blurLabel = function blurLabel(queIdx) {
  this.queue[queIdx].$displayLabel.trigger("blur");
};
var onSearch = function onSearch(queIdx, searchWord) {
  if (this.activeautocompleteQueueIndex == -1) return this; // 옵션박스가 닫힌상태이면 진행안함.
  var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
  searchWord = searchWord.replace(regExp, "");

  this.queue[queIdx].waitOptions = true;
  this.queue[queIdx].onSearch.call({
    self: this,
    item: this.queue[queIdx],
    searchWord: searchWord
  }, function (O) {

    var data = {};
    var item = this.queue[this.activeautocompleteQueueIndex];
    if (!item) return false;

    /// 현재 selected 검증후 처리
    (function (item, O) {
      var optionsMap = {};
      O.options.forEach(function (_O, _OIndex) {
        _O["@index"] = _OIndex;
        _O["@findex"] = _OIndex;
        optionsMap[_O[item.columnKeys.optionValue]] = _O;
      });
      if (_AX6Util2.default.isArray(item.selected)) {
        item.selected.forEach(function (_O) {
          if (optionsMap[_O[item.columnKeys.optionValue]]) {
            O.options[optionsMap[_O[item.columnKeys.optionValue]]["@index"]][item.columnKeys.optionSelected] = true;
          }
        });
      }
    })(item, O);

    item.options = O.options;

    alignAutocompleteDisplay.call(this);

    /// 템플릿에 전달할 오브젝트 선언
    data.id = item.id;
    data.theme = item.theme;
    data.multiple = item.multiple;
    data.lang = item.lang;
    data.options = item.options;
    this.activeautocompleteOptionGroup.find('[data-els="content"]').html(_AX6Mustache2.default.render(tmpl.options.call(this, item.columnKeys), data));

    focusWord.call(this, this.activeautocompleteQueueIndex, searchWord);
    alignAutocompleteOptionGroup.call(this);

    setTimeout(function () {
      alignAutocompleteOptionGroup.call(this);
    }.bind(this));
  }.bind(this));
};
var focusWord = function focusWord(queIdx, searchWord) {
  if (this.activeautocompleteQueueIndex == -1) return this; // 옵션박스가 닫힌상태이면 진행안함.
  var collect_options = [],
      i = -1,
      l = this.queue[queIdx].options.length - 1,
      n = void 0;
  if (searchWord != "") {
    while (l - i++) {
      n = this.queue[queIdx].options[i];

      if (('' + n.text).toLowerCase() == searchWord.toLowerCase()) {
        collect_options = [{ '@findex': n['@findex'], optionsSort: 0 }];
        break;
      } else {
        var sort = ('' + n.text).toLowerCase().search(searchWord.toLowerCase());
        if (sort > -1) {
          collect_options.push({ '@findex': n['@findex'], optionsSort: sort });
          if (collect_options.length > 2) break;
        }
        sort = null;
      }
    }
    collect_options.sort(function (a, b) {
      return a.optionsSort - b.optionsSort;
    });
  }

  if (collect_options && collect_options.length > 0) {
    focusMove.call(this, queIdx, undefined, collect_options[0]['@findex']);
  } else {
    focusClear.call(this, queIdx);
  }
};
var focusClear = function focusClear(queIdx) {
  if (this.activeautocompleteOptionGroup) {
    this.activeautocompleteOptionGroup.find('[data-option-focus-index]').removeClass("hover").removeAttr("data-option-selected");
  }

  this.queue[queIdx].optionFocusIndex = -1;
};
var focusMove = function focusMove(queIdx, direction, findex) {
  var _focusIndex = void 0,
      _prevFocusIndex = void 0,
      focusOptionEl = void 0,
      optionGroupScrollContainer = void 0;
  var item = this.queue[queIdx];

  if (this.activeautocompleteOptionGroup && item.options && item.options.length > 0) {

    if (typeof findex !== "undefined") {
      _focusIndex = findex;
    } else {
      _prevFocusIndex = item.optionFocusIndex == -1 ? item.optionSelectedIndex || -1 : item.optionFocusIndex;
      if (_prevFocusIndex == -1) {
        _focusIndex = 0;
        //_focusIndex = (direction > 0) ? 0 : item.optionItemLength - 1; // 맨 끝으로 보낼것인가 말 것인가.
      } else {
        _focusIndex = _prevFocusIndex + direction;
        if (_focusIndex < 0) _focusIndex = 0;else if (_focusIndex > item.optionItemLength - 1) _focusIndex = item.optionItemLength - 1;
      }
    }

    item.optionFocusIndex = _focusIndex;

    // 포커스 인덱스가 hide아이템을 만나면 hide 아이템이 안나올 때까지 루프를 순회 합니다.
    if (item.options[_focusIndex] && item.options[_focusIndex].hide) {
      // 옵션이 없는 값이 선택된 경우
      if (typeof direction === "undefined") {
        return this;
      } else {
        var isStrop = false;
        while (item.options[_focusIndex].hide) {
          _focusIndex = _focusIndex + direction;
          if (_focusIndex < 0) {
            _focusIndex = 0;
            break;
          } else if (_focusIndex > item.optionItemLength - 1) {
            _focusIndex = item.optionItemLength - 1;
            break;
          }
        }
      }
    }

    if (typeof _focusIndex !== "undefined") {
      this.activeautocompleteOptionGroup.find('[data-option-focus-index]').removeClass("hover");

      focusOptionEl = this.activeautocompleteOptionGroup.find('[data-option-focus-index="' + _focusIndex + '"]').addClass("hover");

      optionGroupScrollContainer = this.activeautocompleteOptionGroup.find('[data-els="content"]');

      if (focusOptionEl.get(0)) {
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

        if (typeof direction !== "undefined") {
          item.$displayLabelInput.val(item.options[_focusIndex].text);
        }
      }
    }
  }
};
var bindAutocompleteTarget = function bindAutocompleteTarget(queIdx) {
  var item = this.queue[queIdx],
      data = {};
  var debouncedFocusWord = _AX6Util2.default.debounce(function (queIdx) {
    if (this.activeautocompleteQueueIndex == -1) return this; // 옵션박스가 닫힌상태이면 진행안함.
    onSearch.call(this, queIdx, this.queue[queIdx].$displayLabelInput.val());
  }, 100).bind(this);
  var autocompleteEvent = {
    'click': function click(queIdx, e) {
      var clickEl = "";
      var target = _AX6Util2.default.findParentNode(e.target, function (target) {
        if (target.getAttribute("data-ax6ui-autocomplete-remove")) {
          clickEl = "optionItemRemove";
          return true;
        } else if (target.getAttribute("data-selected-clear")) {
          clickEl = "clear";
          return true;
        }
      });

      if (target) {
        if (clickEl === "optionItemRemove") {
          var removeIndex = target.getAttribute("data-ax6ui-autocomplete-remove-index");
          this.queue[queIdx].selected.splice(removeIndex, 1);
          syncLabel.call(this, queIdx);
          printLabel.call(this, queIdx);
          focusLabel.call(this, queIdx);
          alignAutocompleteDisplay.call(this);
          alignAutocompleteOptionGroup.call(this);
          _AX6Util2.default.stopEvent(e);
          return this;
        } else if (clickEl === "clear") {
          setSelected.call(this, queIdx, { clear: true });
          alignAutocompleteDisplay.call(this);
          alignAutocompleteOptionGroup.call(this);
        }
      } else {
        if (this.activeautocompleteQueueIndex == queIdx) {
          if (this.queue[queIdx].optionFocusIndex == -1) {
            // 아이템에 포커스가 활성화 된 후, 마우스 이벤트 이면 무시
            this.close();
          }
        } else {
          focusLabel.call(this, queIdx);
        }
      }
    },
    'keyUp': function keyUp(queIdx, e) {
      /// 약속된 키 이벤트가 발생하면 stopEvent를 통해 keyUp 이벤트가 발생되지 않도록 막아주는 센스
      if (e.which == _AX6Info2.default.eventKeys.ESC && this.activeautocompleteQueueIndex === -1) {
        // ESC키를 누르고 옵션그룹이 열려있지 않은 경우
        _AX6Util2.default.stopEvent(e);
        return this;
      } else if (e.which == _AX6Info2.default.eventKeys.TAB) {
        // nothing
        this.close();
        return this;
      } else if (this.activeautocompleteQueueIndex != queIdx && e.which != _AX6Info2.default.eventKeys.BACKSPACE) {
        // 닫힌 상태 인경우
        this.open(queIdx); // open and align
        debouncedFocusWord(queIdx);
      }

      if (ctrlKeys[e.which]) {
        _AX6Util2.default.stopEvent(e);
      } else {
        // backspace 감지 하여 input 값이 없으면 스탑이벤트 처리 할 것
        if (e.which == _AX6Info2.default.eventKeys.BACKSPACE && this.queue[queIdx].$displayLabelInput.val() == "") {
          // 마지막 아이템을 제거.
          this.queue[queIdx].selected.pop();
          syncLabel.call(this, queIdx);
          printLabel.call(this, queIdx);
          focusLabel.call(this, queIdx);
          alignAutocompleteDisplay.call(this);
          alignAutocompleteOptionGroup.call(this);
          _AX6Util2.default.stopEvent(e);
        } else {
          debouncedFocusWord(queIdx);
        }
      }
    },
    'keyDown': function keyDown(queIdx, e) {
      var item = this.queue[queIdx];
      if (e.which == _AX6Info2.default.eventKeys.ESC) {
        clearLabel.call(this, queIdx);
        this.close();
        _AX6Util2.default.stopEvent(e);
      } else if (e.which == _AX6Info2.default.eventKeys.RETURN) {
        var inputValue = item.$displayLabelInput.val();
        if (item.optionFocusIndex > -1) {
          setSelected.call(this, item.id, {
            optionIndex: {
              index: item.optionFocusIndex
            }
          }, undefined, "optionItemClick");
        } else if (inputValue != "") {
          setSelected.call(this, queIdx, inputValue, true);
        }
        clearLabel.call(this, queIdx);
        alignAutocompleteDisplay.call(this);
        this.close();

        _AX6Util2.default.stopEvent(e);
      } else if (e.which == _AX6Info2.default.eventKeys.DOWN) {
        focusMove.call(this, queIdx, 1);
        _AX6Util2.default.stopEvent(e);
      } else if (e.which == _AX6Info2.default.eventKeys.UP) {
        focusMove.call(this, queIdx, -1);
        _AX6Util2.default.stopEvent(e);
      }
    },
    'focus': function focus(queIdx, e) {
      // console.log(e);
    },
    'blur': function blur(queIdx, e) {
      blurLabel.call(this, queIdx);
      _AX6Util2.default.stopEvent(e);
    },
    'selectChange': function selectChange(queIdx, e) {
      setSelected.call(this, queIdx, { value: item.$select.val() }, true);
    }
  };
  var blurLabel = function blurLabel(queIdx) {
    clearLabel.call(this, queIdx);
  };

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
    data.optionItemHeight = item.optionItemHeight;
    data.paddingLeft = (item.height - item.optionItemHeight) / 2;
    data.label = getLabel.call(this, queIdx);

    item.$display = (0, _jqmin2.default)(_AX6Mustache2.default.render(tmpl.autocompleteDisplay.call(this, item.columnKeys), data));
    item.$displayTable = item.$display.find('[data-els="display-table"]');
    item.$displayLabel = item.$display.find('[data-ax6ui-autocomplete-display="label"]');
    item.$displayLabelInput = item.$display.find('[data-ax6ui-autocomplete-display="input"]');

    if (item.$target.find("select").get(0)) {
      item.$select = item.$target.find("select");
      item.$select.attr("tabindex", "-1").attr("class", "form-control " + data.formSize);

      if (data.name) {
        item.$select.attr("name", "name");
      }
      item.$select.attr("multiple", "multiple");
    } else {
      item.$select = (0, _jqmin2.default)(_AX6Mustache2.default.render(tmpl.formSelect.call(this, item.columnKeys), data));
      item.$target.append(item.$select);
    }

    item.$target.append(item.$display);
  } else {
    printLabel.call(this, queIdx);
  }

  alignAutocompleteDisplay.call(this);

  item.$display.off('click.ax6ui-autocomplete').on('click.ax6ui-autocomplete', autocompleteEvent.click.bind(this, queIdx));

  // autocomplete 태그에 대한 이벤트 감시

  item.$displayLabelInput.off("focus.ax6ui-autocomplete").on("focus.ax6ui-autocomplete", autocompleteEvent.focus.bind(this, queIdx)).off("blur.ax6ui-autocomplete").on("blur.ax6ui-autocomplete", autocompleteEvent.blur.bind(this, queIdx)).off("keydown.ax6ui-autocomplete").on("keydown.ax6ui-autocomplete", autocompleteEvent.keyDown.bind(this, queIdx)).off("keyup.ax6ui-autocomplete").on("keyup.ax6ui-autocomplete", autocompleteEvent.keyUp.bind(this, queIdx));

  // select 태그에 대한 change 이벤트 감시

  /*
    item.$select
      .off('change.ax6ui-autocomplete')
      .on('change.ax6ui-autocomplete', autocompleteEvent.selectChange.bind(this, queIdx));
    */

  data = null;
  item = null;
  queIdx = null;
  return this;
};
var getQueIdx = function getQueIdx(boundID) {
  if (boundID instanceof _jqmin2.default) {
    boundID = boundID.data("data-ax6ui-autocomplete-id");
  } else if (!_AX6Util2.default.isString(boundID)) {
    boundID = (0, _jqmin2.default)(boundID).data("data-ax6ui-autocomplete-id");
  }
  if (!_AX6Util2.default.isString(boundID)) {
    console.log(_AX6Info2.default.getError("ax6ui-autocomplete", "402", "getQueIdx"));
    return;
  }
  return _AX6Util2.default.search(this.queue, function () {
    return this.id == boundID;
  });
};
var getSelected = function getSelected(_item, o, selected) {
  if (typeof selected === "undefined") {
    return _item.multiple ? !o : true;
  } else {
    return selected;
  }
};
var clearSelected = function clearSelected(queIdx) {
  this.queue[queIdx].options.forEach(function (n) {
    if (n.optgroup) {
      n.options.forEach(function (nn) {
        nn.selected = false;
      });
    } else {
      n.selected = false;
    }
  });

  this.queue[queIdx].selected = [];
  this.queue[queIdx].$select.html(_AX6Mustache2.default.render(tmpl.formSelectOptions.call(this, this.queue[queIdx].columnKeys), {
    selected: this.queue[queIdx].selected
  }));
};
var setSelected = function setSelected(boundID, value, selected, _option) {
  var processor = {
    'selectedIndex': function selectedIndex(queIdx, value, selected, setValueType) {},
    'removeSelectedIndex': function removeSelectedIndex(queIdx, value, selected, setValueType) {
      var item = this.queue[queIdx],
          addOptions = {};
      var newSelectedArray = [],
          optionIndex = 0;
      for (var i = 0; i < item.selected.length; i++) {
        if (item.selected[i]['@index'] != value.removeSelectedIndex.index) {
          addOptions = { '@index': optionIndex, '@findex': optionIndex };
          addOptions[item.columnKeys.optionValue] = item.selected[i][item.columnKeys.optionValue];
          addOptions[item.columnKeys.optionText] = item.selected[i][item.columnKeys.optionText];
          newSelectedArray.push(addOptions);
          optionIndex++;
        }
      }
      item.selected = newSelectedArray;
    },
    'optionIndex': function optionIndex(queIdx, value, selected, setValueType) {
      var item = this.queue[queIdx],
          addOptions = {};
      var optionIndex = item.selected.length;
      var pushOk = true;

      addOptions = {
        '@index': optionIndex, '@findex': optionIndex
      };
      addOptions[item.columnKeys.optionValue] = item.options[value.optionIndex.index][item.columnKeys.optionValue];
      addOptions[item.columnKeys.optionText] = item.options[value.optionIndex.index][item.columnKeys.optionText];

      for (var i = 0; i < item.selected.length; i++) {
        if (item.selected[i][item.columnKeys.optionValue] == addOptions[item.columnKeys.optionValue]) {
          pushOk = false;
        }
      }
      if (pushOk) item.selected.push(addOptions);
    },
    'arr': function arr(queIdx, values, selected, setValueType) {
      values.forEach(function (value) {
        if (_AX6Util2.default.isString(value) || _AX6Util2.default.isNumber(value)) {
          processor.text.call(self, queIdx, value, selected, "justSetValue");
        } else {
          for (var key in processor) {
            if (value[key]) {
              processor[key].call(self, queIdx, value, selected, "justSetValue");
              break;
            }
          }
        }
      });
    },
    'value': function value(queIdx, _value2, selected, setValueType) {
      var item = this.queue[queIdx];
      var addOptions;
      var optionIndex = _AX6Util2.default.search(item.options, function () {
        return this[item.columnKeys.optionValue] == _value2.value[item.columnKeys.optionValue];
      });

      if (optionIndex > -1) {
        item.options[optionIndex][item.columnKeys.optionSelected] = getSelected(item, item.options[optionIndex][item.columnKeys.optionSelected], selected);

        if (item.options[optionIndex][item.columnKeys.optionSelected]) {
          var appendOk = true;
          for (var i = 0; i < item.selected.length; i++) {
            if (item.selected[i][this.config.columnKeys.optionValue] == item.options[optionIndex][this.config.columnKeys.optionValue]) {
              appendOk = false;
              break;
            }
          }
          if (appendOk) {
            addOptions = {};
            addOptions[item.columnKeys.optionValue] = item.options[optionIndex][item.columnKeys.optionValue];
            addOptions[item.columnKeys.optionText] = item.options[optionIndex][item.columnKeys.optionText];
            item.selected.push(addOptions);
          }
        } else {
          var newSelectedArray = [];
          for (var i = 0; i < item.selected.length; i++) {
            if (item.selected[i][this.config.columnKeys.optionValue] == item.options[optionIndex][this.config.columnKeys.optionValue]) {} else {
              addOptions = {};
              addOptions[item.columnKeys.optionValue] = item.selected[i][item.columnKeys.optionValue];
              addOptions[item.columnKeys.optionText] = item.selected[i][item.columnKeys.optionText];
              newSelectedArray.push(addOptions);
            }
          }
          item.selected = newSelectedArray;
        }
      } else {
        // 새로운 값 추가
        var appendOk = true;
        for (var i = 0; i < item.selected.length; i++) {
          if (item.selected[i][this.config.columnKeys.optionValue] == _value2.value[this.config.columnKeys.optionValue]) {
            appendOk = false;
            break;
          }
        }

        if (appendOk) {
          addOptions = {};
          addOptions[item.columnKeys.optionValue] = _value2.value[this.config.columnKeys.optionValue];
          addOptions[item.columnKeys.optionText] = _value2.value[this.config.columnKeys.optionText];
          item.selected.push(addOptions);
        }
      }
    },
    'text': function text(queIdx, value, selected, setValueType) {
      var item = this.queue[queIdx];
      var addOptions;
      var optionIndex = _AX6Util2.default.search(item.options, function () {
        return this[item.columnKeys.optionText] == value;
      });

      if (optionIndex > -1) {
        item.options[optionIndex][item.columnKeys.optionSelected] = getSelected(item, item.options[optionIndex][item.columnKeys.optionSelected], selected);

        if (item.options[optionIndex][item.columnKeys.optionSelected]) {
          var appendOk = true;
          for (var i = 0; i < item.selected.length; i++) {
            if (item.selected[i][this.config.columnKeys.optionText] == item.options[optionIndex][this.config.columnKeys.optionText]) {
              appendOk = false;
              break;
            }
          }
          if (appendOk) {
            addOptions = {};
            addOptions[item.columnKeys.optionValue] = item.options[optionIndex][item.columnKeys.optionValue];
            addOptions[item.columnKeys.optionText] = item.options[optionIndex][item.columnKeys.optionText];
            item.selected.push(addOptions);
          }
        } else {
          var newSelectedArray = [];
          for (var i = 0; i < item.selected.length; i++) {
            if (item.selected[i][this.config.columnKeys.optionText] == item.options[optionIndex][this.config.columnKeys.optionText]) {} else {
              addOptions = {};
              addOptions[item.columnKeys.optionValue] = item.selected[i][item.columnKeys.optionValue];
              addOptions[item.columnKeys.optionText] = item.selected[i][item.columnKeys.optionText];
              newSelectedArray.push(addOptions);
            }
          }
          item.selected = newSelectedArray;
        }
      } else {
        // 새로운 값 추가
        var appendOk = true;
        for (var i = 0; i < item.selected.length; i++) {
          if (item.selected[i][this.config.columnKeys.optionText] == value) {
            appendOk = false;
            break;
          }
        }

        if (appendOk) {
          addOptions = {};
          addOptions[item.columnKeys.optionValue] = value;
          addOptions[item.columnKeys.optionText] = value;
          item.selected.push(addOptions);
        }
      }
    },
    'clear': function clear(queIdx) {
      clearSelected.call(this, queIdx);
      focusClear.call(this, queIdx);

      if (this.activeautocompleteOptionGroup) {
        this.activeautocompleteOptionGroup.find('[data-option-index]').attr("data-option-Selected", "false");
      }
      this.queue[queIdx].optionSelectedIndex = -1;
    }
  };

  var queIdx = _AX6Util2.default.isNumber(boundID) ? boundID : getQueIdx.call(this, boundID);
  if (queIdx === -1) {
    console.log(_AX6Info2.default.getError("ax6ui-autocomplete", "402", "val"));
    return;
  }

  if (typeof value == "undefined") {
    throw "error not found value";
  } else if (_AX6Util2.default.isArray(value)) {
    processor.clear.call(this, queIdx);
    processor.arr.call(this, queIdx, this.queue[queIdx].multiple || value.length == 0 ? value : [value[value.length - 1]], selected);
  } else if (_AX6Util2.default.isString(value) || _AX6Util2.default.isNumber(value)) {
    if (typeof value !== "undefined" && value !== null && !this.queue[queIdx].multiple) {
      clearSelected.call(this, queIdx);
    }
    processor.text.call(this, queIdx, value, selected);
  } else {
    if (value === null) {
      processor.clear.call(this, queIdx);
    } else {
      if (!this.queue[queIdx].multiple) {
        clearSelected.call(this, queIdx);
      }
      for (var key in processor) {
        if (value[key]) {
          processor[key].call(this, queIdx, value, selected);
          break;
        }
      }
    }
  }

  syncLabel.call(this, queIdx);
  printLabel.call(this, queIdx);
  focusLabel.call(this, queIdx);
  alignAutocompleteOptionGroup.call(this);

  if (typeof value !== "undefined") {
    if (_option && !_option.noStateChange) {
      onStateChanged.call(this, this.queue[queIdx], {
        self: this,
        item: this.queue[queIdx],
        state: "changeValue",
        value: this.queue[queIdx].selected
      });
    }
  }

  boundID = null;
  return this;
};

/* ~~~~~~~~~~~~~~~~~~ end of private  ~~~~~~~~~~~~~~~~~~~~ */

/**
 * @class
 */

var AX6UIAutocomplete = function (_AX6UICore) {
  _inherits(AX6UIAutocomplete, _AX6UICore);

  /**
   * @constructor
   * @param config
   */
  function AX6UIAutocomplete(config) {
    _classCallCheck(this, AX6UIAutocomplete);

    /**
     * @member {JSON}
     * @param config
     * @param [config.theme='default']
     * @param [config.animateTime=250]
     * @param [config.height=34]
     * @param [config.lang] - 메세지들
     * @param [config.lang.noSelected='']
     * @param [config.lang.noOptions='no options']
     * @param [config.lang.loading='now loading..']
     * @param [config.columnKeys] - 내부에서 사용 JSON key 정의
     * @param [config.columnKeys.optionValue='value']
     * @param [config.columnKeys.optionText='text']
     * @param [config.columnKeys.optionSelected='selected']
     */
    var _this2 = _possibleConstructorReturn(this, (AX6UIAutocomplete.__proto__ || Object.getPrototypeOf(AX6UIAutocomplete)).call(this));

    _this2.config = {
      theme: 'default',
      animateTime: 250,
      height: 34,
      optionItemHeight: 24,
      borderWidth: 1,
      removeIcon: 'U+00d7',
      lang: {
        noSelected: '',
        noOptions: 'no options',
        loading: 'Now Processing'
      },
      columnKeys: {
        optionValue: 'value',
        optionText: 'text',
        optionSelected: 'selected'
      }
    };
    _jqmin2.default.extend(true, _this2.config, config);

    // 멤버 변수 초기화
    /**
     * bind를 통해 연결된 select가 저장되는 변수
     * @member {Array}
     */
    _this2.queue = [];
    /**
     * @member {Object}
     */
    _this2.activeautocompleteOptionGroup = null;
    /**
     * @member {Number}
     */
    _this2.activeautocompleteQueueIndex = -1;
    /**
     * @member {Object}
     */
    _this2.openTimer = null;
    /**
     * @member {Object}
     */
    _this2.closeTimer = null;
    /**
     * @member {Function}
     */
    _this2.waitOptionsCallback = null;
    /**
     * @member {Object}
     */
    _this2.keyUpTimer = null;
    /**
     * @member {Object}
     */
    _this2.xvar = {};

    _this2.init();
    return _this2;
  }

  /**
   * @method
   * @param config
   */


  _createClass(AX6UIAutocomplete, [{
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
      (0, _jqmin2.default)(window).on("resize.ax6ui-autocomplete-display-" + this.instanceId, _AX6Util2.default.throttle(function (e) {
        alignAutocompleteDisplay.call(this, e || window.event);
        alignAutocompleteOptionGroup.call(this);
      }, 100).bind(this));
    }

    /**
     * bind autocomplete
     * @method
     * @param {Object} item
     * @param {String} [item.id]
     * @param {String} [item.theme]
     * @param {Boolean} [item.multiple]
     * @param {Element} item.target
     * @return {AX6UIAutocomplete}
     */

  }, {
    key: "bind",
    value: function bind(item) {
      var queIdx = void 0;
      item = _jqmin2.default.extend(true, {}, this.config, item);

      if (!item.target) {
        console.log(_AX6Info2.default.getError("ax6ui-autocomplete", "401", "bind"));
        return this;
      }
      item.$target = (0, _jqmin2.default)(item.target);

      if (!item.id) item.id = item.$target.data("data-ax6ui-autocomplete-id");
      if (!item.id) {
        item.id = 'ax6ui-autocomplete-' + _AX6UICore3.default.getInstanceId();
        item.$target.data("data-ax6ui-autocomplete-id", item.id);
      }
      item.name = item.$target.attr("data-ax6ui-autocomplete");

      item.options = [];
      item.selected = [];

      // target attribute data
      (function (data) {
        if (_AX6Util2.default.isObject(data) && !data.error) {
          item = _jqmin2.default.extend(true, item, data);
        }
      })(_AX6Util2.default.parseJson(item.$target.attr("data-ax6ui-autocomplete-config"), true));

      queIdx = _AX6Util2.default.search(this.queue, function () {
        return this.id == item.id;
      });

      if (queIdx === -1) {
        this.queue.push(item);
        bindAutocompleteTarget.call(this, this.queue.length - 1);
      } else {
        this.queue[queIdx].selected = [];
        this.queue[queIdx].options = item.options;
        this.queue[queIdx] = _jqmin2.default.extend(true, {}, this.queue[queIdx], item);
        bindAutocompleteTarget.call(this, queIdx);
      }

      queIdx = null;
      return this;
    }

    /**
     * open the optionBox of autocomplete
     * @method
     * @param {(String|Number|Element)} boundID
     * @param {Number} [tryCount]
     * @return {AX6UIAutocomplete}
     */

  }, {
    key: "open",
    value: function open(boundID, tryCount) {
      this.waitOptionsCallback = null;

      /**
       * open autocomplete from the outside
       */
      var queIdx = _AX6Util2.default.isNumber(boundID) ? boundID : getQueIdx.call(this, boundID),
          item = this.queue[queIdx],
          data = {},
          focusTop = void 0,
          selectedOptionEl = void 0;

      if (item.$display.attr("disabled")) return this;

      if (this.openTimer) clearTimeout(this.openTimer);
      if (this.activeautocompleteOptionGroup) {
        if (this.activeautocompleteQueueIndex == queIdx) {
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
      item.$display.attr("data-autocomplete-option-group-opened", "true");

      data.waitOptions = true; // 타이핑값으로 options을 구해야 하므로 대기
      data.options = [];

      this.activeautocompleteOptionGroup = (0, _jqmin2.default)(_AX6Mustache2.default.render(tmpl.optionGroup.call(this, item.columnKeys), data));
      this.activeautocompleteOptionGroup.find('[data-els="content"]').html(_AX6Mustache2.default.render(tmpl.options.call(this, item.columnKeys), data));
      this.activeautocompleteQueueIndex = queIdx;

      alignAutocompleteOptionGroup.call(this, "append"); // alignAutocompleteOptionGroup 에서 body append

      if (item.selected && item.selected.length > 0) {
        selectedOptionEl = this.activeautocompleteOptionGroup.find('[data-option-index="' + item.selected[0]["@index"] + '"]');
        if (selectedOptionEl.get(0)) {
          focusTop = selectedOptionEl.position().top - this.activeautocompleteOptionGroup.height() / 3;
          this.activeautocompleteOptionGroup.find('[data-els="content"]').scrollTop(focusTop);
        }
      }

      (0, _jqmin2.default)(window).on("click.ax6ui-autocomplete-" + this.instanceId, function (e) {
        e = e || window.event;
        onBodyClick.call(this, e);
        _AX6Util2.default.stopEvent(e);
      }.bind(this));

      onStateChanged.call(this, item, {
        self: this,
        state: "open",
        item: item
      });

      data = null;
      focusTop = null;
      selectedOptionEl = null;
      return this;
    }

    /**
     * @method
     * @param {(jQueryObject|Element|Number)} _boundID
     * @param {(String|Array)} _value
     * @return {AX6UIAutocomplete}
     * @example
     * ```js
     * myAutocomplete.setValue(jQuery('[data-ax6ui-autocomplete="autocomplete1"]'), {value:"test", text:"test"});
     * myAutocomplete.setValue(jQuery('[data-ax6ui-autocomplete="autocomplete1"]'), [{value:"test1", text:"test1"}, {value:"test2", text:"test2"}]);
     * myAutocomplete.setValue(jQuery('[data-ax6ui-autocomplete="autocomplete1"]'), null);
     * ```
     */

  }, {
    key: "setValue",
    value: function setValue(_boundID, _value) {
      var queIdx = _AX6Util2.default.isNumber(_boundID) ? _boundID : getQueIdx.call(this, _boundID);
      if (queIdx === -1) {
        console.log(_AX6Info2.default.getError("ax6ui-autocomplete", "402", "val"));
        return;
      }

      clearSelected.call(this, queIdx);

      if (_AX6Util2.default.isArray(_value)) {
        var _values = _AX6Util2.default.map(_value, function () {
          return { value: this };
        });
        setSelected.call(this, queIdx, _values, true, { noStateChange: true });
      } else if (_AX6Util2.default.isObject(_value)) {
        setSelected.call(this, queIdx, { value: _value }, true, { noStateChange: true });
      } else {
        printLabel.call(this, queIdx);
      }

      blurLabel.call(this, queIdx);
      alignAutocompleteDisplay.call(this);

      return this;
    }

    /**
     * @method
     * @param {(jQueryObject|Element|Number)} _boundID
     * @param {(String|Array)} _text
     * @return {AX6UIAutocomplete}
     * @example
     * ```js
     * myAutocomplete.setText(jQuery('[data-ax6ui-autocomplete="autocomplete1"]'), "string");
     * myAutocomplete.setText(jQuery('[data-ax6ui-autocomplete="autocomplete1"]'), ["substring", "search"]);
     * ```
     */

  }, {
    key: "setText",
    value: function setText(_boundID, _text) {
      var queIdx = _AX6Util2.default.isNumber(_boundID) ? _boundID : getQueIdx.call(this, _boundID);
      if (queIdx === -1) {
        console.log(_AX6Info2.default.getError("ax6ui-autocomplete", "402", "val"));
        return;
      }

      this.queue[queIdx].selected = [];
      clearSelected.call(this, queIdx);
      setSelected.call(this, queIdx, _text, true, { noStateChange: true });
      blurLabel.call(this, queIdx);
      alignAutocompleteDisplay.call(this);

      return this;
    }

    /**
     * @method
     * @param {(jQueryObject|Element|Number)} _boundID
     * @returns {Array}
     */

  }, {
    key: "getSelectedOption",
    value: function getSelectedOption(_boundID) {
      var queIdx = _AX6Util2.default.isNumber(_boundID) ? _boundID : getQueIdx.call(this, _boundID);
      if (queIdx === -1) {
        console.log(_AX6Info2.default.getError("ax6ui-autocomplete", "402", "val"));
        return;
      }
      return _AX6Util2.default.deepCopy(this.queue[queIdx].selected);
    }

    /**
     * @method
     * @return {AX6UIAutocomplete}
     */

  }, {
    key: "close",
    value: function close(item) {
      if (this.closeTimer) clearTimeout(this.closeTimer);
      if (!this.activeautocompleteOptionGroup) return this;

      item = this.queue[this.activeautocompleteQueueIndex];
      item.optionFocusIndex = -1;
      item.$display.removeAttr("data-autocomplete-option-group-opened").trigger("focus");

      this.activeautocompleteOptionGroup.addClass("destroy");

      (0, _jqmin2.default)(window).off("resize.ax6ui-autocomplete-" + this.instanceId).off("click.ax6ui-autocomplete-" + this.instanceId).off("keyup.ax6ui-autocomplete-" + this.instanceId);

      this.closeTimer = setTimeout(function () {
        if (this.activeautocompleteOptionGroup) this.activeautocompleteOptionGroup.remove();
        this.activeautocompleteOptionGroup = null;
        this.activeautocompleteQueueIndex = -1;

        onStateChanged.call(this, item, {
          self: this,
          state: "close"
        });
      }.bind(this), this.config.animateTime);
      this.waitOptionsCallback = null;
      return this;
    }

    /**
     * @method
     * @param {(jQueryObject|Element|Number)} _boundID
     * @return {AX6UIAutocomplete}
     */

  }, {
    key: "blur",
    value: function blur(_boundID) {
      var queIdx = _AX6Util2.default.isNumber(_boundID) ? _boundID : getQueIdx.call(this, _boundID);
      if (queIdx === -1) {
        console.log(_AX6Info2.default.getError("ax6ui-autocomplete", "402", "val"));
        return;
      }

      blurLabel.call(this, queIdx);
      return this;
    }

    /**
     * @method
     * @param {(jQueryObject|Element|Number)} _boundID
     * @return {AX6UIAutocomplete}
     */

  }, {
    key: "enable",
    value: function enable(_boundID) {
      var queIdx = getQueIdx.call(this, _boundID);

      if (typeof queIdx !== "undefined") {
        this.queue[queIdx].disable = false;
        if (this.queue[queIdx].$display[0]) {
          this.queue[queIdx].$display.removeAttr("disabled");
          this.queue[queIdx].$displayLabelInput.removeAttr("disabled");
        }
        if (this.queue[queIdx].$select[0]) {
          this.queue[queIdx].$select.removeAttr("disabled");
        }

        onStateChanged.call(this, this.queue[queIdx], {
          self: this,
          state: "enable"
        });
      }

      return this;
    }

    /**
     * @method
     * @param {(jQueryObject|Element|Number)} _boundID
     * @return {AX6UIAutocomplete}
     */

  }, {
    key: "disable",
    value: function disable(_boundID) {
      var queIdx = getQueIdx.call(this, _boundID);

      if (typeof queIdx !== "undefined") {
        this.queue[queIdx].disable = true;
        if (this.queue[queIdx].$display[0]) {
          this.queue[queIdx].$display.attr("disabled", "disabled");
          this.queue[queIdx].$displayLabelInput.attr("disabled", "disabled");
        }
        if (this.queue[queIdx].$select[0]) {
          this.queue[queIdx].$select.attr("disabled", "disabled");
        }

        onStateChanged.call(this, this.queue[queIdx], {
          self: this,
          state: "disable"
        });
      }

      return this;
    }

    /**
     * @method
     * @return {AX6UIAutocomplete}
     */

  }, {
    key: "align",
    value: function align() {
      alignAutocompleteDisplay.call(this);
      return this;
    }
  }]);

  return AX6UIAutocomplete;
}(_AX6UICore3.default);

exports.default = AX6UIAutocomplete;

/***/ }),

/***/ 96:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(97);
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

/***/ 97:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "@-webkit-keyframes ax-autocomplete-option-group {\n  from {\n    -webkit-transform: translateY(-10%);\n    opacity: 0; }\n  to {\n    -webkit-transform: translateY(0%);\n    opacity: 1; } }\n\n@-moz-keyframes ax-autocomplete-option-group {\n  from {\n    -moz-transform: translateY(-10%);\n    opacity: 0; }\n  to {\n    -moz-transform: translateY(0%);\n    opacity: 1; } }\n\n@keyframes ax-autocomplete-option-group {\n  from {\n    -webkit-transform: translateY(-10%);\n    -moz-transform: translateY(-10%);\n    -ms-transform: translateY(-10%);\n    -o-transform: translateY(-10%);\n    transform: translateY(-10%);\n    opacity: 0; }\n  to {\n    -webkit-transform: translateY(0%);\n    -moz-transform: translateY(0%);\n    -ms-transform: translateY(0%);\n    -o-transform: translateY(0%);\n    transform: translateY(0%);\n    opacity: 1; } }\n\n@-webkit-keyframes ax-autocomplete-option-group-destroy {\n  from {\n    -webkit-transform: translateY(0%) scaleY(1);\n    opacity: 1; }\n  to {\n    -webkit-transform: translateY(0%) scaleY(0);\n    opacity: 0; } }\n\n@-moz-keyframes ax-autocomplete-option-group-destroy {\n  from {\n    -moz-transform: translateY(0%) scaleY(1);\n    opacity: 1; }\n  to {\n    -moz-transform: translateY(0%) scaleY(0);\n    opacity: 0; } }\n\n@keyframes ax-autocomplete-option-group-destroy {\n  from {\n    -webkit-transform: translateY(0%) scaleY(1);\n    -moz-transform: translateY(0%) scaleY(1);\n    -ms-transform: translateY(0%) scaleY(1);\n    -o-transform: translateY(0%) scaleY(1);\n    transform: translateY(0%) scaleY(1);\n    opacity: 1; }\n  to {\n    -webkit-transform: translateY(0%) scaleY(0);\n    -moz-transform: translateY(0%) scaleY(0);\n    -ms-transform: translateY(0%) scaleY(0);\n    -o-transform: translateY(0%) scaleY(0);\n    transform: translateY(0%) scaleY(0);\n    opacity: 0; } }\n\n[data-ax6ui-autocomplete] {\n  position: relative;\n  overflow: visible;\n  display: block;\n  box-sizing: border-box; }\n  [data-ax6ui-autocomplete] *,\n  [data-ax6ui-autocomplete] *:before,\n  [data-ax6ui-autocomplete] *:after {\n    box-sizing: border-box; }\n\n.ax6ui-autocomplete-display {\n  position: relative;\n  z-index: 2;\n  padding: 0;\n  display: block;\n  height: 32px;\n  font-size: 14px;\n  border-radius: 4px;\n  background-color: #fff;\n  background-image: -webkit-linear-gradient(top, #fff, #fff);\n  background-image: linear-gradient(to bottom,#fff, #fff);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  border: 1px solid #ccc;\n  color: #444;\n  text-decoration: none; }\n  .ax6ui-autocomplete-display:hover, .ax6ui-autocomplete-display:focus {\n    text-decoration: none; }\n  .ax6ui-autocomplete-display .ax6ui-autocomplete-display-table {\n    width: 100%;\n    height: 100%;\n    display: table;\n    table-layout: fixed;\n    border-collapse: collapse; }\n    .ax6ui-autocomplete-display .ax6ui-autocomplete-display-table [data-ax6ui-autocomplete-display=\"label-holder\"] {\n      display: table-cell;\n      vertical-align: middle;\n      padding: 0 0; }\n      .ax6ui-autocomplete-display .ax6ui-autocomplete-display-table [data-ax6ui-autocomplete-display=\"label-holder\"] input {\n        margin: 0;\n        box-sizing: content-box;\n        background: transparent;\n        box-shadow: none; }\n        .ax6ui-autocomplete-display .ax6ui-autocomplete-display-table [data-ax6ui-autocomplete-display=\"label-holder\"] input:focus, .ax6ui-autocomplete-display .ax6ui-autocomplete-display-table [data-ax6ui-autocomplete-display=\"label-holder\"] input:active, .ax6ui-autocomplete-display .ax6ui-autocomplete-display-table [data-ax6ui-autocomplete-display=\"label-holder\"] input:hover {\n          border: 0 none;\n          box-shadow: none; }\n    .ax6ui-autocomplete-display .ax6ui-autocomplete-display-table [data-ax6ui-autocomplete-display=\"label\"] {\n      display: block;\n      white-space: nowrap;\n      overflow: hidden;\n      padding: 0px 5px;\n      text-decoration: none; }\n      .ax6ui-autocomplete-display .ax6ui-autocomplete-display-table [data-ax6ui-autocomplete-display=\"label\"]:focus {\n        outline: none; }\n      .ax6ui-autocomplete-display .ax6ui-autocomplete-display-table [data-ax6ui-autocomplete-display=\"label\"]:hover {\n        text-decoration: none; }\n      .ax6ui-autocomplete-display .ax6ui-autocomplete-display-table [data-ax6ui-autocomplete-display=\"label\"]:after {\n        content: ' ';\n        display: block;\n        clear: both; }\n      .ax6ui-autocomplete-display .ax6ui-autocomplete-display-table [data-ax6ui-autocomplete-display=\"label\"] [data-ax6ui-autocomplete-selected-label] {\n        position: relative;\n        display: table;\n        float: left;\n        background: transparent;\n        margin: 1px 3px 1px 0;\n        color: #444;\n        box-sizing: border-box;\n        background-color: #fff;\n        background-image: -webkit-linear-gradient(top, #fff, #fff);\n        background-image: linear-gradient(to bottom,#fff, #fff);\n        border-collapse: separate;\n        border: 0 none; }\n        .ax6ui-autocomplete-display .ax6ui-autocomplete-display-table [data-ax6ui-autocomplete-display=\"label\"] [data-ax6ui-autocomplete-selected-label]:first-child {\n          margin-left: 0; }\n        .ax6ui-autocomplete-display .ax6ui-autocomplete-display-table [data-ax6ui-autocomplete-display=\"label\"] [data-ax6ui-autocomplete-selected-label] .label-cell {\n          display: table-cell;\n          padding: 0 5px;\n          vertical-align: middle;\n          border: 1px solid transparent;\n          border: 1px solid #ccc; }\n          .ax6ui-autocomplete-display .ax6ui-autocomplete-display-table [data-ax6ui-autocomplete-display=\"label\"] [data-ax6ui-autocomplete-selected-label] .label-cell:first-child {\n            border-top-left-radius: 4px;\n            border-bottom-left-radius: 4px;\n            border-right: 0 none; }\n          .ax6ui-autocomplete-display .ax6ui-autocomplete-display-table [data-ax6ui-autocomplete-display=\"label\"] [data-ax6ui-autocomplete-selected-label] .label-cell:last-child {\n            border-top-right-radius: 4px;\n            border-bottom-right-radius: 4px;\n            border-left: 0 none;\n            padding-left: 0; }\n        .ax6ui-autocomplete-display .ax6ui-autocomplete-display-table [data-ax6ui-autocomplete-display=\"label\"] [data-ax6ui-autocomplete-selected-label] [data-ax6ui-autocomplete-remove] {\n          cursor: pointer; }\n          .ax6ui-autocomplete-display .ax6ui-autocomplete-display-table [data-ax6ui-autocomplete-display=\"label\"] [data-ax6ui-autocomplete-selected-label] [data-ax6ui-autocomplete-remove]:hover {\n            color: #e97259; }\n      .ax6ui-autocomplete-display .ax6ui-autocomplete-display-table [data-ax6ui-autocomplete-display=\"label\"] [data-ax6ui-autocomplete-display=\"input\"] {\n        float: left;\n        width: 100px; }\n        .ax6ui-autocomplete-display .ax6ui-autocomplete-display-table [data-ax6ui-autocomplete-display=\"label\"] [data-ax6ui-autocomplete-display=\"input\"]:focus {\n          outline: none; }\n        .ax6ui-autocomplete-display .ax6ui-autocomplete-display-table [data-ax6ui-autocomplete-display=\"label\"] [data-ax6ui-autocomplete-display=\"input\"]::-ms-clear {\n          display: none; }\n    .ax6ui-autocomplete-display .ax6ui-autocomplete-display-table [data-ax6ui-autocomplete-display=\"addon\"] {\n      display: table-cell;\n      vertical-align: middle;\n      width: 16px;\n      text-align: center; }\n      .ax6ui-autocomplete-display .ax6ui-autocomplete-display-table [data-ax6ui-autocomplete-display=\"addon\"] .addon-icon-reset {\n        display: none; }\n  .ax6ui-autocomplete-display[data-select-option-group-opened] {\n    box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.2); }\n    .ax6ui-autocomplete-display[data-select-option-group-opened] .ax6ui-autocomplete-display-table [data-ax6ui-autocomplete-display=\"addon\"] .addon-icon-reset {\n      display: block;\n      position: absolute;\n      right: 23px;\n      top: 0;\n      height: 100%; }\n  .ax6ui-autocomplete-display.default a {\n    color: #444; }\n  .ax6ui-autocomplete-display.default:hover:not([disabled]), .ax6ui-autocomplete-display.default:active:not([disabled]), .ax6ui-autocomplete-display.default:focus:not([disabled]), .ax6ui-autocomplete-display.default[data-select-option-group-opened]:not([disabled]) {\n    border-color: #ccc;\n    color: #444;\n    background: #fbfbfb;\n    text-decoration: none; }\n  .ax6ui-autocomplete-display.default [disabled] {\n    user-select: none; }\n\n.ax6ui-autocomplete-option-group {\n  box-sizing: border-box;\n  z-index: 2000;\n  position: absolute;\n  left: 0;\n  top: 0;\n  border-radius: 5px;\n  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.175);\n  border: 1px solid;\n  overflow: hidden;\n  background-color: #fbfbfb;\n  background-image: -webkit-linear-gradient(bottom, #fbfbfb);\n  background-image: linear-gradient(to top,#fbfbfb);\n  -webkit-animation: ax-autocomplete-option-group 0.1s ease-out;\n  -moz-animation: ax-autocomplete-option-group 0.1s ease-out;\n  animation: ax-autocomplete-option-group 0.1s ease-out;\n  -webkit-transform: translateZ(0);\n  -moz-transform: translateZ(0);\n  -ms-transform: translateZ(0);\n  -o-transform: translateZ(0);\n  transform: translateZ(0);\n  -webkit-transform-origin: center top;\n  -moz-transform-origin: center top;\n  -ms-transform-origin: center top;\n  -o-transform-origin: center top;\n  transform-origin: center top; }\n  .ax6ui-autocomplete-option-group.destroy {\n    -webkit-animation: ax-autocomplete-option-group-destroy 0.1s cubic-bezier(0.6, -0.28, 0.735, 0.045) forwards;\n    -moz-animation: ax-autocomplete-option-group-destroy 0.1s cubic-bezier(0.6, -0.28, 0.735, 0.045) forwards;\n    animation: ax-autocomplete-option-group-destroy 0.1s cubic-bezier(0.6, -0.28, 0.735, 0.045) forwards; }\n  .ax6ui-autocomplete-option-group.direction-top {\n    -webkit-transform-origin: center top;\n    -moz-transform-origin: center top;\n    -ms-transform-origin: center top;\n    -o-transform-origin: center top;\n    transform-origin: center top; }\n  .ax6ui-autocomplete-option-group.direction-bottom {\n    -webkit-transform-origin: center bottom;\n    -moz-transform-origin: center bottom;\n    -ms-transform-origin: center bottom;\n    -o-transform-origin: center bottom;\n    transform-origin: center bottom; }\n  .ax6ui-autocomplete-option-group.default {\n    border-color: #ccc;\n    color: #444; }\n    .ax6ui-autocomplete-option-group.default .ax-autocomplete-body .ax-autocomplete-option-group-content .ax-autocomplete-option-item:hover, .ax6ui-autocomplete-option-group.default .ax-autocomplete-body .ax-autocomplete-option-group-content .ax-autocomplete-option-item.hover {\n      background: #a6a6a6 !important;\n      color: #111111; }\n      .ax6ui-autocomplete-option-group.default .ax-autocomplete-body .ax-autocomplete-option-group-content .ax-autocomplete-option-item:hover .ax-autocomplete-option-item-holder .ax-autocomplete-option-item-cell.ax-autocomplete-option-item-checkbox .item-checkbox-wrap.useCheckBox:after, .ax6ui-autocomplete-option-group.default .ax-autocomplete-body .ax-autocomplete-option-group-content .ax-autocomplete-option-item.hover .ax-autocomplete-option-item-holder .ax-autocomplete-option-item-cell.ax-autocomplete-option-item-checkbox .item-checkbox-wrap.useCheckBox:after {\n        box-sizing: border-box;\n        border-color: #111111 !important; }\n    .ax6ui-autocomplete-option-group.default .ax-autocomplete-body .ax-autocomplete-option-group-content .ax-autocomplete-option-item[data-option-selected=\"true\"] {\n      background: #ccc;\n      color: #111111; }\n      .ax6ui-autocomplete-option-group.default .ax-autocomplete-body .ax-autocomplete-option-group-content .ax-autocomplete-option-item[data-option-selected=\"true\"] .ax-autocomplete-option-item-holder .ax-autocomplete-option-item-cell.ax-autocomplete-option-item-checkbox .item-checkbox-wrap.useCheckBox:after {\n        box-sizing: border-box;\n        border-color: #111111 !important; }\n    .ax6ui-autocomplete-option-group.default .ax-autocomplete-body .ax-autocomplete-option-group-content .ax-autocomplete-option-group .ax-autocomplete-option-item-holder .ax-autocomplete-option-group-label {\n      background: #eee; }\n    .ax6ui-autocomplete-option-group.default .ax-autocomplete-body .ax-autocomplete-option-group-buttons {\n      border-top: 1px solid;\n      border-color: #ccc; }\n  .ax6ui-autocomplete-option-group .ax-autocomplete-body {\n    padding: 0px; }\n    .ax6ui-autocomplete-option-group .ax-autocomplete-body .ax-autocomplete-option-group-content {\n      max-height: 180px;\n      overflow-y: auto;\n      -webkit-overflow-scrolling: touch;\n      position: relative; }\n      .ax6ui-autocomplete-option-group .ax-autocomplete-body .ax-autocomplete-option-group-content .ax-autocomplete-option-item {\n        padding: 3px 0px;\n        text-align: left;\n        cursor: pointer;\n        font-size: 13px;\n        position: relative;\n        box-sizing: border-box;\n        overflow: hidden; }\n        .ax6ui-autocomplete-option-group .ax-autocomplete-body .ax-autocomplete-option-group-content .ax-autocomplete-option-item .ax-autocomplete-option-item-holder {\n          display: table;\n          position: relative;\n          border-collapse: separate;\n          overflow: hidden;\n          width: 100%;\n          height: 18px; }\n          .ax6ui-autocomplete-option-group .ax-autocomplete-body .ax-autocomplete-option-group-content .ax-autocomplete-option-item .ax-autocomplete-option-item-holder .ax-autocomplete-option-item-cell {\n            box-sizing: border-box;\n            display: table-cell;\n            vertical-align: middle;\n            white-space: nowrap;\n            font-size: 13px;\n            line-height: 18px;\n            padding: 0 0 0 0;\n            user-select: none; }\n            .ax6ui-autocomplete-option-group .ax-autocomplete-body .ax-autocomplete-option-group-content .ax-autocomplete-option-item .ax-autocomplete-option-item-holder .ax-autocomplete-option-item-cell.ax-autocomplete-option-item-checkbox {\n              overflow: hidden;\n              width: 13px;\n              text-align: center; }\n              .ax6ui-autocomplete-option-group .ax-autocomplete-body .ax-autocomplete-option-group-content .ax-autocomplete-option-item .ax-autocomplete-option-item-holder .ax-autocomplete-option-item-cell.ax-autocomplete-option-item-checkbox .item-checkbox-wrap {\n                position: relative;\n                display: block;\n                width: 13px;\n                height: 18px; }\n                .ax6ui-autocomplete-option-group .ax-autocomplete-body .ax-autocomplete-option-group-content .ax-autocomplete-option-item .ax-autocomplete-option-item-holder .ax-autocomplete-option-item-cell.ax-autocomplete-option-item-checkbox .item-checkbox-wrap.useCheckBox:after {\n                  box-sizing: border-box;\n                  content: '';\n                  width: 9px;\n                  height: 4.5px;\n                  position: absolute;\n                  top: 4.5px;\n                  right: 0;\n                  border: 2px solid #000;\n                  border-top: none;\n                  border-right: none;\n                  background: transparent;\n                  opacity: 0.1;\n                  -webkit-transform: rotate(-50deg);\n                  -moz-transform: rotate(-50deg);\n                  -ms-transform: rotate(-50deg);\n                  -o-transform: rotate(-50deg);\n                  transform: rotate(-50deg); }\n            .ax6ui-autocomplete-option-group .ax-autocomplete-body .ax-autocomplete-option-group-content .ax-autocomplete-option-item .ax-autocomplete-option-item-holder .ax-autocomplete-option-item-cell.ax-autocomplete-option-item-label {\n              padding: 0px 5px;\n              padding-right: 9px; }\n        .ax6ui-autocomplete-option-group .ax-autocomplete-body .ax-autocomplete-option-group-content .ax-autocomplete-option-item[data-option-selected=\"true\"] .ax-autocomplete-option-item-holder .ax-autocomplete-option-item-cell.ax-autocomplete-option-item-checkbox .item-checkbox-wrap.useCheckBox:after {\n          opacity: 1; }\n      .ax6ui-autocomplete-option-group .ax-autocomplete-body .ax-autocomplete-option-group-content .ax-autocomplete-option-group .ax-autocomplete-option-item-holder {\n        display: table;\n        position: relative;\n        border-collapse: separate;\n        overflow: hidden;\n        width: 100%;\n        height: 18px; }\n        .ax6ui-autocomplete-option-group .ax-autocomplete-body .ax-autocomplete-option-group-content .ax-autocomplete-option-group .ax-autocomplete-option-item-holder .ax-autocomplete-option-group-label {\n          box-sizing: border-box;\n          display: table-cell;\n          vertical-align: middle;\n          white-space: nowrap;\n          font-size: 13px;\n          line-height: 18px;\n          padding: 5px 10px;\n          user-select: none; }\n    .ax6ui-autocomplete-option-group .ax-autocomplete-body .ax-autocomplete-option-group-buttons {\n      text-align: center;\n      padding: 3px 0px; }\n", ""]);

// exports


/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXV0b2NvbXBsZXRlLmpzIiwid2VicGFjazovLy8uLi9zcmMvQVg2TXVzdGFjaGUuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9BWDZVSUF1dG9jb21wbGV0ZS5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL0FYNlVJQXV0b2NvbXBsZXRlL3N0eWxlLnNjc3M/ODQ1NCIsIndlYnBhY2s6Ly8vLi4vc3JjL0FYNlVJQXV0b2NvbXBsZXRlL3N0eWxlLnNjc3MiXSwibmFtZXMiOlsiaHRtbCIsImZuIiwibW9kdWxlUnVuIiwiJGJvZHkiLCJvcHRpb25zIiwicHVzaCIsInZhbHVlIiwidGV4dCIsImF1dG9jb21wbGV0ZSIsInJlbW92ZUljb24iLCJiaW5kIiwidGFyZ2V0IiwiaGVpZ2h0Iiwib3B0aW9uSXRlbUhlaWdodCIsIm9uU2VhcmNoIiwiY2FsbGJhY2siLCJzZWFyY2hXb3JkIiwic2V0VGltZW91dCIsInJlZ0V4cCIsIlJlZ0V4cCIsIm15T3B0aW9ucyIsImZvckVhY2giLCJuIiwibWF0Y2giLCJtb2R1bGVEZXN0cm95Iiwib2ZmIiwiQVg2IiwiZGVmaW5lTXVzdGFjaGUiLCJnbG9iYWwiLCJmYWN0b3J5IiwibXVzdGFjaGUiLCJtdXN0YWNoZUZhY3RvcnkiLCJvYmplY3RUb1N0cmluZyIsIk9iamVjdCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwiaXNBcnJheSIsIkFycmF5IiwiaXNBcnJheVBvbHlmaWxsIiwib2JqZWN0IiwiY2FsbCIsImlzRnVuY3Rpb24iLCJ0eXBlU3RyIiwib2JqIiwiZXNjYXBlUmVnRXhwIiwic3RyaW5nIiwicmVwbGFjZSIsImhhc1Byb3BlcnR5IiwicHJvcE5hbWUiLCJyZWdFeHBUZXN0IiwidGVzdCIsInRlc3RSZWdFeHAiLCJyZSIsIm5vblNwYWNlUmUiLCJpc1doaXRlc3BhY2UiLCJlbnRpdHlNYXAiLCJlc2NhcGVIdG1sIiwiU3RyaW5nIiwiZnJvbUVudGl0eU1hcCIsInMiLCJ3aGl0ZVJlIiwic3BhY2VSZSIsImVxdWFsc1JlIiwiY3VybHlSZSIsInRhZ1JlIiwicGFyc2VUZW1wbGF0ZSIsInRlbXBsYXRlIiwidGFncyIsInNlY3Rpb25zIiwidG9rZW5zIiwic3BhY2VzIiwiaGFzVGFnIiwibm9uU3BhY2UiLCJzdHJpcFNwYWNlIiwibGVuZ3RoIiwicG9wIiwib3BlbmluZ1RhZ1JlIiwiY2xvc2luZ1RhZ1JlIiwiY2xvc2luZ0N1cmx5UmUiLCJjb21waWxlVGFncyIsInRhZ3NUb0NvbXBpbGUiLCJzcGxpdCIsIkVycm9yIiwic2Nhbm5lciIsIlNjYW5uZXIiLCJzdGFydCIsInR5cGUiLCJjaHIiLCJ0b2tlbiIsIm9wZW5TZWN0aW9uIiwiZW9zIiwicG9zIiwic2NhblVudGlsIiwiaSIsInZhbHVlTGVuZ3RoIiwiY2hhckF0Iiwic2NhbiIsIm5lc3RUb2tlbnMiLCJzcXVhc2hUb2tlbnMiLCJzcXVhc2hlZFRva2VucyIsImxhc3RUb2tlbiIsIm51bVRva2VucyIsIm5lc3RlZFRva2VucyIsImNvbGxlY3RvciIsInNlY3Rpb24iLCJ0YWlsIiwiaW5kZXgiLCJzdWJzdHJpbmciLCJzZWFyY2giLCJDb250ZXh0IiwidmlldyIsInBhcmVudENvbnRleHQiLCJjYWNoZSIsInJldHVybnMiLCJrIiwicGFyZW50IiwibG9va3VwIiwibmFtZSIsImhhc093blByb3BlcnR5IiwiY29udGV4dCIsIm5hbWVzIiwibG9va3VwSGl0IiwiaW5kZXhPZiIsIldyaXRlciIsImNsZWFyQ2FjaGUiLCJwYXJzZSIsInJlbmRlciIsInBhcnRpYWxzIiwicmVuZGVyVG9rZW5zIiwib3JpZ2luYWxUZW1wbGF0ZSIsImJ1ZmZlciIsInN5bWJvbCIsInVuZGVmaW5lZCIsInJlbmRlclNlY3Rpb24iLCJyZW5kZXJJbnZlcnRlZCIsInJlbmRlclBhcnRpYWwiLCJ1bmVzY2FwZWRWYWx1ZSIsImVzY2FwZWRWYWx1ZSIsInJhd1ZhbHVlIiwic2VsZiIsInN1YlJlbmRlciIsImoiLCJzbGljZSIsImVzY2FwZSIsInZlcnNpb24iLCJkZWZhdWx0V3JpdGVyIiwiVHlwZUVycm9yIiwidG9faHRtbCIsInNlbmQiLCJyZXN1bHQiLCJjdHJsS2V5cyIsInRtcGwiLCJjb2x1bW5LZXlzIiwib3B0aW9uVmFsdWUiLCJvcHRpb25UZXh0Iiwib3B0aW9uU2VsZWN0ZWQiLCJvblN0YXRlQ2hhbmdlZCIsIml0ZW0iLCJ0aGF0Iiwic3RhdGUiLCJvbkNoYW5nZSIsImFsaWduQXV0b2NvbXBsZXRlRGlzcGxheSIsInF1ZXVlIiwidyIsIiRkaXNwbGF5IiwiTWF0aCIsIm1heCIsIiRzZWxlY3QiLCJvdXRlcldpZHRoIiwibnVtYmVyIiwibWluV2lkdGgiLCJjc3MiLCJyZXNldCIsImZpbmQiLCJtdWx0aXBsZSIsImRpc3BsYXlUYWJsZUhlaWdodEFkanVzdCIsIiR0YXJnZXQiLCJkaXNwbGF5VGFibGVIZWlnaHQiLCIkZGlzcGxheVRhYmxlIiwib3V0ZXJIZWlnaHQiLCJhYnMiLCJhbGlnbkF1dG9jb21wbGV0ZU9wdGlvbkdyb3VwIiwiYXBwZW5kIiwiYWN0aXZlYXV0b2NvbXBsZXRlT3B0aW9uR3JvdXAiLCJhY3RpdmVhdXRvY29tcGxldGVRdWV1ZUluZGV4IiwicG9zaXRpb25NYXJnaW4iLCJkaW0iLCJwaWNrZXJEaW0iLCJwaWNrZXJEaXJlY3Rpb24iLCJkb2N1bWVudCIsImJvZHkiLCJvZmZzZXQiLCJ3aWR0aCIsIndpbldpZHRoIiwid2luZG93Iiwid2luSGVpZ2h0IiwiZGlyZWN0aW9uIiwidG9wIiwiYWRkQ2xhc3MiLCJuZXdUb3AiLCJsZWZ0Iiwib25Cb2R5Q2xpY2siLCJlIiwiY2xpY2tFbCIsImZpbmRQYXJlbnROb2RlIiwiZ2V0QXR0cmlidXRlIiwiZ2V0IiwiY2xvc2UiLCJzZXRTZWxlY3RlZCIsImlkIiwib3B0aW9uSW5kZXgiLCJnZXRMYWJlbCIsInF1ZUlkeCIsImRhdGEiLCJ0aGVtZSIsImxhbmciLCJzZWxlY3RlZCIsImhhc1NlbGVjdGVkIiwibGFiZWwiLCJzeW5jTGFiZWwiLCJjb25jYXQiLCJuaW5kZXgiLCJmb3JtU2VsZWN0T3B0aW9ucyIsInByaW50TGFiZWwiLCIkZGlzcGxheUxhYmVsIiwicmVtb3ZlIiwiJGRpc3BsYXlMYWJlbElucHV0IiwiYmVmb3JlIiwiZm9jdXNMYWJlbCIsImRpc2FibGVkIiwidHJpZ2dlciIsImZvY3VzIiwiY2xlYXJMYWJlbCIsInZhbCIsImJsdXJMYWJlbCIsIndhaXRPcHRpb25zIiwiTyIsIm9wdGlvbnNNYXAiLCJfTyIsIl9PSW5kZXgiLCJmb2N1c1dvcmQiLCJjb2xsZWN0X29wdGlvbnMiLCJsIiwidG9Mb3dlckNhc2UiLCJvcHRpb25zU29ydCIsInNvcnQiLCJhIiwiYiIsImZvY3VzTW92ZSIsImZvY3VzQ2xlYXIiLCJyZW1vdmVDbGFzcyIsInJlbW92ZUF0dHIiLCJvcHRpb25Gb2N1c0luZGV4IiwiZmluZGV4IiwiX2ZvY3VzSW5kZXgiLCJfcHJldkZvY3VzSW5kZXgiLCJmb2N1c09wdGlvbkVsIiwib3B0aW9uR3JvdXBTY3JvbGxDb250YWluZXIiLCJvcHRpb25TZWxlY3RlZEluZGV4Iiwib3B0aW9uSXRlbUxlbmd0aCIsImhpZGUiLCJpc1N0cm9wIiwiZm9jdXNPcHRpb25FbEhlaWdodCIsIm9wdGlvbkdyb3VwU2Nyb2xsQ29udGFpbmVySGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJvcHRpb25Hcm91cFNjcm9sbENvbnRhaW5lclNjcm9sbFRvcCIsInNjcm9sbFRvcCIsImZvY3VzT3B0aW9uRWxUb3AiLCJwb3NpdGlvbiIsImJpbmRBdXRvY29tcGxldGVUYXJnZXQiLCJkZWJvdW5jZWRGb2N1c1dvcmQiLCJkZWJvdW5jZSIsImF1dG9jb21wbGV0ZUV2ZW50IiwicmVtb3ZlSW5kZXgiLCJzcGxpY2UiLCJzdG9wRXZlbnQiLCJjbGVhciIsIndoaWNoIiwiZXZlbnRLZXlzIiwiRVNDIiwiVEFCIiwiQkFDS1NQQUNFIiwib3BlbiIsIlJFVFVSTiIsImlucHV0VmFsdWUiLCJET1dOIiwiVVAiLCJpbnN0YW5jZUlkIiwidGFiSW5kZXgiLCJwYWRkaW5nTGVmdCIsImF1dG9jb21wbGV0ZURpc3BsYXkiLCJhdHRyIiwiZm9ybVNpemUiLCJmb3JtU2VsZWN0Iiwib24iLCJjbGljayIsImJsdXIiLCJrZXlEb3duIiwia2V5VXAiLCJnZXRRdWVJZHgiLCJib3VuZElEIiwiaXNTdHJpbmciLCJjb25zb2xlIiwibG9nIiwiZ2V0RXJyb3IiLCJnZXRTZWxlY3RlZCIsIl9pdGVtIiwibyIsImNsZWFyU2VsZWN0ZWQiLCJvcHRncm91cCIsIm5uIiwiX29wdGlvbiIsInByb2Nlc3NvciIsInNldFZhbHVlVHlwZSIsImFkZE9wdGlvbnMiLCJuZXdTZWxlY3RlZEFycmF5IiwicmVtb3ZlU2VsZWN0ZWRJbmRleCIsInB1c2hPayIsInZhbHVlcyIsImlzTnVtYmVyIiwia2V5IiwiYXBwZW5kT2siLCJjb25maWciLCJhcnIiLCJub1N0YXRlQ2hhbmdlIiwiQVg2VUlBdXRvY29tcGxldGUiLCJhbmltYXRlVGltZSIsImJvcmRlcldpZHRoIiwibm9TZWxlY3RlZCIsIm5vT3B0aW9ucyIsImxvYWRpbmciLCJleHRlbmQiLCJvcGVuVGltZXIiLCJjbG9zZVRpbWVyIiwid2FpdE9wdGlvbnNDYWxsYmFjayIsImtleVVwVGltZXIiLCJ4dmFyIiwiaW5pdCIsImluaXRPbmNlIiwiaW5pdGlhbGl6ZWQiLCJ0aHJvdHRsZSIsImV2ZW50IiwiZ2V0SW5zdGFuY2VJZCIsImlzT2JqZWN0IiwiZXJyb3IiLCJwYXJzZUpzb24iLCJ0cnlDb3VudCIsImZvY3VzVG9wIiwic2VsZWN0ZWRPcHRpb25FbCIsImNsZWFyVGltZW91dCIsIm9wdGlvbkdyb3VwIiwiX2JvdW5kSUQiLCJfdmFsdWUiLCJfdmFsdWVzIiwibWFwIiwiX3RleHQiLCJkZWVwQ29weSIsImRpc2FibGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBLElBQUlBLHNMQUFKO0FBT0EsSUFBSUMsS0FBSztBQUNQQyxhQUFXLG1CQUFVQyxLQUFWLEVBQWlCO0FBQzFCLFFBQUlDLFVBQVUsRUFBZDtBQUNBQSxZQUFRQyxJQUFSLENBQWEsRUFBQ0MsT0FBTyxHQUFSLEVBQWFDLE1BQU0sUUFBbkIsRUFBYjtBQUNBSCxZQUFRQyxJQUFSLENBQWEsRUFBQ0MsT0FBTyxHQUFSLEVBQWFDLE1BQU0sUUFBbkIsRUFBYjtBQUNBSCxZQUFRQyxJQUFSLENBQWEsRUFBQ0MsT0FBTyxHQUFSLEVBQWFDLE1BQU0sUUFBbkIsRUFBYjtBQUNBSCxZQUFRQyxJQUFSLENBQWEsRUFBQ0MsT0FBTyxHQUFSLEVBQWFDLE1BQU0sV0FBbkIsRUFBYjtBQUNBSCxZQUFRQyxJQUFSLENBQWEsRUFBQ0MsT0FBTyxHQUFSLEVBQWFDLE1BQU0sUUFBbkIsRUFBYjtBQUNBSCxZQUFRQyxJQUFSLENBQWEsRUFBQ0MsT0FBTyxHQUFSLEVBQWFDLE1BQU0sVUFBbkIsRUFBYjtBQUNBSCxZQUFRQyxJQUFSLENBQWEsRUFBQ0MsT0FBTyxHQUFSLEVBQWFDLE1BQU0sU0FBbkIsRUFBYjtBQUNBSCxZQUFRQyxJQUFSLENBQWEsRUFBQ0MsT0FBTyxHQUFSLEVBQWFDLE1BQU0sS0FBbkIsRUFBYjtBQUNBSCxZQUFRQyxJQUFSLENBQWEsRUFBQ0MsT0FBTyxHQUFSLEVBQWFDLE1BQU0sS0FBbkIsRUFBYjtBQUNBSCxZQUFRQyxJQUFSLENBQWEsRUFBQ0MsT0FBTyxJQUFSLEVBQWNDLE1BQU0sS0FBcEIsRUFBYjtBQUNBSCxZQUFRQyxJQUFSLENBQWEsRUFBQ0MsT0FBTyxJQUFSLEVBQWNDLE1BQU0sS0FBcEIsRUFBYjtBQUNBSCxZQUFRQyxJQUFSLENBQWEsRUFBQ0MsT0FBTyxJQUFSLEVBQWNDLE1BQU0sS0FBcEIsRUFBYjtBQUNBSCxZQUFRQyxJQUFSLENBQWEsRUFBQ0MsT0FBTyxJQUFSLEVBQWNDLE1BQU0sS0FBcEIsRUFBYjtBQUNBSCxZQUFRQyxJQUFSLENBQWEsRUFBQ0MsT0FBTyxJQUFSLEVBQWNDLE1BQU0sS0FBcEIsRUFBYjtBQUNBSCxZQUFRQyxJQUFSLENBQWEsRUFBQ0MsT0FBTyxJQUFSLEVBQWNDLE1BQU0sS0FBcEIsRUFBYjtBQUNBSCxZQUFRQyxJQUFSLENBQWEsRUFBQ0MsT0FBTyxJQUFSLEVBQWNDLE1BQU0sT0FBcEIsRUFBYjtBQUNBSCxZQUFRQyxJQUFSLENBQWEsRUFBQ0MsT0FBTyxJQUFSLEVBQWNDLE1BQU0sS0FBcEIsRUFBYjtBQUNBSCxZQUFRQyxJQUFSLENBQWEsRUFBQ0MsT0FBTyxJQUFSLEVBQWNDLE1BQU0sU0FBcEIsRUFBYjtBQUNBSCxZQUFRQyxJQUFSLENBQWEsRUFBQ0MsT0FBTyxJQUFSLEVBQWNDLE1BQU0sYUFBcEIsRUFBYjtBQUNBSCxZQUFRQyxJQUFSLENBQWEsRUFBQ0MsT0FBTyxJQUFSLEVBQWNDLE1BQU0saUJBQXBCLEVBQWI7QUFDQUgsWUFBUUMsSUFBUixDQUFhLEVBQUNDLE9BQU8sSUFBUixFQUFjQyxNQUFNLFdBQXBCLEVBQWI7QUFDQUgsWUFBUUMsSUFBUixDQUFhLEVBQUNDLE9BQU8sSUFBUixFQUFjQyxNQUFNLFdBQXBCLEVBQWI7QUFDQUgsWUFBUUMsSUFBUixDQUFhLEVBQUNDLE9BQU8sSUFBUixFQUFjQyxNQUFNLFNBQXBCLEVBQWI7QUFDQUgsWUFBUUMsSUFBUixDQUFhLEVBQUNDLE9BQU8sSUFBUixFQUFjQyxNQUFNLFVBQXBCLEVBQWI7QUFDQUgsWUFBUUMsSUFBUixDQUFhLEVBQUNDLE9BQU8sSUFBUixFQUFjQyxNQUFNLFdBQXBCLEVBQWI7QUFDQUgsWUFBUUMsSUFBUixDQUFhLEVBQUNDLE9BQU8sSUFBUixFQUFjQyxNQUFNLFVBQXBCLEVBQWI7O0FBRUEsUUFBSUMsZUFBZSxnQ0FBaUI7QUFDbENDLGtCQUFZO0FBRHNCLEtBQWpCLENBQW5COztBQUlBRCxpQkFBYUUsSUFBYixDQUFrQjtBQUNoQkMsY0FBUSxxQkFBRSxpQ0FBRixDQURRO0FBRWhCQyxjQUFRLEVBRlE7QUFHaEJDLHdCQUFrQixFQUhGO0FBSWhCQyxnQkFBVSxrQkFBVUMsUUFBVixFQUFvQjtBQUM1QixZQUFJQyxhQUFhLEtBQUtBLFVBQXRCOztBQUVBQyxtQkFBVyxZQUFZO0FBQ3JCLGNBQUlDLFNBQVMsSUFBSUMsTUFBSixDQUFXSCxVQUFYLENBQWI7QUFDQSxjQUFJSSxZQUFZLEVBQWhCO0FBQ0FoQixrQkFBUWlCLE9BQVIsQ0FBZ0IsVUFBVUMsQ0FBVixFQUFhO0FBQzNCLGdCQUFJQSxFQUFFZixJQUFGLENBQU9nQixLQUFQLENBQWFMLE1BQWIsQ0FBSixFQUEwQjtBQUN4QkUsd0JBQVVmLElBQVYsQ0FBZTtBQUNiQyx1QkFBT2dCLEVBQUVoQixLQURJO0FBRWJDLHNCQUFNZSxFQUFFZjtBQUZLLGVBQWY7QUFJRDtBQUNGLFdBUEQ7O0FBU0FRLG1CQUFTO0FBQ1BYLHFCQUFTZ0I7QUFERixXQUFUO0FBR0QsU0FmRCxFQWVHLEdBZkg7QUFnQkQ7QUF2QmUsS0FBbEI7QUF5QkQsR0EzRE07QUE0RFBJLGlCQUFlLHVCQUFVckIsS0FBVixFQUFpQjtBQUM5QkEsVUFBTXNCLEdBQU4sQ0FBVSxPQUFWO0FBQ0Q7QUE5RE0sQ0FBVDs7a0JBaUVlO0FBQ2J6QixRQUFNQSxJQURPO0FBRWJDLE1BQUlBO0FBRlMsQzs7Ozs7Ozs7Ozs7Ozs7OztBQzVFZjs7Ozs7O0FBT0E7Ozs7O0FBS0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkEsSUFBSXlCLE1BQU0sRUFBVjs7QUFFQyxVQUFTQyxjQUFULENBQXdCQyxNQUF4QixFQUFnQ0MsT0FBaEMsRUFBeUM7O0FBRXhDQSxVQUFRRCxPQUFPRSxRQUFQLEdBQWtCLEVBQTFCO0FBRUQsQ0FKQSxFQUlDSixHQUpELEVBSU0sU0FBU0ssZUFBVCxDQUF5QkQsUUFBekIsRUFBbUM7O0FBRXhDLE1BQUlFLGlCQUFpQkMsT0FBT0MsU0FBUCxDQUFpQkMsUUFBdEM7QUFDQSxNQUFJQyxVQUFVQyxNQUFNRCxPQUFOLElBQWlCLFNBQVNFLGVBQVQsQ0FBeUJDLE1BQXpCLEVBQWlDO0FBQzlELFdBQU9QLGVBQWVRLElBQWYsQ0FBb0JELE1BQXBCLE1BQWdDLGdCQUF2QztBQUNELEdBRkQ7O0FBSUEsV0FBU0UsVUFBVCxDQUFvQkYsTUFBcEIsRUFBNEI7QUFDMUIsV0FBTyxPQUFPQSxNQUFQLEtBQWtCLFVBQXpCO0FBQ0Q7O0FBRUQ7Ozs7QUFJQSxXQUFTRyxPQUFULENBQWlCQyxHQUFqQixFQUFzQjtBQUNwQixXQUFPUCxRQUFRTyxHQUFSLElBQWUsT0FBZixVQUFnQ0EsR0FBaEMseUNBQWdDQSxHQUFoQyxDQUFQO0FBQ0Q7O0FBRUQsV0FBU0MsWUFBVCxDQUFzQkMsTUFBdEIsRUFBOEI7QUFDNUIsV0FBT0EsT0FBT0MsT0FBUCxDQUFlLDZCQUFmLEVBQThDLE1BQTlDLENBQVA7QUFDRDs7QUFFRDs7OztBQUlBLFdBQVNDLFdBQVQsQ0FBcUJKLEdBQXJCLEVBQTBCSyxRQUExQixFQUFvQztBQUNsQyxXQUFPTCxPQUFPLElBQVAsSUFBZSxRQUFPQSxHQUFQLHlDQUFPQSxHQUFQLE9BQWUsUUFBOUIsSUFBMkNLLFlBQVlMLEdBQTlEO0FBQ0Q7O0FBRUQ7QUFDQTtBQUNBLE1BQUlNLGFBQWE5QixPQUFPZSxTQUFQLENBQWlCZ0IsSUFBbEM7O0FBRUEsV0FBU0MsVUFBVCxDQUFvQkMsRUFBcEIsRUFBd0JQLE1BQXhCLEVBQWdDO0FBQzlCLFdBQU9JLFdBQVdULElBQVgsQ0FBZ0JZLEVBQWhCLEVBQW9CUCxNQUFwQixDQUFQO0FBQ0Q7O0FBRUQsTUFBSVEsYUFBYSxJQUFqQjs7QUFFQSxXQUFTQyxZQUFULENBQXNCVCxNQUF0QixFQUE4QjtBQUM1QixXQUFPLENBQUNNLFdBQVdFLFVBQVgsRUFBdUJSLE1BQXZCLENBQVI7QUFDRDs7QUFFRCxNQUFJVSxZQUFZO0FBQ2QsU0FBSyxPQURTLEVBQ0EsS0FBSyxNQURMLEVBQ2EsS0FBSyxNQURsQixFQUMwQixLQUFLLFFBRC9CLEVBQ3lDLEtBQUssT0FEOUMsRUFDdUQsS0FBSztBQUQ1RCxHQUFoQjs7QUFJQSxXQUFTQyxVQUFULENBQW9CWCxNQUFwQixFQUE0QjtBQUMxQixXQUFPWSxPQUFPWixNQUFQLEVBQWVDLE9BQWYsQ0FBdUIsWUFBdkIsRUFBcUMsU0FBU1ksYUFBVCxDQUF1QkMsQ0FBdkIsRUFBMEI7QUFDcEUsYUFBT0osVUFBVUksQ0FBVixDQUFQO0FBQ0QsS0FGTSxDQUFQO0FBR0Q7O0FBRUQsTUFBSUMsVUFBVSxLQUFkO0FBQ0EsTUFBSUMsVUFBVSxLQUFkO0FBQ0EsTUFBSUMsV0FBVyxNQUFmO0FBQ0EsTUFBSUMsVUFBVSxPQUFkO0FBQ0EsTUFBSUMsUUFBUSxvQkFBWjs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxXQUFTQyxhQUFULENBQXVCQyxRQUF2QixFQUFpQ0MsSUFBakMsRUFBdUM7QUFDckMsUUFBSSxDQUFDRCxRQUFMLEVBQ0UsT0FBTyxFQUFQOztBQUVGLFFBQUlFLFdBQVcsRUFBZixDQUpxQyxDQUlkO0FBQ3ZCLFFBQUlDLFNBQVMsRUFBYixDQUxxQyxDQUtkO0FBQ3ZCLFFBQUlDLFNBQVMsRUFBYixDQU5xQyxDQU1kO0FBQ3ZCLFFBQUlDLFNBQVMsS0FBYixDQVBxQyxDQU9kO0FBQ3ZCLFFBQUlDLFdBQVcsS0FBZixDQVJxQyxDQVFkOztBQUV2QjtBQUNBO0FBQ0EsYUFBU0MsVUFBVCxHQUFzQjtBQUNwQixVQUFJRixVQUFVLENBQUNDLFFBQWYsRUFBeUI7QUFDdkIsZUFBT0YsT0FBT0ksTUFBZDtBQUNFLGlCQUFPTCxPQUFPQyxPQUFPSyxHQUFQLEVBQVAsQ0FBUDtBQURGO0FBRUQsT0FIRCxNQUlLO0FBQ0hMLGlCQUFTLEVBQVQ7QUFDRDs7QUFFREMsZUFBUyxLQUFUO0FBQ0FDLGlCQUFXLEtBQVg7QUFDRDs7QUFFRCxRQUFJSSxZQUFKLEVBQWtCQyxZQUFsQixFQUFnQ0MsY0FBaEM7O0FBRUEsYUFBU0MsV0FBVCxDQUFxQkMsYUFBckIsRUFBb0M7QUFDbEMsVUFBSSxPQUFPQSxhQUFQLEtBQXlCLFFBQTdCLEVBQ0VBLGdCQUFnQkEsY0FBY0MsS0FBZCxDQUFvQnBCLE9BQXBCLEVBQTZCLENBQTdCLENBQWhCOztBQUVGLFVBQUksQ0FBQ3pCLFFBQVE0QyxhQUFSLENBQUQsSUFBMkJBLGNBQWNOLE1BQWQsS0FBeUIsQ0FBeEQsRUFDRSxNQUFNLElBQUlRLEtBQUosQ0FBVSxtQkFBbUJGLGFBQTdCLENBQU47O0FBRUZKLHFCQUFlLElBQUl6RCxNQUFKLENBQVd5QixhQUFhb0MsY0FBYyxDQUFkLENBQWIsSUFBaUMsTUFBNUMsQ0FBZjtBQUNBSCxxQkFBZSxJQUFJMUQsTUFBSixDQUFXLFNBQVN5QixhQUFhb0MsY0FBYyxDQUFkLENBQWIsQ0FBcEIsQ0FBZjtBQUNBRix1QkFBaUIsSUFBSTNELE1BQUosQ0FBVyxTQUFTeUIsYUFBYSxNQUFNb0MsY0FBYyxDQUFkLENBQW5CLENBQXBCLENBQWpCO0FBQ0Q7O0FBRURELGdCQUFZWixRQUFRckMsU0FBU3FDLElBQTdCOztBQUVBLFFBQUlnQixVQUFVLElBQUlDLE9BQUosQ0FBWWxCLFFBQVosQ0FBZDs7QUFFQSxRQUFJbUIsS0FBSixFQUFXQyxJQUFYLEVBQWlCaEYsS0FBakIsRUFBd0JpRixHQUF4QixFQUE2QkMsS0FBN0IsRUFBb0NDLFdBQXBDO0FBQ0EsV0FBTyxDQUFDTixRQUFRTyxHQUFSLEVBQVIsRUFBdUI7QUFDckJMLGNBQVFGLFFBQVFRLEdBQWhCOztBQUVBO0FBQ0FyRixjQUFRNkUsUUFBUVMsU0FBUixDQUFrQmhCLFlBQWxCLENBQVI7O0FBRUEsVUFBSXRFLEtBQUosRUFBVztBQUNULGFBQUssSUFBSXVGLElBQUksQ0FBUixFQUFXQyxjQUFjeEYsTUFBTW9FLE1BQXBDLEVBQTRDbUIsSUFBSUMsV0FBaEQsRUFBNkQsRUFBRUQsQ0FBL0QsRUFBa0U7QUFDaEVOLGdCQUFNakYsTUFBTXlGLE1BQU4sQ0FBYUYsQ0FBYixDQUFOOztBQUVBLGNBQUl2QyxhQUFhaUMsR0FBYixDQUFKLEVBQXVCO0FBQ3JCakIsbUJBQU9qRSxJQUFQLENBQVlnRSxPQUFPSyxNQUFuQjtBQUNELFdBRkQsTUFHSztBQUNIRix1QkFBVyxJQUFYO0FBQ0Q7O0FBRURILGlCQUFPaEUsSUFBUCxDQUFZLENBQUMsTUFBRCxFQUFTa0YsR0FBVCxFQUFjRixLQUFkLEVBQXFCQSxRQUFRLENBQTdCLENBQVo7QUFDQUEsbUJBQVMsQ0FBVDs7QUFFQTtBQUNBLGNBQUlFLFFBQVEsSUFBWixFQUNFZDtBQUNIO0FBQ0Y7O0FBRUQ7QUFDQSxVQUFJLENBQUNVLFFBQVFhLElBQVIsQ0FBYXBCLFlBQWIsQ0FBTCxFQUNFOztBQUVGTCxlQUFTLElBQVQ7O0FBRUE7QUFDQWUsYUFBT0gsUUFBUWEsSUFBUixDQUFhaEMsS0FBYixLQUF1QixNQUE5QjtBQUNBbUIsY0FBUWEsSUFBUixDQUFhcEMsT0FBYjs7QUFFQTtBQUNBLFVBQUkwQixTQUFTLEdBQWIsRUFBa0I7QUFDaEJoRixnQkFBUTZFLFFBQVFTLFNBQVIsQ0FBa0I5QixRQUFsQixDQUFSO0FBQ0FxQixnQkFBUWEsSUFBUixDQUFhbEMsUUFBYjtBQUNBcUIsZ0JBQVFTLFNBQVIsQ0FBa0JmLFlBQWxCO0FBQ0QsT0FKRCxNQUtLLElBQUlTLFNBQVMsR0FBYixFQUFrQjtBQUNyQmhGLGdCQUFRNkUsUUFBUVMsU0FBUixDQUFrQmQsY0FBbEIsQ0FBUjtBQUNBSyxnQkFBUWEsSUFBUixDQUFhakMsT0FBYjtBQUNBb0IsZ0JBQVFTLFNBQVIsQ0FBa0JmLFlBQWxCO0FBQ0FTLGVBQU8sR0FBUDtBQUNELE9BTEksTUFNQTtBQUNIaEYsZ0JBQVE2RSxRQUFRUyxTQUFSLENBQWtCZixZQUFsQixDQUFSO0FBQ0Q7O0FBRUQ7QUFDQSxVQUFJLENBQUNNLFFBQVFhLElBQVIsQ0FBYW5CLFlBQWIsQ0FBTCxFQUNFLE1BQU0sSUFBSUssS0FBSixDQUFVLHFCQUFxQkMsUUFBUVEsR0FBdkMsQ0FBTjs7QUFFRkgsY0FBUSxDQUFDRixJQUFELEVBQU9oRixLQUFQLEVBQWMrRSxLQUFkLEVBQXFCRixRQUFRUSxHQUE3QixDQUFSO0FBQ0F0QixhQUFPaEUsSUFBUCxDQUFZbUYsS0FBWjs7QUFFQSxVQUFJRixTQUFTLEdBQVQsSUFBZ0JBLFNBQVMsR0FBN0IsRUFBa0M7QUFDaENsQixpQkFBUy9ELElBQVQsQ0FBY21GLEtBQWQ7QUFDRCxPQUZELE1BR0ssSUFBSUYsU0FBUyxHQUFiLEVBQWtCO0FBQ3JCO0FBQ0FHLHNCQUFjckIsU0FBU08sR0FBVCxFQUFkOztBQUVBLFlBQUksQ0FBQ2MsV0FBTCxFQUNFLE1BQU0sSUFBSVAsS0FBSixDQUFVLHVCQUF1QjVFLEtBQXZCLEdBQStCLE9BQS9CLEdBQXlDK0UsS0FBbkQsQ0FBTjs7QUFFRixZQUFJSSxZQUFZLENBQVosTUFBbUJuRixLQUF2QixFQUNFLE1BQU0sSUFBSTRFLEtBQUosQ0FBVSx1QkFBdUJPLFlBQVksQ0FBWixDQUF2QixHQUF3QyxPQUF4QyxHQUFrREosS0FBNUQsQ0FBTjtBQUNILE9BVEksTUFVQSxJQUFJQyxTQUFTLE1BQVQsSUFBbUJBLFNBQVMsR0FBNUIsSUFBbUNBLFNBQVMsR0FBaEQsRUFBcUQ7QUFDeERkLG1CQUFXLElBQVg7QUFDRCxPQUZJLE1BR0EsSUFBSWMsU0FBUyxHQUFiLEVBQWtCO0FBQ3JCO0FBQ0FQLG9CQUFZekUsS0FBWjtBQUNEO0FBQ0Y7O0FBRUQ7QUFDQW1GLGtCQUFjckIsU0FBU08sR0FBVCxFQUFkOztBQUVBLFFBQUljLFdBQUosRUFDRSxNQUFNLElBQUlQLEtBQUosQ0FBVSx1QkFBdUJPLFlBQVksQ0FBWixDQUF2QixHQUF3QyxPQUF4QyxHQUFrRE4sUUFBUVEsR0FBcEUsQ0FBTjs7QUFFRixXQUFPTSxXQUFXQyxhQUFhN0IsTUFBYixDQUFYLENBQVA7QUFDRDs7QUFFRDs7OztBQUlBLFdBQVM2QixZQUFULENBQXNCN0IsTUFBdEIsRUFBOEI7QUFDNUIsUUFBSThCLGlCQUFpQixFQUFyQjs7QUFFQSxRQUFJWCxLQUFKLEVBQVdZLFNBQVg7QUFDQSxTQUFLLElBQUlQLElBQUksQ0FBUixFQUFXUSxZQUFZaEMsT0FBT0ssTUFBbkMsRUFBMkNtQixJQUFJUSxTQUEvQyxFQUEwRCxFQUFFUixDQUE1RCxFQUErRDtBQUM3REwsY0FBUW5CLE9BQU93QixDQUFQLENBQVI7O0FBRUEsVUFBSUwsS0FBSixFQUFXO0FBQ1QsWUFBSUEsTUFBTSxDQUFOLE1BQWEsTUFBYixJQUF1QlksU0FBdkIsSUFBb0NBLFVBQVUsQ0FBVixNQUFpQixNQUF6RCxFQUFpRTtBQUMvREEsb0JBQVUsQ0FBVixLQUFnQlosTUFBTSxDQUFOLENBQWhCO0FBQ0FZLG9CQUFVLENBQVYsSUFBZVosTUFBTSxDQUFOLENBQWY7QUFDRCxTQUhELE1BSUs7QUFDSFcseUJBQWU5RixJQUFmLENBQW9CbUYsS0FBcEI7QUFDQVksc0JBQVlaLEtBQVo7QUFDRDtBQUNGO0FBQ0Y7O0FBRUQsV0FBT1csY0FBUDtBQUNEOztBQUVEOzs7Ozs7QUFNQSxXQUFTRixVQUFULENBQW9CNUIsTUFBcEIsRUFBNEI7QUFDMUIsUUFBSWlDLGVBQWUsRUFBbkI7QUFDQSxRQUFJQyxZQUFZRCxZQUFoQjtBQUNBLFFBQUlsQyxXQUFXLEVBQWY7O0FBRUEsUUFBSW9CLEtBQUosRUFBV2dCLE9BQVg7QUFDQSxTQUFLLElBQUlYLElBQUksQ0FBUixFQUFXUSxZQUFZaEMsT0FBT0ssTUFBbkMsRUFBMkNtQixJQUFJUSxTQUEvQyxFQUEwRCxFQUFFUixDQUE1RCxFQUErRDtBQUM3REwsY0FBUW5CLE9BQU93QixDQUFQLENBQVI7O0FBRUEsY0FBUUwsTUFBTSxDQUFOLENBQVI7QUFDRSxhQUFLLEdBQUw7QUFDQSxhQUFLLEdBQUw7QUFDRWUsb0JBQVVsRyxJQUFWLENBQWVtRixLQUFmO0FBQ0FwQixtQkFBUy9ELElBQVQsQ0FBY21GLEtBQWQ7QUFDQWUsc0JBQVlmLE1BQU0sQ0FBTixJQUFXLEVBQXZCO0FBQ0E7QUFDRixhQUFLLEdBQUw7QUFDRWdCLG9CQUFVcEMsU0FBU08sR0FBVCxFQUFWO0FBQ0E2QixrQkFBUSxDQUFSLElBQWFoQixNQUFNLENBQU4sQ0FBYjtBQUNBZSxzQkFBWW5DLFNBQVNNLE1BQVQsR0FBa0IsQ0FBbEIsR0FBc0JOLFNBQVNBLFNBQVNNLE1BQVQsR0FBa0IsQ0FBM0IsRUFBOEIsQ0FBOUIsQ0FBdEIsR0FBeUQ0QixZQUFyRTtBQUNBO0FBQ0Y7QUFDRUMsb0JBQVVsRyxJQUFWLENBQWVtRixLQUFmO0FBYko7QUFlRDs7QUFFRCxXQUFPYyxZQUFQO0FBQ0Q7O0FBRUQ7Ozs7QUFJQSxXQUFTbEIsT0FBVCxDQUFpQnZDLE1BQWpCLEVBQXlCO0FBQ3ZCLFNBQUtBLE1BQUwsR0FBY0EsTUFBZDtBQUNBLFNBQUs0RCxJQUFMLEdBQVk1RCxNQUFaO0FBQ0EsU0FBSzhDLEdBQUwsR0FBVyxDQUFYO0FBQ0Q7O0FBRUQ7OztBQUdBUCxVQUFRbEQsU0FBUixDQUFrQndELEdBQWxCLEdBQXdCLFNBQVNBLEdBQVQsR0FBZTtBQUNyQyxXQUFPLEtBQUtlLElBQUwsS0FBYyxFQUFyQjtBQUNELEdBRkQ7O0FBSUE7Ozs7QUFJQXJCLFVBQVFsRCxTQUFSLENBQWtCOEQsSUFBbEIsR0FBeUIsU0FBU0EsSUFBVCxDQUFjNUMsRUFBZCxFQUFrQjtBQUN6QyxRQUFJN0IsUUFBUSxLQUFLa0YsSUFBTCxDQUFVbEYsS0FBVixDQUFnQjZCLEVBQWhCLENBQVo7O0FBRUEsUUFBSSxDQUFDN0IsS0FBRCxJQUFVQSxNQUFNbUYsS0FBTixLQUFnQixDQUE5QixFQUNFLE9BQU8sRUFBUDs7QUFFRixRQUFJN0QsU0FBU3RCLE1BQU0sQ0FBTixDQUFiOztBQUVBLFNBQUtrRixJQUFMLEdBQVksS0FBS0EsSUFBTCxDQUFVRSxTQUFWLENBQW9COUQsT0FBTzZCLE1BQTNCLENBQVo7QUFDQSxTQUFLaUIsR0FBTCxJQUFZOUMsT0FBTzZCLE1BQW5COztBQUVBLFdBQU83QixNQUFQO0FBQ0QsR0FaRDs7QUFjQTs7OztBQUlBdUMsVUFBUWxELFNBQVIsQ0FBa0IwRCxTQUFsQixHQUE4QixTQUFTQSxTQUFULENBQW1CeEMsRUFBbkIsRUFBdUI7QUFDbkQsUUFBSXNELFFBQVEsS0FBS0QsSUFBTCxDQUFVRyxNQUFWLENBQWlCeEQsRUFBakIsQ0FBWjtBQUFBLFFBQWtDN0IsS0FBbEM7O0FBRUEsWUFBUW1GLEtBQVI7QUFDRSxXQUFLLENBQUMsQ0FBTjtBQUNFbkYsZ0JBQVEsS0FBS2tGLElBQWI7QUFDQSxhQUFLQSxJQUFMLEdBQVksRUFBWjtBQUNBO0FBQ0YsV0FBSyxDQUFMO0FBQ0VsRixnQkFBUSxFQUFSO0FBQ0E7QUFDRjtBQUNFQSxnQkFBUSxLQUFLa0YsSUFBTCxDQUFVRSxTQUFWLENBQW9CLENBQXBCLEVBQXVCRCxLQUF2QixDQUFSO0FBQ0EsYUFBS0QsSUFBTCxHQUFZLEtBQUtBLElBQUwsQ0FBVUUsU0FBVixDQUFvQkQsS0FBcEIsQ0FBWjtBQVZKOztBQWFBLFNBQUtmLEdBQUwsSUFBWXBFLE1BQU1tRCxNQUFsQjs7QUFFQSxXQUFPbkQsS0FBUDtBQUNELEdBbkJEOztBQXFCQTs7OztBQUlBLFdBQVNzRixPQUFULENBQWlCQyxJQUFqQixFQUF1QkMsYUFBdkIsRUFBc0M7QUFDcEMsU0FBS0QsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0UsS0FBTCxHQUFhO0FBQ1gsV0FBSyxLQUFLRixJQURDO0FBRVgsZUFBUyxnQkFBWTtBQUNuQixZQUFJRyxVQUFVLEVBQWQ7QUFDQSxhQUFLLElBQUlDLENBQVQsSUFBYyxJQUFkLEVBQW9CO0FBQ2xCRCxrQkFBUTVHLElBQVIsQ0FBYSxFQUFDLFFBQVE2RyxDQUFULEVBQVksVUFBVSxLQUFLQSxDQUFMLENBQXRCLEVBQWI7QUFDRDtBQUNELGVBQU9ELE9BQVA7QUFDRDtBQVJVLEtBQWI7QUFVQSxTQUFLRSxNQUFMLEdBQWNKLGFBQWQ7QUFDRDs7QUFFRDs7OztBQUlBRixVQUFRM0UsU0FBUixDQUFrQjdCLElBQWxCLEdBQXlCLFNBQVNBLElBQVQsQ0FBY3lHLElBQWQsRUFBb0I7QUFDM0MsV0FBTyxJQUFJRCxPQUFKLENBQVlDLElBQVosRUFBa0IsSUFBbEIsQ0FBUDtBQUNELEdBRkQ7O0FBSUE7Ozs7QUFJQUQsVUFBUTNFLFNBQVIsQ0FBa0JrRixNQUFsQixHQUEyQixTQUFTQSxNQUFULENBQWdCQyxJQUFoQixFQUFzQjtBQUMvQyxRQUFJTCxRQUFRLEtBQUtBLEtBQWpCOztBQUVBLFFBQUkxRyxLQUFKO0FBQ0EsUUFBSTBHLE1BQU1NLGNBQU4sQ0FBcUJELElBQXJCLENBQUosRUFBZ0M7QUFDOUIvRyxjQUFRMEcsTUFBTUssSUFBTixDQUFSO0FBQ0QsS0FGRCxNQUdLO0FBQ0gsVUFBSUUsVUFBVSxJQUFkO0FBQUEsVUFBb0JDLEtBQXBCO0FBQUEsVUFBMkJkLEtBQTNCO0FBQUEsVUFBa0NlLFlBQVksS0FBOUM7O0FBRUEsYUFBT0YsT0FBUCxFQUFnQjtBQUNkLFlBQUlGLEtBQUtLLE9BQUwsQ0FBYSxHQUFiLElBQW9CLENBQXhCLEVBQTJCO0FBQ3pCcEgsa0JBQVFpSCxRQUFRVCxJQUFoQjtBQUNBVSxrQkFBUUgsS0FBS3BDLEtBQUwsQ0FBVyxHQUFYLENBQVI7QUFDQXlCLGtCQUFRLENBQVI7O0FBRUE7Ozs7Ozs7Ozs7O0FBV0EsaUJBQU9wRyxTQUFTLElBQVQsSUFBaUJvRyxRQUFRYyxNQUFNOUMsTUFBdEMsRUFBOEM7QUFDNUMsZ0JBQUlnQyxVQUFVYyxNQUFNOUMsTUFBTixHQUFlLENBQTdCLEVBQ0UrQyxZQUFZMUUsWUFBWXpDLEtBQVosRUFBbUJrSCxNQUFNZCxLQUFOLENBQW5CLENBQVo7O0FBRUZwRyxvQkFBUUEsTUFBTWtILE1BQU1kLE9BQU4sQ0FBTixDQUFSO0FBQ0Q7QUFDRixTQXRCRCxNQXVCSztBQUNIcEcsa0JBQVFpSCxRQUFRVCxJQUFSLENBQWFPLElBQWIsQ0FBUjtBQUNBSSxzQkFBWTFFLFlBQVl3RSxRQUFRVCxJQUFwQixFQUEwQk8sSUFBMUIsQ0FBWjtBQUNEOztBQUVELFlBQUlJLFNBQUosRUFDRTs7QUFFRkYsa0JBQVVBLFFBQVFKLE1BQWxCO0FBQ0Q7O0FBRURILFlBQU1LLElBQU4sSUFBYy9HLEtBQWQ7QUFDRDs7QUFFRCxRQUFJbUMsV0FBV25DLEtBQVgsQ0FBSixFQUNFQSxRQUFRQSxNQUFNa0MsSUFBTixDQUFXLEtBQUtzRSxJQUFoQixDQUFSOztBQUVGLFdBQU94RyxLQUFQO0FBQ0QsR0FwREQ7O0FBc0RBOzs7OztBQUtBLFdBQVNxSCxNQUFULEdBQWtCO0FBQ2hCLFNBQUtYLEtBQUwsR0FBYSxFQUFiO0FBQ0Q7O0FBRUQ7OztBQUdBVyxTQUFPekYsU0FBUCxDQUFpQjBGLFVBQWpCLEdBQThCLFNBQVNBLFVBQVQsR0FBc0I7QUFDbEQsU0FBS1osS0FBTCxHQUFhLEVBQWI7QUFDRCxHQUZEOztBQUlBOzs7O0FBSUFXLFNBQU96RixTQUFQLENBQWlCMkYsS0FBakIsR0FBeUIsU0FBU0EsS0FBVCxDQUFlM0QsUUFBZixFQUF5QkMsSUFBekIsRUFBK0I7QUFDdEQsUUFBSTZDLFFBQVEsS0FBS0EsS0FBakI7QUFDQSxRQUFJM0MsU0FBUzJDLE1BQU05QyxRQUFOLENBQWI7O0FBRUEsUUFBSUcsVUFBVSxJQUFkLEVBQ0VBLFNBQVMyQyxNQUFNOUMsUUFBTixJQUFrQkQsY0FBY0MsUUFBZCxFQUF3QkMsSUFBeEIsQ0FBM0I7O0FBRUYsV0FBT0UsTUFBUDtBQUNELEdBUkQ7O0FBVUE7Ozs7Ozs7OztBQVNBc0QsU0FBT3pGLFNBQVAsQ0FBaUI0RixNQUFqQixHQUEwQixTQUFTQSxNQUFULENBQWdCNUQsUUFBaEIsRUFBMEI0QyxJQUExQixFQUFnQ2lCLFFBQWhDLEVBQTBDO0FBQ2xFLFFBQUkxRCxTQUFTLEtBQUt3RCxLQUFMLENBQVczRCxRQUFYLENBQWI7QUFDQSxRQUFJcUQsVUFBV1QsZ0JBQWdCRCxPQUFqQixHQUE0QkMsSUFBNUIsR0FBbUMsSUFBSUQsT0FBSixDQUFZQyxJQUFaLENBQWpEO0FBQ0EsV0FBTyxLQUFLa0IsWUFBTCxDQUFrQjNELE1BQWxCLEVBQTBCa0QsT0FBMUIsRUFBbUNRLFFBQW5DLEVBQTZDN0QsUUFBN0MsQ0FBUDtBQUNELEdBSkQ7O0FBTUE7Ozs7Ozs7OztBQVNBeUQsU0FBT3pGLFNBQVAsQ0FBaUI4RixZQUFqQixHQUFnQyxTQUFTQSxZQUFULENBQXNCM0QsTUFBdEIsRUFBOEJrRCxPQUE5QixFQUF1Q1EsUUFBdkMsRUFBaURFLGdCQUFqRCxFQUFtRTtBQUNqRyxRQUFJQyxTQUFTLEVBQWI7QUFDQSxRQUFJMUMsS0FBSixFQUFXMkMsTUFBWCxFQUFtQjdILEtBQW5CO0FBQ0EsU0FBSyxJQUFJdUYsSUFBSSxDQUFSLEVBQVdRLFlBQVloQyxPQUFPSyxNQUFuQyxFQUEyQ21CLElBQUlRLFNBQS9DLEVBQTBELEVBQUVSLENBQTVELEVBQStEO0FBQzdEdkYsY0FBUThILFNBQVI7QUFDQTVDLGNBQVFuQixPQUFPd0IsQ0FBUCxDQUFSO0FBQ0FzQyxlQUFTM0MsTUFBTSxDQUFOLENBQVQ7O0FBRUEsVUFBSTJDLFdBQVcsR0FBZixFQUFvQjdILFFBQVEsS0FBSytILGFBQUwsQ0FBbUI3QyxLQUFuQixFQUEwQitCLE9BQTFCLEVBQW1DUSxRQUFuQyxFQUE2Q0UsZ0JBQTdDLENBQVIsQ0FBcEIsS0FDSyxJQUFJRSxXQUFXLEdBQWYsRUFBb0I3SCxRQUFRLEtBQUtnSSxjQUFMLENBQW9COUMsS0FBcEIsRUFBMkIrQixPQUEzQixFQUFvQ1EsUUFBcEMsRUFBOENFLGdCQUE5QyxDQUFSLENBQXBCLEtBQ0EsSUFBSUUsV0FBVyxHQUFmLEVBQW9CN0gsUUFBUSxLQUFLaUksYUFBTCxDQUFtQi9DLEtBQW5CLEVBQTBCK0IsT0FBMUIsRUFBbUNRLFFBQW5DLEVBQTZDRSxnQkFBN0MsQ0FBUixDQUFwQixLQUNBLElBQUlFLFdBQVcsR0FBZixFQUFvQjdILFFBQVEsS0FBS2tJLGNBQUwsQ0FBb0JoRCxLQUFwQixFQUEyQitCLE9BQTNCLENBQVIsQ0FBcEIsS0FDQSxJQUFJWSxXQUFXLE1BQWYsRUFBdUI3SCxRQUFRLEtBQUttSSxZQUFMLENBQWtCakQsS0FBbEIsRUFBeUIrQixPQUF6QixDQUFSLENBQXZCLEtBQ0EsSUFBSVksV0FBVyxNQUFmLEVBQXVCN0gsUUFBUSxLQUFLb0ksUUFBTCxDQUFjbEQsS0FBZCxDQUFSOztBQUU1QixVQUFJbEYsVUFBVThILFNBQWQsRUFDRUYsVUFBVTVILEtBQVY7QUFDSDs7QUFFRCxXQUFPNEgsTUFBUDtBQUNELEdBcEJEOztBQXNCQVAsU0FBT3pGLFNBQVAsQ0FBaUJtRyxhQUFqQixHQUFpQyxTQUFTQSxhQUFULENBQXVCN0MsS0FBdkIsRUFBOEIrQixPQUE5QixFQUF1Q1EsUUFBdkMsRUFBaURFLGdCQUFqRCxFQUFtRTtBQUNsRyxRQUFJVSxPQUFPLElBQVg7QUFDQSxRQUFJVCxTQUFTLEVBQWI7O0FBRUEsUUFBSTVILFFBQVFpSCxRQUFRSCxNQUFSLENBQWU1QixNQUFNLENBQU4sQ0FBZixDQUFaOztBQUVBO0FBQ0E7QUFDQSxhQUFTb0QsU0FBVCxDQUFtQjFFLFFBQW5CLEVBQTZCO0FBQzNCLGFBQU95RSxLQUFLYixNQUFMLENBQVk1RCxRQUFaLEVBQXNCcUQsT0FBdEIsRUFBK0JRLFFBQS9CLENBQVA7QUFDRDs7QUFFRCxRQUFJLENBQUN6SCxLQUFMLEVBQVk7O0FBRVosUUFBSThCLFFBQVE5QixLQUFSLENBQUosRUFBb0I7QUFDbEIsV0FBSyxJQUFJdUksSUFBSSxDQUFSLEVBQVcvQyxjQUFjeEYsTUFBTW9FLE1BQXBDLEVBQTRDbUUsSUFBSS9DLFdBQWhELEVBQTZELEVBQUUrQyxDQUEvRCxFQUFrRTtBQUNoRSxZQUFJdkksTUFBTXVJLENBQU4sQ0FBSixFQUFjO0FBQ1osY0FBSSxRQUFPdkksTUFBTXVJLENBQU4sQ0FBUCxNQUFvQixRQUF4QixFQUFrQztBQUNoQ3ZJLGtCQUFNdUksQ0FBTixFQUFTLElBQVQsSUFBaUJBLENBQWpCO0FBQ0F2SSxrQkFBTXVJLENBQU4sRUFBUyxRQUFULElBQXNCQSxNQUFNLENBQTVCO0FBQ0Q7O0FBRURYLG9CQUFVLEtBQUtGLFlBQUwsQ0FBa0J4QyxNQUFNLENBQU4sQ0FBbEIsRUFBNEIrQixRQUFRbEgsSUFBUixDQUFhQyxNQUFNdUksQ0FBTixDQUFiLENBQTVCLEVBQW9EZCxRQUFwRCxFQUE4REUsZ0JBQTlELENBQVY7QUFDRDtBQUNGO0FBQ0YsS0FYRCxNQVlLLElBQUksUUFBTzNILEtBQVAseUNBQU9BLEtBQVAsT0FBaUIsUUFBakIsSUFBNkIsT0FBT0EsS0FBUCxLQUFpQixRQUE5QyxJQUEwRCxPQUFPQSxLQUFQLEtBQWlCLFFBQS9FLEVBQXlGO0FBQzVGNEgsZ0JBQVUsS0FBS0YsWUFBTCxDQUFrQnhDLE1BQU0sQ0FBTixDQUFsQixFQUE0QitCLFFBQVFsSCxJQUFSLENBQWFDLEtBQWIsQ0FBNUIsRUFBaUR5SCxRQUFqRCxFQUEyREUsZ0JBQTNELENBQVY7QUFDRCxLQUZJLE1BR0EsSUFBSXhGLFdBQVduQyxLQUFYLENBQUosRUFBdUI7QUFDMUIsVUFBSSxPQUFPMkgsZ0JBQVAsS0FBNEIsUUFBaEMsRUFDRSxNQUFNLElBQUkvQyxLQUFKLENBQVUsZ0VBQVYsQ0FBTjs7QUFFRjtBQUNBNUUsY0FBUUEsTUFBTWtDLElBQU4sQ0FBVytFLFFBQVFULElBQW5CLEVBQXlCbUIsaUJBQWlCYSxLQUFqQixDQUF1QnRELE1BQU0sQ0FBTixDQUF2QixFQUFpQ0EsTUFBTSxDQUFOLENBQWpDLENBQXpCLEVBQXFFb0QsU0FBckUsQ0FBUjs7QUFFQSxVQUFJdEksU0FBUyxJQUFiLEVBQ0U0SCxVQUFVNUgsS0FBVjtBQUNILEtBVEksTUFVQTtBQUNINEgsZ0JBQVUsS0FBS0YsWUFBTCxDQUFrQnhDLE1BQU0sQ0FBTixDQUFsQixFQUE0QitCLE9BQTVCLEVBQXFDUSxRQUFyQyxFQUErQ0UsZ0JBQS9DLENBQVY7QUFDRDtBQUNELFdBQU9DLE1BQVA7QUFDRCxHQTNDRDs7QUE2Q0FQLFNBQU96RixTQUFQLENBQWlCb0csY0FBakIsR0FBa0MsU0FBU0EsY0FBVCxDQUF3QjlDLEtBQXhCLEVBQStCK0IsT0FBL0IsRUFBd0NRLFFBQXhDLEVBQWtERSxnQkFBbEQsRUFBb0U7QUFDcEcsUUFBSTNILFFBQVFpSCxRQUFRSCxNQUFSLENBQWU1QixNQUFNLENBQU4sQ0FBZixDQUFaOztBQUVBO0FBQ0E7QUFDQSxRQUFJLENBQUNsRixLQUFELElBQVc4QixRQUFROUIsS0FBUixLQUFrQkEsTUFBTW9FLE1BQU4sS0FBaUIsQ0FBbEQsRUFDRSxPQUFPLEtBQUtzRCxZQUFMLENBQWtCeEMsTUFBTSxDQUFOLENBQWxCLEVBQTRCK0IsT0FBNUIsRUFBcUNRLFFBQXJDLEVBQStDRSxnQkFBL0MsQ0FBUDtBQUNILEdBUEQ7O0FBU0FOLFNBQU96RixTQUFQLENBQWlCcUcsYUFBakIsR0FBaUMsU0FBU0EsYUFBVCxDQUF1Qi9DLEtBQXZCLEVBQThCK0IsT0FBOUIsRUFBdUNRLFFBQXZDLEVBQWlEO0FBQ2hGLFFBQUksQ0FBQ0EsUUFBTCxFQUFlOztBQUVmLFFBQUl6SCxRQUFRbUMsV0FBV3NGLFFBQVgsSUFBdUJBLFNBQVN2QyxNQUFNLENBQU4sQ0FBVCxDQUF2QixHQUE0Q3VDLFNBQVN2QyxNQUFNLENBQU4sQ0FBVCxDQUF4RDtBQUNBLFFBQUlsRixTQUFTLElBQWIsRUFDRSxPQUFPLEtBQUswSCxZQUFMLENBQWtCLEtBQUtILEtBQUwsQ0FBV3ZILEtBQVgsQ0FBbEIsRUFBcUNpSCxPQUFyQyxFQUE4Q1EsUUFBOUMsRUFBd0R6SCxLQUF4RCxDQUFQO0FBQ0gsR0FORDs7QUFRQXFILFNBQU96RixTQUFQLENBQWlCc0csY0FBakIsR0FBa0MsU0FBU0EsY0FBVCxDQUF3QmhELEtBQXhCLEVBQStCK0IsT0FBL0IsRUFBd0M7QUFDeEUsUUFBSWpILFFBQVFpSCxRQUFRSCxNQUFSLENBQWU1QixNQUFNLENBQU4sQ0FBZixDQUFaO0FBQ0EsUUFBSWxGLFNBQVMsSUFBYixFQUNFLE9BQU9BLEtBQVA7QUFDSCxHQUpEOztBQU1BcUgsU0FBT3pGLFNBQVAsQ0FBaUJ1RyxZQUFqQixHQUFnQyxTQUFTQSxZQUFULENBQXNCakQsS0FBdEIsRUFBNkIrQixPQUE3QixFQUFzQztBQUNwRSxRQUFJakgsUUFBUWlILFFBQVFILE1BQVIsQ0FBZTVCLE1BQU0sQ0FBTixDQUFmLENBQVo7QUFDQSxRQUFJbEYsU0FBUyxJQUFiLEVBQ0UsT0FBT3dCLFNBQVNpSCxNQUFULENBQWdCekksS0FBaEIsQ0FBUDtBQUNILEdBSkQ7O0FBTUFxSCxTQUFPekYsU0FBUCxDQUFpQndHLFFBQWpCLEdBQTRCLFNBQVNBLFFBQVQsQ0FBa0JsRCxLQUFsQixFQUF5QjtBQUNuRCxXQUFPQSxNQUFNLENBQU4sQ0FBUDtBQUNELEdBRkQ7O0FBSUExRCxXQUFTdUYsSUFBVCxHQUFnQixhQUFoQjtBQUNBdkYsV0FBU2tILE9BQVQsR0FBbUIsT0FBbkI7QUFDQWxILFdBQVNxQyxJQUFULEdBQWdCLENBQUMsSUFBRCxFQUFPLElBQVAsQ0FBaEI7O0FBRUE7QUFDQSxNQUFJOEUsZ0JBQWdCLElBQUl0QixNQUFKLEVBQXBCOztBQUVBOzs7QUFHQTdGLFdBQVM4RixVQUFULEdBQXNCLFNBQVNBLFVBQVQsR0FBc0I7QUFDMUMsV0FBT3FCLGNBQWNyQixVQUFkLEVBQVA7QUFDRCxHQUZEOztBQUlBOzs7OztBQUtBOUYsV0FBUytGLEtBQVQsR0FBaUIsU0FBU0EsS0FBVCxDQUFlM0QsUUFBZixFQUF5QkMsSUFBekIsRUFBK0I7QUFDOUMsV0FBTzhFLGNBQWNwQixLQUFkLENBQW9CM0QsUUFBcEIsRUFBOEJDLElBQTlCLENBQVA7QUFDRCxHQUZEOztBQUlBOzs7O0FBSUFyQyxXQUFTZ0csTUFBVCxHQUFrQixTQUFTQSxNQUFULENBQWdCNUQsUUFBaEIsRUFBMEI0QyxJQUExQixFQUFnQ2lCLFFBQWhDLEVBQTBDO0FBQzFELFFBQUksT0FBTzdELFFBQVAsS0FBb0IsUUFBeEIsRUFBa0M7QUFDaEMsWUFBTSxJQUFJZ0YsU0FBSixDQUFjLHFEQUFxRCxPQUFyRCxHQUErRHhHLFFBQVF3QixRQUFSLENBQS9ELEdBQW1GLDJCQUFuRixHQUFpSCx3REFBL0gsQ0FBTjtBQUNEOztBQUVELFdBQU8rRSxjQUFjbkIsTUFBZCxDQUFxQjVELFFBQXJCLEVBQStCNEMsSUFBL0IsRUFBcUNpQixRQUFyQyxDQUFQO0FBQ0QsR0FORDs7QUFRQTtBQUNBLHFCQXJtQndDLENBcW1CcEI7QUFDcEJqRyxXQUFTcUgsT0FBVCxHQUFtQixTQUFTQSxPQUFULENBQWlCakYsUUFBakIsRUFBMkI0QyxJQUEzQixFQUFpQ2lCLFFBQWpDLEVBQTJDcUIsSUFBM0MsRUFBaUQ7QUFDbEU7O0FBRUEsUUFBSUMsU0FBU3ZILFNBQVNnRyxNQUFULENBQWdCNUQsUUFBaEIsRUFBMEI0QyxJQUExQixFQUFnQ2lCLFFBQWhDLENBQWI7O0FBRUEsUUFBSXRGLFdBQVcyRyxJQUFYLENBQUosRUFBc0I7QUFDcEJBLFdBQUtDLE1BQUw7QUFDRCxLQUZELE1BR0s7QUFDSCxhQUFPQSxNQUFQO0FBQ0Q7QUFDRixHQVhEOztBQWFBO0FBQ0E7QUFDQXZILFdBQVNpSCxNQUFULEdBQWtCdkYsVUFBbEI7O0FBRUE7QUFDQTFCLFdBQVNzRCxPQUFULEdBQW1CQSxPQUFuQjtBQUNBdEQsV0FBUytFLE9BQVQsR0FBbUJBLE9BQW5CO0FBQ0EvRSxXQUFTNkYsTUFBVCxHQUFrQkEsTUFBbEI7QUFFRCxDQWhvQkEsQ0FBRDs7a0JBa29CZWpHLElBQUlJLFE7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4cUJuQjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQTs7QUFFQSxJQUFJd0gsV0FBVztBQUNiLFFBQU0sU0FETztBQUViO0FBQ0EsUUFBTSxhQUhPO0FBSWIsUUFBTSxZQUpPO0FBS2IsUUFBTSxVQUxPO0FBTWIsUUFBTSxTQU5PO0FBT2IsU0FBTyxXQVBNO0FBUWI7QUFDQSxRQUFNLFVBVE87QUFVYixRQUFNLFlBVk87QUFXYixRQUFNLFVBWE87QUFZYixTQUFPLFdBWk07QUFhYixRQUFNLGNBYk87QUFjYixRQUFNLFlBZE87QUFlYjtBQUNBO0FBQ0EsUUFBTSxXQWpCTztBQWtCYixRQUFNLFdBbEJPO0FBbUJiO0FBQ0EsT0FBSyxTQXBCUTtBQXFCYixRQUFNLFFBckJPO0FBc0JiLFFBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTdCYSxDQUFmO0FBK0JBLElBQUlDLE9BQU87QUFDVCxlQURTLHVCQUNLQyxVQURMLEVBQ2lCO0FBQ3hCO0FBUUQsR0FWUTtBQVdULHVCQVhTLCtCQVdhQSxVQVhiLEVBV3lCO0FBQ2hDO0FBaUJELEdBN0JRO0FBOEJULGNBOUJTLHNCQThCSUEsVUE5QkosRUE4QmdCO0FBQ3ZCO0FBR0QsR0FsQ1E7QUFtQ1QscUJBbkNTLDZCQW1DV0EsVUFuQ1gsRUFtQ3VCO0FBQzlCLG1EQUVlQSxXQUFXQyxXQUYxQixpQ0FFOERELFdBQVdFLFVBRnpFO0FBS0QsR0F6Q1E7QUEwQ1QsV0ExQ1MsbUJBMENDRixVQTFDRCxFQTBDYTtBQUNwQiwwakJBYXlJQSxXQUFXQyxXQWJwSixnQkFheUtELFdBQVdHLGNBYnBMLDBDQWFxT0gsV0FBV0csY0FiaFAsa0xBZWlHSCxXQUFXRSxVQWY1RztBQStCRCxHQTFFUTtBQTJFVCxTQTNFUyxpQkEyRURGLFVBM0VDLEVBMkVXO0FBQ2xCLHFPQUUwQkEsV0FBV0UsVUFGckM7QUFLRDtBQWpGUSxDQUFYOztBQW9GQSxJQUFNRSxpQkFBaUIsU0FBakJBLGNBQWlCLENBQVVDLElBQVYsRUFBZ0JDLElBQWhCLEVBQXNCO0FBQzNDLE1BQUlELFFBQVFBLEtBQUtELGNBQWpCLEVBQWlDO0FBQy9CQyxTQUFLRCxjQUFMLENBQW9CcEgsSUFBcEIsQ0FBeUJzSCxJQUF6QixFQUErQkEsSUFBL0I7QUFDRCxHQUZELE1BR0ssSUFBSSxLQUFLRixjQUFULEVBQXlCO0FBQzVCLFNBQUtBLGNBQUwsQ0FBb0JwSCxJQUFwQixDQUF5QnNILElBQXpCLEVBQStCQSxJQUEvQjtBQUNEOztBQUVELE1BQUlBLEtBQUtDLEtBQUwsSUFBYyxhQUFsQixFQUFpQztBQUMvQixRQUFJRixRQUFRQSxLQUFLRyxRQUFqQixFQUEyQjtBQUN6QkgsV0FBS0csUUFBTCxDQUFjeEgsSUFBZCxDQUFtQnNILElBQW5CLEVBQXlCQSxJQUF6QjtBQUNELEtBRkQsTUFHSyxJQUFJLEtBQUtFLFFBQVQsRUFBbUI7QUFDdEIsV0FBS0EsUUFBTCxDQUFjeEgsSUFBZCxDQUFtQnNILElBQW5CLEVBQXlCQSxJQUF6QjtBQUNEO0FBQ0Y7O0FBRURELFNBQU8sSUFBUDtBQUNBQyxTQUFPLElBQVA7QUFDQSxTQUFPLElBQVA7QUFDRCxDQXBCRDtBQXFCQSxJQUFNRywyQkFBMkIsU0FBM0JBLHdCQUEyQixHQUFZO0FBQUE7O0FBQzNDLE1BQUlwRSxJQUFJLEtBQUtxRSxLQUFMLENBQVd4RixNQUFuQjtBQUFBLE1BQTJCeUYsVUFBM0I7O0FBRDJDO0FBSXpDLFFBQUlOLE9BQU8sTUFBS0ssS0FBTCxDQUFXckUsQ0FBWCxDQUFYO0FBQ0EsUUFBSWdFLEtBQUtPLFFBQVQsRUFBbUI7QUFDakJELFVBQUlFLEtBQUtDLEdBQUwsQ0FBU1QsS0FBS1UsT0FBTCxDQUFhQyxVQUFiLEVBQVQsRUFBb0Msa0JBQUVDLE1BQUYsQ0FBU1osS0FBS2EsUUFBZCxDQUFwQyxDQUFKO0FBQ0FiLFdBQUtPLFFBQUwsQ0FBY08sR0FBZCxDQUFrQjtBQUNoQixxQkFBYVI7QUFERyxPQUFsQjtBQUdBLFVBQUlOLEtBQUtlLEtBQVQsRUFBZ0I7QUFDZGYsYUFBS08sUUFBTCxDQUFjUyxJQUFkLENBQW1CLG1CQUFuQixFQUF3Q0YsR0FBeEMsQ0FBNEM7QUFDMUMseUJBQWUsTUFBS1QsS0FBTCxDQUFXckUsQ0FBWCxFQUFjdUUsUUFBZCxDQUF1QnhKLE1BQXZCLEtBQWtDO0FBRFAsU0FBNUM7QUFHRDs7QUFFRDtBQUNBLFVBQUlpSixLQUFLaUIsUUFBVCxFQUFtQjtBQUNiQyxtQ0FBNEIsWUFBWTtBQUMxQyxpQkFBTyxrQkFBRU4sTUFBRixDQUFTWixLQUFLTyxRQUFMLENBQWNPLEdBQWQsQ0FBa0Isa0JBQWxCLENBQVQsSUFBa0Qsa0JBQUVGLE1BQUYsQ0FBU1osS0FBS08sUUFBTCxDQUFjTyxHQUFkLENBQWtCLHFCQUFsQixDQUFULENBQXpEO0FBQ0QsU0FGOEIsQ0FFNUJuSSxJQUY0QixPQURkOztBQUlqQnFILGFBQUttQixPQUFMLENBQWFwSyxNQUFiLENBQW9CLEVBQXBCO0FBQ0FpSixhQUFLTyxRQUFMLENBQWN4SixNQUFkLENBQXFCLEVBQXJCOztBQUVJcUssNkJBQXFCcEIsS0FBS3FCLGFBQUwsQ0FBbUJDLFdBQW5CLEVBUFI7O0FBUWpCLFlBQUlkLEtBQUtlLEdBQUwsQ0FBU0gscUJBQXFCcEIsS0FBS21CLE9BQUwsQ0FBYXBLLE1BQWIsRUFBOUIsSUFBdURtSyx3QkFBM0QsRUFBcUY7QUFDbkZsQixlQUFLbUIsT0FBTCxDQUFhTCxHQUFiLENBQWlCLEVBQUMvSixRQUFRcUsscUJBQXFCRix3QkFBckIsR0FBZ0QsQ0FBekQsRUFBakI7QUFDQWxCLGVBQUtPLFFBQUwsQ0FBY08sR0FBZCxDQUFrQixFQUFDL0osUUFBUXFLLHFCQUFxQkYsd0JBQXJCLEdBQWdELENBQXpELEVBQWxCO0FBQ0Q7QUFDRjtBQUNGO0FBOUJ3Qzs7QUFHM0MsU0FBT2xGLEdBQVAsRUFBWTtBQUFBLFFBZUZrRix3QkFmRTtBQUFBLFFBcUJGRSxrQkFyQkU7O0FBQUE7QUE0Qlg7O0FBRURwRixNQUFJLElBQUo7QUFDQXNFLE1BQUksSUFBSjtBQUNBLFNBQU8sSUFBUDtBQUNELENBcENEO0FBcUNBLElBQU1rQiwrQkFBK0IsU0FBL0JBLDRCQUErQixDQUFVQyxNQUFWLEVBQWtCO0FBQ3JELE1BQUlBLFVBQVUsQ0FBQyxLQUFLQyw2QkFBcEIsRUFBbUQsT0FBTyxJQUFQOztBQUVuRCxNQUFJMUIsT0FBTyxLQUFLSyxLQUFMLENBQVcsS0FBS3NCLDRCQUFoQixDQUFYO0FBQUEsTUFDRTdGLE1BQU0sRUFEUjtBQUFBLE1BQ1k4RixpQkFBaUIsQ0FEN0I7QUFBQSxNQUVFQyxNQUFNLEVBRlI7QUFBQSxNQUVZQyxZQUFZLEVBRnhCO0FBQUEsTUFHRUMsd0JBSEY7O0FBS0EsTUFBSSxDQUFDL0IsSUFBTCxFQUFXLE9BQU8sSUFBUDtBQUNYLE1BQUl5QixNQUFKLEVBQVkscUJBQU9PLFNBQVNDLElBQWhCLEVBQXNCUixNQUF0QixDQUE2QixLQUFLQyw2QkFBbEM7O0FBRVo1RixRQUFNa0UsS0FBS21CLE9BQUwsQ0FBYWUsTUFBYixFQUFOO0FBQ0FMLFFBQU07QUFDSk0sV0FBT25DLEtBQUttQixPQUFMLENBQWFSLFVBQWIsRUFESDtBQUVKNUosWUFBUWlKLEtBQUttQixPQUFMLENBQWFHLFdBQWI7QUFGSixHQUFOO0FBSUFRLGNBQVk7QUFDVk0sY0FBVTVCLEtBQUtDLEdBQUwsQ0FBUyxxQkFBTzRCLE1BQVAsRUFBZUYsS0FBZixFQUFULEVBQWlDLHFCQUFPSCxTQUFTQyxJQUFoQixFQUFzQkUsS0FBdEIsRUFBakMsQ0FEQTtBQUVWRyxlQUFXOUIsS0FBS0MsR0FBTCxDQUFTLHFCQUFPNEIsTUFBUCxFQUFldEwsTUFBZixFQUFULEVBQWtDLHFCQUFPaUwsU0FBU0MsSUFBaEIsRUFBc0JsTCxNQUF0QixFQUFsQyxDQUZEO0FBR1ZvTCxXQUFPLEtBQUtULDZCQUFMLENBQW1DZixVQUFuQyxFQUhHO0FBSVY1SixZQUFRLEtBQUsySyw2QkFBTCxDQUFtQ0osV0FBbkM7QUFKRSxHQUFaOztBQU9BO0FBQ0EsTUFBSSxDQUFDdEIsS0FBS3VDLFNBQU4sSUFBbUJ2QyxLQUFLdUMsU0FBTCxLQUFtQixFQUF0QyxJQUE0Q3ZDLEtBQUt1QyxTQUFMLEtBQW1CLE1BQW5FLEVBQTJFO0FBQ3pFO0FBQ0FSLHNCQUFrQixLQUFsQjs7QUFFQSxRQUFJakcsSUFBSTBHLEdBQUosR0FBVVYsVUFBVS9LLE1BQXBCLEdBQTZCNkssY0FBN0IsR0FBOEMsQ0FBbEQsRUFBcUQ7QUFDbkRHLHdCQUFrQixLQUFsQjtBQUNELEtBRkQsTUFFTyxJQUFJakcsSUFBSTBHLEdBQUosR0FBVVgsSUFBSTlLLE1BQWQsR0FBdUIrSyxVQUFVL0ssTUFBakMsR0FBMEM2SyxjQUExQyxHQUEyREUsVUFBVVEsU0FBekUsRUFBb0Y7QUFDekZQLHdCQUFrQixRQUFsQjtBQUNEO0FBQ0YsR0FURCxNQVNPO0FBQ0xBLHNCQUFrQi9CLEtBQUt1QyxTQUF2QjtBQUNEOztBQUVELE1BQUlkLE1BQUosRUFBWTtBQUNWLFNBQUtDLDZCQUFMLENBQ0dlLFFBREgsQ0FDWSxlQUFlVixlQUQzQjtBQUVEO0FBQ0QsT0FBS0wsNkJBQUwsQ0FDR1osR0FESCxDQUNRLFlBQVk7QUFDaEIsUUFBSWlCLG1CQUFtQixLQUF2QixFQUE4QjtBQUM1QixVQUFJakcsSUFBSTBHLEdBQUosR0FBVVgsSUFBSTlLLE1BQWQsR0FBdUIrSyxVQUFVL0ssTUFBakMsR0FBMEM2SyxjQUExQyxHQUEyREUsVUFBVVEsU0FBekUsRUFBb0Y7O0FBRWxGLFlBQUlJLFNBQVM1RyxJQUFJMEcsR0FBSixHQUFVVixVQUFVL0ssTUFBakM7QUFDQSxZQUFJMkwsU0FBU1osVUFBVS9LLE1BQW5CLEdBQTRCNkssY0FBNUIsR0FBNkNFLFVBQVVRLFNBQTNELEVBQXNFO0FBQ3BFSSxtQkFBUyxDQUFUO0FBQ0Q7QUFDRCxZQUFJQSxTQUFTLENBQWIsRUFBZ0I7QUFDZEEsbUJBQVMsQ0FBVDtBQUNEOztBQUVELGVBQU87QUFDTEMsZ0JBQU03RyxJQUFJNkcsSUFETDtBQUVMSCxlQUFLRSxNQUZBO0FBR0xQLGlCQUFPTixJQUFJTTtBQUhOLFNBQVA7QUFLRDtBQUNELGFBQU87QUFDTFEsY0FBTTdHLElBQUk2RyxJQURMO0FBRUxILGFBQUsxRyxJQUFJMEcsR0FBSixHQUFVWCxJQUFJOUssTUFBZCxHQUF1QixDQUZ2QjtBQUdMb0wsZUFBT04sSUFBSU07QUFITixPQUFQO0FBS0QsS0F0QkQsTUF1QkssSUFBSUosbUJBQW1CLFFBQXZCLEVBQWlDO0FBQ3BDLGFBQU87QUFDTFksY0FBTTdHLElBQUk2RyxJQURMO0FBRUxILGFBQUsxRyxJQUFJMEcsR0FBSixHQUFVVixVQUFVL0ssTUFBcEIsR0FBNkIsQ0FGN0I7QUFHTG9MLGVBQU9OLElBQUlNO0FBSE4sT0FBUDtBQUtEO0FBQ0YsR0EvQkksQ0ErQkZ4SixJQS9CRSxDQStCRyxJQS9CSCxDQURQO0FBaUNELENBMUVEO0FBMkVBLElBQU1pSyxjQUFjLFNBQWRBLFdBQWMsQ0FBVUMsQ0FBVixFQUFhL0wsTUFBYixFQUFxQjtBQUN2QyxNQUFJLENBQUMsS0FBSzRLLDZCQUFWLEVBQXlDLE9BQU8sSUFBUDs7QUFFekMsTUFBSTFCLE9BQU8sS0FBS0ssS0FBTCxDQUFXLEtBQUtzQiw0QkFBaEIsQ0FBWDtBQUFBLE1BQTBEbUIsVUFBVSxTQUFwRTs7QUFFQWhNLFdBQVMsa0JBQUVpTSxjQUFGLENBQWlCRixFQUFFL0wsTUFBbkIsRUFBMkIsVUFBVUEsTUFBVixFQUFrQjtBQUNwRCxRQUFJQSxPQUFPa00sWUFBUCxDQUFvQixtQkFBcEIsQ0FBSixFQUE4QztBQUM1Q0YsZ0JBQVUsWUFBVjtBQUNBLGFBQU8sSUFBUDtBQUNELEtBSEQsTUFJSyxJQUFJOUMsS0FBS21CLE9BQUwsQ0FBYThCLEdBQWIsQ0FBaUIsQ0FBakIsS0FBdUJuTSxNQUEzQixFQUFtQztBQUN0Q2dNLGdCQUFVLFNBQVY7QUFDQSxhQUFPLElBQVA7QUFDRDtBQUNGLEdBVFEsQ0FBVDs7QUFXQSxNQUFJLENBQUNoTSxNQUFMLEVBQWE7QUFDWCxTQUFLb00sS0FBTDtBQUNBLFdBQU8sSUFBUDtBQUNELEdBSEQsTUFJSyxJQUFJSixZQUFZLFlBQWhCLEVBQThCO0FBQ2pDSyxnQkFBWXhLLElBQVosQ0FBaUIsSUFBakIsRUFBdUJxSCxLQUFLb0QsRUFBNUIsRUFBZ0M7QUFDOUJDLG1CQUFhO0FBQ1h4RyxlQUFPL0YsT0FBT2tNLFlBQVAsQ0FBb0IsbUJBQXBCO0FBREk7QUFEaUIsS0FBaEMsRUFJR3pFLFNBSkgsRUFJYyxpQkFKZDtBQUtBNkIsNkJBQXlCekgsSUFBekIsQ0FBOEIsSUFBOUI7QUFDQTZJLGlDQUE2QjdJLElBQTdCLENBQWtDLElBQWxDO0FBQ0EsUUFBSSxDQUFDcUgsS0FBS2lCLFFBQVYsRUFBb0I7QUFDbEIsV0FBS2lDLEtBQUw7QUFDRDtBQUNGLEdBWEksTUFZQSxDQUVKOztBQUVELFNBQU8sSUFBUDtBQUNELENBckNEO0FBc0NBLElBQU1JLFdBQVcsU0FBWEEsUUFBVyxDQUFVQyxNQUFWLEVBQWtCO0FBQ2pDLE1BQUl2RCxPQUFPLEtBQUtLLEtBQUwsQ0FBV2tELE1BQVgsQ0FBWDs7QUFFQTtBQUNBLE1BQUlDLE9BQU8sRUFBWDtBQUNBQSxPQUFLSixFQUFMLEdBQVVwRCxLQUFLb0QsRUFBZjtBQUNBSSxPQUFLQyxLQUFMLEdBQWF6RCxLQUFLeUQsS0FBbEI7QUFDQUQsT0FBS3ZDLFFBQUwsR0FBZ0JqQixLQUFLaUIsUUFBckI7QUFDQXVDLE9BQUtFLElBQUwsR0FBWTFELEtBQUswRCxJQUFqQjtBQUNBRixPQUFLak4sT0FBTCxHQUFleUosS0FBS3pKLE9BQXBCO0FBQ0FpTixPQUFLRyxRQUFMLEdBQWdCM0QsS0FBSzJELFFBQXJCO0FBQ0FILE9BQUtJLFdBQUwsR0FBb0JKLEtBQUtHLFFBQUwsSUFBaUJILEtBQUtHLFFBQUwsQ0FBYzlJLE1BQWQsR0FBdUIsQ0FBNUQ7QUFDQTJJLE9BQUs1TSxVQUFMLEdBQWtCb0osS0FBS3BKLFVBQXZCO0FBQ0E0TSxPQUFLek0sTUFBTCxHQUFjaUosS0FBS2pKLE1BQW5CO0FBQ0F5TSxPQUFLeE0sZ0JBQUwsR0FBd0JnSixLQUFLaEosZ0JBQTdCOztBQUVBLFNBQU8sc0JBQVNpSCxNQUFULENBQWdCeUIsS0FBS21FLEtBQUwsQ0FBV2xMLElBQVgsQ0FBZ0IsSUFBaEIsRUFBc0JxSCxLQUFLTCxVQUEzQixDQUFoQixFQUF3RDZELElBQXhELENBQVA7QUFDRCxDQWpCRDtBQWtCQSxJQUFNTSxZQUFZLFNBQVpBLFNBQVksQ0FBVVAsTUFBVixFQUFrQjtBQUNsQyxNQUFJdkQsT0FBTyxLQUFLSyxLQUFMLENBQVdrRCxNQUFYLENBQVg7O0FBRUEsTUFBSSxDQUFDdkQsS0FBS2lCLFFBQU4sSUFBa0JqQixLQUFLMkQsUUFBdkIsSUFBbUMzRCxLQUFLMkQsUUFBTCxDQUFjOUksTUFBZCxHQUF1QixDQUE5RCxFQUFpRTtBQUMvRG1GLFNBQUsyRCxRQUFMLEdBQWdCLEdBQUdJLE1BQUgsQ0FBVS9ELEtBQUsyRCxRQUFMLENBQWMzRCxLQUFLMkQsUUFBTCxDQUFjOUksTUFBZCxHQUF1QixDQUFyQyxDQUFWLENBQWhCO0FBQ0Q7O0FBRURtRixPQUFLMkQsUUFBTCxDQUFjbk0sT0FBZCxDQUFzQixVQUFVQyxDQUFWLEVBQWF1TSxNQUFiLEVBQXFCO0FBQ3pDdk0sTUFBRSxRQUFGLElBQWN1TSxNQUFkO0FBQ0QsR0FGRDs7QUFJQWhFLE9BQUtVLE9BQUwsQ0FBYXZLLElBQWIsQ0FDRSxzQkFBUzhILE1BQVQsQ0FBZ0J5QixLQUFLdUUsaUJBQUwsQ0FBdUJ0TCxJQUF2QixDQUE0QixJQUE1QixFQUFrQ3FILEtBQUtMLFVBQXZDLENBQWhCLEVBQW9FO0FBQ2xFZ0UsY0FBVTNELEtBQUsyRDtBQURtRCxHQUFwRSxDQURGO0FBS0QsQ0FoQkQ7QUFpQkEsSUFBTU8sYUFBYSxTQUFiQSxVQUFhLENBQVVYLE1BQVYsRUFBa0I7QUFDbkMsTUFBSXZELE9BQU8sS0FBS0ssS0FBTCxDQUFXa0QsTUFBWCxDQUFYOztBQUVBdkQsT0FBS21FLGFBQUwsQ0FBbUJuRCxJQUFuQixDQUF3QiwwQ0FBeEIsRUFBb0VvRCxNQUFwRTtBQUNBcEUsT0FBS3FFLGtCQUFMLENBQXdCQyxNQUF4QixDQUErQmhCLFNBQVMzSyxJQUFULENBQWMsSUFBZCxFQUFvQjRLLE1BQXBCLENBQS9CO0FBQ0QsQ0FMRDtBQU1BLElBQU1nQixhQUFhLFNBQWJBLFVBQWEsQ0FBVWhCLE1BQVYsRUFBa0I7QUFDbkMsTUFBSSxLQUFLbEQsS0FBTCxDQUFXa0QsTUFBWCxFQUFtQmlCLFFBQXZCLEVBQWlDLE9BQU8sSUFBUDs7QUFFakMsT0FBS25FLEtBQUwsQ0FBV2tELE1BQVgsRUFBbUJZLGFBQW5CLENBQWlDTSxPQUFqQyxDQUF5QyxPQUF6QztBQUNBLE9BQUtwRSxLQUFMLENBQVdrRCxNQUFYLEVBQW1CYyxrQkFBbkIsQ0FBc0NLLEtBQXRDO0FBQ0QsQ0FMRDtBQU1BLElBQU1DLGFBQWEsU0FBYkEsVUFBYSxDQUFVcEIsTUFBVixFQUFrQjtBQUNuQyxPQUFLbEQsS0FBTCxDQUFXa0QsTUFBWCxFQUFtQmMsa0JBQW5CLENBQXNDTyxHQUF0QyxDQUEwQyxFQUExQztBQUNELENBRkQ7QUFHQSxJQUFNQyxZQUFZLFNBQVpBLFNBQVksQ0FBVXRCLE1BQVYsRUFBa0I7QUFDbEMsT0FBS2xELEtBQUwsQ0FBV2tELE1BQVgsRUFBbUJZLGFBQW5CLENBQWlDTSxPQUFqQyxDQUF5QyxNQUF6QztBQUNELENBRkQ7QUFHQSxJQUFNeE4sV0FBVyxTQUFYQSxRQUFXLENBQVVzTSxNQUFWLEVBQWtCcE0sVUFBbEIsRUFBOEI7QUFDN0MsTUFBSSxLQUFLd0ssNEJBQUwsSUFBcUMsQ0FBQyxDQUExQyxFQUE2QyxPQUFPLElBQVAsQ0FEQSxDQUNhO0FBQzFELE1BQUl0SyxTQUFTLG1EQUFiO0FBQ0FGLGVBQWFBLFdBQVc4QixPQUFYLENBQW1CNUIsTUFBbkIsRUFBMkIsRUFBM0IsQ0FBYjs7QUFFQSxPQUFLZ0osS0FBTCxDQUFXa0QsTUFBWCxFQUFtQnVCLFdBQW5CLEdBQWlDLElBQWpDO0FBQ0EsT0FBS3pFLEtBQUwsQ0FBV2tELE1BQVgsRUFBbUJ0TSxRQUFuQixDQUE0QjBCLElBQTVCLENBQWlDO0FBQy9CbUcsVUFBTSxJQUR5QjtBQUUvQmtCLFVBQU0sS0FBS0ssS0FBTCxDQUFXa0QsTUFBWCxDQUZ5QjtBQUcvQnBNLGdCQUFZQTtBQUhtQixHQUFqQyxFQUlJLFVBQVU0TixDQUFWLEVBQWE7O0FBRWYsUUFBSXZCLE9BQU8sRUFBWDtBQUNBLFFBQUl4RCxPQUFPLEtBQUtLLEtBQUwsQ0FBVyxLQUFLc0IsNEJBQWhCLENBQVg7QUFDQSxRQUFJLENBQUMzQixJQUFMLEVBQVcsT0FBTyxLQUFQOztBQUVYO0FBQ0EsS0FBQyxVQUFVQSxJQUFWLEVBQWdCK0UsQ0FBaEIsRUFBbUI7QUFDbEIsVUFBSUMsYUFBYSxFQUFqQjtBQUNBRCxRQUFFeE8sT0FBRixDQUFVaUIsT0FBVixDQUFrQixVQUFVeU4sRUFBVixFQUFjQyxPQUFkLEVBQXVCO0FBQ3ZDRCxXQUFHLFFBQUgsSUFBZUMsT0FBZjtBQUNBRCxXQUFHLFNBQUgsSUFBZ0JDLE9BQWhCO0FBQ0FGLG1CQUFXQyxHQUFHakYsS0FBS0wsVUFBTCxDQUFnQkMsV0FBbkIsQ0FBWCxJQUE4Q3FGLEVBQTlDO0FBQ0QsT0FKRDtBQUtBLFVBQUksa0JBQUUxTSxPQUFGLENBQVV5SCxLQUFLMkQsUUFBZixDQUFKLEVBQThCO0FBQzVCM0QsYUFBSzJELFFBQUwsQ0FBY25NLE9BQWQsQ0FBc0IsVUFBVXlOLEVBQVYsRUFBYztBQUNsQyxjQUFJRCxXQUFXQyxHQUFHakYsS0FBS0wsVUFBTCxDQUFnQkMsV0FBbkIsQ0FBWCxDQUFKLEVBQWlEO0FBQy9DbUYsY0FBRXhPLE9BQUYsQ0FBVXlPLFdBQVdDLEdBQUdqRixLQUFLTCxVQUFMLENBQWdCQyxXQUFuQixDQUFYLEVBQTRDLFFBQTVDLENBQVYsRUFBaUVJLEtBQUtMLFVBQUwsQ0FBZ0JHLGNBQWpGLElBQW1HLElBQW5HO0FBQ0Q7QUFDRixTQUpEO0FBS0Q7QUFDRixLQWRELEVBY0dFLElBZEgsRUFjUytFLENBZFQ7O0FBZ0JBL0UsU0FBS3pKLE9BQUwsR0FBZXdPLEVBQUV4TyxPQUFqQjs7QUFFQTZKLDZCQUF5QnpILElBQXpCLENBQThCLElBQTlCOztBQUVBO0FBQ0E2SyxTQUFLSixFQUFMLEdBQVVwRCxLQUFLb0QsRUFBZjtBQUNBSSxTQUFLQyxLQUFMLEdBQWF6RCxLQUFLeUQsS0FBbEI7QUFDQUQsU0FBS3ZDLFFBQUwsR0FBZ0JqQixLQUFLaUIsUUFBckI7QUFDQXVDLFNBQUtFLElBQUwsR0FBWTFELEtBQUswRCxJQUFqQjtBQUNBRixTQUFLak4sT0FBTCxHQUFleUosS0FBS3pKLE9BQXBCO0FBQ0EsU0FBS21MLDZCQUFMLENBQW1DVixJQUFuQyxDQUF3QyxzQkFBeEMsRUFBZ0U3SyxJQUFoRSxDQUFxRSxzQkFBUzhILE1BQVQsQ0FBZ0J5QixLQUFLbkosT0FBTCxDQUFhb0MsSUFBYixDQUFrQixJQUFsQixFQUF3QnFILEtBQUtMLFVBQTdCLENBQWhCLEVBQTBENkQsSUFBMUQsQ0FBckU7O0FBRUEyQixjQUFVeE0sSUFBVixDQUFlLElBQWYsRUFBcUIsS0FBS2dKLDRCQUExQixFQUF3RHhLLFVBQXhEO0FBQ0FxSyxpQ0FBNkI3SSxJQUE3QixDQUFrQyxJQUFsQzs7QUFFQXZCLGVBQVksWUFBWTtBQUN0Qm9LLG1DQUE2QjdJLElBQTdCLENBQWtDLElBQWxDO0FBQ0QsS0FGVSxDQUVSOUIsSUFGUSxDQUVILElBRkcsQ0FBWDtBQUtELEdBM0NFLENBMkNBQSxJQTNDQSxDQTJDSyxJQTNDTCxDQUpIO0FBZ0RELENBdEREO0FBdURBLElBQU1zTyxZQUFZLFNBQVpBLFNBQVksQ0FBVTVCLE1BQVYsRUFBa0JwTSxVQUFsQixFQUE4QjtBQUM5QyxNQUFJLEtBQUt3Syw0QkFBTCxJQUFxQyxDQUFDLENBQTFDLEVBQTZDLE9BQU8sSUFBUCxDQURDLENBQ1k7QUFDMUQsTUFBSXlELGtCQUFrQixFQUF0QjtBQUFBLE1BQTBCcEosSUFBSSxDQUFDLENBQS9CO0FBQUEsTUFBa0NxSixJQUFJLEtBQUtoRixLQUFMLENBQVdrRCxNQUFYLEVBQW1CaE4sT0FBbkIsQ0FBMkJzRSxNQUEzQixHQUFvQyxDQUExRTtBQUFBLE1BQTZFcEQsVUFBN0U7QUFDQSxNQUFJTixjQUFjLEVBQWxCLEVBQXNCO0FBQ3BCLFdBQU9rTyxJQUFJckosR0FBWCxFQUFnQjtBQUNkdkUsVUFBSSxLQUFLNEksS0FBTCxDQUFXa0QsTUFBWCxFQUFtQmhOLE9BQW5CLENBQTJCeUYsQ0FBM0IsQ0FBSjs7QUFFQSxVQUFJLENBQUMsS0FBS3ZFLEVBQUVmLElBQVIsRUFBYzRPLFdBQWQsTUFBK0JuTyxXQUFXbU8sV0FBWCxFQUFuQyxFQUE2RDtBQUMzREYsMEJBQWtCLENBQUMsRUFBQyxXQUFXM04sRUFBRSxTQUFGLENBQVosRUFBMEI4TixhQUFhLENBQXZDLEVBQUQsQ0FBbEI7QUFDQTtBQUNELE9BSEQsTUFHTztBQUNMLFlBQUlDLE9BQU8sQ0FBQyxLQUFLL04sRUFBRWYsSUFBUixFQUFjNE8sV0FBZCxHQUE0QnZJLE1BQTVCLENBQW1DNUYsV0FBV21PLFdBQVgsRUFBbkMsQ0FBWDtBQUNBLFlBQUlFLE9BQU8sQ0FBQyxDQUFaLEVBQWU7QUFDYkosMEJBQWdCNU8sSUFBaEIsQ0FBcUIsRUFBQyxXQUFXaUIsRUFBRSxTQUFGLENBQVosRUFBMEI4TixhQUFhQyxJQUF2QyxFQUFyQjtBQUNBLGNBQUlKLGdCQUFnQnZLLE1BQWhCLEdBQXlCLENBQTdCLEVBQWdDO0FBQ2pDO0FBQ0QySyxlQUFPLElBQVA7QUFDRDtBQUNGO0FBQ0RKLG9CQUFnQkksSUFBaEIsQ0FBcUIsVUFBVUMsQ0FBVixFQUFhQyxDQUFiLEVBQWdCO0FBQ25DLGFBQU9ELEVBQUVGLFdBQUYsR0FBZ0JHLEVBQUVILFdBQXpCO0FBQ0QsS0FGRDtBQUdEOztBQUVELE1BQUlILG1CQUFtQkEsZ0JBQWdCdkssTUFBaEIsR0FBeUIsQ0FBaEQsRUFBbUQ7QUFDakQ4SyxjQUFVaE4sSUFBVixDQUFlLElBQWYsRUFBcUI0SyxNQUFyQixFQUE2QmhGLFNBQTdCLEVBQXdDNkcsZ0JBQWdCLENBQWhCLEVBQW1CLFNBQW5CLENBQXhDO0FBQ0QsR0FGRCxNQUVPO0FBQ0xRLGVBQVdqTixJQUFYLENBQWdCLElBQWhCLEVBQXNCNEssTUFBdEI7QUFDRDtBQUNGLENBN0JEO0FBOEJBLElBQU1xQyxhQUFhLFNBQWJBLFVBQWEsQ0FBVXJDLE1BQVYsRUFBa0I7QUFDbkMsTUFBSSxLQUFLN0IsNkJBQVQsRUFBd0M7QUFDdEMsU0FBS0EsNkJBQUwsQ0FDR1YsSUFESCxDQUNRLDJCQURSLEVBRUc2RSxXQUZILENBRWUsT0FGZixFQUdHQyxVQUhILENBR2Msc0JBSGQ7QUFJRDs7QUFFRCxPQUFLekYsS0FBTCxDQUFXa0QsTUFBWCxFQUFtQndDLGdCQUFuQixHQUFzQyxDQUFDLENBQXZDO0FBQ0QsQ0FURDtBQVVBLElBQU1KLFlBQVksU0FBWkEsU0FBWSxDQUFVcEMsTUFBVixFQUFrQmhCLFNBQWxCLEVBQTZCeUQsTUFBN0IsRUFBcUM7QUFDckQsTUFBSUMsb0JBQUo7QUFBQSxNQUFpQkMsd0JBQWpCO0FBQUEsTUFBa0NDLHNCQUFsQztBQUFBLE1BQWlEQyxtQ0FBakQ7QUFDQSxNQUFJcEcsT0FBTyxLQUFLSyxLQUFMLENBQVdrRCxNQUFYLENBQVg7O0FBRUEsTUFBSSxLQUFLN0IsNkJBQUwsSUFBc0MxQixLQUFLekosT0FBM0MsSUFBc0R5SixLQUFLekosT0FBTCxDQUFhc0UsTUFBYixHQUFzQixDQUFoRixFQUFtRjs7QUFFakYsUUFBSSxPQUFPbUwsTUFBUCxLQUFrQixXQUF0QixFQUFtQztBQUNqQ0Msb0JBQWNELE1BQWQ7QUFDRCxLQUZELE1BR0s7QUFDSEUsd0JBQW1CbEcsS0FBSytGLGdCQUFMLElBQXlCLENBQUMsQ0FBM0IsR0FBZ0MvRixLQUFLcUcsbUJBQUwsSUFBNEIsQ0FBQyxDQUE3RCxHQUFpRXJHLEtBQUsrRixnQkFBeEY7QUFDQSxVQUFJRyxtQkFBbUIsQ0FBQyxDQUF4QixFQUEyQjtBQUN6QkQsc0JBQWMsQ0FBZDtBQUNBO0FBQ0QsT0FIRCxNQUlLO0FBQ0hBLHNCQUFjQyxrQkFBa0IzRCxTQUFoQztBQUNBLFlBQUkwRCxjQUFjLENBQWxCLEVBQXFCQSxjQUFjLENBQWQsQ0FBckIsS0FDSyxJQUFJQSxjQUFjakcsS0FBS3NHLGdCQUFMLEdBQXdCLENBQTFDLEVBQTZDTCxjQUFjakcsS0FBS3NHLGdCQUFMLEdBQXdCLENBQXRDO0FBQ25EO0FBQ0Y7O0FBRUR0RyxTQUFLK0YsZ0JBQUwsR0FBd0JFLFdBQXhCOztBQUVBO0FBQ0EsUUFBSWpHLEtBQUt6SixPQUFMLENBQWEwUCxXQUFiLEtBQTZCakcsS0FBS3pKLE9BQUwsQ0FBYTBQLFdBQWIsRUFBMEJNLElBQTNELEVBQWlFO0FBQUU7QUFDakUsVUFBSSxPQUFPaEUsU0FBUCxLQUFxQixXQUF6QixFQUFzQztBQUNwQyxlQUFPLElBQVA7QUFDRCxPQUZELE1BR0s7QUFDSCxZQUFJaUUsVUFBVSxLQUFkO0FBQ0EsZUFBT3hHLEtBQUt6SixPQUFMLENBQWEwUCxXQUFiLEVBQTBCTSxJQUFqQyxFQUF1QztBQUNyQ04sd0JBQWNBLGNBQWMxRCxTQUE1QjtBQUNBLGNBQUkwRCxjQUFjLENBQWxCLEVBQXFCO0FBQ25CQSwwQkFBYyxDQUFkO0FBQ0E7QUFDRCxXQUhELE1BSUssSUFBSUEsY0FBY2pHLEtBQUtzRyxnQkFBTCxHQUF3QixDQUExQyxFQUE2QztBQUNoREwsMEJBQWNqRyxLQUFLc0csZ0JBQUwsR0FBd0IsQ0FBdEM7QUFDQTtBQUNEO0FBQ0Y7QUFDRjtBQUNGOztBQUVELFFBQUksT0FBT0wsV0FBUCxLQUF1QixXQUEzQixFQUF3QztBQUN0QyxXQUFLdkUsNkJBQUwsQ0FDR1YsSUFESCxDQUNRLDJCQURSLEVBRUc2RSxXQUZILENBRWUsT0FGZjs7QUFJQU0sc0JBQWdCLEtBQUt6RSw2QkFBTCxDQUNiVixJQURhLENBQ1IsK0JBQStCaUYsV0FBL0IsR0FBNkMsSUFEckMsRUFFYnhELFFBRmEsQ0FFSixPQUZJLENBQWhCOztBQUlBMkQsbUNBQTZCLEtBQUsxRSw2QkFBTCxDQUFtQ1YsSUFBbkMsQ0FBd0Msc0JBQXhDLENBQTdCOztBQUVBLFVBQUltRixjQUFjbEQsR0FBZCxDQUFrQixDQUFsQixDQUFKLEVBQTBCO0FBQ3hCLFlBQUl3RCxzQkFBc0JOLGNBQWM3RSxXQUFkLEVBQTFCO0FBQUEsWUFDRW9GLG1DQUFtQ04sMkJBQTJCTyxXQUEzQixFQURyQztBQUFBLFlBRUVDLHNDQUFzQ1IsMkJBQTJCUyxTQUEzQixFQUZ4QztBQUFBLFlBR0VDLG1CQUFtQlgsY0FBY1ksUUFBZCxHQUF5QnZFLEdBQXpCLEdBQStCNEQsMkJBQTJCUyxTQUEzQixFQUhwRDs7QUFLQSxZQUFJSCxtQ0FBbUNFLG1DQUFuQyxHQUF5RUUsbUJBQW1CTCxtQkFBaEcsRUFBcUg7QUFDbkhMLHFDQUEyQlMsU0FBM0IsQ0FBcUNDLG1CQUFtQkwsbUJBQW5CLEdBQXlDQyxnQ0FBOUU7QUFDRCxTQUZELE1BR0ssSUFBSUUsc0NBQXNDRSxnQkFBMUMsRUFBNEQ7QUFDL0RWLHFDQUEyQlMsU0FBM0IsQ0FBcUNDLGdCQUFyQztBQUNEO0FBQ0Q7O0FBRUEsWUFBSSxPQUFPdkUsU0FBUCxLQUFxQixXQUF6QixFQUFzQztBQUNwQ3ZDLGVBQUtxRSxrQkFBTCxDQUF3Qk8sR0FBeEIsQ0FBNEI1RSxLQUFLekosT0FBTCxDQUFhMFAsV0FBYixFQUEwQnZQLElBQXREO0FBQ0Q7QUFDRjtBQUNGO0FBQ0Y7QUFDRixDQTVFRDtBQTZFQSxJQUFNc1EseUJBQXlCLFNBQXpCQSxzQkFBeUIsQ0FBVXpELE1BQVYsRUFBa0I7QUFDL0MsTUFBSXZELE9BQU8sS0FBS0ssS0FBTCxDQUFXa0QsTUFBWCxDQUFYO0FBQUEsTUFBK0JDLE9BQU8sRUFBdEM7QUFDQSxNQUFNeUQscUJBQXFCLGtCQUFFQyxRQUFGLENBQVcsVUFBVTNELE1BQVYsRUFBa0I7QUFDdEQsUUFBSSxLQUFLNUIsNEJBQUwsSUFBcUMsQ0FBQyxDQUExQyxFQUE2QyxPQUFPLElBQVAsQ0FEUyxDQUNJO0FBQzFEMUssYUFBUzBCLElBQVQsQ0FBYyxJQUFkLEVBQW9CNEssTUFBcEIsRUFBNEIsS0FBS2xELEtBQUwsQ0FBV2tELE1BQVgsRUFBbUJjLGtCQUFuQixDQUFzQ08sR0FBdEMsRUFBNUI7QUFDRCxHQUgwQixFQUd4QixHQUh3QixFQUduQi9OLElBSG1CLENBR2QsSUFIYyxDQUEzQjtBQUlBLE1BQU1zUSxvQkFBb0I7QUFDeEIsYUFBUyxlQUFVNUQsTUFBVixFQUFrQlYsQ0FBbEIsRUFBcUI7QUFDNUIsVUFBSUMsVUFBVSxFQUFkO0FBQ0EsVUFBSWhNLFNBQVMsa0JBQUVpTSxjQUFGLENBQWlCRixFQUFFL0wsTUFBbkIsRUFBMkIsVUFBVUEsTUFBVixFQUFrQjtBQUN4RCxZQUFJQSxPQUFPa00sWUFBUCxDQUFvQixnQ0FBcEIsQ0FBSixFQUEyRDtBQUN6REYsb0JBQVUsa0JBQVY7QUFDQSxpQkFBTyxJQUFQO0FBQ0QsU0FIRCxNQUlLLElBQUloTSxPQUFPa00sWUFBUCxDQUFvQixxQkFBcEIsQ0FBSixFQUFnRDtBQUNuREYsb0JBQVUsT0FBVjtBQUNBLGlCQUFPLElBQVA7QUFDRDtBQUNGLE9BVFksQ0FBYjs7QUFXQSxVQUFJaE0sTUFBSixFQUFZO0FBQ1YsWUFBSWdNLFlBQVksa0JBQWhCLEVBQW9DO0FBQ2xDLGNBQUlzRSxjQUFjdFEsT0FBT2tNLFlBQVAsQ0FBb0Isc0NBQXBCLENBQWxCO0FBQ0EsZUFBSzNDLEtBQUwsQ0FBV2tELE1BQVgsRUFBbUJJLFFBQW5CLENBQTRCMEQsTUFBNUIsQ0FBbUNELFdBQW5DLEVBQWdELENBQWhEO0FBQ0F0RCxvQkFBVW5MLElBQVYsQ0FBZSxJQUFmLEVBQXFCNEssTUFBckI7QUFDQVcscUJBQVd2TCxJQUFYLENBQWdCLElBQWhCLEVBQXNCNEssTUFBdEI7QUFDQWdCLHFCQUFXNUwsSUFBWCxDQUFnQixJQUFoQixFQUFzQjRLLE1BQXRCO0FBQ0FuRCxtQ0FBeUJ6SCxJQUF6QixDQUE4QixJQUE5QjtBQUNBNkksdUNBQTZCN0ksSUFBN0IsQ0FBa0MsSUFBbEM7QUFDQSw0QkFBRTJPLFNBQUYsQ0FBWXpFLENBQVo7QUFDQSxpQkFBTyxJQUFQO0FBQ0QsU0FWRCxNQVVPLElBQUlDLFlBQVksT0FBaEIsRUFBeUI7QUFDOUJLLHNCQUFZeEssSUFBWixDQUFpQixJQUFqQixFQUF1QjRLLE1BQXZCLEVBQStCLEVBQUNnRSxPQUFPLElBQVIsRUFBL0I7QUFDQW5ILG1DQUF5QnpILElBQXpCLENBQThCLElBQTlCO0FBQ0E2SSx1Q0FBNkI3SSxJQUE3QixDQUFrQyxJQUFsQztBQUNEO0FBQ0YsT0FoQkQsTUFpQks7QUFDSCxZQUFJLEtBQUtnSiw0QkFBTCxJQUFxQzRCLE1BQXpDLEVBQWlEO0FBQy9DLGNBQUksS0FBS2xELEtBQUwsQ0FBV2tELE1BQVgsRUFBbUJ3QyxnQkFBbkIsSUFBdUMsQ0FBQyxDQUE1QyxFQUErQztBQUFFO0FBQy9DLGlCQUFLN0MsS0FBTDtBQUNEO0FBQ0YsU0FKRCxNQUtLO0FBQ0hxQixxQkFBVzVMLElBQVgsQ0FBZ0IsSUFBaEIsRUFBc0I0SyxNQUF0QjtBQUNEO0FBQ0Y7QUFDRixLQXpDdUI7QUEwQ3hCLGFBQVMsZUFBVUEsTUFBVixFQUFrQlYsQ0FBbEIsRUFBcUI7QUFDNUI7QUFDQSxVQUFJQSxFQUFFMkUsS0FBRixJQUFXLGtCQUFLQyxTQUFMLENBQWVDLEdBQTFCLElBQWlDLEtBQUsvRiw0QkFBTCxLQUFzQyxDQUFDLENBQTVFLEVBQStFO0FBQUU7QUFDL0UsMEJBQUUyRixTQUFGLENBQVl6RSxDQUFaO0FBQ0EsZUFBTyxJQUFQO0FBQ0QsT0FIRCxNQUlLLElBQUlBLEVBQUUyRSxLQUFGLElBQVcsa0JBQUtDLFNBQUwsQ0FBZUUsR0FBOUIsRUFBbUM7QUFDdEM7QUFDQSxhQUFLekUsS0FBTDtBQUNBLGVBQU8sSUFBUDtBQUNELE9BSkksTUFLQSxJQUFJLEtBQUt2Qiw0QkFBTCxJQUFxQzRCLE1BQXJDLElBQStDVixFQUFFMkUsS0FBRixJQUFXLGtCQUFLQyxTQUFMLENBQWVHLFNBQTdFLEVBQXdGO0FBQUU7QUFDN0YsYUFBS0MsSUFBTCxDQUFVdEUsTUFBVixFQUQyRixDQUN4RTtBQUNuQjBELDJCQUFtQjFELE1BQW5CO0FBQ0Q7O0FBRUQsVUFBSTlELFNBQVNvRCxFQUFFMkUsS0FBWCxDQUFKLEVBQXVCO0FBQ3JCLDBCQUFFRixTQUFGLENBQVl6RSxDQUFaO0FBQ0QsT0FGRCxNQUdLO0FBQ0g7QUFDQSxZQUFJQSxFQUFFMkUsS0FBRixJQUFXLGtCQUFLQyxTQUFMLENBQWVHLFNBQTFCLElBQXVDLEtBQUt2SCxLQUFMLENBQVdrRCxNQUFYLEVBQW1CYyxrQkFBbkIsQ0FBc0NPLEdBQXRDLE1BQStDLEVBQTFGLEVBQThGO0FBQzVGO0FBQ0EsZUFBS3ZFLEtBQUwsQ0FBV2tELE1BQVgsRUFBbUJJLFFBQW5CLENBQTRCN0ksR0FBNUI7QUFDQWdKLG9CQUFVbkwsSUFBVixDQUFlLElBQWYsRUFBcUI0SyxNQUFyQjtBQUNBVyxxQkFBV3ZMLElBQVgsQ0FBZ0IsSUFBaEIsRUFBc0I0SyxNQUF0QjtBQUNBZ0IscUJBQVc1TCxJQUFYLENBQWdCLElBQWhCLEVBQXNCNEssTUFBdEI7QUFDQW5ELG1DQUF5QnpILElBQXpCLENBQThCLElBQTlCO0FBQ0E2SSx1Q0FBNkI3SSxJQUE3QixDQUFrQyxJQUFsQztBQUNBLDRCQUFFMk8sU0FBRixDQUFZekUsQ0FBWjtBQUNELFNBVEQsTUFTTztBQUNMb0UsNkJBQW1CMUQsTUFBbkI7QUFDRDtBQUNGO0FBQ0YsS0E1RXVCO0FBNkV4QixlQUFXLGlCQUFVQSxNQUFWLEVBQWtCVixDQUFsQixFQUFxQjtBQUM5QixVQUFJN0MsT0FBTyxLQUFLSyxLQUFMLENBQVdrRCxNQUFYLENBQVg7QUFDQSxVQUFJVixFQUFFMkUsS0FBRixJQUFXLGtCQUFLQyxTQUFMLENBQWVDLEdBQTlCLEVBQW1DO0FBQ2pDL0MsbUJBQVdoTSxJQUFYLENBQWdCLElBQWhCLEVBQXNCNEssTUFBdEI7QUFDQSxhQUFLTCxLQUFMO0FBQ0EsMEJBQUVvRSxTQUFGLENBQVl6RSxDQUFaO0FBQ0QsT0FKRCxNQUtLLElBQUlBLEVBQUUyRSxLQUFGLElBQVcsa0JBQUtDLFNBQUwsQ0FBZUssTUFBOUIsRUFBc0M7QUFDekMsWUFBSUMsYUFBYS9ILEtBQUtxRSxrQkFBTCxDQUF3Qk8sR0FBeEIsRUFBakI7QUFDQSxZQUFJNUUsS0FBSytGLGdCQUFMLEdBQXdCLENBQUMsQ0FBN0IsRUFBZ0M7QUFDOUI1QyxzQkFBWXhLLElBQVosQ0FBaUIsSUFBakIsRUFBdUJxSCxLQUFLb0QsRUFBNUIsRUFBZ0M7QUFDOUJDLHlCQUFhO0FBQ1h4RyxxQkFBT21ELEtBQUsrRjtBQUREO0FBRGlCLFdBQWhDLEVBSUd4SCxTQUpILEVBSWMsaUJBSmQ7QUFLRCxTQU5ELE1BTU8sSUFBSXdKLGNBQWMsRUFBbEIsRUFBc0I7QUFDM0I1RSxzQkFBWXhLLElBQVosQ0FBaUIsSUFBakIsRUFBdUI0SyxNQUF2QixFQUErQndFLFVBQS9CLEVBQTJDLElBQTNDO0FBQ0Q7QUFDRHBELG1CQUFXaE0sSUFBWCxDQUFnQixJQUFoQixFQUFzQjRLLE1BQXRCO0FBQ0FuRCxpQ0FBeUJ6SCxJQUF6QixDQUE4QixJQUE5QjtBQUNBLGFBQUt1SyxLQUFMOztBQUVBLDBCQUFFb0UsU0FBRixDQUFZekUsQ0FBWjtBQUNELE9BaEJJLE1BaUJBLElBQUlBLEVBQUUyRSxLQUFGLElBQVcsa0JBQUtDLFNBQUwsQ0FBZU8sSUFBOUIsRUFBb0M7QUFDdkNyQyxrQkFBVWhOLElBQVYsQ0FBZSxJQUFmLEVBQXFCNEssTUFBckIsRUFBNkIsQ0FBN0I7QUFDQSwwQkFBRStELFNBQUYsQ0FBWXpFLENBQVo7QUFDRCxPQUhJLE1BSUEsSUFBSUEsRUFBRTJFLEtBQUYsSUFBVyxrQkFBS0MsU0FBTCxDQUFlUSxFQUE5QixFQUFrQztBQUNyQ3RDLGtCQUFVaE4sSUFBVixDQUFlLElBQWYsRUFBcUI0SyxNQUFyQixFQUE2QixDQUFDLENBQTlCO0FBQ0EsMEJBQUUrRCxTQUFGLENBQVl6RSxDQUFaO0FBQ0Q7QUFDRixLQTdHdUI7QUE4R3hCLGFBQVMsZUFBVVUsTUFBVixFQUFrQlYsQ0FBbEIsRUFBcUI7QUFDNUI7QUFDRCxLQWhIdUI7QUFpSHhCLFlBQVEsY0FBVVUsTUFBVixFQUFrQlYsQ0FBbEIsRUFBcUI7QUFDM0JnQyxnQkFBVWxNLElBQVYsQ0FBZSxJQUFmLEVBQXFCNEssTUFBckI7QUFDQSx3QkFBRStELFNBQUYsQ0FBWXpFLENBQVo7QUFDRCxLQXBIdUI7QUFxSHhCLG9CQUFnQixzQkFBVVUsTUFBVixFQUFrQlYsQ0FBbEIsRUFBcUI7QUFDbkNNLGtCQUFZeEssSUFBWixDQUFpQixJQUFqQixFQUF1QjRLLE1BQXZCLEVBQStCLEVBQUM5TSxPQUFPdUosS0FBS1UsT0FBTCxDQUFha0UsR0FBYixFQUFSLEVBQS9CLEVBQTRELElBQTVEO0FBQ0Q7QUF2SHVCLEdBQTFCO0FBeUhBLE1BQU1DLFlBQVksU0FBWkEsU0FBWSxDQUFVdEIsTUFBVixFQUFrQjtBQUNsQ29CLGVBQVdoTSxJQUFYLENBQWdCLElBQWhCLEVBQXNCNEssTUFBdEI7QUFDRCxHQUZEOztBQU1BLE1BQUksQ0FBQ3ZELEtBQUtPLFFBQVYsRUFBb0I7QUFDbEI7QUFDQWlELFNBQUswRSxVQUFMLEdBQWtCLEtBQUtBLFVBQXZCO0FBQ0ExRSxTQUFLSixFQUFMLEdBQVVwRCxLQUFLb0QsRUFBZjtBQUNBSSxTQUFLaEcsSUFBTCxHQUFZd0MsS0FBS3hDLElBQWpCO0FBQ0FnRyxTQUFLQyxLQUFMLEdBQWF6RCxLQUFLeUQsS0FBbEI7QUFDQUQsU0FBSzJFLFFBQUwsR0FBZ0JuSSxLQUFLbUksUUFBckI7QUFDQTNFLFNBQUt2QyxRQUFMLEdBQWdCakIsS0FBS2lCLFFBQXJCO0FBQ0F1QyxTQUFLekMsS0FBTCxHQUFhZixLQUFLZSxLQUFsQjtBQUNBeUMsU0FBS3pNLE1BQUwsR0FBY2lKLEtBQUtqSixNQUFuQjtBQUNBeU0sU0FBS3hNLGdCQUFMLEdBQXdCZ0osS0FBS2hKLGdCQUE3QjtBQUNBd00sU0FBSzRFLFdBQUwsR0FBbUIsQ0FBQ3BJLEtBQUtqSixNQUFMLEdBQWNpSixLQUFLaEosZ0JBQXBCLElBQXdDLENBQTNEO0FBQ0F3TSxTQUFLSyxLQUFMLEdBQWFQLFNBQVMzSyxJQUFULENBQWMsSUFBZCxFQUFvQjRLLE1BQXBCLENBQWI7O0FBRUF2RCxTQUFLTyxRQUFMLEdBQWdCLHFCQUFPLHNCQUFTdEMsTUFBVCxDQUFnQnlCLEtBQUsySSxtQkFBTCxDQUF5QjFQLElBQXpCLENBQThCLElBQTlCLEVBQW9DcUgsS0FBS0wsVUFBekMsQ0FBaEIsRUFBc0U2RCxJQUF0RSxDQUFQLENBQWhCO0FBQ0F4RCxTQUFLcUIsYUFBTCxHQUFxQnJCLEtBQUtPLFFBQUwsQ0FBY1MsSUFBZCxDQUFtQiw0QkFBbkIsQ0FBckI7QUFDQWhCLFNBQUttRSxhQUFMLEdBQXFCbkUsS0FBS08sUUFBTCxDQUFjUyxJQUFkLENBQW1CLDJDQUFuQixDQUFyQjtBQUNBaEIsU0FBS3FFLGtCQUFMLEdBQTBCckUsS0FBS08sUUFBTCxDQUFjUyxJQUFkLENBQW1CLDJDQUFuQixDQUExQjs7QUFFQSxRQUFJaEIsS0FBS21CLE9BQUwsQ0FBYUgsSUFBYixDQUFrQixRQUFsQixFQUE0QmlDLEdBQTVCLENBQWdDLENBQWhDLENBQUosRUFBd0M7QUFDdENqRCxXQUFLVSxPQUFMLEdBQWVWLEtBQUttQixPQUFMLENBQWFILElBQWIsQ0FBa0IsUUFBbEIsQ0FBZjtBQUNBaEIsV0FBS1UsT0FBTCxDQUNHNEgsSUFESCxDQUNRLFVBRFIsRUFDb0IsSUFEcEIsRUFFR0EsSUFGSCxDQUVRLE9BRlIsRUFFaUIsa0JBQWtCOUUsS0FBSytFLFFBRnhDOztBQUlBLFVBQUkvRSxLQUFLaEcsSUFBVCxFQUFlO0FBQ2J3QyxhQUFLVSxPQUFMLENBQWE0SCxJQUFiLENBQWtCLE1BQWxCLEVBQTBCLE1BQTFCO0FBQ0Q7QUFDRHRJLFdBQUtVLE9BQUwsQ0FBYTRILElBQWIsQ0FBa0IsVUFBbEIsRUFBOEIsVUFBOUI7QUFDRCxLQVZELE1BV0s7QUFDSHRJLFdBQUtVLE9BQUwsR0FBZSxxQkFBTyxzQkFBU3pDLE1BQVQsQ0FBZ0J5QixLQUFLOEksVUFBTCxDQUFnQjdQLElBQWhCLENBQXFCLElBQXJCLEVBQTJCcUgsS0FBS0wsVUFBaEMsQ0FBaEIsRUFBNkQ2RCxJQUE3RCxDQUFQLENBQWY7QUFDQXhELFdBQUttQixPQUFMLENBQWFNLE1BQWIsQ0FBb0J6QixLQUFLVSxPQUF6QjtBQUNEOztBQUVEVixTQUFLbUIsT0FBTCxDQUFhTSxNQUFiLENBQW9CekIsS0FBS08sUUFBekI7QUFFRCxHQXJDRCxNQXNDSztBQUNIMkQsZUFBV3ZMLElBQVgsQ0FBZ0IsSUFBaEIsRUFBc0I0SyxNQUF0QjtBQUNEOztBQUVEbkQsMkJBQXlCekgsSUFBekIsQ0FBOEIsSUFBOUI7O0FBR0FxSCxPQUFLTyxRQUFMLENBQ0czSSxHQURILENBQ08sMEJBRFAsRUFFRzZRLEVBRkgsQ0FFTSwwQkFGTixFQUVrQ3RCLGtCQUFrQnVCLEtBQWxCLENBQXdCN1IsSUFBeEIsQ0FBNkIsSUFBN0IsRUFBbUMwTSxNQUFuQyxDQUZsQzs7QUFJQTs7QUFFQXZELE9BQUtxRSxrQkFBTCxDQUNHek0sR0FESCxDQUNPLDBCQURQLEVBRUc2USxFQUZILENBRU0sMEJBRk4sRUFFa0N0QixrQkFBa0J6QyxLQUFsQixDQUF3QjdOLElBQXhCLENBQTZCLElBQTdCLEVBQW1DME0sTUFBbkMsQ0FGbEMsRUFHRzNMLEdBSEgsQ0FHTyx5QkFIUCxFQUlHNlEsRUFKSCxDQUlNLHlCQUpOLEVBSWlDdEIsa0JBQWtCd0IsSUFBbEIsQ0FBdUI5UixJQUF2QixDQUE0QixJQUE1QixFQUFrQzBNLE1BQWxDLENBSmpDLEVBS0czTCxHQUxILENBS08sNEJBTFAsRUFNRzZRLEVBTkgsQ0FNTSw0QkFOTixFQU1vQ3RCLGtCQUFrQnlCLE9BQWxCLENBQTBCL1IsSUFBMUIsQ0FBK0IsSUFBL0IsRUFBcUMwTSxNQUFyQyxDQU5wQyxFQU9HM0wsR0FQSCxDQU9PLDBCQVBQLEVBUUc2USxFQVJILENBUU0sMEJBUk4sRUFRa0N0QixrQkFBa0IwQixLQUFsQixDQUF3QmhTLElBQXhCLENBQTZCLElBQTdCLEVBQW1DME0sTUFBbkMsQ0FSbEM7O0FBVUE7O0FBRUE7Ozs7OztBQU1BQyxTQUFPLElBQVA7QUFDQXhELFNBQU8sSUFBUDtBQUNBdUQsV0FBUyxJQUFUO0FBQ0EsU0FBTyxJQUFQO0FBQ0QsQ0E5TUQ7QUErTUEsSUFBTXVGLFlBQVksU0FBWkEsU0FBWSxDQUFVQyxPQUFWLEVBQW1CO0FBQ25DLE1BQUlBLGtDQUFKLEVBQStCO0FBQzdCQSxjQUFVQSxRQUFRdkYsSUFBUixDQUFhLDRCQUFiLENBQVY7QUFDRCxHQUZELE1BRU8sSUFBSSxDQUFDLGtCQUFFd0YsUUFBRixDQUFXRCxPQUFYLENBQUwsRUFBMEI7QUFDL0JBLGNBQVUscUJBQU9BLE9BQVAsRUFBZ0J2RixJQUFoQixDQUFxQiw0QkFBckIsQ0FBVjtBQUNEO0FBQ0QsTUFBSSxDQUFDLGtCQUFFd0YsUUFBRixDQUFXRCxPQUFYLENBQUwsRUFBMEI7QUFDeEJFLFlBQVFDLEdBQVIsQ0FBWSxrQkFBS0MsUUFBTCxDQUFjLG9CQUFkLEVBQW9DLEtBQXBDLEVBQTJDLFdBQTNDLENBQVo7QUFDQTtBQUNEO0FBQ0QsU0FBTyxrQkFBRXBNLE1BQUYsQ0FBUyxLQUFLc0QsS0FBZCxFQUFxQixZQUFZO0FBQ3RDLFdBQU8sS0FBSytDLEVBQUwsSUFBVzJGLE9BQWxCO0FBQ0QsR0FGTSxDQUFQO0FBR0QsQ0FiRDtBQWNBLElBQU1LLGNBQWMsU0FBZEEsV0FBYyxDQUFVQyxLQUFWLEVBQWlCQyxDQUFqQixFQUFvQjNGLFFBQXBCLEVBQThCO0FBQ2hELE1BQUksT0FBT0EsUUFBUCxLQUFvQixXQUF4QixFQUFxQztBQUNuQyxXQUFRMEYsTUFBTXBJLFFBQVAsR0FBbUIsQ0FBQ3FJLENBQXBCLEdBQXdCLElBQS9CO0FBQ0QsR0FGRCxNQUVPO0FBQ0wsV0FBTzNGLFFBQVA7QUFDRDtBQUNGLENBTkQ7QUFPQSxJQUFNNEYsZ0JBQWdCLFNBQWhCQSxhQUFnQixDQUFVaEcsTUFBVixFQUFrQjtBQUN0QyxPQUFLbEQsS0FBTCxDQUFXa0QsTUFBWCxFQUFtQmhOLE9BQW5CLENBQTJCaUIsT0FBM0IsQ0FBbUMsVUFBVUMsQ0FBVixFQUFhO0FBQzlDLFFBQUlBLEVBQUUrUixRQUFOLEVBQWdCO0FBQ2QvUixRQUFFbEIsT0FBRixDQUFVaUIsT0FBVixDQUFrQixVQUFVaVMsRUFBVixFQUFjO0FBQzlCQSxXQUFHOUYsUUFBSCxHQUFjLEtBQWQ7QUFDRCxPQUZEO0FBR0QsS0FKRCxNQUtLO0FBQ0hsTSxRQUFFa00sUUFBRixHQUFhLEtBQWI7QUFDRDtBQUNGLEdBVEQ7O0FBV0EsT0FBS3RELEtBQUwsQ0FBV2tELE1BQVgsRUFBbUJJLFFBQW5CLEdBQThCLEVBQTlCO0FBQ0EsT0FBS3RELEtBQUwsQ0FBV2tELE1BQVgsRUFBbUI3QyxPQUFuQixDQUEyQnZLLElBQTNCLENBQ0Usc0JBQVM4SCxNQUFULENBQWdCeUIsS0FBS3VFLGlCQUFMLENBQXVCdEwsSUFBdkIsQ0FBNEIsSUFBNUIsRUFBa0MsS0FBSzBILEtBQUwsQ0FBV2tELE1BQVgsRUFBbUI1RCxVQUFyRCxDQUFoQixFQUFrRjtBQUNoRmdFLGNBQVUsS0FBS3RELEtBQUwsQ0FBV2tELE1BQVgsRUFBbUJJO0FBRG1ELEdBQWxGLENBREY7QUFLRCxDQWxCRDtBQW1CQSxJQUFNUixjQUFjLFNBQWRBLFdBQWMsQ0FBVTRGLE9BQVYsRUFBbUJ0UyxLQUFuQixFQUEwQmtOLFFBQTFCLEVBQW9DK0YsT0FBcEMsRUFBNkM7QUFDL0QsTUFBTUMsWUFBWTtBQUNoQixxQkFBaUIsdUJBQVVwRyxNQUFWLEVBQWtCOU0sS0FBbEIsRUFBeUJrTixRQUF6QixFQUFtQ2lHLFlBQW5DLEVBQWlELENBRWpFLENBSGU7QUFJaEIsMkJBQXVCLDZCQUFVckcsTUFBVixFQUFrQjlNLEtBQWxCLEVBQXlCa04sUUFBekIsRUFBbUNpRyxZQUFuQyxFQUFpRDtBQUN0RSxVQUFJNUosT0FBTyxLQUFLSyxLQUFMLENBQVdrRCxNQUFYLENBQVg7QUFBQSxVQUErQnNHLGFBQWEsRUFBNUM7QUFDQSxVQUFJQyxtQkFBbUIsRUFBdkI7QUFBQSxVQUEyQnpHLGNBQWMsQ0FBekM7QUFDQSxXQUFLLElBQUlySCxJQUFJLENBQWIsRUFBZ0JBLElBQUlnRSxLQUFLMkQsUUFBTCxDQUFjOUksTUFBbEMsRUFBMENtQixHQUExQyxFQUErQztBQUM3QyxZQUFJZ0UsS0FBSzJELFFBQUwsQ0FBYzNILENBQWQsRUFBaUIsUUFBakIsS0FBOEJ2RixNQUFNc1QsbUJBQU4sQ0FBMEJsTixLQUE1RCxFQUFtRTtBQUNqRWdOLHVCQUFhLEVBQUMsVUFBVXhHLFdBQVgsRUFBd0IsV0FBV0EsV0FBbkMsRUFBYjtBQUNBd0cscUJBQVc3SixLQUFLTCxVQUFMLENBQWdCQyxXQUEzQixJQUEwQ0ksS0FBSzJELFFBQUwsQ0FBYzNILENBQWQsRUFBaUJnRSxLQUFLTCxVQUFMLENBQWdCQyxXQUFqQyxDQUExQztBQUNBaUsscUJBQVc3SixLQUFLTCxVQUFMLENBQWdCRSxVQUEzQixJQUF5Q0csS0FBSzJELFFBQUwsQ0FBYzNILENBQWQsRUFBaUJnRSxLQUFLTCxVQUFMLENBQWdCRSxVQUFqQyxDQUF6QztBQUNBaUssMkJBQWlCdFQsSUFBakIsQ0FBc0JxVCxVQUF0QjtBQUNBeEc7QUFDRDtBQUNGO0FBQ0RyRCxXQUFLMkQsUUFBTCxHQUFnQm1HLGdCQUFoQjtBQUNELEtBakJlO0FBa0JoQixtQkFBZSxxQkFBVXZHLE1BQVYsRUFBa0I5TSxLQUFsQixFQUF5QmtOLFFBQXpCLEVBQW1DaUcsWUFBbkMsRUFBaUQ7QUFDOUQsVUFBSTVKLE9BQU8sS0FBS0ssS0FBTCxDQUFXa0QsTUFBWCxDQUFYO0FBQUEsVUFBK0JzRyxhQUFhLEVBQTVDO0FBQ0EsVUFBSXhHLGNBQWNyRCxLQUFLMkQsUUFBTCxDQUFjOUksTUFBaEM7QUFDQSxVQUFJbVAsU0FBUyxJQUFiOztBQUVBSCxtQkFBYTtBQUNYLGtCQUFVeEcsV0FEQyxFQUNZLFdBQVdBO0FBRHZCLE9BQWI7QUFHQXdHLGlCQUFXN0osS0FBS0wsVUFBTCxDQUFnQkMsV0FBM0IsSUFBMENJLEtBQUt6SixPQUFMLENBQWFFLE1BQU00TSxXQUFOLENBQWtCeEcsS0FBL0IsRUFBc0NtRCxLQUFLTCxVQUFMLENBQWdCQyxXQUF0RCxDQUExQztBQUNBaUssaUJBQVc3SixLQUFLTCxVQUFMLENBQWdCRSxVQUEzQixJQUF5Q0csS0FBS3pKLE9BQUwsQ0FBYUUsTUFBTTRNLFdBQU4sQ0FBa0J4RyxLQUEvQixFQUFzQ21ELEtBQUtMLFVBQUwsQ0FBZ0JFLFVBQXRELENBQXpDOztBQUVBLFdBQUssSUFBSTdELElBQUksQ0FBYixFQUFnQkEsSUFBSWdFLEtBQUsyRCxRQUFMLENBQWM5SSxNQUFsQyxFQUEwQ21CLEdBQTFDLEVBQStDO0FBQzdDLFlBQUlnRSxLQUFLMkQsUUFBTCxDQUFjM0gsQ0FBZCxFQUFpQmdFLEtBQUtMLFVBQUwsQ0FBZ0JDLFdBQWpDLEtBQWlEaUssV0FBVzdKLEtBQUtMLFVBQUwsQ0FBZ0JDLFdBQTNCLENBQXJELEVBQThGO0FBQzVGb0ssbUJBQVMsS0FBVDtBQUNEO0FBQ0Y7QUFDRCxVQUFJQSxNQUFKLEVBQVloSyxLQUFLMkQsUUFBTCxDQUFjbk4sSUFBZCxDQUFtQnFULFVBQW5CO0FBQ2IsS0FuQ2U7QUFvQ2hCLFdBQU8sYUFBVXRHLE1BQVYsRUFBa0IwRyxNQUFsQixFQUEwQnRHLFFBQTFCLEVBQW9DaUcsWUFBcEMsRUFBa0Q7QUFDdkRLLGFBQU96UyxPQUFQLENBQWUsVUFBVWYsS0FBVixFQUFpQjtBQUM5QixZQUFJLGtCQUFFdVMsUUFBRixDQUFXdlMsS0FBWCxLQUFxQixrQkFBRXlULFFBQUYsQ0FBV3pULEtBQVgsQ0FBekIsRUFBNEM7QUFDMUNrVCxvQkFBVWpULElBQVYsQ0FBZWlDLElBQWYsQ0FBb0JtRyxJQUFwQixFQUEwQnlFLE1BQTFCLEVBQWtDOU0sS0FBbEMsRUFBeUNrTixRQUF6QyxFQUFtRCxjQUFuRDtBQUNELFNBRkQsTUFHSztBQUNILGVBQUssSUFBSXdHLEdBQVQsSUFBZ0JSLFNBQWhCLEVBQTJCO0FBQ3pCLGdCQUFJbFQsTUFBTTBULEdBQU4sQ0FBSixFQUFnQjtBQUNkUix3QkFBVVEsR0FBVixFQUFleFIsSUFBZixDQUFvQm1HLElBQXBCLEVBQTBCeUUsTUFBMUIsRUFBa0M5TSxLQUFsQyxFQUF5Q2tOLFFBQXpDLEVBQW1ELGNBQW5EO0FBQ0E7QUFDRDtBQUNGO0FBQ0Y7QUFDRixPQVpEO0FBYUQsS0FsRGU7QUFtRGhCLGFBQVMsZUFBVUosTUFBVixFQUFrQjlNLE9BQWxCLEVBQXlCa04sUUFBekIsRUFBbUNpRyxZQUFuQyxFQUFpRDtBQUN4RCxVQUFJNUosT0FBTyxLQUFLSyxLQUFMLENBQVdrRCxNQUFYLENBQVg7QUFDQSxVQUFJc0csVUFBSjtBQUNBLFVBQUl4RyxjQUFjLGtCQUFFdEcsTUFBRixDQUFTaUQsS0FBS3pKLE9BQWQsRUFBdUIsWUFBWTtBQUNuRCxlQUFPLEtBQUt5SixLQUFLTCxVQUFMLENBQWdCQyxXQUFyQixLQUFxQ25KLFFBQU1BLEtBQU4sQ0FBWXVKLEtBQUtMLFVBQUwsQ0FBZ0JDLFdBQTVCLENBQTVDO0FBQ0QsT0FGaUIsQ0FBbEI7O0FBSUEsVUFBSXlELGNBQWMsQ0FBQyxDQUFuQixFQUFzQjtBQUNwQnJELGFBQUt6SixPQUFMLENBQWE4TSxXQUFiLEVBQTBCckQsS0FBS0wsVUFBTCxDQUFnQkcsY0FBMUMsSUFDSXNKLFlBQVlwSixJQUFaLEVBQWtCQSxLQUFLekosT0FBTCxDQUFhOE0sV0FBYixFQUEwQnJELEtBQUtMLFVBQUwsQ0FBZ0JHLGNBQTFDLENBQWxCLEVBQTZFNkQsUUFBN0UsQ0FESjs7QUFHQSxZQUFJM0QsS0FBS3pKLE9BQUwsQ0FBYThNLFdBQWIsRUFBMEJyRCxLQUFLTCxVQUFMLENBQWdCRyxjQUExQyxDQUFKLEVBQStEO0FBQzdELGNBQUlzSyxXQUFXLElBQWY7QUFDQSxlQUFLLElBQUlwTyxJQUFJLENBQWIsRUFBZ0JBLElBQUlnRSxLQUFLMkQsUUFBTCxDQUFjOUksTUFBbEMsRUFBMENtQixHQUExQyxFQUErQztBQUM3QyxnQkFBSWdFLEtBQUsyRCxRQUFMLENBQWMzSCxDQUFkLEVBQWlCLEtBQUtxTyxNQUFMLENBQVkxSyxVQUFaLENBQXVCQyxXQUF4QyxLQUF3REksS0FBS3pKLE9BQUwsQ0FBYThNLFdBQWIsRUFBMEIsS0FBS2dILE1BQUwsQ0FBWTFLLFVBQVosQ0FBdUJDLFdBQWpELENBQTVELEVBQTJIO0FBQ3pId0sseUJBQVcsS0FBWDtBQUNBO0FBQ0Q7QUFDRjtBQUNELGNBQUlBLFFBQUosRUFBYztBQUNaUCx5QkFBYSxFQUFiO0FBQ0FBLHVCQUFXN0osS0FBS0wsVUFBTCxDQUFnQkMsV0FBM0IsSUFBMENJLEtBQUt6SixPQUFMLENBQWE4TSxXQUFiLEVBQTBCckQsS0FBS0wsVUFBTCxDQUFnQkMsV0FBMUMsQ0FBMUM7QUFDQWlLLHVCQUFXN0osS0FBS0wsVUFBTCxDQUFnQkUsVUFBM0IsSUFBeUNHLEtBQUt6SixPQUFMLENBQWE4TSxXQUFiLEVBQTBCckQsS0FBS0wsVUFBTCxDQUFnQkUsVUFBMUMsQ0FBekM7QUFDQUcsaUJBQUsyRCxRQUFMLENBQWNuTixJQUFkLENBQW1CcVQsVUFBbkI7QUFDRDtBQUNGLFNBZEQsTUFlSztBQUNILGNBQUlDLG1CQUFtQixFQUF2QjtBQUNBLGVBQUssSUFBSTlOLElBQUksQ0FBYixFQUFnQkEsSUFBSWdFLEtBQUsyRCxRQUFMLENBQWM5SSxNQUFsQyxFQUEwQ21CLEdBQTFDLEVBQStDO0FBQzdDLGdCQUFJZ0UsS0FBSzJELFFBQUwsQ0FBYzNILENBQWQsRUFBaUIsS0FBS3FPLE1BQUwsQ0FBWTFLLFVBQVosQ0FBdUJDLFdBQXhDLEtBQXdESSxLQUFLekosT0FBTCxDQUFhOE0sV0FBYixFQUEwQixLQUFLZ0gsTUFBTCxDQUFZMUssVUFBWixDQUF1QkMsV0FBakQsQ0FBNUQsRUFBMkgsQ0FFMUgsQ0FGRCxNQUdLO0FBQ0hpSywyQkFBYSxFQUFiO0FBQ0FBLHlCQUFXN0osS0FBS0wsVUFBTCxDQUFnQkMsV0FBM0IsSUFBMENJLEtBQUsyRCxRQUFMLENBQWMzSCxDQUFkLEVBQWlCZ0UsS0FBS0wsVUFBTCxDQUFnQkMsV0FBakMsQ0FBMUM7QUFDQWlLLHlCQUFXN0osS0FBS0wsVUFBTCxDQUFnQkUsVUFBM0IsSUFBeUNHLEtBQUsyRCxRQUFMLENBQWMzSCxDQUFkLEVBQWlCZ0UsS0FBS0wsVUFBTCxDQUFnQkUsVUFBakMsQ0FBekM7QUFDQWlLLCtCQUFpQnRULElBQWpCLENBQXNCcVQsVUFBdEI7QUFDRDtBQUNGO0FBQ0Q3SixlQUFLMkQsUUFBTCxHQUFnQm1HLGdCQUFoQjtBQUNEO0FBRUYsT0FuQ0QsTUFvQ0s7QUFDSDtBQUNBLFlBQUlNLFdBQVcsSUFBZjtBQUNBLGFBQUssSUFBSXBPLElBQUksQ0FBYixFQUFnQkEsSUFBSWdFLEtBQUsyRCxRQUFMLENBQWM5SSxNQUFsQyxFQUEwQ21CLEdBQTFDLEVBQStDO0FBQzdDLGNBQUlnRSxLQUFLMkQsUUFBTCxDQUFjM0gsQ0FBZCxFQUFpQixLQUFLcU8sTUFBTCxDQUFZMUssVUFBWixDQUF1QkMsV0FBeEMsS0FBd0RuSixRQUFNQSxLQUFOLENBQVksS0FBSzRULE1BQUwsQ0FBWTFLLFVBQVosQ0FBdUJDLFdBQW5DLENBQTVELEVBQTZHO0FBQzNHd0ssdUJBQVcsS0FBWDtBQUNBO0FBQ0Q7QUFDRjs7QUFFRCxZQUFJQSxRQUFKLEVBQWM7QUFDWlAsdUJBQWEsRUFBYjtBQUNBQSxxQkFBVzdKLEtBQUtMLFVBQUwsQ0FBZ0JDLFdBQTNCLElBQTBDbkosUUFBTUEsS0FBTixDQUFZLEtBQUs0VCxNQUFMLENBQVkxSyxVQUFaLENBQXVCQyxXQUFuQyxDQUExQztBQUNBaUsscUJBQVc3SixLQUFLTCxVQUFMLENBQWdCRSxVQUEzQixJQUF5Q3BKLFFBQU1BLEtBQU4sQ0FBWSxLQUFLNFQsTUFBTCxDQUFZMUssVUFBWixDQUF1QkUsVUFBbkMsQ0FBekM7QUFDQUcsZUFBSzJELFFBQUwsQ0FBY25OLElBQWQsQ0FBbUJxVCxVQUFuQjtBQUNEO0FBQ0Y7QUFDRixLQS9HZTtBQWdIaEIsWUFBUSxjQUFVdEcsTUFBVixFQUFrQjlNLEtBQWxCLEVBQXlCa04sUUFBekIsRUFBbUNpRyxZQUFuQyxFQUFpRDtBQUN2RCxVQUFJNUosT0FBTyxLQUFLSyxLQUFMLENBQVdrRCxNQUFYLENBQVg7QUFDQSxVQUFJc0csVUFBSjtBQUNBLFVBQUl4RyxjQUFjLGtCQUFFdEcsTUFBRixDQUFTaUQsS0FBS3pKLE9BQWQsRUFBdUIsWUFBWTtBQUNuRCxlQUFPLEtBQUt5SixLQUFLTCxVQUFMLENBQWdCRSxVQUFyQixLQUFvQ3BKLEtBQTNDO0FBQ0QsT0FGaUIsQ0FBbEI7O0FBSUEsVUFBSTRNLGNBQWMsQ0FBQyxDQUFuQixFQUFzQjtBQUNwQnJELGFBQUt6SixPQUFMLENBQWE4TSxXQUFiLEVBQTBCckQsS0FBS0wsVUFBTCxDQUFnQkcsY0FBMUMsSUFDSXNKLFlBQVlwSixJQUFaLEVBQWtCQSxLQUFLekosT0FBTCxDQUFhOE0sV0FBYixFQUEwQnJELEtBQUtMLFVBQUwsQ0FBZ0JHLGNBQTFDLENBQWxCLEVBQTZFNkQsUUFBN0UsQ0FESjs7QUFHQSxZQUFJM0QsS0FBS3pKLE9BQUwsQ0FBYThNLFdBQWIsRUFBMEJyRCxLQUFLTCxVQUFMLENBQWdCRyxjQUExQyxDQUFKLEVBQStEO0FBQzdELGNBQUlzSyxXQUFXLElBQWY7QUFDQSxlQUFLLElBQUlwTyxJQUFJLENBQWIsRUFBZ0JBLElBQUlnRSxLQUFLMkQsUUFBTCxDQUFjOUksTUFBbEMsRUFBMENtQixHQUExQyxFQUErQztBQUM3QyxnQkFBSWdFLEtBQUsyRCxRQUFMLENBQWMzSCxDQUFkLEVBQWlCLEtBQUtxTyxNQUFMLENBQVkxSyxVQUFaLENBQXVCRSxVQUF4QyxLQUF1REcsS0FBS3pKLE9BQUwsQ0FBYThNLFdBQWIsRUFBMEIsS0FBS2dILE1BQUwsQ0FBWTFLLFVBQVosQ0FBdUJFLFVBQWpELENBQTNELEVBQXlIO0FBQ3ZIdUsseUJBQVcsS0FBWDtBQUNBO0FBQ0Q7QUFDRjtBQUNELGNBQUlBLFFBQUosRUFBYztBQUNaUCx5QkFBYSxFQUFiO0FBQ0FBLHVCQUFXN0osS0FBS0wsVUFBTCxDQUFnQkMsV0FBM0IsSUFBMENJLEtBQUt6SixPQUFMLENBQWE4TSxXQUFiLEVBQTBCckQsS0FBS0wsVUFBTCxDQUFnQkMsV0FBMUMsQ0FBMUM7QUFDQWlLLHVCQUFXN0osS0FBS0wsVUFBTCxDQUFnQkUsVUFBM0IsSUFBeUNHLEtBQUt6SixPQUFMLENBQWE4TSxXQUFiLEVBQTBCckQsS0FBS0wsVUFBTCxDQUFnQkUsVUFBMUMsQ0FBekM7QUFDQUcsaUJBQUsyRCxRQUFMLENBQWNuTixJQUFkLENBQW1CcVQsVUFBbkI7QUFDRDtBQUNGLFNBZEQsTUFlSztBQUNILGNBQUlDLG1CQUFtQixFQUF2QjtBQUNBLGVBQUssSUFBSTlOLElBQUksQ0FBYixFQUFnQkEsSUFBSWdFLEtBQUsyRCxRQUFMLENBQWM5SSxNQUFsQyxFQUEwQ21CLEdBQTFDLEVBQStDO0FBQzdDLGdCQUFJZ0UsS0FBSzJELFFBQUwsQ0FBYzNILENBQWQsRUFBaUIsS0FBS3FPLE1BQUwsQ0FBWTFLLFVBQVosQ0FBdUJFLFVBQXhDLEtBQXVERyxLQUFLekosT0FBTCxDQUFhOE0sV0FBYixFQUEwQixLQUFLZ0gsTUFBTCxDQUFZMUssVUFBWixDQUF1QkUsVUFBakQsQ0FBM0QsRUFBeUgsQ0FFeEgsQ0FGRCxNQUdLO0FBQ0hnSywyQkFBYSxFQUFiO0FBQ0FBLHlCQUFXN0osS0FBS0wsVUFBTCxDQUFnQkMsV0FBM0IsSUFBMENJLEtBQUsyRCxRQUFMLENBQWMzSCxDQUFkLEVBQWlCZ0UsS0FBS0wsVUFBTCxDQUFnQkMsV0FBakMsQ0FBMUM7QUFDQWlLLHlCQUFXN0osS0FBS0wsVUFBTCxDQUFnQkUsVUFBM0IsSUFBeUNHLEtBQUsyRCxRQUFMLENBQWMzSCxDQUFkLEVBQWlCZ0UsS0FBS0wsVUFBTCxDQUFnQkUsVUFBakMsQ0FBekM7QUFDQWlLLCtCQUFpQnRULElBQWpCLENBQXNCcVQsVUFBdEI7QUFDRDtBQUNGO0FBQ0Q3SixlQUFLMkQsUUFBTCxHQUFnQm1HLGdCQUFoQjtBQUNEO0FBQ0YsT0FsQ0QsTUFtQ0s7QUFDSDtBQUNBLFlBQUlNLFdBQVcsSUFBZjtBQUNBLGFBQUssSUFBSXBPLElBQUksQ0FBYixFQUFnQkEsSUFBSWdFLEtBQUsyRCxRQUFMLENBQWM5SSxNQUFsQyxFQUEwQ21CLEdBQTFDLEVBQStDO0FBQzdDLGNBQUlnRSxLQUFLMkQsUUFBTCxDQUFjM0gsQ0FBZCxFQUFpQixLQUFLcU8sTUFBTCxDQUFZMUssVUFBWixDQUF1QkUsVUFBeEMsS0FBdURwSixLQUEzRCxFQUFrRTtBQUNoRTJULHVCQUFXLEtBQVg7QUFDQTtBQUNEO0FBQ0Y7O0FBRUQsWUFBSUEsUUFBSixFQUFjO0FBQ1pQLHVCQUFhLEVBQWI7QUFDQUEscUJBQVc3SixLQUFLTCxVQUFMLENBQWdCQyxXQUEzQixJQUEwQ25KLEtBQTFDO0FBQ0FvVCxxQkFBVzdKLEtBQUtMLFVBQUwsQ0FBZ0JFLFVBQTNCLElBQXlDcEosS0FBekM7QUFDQXVKLGVBQUsyRCxRQUFMLENBQWNuTixJQUFkLENBQW1CcVQsVUFBbkI7QUFDRDtBQUNGO0FBQ0YsS0EzS2U7QUE0S2hCLGFBQVMsZUFBVXRHLE1BQVYsRUFBa0I7QUFDekJnRyxvQkFBYzVRLElBQWQsQ0FBbUIsSUFBbkIsRUFBeUI0SyxNQUF6QjtBQUNBcUMsaUJBQVdqTixJQUFYLENBQWdCLElBQWhCLEVBQXNCNEssTUFBdEI7O0FBRUEsVUFBSSxLQUFLN0IsNkJBQVQsRUFBd0M7QUFDdEMsYUFBS0EsNkJBQUwsQ0FDR1YsSUFESCxDQUNRLHFCQURSLEVBRUdzSCxJQUZILENBRVEsc0JBRlIsRUFFZ0MsT0FGaEM7QUFHRDtBQUNELFdBQUtqSSxLQUFMLENBQVdrRCxNQUFYLEVBQW1COEMsbUJBQW5CLEdBQXlDLENBQUMsQ0FBMUM7QUFDRDtBQXRMZSxHQUFsQjs7QUF5TEEsTUFBSTlDLFNBQVUsa0JBQUUyRyxRQUFGLENBQVduQixPQUFYLENBQUQsR0FBd0JBLE9BQXhCLEdBQWtDRCxVQUFVblEsSUFBVixDQUFlLElBQWYsRUFBcUJvUSxPQUFyQixDQUEvQztBQUNBLE1BQUl4RixXQUFXLENBQUMsQ0FBaEIsRUFBbUI7QUFDakIwRixZQUFRQyxHQUFSLENBQVksa0JBQUtDLFFBQUwsQ0FBYyxvQkFBZCxFQUFvQyxLQUFwQyxFQUEyQyxLQUEzQyxDQUFaO0FBQ0E7QUFDRDs7QUFFRCxNQUFJLE9BQU8xUyxLQUFQLElBQWdCLFdBQXBCLEVBQWlDO0FBQy9CLFVBQU0sdUJBQU47QUFDRCxHQUZELE1BR0ssSUFBSSxrQkFBRThCLE9BQUYsQ0FBVTlCLEtBQVYsQ0FBSixFQUFzQjtBQUN6QmtULGNBQVVwQyxLQUFWLENBQWdCNU8sSUFBaEIsQ0FBcUIsSUFBckIsRUFBMkI0SyxNQUEzQjtBQUNBb0csY0FBVVcsR0FBVixDQUFjM1IsSUFBZCxDQUFtQixJQUFuQixFQUF5QjRLLE1BQXpCLEVBQWtDLEtBQUtsRCxLQUFMLENBQVdrRCxNQUFYLEVBQW1CdEMsUUFBbkIsSUFBK0J4SyxNQUFNb0UsTUFBTixJQUFnQixDQUFoRCxHQUFxRHBFLEtBQXJELEdBQTZELENBQUNBLE1BQU1BLE1BQU1vRSxNQUFOLEdBQWUsQ0FBckIsQ0FBRCxDQUE5RixFQUF5SDhJLFFBQXpIO0FBQ0QsR0FISSxNQUlBLElBQUksa0JBQUVxRixRQUFGLENBQVd2UyxLQUFYLEtBQXFCLGtCQUFFeVQsUUFBRixDQUFXelQsS0FBWCxDQUF6QixFQUE0QztBQUMvQyxRQUFJLE9BQU9BLEtBQVAsS0FBaUIsV0FBakIsSUFBZ0NBLFVBQVUsSUFBMUMsSUFBa0QsQ0FBQyxLQUFLNEosS0FBTCxDQUFXa0QsTUFBWCxFQUFtQnRDLFFBQTFFLEVBQW9GO0FBQ2xGc0ksb0JBQWM1USxJQUFkLENBQW1CLElBQW5CLEVBQXlCNEssTUFBekI7QUFDRDtBQUNEb0csY0FBVWpULElBQVYsQ0FBZWlDLElBQWYsQ0FBb0IsSUFBcEIsRUFBMEI0SyxNQUExQixFQUFrQzlNLEtBQWxDLEVBQXlDa04sUUFBekM7QUFDRCxHQUxJLE1BTUE7QUFDSCxRQUFJbE4sVUFBVSxJQUFkLEVBQW9CO0FBQ2xCa1QsZ0JBQVVwQyxLQUFWLENBQWdCNU8sSUFBaEIsQ0FBcUIsSUFBckIsRUFBMkI0SyxNQUEzQjtBQUNELEtBRkQsTUFHSztBQUNILFVBQUksQ0FBQyxLQUFLbEQsS0FBTCxDQUFXa0QsTUFBWCxFQUFtQnRDLFFBQXhCLEVBQWtDO0FBQ2hDc0ksc0JBQWM1USxJQUFkLENBQW1CLElBQW5CLEVBQXlCNEssTUFBekI7QUFDRDtBQUNELFdBQUssSUFBSTRHLEdBQVQsSUFBZ0JSLFNBQWhCLEVBQTJCO0FBQ3pCLFlBQUlsVCxNQUFNMFQsR0FBTixDQUFKLEVBQWdCO0FBQ2RSLG9CQUFVUSxHQUFWLEVBQWV4UixJQUFmLENBQW9CLElBQXBCLEVBQTBCNEssTUFBMUIsRUFBa0M5TSxLQUFsQyxFQUF5Q2tOLFFBQXpDO0FBQ0E7QUFDRDtBQUNGO0FBQ0Y7QUFDRjs7QUFFREcsWUFBVW5MLElBQVYsQ0FBZSxJQUFmLEVBQXFCNEssTUFBckI7QUFDQVcsYUFBV3ZMLElBQVgsQ0FBZ0IsSUFBaEIsRUFBc0I0SyxNQUF0QjtBQUNBZ0IsYUFBVzVMLElBQVgsQ0FBZ0IsSUFBaEIsRUFBc0I0SyxNQUF0QjtBQUNBL0IsK0JBQTZCN0ksSUFBN0IsQ0FBa0MsSUFBbEM7O0FBRUEsTUFBSSxPQUFPbEMsS0FBUCxLQUFpQixXQUFyQixFQUFrQztBQUNoQyxRQUFJaVQsV0FBVyxDQUFDQSxRQUFRYSxhQUF4QixFQUF1QztBQUNyQ3hLLHFCQUFlcEgsSUFBZixDQUFvQixJQUFwQixFQUEwQixLQUFLMEgsS0FBTCxDQUFXa0QsTUFBWCxDQUExQixFQUE4QztBQUM1Q3pFLGNBQU0sSUFEc0M7QUFFNUNrQixjQUFNLEtBQUtLLEtBQUwsQ0FBV2tELE1BQVgsQ0FGc0M7QUFHNUNyRCxlQUFPLGFBSHFDO0FBSTVDekosZUFBTyxLQUFLNEosS0FBTCxDQUFXa0QsTUFBWCxFQUFtQkk7QUFKa0IsT0FBOUM7QUFNRDtBQUNGOztBQUVEb0YsWUFBVSxJQUFWO0FBQ0EsU0FBTyxJQUFQO0FBQ0QsQ0FoUEQ7O0FBa1BBOztBQUVBOzs7O0lBR015QixpQjs7O0FBQ0o7Ozs7QUFJQSw2QkFBWUgsTUFBWixFQUFvQjtBQUFBOztBQUdsQjs7Ozs7Ozs7Ozs7Ozs7O0FBSGtCOztBQWtCbEIsV0FBS0EsTUFBTCxHQUFjO0FBQ1o1RyxhQUFPLFNBREs7QUFFWmdILG1CQUFhLEdBRkQ7QUFHWjFULGNBQVEsRUFISTtBQUlaQyx3QkFBa0IsRUFKTjtBQUtaMFQsbUJBQWEsQ0FMRDtBQU1aOVQsa0JBQVksUUFOQTtBQU9aOE0sWUFBTTtBQUNKaUgsb0JBQVksRUFEUjtBQUVKQyxtQkFBVyxZQUZQO0FBR0pDLGlCQUFTO0FBSEwsT0FQTTtBQVlabEwsa0JBQVk7QUFDVkMscUJBQWEsT0FESDtBQUVWQyxvQkFBWSxNQUZGO0FBR1ZDLHdCQUFnQjtBQUhOO0FBWkEsS0FBZDtBQWtCQSxvQkFBT2dMLE1BQVAsQ0FBYyxJQUFkLEVBQW9CLE9BQUtULE1BQXpCLEVBQWlDQSxNQUFqQzs7QUFFQTtBQUNBOzs7O0FBSUEsV0FBS2hLLEtBQUwsR0FBYSxFQUFiO0FBQ0E7OztBQUdBLFdBQUtxQiw2QkFBTCxHQUFxQyxJQUFyQztBQUNBOzs7QUFHQSxXQUFLQyw0QkFBTCxHQUFvQyxDQUFDLENBQXJDO0FBQ0E7OztBQUdBLFdBQUtvSixTQUFMLEdBQWlCLElBQWpCO0FBQ0E7OztBQUdBLFdBQUtDLFVBQUwsR0FBa0IsSUFBbEI7QUFDQTs7O0FBR0EsV0FBS0MsbUJBQUwsR0FBMkIsSUFBM0I7QUFDQTs7O0FBR0EsV0FBS0MsVUFBTCxHQUFrQixJQUFsQjtBQUNBOzs7QUFHQSxXQUFLQyxJQUFMLEdBQVksRUFBWjs7QUFFQSxXQUFLQyxJQUFMO0FBekVrQjtBQTBFbkI7O0FBRUQ7Ozs7Ozs7OzJCQUlPO0FBQ0wsV0FBS3JMLGNBQUwsR0FBc0IsS0FBS3NLLE1BQUwsQ0FBWXRLLGNBQWxDO0FBQ0EsYUFBTyxLQUFLc0ssTUFBTCxDQUFZdEssY0FBbkI7QUFDQSxXQUFLSSxRQUFMLEdBQWdCLEtBQUtrSyxNQUFMLENBQVlsSyxRQUE1QjtBQUNBLGFBQU8sS0FBS2tLLE1BQUwsQ0FBWWxLLFFBQW5COztBQUVBO0FBQ0EsV0FBS2tMLFFBQUw7QUFDRDs7QUFFRDs7Ozs7OytCQUdXO0FBQ1QsVUFBSSxLQUFLQyxXQUFULEVBQXNCLE9BQU8sSUFBUDtBQUN0QixXQUFLQSxXQUFMLEdBQW1CLElBQW5COztBQUVBO0FBQ0EsMkJBQU9qSixNQUFQLEVBQWVvRyxFQUFmLENBQWtCLHVDQUF1QyxLQUFLUCxVQUE5RCxFQUEwRSxrQkFBRXFELFFBQUYsQ0FBVyxVQUFVMUksQ0FBVixFQUFhO0FBQ2hHekMsaUNBQXlCekgsSUFBekIsQ0FBOEIsSUFBOUIsRUFBb0NrSyxLQUFLUixPQUFPbUosS0FBaEQ7QUFDQWhLLHFDQUE2QjdJLElBQTdCLENBQWtDLElBQWxDO0FBQ0QsT0FIeUUsRUFHdkUsR0FIdUUsRUFHbEU5QixJQUhrRSxDQUc3RCxJQUg2RCxDQUExRTtBQUlEOztBQUVEOzs7Ozs7Ozs7Ozs7O3lCQVVLbUosSSxFQUFNO0FBQ1QsVUFBSXVELGVBQUo7QUFDQXZELGFBQU8sZ0JBQU84SyxNQUFQLENBQWMsSUFBZCxFQUFvQixFQUFwQixFQUF3QixLQUFLVCxNQUE3QixFQUFxQ3JLLElBQXJDLENBQVA7O0FBRUEsVUFBSSxDQUFDQSxLQUFLbEosTUFBVixFQUFrQjtBQUNoQm1TLGdCQUFRQyxHQUFSLENBQVksa0JBQUtDLFFBQUwsQ0FBYyxvQkFBZCxFQUFvQyxLQUFwQyxFQUEyQyxNQUEzQyxDQUFaO0FBQ0EsZUFBTyxJQUFQO0FBQ0Q7QUFDRG5KLFdBQUttQixPQUFMLEdBQWUscUJBQU9uQixLQUFLbEosTUFBWixDQUFmOztBQUVBLFVBQUksQ0FBQ2tKLEtBQUtvRCxFQUFWLEVBQWNwRCxLQUFLb0QsRUFBTCxHQUFVcEQsS0FBS21CLE9BQUwsQ0FBYXFDLElBQWIsQ0FBa0IsNEJBQWxCLENBQVY7QUFDZCxVQUFJLENBQUN4RCxLQUFLb0QsRUFBVixFQUFjO0FBQ1pwRCxhQUFLb0QsRUFBTCxHQUFVLHdCQUF3QixvQkFBVXFJLGFBQVYsRUFBbEM7QUFDQXpMLGFBQUttQixPQUFMLENBQWFxQyxJQUFiLENBQWtCLDRCQUFsQixFQUFnRHhELEtBQUtvRCxFQUFyRDtBQUNEO0FBQ0RwRCxXQUFLeEMsSUFBTCxHQUFZd0MsS0FBS21CLE9BQUwsQ0FBYW1ILElBQWIsQ0FBa0IseUJBQWxCLENBQVo7O0FBRUF0SSxXQUFLekosT0FBTCxHQUFlLEVBQWY7QUFDQXlKLFdBQUsyRCxRQUFMLEdBQWdCLEVBQWhCOztBQUVBO0FBQ0EsT0FBQyxVQUFVSCxJQUFWLEVBQWdCO0FBQ2YsWUFBSSxrQkFBRWtJLFFBQUYsQ0FBV2xJLElBQVgsS0FBb0IsQ0FBQ0EsS0FBS21JLEtBQTlCLEVBQXFDO0FBQ25DM0wsaUJBQU8sZ0JBQU84SyxNQUFQLENBQWMsSUFBZCxFQUFvQjlLLElBQXBCLEVBQTBCd0QsSUFBMUIsQ0FBUDtBQUNEO0FBQ0YsT0FKRCxFQUlHLGtCQUFFb0ksU0FBRixDQUFZNUwsS0FBS21CLE9BQUwsQ0FBYW1ILElBQWIsQ0FBa0IsZ0NBQWxCLENBQVosRUFBaUUsSUFBakUsQ0FKSDs7QUFNQS9FLGVBQVMsa0JBQUV4RyxNQUFGLENBQVMsS0FBS3NELEtBQWQsRUFBcUIsWUFBWTtBQUN4QyxlQUFPLEtBQUsrQyxFQUFMLElBQVdwRCxLQUFLb0QsRUFBdkI7QUFDRCxPQUZRLENBQVQ7O0FBSUEsVUFBSUcsV0FBVyxDQUFDLENBQWhCLEVBQW1CO0FBQ2pCLGFBQUtsRCxLQUFMLENBQVc3SixJQUFYLENBQWdCd0osSUFBaEI7QUFDQWdILCtCQUF1QnJPLElBQXZCLENBQTRCLElBQTVCLEVBQWtDLEtBQUswSCxLQUFMLENBQVd4RixNQUFYLEdBQW9CLENBQXREO0FBQ0QsT0FIRCxNQUlLO0FBQ0gsYUFBS3dGLEtBQUwsQ0FBV2tELE1BQVgsRUFBbUJJLFFBQW5CLEdBQThCLEVBQTlCO0FBQ0EsYUFBS3RELEtBQUwsQ0FBV2tELE1BQVgsRUFBbUJoTixPQUFuQixHQUE2QnlKLEtBQUt6SixPQUFsQztBQUNBLGFBQUs4SixLQUFMLENBQVdrRCxNQUFYLElBQXFCLGdCQUFPdUgsTUFBUCxDQUFjLElBQWQsRUFBb0IsRUFBcEIsRUFBd0IsS0FBS3pLLEtBQUwsQ0FBV2tELE1BQVgsQ0FBeEIsRUFBNEN2RCxJQUE1QyxDQUFyQjtBQUNBZ0gsK0JBQXVCck8sSUFBdkIsQ0FBNEIsSUFBNUIsRUFBa0M0SyxNQUFsQztBQUNEOztBQUVEQSxlQUFTLElBQVQ7QUFDQSxhQUFPLElBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozt5QkFPS3dGLE8sRUFBUzhDLFEsRUFBVTtBQUN0QixXQUFLWixtQkFBTCxHQUEyQixJQUEzQjs7QUFFQTs7O0FBR0EsVUFBSTFILFNBQVUsa0JBQUUyRyxRQUFGLENBQVduQixPQUFYLENBQUQsR0FBd0JBLE9BQXhCLEdBQWtDRCxVQUFVblEsSUFBVixDQUFlLElBQWYsRUFBcUJvUSxPQUFyQixDQUEvQztBQUFBLFVBQ0UvSSxPQUFPLEtBQUtLLEtBQUwsQ0FBV2tELE1BQVgsQ0FEVDtBQUFBLFVBRUVDLE9BQU8sRUFGVDtBQUFBLFVBR0VzSSxpQkFIRjtBQUFBLFVBSUVDLHlCQUpGOztBQU1BLFVBQUkvTCxLQUFLTyxRQUFMLENBQWMrSCxJQUFkLENBQW1CLFVBQW5CLENBQUosRUFBb0MsT0FBTyxJQUFQOztBQUVwQyxVQUFJLEtBQUt5QyxTQUFULEVBQW9CaUIsYUFBYSxLQUFLakIsU0FBbEI7QUFDcEIsVUFBSSxLQUFLckosNkJBQVQsRUFBd0M7QUFDdEMsWUFBSSxLQUFLQyw0QkFBTCxJQUFxQzRCLE1BQXpDLEVBQWlEO0FBQy9DLGlCQUFPLElBQVA7QUFDRDs7QUFFRCxZQUFJc0ksV0FBVyxDQUFmLEVBQWtCLE9BQU8sSUFBUDtBQUNsQixhQUFLM0ksS0FBTDtBQUNBLGFBQUs2SCxTQUFMLEdBQWlCM1QsV0FBWSxZQUFZO0FBQ3ZDLGVBQUt5USxJQUFMLENBQVV0RSxNQUFWLEVBQWtCLENBQUNzSSxZQUFZLENBQWIsSUFBa0IsQ0FBcEM7QUFDRCxTQUYyQixDQUV6QmhWLElBRnlCLENBRXBCLElBRm9CLENBQVgsRUFFRixLQUFLd1QsTUFBTCxDQUFZSSxXQUZWLENBQWpCOztBQUlBLGVBQU8sSUFBUDtBQUNEOztBQUVEekssV0FBSytGLGdCQUFMLEdBQXdCLENBQUMsQ0FBekIsQ0E3QnNCLENBNkJNO0FBQzVCLFVBQUkvRixLQUFLMkQsUUFBTCxJQUFpQjNELEtBQUsyRCxRQUFMLENBQWM5SSxNQUFkLEdBQXVCLENBQTVDLEVBQStDO0FBQzdDbUYsYUFBS3FHLG1CQUFMLEdBQTJCckcsS0FBSzJELFFBQUwsQ0FBYyxDQUFkLEVBQWlCLFNBQWpCLENBQTNCO0FBQ0Q7O0FBRUQ7QUFDQUgsV0FBS0osRUFBTCxHQUFVcEQsS0FBS29ELEVBQWY7QUFDQUksV0FBS0MsS0FBTCxHQUFhekQsS0FBS3lELEtBQWxCO0FBQ0FELFdBQUt2QyxRQUFMLEdBQWdCakIsS0FBS2lCLFFBQXJCOztBQUVBdUMsV0FBS0UsSUFBTCxHQUFZMUQsS0FBSzBELElBQWpCO0FBQ0ExRCxXQUFLTyxRQUFMLENBQWMrSCxJQUFkLENBQW1CLHVDQUFuQixFQUE0RCxNQUE1RDs7QUFFQTlFLFdBQUtzQixXQUFMLEdBQW1CLElBQW5CLENBMUNzQixDQTBDRztBQUN6QnRCLFdBQUtqTixPQUFMLEdBQWUsRUFBZjs7QUFFQSxXQUFLbUwsNkJBQUwsR0FBcUMscUJBQU8sc0JBQVN6RCxNQUFULENBQWdCeUIsS0FBS3VNLFdBQUwsQ0FBaUJ0VCxJQUFqQixDQUFzQixJQUF0QixFQUE0QnFILEtBQUtMLFVBQWpDLENBQWhCLEVBQThENkQsSUFBOUQsQ0FBUCxDQUFyQztBQUNBLFdBQUs5Qiw2QkFBTCxDQUFtQ1YsSUFBbkMsQ0FBd0Msc0JBQXhDLEVBQWdFN0ssSUFBaEUsQ0FBcUUsc0JBQVM4SCxNQUFULENBQWdCeUIsS0FBS25KLE9BQUwsQ0FBYW9DLElBQWIsQ0FBa0IsSUFBbEIsRUFBd0JxSCxLQUFLTCxVQUE3QixDQUFoQixFQUEwRDZELElBQTFELENBQXJFO0FBQ0EsV0FBSzdCLDRCQUFMLEdBQW9DNEIsTUFBcEM7O0FBRUEvQixtQ0FBNkI3SSxJQUE3QixDQUFrQyxJQUFsQyxFQUF3QyxRQUF4QyxFQWpEc0IsQ0FpRDZCOztBQUVuRCxVQUFJcUgsS0FBSzJELFFBQUwsSUFBaUIzRCxLQUFLMkQsUUFBTCxDQUFjOUksTUFBZCxHQUF1QixDQUE1QyxFQUErQztBQUM3Q2tSLDJCQUFtQixLQUFLckssNkJBQUwsQ0FBbUNWLElBQW5DLENBQXdDLHlCQUF5QmhCLEtBQUsyRCxRQUFMLENBQWMsQ0FBZCxFQUFpQixRQUFqQixDQUF6QixHQUFzRCxJQUE5RixDQUFuQjtBQUNBLFlBQUlvSSxpQkFBaUI5SSxHQUFqQixDQUFxQixDQUFyQixDQUFKLEVBQTZCO0FBQzNCNkkscUJBQVdDLGlCQUFpQmhGLFFBQWpCLEdBQTRCdkUsR0FBNUIsR0FBa0MsS0FBS2QsNkJBQUwsQ0FBbUMzSyxNQUFuQyxLQUE4QyxDQUEzRjtBQUNBLGVBQUsySyw2QkFBTCxDQUFtQ1YsSUFBbkMsQ0FBd0Msc0JBQXhDLEVBQWdFNkYsU0FBaEUsQ0FBMEVpRixRQUExRTtBQUNEO0FBQ0Y7O0FBRUQsMkJBQU96SixNQUFQLEVBQWVvRyxFQUFmLENBQWtCLDhCQUE4QixLQUFLUCxVQUFyRCxFQUFrRSxVQUFVckYsQ0FBVixFQUFhO0FBQzdFQSxZQUFJQSxLQUFLUixPQUFPbUosS0FBaEI7QUFDQTVJLG9CQUFZakssSUFBWixDQUFpQixJQUFqQixFQUF1QmtLLENBQXZCO0FBQ0EsMEJBQUV5RSxTQUFGLENBQVl6RSxDQUFaO0FBQ0QsT0FKZ0UsQ0FJOURoTSxJQUo4RCxDQUl6RCxJQUp5RCxDQUFqRTs7QUFNQWtKLHFCQUFlcEgsSUFBZixDQUFvQixJQUFwQixFQUEwQnFILElBQTFCLEVBQWdDO0FBQzlCbEIsY0FBTSxJQUR3QjtBQUU5Qm9CLGVBQU8sTUFGdUI7QUFHOUJGLGNBQU1BO0FBSHdCLE9BQWhDOztBQU1Bd0QsYUFBTyxJQUFQO0FBQ0FzSSxpQkFBVyxJQUFYO0FBQ0FDLHlCQUFtQixJQUFuQjtBQUNBLGFBQU8sSUFBUDtBQUNEOztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7NkJBWVNHLFEsRUFBVUMsTSxFQUFRO0FBQ3pCLFVBQUk1SSxTQUFVLGtCQUFFMkcsUUFBRixDQUFXZ0MsUUFBWCxDQUFELEdBQXlCQSxRQUF6QixHQUFvQ3BELFVBQVVuUSxJQUFWLENBQWUsSUFBZixFQUFxQnVULFFBQXJCLENBQWpEO0FBQ0EsVUFBSTNJLFdBQVcsQ0FBQyxDQUFoQixFQUFtQjtBQUNqQjBGLGdCQUFRQyxHQUFSLENBQVksa0JBQUtDLFFBQUwsQ0FBYyxvQkFBZCxFQUFvQyxLQUFwQyxFQUEyQyxLQUEzQyxDQUFaO0FBQ0E7QUFDRDs7QUFFREksb0JBQWM1USxJQUFkLENBQW1CLElBQW5CLEVBQXlCNEssTUFBekI7O0FBRUEsVUFBSSxrQkFBRWhMLE9BQUYsQ0FBVTRULE1BQVYsQ0FBSixFQUF1QjtBQUNyQixZQUFJQyxVQUFVLGtCQUFFQyxHQUFGLENBQU1GLE1BQU4sRUFBYyxZQUFZO0FBQ3RDLGlCQUFPLEVBQUMxVixPQUFPLElBQVIsRUFBUDtBQUNELFNBRmEsQ0FBZDtBQUdBME0sb0JBQVl4SyxJQUFaLENBQWlCLElBQWpCLEVBQXVCNEssTUFBdkIsRUFBK0I2SSxPQUEvQixFQUF3QyxJQUF4QyxFQUE4QyxFQUFDN0IsZUFBZSxJQUFoQixFQUE5QztBQUNELE9BTEQsTUFNSyxJQUFJLGtCQUFFbUIsUUFBRixDQUFXUyxNQUFYLENBQUosRUFBd0I7QUFDM0JoSixvQkFBWXhLLElBQVosQ0FBaUIsSUFBakIsRUFBdUI0SyxNQUF2QixFQUErQixFQUFDOU0sT0FBTzBWLE1BQVIsRUFBL0IsRUFBZ0QsSUFBaEQsRUFBc0QsRUFBQzVCLGVBQWUsSUFBaEIsRUFBdEQ7QUFDRCxPQUZJLE1BRUU7QUFDTHJHLG1CQUFXdkwsSUFBWCxDQUFnQixJQUFoQixFQUFzQjRLLE1BQXRCO0FBQ0Q7O0FBRURzQixnQkFBVWxNLElBQVYsQ0FBZSxJQUFmLEVBQXFCNEssTUFBckI7QUFDQW5ELCtCQUF5QnpILElBQXpCLENBQThCLElBQTlCOztBQUVBLGFBQU8sSUFBUDtBQUNEOztBQUVEOzs7Ozs7Ozs7Ozs7Ozs0QkFXUXVULFEsRUFBVUksSyxFQUFPO0FBQ3ZCLFVBQUkvSSxTQUFVLGtCQUFFMkcsUUFBRixDQUFXZ0MsUUFBWCxDQUFELEdBQXlCQSxRQUF6QixHQUFvQ3BELFVBQVVuUSxJQUFWLENBQWUsSUFBZixFQUFxQnVULFFBQXJCLENBQWpEO0FBQ0EsVUFBSTNJLFdBQVcsQ0FBQyxDQUFoQixFQUFtQjtBQUNqQjBGLGdCQUFRQyxHQUFSLENBQVksa0JBQUtDLFFBQUwsQ0FBYyxvQkFBZCxFQUFvQyxLQUFwQyxFQUEyQyxLQUEzQyxDQUFaO0FBQ0E7QUFDRDs7QUFFRCxXQUFLOUksS0FBTCxDQUFXa0QsTUFBWCxFQUFtQkksUUFBbkIsR0FBOEIsRUFBOUI7QUFDQTRGLG9CQUFjNVEsSUFBZCxDQUFtQixJQUFuQixFQUF5QjRLLE1BQXpCO0FBQ0FKLGtCQUFZeEssSUFBWixDQUFpQixJQUFqQixFQUF1QjRLLE1BQXZCLEVBQStCK0ksS0FBL0IsRUFBc0MsSUFBdEMsRUFBNEMsRUFBQy9CLGVBQWUsSUFBaEIsRUFBNUM7QUFDQTFGLGdCQUFVbE0sSUFBVixDQUFlLElBQWYsRUFBcUI0SyxNQUFyQjtBQUNBbkQsK0JBQXlCekgsSUFBekIsQ0FBOEIsSUFBOUI7O0FBRUEsYUFBTyxJQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7O3NDQUtrQnVULFEsRUFBVTtBQUMxQixVQUFJM0ksU0FBVSxrQkFBRTJHLFFBQUYsQ0FBV2dDLFFBQVgsQ0FBRCxHQUF5QkEsUUFBekIsR0FBb0NwRCxVQUFVblEsSUFBVixDQUFlLElBQWYsRUFBcUJ1VCxRQUFyQixDQUFqRDtBQUNBLFVBQUkzSSxXQUFXLENBQUMsQ0FBaEIsRUFBbUI7QUFDakIwRixnQkFBUUMsR0FBUixDQUFZLGtCQUFLQyxRQUFMLENBQWMsb0JBQWQsRUFBb0MsS0FBcEMsRUFBMkMsS0FBM0MsQ0FBWjtBQUNBO0FBQ0Q7QUFDRCxhQUFPLGtCQUFFb0QsUUFBRixDQUFXLEtBQUtsTSxLQUFMLENBQVdrRCxNQUFYLEVBQW1CSSxRQUE5QixDQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7MEJBSU0zRCxJLEVBQU07QUFDVixVQUFJLEtBQUtnTCxVQUFULEVBQXFCZ0IsYUFBYSxLQUFLaEIsVUFBbEI7QUFDckIsVUFBSSxDQUFDLEtBQUt0Siw2QkFBVixFQUF5QyxPQUFPLElBQVA7O0FBRXpDMUIsYUFBTyxLQUFLSyxLQUFMLENBQVcsS0FBS3NCLDRCQUFoQixDQUFQO0FBQ0EzQixXQUFLK0YsZ0JBQUwsR0FBd0IsQ0FBQyxDQUF6QjtBQUNBL0YsV0FBS08sUUFBTCxDQUFjdUYsVUFBZCxDQUF5Qix1Q0FBekIsRUFBa0VyQixPQUFsRSxDQUEwRSxPQUExRTs7QUFFQSxXQUFLL0MsNkJBQUwsQ0FBbUNlLFFBQW5DLENBQTRDLFNBQTVDOztBQUVBLDJCQUFPSixNQUFQLEVBQ0d6SyxHQURILENBQ08sK0JBQStCLEtBQUtzUSxVQUQzQyxFQUVHdFEsR0FGSCxDQUVPLDhCQUE4QixLQUFLc1EsVUFGMUMsRUFHR3RRLEdBSEgsQ0FHTyw4QkFBOEIsS0FBS3NRLFVBSDFDOztBQUtBLFdBQUs4QyxVQUFMLEdBQWtCNVQsV0FBWSxZQUFZO0FBQ3hDLFlBQUksS0FBS3NLLDZCQUFULEVBQXdDLEtBQUtBLDZCQUFMLENBQW1DMEMsTUFBbkM7QUFDeEMsYUFBSzFDLDZCQUFMLEdBQXFDLElBQXJDO0FBQ0EsYUFBS0MsNEJBQUwsR0FBb0MsQ0FBQyxDQUFyQzs7QUFFQTVCLHVCQUFlcEgsSUFBZixDQUFvQixJQUFwQixFQUEwQnFILElBQTFCLEVBQWdDO0FBQzlCbEIsZ0JBQU0sSUFEd0I7QUFFOUJvQixpQkFBTztBQUZ1QixTQUFoQztBQUtELE9BVjRCLENBVTFCckosSUFWMEIsQ0FVckIsSUFWcUIsQ0FBWCxFQVVILEtBQUt3VCxNQUFMLENBQVlJLFdBVlQsQ0FBbEI7QUFXQSxXQUFLUSxtQkFBTCxHQUEyQixJQUEzQjtBQUNBLGFBQU8sSUFBUDtBQUNEOztBQUVEOzs7Ozs7Ozt5QkFLS2lCLFEsRUFBVTtBQUNiLFVBQUkzSSxTQUFVLGtCQUFFMkcsUUFBRixDQUFXZ0MsUUFBWCxDQUFELEdBQXlCQSxRQUF6QixHQUFvQ3BELFVBQVVuUSxJQUFWLENBQWUsSUFBZixFQUFxQnVULFFBQXJCLENBQWpEO0FBQ0EsVUFBSTNJLFdBQVcsQ0FBQyxDQUFoQixFQUFtQjtBQUNqQjBGLGdCQUFRQyxHQUFSLENBQVksa0JBQUtDLFFBQUwsQ0FBYyxvQkFBZCxFQUFvQyxLQUFwQyxFQUEyQyxLQUEzQyxDQUFaO0FBQ0E7QUFDRDs7QUFFRHRFLGdCQUFVbE0sSUFBVixDQUFlLElBQWYsRUFBcUI0SyxNQUFyQjtBQUNBLGFBQU8sSUFBUDtBQUNEOztBQUVEOzs7Ozs7OzsyQkFLTzJJLFEsRUFBVTtBQUNmLFVBQUkzSSxTQUFTdUYsVUFBVW5RLElBQVYsQ0FBZSxJQUFmLEVBQXFCdVQsUUFBckIsQ0FBYjs7QUFFQSxVQUFJLE9BQU8zSSxNQUFQLEtBQWtCLFdBQXRCLEVBQW1DO0FBQ2pDLGFBQUtsRCxLQUFMLENBQVdrRCxNQUFYLEVBQW1CaUosT0FBbkIsR0FBNkIsS0FBN0I7QUFDQSxZQUFJLEtBQUtuTSxLQUFMLENBQVdrRCxNQUFYLEVBQW1CaEQsUUFBbkIsQ0FBNEIsQ0FBNUIsQ0FBSixFQUFvQztBQUNsQyxlQUFLRixLQUFMLENBQVdrRCxNQUFYLEVBQW1CaEQsUUFBbkIsQ0FBNEJ1RixVQUE1QixDQUF1QyxVQUF2QztBQUNBLGVBQUt6RixLQUFMLENBQVdrRCxNQUFYLEVBQW1CYyxrQkFBbkIsQ0FBc0N5QixVQUF0QyxDQUFpRCxVQUFqRDtBQUNEO0FBQ0QsWUFBSSxLQUFLekYsS0FBTCxDQUFXa0QsTUFBWCxFQUFtQjdDLE9BQW5CLENBQTJCLENBQTNCLENBQUosRUFBbUM7QUFDakMsZUFBS0wsS0FBTCxDQUFXa0QsTUFBWCxFQUFtQjdDLE9BQW5CLENBQTJCb0YsVUFBM0IsQ0FBc0MsVUFBdEM7QUFFRDs7QUFFRC9GLHVCQUFlcEgsSUFBZixDQUFvQixJQUFwQixFQUEwQixLQUFLMEgsS0FBTCxDQUFXa0QsTUFBWCxDQUExQixFQUE4QztBQUM1Q3pFLGdCQUFNLElBRHNDO0FBRTVDb0IsaUJBQU87QUFGcUMsU0FBOUM7QUFJRDs7QUFFRCxhQUFPLElBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7NEJBS1FnTSxRLEVBQVU7QUFDaEIsVUFBSTNJLFNBQVN1RixVQUFVblEsSUFBVixDQUFlLElBQWYsRUFBcUJ1VCxRQUFyQixDQUFiOztBQUVBLFVBQUksT0FBTzNJLE1BQVAsS0FBa0IsV0FBdEIsRUFBbUM7QUFDakMsYUFBS2xELEtBQUwsQ0FBV2tELE1BQVgsRUFBbUJpSixPQUFuQixHQUE2QixJQUE3QjtBQUNBLFlBQUksS0FBS25NLEtBQUwsQ0FBV2tELE1BQVgsRUFBbUJoRCxRQUFuQixDQUE0QixDQUE1QixDQUFKLEVBQW9DO0FBQ2xDLGVBQUtGLEtBQUwsQ0FBV2tELE1BQVgsRUFBbUJoRCxRQUFuQixDQUE0QitILElBQTVCLENBQWlDLFVBQWpDLEVBQTZDLFVBQTdDO0FBQ0EsZUFBS2pJLEtBQUwsQ0FBV2tELE1BQVgsRUFBbUJjLGtCQUFuQixDQUFzQ2lFLElBQXRDLENBQTJDLFVBQTNDLEVBQXVELFVBQXZEO0FBQ0Q7QUFDRCxZQUFJLEtBQUtqSSxLQUFMLENBQVdrRCxNQUFYLEVBQW1CN0MsT0FBbkIsQ0FBMkIsQ0FBM0IsQ0FBSixFQUFtQztBQUNqQyxlQUFLTCxLQUFMLENBQVdrRCxNQUFYLEVBQW1CN0MsT0FBbkIsQ0FBMkI0SCxJQUEzQixDQUFnQyxVQUFoQyxFQUE0QyxVQUE1QztBQUNEOztBQUVEdkksdUJBQWVwSCxJQUFmLENBQW9CLElBQXBCLEVBQTBCLEtBQUswSCxLQUFMLENBQVdrRCxNQUFYLENBQTFCLEVBQThDO0FBQzVDekUsZ0JBQU0sSUFEc0M7QUFFNUNvQixpQkFBTztBQUZxQyxTQUE5QztBQUlEOztBQUVELGFBQU8sSUFBUDtBQUNEOztBQUVEOzs7Ozs7OzRCQUlRO0FBQ05FLCtCQUF5QnpILElBQXpCLENBQThCLElBQTlCO0FBQ0EsYUFBTyxJQUFQO0FBQ0Q7Ozs7OztrQkFJWTZSLGlCOzs7Ozs7O0FDbDdDZjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxnQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDLEM7Ozs7Ozs7QUN6QkE7QUFDQTs7O0FBR0E7QUFDQSwwRUFBMkUsVUFBVSwwQ0FBMEMsaUJBQWlCLEVBQUUsUUFBUSx3Q0FBd0MsaUJBQWlCLEVBQUUsRUFBRSxrREFBa0QsVUFBVSx1Q0FBdUMsaUJBQWlCLEVBQUUsUUFBUSxxQ0FBcUMsaUJBQWlCLEVBQUUsRUFBRSw2Q0FBNkMsVUFBVSwwQ0FBMEMsdUNBQXVDLHNDQUFzQyxxQ0FBcUMsa0NBQWtDLGlCQUFpQixFQUFFLFFBQVEsd0NBQXdDLHFDQUFxQyxvQ0FBb0MsbUNBQW1DLGdDQUFnQyxpQkFBaUIsRUFBRSxFQUFFLDZEQUE2RCxVQUFVLGtEQUFrRCxpQkFBaUIsRUFBRSxRQUFRLGtEQUFrRCxpQkFBaUIsRUFBRSxFQUFFLDBEQUEwRCxVQUFVLCtDQUErQyxpQkFBaUIsRUFBRSxRQUFRLCtDQUErQyxpQkFBaUIsRUFBRSxFQUFFLHFEQUFxRCxVQUFVLGtEQUFrRCwrQ0FBK0MsOENBQThDLDZDQUE2QywwQ0FBMEMsaUJBQWlCLEVBQUUsUUFBUSxrREFBa0QsK0NBQStDLDhDQUE4Qyw2Q0FBNkMsMENBQTBDLGlCQUFpQixFQUFFLEVBQUUsK0JBQStCLHVCQUF1QixzQkFBc0IsbUJBQW1CLDJCQUEyQixFQUFFLDhHQUE4Ryw2QkFBNkIsRUFBRSxpQ0FBaUMsdUJBQXVCLGVBQWUsZUFBZSxtQkFBbUIsaUJBQWlCLG9CQUFvQix1QkFBdUIsMkJBQTJCLCtEQUErRCw0REFBNEQscURBQXFELDJCQUEyQixnQkFBZ0IsMEJBQTBCLEVBQUUsMEVBQTBFLDRCQUE0QixFQUFFLG1FQUFtRSxrQkFBa0IsbUJBQW1CLHFCQUFxQiwwQkFBMEIsZ0NBQWdDLEVBQUUsd0hBQXdILDRCQUE0QiwrQkFBK0IscUJBQXFCLEVBQUUsZ0lBQWdJLG9CQUFvQixrQ0FBa0Msa0NBQWtDLDJCQUEyQixFQUFFLHFZQUFxWSwyQkFBMkIsNkJBQTZCLEVBQUUsaUhBQWlILHVCQUF1Qiw0QkFBNEIseUJBQXlCLHlCQUF5Qiw4QkFBOEIsRUFBRSx5SEFBeUgsd0JBQXdCLEVBQUUseUhBQXlILGdDQUFnQyxFQUFFLHlIQUF5SCx1QkFBdUIseUJBQXlCLHNCQUFzQixFQUFFLDRKQUE0Siw2QkFBNkIseUJBQXlCLHNCQUFzQixrQ0FBa0MsZ0NBQWdDLHNCQUFzQixpQ0FBaUMsaUNBQWlDLHFFQUFxRSxrRUFBa0Usb0NBQW9DLHlCQUF5QixFQUFFLDBLQUEwSywyQkFBMkIsRUFBRSwwS0FBMEssZ0NBQWdDLDJCQUEyQixtQ0FBbUMsMENBQTBDLG1DQUFtQyxFQUFFLHdMQUF3TCwwQ0FBMEMsNkNBQTZDLG1DQUFtQyxFQUFFLHVMQUF1TCwyQ0FBMkMsOENBQThDLGtDQUFrQyw4QkFBOEIsRUFBRSwrTEFBK0wsNEJBQTRCLEVBQUUsdU1BQXVNLDZCQUE2QixFQUFFLCtKQUErSixzQkFBc0IsdUJBQXVCLEVBQUUsdUtBQXVLLDBCQUEwQixFQUFFLDRLQUE0SywwQkFBMEIsRUFBRSxpSEFBaUgsNEJBQTRCLCtCQUErQixvQkFBb0IsMkJBQTJCLEVBQUUscUlBQXFJLHdCQUF3QixFQUFFLGtFQUFrRSx1REFBdUQsRUFBRSxvS0FBb0ssdUJBQXVCLDJCQUEyQixvQkFBb0IsZUFBZSxxQkFBcUIsRUFBRSwyQ0FBMkMsa0JBQWtCLEVBQUUsNFFBQTRRLHlCQUF5QixrQkFBa0IsMEJBQTBCLDRCQUE0QixFQUFFLG9EQUFvRCx3QkFBd0IsRUFBRSxzQ0FBc0MsMkJBQTJCLGtCQUFrQix1QkFBdUIsWUFBWSxXQUFXLHVCQUF1QixxREFBcUQsc0JBQXNCLHFCQUFxQiw4QkFBOEIsK0RBQStELHNEQUFzRCxrRUFBa0UsK0RBQStELDBEQUEwRCxxQ0FBcUMsa0NBQWtDLGlDQUFpQyxnQ0FBZ0MsNkJBQTZCLHlDQUF5QyxzQ0FBc0MscUNBQXFDLG9DQUFvQyxpQ0FBaUMsRUFBRSw4Q0FBOEMsbUhBQW1ILGdIQUFnSCwyR0FBMkcsRUFBRSxvREFBb0QsMkNBQTJDLHdDQUF3Qyx1Q0FBdUMsc0NBQXNDLG1DQUFtQyxFQUFFLHVEQUF1RCw4Q0FBOEMsMkNBQTJDLDBDQUEwQyx5Q0FBeUMsc0NBQXNDLEVBQUUsOENBQThDLHlCQUF5QixrQkFBa0IsRUFBRSx3UkFBd1IsdUNBQXVDLHVCQUF1QixFQUFFLDRqQkFBNGpCLGlDQUFpQywyQ0FBMkMsRUFBRSx3S0FBd0sseUJBQXlCLHVCQUF1QixFQUFFLDJUQUEyVCxpQ0FBaUMsMkNBQTJDLEVBQUUsa05BQWtOLHlCQUF5QixFQUFFLDRHQUE0Ryw4QkFBOEIsMkJBQTJCLEVBQUUsNERBQTRELG1CQUFtQixFQUFFLG9HQUFvRywwQkFBMEIseUJBQXlCLDBDQUEwQywyQkFBMkIsRUFBRSxtSUFBbUksMkJBQTJCLDJCQUEyQiwwQkFBMEIsMEJBQTBCLDZCQUE2QixpQ0FBaUMsMkJBQTJCLEVBQUUseUtBQXlLLDJCQUEyQiwrQkFBK0Isc0NBQXNDLDZCQUE2Qix3QkFBd0IseUJBQXlCLEVBQUUsNk1BQTZNLHFDQUFxQyxrQ0FBa0MscUNBQXFDLGtDQUFrQyw4QkFBOEIsZ0NBQWdDLCtCQUErQixnQ0FBZ0MsRUFBRSxvUEFBb1AsaUNBQWlDLDRCQUE0QixtQ0FBbUMsRUFBRSwwUUFBMFEscUNBQXFDLGlDQUFpQyw4QkFBOEIsK0JBQStCLEVBQUUsOFJBQThSLDJDQUEyQyxnQ0FBZ0MsK0JBQStCLGtDQUFrQyx1Q0FBdUMsK0JBQStCLDZCQUE2QiwyQ0FBMkMscUNBQXFDLHVDQUF1Qyw0Q0FBNEMsaUNBQWlDLHNEQUFzRCxtREFBbUQsa0RBQWtELGlEQUFpRCw4Q0FBOEMsRUFBRSxpUEFBaVAsaUNBQWlDLG1DQUFtQyxFQUFFLHFUQUFxVCx1QkFBdUIsRUFBRSx3S0FBd0sseUJBQXlCLDZCQUE2QixvQ0FBb0MsMkJBQTJCLHNCQUFzQix1QkFBdUIsRUFBRSw4TUFBOE0sbUNBQW1DLGdDQUFnQyxtQ0FBbUMsZ0NBQWdDLDRCQUE0Qiw4QkFBOEIsOEJBQThCLDhCQUE4QixFQUFFLG9HQUFvRywyQkFBMkIseUJBQXlCLEVBQUU7O0FBRTk0aEIiLCJmaWxlIjoiMTIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tIFwianFtaW5cIjtcbmltcG9ydCBBdXRvY29tcGxldGUgZnJvbSBcIi4uLy4uL3NyYy9BWDZVSUF1dG9jb21wbGV0ZVwiO1xuaW1wb3J0IFwiLi4vLi4vc3JjL0FYNlVJQXV0b2NvbXBsZXRlL3N0eWxlLnNjc3NcIjtcblxubGV0IGh0bWwgPSBgXG48ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgPGRpdiBjbGFzcz1cImlucHV0LWZpZWxkIGNvbCBzMTJcIj5cbiAgICAgICAgPGRpdiBkYXRhLWF4NnVpLWF1dG9jb21wbGV0ZT1cImFjMVwiIGRhdGEtYXg2dWktYXV0b2NvbXBsZXRlLWNvbmZpZz0ne30nPjwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+XG5gO1xubGV0IGZuID0ge1xuICBtb2R1bGVSdW46IGZ1bmN0aW9uICgkYm9keSkge1xuICAgIGxldCBvcHRpb25zID0gW107XG4gICAgb3B0aW9ucy5wdXNoKHt2YWx1ZTogXCIxXCIsIHRleHQ6IFwic3RyaW5nXCJ9KTtcbiAgICBvcHRpb25zLnB1c2goe3ZhbHVlOiBcIjJcIiwgdGV4dDogXCJudW1iZXJcIn0pO1xuICAgIG9wdGlvbnMucHVzaCh7dmFsdWU6IFwiM1wiLCB0ZXh0OiBcInN1YnN0clwifSk7XG4gICAgb3B0aW9ucy5wdXNoKHt2YWx1ZTogXCI0XCIsIHRleHQ6IFwic3Vic3RyaW5nXCJ9KTtcbiAgICBvcHRpb25zLnB1c2goe3ZhbHVlOiBcIjVcIiwgdGV4dDogXCJzZWFyY2hcIn0pO1xuICAgIG9wdGlvbnMucHVzaCh7dmFsdWU6IFwiNlwiLCB0ZXh0OiBcInBhcnNlSW50XCJ9KTtcbiAgICBvcHRpb25zLnB1c2goe3ZhbHVlOiBcIjdcIiwgdGV4dDogXCJ0b0ZpeGVkXCJ9KTtcbiAgICBvcHRpb25zLnB1c2goe3ZhbHVlOiBcIjhcIiwgdGV4dDogXCJtaW5cIn0pO1xuICAgIG9wdGlvbnMucHVzaCh7dmFsdWU6IFwiOVwiLCB0ZXh0OiBcIm1heFwifSk7XG4gICAgb3B0aW9ucy5wdXNoKHt2YWx1ZTogXCIxMFwiLCB0ZXh0OiBcIuyepeq4sOyYgVwifSk7XG4gICAgb3B0aW9ucy5wdXNoKHt2YWx1ZTogXCIxMVwiLCB0ZXh0OiBcIuyepeyEnOyasFwifSk7XG4gICAgb3B0aW9ucy5wdXNoKHt2YWx1ZTogXCIxMlwiLCB0ZXh0OiBcIuydtOyYge2drFwifSk7XG4gICAgb3B0aW9ucy5wdXNoKHt2YWx1ZTogXCIxM1wiLCB0ZXh0OiBcIu2ZqeyduOyEnFwifSk7XG4gICAgb3B0aW9ucy5wdXNoKHt2YWx1ZTogXCIxNFwiLCB0ZXh0OiBcIu2ZqeyEuOynhFwifSk7XG4gICAgb3B0aW9ucy5wdXNoKHt2YWx1ZTogXCIxNVwiLCB0ZXh0OiBcIuydtOyEnOyXsFwifSk7XG4gICAgb3B0aW9ucy5wdXNoKHt2YWx1ZTogXCIxNlwiLCB0ZXh0OiBcIuyVoeyLnOyKpOygnOydtFwifSk7XG4gICAgb3B0aW9ucy5wdXNoKHt2YWx1ZTogXCIxN1wiLCB0ZXh0OiBcImF4NVwifSk7XG4gICAgb3B0aW9ucy5wdXNoKHt2YWx1ZTogXCIxOFwiLCB0ZXh0OiBcImF4NWdyaWRcIn0pO1xuICAgIG9wdGlvbnMucHVzaCh7dmFsdWU6IFwiMTlcIiwgdGV4dDogXCJheDVjb21ib2JveFwifSk7XG4gICAgb3B0aW9ucy5wdXNoKHt2YWx1ZTogXCIyMFwiLCB0ZXh0OiBcImF4NWF1dG9jb21wbGV0ZVwifSk7XG4gICAgb3B0aW9ucy5wdXNoKHt2YWx1ZTogXCIyMVwiLCB0ZXh0OiBcImF4NWJpbmRlclwifSk7XG4gICAgb3B0aW9ucy5wdXNoKHt2YWx1ZTogXCIyMlwiLCB0ZXh0OiBcImF4NXNlbGVjdFwifSk7XG4gICAgb3B0aW9ucy5wdXNoKHt2YWx1ZTogXCIyM1wiLCB0ZXh0OiBcImF4NW1hc2tcIn0pO1xuICAgIG9wdGlvbnMucHVzaCh7dmFsdWU6IFwiMjRcIiwgdGV4dDogXCJheDV0b2FzdFwifSk7XG4gICAgb3B0aW9ucy5wdXNoKHt2YWx1ZTogXCIyNVwiLCB0ZXh0OiBcImF4NWRpYWxvZ1wifSk7XG4gICAgb3B0aW9ucy5wdXNoKHt2YWx1ZTogXCIyNlwiLCB0ZXh0OiBcImF4NW1vZGFsXCJ9KTtcblxuICAgIGxldCBhdXRvY29tcGxldGUgPSBuZXcgQXV0b2NvbXBsZXRlKHtcbiAgICAgIHJlbW92ZUljb246ICc8aSBjbGFzcz1cInRpbnkgbWF0ZXJpYWwtaWNvbnNcIj5jbG9zZTwvaT4nXG4gICAgfSk7XG5cbiAgICBhdXRvY29tcGxldGUuYmluZCh7XG4gICAgICB0YXJnZXQ6ICQoJ1tkYXRhLWF4NnVpLWF1dG9jb21wbGV0ZT1cImFjMVwiXScpLFxuICAgICAgaGVpZ2h0OiA0MCxcbiAgICAgIG9wdGlvbkl0ZW1IZWlnaHQ6IDMwLFxuICAgICAgb25TZWFyY2g6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICBsZXQgc2VhcmNoV29yZCA9IHRoaXMuc2VhcmNoV29yZDtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBsZXQgcmVnRXhwID0gbmV3IFJlZ0V4cChzZWFyY2hXb3JkKTtcbiAgICAgICAgICBsZXQgbXlPcHRpb25zID0gW107XG4gICAgICAgICAgb3B0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChuKSB7XG4gICAgICAgICAgICBpZiAobi50ZXh0Lm1hdGNoKHJlZ0V4cCkpIHtcbiAgICAgICAgICAgICAgbXlPcHRpb25zLnB1c2goe1xuICAgICAgICAgICAgICAgIHZhbHVlOiBuLnZhbHVlLFxuICAgICAgICAgICAgICAgIHRleHQ6IG4udGV4dFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgICAgIG9wdGlvbnM6IG15T3B0aW9uc1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LCAxNTApO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuICBtb2R1bGVEZXN0cm95OiBmdW5jdGlvbiAoJGJvZHkpIHtcbiAgICAkYm9keS5vZmYoXCJjbGlja1wiKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBodG1sOiBodG1sLFxuICBmbjogZm5cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXV0b2NvbXBsZXRlLmpzIiwiLyohXG4gKiBtdXN0YWNoZS5qcyAtIExvZ2ljLWxlc3Mge3ttdXN0YWNoZX19IHRlbXBsYXRlcyB3aXRoIEphdmFTY3JpcHRcbiAqIGh0dHA6Ly9naXRodWIuY29tL2phbmwvbXVzdGFjaGUuanNcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS90aG9tYXNKYW5nL211c3RhY2hlLmpzIC0tIGltcG9yb3ZlIHNvbWUgdmFyaWFibGVzXG4gKi9cblxuXG4vKipcbiAqIEFYNk11c3RhY2hl64qUIGh0dHA6Ly9naXRodWIuY29tL2phbmwvbXVzdGFjaGUuanPsl5Ag66qH6rCA7KeAIOy1nOyGjO2VnOydmCDquLDriqXsnYQg7Yqc64ud7ZWY7JesIOyCrOyaqe2VmOuKlCDthZztlIzrpr8g7JeU7KeE7J6F64uI64ukLlxuICogQG5hbWVzcGFjZSBBWDZNdXN0YWNoZVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBBWDZNdXN0YWNoZS5yZW5kZXJcbiAqIEBleGFtcGxlXG4gKiBgYGBqc1xuICogYXg1Lm11c3RhY2hlLnJlbmRlcih0ZW1wbGF0ZSwgdmlldylcbiAqXG4gKlxuICogLy9BcnJheSBAaVxuICogLy97eyNiZWF0bGVzfX1cbiAqIC8ve3tmaXJzdE5hbWV9fSB7e2xhc3ROYW1lfX0gKHt7QGl9fSkgKHt7QGZpcnN0fX0pXG4gKiAvL3t7L2JlYXRsZXN9fVxuICpcbiAqIC8vT2JqZWN0IEBlYWNoXG4gKiB7eyNiZWF0bGVzfX1cbiAqICB7eyNAZWFjaH19XG4gKiAgICAgIHt7QGtleX19IDoge3tAdmFsdWUuZmlyc3ROYW1lfX0ge3tAdmFsdWUubGFzdE5hbWV9fVxuICogIHt7L0BlYWNofX1cbiAqIHt7L2JlYXRsZXN9fVxuICpcbiAqIGBgYFxuICovXG5cblxuXG5sZXQgQVg2ID0ge307XG5cbihmdW5jdGlvbiBkZWZpbmVNdXN0YWNoZShnbG9iYWwsIGZhY3RvcnkpIHtcblxuICBmYWN0b3J5KGdsb2JhbC5tdXN0YWNoZSA9IHt9KTtcblxufShBWDYsIGZ1bmN0aW9uIG11c3RhY2hlRmFjdG9yeShtdXN0YWNoZSkge1xuXG4gIHZhciBvYmplY3RUb1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG4gIHZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiBpc0FycmF5UG9seWZpbGwob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdFRvU3RyaW5nLmNhbGwob2JqZWN0KSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgfTtcblxuICBmdW5jdGlvbiBpc0Z1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnZnVuY3Rpb24nO1xuICB9XG5cbiAgLyoqXG4gICAqIE1vcmUgY29ycmVjdCB0eXBlb2Ygc3RyaW5nIGhhbmRsaW5nIGFycmF5XG4gICAqIHdoaWNoIG5vcm1hbGx5IHJldHVybnMgdHlwZW9mICdvYmplY3QnXG4gICAqL1xuICBmdW5jdGlvbiB0eXBlU3RyKG9iaikge1xuICAgIHJldHVybiBpc0FycmF5KG9iaikgPyAnYXJyYXknIDogdHlwZW9mIG9iajtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVzY2FwZVJlZ0V4cChzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoL1tcXC1cXFtcXF17fSgpKis/LixcXFxcXFxeJHwjXFxzXS9nLCAnXFxcXCQmJyk7XG4gIH1cblxuICAvKipcbiAgICogTnVsbCBzYWZlIHdheSBvZiBjaGVja2luZyB3aGV0aGVyIG9yIG5vdCBhbiBvYmplY3QsXG4gICAqIGluY2x1ZGluZyBpdHMgcHJvdG90eXBlLCBoYXMgYSBnaXZlbiBwcm9wZXJ0eVxuICAgKi9cbiAgZnVuY3Rpb24gaGFzUHJvcGVydHkob2JqLCBwcm9wTmFtZSkge1xuICAgIHJldHVybiBvYmogIT0gbnVsbCAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiAocHJvcE5hbWUgaW4gb2JqKTtcbiAgfVxuXG4gIC8vIFdvcmthcm91bmQgZm9yIGh0dHBzOi8vaXNzdWVzLmFwYWNoZS5vcmcvamlyYS9icm93c2UvQ09VQ0hEQi01NzdcbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qYW5sL211c3RhY2hlLmpzL2lzc3Vlcy8xODlcbiAgdmFyIHJlZ0V4cFRlc3QgPSBSZWdFeHAucHJvdG90eXBlLnRlc3Q7XG5cbiAgZnVuY3Rpb24gdGVzdFJlZ0V4cChyZSwgc3RyaW5nKSB7XG4gICAgcmV0dXJuIHJlZ0V4cFRlc3QuY2FsbChyZSwgc3RyaW5nKTtcbiAgfVxuXG4gIHZhciBub25TcGFjZVJlID0gL1xcUy87XG5cbiAgZnVuY3Rpb24gaXNXaGl0ZXNwYWNlKHN0cmluZykge1xuICAgIHJldHVybiAhdGVzdFJlZ0V4cChub25TcGFjZVJlLCBzdHJpbmcpO1xuICB9XG5cbiAgdmFyIGVudGl0eU1hcCA9IHtcbiAgICAnJic6ICcmYW1wOycsICc8JzogJyZsdDsnLCAnPic6ICcmZ3Q7JywgJ1wiJzogJyZxdW90OycsIFwiJ1wiOiAnJiMzOTsnLCAnLyc6ICcmI3gyRjsnXG4gIH07XG5cbiAgZnVuY3Rpb24gZXNjYXBlSHRtbChzdHJpbmcpIHtcbiAgICByZXR1cm4gU3RyaW5nKHN0cmluZykucmVwbGFjZSgvWyY8PlwiJ1xcL10vZywgZnVuY3Rpb24gZnJvbUVudGl0eU1hcChzKSB7XG4gICAgICByZXR1cm4gZW50aXR5TWFwW3NdO1xuICAgIH0pO1xuICB9XG5cbiAgdmFyIHdoaXRlUmUgPSAvXFxzKi87XG4gIHZhciBzcGFjZVJlID0gL1xccysvO1xuICB2YXIgZXF1YWxzUmUgPSAvXFxzKj0vO1xuICB2YXIgY3VybHlSZSA9IC9cXHMqXFx9LztcbiAgdmFyIHRhZ1JlID0gLyN8XFxefFxcL3w+fFxce3wmfD18IS87XG5cbiAgLyoqXG4gICAqIEJyZWFrcyB1cCB0aGUgZ2l2ZW4gYHRlbXBsYXRlYCBzdHJpbmcgaW50byBhIHRyZWUgb2YgdG9rZW5zLiBJZiB0aGUgYHRhZ3NgXG4gICAqIGFyZ3VtZW50IGlzIGdpdmVuIGhlcmUgaXQgbXVzdCBiZSBhbiBhcnJheSB3aXRoIHR3byBzdHJpbmcgdmFsdWVzOiB0aGVcbiAgICogb3BlbmluZyBhbmQgY2xvc2luZyB0YWdzIHVzZWQgaW4gdGhlIHRlbXBsYXRlIChlLmcuIFsgXCI8JVwiLCBcIiU+XCIgXSkuIE9mXG4gICAqIGNvdXJzZSwgdGhlIGRlZmF1bHQgaXMgdG8gdXNlIG11c3RhY2hlcyAoaS5lLiBtdXN0YWNoZS50YWdzKS5cbiAgICpcbiAgICogQSB0b2tlbiBpcyBhbiBhcnJheSB3aXRoIGF0IGxlYXN0IDQgZWxlbWVudHMuIFRoZSBmaXJzdCBlbGVtZW50IGlzIHRoZVxuICAgKiBtdXN0YWNoZSBzeW1ib2wgdGhhdCB3YXMgdXNlZCBpbnNpZGUgdGhlIHRhZywgZS5nLiBcIiNcIiBvciBcIiZcIi4gSWYgdGhlIHRhZ1xuICAgKiBkaWQgbm90IGNvbnRhaW4gYSBzeW1ib2wgKGkuZS4ge3tteVZhbHVlfX0pIHRoaXMgZWxlbWVudCBpcyBcIm5hbWVcIi4gRm9yXG4gICAqIGFsbCB0ZXh0IHRoYXQgYXBwZWFycyBvdXRzaWRlIGEgc3ltYm9sIHRoaXMgZWxlbWVudCBpcyBcInRleHRcIi5cbiAgICpcbiAgICogVGhlIHNlY29uZCBlbGVtZW50IG9mIGEgdG9rZW4gaXMgaXRzIFwidmFsdWVcIi4gRm9yIG11c3RhY2hlIHRhZ3MgdGhpcyBpc1xuICAgKiB3aGF0ZXZlciBlbHNlIHdhcyBpbnNpZGUgdGhlIHRhZyBiZXNpZGVzIHRoZSBvcGVuaW5nIHN5bWJvbC4gRm9yIHRleHQgdG9rZW5zXG4gICAqIHRoaXMgaXMgdGhlIHRleHQgaXRzZWxmLlxuICAgKlxuICAgKiBUaGUgdGhpcmQgYW5kIGZvdXJ0aCBlbGVtZW50cyBvZiB0aGUgdG9rZW4gYXJlIHRoZSBzdGFydCBhbmQgZW5kIGluZGljZXMsXG4gICAqIHJlc3BlY3RpdmVseSwgb2YgdGhlIHRva2VuIGluIHRoZSBvcmlnaW5hbCB0ZW1wbGF0ZS5cbiAgICpcbiAgICogVG9rZW5zIHRoYXQgYXJlIHRoZSByb290IG5vZGUgb2YgYSBzdWJ0cmVlIGNvbnRhaW4gdHdvIG1vcmUgZWxlbWVudHM6IDEpIGFuXG4gICAqIGFycmF5IG9mIHRva2VucyBpbiB0aGUgc3VidHJlZSBhbmQgMikgdGhlIGluZGV4IGluIHRoZSBvcmlnaW5hbCB0ZW1wbGF0ZSBhdFxuICAgKiB3aGljaCB0aGUgY2xvc2luZyB0YWcgZm9yIHRoYXQgc2VjdGlvbiBiZWdpbnMuXG4gICAqL1xuICBmdW5jdGlvbiBwYXJzZVRlbXBsYXRlKHRlbXBsYXRlLCB0YWdzKSB7XG4gICAgaWYgKCF0ZW1wbGF0ZSlcbiAgICAgIHJldHVybiBbXTtcblxuICAgIHZhciBzZWN0aW9ucyA9IFtdOyAgICAgLy8gU3RhY2sgdG8gaG9sZCBzZWN0aW9uIHRva2Vuc1xuICAgIHZhciB0b2tlbnMgPSBbXTsgICAgICAgLy8gQnVmZmVyIHRvIGhvbGQgdGhlIHRva2Vuc1xuICAgIHZhciBzcGFjZXMgPSBbXTsgICAgICAgLy8gSW5kaWNlcyBvZiB3aGl0ZXNwYWNlIHRva2VucyBvbiB0aGUgY3VycmVudCBsaW5lXG4gICAgdmFyIGhhc1RhZyA9IGZhbHNlOyAgICAvLyBJcyB0aGVyZSBhIHt7dGFnfX0gb24gdGhlIGN1cnJlbnQgbGluZT9cbiAgICB2YXIgbm9uU3BhY2UgPSBmYWxzZTsgIC8vIElzIHRoZXJlIGEgbm9uLXNwYWNlIGNoYXIgb24gdGhlIGN1cnJlbnQgbGluZT9cblxuICAgIC8vIFN0cmlwcyBhbGwgd2hpdGVzcGFjZSB0b2tlbnMgYXJyYXkgZm9yIHRoZSBjdXJyZW50IGxpbmVcbiAgICAvLyBpZiB0aGVyZSB3YXMgYSB7eyN0YWd9fSBvbiBpdCBhbmQgb3RoZXJ3aXNlIG9ubHkgc3BhY2UuXG4gICAgZnVuY3Rpb24gc3RyaXBTcGFjZSgpIHtcbiAgICAgIGlmIChoYXNUYWcgJiYgIW5vblNwYWNlKSB7XG4gICAgICAgIHdoaWxlIChzcGFjZXMubGVuZ3RoKVxuICAgICAgICAgIGRlbGV0ZSB0b2tlbnNbc3BhY2VzLnBvcCgpXTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBzcGFjZXMgPSBbXTtcbiAgICAgIH1cblxuICAgICAgaGFzVGFnID0gZmFsc2U7XG4gICAgICBub25TcGFjZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBvcGVuaW5nVGFnUmUsIGNsb3NpbmdUYWdSZSwgY2xvc2luZ0N1cmx5UmU7XG5cbiAgICBmdW5jdGlvbiBjb21waWxlVGFncyh0YWdzVG9Db21waWxlKSB7XG4gICAgICBpZiAodHlwZW9mIHRhZ3NUb0NvbXBpbGUgPT09ICdzdHJpbmcnKVxuICAgICAgICB0YWdzVG9Db21waWxlID0gdGFnc1RvQ29tcGlsZS5zcGxpdChzcGFjZVJlLCAyKTtcblxuICAgICAgaWYgKCFpc0FycmF5KHRhZ3NUb0NvbXBpbGUpIHx8IHRhZ3NUb0NvbXBpbGUubGVuZ3RoICE9PSAyKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgdGFnczogJyArIHRhZ3NUb0NvbXBpbGUpO1xuXG4gICAgICBvcGVuaW5nVGFnUmUgPSBuZXcgUmVnRXhwKGVzY2FwZVJlZ0V4cCh0YWdzVG9Db21waWxlWzBdKSArICdcXFxccyonKTtcbiAgICAgIGNsb3NpbmdUYWdSZSA9IG5ldyBSZWdFeHAoJ1xcXFxzKicgKyBlc2NhcGVSZWdFeHAodGFnc1RvQ29tcGlsZVsxXSkpO1xuICAgICAgY2xvc2luZ0N1cmx5UmUgPSBuZXcgUmVnRXhwKCdcXFxccyonICsgZXNjYXBlUmVnRXhwKCd9JyArIHRhZ3NUb0NvbXBpbGVbMV0pKTtcbiAgICB9XG5cbiAgICBjb21waWxlVGFncyh0YWdzIHx8IG11c3RhY2hlLnRhZ3MpO1xuXG4gICAgdmFyIHNjYW5uZXIgPSBuZXcgU2Nhbm5lcih0ZW1wbGF0ZSk7XG5cbiAgICB2YXIgc3RhcnQsIHR5cGUsIHZhbHVlLCBjaHIsIHRva2VuLCBvcGVuU2VjdGlvbjtcbiAgICB3aGlsZSAoIXNjYW5uZXIuZW9zKCkpIHtcbiAgICAgIHN0YXJ0ID0gc2Nhbm5lci5wb3M7XG5cbiAgICAgIC8vIE1hdGNoIGFueSB0ZXh0IGJldHdlZW4gdGFncy5cbiAgICAgIHZhbHVlID0gc2Nhbm5lci5zY2FuVW50aWwob3BlbmluZ1RhZ1JlKTtcblxuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCB2YWx1ZUxlbmd0aCA9IHZhbHVlLmxlbmd0aDsgaSA8IHZhbHVlTGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBjaHIgPSB2YWx1ZS5jaGFyQXQoaSk7XG5cbiAgICAgICAgICBpZiAoaXNXaGl0ZXNwYWNlKGNocikpIHtcbiAgICAgICAgICAgIHNwYWNlcy5wdXNoKHRva2Vucy5sZW5ndGgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG5vblNwYWNlID0gdHJ1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0b2tlbnMucHVzaChbJ3RleHQnLCBjaHIsIHN0YXJ0LCBzdGFydCArIDFdKTtcbiAgICAgICAgICBzdGFydCArPSAxO1xuXG4gICAgICAgICAgLy8gQ2hlY2sgZm9yIHdoaXRlc3BhY2Ugb24gdGhlIGN1cnJlbnQgbGluZS5cbiAgICAgICAgICBpZiAoY2hyID09PSAnXFxuJylcbiAgICAgICAgICAgIHN0cmlwU3BhY2UoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBNYXRjaCB0aGUgb3BlbmluZyB0YWcuXG4gICAgICBpZiAoIXNjYW5uZXIuc2NhbihvcGVuaW5nVGFnUmUpKVxuICAgICAgICBicmVhaztcblxuICAgICAgaGFzVGFnID0gdHJ1ZTtcblxuICAgICAgLy8gR2V0IHRoZSB0YWcgdHlwZS5cbiAgICAgIHR5cGUgPSBzY2FubmVyLnNjYW4odGFnUmUpIHx8ICduYW1lJztcbiAgICAgIHNjYW5uZXIuc2Nhbih3aGl0ZVJlKTtcblxuICAgICAgLy8gR2V0IHRoZSB0YWcgdmFsdWUuXG4gICAgICBpZiAodHlwZSA9PT0gJz0nKSB7XG4gICAgICAgIHZhbHVlID0gc2Nhbm5lci5zY2FuVW50aWwoZXF1YWxzUmUpO1xuICAgICAgICBzY2FubmVyLnNjYW4oZXF1YWxzUmUpO1xuICAgICAgICBzY2FubmVyLnNjYW5VbnRpbChjbG9zaW5nVGFnUmUpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJ3snKSB7XG4gICAgICAgIHZhbHVlID0gc2Nhbm5lci5zY2FuVW50aWwoY2xvc2luZ0N1cmx5UmUpO1xuICAgICAgICBzY2FubmVyLnNjYW4oY3VybHlSZSk7XG4gICAgICAgIHNjYW5uZXIuc2NhblVudGlsKGNsb3NpbmdUYWdSZSk7XG4gICAgICAgIHR5cGUgPSAnJic7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBzY2FubmVyLnNjYW5VbnRpbChjbG9zaW5nVGFnUmUpO1xuICAgICAgfVxuXG4gICAgICAvLyBNYXRjaCB0aGUgY2xvc2luZyB0YWcuXG4gICAgICBpZiAoIXNjYW5uZXIuc2NhbihjbG9zaW5nVGFnUmUpKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuY2xvc2VkIHRhZyBhdCAnICsgc2Nhbm5lci5wb3MpO1xuXG4gICAgICB0b2tlbiA9IFt0eXBlLCB2YWx1ZSwgc3RhcnQsIHNjYW5uZXIucG9zXTtcbiAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcblxuICAgICAgaWYgKHR5cGUgPT09ICcjJyB8fCB0eXBlID09PSAnXicpIHtcbiAgICAgICAgc2VjdGlvbnMucHVzaCh0b2tlbik7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0eXBlID09PSAnLycpIHtcbiAgICAgICAgLy8gQ2hlY2sgc2VjdGlvbiBuZXN0aW5nLlxuICAgICAgICBvcGVuU2VjdGlvbiA9IHNlY3Rpb25zLnBvcCgpO1xuXG4gICAgICAgIGlmICghb3BlblNlY3Rpb24pXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbm9wZW5lZCBzZWN0aW9uIFwiJyArIHZhbHVlICsgJ1wiIGF0ICcgKyBzdGFydCk7XG5cbiAgICAgICAgaWYgKG9wZW5TZWN0aW9uWzFdICE9PSB2YWx1ZSlcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuY2xvc2VkIHNlY3Rpb24gXCInICsgb3BlblNlY3Rpb25bMV0gKyAnXCIgYXQgJyArIHN0YXJ0KTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICduYW1lJyB8fCB0eXBlID09PSAneycgfHwgdHlwZSA9PT0gJyYnKSB7XG4gICAgICAgIG5vblNwYWNlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICc9Jykge1xuICAgICAgICAvLyBTZXQgdGhlIHRhZ3MgZm9yIHRoZSBuZXh0IHRpbWUgYXJvdW5kLlxuICAgICAgICBjb21waWxlVGFncyh2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gTWFrZSBzdXJlIHRoZXJlIGFyZSBubyBvcGVuIHNlY3Rpb25zIHdoZW4gd2UncmUgZG9uZS5cbiAgICBvcGVuU2VjdGlvbiA9IHNlY3Rpb25zLnBvcCgpO1xuXG4gICAgaWYgKG9wZW5TZWN0aW9uKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmNsb3NlZCBzZWN0aW9uIFwiJyArIG9wZW5TZWN0aW9uWzFdICsgJ1wiIGF0ICcgKyBzY2FubmVyLnBvcyk7XG5cbiAgICByZXR1cm4gbmVzdFRva2VucyhzcXVhc2hUb2tlbnModG9rZW5zKSk7XG4gIH1cblxuICAvKipcbiAgICogQ29tYmluZXMgdGhlIHZhbHVlcyBvZiBjb25zZWN1dGl2ZSB0ZXh0IHRva2VucyBpbiB0aGUgZ2l2ZW4gYHRva2Vuc2AgYXJyYXlcbiAgICogdG8gYSBzaW5nbGUgdG9rZW4uXG4gICAqL1xuICBmdW5jdGlvbiBzcXVhc2hUb2tlbnModG9rZW5zKSB7XG4gICAgdmFyIHNxdWFzaGVkVG9rZW5zID0gW107XG5cbiAgICB2YXIgdG9rZW4sIGxhc3RUb2tlbjtcbiAgICBmb3IgKHZhciBpID0gMCwgbnVtVG9rZW5zID0gdG9rZW5zLmxlbmd0aDsgaSA8IG51bVRva2VuczsgKytpKSB7XG4gICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcblxuICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgIGlmICh0b2tlblswXSA9PT0gJ3RleHQnICYmIGxhc3RUb2tlbiAmJiBsYXN0VG9rZW5bMF0gPT09ICd0ZXh0Jykge1xuICAgICAgICAgIGxhc3RUb2tlblsxXSArPSB0b2tlblsxXTtcbiAgICAgICAgICBsYXN0VG9rZW5bM10gPSB0b2tlblszXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBzcXVhc2hlZFRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgICBsYXN0VG9rZW4gPSB0b2tlbjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzcXVhc2hlZFRva2VucztcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JtcyB0aGUgZ2l2ZW4gYXJyYXkgb2YgYHRva2Vuc2AgaW50byBhIG5lc3RlZCB0cmVlIHN0cnVjdHVyZSB3aGVyZVxuICAgKiB0b2tlbnMgdGhhdCByZXByZXNlbnQgYSBzZWN0aW9uIGhhdmUgdHdvIGFkZGl0aW9uYWwgaXRlbXM6IDEpIGFuIGFycmF5IG9mXG4gICAqIGFsbCB0b2tlbnMgdGhhdCBhcHBlYXIgaW4gdGhhdCBzZWN0aW9uIGFuZCAyKSB0aGUgaW5kZXggaW4gdGhlIG9yaWdpbmFsXG4gICAqIHRlbXBsYXRlIHRoYXQgcmVwcmVzZW50cyB0aGUgZW5kIG9mIHRoYXQgc2VjdGlvbi5cbiAgICovXG4gIGZ1bmN0aW9uIG5lc3RUb2tlbnModG9rZW5zKSB7XG4gICAgdmFyIG5lc3RlZFRva2VucyA9IFtdO1xuICAgIHZhciBjb2xsZWN0b3IgPSBuZXN0ZWRUb2tlbnM7XG4gICAgdmFyIHNlY3Rpb25zID0gW107XG5cbiAgICB2YXIgdG9rZW4sIHNlY3Rpb247XG4gICAgZm9yICh2YXIgaSA9IDAsIG51bVRva2VucyA9IHRva2Vucy5sZW5ndGg7IGkgPCBudW1Ub2tlbnM7ICsraSkge1xuICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XG5cbiAgICAgIHN3aXRjaCAodG9rZW5bMF0pIHtcbiAgICAgICAgY2FzZSAnIyc6XG4gICAgICAgIGNhc2UgJ14nOlxuICAgICAgICAgIGNvbGxlY3Rvci5wdXNoKHRva2VuKTtcbiAgICAgICAgICBzZWN0aW9ucy5wdXNoKHRva2VuKTtcbiAgICAgICAgICBjb2xsZWN0b3IgPSB0b2tlbls0XSA9IFtdO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICcvJzpcbiAgICAgICAgICBzZWN0aW9uID0gc2VjdGlvbnMucG9wKCk7XG4gICAgICAgICAgc2VjdGlvbls1XSA9IHRva2VuWzJdO1xuICAgICAgICAgIGNvbGxlY3RvciA9IHNlY3Rpb25zLmxlbmd0aCA+IDAgPyBzZWN0aW9uc1tzZWN0aW9ucy5sZW5ndGggLSAxXVs0XSA6IG5lc3RlZFRva2VucztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb2xsZWN0b3IucHVzaCh0b2tlbik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5lc3RlZFRva2VucztcbiAgfVxuXG4gIC8qKlxuICAgKiBBIHNpbXBsZSBzdHJpbmcgc2Nhbm5lciB0aGF0IGlzIHVzZWQgYnkgdGhlIHRlbXBsYXRlIHBhcnNlciB0byBmaW5kXG4gICAqIHRva2VucyBpbiB0ZW1wbGF0ZSBzdHJpbmdzLlxuICAgKi9cbiAgZnVuY3Rpb24gU2Nhbm5lcihzdHJpbmcpIHtcbiAgICB0aGlzLnN0cmluZyA9IHN0cmluZztcbiAgICB0aGlzLnRhaWwgPSBzdHJpbmc7XG4gICAgdGhpcy5wb3MgPSAwO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYHRydWVgIGlmIHRoZSB0YWlsIGlzIGVtcHR5IChlbmQgb2Ygc3RyaW5nKS5cbiAgICovXG4gIFNjYW5uZXIucHJvdG90eXBlLmVvcyA9IGZ1bmN0aW9uIGVvcygpIHtcbiAgICByZXR1cm4gdGhpcy50YWlsID09PSAnJztcbiAgfTtcblxuICAvKipcbiAgICogVHJpZXMgdG8gbWF0Y2ggdGhlIGdpdmVuIHJlZ3VsYXIgZXhwcmVzc2lvbiBhdCB0aGUgY3VycmVudCBwb3NpdGlvbi5cbiAgICogUmV0dXJucyB0aGUgbWF0Y2hlZCB0ZXh0IGlmIGl0IGNhbiBtYXRjaCwgdGhlIGVtcHR5IHN0cmluZyBvdGhlcndpc2UuXG4gICAqL1xuICBTY2FubmVyLnByb3RvdHlwZS5zY2FuID0gZnVuY3Rpb24gc2NhbihyZSkge1xuICAgIHZhciBtYXRjaCA9IHRoaXMudGFpbC5tYXRjaChyZSk7XG5cbiAgICBpZiAoIW1hdGNoIHx8IG1hdGNoLmluZGV4ICE9PSAwKVxuICAgICAgcmV0dXJuICcnO1xuXG4gICAgdmFyIHN0cmluZyA9IG1hdGNoWzBdO1xuXG4gICAgdGhpcy50YWlsID0gdGhpcy50YWlsLnN1YnN0cmluZyhzdHJpbmcubGVuZ3RoKTtcbiAgICB0aGlzLnBvcyArPSBzdHJpbmcubGVuZ3RoO1xuXG4gICAgcmV0dXJuIHN0cmluZztcbiAgfTtcblxuICAvKipcbiAgICogU2tpcHMgYWxsIHRleHQgdW50aWwgdGhlIGdpdmVuIHJlZ3VsYXIgZXhwcmVzc2lvbiBjYW4gYmUgbWF0Y2hlZC4gUmV0dXJuc1xuICAgKiB0aGUgc2tpcHBlZCBzdHJpbmcsIHdoaWNoIGlzIHRoZSBlbnRpcmUgdGFpbCBpZiBubyBtYXRjaCBjYW4gYmUgbWFkZS5cbiAgICovXG4gIFNjYW5uZXIucHJvdG90eXBlLnNjYW5VbnRpbCA9IGZ1bmN0aW9uIHNjYW5VbnRpbChyZSkge1xuICAgIHZhciBpbmRleCA9IHRoaXMudGFpbC5zZWFyY2gocmUpLCBtYXRjaDtcblxuICAgIHN3aXRjaCAoaW5kZXgpIHtcbiAgICAgIGNhc2UgLTE6XG4gICAgICAgIG1hdGNoID0gdGhpcy50YWlsO1xuICAgICAgICB0aGlzLnRhaWwgPSAnJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIG1hdGNoID0gJyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbWF0Y2ggPSB0aGlzLnRhaWwuc3Vic3RyaW5nKDAsIGluZGV4KTtcbiAgICAgICAgdGhpcy50YWlsID0gdGhpcy50YWlsLnN1YnN0cmluZyhpbmRleCk7XG4gICAgfVxuXG4gICAgdGhpcy5wb3MgKz0gbWF0Y2gubGVuZ3RoO1xuXG4gICAgcmV0dXJuIG1hdGNoO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXByZXNlbnRzIGEgcmVuZGVyaW5nIGNvbnRleHQgYnkgd3JhcHBpbmcgYSB2aWV3IG9iamVjdCBhbmRcbiAgICogbWFpbnRhaW5pbmcgYSByZWZlcmVuY2UgdG8gdGhlIHBhcmVudCBjb250ZXh0LlxuICAgKi9cbiAgZnVuY3Rpb24gQ29udGV4dCh2aWV3LCBwYXJlbnRDb250ZXh0KSB7XG4gICAgdGhpcy52aWV3ID0gdmlldztcbiAgICB0aGlzLmNhY2hlID0ge1xuICAgICAgJy4nOiB0aGlzLnZpZXcsXG4gICAgICAnQGVhY2gnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByZXR1cm5zID0gW107XG4gICAgICAgIGZvciAodmFyIGsgaW4gdGhpcykge1xuICAgICAgICAgIHJldHVybnMucHVzaCh7J0BrZXknOiBrLCAnQHZhbHVlJzogdGhpc1trXX0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXR1cm5zO1xuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5wYXJlbnQgPSBwYXJlbnRDb250ZXh0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgY29udGV4dCB1c2luZyB0aGUgZ2l2ZW4gdmlldyB3aXRoIHRoaXMgY29udGV4dFxuICAgKiBhcyB0aGUgcGFyZW50LlxuICAgKi9cbiAgQ29udGV4dC5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIHB1c2godmlldykge1xuICAgIHJldHVybiBuZXcgQ29udGV4dCh2aWV3LCB0aGlzKTtcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhlIGdpdmVuIG5hbWUgaW4gdGhpcyBjb250ZXh0LCB0cmF2ZXJzaW5nXG4gICAqIHVwIHRoZSBjb250ZXh0IGhpZXJhcmNoeSBpZiB0aGUgdmFsdWUgaXMgYWJzZW50IGluIHRoaXMgY29udGV4dCdzIHZpZXcuXG4gICAqL1xuICBDb250ZXh0LnByb3RvdHlwZS5sb29rdXAgPSBmdW5jdGlvbiBsb29rdXAobmFtZSkge1xuICAgIHZhciBjYWNoZSA9IHRoaXMuY2FjaGU7XG5cbiAgICB2YXIgdmFsdWU7XG4gICAgaWYgKGNhY2hlLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICB2YWx1ZSA9IGNhY2hlW25hbWVdO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcywgbmFtZXMsIGluZGV4LCBsb29rdXBIaXQgPSBmYWxzZTtcblxuICAgICAgd2hpbGUgKGNvbnRleHQpIHtcbiAgICAgICAgaWYgKG5hbWUuaW5kZXhPZignLicpID4gMCkge1xuICAgICAgICAgIHZhbHVlID0gY29udGV4dC52aWV3O1xuICAgICAgICAgIG5hbWVzID0gbmFtZS5zcGxpdCgnLicpO1xuICAgICAgICAgIGluZGV4ID0gMDtcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIFVzaW5nIHRoZSBkb3Qgbm90aW9uIHBhdGggaW4gYG5hbWVgLCB3ZSBkZXNjZW5kIHRocm91Z2ggdGhlXG4gICAgICAgICAgICogbmVzdGVkIG9iamVjdHMuXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBUbyBiZSBjZXJ0YWluIHRoYXQgdGhlIGxvb2t1cCBoYXMgYmVlbiBzdWNjZXNzZnVsLCB3ZSBoYXZlIHRvXG4gICAgICAgICAgICogY2hlY2sgaWYgdGhlIGxhc3Qgb2JqZWN0IGluIHRoZSBwYXRoIGFjdHVhbGx5IGhhcyB0aGUgcHJvcGVydHlcbiAgICAgICAgICAgKiB3ZSBhcmUgbG9va2luZyBmb3IuIFdlIHN0b3JlIHRoZSByZXN1bHQgaW4gYGxvb2t1cEhpdGAuXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBUaGlzIGlzIHNwZWNpYWxseSBuZWNlc3NhcnkgZm9yIHdoZW4gdGhlIHZhbHVlIGhhcyBiZWVuIHNldCB0b1xuICAgICAgICAgICAqIGB1bmRlZmluZWRgIGFuZCB3ZSB3YW50IHRvIGF2b2lkIGxvb2tpbmcgdXAgcGFyZW50IGNvbnRleHRzLlxuICAgICAgICAgICAqKi9cbiAgICAgICAgICB3aGlsZSAodmFsdWUgIT0gbnVsbCAmJiBpbmRleCA8IG5hbWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGluZGV4ID09PSBuYW1lcy5sZW5ndGggLSAxKVxuICAgICAgICAgICAgICBsb29rdXBIaXQgPSBoYXNQcm9wZXJ0eSh2YWx1ZSwgbmFtZXNbaW5kZXhdKTtcblxuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZVtuYW1lc1tpbmRleCsrXV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHZhbHVlID0gY29udGV4dC52aWV3W25hbWVdO1xuICAgICAgICAgIGxvb2t1cEhpdCA9IGhhc1Byb3BlcnR5KGNvbnRleHQudmlldywgbmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobG9va3VwSGl0KVxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNvbnRleHQgPSBjb250ZXh0LnBhcmVudDtcbiAgICAgIH1cblxuICAgICAgY2FjaGVbbmFtZV0gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpXG4gICAgICB2YWx1ZSA9IHZhbHVlLmNhbGwodGhpcy52aWV3KTtcblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcblxuICAvKipcbiAgICogQSBXcml0ZXIga25vd3MgaG93IHRvIHRha2UgYSBzdHJlYW0gb2YgdG9rZW5zIGFuZCByZW5kZXIgdGhlbSB0byBhXG4gICAqIHN0cmluZywgZ2l2ZW4gYSBjb250ZXh0LiBJdCBhbHNvIG1haW50YWlucyBhIGNhY2hlIG9mIHRlbXBsYXRlcyB0b1xuICAgKiBhdm9pZCB0aGUgbmVlZCB0byBwYXJzZSB0aGUgc2FtZSB0ZW1wbGF0ZSB0d2ljZS5cbiAgICovXG4gIGZ1bmN0aW9uIFdyaXRlcigpIHtcbiAgICB0aGlzLmNhY2hlID0ge307XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIGFsbCBjYWNoZWQgdGVtcGxhdGVzIGluIHRoaXMgd3JpdGVyLlxuICAgKi9cbiAgV3JpdGVyLnByb3RvdHlwZS5jbGVhckNhY2hlID0gZnVuY3Rpb24gY2xlYXJDYWNoZSgpIHtcbiAgICB0aGlzLmNhY2hlID0ge307XG4gIH07XG5cbiAgLyoqXG4gICAqIFBhcnNlcyBhbmQgY2FjaGVzIHRoZSBnaXZlbiBgdGVtcGxhdGVgIGFuZCByZXR1cm5zIHRoZSBhcnJheSBvZiB0b2tlbnNcbiAgICogdGhhdCBpcyBnZW5lcmF0ZWQgZnJvbSB0aGUgcGFyc2UuXG4gICAqL1xuICBXcml0ZXIucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24gcGFyc2UodGVtcGxhdGUsIHRhZ3MpIHtcbiAgICB2YXIgY2FjaGUgPSB0aGlzLmNhY2hlO1xuICAgIHZhciB0b2tlbnMgPSBjYWNoZVt0ZW1wbGF0ZV07XG5cbiAgICBpZiAodG9rZW5zID09IG51bGwpXG4gICAgICB0b2tlbnMgPSBjYWNoZVt0ZW1wbGF0ZV0gPSBwYXJzZVRlbXBsYXRlKHRlbXBsYXRlLCB0YWdzKTtcblxuICAgIHJldHVybiB0b2tlbnM7XG4gIH07XG5cbiAgLyoqXG4gICAqIEhpZ2gtbGV2ZWwgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byByZW5kZXIgdGhlIGdpdmVuIGB0ZW1wbGF0ZWAgd2l0aFxuICAgKiB0aGUgZ2l2ZW4gYHZpZXdgLlxuICAgKlxuICAgKiBUaGUgb3B0aW9uYWwgYHBhcnRpYWxzYCBhcmd1bWVudCBtYXkgYmUgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgdGhlXG4gICAqIG5hbWVzIGFuZCB0ZW1wbGF0ZXMgb2YgcGFydGlhbHMgdGhhdCBhcmUgdXNlZCBpbiB0aGUgdGVtcGxhdGUuIEl0IG1heVxuICAgKiBhbHNvIGJlIGEgZnVuY3Rpb24gdGhhdCBpcyB1c2VkIHRvIGxvYWQgcGFydGlhbCB0ZW1wbGF0ZXMgb24gdGhlIGZseVxuICAgKiB0aGF0IHRha2VzIGEgc2luZ2xlIGFyZ3VtZW50OiB0aGUgbmFtZSBvZiB0aGUgcGFydGlhbC5cbiAgICovXG4gIFdyaXRlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscykge1xuICAgIHZhciB0b2tlbnMgPSB0aGlzLnBhcnNlKHRlbXBsYXRlKTtcbiAgICB2YXIgY29udGV4dCA9ICh2aWV3IGluc3RhbmNlb2YgQ29udGV4dCkgPyB2aWV3IDogbmV3IENvbnRleHQodmlldyk7XG4gICAgcmV0dXJuIHRoaXMucmVuZGVyVG9rZW5zKHRva2VucywgY29udGV4dCwgcGFydGlhbHMsIHRlbXBsYXRlKTtcbiAgfTtcblxuICAvKipcbiAgICogTG93LWxldmVsIG1ldGhvZCB0aGF0IHJlbmRlcnMgdGhlIGdpdmVuIGFycmF5IG9mIGB0b2tlbnNgIHVzaW5nXG4gICAqIHRoZSBnaXZlbiBgY29udGV4dGAgYW5kIGBwYXJ0aWFsc2AuXG4gICAqXG4gICAqIE5vdGU6IFRoZSBgb3JpZ2luYWxUZW1wbGF0ZWAgaXMgb25seSBldmVyIHVzZWQgdG8gZXh0cmFjdCB0aGUgcG9ydGlvblxuICAgKiBvZiB0aGUgb3JpZ2luYWwgdGVtcGxhdGUgdGhhdCB3YXMgY29udGFpbmVkIGluIGEgaGlnaGVyLW9yZGVyIHNlY3Rpb24uXG4gICAqIElmIHRoZSB0ZW1wbGF0ZSBkb2Vzbid0IHVzZSBoaWdoZXItb3JkZXIgc2VjdGlvbnMsIHRoaXMgYXJndW1lbnQgbWF5XG4gICAqIGJlIG9taXR0ZWQuXG4gICAqL1xuICBXcml0ZXIucHJvdG90eXBlLnJlbmRlclRva2VucyA9IGZ1bmN0aW9uIHJlbmRlclRva2Vucyh0b2tlbnMsIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKSB7XG4gICAgdmFyIGJ1ZmZlciA9ICcnO1xuICAgIHZhciB0b2tlbiwgc3ltYm9sLCB2YWx1ZTtcbiAgICBmb3IgKHZhciBpID0gMCwgbnVtVG9rZW5zID0gdG9rZW5zLmxlbmd0aDsgaSA8IG51bVRva2VuczsgKytpKSB7XG4gICAgICB2YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgIHRva2VuID0gdG9rZW5zW2ldO1xuICAgICAgc3ltYm9sID0gdG9rZW5bMF07XG5cbiAgICAgIGlmIChzeW1ib2wgPT09ICcjJykgdmFsdWUgPSB0aGlzLnJlbmRlclNlY3Rpb24odG9rZW4sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgICAgIGVsc2UgaWYgKHN5bWJvbCA9PT0gJ14nKSB2YWx1ZSA9IHRoaXMucmVuZGVySW52ZXJ0ZWQodG9rZW4sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgICAgIGVsc2UgaWYgKHN5bWJvbCA9PT0gJz4nKSB2YWx1ZSA9IHRoaXMucmVuZGVyUGFydGlhbCh0b2tlbiwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xuICAgICAgZWxzZSBpZiAoc3ltYm9sID09PSAnJicpIHZhbHVlID0gdGhpcy51bmVzY2FwZWRWYWx1ZSh0b2tlbiwgY29udGV4dCk7XG4gICAgICBlbHNlIGlmIChzeW1ib2wgPT09ICduYW1lJykgdmFsdWUgPSB0aGlzLmVzY2FwZWRWYWx1ZSh0b2tlbiwgY29udGV4dCk7XG4gICAgICBlbHNlIGlmIChzeW1ib2wgPT09ICd0ZXh0JykgdmFsdWUgPSB0aGlzLnJhd1ZhbHVlKHRva2VuKTtcblxuICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpXG4gICAgICAgIGJ1ZmZlciArPSB2YWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmZmVyO1xuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUucmVuZGVyU2VjdGlvbiA9IGZ1bmN0aW9uIHJlbmRlclNlY3Rpb24odG9rZW4sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBidWZmZXIgPSAnJztcblxuICAgIHZhciB2YWx1ZSA9IGNvbnRleHQubG9va3VwKHRva2VuWzFdKTtcblxuICAgIC8vIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byByZW5kZXIgYW4gYXJiaXRyYXJ5IHRlbXBsYXRlXG4gICAgLy8gaW4gdGhlIGN1cnJlbnQgY29udGV4dCBieSBoaWdoZXItb3JkZXIgc2VjdGlvbnMuXG4gICAgZnVuY3Rpb24gc3ViUmVuZGVyKHRlbXBsYXRlKSB7XG4gICAgICByZXR1cm4gc2VsZi5yZW5kZXIodGVtcGxhdGUsIGNvbnRleHQsIHBhcnRpYWxzKTtcbiAgICB9XG5cbiAgICBpZiAoIXZhbHVlKSByZXR1cm47XG5cbiAgICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIGZvciAodmFyIGogPSAwLCB2YWx1ZUxlbmd0aCA9IHZhbHVlLmxlbmd0aDsgaiA8IHZhbHVlTGVuZ3RoOyArK2opIHtcbiAgICAgICAgaWYgKHZhbHVlW2pdKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZVtqXSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHZhbHVlW2pdWydAaSddID0gajtcbiAgICAgICAgICAgIHZhbHVlW2pdWydAZmlyc3QnXSA9IChqID09PSAwKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBidWZmZXIgKz0gdGhpcy5yZW5kZXJUb2tlbnModG9rZW5bNF0sIGNvbnRleHQucHVzaCh2YWx1ZVtqXSksIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgYnVmZmVyICs9IHRoaXMucmVuZGVyVG9rZW5zKHRva2VuWzRdLCBjb250ZXh0LnB1c2godmFsdWUpLCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgICBpZiAodHlwZW9mIG9yaWdpbmFsVGVtcGxhdGUgIT09ICdzdHJpbmcnKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCB1c2UgaGlnaGVyLW9yZGVyIHNlY3Rpb25zIHdpdGhvdXQgdGhlIG9yaWdpbmFsIHRlbXBsYXRlJyk7XG5cbiAgICAgIC8vIEV4dHJhY3QgdGhlIHBvcnRpb24gb2YgdGhlIG9yaWdpbmFsIHRlbXBsYXRlIHRoYXQgdGhlIHNlY3Rpb24gY29udGFpbnMuXG4gICAgICB2YWx1ZSA9IHZhbHVlLmNhbGwoY29udGV4dC52aWV3LCBvcmlnaW5hbFRlbXBsYXRlLnNsaWNlKHRva2VuWzNdLCB0b2tlbls1XSksIHN1YlJlbmRlcik7XG5cbiAgICAgIGlmICh2YWx1ZSAhPSBudWxsKVxuICAgICAgICBidWZmZXIgKz0gdmFsdWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgYnVmZmVyICs9IHRoaXMucmVuZGVyVG9rZW5zKHRva2VuWzRdLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XG4gICAgfVxuICAgIHJldHVybiBidWZmZXI7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5yZW5kZXJJbnZlcnRlZCA9IGZ1bmN0aW9uIHJlbmRlckludmVydGVkKHRva2VuLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSkge1xuICAgIHZhciB2YWx1ZSA9IGNvbnRleHQubG9va3VwKHRva2VuWzFdKTtcblxuICAgIC8vIFVzZSBKYXZhU2NyaXB0J3MgZGVmaW5pdGlvbiBvZiBmYWxzeS4gSW5jbHVkZSBlbXB0eSBhcnJheXMuXG4gICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qYW5sL211c3RhY2hlLmpzL2lzc3Vlcy8xODZcbiAgICBpZiAoIXZhbHVlIHx8IChpc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPT09IDApKVxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyVG9rZW5zKHRva2VuWzRdLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5yZW5kZXJQYXJ0aWFsID0gZnVuY3Rpb24gcmVuZGVyUGFydGlhbCh0b2tlbiwgY29udGV4dCwgcGFydGlhbHMpIHtcbiAgICBpZiAoIXBhcnRpYWxzKSByZXR1cm47XG5cbiAgICB2YXIgdmFsdWUgPSBpc0Z1bmN0aW9uKHBhcnRpYWxzKSA/IHBhcnRpYWxzKHRva2VuWzFdKSA6IHBhcnRpYWxzW3Rva2VuWzFdXTtcbiAgICBpZiAodmFsdWUgIT0gbnVsbClcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlclRva2Vucyh0aGlzLnBhcnNlKHZhbHVlKSwgY29udGV4dCwgcGFydGlhbHMsIHZhbHVlKTtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLnVuZXNjYXBlZFZhbHVlID0gZnVuY3Rpb24gdW5lc2NhcGVkVmFsdWUodG9rZW4sIGNvbnRleHQpIHtcbiAgICB2YXIgdmFsdWUgPSBjb250ZXh0Lmxvb2t1cCh0b2tlblsxXSk7XG4gICAgaWYgKHZhbHVlICE9IG51bGwpXG4gICAgICByZXR1cm4gdmFsdWU7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5lc2NhcGVkVmFsdWUgPSBmdW5jdGlvbiBlc2NhcGVkVmFsdWUodG9rZW4sIGNvbnRleHQpIHtcbiAgICB2YXIgdmFsdWUgPSBjb250ZXh0Lmxvb2t1cCh0b2tlblsxXSk7XG4gICAgaWYgKHZhbHVlICE9IG51bGwpXG4gICAgICByZXR1cm4gbXVzdGFjaGUuZXNjYXBlKHZhbHVlKTtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLnJhd1ZhbHVlID0gZnVuY3Rpb24gcmF3VmFsdWUodG9rZW4pIHtcbiAgICByZXR1cm4gdG9rZW5bMV07XG4gIH07XG5cbiAgbXVzdGFjaGUubmFtZSA9ICdtdXN0YWNoZS5qcyc7XG4gIG11c3RhY2hlLnZlcnNpb24gPSAnMi4xLjMnO1xuICBtdXN0YWNoZS50YWdzID0gWyd7eycsICd9fSddO1xuXG4gIC8vIEFsbCBoaWdoLWxldmVsIG11c3RhY2hlLiogZnVuY3Rpb25zIHVzZSB0aGlzIHdyaXRlci5cbiAgdmFyIGRlZmF1bHRXcml0ZXIgPSBuZXcgV3JpdGVyKCk7XG5cbiAgLyoqXG4gICAqIENsZWFycyBhbGwgY2FjaGVkIHRlbXBsYXRlcyBpbiB0aGUgZGVmYXVsdCB3cml0ZXIuXG4gICAqL1xuICBtdXN0YWNoZS5jbGVhckNhY2hlID0gZnVuY3Rpb24gY2xlYXJDYWNoZSgpIHtcbiAgICByZXR1cm4gZGVmYXVsdFdyaXRlci5jbGVhckNhY2hlKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFBhcnNlcyBhbmQgY2FjaGVzIHRoZSBnaXZlbiB0ZW1wbGF0ZSBpbiB0aGUgZGVmYXVsdCB3cml0ZXIgYW5kIHJldHVybnMgdGhlXG4gICAqIGFycmF5IG9mIHRva2VucyBpdCBjb250YWlucy4gRG9pbmcgdGhpcyBhaGVhZCBvZiB0aW1lIGF2b2lkcyB0aGUgbmVlZCB0b1xuICAgKiBwYXJzZSB0ZW1wbGF0ZXMgb24gdGhlIGZseSBhcyB0aGV5IGFyZSByZW5kZXJlZC5cbiAgICovXG4gIG11c3RhY2hlLnBhcnNlID0gZnVuY3Rpb24gcGFyc2UodGVtcGxhdGUsIHRhZ3MpIHtcbiAgICByZXR1cm4gZGVmYXVsdFdyaXRlci5wYXJzZSh0ZW1wbGF0ZSwgdGFncyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbmRlcnMgdGhlIGB0ZW1wbGF0ZWAgd2l0aCB0aGUgZ2l2ZW4gYHZpZXdgIGFuZCBgcGFydGlhbHNgIHVzaW5nIHRoZVxuICAgKiBkZWZhdWx0IHdyaXRlci5cbiAgICovXG4gIG11c3RhY2hlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcih0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMpIHtcbiAgICBpZiAodHlwZW9mIHRlbXBsYXRlICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCB0ZW1wbGF0ZSEgVGVtcGxhdGUgc2hvdWxkIGJlIGEgXCJzdHJpbmdcIiAnICsgJ2J1dCBcIicgKyB0eXBlU3RyKHRlbXBsYXRlKSArICdcIiB3YXMgZ2l2ZW4gYXMgdGhlIGZpcnN0ICcgKyAnYXJndW1lbnQgZm9yIG11c3RhY2hlI3JlbmRlcih0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMpJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlZmF1bHRXcml0ZXIucmVuZGVyKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscyk7XG4gIH07XG5cbiAgLy8gVGhpcyBpcyBoZXJlIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSB3aXRoIDAuNC54LixcbiAgLyplc2xpbnQtZGlzYWJsZSAqLyAvLyBlc2xpbnQgd2FudHMgY2FtZWwgY2FzZWQgZnVuY3Rpb24gbmFtZVxuICBtdXN0YWNoZS50b19odG1sID0gZnVuY3Rpb24gdG9faHRtbCh0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMsIHNlbmQpIHtcbiAgICAvKmVzbGludC1lbmFibGUqL1xuXG4gICAgdmFyIHJlc3VsdCA9IG11c3RhY2hlLnJlbmRlcih0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMpO1xuXG4gICAgaWYgKGlzRnVuY3Rpb24oc2VuZCkpIHtcbiAgICAgIHNlbmQocmVzdWx0KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfTtcblxuICAvLyBFeHBvcnQgdGhlIGVzY2FwaW5nIGZ1bmN0aW9uIHNvIHRoYXQgdGhlIHVzZXIgbWF5IG92ZXJyaWRlIGl0LlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2phbmwvbXVzdGFjaGUuanMvaXNzdWVzLzI0NFxuICBtdXN0YWNoZS5lc2NhcGUgPSBlc2NhcGVIdG1sO1xuXG4gIC8vIEV4cG9ydCB0aGVzZSBtYWlubHkgZm9yIHRlc3RpbmcsIGJ1dCBhbHNvIGZvciBhZHZhbmNlZCB1c2FnZS5cbiAgbXVzdGFjaGUuU2Nhbm5lciA9IFNjYW5uZXI7XG4gIG11c3RhY2hlLkNvbnRleHQgPSBDb250ZXh0O1xuICBtdXN0YWNoZS5Xcml0ZXIgPSBXcml0ZXI7XG5cbn0pKTtcblxuZXhwb3J0IGRlZmF1bHQgQVg2Lm11c3RhY2hlO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9zcmMvQVg2TXVzdGFjaGUuanMiLCJpbXBvcnQgalF1ZXJ5IGZyb20gXCJqcW1pblwiO1xuaW1wb3J0IEFYNlVJQ29yZSBmcm9tIFwiLi9BWDZVSUNvcmUuanNcIjtcbmltcG9ydCBpbmZvIGZyb20gXCIuL0FYNkluZm9cIjtcbmltcG9ydCBVIGZyb20gXCIuL0FYNlV0aWxcIjtcbmltcG9ydCBtdXN0YWNoZSBmcm9tIFwiLi9BWDZNdXN0YWNoZVwiO1xuXG4vKiB+fn5+fn5+fn5+fn5+fn5+fn4gZW5kIG9mIGltcG9ydCAgfn5+fn5+fn5+fn5+fn5+fn5+fn4gKi9cblxubGV0IGN0cmxLZXlzID0ge1xuICBcIjE4XCI6IFwiS0VZX0FMVFwiLFxuICAvL1wiOFwiOiBcIktFWV9CQUNLU1BBQ0VcIixcbiAgXCIxN1wiOiBcIktFWV9DT05UUk9MXCIsXG4gIFwiNDZcIjogXCJLRVlfREVMRVRFXCIsXG4gIFwiNDBcIjogXCJLRVlfRE9XTlwiLFxuICBcIjM1XCI6IFwiS0VZX0VORFwiLFxuICBcIjE4N1wiOiBcIktFWV9FUVVBTFwiLFxuICAvL1wiMjdcIjogXCJLRVlfRVNDXCIsXG4gIFwiMzZcIjogXCJLRVlfSE9NRVwiLFxuICBcIjQ1XCI6IFwiS0VZX0lOU0VSVFwiLFxuICBcIjM3XCI6IFwiS0VZX0xFRlRcIixcbiAgXCIxODlcIjogXCJLRVlfTUlOVVNcIixcbiAgXCIzNFwiOiBcIktFWV9QQUdFRE9XTlwiLFxuICBcIjMzXCI6IFwiS0VZX1BBR0VVUFwiLFxuICAvLyBcIjE5MFwiOiBcIktFWV9QRVJJT0RcIixcbiAgLy9cIjEzXCI6IFwiS0VZX1JFVFVSTlwiLFxuICBcIjM5XCI6IFwiS0VZX1JJR0hUXCIsXG4gIFwiMTZcIjogXCJLRVlfU0hJRlRcIixcbiAgLy8gXCIzMlwiOiBcIktFWV9TUEFDRVwiLFxuICBcIjlcIjogXCJLRVlfVEFCXCIsXG4gIFwiMzhcIjogXCJLRVlfVVBcIixcbiAgXCI5MVwiOiBcIktFWV9XSU5ET1dcIlxuICAvL1wiMTA3XCIgOiBcIk5VTVBBRF9BRERcIixcbiAgLy9cIjE5NFwiIDogXCJOVU1QQURfQ09NTUFcIixcbiAgLy9cIjExMFwiIDogXCJOVU1QQURfREVDSU1BTFwiLFxuICAvL1wiMTExXCIgOiBcIk5VTVBBRF9ESVZJREVcIixcbiAgLy9cIjEyXCIgOiBcIk5VTVBBRF9FUVVBTFwiLFxuICAvL1wiMTA2XCIgOiBcIk5VTVBBRF9NVUxUSVBMWVwiLFxuICAvL1wiMTA5XCIgOiBcIk5VTVBBRF9TVUJUUkFDVFwiXG59O1xubGV0IHRtcGwgPSB7XG4gIFwib3B0aW9uR3JvdXBcIihjb2x1bW5LZXlzKSB7XG4gICAgcmV0dXJuIGBcbjxkaXYgY2xhc3M9XCJheDZ1aS1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwIHt7dGhlbWV9fSB7e3NpemV9fVwiIGRhdGEtYXg2dWktYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cD1cInt7aWR9fVwiPlxuICAgIDxkaXYgY2xhc3M9XCJheC1hdXRvY29tcGxldGUtYm9keVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cC1jb250ZW50XCIgZGF0YS1lbHM9XCJjb250ZW50XCI+PC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImF4LWF1dG9jb21wbGV0ZS1hcnJvd1wiPjwvZGl2PiBcbjwvZGl2PlxuYDtcbiAgfSxcbiAgXCJhdXRvY29tcGxldGVEaXNwbGF5XCIoY29sdW1uS2V5cykge1xuICAgIHJldHVybiBgIFxuPGlucHV0IHRhYmluZGV4PVwiLTFcIiB0eXBlPVwidGV4dFwiIGRhdGEtaW5wdXQtZHVtbXk9XCJcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCIgLz5cbjxkaXYgY2xhc3M9XCJheDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheSB7e3RoZW1lfX1cIiBkYXRhLWF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5PVwie3tpZH19XCIgZGF0YS1heDZ1aS1hdXRvY29tcGxldGUtaW5zdGFuY2U9XCJ7e2luc3RhbmNlSWR9fVwiIHN0eWxlPVwiaGVpZ2h0OiB7e2hlaWdodH19cHg7XCI+XG4gICAgPGRpdiBjbGFzcz1cImF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5LXRhYmxlXCIgZGF0YS1lbHM9XCJkaXNwbGF5LXRhYmxlXCI+XG4gICAgICAgIDxkaXYgZGF0YS1heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheT1cImxhYmVsLWhvbGRlclwiPiBcbiAgICAgICAgICA8YSB7e150YWJJbmRleH19e3svdGFiSW5kZXh9fXt7I3RhYkluZGV4fX10YWJpbmRleD1cInt7dGFiSW5kZXh9fVwiIHt7L3RhYkluZGV4fX0gZGF0YS1heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheT1cImxhYmVsXCIgc3BlbGxjaGVjaz1cImZhbHNlXCIgc3R5bGU9XCJwYWRkaW5nOiAwIHt7cGFkZGluZ0xlZnR9fXB4O1wiPlxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBkYXRhLWF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5PVwiaW5wdXRcIiBzdHlsZT1cImJvcmRlcjowIG5vbmU7aGVpZ2h0OiB7e29wdGlvbkl0ZW1IZWlnaHR9fXB4O2xpbmUtaGVpZ2h0OiB7e29wdGlvbkl0ZW1IZWlnaHR9fXB4O1wiIC8+XG4gICAgICAgICAgPC9hPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBkYXRhLWF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5PVwiYWRkb25cIj4gXG4gICAgICAgICAgICB7eyNtdWx0aXBsZX19e3sjcmVzZXR9fVxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhZGRvbi1pY29uLXJlc2V0XCIgZGF0YS1zZWxlY3RlZC1jbGVhcj1cInRydWVcIj57e3sufX19PC9zcGFuPlxuICAgICAgICAgICAge3svcmVzZXR9fXt7L211bHRpcGxlfX1cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L2Rpdj5cbmA7XG4gIH0sXG4gIFwiZm9ybVNlbGVjdFwiKGNvbHVtbktleXMpIHtcbiAgICByZXR1cm4gYFxuPHNlbGVjdCB0YWJpbmRleD1cIi0xXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wge3tmb3JtU2l6ZX19XCIgbmFtZT1cInt7bmFtZX19XCIgbXVsdGlwbGU9XCJtdWx0aXBsZVwiPjwvc2VsZWN0PlxuYDtcbiAgfSxcbiAgXCJmb3JtU2VsZWN0T3B0aW9uc1wiKGNvbHVtbktleXMpIHtcbiAgICByZXR1cm4gYFxue3sjc2VsZWN0ZWR9fVxuPG9wdGlvbiB2YWx1ZT1cInt7JHtjb2x1bW5LZXlzLm9wdGlvblZhbHVlfX19XCIgc2VsZWN0ZWQ9XCJ0cnVlXCI+e3ske2NvbHVtbktleXMub3B0aW9uVGV4dH19fTwvb3B0aW9uPlxue3svc2VsZWN0ZWR9fVxuYDtcbiAgfSxcbiAgXCJvcHRpb25zXCIoY29sdW1uS2V5cykge1xuICAgIHJldHVybiBgXG57eyN3YWl0T3B0aW9uc319XG4gICAgPGRpdiBjbGFzcz1cImF4LWF1dG9jb21wbGV0ZS1vcHRpb24taXRlbVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImF4LWF1dG9jb21wbGV0ZS1vcHRpb24taXRlbS1ob2xkZXJcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImF4LWF1dG9jb21wbGV0ZS1vcHRpb24taXRlbS1jZWxsIGF4LWF1dG9jb21wbGV0ZS1vcHRpb24taXRlbS1sYWJlbFwiPlxuICAgICAgICAgICAgICAgICAgICB7e3tsYW5nLmxvYWRpbmd9fX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG57ey93YWl0T3B0aW9uc319XG57e153YWl0T3B0aW9uc319XG4gICAge3sjb3B0aW9uc319XG4gICAgICAgIHt7XmhpZGV9fVxuICAgICAgICA8ZGl2IGNsYXNzPVwiYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1pdGVtXCIgZGF0YS1vcHRpb24tZm9jdXMtaW5kZXg9XCJ7e0BmaW5kZXh9fVwiIGRhdGEtb3B0aW9uLWluZGV4PVwie3tAaW5kZXh9fVwiIGRhdGEtb3B0aW9uLXZhbHVlPVwie3ske2NvbHVtbktleXMub3B0aW9uVmFsdWV9fX1cIiB7eyMke2NvbHVtbktleXMub3B0aW9uU2VsZWN0ZWR9fX1kYXRhLW9wdGlvbi1zZWxlY3RlZD1cInRydWVcInt7LyR7Y29sdW1uS2V5cy5vcHRpb25TZWxlY3RlZH19fT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJheC1hdXRvY29tcGxldGUtb3B0aW9uLWl0ZW0taG9sZGVyXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJheC1hdXRvY29tcGxldGUtb3B0aW9uLWl0ZW0tY2VsbCBheC1hdXRvY29tcGxldGUtb3B0aW9uLWl0ZW0tbGFiZWxcIj57eyR7Y29sdW1uS2V5cy5vcHRpb25UZXh0fX19PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7ey9oaWRlfX1cbiAgICB7ey9vcHRpb25zfX1cbiAgICB7e15vcHRpb25zfX1cbiAgICAgICAgPGRpdiBjbGFzcz1cImF4LWF1dG9jb21wbGV0ZS1vcHRpb24taXRlbVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImF4LWF1dG9jb21wbGV0ZS1vcHRpb24taXRlbS1ob2xkZXJcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImF4LWF1dG9jb21wbGV0ZS1vcHRpb24taXRlbS1jZWxsIGF4LWF1dG9jb21wbGV0ZS1vcHRpb24taXRlbS1sYWJlbFwiPlxuICAgICAgICAgICAgICAgICAgICB7e3tsYW5nLm5vT3B0aW9uc319fVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICB7ey9vcHRpb25zfX1cbnt7L3dhaXRPcHRpb25zfX1cbmA7XG4gIH0sXG4gIFwibGFiZWxcIihjb2x1bW5LZXlzKSB7XG4gICAgcmV0dXJuIGB7eyNzZWxlY3RlZH19XG48ZGl2IHRhYmluZGV4PVwiLTFcIiBkYXRhLWF4NnVpLWF1dG9jb21wbGV0ZS1zZWxlY3RlZC1sYWJlbD1cInt7QGl9fVwiIGRhdGEtYXg2dWktYXV0b2NvbXBsZXRlLXNlbGVjdGVkLXRleHQ9XCJ7e3RleHR9fVwiIHN0eWxlPVwiaGVpZ2h0OiB7e29wdGlvbkl0ZW1IZWlnaHR9fXB4O1wiPiAgXG4gIDxkaXYgY2xhc3M9XCJsYWJlbC1jZWxsXCI+e3ske2NvbHVtbktleXMub3B0aW9uVGV4dH19fTwvZGl2PlxuICA8ZGl2IGNsYXNzPVwibGFiZWwtY2VsbFwiIGRhdGEtYXg2dWktYXV0b2NvbXBsZXRlLXJlbW92ZT1cInRydWVcIiBkYXRhLWF4NnVpLWF1dG9jb21wbGV0ZS1yZW1vdmUtaW5kZXg9XCJ7e0BpfX1cIj57e3tyZW1vdmVJY29ufX19PC9kaXY+XG48L2Rpdj57ey9zZWxlY3RlZH19YDtcbiAgfSxcbn07XG5cbmNvbnN0IG9uU3RhdGVDaGFuZ2VkID0gZnVuY3Rpb24gKGl0ZW0sIHRoYXQpIHtcbiAgaWYgKGl0ZW0gJiYgaXRlbS5vblN0YXRlQ2hhbmdlZCkge1xuICAgIGl0ZW0ub25TdGF0ZUNoYW5nZWQuY2FsbCh0aGF0LCB0aGF0KTtcbiAgfVxuICBlbHNlIGlmICh0aGlzLm9uU3RhdGVDaGFuZ2VkKSB7XG4gICAgdGhpcy5vblN0YXRlQ2hhbmdlZC5jYWxsKHRoYXQsIHRoYXQpO1xuICB9XG5cbiAgaWYgKHRoYXQuc3RhdGUgPT0gXCJjaGFuZ2VWYWx1ZVwiKSB7XG4gICAgaWYgKGl0ZW0gJiYgaXRlbS5vbkNoYW5nZSkge1xuICAgICAgaXRlbS5vbkNoYW5nZS5jYWxsKHRoYXQsIHRoYXQpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLm9uQ2hhbmdlKSB7XG4gICAgICB0aGlzLm9uQ2hhbmdlLmNhbGwodGhhdCwgdGhhdCk7XG4gICAgfVxuICB9XG5cbiAgaXRlbSA9IG51bGw7XG4gIHRoYXQgPSBudWxsO1xuICByZXR1cm4gdHJ1ZTtcbn07XG5jb25zdCBhbGlnbkF1dG9jb21wbGV0ZURpc3BsYXkgPSBmdW5jdGlvbiAoKSB7XG4gIGxldCBpID0gdGhpcy5xdWV1ZS5sZW5ndGgsIHc7XG5cbiAgd2hpbGUgKGktLSkge1xuICAgIGxldCBpdGVtID0gdGhpcy5xdWV1ZVtpXTtcbiAgICBpZiAoaXRlbS4kZGlzcGxheSkge1xuICAgICAgdyA9IE1hdGgubWF4KGl0ZW0uJHNlbGVjdC5vdXRlcldpZHRoKCksIFUubnVtYmVyKGl0ZW0ubWluV2lkdGgpKTtcbiAgICAgIGl0ZW0uJGRpc3BsYXkuY3NzKHtcbiAgICAgICAgXCJtaW4td2lkdGhcIjogd1xuICAgICAgfSk7XG4gICAgICBpZiAoaXRlbS5yZXNldCkge1xuICAgICAgICBpdGVtLiRkaXNwbGF5LmZpbmQoXCIuYWRkb24taWNvbi1yZXNldFwiKS5jc3Moe1xuICAgICAgICAgIFwibGluZS1oZWlnaHRcIjogdGhpcy5xdWV1ZVtpXS4kZGlzcGxheS5oZWlnaHQoKSArIFwicHhcIlxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8g64aS7J207KGw7KCIIOyymOumrFxuICAgICAgaWYgKGl0ZW0ubXVsdGlwbGUpIHtcbiAgICAgICAgdmFyIGRpc3BsYXlUYWJsZUhlaWdodEFkanVzdCA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIFUubnVtYmVyKGl0ZW0uJGRpc3BsYXkuY3NzKFwiYm9yZGVyLXRvcC13aWR0aFwiKSkgKyBVLm51bWJlcihpdGVtLiRkaXNwbGF5LmNzcyhcImJvcmRlci1ib3R0b20td2lkdGhcIikpO1xuICAgICAgICB9KS5jYWxsKHRoaXMpO1xuICAgICAgICBpdGVtLiR0YXJnZXQuaGVpZ2h0KCcnKTtcbiAgICAgICAgaXRlbS4kZGlzcGxheS5oZWlnaHQoJycpO1xuXG4gICAgICAgIHZhciBkaXNwbGF5VGFibGVIZWlnaHQgPSBpdGVtLiRkaXNwbGF5VGFibGUub3V0ZXJIZWlnaHQoKTtcbiAgICAgICAgaWYgKE1hdGguYWJzKGRpc3BsYXlUYWJsZUhlaWdodCAtIGl0ZW0uJHRhcmdldC5oZWlnaHQoKSkgPiBkaXNwbGF5VGFibGVIZWlnaHRBZGp1c3QpIHtcbiAgICAgICAgICBpdGVtLiR0YXJnZXQuY3NzKHtoZWlnaHQ6IGRpc3BsYXlUYWJsZUhlaWdodCArIGRpc3BsYXlUYWJsZUhlaWdodEFkanVzdCArIDR9KTtcbiAgICAgICAgICBpdGVtLiRkaXNwbGF5LmNzcyh7aGVpZ2h0OiBkaXNwbGF5VGFibGVIZWlnaHQgKyBkaXNwbGF5VGFibGVIZWlnaHRBZGp1c3QgKyA0fSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpID0gbnVsbDtcbiAgdyA9IG51bGw7XG4gIHJldHVybiB0aGlzO1xufTtcbmNvbnN0IGFsaWduQXV0b2NvbXBsZXRlT3B0aW9uR3JvdXAgPSBmdW5jdGlvbiAoYXBwZW5kKSB7XG4gIGlmIChhcHBlbmQgJiYgIXRoaXMuYWN0aXZlYXV0b2NvbXBsZXRlT3B0aW9uR3JvdXApIHJldHVybiB0aGlzO1xuXG4gIGxldCBpdGVtID0gdGhpcy5xdWV1ZVt0aGlzLmFjdGl2ZWF1dG9jb21wbGV0ZVF1ZXVlSW5kZXhdLFxuICAgIHBvcyA9IHt9LCBwb3NpdGlvbk1hcmdpbiA9IDAsXG4gICAgZGltID0ge30sIHBpY2tlckRpbSA9IHt9LFxuICAgIHBpY2tlckRpcmVjdGlvbjtcblxuICBpZiAoIWl0ZW0pIHJldHVybiB0aGlzO1xuICBpZiAoYXBwZW5kKSBqUXVlcnkoZG9jdW1lbnQuYm9keSkuYXBwZW5kKHRoaXMuYWN0aXZlYXV0b2NvbXBsZXRlT3B0aW9uR3JvdXApO1xuXG4gIHBvcyA9IGl0ZW0uJHRhcmdldC5vZmZzZXQoKTtcbiAgZGltID0ge1xuICAgIHdpZHRoOiBpdGVtLiR0YXJnZXQub3V0ZXJXaWR0aCgpLFxuICAgIGhlaWdodDogaXRlbS4kdGFyZ2V0Lm91dGVySGVpZ2h0KClcbiAgfTtcbiAgcGlja2VyRGltID0ge1xuICAgIHdpbldpZHRoOiBNYXRoLm1heChqUXVlcnkod2luZG93KS53aWR0aCgpLCBqUXVlcnkoZG9jdW1lbnQuYm9keSkud2lkdGgoKSksXG4gICAgd2luSGVpZ2h0OiBNYXRoLm1heChqUXVlcnkod2luZG93KS5oZWlnaHQoKSwgalF1ZXJ5KGRvY3VtZW50LmJvZHkpLmhlaWdodCgpKSxcbiAgICB3aWR0aDogdGhpcy5hY3RpdmVhdXRvY29tcGxldGVPcHRpb25Hcm91cC5vdXRlcldpZHRoKCksXG4gICAgaGVpZ2h0OiB0aGlzLmFjdGl2ZWF1dG9jb21wbGV0ZU9wdGlvbkdyb3VwLm91dGVySGVpZ2h0KClcbiAgfTtcblxuICAvLyBwaWNrZXIgY3NzKHdpZHRoLCBsZWZ0LCB0b3ApICYgZGlyZWN0aW9uIOqysOyglVxuICBpZiAoIWl0ZW0uZGlyZWN0aW9uIHx8IGl0ZW0uZGlyZWN0aW9uID09PSBcIlwiIHx8IGl0ZW0uZGlyZWN0aW9uID09PSBcImF1dG9cIikge1xuICAgIC8vIHNldCBkaXJlY3Rpb25cbiAgICBwaWNrZXJEaXJlY3Rpb24gPSBcInRvcFwiO1xuXG4gICAgaWYgKHBvcy50b3AgLSBwaWNrZXJEaW0uaGVpZ2h0IC0gcG9zaXRpb25NYXJnaW4gPCAwKSB7XG4gICAgICBwaWNrZXJEaXJlY3Rpb24gPSBcInRvcFwiO1xuICAgIH0gZWxzZSBpZiAocG9zLnRvcCArIGRpbS5oZWlnaHQgKyBwaWNrZXJEaW0uaGVpZ2h0ICsgcG9zaXRpb25NYXJnaW4gPiBwaWNrZXJEaW0ud2luSGVpZ2h0KSB7XG4gICAgICBwaWNrZXJEaXJlY3Rpb24gPSBcImJvdHRvbVwiO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBwaWNrZXJEaXJlY3Rpb24gPSBpdGVtLmRpcmVjdGlvbjtcbiAgfVxuXG4gIGlmIChhcHBlbmQpIHtcbiAgICB0aGlzLmFjdGl2ZWF1dG9jb21wbGV0ZU9wdGlvbkdyb3VwXG4gICAgICAuYWRkQ2xhc3MoXCJkaXJlY3Rpb24tXCIgKyBwaWNrZXJEaXJlY3Rpb24pO1xuICB9XG4gIHRoaXMuYWN0aXZlYXV0b2NvbXBsZXRlT3B0aW9uR3JvdXBcbiAgICAuY3NzKChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAocGlja2VyRGlyZWN0aW9uID09IFwidG9wXCIpIHtcbiAgICAgICAgaWYgKHBvcy50b3AgKyBkaW0uaGVpZ2h0ICsgcGlja2VyRGltLmhlaWdodCArIHBvc2l0aW9uTWFyZ2luID4gcGlja2VyRGltLndpbkhlaWdodCkge1xuXG4gICAgICAgICAgdmFyIG5ld1RvcCA9IHBvcy50b3AgKyBwaWNrZXJEaW0uaGVpZ2h0O1xuICAgICAgICAgIGlmIChuZXdUb3AgKyBwaWNrZXJEaW0uaGVpZ2h0ICsgcG9zaXRpb25NYXJnaW4gPiBwaWNrZXJEaW0ud2luSGVpZ2h0KSB7XG4gICAgICAgICAgICBuZXdUb3AgPSAwO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobmV3VG9wIDwgMCkge1xuICAgICAgICAgICAgbmV3VG9wID0gMDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbGVmdDogcG9zLmxlZnQsXG4gICAgICAgICAgICB0b3A6IG5ld1RvcCxcbiAgICAgICAgICAgIHdpZHRoOiBkaW0ud2lkdGhcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBsZWZ0OiBwb3MubGVmdCxcbiAgICAgICAgICB0b3A6IHBvcy50b3AgKyBkaW0uaGVpZ2h0ICsgMSxcbiAgICAgICAgICB3aWR0aDogZGltLndpZHRoXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHBpY2tlckRpcmVjdGlvbiA9PSBcImJvdHRvbVwiKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbGVmdDogcG9zLmxlZnQsXG4gICAgICAgICAgdG9wOiBwb3MudG9wIC0gcGlja2VyRGltLmhlaWdodCAtIDEsXG4gICAgICAgICAgd2lkdGg6IGRpbS53aWR0aFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSkuY2FsbCh0aGlzKSk7XG59O1xuY29uc3Qgb25Cb2R5Q2xpY2sgPSBmdW5jdGlvbiAoZSwgdGFyZ2V0KSB7XG4gIGlmICghdGhpcy5hY3RpdmVhdXRvY29tcGxldGVPcHRpb25Hcm91cCkgcmV0dXJuIHRoaXM7XG5cbiAgbGV0IGl0ZW0gPSB0aGlzLnF1ZXVlW3RoaXMuYWN0aXZlYXV0b2NvbXBsZXRlUXVldWVJbmRleF0sIGNsaWNrRWwgPSBcImRpc3BsYXlcIjtcblxuICB0YXJnZXQgPSBVLmZpbmRQYXJlbnROb2RlKGUudGFyZ2V0LCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgaWYgKHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLW9wdGlvbi12YWx1ZVwiKSkge1xuICAgICAgY2xpY2tFbCA9IFwib3B0aW9uSXRlbVwiO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGVsc2UgaWYgKGl0ZW0uJHRhcmdldC5nZXQoMCkgPT0gdGFyZ2V0KSB7XG4gICAgICBjbGlja0VsID0gXCJkaXNwbGF5XCI7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGVsc2UgaWYgKGNsaWNrRWwgPT09IFwib3B0aW9uSXRlbVwiKSB7XG4gICAgc2V0U2VsZWN0ZWQuY2FsbCh0aGlzLCBpdGVtLmlkLCB7XG4gICAgICBvcHRpb25JbmRleDoge1xuICAgICAgICBpbmRleDogdGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtb3B0aW9uLWluZGV4XCIpXG4gICAgICB9XG4gICAgfSwgdW5kZWZpbmVkLCBcIm9wdGlvbkl0ZW1DbGlja1wiKTtcbiAgICBhbGlnbkF1dG9jb21wbGV0ZURpc3BsYXkuY2FsbCh0aGlzKTtcbiAgICBhbGlnbkF1dG9jb21wbGV0ZU9wdGlvbkdyb3VwLmNhbGwodGhpcyk7XG4gICAgaWYgKCFpdGVtLm11bHRpcGxlKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgfVxuICB9XG4gIGVsc2Uge1xuXG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5jb25zdCBnZXRMYWJlbCA9IGZ1bmN0aW9uIChxdWVJZHgpIHtcbiAgbGV0IGl0ZW0gPSB0aGlzLnF1ZXVlW3F1ZUlkeF07XG5cbiAgLy8g7YWc7ZSM66a/7JeQIOyghOuLrCDtlbTslbztlaAg642w7J207YSwIOyEoOyWuFxuICBsZXQgZGF0YSA9IHt9O1xuICBkYXRhLmlkID0gaXRlbS5pZDtcbiAgZGF0YS50aGVtZSA9IGl0ZW0udGhlbWU7XG4gIGRhdGEubXVsdGlwbGUgPSBpdGVtLm11bHRpcGxlO1xuICBkYXRhLmxhbmcgPSBpdGVtLmxhbmc7XG4gIGRhdGEub3B0aW9ucyA9IGl0ZW0ub3B0aW9ucztcbiAgZGF0YS5zZWxlY3RlZCA9IGl0ZW0uc2VsZWN0ZWQ7XG4gIGRhdGEuaGFzU2VsZWN0ZWQgPSAoZGF0YS5zZWxlY3RlZCAmJiBkYXRhLnNlbGVjdGVkLmxlbmd0aCA+IDApO1xuICBkYXRhLnJlbW92ZUljb24gPSBpdGVtLnJlbW92ZUljb247XG4gIGRhdGEuaGVpZ2h0ID0gaXRlbS5oZWlnaHQ7XG4gIGRhdGEub3B0aW9uSXRlbUhlaWdodCA9IGl0ZW0ub3B0aW9uSXRlbUhlaWdodDtcblxuICByZXR1cm4gbXVzdGFjaGUucmVuZGVyKHRtcGwubGFiZWwuY2FsbCh0aGlzLCBpdGVtLmNvbHVtbktleXMpLCBkYXRhKTtcbn07XG5jb25zdCBzeW5jTGFiZWwgPSBmdW5jdGlvbiAocXVlSWR4KSB7XG4gIGxldCBpdGVtID0gdGhpcy5xdWV1ZVtxdWVJZHhdO1xuXG4gIGlmICghaXRlbS5tdWx0aXBsZSAmJiBpdGVtLnNlbGVjdGVkICYmIGl0ZW0uc2VsZWN0ZWQubGVuZ3RoID4gMCkge1xuICAgIGl0ZW0uc2VsZWN0ZWQgPSBbXS5jb25jYXQoaXRlbS5zZWxlY3RlZFtpdGVtLnNlbGVjdGVkLmxlbmd0aCAtIDFdKTtcbiAgfVxuXG4gIGl0ZW0uc2VsZWN0ZWQuZm9yRWFjaChmdW5jdGlvbiAobiwgbmluZGV4KSB7XG4gICAgbltcIkBpbmRleFwiXSA9IG5pbmRleDtcbiAgfSk7XG5cbiAgaXRlbS4kc2VsZWN0Lmh0bWwoXG4gICAgbXVzdGFjaGUucmVuZGVyKHRtcGwuZm9ybVNlbGVjdE9wdGlvbnMuY2FsbCh0aGlzLCBpdGVtLmNvbHVtbktleXMpLCB7XG4gICAgICBzZWxlY3RlZDogaXRlbS5zZWxlY3RlZFxuICAgIH0pXG4gICk7XG59O1xuY29uc3QgcHJpbnRMYWJlbCA9IGZ1bmN0aW9uIChxdWVJZHgpIHtcbiAgbGV0IGl0ZW0gPSB0aGlzLnF1ZXVlW3F1ZUlkeF07XG5cbiAgaXRlbS4kZGlzcGxheUxhYmVsLmZpbmQoJ1tkYXRhLWF4NnVpLWF1dG9jb21wbGV0ZS1zZWxlY3RlZC1sYWJlbF0nKS5yZW1vdmUoKTtcbiAgaXRlbS4kZGlzcGxheUxhYmVsSW5wdXQuYmVmb3JlKGdldExhYmVsLmNhbGwodGhpcywgcXVlSWR4KSk7XG59O1xuY29uc3QgZm9jdXNMYWJlbCA9IGZ1bmN0aW9uIChxdWVJZHgpIHtcbiAgaWYgKHRoaXMucXVldWVbcXVlSWR4XS5kaXNhYmxlZCkgcmV0dXJuIHRoaXM7XG5cbiAgdGhpcy5xdWV1ZVtxdWVJZHhdLiRkaXNwbGF5TGFiZWwudHJpZ2dlcihcImZvY3VzXCIpO1xuICB0aGlzLnF1ZXVlW3F1ZUlkeF0uJGRpc3BsYXlMYWJlbElucHV0LmZvY3VzKCk7XG59O1xuY29uc3QgY2xlYXJMYWJlbCA9IGZ1bmN0aW9uIChxdWVJZHgpIHtcbiAgdGhpcy5xdWV1ZVtxdWVJZHhdLiRkaXNwbGF5TGFiZWxJbnB1dC52YWwoJycpO1xufTtcbmNvbnN0IGJsdXJMYWJlbCA9IGZ1bmN0aW9uIChxdWVJZHgpIHtcbiAgdGhpcy5xdWV1ZVtxdWVJZHhdLiRkaXNwbGF5TGFiZWwudHJpZ2dlcihcImJsdXJcIik7XG59O1xuY29uc3Qgb25TZWFyY2ggPSBmdW5jdGlvbiAocXVlSWR4LCBzZWFyY2hXb3JkKSB7XG4gIGlmICh0aGlzLmFjdGl2ZWF1dG9jb21wbGV0ZVF1ZXVlSW5kZXggPT0gLTEpIHJldHVybiB0aGlzOyAvLyDsmLXshZjrsJXsiqTqsIAg64ur7Z6M7IOB7YOc7J2066m0IOynhO2WieyViO2VqC5cbiAgbGV0IHJlZ0V4cCA9IC9bXFx7XFx9XFxbXFxdXFwvPy4sOzp8XFwpKn5gIV5cXC1fKzw+QFxcIyQlJlxcXFxcXD1cXChcXCdcXFwiXS9naTtcbiAgc2VhcmNoV29yZCA9IHNlYXJjaFdvcmQucmVwbGFjZShyZWdFeHAsIFwiXCIpO1xuXG4gIHRoaXMucXVldWVbcXVlSWR4XS53YWl0T3B0aW9ucyA9IHRydWU7XG4gIHRoaXMucXVldWVbcXVlSWR4XS5vblNlYXJjaC5jYWxsKHtcbiAgICBzZWxmOiB0aGlzLFxuICAgIGl0ZW06IHRoaXMucXVldWVbcXVlSWR4XSxcbiAgICBzZWFyY2hXb3JkOiBzZWFyY2hXb3JkXG4gIH0sIChmdW5jdGlvbiAoTykge1xuXG4gICAgbGV0IGRhdGEgPSB7fTtcbiAgICBsZXQgaXRlbSA9IHRoaXMucXVldWVbdGhpcy5hY3RpdmVhdXRvY29tcGxldGVRdWV1ZUluZGV4XTtcbiAgICBpZiAoIWl0ZW0pIHJldHVybiBmYWxzZTtcblxuICAgIC8vLyDtmITsnqwgc2VsZWN0ZWQg6rKA7Kad7ZuEIOyymOumrFxuICAgIChmdW5jdGlvbiAoaXRlbSwgTykge1xuICAgICAgbGV0IG9wdGlvbnNNYXAgPSB7fTtcbiAgICAgIE8ub3B0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChfTywgX09JbmRleCkge1xuICAgICAgICBfT1tcIkBpbmRleFwiXSA9IF9PSW5kZXg7XG4gICAgICAgIF9PW1wiQGZpbmRleFwiXSA9IF9PSW5kZXg7XG4gICAgICAgIG9wdGlvbnNNYXBbX09baXRlbS5jb2x1bW5LZXlzLm9wdGlvblZhbHVlXV0gPSBfTztcbiAgICAgIH0pO1xuICAgICAgaWYgKFUuaXNBcnJheShpdGVtLnNlbGVjdGVkKSkge1xuICAgICAgICBpdGVtLnNlbGVjdGVkLmZvckVhY2goZnVuY3Rpb24gKF9PKSB7XG4gICAgICAgICAgaWYgKG9wdGlvbnNNYXBbX09baXRlbS5jb2x1bW5LZXlzLm9wdGlvblZhbHVlXV0pIHtcbiAgICAgICAgICAgIE8ub3B0aW9uc1tvcHRpb25zTWFwW19PW2l0ZW0uY29sdW1uS2V5cy5vcHRpb25WYWx1ZV1dW1wiQGluZGV4XCJdXVtpdGVtLmNvbHVtbktleXMub3B0aW9uU2VsZWN0ZWRdID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pKGl0ZW0sIE8pO1xuXG4gICAgaXRlbS5vcHRpb25zID0gTy5vcHRpb25zO1xuXG4gICAgYWxpZ25BdXRvY29tcGxldGVEaXNwbGF5LmNhbGwodGhpcyk7XG5cbiAgICAvLy8g7YWc7ZSM66a/7JeQIOyghOuLrO2VoCDsmKTruIzsoJ3tirgg7ISg7Ja4XG4gICAgZGF0YS5pZCA9IGl0ZW0uaWQ7XG4gICAgZGF0YS50aGVtZSA9IGl0ZW0udGhlbWU7XG4gICAgZGF0YS5tdWx0aXBsZSA9IGl0ZW0ubXVsdGlwbGU7XG4gICAgZGF0YS5sYW5nID0gaXRlbS5sYW5nO1xuICAgIGRhdGEub3B0aW9ucyA9IGl0ZW0ub3B0aW9ucztcbiAgICB0aGlzLmFjdGl2ZWF1dG9jb21wbGV0ZU9wdGlvbkdyb3VwLmZpbmQoJ1tkYXRhLWVscz1cImNvbnRlbnRcIl0nKS5odG1sKG11c3RhY2hlLnJlbmRlcih0bXBsLm9wdGlvbnMuY2FsbCh0aGlzLCBpdGVtLmNvbHVtbktleXMpLCBkYXRhKSk7XG5cbiAgICBmb2N1c1dvcmQuY2FsbCh0aGlzLCB0aGlzLmFjdGl2ZWF1dG9jb21wbGV0ZVF1ZXVlSW5kZXgsIHNlYXJjaFdvcmQpO1xuICAgIGFsaWduQXV0b2NvbXBsZXRlT3B0aW9uR3JvdXAuY2FsbCh0aGlzKTtcblxuICAgIHNldFRpbWVvdXQoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGFsaWduQXV0b2NvbXBsZXRlT3B0aW9uR3JvdXAuY2FsbCh0aGlzKTtcbiAgICB9KS5iaW5kKHRoaXMpKTtcblxuXG4gIH0pLmJpbmQodGhpcykpO1xufTtcbmNvbnN0IGZvY3VzV29yZCA9IGZ1bmN0aW9uIChxdWVJZHgsIHNlYXJjaFdvcmQpIHtcbiAgaWYgKHRoaXMuYWN0aXZlYXV0b2NvbXBsZXRlUXVldWVJbmRleCA9PSAtMSkgcmV0dXJuIHRoaXM7IC8vIOyYteyFmOuwleyKpOqwgCDri6vtnozsg4Htg5zsnbTrqbQg7KeE7ZaJ7JWI7ZWoLlxuICBsZXQgY29sbGVjdF9vcHRpb25zID0gW10sIGkgPSAtMSwgbCA9IHRoaXMucXVldWVbcXVlSWR4XS5vcHRpb25zLmxlbmd0aCAtIDEsIG47XG4gIGlmIChzZWFyY2hXb3JkICE9IFwiXCIpIHtcbiAgICB3aGlsZSAobCAtIGkrKykge1xuICAgICAgbiA9IHRoaXMucXVldWVbcXVlSWR4XS5vcHRpb25zW2ldO1xuXG4gICAgICBpZiAoKCcnICsgbi50ZXh0KS50b0xvd2VyQ2FzZSgpID09IHNlYXJjaFdvcmQudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICBjb2xsZWN0X29wdGlvbnMgPSBbeydAZmluZGV4JzogblsnQGZpbmRleCddLCBvcHRpb25zU29ydDogMH1dO1xuICAgICAgICBicmVhaztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBzb3J0ID0gKCcnICsgbi50ZXh0KS50b0xvd2VyQ2FzZSgpLnNlYXJjaChzZWFyY2hXb3JkLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICBpZiAoc29ydCA+IC0xKSB7XG4gICAgICAgICAgY29sbGVjdF9vcHRpb25zLnB1c2goeydAZmluZGV4JzogblsnQGZpbmRleCddLCBvcHRpb25zU29ydDogc29ydH0pO1xuICAgICAgICAgIGlmIChjb2xsZWN0X29wdGlvbnMubGVuZ3RoID4gMikgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgc29ydCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbGxlY3Rfb3B0aW9ucy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gYS5vcHRpb25zU29ydCAtIGIub3B0aW9uc1NvcnQ7XG4gICAgfSk7XG4gIH1cblxuICBpZiAoY29sbGVjdF9vcHRpb25zICYmIGNvbGxlY3Rfb3B0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgZm9jdXNNb3ZlLmNhbGwodGhpcywgcXVlSWR4LCB1bmRlZmluZWQsIGNvbGxlY3Rfb3B0aW9uc1swXVsnQGZpbmRleCddKTtcbiAgfSBlbHNlIHtcbiAgICBmb2N1c0NsZWFyLmNhbGwodGhpcywgcXVlSWR4KTtcbiAgfVxufTtcbmNvbnN0IGZvY3VzQ2xlYXIgPSBmdW5jdGlvbiAocXVlSWR4KSB7XG4gIGlmICh0aGlzLmFjdGl2ZWF1dG9jb21wbGV0ZU9wdGlvbkdyb3VwKSB7XG4gICAgdGhpcy5hY3RpdmVhdXRvY29tcGxldGVPcHRpb25Hcm91cFxuICAgICAgLmZpbmQoJ1tkYXRhLW9wdGlvbi1mb2N1cy1pbmRleF0nKVxuICAgICAgLnJlbW92ZUNsYXNzKFwiaG92ZXJcIilcbiAgICAgIC5yZW1vdmVBdHRyKFwiZGF0YS1vcHRpb24tc2VsZWN0ZWRcIik7XG4gIH1cblxuICB0aGlzLnF1ZXVlW3F1ZUlkeF0ub3B0aW9uRm9jdXNJbmRleCA9IC0xO1xufTtcbmNvbnN0IGZvY3VzTW92ZSA9IGZ1bmN0aW9uIChxdWVJZHgsIGRpcmVjdGlvbiwgZmluZGV4KSB7XG4gIGxldCBfZm9jdXNJbmRleCwgX3ByZXZGb2N1c0luZGV4LCBmb2N1c09wdGlvbkVsLCBvcHRpb25Hcm91cFNjcm9sbENvbnRhaW5lcjtcbiAgbGV0IGl0ZW0gPSB0aGlzLnF1ZXVlW3F1ZUlkeF07XG5cbiAgaWYgKHRoaXMuYWN0aXZlYXV0b2NvbXBsZXRlT3B0aW9uR3JvdXAgJiYgaXRlbS5vcHRpb25zICYmIGl0ZW0ub3B0aW9ucy5sZW5ndGggPiAwKSB7XG5cbiAgICBpZiAodHlwZW9mIGZpbmRleCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgX2ZvY3VzSW5kZXggPSBmaW5kZXhcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBfcHJldkZvY3VzSW5kZXggPSAoaXRlbS5vcHRpb25Gb2N1c0luZGV4ID09IC0xKSA/IGl0ZW0ub3B0aW9uU2VsZWN0ZWRJbmRleCB8fCAtMSA6IGl0ZW0ub3B0aW9uRm9jdXNJbmRleDtcbiAgICAgIGlmIChfcHJldkZvY3VzSW5kZXggPT0gLTEpIHtcbiAgICAgICAgX2ZvY3VzSW5kZXggPSAwO1xuICAgICAgICAvL19mb2N1c0luZGV4ID0gKGRpcmVjdGlvbiA+IDApID8gMCA6IGl0ZW0ub3B0aW9uSXRlbUxlbmd0aCAtIDE7IC8vIOunqCDrgZ3snLzroZwg67O064K86rKD7J246rCAIOunkCDqsoPsnbjqsIAuXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgX2ZvY3VzSW5kZXggPSBfcHJldkZvY3VzSW5kZXggKyBkaXJlY3Rpb247XG4gICAgICAgIGlmIChfZm9jdXNJbmRleCA8IDApIF9mb2N1c0luZGV4ID0gMDtcbiAgICAgICAgZWxzZSBpZiAoX2ZvY3VzSW5kZXggPiBpdGVtLm9wdGlvbkl0ZW1MZW5ndGggLSAxKSBfZm9jdXNJbmRleCA9IGl0ZW0ub3B0aW9uSXRlbUxlbmd0aCAtIDE7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaXRlbS5vcHRpb25Gb2N1c0luZGV4ID0gX2ZvY3VzSW5kZXg7XG5cbiAgICAvLyDtj6zsu6TsiqQg7J24642x7Iqk6rCAIGhpZGXslYTsnbTthZzsnYQg66eM64KY66m0IGhpZGUg7JWE7J207YWc7J20IOyViOuCmOyYrCDrlYzquYzsp4Ag66Oo7ZSE66W8IOyInO2ajCDtlanri4jri6QuXG4gICAgaWYgKGl0ZW0ub3B0aW9uc1tfZm9jdXNJbmRleF0gJiYgaXRlbS5vcHRpb25zW19mb2N1c0luZGV4XS5oaWRlKSB7IC8vIOyYteyFmOydtCDsl4bripQg6rCS7J20IOyEoO2DneuQnCDqsr3smrBcbiAgICAgIGlmICh0eXBlb2YgZGlyZWN0aW9uID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGxldCBpc1N0cm9wID0gZmFsc2U7XG4gICAgICAgIHdoaWxlIChpdGVtLm9wdGlvbnNbX2ZvY3VzSW5kZXhdLmhpZGUpIHtcbiAgICAgICAgICBfZm9jdXNJbmRleCA9IF9mb2N1c0luZGV4ICsgZGlyZWN0aW9uO1xuICAgICAgICAgIGlmIChfZm9jdXNJbmRleCA8IDApIHtcbiAgICAgICAgICAgIF9mb2N1c0luZGV4ID0gMDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmIChfZm9jdXNJbmRleCA+IGl0ZW0ub3B0aW9uSXRlbUxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIF9mb2N1c0luZGV4ID0gaXRlbS5vcHRpb25JdGVtTGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgX2ZvY3VzSW5kZXggIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRoaXMuYWN0aXZlYXV0b2NvbXBsZXRlT3B0aW9uR3JvdXBcbiAgICAgICAgLmZpbmQoJ1tkYXRhLW9wdGlvbi1mb2N1cy1pbmRleF0nKVxuICAgICAgICAucmVtb3ZlQ2xhc3MoXCJob3ZlclwiKTtcblxuICAgICAgZm9jdXNPcHRpb25FbCA9IHRoaXMuYWN0aXZlYXV0b2NvbXBsZXRlT3B0aW9uR3JvdXBcbiAgICAgICAgLmZpbmQoJ1tkYXRhLW9wdGlvbi1mb2N1cy1pbmRleD1cIicgKyBfZm9jdXNJbmRleCArICdcIl0nKVxuICAgICAgICAuYWRkQ2xhc3MoXCJob3ZlclwiKTtcblxuICAgICAgb3B0aW9uR3JvdXBTY3JvbGxDb250YWluZXIgPSB0aGlzLmFjdGl2ZWF1dG9jb21wbGV0ZU9wdGlvbkdyb3VwLmZpbmQoJ1tkYXRhLWVscz1cImNvbnRlbnRcIl0nKTtcblxuICAgICAgaWYgKGZvY3VzT3B0aW9uRWwuZ2V0KDApKSB7XG4gICAgICAgIGxldCBmb2N1c09wdGlvbkVsSGVpZ2h0ID0gZm9jdXNPcHRpb25FbC5vdXRlckhlaWdodCgpLFxuICAgICAgICAgIG9wdGlvbkdyb3VwU2Nyb2xsQ29udGFpbmVySGVpZ2h0ID0gb3B0aW9uR3JvdXBTY3JvbGxDb250YWluZXIuaW5uZXJIZWlnaHQoKSxcbiAgICAgICAgICBvcHRpb25Hcm91cFNjcm9sbENvbnRhaW5lclNjcm9sbFRvcCA9IG9wdGlvbkdyb3VwU2Nyb2xsQ29udGFpbmVyLnNjcm9sbFRvcCgpLFxuICAgICAgICAgIGZvY3VzT3B0aW9uRWxUb3AgPSBmb2N1c09wdGlvbkVsLnBvc2l0aW9uKCkudG9wICsgb3B0aW9uR3JvdXBTY3JvbGxDb250YWluZXIuc2Nyb2xsVG9wKCk7XG5cbiAgICAgICAgaWYgKG9wdGlvbkdyb3VwU2Nyb2xsQ29udGFpbmVySGVpZ2h0ICsgb3B0aW9uR3JvdXBTY3JvbGxDb250YWluZXJTY3JvbGxUb3AgPCBmb2N1c09wdGlvbkVsVG9wICsgZm9jdXNPcHRpb25FbEhlaWdodCkge1xuICAgICAgICAgIG9wdGlvbkdyb3VwU2Nyb2xsQ29udGFpbmVyLnNjcm9sbFRvcChmb2N1c09wdGlvbkVsVG9wICsgZm9jdXNPcHRpb25FbEhlaWdodCAtIG9wdGlvbkdyb3VwU2Nyb2xsQ29udGFpbmVySGVpZ2h0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvcHRpb25Hcm91cFNjcm9sbENvbnRhaW5lclNjcm9sbFRvcCA+IGZvY3VzT3B0aW9uRWxUb3ApIHtcbiAgICAgICAgICBvcHRpb25Hcm91cFNjcm9sbENvbnRhaW5lci5zY3JvbGxUb3AoZm9jdXNPcHRpb25FbFRvcCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gb3B0aW9uR3JvdXAgc2Nyb2xsIGNoZWNrXG5cbiAgICAgICAgaWYgKHR5cGVvZiBkaXJlY3Rpb24gIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtLiRkaXNwbGF5TGFiZWxJbnB1dC52YWwoaXRlbS5vcHRpb25zW19mb2N1c0luZGV4XS50ZXh0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufTtcbmNvbnN0IGJpbmRBdXRvY29tcGxldGVUYXJnZXQgPSBmdW5jdGlvbiAocXVlSWR4KSB7XG4gIGxldCBpdGVtID0gdGhpcy5xdWV1ZVtxdWVJZHhdLCBkYXRhID0ge307XG4gIGNvbnN0IGRlYm91bmNlZEZvY3VzV29yZCA9IFUuZGVib3VuY2UoZnVuY3Rpb24gKHF1ZUlkeCkge1xuICAgIGlmICh0aGlzLmFjdGl2ZWF1dG9jb21wbGV0ZVF1ZXVlSW5kZXggPT0gLTEpIHJldHVybiB0aGlzOyAvLyDsmLXshZjrsJXsiqTqsIAg64ur7Z6M7IOB7YOc7J2066m0IOynhO2WieyViO2VqC5cbiAgICBvblNlYXJjaC5jYWxsKHRoaXMsIHF1ZUlkeCwgdGhpcy5xdWV1ZVtxdWVJZHhdLiRkaXNwbGF5TGFiZWxJbnB1dC52YWwoKSk7XG4gIH0sIDEwMCkuYmluZCh0aGlzKTtcbiAgY29uc3QgYXV0b2NvbXBsZXRlRXZlbnQgPSB7XG4gICAgJ2NsaWNrJzogZnVuY3Rpb24gKHF1ZUlkeCwgZSkge1xuICAgICAgbGV0IGNsaWNrRWwgPSBcIlwiO1xuICAgICAgbGV0IHRhcmdldCA9IFUuZmluZFBhcmVudE5vZGUoZS50YXJnZXQsIGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgaWYgKHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWF4NnVpLWF1dG9jb21wbGV0ZS1yZW1vdmVcIikpIHtcbiAgICAgICAgICBjbGlja0VsID0gXCJvcHRpb25JdGVtUmVtb3ZlXCI7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtc2VsZWN0ZWQtY2xlYXJcIikpIHtcbiAgICAgICAgICBjbGlja0VsID0gXCJjbGVhclwiO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICBpZiAoY2xpY2tFbCA9PT0gXCJvcHRpb25JdGVtUmVtb3ZlXCIpIHtcbiAgICAgICAgICBsZXQgcmVtb3ZlSW5kZXggPSB0YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1heDZ1aS1hdXRvY29tcGxldGUtcmVtb3ZlLWluZGV4XCIpO1xuICAgICAgICAgIHRoaXMucXVldWVbcXVlSWR4XS5zZWxlY3RlZC5zcGxpY2UocmVtb3ZlSW5kZXgsIDEpO1xuICAgICAgICAgIHN5bmNMYWJlbC5jYWxsKHRoaXMsIHF1ZUlkeCk7XG4gICAgICAgICAgcHJpbnRMYWJlbC5jYWxsKHRoaXMsIHF1ZUlkeCk7XG4gICAgICAgICAgZm9jdXNMYWJlbC5jYWxsKHRoaXMsIHF1ZUlkeCk7XG4gICAgICAgICAgYWxpZ25BdXRvY29tcGxldGVEaXNwbGF5LmNhbGwodGhpcyk7XG4gICAgICAgICAgYWxpZ25BdXRvY29tcGxldGVPcHRpb25Hcm91cC5jYWxsKHRoaXMpO1xuICAgICAgICAgIFUuc3RvcEV2ZW50KGUpO1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9IGVsc2UgaWYgKGNsaWNrRWwgPT09IFwiY2xlYXJcIikge1xuICAgICAgICAgIHNldFNlbGVjdGVkLmNhbGwodGhpcywgcXVlSWR4LCB7Y2xlYXI6IHRydWV9KTtcbiAgICAgICAgICBhbGlnbkF1dG9jb21wbGV0ZURpc3BsYXkuY2FsbCh0aGlzKTtcbiAgICAgICAgICBhbGlnbkF1dG9jb21wbGV0ZU9wdGlvbkdyb3VwLmNhbGwodGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5hY3RpdmVhdXRvY29tcGxldGVRdWV1ZUluZGV4ID09IHF1ZUlkeCkge1xuICAgICAgICAgIGlmICh0aGlzLnF1ZXVlW3F1ZUlkeF0ub3B0aW9uRm9jdXNJbmRleCA9PSAtMSkgeyAvLyDslYTsnbTthZzsl5Ag7Y+s7Luk7Iqk6rCAIO2ZnOyEse2ZlCDrkJwg7ZuELCDrp4jsmrDsiqQg7J2067Kk7Yq4IOydtOuptCDrrLTsi5xcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZm9jdXNMYWJlbC5jYWxsKHRoaXMsIHF1ZUlkeCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgICdrZXlVcCc6IGZ1bmN0aW9uIChxdWVJZHgsIGUpIHtcbiAgICAgIC8vLyDslb3sho3rkJwg7YKkIOydtOuypO2KuOqwgCDrsJzsg53tlZjrqbQgc3RvcEV2ZW5066W8IO2Gte2VtCBrZXlVcCDsnbTrsqTtirjqsIAg67Cc7IOd65CY7KeAIOyViuuPhOuhnSDrp4nslYTso7zripQg7IS87IqkXG4gICAgICBpZiAoZS53aGljaCA9PSBpbmZvLmV2ZW50S2V5cy5FU0MgJiYgdGhpcy5hY3RpdmVhdXRvY29tcGxldGVRdWV1ZUluZGV4ID09PSAtMSkgeyAvLyBFU0PtgqTrpbwg64iE66W06rOgIOyYteyFmOq3uOujueydtCDsl7TroKTsnojsp4Ag7JWK7J2AIOqyveyasFxuICAgICAgICBVLnN0b3BFdmVudChlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChlLndoaWNoID09IGluZm8uZXZlbnRLZXlzLlRBQikge1xuICAgICAgICAvLyBub3RoaW5nXG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0aGlzLmFjdGl2ZWF1dG9jb21wbGV0ZVF1ZXVlSW5kZXggIT0gcXVlSWR4ICYmIGUud2hpY2ggIT0gaW5mby5ldmVudEtleXMuQkFDS1NQQUNFKSB7IC8vIOuLq+2ejCDsg4Htg5wg7J246rK97JqwXG4gICAgICAgIHRoaXMub3BlbihxdWVJZHgpOyAvLyBvcGVuIGFuZCBhbGlnblxuICAgICAgICBkZWJvdW5jZWRGb2N1c1dvcmQocXVlSWR4KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGN0cmxLZXlzW2Uud2hpY2hdKSB7XG4gICAgICAgIFUuc3RvcEV2ZW50KGUpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIC8vIGJhY2tzcGFjZSDqsJDsp4Ag7ZWY7JesIGlucHV0IOqwkuydtCDsl4bsnLzrqbQg7Iqk7YOR7J2067Kk7Yq4IOyymOumrCDtlaAg6rKDXG4gICAgICAgIGlmIChlLndoaWNoID09IGluZm8uZXZlbnRLZXlzLkJBQ0tTUEFDRSAmJiB0aGlzLnF1ZXVlW3F1ZUlkeF0uJGRpc3BsYXlMYWJlbElucHV0LnZhbCgpID09IFwiXCIpIHtcbiAgICAgICAgICAvLyDrp4jsp4Drp4kg7JWE7J207YWc7J2EIOygnOqxsC5cbiAgICAgICAgICB0aGlzLnF1ZXVlW3F1ZUlkeF0uc2VsZWN0ZWQucG9wKCk7XG4gICAgICAgICAgc3luY0xhYmVsLmNhbGwodGhpcywgcXVlSWR4KTtcbiAgICAgICAgICBwcmludExhYmVsLmNhbGwodGhpcywgcXVlSWR4KTtcbiAgICAgICAgICBmb2N1c0xhYmVsLmNhbGwodGhpcywgcXVlSWR4KTtcbiAgICAgICAgICBhbGlnbkF1dG9jb21wbGV0ZURpc3BsYXkuY2FsbCh0aGlzKTtcbiAgICAgICAgICBhbGlnbkF1dG9jb21wbGV0ZU9wdGlvbkdyb3VwLmNhbGwodGhpcyk7XG4gICAgICAgICAgVS5zdG9wRXZlbnQoZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGVib3VuY2VkRm9jdXNXb3JkKHF1ZUlkeCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgICdrZXlEb3duJzogZnVuY3Rpb24gKHF1ZUlkeCwgZSkge1xuICAgICAgbGV0IGl0ZW0gPSB0aGlzLnF1ZXVlW3F1ZUlkeF07XG4gICAgICBpZiAoZS53aGljaCA9PSBpbmZvLmV2ZW50S2V5cy5FU0MpIHtcbiAgICAgICAgY2xlYXJMYWJlbC5jYWxsKHRoaXMsIHF1ZUlkeCk7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgVS5zdG9wRXZlbnQoZSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChlLndoaWNoID09IGluZm8uZXZlbnRLZXlzLlJFVFVSTikge1xuICAgICAgICBsZXQgaW5wdXRWYWx1ZSA9IGl0ZW0uJGRpc3BsYXlMYWJlbElucHV0LnZhbCgpO1xuICAgICAgICBpZiAoaXRlbS5vcHRpb25Gb2N1c0luZGV4ID4gLTEpIHtcbiAgICAgICAgICBzZXRTZWxlY3RlZC5jYWxsKHRoaXMsIGl0ZW0uaWQsIHtcbiAgICAgICAgICAgIG9wdGlvbkluZGV4OiB7XG4gICAgICAgICAgICAgIGluZGV4OiBpdGVtLm9wdGlvbkZvY3VzSW5kZXhcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCB1bmRlZmluZWQsIFwib3B0aW9uSXRlbUNsaWNrXCIpO1xuICAgICAgICB9IGVsc2UgaWYgKGlucHV0VmFsdWUgIT0gXCJcIikge1xuICAgICAgICAgIHNldFNlbGVjdGVkLmNhbGwodGhpcywgcXVlSWR4LCBpbnB1dFZhbHVlLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBjbGVhckxhYmVsLmNhbGwodGhpcywgcXVlSWR4KTtcbiAgICAgICAgYWxpZ25BdXRvY29tcGxldGVEaXNwbGF5LmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcblxuICAgICAgICBVLnN0b3BFdmVudChlKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGUud2hpY2ggPT0gaW5mby5ldmVudEtleXMuRE9XTikge1xuICAgICAgICBmb2N1c01vdmUuY2FsbCh0aGlzLCBxdWVJZHgsIDEpO1xuICAgICAgICBVLnN0b3BFdmVudChlKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGUud2hpY2ggPT0gaW5mby5ldmVudEtleXMuVVApIHtcbiAgICAgICAgZm9jdXNNb3ZlLmNhbGwodGhpcywgcXVlSWR4LCAtMSk7XG4gICAgICAgIFUuc3RvcEV2ZW50KGUpO1xuICAgICAgfVxuICAgIH0sXG4gICAgJ2ZvY3VzJzogZnVuY3Rpb24gKHF1ZUlkeCwgZSkge1xuICAgICAgLy8gY29uc29sZS5sb2coZSk7XG4gICAgfSxcbiAgICAnYmx1cic6IGZ1bmN0aW9uIChxdWVJZHgsIGUpIHtcbiAgICAgIGJsdXJMYWJlbC5jYWxsKHRoaXMsIHF1ZUlkeCk7XG4gICAgICBVLnN0b3BFdmVudChlKTtcbiAgICB9LFxuICAgICdzZWxlY3RDaGFuZ2UnOiBmdW5jdGlvbiAocXVlSWR4LCBlKSB7XG4gICAgICBzZXRTZWxlY3RlZC5jYWxsKHRoaXMsIHF1ZUlkeCwge3ZhbHVlOiBpdGVtLiRzZWxlY3QudmFsKCl9LCB0cnVlKTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IGJsdXJMYWJlbCA9IGZ1bmN0aW9uIChxdWVJZHgpIHtcbiAgICBjbGVhckxhYmVsLmNhbGwodGhpcywgcXVlSWR4KTtcbiAgfTtcblxuXG5cbiAgaWYgKCFpdGVtLiRkaXNwbGF5KSB7XG4gICAgLy8vIO2FnO2UjOumv+yXkCDsoITri6ztlaAg7Jik67iM7KCd7Yq4IOyEoOyWuFxuICAgIGRhdGEuaW5zdGFuY2VJZCA9IHRoaXMuaW5zdGFuY2VJZDtcbiAgICBkYXRhLmlkID0gaXRlbS5pZDtcbiAgICBkYXRhLm5hbWUgPSBpdGVtLm5hbWU7XG4gICAgZGF0YS50aGVtZSA9IGl0ZW0udGhlbWU7XG4gICAgZGF0YS50YWJJbmRleCA9IGl0ZW0udGFiSW5kZXg7XG4gICAgZGF0YS5tdWx0aXBsZSA9IGl0ZW0ubXVsdGlwbGU7XG4gICAgZGF0YS5yZXNldCA9IGl0ZW0ucmVzZXQ7XG4gICAgZGF0YS5oZWlnaHQgPSBpdGVtLmhlaWdodDtcbiAgICBkYXRhLm9wdGlvbkl0ZW1IZWlnaHQgPSBpdGVtLm9wdGlvbkl0ZW1IZWlnaHQ7XG4gICAgZGF0YS5wYWRkaW5nTGVmdCA9IChpdGVtLmhlaWdodCAtIGl0ZW0ub3B0aW9uSXRlbUhlaWdodCkgLyAyO1xuICAgIGRhdGEubGFiZWwgPSBnZXRMYWJlbC5jYWxsKHRoaXMsIHF1ZUlkeCk7XG5cbiAgICBpdGVtLiRkaXNwbGF5ID0galF1ZXJ5KG11c3RhY2hlLnJlbmRlcih0bXBsLmF1dG9jb21wbGV0ZURpc3BsYXkuY2FsbCh0aGlzLCBpdGVtLmNvbHVtbktleXMpLCBkYXRhKSk7XG4gICAgaXRlbS4kZGlzcGxheVRhYmxlID0gaXRlbS4kZGlzcGxheS5maW5kKCdbZGF0YS1lbHM9XCJkaXNwbGF5LXRhYmxlXCJdJyk7XG4gICAgaXRlbS4kZGlzcGxheUxhYmVsID0gaXRlbS4kZGlzcGxheS5maW5kKCdbZGF0YS1heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheT1cImxhYmVsXCJdJyk7XG4gICAgaXRlbS4kZGlzcGxheUxhYmVsSW5wdXQgPSBpdGVtLiRkaXNwbGF5LmZpbmQoJ1tkYXRhLWF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5PVwiaW5wdXRcIl0nKTtcblxuICAgIGlmIChpdGVtLiR0YXJnZXQuZmluZChcInNlbGVjdFwiKS5nZXQoMCkpIHtcbiAgICAgIGl0ZW0uJHNlbGVjdCA9IGl0ZW0uJHRhcmdldC5maW5kKFwic2VsZWN0XCIpO1xuICAgICAgaXRlbS4kc2VsZWN0XG4gICAgICAgIC5hdHRyKFwidGFiaW5kZXhcIiwgXCItMVwiKVxuICAgICAgICAuYXR0cihcImNsYXNzXCIsIFwiZm9ybS1jb250cm9sIFwiICsgZGF0YS5mb3JtU2l6ZSk7XG5cbiAgICAgIGlmIChkYXRhLm5hbWUpIHtcbiAgICAgICAgaXRlbS4kc2VsZWN0LmF0dHIoXCJuYW1lXCIsIFwibmFtZVwiKTtcbiAgICAgIH1cbiAgICAgIGl0ZW0uJHNlbGVjdC5hdHRyKFwibXVsdGlwbGVcIiwgXCJtdWx0aXBsZVwiKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpdGVtLiRzZWxlY3QgPSBqUXVlcnkobXVzdGFjaGUucmVuZGVyKHRtcGwuZm9ybVNlbGVjdC5jYWxsKHRoaXMsIGl0ZW0uY29sdW1uS2V5cyksIGRhdGEpKTtcbiAgICAgIGl0ZW0uJHRhcmdldC5hcHBlbmQoaXRlbS4kc2VsZWN0KTtcbiAgICB9XG5cbiAgICBpdGVtLiR0YXJnZXQuYXBwZW5kKGl0ZW0uJGRpc3BsYXkpO1xuXG4gIH1cbiAgZWxzZSB7XG4gICAgcHJpbnRMYWJlbC5jYWxsKHRoaXMsIHF1ZUlkeCk7XG4gIH1cblxuICBhbGlnbkF1dG9jb21wbGV0ZURpc3BsYXkuY2FsbCh0aGlzKTtcblxuXG4gIGl0ZW0uJGRpc3BsYXlcbiAgICAub2ZmKCdjbGljay5heDZ1aS1hdXRvY29tcGxldGUnKVxuICAgIC5vbignY2xpY2suYXg2dWktYXV0b2NvbXBsZXRlJywgYXV0b2NvbXBsZXRlRXZlbnQuY2xpY2suYmluZCh0aGlzLCBxdWVJZHgpKTtcblxuICAvLyBhdXRvY29tcGxldGUg7YOc6re47JeQIOuMgO2VnCDsnbTrsqTtirgg6rCQ7IucXG5cbiAgaXRlbS4kZGlzcGxheUxhYmVsSW5wdXRcbiAgICAub2ZmKFwiZm9jdXMuYXg2dWktYXV0b2NvbXBsZXRlXCIpXG4gICAgLm9uKFwiZm9jdXMuYXg2dWktYXV0b2NvbXBsZXRlXCIsIGF1dG9jb21wbGV0ZUV2ZW50LmZvY3VzLmJpbmQodGhpcywgcXVlSWR4KSlcbiAgICAub2ZmKFwiYmx1ci5heDZ1aS1hdXRvY29tcGxldGVcIilcbiAgICAub24oXCJibHVyLmF4NnVpLWF1dG9jb21wbGV0ZVwiLCBhdXRvY29tcGxldGVFdmVudC5ibHVyLmJpbmQodGhpcywgcXVlSWR4KSlcbiAgICAub2ZmKFwia2V5ZG93bi5heDZ1aS1hdXRvY29tcGxldGVcIilcbiAgICAub24oXCJrZXlkb3duLmF4NnVpLWF1dG9jb21wbGV0ZVwiLCBhdXRvY29tcGxldGVFdmVudC5rZXlEb3duLmJpbmQodGhpcywgcXVlSWR4KSlcbiAgICAub2ZmKFwia2V5dXAuYXg2dWktYXV0b2NvbXBsZXRlXCIpXG4gICAgLm9uKFwia2V5dXAuYXg2dWktYXV0b2NvbXBsZXRlXCIsIGF1dG9jb21wbGV0ZUV2ZW50LmtleVVwLmJpbmQodGhpcywgcXVlSWR4KSk7XG5cbiAgLy8gc2VsZWN0IO2DnOq3uOyXkCDrjIDtlZwgY2hhbmdlIOydtOuypO2KuCDqsJDsi5xcblxuICAvKlxuICAgIGl0ZW0uJHNlbGVjdFxuICAgICAgLm9mZignY2hhbmdlLmF4NnVpLWF1dG9jb21wbGV0ZScpXG4gICAgICAub24oJ2NoYW5nZS5heDZ1aS1hdXRvY29tcGxldGUnLCBhdXRvY29tcGxldGVFdmVudC5zZWxlY3RDaGFuZ2UuYmluZCh0aGlzLCBxdWVJZHgpKTtcbiAgICAqL1xuXG4gIGRhdGEgPSBudWxsO1xuICBpdGVtID0gbnVsbDtcbiAgcXVlSWR4ID0gbnVsbDtcbiAgcmV0dXJuIHRoaXM7XG59O1xuY29uc3QgZ2V0UXVlSWR4ID0gZnVuY3Rpb24gKGJvdW5kSUQpIHtcbiAgaWYgKGJvdW5kSUQgaW5zdGFuY2VvZiBqUXVlcnkpIHtcbiAgICBib3VuZElEID0gYm91bmRJRC5kYXRhKFwiZGF0YS1heDZ1aS1hdXRvY29tcGxldGUtaWRcIik7XG4gIH0gZWxzZSBpZiAoIVUuaXNTdHJpbmcoYm91bmRJRCkpIHtcbiAgICBib3VuZElEID0galF1ZXJ5KGJvdW5kSUQpLmRhdGEoXCJkYXRhLWF4NnVpLWF1dG9jb21wbGV0ZS1pZFwiKTtcbiAgfVxuICBpZiAoIVUuaXNTdHJpbmcoYm91bmRJRCkpIHtcbiAgICBjb25zb2xlLmxvZyhpbmZvLmdldEVycm9yKFwiYXg2dWktYXV0b2NvbXBsZXRlXCIsIFwiNDAyXCIsIFwiZ2V0UXVlSWR4XCIpKTtcbiAgICByZXR1cm47XG4gIH1cbiAgcmV0dXJuIFUuc2VhcmNoKHRoaXMucXVldWUsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5pZCA9PSBib3VuZElEO1xuICB9KTtcbn07XG5jb25zdCBnZXRTZWxlY3RlZCA9IGZ1bmN0aW9uIChfaXRlbSwgbywgc2VsZWN0ZWQpIHtcbiAgaWYgKHR5cGVvZiBzZWxlY3RlZCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiAoX2l0ZW0ubXVsdGlwbGUpID8gIW8gOiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBzZWxlY3RlZDtcbiAgfVxufTtcbmNvbnN0IGNsZWFyU2VsZWN0ZWQgPSBmdW5jdGlvbiAocXVlSWR4KSB7XG4gIHRoaXMucXVldWVbcXVlSWR4XS5vcHRpb25zLmZvckVhY2goZnVuY3Rpb24gKG4pIHtcbiAgICBpZiAobi5vcHRncm91cCkge1xuICAgICAgbi5vcHRpb25zLmZvckVhY2goZnVuY3Rpb24gKG5uKSB7XG4gICAgICAgIG5uLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBuLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgfVxuICB9KTtcblxuICB0aGlzLnF1ZXVlW3F1ZUlkeF0uc2VsZWN0ZWQgPSBbXTtcbiAgdGhpcy5xdWV1ZVtxdWVJZHhdLiRzZWxlY3QuaHRtbChcbiAgICBtdXN0YWNoZS5yZW5kZXIodG1wbC5mb3JtU2VsZWN0T3B0aW9ucy5jYWxsKHRoaXMsIHRoaXMucXVldWVbcXVlSWR4XS5jb2x1bW5LZXlzKSwge1xuICAgICAgc2VsZWN0ZWQ6IHRoaXMucXVldWVbcXVlSWR4XS5zZWxlY3RlZFxuICAgIH0pXG4gICk7XG59O1xuY29uc3Qgc2V0U2VsZWN0ZWQgPSBmdW5jdGlvbiAoYm91bmRJRCwgdmFsdWUsIHNlbGVjdGVkLCBfb3B0aW9uKSB7XG4gIGNvbnN0IHByb2Nlc3NvciA9IHtcbiAgICAnc2VsZWN0ZWRJbmRleCc6IGZ1bmN0aW9uIChxdWVJZHgsIHZhbHVlLCBzZWxlY3RlZCwgc2V0VmFsdWVUeXBlKSB7XG5cbiAgICB9LFxuICAgICdyZW1vdmVTZWxlY3RlZEluZGV4JzogZnVuY3Rpb24gKHF1ZUlkeCwgdmFsdWUsIHNlbGVjdGVkLCBzZXRWYWx1ZVR5cGUpIHtcbiAgICAgIHZhciBpdGVtID0gdGhpcy5xdWV1ZVtxdWVJZHhdLCBhZGRPcHRpb25zID0ge307XG4gICAgICB2YXIgbmV3U2VsZWN0ZWRBcnJheSA9IFtdLCBvcHRpb25JbmRleCA9IDA7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW0uc2VsZWN0ZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGl0ZW0uc2VsZWN0ZWRbaV1bJ0BpbmRleCddICE9IHZhbHVlLnJlbW92ZVNlbGVjdGVkSW5kZXguaW5kZXgpIHtcbiAgICAgICAgICBhZGRPcHRpb25zID0geydAaW5kZXgnOiBvcHRpb25JbmRleCwgJ0BmaW5kZXgnOiBvcHRpb25JbmRleH07XG4gICAgICAgICAgYWRkT3B0aW9uc1tpdGVtLmNvbHVtbktleXMub3B0aW9uVmFsdWVdID0gaXRlbS5zZWxlY3RlZFtpXVtpdGVtLmNvbHVtbktleXMub3B0aW9uVmFsdWVdO1xuICAgICAgICAgIGFkZE9wdGlvbnNbaXRlbS5jb2x1bW5LZXlzLm9wdGlvblRleHRdID0gaXRlbS5zZWxlY3RlZFtpXVtpdGVtLmNvbHVtbktleXMub3B0aW9uVGV4dF07XG4gICAgICAgICAgbmV3U2VsZWN0ZWRBcnJheS5wdXNoKGFkZE9wdGlvbnMpO1xuICAgICAgICAgIG9wdGlvbkluZGV4Kys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGl0ZW0uc2VsZWN0ZWQgPSBuZXdTZWxlY3RlZEFycmF5O1xuICAgIH0sXG4gICAgJ29wdGlvbkluZGV4JzogZnVuY3Rpb24gKHF1ZUlkeCwgdmFsdWUsIHNlbGVjdGVkLCBzZXRWYWx1ZVR5cGUpIHtcbiAgICAgIHZhciBpdGVtID0gdGhpcy5xdWV1ZVtxdWVJZHhdLCBhZGRPcHRpb25zID0ge307XG4gICAgICB2YXIgb3B0aW9uSW5kZXggPSBpdGVtLnNlbGVjdGVkLmxlbmd0aDtcbiAgICAgIHZhciBwdXNoT2sgPSB0cnVlO1xuXG4gICAgICBhZGRPcHRpb25zID0ge1xuICAgICAgICAnQGluZGV4Jzogb3B0aW9uSW5kZXgsICdAZmluZGV4Jzogb3B0aW9uSW5kZXhcbiAgICAgIH07XG4gICAgICBhZGRPcHRpb25zW2l0ZW0uY29sdW1uS2V5cy5vcHRpb25WYWx1ZV0gPSBpdGVtLm9wdGlvbnNbdmFsdWUub3B0aW9uSW5kZXguaW5kZXhdW2l0ZW0uY29sdW1uS2V5cy5vcHRpb25WYWx1ZV07XG4gICAgICBhZGRPcHRpb25zW2l0ZW0uY29sdW1uS2V5cy5vcHRpb25UZXh0XSA9IGl0ZW0ub3B0aW9uc1t2YWx1ZS5vcHRpb25JbmRleC5pbmRleF1baXRlbS5jb2x1bW5LZXlzLm9wdGlvblRleHRdO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW0uc2VsZWN0ZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGl0ZW0uc2VsZWN0ZWRbaV1baXRlbS5jb2x1bW5LZXlzLm9wdGlvblZhbHVlXSA9PSBhZGRPcHRpb25zW2l0ZW0uY29sdW1uS2V5cy5vcHRpb25WYWx1ZV0pIHtcbiAgICAgICAgICBwdXNoT2sgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHB1c2hPaykgaXRlbS5zZWxlY3RlZC5wdXNoKGFkZE9wdGlvbnMpO1xuICAgIH0sXG4gICAgJ2Fycic6IGZ1bmN0aW9uIChxdWVJZHgsIHZhbHVlcywgc2VsZWN0ZWQsIHNldFZhbHVlVHlwZSkge1xuICAgICAgdmFsdWVzLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmIChVLmlzU3RyaW5nKHZhbHVlKSB8fCBVLmlzTnVtYmVyKHZhbHVlKSkge1xuICAgICAgICAgIHByb2Nlc3Nvci50ZXh0LmNhbGwoc2VsZiwgcXVlSWR4LCB2YWx1ZSwgc2VsZWN0ZWQsIFwianVzdFNldFZhbHVlXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGZvciAodmFyIGtleSBpbiBwcm9jZXNzb3IpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZVtrZXldKSB7XG4gICAgICAgICAgICAgIHByb2Nlc3NvcltrZXldLmNhbGwoc2VsZiwgcXVlSWR4LCB2YWx1ZSwgc2VsZWN0ZWQsIFwianVzdFNldFZhbHVlXCIpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sXG4gICAgJ3ZhbHVlJzogZnVuY3Rpb24gKHF1ZUlkeCwgdmFsdWUsIHNlbGVjdGVkLCBzZXRWYWx1ZVR5cGUpIHtcbiAgICAgIHZhciBpdGVtID0gdGhpcy5xdWV1ZVtxdWVJZHhdO1xuICAgICAgdmFyIGFkZE9wdGlvbnM7XG4gICAgICB2YXIgb3B0aW9uSW5kZXggPSBVLnNlYXJjaChpdGVtLm9wdGlvbnMsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbaXRlbS5jb2x1bW5LZXlzLm9wdGlvblZhbHVlXSA9PSB2YWx1ZS52YWx1ZVtpdGVtLmNvbHVtbktleXMub3B0aW9uVmFsdWVdO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChvcHRpb25JbmRleCA+IC0xKSB7XG4gICAgICAgIGl0ZW0ub3B0aW9uc1tvcHRpb25JbmRleF1baXRlbS5jb2x1bW5LZXlzLm9wdGlvblNlbGVjdGVkXVxuICAgICAgICAgID0gZ2V0U2VsZWN0ZWQoaXRlbSwgaXRlbS5vcHRpb25zW29wdGlvbkluZGV4XVtpdGVtLmNvbHVtbktleXMub3B0aW9uU2VsZWN0ZWRdLCBzZWxlY3RlZCk7XG5cbiAgICAgICAgaWYgKGl0ZW0ub3B0aW9uc1tvcHRpb25JbmRleF1baXRlbS5jb2x1bW5LZXlzLm9wdGlvblNlbGVjdGVkXSkge1xuICAgICAgICAgIHZhciBhcHBlbmRPayA9IHRydWU7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtLnNlbGVjdGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaXRlbS5zZWxlY3RlZFtpXVt0aGlzLmNvbmZpZy5jb2x1bW5LZXlzLm9wdGlvblZhbHVlXSA9PSBpdGVtLm9wdGlvbnNbb3B0aW9uSW5kZXhdW3RoaXMuY29uZmlnLmNvbHVtbktleXMub3B0aW9uVmFsdWVdKSB7XG4gICAgICAgICAgICAgIGFwcGVuZE9rID0gZmFsc2U7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYXBwZW5kT2spIHtcbiAgICAgICAgICAgIGFkZE9wdGlvbnMgPSB7fTtcbiAgICAgICAgICAgIGFkZE9wdGlvbnNbaXRlbS5jb2x1bW5LZXlzLm9wdGlvblZhbHVlXSA9IGl0ZW0ub3B0aW9uc1tvcHRpb25JbmRleF1baXRlbS5jb2x1bW5LZXlzLm9wdGlvblZhbHVlXTtcbiAgICAgICAgICAgIGFkZE9wdGlvbnNbaXRlbS5jb2x1bW5LZXlzLm9wdGlvblRleHRdID0gaXRlbS5vcHRpb25zW29wdGlvbkluZGV4XVtpdGVtLmNvbHVtbktleXMub3B0aW9uVGV4dF07XG4gICAgICAgICAgICBpdGVtLnNlbGVjdGVkLnB1c2goYWRkT3B0aW9ucyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHZhciBuZXdTZWxlY3RlZEFycmF5ID0gW107XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtLnNlbGVjdGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaXRlbS5zZWxlY3RlZFtpXVt0aGlzLmNvbmZpZy5jb2x1bW5LZXlzLm9wdGlvblZhbHVlXSA9PSBpdGVtLm9wdGlvbnNbb3B0aW9uSW5kZXhdW3RoaXMuY29uZmlnLmNvbHVtbktleXMub3B0aW9uVmFsdWVdKSB7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBhZGRPcHRpb25zID0ge307XG4gICAgICAgICAgICAgIGFkZE9wdGlvbnNbaXRlbS5jb2x1bW5LZXlzLm9wdGlvblZhbHVlXSA9IGl0ZW0uc2VsZWN0ZWRbaV1baXRlbS5jb2x1bW5LZXlzLm9wdGlvblZhbHVlXTtcbiAgICAgICAgICAgICAgYWRkT3B0aW9uc1tpdGVtLmNvbHVtbktleXMub3B0aW9uVGV4dF0gPSBpdGVtLnNlbGVjdGVkW2ldW2l0ZW0uY29sdW1uS2V5cy5vcHRpb25UZXh0XTtcbiAgICAgICAgICAgICAgbmV3U2VsZWN0ZWRBcnJheS5wdXNoKGFkZE9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpdGVtLnNlbGVjdGVkID0gbmV3U2VsZWN0ZWRBcnJheTtcbiAgICAgICAgfVxuXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgLy8g7IOI66Gc7Jq0IOqwkiDstpTqsIBcbiAgICAgICAgdmFyIGFwcGVuZE9rID0gdHJ1ZTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtLnNlbGVjdGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGl0ZW0uc2VsZWN0ZWRbaV1bdGhpcy5jb25maWcuY29sdW1uS2V5cy5vcHRpb25WYWx1ZV0gPT0gdmFsdWUudmFsdWVbdGhpcy5jb25maWcuY29sdW1uS2V5cy5vcHRpb25WYWx1ZV0pIHtcbiAgICAgICAgICAgIGFwcGVuZE9rID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYXBwZW5kT2spIHtcbiAgICAgICAgICBhZGRPcHRpb25zID0ge307XG4gICAgICAgICAgYWRkT3B0aW9uc1tpdGVtLmNvbHVtbktleXMub3B0aW9uVmFsdWVdID0gdmFsdWUudmFsdWVbdGhpcy5jb25maWcuY29sdW1uS2V5cy5vcHRpb25WYWx1ZV07XG4gICAgICAgICAgYWRkT3B0aW9uc1tpdGVtLmNvbHVtbktleXMub3B0aW9uVGV4dF0gPSB2YWx1ZS52YWx1ZVt0aGlzLmNvbmZpZy5jb2x1bW5LZXlzLm9wdGlvblRleHRdO1xuICAgICAgICAgIGl0ZW0uc2VsZWN0ZWQucHVzaChhZGRPcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgJ3RleHQnOiBmdW5jdGlvbiAocXVlSWR4LCB2YWx1ZSwgc2VsZWN0ZWQsIHNldFZhbHVlVHlwZSkge1xuICAgICAgdmFyIGl0ZW0gPSB0aGlzLnF1ZXVlW3F1ZUlkeF07XG4gICAgICB2YXIgYWRkT3B0aW9ucztcbiAgICAgIHZhciBvcHRpb25JbmRleCA9IFUuc2VhcmNoKGl0ZW0ub3B0aW9ucywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpc1tpdGVtLmNvbHVtbktleXMub3B0aW9uVGV4dF0gPT0gdmFsdWU7XG4gICAgICB9KTtcblxuICAgICAgaWYgKG9wdGlvbkluZGV4ID4gLTEpIHtcbiAgICAgICAgaXRlbS5vcHRpb25zW29wdGlvbkluZGV4XVtpdGVtLmNvbHVtbktleXMub3B0aW9uU2VsZWN0ZWRdXG4gICAgICAgICAgPSBnZXRTZWxlY3RlZChpdGVtLCBpdGVtLm9wdGlvbnNbb3B0aW9uSW5kZXhdW2l0ZW0uY29sdW1uS2V5cy5vcHRpb25TZWxlY3RlZF0sIHNlbGVjdGVkKTtcblxuICAgICAgICBpZiAoaXRlbS5vcHRpb25zW29wdGlvbkluZGV4XVtpdGVtLmNvbHVtbktleXMub3B0aW9uU2VsZWN0ZWRdKSB7XG4gICAgICAgICAgdmFyIGFwcGVuZE9rID0gdHJ1ZTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW0uc2VsZWN0ZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChpdGVtLnNlbGVjdGVkW2ldW3RoaXMuY29uZmlnLmNvbHVtbktleXMub3B0aW9uVGV4dF0gPT0gaXRlbS5vcHRpb25zW29wdGlvbkluZGV4XVt0aGlzLmNvbmZpZy5jb2x1bW5LZXlzLm9wdGlvblRleHRdKSB7XG4gICAgICAgICAgICAgIGFwcGVuZE9rID0gZmFsc2U7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYXBwZW5kT2spIHtcbiAgICAgICAgICAgIGFkZE9wdGlvbnMgPSB7fTtcbiAgICAgICAgICAgIGFkZE9wdGlvbnNbaXRlbS5jb2x1bW5LZXlzLm9wdGlvblZhbHVlXSA9IGl0ZW0ub3B0aW9uc1tvcHRpb25JbmRleF1baXRlbS5jb2x1bW5LZXlzLm9wdGlvblZhbHVlXTtcbiAgICAgICAgICAgIGFkZE9wdGlvbnNbaXRlbS5jb2x1bW5LZXlzLm9wdGlvblRleHRdID0gaXRlbS5vcHRpb25zW29wdGlvbkluZGV4XVtpdGVtLmNvbHVtbktleXMub3B0aW9uVGV4dF07XG4gICAgICAgICAgICBpdGVtLnNlbGVjdGVkLnB1c2goYWRkT3B0aW9ucyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHZhciBuZXdTZWxlY3RlZEFycmF5ID0gW107XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtLnNlbGVjdGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaXRlbS5zZWxlY3RlZFtpXVt0aGlzLmNvbmZpZy5jb2x1bW5LZXlzLm9wdGlvblRleHRdID09IGl0ZW0ub3B0aW9uc1tvcHRpb25JbmRleF1bdGhpcy5jb25maWcuY29sdW1uS2V5cy5vcHRpb25UZXh0XSkge1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgYWRkT3B0aW9ucyA9IHt9O1xuICAgICAgICAgICAgICBhZGRPcHRpb25zW2l0ZW0uY29sdW1uS2V5cy5vcHRpb25WYWx1ZV0gPSBpdGVtLnNlbGVjdGVkW2ldW2l0ZW0uY29sdW1uS2V5cy5vcHRpb25WYWx1ZV07XG4gICAgICAgICAgICAgIGFkZE9wdGlvbnNbaXRlbS5jb2x1bW5LZXlzLm9wdGlvblRleHRdID0gaXRlbS5zZWxlY3RlZFtpXVtpdGVtLmNvbHVtbktleXMub3B0aW9uVGV4dF07XG4gICAgICAgICAgICAgIG5ld1NlbGVjdGVkQXJyYXkucHVzaChhZGRPcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaXRlbS5zZWxlY3RlZCA9IG5ld1NlbGVjdGVkQXJyYXk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICAvLyDsg4jroZzsmrQg6rCSIOy2lOqwgFxuICAgICAgICB2YXIgYXBwZW5kT2sgPSB0cnVlO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW0uc2VsZWN0ZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoaXRlbS5zZWxlY3RlZFtpXVt0aGlzLmNvbmZpZy5jb2x1bW5LZXlzLm9wdGlvblRleHRdID09IHZhbHVlKSB7XG4gICAgICAgICAgICBhcHBlbmRPayA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFwcGVuZE9rKSB7XG4gICAgICAgICAgYWRkT3B0aW9ucyA9IHt9O1xuICAgICAgICAgIGFkZE9wdGlvbnNbaXRlbS5jb2x1bW5LZXlzLm9wdGlvblZhbHVlXSA9IHZhbHVlO1xuICAgICAgICAgIGFkZE9wdGlvbnNbaXRlbS5jb2x1bW5LZXlzLm9wdGlvblRleHRdID0gdmFsdWU7XG4gICAgICAgICAgaXRlbS5zZWxlY3RlZC5wdXNoKGFkZE9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICAnY2xlYXInOiBmdW5jdGlvbiAocXVlSWR4KSB7XG4gICAgICBjbGVhclNlbGVjdGVkLmNhbGwodGhpcywgcXVlSWR4KTtcbiAgICAgIGZvY3VzQ2xlYXIuY2FsbCh0aGlzLCBxdWVJZHgpO1xuXG4gICAgICBpZiAodGhpcy5hY3RpdmVhdXRvY29tcGxldGVPcHRpb25Hcm91cCkge1xuICAgICAgICB0aGlzLmFjdGl2ZWF1dG9jb21wbGV0ZU9wdGlvbkdyb3VwXG4gICAgICAgICAgLmZpbmQoJ1tkYXRhLW9wdGlvbi1pbmRleF0nKVxuICAgICAgICAgIC5hdHRyKFwiZGF0YS1vcHRpb24tU2VsZWN0ZWRcIiwgXCJmYWxzZVwiKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucXVldWVbcXVlSWR4XS5vcHRpb25TZWxlY3RlZEluZGV4ID0gLTE7XG4gICAgfVxuICB9O1xuXG4gIGxldCBxdWVJZHggPSAoVS5pc051bWJlcihib3VuZElEKSkgPyBib3VuZElEIDogZ2V0UXVlSWR4LmNhbGwodGhpcywgYm91bmRJRCk7XG4gIGlmIChxdWVJZHggPT09IC0xKSB7XG4gICAgY29uc29sZS5sb2coaW5mby5nZXRFcnJvcihcImF4NnVpLWF1dG9jb21wbGV0ZVwiLCBcIjQwMlwiLCBcInZhbFwiKSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdGhyb3cgXCJlcnJvciBub3QgZm91bmQgdmFsdWVcIjtcbiAgfVxuICBlbHNlIGlmIChVLmlzQXJyYXkodmFsdWUpKSB7XG4gICAgcHJvY2Vzc29yLmNsZWFyLmNhbGwodGhpcywgcXVlSWR4KTtcbiAgICBwcm9jZXNzb3IuYXJyLmNhbGwodGhpcywgcXVlSWR4LCAodGhpcy5xdWV1ZVtxdWVJZHhdLm11bHRpcGxlIHx8IHZhbHVlLmxlbmd0aCA9PSAwKSA/IHZhbHVlIDogW3ZhbHVlW3ZhbHVlLmxlbmd0aCAtIDFdXSwgc2VsZWN0ZWQpO1xuICB9XG4gIGVsc2UgaWYgKFUuaXNTdHJpbmcodmFsdWUpIHx8IFUuaXNOdW1iZXIodmFsdWUpKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB2YWx1ZSAhPT0gbnVsbCAmJiAhdGhpcy5xdWV1ZVtxdWVJZHhdLm11bHRpcGxlKSB7XG4gICAgICBjbGVhclNlbGVjdGVkLmNhbGwodGhpcywgcXVlSWR4KTtcbiAgICB9XG4gICAgcHJvY2Vzc29yLnRleHQuY2FsbCh0aGlzLCBxdWVJZHgsIHZhbHVlLCBzZWxlY3RlZCk7XG4gIH1cbiAgZWxzZSB7XG4gICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICBwcm9jZXNzb3IuY2xlYXIuY2FsbCh0aGlzLCBxdWVJZHgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGlmICghdGhpcy5xdWV1ZVtxdWVJZHhdLm11bHRpcGxlKSB7XG4gICAgICAgIGNsZWFyU2VsZWN0ZWQuY2FsbCh0aGlzLCBxdWVJZHgpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIga2V5IGluIHByb2Nlc3Nvcikge1xuICAgICAgICBpZiAodmFsdWVba2V5XSkge1xuICAgICAgICAgIHByb2Nlc3NvcltrZXldLmNhbGwodGhpcywgcXVlSWR4LCB2YWx1ZSwgc2VsZWN0ZWQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3luY0xhYmVsLmNhbGwodGhpcywgcXVlSWR4KTtcbiAgcHJpbnRMYWJlbC5jYWxsKHRoaXMsIHF1ZUlkeCk7XG4gIGZvY3VzTGFiZWwuY2FsbCh0aGlzLCBxdWVJZHgpO1xuICBhbGlnbkF1dG9jb21wbGV0ZU9wdGlvbkdyb3VwLmNhbGwodGhpcyk7XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGlmIChfb3B0aW9uICYmICFfb3B0aW9uLm5vU3RhdGVDaGFuZ2UpIHtcbiAgICAgIG9uU3RhdGVDaGFuZ2VkLmNhbGwodGhpcywgdGhpcy5xdWV1ZVtxdWVJZHhdLCB7XG4gICAgICAgIHNlbGY6IHRoaXMsXG4gICAgICAgIGl0ZW06IHRoaXMucXVldWVbcXVlSWR4XSxcbiAgICAgICAgc3RhdGU6IFwiY2hhbmdlVmFsdWVcIixcbiAgICAgICAgdmFsdWU6IHRoaXMucXVldWVbcXVlSWR4XS5zZWxlY3RlZFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgYm91bmRJRCA9IG51bGw7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyogfn5+fn5+fn5+fn5+fn5+fn5+IGVuZCBvZiBwcml2YXRlICB+fn5+fn5+fn5+fn5+fn5+fn5+fiAqL1xuXG4vKipcbiAqIEBjbGFzc1xuICovXG5jbGFzcyBBWDZVSUF1dG9jb21wbGV0ZSBleHRlbmRzIEFYNlVJQ29yZSB7XG4gIC8qKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIGNvbmZpZ1xuICAgKi9cbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIC8qKlxuICAgICAqIEBtZW1iZXIge0pTT059XG4gICAgICogQHBhcmFtIGNvbmZpZ1xuICAgICAqIEBwYXJhbSBbY29uZmlnLnRoZW1lPSdkZWZhdWx0J11cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5hbmltYXRlVGltZT0yNTBdXG4gICAgICogQHBhcmFtIFtjb25maWcuaGVpZ2h0PTM0XVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmxhbmddIC0g66mU7IS47KeA65OkXG4gICAgICogQHBhcmFtIFtjb25maWcubGFuZy5ub1NlbGVjdGVkPScnXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmxhbmcubm9PcHRpb25zPSdubyBvcHRpb25zJ11cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5sYW5nLmxvYWRpbmc9J25vdyBsb2FkaW5nLi4nXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmNvbHVtbktleXNdIC0g64K067aA7JeQ7IScIOyCrOyaqSBKU09OIGtleSDsoJXsnZhcbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5jb2x1bW5LZXlzLm9wdGlvblZhbHVlPSd2YWx1ZSddXG4gICAgICogQHBhcmFtIFtjb25maWcuY29sdW1uS2V5cy5vcHRpb25UZXh0PSd0ZXh0J11cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5jb2x1bW5LZXlzLm9wdGlvblNlbGVjdGVkPSdzZWxlY3RlZCddXG4gICAgICovXG4gICAgdGhpcy5jb25maWcgPSB7XG4gICAgICB0aGVtZTogJ2RlZmF1bHQnLFxuICAgICAgYW5pbWF0ZVRpbWU6IDI1MCxcbiAgICAgIGhlaWdodDogMzQsXG4gICAgICBvcHRpb25JdGVtSGVpZ2h0OiAyNCxcbiAgICAgIGJvcmRlcldpZHRoOiAxLFxuICAgICAgcmVtb3ZlSWNvbjogJ1UrMDBkNycsXG4gICAgICBsYW5nOiB7XG4gICAgICAgIG5vU2VsZWN0ZWQ6ICcnLFxuICAgICAgICBub09wdGlvbnM6ICdubyBvcHRpb25zJyxcbiAgICAgICAgbG9hZGluZzogJ05vdyBQcm9jZXNzaW5nJ1xuICAgICAgfSxcbiAgICAgIGNvbHVtbktleXM6IHtcbiAgICAgICAgb3B0aW9uVmFsdWU6ICd2YWx1ZScsXG4gICAgICAgIG9wdGlvblRleHQ6ICd0ZXh0JyxcbiAgICAgICAgb3B0aW9uU2VsZWN0ZWQ6ICdzZWxlY3RlZCdcbiAgICAgIH1cbiAgICB9O1xuICAgIGpRdWVyeS5leHRlbmQodHJ1ZSwgdGhpcy5jb25maWcsIGNvbmZpZyk7XG5cbiAgICAvLyDrqaTrsoQg67OA7IiYIOy0iOq4sO2ZlFxuICAgIC8qKlxuICAgICAqIGJpbmTrpbwg7Ya17ZW0IOyXsOqysOuQnCBzZWxlY3TqsIAg7KCA7J6l65CY64qUIOuzgOyImFxuICAgICAqIEBtZW1iZXIge0FycmF5fVxuICAgICAqL1xuICAgIHRoaXMucXVldWUgPSBbXTtcbiAgICAvKipcbiAgICAgKiBAbWVtYmVyIHtPYmplY3R9XG4gICAgICovXG4gICAgdGhpcy5hY3RpdmVhdXRvY29tcGxldGVPcHRpb25Hcm91cCA9IG51bGw7XG4gICAgLyoqXG4gICAgICogQG1lbWJlciB7TnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMuYWN0aXZlYXV0b2NvbXBsZXRlUXVldWVJbmRleCA9IC0xO1xuICAgIC8qKlxuICAgICAqIEBtZW1iZXIge09iamVjdH1cbiAgICAgKi9cbiAgICB0aGlzLm9wZW5UaW1lciA9IG51bGw7XG4gICAgLyoqXG4gICAgICogQG1lbWJlciB7T2JqZWN0fVxuICAgICAqL1xuICAgIHRoaXMuY2xvc2VUaW1lciA9IG51bGw7XG4gICAgLyoqXG4gICAgICogQG1lbWJlciB7RnVuY3Rpb259XG4gICAgICovXG4gICAgdGhpcy53YWl0T3B0aW9uc0NhbGxiYWNrID0gbnVsbDtcbiAgICAvKipcbiAgICAgKiBAbWVtYmVyIHtPYmplY3R9XG4gICAgICovXG4gICAgdGhpcy5rZXlVcFRpbWVyID0gbnVsbDtcbiAgICAvKipcbiAgICAgKiBAbWVtYmVyIHtPYmplY3R9XG4gICAgICovXG4gICAgdGhpcy54dmFyID0ge307XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBwYXJhbSBjb25maWdcbiAgICovXG4gIGluaXQoKSB7XG4gICAgdGhpcy5vblN0YXRlQ2hhbmdlZCA9IHRoaXMuY29uZmlnLm9uU3RhdGVDaGFuZ2VkO1xuICAgIGRlbGV0ZSB0aGlzLmNvbmZpZy5vblN0YXRlQ2hhbmdlZDtcbiAgICB0aGlzLm9uQ2hhbmdlID0gdGhpcy5jb25maWcub25DaGFuZ2U7XG4gICAgZGVsZXRlIHRoaXMuY29uZmlnLm9uQ2hhbmdlO1xuXG4gICAgLy8gaW5pdCDtmLjstpwg7Jes67aAXG4gICAgdGhpcy5pbml0T25jZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICovXG4gIGluaXRPbmNlKCkge1xuICAgIGlmICh0aGlzLmluaXRpYWxpemVkKSByZXR1cm4gdGhpcztcbiAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcblxuICAgIC8vIHRocm90dGxlZFJlc2l6ZVxuICAgIGpRdWVyeSh3aW5kb3cpLm9uKFwicmVzaXplLmF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5LVwiICsgdGhpcy5pbnN0YW5jZUlkLCBVLnRocm90dGxlKGZ1bmN0aW9uIChlKSB7XG4gICAgICBhbGlnbkF1dG9jb21wbGV0ZURpc3BsYXkuY2FsbCh0aGlzLCBlIHx8IHdpbmRvdy5ldmVudCk7XG4gICAgICBhbGlnbkF1dG9jb21wbGV0ZU9wdGlvbkdyb3VwLmNhbGwodGhpcyk7XG4gICAgfSwgMTAwKS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBiaW5kIGF1dG9jb21wbGV0ZVxuICAgKiBAbWV0aG9kXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbaXRlbS5pZF1cbiAgICogQHBhcmFtIHtTdHJpbmd9IFtpdGVtLnRoZW1lXVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtpdGVtLm11bHRpcGxlXVxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IGl0ZW0udGFyZ2V0XG4gICAqIEByZXR1cm4ge0FYNlVJQXV0b2NvbXBsZXRlfVxuICAgKi9cbiAgYmluZChpdGVtKSB7XG4gICAgbGV0IHF1ZUlkeDtcbiAgICBpdGVtID0galF1ZXJ5LmV4dGVuZCh0cnVlLCB7fSwgdGhpcy5jb25maWcsIGl0ZW0pO1xuXG4gICAgaWYgKCFpdGVtLnRhcmdldCkge1xuICAgICAgY29uc29sZS5sb2coaW5mby5nZXRFcnJvcihcImF4NnVpLWF1dG9jb21wbGV0ZVwiLCBcIjQwMVwiLCBcImJpbmRcIikpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGl0ZW0uJHRhcmdldCA9IGpRdWVyeShpdGVtLnRhcmdldCk7XG5cbiAgICBpZiAoIWl0ZW0uaWQpIGl0ZW0uaWQgPSBpdGVtLiR0YXJnZXQuZGF0YShcImRhdGEtYXg2dWktYXV0b2NvbXBsZXRlLWlkXCIpO1xuICAgIGlmICghaXRlbS5pZCkge1xuICAgICAgaXRlbS5pZCA9ICdheDZ1aS1hdXRvY29tcGxldGUtJyArIEFYNlVJQ29yZS5nZXRJbnN0YW5jZUlkKCk7XG4gICAgICBpdGVtLiR0YXJnZXQuZGF0YShcImRhdGEtYXg2dWktYXV0b2NvbXBsZXRlLWlkXCIsIGl0ZW0uaWQpO1xuICAgIH1cbiAgICBpdGVtLm5hbWUgPSBpdGVtLiR0YXJnZXQuYXR0cihcImRhdGEtYXg2dWktYXV0b2NvbXBsZXRlXCIpO1xuXG4gICAgaXRlbS5vcHRpb25zID0gW107XG4gICAgaXRlbS5zZWxlY3RlZCA9IFtdO1xuXG4gICAgLy8gdGFyZ2V0IGF0dHJpYnV0ZSBkYXRhXG4gICAgKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICBpZiAoVS5pc09iamVjdChkYXRhKSAmJiAhZGF0YS5lcnJvcikge1xuICAgICAgICBpdGVtID0galF1ZXJ5LmV4dGVuZCh0cnVlLCBpdGVtLCBkYXRhKTtcbiAgICAgIH1cbiAgICB9KShVLnBhcnNlSnNvbihpdGVtLiR0YXJnZXQuYXR0cihcImRhdGEtYXg2dWktYXV0b2NvbXBsZXRlLWNvbmZpZ1wiKSwgdHJ1ZSkpO1xuXG4gICAgcXVlSWR4ID0gVS5zZWFyY2godGhpcy5xdWV1ZSwgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaWQgPT0gaXRlbS5pZDtcbiAgICB9KTtcblxuICAgIGlmIChxdWVJZHggPT09IC0xKSB7XG4gICAgICB0aGlzLnF1ZXVlLnB1c2goaXRlbSk7XG4gICAgICBiaW5kQXV0b2NvbXBsZXRlVGFyZ2V0LmNhbGwodGhpcywgdGhpcy5xdWV1ZS5sZW5ndGggLSAxKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLnF1ZXVlW3F1ZUlkeF0uc2VsZWN0ZWQgPSBbXTtcbiAgICAgIHRoaXMucXVldWVbcXVlSWR4XS5vcHRpb25zID0gaXRlbS5vcHRpb25zO1xuICAgICAgdGhpcy5xdWV1ZVtxdWVJZHhdID0galF1ZXJ5LmV4dGVuZCh0cnVlLCB7fSwgdGhpcy5xdWV1ZVtxdWVJZHhdLCBpdGVtKTtcbiAgICAgIGJpbmRBdXRvY29tcGxldGVUYXJnZXQuY2FsbCh0aGlzLCBxdWVJZHgpO1xuICAgIH1cblxuICAgIHF1ZUlkeCA9IG51bGw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogb3BlbiB0aGUgb3B0aW9uQm94IG9mIGF1dG9jb21wbGV0ZVxuICAgKiBAbWV0aG9kXG4gICAqIEBwYXJhbSB7KFN0cmluZ3xOdW1iZXJ8RWxlbWVudCl9IGJvdW5kSURcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFt0cnlDb3VudF1cbiAgICogQHJldHVybiB7QVg2VUlBdXRvY29tcGxldGV9XG4gICAqL1xuICBvcGVuKGJvdW5kSUQsIHRyeUNvdW50KSB7XG4gICAgdGhpcy53YWl0T3B0aW9uc0NhbGxiYWNrID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIG9wZW4gYXV0b2NvbXBsZXRlIGZyb20gdGhlIG91dHNpZGVcbiAgICAgKi9cbiAgICBsZXQgcXVlSWR4ID0gKFUuaXNOdW1iZXIoYm91bmRJRCkpID8gYm91bmRJRCA6IGdldFF1ZUlkeC5jYWxsKHRoaXMsIGJvdW5kSUQpLFxuICAgICAgaXRlbSA9IHRoaXMucXVldWVbcXVlSWR4XSxcbiAgICAgIGRhdGEgPSB7fSxcbiAgICAgIGZvY3VzVG9wLFxuICAgICAgc2VsZWN0ZWRPcHRpb25FbDtcblxuICAgIGlmIChpdGVtLiRkaXNwbGF5LmF0dHIoXCJkaXNhYmxlZFwiKSkgcmV0dXJuIHRoaXM7XG5cbiAgICBpZiAodGhpcy5vcGVuVGltZXIpIGNsZWFyVGltZW91dCh0aGlzLm9wZW5UaW1lcik7XG4gICAgaWYgKHRoaXMuYWN0aXZlYXV0b2NvbXBsZXRlT3B0aW9uR3JvdXApIHtcbiAgICAgIGlmICh0aGlzLmFjdGl2ZWF1dG9jb21wbGV0ZVF1ZXVlSW5kZXggPT0gcXVlSWR4KSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBpZiAodHJ5Q291bnQgPiAyKSByZXR1cm4gdGhpcztcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgIHRoaXMub3BlblRpbWVyID0gc2V0VGltZW91dCgoZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLm9wZW4ocXVlSWR4LCAodHJ5Q291bnQgfHwgMCkgKyAxKTtcbiAgICAgIH0pLmJpbmQodGhpcyksIHRoaXMuY29uZmlnLmFuaW1hdGVUaW1lKTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaXRlbS5vcHRpb25Gb2N1c0luZGV4ID0gLTE7IC8vIG9wdGlvbkdyb3Vw7J20IOyXtOumrOuptCDtj6zsu6TsiqQg7J24642x7IqkIOy0iOq4sO2ZlCAtMeuhnFxuICAgIGlmIChpdGVtLnNlbGVjdGVkICYmIGl0ZW0uc2VsZWN0ZWQubGVuZ3RoID4gMCkge1xuICAgICAgaXRlbS5vcHRpb25TZWxlY3RlZEluZGV4ID0gaXRlbS5zZWxlY3RlZFswXVtcIkBmaW5kZXhcIl07XG4gICAgfVxuXG4gICAgLy8vIO2FnO2UjOumv+yXkCDsoITri6ztlaAg7Jik67iM7KCd7Yq4IOyEoOyWuFxuICAgIGRhdGEuaWQgPSBpdGVtLmlkO1xuICAgIGRhdGEudGhlbWUgPSBpdGVtLnRoZW1lO1xuICAgIGRhdGEubXVsdGlwbGUgPSBpdGVtLm11bHRpcGxlO1xuXG4gICAgZGF0YS5sYW5nID0gaXRlbS5sYW5nO1xuICAgIGl0ZW0uJGRpc3BsYXkuYXR0cihcImRhdGEtYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cC1vcGVuZWRcIiwgXCJ0cnVlXCIpO1xuXG4gICAgZGF0YS53YWl0T3B0aW9ucyA9IHRydWU7IC8vIO2DgOydtO2VkeqwkuycvOuhnCBvcHRpb25z7J2EIOq1rO2VtOyVvCDtlZjrr4DroZwg64yA6riwXG4gICAgZGF0YS5vcHRpb25zID0gW107XG5cbiAgICB0aGlzLmFjdGl2ZWF1dG9jb21wbGV0ZU9wdGlvbkdyb3VwID0galF1ZXJ5KG11c3RhY2hlLnJlbmRlcih0bXBsLm9wdGlvbkdyb3VwLmNhbGwodGhpcywgaXRlbS5jb2x1bW5LZXlzKSwgZGF0YSkpO1xuICAgIHRoaXMuYWN0aXZlYXV0b2NvbXBsZXRlT3B0aW9uR3JvdXAuZmluZCgnW2RhdGEtZWxzPVwiY29udGVudFwiXScpLmh0bWwobXVzdGFjaGUucmVuZGVyKHRtcGwub3B0aW9ucy5jYWxsKHRoaXMsIGl0ZW0uY29sdW1uS2V5cyksIGRhdGEpKTtcbiAgICB0aGlzLmFjdGl2ZWF1dG9jb21wbGV0ZVF1ZXVlSW5kZXggPSBxdWVJZHg7XG5cbiAgICBhbGlnbkF1dG9jb21wbGV0ZU9wdGlvbkdyb3VwLmNhbGwodGhpcywgXCJhcHBlbmRcIik7IC8vIGFsaWduQXV0b2NvbXBsZXRlT3B0aW9uR3JvdXAg7JeQ7IScIGJvZHkgYXBwZW5kXG5cbiAgICBpZiAoaXRlbS5zZWxlY3RlZCAmJiBpdGVtLnNlbGVjdGVkLmxlbmd0aCA+IDApIHtcbiAgICAgIHNlbGVjdGVkT3B0aW9uRWwgPSB0aGlzLmFjdGl2ZWF1dG9jb21wbGV0ZU9wdGlvbkdyb3VwLmZpbmQoJ1tkYXRhLW9wdGlvbi1pbmRleD1cIicgKyBpdGVtLnNlbGVjdGVkWzBdW1wiQGluZGV4XCJdICsgJ1wiXScpO1xuICAgICAgaWYgKHNlbGVjdGVkT3B0aW9uRWwuZ2V0KDApKSB7XG4gICAgICAgIGZvY3VzVG9wID0gc2VsZWN0ZWRPcHRpb25FbC5wb3NpdGlvbigpLnRvcCAtIHRoaXMuYWN0aXZlYXV0b2NvbXBsZXRlT3B0aW9uR3JvdXAuaGVpZ2h0KCkgLyAzO1xuICAgICAgICB0aGlzLmFjdGl2ZWF1dG9jb21wbGV0ZU9wdGlvbkdyb3VwLmZpbmQoJ1tkYXRhLWVscz1cImNvbnRlbnRcIl0nKS5zY3JvbGxUb3AoZm9jdXNUb3ApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGpRdWVyeSh3aW5kb3cpLm9uKFwiY2xpY2suYXg2dWktYXV0b2NvbXBsZXRlLVwiICsgdGhpcy5pbnN0YW5jZUlkLCAoZnVuY3Rpb24gKGUpIHtcbiAgICAgIGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcbiAgICAgIG9uQm9keUNsaWNrLmNhbGwodGhpcywgZSk7XG4gICAgICBVLnN0b3BFdmVudChlKTtcbiAgICB9KS5iaW5kKHRoaXMpKTtcblxuICAgIG9uU3RhdGVDaGFuZ2VkLmNhbGwodGhpcywgaXRlbSwge1xuICAgICAgc2VsZjogdGhpcyxcbiAgICAgIHN0YXRlOiBcIm9wZW5cIixcbiAgICAgIGl0ZW06IGl0ZW1cbiAgICB9KTtcblxuICAgIGRhdGEgPSBudWxsO1xuICAgIGZvY3VzVG9wID0gbnVsbDtcbiAgICBzZWxlY3RlZE9wdGlvbkVsID0gbnVsbDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBwYXJhbSB7KGpRdWVyeU9iamVjdHxFbGVtZW50fE51bWJlcil9IF9ib3VuZElEXG4gICAqIEBwYXJhbSB7KFN0cmluZ3xBcnJheSl9IF92YWx1ZVxuICAgKiBAcmV0dXJuIHtBWDZVSUF1dG9jb21wbGV0ZX1cbiAgICogQGV4YW1wbGVcbiAgICogYGBganNcbiAgICogbXlBdXRvY29tcGxldGUuc2V0VmFsdWUoalF1ZXJ5KCdbZGF0YS1heDZ1aS1hdXRvY29tcGxldGU9XCJhdXRvY29tcGxldGUxXCJdJyksIHt2YWx1ZTpcInRlc3RcIiwgdGV4dDpcInRlc3RcIn0pO1xuICAgKiBteUF1dG9jb21wbGV0ZS5zZXRWYWx1ZShqUXVlcnkoJ1tkYXRhLWF4NnVpLWF1dG9jb21wbGV0ZT1cImF1dG9jb21wbGV0ZTFcIl0nKSwgW3t2YWx1ZTpcInRlc3QxXCIsIHRleHQ6XCJ0ZXN0MVwifSwge3ZhbHVlOlwidGVzdDJcIiwgdGV4dDpcInRlc3QyXCJ9XSk7XG4gICAqIG15QXV0b2NvbXBsZXRlLnNldFZhbHVlKGpRdWVyeSgnW2RhdGEtYXg2dWktYXV0b2NvbXBsZXRlPVwiYXV0b2NvbXBsZXRlMVwiXScpLCBudWxsKTtcbiAgICogYGBgXG4gICAqL1xuICBzZXRWYWx1ZShfYm91bmRJRCwgX3ZhbHVlKSB7XG4gICAgbGV0IHF1ZUlkeCA9IChVLmlzTnVtYmVyKF9ib3VuZElEKSkgPyBfYm91bmRJRCA6IGdldFF1ZUlkeC5jYWxsKHRoaXMsIF9ib3VuZElEKTtcbiAgICBpZiAocXVlSWR4ID09PSAtMSkge1xuICAgICAgY29uc29sZS5sb2coaW5mby5nZXRFcnJvcihcImF4NnVpLWF1dG9jb21wbGV0ZVwiLCBcIjQwMlwiLCBcInZhbFwiKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY2xlYXJTZWxlY3RlZC5jYWxsKHRoaXMsIHF1ZUlkeCk7XG5cbiAgICBpZiAoVS5pc0FycmF5KF92YWx1ZSkpIHtcbiAgICAgIGxldCBfdmFsdWVzID0gVS5tYXAoX3ZhbHVlLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7dmFsdWU6IHRoaXN9O1xuICAgICAgfSk7XG4gICAgICBzZXRTZWxlY3RlZC5jYWxsKHRoaXMsIHF1ZUlkeCwgX3ZhbHVlcywgdHJ1ZSwge25vU3RhdGVDaGFuZ2U6IHRydWV9KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoVS5pc09iamVjdChfdmFsdWUpKSB7XG4gICAgICBzZXRTZWxlY3RlZC5jYWxsKHRoaXMsIHF1ZUlkeCwge3ZhbHVlOiBfdmFsdWV9LCB0cnVlLCB7bm9TdGF0ZUNoYW5nZTogdHJ1ZX0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcmludExhYmVsLmNhbGwodGhpcywgcXVlSWR4KTtcbiAgICB9XG5cbiAgICBibHVyTGFiZWwuY2FsbCh0aGlzLCBxdWVJZHgpO1xuICAgIGFsaWduQXV0b2NvbXBsZXRlRGlzcGxheS5jYWxsKHRoaXMpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAcGFyYW0geyhqUXVlcnlPYmplY3R8RWxlbWVudHxOdW1iZXIpfSBfYm91bmRJRFxuICAgKiBAcGFyYW0geyhTdHJpbmd8QXJyYXkpfSBfdGV4dFxuICAgKiBAcmV0dXJuIHtBWDZVSUF1dG9jb21wbGV0ZX1cbiAgICogQGV4YW1wbGVcbiAgICogYGBganNcbiAgICogbXlBdXRvY29tcGxldGUuc2V0VGV4dChqUXVlcnkoJ1tkYXRhLWF4NnVpLWF1dG9jb21wbGV0ZT1cImF1dG9jb21wbGV0ZTFcIl0nKSwgXCJzdHJpbmdcIik7XG4gICAqIG15QXV0b2NvbXBsZXRlLnNldFRleHQoalF1ZXJ5KCdbZGF0YS1heDZ1aS1hdXRvY29tcGxldGU9XCJhdXRvY29tcGxldGUxXCJdJyksIFtcInN1YnN0cmluZ1wiLCBcInNlYXJjaFwiXSk7XG4gICAqIGBgYFxuICAgKi9cbiAgc2V0VGV4dChfYm91bmRJRCwgX3RleHQpIHtcbiAgICBsZXQgcXVlSWR4ID0gKFUuaXNOdW1iZXIoX2JvdW5kSUQpKSA/IF9ib3VuZElEIDogZ2V0UXVlSWR4LmNhbGwodGhpcywgX2JvdW5kSUQpO1xuICAgIGlmIChxdWVJZHggPT09IC0xKSB7XG4gICAgICBjb25zb2xlLmxvZyhpbmZvLmdldEVycm9yKFwiYXg2dWktYXV0b2NvbXBsZXRlXCIsIFwiNDAyXCIsIFwidmFsXCIpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnF1ZXVlW3F1ZUlkeF0uc2VsZWN0ZWQgPSBbXTtcbiAgICBjbGVhclNlbGVjdGVkLmNhbGwodGhpcywgcXVlSWR4KTtcbiAgICBzZXRTZWxlY3RlZC5jYWxsKHRoaXMsIHF1ZUlkeCwgX3RleHQsIHRydWUsIHtub1N0YXRlQ2hhbmdlOiB0cnVlfSk7XG4gICAgYmx1ckxhYmVsLmNhbGwodGhpcywgcXVlSWR4KTtcbiAgICBhbGlnbkF1dG9jb21wbGV0ZURpc3BsYXkuY2FsbCh0aGlzKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQHBhcmFtIHsoalF1ZXJ5T2JqZWN0fEVsZW1lbnR8TnVtYmVyKX0gX2JvdW5kSURcbiAgICogQHJldHVybnMge0FycmF5fVxuICAgKi9cbiAgZ2V0U2VsZWN0ZWRPcHRpb24oX2JvdW5kSUQpIHtcbiAgICBsZXQgcXVlSWR4ID0gKFUuaXNOdW1iZXIoX2JvdW5kSUQpKSA/IF9ib3VuZElEIDogZ2V0UXVlSWR4LmNhbGwodGhpcywgX2JvdW5kSUQpO1xuICAgIGlmIChxdWVJZHggPT09IC0xKSB7XG4gICAgICBjb25zb2xlLmxvZyhpbmZvLmdldEVycm9yKFwiYXg2dWktYXV0b2NvbXBsZXRlXCIsIFwiNDAyXCIsIFwidmFsXCIpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIFUuZGVlcENvcHkodGhpcy5xdWV1ZVtxdWVJZHhdLnNlbGVjdGVkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEByZXR1cm4ge0FYNlVJQXV0b2NvbXBsZXRlfVxuICAgKi9cbiAgY2xvc2UoaXRlbSkge1xuICAgIGlmICh0aGlzLmNsb3NlVGltZXIpIGNsZWFyVGltZW91dCh0aGlzLmNsb3NlVGltZXIpO1xuICAgIGlmICghdGhpcy5hY3RpdmVhdXRvY29tcGxldGVPcHRpb25Hcm91cCkgcmV0dXJuIHRoaXM7XG5cbiAgICBpdGVtID0gdGhpcy5xdWV1ZVt0aGlzLmFjdGl2ZWF1dG9jb21wbGV0ZVF1ZXVlSW5kZXhdO1xuICAgIGl0ZW0ub3B0aW9uRm9jdXNJbmRleCA9IC0xO1xuICAgIGl0ZW0uJGRpc3BsYXkucmVtb3ZlQXR0cihcImRhdGEtYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cC1vcGVuZWRcIikudHJpZ2dlcihcImZvY3VzXCIpO1xuXG4gICAgdGhpcy5hY3RpdmVhdXRvY29tcGxldGVPcHRpb25Hcm91cC5hZGRDbGFzcyhcImRlc3Ryb3lcIik7XG5cbiAgICBqUXVlcnkod2luZG93KVxuICAgICAgLm9mZihcInJlc2l6ZS5heDZ1aS1hdXRvY29tcGxldGUtXCIgKyB0aGlzLmluc3RhbmNlSWQpXG4gICAgICAub2ZmKFwiY2xpY2suYXg2dWktYXV0b2NvbXBsZXRlLVwiICsgdGhpcy5pbnN0YW5jZUlkKVxuICAgICAgLm9mZihcImtleXVwLmF4NnVpLWF1dG9jb21wbGV0ZS1cIiArIHRoaXMuaW5zdGFuY2VJZCk7XG5cbiAgICB0aGlzLmNsb3NlVGltZXIgPSBzZXRUaW1lb3V0KChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodGhpcy5hY3RpdmVhdXRvY29tcGxldGVPcHRpb25Hcm91cCkgdGhpcy5hY3RpdmVhdXRvY29tcGxldGVPcHRpb25Hcm91cC5yZW1vdmUoKTtcbiAgICAgIHRoaXMuYWN0aXZlYXV0b2NvbXBsZXRlT3B0aW9uR3JvdXAgPSBudWxsO1xuICAgICAgdGhpcy5hY3RpdmVhdXRvY29tcGxldGVRdWV1ZUluZGV4ID0gLTE7XG5cbiAgICAgIG9uU3RhdGVDaGFuZ2VkLmNhbGwodGhpcywgaXRlbSwge1xuICAgICAgICBzZWxmOiB0aGlzLFxuICAgICAgICBzdGF0ZTogXCJjbG9zZVwiXG4gICAgICB9KTtcblxuICAgIH0pLmJpbmQodGhpcyksIHRoaXMuY29uZmlnLmFuaW1hdGVUaW1lKTtcbiAgICB0aGlzLndhaXRPcHRpb25zQ2FsbGJhY2sgPSBudWxsO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQHBhcmFtIHsoalF1ZXJ5T2JqZWN0fEVsZW1lbnR8TnVtYmVyKX0gX2JvdW5kSURcbiAgICogQHJldHVybiB7QVg2VUlBdXRvY29tcGxldGV9XG4gICAqL1xuICBibHVyKF9ib3VuZElEKSB7XG4gICAgbGV0IHF1ZUlkeCA9IChVLmlzTnVtYmVyKF9ib3VuZElEKSkgPyBfYm91bmRJRCA6IGdldFF1ZUlkeC5jYWxsKHRoaXMsIF9ib3VuZElEKTtcbiAgICBpZiAocXVlSWR4ID09PSAtMSkge1xuICAgICAgY29uc29sZS5sb2coaW5mby5nZXRFcnJvcihcImF4NnVpLWF1dG9jb21wbGV0ZVwiLCBcIjQwMlwiLCBcInZhbFwiKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYmx1ckxhYmVsLmNhbGwodGhpcywgcXVlSWR4KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBwYXJhbSB7KGpRdWVyeU9iamVjdHxFbGVtZW50fE51bWJlcil9IF9ib3VuZElEXG4gICAqIEByZXR1cm4ge0FYNlVJQXV0b2NvbXBsZXRlfVxuICAgKi9cbiAgZW5hYmxlKF9ib3VuZElEKSB7XG4gICAgbGV0IHF1ZUlkeCA9IGdldFF1ZUlkeC5jYWxsKHRoaXMsIF9ib3VuZElEKTtcblxuICAgIGlmICh0eXBlb2YgcXVlSWR4ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aGlzLnF1ZXVlW3F1ZUlkeF0uZGlzYWJsZSA9IGZhbHNlO1xuICAgICAgaWYgKHRoaXMucXVldWVbcXVlSWR4XS4kZGlzcGxheVswXSkge1xuICAgICAgICB0aGlzLnF1ZXVlW3F1ZUlkeF0uJGRpc3BsYXkucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpO1xuICAgICAgICB0aGlzLnF1ZXVlW3F1ZUlkeF0uJGRpc3BsYXlMYWJlbElucHV0LnJlbW92ZUF0dHIoXCJkaXNhYmxlZFwiKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnF1ZXVlW3F1ZUlkeF0uJHNlbGVjdFswXSkge1xuICAgICAgICB0aGlzLnF1ZXVlW3F1ZUlkeF0uJHNlbGVjdC5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIik7XG5cbiAgICAgIH1cblxuICAgICAgb25TdGF0ZUNoYW5nZWQuY2FsbCh0aGlzLCB0aGlzLnF1ZXVlW3F1ZUlkeF0sIHtcbiAgICAgICAgc2VsZjogdGhpcyxcbiAgICAgICAgc3RhdGU6IFwiZW5hYmxlXCJcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQHBhcmFtIHsoalF1ZXJ5T2JqZWN0fEVsZW1lbnR8TnVtYmVyKX0gX2JvdW5kSURcbiAgICogQHJldHVybiB7QVg2VUlBdXRvY29tcGxldGV9XG4gICAqL1xuICBkaXNhYmxlKF9ib3VuZElEKSB7XG4gICAgbGV0IHF1ZUlkeCA9IGdldFF1ZUlkeC5jYWxsKHRoaXMsIF9ib3VuZElEKTtcblxuICAgIGlmICh0eXBlb2YgcXVlSWR4ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aGlzLnF1ZXVlW3F1ZUlkeF0uZGlzYWJsZSA9IHRydWU7XG4gICAgICBpZiAodGhpcy5xdWV1ZVtxdWVJZHhdLiRkaXNwbGF5WzBdKSB7XG4gICAgICAgIHRoaXMucXVldWVbcXVlSWR4XS4kZGlzcGxheS5hdHRyKFwiZGlzYWJsZWRcIiwgXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgdGhpcy5xdWV1ZVtxdWVJZHhdLiRkaXNwbGF5TGFiZWxJbnB1dC5hdHRyKFwiZGlzYWJsZWRcIiwgXCJkaXNhYmxlZFwiKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnF1ZXVlW3F1ZUlkeF0uJHNlbGVjdFswXSkge1xuICAgICAgICB0aGlzLnF1ZXVlW3F1ZUlkeF0uJHNlbGVjdC5hdHRyKFwiZGlzYWJsZWRcIiwgXCJkaXNhYmxlZFwiKTtcbiAgICAgIH1cblxuICAgICAgb25TdGF0ZUNoYW5nZWQuY2FsbCh0aGlzLCB0aGlzLnF1ZXVlW3F1ZUlkeF0sIHtcbiAgICAgICAgc2VsZjogdGhpcyxcbiAgICAgICAgc3RhdGU6IFwiZGlzYWJsZVwiXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEByZXR1cm4ge0FYNlVJQXV0b2NvbXBsZXRlfVxuICAgKi9cbiAgYWxpZ24oKSB7XG4gICAgYWxpZ25BdXRvY29tcGxldGVEaXNwbGF5LmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBBWDZVSUF1dG9jb21wbGV0ZTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vc3JjL0FYNlVJQXV0b2NvbXBsZXRlLmpzIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3N0eWxlLnNjc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge31cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGUuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGUuc2Nzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vc3JjL0FYNlVJQXV0b2NvbXBsZXRlL3N0eWxlLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDk2XG4vLyBtb2R1bGUgY2h1bmtzID0gMTIiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodW5kZWZpbmVkKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIkAtd2Via2l0LWtleWZyYW1lcyBheC1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwIHtcXG4gIGZyb20ge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTAlKTtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgdG8ge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwJSk7XFxuICAgIG9wYWNpdHk6IDE7IH0gfVxcblxcbkAtbW96LWtleWZyYW1lcyBheC1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwIHtcXG4gIGZyb20ge1xcbiAgICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTAlKTtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgdG8ge1xcbiAgICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwJSk7XFxuICAgIG9wYWNpdHk6IDE7IH0gfVxcblxcbkBrZXlmcmFtZXMgYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cCB7XFxuICBmcm9tIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEwJSk7XFxuICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMCUpO1xcbiAgICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMCUpO1xcbiAgICAtby10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEwJSk7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTAlKTtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgdG8ge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwJSk7XFxuICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDAlKTtcXG4gICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwJSk7XFxuICAgIC1vLXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwJSk7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwJSk7XFxuICAgIG9wYWNpdHk6IDE7IH0gfVxcblxcbkAtd2Via2l0LWtleWZyYW1lcyBheC1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwLWRlc3Ryb3kge1xcbiAgZnJvbSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDAlKSBzY2FsZVkoMSk7XFxuICAgIG9wYWNpdHk6IDE7IH1cXG4gIHRvIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCUpIHNjYWxlWSgwKTtcXG4gICAgb3BhY2l0eTogMDsgfSB9XFxuXFxuQC1tb3ota2V5ZnJhbWVzIGF4LWF1dG9jb21wbGV0ZS1vcHRpb24tZ3JvdXAtZGVzdHJveSB7XFxuICBmcm9tIHtcXG4gICAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCUpIHNjYWxlWSgxKTtcXG4gICAgb3BhY2l0eTogMTsgfVxcbiAgdG8ge1xcbiAgICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwJSkgc2NhbGVZKDApO1xcbiAgICBvcGFjaXR5OiAwOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIGF4LWF1dG9jb21wbGV0ZS1vcHRpb24tZ3JvdXAtZGVzdHJveSB7XFxuICBmcm9tIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCUpIHNjYWxlWSgxKTtcXG4gICAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCUpIHNjYWxlWSgxKTtcXG4gICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwJSkgc2NhbGVZKDEpO1xcbiAgICAtby10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCUpIHNjYWxlWSgxKTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDAlKSBzY2FsZVkoMSk7XFxuICAgIG9wYWNpdHk6IDE7IH1cXG4gIHRvIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCUpIHNjYWxlWSgwKTtcXG4gICAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCUpIHNjYWxlWSgwKTtcXG4gICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwJSkgc2NhbGVZKDApO1xcbiAgICAtby10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCUpIHNjYWxlWSgwKTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDAlKSBzY2FsZVkoMCk7XFxuICAgIG9wYWNpdHk6IDA7IH0gfVxcblxcbltkYXRhLWF4NnVpLWF1dG9jb21wbGV0ZV0ge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgb3ZlcmZsb3c6IHZpc2libGU7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IH1cXG4gIFtkYXRhLWF4NnVpLWF1dG9jb21wbGV0ZV0gKixcXG4gIFtkYXRhLWF4NnVpLWF1dG9jb21wbGV0ZV0gKjpiZWZvcmUsXFxuICBbZGF0YS1heDZ1aS1hdXRvY29tcGxldGVdICo6YWZ0ZXIge1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94OyB9XFxuXFxuLmF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5IHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHotaW5kZXg6IDI7XFxuICBwYWRkaW5nOiAwO1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBoZWlnaHQ6IDMycHg7XFxuICBmb250LXNpemU6IDE0cHg7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQodG9wLCAjZmZmLCAjZmZmKTtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byBib3R0b20sI2ZmZiwgI2ZmZik7XFxuICBib3gtc2hhZG93OiBpbnNldCAwIDFweCAxcHggcmdiYSgwLCAwLCAwLCAwLjA3NSk7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xcbiAgY29sb3I6ICM0NDQ7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7IH1cXG4gIC5heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheTpob3ZlciwgLmF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5OmZvY3VzIHtcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lOyB9XFxuICAuYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXkgLmF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5LXRhYmxlIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgZGlzcGxheTogdGFibGU7XFxuICAgIHRhYmxlLWxheW91dDogZml4ZWQ7XFxuICAgIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7IH1cXG4gICAgLmF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5IC5heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheS10YWJsZSBbZGF0YS1heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheT1cXFwibGFiZWwtaG9sZGVyXFxcIl0ge1xcbiAgICAgIGRpc3BsYXk6IHRhYmxlLWNlbGw7XFxuICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gICAgICBwYWRkaW5nOiAwIDA7IH1cXG4gICAgICAuYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXkgLmF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5LXRhYmxlIFtkYXRhLWF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5PVxcXCJsYWJlbC1ob2xkZXJcXFwiXSBpbnB1dCB7XFxuICAgICAgICBtYXJnaW46IDA7XFxuICAgICAgICBib3gtc2l6aW5nOiBjb250ZW50LWJveDtcXG4gICAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbiAgICAgICAgYm94LXNoYWRvdzogbm9uZTsgfVxcbiAgICAgICAgLmF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5IC5heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheS10YWJsZSBbZGF0YS1heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheT1cXFwibGFiZWwtaG9sZGVyXFxcIl0gaW5wdXQ6Zm9jdXMsIC5heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheSAuYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXktdGFibGUgW2RhdGEtYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXk9XFxcImxhYmVsLWhvbGRlclxcXCJdIGlucHV0OmFjdGl2ZSwgLmF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5IC5heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheS10YWJsZSBbZGF0YS1heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheT1cXFwibGFiZWwtaG9sZGVyXFxcIl0gaW5wdXQ6aG92ZXIge1xcbiAgICAgICAgICBib3JkZXI6IDAgbm9uZTtcXG4gICAgICAgICAgYm94LXNoYWRvdzogbm9uZTsgfVxcbiAgICAuYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXkgLmF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5LXRhYmxlIFtkYXRhLWF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5PVxcXCJsYWJlbFxcXCJdIHtcXG4gICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgICAgcGFkZGluZzogMHB4IDVweDtcXG4gICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7IH1cXG4gICAgICAuYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXkgLmF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5LXRhYmxlIFtkYXRhLWF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5PVxcXCJsYWJlbFxcXCJdOmZvY3VzIHtcXG4gICAgICAgIG91dGxpbmU6IG5vbmU7IH1cXG4gICAgICAuYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXkgLmF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5LXRhYmxlIFtkYXRhLWF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5PVxcXCJsYWJlbFxcXCJdOmhvdmVyIHtcXG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTsgfVxcbiAgICAgIC5heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheSAuYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXktdGFibGUgW2RhdGEtYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXk9XFxcImxhYmVsXFxcIl06YWZ0ZXIge1xcbiAgICAgICAgY29udGVudDogJyAnO1xcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgICBjbGVhcjogYm90aDsgfVxcbiAgICAgIC5heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheSAuYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXktdGFibGUgW2RhdGEtYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXk9XFxcImxhYmVsXFxcIl0gW2RhdGEtYXg2dWktYXV0b2NvbXBsZXRlLXNlbGVjdGVkLWxhYmVsXSB7XFxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgICAgICBkaXNwbGF5OiB0YWJsZTtcXG4gICAgICAgIGZsb2F0OiBsZWZ0O1xcbiAgICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxuICAgICAgICBtYXJnaW46IDFweCAzcHggMXB4IDA7XFxuICAgICAgICBjb2xvcjogIzQ0NDtcXG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQodG9wLCAjZmZmLCAjZmZmKTtcXG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byBib3R0b20sI2ZmZiwgI2ZmZik7XFxuICAgICAgICBib3JkZXItY29sbGFwc2U6IHNlcGFyYXRlO1xcbiAgICAgICAgYm9yZGVyOiAwIG5vbmU7IH1cXG4gICAgICAgIC5heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheSAuYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXktdGFibGUgW2RhdGEtYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXk9XFxcImxhYmVsXFxcIl0gW2RhdGEtYXg2dWktYXV0b2NvbXBsZXRlLXNlbGVjdGVkLWxhYmVsXTpmaXJzdC1jaGlsZCB7XFxuICAgICAgICAgIG1hcmdpbi1sZWZ0OiAwOyB9XFxuICAgICAgICAuYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXkgLmF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5LXRhYmxlIFtkYXRhLWF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5PVxcXCJsYWJlbFxcXCJdIFtkYXRhLWF4NnVpLWF1dG9jb21wbGV0ZS1zZWxlY3RlZC1sYWJlbF0gLmxhYmVsLWNlbGwge1xcbiAgICAgICAgICBkaXNwbGF5OiB0YWJsZS1jZWxsO1xcbiAgICAgICAgICBwYWRkaW5nOiAwIDVweDtcXG4gICAgICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7IH1cXG4gICAgICAgICAgLmF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5IC5heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheS10YWJsZSBbZGF0YS1heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheT1cXFwibGFiZWxcXFwiXSBbZGF0YS1heDZ1aS1hdXRvY29tcGxldGUtc2VsZWN0ZWQtbGFiZWxdIC5sYWJlbC1jZWxsOmZpcnN0LWNoaWxkIHtcXG4gICAgICAgICAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiA0cHg7XFxuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogNHB4O1xcbiAgICAgICAgICAgIGJvcmRlci1yaWdodDogMCBub25lOyB9XFxuICAgICAgICAgIC5heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheSAuYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXktdGFibGUgW2RhdGEtYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXk9XFxcImxhYmVsXFxcIl0gW2RhdGEtYXg2dWktYXV0b2NvbXBsZXRlLXNlbGVjdGVkLWxhYmVsXSAubGFiZWwtY2VsbDpsYXN0LWNoaWxkIHtcXG4gICAgICAgICAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNHB4O1xcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiA0cHg7XFxuICAgICAgICAgICAgYm9yZGVyLWxlZnQ6IDAgbm9uZTtcXG4gICAgICAgICAgICBwYWRkaW5nLWxlZnQ6IDA7IH1cXG4gICAgICAgIC5heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheSAuYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXktdGFibGUgW2RhdGEtYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXk9XFxcImxhYmVsXFxcIl0gW2RhdGEtYXg2dWktYXV0b2NvbXBsZXRlLXNlbGVjdGVkLWxhYmVsXSBbZGF0YS1heDZ1aS1hdXRvY29tcGxldGUtcmVtb3ZlXSB7XFxuICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjsgfVxcbiAgICAgICAgICAuYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXkgLmF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5LXRhYmxlIFtkYXRhLWF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5PVxcXCJsYWJlbFxcXCJdIFtkYXRhLWF4NnVpLWF1dG9jb21wbGV0ZS1zZWxlY3RlZC1sYWJlbF0gW2RhdGEtYXg2dWktYXV0b2NvbXBsZXRlLXJlbW92ZV06aG92ZXIge1xcbiAgICAgICAgICAgIGNvbG9yOiAjZTk3MjU5OyB9XFxuICAgICAgLmF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5IC5heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheS10YWJsZSBbZGF0YS1heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheT1cXFwibGFiZWxcXFwiXSBbZGF0YS1heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheT1cXFwiaW5wdXRcXFwiXSB7XFxuICAgICAgICBmbG9hdDogbGVmdDtcXG4gICAgICAgIHdpZHRoOiAxMDBweDsgfVxcbiAgICAgICAgLmF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5IC5heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheS10YWJsZSBbZGF0YS1heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheT1cXFwibGFiZWxcXFwiXSBbZGF0YS1heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheT1cXFwiaW5wdXRcXFwiXTpmb2N1cyB7XFxuICAgICAgICAgIG91dGxpbmU6IG5vbmU7IH1cXG4gICAgICAgIC5heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheSAuYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXktdGFibGUgW2RhdGEtYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXk9XFxcImxhYmVsXFxcIl0gW2RhdGEtYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXk9XFxcImlucHV0XFxcIl06Oi1tcy1jbGVhciB7XFxuICAgICAgICAgIGRpc3BsYXk6IG5vbmU7IH1cXG4gICAgLmF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5IC5heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheS10YWJsZSBbZGF0YS1heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheT1cXFwiYWRkb25cXFwiXSB7XFxuICAgICAgZGlzcGxheTogdGFibGUtY2VsbDtcXG4gICAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgICAgIHdpZHRoOiAxNnB4O1xcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjsgfVxcbiAgICAgIC5heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheSAuYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXktdGFibGUgW2RhdGEtYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXk9XFxcImFkZG9uXFxcIl0gLmFkZG9uLWljb24tcmVzZXQge1xcbiAgICAgICAgZGlzcGxheTogbm9uZTsgfVxcbiAgLmF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5W2RhdGEtc2VsZWN0LW9wdGlvbi1ncm91cC1vcGVuZWRdIHtcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMXB4IDFweCAzcHggcmdiYSgwLCAwLCAwLCAwLjIpOyB9XFxuICAgIC5heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheVtkYXRhLXNlbGVjdC1vcHRpb24tZ3JvdXAtb3BlbmVkXSAuYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXktdGFibGUgW2RhdGEtYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXk9XFxcImFkZG9uXFxcIl0gLmFkZG9uLWljb24tcmVzZXQge1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICByaWdodDogMjNweDtcXG4gICAgICB0b3A6IDA7XFxuICAgICAgaGVpZ2h0OiAxMDAlOyB9XFxuICAuYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXkuZGVmYXVsdCBhIHtcXG4gICAgY29sb3I6ICM0NDQ7IH1cXG4gIC5heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheS5kZWZhdWx0OmhvdmVyOm5vdChbZGlzYWJsZWRdKSwgLmF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5LmRlZmF1bHQ6YWN0aXZlOm5vdChbZGlzYWJsZWRdKSwgLmF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5LmRlZmF1bHQ6Zm9jdXM6bm90KFtkaXNhYmxlZF0pLCAuYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXkuZGVmYXVsdFtkYXRhLXNlbGVjdC1vcHRpb24tZ3JvdXAtb3BlbmVkXTpub3QoW2Rpc2FibGVkXSkge1xcbiAgICBib3JkZXItY29sb3I6ICNjY2M7XFxuICAgIGNvbG9yOiAjNDQ0O1xcbiAgICBiYWNrZ3JvdW5kOiAjZmJmYmZiO1xcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7IH1cXG4gIC5heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheS5kZWZhdWx0IFtkaXNhYmxlZF0ge1xcbiAgICB1c2VyLXNlbGVjdDogbm9uZTsgfVxcblxcbi5heDZ1aS1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICB6LWluZGV4OiAyMDAwO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgbGVmdDogMDtcXG4gIHRvcDogMDtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIGJveC1zaGFkb3c6IDBweCAwcHggM3B4IDBweCByZ2JhKDAsIDAsIDAsIDAuMTc1KTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmYmZiZmI7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudChib3R0b20sICNmYmZiZmIpO1xcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIHRvcCwjZmJmYmZiKTtcXG4gIC13ZWJraXQtYW5pbWF0aW9uOiBheC1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwIDAuMXMgZWFzZS1vdXQ7XFxuICAtbW96LWFuaW1hdGlvbjogYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cCAwLjFzIGVhc2Utb3V0O1xcbiAgYW5pbWF0aW9uOiBheC1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwIDAuMXMgZWFzZS1vdXQ7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWigwKTtcXG4gIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDApO1xcbiAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWigwKTtcXG4gIC1vLXRyYW5zZm9ybTogdHJhbnNsYXRlWigwKTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWigwKTtcXG4gIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIHRvcDtcXG4gIC1tb3otdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIHRvcDtcXG4gIC1tcy10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgdG9wO1xcbiAgLW8tdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIHRvcDtcXG4gIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciB0b3A7IH1cXG4gIC5heDZ1aS1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwLmRlc3Ryb3kge1xcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cC1kZXN0cm95IDAuMXMgY3ViaWMtYmV6aWVyKDAuNiwgLTAuMjgsIDAuNzM1LCAwLjA0NSkgZm9yd2FyZHM7XFxuICAgIC1tb3otYW5pbWF0aW9uOiBheC1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwLWRlc3Ryb3kgMC4xcyBjdWJpYy1iZXppZXIoMC42LCAtMC4yOCwgMC43MzUsIDAuMDQ1KSBmb3J3YXJkcztcXG4gICAgYW5pbWF0aW9uOiBheC1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwLWRlc3Ryb3kgMC4xcyBjdWJpYy1iZXppZXIoMC42LCAtMC4yOCwgMC43MzUsIDAuMDQ1KSBmb3J3YXJkczsgfVxcbiAgLmF4NnVpLWF1dG9jb21wbGV0ZS1vcHRpb24tZ3JvdXAuZGlyZWN0aW9uLXRvcCB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIHRvcDtcXG4gICAgLW1vei10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgdG9wO1xcbiAgICAtbXMtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIHRvcDtcXG4gICAgLW8tdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIHRvcDtcXG4gICAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIHRvcDsgfVxcbiAgLmF4NnVpLWF1dG9jb21wbGV0ZS1vcHRpb24tZ3JvdXAuZGlyZWN0aW9uLWJvdHRvbSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIGJvdHRvbTtcXG4gICAgLW1vei10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgYm90dG9tO1xcbiAgICAtbXMtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIGJvdHRvbTtcXG4gICAgLW8tdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIGJvdHRvbTtcXG4gICAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIGJvdHRvbTsgfVxcbiAgLmF4NnVpLWF1dG9jb21wbGV0ZS1vcHRpb24tZ3JvdXAuZGVmYXVsdCB7XFxuICAgIGJvcmRlci1jb2xvcjogI2NjYztcXG4gICAgY29sb3I6ICM0NDQ7IH1cXG4gICAgLmF4NnVpLWF1dG9jb21wbGV0ZS1vcHRpb24tZ3JvdXAuZGVmYXVsdCAuYXgtYXV0b2NvbXBsZXRlLWJvZHkgLmF4LWF1dG9jb21wbGV0ZS1vcHRpb24tZ3JvdXAtY29udGVudCAuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1pdGVtOmhvdmVyLCAuYXg2dWktYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cC5kZWZhdWx0IC5heC1hdXRvY29tcGxldGUtYm9keSAuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cC1jb250ZW50IC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWl0ZW0uaG92ZXIge1xcbiAgICAgIGJhY2tncm91bmQ6ICNhNmE2YTYgIWltcG9ydGFudDtcXG4gICAgICBjb2xvcjogIzExMTExMTsgfVxcbiAgICAgIC5heDZ1aS1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwLmRlZmF1bHQgLmF4LWF1dG9jb21wbGV0ZS1ib2R5IC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwLWNvbnRlbnQgLmF4LWF1dG9jb21wbGV0ZS1vcHRpb24taXRlbTpob3ZlciAuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1pdGVtLWhvbGRlciAuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1pdGVtLWNlbGwuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1pdGVtLWNoZWNrYm94IC5pdGVtLWNoZWNrYm94LXdyYXAudXNlQ2hlY2tCb3g6YWZ0ZXIsIC5heDZ1aS1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwLmRlZmF1bHQgLmF4LWF1dG9jb21wbGV0ZS1ib2R5IC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwLWNvbnRlbnQgLmF4LWF1dG9jb21wbGV0ZS1vcHRpb24taXRlbS5ob3ZlciAuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1pdGVtLWhvbGRlciAuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1pdGVtLWNlbGwuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1pdGVtLWNoZWNrYm94IC5pdGVtLWNoZWNrYm94LXdyYXAudXNlQ2hlY2tCb3g6YWZ0ZXIge1xcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgICAgIGJvcmRlci1jb2xvcjogIzExMTExMSAhaW1wb3J0YW50OyB9XFxuICAgIC5heDZ1aS1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwLmRlZmF1bHQgLmF4LWF1dG9jb21wbGV0ZS1ib2R5IC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwLWNvbnRlbnQgLmF4LWF1dG9jb21wbGV0ZS1vcHRpb24taXRlbVtkYXRhLW9wdGlvbi1zZWxlY3RlZD1cXFwidHJ1ZVxcXCJdIHtcXG4gICAgICBiYWNrZ3JvdW5kOiAjY2NjO1xcbiAgICAgIGNvbG9yOiAjMTExMTExOyB9XFxuICAgICAgLmF4NnVpLWF1dG9jb21wbGV0ZS1vcHRpb24tZ3JvdXAuZGVmYXVsdCAuYXgtYXV0b2NvbXBsZXRlLWJvZHkgLmF4LWF1dG9jb21wbGV0ZS1vcHRpb24tZ3JvdXAtY29udGVudCAuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1pdGVtW2RhdGEtb3B0aW9uLXNlbGVjdGVkPVxcXCJ0cnVlXFxcIl0gLmF4LWF1dG9jb21wbGV0ZS1vcHRpb24taXRlbS1ob2xkZXIgLmF4LWF1dG9jb21wbGV0ZS1vcHRpb24taXRlbS1jZWxsLmF4LWF1dG9jb21wbGV0ZS1vcHRpb24taXRlbS1jaGVja2JveCAuaXRlbS1jaGVja2JveC13cmFwLnVzZUNoZWNrQm94OmFmdGVyIHtcXG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgICAgICBib3JkZXItY29sb3I6ICMxMTExMTEgIWltcG9ydGFudDsgfVxcbiAgICAuYXg2dWktYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cC5kZWZhdWx0IC5heC1hdXRvY29tcGxldGUtYm9keSAuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cC1jb250ZW50IC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwIC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWl0ZW0taG9sZGVyIC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwLWxhYmVsIHtcXG4gICAgICBiYWNrZ3JvdW5kOiAjZWVlOyB9XFxuICAgIC5heDZ1aS1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwLmRlZmF1bHQgLmF4LWF1dG9jb21wbGV0ZS1ib2R5IC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwLWJ1dHRvbnMge1xcbiAgICAgIGJvcmRlci10b3A6IDFweCBzb2xpZDtcXG4gICAgICBib3JkZXItY29sb3I6ICNjY2M7IH1cXG4gIC5heDZ1aS1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwIC5heC1hdXRvY29tcGxldGUtYm9keSB7XFxuICAgIHBhZGRpbmc6IDBweDsgfVxcbiAgICAuYXg2dWktYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cCAuYXgtYXV0b2NvbXBsZXRlLWJvZHkgLmF4LWF1dG9jb21wbGV0ZS1vcHRpb24tZ3JvdXAtY29udGVudCB7XFxuICAgICAgbWF4LWhlaWdodDogMTgwcHg7XFxuICAgICAgb3ZlcmZsb3cteTogYXV0bztcXG4gICAgICAtd2Via2l0LW92ZXJmbG93LXNjcm9sbGluZzogdG91Y2g7XFxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuICAgICAgLmF4NnVpLWF1dG9jb21wbGV0ZS1vcHRpb24tZ3JvdXAgLmF4LWF1dG9jb21wbGV0ZS1ib2R5IC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwLWNvbnRlbnQgLmF4LWF1dG9jb21wbGV0ZS1vcHRpb24taXRlbSB7XFxuICAgICAgICBwYWRkaW5nOiAzcHggMHB4O1xcbiAgICAgICAgdGV4dC1hbGlnbjogbGVmdDtcXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgICAgIGZvbnQtc2l6ZTogMTNweDtcXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgICAgICBvdmVyZmxvdzogaGlkZGVuOyB9XFxuICAgICAgICAuYXg2dWktYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cCAuYXgtYXV0b2NvbXBsZXRlLWJvZHkgLmF4LWF1dG9jb21wbGV0ZS1vcHRpb24tZ3JvdXAtY29udGVudCAuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1pdGVtIC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWl0ZW0taG9sZGVyIHtcXG4gICAgICAgICAgZGlzcGxheTogdGFibGU7XFxuICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgICAgICAgYm9yZGVyLWNvbGxhcHNlOiBzZXBhcmF0ZTtcXG4gICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgICAgIGhlaWdodDogMThweDsgfVxcbiAgICAgICAgICAuYXg2dWktYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cCAuYXgtYXV0b2NvbXBsZXRlLWJvZHkgLmF4LWF1dG9jb21wbGV0ZS1vcHRpb24tZ3JvdXAtY29udGVudCAuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1pdGVtIC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWl0ZW0taG9sZGVyIC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWl0ZW0tY2VsbCB7XFxuICAgICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgICAgICAgICBkaXNwbGF5OiB0YWJsZS1jZWxsO1xcbiAgICAgICAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxuICAgICAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gICAgICAgICAgICBmb250LXNpemU6IDEzcHg7XFxuICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDE4cHg7XFxuICAgICAgICAgICAgcGFkZGluZzogMCAwIDAgMDtcXG4gICAgICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTsgfVxcbiAgICAgICAgICAgIC5heDZ1aS1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwIC5heC1hdXRvY29tcGxldGUtYm9keSAuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cC1jb250ZW50IC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWl0ZW0gLmF4LWF1dG9jb21wbGV0ZS1vcHRpb24taXRlbS1ob2xkZXIgLmF4LWF1dG9jb21wbGV0ZS1vcHRpb24taXRlbS1jZWxsLmF4LWF1dG9jb21wbGV0ZS1vcHRpb24taXRlbS1jaGVja2JveCB7XFxuICAgICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICAgICAgICAgICAgd2lkdGg6IDEzcHg7XFxuICAgICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cXG4gICAgICAgICAgICAgIC5heDZ1aS1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwIC5heC1hdXRvY29tcGxldGUtYm9keSAuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cC1jb250ZW50IC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWl0ZW0gLmF4LWF1dG9jb21wbGV0ZS1vcHRpb24taXRlbS1ob2xkZXIgLmF4LWF1dG9jb21wbGV0ZS1vcHRpb24taXRlbS1jZWxsLmF4LWF1dG9jb21wbGV0ZS1vcHRpb24taXRlbS1jaGVja2JveCAuaXRlbS1jaGVja2JveC13cmFwIHtcXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEzcHg7XFxuICAgICAgICAgICAgICAgIGhlaWdodDogMThweDsgfVxcbiAgICAgICAgICAgICAgICAuYXg2dWktYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cCAuYXgtYXV0b2NvbXBsZXRlLWJvZHkgLmF4LWF1dG9jb21wbGV0ZS1vcHRpb24tZ3JvdXAtY29udGVudCAuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1pdGVtIC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWl0ZW0taG9sZGVyIC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWl0ZW0tY2VsbC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWl0ZW0tY2hlY2tib3ggLml0ZW0tY2hlY2tib3gtd3JhcC51c2VDaGVja0JveDphZnRlciB7XFxuICAgICAgICAgICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgICAgICAgICAgICAgICBjb250ZW50OiAnJztcXG4gICAgICAgICAgICAgICAgICB3aWR0aDogOXB4O1xcbiAgICAgICAgICAgICAgICAgIGhlaWdodDogNC41cHg7XFxuICAgICAgICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgICAgICAgICAgICAgIHRvcDogNC41cHg7XFxuICAgICAgICAgICAgICAgICAgcmlnaHQ6IDA7XFxuICAgICAgICAgICAgICAgICAgYm9yZGVyOiAycHggc29saWQgIzAwMDtcXG4gICAgICAgICAgICAgICAgICBib3JkZXItdG9wOiBub25lO1xcbiAgICAgICAgICAgICAgICAgIGJvcmRlci1yaWdodDogbm9uZTtcXG4gICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLjE7XFxuICAgICAgICAgICAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgtNTBkZWcpO1xcbiAgICAgICAgICAgICAgICAgIC1tb3otdHJhbnNmb3JtOiByb3RhdGUoLTUwZGVnKTtcXG4gICAgICAgICAgICAgICAgICAtbXMtdHJhbnNmb3JtOiByb3RhdGUoLTUwZGVnKTtcXG4gICAgICAgICAgICAgICAgICAtby10cmFuc2Zvcm06IHJvdGF0ZSgtNTBkZWcpO1xcbiAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKC01MGRlZyk7IH1cXG4gICAgICAgICAgICAuYXg2dWktYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cCAuYXgtYXV0b2NvbXBsZXRlLWJvZHkgLmF4LWF1dG9jb21wbGV0ZS1vcHRpb24tZ3JvdXAtY29udGVudCAuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1pdGVtIC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWl0ZW0taG9sZGVyIC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWl0ZW0tY2VsbC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWl0ZW0tbGFiZWwge1xcbiAgICAgICAgICAgICAgcGFkZGluZzogMHB4IDVweDtcXG4gICAgICAgICAgICAgIHBhZGRpbmctcmlnaHQ6IDlweDsgfVxcbiAgICAgICAgLmF4NnVpLWF1dG9jb21wbGV0ZS1vcHRpb24tZ3JvdXAgLmF4LWF1dG9jb21wbGV0ZS1ib2R5IC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwLWNvbnRlbnQgLmF4LWF1dG9jb21wbGV0ZS1vcHRpb24taXRlbVtkYXRhLW9wdGlvbi1zZWxlY3RlZD1cXFwidHJ1ZVxcXCJdIC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWl0ZW0taG9sZGVyIC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWl0ZW0tY2VsbC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWl0ZW0tY2hlY2tib3ggLml0ZW0tY2hlY2tib3gtd3JhcC51c2VDaGVja0JveDphZnRlciB7XFxuICAgICAgICAgIG9wYWNpdHk6IDE7IH1cXG4gICAgICAuYXg2dWktYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cCAuYXgtYXV0b2NvbXBsZXRlLWJvZHkgLmF4LWF1dG9jb21wbGV0ZS1vcHRpb24tZ3JvdXAtY29udGVudCAuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cCAuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1pdGVtLWhvbGRlciB7XFxuICAgICAgICBkaXNwbGF5OiB0YWJsZTtcXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgICAgIGJvcmRlci1jb2xsYXBzZTogc2VwYXJhdGU7XFxuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgICBoZWlnaHQ6IDE4cHg7IH1cXG4gICAgICAgIC5heDZ1aS1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwIC5heC1hdXRvY29tcGxldGUtYm9keSAuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cC1jb250ZW50IC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwIC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWl0ZW0taG9sZGVyIC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwLWxhYmVsIHtcXG4gICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgICAgICAgZGlzcGxheTogdGFibGUtY2VsbDtcXG4gICAgICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gICAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gICAgICAgICAgZm9udC1zaXplOiAxM3B4O1xcbiAgICAgICAgICBsaW5lLWhlaWdodDogMThweDtcXG4gICAgICAgICAgcGFkZGluZzogNXB4IDEwcHg7XFxuICAgICAgICAgIHVzZXItc2VsZWN0OiBub25lOyB9XFxuICAgIC5heDZ1aS1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwIC5heC1hdXRvY29tcGxldGUtYm9keSAuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cC1idXR0b25zIHtcXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgICAgcGFkZGluZzogM3B4IDBweDsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIhLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi9zcmMvQVg2VUlBdXRvY29tcGxldGUvc3R5bGUuc2Nzc1xuLy8gbW9kdWxlIGlkID0gOTdcbi8vIG1vZHVsZSBjaHVua3MgPSAxMiJdLCJzb3VyY2VSb290IjoiIn0=