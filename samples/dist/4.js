webpackJsonp([4],{

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AX6UIToast = __webpack_require__(89);

var _AX6UIToast2 = _interopRequireDefault(_AX6UIToast);

__webpack_require__(90);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var html = "\n<a class=\"waves-effect waves-light btn\" data-btn=\"push\">push</a>\n<a class=\"waves-effect waves-light btn\" data-btn=\"confirm\">confirm</a>\n";
var fn = {
  moduleRun: function moduleRun($body) {

    var toast = new _AX6UIToast2.default({
      width: 600,
      containerPosition: "bottom-right"
    });

    $body.on("click", '[data-btn]', function (e) {
      var btn = e.currentTarget.getAttribute("data-btn");
      var processor = {
        push: function push() {
          toast.push("테스트");
        },
        confirm: function confirm() {
          toast.confirm({
            title: "예/아니오",
            msg: "당신은 개발자 입니까?",
            btns: {
              Y: { label: "예" },
              N: { label: "아니오" }
            }
          }, function (res) {
            console.log(res);
          });
        }
      };

      if (btn in processor) {
        processor[btn]();
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

/***/ 89:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jqmin = __webpack_require__(1);

var _jqmin2 = _interopRequireDefault(_jqmin);

var _AX6Util = __webpack_require__(4);

var _AX6Util2 = _interopRequireDefault(_AX6Util);

var _AX6UICore2 = __webpack_require__(5);

var _AX6UICore3 = _interopRequireDefault(_AX6UICore2);

var _AX6Mustache = __webpack_require__(36);

var _AX6Mustache2 = _interopRequireDefault(_AX6Mustache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* ~~~~~~~~~~~~~~~~~~ end of import  ~~~~~~~~~~~~~~~~~~~~ */

var tmpl = {
  display: function display(columnKeys) {
    return "\n<div id=\"{{toastId}}\" data-ax6ui-toast=\"\" class=\"{{theme}}\">\n    {{#icon}}\n    <div class=\"ax-toast-icon\">{{{.}}}</div>\n    {{/icon}}\n    <div class=\"ax-toast-body\">{{{msg}}}</div>\n    {{#btns}}\n    <div class=\"ax-toast-buttons\">\n        <div class=\"ax-button-wrap\">\n            {{#@each}}\n            <button type=\"button\" data-ax-toast-btn=\"{{@key}}\" class=\"btn btn-{{@value.theme}}\">{{{@value.label}}}</button>\n            {{/@each}}\n        </div>\n    </div>\n    {{/btns}}\n    {{^btns}}\n        <a class=\"ax-toast-close\" data-ax-toast-btn=\"ok\">{{{closeIcon}}}</a>\n    {{/btns}}\n    <div style=\"clear:both;\"></div>\n</div>";
  }
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
var getContent = function getContent(toastId, opts) {
  var data = {
    toastId: toastId,
    theme: opts.theme,
    icon: opts.icon,
    msg: (opts.msg || "").replace(/\n/g, "<br/>"),
    btns: opts.btns,
    closeIcon: opts.closeIcon
  };

  try {
    return _AX6Mustache2.default.render(tmpl.display.call(this), data);
  } finally {
    toastId = null;
    data = null;
  }
};
var open = function open(opts, callback) {
  var _this = this;

  if (this.toastSeqClear) clearTimeout(this.toastSeqClear);

  var $toastBox = void 0,
      box = {
    width: opts.width
  };

  opts.id = 'ax6ui-toast-' + this.instanceId + '-' + ++this.toastSeq;

  if ((0, _jqmin2.default)('#' + opts.id).get(0)) return this;

  $toastBox = (0, _jqmin2.default)(getContent(opts.id, opts));
  $toastBox.css({ width: this.$toastContainer.width() });

  if (_AX6Util2.default.left(this.config.containerPosition, '-') == 'bottom') {
    this.$toastContainer.append($toastBox);
  } else {
    this.$toastContainer.prepend($toastBox);
  }

  opts.$toastBox = $toastBox;
  this.queue.push(opts);

  onStateChanged.call(this, opts, {
    self: this,
    state: "open",
    toastId: opts.id
  });

  if (opts.toastType === "push") {
    // 자동 제거 타이머 시작
    setTimeout(function () {
      _this.close(opts, callback);
    }, this.config.displayTime);

    $toastBox.on(this.config.clickEventName, '[data-ax-toast-btn]', function (e) {
      btnOnClick.call(_this, e || window.event, opts, $toastBox, callback);
    });
  } else if (opts.toastType === "confirm") {
    $toastBox.on(this.config.clickEventName, '[data-ax-toast-btn]', function (e) {
      btnOnClick.call(_this, e || window.event, opts, $toastBox, callback);
    });
  }

  box = null;
};
var btnOnClick = function btnOnClick(e, opts, $toastBox, callback, target, k) {
  target = _AX6Util2.default.findParentNode(e.target, function (target) {
    if (target.getAttribute("data-ax-toast-btn")) {
      return true;
    }
  });

  if (target) {
    k = target.getAttribute("data-ax-toast-btn");

    var that = {
      key: k, value: opts.btns ? opts.btns[k] : k,
      toastId: opts.id,
      btn_target: target
    };

    if (opts.btns && opts.btns[k].onClick) {
      opts.btns[k].onClick.call(that, that);
    } else if (opts.toastType === "push") {
      if (callback) callback.call(that, that);
      this.close(opts, callback);
    } else if (opts.toastType === "confirm") {
      if (callback) callback.call(that, that);
      this.close(opts);
    }
  }

  e = null;
  opts = null;
  $toastBox = null;
  callback = null;
  target = null;
  k = null;
};
/* ~~~~~~~~~~~~~~~~~~ end of private  ~~~~~~~~~~~~~~~~~~~~ */

/**
 * @class
 */

var AX6UIToast = function (_AX6UICore) {
  _inherits(AX6UIToast, _AX6UICore);

  /**
   * @constructor
   * @param config
   */
  function AX6UIToast(config) {
    _classCallCheck(this, AX6UIToast);

    /**
     * @member {JSON}
     * @param config
     * @param [config.theme='default']
     * @param [config.width=300]
     * @param [config.icon='']
     * @param [config.closeIcon='']
     * @param [config.msg='']
     * @param [config.lang]
     * @param [config.lang.ok='ok']
     * @param [config.lang.cancel='cancel']
     * @param [config.displayTime=3000]
     * @param [config.animateTime=250]
     * @param [config.containerPosition='bottom-left']
     */
    var _this2 = _possibleConstructorReturn(this, (AX6UIToast.__proto__ || Object.getPrototypeOf(AX6UIToast)).call(this));

    _this2.config = {
      clickEventName: "click",
      theme: 'default',
      width: 300,
      icon: '',
      closeIcon: '',
      msg: '',
      lang: {
        "ok": "ok", "cancel": "cancel"
      },
      displayTime: 3000,
      animateTime: 250,
      containerPosition: "bottom-left",
      zIndex: 9999
    };
    _jqmin2.default.extend(true, _this2.config, config);

    // 멤버 변수 초기화
    _this2.$toastContainer = (0, _jqmin2.default)('<div data-ax6ui-toast-container="' + _this2.instanceId + '" data-toast-container-position=""></div>');
    _this2.queue = [];
    _this2.toastSeq = 0;
    _this2.toastSeqClear = null;

    (0, _jqmin2.default)(document.body).append(_this2.$toastContainer);

    _this2.init();
    return _this2;
  }

  /**
   * @method
   */


  _createClass(AX6UIToast, [{
    key: "init",
    value: function init() {
      this.onStateChanged = this.config.onStateChanged;
      delete this.config.onStateChanged;

      this.$toastContainer.css({ "z-index": this.config.zIndex, width: this.config.width, "max-width": "100%" }).attr("data-toast-container-position", this.config.containerPosition);

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
     * @param opts
     * @param callback
     * @return {AX6UIToast}
     * @example
     * ```js
     * import {AX6UIToast as Toast} from "ax6ui";
     *
     * let toast = new Toast({
       *  containerPosition: "bottom-right"
       * });
     *
     * toast.push("toast messages");
     * ```
     */

  }, {
    key: "push",
    value: function push(opts, callback) {
      if (_AX6Util2.default.isString(opts)) {
        opts = {
          title: this.config.title,
          msg: opts
        };
      }

      opts.toastType = "push";
      opts = _jqmin2.default.extend(true, {}, this.config, opts);
      open.call(this, opts, callback);

      opts = null;
      callback = null;
      return this;
    }

    /**
     * @method
     * @param opts
     * @param callback
     * @returns {AX6UIToast}
     * @example
     * ```js
     * import {AX6UIToast as Toast} from "ax6ui";
     *
     * let toast = new Toast({
       *  containerPosition: "bottom-right"
       * });
     *
     * toast.confirm({
       *  title: "예/아니오",
       *  msg: "당신은 개발자 입니까?",
       *  btns: {
       *      Y: {label: "예"},
       *      N: {label: "아니오"}
       *  }
       * }, function(res){
       *  console.log(res);
       * });
     * ```
     */

  }, {
    key: "confirm",
    value: function confirm(opts, callback) {
      if (_AX6Util2.default.isString(opts)) {
        opts = {
          title: this.config.title,
          msg: opts
        };
      }

      opts.toastType = "confirm";
      opts = _jqmin2.default.extend(true, {}, this.config, opts);
      if (typeof opts.btns === "undefined") {
        opts.btns = {
          ok: { label: opts.lang["ok"], theme: opts.theme }
        };
      }
      open.call(this, opts, callback);

      opts = null;
      callback = null;
      return this;
    }

    /**
     * close the toast
     * @method
     * @returns {AX6UIToast}
     * @example
     * ```
     * toast.close();
     * ```
     */

  }, {
    key: "close",
    value: function close(opts, callback) {
      var $toastBox = opts.$toastBox;
      $toastBox.addClass(opts.toastType == "push" ? "removed" : "destroy");
      this.queue = _AX6Util2.default.filter(this.queue, function () {
        return opts.id != this.id;
      });

      setTimeout(function () {
        var that = {
          toastId: opts.id
        };

        $toastBox.remove();
        if (callback) callback.call(that, that);

        that = {
          self: this,
          state: "close",
          toastId: opts.id
        };
        onStateChanged.call(this, opts, that);

        // 3초후에도 아무 일이 없다면 완전히 제거
        if (this.queue.length === 0) {
          if (this.toastSeqClear) clearTimeout(this.toastSeqClear);
          this.toastSeqClear = setTimeout(function () {
            /// console.log("try clear seq");
            if (this.queue.length === 0) this.toastSeq = 0;
          }.bind(this), 3000);
        }

        that = null;
        opts = null;
        callback = null;
        $toastBox = null;
      }.bind(this), opts.animateTime);

      return this;
    }
  }]);

  return AX6UIToast;
}(_AX6UICore3.default);

exports.default = AX6UIToast;

/***/ }),

/***/ 90:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(91);
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

/***/ 91:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "@-webkit-keyframes ax-toast-bottom {\n  from {\n    -webkit-transform: translateY(-100px); }\n  to {\n    -webkit-transform: translateY(0px); } }\n\n@-moz-keyframes ax-toast-bottom {\n  from {\n    -moz-transform: translateY(-100px); }\n  to {\n    -moz-transform: translateY(0px); } }\n\n@keyframes ax-toast-bottom {\n  from {\n    -webkit-transform: translateY(-100px);\n    -moz-transform: translateY(-100px);\n    -ms-transform: translateY(-100px);\n    -o-transform: translateY(-100px);\n    transform: translateY(-100px); }\n  to {\n    -webkit-transform: translateY(0px);\n    -moz-transform: translateY(0px);\n    -ms-transform: translateY(0px);\n    -o-transform: translateY(0px);\n    transform: translateY(0px); } }\n\n@-webkit-keyframes ax-toast-top {\n  from {\n    -webkit-transform: translateY(100px); }\n  to {\n    -webkit-transform: translateY(0px); } }\n\n@-moz-keyframes ax-toast-top {\n  from {\n    -moz-transform: translateY(100px); }\n  to {\n    -moz-transform: translateY(0px); } }\n\n@keyframes ax-toast-top {\n  from {\n    -webkit-transform: translateY(100px);\n    -moz-transform: translateY(100px);\n    -ms-transform: translateY(100px);\n    -o-transform: translateY(100px);\n    transform: translateY(100px); }\n  to {\n    -webkit-transform: translateY(0px);\n    -moz-transform: translateY(0px);\n    -ms-transform: translateY(0px);\n    -o-transform: translateY(0px);\n    transform: translateY(0px); } }\n\n@-webkit-keyframes ax-toast-removed-bottom {\n  from {\n    -webkit-transform: translateX(0px);\n    opacity: 1.0; }\n  to {\n    -webkit-transform: translateX(100px);\n    opacity: 0.0; } }\n\n@-moz-keyframes ax-toast-removed-bottom {\n  from {\n    -moz-transform: translateX(0px);\n    opacity: 1.0; }\n  to {\n    -moz-transform: translateX(100px);\n    opacity: 0.0; } }\n\n@keyframes ax-toast-removed-bottom {\n  from {\n    -webkit-transform: translateX(0px);\n    -moz-transform: translateX(0px);\n    -ms-transform: translateX(0px);\n    -o-transform: translateX(0px);\n    transform: translateX(0px);\n    opacity: 1.0; }\n  to {\n    -webkit-transform: translateX(100px);\n    -moz-transform: translateX(100px);\n    -ms-transform: translateX(100px);\n    -o-transform: translateX(100px);\n    transform: translateX(100px);\n    opacity: 0.0; } }\n\n@-webkit-keyframes ax-toast-removed-top {\n  from {\n    -webkit-transform: translateX(0px);\n    opacity: 1.0; }\n  to {\n    -webkit-transform: translateX(-100px);\n    opacity: 0.0; } }\n\n@-moz-keyframes ax-toast-removed-top {\n  from {\n    -moz-transform: translateX(0px);\n    opacity: 1.0; }\n  to {\n    -moz-transform: translateX(-100px);\n    opacity: 0.0; } }\n\n@keyframes ax-toast-removed-top {\n  from {\n    -webkit-transform: translateX(0px);\n    -moz-transform: translateX(0px);\n    -ms-transform: translateX(0px);\n    -o-transform: translateX(0px);\n    transform: translateX(0px);\n    opacity: 1.0; }\n  to {\n    -webkit-transform: translateX(-100px);\n    -moz-transform: translateX(-100px);\n    -ms-transform: translateX(-100px);\n    -o-transform: translateX(-100px);\n    transform: translateX(-100px);\n    opacity: 0.0; } }\n\n@-webkit-keyframes ax-toast-destroy {\n  from {\n    -webkit-transform: scale(1);\n    opacity: 1.0; }\n  to {\n    -webkit-transform: scale(0.7);\n    opacity: 0.0; } }\n\n@-moz-keyframes ax-toast-destroy {\n  from {\n    -moz-transform: scale(1);\n    opacity: 1.0; }\n  to {\n    -moz-transform: scale(0.7);\n    opacity: 0.0; } }\n\n@keyframes ax-toast-destroy {\n  from {\n    -webkit-transform: scale(1);\n    -moz-transform: scale(1);\n    -ms-transform: scale(1);\n    -o-transform: scale(1);\n    transform: scale(1);\n    opacity: 1.0; }\n  to {\n    -webkit-transform: scale(0.7);\n    -moz-transform: scale(0.7);\n    -ms-transform: scale(0.7);\n    -o-transform: scale(0.7);\n    transform: scale(0.7);\n    opacity: 0.0; } }\n\n[data-ax6ui-toast-container] {\n  z-index: 2000;\n  position: fixed;\n  width: auto;\n  max-width: 100%;\n  padding: 10px 0;\n  box-sizing: border-box; }\n  [data-ax6ui-toast-container] *,\n  [data-ax6ui-toast-container] *:before,\n  [data-ax6ui-toast-container] *:after {\n    box-sizing: border-box; }\n  [data-ax6ui-toast-container] [data-ax6ui-toast] {\n    box-sizing: border-box;\n    border: 1px solid #c6c6c6;\n    opacity: 0.9;\n    border-radius: 1px;\n    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.175);\n    position: relative;\n    margin: 5px 0px 5px 0px;\n    display: table;\n    padding: 6px;\n    background: #eee;\n    color: #333; }\n    [data-ax6ui-toast-container] [data-ax6ui-toast] .ax-toast-icon {\n      display: table-cell;\n      padding: 6px;\n      text-align: left;\n      font-size: 24px;\n      width: 24px;\n      vertical-align: middle; }\n    [data-ax6ui-toast-container] [data-ax6ui-toast] .ax-toast-body {\n      display: table-cell;\n      padding: 6px;\n      text-align: left;\n      vertical-align: middle; }\n    [data-ax6ui-toast-container] [data-ax6ui-toast] .ax-toast-buttons {\n      display: table-cell;\n      padding: 6px;\n      text-align: right;\n      vertical-align: middle; }\n      [data-ax6ui-toast-container] [data-ax6ui-toast] .ax-toast-buttons button:not(:last-child) {\n        margin-right: 3px; }\n    [data-ax6ui-toast-container] [data-ax6ui-toast] .ax-toast-close {\n      display: table-cell;\n      padding: 6px;\n      text-align: right;\n      vertical-align: top;\n      text-decoration: none;\n      cursor: pointer; }\n    [data-ax6ui-toast-container] [data-ax6ui-toast] .ax-toast-icon {\n      color: #333; }\n    [data-ax6ui-toast-container] [data-ax6ui-toast] .ax-toast-close {\n      color: #333; }\n  [data-ax6ui-toast-container][data-toast-container-position=\"bottom-left\"] {\n    left: 10px;\n    bottom: 0; }\n    [data-ax6ui-toast-container][data-toast-container-position=\"bottom-left\"] [data-ax6ui-toast] {\n      -webkit-animation: ax-toast-top 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n      -moz-animation: ax-toast-top 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n      animation: ax-toast-top 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }\n      [data-ax6ui-toast-container][data-toast-container-position=\"bottom-left\"] [data-ax6ui-toast].removed {\n        -webkit-animation: ax-toast-removed-bottom 0.3s ease forwards;\n        -moz-animation: ax-toast-removed-bottom 0.3s ease forwards;\n        animation: ax-toast-removed-bottom 0.3s ease forwards; }\n      [data-ax6ui-toast-container][data-toast-container-position=\"bottom-left\"] [data-ax6ui-toast].destroy {\n        -webkit-animation: ax-toast-destroy 0.3s ease forwards;\n        -moz-animation: ax-toast-destroy 0.3s ease forwards;\n        animation: ax-toast-destroy 0.3s ease forwards; }\n  [data-ax6ui-toast-container][data-toast-container-position=\"bottom-right\"] {\n    right: 10px;\n    bottom: 0; }\n    [data-ax6ui-toast-container][data-toast-container-position=\"bottom-right\"] [data-ax6ui-toast] {\n      -webkit-animation: ax-toast-top 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n      -moz-animation: ax-toast-top 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n      animation: ax-toast-top 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }\n      [data-ax6ui-toast-container][data-toast-container-position=\"bottom-right\"] [data-ax6ui-toast].removed {\n        -webkit-animation: ax-toast-removed-bottom 0.3s ease forwards;\n        -moz-animation: ax-toast-removed-bottom 0.3s ease forwards;\n        animation: ax-toast-removed-bottom 0.3s ease forwards; }\n      [data-ax6ui-toast-container][data-toast-container-position=\"bottom-right\"] [data-ax6ui-toast].destroy {\n        -webkit-animation: ax-toast-destroy 0.3s ease forwards;\n        -moz-animation: ax-toast-destroy 0.3s ease forwards;\n        animation: ax-toast-destroy 0.3s ease forwards; }\n  [data-ax6ui-toast-container][data-toast-container-position=\"bottom-center\"] {\n    left: 50%;\n    bottom: 0; }\n    [data-ax6ui-toast-container][data-toast-container-position=\"bottom-center\"] [data-ax6ui-toast] {\n      position: relative;\n      left: -50%;\n      -webkit-animation: ax-toast-top 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n      -moz-animation: ax-toast-top 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n      animation: ax-toast-top 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }\n      [data-ax6ui-toast-container][data-toast-container-position=\"bottom-center\"] [data-ax6ui-toast].removed {\n        -webkit-animation: ax-toast-removed-bottom 0.3s ease forwards;\n        -moz-animation: ax-toast-removed-bottom 0.3s ease forwards;\n        animation: ax-toast-removed-bottom 0.3s ease forwards; }\n      [data-ax6ui-toast-container][data-toast-container-position=\"bottom-center\"] [data-ax6ui-toast].destroy {\n        -webkit-animation: ax-toast-destroy 0.3s ease forwards;\n        -moz-animation: ax-toast-destroy 0.3s ease forwards;\n        animation: ax-toast-destroy 0.3s ease forwards; }\n  [data-ax6ui-toast-container][data-toast-container-position=\"top-left\"] {\n    left: 10px;\n    top: 0; }\n    [data-ax6ui-toast-container][data-toast-container-position=\"top-left\"] [data-ax6ui-toast] {\n      -webkit-animation: ax-toast-bottom 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n      -moz-animation: ax-toast-bottom 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n      animation: ax-toast-bottom 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }\n      [data-ax6ui-toast-container][data-toast-container-position=\"top-left\"] [data-ax6ui-toast].removed {\n        -webkit-animation: ax-toast-removed-top 0.3s ease forwards;\n        -moz-animation: ax-toast-removed-top 0.3s ease forwards;\n        animation: ax-toast-removed-top 0.3s ease forwards; }\n      [data-ax6ui-toast-container][data-toast-container-position=\"top-left\"] [data-ax6ui-toast].destroy {\n        -webkit-animation: ax-toast-destroy 0.3s ease forwards;\n        -moz-animation: ax-toast-destroy 0.3s ease forwards;\n        animation: ax-toast-destroy 0.3s ease forwards; }\n  [data-ax6ui-toast-container][data-toast-container-position=\"top-right\"] {\n    right: 10px;\n    top: 0; }\n    [data-ax6ui-toast-container][data-toast-container-position=\"top-right\"] [data-ax6ui-toast] {\n      -webkit-animation: ax-toast-bottom 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n      -moz-animation: ax-toast-bottom 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n      animation: ax-toast-bottom 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }\n      [data-ax6ui-toast-container][data-toast-container-position=\"top-right\"] [data-ax6ui-toast].removed {\n        -webkit-animation: ax-toast-removed-top 0.3s ease forwards;\n        -moz-animation: ax-toast-removed-top 0.3s ease forwards;\n        animation: ax-toast-removed-top 0.3s ease forwards; }\n      [data-ax6ui-toast-container][data-toast-container-position=\"top-right\"] [data-ax6ui-toast].destroy {\n        -webkit-animation: ax-toast-destroy 0.3s ease forwards;\n        -moz-animation: ax-toast-destroy 0.3s ease forwards;\n        animation: ax-toast-destroy 0.3s ease forwards; }\n  [data-ax6ui-toast-container][data-toast-container-position=\"top-center\"] {\n    left: 50%;\n    top: 0; }\n    [data-ax6ui-toast-container][data-toast-container-position=\"top-center\"] [data-ax6ui-toast] {\n      left: -50%;\n      -webkit-animation: ax-toast-bottom 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n      -moz-animation: ax-toast-bottom 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n      animation: ax-toast-bottom 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }\n      [data-ax6ui-toast-container][data-toast-container-position=\"top-center\"] [data-ax6ui-toast].removed {\n        -webkit-animation: ax-toast-removed-top 0.3s ease forwards;\n        -moz-animation: ax-toast-removed-top 0.3s ease forwards;\n        animation: ax-toast-removed-top 0.3s ease forwards; }\n      [data-ax6ui-toast-container][data-toast-container-position=\"top-center\"] [data-ax6ui-toast].destroy {\n        -webkit-animation: ax-toast-destroy 0.3s ease forwards;\n        -moz-animation: ax-toast-destroy 0.3s ease forwards;\n        animation: ax-toast-destroy 0.3s ease forwards; }\n", ""]);

// exports


/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdG9hc3QuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9BWDZNdXN0YWNoZS5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL0FYNlVJVG9hc3QuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9BWDZVSVRvYXN0L3N0eWxlLnNjc3M/ZjJiMSIsIndlYnBhY2s6Ly8vLi4vc3JjL0FYNlVJVG9hc3Qvc3R5bGUuc2NzcyJdLCJuYW1lcyI6WyJodG1sIiwiZm4iLCJtb2R1bGVSdW4iLCIkYm9keSIsInRvYXN0Iiwid2lkdGgiLCJjb250YWluZXJQb3NpdGlvbiIsIm9uIiwiZSIsImJ0biIsImN1cnJlbnRUYXJnZXQiLCJnZXRBdHRyaWJ1dGUiLCJwcm9jZXNzb3IiLCJwdXNoIiwiY29uZmlybSIsInRpdGxlIiwibXNnIiwiYnRucyIsIlkiLCJsYWJlbCIsIk4iLCJyZXMiLCJjb25zb2xlIiwibG9nIiwibW9kdWxlRGVzdHJveSIsIm9mZiIsIkFYNiIsImRlZmluZU11c3RhY2hlIiwiZ2xvYmFsIiwiZmFjdG9yeSIsIm11c3RhY2hlIiwibXVzdGFjaGVGYWN0b3J5Iiwib2JqZWN0VG9TdHJpbmciLCJPYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImlzQXJyYXkiLCJBcnJheSIsImlzQXJyYXlQb2x5ZmlsbCIsIm9iamVjdCIsImNhbGwiLCJpc0Z1bmN0aW9uIiwidHlwZVN0ciIsIm9iaiIsImVzY2FwZVJlZ0V4cCIsInN0cmluZyIsInJlcGxhY2UiLCJoYXNQcm9wZXJ0eSIsInByb3BOYW1lIiwicmVnRXhwVGVzdCIsIlJlZ0V4cCIsInRlc3QiLCJ0ZXN0UmVnRXhwIiwicmUiLCJub25TcGFjZVJlIiwiaXNXaGl0ZXNwYWNlIiwiZW50aXR5TWFwIiwiZXNjYXBlSHRtbCIsIlN0cmluZyIsImZyb21FbnRpdHlNYXAiLCJzIiwid2hpdGVSZSIsInNwYWNlUmUiLCJlcXVhbHNSZSIsImN1cmx5UmUiLCJ0YWdSZSIsInBhcnNlVGVtcGxhdGUiLCJ0ZW1wbGF0ZSIsInRhZ3MiLCJzZWN0aW9ucyIsInRva2VucyIsInNwYWNlcyIsImhhc1RhZyIsIm5vblNwYWNlIiwic3RyaXBTcGFjZSIsImxlbmd0aCIsInBvcCIsIm9wZW5pbmdUYWdSZSIsImNsb3NpbmdUYWdSZSIsImNsb3NpbmdDdXJseVJlIiwiY29tcGlsZVRhZ3MiLCJ0YWdzVG9Db21waWxlIiwic3BsaXQiLCJFcnJvciIsInNjYW5uZXIiLCJTY2FubmVyIiwic3RhcnQiLCJ0eXBlIiwidmFsdWUiLCJjaHIiLCJ0b2tlbiIsIm9wZW5TZWN0aW9uIiwiZW9zIiwicG9zIiwic2NhblVudGlsIiwiaSIsInZhbHVlTGVuZ3RoIiwiY2hhckF0Iiwic2NhbiIsIm5lc3RUb2tlbnMiLCJzcXVhc2hUb2tlbnMiLCJzcXVhc2hlZFRva2VucyIsImxhc3RUb2tlbiIsIm51bVRva2VucyIsIm5lc3RlZFRva2VucyIsImNvbGxlY3RvciIsInNlY3Rpb24iLCJ0YWlsIiwibWF0Y2giLCJpbmRleCIsInN1YnN0cmluZyIsInNlYXJjaCIsIkNvbnRleHQiLCJ2aWV3IiwicGFyZW50Q29udGV4dCIsImNhY2hlIiwicmV0dXJucyIsImsiLCJwYXJlbnQiLCJsb29rdXAiLCJuYW1lIiwiaGFzT3duUHJvcGVydHkiLCJjb250ZXh0IiwibmFtZXMiLCJsb29rdXBIaXQiLCJpbmRleE9mIiwiV3JpdGVyIiwiY2xlYXJDYWNoZSIsInBhcnNlIiwicmVuZGVyIiwicGFydGlhbHMiLCJyZW5kZXJUb2tlbnMiLCJvcmlnaW5hbFRlbXBsYXRlIiwiYnVmZmVyIiwic3ltYm9sIiwidW5kZWZpbmVkIiwicmVuZGVyU2VjdGlvbiIsInJlbmRlckludmVydGVkIiwicmVuZGVyUGFydGlhbCIsInVuZXNjYXBlZFZhbHVlIiwiZXNjYXBlZFZhbHVlIiwicmF3VmFsdWUiLCJzZWxmIiwic3ViUmVuZGVyIiwiaiIsInNsaWNlIiwiZXNjYXBlIiwidmVyc2lvbiIsImRlZmF1bHRXcml0ZXIiLCJUeXBlRXJyb3IiLCJ0b19odG1sIiwic2VuZCIsInJlc3VsdCIsInRtcGwiLCJkaXNwbGF5IiwiY29sdW1uS2V5cyIsIm9uU3RhdGVDaGFuZ2VkIiwib3B0cyIsInRoYXQiLCJnZXRDb250ZW50IiwidG9hc3RJZCIsImRhdGEiLCJ0aGVtZSIsImljb24iLCJjbG9zZUljb24iLCJvcGVuIiwiY2FsbGJhY2siLCJ0b2FzdFNlcUNsZWFyIiwiY2xlYXJUaW1lb3V0IiwiJHRvYXN0Qm94IiwiYm94IiwiaWQiLCJpbnN0YW5jZUlkIiwidG9hc3RTZXEiLCJnZXQiLCJjc3MiLCIkdG9hc3RDb250YWluZXIiLCJsZWZ0IiwiY29uZmlnIiwiYXBwZW5kIiwicHJlcGVuZCIsInF1ZXVlIiwic3RhdGUiLCJ0b2FzdFR5cGUiLCJzZXRUaW1lb3V0IiwiY2xvc2UiLCJkaXNwbGF5VGltZSIsImNsaWNrRXZlbnROYW1lIiwiYnRuT25DbGljayIsIndpbmRvdyIsImV2ZW50IiwidGFyZ2V0IiwiZmluZFBhcmVudE5vZGUiLCJrZXkiLCJidG5fdGFyZ2V0Iiwib25DbGljayIsIkFYNlVJVG9hc3QiLCJsYW5nIiwiYW5pbWF0ZVRpbWUiLCJ6SW5kZXgiLCJleHRlbmQiLCJkb2N1bWVudCIsImJvZHkiLCJpbml0IiwiYXR0ciIsImluaXRPbmNlIiwiaW5pdGlhbGl6ZWQiLCJpc1N0cmluZyIsIm9rIiwiYWRkQ2xhc3MiLCJmaWx0ZXIiLCJyZW1vdmUiLCJiaW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUEsSUFBSUEsNkpBQUo7QUFJQSxJQUFJQyxLQUFLO0FBQ1BDLGFBQVcsbUJBQVVDLEtBQVYsRUFBaUI7O0FBRTFCLFFBQUlDLFFBQVEseUJBQVU7QUFDcEJDLGFBQU8sR0FEYTtBQUVwQkMseUJBQW1CO0FBRkMsS0FBVixDQUFaOztBQUtBSCxVQUFNSSxFQUFOLENBQVMsT0FBVCxFQUFrQixZQUFsQixFQUFnQyxVQUFDQyxDQUFELEVBQU87QUFDckMsVUFBSUMsTUFBTUQsRUFBRUUsYUFBRixDQUFnQkMsWUFBaEIsQ0FBNkIs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REFBeUQsRUFBRTs7QUFFLzhYIiwiZmlsZSI6IjQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVG9hc3QgZnJvbSBcIi4uLy4uL3NyYy9BWDZVSVRvYXN0XCI7XG5pbXBvcnQgXCIuLi8uLi9zcmMvQVg2VUlUb2FzdC9zdHlsZS5zY3NzXCI7XG5cbmxldCBodG1sID0gYFxuPGEgY2xhc3M9XCJ3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHQgYnRuXCIgZGF0YS1idG49XCJwdXNoXCI+cHVzaDwvYT5cbjxhIGNsYXNzPVwid2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0IGJ0blwiIGRhdGEtYnRuPVwiY29uZmlybVwiPmNvbmZpcm08L2E+XG5gO1xubGV0IGZuID0ge1xuICBtb2R1bGVSdW46IGZ1bmN0aW9uICgkYm9keSkge1xuXG4gICAgbGV0IHRvYXN0ID0gbmV3IFRvYXN0KHtcbiAgICAgIHdpZHRoOiA2MDAsXG4gICAgICBjb250YWluZXJQb3NpdGlvbjogXCJib3R0b20tcmlnaHRcIlxuICAgIH0pO1xuXG4gICAgJGJvZHkub24oXCJjbGlja1wiLCAnW2RhdGEtYnRuXScsIChlKSA9PiB7XG4gICAgICBsZXQgYnRuID0gZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtYnRuXCIpO1xuICAgICAgbGV0IHByb2Nlc3NvciA9IHtcbiAgICAgICAgcHVzaCgpIHtcbiAgICAgICAgICB0b2FzdC5wdXNoKFwi7YWM7Iqk7Yq4XCIpXG4gICAgICAgIH0sXG4gICAgICAgIGNvbmZpcm0oKSB7XG4gICAgICAgICAgdG9hc3QuY29uZmlybSh7XG4gICAgICAgICAgICB0aXRsZTogXCLsmIgv7JWE64uI7JikXCIsXG4gICAgICAgICAgICBtc2c6IFwi64u57Iug7J2AIOqwnOuwnOyekCDsnoXri4jquYw/XCIsXG4gICAgICAgICAgICBidG5zOiB7XG4gICAgICAgICAgICAgIFk6IHtsYWJlbDogXCLsmIhcIn0sXG4gICAgICAgICAgICAgIE46IHtsYWJlbDogXCLslYTri4jsmKRcIn1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBpZiAoYnRuIGluIHByb2Nlc3Nvcikge1xuICAgICAgICBwcm9jZXNzb3JbYnRuXSgpO1xuICAgICAgfVxuICAgIH0pO1xuXG5cbiAgfSxcbiAgbW9kdWxlRGVzdHJveTogZnVuY3Rpb24gKCRib2R5KSB7XG4gICAgJGJvZHkub2ZmKFwiY2xpY2tcIik7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaHRtbDogaHRtbCxcbiAgZm46IGZuXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3RvYXN0LmpzIiwiLyohXG4gKiBtdXN0YWNoZS5qcyAtIExvZ2ljLWxlc3Mge3ttdXN0YWNoZX19IHRlbXBsYXRlcyB3aXRoIEphdmFTY3JpcHRcbiAqIGh0dHA6Ly9naXRodWIuY29tL2phbmwvbXVzdGFjaGUuanNcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS90aG9tYXNKYW5nL211c3RhY2hlLmpzIC0tIGltcG9yb3ZlIHNvbWUgdmFyaWFibGVzXG4gKi9cblxuXG4vKipcbiAqIEFYNk11c3RhY2hl64qUIGh0dHA6Ly9naXRodWIuY29tL2phbmwvbXVzdGFjaGUuanPsl5Ag66qH6rCA7KeAIOy1nOyGjO2VnOydmCDquLDriqXsnYQg7Yqc64ud7ZWY7JesIOyCrOyaqe2VmOuKlCDthZztlIzrpr8g7JeU7KeE7J6F64uI64ukLlxuICogQG5hbWVzcGFjZSBBWDZNdXN0YWNoZVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBBWDZNdXN0YWNoZS5yZW5kZXJcbiAqIEBleGFtcGxlXG4gKiBgYGBqc1xuICogYXg1Lm11c3RhY2hlLnJlbmRlcih0ZW1wbGF0ZSwgdmlldylcbiAqXG4gKlxuICogLy9BcnJheSBAaVxuICogLy97eyNiZWF0bGVzfX1cbiAqIC8ve3tmaXJzdE5hbWV9fSB7e2xhc3ROYW1lfX0gKHt7QGl9fSkgKHt7QGZpcnN0fX0pXG4gKiAvL3t7L2JlYXRsZXN9fVxuICpcbiAqIC8vT2JqZWN0IEBlYWNoXG4gKiB7eyNiZWF0bGVzfX1cbiAqICB7eyNAZWFjaH19XG4gKiAgICAgIHt7QGtleX19IDoge3tAdmFsdWUuZmlyc3ROYW1lfX0ge3tAdmFsdWUubGFzdE5hbWV9fVxuICogIHt7L0BlYWNofX1cbiAqIHt7L2JlYXRsZXN9fVxuICpcbiAqIGBgYFxuICovXG5cblxuXG5sZXQgQVg2ID0ge307XG5cbihmdW5jdGlvbiBkZWZpbmVNdXN0YWNoZShnbG9iYWwsIGZhY3RvcnkpIHtcblxuICBmYWN0b3J5KGdsb2JhbC5tdXN0YWNoZSA9IHt9KTtcblxufShBWDYsIGZ1bmN0aW9uIG11c3RhY2hlRmFjdG9yeShtdXN0YWNoZSkge1xuXG4gIHZhciBvYmplY3RUb1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG4gIHZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiBpc0FycmF5UG9seWZpbGwob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdFRvU3RyaW5nLmNhbGwob2JqZWN0KSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgfTtcblxuICBmdW5jdGlvbiBpc0Z1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnZnVuY3Rpb24nO1xuICB9XG5cbiAgLyoqXG4gICAqIE1vcmUgY29ycmVjdCB0eXBlb2Ygc3RyaW5nIGhhbmRsaW5nIGFycmF5XG4gICAqIHdoaWNoIG5vcm1hbGx5IHJldHVybnMgdHlwZW9mICdvYmplY3QnXG4gICAqL1xuICBmdW5jdGlvbiB0eXBlU3RyKG9iaikge1xuICAgIHJldHVybiBpc0FycmF5KG9iaikgPyAnYXJyYXknIDogdHlwZW9mIG9iajtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVzY2FwZVJlZ0V4cChzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoL1tcXC1cXFtcXF17fSgpKis/LixcXFxcXFxeJHwjXFxzXS9nLCAnXFxcXCQmJyk7XG4gIH1cblxuICAvKipcbiAgICogTnVsbCBzYWZlIHdheSBvZiBjaGVja2luZyB3aGV0aGVyIG9yIG5vdCBhbiBvYmplY3QsXG4gICAqIGluY2x1ZGluZyBpdHMgcHJvdG90eXBlLCBoYXMgYSBnaXZlbiBwcm9wZXJ0eVxuICAgKi9cbiAgZnVuY3Rpb24gaGFzUHJvcGVydHkob2JqLCBwcm9wTmFtZSkge1xuICAgIHJldHVybiBvYmogIT0gbnVsbCAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiAocHJvcE5hbWUgaW4gb2JqKTtcbiAgfVxuXG4gIC8vIFdvcmthcm91bmQgZm9yIGh0dHBzOi8vaXNzdWVzLmFwYWNoZS5vcmcvamlyYS9icm93c2UvQ09VQ0hEQi01NzdcbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qYW5sL211c3RhY2hlLmpzL2lzc3Vlcy8xODlcbiAgdmFyIHJlZ0V4cFRlc3QgPSBSZWdFeHAucHJvdG90eXBlLnRlc3Q7XG5cbiAgZnVuY3Rpb24gdGVzdFJlZ0V4cChyZSwgc3RyaW5nKSB7XG4gICAgcmV0dXJuIHJlZ0V4cFRlc3QuY2FsbChyZSwgc3RyaW5nKTtcbiAgfVxuXG4gIHZhciBub25TcGFjZVJlID0gL1xcUy87XG5cbiAgZnVuY3Rpb24gaXNXaGl0ZXNwYWNlKHN0cmluZykge1xuICAgIHJldHVybiAhdGVzdFJlZ0V4cChub25TcGFjZVJlLCBzdHJpbmcpO1xuICB9XG5cbiAgdmFyIGVudGl0eU1hcCA9IHtcbiAgICAnJic6ICcmYW1wOycsICc8JzogJyZsdDsnLCAnPic6ICcmZ3Q7JywgJ1wiJzogJyZxdW90OycsIFwiJ1wiOiAnJiMzOTsnLCAnLyc6ICcmI3gyRjsnXG4gIH07XG5cbiAgZnVuY3Rpb24gZXNjYXBlSHRtbChzdHJpbmcpIHtcbiAgICByZXR1cm4gU3RyaW5nKHN0cmluZykucmVwbGFjZSgvWyY8PlwiJ1xcL10vZywgZnVuY3Rpb24gZnJvbUVudGl0eU1hcChzKSB7XG4gICAgICByZXR1cm4gZW50aXR5TWFwW3NdO1xuICAgIH0pO1xuICB9XG5cbiAgdmFyIHdoaXRlUmUgPSAvXFxzKi87XG4gIHZhciBzcGFjZVJlID0gL1xccysvO1xuICB2YXIgZXF1YWxzUmUgPSAvXFxzKj0vO1xuICB2YXIgY3VybHlSZSA9IC9cXHMqXFx9LztcbiAgdmFyIHRhZ1JlID0gLyN8XFxefFxcL3w+fFxce3wmfD18IS87XG5cbiAgLyoqXG4gICAqIEJyZWFrcyB1cCB0aGUgZ2l2ZW4gYHRlbXBsYXRlYCBzdHJpbmcgaW50byBhIHRyZWUgb2YgdG9rZW5zLiBJZiB0aGUgYHRhZ3NgXG4gICAqIGFyZ3VtZW50IGlzIGdpdmVuIGhlcmUgaXQgbXVzdCBiZSBhbiBhcnJheSB3aXRoIHR3byBzdHJpbmcgdmFsdWVzOiB0aGVcbiAgICogb3BlbmluZyBhbmQgY2xvc2luZyB0YWdzIHVzZWQgaW4gdGhlIHRlbXBsYXRlIChlLmcuIFsgXCI8JVwiLCBcIiU+XCIgXSkuIE9mXG4gICAqIGNvdXJzZSwgdGhlIGRlZmF1bHQgaXMgdG8gdXNlIG11c3RhY2hlcyAoaS5lLiBtdXN0YWNoZS50YWdzKS5cbiAgICpcbiAgICogQSB0b2tlbiBpcyBhbiBhcnJheSB3aXRoIGF0IGxlYXN0IDQgZWxlbWVudHMuIFRoZSBmaXJzdCBlbGVtZW50IGlzIHRoZVxuICAgKiBtdXN0YWNoZSBzeW1ib2wgdGhhdCB3YXMgdXNlZCBpbnNpZGUgdGhlIHRhZywgZS5nLiBcIiNcIiBvciBcIiZcIi4gSWYgdGhlIHRhZ1xuICAgKiBkaWQgbm90IGNvbnRhaW4gYSBzeW1ib2wgKGkuZS4ge3tteVZhbHVlfX0pIHRoaXMgZWxlbWVudCBpcyBcIm5hbWVcIi4gRm9yXG4gICAqIGFsbCB0ZXh0IHRoYXQgYXBwZWFycyBvdXRzaWRlIGEgc3ltYm9sIHRoaXMgZWxlbWVudCBpcyBcInRleHRcIi5cbiAgICpcbiAgICogVGhlIHNlY29uZCBlbGVtZW50IG9mIGEgdG9rZW4gaXMgaXRzIFwidmFsdWVcIi4gRm9yIG11c3RhY2hlIHRhZ3MgdGhpcyBpc1xuICAgKiB3aGF0ZXZlciBlbHNlIHdhcyBpbnNpZGUgdGhlIHRhZyBiZXNpZGVzIHRoZSBvcGVuaW5nIHN5bWJvbC4gRm9yIHRleHQgdG9rZW5zXG4gICAqIHRoaXMgaXMgdGhlIHRleHQgaXRzZWxmLlxuICAgKlxuICAgKiBUaGUgdGhpcmQgYW5kIGZvdXJ0aCBlbGVtZW50cyBvZiB0aGUgdG9rZW4gYXJlIHRoZSBzdGFydCBhbmQgZW5kIGluZGljZXMsXG4gICAqIHJlc3BlY3RpdmVseSwgb2YgdGhlIHRva2VuIGluIHRoZSBvcmlnaW5hbCB0ZW1wbGF0ZS5cbiAgICpcbiAgICogVG9rZW5zIHRoYXQgYXJlIHRoZSByb290IG5vZGUgb2YgYSBzdWJ0cmVlIGNvbnRhaW4gdHdvIG1vcmUgZWxlbWVudHM6IDEpIGFuXG4gICAqIGFycmF5IG9mIHRva2VucyBpbiB0aGUgc3VidHJlZSBhbmQgMikgdGhlIGluZGV4IGluIHRoZSBvcmlnaW5hbCB0ZW1wbGF0ZSBhdFxuICAgKiB3aGljaCB0aGUgY2xvc2luZyB0YWcgZm9yIHRoYXQgc2VjdGlvbiBiZWdpbnMuXG4gICAqL1xuICBmdW5jdGlvbiBwYXJzZVRlbXBsYXRlKHRlbXBsYXRlLCB0YWdzKSB7XG4gICAgaWYgKCF0ZW1wbGF0ZSlcbiAgICAgIHJldHVybiBbXTtcblxuICAgIHZhciBzZWN0aW9ucyA9IFtdOyAgICAgLy8gU3RhY2sgdG8gaG9sZCBzZWN0aW9uIHRva2Vuc1xuICAgIHZhciB0b2tlbnMgPSBbXTsgICAgICAgLy8gQnVmZmVyIHRvIGhvbGQgdGhlIHRva2Vuc1xuICAgIHZhciBzcGFjZXMgPSBbXTsgICAgICAgLy8gSW5kaWNlcyBvZiB3aGl0ZXNwYWNlIHRva2VucyBvbiB0aGUgY3VycmVudCBsaW5lXG4gICAgdmFyIGhhc1RhZyA9IGZhbHNlOyAgICAvLyBJcyB0aGVyZSBhIHt7dGFnfX0gb24gdGhlIGN1cnJlbnQgbGluZT9cbiAgICB2YXIgbm9uU3BhY2UgPSBmYWxzZTsgIC8vIElzIHRoZXJlIGEgbm9uLXNwYWNlIGNoYXIgb24gdGhlIGN1cnJlbnQgbGluZT9cblxuICAgIC8vIFN0cmlwcyBhbGwgd2hpdGVzcGFjZSB0b2tlbnMgYXJyYXkgZm9yIHRoZSBjdXJyZW50IGxpbmVcbiAgICAvLyBpZiB0aGVyZSB3YXMgYSB7eyN0YWd9fSBvbiBpdCBhbmQgb3RoZXJ3aXNlIG9ubHkgc3BhY2UuXG4gICAgZnVuY3Rpb24gc3RyaXBTcGFjZSgpIHtcbiAgICAgIGlmIChoYXNUYWcgJiYgIW5vblNwYWNlKSB7XG4gICAgICAgIHdoaWxlIChzcGFjZXMubGVuZ3RoKVxuICAgICAgICAgIGRlbGV0ZSB0b2tlbnNbc3BhY2VzLnBvcCgpXTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBzcGFjZXMgPSBbXTtcbiAgICAgIH1cblxuICAgICAgaGFzVGFnID0gZmFsc2U7XG4gICAgICBub25TcGFjZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBvcGVuaW5nVGFnUmUsIGNsb3NpbmdUYWdSZSwgY2xvc2luZ0N1cmx5UmU7XG5cbiAgICBmdW5jdGlvbiBjb21waWxlVGFncyh0YWdzVG9Db21waWxlKSB7XG4gICAgICBpZiAodHlwZW9mIHRhZ3NUb0NvbXBpbGUgPT09ICdzdHJpbmcnKVxuICAgICAgICB0YWdzVG9Db21waWxlID0gdGFnc1RvQ29tcGlsZS5zcGxpdChzcGFjZVJlLCAyKTtcblxuICAgICAgaWYgKCFpc0FycmF5KHRhZ3NUb0NvbXBpbGUpIHx8IHRhZ3NUb0NvbXBpbGUubGVuZ3RoICE9PSAyKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgdGFnczogJyArIHRhZ3NUb0NvbXBpbGUpO1xuXG4gICAgICBvcGVuaW5nVGFnUmUgPSBuZXcgUmVnRXhwKGVzY2FwZVJlZ0V4cCh0YWdzVG9Db21waWxlWzBdKSArICdcXFxccyonKTtcbiAgICAgIGNsb3NpbmdUYWdSZSA9IG5ldyBSZWdFeHAoJ1xcXFxzKicgKyBlc2NhcGVSZWdFeHAodGFnc1RvQ29tcGlsZVsxXSkpO1xuICAgICAgY2xvc2luZ0N1cmx5UmUgPSBuZXcgUmVnRXhwKCdcXFxccyonICsgZXNjYXBlUmVnRXhwKCd9JyArIHRhZ3NUb0NvbXBpbGVbMV0pKTtcbiAgICB9XG5cbiAgICBjb21waWxlVGFncyh0YWdzIHx8IG11c3RhY2hlLnRhZ3MpO1xuXG4gICAgdmFyIHNjYW5uZXIgPSBuZXcgU2Nhbm5lcih0ZW1wbGF0ZSk7XG5cbiAgICB2YXIgc3RhcnQsIHR5cGUsIHZhbHVlLCBjaHIsIHRva2VuLCBvcGVuU2VjdGlvbjtcbiAgICB3aGlsZSAoIXNjYW5uZXIuZW9zKCkpIHtcbiAgICAgIHN0YXJ0ID0gc2Nhbm5lci5wb3M7XG5cbiAgICAgIC8vIE1hdGNoIGFueSB0ZXh0IGJldHdlZW4gdGFncy5cbiAgICAgIHZhbHVlID0gc2Nhbm5lci5zY2FuVW50aWwob3BlbmluZ1RhZ1JlKTtcblxuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCB2YWx1ZUxlbmd0aCA9IHZhbHVlLmxlbmd0aDsgaSA8IHZhbHVlTGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBjaHIgPSB2YWx1ZS5jaGFyQXQoaSk7XG5cbiAgICAgICAgICBpZiAoaXNXaGl0ZXNwYWNlKGNocikpIHtcbiAgICAgICAgICAgIHNwYWNlcy5wdXNoKHRva2Vucy5sZW5ndGgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG5vblNwYWNlID0gdHJ1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0b2tlbnMucHVzaChbJ3RleHQnLCBjaHIsIHN0YXJ0LCBzdGFydCArIDFdKTtcbiAgICAgICAgICBzdGFydCArPSAxO1xuXG4gICAgICAgICAgLy8gQ2hlY2sgZm9yIHdoaXRlc3BhY2Ugb24gdGhlIGN1cnJlbnQgbGluZS5cbiAgICAgICAgICBpZiAoY2hyID09PSAnXFxuJylcbiAgICAgICAgICAgIHN0cmlwU3BhY2UoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBNYXRjaCB0aGUgb3BlbmluZyB0YWcuXG4gICAgICBpZiAoIXNjYW5uZXIuc2NhbihvcGVuaW5nVGFnUmUpKVxuICAgICAgICBicmVhaztcblxuICAgICAgaGFzVGFnID0gdHJ1ZTtcblxuICAgICAgLy8gR2V0IHRoZSB0YWcgdHlwZS5cbiAgICAgIHR5cGUgPSBzY2FubmVyLnNjYW4odGFnUmUpIHx8ICduYW1lJztcbiAgICAgIHNjYW5uZXIuc2Nhbih3aGl0ZVJlKTtcblxuICAgICAgLy8gR2V0IHRoZSB0YWcgdmFsdWUuXG4gICAgICBpZiAodHlwZSA9PT0gJz0nKSB7XG4gICAgICAgIHZhbHVlID0gc2Nhbm5lci5zY2FuVW50aWwoZXF1YWxzUmUpO1xuICAgICAgICBzY2FubmVyLnNjYW4oZXF1YWxzUmUpO1xuICAgICAgICBzY2FubmVyLnNjYW5VbnRpbChjbG9zaW5nVGFnUmUpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJ3snKSB7XG4gICAgICAgIHZhbHVlID0gc2Nhbm5lci5zY2FuVW50aWwoY2xvc2luZ0N1cmx5UmUpO1xuICAgICAgICBzY2FubmVyLnNjYW4oY3VybHlSZSk7XG4gICAgICAgIHNjYW5uZXIuc2NhblVudGlsKGNsb3NpbmdUYWdSZSk7XG4gICAgICAgIHR5cGUgPSAnJic7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBzY2FubmVyLnNjYW5VbnRpbChjbG9zaW5nVGFnUmUpO1xuICAgICAgfVxuXG4gICAgICAvLyBNYXRjaCB0aGUgY2xvc2luZyB0YWcuXG4gICAgICBpZiAoIXNjYW5uZXIuc2NhbihjbG9zaW5nVGFnUmUpKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuY2xvc2VkIHRhZyBhdCAnICsgc2Nhbm5lci5wb3MpO1xuXG4gICAgICB0b2tlbiA9IFt0eXBlLCB2YWx1ZSwgc3RhcnQsIHNjYW5uZXIucG9zXTtcbiAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcblxuICAgICAgaWYgKHR5cGUgPT09ICcjJyB8fCB0eXBlID09PSAnXicpIHtcbiAgICAgICAgc2VjdGlvbnMucHVzaCh0b2tlbik7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0eXBlID09PSAnLycpIHtcbiAgICAgICAgLy8gQ2hlY2sgc2VjdGlvbiBuZXN0aW5nLlxuICAgICAgICBvcGVuU2VjdGlvbiA9IHNlY3Rpb25zLnBvcCgpO1xuXG4gICAgICAgIGlmICghb3BlblNlY3Rpb24pXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbm9wZW5lZCBzZWN0aW9uIFwiJyArIHZhbHVlICsgJ1wiIGF0ICcgKyBzdGFydCk7XG5cbiAgICAgICAgaWYgKG9wZW5TZWN0aW9uWzFdICE9PSB2YWx1ZSlcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuY2xvc2VkIHNlY3Rpb24gXCInICsgb3BlblNlY3Rpb25bMV0gKyAnXCIgYXQgJyArIHN0YXJ0KTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICduYW1lJyB8fCB0eXBlID09PSAneycgfHwgdHlwZSA9PT0gJyYnKSB7XG4gICAgICAgIG5vblNwYWNlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICc9Jykge1xuICAgICAgICAvLyBTZXQgdGhlIHRhZ3MgZm9yIHRoZSBuZXh0IHRpbWUgYXJvdW5kLlxuICAgICAgICBjb21waWxlVGFncyh2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gTWFrZSBzdXJlIHRoZXJlIGFyZSBubyBvcGVuIHNlY3Rpb25zIHdoZW4gd2UncmUgZG9uZS5cbiAgICBvcGVuU2VjdGlvbiA9IHNlY3Rpb25zLnBvcCgpO1xuXG4gICAgaWYgKG9wZW5TZWN0aW9uKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmNsb3NlZCBzZWN0aW9uIFwiJyArIG9wZW5TZWN0aW9uWzFdICsgJ1wiIGF0ICcgKyBzY2FubmVyLnBvcyk7XG5cbiAgICByZXR1cm4gbmVzdFRva2VucyhzcXVhc2hUb2tlbnModG9rZW5zKSk7XG4gIH1cblxuICAvKipcbiAgICogQ29tYmluZXMgdGhlIHZhbHVlcyBvZiBjb25zZWN1dGl2ZSB0ZXh0IHRva2VucyBpbiB0aGUgZ2l2ZW4gYHRva2Vuc2AgYXJyYXlcbiAgICogdG8gYSBzaW5nbGUgdG9rZW4uXG4gICAqL1xuICBmdW5jdGlvbiBzcXVhc2hUb2tlbnModG9rZW5zKSB7XG4gICAgdmFyIHNxdWFzaGVkVG9rZW5zID0gW107XG5cbiAgICB2YXIgdG9rZW4sIGxhc3RUb2tlbjtcbiAgICBmb3IgKHZhciBpID0gMCwgbnVtVG9rZW5zID0gdG9rZW5zLmxlbmd0aDsgaSA8IG51bVRva2VuczsgKytpKSB7XG4gICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcblxuICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgIGlmICh0b2tlblswXSA9PT0gJ3RleHQnICYmIGxhc3RUb2tlbiAmJiBsYXN0VG9rZW5bMF0gPT09ICd0ZXh0Jykge1xuICAgICAgICAgIGxhc3RUb2tlblsxXSArPSB0b2tlblsxXTtcbiAgICAgICAgICBsYXN0VG9rZW5bM10gPSB0b2tlblszXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBzcXVhc2hlZFRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgICBsYXN0VG9rZW4gPSB0b2tlbjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzcXVhc2hlZFRva2VucztcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JtcyB0aGUgZ2l2ZW4gYXJyYXkgb2YgYHRva2Vuc2AgaW50byBhIG5lc3RlZCB0cmVlIHN0cnVjdHVyZSB3aGVyZVxuICAgKiB0b2tlbnMgdGhhdCByZXByZXNlbnQgYSBzZWN0aW9uIGhhdmUgdHdvIGFkZGl0aW9uYWwgaXRlbXM6IDEpIGFuIGFycmF5IG9mXG4gICAqIGFsbCB0b2tlbnMgdGhhdCBhcHBlYXIgaW4gdGhhdCBzZWN0aW9uIGFuZCAyKSB0aGUgaW5kZXggaW4gdGhlIG9yaWdpbmFsXG4gICAqIHRlbXBsYXRlIHRoYXQgcmVwcmVzZW50cyB0aGUgZW5kIG9mIHRoYXQgc2VjdGlvbi5cbiAgICovXG4gIGZ1bmN0aW9uIG5lc3RUb2tlbnModG9rZW5zKSB7XG4gICAgdmFyIG5lc3RlZFRva2VucyA9IFtdO1xuICAgIHZhciBjb2xsZWN0b3IgPSBuZXN0ZWRUb2tlbnM7XG4gICAgdmFyIHNlY3Rpb25zID0gW107XG5cbiAgICB2YXIgdG9rZW4sIHNlY3Rpb247XG4gICAgZm9yICh2YXIgaSA9IDAsIG51bVRva2VucyA9IHRva2Vucy5sZW5ndGg7IGkgPCBudW1Ub2tlbnM7ICsraSkge1xuICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XG5cbiAgICAgIHN3aXRjaCAodG9rZW5bMF0pIHtcbiAgICAgICAgY2FzZSAnIyc6XG4gICAgICAgIGNhc2UgJ14nOlxuICAgICAgICAgIGNvbGxlY3Rvci5wdXNoKHRva2VuKTtcbiAgICAgICAgICBzZWN0aW9ucy5wdXNoKHRva2VuKTtcbiAgICAgICAgICBjb2xsZWN0b3IgPSB0b2tlbls0XSA9IFtdO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICcvJzpcbiAgICAgICAgICBzZWN0aW9uID0gc2VjdGlvbnMucG9wKCk7XG4gICAgICAgICAgc2VjdGlvbls1XSA9IHRva2VuWzJdO1xuICAgICAgICAgIGNvbGxlY3RvciA9IHNlY3Rpb25zLmxlbmd0aCA+IDAgPyBzZWN0aW9uc1tzZWN0aW9ucy5sZW5ndGggLSAxXVs0XSA6IG5lc3RlZFRva2VucztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb2xsZWN0b3IucHVzaCh0b2tlbik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5lc3RlZFRva2VucztcbiAgfVxuXG4gIC8qKlxuICAgKiBBIHNpbXBsZSBzdHJpbmcgc2Nhbm5lciB0aGF0IGlzIHVzZWQgYnkgdGhlIHRlbXBsYXRlIHBhcnNlciB0byBmaW5kXG4gICAqIHRva2VucyBpbiB0ZW1wbGF0ZSBzdHJpbmdzLlxuICAgKi9cbiAgZnVuY3Rpb24gU2Nhbm5lcihzdHJpbmcpIHtcbiAgICB0aGlzLnN0cmluZyA9IHN0cmluZztcbiAgICB0aGlzLnRhaWwgPSBzdHJpbmc7XG4gICAgdGhpcy5wb3MgPSAwO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYHRydWVgIGlmIHRoZSB0YWlsIGlzIGVtcHR5IChlbmQgb2Ygc3RyaW5nKS5cbiAgICovXG4gIFNjYW5uZXIucHJvdG90eXBlLmVvcyA9IGZ1bmN0aW9uIGVvcygpIHtcbiAgICByZXR1cm4gdGhpcy50YWlsID09PSAnJztcbiAgfTtcblxuICAvKipcbiAgICogVHJpZXMgdG8gbWF0Y2ggdGhlIGdpdmVuIHJlZ3VsYXIgZXhwcmVzc2lvbiBhdCB0aGUgY3VycmVudCBwb3NpdGlvbi5cbiAgICogUmV0dXJucyB0aGUgbWF0Y2hlZCB0ZXh0IGlmIGl0IGNhbiBtYXRjaCwgdGhlIGVtcHR5IHN0cmluZyBvdGhlcndpc2UuXG4gICAqL1xuICBTY2FubmVyLnByb3RvdHlwZS5zY2FuID0gZnVuY3Rpb24gc2NhbihyZSkge1xuICAgIHZhciBtYXRjaCA9IHRoaXMudGFpbC5tYXRjaChyZSk7XG5cbiAgICBpZiAoIW1hdGNoIHx8IG1hdGNoLmluZGV4ICE9PSAwKVxuICAgICAgcmV0dXJuICcnO1xuXG4gICAgdmFyIHN0cmluZyA9IG1hdGNoWzBdO1xuXG4gICAgdGhpcy50YWlsID0gdGhpcy50YWlsLnN1YnN0cmluZyhzdHJpbmcubGVuZ3RoKTtcbiAgICB0aGlzLnBvcyArPSBzdHJpbmcubGVuZ3RoO1xuXG4gICAgcmV0dXJuIHN0cmluZztcbiAgfTtcblxuICAvKipcbiAgICogU2tpcHMgYWxsIHRleHQgdW50aWwgdGhlIGdpdmVuIHJlZ3VsYXIgZXhwcmVzc2lvbiBjYW4gYmUgbWF0Y2hlZC4gUmV0dXJuc1xuICAgKiB0aGUgc2tpcHBlZCBzdHJpbmcsIHdoaWNoIGlzIHRoZSBlbnRpcmUgdGFpbCBpZiBubyBtYXRjaCBjYW4gYmUgbWFkZS5cbiAgICovXG4gIFNjYW5uZXIucHJvdG90eXBlLnNjYW5VbnRpbCA9IGZ1bmN0aW9uIHNjYW5VbnRpbChyZSkge1xuICAgIHZhciBpbmRleCA9IHRoaXMudGFpbC5zZWFyY2gocmUpLCBtYXRjaDtcblxuICAgIHN3aXRjaCAoaW5kZXgpIHtcbiAgICAgIGNhc2UgLTE6XG4gICAgICAgIG1hdGNoID0gdGhpcy50YWlsO1xuICAgICAgICB0aGlzLnRhaWwgPSAnJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIG1hdGNoID0gJyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbWF0Y2ggPSB0aGlzLnRhaWwuc3Vic3RyaW5nKDAsIGluZGV4KTtcbiAgICAgICAgdGhpcy50YWlsID0gdGhpcy50YWlsLnN1YnN0cmluZyhpbmRleCk7XG4gICAgfVxuXG4gICAgdGhpcy5wb3MgKz0gbWF0Y2gubGVuZ3RoO1xuXG4gICAgcmV0dXJuIG1hdGNoO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXByZXNlbnRzIGEgcmVuZGVyaW5nIGNvbnRleHQgYnkgd3JhcHBpbmcgYSB2aWV3IG9iamVjdCBhbmRcbiAgICogbWFpbnRhaW5pbmcgYSByZWZlcmVuY2UgdG8gdGhlIHBhcmVudCBjb250ZXh0LlxuICAgKi9cbiAgZnVuY3Rpb24gQ29udGV4dCh2aWV3LCBwYXJlbnRDb250ZXh0KSB7XG4gICAgdGhpcy52aWV3ID0gdmlldztcbiAgICB0aGlzLmNhY2hlID0ge1xuICAgICAgJy4nOiB0aGlzLnZpZXcsXG4gICAgICAnQGVhY2gnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByZXR1cm5zID0gW107XG4gICAgICAgIGZvciAodmFyIGsgaW4gdGhpcykge1xuICAgICAgICAgIHJldHVybnMucHVzaCh7J0BrZXknOiBrLCAnQHZhbHVlJzogdGhpc1trXX0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXR1cm5zO1xuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5wYXJlbnQgPSBwYXJlbnRDb250ZXh0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgY29udGV4dCB1c2luZyB0aGUgZ2l2ZW4gdmlldyB3aXRoIHRoaXMgY29udGV4dFxuICAgKiBhcyB0aGUgcGFyZW50LlxuICAgKi9cbiAgQ29udGV4dC5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIHB1c2godmlldykge1xuICAgIHJldHVybiBuZXcgQ29udGV4dCh2aWV3LCB0aGlzKTtcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhlIGdpdmVuIG5hbWUgaW4gdGhpcyBjb250ZXh0LCB0cmF2ZXJzaW5nXG4gICAqIHVwIHRoZSBjb250ZXh0IGhpZXJhcmNoeSBpZiB0aGUgdmFsdWUgaXMgYWJzZW50IGluIHRoaXMgY29udGV4dCdzIHZpZXcuXG4gICAqL1xuICBDb250ZXh0LnByb3RvdHlwZS5sb29rdXAgPSBmdW5jdGlvbiBsb29rdXAobmFtZSkge1xuICAgIHZhciBjYWNoZSA9IHRoaXMuY2FjaGU7XG5cbiAgICB2YXIgdmFsdWU7XG4gICAgaWYgKGNhY2hlLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICB2YWx1ZSA9IGNhY2hlW25hbWVdO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcywgbmFtZXMsIGluZGV4LCBsb29rdXBIaXQgPSBmYWxzZTtcblxuICAgICAgd2hpbGUgKGNvbnRleHQpIHtcbiAgICAgICAgaWYgKG5hbWUuaW5kZXhPZignLicpID4gMCkge1xuICAgICAgICAgIHZhbHVlID0gY29udGV4dC52aWV3O1xuICAgICAgICAgIG5hbWVzID0gbmFtZS5zcGxpdCgnLicpO1xuICAgICAgICAgIGluZGV4ID0gMDtcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIFVzaW5nIHRoZSBkb3Qgbm90aW9uIHBhdGggaW4gYG5hbWVgLCB3ZSBkZXNjZW5kIHRocm91Z2ggdGhlXG4gICAgICAgICAgICogbmVzdGVkIG9iamVjdHMuXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBUbyBiZSBjZXJ0YWluIHRoYXQgdGhlIGxvb2t1cCBoYXMgYmVlbiBzdWNjZXNzZnVsLCB3ZSBoYXZlIHRvXG4gICAgICAgICAgICogY2hlY2sgaWYgdGhlIGxhc3Qgb2JqZWN0IGluIHRoZSBwYXRoIGFjdHVhbGx5IGhhcyB0aGUgcHJvcGVydHlcbiAgICAgICAgICAgKiB3ZSBhcmUgbG9va2luZyBmb3IuIFdlIHN0b3JlIHRoZSByZXN1bHQgaW4gYGxvb2t1cEhpdGAuXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBUaGlzIGlzIHNwZWNpYWxseSBuZWNlc3NhcnkgZm9yIHdoZW4gdGhlIHZhbHVlIGhhcyBiZWVuIHNldCB0b1xuICAgICAgICAgICAqIGB1bmRlZmluZWRgIGFuZCB3ZSB3YW50IHRvIGF2b2lkIGxvb2tpbmcgdXAgcGFyZW50IGNvbnRleHRzLlxuICAgICAgICAgICAqKi9cbiAgICAgICAgICB3aGlsZSAodmFsdWUgIT0gbnVsbCAmJiBpbmRleCA8IG5hbWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGluZGV4ID09PSBuYW1lcy5sZW5ndGggLSAxKVxuICAgICAgICAgICAgICBsb29rdXBIaXQgPSBoYXNQcm9wZXJ0eSh2YWx1ZSwgbmFtZXNbaW5kZXhdKTtcblxuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZVtuYW1lc1tpbmRleCsrXV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHZhbHVlID0gY29udGV4dC52aWV3W25hbWVdO1xuICAgICAgICAgIGxvb2t1cEhpdCA9IGhhc1Byb3BlcnR5KGNvbnRleHQudmlldywgbmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobG9va3VwSGl0KVxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNvbnRleHQgPSBjb250ZXh0LnBhcmVudDtcbiAgICAgIH1cblxuICAgICAgY2FjaGVbbmFtZV0gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpXG4gICAgICB2YWx1ZSA9IHZhbHVlLmNhbGwodGhpcy52aWV3KTtcblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcblxuICAvKipcbiAgICogQSBXcml0ZXIga25vd3MgaG93IHRvIHRha2UgYSBzdHJlYW0gb2YgdG9rZW5zIGFuZCByZW5kZXIgdGhlbSB0byBhXG4gICAqIHN0cmluZywgZ2l2ZW4gYSBjb250ZXh0LiBJdCBhbHNvIG1haW50YWlucyBhIGNhY2hlIG9mIHRlbXBsYXRlcyB0b1xuICAgKiBhdm9pZCB0aGUgbmVlZCB0byBwYXJzZSB0aGUgc2FtZSB0ZW1wbGF0ZSB0d2ljZS5cbiAgICovXG4gIGZ1bmN0aW9uIFdyaXRlcigpIHtcbiAgICB0aGlzLmNhY2hlID0ge307XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIGFsbCBjYWNoZWQgdGVtcGxhdGVzIGluIHRoaXMgd3JpdGVyLlxuICAgKi9cbiAgV3JpdGVyLnByb3RvdHlwZS5jbGVhckNhY2hlID0gZnVuY3Rpb24gY2xlYXJDYWNoZSgpIHtcbiAgICB0aGlzLmNhY2hlID0ge307XG4gIH07XG5cbiAgLyoqXG4gICAqIFBhcnNlcyBhbmQgY2FjaGVzIHRoZSBnaXZlbiBgdGVtcGxhdGVgIGFuZCByZXR1cm5zIHRoZSBhcnJheSBvZiB0b2tlbnNcbiAgICogdGhhdCBpcyBnZW5lcmF0ZWQgZnJvbSB0aGUgcGFyc2UuXG4gICAqL1xuICBXcml0ZXIucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24gcGFyc2UodGVtcGxhdGUsIHRhZ3MpIHtcbiAgICB2YXIgY2FjaGUgPSB0aGlzLmNhY2hlO1xuICAgIHZhciB0b2tlbnMgPSBjYWNoZVt0ZW1wbGF0ZV07XG5cbiAgICBpZiAodG9rZW5zID09IG51bGwpXG4gICAgICB0b2tlbnMgPSBjYWNoZVt0ZW1wbGF0ZV0gPSBwYXJzZVRlbXBsYXRlKHRlbXBsYXRlLCB0YWdzKTtcblxuICAgIHJldHVybiB0b2tlbnM7XG4gIH07XG5cbiAgLyoqXG4gICAqIEhpZ2gtbGV2ZWwgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byByZW5kZXIgdGhlIGdpdmVuIGB0ZW1wbGF0ZWAgd2l0aFxuICAgKiB0aGUgZ2l2ZW4gYHZpZXdgLlxuICAgKlxuICAgKiBUaGUgb3B0aW9uYWwgYHBhcnRpYWxzYCBhcmd1bWVudCBtYXkgYmUgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgdGhlXG4gICAqIG5hbWVzIGFuZCB0ZW1wbGF0ZXMgb2YgcGFydGlhbHMgdGhhdCBhcmUgdXNlZCBpbiB0aGUgdGVtcGxhdGUuIEl0IG1heVxuICAgKiBhbHNvIGJlIGEgZnVuY3Rpb24gdGhhdCBpcyB1c2VkIHRvIGxvYWQgcGFydGlhbCB0ZW1wbGF0ZXMgb24gdGhlIGZseVxuICAgKiB0aGF0IHRha2VzIGEgc2luZ2xlIGFyZ3VtZW50OiB0aGUgbmFtZSBvZiB0aGUgcGFydGlhbC5cbiAgICovXG4gIFdyaXRlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscykge1xuICAgIHZhciB0b2tlbnMgPSB0aGlzLnBhcnNlKHRlbXBsYXRlKTtcbiAgICB2YXIgY29udGV4dCA9ICh2aWV3IGluc3RhbmNlb2YgQ29udGV4dCkgPyB2aWV3IDogbmV3IENvbnRleHQodmlldyk7XG4gICAgcmV0dXJuIHRoaXMucmVuZGVyVG9rZW5zKHRva2VucywgY29udGV4dCwgcGFydGlhbHMsIHRlbXBsYXRlKTtcbiAgfTtcblxuICAvKipcbiAgICogTG93LWxldmVsIG1ldGhvZCB0aGF0IHJlbmRlcnMgdGhlIGdpdmVuIGFycmF5IG9mIGB0b2tlbnNgIHVzaW5nXG4gICAqIHRoZSBnaXZlbiBgY29udGV4dGAgYW5kIGBwYXJ0aWFsc2AuXG4gICAqXG4gICAqIE5vdGU6IFRoZSBgb3JpZ2luYWxUZW1wbGF0ZWAgaXMgb25seSBldmVyIHVzZWQgdG8gZXh0cmFjdCB0aGUgcG9ydGlvblxuICAgKiBvZiB0aGUgb3JpZ2luYWwgdGVtcGxhdGUgdGhhdCB3YXMgY29udGFpbmVkIGluIGEgaGlnaGVyLW9yZGVyIHNlY3Rpb24uXG4gICAqIElmIHRoZSB0ZW1wbGF0ZSBkb2Vzbid0IHVzZSBoaWdoZXItb3JkZXIgc2VjdGlvbnMsIHRoaXMgYXJndW1lbnQgbWF5XG4gICAqIGJlIG9taXR0ZWQuXG4gICAqL1xuICBXcml0ZXIucHJvdG90eXBlLnJlbmRlclRva2VucyA9IGZ1bmN0aW9uIHJlbmRlclRva2Vucyh0b2tlbnMsIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKSB7XG4gICAgdmFyIGJ1ZmZlciA9ICcnO1xuICAgIHZhciB0b2tlbiwgc3ltYm9sLCB2YWx1ZTtcbiAgICBmb3IgKHZhciBpID0gMCwgbnVtVG9rZW5zID0gdG9rZW5zLmxlbmd0aDsgaSA8IG51bVRva2VuczsgKytpKSB7XG4gICAgICB2YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgIHRva2VuID0gdG9rZW5zW2ldO1xuICAgICAgc3ltYm9sID0gdG9rZW5bMF07XG5cbiAgICAgIGlmIChzeW1ib2wgPT09ICcjJykgdmFsdWUgPSB0aGlzLnJlbmRlclNlY3Rpb24odG9rZW4sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgICAgIGVsc2UgaWYgKHN5bWJvbCA9PT0gJ14nKSB2YWx1ZSA9IHRoaXMucmVuZGVySW52ZXJ0ZWQodG9rZW4sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgICAgIGVsc2UgaWYgKHN5bWJvbCA9PT0gJz4nKSB2YWx1ZSA9IHRoaXMucmVuZGVyUGFydGlhbCh0b2tlbiwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xuICAgICAgZWxzZSBpZiAoc3ltYm9sID09PSAnJicpIHZhbHVlID0gdGhpcy51bmVzY2FwZWRWYWx1ZSh0b2tlbiwgY29udGV4dCk7XG4gICAgICBlbHNlIGlmIChzeW1ib2wgPT09ICduYW1lJykgdmFsdWUgPSB0aGlzLmVzY2FwZWRWYWx1ZSh0b2tlbiwgY29udGV4dCk7XG4gICAgICBlbHNlIGlmIChzeW1ib2wgPT09ICd0ZXh0JykgdmFsdWUgPSB0aGlzLnJhd1ZhbHVlKHRva2VuKTtcblxuICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpXG4gICAgICAgIGJ1ZmZlciArPSB2YWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmZmVyO1xuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUucmVuZGVyU2VjdGlvbiA9IGZ1bmN0aW9uIHJlbmRlclNlY3Rpb24odG9rZW4sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBidWZmZXIgPSAnJztcblxuICAgIHZhciB2YWx1ZSA9IGNvbnRleHQubG9va3VwKHRva2VuWzFdKTtcblxuICAgIC8vIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byByZW5kZXIgYW4gYXJiaXRyYXJ5IHRlbXBsYXRlXG4gICAgLy8gaW4gdGhlIGN1cnJlbnQgY29udGV4dCBieSBoaWdoZXItb3JkZXIgc2VjdGlvbnMuXG4gICAgZnVuY3Rpb24gc3ViUmVuZGVyKHRlbXBsYXRlKSB7XG4gICAgICByZXR1cm4gc2VsZi5yZW5kZXIodGVtcGxhdGUsIGNvbnRleHQsIHBhcnRpYWxzKTtcbiAgICB9XG5cbiAgICBpZiAoIXZhbHVlKSByZXR1cm47XG5cbiAgICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIGZvciAodmFyIGogPSAwLCB2YWx1ZUxlbmd0aCA9IHZhbHVlLmxlbmd0aDsgaiA8IHZhbHVlTGVuZ3RoOyArK2opIHtcbiAgICAgICAgaWYgKHZhbHVlW2pdKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZVtqXSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHZhbHVlW2pdWydAaSddID0gajtcbiAgICAgICAgICAgIHZhbHVlW2pdWydAZmlyc3QnXSA9IChqID09PSAwKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBidWZmZXIgKz0gdGhpcy5yZW5kZXJUb2tlbnModG9rZW5bNF0sIGNvbnRleHQucHVzaCh2YWx1ZVtqXSksIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgYnVmZmVyICs9IHRoaXMucmVuZGVyVG9rZW5zKHRva2VuWzRdLCBjb250ZXh0LnB1c2godmFsdWUpLCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgICBpZiAodHlwZW9mIG9yaWdpbmFsVGVtcGxhdGUgIT09ICdzdHJpbmcnKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCB1c2UgaGlnaGVyLW9yZGVyIHNlY3Rpb25zIHdpdGhvdXQgdGhlIG9yaWdpbmFsIHRlbXBsYXRlJyk7XG5cbiAgICAgIC8vIEV4dHJhY3QgdGhlIHBvcnRpb24gb2YgdGhlIG9yaWdpbmFsIHRlbXBsYXRlIHRoYXQgdGhlIHNlY3Rpb24gY29udGFpbnMuXG4gICAgICB2YWx1ZSA9IHZhbHVlLmNhbGwoY29udGV4dC52aWV3LCBvcmlnaW5hbFRlbXBsYXRlLnNsaWNlKHRva2VuWzNdLCB0b2tlbls1XSksIHN1YlJlbmRlcik7XG5cbiAgICAgIGlmICh2YWx1ZSAhPSBudWxsKVxuICAgICAgICBidWZmZXIgKz0gdmFsdWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgYnVmZmVyICs9IHRoaXMucmVuZGVyVG9rZW5zKHRva2VuWzRdLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XG4gICAgfVxuICAgIHJldHVybiBidWZmZXI7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5yZW5kZXJJbnZlcnRlZCA9IGZ1bmN0aW9uIHJlbmRlckludmVydGVkKHRva2VuLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSkge1xuICAgIHZhciB2YWx1ZSA9IGNvbnRleHQubG9va3VwKHRva2VuWzFdKTtcblxuICAgIC8vIFVzZSBKYXZhU2NyaXB0J3MgZGVmaW5pdGlvbiBvZiBmYWxzeS4gSW5jbHVkZSBlbXB0eSBhcnJheXMuXG4gICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qYW5sL211c3RhY2hlLmpzL2lzc3Vlcy8xODZcbiAgICBpZiAoIXZhbHVlIHx8IChpc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPT09IDApKVxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyVG9rZW5zKHRva2VuWzRdLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5yZW5kZXJQYXJ0aWFsID0gZnVuY3Rpb24gcmVuZGVyUGFydGlhbCh0b2tlbiwgY29udGV4dCwgcGFydGlhbHMpIHtcbiAgICBpZiAoIXBhcnRpYWxzKSByZXR1cm47XG5cbiAgICB2YXIgdmFsdWUgPSBpc0Z1bmN0aW9uKHBhcnRpYWxzKSA/IHBhcnRpYWxzKHRva2VuWzFdKSA6IHBhcnRpYWxzW3Rva2VuWzFdXTtcbiAgICBpZiAodmFsdWUgIT0gbnVsbClcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlclRva2Vucyh0aGlzLnBhcnNlKHZhbHVlKSwgY29udGV4dCwgcGFydGlhbHMsIHZhbHVlKTtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLnVuZXNjYXBlZFZhbHVlID0gZnVuY3Rpb24gdW5lc2NhcGVkVmFsdWUodG9rZW4sIGNvbnRleHQpIHtcbiAgICB2YXIgdmFsdWUgPSBjb250ZXh0Lmxvb2t1cCh0b2tlblsxXSk7XG4gICAgaWYgKHZhbHVlICE9IG51bGwpXG4gICAgICByZXR1cm4gdmFsdWU7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5lc2NhcGVkVmFsdWUgPSBmdW5jdGlvbiBlc2NhcGVkVmFsdWUodG9rZW4sIGNvbnRleHQpIHtcbiAgICB2YXIgdmFsdWUgPSBjb250ZXh0Lmxvb2t1cCh0b2tlblsxXSk7XG4gICAgaWYgKHZhbHVlICE9IG51bGwpXG4gICAgICByZXR1cm4gbXVzdGFjaGUuZXNjYXBlKHZhbHVlKTtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLnJhd1ZhbHVlID0gZnVuY3Rpb24gcmF3VmFsdWUodG9rZW4pIHtcbiAgICByZXR1cm4gdG9rZW5bMV07XG4gIH07XG5cbiAgbXVzdGFjaGUubmFtZSA9ICdtdXN0YWNoZS5qcyc7XG4gIG11c3RhY2hlLnZlcnNpb24gPSAnMi4xLjMnO1xuICBtdXN0YWNoZS50YWdzID0gWyd7eycsICd9fSddO1xuXG4gIC8vIEFsbCBoaWdoLWxldmVsIG11c3RhY2hlLiogZnVuY3Rpb25zIHVzZSB0aGlzIHdyaXRlci5cbiAgdmFyIGRlZmF1bHRXcml0ZXIgPSBuZXcgV3JpdGVyKCk7XG5cbiAgLyoqXG4gICAqIENsZWFycyBhbGwgY2FjaGVkIHRlbXBsYXRlcyBpbiB0aGUgZGVmYXVsdCB3cml0ZXIuXG4gICAqL1xuICBtdXN0YWNoZS5jbGVhckNhY2hlID0gZnVuY3Rpb24gY2xlYXJDYWNoZSgpIHtcbiAgICByZXR1cm4gZGVmYXVsdFdyaXRlci5jbGVhckNhY2hlKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFBhcnNlcyBhbmQgY2FjaGVzIHRoZSBnaXZlbiB0ZW1wbGF0ZSBpbiB0aGUgZGVmYXVsdCB3cml0ZXIgYW5kIHJldHVybnMgdGhlXG4gICAqIGFycmF5IG9mIHRva2VucyBpdCBjb250YWlucy4gRG9pbmcgdGhpcyBhaGVhZCBvZiB0aW1lIGF2b2lkcyB0aGUgbmVlZCB0b1xuICAgKiBwYXJzZSB0ZW1wbGF0ZXMgb24gdGhlIGZseSBhcyB0aGV5IGFyZSByZW5kZXJlZC5cbiAgICovXG4gIG11c3RhY2hlLnBhcnNlID0gZnVuY3Rpb24gcGFyc2UodGVtcGxhdGUsIHRhZ3MpIHtcbiAgICByZXR1cm4gZGVmYXVsdFdyaXRlci5wYXJzZSh0ZW1wbGF0ZSwgdGFncyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbmRlcnMgdGhlIGB0ZW1wbGF0ZWAgd2l0aCB0aGUgZ2l2ZW4gYHZpZXdgIGFuZCBgcGFydGlhbHNgIHVzaW5nIHRoZVxuICAgKiBkZWZhdWx0IHdyaXRlci5cbiAgICovXG4gIG11c3RhY2hlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcih0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMpIHtcbiAgICBpZiAodHlwZW9mIHRlbXBsYXRlICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCB0ZW1wbGF0ZSEgVGVtcGxhdGUgc2hvdWxkIGJlIGEgXCJzdHJpbmdcIiAnICsgJ2J1dCBcIicgKyB0eXBlU3RyKHRlbXBsYXRlKSArICdcIiB3YXMgZ2l2ZW4gYXMgdGhlIGZpcnN0ICcgKyAnYXJndW1lbnQgZm9yIG11c3RhY2hlI3JlbmRlcih0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMpJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlZmF1bHRXcml0ZXIucmVuZGVyKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscyk7XG4gIH07XG5cbiAgLy8gVGhpcyBpcyBoZXJlIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSB3aXRoIDAuNC54LixcbiAgLyplc2xpbnQtZGlzYWJsZSAqLyAvLyBlc2xpbnQgd2FudHMgY2FtZWwgY2FzZWQgZnVuY3Rpb24gbmFtZVxuICBtdXN0YWNoZS50b19odG1sID0gZnVuY3Rpb24gdG9faHRtbCh0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMsIHNlbmQpIHtcbiAgICAvKmVzbGludC1lbmFibGUqL1xuXG4gICAgdmFyIHJlc3VsdCA9IG11c3RhY2hlLnJlbmRlcih0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMpO1xuXG4gICAgaWYgKGlzRnVuY3Rpb24oc2VuZCkpIHtcbiAgICAgIHNlbmQocmVzdWx0KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfTtcblxuICAvLyBFeHBvcnQgdGhlIGVzY2FwaW5nIGZ1bmN0aW9uIHNvIHRoYXQgdGhlIHVzZXIgbWF5IG92ZXJyaWRlIGl0LlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2phbmwvbXVzdGFjaGUuanMvaXNzdWVzLzI0NFxuICBtdXN0YWNoZS5lc2NhcGUgPSBlc2NhcGVIdG1sO1xuXG4gIC8vIEV4cG9ydCB0aGVzZSBtYWlubHkgZm9yIHRlc3RpbmcsIGJ1dCBhbHNvIGZvciBhZHZhbmNlZCB1c2FnZS5cbiAgbXVzdGFjaGUuU2Nhbm5lciA9IFNjYW5uZXI7XG4gIG11c3RhY2hlLkNvbnRleHQgPSBDb250ZXh0O1xuICBtdXN0YWNoZS5Xcml0ZXIgPSBXcml0ZXI7XG5cbn0pKTtcblxuZXhwb3J0IGRlZmF1bHQgQVg2Lm11c3RhY2hlO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9zcmMvQVg2TXVzdGFjaGUuanMiLCJpbXBvcnQgalF1ZXJ5IGZyb20gXCJqcW1pblwiO1xuaW1wb3J0IFUgZnJvbSBcIi4vQVg2VXRpbC5qc1wiO1xuaW1wb3J0IEFYNlVJQ29yZSBmcm9tIFwiLi9BWDZVSUNvcmUuanNcIjtcbmltcG9ydCBtdXN0YWNoZSBmcm9tIFwiLi9BWDZNdXN0YWNoZVwiO1xuLyogfn5+fn5+fn5+fn5+fn5+fn5+IGVuZCBvZiBpbXBvcnQgIH5+fn5+fn5+fn5+fn5+fn5+fn5+ICovXG5cbmxldCB0bXBsID0ge1xuICBkaXNwbGF5KGNvbHVtbktleXMpIHtcbiAgICByZXR1cm4gYFxuPGRpdiBpZD1cInt7dG9hc3RJZH19XCIgZGF0YS1heDZ1aS10b2FzdD1cIlwiIGNsYXNzPVwie3t0aGVtZX19XCI+XG4gICAge3sjaWNvbn19XG4gICAgPGRpdiBjbGFzcz1cImF4LXRvYXN0LWljb25cIj57e3sufX19PC9kaXY+XG4gICAge3svaWNvbn19XG4gICAgPGRpdiBjbGFzcz1cImF4LXRvYXN0LWJvZHlcIj57e3ttc2d9fX08L2Rpdj5cbiAgICB7eyNidG5zfX1cbiAgICA8ZGl2IGNsYXNzPVwiYXgtdG9hc3QtYnV0dG9uc1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYXgtYnV0dG9uLXdyYXBcIj5cbiAgICAgICAgICAgIHt7I0BlYWNofX1cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGRhdGEtYXgtdG9hc3QtYnRuPVwie3tAa2V5fX1cIiBjbGFzcz1cImJ0biBidG4te3tAdmFsdWUudGhlbWV9fVwiPnt7e0B2YWx1ZS5sYWJlbH19fTwvYnV0dG9uPlxuICAgICAgICAgICAge3svQGVhY2h9fVxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICB7ey9idG5zfX1cbiAgICB7e15idG5zfX1cbiAgICAgICAgPGEgY2xhc3M9XCJheC10b2FzdC1jbG9zZVwiIGRhdGEtYXgtdG9hc3QtYnRuPVwib2tcIj57e3tjbG9zZUljb259fX08L2E+XG4gICAge3svYnRuc319XG4gICAgPGRpdiBzdHlsZT1cImNsZWFyOmJvdGg7XCI+PC9kaXY+XG48L2Rpdj5gO1xuICB9XG59O1xuXG5jb25zdCBvblN0YXRlQ2hhbmdlZCA9IGZ1bmN0aW9uIChvcHRzLCB0aGF0KSB7XG4gIGlmIChvcHRzICYmIG9wdHMub25TdGF0ZUNoYW5nZWQpIHtcbiAgICBvcHRzLm9uU3RhdGVDaGFuZ2VkLmNhbGwodGhhdCwgdGhhdCk7XG4gIH1cbiAgZWxzZSBpZiAodGhpcy5vblN0YXRlQ2hhbmdlZCkge1xuICAgIHRoaXMub25TdGF0ZUNoYW5nZWQuY2FsbCh0aGF0LCB0aGF0KTtcbiAgfVxuXG4gIG9wdHMgPSBudWxsO1xuICB0aGF0ID0gbnVsbDtcbiAgcmV0dXJuIHRydWU7XG59O1xuY29uc3QgZ2V0Q29udGVudCA9IGZ1bmN0aW9uICh0b2FzdElkLCBvcHRzKSB7XG4gIGxldCBkYXRhID0ge1xuICAgIHRvYXN0SWQ6IHRvYXN0SWQsXG4gICAgdGhlbWU6IG9wdHMudGhlbWUsXG4gICAgaWNvbjogb3B0cy5pY29uLFxuICAgIG1zZzogKG9wdHMubXNnIHx8IFwiXCIpLnJlcGxhY2UoL1xcbi9nLCBcIjxici8+XCIpLFxuICAgIGJ0bnM6IG9wdHMuYnRucyxcbiAgICBjbG9zZUljb246IG9wdHMuY2xvc2VJY29uXG4gIH07XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gbXVzdGFjaGUucmVuZGVyKHRtcGwuZGlzcGxheS5jYWxsKHRoaXMpLCBkYXRhKTtcbiAgfVxuICBmaW5hbGx5IHtcbiAgICB0b2FzdElkID0gbnVsbDtcbiAgICBkYXRhID0gbnVsbDtcbiAgfVxufTtcbmNvbnN0IG9wZW4gPSBmdW5jdGlvbiAob3B0cywgY2FsbGJhY2spIHtcbiAgaWYgKHRoaXMudG9hc3RTZXFDbGVhcikgY2xlYXJUaW1lb3V0KHRoaXMudG9hc3RTZXFDbGVhcik7XG5cbiAgbGV0ICR0b2FzdEJveCxcbiAgICBib3ggPSB7XG4gICAgICB3aWR0aDogb3B0cy53aWR0aFxuICAgIH07XG5cbiAgb3B0cy5pZCA9ICdheDZ1aS10b2FzdC0nICsgdGhpcy5pbnN0YW5jZUlkICsgJy0nICsgKCsrdGhpcy50b2FzdFNlcSk7XG5cbiAgaWYgKGpRdWVyeSgnIycgKyBvcHRzLmlkKS5nZXQoMCkpIHJldHVybiB0aGlzO1xuXG4gICR0b2FzdEJveCA9IGpRdWVyeShnZXRDb250ZW50KG9wdHMuaWQsIG9wdHMpKTtcbiAgJHRvYXN0Qm94LmNzcyh7d2lkdGg6IHRoaXMuJHRvYXN0Q29udGFpbmVyLndpZHRoKCl9KTtcblxuICBpZiAoVS5sZWZ0KHRoaXMuY29uZmlnLmNvbnRhaW5lclBvc2l0aW9uLCAnLScpID09ICdib3R0b20nKSB7XG4gICAgdGhpcy4kdG9hc3RDb250YWluZXIuYXBwZW5kKCR0b2FzdEJveCk7XG4gIH1cbiAgZWxzZSB7XG4gICAgdGhpcy4kdG9hc3RDb250YWluZXIucHJlcGVuZCgkdG9hc3RCb3gpO1xuICB9XG5cbiAgb3B0cy4kdG9hc3RCb3ggPSAkdG9hc3RCb3g7XG4gIHRoaXMucXVldWUucHVzaChvcHRzKTtcblxuICBvblN0YXRlQ2hhbmdlZC5jYWxsKHRoaXMsIG9wdHMsIHtcbiAgICBzZWxmOiB0aGlzLFxuICAgIHN0YXRlOiBcIm9wZW5cIixcbiAgICB0b2FzdElkOiBvcHRzLmlkXG4gIH0pO1xuXG4gIGlmIChvcHRzLnRvYXN0VHlwZSA9PT0gXCJwdXNoXCIpIHtcbiAgICAvLyDsnpDrj5kg7KCc6rGwIO2DgOydtOuouCDsi5zsnpFcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuY2xvc2Uob3B0cywgY2FsbGJhY2spO1xuICAgIH0sIHRoaXMuY29uZmlnLmRpc3BsYXlUaW1lKTtcblxuICAgICR0b2FzdEJveC5vbih0aGlzLmNvbmZpZy5jbGlja0V2ZW50TmFtZSwgJ1tkYXRhLWF4LXRvYXN0LWJ0bl0nLCBlID0+IHtcbiAgICAgIGJ0bk9uQ2xpY2suY2FsbCh0aGlzLCBlIHx8IHdpbmRvdy5ldmVudCwgb3B0cywgJHRvYXN0Qm94LCBjYWxsYmFjayk7XG4gICAgfSk7XG4gIH1cbiAgZWxzZSBpZiAob3B0cy50b2FzdFR5cGUgPT09IFwiY29uZmlybVwiKSB7XG4gICAgJHRvYXN0Qm94Lm9uKHRoaXMuY29uZmlnLmNsaWNrRXZlbnROYW1lLCAnW2RhdGEtYXgtdG9hc3QtYnRuXScsIGUgPT4ge1xuICAgICAgYnRuT25DbGljay5jYWxsKHRoaXMsIGUgfHwgd2luZG93LmV2ZW50LCBvcHRzLCAkdG9hc3RCb3gsIGNhbGxiYWNrKTtcbiAgICB9KTtcbiAgfVxuXG4gIGJveCA9IG51bGw7XG59O1xuY29uc3QgYnRuT25DbGljayA9IGZ1bmN0aW9uIChlLCBvcHRzLCAkdG9hc3RCb3gsIGNhbGxiYWNrLCB0YXJnZXQsIGspIHtcbiAgdGFyZ2V0ID0gVS5maW5kUGFyZW50Tm9kZShlLnRhcmdldCwgZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGlmICh0YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1heC10b2FzdC1idG5cIikpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSk7XG5cbiAgaWYgKHRhcmdldCkge1xuICAgIGsgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1heC10b2FzdC1idG5cIik7XG5cbiAgICBsZXQgdGhhdCA9IHtcbiAgICAgIGtleTogaywgdmFsdWU6IChvcHRzLmJ0bnMpID8gb3B0cy5idG5zW2tdIDogayxcbiAgICAgIHRvYXN0SWQ6IG9wdHMuaWQsXG4gICAgICBidG5fdGFyZ2V0OiB0YXJnZXRcbiAgICB9O1xuXG4gICAgaWYgKG9wdHMuYnRucyAmJiBvcHRzLmJ0bnNba10ub25DbGljaykge1xuICAgICAgb3B0cy5idG5zW2tdLm9uQ2xpY2suY2FsbCh0aGF0LCB0aGF0KTtcbiAgICB9XG4gICAgZWxzZSBpZiAob3B0cy50b2FzdFR5cGUgPT09IFwicHVzaFwiKSB7XG4gICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrLmNhbGwodGhhdCwgdGhhdCk7XG4gICAgICB0aGlzLmNsb3NlKG9wdHMsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgZWxzZSBpZiAob3B0cy50b2FzdFR5cGUgPT09IFwiY29uZmlybVwiKSB7XG4gICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrLmNhbGwodGhhdCwgdGhhdCk7XG4gICAgICB0aGlzLmNsb3NlKG9wdHMpO1xuICAgIH1cbiAgfVxuXG4gIGUgPSBudWxsO1xuICBvcHRzID0gbnVsbDtcbiAgJHRvYXN0Qm94ID0gbnVsbDtcbiAgY2FsbGJhY2sgPSBudWxsO1xuICB0YXJnZXQgPSBudWxsO1xuICBrID0gbnVsbDtcbn07XG4vKiB+fn5+fn5+fn5+fn5+fn5+fn4gZW5kIG9mIHByaXZhdGUgIH5+fn5+fn5+fn5+fn5+fn5+fn5+ICovXG5cbi8qKlxuICogQGNsYXNzXG4gKi9cbmNsYXNzIEFYNlVJVG9hc3QgZXh0ZW5kcyBBWDZVSUNvcmUge1xuICAvKipcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBjb25maWdcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgIHN1cGVyKCk7XG5cbiAgICAvKipcbiAgICAgKiBAbWVtYmVyIHtKU09OfVxuICAgICAqIEBwYXJhbSBjb25maWdcbiAgICAgKiBAcGFyYW0gW2NvbmZpZy50aGVtZT0nZGVmYXVsdCddXG4gICAgICogQHBhcmFtIFtjb25maWcud2lkdGg9MzAwXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmljb249JyddXG4gICAgICogQHBhcmFtIFtjb25maWcuY2xvc2VJY29uPScnXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLm1zZz0nJ11cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5sYW5nXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmxhbmcub2s9J29rJ11cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5sYW5nLmNhbmNlbD0nY2FuY2VsJ11cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5kaXNwbGF5VGltZT0zMDAwXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmFuaW1hdGVUaW1lPTI1MF1cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5jb250YWluZXJQb3NpdGlvbj0nYm90dG9tLWxlZnQnXVxuICAgICAqL1xuICAgIHRoaXMuY29uZmlnID0ge1xuICAgICAgY2xpY2tFdmVudE5hbWU6IFwiY2xpY2tcIixcbiAgICAgIHRoZW1lOiAnZGVmYXVsdCcsXG4gICAgICB3aWR0aDogMzAwLFxuICAgICAgaWNvbjogJycsXG4gICAgICBjbG9zZUljb246ICcnLFxuICAgICAgbXNnOiAnJyxcbiAgICAgIGxhbmc6IHtcbiAgICAgICAgXCJva1wiOiBcIm9rXCIsIFwiY2FuY2VsXCI6IFwiY2FuY2VsXCJcbiAgICAgIH0sXG4gICAgICBkaXNwbGF5VGltZTogMzAwMCxcbiAgICAgIGFuaW1hdGVUaW1lOiAyNTAsXG4gICAgICBjb250YWluZXJQb3NpdGlvbjogXCJib3R0b20tbGVmdFwiLFxuICAgICAgekluZGV4OiA5OTk5XG4gICAgfTtcbiAgICBqUXVlcnkuZXh0ZW5kKHRydWUsIHRoaXMuY29uZmlnLCBjb25maWcpO1xuXG4gICAgLy8g66mk67KEIOuzgOyImCDstIjquLDtmZRcbiAgICB0aGlzLiR0b2FzdENvbnRhaW5lciA9IGpRdWVyeSgnPGRpdiBkYXRhLWF4NnVpLXRvYXN0LWNvbnRhaW5lcj1cIicgKyB0aGlzLmluc3RhbmNlSWQgKyAnXCIgZGF0YS10b2FzdC1jb250YWluZXItcG9zaXRpb249XCJcIj48L2Rpdj4nKTtcbiAgICB0aGlzLnF1ZXVlID0gW107XG4gICAgdGhpcy50b2FzdFNlcSA9IDA7XG4gICAgdGhpcy50b2FzdFNlcUNsZWFyID0gbnVsbDtcblxuICAgIGpRdWVyeShkb2N1bWVudC5ib2R5KS5hcHBlbmQodGhpcy4kdG9hc3RDb250YWluZXIpO1xuXG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKi9cbiAgaW5pdCgpIHtcbiAgICB0aGlzLm9uU3RhdGVDaGFuZ2VkID0gdGhpcy5jb25maWcub25TdGF0ZUNoYW5nZWQ7XG4gICAgZGVsZXRlIHRoaXMuY29uZmlnLm9uU3RhdGVDaGFuZ2VkO1xuXG4gICAgdGhpcy4kdG9hc3RDb250YWluZXJcbiAgICAgIC5jc3Moe1wiei1pbmRleFwiOiB0aGlzLmNvbmZpZy56SW5kZXgsIHdpZHRoOiB0aGlzLmNvbmZpZy53aWR0aCwgXCJtYXgtd2lkdGhcIjogXCIxMDAlXCJ9KVxuICAgICAgLmF0dHIoXCJkYXRhLXRvYXN0LWNvbnRhaW5lci1wb3NpdGlvblwiLCB0aGlzLmNvbmZpZy5jb250YWluZXJQb3NpdGlvbik7XG5cbiAgICAvLyBpbml0IO2YuOy2nCDsl6zrtoBcbiAgICB0aGlzLmluaXRPbmNlKCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKi9cbiAgaW5pdE9uY2UoKSB7XG4gICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpIHJldHVybiB0aGlzO1xuICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQHBhcmFtIG9wdHNcbiAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAqIEByZXR1cm4ge0FYNlVJVG9hc3R9XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqIGltcG9ydCB7QVg2VUlUb2FzdCBhcyBUb2FzdH0gZnJvbSBcImF4NnVpXCI7XG4gICAqXG4gICAqIGxldCB0b2FzdCA9IG5ldyBUb2FzdCh7XG4gICAgICogIGNvbnRhaW5lclBvc2l0aW9uOiBcImJvdHRvbS1yaWdodFwiXG4gICAgICogfSk7XG4gICAqXG4gICAqIHRvYXN0LnB1c2goXCJ0b2FzdCBtZXNzYWdlc1wiKTtcbiAgICogYGBgXG4gICAqL1xuICBwdXNoKG9wdHMsIGNhbGxiYWNrKSB7XG4gICAgaWYgKFUuaXNTdHJpbmcob3B0cykpIHtcbiAgICAgIG9wdHMgPSB7XG4gICAgICAgIHRpdGxlOiB0aGlzLmNvbmZpZy50aXRsZSxcbiAgICAgICAgbXNnOiBvcHRzXG4gICAgICB9XG4gICAgfVxuXG4gICAgb3B0cy50b2FzdFR5cGUgPSBcInB1c2hcIjtcbiAgICBvcHRzID0galF1ZXJ5LmV4dGVuZCh0cnVlLCB7fSwgdGhpcy5jb25maWcsIG9wdHMpO1xuICAgIG9wZW4uY2FsbCh0aGlzLCBvcHRzLCBjYWxsYmFjayk7XG5cbiAgICBvcHRzID0gbnVsbDtcbiAgICBjYWxsYmFjayA9IG51bGw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAcGFyYW0gb3B0c1xuICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICogQHJldHVybnMge0FYNlVJVG9hc3R9XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqIGltcG9ydCB7QVg2VUlUb2FzdCBhcyBUb2FzdH0gZnJvbSBcImF4NnVpXCI7XG4gICAqXG4gICAqIGxldCB0b2FzdCA9IG5ldyBUb2FzdCh7XG4gICAgICogIGNvbnRhaW5lclBvc2l0aW9uOiBcImJvdHRvbS1yaWdodFwiXG4gICAgICogfSk7XG4gICAqXG4gICAqIHRvYXN0LmNvbmZpcm0oe1xuICAgICAqICB0aXRsZTogXCLsmIgv7JWE64uI7JikXCIsXG4gICAgICogIG1zZzogXCLri7nsi6DsnYAg6rCc67Cc7J6QIOyeheuLiOq5jD9cIixcbiAgICAgKiAgYnRuczoge1xuICAgICAqICAgICAgWToge2xhYmVsOiBcIuyYiFwifSxcbiAgICAgKiAgICAgIE46IHtsYWJlbDogXCLslYTri4jsmKRcIn1cbiAgICAgKiAgfVxuICAgICAqIH0sIGZ1bmN0aW9uKHJlcyl7XG4gICAgICogIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICogfSk7XG4gICAqIGBgYFxuICAgKi9cbiAgY29uZmlybShvcHRzLCBjYWxsYmFjaykge1xuICAgIGlmIChVLmlzU3RyaW5nKG9wdHMpKSB7XG4gICAgICBvcHRzID0ge1xuICAgICAgICB0aXRsZTogdGhpcy5jb25maWcudGl0bGUsXG4gICAgICAgIG1zZzogb3B0c1xuICAgICAgfVxuICAgIH1cblxuICAgIG9wdHMudG9hc3RUeXBlID0gXCJjb25maXJtXCI7XG4gICAgb3B0cyA9IGpRdWVyeS5leHRlbmQodHJ1ZSwge30sIHRoaXMuY29uZmlnLCBvcHRzKTtcbiAgICBpZiAodHlwZW9mIG9wdHMuYnRucyA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgb3B0cy5idG5zID0ge1xuICAgICAgICBvazoge2xhYmVsOiBvcHRzLmxhbmdbXCJva1wiXSwgdGhlbWU6IG9wdHMudGhlbWV9XG4gICAgICB9O1xuICAgIH1cbiAgICBvcGVuLmNhbGwodGhpcywgb3B0cywgY2FsbGJhY2spO1xuXG4gICAgb3B0cyA9IG51bGw7XG4gICAgY2FsbGJhY2sgPSBudWxsO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIGNsb3NlIHRoZSB0b2FzdFxuICAgKiBAbWV0aG9kXG4gICAqIEByZXR1cm5zIHtBWDZVSVRvYXN0fVxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBcbiAgICogdG9hc3QuY2xvc2UoKTtcbiAgICogYGBgXG4gICAqL1xuICBjbG9zZShvcHRzLCBjYWxsYmFjaykge1xuICAgIGxldCAkdG9hc3RCb3ggPSBvcHRzLiR0b2FzdEJveDtcbiAgICAkdG9hc3RCb3guYWRkQ2xhc3MoKG9wdHMudG9hc3RUeXBlID09IFwicHVzaFwiKSA/IFwicmVtb3ZlZFwiIDogXCJkZXN0cm95XCIpO1xuICAgIHRoaXMucXVldWUgPSBVLmZpbHRlcih0aGlzLnF1ZXVlLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gb3B0cy5pZCAhPSB0aGlzLmlkO1xuICAgIH0pO1xuXG4gICAgc2V0VGltZW91dCgoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHRoYXQgPSB7XG4gICAgICAgIHRvYXN0SWQ6IG9wdHMuaWRcbiAgICAgIH07XG5cbiAgICAgICR0b2FzdEJveC5yZW1vdmUoKTtcbiAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2suY2FsbCh0aGF0LCB0aGF0KTtcblxuICAgICAgdGhhdCA9IHtcbiAgICAgICAgc2VsZjogdGhpcyxcbiAgICAgICAgc3RhdGU6IFwiY2xvc2VcIixcbiAgICAgICAgdG9hc3RJZDogb3B0cy5pZFxuICAgICAgfTtcbiAgICAgIG9uU3RhdGVDaGFuZ2VkLmNhbGwodGhpcywgb3B0cywgdGhhdCk7XG5cbiAgICAgIC8vIDPstIjtm4Tsl5Drj4Qg7JWE66y0IOydvOydtCDsl4bri6TrqbQg7JmE7KCE7Z6IIOygnOqxsFxuICAgICAgaWYgKHRoaXMucXVldWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGlmICh0aGlzLnRvYXN0U2VxQ2xlYXIpIGNsZWFyVGltZW91dCh0aGlzLnRvYXN0U2VxQ2xlYXIpO1xuICAgICAgICB0aGlzLnRvYXN0U2VxQ2xlYXIgPSBzZXRUaW1lb3V0KChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8vIGNvbnNvbGUubG9nKFwidHJ5IGNsZWFyIHNlcVwiKTtcbiAgICAgICAgICBpZiAodGhpcy5xdWV1ZS5sZW5ndGggPT09IDApIHRoaXMudG9hc3RTZXEgPSAwO1xuICAgICAgICB9KS5iaW5kKHRoaXMpLCAzMDAwKTtcbiAgICAgIH1cblxuICAgICAgdGhhdCA9IG51bGw7XG4gICAgICBvcHRzID0gbnVsbDtcbiAgICAgIGNhbGxiYWNrID0gbnVsbDtcbiAgICAgICR0b2FzdEJveCA9IG51bGw7XG4gICAgfSkuYmluZCh0aGlzKSwgb3B0cy5hbmltYXRlVGltZSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEFYNlVJVG9hc3Q7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL3NyYy9BWDZVSVRvYXN0LmpzIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3N0eWxlLnNjc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge31cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGUuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGUuc2Nzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vc3JjL0FYNlVJVG9hc3Qvc3R5bGUuc2Nzc1xuLy8gbW9kdWxlIGlkID0gOTBcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHVuZGVmaW5lZCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJALXdlYmtpdC1rZXlmcmFtZXMgYXgtdG9hc3QtYm90dG9tIHtcXG4gIGZyb20ge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTAwcHgpOyB9XFxuICB0byB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDBweCk7IH0gfVxcblxcbkAtbW96LWtleWZyYW1lcyBheC10b2FzdC1ib3R0b20ge1xcbiAgZnJvbSB7XFxuICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMDBweCk7IH1cXG4gIHRvIHtcXG4gICAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMHB4KTsgfSB9XFxuXFxuQGtleWZyYW1lcyBheC10b2FzdC1ib3R0b20ge1xcbiAgZnJvbSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMDBweCk7XFxuICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMDBweCk7XFxuICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEwMHB4KTtcXG4gICAgLW8tdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMDBweCk7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTAwcHgpOyB9XFxuICB0byB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDBweCk7XFxuICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDBweCk7XFxuICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMHB4KTtcXG4gICAgLW8tdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDBweCk7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwcHgpOyB9IH1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgYXgtdG9hc3QtdG9wIHtcXG4gIGZyb20ge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgxMDBweCk7IH1cXG4gIHRvIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMHB4KTsgfSB9XFxuXFxuQC1tb3ota2V5ZnJhbWVzIGF4LXRvYXN0LXRvcCB7XFxuICBmcm9tIHtcXG4gICAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMTAwcHgpOyB9XFxuICB0byB7XFxuICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDBweCk7IH0gfVxcblxcbkBrZXlmcmFtZXMgYXgtdG9hc3QtdG9wIHtcXG4gIGZyb20ge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgxMDBweCk7XFxuICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDEwMHB4KTtcXG4gICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWSgxMDBweCk7XFxuICAgIC1vLXRyYW5zZm9ybTogdHJhbnNsYXRlWSgxMDBweCk7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgxMDBweCk7IH1cXG4gIHRvIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMHB4KTtcXG4gICAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMHB4KTtcXG4gICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwcHgpO1xcbiAgICAtby10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMHB4KTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDBweCk7IH0gfVxcblxcbkAtd2Via2l0LWtleWZyYW1lcyBheC10b2FzdC1yZW1vdmVkLWJvdHRvbSB7XFxuICBmcm9tIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMHB4KTtcXG4gICAgb3BhY2l0eTogMS4wOyB9XFxuICB0byB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDEwMHB4KTtcXG4gICAgb3BhY2l0eTogMC4wOyB9IH1cXG5cXG5ALW1vei1rZXlmcmFtZXMgYXgtdG9hc3QtcmVtb3ZlZC1ib3R0b20ge1xcbiAgZnJvbSB7XFxuICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDBweCk7XFxuICAgIG9wYWNpdHk6IDEuMDsgfVxcbiAgdG8ge1xcbiAgICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgxMDBweCk7XFxuICAgIG9wYWNpdHk6IDAuMDsgfSB9XFxuXFxuQGtleWZyYW1lcyBheC10b2FzdC1yZW1vdmVkLWJvdHRvbSB7XFxuICBmcm9tIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMHB4KTtcXG4gICAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMHB4KTtcXG4gICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWCgwcHgpO1xcbiAgICAtby10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMHB4KTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDBweCk7XFxuICAgIG9wYWNpdHk6IDEuMDsgfVxcbiAgdG8ge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgxMDBweCk7XFxuICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDEwMHB4KTtcXG4gICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWCgxMDBweCk7XFxuICAgIC1vLXRyYW5zZm9ybTogdHJhbnNsYXRlWCgxMDBweCk7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxMDBweCk7XFxuICAgIG9wYWNpdHk6IDAuMDsgfSB9XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIGF4LXRvYXN0LXJlbW92ZWQtdG9wIHtcXG4gIGZyb20ge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgwcHgpO1xcbiAgICBvcGFjaXR5OiAxLjA7IH1cXG4gIHRvIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTEwMHB4KTtcXG4gICAgb3BhY2l0eTogMC4wOyB9IH1cXG5cXG5ALW1vei1rZXlmcmFtZXMgYXgtdG9hc3QtcmVtb3ZlZC10b3Age1xcbiAgZnJvbSB7XFxuICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDBweCk7XFxuICAgIG9wYWNpdHk6IDEuMDsgfVxcbiAgdG8ge1xcbiAgICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTAwcHgpO1xcbiAgICBvcGFjaXR5OiAwLjA7IH0gfVxcblxcbkBrZXlmcmFtZXMgYXgtdG9hc3QtcmVtb3ZlZC10b3Age1xcbiAgZnJvbSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDBweCk7XFxuICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDBweCk7XFxuICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMHB4KTtcXG4gICAgLW8tdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDBweCk7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwcHgpO1xcbiAgICBvcGFjaXR5OiAxLjA7IH1cXG4gIHRvIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTEwMHB4KTtcXG4gICAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTEwMHB4KTtcXG4gICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTAwcHgpO1xcbiAgICAtby10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTEwMHB4KTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMDBweCk7XFxuICAgIG9wYWNpdHk6IDAuMDsgfSB9XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIGF4LXRvYXN0LWRlc3Ryb3kge1xcbiAgZnJvbSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgb3BhY2l0eTogMS4wOyB9XFxuICB0byB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwLjcpO1xcbiAgICBvcGFjaXR5OiAwLjA7IH0gfVxcblxcbkAtbW96LWtleWZyYW1lcyBheC10b2FzdC1kZXN0cm95IHtcXG4gIGZyb20ge1xcbiAgICAtbW96LXRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICAgIG9wYWNpdHk6IDEuMDsgfVxcbiAgdG8ge1xcbiAgICAtbW96LXRyYW5zZm9ybTogc2NhbGUoMC43KTtcXG4gICAgb3BhY2l0eTogMC4wOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIGF4LXRvYXN0LWRlc3Ryb3kge1xcbiAgZnJvbSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgLW1vei10cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICAtbXMtdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgLW8tdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgb3BhY2l0eTogMS4wOyB9XFxuICB0byB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwLjcpO1xcbiAgICAtbW96LXRyYW5zZm9ybTogc2NhbGUoMC43KTtcXG4gICAgLW1zLXRyYW5zZm9ybTogc2NhbGUoMC43KTtcXG4gICAgLW8tdHJhbnNmb3JtOiBzY2FsZSgwLjcpO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNyk7XFxuICAgIG9wYWNpdHk6IDAuMDsgfSB9XFxuXFxuW2RhdGEtYXg2dWktdG9hc3QtY29udGFpbmVyXSB7XFxuICB6LWluZGV4OiAyMDAwO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgd2lkdGg6IGF1dG87XFxuICBtYXgtd2lkdGg6IDEwMCU7XFxuICBwYWRkaW5nOiAxMHB4IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyB9XFxuICBbZGF0YS1heDZ1aS10b2FzdC1jb250YWluZXJdICosXFxuICBbZGF0YS1heDZ1aS10b2FzdC1jb250YWluZXJdICo6YmVmb3JlLFxcbiAgW2RhdGEtYXg2dWktdG9hc3QtY29udGFpbmVyXSAqOmFmdGVyIHtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDsgfVxcbiAgW2RhdGEtYXg2dWktdG9hc3QtY29udGFpbmVyXSBbZGF0YS1heDZ1aS10b2FzdF0ge1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjYzZjNmM2O1xcbiAgICBvcGFjaXR5OiAwLjk7XFxuICAgIGJvcmRlci1yYWRpdXM6IDFweDtcXG4gICAgYm94LXNoYWRvdzogMHB4IDBweCA1cHggMHB4IHJnYmEoMCwgMCwgMCwgMC4xNzUpO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIG1hcmdpbjogNXB4IDBweCA1cHggMHB4O1xcbiAgICBkaXNwbGF5OiB0YWJsZTtcXG4gICAgcGFkZGluZzogNnB4O1xcbiAgICBiYWNrZ3JvdW5kOiAjZWVlO1xcbiAgICBjb2xvcjogIzMzMzsgfVxcbiAgICBbZGF0YS1heDZ1aS10b2FzdC1jb250YWluZXJdIFtkYXRhLWF4NnVpLXRvYXN0XSAuYXgtdG9hc3QtaWNvbiB7XFxuICAgICAgZGlzcGxheTogdGFibGUtY2VsbDtcXG4gICAgICBwYWRkaW5nOiA2cHg7XFxuICAgICAgdGV4dC1hbGlnbjogbGVmdDtcXG4gICAgICBmb250LXNpemU6IDI0cHg7XFxuICAgICAgd2lkdGg6IDI0cHg7XFxuICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgfVxcbiAgICBbZGF0YS1heDZ1aS10b2FzdC1jb250YWluZXJdIFtkYXRhLWF4NnVpLXRvYXN0XSAuYXgtdG9hc3QtYm9keSB7XFxuICAgICAgZGlzcGxheTogdGFibGUtY2VsbDtcXG4gICAgICBwYWRkaW5nOiA2cHg7XFxuICAgICAgdGV4dC1hbGlnbjogbGVmdDtcXG4gICAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOyB9XFxuICAgIFtkYXRhLWF4NnVpLXRvYXN0LWNvbnRhaW5lcl0gW2RhdGEtYXg2dWktdG9hc3RdIC5heC10b2FzdC1idXR0b25zIHtcXG4gICAgICBkaXNwbGF5OiB0YWJsZS1jZWxsO1xcbiAgICAgIHBhZGRpbmc6IDZweDtcXG4gICAgICB0ZXh0LWFsaWduOiByaWdodDtcXG4gICAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOyB9XFxuICAgICAgW2RhdGEtYXg2dWktdG9hc3QtY29udGFpbmVyXSBbZGF0YS1heDZ1aS10b2FzdF0gLmF4LXRvYXN0LWJ1dHRvbnMgYnV0dG9uOm5vdCg6bGFzdC1jaGlsZCkge1xcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAzcHg7IH1cXG4gICAgW2RhdGEtYXg2dWktdG9hc3QtY29udGFpbmVyXSBbZGF0YS1heDZ1aS10b2FzdF0gLmF4LXRvYXN0LWNsb3NlIHtcXG4gICAgICBkaXNwbGF5OiB0YWJsZS1jZWxsO1xcbiAgICAgIHBhZGRpbmc6IDZweDtcXG4gICAgICB0ZXh0LWFsaWduOiByaWdodDtcXG4gICAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xcbiAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gICAgICBjdXJzb3I6IHBvaW50ZXI7IH1cXG4gICAgW2RhdGEtYXg2dWktdG9hc3QtY29udGFpbmVyXSBbZGF0YS1heDZ1aS10b2FzdF0gLmF4LXRvYXN0LWljb24ge1xcbiAgICAgIGNvbG9yOiAjMzMzOyB9XFxuICAgIFtkYXRhLWF4NnVpLXRvYXN0LWNvbnRhaW5lcl0gW2RhdGEtYXg2dWktdG9hc3RdIC5heC10b2FzdC1jbG9zZSB7XFxuICAgICAgY29sb3I6ICMzMzM7IH1cXG4gIFtkYXRhLWF4NnVpLXRvYXN0LWNvbnRhaW5lcl1bZGF0YS10b2FzdC1jb250YWluZXItcG9zaXRpb249XFxcImJvdHRvbS1sZWZ0XFxcIl0ge1xcbiAgICBsZWZ0OiAxMHB4O1xcbiAgICBib3R0b206IDA7IH1cXG4gICAgW2RhdGEtYXg2dWktdG9hc3QtY29udGFpbmVyXVtkYXRhLXRvYXN0LWNvbnRhaW5lci1wb3NpdGlvbj1cXFwiYm90dG9tLWxlZnRcXFwiXSBbZGF0YS1heDZ1aS10b2FzdF0ge1xcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uOiBheC10b2FzdC10b3AgMC4zcyBjdWJpYy1iZXppZXIoMC4xNzUsIDAuODg1LCAwLjMyLCAxLjI3NSk7XFxuICAgICAgLW1vei1hbmltYXRpb246IGF4LXRvYXN0LXRvcCAwLjNzIGN1YmljLWJlemllcigwLjE3NSwgMC44ODUsIDAuMzIsIDEuMjc1KTtcXG4gICAgICBhbmltYXRpb246IGF4LXRvYXN0LXRvcCAwLjNzIGN1YmljLWJlemllcigwLjE3NSwgMC44ODUsIDAuMzIsIDEuMjc1KTsgfVxcbiAgICAgIFtkYXRhLWF4NnVpLXRvYXN0LWNvbnRhaW5lcl1bZGF0YS10b2FzdC1jb250YWluZXItcG9zaXRpb249XFxcImJvdHRvbS1sZWZ0XFxcIl0gW2RhdGEtYXg2dWktdG9hc3RdLnJlbW92ZWQge1xcbiAgICAgICAgLXdlYmtpdC1hbmltYXRpb246IGF4LXRvYXN0LXJlbW92ZWQtYm90dG9tIDAuM3MgZWFzZSBmb3J3YXJkcztcXG4gICAgICAgIC1tb3otYW5pbWF0aW9uOiBheC10b2FzdC1yZW1vdmVkLWJvdHRvbSAwLjNzIGVhc2UgZm9yd2FyZHM7XFxuICAgICAgICBhbmltYXRpb246IGF4LXRvYXN0LXJlbW92ZWQtYm90dG9tIDAuM3MgZWFzZSBmb3J3YXJkczsgfVxcbiAgICAgIFtkYXRhLWF4NnVpLXRvYXN0LWNvbnRhaW5lcl1bZGF0YS10b2FzdC1jb250YWluZXItcG9zaXRpb249XFxcImJvdHRvbS1sZWZ0XFxcIl0gW2RhdGEtYXg2dWktdG9hc3RdLmRlc3Ryb3kge1xcbiAgICAgICAgLXdlYmtpdC1hbmltYXRpb246IGF4LXRvYXN0LWRlc3Ryb3kgMC4zcyBlYXNlIGZvcndhcmRzO1xcbiAgICAgICAgLW1vei1hbmltYXRpb246IGF4LXRvYXN0LWRlc3Ryb3kgMC4zcyBlYXNlIGZvcndhcmRzO1xcbiAgICAgICAgYW5pbWF0aW9uOiBheC10b2FzdC1kZXN0cm95IDAuM3MgZWFzZSBmb3J3YXJkczsgfVxcbiAgW2RhdGEtYXg2dWktdG9hc3QtY29udGFpbmVyXVtkYXRhLXRvYXN0LWNvbnRhaW5lci1wb3NpdGlvbj1cXFwiYm90dG9tLXJpZ2h0XFxcIl0ge1xcbiAgICByaWdodDogMTBweDtcXG4gICAgYm90dG9tOiAwOyB9XFxuICAgIFtkYXRhLWF4NnVpLXRvYXN0LWNvbnRhaW5lcl1bZGF0YS10b2FzdC1jb250YWluZXItcG9zaXRpb249XFxcImJvdHRvbS1yaWdodFxcXCJdIFtkYXRhLWF4NnVpLXRvYXN0XSB7XFxuICAgICAgLXdlYmtpdC1hbmltYXRpb246IGF4LXRvYXN0LXRvcCAwLjNzIGN1YmljLWJlemllcigwLjE3NSwgMC44ODUsIDAuMzIsIDEuMjc1KTtcXG4gICAgICAtbW96LWFuaW1hdGlvbjogYXgtdG9hc3QtdG9wIDAuM3MgY3ViaWMtYmV6aWVyKDAuMTc1LCAwLjg4NSwgMC4zMiwgMS4yNzUpO1xcbiAgICAgIGFuaW1hdGlvbjogYXgtdG9hc3QtdG9wIDAuM3MgY3ViaWMtYmV6aWVyKDAuMTc1LCAwLjg4NSwgMC4zMiwgMS4yNzUpOyB9XFxuICAgICAgW2RhdGEtYXg2dWktdG9hc3QtY29udGFpbmVyXVtkYXRhLXRvYXN0LWNvbnRhaW5lci1wb3NpdGlvbj1cXFwiYm90dG9tLXJpZ2h0XFxcIl0gW2RhdGEtYXg2dWktdG9hc3RdLnJlbW92ZWQge1xcbiAgICAgICAgLXdlYmtpdC1hbmltYXRpb246IGF4LXRvYXN0LXJlbW92ZWQtYm90dG9tIDAuM3MgZWFzZSBmb3J3YXJkcztcXG4gICAgICAgIC1tb3otYW5pbWF0aW9uOiBheC10b2FzdC1yZW1vdmVkLWJvdHRvbSAwLjNzIGVhc2UgZm9yd2FyZHM7XFxuICAgICAgICBhbmltYXRpb246IGF4LXRvYXN0LXJlbW92ZWQtYm90dG9tIDAuM3MgZWFzZSBmb3J3YXJkczsgfVxcbiAgICAgIFtkYXRhLWF4NnVpLXRvYXN0LWNvbnRhaW5lcl1bZGF0YS10b2FzdC1jb250YWluZXItcG9zaXRpb249XFxcImJvdHRvbS1yaWdodFxcXCJdIFtkYXRhLWF4NnVpLXRvYXN0XS5kZXN0cm95IHtcXG4gICAgICAgIC13ZWJraXQtYW5pbWF0aW9uOiBheC10b2FzdC1kZXN0cm95IDAuM3MgZWFzZSBmb3J3YXJkcztcXG4gICAgICAgIC1tb3otYW5pbWF0aW9uOiBheC10b2FzdC1kZXN0cm95IDAuM3MgZWFzZSBmb3J3YXJkcztcXG4gICAgICAgIGFuaW1hdGlvbjogYXgtdG9hc3QtZGVzdHJveSAwLjNzIGVhc2UgZm9yd2FyZHM7IH1cXG4gIFtkYXRhLWF4NnVpLXRvYXN0LWNvbnRhaW5lcl1bZGF0YS10b2FzdC1jb250YWluZXItcG9zaXRpb249XFxcImJvdHRvbS1jZW50ZXJcXFwiXSB7XFxuICAgIGxlZnQ6IDUwJTtcXG4gICAgYm90dG9tOiAwOyB9XFxuICAgIFtkYXRhLWF4NnVpLXRvYXN0LWNvbnRhaW5lcl1bZGF0YS10b2FzdC1jb250YWluZXItcG9zaXRpb249XFxcImJvdHRvbS1jZW50ZXJcXFwiXSBbZGF0YS1heDZ1aS10b2FzdF0ge1xcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgICBsZWZ0OiAtNTAlO1xcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uOiBheC10b2FzdC10b3AgMC4zcyBjdWJpYy1iZXppZXIoMC4xNzUsIDAuODg1LCAwLjMyLCAxLjI3NSk7XFxuICAgICAgLW1vei1hbmltYXRpb246IGF4LXRvYXN0LXRvcCAwLjNzIGN1YmljLWJlemllcigwLjE3NSwgMC44ODUsIDAuMzIsIDEuMjc1KTtcXG4gICAgICBhbmltYXRpb246IGF4LXRvYXN0LXRvcCAwLjNzIGN1YmljLWJlemllcigwLjE3NSwgMC44ODUsIDAuMzIsIDEuMjc1KTsgfVxcbiAgICAgIFtkYXRhLWF4NnVpLXRvYXN0LWNvbnRhaW5lcl1bZGF0YS10b2FzdC1jb250YWluZXItcG9zaXRpb249XFxcImJvdHRvbS1jZW50ZXJcXFwiXSBbZGF0YS1heDZ1aS10b2FzdF0ucmVtb3ZlZCB7XFxuICAgICAgICAtd2Via2l0LWFuaW1hdGlvbjogYXgtdG9hc3QtcmVtb3ZlZC1ib3R0b20gMC4zcyBlYXNlIGZvcndhcmRzO1xcbiAgICAgICAgLW1vei1hbmltYXRpb246IGF4LXRvYXN0LXJlbW92ZWQtYm90dG9tIDAuM3MgZWFzZSBmb3J3YXJkcztcXG4gICAgICAgIGFuaW1hdGlvbjogYXgtdG9hc3QtcmVtb3ZlZC1ib3R0b20gMC4zcyBlYXNlIGZvcndhcmRzOyB9XFxuICAgICAgW2RhdGEtYXg2dWktdG9hc3QtY29udGFpbmVyXVtkYXRhLXRvYXN0LWNvbnRhaW5lci1wb3NpdGlvbj1cXFwiYm90dG9tLWNlbnRlclxcXCJdIFtkYXRhLWF4NnVpLXRvYXN0XS5kZXN0cm95IHtcXG4gICAgICAgIC13ZWJraXQtYW5pbWF0aW9uOiBheC10b2FzdC1kZXN0cm95IDAuM3MgZWFzZSBmb3J3YXJkcztcXG4gICAgICAgIC1tb3otYW5pbWF0aW9uOiBheC10b2FzdC1kZXN0cm95IDAuM3MgZWFzZSBmb3J3YXJkcztcXG4gICAgICAgIGFuaW1hdGlvbjogYXgtdG9hc3QtZGVzdHJveSAwLjNzIGVhc2UgZm9yd2FyZHM7IH1cXG4gIFtkYXRhLWF4NnVpLXRvYXN0LWNvbnRhaW5lcl1bZGF0YS10b2FzdC1jb250YWluZXItcG9zaXRpb249XFxcInRvcC1sZWZ0XFxcIl0ge1xcbiAgICBsZWZ0OiAxMHB4O1xcbiAgICB0b3A6IDA7IH1cXG4gICAgW2RhdGEtYXg2dWktdG9hc3QtY29udGFpbmVyXVtkYXRhLXRvYXN0LWNvbnRhaW5lci1wb3NpdGlvbj1cXFwidG9wLWxlZnRcXFwiXSBbZGF0YS1heDZ1aS10b2FzdF0ge1xcbiAgICAgIC13ZWJraXQtYW5pbWF0aW9uOiBheC10b2FzdC1ib3R0b20gMC4zcyBjdWJpYy1iZXppZXIoMC4xNzUsIDAuODg1LCAwLjMyLCAxLjI3NSk7XFxuICAgICAgLW1vei1hbmltYXRpb246IGF4LXRvYXN0LWJvdHRvbSAwLjNzIGN1YmljLWJlemllcigwLjE3NSwgMC44ODUsIDAuMzIsIDEuMjc1KTtcXG4gICAgICBhbmltYXRpb246IGF4LXRvYXN0LWJvdHRvbSAwLjNzIGN1YmljLWJlemllcigwLjE3NSwgMC44ODUsIDAuMzIsIDEuMjc1KTsgfVxcbiAgICAgIFtkYXRhLWF4NnVpLXRvYXN0LWNvbnRhaW5lcl1bZGF0YS10b2FzdC1jb250YWluZXItcG9zaXRpb249XFxcInRvcC1sZWZ0XFxcIl0gW2RhdGEtYXg2dWktdG9hc3RdLnJlbW92ZWQge1xcbiAgICAgICAgLXdlYmtpdC1hbmltYXRpb246IGF4LXRvYXN0LXJlbW92ZWQtdG9wIDAuM3MgZWFzZSBmb3J3YXJkcztcXG4gICAgICAgIC1tb3otYW5pbWF0aW9uOiBheC10b2FzdC1yZW1vdmVkLXRvcCAwLjNzIGVhc2UgZm9yd2FyZHM7XFxuICAgICAgICBhbmltYXRpb246IGF4LXRvYXN0LXJlbW92ZWQtdG9wIDAuM3MgZWFzZSBmb3J3YXJkczsgfVxcbiAgICAgIFtkYXRhLWF4NnVpLXRvYXN0LWNvbnRhaW5lcl1bZGF0YS10b2FzdC1jb250YWluZXItcG9zaXRpb249XFxcInRvcC1sZWZ0XFxcIl0gW2RhdGEtYXg2dWktdG9hc3RdLmRlc3Ryb3kge1xcbiAgICAgICAgLXdlYmtpdC1hbmltYXRpb246IGF4LXRvYXN0LWRlc3Ryb3kgMC4zcyBlYXNlIGZvcndhcmRzO1xcbiAgICAgICAgLW1vei1hbmltYXRpb246IGF4LXRvYXN0LWRlc3Ryb3kgMC4zcyBlYXNlIGZvcndhcmRzO1xcbiAgICAgICAgYW5pbWF0aW9uOiBheC10b2FzdC1kZXN0cm95IDAuM3MgZWFzZSBmb3J3YXJkczsgfVxcbiAgW2RhdGEtYXg2dWktdG9hc3QtY29udGFpbmVyXVtkYXRhLXRvYXN0LWNvbnRhaW5lci1wb3NpdGlvbj1cXFwidG9wLXJpZ2h0XFxcIl0ge1xcbiAgICByaWdodDogMTBweDtcXG4gICAgdG9wOiAwOyB9XFxuICAgIFtkYXRhLWF4NnVpLXRvYXN0LWNvbnRhaW5lcl1bZGF0YS10b2FzdC1jb250YWluZXItcG9zaXRpb249XFxcInRvcC1yaWdodFxcXCJdIFtkYXRhLWF4NnVpLXRvYXN0XSB7XFxuICAgICAgLXdlYmtpdC1hbmltYXRpb246IGF4LXRvYXN0LWJvdHRvbSAwLjNzIGN1YmljLWJlemllcigwLjE3NSwgMC44ODUsIDAuMzIsIDEuMjc1KTtcXG4gICAgICAtbW96LWFuaW1hdGlvbjogYXgtdG9hc3QtYm90dG9tIDAuM3MgY3ViaWMtYmV6aWVyKDAuMTc1LCAwLjg4NSwgMC4zMiwgMS4yNzUpO1xcbiAgICAgIGFuaW1hdGlvbjogYXgtdG9hc3QtYm90dG9tIDAuM3MgY3ViaWMtYmV6aWVyKDAuMTc1LCAwLjg4NSwgMC4zMiwgMS4yNzUpOyB9XFxuICAgICAgW2RhdGEtYXg2dWktdG9hc3QtY29udGFpbmVyXVtkYXRhLXRvYXN0LWNvbnRhaW5lci1wb3NpdGlvbj1cXFwidG9wLXJpZ2h0XFxcIl0gW2RhdGEtYXg2dWktdG9hc3RdLnJlbW92ZWQge1xcbiAgICAgICAgLXdlYmtpdC1hbmltYXRpb246IGF4LXRvYXN0LXJlbW92ZWQtdG9wIDAuM3MgZWFzZSBmb3J3YXJkcztcXG4gICAgICAgIC1tb3otYW5pbWF0aW9uOiBheC10b2FzdC1yZW1vdmVkLXRvcCAwLjNzIGVhc2UgZm9yd2FyZHM7XFxuICAgICAgICBhbmltYXRpb246IGF4LXRvYXN0LXJlbW92ZWQtdG9wIDAuM3MgZWFzZSBmb3J3YXJkczsgfVxcbiAgICAgIFtkYXRhLWF4NnVpLXRvYXN0LWNvbnRhaW5lcl1bZGF0YS10b2FzdC1jb250YWluZXItcG9zaXRpb249XFxcInRvcC1yaWdodFxcXCJdIFtkYXRhLWF4NnVpLXRvYXN0XS5kZXN0cm95IHtcXG4gICAgICAgIC13ZWJraXQtYW5pbWF0aW9uOiBheC10b2FzdC1kZXN0cm95IDAuM3MgZWFzZSBmb3J3YXJkcztcXG4gICAgICAgIC1tb3otYW5pbWF0aW9uOiBheC10b2FzdC1kZXN0cm95IDAuM3MgZWFzZSBmb3J3YXJkcztcXG4gICAgICAgIGFuaW1hdGlvbjogYXgtdG9hc3QtZGVzdHJveSAwLjNzIGVhc2UgZm9yd2FyZHM7IH1cXG4gIFtkYXRhLWF4NnVpLXRvYXN0LWNvbnRhaW5lcl1bZGF0YS10b2FzdC1jb250YWluZXItcG9zaXRpb249XFxcInRvcC1jZW50ZXJcXFwiXSB7XFxuICAgIGxlZnQ6IDUwJTtcXG4gICAgdG9wOiAwOyB9XFxuICAgIFtkYXRhLWF4NnVpLXRvYXN0LWNvbnRhaW5lcl1bZGF0YS10b2FzdC1jb250YWluZXItcG9zaXRpb249XFxcInRvcC1jZW50ZXJcXFwiXSBbZGF0YS1heDZ1aS10b2FzdF0ge1xcbiAgICAgIGxlZnQ6IC01MCU7XFxuICAgICAgLXdlYmtpdC1hbmltYXRpb246IGF4LXRvYXN0LWJvdHRvbSAwLjNzIGN1YmljLWJlemllcigwLjE3NSwgMC44ODUsIDAuMzIsIDEuMjc1KTtcXG4gICAgICAtbW96LWFuaW1hdGlvbjogYXgtdG9hc3QtYm90dG9tIDAuM3MgY3ViaWMtYmV6aWVyKDAuMTc1LCAwLjg4NSwgMC4zMiwgMS4yNzUpO1xcbiAgICAgIGFuaW1hdGlvbjogYXgtdG9hc3QtYm90dG9tIDAuM3MgY3ViaWMtYmV6aWVyKDAuMTc1LCAwLjg4NSwgMC4zMiwgMS4yNzUpOyB9XFxuICAgICAgW2RhdGEtYXg2dWktdG9hc3QtY29udGFpbmVyXVtkYXRhLXRvYXN0LWNvbnRhaW5lci1wb3NpdGlvbj1cXFwidG9wLWNlbnRlclxcXCJdIFtkYXRhLWF4NnVpLXRvYXN0XS5yZW1vdmVkIHtcXG4gICAgICAgIC13ZWJraXQtYW5pbWF0aW9uOiBheC10b2FzdC1yZW1vdmVkLXRvcCAwLjNzIGVhc2UgZm9yd2FyZHM7XFxuICAgICAgICAtbW96LWFuaW1hdGlvbjogYXgtdG9hc3QtcmVtb3ZlZC10b3AgMC4zcyBlYXNlIGZvcndhcmRzO1xcbiAgICAgICAgYW5pbWF0aW9uOiBheC10b2FzdC1yZW1vdmVkLXRvcCAwLjNzIGVhc2UgZm9yd2FyZHM7IH1cXG4gICAgICBbZGF0YS1heDZ1aS10b2FzdC1jb250YWluZXJdW2RhdGEtdG9hc3QtY29udGFpbmVyLXBvc2l0aW9uPVxcXCJ0b3AtY2VudGVyXFxcIl0gW2RhdGEtYXg2dWktdG9hc3RdLmRlc3Ryb3kge1xcbiAgICAgICAgLXdlYmtpdC1hbmltYXRpb246IGF4LXRvYXN0LWRlc3Ryb3kgMC4zcyBlYXNlIGZvcndhcmRzO1xcbiAgICAgICAgLW1vei1hbmltYXRpb246IGF4LXRvYXN0LWRlc3Ryb3kgMC4zcyBlYXNlIGZvcndhcmRzO1xcbiAgICAgICAgYW5pbWF0aW9uOiBheC10b2FzdC1kZXN0cm95IDAuM3MgZWFzZSBmb3J3YXJkczsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIhLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi9zcmMvQVg2VUlUb2FzdC9zdHlsZS5zY3NzXG4vLyBtb2R1bGUgaWQgPSA5MVxuLy8gbW9kdWxlIGNodW5rcyA9IDQiXSwic291cmNlUm9vdCI6IiJ9