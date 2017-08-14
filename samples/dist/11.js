webpackJsonp([11],{

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AX6Util = __webpack_require__(1);

var _AX6Util2 = _interopRequireDefault(_AX6Util);

var _AX6UICalendar = __webpack_require__(69);

var _AX6UICalendar2 = _interopRequireDefault(_AX6UICalendar);

__webpack_require__(44);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var html = "\n<div id=\"calendar-target-0\" style=\"width:270px;padding: 10px;border-radius: 5px;float:left;margin-right: 20px;\" class=\"card\"></div>\n<div id=\"calendar-target-1\" style=\"width:270px;padding: 10px;border-radius: 5px;float:left;margin-right: 20px;\" class=\"card\"></div>\n<div style=\"clear: both;\"></div>\n<div id=\"calendar-target-2\" style=\"width:270px;padding: 10px;border-radius: 5px;float:left;margin-right: 20px;\" class=\"card\"></div>\n<div id=\"calendar-target-3\" style=\"width:270px;padding: 10px;border-radius: 5px;float:left;margin-right: 20px;\" class=\"card\"></div>\n<div id=\"calendar-target-4\" style=\"width:270px;padding: 10px;border-radius: 5px;float:left;margin-right: 20px;\" class=\"card\"></div>\n<div id=\"calendar-target-5\" style=\"width:270px;padding: 10px;border-radius: 5px;float:left;margin-right: 20px;\" class=\"card\"></div>\n";
var fn = {
  moduleRun: function moduleRun($body) {
    var today = new Date();

    var myCalendar_0 = new _AX6UICalendar2.default({
      control: {
        left: '<i class="material-icons">keyboard_arrow_left</i>',
        yearTmpl: '%s',
        monthTmpl: '%s',
        right: '<i class="material-icons">keyboard_arrow_right</i>',
        yearFirst: true
      },
      dimensions: {
        itemPadding: 1,
        height: 250
      },
      target: document.getElementById("calendar-target-0"),
      displayDate: new Date(),
      startOfWeek: 1,
      mode: "day",
      selectMode: "day",
      onClick: function onClick() {
        console.log(myCalendar_0.getSelection());
      },
      onStateChanged: function onStateChanged() {
        console.log(this);
      },
      multipleSelect: 2
    });

    // setSelection
    var myCalendar_1 = new _AX6UICalendar2.default({
      control: {
        left: '<i class="material-icons">keyboard_arrow_left</i>',
        yearTmpl: '%s',
        monthTmpl: '%s',
        right: '<i class="material-icons">keyboard_arrow_right</i>',
        yearFirst: true
      },
      dimensions: {
        itemPadding: 1,
        height: 250
      },
      target: document.getElementById("calendar-target-1"),
      displayDate: today,
      startOfWeek: 0,
      mode: "day",
      selectMode: "day",
      multipleSelect: 2
    });

    myCalendar_1.setSelection([_AX6Util2.default.date(today, { 'add': { d: -2 } }), _AX6Util2.default.date(today, { 'add': { d: -3 } })]);

    console.log(myCalendar_1.getSelection());

    var myCalendar_2 = new _AX6UICalendar2.default({
      target: document.getElementById("calendar-target-2"),
      marker: function () {
        var marker = {};
        marker[_AX6Util2.default.date(today, { 'return': 'yyyy-MM-dd', 'add': { d: -1 } })] = true;
        marker[_AX6Util2.default.date(today, { 'return': 'yyyy-MM-dd', 'add': { d: 0 } })] = true;
        marker[_AX6Util2.default.date(today, { 'return': 'yyyy-MM-dd', 'add': { d: 1 } })] = true;
        return marker;
      }()
    });

    // Selectable
    var myCalendar_3 = new _AX6UICalendar2.default({
      target: document.getElementById("calendar-target-3"),
      selectable: [_AX6Util2.default.date(today, { 'return': 'yyyy-MM-dd', 'add': { d: -1 } }), _AX6Util2.default.date(today, { 'return': 'yyyy-MM-dd', 'add': { d: 0 } }), _AX6Util2.default.date(today, { 'return': 'yyyy-MM-dd', 'add': { d: 1 } })],
      onClick: function onClick() {
        console.log(this);
      }
    });

    // Period
    var myCalendar_4 = new _AX6UICalendar2.default({
      control: {
        left: '<i class="material-icons">keyboard_arrow_left</i>',
        yearTmpl: '%s',
        monthTmpl: '%s',
        right: '<i class="material-icons">keyboard_arrow_right</i>',
        yearFirst: true
      },
      target: document.getElementById("calendar-target-4"),
      multipleSelect: 2,
      onClick: function onClick() {
        var dates = this.self.getSelection();
        if (dates.length > 1) {
          var minDate = new Date(Math.min(_AX6Util2.default.date(dates[0]).getTime(), _AX6Util2.default.date(dates[1]).getTime()));
          var maxDate = new Date(Math.max(_AX6Util2.default.date(dates[0]).getTime(), _AX6Util2.default.date(dates[1]).getTime()));

          this.self.setPeriod({
            range: [{ from: minDate, to: maxDate, fromLabel: 'S', toLabel: 'E' }]
          });
        }
      }
    });

    // changeMode
    var myCalendar_5 = new _AX6UICalendar2.default({
      control: {
        left: '<i class="material-icons">keyboard_arrow_left</i>',
        yearTmpl: '%s',
        monthTmpl: '%s',
        right: '<i class="material-icons">keyboard_arrow_right</i>',
        yearFirst: true
      },
      dimensions: {
        itemPadding: 1,
        height: 250
      },
      target: document.getElementById("calendar-target-5"),
      displayDate: new Date(),
      startOfWeek: 1,
      mode: "day",
      selectMode: "day",
      onClick: function onClick() {
        console.log(myCalendar_0.getSelection());
      },
      onStateChanged: function onStateChanged() {
        console.log(this);
      },
      multipleSelect: 2
    });
    myCalendar_5.changeMode("y");
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

/***/ 69:
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

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY2FsZW5kYXIuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9BWDZNdXN0YWNoZS5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL0FYNlVJQ2FsZW5kYXIvc3R5bGUuc2Nzcz9iZDQ3Iiwid2VicGFjazovLy8uLi9zcmMvQVg2VUlDYWxlbmRhci9zdHlsZS5zY3NzIiwid2VicGFjazovLy8uLi9zcmMvQVg2VUlDYWxlbmRhci5qcyJdLCJuYW1lcyI6WyJodG1sIiwiZm4iLCJtb2R1bGVSdW4iLCIkYm9keSIsInRvZGF5IiwiRGF0ZSIsIm15Q2FsZW5kYXJfMCIsImNvbnRyb2wiLCJsZWZ0IiwieWVhclRtcGwiLCJtb250aFRtcGwiLCJyaWdodCIsInllYXJGaXJzdCIsImRpbWVuc2lvbnMiLCJpdGVtUGFkZGluZyIsImhlaWdodCIsInRhcmdldCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJkaXNwbGF5RGF0ZSIsInN0YXJ0T2ZXZWVrIiwibW9kZSIsInNlbGVjdE1vZGUiLCJvbkNsaWNrIiwiY29uc29sZSIsImxvZyIsImdldFNlbGVjdGlvbiIsIm9uU3RhdGVDaGFuZ2VkIiwibXVsdGlwbGVTZWxlY3QiLCJteUNhbGVuZGFyXzEiLCJzZXRTZWxlY3Rpb24iLCJkYXRlIiwiZCIsIm15Q2FsZW5kYXJfMiIsIm1hcmtlciIsIm15Q2FsZW5kYXJfMyIsInNlbGVjdGFibGUiLCJteUNhbGVuZGFyXzQiLCJkYXRlcyIsInNlbGYiLCJsZW5ndGgiLCJtaW5EYXRlIiwiTWF0aCIsIm1pbiIsImdldFRpbWUiLCJtYXhEYXRlIiwibWF4Iiwic2V0UGVyaW9kIiwicmFuZ2UiLCJmcm9tIiwidG8iLCJmcm9tTGFiZWwiLCJ0b0xhYmVsIiwibXlDYWxlbmRhcl81IiwiY2hhbmdlTW9kZSIsIm1vZHVsZURlc3Ryb3kiLCJvZmYiLCJBWDYiLCJkZWZpbmVNdXN0YWNoZSIsImdsb2JhbCIsImZhY3RvcnkiLCJtdXN0YWNoZSIsIm11c3RhY2hlRmFjdG9yeSIsIm9iamVjdFRvU3RyaW5nIiwiT2JqZWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJpc0FycmF5IiwiQXJyYXkiLCJpc0FycmF5UG9seWZpbGwiLCJvYmplY3QiLCJjYWxsIiwiaXNGdW5jdGlvbiIsInR5cGVTdHIiLCJvYmoiLCJlc2NhcGVSZWdFeHAiLCJzdHJpbmciLCJyZXBsYWNlIiwiaGFzUHJvcGVydHkiLCJwcm9wTmFtZSIsInJlZ0V4cFRlc3QiLCJSZWdFeHAiLCJ0ZXN0IiwidGVzdFJlZ0V4cCIsInJlIiwibm9uU3BhY2VSZSIsImlzV2hpdGVzcGFjZSIsImVudGl0eU1hcCIsImVzY2FwZUh0bWwiLCJTdHJpbmciLCJmcm9tRW50aXR5TWFwIiwicyIsIndoaXRlUmUiLCJzcGFjZVJlIiwiZXF1YWxzUmUiLCJjdXJseVJlIiwidGFnUmUiLCJwYXJzZVRlbXBsYXRlIiwidGVtcGxhdGUiLCJ0YWdzIiwic2VjdGlvbnMiLCJ0b2tlbnMiLCJzcGFjZXMiLCJoYXNUYWciLCJub25TcGFjZSIsInN0cmlwU3BhY2UiLCJwb3AiLCJvcGVuaW5nVGFnUmUiLCJjbG9zaW5nVGFnUmUiLCJjbG9zaW5nQ3VybHlSZSIsImNvbXBpbGVUYWdzIiwidGFnc1RvQ29tcGlsZSIsInNwbGl0IiwiRXJyb3IiLCJzY2FubmVyIiwiU2Nhbm5lciIsInN0YXJ0IiwidHlwZSIsInZhbHVlIiwiY2hyIiwidG9rZW4iLCJvcGVuU2VjdGlvbiIsImVvcyIsInBvcyIsInNjYW5VbnRpbCIsImkiLCJ2YWx1ZUxlbmd0aCIsImNoYXJBdCIsInB1c2giLCJzY2FuIiwibmVzdFRva2VucyIsInNxdWFzaFRva2VucyIsInNxdWFzaGVkVG9rZW5zIiwibGFzdFRva2VuIiwibnVtVG9rZW5zIiwibmVzdGVkVG9rZW5zIiwiY29sbGVjdG9yIiwic2VjdGlvbiIsInRhaWwiLCJtYXRjaCIsImluZGV4Iiwic3Vic3RyaW5nIiwic2VhcmNoIiwiQ29udGV4dCIsInZpZXciLCJwYXJlbnRDb250ZXh0IiwiY2FjaGUiLCJyZXR1cm5zIiwiayIsInBhcmVudCIsImxvb2t1cCIsIm5hbWUiLCJoYXNPd25Qcm9wZXJ0eSIsImNvbnRleHQiLCJuYW1lcyIsImxvb2t1cEhpdCIsImluZGV4T2YiLCJXcml0ZXIiLCJjbGVhckNhY2hlIiwicGFyc2UiLCJyZW5kZXIiLCJwYXJ0aWFscyIsInJlbmRlclRva2VucyIsIm9yaWdpbmFsVGVtcGxhdGUiLCJidWZmZXIiLCJzeW1ib2wiLCJ1bmRlZmluZWQiLCJyZW5kZXJTZWN0aW9uIiwicmVuZGVySW52ZXJ0ZWQiLCJyZW5kZXJQYXJ0aWFsIiwidW5lc2NhcGVkVmFsdWUiLCJlc2NhcGVkVmFsdWUiLCJyYXdWYWx1ZSIsInN1YlJlbmRlciIsImoiLCJzbGljZSIsImVzY2FwZSIsInZlcnNpb24iLCJkZWZhdWx0V3JpdGVyIiwiVHlwZUVycm9yIiwidG9faHRtbCIsInNlbmQiLCJyZXN1bHQiLCJ0bXBsIiwiZnJhbWUiLCJjb2x1bW5LZXlzIiwiZGF5IiwibW9udGgiLCJ5ZWFyIiwib3B0cyIsInRoYXQiLCJnZXRGcmFtZSIsImRhdGEiLCJleHRlbmQiLCJjb25maWciLCJjb250cm9sQ1NTIiwiY29udHJvbEJ1dHRvbkNTUyIsImNzc051bWJlciIsImNvbnRyb2xIZWlnaHQiLCJjc3MiLCJzZXREaXNwbGF5IiwibXlEYXRlIiwieXkiLCJtbSIsInl5MSIsInl5MiIsImdldEZ1bGxZZWFyIiwibGFuZyIsIm1vbnRocyIsImdldE1vbnRoIiwiJCIsIk51bWJlciIsImNsaWNrRXZlbnROYW1lIiwib24iLCJlIiwiZmluZFBhcmVudE5vZGUiLCJnZXRBdHRyaWJ1dGUiLCJiaW5kIiwicHJpbnREYXkiLCJub3dEYXRlIiwiZG90RGF0ZSIsIm1vbnRoU3RyYXREYXRlIiwiX3RvZGF5IiwidGFibGVTdGFydERhdGUiLCJnZXREYXkiLCJhZGQiLCJsb29wRGF0ZSIsInRoaXNNb250aCIsIml0ZW1TdHlsZXMiLCJfayIsImZyYW1lV2lkdGgiLCJ3aWR0aCIsImZyYW1lSGVpZ2h0IiwiZmxvb3IiLCJudW1iZXIiLCJjb2xIZWFkSGVpZ2h0Iiwid2Vla05hbWVzIiwiY29uY2F0IiwibGlzdCIsInNwbGljZSIsImZvckVhY2giLCJuIiwidGhpc0RhdGUiLCJkYXRlRm9ybWF0IiwiX2RhdGUiLCJpc1N0YXJ0T2ZXZWVrIiwidGhpc0RhdGFMYWJlbCIsImRheVRtcGwiLCJnZXREYXRlIiwiYWRkQ2xhc3MiLCJjbGFzc05hbWVzIiwic2VsZWN0YWJsZU1hcCIsIm1hcmtlck1hcCIsInRoZW1lIiwiZGVmYXVsdE1hcmtlclRoZW1lIiwic2VsZWN0aW9uTWFwIiwid2luZG93IiwiZXZlbnQiLCJvbmNsaWNrIiwic3RvcEV2ZW50IiwicHJpbnRlZERheSIsImVuZCIsImFjdGlvbiIsInByaW50TW9udGgiLCJuTW9udGgiLCJtIiwidGFibGVTdGFydE1vbnRoIiwiY29sSGVhZExhYmVsIiwibW9udGhIZWFkaW5nIiwiX21vbnRoIiwicm93IiwiY29sIiwiaXNTdGFydE9mUm93Iiwic2V0RGlnaXQiLCJ0aGlzTW9udGhMYWJlbCIsInByaW50WWVhciIsIm5ZZWFyIiwieSIsInRhYmxlU3RhcnRZZWFyIiwieWVhckhlYWRpbmciLCJfeWVhciIsInRoaXNZZWFyIiwidGhpc1llYXJMYWJlbCIsInJlbW92ZWQiLCJkdCIsInNlbGVjdGFibGVDb3VudCIsImlzTnVtYmVyIiwic2VsZWN0aW9uIiwiZmluZCIsInJlbW92ZUNsYXNzIiwiZGF0ZUVsZW1lbnQiLCJtb3ZlIiwiYXBwbHlNYXJrZXJNYXAiLCJzZXRUaW1lb3V0IiwiYXBwbHlTZWxlY3Rpb25NYXAiLCJhcHBseVBlcmlvZE1hcCIsInBlcmlvZE1hcCIsImxhYmVsIiwiY2xlYXJQZXJpb2RNYXAiLCJlbXB0eSIsIkFYNlVJQ2FsZW5kYXIiLCJhbmltYXRlVGltZSIsImNvbnRyb2xCdXR0b25XaWR0aCIsImRlZmF1bHRQZXJpb2RUaGVtZSIsIiR0YXJnZXQiLCJpbml0IiwiZ2V0RXJyb3IiLCJzZXRTZWxlY3RhYmxlIiwic2V0TWFya2VyIiwiaW5pdE9uY2UiLCJpbml0aWFsaXplZCIsImNoYW5nZURhdGUiLCJpc1ByaW50IiwicHJvY2Vzc29yIiwidiIsIm1hcCIsImNvdW50IiwiaXNEYXRlIiwiYXJyIiwia2V5IiwiaXNEYXRlRm9ybWF0Iiwic2V0RGF0ZSIsImtleXMiLCJpc0FwcGx5IiwicGVyaW9kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFHQSxJQUFJQSxpM0JBQUo7QUFTQSxJQUFJQyxLQUFLO0FBQ1BDLGFBQVcsbUJBQVVDLEtBQVYsRUFBaUI7QUFDMUIsUUFBSUMsUUFBUSxJQUFJQyxJQUFKLEVBQVo7O0FBRUEsUUFBSUMsZUFBZSw0QkFBYTtBQUM5QkMsZUFBUztBQUNQQyxjQUFNLG1EQURDO0FBRVBDLGtCQUFVLElBRkg7QUFHUEMsbUJBQVcsSUFISjtBQUlQQyxlQUFPLG9EQUpBO0FBS1BDLG1CQUFXO0FBTEosT0FEcUI7QUFROUJDLGtCQUFZO0FBQ1ZDLHFCQUFhLENBREg7QUFFVkMsZ0JBQVE7QUFGRSxPQVJrQjtBQVk5QkMsY0FBUUMsU0FBU0MsY0FBVCxDQUF3QixtQkFBeEIsQ0Fac0I7QUFhOUJDLG1CQUFjLElBQUlkLElBQUosRUFiZ0I7QUFjOUJlLG1CQUFhLENBZGlCO0FBZTlCQyxZQUFNLEtBZndCO0FBZ0I5QkMsa0JBQVksS0FoQmtCO0FBaUI5QkMsZUFBUyxtQkFBWTtBQUNuQkMsZ0JBQVFDLEdBQVIsQ0FBWW5CLGFBQWFvQixZQUFiLEVBQVo7QUFDRCxPQW5CNkI7QUFvQjlCQyxzQkFBZ0IsMEJBQVk7QUFDMUJILGdCQUFRQyxHQUFSLENBQVksSUFBWjtBQUNELE9BdEI2QjtBQXVCOUJHLHNCQUFnQjtBQXZCYyxLQUFiLENBQW5COztBQTBCQTtBQUNBLFFBQUlDLGVBQWUsNEJBQWE7QUFDOUJ0QixlQUFTO0FBQ1BDLGNBQU0sbURBREM7QUFFUEMsa0JBQVUsSUFGSDtBQUdQQyxtQkFBVyxJQUhKO0FBSVBDLGVBQU8sb0RBSkE7QUFLUEMsbUJBQVc7QUFMSixPQURxQjtBQVE5QkMsa0JB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QVosR0FBcUJBLE1BQXpCLEVBQWlDO0FBQy9COUksaUJBQVNtSSxVQUFVelEsS0FBVixDQUFnQnVCLElBQWhCLENBQXFCLElBQXJCLEVBQTJCNlAsTUFBM0IsQ0FBVDtBQUNEOztBQUVELFdBQUs1QixTQUFMLEdBQWlCbEgsTUFBakI7O0FBRUE7QUFDQSxVQUFJNkksWUFBWSxLQUFoQixFQUF1QjtBQUNyQjVCLHVCQUFlaE8sSUFBZixDQUFvQixJQUFwQjtBQUNEO0FBQ0QsYUFBTyxJQUFQO0FBQ0Q7Ozs7OztrQkFHWXFPLGEiLCJmaWxlIjoiMTEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVSBmcm9tIFwiLi4vLi4vc3JjL0FYNlV0aWxcIjtcbmltcG9ydCBDYWxlbmRhciBmcm9tIFwiLi4vLi4vc3JjL0FYNlVJQ2FsZW5kYXJcIjtcbmltcG9ydCBcIi4uLy4uL3NyYy9BWDZVSUNhbGVuZGFyL3N0eWxlLnNjc3NcIjtcblxuXG5sZXQgaHRtbCA9IGBcbjxkaXYgaWQ9XCJjYWxlbmRhci10YXJnZXQtMFwiIHN0eWxlPVwid2lkdGg6MjcwcHg7cGFkZGluZzogMTBweDtib3JkZXItcmFkaXVzOiA1cHg7ZmxvYXQ6bGVmdDttYXJnaW4tcmlnaHQ6IDIwcHg7XCIgY2xhc3M9XCJjYXJkXCI+PC9kaXY+XG48ZGl2IGlkPVwiY2FsZW5kYXItdGFyZ2V0LTFcIiBzdHlsZT1cIndpZHRoOjI3MHB4O3BhZGRpbmc6IDEwcHg7Ym9yZGVyLXJhZGl1czogNXB4O2Zsb2F0OmxlZnQ7bWFyZ2luLXJpZ2h0OiAyMHB4O1wiIGNsYXNzPVwiY2FyZFwiPjwvZGl2PlxuPGRpdiBzdHlsZT1cImNsZWFyOiBib3RoO1wiPjwvZGl2PlxuPGRpdiBpZD1cImNhbGVuZGFyLXRhcmdldC0yXCIgc3R5bGU9XCJ3aWR0aDoyNzBweDtwYWRkaW5nOiAxMHB4O2JvcmRlci1yYWRpdXM6IDVweDtmbG9hdDpsZWZ0O21hcmdpbi1yaWdodDogMjBweDtcIiBjbGFzcz1cImNhcmRcIj48L2Rpdj5cbjxkaXYgaWQ9XCJjYWxlbmRhci10YXJnZXQtM1wiIHN0eWxlPVwid2lkdGg6MjcwcHg7cGFkZGluZzogMTBweDtib3JkZXItcmFkaXVzOiA1cHg7ZmxvYXQ6bGVmdDttYXJnaW4tcmlnaHQ6IDIwcHg7XCIgY2xhc3M9XCJjYXJkXCI+PC9kaXY+XG48ZGl2IGlkPVwiY2FsZW5kYXItdGFyZ2V0LTRcIiBzdHlsZT1cIndpZHRoOjI3MHB4O3BhZGRpbmc6IDEwcHg7Ym9yZGVyLXJhZGl1czogNXB4O2Zsb2F0OmxlZnQ7bWFyZ2luLXJpZ2h0OiAyMHB4O1wiIGNsYXNzPVwiY2FyZFwiPjwvZGl2PlxuPGRpdiBpZD1cImNhbGVuZGFyLXRhcmdldC01XCIgc3R5bGU9XCJ3aWR0aDoyNzBweDtwYWRkaW5nOiAxMHB4O2JvcmRlci1yYWRpdXM6IDVweDtmbG9hdDpsZWZ0O21hcmdpbi1yaWdodDogMjBweDtcIiBjbGFzcz1cImNhcmRcIj48L2Rpdj5cbmA7XG5sZXQgZm4gPSB7XG4gIG1vZHVsZVJ1bjogZnVuY3Rpb24gKCRib2R5KSB7XG4gICAgbGV0IHRvZGF5ID0gbmV3IERhdGUoKTtcblxuICAgIGxldCBteUNhbGVuZGFyXzAgPSBuZXcgQ2FsZW5kYXIoe1xuICAgICAgY29udHJvbDoge1xuICAgICAgICBsZWZ0OiAnPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmtleWJvYXJkX2Fycm93X2xlZnQ8L2k+JyxcbiAgICAgICAgeWVhclRtcGw6ICclcycsXG4gICAgICAgIG1vbnRoVG1wbDogJyVzJyxcbiAgICAgICAgcmlnaHQ6ICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+a2V5Ym9hcmRfYXJyb3dfcmlnaHQ8L2k+JyxcbiAgICAgICAgeWVhckZpcnN0OiB0cnVlXG4gICAgICB9LFxuICAgICAgZGltZW5zaW9uczoge1xuICAgICAgICBpdGVtUGFkZGluZzogMSxcbiAgICAgICAgaGVpZ2h0OiAyNTBcbiAgICAgIH0sXG4gICAgICB0YXJnZXQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FsZW5kYXItdGFyZ2V0LTBcIiksXG4gICAgICBkaXNwbGF5RGF0ZTogKG5ldyBEYXRlKCkpLFxuICAgICAgc3RhcnRPZldlZWs6IDEsXG4gICAgICBtb2RlOiBcImRheVwiLFxuICAgICAgc2VsZWN0TW9kZTogXCJkYXlcIixcbiAgICAgIG9uQ2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2cobXlDYWxlbmRhcl8wLmdldFNlbGVjdGlvbigpKTtcbiAgICAgIH0sXG4gICAgICBvblN0YXRlQ2hhbmdlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzKTtcbiAgICAgIH0sXG4gICAgICBtdWx0aXBsZVNlbGVjdDogMlxuICAgIH0pO1xuXG4gICAgLy8gc2V0U2VsZWN0aW9uXG4gICAgbGV0IG15Q2FsZW5kYXJfMSA9IG5ldyBDYWxlbmRhcih7XG4gICAgICBjb250cm9sOiB7XG4gICAgICAgIGxlZnQ6ICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+a2V5Ym9hcmRfYXJyb3dfbGVmdDwvaT4nLFxuICAgICAgICB5ZWFyVG1wbDogJyVzJyxcbiAgICAgICAgbW9udGhUbXBsOiAnJXMnLFxuICAgICAgICByaWdodDogJzxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5rZXlib2FyZF9hcnJvd19yaWdodDwvaT4nLFxuICAgICAgICB5ZWFyRmlyc3Q6IHRydWVcbiAgICAgIH0sXG4gICAgICBkaW1lbnNpb25zOiB7XG4gICAgICAgIGl0ZW1QYWRkaW5nOiAxLFxuICAgICAgICBoZWlnaHQ6IDI1MFxuICAgICAgfSxcbiAgICAgIHRhcmdldDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYWxlbmRhci10YXJnZXQtMVwiKSxcbiAgICAgIGRpc3BsYXlEYXRlOiB0b2RheSxcbiAgICAgIHN0YXJ0T2ZXZWVrOiAwLFxuICAgICAgbW9kZTogXCJkYXlcIixcbiAgICAgIHNlbGVjdE1vZGU6IFwiZGF5XCIsXG4gICAgICBtdWx0aXBsZVNlbGVjdDogMlxuICAgIH0pO1xuXG4gICAgbXlDYWxlbmRhcl8xLnNldFNlbGVjdGlvbihbXG4gICAgICBVLmRhdGUodG9kYXksIHsnYWRkJzoge2Q6IC0yfX0pLFxuICAgICAgVS5kYXRlKHRvZGF5LCB7J2FkZCc6IHtkOiAtM319KVxuICAgIF0pO1xuXG4gICAgY29uc29sZS5sb2cobXlDYWxlbmRhcl8xLmdldFNlbGVjdGlvbigpKTtcblxuXG4gICAgbGV0IG15Q2FsZW5kYXJfMiA9IG5ldyBDYWxlbmRhcih7XG4gICAgICB0YXJnZXQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FsZW5kYXItdGFyZ2V0LTJcIiksXG4gICAgICBtYXJrZXI6IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBtYXJrZXIgPSB7fTtcbiAgICAgICAgbWFya2VyW1UuZGF0ZSh0b2RheSwgeydyZXR1cm4nOiAneXl5eS1NTS1kZCcsICdhZGQnOiB7ZDogLTF9fSldID0gdHJ1ZTtcbiAgICAgICAgbWFya2VyW1UuZGF0ZSh0b2RheSwgeydyZXR1cm4nOiAneXl5eS1NTS1kZCcsICdhZGQnOiB7ZDogMH19KV0gPSB0cnVlO1xuICAgICAgICBtYXJrZXJbVS5kYXRlKHRvZGF5LCB7J3JldHVybic6ICd5eXl5LU1NLWRkJywgJ2FkZCc6IHtkOiAxfX0pXSA9IHRydWU7XG4gICAgICAgIHJldHVybiBtYXJrZXI7XG4gICAgICB9KSgpXG4gICAgfSk7XG5cbiAgICAvLyBTZWxlY3RhYmxlXG4gICAgbGV0IG15Q2FsZW5kYXJfMyA9IG5ldyBDYWxlbmRhcih7XG4gICAgICB0YXJnZXQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FsZW5kYXItdGFyZ2V0LTNcIiksXG4gICAgICBzZWxlY3RhYmxlOiBbXG4gICAgICAgIFUuZGF0ZSh0b2RheSwgeydyZXR1cm4nOiAneXl5eS1NTS1kZCcsICdhZGQnOiB7ZDogLTF9fSksXG4gICAgICAgIFUuZGF0ZSh0b2RheSwgeydyZXR1cm4nOiAneXl5eS1NTS1kZCcsICdhZGQnOiB7ZDogMH19KSxcbiAgICAgICAgVS5kYXRlKHRvZGF5LCB7J3JldHVybic6ICd5eXl5LU1NLWRkJywgJ2FkZCc6IHtkOiAxfX0pXG4gICAgICBdLFxuICAgICAgb25DbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzKVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gUGVyaW9kXG4gICAgbGV0IG15Q2FsZW5kYXJfNCA9IG5ldyBDYWxlbmRhcih7XG4gICAgICBjb250cm9sOiB7XG4gICAgICAgIGxlZnQ6ICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+a2V5Ym9hcmRfYXJyb3dfbGVmdDwvaT4nLFxuICAgICAgICB5ZWFyVG1wbDogJyVzJyxcbiAgICAgICAgbW9udGhUbXBsOiAnJXMnLFxuICAgICAgICByaWdodDogJzxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5rZXlib2FyZF9hcnJvd19yaWdodDwvaT4nLFxuICAgICAgICB5ZWFyRmlyc3Q6IHRydWVcbiAgICAgIH0sXG4gICAgICB0YXJnZXQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FsZW5kYXItdGFyZ2V0LTRcIiksXG4gICAgICBtdWx0aXBsZVNlbGVjdDogMixcbiAgICAgIG9uQ2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IGRhdGVzID0gdGhpcy5zZWxmLmdldFNlbGVjdGlvbigpO1xuICAgICAgICBpZiAoZGF0ZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgIGxldCBtaW5EYXRlID0gbmV3IERhdGUoTWF0aC5taW4oVS5kYXRlKGRhdGVzWzBdKS5nZXRUaW1lKCksIFUuZGF0ZShkYXRlc1sxXSkuZ2V0VGltZSgpKSk7XG4gICAgICAgICAgbGV0IG1heERhdGUgPSBuZXcgRGF0ZShNYXRoLm1heChVLmRhdGUoZGF0ZXNbMF0pLmdldFRpbWUoKSwgVS5kYXRlKGRhdGVzWzFdKS5nZXRUaW1lKCkpKTtcblxuICAgICAgICAgIHRoaXMuc2VsZi5zZXRQZXJpb2Qoe1xuICAgICAgICAgICAgcmFuZ2U6IFtcbiAgICAgICAgICAgICAge2Zyb206IG1pbkRhdGUsIHRvOiBtYXhEYXRlLCBmcm9tTGFiZWw6ICdTJywgdG9MYWJlbDogJ0UnfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgLy8gY2hhbmdlTW9kZVxuICAgIGxldCBteUNhbGVuZGFyXzUgPSBuZXcgQ2FsZW5kYXIoe1xuICAgICAgY29udHJvbDoge1xuICAgICAgICBsZWZ0OiAnPGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmtleWJvYXJkX2Fycm93X2xlZnQ8L2k+JyxcbiAgICAgICAgeWVhclRtcGw6ICclcycsXG4gICAgICAgIG1vbnRoVG1wbDogJyVzJyxcbiAgICAgICAgcmlnaHQ6ICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+a2V5Ym9hcmRfYXJyb3dfcmlnaHQ8L2k+JyxcbiAgICAgICAgeWVhckZpcnN0OiB0cnVlXG4gICAgICB9LFxuICAgICAgZGltZW5zaW9uczoge1xuICAgICAgICBpdGVtUGFkZGluZzogMSxcbiAgICAgICAgaGVpZ2h0OiAyNTBcbiAgICAgIH0sXG4gICAgICB0YXJnZXQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FsZW5kYXItdGFyZ2V0LTVcIiksXG4gICAgICBkaXNwbGF5RGF0ZTogKG5ldyBEYXRlKCkpLFxuICAgICAgc3RhcnRPZldlZWs6IDEsXG4gICAgICBtb2RlOiBcImRheVwiLFxuICAgICAgc2VsZWN0TW9kZTogXCJkYXlcIixcbiAgICAgIG9uQ2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2cobXlDYWxlbmRhcl8wLmdldFNlbGVjdGlvbigpKTtcbiAgICAgIH0sXG4gICAgICBvblN0YXRlQ2hhbmdlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzKTtcbiAgICAgIH0sXG4gICAgICBtdWx0aXBsZVNlbGVjdDogMlxuICAgIH0pO1xuICAgIG15Q2FsZW5kYXJfNS5jaGFuZ2VNb2RlKFwieVwiKTtcbiAgfSxcbiAgbW9kdWxlRGVzdHJveTogZnVuY3Rpb24gKCRib2R5KSB7XG4gICAgJGJvZHkub2ZmKFwiY2xpY2tcIik7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaHRtbDogaHRtbCxcbiAgZm46IGZuXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NhbGVuZGFyLmpzIiwiLyohXG4gKiBtdXN0YWNoZS5qcyAtIExvZ2ljLWxlc3Mge3ttdXN0YWNoZX19IHRlbXBsYXRlcyB3aXRoIEphdmFTY3JpcHRcbiAqIGh0dHA6Ly9naXRodWIuY29tL2phbmwvbXVzdGFjaGUuanNcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS90aG9tYXNKYW5nL211c3RhY2hlLmpzIC0tIGltcG9yb3ZlIHNvbWUgdmFyaWFibGVzXG4gKi9cblxuXG4vKipcbiAqIEFYNk11c3RhY2hl64qUIGh0dHA6Ly9naXRodWIuY29tL2phbmwvbXVzdGFjaGUuanPsl5Ag66qH6rCA7KeAIOy1nOyGjO2VnOydmCDquLDriqXsnYQg7Yqc64ud7ZWY7JesIOyCrOyaqe2VmOuKlCDthZztlIzrpr8g7JeU7KeE7J6F64uI64ukLlxuICogQG5hbWVzcGFjZSBBWDZNdXN0YWNoZVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBBWDZNdXN0YWNoZS5yZW5kZXJcbiAqIEBleGFtcGxlXG4gKiBgYGBqc1xuICogYXg1Lm11c3RhY2hlLnJlbmRlcih0ZW1wbGF0ZSwgdmlldylcbiAqXG4gKlxuICogLy9BcnJheSBAaVxuICogLy97eyNiZWF0bGVzfX1cbiAqIC8ve3tmaXJzdE5hbWV9fSB7e2xhc3ROYW1lfX0gKHt7QGl9fSkgKHt7QGZpcnN0fX0pXG4gKiAvL3t7L2JlYXRsZXN9fVxuICpcbiAqIC8vT2JqZWN0IEBlYWNoXG4gKiB7eyNiZWF0bGVzfX1cbiAqICB7eyNAZWFjaH19XG4gKiAgICAgIHt7QGtleX19IDoge3tAdmFsdWUuZmlyc3ROYW1lfX0ge3tAdmFsdWUubGFzdE5hbWV9fVxuICogIHt7L0BlYWNofX1cbiAqIHt7L2JlYXRsZXN9fVxuICpcbiAqIGBgYFxuICovXG5cblxuXG5sZXQgQVg2ID0ge307XG5cbihmdW5jdGlvbiBkZWZpbmVNdXN0YWNoZShnbG9iYWwsIGZhY3RvcnkpIHtcblxuICBmYWN0b3J5KGdsb2JhbC5tdXN0YWNoZSA9IHt9KTtcblxufShBWDYsIGZ1bmN0aW9uIG11c3RhY2hlRmFjdG9yeShtdXN0YWNoZSkge1xuXG4gIHZhciBvYmplY3RUb1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG4gIHZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiBpc0FycmF5UG9seWZpbGwob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdFRvU3RyaW5nLmNhbGwob2JqZWN0KSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgfTtcblxuICBmdW5jdGlvbiBpc0Z1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnZnVuY3Rpb24nO1xuICB9XG5cbiAgLyoqXG4gICAqIE1vcmUgY29ycmVjdCB0eXBlb2Ygc3RyaW5nIGhhbmRsaW5nIGFycmF5XG4gICAqIHdoaWNoIG5vcm1hbGx5IHJldHVybnMgdHlwZW9mICdvYmplY3QnXG4gICAqL1xuICBmdW5jdGlvbiB0eXBlU3RyKG9iaikge1xuICAgIHJldHVybiBpc0FycmF5KG9iaikgPyAnYXJyYXknIDogdHlwZW9mIG9iajtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVzY2FwZVJlZ0V4cChzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoL1tcXC1cXFtcXF17fSgpKis/LixcXFxcXFxeJHwjXFxzXS9nLCAnXFxcXCQmJyk7XG4gIH1cblxuICAvKipcbiAgICogTnVsbCBzYWZlIHdheSBvZiBjaGVja2luZyB3aGV0aGVyIG9yIG5vdCBhbiBvYmplY3QsXG4gICAqIGluY2x1ZGluZyBpdHMgcHJvdG90eXBlLCBoYXMgYSBnaXZlbiBwcm9wZXJ0eVxuICAgKi9cbiAgZnVuY3Rpb24gaGFzUHJvcGVydHkob2JqLCBwcm9wTmFtZSkge1xuICAgIHJldHVybiBvYmogIT0gbnVsbCAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiAocHJvcE5hbWUgaW4gb2JqKTtcbiAgfVxuXG4gIC8vIFdvcmthcm91bmQgZm9yIGh0dHBzOi8vaXNzdWVzLmFwYWNoZS5vcmcvamlyYS9icm93c2UvQ09VQ0hEQi01NzdcbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qYW5sL211c3RhY2hlLmpzL2lzc3Vlcy8xODlcbiAgdmFyIHJlZ0V4cFRlc3QgPSBSZWdFeHAucHJvdG90eXBlLnRlc3Q7XG5cbiAgZnVuY3Rpb24gdGVzdFJlZ0V4cChyZSwgc3RyaW5nKSB7XG4gICAgcmV0dXJuIHJlZ0V4cFRlc3QuY2FsbChyZSwgc3RyaW5nKTtcbiAgfVxuXG4gIHZhciBub25TcGFjZVJlID0gL1xcUy87XG5cbiAgZnVuY3Rpb24gaXNXaGl0ZXNwYWNlKHN0cmluZykge1xuICAgIHJldHVybiAhdGVzdFJlZ0V4cChub25TcGFjZVJlLCBzdHJpbmcpO1xuICB9XG5cbiAgdmFyIGVudGl0eU1hcCA9IHtcbiAgICAnJic6ICcmYW1wOycsICc8JzogJyZsdDsnLCAnPic6ICcmZ3Q7JywgJ1wiJzogJyZxdW90OycsIFwiJ1wiOiAnJiMzOTsnLCAnLyc6ICcmI3gyRjsnXG4gIH07XG5cbiAgZnVuY3Rpb24gZXNjYXBlSHRtbChzdHJpbmcpIHtcbiAgICByZXR1cm4gU3RyaW5nKHN0cmluZykucmVwbGFjZSgvWyY8PlwiJ1xcL10vZywgZnVuY3Rpb24gZnJvbUVudGl0eU1hcChzKSB7XG4gICAgICByZXR1cm4gZW50aXR5TWFwW3NdO1xuICAgIH0pO1xuICB9XG5cbiAgdmFyIHdoaXRlUmUgPSAvXFxzKi87XG4gIHZhciBzcGFjZVJlID0gL1xccysvO1xuICB2YXIgZXF1YWxzUmUgPSAvXFxzKj0vO1xuICB2YXIgY3VybHlSZSA9IC9cXHMqXFx9LztcbiAgdmFyIHRhZ1JlID0gLyN8XFxefFxcL3w+fFxce3wmfD18IS87XG5cbiAgLyoqXG4gICAqIEJyZWFrcyB1cCB0aGUgZ2l2ZW4gYHRlbXBsYXRlYCBzdHJpbmcgaW50byBhIHRyZWUgb2YgdG9rZW5zLiBJZiB0aGUgYHRhZ3NgXG4gICAqIGFyZ3VtZW50IGlzIGdpdmVuIGhlcmUgaXQgbXVzdCBiZSBhbiBhcnJheSB3aXRoIHR3byBzdHJpbmcgdmFsdWVzOiB0aGVcbiAgICogb3BlbmluZyBhbmQgY2xvc2luZyB0YWdzIHVzZWQgaW4gdGhlIHRlbXBsYXRlIChlLmcuIFsgXCI8JVwiLCBcIiU+XCIgXSkuIE9mXG4gICAqIGNvdXJzZSwgdGhlIGRlZmF1bHQgaXMgdG8gdXNlIG11c3RhY2hlcyAoaS5lLiBtdXN0YWNoZS50YWdzKS5cbiAgICpcbiAgICogQSB0b2tlbiBpcyBhbiBhcnJheSB3aXRoIGF0IGxlYXN0IDQgZWxlbWVudHMuIFRoZSBmaXJzdCBlbGVtZW50IGlzIHRoZVxuICAgKiBtdXN0YWNoZSBzeW1ib2wgdGhhdCB3YXMgdXNlZCBpbnNpZGUgdGhlIHRhZywgZS5nLiBcIiNcIiBvciBcIiZcIi4gSWYgdGhlIHRhZ1xuICAgKiBkaWQgbm90IGNvbnRhaW4gYSBzeW1ib2wgKGkuZS4ge3tteVZhbHVlfX0pIHRoaXMgZWxlbWVudCBpcyBcIm5hbWVcIi4gRm9yXG4gICAqIGFsbCB0ZXh0IHRoYXQgYXBwZWFycyBvdXRzaWRlIGEgc3ltYm9sIHRoaXMgZWxlbWVudCBpcyBcInRleHRcIi5cbiAgICpcbiAgICogVGhlIHNlY29uZCBlbGVtZW50IG9mIGEgdG9rZW4gaXMgaXRzIFwidmFsdWVcIi4gRm9yIG11c3RhY2hlIHRhZ3MgdGhpcyBpc1xuICAgKiB3aGF0ZXZlciBlbHNlIHdhcyBpbnNpZGUgdGhlIHRhZyBiZXNpZGVzIHRoZSBvcGVuaW5nIHN5bWJvbC4gRm9yIHRleHQgdG9rZW5zXG4gICAqIHRoaXMgaXMgdGhlIHRleHQgaXRzZWxmLlxuICAgKlxuICAgKiBUaGUgdGhpcmQgYW5kIGZvdXJ0aCBlbGVtZW50cyBvZiB0aGUgdG9rZW4gYXJlIHRoZSBzdGFydCBhbmQgZW5kIGluZGljZXMsXG4gICAqIHJlc3BlY3RpdmVseSwgb2YgdGhlIHRva2VuIGluIHRoZSBvcmlnaW5hbCB0ZW1wbGF0ZS5cbiAgICpcbiAgICogVG9rZW5zIHRoYXQgYXJlIHRoZSByb290IG5vZGUgb2YgYSBzdWJ0cmVlIGNvbnRhaW4gdHdvIG1vcmUgZWxlbWVudHM6IDEpIGFuXG4gICAqIGFycmF5IG9mIHRva2VucyBpbiB0aGUgc3VidHJlZSBhbmQgMikgdGhlIGluZGV4IGluIHRoZSBvcmlnaW5hbCB0ZW1wbGF0ZSBhdFxuICAgKiB3aGljaCB0aGUgY2xvc2luZyB0YWcgZm9yIHRoYXQgc2VjdGlvbiBiZWdpbnMuXG4gICAqL1xuICBmdW5jdGlvbiBwYXJzZVRlbXBsYXRlKHRlbXBsYXRlLCB0YWdzKSB7XG4gICAgaWYgKCF0ZW1wbGF0ZSlcbiAgICAgIHJldHVybiBbXTtcblxuICAgIHZhciBzZWN0aW9ucyA9IFtdOyAgICAgLy8gU3RhY2sgdG8gaG9sZCBzZWN0aW9uIHRva2Vuc1xuICAgIHZhciB0b2tlbnMgPSBbXTsgICAgICAgLy8gQnVmZmVyIHRvIGhvbGQgdGhlIHRva2Vuc1xuICAgIHZhciBzcGFjZXMgPSBbXTsgICAgICAgLy8gSW5kaWNlcyBvZiB3aGl0ZXNwYWNlIHRva2VucyBvbiB0aGUgY3VycmVudCBsaW5lXG4gICAgdmFyIGhhc1RhZyA9IGZhbHNlOyAgICAvLyBJcyB0aGVyZSBhIHt7dGFnfX0gb24gdGhlIGN1cnJlbnQgbGluZT9cbiAgICB2YXIgbm9uU3BhY2UgPSBmYWxzZTsgIC8vIElzIHRoZXJlIGEgbm9uLXNwYWNlIGNoYXIgb24gdGhlIGN1cnJlbnQgbGluZT9cblxuICAgIC8vIFN0cmlwcyBhbGwgd2hpdGVzcGFjZSB0b2tlbnMgYXJyYXkgZm9yIHRoZSBjdXJyZW50IGxpbmVcbiAgICAvLyBpZiB0aGVyZSB3YXMgYSB7eyN0YWd9fSBvbiBpdCBhbmQgb3RoZXJ3aXNlIG9ubHkgc3BhY2UuXG4gICAgZnVuY3Rpb24gc3RyaXBTcGFjZSgpIHtcbiAgICAgIGlmIChoYXNUYWcgJiYgIW5vblNwYWNlKSB7XG4gICAgICAgIHdoaWxlIChzcGFjZXMubGVuZ3RoKVxuICAgICAgICAgIGRlbGV0ZSB0b2tlbnNbc3BhY2VzLnBvcCgpXTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBzcGFjZXMgPSBbXTtcbiAgICAgIH1cblxuICAgICAgaGFzVGFnID0gZmFsc2U7XG4gICAgICBub25TcGFjZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBvcGVuaW5nVGFnUmUsIGNsb3NpbmdUYWdSZSwgY2xvc2luZ0N1cmx5UmU7XG5cbiAgICBmdW5jdGlvbiBjb21waWxlVGFncyh0YWdzVG9Db21waWxlKSB7XG4gICAgICBpZiAodHlwZW9mIHRhZ3NUb0NvbXBpbGUgPT09ICdzdHJpbmcnKVxuICAgICAgICB0YWdzVG9Db21waWxlID0gdGFnc1RvQ29tcGlsZS5zcGxpdChzcGFjZVJlLCAyKTtcblxuICAgICAgaWYgKCFpc0FycmF5KHRhZ3NUb0NvbXBpbGUpIHx8IHRhZ3NUb0NvbXBpbGUubGVuZ3RoICE9PSAyKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgdGFnczogJyArIHRhZ3NUb0NvbXBpbGUpO1xuXG4gICAgICBvcGVuaW5nVGFnUmUgPSBuZXcgUmVnRXhwKGVzY2FwZVJlZ0V4cCh0YWdzVG9Db21waWxlWzBdKSArICdcXFxccyonKTtcbiAgICAgIGNsb3NpbmdUYWdSZSA9IG5ldyBSZWdFeHAoJ1xcXFxzKicgKyBlc2NhcGVSZWdFeHAodGFnc1RvQ29tcGlsZVsxXSkpO1xuICAgICAgY2xvc2luZ0N1cmx5UmUgPSBuZXcgUmVnRXhwKCdcXFxccyonICsgZXNjYXBlUmVnRXhwKCd9JyArIHRhZ3NUb0NvbXBpbGVbMV0pKTtcbiAgICB9XG5cbiAgICBjb21waWxlVGFncyh0YWdzIHx8IG11c3RhY2hlLnRhZ3MpO1xuXG4gICAgdmFyIHNjYW5uZXIgPSBuZXcgU2Nhbm5lcih0ZW1wbGF0ZSk7XG5cbiAgICB2YXIgc3RhcnQsIHR5cGUsIHZhbHVlLCBjaHIsIHRva2VuLCBvcGVuU2VjdGlvbjtcbiAgICB3aGlsZSAoIXNjYW5uZXIuZW9zKCkpIHtcbiAgICAgIHN0YXJ0ID0gc2Nhbm5lci5wb3M7XG5cbiAgICAgIC8vIE1hdGNoIGFueSB0ZXh0IGJldHdlZW4gdGFncy5cbiAgICAgIHZhbHVlID0gc2Nhbm5lci5zY2FuVW50aWwob3BlbmluZ1RhZ1JlKTtcblxuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCB2YWx1ZUxlbmd0aCA9IHZhbHVlLmxlbmd0aDsgaSA8IHZhbHVlTGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBjaHIgPSB2YWx1ZS5jaGFyQXQoaSk7XG5cbiAgICAgICAgICBpZiAoaXNXaGl0ZXNwYWNlKGNocikpIHtcbiAgICAgICAgICAgIHNwYWNlcy5wdXNoKHRva2Vucy5sZW5ndGgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG5vblNwYWNlID0gdHJ1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0b2tlbnMucHVzaChbJ3RleHQnLCBjaHIsIHN0YXJ0LCBzdGFydCArIDFdKTtcbiAgICAgICAgICBzdGFydCArPSAxO1xuXG4gICAgICAgICAgLy8gQ2hlY2sgZm9yIHdoaXRlc3BhY2Ugb24gdGhlIGN1cnJlbnQgbGluZS5cbiAgICAgICAgICBpZiAoY2hyID09PSAnXFxuJylcbiAgICAgICAgICAgIHN0cmlwU3BhY2UoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBNYXRjaCB0aGUgb3BlbmluZyB0YWcuXG4gICAgICBpZiAoIXNjYW5uZXIuc2NhbihvcGVuaW5nVGFnUmUpKVxuICAgICAgICBicmVhaztcblxuICAgICAgaGFzVGFnID0gdHJ1ZTtcblxuICAgICAgLy8gR2V0IHRoZSB0YWcgdHlwZS5cbiAgICAgIHR5cGUgPSBzY2FubmVyLnNjYW4odGFnUmUpIHx8ICduYW1lJztcbiAgICAgIHNjYW5uZXIuc2Nhbih3aGl0ZVJlKTtcblxuICAgICAgLy8gR2V0IHRoZSB0YWcgdmFsdWUuXG4gICAgICBpZiAodHlwZSA9PT0gJz0nKSB7XG4gICAgICAgIHZhbHVlID0gc2Nhbm5lci5zY2FuVW50aWwoZXF1YWxzUmUpO1xuICAgICAgICBzY2FubmVyLnNjYW4oZXF1YWxzUmUpO1xuICAgICAgICBzY2FubmVyLnNjYW5VbnRpbChjbG9zaW5nVGFnUmUpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJ3snKSB7XG4gICAgICAgIHZhbHVlID0gc2Nhbm5lci5zY2FuVW50aWwoY2xvc2luZ0N1cmx5UmUpO1xuICAgICAgICBzY2FubmVyLnNjYW4oY3VybHlSZSk7XG4gICAgICAgIHNjYW5uZXIuc2NhblVudGlsKGNsb3NpbmdUYWdSZSk7XG4gICAgICAgIHR5cGUgPSAnJic7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBzY2FubmVyLnNjYW5VbnRpbChjbG9zaW5nVGFnUmUpO1xuICAgICAgfVxuXG4gICAgICAvLyBNYXRjaCB0aGUgY2xvc2luZyB0YWcuXG4gICAgICBpZiAoIXNjYW5uZXIuc2NhbihjbG9zaW5nVGFnUmUpKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuY2xvc2VkIHRhZyBhdCAnICsgc2Nhbm5lci5wb3MpO1xuXG4gICAgICB0b2tlbiA9IFt0eXBlLCB2YWx1ZSwgc3RhcnQsIHNjYW5uZXIucG9zXTtcbiAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcblxuICAgICAgaWYgKHR5cGUgPT09ICcjJyB8fCB0eXBlID09PSAnXicpIHtcbiAgICAgICAgc2VjdGlvbnMucHVzaCh0b2tlbik7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0eXBlID09PSAnLycpIHtcbiAgICAgICAgLy8gQ2hlY2sgc2VjdGlvbiBuZXN0aW5nLlxuICAgICAgICBvcGVuU2VjdGlvbiA9IHNlY3Rpb25zLnBvcCgpO1xuXG4gICAgICAgIGlmICghb3BlblNlY3Rpb24pXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbm9wZW5lZCBzZWN0aW9uIFwiJyArIHZhbHVlICsgJ1wiIGF0ICcgKyBzdGFydCk7XG5cbiAgICAgICAgaWYgKG9wZW5TZWN0aW9uWzFdICE9PSB2YWx1ZSlcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuY2xvc2VkIHNlY3Rpb24gXCInICsgb3BlblNlY3Rpb25bMV0gKyAnXCIgYXQgJyArIHN0YXJ0KTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICduYW1lJyB8fCB0eXBlID09PSAneycgfHwgdHlwZSA9PT0gJyYnKSB7XG4gICAgICAgIG5vblNwYWNlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICc9Jykge1xuICAgICAgICAvLyBTZXQgdGhlIHRhZ3MgZm9yIHRoZSBuZXh0IHRpbWUgYXJvdW5kLlxuICAgICAgICBjb21waWxlVGFncyh2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gTWFrZSBzdXJlIHRoZXJlIGFyZSBubyBvcGVuIHNlY3Rpb25zIHdoZW4gd2UncmUgZG9uZS5cbiAgICBvcGVuU2VjdGlvbiA9IHNlY3Rpb25zLnBvcCgpO1xuXG4gICAgaWYgKG9wZW5TZWN0aW9uKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmNsb3NlZCBzZWN0aW9uIFwiJyArIG9wZW5TZWN0aW9uWzFdICsgJ1wiIGF0ICcgKyBzY2FubmVyLnBvcyk7XG5cbiAgICByZXR1cm4gbmVzdFRva2VucyhzcXVhc2hUb2tlbnModG9rZW5zKSk7XG4gIH1cblxuICAvKipcbiAgICogQ29tYmluZXMgdGhlIHZhbHVlcyBvZiBjb25zZWN1dGl2ZSB0ZXh0IHRva2VucyBpbiB0aGUgZ2l2ZW4gYHRva2Vuc2AgYXJyYXlcbiAgICogdG8gYSBzaW5nbGUgdG9rZW4uXG4gICAqL1xuICBmdW5jdGlvbiBzcXVhc2hUb2tlbnModG9rZW5zKSB7XG4gICAgdmFyIHNxdWFzaGVkVG9rZW5zID0gW107XG5cbiAgICB2YXIgdG9rZW4sIGxhc3RUb2tlbjtcbiAgICBmb3IgKHZhciBpID0gMCwgbnVtVG9rZW5zID0gdG9rZW5zLmxlbmd0aDsgaSA8IG51bVRva2VuczsgKytpKSB7XG4gICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcblxuICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgIGlmICh0b2tlblswXSA9PT0gJ3RleHQnICYmIGxhc3RUb2tlbiAmJiBsYXN0VG9rZW5bMF0gPT09ICd0ZXh0Jykge1xuICAgICAgICAgIGxhc3RUb2tlblsxXSArPSB0b2tlblsxXTtcbiAgICAgICAgICBsYXN0VG9rZW5bM10gPSB0b2tlblszXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBzcXVhc2hlZFRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgICBsYXN0VG9rZW4gPSB0b2tlbjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzcXVhc2hlZFRva2VucztcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JtcyB0aGUgZ2l2ZW4gYXJyYXkgb2YgYHRva2Vuc2AgaW50byBhIG5lc3RlZCB0cmVlIHN0cnVjdHVyZSB3aGVyZVxuICAgKiB0b2tlbnMgdGhhdCByZXByZXNlbnQgYSBzZWN0aW9uIGhhdmUgdHdvIGFkZGl0aW9uYWwgaXRlbXM6IDEpIGFuIGFycmF5IG9mXG4gICAqIGFsbCB0b2tlbnMgdGhhdCBhcHBlYXIgaW4gdGhhdCBzZWN0aW9uIGFuZCAyKSB0aGUgaW5kZXggaW4gdGhlIG9yaWdpbmFsXG4gICAqIHRlbXBsYXRlIHRoYXQgcmVwcmVzZW50cyB0aGUgZW5kIG9mIHRoYXQgc2VjdGlvbi5cbiAgICovXG4gIGZ1bmN0aW9uIG5lc3RUb2tlbnModG9rZW5zKSB7XG4gICAgdmFyIG5lc3RlZFRva2VucyA9IFtdO1xuICAgIHZhciBjb2xsZWN0b3IgPSBuZXN0ZWRUb2tlbnM7XG4gICAgdmFyIHNlY3Rpb25zID0gW107XG5cbiAgICB2YXIgdG9rZW4sIHNlY3Rpb247XG4gICAgZm9yICh2YXIgaSA9IDAsIG51bVRva2VucyA9IHRva2Vucy5sZW5ndGg7IGkgPCBudW1Ub2tlbnM7ICsraSkge1xuICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XG5cbiAgICAgIHN3aXRjaCAodG9rZW5bMF0pIHtcbiAgICAgICAgY2FzZSAnIyc6XG4gICAgICAgIGNhc2UgJ14nOlxuICAgICAgICAgIGNvbGxlY3Rvci5wdXNoKHRva2VuKTtcbiAgICAgICAgICBzZWN0aW9ucy5wdXNoKHRva2VuKTtcbiAgICAgICAgICBjb2xsZWN0b3IgPSB0b2tlbls0XSA9IFtdO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICcvJzpcbiAgICAgICAgICBzZWN0aW9uID0gc2VjdGlvbnMucG9wKCk7XG4gICAgICAgICAgc2VjdGlvbls1XSA9IHRva2VuWzJdO1xuICAgICAgICAgIGNvbGxlY3RvciA9IHNlY3Rpb25zLmxlbmd0aCA+IDAgPyBzZWN0aW9uc1tzZWN0aW9ucy5sZW5ndGggLSAxXVs0XSA6IG5lc3RlZFRva2VucztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb2xsZWN0b3IucHVzaCh0b2tlbik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5lc3RlZFRva2VucztcbiAgfVxuXG4gIC8qKlxuICAgKiBBIHNpbXBsZSBzdHJpbmcgc2Nhbm5lciB0aGF0IGlzIHVzZWQgYnkgdGhlIHRlbXBsYXRlIHBhcnNlciB0byBmaW5kXG4gICAqIHRva2VucyBpbiB0ZW1wbGF0ZSBzdHJpbmdzLlxuICAgKi9cbiAgZnVuY3Rpb24gU2Nhbm5lcihzdHJpbmcpIHtcbiAgICB0aGlzLnN0cmluZyA9IHN0cmluZztcbiAgICB0aGlzLnRhaWwgPSBzdHJpbmc7XG4gICAgdGhpcy5wb3MgPSAwO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYHRydWVgIGlmIHRoZSB0YWlsIGlzIGVtcHR5IChlbmQgb2Ygc3RyaW5nKS5cbiAgICovXG4gIFNjYW5uZXIucHJvdG90eXBlLmVvcyA9IGZ1bmN0aW9uIGVvcygpIHtcbiAgICByZXR1cm4gdGhpcy50YWlsID09PSAnJztcbiAgfTtcblxuICAvKipcbiAgICogVHJpZXMgdG8gbWF0Y2ggdGhlIGdpdmVuIHJlZ3VsYXIgZXhwcmVzc2lvbiBhdCB0aGUgY3VycmVudCBwb3NpdGlvbi5cbiAgICogUmV0dXJucyB0aGUgbWF0Y2hlZCB0ZXh0IGlmIGl0IGNhbiBtYXRjaCwgdGhlIGVtcHR5IHN0cmluZyBvdGhlcndpc2UuXG4gICAqL1xuICBTY2FubmVyLnByb3RvdHlwZS5zY2FuID0gZnVuY3Rpb24gc2NhbihyZSkge1xuICAgIHZhciBtYXRjaCA9IHRoaXMudGFpbC5tYXRjaChyZSk7XG5cbiAgICBpZiAoIW1hdGNoIHx8IG1hdGNoLmluZGV4ICE9PSAwKVxuICAgICAgcmV0dXJuICcnO1xuXG4gICAgdmFyIHN0cmluZyA9IG1hdGNoWzBdO1xuXG4gICAgdGhpcy50YWlsID0gdGhpcy50YWlsLnN1YnN0cmluZyhzdHJpbmcubGVuZ3RoKTtcbiAgICB0aGlzLnBvcyArPSBzdHJpbmcubGVuZ3RoO1xuXG4gICAgcmV0dXJuIHN0cmluZztcbiAgfTtcblxuICAvKipcbiAgICogU2tpcHMgYWxsIHRleHQgdW50aWwgdGhlIGdpdmVuIHJlZ3VsYXIgZXhwcmVzc2lvbiBjYW4gYmUgbWF0Y2hlZC4gUmV0dXJuc1xuICAgKiB0aGUgc2tpcHBlZCBzdHJpbmcsIHdoaWNoIGlzIHRoZSBlbnRpcmUgdGFpbCBpZiBubyBtYXRjaCBjYW4gYmUgbWFkZS5cbiAgICovXG4gIFNjYW5uZXIucHJvdG90eXBlLnNjYW5VbnRpbCA9IGZ1bmN0aW9uIHNjYW5VbnRpbChyZSkge1xuICAgIHZhciBpbmRleCA9IHRoaXMudGFpbC5zZWFyY2gocmUpLCBtYXRjaDtcblxuICAgIHN3aXRjaCAoaW5kZXgpIHtcbiAgICAgIGNhc2UgLTE6XG4gICAgICAgIG1hdGNoID0gdGhpcy50YWlsO1xuICAgICAgICB0aGlzLnRhaWwgPSAnJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIG1hdGNoID0gJyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbWF0Y2ggPSB0aGlzLnRhaWwuc3Vic3RyaW5nKDAsIGluZGV4KTtcbiAgICAgICAgdGhpcy50YWlsID0gdGhpcy50YWlsLnN1YnN0cmluZyhpbmRleCk7XG4gICAgfVxuXG4gICAgdGhpcy5wb3MgKz0gbWF0Y2gubGVuZ3RoO1xuXG4gICAgcmV0dXJuIG1hdGNoO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXByZXNlbnRzIGEgcmVuZGVyaW5nIGNvbnRleHQgYnkgd3JhcHBpbmcgYSB2aWV3IG9iamVjdCBhbmRcbiAgICogbWFpbnRhaW5pbmcgYSByZWZlcmVuY2UgdG8gdGhlIHBhcmVudCBjb250ZXh0LlxuICAgKi9cbiAgZnVuY3Rpb24gQ29udGV4dCh2aWV3LCBwYXJlbnRDb250ZXh0KSB7XG4gICAgdGhpcy52aWV3ID0gdmlldztcbiAgICB0aGlzLmNhY2hlID0ge1xuICAgICAgJy4nOiB0aGlzLnZpZXcsXG4gICAgICAnQGVhY2gnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByZXR1cm5zID0gW107XG4gICAgICAgIGZvciAodmFyIGsgaW4gdGhpcykge1xuICAgICAgICAgIHJldHVybnMucHVzaCh7J0BrZXknOiBrLCAnQHZhbHVlJzogdGhpc1trXX0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXR1cm5zO1xuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5wYXJlbnQgPSBwYXJlbnRDb250ZXh0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgY29udGV4dCB1c2luZyB0aGUgZ2l2ZW4gdmlldyB3aXRoIHRoaXMgY29udGV4dFxuICAgKiBhcyB0aGUgcGFyZW50LlxuICAgKi9cbiAgQ29udGV4dC5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIHB1c2godmlldykge1xuICAgIHJldHVybiBuZXcgQ29udGV4dCh2aWV3LCB0aGlzKTtcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhlIGdpdmVuIG5hbWUgaW4gdGhpcyBjb250ZXh0LCB0cmF2ZXJzaW5nXG4gICAqIHVwIHRoZSBjb250ZXh0IGhpZXJhcmNoeSBpZiB0aGUgdmFsdWUgaXMgYWJzZW50IGluIHRoaXMgY29udGV4dCdzIHZpZXcuXG4gICAqL1xuICBDb250ZXh0LnByb3RvdHlwZS5sb29rdXAgPSBmdW5jdGlvbiBsb29rdXAobmFtZSkge1xuICAgIHZhciBjYWNoZSA9IHRoaXMuY2FjaGU7XG5cbiAgICB2YXIgdmFsdWU7XG4gICAgaWYgKGNhY2hlLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICB2YWx1ZSA9IGNhY2hlW25hbWVdO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcywgbmFtZXMsIGluZGV4LCBsb29rdXBIaXQgPSBmYWxzZTtcblxuICAgICAgd2hpbGUgKGNvbnRleHQpIHtcbiAgICAgICAgaWYgKG5hbWUuaW5kZXhPZignLicpID4gMCkge1xuICAgICAgICAgIHZhbHVlID0gY29udGV4dC52aWV3O1xuICAgICAgICAgIG5hbWVzID0gbmFtZS5zcGxpdCgnLicpO1xuICAgICAgICAgIGluZGV4ID0gMDtcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIFVzaW5nIHRoZSBkb3Qgbm90aW9uIHBhdGggaW4gYG5hbWVgLCB3ZSBkZXNjZW5kIHRocm91Z2ggdGhlXG4gICAgICAgICAgICogbmVzdGVkIG9iamVjdHMuXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBUbyBiZSBjZXJ0YWluIHRoYXQgdGhlIGxvb2t1cCBoYXMgYmVlbiBzdWNjZXNzZnVsLCB3ZSBoYXZlIHRvXG4gICAgICAgICAgICogY2hlY2sgaWYgdGhlIGxhc3Qgb2JqZWN0IGluIHRoZSBwYXRoIGFjdHVhbGx5IGhhcyB0aGUgcHJvcGVydHlcbiAgICAgICAgICAgKiB3ZSBhcmUgbG9va2luZyBmb3IuIFdlIHN0b3JlIHRoZSByZXN1bHQgaW4gYGxvb2t1cEhpdGAuXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBUaGlzIGlzIHNwZWNpYWxseSBuZWNlc3NhcnkgZm9yIHdoZW4gdGhlIHZhbHVlIGhhcyBiZWVuIHNldCB0b1xuICAgICAgICAgICAqIGB1bmRlZmluZWRgIGFuZCB3ZSB3YW50IHRvIGF2b2lkIGxvb2tpbmcgdXAgcGFyZW50IGNvbnRleHRzLlxuICAgICAgICAgICAqKi9cbiAgICAgICAgICB3aGlsZSAodmFsdWUgIT0gbnVsbCAmJiBpbmRleCA8IG5hbWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGluZGV4ID09PSBuYW1lcy5sZW5ndGggLSAxKVxuICAgICAgICAgICAgICBsb29rdXBIaXQgPSBoYXNQcm9wZXJ0eSh2YWx1ZSwgbmFtZXNbaW5kZXhdKTtcblxuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZVtuYW1lc1tpbmRleCsrXV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHZhbHVlID0gY29udGV4dC52aWV3W25hbWVdO1xuICAgICAgICAgIGxvb2t1cEhpdCA9IGhhc1Byb3BlcnR5KGNvbnRleHQudmlldywgbmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobG9va3VwSGl0KVxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNvbnRleHQgPSBjb250ZXh0LnBhcmVudDtcbiAgICAgIH1cblxuICAgICAgY2FjaGVbbmFtZV0gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpXG4gICAgICB2YWx1ZSA9IHZhbHVlLmNhbGwodGhpcy52aWV3KTtcblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcblxuICAvKipcbiAgICogQSBXcml0ZXIga25vd3MgaG93IHRvIHRha2UgYSBzdHJlYW0gb2YgdG9rZW5zIGFuZCByZW5kZXIgdGhlbSB0byBhXG4gICAqIHN0cmluZywgZ2l2ZW4gYSBjb250ZXh0LiBJdCBhbHNvIG1haW50YWlucyBhIGNhY2hlIG9mIHRlbXBsYXRlcyB0b1xuICAgKiBhdm9pZCB0aGUgbmVlZCB0byBwYXJzZSB0aGUgc2FtZSB0ZW1wbGF0ZSB0d2ljZS5cbiAgICovXG4gIGZ1bmN0aW9uIFdyaXRlcigpIHtcbiAgICB0aGlzLmNhY2hlID0ge307XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIGFsbCBjYWNoZWQgdGVtcGxhdGVzIGluIHRoaXMgd3JpdGVyLlxuICAgKi9cbiAgV3JpdGVyLnByb3RvdHlwZS5jbGVhckNhY2hlID0gZnVuY3Rpb24gY2xlYXJDYWNoZSgpIHtcbiAgICB0aGlzLmNhY2hlID0ge307XG4gIH07XG5cbiAgLyoqXG4gICAqIFBhcnNlcyBhbmQgY2FjaGVzIHRoZSBnaXZlbiBgdGVtcGxhdGVgIGFuZCByZXR1cm5zIHRoZSBhcnJheSBvZiB0b2tlbnNcbiAgICogdGhhdCBpcyBnZW5lcmF0ZWQgZnJvbSB0aGUgcGFyc2UuXG4gICAqL1xuICBXcml0ZXIucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24gcGFyc2UodGVtcGxhdGUsIHRhZ3MpIHtcbiAgICB2YXIgY2FjaGUgPSB0aGlzLmNhY2hlO1xuICAgIHZhciB0b2tlbnMgPSBjYWNoZVt0ZW1wbGF0ZV07XG5cbiAgICBpZiAodG9rZW5zID09IG51bGwpXG4gICAgICB0b2tlbnMgPSBjYWNoZVt0ZW1wbGF0ZV0gPSBwYXJzZVRlbXBsYXRlKHRlbXBsYXRlLCB0YWdzKTtcblxuICAgIHJldHVybiB0b2tlbnM7XG4gIH07XG5cbiAgLyoqXG4gICAqIEhpZ2gtbGV2ZWwgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byByZW5kZXIgdGhlIGdpdmVuIGB0ZW1wbGF0ZWAgd2l0aFxuICAgKiB0aGUgZ2l2ZW4gYHZpZXdgLlxuICAgKlxuICAgKiBUaGUgb3B0aW9uYWwgYHBhcnRpYWxzYCBhcmd1bWVudCBtYXkgYmUgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgdGhlXG4gICAqIG5hbWVzIGFuZCB0ZW1wbGF0ZXMgb2YgcGFydGlhbHMgdGhhdCBhcmUgdXNlZCBpbiB0aGUgdGVtcGxhdGUuIEl0IG1heVxuICAgKiBhbHNvIGJlIGEgZnVuY3Rpb24gdGhhdCBpcyB1c2VkIHRvIGxvYWQgcGFydGlhbCB0ZW1wbGF0ZXMgb24gdGhlIGZseVxuICAgKiB0aGF0IHRha2VzIGEgc2luZ2xlIGFyZ3VtZW50OiB0aGUgbmFtZSBvZiB0aGUgcGFydGlhbC5cbiAgICovXG4gIFdyaXRlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscykge1xuICAgIHZhciB0b2tlbnMgPSB0aGlzLnBhcnNlKHRlbXBsYXRlKTtcbiAgICB2YXIgY29udGV4dCA9ICh2aWV3IGluc3RhbmNlb2YgQ29udGV4dCkgPyB2aWV3IDogbmV3IENvbnRleHQodmlldyk7XG4gICAgcmV0dXJuIHRoaXMucmVuZGVyVG9rZW5zKHRva2VucywgY29udGV4dCwgcGFydGlhbHMsIHRlbXBsYXRlKTtcbiAgfTtcblxuICAvKipcbiAgICogTG93LWxldmVsIG1ldGhvZCB0aGF0IHJlbmRlcnMgdGhlIGdpdmVuIGFycmF5IG9mIGB0b2tlbnNgIHVzaW5nXG4gICAqIHRoZSBnaXZlbiBgY29udGV4dGAgYW5kIGBwYXJ0aWFsc2AuXG4gICAqXG4gICAqIE5vdGU6IFRoZSBgb3JpZ2luYWxUZW1wbGF0ZWAgaXMgb25seSBldmVyIHVzZWQgdG8gZXh0cmFjdCB0aGUgcG9ydGlvblxuICAgKiBvZiB0aGUgb3JpZ2luYWwgdGVtcGxhdGUgdGhhdCB3YXMgY29udGFpbmVkIGluIGEgaGlnaGVyLW9yZGVyIHNlY3Rpb24uXG4gICAqIElmIHRoZSB0ZW1wbGF0ZSBkb2Vzbid0IHVzZSBoaWdoZXItb3JkZXIgc2VjdGlvbnMsIHRoaXMgYXJndW1lbnQgbWF5XG4gICAqIGJlIG9taXR0ZWQuXG4gICAqL1xuICBXcml0ZXIucHJvdG90eXBlLnJlbmRlclRva2VucyA9IGZ1bmN0aW9uIHJlbmRlclRva2Vucyh0b2tlbnMsIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKSB7XG4gICAgdmFyIGJ1ZmZlciA9ICcnO1xuICAgIHZhciB0b2tlbiwgc3ltYm9sLCB2YWx1ZTtcbiAgICBmb3IgKHZhciBpID0gMCwgbnVtVG9rZW5zID0gdG9rZW5zLmxlbmd0aDsgaSA8IG51bVRva2VuczsgKytpKSB7XG4gICAgICB2YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgIHRva2VuID0gdG9rZW5zW2ldO1xuICAgICAgc3ltYm9sID0gdG9rZW5bMF07XG5cbiAgICAgIGlmIChzeW1ib2wgPT09ICcjJykgdmFsdWUgPSB0aGlzLnJlbmRlclNlY3Rpb24odG9rZW4sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgICAgIGVsc2UgaWYgKHN5bWJvbCA9PT0gJ14nKSB2YWx1ZSA9IHRoaXMucmVuZGVySW52ZXJ0ZWQodG9rZW4sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgICAgIGVsc2UgaWYgKHN5bWJvbCA9PT0gJz4nKSB2YWx1ZSA9IHRoaXMucmVuZGVyUGFydGlhbCh0b2tlbiwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xuICAgICAgZWxzZSBpZiAoc3ltYm9sID09PSAnJicpIHZhbHVlID0gdGhpcy51bmVzY2FwZWRWYWx1ZSh0b2tlbiwgY29udGV4dCk7XG4gICAgICBlbHNlIGlmIChzeW1ib2wgPT09ICduYW1lJykgdmFsdWUgPSB0aGlzLmVzY2FwZWRWYWx1ZSh0b2tlbiwgY29udGV4dCk7XG4gICAgICBlbHNlIGlmIChzeW1ib2wgPT09ICd0ZXh0JykgdmFsdWUgPSB0aGlzLnJhd1ZhbHVlKHRva2VuKTtcblxuICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpXG4gICAgICAgIGJ1ZmZlciArPSB2YWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmZmVyO1xuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUucmVuZGVyU2VjdGlvbiA9IGZ1bmN0aW9uIHJlbmRlclNlY3Rpb24odG9rZW4sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBidWZmZXIgPSAnJztcblxuICAgIHZhciB2YWx1ZSA9IGNvbnRleHQubG9va3VwKHRva2VuWzFdKTtcblxuICAgIC8vIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byByZW5kZXIgYW4gYXJiaXRyYXJ5IHRlbXBsYXRlXG4gICAgLy8gaW4gdGhlIGN1cnJlbnQgY29udGV4dCBieSBoaWdoZXItb3JkZXIgc2VjdGlvbnMuXG4gICAgZnVuY3Rpb24gc3ViUmVuZGVyKHRlbXBsYXRlKSB7XG4gICAgICByZXR1cm4gc2VsZi5yZW5kZXIodGVtcGxhdGUsIGNvbnRleHQsIHBhcnRpYWxzKTtcbiAgICB9XG5cbiAgICBpZiAoIXZhbHVlKSByZXR1cm47XG5cbiAgICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIGZvciAodmFyIGogPSAwLCB2YWx1ZUxlbmd0aCA9IHZhbHVlLmxlbmd0aDsgaiA8IHZhbHVlTGVuZ3RoOyArK2opIHtcbiAgICAgICAgaWYgKHZhbHVlW2pdKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZVtqXSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHZhbHVlW2pdWydAaSddID0gajtcbiAgICAgICAgICAgIHZhbHVlW2pdWydAZmlyc3QnXSA9IChqID09PSAwKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBidWZmZXIgKz0gdGhpcy5yZW5kZXJUb2tlbnModG9rZW5bNF0sIGNvbnRleHQucHVzaCh2YWx1ZVtqXSksIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgYnVmZmVyICs9IHRoaXMucmVuZGVyVG9rZW5zKHRva2VuWzRdLCBjb250ZXh0LnB1c2godmFsdWUpLCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgICBpZiAodHlwZW9mIG9yaWdpbmFsVGVtcGxhdGUgIT09ICdzdHJpbmcnKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCB1c2UgaGlnaGVyLW9yZGVyIHNlY3Rpb25zIHdpdGhvdXQgdGhlIG9yaWdpbmFsIHRlbXBsYXRlJyk7XG5cbiAgICAgIC8vIEV4dHJhY3QgdGhlIHBvcnRpb24gb2YgdGhlIG9yaWdpbmFsIHRlbXBsYXRlIHRoYXQgdGhlIHNlY3Rpb24gY29udGFpbnMuXG4gICAgICB2YWx1ZSA9IHZhbHVlLmNhbGwoY29udGV4dC52aWV3LCBvcmlnaW5hbFRlbXBsYXRlLnNsaWNlKHRva2VuWzNdLCB0b2tlbls1XSksIHN1YlJlbmRlcik7XG5cbiAgICAgIGlmICh2YWx1ZSAhPSBudWxsKVxuICAgICAgICBidWZmZXIgKz0gdmFsdWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgYnVmZmVyICs9IHRoaXMucmVuZGVyVG9rZW5zKHRva2VuWzRdLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XG4gICAgfVxuICAgIHJldHVybiBidWZmZXI7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5yZW5kZXJJbnZlcnRlZCA9IGZ1bmN0aW9uIHJlbmRlckludmVydGVkKHRva2VuLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSkge1xuICAgIHZhciB2YWx1ZSA9IGNvbnRleHQubG9va3VwKHRva2VuWzFdKTtcblxuICAgIC8vIFVzZSBKYXZhU2NyaXB0J3MgZGVmaW5pdGlvbiBvZiBmYWxzeS4gSW5jbHVkZSBlbXB0eSBhcnJheXMuXG4gICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qYW5sL211c3RhY2hlLmpzL2lzc3Vlcy8xODZcbiAgICBpZiAoIXZhbHVlIHx8IChpc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPT09IDApKVxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyVG9rZW5zKHRva2VuWzRdLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5yZW5kZXJQYXJ0aWFsID0gZnVuY3Rpb24gcmVuZGVyUGFydGlhbCh0b2tlbiwgY29udGV4dCwgcGFydGlhbHMpIHtcbiAgICBpZiAoIXBhcnRpYWxzKSByZXR1cm47XG5cbiAgICB2YXIgdmFsdWUgPSBpc0Z1bmN0aW9uKHBhcnRpYWxzKSA/IHBhcnRpYWxzKHRva2VuWzFdKSA6IHBhcnRpYWxzW3Rva2VuWzFdXTtcbiAgICBpZiAodmFsdWUgIT0gbnVsbClcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlclRva2Vucyh0aGlzLnBhcnNlKHZhbHVlKSwgY29udGV4dCwgcGFydGlhbHMsIHZhbHVlKTtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLnVuZXNjYXBlZFZhbHVlID0gZnVuY3Rpb24gdW5lc2NhcGVkVmFsdWUodG9rZW4sIGNvbnRleHQpIHtcbiAgICB2YXIgdmFsdWUgPSBjb250ZXh0Lmxvb2t1cCh0b2tlblsxXSk7XG4gICAgaWYgKHZhbHVlICE9IG51bGwpXG4gICAgICByZXR1cm4gdmFsdWU7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5lc2NhcGVkVmFsdWUgPSBmdW5jdGlvbiBlc2NhcGVkVmFsdWUodG9rZW4sIGNvbnRleHQpIHtcbiAgICB2YXIgdmFsdWUgPSBjb250ZXh0Lmxvb2t1cCh0b2tlblsxXSk7XG4gICAgaWYgKHZhbHVlICE9IG51bGwpXG4gICAgICByZXR1cm4gbXVzdGFjaGUuZXNjYXBlKHZhbHVlKTtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLnJhd1ZhbHVlID0gZnVuY3Rpb24gcmF3VmFsdWUodG9rZW4pIHtcbiAgICByZXR1cm4gdG9rZW5bMV07XG4gIH07XG5cbiAgbXVzdGFjaGUubmFtZSA9ICdtdXN0YWNoZS5qcyc7XG4gIG11c3RhY2hlLnZlcnNpb24gPSAnMi4xLjMnO1xuICBtdXN0YWNoZS50YWdzID0gWyd7eycsICd9fSddO1xuXG4gIC8vIEFsbCBoaWdoLWxldmVsIG11c3RhY2hlLiogZnVuY3Rpb25zIHVzZSB0aGlzIHdyaXRlci5cbiAgdmFyIGRlZmF1bHRXcml0ZXIgPSBuZXcgV3JpdGVyKCk7XG5cbiAgLyoqXG4gICAqIENsZWFycyBhbGwgY2FjaGVkIHRlbXBsYXRlcyBpbiB0aGUgZGVmYXVsdCB3cml0ZXIuXG4gICAqL1xuICBtdXN0YWNoZS5jbGVhckNhY2hlID0gZnVuY3Rpb24gY2xlYXJDYWNoZSgpIHtcbiAgICByZXR1cm4gZGVmYXVsdFdyaXRlci5jbGVhckNhY2hlKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFBhcnNlcyBhbmQgY2FjaGVzIHRoZSBnaXZlbiB0ZW1wbGF0ZSBpbiB0aGUgZGVmYXVsdCB3cml0ZXIgYW5kIHJldHVybnMgdGhlXG4gICAqIGFycmF5IG9mIHRva2VucyBpdCBjb250YWlucy4gRG9pbmcgdGhpcyBhaGVhZCBvZiB0aW1lIGF2b2lkcyB0aGUgbmVlZCB0b1xuICAgKiBwYXJzZSB0ZW1wbGF0ZXMgb24gdGhlIGZseSBhcyB0aGV5IGFyZSByZW5kZXJlZC5cbiAgICovXG4gIG11c3RhY2hlLnBhcnNlID0gZnVuY3Rpb24gcGFyc2UodGVtcGxhdGUsIHRhZ3MpIHtcbiAgICByZXR1cm4gZGVmYXVsdFdyaXRlci5wYXJzZSh0ZW1wbGF0ZSwgdGFncyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbmRlcnMgdGhlIGB0ZW1wbGF0ZWAgd2l0aCB0aGUgZ2l2ZW4gYHZpZXdgIGFuZCBgcGFydGlhbHNgIHVzaW5nIHRoZVxuICAgKiBkZWZhdWx0IHdyaXRlci5cbiAgICovXG4gIG11c3RhY2hlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcih0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMpIHtcbiAgICBpZiAodHlwZW9mIHRlbXBsYXRlICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCB0ZW1wbGF0ZSEgVGVtcGxhdGUgc2hvdWxkIGJlIGEgXCJzdHJpbmdcIiAnICsgJ2J1dCBcIicgKyB0eXBlU3RyKHRlbXBsYXRlKSArICdcIiB3YXMgZ2l2ZW4gYXMgdGhlIGZpcnN0ICcgKyAnYXJndW1lbnQgZm9yIG11c3RhY2hlI3JlbmRlcih0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMpJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlZmF1bHRXcml0ZXIucmVuZGVyKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscyk7XG4gIH07XG5cbiAgLy8gVGhpcyBpcyBoZXJlIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSB3aXRoIDAuNC54LixcbiAgLyplc2xpbnQtZGlzYWJsZSAqLyAvLyBlc2xpbnQgd2FudHMgY2FtZWwgY2FzZWQgZnVuY3Rpb24gbmFtZVxuICBtdXN0YWNoZS50b19odG1sID0gZnVuY3Rpb24gdG9faHRtbCh0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMsIHNlbmQpIHtcbiAgICAvKmVzbGludC1lbmFibGUqL1xuXG4gICAgdmFyIHJlc3VsdCA9IG11c3RhY2hlLnJlbmRlcih0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMpO1xuXG4gICAgaWYgKGlzRnVuY3Rpb24oc2VuZCkpIHtcbiAgICAgIHNlbmQocmVzdWx0KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfTtcblxuICAvLyBFeHBvcnQgdGhlIGVzY2FwaW5nIGZ1bmN0aW9uIHNvIHRoYXQgdGhlIHVzZXIgbWF5IG92ZXJyaWRlIGl0LlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2phbmwvbXVzdGFjaGUuanMvaXNzdWVzLzI0NFxuICBtdXN0YWNoZS5lc2NhcGUgPSBlc2NhcGVIdG1sO1xuXG4gIC8vIEV4cG9ydCB0aGVzZSBtYWlubHkgZm9yIHRlc3RpbmcsIGJ1dCBhbHNvIGZvciBhZHZhbmNlZCB1c2FnZS5cbiAgbXVzdGFjaGUuU2Nhbm5lciA9IFNjYW5uZXI7XG4gIG11c3RhY2hlLkNvbnRleHQgPSBDb250ZXh0O1xuICBtdXN0YWNoZS5Xcml0ZXIgPSBXcml0ZXI7XG5cbn0pKTtcblxuZXhwb3J0IGRlZmF1bHQgQVg2Lm11c3RhY2hlO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9zcmMvQVg2TXVzdGFjaGUuanMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGUuc2Nzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7fVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zdHlsZS5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zdHlsZS5zY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9zcmMvQVg2VUlDYWxlbmRhci9zdHlsZS5zY3NzXG4vLyBtb2R1bGUgaWQgPSA0NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMyAxMSIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh1bmRlZmluZWQpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiQC13ZWJraXQta2V5ZnJhbWVzIGF4Ni11aS1jYWxlbmRhci1mYWRlb3V0IHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAxLjA7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMC41OyB9IH1cXG5cXG5ALW1vei1rZXlmcmFtZXMgYXg2LXVpLWNhbGVuZGFyLWZhZGVvdXQge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDEuMDsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAwLjU7IH0gfVxcblxcbkBrZXlmcmFtZXMgYXg2LXVpLWNhbGVuZGFyLWZhZGVvdXQge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDEuMDsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAwLjU7IH0gfVxcblxcbkAtd2Via2l0LWtleWZyYW1lcyBheDYtdWktY2FsZW5kYXItZmFkZWluIHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwLjU7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMS4wOyB9IH1cXG5cXG5ALW1vei1rZXlmcmFtZXMgYXg2LXVpLWNhbGVuZGFyLWZhZGVpbiB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMC41OyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDEuMDsgfSB9XFxuXFxuQGtleWZyYW1lcyBheDYtdWktY2FsZW5kYXItZmFkZWluIHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwLjU7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMS4wOyB9IH1cXG5cXG5bZGF0YS1heDZ1aS1jYWxlbmRhcl0ge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcbiAgW2RhdGEtYXg2dWktY2FsZW5kYXJdICoge1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94OyB9XFxuICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWNvbnRyb2wge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1O1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudChib3R0b20sICNmNWY1ZjUpO1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gdG9wLCNmNWY1ZjUpO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICAgIGZvbnQtc2l6ZTogMThweDtcXG4gICAgbWFyZ2luLWJvdHRvbTogNXB4O1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgICBjb2xvcjogIzMzMzsgfVxcbiAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWNvbnRyb2wgLmRhdGUtbW92ZS1sZWZ0LCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWNvbnRyb2wgLmRhdGUtbW92ZS1yaWdodCB7XFxuICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICAgIGZvbnQtc2l6ZTogMjJweDtcXG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgICAgIHBhZGRpbmc6IDA7IH1cXG4gICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWNvbnRyb2wgLmRhdGUtbW92ZS1sZWZ0IGksIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItY29udHJvbCAuZGF0ZS1tb3ZlLWxlZnQgc3BhbiwgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1jb250cm9sIC5kYXRlLW1vdmUtcmlnaHQgaSwgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1jb250cm9sIC5kYXRlLW1vdmUtcmlnaHQgc3BhbiB7XFxuICAgICAgICBsaW5lLWhlaWdodDogaW5oZXJpdDsgfVxcbiAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWNvbnRyb2wgLmRhdGUtbW92ZS1sZWZ0IHtcXG4gICAgICBsZWZ0OiAwcHg7XFxuICAgICAgdG9wOiAwcHg7IH1cXG4gICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1jb250cm9sIC5kYXRlLW1vdmUtcmlnaHQge1xcbiAgICAgIHJpZ2h0OiAwcHg7XFxuICAgICAgdG9wOiAwcHg7IH1cXG4gICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1jb250cm9sIC5kYXRlLWRpc3BsYXkge1xcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjsgfVxcbiAgICAgIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItY29udHJvbCAuZGF0ZS1kaXNwbGF5IFtkYXRhLWNhbGVuZGFyLWRpc3BsYXldIHtcXG4gICAgICAgIG1hcmdpbjogMHB4IDEwcHg7XFxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgICAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsgfVxcbiAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWNvbnRyb2wgYSB7XFxuICAgICAgY29sb3I6ICMzMzM7IH1cXG4gICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1jb250cm9sIGE6aG92ZXIge1xcbiAgICAgIGNvbG9yOiAjMzM3YWI3OyB9XFxuICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkuZmFkZWluIHtcXG4gICAgLXdlYmtpdC1hbmltYXRpb246IGF4Ni11aS1jYWxlbmRhci1mYWRlaW4gMC4zcyBjdWJpYy1iZXppZXIoMC4zOSwgMC41NzUsIDAuNTY1LCAxKTtcXG4gICAgLW1vei1hbmltYXRpb246IGF4Ni11aS1jYWxlbmRhci1mYWRlaW4gMC4zcyBjdWJpYy1iZXppZXIoMC4zOSwgMC41NzUsIDAuNTY1LCAxKTtcXG4gICAgYW5pbWF0aW9uOiBheDYtdWktY2FsZW5kYXItZmFkZWluIDAuM3MgY3ViaWMtYmV6aWVyKDAuMzksIDAuNTc1LCAwLjU2NSwgMSk7XFxuICAgIG9wYWNpdHk6IDEuMDsgfVxcbiAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5LmZhZGVvdXQge1xcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogYXg2LXVpLWNhbGVuZGFyLWZhZGVvdXQgMC4zcyBjdWJpYy1iZXppZXIoMC4zOSwgMC41NzUsIDAuNTY1LCAxKTtcXG4gICAgLW1vei1hbmltYXRpb246IGF4Ni11aS1jYWxlbmRhci1mYWRlb3V0IDAuM3MgY3ViaWMtYmV6aWVyKDAuMzksIDAuNTc1LCAwLjU2NSwgMSk7XFxuICAgIGFuaW1hdGlvbjogYXg2LXVpLWNhbGVuZGFyLWZhZGVvdXQgMC4zcyBjdWJpYy1iZXppZXIoMC4zOSwgMC41NzUsIDAuNTY1LCAxKTtcXG4gICAgb3BhY2l0eTogMC4wOyB9XFxuICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUge1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICB0YWJsZS1sYXlvdXQ6IGZpeGVkO1xcbiAgICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcbiAgICBib3JkZXItc3BhY2luZzogMDtcXG4gICAgYm9yZGVyOiAwIG5vbmU7IH1cXG4gICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRoZWFkIHtcXG4gICAgICBib3JkZXI6IDAgbm9uZTsgfVxcbiAgICAgIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0aGVhZCB0ZCwgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRoZWFkIHRoIHtcXG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgICAgICAgbGluZS1oZWlnaHQ6IDFlbTtcXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgICAgIGZvbnQtc2l6ZTogMTJweDtcXG4gICAgICAgIHBhZGRpbmc6IDBweCAycHg7XFxuICAgICAgICBib3JkZXI6IDBweCBub25lO1xcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNGRkZGRkY7XFxuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudChib3R0b20sICNGRkZGRkYsICNGRkZGRkYpO1xcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIHRvcCwjRkZGRkZGLCAjRkZGRkZGKTtcXG4gICAgICAgIGNvbG9yOiAjNkQ2RTcwOyB9XFxuICAgICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGhlYWQgdGQuY2FsZW5kYXItY29sLTAsIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0aGVhZCB0aC5jYWxlbmRhci1jb2wtMCB7XFxuICAgICAgICAgIGNvbG9yOiAjQzc4QjgxOyB9XFxuICAgICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGhlYWQgdGQuY2FsZW5kYXItY29sLTYsIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0aGVhZCB0aC5jYWxlbmRhci1jb2wtNiB7XFxuICAgICAgICAgIGNvbG9yOiAjMzJCNERDOyB9XFxuICAgIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB7XFxuICAgICAgYm9yZGVyOiAwIG5vbmU7IH1cXG4gICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGQsIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0aCB7XFxuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAxZW07XFxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgICAgICBmb250LXNpemU6IDE0cHg7XFxuICAgICAgICBib3JkZXI6IDBweCBub25lO1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRkZGRjtcXG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KGJvdHRvbSwgI0ZGRkZGRiwgI0ZGRkZGRik7XFxuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gdG9wLCNGRkZGRkYsICNGRkZGRkYpO1xcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgICAgIC8qXFxuICAgICAgICAgICYuY2FsZW5kYXItY29sLTAge1xcbiAgICAgICAgICAgICAgLmNhbGVuZGFyLWl0ZW0tZGF5LmxpdmUge1xcbiAgICAgICAgICAgICAgICAgIGNvbG9yOiAkYXg2dWktY2FsZW5kYXItc3VuLXRleHQtY29sb3I7XFxuICAgICAgICAgICAgICAgICAgQGluY2x1ZGUgZXh0ZW5kLWl0ZW0tdGhlbWUoKTtcXG4gICAgICAgICAgICAgIH1cXG4gICAgICAgICAgfVxcbiAgICAgICAgICAmLmNhbGVuZGFyLWNvbC02IHtcXG4gICAgICAgICAgICAgIC5jYWxlbmRhci1pdGVtLWRheS5saXZlIHtcXG4gICAgICAgICAgICAgICAgICBjb2xvcjogJGF4NnVpLWNhbGVuZGFyLXNhdC10ZXh0LWNvbG9yO1xcbiAgICAgICAgICAgICAgICAgIEBpbmNsdWRlIGV4dGVuZC1pdGVtLXRoZW1lKCk7XFxuICAgICAgICAgICAgICB9XFxuICAgICAgICAgIH1cXG4gICAgICAgICAgKi8gfVxcbiAgICAgICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRkIC5jYWxlbmRhci1pdGVtLWRheSwgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRoIC5jYWxlbmRhci1pdGVtLWRheSB7XFxuICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICAgICAgICBoZWlnaHQ6IDEwMCU7XFxuICAgICAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgICAgICAgbGluZS1oZWlnaHQ6IGluaGVyaXQ7XFxuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNGRkZGRkY7XFxuICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KGJvdHRvbSwgI0ZGRkZGRiwgI0ZGRkZGRik7XFxuICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byB0b3AsI0ZGRkZGRiwgI0ZGRkZGRik7XFxuICAgICAgICAgIGNvbG9yOiAjQzNDNEM2O1xcbiAgICAgICAgICBmb250LXNpemU6IDE0cHg7IH1cXG4gICAgICAgICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRkIC5jYWxlbmRhci1pdGVtLWRheSBzcGFuLmFkZG9uLCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGggLmNhbGVuZGFyLWl0ZW0tZGF5IHNwYW4uYWRkb24ge1xcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcXG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDExLjJweDtcXG4gICAgICAgICAgICBmb250LXNpemU6IDExLjJweDsgfVxcbiAgICAgICAgICAgIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0ZCAuY2FsZW5kYXItaXRlbS1kYXkgc3Bhbi5hZGRvbi5hZGRvbi1oZWFkZXIsIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0aCAuY2FsZW5kYXItaXRlbS1kYXkgc3Bhbi5hZGRvbi5hZGRvbi1oZWFkZXIge1xcbiAgICAgICAgICAgICAgbGVmdDogMHB4O1xcbiAgICAgICAgICAgICAgdG9wOiAxcHg7IH1cXG4gICAgICAgICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGQgLmNhbGVuZGFyLWl0ZW0tZGF5IHNwYW4uYWRkb24uYWRkb24tZm9vdGVyLCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGggLmNhbGVuZGFyLWl0ZW0tZGF5IHNwYW4uYWRkb24uYWRkb24tZm9vdGVyIHtcXG4gICAgICAgICAgICAgIGxlZnQ6IDBweDtcXG4gICAgICAgICAgICAgIGJvdHRvbTogMXB4OyB9XFxuICAgICAgICAgIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0ZCAuY2FsZW5kYXItaXRlbS1kYXkubGl2ZSwgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRoIC5jYWxlbmRhci1pdGVtLWRheS5saXZlIHtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjBGMEYwO1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KGJvdHRvbSwgI0YwRjBGMCwgI0YwRjBGMCk7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIHRvcCwjRjBGMEYwLCAjRjBGMEYwKTtcXG4gICAgICAgICAgICBjb2xvcjogIzZENkU3MDsgfVxcbiAgICAgICAgICAgIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0ZCAuY2FsZW5kYXItaXRlbS1kYXkubGl2ZSBzcGFuLmFkZG9uLCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGggLmNhbGVuZGFyLWl0ZW0tZGF5LmxpdmUgc3Bhbi5hZGRvbiB7XFxuICAgICAgICAgICAgICBjb2xvcjogI0ExQTFBMTsgfVxcbiAgICAgICAgICAgIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0ZCAuY2FsZW5kYXItaXRlbS1kYXkubGl2ZS5zdW5kYXksIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0aCAuY2FsZW5kYXItaXRlbS1kYXkubGl2ZS5zdW5kYXkge1xcbiAgICAgICAgICAgICAgY29sb3I6ICNDNzhCODE7IH1cXG4gICAgICAgICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGQgLmNhbGVuZGFyLWl0ZW0tZGF5LmxpdmUuc2F0dXJkYXksIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0aCAuY2FsZW5kYXItaXRlbS1kYXkubGl2ZS5zYXR1cmRheSB7XFxuICAgICAgICAgICAgICBjb2xvcjogIzMyQjREQzsgfVxcbiAgICAgICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGQgLmNhbGVuZGFyLWl0ZW0tZGF5LmZvY3VzLCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGggLmNhbGVuZGFyLWl0ZW0tZGF5LmZvY3VzIHtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRTY3MjQxO1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KGJvdHRvbSwgI0U2NzI0MSwgI0U2NzI0MSk7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIHRvcCwjRTY3MjQxLCAjRTY3MjQxKTtcXG4gICAgICAgICAgICBjb2xvcjogI2ZmZjsgfVxcbiAgICAgICAgICAgIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0ZCAuY2FsZW5kYXItaXRlbS1kYXkuZm9jdXMgc3Bhbi5hZGRvbiwgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRoIC5jYWxlbmRhci1pdGVtLWRheS5mb2N1cyBzcGFuLmFkZG9uIHtcXG4gICAgICAgICAgICAgIGNvbG9yOiAjZmZmOyB9XFxuICAgICAgICAgICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRkIC5jYWxlbmRhci1pdGVtLWRheS5mb2N1cy5ob3ZlciwgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRoIC5jYWxlbmRhci1pdGVtLWRheS5mb2N1cy5ob3ZlciB7XFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzJCNERDO1xcbiAgICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoYm90dG9tLCAjMzJCNERDLCAjMzJCNERDKTtcXG4gICAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byB0b3AsIzMyQjREQywgIzMyQjREQyk7XFxuICAgICAgICAgICAgICBjb2xvcjogI2ZmZiAhaW1wb3J0YW50OyB9XFxuICAgICAgICAgICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGQgLmNhbGVuZGFyLWl0ZW0tZGF5LmZvY3VzLmhvdmVyIHNwYW4uYWRkb24sIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0aCAuY2FsZW5kYXItaXRlbS1kYXkuZm9jdXMuaG92ZXIgc3Bhbi5hZGRvbiB7XFxuICAgICAgICAgICAgICAgIGNvbG9yOiAjZmZmOyB9XFxuICAgICAgICAgIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0ZCAuY2FsZW5kYXItaXRlbS1kYXkucGVyaW9kLCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGggLmNhbGVuZGFyLWl0ZW0tZGF5LnBlcmlvZCB7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzgyZDNmYTtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudChib3R0b20sICM4MmQzZmEsICM4MmQzZmEpO1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byB0b3AsIzgyZDNmYSwgIzgyZDNmYSk7XFxuICAgICAgICAgICAgY29sb3I6ICNmZmYgIWltcG9ydGFudDsgfVxcbiAgICAgICAgICAgIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0ZCAuY2FsZW5kYXItaXRlbS1kYXkucGVyaW9kIHNwYW4uYWRkb24sIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0aCAuY2FsZW5kYXItaXRlbS1kYXkucGVyaW9kIHNwYW4uYWRkb24ge1xcbiAgICAgICAgICAgICAgY29sb3I6ICNmZmY7IH1cXG4gICAgICAgICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRkIC5jYWxlbmRhci1pdGVtLWRheS5zZWxlY3RlZC1kYXksIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0aCAuY2FsZW5kYXItaXRlbS1kYXkuc2VsZWN0ZWQtZGF5IHtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzJCNERDO1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KGJvdHRvbSwgIzMyQjREQywgIzMyQjREQyk7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIHRvcCwjMzJCNERDLCAjMzJCNERDKTtcXG4gICAgICAgICAgICBjb2xvcjogI2ZmZiAhaW1wb3J0YW50OyB9XFxuICAgICAgICAgICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRkIC5jYWxlbmRhci1pdGVtLWRheS5zZWxlY3RlZC1kYXkgc3Bhbi5hZGRvbiwgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRoIC5jYWxlbmRhci1pdGVtLWRheS5zZWxlY3RlZC1kYXkgc3Bhbi5hZGRvbiB7XFxuICAgICAgICAgICAgICBjb2xvcjogI2ZmZjsgfVxcbiAgICAgICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGQgLmNhbGVuZGFyLWl0ZW0tZGF5LmRpc2FibGUsIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0aCAuY2FsZW5kYXItaXRlbS1kYXkuZGlzYWJsZSB7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRkZGRjtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudChib3R0b20sICNGRkZGRkYsICNGRkZGRkYpO1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byB0b3AsI0ZGRkZGRiwgI0ZGRkZGRik7XFxuICAgICAgICAgICAgY29sb3I6ICNkZGRlZGY7IH1cXG4gICAgICAgICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRkIC5jYWxlbmRhci1pdGVtLWRheS5ob2xpZGF5LCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGggLmNhbGVuZGFyLWl0ZW0tZGF5LmhvbGlkYXkge1xcbiAgICAgICAgICAgIGNvbG9yOiAjQzc4QjgxOyB9XFxuICAgICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGQgLmNhbGVuZGFyLWl0ZW0tbW9udGgsIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0aCAuY2FsZW5kYXItaXRlbS1tb250aCB7XFxuICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgICAgICB3aWR0aDogMTAwJTtcXG4gICAgICAgICAgaGVpZ2h0OiAxMDAlO1xcbiAgICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgICAgICAgIGxpbmUtaGVpZ2h0OiBpbmhlcml0O1xcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGRkZGO1xcbiAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudChib3R0b20sICNGRkZGRkYsICNGRkZGRkYpO1xcbiAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gdG9wLCNGRkZGRkYsICNGRkZGRkYpO1xcbiAgICAgICAgICBjb2xvcjogI0MzQzRDNjtcXG4gICAgICAgICAgZm9udC1zaXplOiAxNHB4OyB9XFxuICAgICAgICAgIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0ZCAuY2FsZW5kYXItaXRlbS1tb250aC5saXZlLCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGggLmNhbGVuZGFyLWl0ZW0tbW9udGgubGl2ZSB7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI0YwRjBGMDtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudChib3R0b20sICNGMEYwRjAsICNGMEYwRjApO1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byB0b3AsI0YwRjBGMCwgI0YwRjBGMCk7XFxuICAgICAgICAgICAgY29sb3I6ICM2RDZFNzA7IH1cXG4gICAgICAgICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRkIC5jYWxlbmRhci1pdGVtLW1vbnRoLmhvdmVyLCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGggLmNhbGVuZGFyLWl0ZW0tbW9udGguaG92ZXIge1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMzMkI0REM7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoYm90dG9tLCAjMzJCNERDLCAjMzJCNERDKTtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gdG9wLCMzMkI0REMsICMzMkI0REMpO1xcbiAgICAgICAgICAgIGNvbG9yOiAjZmZmOyB9XFxuICAgICAgICAgIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0ZCAuY2FsZW5kYXItaXRlbS1tb250aC5mb2N1cywgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRoIC5jYWxlbmRhci1pdGVtLW1vbnRoLmZvY3VzIHtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRTY3MjQxO1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KGJvdHRvbSwgI0U2NzI0MSwgI0U2NzI0MSk7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIHRvcCwjRTY3MjQxLCAjRTY3MjQxKTtcXG4gICAgICAgICAgICBjb2xvcjogI2ZmZjsgfVxcbiAgICAgICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGQgLmNhbGVuZGFyLWl0ZW0tbW9udGguc2VsZWN0ZWQtbW9udGgsIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0aCAuY2FsZW5kYXItaXRlbS1tb250aC5zZWxlY3RlZC1tb250aCB7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzMyQjREQztcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudChib3R0b20sICMzMkI0REMsICMzMkI0REMpO1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byB0b3AsIzMyQjREQywgIzMyQjREQyk7XFxuICAgICAgICAgICAgY29sb3I6ICNmZmYgIWltcG9ydGFudDsgfVxcbiAgICAgICAgICAgIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0ZCAuY2FsZW5kYXItaXRlbS1tb250aC5zZWxlY3RlZC1tb250aCBzcGFuLmFkZG9uLCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGggLmNhbGVuZGFyLWl0ZW0tbW9udGguc2VsZWN0ZWQtbW9udGggc3Bhbi5hZGRvbiB7XFxuICAgICAgICAgICAgICBjb2xvcjogI2ZmZjsgfVxcbiAgICAgICAgICAgIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0ZCAuY2FsZW5kYXItaXRlbS1tb250aC5zZWxlY3RlZC1tb250aCBzcGFuLmx1bmFyLCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGggLmNhbGVuZGFyLWl0ZW0tbW9udGguc2VsZWN0ZWQtbW9udGggc3Bhbi5sdW5hciB7XFxuICAgICAgICAgICAgICBjb2xvcjogI2ZmZjsgfVxcbiAgICAgICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGQgLmNhbGVuZGFyLWl0ZW0tbW9udGguZGlzYWJsZSwgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRoIC5jYWxlbmRhci1pdGVtLW1vbnRoLmRpc2FibGUge1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNGRkZGRkY7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoYm90dG9tLCAjRkZGRkZGLCAjRkZGRkZGKTtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gdG9wLCNGRkZGRkYsICNGRkZGRkYpO1xcbiAgICAgICAgICAgIGNvbG9yOiAjZGRkZWRmOyB9XFxuICAgICAgICAgIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0ZCAuY2FsZW5kYXItaXRlbS1tb250aC5ob2xpZGF5LCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGggLmNhbGVuZGFyLWl0ZW0tbW9udGguaG9saWRheSB7XFxuICAgICAgICAgICAgY29sb3I6ICNDNzhCODE7IH1cXG4gICAgICAgIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0ZCAuY2FsZW5kYXItaXRlbS15ZWFyLCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGggLmNhbGVuZGFyLWl0ZW0teWVhciB7XFxuICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgICAgICB3aWR0aDogMTAwJTtcXG4gICAgICAgICAgaGVpZ2h0OiAxMDAlO1xcbiAgICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgICAgICAgIGxpbmUtaGVpZ2h0OiBpbmhlcml0O1xcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGRkZGO1xcbiAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudChib3R0b20sICNGRkZGRkYsICNGRkZGRkYpO1xcbiAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gdG9wLCNGRkZGRkYsICNGRkZGRkYpO1xcbiAgICAgICAgICBjb2xvcjogI0MzQzRDNjtcXG4gICAgICAgICAgZm9udC1zaXplOiAxNHB4OyB9XFxuICAgICAgICAgIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0ZCAuY2FsZW5kYXItaXRlbS15ZWFyLmxpdmUsIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0aCAuY2FsZW5kYXItaXRlbS15ZWFyLmxpdmUge1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNGMEYwRjA7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoYm90dG9tLCAjRjBGMEYwLCAjRjBGMEYwKTtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gdG9wLCNGMEYwRjAsICNGMEYwRjApO1xcbiAgICAgICAgICAgIGNvbG9yOiAjNkQ2RTcwOyB9XFxuICAgICAgICAgIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0ZCAuY2FsZW5kYXItaXRlbS15ZWFyLmhvdmVyLCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGggLmNhbGVuZGFyLWl0ZW0teWVhci5ob3ZlciB7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzMyQjREQztcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudChib3R0b20sICMzMkI0REMsICMzMkI0REMpO1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCh0byB0b3AsIzMyQjREQywgIzMyQjREQyk7XFxuICAgICAgICAgICAgY29sb3I6ICNmZmY7IH1cXG4gICAgICAgICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRkIC5jYWxlbmRhci1pdGVtLXllYXIuZm9jdXMsIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0aCAuY2FsZW5kYXItaXRlbS15ZWFyLmZvY3VzIHtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRTY3MjQxO1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KGJvdHRvbSwgI0U2NzI0MSwgI0U2NzI0MSk7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIHRvcCwjRTY3MjQxLCAjRTY3MjQxKTtcXG4gICAgICAgICAgICBjb2xvcjogI2ZmZjsgfVxcbiAgICAgICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGQgLmNhbGVuZGFyLWl0ZW0teWVhci5zZWxlY3RlZC15ZWFyLCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGggLmNhbGVuZGFyLWl0ZW0teWVhci5zZWxlY3RlZC15ZWFyIHtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzJCNERDO1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KGJvdHRvbSwgIzMyQjREQywgIzMyQjREQyk7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIHRvcCwjMzJCNERDLCAjMzJCNERDKTtcXG4gICAgICAgICAgICBjb2xvcjogI2ZmZiAhaW1wb3J0YW50OyB9XFxuICAgICAgICAgICAgW2RhdGEtYXg2dWktY2FsZW5kYXJdIC5jYWxlbmRhci1ib2R5IHRhYmxlIHRib2R5IHRkIC5jYWxlbmRhci1pdGVtLXllYXIuc2VsZWN0ZWQteWVhciBzcGFuLmFkZG9uLCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGggLmNhbGVuZGFyLWl0ZW0teWVhci5zZWxlY3RlZC15ZWFyIHNwYW4uYWRkb24ge1xcbiAgICAgICAgICAgICAgY29sb3I6ICNmZmY7IH1cXG4gICAgICAgICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGQgLmNhbGVuZGFyLWl0ZW0teWVhci5zZWxlY3RlZC15ZWFyIHNwYW4ubHVuYXIsIFtkYXRhLWF4NnVpLWNhbGVuZGFyXSAuY2FsZW5kYXItYm9keSB0YWJsZSB0Ym9keSB0aCAuY2FsZW5kYXItaXRlbS15ZWFyLnNlbGVjdGVkLXllYXIgc3Bhbi5sdW5hciB7XFxuICAgICAgICAgICAgICBjb2xvcjogI2ZmZjsgfVxcbiAgICAgICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGQgLmNhbGVuZGFyLWl0ZW0teWVhci5kaXNhYmxlLCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGggLmNhbGVuZGFyLWl0ZW0teWVhci5kaXNhYmxlIHtcXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGRkZGO1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KGJvdHRvbSwgI0ZGRkZGRiwgI0ZGRkZGRik7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIHRvcCwjRkZGRkZGLCAjRkZGRkZGKTtcXG4gICAgICAgICAgICBjb2xvcjogI2RkZGVkZjsgfVxcbiAgICAgICAgICBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGQgLmNhbGVuZGFyLWl0ZW0teWVhci5ob2xpZGF5LCBbZGF0YS1heDZ1aS1jYWxlbmRhcl0gLmNhbGVuZGFyLWJvZHkgdGFibGUgdGJvZHkgdGggLmNhbGVuZGFyLWl0ZW0teWVhci5ob2xpZGF5IHtcXG4gICAgICAgICAgICBjb2xvcjogI0M3OEI4MTsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIhLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi9zcmMvQVg2VUlDYWxlbmRhci9zdHlsZS5zY3NzXG4vLyBtb2R1bGUgaWQgPSA0NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMyAxMSIsImltcG9ydCBqUXVlcnkgZnJvbSBcImpxbWluXCI7XG5pbXBvcnQgQVg2VUlDb3JlIGZyb20gXCIuL0FYNlVJQ29yZVwiO1xuaW1wb3J0IGluZm8gZnJvbSBcIi4vQVg2SW5mb1wiO1xuaW1wb3J0IFUgZnJvbSBcIi4vQVg2VXRpbFwiO1xuaW1wb3J0IG11c3RhY2hlIGZyb20gXCIuL0FYNk11c3RhY2hlXCI7XG4vKiB+fn5+fn5+fn5+fn5+fn5+fn4gZW5kIG9mIGltcG9ydCAgfn5+fn5+fn5+fn5+fn5+fn5+fn4gKi9cblxubGV0IHRtcGwgPSB7XG4gIGZyYW1lKGNvbHVtbktleXMpIHtcbiAgICByZXR1cm4gYFxuPGRpdiBkYXRhLWF4NnVpLWNhbGVuZGFyPVwiXCIgY2xhc3M9XCJheDYtdWktY2FsZW5kYXIge3t0aGVtZX19XCIgZGF0YS1jYWxlbmRhci1lbHM9XCJyb290XCIgb25zZWxlY3RzdGFydD1cInJldHVybiBmYWxzZTtcIj5cbiAgICB7eyNjb250cm9sfX1cbiAgICA8ZGl2IGNsYXNzPVwiY2FsZW5kYXItY29udHJvbFwiIGRhdGEtY2FsZW5kYXItZWxzPVwiY29udHJvbFwiIHN0eWxlPVwie3tjb250cm9sQ1NTfX1cIj5cbiAgICAgICAgPGEgY2xhc3M9XCJkYXRlLW1vdmUtbGVmdFwiIGRhdGEtY2FsZW5kYXItbW92ZT1cImxlZnRcIiBzdHlsZT1cInt7Y29udHJvbEJ1dHRvbkNTU319XCI+e3t7bGVmdH19fTwvYT5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRhdGUtZGlzcGxheVwiIGRhdGEtY2FsZW5kYXItZWxzPVwiY29udHJvbC1kaXNwbGF5XCIgc3R5bGU9XCJ7e2NvbnRyb2xDU1N9fVwiPjwvZGl2PlxuICAgICAgICA8YSBjbGFzcz1cImRhdGUtbW92ZS1yaWdodFwiIGRhdGEtY2FsZW5kYXItbW92ZT1cInJpZ2h0XCIgc3R5bGU9XCJ7e2NvbnRyb2xCdXR0b25DU1N9fVwiPnt7e3JpZ2h0fX19PC9hPlxuICAgIDwvZGl2PlxuICAgIHt7L2NvbnRyb2x9fVxuICAgIDxkaXYgY2xhc3M9XCJjYWxlbmRhci1ib2R5XCIgZGF0YS1jYWxlbmRhci1lbHM9XCJib2R5XCI+PC9kaXY+XG48L2Rpdj5cbmA7XG4gIH0sXG4gIGRheShjb2x1bW5LZXlzKSB7XG4gICAgcmV0dXJuIGBcbjx0YWJsZSBkYXRhLWNhbGVuZGFyLXRhYmxlPVwiZGF5XCIgY2VsbHBhZGRpbmc9XCIwXCIgY2VsbHNwYWNpbmc9XCIwXCIgc3R5bGU9XCJ3aWR0aDoxMDAlO1wiPlxuICAgIDx0aGVhZD5cbiAgICAgICAgPHRyPlxuICAgICAgICB7eyN3ZWVrTmFtZXN9fVxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiY2FsZW5kYXItY29sLXt7Y29sfX1cIiBzdHlsZT1cImhlaWdodDoge3tjb2xIZWFkSGVpZ2h0fX1cIj5cbiAgICAgICAgICAgIHt7bGFiZWx9fVxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAge3svd2Vla05hbWVzfX1cbiAgICAgICAgPC90cj5cbiAgICA8L3RoZWFkPlxuICAgIDx0Ym9keT5cbiAgICAgICAgPHRyPlxuICAgICAgICAgICAge3sjbGlzdH19ICAgIFxuICAgICAgICAgICAge3sjaXNTdGFydE9mV2Vla319XG4gICAgICAgICAgICB7e15AZmlyc3R9fVxuICAgICAgICA8L3RyPlxuICAgICAgICA8dHI+XG4gICAgICAgICAgICB7ey9AZmlyc3R9fVxuICAgICAgICAgICAge3svaXNTdGFydE9mV2Vla319XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJjYWxlbmRhci1jb2wte3tjb2x9fVwiIHN0eWxlPVwie3tpdGVtU3R5bGVzfX1cIj5cbiAgICAgICAgICAgICAgICA8YSBjbGFzcz1cImNhbGVuZGFyLWl0ZW0tZGF5IHt7YWRkQ2xhc3N9fVwiIGRhdGEtY2FsZW5kYXItaXRlbS1kYXRlPVwie3t0aGlzRGF0ZX19XCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYWRkb24gYWRkb24taGVhZGVyXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICB7e3RoaXNEYXRhTGFiZWx9fVxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFkZG9uIGFkZG9uLWZvb3RlclwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAge3svbGlzdH19XG4gICAgICAgIDwvdHI+XG4gICAgPC90Ym9keT5cbjwvdGFibGU+XG5gO1xuICB9LFxuICBtb250aChjb2x1bW5LZXlzKSB7XG4gICAgcmV0dXJuIGBcbjx0YWJsZSBkYXRhLWNhbGVuZGFyLXRhYmxlPVwibW9udGhcIiBjZWxscGFkZGluZz1cIjBcIiBjZWxsc3BhY2luZz1cIjBcIiBzdHlsZT1cIndpZHRoOjEwMCU7XCI+XG4gICAgPHRoZWFkPlxuICAgICAgICA8dHI+XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJjYWxlbmRhci1jb2wtMFwiIGNvbHNwYW49XCIzXCIgc3R5bGU9XCJoZWlnaHQ6IHt7Y29sSGVhZEhlaWdodH19XCI+XG4gICAgICAgICAgICB7e2NvbEhlYWRMYWJlbH19XG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICA8L3RyPlxuICAgIDwvdGhlYWQ+XG4gICAgPHRib2R5PlxuICAgICAgICA8dHI+XG4gICAgICAgICAgICB7eyNsaXN0fX0gICAgXG4gICAgICAgICAgICB7eyNpc1N0YXJ0T2ZSb3d9fVxuICAgICAgICAgICAge3teQGZpcnN0fX1cbiAgICAgICAgPC90cj5cbiAgICAgICAgPHRyPlxuICAgICAgICAgICAge3svQGZpcnN0fX1cbiAgICAgICAgICAgIHt7L2lzU3RhcnRPZlJvd319XG4gICAgICAgICAgICA8dGQgY2xhc3M9XCJjYWxlbmRhci1jb2wte3tjb2x9fVwiIHN0eWxlPVwie3tpdGVtU3R5bGVzfX1cIj5cbiAgICAgICAgICAgICAgICA8YSBjbGFzcz1cImNhbGVuZGFyLWl0ZW0tbW9udGgge3thZGRDbGFzc319XCIgZGF0YS1jYWxlbmRhci1pdGVtLW1vbnRoPVwie3t0aGlzTW9udGh9fVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFkZG9uXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICB7e3RoaXNNb250aExhYmVsfX1cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsdW5hclwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAge3svbGlzdH19XG4gICAgICAgIDwvdHI+XG4gICAgPC90Ym9keT5cbjwvdGFibGU+XG5gO1xuICB9LFxuICB5ZWFyKGNvbHVtbktleXMpIHtcbiAgICByZXR1cm4gYFxuPHRhYmxlIGRhdGEtY2FsZW5kYXItdGFibGU9XCJ5ZWFyXCIgY2VsbHBhZGRpbmc9XCIwXCIgY2VsbHNwYWNpbmc9XCIwXCIgc3R5bGU9XCJ3aWR0aDoxMDAlO1wiPlxuICAgIDx0aGVhZD5cbiAgICAgICAgPHRyPlxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiY2FsZW5kYXItY29sLTBcIiBjb2xzcGFuPVwiNFwiIHN0eWxlPVwiaGVpZ2h0OiB7e2NvbEhlYWRIZWlnaHR9fVwiPlxuICAgICAgICAgICAge3tjb2xIZWFkTGFiZWx9fVxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgPC90cj5cbiAgICA8L3RoZWFkPlxuICAgIDx0Ym9keT5cbiAgICAgICAgPHRyPlxuICAgICAgICAgICAge3sjbGlzdH19ICAgIFxuICAgICAgICAgICAge3sjaXNTdGFydE9mUm93fX1cbiAgICAgICAgICAgIHt7XkBmaXJzdH19XG4gICAgICAgIDwvdHI+XG4gICAgICAgIDx0cj5cbiAgICAgICAgICAgIHt7L0BmaXJzdH19XG4gICAgICAgICAgICB7ey9pc1N0YXJ0T2ZSb3d9fVxuICAgICAgICAgICAgPHRkIGNsYXNzPVwiY2FsZW5kYXItY29sLXt7Y29sfX1cIiBzdHlsZT1cInt7aXRlbVN0eWxlc319XCI+XG4gICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJjYWxlbmRhci1pdGVtLXllYXIge3thZGRDbGFzc319XCIgZGF0YS1jYWxlbmRhci1pdGVtLXllYXI9XCJ7e3RoaXNZZWFyfX1cIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhZGRvblwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAge3t0aGlzWWVhckxhYmVsfX1cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsdW5hclwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAge3svbGlzdH19XG4gICAgICAgIDwvdHI+XG4gICAgPC90Ym9keT5cbjwvdGFibGU+XG5gO1xuICB9XG59O1xuXG5jb25zdCBvblN0YXRlQ2hhbmdlZCA9IGZ1bmN0aW9uIChvcHRzLCB0aGF0KSB7XG4gIGlmIChvcHRzICYmIG9wdHMub25TdGF0ZUNoYW5nZWQpIHtcbiAgICBvcHRzLm9uU3RhdGVDaGFuZ2VkLmNhbGwodGhhdCwgdGhhdCk7XG4gIH1cbiAgZWxzZSBpZiAodGhpcy5vblN0YXRlQ2hhbmdlZCkge1xuICAgIHRoaXMub25TdGF0ZUNoYW5nZWQuY2FsbCh0aGF0LCB0aGF0KTtcbiAgfVxuXG4gIHRoYXQgPSBudWxsO1xufTtcbmNvbnN0IGdldEZyYW1lID0gZnVuY3Rpb24gKCkge1xuICBsZXQgZGF0YSA9IGpRdWVyeS5leHRlbmQodHJ1ZSwge30sIHRoaXMuY29uZmlnLCB7XG4gICAgY29udHJvbENTUzoge30sXG4gICAgY29udHJvbEJ1dHRvbkNTUzoge31cbiAgfSk7XG5cbiAgZGF0YS5jb250cm9sQnV0dG9uQ1NTW1wiaGVpZ2h0XCJdID0gZGF0YS5jb250cm9sQ1NTW1wiaGVpZ2h0XCJdID0gVS5jc3NOdW1iZXIodGhpcy5jb25maWcuZGltZW5zaW9ucy5jb250cm9sSGVpZ2h0KTtcbiAgZGF0YS5jb250cm9sQnV0dG9uQ1NTW1wibGluZS1oZWlnaHRcIl0gPSBkYXRhLmNvbnRyb2xDU1NbXCJsaW5lLWhlaWdodFwiXSA9IFUuY3NzTnVtYmVyKHRoaXMuY29uZmlnLmRpbWVuc2lvbnMuY29udHJvbEhlaWdodCk7XG4gIGRhdGEuY29udHJvbEJ1dHRvbkNTU1tcIndpZHRoXCJdID0gVS5jc3NOdW1iZXIodGhpcy5jb25maWcuZGltZW5zaW9ucy5jb250cm9sSGVpZ2h0KTtcblxuICBkYXRhLmNvbnRyb2xDU1MgPSBVLmNzcyhkYXRhLmNvbnRyb2xDU1MpO1xuICBkYXRhLmNvbnRyb2xCdXR0b25DU1MgPSBVLmNzcyhkYXRhLmNvbnRyb2xCdXR0b25DU1MpO1xuXG4gIHRyeSB7XG4gICAgcmV0dXJuIG11c3RhY2hlLnJlbmRlcih0bXBsLmZyYW1lLmNhbGwodGhpcyksIGRhdGEpO1xuICB9XG4gIGZpbmFsbHkge1xuICAgIGRhdGEgPSBudWxsO1xuICB9XG59O1xuY29uc3Qgc2V0RGlzcGxheSA9IGZ1bmN0aW9uICgpIHtcbiAgbGV0IG15RGF0ZSA9IFUuZGF0ZSh0aGlzLmNvbmZpZy5kaXNwbGF5RGF0ZSksXG4gICAgeXkgPSBcIlwiLFxuICAgIG1tID0gXCJcIixcbiAgICB5eTEsIHl5MjtcblxuICBpZiAodGhpcy5jb25maWcuY29udHJvbCkge1xuICAgIGlmICh0aGlzLmNvbmZpZy5tb2RlID09IFwiZGF5XCIgfHwgdGhpcy5jb25maWcubW9kZSA9PSBcImRcIikge1xuICAgICAgeXkgPSAodGhpcy5jb25maWcuY29udHJvbC55ZWFyVG1wbCkgPyB0aGlzLmNvbmZpZy5jb250cm9sLnllYXJUbXBsLnJlcGxhY2UoJyVzJywgbXlEYXRlLmdldEZ1bGxZZWFyKCkpIDogbXlEYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICBtbSA9ICh0aGlzLmNvbmZpZy5jb250cm9sLm1vbnRoVG1wbCkgPyB0aGlzLmNvbmZpZy5jb250cm9sLm1vbnRoVG1wbC5yZXBsYWNlKCclcycsIHRoaXMuY29uZmlnLmxhbmcubW9udGhzW215RGF0ZS5nZXRNb250aCgpXSkgOiB0aGlzLmNvbmZpZy5sYW5nLm1vbnRoc1tteURhdGUuZ2V0TW9udGgoKV07XG5cbiAgICAgIHRoaXMuJFtcImNvbnRyb2wtZGlzcGxheVwiXS5odG1sKCgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5jb250cm9sLnllYXJGaXJzdCkge1xuICAgICAgICAgIHJldHVybiAnPHNwYW4gZGF0YS1jYWxlbmRhci1kaXNwbGF5PVwieWVhclwiPicgKyB5eSArICc8L3NwYW4+JyArXG4gICAgICAgICAgICAnPHNwYW4gZGF0YS1jYWxlbmRhci1kaXNwbGF5PVwibW9udGhcIj4nICsgbW0gKyAnPC9zcGFuPic7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgcmV0dXJuICc8c3BhbiBkYXRhLWNhbGVuZGFyLWRpc3BsYXk9XCJtb250aFwiPicgKyBtbSArICc8L3NwYW4+JyArXG4gICAgICAgICAgICAnPHNwYW4gZGF0YS1jYWxlbmRhci1kaXNwbGF5PVwieWVhclwiPicgKyB5eSArICc8L3NwYW4+JztcbiAgICAgICAgfVxuICAgICAgfSkoKSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMuY29uZmlnLm1vZGUgPT0gXCJtb250aFwiIHx8IHRoaXMuY29uZmlnLm1vZGUgPT0gXCJtXCIpIHtcbiAgICAgIHl5ID0gKHRoaXMuY29uZmlnLmNvbnRyb2wueWVhclRtcGwpID8gdGhpcy5jb25maWcuY29udHJvbC55ZWFyVG1wbC5yZXBsYWNlKCclcycsIG15RGF0ZS5nZXRGdWxsWWVhcigpKSA6IG15RGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgdGhpcy4kW1wiY29udHJvbC1kaXNwbGF5XCJdLmh0bWwoJzxzcGFuIGRhdGEtY2FsZW5kYXItZGlzcGxheT1cInllYXJcIj4nICsgeXkgKyAnPC9zcGFuPicpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLmNvbmZpZy5tb2RlID09IFwieWVhclwiIHx8IHRoaXMuY29uZmlnLm1vZGUgPT0gXCJ5XCIpIHtcbiAgICAgIHl5MSA9ICh0aGlzLmNvbmZpZy5jb250cm9sLnllYXJUbXBsKSA/IHRoaXMuY29uZmlnLmNvbnRyb2wueWVhclRtcGwucmVwbGFjZSgnJXMnLCBteURhdGUuZ2V0RnVsbFllYXIoKSAtIDEwKSA6IG15RGF0ZS5nZXRGdWxsWWVhcigpIC0gMTA7XG4gICAgICB5eTIgPSAodGhpcy5jb25maWcuY29udHJvbC55ZWFyVG1wbCkgPyB0aGlzLmNvbmZpZy5jb250cm9sLnllYXJUbXBsLnJlcGxhY2UoJyVzJywgTnVtYmVyKG15RGF0ZS5nZXRGdWxsWWVhcigpKSArIDkpIDogTnVtYmVyKG15RGF0ZS5nZXRGdWxsWWVhcigpKSArIDk7XG4gICAgICB0aGlzLiRbXCJjb250cm9sLWRpc3BsYXlcIl0uaHRtbCh5eTEgKyAnIH4gJyArIHl5Mik7XG4gICAgfVxuXG4gICAgdGhpcy4kW1wiY29udHJvbC1kaXNwbGF5XCJdXG4gICAgICAub2ZmKHRoaXMuY29uZmlnLmNsaWNrRXZlbnROYW1lKVxuICAgICAgLm9uKHRoaXMuY29uZmlnLmNsaWNrRXZlbnROYW1lLCAnW2RhdGEtY2FsZW5kYXItZGlzcGxheV0nLCAoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgbGV0IHRhcmdldCA9IFUuZmluZFBhcmVudE5vZGUoZS50YXJnZXQsIGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgICBpZiAodGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtY2FsZW5kYXItZGlzcGxheVwiKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KSwgbW9kZTtcbiAgICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICAgIG1vZGUgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jYWxlbmRhci1kaXNwbGF5XCIpO1xuICAgICAgICAgIHRoaXMuY2hhbmdlTW9kZShtb2RlKTtcbiAgICAgICAgfVxuICAgICAgICB0YXJnZXQgPSBudWxsO1xuICAgICAgICBtb2RlID0gbnVsbDtcbiAgICAgIH0pLmJpbmQodGhpcykpO1xuICB9XG5cbiAgbXlEYXRlID0gbnVsbDtcbiAgeXkgPSBudWxsO1xuICBtbSA9IG51bGw7XG4gIHl5MSA9IG51bGw7XG4gIHl5MiA9IG51bGw7XG4gIHJldHVybiB0aGlzO1xufTtcbmNvbnN0IHByaW50RGF5ID0gZnVuY3Rpb24gKG5vd0RhdGUpIHtcbiAgbGV0IGRvdERhdGUgPSBVLmRhdGUobm93RGF0ZSksXG4gICAgbW9udGhTdHJhdERhdGUgPSBuZXcgRGF0ZShkb3REYXRlLmdldEZ1bGxZZWFyKCksIGRvdERhdGUuZ2V0TW9udGgoKSwgMSwgMTIpLFxuICAgIF90b2RheSA9IHRoaXMuY29uZmlnLmRpc3BsYXlEYXRlLFxuICAgIHRhYmxlU3RhcnREYXRlID0gKCgpID0+IHtcbiAgICAgIGxldCBkYXkgPSBtb250aFN0cmF0RGF0ZS5nZXREYXkoKTtcbiAgICAgIGlmIChkYXkgPT0gMCkgZGF5ID0gNztcbiAgICAgIGRheSAtPSB0aGlzLmNvbmZpZy5zdGFydE9mV2VlaztcblxuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIFUuZGF0ZShtb250aFN0cmF0RGF0ZSwge2FkZDoge2Q6IC1kYXl9fSk7XG4gICAgICB9XG4gICAgICBmaW5hbGx5IHtcbiAgICAgICAgZGF5ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9KSgpLFxuICAgIGxvb3BEYXRlLFxuICAgIHRoaXNNb250aCA9IGRvdERhdGUuZ2V0TW9udGgoKSxcbiAgICBpdGVtU3R5bGVzID0ge30sXG4gICAgaSxcbiAgICBrLCBfayxcbiAgICBmcmFtZVdpZHRoID0gdGhpcy4kW1wiYm9keVwiXS53aWR0aCgpLFxuICAgIGZyYW1lSGVpZ2h0ID0gTWF0aC5mbG9vcihmcmFtZVdpZHRoICogKDYgLyA3KSksIC8vIDF3ZWVrID0gN2RheXMsIDFtb250aCA9IDZ3ZWVrc1xuICAgIGRhdGE7XG5cbiAgaWYgKHRoaXMuY29uZmlnLmRpbWVuc2lvbnMuaGVpZ2h0KSB7XG4gICAgZnJhbWVIZWlnaHQgPSBVLm51bWJlcih0aGlzLmNvbmZpZy5kaW1lbnNpb25zLmhlaWdodCkgLSBVLm51bWJlcih0aGlzLmNvbmZpZy5kaW1lbnNpb25zLmNvbEhlYWRIZWlnaHQpO1xuICB9XG5cbiAgaXRlbVN0eWxlc1snaGVpZ2h0J10gPSBNYXRoLmZsb29yKGZyYW1lSGVpZ2h0IC8gNikgLSBVLm51bWJlcih0aGlzLmNvbmZpZy5kaW1lbnNpb25zLml0ZW1QYWRkaW5nKSAqIDIgKyAncHgnO1xuICBpdGVtU3R5bGVzWydsaW5lLWhlaWdodCddID0gaXRlbVN0eWxlc1snaGVpZ2h0J107XG4gIGl0ZW1TdHlsZXNbJ3BhZGRpbmcnXSA9IFUuY3NzTnVtYmVyKHRoaXMuY29uZmlnLmRpbWVuc2lvbnMuaXRlbVBhZGRpbmcpO1xuXG4gIGRhdGEgPSB7XG4gICAgd2Vla05hbWVzOiBbXS5jb25jYXQoaW5mby53ZWVrTmFtZXMpLFxuICAgIGxpc3Q6IFtdXG4gIH07XG5cbiAgaWYgKHRoaXMuY29uZmlnLnN0YXJ0T2ZXZWVrKSB7XG4gICAgZGF0YS53ZWVrTmFtZXMgPSBkYXRhLndlZWtOYW1lcy5jb25jYXQoZGF0YS53ZWVrTmFtZXMuc2xpY2UoMCwgdGhpcy5jb25maWcuc3RhcnRPZldlZWspKS5zcGxpY2UodGhpcy5jb25maWcuc3RhcnRPZldlZWspO1xuICB9XG5cbiAgZGF0YS53ZWVrTmFtZXMuZm9yRWFjaCgobikgPT4ge1xuICAgIG4uY29sSGVhZEhlaWdodCA9IFUuY3NzTnVtYmVyKHRoaXMuY29uZmlnLmRpbWVuc2lvbnMuY29sSGVhZEhlaWdodCk7XG4gIH0pO1xuXG4gIGxvb3BEYXRlID0gdGFibGVTdGFydERhdGU7XG4gIGkgPSAwO1xuICB3aGlsZSAoaSA8IDYpIHtcbiAgICBrID0gMDtcbiAgICB3aGlsZSAoayA8IDcpIHtcbiAgICAgIF9rID0gKDcgKyAoayAtIHRoaXMuY29uZmlnLnN0YXJ0T2ZXZWVrKSkgJSA3O1xuICAgICAgbGV0IHRoaXNEYXRlID0gJycgKyBVLmRhdGUobG9vcERhdGUsIHtcInJldHVyblwiOiB0aGlzLmNvbmZpZy5kYXRlRm9ybWF0fSksXG4gICAgICAgIF9kYXRlID0ge1xuICAgICAgICAgICdyb3cnOiBpLFxuICAgICAgICAgICdjb2wnOiBrLFxuICAgICAgICAgIGlzU3RhcnRPZldlZWs6IChrID09IDApLFxuICAgICAgICAgIHRoaXNEYXRlOiAnJyArIHRoaXNEYXRlLFxuICAgICAgICAgIHRoaXNEYXRhTGFiZWw6IHRoaXMuY29uZmlnLmxhbmcuZGF5VG1wbC5yZXBsYWNlKCclcycsIGxvb3BEYXRlLmdldERhdGUoKSksXG4gICAgICAgICAgaXRlbVN0eWxlczogVS5jc3MoaXRlbVN0eWxlcyksXG4gICAgICAgICAgYWRkQ2xhc3M6ICgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgY2xhc3NOYW1lcyA9IFwiXCI7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5zZWxlY3RhYmxlKSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGFibGVNYXBbdGhpc0RhdGVdKSB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lcyArPSAoIGxvb3BEYXRlLmdldE1vbnRoKCkgPT0gdGhpc01vbnRoICkgPyBcIiBsaXZlXCIgOiBcIlwiO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZXMgKz0gXCIgZGlzYWJsZVwiO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKGxvb3BEYXRlLmdldE1vbnRoKCkgPT0gdGhpc01vbnRoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXNEYXRlID09IFUuZGF0ZShfdG9kYXksIHtcInJldHVyblwiOiBcInl5eXlNTWRkXCJ9KSkge1xuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lcyArPSBcIiBmb2N1c1wiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWVzICs9IFwiIGxpdmVcIjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAobG9vcERhdGUuZ2V0RGF5KCkgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lcyArPSBcIiBzdW5kYXlcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGxvb3BEYXRlLmdldERheSgpID09IDYpIHtcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZXMgKz0gXCIgc2F0dXJkYXlcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGNsYXNzTmFtZXM7XG4gICAgICAgICAgfSkoKVxuICAgICAgICAgICsgJyAnXG4gICAgICAgICAgKyAoKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLm1hcmtlck1hcFt0aGlzRGF0ZV0pID8gdGhpcy5tYXJrZXJNYXBbdGhpc0RhdGVdLnRoZW1lIHx8IHRoaXMuY29uZmlnLmRlZmF1bHRNYXJrZXJUaGVtZSA6ICcnO1xuICAgICAgICAgIH0pKClcbiAgICAgICAgICArICcgJ1xuICAgICAgICAgICsgKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5zZWxlY3Rpb25NYXBbdGhpc0RhdGVdKSA/IFwic2VsZWN0ZWQtZGF5XCIgOiAnJztcbiAgICAgICAgICB9KSgpXG4gICAgICAgIH07XG4gICAgICBkYXRhLmxpc3QucHVzaChfZGF0ZSk7XG5cbiAgICAgIGsrKztcbiAgICAgIGxvb3BEYXRlID0gVS5kYXRlKGxvb3BEYXRlLCB7YWRkOiB7ZDogMX19KTtcblxuICAgICAgdGhpc0RhdGUgPSBudWxsO1xuICAgICAgX2RhdGUgPSBudWxsO1xuICAgIH1cbiAgICBpKys7XG4gIH1cblxuICB0aGlzLiRbXCJib2R5XCJdXG4gICAgLmh0bWwobXVzdGFjaGUucmVuZGVyKHRtcGwuZGF5LmNhbGwodGhpcyksIGRhdGEpKVxuICAgIC5vZmYodGhpcy5jb25maWcuY2xpY2tFdmVudE5hbWUpXG4gICAgLm9uKHRoaXMuY29uZmlnLmNsaWNrRXZlbnROYW1lLCAnW2RhdGEtY2FsZW5kYXItaXRlbS1kYXRlXScsIChlKSA9PiB7XG4gICAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XG4gICAgICBvbmNsaWNrLmNhbGwodGhpcywgZSwgJ2RhdGUnKTtcbiAgICAgIFUuc3RvcEV2ZW50KGUpO1xuICAgIH0pO1xuXG4gIHRoaXMucHJpbnRlZERheSA9IHtcbiAgICBzdGFydDogdGFibGVTdGFydERhdGUsIGVuZDogbG9vcERhdGVcbiAgfTtcblxuICBvblN0YXRlQ2hhbmdlZC5jYWxsKHRoaXMsIG51bGwsIHtcbiAgICBzZWxmOiB0aGlzLFxuICAgIGFjdGlvbjogXCJwcmludERheVwiLFxuICAgIHByaW50ZWREYXk6IHRoaXMucHJpbnRlZERheVxuICB9KTtcbiAgc2V0RGlzcGxheS5jYWxsKHRoaXMpO1xuXG4gIGRvdERhdGUgPSBudWxsO1xuICBtb250aFN0cmF0RGF0ZSA9IG51bGw7XG4gIF90b2RheSA9IG51bGw7XG4gIHRhYmxlU3RhcnREYXRlID0gbnVsbDtcbiAgbG9vcERhdGUgPSBudWxsO1xuICB0aGlzTW9udGggPSBudWxsO1xuICBpdGVtU3R5bGVzID0gbnVsbDtcbiAgaSA9IG51bGw7XG4gIGsgPSBudWxsO1xuICBmcmFtZVdpZHRoID0gbnVsbDtcbiAgZnJhbWVIZWlnaHQgPSBudWxsO1xuICBkYXRhID0gbnVsbDtcbn07XG5jb25zdCBwcmludE1vbnRoID0gZnVuY3Rpb24gKG5vd0RhdGUpIHtcbiAgbGV0IGRvdERhdGUgPSBVLmRhdGUobm93RGF0ZSksXG4gICAgbk1vbnRoID0gZG90RGF0ZS5nZXRNb250aCgpLFxuICAgIGl0ZW1TdHlsZXMgPSB7fSxcbiAgICBpLFxuICAgIGssXG4gICAgbSxcbiAgICB0YWJsZVN0YXJ0TW9udGgsXG4gICAgZnJhbWVXaWR0aCA9IHRoaXMuJFtcImJvZHlcIl0ud2lkdGgoKSxcbiAgICBmcmFtZUhlaWdodCA9IE1hdGguZmxvb3IoZnJhbWVXaWR0aCAqICg2IC8gNykpLFxuICAgIGRhdGE7XG5cbiAgaWYgKHRoaXMuY29uZmlnLmRpbWVuc2lvbnMuaGVpZ2h0KSB7XG4gICAgZnJhbWVIZWlnaHQgPSBVLm51bWJlcih0aGlzLmNvbmZpZy5kaW1lbnNpb25zLmhlaWdodCkgLSBVLm51bWJlcih0aGlzLmNvbmZpZy5kaW1lbnNpb25zLmNvbEhlYWRIZWlnaHQpO1xuICB9XG5cbiAgaXRlbVN0eWxlc1snaGVpZ2h0J10gPSBNYXRoLmZsb29yKGZyYW1lSGVpZ2h0IC8gNCkgLSBVLm51bWJlcih0aGlzLmNvbmZpZy5kaW1lbnNpb25zLml0ZW1QYWRkaW5nKSAqIDIgKyAncHgnO1xuICBpdGVtU3R5bGVzWydsaW5lLWhlaWdodCddID0gaXRlbVN0eWxlc1snaGVpZ2h0J107XG4gIGl0ZW1TdHlsZXNbJ3BhZGRpbmcnXSA9IFUuY3NzTnVtYmVyKHRoaXMuY29uZmlnLmRpbWVuc2lvbnMuaXRlbVBhZGRpbmcpO1xuXG4gIGRhdGEgPSB7XG4gICAgY29sSGVhZEhlaWdodDogVS5jc3NOdW1iZXIodGhpcy5jb25maWcuZGltZW5zaW9ucy5jb2xIZWFkSGVpZ2h0KSxcbiAgICBjb2xIZWFkTGFiZWw6IHRoaXMuY29uZmlnLmxhbmcubW9udGhIZWFkaW5nLFxuICAgIGxpc3Q6IFtdXG4gIH07XG5cbiAgdGFibGVTdGFydE1vbnRoID0gMDtcbiAgbSA9IDA7XG4gIGkgPSAwO1xuICB3aGlsZSAoaSA8IDQpIHtcbiAgICBrID0gMDtcbiAgICB3aGlsZSAoayA8IDMpIHtcbiAgICAgIGxldCBfbW9udGggPSB7XG4gICAgICAgIHJvdzogaSxcbiAgICAgICAgY29sOiBrLFxuICAgICAgICBpc1N0YXJ0T2ZSb3c6IChrID09IDApLFxuICAgICAgICB0aGlzTW9udGg6IGRvdERhdGUuZ2V0RnVsbFllYXIoKSArICctJyArIFUuc2V0RGlnaXQobSArIDEsIDIpICsgJy0nICsgVS5zZXREaWdpdChkb3REYXRlLmdldERhdGUoKSwgMiksXG4gICAgICAgIHRoaXNNb250aExhYmVsOiB0aGlzLmNvbmZpZy5sYW5nLm1vbnRoc1ttXSxcbiAgICAgICAgaXRlbVN0eWxlczogVS5jc3MoaXRlbVN0eWxlcyksXG4gICAgICAgIGFkZENsYXNzOiAoKCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5zZWxlY3RhYmxlKSB7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuc2VsZWN0YWJsZU1hcFttXSkgPyAnbGl2ZScgOiAnZGlzYWJsZSc7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICdsaXZlJztcbiAgICAgICAgICB9XG4gICAgICAgIH0pKClcbiAgICAgICAgKyAnICdcbiAgICAgICAgKyAoKCkgPT4ge1xuICAgICAgICAgIHJldHVybiAoIG0gPT0gbk1vbnRoICkgPyBcImZvY3VzXCIgOiBcIlwiO1xuICAgICAgICB9KSgpXG4gICAgICAgICsgJyAnXG4gICAgICAgICsgKCgpID0+IHtcbiAgICAgICAgICByZXR1cm4gKHRoaXMubWFya2VyTWFwW21dKSA/IHRoaXMubWFya2VyTWFwW21dLnRoZW1lIHx8IHRoaXMuY29uZmlnLmRlZmF1bHRNYXJrZXJUaGVtZSA6ICcnO1xuICAgICAgICB9KSgpXG4gICAgICB9O1xuICAgICAgZGF0YS5saXN0LnB1c2goX21vbnRoKTtcbiAgICAgIG0rKztcbiAgICAgIGsrKztcbiAgICAgIF9tb250aCA9IG51bGw7XG4gICAgfVxuICAgIGkrKztcbiAgfVxuXG4gIHRoaXMuJFtcImJvZHlcIl1cbiAgICAuaHRtbChtdXN0YWNoZS5yZW5kZXIodG1wbC5tb250aC5jYWxsKHRoaXMpLCBkYXRhKSlcbiAgICAub2ZmKHRoaXMuY29uZmlnLmNsaWNrRXZlbnROYW1lKVxuICAgIC5vbih0aGlzLmNvbmZpZy5jbGlja0V2ZW50TmFtZSwgJ1tkYXRhLWNhbGVuZGFyLWl0ZW0tbW9udGhdJywgKGUpID0+IHtcbiAgICAgIGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcbiAgICAgIG9uY2xpY2suY2FsbCh0aGlzLCBlLCAnbW9udGgnKTtcbiAgICAgIFUuc3RvcEV2ZW50KGUpO1xuICAgIH0pO1xuXG4gIHRoaXMucHJpbnRlZERheSA9IHtcbiAgICBzdGFydDogZG90RGF0ZS5nZXRGdWxsWWVhcigpICsgJy0nICsgVS5zZXREaWdpdCh0YWJsZVN0YXJ0TW9udGggKyAxLCAyKSxcbiAgICBlbmQ6IGRvdERhdGUuZ2V0RnVsbFllYXIoKSArICctJyArIFUuc2V0RGlnaXQobSwgMilcbiAgfTtcblxuICBvblN0YXRlQ2hhbmdlZC5jYWxsKHRoaXMsIG51bGwsIHtcbiAgICBzZWxmOiB0aGlzLFxuICAgIGFjdGlvbjogXCJwcmludE1vbnRoXCIsXG4gICAgcHJpbnRlZERheTogdGhpcy5wcmludGVkRGF5XG4gIH0pO1xuICBzZXREaXNwbGF5LmNhbGwodGhpcyk7XG5cbiAgZG90RGF0ZSA9IG51bGw7XG4gIG5Nb250aCA9IG51bGw7XG4gIGl0ZW1TdHlsZXMgPSBudWxsO1xuICBpID0gbnVsbDtcbiAgayA9IG51bGw7XG4gIG0gPSBudWxsO1xuICB0YWJsZVN0YXJ0TW9udGggPSBudWxsO1xuICBmcmFtZVdpZHRoID0gbnVsbDtcbiAgZnJhbWVIZWlnaHQgPSBudWxsO1xuICBkYXRhID0gbnVsbDtcbn07XG5jb25zdCBwcmludFllYXIgPSBmdW5jdGlvbiAobm93RGF0ZSkge1xuICBsZXQgZG90RGF0ZSA9IFUuZGF0ZShub3dEYXRlKSxcbiAgICBuWWVhciA9IGRvdERhdGUuZ2V0RnVsbFllYXIoKSxcbiAgICBpdGVtU3R5bGVzID0ge30sXG4gICAgaSxcbiAgICBrLFxuICAgIHksXG4gICAgdGFibGVTdGFydFllYXIsXG4gICAgZnJhbWVXaWR0aCA9IHRoaXMuJFtcImJvZHlcIl0ud2lkdGgoKSxcbiAgICBmcmFtZUhlaWdodCA9IE1hdGguZmxvb3IoZnJhbWVXaWR0aCAqICg2IC8gNykpLFxuICAgIGRhdGE7XG5cbiAgaWYgKHRoaXMuY29uZmlnLmRpbWVuc2lvbnMuaGVpZ2h0KSB7XG4gICAgZnJhbWVIZWlnaHQgPSBVLm51bWJlcih0aGlzLmNvbmZpZy5kaW1lbnNpb25zLmhlaWdodCkgLSBVLm51bWJlcih0aGlzLmNvbmZpZy5kaW1lbnNpb25zLmNvbEhlYWRIZWlnaHQpO1xuICB9XG5cbiAgaXRlbVN0eWxlc1snaGVpZ2h0J10gPSBNYXRoLmZsb29yKGZyYW1lSGVpZ2h0IC8gNSkgLSBVLm51bWJlcih0aGlzLmNvbmZpZy5kaW1lbnNpb25zLml0ZW1QYWRkaW5nKSAqIDIgKyAncHgnO1xuICBpdGVtU3R5bGVzWydsaW5lLWhlaWdodCddID0gaXRlbVN0eWxlc1snaGVpZ2h0J107XG4gIGl0ZW1TdHlsZXNbJ3BhZGRpbmcnXSA9IFUuY3NzTnVtYmVyKHRoaXMuY29uZmlnLmRpbWVuc2lvbnMuaXRlbVBhZGRpbmcpO1xuXG4gIGRhdGEgPSB7XG4gICAgY29sSGVhZEhlaWdodDogVS5jc3NOdW1iZXIodGhpcy5jb25maWcuZGltZW5zaW9ucy5jb2xIZWFkSGVpZ2h0KSxcbiAgICBjb2xIZWFkTGFiZWw6IHRoaXMuY29uZmlnLmxhbmcueWVhckhlYWRpbmcsXG4gICAgbGlzdDogW11cbiAgfTtcblxuICB0YWJsZVN0YXJ0WWVhciA9IG5ZZWFyIC0gMTA7XG4gIHkgPSBuWWVhciAtIDEwO1xuICBpID0gMDtcbiAgd2hpbGUgKGkgPCA1KSB7XG4gICAgayA9IDA7XG4gICAgd2hpbGUgKGsgPCA0KSB7XG4gICAgICBsZXQgX3llYXIgPSB7XG4gICAgICAgIHJvdzogaSxcbiAgICAgICAgY29sOiBrLFxuICAgICAgICBpc1N0YXJ0T2ZSb3c6IChrID09IDApLFxuICAgICAgICB0aGlzWWVhcjogeSArICctJyArIFUuc2V0RGlnaXQoZG90RGF0ZS5nZXRNb250aCgpICsgMSwgMikgKyAnLScgKyBVLnNldERpZ2l0KGRvdERhdGUuZ2V0RGF0ZSgpLCAyKSxcbiAgICAgICAgdGhpc1llYXJMYWJlbDogdGhpcy5jb25maWcubGFuZy55ZWFyVG1wbC5yZXBsYWNlKCclcycsICh5KSksXG4gICAgICAgIGl0ZW1TdHlsZXM6IFUuY3NzKGl0ZW1TdHlsZXMpLFxuICAgICAgICBhZGRDbGFzczogKCgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5jb25maWcuc2VsZWN0YWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLnNlbGVjdGFibGVNYXBbeV0pID8gJ2xpdmUnIDogJ2Rpc2FibGUnO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAnbGl2ZSc7XG4gICAgICAgICAgfVxuICAgICAgICB9KSgpXG4gICAgICAgICsgJyAnXG4gICAgICAgICsgKCgpID0+IHtcbiAgICAgICAgICByZXR1cm4gKCB5ID09IG5ZZWFyICkgPyBcImZvY3VzXCIgOiBcIlwiO1xuICAgICAgICB9KSgpXG4gICAgICAgICsgJyAnXG4gICAgICAgICsgKCgpID0+IHtcbiAgICAgICAgICByZXR1cm4gKHRoaXMuc2VsZWN0YWJsZU1hcFt5XSkgPyB0aGlzLnNlbGVjdGFibGVNYXBbeV0udGhlbWUgfHwgdGhpcy5jb25maWcuZGVmYXVsdE1hcmtlclRoZW1lIDogJyc7XG4gICAgICAgIH0pKClcbiAgICAgIH07XG4gICAgICBkYXRhLmxpc3QucHVzaChfeWVhcik7XG4gICAgICB5Kys7XG4gICAgICBrKys7XG4gICAgICBfeWVhciA9IG51bGw7XG4gICAgfVxuICAgIGkrKztcbiAgfVxuXG4gIHRoaXMuJFtcImJvZHlcIl1cbiAgICAuaHRtbChtdXN0YWNoZS5yZW5kZXIodG1wbC55ZWFyLmNhbGwodGhpcyksIGRhdGEpKVxuICAgIC5vZmYodGhpcy5jb25maWcuY2xpY2tFdmVudE5hbWUpXG4gICAgLm9uKHRoaXMuY29uZmlnLmNsaWNrRXZlbnROYW1lLCAnW2RhdGEtY2FsZW5kYXItaXRlbS15ZWFyXScsIChlKSA9PiB7XG4gICAgICBlID0gKGUgfHwgd2luZG93LmV2ZW50KTtcbiAgICAgIG9uY2xpY2suY2FsbCh0aGlzLCBlLCAneWVhcicpO1xuICAgICAgVS5zdG9wRXZlbnQoZSk7XG4gICAgfSk7XG5cbiAgdGhpcy5wcmludGVkRGF5ID0ge1xuICAgIHN0YXJ0OiB0YWJsZVN0YXJ0WWVhciwgZW5kOiB5IC0gMVxuICB9O1xuXG4gIG9uU3RhdGVDaGFuZ2VkLmNhbGwodGhpcywgbnVsbCwge1xuICAgIHNlbGY6IHRoaXMsXG4gICAgYWN0aW9uOiBcInByaW50WWVhclwiLFxuICAgIHByaW50ZWREYXk6IHRoaXMucHJpbnRlZERheVxuICB9KTtcbiAgc2V0RGlzcGxheS5jYWxsKHRoaXMpO1xuXG4gIGRvdERhdGUgPSBudWxsO1xuICBuWWVhciA9IG51bGw7XG4gIGl0ZW1TdHlsZXMgPSBudWxsO1xuICBpID0gbnVsbDtcbiAgayA9IG51bGw7XG4gIHkgPSBudWxsO1xuICB0YWJsZVN0YXJ0WWVhciA9IG51bGw7XG4gIGZyYW1lV2lkdGggPSBudWxsO1xuICBmcmFtZUhlaWdodCA9IG51bGw7XG4gIGRhdGEgPSBudWxsO1xufTtcbmNvbnN0IG9uY2xpY2sgPSBmdW5jdGlvbiAoZSwgbW9kZSwgdGFyZ2V0LCB2YWx1ZSkge1xuICBsZXQgcmVtb3ZlZCxcbiAgICBkdCxcbiAgICBzZWxlY3RhYmxlO1xuXG4gIG1vZGUgPSBtb2RlIHx8IFwiZGF0ZVwiO1xuICB0YXJnZXQgPSBVLmZpbmRQYXJlbnROb2RlKGUudGFyZ2V0LCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgaWYgKHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNhbGVuZGFyLWl0ZW0tXCIgKyBtb2RlKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9KTtcbiAgaWYgKHRhcmdldCkge1xuICAgIHZhbHVlID0gdGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtY2FsZW5kYXItaXRlbS1cIiArIG1vZGUpO1xuXG4gICAgZHQgPSBVLmRhdGUodmFsdWUsIHtcInJldHVyblwiOiB0aGlzLmNvbmZpZy5kYXRlRm9ybWF0fSk7XG4gICAgc2VsZWN0YWJsZSA9IHRydWU7XG4gICAgdGhpcy5zZWxlY3RhYmxlQ291bnQgPSAodGhpcy5jb25maWcubXVsdGlwbGVTZWxlY3QpID8gKFUuaXNOdW1iZXIodGhpcy5jb25maWcubXVsdGlwbGVTZWxlY3QpKSA/IHRoaXMuY29uZmlnLm11bHRpcGxlU2VsZWN0IDogMiA6IDE7XG5cbiAgICBpZiAodGhpcy5jb25maWcuc2VsZWN0YWJsZSkge1xuICAgICAgaWYgKCF0aGlzLnNlbGVjdGFibGVNYXBbZHRdKSBzZWxlY3RhYmxlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKG1vZGUgPT0gXCJkYXRlXCIpIHtcbiAgICAgIGlmIChzZWxlY3RhYmxlKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uLmxlbmd0aCA+PSB0aGlzLnNlbGVjdGFibGVDb3VudCkge1xuICAgICAgICAgIHJlbW92ZWQgPSB0aGlzLnNlbGVjdGlvbi5zcGxpY2UoMCwgdGhpcy5zZWxlY3Rpb24ubGVuZ3RoIC0gKHRoaXMuc2VsZWN0YWJsZUNvdW50IC0gMSkpO1xuICAgICAgICAgIHJlbW92ZWQuZm9yRWFjaCgoZCkgPT4ge1xuICAgICAgICAgICAgdGhpcy4kW1wiYm9keVwiXS5maW5kKCdbZGF0YS1jYWxlbmRhci1pdGVtLWRhdGU9XCInICsgVS5kYXRlKGQsIHtcInJldHVyblwiOiB0aGlzLmNvbmZpZy5kYXRlRm9ybWF0fSkgKyAnXCJdJykucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZC1kYXlcIik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBqUXVlcnkodGFyZ2V0KS5hZGRDbGFzcyhcInNlbGVjdGVkLWRheVwiKTtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb24ucHVzaCh2YWx1ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMub25DbGljaykge1xuICAgICAgICAgIHRoaXMub25DbGljay5jYWxsKHtcbiAgICAgICAgICAgIHNlbGY6IHRoaXMsIGRhdGU6IHZhbHVlLCB0YXJnZXQ6IHRoaXMudGFyZ2V0LCBkYXRlRWxlbWVudDogdGFyZ2V0XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAobW9kZSA9PSBcIm1vbnRoXCIpIHtcbiAgICAgIGlmICh0aGlzLmNvbmZpZy5zZWxlY3RNb2RlID09IFwibW9udGhcIikge1xuICAgICAgICBpZiAoc2VsZWN0YWJsZSkge1xuICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbi5sZW5ndGggPj0gdGhpcy5zZWxlY3RhYmxlQ291bnQpIHtcbiAgICAgICAgICAgIHJlbW92ZWQgPSB0aGlzLnNlbGVjdGlvbi5zcGxpY2UoMCwgdGhpcy5zZWxlY3Rpb24ubGVuZ3RoIC0gKHRoaXMuc2VsZWN0YWJsZUNvdW50IC0gMSkpO1xuICAgICAgICAgICAgcmVtb3ZlZC5mb3JFYWNoKChkKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuJFtcImJvZHlcIl0uZmluZCgnW2RhdGEtY2FsZW5kYXItaXRlbS1tb250aD1cIicgKyBVLmRhdGUoZCwge1wicmV0dXJuXCI6ICd5eXl5LU1NLWRkJ30pICsgJ1wiXScpLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWQtbW9udGhcIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBqUXVlcnkodGFyZ2V0KS5hZGRDbGFzcyhcInNlbGVjdGVkLW1vbnRoXCIpO1xuICAgICAgICAgIHRoaXMuc2VsZWN0aW9uLnB1c2godmFsdWUpO1xuXG4gICAgICAgICAgaWYgKHRoaXMub25DbGljaykge1xuICAgICAgICAgICAgdGhpcy5vbkNsaWNrLmNhbGwoe1xuICAgICAgICAgICAgICBzZWxmOiB0aGlzLCBkYXRlOiB2YWx1ZSwgdGFyZ2V0OiB0aGlzLnRhcmdldCwgZGF0ZUVsZW1lbnQ6IHRhcmdldFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VNb2RlKFwiZGF5XCIsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAobW9kZSA9PSBcInllYXJcIikge1xuICAgICAgaWYgKHRoaXMuY29uZmlnLnNlbGVjdE1vZGUgPT0gXCJ5ZWFyXCIpIHtcbiAgICAgICAgaWYgKHNlbGVjdGFibGUpIHtcbiAgICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb24ubGVuZ3RoID49IHRoaXMuc2VsZWN0YWJsZUNvdW50KSB7XG4gICAgICAgICAgICByZW1vdmVkID0gdGhpcy5zZWxlY3Rpb24uc3BsaWNlKDAsIHRoaXMuc2VsZWN0aW9uLmxlbmd0aCAtICh0aGlzLnNlbGVjdGFibGVDb3VudCAtIDEpKTtcbiAgICAgICAgICAgIHJlbW92ZWQuZm9yRWFjaCgoZCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLiRbXCJib2R5XCJdLmZpbmQoJ1tkYXRhLWNhbGVuZGFyLWl0ZW0teWVhcj1cIicgKyBVLmRhdGUoZCwge1wicmV0dXJuXCI6ICd5eXl5LU1NLWRkJ30pICsgJ1wiXScpLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWQteWVhclwiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGpRdWVyeSh0YXJnZXQpLmFkZENsYXNzKFwic2VsZWN0ZWQteWVhclwiKTtcbiAgICAgICAgICB0aGlzLnNlbGVjdGlvbi5wdXNoKHZhbHVlKTtcblxuICAgICAgICAgIGlmICh0aGlzLm9uQ2xpY2spIHtcbiAgICAgICAgICAgIHRoaXMub25DbGljay5jYWxsKHtcbiAgICAgICAgICAgICAgc2VsZjogdGhpcywgZGF0ZTogdmFsdWUsIHRhcmdldDogdGhpcy50YXJnZXQsIGRhdGVFbGVtZW50OiB0YXJnZXRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMuY2hhbmdlTW9kZShcIm1vbnRoXCIsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBtb2RlID0gbnVsbDtcbiAgdGFyZ2V0ID0gbnVsbDtcbiAgdmFsdWUgPSBudWxsO1xuICByZW1vdmVkID0gbnVsbDtcbiAgZHQgPSBudWxsO1xuICBzZWxlY3RhYmxlID0gbnVsbDtcbn07XG5jb25zdCBtb3ZlID0gZnVuY3Rpb24gKGUsIHRhcmdldCwgdmFsdWUpIHtcbiAgdGFyZ2V0ID0gVS5maW5kUGFyZW50Tm9kZShlLnRhcmdldCwgZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGlmICh0YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jYWxlbmRhci1tb3ZlXCIpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuICBpZiAodGFyZ2V0KSB7XG4gICAgdmFsdWUgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jYWxlbmRhci1tb3ZlXCIpO1xuICAgIGlmICh0aGlzLmNvbmZpZy5tb2RlID09IFwiZGF5XCIgfHwgdGhpcy5jb25maWcubW9kZSA9PSBcImRcIikge1xuICAgICAgaWYgKHZhbHVlID09IFwibGVmdFwiKSB7XG4gICAgICAgIHRoaXMuY29uZmlnLmRpc3BsYXlEYXRlID0gVS5kYXRlKHRoaXMuY29uZmlnLmRpc3BsYXlEYXRlLCB7YWRkOiB7bTogLTF9fSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5jb25maWcuZGlzcGxheURhdGUgPSBVLmRhdGUodGhpcy5jb25maWcuZGlzcGxheURhdGUsIHthZGQ6IHttOiAxfX0pO1xuICAgICAgfVxuICAgICAgcHJpbnREYXkuY2FsbCh0aGlzLCB0aGlzLmNvbmZpZy5kaXNwbGF5RGF0ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMuY29uZmlnLm1vZGUgPT0gXCJtb250aFwiIHx8IHRoaXMuY29uZmlnLm1vZGUgPT0gXCJtXCIpIHtcbiAgICAgIGlmICh2YWx1ZSA9PSBcImxlZnRcIikge1xuICAgICAgICB0aGlzLmNvbmZpZy5kaXNwbGF5RGF0ZSA9IFUuZGF0ZSh0aGlzLmNvbmZpZy5kaXNwbGF5RGF0ZSwge2FkZDoge3k6IC0xfX0pO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMuY29uZmlnLmRpc3BsYXlEYXRlID0gVS5kYXRlKHRoaXMuY29uZmlnLmRpc3BsYXlEYXRlLCB7YWRkOiB7eTogMX19KTtcbiAgICAgIH1cbiAgICAgIHByaW50TW9udGguY2FsbCh0aGlzLCB0aGlzLmNvbmZpZy5kaXNwbGF5RGF0ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMuY29uZmlnLm1vZGUgPT0gXCJ5ZWFyXCIgfHwgdGhpcy5jb25maWcubW9kZSA9PSBcInlcIikge1xuICAgICAgaWYgKHZhbHVlID09IFwibGVmdFwiKSB7XG4gICAgICAgIHRoaXMuY29uZmlnLmRpc3BsYXlEYXRlID0gVS5kYXRlKHRoaXMuY29uZmlnLmRpc3BsYXlEYXRlLCB7YWRkOiB7eTogLTEwfX0pO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMuY29uZmlnLmRpc3BsYXlEYXRlID0gVS5kYXRlKHRoaXMuY29uZmlnLmRpc3BsYXlEYXRlLCB7YWRkOiB7eTogMTB9fSk7XG4gICAgICB9XG4gICAgICBwcmludFllYXIuY2FsbCh0aGlzLCB0aGlzLmNvbmZpZy5kaXNwbGF5RGF0ZSk7XG4gICAgfVxuICB9XG5cbiAgdGFyZ2V0ID0gbnVsbDtcbiAgdmFsdWUgPSBudWxsO1xufTtcbmNvbnN0IGFwcGx5TWFya2VyTWFwID0gZnVuY3Rpb24gKCkge1xuICBzZXRUaW1lb3V0KChmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuY29uZmlnLm1vZGUgPT09IFwiZGF5XCIgfHwgdGhpcy5jb25maWcubW9kZSA9PT0gXCJkXCIpIHtcbiAgICAgIGZvciAobGV0IGsgaW4gdGhpcy5tYXJrZXJNYXApIHtcbiAgICAgICAgdGhpcy4kW1wiYm9keVwiXS5maW5kKCdbZGF0YS1jYWxlbmRhci1pdGVtLWRhdGU9XCInICsgayArICdcIl0nKS5hZGRDbGFzcyh0aGlzLm1hcmtlck1hcFtrXS50aGVtZSB8fCB0aGlzLmNvbmZpZy5kZWZhdWx0TWFya2VyVGhlbWUpO1xuICAgICAgfVxuICAgIH1cbiAgfSkuYmluZCh0aGlzKSk7XG59O1xuY29uc3QgYXBwbHlTZWxlY3Rpb25NYXAgPSBmdW5jdGlvbiAoKSB7XG4gIHNldFRpbWVvdXQoKGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKGxldCBrIGluIHRoaXMuc2VsZWN0aW9uTWFwKSB7XG4gICAgICB0aGlzLiRbXCJib2R5XCJdLmZpbmQoJ1tkYXRhLWNhbGVuZGFyLWl0ZW0tZGF0ZT1cIicgKyBrICsgJ1wiXScpLmFkZENsYXNzKFwic2VsZWN0ZWQtZGF5XCIpO1xuICAgIH1cbiAgfSkuYmluZCh0aGlzKSk7XG59O1xuY29uc3QgYXBwbHlQZXJpb2RNYXAgPSBmdW5jdGlvbiAoKSB7XG4gIHNldFRpbWVvdXQoKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5jb25maWcubW9kZSA9PT0gXCJkYXlcIiB8fCB0aGlzLmNvbmZpZy5tb2RlID09PSBcImRcIikge1xuICAgICAgZm9yIChsZXQgayBpbiB0aGlzLnBlcmlvZE1hcCkge1xuICAgICAgICBpZiAodGhpcy5wZXJpb2RNYXBba10ubGFiZWwpIHtcbiAgICAgICAgICB0aGlzLiRbXCJib2R5XCJdLmZpbmQoJ1tkYXRhLWNhbGVuZGFyLWl0ZW0tZGF0ZT1cIicgKyBrICsgJ1wiXScpLmZpbmQoXCIuYWRkb24tZm9vdGVyXCIpLmh0bWwodGhpcy5wZXJpb2RNYXBba10ubGFiZWwpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuJFtcImJvZHlcIl0uZmluZCgnW2RhdGEtY2FsZW5kYXItaXRlbS1kYXRlPVwiJyArIGsgKyAnXCJdJykuYWRkQ2xhc3ModGhpcy5wZXJpb2RNYXBba10udGhlbWUpO1xuICAgICAgfVxuICAgIH1cbiAgfSkuYmluZCh0aGlzKSk7XG59O1xuY29uc3QgY2xlYXJQZXJpb2RNYXAgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLmNvbmZpZy5tb2RlID09PSBcImRheVwiIHx8IHRoaXMuY29uZmlnLm1vZGUgPT09IFwiZFwiKSB7XG4gICAgZm9yIChsZXQgayBpbiB0aGlzLnBlcmlvZE1hcCkge1xuICAgICAgdGhpcy4kW1wiYm9keVwiXS5maW5kKCdbZGF0YS1jYWxlbmRhci1pdGVtLWRhdGU9XCInICsgayArICdcIl0nKS5maW5kKFwiLmFkZG9uLWZvb3RlclwiKS5lbXB0eSgpO1xuICAgICAgdGhpcy4kW1wiYm9keVwiXS5maW5kKCdbZGF0YS1jYWxlbmRhci1pdGVtLWRhdGU9XCInICsgayArICdcIl0nKS5yZW1vdmVDbGFzcyh0aGlzLnBlcmlvZE1hcFtrXS50aGVtZSk7XG4gICAgfVxuICB9XG59O1xuLyogfn5+fn5+fn5+fn5+fn5+fn5+IGVuZCBvZiBwcml2YXRlICB+fn5+fn5+fn5+fn5+fn5+fn5+fiAqL1xuXG4vKipcbiAqIEBjbGFzc1xuICovXG5jbGFzcyBBWDZVSUNhbGVuZGFyIGV4dGVuZHMgQVg2VUlDb3JlIHtcbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge29iamVjdH0gY29uZmlnXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbY29uZmlnLnRoZW1lID0gJ2RlZmF1bHQnXVxuICAgKiBAcGFyYW0geyEob2JqZWN0fHN0cmluZyl9IFtjb25maWcudGFyZ2V0XVxuICAgKiBAcGFyYW0ge251bWJlcn0gW2NvbmZpZy5hbmltYXRlVGltZSA9IDEwMF1cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gW2NvbmZpZy5vblN0YXRlQ2hhbmdlZF1cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gW2NvbmZpZy5vbkNsaWNrXVxuICAgKiBAcGFyYW0gW2NvbmZpZy5jb250ZW50XVxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBqc1xuICAgKiB2YXIgbXlDYWxlbmRhciA9IG5ldyBBWDZVSUNhbGVuZGFyKCk7XG4gICAqIGBgYFxuICAgKi9cbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuY29uZmlnID0ge1xuICAgICAgY2xpY2tFdmVudE5hbWU6IFwiY2xpY2tcIixcbiAgICAgIHRoZW1lOiAnZGVmYXVsdCcsXG4gICAgICBzdGFydE9mV2VlazogMCxcbiAgICAgIG1vZGU6ICdkYXknLCAvLyBkYXl8bW9udGh8eWVhcixcbiAgICAgIGRhdGVGb3JtYXQ6ICd5eXl5LU1NLWRkJyxcbiAgICAgIGRpc3BsYXlEYXRlOiAobmV3IERhdGUoKSksXG4gICAgICBhbmltYXRlVGltZTogMTAwLFxuICAgICAgZGltZW5zaW9uczoge1xuICAgICAgICBjb250cm9sSGVpZ2h0OiAnNDAnLFxuICAgICAgICBjb250cm9sQnV0dG9uV2lkdGg6ICc0MCcsXG4gICAgICAgIGNvbEhlYWRIZWlnaHQ6ICczMCcsXG4gICAgICAgIGl0ZW1QYWRkaW5nOiAyXG4gICAgICB9LFxuICAgICAgbGFuZzoge1xuICAgICAgICB5ZWFySGVhZGluZzogXCJDaG9vc2UgdGhlIHllYXJcIixcbiAgICAgICAgbW9udGhIZWFkaW5nOiBcIkNob29zZSB0aGUgbW9udGhcIixcbiAgICAgICAgeWVhclRtcGw6IFwiJXNcIixcbiAgICAgICAgbW9udGhzOiBpbmZvLm1vbnRocyB8fCBbJ0pBTicsICdGRUInLCAnTUFSJywgJ0FQUicsICdNQVknLCAnSlVOJywgJ0pVTCcsICdBVUcnLCAnU0VQJywgJ09DVCcsICdOT1YnLCAnREVDJ10sXG4gICAgICAgIGRheVRtcGw6IFwiJXNcIlxuICAgICAgfSxcbiAgICAgIG11bHRpcGxlU2VsZWN0OiBmYWxzZSxcbiAgICAgIHNlbGVjdE1vZGU6ICdkYXknLFxuICAgICAgZGVmYXVsdE1hcmtlclRoZW1lOiAnaG9saWRheScsXG4gICAgICBkZWZhdWx0UGVyaW9kVGhlbWU6ICdwZXJpb2QnXG4gICAgfTtcbiAgICBqUXVlcnkuZXh0ZW5kKHRydWUsIHRoaXMuY29uZmlnLCBjb25maWcpO1xuXG4gICAgLy8g66mk67KEIOuzgOyImCDstIjquLDtmZRcbiAgICB0aGlzLiR0YXJnZXQgPSBudWxsO1xuICAgIHRoaXMuc2VsZWN0aW9uID0gW107XG4gICAgdGhpcy5zZWxlY3Rpb25NYXAgPSB7fTtcbiAgICB0aGlzLnNlbGVjdGFibGVNYXAgPSB7fTtcbiAgICB0aGlzLm1hcmtlck1hcCA9IHt9O1xuICAgIHRoaXMucHJpbnRlZERheSA9IHtcbiAgICAgIHN0YXJ0OiBcIlwiLCBlbmQ6IFwiXCJcbiAgICB9O1xuICAgIHRoaXMuc2VsZWN0YWJsZUNvdW50ID0gMTtcblxuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgQVg2VUlDYWxlbmRhci5pbml0XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqIG15Q2FsZW5kYXIuaW5pdCgpO1xuICAgKiBgYGBcbiAgICovXG4gIGluaXQoKSB7XG4gICAgdGhpcy5vblN0YXRlQ2hhbmdlZCA9IHRoaXMuY29uZmlnLm9uU3RhdGVDaGFuZ2VkO1xuICAgIGRlbGV0ZSB0aGlzLmNvbmZpZy5vblN0YXRlQ2hhbmdlZDtcbiAgICB0aGlzLm9uQ2xpY2sgPSB0aGlzLmNvbmZpZy5vbkNsaWNrO1xuICAgIGRlbGV0ZSB0aGlzLmNvbmZpZy5vbkNsaWNrO1xuXG4gICAgaWYgKCF0aGlzLmNvbmZpZy50YXJnZXQpIHtcbiAgICAgIGNvbnNvbGUubG9nKGluZm8uZ2V0RXJyb3IoXCJheDZjYWxlbmRhclwiLCBcIjQwMVwiLCBcInNldENvbmZpZ1wiKSk7XG4gICAgfVxuICAgIHRoaXMuJHRhcmdldCA9IGpRdWVyeSh0aGlzLmNvbmZpZy50YXJnZXQpO1xuICAgIHRoaXMuY29uZmlnLmRpc3BsYXlEYXRlID0gVS5kYXRlKHRoaXMuY29uZmlnLmRpc3BsYXlEYXRlKTtcblxuICAgIHRoaXMuJHRhcmdldC5odG1sKGdldEZyYW1lLmNhbGwodGhpcykpO1xuXG4gICAgLy8g67aA7IaN7IiY7KeRXG4gICAgdGhpcy4kID0ge1xuICAgICAgXCJyb290XCI6IHRoaXMuJHRhcmdldC5maW5kKCdbZGF0YS1jYWxlbmRhci1lbHM9XCJyb290XCJdJyksXG4gICAgICBcImNvbnRyb2xcIjogdGhpcy4kdGFyZ2V0LmZpbmQoJ1tkYXRhLWNhbGVuZGFyLWVscz1cImNvbnRyb2xcIl0nKSxcbiAgICAgIFwiY29udHJvbC1kaXNwbGF5XCI6IHRoaXMuJHRhcmdldC5maW5kKCdbZGF0YS1jYWxlbmRhci1lbHM9XCJjb250cm9sLWRpc3BsYXlcIl0nKSxcbiAgICAgIFwiYm9keVwiOiB0aGlzLiR0YXJnZXQuZmluZCgnW2RhdGEtY2FsZW5kYXItZWxzPVwiYm9keVwiXScpXG4gICAgfTtcblxuICAgIGlmICh0aGlzLmNvbmZpZy5jb250cm9sKSB7XG4gICAgICB0aGlzLiRbXCJyb290XCJdLm9uKHRoaXMuY29uZmlnLmNsaWNrRXZlbnROYW1lLCAnW2RhdGEtY2FsZW5kYXItbW92ZV0nLCAoZSkgPT4ge1xuICAgICAgICBtb3ZlLmNhbGwodGhpcywgZSB8fCB3aW5kb3cuZXZlbnQpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gY29sbGVjdCBzZWxlY3RhYmxlTWFwXG4gICAgaWYgKHRoaXMuY29uZmlnLnNlbGVjdGlvbikge1xuICAgICAgdGhpcy5zZXRTZWxlY3Rpb24odGhpcy5jb25maWcuc2VsZWN0aW9uLCBmYWxzZSk7XG4gICAgfVxuICAgIC8vIGNvbGxlY3Qgc2VsZWN0YWJsZU1hcFxuICAgIGlmICh0aGlzLmNvbmZpZy5zZWxlY3RhYmxlKSB7XG4gICAgICB0aGlzLnNldFNlbGVjdGFibGUodGhpcy5jb25maWcuc2VsZWN0YWJsZSwgZmFsc2UpO1xuICAgIH1cbiAgICAvLyBjb2xsZWN0IG1hcmtlck1hcFxuICAgIGlmICh0aGlzLmNvbmZpZy5tYXJrZXIpIHtcbiAgICAgIHRoaXMuc2V0TWFya2VyKHRoaXMuY29uZmlnLm1hcmtlciwgZmFsc2UpO1xuICAgIH1cblxuICAgIHNldFRpbWVvdXQoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLmNvbmZpZy5tb2RlID09PSBcImRheVwiIHx8IHRoaXMuY29uZmlnLm1vZGUgPT09IFwiZFwiKSB7XG4gICAgICAgIHByaW50RGF5LmNhbGwodGhpcywgdGhpcy5jb25maWcuZGlzcGxheURhdGUpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodGhpcy5jb25maWcubW9kZSA9PT0gXCJtb250aFwiIHx8IHRoaXMuY29uZmlnLm1vZGUgPT09IFwibVwiKSB7XG4gICAgICAgIHByaW50TW9udGguY2FsbCh0aGlzLCB0aGlzLmNvbmZpZy5kaXNwbGF5RGF0ZSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0aGlzLmNvbmZpZy5tb2RlID09PSBcInllYXJcIiB8fCB0aGlzLmNvbmZpZy5tb2RlID09PSBcInlcIikge1xuICAgICAgICBwcmludFllYXIuY2FsbCh0aGlzLCB0aGlzLmNvbmZpZy5kaXNwbGF5RGF0ZSk7XG4gICAgICB9XG4gICAgfSkuYmluZCh0aGlzKSk7XG5cbiAgICAvLyBpbml0IO2YuOy2nCDsl6zrtoBcbiAgICB0aGlzLmluaXRPbmNlKCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZCBBWDZVSUNhbGVuZGFyLmluaXRPbmNlXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqIG15Q2FsZW5kYXIuaW5pdE9uY2UoKTtcbiAgICogYGBgXG4gICAqL1xuICBpbml0T25jZSgpIHtcbiAgICBpZiAodGhpcy5pbml0aWFsaXplZCkgcmV0dXJuIHRoaXM7XG4gICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogT3V0cHV0cyB0byB0aGUgc2NyZWVuIGluIHRoZSBvdXRwdXQgbW9kZSBkZWZpbmVkIGluIHRoZSBDYWxlbmRhci4gSWYgeW91IHBhc3MgYW4gYXJndW1lbnQsIHlvdSBjYW4gY2hhbmdlIHRoZSBvdXRwdXQgbW9kZSBhbmQgb3V0cHV0IHJlZmVyZW5jZSBkYXRlLlxuICAgKiDsupjrprDrjZTsnZgg66qo65Oc66W8IOuzgOqyve2VqeuLiOuLpC5cbiAgICogQG1ldGhvZCBBWDZVSUNhbGVuZGFyLmNoYW5nZU1vZGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1vZGUgLSBkYXksIGQsIG1vbnRoLCBtICwgeWVhciwgeVxuICAgKiBAcGFyYW0geyhEYXRlfHN0cmluZyl9IFtjaGFuZ2VEYXRlXVxuICAgKiBAcmV0dXJuIHtBWDZVSUNhbGVuZGFyfVxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBqc1xuICAgKiBteUNhbGVuZGFyLmNoYW5nZU1vZGUoXCJ5XCIpO1xuICAgKiBteUNhbGVuZGFyLmNoYW5nZU1vZGUoXCJ5ZWFyXCIpO1xuICAgKiBteUNhbGVuZGFyLmNoYW5nZU1vZGUoXCJtb250aFwiKTtcbiAgICogbXlDYWxlbmRhci5jaGFuZ2VNb2RlKFwibVwiKTtcbiAgICogbXlDYWxlbmRhci5jaGFuZ2VNb2RlKFwiZGF5XCIpO1xuICAgKiBteUNhbGVuZGFyLmNoYW5nZU1vZGUoXCJkXCIpO1xuICAgKiBgYGBcbiAgICovXG4gIGNoYW5nZU1vZGUobW9kZSwgY2hhbmdlRGF0ZSkge1xuICAgIGlmICh0eXBlb2YgY2hhbmdlRGF0ZSAhPSBcInVuZGVmaW5lZFwiKSB0aGlzLmNvbmZpZy5kaXNwbGF5RGF0ZSA9IGNoYW5nZURhdGU7XG4gICAgaWYgKG1vZGUpIHRoaXMuY29uZmlnLm1vZGUgPSBtb2RlO1xuXG4gICAgdGhpcy4kW1wiYm9keVwiXVxuICAgICAgLnJlbW92ZUNsYXNzKFwiZmFkZWluXCIpXG4gICAgICAuYWRkQ2xhc3MoXCJmYWRlb3V0XCIpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5jb25maWcubW9kZSA9PSBcImRheVwiIHx8IHRoaXMuY29uZmlnLm1vZGUgPT0gXCJkXCIpIHtcbiAgICAgICAgcHJpbnREYXkuY2FsbCh0aGlzLCB0aGlzLmNvbmZpZy5kaXNwbGF5RGF0ZSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0aGlzLmNvbmZpZy5tb2RlID09IFwibW9udGhcIiB8fCB0aGlzLmNvbmZpZy5tb2RlID09IFwibVwiKSB7XG4gICAgICAgIHByaW50TW9udGguY2FsbCh0aGlzLCB0aGlzLmNvbmZpZy5kaXNwbGF5RGF0ZSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0aGlzLmNvbmZpZy5tb2RlID09IFwieWVhclwiIHx8IHRoaXMuY29uZmlnLm1vZGUgPT0gXCJ5XCIpIHtcbiAgICAgICAgcHJpbnRZZWFyLmNhbGwodGhpcywgdGhpcy5jb25maWcuZGlzcGxheURhdGUpO1xuICAgICAgfVxuICAgICAgdGhpcy4kW1wiYm9keVwiXS5yZW1vdmVDbGFzcyhcImZhZGVvdXRcIikuYWRkQ2xhc3MoXCJmYWRlaW5cIik7XG4gICAgfSwgdGhpcy5jb25maWcuYW5pbWF0ZVRpbWUpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQ2hhbmdlcyB0byBzdGF0ZSBhIGRhdGUgaXMgc2VsZWN0ZWQsIHdoaWNoIGlzIGluY2x1ZGVkIGluIHRoZSBzZWxlY3Rpb24uXG4gICAqIOy6mOumsOuNlOyXkCDtlbTri7nsnbzsnpDrpbwg7ISg7YOd65CcIOyDge2DnOuhnCDshKTsoJXtlanri4jri6QuXG4gICAqIEBtZXRob2QgQVg2VUlDYWxlbmRhci5zZXRTZWxlY3Rpb25cbiAgICogQHBhcmFtIHtBcnJheX0gc2VsZWN0aW9uXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzUHJpbnRdXG4gICAqIEByZXR1cm4ge0FYNlVJQ2FsZW5kYXJ9XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqIG15Q2FsZW5kYXIuc2V0U2VsZWN0aW9uKFtuZXcgRGF0ZSgpXSk7XG4gICAqIGBgYFxuICAgKi9cbiAgc2V0U2VsZWN0aW9uKHNlbGVjdGlvbiwgaXNQcmludCkge1xuICAgIHRoaXMuc2VsZWN0aW9uTWFwID0ge307XG4gICAgbGV0IHJlc3VsdCA9IHt9O1xuICAgIGNvbnN0IHByb2Nlc3NvciA9IHtcbiAgICAgICdhcnInOiBmdW5jdGlvbiAodiwgbWFwLCBjb3VudCkge1xuICAgICAgICBtYXAgPSB7fTtcbiAgICAgICAgaWYgKCFVLmlzQXJyYXkodikpIHJldHVybiBtYXA7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uID0gdiA9IHYuc3BsaWNlKDAsIGNvdW50KTtcbiAgICAgICAgdi5mb3JFYWNoKChuKSA9PiB7XG4gICAgICAgICAgaWYgKFUuaXNEYXRlKG4pKVxuICAgICAgICAgICAgbiA9IFUuZGF0ZShuLCB7J3JldHVybic6IHRoaXMuY29uZmlnLmRhdGVGb3JtYXR9KTtcbiAgICAgICAgICBtYXBbbl0gPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG1hcDtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5zZWxlY3RhYmxlQ291bnQgPSAodGhpcy5jb25maWcubXVsdGlwbGVTZWxlY3QpID8gKFUuaXNOdW1iZXIodGhpcy5jb25maWcubXVsdGlwbGVTZWxlY3QpKSA/IHRoaXMuY29uZmlnLm11bHRpcGxlU2VsZWN0IDogMiA6IDE7XG5cbiAgICBpZiAodGhpcy5jb25maWcuc2VsZWN0aW9uID0gc2VsZWN0aW9uKSB7XG4gICAgICBpZiAoVS5pc0FycmF5KHNlbGVjdGlvbikpIHtcbiAgICAgICAgcmVzdWx0ID0gcHJvY2Vzc29yLmFyci5jYWxsKHRoaXMsIHNlbGVjdGlvbiwge30sIHRoaXMuc2VsZWN0YWJsZUNvdW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuc2VsZWN0aW9uTWFwID0galF1ZXJ5LmV4dGVuZCh7fSwgcmVzdWx0KTtcbiAgICAvLyDrs4Dqsr3rgrTsmqkg7KCB7Jqp7ZWY7JesIOy2nOugpVxuXG4gICAgaWYgKGlzUHJpbnQgIT09IGZhbHNlKSBhcHBseVNlbGVjdGlvbk1hcC5jYWxsKHRoaXMpO1xuXG4gICAgcmVzdWx0ID0gbnVsbDtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIOy6mOumsOuNlOyXkOyEnCDshKDtg53rkJwg7J287J6Q66W8IOuwmO2ZmO2VqeuLiOuLpC5cbiAgICogQG1ldGhvZCBBWDZVSUNhbGVuZGFyLmdldFNlbGVjdGlvblxuICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICogQGV4YW1wbGVcbiAgICogYGBganNcbiAgICogbXlDYWxlbmRhci5nZXRTZWxlY3Rpb24oKTtcbiAgICogYGBgXG4gICAqL1xuICBnZXRTZWxlY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgZGF0ZSAvIHllYXIgLyBtb250aCB0aGF0IGNhbiBiZSBzZWxlY3RlZCBmcm9tIHRoZSBDYWxlbmRhci4gc2VsZWN0YWJsZSBpcywgQXJyYXkgYW5kIE9iamVjdCh7ZnJvbTogJycsIHRvOiAnJ30pIGlzIG1hZGUgdXAgb2YuXG4gICAqIOy6mOumsOuNlOyXkCDtlbTri7nsnbzsnpDrpbwg7ISg7YOd7ZWgIOyImCDsnojripQg7IOB7YOc66GcIOyEpOygle2VqeuLiOuLpC5cbiAgICogQG1ldGhvZCBBWDZVSUNhbGVuZGFyLnNldFNlbGVjdGFibGVcbiAgICogQHBhcmFtIHtBcnJheX0gc2VsZWN0YWJsZVxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtpc1ByaW50XVxuICAgKiBAcmV0dXJuIHtBWDZVSUNhbGVuZGFyfVxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBqc1xuICAgKiBteUNhbGVuZGFyLnNldFNlbGVjdGFibGUoWycyMDE2LTAxLTAxJywgLi4uXSk7XG4gICAqIG15Q2FsZW5kYXIuc2V0U2VsZWN0YWJsZShbbmV3IERhdGUoKSwgLi4uXSk7XG4gICAqIG15Q2FsZW5kYXIuc2V0U2VsZWN0YWJsZSh7IHJhbmdlOiBbe2Zyb206ICcyMDE2LTAxLTAxJywgdG86ICcyMDE2LTAxLTEwJ31dIH0pO1xuICAgKiBteUNhbGVuZGFyLnNldFNlbGVjdGFibGUoeyByYW5nZTogW3tmcm9tOiBuZXcgRGF0ZSgpLCB0bzogbmV3IERhdGUoKX1dIH0pO1xuICAgKiBteUNhbGVuZGFyLnNldFNlbGVjdGFibGUoeyAnMjAxNi0wMS0wMSc6IHRydWUsICcyMDE2LTAxLTAyJzogdHJ1ZSB9KTtcbiAgICogYGBgXG4gICAqL1xuICBzZXRTZWxlY3RhYmxlKHNlbGVjdGFibGUsIGlzUHJpbnQpIHtcbiAgICB0aGlzLnNlbGVjdGFibGVNYXAgPSB7fTtcbiAgICBsZXQga2V5LCByZXN1bHQgPSB7fTtcbiAgICBjb25zdCBwcm9jZXNzb3IgPSB7XG4gICAgICAnYXJyJzogZnVuY3Rpb24gKHYsIG1hcCkge1xuICAgICAgICBtYXAgPSB7fTtcbiAgICAgICAgaWYgKCFVLmlzQXJyYXkodikpIHJldHVybiBtYXA7XG4gICAgICAgIHYuZm9yRWFjaCgobikgPT4ge1xuICAgICAgICAgIGlmIChVLmlzRGF0ZShuKSkgbiA9IFUuZGF0ZShuLCB7J3JldHVybic6IHRoaXMuY29uZmlnLmRhdGVGb3JtYXR9KTtcbiAgICAgICAgICBtYXBbbl0gPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG1hcDtcbiAgICAgIH0sXG4gICAgICAnb2JqJzogZnVuY3Rpb24gKHYsIG1hcCkge1xuICAgICAgICBtYXAgPSB7fTtcbiAgICAgICAgaWYgKFUuaXNBcnJheSh2KSkgcmV0dXJuIG1hcDtcbiAgICAgICAgaWYgKHYucmFuZ2UpIHJldHVybiBtYXA7XG4gICAgICAgIGZvciAobGV0IGsgaW4gdikge1xuICAgICAgICAgIG1hcFtrXSA9IHZba107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hcDtcbiAgICAgIH0sXG4gICAgICAncmFuZ2UnOiBmdW5jdGlvbiAodiwgbWFwKSB7XG4gICAgICAgIG1hcCA9IHt9O1xuICAgICAgICBpZiAoVS5pc0FycmF5KHYpKSByZXR1cm4gbWFwO1xuICAgICAgICBpZiAoIXYucmFuZ2UpIHJldHVybiBtYXA7XG5cbiAgICAgICAgdi5yYW5nZS5mb3JFYWNoKChuKSA9PiB7XG4gICAgICAgICAgaWYgKFUuaXNEYXRlRm9ybWF0KG4uZnJvbSkgJiYgVS5pc0RhdGVGb3JtYXQobi50bykpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGQgPSBVLmRhdGUobi5mcm9tKTsgZCA8PSBVLmRhdGUobi50byk7IGQuc2V0RGF0ZShkLmdldERhdGUoKSArIDEpKSB7XG4gICAgICAgICAgICAgIG1hcFtVLmRhdGUoZCwge1wicmV0dXJuXCI6IHRoaXMuY29uZmlnLmRhdGVGb3JtYXR9KV0gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBuLmZyb207IGkgPD0gbi50bzsgaSsrKSB7XG4gICAgICAgICAgICAgIG1hcFtpXSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gbWFwO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAodGhpcy5jb25maWcuc2VsZWN0YWJsZSA9IHNlbGVjdGFibGUpIHtcbiAgICAgIGlmIChVLmlzQXJyYXkoc2VsZWN0YWJsZSkpIHtcbiAgICAgICAgcmVzdWx0ID0gcHJvY2Vzc29yLmFyci5jYWxsKHRoaXMsIHNlbGVjdGFibGUpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGZvciAoa2V5IGluIHByb2Nlc3Nvcikge1xuICAgICAgICAgIGlmIChzZWxlY3RhYmxlW2tleV0pIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHByb2Nlc3NvcltrZXldLmNhbGwodGhpcywgc2VsZWN0YWJsZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKHJlc3VsdCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmVzdWx0ID0gcHJvY2Vzc29yLm9iai5jYWxsKHRoaXMsIHNlbGVjdGFibGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5zZWxlY3RhYmxlTWFwID0gcmVzdWx0O1xuICAgIC8vIOuzgOqyveuCtOyaqSDsoIHsmqntlZjsl6wg7Lac66ClXG4gICAgaWYgKGlzUHJpbnQgIT09IGZhbHNlKSB0aGlzLmNoYW5nZU1vZGUoKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIOy6mOumsOuNlOyXkCDtnLTsnbzsnYQg7ZGc7Iuc7ZWp64uI64ukLlxuICAgKiBAbWV0aG9kIEFYNlVJQ2FsZW5kYXIubWFya2VyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBtYXJrZXJcbiAgICogQHBhcmFtIHtib29sZWFufSBbaXNBcHBseV1cbiAgICogQHJldHVybiB7QVg2VUlDYWxlbmRhcn1cbiAgICogQGV4YW1wbGVcbiAgICogYGBganNcbiAgICogbXlDYWxlbmRhci5zZXRNYXJrZXIoe1xuICAgICAqICcyMDE2LTAyLTA3Jzoge3RoZW1lOiAnaG9saWRheScsIGxhYmVsOiAn7ISk64KgJ30sXG4gICAgICogJzIwMTYtMDItMDgnOiB7dGhlbWU6ICdob2xpZGF5JywgbGFiZWw6ICfshKTrgqAnfSxcbiAgICAgKiAnMjAxNi0wMi0wOSc6IHt0aGVtZTogJ2hvbGlkYXknLCBsYWJlbDogJ+yEpOuCoCd9LFxuICAgICAqICcyMDE2LTAyLTEwJzoge3RoZW1lOiAnaG9saWRheScsIGxhYmVsOiAn64yA7LK07Zy07J28J31cbiAgICAgKiAgfSk7XG4gICAqIGBgYFxuICAgKi9cbiAgc2V0TWFya2VyKG1hcmtlciwgaXNBcHBseSkge1xuICAgIHRoaXMubWFya2VyTWFwID0ge307XG4gICAgbGV0IGtleSwgcmVzdWx0ID0ge307XG4gICAgY29uc3QgcHJvY2Vzc29yID0ge1xuICAgICAgJ29iaic6IGZ1bmN0aW9uICh2LCBtYXApIHtcbiAgICAgICAgbWFwID0ge307XG4gICAgICAgIGlmIChVLmlzQXJyYXkodikpIHJldHVybiBtYXA7XG4gICAgICAgIGlmICh2LnJhbmdlKSByZXR1cm4gbWFwO1xuICAgICAgICBmb3IgKGxldCBrIGluIHYpIHtcbiAgICAgICAgICBtYXBba10gPSB2W2tdO1xuICAgICAgICB9XG5cbiAgICAgICAgdiA9IG51bGw7XG4gICAgICAgIHJldHVybiBtYXA7XG4gICAgICB9LFxuICAgICAgJ3JhbmdlJzogZnVuY3Rpb24gKHYsIG1hcCkge1xuICAgICAgICBtYXAgPSB7fTtcbiAgICAgICAgaWYgKFUuaXNBcnJheSh2KSkgcmV0dXJuIG1hcDtcbiAgICAgICAgaWYgKCF2LnJhbmdlKSByZXR1cm4gbWFwO1xuXG4gICAgICAgIHYucmFuZ2UuZm9yRWFjaCgobikgPT4ge1xuICAgICAgICAgIGlmIChVLmlzRGF0ZUZvcm1hdChuLmZyb20pICYmIFUuaXNEYXRlRm9ybWF0KG4udG8pKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBkID0gVS5kYXRlKG4uZnJvbSk7IGQgPD0gVS5kYXRlKG4udG8pOyBkLnNldERhdGUoZC5nZXREYXRlKCkgKyAxKSkge1xuICAgICAgICAgICAgICBtYXBbVS5kYXRlKGQsIHtcInJldHVyblwiOiB0aGlzLmNvbmZpZy5kYXRlRm9ybWF0fSldID0ge3RoZW1lOiBuLnRoZW1lLCBsYWJlbDogbi5sYWJlbH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IG4uZnJvbTsgaSA8PSBuLnRvOyBpKyspIHtcbiAgICAgICAgICAgICAgbWFwW2ldID0ge3RoZW1lOiBuLnRoZW1lLCBsYWJlbDogbi5sYWJlbH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB2ID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIG1hcDtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuY29uZmlnLm1hcmtlciA9IG1hcmtlcikge1xuICAgICAgZm9yIChrZXkgaW4gcHJvY2Vzc29yKSB7XG4gICAgICAgIGlmIChtYXJrZXJba2V5XSkge1xuICAgICAgICAgIHJlc3VsdCA9IHByb2Nlc3NvcltrZXldLmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKE9iamVjdC5rZXlzKHJlc3VsdCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJlc3VsdCA9IHByb2Nlc3Nvci5vYmouY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMubWFya2VyTWFwID0gcmVzdWx0O1xuICAgIC8vIOuzgOqyveuCtOyaqSDsoIHsmqntlZjsl6wg7Lac66ClXG4gICAgaWYgKGlzQXBwbHkgIT09IGZhbHNlKSBhcHBseU1hcmtlck1hcC5jYWxsKHRoaXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgQVg2VUlDYWxlbmRhci5zZXRQZXJpb2RcbiAgICogQHBhcmFtIHtPYmplY3R9IHBlcmlvZFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0FwcGx5XVxuICAgKiBAcmV0dXJuIHtBWDZVSUNhbGVuZGFyfVxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBqc1xuICAgKiBteUNhbGVuZGFyLnNldFBlcmlvZCh7XG4gICAgICogIHJhbmdlOiBbXG4gICAgICogICAgICB7ZnJvbTogJzIwMTYtMDctMDUnLCB0bzogJzIwMTYtMDctMDknLCBmcm9tTGFiZWw6ICfsi5zsnpEnLCB0b0xhYmVsOiAn7KKF66OMJ30sXG4gICAgICogICAgICB7ZnJvbTogJzIwMTYtMDctMTEnLCB0bzogJzIwMTYtMDctMTUnLCBmcm9tTGFiZWw6ICfsi5zsnpEnLCB0b0xhYmVsOiAn7KKF66OMJ31cbiAgICAgKiAgXVxuICAgICAqIH0pO1xuICAgKiBgYGBcbiAgICovXG4gIHNldFBlcmlvZChwZXJpb2QsIGlzQXBwbHkpIHtcbiAgICBsZXQga2V5LCByZXN1bHQgPSB7fTtcbiAgICBjb25zdCBwcm9jZXNzb3IgPSB7XG4gICAgICAncmFuZ2UnOiBmdW5jdGlvbiAodiwgbWFwKSB7XG4gICAgICAgIG1hcCA9IHt9O1xuICAgICAgICBpZiAoVS5pc0FycmF5KHYpKSByZXR1cm4gbWFwO1xuICAgICAgICBpZiAoIXYucmFuZ2UpIHJldHVybiBtYXA7XG5cbiAgICAgICAgdi5yYW5nZS5mb3JFYWNoKChuKSA9PiB7XG4gICAgICAgICAgaWYgKFUuaXNEYXRlRm9ybWF0KG4uZnJvbSkgJiYgVS5pc0RhdGVGb3JtYXQobi50bykpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGQgPSBuZXcgRGF0ZShVLmRhdGUobi5mcm9tKSk7IGQgPD0gVS5kYXRlKG4udG8pOyBkLnNldERhdGUoZC5nZXREYXRlKCkgKyAxKSkge1xuICAgICAgICAgICAgICBpZiAoZC5nZXRUaW1lKCkgPT0gVS5kYXRlKG4uZnJvbSkuZ2V0VGltZSgpKSB7XG4gICAgICAgICAgICAgICAgbWFwW1UuZGF0ZShkLCB7XCJyZXR1cm5cIjogdGhpcy5jb25maWcuZGF0ZUZvcm1hdH0pXSA9IHtcbiAgICAgICAgICAgICAgICAgIHRoZW1lOiBuLnRoZW1lIHx8IHRoaXMuY29uZmlnLmRlZmF1bHRQZXJpb2RUaGVtZSxcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiBuLmZyb21MYWJlbFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoZC5nZXRUaW1lKCkgPT0gVS5kYXRlKG4udG8pLmdldFRpbWUoKSkge1xuICAgICAgICAgICAgICAgIG1hcFtVLmRhdGUoZCwge1wicmV0dXJuXCI6IHRoaXMuY29uZmlnLmRhdGVGb3JtYXR9KV0gPSB7XG4gICAgICAgICAgICAgICAgICB0aGVtZTogbi50aGVtZSB8fCB0aGlzLmNvbmZpZy5kZWZhdWx0UGVyaW9kVGhlbWUsXG4gICAgICAgICAgICAgICAgICBsYWJlbDogbi50b0xhYmVsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtYXBbVS5kYXRlKGQsIHtcInJldHVyblwiOiB0aGlzLmNvbmZpZy5kYXRlRm9ybWF0fSldID0ge3RoZW1lOiBuLnRoZW1lIHx8IHRoaXMuY29uZmlnLmRlZmF1bHRQZXJpb2RUaGVtZX07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHYgPSBudWxsO1xuICAgICAgICByZXR1cm4gbWFwO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyDrs4Dqsr3rgrTsmqkg7KCB7Jqp7ZWY7JesIOy2nOugpVxuICAgIGlmIChpc0FwcGx5ICE9PSBmYWxzZSkge1xuICAgICAgY2xlYXJQZXJpb2RNYXAuY2FsbCh0aGlzKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb25maWcucGVyaW9kID0gcGVyaW9kKSB7XG4gICAgICByZXN1bHQgPSBwcm9jZXNzb3IucmFuZ2UuY2FsbCh0aGlzLCBwZXJpb2QpO1xuICAgIH1cblxuICAgIHRoaXMucGVyaW9kTWFwID0gcmVzdWx0O1xuXG4gICAgLy8g67OA6rK964K07JqpIOyggeyaqe2VmOyXrCDstpzroKVcbiAgICBpZiAoaXNBcHBseSAhPT0gZmFsc2UpIHtcbiAgICAgIGFwcGx5UGVyaW9kTWFwLmNhbGwodGhpcyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFYNlVJQ2FsZW5kYXI7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL3NyYy9BWDZVSUNhbGVuZGFyLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==