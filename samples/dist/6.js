webpackJsonp([6],{

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jqmin = __webpack_require__(6);

var _jqmin2 = _interopRequireDefault(_jqmin);

var _AX6UIPalette = __webpack_require__(70);

var _AX6UIPalette2 = _interopRequireDefault(_AX6UIPalette);

__webpack_require__(71);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var html = "\n<div id=\"palette-target-0\" style=\"width:270px;padding: 10px;border-radius: 5px;float:left;margin-right: 20px;\" class=\"card\"></div>\n<div id=\"palette-target-1\" style=\"width:270px;padding: 10px;border-radius: 5px;float:left;margin-right: 20px;\" class=\"card\"></div>\n";

var fn = {
  moduleRun: function moduleRun($body) {
    var myPalette_0 = new _AX6UIPalette2.default({
      target: (0, _jqmin2.default)('#palette-target-0'),
      onClick: function onClick(hexColor) {
        console.log(hexColor);
      }
    });
    var myPalette_1 = new _AX6UIPalette2.default({
      target: (0, _jqmin2.default)('#palette-target-1'),
      selectedColor: "#F4F4F4",
      colors: {
        preview: {
          width: 26,
          height: 26,
          cellWidth: 32
        },
        label: {
          width: 70
        },
        slider: {
          trackHeight: 8,
          amount: 20,
          handleWidth: 18,
          handleHeight: 18
        },
        list: [{ label: "red", value: "#ff0000" }, { label: "orange", value: "#ff9802" }, { label: "yellow", value: "#ffff00" }, { label: "green", value: "#00ff36" }, { label: "blue", value: "#0000ff" }, { label: "purple", value: "#ba00ff" }, { label: "skyblue", value: "#84e4ff" }, { label: "pink", value: "#ff77c4" }, { label: "black", value: "#000000" }, { label: "white", value: "#ffffff" }]
      }
    });

    myPalette_1.onClick = function (hexColor) {
      console.log(hexColor);
    };

    setTimeout(function () {
      //selectedColor: "#A0A0A0",
      myPalette_0.setSelectedColor("#4f4f4f  ");
    }, 200);
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

/***/ 70:
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

/***/ 72:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "@-webkit-keyframes something-animation {\n  from {\n    opacity: 1.0; }\n  to {\n    opacity: 0.5; } }\n\n@-moz-keyframes something-animation {\n  from {\n    opacity: 1.0; }\n  to {\n    opacity: 0.5; } }\n\n@keyframes something-animation {\n  from {\n    opacity: 1.0; }\n  to {\n    opacity: 0.5; } }\n\n[data-ax6ui-palette] {\n  box-sizing: border-box;\n  position: relative; }\n  [data-ax6ui-palette] *,\n  [data-ax6ui-palette] *:before,\n  [data-ax6ui-palette] *:after {\n    box-sizing: border-box; }\n  [data-ax6ui-palette] [data-ax6palette-container=\"root\"] [data-ax6palette-container=\"colors\"] {\n    display: table;\n    width: 100%; }\n    [data-ax6ui-palette] [data-ax6palette-container=\"root\"] [data-ax6palette-container=\"colors\"] [data-ax6palette-color] {\n      display: table-row;\n      user-select: none;\n      text-align: left; }\n      [data-ax6ui-palette] [data-ax6palette-container=\"root\"] [data-ax6palette-container=\"colors\"] [data-ax6palette-color] [data-panel] {\n        vertical-align: middle; }\n      [data-ax6ui-palette] [data-ax6palette-container=\"root\"] [data-ax6palette-container=\"colors\"] [data-ax6palette-color]:hover [data-panel=\"color-preview\"] [data-panel=\"color-box\"] {\n        background: #ccc;\n        border-color: #B9BABC; }\n      [data-ax6ui-palette] [data-ax6palette-container=\"root\"] [data-ax6palette-container=\"colors\"] [data-ax6palette-color]:hover [data-panel=\"color-preview\"] [data-panel=\"color\"] {\n        border-color: #B9BABC; }\n      [data-ax6ui-palette] [data-ax6palette-container=\"root\"] [data-ax6palette-container=\"colors\"] [data-ax6palette-color]:hover [data-panel=\"color-label\"] {\n        color: #ccc; }\n      [data-ax6ui-palette] [data-ax6palette-container=\"root\"] [data-ax6palette-container=\"colors\"] [data-ax6palette-color]:active [data-panel=\"color-preview\"] [data-panel=\"color-box\"] {\n        background: #0a68b4;\n        border-color: #000; }\n      [data-ax6ui-palette] [data-ax6palette-container=\"root\"] [data-ax6palette-container=\"colors\"] [data-ax6palette-color]:active [data-panel=\"color-preview\"] [data-panel=\"color\"] {\n        border-color: #000; }\n      [data-ax6ui-palette] [data-ax6palette-container=\"root\"] [data-ax6palette-container=\"colors\"] [data-ax6palette-color]:active [data-panel=\"color-label\"] {\n        color: #0a68b4; }\n      [data-ax6ui-palette] [data-ax6palette-container=\"root\"] [data-ax6palette-container=\"colors\"] [data-ax6palette-color] [data-panel=\"color-preview\"] {\n        display: table-cell;\n        padding: 3px 0;\n        cursor: pointer; }\n        [data-ax6ui-palette] [data-ax6palette-container=\"root\"] [data-ax6palette-container=\"colors\"] [data-ax6palette-color] [data-panel=\"color-preview\"] [data-panel=\"color-box\"] {\n          border-radius: 5px;\n          padding: 2px;\n          border-width: 1px;\n          border-style: solid;\n          border-color: #B9BABC;\n          background: #fff; }\n        [data-ax6ui-palette] [data-ax6palette-container=\"root\"] [data-ax6palette-container=\"colors\"] [data-ax6palette-color] [data-panel=\"color-preview\"] [data-panel=\"color\"] {\n          border-radius: 3px;\n          border-color: #B9BABC;\n          border-width: 1px;\n          border-style: solid;\n          height: 100%;\n          box-shadow: inset 1px 1px 1px rgba(255, 255, 255, 0.5); }\n      [data-ax6ui-palette] [data-ax6palette-container=\"root\"] [data-ax6palette-container=\"colors\"] [data-ax6palette-color] [data-panel=\"color-label\"] {\n        display: table-cell;\n        cursor: pointer; }\n      [data-ax6ui-palette] [data-ax6palette-container=\"root\"] [data-ax6palette-container=\"colors\"] [data-ax6palette-color] [data-panel=\"color-slider\"] {\n        display: table-cell; }\n        [data-ax6ui-palette] [data-ax6palette-container=\"root\"] [data-ax6palette-container=\"colors\"] [data-ax6palette-color] [data-panel=\"color-slider\"] [data-panel=\"color-track\"] {\n          position: relative;\n          display: block;\n          height: 10px;\n          border-radius: 5px;\n          box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.5); }\n        [data-ax6ui-palette] [data-ax6palette-container=\"root\"] [data-ax6palette-container=\"colors\"] [data-ax6palette-color] [data-panel=\"color-slider\"] [data-panel=\"color-handle\"] {\n          position: absolute;\n          left: 50%;\n          top: 50%; }\n          [data-ax6ui-palette] [data-ax6palette-container=\"root\"] [data-ax6palette-container=\"colors\"] [data-ax6palette-color] [data-panel=\"color-slider\"] [data-panel=\"color-handle\"] [data-panel=\"color-handle-after\"] {\n            display: block;\n            position: absolute;\n            left: -10px;\n            top: -10px;\n            width: 20px;\n            height: 20px;\n            border-width: 1px;\n            border-style: solid;\n            border-color: #B9BABC;\n            background-color: #EAEAEA;\n            background-image: -webkit-linear-gradient(bottom, #EAEAEA, #FBFBFB);\n            background-image: linear-gradient(to top,#EAEAEA, #FBFBFB);\n            box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);\n            opacity: 0.8;\n            border-radius: 50%;\n            cursor: col-resize; }\n", ""]);

// exports


/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcGFsZXR0ZS5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL0FYNk11c3RhY2hlLmpzIiwid2VicGFjazovLy8uLi9zcmMvQVg2VUlQYWxldHRlLmpzIiwid2VicGFjazovLy8uLi9zcmMvQVg2VUlQYWxldHRlL3N0eWxlLnNjc3M/NWQzMSIsIndlYnBhY2s6Ly8vLi4vc3JjL0FYNlVJUGFsZXR0ZS9zdHlsZS5zY3NzIl0sIm5hbWVzIjpbImh0bWwiLCJmbiIsIm1vZHVsZVJ1biIsIiRib2R5IiwibXlQYWxldHRlXzAiLCJ0YXJnZXQiLCJvbkNsaWNrIiwiaGV4Q29sb3IiLCJjb25zb2xlIiwibG9nIiwibXlQYWxldHRlXzEiLCJzZWxlY3RlZENvbG9yIiwiY29sb3JzIiwicHJldmlldyIsIndpZHRoIiwiaGVpZ2h0IiwiY2VsbFdpZHRoIiwibGFiZWwiLCJzbGlkZXIiLCJ0cmFja0hlaWdodCIsImFtb3VudCIsImhhbmRsZVdpZHRoIiwiaGFuZGxlSGVpZ2h0IiwibGlzdCIsInZhbHVlIiwic2V0VGltZW91dCIsInNldFNlbGVjdGVkQ29sb3IiLCJtb2R1bGVEZXN0cm95Iiwib2ZmIiwiQVg2IiwiZGVmaW5lTXVzdGFjaGUiLCJnbG9iYWwiLCJmYWN0b3J5IiwibXVzdGFjaGUiLCJtdXN0YWNoZUZhY3RvcnkiLCJvYmplY3RUb1N0cmluZyIsIk9iamVjdCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwiaXNBcnJheSIsIkFycmF5IiwiaXNBcnJheVBvbHlmaWxsIiwib2JqZWN0IiwiY2FsbCIsImlzRnVuY3Rpb24iLCJ0eXBlU3RyIiwib2JqIiwiZXNjYXBlUmVnRXhwIiwic3RyaW5nIiwicmVwbGFjZSIsImhhc1Byb3BlcnR5IiwicHJvcE5hbWUiLCJyZWdFeHBUZXN0IiwiUmVnRXhwIiwidGVzdCIsInRlc3RSZWdFeHAiLCJyZSIsIm5vblNwYWNlUmUiLCJpc1doaXRlc3BhY2UiLCJlbnRpdHlNYXAiLCJlc2NhcGVIdG1sIiwiU3RyaW5nIiwiZnJvbUVudGl0eU1hcCIsInMiLCJ3aGl0ZVJlIiwic3BhY2VSZSIsImVxdWFsc1JlIiwiY3VybHlSZSIsInRhZ1JlIiwicGFyc2VUZW1wbGF0ZSIsInRlbXBsYXRlIiwidGFncyIsInNlY3Rpb25zIiwidG9rZW5zIiwic3BhY2VzIiwiaGFzVGFnIiwibm9uU3BhY2UiLCJzdHJpcFNwYWNlIiwibGVuZ3RoIiwicG9wIiwib3BlbmluZ1RhZ1JlIiwiY2xvc2luZ1RhZ1JlIiwiY2xvc2luZ0N1cmx5UmUiLCJjb21waWxlVGFncyIsInRhZ3NUb0NvbXBpbGUiLCJzcGxpdCIsIkVycm9yIiwic2Nhbm5lciIsIlNjYW5uZXIiLCJzdGFydCIsInR5cGUiLCJjaHIiLCJ0b2tlbiIsIm9wZW5TZWN0aW9uIiwiZW9zIiwicG9zIiwic2NhblVudGlsIiwiaSIsInZhbHVlTGVuZ3RoIiwiY2hhckF0IiwicHVzaCIsInNjYW4iLCJuZXN0VG9rZW5zIiwic3F1YXNoVG9rZW5zIiwic3F1YXNoZWRUb2tlbnMiLCJsYXN0VG9rZW4iLCJudW1Ub2tlbnMiLCJuZXN0ZWRUb2tlbnMiLCJjb2xsZWN0b3IiLCJzZWN0aW9uIiwidGFpbCIsIm1hdGNoIiwiaW5kZXgiLCJzdWJzdHJpbmciLCJzZWFyY2giLCJDb250ZXh0IiwidmlldyIsInBhcmVudENvbnRleHQiLCJjYWNoZSIsInJldHVybnMiLCJrIiwicGFyZW50IiwibG9va3VwIiwibmFtZSIsImhhc093blByb3BlcnR5IiwiY29udGV4dCIsIm5hbWVzIiwibG9va3VwSGl0IiwiaW5kZXhPZiIsIldyaXRlciIsImNsZWFyQ2FjaGUiLCJwYXJzZSIsInJlbmRlciIsInBhcnRpYWxzIiwicmVuZGVyVG9rZW5zIiwib3JpZ2luYWxUZW1wbGF0ZSIsImJ1ZmZlciIsInN5bWJvbCIsInVuZGVmaW5lZCIsInJlbmRlclNlY3Rpb24iLCJyZW5kZXJJbnZlcnRlZCIsInJlbmRlclBhcnRpYWwiLCJ1bmVzY2FwZWRWYWx1ZSIsImVzY2FwZWRWYWx1ZSIsInJhd1ZhbHVlIiwic2VsZiIsInN1YlJlbmRlciIsImoiLCJzbGljZSIsImVzY2FwZSIsInZlcnNpb24iLCJkZWZhdWx0V3JpdGVyIiwiVHlwZUVycm9yIiwidG9faHRtbCIsInNlbmQiLCJyZXN1bHQiLCJmcmFtZVRtcGwiLCJjb2x1bW5LZXlzIiwiY29sb3JzVG1wbCIsIkVOTSIsInN1cHBvcnRUb3VjaCIsIm9uU3RhdGVDaGFuZ2VkIiwib3B0cyIsInRoYXQiLCJnZXRNb3VzZVBvc2l0aW9uIiwiZSIsIm1vdXNlT2JqIiwib3JpZ2luYWxFdmVudCIsImNoYW5nZWRUb3VjaGVzIiwiY2xpZW50WCIsInBhZ2VYIiwiY2xpZW50WSIsInBhZ2VZIiwiYmluZEhhbmRsZSIsIml0ZW0iLCJvcmlnaW5hbFRyYWNrV2lkdGgiLCIkdHJhY2siLCJ0cmFja1dpZHRoIiwiY29uZmlnIiwiaGFuZGxlTGVmdCIsImFtb3VudFRvSGFuZGxlTGVmdCIsIl9hbW91bnQiLCJoYW5kbGVMZWZ0VG9BbW91bnQiLCJ1cGRhdGVQcmV2aWV3Q29sb3IiLCJhbW91bnRUb0NvbG9yIiwiJGhhbmRsZSIsImNzcyIsImxlZnQiLCIkaXRlbSIsIm9uIiwiX29yaWdpbmFsSGFuZGxlQ2xpZW50WCIsIl9vcmlnaW5hbEhhbmRsZUxlZnQiLCJwb3NpdGlvbiIsImhhbmRsZU1vdmVFdmVudCIsInN0b3BFdmVudCIsIl9zZWxlY3RlZENvbG9yIiwidG9VcHBlckNhc2UiLCJnZXRBdHRyaWJ1dGUiLCJuZXdIYW5kbGVMZWZ0Iiwib2Zmc2V0IiwiY29sb3IiLCJldmVudCIsIiRwcmV2aWV3IiwiJGxhYmVsIiwib25VcGRhdGVDb2xvciIsInByb2Nlc3NvciIsIl9jb2xvciIsImxpZ2h0ZW4iLCJkYXJrZW4iLCJnZXRIZXhWYWx1ZSIsIl91bmlxQ29sb3IiLCJjb2xvclRvQW1vdW50IiwiX2RpZmZDb2xvciIsImNvbG9yMSIsImdldEhzbCIsImwiLCJkb2N1bWVudCIsImJvZHkiLCJpbnN0YW5jZUlkIiwiZGEiLCJhdHRyIiwieHZhciIsInJlc2l6ZXJMaXZlZCIsInJlbW92ZUF0dHIiLCJyZXBhaW50IiwiYm94IiwiJHRhcmdldCIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsIiQiLCJmaW5kIiwiZm9yRWFjaCIsImMiLCJyIiwiZyIsImIiLCJfY29sb3IwdmFsdWUiLCJfY29sb3IxdmFsdWUiLCJfY29sb3IydmFsdWUiLCJoYW5kbGVUb3AiLCJlYWNoIiwiZWxJZHgiLCJlbCIsImlkeCIsImV4dGVuZCIsIl9pbmRleCIsIkFYNlVJUGFsZXR0ZSIsImNsaWNrRXZlbnROYW1lIiwidGhlbWUiLCJhbmltYXRlVGltZSIsImNvbnRyb2xzIiwiaW5pdCIsImdldEVycm9yIiwidHJpbSIsImluaXRPbmNlIiwiaW5pdGlhbGl6ZWQiLCJzQ29sb3IiLCJtaW5EaWZmQ29sb3IiLCJtaW5EaWZmQ29sb3JJbmRleCIsImNpZHgiLCJjMWhzbCIsImMyaHNsIiwiZGlmZkNvbG9yIiwiTWF0aCIsImFicyIsImgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBLElBQUlBLCtSQUFKOztBQUtBLElBQUlDLEtBQUs7QUFDUEMsYUFBVyxtQkFBVUMsS0FBVixFQUFpQjtBQUMxQixRQUFJQyxjQUFjLDJCQUFZO0FBQzVCQyxjQUFRLHFCQUFFLG1CQUFGLENBRG9CO0FBRTVCQyxlQUFTLGlCQUFVQyxRQUFWLEVBQW9CO0FBQzNCQyxnQkFBUUMsR0FBUixDQUFZRixRQUFaO0FBQ0Q7QUFKMkIsS0FBWixDQUFsQjtBQU1BLFFBQUlHLGNBQWMsMkJBQVk7QUFDNUJMLGNBQVEscUJBQUUsbUJBQUYsQ0FEb0I7QUFFNUJNLHFCQUFlLFNBRmE7QUFHNUJDLGNBQVE7QUFDTkMsaUJBQVM7QUFDUEMsaUJBQU8sRUFEQTtBQUVQQyxrQkFBUSxFQUZEO0FBR1BDLHFCQUFXO0FBSEosU0FESDtBQU1OQyxlQUFPO0FBQ0xILGlCQUFPO0FBREYsU0FORDtBQVNOSSxnQkFBUTtBQUNOQyx1QkFBYSxDQURQO0FBRU5DLGtCQUFRLEVBRkY7QUFHTkMsdUJB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OEIsZ0NBQWdDLHlCQUF5QixtRUFBbUUsRUFBRSwrSkFBK0osOEJBQThCLDBCQUEwQixFQUFFLGdLQUFnSyw4QkFBOEIsRUFBRSwrTEFBK0wsK0JBQStCLDJCQUEyQix5QkFBeUIsK0JBQStCLHlEQUF5RCxFQUFFLGdNQUFnTSwrQkFBK0Isc0JBQXNCLHFCQUFxQixFQUFFLHNPQUFzTyw2QkFBNkIsaUNBQWlDLDBCQUEwQix5QkFBeUIsMEJBQTBCLDJCQUEyQixnQ0FBZ0Msa0NBQWtDLG9DQUFvQyx3Q0FBd0Msa0ZBQWtGLHlFQUF5RSx1REFBdUQsMkJBQTJCLGlDQUFpQyxpQ0FBaUMsRUFBRTs7QUFFN3JLIiwiZmlsZSI6IjYuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tIFwianFtaW5cIjtcbmltcG9ydCBQYWxldHRlIGZyb20gXCIuLi8uLi9zcmMvQVg2VUlQYWxldHRlXCI7XG5pbXBvcnQgXCIuLi8uLi9zcmMvQVg2VUlQYWxldHRlL3N0eWxlLnNjc3NcIjtcblxubGV0IGh0bWwgPSBgXG48ZGl2IGlkPVwicGFsZXR0ZS10YXJnZXQtMFwiIHN0eWxlPVwid2lkdGg6MjcwcHg7cGFkZGluZzogMTBweDtib3JkZXItcmFkaXVzOiA1cHg7ZmxvYXQ6bGVmdDttYXJnaW4tcmlnaHQ6IDIwcHg7XCIgY2xhc3M9XCJjYXJkXCI+PC9kaXY+XG48ZGl2IGlkPVwicGFsZXR0ZS10YXJnZXQtMVwiIHN0eWxlPVwid2lkdGg6MjcwcHg7cGFkZGluZzogMTBweDtib3JkZXItcmFkaXVzOiA1cHg7ZmxvYXQ6bGVmdDttYXJnaW4tcmlnaHQ6IDIwcHg7XCIgY2xhc3M9XCJjYXJkXCI+PC9kaXY+XG5gO1xuXG5sZXQgZm4gPSB7XG4gIG1vZHVsZVJ1bjogZnVuY3Rpb24gKCRib2R5KSB7XG4gICAgbGV0IG15UGFsZXR0ZV8wID0gbmV3IFBhbGV0dGUoe1xuICAgICAgdGFyZ2V0OiAkKCcjcGFsZXR0ZS10YXJnZXQtMCcpLFxuICAgICAgb25DbGljazogZnVuY3Rpb24gKGhleENvbG9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGhleENvbG9yKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBsZXQgbXlQYWxldHRlXzEgPSBuZXcgUGFsZXR0ZSh7XG4gICAgICB0YXJnZXQ6ICQoJyNwYWxldHRlLXRhcmdldC0xJyksXG4gICAgICBzZWxlY3RlZENvbG9yOiBcIiNGNEY0RjRcIixcbiAgICAgIGNvbG9yczoge1xuICAgICAgICBwcmV2aWV3OiB7XG4gICAgICAgICAgd2lkdGg6IDI2LFxuICAgICAgICAgIGhlaWdodDogMjYsXG4gICAgICAgICAgY2VsbFdpZHRoOiAzMlxuICAgICAgICB9LFxuICAgICAgICBsYWJlbDoge1xuICAgICAgICAgIHdpZHRoOiA3MFxuICAgICAgICB9LFxuICAgICAgICBzbGlkZXI6IHtcbiAgICAgICAgICB0cmFja0hlaWdodDogOCxcbiAgICAgICAgICBhbW91bnQ6IDIwLFxuICAgICAgICAgIGhhbmRsZVdpZHRoOiAxOCxcbiAgICAgICAgICBoYW5kbGVIZWlnaHQ6IDE4XG4gICAgICAgIH0sXG4gICAgICAgIGxpc3Q6IFtcbiAgICAgICAgICB7bGFiZWw6IFwicmVkXCIsIHZhbHVlOiBcIiNmZjAwMDBcIn0sXG4gICAgICAgICAge2xhYmVsOiBcIm9yYW5nZVwiLCB2YWx1ZTogXCIjZmY5ODAyXCJ9LFxuICAgICAgICAgIHtsYWJlbDogXCJ5ZWxsb3dcIiwgdmFsdWU6IFwiI2ZmZmYwMFwifSxcbiAgICAgICAgICB7bGFiZWw6IFwiZ3JlZW5cIiwgdmFsdWU6IFwiIzAwZmYzNlwifSxcbiAgICAgICAgICB7bGFiZWw6IFwiYmx1ZVwiLCB2YWx1ZTogXCIjMDAwMGZmXCJ9LFxuICAgICAgICAgIHtsYWJlbDogXCJwdXJwbGVcIiwgdmFsdWU6IFwiI2JhMDBmZlwifSxcbiAgICAgICAgICB7bGFiZWw6IFwic2t5Ymx1ZVwiLCB2YWx1ZTogXCIjODRlNGZmXCJ9LFxuICAgICAgICAgIHtsYWJlbDogXCJwaW5rXCIsIHZhbHVlOiBcIiNmZjc3YzRcIn0sXG4gICAgICAgICAge2xhYmVsOiBcImJsYWNrXCIsIHZhbHVlOiBcIiMwMDAwMDBcIn0sXG4gICAgICAgICAge2xhYmVsOiBcIndoaXRlXCIsIHZhbHVlOiBcIiNmZmZmZmZcIn1cbiAgICAgICAgXVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgbXlQYWxldHRlXzEub25DbGljayA9IGZ1bmN0aW9uIChoZXhDb2xvcikge1xuICAgICAgY29uc29sZS5sb2coaGV4Q29sb3IpO1xuICAgIH07XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vc2VsZWN0ZWRDb2xvcjogXCIjQTBBMEEwXCIsXG4gICAgICBteVBhbGV0dGVfMC5zZXRTZWxlY3RlZENvbG9yKFwiIzRmNGY0ZiAgXCIpO1xuICAgIH0sIDIwMCk7XG4gIH0sXG4gIG1vZHVsZURlc3Ryb3k6IGZ1bmN0aW9uICgkYm9keSkge1xuICAgICRib2R5Lm9mZihcImNsaWNrXCIpO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGh0bWw6IGh0bWwsXG4gIGZuOiBmblxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wYWxldHRlLmpzIiwiLyohXG4gKiBtdXN0YWNoZS5qcyAtIExvZ2ljLWxlc3Mge3ttdXN0YWNoZX19IHRlbXBsYXRlcyB3aXRoIEphdmFTY3JpcHRcbiAqIGh0dHA6Ly9naXRodWIuY29tL2phbmwvbXVzdGFjaGUuanNcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS90aG9tYXNKYW5nL211c3RhY2hlLmpzIC0tIGltcG9yb3ZlIHNvbWUgdmFyaWFibGVzXG4gKi9cblxuXG4vKipcbiAqIEFYNk11c3RhY2hl64qUIGh0dHA6Ly9naXRodWIuY29tL2phbmwvbXVzdGFjaGUuanPsl5Ag66qH6rCA7KeAIOy1nOyGjO2VnOydmCDquLDriqXsnYQg7Yqc64ud7ZWY7JesIOyCrOyaqe2VmOuKlCDthZztlIzrpr8g7JeU7KeE7J6F64uI64ukLlxuICogQG5hbWVzcGFjZSBBWDZNdXN0YWNoZVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBBWDZNdXN0YWNoZS5yZW5kZXJcbiAqIEBleGFtcGxlXG4gKiBgYGBqc1xuICogYXg1Lm11c3RhY2hlLnJlbmRlcih0ZW1wbGF0ZSwgdmlldylcbiAqXG4gKlxuICogLy9BcnJheSBAaVxuICogLy97eyNiZWF0bGVzfX1cbiAqIC8ve3tmaXJzdE5hbWV9fSB7e2xhc3ROYW1lfX0gKHt7QGl9fSkgKHt7QGZpcnN0fX0pXG4gKiAvL3t7L2JlYXRsZXN9fVxuICpcbiAqIC8vT2JqZWN0IEBlYWNoXG4gKiB7eyNiZWF0bGVzfX1cbiAqICB7eyNAZWFjaH19XG4gKiAgICAgIHt7QGtleX19IDoge3tAdmFsdWUuZmlyc3ROYW1lfX0ge3tAdmFsdWUubGFzdE5hbWV9fVxuICogIHt7L0BlYWNofX1cbiAqIHt7L2JlYXRsZXN9fVxuICpcbiAqIGBgYFxuICovXG5cblxuXG5sZXQgQVg2ID0ge307XG5cbihmdW5jdGlvbiBkZWZpbmVNdXN0YWNoZShnbG9iYWwsIGZhY3RvcnkpIHtcblxuICBmYWN0b3J5KGdsb2JhbC5tdXN0YWNoZSA9IHt9KTtcblxufShBWDYsIGZ1bmN0aW9uIG11c3RhY2hlRmFjdG9yeShtdXN0YWNoZSkge1xuXG4gIHZhciBvYmplY3RUb1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG4gIHZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiBpc0FycmF5UG9seWZpbGwob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdFRvU3RyaW5nLmNhbGwob2JqZWN0KSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgfTtcblxuICBmdW5jdGlvbiBpc0Z1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnZnVuY3Rpb24nO1xuICB9XG5cbiAgLyoqXG4gICAqIE1vcmUgY29ycmVjdCB0eXBlb2Ygc3RyaW5nIGhhbmRsaW5nIGFycmF5XG4gICAqIHdoaWNoIG5vcm1hbGx5IHJldHVybnMgdHlwZW9mICdvYmplY3QnXG4gICAqL1xuICBmdW5jdGlvbiB0eXBlU3RyKG9iaikge1xuICAgIHJldHVybiBpc0FycmF5KG9iaikgPyAnYXJyYXknIDogdHlwZW9mIG9iajtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVzY2FwZVJlZ0V4cChzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoL1tcXC1cXFtcXF17fSgpKis/LixcXFxcXFxeJHwjXFxzXS9nLCAnXFxcXCQmJyk7XG4gIH1cblxuICAvKipcbiAgICogTnVsbCBzYWZlIHdheSBvZiBjaGVja2luZyB3aGV0aGVyIG9yIG5vdCBhbiBvYmplY3QsXG4gICAqIGluY2x1ZGluZyBpdHMgcHJvdG90eXBlLCBoYXMgYSBnaXZlbiBwcm9wZXJ0eVxuICAgKi9cbiAgZnVuY3Rpb24gaGFzUHJvcGVydHkob2JqLCBwcm9wTmFtZSkge1xuICAgIHJldHVybiBvYmogIT0gbnVsbCAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiAocHJvcE5hbWUgaW4gb2JqKTtcbiAgfVxuXG4gIC8vIFdvcmthcm91bmQgZm9yIGh0dHBzOi8vaXNzdWVzLmFwYWNoZS5vcmcvamlyYS9icm93c2UvQ09VQ0hEQi01NzdcbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qYW5sL211c3RhY2hlLmpzL2lzc3Vlcy8xODlcbiAgdmFyIHJlZ0V4cFRlc3QgPSBSZWdFeHAucHJvdG90eXBlLnRlc3Q7XG5cbiAgZnVuY3Rpb24gdGVzdFJlZ0V4cChyZSwgc3RyaW5nKSB7XG4gICAgcmV0dXJuIHJlZ0V4cFRlc3QuY2FsbChyZSwgc3RyaW5nKTtcbiAgfVxuXG4gIHZhciBub25TcGFjZVJlID0gL1xcUy87XG5cbiAgZnVuY3Rpb24gaXNXaGl0ZXNwYWNlKHN0cmluZykge1xuICAgIHJldHVybiAhdGVzdFJlZ0V4cChub25TcGFjZVJlLCBzdHJpbmcpO1xuICB9XG5cbiAgdmFyIGVudGl0eU1hcCA9IHtcbiAgICAnJic6ICcmYW1wOycsICc8JzogJyZsdDsnLCAnPic6ICcmZ3Q7JywgJ1wiJzogJyZxdW90OycsIFwiJ1wiOiAnJiMzOTsnLCAnLyc6ICcmI3gyRjsnXG4gIH07XG5cbiAgZnVuY3Rpb24gZXNjYXBlSHRtbChzdHJpbmcpIHtcbiAgICByZXR1cm4gU3RyaW5nKHN0cmluZykucmVwbGFjZSgvWyY8PlwiJ1xcL10vZywgZnVuY3Rpb24gZnJvbUVudGl0eU1hcChzKSB7XG4gICAgICByZXR1cm4gZW50aXR5TWFwW3NdO1xuICAgIH0pO1xuICB9XG5cbiAgdmFyIHdoaXRlUmUgPSAvXFxzKi87XG4gIHZhciBzcGFjZVJlID0gL1xccysvO1xuICB2YXIgZXF1YWxzUmUgPSAvXFxzKj0vO1xuICB2YXIgY3VybHlSZSA9IC9cXHMqXFx9LztcbiAgdmFyIHRhZ1JlID0gLyN8XFxefFxcL3w+fFxce3wmfD18IS87XG5cbiAgLyoqXG4gICAqIEJyZWFrcyB1cCB0aGUgZ2l2ZW4gYHRlbXBsYXRlYCBzdHJpbmcgaW50byBhIHRyZWUgb2YgdG9rZW5zLiBJZiB0aGUgYHRhZ3NgXG4gICAqIGFyZ3VtZW50IGlzIGdpdmVuIGhlcmUgaXQgbXVzdCBiZSBhbiBhcnJheSB3aXRoIHR3byBzdHJpbmcgdmFsdWVzOiB0aGVcbiAgICogb3BlbmluZyBhbmQgY2xvc2luZyB0YWdzIHVzZWQgaW4gdGhlIHRlbXBsYXRlIChlLmcuIFsgXCI8JVwiLCBcIiU+XCIgXSkuIE9mXG4gICAqIGNvdXJzZSwgdGhlIGRlZmF1bHQgaXMgdG8gdXNlIG11c3RhY2hlcyAoaS5lLiBtdXN0YWNoZS50YWdzKS5cbiAgICpcbiAgICogQSB0b2tlbiBpcyBhbiBhcnJheSB3aXRoIGF0IGxlYXN0IDQgZWxlbWVudHMuIFRoZSBmaXJzdCBlbGVtZW50IGlzIHRoZVxuICAgKiBtdXN0YWNoZSBzeW1ib2wgdGhhdCB3YXMgdXNlZCBpbnNpZGUgdGhlIHRhZywgZS5nLiBcIiNcIiBvciBcIiZcIi4gSWYgdGhlIHRhZ1xuICAgKiBkaWQgbm90IGNvbnRhaW4gYSBzeW1ib2wgKGkuZS4ge3tteVZhbHVlfX0pIHRoaXMgZWxlbWVudCBpcyBcIm5hbWVcIi4gRm9yXG4gICAqIGFsbCB0ZXh0IHRoYXQgYXBwZWFycyBvdXRzaWRlIGEgc3ltYm9sIHRoaXMgZWxlbWVudCBpcyBcInRleHRcIi5cbiAgICpcbiAgICogVGhlIHNlY29uZCBlbGVtZW50IG9mIGEgdG9rZW4gaXMgaXRzIFwidmFsdWVcIi4gRm9yIG11c3RhY2hlIHRhZ3MgdGhpcyBpc1xuICAgKiB3aGF0ZXZlciBlbHNlIHdhcyBpbnNpZGUgdGhlIHRhZyBiZXNpZGVzIHRoZSBvcGVuaW5nIHN5bWJvbC4gRm9yIHRleHQgdG9rZW5zXG4gICAqIHRoaXMgaXMgdGhlIHRleHQgaXRzZWxmLlxuICAgKlxuICAgKiBUaGUgdGhpcmQgYW5kIGZvdXJ0aCBlbGVtZW50cyBvZiB0aGUgdG9rZW4gYXJlIHRoZSBzdGFydCBhbmQgZW5kIGluZGljZXMsXG4gICAqIHJlc3BlY3RpdmVseSwgb2YgdGhlIHRva2VuIGluIHRoZSBvcmlnaW5hbCB0ZW1wbGF0ZS5cbiAgICpcbiAgICogVG9rZW5zIHRoYXQgYXJlIHRoZSByb290IG5vZGUgb2YgYSBzdWJ0cmVlIGNvbnRhaW4gdHdvIG1vcmUgZWxlbWVudHM6IDEpIGFuXG4gICAqIGFycmF5IG9mIHRva2VucyBpbiB0aGUgc3VidHJlZSBhbmQgMikgdGhlIGluZGV4IGluIHRoZSBvcmlnaW5hbCB0ZW1wbGF0ZSBhdFxuICAgKiB3aGljaCB0aGUgY2xvc2luZyB0YWcgZm9yIHRoYXQgc2VjdGlvbiBiZWdpbnMuXG4gICAqL1xuICBmdW5jdGlvbiBwYXJzZVRlbXBsYXRlKHRlbXBsYXRlLCB0YWdzKSB7XG4gICAgaWYgKCF0ZW1wbGF0ZSlcbiAgICAgIHJldHVybiBbXTtcblxuICAgIHZhciBzZWN0aW9ucyA9IFtdOyAgICAgLy8gU3RhY2sgdG8gaG9sZCBzZWN0aW9uIHRva2Vuc1xuICAgIHZhciB0b2tlbnMgPSBbXTsgICAgICAgLy8gQnVmZmVyIHRvIGhvbGQgdGhlIHRva2Vuc1xuICAgIHZhciBzcGFjZXMgPSBbXTsgICAgICAgLy8gSW5kaWNlcyBvZiB3aGl0ZXNwYWNlIHRva2VucyBvbiB0aGUgY3VycmVudCBsaW5lXG4gICAgdmFyIGhhc1RhZyA9IGZhbHNlOyAgICAvLyBJcyB0aGVyZSBhIHt7dGFnfX0gb24gdGhlIGN1cnJlbnQgbGluZT9cbiAgICB2YXIgbm9uU3BhY2UgPSBmYWxzZTsgIC8vIElzIHRoZXJlIGEgbm9uLXNwYWNlIGNoYXIgb24gdGhlIGN1cnJlbnQgbGluZT9cblxuICAgIC8vIFN0cmlwcyBhbGwgd2hpdGVzcGFjZSB0b2tlbnMgYXJyYXkgZm9yIHRoZSBjdXJyZW50IGxpbmVcbiAgICAvLyBpZiB0aGVyZSB3YXMgYSB7eyN0YWd9fSBvbiBpdCBhbmQgb3RoZXJ3aXNlIG9ubHkgc3BhY2UuXG4gICAgZnVuY3Rpb24gc3RyaXBTcGFjZSgpIHtcbiAgICAgIGlmIChoYXNUYWcgJiYgIW5vblNwYWNlKSB7XG4gICAgICAgIHdoaWxlIChzcGFjZXMubGVuZ3RoKVxuICAgICAgICAgIGRlbGV0ZSB0b2tlbnNbc3BhY2VzLnBvcCgpXTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBzcGFjZXMgPSBbXTtcbiAgICAgIH1cblxuICAgICAgaGFzVGFnID0gZmFsc2U7XG4gICAgICBub25TcGFjZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBvcGVuaW5nVGFnUmUsIGNsb3NpbmdUYWdSZSwgY2xvc2luZ0N1cmx5UmU7XG5cbiAgICBmdW5jdGlvbiBjb21waWxlVGFncyh0YWdzVG9Db21waWxlKSB7XG4gICAgICBpZiAodHlwZW9mIHRhZ3NUb0NvbXBpbGUgPT09ICdzdHJpbmcnKVxuICAgICAgICB0YWdzVG9Db21waWxlID0gdGFnc1RvQ29tcGlsZS5zcGxpdChzcGFjZVJlLCAyKTtcblxuICAgICAgaWYgKCFpc0FycmF5KHRhZ3NUb0NvbXBpbGUpIHx8IHRhZ3NUb0NvbXBpbGUubGVuZ3RoICE9PSAyKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgdGFnczogJyArIHRhZ3NUb0NvbXBpbGUpO1xuXG4gICAgICBvcGVuaW5nVGFnUmUgPSBuZXcgUmVnRXhwKGVzY2FwZVJlZ0V4cCh0YWdzVG9Db21waWxlWzBdKSArICdcXFxccyonKTtcbiAgICAgIGNsb3NpbmdUYWdSZSA9IG5ldyBSZWdFeHAoJ1xcXFxzKicgKyBlc2NhcGVSZWdFeHAodGFnc1RvQ29tcGlsZVsxXSkpO1xuICAgICAgY2xvc2luZ0N1cmx5UmUgPSBuZXcgUmVnRXhwKCdcXFxccyonICsgZXNjYXBlUmVnRXhwKCd9JyArIHRhZ3NUb0NvbXBpbGVbMV0pKTtcbiAgICB9XG5cbiAgICBjb21waWxlVGFncyh0YWdzIHx8IG11c3RhY2hlLnRhZ3MpO1xuXG4gICAgdmFyIHNjYW5uZXIgPSBuZXcgU2Nhbm5lcih0ZW1wbGF0ZSk7XG5cbiAgICB2YXIgc3RhcnQsIHR5cGUsIHZhbHVlLCBjaHIsIHRva2VuLCBvcGVuU2VjdGlvbjtcbiAgICB3aGlsZSAoIXNjYW5uZXIuZW9zKCkpIHtcbiAgICAgIHN0YXJ0ID0gc2Nhbm5lci5wb3M7XG5cbiAgICAgIC8vIE1hdGNoIGFueSB0ZXh0IGJldHdlZW4gdGFncy5cbiAgICAgIHZhbHVlID0gc2Nhbm5lci5zY2FuVW50aWwob3BlbmluZ1RhZ1JlKTtcblxuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCB2YWx1ZUxlbmd0aCA9IHZhbHVlLmxlbmd0aDsgaSA8IHZhbHVlTGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBjaHIgPSB2YWx1ZS5jaGFyQXQoaSk7XG5cbiAgICAgICAgICBpZiAoaXNXaGl0ZXNwYWNlKGNocikpIHtcbiAgICAgICAgICAgIHNwYWNlcy5wdXNoKHRva2Vucy5sZW5ndGgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG5vblNwYWNlID0gdHJ1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0b2tlbnMucHVzaChbJ3RleHQnLCBjaHIsIHN0YXJ0LCBzdGFydCArIDFdKTtcbiAgICAgICAgICBzdGFydCArPSAxO1xuXG4gICAgICAgICAgLy8gQ2hlY2sgZm9yIHdoaXRlc3BhY2Ugb24gdGhlIGN1cnJlbnQgbGluZS5cbiAgICAgICAgICBpZiAoY2hyID09PSAnXFxuJylcbiAgICAgICAgICAgIHN0cmlwU3BhY2UoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBNYXRjaCB0aGUgb3BlbmluZyB0YWcuXG4gICAgICBpZiAoIXNjYW5uZXIuc2NhbihvcGVuaW5nVGFnUmUpKVxuICAgICAgICBicmVhaztcblxuICAgICAgaGFzVGFnID0gdHJ1ZTtcblxuICAgICAgLy8gR2V0IHRoZSB0YWcgdHlwZS5cbiAgICAgIHR5cGUgPSBzY2FubmVyLnNjYW4odGFnUmUpIHx8ICduYW1lJztcbiAgICAgIHNjYW5uZXIuc2Nhbih3aGl0ZVJlKTtcblxuICAgICAgLy8gR2V0IHRoZSB0YWcgdmFsdWUuXG4gICAgICBpZiAodHlwZSA9PT0gJz0nKSB7XG4gICAgICAgIHZhbHVlID0gc2Nhbm5lci5zY2FuVW50aWwoZXF1YWxzUmUpO1xuICAgICAgICBzY2FubmVyLnNjYW4oZXF1YWxzUmUpO1xuICAgICAgICBzY2FubmVyLnNjYW5VbnRpbChjbG9zaW5nVGFnUmUpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJ3snKSB7XG4gICAgICAgIHZhbHVlID0gc2Nhbm5lci5zY2FuVW50aWwoY2xvc2luZ0N1cmx5UmUpO1xuICAgICAgICBzY2FubmVyLnNjYW4oY3VybHlSZSk7XG4gICAgICAgIHNjYW5uZXIuc2NhblVudGlsKGNsb3NpbmdUYWdSZSk7XG4gICAgICAgIHR5cGUgPSAnJic7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBzY2FubmVyLnNjYW5VbnRpbChjbG9zaW5nVGFnUmUpO1xuICAgICAgfVxuXG4gICAgICAvLyBNYXRjaCB0aGUgY2xvc2luZyB0YWcuXG4gICAgICBpZiAoIXNjYW5uZXIuc2NhbihjbG9zaW5nVGFnUmUpKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuY2xvc2VkIHRhZyBhdCAnICsgc2Nhbm5lci5wb3MpO1xuXG4gICAgICB0b2tlbiA9IFt0eXBlLCB2YWx1ZSwgc3RhcnQsIHNjYW5uZXIucG9zXTtcbiAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcblxuICAgICAgaWYgKHR5cGUgPT09ICcjJyB8fCB0eXBlID09PSAnXicpIHtcbiAgICAgICAgc2VjdGlvbnMucHVzaCh0b2tlbik7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0eXBlID09PSAnLycpIHtcbiAgICAgICAgLy8gQ2hlY2sgc2VjdGlvbiBuZXN0aW5nLlxuICAgICAgICBvcGVuU2VjdGlvbiA9IHNlY3Rpb25zLnBvcCgpO1xuXG4gICAgICAgIGlmICghb3BlblNlY3Rpb24pXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbm9wZW5lZCBzZWN0aW9uIFwiJyArIHZhbHVlICsgJ1wiIGF0ICcgKyBzdGFydCk7XG5cbiAgICAgICAgaWYgKG9wZW5TZWN0aW9uWzFdICE9PSB2YWx1ZSlcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuY2xvc2VkIHNlY3Rpb24gXCInICsgb3BlblNlY3Rpb25bMV0gKyAnXCIgYXQgJyArIHN0YXJ0KTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICduYW1lJyB8fCB0eXBlID09PSAneycgfHwgdHlwZSA9PT0gJyYnKSB7XG4gICAgICAgIG5vblNwYWNlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICc9Jykge1xuICAgICAgICAvLyBTZXQgdGhlIHRhZ3MgZm9yIHRoZSBuZXh0IHRpbWUgYXJvdW5kLlxuICAgICAgICBjb21waWxlVGFncyh2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gTWFrZSBzdXJlIHRoZXJlIGFyZSBubyBvcGVuIHNlY3Rpb25zIHdoZW4gd2UncmUgZG9uZS5cbiAgICBvcGVuU2VjdGlvbiA9IHNlY3Rpb25zLnBvcCgpO1xuXG4gICAgaWYgKG9wZW5TZWN0aW9uKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmNsb3NlZCBzZWN0aW9uIFwiJyArIG9wZW5TZWN0aW9uWzFdICsgJ1wiIGF0ICcgKyBzY2FubmVyLnBvcyk7XG5cbiAgICByZXR1cm4gbmVzdFRva2VucyhzcXVhc2hUb2tlbnModG9rZW5zKSk7XG4gIH1cblxuICAvKipcbiAgICogQ29tYmluZXMgdGhlIHZhbHVlcyBvZiBjb25zZWN1dGl2ZSB0ZXh0IHRva2VucyBpbiB0aGUgZ2l2ZW4gYHRva2Vuc2AgYXJyYXlcbiAgICogdG8gYSBzaW5nbGUgdG9rZW4uXG4gICAqL1xuICBmdW5jdGlvbiBzcXVhc2hUb2tlbnModG9rZW5zKSB7XG4gICAgdmFyIHNxdWFzaGVkVG9rZW5zID0gW107XG5cbiAgICB2YXIgdG9rZW4sIGxhc3RUb2tlbjtcbiAgICBmb3IgKHZhciBpID0gMCwgbnVtVG9rZW5zID0gdG9rZW5zLmxlbmd0aDsgaSA8IG51bVRva2VuczsgKytpKSB7XG4gICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcblxuICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgIGlmICh0b2tlblswXSA9PT0gJ3RleHQnICYmIGxhc3RUb2tlbiAmJiBsYXN0VG9rZW5bMF0gPT09ICd0ZXh0Jykge1xuICAgICAgICAgIGxhc3RUb2tlblsxXSArPSB0b2tlblsxXTtcbiAgICAgICAgICBsYXN0VG9rZW5bM10gPSB0b2tlblszXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBzcXVhc2hlZFRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgICBsYXN0VG9rZW4gPSB0b2tlbjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzcXVhc2hlZFRva2VucztcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JtcyB0aGUgZ2l2ZW4gYXJyYXkgb2YgYHRva2Vuc2AgaW50byBhIG5lc3RlZCB0cmVlIHN0cnVjdHVyZSB3aGVyZVxuICAgKiB0b2tlbnMgdGhhdCByZXByZXNlbnQgYSBzZWN0aW9uIGhhdmUgdHdvIGFkZGl0aW9uYWwgaXRlbXM6IDEpIGFuIGFycmF5IG9mXG4gICAqIGFsbCB0b2tlbnMgdGhhdCBhcHBlYXIgaW4gdGhhdCBzZWN0aW9uIGFuZCAyKSB0aGUgaW5kZXggaW4gdGhlIG9yaWdpbmFsXG4gICAqIHRlbXBsYXRlIHRoYXQgcmVwcmVzZW50cyB0aGUgZW5kIG9mIHRoYXQgc2VjdGlvbi5cbiAgICovXG4gIGZ1bmN0aW9uIG5lc3RUb2tlbnModG9rZW5zKSB7XG4gICAgdmFyIG5lc3RlZFRva2VucyA9IFtdO1xuICAgIHZhciBjb2xsZWN0b3IgPSBuZXN0ZWRUb2tlbnM7XG4gICAgdmFyIHNlY3Rpb25zID0gW107XG5cbiAgICB2YXIgdG9rZW4sIHNlY3Rpb247XG4gICAgZm9yICh2YXIgaSA9IDAsIG51bVRva2VucyA9IHRva2Vucy5sZW5ndGg7IGkgPCBudW1Ub2tlbnM7ICsraSkge1xuICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XG5cbiAgICAgIHN3aXRjaCAodG9rZW5bMF0pIHtcbiAgICAgICAgY2FzZSAnIyc6XG4gICAgICAgIGNhc2UgJ14nOlxuICAgICAgICAgIGNvbGxlY3Rvci5wdXNoKHRva2VuKTtcbiAgICAgICAgICBzZWN0aW9ucy5wdXNoKHRva2VuKTtcbiAgICAgICAgICBjb2xsZWN0b3IgPSB0b2tlbls0XSA9IFtdO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICcvJzpcbiAgICAgICAgICBzZWN0aW9uID0gc2VjdGlvbnMucG9wKCk7XG4gICAgICAgICAgc2VjdGlvbls1XSA9IHRva2VuWzJdO1xuICAgICAgICAgIGNvbGxlY3RvciA9IHNlY3Rpb25zLmxlbmd0aCA+IDAgPyBzZWN0aW9uc1tzZWN0aW9ucy5sZW5ndGggLSAxXVs0XSA6IG5lc3RlZFRva2VucztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb2xsZWN0b3IucHVzaCh0b2tlbik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5lc3RlZFRva2VucztcbiAgfVxuXG4gIC8qKlxuICAgKiBBIHNpbXBsZSBzdHJpbmcgc2Nhbm5lciB0aGF0IGlzIHVzZWQgYnkgdGhlIHRlbXBsYXRlIHBhcnNlciB0byBmaW5kXG4gICAqIHRva2VucyBpbiB0ZW1wbGF0ZSBzdHJpbmdzLlxuICAgKi9cbiAgZnVuY3Rpb24gU2Nhbm5lcihzdHJpbmcpIHtcbiAgICB0aGlzLnN0cmluZyA9IHN0cmluZztcbiAgICB0aGlzLnRhaWwgPSBzdHJpbmc7XG4gICAgdGhpcy5wb3MgPSAwO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYHRydWVgIGlmIHRoZSB0YWlsIGlzIGVtcHR5IChlbmQgb2Ygc3RyaW5nKS5cbiAgICovXG4gIFNjYW5uZXIucHJvdG90eXBlLmVvcyA9IGZ1bmN0aW9uIGVvcygpIHtcbiAgICByZXR1cm4gdGhpcy50YWlsID09PSAnJztcbiAgfTtcblxuICAvKipcbiAgICogVHJpZXMgdG8gbWF0Y2ggdGhlIGdpdmVuIHJlZ3VsYXIgZXhwcmVzc2lvbiBhdCB0aGUgY3VycmVudCBwb3NpdGlvbi5cbiAgICogUmV0dXJucyB0aGUgbWF0Y2hlZCB0ZXh0IGlmIGl0IGNhbiBtYXRjaCwgdGhlIGVtcHR5IHN0cmluZyBvdGhlcndpc2UuXG4gICAqL1xuICBTY2FubmVyLnByb3RvdHlwZS5zY2FuID0gZnVuY3Rpb24gc2NhbihyZSkge1xuICAgIHZhciBtYXRjaCA9IHRoaXMudGFpbC5tYXRjaChyZSk7XG5cbiAgICBpZiAoIW1hdGNoIHx8IG1hdGNoLmluZGV4ICE9PSAwKVxuICAgICAgcmV0dXJuICcnO1xuXG4gICAgdmFyIHN0cmluZyA9IG1hdGNoWzBdO1xuXG4gICAgdGhpcy50YWlsID0gdGhpcy50YWlsLnN1YnN0cmluZyhzdHJpbmcubGVuZ3RoKTtcbiAgICB0aGlzLnBvcyArPSBzdHJpbmcubGVuZ3RoO1xuXG4gICAgcmV0dXJuIHN0cmluZztcbiAgfTtcblxuICAvKipcbiAgICogU2tpcHMgYWxsIHRleHQgdW50aWwgdGhlIGdpdmVuIHJlZ3VsYXIgZXhwcmVzc2lvbiBjYW4gYmUgbWF0Y2hlZC4gUmV0dXJuc1xuICAgKiB0aGUgc2tpcHBlZCBzdHJpbmcsIHdoaWNoIGlzIHRoZSBlbnRpcmUgdGFpbCBpZiBubyBtYXRjaCBjYW4gYmUgbWFkZS5cbiAgICovXG4gIFNjYW5uZXIucHJvdG90eXBlLnNjYW5VbnRpbCA9IGZ1bmN0aW9uIHNjYW5VbnRpbChyZSkge1xuICAgIHZhciBpbmRleCA9IHRoaXMudGFpbC5zZWFyY2gocmUpLCBtYXRjaDtcblxuICAgIHN3aXRjaCAoaW5kZXgpIHtcbiAgICAgIGNhc2UgLTE6XG4gICAgICAgIG1hdGNoID0gdGhpcy50YWlsO1xuICAgICAgICB0aGlzLnRhaWwgPSAnJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIG1hdGNoID0gJyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbWF0Y2ggPSB0aGlzLnRhaWwuc3Vic3RyaW5nKDAsIGluZGV4KTtcbiAgICAgICAgdGhpcy50YWlsID0gdGhpcy50YWlsLnN1YnN0cmluZyhpbmRleCk7XG4gICAgfVxuXG4gICAgdGhpcy5wb3MgKz0gbWF0Y2gubGVuZ3RoO1xuXG4gICAgcmV0dXJuIG1hdGNoO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXByZXNlbnRzIGEgcmVuZGVyaW5nIGNvbnRleHQgYnkgd3JhcHBpbmcgYSB2aWV3IG9iamVjdCBhbmRcbiAgICogbWFpbnRhaW5pbmcgYSByZWZlcmVuY2UgdG8gdGhlIHBhcmVudCBjb250ZXh0LlxuICAgKi9cbiAgZnVuY3Rpb24gQ29udGV4dCh2aWV3LCBwYXJlbnRDb250ZXh0KSB7XG4gICAgdGhpcy52aWV3ID0gdmlldztcbiAgICB0aGlzLmNhY2hlID0ge1xuICAgICAgJy4nOiB0aGlzLnZpZXcsXG4gICAgICAnQGVhY2gnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByZXR1cm5zID0gW107XG4gICAgICAgIGZvciAodmFyIGsgaW4gdGhpcykge1xuICAgICAgICAgIHJldHVybnMucHVzaCh7J0BrZXknOiBrLCAnQHZhbHVlJzogdGhpc1trXX0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXR1cm5zO1xuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5wYXJlbnQgPSBwYXJlbnRDb250ZXh0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgY29udGV4dCB1c2luZyB0aGUgZ2l2ZW4gdmlldyB3aXRoIHRoaXMgY29udGV4dFxuICAgKiBhcyB0aGUgcGFyZW50LlxuICAgKi9cbiAgQ29udGV4dC5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIHB1c2godmlldykge1xuICAgIHJldHVybiBuZXcgQ29udGV4dCh2aWV3LCB0aGlzKTtcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhlIGdpdmVuIG5hbWUgaW4gdGhpcyBjb250ZXh0LCB0cmF2ZXJzaW5nXG4gICAqIHVwIHRoZSBjb250ZXh0IGhpZXJhcmNoeSBpZiB0aGUgdmFsdWUgaXMgYWJzZW50IGluIHRoaXMgY29udGV4dCdzIHZpZXcuXG4gICAqL1xuICBDb250ZXh0LnByb3RvdHlwZS5sb29rdXAgPSBmdW5jdGlvbiBsb29rdXAobmFtZSkge1xuICAgIHZhciBjYWNoZSA9IHRoaXMuY2FjaGU7XG5cbiAgICB2YXIgdmFsdWU7XG4gICAgaWYgKGNhY2hlLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICB2YWx1ZSA9IGNhY2hlW25hbWVdO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcywgbmFtZXMsIGluZGV4LCBsb29rdXBIaXQgPSBmYWxzZTtcblxuICAgICAgd2hpbGUgKGNvbnRleHQpIHtcbiAgICAgICAgaWYgKG5hbWUuaW5kZXhPZignLicpID4gMCkge1xuICAgICAgICAgIHZhbHVlID0gY29udGV4dC52aWV3O1xuICAgICAgICAgIG5hbWVzID0gbmFtZS5zcGxpdCgnLicpO1xuICAgICAgICAgIGluZGV4ID0gMDtcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIFVzaW5nIHRoZSBkb3Qgbm90aW9uIHBhdGggaW4gYG5hbWVgLCB3ZSBkZXNjZW5kIHRocm91Z2ggdGhlXG4gICAgICAgICAgICogbmVzdGVkIG9iamVjdHMuXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBUbyBiZSBjZXJ0YWluIHRoYXQgdGhlIGxvb2t1cCBoYXMgYmVlbiBzdWNjZXNzZnVsLCB3ZSBoYXZlIHRvXG4gICAgICAgICAgICogY2hlY2sgaWYgdGhlIGxhc3Qgb2JqZWN0IGluIHRoZSBwYXRoIGFjdHVhbGx5IGhhcyB0aGUgcHJvcGVydHlcbiAgICAgICAgICAgKiB3ZSBhcmUgbG9va2luZyBmb3IuIFdlIHN0b3JlIHRoZSByZXN1bHQgaW4gYGxvb2t1cEhpdGAuXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBUaGlzIGlzIHNwZWNpYWxseSBuZWNlc3NhcnkgZm9yIHdoZW4gdGhlIHZhbHVlIGhhcyBiZWVuIHNldCB0b1xuICAgICAgICAgICAqIGB1bmRlZmluZWRgIGFuZCB3ZSB3YW50IHRvIGF2b2lkIGxvb2tpbmcgdXAgcGFyZW50IGNvbnRleHRzLlxuICAgICAgICAgICAqKi9cbiAgICAgICAgICB3aGlsZSAodmFsdWUgIT0gbnVsbCAmJiBpbmRleCA8IG5hbWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGluZGV4ID09PSBuYW1lcy5sZW5ndGggLSAxKVxuICAgICAgICAgICAgICBsb29rdXBIaXQgPSBoYXNQcm9wZXJ0eSh2YWx1ZSwgbmFtZXNbaW5kZXhdKTtcblxuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZVtuYW1lc1tpbmRleCsrXV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHZhbHVlID0gY29udGV4dC52aWV3W25hbWVdO1xuICAgICAgICAgIGxvb2t1cEhpdCA9IGhhc1Byb3BlcnR5KGNvbnRleHQudmlldywgbmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobG9va3VwSGl0KVxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNvbnRleHQgPSBjb250ZXh0LnBhcmVudDtcbiAgICAgIH1cblxuICAgICAgY2FjaGVbbmFtZV0gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpXG4gICAgICB2YWx1ZSA9IHZhbHVlLmNhbGwodGhpcy52aWV3KTtcblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcblxuICAvKipcbiAgICogQSBXcml0ZXIga25vd3MgaG93IHRvIHRha2UgYSBzdHJlYW0gb2YgdG9rZW5zIGFuZCByZW5kZXIgdGhlbSB0byBhXG4gICAqIHN0cmluZywgZ2l2ZW4gYSBjb250ZXh0LiBJdCBhbHNvIG1haW50YWlucyBhIGNhY2hlIG9mIHRlbXBsYXRlcyB0b1xuICAgKiBhdm9pZCB0aGUgbmVlZCB0byBwYXJzZSB0aGUgc2FtZSB0ZW1wbGF0ZSB0d2ljZS5cbiAgICovXG4gIGZ1bmN0aW9uIFdyaXRlcigpIHtcbiAgICB0aGlzLmNhY2hlID0ge307XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIGFsbCBjYWNoZWQgdGVtcGxhdGVzIGluIHRoaXMgd3JpdGVyLlxuICAgKi9cbiAgV3JpdGVyLnByb3RvdHlwZS5jbGVhckNhY2hlID0gZnVuY3Rpb24gY2xlYXJDYWNoZSgpIHtcbiAgICB0aGlzLmNhY2hlID0ge307XG4gIH07XG5cbiAgLyoqXG4gICAqIFBhcnNlcyBhbmQgY2FjaGVzIHRoZSBnaXZlbiBgdGVtcGxhdGVgIGFuZCByZXR1cm5zIHRoZSBhcnJheSBvZiB0b2tlbnNcbiAgICogdGhhdCBpcyBnZW5lcmF0ZWQgZnJvbSB0aGUgcGFyc2UuXG4gICAqL1xuICBXcml0ZXIucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24gcGFyc2UodGVtcGxhdGUsIHRhZ3MpIHtcbiAgICB2YXIgY2FjaGUgPSB0aGlzLmNhY2hlO1xuICAgIHZhciB0b2tlbnMgPSBjYWNoZVt0ZW1wbGF0ZV07XG5cbiAgICBpZiAodG9rZW5zID09IG51bGwpXG4gICAgICB0b2tlbnMgPSBjYWNoZVt0ZW1wbGF0ZV0gPSBwYXJzZVRlbXBsYXRlKHRlbXBsYXRlLCB0YWdzKTtcblxuICAgIHJldHVybiB0b2tlbnM7XG4gIH07XG5cbiAgLyoqXG4gICAqIEhpZ2gtbGV2ZWwgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byByZW5kZXIgdGhlIGdpdmVuIGB0ZW1wbGF0ZWAgd2l0aFxuICAgKiB0aGUgZ2l2ZW4gYHZpZXdgLlxuICAgKlxuICAgKiBUaGUgb3B0aW9uYWwgYHBhcnRpYWxzYCBhcmd1bWVudCBtYXkgYmUgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgdGhlXG4gICAqIG5hbWVzIGFuZCB0ZW1wbGF0ZXMgb2YgcGFydGlhbHMgdGhhdCBhcmUgdXNlZCBpbiB0aGUgdGVtcGxhdGUuIEl0IG1heVxuICAgKiBhbHNvIGJlIGEgZnVuY3Rpb24gdGhhdCBpcyB1c2VkIHRvIGxvYWQgcGFydGlhbCB0ZW1wbGF0ZXMgb24gdGhlIGZseVxuICAgKiB0aGF0IHRha2VzIGEgc2luZ2xlIGFyZ3VtZW50OiB0aGUgbmFtZSBvZiB0aGUgcGFydGlhbC5cbiAgICovXG4gIFdyaXRlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscykge1xuICAgIHZhciB0b2tlbnMgPSB0aGlzLnBhcnNlKHRlbXBsYXRlKTtcbiAgICB2YXIgY29udGV4dCA9ICh2aWV3IGluc3RhbmNlb2YgQ29udGV4dCkgPyB2aWV3IDogbmV3IENvbnRleHQodmlldyk7XG4gICAgcmV0dXJuIHRoaXMucmVuZGVyVG9rZW5zKHRva2VucywgY29udGV4dCwgcGFydGlhbHMsIHRlbXBsYXRlKTtcbiAgfTtcblxuICAvKipcbiAgICogTG93LWxldmVsIG1ldGhvZCB0aGF0IHJlbmRlcnMgdGhlIGdpdmVuIGFycmF5IG9mIGB0b2tlbnNgIHVzaW5nXG4gICAqIHRoZSBnaXZlbiBgY29udGV4dGAgYW5kIGBwYXJ0aWFsc2AuXG4gICAqXG4gICAqIE5vdGU6IFRoZSBgb3JpZ2luYWxUZW1wbGF0ZWAgaXMgb25seSBldmVyIHVzZWQgdG8gZXh0cmFjdCB0aGUgcG9ydGlvblxuICAgKiBvZiB0aGUgb3JpZ2luYWwgdGVtcGxhdGUgdGhhdCB3YXMgY29udGFpbmVkIGluIGEgaGlnaGVyLW9yZGVyIHNlY3Rpb24uXG4gICAqIElmIHRoZSB0ZW1wbGF0ZSBkb2Vzbid0IHVzZSBoaWdoZXItb3JkZXIgc2VjdGlvbnMsIHRoaXMgYXJndW1lbnQgbWF5XG4gICAqIGJlIG9taXR0ZWQuXG4gICAqL1xuICBXcml0ZXIucHJvdG90eXBlLnJlbmRlclRva2VucyA9IGZ1bmN0aW9uIHJlbmRlclRva2Vucyh0b2tlbnMsIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKSB7XG4gICAgdmFyIGJ1ZmZlciA9ICcnO1xuICAgIHZhciB0b2tlbiwgc3ltYm9sLCB2YWx1ZTtcbiAgICBmb3IgKHZhciBpID0gMCwgbnVtVG9rZW5zID0gdG9rZW5zLmxlbmd0aDsgaSA8IG51bVRva2VuczsgKytpKSB7XG4gICAgICB2YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgIHRva2VuID0gdG9rZW5zW2ldO1xuICAgICAgc3ltYm9sID0gdG9rZW5bMF07XG5cbiAgICAgIGlmIChzeW1ib2wgPT09ICcjJykgdmFsdWUgPSB0aGlzLnJlbmRlclNlY3Rpb24odG9rZW4sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgICAgIGVsc2UgaWYgKHN5bWJvbCA9PT0gJ14nKSB2YWx1ZSA9IHRoaXMucmVuZGVySW52ZXJ0ZWQodG9rZW4sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgICAgIGVsc2UgaWYgKHN5bWJvbCA9PT0gJz4nKSB2YWx1ZSA9IHRoaXMucmVuZGVyUGFydGlhbCh0b2tlbiwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xuICAgICAgZWxzZSBpZiAoc3ltYm9sID09PSAnJicpIHZhbHVlID0gdGhpcy51bmVzY2FwZWRWYWx1ZSh0b2tlbiwgY29udGV4dCk7XG4gICAgICBlbHNlIGlmIChzeW1ib2wgPT09ICduYW1lJykgdmFsdWUgPSB0aGlzLmVzY2FwZWRWYWx1ZSh0b2tlbiwgY29udGV4dCk7XG4gICAgICBlbHNlIGlmIChzeW1ib2wgPT09ICd0ZXh0JykgdmFsdWUgPSB0aGlzLnJhd1ZhbHVlKHRva2VuKTtcblxuICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpXG4gICAgICAgIGJ1ZmZlciArPSB2YWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmZmVyO1xuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUucmVuZGVyU2VjdGlvbiA9IGZ1bmN0aW9uIHJlbmRlclNlY3Rpb24odG9rZW4sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBidWZmZXIgPSAnJztcblxuICAgIHZhciB2YWx1ZSA9IGNvbnRleHQubG9va3VwKHRva2VuWzFdKTtcblxuICAgIC8vIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byByZW5kZXIgYW4gYXJiaXRyYXJ5IHRlbXBsYXRlXG4gICAgLy8gaW4gdGhlIGN1cnJlbnQgY29udGV4dCBieSBoaWdoZXItb3JkZXIgc2VjdGlvbnMuXG4gICAgZnVuY3Rpb24gc3ViUmVuZGVyKHRlbXBsYXRlKSB7XG4gICAgICByZXR1cm4gc2VsZi5yZW5kZXIodGVtcGxhdGUsIGNvbnRleHQsIHBhcnRpYWxzKTtcbiAgICB9XG5cbiAgICBpZiAoIXZhbHVlKSByZXR1cm47XG5cbiAgICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIGZvciAodmFyIGogPSAwLCB2YWx1ZUxlbmd0aCA9IHZhbHVlLmxlbmd0aDsgaiA8IHZhbHVlTGVuZ3RoOyArK2opIHtcbiAgICAgICAgaWYgKHZhbHVlW2pdKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZVtqXSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHZhbHVlW2pdWydAaSddID0gajtcbiAgICAgICAgICAgIHZhbHVlW2pdWydAZmlyc3QnXSA9IChqID09PSAwKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBidWZmZXIgKz0gdGhpcy5yZW5kZXJUb2tlbnModG9rZW5bNF0sIGNvbnRleHQucHVzaCh2YWx1ZVtqXSksIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgYnVmZmVyICs9IHRoaXMucmVuZGVyVG9rZW5zKHRva2VuWzRdLCBjb250ZXh0LnB1c2godmFsdWUpLCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgICBpZiAodHlwZW9mIG9yaWdpbmFsVGVtcGxhdGUgIT09ICdzdHJpbmcnKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCB1c2UgaGlnaGVyLW9yZGVyIHNlY3Rpb25zIHdpdGhvdXQgdGhlIG9yaWdpbmFsIHRlbXBsYXRlJyk7XG5cbiAgICAgIC8vIEV4dHJhY3QgdGhlIHBvcnRpb24gb2YgdGhlIG9yaWdpbmFsIHRlbXBsYXRlIHRoYXQgdGhlIHNlY3Rpb24gY29udGFpbnMuXG4gICAgICB2YWx1ZSA9IHZhbHVlLmNhbGwoY29udGV4dC52aWV3LCBvcmlnaW5hbFRlbXBsYXRlLnNsaWNlKHRva2VuWzNdLCB0b2tlbls1XSksIHN1YlJlbmRlcik7XG5cbiAgICAgIGlmICh2YWx1ZSAhPSBudWxsKVxuICAgICAgICBidWZmZXIgKz0gdmFsdWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgYnVmZmVyICs9IHRoaXMucmVuZGVyVG9rZW5zKHRva2VuWzRdLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XG4gICAgfVxuICAgIHJldHVybiBidWZmZXI7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5yZW5kZXJJbnZlcnRlZCA9IGZ1bmN0aW9uIHJlbmRlckludmVydGVkKHRva2VuLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSkge1xuICAgIHZhciB2YWx1ZSA9IGNvbnRleHQubG9va3VwKHRva2VuWzFdKTtcblxuICAgIC8vIFVzZSBKYXZhU2NyaXB0J3MgZGVmaW5pdGlvbiBvZiBmYWxzeS4gSW5jbHVkZSBlbXB0eSBhcnJheXMuXG4gICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qYW5sL211c3RhY2hlLmpzL2lzc3Vlcy8xODZcbiAgICBpZiAoIXZhbHVlIHx8IChpc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPT09IDApKVxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyVG9rZW5zKHRva2VuWzRdLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5yZW5kZXJQYXJ0aWFsID0gZnVuY3Rpb24gcmVuZGVyUGFydGlhbCh0b2tlbiwgY29udGV4dCwgcGFydGlhbHMpIHtcbiAgICBpZiAoIXBhcnRpYWxzKSByZXR1cm47XG5cbiAgICB2YXIgdmFsdWUgPSBpc0Z1bmN0aW9uKHBhcnRpYWxzKSA/IHBhcnRpYWxzKHRva2VuWzFdKSA6IHBhcnRpYWxzW3Rva2VuWzFdXTtcbiAgICBpZiAodmFsdWUgIT0gbnVsbClcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlclRva2Vucyh0aGlzLnBhcnNlKHZhbHVlKSwgY29udGV4dCwgcGFydGlhbHMsIHZhbHVlKTtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLnVuZXNjYXBlZFZhbHVlID0gZnVuY3Rpb24gdW5lc2NhcGVkVmFsdWUodG9rZW4sIGNvbnRleHQpIHtcbiAgICB2YXIgdmFsdWUgPSBjb250ZXh0Lmxvb2t1cCh0b2tlblsxXSk7XG4gICAgaWYgKHZhbHVlICE9IG51bGwpXG4gICAgICByZXR1cm4gdmFsdWU7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5lc2NhcGVkVmFsdWUgPSBmdW5jdGlvbiBlc2NhcGVkVmFsdWUodG9rZW4sIGNvbnRleHQpIHtcbiAgICB2YXIgdmFsdWUgPSBjb250ZXh0Lmxvb2t1cCh0b2tlblsxXSk7XG4gICAgaWYgKHZhbHVlICE9IG51bGwpXG4gICAgICByZXR1cm4gbXVzdGFjaGUuZXNjYXBlKHZhbHVlKTtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLnJhd1ZhbHVlID0gZnVuY3Rpb24gcmF3VmFsdWUodG9rZW4pIHtcbiAgICByZXR1cm4gdG9rZW5bMV07XG4gIH07XG5cbiAgbXVzdGFjaGUubmFtZSA9ICdtdXN0YWNoZS5qcyc7XG4gIG11c3RhY2hlLnZlcnNpb24gPSAnMi4xLjMnO1xuICBtdXN0YWNoZS50YWdzID0gWyd7eycsICd9fSddO1xuXG4gIC8vIEFsbCBoaWdoLWxldmVsIG11c3RhY2hlLiogZnVuY3Rpb25zIHVzZSB0aGlzIHdyaXRlci5cbiAgdmFyIGRlZmF1bHRXcml0ZXIgPSBuZXcgV3JpdGVyKCk7XG5cbiAgLyoqXG4gICAqIENsZWFycyBhbGwgY2FjaGVkIHRlbXBsYXRlcyBpbiB0aGUgZGVmYXVsdCB3cml0ZXIuXG4gICAqL1xuICBtdXN0YWNoZS5jbGVhckNhY2hlID0gZnVuY3Rpb24gY2xlYXJDYWNoZSgpIHtcbiAgICByZXR1cm4gZGVmYXVsdFdyaXRlci5jbGVhckNhY2hlKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFBhcnNlcyBhbmQgY2FjaGVzIHRoZSBnaXZlbiB0ZW1wbGF0ZSBpbiB0aGUgZGVmYXVsdCB3cml0ZXIgYW5kIHJldHVybnMgdGhlXG4gICAqIGFycmF5IG9mIHRva2VucyBpdCBjb250YWlucy4gRG9pbmcgdGhpcyBhaGVhZCBvZiB0aW1lIGF2b2lkcyB0aGUgbmVlZCB0b1xuICAgKiBwYXJzZSB0ZW1wbGF0ZXMgb24gdGhlIGZseSBhcyB0aGV5IGFyZSByZW5kZXJlZC5cbiAgICovXG4gIG11c3RhY2hlLnBhcnNlID0gZnVuY3Rpb24gcGFyc2UodGVtcGxhdGUsIHRhZ3MpIHtcbiAgICByZXR1cm4gZGVmYXVsdFdyaXRlci5wYXJzZSh0ZW1wbGF0ZSwgdGFncyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbmRlcnMgdGhlIGB0ZW1wbGF0ZWAgd2l0aCB0aGUgZ2l2ZW4gYHZpZXdgIGFuZCBgcGFydGlhbHNgIHVzaW5nIHRoZVxuICAgKiBkZWZhdWx0IHdyaXRlci5cbiAgICovXG4gIG11c3RhY2hlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcih0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMpIHtcbiAgICBpZiAodHlwZW9mIHRlbXBsYXRlICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCB0ZW1wbGF0ZSEgVGVtcGxhdGUgc2hvdWxkIGJlIGEgXCJzdHJpbmdcIiAnICsgJ2J1dCBcIicgKyB0eXBlU3RyKHRlbXBsYXRlKSArICdcIiB3YXMgZ2l2ZW4gYXMgdGhlIGZpcnN0ICcgKyAnYXJndW1lbnQgZm9yIG11c3RhY2hlI3JlbmRlcih0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMpJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlZmF1bHRXcml0ZXIucmVuZGVyKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscyk7XG4gIH07XG5cbiAgLy8gVGhpcyBpcyBoZXJlIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSB3aXRoIDAuNC54LixcbiAgLyplc2xpbnQtZGlzYWJsZSAqLyAvLyBlc2xpbnQgd2FudHMgY2FtZWwgY2FzZWQgZnVuY3Rpb24gbmFtZVxuICBtdXN0YWNoZS50b19odG1sID0gZnVuY3Rpb24gdG9faHRtbCh0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMsIHNlbmQpIHtcbiAgICAvKmVzbGludC1lbmFibGUqL1xuXG4gICAgdmFyIHJlc3VsdCA9IG11c3RhY2hlLnJlbmRlcih0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMpO1xuXG4gICAgaWYgKGlzRnVuY3Rpb24oc2VuZCkpIHtcbiAgICAgIHNlbmQocmVzdWx0KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfTtcblxuICAvLyBFeHBvcnQgdGhlIGVzY2FwaW5nIGZ1bmN0aW9uIHNvIHRoYXQgdGhlIHVzZXIgbWF5IG92ZXJyaWRlIGl0LlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2phbmwvbXVzdGFjaGUuanMvaXNzdWVzLzI0NFxuICBtdXN0YWNoZS5lc2NhcGUgPSBlc2NhcGVIdG1sO1xuXG4gIC8vIEV4cG9ydCB0aGVzZSBtYWlubHkgZm9yIHRlc3RpbmcsIGJ1dCBhbHNvIGZvciBhZHZhbmNlZCB1c2FnZS5cbiAgbXVzdGFjaGUuU2Nhbm5lciA9IFNjYW5uZXI7XG4gIG11c3RhY2hlLkNvbnRleHQgPSBDb250ZXh0O1xuICBtdXN0YWNoZS5Xcml0ZXIgPSBXcml0ZXI7XG5cbn0pKTtcblxuZXhwb3J0IGRlZmF1bHQgQVg2Lm11c3RhY2hlO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9zcmMvQVg2TXVzdGFjaGUuanMiLCJpbXBvcnQgalF1ZXJ5IGZyb20gXCJqcW1pblwiO1xuaW1wb3J0IEFYNlVJQ29yZSBmcm9tIFwiLi9BWDZVSUNvcmVcIjtcbmltcG9ydCBpbmZvIGZyb20gXCIuL0FYNkluZm9cIjtcbmltcG9ydCBVIGZyb20gXCIuL0FYNlV0aWxcIjtcbmltcG9ydCBtdXN0YWNoZSBmcm9tIFwiLi9BWDZNdXN0YWNoZVwiO1xuLyogfn5+fn5+fn5+fn5+fn5+fn5+IGVuZCBvZiBpbXBvcnQgIH5+fn5+fn5+fn5+fn5+fn5+fn5+ICovXG5cbmNvbnN0IGZyYW1lVG1wbCA9IGZ1bmN0aW9uIChjb2x1bW5LZXlzKSB7XG4gIHJldHVybiBgXG48ZGl2IGRhdGEtYXg2dWktcGFsZXR0ZT1cIlwiPlxuPGRpdiBkYXRhLWF4NnBhbGV0dGUtY29udGFpbmVyPVwicm9vdFwiPlxuICAgIDxkaXYgZGF0YS1heDZwYWxldHRlLWNvbnRhaW5lcj1cImNvbG9yc1wiPjwvZGl2PlxuICAgIDxkaXYgZGF0YS1heDZwYWxldHRlLWNvbnRhaW5lcj1cImNvbnRyb2xzXCI+PC9kaXY+XG48L2Rpdj5cbjwvZGl2PlxuYDtcbn07XG5jb25zdCBjb2xvcnNUbXBsID0gZnVuY3Rpb24gKGNvbHVtbktleXMpIHtcbiAgcmV0dXJuIGBcbnt7I2NvbG9yc319XG57eyNsaXN0fX1cbjxkaXYgZGF0YS1heDZwYWxldHRlLWNvbG9yPVwie3tsYWJlbH19XCIgZGF0YS1heDZwYWxldHRlLWNvbG9yLWluZGV4PVwie3tAaX19XCI+XG4gICAgPGRpdiBkYXRhLXBhbmVsPVwiY29sb3ItcHJldmlld1wiIHN0eWxlPVwicGFkZGluZzp7e3ByZXZpZXcuY2VsbFBhZGRpbmd9fXB4O3dpZHRoOnt7cHJldmlldy5jZWxsV2lkdGh9fXB4O1wiPlxuICAgICAgICA8ZGl2IGRhdGEtcGFuZWw9XCJjb2xvci1ib3hcIiBzdHlsZT1cIndpZHRoOnt7cHJldmlldy53aWR0aH19cHg7aGVpZ2h0Ont7cHJldmlldy5oZWlnaHR9fXB4O1wiPjxkaXYgZGF0YS1wYW5lbD1cImNvbG9yXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOnt7dmFsdWV9fTtcIj48L2Rpdj48L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGRhdGEtcGFuZWw9XCJjb2xvci1sYWJlbFwiIHN0eWxlPVwid2lkdGg6e3tsYWJlbC53aWR0aH19cHg7XCI+e3tsYWJlbH19PC9kaXY+XG4gICAgPGRpdiBkYXRhLXBhbmVsPVwiY29sb3Itc2xpZGVyXCI+XG4gICAgICAgIDxkaXYgZGF0YS1wYW5lbD1cImNvbG9yLXRyYWNrXCIgc3R5bGU9XCJoZWlnaHQ6e3tzbGlkZXIudHJhY2tIZWlnaHR9fXB4O2JhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywge3tfY29sb3IwdmFsdWV9fSwge3tfY29sb3IxdmFsdWV9fSwge3tfY29sb3IydmFsdWV9fSk7IFwiPlxuICAgICAgICAgICAgPGRpdiBkYXRhLXBhbmVsPVwiY29sb3ItaGFuZGxlXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLXBhbmVsPVwiY29sb3ItaGFuZGxlLWFmdGVyXCIgc3R5bGU9XCJ3aWR0aDp7e3NsaWRlci5oYW5kbGVXaWR0aH19cHg7aGVpZ2h0Ont7c2xpZGVyLmhhbmRsZVdpZHRofX1weDtsZWZ0Ont7c2xpZGVyLmhhbmRsZUxlZnR9fXB4O3RvcDp7e3NsaWRlci5oYW5kbGVMZWZ0fX1weDtcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2Plxue3svbGlzdH19XG57ey9jb2xvcnN9fVxuYDtcbn07XG5jb25zdCBFTk0gPSB7XG4gIFwibW91c2Vkb3duXCI6IChpbmZvLnN1cHBvcnRUb3VjaCkgPyBcInRvdWNoc3RhcnRcIiA6IFwibW91c2Vkb3duXCIsXG4gIFwibW91c2Vtb3ZlXCI6IChpbmZvLnN1cHBvcnRUb3VjaCkgPyBcInRvdWNobW92ZVwiIDogXCJtb3VzZW1vdmVcIixcbiAgXCJtb3VzZXVwXCI6IChpbmZvLnN1cHBvcnRUb3VjaCkgPyBcInRvdWNoZW5kXCIgOiBcIm1vdXNldXBcIlxufTtcbmNvbnN0IG9uU3RhdGVDaGFuZ2VkID0gZnVuY3Rpb24gKG9wdHMsIHRoYXQpIHtcbiAgaWYgKG9wdHMgJiYgb3B0cy5vblN0YXRlQ2hhbmdlZCkge1xuICAgIG9wdHMub25TdGF0ZUNoYW5nZWQuY2FsbCh0aGF0LCB0aGF0KTtcbiAgfVxuICBlbHNlIGlmICh0aGlzLm9uU3RhdGVDaGFuZ2VkKSB7XG4gICAgdGhpcy5vblN0YXRlQ2hhbmdlZC5jYWxsKHRoYXQsIHRoYXQpO1xuICB9XG5cbiAgdGhhdCA9IG51bGw7XG59O1xuY29uc3QgZ2V0TW91c2VQb3NpdGlvbiA9IGZ1bmN0aW9uIChlKSB7XG4gIGxldCBtb3VzZU9iaiwgb3JpZ2luYWxFdmVudCA9IChlLm9yaWdpbmFsRXZlbnQpID8gZS5vcmlnaW5hbEV2ZW50IDogZTtcbiAgbW91c2VPYmogPSAoJ2NoYW5nZWRUb3VjaGVzJyBpbiBvcmlnaW5hbEV2ZW50ICYmIG9yaWdpbmFsRXZlbnQuY2hhbmdlZFRvdWNoZXMpID8gb3JpZ2luYWxFdmVudC5jaGFuZ2VkVG91Y2hlc1swXSA6IG9yaWdpbmFsRXZlbnQ7XG4gIC8vIGNsaWVudFgsIFkg7JOw66m0IOyKpO2BrOuhpOyXkOyEnCDrrLjsoJwg67Cc7IOdXG4gIHJldHVybiB7XG4gICAgY2xpZW50WDogbW91c2VPYmoucGFnZVgsXG4gICAgY2xpZW50WTogbW91c2VPYmoucGFnZVlcbiAgfVxufTtcbmNvbnN0IGJpbmRIYW5kbGUgPSBmdW5jdGlvbiAoaXRlbSkge1xuICBpdGVtLm9yaWdpbmFsVHJhY2tXaWR0aCA9IGl0ZW0uJHRyYWNrLndpZHRoKCk7XG4gIGl0ZW0udHJhY2tXaWR0aCA9IGl0ZW0ub3JpZ2luYWxUcmFja1dpZHRoIC0gKHRoaXMuY29uZmlnLmNvbG9ycy5zbGlkZXIuaGFuZGxlV2lkdGggLyA1KTtcbiAgbGV0IGhhbmRsZUxlZnQgPSBhbW91bnRUb0hhbmRsZUxlZnQuY2FsbCh0aGlzLCBpdGVtLCBpdGVtLl9hbW91bnQpO1xuXG4gIC8vIGhhbmRsZUxlZnQg6rCAIOuylOychOulvCDrspfslrTrgpjrqbQ/XG4gIGlmIChoYW5kbGVMZWZ0IDwgMCB8fCBoYW5kbGVMZWZ0ID4gaXRlbS50cmFja1dpZHRoKSB7XG4gICAgbGV0IGFtb3VudDtcbiAgICBoYW5kbGVMZWZ0ID0gaGFuZGxlTGVmdCA8IDAgPyAwIDogaGFuZGxlTGVmdCA+IGl0ZW0udHJhY2tXaWR0aCA/IGl0ZW0udHJhY2tXaWR0aCA6IGhhbmRsZUxlZnQ7XG4gICAgYW1vdW50ID0gaGFuZGxlTGVmdFRvQW1vdW50LmNhbGwodGhpcywgaXRlbSwgaGFuZGxlTGVmdCk7XG4gICAgdXBkYXRlUHJldmlld0NvbG9yLmNhbGwodGhpcywgaXRlbSwgYW1vdW50VG9Db2xvci5jYWxsKHRoaXMsIGl0ZW0sIGFtb3VudCkpO1xuICB9XG5cbiAgaXRlbS4kaGFuZGxlLmNzcyh7bGVmdDogaGFuZGxlTGVmdH0pO1xuICBpdGVtLiRpdGVtXG4gICAgLm9mZihFTk1bXCJtb3VzZWRvd25cIl0pXG4gICAgLm9uKEVOTVtcIm1vdXNlZG93blwiXSwgJ1tkYXRhLXBhbmVsPVwiY29sb3ItaGFuZGxlXCJdJywgKGUpID0+IHtcbiAgICAgIGxldCBtb3VzZU9iaiA9IGdldE1vdXNlUG9zaXRpb24oZSk7XG4gICAgICBpdGVtLl9vcmlnaW5hbEhhbmRsZUNsaWVudFggPSBtb3VzZU9iai5jbGllbnRYO1xuICAgICAgaXRlbS5fb3JpZ2luYWxIYW5kbGVMZWZ0ID0gaXRlbS4kaGFuZGxlLnBvc2l0aW9uKCkubGVmdDtcbiAgICAgIGhhbmRsZU1vdmVFdmVudC5vbi5jYWxsKHRoaXMsIGl0ZW0pO1xuICAgICAgVS5zdG9wRXZlbnQoZS5vcmlnaW5hbEV2ZW50KTtcbiAgICB9KVxuICAgIC5vZmYoXCJjbGlja1wiKVxuICAgIC5vbihcImNsaWNrXCIsICdbZGF0YS1wYW5lbD1cImNvbG9yLWxhYmVsXCJdLCBbZGF0YS1wYW5lbD1cImNvbG9yLXByZXZpZXdcIl0nLCAoZSkgPT4ge1xuICAgICAgaWYgKHRoaXMub25DbGljaykge1xuICAgICAgICB0aGlzLm9uQ2xpY2suY2FsbChpdGVtLCAnIycgKyBpdGVtLl9zZWxlY3RlZENvbG9yLnRvVXBwZXJDYXNlKCksIGUpO1xuICAgICAgfVxuICAgIH0pXG4gICAgLm9uKFwiY2xpY2tcIiwgJ1tkYXRhLXBhbmVsPVwiY29sb3ItdHJhY2tcIl0nLCAoZSkgPT4ge1xuICAgICAgaWYgKGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtcGFuZWxcIikgPT0gXCJjb2xvci10cmFja1wiKSB7XG4gICAgICAgIGxldCBtb3VzZU9iaiA9IGdldE1vdXNlUG9zaXRpb24oZSksXG4gICAgICAgICAgbmV3SGFuZGxlTGVmdCA9IG1vdXNlT2JqLmNsaWVudFggLSBpdGVtLiR0cmFjay5vZmZzZXQoKS5sZWZ0LFxuICAgICAgICAgIGFtb3VudCA9IGhhbmRsZUxlZnRUb0Ftb3VudChpdGVtLCBuZXdIYW5kbGVMZWZ0KTtcblxuICAgICAgICBpdGVtLiRoYW5kbGUuY3NzKHtsZWZ0OiBuZXdIYW5kbGVMZWZ0fSk7XG4gICAgICAgIHVwZGF0ZVByZXZpZXdDb2xvci5jYWxsKHRoaXMsIGl0ZW0sIGFtb3VudFRvQ29sb3IuY2FsbCh0aGlzLCBpdGVtLCBhbW91bnQpLCBlKTtcblxuICAgICAgICBtb3VzZU9iaiA9IG51bGw7XG4gICAgICAgIG5ld0hhbmRsZUxlZnQgPSBudWxsO1xuICAgICAgICBhbW91bnQgPSBudWxsO1xuICAgICAgfVxuICAgIH0pO1xufTtcbmNvbnN0IHVwZGF0ZVByZXZpZXdDb2xvciA9IGZ1bmN0aW9uIChpdGVtLCBjb2xvciwgZXZlbnQpIHtcbiAgaXRlbS4kcHJldmlld1xuICAgIC5jc3Moe1wiYmFja2dyb3VuZC1jb2xvclwiOiAnIycgKyBjb2xvcn0pO1xuICBpdGVtLiRsYWJlbC5odG1sKCcjJyArIGNvbG9yLnRvVXBwZXJDYXNlKCkpO1xuICBpdGVtLl9zZWxlY3RlZENvbG9yID0gY29sb3I7XG5cbiAgaWYgKGV2ZW50ICYmIHRoaXMub25VcGRhdGVDb2xvcikge1xuICAgIHRoaXMub25VcGRhdGVDb2xvci5jYWxsKGl0ZW0sICcjJyArIGl0ZW0uX3NlbGVjdGVkQ29sb3IudG9VcHBlckNhc2UoKSk7XG4gIH1cbn07XG5jb25zdCBhbW91bnRUb0NvbG9yID0gZnVuY3Rpb24gKGl0ZW0sIGFtb3VudCkge1xuICBjb25zdCBwcm9jZXNzb3IgPSB7XG4gICAgXCJibGFja1wiKF9jb2xvciwgX2Ftb3VudCkge1xuICAgICAgcmV0dXJuIF9jb2xvci5saWdodGVuKHRoaXMuY29uZmlnLmNvbG9ycy5zbGlkZXIuYW1vdW50IC8gMikuZGFya2VuKF9hbW91bnQpLmdldEhleFZhbHVlKCk7XG4gICAgfSxcbiAgICBcIndoaXRlXCIoX2NvbG9yLCBfYW1vdW50KSB7XG4gICAgICByZXR1cm4gX2NvbG9yLmRhcmtlbih0aGlzLmNvbmZpZy5jb2xvcnMuc2xpZGVyLmFtb3VudCAvIDIpLmRhcmtlbihfYW1vdW50KS5nZXRIZXhWYWx1ZSgpO1xuICAgIH0sXG4gICAgXCJub3JtYWxcIihfY29sb3IsIF9hbW91bnQpIHtcbiAgICAgIHJldHVybiBfY29sb3IuZGFya2VuKF9hbW91bnQpLmdldEhleFZhbHVlKCk7XG4gICAgfVxuICB9O1xuXG4gIGlmIChpdGVtLl91bmlxQ29sb3IgaW4gcHJvY2Vzc29yKSB7XG4gICAgcmV0dXJuIHByb2Nlc3NvcltpdGVtLl91bmlxQ29sb3JdLmNhbGwodGhpcywgaXRlbS5fY29sb3IsIGFtb3VudCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHByb2Nlc3NvcltcIm5vcm1hbFwiXS5jYWxsKHRoaXMsIGl0ZW0uX2NvbG9yLCBhbW91bnQpO1xuICB9XG59O1xuY29uc3QgY29sb3JUb0Ftb3VudCA9IGZ1bmN0aW9uIChpdGVtLCBjb2xvcikge1xuICAvLy8gdG9kbyA6IOyDieyDgeyXkCDqsIDquYzsmrQg7IOJIO2RnO2YhC5cbiAgY29uc3QgcHJvY2Vzc29yID0ge1xuICAgIFwiYmxhY2tcIihfY29sb3IsIF9kaWZmQ29sb3IpIHtcbiAgICAgIGxldCBjb2xvcjEgPSBfY29sb3IubGlnaHRlbih0aGlzLmNvbmZpZy5jb2xvcnMuc2xpZGVyLmFtb3VudCAvIDIpO1xuICAgICAgcmV0dXJuIChjb2xvcjEuZ2V0SHNsKCkubCAtIF9kaWZmQ29sb3IuZ2V0SHNsKCkubCkgKiAxMDA7XG4gICAgfSxcbiAgICBcIndoaXRlXCIoX2NvbG9yLCBfZGlmZkNvbG9yKSB7XG4gICAgICBsZXQgY29sb3IxID0gX2NvbG9yLmRhcmtlbih0aGlzLmNvbmZpZy5jb2xvcnMuc2xpZGVyLmFtb3VudCAvIDIpO1xuICAgICAgcmV0dXJuIChjb2xvcjEuZ2V0SHNsKCkubCAtIF9kaWZmQ29sb3IuZ2V0SHNsKCkubCkgKiAxMDA7XG4gICAgfSxcbiAgICBcIm5vcm1hbFwiKF9jb2xvciwgX2RpZmZDb2xvcikge1xuICAgICAgcmV0dXJuIChfY29sb3IuZ2V0SHNsKCkubCAtIF9kaWZmQ29sb3IuZ2V0SHNsKCkubCkgKiAxMDA7XG4gICAgfVxuICB9O1xuXG4gIGlmIChpdGVtLl91bmlxQ29sb3IgaW4gcHJvY2Vzc29yKSB7XG4gICAgcmV0dXJuIHByb2Nlc3NvcltpdGVtLl91bmlxQ29sb3JdLmNhbGwodGhpcywgaXRlbS5fY29sb3IsIGNvbG9yKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcHJvY2Vzc29yW1wibm9ybWFsXCJdLmNhbGwodGhpcywgaXRlbS5fY29sb3IsIGNvbG9yKTtcbiAgfVxufTtcbmNvbnN0IGhhbmRsZUxlZnRUb0Ftb3VudCA9IGZ1bmN0aW9uIChpdGVtLCBoYW5kbGVMZWZ0KSB7XG4gIHJldHVybiB0aGlzLmNvbmZpZy5jb2xvcnMuc2xpZGVyLmFtb3VudCAqIChoYW5kbGVMZWZ0IC0gKGl0ZW0udHJhY2tXaWR0aCAvIDIpKSAvIChpdGVtLm9yaWdpbmFsVHJhY2tXaWR0aCAvIDIpXG59O1xuY29uc3QgYW1vdW50VG9IYW5kbGVMZWZ0ID0gZnVuY3Rpb24gKGl0ZW0sIGFtb3VudCkge1xuICByZXR1cm4gKGFtb3VudCAqIChpdGVtLm9yaWdpbmFsVHJhY2tXaWR0aCAvIDIpIC8gdGhpcy5jb25maWcuY29sb3JzLnNsaWRlci5hbW91bnQpICsgKGl0ZW0udHJhY2tXaWR0aCAvIDIpXG59O1xuY29uc3QgaGFuZGxlTW92ZUV2ZW50ID0ge1xuICBcIm9uXCIoaXRlbSkge1xuICAgIGpRdWVyeShkb2N1bWVudC5ib2R5KVxuICAgICAgLm9uKEVOTVtcIm1vdXNlbW92ZVwiXSArIFwiLmF4NnBhbGV0dGUtXCIgKyB0aGlzLmluc3RhbmNlSWQsIChlKSA9PiB7XG4gICAgICAgIGxldCBtb3VzZU9iaiA9IGdldE1vdXNlUG9zaXRpb24oZSksXG4gICAgICAgICAgZGEgPSBtb3VzZU9iai5jbGllbnRYIC0gaXRlbS5fb3JpZ2luYWxIYW5kbGVDbGllbnRYLFxuICAgICAgICAgIG5ld0hhbmRsZUxlZnQgPSBpdGVtLl9vcmlnaW5hbEhhbmRsZUxlZnQgKyBkYSxcbiAgICAgICAgICBhbW91bnQ7XG5cbiAgICAgICAgbmV3SGFuZGxlTGVmdCA9IG5ld0hhbmRsZUxlZnQgPCAwID8gMCA6IG5ld0hhbmRsZUxlZnQgPiBpdGVtLnRyYWNrV2lkdGggPyBpdGVtLnRyYWNrV2lkdGggOiBuZXdIYW5kbGVMZWZ0O1xuICAgICAgICBpdGVtLiRoYW5kbGUuY3NzKHtsZWZ0OiBuZXdIYW5kbGVMZWZ0fSk7XG4gICAgICAgIGFtb3VudCA9IGhhbmRsZUxlZnRUb0Ftb3VudC5jYWxsKHRoaXMsIGl0ZW0sIG5ld0hhbmRsZUxlZnQpO1xuXG4gICAgICAgIHVwZGF0ZVByZXZpZXdDb2xvci5jYWxsKHRoaXMsIGl0ZW0sIGFtb3VudFRvQ29sb3IuY2FsbCh0aGlzLCBpdGVtLCBhbW91bnQpLCBlKTtcblxuICAgICAgICBtb3VzZU9iaiA9IG51bGw7XG4gICAgICAgIGRhID0gbnVsbDtcbiAgICAgIH0pXG4gICAgICAub24oRU5NW1wibW91c2V1cFwiXSArIFwiLmF4NnBhbGV0dGUtXCIgKyB0aGlzLmluc3RhbmNlSWQsIChlKSA9PiB7XG4gICAgICAgIGhhbmRsZU1vdmVFdmVudC5vZmYuY2FsbCh0aGlzKTtcbiAgICAgICAgVS5zdG9wRXZlbnQoZSk7XG4gICAgICB9KVxuICAgICAgLm9uKFwibW91c2VsZWF2ZS5heDZwYWxldHRlLVwiICsgdGhpcy5pbnN0YW5jZUlkLCAoZSkgPT4ge1xuICAgICAgICBoYW5kbGVNb3ZlRXZlbnQub2ZmLmNhbGwodGhpcyk7XG4gICAgICAgIFUuc3RvcEV2ZW50KGUpO1xuICAgICAgfSk7XG5cbiAgICBqUXVlcnkoZG9jdW1lbnQuYm9keSlcbiAgICAgIC5hdHRyKCd1bnNlbGVjdGFibGUnLCAnb24nKVxuICAgICAgLmNzcygndXNlci1zZWxlY3QnLCAnbm9uZScpXG4gICAgICAub24oJ3NlbGVjdHN0YXJ0JywgZmFsc2UpO1xuICB9LFxuICBcIm9mZlwiKCkge1xuICAgIHRoaXMueHZhci5yZXNpemVyTGl2ZWQgPSBmYWxzZTtcblxuICAgIGpRdWVyeShkb2N1bWVudC5ib2R5KVxuICAgICAgLm9mZihFTk1bXCJtb3VzZW1vdmVcIl0gKyBcIi5heDZwYWxldHRlLVwiICsgdGhpcy5pbnN0YW5jZUlkKVxuICAgICAgLm9mZihFTk1bXCJtb3VzZXVwXCJdICsgXCIuYXg2cGFsZXR0ZS1cIiArIHRoaXMuaW5zdGFuY2VJZClcbiAgICAgIC5vZmYoXCJtb3VzZWxlYXZlLmF4NnBhbGV0dGUtXCIgKyB0aGlzLmluc3RhbmNlSWQpO1xuXG4gICAgalF1ZXJ5KGRvY3VtZW50LmJvZHkpXG4gICAgICAucmVtb3ZlQXR0cigndW5zZWxlY3RhYmxlJylcbiAgICAgIC5jc3MoJ3VzZXItc2VsZWN0JywgJ2F1dG8nKVxuICAgICAgLm9mZignc2VsZWN0c3RhcnQnKTtcbiAgfVxufTtcbmNvbnN0IHJlcGFpbnQgPSBmdW5jdGlvbiAoc2VsZWN0ZWRDb2xvcikge1xuICBsZXQgYm94ID0ge1xuICAgIHdpZHRoOiB0aGlzLiR0YXJnZXQuaW5uZXJXaWR0aCgpLFxuICAgIGhlaWdodDogdGhpcy4kdGFyZ2V0LmlubmVySGVpZ2h0KCksXG4gIH07XG5cbiAgLy8g7Yyo64SQIO2UhOugiOyehCDstIjquLDtmZRcbiAgdGhpcy4kdGFyZ2V0Lmh0bWwobXVzdGFjaGUucmVuZGVyKGZyYW1lVG1wbC5jYWxsKHRoaXMpLCB7fSwgdGhpcy5jb25maWcuY29sdW1uS2V5cykpO1xuXG5cbiAgLy8g6rCBIO2MqOuEkOuTpOydhCDsupDsi7F+XG4gIHRoaXMuJCA9IHtcbiAgICBcInJvb3RcIjogdGhpcy4kdGFyZ2V0LmZpbmQoJ1tkYXRhLWF4NnBhbGV0dGUtY29udGFpbmVyPVwicm9vdFwiXScpLFxuICAgIFwiY29sb3JzXCI6IHRoaXMuJHRhcmdldC5maW5kKCdbZGF0YS1heDZwYWxldHRlLWNvbnRhaW5lcj1cImNvbG9yc1wiXScpLFxuICAgIFwiY29udHJvbHNcIjogdGhpcy4kdGFyZ2V0LmZpbmQoJ1tkYXRhLWF4NnBhbGV0dGUtY29udGFpbmVyPVwiY29udHJvbHNcIl0nKSxcbiAgfTtcblxuICAvLyB0b2RvIDogY29udHJvbHMg64KY7KSR7JeQIOqzoOuvvO2VmOyXrCDqtaztmIRcbiAgLy8gdGhpcy4kW1wiY29udHJvbHNcIl0uY3NzKHtoZWlnaHQ6IHRoaXMuY29uZmlnLmNvbnRyb2xzLmhlaWdodH0pO1xuXG4gIC8vLyBjb2xvcnMubGlzdCDsg4nsg4Eg67KU7JyEIOqysOyglSAvIOy0iOq4sO2ZlFxuICB0aGlzLmNvbmZpZy5jb2xvcnMubGlzdC5mb3JFYWNoKChjKSA9PiB7XG4gICAgYy5fY29sb3IgPSBVLmNvbG9yKGMudmFsdWUpO1xuICAgIGMuX3NlbGVjdGVkQ29sb3IgPSBjLl9jb2xvci5nZXRIZXhWYWx1ZSgpO1xuICAgIGlmIChjLl9jb2xvci5yID09IDAgJiYgYy5fY29sb3IuZyA9PSAwICYmIGMuX2NvbG9yLmIgPT0gMCkge1xuICAgICAgYy5fYW1vdW50ID0gdGhpcy5jb25maWcuY29sb3JzLnNsaWRlci5hbW91bnQ7XG4gICAgICBjLl91bmlxQ29sb3IgPSBcImJsYWNrXCI7XG4gICAgICBjLl9jb2xvcjB2YWx1ZSA9IFwiI1wiICsgYy5fY29sb3IubGlnaHRlbih0aGlzLmNvbmZpZy5jb2xvcnMuc2xpZGVyLmFtb3VudCkuZ2V0SGV4VmFsdWUoKTtcbiAgICAgIGMuX2NvbG9yMXZhbHVlID0gXCIjXCIgKyBjLl9jb2xvci5saWdodGVuKHRoaXMuY29uZmlnLmNvbG9ycy5zbGlkZXIuYW1vdW50IC8gMikuZ2V0SGV4VmFsdWUoKTtcbiAgICAgIGMuX2NvbG9yMnZhbHVlID0gXCIjXCIgKyBjLl9jb2xvci5nZXRIZXhWYWx1ZSgpO1xuICAgIH0gZWxzZSBpZiAoYy5fY29sb3IuciA9PSAyNTUgJiYgYy5fY29sb3IuZyA9PSAyNTUgJiYgYy5fY29sb3IuYiA9PSAyNTUpIHtcbiAgICAgIGMuX2Ftb3VudCA9IC10aGlzLmNvbmZpZy5jb2xvcnMuc2xpZGVyLmFtb3VudDtcbiAgICAgIGMuX3VuaXFDb2xvciA9IFwid2hpdGVcIjtcbiAgICAgIGMuX2NvbG9yMHZhbHVlID0gXCIjXCIgKyBjLl9jb2xvci5nZXRIZXhWYWx1ZSgpO1xuICAgICAgYy5fY29sb3IxdmFsdWUgPSBcIiNcIiArIGMuX2NvbG9yLmRhcmtlbih0aGlzLmNvbmZpZy5jb2xvcnMuc2xpZGVyLmFtb3VudCAvIDIpLmdldEhleFZhbHVlKCk7XG4gICAgICBjLl9jb2xvcjJ2YWx1ZSA9IFwiI1wiICsgYy5fY29sb3IuZGFya2VuKHRoaXMuY29uZmlnLmNvbG9ycy5zbGlkZXIuYW1vdW50KS5nZXRIZXhWYWx1ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjLl9hbW91bnQgPSAwO1xuICAgICAgYy5fY29sb3IwdmFsdWUgPSBcIiNcIiArIGMuX2NvbG9yLmxpZ2h0ZW4odGhpcy5jb25maWcuY29sb3JzLnNsaWRlci5hbW91bnQpLmdldEhleFZhbHVlKCk7XG4gICAgICBjLl9jb2xvcjF2YWx1ZSA9IFwiI1wiICsgYy5fY29sb3IuZ2V0SGV4VmFsdWUoKTtcbiAgICAgIGMuX2NvbG9yMnZhbHVlID0gXCIjXCIgKyBjLl9jb2xvci5kYXJrZW4odGhpcy5jb25maWcuY29sb3JzLnNsaWRlci5hbW91bnQpLmdldEhleFZhbHVlKCk7XG4gICAgfVxuICB9KTtcblxuICAvLyDsg4nsg53sobDsoIgg7ZW465Ok7J2YIOychOy5mCDsobDsoJV0aGlzLmNvbmZpZy5jb2xvcnMubGlzdFttaW5EaWZmQ29sb3JJbmRleF1cbiAgdGhpcy5jb25maWcuY29sb3JzLnNsaWRlci5oYW5kbGVMZWZ0ID0gLXRoaXMuY29uZmlnLmNvbG9ycy5zbGlkZXIuaGFuZGxlV2lkdGggLyAyO1xuICB0aGlzLmNvbmZpZy5jb2xvcnMuc2xpZGVyLmhhbmRsZVRvcCA9IC10aGlzLmNvbmZpZy5jb2xvcnMuc2xpZGVyLmhhbmRsZUhlaWdodCAvIDI7XG5cbiAgLy8g7YyU66Cb7Yq4IOy7rOufrCDtjKjrhJAg7LSI6riw7ZmUXG4gIHRoaXMuJFtcImNvbG9yc1wiXS5odG1sKG11c3RhY2hlLnJlbmRlcihjb2xvcnNUbXBsLmNhbGwodGhpcyksIHRoaXMuY29uZmlnLCB0aGlzLmNvbmZpZy5jb2x1bW5LZXlzKSk7XG5cbiAgdGhpcy4kW1wiY29sb3JzXCJdLmZpbmQoJ1tkYXRhLWF4NnBhbGV0dGUtY29sb3ItaW5kZXhdJykuZWFjaCgoZWxJZHgsIGVsKSA9PiB7XG4gICAgbGV0IGlkeCA9IGVsLmdldEF0dHJpYnV0ZShcImRhdGEtYXg2cGFsZXR0ZS1jb2xvci1pbmRleFwiKTtcbiAgICBsZXQgY29sb3IgPSB0aGlzLmNvbmZpZy5jb2xvcnMubGlzdFtpZHhdO1xuICAgIGxldCBpdGVtID0galF1ZXJ5LmV4dGVuZCh7fSwgY29sb3IpO1xuICAgIGl0ZW0uX2luZGV4ID0gaWR4O1xuICAgIGl0ZW0uJGl0ZW0gPSBqUXVlcnkoZWwpO1xuICAgIGl0ZW0uJHByZXZpZXcgPSBpdGVtLiRpdGVtLmZpbmQoJ1tkYXRhLXBhbmVsPVwiY29sb3JcIl0nKTtcbiAgICBpdGVtLiRsYWJlbCA9IGl0ZW0uJGl0ZW0uZmluZCgnW2RhdGEtcGFuZWw9XCJjb2xvci1sYWJlbFwiXScpO1xuICAgIGl0ZW0uJHRyYWNrID0gaXRlbS4kaXRlbS5maW5kKCdbZGF0YS1wYW5lbD1cImNvbG9yLXRyYWNrXCJdJyk7XG4gICAgaXRlbS4kaGFuZGxlID0gaXRlbS4kaXRlbS5maW5kKCdbZGF0YS1wYW5lbD1cImNvbG9yLWhhbmRsZVwiXScpO1xuICAgIGJpbmRIYW5kbGUuY2FsbCh0aGlzLCBpdGVtKTtcbiAgICAvLy8vL1xuICAgIHRoaXMuY29sb3JzLnB1c2goaXRlbSk7XG4gIH0pO1xuXG4gIGlmIChzZWxlY3RlZENvbG9yKSB7XG4gICAgdGhpcy5zZXRTZWxlY3RlZENvbG9yKHNlbGVjdGVkQ29sb3IpO1xuICB9XG59O1xuLyogfn5+fn5+fn5+fn5+fn5+fn5+IGVuZCBvZiBwcml2YXRlICB+fn5+fn5+fn5+fn5+fn5+fn5+fiAqL1xuXG4vKipcbiAqIEBjbGFzc1xuICovXG5jbGFzcyBBWDZVSVBhbGV0dGUgZXh0ZW5kcyBBWDZVSUNvcmUge1xuICAvKipcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBjb25maWdcbiAgICogQHBhcmFtIFtjb25maWcudGhlbWVdXG4gICAqIEBwYXJhbSBjb25maWcudGFyZ2V0XG4gICAqIEBwYXJhbSBbY29uZmlnLmFuaW1hdGVUaW1lXVxuICAgKiBAcGFyYW0ge1N0cmluZ30gW2NvbmZpZy5zZWxlY3RlZENvbG9yXVxuICAgKiBAcGFyYW0ge09iamVjdH0gW2NvbmZpZy5jb2xvcnNdXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbY29uZmlnLmNvbG9ycy5wcmV2aWV3XVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2NvbmZpZy5jb2xvcnMucHJldmlldy53aWR0aD0yNF1cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtjb25maWcuY29sb3JzLnByZXZpZXcuaGVpZ2h0PTI0XVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2NvbmZpZy5jb2xvcnMucHJldmlldy5jZWxsV2lkdGg9MzBdXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbY29uZmlnLmNvbG9ycy5sYWJlbF1cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtjb25maWcuY29sb3JzLmxhYmVsLndpZHRoPTgwXVxuICAgKiBAcGFyYW0ge09iamVjdH0gW2NvbmZpZy5jb2xvcnMuc2xpZGVyXVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2NvbmZpZy5jb2xvcnMuc2xpZGVyLnRyYWNrSGVpZ2h0PThdXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbY29uZmlnLmNvbG9ycy5zbGlkZXIuYW1vdW50PTMyXVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2NvbmZpZy5jb2xvcnMuc2xpZGVyLmhhbmRsZVdpZHRoPTE4XVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2NvbmZpZy5jb2xvcnMuc2xpZGVyLmhhbmRsZUhlaWdodD0xOF1cbiAgICogQHBhcmFtIHtPYmplY3RbXX0gW2NvbmZpZy5jb2xvcnMubGlzdD1bcmVkLG9yYW5nZSx5ZWxsb3csZ3JlZW4sYmx1ZSxwdXJwbGUsYmxhY2ssd2hpdGVdXVxuICAgKiBAcGFyYW0ge1N0cmluZ30gY29uZmlnLmNvbG9ycy5saXN0W10ubGFiZWxcbiAgICogQHBhcmFtIHtTdHJpbmd9IGNvbmZpZy5jb2xvcnMubGlzdFtdLnZhbHVlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbY29uZmlnLmNvbnRyb2xzXVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2NvbmZpZy5jb250cm9scy5oZWlnaHQ9MF1cbiAgICogQHBhcmFtIFtjb25maWcub25TdGF0ZUNoYW5nZWRdXG4gICAqIEBwYXJhbSBbY29uZmlnLm9uQ2xpY2tdXG4gICAqIEBwYXJhbSBbY29uZmlnLm9uVXBkYXRlQ29sb3JdXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqIG15UGFsZXR0ZSA9IG5ldyBQYWxldHRlKHtcbiAgICAgKiAgdGFyZ2V0OiAkKCdbZGF0YS1heDVwYWxldHRlPVwiMDFcIl0nKSxcbiAgICAgKiAgb25DbGljazogZnVuY3Rpb24gKGhleENvbG9yKSB7XG4gICAgICogICAgICBhbGVydChoZXhDb2xvcik7XG4gICAgICogIH1cbiAgICAgKiB9KTtcbiAgICpcbiAgICogbXlQYWxldHRlID0gbmV3IFBhbGV0dGUoe1xuICAgICAqICB0YXJnZXQ6ICQoJ1tkYXRhLWF4NXBhbGV0dGU9XCIwMVwiXScpLFxuICAgICAqICBjb2xvcnM6IHtcbiAgICAgKiAgICAgIGxpc3Q6IFtcbiAgICAgKiAgICAgICAgICB7bGFiZWw6IFwicmVkXCIsIHZhbHVlOiBcIiNmZjAwMDBcIn0sXG4gICAgICogICAgICAgICAge2xhYmVsOiBcIm9yYW5nZVwiLCB2YWx1ZTogXCIjZmY5ODAyXCJ9LFxuICAgICAqICAgICAgICAgIHtsYWJlbDogXCJ5ZWxsb3dcIiwgdmFsdWU6IFwiI2ZmZmYwMFwifSxcbiAgICAgKiAgICAgICAgICB7bGFiZWw6IFwic2t5Ymx1ZVwiLCB2YWx1ZTogXCIjODRlNGZmXCJ9LFxuICAgICAqICAgICAgICAgIHtsYWJlbDogXCJ3aGl0ZVwiLCB2YWx1ZTogXCIjZmZmZmZmXCJ9XG4gICAgICogICAgICBdXG4gICAgICogIH1cbiAgICAgKiAgb25DbGljazogZnVuY3Rpb24gKGhleENvbG9yKSB7XG4gICAgICpcbiAgICAgKiAgfVxuICAgICAqIH0pO1xuICAgKiBgYGBcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgIHN1cGVyKCk7XG5cbiAgICAvKipcbiAgICAgKiBAbWVtYmVyIHtKU09OfVxuICAgICAqIEBwYXJhbSBjb25maWdcbiAgICAgKiBAcGFyYW0gY29uZmlnLnRhcmdldFxuICAgICAqIEBwYXJhbSBbY29uZmlnLnRoZW1lPWRlZmF1bHRdXG4gICAgICogQHBhcmFtIFtjb25maWcuY2xpY2tFdmVudE5hbWU9XCJjbGlja1wiXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmFuaW1hdGVUaW1lPTEwMF1cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5jb2xvcnNdXG4gICAgICogQHBhcmFtIFtjb25maWcuY29sb3JzLnByZXZpZXddXG4gICAgICogQHBhcmFtIFtjb25maWcuY29sb3JzLnByZXZpZXcud2lkdGg9MjRdXG4gICAgICogQHBhcmFtIFtjb25maWcuY29sb3JzLnByZXZpZXcsaGVpZ2h0PTI0XVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmNvbG9ycy5wcmV2aWV3LmNlbGxXaWR0aD0zMF1cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5jb2xvcnMubGFiZWxdXG4gICAgICogQHBhcmFtIFtjb25maWcuY29sb3JzLmxhYmVsLndpZHRoPTgwXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmNvbG9ycy5zbGlkZXJdXG4gICAgICogQHBhcmFtIFtjb25maWcuY29sb3JzLnNsaWRlci50cmFja0hlaWdodD04XVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmNvbG9ycy5zbGlkZXIuYW1vdW50PTMyXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmNvbG9ycy5zbGlkZXIuaGFuZGxlV2lkdGg9MThdXG4gICAgICogQHBhcmFtIFtjb25maWcuY29sb3JzLnNsaWRlci5oYW5kbGVIZWlnaHQ9MThdXG4gICAgICogQHBhcmFtIFtjb25maWcuY29sb3JzLmxpc3RdXG4gICAgICogQHBhcmFtIFtjb25maWcuY29sb3JzLmxpc3RbXS5sYWJlbF1cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5jb2xvcnMubGlzdFtdLnZhbHVlXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmNvbnRyb2xzXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmNvbnRyb2xzLmhlaWdodD0wXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmNvbHVtbktleXM9e31dXG4gICAgICogQHBhcmFtIFtjb25maWcub25TdGF0ZUNoYW5nZWRdXG4gICAgICogQHBhcmFtIFtjb25maWcub25DbGlja11cbiAgICAgKi9cbiAgICB0aGlzLmNvbmZpZyA9IHtcbiAgICAgIGNsaWNrRXZlbnROYW1lOiBcImNsaWNrXCIsXG4gICAgICB0aGVtZTogJ2RlZmF1bHQnLFxuICAgICAgYW5pbWF0ZVRpbWU6IDEwMCxcbiAgICAgIGNvbG9yczoge1xuICAgICAgICBwcmV2aWV3OiB7XG4gICAgICAgICAgd2lkdGg6IDI0LFxuICAgICAgICAgIGhlaWdodDogMjQsXG4gICAgICAgICAgY2VsbFdpZHRoOiAzMFxuICAgICAgICB9LFxuICAgICAgICBsYWJlbDoge1xuICAgICAgICAgIHdpZHRoOiA4MFxuICAgICAgICB9LFxuICAgICAgICBzbGlkZXI6IHtcbiAgICAgICAgICB0cmFja0hlaWdodDogOCxcbiAgICAgICAgICBhbW91bnQ6IDMyLFxuICAgICAgICAgIGhhbmRsZVdpZHRoOiAxOCxcbiAgICAgICAgICBoYW5kbGVIZWlnaHQ6IDE4LFxuICAgICAgICB9LFxuICAgICAgICBsaXN0OiBbXG4gICAgICAgICAge2xhYmVsOiBcInJlZFwiLCB2YWx1ZTogXCIjZmYwMDAwXCJ9LFxuICAgICAgICAgIHtsYWJlbDogXCJvcmFuZ2VcIiwgdmFsdWU6IFwiI2ZmOTgwMlwifSxcbiAgICAgICAgICB7bGFiZWw6IFwieWVsbG93XCIsIHZhbHVlOiBcIiNmZmZmMDBcIn0sXG4gICAgICAgICAge2xhYmVsOiBcImdyZWVuXCIsIHZhbHVlOiBcIiMwMGZmMzZcIn0sXG4gICAgICAgICAge2xhYmVsOiBcImJsdWVcIiwgdmFsdWU6IFwiIzAwMDBmZlwifSxcbiAgICAgICAgICB7bGFiZWw6IFwicHVycGxlXCIsIHZhbHVlOiBcIiNiYTAwZmZcIn0sXG4gICAgICAgICAgLy97bGFiZWw6IFwic2t5Ymx1ZVwiLCB2YWx1ZTogXCIjODRlNGZmXCJ9LFxuICAgICAgICAgIC8ve2xhYmVsOiBcInBpbmtcIiwgdmFsdWU6IFwiI2ZmNzdjNFwifSxcbiAgICAgICAgICB7bGFiZWw6IFwiYmxhY2tcIiwgdmFsdWU6IFwiIzAwMDAwMFwifSxcbiAgICAgICAgICB7bGFiZWw6IFwid2hpdGVcIiwgdmFsdWU6IFwiI2ZmZmZmZlwifSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICBjb250cm9sczoge1xuICAgICAgICBoZWlnaHQ6IDAsXG4gICAgICB9LFxuICAgICAgY29sdW1uS2V5czoge31cbiAgICB9O1xuICAgIGpRdWVyeS5leHRlbmQodHJ1ZSwgdGhpcy5jb25maWcsIGNvbmZpZyk7XG5cbiAgICAvLyDrqaTrsoQg67OA7IiYIOy0iOq4sO2ZlFxuICAgIC8qKlxuICAgICAqIEBtZW1iZXIge09iamVjdH1cbiAgICAgKi9cbiAgICB0aGlzLiR0YXJnZXQgPSBudWxsO1xuICAgIC8qKlxuICAgICAqIEBtZW1iZXIge09iamVjdH1cbiAgICAgKi9cbiAgICB0aGlzLnh2YXIgPSB7fTtcbiAgICAvKipcbiAgICAgKiBAbWVtYmVyIHtBcnJheX1cbiAgICAgKi9cbiAgICB0aGlzLmNvbG9ycyA9IFtdO1xuXG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAcGFyYW0gY29uZmlnXG4gICAqIEBwYXJhbSBbY29uZmlnLnRoZW1lXVxuICAgKiBAcGFyYW0gY29uZmlnLnRhcmdldFxuICAgKiBAcGFyYW0gW2NvbmZpZy5hbmltYXRlVGltZV1cbiAgICogQHBhcmFtIHtTdHJpbmd9IFtjb25maWcuc2VsZWN0ZWRDb2xvcl1cbiAgICogQHBhcmFtIHtPYmplY3R9IFtjb25maWcuY29sb3JzXVxuICAgKiBAcGFyYW0ge09iamVjdH0gW2NvbmZpZy5jb2xvcnMucHJldmlld11cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtjb25maWcuY29sb3JzLnByZXZpZXcud2lkdGg9MjRdXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbY29uZmlnLmNvbG9ycy5wcmV2aWV3LmhlaWdodD0yNF1cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtjb25maWcuY29sb3JzLnByZXZpZXcuY2VsbFdpZHRoPTMwXVxuICAgKiBAcGFyYW0ge09iamVjdH0gW2NvbmZpZy5jb2xvcnMubGFiZWxdXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbY29uZmlnLmNvbG9ycy5sYWJlbC53aWR0aD04MF1cbiAgICogQHBhcmFtIHtPYmplY3R9IFtjb25maWcuY29sb3JzLnNsaWRlcl1cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtjb25maWcuY29sb3JzLnNsaWRlci50cmFja0hlaWdodD04XVxuICAgKiBAcGFyYW0ge051bWJlcn0gW2NvbmZpZy5jb2xvcnMuc2xpZGVyLmFtb3VudD0zMl1cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtjb25maWcuY29sb3JzLnNsaWRlci5oYW5kbGVXaWR0aD0xOF1cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtjb25maWcuY29sb3JzLnNsaWRlci5oYW5kbGVIZWlnaHQ9MThdXG4gICAqIEBwYXJhbSB7T2JqZWN0W119IFtjb25maWcuY29sb3JzLmxpc3Q9W3JlZCxvcmFuZ2UseWVsbG93LGdyZWVuLGJsdWUscHVycGxlLGJsYWNrLHdoaXRlXV1cbiAgICogQHBhcmFtIHtTdHJpbmd9IGNvbmZpZy5jb2xvcnMubGlzdFtdLmxhYmVsXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBjb25maWcuY29sb3JzLmxpc3RbXS52YWx1ZVxuICAgKiBAcGFyYW0ge09iamVjdH0gW2NvbmZpZy5jb250cm9sc11cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtjb25maWcuY29udHJvbHMuaGVpZ2h0PTBdXG4gICAqIEBwYXJhbSBbY29uZmlnLm9uU3RhdGVDaGFuZ2VkXVxuICAgKiBAcGFyYW0gW2NvbmZpZy5vbkNsaWNrXVxuICAgKiBAcGFyYW0gW2NvbmZpZy5vblVwZGF0ZUNvbG9yXVxuICAgKi9cbiAgaW5pdCgpIHtcbiAgICB0aGlzLm9uU3RhdGVDaGFuZ2VkID0gdGhpcy5jb25maWcub25TdGF0ZUNoYW5nZWQ7XG4gICAgZGVsZXRlIHRoaXMuY29uZmlnLm9uU3RhdGVDaGFuZ2VkO1xuICAgIHRoaXMub25DbGljayA9IHRoaXMuY29uZmlnLm9uQ2xpY2s7XG4gICAgZGVsZXRlIHRoaXMuY29uZmlnLm9uQ2xpY2s7XG4gICAgdGhpcy5vblVwZGF0ZUNvbG9yID0gdGhpcy5jb25maWcub25VcGRhdGVDb2xvcjtcbiAgICBkZWxldGUgdGhpcy5jb25maWcub25VcGRhdGVDb2xvcjtcblxuICAgIGlmICghdGhpcy5jb25maWcudGFyZ2V0KSB7XG4gICAgICBjb25zb2xlLmxvZyhpbmZvLmdldEVycm9yKFwiYXg2cGFsZXR0ZVwiLCBcIjQwMVwiLCBcInNldENvbmZpZ1wiKSk7XG4gICAgfVxuICAgIHRoaXMuJHRhcmdldCA9IGpRdWVyeSh0aGlzLmNvbmZpZy50YXJnZXQpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICByZXBhaW50LmNhbGwodGhpcywgKHRoaXMuY29uZmlnLnNlbGVjdGVkQ29sb3IgfHwgXCJcIikudHJpbSgpKTsgLy8g7YyU66Cb7Yq4IOq3uOumrOq4sC5cbiAgICB9KTtcblxuICAgIC8vIGluaXQg7Zi47LacIOyXrOu2gFxuICAgIHRoaXMuaW5pdE9uY2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqL1xuICBpbml0T25jZSgpIHtcbiAgICBpZiAodGhpcy5pbml0aWFsaXplZCkgcmV0dXJuIHRoaXM7XG4gICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAcmV0dXJuIHtBWDZVSVBhbGV0dGV9XG4gICAqL1xuICByZXBhaW50KCkge1xuICAgIHJlcGFpbnQuY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBwYXJhbSBzZWxlY3RlZENvbG9yXG4gICAqIEByZXR1cm4ge0FYNlVJUGFsZXR0ZX1cbiAgICovXG4gIHNldFNlbGVjdGVkQ29sb3Ioc2VsZWN0ZWRDb2xvcikge1xuICAgIGxldCBzQ29sb3IgPSBVLmNvbG9yKHNlbGVjdGVkQ29sb3IudHJpbSgpKTtcbiAgICAvLyDsp4DsoJXrkJwg7IOJ7J20IOqwgOyepSDqsIDquYzsmrQg7YyM66CbIOqygOyDiVxuICAgIGxldCBtaW5EaWZmQ29sb3IgPSAyNTUgKiAzLCBtaW5EaWZmQ29sb3JJbmRleCA9IC0xO1xuXG4gICAgdGhpcy5jb2xvcnMuZm9yRWFjaChmdW5jdGlvbiAoYywgY2lkeCkge1xuICAgICAgbGV0IGMxaHNsID0gYy5fY29sb3IuZ2V0SHNsKCksIGMyaHNsID0gc0NvbG9yLmdldEhzbCgpO1xuICAgICAgbGV0IGRpZmZDb2xvciA9IE1hdGguYWJzKGMxaHNsLmggLSBjMmhzbC5oKSArIE1hdGguYWJzKGMxaHNsLnMgLSBjMmhzbC5zKSArIE1hdGguYWJzKGMxaHNsLmwgLSBjMmhzbC5sKTtcbiAgICAgIGlmIChkaWZmQ29sb3IgPCBtaW5EaWZmQ29sb3IpIHtcbiAgICAgICAgbWluRGlmZkNvbG9yID0gZGlmZkNvbG9yO1xuICAgICAgICBtaW5EaWZmQ29sb3JJbmRleCA9IGNpZHg7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAobWluRGlmZkNvbG9ySW5kZXggPiAtMSkge1xuICAgICAgbGV0IGFtb3VudCwgaGFuZGxlTGVmdCxcbiAgICAgICAgaXRlbSA9IHRoaXMuY29sb3JzW21pbkRpZmZDb2xvckluZGV4XTtcblxuICAgICAgaXRlbS5fYW1vdW50ID0gY29sb3JUb0Ftb3VudC5jYWxsKHRoaXMsIGl0ZW0sIHNDb2xvcik7XG4gICAgICBoYW5kbGVMZWZ0ID0gYW1vdW50VG9IYW5kbGVMZWZ0LmNhbGwodGhpcywgaXRlbSwgaXRlbS5fYW1vdW50KTtcbiAgICAgIC8vaGFuZGxlTGVmdCA9IGhhbmRsZUxlZnQgPCAwID8gMCA6IGhhbmRsZUxlZnQgPiBpdGVtLnRyYWNrV2lkdGggPyBpdGVtLnRyYWNrV2lkdGggOiBoYW5kbGVMZWZ0O1xuICAgICAgaXRlbS4kaGFuZGxlLmNzcyh7bGVmdDogaGFuZGxlTGVmdH0pO1xuXG4gICAgICBhbW91bnQgPSBoYW5kbGVMZWZ0VG9BbW91bnQuY2FsbCh0aGlzLCBpdGVtLCBoYW5kbGVMZWZ0KTtcbiAgICAgIHVwZGF0ZVByZXZpZXdDb2xvci5jYWxsKHRoaXMsIGl0ZW0sIGFtb3VudFRvQ29sb3IuY2FsbCh0aGlzLCBpdGVtLCBhbW91bnQpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBWDZVSVBhbGV0dGU7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL3NyYy9BWDZVSVBhbGV0dGUuanMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGUuc2Nzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7fVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zdHlsZS5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zdHlsZS5zY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9zcmMvQVg2VUlQYWxldHRlL3N0eWxlLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDcxXG4vLyBtb2R1bGUgY2h1bmtzID0gMyA2IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHVuZGVmaW5lZCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJALXdlYmtpdC1rZXlmcmFtZXMgc29tZXRoaW5nLWFuaW1hdGlvbiB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMS4wOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDAuNTsgfSB9XFxuXFxuQC1tb3ota2V5ZnJhbWVzIHNvbWV0aGluZy1hbmltYXRpb24ge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDEuMDsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAwLjU7IH0gfVxcblxcbkBrZXlmcmFtZXMgc29tZXRoaW5nLWFuaW1hdGlvbiB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMS4wOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDAuNTsgfSB9XFxuXFxuW2RhdGEtYXg2dWktcGFsZXR0ZV0ge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcbiAgW2RhdGEtYXg2dWktcGFsZXR0ZV0gKixcXG4gIFtkYXRhLWF4NnVpLXBhbGV0dGVdICo6YmVmb3JlLFxcbiAgW2RhdGEtYXg2dWktcGFsZXR0ZV0gKjphZnRlciB7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IH1cXG4gIFtkYXRhLWF4NnVpLXBhbGV0dGVdIFtkYXRhLWF4NnBhbGV0dGUtY29udGFpbmVyPVxcXCJyb290XFxcIl0gW2RhdGEtYXg2cGFsZXR0ZS1jb250YWluZXI9XFxcImNvbG9yc1xcXCJdIHtcXG4gICAgZGlzcGxheTogdGFibGU7XFxuICAgIHdpZHRoOiAxMDAlOyB9XFxuICAgIFtkYXRhLWF4NnVpLXBhbGV0dGVdIFtkYXRhLWF4NnBhbGV0dGUtY29udGFpbmVyPVxcXCJyb290XFxcIl0gW2RhdGEtYXg2cGFsZXR0ZS1jb250YWluZXI9XFxcImNvbG9yc1xcXCJdIFtkYXRhLWF4NnBhbGV0dGUtY29sb3JdIHtcXG4gICAgICBkaXNwbGF5OiB0YWJsZS1yb3c7XFxuICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgICAgdGV4dC1hbGlnbjogbGVmdDsgfVxcbiAgICAgIFtkYXRhLWF4NnVpLXBhbGV0dGVdIFtkYXRhLWF4NnBhbGV0dGUtY29udGFpbmVyPVxcXCJyb290XFxcIl0gW2RhdGEtYXg2cGFsZXR0ZS1jb250YWluZXI9XFxcImNvbG9yc1xcXCJdIFtkYXRhLWF4NnBhbGV0dGUtY29sb3JdIFtkYXRhLXBhbmVsXSB7XFxuICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOyB9XFxuICAgICAgW2RhdGEtYXg2dWktcGFsZXR0ZV0gW2RhdGEtYXg2cGFsZXR0ZS1jb250YWluZXI9XFxcInJvb3RcXFwiXSBbZGF0YS1heDZwYWxldHRlLWNvbnRhaW5lcj1cXFwiY29sb3JzXFxcIl0gW2RhdGEtYXg2cGFsZXR0ZS1jb2xvcl06aG92ZXIgW2RhdGEtcGFuZWw9XFxcImNvbG9yLXByZXZpZXdcXFwiXSBbZGF0YS1wYW5lbD1cXFwiY29sb3ItYm94XFxcIl0ge1xcbiAgICAgICAgYmFja2dyb3VuZDogI2NjYztcXG4gICAgICAgIGJvcmRlci1jb2xvcjogI0I5QkFCQzsgfVxcbiAgICAgIFtkYXRhLWF4NnVpLXBhbGV0dGVdIFtkYXRhLWF4NnBhbGV0dGUtY29udGFpbmVyPVxcXCJyb290XFxcIl0gW2RhdGEtYXg2cGFsZXR0ZS1jb250YWluZXI9XFxcImNvbG9yc1xcXCJdIFtkYXRhLWF4NnBhbGV0dGUtY29sb3JdOmhvdmVyIFtkYXRhLXBhbmVsPVxcXCJjb2xvci1wcmV2aWV3XFxcIl0gW2RhdGEtcGFuZWw9XFxcImNvbG9yXFxcIl0ge1xcbiAgICAgICAgYm9yZGVyLWNvbG9yOiAjQjlCQUJDOyB9XFxuICAgICAgW2RhdGEtYXg2dWktcGFsZXR0ZV0gW2RhdGEtYXg2cGFsZXR0ZS1jb250YWluZXI9XFxcInJvb3RcXFwiXSBbZGF0YS1heDZwYWxldHRlLWNvbnRhaW5lcj1cXFwiY29sb3JzXFxcIl0gW2RhdGEtYXg2cGFsZXR0ZS1jb2xvcl06aG92ZXIgW2RhdGEtcGFuZWw9XFxcImNvbG9yLWxhYmVsXFxcIl0ge1xcbiAgICAgICAgY29sb3I6ICNjY2M7IH1cXG4gICAgICBbZGF0YS1heDZ1aS1wYWxldHRlXSBbZGF0YS1heDZwYWxldHRlLWNvbnRhaW5lcj1cXFwicm9vdFxcXCJdIFtkYXRhLWF4NnBhbGV0dGUtY29udGFpbmVyPVxcXCJjb2xvcnNcXFwiXSBbZGF0YS1heDZwYWxldHRlLWNvbG9yXTphY3RpdmUgW2RhdGEtcGFuZWw9XFxcImNvbG9yLXByZXZpZXdcXFwiXSBbZGF0YS1wYW5lbD1cXFwiY29sb3ItYm94XFxcIl0ge1xcbiAgICAgICAgYmFja2dyb3VuZDogIzBhNjhiNDtcXG4gICAgICAgIGJvcmRlci1jb2xvcjogIzAwMDsgfVxcbiAgICAgIFtkYXRhLWF4NnVpLXBhbGV0dGVdIFtkYXRhLWF4NnBhbGV0dGUtY29udGFpbmVyPVxcXCJyb290XFxcIl0gW2RhdGEtYXg2cGFsZXR0ZS1jb250YWluZXI9XFxcImNvbG9yc1xcXCJdIFtkYXRhLWF4NnBhbGV0dGUtY29sb3JdOmFjdGl2ZSBbZGF0YS1wYW5lbD1cXFwiY29sb3ItcHJldmlld1xcXCJdIFtkYXRhLXBhbmVsPVxcXCJjb2xvclxcXCJdIHtcXG4gICAgICAgIGJvcmRlci1jb2xvcjogIzAwMDsgfVxcbiAgICAgIFtkYXRhLWF4NnVpLXBhbGV0dGVdIFtkYXRhLWF4NnBhbGV0dGUtY29udGFpbmVyPVxcXCJyb290XFxcIl0gW2RhdGEtYXg2cGFsZXR0ZS1jb250YWluZXI9XFxcImNvbG9yc1xcXCJdIFtkYXRhLWF4NnBhbGV0dGUtY29sb3JdOmFjdGl2ZSBbZGF0YS1wYW5lbD1cXFwiY29sb3ItbGFiZWxcXFwiXSB7XFxuICAgICAgICBjb2xvcjogIzBhNjhiNDsgfVxcbiAgICAgIFtkYXRhLWF4NnVpLXBhbGV0dGVdIFtkYXRhLWF4NnBhbGV0dGUtY29udGFpbmVyPVxcXCJyb290XFxcIl0gW2RhdGEtYXg2cGFsZXR0ZS1jb250YWluZXI9XFxcImNvbG9yc1xcXCJdIFtkYXRhLWF4NnBhbGV0dGUtY29sb3JdIFtkYXRhLXBhbmVsPVxcXCJjb2xvci1wcmV2aWV3XFxcIl0ge1xcbiAgICAgICAgZGlzcGxheTogdGFibGUtY2VsbDtcXG4gICAgICAgIHBhZGRpbmc6IDNweCAwO1xcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyOyB9XFxuICAgICAgICBbZGF0YS1heDZ1aS1wYWxldHRlXSBbZGF0YS1heDZwYWxldHRlLWNvbnRhaW5lcj1cXFwicm9vdFxcXCJdIFtkYXRhLWF4NnBhbGV0dGUtY29udGFpbmVyPVxcXCJjb2xvcnNcXFwiXSBbZGF0YS1heDZwYWxldHRlLWNvbG9yXSBbZGF0YS1wYW5lbD1cXFwiY29sb3ItcHJldmlld1xcXCJdIFtkYXRhLXBhbmVsPVxcXCJjb2xvci1ib3hcXFwiXSB7XFxuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gICAgICAgICAgcGFkZGluZzogMnB4O1xcbiAgICAgICAgICBib3JkZXItd2lkdGg6IDFweDtcXG4gICAgICAgICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcXG4gICAgICAgICAgYm9yZGVyLWNvbG9yOiAjQjlCQUJDO1xcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAjZmZmOyB9XFxuICAgICAgICBbZGF0YS1heDZ1aS1wYWxldHRlXSBbZGF0YS1heDZwYWxldHRlLWNvbnRhaW5lcj1cXFwicm9vdFxcXCJdIFtkYXRhLWF4NnBhbGV0dGUtY29udGFpbmVyPVxcXCJjb2xvcnNcXFwiXSBbZGF0YS1heDZwYWxldHRlLWNvbG9yXSBbZGF0YS1wYW5lbD1cXFwiY29sb3ItcHJldmlld1xcXCJdIFtkYXRhLXBhbmVsPVxcXCJjb2xvclxcXCJdIHtcXG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogM3B4O1xcbiAgICAgICAgICBib3JkZXItY29sb3I6ICNCOUJBQkM7XFxuICAgICAgICAgIGJvcmRlci13aWR0aDogMXB4O1xcbiAgICAgICAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xcbiAgICAgICAgICBoZWlnaHQ6IDEwMCU7XFxuICAgICAgICAgIGJveC1zaGFkb3c6IGluc2V0IDFweCAxcHggMXB4IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC41KTsgfVxcbiAgICAgIFtkYXRhLWF4NnVpLXBhbGV0dGVdIFtkYXRhLWF4NnBhbGV0dGUtY29udGFpbmVyPVxcXCJyb290XFxcIl0gW2RhdGEtYXg2cGFsZXR0ZS1jb250YWluZXI9XFxcImNvbG9yc1xcXCJdIFtkYXRhLWF4NnBhbGV0dGUtY29sb3JdIFtkYXRhLXBhbmVsPVxcXCJjb2xvci1sYWJlbFxcXCJdIHtcXG4gICAgICAgIGRpc3BsYXk6IHRhYmxlLWNlbGw7XFxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7IH1cXG4gICAgICBbZGF0YS1heDZ1aS1wYWxldHRlXSBbZGF0YS1heDZwYWxldHRlLWNvbnRhaW5lcj1cXFwicm9vdFxcXCJdIFtkYXRhLWF4NnBhbGV0dGUtY29udGFpbmVyPVxcXCJjb2xvcnNcXFwiXSBbZGF0YS1heDZwYWxldHRlLWNvbG9yXSBbZGF0YS1wYW5lbD1cXFwiY29sb3Itc2xpZGVyXFxcIl0ge1xcbiAgICAgICAgZGlzcGxheTogdGFibGUtY2VsbDsgfVxcbiAgICAgICAgW2RhdGEtYXg2dWktcGFsZXR0ZV0gW2RhdGEtYXg2cGFsZXR0ZS1jb250YWluZXI9XFxcInJvb3RcXFwiXSBbZGF0YS1heDZwYWxldHRlLWNvbnRhaW5lcj1cXFwiY29sb3JzXFxcIl0gW2RhdGEtYXg2cGFsZXR0ZS1jb2xvcl0gW2RhdGEtcGFuZWw9XFxcImNvbG9yLXNsaWRlclxcXCJdIFtkYXRhLXBhbmVsPVxcXCJjb2xvci10cmFja1xcXCJdIHtcXG4gICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICAgICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICAgICAgaGVpZ2h0OiAxMHB4O1xcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICAgICAgICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCAycHggcmdiYSgwLCAwLCAwLCAwLjUpOyB9XFxuICAgICAgICBbZGF0YS1heDZ1aS1wYWxldHRlXSBbZGF0YS1heDZwYWxldHRlLWNvbnRhaW5lcj1cXFwicm9vdFxcXCJdIFtkYXRhLWF4NnBhbGV0dGUtY29udGFpbmVyPVxcXCJjb2xvcnNcXFwiXSBbZGF0YS1heDZwYWxldHRlLWNvbG9yXSBbZGF0YS1wYW5lbD1cXFwiY29sb3Itc2xpZGVyXFxcIl0gW2RhdGEtcGFuZWw9XFxcImNvbG9yLWhhbmRsZVxcXCJdIHtcXG4gICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgICAgICBsZWZ0OiA1MCU7XFxuICAgICAgICAgIHRvcDogNTAlOyB9XFxuICAgICAgICAgIFtkYXRhLWF4NnVpLXBhbGV0dGVdIFtkYXRhLWF4NnBhbGV0dGUtY29udGFpbmVyPVxcXCJyb290XFxcIl0gW2RhdGEtYXg2cGFsZXR0ZS1jb250YWluZXI9XFxcImNvbG9yc1xcXCJdIFtkYXRhLWF4NnBhbGV0dGUtY29sb3JdIFtkYXRhLXBhbmVsPVxcXCJjb2xvci1zbGlkZXJcXFwiXSBbZGF0YS1wYW5lbD1cXFwiY29sb3ItaGFuZGxlXFxcIl0gW2RhdGEtcGFuZWw9XFxcImNvbG9yLWhhbmRsZS1hZnRlclxcXCJdIHtcXG4gICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgICAgICAgbGVmdDogLTEwcHg7XFxuICAgICAgICAgICAgdG9wOiAtMTBweDtcXG4gICAgICAgICAgICB3aWR0aDogMjBweDtcXG4gICAgICAgICAgICBoZWlnaHQ6IDIwcHg7XFxuICAgICAgICAgICAgYm9yZGVyLXdpZHRoOiAxcHg7XFxuICAgICAgICAgICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcXG4gICAgICAgICAgICBib3JkZXItY29sb3I6ICNCOUJBQkM7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI0VBRUFFQTtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudChib3R0b20sICNFQUVBRUEsICNGQkZCRkIpO1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byB0b3AsI0VBRUFFQSwgI0ZCRkJGQik7XFxuICAgICAgICAgICAgYm94LXNoYWRvdzogMCAxcHggMCAwIHJnYmEoMCwgMCwgMCwgMC4xKTtcXG4gICAgICAgICAgICBvcGFjaXR5OiAwLjg7XFxuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICAgICAgICAgIGN1cnNvcjogY29sLXJlc2l6ZTsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIhLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi9zcmMvQVg2VUlQYWxldHRlL3N0eWxlLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDcyXG4vLyBtb2R1bGUgY2h1bmtzID0gMyA2Il0sInNvdXJjZVJvb3QiOiIifQ==