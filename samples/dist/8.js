webpackJsonp([8],{

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jqmin = __webpack_require__(6);

var _jqmin2 = _interopRequireDefault(_jqmin);

var _AX6Util = __webpack_require__(4);

var _AX6Util2 = _interopRequireDefault(_AX6Util);

var _AX6UIMenu = __webpack_require__(78);

var _AX6UIMenu2 = _interopRequireDefault(_AX6UIMenu);

__webpack_require__(79);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var html = "\n<div id=\"attachedMenu-target\"\n     style=\"width:100%;height:36px;background: #cccccc;border-bottom:1px solid #000;padding: 0px 20px;\"></div>\n\n<div style=\"background: #eee;height: 1000px;\"></div>\n";
var fn = {
  moduleRun: function moduleRun($body) {

    var menu = new _AX6UIMenu2.default({
      // width: 200,
      iconWidth: 20,
      acceleratorWidth: 100,
      // offset: {left: 10, top: 10},
      itemClickAndClose: false,
      //position: "absolute",
      icons: {
        'arrow': '<i class="tiny material-icons">chevron_right</i>'
      },
      columnKeys: {
        label: 'name',
        items: 'chidren'
      },
      items: [{
        icon: '<i class="tiny material-icons">class</i>',
        name: "Menu Parent 0",
        chidren: [{
          check: {
            type: 'checkbox',
            name: 'A',
            value: '0',
            checked: false
          },
          name: "Menu Z",
          data: {},
          role: "",
          accelerator: "CmdOrCtrl+Z"
        }, {
          check: {
            type: 'checkbox',
            name: 'A',
            value: '1',
            checked: true
          },
          name: "Menu A",
          data: {},
          role: ""
          //accelerator: "CmdOrCtrl+A"
        }],
        filterType: "A"
      }, {
        divide: true,
        filterType: "A"
      }, {
        icon: '<i class="tiny material-icons">class</i>',
        name: "Menu Parent 1",
        chidren: [{
          name: "Menu Z",
          data: {},
          role: "",
          //accelerator: "CmdOrCtrl+Z",
          chidren: [{
            name: "Menu Z",
            data: {},
            role: ""
            //accelerator: "CmdOrCtrl+Z"
          }, {
            name: "Menu A",
            data: {},
            role: ""
            //accelerator: "CmdOrCtrl+A"
          }]
        }, {
          name: "Menu A",
          data: {},
          role: ""
          //accelerator: "CmdOrCtrl+A"
        }],
        filterType: "A"
      }, {
        check: {
          type: 'radio',
          name: 'radioName',
          value: '1',
          checked: false
        },
        icon: '<i class="tiny material-icons">class</i>',
        name: "Menu Parent 2"
      }, {
        check: {
          type: 'radio',
          name: 'radioName',
          value: '2',
          checked: false
        },
        name: "Menu Parent 3"
      }, {
        check: {
          type: 'radio',
          name: 'radioName',
          value: '3',
          checked: false
        },
        name: "Menu Parent 4"
      }, { divide: true }, {
        html: function html() {
          // console.log(this);
          return '<div style="text-align: center;">' + '<button class="btn btn-primary" data-menu-btn="OK">OK</button> ' + '<button class="btn btn-danger" data-menu-btn="CANCEL">CANCEL</button>' + '</div>';
        }
      }]
    });

    menu.onStateChanged = function () {
      if (this.state == 'close') {
        //console.log(this.self.getCheckValue());
      }
    };
    menu.onClick = function () {
      // console.log(this);
    };

    menu.onLoad = function () {
      if (!this.element) return this;
      (0, _jqmin2.default)(this.element).on("click", '[data-menu-btn]', function () {
        var act = this.getAttribute("data-menu-btn");
        if (act == 'OK') {
          console.log(menu.getCheckValue());
        }
        menu.close();
      });
    };

    (0, _jqmin2.default)(document.body).on("contextmenu", function (e) {
      menu.popup(e, {
        filter: function filter() {
          return true;
        }
      });

      _AX6Util2.default.stopEvent(e.originalEvent);
    });

    var attachedMenu = new _AX6UIMenu2.default({
      direction: "top",
      offset: { left: 0, top: 1 },
      position: "absolute",
      icons: {
        'arrow': '<i class="tiny material-icons">chevron_right</i>'
      },
      onStateChanged: function onStateChanged() {
        console.log(this);
      },
      onClick: function onClick() {
        console.log(this);
      },
      columnKeys: {
        label: 'name',
        items: 'chidren'
      },
      items: [{
        icon: '<i class="tiny material-icons">class</i>',
        name: "Menu Parent 0",
        chidren: []
      }, {
        icon: '<i class="tiny material-icons">cloud_queue</i>',
        name: "Menu Parent 1",
        chidren: [{
          name: "Menu Z",
          data: {},
          role: "",
          //accelerator: "CmdOrCtrl+Z",
          chidren: [{
            name: "Menu Z",
            data: {},
            role: ""
            //accelerator: "CmdOrCtrl+Z"
          }, {
            name: "Menu A",
            data: {},
            role: ""
            //accelerator: "CmdOrCtrl+A"
          }]
        }, {
          name: "Menu A",
          data: {},
          role: ""
          //accelerator: "CmdOrCtrl+A"
        }]
      }]
    }).attach((0, _jqmin2.default)('#attachedMenu-target'));
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

/***/ 78:
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

var tmpl = {
  menu: function menu(columnKeys) {
    return "\n        <div data-ax6ui-menu=\"\" class=\"{{theme}}\" {{#width}}style=\"width:{{width}}px;\"{{/width}}>\n            <div class=\"ax-menu-body\">\n                {{#" + columnKeys.items + "}}\n                    {{^@isMenu}}\n                        {{#divide}}\n                        <div class=\"ax-menu-item-divide\" data-menu-item-index=\"{{@i}}\"></div>\n                        {{/divide}}\n                        {{#html}}\n                        <div class=\"ax-menu-item-html\" data-menu-item-index=\"{{@i}}\">{{{@html}}}</div>\n                        {{/html}}\n                    {{/@isMenu}}\n                    {{#@isMenu}}\n                    <div class=\"ax-menu-item\" data-menu-item-depth=\"{{@depth}}\" data-menu-item-index=\"{{@i}}\" data-menu-item-path=\"{{@path}}.{{@i}}\">\n                        <span class=\"ax-menu-item-cell ax-menu-item-checkbox\">\n                            {{#check}}\n                            <span class=\"item-checkbox-wrap useCheckBox\" {{#checked}}data-item-checked=\"true\"{{/checked}}></span>\n                            {{/check}}\n                            {{^check}}\n                            <span class=\"item-checkbox-wrap\"></span>\n                            {{/check}}\n                        </span>\n                        {{#icon}}\n                        <span class=\"ax-menu-item-cell ax-menu-item-icon\" style=\"width:{{cfg.iconWidth}}px;\">{{{.}}}</span>\n                        {{/icon}}\n                        <span class=\"ax-menu-item-cell ax-menu-item-label\">{{{" + columnKeys.label + "}}}</span>\n                        {{#accelerator}}\n                        <span class=\"ax-menu-item-cell ax-menu-item-accelerator\" style=\"width:{{cfg.acceleratorWidth}}px;\"><span class=\"item-wrap\">{{.}}</span></span>\n                        {{/accelerator}}\n                        {{#@hasChild}}\n                        <span class=\"ax-menu-item-cell ax-menu-item-handle\">{{{cfg.icons.arrow}}}</span>\n                        {{/@hasChild}}\n                    </div>\n                    {{/@isMenu}}\n\n                {{/" + columnKeys.items + "}}\n            </div>\n            <div class=\"ax-menu-arrow\"></div>\n        </div>\n        ";
  },
  menubar: function menubar(columnKeys) {
    return "\n        <div data-ax6ui-menubar=\"\" class=\"{{theme}}\">\n            <div class=\"ax-menu-body\">\n                {{#" + columnKeys.items + "}}\n                    {{^@isMenu}}\n                        {{#divide}}\n                        <div class=\"ax-menu-item-divide\" data-menu-item-index=\"{{@i}}\"></div>\n                        {{/divide}}\n                        {{#html}}\n                        <div class=\"ax-menu-item-html\" data-menu-item-index=\"{{@i}}\">{{{@html}}}</div>\n                        {{/html}}\n                    {{/@isMenu}}\n                    {{#@isMenu}}\n                    <div class=\"ax-menu-item\" data-menu-item-index=\"{{@i}}\">\n                        {{#icon}}\n                        <span class=\"ax-menu-item-cell ax-menu-item-icon\" style=\"width:{{cfg.iconWidth}}px;\">{{{.}}}</span>\n                        {{/icon}}\n                        <span class=\"ax-menu-item-cell ax-menu-item-label\">{{{" + columnKeys.label + "}}}</span>\n                    </div>\n                    {{/@isMenu}}\n                {{/" + columnKeys.items + "}}\n            </div>\n        </div>\n        ";
  }
};

var appEventAttach = function appEventAttach(active, opt) {
  if (active) {
    (0, _jqmin2.default)(document.body).off("click.ax5menu-" + this.instanceId).on("click.ax5menu-" + this.instanceId, clickItem.bind(this, opt));

    (0, _jqmin2.default)(window).off("keydown.ax5menu-" + this.instanceId).on("keydown.ax5menu-" + this.instanceId, function (e) {
      if (e.which == _AX6Info2.default.eventKeys.ESC) {
        self.close();
      }
    }).off("resize.ax5menu-" + this.instanceId).on("resize.ax5menu-" + this.instanceId, function (e) {
      self.close();
    });
  } else {
    (0, _jqmin2.default)(document.body).off("click.ax5menu-" + this.instanceId);
    (0, _jqmin2.default)(window).off("keydown.ax5menu-" + this.instanceId);
    (0, _jqmin2.default)(window).off("resize.ax5menu-" + this.instanceId);
  }
};
var onStateChanged = function onStateChanged(opts, that) {
  if (opts && opts.onStateChanged) {
    opts.onStateChanged.call(that, that);
  } else if (this.onStateChanged) {
    this.onStateChanged.call(that, that);
  }

  this.state = that.state;
  opts = null;
  that = null;
  return true;
};
var onLoad = function onLoad(that) {
  if (this.onLoad) {
    this.onLoad.call(that, that);
  }

  that = null;
  return true;
};
var _popup = function _popup(opt, items, depth, path) {
  var self = this,
      cfg = this.config;
  var data = opt,
      $activeMenu = void 0,
      removed = void 0;

  data.theme = opt.theme || cfg.theme;
  data.cfg = {
    icons: _jqmin2.default.extend({}, cfg.icons),
    iconWidth: opt.iconWidth || cfg.iconWidth,
    acceleratorWidth: opt.acceleratorWidth || cfg.acceleratorWidth
  };

  items.forEach(function (n) {
    if (n.html || n.divide) {
      n['@isMenu'] = false;
      if (n.html) {
        n['@html'] = n.html.call({
          item: n,
          config: cfg,
          opt: opt
        });
      }
    } else {
      n['@isMenu'] = true;
    }
  });

  data[cfg.columnKeys.items] = items;
  data['@depth'] = depth;
  data['@path'] = path || "root";
  data['@hasChild'] = function () {
    return this[cfg.columnKeys.items] && this[cfg.columnKeys.items].length > 0;
  };
  $activeMenu = (0, _jqmin2.default)(_AX6Mustache2.default.render(tmpl.menu.call(this, cfg.columnKeys), data));
  (0, _jqmin2.default)(document.body).append($activeMenu);

  // remove queue
  removed = this.queue.splice(depth);
  removed.forEach(function (n) {
    n.$target.remove();
  });

  this.queue.push({
    '$target': $activeMenu,
    'data': _jqmin2.default.extend({}, data)
  });

  $activeMenu.on('mouseover', '[data-menu-item-index]', function () {
    var depth = this.getAttribute("data-menu-item-depth"),
        index = this.getAttribute("data-menu-item-index"),
        path = this.getAttribute("data-menu-item-path"),
        $this = void 0,
        offset = void 0,
        scrollTop = void 0,
        childOpt = void 0,
        _items = void 0,
        _activeMenu = void 0;

    if (depth != null && typeof depth != "undefined") {
      _items = self.queue[depth].data[cfg.columnKeys.items][index][cfg.columnKeys.items];
      _activeMenu = self.queue[depth].$target;
      _activeMenu.find('[data-menu-item-index]').removeClass("hover");
      (0, _jqmin2.default)(this).addClass("hover");

      if (_activeMenu.attr("data-selected-menu-item-index") != index) {
        _activeMenu.attr("data-selected-menu-item-index", index);

        if (_items && _items.length > 0) {

          $this = (0, _jqmin2.default)(this);
          offset = $this.offset();
          scrollTop = cfg.position == "fixed" ? (0, _jqmin2.default)(document).scrollTop() : 0;
          childOpt = {
            '@parent': {
              left: offset.left,
              top: offset.top,
              width: $this.outerWidth(),
              height: $this.outerHeight()
            },
            left: offset.left + $this.outerWidth() - cfg.menuBodyPadding,
            top: offset.top - cfg.menuBodyPadding - 1 - scrollTop
          };

          childOpt = _jqmin2.default.extend(true, opt, childOpt);
          _popup.call(self, childOpt, _items, Number(depth) + 1, path);
        } else {
          self.queue.splice(Number(depth) + 1).forEach(function (n) {
            n.$target.remove();
          });
        }
      }
    }

    depth = null;
    index = null;
    path = null;
    $this = null;
    offset = null;
    scrollTop = null;
    childOpt = null;
    _items = null;
    _activeMenu = null;
  });

  // mouse out
  $activeMenu.on('mouseout', '[data-menu-item-index]', function () {
    var depth = this.getAttribute("data-menu-item-depth"),
        index = this.getAttribute("data-menu-item-index"),
        path = this.getAttribute("data-menu-item-path"),
        _items = void 0;

    if (path) {
      _items = self.queue[depth].data[cfg.columnKeys.items][index][cfg.columnKeys.items];
    }
    if (_items && _items.length > 0) {} else {
      (0, _jqmin2.default)(this).removeClass("hover");
    }
  });

  // is Root
  if (depth == 0) {
    if (data.direction) $activeMenu.addClass("direction-" + data.direction);
    onStateChanged.call(this, null, {
      self: this,
      items: items,
      parent: function (path) {
        if (!path) return false;
        try {
          return Function("", "return this.config.items[" + path.substring(5).replace(/\./g, '].items[') + "];").call(self);
        } catch (e) {}
      }(data['@path']),
      state: "popup"
    });
  }

  align.call(this, $activeMenu, data);
  onLoad.call(this, {
    self: this,
    items: items,
    element: $activeMenu.get(0)
  });

  data = null;
  $activeMenu = null;
  removed = null;
  opt = null;
  items = null;
  depth = null;
  path = null;

  return this;
};
var clickItem = function clickItem(opt, e) {
  var self = this,
      cfg = this.config;
  var target = void 0,
      item = void 0;

  target = _AX6Util2.default.findParentNode(e.target, function (target) {
    if (target.getAttribute("data-menu-item-index")) {
      return true;
    }
  });
  if (target) {
    if (typeof opt === "undefined") opt = {};
    item = function (path) {
      if (!path) return false;
      try {
        return Function("", "return this[" + path.substring(5).replace(/\./g, '].' + cfg.columnKeys.items + '[') + "];").call(opt.items || cfg.items);
      } catch (e) {
        console.log(_AX6Info2.default.getError("ax5menu", "501", "menuItemClick"));
      } finally {
        item = null;
      }
    }(target.getAttribute("data-menu-item-path"));

    if (!item) return this;

    if (item.check) {
      (function (items) {
        var setValue = {
          'checkbox': function checkbox(value) {
            this.checked = !value;
          },
          'radio': function radio(value) {
            var name = this.name;
            items.forEach(function (n) {
              if (n.check && n.check.type === 'radio' && n.check.name == name) {
                n.check.checked = false;
              }
            });
            this.checked = !value;
          }
        };
        if (setValue[this.type]) setValue[this.type].call(this, this.checked);
        setValue = null;
      }).call(item.check, cfg.items);

      if (!cfg.itemClickAndClose) {
        self.queue.forEach(function (n) {
          n.$target.find('[data-menu-item-index]').each(function () {
            var item = n.data[cfg.columnKeys.items][this.getAttribute("data-menu-item-index")];
            if (item.check) {
              (0, _jqmin2.default)(this).find(".item-checkbox-wrap").attr("data-item-checked", item.check.checked);
            }
            item = null;
          });
        });
      }
    }

    if (self.onClick) {
      if (self.onClick.call(item, item, opt.param)) {
        self.close();
      }
    }
    if ((!item[cfg.columnKeys.items] || item[cfg.columnKeys.items].length == 0) && cfg.itemClickAndClose) self.close();
  } else {
    self.close();
  }

  target = null;
  item = null;
  return this;
};
var align = function align($activeMenu, data) {
  var self = this,
      cfg = this.config;
  var $window = (0, _jqmin2.default)(window),
      $document = (0, _jqmin2.default)(document),
      wh = cfg.position == "fixed" ? $window.height() : $document.height(),
      ww = $window.width(),
      h = $activeMenu.outerHeight(),
      w = $activeMenu.outerWidth(),
      l = data.left,
      t = data.top,
      position = cfg.position || "fixed";

  if (l + w > ww) {
    if (data['@parent']) {
      l = data['@parent'].left - w + cfg.menuBodyPadding;
    } else {
      l = ww - w;
    }
  }

  if (t + h > wh) {
    t = wh - h;
  }

  $activeMenu.css({ left: l, top: t, position: position });

  $activeMenu = null;
  data = null;
  $window = null;
  $document = null;
  wh = null;
  ww = null;
  h = null;
  w = null;
  l = null;
  t = null;
  position = null;
  return this;
};
/* ~~~~~~~~~~~~~~~~~~ end of private  ~~~~~~~~~~~~~~~~~~~~ */

/**
 * @class
 */

var AX6UIMenu = function (_AX6UICore) {
  _inherits(AX6UIMenu, _AX6UICore);

  /**
   * @constructor
   * @param config
   */
  function AX6UIMenu(config) {
    _classCallCheck(this, AX6UIMenu);

    /**
     * @member {JSON}
     * @param config
     * @param [config.theme]
     * @param [config.iconWidth=22]
     * @param [config.acceleratorWidth=100]
     * @param [config.menuBodyPadding=5]
     * @param [config.offset]
     * @param [config.offset.left=0]
     * @param [config.offset.top=0]
     * @param [config.position="fixed"]
     * @param [config.animateTime=250]
     * @param [config.items]
     * @param [config.itemClickAndClose=true]
     * @param [config.columnKeys]
     * @param [config.columnKeys.label='label']
     * @param [config.columnKeys.items='items']
     * @param [config.onStateChanged]
     * @param [config.onClick]
     * @param [config.onLoad]
     *
     */
    var _this = _possibleConstructorReturn(this, (AX6UIMenu.__proto__ || Object.getPrototypeOf(AX6UIMenu)).call(this));

    _this.config = {
      theme: "default",
      iconWidth: 22,
      acceleratorWidth: 100,
      menuBodyPadding: 5,
      offset: { left: 0, top: 0 },
      position: "fixed",
      animateTime: 250,
      items: [],
      itemClickAndClose: true,
      columnKeys: {
        label: 'label',
        items: 'items'
      }
    };
    _jqmin2.default.extend(true, _this.config, config);

    // 멤버 변수 초기화
    /**
     * @member
     */
    _this.openTimer = null;
    /**
     * @member
     */
    _this.closeTimer = null;
    /**
     * @member {Array}
     */
    _this.queue = [];
    /**
     * @member {Object}
     */
    _this.menuBar = {};
    /**
     * @member
     */
    _this.state = undefined;

    if (typeof config !== "undefined") _this.init();
    return _this;
  }

  /**
   * @method
   */


  _createClass(AX6UIMenu, [{
    key: "init",
    value: function init() {
      this.onStateChanged = this.config.onStateChanged;
      delete this.config.onStateChanged;
      this.onClick = this.config.onClick;
      delete this.config.onClick;
      this.onLoad = this.config.onLoad;
      delete this.config.onLoad;

      onStateChanged.call(this, null, {
        self: this,
        state: "init"
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
     * @param {Event|Object} e - Event or Object
     * @param {Object} [opt]
     * @param {String} [opt.theme]
     * @param {Function} [opt.filter]
     * @returns {AX6UIMenu}
     */

  }, {
    key: "popup",
    value: function popup(e, opt) {
      var self = this,
          cfg = this.config;
      var getOption = {
        'event': function event(e, opt) {
          e = {
            left: e.clientX,
            top: cfg.position == "fixed" ? e.clientY : e.pageY,
            width: cfg.width,
            theme: cfg.theme
          };

          e.left -= 5;
          e.top -= 5;

          if (cfg.offset) {
            if (cfg.offset.left) e.left += cfg.offset.left;
            if (cfg.offset.top) e.top += cfg.offset.top;
          }
          opt = _jqmin2.default.extend(true, e, opt);

          try {
            return opt;
          } finally {
            e = null;
            //opt = null;
          }
        },
        'object': function object(e, opt) {
          e = {
            left: e.left,
            top: e.top,
            width: e.width || cfg.width,
            theme: e.theme || cfg.theme
          };

          if (cfg.offset) {
            if (cfg.offset.left) e.left += cfg.offset.left;
            if (cfg.offset.top) e.top += cfg.offset.top;
          }

          opt = _jqmin2.default.extend(true, e, opt);

          try {
            return opt;
          } finally {
            e = null;
            //opt = null;
          }
        }
      },
          updateTheme = function updateTheme(theme) {
        if (theme) cfg.theme = theme;
      };

      if (!e) return this;
      opt = getOption[typeof e.clientX == "undefined" ? "object" : "event"].call(this, e, opt);
      updateTheme(opt.theme);

      var items = [].concat(cfg.items),
          _filteringItem = void 0;
      opt.items = items;

      if (opt.filter) {
        _filteringItem = function filteringItem(_items) {
          var arr = [];
          _items.forEach(function (n) {
            if (n.items && n.items.length > 0) {
              n.items = _filteringItem(n.items);
            }
            if (opt.filter.call(n)) {
              arr.push(n);
            }
          });
          return arr;
        };
        opt.items = items = _filteringItem(items);
      }

      if (items.length) {
        appEventAttach.call(this, false);
        _popup.call(this, opt, items, 0); // 0 is seq of queue

        if (this.popupEventAttachTimer) clearTimeout(this.popupEventAttachTimer);
        this.popupEventAttachTimer = setTimeout(function () {
          appEventAttach.call(this, true, opt); // 이벤트 연결
        }.bind(this), 500);
      }

      e = null;
      return this;
    }

    /**
     * @method
     * @param {Element|jQueryObject} el
     * @returns {AX6UIMenu}
     */

  }, {
    key: "attach",
    value: function attach(el, opt) {
      var self = this,
          cfg = this.config;
      var getOption = {
        'object': function object(e, opt) {
          e = {
            left: e.left,
            top: e.top,
            width: e.width || cfg.width,
            theme: e.theme || cfg.theme,
            direction: e.direction || cfg.direction
          };
          opt = _jqmin2.default.extend(true, opt, e);

          try {
            return opt;
          } finally {
            e = null;
            opt = null;
          }
        }
      };

      var popUpChildMenu = function popUpChildMenu(target, opt, eType) {
        var $target = (0, _jqmin2.default)(target),
            offset = $target.offset(),
            height = $target.outerHeight(),
            index = Number(target.getAttribute("data-menu-item-index")),
            scrollTop = cfg.position == "fixed" ? (0, _jqmin2.default)(document).scrollTop() : 0;

        if (cfg.items && cfg.items[index][cfg.columnKeys.items] && cfg.items[index][cfg.columnKeys.items].length) {

          if (self.menuBar.openedIndex == index) {
            if (eType == "click") self.close();
            return false;
          }

          self.menuBar.target.find('[data-menu-item-index]').removeClass("hover");
          self.menuBar.opened = true;
          self.menuBar.openedIndex = index;

          $target.attr("data-menu-item-opened", "true");
          $target.addClass("hover");

          if (cfg.offset) {
            if (cfg.offset.left) offset.left += cfg.offset.left;
            if (cfg.offset.top) offset.top += cfg.offset.top;
          }

          opt = getOption["object"].call(this, { left: offset.left, top: offset.top + height - scrollTop }, opt);

          _popup.call(self, opt, cfg.items[index][cfg.columnKeys.items], 0, 'root.' + target.getAttribute("data-menu-item-index")); // 0 is seq of queue
          appEventAttach.call(self, true, {}); // 이벤트 연결
        }

        target = null;
        opt = null;
        $target = null;
        offset = null;
        height = null;
        index = null;
        scrollTop = null;
      };
      var clickParentMenu = function clickParentMenu(target, opt, eType) {
        var $target = (0, _jqmin2.default)(target),
            offset = $target.offset(),
            height = $target.outerHeight(),
            index = Number(target.getAttribute("data-menu-item-index")),
            scrollTop = cfg.position == "fixed" ? (0, _jqmin2.default)(document).scrollTop() : 0;
        if (cfg.items && (!cfg.items[index][cfg.columnKeys.items] || cfg.items[index][cfg.columnKeys.items].length == 0)) {
          if (self.onClick) {
            self.onClick.call(cfg.items[index], cfg.items[index]);
          }
        }
      };

      var data = {},
          items = cfg.items,
          $activeMenu = void 0;

      if (typeof opt === "undefined") opt = {};

      data.theme = opt.theme || cfg.theme;
      data.cfg = {
        icons: _jqmin2.default.extend({}, cfg.icons),
        iconWidth: opt.iconWidth || cfg.iconWidth,
        acceleratorWidth: opt.acceleratorWidth || cfg.acceleratorWidth
      };

      items.forEach(function (n) {
        if (n.html || n.divide) {
          n['@isMenu'] = false;
          if (n.html) {
            n['@html'] = n.html.call({
              item: n,
              config: cfg,
              opt: opt
            });
          }
        } else {
          n['@isMenu'] = true;
        }
      });

      data[cfg.columnKeys.items] = items;

      $activeMenu = (0, _jqmin2.default)(_AX6Mustache2.default.render(tmpl.menubar.call(this, cfg.columnKeys), data));

      self.menuBar = {
        target: (0, _jqmin2.default)(el),
        opened: false
      };
      self.menuBar.target.html($activeMenu);

      // click, mouseover
      self.menuBar.target.on("click", function (e) {
        if (!e) return this;
        var target = _AX6Util2.default.findParentNode(e.target, function (target) {
          if (target.getAttribute("data-menu-item-index")) {
            return true;
          }
        });
        if (target) {
          clickParentMenu(target, opt, "click");
          popUpChildMenu(target, opt, "click");
        }

        target = null;
      });
      self.menuBar.target.on("mouseover", function (e) {
        if (!self.menuBar.opened) return false;
        var target = _AX6Util2.default.findParentNode(e.target, function (target) {
          if (target.getAttribute("data-menu-item-index")) {
            return true;
          }
        });
        if (target) popUpChildMenu(target, opt, "mouseover");

        target = null;
      });

      el = null;
      opt = null;
      data = null;
      items = null;
      $activeMenu = null;

      return this;
    }

    /**
     * @method
     * @returns {AX6UIMenu}
     */

  }, {
    key: "close",
    value: function close() {
      var self = this,
          cfg = this.config;
      if (self.menuBar && self.menuBar.target) {
        self.menuBar.target.find('[data-menu-item-index]').removeClass("hover");
        self.menuBar.opened = false;
        self.menuBar.openedIndex = null;
      }

      appEventAttach.call(this, false); // 이벤트 제거

      this.queue.forEach(function (n) {
        n.$target.remove();
      });
      this.queue = [];

      onStateChanged.call(this, null, {
        self: this,
        state: "close"
      });

      return this;
    }
  }, {
    key: "getCheckValue",


    /**
     * @method
     * @returns {Object} statusCheckItem
     */
    value: function getCheckValue() {

      var checkItems = {};
      var collectItem = function collectItem(items) {
        var i = items.length;
        while (i--) {
          if (items[i].check && items[i].check.checked) {
            if (!checkItems[items[i].check.name]) checkItems[items[i].check.name] = items[i].check.value;else {
              if (_AX6Util2.default.isString(checkItems[items[i].check.name])) checkItems[items[i].check.name] = [checkItems[items[i].check.name]];
              checkItems[items[i].check.name].push(items[i].check.value);
            }
          }
          if (items[i].items && items[i].items.length > 0) collectItem(items[i].items);
        }
      };

      collectItem(this.config.items);

      try {
        return checkItems;
      } finally {
        checkItems = null;
      }
    }
  }]);

  return AX6UIMenu;
}(_AX6UICore3.default);

exports.default = AX6UIMenu;

/***/ }),

/***/ 79:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(80);
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

/***/ 80:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "@-webkit-keyframes ax-menu {\n  0% {\n    opacity: 0.0; }\n  1% {\n    opacity: 0.0; }\n  100% {\n    opacity: 0.95; } }\n\n@-moz-keyframes ax-menu {\n  0% {\n    opacity: 0.0; }\n  1% {\n    opacity: 0.0; }\n  100% {\n    opacity: 0.95; } }\n\n@keyframes ax-menu {\n  0% {\n    opacity: 0.0; }\n  1% {\n    opacity: 0.0; }\n  100% {\n    opacity: 0.95; } }\n\n@-webkit-keyframes ax-menu-destroy {\n  from {\n    -webkit-transform: scale(1);\n    opacity: 1.0; }\n  to {\n    -webkit-transform: scale(0.5);\n    opacity: 0.0; } }\n\n@-moz-keyframes ax-menu-destroy {\n  from {\n    -moz-transform: scale(1);\n    opacity: 1.0; }\n  to {\n    -moz-transform: scale(0.5);\n    opacity: 0.0; } }\n\n@keyframes ax-menu-destroy {\n  from {\n    -webkit-transform: scale(1);\n    -moz-transform: scale(1);\n    -ms-transform: scale(1);\n    -o-transform: scale(1);\n    transform: scale(1);\n    opacity: 1.0; }\n  to {\n    -webkit-transform: scale(0.5);\n    -moz-transform: scale(0.5);\n    -ms-transform: scale(0.5);\n    -o-transform: scale(0.5);\n    transform: scale(0.5);\n    opacity: 0.0; } }\n\n[data-ax6ui-menu] {\n  box-sizing: border-box;\n  z-index: 2000;\n  position: fixed;\n  left: 0px;\n  top: 0px;\n  .width: 100px;\n  opacity: 0.95;\n  -webkit-perspective: 1000px;\n  -moz-perspective: 1000px;\n  perspective: 1000px;\n  -webkit-transform-style: preserve-3d;\n  -moz-transform-style: preserve-3d;\n  -ms-transform-style: preserve-3d;\n  -o-transform-style: preserve-3d;\n  transform-style: preserve-3d;\n  -webkit-animation: ax-menu 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  -moz-animation: ax-menu 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  animation: ax-menu 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  -webkit-transform: translateZ(0);\n  -moz-transform: translateZ(0);\n  -ms-transform: translateZ(0);\n  -o-transform: translateZ(0);\n  transform: translateZ(0);\n  -webkit-transform-origin: center top;\n  -moz-transform-origin: center top;\n  -ms-transform-origin: center top;\n  -o-transform-origin: center top;\n  transform-origin: center top;\n  /* flip type\n  @include backface-visibility(visible);\n  @include transform(translateY(0%) rotateX(0deg));\n  */\n  background-color: #eee;\n  background-image: -webkit-linear-gradient(bottom, #eee);\n  background-image: linear-gradient(to top,#eee);\n  border: 1px solid;\n  border-color: #aaa;\n  border-radius: 5px;\n  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);\n  color: #333; }\n  [data-ax6ui-menu] *,\n  [data-ax6ui-menu] *:before,\n  [data-ax6ui-menu] *:after {\n    box-sizing: border-box; }\n  [data-ax6ui-menu] .ax-menu-heading {\n    font-weight: 600;\n    padding: 10px 15px;\n    border-bottom: 1px solid transparent;\n    border-top-left-radius: 4px;\n    border-top-right-radius: 4px;\n    color: #333;\n    background-color: #f5f5f5;\n    background-image: -webkit-linear-gradient(bottom, #f5f5f5);\n    background-image: linear-gradient(to top,#f5f5f5); }\n    [data-ax6ui-menu] .ax-menu-heading .badge {\n      font-size: 0.8em;\n      color: #f5f5f5;\n      background-color: #333;\n      background-image: -webkit-linear-gradient(bottom, #333);\n      background-image: linear-gradient(to top,#333); }\n  [data-ax6ui-menu] .ax-menu-body {\n    padding: 5px 0px;\n    text-align: center;\n    position: relative;\n    overflow: hidden; }\n    [data-ax6ui-menu] .ax-menu-body .ax-menu-item {\n      padding: 4px 0px;\n      text-align: left;\n      background: #eee;\n      color: #444;\n      cursor: pointer;\n      font-size: 13px;\n      display: table;\n      position: relative;\n      border-collapse: separate;\n      box-sizing: border-box;\n      overflow: hidden;\n      width: 100%;\n      height: 18px; }\n      [data-ax6ui-menu] .ax-menu-body .ax-menu-item .ax-menu-item-cell {\n        box-sizing: border-box;\n        display: table-cell;\n        vertical-align: middle;\n        white-space: nowrap;\n        font-size: 13px;\n        line-height: 18px;\n        padding: 0px 0px 0px 0px;\n        user-select: none; }\n        [data-ax6ui-menu] .ax-menu-body .ax-menu-item .ax-menu-item-cell.ax-menu-item-checkbox {\n          overflow: hidden;\n          width: 18px;\n          text-align: center; }\n          [data-ax6ui-menu] .ax-menu-body .ax-menu-item .ax-menu-item-cell.ax-menu-item-checkbox .item-checkbox-wrap {\n            position: relative;\n            display: block;\n            width: 18px;\n            height: 18px; }\n            [data-ax6ui-menu] .ax-menu-body .ax-menu-item .ax-menu-item-cell.ax-menu-item-checkbox .item-checkbox-wrap.useCheckBox:after {\n              content: '';\n              width: 10px;\n              height: 5px;\n              position: absolute;\n              top: 4px;\n              left: 4px;\n              border: 2px solid #444;\n              border-top: none;\n              border-right: none;\n              background: transparent;\n              opacity: 0.1;\n              -webkit-transform: rotate(-50deg);\n              -moz-transform: rotate(-50deg);\n              -ms-transform: rotate(-50deg);\n              -o-transform: rotate(-50deg);\n              transform: rotate(-50deg); }\n            [data-ax6ui-menu] .ax-menu-body .ax-menu-item .ax-menu-item-cell.ax-menu-item-checkbox .item-checkbox-wrap.useCheckBox[data-item-checked=\"true\"]:after {\n              opacity: 1; }\n        [data-ax6ui-menu] .ax-menu-body .ax-menu-item .ax-menu-item-cell.ax-menu-item-icon {\n          text-align: left; }\n        [data-ax6ui-menu] .ax-menu-body .ax-menu-item .ax-menu-item-cell.ax-menu-item-label {\n          padding-right: 10px; }\n        [data-ax6ui-menu] .ax-menu-body .ax-menu-item .ax-menu-item-cell.ax-menu-item-accelerator {\n          text-align: right;\n          padding: 0px 7px 0px 0px; }\n          [data-ax6ui-menu] .ax-menu-body .ax-menu-item .ax-menu-item-cell.ax-menu-item-accelerator .item-wrap {\n            width: 100%;\n            vertical-align: middle;\n            display: inline-block;\n            max-width: 100%;\n            overflow: hidden;\n            text-overflow: ellipsis;\n            white-space: nowrap;\n            word-wrap: normal;\n            display: block; }\n        [data-ax6ui-menu] .ax-menu-body .ax-menu-item .ax-menu-item-cell.ax-menu-item-handle {\n          overflow: hidden;\n          width: 14px;\n          text-align: center; }\n      [data-ax6ui-menu] .ax-menu-body .ax-menu-item:hover, [data-ax6ui-menu] .ax-menu-body .ax-menu-item.hover {\n        background: #999;\n        color: #fff; }\n        [data-ax6ui-menu] .ax-menu-body .ax-menu-item:hover .ax-menu-item-cell.ax-menu-item-checkbox .item-checkbox-wrap:after, [data-ax6ui-menu] .ax-menu-body .ax-menu-item.hover .ax-menu-item-cell.ax-menu-item-checkbox .item-checkbox-wrap:after {\n          border-color: #fff; }\n    [data-ax6ui-menu] .ax-menu-body .ax-menu-item-divide {\n      border-top: 1px solid;\n      border-color: #aaaaaa;\n      margin: 5px 0px; }\n    [data-ax6ui-menu] .ax-menu-body .ax-menu-item-html {\n      padding: 0px 5px;\n      text-align: left; }\n    [data-ax6ui-menu] .ax-menu-body .ax-menu-buttons button:not(:last-child) {\n      margin-right: 3px; }\n  [data-ax6ui-menu].direction-top {\n    border-top-left-radius: 0;\n    border-top-right-radius: 0;\n    border-bottom-left-radius: 5px;\n    border-bottom-right-radius: 5px; }\n    [data-ax6ui-menu].direction-top.with-arrow .ax-menu-arrow {\n      position: absolute;\n      width: 0;\n      height: 0;\n      left: 50%;\n      top: 0px; }\n      [data-ax6ui-menu].direction-top.with-arrow .ax-menu-arrow:before {\n        content: ' ';\n        position: absolute;\n        width: 0;\n        height: 0;\n        left: -10px;\n        top: -20px;\n        border-left: 10px solid transparent;\n        border-right: 10px solid transparent;\n        border-bottom: 20px solid #aaa; }\n      [data-ax6ui-menu].direction-top.with-arrow .ax-menu-arrow:after {\n        content: ' ';\n        position: absolute;\n        width: 0;\n        height: 0;\n        left: -10px;\n        top: -18px;\n        border-left: 10px solid transparent;\n        border-right: 10px solid transparent;\n        border-bottom: 20px solid #eee; }\n  [data-ax6ui-menu].direction-right {\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n    border-top-left-radius: 5px;\n    border-bottom-left-radius: 5px; }\n    [data-ax6ui-menu].direction-right.with-arrow .ax-menu-arrow {\n      position: absolute;\n      width: 0;\n      height: 0;\n      right: 0px;\n      top: 50%; }\n      [data-ax6ui-menu].direction-right.with-arrow .ax-menu-arrow:before {\n        content: ' ';\n        position: absolute;\n        width: 0;\n        height: 0;\n        right: -20px;\n        top: -10px;\n        border-top: 10px solid transparent;\n        border-bottom: 10px solid transparent;\n        border-left: 20px solid #aaa; }\n      [data-ax6ui-menu].direction-right.with-arrow .ax-menu-arrow:after {\n        content: ' ';\n        position: absolute;\n        width: 0;\n        height: 0;\n        right: -18px;\n        top: -10px;\n        border-top: 10px solid transparent;\n        border-bottom: 10px solid transparent;\n        border-left: 20px solid #eee; }\n  [data-ax6ui-menu].direction-bottom {\n    border-bottom-left-radius: 0;\n    border-bottom-right-radius: 0;\n    border-top-left-radius: 5px;\n    border-top-right-radius: 5px; }\n    [data-ax6ui-menu].direction-bottom.with-arrow .ax-menu-arrow {\n      position: absolute;\n      width: 0;\n      height: 0;\n      left: 50%;\n      bottom: 0px; }\n      [data-ax6ui-menu].direction-bottom.with-arrow .ax-menu-arrow:before {\n        content: ' ';\n        position: absolute;\n        width: 0;\n        height: 0;\n        left: -10px;\n        bottom: -20px;\n        border-left: 10px solid transparent;\n        border-right: 10px solid transparent;\n        border-top: 20px solid #aaa; }\n      [data-ax6ui-menu].direction-bottom.with-arrow .ax-menu-arrow:after {\n        content: ' ';\n        position: absolute;\n        width: 0;\n        height: 0;\n        left: -10px;\n        bottom: -18px;\n        border-left: 10px solid transparent;\n        border-right: 10px solid transparent;\n        border-top: 20px solid #eee; }\n  [data-ax6ui-menu].direction-left {\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n    border-top-right-radius: 5px;\n    border-bottom-right-radius: 5px; }\n    [data-ax6ui-menu].direction-left.with-arrow .ax-menu-arrow {\n      position: absolute;\n      width: 0;\n      height: 0;\n      left: 0px;\n      top: 50%; }\n      [data-ax6ui-menu].direction-left.with-arrow .ax-menu-arrow:before {\n        content: ' ';\n        position: absolute;\n        width: 0;\n        height: 0;\n        left: -20px;\n        top: -10px;\n        border-top: 10px solid transparent;\n        border-bottom: 10px solid transparent;\n        border-right: 20px solid #aaa; }\n      [data-ax6ui-menu].direction-left.with-arrow .ax-menu-arrow:after {\n        content: ' ';\n        position: absolute;\n        width: 0;\n        height: 0;\n        left: -18px;\n        top: -10px;\n        border-top: 10px solid transparent;\n        border-bottom: 10px solid transparent;\n        border-right: 20px solid #eee; }\n  [data-ax6ui-menu].destroy {\n    -webkit-animation: ax-menu-destroy 0.2s cubic-bezier(0.6, -0.28, 0.735, 0.045) forwards;\n    -moz-animation: ax-menu-destroy 0.2s cubic-bezier(0.6, -0.28, 0.735, 0.045) forwards;\n    animation: ax-menu-destroy 0.2s cubic-bezier(0.6, -0.28, 0.735, 0.045) forwards; }\n  [data-ax6ui-menu].direction-top {\n    -webkit-transform-origin: center top;\n    -moz-transform-origin: center top;\n    -ms-transform-origin: center top;\n    -o-transform-origin: center top;\n    transform-origin: center top; }\n  [data-ax6ui-menu].direction-right {\n    -webkit-transform-origin: right center;\n    -moz-transform-origin: right center;\n    -ms-transform-origin: right center;\n    -o-transform-origin: right center;\n    transform-origin: right center; }\n  [data-ax6ui-menu].direction-bottom {\n    -webkit-transform-origin: center bottom;\n    -moz-transform-origin: center bottom;\n    -ms-transform-origin: center bottom;\n    -o-transform-origin: center bottom;\n    transform-origin: center bottom; }\n  [data-ax6ui-menu].direction-left {\n    -webkit-transform-origin: left center;\n    -moz-transform-origin: left center;\n    -ms-transform-origin: left center;\n    -o-transform-origin: left center;\n    transform-origin: left center; }\n\n[data-ax6ui-menubar] {\n  box-sizing: border-box;\n  height: 100%;\n  position: relative; }\n  [data-ax6ui-menubar] .ax-menu-body {\n    display: table;\n    height: 100%;\n    border-collapse: separate;\n    box-sizing: border-box; }\n    [data-ax6ui-menubar] .ax-menu-body .ax-menu-item {\n      display: table-cell;\n      height: 100%;\n      vertical-align: middle;\n      white-space: nowrap;\n      box-sizing: border-box;\n      padding: 0px 10px;\n      cursor: pointer;\n      font-size: 13px; }\n      [data-ax6ui-menubar] .ax-menu-body .ax-menu-item .ax-menu-item-cell {\n        white-space: nowrap;\n        user-select: none; }\n  [data-ax6ui-menubar] .ax-menu-body .ax-menu-item {\n    color: #444; }\n    [data-ax6ui-menubar] .ax-menu-body .ax-menu-item:hover, [data-ax6ui-menubar] .ax-menu-body .ax-menu-item.hover {\n      background: #999;\n      color: #fff; }\n", ""]);

// exports


/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWVudS5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL0FYNk11c3RhY2hlLmpzIiwid2VicGFjazovLy8uLi9zcmMvQVg2VUlNZW51LmpzIiwid2VicGFjazovLy8uLi9zcmMvQVg2VUlNZW51L3N0eWxlLnNjc3M/NTIyMCIsIndlYnBhY2s6Ly8vLi4vc3JjL0FYNlVJTWVudS9zdHlsZS5zY3NzIl0sIm5hbWVzIjpbImh0bWwiLCJmbiIsIm1vZHVsZVJ1biIsIiRib2R5IiwibWVudSIsImljb25XaWR0aCIsImFjY2VsZXJhdG9yV2lkdGgiLCJpdGVtQ2xpY2tBbmRDbG9zZSIsImljb25zIiwiY29sdW1uS2V5cyIsImxhYmVsIiwiaXRlbXMiLCJpY29uIiwibmFtZSIsImNoaWRyZW4iLCJjaGVjayIsInR5cGUiLCJ2YWx1ZSIsImNoZWNrZWQiLCJkYXRhIiwicm9sZSIsImFjY2VsZXJhdG9yIiwiZmlsdGVyVHlwZSIsImRpdmlkZSIsIm9uU3RhdGVDaGFuZ2VkIiwic3RhdGUiLCJvbkNsaWNrIiwib25Mb2FkIiwiZWxlbWVudCIsIm9uIiwiYWN0IiwiZ2V0QXR0cmlidXRlIiwiY29uc29sZSIsImxvZyIsImdldENoZWNrVmFsdWUiLCJjbG9zZSIsImRvY3VtZW50IiwiYm9keSIsImUiLCJwb3B1cCIsImZpbHRlciIsInN0b3BFdmVudCIsIm9yaWdpbmFsRXZlbnQiLCJhdHRhY2hlZE1lbnUiLCJkaXJlY3Rpb24iLCJvZmZzZXQiLCJsZWZ0IiwidG9wIiwicG9zaXRpb24iLCJhdHRhY2giLCJtb2R1bGVEZXN0cm95Iiwib2ZmIiwiQVg2IiwiZGVmaW5lTXVzdGFjaGUiLCJnbG9iYWwiLCJmYWN0b3J5IiwibXVzdGFjaGUiLCJtdXN0YWNoZUZhY3RvcnkiLCJvYmplY3RUb1N0cmluZyIsIk9iamVjdCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwiaXNBcnJheSIsIkFycmF5IiwiaXNBcnJheVBvbHlmaWxsIiwib2JqZWN0IiwiY2FsbCIsImlzRnVuY3Rpb24iLCJ0eXBlU3RyIiwib2JqIiwiZXNjYXBlUmVnRXhwIiwic3RyaW5nIiwicmVwbGFjZSIsImhhc1Byb3BlcnR5IiwicHJvcE5hbWUiLCJyZWdFeHBUZXN0IiwiUmVnRXhwIiwidGVzdCIsInRlc3RSZWdFeHAiLCJyZSIsIm5vblNwYWNlUmUiLCJpc1doaXRlc3BhY2UiLCJlbnRpdHlNYXAiLCJlc2NhcGVIdG1sIiwiU3RyaW5nIiwiZnJvbUVudGl0eU1hcCIsInMiLCJ3aGl0ZVJlIiwic3BhY2VSZSIsImVxdWFsc1JlIiwiY3VybHlSZSIsInRhZ1JlIiwicGFyc2VUZW1wbGF0ZSIsInRlbXBsYXRlIiwidGFncyIsInNlY3Rpb25zIiwidG9rZW5zIiwic3BhY2VzIiwiaGFzVGFnIiwibm9uU3BhY2UiLCJzdHJpcFNwYWNlIiwibGVuZ3RoIiwicG9wIiwib3BlbmluZ1RhZ1JlIiwiY2xvc2luZ1RhZ1JlIiwiY2xvc2luZ0N1cmx5UmUiLCJjb21waWxlVGFncyIsInRhZ3NUb0NvbXBpbGUiLCJzcGxpdCIsIkVycm9yIiwic2Nhbm5lciIsIlNjYW5uZXIiLCJzdGFydCIsImNociIsInRva2VuIiwib3BlblNlY3Rpb24iLCJlb3MiLCJwb3MiLCJzY2FuVW50aWwiLCJpIiwidmFsdWVMZW5ndGgiLCJjaGFyQXQiLCJwdXNoIiwic2NhbiIsIm5lc3RUb2tlbnMiLCJzcXVhc2hUb2tlbnMiLCJzcXVhc2hlZFRva2VucyIsImxhc3RUb2tlbiIsIm51bVRva2VucyIsIm5lc3RlZFRva2VucyIsImNvbGxlY3RvciIsInNlY3Rpb24iLCJ0YWlsIiwibWF0Y2giLCJpbmRleCIsInN1YnN0cmluZyIsInNlYXJjaCIsIkNvbnRleHQiLCJ2aWV3IiwicGFyZW50Q29udGV4dCIsImNhY2hlIiwicmV0dXJucyIsImsiLCJwYXJlbnQiLCJsb29rdXAiLCJoYXNPd25Qcm9wZXJ0eSIsImNvbnRleHQiLCJuYW1lcyIsImxvb2t1cEhpdCIsImluZGV4T2YiLCJXcml0ZXIiLCJjbGVhckNhY2hlIiwicGFyc2UiLCJyZW5kZXIiLCJwYXJ0aWFscyIsInJlbmRlclRva2VucyIsIm9yaWdpbmFsVGVtcGxhdGUiLCJidWZmZXIiLCJzeW1ib2wiLCJ1bmRlZmluZWQiLCJyZW5kZXJTZWN0aW9uIiwicmVuZGVySW52ZXJ0ZWQiLCJyZW5kZXJQYXJ0aWFsIiwidW5lc2NhcGVkVmFsdWUiLCJlc2NhcGVkVmFsdWUiLCJyYXdWYWx1ZSIsInNlbGYiLCJzdWJSZW5kZXIiLCJqIiwic2xpY2UiLCJlc2NhcGUiLCJ2ZXJzaW9uIiwiZGVmYXVsdFdyaXRlciIsIlR5cGVFcnJvciIsInRvX2h0bWwiLCJzZW5kIiwicmVzdWx0IiwidG1wbCIsIm1lbnViYXIiLCJhcHBFdmVudEF0dGFjaCIsImFjdGl2ZSIsIm9wdCIsImluc3RhbmNlSWQiLCJjbGlja0l0ZW0iLCJiaW5kIiwid2luZG93Iiwid2hpY2giLCJldmVudEtleXMiLCJFU0MiLCJvcHRzIiwidGhhdCIsImRlcHRoIiwicGF0aCIsImNmZyIsImNvbmZpZyIsIiRhY3RpdmVNZW51IiwicmVtb3ZlZCIsInRoZW1lIiwiZXh0ZW5kIiwiZm9yRWFjaCIsIm4iLCJpdGVtIiwiYXBwZW5kIiwicXVldWUiLCJzcGxpY2UiLCIkdGFyZ2V0IiwicmVtb3ZlIiwiJHRoaXMiLCJzY3JvbGxUb3AiLCJjaGlsZE9wdCIsIl9pdGVtcyIsIl9hY3RpdmVNZW51IiwiZmluZCIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJhdHRyIiwid2lkdGgiLCJvdXRlcldpZHRoIiwiaGVpZ2h0Iiwib3V0ZXJIZWlnaHQiLCJtZW51Qm9keVBhZGRpbmciLCJOdW1iZXIiLCJGdW5jdGlvbiIsImFsaWduIiwiZ2V0IiwidGFyZ2V0IiwiZmluZFBhcmVudE5vZGUiLCJnZXRFcnJvciIsInNldFZhbHVlIiwiZWFjaCIsInBhcmFtIiwiJHdpbmRvdyIsIiRkb2N1bWVudCIsIndoIiwid3ciLCJoIiwidyIsImwiLCJ0IiwiY3NzIiwiQVg2VUlNZW51IiwiYW5pbWF0ZVRpbWUiLCJvcGVuVGltZXIiLCJjbG9zZVRpbWVyIiwibWVudUJhciIsImluaXQiLCJpbml0T25jZSIsImluaXRpYWxpemVkIiwiZ2V0T3B0aW9uIiwiY2xpZW50WCIsImNsaWVudFkiLCJwYWdlWSIsInVwZGF0ZVRoZW1lIiwiY29uY2F0IiwiZmlsdGVyaW5nSXRlbSIsImFyciIsInBvcHVwRXZlbnRBdHRhY2hUaW1lciIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJlbCIsInBvcFVwQ2hpbGRNZW51IiwiZVR5cGUiLCJvcGVuZWRJbmRleCIsIm9wZW5lZCIsImNsaWNrUGFyZW50TWVudSIsImNoZWNrSXRlbXMiLCJjb2xsZWN0SXRlbSIsImlzU3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBLElBQUlBLHdOQUFKO0FBTUEsSUFBSUMsS0FBSztBQUNQQyxhQUFXLG1CQUFVQyxLQUFWLEVBQWlCOztBQUUxQixRQUFJQyxPQUFPLHdCQUFTO0FBQ2xCO0FBQ0FDLGlCQUFXLEVBRk87QUFHbEJDLHdCQUFrQixHQUhBO0FBSWxCO0FBQ0FDLHlCQUFtQixLQUxEO0FBTWxCO0FBQ0FDLGFBQU87QUFDTCxpQkFBUztBQURKLE9BUFc7QUFVbEJDLGtCQUFZO0FBQ1ZDLGVBQU8sTUFERztBQUVWQyxlQUFPO0FBRkcsT0FWTTtBQWNsQkEsYUFBTyxDQUNMO0FBQ0VDLGNBQU0sMENBRFI7QUFFRUMsY0FBTSxlQUZSO0FBR0VDLGlCQUFTLENBQ1A7QUFDRUMsaUJBQU87QUFDTEMsa0JBQU0sVUFERDtBQUVMSCxrQkFBTSxHQUZEO0FBR0xJLG1CQUFPLEdBSEY7QUFJTEMscUJBQVM7QUFKSixXQURUO0FBT0VMLGdCQUFNLFFBUFI7QUFRRU0sZ0JBQU0sRUFSUjtBQVNFQyxnQkFBTSxFQVRSO0FBVUVDLHVCQUFhO0FBVmYsU0FETyxFQWFQO0FBQ0VOLGlCQUFPO0FBQ0xDLGtCQUFNLFVBREQ7QUFFTEgsa0JBQU0sR0FGRDtBQUdMSSxtQkFBTyxHQUhGO0FBSUxDLHFCQUFTO0FBSkos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LEVBQUUsNEVBQTRFLHVCQUF1Qiw2QkFBNkIsbUJBQW1CLG9CQUFvQixzQkFBc0Isd0JBQXdCLDhDQUE4QywrQ0FBK0Msc0NBQXNDLEVBQUUsc0NBQXNDLGlDQUFpQyxvQ0FBb0MsbUNBQW1DLHNDQUFzQyxFQUFFLGtFQUFrRSwyQkFBMkIsaUJBQWlCLGtCQUFrQixrQkFBa0IsaUJBQWlCLEVBQUUsMkVBQTJFLHVCQUF1Qiw2QkFBNkIsbUJBQW1CLG9CQUFvQixzQkFBc0IscUJBQXFCLDZDQUE2QyxnREFBZ0Qsd0NBQXdDLEVBQUUsMEVBQTBFLHVCQUF1Qiw2QkFBNkIsbUJBQW1CLG9CQUFvQixzQkFBc0IscUJBQXFCLDZDQUE2QyxnREFBZ0Qsd0NBQXdDLEVBQUUsK0JBQStCLDhGQUE4RiwyRkFBMkYsc0ZBQXNGLEVBQUUscUNBQXFDLDJDQUEyQyx3Q0FBd0MsdUNBQXVDLHNDQUFzQyxtQ0FBbUMsRUFBRSx1Q0FBdUMsNkNBQTZDLDBDQUEwQyx5Q0FBeUMsd0NBQXdDLHFDQUFxQyxFQUFFLHdDQUF3Qyw4Q0FBOEMsMkNBQTJDLDBDQUEwQyx5Q0FBeUMsc0NBQXNDLEVBQUUsc0NBQXNDLDRDQUE0Qyx5Q0FBeUMsd0NBQXdDLHVDQUF1QyxvQ0FBb0MsRUFBRSwwQkFBMEIsMkJBQTJCLGlCQUFpQix1QkFBdUIsRUFBRSx3Q0FBd0MscUJBQXFCLG1CQUFtQixnQ0FBZ0MsNkJBQTZCLEVBQUUsd0RBQXdELDRCQUE0QixxQkFBcUIsK0JBQStCLDRCQUE0QiwrQkFBK0IsMEJBQTBCLHdCQUF3Qix3QkFBd0IsRUFBRSw2RUFBNkUsOEJBQThCLDRCQUE0QixFQUFFLHNEQUFzRCxrQkFBa0IsRUFBRSxzSEFBc0gseUJBQXlCLG9CQUFvQixFQUFFOztBQUV4dWEiLCJmaWxlIjoiOC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gXCJqcW1pblwiO1xuaW1wb3J0IFUgZnJvbSBcIi4uLy4uL3NyYy9BWDZVdGlsXCI7XG5pbXBvcnQgTWVudSBmcm9tIFwiLi4vLi4vc3JjL0FYNlVJTWVudVwiO1xuaW1wb3J0IFwiLi4vLi4vc3JjL0FYNlVJTWVudS9zdHlsZS5zY3NzXCI7XG5cbmxldCBodG1sID0gYFxuPGRpdiBpZD1cImF0dGFjaGVkTWVudS10YXJnZXRcIlxuICAgICBzdHlsZT1cIndpZHRoOjEwMCU7aGVpZ2h0OjM2cHg7YmFja2dyb3VuZDogI2NjY2NjYztib3JkZXItYm90dG9tOjFweCBzb2xpZCAjMDAwO3BhZGRpbmc6IDBweCAyMHB4O1wiPjwvZGl2PlxuXG48ZGl2IHN0eWxlPVwiYmFja2dyb3VuZDogI2VlZTtoZWlnaHQ6IDEwMDBweDtcIj48L2Rpdj5cbmA7XG5sZXQgZm4gPSB7XG4gIG1vZHVsZVJ1bjogZnVuY3Rpb24gKCRib2R5KSB7XG5cbiAgICBsZXQgbWVudSA9IG5ldyBNZW51KHtcbiAgICAgIC8vIHdpZHRoOiAyMDAsXG4gICAgICBpY29uV2lkdGg6IDIwLFxuICAgICAgYWNjZWxlcmF0b3JXaWR0aDogMTAwLFxuICAgICAgLy8gb2Zmc2V0OiB7bGVmdDogMTAsIHRvcDogMTB9LFxuICAgICAgaXRlbUNsaWNrQW5kQ2xvc2U6IGZhbHNlLFxuICAgICAgLy9wb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgICAgaWNvbnM6IHtcbiAgICAgICAgJ2Fycm93JzogJzxpIGNsYXNzPVwidGlueSBtYXRlcmlhbC1pY29uc1wiPmNoZXZyb25fcmlnaHQ8L2k+J1xuICAgICAgfSxcbiAgICAgIGNvbHVtbktleXM6IHtcbiAgICAgICAgbGFiZWw6ICduYW1lJyxcbiAgICAgICAgaXRlbXM6ICdjaGlkcmVuJ1xuICAgICAgfSxcbiAgICAgIGl0ZW1zOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpY29uOiAnPGkgY2xhc3M9XCJ0aW55IG1hdGVyaWFsLWljb25zXCI+Y2xhc3M8L2k+JyxcbiAgICAgICAgICBuYW1lOiBcIk1lbnUgUGFyZW50IDBcIixcbiAgICAgICAgICBjaGlkcmVuOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGNoZWNrOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2NoZWNrYm94JyxcbiAgICAgICAgICAgICAgICBuYW1lOiAnQScsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICcwJyxcbiAgICAgICAgICAgICAgICBjaGVja2VkOiBmYWxzZVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBuYW1lOiBcIk1lbnUgWlwiLFxuICAgICAgICAgICAgICBkYXRhOiB7fSxcbiAgICAgICAgICAgICAgcm9sZTogXCJcIixcbiAgICAgICAgICAgICAgYWNjZWxlcmF0b3I6IFwiQ21kT3JDdHJsK1pcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgY2hlY2s6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnY2hlY2tib3gnLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdBJyxcbiAgICAgICAgICAgICAgICB2YWx1ZTogJzEnLFxuICAgICAgICAgICAgICAgIGNoZWNrZWQ6IHRydWVcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgbmFtZTogXCJNZW51IEFcIixcbiAgICAgICAgICAgICAgZGF0YToge30sXG4gICAgICAgICAgICAgIHJvbGU6IFwiXCJcbiAgICAgICAgICAgICAgLy9hY2NlbGVyYXRvcjogXCJDbWRPckN0cmwrQVwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICBmaWx0ZXJUeXBlOiBcIkFcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZGl2aWRlOiB0cnVlLFxuICAgICAgICAgIGZpbHRlclR5cGU6IFwiQVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpY29uOiAnPGkgY2xhc3M9XCJ0aW55IG1hdGVyaWFsLWljb25zXCI+Y2xhc3M8L2k+JyxcbiAgICAgICAgICBuYW1lOiBcIk1lbnUgUGFyZW50IDFcIixcbiAgICAgICAgICBjaGlkcmVuOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6IFwiTWVudSBaXCIsXG4gICAgICAgICAgICAgIGRhdGE6IHt9LFxuICAgICAgICAgICAgICByb2xlOiBcIlwiLFxuICAgICAgICAgICAgICAvL2FjY2VsZXJhdG9yOiBcIkNtZE9yQ3RybCtaXCIsXG4gICAgICAgICAgICAgIGNoaWRyZW46IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBuYW1lOiBcIk1lbnUgWlwiLFxuICAgICAgICAgICAgICAgICAgZGF0YToge30sXG4gICAgICAgICAgICAgICAgICByb2xlOiBcIlwiXG4gICAgICAgICAgICAgICAgICAvL2FjY2VsZXJhdG9yOiBcIkNtZE9yQ3RybCtaXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6IFwiTWVudSBBXCIsXG4gICAgICAgICAgICAgICAgICBkYXRhOiB7fSxcbiAgICAgICAgICAgICAgICAgIHJvbGU6IFwiXCJcbiAgICAgICAgICAgICAgICAgIC8vYWNjZWxlcmF0b3I6IFwiQ21kT3JDdHJsK0FcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogXCJNZW51IEFcIixcbiAgICAgICAgICAgICAgZGF0YToge30sXG4gICAgICAgICAgICAgIHJvbGU6IFwiXCJcbiAgICAgICAgICAgICAgLy9hY2NlbGVyYXRvcjogXCJDbWRPckN0cmwrQVwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICBmaWx0ZXJUeXBlOiBcIkFcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgY2hlY2s6IHtcbiAgICAgICAgICAgIHR5cGU6ICdyYWRpbycsXG4gICAgICAgICAgICBuYW1lOiAncmFkaW9OYW1lJyxcbiAgICAgICAgICAgIHZhbHVlOiAnMScsXG4gICAgICAgICAgICBjaGVja2VkOiBmYWxzZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgaWNvbjogJzxpIGNsYXNzPVwidGlueSBtYXRlcmlhbC1pY29uc1wiPmNsYXNzPC9pPicsXG4gICAgICAgICAgbmFtZTogXCJNZW51IFBhcmVudCAyXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGNoZWNrOiB7XG4gICAgICAgICAgICB0eXBlOiAncmFkaW8nLFxuICAgICAgICAgICAgbmFtZTogJ3JhZGlvTmFtZScsXG4gICAgICAgICAgICB2YWx1ZTogJzInLFxuICAgICAgICAgICAgY2hlY2tlZDogZmFsc2VcbiAgICAgICAgICB9LFxuICAgICAgICAgIG5hbWU6IFwiTWVudSBQYXJlbnQgM1wiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBjaGVjazoge1xuICAgICAgICAgICAgdHlwZTogJ3JhZGlvJyxcbiAgICAgICAgICAgIG5hbWU6ICdyYWRpb05hbWUnLFxuICAgICAgICAgICAgdmFsdWU6ICczJyxcbiAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBuYW1lOiBcIk1lbnUgUGFyZW50IDRcIlxuICAgICAgICB9LFxuICAgICAgICB7ZGl2aWRlOiB0cnVlfSxcbiAgICAgICAge1xuICAgICAgICAgIGh0bWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMpO1xuICAgICAgICAgICAgcmV0dXJuICc8ZGl2IHN0eWxlPVwidGV4dC1hbGlnbjogY2VudGVyO1wiPicgK1xuICAgICAgICAgICAgICAnPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIGRhdGEtbWVudS1idG49XCJPS1wiPk9LPC9idXR0b24+ICcgK1xuICAgICAgICAgICAgICAnPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGFuZ2VyXCIgZGF0YS1tZW51LWJ0bj1cIkNBTkNFTFwiPkNBTkNFTDwvYnV0dG9uPicgK1xuICAgICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9KTtcblxuICAgIG1lbnUub25TdGF0ZUNoYW5nZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodGhpcy5zdGF0ZSA9PSAnY2xvc2UnKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5zZWxmLmdldENoZWNrVmFsdWUoKSk7XG4gICAgICB9XG4gICAgfTtcbiAgICBtZW51Lm9uQ2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzKTtcbiAgICB9O1xuXG4gICAgbWVudS5vbkxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIXRoaXMuZWxlbWVudCkgcmV0dXJuIHRoaXM7XG4gICAgICAkKHRoaXMuZWxlbWVudCkub24oXCJjbGlja1wiLCAnW2RhdGEtbWVudS1idG5dJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYWN0ID0gdGhpcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLW1lbnUtYnRuXCIpO1xuICAgICAgICBpZiAoYWN0ID09ICdPSycpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhtZW51LmdldENoZWNrVmFsdWUoKSk7XG4gICAgICAgIH1cbiAgICAgICAgbWVudS5jbG9zZSgpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgICQoZG9jdW1lbnQuYm9keSkub24oXCJjb250ZXh0bWVudVwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgbWVudS5wb3B1cChlLCB7XG4gICAgICAgIGZpbHRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgVS5zdG9wRXZlbnQoZS5vcmlnaW5hbEV2ZW50KTtcbiAgICB9KTtcblxuXG4gICAgbGV0IGF0dGFjaGVkTWVudSA9IG5ldyBNZW51KHtcbiAgICAgIGRpcmVjdGlvbjogXCJ0b3BcIixcbiAgICAgIG9mZnNldDoge2xlZnQ6IDAsIHRvcDogMX0sXG4gICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgICAgaWNvbnM6IHtcbiAgICAgICAgJ2Fycm93JzogJzxpIGNsYXNzPVwidGlueSBtYXRlcmlhbC1pY29uc1wiPmNoZXZyb25fcmlnaHQ8L2k+J1xuICAgICAgfSxcbiAgICAgIG9uU3RhdGVDaGFuZ2VkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMpO1xuICAgICAgfSxcbiAgICAgIG9uQ2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcyk7XG4gICAgICB9LFxuICAgICAgY29sdW1uS2V5czoge1xuICAgICAgICBsYWJlbDogJ25hbWUnLFxuICAgICAgICBpdGVtczogJ2NoaWRyZW4nXG4gICAgICB9LFxuICAgICAgaXRlbXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGljb246ICc8aSBjbGFzcz1cInRpbnkgbWF0ZXJpYWwtaWNvbnNcIj5jbGFzczwvaT4nLFxuICAgICAgICAgIG5hbWU6IFwiTWVudSBQYXJlbnQgMFwiLFxuICAgICAgICAgIGNoaWRyZW46IFtdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpY29uOiAnPGkgY2xhc3M9XCJ0aW55IG1hdGVyaWFsLWljb25zXCI+Y2xvdWRfcXVldWU8L2k+JyxcbiAgICAgICAgICBuYW1lOiBcIk1lbnUgUGFyZW50IDFcIixcbiAgICAgICAgICBjaGlkcmVuOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6IFwiTWVudSBaXCIsXG4gICAgICAgICAgICAgIGRhdGE6IHt9LFxuICAgICAgICAgICAgICByb2xlOiBcIlwiLFxuICAgICAgICAgICAgICAvL2FjY2VsZXJhdG9yOiBcIkNtZE9yQ3RybCtaXCIsXG4gICAgICAgICAgICAgIGNoaWRyZW46IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBuYW1lOiBcIk1lbnUgWlwiLFxuICAgICAgICAgICAgICAgICAgZGF0YToge30sXG4gICAgICAgICAgICAgICAgICByb2xlOiBcIlwiXG4gICAgICAgICAgICAgICAgICAvL2FjY2VsZXJhdG9yOiBcIkNtZE9yQ3RybCtaXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6IFwiTWVudSBBXCIsXG4gICAgICAgICAgICAgICAgICBkYXRhOiB7fSxcbiAgICAgICAgICAgICAgICAgIHJvbGU6IFwiXCJcbiAgICAgICAgICAgICAgICAgIC8vYWNjZWxlcmF0b3I6IFwiQ21kT3JDdHJsK0FcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogXCJNZW51IEFcIixcbiAgICAgICAgICAgICAgZGF0YToge30sXG4gICAgICAgICAgICAgIHJvbGU6IFwiXCJcbiAgICAgICAgICAgICAgLy9hY2NlbGVyYXRvcjogXCJDbWRPckN0cmwrQVwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSkuYXR0YWNoKCQoJyNhdHRhY2hlZE1lbnUtdGFyZ2V0JykpO1xuXG4gIH0sXG4gIG1vZHVsZURlc3Ryb3k6IGZ1bmN0aW9uICgkYm9keSkge1xuICAgICRib2R5Lm9mZihcImNsaWNrXCIpO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGh0bWw6IGh0bWwsXG4gIGZuOiBmblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21lbnUuanMiLCIvKiFcbiAqIG11c3RhY2hlLmpzIC0gTG9naWMtbGVzcyB7e211c3RhY2hlfX0gdGVtcGxhdGVzIHdpdGggSmF2YVNjcmlwdFxuICogaHR0cDovL2dpdGh1Yi5jb20vamFubC9tdXN0YWNoZS5qc1xuICogaHR0cHM6Ly9naXRodWIuY29tL3Rob21hc0phbmcvbXVzdGFjaGUuanMgLS0gaW1wb3JvdmUgc29tZSB2YXJpYWJsZXNcbiAqL1xuXG5cbi8qKlxuICogQVg2TXVzdGFjaGXripQgaHR0cDovL2dpdGh1Yi5jb20vamFubC9tdXN0YWNoZS5qc+yXkCDrqofqsIDsp4Ag7LWc7IaM7ZWc7J2YIOq4sOuKpeydhCDtipzri53tlZjsl6wg7IKs7Jqp7ZWY64qUIO2FnO2UjOumvyDsl5Tsp4TsnoXri4jri6QuXG4gKiBAbmFtZXNwYWNlIEFYNk11c3RhY2hlXG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIEFYNk11c3RhY2hlLnJlbmRlclxuICogQGV4YW1wbGVcbiAqIGBgYGpzXG4gKiBheDUubXVzdGFjaGUucmVuZGVyKHRlbXBsYXRlLCB2aWV3KVxuICpcbiAqXG4gKiAvL0FycmF5IEBpXG4gKiAvL3t7I2JlYXRsZXN9fVxuICogLy97e2ZpcnN0TmFtZX19IHt7bGFzdE5hbWV9fSAoe3tAaX19KSAoe3tAZmlyc3R9fSlcbiAqIC8ve3svYmVhdGxlc319XG4gKlxuICogLy9PYmplY3QgQGVhY2hcbiAqIHt7I2JlYXRsZXN9fVxuICogIHt7I0BlYWNofX1cbiAqICAgICAge3tAa2V5fX0gOiB7e0B2YWx1ZS5maXJzdE5hbWV9fSB7e0B2YWx1ZS5sYXN0TmFtZX19XG4gKiAge3svQGVhY2h9fVxuICoge3svYmVhdGxlc319XG4gKlxuICogYGBgXG4gKi9cblxuXG5cbmxldCBBWDYgPSB7fTtcblxuKGZ1bmN0aW9uIGRlZmluZU11c3RhY2hlKGdsb2JhbCwgZmFjdG9yeSkge1xuXG4gIGZhY3RvcnkoZ2xvYmFsLm11c3RhY2hlID0ge30pO1xuXG59KEFYNiwgZnVuY3Rpb24gbXVzdGFjaGVGYWN0b3J5KG11c3RhY2hlKSB7XG5cbiAgdmFyIG9iamVjdFRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbiAgdmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIGlzQXJyYXlQb2x5ZmlsbChvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0VG9TdHJpbmcuY2FsbChvYmplY3QpID09PSAnW29iamVjdCBBcnJheV0nO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGlzRnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmplY3QgPT09ICdmdW5jdGlvbic7XG4gIH1cblxuICAvKipcbiAgICogTW9yZSBjb3JyZWN0IHR5cGVvZiBzdHJpbmcgaGFuZGxpbmcgYXJyYXlcbiAgICogd2hpY2ggbm9ybWFsbHkgcmV0dXJucyB0eXBlb2YgJ29iamVjdCdcbiAgICovXG4gIGZ1bmN0aW9uIHR5cGVTdHIob2JqKSB7XG4gICAgcmV0dXJuIGlzQXJyYXkob2JqKSA/ICdhcnJheScgOiB0eXBlb2Ygb2JqO1xuICB9XG5cbiAgZnVuY3Rpb24gZXNjYXBlUmVnRXhwKHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvW1xcLVxcW1xcXXt9KCkqKz8uLFxcXFxcXF4kfCNcXHNdL2csICdcXFxcJCYnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOdWxsIHNhZmUgd2F5IG9mIGNoZWNraW5nIHdoZXRoZXIgb3Igbm90IGFuIG9iamVjdCxcbiAgICogaW5jbHVkaW5nIGl0cyBwcm90b3R5cGUsIGhhcyBhIGdpdmVuIHByb3BlcnR5XG4gICAqL1xuICBmdW5jdGlvbiBoYXNQcm9wZXJ0eShvYmosIHByb3BOYW1lKSB7XG4gICAgcmV0dXJuIG9iaiAhPSBudWxsICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIChwcm9wTmFtZSBpbiBvYmopO1xuICB9XG5cbiAgLy8gV29ya2Fyb3VuZCBmb3IgaHR0cHM6Ly9pc3N1ZXMuYXBhY2hlLm9yZy9qaXJhL2Jyb3dzZS9DT1VDSERCLTU3N1xuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2phbmwvbXVzdGFjaGUuanMvaXNzdWVzLzE4OVxuICB2YXIgcmVnRXhwVGVzdCA9IFJlZ0V4cC5wcm90b3R5cGUudGVzdDtcblxuICBmdW5jdGlvbiB0ZXN0UmVnRXhwKHJlLCBzdHJpbmcpIHtcbiAgICByZXR1cm4gcmVnRXhwVGVzdC5jYWxsKHJlLCBzdHJpbmcpO1xuICB9XG5cbiAgdmFyIG5vblNwYWNlUmUgPSAvXFxTLztcblxuICBmdW5jdGlvbiBpc1doaXRlc3BhY2Uoc3RyaW5nKSB7XG4gICAgcmV0dXJuICF0ZXN0UmVnRXhwKG5vblNwYWNlUmUsIHN0cmluZyk7XG4gIH1cblxuICB2YXIgZW50aXR5TWFwID0ge1xuICAgICcmJzogJyZhbXA7JywgJzwnOiAnJmx0OycsICc+JzogJyZndDsnLCAnXCInOiAnJnF1b3Q7JywgXCInXCI6ICcmIzM5OycsICcvJzogJyYjeDJGOydcbiAgfTtcblxuICBmdW5jdGlvbiBlc2NhcGVIdG1sKHN0cmluZykge1xuICAgIHJldHVybiBTdHJpbmcoc3RyaW5nKS5yZXBsYWNlKC9bJjw+XCInXFwvXS9nLCBmdW5jdGlvbiBmcm9tRW50aXR5TWFwKHMpIHtcbiAgICAgIHJldHVybiBlbnRpdHlNYXBbc107XG4gICAgfSk7XG4gIH1cblxuICB2YXIgd2hpdGVSZSA9IC9cXHMqLztcbiAgdmFyIHNwYWNlUmUgPSAvXFxzKy87XG4gIHZhciBlcXVhbHNSZSA9IC9cXHMqPS87XG4gIHZhciBjdXJseVJlID0gL1xccypcXH0vO1xuICB2YXIgdGFnUmUgPSAvI3xcXF58XFwvfD58XFx7fCZ8PXwhLztcblxuICAvKipcbiAgICogQnJlYWtzIHVwIHRoZSBnaXZlbiBgdGVtcGxhdGVgIHN0cmluZyBpbnRvIGEgdHJlZSBvZiB0b2tlbnMuIElmIHRoZSBgdGFnc2BcbiAgICogYXJndW1lbnQgaXMgZ2l2ZW4gaGVyZSBpdCBtdXN0IGJlIGFuIGFycmF5IHdpdGggdHdvIHN0cmluZyB2YWx1ZXM6IHRoZVxuICAgKiBvcGVuaW5nIGFuZCBjbG9zaW5nIHRhZ3MgdXNlZCBpbiB0aGUgdGVtcGxhdGUgKGUuZy4gWyBcIjwlXCIsIFwiJT5cIiBdKS4gT2ZcbiAgICogY291cnNlLCB0aGUgZGVmYXVsdCBpcyB0byB1c2UgbXVzdGFjaGVzIChpLmUuIG11c3RhY2hlLnRhZ3MpLlxuICAgKlxuICAgKiBBIHRva2VuIGlzIGFuIGFycmF5IHdpdGggYXQgbGVhc3QgNCBlbGVtZW50cy4gVGhlIGZpcnN0IGVsZW1lbnQgaXMgdGhlXG4gICAqIG11c3RhY2hlIHN5bWJvbCB0aGF0IHdhcyB1c2VkIGluc2lkZSB0aGUgdGFnLCBlLmcuIFwiI1wiIG9yIFwiJlwiLiBJZiB0aGUgdGFnXG4gICAqIGRpZCBub3QgY29udGFpbiBhIHN5bWJvbCAoaS5lLiB7e215VmFsdWV9fSkgdGhpcyBlbGVtZW50IGlzIFwibmFtZVwiLiBGb3JcbiAgICogYWxsIHRleHQgdGhhdCBhcHBlYXJzIG91dHNpZGUgYSBzeW1ib2wgdGhpcyBlbGVtZW50IGlzIFwidGV4dFwiLlxuICAgKlxuICAgKiBUaGUgc2Vjb25kIGVsZW1lbnQgb2YgYSB0b2tlbiBpcyBpdHMgXCJ2YWx1ZVwiLiBGb3IgbXVzdGFjaGUgdGFncyB0aGlzIGlzXG4gICAqIHdoYXRldmVyIGVsc2Ugd2FzIGluc2lkZSB0aGUgdGFnIGJlc2lkZXMgdGhlIG9wZW5pbmcgc3ltYm9sLiBGb3IgdGV4dCB0b2tlbnNcbiAgICogdGhpcyBpcyB0aGUgdGV4dCBpdHNlbGYuXG4gICAqXG4gICAqIFRoZSB0aGlyZCBhbmQgZm91cnRoIGVsZW1lbnRzIG9mIHRoZSB0b2tlbiBhcmUgdGhlIHN0YXJ0IGFuZCBlbmQgaW5kaWNlcyxcbiAgICogcmVzcGVjdGl2ZWx5LCBvZiB0aGUgdG9rZW4gaW4gdGhlIG9yaWdpbmFsIHRlbXBsYXRlLlxuICAgKlxuICAgKiBUb2tlbnMgdGhhdCBhcmUgdGhlIHJvb3Qgbm9kZSBvZiBhIHN1YnRyZWUgY29udGFpbiB0d28gbW9yZSBlbGVtZW50czogMSkgYW5cbiAgICogYXJyYXkgb2YgdG9rZW5zIGluIHRoZSBzdWJ0cmVlIGFuZCAyKSB0aGUgaW5kZXggaW4gdGhlIG9yaWdpbmFsIHRlbXBsYXRlIGF0XG4gICAqIHdoaWNoIHRoZSBjbG9zaW5nIHRhZyBmb3IgdGhhdCBzZWN0aW9uIGJlZ2lucy5cbiAgICovXG4gIGZ1bmN0aW9uIHBhcnNlVGVtcGxhdGUodGVtcGxhdGUsIHRhZ3MpIHtcbiAgICBpZiAoIXRlbXBsYXRlKVxuICAgICAgcmV0dXJuIFtdO1xuXG4gICAgdmFyIHNlY3Rpb25zID0gW107ICAgICAvLyBTdGFjayB0byBob2xkIHNlY3Rpb24gdG9rZW5zXG4gICAgdmFyIHRva2VucyA9IFtdOyAgICAgICAvLyBCdWZmZXIgdG8gaG9sZCB0aGUgdG9rZW5zXG4gICAgdmFyIHNwYWNlcyA9IFtdOyAgICAgICAvLyBJbmRpY2VzIG9mIHdoaXRlc3BhY2UgdG9rZW5zIG9uIHRoZSBjdXJyZW50IGxpbmVcbiAgICB2YXIgaGFzVGFnID0gZmFsc2U7ICAgIC8vIElzIHRoZXJlIGEge3t0YWd9fSBvbiB0aGUgY3VycmVudCBsaW5lP1xuICAgIHZhciBub25TcGFjZSA9IGZhbHNlOyAgLy8gSXMgdGhlcmUgYSBub24tc3BhY2UgY2hhciBvbiB0aGUgY3VycmVudCBsaW5lP1xuXG4gICAgLy8gU3RyaXBzIGFsbCB3aGl0ZXNwYWNlIHRva2VucyBhcnJheSBmb3IgdGhlIGN1cnJlbnQgbGluZVxuICAgIC8vIGlmIHRoZXJlIHdhcyBhIHt7I3RhZ319IG9uIGl0IGFuZCBvdGhlcndpc2Ugb25seSBzcGFjZS5cbiAgICBmdW5jdGlvbiBzdHJpcFNwYWNlKCkge1xuICAgICAgaWYgKGhhc1RhZyAmJiAhbm9uU3BhY2UpIHtcbiAgICAgICAgd2hpbGUgKHNwYWNlcy5sZW5ndGgpXG4gICAgICAgICAgZGVsZXRlIHRva2Vuc1tzcGFjZXMucG9wKCldO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHNwYWNlcyA9IFtdO1xuICAgICAgfVxuXG4gICAgICBoYXNUYWcgPSBmYWxzZTtcbiAgICAgIG5vblNwYWNlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIG9wZW5pbmdUYWdSZSwgY2xvc2luZ1RhZ1JlLCBjbG9zaW5nQ3VybHlSZTtcblxuICAgIGZ1bmN0aW9uIGNvbXBpbGVUYWdzKHRhZ3NUb0NvbXBpbGUpIHtcbiAgICAgIGlmICh0eXBlb2YgdGFnc1RvQ29tcGlsZSA9PT0gJ3N0cmluZycpXG4gICAgICAgIHRhZ3NUb0NvbXBpbGUgPSB0YWdzVG9Db21waWxlLnNwbGl0KHNwYWNlUmUsIDIpO1xuXG4gICAgICBpZiAoIWlzQXJyYXkodGFnc1RvQ29tcGlsZSkgfHwgdGFnc1RvQ29tcGlsZS5sZW5ndGggIT09IDIpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCB0YWdzOiAnICsgdGFnc1RvQ29tcGlsZSk7XG5cbiAgICAgIG9wZW5pbmdUYWdSZSA9IG5ldyBSZWdFeHAoZXNjYXBlUmVnRXhwKHRhZ3NUb0NvbXBpbGVbMF0pICsgJ1xcXFxzKicpO1xuICAgICAgY2xvc2luZ1RhZ1JlID0gbmV3IFJlZ0V4cCgnXFxcXHMqJyArIGVzY2FwZVJlZ0V4cCh0YWdzVG9Db21waWxlWzFdKSk7XG4gICAgICBjbG9zaW5nQ3VybHlSZSA9IG5ldyBSZWdFeHAoJ1xcXFxzKicgKyBlc2NhcGVSZWdFeHAoJ30nICsgdGFnc1RvQ29tcGlsZVsxXSkpO1xuICAgIH1cblxuICAgIGNvbXBpbGVUYWdzKHRhZ3MgfHwgbXVzdGFjaGUudGFncyk7XG5cbiAgICB2YXIgc2Nhbm5lciA9IG5ldyBTY2FubmVyKHRlbXBsYXRlKTtcblxuICAgIHZhciBzdGFydCwgdHlwZSwgdmFsdWUsIGNociwgdG9rZW4sIG9wZW5TZWN0aW9uO1xuICAgIHdoaWxlICghc2Nhbm5lci5lb3MoKSkge1xuICAgICAgc3RhcnQgPSBzY2FubmVyLnBvcztcblxuICAgICAgLy8gTWF0Y2ggYW55IHRleHQgYmV0d2VlbiB0YWdzLlxuICAgICAgdmFsdWUgPSBzY2FubmVyLnNjYW5VbnRpbChvcGVuaW5nVGFnUmUpO1xuXG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHZhbHVlTGVuZ3RoID0gdmFsdWUubGVuZ3RoOyBpIDwgdmFsdWVMZW5ndGg7ICsraSkge1xuICAgICAgICAgIGNociA9IHZhbHVlLmNoYXJBdChpKTtcblxuICAgICAgICAgIGlmIChpc1doaXRlc3BhY2UoY2hyKSkge1xuICAgICAgICAgICAgc3BhY2VzLnB1c2godG9rZW5zLmxlbmd0aCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbm9uU3BhY2UgPSB0cnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRva2Vucy5wdXNoKFsndGV4dCcsIGNociwgc3RhcnQsIHN0YXJ0ICsgMV0pO1xuICAgICAgICAgIHN0YXJ0ICs9IDE7XG5cbiAgICAgICAgICAvLyBDaGVjayBmb3Igd2hpdGVzcGFjZSBvbiB0aGUgY3VycmVudCBsaW5lLlxuICAgICAgICAgIGlmIChjaHIgPT09ICdcXG4nKVxuICAgICAgICAgICAgc3RyaXBTcGFjZSgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIE1hdGNoIHRoZSBvcGVuaW5nIHRhZy5cbiAgICAgIGlmICghc2Nhbm5lci5zY2FuKG9wZW5pbmdUYWdSZSkpXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBoYXNUYWcgPSB0cnVlO1xuXG4gICAgICAvLyBHZXQgdGhlIHRhZyB0eXBlLlxuICAgICAgdHlwZSA9IHNjYW5uZXIuc2Nhbih0YWdSZSkgfHwgJ25hbWUnO1xuICAgICAgc2Nhbm5lci5zY2FuKHdoaXRlUmUpO1xuXG4gICAgICAvLyBHZXQgdGhlIHRhZyB2YWx1ZS5cbiAgICAgIGlmICh0eXBlID09PSAnPScpIHtcbiAgICAgICAgdmFsdWUgPSBzY2FubmVyLnNjYW5VbnRpbChlcXVhbHNSZSk7XG4gICAgICAgIHNjYW5uZXIuc2NhbihlcXVhbHNSZSk7XG4gICAgICAgIHNjYW5uZXIuc2NhblVudGlsKGNsb3NpbmdUYWdSZSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0eXBlID09PSAneycpIHtcbiAgICAgICAgdmFsdWUgPSBzY2FubmVyLnNjYW5VbnRpbChjbG9zaW5nQ3VybHlSZSk7XG4gICAgICAgIHNjYW5uZXIuc2NhbihjdXJseVJlKTtcbiAgICAgICAgc2Nhbm5lci5zY2FuVW50aWwoY2xvc2luZ1RhZ1JlKTtcbiAgICAgICAgdHlwZSA9ICcmJztcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IHNjYW5uZXIuc2NhblVudGlsKGNsb3NpbmdUYWdSZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIE1hdGNoIHRoZSBjbG9zaW5nIHRhZy5cbiAgICAgIGlmICghc2Nhbm5lci5zY2FuKGNsb3NpbmdUYWdSZSkpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5jbG9zZWQgdGFnIGF0ICcgKyBzY2FubmVyLnBvcyk7XG5cbiAgICAgIHRva2VuID0gW3R5cGUsIHZhbHVlLCBzdGFydCwgc2Nhbm5lci5wb3NdO1xuICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuXG4gICAgICBpZiAodHlwZSA9PT0gJyMnIHx8IHR5cGUgPT09ICdeJykge1xuICAgICAgICBzZWN0aW9ucy5wdXNoKHRva2VuKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICcvJykge1xuICAgICAgICAvLyBDaGVjayBzZWN0aW9uIG5lc3RpbmcuXG4gICAgICAgIG9wZW5TZWN0aW9uID0gc2VjdGlvbnMucG9wKCk7XG5cbiAgICAgICAgaWYgKCFvcGVuU2VjdGlvbilcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vub3BlbmVkIHNlY3Rpb24gXCInICsgdmFsdWUgKyAnXCIgYXQgJyArIHN0YXJ0KTtcblxuICAgICAgICBpZiAob3BlblNlY3Rpb25bMV0gIT09IHZhbHVlKVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5jbG9zZWQgc2VjdGlvbiBcIicgKyBvcGVuU2VjdGlvblsxXSArICdcIiBhdCAnICsgc3RhcnQpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJ25hbWUnIHx8IHR5cGUgPT09ICd7JyB8fCB0eXBlID09PSAnJicpIHtcbiAgICAgICAgbm9uU3BhY2UgPSB0cnVlO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJz0nKSB7XG4gICAgICAgIC8vIFNldCB0aGUgdGFncyBmb3IgdGhlIG5leHQgdGltZSBhcm91bmQuXG4gICAgICAgIGNvbXBpbGVUYWdzKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhlcmUgYXJlIG5vIG9wZW4gc2VjdGlvbnMgd2hlbiB3ZSdyZSBkb25lLlxuICAgIG9wZW5TZWN0aW9uID0gc2VjdGlvbnMucG9wKCk7XG5cbiAgICBpZiAob3BlblNlY3Rpb24pXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuY2xvc2VkIHNlY3Rpb24gXCInICsgb3BlblNlY3Rpb25bMV0gKyAnXCIgYXQgJyArIHNjYW5uZXIucG9zKTtcblxuICAgIHJldHVybiBuZXN0VG9rZW5zKHNxdWFzaFRva2Vucyh0b2tlbnMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21iaW5lcyB0aGUgdmFsdWVzIG9mIGNvbnNlY3V0aXZlIHRleHQgdG9rZW5zIGluIHRoZSBnaXZlbiBgdG9rZW5zYCBhcnJheVxuICAgKiB0byBhIHNpbmdsZSB0b2tlbi5cbiAgICovXG4gIGZ1bmN0aW9uIHNxdWFzaFRva2Vucyh0b2tlbnMpIHtcbiAgICB2YXIgc3F1YXNoZWRUb2tlbnMgPSBbXTtcblxuICAgIHZhciB0b2tlbiwgbGFzdFRva2VuO1xuICAgIGZvciAodmFyIGkgPSAwLCBudW1Ub2tlbnMgPSB0b2tlbnMubGVuZ3RoOyBpIDwgbnVtVG9rZW5zOyArK2kpIHtcbiAgICAgIHRva2VuID0gdG9rZW5zW2ldO1xuXG4gICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgaWYgKHRva2VuWzBdID09PSAndGV4dCcgJiYgbGFzdFRva2VuICYmIGxhc3RUb2tlblswXSA9PT0gJ3RleHQnKSB7XG4gICAgICAgICAgbGFzdFRva2VuWzFdICs9IHRva2VuWzFdO1xuICAgICAgICAgIGxhc3RUb2tlblszXSA9IHRva2VuWzNdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHNxdWFzaGVkVG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICAgIGxhc3RUb2tlbiA9IHRva2VuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNxdWFzaGVkVG9rZW5zO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvcm1zIHRoZSBnaXZlbiBhcnJheSBvZiBgdG9rZW5zYCBpbnRvIGEgbmVzdGVkIHRyZWUgc3RydWN0dXJlIHdoZXJlXG4gICAqIHRva2VucyB0aGF0IHJlcHJlc2VudCBhIHNlY3Rpb24gaGF2ZSB0d28gYWRkaXRpb25hbCBpdGVtczogMSkgYW4gYXJyYXkgb2ZcbiAgICogYWxsIHRva2VucyB0aGF0IGFwcGVhciBpbiB0aGF0IHNlY3Rpb24gYW5kIDIpIHRoZSBpbmRleCBpbiB0aGUgb3JpZ2luYWxcbiAgICogdGVtcGxhdGUgdGhhdCByZXByZXNlbnRzIHRoZSBlbmQgb2YgdGhhdCBzZWN0aW9uLlxuICAgKi9cbiAgZnVuY3Rpb24gbmVzdFRva2Vucyh0b2tlbnMpIHtcbiAgICB2YXIgbmVzdGVkVG9rZW5zID0gW107XG4gICAgdmFyIGNvbGxlY3RvciA9IG5lc3RlZFRva2VucztcbiAgICB2YXIgc2VjdGlvbnMgPSBbXTtcblxuICAgIHZhciB0b2tlbiwgc2VjdGlvbjtcbiAgICBmb3IgKHZhciBpID0gMCwgbnVtVG9rZW5zID0gdG9rZW5zLmxlbmd0aDsgaSA8IG51bVRva2VuczsgKytpKSB7XG4gICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcblxuICAgICAgc3dpdGNoICh0b2tlblswXSkge1xuICAgICAgICBjYXNlICcjJzpcbiAgICAgICAgY2FzZSAnXic6XG4gICAgICAgICAgY29sbGVjdG9yLnB1c2godG9rZW4pO1xuICAgICAgICAgIHNlY3Rpb25zLnB1c2godG9rZW4pO1xuICAgICAgICAgIGNvbGxlY3RvciA9IHRva2VuWzRdID0gW107XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJy8nOlxuICAgICAgICAgIHNlY3Rpb24gPSBzZWN0aW9ucy5wb3AoKTtcbiAgICAgICAgICBzZWN0aW9uWzVdID0gdG9rZW5bMl07XG4gICAgICAgICAgY29sbGVjdG9yID0gc2VjdGlvbnMubGVuZ3RoID4gMCA/IHNlY3Rpb25zW3NlY3Rpb25zLmxlbmd0aCAtIDFdWzRdIDogbmVzdGVkVG9rZW5zO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGNvbGxlY3Rvci5wdXNoKHRva2VuKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmVzdGVkVG9rZW5zO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgc2ltcGxlIHN0cmluZyBzY2FubmVyIHRoYXQgaXMgdXNlZCBieSB0aGUgdGVtcGxhdGUgcGFyc2VyIHRvIGZpbmRcbiAgICogdG9rZW5zIGluIHRlbXBsYXRlIHN0cmluZ3MuXG4gICAqL1xuICBmdW5jdGlvbiBTY2FubmVyKHN0cmluZykge1xuICAgIHRoaXMuc3RyaW5nID0gc3RyaW5nO1xuICAgIHRoaXMudGFpbCA9IHN0cmluZztcbiAgICB0aGlzLnBvcyA9IDA7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHRhaWwgaXMgZW1wdHkgKGVuZCBvZiBzdHJpbmcpLlxuICAgKi9cbiAgU2Nhbm5lci5wcm90b3R5cGUuZW9zID0gZnVuY3Rpb24gZW9zKCkge1xuICAgIHJldHVybiB0aGlzLnRhaWwgPT09ICcnO1xuICB9O1xuXG4gIC8qKlxuICAgKiBUcmllcyB0byBtYXRjaCB0aGUgZ2l2ZW4gcmVndWxhciBleHByZXNzaW9uIGF0IHRoZSBjdXJyZW50IHBvc2l0aW9uLlxuICAgKiBSZXR1cm5zIHRoZSBtYXRjaGVkIHRleHQgaWYgaXQgY2FuIG1hdGNoLCB0aGUgZW1wdHkgc3RyaW5nIG90aGVyd2lzZS5cbiAgICovXG4gIFNjYW5uZXIucHJvdG90eXBlLnNjYW4gPSBmdW5jdGlvbiBzY2FuKHJlKSB7XG4gICAgdmFyIG1hdGNoID0gdGhpcy50YWlsLm1hdGNoKHJlKTtcblxuICAgIGlmICghbWF0Y2ggfHwgbWF0Y2guaW5kZXggIT09IDApXG4gICAgICByZXR1cm4gJyc7XG5cbiAgICB2YXIgc3RyaW5nID0gbWF0Y2hbMF07XG5cbiAgICB0aGlzLnRhaWwgPSB0aGlzLnRhaWwuc3Vic3RyaW5nKHN0cmluZy5sZW5ndGgpO1xuICAgIHRoaXMucG9zICs9IHN0cmluZy5sZW5ndGg7XG5cbiAgICByZXR1cm4gc3RyaW5nO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTa2lwcyBhbGwgdGV4dCB1bnRpbCB0aGUgZ2l2ZW4gcmVndWxhciBleHByZXNzaW9uIGNhbiBiZSBtYXRjaGVkLiBSZXR1cm5zXG4gICAqIHRoZSBza2lwcGVkIHN0cmluZywgd2hpY2ggaXMgdGhlIGVudGlyZSB0YWlsIGlmIG5vIG1hdGNoIGNhbiBiZSBtYWRlLlxuICAgKi9cbiAgU2Nhbm5lci5wcm90b3R5cGUuc2NhblVudGlsID0gZnVuY3Rpb24gc2NhblVudGlsKHJlKSB7XG4gICAgdmFyIGluZGV4ID0gdGhpcy50YWlsLnNlYXJjaChyZSksIG1hdGNoO1xuXG4gICAgc3dpdGNoIChpbmRleCkge1xuICAgICAgY2FzZSAtMTpcbiAgICAgICAgbWF0Y2ggPSB0aGlzLnRhaWw7XG4gICAgICAgIHRoaXMudGFpbCA9ICcnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgbWF0Y2ggPSAnJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBtYXRjaCA9IHRoaXMudGFpbC5zdWJzdHJpbmcoMCwgaW5kZXgpO1xuICAgICAgICB0aGlzLnRhaWwgPSB0aGlzLnRhaWwuc3Vic3RyaW5nKGluZGV4KTtcbiAgICB9XG5cbiAgICB0aGlzLnBvcyArPSBtYXRjaC5sZW5ndGg7XG5cbiAgICByZXR1cm4gbWF0Y2g7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlcHJlc2VudHMgYSByZW5kZXJpbmcgY29udGV4dCBieSB3cmFwcGluZyBhIHZpZXcgb2JqZWN0IGFuZFxuICAgKiBtYWludGFpbmluZyBhIHJlZmVyZW5jZSB0byB0aGUgcGFyZW50IGNvbnRleHQuXG4gICAqL1xuICBmdW5jdGlvbiBDb250ZXh0KHZpZXcsIHBhcmVudENvbnRleHQpIHtcbiAgICB0aGlzLnZpZXcgPSB2aWV3O1xuICAgIHRoaXMuY2FjaGUgPSB7XG4gICAgICAnLic6IHRoaXMudmlldyxcbiAgICAgICdAZWFjaCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJldHVybnMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgayBpbiB0aGlzKSB7XG4gICAgICAgICAgcmV0dXJucy5wdXNoKHsnQGtleSc6IGssICdAdmFsdWUnOiB0aGlzW2tdfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldHVybnM7XG4gICAgICB9XG4gICAgfTtcbiAgICB0aGlzLnBhcmVudCA9IHBhcmVudENvbnRleHQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBjb250ZXh0IHVzaW5nIHRoZSBnaXZlbiB2aWV3IHdpdGggdGhpcyBjb250ZXh0XG4gICAqIGFzIHRoZSBwYXJlbnQuXG4gICAqL1xuICBDb250ZXh0LnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gcHVzaCh2aWV3KSB7XG4gICAgcmV0dXJuIG5ldyBDb250ZXh0KHZpZXcsIHRoaXMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gbmFtZSBpbiB0aGlzIGNvbnRleHQsIHRyYXZlcnNpbmdcbiAgICogdXAgdGhlIGNvbnRleHQgaGllcmFyY2h5IGlmIHRoZSB2YWx1ZSBpcyBhYnNlbnQgaW4gdGhpcyBjb250ZXh0J3Mgdmlldy5cbiAgICovXG4gIENvbnRleHQucHJvdG90eXBlLmxvb2t1cCA9IGZ1bmN0aW9uIGxvb2t1cChuYW1lKSB7XG4gICAgdmFyIGNhY2hlID0gdGhpcy5jYWNoZTtcblxuICAgIHZhciB2YWx1ZTtcbiAgICBpZiAoY2FjaGUuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgIHZhbHVlID0gY2FjaGVbbmFtZV07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLCBuYW1lcywgaW5kZXgsIGxvb2t1cEhpdCA9IGZhbHNlO1xuXG4gICAgICB3aGlsZSAoY29udGV4dCkge1xuICAgICAgICBpZiAobmFtZS5pbmRleE9mKCcuJykgPiAwKSB7XG4gICAgICAgICAgdmFsdWUgPSBjb250ZXh0LnZpZXc7XG4gICAgICAgICAgbmFtZXMgPSBuYW1lLnNwbGl0KCcuJyk7XG4gICAgICAgICAgaW5kZXggPSAwO1xuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogVXNpbmcgdGhlIGRvdCBub3Rpb24gcGF0aCBpbiBgbmFtZWAsIHdlIGRlc2NlbmQgdGhyb3VnaCB0aGVcbiAgICAgICAgICAgKiBuZXN0ZWQgb2JqZWN0cy5cbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIFRvIGJlIGNlcnRhaW4gdGhhdCB0aGUgbG9va3VwIGhhcyBiZWVuIHN1Y2Nlc3NmdWwsIHdlIGhhdmUgdG9cbiAgICAgICAgICAgKiBjaGVjayBpZiB0aGUgbGFzdCBvYmplY3QgaW4gdGhlIHBhdGggYWN0dWFsbHkgaGFzIHRoZSBwcm9wZXJ0eVxuICAgICAgICAgICAqIHdlIGFyZSBsb29raW5nIGZvci4gV2Ugc3RvcmUgdGhlIHJlc3VsdCBpbiBgbG9va3VwSGl0YC5cbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIFRoaXMgaXMgc3BlY2lhbGx5IG5lY2Vzc2FyeSBmb3Igd2hlbiB0aGUgdmFsdWUgaGFzIGJlZW4gc2V0IHRvXG4gICAgICAgICAgICogYHVuZGVmaW5lZGAgYW5kIHdlIHdhbnQgdG8gYXZvaWQgbG9va2luZyB1cCBwYXJlbnQgY29udGV4dHMuXG4gICAgICAgICAgICoqL1xuICAgICAgICAgIHdoaWxlICh2YWx1ZSAhPSBudWxsICYmIGluZGV4IDwgbmFtZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IG5hbWVzLmxlbmd0aCAtIDEpXG4gICAgICAgICAgICAgIGxvb2t1cEhpdCA9IGhhc1Byb3BlcnR5KHZhbHVlLCBuYW1lc1tpbmRleF0pO1xuXG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlW25hbWVzW2luZGV4KytdXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdmFsdWUgPSBjb250ZXh0LnZpZXdbbmFtZV07XG4gICAgICAgICAgbG9va3VwSGl0ID0gaGFzUHJvcGVydHkoY29udGV4dC52aWV3LCBuYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsb29rdXBIaXQpXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY29udGV4dCA9IGNvbnRleHQucGFyZW50O1xuICAgICAgfVxuXG4gICAgICBjYWNoZVtuYW1lXSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSlcbiAgICAgIHZhbHVlID0gdmFsdWUuY2FsbCh0aGlzLnZpZXcpO1xuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBIFdyaXRlciBrbm93cyBob3cgdG8gdGFrZSBhIHN0cmVhbSBvZiB0b2tlbnMgYW5kIHJlbmRlciB0aGVtIHRvIGFcbiAgICogc3RyaW5nLCBnaXZlbiBhIGNvbnRleHQuIEl0IGFsc28gbWFpbnRhaW5zIGEgY2FjaGUgb2YgdGVtcGxhdGVzIHRvXG4gICAqIGF2b2lkIHRoZSBuZWVkIHRvIHBhcnNlIHRoZSBzYW1lIHRlbXBsYXRlIHR3aWNlLlxuICAgKi9cbiAgZnVuY3Rpb24gV3JpdGVyKCkge1xuICAgIHRoaXMuY2FjaGUgPSB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgYWxsIGNhY2hlZCB0ZW1wbGF0ZXMgaW4gdGhpcyB3cml0ZXIuXG4gICAqL1xuICBXcml0ZXIucHJvdG90eXBlLmNsZWFyQ2FjaGUgPSBmdW5jdGlvbiBjbGVhckNhY2hlKCkge1xuICAgIHRoaXMuY2FjaGUgPSB7fTtcbiAgfTtcblxuICAvKipcbiAgICogUGFyc2VzIGFuZCBjYWNoZXMgdGhlIGdpdmVuIGB0ZW1wbGF0ZWAgYW5kIHJldHVybnMgdGhlIGFycmF5IG9mIHRva2Vuc1xuICAgKiB0aGF0IGlzIGdlbmVyYXRlZCBmcm9tIHRoZSBwYXJzZS5cbiAgICovXG4gIFdyaXRlci5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbiBwYXJzZSh0ZW1wbGF0ZSwgdGFncykge1xuICAgIHZhciBjYWNoZSA9IHRoaXMuY2FjaGU7XG4gICAgdmFyIHRva2VucyA9IGNhY2hlW3RlbXBsYXRlXTtcblxuICAgIGlmICh0b2tlbnMgPT0gbnVsbClcbiAgICAgIHRva2VucyA9IGNhY2hlW3RlbXBsYXRlXSA9IHBhcnNlVGVtcGxhdGUodGVtcGxhdGUsIHRhZ3MpO1xuXG4gICAgcmV0dXJuIHRva2VucztcbiAgfTtcblxuICAvKipcbiAgICogSGlnaC1sZXZlbCBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIHJlbmRlciB0aGUgZ2l2ZW4gYHRlbXBsYXRlYCB3aXRoXG4gICAqIHRoZSBnaXZlbiBgdmlld2AuXG4gICAqXG4gICAqIFRoZSBvcHRpb25hbCBgcGFydGlhbHNgIGFyZ3VtZW50IG1heSBiZSBhbiBvYmplY3QgdGhhdCBjb250YWlucyB0aGVcbiAgICogbmFtZXMgYW5kIHRlbXBsYXRlcyBvZiBwYXJ0aWFscyB0aGF0IGFyZSB1c2VkIGluIHRoZSB0ZW1wbGF0ZS4gSXQgbWF5XG4gICAqIGFsc28gYmUgYSBmdW5jdGlvbiB0aGF0IGlzIHVzZWQgdG8gbG9hZCBwYXJ0aWFsIHRlbXBsYXRlcyBvbiB0aGUgZmx5XG4gICAqIHRoYXQgdGFrZXMgYSBzaW5nbGUgYXJndW1lbnQ6IHRoZSBuYW1lIG9mIHRoZSBwYXJ0aWFsLlxuICAgKi9cbiAgV3JpdGVyLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIodGVtcGxhdGUsIHZpZXcsIHBhcnRpYWxzKSB7XG4gICAgdmFyIHRva2VucyA9IHRoaXMucGFyc2UodGVtcGxhdGUpO1xuICAgIHZhciBjb250ZXh0ID0gKHZpZXcgaW5zdGFuY2VvZiBDb250ZXh0KSA/IHZpZXcgOiBuZXcgQ29udGV4dCh2aWV3KTtcbiAgICByZXR1cm4gdGhpcy5yZW5kZXJUb2tlbnModG9rZW5zLCBjb250ZXh0LCBwYXJ0aWFscywgdGVtcGxhdGUpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBMb3ctbGV2ZWwgbWV0aG9kIHRoYXQgcmVuZGVycyB0aGUgZ2l2ZW4gYXJyYXkgb2YgYHRva2Vuc2AgdXNpbmdcbiAgICogdGhlIGdpdmVuIGBjb250ZXh0YCBhbmQgYHBhcnRpYWxzYC5cbiAgICpcbiAgICogTm90ZTogVGhlIGBvcmlnaW5hbFRlbXBsYXRlYCBpcyBvbmx5IGV2ZXIgdXNlZCB0byBleHRyYWN0IHRoZSBwb3J0aW9uXG4gICAqIG9mIHRoZSBvcmlnaW5hbCB0ZW1wbGF0ZSB0aGF0IHdhcyBjb250YWluZWQgaW4gYSBoaWdoZXItb3JkZXIgc2VjdGlvbi5cbiAgICogSWYgdGhlIHRlbXBsYXRlIGRvZXNuJ3QgdXNlIGhpZ2hlci1vcmRlciBzZWN0aW9ucywgdGhpcyBhcmd1bWVudCBtYXlcbiAgICogYmUgb21pdHRlZC5cbiAgICovXG4gIFdyaXRlci5wcm90b3R5cGUucmVuZGVyVG9rZW5zID0gZnVuY3Rpb24gcmVuZGVyVG9rZW5zKHRva2VucywgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpIHtcbiAgICB2YXIgYnVmZmVyID0gJyc7XG4gICAgdmFyIHRva2VuLCBzeW1ib2wsIHZhbHVlO1xuICAgIGZvciAodmFyIGkgPSAwLCBudW1Ub2tlbnMgPSB0b2tlbnMubGVuZ3RoOyBpIDwgbnVtVG9rZW5zOyArK2kpIHtcbiAgICAgIHZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgICBzeW1ib2wgPSB0b2tlblswXTtcblxuICAgICAgaWYgKHN5bWJvbCA9PT0gJyMnKSB2YWx1ZSA9IHRoaXMucmVuZGVyU2VjdGlvbih0b2tlbiwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xuICAgICAgZWxzZSBpZiAoc3ltYm9sID09PSAnXicpIHZhbHVlID0gdGhpcy5yZW5kZXJJbnZlcnRlZCh0b2tlbiwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xuICAgICAgZWxzZSBpZiAoc3ltYm9sID09PSAnPicpIHZhbHVlID0gdGhpcy5yZW5kZXJQYXJ0aWFsKHRva2VuLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XG4gICAgICBlbHNlIGlmIChzeW1ib2wgPT09ICcmJykgdmFsdWUgPSB0aGlzLnVuZXNjYXBlZFZhbHVlKHRva2VuLCBjb250ZXh0KTtcbiAgICAgIGVsc2UgaWYgKHN5bWJvbCA9PT0gJ25hbWUnKSB2YWx1ZSA9IHRoaXMuZXNjYXBlZFZhbHVlKHRva2VuLCBjb250ZXh0KTtcbiAgICAgIGVsc2UgaWYgKHN5bWJvbCA9PT0gJ3RleHQnKSB2YWx1ZSA9IHRoaXMucmF3VmFsdWUodG9rZW4pO1xuXG4gICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgYnVmZmVyICs9IHZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiBidWZmZXI7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5yZW5kZXJTZWN0aW9uID0gZnVuY3Rpb24gcmVuZGVyU2VjdGlvbih0b2tlbiwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGJ1ZmZlciA9ICcnO1xuXG4gICAgdmFyIHZhbHVlID0gY29udGV4dC5sb29rdXAodG9rZW5bMV0pO1xuXG4gICAgLy8gVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIHJlbmRlciBhbiBhcmJpdHJhcnkgdGVtcGxhdGVcbiAgICAvLyBpbiB0aGUgY3VycmVudCBjb250ZXh0IGJ5IGhpZ2hlci1vcmRlciBzZWN0aW9ucy5cbiAgICBmdW5jdGlvbiBzdWJSZW5kZXIodGVtcGxhdGUpIHtcbiAgICAgIHJldHVybiBzZWxmLnJlbmRlcih0ZW1wbGF0ZSwgY29udGV4dCwgcGFydGlhbHMpO1xuICAgIH1cblxuICAgIGlmICghdmFsdWUpIHJldHVybjtcblxuICAgIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgZm9yICh2YXIgaiA9IDAsIHZhbHVlTGVuZ3RoID0gdmFsdWUubGVuZ3RoOyBqIDwgdmFsdWVMZW5ndGg7ICsraikge1xuICAgICAgICBpZiAodmFsdWVbal0pIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlW2pdID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdmFsdWVbal1bJ0BpJ10gPSBqO1xuICAgICAgICAgICAgdmFsdWVbal1bJ0BmaXJzdCddID0gKGogPT09IDApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJ1ZmZlciArPSB0aGlzLnJlbmRlclRva2Vucyh0b2tlbls0XSwgY29udGV4dC5wdXNoKHZhbHVlW2pdKSwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICBidWZmZXIgKz0gdGhpcy5yZW5kZXJUb2tlbnModG9rZW5bNF0sIGNvbnRleHQucHVzaCh2YWx1ZSksIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICAgIGlmICh0eXBlb2Ygb3JpZ2luYWxUZW1wbGF0ZSAhPT0gJ3N0cmluZycpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHVzZSBoaWdoZXItb3JkZXIgc2VjdGlvbnMgd2l0aG91dCB0aGUgb3JpZ2luYWwgdGVtcGxhdGUnKTtcblxuICAgICAgLy8gRXh0cmFjdCB0aGUgcG9ydGlvbiBvZiB0aGUgb3JpZ2luYWwgdGVtcGxhdGUgdGhhdCB0aGUgc2VjdGlvbiBjb250YWlucy5cbiAgICAgIHZhbHVlID0gdmFsdWUuY2FsbChjb250ZXh0LnZpZXcsIG9yaWdpbmFsVGVtcGxhdGUuc2xpY2UodG9rZW5bM10sIHRva2VuWzVdKSwgc3ViUmVuZGVyKTtcblxuICAgICAgaWYgKHZhbHVlICE9IG51bGwpXG4gICAgICAgIGJ1ZmZlciArPSB2YWx1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBidWZmZXIgKz0gdGhpcy5yZW5kZXJUb2tlbnModG9rZW5bNF0sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgICB9XG4gICAgcmV0dXJuIGJ1ZmZlcjtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLnJlbmRlckludmVydGVkID0gZnVuY3Rpb24gcmVuZGVySW52ZXJ0ZWQodG9rZW4sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKSB7XG4gICAgdmFyIHZhbHVlID0gY29udGV4dC5sb29rdXAodG9rZW5bMV0pO1xuXG4gICAgLy8gVXNlIEphdmFTY3JpcHQncyBkZWZpbml0aW9uIG9mIGZhbHN5LiBJbmNsdWRlIGVtcHR5IGFycmF5cy5cbiAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2phbmwvbXVzdGFjaGUuanMvaXNzdWVzLzE4NlxuICAgIGlmICghdmFsdWUgfHwgKGlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmxlbmd0aCA9PT0gMCkpXG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJUb2tlbnModG9rZW5bNF0sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLnJlbmRlclBhcnRpYWwgPSBmdW5jdGlvbiByZW5kZXJQYXJ0aWFsKHRva2VuLCBjb250ZXh0LCBwYXJ0aWFscykge1xuICAgIGlmICghcGFydGlhbHMpIHJldHVybjtcblxuICAgIHZhciB2YWx1ZSA9IGlzRnVuY3Rpb24ocGFydGlhbHMpID8gcGFydGlhbHModG9rZW5bMV0pIDogcGFydGlhbHNbdG9rZW5bMV1dO1xuICAgIGlmICh2YWx1ZSAhPSBudWxsKVxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyVG9rZW5zKHRoaXMucGFyc2UodmFsdWUpLCBjb250ZXh0LCBwYXJ0aWFscywgdmFsdWUpO1xuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUudW5lc2NhcGVkVmFsdWUgPSBmdW5jdGlvbiB1bmVzY2FwZWRWYWx1ZSh0b2tlbiwgY29udGV4dCkge1xuICAgIHZhciB2YWx1ZSA9IGNvbnRleHQubG9va3VwKHRva2VuWzFdKTtcbiAgICBpZiAodmFsdWUgIT0gbnVsbClcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLmVzY2FwZWRWYWx1ZSA9IGZ1bmN0aW9uIGVzY2FwZWRWYWx1ZSh0b2tlbiwgY29udGV4dCkge1xuICAgIHZhciB2YWx1ZSA9IGNvbnRleHQubG9va3VwKHRva2VuWzFdKTtcbiAgICBpZiAodmFsdWUgIT0gbnVsbClcbiAgICAgIHJldHVybiBtdXN0YWNoZS5lc2NhcGUodmFsdWUpO1xuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUucmF3VmFsdWUgPSBmdW5jdGlvbiByYXdWYWx1ZSh0b2tlbikge1xuICAgIHJldHVybiB0b2tlblsxXTtcbiAgfTtcblxuICBtdXN0YWNoZS5uYW1lID0gJ211c3RhY2hlLmpzJztcbiAgbXVzdGFjaGUudmVyc2lvbiA9ICcyLjEuMyc7XG4gIG11c3RhY2hlLnRhZ3MgPSBbJ3t7JywgJ319J107XG5cbiAgLy8gQWxsIGhpZ2gtbGV2ZWwgbXVzdGFjaGUuKiBmdW5jdGlvbnMgdXNlIHRoaXMgd3JpdGVyLlxuICB2YXIgZGVmYXVsdFdyaXRlciA9IG5ldyBXcml0ZXIoKTtcblxuICAvKipcbiAgICogQ2xlYXJzIGFsbCBjYWNoZWQgdGVtcGxhdGVzIGluIHRoZSBkZWZhdWx0IHdyaXRlci5cbiAgICovXG4gIG11c3RhY2hlLmNsZWFyQ2FjaGUgPSBmdW5jdGlvbiBjbGVhckNhY2hlKCkge1xuICAgIHJldHVybiBkZWZhdWx0V3JpdGVyLmNsZWFyQ2FjaGUoKTtcbiAgfTtcblxuICAvKipcbiAgICogUGFyc2VzIGFuZCBjYWNoZXMgdGhlIGdpdmVuIHRlbXBsYXRlIGluIHRoZSBkZWZhdWx0IHdyaXRlciBhbmQgcmV0dXJucyB0aGVcbiAgICogYXJyYXkgb2YgdG9rZW5zIGl0IGNvbnRhaW5zLiBEb2luZyB0aGlzIGFoZWFkIG9mIHRpbWUgYXZvaWRzIHRoZSBuZWVkIHRvXG4gICAqIHBhcnNlIHRlbXBsYXRlcyBvbiB0aGUgZmx5IGFzIHRoZXkgYXJlIHJlbmRlcmVkLlxuICAgKi9cbiAgbXVzdGFjaGUucGFyc2UgPSBmdW5jdGlvbiBwYXJzZSh0ZW1wbGF0ZSwgdGFncykge1xuICAgIHJldHVybiBkZWZhdWx0V3JpdGVyLnBhcnNlKHRlbXBsYXRlLCB0YWdzKTtcbiAgfTtcblxuICAvKipcbiAgICogUmVuZGVycyB0aGUgYHRlbXBsYXRlYCB3aXRoIHRoZSBnaXZlbiBgdmlld2AgYW5kIGBwYXJ0aWFsc2AgdXNpbmcgdGhlXG4gICAqIGRlZmF1bHQgd3JpdGVyLlxuICAgKi9cbiAgbXVzdGFjaGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscykge1xuICAgIGlmICh0eXBlb2YgdGVtcGxhdGUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIHRlbXBsYXRlISBUZW1wbGF0ZSBzaG91bGQgYmUgYSBcInN0cmluZ1wiICcgKyAnYnV0IFwiJyArIHR5cGVTdHIodGVtcGxhdGUpICsgJ1wiIHdhcyBnaXZlbiBhcyB0aGUgZmlyc3QgJyArICdhcmd1bWVudCBmb3IgbXVzdGFjaGUjcmVuZGVyKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscyknKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVmYXVsdFdyaXRlci5yZW5kZXIodGVtcGxhdGUsIHZpZXcsIHBhcnRpYWxzKTtcbiAgfTtcblxuICAvLyBUaGlzIGlzIGhlcmUgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5IHdpdGggMC40LnguLFxuICAvKmVzbGludC1kaXNhYmxlICovIC8vIGVzbGludCB3YW50cyBjYW1lbCBjYXNlZCBmdW5jdGlvbiBuYW1lXG4gIG11c3RhY2hlLnRvX2h0bWwgPSBmdW5jdGlvbiB0b19odG1sKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscywgc2VuZCkge1xuICAgIC8qZXNsaW50LWVuYWJsZSovXG5cbiAgICB2YXIgcmVzdWx0ID0gbXVzdGFjaGUucmVuZGVyKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscyk7XG5cbiAgICBpZiAoaXNGdW5jdGlvbihzZW5kKSkge1xuICAgICAgc2VuZChyZXN1bHQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9O1xuXG4gIC8vIEV4cG9ydCB0aGUgZXNjYXBpbmcgZnVuY3Rpb24gc28gdGhhdCB0aGUgdXNlciBtYXkgb3ZlcnJpZGUgaXQuXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vamFubC9tdXN0YWNoZS5qcy9pc3N1ZXMvMjQ0XG4gIG11c3RhY2hlLmVzY2FwZSA9IGVzY2FwZUh0bWw7XG5cbiAgLy8gRXhwb3J0IHRoZXNlIG1haW5seSBmb3IgdGVzdGluZywgYnV0IGFsc28gZm9yIGFkdmFuY2VkIHVzYWdlLlxuICBtdXN0YWNoZS5TY2FubmVyID0gU2Nhbm5lcjtcbiAgbXVzdGFjaGUuQ29udGV4dCA9IENvbnRleHQ7XG4gIG11c3RhY2hlLldyaXRlciA9IFdyaXRlcjtcblxufSkpO1xuXG5leHBvcnQgZGVmYXVsdCBBWDYubXVzdGFjaGU7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL3NyYy9BWDZNdXN0YWNoZS5qcyIsImltcG9ydCBqUXVlcnkgZnJvbSBcImpxbWluXCI7XG5pbXBvcnQgQVg2VUlDb3JlIGZyb20gXCIuL0FYNlVJQ29yZS5qc1wiO1xuaW1wb3J0IGluZm8gZnJvbSBcIi4vQVg2SW5mb1wiO1xuaW1wb3J0IFUgZnJvbSBcIi4vQVg2VXRpbFwiO1xuaW1wb3J0IG11c3RhY2hlIGZyb20gXCIuL0FYNk11c3RhY2hlXCI7XG4vKiB+fn5+fn5+fn5+fn5+fn5+fn4gZW5kIG9mIGltcG9ydCAgfn5+fn5+fn5+fn5+fn5+fn5+fn4gKi9cblxubGV0IHRtcGwgPSB7XG4gIG1lbnUoY29sdW1uS2V5cykge1xuICAgIHJldHVybiBgXG4gICAgICAgIDxkaXYgZGF0YS1heDZ1aS1tZW51PVwiXCIgY2xhc3M9XCJ7e3RoZW1lfX1cIiB7eyN3aWR0aH19c3R5bGU9XCJ3aWR0aDp7e3dpZHRofX1weDtcInt7L3dpZHRofX0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXgtbWVudS1ib2R5XCI+XG4gICAgICAgICAgICAgICAge3sjJHtjb2x1bW5LZXlzLml0ZW1zfX19XG4gICAgICAgICAgICAgICAgICAgIHt7XkBpc01lbnV9fVxuICAgICAgICAgICAgICAgICAgICAgICAge3sjZGl2aWRlfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJheC1tZW51LWl0ZW0tZGl2aWRlXCIgZGF0YS1tZW51LWl0ZW0taW5kZXg9XCJ7e0BpfX1cIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7L2RpdmlkZX19XG4gICAgICAgICAgICAgICAgICAgICAgICB7eyNodG1sfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJheC1tZW51LWl0ZW0taHRtbFwiIGRhdGEtbWVudS1pdGVtLWluZGV4PVwie3tAaX19XCI+e3t7QGh0bWx9fX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7L2h0bWx9fVxuICAgICAgICAgICAgICAgICAgICB7ey9AaXNNZW51fX1cbiAgICAgICAgICAgICAgICAgICAge3sjQGlzTWVudX19XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJheC1tZW51LWl0ZW1cIiBkYXRhLW1lbnUtaXRlbS1kZXB0aD1cInt7QGRlcHRofX1cIiBkYXRhLW1lbnUtaXRlbS1pbmRleD1cInt7QGl9fVwiIGRhdGEtbWVudS1pdGVtLXBhdGg9XCJ7e0BwYXRofX0ue3tAaX19XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImF4LW1lbnUtaXRlbS1jZWxsIGF4LW1lbnUtaXRlbS1jaGVja2JveFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7I2NoZWNrfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIml0ZW0tY2hlY2tib3gtd3JhcCB1c2VDaGVja0JveFwiIHt7I2NoZWNrZWR9fWRhdGEtaXRlbS1jaGVja2VkPVwidHJ1ZVwie3svY2hlY2tlZH19Pjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ey9jaGVja319XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3teY2hlY2t9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaXRlbS1jaGVja2JveC13cmFwXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7L2NoZWNrfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7I2ljb259fVxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJheC1tZW51LWl0ZW0tY2VsbCBheC1tZW51LWl0ZW0taWNvblwiIHN0eWxlPVwid2lkdGg6e3tjZmcuaWNvbldpZHRofX1weDtcIj57e3sufX19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAge3svaWNvbn19XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImF4LW1lbnUtaXRlbS1jZWxsIGF4LW1lbnUtaXRlbS1sYWJlbFwiPnt7eyR7Y29sdW1uS2V5cy5sYWJlbH19fX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICB7eyNhY2NlbGVyYXRvcn19XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImF4LW1lbnUtaXRlbS1jZWxsIGF4LW1lbnUtaXRlbS1hY2NlbGVyYXRvclwiIHN0eWxlPVwid2lkdGg6e3tjZmcuYWNjZWxlcmF0b3JXaWR0aH19cHg7XCI+PHNwYW4gY2xhc3M9XCJpdGVtLXdyYXBcIj57ey59fTwvc3Bhbj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICB7ey9hY2NlbGVyYXRvcn19XG4gICAgICAgICAgICAgICAgICAgICAgICB7eyNAaGFzQ2hpbGR9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJheC1tZW51LWl0ZW0tY2VsbCBheC1tZW51LWl0ZW0taGFuZGxlXCI+e3t7Y2ZnLmljb25zLmFycm93fX19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAge3svQGhhc0NoaWxkfX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHt7L0Bpc01lbnV9fVxuXG4gICAgICAgICAgICAgICAge3svJHtjb2x1bW5LZXlzLml0ZW1zfX19XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJheC1tZW51LWFycm93XCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBgO1xuICB9LFxuICBtZW51YmFyKGNvbHVtbktleXMpIHtcbiAgICByZXR1cm4gYFxuICAgICAgICA8ZGl2IGRhdGEtYXg2dWktbWVudWJhcj1cIlwiIGNsYXNzPVwie3t0aGVtZX19XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXgtbWVudS1ib2R5XCI+XG4gICAgICAgICAgICAgICAge3sjJHtjb2x1bW5LZXlzLml0ZW1zfX19XG4gICAgICAgICAgICAgICAgICAgIHt7XkBpc01lbnV9fVxuICAgICAgICAgICAgICAgICAgICAgICAge3sjZGl2aWRlfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJheC1tZW51LWl0ZW0tZGl2aWRlXCIgZGF0YS1tZW51LWl0ZW0taW5kZXg9XCJ7e0BpfX1cIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7L2RpdmlkZX19XG4gICAgICAgICAgICAgICAgICAgICAgICB7eyNodG1sfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJheC1tZW51LWl0ZW0taHRtbFwiIGRhdGEtbWVudS1pdGVtLWluZGV4PVwie3tAaX19XCI+e3t7QGh0bWx9fX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7L2h0bWx9fVxuICAgICAgICAgICAgICAgICAgICB7ey9AaXNNZW51fX1cbiAgICAgICAgICAgICAgICAgICAge3sjQGlzTWVudX19XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJheC1tZW51LWl0ZW1cIiBkYXRhLW1lbnUtaXRlbS1pbmRleD1cInt7QGl9fVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3sjaWNvbn19XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImF4LW1lbnUtaXRlbS1jZWxsIGF4LW1lbnUtaXRlbS1pY29uXCIgc3R5bGU9XCJ3aWR0aDp7e2NmZy5pY29uV2lkdGh9fXB4O1wiPnt7ey59fX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICB7ey9pY29ufX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXgtbWVudS1pdGVtLWNlbGwgYXgtbWVudS1pdGVtLWxhYmVsXCI+e3t7JHtjb2x1bW5LZXlzLmxhYmVsfX19fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHt7L0Bpc01lbnV9fVxuICAgICAgICAgICAgICAgIHt7LyR7Y29sdW1uS2V5cy5pdGVtc319fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBgO1xuICB9XG59O1xuXG5jb25zdCBhcHBFdmVudEF0dGFjaCA9IGZ1bmN0aW9uIChhY3RpdmUsIG9wdCkge1xuICBpZiAoYWN0aXZlKSB7XG4gICAgalF1ZXJ5KGRvY3VtZW50LmJvZHkpXG4gICAgICAub2ZmKFwiY2xpY2suYXg1bWVudS1cIiArIHRoaXMuaW5zdGFuY2VJZClcbiAgICAgIC5vbihcImNsaWNrLmF4NW1lbnUtXCIgKyB0aGlzLmluc3RhbmNlSWQsIGNsaWNrSXRlbS5iaW5kKHRoaXMsIG9wdCkpO1xuXG4gICAgalF1ZXJ5KHdpbmRvdylcbiAgICAgIC5vZmYoXCJrZXlkb3duLmF4NW1lbnUtXCIgKyB0aGlzLmluc3RhbmNlSWQpXG4gICAgICAub24oXCJrZXlkb3duLmF4NW1lbnUtXCIgKyB0aGlzLmluc3RhbmNlSWQsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmIChlLndoaWNoID09IGluZm8uZXZlbnRLZXlzLkVTQykge1xuICAgICAgICAgIHNlbGYuY2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5vZmYoXCJyZXNpemUuYXg1bWVudS1cIiArIHRoaXMuaW5zdGFuY2VJZClcbiAgICAgIC5vbihcInJlc2l6ZS5heDVtZW51LVwiICsgdGhpcy5pbnN0YW5jZUlkLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBzZWxmLmNsb3NlKCk7XG4gICAgICB9KTtcbiAgfVxuICBlbHNlIHtcbiAgICBqUXVlcnkoZG9jdW1lbnQuYm9keSkub2ZmKFwiY2xpY2suYXg1bWVudS1cIiArIHRoaXMuaW5zdGFuY2VJZCk7XG4gICAgalF1ZXJ5KHdpbmRvdykub2ZmKFwia2V5ZG93bi5heDVtZW51LVwiICsgdGhpcy5pbnN0YW5jZUlkKTtcbiAgICBqUXVlcnkod2luZG93KS5vZmYoXCJyZXNpemUuYXg1bWVudS1cIiArIHRoaXMuaW5zdGFuY2VJZCk7XG4gIH1cbn07XG5jb25zdCBvblN0YXRlQ2hhbmdlZCA9IGZ1bmN0aW9uIChvcHRzLCB0aGF0KSB7XG4gIGlmIChvcHRzICYmIG9wdHMub25TdGF0ZUNoYW5nZWQpIHtcbiAgICBvcHRzLm9uU3RhdGVDaGFuZ2VkLmNhbGwodGhhdCwgdGhhdCk7XG4gIH1cbiAgZWxzZSBpZiAodGhpcy5vblN0YXRlQ2hhbmdlZCkge1xuICAgIHRoaXMub25TdGF0ZUNoYW5nZWQuY2FsbCh0aGF0LCB0aGF0KTtcbiAgfVxuXG4gIHRoaXMuc3RhdGUgPSB0aGF0LnN0YXRlO1xuICBvcHRzID0gbnVsbDtcbiAgdGhhdCA9IG51bGw7XG4gIHJldHVybiB0cnVlO1xufTtcbmNvbnN0IG9uTG9hZCA9IGZ1bmN0aW9uICh0aGF0KSB7XG4gIGlmICh0aGlzLm9uTG9hZCkge1xuICAgIHRoaXMub25Mb2FkLmNhbGwodGhhdCwgdGhhdCk7XG4gIH1cblxuICB0aGF0ID0gbnVsbDtcbiAgcmV0dXJuIHRydWU7XG59O1xuY29uc3QgcG9wdXAgPSBmdW5jdGlvbiAob3B0LCBpdGVtcywgZGVwdGgsIHBhdGgpIHtcbiAgbGV0IHNlbGYgPSB0aGlzLCBjZmcgPSB0aGlzLmNvbmZpZztcbiAgbGV0IGRhdGEgPSBvcHQsXG4gICAgJGFjdGl2ZU1lbnUsXG4gICAgcmVtb3ZlZDtcblxuICBkYXRhLnRoZW1lID0gb3B0LnRoZW1lIHx8IGNmZy50aGVtZTtcbiAgZGF0YS5jZmcgPSB7XG4gICAgaWNvbnM6IGpRdWVyeS5leHRlbmQoe30sIGNmZy5pY29ucyksXG4gICAgaWNvbldpZHRoOiBvcHQuaWNvbldpZHRoIHx8IGNmZy5pY29uV2lkdGgsXG4gICAgYWNjZWxlcmF0b3JXaWR0aDogb3B0LmFjY2VsZXJhdG9yV2lkdGggfHwgY2ZnLmFjY2VsZXJhdG9yV2lkdGhcbiAgfTtcblxuICBpdGVtcy5mb3JFYWNoKG4gPT4ge1xuICAgIGlmIChuLmh0bWwgfHwgbi5kaXZpZGUpIHtcbiAgICAgIG5bJ0Bpc01lbnUnXSA9IGZhbHNlO1xuICAgICAgaWYgKG4uaHRtbCkge1xuICAgICAgICBuWydAaHRtbCddID0gbi5odG1sLmNhbGwoe1xuICAgICAgICAgIGl0ZW06IG4sXG4gICAgICAgICAgY29uZmlnOiBjZmcsXG4gICAgICAgICAgb3B0OiBvcHRcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgblsnQGlzTWVudSddID0gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIGRhdGFbY2ZnLmNvbHVtbktleXMuaXRlbXNdID0gaXRlbXM7XG4gIGRhdGFbJ0BkZXB0aCddID0gZGVwdGg7XG4gIGRhdGFbJ0BwYXRoJ10gPSBwYXRoIHx8IFwicm9vdFwiO1xuICBkYXRhWydAaGFzQ2hpbGQnXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpc1tjZmcuY29sdW1uS2V5cy5pdGVtc10gJiYgdGhpc1tjZmcuY29sdW1uS2V5cy5pdGVtc10ubGVuZ3RoID4gMDtcbiAgfTtcbiAgJGFjdGl2ZU1lbnUgPSBqUXVlcnkobXVzdGFjaGUucmVuZGVyKHRtcGwubWVudS5jYWxsKHRoaXMsIGNmZy5jb2x1bW5LZXlzKSwgZGF0YSkpO1xuICBqUXVlcnkoZG9jdW1lbnQuYm9keSkuYXBwZW5kKCRhY3RpdmVNZW51KTtcblxuICAvLyByZW1vdmUgcXVldWVcbiAgcmVtb3ZlZCA9IHRoaXMucXVldWUuc3BsaWNlKGRlcHRoKTtcbiAgcmVtb3ZlZC5mb3JFYWNoKG4gPT4ge1xuICAgIG4uJHRhcmdldC5yZW1vdmUoKTtcbiAgfSk7XG5cbiAgdGhpcy5xdWV1ZS5wdXNoKHtcbiAgICAnJHRhcmdldCc6ICRhY3RpdmVNZW51LFxuICAgICdkYXRhJzogalF1ZXJ5LmV4dGVuZCh7fSwgZGF0YSlcbiAgfSk7XG5cbiAgJGFjdGl2ZU1lbnUub24oJ21vdXNlb3ZlcicsICdbZGF0YS1tZW51LWl0ZW0taW5kZXhdJywgZnVuY3Rpb24gKCkge1xuICAgIGxldCBkZXB0aCA9IHRoaXMuZ2V0QXR0cmlidXRlKFwiZGF0YS1tZW51LWl0ZW0tZGVwdGhcIiksXG4gICAgICBpbmRleCA9IHRoaXMuZ2V0QXR0cmlidXRlKFwiZGF0YS1tZW51LWl0ZW0taW5kZXhcIiksXG4gICAgICBwYXRoID0gdGhpcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLW1lbnUtaXRlbS1wYXRoXCIpLFxuICAgICAgJHRoaXMsXG4gICAgICBvZmZzZXQsXG4gICAgICBzY3JvbGxUb3AsXG4gICAgICBjaGlsZE9wdCxcbiAgICAgIF9pdGVtcyxcbiAgICAgIF9hY3RpdmVNZW51O1xuXG4gICAgaWYgKGRlcHRoICE9IG51bGwgJiYgdHlwZW9mIGRlcHRoICE9IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIF9pdGVtcyA9IHNlbGYucXVldWVbZGVwdGhdLmRhdGFbY2ZnLmNvbHVtbktleXMuaXRlbXNdW2luZGV4XVtjZmcuY29sdW1uS2V5cy5pdGVtc107XG4gICAgICBfYWN0aXZlTWVudSA9IHNlbGYucXVldWVbZGVwdGhdLiR0YXJnZXQ7XG4gICAgICBfYWN0aXZlTWVudS5maW5kKCdbZGF0YS1tZW51LWl0ZW0taW5kZXhdJykucmVtb3ZlQ2xhc3MoXCJob3ZlclwiKTtcbiAgICAgIGpRdWVyeSh0aGlzKS5hZGRDbGFzcyhcImhvdmVyXCIpO1xuXG4gICAgICBpZiAoX2FjdGl2ZU1lbnUuYXR0cihcImRhdGEtc2VsZWN0ZWQtbWVudS1pdGVtLWluZGV4XCIpICE9IGluZGV4KSB7XG4gICAgICAgIF9hY3RpdmVNZW51LmF0dHIoXCJkYXRhLXNlbGVjdGVkLW1lbnUtaXRlbS1pbmRleFwiLCBpbmRleCk7XG5cbiAgICAgICAgaWYgKF9pdGVtcyAmJiBfaXRlbXMubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgJHRoaXMgPSBqUXVlcnkodGhpcyk7XG4gICAgICAgICAgb2Zmc2V0ID0gJHRoaXMub2Zmc2V0KCk7XG4gICAgICAgICAgc2Nyb2xsVG9wID0gKGNmZy5wb3NpdGlvbiA9PSBcImZpeGVkXCIgPyBqUXVlcnkoZG9jdW1lbnQpLnNjcm9sbFRvcCgpIDogMCk7XG4gICAgICAgICAgY2hpbGRPcHQgPSB7XG4gICAgICAgICAgICAnQHBhcmVudCc6IHtcbiAgICAgICAgICAgICAgbGVmdDogb2Zmc2V0LmxlZnQsXG4gICAgICAgICAgICAgIHRvcDogb2Zmc2V0LnRvcCxcbiAgICAgICAgICAgICAgd2lkdGg6ICR0aGlzLm91dGVyV2lkdGgoKSxcbiAgICAgICAgICAgICAgaGVpZ2h0OiAkdGhpcy5vdXRlckhlaWdodCgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGVmdDogb2Zmc2V0LmxlZnQgKyAkdGhpcy5vdXRlcldpZHRoKCkgLSBjZmcubWVudUJvZHlQYWRkaW5nLFxuICAgICAgICAgICAgdG9wOiBvZmZzZXQudG9wIC0gY2ZnLm1lbnVCb2R5UGFkZGluZyAtIDEgLSBzY3JvbGxUb3BcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgY2hpbGRPcHQgPSBqUXVlcnkuZXh0ZW5kKHRydWUsIG9wdCwgY2hpbGRPcHQpO1xuICAgICAgICAgIHBvcHVwLmNhbGwoc2VsZiwgY2hpbGRPcHQsIF9pdGVtcywgKE51bWJlcihkZXB0aCkgKyAxKSwgcGF0aCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgc2VsZi5xdWV1ZS5zcGxpY2UoTnVtYmVyKGRlcHRoKSArIDEpLmZvckVhY2goZnVuY3Rpb24gKG4pIHtcbiAgICAgICAgICAgIG4uJHRhcmdldC5yZW1vdmUoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGRlcHRoID0gbnVsbDtcbiAgICBpbmRleCA9IG51bGw7XG4gICAgcGF0aCA9IG51bGw7XG4gICAgJHRoaXMgPSBudWxsO1xuICAgIG9mZnNldCA9IG51bGw7XG4gICAgc2Nyb2xsVG9wID0gbnVsbDtcbiAgICBjaGlsZE9wdCA9IG51bGw7XG4gICAgX2l0ZW1zID0gbnVsbDtcbiAgICBfYWN0aXZlTWVudSA9IG51bGw7XG4gIH0pO1xuXG4gIC8vIG1vdXNlIG91dFxuICAkYWN0aXZlTWVudS5vbignbW91c2VvdXQnLCAnW2RhdGEtbWVudS1pdGVtLWluZGV4XScsIGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgZGVwdGggPSB0aGlzLmdldEF0dHJpYnV0ZShcImRhdGEtbWVudS1pdGVtLWRlcHRoXCIpLFxuICAgICAgaW5kZXggPSB0aGlzLmdldEF0dHJpYnV0ZShcImRhdGEtbWVudS1pdGVtLWluZGV4XCIpLFxuICAgICAgcGF0aCA9IHRoaXMuZ2V0QXR0cmlidXRlKFwiZGF0YS1tZW51LWl0ZW0tcGF0aFwiKSxcbiAgICAgIF9pdGVtcztcblxuICAgIGlmIChwYXRoKSB7XG4gICAgICBfaXRlbXMgPSBzZWxmLnF1ZXVlW2RlcHRoXS5kYXRhW2NmZy5jb2x1bW5LZXlzLml0ZW1zXVtpbmRleF1bY2ZnLmNvbHVtbktleXMuaXRlbXNdO1xuICAgIH1cbiAgICBpZiAoX2l0ZW1zICYmIF9pdGVtcy5sZW5ndGggPiAwKSB7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgalF1ZXJ5KHRoaXMpLnJlbW92ZUNsYXNzKFwiaG92ZXJcIik7XG4gICAgfVxuICB9KTtcblxuICAvLyBpcyBSb290XG4gIGlmIChkZXB0aCA9PSAwKSB7XG4gICAgaWYgKGRhdGEuZGlyZWN0aW9uKSAkYWN0aXZlTWVudS5hZGRDbGFzcyhcImRpcmVjdGlvbi1cIiArIGRhdGEuZGlyZWN0aW9uKTtcbiAgICBvblN0YXRlQ2hhbmdlZC5jYWxsKHRoaXMsIG51bGwsIHtcbiAgICAgIHNlbGY6IHRoaXMsXG4gICAgICBpdGVtczogaXRlbXMsXG4gICAgICBwYXJlbnQ6IChmdW5jdGlvbiAocGF0aCkge1xuICAgICAgICBpZiAoIXBhdGgpIHJldHVybiBmYWxzZTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gKEZ1bmN0aW9uKFwiXCIsIFwicmV0dXJuIHRoaXMuY29uZmlnLml0ZW1zW1wiICsgcGF0aC5zdWJzdHJpbmcoNSkucmVwbGFjZSgvXFwuL2csICddLml0ZW1zWycpICsgXCJdO1wiKSkuY2FsbChzZWxmKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuXG4gICAgICAgIH1cbiAgICAgIH0pKGRhdGFbJ0BwYXRoJ10pLFxuICAgICAgc3RhdGU6IFwicG9wdXBcIlxuICAgIH0pO1xuICB9XG5cbiAgYWxpZ24uY2FsbCh0aGlzLCAkYWN0aXZlTWVudSwgZGF0YSk7XG4gIG9uTG9hZC5jYWxsKHRoaXMsIHtcbiAgICBzZWxmOiB0aGlzLFxuICAgIGl0ZW1zOiBpdGVtcyxcbiAgICBlbGVtZW50OiAkYWN0aXZlTWVudS5nZXQoMClcbiAgfSk7XG5cbiAgZGF0YSA9IG51bGw7XG4gICRhY3RpdmVNZW51ID0gbnVsbDtcbiAgcmVtb3ZlZCA9IG51bGw7XG4gIG9wdCA9IG51bGw7XG4gIGl0ZW1zID0gbnVsbDtcbiAgZGVwdGggPSBudWxsO1xuICBwYXRoID0gbnVsbDtcblxuICByZXR1cm4gdGhpcztcbn07XG5jb25zdCBjbGlja0l0ZW0gPSBmdW5jdGlvbiAob3B0LCBlKSB7XG4gIGxldCBzZWxmID0gdGhpcywgY2ZnID0gdGhpcy5jb25maWc7XG4gIGxldCB0YXJnZXQsIGl0ZW07XG5cbiAgdGFyZ2V0ID0gVS5maW5kUGFyZW50Tm9kZShlLnRhcmdldCwgZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGlmICh0YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1tZW51LWl0ZW0taW5kZXhcIikpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSk7XG4gIGlmICh0YXJnZXQpIHtcbiAgICBpZiAodHlwZW9mIG9wdCA9PT0gXCJ1bmRlZmluZWRcIikgb3B0ID0ge307XG4gICAgaXRlbSA9IChmdW5jdGlvbiAocGF0aCkge1xuICAgICAgaWYgKCFwYXRoKSByZXR1cm4gZmFsc2U7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gKEZ1bmN0aW9uKFwiXCIsIFwicmV0dXJuIHRoaXNbXCIgKyBwYXRoLnN1YnN0cmluZyg1KS5yZXBsYWNlKC9cXC4vZywgJ10uJyArIGNmZy5jb2x1bW5LZXlzLml0ZW1zICsgJ1snKSArIFwiXTtcIikpLmNhbGwob3B0Lml0ZW1zIHx8IGNmZy5pdGVtcyk7XG4gICAgICB9XG4gICAgICBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhpbmZvLmdldEVycm9yKFwiYXg1bWVudVwiLCBcIjUwMVwiLCBcIm1lbnVJdGVtQ2xpY2tcIikpO1xuICAgICAgfVxuICAgICAgZmluYWxseSB7XG4gICAgICAgIGl0ZW0gPSBudWxsO1xuICAgICAgfVxuICAgIH0pKHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLW1lbnUtaXRlbS1wYXRoXCIpKTtcblxuICAgIGlmICghaXRlbSkgcmV0dXJuIHRoaXM7XG5cbiAgICBpZiAoaXRlbS5jaGVjaykge1xuICAgICAgKGZ1bmN0aW9uIChpdGVtcykge1xuICAgICAgICBsZXQgc2V0VmFsdWUgPSB7XG4gICAgICAgICAgJ2NoZWNrYm94JzogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrZWQgPSAhdmFsdWU7XG4gICAgICAgICAgfSxcbiAgICAgICAgICAncmFkaW8nOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBuYW1lID0gdGhpcy5uYW1lO1xuICAgICAgICAgICAgaXRlbXMuZm9yRWFjaChmdW5jdGlvbiAobikge1xuICAgICAgICAgICAgICBpZiAobi5jaGVjayAmJiBuLmNoZWNrLnR5cGUgPT09ICdyYWRpbycgJiYgbi5jaGVjay5uYW1lID09IG5hbWUpIHtcbiAgICAgICAgICAgICAgICBuLmNoZWNrLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmNoZWNrZWQgPSAhdmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBpZiAoc2V0VmFsdWVbdGhpcy50eXBlXSkgc2V0VmFsdWVbdGhpcy50eXBlXS5jYWxsKHRoaXMsIHRoaXMuY2hlY2tlZCk7XG4gICAgICAgIHNldFZhbHVlID0gbnVsbDtcbiAgICAgIH0pLmNhbGwoaXRlbS5jaGVjaywgY2ZnLml0ZW1zKTtcblxuICAgICAgaWYgKCFjZmcuaXRlbUNsaWNrQW5kQ2xvc2UpIHtcbiAgICAgICAgc2VsZi5xdWV1ZS5mb3JFYWNoKG4gPT4ge1xuICAgICAgICAgIG4uJHRhcmdldC5maW5kKCdbZGF0YS1tZW51LWl0ZW0taW5kZXhdJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IG4uZGF0YVtjZmcuY29sdW1uS2V5cy5pdGVtc11bdGhpcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLW1lbnUtaXRlbS1pbmRleFwiKV07XG4gICAgICAgICAgICBpZiAoaXRlbS5jaGVjaykge1xuICAgICAgICAgICAgICBqUXVlcnkodGhpcykuZmluZChcIi5pdGVtLWNoZWNrYm94LXdyYXBcIikuYXR0cihcImRhdGEtaXRlbS1jaGVja2VkXCIsIGl0ZW0uY2hlY2suY2hlY2tlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpdGVtID0gbnVsbDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHNlbGYub25DbGljaykge1xuICAgICAgaWYgKHNlbGYub25DbGljay5jYWxsKGl0ZW0sIGl0ZW0sIG9wdC5wYXJhbSkpIHtcbiAgICAgICAgc2VsZi5jbG9zZSgpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoKCFpdGVtW2NmZy5jb2x1bW5LZXlzLml0ZW1zXSB8fCBpdGVtW2NmZy5jb2x1bW5LZXlzLml0ZW1zXS5sZW5ndGggPT0gMCkgJiYgY2ZnLml0ZW1DbGlja0FuZENsb3NlKSBzZWxmLmNsb3NlKCk7XG4gIH1cbiAgZWxzZSB7XG4gICAgc2VsZi5jbG9zZSgpO1xuICB9XG5cbiAgdGFyZ2V0ID0gbnVsbDtcbiAgaXRlbSA9IG51bGw7XG4gIHJldHVybiB0aGlzO1xufTtcbmNvbnN0IGFsaWduID0gZnVuY3Rpb24gKCRhY3RpdmVNZW51LCBkYXRhKSB7XG4gIGxldCBzZWxmID0gdGhpcywgY2ZnID0gdGhpcy5jb25maWc7XG4gIGxldCAkd2luZG93ID0galF1ZXJ5KHdpbmRvdyksXG4gICAgJGRvY3VtZW50ID0galF1ZXJ5KGRvY3VtZW50KSxcbiAgICB3aCA9IChjZmcucG9zaXRpb24gPT0gXCJmaXhlZFwiKSA/ICR3aW5kb3cuaGVpZ2h0KCkgOiAkZG9jdW1lbnQuaGVpZ2h0KCksXG4gICAgd3cgPSAkd2luZG93LndpZHRoKCksXG4gICAgaCA9ICRhY3RpdmVNZW51Lm91dGVySGVpZ2h0KCksXG4gICAgdyA9ICRhY3RpdmVNZW51Lm91dGVyV2lkdGgoKSxcbiAgICBsID0gZGF0YS5sZWZ0LFxuICAgIHQgPSBkYXRhLnRvcCxcbiAgICBwb3NpdGlvbiA9IGNmZy5wb3NpdGlvbiB8fCBcImZpeGVkXCI7XG5cbiAgaWYgKGwgKyB3ID4gd3cpIHtcbiAgICBpZiAoZGF0YVsnQHBhcmVudCddKSB7XG4gICAgICBsID0gZGF0YVsnQHBhcmVudCddLmxlZnQgLSB3ICsgY2ZnLm1lbnVCb2R5UGFkZGluZztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBsID0gd3cgLSB3O1xuICAgIH1cbiAgfVxuXG4gIGlmICh0ICsgaCA+IHdoKSB7XG4gICAgdCA9IHdoIC0gaDtcbiAgfVxuXG4gICRhY3RpdmVNZW51LmNzcyh7bGVmdDogbCwgdG9wOiB0LCBwb3NpdGlvbjogcG9zaXRpb259KTtcblxuICAkYWN0aXZlTWVudSA9IG51bGw7XG4gIGRhdGEgPSBudWxsO1xuICAkd2luZG93ID0gbnVsbDtcbiAgJGRvY3VtZW50ID0gbnVsbDtcbiAgd2ggPSBudWxsO1xuICB3dyA9IG51bGw7XG4gIGggPSBudWxsO1xuICB3ID0gbnVsbDtcbiAgbCA9IG51bGw7XG4gIHQgPSBudWxsO1xuICBwb3NpdGlvbiA9IG51bGw7XG4gIHJldHVybiB0aGlzO1xufTtcbi8qIH5+fn5+fn5+fn5+fn5+fn5+fiBlbmQgb2YgcHJpdmF0ZSAgfn5+fn5+fn5+fn5+fn5+fn5+fn4gKi9cblxuLyoqXG4gKiBAY2xhc3NcbiAqL1xuY2xhc3MgQVg2VUlNZW51IGV4dGVuZHMgQVg2VUlDb3JlIHtcbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gY29uZmlnXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgLyoqXG4gICAgICogQG1lbWJlciB7SlNPTn1cbiAgICAgKiBAcGFyYW0gY29uZmlnXG4gICAgICogQHBhcmFtIFtjb25maWcudGhlbWVdXG4gICAgICogQHBhcmFtIFtjb25maWcuaWNvbldpZHRoPTIyXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmFjY2VsZXJhdG9yV2lkdGg9MTAwXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLm1lbnVCb2R5UGFkZGluZz01XVxuICAgICAqIEBwYXJhbSBbY29uZmlnLm9mZnNldF1cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5vZmZzZXQubGVmdD0wXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLm9mZnNldC50b3A9MF1cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5wb3NpdGlvbj1cImZpeGVkXCJdXG4gICAgICogQHBhcmFtIFtjb25maWcuYW5pbWF0ZVRpbWU9MjUwXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLml0ZW1zXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLml0ZW1DbGlja0FuZENsb3NlPXRydWVdXG4gICAgICogQHBhcmFtIFtjb25maWcuY29sdW1uS2V5c11cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5jb2x1bW5LZXlzLmxhYmVsPSdsYWJlbCddXG4gICAgICogQHBhcmFtIFtjb25maWcuY29sdW1uS2V5cy5pdGVtcz0naXRlbXMnXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLm9uU3RhdGVDaGFuZ2VkXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLm9uQ2xpY2tdXG4gICAgICogQHBhcmFtIFtjb25maWcub25Mb2FkXVxuICAgICAqXG4gICAgICovXG4gICAgdGhpcy5jb25maWcgPSB7XG4gICAgICB0aGVtZTogXCJkZWZhdWx0XCIsXG4gICAgICBpY29uV2lkdGg6IDIyLFxuICAgICAgYWNjZWxlcmF0b3JXaWR0aDogMTAwLFxuICAgICAgbWVudUJvZHlQYWRkaW5nOiA1LFxuICAgICAgb2Zmc2V0OiB7bGVmdDogMCwgdG9wOiAwfSxcbiAgICAgIHBvc2l0aW9uOiBcImZpeGVkXCIsXG4gICAgICBhbmltYXRlVGltZTogMjUwLFxuICAgICAgaXRlbXM6IFtdLFxuICAgICAgaXRlbUNsaWNrQW5kQ2xvc2U6IHRydWUsXG4gICAgICBjb2x1bW5LZXlzOiB7XG4gICAgICAgIGxhYmVsOiAnbGFiZWwnLFxuICAgICAgICBpdGVtczogJ2l0ZW1zJ1xuICAgICAgfVxuICAgIH07XG4gICAgalF1ZXJ5LmV4dGVuZCh0cnVlLCB0aGlzLmNvbmZpZywgY29uZmlnKTtcblxuICAgIC8vIOuppOuyhCDrs4DsiJgg7LSI6riw7ZmUXG4gICAgLyoqXG4gICAgICogQG1lbWJlclxuICAgICAqL1xuICAgIHRoaXMub3BlblRpbWVyID0gbnVsbDtcbiAgICAvKipcbiAgICAgKiBAbWVtYmVyXG4gICAgICovXG4gICAgdGhpcy5jbG9zZVRpbWVyID0gbnVsbDtcbiAgICAvKipcbiAgICAgKiBAbWVtYmVyIHtBcnJheX1cbiAgICAgKi9cbiAgICB0aGlzLnF1ZXVlID0gW107XG4gICAgLyoqXG4gICAgICogQG1lbWJlciB7T2JqZWN0fVxuICAgICAqL1xuICAgIHRoaXMubWVudUJhciA9IHt9O1xuICAgIC8qKlxuICAgICAqIEBtZW1iZXJcbiAgICAgKi9cbiAgICB0aGlzLnN0YXRlID0gdW5kZWZpbmVkO1xuXG4gICAgaWYgKHR5cGVvZiBjb25maWcgIT09IFwidW5kZWZpbmVkXCIpIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICovXG4gIGluaXQoKSB7XG4gICAgdGhpcy5vblN0YXRlQ2hhbmdlZCA9IHRoaXMuY29uZmlnLm9uU3RhdGVDaGFuZ2VkO1xuICAgIGRlbGV0ZSB0aGlzLmNvbmZpZy5vblN0YXRlQ2hhbmdlZDtcbiAgICB0aGlzLm9uQ2xpY2sgPSB0aGlzLmNvbmZpZy5vbkNsaWNrO1xuICAgIGRlbGV0ZSB0aGlzLmNvbmZpZy5vbkNsaWNrO1xuICAgIHRoaXMub25Mb2FkID0gdGhpcy5jb25maWcub25Mb2FkO1xuICAgIGRlbGV0ZSB0aGlzLmNvbmZpZy5vbkxvYWQ7XG5cbiAgICBvblN0YXRlQ2hhbmdlZC5jYWxsKHRoaXMsIG51bGwsIHtcbiAgICAgIHNlbGY6IHRoaXMsXG4gICAgICBzdGF0ZTogXCJpbml0XCJcbiAgICB9KTtcbiAgICAvLyBpbml0IO2YuOy2nCDsl6zrtoBcbiAgICB0aGlzLmluaXRPbmNlKCk7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKi9cbiAgaW5pdE9uY2UoKSB7XG4gICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpIHJldHVybiB0aGlzO1xuICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQHBhcmFtIHtFdmVudHxPYmplY3R9IGUgLSBFdmVudCBvciBPYmplY3RcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRdXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0LnRoZW1lXVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0LmZpbHRlcl1cbiAgICogQHJldHVybnMge0FYNlVJTWVudX1cbiAgICovXG4gIHBvcHVwKGUsIG9wdCkge1xuICAgIGxldCBzZWxmID0gdGhpcywgY2ZnID0gdGhpcy5jb25maWc7XG4gICAgY29uc3QgZ2V0T3B0aW9uID0ge1xuICAgICAgICAnZXZlbnQnOiBmdW5jdGlvbiAoZSwgb3B0KSB7XG4gICAgICAgICAgZSA9IHtcbiAgICAgICAgICAgIGxlZnQ6IGUuY2xpZW50WCxcbiAgICAgICAgICAgIHRvcDogKGNmZy5wb3NpdGlvbiA9PSBcImZpeGVkXCIpID8gZS5jbGllbnRZIDogZS5wYWdlWSxcbiAgICAgICAgICAgIHdpZHRoOiBjZmcud2lkdGgsXG4gICAgICAgICAgICB0aGVtZTogY2ZnLnRoZW1lXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGUubGVmdCAtPSA1O1xuICAgICAgICAgIGUudG9wIC09IDU7XG5cbiAgICAgICAgICBpZiAoY2ZnLm9mZnNldCkge1xuICAgICAgICAgICAgaWYgKGNmZy5vZmZzZXQubGVmdCkgZS5sZWZ0ICs9IGNmZy5vZmZzZXQubGVmdDtcbiAgICAgICAgICAgIGlmIChjZmcub2Zmc2V0LnRvcCkgZS50b3AgKz0gY2ZnLm9mZnNldC50b3A7XG4gICAgICAgICAgfVxuICAgICAgICAgIG9wdCA9IGpRdWVyeS5leHRlbmQodHJ1ZSwgZSwgb3B0KTtcblxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gb3B0O1xuICAgICAgICAgIH1cbiAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIGUgPSBudWxsO1xuICAgICAgICAgICAgLy9vcHQgPSBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ29iamVjdCc6IGZ1bmN0aW9uIChlLCBvcHQpIHtcbiAgICAgICAgICBlID0ge1xuICAgICAgICAgICAgbGVmdDogZS5sZWZ0LFxuICAgICAgICAgICAgdG9wOiBlLnRvcCxcbiAgICAgICAgICAgIHdpZHRoOiBlLndpZHRoIHx8IGNmZy53aWR0aCxcbiAgICAgICAgICAgIHRoZW1lOiBlLnRoZW1lIHx8IGNmZy50aGVtZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBpZiAoY2ZnLm9mZnNldCkge1xuICAgICAgICAgICAgaWYgKGNmZy5vZmZzZXQubGVmdCkgZS5sZWZ0ICs9IGNmZy5vZmZzZXQubGVmdDtcbiAgICAgICAgICAgIGlmIChjZmcub2Zmc2V0LnRvcCkgZS50b3AgKz0gY2ZnLm9mZnNldC50b3A7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgb3B0ID0galF1ZXJ5LmV4dGVuZCh0cnVlLCBlLCBvcHQpO1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBvcHQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgZSA9IG51bGw7XG4gICAgICAgICAgICAvL29wdCA9IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdXBkYXRlVGhlbWUgPSBmdW5jdGlvbiAodGhlbWUpIHtcbiAgICAgICAgaWYgKHRoZW1lKSBjZmcudGhlbWUgPSB0aGVtZTtcbiAgICAgIH07XG5cbiAgICBpZiAoIWUpIHJldHVybiB0aGlzO1xuICAgIG9wdCA9IGdldE9wdGlvblsoKHR5cGVvZiBlLmNsaWVudFggPT0gXCJ1bmRlZmluZWRcIikgPyBcIm9iamVjdFwiIDogXCJldmVudFwiKV0uY2FsbCh0aGlzLCBlLCBvcHQpO1xuICAgIHVwZGF0ZVRoZW1lKG9wdC50aGVtZSk7XG5cbiAgICBsZXQgaXRlbXMgPSBbXS5jb25jYXQoY2ZnLml0ZW1zKSxcbiAgICAgIGZpbHRlcmluZ0l0ZW07XG4gICAgb3B0Lml0ZW1zID0gaXRlbXM7XG5cbiAgICBpZiAob3B0LmZpbHRlcikge1xuICAgICAgZmlsdGVyaW5nSXRlbSA9IGZ1bmN0aW9uIChfaXRlbXMpIHtcbiAgICAgICAgbGV0IGFyciA9IFtdO1xuICAgICAgICBfaXRlbXMuZm9yRWFjaChuID0+IHtcbiAgICAgICAgICBpZiAobi5pdGVtcyAmJiBuLml0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIG4uaXRlbXMgPSBmaWx0ZXJpbmdJdGVtKG4uaXRlbXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAob3B0LmZpbHRlci5jYWxsKG4pKSB7XG4gICAgICAgICAgICBhcnIucHVzaChuKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gYXJyO1xuICAgICAgfTtcbiAgICAgIG9wdC5pdGVtcyA9IGl0ZW1zID0gZmlsdGVyaW5nSXRlbShpdGVtcyk7XG4gICAgfVxuXG4gICAgaWYgKGl0ZW1zLmxlbmd0aCkge1xuICAgICAgYXBwRXZlbnRBdHRhY2guY2FsbCh0aGlzLCBmYWxzZSk7XG4gICAgICBwb3B1cC5jYWxsKHRoaXMsIG9wdCwgaXRlbXMsIDApOyAvLyAwIGlzIHNlcSBvZiBxdWV1ZVxuXG4gICAgICBpZiAodGhpcy5wb3B1cEV2ZW50QXR0YWNoVGltZXIpIGNsZWFyVGltZW91dCh0aGlzLnBvcHVwRXZlbnRBdHRhY2hUaW1lcik7XG4gICAgICB0aGlzLnBvcHVwRXZlbnRBdHRhY2hUaW1lciA9IHNldFRpbWVvdXQoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYXBwRXZlbnRBdHRhY2guY2FsbCh0aGlzLCB0cnVlLCBvcHQpOyAvLyDsnbTrsqTtirgg7Jew6rKwXG4gICAgICB9KS5iaW5kKHRoaXMpLCA1MDApO1xuICAgIH1cblxuICAgIGUgPSBudWxsO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQHBhcmFtIHtFbGVtZW50fGpRdWVyeU9iamVjdH0gZWxcbiAgICogQHJldHVybnMge0FYNlVJTWVudX1cbiAgICovXG4gIGF0dGFjaChlbCwgb3B0KSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzLCBjZmcgPSB0aGlzLmNvbmZpZztcbiAgICBjb25zdCBnZXRPcHRpb24gPSB7XG4gICAgICAnb2JqZWN0JzogZnVuY3Rpb24gKGUsIG9wdCkge1xuICAgICAgICBlID0ge1xuICAgICAgICAgIGxlZnQ6IGUubGVmdCxcbiAgICAgICAgICB0b3A6IGUudG9wLFxuICAgICAgICAgIHdpZHRoOiBlLndpZHRoIHx8IGNmZy53aWR0aCxcbiAgICAgICAgICB0aGVtZTogZS50aGVtZSB8fCBjZmcudGhlbWUsXG4gICAgICAgICAgZGlyZWN0aW9uOiBlLmRpcmVjdGlvbiB8fCBjZmcuZGlyZWN0aW9uXG4gICAgICAgIH07XG4gICAgICAgIG9wdCA9IGpRdWVyeS5leHRlbmQodHJ1ZSwgb3B0LCBlKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiBvcHQ7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgZSA9IG51bGw7XG4gICAgICAgICAgb3B0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBwb3BVcENoaWxkTWVudSA9IGZ1bmN0aW9uICh0YXJnZXQsIG9wdCwgZVR5cGUpIHtcbiAgICAgIGxldCAkdGFyZ2V0ID0galF1ZXJ5KHRhcmdldCksXG4gICAgICAgIG9mZnNldCA9ICR0YXJnZXQub2Zmc2V0KCksXG4gICAgICAgIGhlaWdodCA9ICR0YXJnZXQub3V0ZXJIZWlnaHQoKSxcbiAgICAgICAgaW5kZXggPSBOdW1iZXIodGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtbWVudS1pdGVtLWluZGV4XCIpKSxcbiAgICAgICAgc2Nyb2xsVG9wID0gKGNmZy5wb3NpdGlvbiA9PSBcImZpeGVkXCIpID8galF1ZXJ5KGRvY3VtZW50KS5zY3JvbGxUb3AoKSA6IDA7XG5cbiAgICAgIGlmIChjZmcuaXRlbXMgJiYgY2ZnLml0ZW1zW2luZGV4XVtjZmcuY29sdW1uS2V5cy5pdGVtc10gJiYgY2ZnLml0ZW1zW2luZGV4XVtjZmcuY29sdW1uS2V5cy5pdGVtc10ubGVuZ3RoKSB7XG5cbiAgICAgICAgaWYgKHNlbGYubWVudUJhci5vcGVuZWRJbmRleCA9PSBpbmRleCkge1xuICAgICAgICAgIGlmIChlVHlwZSA9PSBcImNsaWNrXCIpIHNlbGYuY2xvc2UoKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBzZWxmLm1lbnVCYXIudGFyZ2V0LmZpbmQoJ1tkYXRhLW1lbnUtaXRlbS1pbmRleF0nKS5yZW1vdmVDbGFzcyhcImhvdmVyXCIpO1xuICAgICAgICBzZWxmLm1lbnVCYXIub3BlbmVkID0gdHJ1ZTtcbiAgICAgICAgc2VsZi5tZW51QmFyLm9wZW5lZEluZGV4ID0gaW5kZXg7XG5cbiAgICAgICAgJHRhcmdldC5hdHRyKFwiZGF0YS1tZW51LWl0ZW0tb3BlbmVkXCIsIFwidHJ1ZVwiKTtcbiAgICAgICAgJHRhcmdldC5hZGRDbGFzcyhcImhvdmVyXCIpO1xuXG4gICAgICAgIGlmIChjZmcub2Zmc2V0KSB7XG4gICAgICAgICAgaWYgKGNmZy5vZmZzZXQubGVmdCkgb2Zmc2V0LmxlZnQgKz0gY2ZnLm9mZnNldC5sZWZ0O1xuICAgICAgICAgIGlmIChjZmcub2Zmc2V0LnRvcCkgb2Zmc2V0LnRvcCArPSBjZmcub2Zmc2V0LnRvcDtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wdCA9IGdldE9wdGlvbltcIm9iamVjdFwiXS5jYWxsKHRoaXMsIHtsZWZ0OiBvZmZzZXQubGVmdCwgdG9wOiBvZmZzZXQudG9wICsgaGVpZ2h0IC0gc2Nyb2xsVG9wfSwgb3B0KTtcblxuICAgICAgICBwb3B1cC5jYWxsKHNlbGYsIG9wdCwgY2ZnLml0ZW1zW2luZGV4XVtjZmcuY29sdW1uS2V5cy5pdGVtc10sIDAsICdyb290LicgKyB0YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1tZW51LWl0ZW0taW5kZXhcIikpOyAvLyAwIGlzIHNlcSBvZiBxdWV1ZVxuICAgICAgICBhcHBFdmVudEF0dGFjaC5jYWxsKHNlbGYsIHRydWUsIHt9KTsgLy8g7J2067Kk7Yq4IOyXsOqysFxuICAgICAgfVxuXG4gICAgICB0YXJnZXQgPSBudWxsO1xuICAgICAgb3B0ID0gbnVsbDtcbiAgICAgICR0YXJnZXQgPSBudWxsO1xuICAgICAgb2Zmc2V0ID0gbnVsbDtcbiAgICAgIGhlaWdodCA9IG51bGw7XG4gICAgICBpbmRleCA9IG51bGw7XG4gICAgICBzY3JvbGxUb3AgPSBudWxsO1xuICAgIH07XG4gICAgY29uc3QgY2xpY2tQYXJlbnRNZW51ID0gZnVuY3Rpb24gKHRhcmdldCwgb3B0LCBlVHlwZSkge1xuICAgICAgbGV0ICR0YXJnZXQgPSBqUXVlcnkodGFyZ2V0KSxcbiAgICAgICAgb2Zmc2V0ID0gJHRhcmdldC5vZmZzZXQoKSxcbiAgICAgICAgaGVpZ2h0ID0gJHRhcmdldC5vdXRlckhlaWdodCgpLFxuICAgICAgICBpbmRleCA9IE51bWJlcih0YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1tZW51LWl0ZW0taW5kZXhcIikpLFxuICAgICAgICBzY3JvbGxUb3AgPSAoY2ZnLnBvc2l0aW9uID09IFwiZml4ZWRcIikgPyBqUXVlcnkoZG9jdW1lbnQpLnNjcm9sbFRvcCgpIDogMDtcbiAgICAgIGlmIChjZmcuaXRlbXMgJiYgKCFjZmcuaXRlbXNbaW5kZXhdW2NmZy5jb2x1bW5LZXlzLml0ZW1zXSB8fCBjZmcuaXRlbXNbaW5kZXhdW2NmZy5jb2x1bW5LZXlzLml0ZW1zXS5sZW5ndGggPT0gMCkpIHtcbiAgICAgICAgaWYgKHNlbGYub25DbGljaykge1xuICAgICAgICAgIHNlbGYub25DbGljay5jYWxsKGNmZy5pdGVtc1tpbmRleF0sIGNmZy5pdGVtc1tpbmRleF0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIGxldCBkYXRhID0ge30sXG4gICAgICBpdGVtcyA9IGNmZy5pdGVtcyxcbiAgICAgICRhY3RpdmVNZW51O1xuXG4gICAgaWYgKHR5cGVvZiBvcHQgPT09IFwidW5kZWZpbmVkXCIpIG9wdCA9IHt9O1xuXG4gICAgZGF0YS50aGVtZSA9IG9wdC50aGVtZSB8fCBjZmcudGhlbWU7XG4gICAgZGF0YS5jZmcgPSB7XG4gICAgICBpY29uczogalF1ZXJ5LmV4dGVuZCh7fSwgY2ZnLmljb25zKSxcbiAgICAgIGljb25XaWR0aDogb3B0Lmljb25XaWR0aCB8fCBjZmcuaWNvbldpZHRoLFxuICAgICAgYWNjZWxlcmF0b3JXaWR0aDogb3B0LmFjY2VsZXJhdG9yV2lkdGggfHwgY2ZnLmFjY2VsZXJhdG9yV2lkdGhcbiAgICB9O1xuXG4gICAgaXRlbXMuZm9yRWFjaChuID0+IHtcbiAgICAgIGlmIChuLmh0bWwgfHwgbi5kaXZpZGUpIHtcbiAgICAgICAgblsnQGlzTWVudSddID0gZmFsc2U7XG4gICAgICAgIGlmIChuLmh0bWwpIHtcbiAgICAgICAgICBuWydAaHRtbCddID0gbi5odG1sLmNhbGwoe1xuICAgICAgICAgICAgaXRlbTogbixcbiAgICAgICAgICAgIGNvbmZpZzogY2ZnLFxuICAgICAgICAgICAgb3B0OiBvcHRcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIG5bJ0Bpc01lbnUnXSA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBkYXRhW2NmZy5jb2x1bW5LZXlzLml0ZW1zXSA9IGl0ZW1zO1xuXG4gICAgJGFjdGl2ZU1lbnUgPSBqUXVlcnkobXVzdGFjaGUucmVuZGVyKHRtcGwubWVudWJhci5jYWxsKHRoaXMsIGNmZy5jb2x1bW5LZXlzKSwgZGF0YSkpO1xuXG4gICAgc2VsZi5tZW51QmFyID0ge1xuICAgICAgdGFyZ2V0OiBqUXVlcnkoZWwpLFxuICAgICAgb3BlbmVkOiBmYWxzZVxuICAgIH07XG4gICAgc2VsZi5tZW51QmFyLnRhcmdldC5odG1sKCRhY3RpdmVNZW51KTtcblxuICAgIC8vIGNsaWNrLCBtb3VzZW92ZXJcbiAgICBzZWxmLm1lbnVCYXIudGFyZ2V0Lm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGlmICghZSkgcmV0dXJuIHRoaXM7XG4gICAgICBsZXQgdGFyZ2V0ID0gVS5maW5kUGFyZW50Tm9kZShlLnRhcmdldCwgZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICBpZiAodGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtbWVudS1pdGVtLWluZGV4XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICBjbGlja1BhcmVudE1lbnUodGFyZ2V0LCBvcHQsIFwiY2xpY2tcIik7XG4gICAgICAgIHBvcFVwQ2hpbGRNZW51KHRhcmdldCwgb3B0LCBcImNsaWNrXCIpO1xuICAgICAgfVxuXG4gICAgICB0YXJnZXQgPSBudWxsO1xuICAgIH0pO1xuICAgIHNlbGYubWVudUJhci50YXJnZXQub24oXCJtb3VzZW92ZXJcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGlmICghc2VsZi5tZW51QmFyLm9wZW5lZCkgcmV0dXJuIGZhbHNlO1xuICAgICAgbGV0IHRhcmdldCA9IFUuZmluZFBhcmVudE5vZGUoZS50YXJnZXQsIGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgaWYgKHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLW1lbnUtaXRlbS1pbmRleFwiKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmICh0YXJnZXQpIHBvcFVwQ2hpbGRNZW51KHRhcmdldCwgb3B0LCBcIm1vdXNlb3ZlclwiKTtcblxuICAgICAgdGFyZ2V0ID0gbnVsbDtcbiAgICB9KTtcblxuICAgIGVsID0gbnVsbDtcbiAgICBvcHQgPSBudWxsO1xuICAgIGRhdGEgPSBudWxsO1xuICAgIGl0ZW1zID0gbnVsbDtcbiAgICAkYWN0aXZlTWVudSA9IG51bGw7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEByZXR1cm5zIHtBWDZVSU1lbnV9XG4gICAqL1xuICBjbG9zZSgpIHtcbiAgICBsZXQgc2VsZiA9IHRoaXMsIGNmZyA9IHRoaXMuY29uZmlnO1xuICAgIGlmIChzZWxmLm1lbnVCYXIgJiYgc2VsZi5tZW51QmFyLnRhcmdldCkge1xuICAgICAgc2VsZi5tZW51QmFyLnRhcmdldC5maW5kKCdbZGF0YS1tZW51LWl0ZW0taW5kZXhdJykucmVtb3ZlQ2xhc3MoXCJob3ZlclwiKTtcbiAgICAgIHNlbGYubWVudUJhci5vcGVuZWQgPSBmYWxzZTtcbiAgICAgIHNlbGYubWVudUJhci5vcGVuZWRJbmRleCA9IG51bGw7XG4gICAgfVxuXG4gICAgYXBwRXZlbnRBdHRhY2guY2FsbCh0aGlzLCBmYWxzZSk7IC8vIOydtOuypO2KuCDsoJzqsbBcblxuICAgIHRoaXMucXVldWUuZm9yRWFjaChuID0+IHtcbiAgICAgIG4uJHRhcmdldC5yZW1vdmUoKTtcbiAgICB9KTtcbiAgICB0aGlzLnF1ZXVlID0gW107XG5cbiAgICBvblN0YXRlQ2hhbmdlZC5jYWxsKHRoaXMsIG51bGwsIHtcbiAgICAgIHNlbGY6IHRoaXMsXG4gICAgICBzdGF0ZTogXCJjbG9zZVwiXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBzdGF0dXNDaGVja0l0ZW1cbiAgICovXG4gIGdldENoZWNrVmFsdWUoKSB7XG5cbiAgICBsZXQgY2hlY2tJdGVtcyA9IHt9O1xuICAgIGNvbnN0IGNvbGxlY3RJdGVtID0gZnVuY3Rpb24gKGl0ZW1zKSB7XG4gICAgICBsZXQgaSA9IGl0ZW1zLmxlbmd0aDtcbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgaWYgKGl0ZW1zW2ldLmNoZWNrICYmIGl0ZW1zW2ldLmNoZWNrLmNoZWNrZWQpIHtcbiAgICAgICAgICBpZiAoIWNoZWNrSXRlbXNbaXRlbXNbaV0uY2hlY2submFtZV0pIGNoZWNrSXRlbXNbaXRlbXNbaV0uY2hlY2submFtZV0gPSBpdGVtc1tpXS5jaGVjay52YWx1ZTtcbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChVLmlzU3RyaW5nKGNoZWNrSXRlbXNbaXRlbXNbaV0uY2hlY2submFtZV0pKSBjaGVja0l0ZW1zW2l0ZW1zW2ldLmNoZWNrLm5hbWVdID0gW2NoZWNrSXRlbXNbaXRlbXNbaV0uY2hlY2submFtZV1dO1xuICAgICAgICAgICAgY2hlY2tJdGVtc1tpdGVtc1tpXS5jaGVjay5uYW1lXS5wdXNoKGl0ZW1zW2ldLmNoZWNrLnZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGl0ZW1zW2ldLml0ZW1zICYmIGl0ZW1zW2ldLml0ZW1zLmxlbmd0aCA+IDApIGNvbGxlY3RJdGVtKGl0ZW1zW2ldLml0ZW1zKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29sbGVjdEl0ZW0odGhpcy5jb25maWcuaXRlbXMpO1xuXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBjaGVja0l0ZW1zO1xuICAgIH1cbiAgICBmaW5hbGx5IHtcbiAgICAgIGNoZWNrSXRlbXMgPSBudWxsO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBWDZVSU1lbnU7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL3NyYy9BWDZVSU1lbnUuanMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGUuc2Nzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7fVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zdHlsZS5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zdHlsZS5zY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9zcmMvQVg2VUlNZW51L3N0eWxlLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDc5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCA4IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHVuZGVmaW5lZCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJALXdlYmtpdC1rZXlmcmFtZXMgYXgtbWVudSB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDAuMDsgfVxcbiAgMSUge1xcbiAgICBvcGFjaXR5OiAwLjA7IH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAwLjk1OyB9IH1cXG5cXG5ALW1vei1rZXlmcmFtZXMgYXgtbWVudSB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDAuMDsgfVxcbiAgMSUge1xcbiAgICBvcGFjaXR5OiAwLjA7IH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAwLjk1OyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIGF4LW1lbnUge1xcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAwLjA7IH1cXG4gIDElIHtcXG4gICAgb3BhY2l0eTogMC4wOyB9XFxuICAxMDAlIHtcXG4gICAgb3BhY2l0eTogMC45NTsgfSB9XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIGF4LW1lbnUtZGVzdHJveSB7XFxuICBmcm9tIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICBvcGFjaXR5OiAxLjA7IH1cXG4gIHRvIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDAuNSk7XFxuICAgIG9wYWNpdHk6IDAuMDsgfSB9XFxuXFxuQC1tb3ota2V5ZnJhbWVzIGF4LW1lbnUtZGVzdHJveSB7XFxuICBmcm9tIHtcXG4gICAgLW1vei10cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICBvcGFjaXR5OiAxLjA7IH1cXG4gIHRvIHtcXG4gICAgLW1vei10cmFuc2Zvcm06IHNjYWxlKDAuNSk7XFxuICAgIG9wYWNpdHk6IDAuMDsgfSB9XFxuXFxuQGtleWZyYW1lcyBheC1tZW51LWRlc3Ryb3kge1xcbiAgZnJvbSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgLW1vei10cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICAtbXMtdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgLW8tdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgb3BhY2l0eTogMS4wOyB9XFxuICB0byB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwLjUpO1xcbiAgICAtbW96LXRyYW5zZm9ybTogc2NhbGUoMC41KTtcXG4gICAgLW1zLXRyYW5zZm9ybTogc2NhbGUoMC41KTtcXG4gICAgLW8tdHJhbnNmb3JtOiBzY2FsZSgwLjUpO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNSk7XFxuICAgIG9wYWNpdHk6IDAuMDsgfSB9XFxuXFxuW2RhdGEtYXg2dWktbWVudV0ge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIHotaW5kZXg6IDIwMDA7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICBsZWZ0OiAwcHg7XFxuICB0b3A6IDBweDtcXG4gIC53aWR0aDogMTAwcHg7XFxuICBvcGFjaXR5OiAwLjk1O1xcbiAgLXdlYmtpdC1wZXJzcGVjdGl2ZTogMTAwMHB4O1xcbiAgLW1vei1wZXJzcGVjdGl2ZTogMTAwMHB4O1xcbiAgcGVyc3BlY3RpdmU6IDEwMDBweDtcXG4gIC13ZWJraXQtdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcXG4gIC1tb3otdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcXG4gIC1tcy10cmFuc2Zvcm0tc3R5bGU6IHByZXNlcnZlLTNkO1xcbiAgLW8tdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcXG4gIHRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XFxuICAtd2Via2l0LWFuaW1hdGlvbjogYXgtbWVudSAwLjNzIGN1YmljLWJlemllcigwLjE3NSwgMC44ODUsIDAuMzIsIDEuMjc1KTtcXG4gIC1tb3otYW5pbWF0aW9uOiBheC1tZW51IDAuM3MgY3ViaWMtYmV6aWVyKDAuMTc1LCAwLjg4NSwgMC4zMiwgMS4yNzUpO1xcbiAgYW5pbWF0aW9uOiBheC1tZW51IDAuM3MgY3ViaWMtYmV6aWVyKDAuMTc1LCAwLjg4NSwgMC4zMiwgMS4yNzUpO1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7XFxuICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlWigwKTtcXG4gIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7XFxuICAtby10cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7XFxuICAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciB0b3A7XFxuICAtbW96LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciB0b3A7XFxuICAtbXMtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIHRvcDtcXG4gIC1vLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciB0b3A7XFxuICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgdG9wO1xcbiAgLyogZmxpcCB0eXBlXFxuICBAaW5jbHVkZSBiYWNrZmFjZS12aXNpYmlsaXR5KHZpc2libGUpO1xcbiAgQGluY2x1ZGUgdHJhbnNmb3JtKHRyYW5zbGF0ZVkoMCUpIHJvdGF0ZVgoMGRlZykpO1xcbiAgKi9cXG4gIGJhY2tncm91bmQtY29sb3I6ICNlZWU7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudChib3R0b20sICNlZWUpO1xcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIHRvcCwjZWVlKTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkO1xcbiAgYm9yZGVyLWNvbG9yOiAjYWFhO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgYm94LXNoYWRvdzogMHB4IDBweCA1cHggMHB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcXG4gIGNvbG9yOiAjMzMzOyB9XFxuICBbZGF0YS1heDZ1aS1tZW51XSAqLFxcbiAgW2RhdGEtYXg2dWktbWVudV0gKjpiZWZvcmUsXFxuICBbZGF0YS1heDZ1aS1tZW51XSAqOmFmdGVyIHtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDsgfVxcbiAgW2RhdGEtYXg2dWktbWVudV0gLmF4LW1lbnUtaGVhZGluZyB7XFxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICAgIHBhZGRpbmc6IDEwcHggMTVweDtcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiA0cHg7XFxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA0cHg7XFxuICAgIGNvbG9yOiAjMzMzO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1O1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudChib3R0b20sICNmNWY1ZjUpO1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gdG9wLCNmNWY1ZjUpOyB9XFxuICAgIFtkYXRhLWF4NnVpLW1lbnVdIC5heC1tZW51LWhlYWRpbmcgLmJhZGdlIHtcXG4gICAgICBmb250LXNpemU6IDAuOGVtO1xcbiAgICAgIGNvbG9yOiAjZjVmNWY1O1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICMzMzM7XFxuICAgICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoYm90dG9tLCAjMzMzKTtcXG4gICAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gdG9wLCMzMzMpOyB9XFxuICBbZGF0YS1heDZ1aS1tZW51XSAuYXgtbWVudS1ib2R5IHtcXG4gICAgcGFkZGluZzogNXB4IDBweDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47IH1cXG4gICAgW2RhdGEtYXg2dWktbWVudV0gLmF4LW1lbnUtYm9keSAuYXgtbWVudS1pdGVtIHtcXG4gICAgICBwYWRkaW5nOiA0cHggMHB4O1xcbiAgICAgIHRleHQtYWxpZ246IGxlZnQ7XFxuICAgICAgYmFja2dyb3VuZDogI2VlZTtcXG4gICAgICBjb2xvcjogIzQ0NDtcXG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgICAgZm9udC1zaXplOiAxM3B4O1xcbiAgICAgIGRpc3BsYXk6IHRhYmxlO1xcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgICBib3JkZXItY29sbGFwc2U6IHNlcGFyYXRlO1xcbiAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgICB3aWR0aDogMTAwJTtcXG4gICAgICBoZWlnaHQ6IDE4cHg7IH1cXG4gICAgICBbZGF0YS1heDZ1aS1tZW51XSAuYXgtbWVudS1ib2R5IC5heC1tZW51LWl0ZW0gLmF4LW1lbnUtaXRlbS1jZWxsIHtcXG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgICAgICBkaXNwbGF5OiB0YWJsZS1jZWxsO1xcbiAgICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICAgICAgICBmb250LXNpemU6IDEzcHg7XFxuICAgICAgICBsaW5lLWhlaWdodDogMThweDtcXG4gICAgICAgIHBhZGRpbmc6IDBweCAwcHggMHB4IDBweDtcXG4gICAgICAgIHVzZXItc2VsZWN0OiBub25lOyB9XFxuICAgICAgICBbZGF0YS1heDZ1aS1tZW51XSAuYXgtbWVudS1ib2R5IC5heC1tZW51LWl0ZW0gLmF4LW1lbnUtaXRlbS1jZWxsLmF4LW1lbnUtaXRlbS1jaGVja2JveCB7XFxuICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgICAgICAgIHdpZHRoOiAxOHB4O1xcbiAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cXG4gICAgICAgICAgW2RhdGEtYXg2dWktbWVudV0gLmF4LW1lbnUtYm9keSAuYXgtbWVudS1pdGVtIC5heC1tZW51LWl0ZW0tY2VsbC5heC1tZW51LWl0ZW0tY2hlY2tib3ggLml0ZW0tY2hlY2tib3gtd3JhcCB7XFxuICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgICAgICAgIHdpZHRoOiAxOHB4O1xcbiAgICAgICAgICAgIGhlaWdodDogMThweDsgfVxcbiAgICAgICAgICAgIFtkYXRhLWF4NnVpLW1lbnVdIC5heC1tZW51LWJvZHkgLmF4LW1lbnUtaXRlbSAuYXgtbWVudS1pdGVtLWNlbGwuYXgtbWVudS1pdGVtLWNoZWNrYm94IC5pdGVtLWNoZWNrYm94LXdyYXAudXNlQ2hlY2tCb3g6YWZ0ZXIge1xcbiAgICAgICAgICAgICAgY29udGVudDogJyc7XFxuICAgICAgICAgICAgICB3aWR0aDogMTBweDtcXG4gICAgICAgICAgICAgIGhlaWdodDogNXB4O1xcbiAgICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgICAgICAgICAgdG9wOiA0cHg7XFxuICAgICAgICAgICAgICBsZWZ0OiA0cHg7XFxuICAgICAgICAgICAgICBib3JkZXI6IDJweCBzb2xpZCAjNDQ0O1xcbiAgICAgICAgICAgICAgYm9yZGVyLXRvcDogbm9uZTtcXG4gICAgICAgICAgICAgIGJvcmRlci1yaWdodDogbm9uZTtcXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbiAgICAgICAgICAgICAgb3BhY2l0eTogMC4xO1xcbiAgICAgICAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgtNTBkZWcpO1xcbiAgICAgICAgICAgICAgLW1vei10cmFuc2Zvcm06IHJvdGF0ZSgtNTBkZWcpO1xcbiAgICAgICAgICAgICAgLW1zLXRyYW5zZm9ybTogcm90YXRlKC01MGRlZyk7XFxuICAgICAgICAgICAgICAtby10cmFuc2Zvcm06IHJvdGF0ZSgtNTBkZWcpO1xcbiAgICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoLTUwZGVnKTsgfVxcbiAgICAgICAgICAgIFtkYXRhLWF4NnVpLW1lbnVdIC5heC1tZW51LWJvZHkgLmF4LW1lbnUtaXRlbSAuYXgtbWVudS1pdGVtLWNlbGwuYXgtbWVudS1pdGVtLWNoZWNrYm94IC5pdGVtLWNoZWNrYm94LXdyYXAudXNlQ2hlY2tCb3hbZGF0YS1pdGVtLWNoZWNrZWQ9XFxcInRydWVcXFwiXTphZnRlciB7XFxuICAgICAgICAgICAgICBvcGFjaXR5OiAxOyB9XFxuICAgICAgICBbZGF0YS1heDZ1aS1tZW51XSAuYXgtbWVudS1ib2R5IC5heC1tZW51LWl0ZW0gLmF4LW1lbnUtaXRlbS1jZWxsLmF4LW1lbnUtaXRlbS1pY29uIHtcXG4gICAgICAgICAgdGV4dC1hbGlnbjogbGVmdDsgfVxcbiAgICAgICAgW2RhdGEtYXg2dWktbWVudV0gLmF4LW1lbnUtYm9keSAuYXgtbWVudS1pdGVtIC5heC1tZW51LWl0ZW0tY2VsbC5heC1tZW51LWl0ZW0tbGFiZWwge1xcbiAgICAgICAgICBwYWRkaW5nLXJpZ2h0OiAxMHB4OyB9XFxuICAgICAgICBbZGF0YS1heDZ1aS1tZW51XSAuYXgtbWVudS1ib2R5IC5heC1tZW51LWl0ZW0gLmF4LW1lbnUtaXRlbS1jZWxsLmF4LW1lbnUtaXRlbS1hY2NlbGVyYXRvciB7XFxuICAgICAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xcbiAgICAgICAgICBwYWRkaW5nOiAwcHggN3B4IDBweCAwcHg7IH1cXG4gICAgICAgICAgW2RhdGEtYXg2dWktbWVudV0gLmF4LW1lbnUtYm9keSAuYXgtbWVudS1pdGVtIC5heC1tZW51LWl0ZW0tY2VsbC5heC1tZW51LWl0ZW0tYWNjZWxlcmF0b3IgLml0ZW0td3JhcCB7XFxuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgICAgICAgICAgbWF4LXdpZHRoOiAxMDAlO1xcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgICAgICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XFxuICAgICAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gICAgICAgICAgICB3b3JkLXdyYXA6IG5vcm1hbDtcXG4gICAgICAgICAgICBkaXNwbGF5OiBibG9jazsgfVxcbiAgICAgICAgW2RhdGEtYXg2dWktbWVudV0gLmF4LW1lbnUtYm9keSAuYXgtbWVudS1pdGVtIC5heC1tZW51LWl0ZW0tY2VsbC5heC1tZW51LWl0ZW0taGFuZGxlIHtcXG4gICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgICAgICAgd2lkdGg6IDE0cHg7XFxuICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjsgfVxcbiAgICAgIFtkYXRhLWF4NnVpLW1lbnVdIC5heC1tZW51LWJvZHkgLmF4LW1lbnUtaXRlbTpob3ZlciwgW2RhdGEtYXg2dWktbWVudV0gLmF4LW1lbnUtYm9keSAuYXgtbWVudS1pdGVtLmhvdmVyIHtcXG4gICAgICAgIGJhY2tncm91bmQ6ICM5OTk7XFxuICAgICAgICBjb2xvcjogI2ZmZjsgfVxcbiAgICAgICAgW2RhdGEtYXg2dWktbWVudV0gLmF4LW1lbnUtYm9keSAuYXgtbWVudS1pdGVtOmhvdmVyIC5heC1tZW51LWl0ZW0tY2VsbC5heC1tZW51LWl0ZW0tY2hlY2tib3ggLml0ZW0tY2hlY2tib3gtd3JhcDphZnRlciwgW2RhdGEtYXg2dWktbWVudV0gLmF4LW1lbnUtYm9keSAuYXgtbWVudS1pdGVtLmhvdmVyIC5heC1tZW51LWl0ZW0tY2VsbC5heC1tZW51LWl0ZW0tY2hlY2tib3ggLml0ZW0tY2hlY2tib3gtd3JhcDphZnRlciB7XFxuICAgICAgICAgIGJvcmRlci1jb2xvcjogI2ZmZjsgfVxcbiAgICBbZGF0YS1heDZ1aS1tZW51XSAuYXgtbWVudS1ib2R5IC5heC1tZW51LWl0ZW0tZGl2aWRlIHtcXG4gICAgICBib3JkZXItdG9wOiAxcHggc29saWQ7XFxuICAgICAgYm9yZGVyLWNvbG9yOiAjYWFhYWFhO1xcbiAgICAgIG1hcmdpbjogNXB4IDBweDsgfVxcbiAgICBbZGF0YS1heDZ1aS1tZW51XSAuYXgtbWVudS1ib2R5IC5heC1tZW51LWl0ZW0taHRtbCB7XFxuICAgICAgcGFkZGluZzogMHB4IDVweDtcXG4gICAgICB0ZXh0LWFsaWduOiBsZWZ0OyB9XFxuICAgIFtkYXRhLWF4NnVpLW1lbnVdIC5heC1tZW51LWJvZHkgLmF4LW1lbnUtYnV0dG9ucyBidXR0b246bm90KDpsYXN0LWNoaWxkKSB7XFxuICAgICAgbWFyZ2luLXJpZ2h0OiAzcHg7IH1cXG4gIFtkYXRhLWF4NnVpLW1lbnVdLmRpcmVjdGlvbi10b3Age1xcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAwO1xcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMDtcXG4gICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogNXB4O1xcbiAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogNXB4OyB9XFxuICAgIFtkYXRhLWF4NnVpLW1lbnVdLmRpcmVjdGlvbi10b3Aud2l0aC1hcnJvdyAuYXgtbWVudS1hcnJvdyB7XFxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgIHdpZHRoOiAwO1xcbiAgICAgIGhlaWdodDogMDtcXG4gICAgICBsZWZ0OiA1MCU7XFxuICAgICAgdG9wOiAwcHg7IH1cXG4gICAgICBbZGF0YS1heDZ1aS1tZW51XS5kaXJlY3Rpb24tdG9wLndpdGgtYXJyb3cgLmF4LW1lbnUtYXJyb3c6YmVmb3JlIHtcXG4gICAgICAgIGNvbnRlbnQ6ICcgJztcXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICAgIHdpZHRoOiAwO1xcbiAgICAgICAgaGVpZ2h0OiAwO1xcbiAgICAgICAgbGVmdDogLTEwcHg7XFxuICAgICAgICB0b3A6IC0yMHB4O1xcbiAgICAgICAgYm9yZGVyLWxlZnQ6IDEwcHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICAgICAgICBib3JkZXItcmlnaHQ6IDEwcHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICAgICAgICBib3JkZXItYm90dG9tOiAyMHB4IHNvbGlkICNhYWE7IH1cXG4gICAgICBbZGF0YS1heDZ1aS1tZW51XS5kaXJlY3Rpb24tdG9wLndpdGgtYXJyb3cgLmF4LW1lbnUtYXJyb3c6YWZ0ZXIge1xcbiAgICAgICAgY29udGVudDogJyAnO1xcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgICAgd2lkdGg6IDA7XFxuICAgICAgICBoZWlnaHQ6IDA7XFxuICAgICAgICBsZWZ0OiAtMTBweDtcXG4gICAgICAgIHRvcDogLTE4cHg7XFxuICAgICAgICBib3JkZXItbGVmdDogMTBweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gICAgICAgIGJvcmRlci1yaWdodDogMTBweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gICAgICAgIGJvcmRlci1ib3R0b206IDIwcHggc29saWQgI2VlZTsgfVxcbiAgW2RhdGEtYXg2dWktbWVudV0uZGlyZWN0aW9uLXJpZ2h0IHtcXG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDA7XFxuICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAwO1xcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiA1cHg7XFxuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDVweDsgfVxcbiAgICBbZGF0YS1heDZ1aS1tZW51XS5kaXJlY3Rpb24tcmlnaHQud2l0aC1hcnJvdyAuYXgtbWVudS1hcnJvdyB7XFxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgIHdpZHRoOiAwO1xcbiAgICAgIGhlaWdodDogMDtcXG4gICAgICByaWdodDogMHB4O1xcbiAgICAgIHRvcDogNTAlOyB9XFxuICAgICAgW2RhdGEtYXg2dWktbWVudV0uZGlyZWN0aW9uLXJpZ2h0LndpdGgtYXJyb3cgLmF4LW1lbnUtYXJyb3c6YmVmb3JlIHtcXG4gICAgICAgIGNvbnRlbnQ6ICcgJztcXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICAgIHdpZHRoOiAwO1xcbiAgICAgICAgaGVpZ2h0OiAwO1xcbiAgICAgICAgcmlnaHQ6IC0yMHB4O1xcbiAgICAgICAgdG9wOiAtMTBweDtcXG4gICAgICAgIGJvcmRlci10b3A6IDEwcHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICAgICAgICBib3JkZXItYm90dG9tOiAxMHB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICAgICAgYm9yZGVyLWxlZnQ6IDIwcHggc29saWQgI2FhYTsgfVxcbiAgICAgIFtkYXRhLWF4NnVpLW1lbnVdLmRpcmVjdGlvbi1yaWdodC53aXRoLWFycm93IC5heC1tZW51LWFycm93OmFmdGVyIHtcXG4gICAgICAgIGNvbnRlbnQ6ICcgJztcXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICAgIHdpZHRoOiAwO1xcbiAgICAgICAgaGVpZ2h0OiAwO1xcbiAgICAgICAgcmlnaHQ6IC0xOHB4O1xcbiAgICAgICAgdG9wOiAtMTBweDtcXG4gICAgICAgIGJvcmRlci10b3A6IDEwcHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICAgICAgICBib3JkZXItYm90dG9tOiAxMHB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICAgICAgYm9yZGVyLWxlZnQ6IDIwcHggc29saWQgI2VlZTsgfVxcbiAgW2RhdGEtYXg2dWktbWVudV0uZGlyZWN0aW9uLWJvdHRvbSB7XFxuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDA7XFxuICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAwO1xcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiA1cHg7XFxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA1cHg7IH1cXG4gICAgW2RhdGEtYXg2dWktbWVudV0uZGlyZWN0aW9uLWJvdHRvbS53aXRoLWFycm93IC5heC1tZW51LWFycm93IHtcXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgd2lkdGg6IDA7XFxuICAgICAgaGVpZ2h0OiAwO1xcbiAgICAgIGxlZnQ6IDUwJTtcXG4gICAgICBib3R0b206IDBweDsgfVxcbiAgICAgIFtkYXRhLWF4NnVpLW1lbnVdLmRpcmVjdGlvbi1ib3R0b20ud2l0aC1hcnJvdyAuYXgtbWVudS1hcnJvdzpiZWZvcmUge1xcbiAgICAgICAgY29udGVudDogJyAnO1xcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgICAgd2lkdGg6IDA7XFxuICAgICAgICBoZWlnaHQ6IDA7XFxuICAgICAgICBsZWZ0OiAtMTBweDtcXG4gICAgICAgIGJvdHRvbTogLTIwcHg7XFxuICAgICAgICBib3JkZXItbGVmdDogMTBweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gICAgICAgIGJvcmRlci1yaWdodDogMTBweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gICAgICAgIGJvcmRlci10b3A6IDIwcHggc29saWQgI2FhYTsgfVxcbiAgICAgIFtkYXRhLWF4NnVpLW1lbnVdLmRpcmVjdGlvbi1ib3R0b20ud2l0aC1hcnJvdyAuYXgtbWVudS1hcnJvdzphZnRlciB7XFxuICAgICAgICBjb250ZW50OiAnICc7XFxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgICB3aWR0aDogMDtcXG4gICAgICAgIGhlaWdodDogMDtcXG4gICAgICAgIGxlZnQ6IC0xMHB4O1xcbiAgICAgICAgYm90dG9tOiAtMThweDtcXG4gICAgICAgIGJvcmRlci1sZWZ0OiAxMHB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICAgICAgYm9yZGVyLXJpZ2h0OiAxMHB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICAgICAgYm9yZGVyLXRvcDogMjBweCBzb2xpZCAjZWVlOyB9XFxuICBbZGF0YS1heDZ1aS1tZW51XS5kaXJlY3Rpb24tbGVmdCB7XFxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAwO1xcbiAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMDtcXG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDVweDtcXG4gICAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDVweDsgfVxcbiAgICBbZGF0YS1heDZ1aS1tZW51XS5kaXJlY3Rpb24tbGVmdC53aXRoLWFycm93IC5heC1tZW51LWFycm93IHtcXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgd2lkdGg6IDA7XFxuICAgICAgaGVpZ2h0OiAwO1xcbiAgICAgIGxlZnQ6IDBweDtcXG4gICAgICB0b3A6IDUwJTsgfVxcbiAgICAgIFtkYXRhLWF4NnVpLW1lbnVdLmRpcmVjdGlvbi1sZWZ0LndpdGgtYXJyb3cgLmF4LW1lbnUtYXJyb3c6YmVmb3JlIHtcXG4gICAgICAgIGNvbnRlbnQ6ICcgJztcXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICAgIHdpZHRoOiAwO1xcbiAgICAgICAgaGVpZ2h0OiAwO1xcbiAgICAgICAgbGVmdDogLTIwcHg7XFxuICAgICAgICB0b3A6IC0xMHB4O1xcbiAgICAgICAgYm9yZGVyLXRvcDogMTBweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gICAgICAgIGJvcmRlci1ib3R0b206IDEwcHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICAgICAgICBib3JkZXItcmlnaHQ6IDIwcHggc29saWQgI2FhYTsgfVxcbiAgICAgIFtkYXRhLWF4NnVpLW1lbnVdLmRpcmVjdGlvbi1sZWZ0LndpdGgtYXJyb3cgLmF4LW1lbnUtYXJyb3c6YWZ0ZXIge1xcbiAgICAgICAgY29udGVudDogJyAnO1xcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgICAgd2lkdGg6IDA7XFxuICAgICAgICBoZWlnaHQ6IDA7XFxuICAgICAgICBsZWZ0OiAtMThweDtcXG4gICAgICAgIHRvcDogLTEwcHg7XFxuICAgICAgICBib3JkZXItdG9wOiAxMHB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogMTBweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gICAgICAgIGJvcmRlci1yaWdodDogMjBweCBzb2xpZCAjZWVlOyB9XFxuICBbZGF0YS1heDZ1aS1tZW51XS5kZXN0cm95IHtcXG4gICAgLXdlYmtpdC1hbmltYXRpb246IGF4LW1lbnUtZGVzdHJveSAwLjJzIGN1YmljLWJlemllcigwLjYsIC0wLjI4LCAwLjczNSwgMC4wNDUpIGZvcndhcmRzO1xcbiAgICAtbW96LWFuaW1hdGlvbjogYXgtbWVudS1kZXN0cm95IDAuMnMgY3ViaWMtYmV6aWVyKDAuNiwgLTAuMjgsIDAuNzM1LCAwLjA0NSkgZm9yd2FyZHM7XFxuICAgIGFuaW1hdGlvbjogYXgtbWVudS1kZXN0cm95IDAuMnMgY3ViaWMtYmV6aWVyKDAuNiwgLTAuMjgsIDAuNzM1LCAwLjA0NSkgZm9yd2FyZHM7IH1cXG4gIFtkYXRhLWF4NnVpLW1lbnVdLmRpcmVjdGlvbi10b3Age1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciB0b3A7XFxuICAgIC1tb3otdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIHRvcDtcXG4gICAgLW1zLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciB0b3A7XFxuICAgIC1vLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciB0b3A7XFxuICAgIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciB0b3A7IH1cXG4gIFtkYXRhLWF4NnVpLW1lbnVdLmRpcmVjdGlvbi1yaWdodCB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogcmlnaHQgY2VudGVyO1xcbiAgICAtbW96LXRyYW5zZm9ybS1vcmlnaW46IHJpZ2h0IGNlbnRlcjtcXG4gICAgLW1zLXRyYW5zZm9ybS1vcmlnaW46IHJpZ2h0IGNlbnRlcjtcXG4gICAgLW8tdHJhbnNmb3JtLW9yaWdpbjogcmlnaHQgY2VudGVyO1xcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiByaWdodCBjZW50ZXI7IH1cXG4gIFtkYXRhLWF4NnVpLW1lbnVdLmRpcmVjdGlvbi1ib3R0b20ge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciBib3R0b207XFxuICAgIC1tb3otdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIGJvdHRvbTtcXG4gICAgLW1zLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciBib3R0b207XFxuICAgIC1vLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciBib3R0b207XFxuICAgIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciBib3R0b207IH1cXG4gIFtkYXRhLWF4NnVpLW1lbnVdLmRpcmVjdGlvbi1sZWZ0IHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBsZWZ0IGNlbnRlcjtcXG4gICAgLW1vei10cmFuc2Zvcm0tb3JpZ2luOiBsZWZ0IGNlbnRlcjtcXG4gICAgLW1zLXRyYW5zZm9ybS1vcmlnaW46IGxlZnQgY2VudGVyO1xcbiAgICAtby10cmFuc2Zvcm0tb3JpZ2luOiBsZWZ0IGNlbnRlcjtcXG4gICAgdHJhbnNmb3JtLW9yaWdpbjogbGVmdCBjZW50ZXI7IH1cXG5cXG5bZGF0YS1heDZ1aS1tZW51YmFyXSB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuICBbZGF0YS1heDZ1aS1tZW51YmFyXSAuYXgtbWVudS1ib2R5IHtcXG4gICAgZGlzcGxheTogdGFibGU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgYm9yZGVyLWNvbGxhcHNlOiBzZXBhcmF0ZTtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDsgfVxcbiAgICBbZGF0YS1heDZ1aS1tZW51YmFyXSAuYXgtbWVudS1ib2R5IC5heC1tZW51LWl0ZW0ge1xcbiAgICAgIGRpc3BsYXk6IHRhYmxlLWNlbGw7XFxuICAgICAgaGVpZ2h0OiAxMDAlO1xcbiAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxuICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICAgIHBhZGRpbmc6IDBweCAxMHB4O1xcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgICBmb250LXNpemU6IDEzcHg7IH1cXG4gICAgICBbZGF0YS1heDZ1aS1tZW51YmFyXSAuYXgtbWVudS1ib2R5IC5heC1tZW51LWl0ZW0gLmF4LW1lbnUtaXRlbS1jZWxsIHtcXG4gICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTsgfVxcbiAgW2RhdGEtYXg2dWktbWVudWJhcl0gLmF4LW1lbnUtYm9keSAuYXgtbWVudS1pdGVtIHtcXG4gICAgY29sb3I6ICM0NDQ7IH1cXG4gICAgW2RhdGEtYXg2dWktbWVudWJhcl0gLmF4LW1lbnUtYm9keSAuYXgtbWVudS1pdGVtOmhvdmVyLCBbZGF0YS1heDZ1aS1tZW51YmFyXSAuYXgtbWVudS1ib2R5IC5heC1tZW51LWl0ZW0uaG92ZXIge1xcbiAgICAgIGJhY2tncm91bmQ6ICM5OTk7XFxuICAgICAgY29sb3I6ICNmZmY7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vc3JjL0FYNlVJTWVudS9zdHlsZS5zY3NzXG4vLyBtb2R1bGUgaWQgPSA4MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgOCJdLCJzb3VyY2VSb290IjoiIn0=