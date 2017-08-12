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

var _jqmin = __webpack_require__(1);

var _jqmin2 = _interopRequireDefault(_jqmin);

var _AX6UICore2 = __webpack_require__(5);

var _AX6UICore3 = _interopRequireDefault(_AX6UICore2);

var _AX6Info = __webpack_require__(3);

var _AX6Info2 = _interopRequireDefault(_AX6Info);

var _AX6Util = __webpack_require__(4);

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
    winWidth: Math.max($(window).width(), (0, _jqmin2.default)(document.body).width()),
    winHeight: Math.max($(window).height(), (0, _jqmin2.default)(document.body).height()),
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
      $(window).on("resize.ax6ui-autocomplete-display-" + this.instanceId, _AX6Util2.default.throttle(function (e) {
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
     * myAutocomplete.setValue($('[data-ax6ui-autocomplete="autocomplete1"]'), {value:"test", text:"test"});
     * myAutocomplete.setValue($('[data-ax6ui-autocomplete="autocomplete1"]'), [{value:"test1", text:"test1"}, {value:"test2", text:"test2"}]);
     * myAutocomplete.setValue($('[data-ax6ui-autocomplete="autocomplete1"]'), null);
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
     * myAutocomplete.setText($('[data-ax6ui-autocomplete="autocomplete1"]'), "string");
     * myAutocomplete.setText($('[data-ax6ui-autocomplete="autocomplete1"]'), ["substring", "search"]);
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
var update = __webpack_require__(2)(content, options);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXV0b2NvbXBsZXRlLmpzIiwid2VicGFjazovLy8uLi9zcmMvQVg2TXVzdGFjaGUuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9BWDZVSUF1dG9jb21wbGV0ZS5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL0FYNlVJQXV0b2NvbXBsZXRlL3N0eWxlLnNjc3M/ODQ1NCIsIndlYnBhY2s6Ly8vLi4vc3JjL0FYNlVJQXV0b2NvbXBsZXRlL3N0eWxlLnNjc3MiXSwibmFtZXMiOlsiaHRtbCIsImZuIiwibW9kdWxlUnVuIiwiJGJvZHkiLCJvcHRpb25zIiwicHVzaCIsInZhbHVlIiwidGV4dCIsImF1dG9jb21wbGV0ZSIsInJlbW92ZUljb24iLCJiaW5kIiwidGFyZ2V0IiwiaGVpZ2h0Iiwib3B0aW9uSXRlbUhlaWdodCIsIm9uU2VhcmNoIiwiY2FsbGJhY2siLCJzZWFyY2hXb3JkIiwic2V0VGltZW91dCIsInJlZ0V4cCIsIlJlZ0V4cCIsIm15T3B0aW9ucyIsImZvckVhY2giLCJuIiwibWF0Y2giLCJtb2R1bGVEZXN0cm95Iiwib2ZmIiwiQVg2IiwiZGVmaW5lTXVzdGFjaGUiLCJnbG9iYWwiLCJmYWN0b3J5IiwibXVzdGFjaGUiLCJtdXN0YWNoZUZhY3RvcnkiLCJvYmplY3RUb1N0cmluZyIsIk9iamVjdCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwiaXNBcnJheSIsIkFycmF5IiwiaXNBcnJheVBvbHlmaWxsIiwib2JqZWN0IiwiY2FsbCIsImlzRnVuY3Rpb24iLCJ0eXBlU3RyIiwib2JqIiwiZXNjYXBlUmVnRXhwIiwic3RyaW5nIiwicmVwbGFjZSIsImhhc1Byb3BlcnR5IiwicHJvcE5hbWUiLCJyZWdFeHBUZXN0IiwidGVzdCIsInRlc3RSZWdFeHAiLCJyZSIsIm5vblNwYWNlUmUiLCJpc1doaXRlc3BhY2UiLCJlbnRpdHlNYXAiLCJlc2NhcGVIdG1sIiwiU3RyaW5nIiwiZnJvbUVudGl0eU1hcCIsInMiLCJ3aGl0ZVJlIiwic3BhY2VSZSIsImVxdWFsc1JlIiwiY3VybHlSZSIsInRhZ1JlIiwicGFyc2VUZW1wbGF0ZSIsInRlbXBsYXRlIiwidGFncyIsInNlY3Rpb25zIiwidG9rZW5zIiwic3BhY2VzIiwiaGFzVGFnIiwibm9uU3BhY2UiLCJzdHJpcFNwYWNlIiwibGVuZ3RoIiwicG9wIiwib3BlbmluZ1RhZ1JlIiwiY2xvc2luZ1RhZ1JlIiwiY2xvc2luZ0N1cmx5UmUiLCJjb21waWxlVGFncyIsInRhZ3NUb0NvbXBpbGUiLCJzcGxpdCIsIkVycm9yIiwic2Nhbm5lciIsIlNjYW5uZXIiLCJzdGFydCIsInR5cGUiLCJjaHIiLCJ0b2tlbiIsIm9wZW5TZWN0aW9uIiwiZW9zIiwicG9zIiwic2NhblVudGlsIiwiaSIsInZhbHVlTGVuZ3RoIiwiY2hhckF0Iiwic2NhbiIsIm5lc3RUb2tlbnMiLCJzcXVhc2hUb2tlbnMiLCJzcXVhc2hlZFRva2VucyIsImxhc3RUb2tlbiIsIm51bVRva2VucyIsIm5lc3RlZFRva2VucyIsImNvbGxlY3RvciIsInNlY3Rpb24iLCJ0YWlsIiwiaW5kZXgiLCJzdWJzdHJpbmciLCJzZWFyY2giLCJDb250ZXh0IiwidmlldyIsInBhcmVudENvbnRleHQiLCJjYWNoZSIsInJldHVybnMiLCJrIiwicGFyZW50IiwibG9va3VwIiwibmFtZSIsImhhc093blByb3BlcnR5IiwiY29udGV4dCIsIm5hbWVzIiwibG9va3VwSGl0IiwiaW5kZXhPZiIsIldyaXRlciIsImNsZWFyQ2FjaGUiLCJwYXJzZSIsInJlbmRlciIsInBhcnRpYWxzIiwicmVuZGVyVG9rZW5zIiwib3JpZ2luYWxUZW1wbGF0ZSIsImJ1ZmZlciIsInN5bWJvbCIsInVuZGVmaW5lZCIsInJlbmRlclNlY3Rpb24iLCJyZW5kZXJJbnZlcnRlZCIsInJlbmRlclBhcnRpYWwiLCJ1bmVzY2FwZWRWYWx1ZSIsImVzY2FwZWRWYWx1ZSIsInJhd1ZhbHVlIiwic2VsZiIsInN1YlJlbmRlciIsImoiLCJzbGljZSIsImVzY2FwZSIsInZlcnNpb24iLCJkZWZhdWx0V3JpdGVyIiwiVHlwZUVycm9yIiwidG9faHRtbCIsInNlbmQiLCJyZXN1bHQiLCJjdHJsS2V5cyIsInRtcGwiLCJjb2x1bW5LZXlzIiwib3B0aW9uVmFsdWUiLCJvcHRpb25UZXh0Iiwib3B0aW9uU2VsZWN0ZWQiLCJvblN0YXRlQ2hhbmdlZCIsIml0ZW0iLCJ0aGF0Iiwic3RhdGUiLCJvbkNoYW5nZSIsImFsaWduQXV0b2NvbXBsZXRlRGlzcGxheSIsInF1ZXVlIiwidyIsIiRkaXNwbGF5IiwiTWF0aCIsIm1heCIsIiRzZWxlY3QiLCJvdXRlcldpZHRoIiwibnVtYmVyIiwibWluV2lkdGgiLCJjc3MiLCJyZXNldCIsImZpbmQiLCJtdWx0aXBsZSIsImRpc3BsYXlUYWJsZUhlaWdodEFkanVzdCIsIiR0YXJnZXQiLCJkaXNwbGF5VGFibGVIZWlnaHQiLCIkZGlzcGxheVRhYmxlIiwib3V0ZXJIZWlnaHQiLCJhYnMiLCJhbGlnbkF1dG9jb21wbGV0ZU9wdGlvbkdyb3VwIiwiYXBwZW5kIiwiYWN0aXZlYXV0b2NvbXBsZXRlT3B0aW9uR3JvdXAiLCJhY3RpdmVhdXRvY29tcGxldGVRdWV1ZUluZGV4IiwicG9zaXRpb25NYXJnaW4iLCJkaW0iLCJwaWNrZXJEaW0iLCJwaWNrZXJEaXJlY3Rpb24iLCJkb2N1bWVudCIsImJvZHkiLCJvZmZzZXQiLCJ3aWR0aCIsIndpbldpZHRoIiwiJCIsIndpbmRvdyIsIndpbkhlaWdodCIsImRpcmVjdGlvbiIsInRvcCIsImFkZENsYXNzIiwibmV3VG9wIiwibGVmdCIsIm9uQm9keUNsaWNrIiwiZSIsImNsaWNrRWwiLCJmaW5kUGFyZW50Tm9kZSIsImdldEF0dHJpYnV0ZSIsImdldCIsImNsb3NlIiwic2V0U2VsZWN0ZWQiLCJpZCIsIm9wdGlvbkluZGV4IiwiZ2V0TGFiZWwiLCJxdWVJZHgiLCJkYXRhIiwidGhlbWUiLCJsYW5nIiwic2VsZWN0ZWQiLCJoYXNTZWxlY3RlZCIsImxhYmVsIiwic3luY0xhYmVsIiwiY29uY2F0IiwibmluZGV4IiwiZm9ybVNlbGVjdE9wdGlvbnMiLCJwcmludExhYmVsIiwiJGRpc3BsYXlMYWJlbCIsInJlbW92ZSIsIiRkaXNwbGF5TGFiZWxJbnB1dCIsImJlZm9yZSIsImZvY3VzTGFiZWwiLCJkaXNhYmxlZCIsInRyaWdnZXIiLCJmb2N1cyIsImNsZWFyTGFiZWwiLCJ2YWwiLCJibHVyTGFiZWwiLCJ3YWl0T3B0aW9ucyIsIk8iLCJvcHRpb25zTWFwIiwiX08iLCJfT0luZGV4IiwiZm9jdXNXb3JkIiwiY29sbGVjdF9vcHRpb25zIiwibCIsInRvTG93ZXJDYXNlIiwib3B0aW9uc1NvcnQiLCJzb3J0IiwiYSIsImIiLCJmb2N1c01vdmUiLCJmb2N1c0NsZWFyIiwicmVtb3ZlQ2xhc3MiLCJyZW1vdmVBdHRyIiwib3B0aW9uRm9jdXNJbmRleCIsImZpbmRleCIsIl9mb2N1c0luZGV4IiwiX3ByZXZGb2N1c0luZGV4IiwiZm9jdXNPcHRpb25FbCIsIm9wdGlvbkdyb3VwU2Nyb2xsQ29udGFpbmVyIiwib3B0aW9uU2VsZWN0ZWRJbmRleCIsIm9wdGlvbkl0ZW1MZW5ndGgiLCJoaWRlIiwiaXNTdHJvcCIsImZvY3VzT3B0aW9uRWxIZWlnaHQiLCJvcHRpb25Hcm91cFNjcm9sbENvbnRhaW5lckhlaWdodCIsImlubmVySGVpZ2h0Iiwib3B0aW9uR3JvdXBTY3JvbGxDb250YWluZXJTY3JvbGxUb3AiLCJzY3JvbGxUb3AiLCJmb2N1c09wdGlvbkVsVG9wIiwicG9zaXRpb24iLCJiaW5kQXV0b2NvbXBsZXRlVGFyZ2V0IiwiZGVib3VuY2VkRm9jdXNXb3JkIiwiZGVib3VuY2UiLCJhdXRvY29tcGxldGVFdmVudCIsInJlbW92ZUluZGV4Iiwic3BsaWNlIiwic3RvcEV2ZW50IiwiY2xlYXIiLCJ3aGljaCIsImV2ZW50S2V5cyIsIkVTQyIsIlRBQiIsIkJBQ0tTUEFDRSIsIm9wZW4iLCJSRVRVUk4iLCJpbnB1dFZhbHVlIiwiRE9XTiIsIlVQIiwiaW5zdGFuY2VJZCIsInRhYkluZGV4IiwicGFkZGluZ0xlZnQiLCJhdXRvY29tcGxldGVEaXNwbGF5IiwiYXR0ciIsImZvcm1TaXplIiwiZm9ybVNlbGVjdCIsIm9uIiwiY2xpY2siLCJibHVyIiwia2V5RG93biIsImtleVVwIiwiZ2V0UXVlSWR4IiwiYm91bmRJRCIsImlzU3RyaW5nIiwiY29uc29sZSIsImxvZyIsImdldEVycm9yIiwiZ2V0U2VsZWN0ZWQiLCJfaXRlbSIsIm8iLCJjbGVhclNlbGVjdGVkIiwib3B0Z3JvdXAiLCJubiIsIl9vcHRpb24iLCJwcm9jZXNzb3IiLCJzZXRWYWx1ZVR5cGUiLCJhZGRPcHRpb25zIiwibmV3U2VsZWN0ZWRBcnJheSIsInJlbW92ZVNlbGVjdGVkSW5kZXgiLCJwdXNoT2siLCJ2YWx1ZXMiLCJpc051bWJlciIsImtleSIsImFwcGVuZE9rIiwiY29uZmlnIiwiYXJyIiwibm9TdGF0ZUNoYW5nZSIsIkFYNlVJQXV0b2NvbXBsZXRlIiwiYW5pbWF0ZVRpbWUiLCJib3JkZXJXaWR0aCIsIm5vU2VsZWN0ZWQiLCJub09wdGlvbnMiLCJsb2FkaW5nIiwiZXh0ZW5kIiwib3BlblRpbWVyIiwiY2xvc2VUaW1lciIsIndhaXRPcHRpb25zQ2FsbGJhY2siLCJrZXlVcFRpbWVyIiwieHZhciIsImluaXQiLCJpbml0T25jZSIsImluaXRpYWxpemVkIiwidGhyb3R0bGUiLCJldmVudCIsImdldEluc3RhbmNlSWQiLCJpc09iamVjdCIsImVycm9yIiwicGFyc2VKc29uIiwidHJ5Q291bnQiLCJmb2N1c1RvcCIsInNlbGVjdGVkT3B0aW9uRWwiLCJjbGVhclRpbWVvdXQiLCJvcHRpb25Hcm91cCIsIl9ib3VuZElEIiwiX3ZhbHVlIiwiX3ZhbHVlcyIsIm1hcCIsIl90ZXh0IiwiZGVlcENvcHkiLCJkaXNhYmxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQSxJQUFJQSxzTEFBSjtBQU9BLElBQUlDLEtBQUs7QUFDUEMsYUFBVyxtQkFBVUMsS0FBVixFQUFpQjtBQUMxQixRQUFJQyxVQUFVLEVBQWQ7QUFDQUEsWUFBUUMsSUFBUixDQUFhLEVBQUNDLE9BQU8sR0FBUixFQUFhQyxNQUFNLFFBQW5CLEVBQWI7QUFDQUgsWUFBUUMsSUFBUixDQUFhLEVBQUNDLE9BQU8sR0FBUixFQUFhQyxNQUFNLFFBQW5CLEVBQWI7QUFDQUgsWUFBUUMsSUFBUixDQUFhLEVBQUNDLE9BQU8sR0FBUixFQUFhQyxNQUFNLFFBQW5CLEVBQWI7QUFDQUgsWUFBUUMsSUFBUixDQUFhLEVBQUNDLE9BQU8sR0FBUixFQUFhQyxNQUFNLFdBQW5CLEVBQWI7QUFDQUgsWUFBUUMsSUFBUixDQUFhLEVBQUNDLE9BQU8sR0FBUixFQUFhQyxNQUFNLFFBQW5CLEVBQWI7QUFDQUgsWUFBUUMsSUFBUixDQUFhLEVBQUNDLE9BQU8sR0FBUixFQUFhQyxNQUFNLFVBQW5CLEVBQWI7QUFDQUgsWUFBUUMsSUFBUixDQUFhLEVBQUNDLE9BQU8sR0FBUixFQUFhQyxNQUFNLFNBQW5CLEVBQWI7QUFDQUgsWUFBUUMsSUFBUixDQUFhLEVBQUNDLE9BQU8sR0FBUixFQUFhQyxNQUFNLEtBQW5CLEVBQWI7QUFDQUgsWUFBUUMsSUFBUixDQUFhLEVBQUNDLE9BQU8sR0FBUixFQUFhQyxNQUFNLEtBQW5CLEVBQWI7QUFDQUgsWUFBUUMsSUFBUixDQUFhLEVBQUNDLE9BQU8sSUFBUixFQUFjQyxNQUFNLEtBQXBCLEVBQWI7QUFDQUgsWUFBUUMsSUFBUixDQUFhLEVBQUNDLE9BQU8sSUFBUixFQUFjQyxNQUFNLEtBQXBCLEVBQWI7QUFDQUgsWUFBUUMsSUFBUixDQUFhLEVBQUNDLE9BQU8sSUFBUixFQUFjQyxNQUFNLEtBQXBCLEVBQWI7QUFDQUgsWUFBUUMsSUFBUixDQUFhLEVBQUNDLE9BQU8sSUFBUixFQUFjQyxNQUFNLEtBQXBCLEVBQWI7QUFDQUgsWUFBUUMsSUFBUixDQUFhLEVBQUNDLE9BQU8sSUFBUixFQUFjQyxNQUFNLEtBQXBCLEVBQWI7QUFDQUgsWUFBUUMsSUFBUixDQUFhLEVBQUNDLE9BQU8sSUFBUixFQUFjQyxNQUFNLEtBQXBCLEVBQWI7QUFDQUgsWUFBUUMsSUFB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QUEyQixFQUFFLG1JQUFtSSwyQkFBMkIsMkJBQTJCLDBCQUEwQiwwQkFBMEIsNkJBQTZCLGlDQUFpQywyQkFBMkIsRUFBRSx5S0FBeUssMkJBQTJCLCtCQUErQixzQ0FBc0MsNkJBQTZCLHdCQUF3Qix5QkFBeUIsRUFBRSw2TUFBNk0scUNBQXFDLGtDQUFrQyxxQ0FBcUMsa0NBQWtDLDhCQUE4QixnQ0FBZ0MsK0JBQStCLGdDQUFnQyxFQUFFLG9QQUFvUCxpQ0FBaUMsNEJBQTRCLG1DQUFtQyxFQUFFLDBRQUEwUSxxQ0FBcUMsaUNBQWlDLDhCQUE4QiwrQkFBK0IsRUFBRSw4UkFBOFIsMkNBQTJDLGdDQUFnQywrQkFBK0Isa0NBQWtDLHVDQUF1QywrQkFBK0IsNkJBQTZCLDJDQUEyQyxxQ0FBcUMsdUNBQXVDLDRDQUE0QyxpQ0FBaUMsc0RBQXNELG1EQUFtRCxrREFBa0QsaURBQWlELDhDQUE4QyxFQUFFLGlQQUFpUCxpQ0FBaUMsbUNBQW1DLEVBQUUscVRBQXFULHVCQUF1QixFQUFFLHdLQUF3Syx5QkFBeUIsNkJBQTZCLG9DQUFvQywyQkFBMkIsc0JBQXNCLHVCQUF1QixFQUFFLDhNQUE4TSxtQ0FBbUMsZ0NBQWdDLG1DQUFtQyxnQ0FBZ0MsNEJBQTRCLDhCQUE4Qiw4QkFBOEIsOEJBQThCLEVBQUUsb0dBQW9HLDJCQUEyQix5QkFBeUIsRUFBRTs7QUFFOTRoQiIsImZpbGUiOiIxMi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gXCJqcW1pblwiO1xuaW1wb3J0IEF1dG9jb21wbGV0ZSBmcm9tIFwiLi4vLi4vc3JjL0FYNlVJQXV0b2NvbXBsZXRlXCI7XG5pbXBvcnQgXCIuLi8uLi9zcmMvQVg2VUlBdXRvY29tcGxldGUvc3R5bGUuc2Nzc1wiO1xuXG5sZXQgaHRtbCA9IGBcbjxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZmllbGQgY29sIHMxMlwiPlxuICAgICAgICA8ZGl2IGRhdGEtYXg2dWktYXV0b2NvbXBsZXRlPVwiYWMxXCIgZGF0YS1heDZ1aS1hdXRvY29tcGxldGUtY29uZmlnPSd7fSc+PC9kaXY+XG4gICAgPC9kaXY+XG48L2Rpdj5cbmA7XG5sZXQgZm4gPSB7XG4gIG1vZHVsZVJ1bjogZnVuY3Rpb24gKCRib2R5KSB7XG4gICAgbGV0IG9wdGlvbnMgPSBbXTtcbiAgICBvcHRpb25zLnB1c2goe3ZhbHVlOiBcIjFcIiwgdGV4dDogXCJzdHJpbmdcIn0pO1xuICAgIG9wdGlvbnMucHVzaCh7dmFsdWU6IFwiMlwiLCB0ZXh0OiBcIm51bWJlclwifSk7XG4gICAgb3B0aW9ucy5wdXNoKHt2YWx1ZTogXCIzXCIsIHRleHQ6IFwic3Vic3RyXCJ9KTtcbiAgICBvcHRpb25zLnB1c2goe3ZhbHVlOiBcIjRcIiwgdGV4dDogXCJzdWJzdHJpbmdcIn0pO1xuICAgIG9wdGlvbnMucHVzaCh7dmFsdWU6IFwiNVwiLCB0ZXh0OiBcInNlYXJjaFwifSk7XG4gICAgb3B0aW9ucy5wdXNoKHt2YWx1ZTogXCI2XCIsIHRleHQ6IFwicGFyc2VJbnRcIn0pO1xuICAgIG9wdGlvbnMucHVzaCh7dmFsdWU6IFwiN1wiLCB0ZXh0OiBcInRvRml4ZWRcIn0pO1xuICAgIG9wdGlvbnMucHVzaCh7dmFsdWU6IFwiOFwiLCB0ZXh0OiBcIm1pblwifSk7XG4gICAgb3B0aW9ucy5wdXNoKHt2YWx1ZTogXCI5XCIsIHRleHQ6IFwibWF4XCJ9KTtcbiAgICBvcHRpb25zLnB1c2goe3ZhbHVlOiBcIjEwXCIsIHRleHQ6IFwi7J6l6riw7JiBXCJ9KTtcbiAgICBvcHRpb25zLnB1c2goe3ZhbHVlOiBcIjExXCIsIHRleHQ6IFwi7J6l7ISc7JqwXCJ9KTtcbiAgICBvcHRpb25zLnB1c2goe3ZhbHVlOiBcIjEyXCIsIHRleHQ6IFwi7J207JiB7Z2sXCJ9KTtcbiAgICBvcHRpb25zLnB1c2goe3ZhbHVlOiBcIjEzXCIsIHRleHQ6IFwi7Zmp7J247IScXCJ9KTtcbiAgICBvcHRpb25zLnB1c2goe3ZhbHVlOiBcIjE0XCIsIHRleHQ6IFwi7Zmp7IS47KeEXCJ9KTtcbiAgICBvcHRpb25zLnB1c2goe3ZhbHVlOiBcIjE1XCIsIHRleHQ6IFwi7J207ISc7JewXCJ9KTtcbiAgICBvcHRpb25zLnB1c2goe3ZhbHVlOiBcIjE2XCIsIHRleHQ6IFwi7JWh7Iuc7Iqk7KCc7J20XCJ9KTtcbiAgICBvcHRpb25zLnB1c2goe3ZhbHVlOiBcIjE3XCIsIHRleHQ6IFwiYXg1XCJ9KTtcbiAgICBvcHRpb25zLnB1c2goe3ZhbHVlOiBcIjE4XCIsIHRleHQ6IFwiYXg1Z3JpZFwifSk7XG4gICAgb3B0aW9ucy5wdXNoKHt2YWx1ZTogXCIxOVwiLCB0ZXh0OiBcImF4NWNvbWJvYm94XCJ9KTtcbiAgICBvcHRpb25zLnB1c2goe3ZhbHVlOiBcIjIwXCIsIHRleHQ6IFwiYXg1YXV0b2NvbXBsZXRlXCJ9KTtcbiAgICBvcHRpb25zLnB1c2goe3ZhbHVlOiBcIjIxXCIsIHRleHQ6IFwiYXg1YmluZGVyXCJ9KTtcbiAgICBvcHRpb25zLnB1c2goe3ZhbHVlOiBcIjIyXCIsIHRleHQ6IFwiYXg1c2VsZWN0XCJ9KTtcbiAgICBvcHRpb25zLnB1c2goe3ZhbHVlOiBcIjIzXCIsIHRleHQ6IFwiYXg1bWFza1wifSk7XG4gICAgb3B0aW9ucy5wdXNoKHt2YWx1ZTogXCIyNFwiLCB0ZXh0OiBcImF4NXRvYXN0XCJ9KTtcbiAgICBvcHRpb25zLnB1c2goe3ZhbHVlOiBcIjI1XCIsIHRleHQ6IFwiYXg1ZGlhbG9nXCJ9KTtcbiAgICBvcHRpb25zLnB1c2goe3ZhbHVlOiBcIjI2XCIsIHRleHQ6IFwiYXg1bW9kYWxcIn0pO1xuXG4gICAgbGV0IGF1dG9jb21wbGV0ZSA9IG5ldyBBdXRvY29tcGxldGUoe1xuICAgICAgcmVtb3ZlSWNvbjogJzxpIGNsYXNzPVwidGlueSBtYXRlcmlhbC1pY29uc1wiPmNsb3NlPC9pPidcbiAgICB9KTtcblxuICAgIGF1dG9jb21wbGV0ZS5iaW5kKHtcbiAgICAgIHRhcmdldDogJCgnW2RhdGEtYXg2dWktYXV0b2NvbXBsZXRlPVwiYWMxXCJdJyksXG4gICAgICBoZWlnaHQ6IDQwLFxuICAgICAgb3B0aW9uSXRlbUhlaWdodDogMzAsXG4gICAgICBvblNlYXJjaDogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIGxldCBzZWFyY2hXb3JkID0gdGhpcy5zZWFyY2hXb3JkO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGxldCByZWdFeHAgPSBuZXcgUmVnRXhwKHNlYXJjaFdvcmQpO1xuICAgICAgICAgIGxldCBteU9wdGlvbnMgPSBbXTtcbiAgICAgICAgICBvcHRpb25zLmZvckVhY2goZnVuY3Rpb24gKG4pIHtcbiAgICAgICAgICAgIGlmIChuLnRleHQubWF0Y2gocmVnRXhwKSkge1xuICAgICAgICAgICAgICBteU9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgdmFsdWU6IG4udmFsdWUsXG4gICAgICAgICAgICAgICAgdGV4dDogbi50ZXh0XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgY2FsbGJhY2soe1xuICAgICAgICAgICAgb3B0aW9uczogbXlPcHRpb25zXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sIDE1MCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG4gIG1vZHVsZURlc3Ryb3k6IGZ1bmN0aW9uICgkYm9keSkge1xuICAgICRib2R5Lm9mZihcImNsaWNrXCIpO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGh0bWw6IGh0bWwsXG4gIGZuOiBmblxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hdXRvY29tcGxldGUuanMiLCIvKiFcbiAqIG11c3RhY2hlLmpzIC0gTG9naWMtbGVzcyB7e211c3RhY2hlfX0gdGVtcGxhdGVzIHdpdGggSmF2YVNjcmlwdFxuICogaHR0cDovL2dpdGh1Yi5jb20vamFubC9tdXN0YWNoZS5qc1xuICogaHR0cHM6Ly9naXRodWIuY29tL3Rob21hc0phbmcvbXVzdGFjaGUuanMgLS0gaW1wb3JvdmUgc29tZSB2YXJpYWJsZXNcbiAqL1xuXG5cbi8qKlxuICogQVg2TXVzdGFjaGXripQgaHR0cDovL2dpdGh1Yi5jb20vamFubC9tdXN0YWNoZS5qc+yXkCDrqofqsIDsp4Ag7LWc7IaM7ZWc7J2YIOq4sOuKpeydhCDtipzri53tlZjsl6wg7IKs7Jqp7ZWY64qUIO2FnO2UjOumvyDsl5Tsp4TsnoXri4jri6QuXG4gKiBAbmFtZXNwYWNlIEFYNk11c3RhY2hlXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIEFYNk11c3RhY2hlLnJlbmRlclxuICogQGV4YW1wbGVcbiAqIGBgYGpzXG4gKiBheDUubXVzdGFjaGUucmVuZGVyKHRlbXBsYXRlLCB2aWV3KVxuICpcbiAqXG4gKiAvL0FycmF5IEBpXG4gKiAvL3t7I2JlYXRsZXN9fVxuICogLy97e2ZpcnN0TmFtZX19IHt7bGFzdE5hbWV9fSAoe3tAaX19KSAoe3tAZmlyc3R9fSlcbiAqIC8ve3svYmVhdGxlc319XG4gKlxuICogLy9PYmplY3QgQGVhY2hcbiAqIHt7I2JlYXRsZXN9fVxuICogIHt7I0BlYWNofX1cbiAqICAgICAge3tAa2V5fX0gOiB7e0B2YWx1ZS5maXJzdE5hbWV9fSB7e0B2YWx1ZS5sYXN0TmFtZX19XG4gKiAge3svQGVhY2h9fVxuICoge3svYmVhdGxlc319XG4gKlxuICogYGBgXG4gKi9cblxuXG5cbmxldCBBWDYgPSB7fTtcblxuKGZ1bmN0aW9uIGRlZmluZU11c3RhY2hlKGdsb2JhbCwgZmFjdG9yeSkge1xuXG4gIGZhY3RvcnkoZ2xvYmFsLm11c3RhY2hlID0ge30pO1xuXG59KEFYNiwgZnVuY3Rpb24gbXVzdGFjaGVGYWN0b3J5KG11c3RhY2hlKSB7XG5cbiAgdmFyIG9iamVjdFRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbiAgdmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIGlzQXJyYXlQb2x5ZmlsbChvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0VG9TdHJpbmcuY2FsbChvYmplY3QpID09PSAnW29iamVjdCBBcnJheV0nO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGlzRnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmplY3QgPT09ICdmdW5jdGlvbic7XG4gIH1cblxuICAvKipcbiAgICogTW9yZSBjb3JyZWN0IHR5cGVvZiBzdHJpbmcgaGFuZGxpbmcgYXJyYXlcbiAgICogd2hpY2ggbm9ybWFsbHkgcmV0dXJucyB0eXBlb2YgJ29iamVjdCdcbiAgICovXG4gIGZ1bmN0aW9uIHR5cGVTdHIob2JqKSB7XG4gICAgcmV0dXJuIGlzQXJyYXkob2JqKSA/ICdhcnJheScgOiB0eXBlb2Ygb2JqO1xuICB9XG5cbiAgZnVuY3Rpb24gZXNjYXBlUmVnRXhwKHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvW1xcLVxcW1xcXXt9KCkqKz8uLFxcXFxcXF4kfCNcXHNdL2csICdcXFxcJCYnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOdWxsIHNhZmUgd2F5IG9mIGNoZWNraW5nIHdoZXRoZXIgb3Igbm90IGFuIG9iamVjdCxcbiAgICogaW5jbHVkaW5nIGl0cyBwcm90b3R5cGUsIGhhcyBhIGdpdmVuIHByb3BlcnR5XG4gICAqL1xuICBmdW5jdGlvbiBoYXNQcm9wZXJ0eShvYmosIHByb3BOYW1lKSB7XG4gICAgcmV0dXJuIG9iaiAhPSBudWxsICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIChwcm9wTmFtZSBpbiBvYmopO1xuICB9XG5cbiAgLy8gV29ya2Fyb3VuZCBmb3IgaHR0cHM6Ly9pc3N1ZXMuYXBhY2hlLm9yZy9qaXJhL2Jyb3dzZS9DT1VDSERCLTU3N1xuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2phbmwvbXVzdGFjaGUuanMvaXNzdWVzLzE4OVxuICB2YXIgcmVnRXhwVGVzdCA9IFJlZ0V4cC5wcm90b3R5cGUudGVzdDtcblxuICBmdW5jdGlvbiB0ZXN0UmVnRXhwKHJlLCBzdHJpbmcpIHtcbiAgICByZXR1cm4gcmVnRXhwVGVzdC5jYWxsKHJlLCBzdHJpbmcpO1xuICB9XG5cbiAgdmFyIG5vblNwYWNlUmUgPSAvXFxTLztcblxuICBmdW5jdGlvbiBpc1doaXRlc3BhY2Uoc3RyaW5nKSB7XG4gICAgcmV0dXJuICF0ZXN0UmVnRXhwKG5vblNwYWNlUmUsIHN0cmluZyk7XG4gIH1cblxuICB2YXIgZW50aXR5TWFwID0ge1xuICAgICcmJzogJyZhbXA7JywgJzwnOiAnJmx0OycsICc+JzogJyZndDsnLCAnXCInOiAnJnF1b3Q7JywgXCInXCI6ICcmIzM5OycsICcvJzogJyYjeDJGOydcbiAgfTtcblxuICBmdW5jdGlvbiBlc2NhcGVIdG1sKHN0cmluZykge1xuICAgIHJldHVybiBTdHJpbmcoc3RyaW5nKS5yZXBsYWNlKC9bJjw+XCInXFwvXS9nLCBmdW5jdGlvbiBmcm9tRW50aXR5TWFwKHMpIHtcbiAgICAgIHJldHVybiBlbnRpdHlNYXBbc107XG4gICAgfSk7XG4gIH1cblxuICB2YXIgd2hpdGVSZSA9IC9cXHMqLztcbiAgdmFyIHNwYWNlUmUgPSAvXFxzKy87XG4gIHZhciBlcXVhbHNSZSA9IC9cXHMqPS87XG4gIHZhciBjdXJseVJlID0gL1xccypcXH0vO1xuICB2YXIgdGFnUmUgPSAvI3xcXF58XFwvfD58XFx7fCZ8PXwhLztcblxuICAvKipcbiAgICogQnJlYWtzIHVwIHRoZSBnaXZlbiBgdGVtcGxhdGVgIHN0cmluZyBpbnRvIGEgdHJlZSBvZiB0b2tlbnMuIElmIHRoZSBgdGFnc2BcbiAgICogYXJndW1lbnQgaXMgZ2l2ZW4gaGVyZSBpdCBtdXN0IGJlIGFuIGFycmF5IHdpdGggdHdvIHN0cmluZyB2YWx1ZXM6IHRoZVxuICAgKiBvcGVuaW5nIGFuZCBjbG9zaW5nIHRhZ3MgdXNlZCBpbiB0aGUgdGVtcGxhdGUgKGUuZy4gWyBcIjwlXCIsIFwiJT5cIiBdKS4gT2ZcbiAgICogY291cnNlLCB0aGUgZGVmYXVsdCBpcyB0byB1c2UgbXVzdGFjaGVzIChpLmUuIG11c3RhY2hlLnRhZ3MpLlxuICAgKlxuICAgKiBBIHRva2VuIGlzIGFuIGFycmF5IHdpdGggYXQgbGVhc3QgNCBlbGVtZW50cy4gVGhlIGZpcnN0IGVsZW1lbnQgaXMgdGhlXG4gICAqIG11c3RhY2hlIHN5bWJvbCB0aGF0IHdhcyB1c2VkIGluc2lkZSB0aGUgdGFnLCBlLmcuIFwiI1wiIG9yIFwiJlwiLiBJZiB0aGUgdGFnXG4gICAqIGRpZCBub3QgY29udGFpbiBhIHN5bWJvbCAoaS5lLiB7e215VmFsdWV9fSkgdGhpcyBlbGVtZW50IGlzIFwibmFtZVwiLiBGb3JcbiAgICogYWxsIHRleHQgdGhhdCBhcHBlYXJzIG91dHNpZGUgYSBzeW1ib2wgdGhpcyBlbGVtZW50IGlzIFwidGV4dFwiLlxuICAgKlxuICAgKiBUaGUgc2Vjb25kIGVsZW1lbnQgb2YgYSB0b2tlbiBpcyBpdHMgXCJ2YWx1ZVwiLiBGb3IgbXVzdGFjaGUgdGFncyB0aGlzIGlzXG4gICAqIHdoYXRldmVyIGVsc2Ugd2FzIGluc2lkZSB0aGUgdGFnIGJlc2lkZXMgdGhlIG9wZW5pbmcgc3ltYm9sLiBGb3IgdGV4dCB0b2tlbnNcbiAgICogdGhpcyBpcyB0aGUgdGV4dCBpdHNlbGYuXG4gICAqXG4gICAqIFRoZSB0aGlyZCBhbmQgZm91cnRoIGVsZW1lbnRzIG9mIHRoZSB0b2tlbiBhcmUgdGhlIHN0YXJ0IGFuZCBlbmQgaW5kaWNlcyxcbiAgICogcmVzcGVjdGl2ZWx5LCBvZiB0aGUgdG9rZW4gaW4gdGhlIG9yaWdpbmFsIHRlbXBsYXRlLlxuICAgKlxuICAgKiBUb2tlbnMgdGhhdCBhcmUgdGhlIHJvb3Qgbm9kZSBvZiBhIHN1YnRyZWUgY29udGFpbiB0d28gbW9yZSBlbGVtZW50czogMSkgYW5cbiAgICogYXJyYXkgb2YgdG9rZW5zIGluIHRoZSBzdWJ0cmVlIGFuZCAyKSB0aGUgaW5kZXggaW4gdGhlIG9yaWdpbmFsIHRlbXBsYXRlIGF0XG4gICAqIHdoaWNoIHRoZSBjbG9zaW5nIHRhZyBmb3IgdGhhdCBzZWN0aW9uIGJlZ2lucy5cbiAgICovXG4gIGZ1bmN0aW9uIHBhcnNlVGVtcGxhdGUodGVtcGxhdGUsIHRhZ3MpIHtcbiAgICBpZiAoIXRlbXBsYXRlKVxuICAgICAgcmV0dXJuIFtdO1xuXG4gICAgdmFyIHNlY3Rpb25zID0gW107ICAgICAvLyBTdGFjayB0byBob2xkIHNlY3Rpb24gdG9rZW5zXG4gICAgdmFyIHRva2VucyA9IFtdOyAgICAgICAvLyBCdWZmZXIgdG8gaG9sZCB0aGUgdG9rZW5zXG4gICAgdmFyIHNwYWNlcyA9IFtdOyAgICAgICAvLyBJbmRpY2VzIG9mIHdoaXRlc3BhY2UgdG9rZW5zIG9uIHRoZSBjdXJyZW50IGxpbmVcbiAgICB2YXIgaGFzVGFnID0gZmFsc2U7ICAgIC8vIElzIHRoZXJlIGEge3t0YWd9fSBvbiB0aGUgY3VycmVudCBsaW5lP1xuICAgIHZhciBub25TcGFjZSA9IGZhbHNlOyAgLy8gSXMgdGhlcmUgYSBub24tc3BhY2UgY2hhciBvbiB0aGUgY3VycmVudCBsaW5lP1xuXG4gICAgLy8gU3RyaXBzIGFsbCB3aGl0ZXNwYWNlIHRva2VucyBhcnJheSBmb3IgdGhlIGN1cnJlbnQgbGluZVxuICAgIC8vIGlmIHRoZXJlIHdhcyBhIHt7I3RhZ319IG9uIGl0IGFuZCBvdGhlcndpc2Ugb25seSBzcGFjZS5cbiAgICBmdW5jdGlvbiBzdHJpcFNwYWNlKCkge1xuICAgICAgaWYgKGhhc1RhZyAmJiAhbm9uU3BhY2UpIHtcbiAgICAgICAgd2hpbGUgKHNwYWNlcy5sZW5ndGgpXG4gICAgICAgICAgZGVsZXRlIHRva2Vuc1tzcGFjZXMucG9wKCldO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHNwYWNlcyA9IFtdO1xuICAgICAgfVxuXG4gICAgICBoYXNUYWcgPSBmYWxzZTtcbiAgICAgIG5vblNwYWNlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIG9wZW5pbmdUYWdSZSwgY2xvc2luZ1RhZ1JlLCBjbG9zaW5nQ3VybHlSZTtcblxuICAgIGZ1bmN0aW9uIGNvbXBpbGVUYWdzKHRhZ3NUb0NvbXBpbGUpIHtcbiAgICAgIGlmICh0eXBlb2YgdGFnc1RvQ29tcGlsZSA9PT0gJ3N0cmluZycpXG4gICAgICAgIHRhZ3NUb0NvbXBpbGUgPSB0YWdzVG9Db21waWxlLnNwbGl0KHNwYWNlUmUsIDIpO1xuXG4gICAgICBpZiAoIWlzQXJyYXkodGFnc1RvQ29tcGlsZSkgfHwgdGFnc1RvQ29tcGlsZS5sZW5ndGggIT09IDIpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCB0YWdzOiAnICsgdGFnc1RvQ29tcGlsZSk7XG5cbiAgICAgIG9wZW5pbmdUYWdSZSA9IG5ldyBSZWdFeHAoZXNjYXBlUmVnRXhwKHRhZ3NUb0NvbXBpbGVbMF0pICsgJ1xcXFxzKicpO1xuICAgICAgY2xvc2luZ1RhZ1JlID0gbmV3IFJlZ0V4cCgnXFxcXHMqJyArIGVzY2FwZVJlZ0V4cCh0YWdzVG9Db21waWxlWzFdKSk7XG4gICAgICBjbG9zaW5nQ3VybHlSZSA9IG5ldyBSZWdFeHAoJ1xcXFxzKicgKyBlc2NhcGVSZWdFeHAoJ30nICsgdGFnc1RvQ29tcGlsZVsxXSkpO1xuICAgIH1cblxuICAgIGNvbXBpbGVUYWdzKHRhZ3MgfHwgbXVzdGFjaGUudGFncyk7XG5cbiAgICB2YXIgc2Nhbm5lciA9IG5ldyBTY2FubmVyKHRlbXBsYXRlKTtcblxuICAgIHZhciBzdGFydCwgdHlwZSwgdmFsdWUsIGNociwgdG9rZW4sIG9wZW5TZWN0aW9uO1xuICAgIHdoaWxlICghc2Nhbm5lci5lb3MoKSkge1xuICAgICAgc3RhcnQgPSBzY2FubmVyLnBvcztcblxuICAgICAgLy8gTWF0Y2ggYW55IHRleHQgYmV0d2VlbiB0YWdzLlxuICAgICAgdmFsdWUgPSBzY2FubmVyLnNjYW5VbnRpbChvcGVuaW5nVGFnUmUpO1xuXG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHZhbHVlTGVuZ3RoID0gdmFsdWUubGVuZ3RoOyBpIDwgdmFsdWVMZW5ndGg7ICsraSkge1xuICAgICAgICAgIGNociA9IHZhbHVlLmNoYXJBdChpKTtcblxuICAgICAgICAgIGlmIChpc1doaXRlc3BhY2UoY2hyKSkge1xuICAgICAgICAgICAgc3BhY2VzLnB1c2godG9rZW5zLmxlbmd0aCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbm9uU3BhY2UgPSB0cnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRva2Vucy5wdXNoKFsndGV4dCcsIGNociwgc3RhcnQsIHN0YXJ0ICsgMV0pO1xuICAgICAgICAgIHN0YXJ0ICs9IDE7XG5cbiAgICAgICAgICAvLyBDaGVjayBmb3Igd2hpdGVzcGFjZSBvbiB0aGUgY3VycmVudCBsaW5lLlxuICAgICAgICAgIGlmIChjaHIgPT09ICdcXG4nKVxuICAgICAgICAgICAgc3RyaXBTcGFjZSgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIE1hdGNoIHRoZSBvcGVuaW5nIHRhZy5cbiAgICAgIGlmICghc2Nhbm5lci5zY2FuKG9wZW5pbmdUYWdSZSkpXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBoYXNUYWcgPSB0cnVlO1xuXG4gICAgICAvLyBHZXQgdGhlIHRhZyB0eXBlLlxuICAgICAgdHlwZSA9IHNjYW5uZXIuc2Nhbih0YWdSZSkgfHwgJ25hbWUnO1xuICAgICAgc2Nhbm5lci5zY2FuKHdoaXRlUmUpO1xuXG4gICAgICAvLyBHZXQgdGhlIHRhZyB2YWx1ZS5cbiAgICAgIGlmICh0eXBlID09PSAnPScpIHtcbiAgICAgICAgdmFsdWUgPSBzY2FubmVyLnNjYW5VbnRpbChlcXVhbHNSZSk7XG4gICAgICAgIHNjYW5uZXIuc2NhbihlcXVhbHNSZSk7XG4gICAgICAgIHNjYW5uZXIuc2NhblVudGlsKGNsb3NpbmdUYWdSZSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0eXBlID09PSAneycpIHtcbiAgICAgICAgdmFsdWUgPSBzY2FubmVyLnNjYW5VbnRpbChjbG9zaW5nQ3VybHlSZSk7XG4gICAgICAgIHNjYW5uZXIuc2NhbihjdXJseVJlKTtcbiAgICAgICAgc2Nhbm5lci5zY2FuVW50aWwoY2xvc2luZ1RhZ1JlKTtcbiAgICAgICAgdHlwZSA9ICcmJztcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IHNjYW5uZXIuc2NhblVudGlsKGNsb3NpbmdUYWdSZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIE1hdGNoIHRoZSBjbG9zaW5nIHRhZy5cbiAgICAgIGlmICghc2Nhbm5lci5zY2FuKGNsb3NpbmdUYWdSZSkpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5jbG9zZWQgdGFnIGF0ICcgKyBzY2FubmVyLnBvcyk7XG5cbiAgICAgIHRva2VuID0gW3R5cGUsIHZhbHVlLCBzdGFydCwgc2Nhbm5lci5wb3NdO1xuICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuXG4gICAgICBpZiAodHlwZSA9PT0gJyMnIHx8IHR5cGUgPT09ICdeJykge1xuICAgICAgICBzZWN0aW9ucy5wdXNoKHRva2VuKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICcvJykge1xuICAgICAgICAvLyBDaGVjayBzZWN0aW9uIG5lc3RpbmcuXG4gICAgICAgIG9wZW5TZWN0aW9uID0gc2VjdGlvbnMucG9wKCk7XG5cbiAgICAgICAgaWYgKCFvcGVuU2VjdGlvbilcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vub3BlbmVkIHNlY3Rpb24gXCInICsgdmFsdWUgKyAnXCIgYXQgJyArIHN0YXJ0KTtcblxuICAgICAgICBpZiAob3BlblNlY3Rpb25bMV0gIT09IHZhbHVlKVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5jbG9zZWQgc2VjdGlvbiBcIicgKyBvcGVuU2VjdGlvblsxXSArICdcIiBhdCAnICsgc3RhcnQpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJ25hbWUnIHx8IHR5cGUgPT09ICd7JyB8fCB0eXBlID09PSAnJicpIHtcbiAgICAgICAgbm9uU3BhY2UgPSB0cnVlO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJz0nKSB7XG4gICAgICAgIC8vIFNldCB0aGUgdGFncyBmb3IgdGhlIG5leHQgdGltZSBhcm91bmQuXG4gICAgICAgIGNvbXBpbGVUYWdzKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhlcmUgYXJlIG5vIG9wZW4gc2VjdGlvbnMgd2hlbiB3ZSdyZSBkb25lLlxuICAgIG9wZW5TZWN0aW9uID0gc2VjdGlvbnMucG9wKCk7XG5cbiAgICBpZiAob3BlblNlY3Rpb24pXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuY2xvc2VkIHNlY3Rpb24gXCInICsgb3BlblNlY3Rpb25bMV0gKyAnXCIgYXQgJyArIHNjYW5uZXIucG9zKTtcblxuICAgIHJldHVybiBuZXN0VG9rZW5zKHNxdWFzaFRva2Vucyh0b2tlbnMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21iaW5lcyB0aGUgdmFsdWVzIG9mIGNvbnNlY3V0aXZlIHRleHQgdG9rZW5zIGluIHRoZSBnaXZlbiBgdG9rZW5zYCBhcnJheVxuICAgKiB0byBhIHNpbmdsZSB0b2tlbi5cbiAgICovXG4gIGZ1bmN0aW9uIHNxdWFzaFRva2Vucyh0b2tlbnMpIHtcbiAgICB2YXIgc3F1YXNoZWRUb2tlbnMgPSBbXTtcblxuICAgIHZhciB0b2tlbiwgbGFzdFRva2VuO1xuICAgIGZvciAodmFyIGkgPSAwLCBudW1Ub2tlbnMgPSB0b2tlbnMubGVuZ3RoOyBpIDwgbnVtVG9rZW5zOyArK2kpIHtcbiAgICAgIHRva2VuID0gdG9rZW5zW2ldO1xuXG4gICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgaWYgKHRva2VuWzBdID09PSAndGV4dCcgJiYgbGFzdFRva2VuICYmIGxhc3RUb2tlblswXSA9PT0gJ3RleHQnKSB7XG4gICAgICAgICAgbGFzdFRva2VuWzFdICs9IHRva2VuWzFdO1xuICAgICAgICAgIGxhc3RUb2tlblszXSA9IHRva2VuWzNdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHNxdWFzaGVkVG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICAgIGxhc3RUb2tlbiA9IHRva2VuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNxdWFzaGVkVG9rZW5zO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvcm1zIHRoZSBnaXZlbiBhcnJheSBvZiBgdG9rZW5zYCBpbnRvIGEgbmVzdGVkIHRyZWUgc3RydWN0dXJlIHdoZXJlXG4gICAqIHRva2VucyB0aGF0IHJlcHJlc2VudCBhIHNlY3Rpb24gaGF2ZSB0d28gYWRkaXRpb25hbCBpdGVtczogMSkgYW4gYXJyYXkgb2ZcbiAgICogYWxsIHRva2VucyB0aGF0IGFwcGVhciBpbiB0aGF0IHNlY3Rpb24gYW5kIDIpIHRoZSBpbmRleCBpbiB0aGUgb3JpZ2luYWxcbiAgICogdGVtcGxhdGUgdGhhdCByZXByZXNlbnRzIHRoZSBlbmQgb2YgdGhhdCBzZWN0aW9uLlxuICAgKi9cbiAgZnVuY3Rpb24gbmVzdFRva2Vucyh0b2tlbnMpIHtcbiAgICB2YXIgbmVzdGVkVG9rZW5zID0gW107XG4gICAgdmFyIGNvbGxlY3RvciA9IG5lc3RlZFRva2VucztcbiAgICB2YXIgc2VjdGlvbnMgPSBbXTtcblxuICAgIHZhciB0b2tlbiwgc2VjdGlvbjtcbiAgICBmb3IgKHZhciBpID0gMCwgbnVtVG9rZW5zID0gdG9rZW5zLmxlbmd0aDsgaSA8IG51bVRva2VuczsgKytpKSB7XG4gICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcblxuICAgICAgc3dpdGNoICh0b2tlblswXSkge1xuICAgICAgICBjYXNlICcjJzpcbiAgICAgICAgY2FzZSAnXic6XG4gICAgICAgICAgY29sbGVjdG9yLnB1c2godG9rZW4pO1xuICAgICAgICAgIHNlY3Rpb25zLnB1c2godG9rZW4pO1xuICAgICAgICAgIGNvbGxlY3RvciA9IHRva2VuWzRdID0gW107XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJy8nOlxuICAgICAgICAgIHNlY3Rpb24gPSBzZWN0aW9ucy5wb3AoKTtcbiAgICAgICAgICBzZWN0aW9uWzVdID0gdG9rZW5bMl07XG4gICAgICAgICAgY29sbGVjdG9yID0gc2VjdGlvbnMubGVuZ3RoID4gMCA/IHNlY3Rpb25zW3NlY3Rpb25zLmxlbmd0aCAtIDFdWzRdIDogbmVzdGVkVG9rZW5zO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGNvbGxlY3Rvci5wdXNoKHRva2VuKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmVzdGVkVG9rZW5zO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgc2ltcGxlIHN0cmluZyBzY2FubmVyIHRoYXQgaXMgdXNlZCBieSB0aGUgdGVtcGxhdGUgcGFyc2VyIHRvIGZpbmRcbiAgICogdG9rZW5zIGluIHRlbXBsYXRlIHN0cmluZ3MuXG4gICAqL1xuICBmdW5jdGlvbiBTY2FubmVyKHN0cmluZykge1xuICAgIHRoaXMuc3RyaW5nID0gc3RyaW5nO1xuICAgIHRoaXMudGFpbCA9IHN0cmluZztcbiAgICB0aGlzLnBvcyA9IDA7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHRhaWwgaXMgZW1wdHkgKGVuZCBvZiBzdHJpbmcpLlxuICAgKi9cbiAgU2Nhbm5lci5wcm90b3R5cGUuZW9zID0gZnVuY3Rpb24gZW9zKCkge1xuICAgIHJldHVybiB0aGlzLnRhaWwgPT09ICcnO1xuICB9O1xuXG4gIC8qKlxuICAgKiBUcmllcyB0byBtYXRjaCB0aGUgZ2l2ZW4gcmVndWxhciBleHByZXNzaW9uIGF0IHRoZSBjdXJyZW50IHBvc2l0aW9uLlxuICAgKiBSZXR1cm5zIHRoZSBtYXRjaGVkIHRleHQgaWYgaXQgY2FuIG1hdGNoLCB0aGUgZW1wdHkgc3RyaW5nIG90aGVyd2lzZS5cbiAgICovXG4gIFNjYW5uZXIucHJvdG90eXBlLnNjYW4gPSBmdW5jdGlvbiBzY2FuKHJlKSB7XG4gICAgdmFyIG1hdGNoID0gdGhpcy50YWlsLm1hdGNoKHJlKTtcblxuICAgIGlmICghbWF0Y2ggfHwgbWF0Y2guaW5kZXggIT09IDApXG4gICAgICByZXR1cm4gJyc7XG5cbiAgICB2YXIgc3RyaW5nID0gbWF0Y2hbMF07XG5cbiAgICB0aGlzLnRhaWwgPSB0aGlzLnRhaWwuc3Vic3RyaW5nKHN0cmluZy5sZW5ndGgpO1xuICAgIHRoaXMucG9zICs9IHN0cmluZy5sZW5ndGg7XG5cbiAgICByZXR1cm4gc3RyaW5nO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTa2lwcyBhbGwgdGV4dCB1bnRpbCB0aGUgZ2l2ZW4gcmVndWxhciBleHByZXNzaW9uIGNhbiBiZSBtYXRjaGVkLiBSZXR1cm5zXG4gICAqIHRoZSBza2lwcGVkIHN0cmluZywgd2hpY2ggaXMgdGhlIGVudGlyZSB0YWlsIGlmIG5vIG1hdGNoIGNhbiBiZSBtYWRlLlxuICAgKi9cbiAgU2Nhbm5lci5wcm90b3R5cGUuc2NhblVudGlsID0gZnVuY3Rpb24gc2NhblVudGlsKHJlKSB7XG4gICAgdmFyIGluZGV4ID0gdGhpcy50YWlsLnNlYXJjaChyZSksIG1hdGNoO1xuXG4gICAgc3dpdGNoIChpbmRleCkge1xuICAgICAgY2FzZSAtMTpcbiAgICAgICAgbWF0Y2ggPSB0aGlzLnRhaWw7XG4gICAgICAgIHRoaXMudGFpbCA9ICcnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgbWF0Y2ggPSAnJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBtYXRjaCA9IHRoaXMudGFpbC5zdWJzdHJpbmcoMCwgaW5kZXgpO1xuICAgICAgICB0aGlzLnRhaWwgPSB0aGlzLnRhaWwuc3Vic3RyaW5nKGluZGV4KTtcbiAgICB9XG5cbiAgICB0aGlzLnBvcyArPSBtYXRjaC5sZW5ndGg7XG5cbiAgICByZXR1cm4gbWF0Y2g7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudHMgYSByZW5kZXJpbmcgY29udGV4dCBieSB3cmFwcGluZyBhIHZpZXcgb2JqZWN0IGFuZFxuICAgKiBtYWludGFpbmluZyBhIHJlZmVyZW5jZSB0byB0aGUgcGFyZW50IGNvbnRleHQuXG4gICAqL1xuICBmdW5jdGlvbiBDb250ZXh0KHZpZXcsIHBhcmVudENvbnRleHQpIHtcbiAgICB0aGlzLnZpZXcgPSB2aWV3O1xuICAgIHRoaXMuY2FjaGUgPSB7XG4gICAgICAnLic6IHRoaXMudmlldyxcbiAgICAgICdAZWFjaCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJldHVybnMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgayBpbiB0aGlzKSB7XG4gICAgICAgICAgcmV0dXJucy5wdXNoKHsnQGtleSc6IGssICdAdmFsdWUnOiB0aGlzW2tdfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldHVybnM7XG4gICAgICB9XG4gICAgfTtcbiAgICB0aGlzLnBhcmVudCA9IHBhcmVudENvbnRleHQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBjb250ZXh0IHVzaW5nIHRoZSBnaXZlbiB2aWV3IHdpdGggdGhpcyBjb250ZXh0XG4gICAqIGFzIHRoZSBwYXJlbnQuXG4gICAqL1xuICBDb250ZXh0LnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gcHVzaCh2aWV3KSB7XG4gICAgcmV0dXJuIG5ldyBDb250ZXh0KHZpZXcsIHRoaXMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gbmFtZSBpbiB0aGlzIGNvbnRleHQsIHRyYXZlcnNpbmdcbiAgICogdXAgdGhlIGNvbnRleHQgaGllcmFyY2h5IGlmIHRoZSB2YWx1ZSBpcyBhYnNlbnQgaW4gdGhpcyBjb250ZXh0J3Mgdmlldy5cbiAgICovXG4gIENvbnRleHQucHJvdG90eXBlLmxvb2t1cCA9IGZ1bmN0aW9uIGxvb2t1cChuYW1lKSB7XG4gICAgdmFyIGNhY2hlID0gdGhpcy5jYWNoZTtcblxuICAgIHZhciB2YWx1ZTtcbiAgICBpZiAoY2FjaGUuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgIHZhbHVlID0gY2FjaGVbbmFtZV07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLCBuYW1lcywgaW5kZXgsIGxvb2t1cEhpdCA9IGZhbHNlO1xuXG4gICAgICB3aGlsZSAoY29udGV4dCkge1xuICAgICAgICBpZiAobmFtZS5pbmRleE9mKCcuJykgPiAwKSB7XG4gICAgICAgICAgdmFsdWUgPSBjb250ZXh0LnZpZXc7XG4gICAgICAgICAgbmFtZXMgPSBuYW1lLnNwbGl0KCcuJyk7XG4gICAgICAgICAgaW5kZXggPSAwO1xuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogVXNpbmcgdGhlIGRvdCBub3Rpb24gcGF0aCBpbiBgbmFtZWAsIHdlIGRlc2NlbmQgdGhyb3VnaCB0aGVcbiAgICAgICAgICAgKiBuZXN0ZWQgb2JqZWN0cy5cbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIFRvIGJlIGNlcnRhaW4gdGhhdCB0aGUgbG9va3VwIGhhcyBiZWVuIHN1Y2Nlc3NmdWwsIHdlIGhhdmUgdG9cbiAgICAgICAgICAgKiBjaGVjayBpZiB0aGUgbGFzdCBvYmplY3QgaW4gdGhlIHBhdGggYWN0dWFsbHkgaGFzIHRoZSBwcm9wZXJ0eVxuICAgICAgICAgICAqIHdlIGFyZSBsb29raW5nIGZvci4gV2Ugc3RvcmUgdGhlIHJlc3VsdCBpbiBgbG9va3VwSGl0YC5cbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIFRoaXMgaXMgc3BlY2lhbGx5IG5lY2Vzc2FyeSBmb3Igd2hlbiB0aGUgdmFsdWUgaGFzIGJlZW4gc2V0IHRvXG4gICAgICAgICAgICogYHVuZGVmaW5lZGAgYW5kIHdlIHdhbnQgdG8gYXZvaWQgbG9va2luZyB1cCBwYXJlbnQgY29udGV4dHMuXG4gICAgICAgICAgICoqL1xuICAgICAgICAgIHdoaWxlICh2YWx1ZSAhPSBudWxsICYmIGluZGV4IDwgbmFtZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IG5hbWVzLmxlbmd0aCAtIDEpXG4gICAgICAgICAgICAgIGxvb2t1cEhpdCA9IGhhc1Byb3BlcnR5KHZhbHVlLCBuYW1lc1tpbmRleF0pO1xuXG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlW25hbWVzW2luZGV4KytdXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdmFsdWUgPSBjb250ZXh0LnZpZXdbbmFtZV07XG4gICAgICAgICAgbG9va3VwSGl0ID0gaGFzUHJvcGVydHkoY29udGV4dC52aWV3LCBuYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsb29rdXBIaXQpXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY29udGV4dCA9IGNvbnRleHQucGFyZW50O1xuICAgICAgfVxuXG4gICAgICBjYWNoZVtuYW1lXSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSlcbiAgICAgIHZhbHVlID0gdmFsdWUuY2FsbCh0aGlzLnZpZXcpO1xuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBIFdyaXRlciBrbm93cyBob3cgdG8gdGFrZSBhIHN0cmVhbSBvZiB0b2tlbnMgYW5kIHJlbmRlciB0aGVtIHRvIGFcbiAgICogc3RyaW5nLCBnaXZlbiBhIGNvbnRleHQuIEl0IGFsc28gbWFpbnRhaW5zIGEgY2FjaGUgb2YgdGVtcGxhdGVzIHRvXG4gICAqIGF2b2lkIHRoZSBuZWVkIHRvIHBhcnNlIHRoZSBzYW1lIHRlbXBsYXRlIHR3aWNlLlxuICAgKi9cbiAgZnVuY3Rpb24gV3JpdGVyKCkge1xuICAgIHRoaXMuY2FjaGUgPSB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgYWxsIGNhY2hlZCB0ZW1wbGF0ZXMgaW4gdGhpcyB3cml0ZXIuXG4gICAqL1xuICBXcml0ZXIucHJvdG90eXBlLmNsZWFyQ2FjaGUgPSBmdW5jdGlvbiBjbGVhckNhY2hlKCkge1xuICAgIHRoaXMuY2FjaGUgPSB7fTtcbiAgfTtcblxuICAvKipcbiAgICogUGFyc2VzIGFuZCBjYWNoZXMgdGhlIGdpdmVuIGB0ZW1wbGF0ZWAgYW5kIHJldHVybnMgdGhlIGFycmF5IG9mIHRva2Vuc1xuICAgKiB0aGF0IGlzIGdlbmVyYXRlZCBmcm9tIHRoZSBwYXJzZS5cbiAgICovXG4gIFdyaXRlci5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbiBwYXJzZSh0ZW1wbGF0ZSwgdGFncykge1xuICAgIHZhciBjYWNoZSA9IHRoaXMuY2FjaGU7XG4gICAgdmFyIHRva2VucyA9IGNhY2hlW3RlbXBsYXRlXTtcblxuICAgIGlmICh0b2tlbnMgPT0gbnVsbClcbiAgICAgIHRva2VucyA9IGNhY2hlW3RlbXBsYXRlXSA9IHBhcnNlVGVtcGxhdGUodGVtcGxhdGUsIHRhZ3MpO1xuXG4gICAgcmV0dXJuIHRva2VucztcbiAgfTtcblxuICAvKipcbiAgICogSGlnaC1sZXZlbCBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIHJlbmRlciB0aGUgZ2l2ZW4gYHRlbXBsYXRlYCB3aXRoXG4gICAqIHRoZSBnaXZlbiBgdmlld2AuXG4gICAqXG4gICAqIFRoZSBvcHRpb25hbCBgcGFydGlhbHNgIGFyZ3VtZW50IG1heSBiZSBhbiBvYmplY3QgdGhhdCBjb250YWlucyB0aGVcbiAgICogbmFtZXMgYW5kIHRlbXBsYXRlcyBvZiBwYXJ0aWFscyB0aGF0IGFyZSB1c2VkIGluIHRoZSB0ZW1wbGF0ZS4gSXQgbWF5XG4gICAqIGFsc28gYmUgYSBmdW5jdGlvbiB0aGF0IGlzIHVzZWQgdG8gbG9hZCBwYXJ0aWFsIHRlbXBsYXRlcyBvbiB0aGUgZmx5XG4gICAqIHRoYXQgdGFrZXMgYSBzaW5nbGUgYXJndW1lbnQ6IHRoZSBuYW1lIG9mIHRoZSBwYXJ0aWFsLlxuICAgKi9cbiAgV3JpdGVyLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIodGVtcGxhdGUsIHZpZXcsIHBhcnRpYWxzKSB7XG4gICAgdmFyIHRva2VucyA9IHRoaXMucGFyc2UodGVtcGxhdGUpO1xuICAgIHZhciBjb250ZXh0ID0gKHZpZXcgaW5zdGFuY2VvZiBDb250ZXh0KSA/IHZpZXcgOiBuZXcgQ29udGV4dCh2aWV3KTtcbiAgICByZXR1cm4gdGhpcy5yZW5kZXJUb2tlbnModG9rZW5zLCBjb250ZXh0LCBwYXJ0aWFscywgdGVtcGxhdGUpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBMb3ctbGV2ZWwgbWV0aG9kIHRoYXQgcmVuZGVycyB0aGUgZ2l2ZW4gYXJyYXkgb2YgYHRva2Vuc2AgdXNpbmdcbiAgICogdGhlIGdpdmVuIGBjb250ZXh0YCBhbmQgYHBhcnRpYWxzYC5cbiAgICpcbiAgICogTm90ZTogVGhlIGBvcmlnaW5hbFRlbXBsYXRlYCBpcyBvbmx5IGV2ZXIgdXNlZCB0byBleHRyYWN0IHRoZSBwb3J0aW9uXG4gICAqIG9mIHRoZSBvcmlnaW5hbCB0ZW1wbGF0ZSB0aGF0IHdhcyBjb250YWluZWQgaW4gYSBoaWdoZXItb3JkZXIgc2VjdGlvbi5cbiAgICogSWYgdGhlIHRlbXBsYXRlIGRvZXNuJ3QgdXNlIGhpZ2hlci1vcmRlciBzZWN0aW9ucywgdGhpcyBhcmd1bWVudCBtYXlcbiAgICogYmUgb21pdHRlZC5cbiAgICovXG4gIFdyaXRlci5wcm90b3R5cGUucmVuZGVyVG9rZW5zID0gZnVuY3Rpb24gcmVuZGVyVG9rZW5zKHRva2VucywgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpIHtcbiAgICB2YXIgYnVmZmVyID0gJyc7XG4gICAgdmFyIHRva2VuLCBzeW1ib2wsIHZhbHVlO1xuICAgIGZvciAodmFyIGkgPSAwLCBudW1Ub2tlbnMgPSB0b2tlbnMubGVuZ3RoOyBpIDwgbnVtVG9rZW5zOyArK2kpIHtcbiAgICAgIHZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgICBzeW1ib2wgPSB0b2tlblswXTtcblxuICAgICAgaWYgKHN5bWJvbCA9PT0gJyMnKSB2YWx1ZSA9IHRoaXMucmVuZGVyU2VjdGlvbih0b2tlbiwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xuICAgICAgZWxzZSBpZiAoc3ltYm9sID09PSAnXicpIHZhbHVlID0gdGhpcy5yZW5kZXJJbnZlcnRlZCh0b2tlbiwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xuICAgICAgZWxzZSBpZiAoc3ltYm9sID09PSAnPicpIHZhbHVlID0gdGhpcy5yZW5kZXJQYXJ0aWFsKHRva2VuLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XG4gICAgICBlbHNlIGlmIChzeW1ib2wgPT09ICcmJykgdmFsdWUgPSB0aGlzLnVuZXNjYXBlZFZhbHVlKHRva2VuLCBjb250ZXh0KTtcbiAgICAgIGVsc2UgaWYgKHN5bWJvbCA9PT0gJ25hbWUnKSB2YWx1ZSA9IHRoaXMuZXNjYXBlZFZhbHVlKHRva2VuLCBjb250ZXh0KTtcbiAgICAgIGVsc2UgaWYgKHN5bWJvbCA9PT0gJ3RleHQnKSB2YWx1ZSA9IHRoaXMucmF3VmFsdWUodG9rZW4pO1xuXG4gICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgYnVmZmVyICs9IHZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiBidWZmZXI7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5yZW5kZXJTZWN0aW9uID0gZnVuY3Rpb24gcmVuZGVyU2VjdGlvbih0b2tlbiwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGJ1ZmZlciA9ICcnO1xuXG4gICAgdmFyIHZhbHVlID0gY29udGV4dC5sb29rdXAodG9rZW5bMV0pO1xuXG4gICAgLy8gVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIHJlbmRlciBhbiBhcmJpdHJhcnkgdGVtcGxhdGVcbiAgICAvLyBpbiB0aGUgY3VycmVudCBjb250ZXh0IGJ5IGhpZ2hlci1vcmRlciBzZWN0aW9ucy5cbiAgICBmdW5jdGlvbiBzdWJSZW5kZXIodGVtcGxhdGUpIHtcbiAgICAgIHJldHVybiBzZWxmLnJlbmRlcih0ZW1wbGF0ZSwgY29udGV4dCwgcGFydGlhbHMpO1xuICAgIH1cblxuICAgIGlmICghdmFsdWUpIHJldHVybjtcblxuICAgIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgZm9yICh2YXIgaiA9IDAsIHZhbHVlTGVuZ3RoID0gdmFsdWUubGVuZ3RoOyBqIDwgdmFsdWVMZW5ndGg7ICsraikge1xuICAgICAgICBpZiAodmFsdWVbal0pIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlW2pdID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdmFsdWVbal1bJ0BpJ10gPSBqO1xuICAgICAgICAgICAgdmFsdWVbal1bJ0BmaXJzdCddID0gKGogPT09IDApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJ1ZmZlciArPSB0aGlzLnJlbmRlclRva2Vucyh0b2tlbls0XSwgY29udGV4dC5wdXNoKHZhbHVlW2pdKSwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICBidWZmZXIgKz0gdGhpcy5yZW5kZXJUb2tlbnModG9rZW5bNF0sIGNvbnRleHQucHVzaCh2YWx1ZSksIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICAgIGlmICh0eXBlb2Ygb3JpZ2luYWxUZW1wbGF0ZSAhPT0gJ3N0cmluZycpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHVzZSBoaWdoZXItb3JkZXIgc2VjdGlvbnMgd2l0aG91dCB0aGUgb3JpZ2luYWwgdGVtcGxhdGUnKTtcblxuICAgICAgLy8gRXh0cmFjdCB0aGUgcG9ydGlvbiBvZiB0aGUgb3JpZ2luYWwgdGVtcGxhdGUgdGhhdCB0aGUgc2VjdGlvbiBjb250YWlucy5cbiAgICAgIHZhbHVlID0gdmFsdWUuY2FsbChjb250ZXh0LnZpZXcsIG9yaWdpbmFsVGVtcGxhdGUuc2xpY2UodG9rZW5bM10sIHRva2VuWzVdKSwgc3ViUmVuZGVyKTtcblxuICAgICAgaWYgKHZhbHVlICE9IG51bGwpXG4gICAgICAgIGJ1ZmZlciArPSB2YWx1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBidWZmZXIgKz0gdGhpcy5yZW5kZXJUb2tlbnModG9rZW5bNF0sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgICB9XG4gICAgcmV0dXJuIGJ1ZmZlcjtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLnJlbmRlckludmVydGVkID0gZnVuY3Rpb24gcmVuZGVySW52ZXJ0ZWQodG9rZW4sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKSB7XG4gICAgdmFyIHZhbHVlID0gY29udGV4dC5sb29rdXAodG9rZW5bMV0pO1xuXG4gICAgLy8gVXNlIEphdmFTY3JpcHQncyBkZWZpbml0aW9uIG9mIGZhbHN5LiBJbmNsdWRlIGVtcHR5IGFycmF5cy5cbiAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2phbmwvbXVzdGFjaGUuanMvaXNzdWVzLzE4NlxuICAgIGlmICghdmFsdWUgfHwgKGlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmxlbmd0aCA9PT0gMCkpXG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJUb2tlbnModG9rZW5bNF0sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLnJlbmRlclBhcnRpYWwgPSBmdW5jdGlvbiByZW5kZXJQYXJ0aWFsKHRva2VuLCBjb250ZXh0LCBwYXJ0aWFscykge1xuICAgIGlmICghcGFydGlhbHMpIHJldHVybjtcblxuICAgIHZhciB2YWx1ZSA9IGlzRnVuY3Rpb24ocGFydGlhbHMpID8gcGFydGlhbHModG9rZW5bMV0pIDogcGFydGlhbHNbdG9rZW5bMV1dO1xuICAgIGlmICh2YWx1ZSAhPSBudWxsKVxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyVG9rZW5zKHRoaXMucGFyc2UodmFsdWUpLCBjb250ZXh0LCBwYXJ0aWFscywgdmFsdWUpO1xuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUudW5lc2NhcGVkVmFsdWUgPSBmdW5jdGlvbiB1bmVzY2FwZWRWYWx1ZSh0b2tlbiwgY29udGV4dCkge1xuICAgIHZhciB2YWx1ZSA9IGNvbnRleHQubG9va3VwKHRva2VuWzFdKTtcbiAgICBpZiAodmFsdWUgIT0gbnVsbClcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLmVzY2FwZWRWYWx1ZSA9IGZ1bmN0aW9uIGVzY2FwZWRWYWx1ZSh0b2tlbiwgY29udGV4dCkge1xuICAgIHZhciB2YWx1ZSA9IGNvbnRleHQubG9va3VwKHRva2VuWzFdKTtcbiAgICBpZiAodmFsdWUgIT0gbnVsbClcbiAgICAgIHJldHVybiBtdXN0YWNoZS5lc2NhcGUodmFsdWUpO1xuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUucmF3VmFsdWUgPSBmdW5jdGlvbiByYXdWYWx1ZSh0b2tlbikge1xuICAgIHJldHVybiB0b2tlblsxXTtcbiAgfTtcblxuICBtdXN0YWNoZS5uYW1lID0gJ211c3RhY2hlLmpzJztcbiAgbXVzdGFjaGUudmVyc2lvbiA9ICcyLjEuMyc7XG4gIG11c3RhY2hlLnRhZ3MgPSBbJ3t7JywgJ319J107XG5cbiAgLy8gQWxsIGhpZ2gtbGV2ZWwgbXVzdGFjaGUuKiBmdW5jdGlvbnMgdXNlIHRoaXMgd3JpdGVyLlxuICB2YXIgZGVmYXVsdFdyaXRlciA9IG5ldyBXcml0ZXIoKTtcblxuICAvKipcbiAgICogQ2xlYXJzIGFsbCBjYWNoZWQgdGVtcGxhdGVzIGluIHRoZSBkZWZhdWx0IHdyaXRlci5cbiAgICovXG4gIG11c3RhY2hlLmNsZWFyQ2FjaGUgPSBmdW5jdGlvbiBjbGVhckNhY2hlKCkge1xuICAgIHJldHVybiBkZWZhdWx0V3JpdGVyLmNsZWFyQ2FjaGUoKTtcbiAgfTtcblxuICAvKipcbiAgICogUGFyc2VzIGFuZCBjYWNoZXMgdGhlIGdpdmVuIHRlbXBsYXRlIGluIHRoZSBkZWZhdWx0IHdyaXRlciBhbmQgcmV0dXJucyB0aGVcbiAgICogYXJyYXkgb2YgdG9rZW5zIGl0IGNvbnRhaW5zLiBEb2luZyB0aGlzIGFoZWFkIG9mIHRpbWUgYXZvaWRzIHRoZSBuZWVkIHRvXG4gICAqIHBhcnNlIHRlbXBsYXRlcyBvbiB0aGUgZmx5IGFzIHRoZXkgYXJlIHJlbmRlcmVkLlxuICAgKi9cbiAgbXVzdGFjaGUucGFyc2UgPSBmdW5jdGlvbiBwYXJzZSh0ZW1wbGF0ZSwgdGFncykge1xuICAgIHJldHVybiBkZWZhdWx0V3JpdGVyLnBhcnNlKHRlbXBsYXRlLCB0YWdzKTtcbiAgfTtcblxuICAvKipcbiAgICogUmVuZGVycyB0aGUgYHRlbXBsYXRlYCB3aXRoIHRoZSBnaXZlbiBgdmlld2AgYW5kIGBwYXJ0aWFsc2AgdXNpbmcgdGhlXG4gICAqIGRlZmF1bHQgd3JpdGVyLlxuICAgKi9cbiAgbXVzdGFjaGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscykge1xuICAgIGlmICh0eXBlb2YgdGVtcGxhdGUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIHRlbXBsYXRlISBUZW1wbGF0ZSBzaG91bGQgYmUgYSBcInN0cmluZ1wiICcgKyAnYnV0IFwiJyArIHR5cGVTdHIodGVtcGxhdGUpICsgJ1wiIHdhcyBnaXZlbiBhcyB0aGUgZmlyc3QgJyArICdhcmd1bWVudCBmb3IgbXVzdGFjaGUjcmVuZGVyKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscyknKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVmYXVsdFdyaXRlci5yZW5kZXIodGVtcGxhdGUsIHZpZXcsIHBhcnRpYWxzKTtcbiAgfTtcblxuICAvLyBUaGlzIGlzIGhlcmUgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5IHdpdGggMC40LnguLFxuICAvKmVzbGludC1kaXNhYmxlICovIC8vIGVzbGludCB3YW50cyBjYW1lbCBjYXNlZCBmdW5jdGlvbiBuYW1lXG4gIG11c3RhY2hlLnRvX2h0bWwgPSBmdW5jdGlvbiB0b19odG1sKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscywgc2VuZCkge1xuICAgIC8qZXNsaW50LWVuYWJsZSovXG5cbiAgICB2YXIgcmVzdWx0ID0gbXVzdGFjaGUucmVuZGVyKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscyk7XG5cbiAgICBpZiAoaXNGdW5jdGlvbihzZW5kKSkge1xuICAgICAgc2VuZChyZXN1bHQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9O1xuXG4gIC8vIEV4cG9ydCB0aGUgZXNjYXBpbmcgZnVuY3Rpb24gc28gdGhhdCB0aGUgdXNlciBtYXkgb3ZlcnJpZGUgaXQuXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vamFubC9tdXN0YWNoZS5qcy9pc3N1ZXMvMjQ0XG4gIG11c3RhY2hlLmVzY2FwZSA9IGVzY2FwZUh0bWw7XG5cbiAgLy8gRXhwb3J0IHRoZXNlIG1haW5seSBmb3IgdGVzdGluZywgYnV0IGFsc28gZm9yIGFkdmFuY2VkIHVzYWdlLlxuICBtdXN0YWNoZS5TY2FubmVyID0gU2Nhbm5lcjtcbiAgbXVzdGFjaGUuQ29udGV4dCA9IENvbnRleHQ7XG4gIG11c3RhY2hlLldyaXRlciA9IFdyaXRlcjtcblxufSkpO1xuXG5leHBvcnQgZGVmYXVsdCBBWDYubXVzdGFjaGU7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL3NyYy9BWDZNdXN0YWNoZS5qcyIsImltcG9ydCBqUXVlcnkgZnJvbSBcImpxbWluXCI7XG5pbXBvcnQgQVg2VUlDb3JlIGZyb20gXCIuL0FYNlVJQ29yZS5qc1wiO1xuaW1wb3J0IGluZm8gZnJvbSBcIi4vQVg2SW5mb1wiO1xuaW1wb3J0IFUgZnJvbSBcIi4vQVg2VXRpbFwiO1xuaW1wb3J0IG11c3RhY2hlIGZyb20gXCIuL0FYNk11c3RhY2hlXCI7XG5cbi8qIH5+fn5+fn5+fn5+fn5+fn5+fiBlbmQgb2YgaW1wb3J0ICB+fn5+fn5+fn5+fn5+fn5+fn5+fiAqL1xuXG5sZXQgY3RybEtleXMgPSB7XG4gIFwiMThcIjogXCJLRVlfQUxUXCIsXG4gIC8vXCI4XCI6IFwiS0VZX0JBQ0tTUEFDRVwiLFxuICBcIjE3XCI6IFwiS0VZX0NPTlRST0xcIixcbiAgXCI0NlwiOiBcIktFWV9ERUxFVEVcIixcbiAgXCI0MFwiOiBcIktFWV9ET1dOXCIsXG4gIFwiMzVcIjogXCJLRVlfRU5EXCIsXG4gIFwiMTg3XCI6IFwiS0VZX0VRVUFMXCIsXG4gIC8vXCIyN1wiOiBcIktFWV9FU0NcIixcbiAgXCIzNlwiOiBcIktFWV9IT01FXCIsXG4gIFwiNDVcIjogXCJLRVlfSU5TRVJUXCIsXG4gIFwiMzdcIjogXCJLRVlfTEVGVFwiLFxuICBcIjE4OVwiOiBcIktFWV9NSU5VU1wiLFxuICBcIjM0XCI6IFwiS0VZX1BBR0VET1dOXCIsXG4gIFwiMzNcIjogXCJLRVlfUEFHRVVQXCIsXG4gIC8vIFwiMTkwXCI6IFwiS0VZX1BFUklPRFwiLFxuICAvL1wiMTNcIjogXCJLRVlfUkVUVVJOXCIsXG4gIFwiMzlcIjogXCJLRVlfUklHSFRcIixcbiAgXCIxNlwiOiBcIktFWV9TSElGVFwiLFxuICAvLyBcIjMyXCI6IFwiS0VZX1NQQUNFXCIsXG4gIFwiOVwiOiBcIktFWV9UQUJcIixcbiAgXCIzOFwiOiBcIktFWV9VUFwiLFxuICBcIjkxXCI6IFwiS0VZX1dJTkRPV1wiXG4gIC8vXCIxMDdcIiA6IFwiTlVNUEFEX0FERFwiLFxuICAvL1wiMTk0XCIgOiBcIk5VTVBBRF9DT01NQVwiLFxuICAvL1wiMTEwXCIgOiBcIk5VTVBBRF9ERUNJTUFMXCIsXG4gIC8vXCIxMTFcIiA6IFwiTlVNUEFEX0RJVklERVwiLFxuICAvL1wiMTJcIiA6IFwiTlVNUEFEX0VRVUFMXCIsXG4gIC8vXCIxMDZcIiA6IFwiTlVNUEFEX01VTFRJUExZXCIsXG4gIC8vXCIxMDlcIiA6IFwiTlVNUEFEX1NVQlRSQUNUXCJcbn07XG5sZXQgdG1wbCA9IHtcbiAgXCJvcHRpb25Hcm91cFwiKGNvbHVtbktleXMpIHtcbiAgICByZXR1cm4gYFxuPGRpdiBjbGFzcz1cImF4NnVpLWF1dG9jb21wbGV0ZS1vcHRpb24tZ3JvdXAge3t0aGVtZX19IHt7c2l6ZX19XCIgZGF0YS1heDZ1aS1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwPVwie3tpZH19XCI+XG4gICAgPGRpdiBjbGFzcz1cImF4LWF1dG9jb21wbGV0ZS1ib2R5XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJheC1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwLWNvbnRlbnRcIiBkYXRhLWVscz1cImNvbnRlbnRcIj48L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiYXgtYXV0b2NvbXBsZXRlLWFycm93XCI+PC9kaXY+IFxuPC9kaXY+XG5gO1xuICB9LFxuICBcImF1dG9jb21wbGV0ZURpc3BsYXlcIihjb2x1bW5LZXlzKSB7XG4gICAgcmV0dXJuIGAgXG48aW5wdXQgdGFiaW5kZXg9XCItMVwiIHR5cGU9XCJ0ZXh0XCIgZGF0YS1pbnB1dC1kdW1teT1cIlwiIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIiAvPlxuPGRpdiBjbGFzcz1cImF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5IHt7dGhlbWV9fVwiIGRhdGEtYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXk9XCJ7e2lkfX1cIiBkYXRhLWF4NnVpLWF1dG9jb21wbGV0ZS1pbnN0YW5jZT1cInt7aW5zdGFuY2VJZH19XCIgc3R5bGU9XCJoZWlnaHQ6IHt7aGVpZ2h0fX1weDtcIj5cbiAgICA8ZGl2IGNsYXNzPVwiYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXktdGFibGVcIiBkYXRhLWVscz1cImRpc3BsYXktdGFibGVcIj5cbiAgICAgICAgPGRpdiBkYXRhLWF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5PVwibGFiZWwtaG9sZGVyXCI+IFxuICAgICAgICAgIDxhIHt7XnRhYkluZGV4fX17ey90YWJJbmRleH19e3sjdGFiSW5kZXh9fXRhYmluZGV4PVwie3t0YWJJbmRleH19XCIge3svdGFiSW5kZXh9fSBkYXRhLWF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5PVwibGFiZWxcIiBzcGVsbGNoZWNrPVwiZmFsc2VcIiBzdHlsZT1cInBhZGRpbmc6IDAge3twYWRkaW5nTGVmdH19cHg7XCI+XG4gICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGRhdGEtYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXk9XCJpbnB1dFwiIHN0eWxlPVwiYm9yZGVyOjAgbm9uZTtoZWlnaHQ6IHt7b3B0aW9uSXRlbUhlaWdodH19cHg7bGluZS1oZWlnaHQ6IHt7b3B0aW9uSXRlbUhlaWdodH19cHg7XCIgLz5cbiAgICAgICAgICA8L2E+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGRhdGEtYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXk9XCJhZGRvblwiPiBcbiAgICAgICAgICAgIHt7I211bHRpcGxlfX17eyNyZXNldH19XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFkZG9uLWljb24tcmVzZXRcIiBkYXRhLXNlbGVjdGVkLWNsZWFyPVwidHJ1ZVwiPnt7ey59fX08L3NwYW4+XG4gICAgICAgICAgICB7ey9yZXNldH19e3svbXVsdGlwbGV9fVxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuYDtcbiAgfSxcbiAgXCJmb3JtU2VsZWN0XCIoY29sdW1uS2V5cykge1xuICAgIHJldHVybiBgXG48c2VsZWN0IHRhYmluZGV4PVwiLTFcIiBjbGFzcz1cImZvcm0tY29udHJvbCB7e2Zvcm1TaXplfX1cIiBuYW1lPVwie3tuYW1lfX1cIiBtdWx0aXBsZT1cIm11bHRpcGxlXCI+PC9zZWxlY3Q+XG5gO1xuICB9LFxuICBcImZvcm1TZWxlY3RPcHRpb25zXCIoY29sdW1uS2V5cykge1xuICAgIHJldHVybiBgXG57eyNzZWxlY3RlZH19XG48b3B0aW9uIHZhbHVlPVwie3ske2NvbHVtbktleXMub3B0aW9uVmFsdWV9fX1cIiBzZWxlY3RlZD1cInRydWVcIj57eyR7Y29sdW1uS2V5cy5vcHRpb25UZXh0fX19PC9vcHRpb24+XG57ey9zZWxlY3RlZH19XG5gO1xuICB9LFxuICBcIm9wdGlvbnNcIihjb2x1bW5LZXlzKSB7XG4gICAgcmV0dXJuIGBcbnt7I3dhaXRPcHRpb25zfX1cbiAgICA8ZGl2IGNsYXNzPVwiYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1pdGVtXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1pdGVtLWhvbGRlclwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1pdGVtLWNlbGwgYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1pdGVtLWxhYmVsXCI+XG4gICAgICAgICAgICAgICAgICAgIHt7e2xhbmcubG9hZGluZ319fVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbnt7L3dhaXRPcHRpb25zfX1cbnt7XndhaXRPcHRpb25zfX1cbiAgICB7eyNvcHRpb25zfX1cbiAgICAgICAge3teaGlkZX19XG4gICAgICAgIDxkaXYgY2xhc3M9XCJheC1hdXRvY29tcGxldGUtb3B0aW9uLWl0ZW1cIiBkYXRhLW9wdGlvbi1mb2N1cy1pbmRleD1cInt7QGZpbmRleH19XCIgZGF0YS1vcHRpb24taW5kZXg9XCJ7e0BpbmRleH19XCIgZGF0YS1vcHRpb24tdmFsdWU9XCJ7eyR7Y29sdW1uS2V5cy5vcHRpb25WYWx1ZX19fVwiIHt7IyR7Y29sdW1uS2V5cy5vcHRpb25TZWxlY3RlZH19fWRhdGEtb3B0aW9uLXNlbGVjdGVkPVwidHJ1ZVwie3svJHtjb2x1bW5LZXlzLm9wdGlvblNlbGVjdGVkfX19PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImF4LWF1dG9jb21wbGV0ZS1vcHRpb24taXRlbS1ob2xkZXJcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImF4LWF1dG9jb21wbGV0ZS1vcHRpb24taXRlbS1jZWxsIGF4LWF1dG9jb21wbGV0ZS1vcHRpb24taXRlbS1sYWJlbFwiPnt7JHtjb2x1bW5LZXlzLm9wdGlvblRleHR9fX08L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHt7L2hpZGV9fVxuICAgIHt7L29wdGlvbnN9fVxuICAgIHt7Xm9wdGlvbnN9fVxuICAgICAgICA8ZGl2IGNsYXNzPVwiYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1pdGVtXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1pdGVtLWhvbGRlclwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1pdGVtLWNlbGwgYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1pdGVtLWxhYmVsXCI+XG4gICAgICAgICAgICAgICAgICAgIHt7e2xhbmcubm9PcHRpb25zfX19XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIHt7L29wdGlvbnN9fVxue3svd2FpdE9wdGlvbnN9fVxuYDtcbiAgfSxcbiAgXCJsYWJlbFwiKGNvbHVtbktleXMpIHtcbiAgICByZXR1cm4gYHt7I3NlbGVjdGVkfX1cbjxkaXYgdGFiaW5kZXg9XCItMVwiIGRhdGEtYXg2dWktYXV0b2NvbXBsZXRlLXNlbGVjdGVkLWxhYmVsPVwie3tAaX19XCIgZGF0YS1heDZ1aS1hdXRvY29tcGxldGUtc2VsZWN0ZWQtdGV4dD1cInt7dGV4dH19XCIgc3R5bGU9XCJoZWlnaHQ6IHt7b3B0aW9uSXRlbUhlaWdodH19cHg7XCI+ICBcbiAgPGRpdiBjbGFzcz1cImxhYmVsLWNlbGxcIj57eyR7Y29sdW1uS2V5cy5vcHRpb25UZXh0fX19PC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJsYWJlbC1jZWxsXCIgZGF0YS1heDZ1aS1hdXRvY29tcGxldGUtcmVtb3ZlPVwidHJ1ZVwiIGRhdGEtYXg2dWktYXV0b2NvbXBsZXRlLXJlbW92ZS1pbmRleD1cInt7QGl9fVwiPnt7e3JlbW92ZUljb259fX08L2Rpdj5cbjwvZGl2Pnt7L3NlbGVjdGVkfX1gO1xuICB9LFxufTtcblxuY29uc3Qgb25TdGF0ZUNoYW5nZWQgPSBmdW5jdGlvbiAoaXRlbSwgdGhhdCkge1xuICBpZiAoaXRlbSAmJiBpdGVtLm9uU3RhdGVDaGFuZ2VkKSB7XG4gICAgaXRlbS5vblN0YXRlQ2hhbmdlZC5jYWxsKHRoYXQsIHRoYXQpO1xuICB9XG4gIGVsc2UgaWYgKHRoaXMub25TdGF0ZUNoYW5nZWQpIHtcbiAgICB0aGlzLm9uU3RhdGVDaGFuZ2VkLmNhbGwodGhhdCwgdGhhdCk7XG4gIH1cblxuICBpZiAodGhhdC5zdGF0ZSA9PSBcImNoYW5nZVZhbHVlXCIpIHtcbiAgICBpZiAoaXRlbSAmJiBpdGVtLm9uQ2hhbmdlKSB7XG4gICAgICBpdGVtLm9uQ2hhbmdlLmNhbGwodGhhdCwgdGhhdCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMub25DaGFuZ2UpIHtcbiAgICAgIHRoaXMub25DaGFuZ2UuY2FsbCh0aGF0LCB0aGF0KTtcbiAgICB9XG4gIH1cblxuICBpdGVtID0gbnVsbDtcbiAgdGhhdCA9IG51bGw7XG4gIHJldHVybiB0cnVlO1xufTtcbmNvbnN0IGFsaWduQXV0b2NvbXBsZXRlRGlzcGxheSA9IGZ1bmN0aW9uICgpIHtcbiAgbGV0IGkgPSB0aGlzLnF1ZXVlLmxlbmd0aCwgdztcblxuICB3aGlsZSAoaS0tKSB7XG4gICAgbGV0IGl0ZW0gPSB0aGlzLnF1ZXVlW2ldO1xuICAgIGlmIChpdGVtLiRkaXNwbGF5KSB7XG4gICAgICB3ID0gTWF0aC5tYXgoaXRlbS4kc2VsZWN0Lm91dGVyV2lkdGgoKSwgVS5udW1iZXIoaXRlbS5taW5XaWR0aCkpO1xuICAgICAgaXRlbS4kZGlzcGxheS5jc3Moe1xuICAgICAgICBcIm1pbi13aWR0aFwiOiB3XG4gICAgICB9KTtcbiAgICAgIGlmIChpdGVtLnJlc2V0KSB7XG4gICAgICAgIGl0ZW0uJGRpc3BsYXkuZmluZChcIi5hZGRvbi1pY29uLXJlc2V0XCIpLmNzcyh7XG4gICAgICAgICAgXCJsaW5lLWhlaWdodFwiOiB0aGlzLnF1ZXVlW2ldLiRkaXNwbGF5LmhlaWdodCgpICsgXCJweFwiXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyDrhpLsnbTsobDsoIgg7LKY66asXG4gICAgICBpZiAoaXRlbS5tdWx0aXBsZSkge1xuICAgICAgICB2YXIgZGlzcGxheVRhYmxlSGVpZ2h0QWRqdXN0ID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gVS5udW1iZXIoaXRlbS4kZGlzcGxheS5jc3MoXCJib3JkZXItdG9wLXdpZHRoXCIpKSArIFUubnVtYmVyKGl0ZW0uJGRpc3BsYXkuY3NzKFwiYm9yZGVyLWJvdHRvbS13aWR0aFwiKSk7XG4gICAgICAgIH0pLmNhbGwodGhpcyk7XG4gICAgICAgIGl0ZW0uJHRhcmdldC5oZWlnaHQoJycpO1xuICAgICAgICBpdGVtLiRkaXNwbGF5LmhlaWdodCgnJyk7XG5cbiAgICAgICAgdmFyIGRpc3BsYXlUYWJsZUhlaWdodCA9IGl0ZW0uJGRpc3BsYXlUYWJsZS5vdXRlckhlaWdodCgpO1xuICAgICAgICBpZiAoTWF0aC5hYnMoZGlzcGxheVRhYmxlSGVpZ2h0IC0gaXRlbS4kdGFyZ2V0LmhlaWdodCgpKSA+IGRpc3BsYXlUYWJsZUhlaWdodEFkanVzdCkge1xuICAgICAgICAgIGl0ZW0uJHRhcmdldC5jc3Moe2hlaWdodDogZGlzcGxheVRhYmxlSGVpZ2h0ICsgZGlzcGxheVRhYmxlSGVpZ2h0QWRqdXN0ICsgNH0pO1xuICAgICAgICAgIGl0ZW0uJGRpc3BsYXkuY3NzKHtoZWlnaHQ6IGRpc3BsYXlUYWJsZUhlaWdodCArIGRpc3BsYXlUYWJsZUhlaWdodEFkanVzdCArIDR9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGkgPSBudWxsO1xuICB3ID0gbnVsbDtcbiAgcmV0dXJuIHRoaXM7XG59O1xuY29uc3QgYWxpZ25BdXRvY29tcGxldGVPcHRpb25Hcm91cCA9IGZ1bmN0aW9uIChhcHBlbmQpIHtcbiAgaWYgKGFwcGVuZCAmJiAhdGhpcy5hY3RpdmVhdXRvY29tcGxldGVPcHRpb25Hcm91cCkgcmV0dXJuIHRoaXM7XG5cbiAgbGV0IGl0ZW0gPSB0aGlzLnF1ZXVlW3RoaXMuYWN0aXZlYXV0b2NvbXBsZXRlUXVldWVJbmRleF0sXG4gICAgcG9zID0ge30sIHBvc2l0aW9uTWFyZ2luID0gMCxcbiAgICBkaW0gPSB7fSwgcGlja2VyRGltID0ge30sXG4gICAgcGlja2VyRGlyZWN0aW9uO1xuXG4gIGlmICghaXRlbSkgcmV0dXJuIHRoaXM7XG4gIGlmIChhcHBlbmQpIGpRdWVyeShkb2N1bWVudC5ib2R5KS5hcHBlbmQodGhpcy5hY3RpdmVhdXRvY29tcGxldGVPcHRpb25Hcm91cCk7XG5cbiAgcG9zID0gaXRlbS4kdGFyZ2V0Lm9mZnNldCgpO1xuICBkaW0gPSB7XG4gICAgd2lkdGg6IGl0ZW0uJHRhcmdldC5vdXRlcldpZHRoKCksXG4gICAgaGVpZ2h0OiBpdGVtLiR0YXJnZXQub3V0ZXJIZWlnaHQoKVxuICB9O1xuICBwaWNrZXJEaW0gPSB7XG4gICAgd2luV2lkdGg6IE1hdGgubWF4KCQod2luZG93KS53aWR0aCgpLCBqUXVlcnkoZG9jdW1lbnQuYm9keSkud2lkdGgoKSksXG4gICAgd2luSGVpZ2h0OiBNYXRoLm1heCgkKHdpbmRvdykuaGVpZ2h0KCksIGpRdWVyeShkb2N1bWVudC5ib2R5KS5oZWlnaHQoKSksXG4gICAgd2lkdGg6IHRoaXMuYWN0aXZlYXV0b2NvbXBsZXRlT3B0aW9uR3JvdXAub3V0ZXJXaWR0aCgpLFxuICAgIGhlaWdodDogdGhpcy5hY3RpdmVhdXRvY29tcGxldGVPcHRpb25Hcm91cC5vdXRlckhlaWdodCgpXG4gIH07XG5cbiAgLy8gcGlja2VyIGNzcyh3aWR0aCwgbGVmdCwgdG9wKSAmIGRpcmVjdGlvbiDqsrDsoJVcbiAgaWYgKCFpdGVtLmRpcmVjdGlvbiB8fCBpdGVtLmRpcmVjdGlvbiA9PT0gXCJcIiB8fCBpdGVtLmRpcmVjdGlvbiA9PT0gXCJhdXRvXCIpIHtcbiAgICAvLyBzZXQgZGlyZWN0aW9uXG4gICAgcGlja2VyRGlyZWN0aW9uID0gXCJ0b3BcIjtcblxuICAgIGlmIChwb3MudG9wIC0gcGlja2VyRGltLmhlaWdodCAtIHBvc2l0aW9uTWFyZ2luIDwgMCkge1xuICAgICAgcGlja2VyRGlyZWN0aW9uID0gXCJ0b3BcIjtcbiAgICB9IGVsc2UgaWYgKHBvcy50b3AgKyBkaW0uaGVpZ2h0ICsgcGlja2VyRGltLmhlaWdodCArIHBvc2l0aW9uTWFyZ2luID4gcGlja2VyRGltLndpbkhlaWdodCkge1xuICAgICAgcGlja2VyRGlyZWN0aW9uID0gXCJib3R0b21cIjtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcGlja2VyRGlyZWN0aW9uID0gaXRlbS5kaXJlY3Rpb247XG4gIH1cblxuICBpZiAoYXBwZW5kKSB7XG4gICAgdGhpcy5hY3RpdmVhdXRvY29tcGxldGVPcHRpb25Hcm91cFxuICAgICAgLmFkZENsYXNzKFwiZGlyZWN0aW9uLVwiICsgcGlja2VyRGlyZWN0aW9uKTtcbiAgfVxuICB0aGlzLmFjdGl2ZWF1dG9jb21wbGV0ZU9wdGlvbkdyb3VwXG4gICAgLmNzcygoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHBpY2tlckRpcmVjdGlvbiA9PSBcInRvcFwiKSB7XG4gICAgICAgIGlmIChwb3MudG9wICsgZGltLmhlaWdodCArIHBpY2tlckRpbS5oZWlnaHQgKyBwb3NpdGlvbk1hcmdpbiA+IHBpY2tlckRpbS53aW5IZWlnaHQpIHtcblxuICAgICAgICAgIHZhciBuZXdUb3AgPSBwb3MudG9wICsgcGlja2VyRGltLmhlaWdodDtcbiAgICAgICAgICBpZiAobmV3VG9wICsgcGlja2VyRGltLmhlaWdodCArIHBvc2l0aW9uTWFyZ2luID4gcGlja2VyRGltLndpbkhlaWdodCkge1xuICAgICAgICAgICAgbmV3VG9wID0gMDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG5ld1RvcCA8IDApIHtcbiAgICAgICAgICAgIG5ld1RvcCA9IDA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxlZnQ6IHBvcy5sZWZ0LFxuICAgICAgICAgICAgdG9wOiBuZXdUb3AsXG4gICAgICAgICAgICB3aWR0aDogZGltLndpZHRoXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbGVmdDogcG9zLmxlZnQsXG4gICAgICAgICAgdG9wOiBwb3MudG9wICsgZGltLmhlaWdodCArIDEsXG4gICAgICAgICAgd2lkdGg6IGRpbS53aWR0aFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChwaWNrZXJEaXJlY3Rpb24gPT0gXCJib3R0b21cIikge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGxlZnQ6IHBvcy5sZWZ0LFxuICAgICAgICAgIHRvcDogcG9zLnRvcCAtIHBpY2tlckRpbS5oZWlnaHQgLSAxLFxuICAgICAgICAgIHdpZHRoOiBkaW0ud2lkdGhcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pLmNhbGwodGhpcykpO1xufTtcbmNvbnN0IG9uQm9keUNsaWNrID0gZnVuY3Rpb24gKGUsIHRhcmdldCkge1xuICBpZiAoIXRoaXMuYWN0aXZlYXV0b2NvbXBsZXRlT3B0aW9uR3JvdXApIHJldHVybiB0aGlzO1xuXG4gIGxldCBpdGVtID0gdGhpcy5xdWV1ZVt0aGlzLmFjdGl2ZWF1dG9jb21wbGV0ZVF1ZXVlSW5kZXhdLCBjbGlja0VsID0gXCJkaXNwbGF5XCI7XG5cbiAgdGFyZ2V0ID0gVS5maW5kUGFyZW50Tm9kZShlLnRhcmdldCwgZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGlmICh0YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1vcHRpb24tdmFsdWVcIikpIHtcbiAgICAgIGNsaWNrRWwgPSBcIm9wdGlvbkl0ZW1cIjtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBlbHNlIGlmIChpdGVtLiR0YXJnZXQuZ2V0KDApID09IHRhcmdldCkge1xuICAgICAgY2xpY2tFbCA9IFwiZGlzcGxheVwiO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBlbHNlIGlmIChjbGlja0VsID09PSBcIm9wdGlvbkl0ZW1cIikge1xuICAgIHNldFNlbGVjdGVkLmNhbGwodGhpcywgaXRlbS5pZCwge1xuICAgICAgb3B0aW9uSW5kZXg6IHtcbiAgICAgICAgaW5kZXg6IHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLW9wdGlvbi1pbmRleFwiKVxuICAgICAgfVxuICAgIH0sIHVuZGVmaW5lZCwgXCJvcHRpb25JdGVtQ2xpY2tcIik7XG4gICAgYWxpZ25BdXRvY29tcGxldGVEaXNwbGF5LmNhbGwodGhpcyk7XG4gICAgYWxpZ25BdXRvY29tcGxldGVPcHRpb25Hcm91cC5jYWxsKHRoaXMpO1xuICAgIGlmICghaXRlbS5tdWx0aXBsZSkge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH1cbiAgfVxuICBlbHNlIHtcblxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuY29uc3QgZ2V0TGFiZWwgPSBmdW5jdGlvbiAocXVlSWR4KSB7XG4gIGxldCBpdGVtID0gdGhpcy5xdWV1ZVtxdWVJZHhdO1xuXG4gIC8vIO2FnO2UjOumv+yXkCDsoITri6wg7ZW07JW87ZWgIOuNsOydtO2EsCDshKDslrhcbiAgbGV0IGRhdGEgPSB7fTtcbiAgZGF0YS5pZCA9IGl0ZW0uaWQ7XG4gIGRhdGEudGhlbWUgPSBpdGVtLnRoZW1lO1xuICBkYXRhLm11bHRpcGxlID0gaXRlbS5tdWx0aXBsZTtcbiAgZGF0YS5sYW5nID0gaXRlbS5sYW5nO1xuICBkYXRhLm9wdGlvbnMgPSBpdGVtLm9wdGlvbnM7XG4gIGRhdGEuc2VsZWN0ZWQgPSBpdGVtLnNlbGVjdGVkO1xuICBkYXRhLmhhc1NlbGVjdGVkID0gKGRhdGEuc2VsZWN0ZWQgJiYgZGF0YS5zZWxlY3RlZC5sZW5ndGggPiAwKTtcbiAgZGF0YS5yZW1vdmVJY29uID0gaXRlbS5yZW1vdmVJY29uO1xuICBkYXRhLmhlaWdodCA9IGl0ZW0uaGVpZ2h0O1xuICBkYXRhLm9wdGlvbkl0ZW1IZWlnaHQgPSBpdGVtLm9wdGlvbkl0ZW1IZWlnaHQ7XG5cbiAgcmV0dXJuIG11c3RhY2hlLnJlbmRlcih0bXBsLmxhYmVsLmNhbGwodGhpcywgaXRlbS5jb2x1bW5LZXlzKSwgZGF0YSk7XG59O1xuY29uc3Qgc3luY0xhYmVsID0gZnVuY3Rpb24gKHF1ZUlkeCkge1xuICBsZXQgaXRlbSA9IHRoaXMucXVldWVbcXVlSWR4XTtcblxuICBpZiAoIWl0ZW0ubXVsdGlwbGUgJiYgaXRlbS5zZWxlY3RlZCAmJiBpdGVtLnNlbGVjdGVkLmxlbmd0aCA+IDApIHtcbiAgICBpdGVtLnNlbGVjdGVkID0gW10uY29uY2F0KGl0ZW0uc2VsZWN0ZWRbaXRlbS5zZWxlY3RlZC5sZW5ndGggLSAxXSk7XG4gIH1cblxuICBpdGVtLnNlbGVjdGVkLmZvckVhY2goZnVuY3Rpb24gKG4sIG5pbmRleCkge1xuICAgIG5bXCJAaW5kZXhcIl0gPSBuaW5kZXg7XG4gIH0pO1xuXG4gIGl0ZW0uJHNlbGVjdC5odG1sKFxuICAgIG11c3RhY2hlLnJlbmRlcih0bXBsLmZvcm1TZWxlY3RPcHRpb25zLmNhbGwodGhpcywgaXRlbS5jb2x1bW5LZXlzKSwge1xuICAgICAgc2VsZWN0ZWQ6IGl0ZW0uc2VsZWN0ZWRcbiAgICB9KVxuICApO1xufTtcbmNvbnN0IHByaW50TGFiZWwgPSBmdW5jdGlvbiAocXVlSWR4KSB7XG4gIGxldCBpdGVtID0gdGhpcy5xdWV1ZVtxdWVJZHhdO1xuXG4gIGl0ZW0uJGRpc3BsYXlMYWJlbC5maW5kKCdbZGF0YS1heDZ1aS1hdXRvY29tcGxldGUtc2VsZWN0ZWQtbGFiZWxdJykucmVtb3ZlKCk7XG4gIGl0ZW0uJGRpc3BsYXlMYWJlbElucHV0LmJlZm9yZShnZXRMYWJlbC5jYWxsKHRoaXMsIHF1ZUlkeCkpO1xufTtcbmNvbnN0IGZvY3VzTGFiZWwgPSBmdW5jdGlvbiAocXVlSWR4KSB7XG4gIGlmICh0aGlzLnF1ZXVlW3F1ZUlkeF0uZGlzYWJsZWQpIHJldHVybiB0aGlzO1xuXG4gIHRoaXMucXVldWVbcXVlSWR4XS4kZGlzcGxheUxhYmVsLnRyaWdnZXIoXCJmb2N1c1wiKTtcbiAgdGhpcy5xdWV1ZVtxdWVJZHhdLiRkaXNwbGF5TGFiZWxJbnB1dC5mb2N1cygpO1xufTtcbmNvbnN0IGNsZWFyTGFiZWwgPSBmdW5jdGlvbiAocXVlSWR4KSB7XG4gIHRoaXMucXVldWVbcXVlSWR4XS4kZGlzcGxheUxhYmVsSW5wdXQudmFsKCcnKTtcbn07XG5jb25zdCBibHVyTGFiZWwgPSBmdW5jdGlvbiAocXVlSWR4KSB7XG4gIHRoaXMucXVldWVbcXVlSWR4XS4kZGlzcGxheUxhYmVsLnRyaWdnZXIoXCJibHVyXCIpO1xufTtcbmNvbnN0IG9uU2VhcmNoID0gZnVuY3Rpb24gKHF1ZUlkeCwgc2VhcmNoV29yZCkge1xuICBpZiAodGhpcy5hY3RpdmVhdXRvY29tcGxldGVRdWV1ZUluZGV4ID09IC0xKSByZXR1cm4gdGhpczsgLy8g7Ji17IWY67CV7Iqk6rCAIOuLq+2ejOyDge2DnOydtOuptCDsp4TtlonslYjtlaguXG4gIGxldCByZWdFeHAgPSAvW1xce1xcfVxcW1xcXVxcLz8uLDs6fFxcKSp+YCFeXFwtXys8PkBcXCMkJSZcXFxcXFw9XFwoXFwnXFxcIl0vZ2k7XG4gIHNlYXJjaFdvcmQgPSBzZWFyY2hXb3JkLnJlcGxhY2UocmVnRXhwLCBcIlwiKTtcblxuICB0aGlzLnF1ZXVlW3F1ZUlkeF0ud2FpdE9wdGlvbnMgPSB0cnVlO1xuICB0aGlzLnF1ZXVlW3F1ZUlkeF0ub25TZWFyY2guY2FsbCh7XG4gICAgc2VsZjogdGhpcyxcbiAgICBpdGVtOiB0aGlzLnF1ZXVlW3F1ZUlkeF0sXG4gICAgc2VhcmNoV29yZDogc2VhcmNoV29yZFxuICB9LCAoZnVuY3Rpb24gKE8pIHtcblxuICAgIGxldCBkYXRhID0ge307XG4gICAgbGV0IGl0ZW0gPSB0aGlzLnF1ZXVlW3RoaXMuYWN0aXZlYXV0b2NvbXBsZXRlUXVldWVJbmRleF07XG4gICAgaWYgKCFpdGVtKSByZXR1cm4gZmFsc2U7XG5cbiAgICAvLy8g7ZiE7J6sIHNlbGVjdGVkIOqygOymne2bhCDsspjrpqxcbiAgICAoZnVuY3Rpb24gKGl0ZW0sIE8pIHtcbiAgICAgIGxldCBvcHRpb25zTWFwID0ge307XG4gICAgICBPLm9wdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoX08sIF9PSW5kZXgpIHtcbiAgICAgICAgX09bXCJAaW5kZXhcIl0gPSBfT0luZGV4O1xuICAgICAgICBfT1tcIkBmaW5kZXhcIl0gPSBfT0luZGV4O1xuICAgICAgICBvcHRpb25zTWFwW19PW2l0ZW0uY29sdW1uS2V5cy5vcHRpb25WYWx1ZV1dID0gX087XG4gICAgICB9KTtcbiAgICAgIGlmIChVLmlzQXJyYXkoaXRlbS5zZWxlY3RlZCkpIHtcbiAgICAgICAgaXRlbS5zZWxlY3RlZC5mb3JFYWNoKGZ1bmN0aW9uIChfTykge1xuICAgICAgICAgIGlmIChvcHRpb25zTWFwW19PW2l0ZW0uY29sdW1uS2V5cy5vcHRpb25WYWx1ZV1dKSB7XG4gICAgICAgICAgICBPLm9wdGlvbnNbb3B0aW9uc01hcFtfT1tpdGVtLmNvbHVtbktleXMub3B0aW9uVmFsdWVdXVtcIkBpbmRleFwiXV1baXRlbS5jb2x1bW5LZXlzLm9wdGlvblNlbGVjdGVkXSA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KShpdGVtLCBPKTtcblxuICAgIGl0ZW0ub3B0aW9ucyA9IE8ub3B0aW9ucztcblxuICAgIGFsaWduQXV0b2NvbXBsZXRlRGlzcGxheS5jYWxsKHRoaXMpO1xuXG4gICAgLy8vIO2FnO2UjOumv+yXkCDsoITri6ztlaAg7Jik67iM7KCd7Yq4IOyEoOyWuFxuICAgIGRhdGEuaWQgPSBpdGVtLmlkO1xuICAgIGRhdGEudGhlbWUgPSBpdGVtLnRoZW1lO1xuICAgIGRhdGEubXVsdGlwbGUgPSBpdGVtLm11bHRpcGxlO1xuICAgIGRhdGEubGFuZyA9IGl0ZW0ubGFuZztcbiAgICBkYXRhLm9wdGlvbnMgPSBpdGVtLm9wdGlvbnM7XG4gICAgdGhpcy5hY3RpdmVhdXRvY29tcGxldGVPcHRpb25Hcm91cC5maW5kKCdbZGF0YS1lbHM9XCJjb250ZW50XCJdJykuaHRtbChtdXN0YWNoZS5yZW5kZXIodG1wbC5vcHRpb25zLmNhbGwodGhpcywgaXRlbS5jb2x1bW5LZXlzKSwgZGF0YSkpO1xuXG4gICAgZm9jdXNXb3JkLmNhbGwodGhpcywgdGhpcy5hY3RpdmVhdXRvY29tcGxldGVRdWV1ZUluZGV4LCBzZWFyY2hXb3JkKTtcbiAgICBhbGlnbkF1dG9jb21wbGV0ZU9wdGlvbkdyb3VwLmNhbGwodGhpcyk7XG5cbiAgICBzZXRUaW1lb3V0KChmdW5jdGlvbiAoKSB7XG4gICAgICBhbGlnbkF1dG9jb21wbGV0ZU9wdGlvbkdyb3VwLmNhbGwodGhpcyk7XG4gICAgfSkuYmluZCh0aGlzKSk7XG5cblxuICB9KS5iaW5kKHRoaXMpKTtcbn07XG5jb25zdCBmb2N1c1dvcmQgPSBmdW5jdGlvbiAocXVlSWR4LCBzZWFyY2hXb3JkKSB7XG4gIGlmICh0aGlzLmFjdGl2ZWF1dG9jb21wbGV0ZVF1ZXVlSW5kZXggPT0gLTEpIHJldHVybiB0aGlzOyAvLyDsmLXshZjrsJXsiqTqsIAg64ur7Z6M7IOB7YOc7J2066m0IOynhO2WieyViO2VqC5cbiAgbGV0IGNvbGxlY3Rfb3B0aW9ucyA9IFtdLCBpID0gLTEsIGwgPSB0aGlzLnF1ZXVlW3F1ZUlkeF0ub3B0aW9ucy5sZW5ndGggLSAxLCBuO1xuICBpZiAoc2VhcmNoV29yZCAhPSBcIlwiKSB7XG4gICAgd2hpbGUgKGwgLSBpKyspIHtcbiAgICAgIG4gPSB0aGlzLnF1ZXVlW3F1ZUlkeF0ub3B0aW9uc1tpXTtcblxuICAgICAgaWYgKCgnJyArIG4udGV4dCkudG9Mb3dlckNhc2UoKSA9PSBzZWFyY2hXb3JkLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgY29sbGVjdF9vcHRpb25zID0gW3snQGZpbmRleCc6IG5bJ0BmaW5kZXgnXSwgb3B0aW9uc1NvcnQ6IDB9XTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgc29ydCA9ICgnJyArIG4udGV4dCkudG9Mb3dlckNhc2UoKS5zZWFyY2goc2VhcmNoV29yZC50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgaWYgKHNvcnQgPiAtMSkge1xuICAgICAgICAgIGNvbGxlY3Rfb3B0aW9ucy5wdXNoKHsnQGZpbmRleCc6IG5bJ0BmaW5kZXgnXSwgb3B0aW9uc1NvcnQ6IHNvcnR9KTtcbiAgICAgICAgICBpZiAoY29sbGVjdF9vcHRpb25zLmxlbmd0aCA+IDIpIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHNvcnQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBjb2xsZWN0X29wdGlvbnMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGEub3B0aW9uc1NvcnQgLSBiLm9wdGlvbnNTb3J0O1xuICAgIH0pO1xuICB9XG5cbiAgaWYgKGNvbGxlY3Rfb3B0aW9ucyAmJiBjb2xsZWN0X29wdGlvbnMubGVuZ3RoID4gMCkge1xuICAgIGZvY3VzTW92ZS5jYWxsKHRoaXMsIHF1ZUlkeCwgdW5kZWZpbmVkLCBjb2xsZWN0X29wdGlvbnNbMF1bJ0BmaW5kZXgnXSk7XG4gIH0gZWxzZSB7XG4gICAgZm9jdXNDbGVhci5jYWxsKHRoaXMsIHF1ZUlkeCk7XG4gIH1cbn07XG5jb25zdCBmb2N1c0NsZWFyID0gZnVuY3Rpb24gKHF1ZUlkeCkge1xuICBpZiAodGhpcy5hY3RpdmVhdXRvY29tcGxldGVPcHRpb25Hcm91cCkge1xuICAgIHRoaXMuYWN0aXZlYXV0b2NvbXBsZXRlT3B0aW9uR3JvdXBcbiAgICAgIC5maW5kKCdbZGF0YS1vcHRpb24tZm9jdXMtaW5kZXhdJylcbiAgICAgIC5yZW1vdmVDbGFzcyhcImhvdmVyXCIpXG4gICAgICAucmVtb3ZlQXR0cihcImRhdGEtb3B0aW9uLXNlbGVjdGVkXCIpO1xuICB9XG5cbiAgdGhpcy5xdWV1ZVtxdWVJZHhdLm9wdGlvbkZvY3VzSW5kZXggPSAtMTtcbn07XG5jb25zdCBmb2N1c01vdmUgPSBmdW5jdGlvbiAocXVlSWR4LCBkaXJlY3Rpb24sIGZpbmRleCkge1xuICBsZXQgX2ZvY3VzSW5kZXgsIF9wcmV2Rm9jdXNJbmRleCwgZm9jdXNPcHRpb25FbCwgb3B0aW9uR3JvdXBTY3JvbGxDb250YWluZXI7XG4gIGxldCBpdGVtID0gdGhpcy5xdWV1ZVtxdWVJZHhdO1xuXG4gIGlmICh0aGlzLmFjdGl2ZWF1dG9jb21wbGV0ZU9wdGlvbkdyb3VwICYmIGl0ZW0ub3B0aW9ucyAmJiBpdGVtLm9wdGlvbnMubGVuZ3RoID4gMCkge1xuXG4gICAgaWYgKHR5cGVvZiBmaW5kZXggIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIF9mb2N1c0luZGV4ID0gZmluZGV4XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgX3ByZXZGb2N1c0luZGV4ID0gKGl0ZW0ub3B0aW9uRm9jdXNJbmRleCA9PSAtMSkgPyBpdGVtLm9wdGlvblNlbGVjdGVkSW5kZXggfHwgLTEgOiBpdGVtLm9wdGlvbkZvY3VzSW5kZXg7XG4gICAgICBpZiAoX3ByZXZGb2N1c0luZGV4ID09IC0xKSB7XG4gICAgICAgIF9mb2N1c0luZGV4ID0gMDtcbiAgICAgICAgLy9fZm9jdXNJbmRleCA9IChkaXJlY3Rpb24gPiAwKSA/IDAgOiBpdGVtLm9wdGlvbkl0ZW1MZW5ndGggLSAxOyAvLyDrp6gg64Gd7Jy866GcIOuztOuCvOqyg+yduOqwgCDrp5Ag6rKD7J246rCALlxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIF9mb2N1c0luZGV4ID0gX3ByZXZGb2N1c0luZGV4ICsgZGlyZWN0aW9uO1xuICAgICAgICBpZiAoX2ZvY3VzSW5kZXggPCAwKSBfZm9jdXNJbmRleCA9IDA7XG4gICAgICAgIGVsc2UgaWYgKF9mb2N1c0luZGV4ID4gaXRlbS5vcHRpb25JdGVtTGVuZ3RoIC0gMSkgX2ZvY3VzSW5kZXggPSBpdGVtLm9wdGlvbkl0ZW1MZW5ndGggLSAxO1xuICAgICAgfVxuICAgIH1cblxuICAgIGl0ZW0ub3B0aW9uRm9jdXNJbmRleCA9IF9mb2N1c0luZGV4O1xuXG4gICAgLy8g7Y+s7Luk7IqkIOyduOuNseyKpOqwgCBoaWRl7JWE7J207YWc7J2EIOunjOuCmOuptCBoaWRlIOyVhOydtO2FnOydtCDslYjrgpjsmKwg65WM6rmM7KeAIOujqO2UhOulvCDsiJztmowg7ZWp64uI64ukLlxuICAgIGlmIChpdGVtLm9wdGlvbnNbX2ZvY3VzSW5kZXhdICYmIGl0ZW0ub3B0aW9uc1tfZm9jdXNJbmRleF0uaGlkZSkgeyAvLyDsmLXshZjsnbQg7JeG64qUIOqwkuydtCDshKDtg53rkJwg6rK97JqwXG4gICAgICBpZiAodHlwZW9mIGRpcmVjdGlvbiA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBsZXQgaXNTdHJvcCA9IGZhbHNlO1xuICAgICAgICB3aGlsZSAoaXRlbS5vcHRpb25zW19mb2N1c0luZGV4XS5oaWRlKSB7XG4gICAgICAgICAgX2ZvY3VzSW5kZXggPSBfZm9jdXNJbmRleCArIGRpcmVjdGlvbjtcbiAgICAgICAgICBpZiAoX2ZvY3VzSW5kZXggPCAwKSB7XG4gICAgICAgICAgICBfZm9jdXNJbmRleCA9IDA7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAoX2ZvY3VzSW5kZXggPiBpdGVtLm9wdGlvbkl0ZW1MZW5ndGggLSAxKSB7XG4gICAgICAgICAgICBfZm9jdXNJbmRleCA9IGl0ZW0ub3B0aW9uSXRlbUxlbmd0aCAtIDE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIF9mb2N1c0luZGV4ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aGlzLmFjdGl2ZWF1dG9jb21wbGV0ZU9wdGlvbkdyb3VwXG4gICAgICAgIC5maW5kKCdbZGF0YS1vcHRpb24tZm9jdXMtaW5kZXhdJylcbiAgICAgICAgLnJlbW92ZUNsYXNzKFwiaG92ZXJcIik7XG5cbiAgICAgIGZvY3VzT3B0aW9uRWwgPSB0aGlzLmFjdGl2ZWF1dG9jb21wbGV0ZU9wdGlvbkdyb3VwXG4gICAgICAgIC5maW5kKCdbZGF0YS1vcHRpb24tZm9jdXMtaW5kZXg9XCInICsgX2ZvY3VzSW5kZXggKyAnXCJdJylcbiAgICAgICAgLmFkZENsYXNzKFwiaG92ZXJcIik7XG5cbiAgICAgIG9wdGlvbkdyb3VwU2Nyb2xsQ29udGFpbmVyID0gdGhpcy5hY3RpdmVhdXRvY29tcGxldGVPcHRpb25Hcm91cC5maW5kKCdbZGF0YS1lbHM9XCJjb250ZW50XCJdJyk7XG5cbiAgICAgIGlmIChmb2N1c09wdGlvbkVsLmdldCgwKSkge1xuICAgICAgICBsZXQgZm9jdXNPcHRpb25FbEhlaWdodCA9IGZvY3VzT3B0aW9uRWwub3V0ZXJIZWlnaHQoKSxcbiAgICAgICAgICBvcHRpb25Hcm91cFNjcm9sbENvbnRhaW5lckhlaWdodCA9IG9wdGlvbkdyb3VwU2Nyb2xsQ29udGFpbmVyLmlubmVySGVpZ2h0KCksXG4gICAgICAgICAgb3B0aW9uR3JvdXBTY3JvbGxDb250YWluZXJTY3JvbGxUb3AgPSBvcHRpb25Hcm91cFNjcm9sbENvbnRhaW5lci5zY3JvbGxUb3AoKSxcbiAgICAgICAgICBmb2N1c09wdGlvbkVsVG9wID0gZm9jdXNPcHRpb25FbC5wb3NpdGlvbigpLnRvcCArIG9wdGlvbkdyb3VwU2Nyb2xsQ29udGFpbmVyLnNjcm9sbFRvcCgpO1xuXG4gICAgICAgIGlmIChvcHRpb25Hcm91cFNjcm9sbENvbnRhaW5lckhlaWdodCArIG9wdGlvbkdyb3VwU2Nyb2xsQ29udGFpbmVyU2Nyb2xsVG9wIDwgZm9jdXNPcHRpb25FbFRvcCArIGZvY3VzT3B0aW9uRWxIZWlnaHQpIHtcbiAgICAgICAgICBvcHRpb25Hcm91cFNjcm9sbENvbnRhaW5lci5zY3JvbGxUb3AoZm9jdXNPcHRpb25FbFRvcCArIGZvY3VzT3B0aW9uRWxIZWlnaHQgLSBvcHRpb25Hcm91cFNjcm9sbENvbnRhaW5lckhlaWdodCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob3B0aW9uR3JvdXBTY3JvbGxDb250YWluZXJTY3JvbGxUb3AgPiBmb2N1c09wdGlvbkVsVG9wKSB7XG4gICAgICAgICAgb3B0aW9uR3JvdXBTY3JvbGxDb250YWluZXIuc2Nyb2xsVG9wKGZvY3VzT3B0aW9uRWxUb3ApO1xuICAgICAgICB9XG4gICAgICAgIC8vIG9wdGlvbkdyb3VwIHNjcm9sbCBjaGVja1xuXG4gICAgICAgIGlmICh0eXBlb2YgZGlyZWN0aW9uICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbS4kZGlzcGxheUxhYmVsSW5wdXQudmFsKGl0ZW0ub3B0aW9uc1tfZm9jdXNJbmRleF0udGV4dCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5jb25zdCBiaW5kQXV0b2NvbXBsZXRlVGFyZ2V0ID0gZnVuY3Rpb24gKHF1ZUlkeCkge1xuICBsZXQgaXRlbSA9IHRoaXMucXVldWVbcXVlSWR4XSwgZGF0YSA9IHt9O1xuICBjb25zdCBkZWJvdW5jZWRGb2N1c1dvcmQgPSBVLmRlYm91bmNlKGZ1bmN0aW9uIChxdWVJZHgpIHtcbiAgICBpZiAodGhpcy5hY3RpdmVhdXRvY29tcGxldGVRdWV1ZUluZGV4ID09IC0xKSByZXR1cm4gdGhpczsgLy8g7Ji17IWY67CV7Iqk6rCAIOuLq+2ejOyDge2DnOydtOuptCDsp4TtlonslYjtlaguXG4gICAgb25TZWFyY2guY2FsbCh0aGlzLCBxdWVJZHgsIHRoaXMucXVldWVbcXVlSWR4XS4kZGlzcGxheUxhYmVsSW5wdXQudmFsKCkpO1xuICB9LCAxMDApLmJpbmQodGhpcyk7XG4gIGNvbnN0IGF1dG9jb21wbGV0ZUV2ZW50ID0ge1xuICAgICdjbGljayc6IGZ1bmN0aW9uIChxdWVJZHgsIGUpIHtcbiAgICAgIGxldCBjbGlja0VsID0gXCJcIjtcbiAgICAgIGxldCB0YXJnZXQgPSBVLmZpbmRQYXJlbnROb2RlKGUudGFyZ2V0LCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIGlmICh0YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1heDZ1aS1hdXRvY29tcGxldGUtcmVtb3ZlXCIpKSB7XG4gICAgICAgICAgY2xpY2tFbCA9IFwib3B0aW9uSXRlbVJlbW92ZVwiO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXNlbGVjdGVkLWNsZWFyXCIpKSB7XG4gICAgICAgICAgY2xpY2tFbCA9IFwiY2xlYXJcIjtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgaWYgKGNsaWNrRWwgPT09IFwib3B0aW9uSXRlbVJlbW92ZVwiKSB7XG4gICAgICAgICAgbGV0IHJlbW92ZUluZGV4ID0gdGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtYXg2dWktYXV0b2NvbXBsZXRlLXJlbW92ZS1pbmRleFwiKTtcbiAgICAgICAgICB0aGlzLnF1ZXVlW3F1ZUlkeF0uc2VsZWN0ZWQuc3BsaWNlKHJlbW92ZUluZGV4LCAxKTtcbiAgICAgICAgICBzeW5jTGFiZWwuY2FsbCh0aGlzLCBxdWVJZHgpO1xuICAgICAgICAgIHByaW50TGFiZWwuY2FsbCh0aGlzLCBxdWVJZHgpO1xuICAgICAgICAgIGZvY3VzTGFiZWwuY2FsbCh0aGlzLCBxdWVJZHgpO1xuICAgICAgICAgIGFsaWduQXV0b2NvbXBsZXRlRGlzcGxheS5jYWxsKHRoaXMpO1xuICAgICAgICAgIGFsaWduQXV0b2NvbXBsZXRlT3B0aW9uR3JvdXAuY2FsbCh0aGlzKTtcbiAgICAgICAgICBVLnN0b3BFdmVudChlKTtcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSBlbHNlIGlmIChjbGlja0VsID09PSBcImNsZWFyXCIpIHtcbiAgICAgICAgICBzZXRTZWxlY3RlZC5jYWxsKHRoaXMsIHF1ZUlkeCwge2NsZWFyOiB0cnVlfSk7XG4gICAgICAgICAgYWxpZ25BdXRvY29tcGxldGVEaXNwbGF5LmNhbGwodGhpcyk7XG4gICAgICAgICAgYWxpZ25BdXRvY29tcGxldGVPcHRpb25Hcm91cC5jYWxsKHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlYXV0b2NvbXBsZXRlUXVldWVJbmRleCA9PSBxdWVJZHgpIHtcbiAgICAgICAgICBpZiAodGhpcy5xdWV1ZVtxdWVJZHhdLm9wdGlvbkZvY3VzSW5kZXggPT0gLTEpIHsgLy8g7JWE7J207YWc7JeQIO2PrOy7pOyKpOqwgCDtmZzshLHtmZQg65CcIO2bhCwg66eI7Jqw7IqkIOydtOuypO2KuCDsnbTrqbQg66y07IucXG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGZvY3VzTGFiZWwuY2FsbCh0aGlzLCBxdWVJZHgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICAna2V5VXAnOiBmdW5jdGlvbiAocXVlSWR4LCBlKSB7XG4gICAgICAvLy8g7JW97IaN65CcIO2CpCDsnbTrsqTtirjqsIAg67Cc7IOd7ZWY66m0IHN0b3BFdmVudOulvCDthrXtlbQga2V5VXAg7J2067Kk7Yq46rCAIOuwnOyDneuQmOyngCDslYrrj4TroZ0g66eJ7JWE7KO864qUIOyEvOyKpFxuICAgICAgaWYgKGUud2hpY2ggPT0gaW5mby5ldmVudEtleXMuRVNDICYmIHRoaXMuYWN0aXZlYXV0b2NvbXBsZXRlUXVldWVJbmRleCA9PT0gLTEpIHsgLy8gRVND7YKk66W8IOuIhOultOqzoCDsmLXshZjqt7jro7nsnbQg7Je066Ck7J6I7KeAIOyViuydgCDqsr3smrBcbiAgICAgICAgVS5zdG9wRXZlbnQoZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoZS53aGljaCA9PSBpbmZvLmV2ZW50S2V5cy5UQUIpIHtcbiAgICAgICAgLy8gbm90aGluZ1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodGhpcy5hY3RpdmVhdXRvY29tcGxldGVRdWV1ZUluZGV4ICE9IHF1ZUlkeCAmJiBlLndoaWNoICE9IGluZm8uZXZlbnRLZXlzLkJBQ0tTUEFDRSkgeyAvLyDri6vtnowg7IOB7YOcIOyduOqyveyasFxuICAgICAgICB0aGlzLm9wZW4ocXVlSWR4KTsgLy8gb3BlbiBhbmQgYWxpZ25cbiAgICAgICAgZGVib3VuY2VkRm9jdXNXb3JkKHF1ZUlkeCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjdHJsS2V5c1tlLndoaWNoXSkge1xuICAgICAgICBVLnN0b3BFdmVudChlKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICAvLyBiYWNrc3BhY2Ug6rCQ7KeAIO2VmOyXrCBpbnB1dCDqsJLsnbQg7JeG7Jy866m0IOyKpO2DkeydtOuypO2KuCDsspjrpqwg7ZWgIOqyg1xuICAgICAgICBpZiAoZS53aGljaCA9PSBpbmZvLmV2ZW50S2V5cy5CQUNLU1BBQ0UgJiYgdGhpcy5xdWV1ZVtxdWVJZHhdLiRkaXNwbGF5TGFiZWxJbnB1dC52YWwoKSA9PSBcIlwiKSB7XG4gICAgICAgICAgLy8g66eI7KeA66eJIOyVhOydtO2FnOydhCDsoJzqsbAuXG4gICAgICAgICAgdGhpcy5xdWV1ZVtxdWVJZHhdLnNlbGVjdGVkLnBvcCgpO1xuICAgICAgICAgIHN5bmNMYWJlbC5jYWxsKHRoaXMsIHF1ZUlkeCk7XG4gICAgICAgICAgcHJpbnRMYWJlbC5jYWxsKHRoaXMsIHF1ZUlkeCk7XG4gICAgICAgICAgZm9jdXNMYWJlbC5jYWxsKHRoaXMsIHF1ZUlkeCk7XG4gICAgICAgICAgYWxpZ25BdXRvY29tcGxldGVEaXNwbGF5LmNhbGwodGhpcyk7XG4gICAgICAgICAgYWxpZ25BdXRvY29tcGxldGVPcHRpb25Hcm91cC5jYWxsKHRoaXMpO1xuICAgICAgICAgIFUuc3RvcEV2ZW50KGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRlYm91bmNlZEZvY3VzV29yZChxdWVJZHgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICAna2V5RG93bic6IGZ1bmN0aW9uIChxdWVJZHgsIGUpIHtcbiAgICAgIGxldCBpdGVtID0gdGhpcy5xdWV1ZVtxdWVJZHhdO1xuICAgICAgaWYgKGUud2hpY2ggPT0gaW5mby5ldmVudEtleXMuRVNDKSB7XG4gICAgICAgIGNsZWFyTGFiZWwuY2FsbCh0aGlzLCBxdWVJZHgpO1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIFUuc3RvcEV2ZW50KGUpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoZS53aGljaCA9PSBpbmZvLmV2ZW50S2V5cy5SRVRVUk4pIHtcbiAgICAgICAgbGV0IGlucHV0VmFsdWUgPSBpdGVtLiRkaXNwbGF5TGFiZWxJbnB1dC52YWwoKTtcbiAgICAgICAgaWYgKGl0ZW0ub3B0aW9uRm9jdXNJbmRleCA+IC0xKSB7XG4gICAgICAgICAgc2V0U2VsZWN0ZWQuY2FsbCh0aGlzLCBpdGVtLmlkLCB7XG4gICAgICAgICAgICBvcHRpb25JbmRleDoge1xuICAgICAgICAgICAgICBpbmRleDogaXRlbS5vcHRpb25Gb2N1c0luZGV4XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgdW5kZWZpbmVkLCBcIm9wdGlvbkl0ZW1DbGlja1wiKTtcbiAgICAgICAgfSBlbHNlIGlmIChpbnB1dFZhbHVlICE9IFwiXCIpIHtcbiAgICAgICAgICBzZXRTZWxlY3RlZC5jYWxsKHRoaXMsIHF1ZUlkeCwgaW5wdXRWYWx1ZSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgY2xlYXJMYWJlbC5jYWxsKHRoaXMsIHF1ZUlkeCk7XG4gICAgICAgIGFsaWduQXV0b2NvbXBsZXRlRGlzcGxheS5jYWxsKHRoaXMpO1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG5cbiAgICAgICAgVS5zdG9wRXZlbnQoZSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChlLndoaWNoID09IGluZm8uZXZlbnRLZXlzLkRPV04pIHtcbiAgICAgICAgZm9jdXNNb3ZlLmNhbGwodGhpcywgcXVlSWR4LCAxKTtcbiAgICAgICAgVS5zdG9wRXZlbnQoZSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChlLndoaWNoID09IGluZm8uZXZlbnRLZXlzLlVQKSB7XG4gICAgICAgIGZvY3VzTW92ZS5jYWxsKHRoaXMsIHF1ZUlkeCwgLTEpO1xuICAgICAgICBVLnN0b3BFdmVudChlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgICdmb2N1cyc6IGZ1bmN0aW9uIChxdWVJZHgsIGUpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGUpO1xuICAgIH0sXG4gICAgJ2JsdXInOiBmdW5jdGlvbiAocXVlSWR4LCBlKSB7XG4gICAgICBibHVyTGFiZWwuY2FsbCh0aGlzLCBxdWVJZHgpO1xuICAgICAgVS5zdG9wRXZlbnQoZSk7XG4gICAgfSxcbiAgICAnc2VsZWN0Q2hhbmdlJzogZnVuY3Rpb24gKHF1ZUlkeCwgZSkge1xuICAgICAgc2V0U2VsZWN0ZWQuY2FsbCh0aGlzLCBxdWVJZHgsIHt2YWx1ZTogaXRlbS4kc2VsZWN0LnZhbCgpfSwgdHJ1ZSk7XG4gICAgfVxuICB9O1xuICBjb25zdCBibHVyTGFiZWwgPSBmdW5jdGlvbiAocXVlSWR4KSB7XG4gICAgY2xlYXJMYWJlbC5jYWxsKHRoaXMsIHF1ZUlkeCk7XG4gIH07XG5cblxuXG4gIGlmICghaXRlbS4kZGlzcGxheSkge1xuICAgIC8vLyDthZztlIzrpr/sl5Ag7KCE64us7ZWgIOyYpOu4jOygne2KuCDshKDslrhcbiAgICBkYXRhLmluc3RhbmNlSWQgPSB0aGlzLmluc3RhbmNlSWQ7XG4gICAgZGF0YS5pZCA9IGl0ZW0uaWQ7XG4gICAgZGF0YS5uYW1lID0gaXRlbS5uYW1lO1xuICAgIGRhdGEudGhlbWUgPSBpdGVtLnRoZW1lO1xuICAgIGRhdGEudGFiSW5kZXggPSBpdGVtLnRhYkluZGV4O1xuICAgIGRhdGEubXVsdGlwbGUgPSBpdGVtLm11bHRpcGxlO1xuICAgIGRhdGEucmVzZXQgPSBpdGVtLnJlc2V0O1xuICAgIGRhdGEuaGVpZ2h0ID0gaXRlbS5oZWlnaHQ7XG4gICAgZGF0YS5vcHRpb25JdGVtSGVpZ2h0ID0gaXRlbS5vcHRpb25JdGVtSGVpZ2h0O1xuICAgIGRhdGEucGFkZGluZ0xlZnQgPSAoaXRlbS5oZWlnaHQgLSBpdGVtLm9wdGlvbkl0ZW1IZWlnaHQpIC8gMjtcbiAgICBkYXRhLmxhYmVsID0gZ2V0TGFiZWwuY2FsbCh0aGlzLCBxdWVJZHgpO1xuXG4gICAgaXRlbS4kZGlzcGxheSA9IGpRdWVyeShtdXN0YWNoZS5yZW5kZXIodG1wbC5hdXRvY29tcGxldGVEaXNwbGF5LmNhbGwodGhpcywgaXRlbS5jb2x1bW5LZXlzKSwgZGF0YSkpO1xuICAgIGl0ZW0uJGRpc3BsYXlUYWJsZSA9IGl0ZW0uJGRpc3BsYXkuZmluZCgnW2RhdGEtZWxzPVwiZGlzcGxheS10YWJsZVwiXScpO1xuICAgIGl0ZW0uJGRpc3BsYXlMYWJlbCA9IGl0ZW0uJGRpc3BsYXkuZmluZCgnW2RhdGEtYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXk9XCJsYWJlbFwiXScpO1xuICAgIGl0ZW0uJGRpc3BsYXlMYWJlbElucHV0ID0gaXRlbS4kZGlzcGxheS5maW5kKCdbZGF0YS1heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheT1cImlucHV0XCJdJyk7XG5cbiAgICBpZiAoaXRlbS4kdGFyZ2V0LmZpbmQoXCJzZWxlY3RcIikuZ2V0KDApKSB7XG4gICAgICBpdGVtLiRzZWxlY3QgPSBpdGVtLiR0YXJnZXQuZmluZChcInNlbGVjdFwiKTtcbiAgICAgIGl0ZW0uJHNlbGVjdFxuICAgICAgICAuYXR0cihcInRhYmluZGV4XCIsIFwiLTFcIilcbiAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcImZvcm0tY29udHJvbCBcIiArIGRhdGEuZm9ybVNpemUpO1xuXG4gICAgICBpZiAoZGF0YS5uYW1lKSB7XG4gICAgICAgIGl0ZW0uJHNlbGVjdC5hdHRyKFwibmFtZVwiLCBcIm5hbWVcIik7XG4gICAgICB9XG4gICAgICBpdGVtLiRzZWxlY3QuYXR0cihcIm11bHRpcGxlXCIsIFwibXVsdGlwbGVcIik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaXRlbS4kc2VsZWN0ID0galF1ZXJ5KG11c3RhY2hlLnJlbmRlcih0bXBsLmZvcm1TZWxlY3QuY2FsbCh0aGlzLCBpdGVtLmNvbHVtbktleXMpLCBkYXRhKSk7XG4gICAgICBpdGVtLiR0YXJnZXQuYXBwZW5kKGl0ZW0uJHNlbGVjdCk7XG4gICAgfVxuXG4gICAgaXRlbS4kdGFyZ2V0LmFwcGVuZChpdGVtLiRkaXNwbGF5KTtcblxuICB9XG4gIGVsc2Uge1xuICAgIHByaW50TGFiZWwuY2FsbCh0aGlzLCBxdWVJZHgpO1xuICB9XG5cbiAgYWxpZ25BdXRvY29tcGxldGVEaXNwbGF5LmNhbGwodGhpcyk7XG5cblxuICBpdGVtLiRkaXNwbGF5XG4gICAgLm9mZignY2xpY2suYXg2dWktYXV0b2NvbXBsZXRlJylcbiAgICAub24oJ2NsaWNrLmF4NnVpLWF1dG9jb21wbGV0ZScsIGF1dG9jb21wbGV0ZUV2ZW50LmNsaWNrLmJpbmQodGhpcywgcXVlSWR4KSk7XG5cbiAgLy8gYXV0b2NvbXBsZXRlIO2DnOq3uOyXkCDrjIDtlZwg7J2067Kk7Yq4IOqwkOyLnFxuXG4gIGl0ZW0uJGRpc3BsYXlMYWJlbElucHV0XG4gICAgLm9mZihcImZvY3VzLmF4NnVpLWF1dG9jb21wbGV0ZVwiKVxuICAgIC5vbihcImZvY3VzLmF4NnVpLWF1dG9jb21wbGV0ZVwiLCBhdXRvY29tcGxldGVFdmVudC5mb2N1cy5iaW5kKHRoaXMsIHF1ZUlkeCkpXG4gICAgLm9mZihcImJsdXIuYXg2dWktYXV0b2NvbXBsZXRlXCIpXG4gICAgLm9uKFwiYmx1ci5heDZ1aS1hdXRvY29tcGxldGVcIiwgYXV0b2NvbXBsZXRlRXZlbnQuYmx1ci5iaW5kKHRoaXMsIHF1ZUlkeCkpXG4gICAgLm9mZihcImtleWRvd24uYXg2dWktYXV0b2NvbXBsZXRlXCIpXG4gICAgLm9uKFwia2V5ZG93bi5heDZ1aS1hdXRvY29tcGxldGVcIiwgYXV0b2NvbXBsZXRlRXZlbnQua2V5RG93bi5iaW5kKHRoaXMsIHF1ZUlkeCkpXG4gICAgLm9mZihcImtleXVwLmF4NnVpLWF1dG9jb21wbGV0ZVwiKVxuICAgIC5vbihcImtleXVwLmF4NnVpLWF1dG9jb21wbGV0ZVwiLCBhdXRvY29tcGxldGVFdmVudC5rZXlVcC5iaW5kKHRoaXMsIHF1ZUlkeCkpO1xuXG4gIC8vIHNlbGVjdCDtg5zqt7jsl5Ag64yA7ZWcIGNoYW5nZSDsnbTrsqTtirgg6rCQ7IucXG5cbiAgLypcbiAgICBpdGVtLiRzZWxlY3RcbiAgICAgIC5vZmYoJ2NoYW5nZS5heDZ1aS1hdXRvY29tcGxldGUnKVxuICAgICAgLm9uKCdjaGFuZ2UuYXg2dWktYXV0b2NvbXBsZXRlJywgYXV0b2NvbXBsZXRlRXZlbnQuc2VsZWN0Q2hhbmdlLmJpbmQodGhpcywgcXVlSWR4KSk7XG4gICAgKi9cblxuICBkYXRhID0gbnVsbDtcbiAgaXRlbSA9IG51bGw7XG4gIHF1ZUlkeCA9IG51bGw7XG4gIHJldHVybiB0aGlzO1xufTtcbmNvbnN0IGdldFF1ZUlkeCA9IGZ1bmN0aW9uIChib3VuZElEKSB7XG4gIGlmIChib3VuZElEIGluc3RhbmNlb2YgalF1ZXJ5KSB7XG4gICAgYm91bmRJRCA9IGJvdW5kSUQuZGF0YShcImRhdGEtYXg2dWktYXV0b2NvbXBsZXRlLWlkXCIpO1xuICB9IGVsc2UgaWYgKCFVLmlzU3RyaW5nKGJvdW5kSUQpKSB7XG4gICAgYm91bmRJRCA9IGpRdWVyeShib3VuZElEKS5kYXRhKFwiZGF0YS1heDZ1aS1hdXRvY29tcGxldGUtaWRcIik7XG4gIH1cbiAgaWYgKCFVLmlzU3RyaW5nKGJvdW5kSUQpKSB7XG4gICAgY29uc29sZS5sb2coaW5mby5nZXRFcnJvcihcImF4NnVpLWF1dG9jb21wbGV0ZVwiLCBcIjQwMlwiLCBcImdldFF1ZUlkeFwiKSk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHJldHVybiBVLnNlYXJjaCh0aGlzLnF1ZXVlLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuaWQgPT0gYm91bmRJRDtcbiAgfSk7XG59O1xuY29uc3QgZ2V0U2VsZWN0ZWQgPSBmdW5jdGlvbiAoX2l0ZW0sIG8sIHNlbGVjdGVkKSB7XG4gIGlmICh0eXBlb2Ygc2VsZWN0ZWQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4gKF9pdGVtLm11bHRpcGxlKSA/ICFvIDogdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gc2VsZWN0ZWQ7XG4gIH1cbn07XG5jb25zdCBjbGVhclNlbGVjdGVkID0gZnVuY3Rpb24gKHF1ZUlkeCkge1xuICB0aGlzLnF1ZXVlW3F1ZUlkeF0ub3B0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChuKSB7XG4gICAgaWYgKG4ub3B0Z3JvdXApIHtcbiAgICAgIG4ub3B0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChubikge1xuICAgICAgICBubi5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgbi5zZWxlY3RlZCA9IGZhbHNlO1xuICAgIH1cbiAgfSk7XG5cbiAgdGhpcy5xdWV1ZVtxdWVJZHhdLnNlbGVjdGVkID0gW107XG4gIHRoaXMucXVldWVbcXVlSWR4XS4kc2VsZWN0Lmh0bWwoXG4gICAgbXVzdGFjaGUucmVuZGVyKHRtcGwuZm9ybVNlbGVjdE9wdGlvbnMuY2FsbCh0aGlzLCB0aGlzLnF1ZXVlW3F1ZUlkeF0uY29sdW1uS2V5cyksIHtcbiAgICAgIHNlbGVjdGVkOiB0aGlzLnF1ZXVlW3F1ZUlkeF0uc2VsZWN0ZWRcbiAgICB9KVxuICApO1xufTtcbmNvbnN0IHNldFNlbGVjdGVkID0gZnVuY3Rpb24gKGJvdW5kSUQsIHZhbHVlLCBzZWxlY3RlZCwgX29wdGlvbikge1xuICBjb25zdCBwcm9jZXNzb3IgPSB7XG4gICAgJ3NlbGVjdGVkSW5kZXgnOiBmdW5jdGlvbiAocXVlSWR4LCB2YWx1ZSwgc2VsZWN0ZWQsIHNldFZhbHVlVHlwZSkge1xuXG4gICAgfSxcbiAgICAncmVtb3ZlU2VsZWN0ZWRJbmRleCc6IGZ1bmN0aW9uIChxdWVJZHgsIHZhbHVlLCBzZWxlY3RlZCwgc2V0VmFsdWVUeXBlKSB7XG4gICAgICB2YXIgaXRlbSA9IHRoaXMucXVldWVbcXVlSWR4XSwgYWRkT3B0aW9ucyA9IHt9O1xuICAgICAgdmFyIG5ld1NlbGVjdGVkQXJyYXkgPSBbXSwgb3B0aW9uSW5kZXggPSAwO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtLnNlbGVjdGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChpdGVtLnNlbGVjdGVkW2ldWydAaW5kZXgnXSAhPSB2YWx1ZS5yZW1vdmVTZWxlY3RlZEluZGV4LmluZGV4KSB7XG4gICAgICAgICAgYWRkT3B0aW9ucyA9IHsnQGluZGV4Jzogb3B0aW9uSW5kZXgsICdAZmluZGV4Jzogb3B0aW9uSW5kZXh9O1xuICAgICAgICAgIGFkZE9wdGlvbnNbaXRlbS5jb2x1bW5LZXlzLm9wdGlvblZhbHVlXSA9IGl0ZW0uc2VsZWN0ZWRbaV1baXRlbS5jb2x1bW5LZXlzLm9wdGlvblZhbHVlXTtcbiAgICAgICAgICBhZGRPcHRpb25zW2l0ZW0uY29sdW1uS2V5cy5vcHRpb25UZXh0XSA9IGl0ZW0uc2VsZWN0ZWRbaV1baXRlbS5jb2x1bW5LZXlzLm9wdGlvblRleHRdO1xuICAgICAgICAgIG5ld1NlbGVjdGVkQXJyYXkucHVzaChhZGRPcHRpb25zKTtcbiAgICAgICAgICBvcHRpb25JbmRleCsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpdGVtLnNlbGVjdGVkID0gbmV3U2VsZWN0ZWRBcnJheTtcbiAgICB9LFxuICAgICdvcHRpb25JbmRleCc6IGZ1bmN0aW9uIChxdWVJZHgsIHZhbHVlLCBzZWxlY3RlZCwgc2V0VmFsdWVUeXBlKSB7XG4gICAgICB2YXIgaXRlbSA9IHRoaXMucXVldWVbcXVlSWR4XSwgYWRkT3B0aW9ucyA9IHt9O1xuICAgICAgdmFyIG9wdGlvbkluZGV4ID0gaXRlbS5zZWxlY3RlZC5sZW5ndGg7XG4gICAgICB2YXIgcHVzaE9rID0gdHJ1ZTtcblxuICAgICAgYWRkT3B0aW9ucyA9IHtcbiAgICAgICAgJ0BpbmRleCc6IG9wdGlvbkluZGV4LCAnQGZpbmRleCc6IG9wdGlvbkluZGV4XG4gICAgICB9O1xuICAgICAgYWRkT3B0aW9uc1tpdGVtLmNvbHVtbktleXMub3B0aW9uVmFsdWVdID0gaXRlbS5vcHRpb25zW3ZhbHVlLm9wdGlvbkluZGV4LmluZGV4XVtpdGVtLmNvbHVtbktleXMub3B0aW9uVmFsdWVdO1xuICAgICAgYWRkT3B0aW9uc1tpdGVtLmNvbHVtbktleXMub3B0aW9uVGV4dF0gPSBpdGVtLm9wdGlvbnNbdmFsdWUub3B0aW9uSW5kZXguaW5kZXhdW2l0ZW0uY29sdW1uS2V5cy5vcHRpb25UZXh0XTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtLnNlbGVjdGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChpdGVtLnNlbGVjdGVkW2ldW2l0ZW0uY29sdW1uS2V5cy5vcHRpb25WYWx1ZV0gPT0gYWRkT3B0aW9uc1tpdGVtLmNvbHVtbktleXMub3B0aW9uVmFsdWVdKSB7XG4gICAgICAgICAgcHVzaE9rID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChwdXNoT2spIGl0ZW0uc2VsZWN0ZWQucHVzaChhZGRPcHRpb25zKTtcbiAgICB9LFxuICAgICdhcnInOiBmdW5jdGlvbiAocXVlSWR4LCB2YWx1ZXMsIHNlbGVjdGVkLCBzZXRWYWx1ZVR5cGUpIHtcbiAgICAgIHZhbHVlcy5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAoVS5pc1N0cmluZyh2YWx1ZSkgfHwgVS5pc051bWJlcih2YWx1ZSkpIHtcbiAgICAgICAgICBwcm9jZXNzb3IudGV4dC5jYWxsKHNlbGYsIHF1ZUlkeCwgdmFsdWUsIHNlbGVjdGVkLCBcImp1c3RTZXRWYWx1ZVwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gcHJvY2Vzc29yKSB7XG4gICAgICAgICAgICBpZiAodmFsdWVba2V5XSkge1xuICAgICAgICAgICAgICBwcm9jZXNzb3Jba2V5XS5jYWxsKHNlbGYsIHF1ZUlkeCwgdmFsdWUsIHNlbGVjdGVkLCBcImp1c3RTZXRWYWx1ZVwiKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LFxuICAgICd2YWx1ZSc6IGZ1bmN0aW9uIChxdWVJZHgsIHZhbHVlLCBzZWxlY3RlZCwgc2V0VmFsdWVUeXBlKSB7XG4gICAgICB2YXIgaXRlbSA9IHRoaXMucXVldWVbcXVlSWR4XTtcbiAgICAgIHZhciBhZGRPcHRpb25zO1xuICAgICAgdmFyIG9wdGlvbkluZGV4ID0gVS5zZWFyY2goaXRlbS5vcHRpb25zLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzW2l0ZW0uY29sdW1uS2V5cy5vcHRpb25WYWx1ZV0gPT0gdmFsdWUudmFsdWVbaXRlbS5jb2x1bW5LZXlzLm9wdGlvblZhbHVlXTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAob3B0aW9uSW5kZXggPiAtMSkge1xuICAgICAgICBpdGVtLm9wdGlvbnNbb3B0aW9uSW5kZXhdW2l0ZW0uY29sdW1uS2V5cy5vcHRpb25TZWxlY3RlZF1cbiAgICAgICAgICA9IGdldFNlbGVjdGVkKGl0ZW0sIGl0ZW0ub3B0aW9uc1tvcHRpb25JbmRleF1baXRlbS5jb2x1bW5LZXlzLm9wdGlvblNlbGVjdGVkXSwgc2VsZWN0ZWQpO1xuXG4gICAgICAgIGlmIChpdGVtLm9wdGlvbnNbb3B0aW9uSW5kZXhdW2l0ZW0uY29sdW1uS2V5cy5vcHRpb25TZWxlY3RlZF0pIHtcbiAgICAgICAgICB2YXIgYXBwZW5kT2sgPSB0cnVlO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbS5zZWxlY3RlZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGl0ZW0uc2VsZWN0ZWRbaV1bdGhpcy5jb25maWcuY29sdW1uS2V5cy5vcHRpb25WYWx1ZV0gPT0gaXRlbS5vcHRpb25zW29wdGlvbkluZGV4XVt0aGlzLmNvbmZpZy5jb2x1bW5LZXlzLm9wdGlvblZhbHVlXSkge1xuICAgICAgICAgICAgICBhcHBlbmRPayA9IGZhbHNlO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGFwcGVuZE9rKSB7XG4gICAgICAgICAgICBhZGRPcHRpb25zID0ge307XG4gICAgICAgICAgICBhZGRPcHRpb25zW2l0ZW0uY29sdW1uS2V5cy5vcHRpb25WYWx1ZV0gPSBpdGVtLm9wdGlvbnNbb3B0aW9uSW5kZXhdW2l0ZW0uY29sdW1uS2V5cy5vcHRpb25WYWx1ZV07XG4gICAgICAgICAgICBhZGRPcHRpb25zW2l0ZW0uY29sdW1uS2V5cy5vcHRpb25UZXh0XSA9IGl0ZW0ub3B0aW9uc1tvcHRpb25JbmRleF1baXRlbS5jb2x1bW5LZXlzLm9wdGlvblRleHRdO1xuICAgICAgICAgICAgaXRlbS5zZWxlY3RlZC5wdXNoKGFkZE9wdGlvbnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB2YXIgbmV3U2VsZWN0ZWRBcnJheSA9IFtdO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbS5zZWxlY3RlZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGl0ZW0uc2VsZWN0ZWRbaV1bdGhpcy5jb25maWcuY29sdW1uS2V5cy5vcHRpb25WYWx1ZV0gPT0gaXRlbS5vcHRpb25zW29wdGlvbkluZGV4XVt0aGlzLmNvbmZpZy5jb2x1bW5LZXlzLm9wdGlvblZhbHVlXSkge1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgYWRkT3B0aW9ucyA9IHt9O1xuICAgICAgICAgICAgICBhZGRPcHRpb25zW2l0ZW0uY29sdW1uS2V5cy5vcHRpb25WYWx1ZV0gPSBpdGVtLnNlbGVjdGVkW2ldW2l0ZW0uY29sdW1uS2V5cy5vcHRpb25WYWx1ZV07XG4gICAgICAgICAgICAgIGFkZE9wdGlvbnNbaXRlbS5jb2x1bW5LZXlzLm9wdGlvblRleHRdID0gaXRlbS5zZWxlY3RlZFtpXVtpdGVtLmNvbHVtbktleXMub3B0aW9uVGV4dF07XG4gICAgICAgICAgICAgIG5ld1NlbGVjdGVkQXJyYXkucHVzaChhZGRPcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaXRlbS5zZWxlY3RlZCA9IG5ld1NlbGVjdGVkQXJyYXk7XG4gICAgICAgIH1cblxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIC8vIOyDiOuhnOyatCDqsJIg7LaU6rCAXG4gICAgICAgIHZhciBhcHBlbmRPayA9IHRydWU7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbS5zZWxlY3RlZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChpdGVtLnNlbGVjdGVkW2ldW3RoaXMuY29uZmlnLmNvbHVtbktleXMub3B0aW9uVmFsdWVdID09IHZhbHVlLnZhbHVlW3RoaXMuY29uZmlnLmNvbHVtbktleXMub3B0aW9uVmFsdWVdKSB7XG4gICAgICAgICAgICBhcHBlbmRPayA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFwcGVuZE9rKSB7XG4gICAgICAgICAgYWRkT3B0aW9ucyA9IHt9O1xuICAgICAgICAgIGFkZE9wdGlvbnNbaXRlbS5jb2x1bW5LZXlzLm9wdGlvblZhbHVlXSA9IHZhbHVlLnZhbHVlW3RoaXMuY29uZmlnLmNvbHVtbktleXMub3B0aW9uVmFsdWVdO1xuICAgICAgICAgIGFkZE9wdGlvbnNbaXRlbS5jb2x1bW5LZXlzLm9wdGlvblRleHRdID0gdmFsdWUudmFsdWVbdGhpcy5jb25maWcuY29sdW1uS2V5cy5vcHRpb25UZXh0XTtcbiAgICAgICAgICBpdGVtLnNlbGVjdGVkLnB1c2goYWRkT3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgICd0ZXh0JzogZnVuY3Rpb24gKHF1ZUlkeCwgdmFsdWUsIHNlbGVjdGVkLCBzZXRWYWx1ZVR5cGUpIHtcbiAgICAgIHZhciBpdGVtID0gdGhpcy5xdWV1ZVtxdWVJZHhdO1xuICAgICAgdmFyIGFkZE9wdGlvbnM7XG4gICAgICB2YXIgb3B0aW9uSW5kZXggPSBVLnNlYXJjaChpdGVtLm9wdGlvbnMsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbaXRlbS5jb2x1bW5LZXlzLm9wdGlvblRleHRdID09IHZhbHVlO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChvcHRpb25JbmRleCA+IC0xKSB7XG4gICAgICAgIGl0ZW0ub3B0aW9uc1tvcHRpb25JbmRleF1baXRlbS5jb2x1bW5LZXlzLm9wdGlvblNlbGVjdGVkXVxuICAgICAgICAgID0gZ2V0U2VsZWN0ZWQoaXRlbSwgaXRlbS5vcHRpb25zW29wdGlvbkluZGV4XVtpdGVtLmNvbHVtbktleXMub3B0aW9uU2VsZWN0ZWRdLCBzZWxlY3RlZCk7XG5cbiAgICAgICAgaWYgKGl0ZW0ub3B0aW9uc1tvcHRpb25JbmRleF1baXRlbS5jb2x1bW5LZXlzLm9wdGlvblNlbGVjdGVkXSkge1xuICAgICAgICAgIHZhciBhcHBlbmRPayA9IHRydWU7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtLnNlbGVjdGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaXRlbS5zZWxlY3RlZFtpXVt0aGlzLmNvbmZpZy5jb2x1bW5LZXlzLm9wdGlvblRleHRdID09IGl0ZW0ub3B0aW9uc1tvcHRpb25JbmRleF1bdGhpcy5jb25maWcuY29sdW1uS2V5cy5vcHRpb25UZXh0XSkge1xuICAgICAgICAgICAgICBhcHBlbmRPayA9IGZhbHNlO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGFwcGVuZE9rKSB7XG4gICAgICAgICAgICBhZGRPcHRpb25zID0ge307XG4gICAgICAgICAgICBhZGRPcHRpb25zW2l0ZW0uY29sdW1uS2V5cy5vcHRpb25WYWx1ZV0gPSBpdGVtLm9wdGlvbnNbb3B0aW9uSW5kZXhdW2l0ZW0uY29sdW1uS2V5cy5vcHRpb25WYWx1ZV07XG4gICAgICAgICAgICBhZGRPcHRpb25zW2l0ZW0uY29sdW1uS2V5cy5vcHRpb25UZXh0XSA9IGl0ZW0ub3B0aW9uc1tvcHRpb25JbmRleF1baXRlbS5jb2x1bW5LZXlzLm9wdGlvblRleHRdO1xuICAgICAgICAgICAgaXRlbS5zZWxlY3RlZC5wdXNoKGFkZE9wdGlvbnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB2YXIgbmV3U2VsZWN0ZWRBcnJheSA9IFtdO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbS5zZWxlY3RlZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGl0ZW0uc2VsZWN0ZWRbaV1bdGhpcy5jb25maWcuY29sdW1uS2V5cy5vcHRpb25UZXh0XSA9PSBpdGVtLm9wdGlvbnNbb3B0aW9uSW5kZXhdW3RoaXMuY29uZmlnLmNvbHVtbktleXMub3B0aW9uVGV4dF0pIHtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIGFkZE9wdGlvbnMgPSB7fTtcbiAgICAgICAgICAgICAgYWRkT3B0aW9uc1tpdGVtLmNvbHVtbktleXMub3B0aW9uVmFsdWVdID0gaXRlbS5zZWxlY3RlZFtpXVtpdGVtLmNvbHVtbktleXMub3B0aW9uVmFsdWVdO1xuICAgICAgICAgICAgICBhZGRPcHRpb25zW2l0ZW0uY29sdW1uS2V5cy5vcHRpb25UZXh0XSA9IGl0ZW0uc2VsZWN0ZWRbaV1baXRlbS5jb2x1bW5LZXlzLm9wdGlvblRleHRdO1xuICAgICAgICAgICAgICBuZXdTZWxlY3RlZEFycmF5LnB1c2goYWRkT3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGl0ZW0uc2VsZWN0ZWQgPSBuZXdTZWxlY3RlZEFycmF5O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgLy8g7IOI66Gc7Jq0IOqwkiDstpTqsIBcbiAgICAgICAgdmFyIGFwcGVuZE9rID0gdHJ1ZTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtLnNlbGVjdGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGl0ZW0uc2VsZWN0ZWRbaV1bdGhpcy5jb25maWcuY29sdW1uS2V5cy5vcHRpb25UZXh0XSA9PSB2YWx1ZSkge1xuICAgICAgICAgICAgYXBwZW5kT2sgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhcHBlbmRPaykge1xuICAgICAgICAgIGFkZE9wdGlvbnMgPSB7fTtcbiAgICAgICAgICBhZGRPcHRpb25zW2l0ZW0uY29sdW1uS2V5cy5vcHRpb25WYWx1ZV0gPSB2YWx1ZTtcbiAgICAgICAgICBhZGRPcHRpb25zW2l0ZW0uY29sdW1uS2V5cy5vcHRpb25UZXh0XSA9IHZhbHVlO1xuICAgICAgICAgIGl0ZW0uc2VsZWN0ZWQucHVzaChhZGRPcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgJ2NsZWFyJzogZnVuY3Rpb24gKHF1ZUlkeCkge1xuICAgICAgY2xlYXJTZWxlY3RlZC5jYWxsKHRoaXMsIHF1ZUlkeCk7XG4gICAgICBmb2N1c0NsZWFyLmNhbGwodGhpcywgcXVlSWR4KTtcblxuICAgICAgaWYgKHRoaXMuYWN0aXZlYXV0b2NvbXBsZXRlT3B0aW9uR3JvdXApIHtcbiAgICAgICAgdGhpcy5hY3RpdmVhdXRvY29tcGxldGVPcHRpb25Hcm91cFxuICAgICAgICAgIC5maW5kKCdbZGF0YS1vcHRpb24taW5kZXhdJylcbiAgICAgICAgICAuYXR0cihcImRhdGEtb3B0aW9uLVNlbGVjdGVkXCIsIFwiZmFsc2VcIik7XG4gICAgICB9XG4gICAgICB0aGlzLnF1ZXVlW3F1ZUlkeF0ub3B0aW9uU2VsZWN0ZWRJbmRleCA9IC0xO1xuICAgIH1cbiAgfTtcblxuICBsZXQgcXVlSWR4ID0gKFUuaXNOdW1iZXIoYm91bmRJRCkpID8gYm91bmRJRCA6IGdldFF1ZUlkeC5jYWxsKHRoaXMsIGJvdW5kSUQpO1xuICBpZiAocXVlSWR4ID09PSAtMSkge1xuICAgIGNvbnNvbGUubG9nKGluZm8uZ2V0RXJyb3IoXCJheDZ1aS1hdXRvY29tcGxldGVcIiwgXCI0MDJcIiwgXCJ2YWxcIikpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHRocm93IFwiZXJyb3Igbm90IGZvdW5kIHZhbHVlXCI7XG4gIH1cbiAgZWxzZSBpZiAoVS5pc0FycmF5KHZhbHVlKSkge1xuICAgIHByb2Nlc3Nvci5jbGVhci5jYWxsKHRoaXMsIHF1ZUlkeCk7XG4gICAgcHJvY2Vzc29yLmFyci5jYWxsKHRoaXMsIHF1ZUlkeCwgKHRoaXMucXVldWVbcXVlSWR4XS5tdWx0aXBsZSB8fCB2YWx1ZS5sZW5ndGggPT0gMCkgPyB2YWx1ZSA6IFt2YWx1ZVt2YWx1ZS5sZW5ndGggLSAxXV0sIHNlbGVjdGVkKTtcbiAgfVxuICBlbHNlIGlmIChVLmlzU3RyaW5nKHZhbHVlKSB8fCBVLmlzTnVtYmVyKHZhbHVlKSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwidW5kZWZpbmVkXCIgJiYgdmFsdWUgIT09IG51bGwgJiYgIXRoaXMucXVldWVbcXVlSWR4XS5tdWx0aXBsZSkge1xuICAgICAgY2xlYXJTZWxlY3RlZC5jYWxsKHRoaXMsIHF1ZUlkeCk7XG4gICAgfVxuICAgIHByb2Nlc3Nvci50ZXh0LmNhbGwodGhpcywgcXVlSWR4LCB2YWx1ZSwgc2VsZWN0ZWQpO1xuICB9XG4gIGVsc2Uge1xuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgcHJvY2Vzc29yLmNsZWFyLmNhbGwodGhpcywgcXVlSWR4KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpZiAoIXRoaXMucXVldWVbcXVlSWR4XS5tdWx0aXBsZSkge1xuICAgICAgICBjbGVhclNlbGVjdGVkLmNhbGwodGhpcywgcXVlSWR4KTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGtleSBpbiBwcm9jZXNzb3IpIHtcbiAgICAgICAgaWYgKHZhbHVlW2tleV0pIHtcbiAgICAgICAgICBwcm9jZXNzb3Jba2V5XS5jYWxsKHRoaXMsIHF1ZUlkeCwgdmFsdWUsIHNlbGVjdGVkKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN5bmNMYWJlbC5jYWxsKHRoaXMsIHF1ZUlkeCk7XG4gIHByaW50TGFiZWwuY2FsbCh0aGlzLCBxdWVJZHgpO1xuICBmb2N1c0xhYmVsLmNhbGwodGhpcywgcXVlSWR4KTtcbiAgYWxpZ25BdXRvY29tcGxldGVPcHRpb25Hcm91cC5jYWxsKHRoaXMpO1xuXG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBpZiAoX29wdGlvbiAmJiAhX29wdGlvbi5ub1N0YXRlQ2hhbmdlKSB7XG4gICAgICBvblN0YXRlQ2hhbmdlZC5jYWxsKHRoaXMsIHRoaXMucXVldWVbcXVlSWR4XSwge1xuICAgICAgICBzZWxmOiB0aGlzLFxuICAgICAgICBpdGVtOiB0aGlzLnF1ZXVlW3F1ZUlkeF0sXG4gICAgICAgIHN0YXRlOiBcImNoYW5nZVZhbHVlXCIsXG4gICAgICAgIHZhbHVlOiB0aGlzLnF1ZXVlW3F1ZUlkeF0uc2VsZWN0ZWRcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGJvdW5kSUQgPSBudWxsO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qIH5+fn5+fn5+fn5+fn5+fn5+fiBlbmQgb2YgcHJpdmF0ZSAgfn5+fn5+fn5+fn5+fn5+fn5+fn4gKi9cblxuLyoqXG4gKiBAY2xhc3NcbiAqL1xuY2xhc3MgQVg2VUlBdXRvY29tcGxldGUgZXh0ZW5kcyBBWDZVSUNvcmUge1xuICAvKipcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBjb25maWdcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgIHN1cGVyKCk7XG5cbiAgICAvKipcbiAgICAgKiBAbWVtYmVyIHtKU09OfVxuICAgICAqIEBwYXJhbSBjb25maWdcbiAgICAgKiBAcGFyYW0gW2NvbmZpZy50aGVtZT0nZGVmYXVsdCddXG4gICAgICogQHBhcmFtIFtjb25maWcuYW5pbWF0ZVRpbWU9MjUwXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmhlaWdodD0zNF1cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5sYW5nXSAtIOuplOyEuOyngOuTpFxuICAgICAqIEBwYXJhbSBbY29uZmlnLmxhbmcubm9TZWxlY3RlZD0nJ11cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5sYW5nLm5vT3B0aW9ucz0nbm8gb3B0aW9ucyddXG4gICAgICogQHBhcmFtIFtjb25maWcubGFuZy5sb2FkaW5nPSdub3cgbG9hZGluZy4uJ11cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5jb2x1bW5LZXlzXSAtIOuCtOu2gOyXkOyEnCDsgqzsmqkgSlNPTiBrZXkg7KCV7J2YXG4gICAgICogQHBhcmFtIFtjb25maWcuY29sdW1uS2V5cy5vcHRpb25WYWx1ZT0ndmFsdWUnXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmNvbHVtbktleXMub3B0aW9uVGV4dD0ndGV4dCddXG4gICAgICogQHBhcmFtIFtjb25maWcuY29sdW1uS2V5cy5vcHRpb25TZWxlY3RlZD0nc2VsZWN0ZWQnXVxuICAgICAqL1xuICAgIHRoaXMuY29uZmlnID0ge1xuICAgICAgdGhlbWU6ICdkZWZhdWx0JyxcbiAgICAgIGFuaW1hdGVUaW1lOiAyNTAsXG4gICAgICBoZWlnaHQ6IDM0LFxuICAgICAgb3B0aW9uSXRlbUhlaWdodDogMjQsXG4gICAgICBib3JkZXJXaWR0aDogMSxcbiAgICAgIHJlbW92ZUljb246ICdVKzAwZDcnLFxuICAgICAgbGFuZzoge1xuICAgICAgICBub1NlbGVjdGVkOiAnJyxcbiAgICAgICAgbm9PcHRpb25zOiAnbm8gb3B0aW9ucycsXG4gICAgICAgIGxvYWRpbmc6ICdOb3cgUHJvY2Vzc2luZydcbiAgICAgIH0sXG4gICAgICBjb2x1bW5LZXlzOiB7XG4gICAgICAgIG9wdGlvblZhbHVlOiAndmFsdWUnLFxuICAgICAgICBvcHRpb25UZXh0OiAndGV4dCcsXG4gICAgICAgIG9wdGlvblNlbGVjdGVkOiAnc2VsZWN0ZWQnXG4gICAgICB9XG4gICAgfTtcbiAgICBqUXVlcnkuZXh0ZW5kKHRydWUsIHRoaXMuY29uZmlnLCBjb25maWcpO1xuXG4gICAgLy8g66mk67KEIOuzgOyImCDstIjquLDtmZRcbiAgICAvKipcbiAgICAgKiBiaW5k66W8IO2Gte2VtCDsl7DqsrDrkJwgc2VsZWN06rCAIOyggOyepeuQmOuKlCDrs4DsiJhcbiAgICAgKiBAbWVtYmVyIHtBcnJheX1cbiAgICAgKi9cbiAgICB0aGlzLnF1ZXVlID0gW107XG4gICAgLyoqXG4gICAgICogQG1lbWJlciB7T2JqZWN0fVxuICAgICAqL1xuICAgIHRoaXMuYWN0aXZlYXV0b2NvbXBsZXRlT3B0aW9uR3JvdXAgPSBudWxsO1xuICAgIC8qKlxuICAgICAqIEBtZW1iZXIge051bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLmFjdGl2ZWF1dG9jb21wbGV0ZVF1ZXVlSW5kZXggPSAtMTtcbiAgICAvKipcbiAgICAgKiBAbWVtYmVyIHtPYmplY3R9XG4gICAgICovXG4gICAgdGhpcy5vcGVuVGltZXIgPSBudWxsO1xuICAgIC8qKlxuICAgICAqIEBtZW1iZXIge09iamVjdH1cbiAgICAgKi9cbiAgICB0aGlzLmNsb3NlVGltZXIgPSBudWxsO1xuICAgIC8qKlxuICAgICAqIEBtZW1iZXIge0Z1bmN0aW9ufVxuICAgICAqL1xuICAgIHRoaXMud2FpdE9wdGlvbnNDYWxsYmFjayA9IG51bGw7XG4gICAgLyoqXG4gICAgICogQG1lbWJlciB7T2JqZWN0fVxuICAgICAqL1xuICAgIHRoaXMua2V5VXBUaW1lciA9IG51bGw7XG4gICAgLyoqXG4gICAgICogQG1lbWJlciB7T2JqZWN0fVxuICAgICAqL1xuICAgIHRoaXMueHZhciA9IHt9O1xuXG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAcGFyYW0gY29uZmlnXG4gICAqL1xuICBpbml0KCkge1xuICAgIHRoaXMub25TdGF0ZUNoYW5nZWQgPSB0aGlzLmNvbmZpZy5vblN0YXRlQ2hhbmdlZDtcbiAgICBkZWxldGUgdGhpcy5jb25maWcub25TdGF0ZUNoYW5nZWQ7XG4gICAgdGhpcy5vbkNoYW5nZSA9IHRoaXMuY29uZmlnLm9uQ2hhbmdlO1xuICAgIGRlbGV0ZSB0aGlzLmNvbmZpZy5vbkNoYW5nZTtcblxuICAgIC8vIGluaXQg7Zi47LacIOyXrOu2gFxuICAgIHRoaXMuaW5pdE9uY2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqL1xuICBpbml0T25jZSgpIHtcbiAgICBpZiAodGhpcy5pbml0aWFsaXplZCkgcmV0dXJuIHRoaXM7XG4gICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG5cbiAgICAvLyB0aHJvdHRsZWRSZXNpemVcbiAgICAkKHdpbmRvdykub24oXCJyZXNpemUuYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXktXCIgKyB0aGlzLmluc3RhbmNlSWQsIFUudGhyb3R0bGUoZnVuY3Rpb24gKGUpIHtcbiAgICAgIGFsaWduQXV0b2NvbXBsZXRlRGlzcGxheS5jYWxsKHRoaXMsIGUgfHwgd2luZG93LmV2ZW50KTtcbiAgICAgIGFsaWduQXV0b2NvbXBsZXRlT3B0aW9uR3JvdXAuY2FsbCh0aGlzKTtcbiAgICB9LCAxMDApLmJpbmQodGhpcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIGJpbmQgYXV0b2NvbXBsZXRlXG4gICAqIEBtZXRob2RcbiAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW1cbiAgICogQHBhcmFtIHtTdHJpbmd9IFtpdGVtLmlkXVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2l0ZW0udGhlbWVdXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2l0ZW0ubXVsdGlwbGVdXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gaXRlbS50YXJnZXRcbiAgICogQHJldHVybiB7QVg2VUlBdXRvY29tcGxldGV9XG4gICAqL1xuICBiaW5kKGl0ZW0pIHtcbiAgICBsZXQgcXVlSWR4O1xuICAgIGl0ZW0gPSBqUXVlcnkuZXh0ZW5kKHRydWUsIHt9LCB0aGlzLmNvbmZpZywgaXRlbSk7XG5cbiAgICBpZiAoIWl0ZW0udGFyZ2V0KSB7XG4gICAgICBjb25zb2xlLmxvZyhpbmZvLmdldEVycm9yKFwiYXg2dWktYXV0b2NvbXBsZXRlXCIsIFwiNDAxXCIsIFwiYmluZFwiKSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgaXRlbS4kdGFyZ2V0ID0galF1ZXJ5KGl0ZW0udGFyZ2V0KTtcblxuICAgIGlmICghaXRlbS5pZCkgaXRlbS5pZCA9IGl0ZW0uJHRhcmdldC5kYXRhKFwiZGF0YS1heDZ1aS1hdXRvY29tcGxldGUtaWRcIik7XG4gICAgaWYgKCFpdGVtLmlkKSB7XG4gICAgICBpdGVtLmlkID0gJ2F4NnVpLWF1dG9jb21wbGV0ZS0nICsgQVg2VUlDb3JlLmdldEluc3RhbmNlSWQoKTtcbiAgICAgIGl0ZW0uJHRhcmdldC5kYXRhKFwiZGF0YS1heDZ1aS1hdXRvY29tcGxldGUtaWRcIiwgaXRlbS5pZCk7XG4gICAgfVxuICAgIGl0ZW0ubmFtZSA9IGl0ZW0uJHRhcmdldC5hdHRyKFwiZGF0YS1heDZ1aS1hdXRvY29tcGxldGVcIik7XG5cbiAgICBpdGVtLm9wdGlvbnMgPSBbXTtcbiAgICBpdGVtLnNlbGVjdGVkID0gW107XG5cbiAgICAvLyB0YXJnZXQgYXR0cmlidXRlIGRhdGFcbiAgICAoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIGlmIChVLmlzT2JqZWN0KGRhdGEpICYmICFkYXRhLmVycm9yKSB7XG4gICAgICAgIGl0ZW0gPSBqUXVlcnkuZXh0ZW5kKHRydWUsIGl0ZW0sIGRhdGEpO1xuICAgICAgfVxuICAgIH0pKFUucGFyc2VKc29uKGl0ZW0uJHRhcmdldC5hdHRyKFwiZGF0YS1heDZ1aS1hdXRvY29tcGxldGUtY29uZmlnXCIpLCB0cnVlKSk7XG5cbiAgICBxdWVJZHggPSBVLnNlYXJjaCh0aGlzLnF1ZXVlLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5pZCA9PSBpdGVtLmlkO1xuICAgIH0pO1xuXG4gICAgaWYgKHF1ZUlkeCA9PT0gLTEpIHtcbiAgICAgIHRoaXMucXVldWUucHVzaChpdGVtKTtcbiAgICAgIGJpbmRBdXRvY29tcGxldGVUYXJnZXQuY2FsbCh0aGlzLCB0aGlzLnF1ZXVlLmxlbmd0aCAtIDEpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMucXVldWVbcXVlSWR4XS5zZWxlY3RlZCA9IFtdO1xuICAgICAgdGhpcy5xdWV1ZVtxdWVJZHhdLm9wdGlvbnMgPSBpdGVtLm9wdGlvbnM7XG4gICAgICB0aGlzLnF1ZXVlW3F1ZUlkeF0gPSBqUXVlcnkuZXh0ZW5kKHRydWUsIHt9LCB0aGlzLnF1ZXVlW3F1ZUlkeF0sIGl0ZW0pO1xuICAgICAgYmluZEF1dG9jb21wbGV0ZVRhcmdldC5jYWxsKHRoaXMsIHF1ZUlkeCk7XG4gICAgfVxuXG4gICAgcXVlSWR4ID0gbnVsbDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBvcGVuIHRoZSBvcHRpb25Cb3ggb2YgYXV0b2NvbXBsZXRlXG4gICAqIEBtZXRob2RcbiAgICogQHBhcmFtIHsoU3RyaW5nfE51bWJlcnxFbGVtZW50KX0gYm91bmRJRFxuICAgKiBAcGFyYW0ge051bWJlcn0gW3RyeUNvdW50XVxuICAgKiBAcmV0dXJuIHtBWDZVSUF1dG9jb21wbGV0ZX1cbiAgICovXG4gIG9wZW4oYm91bmRJRCwgdHJ5Q291bnQpIHtcbiAgICB0aGlzLndhaXRPcHRpb25zQ2FsbGJhY2sgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogb3BlbiBhdXRvY29tcGxldGUgZnJvbSB0aGUgb3V0c2lkZVxuICAgICAqL1xuICAgIGxldCBxdWVJZHggPSAoVS5pc051bWJlcihib3VuZElEKSkgPyBib3VuZElEIDogZ2V0UXVlSWR4LmNhbGwodGhpcywgYm91bmRJRCksXG4gICAgICBpdGVtID0gdGhpcy5xdWV1ZVtxdWVJZHhdLFxuICAgICAgZGF0YSA9IHt9LFxuICAgICAgZm9jdXNUb3AsXG4gICAgICBzZWxlY3RlZE9wdGlvbkVsO1xuXG4gICAgaWYgKGl0ZW0uJGRpc3BsYXkuYXR0cihcImRpc2FibGVkXCIpKSByZXR1cm4gdGhpcztcblxuICAgIGlmICh0aGlzLm9wZW5UaW1lcikgY2xlYXJUaW1lb3V0KHRoaXMub3BlblRpbWVyKTtcbiAgICBpZiAodGhpcy5hY3RpdmVhdXRvY29tcGxldGVPcHRpb25Hcm91cCkge1xuICAgICAgaWYgKHRoaXMuYWN0aXZlYXV0b2NvbXBsZXRlUXVldWVJbmRleCA9PSBxdWVJZHgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGlmICh0cnlDb3VudCA+IDIpIHJldHVybiB0aGlzO1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgdGhpcy5vcGVuVGltZXIgPSBzZXRUaW1lb3V0KChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMub3BlbihxdWVJZHgsICh0cnlDb3VudCB8fCAwKSArIDEpO1xuICAgICAgfSkuYmluZCh0aGlzKSwgdGhpcy5jb25maWcuYW5pbWF0ZVRpbWUpO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpdGVtLm9wdGlvbkZvY3VzSW5kZXggPSAtMTsgLy8gb3B0aW9uR3JvdXDsnbQg7Je066as66m0IO2PrOy7pOyKpCDsnbjrjbHsiqQg7LSI6riw7ZmUIC0x66GcXG4gICAgaWYgKGl0ZW0uc2VsZWN0ZWQgJiYgaXRlbS5zZWxlY3RlZC5sZW5ndGggPiAwKSB7XG4gICAgICBpdGVtLm9wdGlvblNlbGVjdGVkSW5kZXggPSBpdGVtLnNlbGVjdGVkWzBdW1wiQGZpbmRleFwiXTtcbiAgICB9XG5cbiAgICAvLy8g7YWc7ZSM66a/7JeQIOyghOuLrO2VoCDsmKTruIzsoJ3tirgg7ISg7Ja4XG4gICAgZGF0YS5pZCA9IGl0ZW0uaWQ7XG4gICAgZGF0YS50aGVtZSA9IGl0ZW0udGhlbWU7XG4gICAgZGF0YS5tdWx0aXBsZSA9IGl0ZW0ubXVsdGlwbGU7XG5cbiAgICBkYXRhLmxhbmcgPSBpdGVtLmxhbmc7XG4gICAgaXRlbS4kZGlzcGxheS5hdHRyKFwiZGF0YS1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwLW9wZW5lZFwiLCBcInRydWVcIik7XG5cbiAgICBkYXRhLndhaXRPcHRpb25zID0gdHJ1ZTsgLy8g7YOA7J207ZWR6rCS7Jy866GcIG9wdGlvbnPsnYQg6rWs7ZW07JW8IO2VmOuvgOuhnCDrjIDquLBcbiAgICBkYXRhLm9wdGlvbnMgPSBbXTtcblxuICAgIHRoaXMuYWN0aXZlYXV0b2NvbXBsZXRlT3B0aW9uR3JvdXAgPSBqUXVlcnkobXVzdGFjaGUucmVuZGVyKHRtcGwub3B0aW9uR3JvdXAuY2FsbCh0aGlzLCBpdGVtLmNvbHVtbktleXMpLCBkYXRhKSk7XG4gICAgdGhpcy5hY3RpdmVhdXRvY29tcGxldGVPcHRpb25Hcm91cC5maW5kKCdbZGF0YS1lbHM9XCJjb250ZW50XCJdJykuaHRtbChtdXN0YWNoZS5yZW5kZXIodG1wbC5vcHRpb25zLmNhbGwodGhpcywgaXRlbS5jb2x1bW5LZXlzKSwgZGF0YSkpO1xuICAgIHRoaXMuYWN0aXZlYXV0b2NvbXBsZXRlUXVldWVJbmRleCA9IHF1ZUlkeDtcblxuICAgIGFsaWduQXV0b2NvbXBsZXRlT3B0aW9uR3JvdXAuY2FsbCh0aGlzLCBcImFwcGVuZFwiKTsgLy8gYWxpZ25BdXRvY29tcGxldGVPcHRpb25Hcm91cCDsl5DshJwgYm9keSBhcHBlbmRcblxuICAgIGlmIChpdGVtLnNlbGVjdGVkICYmIGl0ZW0uc2VsZWN0ZWQubGVuZ3RoID4gMCkge1xuICAgICAgc2VsZWN0ZWRPcHRpb25FbCA9IHRoaXMuYWN0aXZlYXV0b2NvbXBsZXRlT3B0aW9uR3JvdXAuZmluZCgnW2RhdGEtb3B0aW9uLWluZGV4PVwiJyArIGl0ZW0uc2VsZWN0ZWRbMF1bXCJAaW5kZXhcIl0gKyAnXCJdJyk7XG4gICAgICBpZiAoc2VsZWN0ZWRPcHRpb25FbC5nZXQoMCkpIHtcbiAgICAgICAgZm9jdXNUb3AgPSBzZWxlY3RlZE9wdGlvbkVsLnBvc2l0aW9uKCkudG9wIC0gdGhpcy5hY3RpdmVhdXRvY29tcGxldGVPcHRpb25Hcm91cC5oZWlnaHQoKSAvIDM7XG4gICAgICAgIHRoaXMuYWN0aXZlYXV0b2NvbXBsZXRlT3B0aW9uR3JvdXAuZmluZCgnW2RhdGEtZWxzPVwiY29udGVudFwiXScpLnNjcm9sbFRvcChmb2N1c1RvcCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgalF1ZXJ5KHdpbmRvdykub24oXCJjbGljay5heDZ1aS1hdXRvY29tcGxldGUtXCIgKyB0aGlzLmluc3RhbmNlSWQsIChmdW5jdGlvbiAoZSkge1xuICAgICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xuICAgICAgb25Cb2R5Q2xpY2suY2FsbCh0aGlzLCBlKTtcbiAgICAgIFUuc3RvcEV2ZW50KGUpO1xuICAgIH0pLmJpbmQodGhpcykpO1xuXG4gICAgb25TdGF0ZUNoYW5nZWQuY2FsbCh0aGlzLCBpdGVtLCB7XG4gICAgICBzZWxmOiB0aGlzLFxuICAgICAgc3RhdGU6IFwib3BlblwiLFxuICAgICAgaXRlbTogaXRlbVxuICAgIH0pO1xuXG4gICAgZGF0YSA9IG51bGw7XG4gICAgZm9jdXNUb3AgPSBudWxsO1xuICAgIHNlbGVjdGVkT3B0aW9uRWwgPSBudWxsO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQHBhcmFtIHsoalF1ZXJ5T2JqZWN0fEVsZW1lbnR8TnVtYmVyKX0gX2JvdW5kSURcbiAgICogQHBhcmFtIHsoU3RyaW5nfEFycmF5KX0gX3ZhbHVlXG4gICAqIEByZXR1cm4ge0FYNlVJQXV0b2NvbXBsZXRlfVxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBqc1xuICAgKiBteUF1dG9jb21wbGV0ZS5zZXRWYWx1ZSgkKCdbZGF0YS1heDZ1aS1hdXRvY29tcGxldGU9XCJhdXRvY29tcGxldGUxXCJdJyksIHt2YWx1ZTpcInRlc3RcIiwgdGV4dDpcInRlc3RcIn0pO1xuICAgKiBteUF1dG9jb21wbGV0ZS5zZXRWYWx1ZSgkKCdbZGF0YS1heDZ1aS1hdXRvY29tcGxldGU9XCJhdXRvY29tcGxldGUxXCJdJyksIFt7dmFsdWU6XCJ0ZXN0MVwiLCB0ZXh0OlwidGVzdDFcIn0sIHt2YWx1ZTpcInRlc3QyXCIsIHRleHQ6XCJ0ZXN0MlwifV0pO1xuICAgKiBteUF1dG9jb21wbGV0ZS5zZXRWYWx1ZSgkKCdbZGF0YS1heDZ1aS1hdXRvY29tcGxldGU9XCJhdXRvY29tcGxldGUxXCJdJyksIG51bGwpO1xuICAgKiBgYGBcbiAgICovXG4gIHNldFZhbHVlKF9ib3VuZElELCBfdmFsdWUpIHtcbiAgICBsZXQgcXVlSWR4ID0gKFUuaXNOdW1iZXIoX2JvdW5kSUQpKSA/IF9ib3VuZElEIDogZ2V0UXVlSWR4LmNhbGwodGhpcywgX2JvdW5kSUQpO1xuICAgIGlmIChxdWVJZHggPT09IC0xKSB7XG4gICAgICBjb25zb2xlLmxvZyhpbmZvLmdldEVycm9yKFwiYXg2dWktYXV0b2NvbXBsZXRlXCIsIFwiNDAyXCIsIFwidmFsXCIpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjbGVhclNlbGVjdGVkLmNhbGwodGhpcywgcXVlSWR4KTtcblxuICAgIGlmIChVLmlzQXJyYXkoX3ZhbHVlKSkge1xuICAgICAgbGV0IF92YWx1ZXMgPSBVLm1hcChfdmFsdWUsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHt2YWx1ZTogdGhpc307XG4gICAgICB9KTtcbiAgICAgIHNldFNlbGVjdGVkLmNhbGwodGhpcywgcXVlSWR4LCBfdmFsdWVzLCB0cnVlLCB7bm9TdGF0ZUNoYW5nZTogdHJ1ZX0pO1xuICAgIH1cbiAgICBlbHNlIGlmIChVLmlzT2JqZWN0KF92YWx1ZSkpIHtcbiAgICAgIHNldFNlbGVjdGVkLmNhbGwodGhpcywgcXVlSWR4LCB7dmFsdWU6IF92YWx1ZX0sIHRydWUsIHtub1N0YXRlQ2hhbmdlOiB0cnVlfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByaW50TGFiZWwuY2FsbCh0aGlzLCBxdWVJZHgpO1xuICAgIH1cblxuICAgIGJsdXJMYWJlbC5jYWxsKHRoaXMsIHF1ZUlkeCk7XG4gICAgYWxpZ25BdXRvY29tcGxldGVEaXNwbGF5LmNhbGwodGhpcyk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBwYXJhbSB7KGpRdWVyeU9iamVjdHxFbGVtZW50fE51bWJlcil9IF9ib3VuZElEXG4gICAqIEBwYXJhbSB7KFN0cmluZ3xBcnJheSl9IF90ZXh0XG4gICAqIEByZXR1cm4ge0FYNlVJQXV0b2NvbXBsZXRlfVxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBqc1xuICAgKiBteUF1dG9jb21wbGV0ZS5zZXRUZXh0KCQoJ1tkYXRhLWF4NnVpLWF1dG9jb21wbGV0ZT1cImF1dG9jb21wbGV0ZTFcIl0nKSwgXCJzdHJpbmdcIik7XG4gICAqIG15QXV0b2NvbXBsZXRlLnNldFRleHQoJCgnW2RhdGEtYXg2dWktYXV0b2NvbXBsZXRlPVwiYXV0b2NvbXBsZXRlMVwiXScpLCBbXCJzdWJzdHJpbmdcIiwgXCJzZWFyY2hcIl0pO1xuICAgKiBgYGBcbiAgICovXG4gIHNldFRleHQoX2JvdW5kSUQsIF90ZXh0KSB7XG4gICAgbGV0IHF1ZUlkeCA9IChVLmlzTnVtYmVyKF9ib3VuZElEKSkgPyBfYm91bmRJRCA6IGdldFF1ZUlkeC5jYWxsKHRoaXMsIF9ib3VuZElEKTtcbiAgICBpZiAocXVlSWR4ID09PSAtMSkge1xuICAgICAgY29uc29sZS5sb2coaW5mby5nZXRFcnJvcihcImF4NnVpLWF1dG9jb21wbGV0ZVwiLCBcIjQwMlwiLCBcInZhbFwiKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5xdWV1ZVtxdWVJZHhdLnNlbGVjdGVkID0gW107XG4gICAgY2xlYXJTZWxlY3RlZC5jYWxsKHRoaXMsIHF1ZUlkeCk7XG4gICAgc2V0U2VsZWN0ZWQuY2FsbCh0aGlzLCBxdWVJZHgsIF90ZXh0LCB0cnVlLCB7bm9TdGF0ZUNoYW5nZTogdHJ1ZX0pO1xuICAgIGJsdXJMYWJlbC5jYWxsKHRoaXMsIHF1ZUlkeCk7XG4gICAgYWxpZ25BdXRvY29tcGxldGVEaXNwbGF5LmNhbGwodGhpcyk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBwYXJhbSB7KGpRdWVyeU9iamVjdHxFbGVtZW50fE51bWJlcil9IF9ib3VuZElEXG4gICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICovXG4gIGdldFNlbGVjdGVkT3B0aW9uKF9ib3VuZElEKSB7XG4gICAgbGV0IHF1ZUlkeCA9IChVLmlzTnVtYmVyKF9ib3VuZElEKSkgPyBfYm91bmRJRCA6IGdldFF1ZUlkeC5jYWxsKHRoaXMsIF9ib3VuZElEKTtcbiAgICBpZiAocXVlSWR4ID09PSAtMSkge1xuICAgICAgY29uc29sZS5sb2coaW5mby5nZXRFcnJvcihcImF4NnVpLWF1dG9jb21wbGV0ZVwiLCBcIjQwMlwiLCBcInZhbFwiKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiBVLmRlZXBDb3B5KHRoaXMucXVldWVbcXVlSWR4XS5zZWxlY3RlZCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAcmV0dXJuIHtBWDZVSUF1dG9jb21wbGV0ZX1cbiAgICovXG4gIGNsb3NlKGl0ZW0pIHtcbiAgICBpZiAodGhpcy5jbG9zZVRpbWVyKSBjbGVhclRpbWVvdXQodGhpcy5jbG9zZVRpbWVyKTtcbiAgICBpZiAoIXRoaXMuYWN0aXZlYXV0b2NvbXBsZXRlT3B0aW9uR3JvdXApIHJldHVybiB0aGlzO1xuXG4gICAgaXRlbSA9IHRoaXMucXVldWVbdGhpcy5hY3RpdmVhdXRvY29tcGxldGVRdWV1ZUluZGV4XTtcbiAgICBpdGVtLm9wdGlvbkZvY3VzSW5kZXggPSAtMTtcbiAgICBpdGVtLiRkaXNwbGF5LnJlbW92ZUF0dHIoXCJkYXRhLWF1dG9jb21wbGV0ZS1vcHRpb24tZ3JvdXAtb3BlbmVkXCIpLnRyaWdnZXIoXCJmb2N1c1wiKTtcblxuICAgIHRoaXMuYWN0aXZlYXV0b2NvbXBsZXRlT3B0aW9uR3JvdXAuYWRkQ2xhc3MoXCJkZXN0cm95XCIpO1xuXG4gICAgalF1ZXJ5KHdpbmRvdylcbiAgICAgIC5vZmYoXCJyZXNpemUuYXg2dWktYXV0b2NvbXBsZXRlLVwiICsgdGhpcy5pbnN0YW5jZUlkKVxuICAgICAgLm9mZihcImNsaWNrLmF4NnVpLWF1dG9jb21wbGV0ZS1cIiArIHRoaXMuaW5zdGFuY2VJZClcbiAgICAgIC5vZmYoXCJrZXl1cC5heDZ1aS1hdXRvY29tcGxldGUtXCIgKyB0aGlzLmluc3RhbmNlSWQpO1xuXG4gICAgdGhpcy5jbG9zZVRpbWVyID0gc2V0VGltZW91dCgoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHRoaXMuYWN0aXZlYXV0b2NvbXBsZXRlT3B0aW9uR3JvdXApIHRoaXMuYWN0aXZlYXV0b2NvbXBsZXRlT3B0aW9uR3JvdXAucmVtb3ZlKCk7XG4gICAgICB0aGlzLmFjdGl2ZWF1dG9jb21wbGV0ZU9wdGlvbkdyb3VwID0gbnVsbDtcbiAgICAgIHRoaXMuYWN0aXZlYXV0b2NvbXBsZXRlUXVldWVJbmRleCA9IC0xO1xuXG4gICAgICBvblN0YXRlQ2hhbmdlZC5jYWxsKHRoaXMsIGl0ZW0sIHtcbiAgICAgICAgc2VsZjogdGhpcyxcbiAgICAgICAgc3RhdGU6IFwiY2xvc2VcIlxuICAgICAgfSk7XG5cbiAgICB9KS5iaW5kKHRoaXMpLCB0aGlzLmNvbmZpZy5hbmltYXRlVGltZSk7XG4gICAgdGhpcy53YWl0T3B0aW9uc0NhbGxiYWNrID0gbnVsbDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBwYXJhbSB7KGpRdWVyeU9iamVjdHxFbGVtZW50fE51bWJlcil9IF9ib3VuZElEXG4gICAqIEByZXR1cm4ge0FYNlVJQXV0b2NvbXBsZXRlfVxuICAgKi9cbiAgYmx1cihfYm91bmRJRCkge1xuICAgIGxldCBxdWVJZHggPSAoVS5pc051bWJlcihfYm91bmRJRCkpID8gX2JvdW5kSUQgOiBnZXRRdWVJZHguY2FsbCh0aGlzLCBfYm91bmRJRCk7XG4gICAgaWYgKHF1ZUlkeCA9PT0gLTEpIHtcbiAgICAgIGNvbnNvbGUubG9nKGluZm8uZ2V0RXJyb3IoXCJheDZ1aS1hdXRvY29tcGxldGVcIiwgXCI0MDJcIiwgXCJ2YWxcIikpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGJsdXJMYWJlbC5jYWxsKHRoaXMsIHF1ZUlkeCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAcGFyYW0geyhqUXVlcnlPYmplY3R8RWxlbWVudHxOdW1iZXIpfSBfYm91bmRJRFxuICAgKiBAcmV0dXJuIHtBWDZVSUF1dG9jb21wbGV0ZX1cbiAgICovXG4gIGVuYWJsZShfYm91bmRJRCkge1xuICAgIGxldCBxdWVJZHggPSBnZXRRdWVJZHguY2FsbCh0aGlzLCBfYm91bmRJRCk7XG5cbiAgICBpZiAodHlwZW9mIHF1ZUlkeCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGhpcy5xdWV1ZVtxdWVJZHhdLmRpc2FibGUgPSBmYWxzZTtcbiAgICAgIGlmICh0aGlzLnF1ZXVlW3F1ZUlkeF0uJGRpc3BsYXlbMF0pIHtcbiAgICAgICAgdGhpcy5xdWV1ZVtxdWVJZHhdLiRkaXNwbGF5LnJlbW92ZUF0dHIoXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgdGhpcy5xdWV1ZVtxdWVJZHhdLiRkaXNwbGF5TGFiZWxJbnB1dC5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIik7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5xdWV1ZVtxdWVJZHhdLiRzZWxlY3RbMF0pIHtcbiAgICAgICAgdGhpcy5xdWV1ZVtxdWVJZHhdLiRzZWxlY3QucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpO1xuXG4gICAgICB9XG5cbiAgICAgIG9uU3RhdGVDaGFuZ2VkLmNhbGwodGhpcywgdGhpcy5xdWV1ZVtxdWVJZHhdLCB7XG4gICAgICAgIHNlbGY6IHRoaXMsXG4gICAgICAgIHN0YXRlOiBcImVuYWJsZVwiXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBwYXJhbSB7KGpRdWVyeU9iamVjdHxFbGVtZW50fE51bWJlcil9IF9ib3VuZElEXG4gICAqIEByZXR1cm4ge0FYNlVJQXV0b2NvbXBsZXRlfVxuICAgKi9cbiAgZGlzYWJsZShfYm91bmRJRCkge1xuICAgIGxldCBxdWVJZHggPSBnZXRRdWVJZHguY2FsbCh0aGlzLCBfYm91bmRJRCk7XG5cbiAgICBpZiAodHlwZW9mIHF1ZUlkeCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGhpcy5xdWV1ZVtxdWVJZHhdLmRpc2FibGUgPSB0cnVlO1xuICAgICAgaWYgKHRoaXMucXVldWVbcXVlSWR4XS4kZGlzcGxheVswXSkge1xuICAgICAgICB0aGlzLnF1ZXVlW3F1ZUlkeF0uJGRpc3BsYXkuYXR0cihcImRpc2FibGVkXCIsIFwiZGlzYWJsZWRcIik7XG4gICAgICAgIHRoaXMucXVldWVbcXVlSWR4XS4kZGlzcGxheUxhYmVsSW5wdXQuYXR0cihcImRpc2FibGVkXCIsIFwiZGlzYWJsZWRcIik7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5xdWV1ZVtxdWVJZHhdLiRzZWxlY3RbMF0pIHtcbiAgICAgICAgdGhpcy5xdWV1ZVtxdWVJZHhdLiRzZWxlY3QuYXR0cihcImRpc2FibGVkXCIsIFwiZGlzYWJsZWRcIik7XG4gICAgICB9XG5cbiAgICAgIG9uU3RhdGVDaGFuZ2VkLmNhbGwodGhpcywgdGhpcy5xdWV1ZVtxdWVJZHhdLCB7XG4gICAgICAgIHNlbGY6IHRoaXMsXG4gICAgICAgIHN0YXRlOiBcImRpc2FibGVcIlxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAcmV0dXJuIHtBWDZVSUF1dG9jb21wbGV0ZX1cbiAgICovXG4gIGFsaWduKCkge1xuICAgIGFsaWduQXV0b2NvbXBsZXRlRGlzcGxheS5jYWxsKHRoaXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQVg2VUlBdXRvY29tcGxldGU7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL3NyYy9BWDZVSUF1dG9jb21wbGV0ZS5qcyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zdHlsZS5zY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHt9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3N0eWxlLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3N0eWxlLnNjc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL3NyYy9BWDZVSUF1dG9jb21wbGV0ZS9zdHlsZS5zY3NzXG4vLyBtb2R1bGUgaWQgPSA5NlxuLy8gbW9kdWxlIGNodW5rcyA9IDEyIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHVuZGVmaW5lZCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJALXdlYmtpdC1rZXlmcmFtZXMgYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cCB7XFxuICBmcm9tIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEwJSk7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIHRvIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCUpO1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG5ALW1vei1rZXlmcmFtZXMgYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cCB7XFxuICBmcm9tIHtcXG4gICAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEwJSk7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIHRvIHtcXG4gICAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCUpO1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIGF4LWF1dG9jb21wbGV0ZS1vcHRpb24tZ3JvdXAge1xcbiAgZnJvbSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMCUpO1xcbiAgICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTAlKTtcXG4gICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTAlKTtcXG4gICAgLW8tdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMCUpO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEwJSk7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIHRvIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCUpO1xcbiAgICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwJSk7XFxuICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCUpO1xcbiAgICAtby10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCUpO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCUpO1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cC1kZXN0cm95IHtcXG4gIGZyb20ge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwJSkgc2NhbGVZKDEpO1xcbiAgICBvcGFjaXR5OiAxOyB9XFxuICB0byB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDAlKSBzY2FsZVkoMCk7XFxuICAgIG9wYWNpdHk6IDA7IH0gfVxcblxcbkAtbW96LWtleWZyYW1lcyBheC1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwLWRlc3Ryb3kge1xcbiAgZnJvbSB7XFxuICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDAlKSBzY2FsZVkoMSk7XFxuICAgIG9wYWNpdHk6IDE7IH1cXG4gIHRvIHtcXG4gICAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCUpIHNjYWxlWSgwKTtcXG4gICAgb3BhY2l0eTogMDsgfSB9XFxuXFxuQGtleWZyYW1lcyBheC1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwLWRlc3Ryb3kge1xcbiAgZnJvbSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDAlKSBzY2FsZVkoMSk7XFxuICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDAlKSBzY2FsZVkoMSk7XFxuICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCUpIHNjYWxlWSgxKTtcXG4gICAgLW8tdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDAlKSBzY2FsZVkoMSk7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwJSkgc2NhbGVZKDEpO1xcbiAgICBvcGFjaXR5OiAxOyB9XFxuICB0byB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDAlKSBzY2FsZVkoMCk7XFxuICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDAlKSBzY2FsZVkoMCk7XFxuICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCUpIHNjYWxlWSgwKTtcXG4gICAgLW8tdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDAlKSBzY2FsZVkoMCk7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwJSkgc2NhbGVZKDApO1xcbiAgICBvcGFjaXR5OiAwOyB9IH1cXG5cXG5bZGF0YS1heDZ1aS1hdXRvY29tcGxldGVdIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIG92ZXJmbG93OiB2aXNpYmxlO1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyB9XFxuICBbZGF0YS1heDZ1aS1hdXRvY29tcGxldGVdICosXFxuICBbZGF0YS1heDZ1aS1hdXRvY29tcGxldGVdICo6YmVmb3JlLFxcbiAgW2RhdGEtYXg2dWktYXV0b2NvbXBsZXRlXSAqOmFmdGVyIHtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDsgfVxcblxcbi5heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheSB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB6LWluZGV4OiAyO1xcbiAgcGFkZGluZzogMDtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgaGVpZ2h0OiAzMnB4O1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvcCwgI2ZmZiwgI2ZmZik7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLCNmZmYsICNmZmYpO1xcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMXB4IHJnYmEoMCwgMCwgMCwgMC4wNzUpO1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcXG4gIGNvbG9yOiAjNDQ0O1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lOyB9XFxuICAuYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXk6aG92ZXIsIC5heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheTpmb2N1cyB7XFxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTsgfVxcbiAgLmF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5IC5heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheS10YWJsZSB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGRpc3BsYXk6IHRhYmxlO1xcbiAgICB0YWJsZS1sYXlvdXQ6IGZpeGVkO1xcbiAgICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlOyB9XFxuICAgIC5heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheSAuYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXktdGFibGUgW2RhdGEtYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXk9XFxcImxhYmVsLWhvbGRlclxcXCJdIHtcXG4gICAgICBkaXNwbGF5OiB0YWJsZS1jZWxsO1xcbiAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxuICAgICAgcGFkZGluZzogMCAwOyB9XFxuICAgICAgLmF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5IC5heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheS10YWJsZSBbZGF0YS1heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheT1cXFwibGFiZWwtaG9sZGVyXFxcIl0gaW5wdXQge1xcbiAgICAgICAgbWFyZ2luOiAwO1xcbiAgICAgICAgYm94LXNpemluZzogY29udGVudC1ib3g7XFxuICAgICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gICAgICAgIGJveC1zaGFkb3c6IG5vbmU7IH1cXG4gICAgICAgIC5heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheSAuYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXktdGFibGUgW2RhdGEtYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXk9XFxcImxhYmVsLWhvbGRlclxcXCJdIGlucHV0OmZvY3VzLCAuYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXkgLmF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5LXRhYmxlIFtkYXRhLWF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5PVxcXCJsYWJlbC1ob2xkZXJcXFwiXSBpbnB1dDphY3RpdmUsIC5heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheSAuYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXktdGFibGUgW2RhdGEtYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXk9XFxcImxhYmVsLWhvbGRlclxcXCJdIGlucHV0OmhvdmVyIHtcXG4gICAgICAgICAgYm9yZGVyOiAwIG5vbmU7XFxuICAgICAgICAgIGJveC1zaGFkb3c6IG5vbmU7IH1cXG4gICAgLmF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5IC5heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheS10YWJsZSBbZGF0YS1heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheT1cXFwibGFiZWxcXFwiXSB7XFxuICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICAgIHBhZGRpbmc6IDBweCA1cHg7XFxuICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lOyB9XFxuICAgICAgLmF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5IC5heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheS10YWJsZSBbZGF0YS1heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheT1cXFwibGFiZWxcXFwiXTpmb2N1cyB7XFxuICAgICAgICBvdXRsaW5lOiBub25lOyB9XFxuICAgICAgLmF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5IC5heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheS10YWJsZSBbZGF0YS1heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheT1cXFwibGFiZWxcXFwiXTpob3ZlciB7XFxuICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7IH1cXG4gICAgICAuYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXkgLmF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5LXRhYmxlIFtkYXRhLWF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5PVxcXCJsYWJlbFxcXCJdOmFmdGVyIHtcXG4gICAgICAgIGNvbnRlbnQ6ICcgJztcXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgICAgY2xlYXI6IGJvdGg7IH1cXG4gICAgICAuYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXkgLmF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5LXRhYmxlIFtkYXRhLWF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5PVxcXCJsYWJlbFxcXCJdIFtkYXRhLWF4NnVpLWF1dG9jb21wbGV0ZS1zZWxlY3RlZC1sYWJlbF0ge1xcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICAgICAgZGlzcGxheTogdGFibGU7XFxuICAgICAgICBmbG9hdDogbGVmdDtcXG4gICAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbiAgICAgICAgbWFyZ2luOiAxcHggM3B4IDFweCAwO1xcbiAgICAgICAgY29sb3I6ICM0NDQ7XFxuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvcCwgI2ZmZiwgI2ZmZik7XFxuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLCNmZmYsICNmZmYpO1xcbiAgICAgICAgYm9yZGVyLWNvbGxhcHNlOiBzZXBhcmF0ZTtcXG4gICAgICAgIGJvcmRlcjogMCBub25lOyB9XFxuICAgICAgICAuYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXkgLmF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5LXRhYmxlIFtkYXRhLWF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5PVxcXCJsYWJlbFxcXCJdIFtkYXRhLWF4NnVpLWF1dG9jb21wbGV0ZS1zZWxlY3RlZC1sYWJlbF06Zmlyc3QtY2hpbGQge1xcbiAgICAgICAgICBtYXJnaW4tbGVmdDogMDsgfVxcbiAgICAgICAgLmF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5IC5heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheS10YWJsZSBbZGF0YS1heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheT1cXFwibGFiZWxcXFwiXSBbZGF0YS1heDZ1aS1hdXRvY29tcGxldGUtc2VsZWN0ZWQtbGFiZWxdIC5sYWJlbC1jZWxsIHtcXG4gICAgICAgICAgZGlzcGxheTogdGFibGUtY2VsbDtcXG4gICAgICAgICAgcGFkZGluZzogMCA1cHg7XFxuICAgICAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxuICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjOyB9XFxuICAgICAgICAgIC5heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheSAuYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXktdGFibGUgW2RhdGEtYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXk9XFxcImxhYmVsXFxcIl0gW2RhdGEtYXg2dWktYXV0b2NvbXBsZXRlLXNlbGVjdGVkLWxhYmVsXSAubGFiZWwtY2VsbDpmaXJzdC1jaGlsZCB7XFxuICAgICAgICAgICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNHB4O1xcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDRweDtcXG4gICAgICAgICAgICBib3JkZXItcmlnaHQ6IDAgbm9uZTsgfVxcbiAgICAgICAgICAuYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXkgLmF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5LXRhYmxlIFtkYXRhLWF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5PVxcXCJsYWJlbFxcXCJdIFtkYXRhLWF4NnVpLWF1dG9jb21wbGV0ZS1zZWxlY3RlZC1sYWJlbF0gLmxhYmVsLWNlbGw6bGFzdC1jaGlsZCB7XFxuICAgICAgICAgICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDRweDtcXG4gICAgICAgICAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogNHB4O1xcbiAgICAgICAgICAgIGJvcmRlci1sZWZ0OiAwIG5vbmU7XFxuICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiAwOyB9XFxuICAgICAgICAuYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXkgLmF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5LXRhYmxlIFtkYXRhLWF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5PVxcXCJsYWJlbFxcXCJdIFtkYXRhLWF4NnVpLWF1dG9jb21wbGV0ZS1zZWxlY3RlZC1sYWJlbF0gW2RhdGEtYXg2dWktYXV0b2NvbXBsZXRlLXJlbW92ZV0ge1xcbiAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7IH1cXG4gICAgICAgICAgLmF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5IC5heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheS10YWJsZSBbZGF0YS1heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheT1cXFwibGFiZWxcXFwiXSBbZGF0YS1heDZ1aS1hdXRvY29tcGxldGUtc2VsZWN0ZWQtbGFiZWxdIFtkYXRhLWF4NnVpLWF1dG9jb21wbGV0ZS1yZW1vdmVdOmhvdmVyIHtcXG4gICAgICAgICAgICBjb2xvcjogI2U5NzI1OTsgfVxcbiAgICAgIC5heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheSAuYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXktdGFibGUgW2RhdGEtYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXk9XFxcImxhYmVsXFxcIl0gW2RhdGEtYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXk9XFxcImlucHV0XFxcIl0ge1xcbiAgICAgICAgZmxvYXQ6IGxlZnQ7XFxuICAgICAgICB3aWR0aDogMTAwcHg7IH1cXG4gICAgICAgIC5heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheSAuYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXktdGFibGUgW2RhdGEtYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXk9XFxcImxhYmVsXFxcIl0gW2RhdGEtYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXk9XFxcImlucHV0XFxcIl06Zm9jdXMge1xcbiAgICAgICAgICBvdXRsaW5lOiBub25lOyB9XFxuICAgICAgICAuYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXkgLmF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5LXRhYmxlIFtkYXRhLWF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5PVxcXCJsYWJlbFxcXCJdIFtkYXRhLWF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5PVxcXCJpbnB1dFxcXCJdOjotbXMtY2xlYXIge1xcbiAgICAgICAgICBkaXNwbGF5OiBub25lOyB9XFxuICAgIC5heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheSAuYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXktdGFibGUgW2RhdGEtYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXk9XFxcImFkZG9uXFxcIl0ge1xcbiAgICAgIGRpc3BsYXk6IHRhYmxlLWNlbGw7XFxuICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gICAgICB3aWR0aDogMTZweDtcXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cXG4gICAgICAuYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXkgLmF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5LXRhYmxlIFtkYXRhLWF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5PVxcXCJhZGRvblxcXCJdIC5hZGRvbi1pY29uLXJlc2V0IHtcXG4gICAgICAgIGRpc3BsYXk6IG5vbmU7IH1cXG4gIC5heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheVtkYXRhLXNlbGVjdC1vcHRpb24tZ3JvdXAtb3BlbmVkXSB7XFxuICAgIGJveC1zaGFkb3c6IGluc2V0IDFweCAxcHggM3B4IHJnYmEoMCwgMCwgMCwgMC4yKTsgfVxcbiAgICAuYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXlbZGF0YS1zZWxlY3Qtb3B0aW9uLWdyb3VwLW9wZW5lZF0gLmF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5LXRhYmxlIFtkYXRhLWF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5PVxcXCJhZGRvblxcXCJdIC5hZGRvbi1pY29uLXJlc2V0IHtcXG4gICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgcmlnaHQ6IDIzcHg7XFxuICAgICAgdG9wOiAwO1xcbiAgICAgIGhlaWdodDogMTAwJTsgfVxcbiAgLmF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5LmRlZmF1bHQgYSB7XFxuICAgIGNvbG9yOiAjNDQ0OyB9XFxuICAuYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXkuZGVmYXVsdDpob3Zlcjpub3QoW2Rpc2FibGVkXSksIC5heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheS5kZWZhdWx0OmFjdGl2ZTpub3QoW2Rpc2FibGVkXSksIC5heDZ1aS1hdXRvY29tcGxldGUtZGlzcGxheS5kZWZhdWx0OmZvY3VzOm5vdChbZGlzYWJsZWRdKSwgLmF4NnVpLWF1dG9jb21wbGV0ZS1kaXNwbGF5LmRlZmF1bHRbZGF0YS1zZWxlY3Qtb3B0aW9uLWdyb3VwLW9wZW5lZF06bm90KFtkaXNhYmxlZF0pIHtcXG4gICAgYm9yZGVyLWNvbG9yOiAjY2NjO1xcbiAgICBjb2xvcjogIzQ0NDtcXG4gICAgYmFja2dyb3VuZDogI2ZiZmJmYjtcXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lOyB9XFxuICAuYXg2dWktYXV0b2NvbXBsZXRlLWRpc3BsYXkuZGVmYXVsdCBbZGlzYWJsZWRdIHtcXG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7IH1cXG5cXG4uYXg2dWktYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cCB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgei1pbmRleDogMjAwMDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDA7XFxuICB0b3A6IDA7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBib3gtc2hhZG93OiAwcHggMHB4IDNweCAwcHggcmdiYSgwLCAwLCAwLCAwLjE3NSk7XFxuICBib3JkZXI6IDFweCBzb2xpZDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmJmYmZiO1xcbiAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoYm90dG9tLCAjZmJmYmZiKTtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byB0b3AsI2ZiZmJmYik7XFxuICAtd2Via2l0LWFuaW1hdGlvbjogYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cCAwLjFzIGVhc2Utb3V0O1xcbiAgLW1vei1hbmltYXRpb246IGF4LWF1dG9jb21wbGV0ZS1vcHRpb24tZ3JvdXAgMC4xcyBlYXNlLW91dDtcXG4gIGFuaW1hdGlvbjogYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cCAwLjFzIGVhc2Utb3V0O1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7XFxuICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlWigwKTtcXG4gIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7XFxuICAtby10cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7XFxuICAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciB0b3A7XFxuICAtbW96LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciB0b3A7XFxuICAtbXMtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIHRvcDtcXG4gIC1vLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciB0b3A7XFxuICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgdG9wOyB9XFxuICAuYXg2dWktYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cC5kZXN0cm95IHtcXG4gICAgLXdlYmtpdC1hbmltYXRpb246IGF4LWF1dG9jb21wbGV0ZS1vcHRpb24tZ3JvdXAtZGVzdHJveSAwLjFzIGN1YmljLWJlemllcigwLjYsIC0wLjI4LCAwLjczNSwgMC4wNDUpIGZvcndhcmRzO1xcbiAgICAtbW96LWFuaW1hdGlvbjogYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cC1kZXN0cm95IDAuMXMgY3ViaWMtYmV6aWVyKDAuNiwgLTAuMjgsIDAuNzM1LCAwLjA0NSkgZm9yd2FyZHM7XFxuICAgIGFuaW1hdGlvbjogYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cC1kZXN0cm95IDAuMXMgY3ViaWMtYmV6aWVyKDAuNiwgLTAuMjgsIDAuNzM1LCAwLjA0NSkgZm9yd2FyZHM7IH1cXG4gIC5heDZ1aS1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwLmRpcmVjdGlvbi10b3Age1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciB0b3A7XFxuICAgIC1tb3otdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIHRvcDtcXG4gICAgLW1zLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciB0b3A7XFxuICAgIC1vLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciB0b3A7XFxuICAgIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciB0b3A7IH1cXG4gIC5heDZ1aS1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwLmRpcmVjdGlvbi1ib3R0b20ge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciBib3R0b207XFxuICAgIC1tb3otdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIGJvdHRvbTtcXG4gICAgLW1zLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciBib3R0b207XFxuICAgIC1vLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciBib3R0b207XFxuICAgIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciBib3R0b207IH1cXG4gIC5heDZ1aS1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwLmRlZmF1bHQge1xcbiAgICBib3JkZXItY29sb3I6ICNjY2M7XFxuICAgIGNvbG9yOiAjNDQ0OyB9XFxuICAgIC5heDZ1aS1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwLmRlZmF1bHQgLmF4LWF1dG9jb21wbGV0ZS1ib2R5IC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwLWNvbnRlbnQgLmF4LWF1dG9jb21wbGV0ZS1vcHRpb24taXRlbTpob3ZlciwgLmF4NnVpLWF1dG9jb21wbGV0ZS1vcHRpb24tZ3JvdXAuZGVmYXVsdCAuYXgtYXV0b2NvbXBsZXRlLWJvZHkgLmF4LWF1dG9jb21wbGV0ZS1vcHRpb24tZ3JvdXAtY29udGVudCAuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1pdGVtLmhvdmVyIHtcXG4gICAgICBiYWNrZ3JvdW5kOiAjYTZhNmE2ICFpbXBvcnRhbnQ7XFxuICAgICAgY29sb3I6ICMxMTExMTE7IH1cXG4gICAgICAuYXg2dWktYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cC5kZWZhdWx0IC5heC1hdXRvY29tcGxldGUtYm9keSAuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cC1jb250ZW50IC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWl0ZW06aG92ZXIgLmF4LWF1dG9jb21wbGV0ZS1vcHRpb24taXRlbS1ob2xkZXIgLmF4LWF1dG9jb21wbGV0ZS1vcHRpb24taXRlbS1jZWxsLmF4LWF1dG9jb21wbGV0ZS1vcHRpb24taXRlbS1jaGVja2JveCAuaXRlbS1jaGVja2JveC13cmFwLnVzZUNoZWNrQm94OmFmdGVyLCAuYXg2dWktYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cC5kZWZhdWx0IC5heC1hdXRvY29tcGxldGUtYm9keSAuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cC1jb250ZW50IC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWl0ZW0uaG92ZXIgLmF4LWF1dG9jb21wbGV0ZS1vcHRpb24taXRlbS1ob2xkZXIgLmF4LWF1dG9jb21wbGV0ZS1vcHRpb24taXRlbS1jZWxsLmF4LWF1dG9jb21wbGV0ZS1vcHRpb24taXRlbS1jaGVja2JveCAuaXRlbS1jaGVja2JveC13cmFwLnVzZUNoZWNrQm94OmFmdGVyIHtcXG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgICAgICBib3JkZXItY29sb3I6ICMxMTExMTEgIWltcG9ydGFudDsgfVxcbiAgICAuYXg2dWktYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cC5kZWZhdWx0IC5heC1hdXRvY29tcGxldGUtYm9keSAuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cC1jb250ZW50IC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWl0ZW1bZGF0YS1vcHRpb24tc2VsZWN0ZWQ9XFxcInRydWVcXFwiXSB7XFxuICAgICAgYmFja2dyb3VuZDogI2NjYztcXG4gICAgICBjb2xvcjogIzExMTExMTsgfVxcbiAgICAgIC5heDZ1aS1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwLmRlZmF1bHQgLmF4LWF1dG9jb21wbGV0ZS1ib2R5IC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwLWNvbnRlbnQgLmF4LWF1dG9jb21wbGV0ZS1vcHRpb24taXRlbVtkYXRhLW9wdGlvbi1zZWxlY3RlZD1cXFwidHJ1ZVxcXCJdIC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWl0ZW0taG9sZGVyIC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWl0ZW0tY2VsbC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWl0ZW0tY2hlY2tib3ggLml0ZW0tY2hlY2tib3gtd3JhcC51c2VDaGVja0JveDphZnRlciB7XFxuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICAgICAgYm9yZGVyLWNvbG9yOiAjMTExMTExICFpbXBvcnRhbnQ7IH1cXG4gICAgLmF4NnVpLWF1dG9jb21wbGV0ZS1vcHRpb24tZ3JvdXAuZGVmYXVsdCAuYXgtYXV0b2NvbXBsZXRlLWJvZHkgLmF4LWF1dG9jb21wbGV0ZS1vcHRpb24tZ3JvdXAtY29udGVudCAuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cCAuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1pdGVtLWhvbGRlciAuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cC1sYWJlbCB7XFxuICAgICAgYmFja2dyb3VuZDogI2VlZTsgfVxcbiAgICAuYXg2dWktYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cC5kZWZhdWx0IC5heC1hdXRvY29tcGxldGUtYm9keSAuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cC1idXR0b25zIHtcXG4gICAgICBib3JkZXItdG9wOiAxcHggc29saWQ7XFxuICAgICAgYm9yZGVyLWNvbG9yOiAjY2NjOyB9XFxuICAuYXg2dWktYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cCAuYXgtYXV0b2NvbXBsZXRlLWJvZHkge1xcbiAgICBwYWRkaW5nOiAwcHg7IH1cXG4gICAgLmF4NnVpLWF1dG9jb21wbGV0ZS1vcHRpb24tZ3JvdXAgLmF4LWF1dG9jb21wbGV0ZS1ib2R5IC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwLWNvbnRlbnQge1xcbiAgICAgIG1heC1oZWlnaHQ6IDE4MHB4O1xcbiAgICAgIG92ZXJmbG93LXk6IGF1dG87XFxuICAgICAgLXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmc6IHRvdWNoO1xcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcbiAgICAgIC5heDZ1aS1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwIC5heC1hdXRvY29tcGxldGUtYm9keSAuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cC1jb250ZW50IC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWl0ZW0ge1xcbiAgICAgICAgcGFkZGluZzogM3B4IDBweDtcXG4gICAgICAgIHRleHQtYWxpZ246IGxlZnQ7XFxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgICAgICBmb250LXNpemU6IDEzcHg7XFxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxcbiAgICAgICAgLmF4NnVpLWF1dG9jb21wbGV0ZS1vcHRpb24tZ3JvdXAgLmF4LWF1dG9jb21wbGV0ZS1ib2R5IC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwLWNvbnRlbnQgLmF4LWF1dG9jb21wbGV0ZS1vcHRpb24taXRlbSAuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1pdGVtLWhvbGRlciB7XFxuICAgICAgICAgIGRpc3BsYXk6IHRhYmxlO1xcbiAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgICAgICAgIGJvcmRlci1jb2xsYXBzZTogc2VwYXJhdGU7XFxuICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgICAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICAgICAgICBoZWlnaHQ6IDE4cHg7IH1cXG4gICAgICAgICAgLmF4NnVpLWF1dG9jb21wbGV0ZS1vcHRpb24tZ3JvdXAgLmF4LWF1dG9jb21wbGV0ZS1ib2R5IC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwLWNvbnRlbnQgLmF4LWF1dG9jb21wbGV0ZS1vcHRpb24taXRlbSAuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1pdGVtLWhvbGRlciAuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1pdGVtLWNlbGwge1xcbiAgICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgICAgICAgICAgZGlzcGxheTogdGFibGUtY2VsbDtcXG4gICAgICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgICAgICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICAgICAgICAgICAgZm9udC1zaXplOiAxM3B4O1xcbiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiAxOHB4O1xcbiAgICAgICAgICAgIHBhZGRpbmc6IDAgMCAwIDA7XFxuICAgICAgICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7IH1cXG4gICAgICAgICAgICAuYXg2dWktYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cCAuYXgtYXV0b2NvbXBsZXRlLWJvZHkgLmF4LWF1dG9jb21wbGV0ZS1vcHRpb24tZ3JvdXAtY29udGVudCAuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1pdGVtIC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWl0ZW0taG9sZGVyIC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWl0ZW0tY2VsbC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWl0ZW0tY2hlY2tib3gge1xcbiAgICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgICAgICAgICAgIHdpZHRoOiAxM3B4O1xcbiAgICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyOyB9XFxuICAgICAgICAgICAgICAuYXg2dWktYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cCAuYXgtYXV0b2NvbXBsZXRlLWJvZHkgLmF4LWF1dG9jb21wbGV0ZS1vcHRpb24tZ3JvdXAtY29udGVudCAuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1pdGVtIC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWl0ZW0taG9sZGVyIC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWl0ZW0tY2VsbC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWl0ZW0tY2hlY2tib3ggLml0ZW0tY2hlY2tib3gtd3JhcCB7XFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgICAgICAgICAgIHdpZHRoOiAxM3B4O1xcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDE4cHg7IH1cXG4gICAgICAgICAgICAgICAgLmF4NnVpLWF1dG9jb21wbGV0ZS1vcHRpb24tZ3JvdXAgLmF4LWF1dG9jb21wbGV0ZS1ib2R5IC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwLWNvbnRlbnQgLmF4LWF1dG9jb21wbGV0ZS1vcHRpb24taXRlbSAuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1pdGVtLWhvbGRlciAuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1pdGVtLWNlbGwuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1pdGVtLWNoZWNrYm94IC5pdGVtLWNoZWNrYm94LXdyYXAudXNlQ2hlY2tCb3g6YWZ0ZXIge1xcbiAgICAgICAgICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgICAgICAgICAgICAgICAgY29udGVudDogJyc7XFxuICAgICAgICAgICAgICAgICAgd2lkdGg6IDlweDtcXG4gICAgICAgICAgICAgICAgICBoZWlnaHQ6IDQuNXB4O1xcbiAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICAgICAgICAgICAgICB0b3A6IDQuNXB4O1xcbiAgICAgICAgICAgICAgICAgIHJpZ2h0OiAwO1xcbiAgICAgICAgICAgICAgICAgIGJvcmRlcjogMnB4IHNvbGlkICMwMDA7XFxuICAgICAgICAgICAgICAgICAgYm9yZGVyLXRvcDogbm9uZTtcXG4gICAgICAgICAgICAgICAgICBib3JkZXItcmlnaHQ6IG5vbmU7XFxuICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxuICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMC4xO1xcbiAgICAgICAgICAgICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoLTUwZGVnKTtcXG4gICAgICAgICAgICAgICAgICAtbW96LXRyYW5zZm9ybTogcm90YXRlKC01MGRlZyk7XFxuICAgICAgICAgICAgICAgICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKC01MGRlZyk7XFxuICAgICAgICAgICAgICAgICAgLW8tdHJhbnNmb3JtOiByb3RhdGUoLTUwZGVnKTtcXG4gICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtNTBkZWcpOyB9XFxuICAgICAgICAgICAgLmF4NnVpLWF1dG9jb21wbGV0ZS1vcHRpb24tZ3JvdXAgLmF4LWF1dG9jb21wbGV0ZS1ib2R5IC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwLWNvbnRlbnQgLmF4LWF1dG9jb21wbGV0ZS1vcHRpb24taXRlbSAuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1pdGVtLWhvbGRlciAuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1pdGVtLWNlbGwuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1pdGVtLWxhYmVsIHtcXG4gICAgICAgICAgICAgIHBhZGRpbmc6IDBweCA1cHg7XFxuICAgICAgICAgICAgICBwYWRkaW5nLXJpZ2h0OiA5cHg7IH1cXG4gICAgICAgIC5heDZ1aS1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwIC5heC1hdXRvY29tcGxldGUtYm9keSAuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cC1jb250ZW50IC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWl0ZW1bZGF0YS1vcHRpb24tc2VsZWN0ZWQ9XFxcInRydWVcXFwiXSAuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1pdGVtLWhvbGRlciAuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1pdGVtLWNlbGwuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1pdGVtLWNoZWNrYm94IC5pdGVtLWNoZWNrYm94LXdyYXAudXNlQ2hlY2tCb3g6YWZ0ZXIge1xcbiAgICAgICAgICBvcGFjaXR5OiAxOyB9XFxuICAgICAgLmF4NnVpLWF1dG9jb21wbGV0ZS1vcHRpb24tZ3JvdXAgLmF4LWF1dG9jb21wbGV0ZS1ib2R5IC5heC1hdXRvY29tcGxldGUtb3B0aW9uLWdyb3VwLWNvbnRlbnQgLmF4LWF1dG9jb21wbGV0ZS1vcHRpb24tZ3JvdXAgLmF4LWF1dG9jb21wbGV0ZS1vcHRpb24taXRlbS1ob2xkZXIge1xcbiAgICAgICAgZGlzcGxheTogdGFibGU7XFxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgICAgICBib3JkZXItY29sbGFwc2U6IHNlcGFyYXRlO1xcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICAgICAgaGVpZ2h0OiAxOHB4OyB9XFxuICAgICAgICAuYXg2dWktYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cCAuYXgtYXV0b2NvbXBsZXRlLWJvZHkgLmF4LWF1dG9jb21wbGV0ZS1vcHRpb24tZ3JvdXAtY29udGVudCAuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cCAuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1pdGVtLWhvbGRlciAuYXgtYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cC1sYWJlbCB7XFxuICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgICAgICAgIGRpc3BsYXk6IHRhYmxlLWNlbGw7XFxuICAgICAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxuICAgICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICAgICAgICAgIGZvbnQtc2l6ZTogMTNweDtcXG4gICAgICAgICAgbGluZS1oZWlnaHQ6IDE4cHg7XFxuICAgICAgICAgIHBhZGRpbmc6IDVweCAxMHB4O1xcbiAgICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTsgfVxcbiAgICAuYXg2dWktYXV0b2NvbXBsZXRlLW9wdGlvbi1ncm91cCAuYXgtYXV0b2NvbXBsZXRlLWJvZHkgLmF4LWF1dG9jb21wbGV0ZS1vcHRpb24tZ3JvdXAtYnV0dG9ucyB7XFxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICAgIHBhZGRpbmc6IDNweCAwcHg7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vc3JjL0FYNlVJQXV0b2NvbXBsZXRlL3N0eWxlLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDk3XG4vLyBtb2R1bGUgY2h1bmtzID0gMTIiXSwic291cmNlUm9vdCI6IiJ9