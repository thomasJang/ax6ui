webpackJsonp([10],{

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AX6UIDialog = __webpack_require__(75);

var _AX6UIDialog2 = _interopRequireDefault(_AX6UIDialog);

__webpack_require__(76);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var html = "\n<a class=\"waves-effect waves-light btn\" data-btn=\"alert\">alert</a>\n<a class=\"waves-effect waves-light btn\" data-btn=\"confirm\">confirm</a>\n<a class=\"waves-effect waves-light btn\" data-btn=\"prompt\">prompt</a>\n<hr/>\n<a class=\"waves-effect waves-light btn\" data-btn=\"dblalert\">double alert call</a>\n<a class=\"waves-effect waves-light btn\" data-btn=\"dblconfirm\">double confirm call</a>\n";
var fn = {
  moduleRun: function moduleRun($body) {

    var dialog = new _AX6UIDialog2.default();
    dialog.setConfig({});

    $body.on("click", '[data-btn]', function (e) {
      var btn = e.currentTarget.getAttribute("data-btn");
      var processor = {
        alert: function alert() {
          dialog.alert({
            msg: "alert " + new Date(),
            onStateChanged: function onStateChanged(res) {
              if (res.state == "open") {
                //$body.append($btn);
              }
              if (res.state == "close") {
                //$btn.remove();
              }
            }
          });
        },
        confirm: function confirm() {
          dialog.confirm({
            title: "예/아니오",
            msg: "당신은 개발자 입니까?",
            btns: {
              Y: { label: "예" },
              N: { label: "아니오" }
            }
          }, function (res) {
            console.log(res);
          });
        },
        prompt: function prompt() {
          dialog.prompt({
            title: "prompt",
            msg: '다음의 값을 입력하세요.',
            input: {
              data1: { label: "data1의 라벨", type: "password" },
              data2: { label: "data2의 라벨" }
            }
          }, function () {
            console.log(this);
          });
        },
        dblalert: function dblalert() {
          dialog.alert({
            msg: "alert " + (new Date() + " close 1s later"),
            onStateChanged: function onStateChanged(res) {
              if (res.state == "open") {
                //$body.append($btn);
              }
              if (res.state == "close") {
                //$btn.remove();
              }
            }
          });

          setTimeout(function () {
            dialog.close();
            dialog.alert({
              msg: "alert " + new Date()
            });
          }, 1000);
        },
        dblconfirm: function dblconfirm() {
          dialog.confirm({
            title: "예/아니오",
            msg: "당신은 개발자 입니까? 버튼을 누르면 한번 더 물어봅니다.",
            btns: {
              Y: { label: "예" },
              N: { label: "아니오" }
            }
          }, function (res) {
            console.log(res);
          });

          dialog.confirm({
            title: "예/아니오",
            msg: "당신은 개발자 입니까?",
            btns: {
              K: { label: "예" },
              S: { label: "아니오" }
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

/***/ 75:
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

var _AX6Util = __webpack_require__(1);

var _AX6Util2 = _interopRequireDefault(_AX6Util);

var _AX6Info = __webpack_require__(5);

var _AX6Info2 = _interopRequireDefault(_AX6Info);

var _AX6Mustache = __webpack_require__(36);

var _AX6Mustache2 = _interopRequireDefault(_AX6Mustache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* ~~~~~~~~~~~~~~~~~~ end of import  ~~~~~~~~~~~~~~~~~~~~ */

var dialogTmpl = function dialogTmpl(columnKeys) {
  return " \n<div id=\"{{dialogId}}\" data-dialog-els=\"root\" data-ax6ui-dialog=\"\" class=\"{{theme}}\">\n    <div class=\"ax-dialog-header\" data-dialog-els=\"header\">\n        {{{title}}}\n    </div>\n    <div class=\"ax-dialog-body\" data-dialog-els=\"body\">\n        <div class=\"ax-dialog-msg\">{{{msg}}}</div>\n        \n        {{#input}}\n        <div class=\"ax-dialog-prompt\">\n            {{#@each}}\n            <div class=\"form-group\">\n            {{#@value.label}}\n            <label>{{#_crlf}}{{{.}}}{{/_crlf}}</label>\n            {{/@value.label}}\n            <input type=\"{{@value.type}}\" placeholder=\"{{@value.placeholder}}\" class=\"form-control {{@value.theme}}\" data-dialog-prompt=\"{{@key}}\" style=\"width:100%;\" value=\"{{@value.value}}\" />\n            {{#@value.help}}\n            <p class=\"help-block\">{{#_crlf}}{{.}}{{/_crlf}}</p>\n            {{/@value.help}}\n            </div>\n            {{/@each}}\n        </div>\n        {{/input}}\n        \n        <div class=\"ax-dialog-buttons\" data-dialog-els=\"buttons\">\n            <div class=\"ax-button-wrap\">\n            {{#btns}}\n                {{#@each}}\n                <button type=\"button\" data-dialog-btn=\"{{@key}}\" class=\"btn btn-{{@value.theme}}\">{{@value.label}}</button>\n                {{/@each}}\n            {{/btns}}\n            </div>\n        </div>\n        \n        {{#additionalContent}}\n        <div data-dialog-els=\"additional-content\">{{{.}}}</div>\n        {{/additionalContent}}\n    </div>\n</div>  \n";
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
var getContent = function getContent(dialogId, opts) {
  var data = {
    dialogId: dialogId,
    title: opts.title || this.config.title || "",
    msg: (opts.msg || this.config.msg || "").replace(/\n/g, "<br/>"),
    input: opts.input,
    btns: opts.btns,
    '_crlf': function _crlf() {
      return this.replace(/\n/g, "<br/>");
    },
    additionalContent: function (additionalContent) {
      if (_AX6Util2.default.isFunction(additionalContent)) {
        return additionalContent.call(opts);
      } else {
        return additionalContent;
      }
    }(opts.additionalContent)
  };

  return _AX6Mustache2.default.render(dialogTmpl.call(this), data);
};
var open = function open(opts, callback) {
  var _this = this;

  var pos = {},
      box = {
    width: opts.width
  };

  this.dialogConfig = opts;
  this.$activeDialog = (0, _jqmin2.default)(getContent.call(this, opts.id, opts));
  this.$activeDialog.css({ width: box.width });
  (0, _jqmin2.default)(document.body).append(this.$activeDialog);

  if (typeof callback === "undefined") {
    callback = opts.callback;
  }

  // dialog 높이 구하기 - 너비가 정해지면 높이가 변경 될 것.
  opts.height = box.height = this.$activeDialog.height();

  //- position 정렬
  if (typeof opts.position === "undefined" || opts.position === "center") {
    pos.top = (0, _jqmin2.default)(window).height() / 2 - box.height / 2;
    pos.left = (0, _jqmin2.default)(window).width() / 2 - box.width / 2;
  } else {
    pos.left = opts.position.left || 0;
    pos.top = opts.position.top || 0;
  }
  if (this.config.zIndex) {
    pos["z-index"] = this.config.zIndex;
  }

  this.$activeDialog.css(pos).on(opts.clickEventName, "[data-dialog-btn]", function (e) {
    btnOnClick.call(_this, e || window.event, opts, callback);
  }).find(opts.dialogType === "prompt" ? "[data-dialog-prompt]" : "[data-dialog-btn]").trigger("focus");

  // bind key event
  (0, _jqmin2.default)(window).on("keydown.ax6dialog", function (e) {
    onKeyup.call(_this, e || window.event, opts, callback);
  }).on("resize.ax6dialog", _AX6Util2.default.throttle(function (e) {
    align.call(this, e || window.event);
  }, 30).bind(this));

  onStateChanged.call(this, opts, {
    self: this,
    state: "open"
  });

  if (opts.autoCloseTime) {
    this.autoCloseTimer = setTimeout(function () {
      _this.close();
    }, opts.autoCloseTime);
  }

  pos = null;
  box = null;
};
var align = function align(e) {
  if (!this.$activeDialog) return this;
  var opts = this.dialogConfig,
      box = {
    width: opts.width,
    height: opts.height
  };

  //- position 정렬
  if (typeof opts.position === "undefined" || opts.position === "center") {
    box.top = window.innerHeight / 2 - box.height / 2;
    box.left = window.innerWidth / 2 - box.width / 2;
  } else {
    box.left = opts.position.left || 0;
    box.top = opts.position.top || 0;
  }
  if (box.left < 0) box.left = 0;
  if (box.top < 0) box.top = 0;

  this.$activeDialog.css(box);

  opts = null;
  box = null;

  return this;
};
var btnOnClick = function btnOnClick(e, opts, callback, target, k) {
  var that = void 0,
      emptyKey = null;

  if (e.srcElement) e.target = e.srcElement;

  target = _AX6Util2.default.findParentNode(e.target, function (target) {
    if (target.getAttribute("data-dialog-btn")) {
      return true;
    }
  });

  if (target) {
    k = target.getAttribute("data-dialog-btn");

    that = {
      self: this,
      key: k, value: opts.btns[k],
      dialogId: opts.id,
      btnTarget: target
    };
    if (opts.dialogType === "prompt") {
      that.input = {};
      for (var oi in opts.input) {
        that.input[oi] = this.$activeDialog.find('[data-dialog-prompt=' + oi + ']').val();
        if (opts.input[oi].required && (that.input[oi] == "" || that.input[oi] == null)) {
          emptyKey = oi;
          break;
        }
      }
    }
    if (opts.btns[k].onClick) {
      opts.btns[k].onClick.call(that, that);
    } else if (opts.dialogType === "alert") {
      if (callback) callback.call(that, that);
      this.close({ doNotCallback: true });
    } else if (opts.dialogType === "confirm") {
      if (callback) callback.call(that, that);
      this.close({ doNotCallback: true });
    } else if (opts.dialogType === "prompt") {
      if (k === 'ok') {
        if (emptyKey) {
          this.$activeDialog.find('[data-dialog-prompt="' + emptyKey + '"]').get(0).focus();
          return false;
        }
      }
      if (callback) callback.call(that, that);
      this.close({ doNotCallback: true });
    }
  }

  that = null;
  opts = null;
  callback = null;
  target = null;
  k = null;
};
var onKeyup = function onKeyup(e, opts, callback, target, k) {
  var that = void 0,
      emptyKey = null;

  if (e.keyCode == _AX6Info2.default.eventKeys.ESC) {
    this.close();
  }
  if (opts.dialogType === "prompt") {
    if (e.keyCode == _AX6Info2.default.eventKeys.RETURN) {
      that = {
        self: this,
        key: k, value: opts.btns[k],
        dialogId: opts.id,
        btnTarget: target
      };
      that.input = {};

      for (var oi in opts.input) {
        that.input[oi] = this.$activeDialog.find('[data-dialog-prompt=' + oi + ']').val();
        if (opts.input[oi].required && (that.input[oi] == "" || that.input[oi] == null)) {
          emptyKey = oi;
          break;
        }
      }
      if (emptyKey) {
        that = null;
        emptyKey = null;
        return false;
      }
      if (callback) callback.call(that, that);
      this.close({ doNotCallback: true });
    }
  }

  that = null;
  emptyKey = null;
  opts = null;
  callback = null;
  target = null;
  k = null;
};

/* ~~~~~~~~~~~~~~~~~~ end of private  ~~~~~~~~~~~~~~~~~~~~ */

/**
 * @class
 */

var AX6UIDialog = function (_AX6UICore) {
  _inherits(AX6UIDialog, _AX6UICore);

  /**
   * @constructor
   * @param config
   */
  function AX6UIDialog(config) {
    _classCallCheck(this, AX6UIDialog);

    /**
     * @member {JSON}
     * @param config
     * @param [config.theme='default']
     * @param [config.width=300]
     * @param [config.title='']
     * @param [config.msg='']
     * @param [config.lang]
     * @param [config.lang.ok='ok']
     * @param [config.lang.cancel='cancel']
     * @param [config.animateTime=150]
     * @param [config.autoCloseTime=0]
     * @param [config.onStateChanged]
     *
     */
    var _this2 = _possibleConstructorReturn(this, (AX6UIDialog.__proto__ || Object.getPrototypeOf(AX6UIDialog)).call(this));

    _this2.config = {
      id: 'ax6-dialog-' + _this2.instanceId,
      clickEventName: "click",
      theme: 'default',
      width: 300,
      title: 'AX6UIDialog',
      msg: '',
      lang: {
        "ok": "ok", "cancel": "cancel"
      },
      animateTime: 150,
      autoCloseTime: 0
    };
    _jqmin2.default.extend(true, _this2.config, config);

    // 멤버 변수 초기화
    /**
     * dialog가 열려있는 상태에서 다시 open이 되면 queue에 보관 하였다가 close후 open
     * @member {Array}
     */
    _this2.queue = [];
    /**
     * @member {jQueryElement}
     */
    _this2.$activeDialog = null;
    /**
     * @member {Object}
     */
    _this2.autoCloseTimer = null;

    _this2.init();
    return _this2;
  }

  /**
   * @method
   * @param config
   */


  _createClass(AX6UIDialog, [{
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
    }

    /**
     * @method
     * @param opts
     * @param callback
     * @param tryCount
     * @return {AX6UIDialog}
     * @example
     * ```js
     * import {Dialog} from "ax6ui"
     *
     * const dialog = new Dialog();
     * dialog.alert("Alert Message");
     * dialog.alert({
       *     title: "Title",
       *     msg: "Alert Message"
       * });
     * ```
     */

  }, {
    key: "alert",
    value: function alert(opts, callback, tryCount) {
      if (typeof opts === "undefined") {
        opts = {
          title: this.config.title,
          msg: ""
        };
      } else if (_AX6Util2.default.isString(opts)) {
        opts = {
          title: this.config.title,
          msg: opts
        };
      }

      opts = _jqmin2.default.extend(true, {}, this.config, opts, {
        dialogType: "alert",
        callback: callback
      });

      if (typeof opts.btns === "undefined") {
        opts.btns = {
          ok: { label: opts.lang["ok"], theme: opts.theme }
        };
      }

      if (this.$activeDialog) {
        this.queue.push(opts);
      } else {
        open.call(this, opts, callback);
      }
    }

    /**
     * @method
     * @param opts
     * @param callback
     * @param tryCount
     * @return {AX6UIDialog}
     * @example
     * ```js
     * import {Dialog} from "ax6ui"
     *
     * const dialog = new Dialog();
     * dialog.confirm({
       *     title: "확인",
       *     msg: "확인 또는 취소를 누르세요"
       * }, function (res) {
       *     //console.log(this, a, b);
       *     if(res.key == "ok"){
       *         console.log("OK");
       *     }
       *     else if(res.key == "cancel"){
       *         console.log("CANCEL");
       *     }
       * });
     *
     * // btns custom
     * dialog.config({
       *  title: "예/아니오",
       *  msg: "당신은 개발자 입니까?",
       *  btns: {
       *      Y: {label: "예"},
       *      N: {label: "아니오"}
       *  }
       * }, function (res) {
       *      console.log(res);
       * });
     * ```
     */

  }, {
    key: "confirm",
    value: function confirm(opts, callback, tryCount) {
      if (typeof opts === "undefined") {
        opts = {
          title: this.config.title,
          msg: ""
        };
      } else if (_AX6Util2.default.isString(opts)) {
        opts = {
          title: this.config.title,
          msg: opts
        };
      }

      opts = _jqmin2.default.extend(true, {}, this.config, opts, {
        dialogType: "confirm",
        callback: callback
      });

      if (typeof opts.btns === "undefined") {
        opts.btns = {
          ok: { label: opts.lang["ok"], theme: opts.theme },
          cancel: { label: opts.lang["cancel"] }
        };
      }

      if (this.$activeDialog) {
        this.queue.push(opts);
      } else {
        open.call(this, opts, callback);
      }

      return this;
    }

    /**
     * @method
     * @param opts
     * @param callback
     * @param tryCount
     * @return {AX6UIDialog}
     * @example
     * ```js
     * import {Dialog} from "ax6ui"
     *
     * const dialog = new Dialog();
     *
     * dialog.prompt({
       *  title: "prompt",
       *  msg: '다음의 값을 입력하세요.',
       *  input: {
       *      data1: {label: "data1의 라벨", type: "password"},
       *      data2: {label: "data2의 라벨"}
       *  }
       * }, function(res){
       *      console.log(res);
       * });
     * ```
     */

  }, {
    key: "prompt",
    value: function prompt(opts, callback, tryCount) {
      if (typeof opts === "undefined") {
        opts = {
          title: this.config.title,
          msg: ""
        };
      } else if (_AX6Util2.default.isString(opts)) {
        opts = {
          title: this.config.title,
          msg: opts
        };
      }

      opts = _jqmin2.default.extend(true, {}, this.config, opts, {
        dialogType: "prompt",
        callback: callback
      });

      if (typeof opts.input === "undefined") {
        opts.input = {
          value: { label: "" }
        };
      }
      if (typeof opts.btns === "undefined") {
        opts.btns = {
          ok: { label: opts.lang["ok"], theme: opts.theme },
          cancel: { label: opts.lang["cancel"] }
        };
      }

      if (this.$activeDialog) {
        this.queue.push(opts);
      } else {
        open.call(this, opts, callback);
      }

      return this;
    }

    /**
     * @method
     * @param _option
     * @return {AX6UIDialog}
     * @example
     * ```js
     * dialog.close();
     * dialog.close({callback: function(){
       *
       * });
       * ```
       */

  }, {
    key: "close",
    value: function close(_option) {
      var opts = void 0,
          that = void 0;

      if (this.$activeDialog) {
        if (this.autoCloseTimer) clearTimeout(this.autoCloseTimer);

        opts = this.dialogConfig;

        this.$activeDialog.addClass("destroy");
        (0, _jqmin2.default)(window).off("keydown.ax6dialog").off("resize.ax6dialog");

        setTimeout(function () {
          if (this.$activeDialog) {
            this.$activeDialog.remove();
            this.$activeDialog = null;
          }

          that = {
            self: this,
            state: "close",
            dialogId: opts.id
          };

          if (_option && _AX6Util2.default.isFunction(_option.callback)) {
            _option.callback.call(that, that);
          } else if (opts.callback && (!_option || !_option.doNotCallback)) {
            opts.callback.call(that, that);
          }

          if (opts && opts.onStateChanged) {
            opts.onStateChanged.call(that, that);
          } else if (this.onStateChanged) {
            this.onStateChanged.call(that, that);
          }

          // 열려야 할 큐가 남아 있다면 큐아이템으로 다시 open
          if (this.queue && this.queue.length) {
            open.call(this, this.queue.shift());
          }

          opts = null;
          that = null;
        }.bind(this), this.config.animateTime);
      }
      return this;
    }
  }]);

  return AX6UIDialog;
}(_AX6UICore3.default);

exports.default = AX6UIDialog;

/***/ }),

/***/ 76:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(77);
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

/***/ 77:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "@-webkit-keyframes ax-dialog {\n  0% {\n    opacity: 0.0;\n    -webkit-transform: scaleX(1); }\n  0.1% {\n    opacity: 0.0;\n    -webkit-transform: scaleX(1.3); }\n  100% {\n    opacity: 1.0;\n    -webkit-transform: scaleX(1); } }\n\n@-moz-keyframes ax-dialog {\n  0% {\n    opacity: 0.0;\n    -moz-transform: scaleX(1); }\n  0.1% {\n    opacity: 0.0;\n    -moz-transform: scaleX(1.3); }\n  100% {\n    opacity: 1.0;\n    -moz-transform: scaleX(1); } }\n\n@keyframes ax-dialog {\n  0% {\n    opacity: 0.0;\n    -webkit-transform: scaleX(1);\n    -moz-transform: scaleX(1);\n    -ms-transform: scaleX(1);\n    -o-transform: scaleX(1);\n    transform: scaleX(1); }\n  0.1% {\n    opacity: 0.0;\n    -webkit-transform: scaleX(1.3);\n    -moz-transform: scaleX(1.3);\n    -ms-transform: scaleX(1.3);\n    -o-transform: scaleX(1.3);\n    transform: scaleX(1.3); }\n  100% {\n    opacity: 1.0;\n    -webkit-transform: scaleX(1);\n    -moz-transform: scaleX(1);\n    -ms-transform: scaleX(1);\n    -o-transform: scaleX(1);\n    transform: scaleX(1); } }\n\n@-webkit-keyframes ax-dialog-destroy {\n  from {\n    -webkit-transform: translate(0, 0);\n    opacity: 1.0; }\n  to {\n    -webkit-transform: translate(0, 50%);\n    opacity: 0.0; } }\n\n@-moz-keyframes ax-dialog-destroy {\n  from {\n    -moz-transform: translate(0, 0);\n    opacity: 1.0; }\n  to {\n    -moz-transform: translate(0, 50%);\n    opacity: 0.0; } }\n\n@keyframes ax-dialog-destroy {\n  from {\n    -webkit-transform: translate(0, 0);\n    -moz-transform: translate(0, 0);\n    -ms-transform: translate(0, 0);\n    -o-transform: translate(0, 0);\n    transform: translate(0, 0);\n    opacity: 1.0; }\n  to {\n    -webkit-transform: translate(0, 50%);\n    -moz-transform: translate(0, 50%);\n    -ms-transform: translate(0, 50%);\n    -o-transform: translate(0, 50%);\n    transform: translate(0, 50%);\n    opacity: 0.0; } }\n\n[data-ax6ui-dialog] {\n  -webkit-animation: ax-dialog 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  -moz-animation: ax-dialog 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  animation: ax-dialog 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  -webkit-transform: translateZ(0);\n  -moz-transform: translateZ(0);\n  -ms-transform: translateZ(0);\n  -o-transform: translateZ(0);\n  transform: translateZ(0);\n  box-sizing: border-box;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.175);\n  z-index: 2000;\n  position: fixed;\n  left: 0;\n  top: 0;\n  overflow: hidden;\n  border: 1px solid #ddd; }\n  [data-ax6ui-dialog] .ax-dialog-header {\n    font-weight: 600;\n    padding: 10px 15px;\n    border-bottom: 1px solid transparent; }\n    [data-ax6ui-dialog] .ax-dialog-header .badge {\n      font-size: 0.8em;\n      color: #f5f5f5;\n      background-color: #333; }\n  [data-ax6ui-dialog] .ax-dialog-body {\n    padding: 15px;\n    text-align: center; }\n    [data-ax6ui-dialog] .ax-dialog-body .ax-dialog-msg {\n      padding-top: 15px;\n      padding-bottom: 15px; }\n    [data-ax6ui-dialog] .ax-dialog-body .ax-dialog-prompt {\n      text-align: left;\n      padding-bottom: 7.5px; }\n    [data-ax6ui-dialog] .ax-dialog-body .ax-dialog-buttons {\n      margin-top: 15px; }\n      [data-ax6ui-dialog] .ax-dialog-body .ax-dialog-buttons button:not(:last-child) {\n        margin-right: 3px; }\n    [data-ax6ui-dialog] .ax-dialog-body [data-dialog-els=\"additional-content\"] {\n      margin-top: 15px; }\n  [data-ax6ui-dialog] .ax-dialog-header {\n    color: #333;\n    background: #f5f5f5; }\n    [data-ax6ui-dialog] .ax-dialog-header .badge {\n      color: #f5f5f5;\n      background-color: #333; }\n  [data-ax6ui-dialog].destroy {\n    -webkit-animation: ax-dialog-destroy 0.15s cubic-bezier(0.755, 0.05, 0.855, 0.06) forwards;\n    -moz-animation: ax-dialog-destroy 0.15s cubic-bezier(0.755, 0.05, 0.855, 0.06) forwards;\n    animation: ax-dialog-destroy 0.15s cubic-bezier(0.755, 0.05, 0.855, 0.06) forwards; }\n", ""]);

// exports


/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZGlhbG9nLmpzIiwid2VicGFjazovLy8uLi9zcmMvQVg2TXVzdGFjaGUuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9BWDZVSURpYWxvZy5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL0FYNlVJRGlhbG9nL3N0eWxlLnNjc3M/YTU4MiIsIndlYnBhY2s6Ly8vLi4vc3JjL0FYNlVJRGlhbG9nL3N0eWxlLnNjc3MiXSwibmFtZXMiOlsiaHRtbCIsImZuIiwibW9kdWxlUnVuIiwiJGJvZHkiLCJkaWFsb2ciLCJzZXRDb25maWciLCJvbiIsImUiLCJidG4iLCJjdXJyZW50VGFyZ2V0IiwiZ2V0QXR0cmlidXRlIiwicHJvY2Vzc29yIiwiYWxlcnQiLCJtc2ciLCJEYXRlIiwib25TdGF0ZUNoYW5nZWQiLCJyZXMiLCJzdGF0ZSIsImNvbmZpcm0iLCJ0aXRsZSIsImJ0bnMiLCJZIiwibGFiZWwiLCJOIiwiY29uc29sZSIsImxvZyIsInByb21wdCIsImlucHV0IiwiZGF0YTEiLCJ0eXBlIiwiZGF0YTIiLCJkYmxhbGVydCIsInNldFRpbWVvdXQiLCJjbG9zZSIsImRibGNvbmZpcm0iLCJLIiwiUyIsIm1vZHVsZURlc3Ryb3kiLCJvZmYiLCJBWDYiLCJkZWZpbmVNdXN0YWNoZSIsImdsb2JhbCIsImZhY3RvcnkiLCJtdXN0YWNoZSIsIm11c3RhY2hlRmFjdG9yeSIsIm9iamVjdFRvU3RyaW5nIiwiT2JqZWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJpc0FycmF5IiwiQXJyYXkiLCJpc0FycmF5UG9seWZpbGwiLCJvYmplY3QiLCJjYWxsIiwiaXNGdW5jdGlvbiIsInR5cGVTdHIiLCJvYmoiLCJlc2NhcGVSZWdFeHAiLCJzdHJpbmciLCJyZXBsYWNlIiwiaGFzUHJvcGVydHkiLCJwcm9wTmFtZSIsInJlZ0V4cFRlc3QiLCJSZWdFeHAiLCJ0ZXN0IiwidGVzdFJlZ0V4cCIsInJlIiwibm9uU3BhY2VSZSIsImlzV2hpdGVzcGFjZSIsImVudGl0eU1hcCIsImVzY2FwZUh0bWwiLCJTdHJpbmciLCJmcm9tRW50aXR5TWFwIiwicyIsIndoaXRlUmUiLCJzcGFjZVJlIiwiZXF1YWxzUmUiLCJjdXJseVJlIiwidGFnUmUiLCJwYXJzZVRlbXBsYXRlIiwidGVtcGxhdGUiLCJ0YWdzIiwic2VjdGlvbnMiLCJ0b2tlbnMiLCJzcGFjZXMiLCJoYXNUYWciLCJub25TcGFjZSIsInN0cmlwU3BhY2UiLCJsZW5ndGgiLCJwb3AiLCJvcGVuaW5nVGFnUmUiLCJjbG9zaW5nVGFnUmUiLCJjbG9zaW5nQ3VybHlSZSIsImNvbXBpbGVUYWdzIiwidGFnc1RvQ29tcGlsZSIsInNwbGl0IiwiRXJyb3IiLCJzY2FubmVyIiwiU2Nhbm5lciIsInN0YXJ0IiwidmFsdWUiLCJjaHIiLCJ0b2tlbiIsIm9wZW5TZWN0aW9uIiwiZW9zIiwicG9zIiwic2NhblVudGlsIiwiaSIsInZhbHVlTGVuZ3RoIiwiY2hhckF0IiwicHVzaCIsInNjYW4iLCJuZXN0VG9rZW5zIiwic3F1YXNoVG9rZW5zIiwic3F1YXNoZWRUb2tlbnMiLCJsYXN0VG9rZW4iLCJudW1Ub2tlbnMiLCJuZXN0ZWRUb2tlbnMiLCJjb2xsZWN0b3IiLCJzZWN0aW9uIiwidGFpbCIsIm1hdGNoIiwiaW5kZXgiLCJzdWJzdHJpbmciLCJzZWFyY2giLCJDb250ZXh0IiwidmlldyIsInBhcmVudENvbnRleHQiLCJjYWNoZSIsInJldHVybnMiLCJrIiwicGFyZW50IiwibG9va3VwIiwibmFtZSIsImhhc093blByb3BlcnR5IiwiY29udGV4dCIsIm5hbWVzIiwibG9va3VwSGl0IiwiaW5kZXhPZiIsIldyaXRlciIsImNsZWFyQ2FjaGUiLCJwYXJzZSIsInJlbmRlciIsInBhcnRpYWxzIiwicmVuZGVyVG9rZW5zIiwib3JpZ2luYWxUZW1wbGF0ZSIsImJ1ZmZlciIsInN5bWJvbCIsInVuZGVmaW5lZCIsInJlbmRlclNlY3Rpb24iLCJyZW5kZXJJbnZlcnRlZCIsInJlbmRlclBhcnRpYWwiLCJ1bmVzY2FwZWRWYWx1ZSIsImVzY2FwZWRWYWx1ZSIsInJhd1ZhbHVlIiwic2VsZiIsInN1YlJlbmRlciIsImoiLCJzbGljZSIsImVzY2FwZSIsInZlcnNpb24iLCJkZWZhdWx0V3JpdGVyIiwiVHlwZUVycm9yIiwidG9faHRtbCIsInNlbmQiLCJyZXN1bHQiLCJkaWFsb2dUbXBsIiwiY29sdW1uS2V5cyIsIm9wdHMiLCJ0aGF0IiwiZ2V0Q29udGVudCIsImRpYWxvZ0lkIiwiZGF0YSIsImNvbmZpZyIsImFkZGl0aW9uYWxDb250ZW50Iiwib3BlbiIsImNhbGxiYWNrIiwiYm94Iiwid2lkdGgiLCJkaWFsb2dDb25maWciLCIkYWN0aXZlRGlhbG9nIiwiaWQiLCJjc3MiLCJkb2N1bWVudCIsImJvZHkiLCJhcHBlbmQiLCJoZWlnaHQiLCJwb3NpdGlvbiIsInRvcCIsIndpbmRvdyIsImxlZnQiLCJ6SW5kZXgiLCJjbGlja0V2ZW50TmFtZSIsImJ0bk9uQ2xpY2siLCJldmVudCIsImZpbmQiLCJkaWFsb2dUeXBlIiwidHJpZ2dlciIsIm9uS2V5dXAiLCJ0aHJvdHRsZSIsImFsaWduIiwiYmluZCIsImF1dG9DbG9zZVRpbWUiLCJhdXRvQ2xvc2VUaW1lciIsImlubmVySGVpZ2h0IiwiaW5uZXJXaWR0aCIsInRhcmdldCIsImVtcHR5S2V5Iiwic3JjRWxlbWVudCIsImZpbmRQYXJlbnROb2RlIiwia2V5IiwiYnRuVGFyZ2V0Iiwib2kiLCJ2YWwiLCJyZXF1aXJlZCIsIm9uQ2xpY2siLCJkb05vdENhbGxiYWNrIiwiZ2V0IiwiZm9jdXMiLCJrZXlDb2RlIiwiZXZlbnRLZXlzIiwiRVNDIiwiUkVUVVJOIiwiQVg2VUlEaWFsb2ciLCJpbnN0YW5jZUlkIiwidGhlbWUiLCJsYW5nIiwiYW5pbWF0ZVRpbWUiLCJleHRlbmQiLCJxdWV1ZSIsImluaXQiLCJpbml0T25jZSIsImluaXRpYWxpemVkIiwidHJ5Q291bnQiLCJpc1N0cmluZyIsIm9rIiwiY2FuY2VsIiwiX29wdGlvbiIsImNsZWFyVGltZW91dCIsImFkZENsYXNzIiwicmVtb3ZlIiwic2hp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LEVBQUUsVUFBVSxtQkFBbUIscUNBQXFDLGtDQUFrQyxpQ0FBaUMsZ0NBQWdDLDZCQUE2QixFQUFFLFVBQVUsbUJBQW1CLG1DQUFtQyxnQ0FBZ0MsK0JBQStCLDhCQUE4QiwyQkFBMkIsRUFBRSxFQUFFLDBDQUEwQyxVQUFVLHlDQUF5QyxtQkFBbUIsRUFBRSxRQUFRLDJDQUEyQyxtQkFBbUIsRUFBRSxFQUFFLHVDQUF1QyxVQUFVLHNDQUFzQyxtQkFBbUIsRUFBRSxRQUFRLHdDQUF3QyxtQkFBbUIsRUFBRSxFQUFFLGtDQUFrQyxVQUFVLHlDQUF5QyxzQ0FBc0MscUNBQXFDLG9DQUFvQyxpQ0FBaUMsbUJBQW1CLEVBQUUsUUFBUSwyQ0FBMkMsd0NBQXdDLHVDQUF1QyxzQ0FBc0MsbUNBQW1DLG1CQUFtQixFQUFFLEVBQUUseUJBQXlCLCtFQUErRSw0RUFBNEUsdUVBQXVFLHFDQUFxQyxrQ0FBa0MsaUNBQWlDLGdDQUFnQyw2QkFBNkIsMkJBQTJCLDJCQUEyQiwyQkFBMkIsdUJBQXVCLHFEQUFxRCxrQkFBa0Isb0JBQW9CLFlBQVksV0FBVyxxQkFBcUIsMkJBQTJCLEVBQUUsMkNBQTJDLHVCQUF1Qix5QkFBeUIsMkNBQTJDLEVBQUUsb0RBQW9ELHlCQUF5Qix1QkFBdUIsK0JBQStCLEVBQUUseUNBQXlDLG9CQUFvQix5QkFBeUIsRUFBRSwwREFBMEQsMEJBQTBCLDZCQUE2QixFQUFFLDZEQUE2RCx5QkFBeUIsOEJBQThCLEVBQUUsOERBQThELHlCQUF5QixFQUFFLHdGQUF3Riw0QkFBNEIsRUFBRSxvRkFBb0YseUJBQXlCLEVBQUUsMkNBQTJDLGtCQUFrQiwwQkFBMEIsRUFBRSxvREFBb0QsdUJBQXVCLCtCQUErQixFQUFFLGlDQUFpQyxpR0FBaUcsOEZBQThGLHlGQUF5RixFQUFFOztBQUVuN0giLCJmaWxlIjoiMTAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGlhbG9nIGZyb20gXCIuLi8uLi9zcmMvQVg2VUlEaWFsb2dcIjtcbmltcG9ydCBcIi4uLy4uL3NyYy9BWDZVSURpYWxvZy9zdHlsZS5zY3NzXCI7XG5cbmxldCBodG1sID0gYFxuPGEgY2xhc3M9XCJ3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHQgYnRuXCIgZGF0YS1idG49XCJhbGVydFwiPmFsZXJ0PC9hPlxuPGEgY2xhc3M9XCJ3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHQgYnRuXCIgZGF0YS1idG49XCJjb25maXJtXCI+Y29uZmlybTwvYT5cbjxhIGNsYXNzPVwid2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0IGJ0blwiIGRhdGEtYnRuPVwicHJvbXB0XCI+cHJvbXB0PC9hPlxuPGhyLz5cbjxhIGNsYXNzPVwid2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0IGJ0blwiIGRhdGEtYnRuPVwiZGJsYWxlcnRcIj5kb3VibGUgYWxlcnQgY2FsbDwvYT5cbjxhIGNsYXNzPVwid2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0IGJ0blwiIGRhdGEtYnRuPVwiZGJsY29uZmlybVwiPmRvdWJsZSBjb25maXJtIGNhbGw8L2E+XG5gO1xubGV0IGZuID0ge1xuICBtb2R1bGVSdW46IGZ1bmN0aW9uICgkYm9keSkge1xuXG4gICAgbGV0IGRpYWxvZyA9IG5ldyBEaWFsb2coKTtcbiAgICBkaWFsb2cuc2V0Q29uZmlnKHt9KTtcblxuICAgICRib2R5Lm9uKFwiY2xpY2tcIiwgJ1tkYXRhLWJ0bl0nLCAoZSkgPT4ge1xuICAgICAgbGV0IGJ0biA9IGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWJ0blwiKTtcbiAgICAgIGxldCBwcm9jZXNzb3IgPSB7XG4gICAgICAgIGFsZXJ0KCkge1xuICAgICAgICAgIGRpYWxvZy5hbGVydCh7XG4gICAgICAgICAgICBtc2c6IFwiYWxlcnQgXCIgKyBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgb25TdGF0ZUNoYW5nZWQ6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgaWYgKHJlcy5zdGF0ZSA9PSBcIm9wZW5cIikge1xuICAgICAgICAgICAgICAgIC8vJGJvZHkuYXBwZW5kKCRidG4pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChyZXMuc3RhdGUgPT0gXCJjbG9zZVwiKSB7XG4gICAgICAgICAgICAgICAgLy8kYnRuLnJlbW92ZSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGNvbmZpcm0oKSB7XG4gICAgICAgICAgZGlhbG9nLmNvbmZpcm0oe1xuICAgICAgICAgICAgdGl0bGU6IFwi7JiIL+yVhOuLiOyYpFwiLFxuICAgICAgICAgICAgbXNnOiBcIuuLueyLoOydgCDqsJzrsJzsnpAg7J6F64uI6rmMP1wiLFxuICAgICAgICAgICAgYnRuczoge1xuICAgICAgICAgICAgICBZOiB7bGFiZWw6IFwi7JiIXCJ9LFxuICAgICAgICAgICAgICBOOiB7bGFiZWw6IFwi7JWE64uI7JikXCJ9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgcHJvbXB0KCkge1xuICAgICAgICAgIGRpYWxvZy5wcm9tcHQoe1xuICAgICAgICAgICAgdGl0bGU6IFwicHJvbXB0XCIsXG4gICAgICAgICAgICBtc2c6ICfri6TsnYzsnZgg6rCS7J2EIOyeheugpe2VmOyEuOyalC4nLFxuICAgICAgICAgICAgaW5wdXQ6IHtcbiAgICAgICAgICAgICAgZGF0YTE6IHtsYWJlbDogXCJkYXRhMeydmCDrnbzrsqhcIiwgdHlwZTogXCJwYXNzd29yZFwifSxcbiAgICAgICAgICAgICAgZGF0YTI6IHtsYWJlbDogXCJkYXRhMuydmCDrnbzrsqhcIn1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZGJsYWxlcnQoKSB7XG4gICAgICAgICAgZGlhbG9nLmFsZXJ0KHtcbiAgICAgICAgICAgIG1zZzogXCJhbGVydCBcIiArIChuZXcgRGF0ZSgpICsgXCIgY2xvc2UgMXMgbGF0ZXJcIiksXG4gICAgICAgICAgICBvblN0YXRlQ2hhbmdlZDogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICBpZiAocmVzLnN0YXRlID09IFwib3BlblwiKSB7XG4gICAgICAgICAgICAgICAgLy8kYm9keS5hcHBlbmQoJGJ0bik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHJlcy5zdGF0ZSA9PSBcImNsb3NlXCIpIHtcbiAgICAgICAgICAgICAgICAvLyRidG4ucmVtb3ZlKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZGlhbG9nLmNsb3NlKCk7XG4gICAgICAgICAgICBkaWFsb2cuYWxlcnQoe1xuICAgICAgICAgICAgICBtc2c6IFwiYWxlcnQgXCIgKyAobmV3IERhdGUoKSlcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH0sXG4gICAgICAgIGRibGNvbmZpcm0oKSB7XG4gICAgICAgICAgZGlhbG9nLmNvbmZpcm0oe1xuICAgICAgICAgICAgdGl0bGU6IFwi7JiIL+yVhOuLiOyYpFwiLFxuICAgICAgICAgICAgbXNnOiBcIuuLueyLoOydgCDqsJzrsJzsnpAg7J6F64uI6rmMPyDrsoTtirzsnYQg64iE66W066m0IO2VnOuyiCDrjZQg66y87Ja067SF64uI64ukLlwiLFxuICAgICAgICAgICAgYnRuczoge1xuICAgICAgICAgICAgICBZOiB7bGFiZWw6IFwi7JiIXCJ9LFxuICAgICAgICAgICAgICBOOiB7bGFiZWw6IFwi7JWE64uI7JikXCJ9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGRpYWxvZy5jb25maXJtKHtcbiAgICAgICAgICAgIHRpdGxlOiBcIuyYiC/slYTri4jsmKRcIixcbiAgICAgICAgICAgIG1zZzogXCLri7nsi6DsnYAg6rCc67Cc7J6QIOyeheuLiOq5jD9cIixcbiAgICAgICAgICAgIGJ0bnM6IHtcbiAgICAgICAgICAgICAgSzoge2xhYmVsOiBcIuyYiFwifSxcbiAgICAgICAgICAgICAgUzoge2xhYmVsOiBcIuyVhOuLiOyYpFwifVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICBpZiAoYnRuIGluIHByb2Nlc3Nvcikge1xuICAgICAgICBwcm9jZXNzb3JbYnRuXSgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIH0sXG4gIG1vZHVsZURlc3Ryb3k6IGZ1bmN0aW9uICgkYm9keSkge1xuICAgICRib2R5Lm9mZihcImNsaWNrXCIpO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGh0bWw6IGh0bWwsXG4gIGZuOiBmblxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9kaWFsb2cuanMiLCIvKiFcbiAqIG11c3RhY2hlLmpzIC0gTG9naWMtbGVzcyB7e211c3RhY2hlfX0gdGVtcGxhdGVzIHdpdGggSmF2YVNjcmlwdFxuICogaHR0cDovL2dpdGh1Yi5jb20vamFubC9tdXN0YWNoZS5qc1xuICogaHR0cHM6Ly9naXRodWIuY29tL3Rob21hc0phbmcvbXVzdGFjaGUuanMgLS0gaW1wb3JvdmUgc29tZSB2YXJpYWJsZXNcbiAqL1xuXG5cbi8qKlxuICogQVg2TXVzdGFjaGXripQgaHR0cDovL2dpdGh1Yi5jb20vamFubC9tdXN0YWNoZS5qc+yXkCDrqofqsIDsp4Ag7LWc7IaM7ZWc7J2YIOq4sOuKpeydhCDtipzri53tlZjsl6wg7IKs7Jqp7ZWY64qUIO2FnO2UjOumvyDsl5Tsp4TsnoXri4jri6QuXG4gKiBAbmFtZXNwYWNlIEFYNk11c3RhY2hlXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIEFYNk11c3RhY2hlLnJlbmRlclxuICogQGV4YW1wbGVcbiAqIGBgYGpzXG4gKiBheDUubXVzdGFjaGUucmVuZGVyKHRlbXBsYXRlLCB2aWV3KVxuICpcbiAqXG4gKiAvL0FycmF5IEBpXG4gKiAvL3t7I2JlYXRsZXN9fVxuICogLy97e2ZpcnN0TmFtZX19IHt7bGFzdE5hbWV9fSAoe3tAaX19KSAoe3tAZmlyc3R9fSlcbiAqIC8ve3svYmVhdGxlc319XG4gKlxuICogLy9PYmplY3QgQGVhY2hcbiAqIHt7I2JlYXRsZXN9fVxuICogIHt7I0BlYWNofX1cbiAqICAgICAge3tAa2V5fX0gOiB7e0B2YWx1ZS5maXJzdE5hbWV9fSB7e0B2YWx1ZS5sYXN0TmFtZX19XG4gKiAge3svQGVhY2h9fVxuICoge3svYmVhdGxlc319XG4gKlxuICogYGBgXG4gKi9cblxuXG5cbmxldCBBWDYgPSB7fTtcblxuKGZ1bmN0aW9uIGRlZmluZU11c3RhY2hlKGdsb2JhbCwgZmFjdG9yeSkge1xuXG4gIGZhY3RvcnkoZ2xvYmFsLm11c3RhY2hlID0ge30pO1xuXG59KEFYNiwgZnVuY3Rpb24gbXVzdGFjaGVGYWN0b3J5KG11c3RhY2hlKSB7XG5cbiAgdmFyIG9iamVjdFRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbiAgdmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIGlzQXJyYXlQb2x5ZmlsbChvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0VG9TdHJpbmcuY2FsbChvYmplY3QpID09PSAnW29iamVjdCBBcnJheV0nO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGlzRnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmplY3QgPT09ICdmdW5jdGlvbic7XG4gIH1cblxuICAvKipcbiAgICogTW9yZSBjb3JyZWN0IHR5cGVvZiBzdHJpbmcgaGFuZGxpbmcgYXJyYXlcbiAgICogd2hpY2ggbm9ybWFsbHkgcmV0dXJucyB0eXBlb2YgJ29iamVjdCdcbiAgICovXG4gIGZ1bmN0aW9uIHR5cGVTdHIob2JqKSB7XG4gICAgcmV0dXJuIGlzQXJyYXkob2JqKSA/ICdhcnJheScgOiB0eXBlb2Ygb2JqO1xuICB9XG5cbiAgZnVuY3Rpb24gZXNjYXBlUmVnRXhwKHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvW1xcLVxcW1xcXXt9KCkqKz8uLFxcXFxcXF4kfCNcXHNdL2csICdcXFxcJCYnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOdWxsIHNhZmUgd2F5IG9mIGNoZWNraW5nIHdoZXRoZXIgb3Igbm90IGFuIG9iamVjdCxcbiAgICogaW5jbHVkaW5nIGl0cyBwcm90b3R5cGUsIGhhcyBhIGdpdmVuIHByb3BlcnR5XG4gICAqL1xuICBmdW5jdGlvbiBoYXNQcm9wZXJ0eShvYmosIHByb3BOYW1lKSB7XG4gICAgcmV0dXJuIG9iaiAhPSBudWxsICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIChwcm9wTmFtZSBpbiBvYmopO1xuICB9XG5cbiAgLy8gV29ya2Fyb3VuZCBmb3IgaHR0cHM6Ly9pc3N1ZXMuYXBhY2hlLm9yZy9qaXJhL2Jyb3dzZS9DT1VDSERCLTU3N1xuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2phbmwvbXVzdGFjaGUuanMvaXNzdWVzLzE4OVxuICB2YXIgcmVnRXhwVGVzdCA9IFJlZ0V4cC5wcm90b3R5cGUudGVzdDtcblxuICBmdW5jdGlvbiB0ZXN0UmVnRXhwKHJlLCBzdHJpbmcpIHtcbiAgICByZXR1cm4gcmVnRXhwVGVzdC5jYWxsKHJlLCBzdHJpbmcpO1xuICB9XG5cbiAgdmFyIG5vblNwYWNlUmUgPSAvXFxTLztcblxuICBmdW5jdGlvbiBpc1doaXRlc3BhY2Uoc3RyaW5nKSB7XG4gICAgcmV0dXJuICF0ZXN0UmVnRXhwKG5vblNwYWNlUmUsIHN0cmluZyk7XG4gIH1cblxuICB2YXIgZW50aXR5TWFwID0ge1xuICAgICcmJzogJyZhbXA7JywgJzwnOiAnJmx0OycsICc+JzogJyZndDsnLCAnXCInOiAnJnF1b3Q7JywgXCInXCI6ICcmIzM5OycsICcvJzogJyYjeDJGOydcbiAgfTtcblxuICBmdW5jdGlvbiBlc2NhcGVIdG1sKHN0cmluZykge1xuICAgIHJldHVybiBTdHJpbmcoc3RyaW5nKS5yZXBsYWNlKC9bJjw+XCInXFwvXS9nLCBmdW5jdGlvbiBmcm9tRW50aXR5TWFwKHMpIHtcbiAgICAgIHJldHVybiBlbnRpdHlNYXBbc107XG4gICAgfSk7XG4gIH1cblxuICB2YXIgd2hpdGVSZSA9IC9cXHMqLztcbiAgdmFyIHNwYWNlUmUgPSAvXFxzKy87XG4gIHZhciBlcXVhbHNSZSA9IC9cXHMqPS87XG4gIHZhciBjdXJseVJlID0gL1xccypcXH0vO1xuICB2YXIgdGFnUmUgPSAvI3xcXF58XFwvfD58XFx7fCZ8PXwhLztcblxuICAvKipcbiAgICogQnJlYWtzIHVwIHRoZSBnaXZlbiBgdGVtcGxhdGVgIHN0cmluZyBpbnRvIGEgdHJlZSBvZiB0b2tlbnMuIElmIHRoZSBgdGFnc2BcbiAgICogYXJndW1lbnQgaXMgZ2l2ZW4gaGVyZSBpdCBtdXN0IGJlIGFuIGFycmF5IHdpdGggdHdvIHN0cmluZyB2YWx1ZXM6IHRoZVxuICAgKiBvcGVuaW5nIGFuZCBjbG9zaW5nIHRhZ3MgdXNlZCBpbiB0aGUgdGVtcGxhdGUgKGUuZy4gWyBcIjwlXCIsIFwiJT5cIiBdKS4gT2ZcbiAgICogY291cnNlLCB0aGUgZGVmYXVsdCBpcyB0byB1c2UgbXVzdGFjaGVzIChpLmUuIG11c3RhY2hlLnRhZ3MpLlxuICAgKlxuICAgKiBBIHRva2VuIGlzIGFuIGFycmF5IHdpdGggYXQgbGVhc3QgNCBlbGVtZW50cy4gVGhlIGZpcnN0IGVsZW1lbnQgaXMgdGhlXG4gICAqIG11c3RhY2hlIHN5bWJvbCB0aGF0IHdhcyB1c2VkIGluc2lkZSB0aGUgdGFnLCBlLmcuIFwiI1wiIG9yIFwiJlwiLiBJZiB0aGUgdGFnXG4gICAqIGRpZCBub3QgY29udGFpbiBhIHN5bWJvbCAoaS5lLiB7e215VmFsdWV9fSkgdGhpcyBlbGVtZW50IGlzIFwibmFtZVwiLiBGb3JcbiAgICogYWxsIHRleHQgdGhhdCBhcHBlYXJzIG91dHNpZGUgYSBzeW1ib2wgdGhpcyBlbGVtZW50IGlzIFwidGV4dFwiLlxuICAgKlxuICAgKiBUaGUgc2Vjb25kIGVsZW1lbnQgb2YgYSB0b2tlbiBpcyBpdHMgXCJ2YWx1ZVwiLiBGb3IgbXVzdGFjaGUgdGFncyB0aGlzIGlzXG4gICAqIHdoYXRldmVyIGVsc2Ugd2FzIGluc2lkZSB0aGUgdGFnIGJlc2lkZXMgdGhlIG9wZW5pbmcgc3ltYm9sLiBGb3IgdGV4dCB0b2tlbnNcbiAgICogdGhpcyBpcyB0aGUgdGV4dCBpdHNlbGYuXG4gICAqXG4gICAqIFRoZSB0aGlyZCBhbmQgZm91cnRoIGVsZW1lbnRzIG9mIHRoZSB0b2tlbiBhcmUgdGhlIHN0YXJ0IGFuZCBlbmQgaW5kaWNlcyxcbiAgICogcmVzcGVjdGl2ZWx5LCBvZiB0aGUgdG9rZW4gaW4gdGhlIG9yaWdpbmFsIHRlbXBsYXRlLlxuICAgKlxuICAgKiBUb2tlbnMgdGhhdCBhcmUgdGhlIHJvb3Qgbm9kZSBvZiBhIHN1YnRyZWUgY29udGFpbiB0d28gbW9yZSBlbGVtZW50czogMSkgYW5cbiAgICogYXJyYXkgb2YgdG9rZW5zIGluIHRoZSBzdWJ0cmVlIGFuZCAyKSB0aGUgaW5kZXggaW4gdGhlIG9yaWdpbmFsIHRlbXBsYXRlIGF0XG4gICAqIHdoaWNoIHRoZSBjbG9zaW5nIHRhZyBmb3IgdGhhdCBzZWN0aW9uIGJlZ2lucy5cbiAgICovXG4gIGZ1bmN0aW9uIHBhcnNlVGVtcGxhdGUodGVtcGxhdGUsIHRhZ3MpIHtcbiAgICBpZiAoIXRlbXBsYXRlKVxuICAgICAgcmV0dXJuIFtdO1xuXG4gICAgdmFyIHNlY3Rpb25zID0gW107ICAgICAvLyBTdGFjayB0byBob2xkIHNlY3Rpb24gdG9rZW5zXG4gICAgdmFyIHRva2VucyA9IFtdOyAgICAgICAvLyBCdWZmZXIgdG8gaG9sZCB0aGUgdG9rZW5zXG4gICAgdmFyIHNwYWNlcyA9IFtdOyAgICAgICAvLyBJbmRpY2VzIG9mIHdoaXRlc3BhY2UgdG9rZW5zIG9uIHRoZSBjdXJyZW50IGxpbmVcbiAgICB2YXIgaGFzVGFnID0gZmFsc2U7ICAgIC8vIElzIHRoZXJlIGEge3t0YWd9fSBvbiB0aGUgY3VycmVudCBsaW5lP1xuICAgIHZhciBub25TcGFjZSA9IGZhbHNlOyAgLy8gSXMgdGhlcmUgYSBub24tc3BhY2UgY2hhciBvbiB0aGUgY3VycmVudCBsaW5lP1xuXG4gICAgLy8gU3RyaXBzIGFsbCB3aGl0ZXNwYWNlIHRva2VucyBhcnJheSBmb3IgdGhlIGN1cnJlbnQgbGluZVxuICAgIC8vIGlmIHRoZXJlIHdhcyBhIHt7I3RhZ319IG9uIGl0IGFuZCBvdGhlcndpc2Ugb25seSBzcGFjZS5cbiAgICBmdW5jdGlvbiBzdHJpcFNwYWNlKCkge1xuICAgICAgaWYgKGhhc1RhZyAmJiAhbm9uU3BhY2UpIHtcbiAgICAgICAgd2hpbGUgKHNwYWNlcy5sZW5ndGgpXG4gICAgICAgICAgZGVsZXRlIHRva2Vuc1tzcGFjZXMucG9wKCldO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHNwYWNlcyA9IFtdO1xuICAgICAgfVxuXG4gICAgICBoYXNUYWcgPSBmYWxzZTtcbiAgICAgIG5vblNwYWNlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIG9wZW5pbmdUYWdSZSwgY2xvc2luZ1RhZ1JlLCBjbG9zaW5nQ3VybHlSZTtcblxuICAgIGZ1bmN0aW9uIGNvbXBpbGVUYWdzKHRhZ3NUb0NvbXBpbGUpIHtcbiAgICAgIGlmICh0eXBlb2YgdGFnc1RvQ29tcGlsZSA9PT0gJ3N0cmluZycpXG4gICAgICAgIHRhZ3NUb0NvbXBpbGUgPSB0YWdzVG9Db21waWxlLnNwbGl0KHNwYWNlUmUsIDIpO1xuXG4gICAgICBpZiAoIWlzQXJyYXkodGFnc1RvQ29tcGlsZSkgfHwgdGFnc1RvQ29tcGlsZS5sZW5ndGggIT09IDIpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCB0YWdzOiAnICsgdGFnc1RvQ29tcGlsZSk7XG5cbiAgICAgIG9wZW5pbmdUYWdSZSA9IG5ldyBSZWdFeHAoZXNjYXBlUmVnRXhwKHRhZ3NUb0NvbXBpbGVbMF0pICsgJ1xcXFxzKicpO1xuICAgICAgY2xvc2luZ1RhZ1JlID0gbmV3IFJlZ0V4cCgnXFxcXHMqJyArIGVzY2FwZVJlZ0V4cCh0YWdzVG9Db21waWxlWzFdKSk7XG4gICAgICBjbG9zaW5nQ3VybHlSZSA9IG5ldyBSZWdFeHAoJ1xcXFxzKicgKyBlc2NhcGVSZWdFeHAoJ30nICsgdGFnc1RvQ29tcGlsZVsxXSkpO1xuICAgIH1cblxuICAgIGNvbXBpbGVUYWdzKHRhZ3MgfHwgbXVzdGFjaGUudGFncyk7XG5cbiAgICB2YXIgc2Nhbm5lciA9IG5ldyBTY2FubmVyKHRlbXBsYXRlKTtcblxuICAgIHZhciBzdGFydCwgdHlwZSwgdmFsdWUsIGNociwgdG9rZW4sIG9wZW5TZWN0aW9uO1xuICAgIHdoaWxlICghc2Nhbm5lci5lb3MoKSkge1xuICAgICAgc3RhcnQgPSBzY2FubmVyLnBvcztcblxuICAgICAgLy8gTWF0Y2ggYW55IHRleHQgYmV0d2VlbiB0YWdzLlxuICAgICAgdmFsdWUgPSBzY2FubmVyLnNjYW5VbnRpbChvcGVuaW5nVGFnUmUpO1xuXG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHZhbHVlTGVuZ3RoID0gdmFsdWUubGVuZ3RoOyBpIDwgdmFsdWVMZW5ndGg7ICsraSkge1xuICAgICAgICAgIGNociA9IHZhbHVlLmNoYXJBdChpKTtcblxuICAgICAgICAgIGlmIChpc1doaXRlc3BhY2UoY2hyKSkge1xuICAgICAgICAgICAgc3BhY2VzLnB1c2godG9rZW5zLmxlbmd0aCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbm9uU3BhY2UgPSB0cnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRva2Vucy5wdXNoKFsndGV4dCcsIGNociwgc3RhcnQsIHN0YXJ0ICsgMV0pO1xuICAgICAgICAgIHN0YXJ0ICs9IDE7XG5cbiAgICAgICAgICAvLyBDaGVjayBmb3Igd2hpdGVzcGFjZSBvbiB0aGUgY3VycmVudCBsaW5lLlxuICAgICAgICAgIGlmIChjaHIgPT09ICdcXG4nKVxuICAgICAgICAgICAgc3RyaXBTcGFjZSgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIE1hdGNoIHRoZSBvcGVuaW5nIHRhZy5cbiAgICAgIGlmICghc2Nhbm5lci5zY2FuKG9wZW5pbmdUYWdSZSkpXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBoYXNUYWcgPSB0cnVlO1xuXG4gICAgICAvLyBHZXQgdGhlIHRhZyB0eXBlLlxuICAgICAgdHlwZSA9IHNjYW5uZXIuc2Nhbih0YWdSZSkgfHwgJ25hbWUnO1xuICAgICAgc2Nhbm5lci5zY2FuKHdoaXRlUmUpO1xuXG4gICAgICAvLyBHZXQgdGhlIHRhZyB2YWx1ZS5cbiAgICAgIGlmICh0eXBlID09PSAnPScpIHtcbiAgICAgICAgdmFsdWUgPSBzY2FubmVyLnNjYW5VbnRpbChlcXVhbHNSZSk7XG4gICAgICAgIHNjYW5uZXIuc2NhbihlcXVhbHNSZSk7XG4gICAgICAgIHNjYW5uZXIuc2NhblVudGlsKGNsb3NpbmdUYWdSZSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0eXBlID09PSAneycpIHtcbiAgICAgICAgdmFsdWUgPSBzY2FubmVyLnNjYW5VbnRpbChjbG9zaW5nQ3VybHlSZSk7XG4gICAgICAgIHNjYW5uZXIuc2NhbihjdXJseVJlKTtcbiAgICAgICAgc2Nhbm5lci5zY2FuVW50aWwoY2xvc2luZ1RhZ1JlKTtcbiAgICAgICAgdHlwZSA9ICcmJztcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IHNjYW5uZXIuc2NhblVudGlsKGNsb3NpbmdUYWdSZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIE1hdGNoIHRoZSBjbG9zaW5nIHRhZy5cbiAgICAgIGlmICghc2Nhbm5lci5zY2FuKGNsb3NpbmdUYWdSZSkpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5jbG9zZWQgdGFnIGF0ICcgKyBzY2FubmVyLnBvcyk7XG5cbiAgICAgIHRva2VuID0gW3R5cGUsIHZhbHVlLCBzdGFydCwgc2Nhbm5lci5wb3NdO1xuICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuXG4gICAgICBpZiAodHlwZSA9PT0gJyMnIHx8IHR5cGUgPT09ICdeJykge1xuICAgICAgICBzZWN0aW9ucy5wdXNoKHRva2VuKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICcvJykge1xuICAgICAgICAvLyBDaGVjayBzZWN0aW9uIG5lc3RpbmcuXG4gICAgICAgIG9wZW5TZWN0aW9uID0gc2VjdGlvbnMucG9wKCk7XG5cbiAgICAgICAgaWYgKCFvcGVuU2VjdGlvbilcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vub3BlbmVkIHNlY3Rpb24gXCInICsgdmFsdWUgKyAnXCIgYXQgJyArIHN0YXJ0KTtcblxuICAgICAgICBpZiAob3BlblNlY3Rpb25bMV0gIT09IHZhbHVlKVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5jbG9zZWQgc2VjdGlvbiBcIicgKyBvcGVuU2VjdGlvblsxXSArICdcIiBhdCAnICsgc3RhcnQpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJ25hbWUnIHx8IHR5cGUgPT09ICd7JyB8fCB0eXBlID09PSAnJicpIHtcbiAgICAgICAgbm9uU3BhY2UgPSB0cnVlO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJz0nKSB7XG4gICAgICAgIC8vIFNldCB0aGUgdGFncyBmb3IgdGhlIG5leHQgdGltZSBhcm91bmQuXG4gICAgICAgIGNvbXBpbGVUYWdzKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhlcmUgYXJlIG5vIG9wZW4gc2VjdGlvbnMgd2hlbiB3ZSdyZSBkb25lLlxuICAgIG9wZW5TZWN0aW9uID0gc2VjdGlvbnMucG9wKCk7XG5cbiAgICBpZiAob3BlblNlY3Rpb24pXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuY2xvc2VkIHNlY3Rpb24gXCInICsgb3BlblNlY3Rpb25bMV0gKyAnXCIgYXQgJyArIHNjYW5uZXIucG9zKTtcblxuICAgIHJldHVybiBuZXN0VG9rZW5zKHNxdWFzaFRva2Vucyh0b2tlbnMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21iaW5lcyB0aGUgdmFsdWVzIG9mIGNvbnNlY3V0aXZlIHRleHQgdG9rZW5zIGluIHRoZSBnaXZlbiBgdG9rZW5zYCBhcnJheVxuICAgKiB0byBhIHNpbmdsZSB0b2tlbi5cbiAgICovXG4gIGZ1bmN0aW9uIHNxdWFzaFRva2Vucyh0b2tlbnMpIHtcbiAgICB2YXIgc3F1YXNoZWRUb2tlbnMgPSBbXTtcblxuICAgIHZhciB0b2tlbiwgbGFzdFRva2VuO1xuICAgIGZvciAodmFyIGkgPSAwLCBudW1Ub2tlbnMgPSB0b2tlbnMubGVuZ3RoOyBpIDwgbnVtVG9rZW5zOyArK2kpIHtcbiAgICAgIHRva2VuID0gdG9rZW5zW2ldO1xuXG4gICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgaWYgKHRva2VuWzBdID09PSAndGV4dCcgJiYgbGFzdFRva2VuICYmIGxhc3RUb2tlblswXSA9PT0gJ3RleHQnKSB7XG4gICAgICAgICAgbGFzdFRva2VuWzFdICs9IHRva2VuWzFdO1xuICAgICAgICAgIGxhc3RUb2tlblszXSA9IHRva2VuWzNdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHNxdWFzaGVkVG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICAgIGxhc3RUb2tlbiA9IHRva2VuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNxdWFzaGVkVG9rZW5zO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvcm1zIHRoZSBnaXZlbiBhcnJheSBvZiBgdG9rZW5zYCBpbnRvIGEgbmVzdGVkIHRyZWUgc3RydWN0dXJlIHdoZXJlXG4gICAqIHRva2VucyB0aGF0IHJlcHJlc2VudCBhIHNlY3Rpb24gaGF2ZSB0d28gYWRkaXRpb25hbCBpdGVtczogMSkgYW4gYXJyYXkgb2ZcbiAgICogYWxsIHRva2VucyB0aGF0IGFwcGVhciBpbiB0aGF0IHNlY3Rpb24gYW5kIDIpIHRoZSBpbmRleCBpbiB0aGUgb3JpZ2luYWxcbiAgICogdGVtcGxhdGUgdGhhdCByZXByZXNlbnRzIHRoZSBlbmQgb2YgdGhhdCBzZWN0aW9uLlxuICAgKi9cbiAgZnVuY3Rpb24gbmVzdFRva2Vucyh0b2tlbnMpIHtcbiAgICB2YXIgbmVzdGVkVG9rZW5zID0gW107XG4gICAgdmFyIGNvbGxlY3RvciA9IG5lc3RlZFRva2VucztcbiAgICB2YXIgc2VjdGlvbnMgPSBbXTtcblxuICAgIHZhciB0b2tlbiwgc2VjdGlvbjtcbiAgICBmb3IgKHZhciBpID0gMCwgbnVtVG9rZW5zID0gdG9rZW5zLmxlbmd0aDsgaSA8IG51bVRva2VuczsgKytpKSB7XG4gICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcblxuICAgICAgc3dpdGNoICh0b2tlblswXSkge1xuICAgICAgICBjYXNlICcjJzpcbiAgICAgICAgY2FzZSAnXic6XG4gICAgICAgICAgY29sbGVjdG9yLnB1c2godG9rZW4pO1xuICAgICAgICAgIHNlY3Rpb25zLnB1c2godG9rZW4pO1xuICAgICAgICAgIGNvbGxlY3RvciA9IHRva2VuWzRdID0gW107XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJy8nOlxuICAgICAgICAgIHNlY3Rpb24gPSBzZWN0aW9ucy5wb3AoKTtcbiAgICAgICAgICBzZWN0aW9uWzVdID0gdG9rZW5bMl07XG4gICAgICAgICAgY29sbGVjdG9yID0gc2VjdGlvbnMubGVuZ3RoID4gMCA/IHNlY3Rpb25zW3NlY3Rpb25zLmxlbmd0aCAtIDFdWzRdIDogbmVzdGVkVG9rZW5zO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGNvbGxlY3Rvci5wdXNoKHRva2VuKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmVzdGVkVG9rZW5zO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgc2ltcGxlIHN0cmluZyBzY2FubmVyIHRoYXQgaXMgdXNlZCBieSB0aGUgdGVtcGxhdGUgcGFyc2VyIHRvIGZpbmRcbiAgICogdG9rZW5zIGluIHRlbXBsYXRlIHN0cmluZ3MuXG4gICAqL1xuICBmdW5jdGlvbiBTY2FubmVyKHN0cmluZykge1xuICAgIHRoaXMuc3RyaW5nID0gc3RyaW5nO1xuICAgIHRoaXMudGFpbCA9IHN0cmluZztcbiAgICB0aGlzLnBvcyA9IDA7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHRhaWwgaXMgZW1wdHkgKGVuZCBvZiBzdHJpbmcpLlxuICAgKi9cbiAgU2Nhbm5lci5wcm90b3R5cGUuZW9zID0gZnVuY3Rpb24gZW9zKCkge1xuICAgIHJldHVybiB0aGlzLnRhaWwgPT09ICcnO1xuICB9O1xuXG4gIC8qKlxuICAgKiBUcmllcyB0byBtYXRjaCB0aGUgZ2l2ZW4gcmVndWxhciBleHByZXNzaW9uIGF0IHRoZSBjdXJyZW50IHBvc2l0aW9uLlxuICAgKiBSZXR1cm5zIHRoZSBtYXRjaGVkIHRleHQgaWYgaXQgY2FuIG1hdGNoLCB0aGUgZW1wdHkgc3RyaW5nIG90aGVyd2lzZS5cbiAgICovXG4gIFNjYW5uZXIucHJvdG90eXBlLnNjYW4gPSBmdW5jdGlvbiBzY2FuKHJlKSB7XG4gICAgdmFyIG1hdGNoID0gdGhpcy50YWlsLm1hdGNoKHJlKTtcblxuICAgIGlmICghbWF0Y2ggfHwgbWF0Y2guaW5kZXggIT09IDApXG4gICAgICByZXR1cm4gJyc7XG5cbiAgICB2YXIgc3RyaW5nID0gbWF0Y2hbMF07XG5cbiAgICB0aGlzLnRhaWwgPSB0aGlzLnRhaWwuc3Vic3RyaW5nKHN0cmluZy5sZW5ndGgpO1xuICAgIHRoaXMucG9zICs9IHN0cmluZy5sZW5ndGg7XG5cbiAgICByZXR1cm4gc3RyaW5nO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTa2lwcyBhbGwgdGV4dCB1bnRpbCB0aGUgZ2l2ZW4gcmVndWxhciBleHByZXNzaW9uIGNhbiBiZSBtYXRjaGVkLiBSZXR1cm5zXG4gICAqIHRoZSBza2lwcGVkIHN0cmluZywgd2hpY2ggaXMgdGhlIGVudGlyZSB0YWlsIGlmIG5vIG1hdGNoIGNhbiBiZSBtYWRlLlxuICAgKi9cbiAgU2Nhbm5lci5wcm90b3R5cGUuc2NhblVudGlsID0gZnVuY3Rpb24gc2NhblVudGlsKHJlKSB7XG4gICAgdmFyIGluZGV4ID0gdGhpcy50YWlsLnNlYXJjaChyZSksIG1hdGNoO1xuXG4gICAgc3dpdGNoIChpbmRleCkge1xuICAgICAgY2FzZSAtMTpcbiAgICAgICAgbWF0Y2ggPSB0aGlzLnRhaWw7XG4gICAgICAgIHRoaXMudGFpbCA9ICcnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgbWF0Y2ggPSAnJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBtYXRjaCA9IHRoaXMudGFpbC5zdWJzdHJpbmcoMCwgaW5kZXgpO1xuICAgICAgICB0aGlzLnRhaWwgPSB0aGlzLnRhaWwuc3Vic3RyaW5nKGluZGV4KTtcbiAgICB9XG5cbiAgICB0aGlzLnBvcyArPSBtYXRjaC5sZW5ndGg7XG5cbiAgICByZXR1cm4gbWF0Y2g7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudHMgYSByZW5kZXJpbmcgY29udGV4dCBieSB3cmFwcGluZyBhIHZpZXcgb2JqZWN0IGFuZFxuICAgKiBtYWludGFpbmluZyBhIHJlZmVyZW5jZSB0byB0aGUgcGFyZW50IGNvbnRleHQuXG4gICAqL1xuICBmdW5jdGlvbiBDb250ZXh0KHZpZXcsIHBhcmVudENvbnRleHQpIHtcbiAgICB0aGlzLnZpZXcgPSB2aWV3O1xuICAgIHRoaXMuY2FjaGUgPSB7XG4gICAgICAnLic6IHRoaXMudmlldyxcbiAgICAgICdAZWFjaCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJldHVybnMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgayBpbiB0aGlzKSB7XG4gICAgICAgICAgcmV0dXJucy5wdXNoKHsnQGtleSc6IGssICdAdmFsdWUnOiB0aGlzW2tdfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldHVybnM7XG4gICAgICB9XG4gICAgfTtcbiAgICB0aGlzLnBhcmVudCA9IHBhcmVudENvbnRleHQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBjb250ZXh0IHVzaW5nIHRoZSBnaXZlbiB2aWV3IHdpdGggdGhpcyBjb250ZXh0XG4gICAqIGFzIHRoZSBwYXJlbnQuXG4gICAqL1xuICBDb250ZXh0LnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gcHVzaCh2aWV3KSB7XG4gICAgcmV0dXJuIG5ldyBDb250ZXh0KHZpZXcsIHRoaXMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gbmFtZSBpbiB0aGlzIGNvbnRleHQsIHRyYXZlcnNpbmdcbiAgICogdXAgdGhlIGNvbnRleHQgaGllcmFyY2h5IGlmIHRoZSB2YWx1ZSBpcyBhYnNlbnQgaW4gdGhpcyBjb250ZXh0J3Mgdmlldy5cbiAgICovXG4gIENvbnRleHQucHJvdG90eXBlLmxvb2t1cCA9IGZ1bmN0aW9uIGxvb2t1cChuYW1lKSB7XG4gICAgdmFyIGNhY2hlID0gdGhpcy5jYWNoZTtcblxuICAgIHZhciB2YWx1ZTtcbiAgICBpZiAoY2FjaGUuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgIHZhbHVlID0gY2FjaGVbbmFtZV07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLCBuYW1lcywgaW5kZXgsIGxvb2t1cEhpdCA9IGZhbHNlO1xuXG4gICAgICB3aGlsZSAoY29udGV4dCkge1xuICAgICAgICBpZiAobmFtZS5pbmRleE9mKCcuJykgPiAwKSB7XG4gICAgICAgICAgdmFsdWUgPSBjb250ZXh0LnZpZXc7XG4gICAgICAgICAgbmFtZXMgPSBuYW1lLnNwbGl0KCcuJyk7XG4gICAgICAgICAgaW5kZXggPSAwO1xuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogVXNpbmcgdGhlIGRvdCBub3Rpb24gcGF0aCBpbiBgbmFtZWAsIHdlIGRlc2NlbmQgdGhyb3VnaCB0aGVcbiAgICAgICAgICAgKiBuZXN0ZWQgb2JqZWN0cy5cbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIFRvIGJlIGNlcnRhaW4gdGhhdCB0aGUgbG9va3VwIGhhcyBiZWVuIHN1Y2Nlc3NmdWwsIHdlIGhhdmUgdG9cbiAgICAgICAgICAgKiBjaGVjayBpZiB0aGUgbGFzdCBvYmplY3QgaW4gdGhlIHBhdGggYWN0dWFsbHkgaGFzIHRoZSBwcm9wZXJ0eVxuICAgICAgICAgICAqIHdlIGFyZSBsb29raW5nIGZvci4gV2Ugc3RvcmUgdGhlIHJlc3VsdCBpbiBgbG9va3VwSGl0YC5cbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIFRoaXMgaXMgc3BlY2lhbGx5IG5lY2Vzc2FyeSBmb3Igd2hlbiB0aGUgdmFsdWUgaGFzIGJlZW4gc2V0IHRvXG4gICAgICAgICAgICogYHVuZGVmaW5lZGAgYW5kIHdlIHdhbnQgdG8gYXZvaWQgbG9va2luZyB1cCBwYXJlbnQgY29udGV4dHMuXG4gICAgICAgICAgICoqL1xuICAgICAgICAgIHdoaWxlICh2YWx1ZSAhPSBudWxsICYmIGluZGV4IDwgbmFtZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IG5hbWVzLmxlbmd0aCAtIDEpXG4gICAgICAgICAgICAgIGxvb2t1cEhpdCA9IGhhc1Byb3BlcnR5KHZhbHVlLCBuYW1lc1tpbmRleF0pO1xuXG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlW25hbWVzW2luZGV4KytdXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdmFsdWUgPSBjb250ZXh0LnZpZXdbbmFtZV07XG4gICAgICAgICAgbG9va3VwSGl0ID0gaGFzUHJvcGVydHkoY29udGV4dC52aWV3LCBuYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsb29rdXBIaXQpXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY29udGV4dCA9IGNvbnRleHQucGFyZW50O1xuICAgICAgfVxuXG4gICAgICBjYWNoZVtuYW1lXSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSlcbiAgICAgIHZhbHVlID0gdmFsdWUuY2FsbCh0aGlzLnZpZXcpO1xuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBIFdyaXRlciBrbm93cyBob3cgdG8gdGFrZSBhIHN0cmVhbSBvZiB0b2tlbnMgYW5kIHJlbmRlciB0aGVtIHRvIGFcbiAgICogc3RyaW5nLCBnaXZlbiBhIGNvbnRleHQuIEl0IGFsc28gbWFpbnRhaW5zIGEgY2FjaGUgb2YgdGVtcGxhdGVzIHRvXG4gICAqIGF2b2lkIHRoZSBuZWVkIHRvIHBhcnNlIHRoZSBzYW1lIHRlbXBsYXRlIHR3aWNlLlxuICAgKi9cbiAgZnVuY3Rpb24gV3JpdGVyKCkge1xuICAgIHRoaXMuY2FjaGUgPSB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgYWxsIGNhY2hlZCB0ZW1wbGF0ZXMgaW4gdGhpcyB3cml0ZXIuXG4gICAqL1xuICBXcml0ZXIucHJvdG90eXBlLmNsZWFyQ2FjaGUgPSBmdW5jdGlvbiBjbGVhckNhY2hlKCkge1xuICAgIHRoaXMuY2FjaGUgPSB7fTtcbiAgfTtcblxuICAvKipcbiAgICogUGFyc2VzIGFuZCBjYWNoZXMgdGhlIGdpdmVuIGB0ZW1wbGF0ZWAgYW5kIHJldHVybnMgdGhlIGFycmF5IG9mIHRva2Vuc1xuICAgKiB0aGF0IGlzIGdlbmVyYXRlZCBmcm9tIHRoZSBwYXJzZS5cbiAgICovXG4gIFdyaXRlci5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbiBwYXJzZSh0ZW1wbGF0ZSwgdGFncykge1xuICAgIHZhciBjYWNoZSA9IHRoaXMuY2FjaGU7XG4gICAgdmFyIHRva2VucyA9IGNhY2hlW3RlbXBsYXRlXTtcblxuICAgIGlmICh0b2tlbnMgPT0gbnVsbClcbiAgICAgIHRva2VucyA9IGNhY2hlW3RlbXBsYXRlXSA9IHBhcnNlVGVtcGxhdGUodGVtcGxhdGUsIHRhZ3MpO1xuXG4gICAgcmV0dXJuIHRva2VucztcbiAgfTtcblxuICAvKipcbiAgICogSGlnaC1sZXZlbCBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIHJlbmRlciB0aGUgZ2l2ZW4gYHRlbXBsYXRlYCB3aXRoXG4gICAqIHRoZSBnaXZlbiBgdmlld2AuXG4gICAqXG4gICAqIFRoZSBvcHRpb25hbCBgcGFydGlhbHNgIGFyZ3VtZW50IG1heSBiZSBhbiBvYmplY3QgdGhhdCBjb250YWlucyB0aGVcbiAgICogbmFtZXMgYW5kIHRlbXBsYXRlcyBvZiBwYXJ0aWFscyB0aGF0IGFyZSB1c2VkIGluIHRoZSB0ZW1wbGF0ZS4gSXQgbWF5XG4gICAqIGFsc28gYmUgYSBmdW5jdGlvbiB0aGF0IGlzIHVzZWQgdG8gbG9hZCBwYXJ0aWFsIHRlbXBsYXRlcyBvbiB0aGUgZmx5XG4gICAqIHRoYXQgdGFrZXMgYSBzaW5nbGUgYXJndW1lbnQ6IHRoZSBuYW1lIG9mIHRoZSBwYXJ0aWFsLlxuICAgKi9cbiAgV3JpdGVyLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIodGVtcGxhdGUsIHZpZXcsIHBhcnRpYWxzKSB7XG4gICAgdmFyIHRva2VucyA9IHRoaXMucGFyc2UodGVtcGxhdGUpO1xuICAgIHZhciBjb250ZXh0ID0gKHZpZXcgaW5zdGFuY2VvZiBDb250ZXh0KSA/IHZpZXcgOiBuZXcgQ29udGV4dCh2aWV3KTtcbiAgICByZXR1cm4gdGhpcy5yZW5kZXJUb2tlbnModG9rZW5zLCBjb250ZXh0LCBwYXJ0aWFscywgdGVtcGxhdGUpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBMb3ctbGV2ZWwgbWV0aG9kIHRoYXQgcmVuZGVycyB0aGUgZ2l2ZW4gYXJyYXkgb2YgYHRva2Vuc2AgdXNpbmdcbiAgICogdGhlIGdpdmVuIGBjb250ZXh0YCBhbmQgYHBhcnRpYWxzYC5cbiAgICpcbiAgICogTm90ZTogVGhlIGBvcmlnaW5hbFRlbXBsYXRlYCBpcyBvbmx5IGV2ZXIgdXNlZCB0byBleHRyYWN0IHRoZSBwb3J0aW9uXG4gICAqIG9mIHRoZSBvcmlnaW5hbCB0ZW1wbGF0ZSB0aGF0IHdhcyBjb250YWluZWQgaW4gYSBoaWdoZXItb3JkZXIgc2VjdGlvbi5cbiAgICogSWYgdGhlIHRlbXBsYXRlIGRvZXNuJ3QgdXNlIGhpZ2hlci1vcmRlciBzZWN0aW9ucywgdGhpcyBhcmd1bWVudCBtYXlcbiAgICogYmUgb21pdHRlZC5cbiAgICovXG4gIFdyaXRlci5wcm90b3R5cGUucmVuZGVyVG9rZW5zID0gZnVuY3Rpb24gcmVuZGVyVG9rZW5zKHRva2VucywgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpIHtcbiAgICB2YXIgYnVmZmVyID0gJyc7XG4gICAgdmFyIHRva2VuLCBzeW1ib2wsIHZhbHVlO1xuICAgIGZvciAodmFyIGkgPSAwLCBudW1Ub2tlbnMgPSB0b2tlbnMubGVuZ3RoOyBpIDwgbnVtVG9rZW5zOyArK2kpIHtcbiAgICAgIHZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgICBzeW1ib2wgPSB0b2tlblswXTtcblxuICAgICAgaWYgKHN5bWJvbCA9PT0gJyMnKSB2YWx1ZSA9IHRoaXMucmVuZGVyU2VjdGlvbih0b2tlbiwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xuICAgICAgZWxzZSBpZiAoc3ltYm9sID09PSAnXicpIHZhbHVlID0gdGhpcy5yZW5kZXJJbnZlcnRlZCh0b2tlbiwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xuICAgICAgZWxzZSBpZiAoc3ltYm9sID09PSAnPicpIHZhbHVlID0gdGhpcy5yZW5kZXJQYXJ0aWFsKHRva2VuLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XG4gICAgICBlbHNlIGlmIChzeW1ib2wgPT09ICcmJykgdmFsdWUgPSB0aGlzLnVuZXNjYXBlZFZhbHVlKHRva2VuLCBjb250ZXh0KTtcbiAgICAgIGVsc2UgaWYgKHN5bWJvbCA9PT0gJ25hbWUnKSB2YWx1ZSA9IHRoaXMuZXNjYXBlZFZhbHVlKHRva2VuLCBjb250ZXh0KTtcbiAgICAgIGVsc2UgaWYgKHN5bWJvbCA9PT0gJ3RleHQnKSB2YWx1ZSA9IHRoaXMucmF3VmFsdWUodG9rZW4pO1xuXG4gICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgYnVmZmVyICs9IHZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiBidWZmZXI7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5yZW5kZXJTZWN0aW9uID0gZnVuY3Rpb24gcmVuZGVyU2VjdGlvbih0b2tlbiwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGJ1ZmZlciA9ICcnO1xuXG4gICAgdmFyIHZhbHVlID0gY29udGV4dC5sb29rdXAodG9rZW5bMV0pO1xuXG4gICAgLy8gVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIHJlbmRlciBhbiBhcmJpdHJhcnkgdGVtcGxhdGVcbiAgICAvLyBpbiB0aGUgY3VycmVudCBjb250ZXh0IGJ5IGhpZ2hlci1vcmRlciBzZWN0aW9ucy5cbiAgICBmdW5jdGlvbiBzdWJSZW5kZXIodGVtcGxhdGUpIHtcbiAgICAgIHJldHVybiBzZWxmLnJlbmRlcih0ZW1wbGF0ZSwgY29udGV4dCwgcGFydGlhbHMpO1xuICAgIH1cblxuICAgIGlmICghdmFsdWUpIHJldHVybjtcblxuICAgIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgZm9yICh2YXIgaiA9IDAsIHZhbHVlTGVuZ3RoID0gdmFsdWUubGVuZ3RoOyBqIDwgdmFsdWVMZW5ndGg7ICsraikge1xuICAgICAgICBpZiAodmFsdWVbal0pIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlW2pdID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdmFsdWVbal1bJ0BpJ10gPSBqO1xuICAgICAgICAgICAgdmFsdWVbal1bJ0BmaXJzdCddID0gKGogPT09IDApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJ1ZmZlciArPSB0aGlzLnJlbmRlclRva2Vucyh0b2tlbls0XSwgY29udGV4dC5wdXNoKHZhbHVlW2pdKSwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICBidWZmZXIgKz0gdGhpcy5yZW5kZXJUb2tlbnModG9rZW5bNF0sIGNvbnRleHQucHVzaCh2YWx1ZSksIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICAgIGlmICh0eXBlb2Ygb3JpZ2luYWxUZW1wbGF0ZSAhPT0gJ3N0cmluZycpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHVzZSBoaWdoZXItb3JkZXIgc2VjdGlvbnMgd2l0aG91dCB0aGUgb3JpZ2luYWwgdGVtcGxhdGUnKTtcblxuICAgICAgLy8gRXh0cmFjdCB0aGUgcG9ydGlvbiBvZiB0aGUgb3JpZ2luYWwgdGVtcGxhdGUgdGhhdCB0aGUgc2VjdGlvbiBjb250YWlucy5cbiAgICAgIHZhbHVlID0gdmFsdWUuY2FsbChjb250ZXh0LnZpZXcsIG9yaWdpbmFsVGVtcGxhdGUuc2xpY2UodG9rZW5bM10sIHRva2VuWzVdKSwgc3ViUmVuZGVyKTtcblxuICAgICAgaWYgKHZhbHVlICE9IG51bGwpXG4gICAgICAgIGJ1ZmZlciArPSB2YWx1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBidWZmZXIgKz0gdGhpcy5yZW5kZXJUb2tlbnModG9rZW5bNF0sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgICB9XG4gICAgcmV0dXJuIGJ1ZmZlcjtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLnJlbmRlckludmVydGVkID0gZnVuY3Rpb24gcmVuZGVySW52ZXJ0ZWQodG9rZW4sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKSB7XG4gICAgdmFyIHZhbHVlID0gY29udGV4dC5sb29rdXAodG9rZW5bMV0pO1xuXG4gICAgLy8gVXNlIEphdmFTY3JpcHQncyBkZWZpbml0aW9uIG9mIGZhbHN5LiBJbmNsdWRlIGVtcHR5IGFycmF5cy5cbiAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2phbmwvbXVzdGFjaGUuanMvaXNzdWVzLzE4NlxuICAgIGlmICghdmFsdWUgfHwgKGlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmxlbmd0aCA9PT0gMCkpXG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJUb2tlbnModG9rZW5bNF0sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLnJlbmRlclBhcnRpYWwgPSBmdW5jdGlvbiByZW5kZXJQYXJ0aWFsKHRva2VuLCBjb250ZXh0LCBwYXJ0aWFscykge1xuICAgIGlmICghcGFydGlhbHMpIHJldHVybjtcblxuICAgIHZhciB2YWx1ZSA9IGlzRnVuY3Rpb24ocGFydGlhbHMpID8gcGFydGlhbHModG9rZW5bMV0pIDogcGFydGlhbHNbdG9rZW5bMV1dO1xuICAgIGlmICh2YWx1ZSAhPSBudWxsKVxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyVG9rZW5zKHRoaXMucGFyc2UodmFsdWUpLCBjb250ZXh0LCBwYXJ0aWFscywgdmFsdWUpO1xuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUudW5lc2NhcGVkVmFsdWUgPSBmdW5jdGlvbiB1bmVzY2FwZWRWYWx1ZSh0b2tlbiwgY29udGV4dCkge1xuICAgIHZhciB2YWx1ZSA9IGNvbnRleHQubG9va3VwKHRva2VuWzFdKTtcbiAgICBpZiAodmFsdWUgIT0gbnVsbClcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLmVzY2FwZWRWYWx1ZSA9IGZ1bmN0aW9uIGVzY2FwZWRWYWx1ZSh0b2tlbiwgY29udGV4dCkge1xuICAgIHZhciB2YWx1ZSA9IGNvbnRleHQubG9va3VwKHRva2VuWzFdKTtcbiAgICBpZiAodmFsdWUgIT0gbnVsbClcbiAgICAgIHJldHVybiBtdXN0YWNoZS5lc2NhcGUodmFsdWUpO1xuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUucmF3VmFsdWUgPSBmdW5jdGlvbiByYXdWYWx1ZSh0b2tlbikge1xuICAgIHJldHVybiB0b2tlblsxXTtcbiAgfTtcblxuICBtdXN0YWNoZS5uYW1lID0gJ211c3RhY2hlLmpzJztcbiAgbXVzdGFjaGUudmVyc2lvbiA9ICcyLjEuMyc7XG4gIG11c3RhY2hlLnRhZ3MgPSBbJ3t7JywgJ319J107XG5cbiAgLy8gQWxsIGhpZ2gtbGV2ZWwgbXVzdGFjaGUuKiBmdW5jdGlvbnMgdXNlIHRoaXMgd3JpdGVyLlxuICB2YXIgZGVmYXVsdFdyaXRlciA9IG5ldyBXcml0ZXIoKTtcblxuICAvKipcbiAgICogQ2xlYXJzIGFsbCBjYWNoZWQgdGVtcGxhdGVzIGluIHRoZSBkZWZhdWx0IHdyaXRlci5cbiAgICovXG4gIG11c3RhY2hlLmNsZWFyQ2FjaGUgPSBmdW5jdGlvbiBjbGVhckNhY2hlKCkge1xuICAgIHJldHVybiBkZWZhdWx0V3JpdGVyLmNsZWFyQ2FjaGUoKTtcbiAgfTtcblxuICAvKipcbiAgICogUGFyc2VzIGFuZCBjYWNoZXMgdGhlIGdpdmVuIHRlbXBsYXRlIGluIHRoZSBkZWZhdWx0IHdyaXRlciBhbmQgcmV0dXJucyB0aGVcbiAgICogYXJyYXkgb2YgdG9rZW5zIGl0IGNvbnRhaW5zLiBEb2luZyB0aGlzIGFoZWFkIG9mIHRpbWUgYXZvaWRzIHRoZSBuZWVkIHRvXG4gICAqIHBhcnNlIHRlbXBsYXRlcyBvbiB0aGUgZmx5IGFzIHRoZXkgYXJlIHJlbmRlcmVkLlxuICAgKi9cbiAgbXVzdGFjaGUucGFyc2UgPSBmdW5jdGlvbiBwYXJzZSh0ZW1wbGF0ZSwgdGFncykge1xuICAgIHJldHVybiBkZWZhdWx0V3JpdGVyLnBhcnNlKHRlbXBsYXRlLCB0YWdzKTtcbiAgfTtcblxuICAvKipcbiAgICogUmVuZGVycyB0aGUgYHRlbXBsYXRlYCB3aXRoIHRoZSBnaXZlbiBgdmlld2AgYW5kIGBwYXJ0aWFsc2AgdXNpbmcgdGhlXG4gICAqIGRlZmF1bHQgd3JpdGVyLlxuICAgKi9cbiAgbXVzdGFjaGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscykge1xuICAgIGlmICh0eXBlb2YgdGVtcGxhdGUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIHRlbXBsYXRlISBUZW1wbGF0ZSBzaG91bGQgYmUgYSBcInN0cmluZ1wiICcgKyAnYnV0IFwiJyArIHR5cGVTdHIodGVtcGxhdGUpICsgJ1wiIHdhcyBnaXZlbiBhcyB0aGUgZmlyc3QgJyArICdhcmd1bWVudCBmb3IgbXVzdGFjaGUjcmVuZGVyKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscyknKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVmYXVsdFdyaXRlci5yZW5kZXIodGVtcGxhdGUsIHZpZXcsIHBhcnRpYWxzKTtcbiAgfTtcblxuICAvLyBUaGlzIGlzIGhlcmUgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5IHdpdGggMC40LnguLFxuICAvKmVzbGludC1kaXNhYmxlICovIC8vIGVzbGludCB3YW50cyBjYW1lbCBjYXNlZCBmdW5jdGlvbiBuYW1lXG4gIG11c3RhY2hlLnRvX2h0bWwgPSBmdW5jdGlvbiB0b19odG1sKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscywgc2VuZCkge1xuICAgIC8qZXNsaW50LWVuYWJsZSovXG5cbiAgICB2YXIgcmVzdWx0ID0gbXVzdGFjaGUucmVuZGVyKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscyk7XG5cbiAgICBpZiAoaXNGdW5jdGlvbihzZW5kKSkge1xuICAgICAgc2VuZChyZXN1bHQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9O1xuXG4gIC8vIEV4cG9ydCB0aGUgZXNjYXBpbmcgZnVuY3Rpb24gc28gdGhhdCB0aGUgdXNlciBtYXkgb3ZlcnJpZGUgaXQuXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vamFubC9tdXN0YWNoZS5qcy9pc3N1ZXMvMjQ0XG4gIG11c3RhY2hlLmVzY2FwZSA9IGVzY2FwZUh0bWw7XG5cbiAgLy8gRXhwb3J0IHRoZXNlIG1haW5seSBmb3IgdGVzdGluZywgYnV0IGFsc28gZm9yIGFkdmFuY2VkIHVzYWdlLlxuICBtdXN0YWNoZS5TY2FubmVyID0gU2Nhbm5lcjtcbiAgbXVzdGFjaGUuQ29udGV4dCA9IENvbnRleHQ7XG4gIG11c3RhY2hlLldyaXRlciA9IFdyaXRlcjtcblxufSkpO1xuXG5leHBvcnQgZGVmYXVsdCBBWDYubXVzdGFjaGU7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL3NyYy9BWDZNdXN0YWNoZS5qcyIsImltcG9ydCBqUXVlcnkgZnJvbSBcImpxbWluXCI7XG5pbXBvcnQgQVg2VUlDb3JlIGZyb20gXCIuL0FYNlVJQ29yZS5qc1wiO1xuaW1wb3J0IFUgZnJvbSBcIi4vQVg2VXRpbC5qc1wiO1xuaW1wb3J0IGluZm8gZnJvbSBcIi4vQVg2SW5mby5qc1wiO1xuaW1wb3J0IG11c3RhY2hlIGZyb20gXCIuL0FYNk11c3RhY2hlLmpzXCI7XG5cbi8qIH5+fn5+fn5+fn5+fn5+fn5+fiBlbmQgb2YgaW1wb3J0ICB+fn5+fn5+fn5+fn5+fn5+fn5+fiAqL1xuXG5jb25zdCBkaWFsb2dUbXBsID0gZnVuY3Rpb24gKGNvbHVtbktleXMpIHtcbiAgcmV0dXJuIGAgXG48ZGl2IGlkPVwie3tkaWFsb2dJZH19XCIgZGF0YS1kaWFsb2ctZWxzPVwicm9vdFwiIGRhdGEtYXg2dWktZGlhbG9nPVwiXCIgY2xhc3M9XCJ7e3RoZW1lfX1cIj5cbiAgICA8ZGl2IGNsYXNzPVwiYXgtZGlhbG9nLWhlYWRlclwiIGRhdGEtZGlhbG9nLWVscz1cImhlYWRlclwiPlxuICAgICAgICB7e3t0aXRsZX19fVxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJheC1kaWFsb2ctYm9keVwiIGRhdGEtZGlhbG9nLWVscz1cImJvZHlcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImF4LWRpYWxvZy1tc2dcIj57e3ttc2d9fX08L2Rpdj5cbiAgICAgICAgXG4gICAgICAgIHt7I2lucHV0fX1cbiAgICAgICAgPGRpdiBjbGFzcz1cImF4LWRpYWxvZy1wcm9tcHRcIj5cbiAgICAgICAgICAgIHt7I0BlYWNofX1cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICB7eyNAdmFsdWUubGFiZWx9fVxuICAgICAgICAgICAgPGxhYmVsPnt7I19jcmxmfX17e3sufX19e3svX2NybGZ9fTwvbGFiZWw+XG4gICAgICAgICAgICB7ey9AdmFsdWUubGFiZWx9fVxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ7e0B2YWx1ZS50eXBlfX1cIiBwbGFjZWhvbGRlcj1cInt7QHZhbHVlLnBsYWNlaG9sZGVyfX1cIiBjbGFzcz1cImZvcm0tY29udHJvbCB7e0B2YWx1ZS50aGVtZX19XCIgZGF0YS1kaWFsb2ctcHJvbXB0PVwie3tAa2V5fX1cIiBzdHlsZT1cIndpZHRoOjEwMCU7XCIgdmFsdWU9XCJ7e0B2YWx1ZS52YWx1ZX19XCIgLz5cbiAgICAgICAgICAgIHt7I0B2YWx1ZS5oZWxwfX1cbiAgICAgICAgICAgIDxwIGNsYXNzPVwiaGVscC1ibG9ja1wiPnt7I19jcmxmfX17ey59fXt7L19jcmxmfX08L3A+XG4gICAgICAgICAgICB7ey9AdmFsdWUuaGVscH19XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHt7L0BlYWNofX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHt7L2lucHV0fX1cbiAgICAgICAgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJheC1kaWFsb2ctYnV0dG9uc1wiIGRhdGEtZGlhbG9nLWVscz1cImJ1dHRvbnNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJheC1idXR0b24td3JhcFwiPlxuICAgICAgICAgICAge3sjYnRuc319XG4gICAgICAgICAgICAgICAge3sjQGVhY2h9fVxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGRhdGEtZGlhbG9nLWJ0bj1cInt7QGtleX19XCIgY2xhc3M9XCJidG4gYnRuLXt7QHZhbHVlLnRoZW1lfX1cIj57e0B2YWx1ZS5sYWJlbH19PC9idXR0b24+XG4gICAgICAgICAgICAgICAge3svQGVhY2h9fVxuICAgICAgICAgICAge3svYnRuc319XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIFxuICAgICAgICB7eyNhZGRpdGlvbmFsQ29udGVudH19XG4gICAgICAgIDxkaXYgZGF0YS1kaWFsb2ctZWxzPVwiYWRkaXRpb25hbC1jb250ZW50XCI+e3t7Ln19fTwvZGl2PlxuICAgICAgICB7ey9hZGRpdGlvbmFsQ29udGVudH19XG4gICAgPC9kaXY+XG48L2Rpdj4gIFxuYDtcbn07XG5jb25zdCBvblN0YXRlQ2hhbmdlZCA9IGZ1bmN0aW9uIChvcHRzLCB0aGF0KSB7XG4gIGlmIChvcHRzICYmIG9wdHMub25TdGF0ZUNoYW5nZWQpIHtcbiAgICBvcHRzLm9uU3RhdGVDaGFuZ2VkLmNhbGwodGhhdCwgdGhhdCk7XG4gIH1cbiAgZWxzZSBpZiAodGhpcy5vblN0YXRlQ2hhbmdlZCkge1xuICAgIHRoaXMub25TdGF0ZUNoYW5nZWQuY2FsbCh0aGF0LCB0aGF0KTtcbiAgfVxuXG4gIG9wdHMgPSBudWxsO1xuICB0aGF0ID0gbnVsbDtcbiAgcmV0dXJuIHRydWU7XG59O1xuY29uc3QgZ2V0Q29udGVudCA9IGZ1bmN0aW9uIChkaWFsb2dJZCwgb3B0cykge1xuICBsZXQgZGF0YSA9IHtcbiAgICBkaWFsb2dJZDogZGlhbG9nSWQsXG4gICAgdGl0bGU6IChvcHRzLnRpdGxlIHx8IHRoaXMuY29uZmlnLnRpdGxlIHx8IFwiXCIpLFxuICAgIG1zZzogKG9wdHMubXNnIHx8IHRoaXMuY29uZmlnLm1zZyB8fCBcIlwiKS5yZXBsYWNlKC9cXG4vZywgXCI8YnIvPlwiKSxcbiAgICBpbnB1dDogb3B0cy5pbnB1dCxcbiAgICBidG5zOiBvcHRzLmJ0bnMsXG4gICAgJ19jcmxmJzogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMucmVwbGFjZSgvXFxuL2csIFwiPGJyLz5cIik7XG4gICAgfSxcbiAgICBhZGRpdGlvbmFsQ29udGVudDogKGZ1bmN0aW9uIChhZGRpdGlvbmFsQ29udGVudCkge1xuICAgICAgaWYgKFUuaXNGdW5jdGlvbihhZGRpdGlvbmFsQ29udGVudCkpIHtcbiAgICAgICAgcmV0dXJuIGFkZGl0aW9uYWxDb250ZW50LmNhbGwob3B0cyk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGFkZGl0aW9uYWxDb250ZW50O1xuICAgICAgfVxuICAgIH0pKG9wdHMuYWRkaXRpb25hbENvbnRlbnQpXG4gIH07XG5cbiAgcmV0dXJuIG11c3RhY2hlLnJlbmRlcihkaWFsb2dUbXBsLmNhbGwodGhpcyksIGRhdGEpO1xufTtcbmNvbnN0IG9wZW4gPSBmdW5jdGlvbiAob3B0cywgY2FsbGJhY2spIHtcbiAgbGV0IHBvcyA9IHt9LFxuICAgICAgYm94ID0ge1xuICAgICAgICB3aWR0aDogb3B0cy53aWR0aFxuICAgICAgfTtcblxuICB0aGlzLmRpYWxvZ0NvbmZpZyA9IG9wdHM7XG4gIHRoaXMuJGFjdGl2ZURpYWxvZyA9IGpRdWVyeShnZXRDb250ZW50LmNhbGwodGhpcywgb3B0cy5pZCwgb3B0cykpO1xuICB0aGlzLiRhY3RpdmVEaWFsb2cuY3NzKHt3aWR0aDogYm94LndpZHRofSk7XG4gIGpRdWVyeShkb2N1bWVudC5ib2R5KS5hcHBlbmQodGhpcy4kYWN0aXZlRGlhbG9nKTtcblxuICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY2FsbGJhY2sgPSBvcHRzLmNhbGxiYWNrO1xuICB9XG5cbiAgLy8gZGlhbG9nIOuGkuydtCDqtaztlZjquLAgLSDrhIjruYTqsIAg7KCV7ZW07KeA66m0IOuGkuydtOqwgCDrs4Dqsr0g65CgIOqygy5cbiAgb3B0cy5oZWlnaHQgPSBib3guaGVpZ2h0ID0gdGhpcy4kYWN0aXZlRGlhbG9nLmhlaWdodCgpO1xuXG4gIC8vLSBwb3NpdGlvbiDsoJXroKxcbiAgaWYgKHR5cGVvZiBvcHRzLnBvc2l0aW9uID09PSBcInVuZGVmaW5lZFwiIHx8IG9wdHMucG9zaXRpb24gPT09IFwiY2VudGVyXCIpIHtcbiAgICBwb3MudG9wID0galF1ZXJ5KHdpbmRvdykuaGVpZ2h0KCkgLyAyIC0gYm94LmhlaWdodCAvIDI7XG4gICAgcG9zLmxlZnQgPSBqUXVlcnkod2luZG93KS53aWR0aCgpIC8gMiAtIGJveC53aWR0aCAvIDI7XG4gIH1cbiAgZWxzZSB7XG4gICAgcG9zLmxlZnQgPSBvcHRzLnBvc2l0aW9uLmxlZnQgfHwgMDtcbiAgICBwb3MudG9wID0gb3B0cy5wb3NpdGlvbi50b3AgfHwgMDtcbiAgfVxuICBpZiAodGhpcy5jb25maWcuekluZGV4KSB7XG4gICAgcG9zW1wiei1pbmRleFwiXSA9IHRoaXMuY29uZmlnLnpJbmRleDtcbiAgfVxuXG4gIHRoaXMuJGFjdGl2ZURpYWxvZ1xuICAgIC5jc3MocG9zKVxuICAgIC5vbihvcHRzLmNsaWNrRXZlbnROYW1lLCBcIltkYXRhLWRpYWxvZy1idG5dXCIsIChlKSA9PiB7XG4gICAgICBidG5PbkNsaWNrLmNhbGwodGhpcywgZSB8fCB3aW5kb3cuZXZlbnQsIG9wdHMsIGNhbGxiYWNrKTtcbiAgICB9KVxuICAgIC5maW5kKG9wdHMuZGlhbG9nVHlwZSA9PT0gXCJwcm9tcHRcIiA/IFwiW2RhdGEtZGlhbG9nLXByb21wdF1cIiA6IFwiW2RhdGEtZGlhbG9nLWJ0bl1cIikudHJpZ2dlcihcImZvY3VzXCIpO1xuXG5cbiAgLy8gYmluZCBrZXkgZXZlbnRcbiAgalF1ZXJ5KHdpbmRvdylcbiAgICAub24oXCJrZXlkb3duLmF4NmRpYWxvZ1wiLCAoZSkgPT4ge1xuICAgICAgb25LZXl1cC5jYWxsKHRoaXMsIGUgfHwgd2luZG93LmV2ZW50LCBvcHRzLCBjYWxsYmFjayk7XG4gICAgfSlcbiAgICAub24oXCJyZXNpemUuYXg2ZGlhbG9nXCIsIFUudGhyb3R0bGUoZnVuY3Rpb24gKGUpIHtcbiAgICAgIGFsaWduLmNhbGwodGhpcywgZSB8fCB3aW5kb3cuZXZlbnQpO1xuICAgIH0sIDMwKS5iaW5kKHRoaXMpKTtcblxuICBvblN0YXRlQ2hhbmdlZC5jYWxsKHRoaXMsIG9wdHMsIHtcbiAgICBzZWxmOiB0aGlzLFxuICAgIHN0YXRlOiBcIm9wZW5cIlxuICB9KTtcblxuICBpZiAob3B0cy5hdXRvQ2xvc2VUaW1lKSB7XG4gICAgdGhpcy5hdXRvQ2xvc2VUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH0sIG9wdHMuYXV0b0Nsb3NlVGltZSk7XG4gIH1cblxuICBwb3MgPSBudWxsO1xuICBib3ggPSBudWxsO1xufTtcbmNvbnN0IGFsaWduID0gZnVuY3Rpb24gKGUpIHtcbiAgaWYgKCF0aGlzLiRhY3RpdmVEaWFsb2cpIHJldHVybiB0aGlzO1xuICBsZXQgb3B0cyA9IHRoaXMuZGlhbG9nQ29uZmlnLFxuICAgICAgYm94ICA9IHtcbiAgICAgICAgd2lkdGg6IG9wdHMud2lkdGgsXG4gICAgICAgIGhlaWdodDogb3B0cy5oZWlnaHRcbiAgICAgIH07XG5cbiAgLy8tIHBvc2l0aW9uIOygleugrFxuICBpZiAodHlwZW9mIG9wdHMucG9zaXRpb24gPT09IFwidW5kZWZpbmVkXCIgfHwgb3B0cy5wb3NpdGlvbiA9PT0gXCJjZW50ZXJcIikge1xuICAgIGJveC50b3AgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyIC0gYm94LmhlaWdodCAvIDI7XG4gICAgYm94LmxlZnQgPSB3aW5kb3cuaW5uZXJXaWR0aCAvIDIgLSBib3gud2lkdGggLyAyO1xuICB9XG4gIGVsc2Uge1xuICAgIGJveC5sZWZ0ID0gb3B0cy5wb3NpdGlvbi5sZWZ0IHx8IDA7XG4gICAgYm94LnRvcCA9IG9wdHMucG9zaXRpb24udG9wIHx8IDA7XG4gIH1cbiAgaWYgKGJveC5sZWZ0IDwgMCkgYm94LmxlZnQgPSAwO1xuICBpZiAoYm94LnRvcCA8IDApIGJveC50b3AgPSAwO1xuXG4gIHRoaXMuJGFjdGl2ZURpYWxvZy5jc3MoYm94KTtcblxuICBvcHRzID0gbnVsbDtcbiAgYm94ID0gbnVsbDtcblxuICByZXR1cm4gdGhpcztcbn07XG5jb25zdCBidG5PbkNsaWNrID0gZnVuY3Rpb24gKGUsIG9wdHMsIGNhbGxiYWNrLCB0YXJnZXQsIGspIHtcbiAgbGV0IHRoYXQsXG4gICAgICBlbXB0eUtleSA9IG51bGw7XG5cbiAgaWYgKGUuc3JjRWxlbWVudCkgZS50YXJnZXQgPSBlLnNyY0VsZW1lbnQ7XG5cbiAgdGFyZ2V0ID0gVS5maW5kUGFyZW50Tm9kZShlLnRhcmdldCwgZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGlmICh0YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1kaWFsb2ctYnRuXCIpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIGlmICh0YXJnZXQpIHtcbiAgICBrID0gdGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtZGlhbG9nLWJ0blwiKTtcblxuICAgIHRoYXQgPSB7XG4gICAgICBzZWxmOiB0aGlzLFxuICAgICAga2V5OiBrLCB2YWx1ZTogb3B0cy5idG5zW2tdLFxuICAgICAgZGlhbG9nSWQ6IG9wdHMuaWQsXG4gICAgICBidG5UYXJnZXQ6IHRhcmdldFxuICAgIH07XG4gICAgaWYgKG9wdHMuZGlhbG9nVHlwZSA9PT0gXCJwcm9tcHRcIikge1xuICAgICAgdGhhdC5pbnB1dCA9IHt9O1xuICAgICAgZm9yIChsZXQgb2kgaW4gb3B0cy5pbnB1dCkge1xuICAgICAgICB0aGF0LmlucHV0W29pXSA9IHRoaXMuJGFjdGl2ZURpYWxvZy5maW5kKCdbZGF0YS1kaWFsb2ctcHJvbXB0PScgKyBvaSArICddJykudmFsKCk7XG4gICAgICAgIGlmIChvcHRzLmlucHV0W29pXS5yZXF1aXJlZCAmJiAodGhhdC5pbnB1dFtvaV0gPT0gXCJcIiB8fCB0aGF0LmlucHV0W29pXSA9PSBudWxsKSkge1xuICAgICAgICAgIGVtcHR5S2V5ID0gb2k7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG9wdHMuYnRuc1trXS5vbkNsaWNrKSB7XG4gICAgICBvcHRzLmJ0bnNba10ub25DbGljay5jYWxsKHRoYXQsIHRoYXQpO1xuICAgIH1cbiAgICBlbHNlIGlmIChvcHRzLmRpYWxvZ1R5cGUgPT09IFwiYWxlcnRcIikge1xuICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjay5jYWxsKHRoYXQsIHRoYXQpO1xuICAgICAgdGhpcy5jbG9zZSh7ZG9Ob3RDYWxsYmFjazogdHJ1ZX0pO1xuICAgIH1cbiAgICBlbHNlIGlmIChvcHRzLmRpYWxvZ1R5cGUgPT09IFwiY29uZmlybVwiKSB7XG4gICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrLmNhbGwodGhhdCwgdGhhdCk7XG4gICAgICB0aGlzLmNsb3NlKHtkb05vdENhbGxiYWNrOiB0cnVlfSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKG9wdHMuZGlhbG9nVHlwZSA9PT0gXCJwcm9tcHRcIikge1xuICAgICAgaWYgKGsgPT09ICdvaycpIHtcbiAgICAgICAgaWYgKGVtcHR5S2V5KSB7XG4gICAgICAgICAgdGhpcy4kYWN0aXZlRGlhbG9nLmZpbmQoJ1tkYXRhLWRpYWxvZy1wcm9tcHQ9XCInICsgZW1wdHlLZXkgKyAnXCJdJykuZ2V0KDApLmZvY3VzKCk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrLmNhbGwodGhhdCwgdGhhdCk7XG4gICAgICB0aGlzLmNsb3NlKHtkb05vdENhbGxiYWNrOiB0cnVlfSk7XG4gICAgfVxuICB9XG5cbiAgdGhhdCA9IG51bGw7XG4gIG9wdHMgPSBudWxsO1xuICBjYWxsYmFjayA9IG51bGw7XG4gIHRhcmdldCA9IG51bGw7XG4gIGsgPSBudWxsO1xufTtcbmNvbnN0IG9uS2V5dXAgPSBmdW5jdGlvbiAoZSwgb3B0cywgY2FsbGJhY2ssIHRhcmdldCwgaykge1xuICBsZXQgdGhhdCxcbiAgICAgIGVtcHR5S2V5ID0gbnVsbDtcblxuICBpZiAoZS5rZXlDb2RlID09IGluZm8uZXZlbnRLZXlzLkVTQykge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuICBpZiAob3B0cy5kaWFsb2dUeXBlID09PSBcInByb21wdFwiKSB7XG4gICAgaWYgKGUua2V5Q29kZSA9PSBpbmZvLmV2ZW50S2V5cy5SRVRVUk4pIHtcbiAgICAgIHRoYXQgPSB7XG4gICAgICAgIHNlbGY6IHRoaXMsXG4gICAgICAgIGtleTogaywgdmFsdWU6IG9wdHMuYnRuc1trXSxcbiAgICAgICAgZGlhbG9nSWQ6IG9wdHMuaWQsXG4gICAgICAgIGJ0blRhcmdldDogdGFyZ2V0XG4gICAgICB9O1xuICAgICAgdGhhdC5pbnB1dCA9IHt9O1xuXG4gICAgICBmb3IgKGxldCBvaSBpbiBvcHRzLmlucHV0KSB7XG4gICAgICAgIHRoYXQuaW5wdXRbb2ldID0gdGhpcy4kYWN0aXZlRGlhbG9nLmZpbmQoJ1tkYXRhLWRpYWxvZy1wcm9tcHQ9JyArIG9pICsgJ10nKS52YWwoKTtcbiAgICAgICAgaWYgKG9wdHMuaW5wdXRbb2ldLnJlcXVpcmVkICYmICh0aGF0LmlucHV0W29pXSA9PSBcIlwiIHx8IHRoYXQuaW5wdXRbb2ldID09IG51bGwpKSB7XG4gICAgICAgICAgZW1wdHlLZXkgPSBvaTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGVtcHR5S2V5KSB7XG4gICAgICAgIHRoYXQgPSBudWxsO1xuICAgICAgICBlbXB0eUtleSA9IG51bGw7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2suY2FsbCh0aGF0LCB0aGF0KTtcbiAgICAgIHRoaXMuY2xvc2Uoe2RvTm90Q2FsbGJhY2s6IHRydWV9KTtcbiAgICB9XG4gIH1cblxuICB0aGF0ID0gbnVsbDtcbiAgZW1wdHlLZXkgPSBudWxsO1xuICBvcHRzID0gbnVsbDtcbiAgY2FsbGJhY2sgPSBudWxsO1xuICB0YXJnZXQgPSBudWxsO1xuICBrID0gbnVsbDtcbn07XG5cbi8qIH5+fn5+fn5+fn5+fn5+fn5+fiBlbmQgb2YgcHJpdmF0ZSAgfn5+fn5+fn5+fn5+fn5+fn5+fn4gKi9cblxuLyoqXG4gKiBAY2xhc3NcbiAqL1xuY2xhc3MgQVg2VUlEaWFsb2cgZXh0ZW5kcyBBWDZVSUNvcmUge1xuICAvKipcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBjb25maWdcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgIHN1cGVyKCk7XG5cbiAgICAvKipcbiAgICAgKiBAbWVtYmVyIHtKU09OfVxuICAgICAqIEBwYXJhbSBjb25maWdcbiAgICAgKiBAcGFyYW0gW2NvbmZpZy50aGVtZT0nZGVmYXVsdCddXG4gICAgICogQHBhcmFtIFtjb25maWcud2lkdGg9MzAwXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLnRpdGxlPScnXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLm1zZz0nJ11cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5sYW5nXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmxhbmcub2s9J29rJ11cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5sYW5nLmNhbmNlbD0nY2FuY2VsJ11cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5hbmltYXRlVGltZT0xNTBdXG4gICAgICogQHBhcmFtIFtjb25maWcuYXV0b0Nsb3NlVGltZT0wXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLm9uU3RhdGVDaGFuZ2VkXVxuICAgICAqXG4gICAgICovXG4gICAgdGhpcy5jb25maWcgPSB7XG4gICAgICBpZDogJ2F4Ni1kaWFsb2ctJyArIHRoaXMuaW5zdGFuY2VJZCxcbiAgICAgIGNsaWNrRXZlbnROYW1lOiBcImNsaWNrXCIsXG4gICAgICB0aGVtZTogJ2RlZmF1bHQnLFxuICAgICAgd2lkdGg6IDMwMCxcbiAgICAgIHRpdGxlOiAnQVg2VUlEaWFsb2cnLFxuICAgICAgbXNnOiAnJyxcbiAgICAgIGxhbmc6IHtcbiAgICAgICAgXCJva1wiOiBcIm9rXCIsIFwiY2FuY2VsXCI6IFwiY2FuY2VsXCJcbiAgICAgIH0sXG4gICAgICBhbmltYXRlVGltZTogMTUwLFxuICAgICAgYXV0b0Nsb3NlVGltZTogMFxuICAgIH07XG4gICAgalF1ZXJ5LmV4dGVuZCh0cnVlLCB0aGlzLmNvbmZpZywgY29uZmlnKTtcblxuICAgIC8vIOuppOuyhCDrs4DsiJgg7LSI6riw7ZmUXG4gICAgLyoqXG4gICAgICogZGlhbG9n6rCAIOyXtOugpOyeiOuKlCDsg4Htg5zsl5DshJwg64uk7IucIG9wZW7snbQg65CY66m0IHF1ZXVl7JeQIOuztOq0gCDtlZjsmIDri6TqsIAgY2xvc2Xtm4Qgb3BlblxuICAgICAqIEBtZW1iZXIge0FycmF5fVxuICAgICAqL1xuICAgIHRoaXMucXVldWUgPSBbXTtcbiAgICAvKipcbiAgICAgKiBAbWVtYmVyIHtqUXVlcnlFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMuJGFjdGl2ZURpYWxvZyA9IG51bGw7XG4gICAgLyoqXG4gICAgICogQG1lbWJlciB7T2JqZWN0fVxuICAgICAqL1xuICAgIHRoaXMuYXV0b0Nsb3NlVGltZXIgPSBudWxsO1xuXG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAcGFyYW0gY29uZmlnXG4gICAqL1xuICBpbml0KCkge1xuICAgIHRoaXMub25TdGF0ZUNoYW5nZWQgPSB0aGlzLmNvbmZpZy5vblN0YXRlQ2hhbmdlZDtcbiAgICBkZWxldGUgdGhpcy5jb25maWcub25TdGF0ZUNoYW5nZWQ7XG5cbiAgICAvLyBpbml0IO2YuOy2nCDsl6zrtoBcbiAgICB0aGlzLmluaXRPbmNlKCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKi9cbiAgaW5pdE9uY2UoKSB7XG4gICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpIHJldHVybiB0aGlzO1xuICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQHBhcmFtIG9wdHNcbiAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAqIEBwYXJhbSB0cnlDb3VudFxuICAgKiBAcmV0dXJuIHtBWDZVSURpYWxvZ31cbiAgICogQGV4YW1wbGVcbiAgICogYGBganNcbiAgICogaW1wb3J0IHtEaWFsb2d9IGZyb20gXCJheDZ1aVwiXG4gICAqXG4gICAqIGNvbnN0IGRpYWxvZyA9IG5ldyBEaWFsb2coKTtcbiAgICogZGlhbG9nLmFsZXJ0KFwiQWxlcnQgTWVzc2FnZVwiKTtcbiAgICogZGlhbG9nLmFsZXJ0KHtcbiAgICAgKiAgICAgdGl0bGU6IFwiVGl0bGVcIixcbiAgICAgKiAgICAgbXNnOiBcIkFsZXJ0IE1lc3NhZ2VcIlxuICAgICAqIH0pO1xuICAgKiBgYGBcbiAgICovXG4gIGFsZXJ0KG9wdHMsIGNhbGxiYWNrLCB0cnlDb3VudCkge1xuICAgIGlmICh0eXBlb2Ygb3B0cyA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgb3B0cyA9IHtcbiAgICAgICAgdGl0bGU6IHRoaXMuY29uZmlnLnRpdGxlLFxuICAgICAgICBtc2c6IFwiXCJcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKFUuaXNTdHJpbmcob3B0cykpIHtcbiAgICAgIG9wdHMgPSB7XG4gICAgICAgIHRpdGxlOiB0aGlzLmNvbmZpZy50aXRsZSxcbiAgICAgICAgbXNnOiBvcHRzXG4gICAgICB9XG4gICAgfVxuXG4gICAgb3B0cyA9IGpRdWVyeS5leHRlbmQodHJ1ZSwge30sIHRoaXMuY29uZmlnLCBvcHRzLCB7XG4gICAgICBkaWFsb2dUeXBlOiBcImFsZXJ0XCIsXG4gICAgICBjYWxsYmFjazogY2FsbGJhY2tcbiAgICB9KTtcblxuICAgIGlmICh0eXBlb2Ygb3B0cy5idG5zID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBvcHRzLmJ0bnMgPSB7XG4gICAgICAgIG9rOiB7bGFiZWw6IG9wdHMubGFuZ1tcIm9rXCJdLCB0aGVtZTogb3B0cy50aGVtZX1cbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuJGFjdGl2ZURpYWxvZykge1xuICAgICAgdGhpcy5xdWV1ZS5wdXNoKG9wdHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcGVuLmNhbGwodGhpcywgb3B0cywgY2FsbGJhY2spO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBwYXJhbSBvcHRzXG4gICAqIEBwYXJhbSBjYWxsYmFja1xuICAgKiBAcGFyYW0gdHJ5Q291bnRcbiAgICogQHJldHVybiB7QVg2VUlEaWFsb2d9XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqIGltcG9ydCB7RGlhbG9nfSBmcm9tIFwiYXg2dWlcIlxuICAgKlxuICAgKiBjb25zdCBkaWFsb2cgPSBuZXcgRGlhbG9nKCk7XG4gICAqIGRpYWxvZy5jb25maXJtKHtcbiAgICAgKiAgICAgdGl0bGU6IFwi7ZmV7J24XCIsXG4gICAgICogICAgIG1zZzogXCLtmZXsnbgg65iQ64qUIOy3qOyGjOulvCDriITrpbTshLjsmpRcIlxuICAgICAqIH0sIGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgKiAgICAgLy9jb25zb2xlLmxvZyh0aGlzLCBhLCBiKTtcbiAgICAgKiAgICAgaWYocmVzLmtleSA9PSBcIm9rXCIpe1xuICAgICAqICAgICAgICAgY29uc29sZS5sb2coXCJPS1wiKTtcbiAgICAgKiAgICAgfVxuICAgICAqICAgICBlbHNlIGlmKHJlcy5rZXkgPT0gXCJjYW5jZWxcIil7XG4gICAgICogICAgICAgICBjb25zb2xlLmxvZyhcIkNBTkNFTFwiKTtcbiAgICAgKiAgICAgfVxuICAgICAqIH0pO1xuICAgKlxuICAgKiAvLyBidG5zIGN1c3RvbVxuICAgKiBkaWFsb2cuY29uZmlnKHtcbiAgICAgKiAgdGl0bGU6IFwi7JiIL+yVhOuLiOyYpFwiLFxuICAgICAqICBtc2c6IFwi64u57Iug7J2AIOqwnOuwnOyekCDsnoXri4jquYw/XCIsXG4gICAgICogIGJ0bnM6IHtcbiAgICAgKiAgICAgIFk6IHtsYWJlbDogXCLsmIhcIn0sXG4gICAgICogICAgICBOOiB7bGFiZWw6IFwi7JWE64uI7JikXCJ9XG4gICAgICogIH1cbiAgICAgKiB9LCBmdW5jdGlvbiAocmVzKSB7XG4gICAgICogICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAqIH0pO1xuICAgKiBgYGBcbiAgICovXG4gIGNvbmZpcm0ob3B0cywgY2FsbGJhY2ssIHRyeUNvdW50KSB7XG4gICAgaWYgKHR5cGVvZiBvcHRzID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBvcHRzID0ge1xuICAgICAgICB0aXRsZTogdGhpcy5jb25maWcudGl0bGUsXG4gICAgICAgIG1zZzogXCJcIlxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoVS5pc1N0cmluZyhvcHRzKSkge1xuICAgICAgb3B0cyA9IHtcbiAgICAgICAgdGl0bGU6IHRoaXMuY29uZmlnLnRpdGxlLFxuICAgICAgICBtc2c6IG9wdHNcbiAgICAgIH1cbiAgICB9XG5cbiAgICBvcHRzID0galF1ZXJ5LmV4dGVuZCh0cnVlLCB7fSwgdGhpcy5jb25maWcsIG9wdHMsIHtcbiAgICAgIGRpYWxvZ1R5cGU6IFwiY29uZmlybVwiLFxuICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrXG4gICAgfSk7XG5cbiAgICBpZiAodHlwZW9mIG9wdHMuYnRucyA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgb3B0cy5idG5zID0ge1xuICAgICAgICBvazoge2xhYmVsOiBvcHRzLmxhbmdbXCJva1wiXSwgdGhlbWU6IG9wdHMudGhlbWV9LFxuICAgICAgICBjYW5jZWw6IHtsYWJlbDogb3B0cy5sYW5nW1wiY2FuY2VsXCJdfVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy4kYWN0aXZlRGlhbG9nKSB7XG4gICAgICB0aGlzLnF1ZXVlLnB1c2gob3B0cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wZW4uY2FsbCh0aGlzLCBvcHRzLCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAcGFyYW0gb3B0c1xuICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICogQHBhcmFtIHRyeUNvdW50XG4gICAqIEByZXR1cm4ge0FYNlVJRGlhbG9nfVxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBqc1xuICAgKiBpbXBvcnQge0RpYWxvZ30gZnJvbSBcImF4NnVpXCJcbiAgICpcbiAgICogY29uc3QgZGlhbG9nID0gbmV3IERpYWxvZygpO1xuICAgKlxuICAgKiBkaWFsb2cucHJvbXB0KHtcbiAgICAgKiAgdGl0bGU6IFwicHJvbXB0XCIsXG4gICAgICogIG1zZzogJ+uLpOydjOydmCDqsJLsnYQg7J6F66Cl7ZWY7IS47JqULicsXG4gICAgICogIGlucHV0OiB7XG4gICAgICogICAgICBkYXRhMToge2xhYmVsOiBcImRhdGEx7J2YIOudvOuyqFwiLCB0eXBlOiBcInBhc3N3b3JkXCJ9LFxuICAgICAqICAgICAgZGF0YTI6IHtsYWJlbDogXCJkYXRhMuydmCDrnbzrsqhcIn1cbiAgICAgKiAgfVxuICAgICAqIH0sIGZ1bmN0aW9uKHJlcyl7XG4gICAgICogICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAqIH0pO1xuICAgKiBgYGBcbiAgICovXG4gIHByb21wdChvcHRzLCBjYWxsYmFjaywgdHJ5Q291bnQpIHtcbiAgICBpZiAodHlwZW9mIG9wdHMgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIG9wdHMgPSB7XG4gICAgICAgIHRpdGxlOiB0aGlzLmNvbmZpZy50aXRsZSxcbiAgICAgICAgbXNnOiBcIlwiXG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChVLmlzU3RyaW5nKG9wdHMpKSB7XG4gICAgICBvcHRzID0ge1xuICAgICAgICB0aXRsZTogdGhpcy5jb25maWcudGl0bGUsXG4gICAgICAgIG1zZzogb3B0c1xuICAgICAgfVxuICAgIH1cblxuICAgIG9wdHMgPSBqUXVlcnkuZXh0ZW5kKHRydWUsIHt9LCB0aGlzLmNvbmZpZywgb3B0cywge1xuICAgICAgZGlhbG9nVHlwZTogXCJwcm9tcHRcIixcbiAgICAgIGNhbGxiYWNrOiBjYWxsYmFja1xuICAgIH0pO1xuXG4gICAgaWYgKHR5cGVvZiBvcHRzLmlucHV0ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBvcHRzLmlucHV0ID0ge1xuICAgICAgICB2YWx1ZToge2xhYmVsOiBcIlwifVxuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvcHRzLmJ0bnMgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIG9wdHMuYnRucyA9IHtcbiAgICAgICAgb2s6IHtsYWJlbDogb3B0cy5sYW5nW1wib2tcIl0sIHRoZW1lOiBvcHRzLnRoZW1lfSxcbiAgICAgICAgY2FuY2VsOiB7bGFiZWw6IG9wdHMubGFuZ1tcImNhbmNlbFwiXX1cbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuJGFjdGl2ZURpYWxvZykge1xuICAgICAgdGhpcy5xdWV1ZS5wdXNoKG9wdHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcGVuLmNhbGwodGhpcywgb3B0cywgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQHBhcmFtIF9vcHRpb25cbiAgICogQHJldHVybiB7QVg2VUlEaWFsb2d9XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqIGRpYWxvZy5jbG9zZSgpO1xuICAgKiBkaWFsb2cuY2xvc2Uoe2NhbGxiYWNrOiBmdW5jdGlvbigpe1xuICAgICAqXG4gICAgICogfSk7XG4gICAgICogYGBgXG4gICAgICovXG4gIGNsb3NlKF9vcHRpb24pIHtcbiAgICBsZXQgb3B0cywgdGhhdDtcblxuICAgIGlmICh0aGlzLiRhY3RpdmVEaWFsb2cpIHtcbiAgICAgIGlmICh0aGlzLmF1dG9DbG9zZVRpbWVyKSBjbGVhclRpbWVvdXQodGhpcy5hdXRvQ2xvc2VUaW1lcik7XG5cbiAgICAgIG9wdHMgPSB0aGlzLmRpYWxvZ0NvbmZpZztcblxuICAgICAgdGhpcy4kYWN0aXZlRGlhbG9nLmFkZENsYXNzKFwiZGVzdHJveVwiKTtcbiAgICAgIGpRdWVyeSh3aW5kb3cpXG4gICAgICAgIC5vZmYoXCJrZXlkb3duLmF4NmRpYWxvZ1wiKVxuICAgICAgICAub2ZmKFwicmVzaXplLmF4NmRpYWxvZ1wiKTtcblxuICAgICAgc2V0VGltZW91dCgoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy4kYWN0aXZlRGlhbG9nKSB7XG4gICAgICAgICAgdGhpcy4kYWN0aXZlRGlhbG9nLnJlbW92ZSgpO1xuICAgICAgICAgIHRoaXMuJGFjdGl2ZURpYWxvZyA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB0aGF0ID0ge1xuICAgICAgICAgIHNlbGY6IHRoaXMsXG4gICAgICAgICAgc3RhdGU6IFwiY2xvc2VcIixcbiAgICAgICAgICBkaWFsb2dJZDogb3B0cy5pZFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChfb3B0aW9uICYmIFUuaXNGdW5jdGlvbihfb3B0aW9uLmNhbGxiYWNrKSkge1xuICAgICAgICAgIF9vcHRpb24uY2FsbGJhY2suY2FsbCh0aGF0LCB0aGF0KTtcbiAgICAgICAgfSBlbHNlIGlmIChvcHRzLmNhbGxiYWNrICYmICghX29wdGlvbiB8fCAhX29wdGlvbi5kb05vdENhbGxiYWNrKSkge1xuICAgICAgICAgIG9wdHMuY2FsbGJhY2suY2FsbCh0aGF0LCB0aGF0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRzICYmIG9wdHMub25TdGF0ZUNoYW5nZWQpIHtcbiAgICAgICAgICBvcHRzLm9uU3RhdGVDaGFuZ2VkLmNhbGwodGhhdCwgdGhhdCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5vblN0YXRlQ2hhbmdlZCkge1xuICAgICAgICAgIHRoaXMub25TdGF0ZUNoYW5nZWQuY2FsbCh0aGF0LCB0aGF0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOyXtOugpOyVvCDtlaAg7YGQ6rCAIOuCqOyVhCDsnojri6TrqbQg7YGQ7JWE7J207YWc7Jy866GcIOuLpOyLnCBvcGVuXG4gICAgICAgIGlmICh0aGlzLnF1ZXVlICYmIHRoaXMucXVldWUubGVuZ3RoKSB7XG4gICAgICAgICAgb3Blbi5jYWxsKHRoaXMsIHRoaXMucXVldWUuc2hpZnQoKSk7XG4gICAgICAgIH1cblxuICAgICAgICBvcHRzID0gbnVsbDtcbiAgICAgICAgdGhhdCA9IG51bGw7XG4gICAgICB9KS5iaW5kKHRoaXMpLCB0aGlzLmNvbmZpZy5hbmltYXRlVGltZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFYNlVJRGlhbG9nO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9zcmMvQVg2VUlEaWFsb2cuanMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGUuc2Nzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7fVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zdHlsZS5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zdHlsZS5zY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9zcmMvQVg2VUlEaWFsb2cvc3R5bGUuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNzZcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDEwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHVuZGVmaW5lZCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJALXdlYmtpdC1rZXlmcmFtZXMgYXgtZGlhbG9nIHtcXG4gIDAlIHtcXG4gICAgb3BhY2l0eTogMC4wO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGVYKDEpOyB9XFxuICAwLjElIHtcXG4gICAgb3BhY2l0eTogMC4wO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGVYKDEuMyk7IH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAxLjA7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZVgoMSk7IH0gfVxcblxcbkAtbW96LWtleWZyYW1lcyBheC1kaWFsb2cge1xcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAwLjA7XFxuICAgIC1tb3otdHJhbnNmb3JtOiBzY2FsZVgoMSk7IH1cXG4gIDAuMSUge1xcbiAgICBvcGFjaXR5OiAwLjA7XFxuICAgIC1tb3otdHJhbnNmb3JtOiBzY2FsZVgoMS4zKTsgfVxcbiAgMTAwJSB7XFxuICAgIG9wYWNpdHk6IDEuMDtcXG4gICAgLW1vei10cmFuc2Zvcm06IHNjYWxlWCgxKTsgfSB9XFxuXFxuQGtleWZyYW1lcyBheC1kaWFsb2cge1xcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAwLjA7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZVgoMSk7XFxuICAgIC1tb3otdHJhbnNmb3JtOiBzY2FsZVgoMSk7XFxuICAgIC1tcy10cmFuc2Zvcm06IHNjYWxlWCgxKTtcXG4gICAgLW8tdHJhbnNmb3JtOiBzY2FsZVgoMSk7XFxuICAgIHRyYW5zZm9ybTogc2NhbGVYKDEpOyB9XFxuICAwLjElIHtcXG4gICAgb3BhY2l0eTogMC4wO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGVYKDEuMyk7XFxuICAgIC1tb3otdHJhbnNmb3JtOiBzY2FsZVgoMS4zKTtcXG4gICAgLW1zLXRyYW5zZm9ybTogc2NhbGVYKDEuMyk7XFxuICAgIC1vLXRyYW5zZm9ybTogc2NhbGVYKDEuMyk7XFxuICAgIHRyYW5zZm9ybTogc2NhbGVYKDEuMyk7IH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAxLjA7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZVgoMSk7XFxuICAgIC1tb3otdHJhbnNmb3JtOiBzY2FsZVgoMSk7XFxuICAgIC1tcy10cmFuc2Zvcm06IHNjYWxlWCgxKTtcXG4gICAgLW8tdHJhbnNmb3JtOiBzY2FsZVgoMSk7XFxuICAgIHRyYW5zZm9ybTogc2NhbGVYKDEpOyB9IH1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgYXgtZGlhbG9nLWRlc3Ryb3kge1xcbiAgZnJvbSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCk7XFxuICAgIG9wYWNpdHk6IDEuMDsgfVxcbiAgdG8ge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDUwJSk7XFxuICAgIG9wYWNpdHk6IDAuMDsgfSB9XFxuXFxuQC1tb3ota2V5ZnJhbWVzIGF4LWRpYWxvZy1kZXN0cm95IHtcXG4gIGZyb20ge1xcbiAgICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDApO1xcbiAgICBvcGFjaXR5OiAxLjA7IH1cXG4gIHRvIHtcXG4gICAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCA1MCUpO1xcbiAgICBvcGFjaXR5OiAwLjA7IH0gfVxcblxcbkBrZXlmcmFtZXMgYXgtZGlhbG9nLWRlc3Ryb3kge1xcbiAgZnJvbSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCk7XFxuICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCk7XFxuICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAwKTtcXG4gICAgLW8tdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCk7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDApO1xcbiAgICBvcGFjaXR5OiAxLjA7IH1cXG4gIHRvIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCA1MCUpO1xcbiAgICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDUwJSk7XFxuICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCA1MCUpO1xcbiAgICAtby10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCA1MCUpO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCA1MCUpO1xcbiAgICBvcGFjaXR5OiAwLjA7IH0gfVxcblxcbltkYXRhLWF4NnVpLWRpYWxvZ10ge1xcbiAgLXdlYmtpdC1hbmltYXRpb246IGF4LWRpYWxvZyAwLjE1cyBjdWJpYy1iZXppZXIoMC4xNzUsIDAuODg1LCAwLjMyLCAxLjI3NSk7XFxuICAtbW96LWFuaW1hdGlvbjogYXgtZGlhbG9nIDAuMTVzIGN1YmljLWJlemllcigwLjE3NSwgMC44ODUsIDAuMzIsIDEuMjc1KTtcXG4gIGFuaW1hdGlvbjogYXgtZGlhbG9nIDAuMTVzIGN1YmljLWJlemllcigwLjE3NSwgMC44ODUsIDAuMzIsIDEuMjc1KTtcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDApO1xcbiAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7XFxuICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDApO1xcbiAgLW8tdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDApO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDApO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgYm94LXNoYWRvdzogMHB4IDBweCAzcHggMHB4IHJnYmEoMCwgMCwgMCwgMC4xNzUpO1xcbiAgei1pbmRleDogMjAwMDtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIGxlZnQ6IDA7XFxuICB0b3A6IDA7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZDsgfVxcbiAgW2RhdGEtYXg2dWktZGlhbG9nXSAuYXgtZGlhbG9nLWhlYWRlciB7XFxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICAgIHBhZGRpbmc6IDEwcHggMTVweDtcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHRyYW5zcGFyZW50OyB9XFxuICAgIFtkYXRhLWF4NnVpLWRpYWxvZ10gLmF4LWRpYWxvZy1oZWFkZXIgLmJhZGdlIHtcXG4gICAgICBmb250LXNpemU6IDAuOGVtO1xcbiAgICAgIGNvbG9yOiAjZjVmNWY1O1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICMzMzM7IH1cXG4gIFtkYXRhLWF4NnVpLWRpYWxvZ10gLmF4LWRpYWxvZy1ib2R5IHtcXG4gICAgcGFkZGluZzogMTVweDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyOyB9XFxuICAgIFtkYXRhLWF4NnVpLWRpYWxvZ10gLmF4LWRpYWxvZy1ib2R5IC5heC1kaWFsb2ctbXNnIHtcXG4gICAgICBwYWRkaW5nLXRvcDogMTVweDtcXG4gICAgICBwYWRkaW5nLWJvdHRvbTogMTVweDsgfVxcbiAgICBbZGF0YS1heDZ1aS1kaWFsb2ddIC5heC1kaWFsb2ctYm9keSAuYXgtZGlhbG9nLXByb21wdCB7XFxuICAgICAgdGV4dC1hbGlnbjogbGVmdDtcXG4gICAgICBwYWRkaW5nLWJvdHRvbTogNy41cHg7IH1cXG4gICAgW2RhdGEtYXg2dWktZGlhbG9nXSAuYXgtZGlhbG9nLWJvZHkgLmF4LWRpYWxvZy1idXR0b25zIHtcXG4gICAgICBtYXJnaW4tdG9wOiAxNXB4OyB9XFxuICAgICAgW2RhdGEtYXg2dWktZGlhbG9nXSAuYXgtZGlhbG9nLWJvZHkgLmF4LWRpYWxvZy1idXR0b25zIGJ1dHRvbjpub3QoOmxhc3QtY2hpbGQpIHtcXG4gICAgICAgIG1hcmdpbi1yaWdodDogM3B4OyB9XFxuICAgIFtkYXRhLWF4NnVpLWRpYWxvZ10gLmF4LWRpYWxvZy1ib2R5IFtkYXRhLWRpYWxvZy1lbHM9XFxcImFkZGl0aW9uYWwtY29udGVudFxcXCJdIHtcXG4gICAgICBtYXJnaW4tdG9wOiAxNXB4OyB9XFxuICBbZGF0YS1heDZ1aS1kaWFsb2ddIC5heC1kaWFsb2ctaGVhZGVyIHtcXG4gICAgY29sb3I6ICMzMzM7XFxuICAgIGJhY2tncm91bmQ6ICNmNWY1ZjU7IH1cXG4gICAgW2RhdGEtYXg2dWktZGlhbG9nXSAuYXgtZGlhbG9nLWhlYWRlciAuYmFkZ2Uge1xcbiAgICAgIGNvbG9yOiAjZjVmNWY1O1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICMzMzM7IH1cXG4gIFtkYXRhLWF4NnVpLWRpYWxvZ10uZGVzdHJveSB7XFxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBheC1kaWFsb2ctZGVzdHJveSAwLjE1cyBjdWJpYy1iZXppZXIoMC43NTUsIDAuMDUsIDAuODU1LCAwLjA2KSBmb3J3YXJkcztcXG4gICAgLW1vei1hbmltYXRpb246IGF4LWRpYWxvZy1kZXN0cm95IDAuMTVzIGN1YmljLWJlemllcigwLjc1NSwgMC4wNSwgMC44NTUsIDAuMDYpIGZvcndhcmRzO1xcbiAgICBhbmltYXRpb246IGF4LWRpYWxvZy1kZXN0cm95IDAuMTVzIGN1YmljLWJlemllcigwLjc1NSwgMC4wNSwgMC44NTUsIDAuMDYpIGZvcndhcmRzOyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlciEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uL3NyYy9BWDZVSURpYWxvZy9zdHlsZS5zY3NzXG4vLyBtb2R1bGUgaWQgPSA3N1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMTAiXSwic291cmNlUm9vdCI6IiJ9