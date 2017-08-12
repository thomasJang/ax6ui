webpackJsonp([9],{

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jqmin = __webpack_require__(6);

var _jqmin2 = _interopRequireDefault(_jqmin);

var _AX6UIMask = __webpack_require__(85);

var _AX6UIMask2 = _interopRequireDefault(_AX6UIMask);

__webpack_require__(86);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var html = "\n<div id=\"making-div\" style=\"height:500px;background: #ccc;\">making div</div>\n<br/>\n<a class=\"waves-effect waves-light btn\" data-btn=\"mask\">Open Mask</a>\n<a class=\"waves-effect waves-light btn\" data-btn=\"mask-content\">Open Mask(with content)</a>\n<a class=\"waves-effect waves-light btn\" data-btn=\"mask-div\">Open Mask(masking)</a>\n";

var fn = {};
fn.moduleRun = function ($body) {
  /////~~~~~~~~~~~~~~~~~~
  fn.myMask = new _AX6UIMask2.default();
  fn.myMask.setConfig({
    zIndex: 1000,
    onStateChanged: function onStateChanged() {
      console.log(this);
    }
  });

  fn.myMask.onClick = function () {
    console.log(this);
    fn.myMask.fadeOut();
  };

  $body.on("click", '[data-btn]', function (e) {
    var btn = e.currentTarget.getAttribute("data-btn");
    var processor = {
      mask: function mask() {
        fn.myMask.open();
      },
      "mask-content": function maskContent() {
        fn.myMask.open({
          content: "MASK CONTENT"
        });
      },
      "mask-div": function maskDiv() {
        fn.myMask.open({
          target: (0, _jqmin2.default)('#making-div')
        });
      }
    };

    if (btn in processor) {
      processor[btn]();
    }
  });
};

fn.moduleDestroy = function ($body) {
  fn.myMask.destory();
  fn.myMask = null;
  $body.off("click");
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

/***/ 85:
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

var _AX6Util = __webpack_require__(4);

var _AX6Util2 = _interopRequireDefault(_AX6Util);

var _AX6Mustache = __webpack_require__(36);

var _AX6Mustache2 = _interopRequireDefault(_AX6Mustache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* ~~~~~~~~~~~~~~~~~~ end of import  ~~~~~~~~~~~~~~~~~~~~ */

var getBodyTmpl = function getBodyTmpl(data, columnKeys) {
  var defaultMask = function defaultMask(columnKeys) {
    return "\n            <div data-ax6ui-mask=\"\" class=\"{{theme}}\" id=\"{{maskId}}\">\n                <div class=\"ax-mask-bg\"></div>\n                <div class=\"ax-mask-content\">\n                    <div class=\"ax-mask-body\">\n                    {{{body}}}\n                    </div>\n                </div>\n            </div>\n        ";
  };
  return _AX6Mustache2.default.render(defaultMask.call(this, columnKeys), data);
};
var onStateChanged = function onStateChanged(opts, that) {
  if (opts && opts.onStateChanged) {
    opts.onStateChanged.call(that, that);
  } else if (this.onStateChanged) {
    this.onStateChanged.call(that, that);
  }

  opts = null;
  that = null;
  return true;
};
var setBody = function setBody(content) {
  this.maskContent = content;
};

/* ~~~~~~~~~~~~~~~~~~ end of private  ~~~~~~~~~~~~~~~~~~~~ */

/**
 * @class
 */

var AX6UIMask = function (_AX6UICore) {
  _inherits(AX6UIMask, _AX6UICore);

  /**
   * @constructor
   * @param config
   */
  function AX6UIMask(config) {
    _classCallCheck(this, AX6UIMask);

    /**
     * @member {JSON}
     * @param config
     * @param [config.theme]
     * @param [config.target=document.body]
     * @param [config.animateTime=250]
     * @param [config.onStateChanged]
     * @param [config.onClick]
     * @param [config.content]
     *
     */
    var _this = _possibleConstructorReturn(this, (AX6UIMask.__proto__ || Object.getPrototypeOf(AX6UIMask)).call(this));

    _this.config = {
      theme: '',
      target: (0, _jqmin2.default)(document.body).get(0),
      animateTime: 250
    };
    _jqmin2.default.extend(true, _this.config, config);

    // 멤버 변수 초기화
    /**
     * @member {String}
     */
    _this.maskContent = '';
    /**
     * @member {String}
     */
    _this.status = "off";
    /**
     * @member {JSON}
     */
    _this.activeConfig = {};

    if (typeof config !== "undefined") _this.init();
    return _this;
  }

  /**
   * @method
   */


  _createClass(AX6UIMask, [{
    key: "init",
    value: function init() {
      this.onStateChanged = this.config.onStateChanged;
      delete this.config.onStateChanged;
      this.onClick = this.config.onClick;
      delete this.config.onClick;

      setBody.call(this, this.config.content || "");

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
     * @param options
     * @param {number} [options.zIndex] - 마스크 엘리먼트의 z-index 값을 정합니다
     * @return {AX6UIMask}
     * @example
     * ```js
     * let myMask = new Mask();
     * myMask.setConfig({
       *  zIndex: 1000
       * });
     *
     * myMask.open();
     * ```
     */

  }, {
    key: "open",
    value: function open(options) {
      var _this2 = this;

      if (this.status === "on") this.close();
      setBody.call(this, options ? options.content || "" : "");

      var _cfg = _jqmin2.default.extend(true, this.config, options),
          target = _cfg.target,
          $target = (0, _jqmin2.default)(target),
          maskId = 'ax-mask-' + this.instanceId,
          $mask = void 0,
          css = {},
          that = {},
          templateName = _cfg.templateName,
          body = getBodyTmpl({
        theme: _cfg.theme,
        maskId: maskId,
        body: this.maskContent,
        templateName: templateName
      }).trim();

      (0, _jqmin2.default)(document.body).append(body);

      // 마스크의 타겟이 html body 가 아니라면
      if (target && target !== (0, _jqmin2.default)(document.body).get(0)) {
        css = {
          position: _cfg.position || "absolute",
          left: $target.offset().left,
          top: $target.offset().top,
          width: $target.outerWidth(),
          height: $target.outerHeight()
        };

        $target.addClass("ax-masking");

        // 마스크의 타겟이 html body가 아닌경우 window resize 이벤트를 추적하여 엘리먼트 마스크의 CSS 속성 변경
        (0, _jqmin2.default)(window).off("resize.ax6ui-mask-" + this.instanceId).on("resize.ax6ui-mask-" + this.instanceId, _AX6Util2.default.throttle(function (e) {
          this.align();
        }, 100).bind(this));
      }

      if (typeof _cfg.zIndex !== "undefined") {
        css["z-index"] = _cfg.zIndex;
      }

      this.$mask = $mask = (0, _jqmin2.default)("#" + maskId);
      this.$target = $target;
      this.status = "on";
      $mask.css(css);

      if (this.onClick) {
        $mask.on("click", function (e) {
          that = {
            self: _this2,
            state: "open",
            type: "click"
          };
          _this2.onClick.call(that, that);
        });
      }

      onStateChanged.call(this, null, {
        self: this,
        state: "open"
      });

      // 현재 활성화된 설정 기억
      this.activeConfig = _cfg;

      options = null;
      _cfg = null;
      target = null;
      $target = null;
      maskId = null;
      $mask = null;
      css = null;
      that = null;
      templateName = null;
      body = null;

      return this;
    }

    /**
     * @method
     * @param delay
     * @return {AX6UIMask}
     */

  }, {
    key: "close",
    value: function close(delay) {
      if (this.$mask) {

        var _close = function _close() {
          this.status = "off";
          this.$mask.remove();
          this.$target.removeClass("ax-masking");

          onStateChanged.call(this, null, {
            self: this,
            state: "close"
          });

          (0, _jqmin2.default)(window).off("resize.ax6ui-mask-" + this.instanceId);
        };

        if (delay) {
          setTimeout(function () {
            _close.call(this);
          }.bind(this), delay);
        } else {
          _close.call(this);
        }
      }
      return this;
    }

    /**
     * @method
     * @return {AX6UIMask}
     */

  }, {
    key: "fadeOut",
    value: function fadeOut() {
      if (this.$mask) {
        var _close = function _close() {
          this.status = "off";
          this.$mask.remove();
          this.$target.removeClass("ax-masking");

          onStateChanged.call(this, null, {
            self: this,
            state: "close"
          });

          (0, _jqmin2.default)(window).off("resize.ax6ui-mask-" + this.instanceId);
        };

        this.$mask.addClass("fade-out");
        setTimeout(function () {
          _close.call(this);
        }.bind(this), this.activeConfig.animateTime);
      }
      return this;
    }

    /**
     * @method
     * @return {AX6UIMask}
     */

  }, {
    key: "align",
    value: function align() {
      if (this.$mask && this.activeConfig && this.activeConfig.target && this.activeConfig.target !== (0, _jqmin2.default)(document.body).get(0)) {
        try {
          var css = {
            position: this.activeConfig.position || "absolute",
            left: this.$target.offset().left,
            top: this.$target.offset().top,
            width: this.$target.outerWidth(),
            height: this.$target.outerHeight()
          };
          this.$mask.css(css);
        } catch (e) {}
      }
      return this;
    }
  }, {
    key: "destory",
    value: function destory() {
      if (this.$mask) this.$mask.remove();
      if (this.$target) this.$target.removeClass("ax-masking");
      (0, _jqmin2.default)(window).off("resize.ax6ui-mask-" + this.instanceId);
    }
  }]);

  return AX6UIMask;
}(_AX6UICore3.default);

exports.default = AX6UIMask;

/***/ }),

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(87);
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

/***/ 87:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "@-webkit-keyframes ax-mask {\n  from {\n    opacity: 0.0; }\n  to {\n    opacity: 0.6; } }\n\n@-moz-keyframes ax-mask {\n  from {\n    opacity: 0.0; }\n  to {\n    opacity: 0.6; } }\n\n@keyframes ax-mask {\n  from {\n    opacity: 0.0; }\n  to {\n    opacity: 0.6; } }\n\n@-webkit-keyframes ax-mask-fade-out {\n  from {\n    opacity: 0.6; }\n  to {\n    opacity: 0.0; } }\n\n@-moz-keyframes ax-mask-fade-out {\n  from {\n    opacity: 0.6; }\n  to {\n    opacity: 0.0; } }\n\n@keyframes ax-mask-fade-out {\n  from {\n    opacity: 0.6; }\n  to {\n    opacity: 0.0; } }\n\n.ax-masking {\n  -webkit-filter: blur(3px);\n  -webkit-transform: scale(0.96);\n  -moz-transform: scale(0.96);\n  -ms-transform: scale(0.96);\n  -o-transform: scale(0.96);\n  transform: scale(0.96);\n  -webkit-transform: translateZ(0);\n  -moz-transform: translateZ(0);\n  -ms-transform: translateZ(0);\n  -o-transform: translateZ(0);\n  transform: translateZ(0); }\n\n[data-ax6ui-mask] {\n  box-sizing: border-box;\n  z-index: 1000;\n  position: fixed;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%; }\n  [data-ax6ui-mask] *,\n  [data-ax6ui-mask] *:before,\n  [data-ax6ui-mask] *:after {\n    box-sizing: border-box; }\n  [data-ax6ui-mask] .ax-mask-bg {\n    z-index: 1;\n    position: absolute;\n    left: 0px;\n    top: 0px;\n    width: 100%;\n    height: 100%;\n    background: #000;\n    opacity: 0.6; }\n  [data-ax6ui-mask] .ax-mask-content {\n    z-index: 2;\n    position: absolute;\n    left: 0px;\n    top: 0px;\n    width: 100%;\n    height: 100%;\n    display: table;\n    vertical-align: middle;\n    text-align: center;\n    color: #fff;\n    text-shadow: 0px 1px 0px #000; }\n    [data-ax6ui-mask] .ax-mask-content * {\n      color: inherit; }\n    [data-ax6ui-mask] .ax-mask-content > div {\n      display: table-cell;\n      vertical-align: middle;\n      text-align: center; }\n  [data-ax6ui-mask].fade-out {\n    -webkit-animation: ax-mask-fade-out 0.25s;\n    -moz-animation: ax-mask-fade-out 0.25s;\n    animation: ax-mask-fade-out 0.25s;\n    opacity: 0.0; }\n", ""]);

// exports


/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFzay5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL0FYNk11c3RhY2hlLmpzIiwid2VicGFjazovLy8uLi9zcmMvQVg2VUlNYXNrLmpzIiwid2VicGFjazovLy8uLi9zcmMvQVg2VUlNYXNrL3N0eWxlLnNjc3M/YTA2YiIsIndlYnBhY2s6Ly8vLi4vc3JjL0FYNlVJTWFzay9zdHlsZS5zY3NzIl0sIm5hbWVzIjpbImh0bWwiLCJmbiIsIm1vZHVsZVJ1biIsIiRib2R5IiwibXlNYXNrIiwic2V0Q29uZmlnIiwiekluZGV4Iiwib25TdGF0ZUNoYW5nZWQiLCJjb25zb2xlIiwibG9nIiwib25DbGljayIsImZhZGVPdXQiLCJvbiIsImUiLCJidG4iLCJjdXJyZW50VGFyZ2V0IiwiZ2V0QXR0cmlidXRlIiwicHJvY2Vzc29yIiwibWFzayIsIm9wZW4iLCJjb250ZW50IiwidGFyZ2V0IiwibW9kdWxlRGVzdHJveSIsImRlc3RvcnkiLCJvZmYiLCJBWDYiLCJkZWZpbmVNdXN0YWNoZSIsImdsb2JhbCIsImZhY3RvcnkiLCJtdXN0YWNoZSIsIm11c3RhY2hlRmFjdG9yeSIsIm9iamVjdFRvU3RyaW5nIiwiT2JqZWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJpc0FycmF5IiwiQXJyYXkiLCJpc0FycmF5UG9seWZpbGwiLCJvYmplY3QiLCJjYWxsIiwiaXNGdW5jdGlvbiIsInR5cGVTdHIiLCJvYmoiLCJlc2NhcGVSZWdFeHAiLCJzdHJpbmciLCJyZXBsYWNlIiwiaGFzUHJvcGVydHkiLCJwcm9wTmFtZSIsInJlZ0V4cFRlc3QiLCJSZWdFeHAiLCJ0ZXN0IiwidGVzdFJlZ0V4cCIsInJlIiwibm9uU3BhY2VSZSIsImlzV2hpdGVzcGFjZSIsImVudGl0eU1hcCIsImVzY2FwZUh0bWwiLCJTdHJpbmciLCJmcm9tRW50aXR5TWFwIiwicyIsIndoaXRlUmUiLCJzcGFjZVJlIiwiZXF1YWxzUmUiLCJjdXJseVJlIiwidGFnUmUiLCJwYXJzZVRlbXBsYXRlIiwidGVtcGxhdGUiLCJ0YWdzIiwic2VjdGlvbnMiLCJ0b2tlbnMiLCJzcGFjZXMiLCJoYXNUYWciLCJub25TcGFjZSIsInN0cmlwU3BhY2UiLCJsZW5ndGgiLCJwb3AiLCJvcGVuaW5nVGFnUmUiLCJjbG9zaW5nVGFnUmUiLCJjbG9zaW5nQ3VybHlSZSIsImNvbXBpbGVUYWdzIiwidGFnc1RvQ29tcGlsZSIsInNwbGl0IiwiRXJyb3IiLCJzY2FubmVyIiwiU2Nhbm5lciIsInN0YXJ0IiwidHlwZSIsInZhbHVlIiwiY2hyIiwidG9rZW4iLCJvcGVuU2VjdGlvbiIsImVvcyIsInBvcyIsInNjYW5VbnRpbCIsImkiLCJ2YWx1ZUxlbmd0aCIsImNoYXJBdCIsInB1c2giLCJzY2FuIiwibmVzdFRva2VucyIsInNxdWFzaFRva2VucyIsInNxdWFzaGVkVG9rZW5zIiwibGFzdFRva2VuIiwibnVtVG9rZW5zIiwibmVzdGVkVG9rZW5zIiwiY29sbGVjdG9yIiwic2VjdGlvbiIsInRhaWwiLCJtYXRjaCIsImluZGV4Iiwic3Vic3RyaW5nIiwic2VhcmNoIiwiQ29udGV4dCIsInZpZXciLCJwYXJlbnRDb250ZXh0IiwiY2FjaGUiLCJyZXR1cm5zIiwiayIsInBhcmVudCIsImxvb2t1cCIsIm5hbWUiLCJoYXNPd25Qcm9wZXJ0eSIsImNvbnRleHQiLCJuYW1lcyIsImxvb2t1cEhpdCIsImluZGV4T2YiLCJXcml0ZXIiLCJjbGVhckNhY2hlIiwicGFyc2UiLCJyZW5kZXIiLCJwYXJ0aWFscyIsInJlbmRlclRva2VucyIsIm9yaWdpbmFsVGVtcGxhdGUiLCJidWZmZXIiLCJzeW1ib2wiLCJ1bmRlZmluZWQiLCJyZW5kZXJTZWN0aW9uIiwicmVuZGVySW52ZXJ0ZWQiLCJyZW5kZXJQYXJ0aWFsIiwidW5lc2NhcGVkVmFsdWUiLCJlc2NhcGVkVmFsdWUiLCJyYXdWYWx1ZSIsInNlbGYiLCJzdWJSZW5kZXIiLCJqIiwic2xpY2UiLCJlc2NhcGUiLCJ2ZXJzaW9uIiwiZGVmYXVsdFdyaXRlciIsIlR5cGVFcnJvciIsInRvX2h0bWwiLCJzZW5kIiwicmVzdWx0IiwiZ2V0Qm9keVRtcGwiLCJkYXRhIiwiY29sdW1uS2V5cyIsImRlZmF1bHRNYXNrIiwib3B0cyIsInRoYXQiLCJzZXRCb2R5IiwibWFza0NvbnRlbnQiLCJBWDZVSU1hc2siLCJjb25maWciLCJ0aGVtZSIsImRvY3VtZW50IiwiYm9keSIsImdldCIsImFuaW1hdGVUaW1lIiwiZXh0ZW5kIiwic3RhdHVzIiwiYWN0aXZlQ29uZmlnIiwiaW5pdCIsImluaXRPbmNlIiwiaW5pdGlhbGl6ZWQiLCJvcHRpb25zIiwiY2xvc2UiLCJfY2ZnIiwiJHRhcmdldCIsIm1hc2tJZCIsImluc3RhbmNlSWQiLCIkbWFzayIsImNzcyIsInRlbXBsYXRlTmFtZSIsInRyaW0iLCJhcHBlbmQiLCJwb3NpdGlvbiIsImxlZnQiLCJvZmZzZXQiLCJ0b3AiLCJ3aWR0aCIsIm91dGVyV2lkdGgiLCJoZWlnaHQiLCJvdXRlckhlaWdodCIsImFkZENsYXNzIiwid2luZG93IiwidGhyb3R0bGUiLCJhbGlnbiIsImJpbmQiLCJzdGF0ZSIsImRlbGF5IiwiX2Nsb3NlIiwicmVtb3ZlIiwicmVtb3ZlQ2xhc3MiLCJzZXRUaW1lb3V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQSxJQUFNQSx3V0FBTjs7QUFRQSxJQUFJQyxLQUFLLEVBQVQ7QUFDQUEsR0FBR0MsU0FBSCxHQUFlLFVBQVVDLEtBQVYsRUFBaUI7QUFDOUI7QUFDQUYsS0FBR0csTUFBSCxHQUFZLHlCQUFaO0FBQ0FILEtBQUdHLE1BQUgsQ0FBVUMsU0FBVixDQUFvQjtBQUNsQkMsWUFBUSxJQURVO0FBRWxCQyxvQkFBZ0IsMEJBQVk7QUFDMUJDLGNBQVFDLEdBQVIsQ0FBWSxJQUFaO0FBQ0Q7QUFKaUIsR0FBcEI7O0FBT0FSLEtBQUdHLE1BQUgsQ0FBVU0sT0FBVixHQUFvQixZQUFZO0FBQzlCRixZQUFRQyxHQUFSLENBQVksSUFBWjtBQUNBUixPQUFHRyxNQUFILENBQVVP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QkFBdUIsRUFBRSxnREFBZ0QsNEJBQTRCLCtCQUErQiwyQkFBMkIsRUFBRSxnQ0FBZ0MsZ0RBQWdELDZDQUE2Qyx3Q0FBd0MsbUJBQW1CLEVBQUU7O0FBRXBpRSIsImZpbGUiOiI5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSBcImpxbWluXCI7XG5pbXBvcnQgTWFzayBmcm9tIFwiLi4vLi4vc3JjL0FYNlVJTWFza1wiO1xuaW1wb3J0IFwiLi4vLi4vc3JjL0FYNlVJTWFzay9zdHlsZS5zY3NzXCI7XG5cbmNvbnN0IGh0bWwgPSBgXG48ZGl2IGlkPVwibWFraW5nLWRpdlwiIHN0eWxlPVwiaGVpZ2h0OjUwMHB4O2JhY2tncm91bmQ6ICNjY2M7XCI+bWFraW5nIGRpdjwvZGl2PlxuPGJyLz5cbjxhIGNsYXNzPVwid2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0IGJ0blwiIGRhdGEtYnRuPVwibWFza1wiPk9wZW4gTWFzazwvYT5cbjxhIGNsYXNzPVwid2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0IGJ0blwiIGRhdGEtYnRuPVwibWFzay1jb250ZW50XCI+T3BlbiBNYXNrKHdpdGggY29udGVudCk8L2E+XG48YSBjbGFzcz1cIndhdmVzLWVmZmVjdCB3YXZlcy1saWdodCBidG5cIiBkYXRhLWJ0bj1cIm1hc2stZGl2XCI+T3BlbiBNYXNrKG1hc2tpbmcpPC9hPlxuYDtcblxubGV0IGZuID0ge307XG5mbi5tb2R1bGVSdW4gPSBmdW5jdGlvbiAoJGJvZHkpIHtcbiAgLy8vLy9+fn5+fn5+fn5+fn5+fn5+fn5cbiAgZm4ubXlNYXNrID0gbmV3IE1hc2soKTtcbiAgZm4ubXlNYXNrLnNldENvbmZpZyh7XG4gICAgekluZGV4OiAxMDAwLFxuICAgIG9uU3RhdGVDaGFuZ2VkOiBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzKTtcbiAgICB9XG4gIH0pO1xuXG4gIGZuLm15TWFzay5vbkNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMpO1xuICAgIGZuLm15TWFzay5mYWRlT3V0KCk7XG4gIH07XG5cbiAgJGJvZHkub24oXCJjbGlja1wiLCAnW2RhdGEtYnRuXScsIChlKSA9PiB7XG4gICAgbGV0IGJ0biA9IGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWJ0blwiKTtcbiAgICBsZXQgcHJvY2Vzc29yID0ge1xuICAgICAgbWFzaygpIHtcbiAgICAgICAgZm4ubXlNYXNrLm9wZW4oKTtcbiAgICAgIH0sXG4gICAgICBcIm1hc2stY29udGVudFwiKCkge1xuICAgICAgICBmbi5teU1hc2sub3Blbih7XG4gICAgICAgICAgY29udGVudDogXCJNQVNLIENPTlRFTlRcIlxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBcIm1hc2stZGl2XCIoKSB7XG4gICAgICAgIGZuLm15TWFzay5vcGVuKHtcbiAgICAgICAgICB0YXJnZXQ6ICQoJyNtYWtpbmctZGl2JylcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmIChidG4gaW4gcHJvY2Vzc29yKSB7XG4gICAgICBwcm9jZXNzb3JbYnRuXSgpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5mbi5tb2R1bGVEZXN0cm95ID0gZnVuY3Rpb24gKCRib2R5KSB7XG4gIGZuLm15TWFzay5kZXN0b3J5KCk7XG4gIGZuLm15TWFzayA9IG51bGw7XG4gICRib2R5Lm9mZihcImNsaWNrXCIpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBodG1sOiBodG1sLFxuICBmbjogZm5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYXNrLmpzIiwiLyohXG4gKiBtdXN0YWNoZS5qcyAtIExvZ2ljLWxlc3Mge3ttdXN0YWNoZX19IHRlbXBsYXRlcyB3aXRoIEphdmFTY3JpcHRcbiAqIGh0dHA6Ly9naXRodWIuY29tL2phbmwvbXVzdGFjaGUuanNcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS90aG9tYXNKYW5nL211c3RhY2hlLmpzIC0tIGltcG9yb3ZlIHNvbWUgdmFyaWFibGVzXG4gKi9cblxuXG4vKipcbiAqIEFYNk11c3RhY2hl64qUIGh0dHA6Ly9naXRodWIuY29tL2phbmwvbXVzdGFjaGUuanPsl5Ag66qH6rCA7KeAIOy1nOyGjO2VnOydmCDquLDriqXsnYQg7Yqc64ud7ZWY7JesIOyCrOyaqe2VmOuKlCDthZztlIzrpr8g7JeU7KeE7J6F64uI64ukLlxuICogQG5hbWVzcGFjZSBBWDZNdXN0YWNoZVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBBWDZNdXN0YWNoZS5yZW5kZXJcbiAqIEBleGFtcGxlXG4gKiBgYGBqc1xuICogYXg1Lm11c3RhY2hlLnJlbmRlcih0ZW1wbGF0ZSwgdmlldylcbiAqXG4gKlxuICogLy9BcnJheSBAaVxuICogLy97eyNiZWF0bGVzfX1cbiAqIC8ve3tmaXJzdE5hbWV9fSB7e2xhc3ROYW1lfX0gKHt7QGl9fSkgKHt7QGZpcnN0fX0pXG4gKiAvL3t7L2JlYXRsZXN9fVxuICpcbiAqIC8vT2JqZWN0IEBlYWNoXG4gKiB7eyNiZWF0bGVzfX1cbiAqICB7eyNAZWFjaH19XG4gKiAgICAgIHt7QGtleX19IDoge3tAdmFsdWUuZmlyc3ROYW1lfX0ge3tAdmFsdWUubGFzdE5hbWV9fVxuICogIHt7L0BlYWNofX1cbiAqIHt7L2JlYXRsZXN9fVxuICpcbiAqIGBgYFxuICovXG5cblxuXG5sZXQgQVg2ID0ge307XG5cbihmdW5jdGlvbiBkZWZpbmVNdXN0YWNoZShnbG9iYWwsIGZhY3RvcnkpIHtcblxuICBmYWN0b3J5KGdsb2JhbC5tdXN0YWNoZSA9IHt9KTtcblxufShBWDYsIGZ1bmN0aW9uIG11c3RhY2hlRmFjdG9yeShtdXN0YWNoZSkge1xuXG4gIHZhciBvYmplY3RUb1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG4gIHZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiBpc0FycmF5UG9seWZpbGwob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdFRvU3RyaW5nLmNhbGwob2JqZWN0KSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgfTtcblxuICBmdW5jdGlvbiBpc0Z1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnZnVuY3Rpb24nO1xuICB9XG5cbiAgLyoqXG4gICAqIE1vcmUgY29ycmVjdCB0eXBlb2Ygc3RyaW5nIGhhbmRsaW5nIGFycmF5XG4gICAqIHdoaWNoIG5vcm1hbGx5IHJldHVybnMgdHlwZW9mICdvYmplY3QnXG4gICAqL1xuICBmdW5jdGlvbiB0eXBlU3RyKG9iaikge1xuICAgIHJldHVybiBpc0FycmF5KG9iaikgPyAnYXJyYXknIDogdHlwZW9mIG9iajtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVzY2FwZVJlZ0V4cChzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoL1tcXC1cXFtcXF17fSgpKis/LixcXFxcXFxeJHwjXFxzXS9nLCAnXFxcXCQmJyk7XG4gIH1cblxuICAvKipcbiAgICogTnVsbCBzYWZlIHdheSBvZiBjaGVja2luZyB3aGV0aGVyIG9yIG5vdCBhbiBvYmplY3QsXG4gICAqIGluY2x1ZGluZyBpdHMgcHJvdG90eXBlLCBoYXMgYSBnaXZlbiBwcm9wZXJ0eVxuICAgKi9cbiAgZnVuY3Rpb24gaGFzUHJvcGVydHkob2JqLCBwcm9wTmFtZSkge1xuICAgIHJldHVybiBvYmogIT0gbnVsbCAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiAocHJvcE5hbWUgaW4gb2JqKTtcbiAgfVxuXG4gIC8vIFdvcmthcm91bmQgZm9yIGh0dHBzOi8vaXNzdWVzLmFwYWNoZS5vcmcvamlyYS9icm93c2UvQ09VQ0hEQi01NzdcbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qYW5sL211c3RhY2hlLmpzL2lzc3Vlcy8xODlcbiAgdmFyIHJlZ0V4cFRlc3QgPSBSZWdFeHAucHJvdG90eXBlLnRlc3Q7XG5cbiAgZnVuY3Rpb24gdGVzdFJlZ0V4cChyZSwgc3RyaW5nKSB7XG4gICAgcmV0dXJuIHJlZ0V4cFRlc3QuY2FsbChyZSwgc3RyaW5nKTtcbiAgfVxuXG4gIHZhciBub25TcGFjZVJlID0gL1xcUy87XG5cbiAgZnVuY3Rpb24gaXNXaGl0ZXNwYWNlKHN0cmluZykge1xuICAgIHJldHVybiAhdGVzdFJlZ0V4cChub25TcGFjZVJlLCBzdHJpbmcpO1xuICB9XG5cbiAgdmFyIGVudGl0eU1hcCA9IHtcbiAgICAnJic6ICcmYW1wOycsICc8JzogJyZsdDsnLCAnPic6ICcmZ3Q7JywgJ1wiJzogJyZxdW90OycsIFwiJ1wiOiAnJiMzOTsnLCAnLyc6ICcmI3gyRjsnXG4gIH07XG5cbiAgZnVuY3Rpb24gZXNjYXBlSHRtbChzdHJpbmcpIHtcbiAgICByZXR1cm4gU3RyaW5nKHN0cmluZykucmVwbGFjZSgvWyY8PlwiJ1xcL10vZywgZnVuY3Rpb24gZnJvbUVudGl0eU1hcChzKSB7XG4gICAgICByZXR1cm4gZW50aXR5TWFwW3NdO1xuICAgIH0pO1xuICB9XG5cbiAgdmFyIHdoaXRlUmUgPSAvXFxzKi87XG4gIHZhciBzcGFjZVJlID0gL1xccysvO1xuICB2YXIgZXF1YWxzUmUgPSAvXFxzKj0vO1xuICB2YXIgY3VybHlSZSA9IC9cXHMqXFx9LztcbiAgdmFyIHRhZ1JlID0gLyN8XFxefFxcL3w+fFxce3wmfD18IS87XG5cbiAgLyoqXG4gICAqIEJyZWFrcyB1cCB0aGUgZ2l2ZW4gYHRlbXBsYXRlYCBzdHJpbmcgaW50byBhIHRyZWUgb2YgdG9rZW5zLiBJZiB0aGUgYHRhZ3NgXG4gICAqIGFyZ3VtZW50IGlzIGdpdmVuIGhlcmUgaXQgbXVzdCBiZSBhbiBhcnJheSB3aXRoIHR3byBzdHJpbmcgdmFsdWVzOiB0aGVcbiAgICogb3BlbmluZyBhbmQgY2xvc2luZyB0YWdzIHVzZWQgaW4gdGhlIHRlbXBsYXRlIChlLmcuIFsgXCI8JVwiLCBcIiU+XCIgXSkuIE9mXG4gICAqIGNvdXJzZSwgdGhlIGRlZmF1bHQgaXMgdG8gdXNlIG11c3RhY2hlcyAoaS5lLiBtdXN0YWNoZS50YWdzKS5cbiAgICpcbiAgICogQSB0b2tlbiBpcyBhbiBhcnJheSB3aXRoIGF0IGxlYXN0IDQgZWxlbWVudHMuIFRoZSBmaXJzdCBlbGVtZW50IGlzIHRoZVxuICAgKiBtdXN0YWNoZSBzeW1ib2wgdGhhdCB3YXMgdXNlZCBpbnNpZGUgdGhlIHRhZywgZS5nLiBcIiNcIiBvciBcIiZcIi4gSWYgdGhlIHRhZ1xuICAgKiBkaWQgbm90IGNvbnRhaW4gYSBzeW1ib2wgKGkuZS4ge3tteVZhbHVlfX0pIHRoaXMgZWxlbWVudCBpcyBcIm5hbWVcIi4gRm9yXG4gICAqIGFsbCB0ZXh0IHRoYXQgYXBwZWFycyBvdXRzaWRlIGEgc3ltYm9sIHRoaXMgZWxlbWVudCBpcyBcInRleHRcIi5cbiAgICpcbiAgICogVGhlIHNlY29uZCBlbGVtZW50IG9mIGEgdG9rZW4gaXMgaXRzIFwidmFsdWVcIi4gRm9yIG11c3RhY2hlIHRhZ3MgdGhpcyBpc1xuICAgKiB3aGF0ZXZlciBlbHNlIHdhcyBpbnNpZGUgdGhlIHRhZyBiZXNpZGVzIHRoZSBvcGVuaW5nIHN5bWJvbC4gRm9yIHRleHQgdG9rZW5zXG4gICAqIHRoaXMgaXMgdGhlIHRleHQgaXRzZWxmLlxuICAgKlxuICAgKiBUaGUgdGhpcmQgYW5kIGZvdXJ0aCBlbGVtZW50cyBvZiB0aGUgdG9rZW4gYXJlIHRoZSBzdGFydCBhbmQgZW5kIGluZGljZXMsXG4gICAqIHJlc3BlY3RpdmVseSwgb2YgdGhlIHRva2VuIGluIHRoZSBvcmlnaW5hbCB0ZW1wbGF0ZS5cbiAgICpcbiAgICogVG9rZW5zIHRoYXQgYXJlIHRoZSByb290IG5vZGUgb2YgYSBzdWJ0cmVlIGNvbnRhaW4gdHdvIG1vcmUgZWxlbWVudHM6IDEpIGFuXG4gICAqIGFycmF5IG9mIHRva2VucyBpbiB0aGUgc3VidHJlZSBhbmQgMikgdGhlIGluZGV4IGluIHRoZSBvcmlnaW5hbCB0ZW1wbGF0ZSBhdFxuICAgKiB3aGljaCB0aGUgY2xvc2luZyB0YWcgZm9yIHRoYXQgc2VjdGlvbiBiZWdpbnMuXG4gICAqL1xuICBmdW5jdGlvbiBwYXJzZVRlbXBsYXRlKHRlbXBsYXRlLCB0YWdzKSB7XG4gICAgaWYgKCF0ZW1wbGF0ZSlcbiAgICAgIHJldHVybiBbXTtcblxuICAgIHZhciBzZWN0aW9ucyA9IFtdOyAgICAgLy8gU3RhY2sgdG8gaG9sZCBzZWN0aW9uIHRva2Vuc1xuICAgIHZhciB0b2tlbnMgPSBbXTsgICAgICAgLy8gQnVmZmVyIHRvIGhvbGQgdGhlIHRva2Vuc1xuICAgIHZhciBzcGFjZXMgPSBbXTsgICAgICAgLy8gSW5kaWNlcyBvZiB3aGl0ZXNwYWNlIHRva2VucyBvbiB0aGUgY3VycmVudCBsaW5lXG4gICAgdmFyIGhhc1RhZyA9IGZhbHNlOyAgICAvLyBJcyB0aGVyZSBhIHt7dGFnfX0gb24gdGhlIGN1cnJlbnQgbGluZT9cbiAgICB2YXIgbm9uU3BhY2UgPSBmYWxzZTsgIC8vIElzIHRoZXJlIGEgbm9uLXNwYWNlIGNoYXIgb24gdGhlIGN1cnJlbnQgbGluZT9cblxuICAgIC8vIFN0cmlwcyBhbGwgd2hpdGVzcGFjZSB0b2tlbnMgYXJyYXkgZm9yIHRoZSBjdXJyZW50IGxpbmVcbiAgICAvLyBpZiB0aGVyZSB3YXMgYSB7eyN0YWd9fSBvbiBpdCBhbmQgb3RoZXJ3aXNlIG9ubHkgc3BhY2UuXG4gICAgZnVuY3Rpb24gc3RyaXBTcGFjZSgpIHtcbiAgICAgIGlmIChoYXNUYWcgJiYgIW5vblNwYWNlKSB7XG4gICAgICAgIHdoaWxlIChzcGFjZXMubGVuZ3RoKVxuICAgICAgICAgIGRlbGV0ZSB0b2tlbnNbc3BhY2VzLnBvcCgpXTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBzcGFjZXMgPSBbXTtcbiAgICAgIH1cblxuICAgICAgaGFzVGFnID0gZmFsc2U7XG4gICAgICBub25TcGFjZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBvcGVuaW5nVGFnUmUsIGNsb3NpbmdUYWdSZSwgY2xvc2luZ0N1cmx5UmU7XG5cbiAgICBmdW5jdGlvbiBjb21waWxlVGFncyh0YWdzVG9Db21waWxlKSB7XG4gICAgICBpZiAodHlwZW9mIHRhZ3NUb0NvbXBpbGUgPT09ICdzdHJpbmcnKVxuICAgICAgICB0YWdzVG9Db21waWxlID0gdGFnc1RvQ29tcGlsZS5zcGxpdChzcGFjZVJlLCAyKTtcblxuICAgICAgaWYgKCFpc0FycmF5KHRhZ3NUb0NvbXBpbGUpIHx8IHRhZ3NUb0NvbXBpbGUubGVuZ3RoICE9PSAyKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgdGFnczogJyArIHRhZ3NUb0NvbXBpbGUpO1xuXG4gICAgICBvcGVuaW5nVGFnUmUgPSBuZXcgUmVnRXhwKGVzY2FwZVJlZ0V4cCh0YWdzVG9Db21waWxlWzBdKSArICdcXFxccyonKTtcbiAgICAgIGNsb3NpbmdUYWdSZSA9IG5ldyBSZWdFeHAoJ1xcXFxzKicgKyBlc2NhcGVSZWdFeHAodGFnc1RvQ29tcGlsZVsxXSkpO1xuICAgICAgY2xvc2luZ0N1cmx5UmUgPSBuZXcgUmVnRXhwKCdcXFxccyonICsgZXNjYXBlUmVnRXhwKCd9JyArIHRhZ3NUb0NvbXBpbGVbMV0pKTtcbiAgICB9XG5cbiAgICBjb21waWxlVGFncyh0YWdzIHx8IG11c3RhY2hlLnRhZ3MpO1xuXG4gICAgdmFyIHNjYW5uZXIgPSBuZXcgU2Nhbm5lcih0ZW1wbGF0ZSk7XG5cbiAgICB2YXIgc3RhcnQsIHR5cGUsIHZhbHVlLCBjaHIsIHRva2VuLCBvcGVuU2VjdGlvbjtcbiAgICB3aGlsZSAoIXNjYW5uZXIuZW9zKCkpIHtcbiAgICAgIHN0YXJ0ID0gc2Nhbm5lci5wb3M7XG5cbiAgICAgIC8vIE1hdGNoIGFueSB0ZXh0IGJldHdlZW4gdGFncy5cbiAgICAgIHZhbHVlID0gc2Nhbm5lci5zY2FuVW50aWwob3BlbmluZ1RhZ1JlKTtcblxuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCB2YWx1ZUxlbmd0aCA9IHZhbHVlLmxlbmd0aDsgaSA8IHZhbHVlTGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBjaHIgPSB2YWx1ZS5jaGFyQXQoaSk7XG5cbiAgICAgICAgICBpZiAoaXNXaGl0ZXNwYWNlKGNocikpIHtcbiAgICAgICAgICAgIHNwYWNlcy5wdXNoKHRva2Vucy5sZW5ndGgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG5vblNwYWNlID0gdHJ1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0b2tlbnMucHVzaChbJ3RleHQnLCBjaHIsIHN0YXJ0LCBzdGFydCArIDFdKTtcbiAgICAgICAgICBzdGFydCArPSAxO1xuXG4gICAgICAgICAgLy8gQ2hlY2sgZm9yIHdoaXRlc3BhY2Ugb24gdGhlIGN1cnJlbnQgbGluZS5cbiAgICAgICAgICBpZiAoY2hyID09PSAnXFxuJylcbiAgICAgICAgICAgIHN0cmlwU3BhY2UoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBNYXRjaCB0aGUgb3BlbmluZyB0YWcuXG4gICAgICBpZiAoIXNjYW5uZXIuc2NhbihvcGVuaW5nVGFnUmUpKVxuICAgICAgICBicmVhaztcblxuICAgICAgaGFzVGFnID0gdHJ1ZTtcblxuICAgICAgLy8gR2V0IHRoZSB0YWcgdHlwZS5cbiAgICAgIHR5cGUgPSBzY2FubmVyLnNjYW4odGFnUmUpIHx8ICduYW1lJztcbiAgICAgIHNjYW5uZXIuc2Nhbih3aGl0ZVJlKTtcblxuICAgICAgLy8gR2V0IHRoZSB0YWcgdmFsdWUuXG4gICAgICBpZiAodHlwZSA9PT0gJz0nKSB7XG4gICAgICAgIHZhbHVlID0gc2Nhbm5lci5zY2FuVW50aWwoZXF1YWxzUmUpO1xuICAgICAgICBzY2FubmVyLnNjYW4oZXF1YWxzUmUpO1xuICAgICAgICBzY2FubmVyLnNjYW5VbnRpbChjbG9zaW5nVGFnUmUpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJ3snKSB7XG4gICAgICAgIHZhbHVlID0gc2Nhbm5lci5zY2FuVW50aWwoY2xvc2luZ0N1cmx5UmUpO1xuICAgICAgICBzY2FubmVyLnNjYW4oY3VybHlSZSk7XG4gICAgICAgIHNjYW5uZXIuc2NhblVudGlsKGNsb3NpbmdUYWdSZSk7XG4gICAgICAgIHR5cGUgPSAnJic7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBzY2FubmVyLnNjYW5VbnRpbChjbG9zaW5nVGFnUmUpO1xuICAgICAgfVxuXG4gICAgICAvLyBNYXRjaCB0aGUgY2xvc2luZyB0YWcuXG4gICAgICBpZiAoIXNjYW5uZXIuc2NhbihjbG9zaW5nVGFnUmUpKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuY2xvc2VkIHRhZyBhdCAnICsgc2Nhbm5lci5wb3MpO1xuXG4gICAgICB0b2tlbiA9IFt0eXBlLCB2YWx1ZSwgc3RhcnQsIHNjYW5uZXIucG9zXTtcbiAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcblxuICAgICAgaWYgKHR5cGUgPT09ICcjJyB8fCB0eXBlID09PSAnXicpIHtcbiAgICAgICAgc2VjdGlvbnMucHVzaCh0b2tlbik7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0eXBlID09PSAnLycpIHtcbiAgICAgICAgLy8gQ2hlY2sgc2VjdGlvbiBuZXN0aW5nLlxuICAgICAgICBvcGVuU2VjdGlvbiA9IHNlY3Rpb25zLnBvcCgpO1xuXG4gICAgICAgIGlmICghb3BlblNlY3Rpb24pXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbm9wZW5lZCBzZWN0aW9uIFwiJyArIHZhbHVlICsgJ1wiIGF0ICcgKyBzdGFydCk7XG5cbiAgICAgICAgaWYgKG9wZW5TZWN0aW9uWzFdICE9PSB2YWx1ZSlcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuY2xvc2VkIHNlY3Rpb24gXCInICsgb3BlblNlY3Rpb25bMV0gKyAnXCIgYXQgJyArIHN0YXJ0KTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICduYW1lJyB8fCB0eXBlID09PSAneycgfHwgdHlwZSA9PT0gJyYnKSB7XG4gICAgICAgIG5vblNwYWNlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICc9Jykge1xuICAgICAgICAvLyBTZXQgdGhlIHRhZ3MgZm9yIHRoZSBuZXh0IHRpbWUgYXJvdW5kLlxuICAgICAgICBjb21waWxlVGFncyh2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gTWFrZSBzdXJlIHRoZXJlIGFyZSBubyBvcGVuIHNlY3Rpb25zIHdoZW4gd2UncmUgZG9uZS5cbiAgICBvcGVuU2VjdGlvbiA9IHNlY3Rpb25zLnBvcCgpO1xuXG4gICAgaWYgKG9wZW5TZWN0aW9uKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmNsb3NlZCBzZWN0aW9uIFwiJyArIG9wZW5TZWN0aW9uWzFdICsgJ1wiIGF0ICcgKyBzY2FubmVyLnBvcyk7XG5cbiAgICByZXR1cm4gbmVzdFRva2VucyhzcXVhc2hUb2tlbnModG9rZW5zKSk7XG4gIH1cblxuICAvKipcbiAgICogQ29tYmluZXMgdGhlIHZhbHVlcyBvZiBjb25zZWN1dGl2ZSB0ZXh0IHRva2VucyBpbiB0aGUgZ2l2ZW4gYHRva2Vuc2AgYXJyYXlcbiAgICogdG8gYSBzaW5nbGUgdG9rZW4uXG4gICAqL1xuICBmdW5jdGlvbiBzcXVhc2hUb2tlbnModG9rZW5zKSB7XG4gICAgdmFyIHNxdWFzaGVkVG9rZW5zID0gW107XG5cbiAgICB2YXIgdG9rZW4sIGxhc3RUb2tlbjtcbiAgICBmb3IgKHZhciBpID0gMCwgbnVtVG9rZW5zID0gdG9rZW5zLmxlbmd0aDsgaSA8IG51bVRva2VuczsgKytpKSB7XG4gICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcblxuICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgIGlmICh0b2tlblswXSA9PT0gJ3RleHQnICYmIGxhc3RUb2tlbiAmJiBsYXN0VG9rZW5bMF0gPT09ICd0ZXh0Jykge1xuICAgICAgICAgIGxhc3RUb2tlblsxXSArPSB0b2tlblsxXTtcbiAgICAgICAgICBsYXN0VG9rZW5bM10gPSB0b2tlblszXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBzcXVhc2hlZFRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgICBsYXN0VG9rZW4gPSB0b2tlbjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzcXVhc2hlZFRva2VucztcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JtcyB0aGUgZ2l2ZW4gYXJyYXkgb2YgYHRva2Vuc2AgaW50byBhIG5lc3RlZCB0cmVlIHN0cnVjdHVyZSB3aGVyZVxuICAgKiB0b2tlbnMgdGhhdCByZXByZXNlbnQgYSBzZWN0aW9uIGhhdmUgdHdvIGFkZGl0aW9uYWwgaXRlbXM6IDEpIGFuIGFycmF5IG9mXG4gICAqIGFsbCB0b2tlbnMgdGhhdCBhcHBlYXIgaW4gdGhhdCBzZWN0aW9uIGFuZCAyKSB0aGUgaW5kZXggaW4gdGhlIG9yaWdpbmFsXG4gICAqIHRlbXBsYXRlIHRoYXQgcmVwcmVzZW50cyB0aGUgZW5kIG9mIHRoYXQgc2VjdGlvbi5cbiAgICovXG4gIGZ1bmN0aW9uIG5lc3RUb2tlbnModG9rZW5zKSB7XG4gICAgdmFyIG5lc3RlZFRva2VucyA9IFtdO1xuICAgIHZhciBjb2xsZWN0b3IgPSBuZXN0ZWRUb2tlbnM7XG4gICAgdmFyIHNlY3Rpb25zID0gW107XG5cbiAgICB2YXIgdG9rZW4sIHNlY3Rpb247XG4gICAgZm9yICh2YXIgaSA9IDAsIG51bVRva2VucyA9IHRva2Vucy5sZW5ndGg7IGkgPCBudW1Ub2tlbnM7ICsraSkge1xuICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XG5cbiAgICAgIHN3aXRjaCAodG9rZW5bMF0pIHtcbiAgICAgICAgY2FzZSAnIyc6XG4gICAgICAgIGNhc2UgJ14nOlxuICAgICAgICAgIGNvbGxlY3Rvci5wdXNoKHRva2VuKTtcbiAgICAgICAgICBzZWN0aW9ucy5wdXNoKHRva2VuKTtcbiAgICAgICAgICBjb2xsZWN0b3IgPSB0b2tlbls0XSA9IFtdO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICcvJzpcbiAgICAgICAgICBzZWN0aW9uID0gc2VjdGlvbnMucG9wKCk7XG4gICAgICAgICAgc2VjdGlvbls1XSA9IHRva2VuWzJdO1xuICAgICAgICAgIGNvbGxlY3RvciA9IHNlY3Rpb25zLmxlbmd0aCA+IDAgPyBzZWN0aW9uc1tzZWN0aW9ucy5sZW5ndGggLSAxXVs0XSA6IG5lc3RlZFRva2VucztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb2xsZWN0b3IucHVzaCh0b2tlbik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5lc3RlZFRva2VucztcbiAgfVxuXG4gIC8qKlxuICAgKiBBIHNpbXBsZSBzdHJpbmcgc2Nhbm5lciB0aGF0IGlzIHVzZWQgYnkgdGhlIHRlbXBsYXRlIHBhcnNlciB0byBmaW5kXG4gICAqIHRva2VucyBpbiB0ZW1wbGF0ZSBzdHJpbmdzLlxuICAgKi9cbiAgZnVuY3Rpb24gU2Nhbm5lcihzdHJpbmcpIHtcbiAgICB0aGlzLnN0cmluZyA9IHN0cmluZztcbiAgICB0aGlzLnRhaWwgPSBzdHJpbmc7XG4gICAgdGhpcy5wb3MgPSAwO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYHRydWVgIGlmIHRoZSB0YWlsIGlzIGVtcHR5IChlbmQgb2Ygc3RyaW5nKS5cbiAgICovXG4gIFNjYW5uZXIucHJvdG90eXBlLmVvcyA9IGZ1bmN0aW9uIGVvcygpIHtcbiAgICByZXR1cm4gdGhpcy50YWlsID09PSAnJztcbiAgfTtcblxuICAvKipcbiAgICogVHJpZXMgdG8gbWF0Y2ggdGhlIGdpdmVuIHJlZ3VsYXIgZXhwcmVzc2lvbiBhdCB0aGUgY3VycmVudCBwb3NpdGlvbi5cbiAgICogUmV0dXJucyB0aGUgbWF0Y2hlZCB0ZXh0IGlmIGl0IGNhbiBtYXRjaCwgdGhlIGVtcHR5IHN0cmluZyBvdGhlcndpc2UuXG4gICAqL1xuICBTY2FubmVyLnByb3RvdHlwZS5zY2FuID0gZnVuY3Rpb24gc2NhbihyZSkge1xuICAgIHZhciBtYXRjaCA9IHRoaXMudGFpbC5tYXRjaChyZSk7XG5cbiAgICBpZiAoIW1hdGNoIHx8IG1hdGNoLmluZGV4ICE9PSAwKVxuICAgICAgcmV0dXJuICcnO1xuXG4gICAgdmFyIHN0cmluZyA9IG1hdGNoWzBdO1xuXG4gICAgdGhpcy50YWlsID0gdGhpcy50YWlsLnN1YnN0cmluZyhzdHJpbmcubGVuZ3RoKTtcbiAgICB0aGlzLnBvcyArPSBzdHJpbmcubGVuZ3RoO1xuXG4gICAgcmV0dXJuIHN0cmluZztcbiAgfTtcblxuICAvKipcbiAgICogU2tpcHMgYWxsIHRleHQgdW50aWwgdGhlIGdpdmVuIHJlZ3VsYXIgZXhwcmVzc2lvbiBjYW4gYmUgbWF0Y2hlZC4gUmV0dXJuc1xuICAgKiB0aGUgc2tpcHBlZCBzdHJpbmcsIHdoaWNoIGlzIHRoZSBlbnRpcmUgdGFpbCBpZiBubyBtYXRjaCBjYW4gYmUgbWFkZS5cbiAgICovXG4gIFNjYW5uZXIucHJvdG90eXBlLnNjYW5VbnRpbCA9IGZ1bmN0aW9uIHNjYW5VbnRpbChyZSkge1xuICAgIHZhciBpbmRleCA9IHRoaXMudGFpbC5zZWFyY2gocmUpLCBtYXRjaDtcblxuICAgIHN3aXRjaCAoaW5kZXgpIHtcbiAgICAgIGNhc2UgLTE6XG4gICAgICAgIG1hdGNoID0gdGhpcy50YWlsO1xuICAgICAgICB0aGlzLnRhaWwgPSAnJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIG1hdGNoID0gJyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbWF0Y2ggPSB0aGlzLnRhaWwuc3Vic3RyaW5nKDAsIGluZGV4KTtcbiAgICAgICAgdGhpcy50YWlsID0gdGhpcy50YWlsLnN1YnN0cmluZyhpbmRleCk7XG4gICAgfVxuXG4gICAgdGhpcy5wb3MgKz0gbWF0Y2gubGVuZ3RoO1xuXG4gICAgcmV0dXJuIG1hdGNoO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXByZXNlbnRzIGEgcmVuZGVyaW5nIGNvbnRleHQgYnkgd3JhcHBpbmcgYSB2aWV3IG9iamVjdCBhbmRcbiAgICogbWFpbnRhaW5pbmcgYSByZWZlcmVuY2UgdG8gdGhlIHBhcmVudCBjb250ZXh0LlxuICAgKi9cbiAgZnVuY3Rpb24gQ29udGV4dCh2aWV3LCBwYXJlbnRDb250ZXh0KSB7XG4gICAgdGhpcy52aWV3ID0gdmlldztcbiAgICB0aGlzLmNhY2hlID0ge1xuICAgICAgJy4nOiB0aGlzLnZpZXcsXG4gICAgICAnQGVhY2gnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByZXR1cm5zID0gW107XG4gICAgICAgIGZvciAodmFyIGsgaW4gdGhpcykge1xuICAgICAgICAgIHJldHVybnMucHVzaCh7J0BrZXknOiBrLCAnQHZhbHVlJzogdGhpc1trXX0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXR1cm5zO1xuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5wYXJlbnQgPSBwYXJlbnRDb250ZXh0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgY29udGV4dCB1c2luZyB0aGUgZ2l2ZW4gdmlldyB3aXRoIHRoaXMgY29udGV4dFxuICAgKiBhcyB0aGUgcGFyZW50LlxuICAgKi9cbiAgQ29udGV4dC5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIHB1c2godmlldykge1xuICAgIHJldHVybiBuZXcgQ29udGV4dCh2aWV3LCB0aGlzKTtcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhlIGdpdmVuIG5hbWUgaW4gdGhpcyBjb250ZXh0LCB0cmF2ZXJzaW5nXG4gICAqIHVwIHRoZSBjb250ZXh0IGhpZXJhcmNoeSBpZiB0aGUgdmFsdWUgaXMgYWJzZW50IGluIHRoaXMgY29udGV4dCdzIHZpZXcuXG4gICAqL1xuICBDb250ZXh0LnByb3RvdHlwZS5sb29rdXAgPSBmdW5jdGlvbiBsb29rdXAobmFtZSkge1xuICAgIHZhciBjYWNoZSA9IHRoaXMuY2FjaGU7XG5cbiAgICB2YXIgdmFsdWU7XG4gICAgaWYgKGNhY2hlLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICB2YWx1ZSA9IGNhY2hlW25hbWVdO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcywgbmFtZXMsIGluZGV4LCBsb29rdXBIaXQgPSBmYWxzZTtcblxuICAgICAgd2hpbGUgKGNvbnRleHQpIHtcbiAgICAgICAgaWYgKG5hbWUuaW5kZXhPZignLicpID4gMCkge1xuICAgICAgICAgIHZhbHVlID0gY29udGV4dC52aWV3O1xuICAgICAgICAgIG5hbWVzID0gbmFtZS5zcGxpdCgnLicpO1xuICAgICAgICAgIGluZGV4ID0gMDtcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIFVzaW5nIHRoZSBkb3Qgbm90aW9uIHBhdGggaW4gYG5hbWVgLCB3ZSBkZXNjZW5kIHRocm91Z2ggdGhlXG4gICAgICAgICAgICogbmVzdGVkIG9iamVjdHMuXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBUbyBiZSBjZXJ0YWluIHRoYXQgdGhlIGxvb2t1cCBoYXMgYmVlbiBzdWNjZXNzZnVsLCB3ZSBoYXZlIHRvXG4gICAgICAgICAgICogY2hlY2sgaWYgdGhlIGxhc3Qgb2JqZWN0IGluIHRoZSBwYXRoIGFjdHVhbGx5IGhhcyB0aGUgcHJvcGVydHlcbiAgICAgICAgICAgKiB3ZSBhcmUgbG9va2luZyBmb3IuIFdlIHN0b3JlIHRoZSByZXN1bHQgaW4gYGxvb2t1cEhpdGAuXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBUaGlzIGlzIHNwZWNpYWxseSBuZWNlc3NhcnkgZm9yIHdoZW4gdGhlIHZhbHVlIGhhcyBiZWVuIHNldCB0b1xuICAgICAgICAgICAqIGB1bmRlZmluZWRgIGFuZCB3ZSB3YW50IHRvIGF2b2lkIGxvb2tpbmcgdXAgcGFyZW50IGNvbnRleHRzLlxuICAgICAgICAgICAqKi9cbiAgICAgICAgICB3aGlsZSAodmFsdWUgIT0gbnVsbCAmJiBpbmRleCA8IG5hbWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGluZGV4ID09PSBuYW1lcy5sZW5ndGggLSAxKVxuICAgICAgICAgICAgICBsb29rdXBIaXQgPSBoYXNQcm9wZXJ0eSh2YWx1ZSwgbmFtZXNbaW5kZXhdKTtcblxuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZVtuYW1lc1tpbmRleCsrXV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHZhbHVlID0gY29udGV4dC52aWV3W25hbWVdO1xuICAgICAgICAgIGxvb2t1cEhpdCA9IGhhc1Byb3BlcnR5KGNvbnRleHQudmlldywgbmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobG9va3VwSGl0KVxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNvbnRleHQgPSBjb250ZXh0LnBhcmVudDtcbiAgICAgIH1cblxuICAgICAgY2FjaGVbbmFtZV0gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpXG4gICAgICB2YWx1ZSA9IHZhbHVlLmNhbGwodGhpcy52aWV3KTtcblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcblxuICAvKipcbiAgICogQSBXcml0ZXIga25vd3MgaG93IHRvIHRha2UgYSBzdHJlYW0gb2YgdG9rZW5zIGFuZCByZW5kZXIgdGhlbSB0byBhXG4gICAqIHN0cmluZywgZ2l2ZW4gYSBjb250ZXh0LiBJdCBhbHNvIG1haW50YWlucyBhIGNhY2hlIG9mIHRlbXBsYXRlcyB0b1xuICAgKiBhdm9pZCB0aGUgbmVlZCB0byBwYXJzZSB0aGUgc2FtZSB0ZW1wbGF0ZSB0d2ljZS5cbiAgICovXG4gIGZ1bmN0aW9uIFdyaXRlcigpIHtcbiAgICB0aGlzLmNhY2hlID0ge307XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIGFsbCBjYWNoZWQgdGVtcGxhdGVzIGluIHRoaXMgd3JpdGVyLlxuICAgKi9cbiAgV3JpdGVyLnByb3RvdHlwZS5jbGVhckNhY2hlID0gZnVuY3Rpb24gY2xlYXJDYWNoZSgpIHtcbiAgICB0aGlzLmNhY2hlID0ge307XG4gIH07XG5cbiAgLyoqXG4gICAqIFBhcnNlcyBhbmQgY2FjaGVzIHRoZSBnaXZlbiBgdGVtcGxhdGVgIGFuZCByZXR1cm5zIHRoZSBhcnJheSBvZiB0b2tlbnNcbiAgICogdGhhdCBpcyBnZW5lcmF0ZWQgZnJvbSB0aGUgcGFyc2UuXG4gICAqL1xuICBXcml0ZXIucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24gcGFyc2UodGVtcGxhdGUsIHRhZ3MpIHtcbiAgICB2YXIgY2FjaGUgPSB0aGlzLmNhY2hlO1xuICAgIHZhciB0b2tlbnMgPSBjYWNoZVt0ZW1wbGF0ZV07XG5cbiAgICBpZiAodG9rZW5zID09IG51bGwpXG4gICAgICB0b2tlbnMgPSBjYWNoZVt0ZW1wbGF0ZV0gPSBwYXJzZVRlbXBsYXRlKHRlbXBsYXRlLCB0YWdzKTtcblxuICAgIHJldHVybiB0b2tlbnM7XG4gIH07XG5cbiAgLyoqXG4gICAqIEhpZ2gtbGV2ZWwgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byByZW5kZXIgdGhlIGdpdmVuIGB0ZW1wbGF0ZWAgd2l0aFxuICAgKiB0aGUgZ2l2ZW4gYHZpZXdgLlxuICAgKlxuICAgKiBUaGUgb3B0aW9uYWwgYHBhcnRpYWxzYCBhcmd1bWVudCBtYXkgYmUgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgdGhlXG4gICAqIG5hbWVzIGFuZCB0ZW1wbGF0ZXMgb2YgcGFydGlhbHMgdGhhdCBhcmUgdXNlZCBpbiB0aGUgdGVtcGxhdGUuIEl0IG1heVxuICAgKiBhbHNvIGJlIGEgZnVuY3Rpb24gdGhhdCBpcyB1c2VkIHRvIGxvYWQgcGFydGlhbCB0ZW1wbGF0ZXMgb24gdGhlIGZseVxuICAgKiB0aGF0IHRha2VzIGEgc2luZ2xlIGFyZ3VtZW50OiB0aGUgbmFtZSBvZiB0aGUgcGFydGlhbC5cbiAgICovXG4gIFdyaXRlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscykge1xuICAgIHZhciB0b2tlbnMgPSB0aGlzLnBhcnNlKHRlbXBsYXRlKTtcbiAgICB2YXIgY29udGV4dCA9ICh2aWV3IGluc3RhbmNlb2YgQ29udGV4dCkgPyB2aWV3IDogbmV3IENvbnRleHQodmlldyk7XG4gICAgcmV0dXJuIHRoaXMucmVuZGVyVG9rZW5zKHRva2VucywgY29udGV4dCwgcGFydGlhbHMsIHRlbXBsYXRlKTtcbiAgfTtcblxuICAvKipcbiAgICogTG93LWxldmVsIG1ldGhvZCB0aGF0IHJlbmRlcnMgdGhlIGdpdmVuIGFycmF5IG9mIGB0b2tlbnNgIHVzaW5nXG4gICAqIHRoZSBnaXZlbiBgY29udGV4dGAgYW5kIGBwYXJ0aWFsc2AuXG4gICAqXG4gICAqIE5vdGU6IFRoZSBgb3JpZ2luYWxUZW1wbGF0ZWAgaXMgb25seSBldmVyIHVzZWQgdG8gZXh0cmFjdCB0aGUgcG9ydGlvblxuICAgKiBvZiB0aGUgb3JpZ2luYWwgdGVtcGxhdGUgdGhhdCB3YXMgY29udGFpbmVkIGluIGEgaGlnaGVyLW9yZGVyIHNlY3Rpb24uXG4gICAqIElmIHRoZSB0ZW1wbGF0ZSBkb2Vzbid0IHVzZSBoaWdoZXItb3JkZXIgc2VjdGlvbnMsIHRoaXMgYXJndW1lbnQgbWF5XG4gICAqIGJlIG9taXR0ZWQuXG4gICAqL1xuICBXcml0ZXIucHJvdG90eXBlLnJlbmRlclRva2VucyA9IGZ1bmN0aW9uIHJlbmRlclRva2Vucyh0b2tlbnMsIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKSB7XG4gICAgdmFyIGJ1ZmZlciA9ICcnO1xuICAgIHZhciB0b2tlbiwgc3ltYm9sLCB2YWx1ZTtcbiAgICBmb3IgKHZhciBpID0gMCwgbnVtVG9rZW5zID0gdG9rZW5zLmxlbmd0aDsgaSA8IG51bVRva2VuczsgKytpKSB7XG4gICAgICB2YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgIHRva2VuID0gdG9rZW5zW2ldO1xuICAgICAgc3ltYm9sID0gdG9rZW5bMF07XG5cbiAgICAgIGlmIChzeW1ib2wgPT09ICcjJykgdmFsdWUgPSB0aGlzLnJlbmRlclNlY3Rpb24odG9rZW4sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgICAgIGVsc2UgaWYgKHN5bWJvbCA9PT0gJ14nKSB2YWx1ZSA9IHRoaXMucmVuZGVySW52ZXJ0ZWQodG9rZW4sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgICAgIGVsc2UgaWYgKHN5bWJvbCA9PT0gJz4nKSB2YWx1ZSA9IHRoaXMucmVuZGVyUGFydGlhbCh0b2tlbiwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xuICAgICAgZWxzZSBpZiAoc3ltYm9sID09PSAnJicpIHZhbHVlID0gdGhpcy51bmVzY2FwZWRWYWx1ZSh0b2tlbiwgY29udGV4dCk7XG4gICAgICBlbHNlIGlmIChzeW1ib2wgPT09ICduYW1lJykgdmFsdWUgPSB0aGlzLmVzY2FwZWRWYWx1ZSh0b2tlbiwgY29udGV4dCk7XG4gICAgICBlbHNlIGlmIChzeW1ib2wgPT09ICd0ZXh0JykgdmFsdWUgPSB0aGlzLnJhd1ZhbHVlKHRva2VuKTtcblxuICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpXG4gICAgICAgIGJ1ZmZlciArPSB2YWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmZmVyO1xuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUucmVuZGVyU2VjdGlvbiA9IGZ1bmN0aW9uIHJlbmRlclNlY3Rpb24odG9rZW4sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBidWZmZXIgPSAnJztcblxuICAgIHZhciB2YWx1ZSA9IGNvbnRleHQubG9va3VwKHRva2VuWzFdKTtcblxuICAgIC8vIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byByZW5kZXIgYW4gYXJiaXRyYXJ5IHRlbXBsYXRlXG4gICAgLy8gaW4gdGhlIGN1cnJlbnQgY29udGV4dCBieSBoaWdoZXItb3JkZXIgc2VjdGlvbnMuXG4gICAgZnVuY3Rpb24gc3ViUmVuZGVyKHRlbXBsYXRlKSB7XG4gICAgICByZXR1cm4gc2VsZi5yZW5kZXIodGVtcGxhdGUsIGNvbnRleHQsIHBhcnRpYWxzKTtcbiAgICB9XG5cbiAgICBpZiAoIXZhbHVlKSByZXR1cm47XG5cbiAgICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIGZvciAodmFyIGogPSAwLCB2YWx1ZUxlbmd0aCA9IHZhbHVlLmxlbmd0aDsgaiA8IHZhbHVlTGVuZ3RoOyArK2opIHtcbiAgICAgICAgaWYgKHZhbHVlW2pdKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZVtqXSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHZhbHVlW2pdWydAaSddID0gajtcbiAgICAgICAgICAgIHZhbHVlW2pdWydAZmlyc3QnXSA9IChqID09PSAwKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBidWZmZXIgKz0gdGhpcy5yZW5kZXJUb2tlbnModG9rZW5bNF0sIGNvbnRleHQucHVzaCh2YWx1ZVtqXSksIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgYnVmZmVyICs9IHRoaXMucmVuZGVyVG9rZW5zKHRva2VuWzRdLCBjb250ZXh0LnB1c2godmFsdWUpLCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgICBpZiAodHlwZW9mIG9yaWdpbmFsVGVtcGxhdGUgIT09ICdzdHJpbmcnKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCB1c2UgaGlnaGVyLW9yZGVyIHNlY3Rpb25zIHdpdGhvdXQgdGhlIG9yaWdpbmFsIHRlbXBsYXRlJyk7XG5cbiAgICAgIC8vIEV4dHJhY3QgdGhlIHBvcnRpb24gb2YgdGhlIG9yaWdpbmFsIHRlbXBsYXRlIHRoYXQgdGhlIHNlY3Rpb24gY29udGFpbnMuXG4gICAgICB2YWx1ZSA9IHZhbHVlLmNhbGwoY29udGV4dC52aWV3LCBvcmlnaW5hbFRlbXBsYXRlLnNsaWNlKHRva2VuWzNdLCB0b2tlbls1XSksIHN1YlJlbmRlcik7XG5cbiAgICAgIGlmICh2YWx1ZSAhPSBudWxsKVxuICAgICAgICBidWZmZXIgKz0gdmFsdWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgYnVmZmVyICs9IHRoaXMucmVuZGVyVG9rZW5zKHRva2VuWzRdLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XG4gICAgfVxuICAgIHJldHVybiBidWZmZXI7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5yZW5kZXJJbnZlcnRlZCA9IGZ1bmN0aW9uIHJlbmRlckludmVydGVkKHRva2VuLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSkge1xuICAgIHZhciB2YWx1ZSA9IGNvbnRleHQubG9va3VwKHRva2VuWzFdKTtcblxuICAgIC8vIFVzZSBKYXZhU2NyaXB0J3MgZGVmaW5pdGlvbiBvZiBmYWxzeS4gSW5jbHVkZSBlbXB0eSBhcnJheXMuXG4gICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qYW5sL211c3RhY2hlLmpzL2lzc3Vlcy8xODZcbiAgICBpZiAoIXZhbHVlIHx8IChpc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPT09IDApKVxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyVG9rZW5zKHRva2VuWzRdLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5yZW5kZXJQYXJ0aWFsID0gZnVuY3Rpb24gcmVuZGVyUGFydGlhbCh0b2tlbiwgY29udGV4dCwgcGFydGlhbHMpIHtcbiAgICBpZiAoIXBhcnRpYWxzKSByZXR1cm47XG5cbiAgICB2YXIgdmFsdWUgPSBpc0Z1bmN0aW9uKHBhcnRpYWxzKSA/IHBhcnRpYWxzKHRva2VuWzFdKSA6IHBhcnRpYWxzW3Rva2VuWzFdXTtcbiAgICBpZiAodmFsdWUgIT0gbnVsbClcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlclRva2Vucyh0aGlzLnBhcnNlKHZhbHVlKSwgY29udGV4dCwgcGFydGlhbHMsIHZhbHVlKTtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLnVuZXNjYXBlZFZhbHVlID0gZnVuY3Rpb24gdW5lc2NhcGVkVmFsdWUodG9rZW4sIGNvbnRleHQpIHtcbiAgICB2YXIgdmFsdWUgPSBjb250ZXh0Lmxvb2t1cCh0b2tlblsxXSk7XG4gICAgaWYgKHZhbHVlICE9IG51bGwpXG4gICAgICByZXR1cm4gdmFsdWU7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5lc2NhcGVkVmFsdWUgPSBmdW5jdGlvbiBlc2NhcGVkVmFsdWUodG9rZW4sIGNvbnRleHQpIHtcbiAgICB2YXIgdmFsdWUgPSBjb250ZXh0Lmxvb2t1cCh0b2tlblsxXSk7XG4gICAgaWYgKHZhbHVlICE9IG51bGwpXG4gICAgICByZXR1cm4gbXVzdGFjaGUuZXNjYXBlKHZhbHVlKTtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLnJhd1ZhbHVlID0gZnVuY3Rpb24gcmF3VmFsdWUodG9rZW4pIHtcbiAgICByZXR1cm4gdG9rZW5bMV07XG4gIH07XG5cbiAgbXVzdGFjaGUubmFtZSA9ICdtdXN0YWNoZS5qcyc7XG4gIG11c3RhY2hlLnZlcnNpb24gPSAnMi4xLjMnO1xuICBtdXN0YWNoZS50YWdzID0gWyd7eycsICd9fSddO1xuXG4gIC8vIEFsbCBoaWdoLWxldmVsIG11c3RhY2hlLiogZnVuY3Rpb25zIHVzZSB0aGlzIHdyaXRlci5cbiAgdmFyIGRlZmF1bHRXcml0ZXIgPSBuZXcgV3JpdGVyKCk7XG5cbiAgLyoqXG4gICAqIENsZWFycyBhbGwgY2FjaGVkIHRlbXBsYXRlcyBpbiB0aGUgZGVmYXVsdCB3cml0ZXIuXG4gICAqL1xuICBtdXN0YWNoZS5jbGVhckNhY2hlID0gZnVuY3Rpb24gY2xlYXJDYWNoZSgpIHtcbiAgICByZXR1cm4gZGVmYXVsdFdyaXRlci5jbGVhckNhY2hlKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFBhcnNlcyBhbmQgY2FjaGVzIHRoZSBnaXZlbiB0ZW1wbGF0ZSBpbiB0aGUgZGVmYXVsdCB3cml0ZXIgYW5kIHJldHVybnMgdGhlXG4gICAqIGFycmF5IG9mIHRva2VucyBpdCBjb250YWlucy4gRG9pbmcgdGhpcyBhaGVhZCBvZiB0aW1lIGF2b2lkcyB0aGUgbmVlZCB0b1xuICAgKiBwYXJzZSB0ZW1wbGF0ZXMgb24gdGhlIGZseSBhcyB0aGV5IGFyZSByZW5kZXJlZC5cbiAgICovXG4gIG11c3RhY2hlLnBhcnNlID0gZnVuY3Rpb24gcGFyc2UodGVtcGxhdGUsIHRhZ3MpIHtcbiAgICByZXR1cm4gZGVmYXVsdFdyaXRlci5wYXJzZSh0ZW1wbGF0ZSwgdGFncyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbmRlcnMgdGhlIGB0ZW1wbGF0ZWAgd2l0aCB0aGUgZ2l2ZW4gYHZpZXdgIGFuZCBgcGFydGlhbHNgIHVzaW5nIHRoZVxuICAgKiBkZWZhdWx0IHdyaXRlci5cbiAgICovXG4gIG11c3RhY2hlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcih0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMpIHtcbiAgICBpZiAodHlwZW9mIHRlbXBsYXRlICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCB0ZW1wbGF0ZSEgVGVtcGxhdGUgc2hvdWxkIGJlIGEgXCJzdHJpbmdcIiAnICsgJ2J1dCBcIicgKyB0eXBlU3RyKHRlbXBsYXRlKSArICdcIiB3YXMgZ2l2ZW4gYXMgdGhlIGZpcnN0ICcgKyAnYXJndW1lbnQgZm9yIG11c3RhY2hlI3JlbmRlcih0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMpJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlZmF1bHRXcml0ZXIucmVuZGVyKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscyk7XG4gIH07XG5cbiAgLy8gVGhpcyBpcyBoZXJlIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSB3aXRoIDAuNC54LixcbiAgLyplc2xpbnQtZGlzYWJsZSAqLyAvLyBlc2xpbnQgd2FudHMgY2FtZWwgY2FzZWQgZnVuY3Rpb24gbmFtZVxuICBtdXN0YWNoZS50b19odG1sID0gZnVuY3Rpb24gdG9faHRtbCh0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMsIHNlbmQpIHtcbiAgICAvKmVzbGludC1lbmFibGUqL1xuXG4gICAgdmFyIHJlc3VsdCA9IG11c3RhY2hlLnJlbmRlcih0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMpO1xuXG4gICAgaWYgKGlzRnVuY3Rpb24oc2VuZCkpIHtcbiAgICAgIHNlbmQocmVzdWx0KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfTtcblxuICAvLyBFeHBvcnQgdGhlIGVzY2FwaW5nIGZ1bmN0aW9uIHNvIHRoYXQgdGhlIHVzZXIgbWF5IG92ZXJyaWRlIGl0LlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2phbmwvbXVzdGFjaGUuanMvaXNzdWVzLzI0NFxuICBtdXN0YWNoZS5lc2NhcGUgPSBlc2NhcGVIdG1sO1xuXG4gIC8vIEV4cG9ydCB0aGVzZSBtYWlubHkgZm9yIHRlc3RpbmcsIGJ1dCBhbHNvIGZvciBhZHZhbmNlZCB1c2FnZS5cbiAgbXVzdGFjaGUuU2Nhbm5lciA9IFNjYW5uZXI7XG4gIG11c3RhY2hlLkNvbnRleHQgPSBDb250ZXh0O1xuICBtdXN0YWNoZS5Xcml0ZXIgPSBXcml0ZXI7XG5cbn0pKTtcblxuZXhwb3J0IGRlZmF1bHQgQVg2Lm11c3RhY2hlO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9zcmMvQVg2TXVzdGFjaGUuanMiLCJpbXBvcnQgalF1ZXJ5IGZyb20gXCJqcW1pblwiO1xuaW1wb3J0IEFYNlVJQ29yZSBmcm9tIFwiLi9BWDZVSUNvcmUuanNcIjtcbmltcG9ydCBVIGZyb20gXCIuL0FYNlV0aWxcIjtcbmltcG9ydCBtdXN0YWNoZSBmcm9tIFwiLi9BWDZNdXN0YWNoZS5qc1wiO1xuLyogfn5+fn5+fn5+fn5+fn5+fn5+IGVuZCBvZiBpbXBvcnQgIH5+fn5+fn5+fn5+fn5+fn5+fn5+ICovXG5cbmNvbnN0IGdldEJvZHlUbXBsID0gZnVuY3Rpb24gKGRhdGEsIGNvbHVtbktleXMpIHtcbiAgY29uc3QgZGVmYXVsdE1hc2sgPSBmdW5jdGlvbiAoY29sdW1uS2V5cykge1xuICAgIHJldHVybiBgXG4gICAgICAgICAgICA8ZGl2IGRhdGEtYXg2dWktbWFzaz1cIlwiIGNsYXNzPVwie3t0aGVtZX19XCIgaWQ9XCJ7e21hc2tJZH19XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImF4LW1hc2stYmdcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXgtbWFzay1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJheC1tYXNrLWJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAge3t7Ym9keX19fVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgO1xuICB9O1xuICByZXR1cm4gbXVzdGFjaGUucmVuZGVyKGRlZmF1bHRNYXNrLmNhbGwodGhpcywgY29sdW1uS2V5cyksIGRhdGEpO1xufTtcbmNvbnN0IG9uU3RhdGVDaGFuZ2VkID0gZnVuY3Rpb24gKG9wdHMsIHRoYXQpIHtcbiAgaWYgKG9wdHMgJiYgb3B0cy5vblN0YXRlQ2hhbmdlZCkge1xuICAgIG9wdHMub25TdGF0ZUNoYW5nZWQuY2FsbCh0aGF0LCB0aGF0KTtcbiAgfVxuICBlbHNlIGlmICh0aGlzLm9uU3RhdGVDaGFuZ2VkKSB7XG4gICAgdGhpcy5vblN0YXRlQ2hhbmdlZC5jYWxsKHRoYXQsIHRoYXQpO1xuICB9XG5cbiAgb3B0cyA9IG51bGw7XG4gIHRoYXQgPSBudWxsO1xuICByZXR1cm4gdHJ1ZTtcbn07XG5jb25zdCBzZXRCb2R5ID0gZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgdGhpcy5tYXNrQ29udGVudCA9IGNvbnRlbnQ7XG59O1xuXG4vKiB+fn5+fn5+fn5+fn5+fn5+fn4gZW5kIG9mIHByaXZhdGUgIH5+fn5+fn5+fn5+fn5+fn5+fn5+ICovXG5cbi8qKlxuICogQGNsYXNzXG4gKi9cbmNsYXNzIEFYNlVJTWFzayBleHRlbmRzIEFYNlVJQ29yZSB7XG4gIC8qKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIGNvbmZpZ1xuICAgKi9cbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIC8qKlxuICAgICAqIEBtZW1iZXIge0pTT059XG4gICAgICogQHBhcmFtIGNvbmZpZ1xuICAgICAqIEBwYXJhbSBbY29uZmlnLnRoZW1lXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLnRhcmdldD1kb2N1bWVudC5ib2R5XVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmFuaW1hdGVUaW1lPTI1MF1cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5vblN0YXRlQ2hhbmdlZF1cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5vbkNsaWNrXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmNvbnRlbnRdXG4gICAgICpcbiAgICAgKi9cbiAgICB0aGlzLmNvbmZpZyA9IHtcbiAgICAgIHRoZW1lOiAnJyxcbiAgICAgIHRhcmdldDogalF1ZXJ5KGRvY3VtZW50LmJvZHkpLmdldCgwKSxcbiAgICAgIGFuaW1hdGVUaW1lOiAyNTBcbiAgICB9O1xuICAgIGpRdWVyeS5leHRlbmQodHJ1ZSwgdGhpcy5jb25maWcsIGNvbmZpZyk7XG5cbiAgICAvLyDrqaTrsoQg67OA7IiYIOy0iOq4sO2ZlFxuICAgIC8qKlxuICAgICAqIEBtZW1iZXIge1N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLm1hc2tDb250ZW50ID0gJyc7XG4gICAgLyoqXG4gICAgICogQG1lbWJlciB7U3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMuc3RhdHVzID0gXCJvZmZcIjtcbiAgICAvKipcbiAgICAgKiBAbWVtYmVyIHtKU09OfVxuICAgICAqL1xuICAgIHRoaXMuYWN0aXZlQ29uZmlnID0ge307XG5cbiAgICBpZiAodHlwZW9mIGNvbmZpZyAhPT0gXCJ1bmRlZmluZWRcIikgdGhpcy5pbml0KCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKi9cbiAgaW5pdCgpIHtcbiAgICB0aGlzLm9uU3RhdGVDaGFuZ2VkID0gdGhpcy5jb25maWcub25TdGF0ZUNoYW5nZWQ7XG4gICAgZGVsZXRlIHRoaXMuY29uZmlnLm9uU3RhdGVDaGFuZ2VkO1xuICAgIHRoaXMub25DbGljayA9IHRoaXMuY29uZmlnLm9uQ2xpY2s7XG4gICAgZGVsZXRlIHRoaXMuY29uZmlnLm9uQ2xpY2s7XG5cbiAgICBzZXRCb2R5LmNhbGwodGhpcywgdGhpcy5jb25maWcuY29udGVudCB8fCBcIlwiKTtcblxuICAgIC8vIGluaXQg7Zi47LacIOyXrOu2gFxuICAgIHRoaXMuaW5pdE9uY2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqL1xuICBpbml0T25jZSgpIHtcbiAgICBpZiAodGhpcy5pbml0aWFsaXplZCkgcmV0dXJuIHRoaXM7XG4gICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuekluZGV4XSAtIOuniOyKpO2BrCDsl5jrpqzrqLztirjsnZggei1pbmRleCDqsJLsnYQg7KCV7ZWp64uI64ukXG4gICAqIEByZXR1cm4ge0FYNlVJTWFza31cbiAgICogQGV4YW1wbGVcbiAgICogYGBganNcbiAgICogbGV0IG15TWFzayA9IG5ldyBNYXNrKCk7XG4gICAqIG15TWFzay5zZXRDb25maWcoe1xuICAgICAqICB6SW5kZXg6IDEwMDBcbiAgICAgKiB9KTtcbiAgICpcbiAgICogbXlNYXNrLm9wZW4oKTtcbiAgICogYGBgXG4gICAqL1xuICBvcGVuKG9wdGlvbnMpIHtcbiAgICBpZiAodGhpcy5zdGF0dXMgPT09IFwib25cIikgdGhpcy5jbG9zZSgpO1xuICAgIHNldEJvZHkuY2FsbCh0aGlzLCAob3B0aW9ucykgPyBvcHRpb25zLmNvbnRlbnQgfHwgXCJcIiA6IFwiXCIpO1xuXG4gICAgbGV0IF9jZmcgICAgICAgICA9IGpRdWVyeS5leHRlbmQodHJ1ZSwgdGhpcy5jb25maWcsIG9wdGlvbnMpLFxuICAgICAgICB0YXJnZXQgICAgICAgPSBfY2ZnLnRhcmdldCxcbiAgICAgICAgJHRhcmdldCAgICAgID0galF1ZXJ5KHRhcmdldCksXG4gICAgICAgIG1hc2tJZCAgICAgICA9ICdheC1tYXNrLScgKyB0aGlzLmluc3RhbmNlSWQsXG4gICAgICAgICRtYXNrLFxuICAgICAgICBjc3MgICAgICAgICAgPSB7fSxcbiAgICAgICAgdGhhdCAgICAgICAgID0ge30sXG4gICAgICAgIHRlbXBsYXRlTmFtZSA9IF9jZmcudGVtcGxhdGVOYW1lLFxuICAgICAgICBib2R5ICAgICAgICAgPSBnZXRCb2R5VG1wbCh7XG4gICAgICAgICAgdGhlbWU6IF9jZmcudGhlbWUsXG4gICAgICAgICAgbWFza0lkOiBtYXNrSWQsXG4gICAgICAgICAgYm9keTogdGhpcy5tYXNrQ29udGVudCxcbiAgICAgICAgICB0ZW1wbGF0ZU5hbWU6IHRlbXBsYXRlTmFtZVxuICAgICAgICB9KS50cmltKCk7XG5cbiAgICBqUXVlcnkoZG9jdW1lbnQuYm9keSkuYXBwZW5kKGJvZHkpO1xuXG4gICAgLy8g66eI7Iqk7YGs7J2YIO2DgOqyn+ydtCBodG1sIGJvZHkg6rCAIOyVhOuLiOudvOuptFxuICAgIGlmICh0YXJnZXQgJiYgdGFyZ2V0ICE9PSBqUXVlcnkoZG9jdW1lbnQuYm9keSkuZ2V0KDApKSB7XG4gICAgICBjc3MgPSB7XG4gICAgICAgIHBvc2l0aW9uOiBfY2ZnLnBvc2l0aW9uIHx8IFwiYWJzb2x1dGVcIixcbiAgICAgICAgbGVmdDogJHRhcmdldC5vZmZzZXQoKS5sZWZ0LFxuICAgICAgICB0b3A6ICR0YXJnZXQub2Zmc2V0KCkudG9wLFxuICAgICAgICB3aWR0aDogJHRhcmdldC5vdXRlcldpZHRoKCksXG4gICAgICAgIGhlaWdodDogJHRhcmdldC5vdXRlckhlaWdodCgpXG4gICAgICB9O1xuXG4gICAgICAkdGFyZ2V0LmFkZENsYXNzKFwiYXgtbWFza2luZ1wiKTtcblxuICAgICAgLy8g66eI7Iqk7YGs7J2YIO2DgOqyn+ydtCBodG1sIGJvZHnqsIAg7JWE64uM6rK97JqwIHdpbmRvdyByZXNpemUg7J2067Kk7Yq466W8IOy2lOygge2VmOyXrCDsl5jrpqzrqLztirgg66eI7Iqk7YGs7J2YIENTUyDsho3shLEg67OA6rK9XG4gICAgICBqUXVlcnkod2luZG93KVxuICAgICAgICAub2ZmKFwicmVzaXplLmF4NnVpLW1hc2stXCIgKyB0aGlzLmluc3RhbmNlSWQpXG4gICAgICAgIC5vbihcInJlc2l6ZS5heDZ1aS1tYXNrLVwiICsgdGhpcy5pbnN0YW5jZUlkLCBVLnRocm90dGxlKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgdGhpcy5hbGlnbigpO1xuICAgICAgICB9LCAxMDApLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgX2NmZy56SW5kZXggIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIGNzc1tcInotaW5kZXhcIl0gPSBfY2ZnLnpJbmRleDtcbiAgICB9XG5cbiAgICB0aGlzLiRtYXNrID0gJG1hc2sgPSBqUXVlcnkoXCIjXCIgKyBtYXNrSWQpO1xuICAgIHRoaXMuJHRhcmdldCA9ICR0YXJnZXQ7XG4gICAgdGhpcy5zdGF0dXMgPSBcIm9uXCI7XG4gICAgJG1hc2suY3NzKGNzcyk7XG5cbiAgICBpZiAodGhpcy5vbkNsaWNrKSB7XG4gICAgICAkbWFzay5vbihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIHRoYXQgPSB7XG4gICAgICAgICAgc2VsZjogdGhpcyxcbiAgICAgICAgICBzdGF0ZTogXCJvcGVuXCIsXG4gICAgICAgICAgdHlwZTogXCJjbGlja1wiXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMub25DbGljay5jYWxsKHRoYXQsIHRoYXQpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25TdGF0ZUNoYW5nZWQuY2FsbCh0aGlzLCBudWxsLCB7XG4gICAgICBzZWxmOiB0aGlzLFxuICAgICAgc3RhdGU6IFwib3BlblwiXG4gICAgfSk7XG5cbiAgICAvLyDtmITsnqwg7Zmc7ISx7ZmU65CcIOyEpOyglSDquLDslrVcbiAgICB0aGlzLmFjdGl2ZUNvbmZpZyA9IF9jZmc7XG5cbiAgICBvcHRpb25zID0gbnVsbDtcbiAgICBfY2ZnID0gbnVsbDtcbiAgICB0YXJnZXQgPSBudWxsO1xuICAgICR0YXJnZXQgPSBudWxsO1xuICAgIG1hc2tJZCA9IG51bGw7XG4gICAgJG1hc2sgPSBudWxsO1xuICAgIGNzcyA9IG51bGw7XG4gICAgdGhhdCA9IG51bGw7XG4gICAgdGVtcGxhdGVOYW1lID0gbnVsbDtcbiAgICBib2R5ID0gbnVsbDtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQHBhcmFtIGRlbGF5XG4gICAqIEByZXR1cm4ge0FYNlVJTWFza31cbiAgICovXG4gIGNsb3NlKGRlbGF5KSB7XG4gICAgaWYgKHRoaXMuJG1hc2spIHtcblxuICAgICAgbGV0IF9jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBcIm9mZlwiO1xuICAgICAgICB0aGlzLiRtYXNrLnJlbW92ZSgpO1xuICAgICAgICB0aGlzLiR0YXJnZXQucmVtb3ZlQ2xhc3MoXCJheC1tYXNraW5nXCIpO1xuXG4gICAgICAgIG9uU3RhdGVDaGFuZ2VkLmNhbGwodGhpcywgbnVsbCwge1xuICAgICAgICAgIHNlbGY6IHRoaXMsXG4gICAgICAgICAgc3RhdGU6IFwiY2xvc2VcIlxuICAgICAgICB9KTtcblxuICAgICAgICBqUXVlcnkod2luZG93KS5vZmYoXCJyZXNpemUuYXg2dWktbWFzay1cIiArIHRoaXMuaW5zdGFuY2VJZCk7XG4gICAgICB9O1xuXG4gICAgICBpZiAoZGVsYXkpIHtcbiAgICAgICAgc2V0VGltZW91dCgoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIF9jbG9zZS5jYWxsKHRoaXMpO1xuICAgICAgICB9KS5iaW5kKHRoaXMpLCBkZWxheSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfY2xvc2UuY2FsbCh0aGlzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAcmV0dXJuIHtBWDZVSU1hc2t9XG4gICAqL1xuICBmYWRlT3V0KCkge1xuICAgIGlmICh0aGlzLiRtYXNrKSB7XG4gICAgICBsZXQgX2Nsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnN0YXR1cyA9IFwib2ZmXCI7XG4gICAgICAgIHRoaXMuJG1hc2sucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMuJHRhcmdldC5yZW1vdmVDbGFzcyhcImF4LW1hc2tpbmdcIik7XG5cbiAgICAgICAgb25TdGF0ZUNoYW5nZWQuY2FsbCh0aGlzLCBudWxsLCB7XG4gICAgICAgICAgc2VsZjogdGhpcyxcbiAgICAgICAgICBzdGF0ZTogXCJjbG9zZVwiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGpRdWVyeSh3aW5kb3cpXG4gICAgICAgICAgLm9mZihcInJlc2l6ZS5heDZ1aS1tYXNrLVwiICsgdGhpcy5pbnN0YW5jZUlkKTtcbiAgICAgIH07XG5cblxuICAgICAgdGhpcy4kbWFzay5hZGRDbGFzcyhcImZhZGUtb3V0XCIpO1xuICAgICAgc2V0VGltZW91dCgoZnVuY3Rpb24gKCkge1xuICAgICAgICBfY2xvc2UuY2FsbCh0aGlzKTtcbiAgICAgIH0pLmJpbmQodGhpcyksIHRoaXMuYWN0aXZlQ29uZmlnLmFuaW1hdGVUaW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAcmV0dXJuIHtBWDZVSU1hc2t9XG4gICAqL1xuICBhbGlnbigpIHtcbiAgICBpZiAodGhpcy4kbWFzayAmJiB0aGlzLmFjdGl2ZUNvbmZpZyAmJiB0aGlzLmFjdGl2ZUNvbmZpZy50YXJnZXQgJiYgdGhpcy5hY3RpdmVDb25maWcudGFyZ2V0ICE9PSBqUXVlcnkoZG9jdW1lbnQuYm9keSkuZ2V0KDApKSB7XG4gICAgICB0cnkge1xuICAgICAgICBsZXQgY3NzID0ge1xuICAgICAgICAgIHBvc2l0aW9uOiB0aGlzLmFjdGl2ZUNvbmZpZy5wb3NpdGlvbiB8fCBcImFic29sdXRlXCIsXG4gICAgICAgICAgbGVmdDogdGhpcy4kdGFyZ2V0Lm9mZnNldCgpLmxlZnQsXG4gICAgICAgICAgdG9wOiB0aGlzLiR0YXJnZXQub2Zmc2V0KCkudG9wLFxuICAgICAgICAgIHdpZHRoOiB0aGlzLiR0YXJnZXQub3V0ZXJXaWR0aCgpLFxuICAgICAgICAgIGhlaWdodDogdGhpcy4kdGFyZ2V0Lm91dGVySGVpZ2h0KClcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy4kbWFzay5jc3MoY3NzKTtcbiAgICAgIH1cbiAgICAgIGNhdGNoIChlKSB7XG5cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBkZXN0b3J5KCl7XG4gICAgaWYodGhpcy4kbWFzaykgdGhpcy4kbWFzay5yZW1vdmUoKTtcbiAgICBpZih0aGlzLiR0YXJnZXQpIHRoaXMuJHRhcmdldC5yZW1vdmVDbGFzcyhcImF4LW1hc2tpbmdcIik7XG4gICAgalF1ZXJ5KHdpbmRvdykub2ZmKFwicmVzaXplLmF4NnVpLW1hc2stXCIgKyB0aGlzLmluc3RhbmNlSWQpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFYNlVJTWFzaztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vc3JjL0FYNlVJTWFzay5qcyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zdHlsZS5zY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHt9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3N0eWxlLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3N0eWxlLnNjc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL3NyYy9BWDZVSU1hc2svc3R5bGUuc2Nzc1xuLy8gbW9kdWxlIGlkID0gODZcbi8vIG1vZHVsZSBjaHVua3MgPSA5IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHVuZGVmaW5lZCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJALXdlYmtpdC1rZXlmcmFtZXMgYXgtbWFzayB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMC4wOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDAuNjsgfSB9XFxuXFxuQC1tb3ota2V5ZnJhbWVzIGF4LW1hc2sge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDAuMDsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAwLjY7IH0gfVxcblxcbkBrZXlmcmFtZXMgYXgtbWFzayB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMC4wOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDAuNjsgfSB9XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIGF4LW1hc2stZmFkZS1vdXQge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDAuNjsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAwLjA7IH0gfVxcblxcbkAtbW96LWtleWZyYW1lcyBheC1tYXNrLWZhZGUtb3V0IHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwLjY7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMC4wOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIGF4LW1hc2stZmFkZS1vdXQge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDAuNjsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAwLjA7IH0gfVxcblxcbi5heC1tYXNraW5nIHtcXG4gIC13ZWJraXQtZmlsdGVyOiBibHVyKDNweCk7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMC45Nik7XFxuICAtbW96LXRyYW5zZm9ybTogc2NhbGUoMC45Nik7XFxuICAtbXMtdHJhbnNmb3JtOiBzY2FsZSgwLjk2KTtcXG4gIC1vLXRyYW5zZm9ybTogc2NhbGUoMC45Nik7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDAuOTYpO1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7XFxuICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlWigwKTtcXG4gIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7XFxuICAtby10cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7IH1cXG5cXG5bZGF0YS1heDZ1aS1tYXNrXSB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgei1pbmRleDogMTAwMDtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIGxlZnQ6IDA7XFxuICB0b3A6IDA7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTsgfVxcbiAgW2RhdGEtYXg2dWktbWFza10gKixcXG4gIFtkYXRhLWF4NnVpLW1hc2tdICo6YmVmb3JlLFxcbiAgW2RhdGEtYXg2dWktbWFza10gKjphZnRlciB7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IH1cXG4gIFtkYXRhLWF4NnVpLW1hc2tdIC5heC1tYXNrLWJnIHtcXG4gICAgei1pbmRleDogMTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBsZWZ0OiAwcHg7XFxuICAgIHRvcDogMHB4O1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBiYWNrZ3JvdW5kOiAjMDAwO1xcbiAgICBvcGFjaXR5OiAwLjY7IH1cXG4gIFtkYXRhLWF4NnVpLW1hc2tdIC5heC1tYXNrLWNvbnRlbnQge1xcbiAgICB6LWluZGV4OiAyO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGxlZnQ6IDBweDtcXG4gICAgdG9wOiAwcHg7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGRpc3BsYXk6IHRhYmxlO1xcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICB0ZXh0LXNoYWRvdzogMHB4IDFweCAwcHggIzAwMDsgfVxcbiAgICBbZGF0YS1heDZ1aS1tYXNrXSAuYXgtbWFzay1jb250ZW50ICoge1xcbiAgICAgIGNvbG9yOiBpbmhlcml0OyB9XFxuICAgIFtkYXRhLWF4NnVpLW1hc2tdIC5heC1tYXNrLWNvbnRlbnQgPiBkaXYge1xcbiAgICAgIGRpc3BsYXk6IHRhYmxlLWNlbGw7XFxuICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cXG4gIFtkYXRhLWF4NnVpLW1hc2tdLmZhZGUtb3V0IHtcXG4gICAgLXdlYmtpdC1hbmltYXRpb246IGF4LW1hc2stZmFkZS1vdXQgMC4yNXM7XFxuICAgIC1tb3otYW5pbWF0aW9uOiBheC1tYXNrLWZhZGUtb3V0IDAuMjVzO1xcbiAgICBhbmltYXRpb246IGF4LW1hc2stZmFkZS1vdXQgMC4yNXM7XFxuICAgIG9wYWNpdHk6IDAuMDsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIhLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi9zcmMvQVg2VUlNYXNrL3N0eWxlLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDg3XG4vLyBtb2R1bGUgY2h1bmtzID0gOSJdLCJzb3VyY2VSb290IjoiIn0=