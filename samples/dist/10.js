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

var _AX6UICore2 = __webpack_require__(5);

var _AX6UICore3 = _interopRequireDefault(_AX6UICore2);

var _AX6Util = __webpack_require__(1);

var _AX6Util2 = _interopRequireDefault(_AX6Util);

var _AX6Info = __webpack_require__(4);

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
      for (var oi in opts.input) {
        that[oi] = this.$activeDialog.find('[data-dialog-prompt=' + oi + ']').val();
        if (that[oi] == "" || that[oi] == null) {
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

      for (var oi in opts.input) {
        that[oi] = this.$activeDialog.find('[data-dialog-prompt=' + oi + ']').val();
        if (that[oi] == "" || that[oi] == null) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZGlhbG9nLmpzIiwid2VicGFjazovLy8uLi9zcmMvQVg2TXVzdGFjaGUuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9BWDZVSURpYWxvZy5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL0FYNlVJRGlhbG9nL3N0eWxlLnNjc3M/YTU4MiIsIndlYnBhY2s6Ly8vLi4vc3JjL0FYNlVJRGlhbG9nL3N0eWxlLnNjc3MiXSwibmFtZXMiOlsiaHRtbCIsImZuIiwibW9kdWxlUnVuIiwiJGJvZHkiLCJkaWFsb2ciLCJzZXRDb25maWciLCJvbiIsImUiLCJidG4iLCJjdXJyZW50VGFyZ2V0IiwiZ2V0QXR0cmlidXRlIiwicHJvY2Vzc29yIiwiYWxlcnQiLCJtc2ciLCJEYXRlIiwib25TdGF0ZUNoYW5nZWQiLCJyZXMiLCJzdGF0ZSIsImNvbmZpcm0iLCJ0aXRsZSIsImJ0bnMiLCJZIiwibGFiZWwiLCJOIiwiY29uc29sZSIsImxvZyIsInByb21wdCIsImlucHV0IiwiZGF0YTEiLCJ0eXBlIiwiZGF0YTIiLCJkYmxhbGVydCIsInNldFRpbWVvdXQiLCJjbG9zZSIsImRibGNvbmZpcm0iLCJLIiwiUyIsIm1vZHVsZURlc3Ryb3kiLCJvZmYiLCJBWDYiLCJkZWZpbmVNdXN0YWNoZSIsImdsb2JhbCIsImZhY3RvcnkiLCJtdXN0YWNoZSIsIm11c3RhY2hlRmFjdG9yeSIsIm9iamVjdFRvU3RyaW5nIiwiT2JqZWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJpc0FycmF5IiwiQXJyYXkiLCJpc0FycmF5UG9seWZpbGwiLCJvYmplY3QiLCJjYWxsIiwiaXNGdW5jdGlvbiIsInR5cGVTdHIiLCJvYmoiLCJlc2NhcGVSZWdFeHAiLCJzdHJpbmciLCJyZXBsYWNlIiwiaGFzUHJvcGVydHkiLCJwcm9wTmFtZSIsInJlZ0V4cFRlc3QiLCJSZWdFeHAiLCJ0ZXN0IiwidGVzdFJlZ0V4cCIsInJlIiwibm9uU3BhY2VSZSIsImlzV2hpdGVzcGFjZSIsImVudGl0eU1hcCIsImVzY2FwZUh0bWwiLCJTdHJpbmciLCJmcm9tRW50aXR5TWFwIiwicyIsIndoaXRlUmUiLCJzcGFjZVJlIiwiZXF1YWxzUmUiLCJjdXJseVJlIiwidGFnUmUiLCJwYXJzZVRlbXBsYXRlIiwidGVtcGxhdGUiLCJ0YWdzIiwic2VjdGlvbnMiLCJ0b2tlbnMiLCJzcGFjZXMiLCJoYXNUYWciLCJub25TcGFjZSIsInN0cmlwU3BhY2UiLCJsZW5ndGgiLCJwb3AiLCJvcGVuaW5nVGFnUmUiLCJjbG9zaW5nVGFnUmUiLCJjbG9zaW5nQ3VybHlSZSIsImNvbXBpbGVUYWdzIiwidGFnc1RvQ29tcGlsZSIsInNwbGl0IiwiRXJyb3IiLCJzY2FubmVyIiwiU2Nhbm5lciIsInN0YXJ0IiwidmFsdWUiLCJjaHIiLCJ0b2tlbiIsIm9wZW5TZWN0aW9uIiwiZW9zIiwicG9zIiwic2NhblVudGlsIiwiaSIsInZhbHVlTGVuZ3RoIiwiY2hhckF0IiwicHVzaCIsInNjYW4iLCJuZXN0VG9rZW5zIiwic3F1YXNoVG9rZW5zIiwic3F1YXNoZWRUb2tlbnMiLCJsYXN0VG9rZW4iLCJudW1Ub2tlbnMiLCJuZXN0ZWRUb2tlbnMiLCJjb2xsZWN0b3IiLCJzZWN0aW9uIiwidGFpbCIsIm1hdGNoIiwiaW5kZXgiLCJzdWJzdHJpbmciLCJzZWFyY2giLCJDb250ZXh0IiwidmlldyIsInBhcmVudENvbnRleHQiLCJjYWNoZSIsInJldHVybnMiLCJrIiwicGFyZW50IiwibG9va3VwIiwibmFtZSIsImhhc093blByb3BlcnR5IiwiY29udGV4dCIsIm5hbWVzIiwibG9va3VwSGl0IiwiaW5kZXhPZiIsIldyaXRlciIsImNsZWFyQ2FjaGUiLCJwYXJzZSIsInJlbmRlciIsInBhcnRpYWxzIiwicmVuZGVyVG9rZW5zIiwib3JpZ2luYWxUZW1wbGF0ZSIsImJ1ZmZlciIsInN5bWJvbCIsInVuZGVmaW5lZCIsInJlbmRlclNlY3Rpb24iLCJyZW5kZXJJbnZlcnRlZCIsInJlbmRlclBhcnRpYWwiLCJ1bmVzY2FwZWRWYWx1ZSIsImVzY2FwZWRWYWx1ZSIsInJhd1ZhbHVlIiwic2VsZiIsInN1YlJlbmRlciIsImoiLCJzbGljZSIsImVzY2FwZSIsInZlcnNpb24iLCJkZWZhdWx0V3JpdGVyIiwiVHlwZUVycm9yIiwidG9faHRtbCIsInNlbmQiLCJyZXN1bHQiLCJkaWFsb2dUbXBsIiwiY29sdW1uS2V5cyIsIm9wdHMiLCJ0aGF0IiwiZ2V0Q29udGVudCIsImRpYWxvZ0lkIiwiZGF0YSIsImNvbmZpZyIsImFkZGl0aW9uYWxDb250ZW50Iiwib3BlbiIsImNhbGxiYWNrIiwiYm94Iiwid2lkdGgiLCJkaWFsb2dDb25maWciLCIkYWN0aXZlRGlhbG9nIiwiaWQiLCJjc3MiLCJkb2N1bWVudCIsImJvZHkiLCJhcHBlbmQiLCJoZWlnaHQiLCJwb3NpdGlvbiIsInRvcCIsIndpbmRvdyIsImxlZnQiLCJ6SW5kZXgiLCJjbGlja0V2ZW50TmFtZSIsImJ0bk9uQ2xpY2siLCJldmVudCIsImZpbmQiLCJkaWFsb2dUeXBlIiwidHJpZ2dlciIsIm9uS2V5dXAiLCJ0aHJvdHRsZSIsImFsaWduIiwiYmluZCIsImF1dG9DbG9zZVRpbWUiLCJhdXRvQ2xvc2VUaW1lciIsImlubmVySGVpZ2h0IiwiaW5uZXJXaWR0aCIsInRhcmdldCIsImVtcHR5S2V5Iiwic3JjRWxlbWVudCIsImZpbmRQYXJlbnROb2RlIiwia2V5IiwiYnRuVGFyZ2V0Iiwib2kiLCJ2YWwiLCJvbkNsaWNrIiwiZG9Ob3RDYWxsYmFjayIsImdldCIsImZvY3VzIiwia2V5Q29kZSIsImV2ZW50S2V5cyIsIkVTQyIsIlJFVFVSTiIsIkFYNlVJRGlhbG9nIiwiaW5zdGFuY2VJZCIsInRoZW1lIiwibGFuZyIsImFuaW1hdGVUaW1lIiwiZXh0ZW5kIiwicXVldWUiLCJpbml0IiwiaW5pdE9uY2UiLCJpbml0aWFsaXplZCIsInRyeUNvdW50IiwiaXNTdHJpbmciLCJvayIsImNhbmNlbCIsIl9vcHRpb24iLCJjbGVhclRpbWVvdXQiLCJhZGRDbGFzcyIsInJlbW92ZSIsInNoaWZ0Il0sIm1hcHBp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Q0FBeUMsc0NBQXNDLHFDQUFxQyxvQ0FBb0MsaUNBQWlDLG1CQUFtQixFQUFFLFFBQVEsMkNBQTJDLHdDQUF3Qyx1Q0FBdUMsc0NBQXNDLG1DQUFtQyxtQkFBbUIsRUFBRSxFQUFFLHlCQUF5QiwrRUFBK0UsNEVBQTRFLHVFQUF1RSxxQ0FBcUMsa0NBQWtDLGlDQUFpQyxnQ0FBZ0MsNkJBQTZCLDJCQUEyQiwyQkFBMkIsMkJBQTJCLHVCQUF1QixxREFBcUQsa0JBQWtCLG9CQUFvQixZQUFZLFdBQVcscUJBQXFCLDJCQUEyQixFQUFFLDJDQUEyQyx1QkFBdUIseUJBQXlCLDJDQUEyQyxFQUFFLG9EQUFvRCx5QkFBeUIsdUJBQXVCLCtCQUErQixFQUFFLHlDQUF5QyxvQkFBb0IseUJBQXlCLEVBQUUsMERBQTBELDBCQUEwQiw2QkFBNkIsRUFBRSw2REFBNkQseUJBQXlCLDhCQUE4QixFQUFFLDhEQUE4RCx5QkFBeUIsRUFBRSx3RkFBd0YsNEJBQTRCLEVBQUUsb0ZBQW9GLHlCQUF5QixFQUFFLDJDQUEyQyxrQkFBa0IsMEJBQTBCLEVBQUUsb0RBQW9ELHVCQUF1QiwrQkFBK0IsRUFBRSxpQ0FBaUMsaUdBQWlHLDhGQUE4Rix5RkFBeUYsRUFBRTs7QUFFbjdIIiwiZmlsZSI6IjEwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERpYWxvZyBmcm9tIFwiLi4vLi4vc3JjL0FYNlVJRGlhbG9nXCI7XG5pbXBvcnQgXCIuLi8uLi9zcmMvQVg2VUlEaWFsb2cvc3R5bGUuc2Nzc1wiO1xuXG5sZXQgaHRtbCA9IGBcbjxhIGNsYXNzPVwid2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0IGJ0blwiIGRhdGEtYnRuPVwiYWxlcnRcIj5hbGVydDwvYT5cbjxhIGNsYXNzPVwid2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0IGJ0blwiIGRhdGEtYnRuPVwiY29uZmlybVwiPmNvbmZpcm08L2E+XG48YSBjbGFzcz1cIndhdmVzLWVmZmVjdCB3YXZlcy1saWdodCBidG5cIiBkYXRhLWJ0bj1cInByb21wdFwiPnByb21wdDwvYT5cbjxoci8+XG48YSBjbGFzcz1cIndhdmVzLWVmZmVjdCB3YXZlcy1saWdodCBidG5cIiBkYXRhLWJ0bj1cImRibGFsZXJ0XCI+ZG91YmxlIGFsZXJ0IGNhbGw8L2E+XG48YSBjbGFzcz1cIndhdmVzLWVmZmVjdCB3YXZlcy1saWdodCBidG5cIiBkYXRhLWJ0bj1cImRibGNvbmZpcm1cIj5kb3VibGUgY29uZmlybSBjYWxsPC9hPlxuYDtcbmxldCBmbiA9IHtcbiAgbW9kdWxlUnVuOiBmdW5jdGlvbiAoJGJvZHkpIHtcblxuICAgIGxldCBkaWFsb2cgPSBuZXcgRGlhbG9nKCk7XG4gICAgZGlhbG9nLnNldENvbmZpZyh7fSk7XG5cbiAgICAkYm9keS5vbihcImNsaWNrXCIsICdbZGF0YS1idG5dJywgKGUpID0+IHtcbiAgICAgIGxldCBidG4gPSBlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1idG5cIik7XG4gICAgICBsZXQgcHJvY2Vzc29yID0ge1xuICAgICAgICBhbGVydCgpIHtcbiAgICAgICAgICBkaWFsb2cuYWxlcnQoe1xuICAgICAgICAgICAgbXNnOiBcImFsZXJ0IFwiICsgbmV3IERhdGUoKSxcbiAgICAgICAgICAgIG9uU3RhdGVDaGFuZ2VkOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgIGlmIChyZXMuc3RhdGUgPT0gXCJvcGVuXCIpIHtcbiAgICAgICAgICAgICAgICAvLyRib2R5LmFwcGVuZCgkYnRuKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAocmVzLnN0YXRlID09IFwiY2xvc2VcIikge1xuICAgICAgICAgICAgICAgIC8vJGJ0bi5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBjb25maXJtKCkge1xuICAgICAgICAgIGRpYWxvZy5jb25maXJtKHtcbiAgICAgICAgICAgIHRpdGxlOiBcIuyYiC/slYTri4jsmKRcIixcbiAgICAgICAgICAgIG1zZzogXCLri7nsi6DsnYAg6rCc67Cc7J6QIOyeheuLiOq5jD9cIixcbiAgICAgICAgICAgIGJ0bnM6IHtcbiAgICAgICAgICAgICAgWToge2xhYmVsOiBcIuyYiFwifSxcbiAgICAgICAgICAgICAgTjoge2xhYmVsOiBcIuyVhOuLiOyYpFwifVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHByb21wdCgpIHtcbiAgICAgICAgICBkaWFsb2cucHJvbXB0KHtcbiAgICAgICAgICAgIHRpdGxlOiBcInByb21wdFwiLFxuICAgICAgICAgICAgbXNnOiAn64uk7J2M7J2YIOqwkuydhCDsnoXroKXtlZjshLjsmpQuJyxcbiAgICAgICAgICAgIGlucHV0OiB7XG4gICAgICAgICAgICAgIGRhdGExOiB7bGFiZWw6IFwiZGF0YTHsnZgg652867KoXCIsIHR5cGU6IFwicGFzc3dvcmRcIn0sXG4gICAgICAgICAgICAgIGRhdGEyOiB7bGFiZWw6IFwiZGF0YTLsnZgg652867KoXCJ9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGRibGFsZXJ0KCkge1xuICAgICAgICAgIGRpYWxvZy5hbGVydCh7XG4gICAgICAgICAgICBtc2c6IFwiYWxlcnQgXCIgKyAobmV3IERhdGUoKSArIFwiIGNsb3NlIDFzIGxhdGVyXCIpLFxuICAgICAgICAgICAgb25TdGF0ZUNoYW5nZWQ6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgaWYgKHJlcy5zdGF0ZSA9PSBcIm9wZW5cIikge1xuICAgICAgICAgICAgICAgIC8vJGJvZHkuYXBwZW5kKCRidG4pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChyZXMuc3RhdGUgPT0gXCJjbG9zZVwiKSB7XG4gICAgICAgICAgICAgICAgLy8kYnRuLnJlbW92ZSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGRpYWxvZy5jbG9zZSgpO1xuICAgICAgICAgICAgZGlhbG9nLmFsZXJ0KHtcbiAgICAgICAgICAgICAgbXNnOiBcImFsZXJ0IFwiICsgKG5ldyBEYXRlKCkpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICB9LFxuICAgICAgICBkYmxjb25maXJtKCkge1xuICAgICAgICAgIGRpYWxvZy5jb25maXJtKHtcbiAgICAgICAgICAgIHRpdGxlOiBcIuyYiC/slYTri4jsmKRcIixcbiAgICAgICAgICAgIG1zZzogXCLri7nsi6DsnYAg6rCc67Cc7J6QIOyeheuLiOq5jD8g67KE7Yq87J2EIOuIhOultOuptCDtlZzrsogg642UIOusvOyWtOu0heuLiOuLpC5cIixcbiAgICAgICAgICAgIGJ0bnM6IHtcbiAgICAgICAgICAgICAgWToge2xhYmVsOiBcIuyYiFwifSxcbiAgICAgICAgICAgICAgTjoge2xhYmVsOiBcIuyVhOuLiOyYpFwifVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBkaWFsb2cuY29uZmlybSh7XG4gICAgICAgICAgICB0aXRsZTogXCLsmIgv7JWE64uI7JikXCIsXG4gICAgICAgICAgICBtc2c6IFwi64u57Iug7J2AIOqwnOuwnOyekCDsnoXri4jquYw/XCIsXG4gICAgICAgICAgICBidG5zOiB7XG4gICAgICAgICAgICAgIEs6IHtsYWJlbDogXCLsmIhcIn0sXG4gICAgICAgICAgICAgIFM6IHtsYWJlbDogXCLslYTri4jsmKRcIn1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgaWYgKGJ0biBpbiBwcm9jZXNzb3IpIHtcbiAgICAgICAgcHJvY2Vzc29yW2J0bl0oKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICB9LFxuICBtb2R1bGVEZXN0cm95OiBmdW5jdGlvbiAoJGJvZHkpIHtcbiAgICAkYm9keS5vZmYoXCJjbGlja1wiKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBodG1sOiBodG1sLFxuICBmbjogZm5cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZGlhbG9nLmpzIiwiLyohXG4gKiBtdXN0YWNoZS5qcyAtIExvZ2ljLWxlc3Mge3ttdXN0YWNoZX19IHRlbXBsYXRlcyB3aXRoIEphdmFTY3JpcHRcbiAqIGh0dHA6Ly9naXRodWIuY29tL2phbmwvbXVzdGFjaGUuanNcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS90aG9tYXNKYW5nL211c3RhY2hlLmpzIC0tIGltcG9yb3ZlIHNvbWUgdmFyaWFibGVzXG4gKi9cblxuXG4vKipcbiAqIEFYNk11c3RhY2hl64qUIGh0dHA6Ly9naXRodWIuY29tL2phbmwvbXVzdGFjaGUuanPsl5Ag66qH6rCA7KeAIOy1nOyGjO2VnOydmCDquLDriqXsnYQg7Yqc64ud7ZWY7JesIOyCrOyaqe2VmOuKlCDthZztlIzrpr8g7JeU7KeE7J6F64uI64ukLlxuICogQG5hbWVzcGFjZSBBWDZNdXN0YWNoZVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBBWDZNdXN0YWNoZS5yZW5kZXJcbiAqIEBleGFtcGxlXG4gKiBgYGBqc1xuICogYXg1Lm11c3RhY2hlLnJlbmRlcih0ZW1wbGF0ZSwgdmlldylcbiAqXG4gKlxuICogLy9BcnJheSBAaVxuICogLy97eyNiZWF0bGVzfX1cbiAqIC8ve3tmaXJzdE5hbWV9fSB7e2xhc3ROYW1lfX0gKHt7QGl9fSkgKHt7QGZpcnN0fX0pXG4gKiAvL3t7L2JlYXRsZXN9fVxuICpcbiAqIC8vT2JqZWN0IEBlYWNoXG4gKiB7eyNiZWF0bGVzfX1cbiAqICB7eyNAZWFjaH19XG4gKiAgICAgIHt7QGtleX19IDoge3tAdmFsdWUuZmlyc3ROYW1lfX0ge3tAdmFsdWUubGFzdE5hbWV9fVxuICogIHt7L0BlYWNofX1cbiAqIHt7L2JlYXRsZXN9fVxuICpcbiAqIGBgYFxuICovXG5cblxuXG5sZXQgQVg2ID0ge307XG5cbihmdW5jdGlvbiBkZWZpbmVNdXN0YWNoZShnbG9iYWwsIGZhY3RvcnkpIHtcblxuICBmYWN0b3J5KGdsb2JhbC5tdXN0YWNoZSA9IHt9KTtcblxufShBWDYsIGZ1bmN0aW9uIG11c3RhY2hlRmFjdG9yeShtdXN0YWNoZSkge1xuXG4gIHZhciBvYmplY3RUb1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG4gIHZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiBpc0FycmF5UG9seWZpbGwob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdFRvU3RyaW5nLmNhbGwob2JqZWN0KSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgfTtcblxuICBmdW5jdGlvbiBpc0Z1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnZnVuY3Rpb24nO1xuICB9XG5cbiAgLyoqXG4gICAqIE1vcmUgY29ycmVjdCB0eXBlb2Ygc3RyaW5nIGhhbmRsaW5nIGFycmF5XG4gICAqIHdoaWNoIG5vcm1hbGx5IHJldHVybnMgdHlwZW9mICdvYmplY3QnXG4gICAqL1xuICBmdW5jdGlvbiB0eXBlU3RyKG9iaikge1xuICAgIHJldHVybiBpc0FycmF5KG9iaikgPyAnYXJyYXknIDogdHlwZW9mIG9iajtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVzY2FwZVJlZ0V4cChzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoL1tcXC1cXFtcXF17fSgpKis/LixcXFxcXFxeJHwjXFxzXS9nLCAnXFxcXCQmJyk7XG4gIH1cblxuICAvKipcbiAgICogTnVsbCBzYWZlIHdheSBvZiBjaGVja2luZyB3aGV0aGVyIG9yIG5vdCBhbiBvYmplY3QsXG4gICAqIGluY2x1ZGluZyBpdHMgcHJvdG90eXBlLCBoYXMgYSBnaXZlbiBwcm9wZXJ0eVxuICAgKi9cbiAgZnVuY3Rpb24gaGFzUHJvcGVydHkob2JqLCBwcm9wTmFtZSkge1xuICAgIHJldHVybiBvYmogIT0gbnVsbCAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiAocHJvcE5hbWUgaW4gb2JqKTtcbiAgfVxuXG4gIC8vIFdvcmthcm91bmQgZm9yIGh0dHBzOi8vaXNzdWVzLmFwYWNoZS5vcmcvamlyYS9icm93c2UvQ09VQ0hEQi01NzdcbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qYW5sL211c3RhY2hlLmpzL2lzc3Vlcy8xODlcbiAgdmFyIHJlZ0V4cFRlc3QgPSBSZWdFeHAucHJvdG90eXBlLnRlc3Q7XG5cbiAgZnVuY3Rpb24gdGVzdFJlZ0V4cChyZSwgc3RyaW5nKSB7XG4gICAgcmV0dXJuIHJlZ0V4cFRlc3QuY2FsbChyZSwgc3RyaW5nKTtcbiAgfVxuXG4gIHZhciBub25TcGFjZVJlID0gL1xcUy87XG5cbiAgZnVuY3Rpb24gaXNXaGl0ZXNwYWNlKHN0cmluZykge1xuICAgIHJldHVybiAhdGVzdFJlZ0V4cChub25TcGFjZVJlLCBzdHJpbmcpO1xuICB9XG5cbiAgdmFyIGVudGl0eU1hcCA9IHtcbiAgICAnJic6ICcmYW1wOycsICc8JzogJyZsdDsnLCAnPic6ICcmZ3Q7JywgJ1wiJzogJyZxdW90OycsIFwiJ1wiOiAnJiMzOTsnLCAnLyc6ICcmI3gyRjsnXG4gIH07XG5cbiAgZnVuY3Rpb24gZXNjYXBlSHRtbChzdHJpbmcpIHtcbiAgICByZXR1cm4gU3RyaW5nKHN0cmluZykucmVwbGFjZSgvWyY8PlwiJ1xcL10vZywgZnVuY3Rpb24gZnJvbUVudGl0eU1hcChzKSB7XG4gICAgICByZXR1cm4gZW50aXR5TWFwW3NdO1xuICAgIH0pO1xuICB9XG5cbiAgdmFyIHdoaXRlUmUgPSAvXFxzKi87XG4gIHZhciBzcGFjZVJlID0gL1xccysvO1xuICB2YXIgZXF1YWxzUmUgPSAvXFxzKj0vO1xuICB2YXIgY3VybHlSZSA9IC9cXHMqXFx9LztcbiAgdmFyIHRhZ1JlID0gLyN8XFxefFxcL3w+fFxce3wmfD18IS87XG5cbiAgLyoqXG4gICAqIEJyZWFrcyB1cCB0aGUgZ2l2ZW4gYHRlbXBsYXRlYCBzdHJpbmcgaW50byBhIHRyZWUgb2YgdG9rZW5zLiBJZiB0aGUgYHRhZ3NgXG4gICAqIGFyZ3VtZW50IGlzIGdpdmVuIGhlcmUgaXQgbXVzdCBiZSBhbiBhcnJheSB3aXRoIHR3byBzdHJpbmcgdmFsdWVzOiB0aGVcbiAgICogb3BlbmluZyBhbmQgY2xvc2luZyB0YWdzIHVzZWQgaW4gdGhlIHRlbXBsYXRlIChlLmcuIFsgXCI8JVwiLCBcIiU+XCIgXSkuIE9mXG4gICAqIGNvdXJzZSwgdGhlIGRlZmF1bHQgaXMgdG8gdXNlIG11c3RhY2hlcyAoaS5lLiBtdXN0YWNoZS50YWdzKS5cbiAgICpcbiAgICogQSB0b2tlbiBpcyBhbiBhcnJheSB3aXRoIGF0IGxlYXN0IDQgZWxlbWVudHMuIFRoZSBmaXJzdCBlbGVtZW50IGlzIHRoZVxuICAgKiBtdXN0YWNoZSBzeW1ib2wgdGhhdCB3YXMgdXNlZCBpbnNpZGUgdGhlIHRhZywgZS5nLiBcIiNcIiBvciBcIiZcIi4gSWYgdGhlIHRhZ1xuICAgKiBkaWQgbm90IGNvbnRhaW4gYSBzeW1ib2wgKGkuZS4ge3tteVZhbHVlfX0pIHRoaXMgZWxlbWVudCBpcyBcIm5hbWVcIi4gRm9yXG4gICAqIGFsbCB0ZXh0IHRoYXQgYXBwZWFycyBvdXRzaWRlIGEgc3ltYm9sIHRoaXMgZWxlbWVudCBpcyBcInRleHRcIi5cbiAgICpcbiAgICogVGhlIHNlY29uZCBlbGVtZW50IG9mIGEgdG9rZW4gaXMgaXRzIFwidmFsdWVcIi4gRm9yIG11c3RhY2hlIHRhZ3MgdGhpcyBpc1xuICAgKiB3aGF0ZXZlciBlbHNlIHdhcyBpbnNpZGUgdGhlIHRhZyBiZXNpZGVzIHRoZSBvcGVuaW5nIHN5bWJvbC4gRm9yIHRleHQgdG9rZW5zXG4gICAqIHRoaXMgaXMgdGhlIHRleHQgaXRzZWxmLlxuICAgKlxuICAgKiBUaGUgdGhpcmQgYW5kIGZvdXJ0aCBlbGVtZW50cyBvZiB0aGUgdG9rZW4gYXJlIHRoZSBzdGFydCBhbmQgZW5kIGluZGljZXMsXG4gICAqIHJlc3BlY3RpdmVseSwgb2YgdGhlIHRva2VuIGluIHRoZSBvcmlnaW5hbCB0ZW1wbGF0ZS5cbiAgICpcbiAgICogVG9rZW5zIHRoYXQgYXJlIHRoZSByb290IG5vZGUgb2YgYSBzdWJ0cmVlIGNvbnRhaW4gdHdvIG1vcmUgZWxlbWVudHM6IDEpIGFuXG4gICAqIGFycmF5IG9mIHRva2VucyBpbiB0aGUgc3VidHJlZSBhbmQgMikgdGhlIGluZGV4IGluIHRoZSBvcmlnaW5hbCB0ZW1wbGF0ZSBhdFxuICAgKiB3aGljaCB0aGUgY2xvc2luZyB0YWcgZm9yIHRoYXQgc2VjdGlvbiBiZWdpbnMuXG4gICAqL1xuICBmdW5jdGlvbiBwYXJzZVRlbXBsYXRlKHRlbXBsYXRlLCB0YWdzKSB7XG4gICAgaWYgKCF0ZW1wbGF0ZSlcbiAgICAgIHJldHVybiBbXTtcblxuICAgIHZhciBzZWN0aW9ucyA9IFtdOyAgICAgLy8gU3RhY2sgdG8gaG9sZCBzZWN0aW9uIHRva2Vuc1xuICAgIHZhciB0b2tlbnMgPSBbXTsgICAgICAgLy8gQnVmZmVyIHRvIGhvbGQgdGhlIHRva2Vuc1xuICAgIHZhciBzcGFjZXMgPSBbXTsgICAgICAgLy8gSW5kaWNlcyBvZiB3aGl0ZXNwYWNlIHRva2VucyBvbiB0aGUgY3VycmVudCBsaW5lXG4gICAgdmFyIGhhc1RhZyA9IGZhbHNlOyAgICAvLyBJcyB0aGVyZSBhIHt7dGFnfX0gb24gdGhlIGN1cnJlbnQgbGluZT9cbiAgICB2YXIgbm9uU3BhY2UgPSBmYWxzZTsgIC8vIElzIHRoZXJlIGEgbm9uLXNwYWNlIGNoYXIgb24gdGhlIGN1cnJlbnQgbGluZT9cblxuICAgIC8vIFN0cmlwcyBhbGwgd2hpdGVzcGFjZSB0b2tlbnMgYXJyYXkgZm9yIHRoZSBjdXJyZW50IGxpbmVcbiAgICAvLyBpZiB0aGVyZSB3YXMgYSB7eyN0YWd9fSBvbiBpdCBhbmQgb3RoZXJ3aXNlIG9ubHkgc3BhY2UuXG4gICAgZnVuY3Rpb24gc3RyaXBTcGFjZSgpIHtcbiAgICAgIGlmIChoYXNUYWcgJiYgIW5vblNwYWNlKSB7XG4gICAgICAgIHdoaWxlIChzcGFjZXMubGVuZ3RoKVxuICAgICAgICAgIGRlbGV0ZSB0b2tlbnNbc3BhY2VzLnBvcCgpXTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBzcGFjZXMgPSBbXTtcbiAgICAgIH1cblxuICAgICAgaGFzVGFnID0gZmFsc2U7XG4gICAgICBub25TcGFjZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBvcGVuaW5nVGFnUmUsIGNsb3NpbmdUYWdSZSwgY2xvc2luZ0N1cmx5UmU7XG5cbiAgICBmdW5jdGlvbiBjb21waWxlVGFncyh0YWdzVG9Db21waWxlKSB7XG4gICAgICBpZiAodHlwZW9mIHRhZ3NUb0NvbXBpbGUgPT09ICdzdHJpbmcnKVxuICAgICAgICB0YWdzVG9Db21waWxlID0gdGFnc1RvQ29tcGlsZS5zcGxpdChzcGFjZVJlLCAyKTtcblxuICAgICAgaWYgKCFpc0FycmF5KHRhZ3NUb0NvbXBpbGUpIHx8IHRhZ3NUb0NvbXBpbGUubGVuZ3RoICE9PSAyKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgdGFnczogJyArIHRhZ3NUb0NvbXBpbGUpO1xuXG4gICAgICBvcGVuaW5nVGFnUmUgPSBuZXcgUmVnRXhwKGVzY2FwZVJlZ0V4cCh0YWdzVG9Db21waWxlWzBdKSArICdcXFxccyonKTtcbiAgICAgIGNsb3NpbmdUYWdSZSA9IG5ldyBSZWdFeHAoJ1xcXFxzKicgKyBlc2NhcGVSZWdFeHAodGFnc1RvQ29tcGlsZVsxXSkpO1xuICAgICAgY2xvc2luZ0N1cmx5UmUgPSBuZXcgUmVnRXhwKCdcXFxccyonICsgZXNjYXBlUmVnRXhwKCd9JyArIHRhZ3NUb0NvbXBpbGVbMV0pKTtcbiAgICB9XG5cbiAgICBjb21waWxlVGFncyh0YWdzIHx8IG11c3RhY2hlLnRhZ3MpO1xuXG4gICAgdmFyIHNjYW5uZXIgPSBuZXcgU2Nhbm5lcih0ZW1wbGF0ZSk7XG5cbiAgICB2YXIgc3RhcnQsIHR5cGUsIHZhbHVlLCBjaHIsIHRva2VuLCBvcGVuU2VjdGlvbjtcbiAgICB3aGlsZSAoIXNjYW5uZXIuZW9zKCkpIHtcbiAgICAgIHN0YXJ0ID0gc2Nhbm5lci5wb3M7XG5cbiAgICAgIC8vIE1hdGNoIGFueSB0ZXh0IGJldHdlZW4gdGFncy5cbiAgICAgIHZhbHVlID0gc2Nhbm5lci5zY2FuVW50aWwob3BlbmluZ1RhZ1JlKTtcblxuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCB2YWx1ZUxlbmd0aCA9IHZhbHVlLmxlbmd0aDsgaSA8IHZhbHVlTGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBjaHIgPSB2YWx1ZS5jaGFyQXQoaSk7XG5cbiAgICAgICAgICBpZiAoaXNXaGl0ZXNwYWNlKGNocikpIHtcbiAgICAgICAgICAgIHNwYWNlcy5wdXNoKHRva2Vucy5sZW5ndGgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG5vblNwYWNlID0gdHJ1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0b2tlbnMucHVzaChbJ3RleHQnLCBjaHIsIHN0YXJ0LCBzdGFydCArIDFdKTtcbiAgICAgICAgICBzdGFydCArPSAxO1xuXG4gICAgICAgICAgLy8gQ2hlY2sgZm9yIHdoaXRlc3BhY2Ugb24gdGhlIGN1cnJlbnQgbGluZS5cbiAgICAgICAgICBpZiAoY2hyID09PSAnXFxuJylcbiAgICAgICAgICAgIHN0cmlwU3BhY2UoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBNYXRjaCB0aGUgb3BlbmluZyB0YWcuXG4gICAgICBpZiAoIXNjYW5uZXIuc2NhbihvcGVuaW5nVGFnUmUpKVxuICAgICAgICBicmVhaztcblxuICAgICAgaGFzVGFnID0gdHJ1ZTtcblxuICAgICAgLy8gR2V0IHRoZSB0YWcgdHlwZS5cbiAgICAgIHR5cGUgPSBzY2FubmVyLnNjYW4odGFnUmUpIHx8ICduYW1lJztcbiAgICAgIHNjYW5uZXIuc2Nhbih3aGl0ZVJlKTtcblxuICAgICAgLy8gR2V0IHRoZSB0YWcgdmFsdWUuXG4gICAgICBpZiAodHlwZSA9PT0gJz0nKSB7XG4gICAgICAgIHZhbHVlID0gc2Nhbm5lci5zY2FuVW50aWwoZXF1YWxzUmUpO1xuICAgICAgICBzY2FubmVyLnNjYW4oZXF1YWxzUmUpO1xuICAgICAgICBzY2FubmVyLnNjYW5VbnRpbChjbG9zaW5nVGFnUmUpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJ3snKSB7XG4gICAgICAgIHZhbHVlID0gc2Nhbm5lci5zY2FuVW50aWwoY2xvc2luZ0N1cmx5UmUpO1xuICAgICAgICBzY2FubmVyLnNjYW4oY3VybHlSZSk7XG4gICAgICAgIHNjYW5uZXIuc2NhblVudGlsKGNsb3NpbmdUYWdSZSk7XG4gICAgICAgIHR5cGUgPSAnJic7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBzY2FubmVyLnNjYW5VbnRpbChjbG9zaW5nVGFnUmUpO1xuICAgICAgfVxuXG4gICAgICAvLyBNYXRjaCB0aGUgY2xvc2luZyB0YWcuXG4gICAgICBpZiAoIXNjYW5uZXIuc2NhbihjbG9zaW5nVGFnUmUpKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuY2xvc2VkIHRhZyBhdCAnICsgc2Nhbm5lci5wb3MpO1xuXG4gICAgICB0b2tlbiA9IFt0eXBlLCB2YWx1ZSwgc3RhcnQsIHNjYW5uZXIucG9zXTtcbiAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcblxuICAgICAgaWYgKHR5cGUgPT09ICcjJyB8fCB0eXBlID09PSAnXicpIHtcbiAgICAgICAgc2VjdGlvbnMucHVzaCh0b2tlbik7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0eXBlID09PSAnLycpIHtcbiAgICAgICAgLy8gQ2hlY2sgc2VjdGlvbiBuZXN0aW5nLlxuICAgICAgICBvcGVuU2VjdGlvbiA9IHNlY3Rpb25zLnBvcCgpO1xuXG4gICAgICAgIGlmICghb3BlblNlY3Rpb24pXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbm9wZW5lZCBzZWN0aW9uIFwiJyArIHZhbHVlICsgJ1wiIGF0ICcgKyBzdGFydCk7XG5cbiAgICAgICAgaWYgKG9wZW5TZWN0aW9uWzFdICE9PSB2YWx1ZSlcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuY2xvc2VkIHNlY3Rpb24gXCInICsgb3BlblNlY3Rpb25bMV0gKyAnXCIgYXQgJyArIHN0YXJ0KTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICduYW1lJyB8fCB0eXBlID09PSAneycgfHwgdHlwZSA9PT0gJyYnKSB7XG4gICAgICAgIG5vblNwYWNlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICc9Jykge1xuICAgICAgICAvLyBTZXQgdGhlIHRhZ3MgZm9yIHRoZSBuZXh0IHRpbWUgYXJvdW5kLlxuICAgICAgICBjb21waWxlVGFncyh2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gTWFrZSBzdXJlIHRoZXJlIGFyZSBubyBvcGVuIHNlY3Rpb25zIHdoZW4gd2UncmUgZG9uZS5cbiAgICBvcGVuU2VjdGlvbiA9IHNlY3Rpb25zLnBvcCgpO1xuXG4gICAgaWYgKG9wZW5TZWN0aW9uKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmNsb3NlZCBzZWN0aW9uIFwiJyArIG9wZW5TZWN0aW9uWzFdICsgJ1wiIGF0ICcgKyBzY2FubmVyLnBvcyk7XG5cbiAgICByZXR1cm4gbmVzdFRva2VucyhzcXVhc2hUb2tlbnModG9rZW5zKSk7XG4gIH1cblxuICAvKipcbiAgICogQ29tYmluZXMgdGhlIHZhbHVlcyBvZiBjb25zZWN1dGl2ZSB0ZXh0IHRva2VucyBpbiB0aGUgZ2l2ZW4gYHRva2Vuc2AgYXJyYXlcbiAgICogdG8gYSBzaW5nbGUgdG9rZW4uXG4gICAqL1xuICBmdW5jdGlvbiBzcXVhc2hUb2tlbnModG9rZW5zKSB7XG4gICAgdmFyIHNxdWFzaGVkVG9rZW5zID0gW107XG5cbiAgICB2YXIgdG9rZW4sIGxhc3RUb2tlbjtcbiAgICBmb3IgKHZhciBpID0gMCwgbnVtVG9rZW5zID0gdG9rZW5zLmxlbmd0aDsgaSA8IG51bVRva2VuczsgKytpKSB7XG4gICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcblxuICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgIGlmICh0b2tlblswXSA9PT0gJ3RleHQnICYmIGxhc3RUb2tlbiAmJiBsYXN0VG9rZW5bMF0gPT09ICd0ZXh0Jykge1xuICAgICAgICAgIGxhc3RUb2tlblsxXSArPSB0b2tlblsxXTtcbiAgICAgICAgICBsYXN0VG9rZW5bM10gPSB0b2tlblszXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBzcXVhc2hlZFRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgICBsYXN0VG9rZW4gPSB0b2tlbjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzcXVhc2hlZFRva2VucztcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JtcyB0aGUgZ2l2ZW4gYXJyYXkgb2YgYHRva2Vuc2AgaW50byBhIG5lc3RlZCB0cmVlIHN0cnVjdHVyZSB3aGVyZVxuICAgKiB0b2tlbnMgdGhhdCByZXByZXNlbnQgYSBzZWN0aW9uIGhhdmUgdHdvIGFkZGl0aW9uYWwgaXRlbXM6IDEpIGFuIGFycmF5IG9mXG4gICAqIGFsbCB0b2tlbnMgdGhhdCBhcHBlYXIgaW4gdGhhdCBzZWN0aW9uIGFuZCAyKSB0aGUgaW5kZXggaW4gdGhlIG9yaWdpbmFsXG4gICAqIHRlbXBsYXRlIHRoYXQgcmVwcmVzZW50cyB0aGUgZW5kIG9mIHRoYXQgc2VjdGlvbi5cbiAgICovXG4gIGZ1bmN0aW9uIG5lc3RUb2tlbnModG9rZW5zKSB7XG4gICAgdmFyIG5lc3RlZFRva2VucyA9IFtdO1xuICAgIHZhciBjb2xsZWN0b3IgPSBuZXN0ZWRUb2tlbnM7XG4gICAgdmFyIHNlY3Rpb25zID0gW107XG5cbiAgICB2YXIgdG9rZW4sIHNlY3Rpb247XG4gICAgZm9yICh2YXIgaSA9IDAsIG51bVRva2VucyA9IHRva2Vucy5sZW5ndGg7IGkgPCBudW1Ub2tlbnM7ICsraSkge1xuICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XG5cbiAgICAgIHN3aXRjaCAodG9rZW5bMF0pIHtcbiAgICAgICAgY2FzZSAnIyc6XG4gICAgICAgIGNhc2UgJ14nOlxuICAgICAgICAgIGNvbGxlY3Rvci5wdXNoKHRva2VuKTtcbiAgICAgICAgICBzZWN0aW9ucy5wdXNoKHRva2VuKTtcbiAgICAgICAgICBjb2xsZWN0b3IgPSB0b2tlbls0XSA9IFtdO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICcvJzpcbiAgICAgICAgICBzZWN0aW9uID0gc2VjdGlvbnMucG9wKCk7XG4gICAgICAgICAgc2VjdGlvbls1XSA9IHRva2VuWzJdO1xuICAgICAgICAgIGNvbGxlY3RvciA9IHNlY3Rpb25zLmxlbmd0aCA+IDAgPyBzZWN0aW9uc1tzZWN0aW9ucy5sZW5ndGggLSAxXVs0XSA6IG5lc3RlZFRva2VucztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb2xsZWN0b3IucHVzaCh0b2tlbik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5lc3RlZFRva2VucztcbiAgfVxuXG4gIC8qKlxuICAgKiBBIHNpbXBsZSBzdHJpbmcgc2Nhbm5lciB0aGF0IGlzIHVzZWQgYnkgdGhlIHRlbXBsYXRlIHBhcnNlciB0byBmaW5kXG4gICAqIHRva2VucyBpbiB0ZW1wbGF0ZSBzdHJpbmdzLlxuICAgKi9cbiAgZnVuY3Rpb24gU2Nhbm5lcihzdHJpbmcpIHtcbiAgICB0aGlzLnN0cmluZyA9IHN0cmluZztcbiAgICB0aGlzLnRhaWwgPSBzdHJpbmc7XG4gICAgdGhpcy5wb3MgPSAwO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYHRydWVgIGlmIHRoZSB0YWlsIGlzIGVtcHR5IChlbmQgb2Ygc3RyaW5nKS5cbiAgICovXG4gIFNjYW5uZXIucHJvdG90eXBlLmVvcyA9IGZ1bmN0aW9uIGVvcygpIHtcbiAgICByZXR1cm4gdGhpcy50YWlsID09PSAnJztcbiAgfTtcblxuICAvKipcbiAgICogVHJpZXMgdG8gbWF0Y2ggdGhlIGdpdmVuIHJlZ3VsYXIgZXhwcmVzc2lvbiBhdCB0aGUgY3VycmVudCBwb3NpdGlvbi5cbiAgICogUmV0dXJucyB0aGUgbWF0Y2hlZCB0ZXh0IGlmIGl0IGNhbiBtYXRjaCwgdGhlIGVtcHR5IHN0cmluZyBvdGhlcndpc2UuXG4gICAqL1xuICBTY2FubmVyLnByb3RvdHlwZS5zY2FuID0gZnVuY3Rpb24gc2NhbihyZSkge1xuICAgIHZhciBtYXRjaCA9IHRoaXMudGFpbC5tYXRjaChyZSk7XG5cbiAgICBpZiAoIW1hdGNoIHx8IG1hdGNoLmluZGV4ICE9PSAwKVxuICAgICAgcmV0dXJuICcnO1xuXG4gICAgdmFyIHN0cmluZyA9IG1hdGNoWzBdO1xuXG4gICAgdGhpcy50YWlsID0gdGhpcy50YWlsLnN1YnN0cmluZyhzdHJpbmcubGVuZ3RoKTtcbiAgICB0aGlzLnBvcyArPSBzdHJpbmcubGVuZ3RoO1xuXG4gICAgcmV0dXJuIHN0cmluZztcbiAgfTtcblxuICAvKipcbiAgICogU2tpcHMgYWxsIHRleHQgdW50aWwgdGhlIGdpdmVuIHJlZ3VsYXIgZXhwcmVzc2lvbiBjYW4gYmUgbWF0Y2hlZC4gUmV0dXJuc1xuICAgKiB0aGUgc2tpcHBlZCBzdHJpbmcsIHdoaWNoIGlzIHRoZSBlbnRpcmUgdGFpbCBpZiBubyBtYXRjaCBjYW4gYmUgbWFkZS5cbiAgICovXG4gIFNjYW5uZXIucHJvdG90eXBlLnNjYW5VbnRpbCA9IGZ1bmN0aW9uIHNjYW5VbnRpbChyZSkge1xuICAgIHZhciBpbmRleCA9IHRoaXMudGFpbC5zZWFyY2gocmUpLCBtYXRjaDtcblxuICAgIHN3aXRjaCAoaW5kZXgpIHtcbiAgICAgIGNhc2UgLTE6XG4gICAgICAgIG1hdGNoID0gdGhpcy50YWlsO1xuICAgICAgICB0aGlzLnRhaWwgPSAnJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIG1hdGNoID0gJyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbWF0Y2ggPSB0aGlzLnRhaWwuc3Vic3RyaW5nKDAsIGluZGV4KTtcbiAgICAgICAgdGhpcy50YWlsID0gdGhpcy50YWlsLnN1YnN0cmluZyhpbmRleCk7XG4gICAgfVxuXG4gICAgdGhpcy5wb3MgKz0gbWF0Y2gubGVuZ3RoO1xuXG4gICAgcmV0dXJuIG1hdGNoO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXByZXNlbnRzIGEgcmVuZGVyaW5nIGNvbnRleHQgYnkgd3JhcHBpbmcgYSB2aWV3IG9iamVjdCBhbmRcbiAgICogbWFpbnRhaW5pbmcgYSByZWZlcmVuY2UgdG8gdGhlIHBhcmVudCBjb250ZXh0LlxuICAgKi9cbiAgZnVuY3Rpb24gQ29udGV4dCh2aWV3LCBwYXJlbnRDb250ZXh0KSB7XG4gICAgdGhpcy52aWV3ID0gdmlldztcbiAgICB0aGlzLmNhY2hlID0ge1xuICAgICAgJy4nOiB0aGlzLnZpZXcsXG4gICAgICAnQGVhY2gnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByZXR1cm5zID0gW107XG4gICAgICAgIGZvciAodmFyIGsgaW4gdGhpcykge1xuICAgICAgICAgIHJldHVybnMucHVzaCh7J0BrZXknOiBrLCAnQHZhbHVlJzogdGhpc1trXX0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXR1cm5zO1xuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5wYXJlbnQgPSBwYXJlbnRDb250ZXh0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgY29udGV4dCB1c2luZyB0aGUgZ2l2ZW4gdmlldyB3aXRoIHRoaXMgY29udGV4dFxuICAgKiBhcyB0aGUgcGFyZW50LlxuICAgKi9cbiAgQ29udGV4dC5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIHB1c2godmlldykge1xuICAgIHJldHVybiBuZXcgQ29udGV4dCh2aWV3LCB0aGlzKTtcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhlIGdpdmVuIG5hbWUgaW4gdGhpcyBjb250ZXh0LCB0cmF2ZXJzaW5nXG4gICAqIHVwIHRoZSBjb250ZXh0IGhpZXJhcmNoeSBpZiB0aGUgdmFsdWUgaXMgYWJzZW50IGluIHRoaXMgY29udGV4dCdzIHZpZXcuXG4gICAqL1xuICBDb250ZXh0LnByb3RvdHlwZS5sb29rdXAgPSBmdW5jdGlvbiBsb29rdXAobmFtZSkge1xuICAgIHZhciBjYWNoZSA9IHRoaXMuY2FjaGU7XG5cbiAgICB2YXIgdmFsdWU7XG4gICAgaWYgKGNhY2hlLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICB2YWx1ZSA9IGNhY2hlW25hbWVdO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcywgbmFtZXMsIGluZGV4LCBsb29rdXBIaXQgPSBmYWxzZTtcblxuICAgICAgd2hpbGUgKGNvbnRleHQpIHtcbiAgICAgICAgaWYgKG5hbWUuaW5kZXhPZignLicpID4gMCkge1xuICAgICAgICAgIHZhbHVlID0gY29udGV4dC52aWV3O1xuICAgICAgICAgIG5hbWVzID0gbmFtZS5zcGxpdCgnLicpO1xuICAgICAgICAgIGluZGV4ID0gMDtcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIFVzaW5nIHRoZSBkb3Qgbm90aW9uIHBhdGggaW4gYG5hbWVgLCB3ZSBkZXNjZW5kIHRocm91Z2ggdGhlXG4gICAgICAgICAgICogbmVzdGVkIG9iamVjdHMuXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBUbyBiZSBjZXJ0YWluIHRoYXQgdGhlIGxvb2t1cCBoYXMgYmVlbiBzdWNjZXNzZnVsLCB3ZSBoYXZlIHRvXG4gICAgICAgICAgICogY2hlY2sgaWYgdGhlIGxhc3Qgb2JqZWN0IGluIHRoZSBwYXRoIGFjdHVhbGx5IGhhcyB0aGUgcHJvcGVydHlcbiAgICAgICAgICAgKiB3ZSBhcmUgbG9va2luZyBmb3IuIFdlIHN0b3JlIHRoZSByZXN1bHQgaW4gYGxvb2t1cEhpdGAuXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBUaGlzIGlzIHNwZWNpYWxseSBuZWNlc3NhcnkgZm9yIHdoZW4gdGhlIHZhbHVlIGhhcyBiZWVuIHNldCB0b1xuICAgICAgICAgICAqIGB1bmRlZmluZWRgIGFuZCB3ZSB3YW50IHRvIGF2b2lkIGxvb2tpbmcgdXAgcGFyZW50IGNvbnRleHRzLlxuICAgICAgICAgICAqKi9cbiAgICAgICAgICB3aGlsZSAodmFsdWUgIT0gbnVsbCAmJiBpbmRleCA8IG5hbWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGluZGV4ID09PSBuYW1lcy5sZW5ndGggLSAxKVxuICAgICAgICAgICAgICBsb29rdXBIaXQgPSBoYXNQcm9wZXJ0eSh2YWx1ZSwgbmFtZXNbaW5kZXhdKTtcblxuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZVtuYW1lc1tpbmRleCsrXV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHZhbHVlID0gY29udGV4dC52aWV3W25hbWVdO1xuICAgICAgICAgIGxvb2t1cEhpdCA9IGhhc1Byb3BlcnR5KGNvbnRleHQudmlldywgbmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobG9va3VwSGl0KVxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNvbnRleHQgPSBjb250ZXh0LnBhcmVudDtcbiAgICAgIH1cblxuICAgICAgY2FjaGVbbmFtZV0gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpXG4gICAgICB2YWx1ZSA9IHZhbHVlLmNhbGwodGhpcy52aWV3KTtcblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcblxuICAvKipcbiAgICogQSBXcml0ZXIga25vd3MgaG93IHRvIHRha2UgYSBzdHJlYW0gb2YgdG9rZW5zIGFuZCByZW5kZXIgdGhlbSB0byBhXG4gICAqIHN0cmluZywgZ2l2ZW4gYSBjb250ZXh0LiBJdCBhbHNvIG1haW50YWlucyBhIGNhY2hlIG9mIHRlbXBsYXRlcyB0b1xuICAgKiBhdm9pZCB0aGUgbmVlZCB0byBwYXJzZSB0aGUgc2FtZSB0ZW1wbGF0ZSB0d2ljZS5cbiAgICovXG4gIGZ1bmN0aW9uIFdyaXRlcigpIHtcbiAgICB0aGlzLmNhY2hlID0ge307XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIGFsbCBjYWNoZWQgdGVtcGxhdGVzIGluIHRoaXMgd3JpdGVyLlxuICAgKi9cbiAgV3JpdGVyLnByb3RvdHlwZS5jbGVhckNhY2hlID0gZnVuY3Rpb24gY2xlYXJDYWNoZSgpIHtcbiAgICB0aGlzLmNhY2hlID0ge307XG4gIH07XG5cbiAgLyoqXG4gICAqIFBhcnNlcyBhbmQgY2FjaGVzIHRoZSBnaXZlbiBgdGVtcGxhdGVgIGFuZCByZXR1cm5zIHRoZSBhcnJheSBvZiB0b2tlbnNcbiAgICogdGhhdCBpcyBnZW5lcmF0ZWQgZnJvbSB0aGUgcGFyc2UuXG4gICAqL1xuICBXcml0ZXIucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24gcGFyc2UodGVtcGxhdGUsIHRhZ3MpIHtcbiAgICB2YXIgY2FjaGUgPSB0aGlzLmNhY2hlO1xuICAgIHZhciB0b2tlbnMgPSBjYWNoZVt0ZW1wbGF0ZV07XG5cbiAgICBpZiAodG9rZW5zID09IG51bGwpXG4gICAgICB0b2tlbnMgPSBjYWNoZVt0ZW1wbGF0ZV0gPSBwYXJzZVRlbXBsYXRlKHRlbXBsYXRlLCB0YWdzKTtcblxuICAgIHJldHVybiB0b2tlbnM7XG4gIH07XG5cbiAgLyoqXG4gICAqIEhpZ2gtbGV2ZWwgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byByZW5kZXIgdGhlIGdpdmVuIGB0ZW1wbGF0ZWAgd2l0aFxuICAgKiB0aGUgZ2l2ZW4gYHZpZXdgLlxuICAgKlxuICAgKiBUaGUgb3B0aW9uYWwgYHBhcnRpYWxzYCBhcmd1bWVudCBtYXkgYmUgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgdGhlXG4gICAqIG5hbWVzIGFuZCB0ZW1wbGF0ZXMgb2YgcGFydGlhbHMgdGhhdCBhcmUgdXNlZCBpbiB0aGUgdGVtcGxhdGUuIEl0IG1heVxuICAgKiBhbHNvIGJlIGEgZnVuY3Rpb24gdGhhdCBpcyB1c2VkIHRvIGxvYWQgcGFydGlhbCB0ZW1wbGF0ZXMgb24gdGhlIGZseVxuICAgKiB0aGF0IHRha2VzIGEgc2luZ2xlIGFyZ3VtZW50OiB0aGUgbmFtZSBvZiB0aGUgcGFydGlhbC5cbiAgICovXG4gIFdyaXRlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscykge1xuICAgIHZhciB0b2tlbnMgPSB0aGlzLnBhcnNlKHRlbXBsYXRlKTtcbiAgICB2YXIgY29udGV4dCA9ICh2aWV3IGluc3RhbmNlb2YgQ29udGV4dCkgPyB2aWV3IDogbmV3IENvbnRleHQodmlldyk7XG4gICAgcmV0dXJuIHRoaXMucmVuZGVyVG9rZW5zKHRva2VucywgY29udGV4dCwgcGFydGlhbHMsIHRlbXBsYXRlKTtcbiAgfTtcblxuICAvKipcbiAgICogTG93LWxldmVsIG1ldGhvZCB0aGF0IHJlbmRlcnMgdGhlIGdpdmVuIGFycmF5IG9mIGB0b2tlbnNgIHVzaW5nXG4gICAqIHRoZSBnaXZlbiBgY29udGV4dGAgYW5kIGBwYXJ0aWFsc2AuXG4gICAqXG4gICAqIE5vdGU6IFRoZSBgb3JpZ2luYWxUZW1wbGF0ZWAgaXMgb25seSBldmVyIHVzZWQgdG8gZXh0cmFjdCB0aGUgcG9ydGlvblxuICAgKiBvZiB0aGUgb3JpZ2luYWwgdGVtcGxhdGUgdGhhdCB3YXMgY29udGFpbmVkIGluIGEgaGlnaGVyLW9yZGVyIHNlY3Rpb24uXG4gICAqIElmIHRoZSB0ZW1wbGF0ZSBkb2Vzbid0IHVzZSBoaWdoZXItb3JkZXIgc2VjdGlvbnMsIHRoaXMgYXJndW1lbnQgbWF5XG4gICAqIGJlIG9taXR0ZWQuXG4gICAqL1xuICBXcml0ZXIucHJvdG90eXBlLnJlbmRlclRva2VucyA9IGZ1bmN0aW9uIHJlbmRlclRva2Vucyh0b2tlbnMsIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKSB7XG4gICAgdmFyIGJ1ZmZlciA9ICcnO1xuICAgIHZhciB0b2tlbiwgc3ltYm9sLCB2YWx1ZTtcbiAgICBmb3IgKHZhciBpID0gMCwgbnVtVG9rZW5zID0gdG9rZW5zLmxlbmd0aDsgaSA8IG51bVRva2VuczsgKytpKSB7XG4gICAgICB2YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgIHRva2VuID0gdG9rZW5zW2ldO1xuICAgICAgc3ltYm9sID0gdG9rZW5bMF07XG5cbiAgICAgIGlmIChzeW1ib2wgPT09ICcjJykgdmFsdWUgPSB0aGlzLnJlbmRlclNlY3Rpb24odG9rZW4sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgICAgIGVsc2UgaWYgKHN5bWJvbCA9PT0gJ14nKSB2YWx1ZSA9IHRoaXMucmVuZGVySW52ZXJ0ZWQodG9rZW4sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgICAgIGVsc2UgaWYgKHN5bWJvbCA9PT0gJz4nKSB2YWx1ZSA9IHRoaXMucmVuZGVyUGFydGlhbCh0b2tlbiwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xuICAgICAgZWxzZSBpZiAoc3ltYm9sID09PSAnJicpIHZhbHVlID0gdGhpcy51bmVzY2FwZWRWYWx1ZSh0b2tlbiwgY29udGV4dCk7XG4gICAgICBlbHNlIGlmIChzeW1ib2wgPT09ICduYW1lJykgdmFsdWUgPSB0aGlzLmVzY2FwZWRWYWx1ZSh0b2tlbiwgY29udGV4dCk7XG4gICAgICBlbHNlIGlmIChzeW1ib2wgPT09ICd0ZXh0JykgdmFsdWUgPSB0aGlzLnJhd1ZhbHVlKHRva2VuKTtcblxuICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpXG4gICAgICAgIGJ1ZmZlciArPSB2YWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmZmVyO1xuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUucmVuZGVyU2VjdGlvbiA9IGZ1bmN0aW9uIHJlbmRlclNlY3Rpb24odG9rZW4sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBidWZmZXIgPSAnJztcblxuICAgIHZhciB2YWx1ZSA9IGNvbnRleHQubG9va3VwKHRva2VuWzFdKTtcblxuICAgIC8vIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byByZW5kZXIgYW4gYXJiaXRyYXJ5IHRlbXBsYXRlXG4gICAgLy8gaW4gdGhlIGN1cnJlbnQgY29udGV4dCBieSBoaWdoZXItb3JkZXIgc2VjdGlvbnMuXG4gICAgZnVuY3Rpb24gc3ViUmVuZGVyKHRlbXBsYXRlKSB7XG4gICAgICByZXR1cm4gc2VsZi5yZW5kZXIodGVtcGxhdGUsIGNvbnRleHQsIHBhcnRpYWxzKTtcbiAgICB9XG5cbiAgICBpZiAoIXZhbHVlKSByZXR1cm47XG5cbiAgICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIGZvciAodmFyIGogPSAwLCB2YWx1ZUxlbmd0aCA9IHZhbHVlLmxlbmd0aDsgaiA8IHZhbHVlTGVuZ3RoOyArK2opIHtcbiAgICAgICAgaWYgKHZhbHVlW2pdKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZVtqXSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHZhbHVlW2pdWydAaSddID0gajtcbiAgICAgICAgICAgIHZhbHVlW2pdWydAZmlyc3QnXSA9IChqID09PSAwKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBidWZmZXIgKz0gdGhpcy5yZW5kZXJUb2tlbnModG9rZW5bNF0sIGNvbnRleHQucHVzaCh2YWx1ZVtqXSksIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgYnVmZmVyICs9IHRoaXMucmVuZGVyVG9rZW5zKHRva2VuWzRdLCBjb250ZXh0LnB1c2godmFsdWUpLCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgICBpZiAodHlwZW9mIG9yaWdpbmFsVGVtcGxhdGUgIT09ICdzdHJpbmcnKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCB1c2UgaGlnaGVyLW9yZGVyIHNlY3Rpb25zIHdpdGhvdXQgdGhlIG9yaWdpbmFsIHRlbXBsYXRlJyk7XG5cbiAgICAgIC8vIEV4dHJhY3QgdGhlIHBvcnRpb24gb2YgdGhlIG9yaWdpbmFsIHRlbXBsYXRlIHRoYXQgdGhlIHNlY3Rpb24gY29udGFpbnMuXG4gICAgICB2YWx1ZSA9IHZhbHVlLmNhbGwoY29udGV4dC52aWV3LCBvcmlnaW5hbFRlbXBsYXRlLnNsaWNlKHRva2VuWzNdLCB0b2tlbls1XSksIHN1YlJlbmRlcik7XG5cbiAgICAgIGlmICh2YWx1ZSAhPSBudWxsKVxuICAgICAgICBidWZmZXIgKz0gdmFsdWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgYnVmZmVyICs9IHRoaXMucmVuZGVyVG9rZW5zKHRva2VuWzRdLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XG4gICAgfVxuICAgIHJldHVybiBidWZmZXI7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5yZW5kZXJJbnZlcnRlZCA9IGZ1bmN0aW9uIHJlbmRlckludmVydGVkKHRva2VuLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSkge1xuICAgIHZhciB2YWx1ZSA9IGNvbnRleHQubG9va3VwKHRva2VuWzFdKTtcblxuICAgIC8vIFVzZSBKYXZhU2NyaXB0J3MgZGVmaW5pdGlvbiBvZiBmYWxzeS4gSW5jbHVkZSBlbXB0eSBhcnJheXMuXG4gICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qYW5sL211c3RhY2hlLmpzL2lzc3Vlcy8xODZcbiAgICBpZiAoIXZhbHVlIHx8IChpc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPT09IDApKVxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyVG9rZW5zKHRva2VuWzRdLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5yZW5kZXJQYXJ0aWFsID0gZnVuY3Rpb24gcmVuZGVyUGFydGlhbCh0b2tlbiwgY29udGV4dCwgcGFydGlhbHMpIHtcbiAgICBpZiAoIXBhcnRpYWxzKSByZXR1cm47XG5cbiAgICB2YXIgdmFsdWUgPSBpc0Z1bmN0aW9uKHBhcnRpYWxzKSA/IHBhcnRpYWxzKHRva2VuWzFdKSA6IHBhcnRpYWxzW3Rva2VuWzFdXTtcbiAgICBpZiAodmFsdWUgIT0gbnVsbClcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlclRva2Vucyh0aGlzLnBhcnNlKHZhbHVlKSwgY29udGV4dCwgcGFydGlhbHMsIHZhbHVlKTtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLnVuZXNjYXBlZFZhbHVlID0gZnVuY3Rpb24gdW5lc2NhcGVkVmFsdWUodG9rZW4sIGNvbnRleHQpIHtcbiAgICB2YXIgdmFsdWUgPSBjb250ZXh0Lmxvb2t1cCh0b2tlblsxXSk7XG4gICAgaWYgKHZhbHVlICE9IG51bGwpXG4gICAgICByZXR1cm4gdmFsdWU7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5lc2NhcGVkVmFsdWUgPSBmdW5jdGlvbiBlc2NhcGVkVmFsdWUodG9rZW4sIGNvbnRleHQpIHtcbiAgICB2YXIgdmFsdWUgPSBjb250ZXh0Lmxvb2t1cCh0b2tlblsxXSk7XG4gICAgaWYgKHZhbHVlICE9IG51bGwpXG4gICAgICByZXR1cm4gbXVzdGFjaGUuZXNjYXBlKHZhbHVlKTtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLnJhd1ZhbHVlID0gZnVuY3Rpb24gcmF3VmFsdWUodG9rZW4pIHtcbiAgICByZXR1cm4gdG9rZW5bMV07XG4gIH07XG5cbiAgbXVzdGFjaGUubmFtZSA9ICdtdXN0YWNoZS5qcyc7XG4gIG11c3RhY2hlLnZlcnNpb24gPSAnMi4xLjMnO1xuICBtdXN0YWNoZS50YWdzID0gWyd7eycsICd9fSddO1xuXG4gIC8vIEFsbCBoaWdoLWxldmVsIG11c3RhY2hlLiogZnVuY3Rpb25zIHVzZSB0aGlzIHdyaXRlci5cbiAgdmFyIGRlZmF1bHRXcml0ZXIgPSBuZXcgV3JpdGVyKCk7XG5cbiAgLyoqXG4gICAqIENsZWFycyBhbGwgY2FjaGVkIHRlbXBsYXRlcyBpbiB0aGUgZGVmYXVsdCB3cml0ZXIuXG4gICAqL1xuICBtdXN0YWNoZS5jbGVhckNhY2hlID0gZnVuY3Rpb24gY2xlYXJDYWNoZSgpIHtcbiAgICByZXR1cm4gZGVmYXVsdFdyaXRlci5jbGVhckNhY2hlKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFBhcnNlcyBhbmQgY2FjaGVzIHRoZSBnaXZlbiB0ZW1wbGF0ZSBpbiB0aGUgZGVmYXVsdCB3cml0ZXIgYW5kIHJldHVybnMgdGhlXG4gICAqIGFycmF5IG9mIHRva2VucyBpdCBjb250YWlucy4gRG9pbmcgdGhpcyBhaGVhZCBvZiB0aW1lIGF2b2lkcyB0aGUgbmVlZCB0b1xuICAgKiBwYXJzZSB0ZW1wbGF0ZXMgb24gdGhlIGZseSBhcyB0aGV5IGFyZSByZW5kZXJlZC5cbiAgICovXG4gIG11c3RhY2hlLnBhcnNlID0gZnVuY3Rpb24gcGFyc2UodGVtcGxhdGUsIHRhZ3MpIHtcbiAgICByZXR1cm4gZGVmYXVsdFdyaXRlci5wYXJzZSh0ZW1wbGF0ZSwgdGFncyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbmRlcnMgdGhlIGB0ZW1wbGF0ZWAgd2l0aCB0aGUgZ2l2ZW4gYHZpZXdgIGFuZCBgcGFydGlhbHNgIHVzaW5nIHRoZVxuICAgKiBkZWZhdWx0IHdyaXRlci5cbiAgICovXG4gIG11c3RhY2hlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcih0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMpIHtcbiAgICBpZiAodHlwZW9mIHRlbXBsYXRlICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCB0ZW1wbGF0ZSEgVGVtcGxhdGUgc2hvdWxkIGJlIGEgXCJzdHJpbmdcIiAnICsgJ2J1dCBcIicgKyB0eXBlU3RyKHRlbXBsYXRlKSArICdcIiB3YXMgZ2l2ZW4gYXMgdGhlIGZpcnN0ICcgKyAnYXJndW1lbnQgZm9yIG11c3RhY2hlI3JlbmRlcih0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMpJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlZmF1bHRXcml0ZXIucmVuZGVyKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscyk7XG4gIH07XG5cbiAgLy8gVGhpcyBpcyBoZXJlIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSB3aXRoIDAuNC54LixcbiAgLyplc2xpbnQtZGlzYWJsZSAqLyAvLyBlc2xpbnQgd2FudHMgY2FtZWwgY2FzZWQgZnVuY3Rpb24gbmFtZVxuICBtdXN0YWNoZS50b19odG1sID0gZnVuY3Rpb24gdG9faHRtbCh0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMsIHNlbmQpIHtcbiAgICAvKmVzbGludC1lbmFibGUqL1xuXG4gICAgdmFyIHJlc3VsdCA9IG11c3RhY2hlLnJlbmRlcih0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMpO1xuXG4gICAgaWYgKGlzRnVuY3Rpb24oc2VuZCkpIHtcbiAgICAgIHNlbmQocmVzdWx0KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfTtcblxuICAvLyBFeHBvcnQgdGhlIGVzY2FwaW5nIGZ1bmN0aW9uIHNvIHRoYXQgdGhlIHVzZXIgbWF5IG92ZXJyaWRlIGl0LlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2phbmwvbXVzdGFjaGUuanMvaXNzdWVzLzI0NFxuICBtdXN0YWNoZS5lc2NhcGUgPSBlc2NhcGVIdG1sO1xuXG4gIC8vIEV4cG9ydCB0aGVzZSBtYWlubHkgZm9yIHRlc3RpbmcsIGJ1dCBhbHNvIGZvciBhZHZhbmNlZCB1c2FnZS5cbiAgbXVzdGFjaGUuU2Nhbm5lciA9IFNjYW5uZXI7XG4gIG11c3RhY2hlLkNvbnRleHQgPSBDb250ZXh0O1xuICBtdXN0YWNoZS5Xcml0ZXIgPSBXcml0ZXI7XG5cbn0pKTtcblxuZXhwb3J0IGRlZmF1bHQgQVg2Lm11c3RhY2hlO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9zcmMvQVg2TXVzdGFjaGUuanMiLCJpbXBvcnQgalF1ZXJ5IGZyb20gXCJqcW1pblwiO1xuaW1wb3J0IEFYNlVJQ29yZSBmcm9tIFwiLi9BWDZVSUNvcmUuanNcIjtcbmltcG9ydCBVIGZyb20gXCIuL0FYNlV0aWwuanNcIjtcbmltcG9ydCBpbmZvIGZyb20gXCIuL0FYNkluZm8uanNcIjtcbmltcG9ydCBtdXN0YWNoZSBmcm9tIFwiLi9BWDZNdXN0YWNoZS5qc1wiO1xuXG4vKiB+fn5+fn5+fn5+fn5+fn5+fn4gZW5kIG9mIGltcG9ydCAgfn5+fn5+fn5+fn5+fn5+fn5+fn4gKi9cblxuY29uc3QgZGlhbG9nVG1wbCA9IGZ1bmN0aW9uIChjb2x1bW5LZXlzKSB7XG4gIHJldHVybiBgIFxuPGRpdiBpZD1cInt7ZGlhbG9nSWR9fVwiIGRhdGEtZGlhbG9nLWVscz1cInJvb3RcIiBkYXRhLWF4NnVpLWRpYWxvZz1cIlwiIGNsYXNzPVwie3t0aGVtZX19XCI+XG4gICAgPGRpdiBjbGFzcz1cImF4LWRpYWxvZy1oZWFkZXJcIiBkYXRhLWRpYWxvZy1lbHM9XCJoZWFkZXJcIj5cbiAgICAgICAge3t7dGl0bGV9fX1cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiYXgtZGlhbG9nLWJvZHlcIiBkYXRhLWRpYWxvZy1lbHM9XCJib2R5XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJheC1kaWFsb2ctbXNnXCI+e3t7bXNnfX19PC9kaXY+XG4gICAgICAgIFxuICAgICAgICB7eyNpbnB1dH19XG4gICAgICAgIDxkaXYgY2xhc3M9XCJheC1kaWFsb2ctcHJvbXB0XCI+XG4gICAgICAgICAgICB7eyNAZWFjaH19XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAge3sjQHZhbHVlLmxhYmVsfX1cbiAgICAgICAgICAgIDxsYWJlbD57eyNfY3JsZn19e3t7Ln19fXt7L19jcmxmfX08L2xhYmVsPlxuICAgICAgICAgICAge3svQHZhbHVlLmxhYmVsfX1cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwie3tAdmFsdWUudHlwZX19XCIgcGxhY2Vob2xkZXI9XCJ7e0B2YWx1ZS5wbGFjZWhvbGRlcn19XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wge3tAdmFsdWUudGhlbWV9fVwiIGRhdGEtZGlhbG9nLXByb21wdD1cInt7QGtleX19XCIgc3R5bGU9XCJ3aWR0aDoxMDAlO1wiIHZhbHVlPVwie3tAdmFsdWUudmFsdWV9fVwiIC8+XG4gICAgICAgICAgICB7eyNAdmFsdWUuaGVscH19XG4gICAgICAgICAgICA8cCBjbGFzcz1cImhlbHAtYmxvY2tcIj57eyNfY3JsZn19e3sufX17ey9fY3JsZn19PC9wPlxuICAgICAgICAgICAge3svQHZhbHVlLmhlbHB9fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7ey9AZWFjaH19XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7ey9pbnB1dH19XG4gICAgICAgIFxuICAgICAgICA8ZGl2IGNsYXNzPVwiYXgtZGlhbG9nLWJ1dHRvbnNcIiBkYXRhLWRpYWxvZy1lbHM9XCJidXR0b25zXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXgtYnV0dG9uLXdyYXBcIj5cbiAgICAgICAgICAgIHt7I2J0bnN9fVxuICAgICAgICAgICAgICAgIHt7I0BlYWNofX1cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBkYXRhLWRpYWxvZy1idG49XCJ7e0BrZXl9fVwiIGNsYXNzPVwiYnRuIGJ0bi17e0B2YWx1ZS50aGVtZX19XCI+e3tAdmFsdWUubGFiZWx9fTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIHt7L0BlYWNofX1cbiAgICAgICAgICAgIHt7L2J0bnN9fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICAgICAge3sjYWRkaXRpb25hbENvbnRlbnR9fVxuICAgICAgICA8ZGl2IGRhdGEtZGlhbG9nLWVscz1cImFkZGl0aW9uYWwtY29udGVudFwiPnt7ey59fX08L2Rpdj5cbiAgICAgICAge3svYWRkaXRpb25hbENvbnRlbnR9fVxuICAgIDwvZGl2PlxuPC9kaXY+ICBcbmA7XG59O1xuY29uc3Qgb25TdGF0ZUNoYW5nZWQgPSBmdW5jdGlvbiAob3B0cywgdGhhdCkge1xuICBpZiAob3B0cyAmJiBvcHRzLm9uU3RhdGVDaGFuZ2VkKSB7XG4gICAgb3B0cy5vblN0YXRlQ2hhbmdlZC5jYWxsKHRoYXQsIHRoYXQpO1xuICB9XG4gIGVsc2UgaWYgKHRoaXMub25TdGF0ZUNoYW5nZWQpIHtcbiAgICB0aGlzLm9uU3RhdGVDaGFuZ2VkLmNhbGwodGhhdCwgdGhhdCk7XG4gIH1cblxuICBvcHRzID0gbnVsbDtcbiAgdGhhdCA9IG51bGw7XG4gIHJldHVybiB0cnVlO1xufTtcbmNvbnN0IGdldENvbnRlbnQgPSBmdW5jdGlvbiAoZGlhbG9nSWQsIG9wdHMpIHtcbiAgbGV0IGRhdGEgPSB7XG4gICAgZGlhbG9nSWQ6IGRpYWxvZ0lkLFxuICAgIHRpdGxlOiAob3B0cy50aXRsZSB8fCB0aGlzLmNvbmZpZy50aXRsZSB8fCBcIlwiKSxcbiAgICBtc2c6IChvcHRzLm1zZyB8fCB0aGlzLmNvbmZpZy5tc2cgfHwgXCJcIikucmVwbGFjZSgvXFxuL2csIFwiPGJyLz5cIiksXG4gICAgaW5wdXQ6IG9wdHMuaW5wdXQsXG4gICAgYnRuczogb3B0cy5idG5zLFxuICAgICdfY3JsZic6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlcGxhY2UoL1xcbi9nLCBcIjxici8+XCIpO1xuICAgIH0sXG4gICAgYWRkaXRpb25hbENvbnRlbnQ6IChmdW5jdGlvbiAoYWRkaXRpb25hbENvbnRlbnQpIHtcbiAgICAgIGlmIChVLmlzRnVuY3Rpb24oYWRkaXRpb25hbENvbnRlbnQpKSB7XG4gICAgICAgIHJldHVybiBhZGRpdGlvbmFsQ29udGVudC5jYWxsKG9wdHMpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBhZGRpdGlvbmFsQ29udGVudDtcbiAgICAgIH1cbiAgICB9KShvcHRzLmFkZGl0aW9uYWxDb250ZW50KVxuICB9O1xuXG4gIHJldHVybiBtdXN0YWNoZS5yZW5kZXIoZGlhbG9nVG1wbC5jYWxsKHRoaXMpLCBkYXRhKTtcbn07XG5jb25zdCBvcGVuID0gZnVuY3Rpb24gKG9wdHMsIGNhbGxiYWNrKSB7XG4gIGxldCBwb3MgPSB7fSxcbiAgICAgIGJveCA9IHtcbiAgICAgICAgd2lkdGg6IG9wdHMud2lkdGhcbiAgICAgIH07XG5cbiAgdGhpcy5kaWFsb2dDb25maWcgPSBvcHRzO1xuICB0aGlzLiRhY3RpdmVEaWFsb2cgPSBqUXVlcnkoZ2V0Q29udGVudC5jYWxsKHRoaXMsIG9wdHMuaWQsIG9wdHMpKTtcbiAgdGhpcy4kYWN0aXZlRGlhbG9nLmNzcyh7d2lkdGg6IGJveC53aWR0aH0pO1xuICBqUXVlcnkoZG9jdW1lbnQuYm9keSkuYXBwZW5kKHRoaXMuJGFjdGl2ZURpYWxvZyk7XG5cbiAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNhbGxiYWNrID0gb3B0cy5jYWxsYmFjaztcbiAgfVxuXG4gIC8vIGRpYWxvZyDrhpLsnbQg6rWs7ZWY6riwIC0g64SI67mE6rCAIOygle2VtOyngOuptCDrhpLsnbTqsIAg67OA6rK9IOuQoCDqsoMuXG4gIG9wdHMuaGVpZ2h0ID0gYm94LmhlaWdodCA9IHRoaXMuJGFjdGl2ZURpYWxvZy5oZWlnaHQoKTtcblxuICAvLy0gcG9zaXRpb24g7KCV66CsXG4gIGlmICh0eXBlb2Ygb3B0cy5wb3NpdGlvbiA9PT0gXCJ1bmRlZmluZWRcIiB8fCBvcHRzLnBvc2l0aW9uID09PSBcImNlbnRlclwiKSB7XG4gICAgcG9zLnRvcCA9IGpRdWVyeSh3aW5kb3cpLmhlaWdodCgpIC8gMiAtIGJveC5oZWlnaHQgLyAyO1xuICAgIHBvcy5sZWZ0ID0galF1ZXJ5KHdpbmRvdykud2lkdGgoKSAvIDIgLSBib3gud2lkdGggLyAyO1xuICB9XG4gIGVsc2Uge1xuICAgIHBvcy5sZWZ0ID0gb3B0cy5wb3NpdGlvbi5sZWZ0IHx8IDA7XG4gICAgcG9zLnRvcCA9IG9wdHMucG9zaXRpb24udG9wIHx8IDA7XG4gIH1cbiAgaWYgKHRoaXMuY29uZmlnLnpJbmRleCkge1xuICAgIHBvc1tcInotaW5kZXhcIl0gPSB0aGlzLmNvbmZpZy56SW5kZXg7XG4gIH1cblxuICB0aGlzLiRhY3RpdmVEaWFsb2dcbiAgICAuY3NzKHBvcylcbiAgICAub24ob3B0cy5jbGlja0V2ZW50TmFtZSwgXCJbZGF0YS1kaWFsb2ctYnRuXVwiLCAoZSkgPT4ge1xuICAgICAgYnRuT25DbGljay5jYWxsKHRoaXMsIGUgfHwgd2luZG93LmV2ZW50LCBvcHRzLCBjYWxsYmFjayk7XG4gICAgfSlcbiAgICAuZmluZChvcHRzLmRpYWxvZ1R5cGUgPT09IFwicHJvbXB0XCIgPyBcIltkYXRhLWRpYWxvZy1wcm9tcHRdXCIgOiBcIltkYXRhLWRpYWxvZy1idG5dXCIpLnRyaWdnZXIoXCJmb2N1c1wiKTtcblxuXG4gIC8vIGJpbmQga2V5IGV2ZW50XG4gIGpRdWVyeSh3aW5kb3cpXG4gICAgLm9uKFwia2V5ZG93bi5heDZkaWFsb2dcIiwgKGUpID0+IHtcbiAgICAgIG9uS2V5dXAuY2FsbCh0aGlzLCBlIHx8IHdpbmRvdy5ldmVudCwgb3B0cywgY2FsbGJhY2spO1xuICAgIH0pXG4gICAgLm9uKFwicmVzaXplLmF4NmRpYWxvZ1wiLCBVLnRocm90dGxlKGZ1bmN0aW9uIChlKSB7XG4gICAgICBhbGlnbi5jYWxsKHRoaXMsIGUgfHwgd2luZG93LmV2ZW50KTtcbiAgICB9LCAzMCkuYmluZCh0aGlzKSk7XG5cbiAgb25TdGF0ZUNoYW5nZWQuY2FsbCh0aGlzLCBvcHRzLCB7XG4gICAgc2VsZjogdGhpcyxcbiAgICBzdGF0ZTogXCJvcGVuXCJcbiAgfSk7XG5cbiAgaWYgKG9wdHMuYXV0b0Nsb3NlVGltZSkge1xuICAgIHRoaXMuYXV0b0Nsb3NlVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9LCBvcHRzLmF1dG9DbG9zZVRpbWUpO1xuICB9XG5cbiAgcG9zID0gbnVsbDtcbiAgYm94ID0gbnVsbDtcbn07XG5jb25zdCBhbGlnbiA9IGZ1bmN0aW9uIChlKSB7XG4gIGlmICghdGhpcy4kYWN0aXZlRGlhbG9nKSByZXR1cm4gdGhpcztcbiAgbGV0IG9wdHMgPSB0aGlzLmRpYWxvZ0NvbmZpZyxcbiAgICAgIGJveCAgPSB7XG4gICAgICAgIHdpZHRoOiBvcHRzLndpZHRoLFxuICAgICAgICBoZWlnaHQ6IG9wdHMuaGVpZ2h0XG4gICAgICB9O1xuXG4gIC8vLSBwb3NpdGlvbiDsoJXroKxcbiAgaWYgKHR5cGVvZiBvcHRzLnBvc2l0aW9uID09PSBcInVuZGVmaW5lZFwiIHx8IG9wdHMucG9zaXRpb24gPT09IFwiY2VudGVyXCIpIHtcbiAgICBib3gudG9wID0gd2luZG93LmlubmVySGVpZ2h0IC8gMiAtIGJveC5oZWlnaHQgLyAyO1xuICAgIGJveC5sZWZ0ID0gd2luZG93LmlubmVyV2lkdGggLyAyIC0gYm94LndpZHRoIC8gMjtcbiAgfVxuICBlbHNlIHtcbiAgICBib3gubGVmdCA9IG9wdHMucG9zaXRpb24ubGVmdCB8fCAwO1xuICAgIGJveC50b3AgPSBvcHRzLnBvc2l0aW9uLnRvcCB8fCAwO1xuICB9XG4gIGlmIChib3gubGVmdCA8IDApIGJveC5sZWZ0ID0gMDtcbiAgaWYgKGJveC50b3AgPCAwKSBib3gudG9wID0gMDtcblxuICB0aGlzLiRhY3RpdmVEaWFsb2cuY3NzKGJveCk7XG5cbiAgb3B0cyA9IG51bGw7XG4gIGJveCA9IG51bGw7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuY29uc3QgYnRuT25DbGljayA9IGZ1bmN0aW9uIChlLCBvcHRzLCBjYWxsYmFjaywgdGFyZ2V0LCBrKSB7XG4gIGxldCB0aGF0LFxuICAgICAgZW1wdHlLZXkgPSBudWxsO1xuXG4gIGlmIChlLnNyY0VsZW1lbnQpIGUudGFyZ2V0ID0gZS5zcmNFbGVtZW50O1xuXG4gIHRhcmdldCA9IFUuZmluZFBhcmVudE5vZGUoZS50YXJnZXQsIGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICBpZiAodGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtZGlhbG9nLWJ0blwiKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9KTtcblxuICBpZiAodGFyZ2V0KSB7XG4gICAgayA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWRpYWxvZy1idG5cIik7XG5cbiAgICB0aGF0ID0ge1xuICAgICAgc2VsZjogdGhpcyxcbiAgICAgIGtleTogaywgdmFsdWU6IG9wdHMuYnRuc1trXSxcbiAgICAgIGRpYWxvZ0lkOiBvcHRzLmlkLFxuICAgICAgYnRuVGFyZ2V0OiB0YXJnZXRcbiAgICB9O1xuICAgIGlmIChvcHRzLmRpYWxvZ1R5cGUgPT09IFwicHJvbXB0XCIpIHtcbiAgICAgIGZvciAobGV0IG9pIGluIG9wdHMuaW5wdXQpIHtcbiAgICAgICAgdGhhdFtvaV0gPSB0aGlzLiRhY3RpdmVEaWFsb2cuZmluZCgnW2RhdGEtZGlhbG9nLXByb21wdD0nICsgb2kgKyAnXScpLnZhbCgpO1xuICAgICAgICBpZiAodGhhdFtvaV0gPT0gXCJcIiB8fCB0aGF0W29pXSA9PSBudWxsKSB7XG4gICAgICAgICAgZW1wdHlLZXkgPSBvaTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAob3B0cy5idG5zW2tdLm9uQ2xpY2spIHtcbiAgICAgIG9wdHMuYnRuc1trXS5vbkNsaWNrLmNhbGwodGhhdCwgdGhhdCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKG9wdHMuZGlhbG9nVHlwZSA9PT0gXCJhbGVydFwiKSB7XG4gICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrLmNhbGwodGhhdCwgdGhhdCk7XG4gICAgICB0aGlzLmNsb3NlKHtkb05vdENhbGxiYWNrOiB0cnVlfSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKG9wdHMuZGlhbG9nVHlwZSA9PT0gXCJjb25maXJtXCIpIHtcbiAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2suY2FsbCh0aGF0LCB0aGF0KTtcbiAgICAgIHRoaXMuY2xvc2Uoe2RvTm90Q2FsbGJhY2s6IHRydWV9KTtcbiAgICB9XG4gICAgZWxzZSBpZiAob3B0cy5kaWFsb2dUeXBlID09PSBcInByb21wdFwiKSB7XG4gICAgICBpZiAoayA9PT0gJ29rJykge1xuICAgICAgICBpZiAoZW1wdHlLZXkpIHtcbiAgICAgICAgICB0aGlzLiRhY3RpdmVEaWFsb2cuZmluZCgnW2RhdGEtZGlhbG9nLXByb21wdD1cIicgKyBlbXB0eUtleSArICdcIl0nKS5nZXQoMCkuZm9jdXMoKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2suY2FsbCh0aGF0LCB0aGF0KTtcbiAgICAgIHRoaXMuY2xvc2Uoe2RvTm90Q2FsbGJhY2s6IHRydWV9KTtcbiAgICB9XG4gIH1cblxuICB0aGF0ID0gbnVsbDtcbiAgb3B0cyA9IG51bGw7XG4gIGNhbGxiYWNrID0gbnVsbDtcbiAgdGFyZ2V0ID0gbnVsbDtcbiAgayA9IG51bGw7XG59O1xuY29uc3Qgb25LZXl1cCA9IGZ1bmN0aW9uIChlLCBvcHRzLCBjYWxsYmFjaywgdGFyZ2V0LCBrKSB7XG4gIGxldCB0aGF0LFxuICAgICAgZW1wdHlLZXkgPSBudWxsO1xuXG4gIGlmIChlLmtleUNvZGUgPT0gaW5mby5ldmVudEtleXMuRVNDKSB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG4gIGlmIChvcHRzLmRpYWxvZ1R5cGUgPT09IFwicHJvbXB0XCIpIHtcbiAgICBpZiAoZS5rZXlDb2RlID09IGluZm8uZXZlbnRLZXlzLlJFVFVSTikge1xuICAgICAgdGhhdCA9IHtcbiAgICAgICAgc2VsZjogdGhpcyxcbiAgICAgICAga2V5OiBrLCB2YWx1ZTogb3B0cy5idG5zW2tdLFxuICAgICAgICBkaWFsb2dJZDogb3B0cy5pZCxcbiAgICAgICAgYnRuVGFyZ2V0OiB0YXJnZXRcbiAgICAgIH07XG5cbiAgICAgIGZvciAobGV0IG9pIGluIG9wdHMuaW5wdXQpIHtcbiAgICAgICAgdGhhdFtvaV0gPSB0aGlzLiRhY3RpdmVEaWFsb2cuZmluZCgnW2RhdGEtZGlhbG9nLXByb21wdD0nICsgb2kgKyAnXScpLnZhbCgpO1xuICAgICAgICBpZiAodGhhdFtvaV0gPT0gXCJcIiB8fCB0aGF0W29pXSA9PSBudWxsKSB7XG4gICAgICAgICAgZW1wdHlLZXkgPSBvaTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGVtcHR5S2V5KSB7XG4gICAgICAgIHRoYXQgPSBudWxsO1xuICAgICAgICBlbXB0eUtleSA9IG51bGw7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2suY2FsbCh0aGF0LCB0aGF0KTtcbiAgICAgIHRoaXMuY2xvc2Uoe2RvTm90Q2FsbGJhY2s6IHRydWV9KTtcbiAgICB9XG4gIH1cblxuICB0aGF0ID0gbnVsbDtcbiAgZW1wdHlLZXkgPSBudWxsO1xuICBvcHRzID0gbnVsbDtcbiAgY2FsbGJhY2sgPSBudWxsO1xuICB0YXJnZXQgPSBudWxsO1xuICBrID0gbnVsbDtcbn07XG5cbi8qIH5+fn5+fn5+fn5+fn5+fn5+fiBlbmQgb2YgcHJpdmF0ZSAgfn5+fn5+fn5+fn5+fn5+fn5+fn4gKi9cblxuLyoqXG4gKiBAY2xhc3NcbiAqL1xuY2xhc3MgQVg2VUlEaWFsb2cgZXh0ZW5kcyBBWDZVSUNvcmUge1xuICAvKipcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSBjb25maWdcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgIHN1cGVyKCk7XG5cbiAgICAvKipcbiAgICAgKiBAbWVtYmVyIHtKU09OfVxuICAgICAqIEBwYXJhbSBjb25maWdcbiAgICAgKiBAcGFyYW0gW2NvbmZpZy50aGVtZT0nZGVmYXVsdCddXG4gICAgICogQHBhcmFtIFtjb25maWcud2lkdGg9MzAwXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLnRpdGxlPScnXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLm1zZz0nJ11cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5sYW5nXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmxhbmcub2s9J29rJ11cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5sYW5nLmNhbmNlbD0nY2FuY2VsJ11cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5hbmltYXRlVGltZT0xNTBdXG4gICAgICogQHBhcmFtIFtjb25maWcuYXV0b0Nsb3NlVGltZT0wXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLm9uU3RhdGVDaGFuZ2VkXVxuICAgICAqXG4gICAgICovXG4gICAgdGhpcy5jb25maWcgPSB7XG4gICAgICBpZDogJ2F4Ni1kaWFsb2ctJyArIHRoaXMuaW5zdGFuY2VJZCxcbiAgICAgIGNsaWNrRXZlbnROYW1lOiBcImNsaWNrXCIsXG4gICAgICB0aGVtZTogJ2RlZmF1bHQnLFxuICAgICAgd2lkdGg6IDMwMCxcbiAgICAgIHRpdGxlOiAnQVg2VUlEaWFsb2cnLFxuICAgICAgbXNnOiAnJyxcbiAgICAgIGxhbmc6IHtcbiAgICAgICAgXCJva1wiOiBcIm9rXCIsIFwiY2FuY2VsXCI6IFwiY2FuY2VsXCJcbiAgICAgIH0sXG4gICAgICBhbmltYXRlVGltZTogMTUwLFxuICAgICAgYXV0b0Nsb3NlVGltZTogMFxuICAgIH07XG4gICAgalF1ZXJ5LmV4dGVuZCh0cnVlLCB0aGlzLmNvbmZpZywgY29uZmlnKTtcblxuICAgIC8vIOuppOuyhCDrs4DsiJgg7LSI6riw7ZmUXG4gICAgLyoqXG4gICAgICogZGlhbG9n6rCAIOyXtOugpOyeiOuKlCDsg4Htg5zsl5DshJwg64uk7IucIG9wZW7snbQg65CY66m0IHF1ZXVl7JeQIOuztOq0gCDtlZjsmIDri6TqsIAgY2xvc2Xtm4Qgb3BlblxuICAgICAqIEBtZW1iZXIge0FycmF5fVxuICAgICAqL1xuICAgIHRoaXMucXVldWUgPSBbXTtcbiAgICAvKipcbiAgICAgKiBAbWVtYmVyIHtqUXVlcnlFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMuJGFjdGl2ZURpYWxvZyA9IG51bGw7XG4gICAgLyoqXG4gICAgICogQG1lbWJlciB7T2JqZWN0fVxuICAgICAqL1xuICAgIHRoaXMuYXV0b0Nsb3NlVGltZXIgPSBudWxsO1xuXG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAcGFyYW0gY29uZmlnXG4gICAqL1xuICBpbml0KCkge1xuICAgIHRoaXMub25TdGF0ZUNoYW5nZWQgPSB0aGlzLmNvbmZpZy5vblN0YXRlQ2hhbmdlZDtcbiAgICBkZWxldGUgdGhpcy5jb25maWcub25TdGF0ZUNoYW5nZWQ7XG5cbiAgICAvLyBpbml0IO2YuOy2nCDsl6zrtoBcbiAgICB0aGlzLmluaXRPbmNlKCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKi9cbiAgaW5pdE9uY2UoKSB7XG4gICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpIHJldHVybiB0aGlzO1xuICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQHBhcmFtIG9wdHNcbiAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAqIEBwYXJhbSB0cnlDb3VudFxuICAgKiBAcmV0dXJuIHtBWDZVSURpYWxvZ31cbiAgICogQGV4YW1wbGVcbiAgICogYGBganNcbiAgICogaW1wb3J0IHtEaWFsb2d9IGZyb20gXCJheDZ1aVwiXG4gICAqXG4gICAqIGNvbnN0IGRpYWxvZyA9IG5ldyBEaWFsb2coKTtcbiAgICogZGlhbG9nLmFsZXJ0KFwiQWxlcnQgTWVzc2FnZVwiKTtcbiAgICogZGlhbG9nLmFsZXJ0KHtcbiAgICAgKiAgICAgdGl0bGU6IFwiVGl0bGVcIixcbiAgICAgKiAgICAgbXNnOiBcIkFsZXJ0IE1lc3NhZ2VcIlxuICAgICAqIH0pO1xuICAgKiBgYGBcbiAgICovXG4gIGFsZXJ0KG9wdHMsIGNhbGxiYWNrLCB0cnlDb3VudCkge1xuICAgIGlmICh0eXBlb2Ygb3B0cyA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgb3B0cyA9IHtcbiAgICAgICAgdGl0bGU6IHRoaXMuY29uZmlnLnRpdGxlLFxuICAgICAgICBtc2c6IFwiXCJcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKFUuaXNTdHJpbmcob3B0cykpIHtcbiAgICAgIG9wdHMgPSB7XG4gICAgICAgIHRpdGxlOiB0aGlzLmNvbmZpZy50aXRsZSxcbiAgICAgICAgbXNnOiBvcHRzXG4gICAgICB9XG4gICAgfVxuXG4gICAgb3B0cyA9IGpRdWVyeS5leHRlbmQodHJ1ZSwge30sIHRoaXMuY29uZmlnLCBvcHRzLCB7XG4gICAgICBkaWFsb2dUeXBlOiBcImFsZXJ0XCIsXG4gICAgICBjYWxsYmFjazogY2FsbGJhY2tcbiAgICB9KTtcblxuICAgIGlmICh0eXBlb2Ygb3B0cy5idG5zID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBvcHRzLmJ0bnMgPSB7XG4gICAgICAgIG9rOiB7bGFiZWw6IG9wdHMubGFuZ1tcIm9rXCJdLCB0aGVtZTogb3B0cy50aGVtZX1cbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuJGFjdGl2ZURpYWxvZykge1xuICAgICAgdGhpcy5xdWV1ZS5wdXNoKG9wdHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcGVuLmNhbGwodGhpcywgb3B0cywgY2FsbGJhY2spO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBwYXJhbSBvcHRzXG4gICAqIEBwYXJhbSBjYWxsYmFja1xuICAgKiBAcGFyYW0gdHJ5Q291bnRcbiAgICogQHJldHVybiB7QVg2VUlEaWFsb2d9XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqIGltcG9ydCB7RGlhbG9nfSBmcm9tIFwiYXg2dWlcIlxuICAgKlxuICAgKiBjb25zdCBkaWFsb2cgPSBuZXcgRGlhbG9nKCk7XG4gICAqIGRpYWxvZy5jb25maXJtKHtcbiAgICAgKiAgICAgdGl0bGU6IFwi7ZmV7J24XCIsXG4gICAgICogICAgIG1zZzogXCLtmZXsnbgg65iQ64qUIOy3qOyGjOulvCDriITrpbTshLjsmpRcIlxuICAgICAqIH0sIGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgKiAgICAgLy9jb25zb2xlLmxvZyh0aGlzLCBhLCBiKTtcbiAgICAgKiAgICAgaWYocmVzLmtleSA9PSBcIm9rXCIpe1xuICAgICAqICAgICAgICAgY29uc29sZS5sb2coXCJPS1wiKTtcbiAgICAgKiAgICAgfVxuICAgICAqICAgICBlbHNlIGlmKHJlcy5rZXkgPT0gXCJjYW5jZWxcIil7XG4gICAgICogICAgICAgICBjb25zb2xlLmxvZyhcIkNBTkNFTFwiKTtcbiAgICAgKiAgICAgfVxuICAgICAqIH0pO1xuICAgKlxuICAgKiAvLyBidG5zIGN1c3RvbVxuICAgKiBkaWFsb2cuY29uZmlnKHtcbiAgICAgKiAgdGl0bGU6IFwi7JiIL+yVhOuLiOyYpFwiLFxuICAgICAqICBtc2c6IFwi64u57Iug7J2AIOqwnOuwnOyekCDsnoXri4jquYw/XCIsXG4gICAgICogIGJ0bnM6IHtcbiAgICAgKiAgICAgIFk6IHtsYWJlbDogXCLsmIhcIn0sXG4gICAgICogICAgICBOOiB7bGFiZWw6IFwi7JWE64uI7JikXCJ9XG4gICAgICogIH1cbiAgICAgKiB9LCBmdW5jdGlvbiAocmVzKSB7XG4gICAgICogICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAqIH0pO1xuICAgKiBgYGBcbiAgICovXG4gIGNvbmZpcm0ob3B0cywgY2FsbGJhY2ssIHRyeUNvdW50KSB7XG4gICAgaWYgKHR5cGVvZiBvcHRzID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBvcHRzID0ge1xuICAgICAgICB0aXRsZTogdGhpcy5jb25maWcudGl0bGUsXG4gICAgICAgIG1zZzogXCJcIlxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoVS5pc1N0cmluZyhvcHRzKSkge1xuICAgICAgb3B0cyA9IHtcbiAgICAgICAgdGl0bGU6IHRoaXMuY29uZmlnLnRpdGxlLFxuICAgICAgICBtc2c6IG9wdHNcbiAgICAgIH1cbiAgICB9XG5cbiAgICBvcHRzID0galF1ZXJ5LmV4dGVuZCh0cnVlLCB7fSwgdGhpcy5jb25maWcsIG9wdHMsIHtcbiAgICAgIGRpYWxvZ1R5cGU6IFwiY29uZmlybVwiLFxuICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrXG4gICAgfSk7XG5cbiAgICBpZiAodHlwZW9mIG9wdHMuYnRucyA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgb3B0cy5idG5zID0ge1xuICAgICAgICBvazoge2xhYmVsOiBvcHRzLmxhbmdbXCJva1wiXSwgdGhlbWU6IG9wdHMudGhlbWV9LFxuICAgICAgICBjYW5jZWw6IHtsYWJlbDogb3B0cy5sYW5nW1wiY2FuY2VsXCJdfVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy4kYWN0aXZlRGlhbG9nKSB7XG4gICAgICB0aGlzLnF1ZXVlLnB1c2gob3B0cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wZW4uY2FsbCh0aGlzLCBvcHRzLCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAcGFyYW0gb3B0c1xuICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICogQHBhcmFtIHRyeUNvdW50XG4gICAqIEByZXR1cm4ge0FYNlVJRGlhbG9nfVxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBqc1xuICAgKiBpbXBvcnQge0RpYWxvZ30gZnJvbSBcImF4NnVpXCJcbiAgICpcbiAgICogY29uc3QgZGlhbG9nID0gbmV3IERpYWxvZygpO1xuICAgKlxuICAgKiBkaWFsb2cucHJvbXB0KHtcbiAgICAgKiAgdGl0bGU6IFwicHJvbXB0XCIsXG4gICAgICogIG1zZzogJ+uLpOydjOydmCDqsJLsnYQg7J6F66Cl7ZWY7IS47JqULicsXG4gICAgICogIGlucHV0OiB7XG4gICAgICogICAgICBkYXRhMToge2xhYmVsOiBcImRhdGEx7J2YIOudvOuyqFwiLCB0eXBlOiBcInBhc3N3b3JkXCJ9LFxuICAgICAqICAgICAgZGF0YTI6IHtsYWJlbDogXCJkYXRhMuydmCDrnbzrsqhcIn1cbiAgICAgKiAgfVxuICAgICAqIH0sIGZ1bmN0aW9uKHJlcyl7XG4gICAgICogICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAqIH0pO1xuICAgKiBgYGBcbiAgICovXG4gIHByb21wdChvcHRzLCBjYWxsYmFjaywgdHJ5Q291bnQpIHtcbiAgICBpZiAodHlwZW9mIG9wdHMgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIG9wdHMgPSB7XG4gICAgICAgIHRpdGxlOiB0aGlzLmNvbmZpZy50aXRsZSxcbiAgICAgICAgbXNnOiBcIlwiXG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChVLmlzU3RyaW5nKG9wdHMpKSB7XG4gICAgICBvcHRzID0ge1xuICAgICAgICB0aXRsZTogdGhpcy5jb25maWcudGl0bGUsXG4gICAgICAgIG1zZzogb3B0c1xuICAgICAgfVxuICAgIH1cblxuICAgIG9wdHMgPSBqUXVlcnkuZXh0ZW5kKHRydWUsIHt9LCB0aGlzLmNvbmZpZywgb3B0cywge1xuICAgICAgZGlhbG9nVHlwZTogXCJwcm9tcHRcIixcbiAgICAgIGNhbGxiYWNrOiBjYWxsYmFja1xuICAgIH0pO1xuXG4gICAgaWYgKHR5cGVvZiBvcHRzLmlucHV0ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBvcHRzLmlucHV0ID0ge1xuICAgICAgICB2YWx1ZToge2xhYmVsOiBcIlwifVxuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvcHRzLmJ0bnMgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIG9wdHMuYnRucyA9IHtcbiAgICAgICAgb2s6IHtsYWJlbDogb3B0cy5sYW5nW1wib2tcIl0sIHRoZW1lOiBvcHRzLnRoZW1lfSxcbiAgICAgICAgY2FuY2VsOiB7bGFiZWw6IG9wdHMubGFuZ1tcImNhbmNlbFwiXX1cbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuJGFjdGl2ZURpYWxvZykge1xuICAgICAgdGhpcy5xdWV1ZS5wdXNoKG9wdHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcGVuLmNhbGwodGhpcywgb3B0cywgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQHBhcmFtIF9vcHRpb25cbiAgICogQHJldHVybiB7QVg2VUlEaWFsb2d9XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqIGRpYWxvZy5jbG9zZSgpO1xuICAgKiBkaWFsb2cuY2xvc2Uoe2NhbGxiYWNrOiBmdW5jdGlvbigpe1xuICAgICAqXG4gICAgICogfSk7XG4gICAgICogYGBgXG4gICAgICovXG4gIGNsb3NlKF9vcHRpb24pIHtcbiAgICBsZXQgb3B0cywgdGhhdDtcblxuICAgIGlmICh0aGlzLiRhY3RpdmVEaWFsb2cpIHtcbiAgICAgIGlmICh0aGlzLmF1dG9DbG9zZVRpbWVyKSBjbGVhclRpbWVvdXQodGhpcy5hdXRvQ2xvc2VUaW1lcik7XG5cbiAgICAgIG9wdHMgPSB0aGlzLmRpYWxvZ0NvbmZpZztcblxuICAgICAgdGhpcy4kYWN0aXZlRGlhbG9nLmFkZENsYXNzKFwiZGVzdHJveVwiKTtcbiAgICAgIGpRdWVyeSh3aW5kb3cpXG4gICAgICAgIC5vZmYoXCJrZXlkb3duLmF4NmRpYWxvZ1wiKVxuICAgICAgICAub2ZmKFwicmVzaXplLmF4NmRpYWxvZ1wiKTtcblxuICAgICAgc2V0VGltZW91dCgoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy4kYWN0aXZlRGlhbG9nKSB7XG4gICAgICAgICAgdGhpcy4kYWN0aXZlRGlhbG9nLnJlbW92ZSgpO1xuICAgICAgICAgIHRoaXMuJGFjdGl2ZURpYWxvZyA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB0aGF0ID0ge1xuICAgICAgICAgIHNlbGY6IHRoaXMsXG4gICAgICAgICAgc3RhdGU6IFwiY2xvc2VcIixcbiAgICAgICAgICBkaWFsb2dJZDogb3B0cy5pZFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChfb3B0aW9uICYmIFUuaXNGdW5jdGlvbihfb3B0aW9uLmNhbGxiYWNrKSkge1xuICAgICAgICAgIF9vcHRpb24uY2FsbGJhY2suY2FsbCh0aGF0LCB0aGF0KTtcbiAgICAgICAgfSBlbHNlIGlmIChvcHRzLmNhbGxiYWNrICYmICghX29wdGlvbiB8fCAhX29wdGlvbi5kb05vdENhbGxiYWNrKSkge1xuICAgICAgICAgIG9wdHMuY2FsbGJhY2suY2FsbCh0aGF0LCB0aGF0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcHRzICYmIG9wdHMub25TdGF0ZUNoYW5nZWQpIHtcbiAgICAgICAgICBvcHRzLm9uU3RhdGVDaGFuZ2VkLmNhbGwodGhhdCwgdGhhdCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5vblN0YXRlQ2hhbmdlZCkge1xuICAgICAgICAgIHRoaXMub25TdGF0ZUNoYW5nZWQuY2FsbCh0aGF0LCB0aGF0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOyXtOugpOyVvCDtlaAg7YGQ6rCAIOuCqOyVhCDsnojri6TrqbQg7YGQ7JWE7J207YWc7Jy866GcIOuLpOyLnCBvcGVuXG4gICAgICAgIGlmICh0aGlzLnF1ZXVlICYmIHRoaXMucXVldWUubGVuZ3RoKSB7XG4gICAgICAgICAgb3Blbi5jYWxsKHRoaXMsIHRoaXMucXVldWUuc2hpZnQoKSk7XG4gICAgICAgIH1cblxuICAgICAgICBvcHRzID0gbnVsbDtcbiAgICAgICAgdGhhdCA9IG51bGw7XG4gICAgICB9KS5iaW5kKHRoaXMpLCB0aGlzLmNvbmZpZy5hbmltYXRlVGltZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFYNlVJRGlhbG9nO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9zcmMvQVg2VUlEaWFsb2cuanMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGUuc2Nzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7fVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zdHlsZS5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zdHlsZS5zY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9zcmMvQVg2VUlEaWFsb2cvc3R5bGUuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNzZcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDEwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHVuZGVmaW5lZCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJALXdlYmtpdC1rZXlmcmFtZXMgYXgtZGlhbG9nIHtcXG4gIDAlIHtcXG4gICAgb3BhY2l0eTogMC4wO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGVYKDEpOyB9XFxuICAwLjElIHtcXG4gICAgb3BhY2l0eTogMC4wO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGVYKDEuMyk7IH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAxLjA7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZVgoMSk7IH0gfVxcblxcbkAtbW96LWtleWZyYW1lcyBheC1kaWFsb2cge1xcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAwLjA7XFxuICAgIC1tb3otdHJhbnNmb3JtOiBzY2FsZVgoMSk7IH1cXG4gIDAuMSUge1xcbiAgICBvcGFjaXR5OiAwLjA7XFxuICAgIC1tb3otdHJhbnNmb3JtOiBzY2FsZVgoMS4zKTsgfVxcbiAgMTAwJSB7XFxuICAgIG9wYWNpdHk6IDEuMDtcXG4gICAgLW1vei10cmFuc2Zvcm06IHNjYWxlWCgxKTsgfSB9XFxuXFxuQGtleWZyYW1lcyBheC1kaWFsb2cge1xcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAwLjA7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZVgoMSk7XFxuICAgIC1tb3otdHJhbnNmb3JtOiBzY2FsZVgoMSk7XFxuICAgIC1tcy10cmFuc2Zvcm06IHNjYWxlWCgxKTtcXG4gICAgLW8tdHJhbnNmb3JtOiBzY2FsZVgoMSk7XFxuICAgIHRyYW5zZm9ybTogc2NhbGVYKDEpOyB9XFxuICAwLjElIHtcXG4gICAgb3BhY2l0eTogMC4wO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGVYKDEuMyk7XFxuICAgIC1tb3otdHJhbnNmb3JtOiBzY2FsZVgoMS4zKTtcXG4gICAgLW1zLXRyYW5zZm9ybTogc2NhbGVYKDEuMyk7XFxuICAgIC1vLXRyYW5zZm9ybTogc2NhbGVYKDEuMyk7XFxuICAgIHRyYW5zZm9ybTogc2NhbGVYKDEuMyk7IH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAxLjA7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZVgoMSk7XFxuICAgIC1tb3otdHJhbnNmb3JtOiBzY2FsZVgoMSk7XFxuICAgIC1tcy10cmFuc2Zvcm06IHNjYWxlWCgxKTtcXG4gICAgLW8tdHJhbnNmb3JtOiBzY2FsZVgoMSk7XFxuICAgIHRyYW5zZm9ybTogc2NhbGVYKDEpOyB9IH1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgYXgtZGlhbG9nLWRlc3Ryb3kge1xcbiAgZnJvbSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCk7XFxuICAgIG9wYWNpdHk6IDEuMDsgfVxcbiAgdG8ge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDUwJSk7XFxuICAgIG9wYWNpdHk6IDAuMDsgfSB9XFxuXFxuQC1tb3ota2V5ZnJhbWVzIGF4LWRpYWxvZy1kZXN0cm95IHtcXG4gIGZyb20ge1xcbiAgICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDApO1xcbiAgICBvcGFjaXR5OiAxLjA7IH1cXG4gIHRvIHtcXG4gICAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCA1MCUpO1xcbiAgICBvcGFjaXR5OiAwLjA7IH0gfVxcblxcbkBrZXlmcmFtZXMgYXgtZGlhbG9nLWRlc3Ryb3kge1xcbiAgZnJvbSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCk7XFxuICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCk7XFxuICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAwKTtcXG4gICAgLW8tdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCk7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDApO1xcbiAgICBvcGFjaXR5OiAxLjA7IH1cXG4gIHRvIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCA1MCUpO1xcbiAgICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDUwJSk7XFxuICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCA1MCUpO1xcbiAgICAtby10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCA1MCUpO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCA1MCUpO1xcbiAgICBvcGFjaXR5OiAwLjA7IH0gfVxcblxcbltkYXRhLWF4NnVpLWRpYWxvZ10ge1xcbiAgLXdlYmtpdC1hbmltYXRpb246IGF4LWRpYWxvZyAwLjE1cyBjdWJpYy1iZXppZXIoMC4xNzUsIDAuODg1LCAwLjMyLCAxLjI3NSk7XFxuICAtbW96LWFuaW1hdGlvbjogYXgtZGlhbG9nIDAuMTVzIGN1YmljLWJlemllcigwLjE3NSwgMC44ODUsIDAuMzIsIDEuMjc1KTtcXG4gIGFuaW1hdGlvbjogYXgtZGlhbG9nIDAuMTVzIGN1YmljLWJlemllcigwLjE3NSwgMC44ODUsIDAuMzIsIDEuMjc1KTtcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDApO1xcbiAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7XFxuICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDApO1xcbiAgLW8tdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDApO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDApO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgYm94LXNoYWRvdzogMHB4IDBweCAzcHggMHB4IHJnYmEoMCwgMCwgMCwgMC4xNzUpO1xcbiAgei1pbmRleDogMjAwMDtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIGxlZnQ6IDA7XFxuICB0b3A6IDA7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZDsgfVxcbiAgW2RhdGEtYXg2dWktZGlhbG9nXSAuYXgtZGlhbG9nLWhlYWRlciB7XFxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICAgIHBhZGRpbmc6IDEwcHggMTVweDtcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHRyYW5zcGFyZW50OyB9XFxuICAgIFtkYXRhLWF4NnVpLWRpYWxvZ10gLmF4LWRpYWxvZy1oZWFkZXIgLmJhZGdlIHtcXG4gICAgICBmb250LXNpemU6IDAuOGVtO1xcbiAgICAgIGNvbG9yOiAjZjVmNWY1O1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICMzMzM7IH1cXG4gIFtkYXRhLWF4NnVpLWRpYWxvZ10gLmF4LWRpYWxvZy1ib2R5IHtcXG4gICAgcGFkZGluZzogMTVweDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyOyB9XFxuICAgIFtkYXRhLWF4NnVpLWRpYWxvZ10gLmF4LWRpYWxvZy1ib2R5IC5heC1kaWFsb2ctbXNnIHtcXG4gICAgICBwYWRkaW5nLXRvcDogMTVweDtcXG4gICAgICBwYWRkaW5nLWJvdHRvbTogMTVweDsgfVxcbiAgICBbZGF0YS1heDZ1aS1kaWFsb2ddIC5heC1kaWFsb2ctYm9keSAuYXgtZGlhbG9nLXByb21wdCB7XFxuICAgICAgdGV4dC1hbGlnbjogbGVmdDtcXG4gICAgICBwYWRkaW5nLWJvdHRvbTogNy41cHg7IH1cXG4gICAgW2RhdGEtYXg2dWktZGlhbG9nXSAuYXgtZGlhbG9nLWJvZHkgLmF4LWRpYWxvZy1idXR0b25zIHtcXG4gICAgICBtYXJnaW4tdG9wOiAxNXB4OyB9XFxuICAgICAgW2RhdGEtYXg2dWktZGlhbG9nXSAuYXgtZGlhbG9nLWJvZHkgLmF4LWRpYWxvZy1idXR0b25zIGJ1dHRvbjpub3QoOmxhc3QtY2hpbGQpIHtcXG4gICAgICAgIG1hcmdpbi1yaWdodDogM3B4OyB9XFxuICAgIFtkYXRhLWF4NnVpLWRpYWxvZ10gLmF4LWRpYWxvZy1ib2R5IFtkYXRhLWRpYWxvZy1lbHM9XFxcImFkZGl0aW9uYWwtY29udGVudFxcXCJdIHtcXG4gICAgICBtYXJnaW4tdG9wOiAxNXB4OyB9XFxuICBbZGF0YS1heDZ1aS1kaWFsb2ddIC5heC1kaWFsb2ctaGVhZGVyIHtcXG4gICAgY29sb3I6ICMzMzM7XFxuICAgIGJhY2tncm91bmQ6ICNmNWY1ZjU7IH1cXG4gICAgW2RhdGEtYXg2dWktZGlhbG9nXSAuYXgtZGlhbG9nLWhlYWRlciAuYmFkZ2Uge1xcbiAgICAgIGNvbG9yOiAjZjVmNWY1O1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICMzMzM7IH1cXG4gIFtkYXRhLWF4NnVpLWRpYWxvZ10uZGVzdHJveSB7XFxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBheC1kaWFsb2ctZGVzdHJveSAwLjE1cyBjdWJpYy1iZXppZXIoMC43NTUsIDAuMDUsIDAuODU1LCAwLjA2KSBmb3J3YXJkcztcXG4gICAgLW1vei1hbmltYXRpb246IGF4LWRpYWxvZy1kZXN0cm95IDAuMTVzIGN1YmljLWJlemllcigwLjc1NSwgMC4wNSwgMC44NTUsIDAuMDYpIGZvcndhcmRzO1xcbiAgICBhbmltYXRpb246IGF4LWRpYWxvZy1kZXN0cm95IDAuMTVzIGN1YmljLWJlemllcigwLjc1NSwgMC4wNSwgMC44NTUsIDAuMDYpIGZvcndhcmRzOyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlciEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uL3NyYy9BWDZVSURpYWxvZy9zdHlsZS5zY3NzXG4vLyBtb2R1bGUgaWQgPSA3N1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMTAiXSwic291cmNlUm9vdCI6IiJ9