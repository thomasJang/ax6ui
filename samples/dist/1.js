webpackJsonp([1],Array(32).concat([
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jqmin = __webpack_require__(6);

var _jqmin2 = _interopRequireDefault(_jqmin);

var _axios = __webpack_require__(46);

var _axios2 = _interopRequireDefault(_axios);

var _AX6UIDialog = __webpack_require__(75);

var _AX6UIDialog2 = _interopRequireDefault(_AX6UIDialog);

var _AX6UIUploader = __webpack_require__(108);

var _AX6UIUploader2 = _interopRequireDefault(_AX6UIUploader);

__webpack_require__(76);

__webpack_require__(109);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var html = "\n<div data-ax6ui-uploader=\"upload1\">\n    <button data-ax6ui-uploader-button=\"selector\" class=\"btn btn-primary\">Select File (*/*)</button>\n    (Upload Max fileSize 20MB)\n    <div data-uploaded-box=\"upload1\" data-ax6ui-uploader-uploaded-box=\"inline\"></div>\n</div>\n\n<div style=\"padding: 0;\" data-btn-wrap=\"\">\n    <h5>control</h5>\n    <a class=\"waves-effect waves-light btn\" data-btn=\"getUploadedFiles\">getUploadedFiles</a>\n    <a class=\"waves-effect waves-light btn\" data-btn=\"removeFileAll\">removeFileAll</a>\n</div>\n";
var fn = {
  moduleRun: function moduleRun($body) {
    var dialog = new _AX6UIDialog2.default({
      title: "AX6UIUploader"
    });
    var uploader = new _AX6UIUploader2.default({
      //debug: true,
      target: $body.find('[data-ax6ui-uploader="upload1"]'),
      form: {
        action: "http://api-demo.ax5.io/api/v1/ax5uploader",
        fileName: "file"
      },
      multiple: true,
      manualUpload: false,
      progressBox: true,
      progressBoxDirection: "left",
      dropZone: {
        target: $body.find('[data-uploaded-box="upload1"]')
      },
      uploadedBox: {
        target: $body.find('[data-uploaded-box="upload1"]'),
        icon: {
          "download": '<i class="material-icons">file_download</i>',
          "delete": '<i class="material-icons">delete</i>'
        },
        columnKeys: {
          name: "fileName",
          type: "ext",
          size: "fileSize",
          uploadedName: "saveName",
          uploadedPath: "",
          downloadPath: "",
          previewPath: "",
          thumbnail: ""
        },
        lang: {
          supportedHTML5_emptyListMsg: 'Drop files here or click to upload.',
          emptyListMsg: 'Empty of List.'
        },
        onchange: function onchange() {},
        onclick: function onclick() {
          // console.log(this.cellType);
          var fileIndex = this.fileIndex;
          var file = this.uploadedFiles[fileIndex];
          switch (this.cellType) {
            case "delete":
              dialog.confirm({
                title: "AX5UI",
                msg: "Are you sure you want to delete it?"
              }, function () {
                if (this.key == "ok") {

                  (0, _axios2.default)({
                    headers: {
                      'Content-Type': "application/json"
                    },
                    method: "post",
                    url: 'http://api-demo.ax5.io/api/v1/ax5uploader/delete',
                    data: JSON.stringify([{
                      id: file.id
                    }])
                  }).then(function (res) {
                    uploader.removeFile(fileIndex);
                  }).catch(function (error) {
                    dialog.alert(error);
                  });
                }
              });
              break;

            case "download":
              if (file.download) {
                location.href = "http://api-demo.ax5.io" + file.download;
              }
              break;
          }
        }
      },
      validateSelectedFiles: function validateSelectedFiles() {
        console.log(this);
        // 10개 이상 업로드 되지 않도록 제한.
        if (this.uploadedFiles.length + this.selectedFiles.length > 10) {
          alert("You can not upload more than 10 files.");
          return false;
        }
        return true;
      },
      onprogress: function onprogress() {},
      onuploaderror: function onuploaderror() {
        console.log(this.error);
        dialog.alert(this.error.message);
      },
      onuploaded: function onuploaded() {},
      onuploadComplete: function onuploadComplete() {}
    });

    // 파일 목록 가져오기
    (0, _axios2.default)({
      method: 'get',
      url: 'http://api-demo.ax5.io/api/v1/ax5uploader'
    }).then(function (res) {
      uploader.setUploadedFiles(res.data);
    }).catch(function (error) {
      console.log(error);
    });

    $body.on("click", '[data-btn]', function (e) {
      var btn = e.currentTarget.getAttribute("data-btn");
      var processor = {
        "getUploadedFiles": function getUploadedFiles() {
          var files = uploader.uploadedFiles;
          console.log(files);
          dialog.alert(JSON.stringify(files));
        },
        "removeFileAll": function removeFileAll() {
          dialog.confirm({
            title: "AX6UIUploader",
            msg: "Are you sure you want to delete it?"
          }, function () {
            if (this.key == "ok") {
              var deleteFiles = [];
              uploader.uploadedFiles.forEach(function (f) {
                deleteFiles.push({ id: f.id });
              });

              (0, _axios2.default)({
                headers: {
                  'Content-Type': "application/json"
                },
                method: "post",
                url: 'http://api-demo.ax5.io/api/v1/ax5uploader/delete',
                data: JSON.stringify(deleteFiles)
              }).then(function (res) {
                uploader.removeFileAll();
              }).catch(function (error) {
                console.log(error);
              });
            }
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
/* 33 */,
/* 34 */,
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(38);
var isBuffer = __webpack_require__(48);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object' && !isArray(obj)) {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 36 */
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
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(35);
var normalizeHeaderName = __webpack_require__(50);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(40);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(40);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(39)))

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 39 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(35);
var settle = __webpack_require__(51);
var buildURL = __webpack_require__(53);
var parseHeaders = __webpack_require__(54);
var isURLSameOrigin = __webpack_require__(55);
var createError = __webpack_require__(41);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(56);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if (process.env.NODE_ENV !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(57);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(39)))

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(52);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 44 */,
/* 45 */,
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(47);

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(35);
var bind = __webpack_require__(38);
var Axios = __webpack_require__(49);
var defaults = __webpack_require__(37);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(43);
axios.CancelToken = __webpack_require__(63);
axios.isCancel = __webpack_require__(42);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(64);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 48 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(37);
var utils = __webpack_require__(35);
var InterceptorManager = __webpack_require__(58);
var dispatchRequest = __webpack_require__(59);
var isAbsoluteURL = __webpack_require__(61);
var combineURLs = __webpack_require__(62);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
  config.method = config.method.toLowerCase();

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(35);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(41);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(35);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(35);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(35);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(35);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(35);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(35);
var transformData = __webpack_require__(60);
var isCancel = __webpack_require__(42);
var defaults = __webpack_require__(37);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(35);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(43);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */
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
/* 76 */
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
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "@-webkit-keyframes ax-dialog {\n  0% {\n    opacity: 0.0;\n    -webkit-transform: scaleX(1); }\n  0.1% {\n    opacity: 0.0;\n    -webkit-transform: scaleX(1.3); }\n  100% {\n    opacity: 1.0;\n    -webkit-transform: scaleX(1); } }\n\n@-moz-keyframes ax-dialog {\n  0% {\n    opacity: 0.0;\n    -moz-transform: scaleX(1); }\n  0.1% {\n    opacity: 0.0;\n    -moz-transform: scaleX(1.3); }\n  100% {\n    opacity: 1.0;\n    -moz-transform: scaleX(1); } }\n\n@keyframes ax-dialog {\n  0% {\n    opacity: 0.0;\n    -webkit-transform: scaleX(1);\n    -moz-transform: scaleX(1);\n    -ms-transform: scaleX(1);\n    -o-transform: scaleX(1);\n    transform: scaleX(1); }\n  0.1% {\n    opacity: 0.0;\n    -webkit-transform: scaleX(1.3);\n    -moz-transform: scaleX(1.3);\n    -ms-transform: scaleX(1.3);\n    -o-transform: scaleX(1.3);\n    transform: scaleX(1.3); }\n  100% {\n    opacity: 1.0;\n    -webkit-transform: scaleX(1);\n    -moz-transform: scaleX(1);\n    -ms-transform: scaleX(1);\n    -o-transform: scaleX(1);\n    transform: scaleX(1); } }\n\n@-webkit-keyframes ax-dialog-destroy {\n  from {\n    -webkit-transform: translate(0, 0);\n    opacity: 1.0; }\n  to {\n    -webkit-transform: translate(0, 50%);\n    opacity: 0.0; } }\n\n@-moz-keyframes ax-dialog-destroy {\n  from {\n    -moz-transform: translate(0, 0);\n    opacity: 1.0; }\n  to {\n    -moz-transform: translate(0, 50%);\n    opacity: 0.0; } }\n\n@keyframes ax-dialog-destroy {\n  from {\n    -webkit-transform: translate(0, 0);\n    -moz-transform: translate(0, 0);\n    -ms-transform: translate(0, 0);\n    -o-transform: translate(0, 0);\n    transform: translate(0, 0);\n    opacity: 1.0; }\n  to {\n    -webkit-transform: translate(0, 50%);\n    -moz-transform: translate(0, 50%);\n    -ms-transform: translate(0, 50%);\n    -o-transform: translate(0, 50%);\n    transform: translate(0, 50%);\n    opacity: 0.0; } }\n\n[data-ax6ui-dialog] {\n  -webkit-animation: ax-dialog 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  -moz-animation: ax-dialog 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  animation: ax-dialog 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  -webkit-transform: translateZ(0);\n  -moz-transform: translateZ(0);\n  -ms-transform: translateZ(0);\n  -o-transform: translateZ(0);\n  transform: translateZ(0);\n  box-sizing: border-box;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.175);\n  z-index: 2000;\n  position: fixed;\n  left: 0;\n  top: 0;\n  overflow: hidden;\n  border: 1px solid #ddd; }\n  [data-ax6ui-dialog] .ax-dialog-header {\n    font-weight: 600;\n    padding: 10px 15px;\n    border-bottom: 1px solid transparent; }\n    [data-ax6ui-dialog] .ax-dialog-header .badge {\n      font-size: 0.8em;\n      color: #f5f5f5;\n      background-color: #333; }\n  [data-ax6ui-dialog] .ax-dialog-body {\n    padding: 15px;\n    text-align: center; }\n    [data-ax6ui-dialog] .ax-dialog-body .ax-dialog-msg {\n      padding-top: 15px;\n      padding-bottom: 15px; }\n    [data-ax6ui-dialog] .ax-dialog-body .ax-dialog-prompt {\n      text-align: left;\n      padding-bottom: 7.5px; }\n    [data-ax6ui-dialog] .ax-dialog-body .ax-dialog-buttons {\n      margin-top: 15px; }\n      [data-ax6ui-dialog] .ax-dialog-body .ax-dialog-buttons button:not(:last-child) {\n        margin-right: 3px; }\n    [data-ax6ui-dialog] .ax-dialog-body [data-dialog-els=\"additional-content\"] {\n      margin-top: 15px; }\n  [data-ax6ui-dialog] .ax-dialog-header {\n    color: #333;\n    background: #f5f5f5; }\n    [data-ax6ui-dialog] .ax-dialog-header .badge {\n      color: #f5f5f5;\n      background-color: #333; }\n  [data-ax6ui-dialog].destroy {\n    -webkit-animation: ax-dialog-destroy 0.15s cubic-bezier(0.755, 0.05, 0.855, 0.06) forwards;\n    -moz-animation: ax-dialog-destroy 0.15s cubic-bezier(0.755, 0.05, 0.855, 0.06) forwards;\n    animation: ax-dialog-destroy 0.15s cubic-bezier(0.755, 0.05, 0.855, 0.06) forwards; }\n", ""]);

// exports


/***/ }),
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */
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

var tmpl = {
  uploadProgress: function uploadProgress(columnKeys) {
    return "";
  },
  inputFile: function inputFile(columnKeys) {
    return "<input type=\"file\" data-ax6ui-uploader-input=\"{{instanceId}}\" name=\"{{name}}\" {{#multiple}}multiple{{/multiple}} accept=\"{{accept}}\" />";
  },
  inputFileForm: function inputFileForm(columnKeys) {
    return "<form data-ax6ui-uploader-form=\"{{instanceId}}\" name=\"ax5uploader-{{instanceId}}-form\" method=\"post\" enctype=\"multipart/form-data\"></form>";
  },
  progressBox: function progressBox(columnKeys) {
    return "\n<div data-ax6ui-uploader-progressbox=\"{{instanceId}}\" class=\"{{theme}}\">\n    <div class=\"ax-progressbox-body\">\n        <div class=\"ax-pregressbox-content\">\n            <div class=\"progress\">\n              <div class=\"progress-bar progress-bar-striped active\" role=\"progressbar\" style=\"width: 0\">\n                <span class=\"sr-only\" role=\"progressbarval\">0% Complete</span>\n              </div>\n            </div>\n        </div>\n        {{#btns}}\n            <div class=\"ax-progressbox-buttons\">\n            {{#btns}}\n                {{#@each}}\n                <button data-pregressbox-btn=\"{{@key}}\" class=\"btn btn-default {{@value.theme}}\">{{@value.label}}</button>\n                {{/@each}}\n            {{/btns}}\n            </div>\n        {{/btns}}\n    </div>\n    <div class=\"ax-progressbox-arrow\"></div>\n</div>\n";
  },
  upoadedBox: function upoadedBox(columnKeys) {
    return "\n{{#uploadedFiles}}<div data-ax6ui-uploader-uploaded-item=\"{{@i}}\">\n    <div class=\"uploaded-item-preview\">\n        {{#" + columnKeys.thumbnail + "}}<img src=\"" + columnKeys.apiServerUrl + "{{" + columnKeys.thumbnail + "}}\">{{/" + columnKeys.thumbnail + "}}\n    </div>\n    <div class=\"uploaded-item-holder\">\n        <div class=\"uploaded-item-cell\" data-uploaded-item-cell=\"download\">{{{icon.download}}}</div>\n        <div class=\"uploaded-item-cell\" data-uploaded-item-cell=\"filename\">{{" + columnKeys.name + "}}</div>\n        <div class=\"uploaded-item-cell\" data-uploaded-item-cell=\"filesize\">({{#@fn_get_byte}}{{" + columnKeys.size + "}}{{/@fn_get_byte}})</div>\n        <div class=\"uploaded-item-cell\" data-uploaded-item-cell=\"delete\">{{{icon.delete}}}</div>\n    </div>\n</div>{{/uploadedFiles}}\n{{^uploadedFiles}}\n<div data-ax6ui-uploader-emptyList-msg=\"true\">\n  {{#supportFileApi}}{{{lang.supportedHTML5_emptyListMsg}}}{{/supportFileApi}}\n  {{^supportFileApi}}{{{lang.emptyListMsg}}}{{/supportFileApi}}\n</div>\n{{/uploadedFiles}}\n";
  }
};

var onStateChanged = function onStateChanged(that) {
  if (this.config.onStateChanged) {
    this.config.onStateChanged.call(that, that);
  } else if (this.onStateChanged) {
    this.onStateChanged.call(that, that);
  }

  that = null;
  return true;
};
var onSelectFile = function onSelectFile(_evt) {
  var files = void 0;

  if (!_AX6Info2.default.supportFileApi) {
    // file API 지원 안되는 브라우저.
    // input file에 multiple 지원 안됨 그러므로 단일 파일 처리만 하면 됨.
    files = { path: _evt.target.value };
  } else if ('dataTransfer' in _evt) {
    files = _evt.dataTransfer.files;
  } else if ('target' in _evt) {
    files = _evt.target.files;
  } else if (_evt) {
    files = _evt;
  }

  if (!files) return false;

  /// selectedFiles에 현재 파일 정보 담아두기
  if (length in files) {
    if (files.length == 1) {
      this.selectedFiles = [files[0]];
    } else {
      this.selectedFiles = _AX6Util2.default.toArray(files);
    }
  } else {
    this.selectedFiles = [files];
  }

  if (this.config.progressBox) {
    openProgressBox.call(this);
  }
  if (!this.config.manualUpload) {
    this.send();
  }

  if (!_AX6Info2.default.supportFileApi) {
    alignLayout.call(this, false);
  }
};
var bindEvent = function bindEvent() {
  var _this = this;

  this.$fileSelector.off("click.ax5uploader").on("click.ax5uploader", function (e) {
    _this.$inputFile.trigger("click");
  });

  if (!_AX6Info2.default.supportFileApi) {
    this.$fileSelector.off("mouseover.ax5uploader").on("mouseover.ax5uploader", function (e) {
      alignLayout.call(_this, true);
    });

    this.$inputFile.off("mouseover.ax5uploader").on("mouseover.ax5uploader", function (e) {
      _this.$fileSelector.addClass("active");
    });

    this.$inputFile.off("mouseout.ax5uploader").on("mouseout.ax5uploader", function (e) {
      _this.$fileSelector.removeClass("active");
      alignLayout.call(_this, false);
    });
  }

  {
    if (!this.$uploadedBox || !this.$uploadedBox.get(0)) return false;

    this.$uploadedBox.on("click", "[data-uploaded-item-cell]", function (e) {
      var $this = (0, _jqmin2.default)(e.currentTarget),
          cellType = $this.attr("data-uploaded-item-cell"),
          uploadedItemIndex = Number($this.parents('[data-ax6ui-uploader-uploaded-item]').attr('data-ax6ui-uploader-uploaded-item')),
          that = {};

      if (_this.config.uploadedBox && _this.config.uploadedBox.onclick) {
        that = {
          self: _this,
          cellType: cellType,
          uploadedFiles: _this.uploadedFiles,
          fileIndex: uploadedItemIndex
        };
        _this.config.uploadedBox.onclick.call(that, that);
      }

      $this = null;
      cellType = null;
      uploadedItemIndex = null;
      that = null;
    });

    this.$uploadedBox.on("dragstart", function (e) {
      _AX6Util2.default.stopEvent(e);
      return false;
    });
  }

  {
    // dropZone 설정 방식 변경
    if (!_AX6Info2.default.supportFileApi) return false;
    if (!this.$dropZone || !this.$dropZone.get(0)) return false;

    var timer = void 0;

    this.$dropZone.parent().on("click", "[data-ax6ui-uploader-dropzone]", function (e) {
      var $target = (0, _jqmin2.default)(e.currentTarget);
      if ($target.parents('[data-ax6ui-uploader-uploaded-item]').length == 0 && !$target.attr('data-ax6ui-uploader-uploaded-item')) {
        //console.log(e.currentTarget == e.target, $.contains(e.target, e.currentTarget), e.target.getAttribute('data-ax6ui-uploader-emptylist-msg'));
        if (e.currentTarget == e.target || $.contains(e.target, e.currentTarget) || e.target.getAttribute('data-ax6ui-uploader-emptylist-msg')) {
          if (_AX6Util2.default.isFunction(_this.config.dropZone.onclick)) {
            _this.config.dropZone.onclick.call({
              self: _this
            });
          } else {
            _this.$inputFile.trigger("click");
          }
        }
      }
      $target = null;
    });

    this.$dropZone.get(0).addEventListener('dragover', function (e) {
      _AX6Util2.default.stopEvent(e);

      if (_AX6Util2.default.isFunction(_this.config.dropZone.ondragover)) {
        _this.config.dropZone.ondragover.call({
          self: _this
        });
      } else {
        _this.$dropZone.addClass("dragover");
      }
    }, false);

    this.$dropZone.get(0).addEventListener('dragleave', function (e) {
      _AX6Util2.default.stopEvent(e);

      if (_AX6Util2.default.isFunction(_this.config.dropZone.ondragover)) {
        _this.config.dropZone.ondragout.call({
          self: _this
        });
      } else {
        _this.$dropZone.removeClass("dragover");
      }
    }, false);

    this.$dropZone.get(0).addEventListener('drop', function (e) {
      _AX6Util2.default.stopEvent(e);

      if (_AX6Util2.default.isFunction(_this.config.dropZone.ondrop)) {
        _this.config.dropZone.ondrop.call({
          self: _this
        });
      } else {
        _this.$dropZone.removeClass("dragover");
      }

      onSelectFile.call(_this, e || window.event);
    }, false);
  }
};
var alignLayout = function alignLayout(_TF) {
  // 상황이 좋지 않은경우 (만약 버튼 클릭으로 input file click이 되지 않는 다면 z-index값을 높여서 버튼위를 덮는다.)
  if (_TF) {
    if (!_AX6Info2.default.supportFileApi) {
      // ie9에서 inputFile을 직접 클릭하지 않으면 submit 오류발생함. submit access denied
      // 그래서 버튼위에 inputFile을 올려두어야 함. (position값을 이용하면 편하지만..)
      // 그런데 form을 안에두면 또 다른 이중폼 문제 발생소지 ㅜㅜ 불가피하게 버튼의 offset 값을 이용.
      var box = this.$fileSelector.offset();
      box.width = this.$fileSelector.outerWidth();
      box.height = this.$fileSelector.outerHeight();
      this.$inputFile.css(box);
    }
  } else {
    this.$inputFile.css({
      left: -1000, top: -1000
    });
  }
};
var alignProgressBox = function alignProgressBox(append) {
  var _this2 = this;

  var _alignProgressBox = function _alignProgressBox() {
    var $window = (0, _jqmin2.default)(window),
        $body = (0, _jqmin2.default)(document.body);
    var pos = {},
        positionMargin = 6,
        dim = {},
        pickerDim = {},
        pickerDirection = void 0;

    // this.config.viewport.selector

    pos = this.$progressBox.parent().get(0) == this.$target.get(0) ? this.$fileSelector.position() : this.$fileSelector.offset();
    dim = {
      width: this.$fileSelector.outerWidth(),
      height: this.$fileSelector.outerHeight()
    };
    pickerDim = {
      winWidth: Math.max($window.width(), $body.width()),
      winHeight: Math.max($window.height(), $body.height()),
      width: this.$progressBox.outerWidth(),
      height: this.$progressBox.outerHeight()
    };

    // picker css(width, left, top) & direction 결정
    if (!this.config.progressBoxDirection || this.config.progressBoxDirection === "" || this.config.progressBoxDirection === "auto") {
      // set direction
      pickerDirection = "top";
      if (pos.top - pickerDim.height - positionMargin < 0) {
        pickerDirection = "top";
      } else if (pos.top + dim.height + pickerDim.height + positionMargin > pickerDim.winHeight) {
        pickerDirection = "bottom";
      }
    } else {
      pickerDirection = this.config.progressBoxDirection;
    }

    if (append) {
      this.$progressBox.addClass("direction-" + pickerDirection);
    }

    var positionCSS = function () {
      var css = { left: 0, top: 0 };
      switch (pickerDirection) {
        case "top":
          css.left = pos.left + dim.width / 2 - pickerDim.width / 2;
          css.top = pos.top + dim.height + positionMargin;
          break;
        case "bottom":
          css.left = pos.left + dim.width / 2 - pickerDim.width / 2;
          css.top = pos.top - pickerDim.height - positionMargin;
          break;
        case "left":
          css.left = pos.left + dim.width + positionMargin;
          css.top = pos.top - pickerDim.height / 2 + dim.height / 2;
          break;
        case "right":
          css.left = pos.left - pickerDim.width - positionMargin;
          css.top = pos.top - pickerDim.height / 2 + dim.height / 2;
          break;
      }
      return css;
    }();

    {
      if (pickerDirection == "top" || pickerDirection == "bottom") {
        if (positionCSS.left < 0) {
          positionCSS.left = positionMargin;
          this.$progressBoxArrow.css({ left: pos.left + dim.width / 2 - positionCSS.left });
        } else if (positionCSS.left + pickerDim.width > pickerDim.winWidth) {
          positionCSS.left = pickerDim.winWidth - pickerDim.width - positionMargin;
          this.$progressBoxArrow.css({ left: pos.left + dim.width / 2 - positionCSS.left });
        }
      }
    }

    this.$progressBox.css(positionCSS);
  };

  this.$progressBox.css({ top: -999 });

  if (append) {
    // progressBox를 append 할 타겟 엘리먼트 펀단 후 결정.
    (function () {
      if (this.config.viewport) {
        return (0, _jqmin2.default)(this.config.viewport.selector);
      } else {
        return this.$target;
      }
    }).call(this).append(this.$progressBox);

    // progressBox 버튼에 이벤트 연결.
    this.$progressBox.off("click.ax5uploader").on("click.ax5uploader", "button", function (e) {
      var act = e.currentTarget.getAttribute("data-pregressbox-btn");
      var processor = {
        "upload": function upload() {
          this.send();
        },
        "abort": function abort() {
          this.abort();
        }
      };
      if (processor[act]) processor[act].call(_this2);
    });
  }

  setTimeout(function () {
    _alignProgressBox.call(_this2);
  });
};
var openProgressBox = function openProgressBox() {
  this.$progressBox.removeClass("destroy");
  this.$progressUpload.removeAttr("disabled");
  this.$progressAbort.removeAttr("disabled");

  // apend & align progress box
  alignProgressBox.call(this, "append");

  // state change
  onStateChanged.call(this, {
    self: this,
    state: "open"
  });
};
var closeProgressBox = function closeProgressBox() {
  var _this3 = this;

  this.$progressBox.addClass("destroy");
  setTimeout(function () {
    _this3.$progressBox.remove();
  }, this.config.animateTime);
};
var startUpload = function startUpload() {
  var processor = {
    "html5": function html5() {
      var self = this;
      var uploadFile = this.selectedFiles.shift();
      if (!uploadFile) {
        // 업로드 종료
        uploadComplete.call(this);
        return this;
      }

      if (uploadFile[0]) uploadFile = uploadFile[0];

      var formData = new FormData();
      //서버로 전송해야 할 추가 파라미터 정보 설정

      this.$target.find("input").each(function () {
        formData.append(this.name, this.value);
      });
      // 파일 아이템 추가
      formData.append(this.config.form.fileName, uploadFile);

      this.xhr = new XMLHttpRequest();
      this.xhr.open("post", this.config.form.action, true);
      this.xhr.onload = function (e) {
        var res = e.target.response;
        try {
          if (typeof res == "string") res = _AX6Util2.default.parseJson(res);
        } catch (e) {
          return false;
        }
        if (self.config.debug) console.log(res);

        if (res.error) {
          if (self.config.debug) console.log(res.error);
          if (_AX6Util2.default.isFunction(self.config.onuploaderror)) {
            self.config.onuploaderror.call({
              self: self,
              error: res.error
            }, res);
          }
          self.send();
          return false;
        }

        uploaded.call(self, res);
        self.send();
      };
      this.xhr.upload.onprogress = function (e) {
        updateProgressBar.call(self, e);
        if (_AX6Util2.default.isFunction(self.config.onprogress)) {
          self.config.onprogress.call({
            loaded: e.loaded,
            total: e.total
          }, e);
        }
      };
      this.xhr.send(formData); // multipart/form-data
    },
    "form": function form() {
      var _this4 = this;

      /// i'm busy
      this.__uploading = true;

      // 폼과 iframe을 만들어 페이지 아래에 삽입 후 업로드
      var $iframe = (0, _jqmin2.default)('<iframe src="javascript:false;" name="ax5uploader-' + this.instanceId + '-iframe" style="display:none;"></iframe>');
      (0, _jqmin2.default)(document.body).append($iframe);

      // onload 이벤트 핸들러
      // action에서 파일을 받아 처리한 결과값을 텍스트로 출력한다고 가정하고 iframe의 내부 데이터를 결과값으로 callback 호출
      $iframe.on('load', function (e) {
        var doc = e.currentTarget.contentWindow ? e.currentTarget.contentWindow.document : e.currentTarget.contentDocument ? e.currentTarget.contentDocument : e.currentTarget.document,
            root = doc.documentElement ? doc.documentElement : doc.body,
            result = root.textContent ? root.textContent : root.innerText,
            res = void 0;

        try {
          res = JSON.parse(result);
        } catch (e) {
          res = {
            error: "Syntax error",
            body: result
          };
        }

        if (_this4.config.debug) console.log(res);
        if (res.error) {
          console.log(res);
        } else {
          uploaded.call(_this4, res);
          $iframe.remove();

          setTimeout(function () {
            uploadComplete.call(_this4);
          }, 300);
        }
      });

      this.$inputFileForm.attr("target", 'ax5uploader-' + this.instanceId + '-iframe').attr("action", this.config.form.action).submit();

      this.selectedFilesTotal = 1;
      updateProgressBar.call(this, {
        loaded: 1,
        total: 1
      });
    }
  };

  if (this.__uploading === false) {
    // 전체 파일 사이즈 구하기
    var filesTotal = 0;
    this.selectedFiles.forEach(function (n) {
      filesTotal += n.size;
    });
    this.selectedFilesTotal = filesTotal;
    this.__loaded = 0;

    this.__uploading = true; // 업로드 시작 상태 처리
    this.$progressUpload.attr("disabled", "disabled");
    this.$progressAbort.removeAttr("disabled");
  }

  processor[_AX6Info2.default.supportFileApi ? "html5" : "form"].call(this);
};
var updateProgressBar = function updateProgressBar(e) {
  var percent = _AX6Util2.default.number((this.__loaded + e.loaded) / this.selectedFilesTotal * 100, { round: 2 });
  this.$progressBar.css({ width: percent + '%' });
  this.$progressBarVal.html(percent + '% Complete');
  if (e.loaded >= e.total) {
    this.__loaded += e.total;
  }
  if (e.lengthComputable) {
    if (e.loaded >= e.total) {}
  }
  percent = null;
};
var uploaded = function uploaded(res) {
  if (this.config.debug) console.log(res);
  this.uploadedFiles.push(res);
  repaintUploadedBox.call(this); // 업로드된 파일 출력

  if (_AX6Util2.default.isFunction(this.config.onuploaded)) {
    this.config.onuploaded.call({
      self: this
    }, res);
  }
};
var uploadComplete = function uploadComplete() {
  this.__uploading = false; // 업로드 완료 상태처리
  this.$progressUpload.removeAttr("disabled");
  this.$progressAbort.attr("disabled", "disabled");

  if (this.config.progressBox) {
    closeProgressBox.call(this);
  }
  if (_AX6Util2.default.isFunction(this.config.onuploadComplete)) {
    this.config.onuploadComplete.call({
      self: this
    });
  }
  // update uploadedFiles display

  /// reset inputFile
  attachFileTag.call(this);
};
var cancelUpload = function cancelUpload() {

  var processor = {
    "html5": function html5() {
      if (this.xhr) {
        this.xhr.abort();
      }
    },
    "form": function form() {}
  };

  this.__uploading = false; // 업로드 완료 상태처리
  this.$progressUpload.removeAttr("disabled");
  this.$progressAbort.attr("disabled", "disabled");

  processor[_AX6Info2.default.supportFileApi ? "html5" : "form"].call(this);

  if (this.config.progressBox) {
    closeProgressBox.call(this);
  }

  //this.$inputFile.val("");
  /// reset inputFile
  attachFileTag.call(this);

  if (this.config.debug) console.log("cancelUpload");
  // update uploadedFiles display
};
var repaintUploadedBox = function repaintUploadedBox() {
  // uploadedBox 가 없다면 아무일도 하지 않음.
  // onuploaded 함수 이벤트를 이용하여 개발자가 직접 업로드디 박스를 구현 한다고 이해 하자.
  if (this.$uploadedBox === null) return this;

  this.$uploadedBox.html(_AX6Mustache2.default.render(tmpl.upoadedBox.call(this, this.config.uploadedBox.columnKeys), {
    "@fn_get_byte": function fn_get_byte() {
      return function (text, render) {
        return _AX6Util2.default.number(render(text), { round: 2, byte: true });
      };
    },

    uploadedFiles: this.uploadedFiles,
    icon: this.config.uploadedBox.icon,
    lang: this.config.uploadedBox.lang,
    supportFileApi: !!_AX6Info2.default.supportFileApi
  }));
  this.$uploadedBox.find("img").on("error", function () {
    //this.src = "";
    $(this).parent().addClass("no-image");
  });
};
var attachFileTag = function attachFileTag() {
  var _this5 = this;

  if (this.$inputFile && this.$inputFile.get(0)) {
    this.$inputFile.remove();
  }
  if (this.$inputFileForm && this.$inputFileForm.get(0)) {
    this.$inputFileForm.remove();
  }

  this.$inputFile = (0, _jqmin2.default)(_AX6Mustache2.default.render(tmpl.inputFile.call(this), {
    instanceId: this.instanceId,
    multiple: this.config.multiple,
    accept: this.config.accept,
    name: this.config.form.fileName
  }));

  if (_AX6Info2.default.supportFileApi) {
    (0, _jqmin2.default)(document.body).append(this.$inputFile);
  } else {
    this.$fileSelector.attr("tabindex", -1);
    this.$inputFileForm = (0, _jqmin2.default)(_AX6Mustache2.default.render(tmpl.inputFileForm.call(this), {
      instanceId: this.instanceId
    }));

    this.$inputFileForm.append(this.$inputFile);
    (0, _jqmin2.default)(document.body).append(this.$inputFileForm);
  }

  this.$inputFile.off("change.ax5uploader").on("change.ax5uploader", function (e) {
    onSelectFile.call(_this5, e);
  });
};
/* ~~~~~~~~~~~~~~~~~~ end of private  ~~~~~~~~~~~~~~~~~~~~ */

/**
 * @class
 */

var AX6UIUploader = function (_AX6UICore) {
  _inherits(AX6UIUploader, _AX6UICore);

  /**
   * @constructor
   * @param config
   */
  function AX6UIUploader(config) {
    _classCallCheck(this, AX6UIUploader);

    /**
     * @member {JSON}
     * @param config
     * @param {Element} config.target
     * @param [config.theme='default']
     * @param [config.lang]
     * @param [config.lang.upload='Upload']
     * @param [config.lang.abort='Abort']
     * @param [config.animateTime=100]
     * @param [config.accept="*\/*"]
     * @param [config.multiple=false]
     * @param [config.manualUpload=false]
     * @param [config.progressBox=true]
     * @param [config.progressBoxDirection='left'] - top, bottom, left, right, auto
     * @param [config.form]
     * @param [config.form.action='']
     * @param [config.form.fileName='file']
     * @param [config.dropZone]
     * @param {Element} [config.dropZone.target]
     * @param [config.uploadedBox]
     * @param {Element} [config.uploadedBox.target]
     * @param [config.uploadedBox.icon]
     * @param [config.uploadedBox.icon.download='U+2913']
     * @param [config.uploadedBox.icon.delete='U+232b']
     * @param [config.uploadedBox.columnKeys.name='name']
     * @param [config.uploadedBox.columnKeys.type='type']
     * @param [config.uploadedBox.columnKeys.size='size']
     * @param [config.uploadedBox.columnKeys.uploadedName='uploadedName']
     * @param [config.uploadedBox.columnKeys.uploadedPath='uploadedPath']
     * @param [config.uploadedBox.columnKeys.downloadPath='downloadPath']
     * @param [config.uploadedBox.columnKeys.previewPath='previewPath']
     * @param [config.uploadedBox.columnKeys.thumbnail='thumbnail']
     * @param [config.uploadedBox.lang]
     * @param [config.uploadedBox.lang.supportedHTML5_emptyListMsg='Drop files here or click to upload.']
     * @param [config.uploadedBox.lang.emptyListMsg='Empty of List.']
     * @param {Function} [config.uploadedBox.onchange]
     * @param {Function} [config.uploadedBox.onclick]
     * @param {Function} [config.onprogress]
     * @param {Function} [config.onuploaderror]
     * @param {Function} [config.onuploaded]
     * @param {Function} [config.onuploadComplete]
     */
    var _this6 = _possibleConstructorReturn(this, (AX6UIUploader.__proto__ || Object.getPrototypeOf(AX6UIUploader)).call(this));

    _this6.config = {
      theme: 'default', // theme of uploader
      lang: { // 업로더 버튼 랭귀지 설정
        "upload": "Upload",
        "abort": "Abort"
      },
      animateTime: 100,
      accept: "*/*", // 업로드 선택 파일 타입 설정
      multiple: false, // 다중 파일 업로드
      manualUpload: false, // 업로딩 시작 수동처리 여부
      progressBox: true, // 업로드 프로그래스 박스 사용여부 false 이면 업로드 진행바를 표시 하지 않습니다. 개발자가 onprogress 함수를 이용하여 직접 구현 해야 합니다.
      progressBoxDirection: "left",
      form: {
        action: "",
        fileName: "file"
      },
      dropZone: {
        target: null
      },
      uploadedBox: {
        target: null,
        icon: {
          download: "U+2913",
          delete: "U+232b"
        },
        columnKeys: {
          name: "name",
          type: "type",
          size: "size",
          uploadedName: "uploadedName",
          uploadedPath: "uploadedPath",
          downloadPath: "downloadPath",
          previewPath: "previewPath",
          thumbnail: "thumbnail"
        },
        lang: {
          supportedHTML5_emptyListMsg: 'Drop files here or click to upload.',
          emptyListMsg: 'Empty of List.'
        },
        onchange: null,
        onclick: null
      },
      validateSelectedFiles: null,
      onprogress: null,
      onuploaderror: null,
      onuploaded: null,
      onuploadComplete: null
    };
    _jqmin2.default.extend(true, _this6.config, config);

    // 멤버 변수 초기화
    /**
     * 버튼속성
     * @member {JSON}
     */
    _this6.defaultBtns = {
      "upload": { label: _this6.config.lang["upload"], theme: "upload" },
      "abort": { label: _this6.config.lang["abort"], theme: "abort" }
    };

    /**
     * 업로드된 파일
     * @member {Array}
     */
    _this6.uploadedFiles = [];

    /**
     * 업로더 타겟
     * @member {jQuery}
     */
    _this6.$target = null;

    /**
     * input file 태그
     * @member {jQuery}
     */
    _this6.$inputFile = null;
    /**
     * input form
     * @member {jQuery}
     */
    _this6.$inputFileForm = null;

    /**
     * 파일 선택 버튼
     * @member {jQuery}
     */
    _this6.$fileSelector = null;

    /**
     * 파일 드랍존
     * @member {jQuery}
     */
    _this6.$dropZone = null;

    /**
     * 파일 목록 표시박스
     * @member {jQuery}
     */
    _this6.$uploadedBox = null;

    /**
     * 업로드 진행 상태바
     * @member {Boolean}
     */
    _this6.__uploading = false;

    /**
     * 선택된 파일들
     * @member {Array}
     */
    _this6.selectedFiles = [];

    /**
     * 선택된 파일의 전체 크기
     * @member {Number}
     */
    _this6.selectedFilesTotal = 0;

    /**
     * 전송된 파일 크기
     * @member {Number}
     */
    _this6.__loaded = 0;

    if (typeof config !== "undefined") _this6.init();
    return _this6;
  }

  /**
   * @method
   */


  _createClass(AX6UIUploader, [{
    key: "init",
    value: function init() {
      this.onStateChanged = this.config.onStateChanged;
      delete this.config.onStateChanged;

      if (this.config.target) {
        this.$target = (0, _jqmin2.default)(this.config.target);

        // 파일 드랍존은 옵션 사항.
        if (this.config.dropZone && this.config.dropZone.target && _AX6Info2.default.supportFileApi) {
          this.$dropZone = (0, _jqmin2.default)(this.config.dropZone.target);
          this.$dropZone.attr("data-ax6ui-uploader-dropzone", this.instanceId);
        }

        // uploadedBox 옵션 사항
        if (this.config.uploadedBox && this.config.uploadedBox.target) {
          this.$uploadedBox = (0, _jqmin2.default)(this.config.uploadedBox.target);
        }

        // target attribute data
        (function (data) {
          if (_AX6Util2.default.isObject(data) && !data.error) {
            this.config = _jqmin2.default.extend(true, {}, this.config, data);
          }
        }).call(this, _AX6Util2.default.parseJson(this.$target.attr("data-ax6ui-uploader-config"), true));

        // detect element
        /// fileSelector 수집
        this.$fileSelector = this.$target.find('[data-ax6ui-uploader-button="selector"]');
        if (this.$fileSelector.length === 0) {
          console.log(_AX6Info2.default.getError("ax6ui-uploader", "402", "can not find file selector"));
          return this;
        }

        // input file 추가
        attachFileTag.call(this);

        // btns 확인
        this.config.btns = _jqmin2.default.extend({}, this.defaultBtns, this.config.btns);

        this.$progressBox = (0, _jqmin2.default)(_AX6Mustache2.default.render(tmpl.progressBox.call(this), {
          instanceId: this.instanceId,
          btns: this.config.btns
        }));
        this.$progressBar = this.$progressBox.find('[role="progressbar"]');
        this.$progressBarVal = this.$progressBox.find('[role="progressbarval"]');
        this.$progressBoxArrow = this.$progressBox.find(".ax-progressbox-arrow");
        this.$progressUpload = this.$progressBox.find('[data-pregressbox-btn="upload"]');
        this.$progressAbort = this.$progressBox.find('[data-pregressbox-btn="abort"]');

        // file API가 지원되지 않는 브라우저는 중지 기능 제공 못함.
        if (!_AX6Info2.default.supportFileApi) {
          this.$progressAbort.css({ display: "none" });
        }

        // 파일버튼 등에 이벤트 연결.
        bindEvent.call(this);
        repaintUploadedBox.call(this);
      }

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
     * @returns {AX6UIUploader}
     */

  }, {
    key: "send",
    value: function send() {
      // 업로드 시작
      if (this.selectedFiles.length && _AX6Util2.default.isFunction(this.config.validateSelectedFiles)) {
        var that = {
          self: this,
          uploadedFiles: this.uploadedFiles,
          selectedFiles: this.selectedFiles
        };
        if (!this.config.validateSelectedFiles.call(that, that)) {
          cancelUpload.call(this);
          return false;
          // 전송처리 안함.
        }
      }

      startUpload.call(this);
      return this;
    }

    /**
     * @method
     * @returns {AX6UIUploader}
     */

  }, {
    key: "abort",
    value: function abort() {
      if (!_AX6Info2.default.supportFileApi) {
        alert("This browser not supported abort method");
        return this;
      }
      cancelUpload.call(this);
      return this;
    }

    /**
     * @method
     * @param {Array} _files - JSON formatting can all be overridden in columnKeys.
     * @returns {AX6UIUploader}
     * @example
     * ```js
     * $.ajax({
     *     url: "api/fileListLoad.php",
     *     success: function (res) {
     *         // res JSON format
     *         // [{
     *         // "name": "barcode-scan-ani.gif",
     *         // "saveName": "barcode-scan-ani.gif",
     *         // "type": "file",
     *         // "fileSize": "3891664",
     *         // "uploadedPath": "/ax5ui-uploader/test/api/files",
     *         // "thumbUrl": ""
     *         // }]
     *         upload.setUploadedFiles(res);
     *     }
     * });
     * ```
     */

  }, {
    key: "setUploadedFiles",
    value: function setUploadedFiles(_files) {
      if (_AX6Util2.default.isArray(_files)) {
        this.uploadedFiles = _files;
      }
      if (_AX6Util2.default.isString(_files)) {
        try {
          this.uploadedFiles = JSON.parse(_files);
        } catch (e) {}
      }

      repaintUploadedBox.call(this);
      return this;
    }

    /**
     * clear uploadedFiles
     * @method
     * @returns {AX6UIUploader}
     */

  }, {
    key: "clear",
    value: function clear() {
      this.setUploadedFiles([]);
      return this;
    }

    /**
     * Removes the object corresponding to the index passed to the argument from uploadedFiles.
     * @method
     * @param {Number} _index
     * @returns {AX6UIUploader}
     * @example
     * ```js
     * // The actual file is not deleted
     * upload.removeFile(fileIndex);
     * ```
     */

  }, {
    key: "removeFile",
    value: function removeFile(_index) {
      if (!isNaN(Number(_index))) {
        this.uploadedFiles.splice(_index, 1);
      }
      repaintUploadedBox.call(this);
      return this;
    }

    /**
     * Empty uploadedFiles
     * @method
     * @returns {AX6UIUploader}
     * @example
     * ```js
     *
     * ```
     */

  }, {
    key: "removeFileAll",
    value: function removeFileAll() {
      this.uploadedFiles = [];
      repaintUploadedBox.call(this);
      return this;
    }

    /**
     * @method
     * @returns {Boolean}
     */

  }, {
    key: "selectFile",
    value: function selectFile() {
      if (_AX6Info2.default.supportFileApi) {
        this.$inputFile.trigger("click");
        return true;
      }
      return false;
    }
  }]);

  return AX6UIUploader;
}(_AX6UICore3.default);

exports.default = AX6UIUploader;

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(110);
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
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "@-webkit-keyframes ax-progressbox {\n  0% {\n    opacity: 0.0;\n    -webkit-transform: scale(0); }\n  100% {\n    opacity: 1.0;\n    -webkit-transform: scale(1); } }\n\n@-moz-keyframes ax-progressbox {\n  0% {\n    opacity: 0.0;\n    -moz-transform: scale(0); }\n  100% {\n    opacity: 1.0;\n    -moz-transform: scale(1); } }\n\n@keyframes ax-progressbox {\n  0% {\n    opacity: 0.0;\n    -webkit-transform: scale(0);\n    -moz-transform: scale(0);\n    -ms-transform: scale(0);\n    -o-transform: scale(0);\n    transform: scale(0); }\n  100% {\n    opacity: 1.0;\n    -webkit-transform: scale(1);\n    -moz-transform: scale(1);\n    -ms-transform: scale(1);\n    -o-transform: scale(1);\n    transform: scale(1); } }\n\n@-webkit-keyframes progress-bar-stripes {\n  from {\n    background-position: 40px 0; }\n  to {\n    background-position: 0 0; } }\n\n@-moz-keyframes progress-bar-stripes {\n  from {\n    background-position: 40px 0; }\n  to {\n    background-position: 0 0; } }\n\n@keyframes progress-bar-stripes {\n  from {\n    background-position: 40px 0; }\n  to {\n    background-position: 0 0; } }\n\n@-webkit-keyframes ax-progressbox {\n  0% {\n    opacity: 0.0;\n    -webkit-transform: scale(0); }\n  100% {\n    opacity: 1.0;\n    -webkit-transform: scale(1); } }\n\n@-moz-keyframes ax-progressbox {\n  0% {\n    opacity: 0.0;\n    -moz-transform: scale(0); }\n  100% {\n    opacity: 1.0;\n    -moz-transform: scale(1); } }\n\n@keyframes ax-progressbox {\n  0% {\n    opacity: 0.0;\n    -webkit-transform: scale(0);\n    -moz-transform: scale(0);\n    -ms-transform: scale(0);\n    -o-transform: scale(0);\n    transform: scale(0); }\n  100% {\n    opacity: 1.0;\n    -webkit-transform: scale(1);\n    -moz-transform: scale(1);\n    -ms-transform: scale(1);\n    -o-transform: scale(1);\n    transform: scale(1); } }\n\n[data-ax6ui-uploader] {\n  box-sizing: border-box;\n  position: relative; }\n  [data-ax6ui-uploader] *,\n  [data-ax6ui-uploader] *:before,\n  [data-ax6ui-uploader] *:after {\n    box-sizing: border-box; }\n  [data-ax6ui-uploader] [data-ax6ui-uploader-button=\"selector\"] {\n    position: relative; }\n  [data-ax6ui-uploader] [data-ax6ui-uploader-dropzone] {\n    background: #f3f3f3;\n    border: 2px dashed #0087F7;\n    border-radius: 5px;\n    margin: 10px 0;\n    padding: 7px;\n    cursor: pointer; }\n    [data-ax6ui-uploader] [data-ax6ui-uploader-dropzone].dragover {\n      background: #fff;\n      border: 2px solid #0087F7;\n      opacity: 0.6; }\n\n[data-ax6ui-uploader-uploaded-box] {\n  background: #f3f3f3;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  margin: 10px 0;\n  padding: 7px;\n  min-height: 100px; }\n  [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box] {\n    margin: 10px 0;\n    position: relative; }\n    [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box] [data-ax6ui-uploader-uploaded-item] {\n      display: block;\n      color: #5a5a5a;\n      border: 1px solid #ddd;\n      border-radius: 4px;\n      padding: 0px 3px;\n      margin: 3px;\n      background: #fff; }\n      [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box] [data-ax6ui-uploader-uploaded-item]:hover, [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box] [data-ax6ui-uploader-uploaded-item]:focus, [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box] [data-ax6ui-uploader-uploaded-item].focus {\n        color: #5a5a5a;\n        text-decoration: none; }\n      [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box] [data-ax6ui-uploader-uploaded-item]:active, [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box] [data-ax6ui-uploader-uploaded-item].active {\n        outline: 0;\n        background-image: none;\n        box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125); }\n      [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box] [data-ax6ui-uploader-uploaded-item].disabled, [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box] [data-ax6ui-uploader-uploaded-item][disabled],\n      fieldset[disabled] [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box] [data-ax6ui-uploader-uploaded-item] {\n        cursor: not-allowed;\n        opacity: .65;\n        box-shadow: none; }\n      [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box] [data-ax6ui-uploader-uploaded-item] .uploaded-item-preview {\n        display: none; }\n      [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box] [data-ax6ui-uploader-uploaded-item] .uploaded-item-holder {\n        display: table; }\n        [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box] [data-ax6ui-uploader-uploaded-item] .uploaded-item-holder .uploaded-item-cell {\n          display: table-cell;\n          padding: 0 3px; }\n        [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box] [data-ax6ui-uploader-uploaded-item] .uploaded-item-holder [data-uploaded-item-cell=\"download\"] {\n          cursor: pointer; }\n          [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box] [data-ax6ui-uploader-uploaded-item] .uploaded-item-holder [data-uploaded-item-cell=\"download\"]:hover, [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box] [data-ax6ui-uploader-uploaded-item] .uploaded-item-holder [data-uploaded-item-cell=\"download\"]:focus, [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box] [data-ax6ui-uploader-uploaded-item] .uploaded-item-holder [data-uploaded-item-cell=\"download\"].focus {\n            color: #337ab7;\n            text-decoration: none; }\n        [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box] [data-ax6ui-uploader-uploaded-item] .uploaded-item-holder [data-uploaded-item-cell=\"delete\"] {\n          cursor: pointer; }\n          [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box] [data-ax6ui-uploader-uploaded-item] .uploaded-item-holder [data-uploaded-item-cell=\"delete\"]:hover, [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box] [data-ax6ui-uploader-uploaded-item] .uploaded-item-holder [data-uploaded-item-cell=\"delete\"]:focus, [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box] [data-ax6ui-uploader-uploaded-item] .uploaded-item-holder [data-uploaded-item-cell=\"delete\"].focus {\n            color: #337ab7;\n            text-decoration: none; }\n    [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box] [data-ax6ui-uploader-emptyList-msg] {\n      min-height: 86px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      color: gray; }\n  [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box=\"inline\"]:after {\n    content: \" \";\n    display: block;\n    clear: both; }\n  [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box=\"inline\"] [data-ax6ui-uploader-uploaded-item] {\n    display: block;\n    float: left; }\n  [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box=\"thumbnail\"]:after {\n    content: \" \";\n    display: block;\n    clear: both; }\n  [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box=\"thumbnail\"] [data-ax6ui-uploader-uploaded-item] {\n    display: block;\n    float: left;\n    width: 120px;\n    padding: 0;\n    background: transparent; }\n    [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box=\"thumbnail\"] [data-ax6ui-uploader-uploaded-item]:active, [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box=\"thumbnail\"] [data-ax6ui-uploader-uploaded-item].active {\n      outline: 0;\n      background-image: none;\n      box-shadow: none; }\n    [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box=\"thumbnail\"] [data-ax6ui-uploader-uploaded-item] .uploaded-item-preview {\n      display: block; }\n      [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box=\"thumbnail\"] [data-ax6ui-uploader-uploaded-item] .uploaded-item-preview.no-image {\n        width: 120px;\n        height: 120px;\n        border: 1px solid #ddd;\n        border-radius: 4px;\n        background-color: #66b4fb;\n        background-image: -webkit-linear-gradient(-290deg, #66b4fb, #ff78b2);\n        background-image: linear-gradient(20deg,#66b4fb, #ff78b2);\n        text-align: center;\n        line-height: 120px;\n        color: #fff; }\n        [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box=\"thumbnail\"] [data-ax6ui-uploader-uploaded-item] .uploaded-item-preview.no-image:before {\n          content: 'No Image'; }\n        [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box=\"thumbnail\"] [data-ax6ui-uploader-uploaded-item] .uploaded-item-preview.no-image img {\n          display: none; }\n      [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box=\"thumbnail\"] [data-ax6ui-uploader-uploaded-item] .uploaded-item-preview img {\n        width: 120px;\n        height: 120px;\n        border: 1px solid #ddd;\n        border-radius: 4px; }\n    [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box=\"thumbnail\"] [data-ax6ui-uploader-uploaded-item] .uploaded-item-holder {\n      position: relative;\n      display: block; }\n      [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box=\"thumbnail\"] [data-ax6ui-uploader-uploaded-item] .uploaded-item-holder .uploaded-item-cell {\n        display: block;\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis; }\n      [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box=\"thumbnail\"] [data-ax6ui-uploader-uploaded-item] .uploaded-item-holder [data-uploaded-item-cell=\"download\"] {\n        position: absolute;\n        left: 5px;\n        top: -115px;\n        cursor: pointer;\n        background: #fff;\n        border-radius: 4px; }\n      [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box=\"thumbnail\"] [data-ax6ui-uploader-uploaded-item] .uploaded-item-holder [data-uploaded-item-cell=\"delete\"] {\n        position: absolute;\n        right: 5px;\n        top: -115px;\n        cursor: pointer;\n        background: #fff;\n        border-radius: 4px; }\n      [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box=\"thumbnail\"] [data-ax6ui-uploader-uploaded-item] .uploaded-item-holder [data-uploaded-item-cell=\"filename\"] {\n        padding-top: 5px; }\n\n[data-ax6ui-uploader-input] {\n  position: absolute;\n  left: -1000px;\n  top: -1000px;\n  opacity: 0;\n  cursor: pointer; }\n\n[data-ax6ui-uploader-progressbox] {\n  box-sizing: border-box;\n  z-index: 1000;\n  position: absolute;\n  left: 0px;\n  top: 0px;\n  width: 200px;\n  -webkit-perspective: 1000px;\n  -moz-perspective: 1000px;\n  perspective: 1000px;\n  -webkit-transform-style: preserve-3d;\n  -moz-transform-style: preserve-3d;\n  -ms-transform-style: preserve-3d;\n  -o-transform-style: preserve-3d;\n  transform-style: preserve-3d;\n  -webkit-animation: ax-progressbox 0.1s;\n  -moz-animation: ax-progressbox 0.1s;\n  animation: ax-progressbox 0.1s;\n  -webkit-transform: translateZ(0);\n  -moz-transform: translateZ(0);\n  -ms-transform: translateZ(0);\n  -o-transform: translateZ(0);\n  transform: translateZ(0);\n  -webkit-transform-origin: center top;\n  -moz-transform-origin: center top;\n  -ms-transform-origin: center top;\n  -o-transform-origin: center top;\n  transform-origin: center top;\n  background-color: #fff;\n  background-image: -webkit-linear-gradient(bottom, #fff);\n  background-image: linear-gradient(to top,#fff);\n  border: 1px solid;\n  border-color: #ddd;\n  border-radius: 5px;\n  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.175); }\n  [data-ax6ui-uploader-progressbox] .progress {\n    overflow: hidden;\n    height: 12px;\n    margin-bottom: 0;\n    background-color: #f5f5f5;\n    border-radius: 3px;\n    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1); }\n  [data-ax6ui-uploader-progressbox] .progress-bar {\n    float: left;\n    width: 0%;\n    height: 100%;\n    font-size: 12px;\n    line-height: 12px;\n    color: #fff;\n    text-align: center;\n    background-color: #337ab7;\n    box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);\n    -webkit-transition: width 0.6s ease;\n    -moz-transition: width 0.6s ease;\n    transition: width 0.6s ease; }\n  [data-ax6ui-uploader-progressbox] .progress-striped .progress-bar,\n  [data-ax6ui-uploader-progressbox] .progress-bar-striped {\n    background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n    background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n    background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n    background-size: 40px 40px; }\n  [data-ax6ui-uploader-progressbox] .progress.active .progress-bar,\n  [data-ax6ui-uploader-progressbox] .progress-bar.active {\n    -webkit-animation: progress-bar-stripes 2s linear infinite;\n    -moz-animation: progress-bar-stripes 2s linear infinite;\n    animation: progress-bar-stripes 2s linear infinite; }\n  [data-ax6ui-uploader-progressbox] .ax-progressbox-body {\n    padding: 10px;\n    text-align: center; }\n    [data-ax6ui-uploader-progressbox] .ax-progressbox-body .ax-pregressbox-content {\n      min-width: 50px; }\n    [data-ax6ui-uploader-progressbox] .ax-progressbox-body .ax-progressbox-buttons {\n      text-align: right;\n      padding: 5px 0px 0px 0px; }\n      [data-ax6ui-uploader-progressbox] .ax-progressbox-body .ax-progressbox-buttons button.btn {\n        padding: 3px 7px;\n        font-size: 0.8em; }\n      [data-ax6ui-uploader-progressbox] .ax-progressbox-body .ax-progressbox-buttons button:not(:last-child) {\n        margin-right: 3px; }\n  [data-ax6ui-uploader-progressbox].direction-top .ax-progressbox-arrow {\n    position: absolute;\n    width: 0;\n    height: 0;\n    left: 50%;\n    top: 0; }\n    [data-ax6ui-uploader-progressbox].direction-top .ax-progressbox-arrow:before {\n      content: ' ';\n      position: absolute;\n      width: 0;\n      height: 0;\n      left: -6px;\n      top: -12px;\n      border-left: 6px solid transparent;\n      border-right: 6px solid transparent;\n      border-top: 0 none;\n      border-bottom: 12px solid #ddd; }\n    [data-ax6ui-uploader-progressbox].direction-top .ax-progressbox-arrow:after {\n      content: ' ';\n      position: absolute;\n      width: 0;\n      height: 0;\n      left: -6px;\n      top: -10px;\n      border-left: 6px solid transparent;\n      border-right: 6px solid transparent;\n      border-top: 0 none;\n      border-bottom: 12px solid #fff; }\n  [data-ax6ui-uploader-progressbox].direction-right .ax-progressbox-arrow {\n    position: absolute;\n    width: 0;\n    height: 0;\n    right: 0;\n    top: 50%; }\n    [data-ax6ui-uploader-progressbox].direction-right .ax-progressbox-arrow:before {\n      content: ' ';\n      position: absolute;\n      width: 0;\n      height: 0;\n      right: -12px;\n      top: -6px;\n      border-left: 12px solid #ddd;\n      border-right: 0 none;\n      border-top: 6px solid transparent;\n      border-bottom: 6px solid transparent; }\n    [data-ax6ui-uploader-progressbox].direction-right .ax-progressbox-arrow:after {\n      content: ' ';\n      position: absolute;\n      width: 0;\n      height: 0;\n      right: -10px;\n      top: -6px;\n      border-left: 12px solid #fff;\n      border-right: 0 none;\n      border-top: 6px solid transparent;\n      border-bottom: 6px solid transparent; }\n  [data-ax6ui-uploader-progressbox].direction-bottom .ax-progressbox-arrow {\n    position: absolute;\n    width: 0;\n    height: 0;\n    left: 50%;\n    bottom: 0; }\n    [data-ax6ui-uploader-progressbox].direction-bottom .ax-progressbox-arrow:before {\n      content: ' ';\n      position: absolute;\n      width: 0;\n      height: 0;\n      left: -6px;\n      bottom: -12px;\n      border-left: 6px solid transparent;\n      border-right: 6px solid transparent;\n      border-top: 12px solid #ddd;\n      border-bottom: 0 none; }\n    [data-ax6ui-uploader-progressbox].direction-bottom .ax-progressbox-arrow:after {\n      content: ' ';\n      position: absolute;\n      width: 0;\n      height: 0;\n      left: -6px;\n      bottom: -10px;\n      border-left: 6px solid transparent;\n      border-right: 6px solid transparent;\n      border-top: 12px solid #fff;\n      border-bottom: 0 none; }\n  [data-ax6ui-uploader-progressbox].direction-left .ax-progressbox-arrow {\n    position: absolute;\n    width: 0;\n    height: 0;\n    left: 0;\n    top: 50%; }\n    [data-ax6ui-uploader-progressbox].direction-left .ax-progressbox-arrow:before {\n      content: ' ';\n      position: absolute;\n      width: 0;\n      height: 0;\n      left: -12px;\n      top: -6px;\n      border-left: 0 none;\n      border-right: 12px solid #ddd;\n      border-top: 6px solid transparent;\n      border-bottom: 6px solid transparent; }\n    [data-ax6ui-uploader-progressbox].direction-left .ax-progressbox-arrow:after {\n      content: ' ';\n      position: absolute;\n      width: 0;\n      height: 0;\n      left: -10px;\n      top: -6px;\n      border-left: 0 none;\n      border-right: 12px solid #fff;\n      border-top: 6px solid transparent;\n      border-bottom: 6px solid transparent; }\n  [data-ax6ui-uploader-progressbox].destroy {\n    -webkit-animation: ax-progressbox-destroy 0.1s cubic-bezier(0.6, -0.28, 0.735, 0.045) forwards;\n    -moz-animation: ax-progressbox-destroy 0.1s cubic-bezier(0.6, -0.28, 0.735, 0.045) forwards;\n    animation: ax-progressbox-destroy 0.1s cubic-bezier(0.6, -0.28, 0.735, 0.045) forwards; }\n  [data-ax6ui-uploader-progressbox].direction-top {\n    -webkit-transform-origin: center top;\n    -moz-transform-origin: center top;\n    -ms-transform-origin: center top;\n    -o-transform-origin: center top;\n    transform-origin: center top; }\n  [data-ax6ui-uploader-progressbox].direction-right {\n    -webkit-transform-origin: right center;\n    -moz-transform-origin: right center;\n    -ms-transform-origin: right center;\n    -o-transform-origin: right center;\n    transform-origin: right center; }\n  [data-ax6ui-uploader-progressbox].direction-bottom {\n    -webkit-transform-origin: center bottom;\n    -moz-transform-origin: center bottom;\n    -ms-transform-origin: center bottom;\n    -o-transform-origin: center bottom;\n    transform-origin: center bottom; }\n  [data-ax6ui-uploader-progressbox].direction-left {\n    -webkit-transform-origin: left center;\n    -moz-transform-origin: left center;\n    -ms-transform-origin: left center;\n    -o-transform-origin: left center;\n    transform-origin: left center; }\n", ""]);

// exports


/***/ })
]));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdXBsb2FkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL0FYNk11c3RhY2hlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2FkYXB0ZXJzL3hoci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvY3JlYXRlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2F4aW9zLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pcy1idWZmZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2VuaGFuY2VFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idG9hLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2Rpc3BhdGNoUmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvdHJhbnNmb3JtRGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29tYmluZVVSTHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsVG9rZW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL0FYNlVJRGlhbG9nLmpzIiwid2VicGFjazovLy8uLi9zcmMvQVg2VUlEaWFsb2cvc3R5bGUuc2Nzcz9hNTgyIiwid2VicGFjazovLy8uLi9zcmMvQVg2VUlEaWFsb2cvc3R5bGUuc2NzcyIsIndlYnBhY2s6Ly8vLi4vc3JjL0FYNlVJVXBsb2FkZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9BWDZVSVVwbG9hZGVyL3N0eWxlLnNjc3M/ZDNkOSIsIndlYnBhY2s6Ly8vLi4vc3JjL0FYNlVJVXBsb2FkZXIvc3R5bGUuc2NzcyJdLCJuYW1lcyI6WyJodG1sIiwiZm4iLCJtb2R1bGVSdW4iLCIkYm9keSIsImRpYWxvZyIsInRpdGxlIiwidXBsb2FkZXIiLCJ0YXJnZXQiLCJmaW5kIiwiZm9ybSIsImFjdGlvbiIsImZpbGVOYW1lIiwibXVsdGlwbGUiLCJtYW51YWxVcGxvYWQiLCJwcm9ncmVzc0JveCIsInByb2dyZXNzQm94RGlyZWN0aW9uIiwiZHJvcFpvbmUiLCJ1cGxvYWRlZEJveCIsImljb24iLCJjb2x1bW5LZXlzIiwibmFtZSIsInR5cGUiLCJzaXplIiwidXBsb2FkZWROYW1lIiwidXBsb2FkZWRQYXRoIiwiZG93bmxvYWRQYXRoIiwicHJldmlld1BhdGgiLCJ0aHVtYm5haWwiLCJsYW5nIiwic3VwcG9ydGVkSFRNTDVfZW1wdHlMaXN0TXNnIiwiZW1wdHlMaXN0TXNnIiwib25jaGFuZ2UiLCJvbmNsaWNrIiwiZmlsZUluZGV4IiwiZmlsZSIsInVwbG9hZGVkRmlsZXMiLCJjZWxsVHlwZSIsImNvbmZpcm0iLCJtc2ciLCJrZXkiLCJoZWFkZXJzIiwibWV0aG9kIiwidXJsIiwiZGF0YSIsIkpTT04iLCJzdHJpbmdpZnkiLCJpZCIsInRoZW4iLCJyZW1vdmVGaWxlIiwiY2F0Y2giLCJhbGVydCIsImVycm9yIiwiZG93bmxvYWQiLCJsb2NhdGlvbiIsImhyZWYiLCJ2YWxpZGF0ZVNlbGVjdGVkRmlsZXMiLCJjb25zb2xlIiwibG9nIiwibGVuZ3RoIiwic2VsZWN0ZWRGaWxlcyIsIm9ucHJvZ3Jlc3MiLCJvbnVwbG9hZGVycm9yIiwibWVzc2FnZSIsIm9udXBsb2FkZWQiLCJvbnVwbG9hZENvbXBsZXRlIiwic2V0VXBsb2FkZWRGaWxlcyIsInJlcyIsIm9uIiwiZSIsImJ0biIsImN1cnJlbnRUYXJnZXQiLCJnZXRBdHRyaWJ1dGUiLCJwcm9jZXNzb3IiLCJmaWxlcyIsImRlbGV0ZUZpbGVzIiwiZm9yRWFjaCIsImYiLCJwdXNoIiwicmVtb3ZlRmlsZUFsbCIsIm1vZHVsZURlc3Ryb3kiLCJvZmYiLCJBWDYiLCJkZWZpbmVNdXN0YWNoZSIsImdsb2JhbCIsImZhY3RvcnkiLCJtdXN0YWNoZSIsIm11c3RhY2hlRmFjdG9yeSIsIm9iamVjdFRvU3RyaW5nIiwiT2JqZWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJpc0FycmF5IiwiQXJyYXkiLCJpc0FycmF5UG9seWZpbGwiLCJvYmplY3QiLCJjYWxsIiwiaXNGdW5jdGlvbiIsInR5cGVTdHIiLCJvYmoiLCJlc2NhcGVSZWdFeHAiLCJzdHJpbmciLCJyZXBsYWNlIiwiaGFzUHJvcGVydHkiLCJwcm9wTmFtZSIsInJlZ0V4cFRlc3QiLCJSZWdFeHAiLCJ0ZXN0IiwidGVzdFJlZ0V4cCIsInJlIiwibm9uU3BhY2VSZSIsImlzV2hpdGVzcGFjZSIsImVudGl0eU1hcCIsImVzY2FwZUh0bWwiLCJTdHJpbmciLCJmcm9tRW50aXR5TWFwIiwicyIsIndoaXRlUmUiLCJzcGFjZVJlIiwiZXF1YWxzUmUiLCJjdXJseVJlIiwidGFnUmUiLCJwYXJzZVRlbXBsYXRlIiwidGVtcGxhdGUiLCJ0YWdzIiwic2VjdGlvbnMiLCJ0b2tlbnMiLCJzcGFjZXMiLCJoYXNUYWciLCJub25TcGFjZSIsInN0cmlwU3BhY2UiLCJwb3AiLCJvcGVuaW5nVGFnUmUiLCJjbG9zaW5nVGFnUmUiLCJjbG9zaW5nQ3VybHlSZSIsImNvbXBpbGVUYWdzIiwidGFnc1RvQ29tcGlsZSIsInNwbGl0IiwiRXJyb3IiLCJzY2FubmVyIiwiU2Nhbm5lciIsInN0YXJ0IiwidmFsdWUiLCJjaHIiLCJ0b2tlbiIsIm9wZW5TZWN0aW9uIiwiZW9zIiwicG9zIiwic2NhblVudGlsIiwiaSIsInZhbHVlTGVuZ3RoIiwiY2hhckF0Iiwic2NhbiIsIm5lc3RUb2tlbnMiLCJzcXVhc2hUb2tlbnMiLCJzcXVhc2hlZFRva2VucyIsImxhc3RUb2tlbiIsIm51bVRva2VucyIsIm5lc3RlZFRva2VucyIsImNvbGxlY3RvciIsInNlY3Rpb24iLCJ0YWlsIiwibWF0Y2giLCJpbmRleCIsInN1YnN0cmluZyIsInNlYXJjaCIsIkNvbnRleHQiLCJ2aWV3IiwicGFyZW50Q29udGV4dCIsImNhY2hlIiwicmV0dXJucyIsImsiLCJwYXJlbnQiLCJsb29rdXAiLCJoYXNPd25Qcm9wZXJ0eSIsImNvbnRleHQiLCJuYW1lcyIsImxvb2t1cEhpdCIsImluZGV4T2YiLCJXcml0ZXIiLCJjbGVhckNhY2hlIiwicGFyc2UiLCJyZW5kZXIiLCJwYXJ0aWFscyIsInJlbmRlclRva2VucyIsIm9yaWdpbmFsVGVtcGxhdGUiLCJidWZmZXIiLCJzeW1ib2wiLCJ1bmRlZmluZWQiLCJyZW5kZXJTZWN0aW9uIiwicmVuZGVySW52ZXJ0ZWQiLCJyZW5kZXJQYXJ0aWFsIiwidW5lc2NhcGVkVmFsdWUiLCJlc2NhcGVkVmFsdWUiLCJyYXdWYWx1ZSIsInNlbGYiLCJzdWJSZW5kZXIiLCJqIiwic2xpY2UiLCJlc2NhcGUiLCJ2ZXJzaW9uIiwiZGVmYXVsdFdyaXRlciIsIlR5cGVFcnJvciIsInRvX2h0bWwiLCJzZW5kIiwicmVzdWx0IiwiZGlhbG9nVG1wbCIsIm9uU3RhdGVDaGFuZ2VkIiwib3B0cyIsInRoYXQiLCJnZXRDb250ZW50IiwiZGlhbG9nSWQiLCJjb25maWciLCJpbnB1dCIsImJ0bnMiLCJhZGRpdGlvbmFsQ29udGVudCIsIm9wZW4iLCJjYWxsYmFjayIsImJveCIsIndpZHRoIiwiZGlhbG9nQ29uZmlnIiwiJGFjdGl2ZURpYWxvZyIsImNzcyIsImRvY3VtZW50IiwiYm9keSIsImFwcGVuZCIsImhlaWdodCIsInBvc2l0aW9uIiwidG9wIiwid2luZG93IiwibGVmdCIsInpJbmRleCIsImNsaWNrRXZlbnROYW1lIiwiYnRuT25DbGljayIsImV2ZW50IiwiZGlhbG9nVHlwZSIsInRyaWdnZXIiLCJvbktleXVwIiwidGhyb3R0bGUiLCJhbGlnbiIsImJpbmQiLCJzdGF0ZSIsImF1dG9DbG9zZVRpbWUiLCJhdXRvQ2xvc2VUaW1lciIsInNldFRpbWVvdXQiLCJjbG9zZSIsImlubmVySGVpZ2h0IiwiaW5uZXJXaWR0aCIsImVtcHR5S2V5Iiwic3JjRWxlbWVudCIsImZpbmRQYXJlbnROb2RlIiwiYnRuVGFyZ2V0Iiwib2kiLCJ2YWwiLCJyZXF1aXJlZCIsIm9uQ2xpY2siLCJkb05vdENhbGxiYWNrIiwiZ2V0IiwiZm9jdXMiLCJrZXlDb2RlIiwiZXZlbnRLZXlzIiwiRVNDIiwiUkVUVVJOIiwiQVg2VUlEaWFsb2ciLCJpbnN0YW5jZUlkIiwidGhlbWUiLCJhbmltYXRlVGltZSIsImV4dGVuZCIsInF1ZXVlIiwiaW5pdCIsImluaXRPbmNlIiwiaW5pdGlhbGl6ZWQiLCJ0cnlDb3VudCIsImlzU3RyaW5nIiwib2siLCJsYWJlbCIsImNhbmNlbCIsIl9vcHRpb24iLCJjbGVhclRpbWVvdXQiLCJhZGRDbGFzcyIsInJlbW92ZSIsInNoaWZ0IiwidG1wbCIsInVwbG9hZFByb2dyZXNzIiwiaW5wdXRGaWxlIiwiaW5wdXRGaWxlRm9ybSIsInVwb2FkZWRCb3giLCJhcGlTZXJ2ZXJVcmwiLCJvblNlbGVjdEZpbGUiLCJfZXZ0Iiwic3VwcG9ydEZpbGVBcGkiLCJwYXRoIiwiZGF0YVRyYW5zZmVyIiwidG9BcnJheSIsIm9wZW5Qcm9ncmVzc0JveCIsImFsaWduTGF5b3V0IiwiYmluZEV2ZW50IiwiJGZpbGVTZWxlY3RvciIsIiRpbnB1dEZpbGUiLCJyZW1vdmVDbGFzcyIsIiR1cGxvYWRlZEJveCIsIiR0aGlzIiwiYXR0ciIsInVwbG9hZGVkSXRlbUluZGV4IiwiTnVtYmVyIiwicGFyZW50cyIsInN0b3BFdmVudCIsIiRkcm9wWm9uZSIsInRpbWVyIiwiJHRhcmdldCIsIiQiLCJjb250YWlucyIsImFkZEV2ZW50TGlzdGVuZXIiLCJvbmRyYWdvdmVyIiwib25kcmFnb3V0Iiwib25kcm9wIiwiX1RGIiwib2Zmc2V0Iiwib3V0ZXJXaWR0aCIsIm91dGVySGVpZ2h0IiwiYWxpZ25Qcm9ncmVzc0JveCIsIl9hbGlnblByb2dyZXNzQm94IiwiJHdpbmRvdyIsInBvc2l0aW9uTWFyZ2luIiwiZGltIiwicGlja2VyRGltIiwicGlja2VyRGlyZWN0aW9uIiwiJHByb2dyZXNzQm94Iiwid2luV2lkdGgiLCJNYXRoIiwibWF4Iiwid2luSGVpZ2h0IiwicG9zaXRpb25DU1MiLCIkcHJvZ3Jlc3NCb3hBcnJvdyIsInZpZXdwb3J0Iiwic2VsZWN0b3IiLCJhY3QiLCJhYm9ydCIsIiRwcm9ncmVzc1VwbG9hZCIsInJlbW92ZUF0dHIiLCIkcHJvZ3Jlc3NBYm9ydCIsImNsb3NlUHJvZ3Jlc3NCb3giLCJzdGFydFVwbG9hZCIsInVwbG9hZEZpbGUiLCJ1cGxvYWRDb21wbGV0ZSIsImZvcm1EYXRhIiwiRm9ybURhdGEiLCJlYWNoIiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvbmxvYWQiLCJyZXNwb25zZSIsInBhcnNlSnNvbiIsImRlYnVnIiwidXBsb2FkZWQiLCJ1cGxvYWQiLCJ1cGRhdGVQcm9ncmVzc0JhciIsImxvYWRlZCIsInRvdGFsIiwiX191cGxvYWRpbmciLCIkaWZyYW1lIiwiZG9jIiwiY29udGVudFdpbmRvdyIsImNvbnRlbnREb2N1bWVudCIsInJvb3QiLCJkb2N1bWVudEVsZW1lbnQiLCJ0ZXh0Q29udGVudCIsImlubmVyVGV4dCIsIiRpbnB1dEZpbGVGb3JtIiwic3VibWl0Iiwic2VsZWN0ZWRGaWxlc1RvdGFsIiwiZmlsZXNUb3RhbCIsIm4iLCJfX2xvYWRlZCIsInBlcmNlbnQiLCJudW1iZXIiLCJyb3VuZCIsIiRwcm9ncmVzc0JhciIsIiRwcm9ncmVzc0JhclZhbCIsImxlbmd0aENvbXB1dGFibGUiLCJyZXBhaW50VXBsb2FkZWRCb3giLCJhdHRhY2hGaWxlVGFnIiwiY2FuY2VsVXBsb2FkIiwidGV4dCIsImJ5dGUiLCJhY2NlcHQiLCJBWDZVSVVwbG9hZGVyIiwiZGVsZXRlIiwiZGVmYXVsdEJ0bnMiLCJpc09iamVjdCIsImdldEVycm9yIiwiZGlzcGxheSIsIl9maWxlcyIsIl9pbmRleCIsImlzTmFOIiwic3BsaWNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztB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QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFVBQVU7Ozs7Ozs7OytDQ3ZMdEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw0Q0FBNEM7QUFDNUM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7O0FDbkxBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsYUFBYSxNQUFNO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QXFELDJDQUEyQyx3Q0FBd0MsdUNBQXVDLHNDQUFzQyxtQ0FBbUMsRUFBRSx1REFBdUQsNkNBQTZDLDBDQUEwQyx5Q0FBeUMsd0NBQXdDLHFDQUFxQyxFQUFFLHdEQUF3RCw4Q0FBOEMsMkNBQTJDLDBDQUEwQyx5Q0FBeUMsc0NBQXNDLEVBQUUsc0RBQXNELDRDQUE0Qyx5Q0FBeUMsd0NBQXdDLHVDQUF1QyxvQ0FBb0MsRUFBRTs7QUFFenBsQiIsImZpbGUiOiIxLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSBcImpxbWluXCI7XG5pbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XG5pbXBvcnQgRGlhbG9nIGZyb20gXCIuLi8uLi9zcmMvQVg2VUlEaWFsb2dcIjtcbmltcG9ydCBVcGxvYWRlciBmcm9tIFwiLi4vLi4vc3JjL0FYNlVJVXBsb2FkZXJcIjtcbmltcG9ydCBcIi4uLy4uL3NyYy9BWDZVSURpYWxvZy9zdHlsZS5zY3NzXCI7XG5pbXBvcnQgXCIuLi8uLi9zcmMvQVg2VUlVcGxvYWRlci9zdHlsZS5zY3NzXCI7XG5cbmxldCBodG1sID0gYFxuPGRpdiBkYXRhLWF4NnVpLXVwbG9hZGVyPVwidXBsb2FkMVwiPlxuICAgIDxidXR0b24gZGF0YS1heDZ1aS11cGxvYWRlci1idXR0b249XCJzZWxlY3RvclwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCI+U2VsZWN0IEZpbGUgKCovKik8L2J1dHRvbj5cbiAgICAoVXBsb2FkIE1heCBmaWxlU2l6ZSAyME1CKVxuICAgIDxkaXYgZGF0YS11cGxvYWRlZC1ib3g9XCJ1cGxvYWQxXCIgZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3g9XCJpbmxpbmVcIj48L2Rpdj5cbjwvZGl2PlxuXG48ZGl2IHN0eWxlPVwicGFkZGluZzogMDtcIiBkYXRhLWJ0bi13cmFwPVwiXCI+XG4gICAgPGg1PmNvbnRyb2w8L2g1PlxuICAgIDxhIGNsYXNzPVwid2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0IGJ0blwiIGRhdGEtYnRuPVwiZ2V0VXBsb2FkZWRGaWxlc1wiPmdldFVwbG9hZGVkRmlsZXM8L2E+XG4gICAgPGEgY2xhc3M9XCJ3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHQgYnRuXCIgZGF0YS1idG49XCJyZW1vdmVGaWxlQWxsXCI+cmVtb3ZlRmlsZUFsbDwvYT5cbjwvZGl2PlxuYDtcbmxldCBmbiA9IHtcbiAgbW9kdWxlUnVuOiBmdW5jdGlvbiAoJGJvZHkpIHtcbiAgICBsZXQgZGlhbG9nID0gbmV3IERpYWxvZyh7XG4gICAgICB0aXRsZTogXCJBWDZVSVVwbG9hZGVyXCJcbiAgICB9KTtcbiAgICBsZXQgdXBsb2FkZXIgPSBuZXcgVXBsb2FkZXIoe1xuICAgICAgLy9kZWJ1ZzogdHJ1ZSxcbiAgICAgIHRhcmdldDogJGJvZHkuZmluZCgnW2RhdGEtYXg2dWktdXBsb2FkZXI9XCJ1cGxvYWQxXCJdJyksXG4gICAgICBmb3JtOiB7XG4gICAgICAgIGFjdGlvbjogXCJodHRwOi8vYXBpLWRlbW8uYXg1LmlvL2FwaS92MS9heDV1cGxvYWRlclwiLFxuICAgICAgICBmaWxlTmFtZTogXCJmaWxlXCJcbiAgICAgIH0sXG4gICAgICBtdWx0aXBsZTogdHJ1ZSxcbiAgICAgIG1hbnVhbFVwbG9hZDogZmFsc2UsXG4gICAgICBwcm9ncmVzc0JveDogdHJ1ZSxcbiAgICAgIHByb2dyZXNzQm94RGlyZWN0aW9uOiBcImxlZnRcIixcbiAgICAgIGRyb3Bab25lOiB7XG4gICAgICAgIHRhcmdldDogJGJvZHkuZmluZCgnW2RhdGEtdXBsb2FkZWQtYm94PVwidXBsb2FkMVwiXScpXG4gICAgICB9LFxuICAgICAgdXBsb2FkZWRCb3g6IHtcbiAgICAgICAgdGFyZ2V0OiAkYm9keS5maW5kKCdbZGF0YS11cGxvYWRlZC1ib3g9XCJ1cGxvYWQxXCJdJyksXG4gICAgICAgIGljb246IHtcbiAgICAgICAgICBcImRvd25sb2FkXCI6ICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+ZmlsZV9kb3dubG9hZDwvaT4nLFxuICAgICAgICAgIFwiZGVsZXRlXCI6ICc8aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+ZGVsZXRlPC9pPidcbiAgICAgICAgfSxcbiAgICAgICAgY29sdW1uS2V5czoge1xuICAgICAgICAgIG5hbWU6IFwiZmlsZU5hbWVcIixcbiAgICAgICAgICB0eXBlOiBcImV4dFwiLFxuICAgICAgICAgIHNpemU6IFwiZmlsZVNpemVcIixcbiAgICAgICAgICB1cGxvYWRlZE5hbWU6IFwic2F2ZU5hbWVcIixcbiAgICAgICAgICB1cGxvYWRlZFBhdGg6IFwiXCIsXG4gICAgICAgICAgZG93bmxvYWRQYXRoOiBcIlwiLFxuICAgICAgICAgIHByZXZpZXdQYXRoOiBcIlwiLFxuICAgICAgICAgIHRodW1ibmFpbDogXCJcIlxuICAgICAgICB9LFxuICAgICAgICBsYW5nOiB7XG4gICAgICAgICAgc3VwcG9ydGVkSFRNTDVfZW1wdHlMaXN0TXNnOiAnRHJvcCBmaWxlcyBoZXJlIG9yIGNsaWNrIHRvIHVwbG9hZC4nLFxuICAgICAgICAgIGVtcHR5TGlzdE1zZzogJ0VtcHR5IG9mIExpc3QuJ1xuICAgICAgICB9LFxuICAgICAgICBvbmNoYW5nZTogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIH0sXG4gICAgICAgIG9uY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmNlbGxUeXBlKTtcbiAgICAgICAgICBsZXQgZmlsZUluZGV4ID0gdGhpcy5maWxlSW5kZXg7XG4gICAgICAgICAgbGV0IGZpbGUgPSB0aGlzLnVwbG9hZGVkRmlsZXNbZmlsZUluZGV4XTtcbiAgICAgICAgICBzd2l0Y2ggKHRoaXMuY2VsbFR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJkZWxldGVcIjpcbiAgICAgICAgICAgICAgZGlhbG9nLmNvbmZpcm0oe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBcIkFYNVVJXCIsXG4gICAgICAgICAgICAgICAgbXNnOiBcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgaXQ/XCJcbiAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmtleSA9PSBcIm9rXCIpIHtcblxuICAgICAgICAgICAgICAgICAgYXhpb3Moe1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwicG9zdFwiLFxuICAgICAgICAgICAgICAgICAgICB1cmw6ICdodHRwOi8vYXBpLWRlbW8uYXg1LmlvL2FwaS92MS9heDV1cGxvYWRlci9kZWxldGUnLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShbe1xuICAgICAgICAgICAgICAgICAgICAgIGlkOiBmaWxlLmlkXG4gICAgICAgICAgICAgICAgICAgIH1dKSxcbiAgICAgICAgICAgICAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdXBsb2FkZXIucmVtb3ZlRmlsZShmaWxlSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICBkaWFsb2cuYWxlcnQoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBcImRvd25sb2FkXCI6XG4gICAgICAgICAgICAgIGlmIChmaWxlLmRvd25sb2FkKSB7XG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9IFwiaHR0cDovL2FwaS1kZW1vLmF4NS5pb1wiICsgZmlsZS5kb3dubG9hZDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB2YWxpZGF0ZVNlbGVjdGVkRmlsZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcyk7XG4gICAgICAgIC8vIDEw6rCcIOydtOyDgSDsl4XroZzrk5wg65CY7KeAIOyViuuPhOuhnSDsoJztlZwuXG4gICAgICAgIGlmICh0aGlzLnVwbG9hZGVkRmlsZXMubGVuZ3RoICsgdGhpcy5zZWxlY3RlZEZpbGVzLmxlbmd0aCA+IDEwKSB7XG4gICAgICAgICAgYWxlcnQoXCJZb3UgY2FuIG5vdCB1cGxvYWQgbW9yZSB0aGFuIDEwIGZpbGVzLlwiKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9LFxuICAgICAgb25wcm9ncmVzczogZnVuY3Rpb24gKCkge1xuXG4gICAgICB9LFxuICAgICAgb251cGxvYWRlcnJvcjogZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmVycm9yKTtcbiAgICAgICAgZGlhbG9nLmFsZXJ0KHRoaXMuZXJyb3IubWVzc2FnZSk7XG4gICAgICB9LFxuICAgICAgb251cGxvYWRlZDogZnVuY3Rpb24gKCkge1xuXG4gICAgICB9LFxuICAgICAgb251cGxvYWRDb21wbGV0ZTogZnVuY3Rpb24gKCkge1xuXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyDtjIzsnbwg66qp66GdIOqwgOyguOyYpOq4sFxuICAgIGF4aW9zKHtcbiAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICB1cmw6ICdodHRwOi8vYXBpLWRlbW8uYXg1LmlvL2FwaS92MS9heDV1cGxvYWRlcidcbiAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICB1cGxvYWRlci5zZXRVcGxvYWRlZEZpbGVzKHJlcy5kYXRhKTtcbiAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfSk7XG5cbiAgICAkYm9keS5vbihcImNsaWNrXCIsICdbZGF0YS1idG5dJywgKGUpID0+IHtcbiAgICAgIGxldCBidG4gPSBlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1idG5cIik7XG4gICAgICBsZXQgcHJvY2Vzc29yID0ge1xuICAgICAgICBcImdldFVwbG9hZGVkRmlsZXNcIigpIHtcbiAgICAgICAgICBsZXQgZmlsZXMgPSB1cGxvYWRlci51cGxvYWRlZEZpbGVzO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGZpbGVzKTtcbiAgICAgICAgICBkaWFsb2cuYWxlcnQoSlNPTi5zdHJpbmdpZnkoZmlsZXMpKTtcbiAgICAgICAgfSxcbiAgICAgICAgXCJyZW1vdmVGaWxlQWxsXCIoKSB7XG4gICAgICAgICAgZGlhbG9nLmNvbmZpcm0oe1xuICAgICAgICAgICAgdGl0bGU6IFwiQVg2VUlVcGxvYWRlclwiLFxuICAgICAgICAgICAgbXNnOiBcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgaXQ/XCJcbiAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5rZXkgPT0gXCJva1wiKSB7XG4gICAgICAgICAgICAgIGxldCBkZWxldGVGaWxlcyA9IFtdO1xuICAgICAgICAgICAgICB1cGxvYWRlci51cGxvYWRlZEZpbGVzLmZvckVhY2goZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgICAgICAgICBkZWxldGVGaWxlcy5wdXNoKHtpZDogZi5pZH0pO1xuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICBheGlvcyh7XG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbWV0aG9kOiBcInBvc3RcIixcbiAgICAgICAgICAgICAgICB1cmw6ICdodHRwOi8vYXBpLWRlbW8uYXg1LmlvL2FwaS92MS9heDV1cGxvYWRlci9kZWxldGUnLFxuICAgICAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGRlbGV0ZUZpbGVzKSxcbiAgICAgICAgICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgIHVwbG9hZGVyLnJlbW92ZUZpbGVBbGwoKTtcbiAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgaWYgKGJ0biBpbiBwcm9jZXNzb3IpIHtcbiAgICAgICAgcHJvY2Vzc29yW2J0bl0oKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcbiAgbW9kdWxlRGVzdHJveTogZnVuY3Rpb24gKCRib2R5KSB7XG4gICAgJGJvZHkub2ZmKFwiY2xpY2tcIik7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaHRtbDogaHRtbCxcbiAgZm46IGZuXG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91cGxvYWRlci5qcyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xudmFyIGlzQnVmZmVyID0gcmVxdWlyZSgnaXMtYnVmZmVyJyk7XG5cbi8qZ2xvYmFsIHRvU3RyaW5nOnRydWUqL1xuXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5KHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBGb3JtRGF0YSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRm9ybURhdGEodmFsKSB7XG4gIHJldHVybiAodHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJykgJiYgKHZhbCBpbnN0YW5jZW9mIEZvcm1EYXRhKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnKSAmJiAoQXJyYXlCdWZmZXIuaXNWaWV3KSkge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9ICh2YWwpICYmICh2YWwuYnVmZmVyKSAmJiAodmFsLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyaW5nXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmluZyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgTnVtYmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBOdW1iZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc051bWJlcih2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdudW1iZXInO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRGF0ZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRGF0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRGF0ZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRmlsZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRmlsZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQmxvYlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQmxvYiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQmxvYih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQmxvYl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZ1bmN0aW9uLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmVhbVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyZWFtLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJlYW0odmFsKSB7XG4gIHJldHVybiBpc09iamVjdCh2YWwpICYmIGlzRnVuY3Rpb24odmFsLnBpcGUpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVVJMU2VhcmNoUGFyYW1zKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIFVSTFNlYXJjaFBhcmFtcyAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsIGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zO1xufVxuXG4vKipcbiAqIFRyaW0gZXhjZXNzIHdoaXRlc3BhY2Ugb2ZmIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIFN0cmluZyB0byB0cmltXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgU3RyaW5nIGZyZWVkIG9mIGV4Y2VzcyB3aGl0ZXNwYWNlXG4gKi9cbmZ1bmN0aW9uIHRyaW0oc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyovLCAnJykucmVwbGFjZSgvXFxzKiQvLCAnJyk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICovXG5mdW5jdGlvbiBpc1N0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnUmVhY3ROYXRpdmUnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG4gICk7XG59XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFuIEFycmF5IG9yIGFuIE9iamVjdCBpbnZva2luZyBhIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgYG9iamAgaXMgYW4gQXJyYXkgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBpbmRleCwgYW5kIGNvbXBsZXRlIGFycmF5IGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgJ29iaicgaXMgYW4gT2JqZWN0IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwga2V5LCBhbmQgY29tcGxldGUgb2JqZWN0IGZvciBlYWNoIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBvYmogVGhlIG9iamVjdCB0byBpdGVyYXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2sgdG8gaW52b2tlIGZvciBlYWNoIGl0ZW1cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChvYmosIGZuKSB7XG4gIC8vIERvbid0IGJvdGhlciBpZiBubyB2YWx1ZSBwcm92aWRlZFxuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gRm9yY2UgYW4gYXJyYXkgaWYgbm90IGFscmVhZHkgc29tZXRoaW5nIGl0ZXJhYmxlXG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JyAmJiAhaXNBcnJheShvYmopKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgb2JqID0gW29ial07XG4gIH1cblxuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFycmF5IHZhbHVlc1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpbaV0sIGksIG9iaik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBvYmplY3Qga2V5c1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBBY2NlcHRzIHZhcmFyZ3MgZXhwZWN0aW5nIGVhY2ggYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0LCB0aGVuXG4gKiBpbW11dGFibHkgbWVyZ2VzIHRoZSBwcm9wZXJ0aWVzIG9mIGVhY2ggb2JqZWN0IGFuZCByZXR1cm5zIHJlc3VsdC5cbiAqXG4gKiBXaGVuIG11bHRpcGxlIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBrZXkgdGhlIGxhdGVyIG9iamVjdCBpblxuICogdGhlIGFyZ3VtZW50cyBsaXN0IHdpbGwgdGFrZSBwcmVjZWRlbmNlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHZhciByZXN1bHQgPSBtZXJnZSh7Zm9vOiAxMjN9LCB7Zm9vOiA0NTZ9KTtcbiAqIGNvbnNvbGUubG9nKHJlc3VsdC5mb28pOyAvLyBvdXRwdXRzIDQ1NlxuICogYGBgXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gbWVyZ2UoLyogb2JqMSwgb2JqMiwgb2JqMywgLi4uICovKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodHlwZW9mIHJlc3VsdFtrZXldID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgcmVzdWx0W2tleV0gPSBtZXJnZShyZXN1bHRba2V5XSwgdmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgZm9yRWFjaChhcmd1bWVudHNbaV0sIGFzc2lnblZhbHVlKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEV4dGVuZHMgb2JqZWN0IGEgYnkgbXV0YWJseSBhZGRpbmcgdG8gaXQgdGhlIHByb3BlcnRpZXMgb2Ygb2JqZWN0IGIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGEgVGhlIG9iamVjdCB0byBiZSBleHRlbmRlZFxuICogQHBhcmFtIHtPYmplY3R9IGIgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbVxuICogQHBhcmFtIHtPYmplY3R9IHRoaXNBcmcgVGhlIG9iamVjdCB0byBiaW5kIGZ1bmN0aW9uIHRvXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSByZXN1bHRpbmcgdmFsdWUgb2Ygb2JqZWN0IGFcbiAqL1xuZnVuY3Rpb24gZXh0ZW5kKGEsIGIsIHRoaXNBcmcpIHtcbiAgZm9yRWFjaChiLCBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0aGlzQXJnICYmIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGFba2V5XSA9IGJpbmQodmFsLCB0aGlzQXJnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYVtrZXldID0gdmFsO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBhO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNBcnJheTogaXNBcnJheSxcbiAgaXNBcnJheUJ1ZmZlcjogaXNBcnJheUJ1ZmZlcixcbiAgaXNCdWZmZXI6IGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhOiBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldzogaXNBcnJheUJ1ZmZlclZpZXcsXG4gIGlzU3RyaW5nOiBpc1N0cmluZyxcbiAgaXNOdW1iZXI6IGlzTnVtYmVyLFxuICBpc09iamVjdDogaXNPYmplY3QsXG4gIGlzVW5kZWZpbmVkOiBpc1VuZGVmaW5lZCxcbiAgaXNEYXRlOiBpc0RhdGUsXG4gIGlzRmlsZTogaXNGaWxlLFxuICBpc0Jsb2I6IGlzQmxvYixcbiAgaXNGdW5jdGlvbjogaXNGdW5jdGlvbixcbiAgaXNTdHJlYW06IGlzU3RyZWFtLFxuICBpc1VSTFNlYXJjaFBhcmFtczogaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzU3RhbmRhcmRCcm93c2VyRW52OiBpc1N0YW5kYXJkQnJvd3NlckVudixcbiAgZm9yRWFjaDogZm9yRWFjaCxcbiAgbWVyZ2U6IG1lcmdlLFxuICBleHRlbmQ6IGV4dGVuZCxcbiAgdHJpbTogdHJpbVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi91dGlscy5qc1xuLy8gbW9kdWxlIGlkID0gMzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIi8qIVxuICogbXVzdGFjaGUuanMgLSBMb2dpYy1sZXNzIHt7bXVzdGFjaGV9fSB0ZW1wbGF0ZXMgd2l0aCBKYXZhU2NyaXB0XG4gKiBodHRwOi8vZ2l0aHViLmNvbS9qYW5sL211c3RhY2hlLmpzXG4gKiBodHRwczovL2dpdGh1Yi5jb20vdGhvbWFzSmFuZy9tdXN0YWNoZS5qcyAtLSBpbXBvcm92ZSBzb21lIHZhcmlhYmxlc1xuICovXG5cblxuLyoqXG4gKiBBWDZNdXN0YWNoZeuKlCBodHRwOi8vZ2l0aHViLmNvbS9qYW5sL211c3RhY2hlLmpz7JeQIOuqh+qwgOyngCDstZzshoztlZzsnZgg6riw64ql7J2EIO2KnOuLne2VmOyXrCDsgqzsmqntlZjripQg7YWc7ZSM66a/IOyXlOynhOyeheuLiOuLpC5cbiAqIEBuYW1lc3BhY2UgQVg2TXVzdGFjaGVcbiAqL1xuXG4vKipcbiAqIEBtZXRob2QgQVg2TXVzdGFjaGUucmVuZGVyXG4gKiBAZXhhbXBsZVxuICogYGBganNcbiAqIGF4NS5tdXN0YWNoZS5yZW5kZXIodGVtcGxhdGUsIHZpZXcpXG4gKlxuICpcbiAqIC8vQXJyYXkgQGlcbiAqIC8ve3sjYmVhdGxlc319XG4gKiAvL3t7Zmlyc3ROYW1lfX0ge3tsYXN0TmFtZX19ICh7e0BpfX0pICh7e0BmaXJzdH19KVxuICogLy97ey9iZWF0bGVzfX1cbiAqXG4gKiAvL09iamVjdCBAZWFjaFxuICoge3sjYmVhdGxlc319XG4gKiAge3sjQGVhY2h9fVxuICogICAgICB7e0BrZXl9fSA6IHt7QHZhbHVlLmZpcnN0TmFtZX19IHt7QHZhbHVlLmxhc3ROYW1lfX1cbiAqICB7ey9AZWFjaH19XG4gKiB7ey9iZWF0bGVzfX1cbiAqXG4gKiBgYGBcbiAqL1xuXG5cblxubGV0IEFYNiA9IHt9O1xuXG4oZnVuY3Rpb24gZGVmaW5lTXVzdGFjaGUoZ2xvYmFsLCBmYWN0b3J5KSB7XG5cbiAgZmFjdG9yeShnbG9iYWwubXVzdGFjaGUgPSB7fSk7XG5cbn0oQVg2LCBmdW5jdGlvbiBtdXN0YWNoZUZhY3RvcnkobXVzdGFjaGUpIHtcblxuICB2YXIgb2JqZWN0VG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuICB2YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gaXNBcnJheVBvbHlmaWxsKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3RUb1N0cmluZy5jYWxsKG9iamVjdCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gIH07XG5cbiAgZnVuY3Rpb24gaXNGdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gJ2Z1bmN0aW9uJztcbiAgfVxuXG4gIC8qKlxuICAgKiBNb3JlIGNvcnJlY3QgdHlwZW9mIHN0cmluZyBoYW5kbGluZyBhcnJheVxuICAgKiB3aGljaCBub3JtYWxseSByZXR1cm5zIHR5cGVvZiAnb2JqZWN0J1xuICAgKi9cbiAgZnVuY3Rpb24gdHlwZVN0cihvYmopIHtcbiAgICByZXR1cm4gaXNBcnJheShvYmopID8gJ2FycmF5JyA6IHR5cGVvZiBvYmo7XG4gIH1cblxuICBmdW5jdGlvbiBlc2NhcGVSZWdFeHAoc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC9bXFwtXFxbXFxde30oKSorPy4sXFxcXFxcXiR8I1xcc10vZywgJ1xcXFwkJicpO1xuICB9XG5cbiAgLyoqXG4gICAqIE51bGwgc2FmZSB3YXkgb2YgY2hlY2tpbmcgd2hldGhlciBvciBub3QgYW4gb2JqZWN0LFxuICAgKiBpbmNsdWRpbmcgaXRzIHByb3RvdHlwZSwgaGFzIGEgZ2l2ZW4gcHJvcGVydHlcbiAgICovXG4gIGZ1bmN0aW9uIGhhc1Byb3BlcnR5KG9iaiwgcHJvcE5hbWUpIHtcbiAgICByZXR1cm4gb2JqICE9IG51bGwgJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgKHByb3BOYW1lIGluIG9iaik7XG4gIH1cblxuICAvLyBXb3JrYXJvdW5kIGZvciBodHRwczovL2lzc3Vlcy5hcGFjaGUub3JnL2ppcmEvYnJvd3NlL0NPVUNIREItNTc3XG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vamFubC9tdXN0YWNoZS5qcy9pc3N1ZXMvMTg5XG4gIHZhciByZWdFeHBUZXN0ID0gUmVnRXhwLnByb3RvdHlwZS50ZXN0O1xuXG4gIGZ1bmN0aW9uIHRlc3RSZWdFeHAocmUsIHN0cmluZykge1xuICAgIHJldHVybiByZWdFeHBUZXN0LmNhbGwocmUsIHN0cmluZyk7XG4gIH1cblxuICB2YXIgbm9uU3BhY2VSZSA9IC9cXFMvO1xuXG4gIGZ1bmN0aW9uIGlzV2hpdGVzcGFjZShzdHJpbmcpIHtcbiAgICByZXR1cm4gIXRlc3RSZWdFeHAobm9uU3BhY2VSZSwgc3RyaW5nKTtcbiAgfVxuXG4gIHZhciBlbnRpdHlNYXAgPSB7XG4gICAgJyYnOiAnJmFtcDsnLCAnPCc6ICcmbHQ7JywgJz4nOiAnJmd0OycsICdcIic6ICcmcXVvdDsnLCBcIidcIjogJyYjMzk7JywgJy8nOiAnJiN4MkY7J1xuICB9O1xuXG4gIGZ1bmN0aW9uIGVzY2FwZUh0bWwoc3RyaW5nKSB7XG4gICAgcmV0dXJuIFN0cmluZyhzdHJpbmcpLnJlcGxhY2UoL1smPD5cIidcXC9dL2csIGZ1bmN0aW9uIGZyb21FbnRpdHlNYXAocykge1xuICAgICAgcmV0dXJuIGVudGl0eU1hcFtzXTtcbiAgICB9KTtcbiAgfVxuXG4gIHZhciB3aGl0ZVJlID0gL1xccyovO1xuICB2YXIgc3BhY2VSZSA9IC9cXHMrLztcbiAgdmFyIGVxdWFsc1JlID0gL1xccyo9LztcbiAgdmFyIGN1cmx5UmUgPSAvXFxzKlxcfS87XG4gIHZhciB0YWdSZSA9IC8jfFxcXnxcXC98PnxcXHt8Jnw9fCEvO1xuXG4gIC8qKlxuICAgKiBCcmVha3MgdXAgdGhlIGdpdmVuIGB0ZW1wbGF0ZWAgc3RyaW5nIGludG8gYSB0cmVlIG9mIHRva2Vucy4gSWYgdGhlIGB0YWdzYFxuICAgKiBhcmd1bWVudCBpcyBnaXZlbiBoZXJlIGl0IG11c3QgYmUgYW4gYXJyYXkgd2l0aCB0d28gc3RyaW5nIHZhbHVlczogdGhlXG4gICAqIG9wZW5pbmcgYW5kIGNsb3NpbmcgdGFncyB1c2VkIGluIHRoZSB0ZW1wbGF0ZSAoZS5nLiBbIFwiPCVcIiwgXCIlPlwiIF0pLiBPZlxuICAgKiBjb3Vyc2UsIHRoZSBkZWZhdWx0IGlzIHRvIHVzZSBtdXN0YWNoZXMgKGkuZS4gbXVzdGFjaGUudGFncykuXG4gICAqXG4gICAqIEEgdG9rZW4gaXMgYW4gYXJyYXkgd2l0aCBhdCBsZWFzdCA0IGVsZW1lbnRzLiBUaGUgZmlyc3QgZWxlbWVudCBpcyB0aGVcbiAgICogbXVzdGFjaGUgc3ltYm9sIHRoYXQgd2FzIHVzZWQgaW5zaWRlIHRoZSB0YWcsIGUuZy4gXCIjXCIgb3IgXCImXCIuIElmIHRoZSB0YWdcbiAgICogZGlkIG5vdCBjb250YWluIGEgc3ltYm9sIChpLmUuIHt7bXlWYWx1ZX19KSB0aGlzIGVsZW1lbnQgaXMgXCJuYW1lXCIuIEZvclxuICAgKiBhbGwgdGV4dCB0aGF0IGFwcGVhcnMgb3V0c2lkZSBhIHN5bWJvbCB0aGlzIGVsZW1lbnQgaXMgXCJ0ZXh0XCIuXG4gICAqXG4gICAqIFRoZSBzZWNvbmQgZWxlbWVudCBvZiBhIHRva2VuIGlzIGl0cyBcInZhbHVlXCIuIEZvciBtdXN0YWNoZSB0YWdzIHRoaXMgaXNcbiAgICogd2hhdGV2ZXIgZWxzZSB3YXMgaW5zaWRlIHRoZSB0YWcgYmVzaWRlcyB0aGUgb3BlbmluZyBzeW1ib2wuIEZvciB0ZXh0IHRva2Vuc1xuICAgKiB0aGlzIGlzIHRoZSB0ZXh0IGl0c2VsZi5cbiAgICpcbiAgICogVGhlIHRoaXJkIGFuZCBmb3VydGggZWxlbWVudHMgb2YgdGhlIHRva2VuIGFyZSB0aGUgc3RhcnQgYW5kIGVuZCBpbmRpY2VzLFxuICAgKiByZXNwZWN0aXZlbHksIG9mIHRoZSB0b2tlbiBpbiB0aGUgb3JpZ2luYWwgdGVtcGxhdGUuXG4gICAqXG4gICAqIFRva2VucyB0aGF0IGFyZSB0aGUgcm9vdCBub2RlIG9mIGEgc3VidHJlZSBjb250YWluIHR3byBtb3JlIGVsZW1lbnRzOiAxKSBhblxuICAgKiBhcnJheSBvZiB0b2tlbnMgaW4gdGhlIHN1YnRyZWUgYW5kIDIpIHRoZSBpbmRleCBpbiB0aGUgb3JpZ2luYWwgdGVtcGxhdGUgYXRcbiAgICogd2hpY2ggdGhlIGNsb3NpbmcgdGFnIGZvciB0aGF0IHNlY3Rpb24gYmVnaW5zLlxuICAgKi9cbiAgZnVuY3Rpb24gcGFyc2VUZW1wbGF0ZSh0ZW1wbGF0ZSwgdGFncykge1xuICAgIGlmICghdGVtcGxhdGUpXG4gICAgICByZXR1cm4gW107XG5cbiAgICB2YXIgc2VjdGlvbnMgPSBbXTsgICAgIC8vIFN0YWNrIHRvIGhvbGQgc2VjdGlvbiB0b2tlbnNcbiAgICB2YXIgdG9rZW5zID0gW107ICAgICAgIC8vIEJ1ZmZlciB0byBob2xkIHRoZSB0b2tlbnNcbiAgICB2YXIgc3BhY2VzID0gW107ICAgICAgIC8vIEluZGljZXMgb2Ygd2hpdGVzcGFjZSB0b2tlbnMgb24gdGhlIGN1cnJlbnQgbGluZVxuICAgIHZhciBoYXNUYWcgPSBmYWxzZTsgICAgLy8gSXMgdGhlcmUgYSB7e3RhZ319IG9uIHRoZSBjdXJyZW50IGxpbmU/XG4gICAgdmFyIG5vblNwYWNlID0gZmFsc2U7ICAvLyBJcyB0aGVyZSBhIG5vbi1zcGFjZSBjaGFyIG9uIHRoZSBjdXJyZW50IGxpbmU/XG5cbiAgICAvLyBTdHJpcHMgYWxsIHdoaXRlc3BhY2UgdG9rZW5zIGFycmF5IGZvciB0aGUgY3VycmVudCBsaW5lXG4gICAgLy8gaWYgdGhlcmUgd2FzIGEge3sjdGFnfX0gb24gaXQgYW5kIG90aGVyd2lzZSBvbmx5IHNwYWNlLlxuICAgIGZ1bmN0aW9uIHN0cmlwU3BhY2UoKSB7XG4gICAgICBpZiAoaGFzVGFnICYmICFub25TcGFjZSkge1xuICAgICAgICB3aGlsZSAoc3BhY2VzLmxlbmd0aClcbiAgICAgICAgICBkZWxldGUgdG9rZW5zW3NwYWNlcy5wb3AoKV07XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgc3BhY2VzID0gW107XG4gICAgICB9XG5cbiAgICAgIGhhc1RhZyA9IGZhbHNlO1xuICAgICAgbm9uU3BhY2UgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgb3BlbmluZ1RhZ1JlLCBjbG9zaW5nVGFnUmUsIGNsb3NpbmdDdXJseVJlO1xuXG4gICAgZnVuY3Rpb24gY29tcGlsZVRhZ3ModGFnc1RvQ29tcGlsZSkge1xuICAgICAgaWYgKHR5cGVvZiB0YWdzVG9Db21waWxlID09PSAnc3RyaW5nJylcbiAgICAgICAgdGFnc1RvQ29tcGlsZSA9IHRhZ3NUb0NvbXBpbGUuc3BsaXQoc3BhY2VSZSwgMik7XG5cbiAgICAgIGlmICghaXNBcnJheSh0YWdzVG9Db21waWxlKSB8fCB0YWdzVG9Db21waWxlLmxlbmd0aCAhPT0gMilcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHRhZ3M6ICcgKyB0YWdzVG9Db21waWxlKTtcblxuICAgICAgb3BlbmluZ1RhZ1JlID0gbmV3IFJlZ0V4cChlc2NhcGVSZWdFeHAodGFnc1RvQ29tcGlsZVswXSkgKyAnXFxcXHMqJyk7XG4gICAgICBjbG9zaW5nVGFnUmUgPSBuZXcgUmVnRXhwKCdcXFxccyonICsgZXNjYXBlUmVnRXhwKHRhZ3NUb0NvbXBpbGVbMV0pKTtcbiAgICAgIGNsb3NpbmdDdXJseVJlID0gbmV3IFJlZ0V4cCgnXFxcXHMqJyArIGVzY2FwZVJlZ0V4cCgnfScgKyB0YWdzVG9Db21waWxlWzFdKSk7XG4gICAgfVxuXG4gICAgY29tcGlsZVRhZ3ModGFncyB8fCBtdXN0YWNoZS50YWdzKTtcblxuICAgIHZhciBzY2FubmVyID0gbmV3IFNjYW5uZXIodGVtcGxhdGUpO1xuXG4gICAgdmFyIHN0YXJ0LCB0eXBlLCB2YWx1ZSwgY2hyLCB0b2tlbiwgb3BlblNlY3Rpb247XG4gICAgd2hpbGUgKCFzY2FubmVyLmVvcygpKSB7XG4gICAgICBzdGFydCA9IHNjYW5uZXIucG9zO1xuXG4gICAgICAvLyBNYXRjaCBhbnkgdGV4dCBiZXR3ZWVuIHRhZ3MuXG4gICAgICB2YWx1ZSA9IHNjYW5uZXIuc2NhblVudGlsKG9wZW5pbmdUYWdSZSk7XG5cbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgdmFsdWVMZW5ndGggPSB2YWx1ZS5sZW5ndGg7IGkgPCB2YWx1ZUxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgY2hyID0gdmFsdWUuY2hhckF0KGkpO1xuXG4gICAgICAgICAgaWYgKGlzV2hpdGVzcGFjZShjaHIpKSB7XG4gICAgICAgICAgICBzcGFjZXMucHVzaCh0b2tlbnMubGVuZ3RoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBub25TcGFjZSA9IHRydWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdG9rZW5zLnB1c2goWyd0ZXh0JywgY2hyLCBzdGFydCwgc3RhcnQgKyAxXSk7XG4gICAgICAgICAgc3RhcnQgKz0gMTtcblxuICAgICAgICAgIC8vIENoZWNrIGZvciB3aGl0ZXNwYWNlIG9uIHRoZSBjdXJyZW50IGxpbmUuXG4gICAgICAgICAgaWYgKGNociA9PT0gJ1xcbicpXG4gICAgICAgICAgICBzdHJpcFNwYWNlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gTWF0Y2ggdGhlIG9wZW5pbmcgdGFnLlxuICAgICAgaWYgKCFzY2FubmVyLnNjYW4ob3BlbmluZ1RhZ1JlKSlcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGhhc1RhZyA9IHRydWU7XG5cbiAgICAgIC8vIEdldCB0aGUgdGFnIHR5cGUuXG4gICAgICB0eXBlID0gc2Nhbm5lci5zY2FuKHRhZ1JlKSB8fCAnbmFtZSc7XG4gICAgICBzY2FubmVyLnNjYW4od2hpdGVSZSk7XG5cbiAgICAgIC8vIEdldCB0aGUgdGFnIHZhbHVlLlxuICAgICAgaWYgKHR5cGUgPT09ICc9Jykge1xuICAgICAgICB2YWx1ZSA9IHNjYW5uZXIuc2NhblVudGlsKGVxdWFsc1JlKTtcbiAgICAgICAgc2Nhbm5lci5zY2FuKGVxdWFsc1JlKTtcbiAgICAgICAgc2Nhbm5lci5zY2FuVW50aWwoY2xvc2luZ1RhZ1JlKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICd7Jykge1xuICAgICAgICB2YWx1ZSA9IHNjYW5uZXIuc2NhblVudGlsKGNsb3NpbmdDdXJseVJlKTtcbiAgICAgICAgc2Nhbm5lci5zY2FuKGN1cmx5UmUpO1xuICAgICAgICBzY2FubmVyLnNjYW5VbnRpbChjbG9zaW5nVGFnUmUpO1xuICAgICAgICB0eXBlID0gJyYnO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHZhbHVlID0gc2Nhbm5lci5zY2FuVW50aWwoY2xvc2luZ1RhZ1JlKTtcbiAgICAgIH1cblxuICAgICAgLy8gTWF0Y2ggdGhlIGNsb3NpbmcgdGFnLlxuICAgICAgaWYgKCFzY2FubmVyLnNjYW4oY2xvc2luZ1RhZ1JlKSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmNsb3NlZCB0YWcgYXQgJyArIHNjYW5uZXIucG9zKTtcblxuICAgICAgdG9rZW4gPSBbdHlwZSwgdmFsdWUsIHN0YXJ0LCBzY2FubmVyLnBvc107XG4gICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG5cbiAgICAgIGlmICh0eXBlID09PSAnIycgfHwgdHlwZSA9PT0gJ14nKSB7XG4gICAgICAgIHNlY3Rpb25zLnB1c2godG9rZW4pO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJy8nKSB7XG4gICAgICAgIC8vIENoZWNrIHNlY3Rpb24gbmVzdGluZy5cbiAgICAgICAgb3BlblNlY3Rpb24gPSBzZWN0aW9ucy5wb3AoKTtcblxuICAgICAgICBpZiAoIW9wZW5TZWN0aW9uKVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5vcGVuZWQgc2VjdGlvbiBcIicgKyB2YWx1ZSArICdcIiBhdCAnICsgc3RhcnQpO1xuXG4gICAgICAgIGlmIChvcGVuU2VjdGlvblsxXSAhPT0gdmFsdWUpXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmNsb3NlZCBzZWN0aW9uIFwiJyArIG9wZW5TZWN0aW9uWzFdICsgJ1wiIGF0ICcgKyBzdGFydCk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0eXBlID09PSAnbmFtZScgfHwgdHlwZSA9PT0gJ3snIHx8IHR5cGUgPT09ICcmJykge1xuICAgICAgICBub25TcGFjZSA9IHRydWU7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0eXBlID09PSAnPScpIHtcbiAgICAgICAgLy8gU2V0IHRoZSB0YWdzIGZvciB0aGUgbmV4dCB0aW1lIGFyb3VuZC5cbiAgICAgICAgY29tcGlsZVRhZ3ModmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIE1ha2Ugc3VyZSB0aGVyZSBhcmUgbm8gb3BlbiBzZWN0aW9ucyB3aGVuIHdlJ3JlIGRvbmUuXG4gICAgb3BlblNlY3Rpb24gPSBzZWN0aW9ucy5wb3AoKTtcblxuICAgIGlmIChvcGVuU2VjdGlvbilcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5jbG9zZWQgc2VjdGlvbiBcIicgKyBvcGVuU2VjdGlvblsxXSArICdcIiBhdCAnICsgc2Nhbm5lci5wb3MpO1xuXG4gICAgcmV0dXJuIG5lc3RUb2tlbnMoc3F1YXNoVG9rZW5zKHRva2VucykpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbWJpbmVzIHRoZSB2YWx1ZXMgb2YgY29uc2VjdXRpdmUgdGV4dCB0b2tlbnMgaW4gdGhlIGdpdmVuIGB0b2tlbnNgIGFycmF5XG4gICAqIHRvIGEgc2luZ2xlIHRva2VuLlxuICAgKi9cbiAgZnVuY3Rpb24gc3F1YXNoVG9rZW5zKHRva2Vucykge1xuICAgIHZhciBzcXVhc2hlZFRva2VucyA9IFtdO1xuXG4gICAgdmFyIHRva2VuLCBsYXN0VG9rZW47XG4gICAgZm9yICh2YXIgaSA9IDAsIG51bVRva2VucyA9IHRva2Vucy5sZW5ndGg7IGkgPCBudW1Ub2tlbnM7ICsraSkge1xuICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XG5cbiAgICAgIGlmICh0b2tlbikge1xuICAgICAgICBpZiAodG9rZW5bMF0gPT09ICd0ZXh0JyAmJiBsYXN0VG9rZW4gJiYgbGFzdFRva2VuWzBdID09PSAndGV4dCcpIHtcbiAgICAgICAgICBsYXN0VG9rZW5bMV0gKz0gdG9rZW5bMV07XG4gICAgICAgICAgbGFzdFRva2VuWzNdID0gdG9rZW5bM107XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgc3F1YXNoZWRUb2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgICAgbGFzdFRva2VuID0gdG9rZW47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3F1YXNoZWRUb2tlbnM7XG4gIH1cblxuICAvKipcbiAgICogRm9ybXMgdGhlIGdpdmVuIGFycmF5IG9mIGB0b2tlbnNgIGludG8gYSBuZXN0ZWQgdHJlZSBzdHJ1Y3R1cmUgd2hlcmVcbiAgICogdG9rZW5zIHRoYXQgcmVwcmVzZW50IGEgc2VjdGlvbiBoYXZlIHR3byBhZGRpdGlvbmFsIGl0ZW1zOiAxKSBhbiBhcnJheSBvZlxuICAgKiBhbGwgdG9rZW5zIHRoYXQgYXBwZWFyIGluIHRoYXQgc2VjdGlvbiBhbmQgMikgdGhlIGluZGV4IGluIHRoZSBvcmlnaW5hbFxuICAgKiB0ZW1wbGF0ZSB0aGF0IHJlcHJlc2VudHMgdGhlIGVuZCBvZiB0aGF0IHNlY3Rpb24uXG4gICAqL1xuICBmdW5jdGlvbiBuZXN0VG9rZW5zKHRva2Vucykge1xuICAgIHZhciBuZXN0ZWRUb2tlbnMgPSBbXTtcbiAgICB2YXIgY29sbGVjdG9yID0gbmVzdGVkVG9rZW5zO1xuICAgIHZhciBzZWN0aW9ucyA9IFtdO1xuXG4gICAgdmFyIHRva2VuLCBzZWN0aW9uO1xuICAgIGZvciAodmFyIGkgPSAwLCBudW1Ub2tlbnMgPSB0b2tlbnMubGVuZ3RoOyBpIDwgbnVtVG9rZW5zOyArK2kpIHtcbiAgICAgIHRva2VuID0gdG9rZW5zW2ldO1xuXG4gICAgICBzd2l0Y2ggKHRva2VuWzBdKSB7XG4gICAgICAgIGNhc2UgJyMnOlxuICAgICAgICBjYXNlICdeJzpcbiAgICAgICAgICBjb2xsZWN0b3IucHVzaCh0b2tlbik7XG4gICAgICAgICAgc2VjdGlvbnMucHVzaCh0b2tlbik7XG4gICAgICAgICAgY29sbGVjdG9yID0gdG9rZW5bNF0gPSBbXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnLyc6XG4gICAgICAgICAgc2VjdGlvbiA9IHNlY3Rpb25zLnBvcCgpO1xuICAgICAgICAgIHNlY3Rpb25bNV0gPSB0b2tlblsyXTtcbiAgICAgICAgICBjb2xsZWN0b3IgPSBzZWN0aW9ucy5sZW5ndGggPiAwID8gc2VjdGlvbnNbc2VjdGlvbnMubGVuZ3RoIC0gMV1bNF0gOiBuZXN0ZWRUb2tlbnM7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgY29sbGVjdG9yLnB1c2godG9rZW4pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBuZXN0ZWRUb2tlbnM7XG4gIH1cblxuICAvKipcbiAgICogQSBzaW1wbGUgc3RyaW5nIHNjYW5uZXIgdGhhdCBpcyB1c2VkIGJ5IHRoZSB0ZW1wbGF0ZSBwYXJzZXIgdG8gZmluZFxuICAgKiB0b2tlbnMgaW4gdGVtcGxhdGUgc3RyaW5ncy5cbiAgICovXG4gIGZ1bmN0aW9uIFNjYW5uZXIoc3RyaW5nKSB7XG4gICAgdGhpcy5zdHJpbmcgPSBzdHJpbmc7XG4gICAgdGhpcy50YWlsID0gc3RyaW5nO1xuICAgIHRoaXMucG9zID0gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdGFpbCBpcyBlbXB0eSAoZW5kIG9mIHN0cmluZykuXG4gICAqL1xuICBTY2FubmVyLnByb3RvdHlwZS5lb3MgPSBmdW5jdGlvbiBlb3MoKSB7XG4gICAgcmV0dXJuIHRoaXMudGFpbCA9PT0gJyc7XG4gIH07XG5cbiAgLyoqXG4gICAqIFRyaWVzIHRvIG1hdGNoIHRoZSBnaXZlbiByZWd1bGFyIGV4cHJlc3Npb24gYXQgdGhlIGN1cnJlbnQgcG9zaXRpb24uXG4gICAqIFJldHVybnMgdGhlIG1hdGNoZWQgdGV4dCBpZiBpdCBjYW4gbWF0Y2gsIHRoZSBlbXB0eSBzdHJpbmcgb3RoZXJ3aXNlLlxuICAgKi9cbiAgU2Nhbm5lci5wcm90b3R5cGUuc2NhbiA9IGZ1bmN0aW9uIHNjYW4ocmUpIHtcbiAgICB2YXIgbWF0Y2ggPSB0aGlzLnRhaWwubWF0Y2gocmUpO1xuXG4gICAgaWYgKCFtYXRjaCB8fCBtYXRjaC5pbmRleCAhPT0gMClcbiAgICAgIHJldHVybiAnJztcblxuICAgIHZhciBzdHJpbmcgPSBtYXRjaFswXTtcblxuICAgIHRoaXMudGFpbCA9IHRoaXMudGFpbC5zdWJzdHJpbmcoc3RyaW5nLmxlbmd0aCk7XG4gICAgdGhpcy5wb3MgKz0gc3RyaW5nLmxlbmd0aDtcblxuICAgIHJldHVybiBzdHJpbmc7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNraXBzIGFsbCB0ZXh0IHVudGlsIHRoZSBnaXZlbiByZWd1bGFyIGV4cHJlc3Npb24gY2FuIGJlIG1hdGNoZWQuIFJldHVybnNcbiAgICogdGhlIHNraXBwZWQgc3RyaW5nLCB3aGljaCBpcyB0aGUgZW50aXJlIHRhaWwgaWYgbm8gbWF0Y2ggY2FuIGJlIG1hZGUuXG4gICAqL1xuICBTY2FubmVyLnByb3RvdHlwZS5zY2FuVW50aWwgPSBmdW5jdGlvbiBzY2FuVW50aWwocmUpIHtcbiAgICB2YXIgaW5kZXggPSB0aGlzLnRhaWwuc2VhcmNoKHJlKSwgbWF0Y2g7XG5cbiAgICBzd2l0Y2ggKGluZGV4KSB7XG4gICAgICBjYXNlIC0xOlxuICAgICAgICBtYXRjaCA9IHRoaXMudGFpbDtcbiAgICAgICAgdGhpcy50YWlsID0gJyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAwOlxuICAgICAgICBtYXRjaCA9ICcnO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIG1hdGNoID0gdGhpcy50YWlsLnN1YnN0cmluZygwLCBpbmRleCk7XG4gICAgICAgIHRoaXMudGFpbCA9IHRoaXMudGFpbC5zdWJzdHJpbmcoaW5kZXgpO1xuICAgIH1cblxuICAgIHRoaXMucG9zICs9IG1hdGNoLmxlbmd0aDtcblxuICAgIHJldHVybiBtYXRjaDtcbiAgfTtcblxuICAvKipcbiAgICogUmVwcmVzZW50cyBhIHJlbmRlcmluZyBjb250ZXh0IGJ5IHdyYXBwaW5nIGEgdmlldyBvYmplY3QgYW5kXG4gICAqIG1haW50YWluaW5nIGEgcmVmZXJlbmNlIHRvIHRoZSBwYXJlbnQgY29udGV4dC5cbiAgICovXG4gIGZ1bmN0aW9uIENvbnRleHQodmlldywgcGFyZW50Q29udGV4dCkge1xuICAgIHRoaXMudmlldyA9IHZpZXc7XG4gICAgdGhpcy5jYWNoZSA9IHtcbiAgICAgICcuJzogdGhpcy52aWV3LFxuICAgICAgJ0BlYWNoJzogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcmV0dXJucyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBrIGluIHRoaXMpIHtcbiAgICAgICAgICByZXR1cm5zLnB1c2goeydAa2V5JzogaywgJ0B2YWx1ZSc6IHRoaXNba119KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0dXJucztcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMucGFyZW50ID0gcGFyZW50Q29udGV4dDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGNvbnRleHQgdXNpbmcgdGhlIGdpdmVuIHZpZXcgd2l0aCB0aGlzIGNvbnRleHRcbiAgICogYXMgdGhlIHBhcmVudC5cbiAgICovXG4gIENvbnRleHQucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiBwdXNoKHZpZXcpIHtcbiAgICByZXR1cm4gbmV3IENvbnRleHQodmlldywgdGhpcyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHZhbHVlIG9mIHRoZSBnaXZlbiBuYW1lIGluIHRoaXMgY29udGV4dCwgdHJhdmVyc2luZ1xuICAgKiB1cCB0aGUgY29udGV4dCBoaWVyYXJjaHkgaWYgdGhlIHZhbHVlIGlzIGFic2VudCBpbiB0aGlzIGNvbnRleHQncyB2aWV3LlxuICAgKi9cbiAgQ29udGV4dC5wcm90b3R5cGUubG9va3VwID0gZnVuY3Rpb24gbG9va3VwKG5hbWUpIHtcbiAgICB2YXIgY2FjaGUgPSB0aGlzLmNhY2hlO1xuXG4gICAgdmFyIHZhbHVlO1xuICAgIGlmIChjYWNoZS5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgdmFsdWUgPSBjYWNoZVtuYW1lXTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YXIgY29udGV4dCA9IHRoaXMsIG5hbWVzLCBpbmRleCwgbG9va3VwSGl0ID0gZmFsc2U7XG5cbiAgICAgIHdoaWxlIChjb250ZXh0KSB7XG4gICAgICAgIGlmIChuYW1lLmluZGV4T2YoJy4nKSA+IDApIHtcbiAgICAgICAgICB2YWx1ZSA9IGNvbnRleHQudmlldztcbiAgICAgICAgICBuYW1lcyA9IG5hbWUuc3BsaXQoJy4nKTtcbiAgICAgICAgICBpbmRleCA9IDA7XG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBVc2luZyB0aGUgZG90IG5vdGlvbiBwYXRoIGluIGBuYW1lYCwgd2UgZGVzY2VuZCB0aHJvdWdoIHRoZVxuICAgICAgICAgICAqIG5lc3RlZCBvYmplY3RzLlxuICAgICAgICAgICAqXG4gICAgICAgICAgICogVG8gYmUgY2VydGFpbiB0aGF0IHRoZSBsb29rdXAgaGFzIGJlZW4gc3VjY2Vzc2Z1bCwgd2UgaGF2ZSB0b1xuICAgICAgICAgICAqIGNoZWNrIGlmIHRoZSBsYXN0IG9iamVjdCBpbiB0aGUgcGF0aCBhY3R1YWxseSBoYXMgdGhlIHByb3BlcnR5XG4gICAgICAgICAgICogd2UgYXJlIGxvb2tpbmcgZm9yLiBXZSBzdG9yZSB0aGUgcmVzdWx0IGluIGBsb29rdXBIaXRgLlxuICAgICAgICAgICAqXG4gICAgICAgICAgICogVGhpcyBpcyBzcGVjaWFsbHkgbmVjZXNzYXJ5IGZvciB3aGVuIHRoZSB2YWx1ZSBoYXMgYmVlbiBzZXQgdG9cbiAgICAgICAgICAgKiBgdW5kZWZpbmVkYCBhbmQgd2Ugd2FudCB0byBhdm9pZCBsb29raW5nIHVwIHBhcmVudCBjb250ZXh0cy5cbiAgICAgICAgICAgKiovXG4gICAgICAgICAgd2hpbGUgKHZhbHVlICE9IG51bGwgJiYgaW5kZXggPCBuYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gbmFtZXMubGVuZ3RoIC0gMSlcbiAgICAgICAgICAgICAgbG9va3VwSGl0ID0gaGFzUHJvcGVydHkodmFsdWUsIG5hbWVzW2luZGV4XSk7XG5cbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWVbbmFtZXNbaW5kZXgrK11dO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB2YWx1ZSA9IGNvbnRleHQudmlld1tuYW1lXTtcbiAgICAgICAgICBsb29rdXBIaXQgPSBoYXNQcm9wZXJ0eShjb250ZXh0LnZpZXcsIG5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxvb2t1cEhpdClcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjb250ZXh0ID0gY29udGV4dC5wYXJlbnQ7XG4gICAgICB9XG5cbiAgICAgIGNhY2hlW25hbWVdID0gdmFsdWU7XG4gICAgfVxuXG4gICAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKVxuICAgICAgdmFsdWUgPSB2YWx1ZS5jYWxsKHRoaXMudmlldyk7XG5cbiAgICByZXR1cm4gdmFsdWU7XG4gIH07XG5cbiAgLyoqXG4gICAqIEEgV3JpdGVyIGtub3dzIGhvdyB0byB0YWtlIGEgc3RyZWFtIG9mIHRva2VucyBhbmQgcmVuZGVyIHRoZW0gdG8gYVxuICAgKiBzdHJpbmcsIGdpdmVuIGEgY29udGV4dC4gSXQgYWxzbyBtYWludGFpbnMgYSBjYWNoZSBvZiB0ZW1wbGF0ZXMgdG9cbiAgICogYXZvaWQgdGhlIG5lZWQgdG8gcGFyc2UgdGhlIHNhbWUgdGVtcGxhdGUgdHdpY2UuXG4gICAqL1xuICBmdW5jdGlvbiBXcml0ZXIoKSB7XG4gICAgdGhpcy5jYWNoZSA9IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFycyBhbGwgY2FjaGVkIHRlbXBsYXRlcyBpbiB0aGlzIHdyaXRlci5cbiAgICovXG4gIFdyaXRlci5wcm90b3R5cGUuY2xlYXJDYWNoZSA9IGZ1bmN0aW9uIGNsZWFyQ2FjaGUoKSB7XG4gICAgdGhpcy5jYWNoZSA9IHt9O1xuICB9O1xuXG4gIC8qKlxuICAgKiBQYXJzZXMgYW5kIGNhY2hlcyB0aGUgZ2l2ZW4gYHRlbXBsYXRlYCBhbmQgcmV0dXJucyB0aGUgYXJyYXkgb2YgdG9rZW5zXG4gICAqIHRoYXQgaXMgZ2VuZXJhdGVkIGZyb20gdGhlIHBhcnNlLlxuICAgKi9cbiAgV3JpdGVyLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uIHBhcnNlKHRlbXBsYXRlLCB0YWdzKSB7XG4gICAgdmFyIGNhY2hlID0gdGhpcy5jYWNoZTtcbiAgICB2YXIgdG9rZW5zID0gY2FjaGVbdGVtcGxhdGVdO1xuXG4gICAgaWYgKHRva2VucyA9PSBudWxsKVxuICAgICAgdG9rZW5zID0gY2FjaGVbdGVtcGxhdGVdID0gcGFyc2VUZW1wbGF0ZSh0ZW1wbGF0ZSwgdGFncyk7XG5cbiAgICByZXR1cm4gdG9rZW5zO1xuICB9O1xuXG4gIC8qKlxuICAgKiBIaWdoLWxldmVsIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gcmVuZGVyIHRoZSBnaXZlbiBgdGVtcGxhdGVgIHdpdGhcbiAgICogdGhlIGdpdmVuIGB2aWV3YC5cbiAgICpcbiAgICogVGhlIG9wdGlvbmFsIGBwYXJ0aWFsc2AgYXJndW1lbnQgbWF5IGJlIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIHRoZVxuICAgKiBuYW1lcyBhbmQgdGVtcGxhdGVzIG9mIHBhcnRpYWxzIHRoYXQgYXJlIHVzZWQgaW4gdGhlIHRlbXBsYXRlLiBJdCBtYXlcbiAgICogYWxzbyBiZSBhIGZ1bmN0aW9uIHRoYXQgaXMgdXNlZCB0byBsb2FkIHBhcnRpYWwgdGVtcGxhdGVzIG9uIHRoZSBmbHlcbiAgICogdGhhdCB0YWtlcyBhIHNpbmdsZSBhcmd1bWVudDogdGhlIG5hbWUgb2YgdGhlIHBhcnRpYWwuXG4gICAqL1xuICBXcml0ZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcih0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMpIHtcbiAgICB2YXIgdG9rZW5zID0gdGhpcy5wYXJzZSh0ZW1wbGF0ZSk7XG4gICAgdmFyIGNvbnRleHQgPSAodmlldyBpbnN0YW5jZW9mIENvbnRleHQpID8gdmlldyA6IG5ldyBDb250ZXh0KHZpZXcpO1xuICAgIHJldHVybiB0aGlzLnJlbmRlclRva2Vucyh0b2tlbnMsIGNvbnRleHQsIHBhcnRpYWxzLCB0ZW1wbGF0ZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIExvdy1sZXZlbCBtZXRob2QgdGhhdCByZW5kZXJzIHRoZSBnaXZlbiBhcnJheSBvZiBgdG9rZW5zYCB1c2luZ1xuICAgKiB0aGUgZ2l2ZW4gYGNvbnRleHRgIGFuZCBgcGFydGlhbHNgLlxuICAgKlxuICAgKiBOb3RlOiBUaGUgYG9yaWdpbmFsVGVtcGxhdGVgIGlzIG9ubHkgZXZlciB1c2VkIHRvIGV4dHJhY3QgdGhlIHBvcnRpb25cbiAgICogb2YgdGhlIG9yaWdpbmFsIHRlbXBsYXRlIHRoYXQgd2FzIGNvbnRhaW5lZCBpbiBhIGhpZ2hlci1vcmRlciBzZWN0aW9uLlxuICAgKiBJZiB0aGUgdGVtcGxhdGUgZG9lc24ndCB1c2UgaGlnaGVyLW9yZGVyIHNlY3Rpb25zLCB0aGlzIGFyZ3VtZW50IG1heVxuICAgKiBiZSBvbWl0dGVkLlxuICAgKi9cbiAgV3JpdGVyLnByb3RvdHlwZS5yZW5kZXJUb2tlbnMgPSBmdW5jdGlvbiByZW5kZXJUb2tlbnModG9rZW5zLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSkge1xuICAgIHZhciBidWZmZXIgPSAnJztcbiAgICB2YXIgdG9rZW4sIHN5bWJvbCwgdmFsdWU7XG4gICAgZm9yICh2YXIgaSA9IDAsIG51bVRva2VucyA9IHRva2Vucy5sZW5ndGg7IGkgPCBudW1Ub2tlbnM7ICsraSkge1xuICAgICAgdmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcbiAgICAgIHN5bWJvbCA9IHRva2VuWzBdO1xuXG4gICAgICBpZiAoc3ltYm9sID09PSAnIycpIHZhbHVlID0gdGhpcy5yZW5kZXJTZWN0aW9uKHRva2VuLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XG4gICAgICBlbHNlIGlmIChzeW1ib2wgPT09ICdeJykgdmFsdWUgPSB0aGlzLnJlbmRlckludmVydGVkKHRva2VuLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XG4gICAgICBlbHNlIGlmIChzeW1ib2wgPT09ICc+JykgdmFsdWUgPSB0aGlzLnJlbmRlclBhcnRpYWwodG9rZW4sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgICAgIGVsc2UgaWYgKHN5bWJvbCA9PT0gJyYnKSB2YWx1ZSA9IHRoaXMudW5lc2NhcGVkVmFsdWUodG9rZW4sIGNvbnRleHQpO1xuICAgICAgZWxzZSBpZiAoc3ltYm9sID09PSAnbmFtZScpIHZhbHVlID0gdGhpcy5lc2NhcGVkVmFsdWUodG9rZW4sIGNvbnRleHQpO1xuICAgICAgZWxzZSBpZiAoc3ltYm9sID09PSAndGV4dCcpIHZhbHVlID0gdGhpcy5yYXdWYWx1ZSh0b2tlbik7XG5cbiAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICBidWZmZXIgKz0gdmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1ZmZlcjtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLnJlbmRlclNlY3Rpb24gPSBmdW5jdGlvbiByZW5kZXJTZWN0aW9uKHRva2VuLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgYnVmZmVyID0gJyc7XG5cbiAgICB2YXIgdmFsdWUgPSBjb250ZXh0Lmxvb2t1cCh0b2tlblsxXSk7XG5cbiAgICAvLyBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gcmVuZGVyIGFuIGFyYml0cmFyeSB0ZW1wbGF0ZVxuICAgIC8vIGluIHRoZSBjdXJyZW50IGNvbnRleHQgYnkgaGlnaGVyLW9yZGVyIHNlY3Rpb25zLlxuICAgIGZ1bmN0aW9uIHN1YlJlbmRlcih0ZW1wbGF0ZSkge1xuICAgICAgcmV0dXJuIHNlbGYucmVuZGVyKHRlbXBsYXRlLCBjb250ZXh0LCBwYXJ0aWFscyk7XG4gICAgfVxuXG4gICAgaWYgKCF2YWx1ZSkgcmV0dXJuO1xuXG4gICAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgICBmb3IgKHZhciBqID0gMCwgdmFsdWVMZW5ndGggPSB2YWx1ZS5sZW5ndGg7IGogPCB2YWx1ZUxlbmd0aDsgKytqKSB7XG4gICAgICAgIGlmICh2YWx1ZVtqXSkge1xuICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWVbal0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB2YWx1ZVtqXVsnQGknXSA9IGo7XG4gICAgICAgICAgICB2YWx1ZVtqXVsnQGZpcnN0J10gPSAoaiA9PT0gMCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnVmZmVyICs9IHRoaXMucmVuZGVyVG9rZW5zKHRva2VuWzRdLCBjb250ZXh0LnB1c2godmFsdWVbal0pLCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIGJ1ZmZlciArPSB0aGlzLnJlbmRlclRva2Vucyh0b2tlbls0XSwgY29udGV4dC5wdXNoKHZhbHVlKSwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgICAgaWYgKHR5cGVvZiBvcmlnaW5hbFRlbXBsYXRlICE9PSAnc3RyaW5nJylcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgdXNlIGhpZ2hlci1vcmRlciBzZWN0aW9ucyB3aXRob3V0IHRoZSBvcmlnaW5hbCB0ZW1wbGF0ZScpO1xuXG4gICAgICAvLyBFeHRyYWN0IHRoZSBwb3J0aW9uIG9mIHRoZSBvcmlnaW5hbCB0ZW1wbGF0ZSB0aGF0IHRoZSBzZWN0aW9uIGNvbnRhaW5zLlxuICAgICAgdmFsdWUgPSB2YWx1ZS5jYWxsKGNvbnRleHQudmlldywgb3JpZ2luYWxUZW1wbGF0ZS5zbGljZSh0b2tlblszXSwgdG9rZW5bNV0pLCBzdWJSZW5kZXIpO1xuXG4gICAgICBpZiAodmFsdWUgIT0gbnVsbClcbiAgICAgICAgYnVmZmVyICs9IHZhbHVlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGJ1ZmZlciArPSB0aGlzLnJlbmRlclRva2Vucyh0b2tlbls0XSwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xuICAgIH1cbiAgICByZXR1cm4gYnVmZmVyO1xuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUucmVuZGVySW52ZXJ0ZWQgPSBmdW5jdGlvbiByZW5kZXJJbnZlcnRlZCh0b2tlbiwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpIHtcbiAgICB2YXIgdmFsdWUgPSBjb250ZXh0Lmxvb2t1cCh0b2tlblsxXSk7XG5cbiAgICAvLyBVc2UgSmF2YVNjcmlwdCdzIGRlZmluaXRpb24gb2YgZmFsc3kuIEluY2x1ZGUgZW1wdHkgYXJyYXlzLlxuICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vamFubC9tdXN0YWNoZS5qcy9pc3N1ZXMvMTg2XG4gICAgaWYgKCF2YWx1ZSB8fCAoaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID09PSAwKSlcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlclRva2Vucyh0b2tlbls0XSwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUucmVuZGVyUGFydGlhbCA9IGZ1bmN0aW9uIHJlbmRlclBhcnRpYWwodG9rZW4sIGNvbnRleHQsIHBhcnRpYWxzKSB7XG4gICAgaWYgKCFwYXJ0aWFscykgcmV0dXJuO1xuXG4gICAgdmFyIHZhbHVlID0gaXNGdW5jdGlvbihwYXJ0aWFscykgPyBwYXJ0aWFscyh0b2tlblsxXSkgOiBwYXJ0aWFsc1t0b2tlblsxXV07XG4gICAgaWYgKHZhbHVlICE9IG51bGwpXG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJUb2tlbnModGhpcy5wYXJzZSh2YWx1ZSksIGNvbnRleHQsIHBhcnRpYWxzLCB2YWx1ZSk7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS51bmVzY2FwZWRWYWx1ZSA9IGZ1bmN0aW9uIHVuZXNjYXBlZFZhbHVlKHRva2VuLCBjb250ZXh0KSB7XG4gICAgdmFyIHZhbHVlID0gY29udGV4dC5sb29rdXAodG9rZW5bMV0pO1xuICAgIGlmICh2YWx1ZSAhPSBudWxsKVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUuZXNjYXBlZFZhbHVlID0gZnVuY3Rpb24gZXNjYXBlZFZhbHVlKHRva2VuLCBjb250ZXh0KSB7XG4gICAgdmFyIHZhbHVlID0gY29udGV4dC5sb29rdXAodG9rZW5bMV0pO1xuICAgIGlmICh2YWx1ZSAhPSBudWxsKVxuICAgICAgcmV0dXJuIG11c3RhY2hlLmVzY2FwZSh2YWx1ZSk7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5yYXdWYWx1ZSA9IGZ1bmN0aW9uIHJhd1ZhbHVlKHRva2VuKSB7XG4gICAgcmV0dXJuIHRva2VuWzFdO1xuICB9O1xuXG4gIG11c3RhY2hlLm5hbWUgPSAnbXVzdGFjaGUuanMnO1xuICBtdXN0YWNoZS52ZXJzaW9uID0gJzIuMS4zJztcbiAgbXVzdGFjaGUudGFncyA9IFsne3snLCAnfX0nXTtcblxuICAvLyBBbGwgaGlnaC1sZXZlbCBtdXN0YWNoZS4qIGZ1bmN0aW9ucyB1c2UgdGhpcyB3cml0ZXIuXG4gIHZhciBkZWZhdWx0V3JpdGVyID0gbmV3IFdyaXRlcigpO1xuXG4gIC8qKlxuICAgKiBDbGVhcnMgYWxsIGNhY2hlZCB0ZW1wbGF0ZXMgaW4gdGhlIGRlZmF1bHQgd3JpdGVyLlxuICAgKi9cbiAgbXVzdGFjaGUuY2xlYXJDYWNoZSA9IGZ1bmN0aW9uIGNsZWFyQ2FjaGUoKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRXcml0ZXIuY2xlYXJDYWNoZSgpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBQYXJzZXMgYW5kIGNhY2hlcyB0aGUgZ2l2ZW4gdGVtcGxhdGUgaW4gdGhlIGRlZmF1bHQgd3JpdGVyIGFuZCByZXR1cm5zIHRoZVxuICAgKiBhcnJheSBvZiB0b2tlbnMgaXQgY29udGFpbnMuIERvaW5nIHRoaXMgYWhlYWQgb2YgdGltZSBhdm9pZHMgdGhlIG5lZWQgdG9cbiAgICogcGFyc2UgdGVtcGxhdGVzIG9uIHRoZSBmbHkgYXMgdGhleSBhcmUgcmVuZGVyZWQuXG4gICAqL1xuICBtdXN0YWNoZS5wYXJzZSA9IGZ1bmN0aW9uIHBhcnNlKHRlbXBsYXRlLCB0YWdzKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRXcml0ZXIucGFyc2UodGVtcGxhdGUsIHRhZ3MpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZW5kZXJzIHRoZSBgdGVtcGxhdGVgIHdpdGggdGhlIGdpdmVuIGB2aWV3YCBhbmQgYHBhcnRpYWxzYCB1c2luZyB0aGVcbiAgICogZGVmYXVsdCB3cml0ZXIuXG4gICAqL1xuICBtdXN0YWNoZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIodGVtcGxhdGUsIHZpZXcsIHBhcnRpYWxzKSB7XG4gICAgaWYgKHR5cGVvZiB0ZW1wbGF0ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgdGVtcGxhdGUhIFRlbXBsYXRlIHNob3VsZCBiZSBhIFwic3RyaW5nXCIgJyArICdidXQgXCInICsgdHlwZVN0cih0ZW1wbGF0ZSkgKyAnXCIgd2FzIGdpdmVuIGFzIHRoZSBmaXJzdCAnICsgJ2FyZ3VtZW50IGZvciBtdXN0YWNoZSNyZW5kZXIodGVtcGxhdGUsIHZpZXcsIHBhcnRpYWxzKScpO1xuICAgIH1cblxuICAgIHJldHVybiBkZWZhdWx0V3JpdGVyLnJlbmRlcih0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMpO1xuICB9O1xuXG4gIC8vIFRoaXMgaXMgaGVyZSBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkgd2l0aCAwLjQueC4sXG4gIC8qZXNsaW50LWRpc2FibGUgKi8gLy8gZXNsaW50IHdhbnRzIGNhbWVsIGNhc2VkIGZ1bmN0aW9uIG5hbWVcbiAgbXVzdGFjaGUudG9faHRtbCA9IGZ1bmN0aW9uIHRvX2h0bWwodGVtcGxhdGUsIHZpZXcsIHBhcnRpYWxzLCBzZW5kKSB7XG4gICAgLyplc2xpbnQtZW5hYmxlKi9cblxuICAgIHZhciByZXN1bHQgPSBtdXN0YWNoZS5yZW5kZXIodGVtcGxhdGUsIHZpZXcsIHBhcnRpYWxzKTtcblxuICAgIGlmIChpc0Z1bmN0aW9uKHNlbmQpKSB7XG4gICAgICBzZW5kKHJlc3VsdCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gIH07XG5cbiAgLy8gRXhwb3J0IHRoZSBlc2NhcGluZyBmdW5jdGlvbiBzbyB0aGF0IHRoZSB1c2VyIG1heSBvdmVycmlkZSBpdC5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qYW5sL211c3RhY2hlLmpzL2lzc3Vlcy8yNDRcbiAgbXVzdGFjaGUuZXNjYXBlID0gZXNjYXBlSHRtbDtcblxuICAvLyBFeHBvcnQgdGhlc2UgbWFpbmx5IGZvciB0ZXN0aW5nLCBidXQgYWxzbyBmb3IgYWR2YW5jZWQgdXNhZ2UuXG4gIG11c3RhY2hlLlNjYW5uZXIgPSBTY2FubmVyO1xuICBtdXN0YWNoZS5Db250ZXh0ID0gQ29udGV4dDtcbiAgbXVzdGFjaGUuV3JpdGVyID0gV3JpdGVyO1xuXG59KSk7XG5cbmV4cG9ydCBkZWZhdWx0IEFYNi5tdXN0YWNoZTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vc3JjL0FYNk11c3RhY2hlLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgbm9ybWFsaXplSGVhZGVyTmFtZSA9IHJlcXVpcmUoJy4vaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lJyk7XG5cbnZhciBERUZBVUxUX0NPTlRFTlRfVFlQRSA9IHtcbiAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG59O1xuXG5mdW5jdGlvbiBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgdmFsdWUpIHtcbiAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzKSAmJiB1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzWydDb250ZW50LVR5cGUnXSkpIHtcbiAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9IHZhbHVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRBZGFwdGVyKCkge1xuICB2YXIgYWRhcHRlcjtcbiAgaWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBGb3IgYnJvd3NlcnMgdXNlIFhIUiBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMveGhyJyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gRm9yIG5vZGUgdXNlIEhUVFAgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL2h0dHAnKTtcbiAgfVxuICByZXR1cm4gYWRhcHRlcjtcbn1cblxudmFyIGRlZmF1bHRzID0ge1xuICBhZGFwdGVyOiBnZXREZWZhdWx0QWRhcHRlcigpLFxuXG4gIHRyYW5zZm9ybVJlcXVlc3Q6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXF1ZXN0KGRhdGEsIGhlYWRlcnMpIHtcbiAgICBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsICdDb250ZW50LVR5cGUnKTtcbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNBcnJheUJ1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzU3RyZWFtKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0ZpbGUoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQmxvYihkYXRhKVxuICAgICkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyVmlldyhkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGEuYnVmZmVyO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc09iamVjdChkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIHRyYW5zZm9ybVJlc3BvbnNlOiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UoZGF0YSkge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkgeyAvKiBJZ25vcmUgKi8gfVxuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgdGltZW91dDogMCxcblxuICB4c3JmQ29va2llTmFtZTogJ1hTUkYtVE9LRU4nLFxuICB4c3JmSGVhZGVyTmFtZTogJ1gtWFNSRi1UT0tFTicsXG5cbiAgbWF4Q29udGVudExlbmd0aDogLTEsXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfVxufTtcblxuZGVmYXVsdHMuaGVhZGVycyA9IHtcbiAgY29tbW9uOiB7XG4gICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonXG4gIH1cbn07XG5cbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0gdXRpbHMubWVyZ2UoREVGQVVMVF9DT05URU5UX1RZUEUpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdHM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMuanNcbi8vIG1vZHVsZSBpZCA9IDM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcCgpIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9iaW5kLmpzXG4vLyBtb2R1bGUgaWQgPSAzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHNldHRsZSA9IHJlcXVpcmUoJy4vLi4vY29yZS9zZXR0bGUnKTtcbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9idWlsZFVSTCcpO1xudmFyIHBhcnNlSGVhZGVycyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9wYXJzZUhlYWRlcnMnKTtcbnZhciBpc1VSTFNhbWVPcmlnaW4gPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luJyk7XG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuLi9jb3JlL2NyZWF0ZUVycm9yJyk7XG52YXIgYnRvYSA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuYnRvYSAmJiB3aW5kb3cuYnRvYS5iaW5kKHdpbmRvdykpIHx8IHJlcXVpcmUoJy4vLi4vaGVscGVycy9idG9hJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24geGhyQWRhcHRlcihjb25maWcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGRpc3BhdGNoWGhyUmVxdWVzdChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcmVxdWVzdERhdGEgPSBjb25maWcuZGF0YTtcbiAgICB2YXIgcmVxdWVzdEhlYWRlcnMgPSBjb25maWcuaGVhZGVycztcblxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKHJlcXVlc3REYXRhKSkge1xuICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzWydDb250ZW50LVR5cGUnXTsgLy8gTGV0IHRoZSBicm93c2VyIHNldCBpdFxuICAgIH1cblxuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgdmFyIGxvYWRFdmVudCA9ICdvbnJlYWR5c3RhdGVjaGFuZ2UnO1xuICAgIHZhciB4RG9tYWluID0gZmFsc2U7XG5cbiAgICAvLyBGb3IgSUUgOC85IENPUlMgc3VwcG9ydFxuICAgIC8vIE9ubHkgc3VwcG9ydHMgUE9TVCBhbmQgR0VUIGNhbGxzIGFuZCBkb2Vzbid0IHJldHVybnMgdGhlIHJlc3BvbnNlIGhlYWRlcnMuXG4gICAgLy8gRE9OJ1QgZG8gdGhpcyBmb3IgdGVzdGluZyBiL2MgWE1MSHR0cFJlcXVlc3QgaXMgbW9ja2VkLCBub3QgWERvbWFpblJlcXVlc3QuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAndGVzdCcgJiZcbiAgICAgICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgd2luZG93LlhEb21haW5SZXF1ZXN0ICYmICEoJ3dpdGhDcmVkZW50aWFscycgaW4gcmVxdWVzdCkgJiZcbiAgICAgICAgIWlzVVJMU2FtZU9yaWdpbihjb25maWcudXJsKSkge1xuICAgICAgcmVxdWVzdCA9IG5ldyB3aW5kb3cuWERvbWFpblJlcXVlc3QoKTtcbiAgICAgIGxvYWRFdmVudCA9ICdvbmxvYWQnO1xuICAgICAgeERvbWFpbiA9IHRydWU7XG4gICAgICByZXF1ZXN0Lm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbiBoYW5kbGVQcm9ncmVzcygpIHt9O1xuICAgICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge307XG4gICAgfVxuXG4gICAgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuICAgIGlmIChjb25maWcuYXV0aCkge1xuICAgICAgdmFyIHVzZXJuYW1lID0gY29uZmlnLmF1dGgudXNlcm5hbWUgfHwgJyc7XG4gICAgICB2YXIgcGFzc3dvcmQgPSBjb25maWcuYXV0aC5wYXNzd29yZCB8fCAnJztcbiAgICAgIHJlcXVlc3RIZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmFzaWMgJyArIGJ0b2EodXNlcm5hbWUgKyAnOicgKyBwYXNzd29yZCk7XG4gICAgfVxuXG4gICAgcmVxdWVzdC5vcGVuKGNvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgYnVpbGRVUkwoY29uZmlnLnVybCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLCB0cnVlKTtcblxuICAgIC8vIFNldCB0aGUgcmVxdWVzdCB0aW1lb3V0IGluIE1TXG4gICAgcmVxdWVzdC50aW1lb3V0ID0gY29uZmlnLnRpbWVvdXQ7XG5cbiAgICAvLyBMaXN0ZW4gZm9yIHJlYWR5IHN0YXRlXG4gICAgcmVxdWVzdFtsb2FkRXZlbnRdID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCB8fCAocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0ICYmICF4RG9tYWluKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSByZXF1ZXN0IGVycm9yZWQgb3V0IGFuZCB3ZSBkaWRuJ3QgZ2V0IGEgcmVzcG9uc2UsIHRoaXMgd2lsbCBiZVxuICAgICAgLy8gaGFuZGxlZCBieSBvbmVycm9yIGluc3RlYWRcbiAgICAgIC8vIFdpdGggb25lIGV4Y2VwdGlvbjogcmVxdWVzdCB0aGF0IHVzaW5nIGZpbGU6IHByb3RvY29sLCBtb3N0IGJyb3dzZXJzXG4gICAgICAvLyB3aWxsIHJldHVybiBzdGF0dXMgYXMgMCBldmVuIHRob3VnaCBpdCdzIGEgc3VjY2Vzc2Z1bCByZXF1ZXN0XG4gICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDAgJiYgIShyZXF1ZXN0LnJlc3BvbnNlVVJMICYmIHJlcXVlc3QucmVzcG9uc2VVUkwuaW5kZXhPZignZmlsZTonKSA9PT0gMCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBQcmVwYXJlIHRoZSByZXNwb25zZVxuICAgICAgdmFyIHJlc3BvbnNlSGVhZGVycyA9ICdnZXRBbGxSZXNwb25zZUhlYWRlcnMnIGluIHJlcXVlc3QgPyBwYXJzZUhlYWRlcnMocmVxdWVzdC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSkgOiBudWxsO1xuICAgICAgdmFyIHJlc3BvbnNlRGF0YSA9ICFjb25maWcucmVzcG9uc2VUeXBlIHx8IGNvbmZpZy5yZXNwb25zZVR5cGUgPT09ICd0ZXh0JyA/IHJlcXVlc3QucmVzcG9uc2VUZXh0IDogcmVxdWVzdC5yZXNwb25zZTtcbiAgICAgIHZhciByZXNwb25zZSA9IHtcbiAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICAvLyBJRSBzZW5kcyAxMjIzIGluc3RlYWQgb2YgMjA0IChodHRwczovL2dpdGh1Yi5jb20vbXphYnJpc2tpZS9heGlvcy9pc3N1ZXMvMjAxKVxuICAgICAgICBzdGF0dXM6IHJlcXVlc3Quc3RhdHVzID09PSAxMjIzID8gMjA0IDogcmVxdWVzdC5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzID09PSAxMjIzID8gJ05vIENvbnRlbnQnIDogcmVxdWVzdC5zdGF0dXNUZXh0LFxuICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICByZXF1ZXN0OiByZXF1ZXN0XG4gICAgICB9O1xuXG4gICAgICBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgbG93IGxldmVsIG5ldHdvcmsgZXJyb3JzXG4gICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gaGFuZGxlRXJyb3IoKSB7XG4gICAgICAvLyBSZWFsIGVycm9ycyBhcmUgaGlkZGVuIGZyb20gdXMgYnkgdGhlIGJyb3dzZXJcbiAgICAgIC8vIG9uZXJyb3Igc2hvdWxkIG9ubHkgZmlyZSBpZiBpdCdzIGEgbmV0d29yayBlcnJvclxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCdOZXR3b3JrIEVycm9yJywgY29uZmlnLCBudWxsLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgdGltZW91dFxuICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHtcbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcigndGltZW91dCBvZiAnICsgY29uZmlnLnRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnLCBjb25maWcsICdFQ09OTkFCT1JURUQnLFxuICAgICAgICByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAvLyBUaGlzIGlzIG9ubHkgZG9uZSBpZiBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAgICAvLyBTcGVjaWZpY2FsbHkgbm90IGlmIHdlJ3JlIGluIGEgd2ViIHdvcmtlciwgb3IgcmVhY3QtbmF0aXZlLlxuICAgIGlmICh1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpKSB7XG4gICAgICB2YXIgY29va2llcyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9jb29raWVzJyk7XG5cbiAgICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgICAgdmFyIHhzcmZWYWx1ZSA9IChjb25maWcud2l0aENyZWRlbnRpYWxzIHx8IGlzVVJMU2FtZU9yaWdpbihjb25maWcudXJsKSkgJiYgY29uZmlnLnhzcmZDb29raWVOYW1lID9cbiAgICAgICAgICBjb29raWVzLnJlYWQoY29uZmlnLnhzcmZDb29raWVOYW1lKSA6XG4gICAgICAgICAgdW5kZWZpbmVkO1xuXG4gICAgICBpZiAoeHNyZlZhbHVlKSB7XG4gICAgICAgIHJlcXVlc3RIZWFkZXJzW2NvbmZpZy54c3JmSGVhZGVyTmFtZV0gPSB4c3JmVmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQWRkIGhlYWRlcnMgdG8gdGhlIHJlcXVlc3RcbiAgICBpZiAoJ3NldFJlcXVlc3RIZWFkZXInIGluIHJlcXVlc3QpIHtcbiAgICAgIHV0aWxzLmZvckVhY2gocmVxdWVzdEhlYWRlcnMsIGZ1bmN0aW9uIHNldFJlcXVlc3RIZWFkZXIodmFsLCBrZXkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXF1ZXN0RGF0YSA9PT0gJ3VuZGVmaW5lZCcgJiYga2V5LnRvTG93ZXJDYXNlKCkgPT09ICdjb250ZW50LXR5cGUnKSB7XG4gICAgICAgICAgLy8gUmVtb3ZlIENvbnRlbnQtVHlwZSBpZiBkYXRhIGlzIHVuZGVmaW5lZFxuICAgICAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1trZXldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIE90aGVyd2lzZSBhZGQgaGVhZGVyIHRvIHRoZSByZXF1ZXN0XG4gICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgdmFsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gQWRkIHdpdGhDcmVkZW50aWFscyB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmIChjb25maWcud2l0aENyZWRlbnRpYWxzKSB7XG4gICAgICByZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gQWRkIHJlc3BvbnNlVHlwZSB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IGNvbmZpZy5yZXNwb25zZVR5cGU7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIEV4cGVjdGVkIERPTUV4Y2VwdGlvbiB0aHJvd24gYnkgYnJvd3NlcnMgbm90IGNvbXBhdGlibGUgWE1MSHR0cFJlcXVlc3QgTGV2ZWwgMi5cbiAgICAgICAgLy8gQnV0LCB0aGlzIGNhbiBiZSBzdXBwcmVzc2VkIGZvciAnanNvbicgdHlwZSBhcyBpdCBjYW4gYmUgcGFyc2VkIGJ5IGRlZmF1bHQgJ3RyYW5zZm9ybVJlc3BvbnNlJyBmdW5jdGlvbi5cbiAgICAgICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUgIT09ICdqc29uJykge1xuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgcHJvZ3Jlc3MgaWYgbmVlZGVkXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25Eb3dubG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgLy8gTm90IGFsbCBicm93c2VycyBzdXBwb3J0IHVwbG9hZCBldmVudHNcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nICYmIHJlcXVlc3QudXBsb2FkKSB7XG4gICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgICAvLyBIYW5kbGUgY2FuY2VsbGF0aW9uXG4gICAgICBjb25maWcuY2FuY2VsVG9rZW4ucHJvbWlzZS50aGVuKGZ1bmN0aW9uIG9uQ2FuY2VsZWQoY2FuY2VsKSB7XG4gICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgcmVqZWN0KGNhbmNlbCk7XG4gICAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocmVxdWVzdERhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVxdWVzdERhdGEgPSBudWxsO1xuICAgIH1cblxuICAgIC8vIFNlbmQgdGhlIHJlcXVlc3RcbiAgICByZXF1ZXN0LnNlbmQocmVxdWVzdERhdGEpO1xuICB9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzXG4vLyBtb2R1bGUgaWQgPSA0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW5oYW5jZUVycm9yID0gcmVxdWlyZSgnLi9lbmhhbmNlRXJyb3InKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UsIGNvbmZpZywgZXJyb3IgY29kZSwgcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlRXJyb3IobWVzc2FnZSwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIHJldHVybiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2NyZWF0ZUVycm9yLmpzXG4vLyBtb2R1bGUgaWQgPSA0MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQ2FuY2VsKHZhbHVlKSB7XG4gIHJldHVybiAhISh2YWx1ZSAmJiB2YWx1ZS5fX0NBTkNFTF9fKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzXG4vLyBtb2R1bGUgaWQgPSA0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEEgYENhbmNlbGAgaXMgYW4gb2JqZWN0IHRoYXQgaXMgdGhyb3duIHdoZW4gYW4gb3BlcmF0aW9uIGlzIGNhbmNlbGVkLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlIFRoZSBtZXNzYWdlLlxuICovXG5mdW5jdGlvbiBDYW5jZWwobWVzc2FnZSkge1xuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xufVxuXG5DYW5jZWwucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiAnQ2FuY2VsJyArICh0aGlzLm1lc3NhZ2UgPyAnOiAnICsgdGhpcy5tZXNzYWdlIDogJycpO1xufTtcblxuQ2FuY2VsLnByb3RvdHlwZS5fX0NBTkNFTF9fID0gdHJ1ZTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWw7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbC5qc1xuLy8gbW9kdWxlIGlkID0gNDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvYXhpb3MnKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xudmFyIEF4aW9zID0gcmVxdWlyZSgnLi9jb3JlL0F4aW9zJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqIEByZXR1cm4ge0F4aW9zfSBBIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICovXG5mdW5jdGlvbiBjcmVhdGVJbnN0YW5jZShkZWZhdWx0Q29uZmlnKSB7XG4gIHZhciBjb250ZXh0ID0gbmV3IEF4aW9zKGRlZmF1bHRDb25maWcpO1xuICB2YXIgaW5zdGFuY2UgPSBiaW5kKEF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIEF4aW9zLnByb3RvdHlwZSwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBjb250ZXh0IHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgY29udGV4dCk7XG5cbiAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG4vLyBDcmVhdGUgdGhlIGRlZmF1bHQgaW5zdGFuY2UgdG8gYmUgZXhwb3J0ZWRcbnZhciBheGlvcyA9IGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRzKTtcblxuLy8gRXhwb3NlIEF4aW9zIGNsYXNzIHRvIGFsbG93IGNsYXNzIGluaGVyaXRhbmNlXG5heGlvcy5BeGlvcyA9IEF4aW9zO1xuXG4vLyBGYWN0b3J5IGZvciBjcmVhdGluZyBuZXcgaW5zdGFuY2VzXG5heGlvcy5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaW5zdGFuY2VDb25maWcpIHtcbiAgcmV0dXJuIGNyZWF0ZUluc3RhbmNlKHV0aWxzLm1lcmdlKGRlZmF1bHRzLCBpbnN0YW5jZUNvbmZpZykpO1xufTtcblxuLy8gRXhwb3NlIENhbmNlbCAmIENhbmNlbFRva2VuXG5heGlvcy5DYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWwnKTtcbmF4aW9zLkNhbmNlbFRva2VuID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsVG9rZW4nKTtcbmF4aW9zLmlzQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvaXNDYW5jZWwnKTtcblxuLy8gRXhwb3NlIGFsbC9zcHJlYWRcbmF4aW9zLmFsbCA9IGZ1bmN0aW9uIGFsbChwcm9taXNlcykge1xuICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xufTtcbmF4aW9zLnNwcmVhZCA9IHJlcXVpcmUoJy4vaGVscGVycy9zcHJlYWQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBheGlvcztcblxuLy8gQWxsb3cgdXNlIG9mIGRlZmF1bHQgaW1wb3J0IHN5bnRheCBpbiBUeXBlU2NyaXB0XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gYXhpb3M7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanNcbi8vIG1vZHVsZSBpZCA9IDQ3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIvKiFcbiAqIERldGVybWluZSBpZiBhbiBvYmplY3QgaXMgYSBCdWZmZXJcbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8ZmVyb3NzQGZlcm9zcy5vcmc+IDxodHRwOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuXG4vLyBUaGUgX2lzQnVmZmVyIGNoZWNrIGlzIGZvciBTYWZhcmkgNS03IHN1cHBvcnQsIGJlY2F1c2UgaXQncyBtaXNzaW5nXG4vLyBPYmplY3QucHJvdG90eXBlLmNvbnN0cnVjdG9yLiBSZW1vdmUgdGhpcyBldmVudHVhbGx5XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAhPSBudWxsICYmIChpc0J1ZmZlcihvYmopIHx8IGlzU2xvd0J1ZmZlcihvYmopIHx8ICEhb2JqLl9pc0J1ZmZlcilcbn1cblxuZnVuY3Rpb24gaXNCdWZmZXIgKG9iaikge1xuICByZXR1cm4gISFvYmouY29uc3RydWN0b3IgJiYgdHlwZW9mIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIob2JqKVxufVxuXG4vLyBGb3IgTm9kZSB2MC4xMCBzdXBwb3J0LiBSZW1vdmUgdGhpcyBldmVudHVhbGx5LlxuZnVuY3Rpb24gaXNTbG93QnVmZmVyIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmoucmVhZEZsb2F0TEUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIG9iai5zbGljZSA9PT0gJ2Z1bmN0aW9uJyAmJiBpc0J1ZmZlcihvYmouc2xpY2UoMCwgMCkpXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9pcy1idWZmZXIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDQ4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vLi4vZGVmYXVsdHMnKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBJbnRlcmNlcHRvck1hbmFnZXIgPSByZXF1aXJlKCcuL0ludGVyY2VwdG9yTWFuYWdlcicpO1xudmFyIGRpc3BhdGNoUmVxdWVzdCA9IHJlcXVpcmUoJy4vZGlzcGF0Y2hSZXF1ZXN0Jyk7XG52YXIgaXNBYnNvbHV0ZVVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9pc0Fic29sdXRlVVJMJyk7XG52YXIgY29tYmluZVVSTHMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29tYmluZVVSTHMnKTtcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gQXhpb3MoaW5zdGFuY2VDb25maWcpIHtcbiAgdGhpcy5kZWZhdWx0cyA9IGluc3RhbmNlQ29uZmlnO1xuICB0aGlzLmludGVyY2VwdG9ycyA9IHtcbiAgICByZXF1ZXN0OiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKCksXG4gICAgcmVzcG9uc2U6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKVxuICB9O1xufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyBzcGVjaWZpYyBmb3IgdGhpcyByZXF1ZXN0IChtZXJnZWQgd2l0aCB0aGlzLmRlZmF1bHRzKVxuICovXG5BeGlvcy5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uIHJlcXVlc3QoY29uZmlnKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAvLyBBbGxvdyBmb3IgYXhpb3MoJ2V4YW1wbGUvdXJsJ1ssIGNvbmZpZ10pIGEgbGEgZmV0Y2ggQVBJXG4gIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgIGNvbmZpZyA9IHV0aWxzLm1lcmdlKHtcbiAgICAgIHVybDogYXJndW1lbnRzWzBdXG4gICAgfSwgYXJndW1lbnRzWzFdKTtcbiAgfVxuXG4gIGNvbmZpZyA9IHV0aWxzLm1lcmdlKGRlZmF1bHRzLCB0aGlzLmRlZmF1bHRzLCB7IG1ldGhvZDogJ2dldCcgfSwgY29uZmlnKTtcbiAgY29uZmlnLm1ldGhvZCA9IGNvbmZpZy5tZXRob2QudG9Mb3dlckNhc2UoKTtcblxuICAvLyBTdXBwb3J0IGJhc2VVUkwgY29uZmlnXG4gIGlmIChjb25maWcuYmFzZVVSTCAmJiAhaXNBYnNvbHV0ZVVSTChjb25maWcudXJsKSkge1xuICAgIGNvbmZpZy51cmwgPSBjb21iaW5lVVJMcyhjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCk7XG4gIH1cblxuICAvLyBIb29rIHVwIGludGVyY2VwdG9ycyBtaWRkbGV3YXJlXG4gIHZhciBjaGFpbiA9IFtkaXNwYXRjaFJlcXVlc3QsIHVuZGVmaW5lZF07XG4gIHZhciBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGNvbmZpZyk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVxdWVzdC5mb3JFYWNoKGZ1bmN0aW9uIHVuc2hpZnRSZXF1ZXN0SW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4udW5zaGlmdChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UuZm9yRWFjaChmdW5jdGlvbiBwdXNoUmVzcG9uc2VJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi5wdXNoKGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB3aGlsZSAoY2hhaW4ubGVuZ3RoKSB7XG4gICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbi5zaGlmdCgpLCBjaGFpbi5zaGlmdCgpKTtcbiAgfVxuXG4gIHJldHVybiBwcm9taXNlO1xufTtcblxuLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXRpbHMubWVyZ2UoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBkYXRhLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHV0aWxzLm1lcmdlKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybCxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBeGlvcztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzXG4vLyBtb2R1bGUgaWQgPSA0OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgbm9ybWFsaXplZE5hbWUpIHtcbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLCBmdW5jdGlvbiBwcm9jZXNzSGVhZGVyKHZhbHVlLCBuYW1lKSB7XG4gICAgaWYgKG5hbWUgIT09IG5vcm1hbGl6ZWROYW1lICYmIG5hbWUudG9VcHBlckNhc2UoKSA9PT0gbm9ybWFsaXplZE5hbWUudG9VcHBlckNhc2UoKSkge1xuICAgICAgaGVhZGVyc1tub3JtYWxpemVkTmFtZV0gPSB2YWx1ZTtcbiAgICAgIGRlbGV0ZSBoZWFkZXJzW25hbWVdO1xuICAgIH1cbiAgfSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZS5qc1xuLy8gbW9kdWxlIGlkID0gNTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNyZWF0ZUVycm9yID0gcmVxdWlyZSgnLi9jcmVhdGVFcnJvcicpO1xuXG4vKipcbiAqIFJlc29sdmUgb3IgcmVqZWN0IGEgUHJvbWlzZSBiYXNlZCBvbiByZXNwb25zZSBzdGF0dXMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVzb2x2ZSBBIGZ1bmN0aW9uIHRoYXQgcmVzb2x2ZXMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3QgQSBmdW5jdGlvbiB0aGF0IHJlamVjdHMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge29iamVjdH0gcmVzcG9uc2UgVGhlIHJlc3BvbnNlLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKSB7XG4gIHZhciB2YWxpZGF0ZVN0YXR1cyA9IHJlc3BvbnNlLmNvbmZpZy52YWxpZGF0ZVN0YXR1cztcbiAgLy8gTm90ZTogc3RhdHVzIGlzIG5vdCBleHBvc2VkIGJ5IFhEb21haW5SZXF1ZXN0XG4gIGlmICghcmVzcG9uc2Uuc3RhdHVzIHx8ICF2YWxpZGF0ZVN0YXR1cyB8fCB2YWxpZGF0ZVN0YXR1cyhyZXNwb25zZS5zdGF0dXMpKSB7XG4gICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gIH0gZWxzZSB7XG4gICAgcmVqZWN0KGNyZWF0ZUVycm9yKFxuICAgICAgJ1JlcXVlc3QgZmFpbGVkIHdpdGggc3RhdHVzIGNvZGUgJyArIHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIHJlc3BvbnNlLmNvbmZpZyxcbiAgICAgIG51bGwsXG4gICAgICByZXNwb25zZS5yZXF1ZXN0LFxuICAgICAgcmVzcG9uc2VcbiAgICApKTtcbiAgfVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3NldHRsZS5qc1xuLy8gbW9kdWxlIGlkID0gNTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVcGRhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIGNvbmZpZywgZXJyb3IgY29kZSwgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVycm9yIFRoZSBlcnJvciB0byB1cGRhdGUuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGVycm9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICBlcnJvci5jb25maWcgPSBjb25maWc7XG4gIGlmIChjb2RlKSB7XG4gICAgZXJyb3IuY29kZSA9IGNvZGU7XG4gIH1cbiAgZXJyb3IucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIGVycm9yLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gIHJldHVybiBlcnJvcjtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanNcbi8vIG1vZHVsZSBpZCA9IDUyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gZW5jb2RlKHZhbCkge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkuXG4gICAgcmVwbGFjZSgvJTQwL2dpLCAnQCcpLlxuICAgIHJlcGxhY2UoLyUzQS9naSwgJzonKS5cbiAgICByZXBsYWNlKC8lMjQvZywgJyQnKS5cbiAgICByZXBsYWNlKC8lMkMvZ2ksICcsJykuXG4gICAgcmVwbGFjZSgvJTIwL2csICcrJykuXG4gICAgcmVwbGFjZSgvJTVCL2dpLCAnWycpLlxuICAgIHJlcGxhY2UoLyU1RC9naSwgJ10nKTtcbn1cblxuLyoqXG4gKiBCdWlsZCBhIFVSTCBieSBhcHBlbmRpbmcgcGFyYW1zIHRvIHRoZSBlbmRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBiYXNlIG9mIHRoZSB1cmwgKGUuZy4sIGh0dHA6Ly93d3cuZ29vZ2xlLmNvbSlcbiAqIEBwYXJhbSB7b2JqZWN0fSBbcGFyYW1zXSBUaGUgcGFyYW1zIHRvIGJlIGFwcGVuZGVkXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHVybFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkVVJMKHVybCwgcGFyYW1zLCBwYXJhbXNTZXJpYWxpemVyKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICBpZiAoIXBhcmFtcykge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICB2YXIgc2VyaWFsaXplZFBhcmFtcztcbiAgaWYgKHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zU2VyaWFsaXplcihwYXJhbXMpO1xuICB9IGVsc2UgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKHBhcmFtcykpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zLnRvU3RyaW5nKCk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHBhcnRzID0gW107XG5cbiAgICB1dGlscy5mb3JFYWNoKHBhcmFtcywgZnVuY3Rpb24gc2VyaWFsaXplKHZhbCwga2V5KSB7XG4gICAgICBpZiAodmFsID09PSBudWxsIHx8IHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHV0aWxzLmlzQXJyYXkodmFsKSkge1xuICAgICAgICBrZXkgPSBrZXkgKyAnW10nO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXV0aWxzLmlzQXJyYXkodmFsKSkge1xuICAgICAgICB2YWwgPSBbdmFsXTtcbiAgICAgIH1cblxuICAgICAgdXRpbHMuZm9yRWFjaCh2YWwsIGZ1bmN0aW9uIHBhcnNlVmFsdWUodikge1xuICAgICAgICBpZiAodXRpbHMuaXNEYXRlKHYpKSB7XG4gICAgICAgICAgdiA9IHYudG9JU09TdHJpbmcoKTtcbiAgICAgICAgfSBlbHNlIGlmICh1dGlscy5pc09iamVjdCh2KSkge1xuICAgICAgICAgIHYgPSBKU09OLnN0cmluZ2lmeSh2KTtcbiAgICAgICAgfVxuICAgICAgICBwYXJ0cy5wdXNoKGVuY29kZShrZXkpICsgJz0nICsgZW5jb2RlKHYpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcnRzLmpvaW4oJyYnKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgdXJsICs9ICh1cmwuaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJykgKyBzZXJpYWxpemVkUGFyYW1zO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idWlsZFVSTC5qc1xuLy8gbW9kdWxlIGlkID0gNTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vKipcbiAqIFBhcnNlIGhlYWRlcnMgaW50byBhbiBvYmplY3RcbiAqXG4gKiBgYGBcbiAqIERhdGU6IFdlZCwgMjcgQXVnIDIwMTQgMDg6NTg6NDkgR01UXG4gKiBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cbiAqIENvbm5lY3Rpb246IGtlZXAtYWxpdmVcbiAqIFRyYW5zZmVyLUVuY29kaW5nOiBjaHVua2VkXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVycyBIZWFkZXJzIG5lZWRpbmcgdG8gYmUgcGFyc2VkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhoZWFkZXJzKSB7XG4gIHZhciBwYXJzZWQgPSB7fTtcbiAgdmFyIGtleTtcbiAgdmFyIHZhbDtcbiAgdmFyIGk7XG5cbiAgaWYgKCFoZWFkZXJzKSB7IHJldHVybiBwYXJzZWQ7IH1cblxuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMuc3BsaXQoJ1xcbicpLCBmdW5jdGlvbiBwYXJzZXIobGluZSkge1xuICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBrZXkgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKDAsIGkpKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoaSArIDEpKTtcblxuICAgIGlmIChrZXkpIHtcbiAgICAgIHBhcnNlZFtrZXldID0gcGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSArICcsICcgKyB2YWwgOiB2YWw7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gcGFyc2VkO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qc1xuLy8gbW9kdWxlIGlkID0gNTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIGhhdmUgZnVsbCBzdXBwb3J0IG9mIHRoZSBBUElzIG5lZWRlZCB0byB0ZXN0XG4gIC8vIHdoZXRoZXIgdGhlIHJlcXVlc3QgVVJMIGlzIG9mIHRoZSBzYW1lIG9yaWdpbiBhcyBjdXJyZW50IGxvY2F0aW9uLlxuICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHZhciBtc2llID0gLyhtc2llfHRyaWRlbnQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICB2YXIgdXJsUGFyc2luZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgdmFyIG9yaWdpblVSTDtcblxuICAgIC8qKlxuICAgICogUGFyc2UgYSBVUkwgdG8gZGlzY292ZXIgaXQncyBjb21wb25lbnRzXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHVybCBUaGUgVVJMIHRvIGJlIHBhcnNlZFxuICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAqL1xuICAgIGZ1bmN0aW9uIHJlc29sdmVVUkwodXJsKSB7XG4gICAgICB2YXIgaHJlZiA9IHVybDtcblxuICAgICAgaWYgKG1zaWUpIHtcbiAgICAgICAgLy8gSUUgbmVlZHMgYXR0cmlidXRlIHNldCB0d2ljZSB0byBub3JtYWxpemUgcHJvcGVydGllc1xuICAgICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcbiAgICAgICAgaHJlZiA9IHVybFBhcnNpbmdOb2RlLmhyZWY7XG4gICAgICB9XG5cbiAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuXG4gICAgICAvLyB1cmxQYXJzaW5nTm9kZSBwcm92aWRlcyB0aGUgVXJsVXRpbHMgaW50ZXJmYWNlIC0gaHR0cDovL3VybC5zcGVjLndoYXR3Zy5vcmcvI3VybHV0aWxzXG4gICAgICByZXR1cm4ge1xuICAgICAgICBocmVmOiB1cmxQYXJzaW5nTm9kZS5ocmVmLFxuICAgICAgICBwcm90b2NvbDogdXJsUGFyc2luZ05vZGUucHJvdG9jb2wgPyB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbC5yZXBsYWNlKC86JC8sICcnKSA6ICcnLFxuICAgICAgICBob3N0OiB1cmxQYXJzaW5nTm9kZS5ob3N0LFxuICAgICAgICBzZWFyY2g6IHVybFBhcnNpbmdOb2RlLnNlYXJjaCA/IHVybFBhcnNpbmdOb2RlLnNlYXJjaC5yZXBsYWNlKC9eXFw/LywgJycpIDogJycsXG4gICAgICAgIGhhc2g6IHVybFBhcnNpbmdOb2RlLmhhc2ggPyB1cmxQYXJzaW5nTm9kZS5oYXNoLnJlcGxhY2UoL14jLywgJycpIDogJycsXG4gICAgICAgIGhvc3RuYW1lOiB1cmxQYXJzaW5nTm9kZS5ob3N0bmFtZSxcbiAgICAgICAgcG9ydDogdXJsUGFyc2luZ05vZGUucG9ydCxcbiAgICAgICAgcGF0aG5hbWU6ICh1cmxQYXJzaW5nTm9kZS5wYXRobmFtZS5jaGFyQXQoMCkgPT09ICcvJykgP1xuICAgICAgICAgICAgICAgICAgdXJsUGFyc2luZ05vZGUucGF0aG5hbWUgOlxuICAgICAgICAgICAgICAgICAgJy8nICsgdXJsUGFyc2luZ05vZGUucGF0aG5hbWVcbiAgICAgIH07XG4gICAgfVxuXG4gICAgb3JpZ2luVVJMID0gcmVzb2x2ZVVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG5cbiAgICAvKipcbiAgICAqIERldGVybWluZSBpZiBhIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luIGFzIHRoZSBjdXJyZW50IGxvY2F0aW9uXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHJlcXVlc3RVUkwgVGhlIFVSTCB0byB0ZXN0XG4gICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiwgb3RoZXJ3aXNlIGZhbHNlXG4gICAgKi9cbiAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKHJlcXVlc3RVUkwpIHtcbiAgICAgIHZhciBwYXJzZWQgPSAodXRpbHMuaXNTdHJpbmcocmVxdWVzdFVSTCkpID8gcmVzb2x2ZVVSTChyZXF1ZXN0VVJMKSA6IHJlcXVlc3RVUkw7XG4gICAgICByZXR1cm4gKHBhcnNlZC5wcm90b2NvbCA9PT0gb3JpZ2luVVJMLnByb3RvY29sICYmXG4gICAgICAgICAgICBwYXJzZWQuaG9zdCA9PT0gb3JpZ2luVVJMLmhvc3QpO1xuICAgIH07XG4gIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudnMgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbigpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gIH0pKClcbik7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanNcbi8vIG1vZHVsZSBpZCA9IDU1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIndXNlIHN0cmljdCc7XG5cbi8vIGJ0b2EgcG9seWZpbGwgZm9yIElFPDEwIGNvdXJ0ZXN5IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXZpZGNoYW1iZXJzL0Jhc2U2NC5qc1xuXG52YXIgY2hhcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz0nO1xuXG5mdW5jdGlvbiBFKCkge1xuICB0aGlzLm1lc3NhZ2UgPSAnU3RyaW5nIGNvbnRhaW5zIGFuIGludmFsaWQgY2hhcmFjdGVyJztcbn1cbkUucHJvdG90eXBlID0gbmV3IEVycm9yO1xuRS5wcm90b3R5cGUuY29kZSA9IDU7XG5FLnByb3RvdHlwZS5uYW1lID0gJ0ludmFsaWRDaGFyYWN0ZXJFcnJvcic7XG5cbmZ1bmN0aW9uIGJ0b2EoaW5wdXQpIHtcbiAgdmFyIHN0ciA9IFN0cmluZyhpbnB1dCk7XG4gIHZhciBvdXRwdXQgPSAnJztcbiAgZm9yIChcbiAgICAvLyBpbml0aWFsaXplIHJlc3VsdCBhbmQgY291bnRlclxuICAgIHZhciBibG9jaywgY2hhckNvZGUsIGlkeCA9IDAsIG1hcCA9IGNoYXJzO1xuICAgIC8vIGlmIHRoZSBuZXh0IHN0ciBpbmRleCBkb2VzIG5vdCBleGlzdDpcbiAgICAvLyAgIGNoYW5nZSB0aGUgbWFwcGluZyB0YWJsZSB0byBcIj1cIlxuICAgIC8vICAgY2hlY2sgaWYgZCBoYXMgbm8gZnJhY3Rpb25hbCBkaWdpdHNcbiAgICBzdHIuY2hhckF0KGlkeCB8IDApIHx8IChtYXAgPSAnPScsIGlkeCAlIDEpO1xuICAgIC8vIFwiOCAtIGlkeCAlIDEgKiA4XCIgZ2VuZXJhdGVzIHRoZSBzZXF1ZW5jZSAyLCA0LCA2LCA4XG4gICAgb3V0cHV0ICs9IG1hcC5jaGFyQXQoNjMgJiBibG9jayA+PiA4IC0gaWR4ICUgMSAqIDgpXG4gICkge1xuICAgIGNoYXJDb2RlID0gc3RyLmNoYXJDb2RlQXQoaWR4ICs9IDMgLyA0KTtcbiAgICBpZiAoY2hhckNvZGUgPiAweEZGKSB7XG4gICAgICB0aHJvdyBuZXcgRSgpO1xuICAgIH1cbiAgICBibG9jayA9IGJsb2NrIDw8IDggfCBjaGFyQ29kZTtcbiAgfVxuICByZXR1cm4gb3V0cHV0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJ0b2E7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idG9hLmpzXG4vLyBtb2R1bGUgaWQgPSA1NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgc3VwcG9ydCBkb2N1bWVudC5jb29raWVcbiAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKG5hbWUsIHZhbHVlLCBleHBpcmVzLCBwYXRoLCBkb21haW4sIHNlY3VyZSkge1xuICAgICAgICB2YXIgY29va2llID0gW107XG4gICAgICAgIGNvb2tpZS5wdXNoKG5hbWUgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcblxuICAgICAgICBpZiAodXRpbHMuaXNOdW1iZXIoZXhwaXJlcykpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgnZXhwaXJlcz0nICsgbmV3IERhdGUoZXhwaXJlcykudG9HTVRTdHJpbmcoKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcocGF0aCkpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgncGF0aD0nICsgcGF0aCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcoZG9tYWluKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdkb21haW49JyArIGRvbWFpbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VjdXJlID09PSB0cnVlKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ3NlY3VyZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llLmpvaW4oJzsgJyk7XG4gICAgICB9LFxuXG4gICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG5hbWUpIHtcbiAgICAgICAgdmFyIG1hdGNoID0gZG9jdW1lbnQuY29va2llLm1hdGNoKG5ldyBSZWdFeHAoJyhefDtcXFxccyopKCcgKyBuYW1lICsgJyk9KFteO10qKScpKTtcbiAgICAgICAgcmV0dXJuIChtYXRjaCA/IGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFszXSkgOiBudWxsKTtcbiAgICAgIH0sXG5cbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKG5hbWUpIHtcbiAgICAgICAgdGhpcy53cml0ZShuYW1lLCAnJywgRGF0ZS5ub3coKSAtIDg2NDAwMDAwKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnYgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZSgpIHt9LFxuICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHsgcmV0dXJuIG51bGw7IH0sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfSkoKVxuKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2Nvb2tpZXMuanNcbi8vIG1vZHVsZSBpZCA9IDU3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gSW50ZXJjZXB0b3JNYW5hZ2VyKCkge1xuICB0aGlzLmhhbmRsZXJzID0gW107XG59XG5cbi8qKlxuICogQWRkIGEgbmV3IGludGVyY2VwdG9yIHRvIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bGZpbGxlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGB0aGVuYCBmb3IgYSBgUHJvbWlzZWBcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHJlamVjdGAgZm9yIGEgYFByb21pc2VgXG4gKlxuICogQHJldHVybiB7TnVtYmVyfSBBbiBJRCB1c2VkIHRvIHJlbW92ZSBpbnRlcmNlcHRvciBsYXRlclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLnVzZSA9IGZ1bmN0aW9uIHVzZShmdWxmaWxsZWQsIHJlamVjdGVkKSB7XG4gIHRoaXMuaGFuZGxlcnMucHVzaCh7XG4gICAgZnVsZmlsbGVkOiBmdWxmaWxsZWQsXG4gICAgcmVqZWN0ZWQ6IHJlamVjdGVkXG4gIH0pO1xuICByZXR1cm4gdGhpcy5oYW5kbGVycy5sZW5ndGggLSAxO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYW4gaW50ZXJjZXB0b3IgZnJvbSB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gaWQgVGhlIElEIHRoYXQgd2FzIHJldHVybmVkIGJ5IGB1c2VgXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZWplY3QgPSBmdW5jdGlvbiBlamVjdChpZCkge1xuICBpZiAodGhpcy5oYW5kbGVyc1tpZF0pIHtcbiAgICB0aGlzLmhhbmRsZXJzW2lkXSA9IG51bGw7XG4gIH1cbn07XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFsbCB0aGUgcmVnaXN0ZXJlZCBpbnRlcmNlcHRvcnNcbiAqXG4gKiBUaGlzIG1ldGhvZCBpcyBwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBza2lwcGluZyBvdmVyIGFueVxuICogaW50ZXJjZXB0b3JzIHRoYXQgbWF5IGhhdmUgYmVjb21lIGBudWxsYCBjYWxsaW5nIGBlamVjdGAuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggaW50ZXJjZXB0b3JcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gZm9yRWFjaChmbikge1xuICB1dGlscy5mb3JFYWNoKHRoaXMuaGFuZGxlcnMsIGZ1bmN0aW9uIGZvckVhY2hIYW5kbGVyKGgpIHtcbiAgICBpZiAoaCAhPT0gbnVsbCkge1xuICAgICAgZm4oaCk7XG4gICAgfVxuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSW50ZXJjZXB0b3JNYW5hZ2VyO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzXG4vLyBtb2R1bGUgaWQgPSA1OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgdHJhbnNmb3JtRGF0YSA9IHJlcXVpcmUoJy4vdHJhbnNmb3JtRGF0YScpO1xudmFyIGlzQ2FuY2VsID0gcmVxdWlyZSgnLi4vY2FuY2VsL2lzQ2FuY2VsJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLi9kZWZhdWx0cycpO1xuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbmZ1bmN0aW9uIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKSB7XG4gIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICBjb25maWcuY2FuY2VsVG9rZW4udGhyb3dJZlJlcXVlc3RlZCgpO1xuICB9XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgdXNpbmcgdGhlIGNvbmZpZ3VyZWQgYWRhcHRlci5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRpc3BhdGNoUmVxdWVzdChjb25maWcpIHtcbiAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gIC8vIEVuc3VyZSBoZWFkZXJzIGV4aXN0XG4gIGNvbmZpZy5oZWFkZXJzID0gY29uZmlnLmhlYWRlcnMgfHwge307XG5cbiAgLy8gVHJhbnNmb3JtIHJlcXVlc3QgZGF0YVxuICBjb25maWcuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgY29uZmlnLmRhdGEsXG4gICAgY29uZmlnLmhlYWRlcnMsXG4gICAgY29uZmlnLnRyYW5zZm9ybVJlcXVlc3RcbiAgKTtcblxuICAvLyBGbGF0dGVuIGhlYWRlcnNcbiAgY29uZmlnLmhlYWRlcnMgPSB1dGlscy5tZXJnZShcbiAgICBjb25maWcuaGVhZGVycy5jb21tb24gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnNbY29uZmlnLm1ldGhvZF0gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnMgfHwge31cbiAgKTtcblxuICB1dGlscy5mb3JFYWNoKFxuICAgIFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJywgJ2NvbW1vbiddLFxuICAgIGZ1bmN0aW9uIGNsZWFuSGVhZGVyQ29uZmlnKG1ldGhvZCkge1xuICAgICAgZGVsZXRlIGNvbmZpZy5oZWFkZXJzW21ldGhvZF07XG4gICAgfVxuICApO1xuXG4gIHZhciBhZGFwdGVyID0gY29uZmlnLmFkYXB0ZXIgfHwgZGVmYXVsdHMuYWRhcHRlcjtcblxuICByZXR1cm4gYWRhcHRlcihjb25maWcpLnRoZW4oZnVuY3Rpb24gb25BZGFwdGVyUmVzb2x1dGlvbihyZXNwb25zZSkge1xuICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgcmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgICByZXNwb25zZS5kYXRhLFxuICAgICAgcmVzcG9uc2UuaGVhZGVycyxcbiAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICk7XG5cbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH0sIGZ1bmN0aW9uIG9uQWRhcHRlclJlamVjdGlvbihyZWFzb24pIHtcbiAgICBpZiAoIWlzQ2FuY2VsKHJlYXNvbikpIHtcbiAgICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICAgIGlmIChyZWFzb24gJiYgcmVhc29uLnJlc3BvbnNlKSB7XG4gICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSxcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuaGVhZGVycyxcbiAgICAgICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcbiAgfSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzXG4vLyBtb2R1bGUgaWQgPSA1OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbi8qKlxuICogVHJhbnNmb3JtIHRoZSBkYXRhIGZvciBhIHJlcXVlc3Qgb3IgYSByZXNwb25zZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gZGF0YSBUaGUgZGF0YSB0byBiZSB0cmFuc2Zvcm1lZFxuICogQHBhcmFtIHtBcnJheX0gaGVhZGVycyBUaGUgaGVhZGVycyBmb3IgdGhlIHJlcXVlc3Qgb3IgcmVzcG9uc2VcbiAqIEBwYXJhbSB7QXJyYXl8RnVuY3Rpb259IGZucyBBIHNpbmdsZSBmdW5jdGlvbiBvciBBcnJheSBvZiBmdW5jdGlvbnNcbiAqIEByZXR1cm5zIHsqfSBUaGUgcmVzdWx0aW5nIHRyYW5zZm9ybWVkIGRhdGFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0cmFuc2Zvcm1EYXRhKGRhdGEsIGhlYWRlcnMsIGZucykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgdXRpbHMuZm9yRWFjaChmbnMsIGZ1bmN0aW9uIHRyYW5zZm9ybShmbikge1xuICAgIGRhdGEgPSBmbihkYXRhLCBoZWFkZXJzKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRhdGE7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvdHJhbnNmb3JtRGF0YS5qc1xuLy8gbW9kdWxlIGlkID0gNjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQWJzb2x1dGVVUkwodXJsKSB7XG4gIC8vIEEgVVJMIGlzIGNvbnNpZGVyZWQgYWJzb2x1dGUgaWYgaXQgYmVnaW5zIHdpdGggXCI8c2NoZW1lPjovL1wiIG9yIFwiLy9cIiAocHJvdG9jb2wtcmVsYXRpdmUgVVJMKS5cbiAgLy8gUkZDIDM5ODYgZGVmaW5lcyBzY2hlbWUgbmFtZSBhcyBhIHNlcXVlbmNlIG9mIGNoYXJhY3RlcnMgYmVnaW5uaW5nIHdpdGggYSBsZXR0ZXIgYW5kIGZvbGxvd2VkXG4gIC8vIGJ5IGFueSBjb21iaW5hdGlvbiBvZiBsZXR0ZXJzLCBkaWdpdHMsIHBsdXMsIHBlcmlvZCwgb3IgaHlwaGVuLlxuICByZXR1cm4gL14oW2Etel1bYS16XFxkXFwrXFwtXFwuXSo6KT9cXC9cXC8vaS50ZXN0KHVybCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qc1xuLy8gbW9kdWxlIGlkID0gNjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIHNwZWNpZmllZCBVUkxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpdmVVUkwgVGhlIHJlbGF0aXZlIFVSTFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlbGF0aXZlVVJMKSB7XG4gIHJldHVybiByZWxhdGl2ZVVSTFxuICAgID8gYmFzZVVSTC5yZXBsYWNlKC9cXC8rJC8sICcnKSArICcvJyArIHJlbGF0aXZlVVJMLnJlcGxhY2UoL15cXC8rLywgJycpXG4gICAgOiBiYXNlVVJMO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzXG4vLyBtb2R1bGUgaWQgPSA2MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2FuY2VsID0gcmVxdWlyZSgnLi9DYW5jZWwnKTtcblxuLyoqXG4gKiBBIGBDYW5jZWxUb2tlbmAgaXMgYW4gb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVxdWVzdCBjYW5jZWxsYXRpb24gb2YgYW4gb3BlcmF0aW9uLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhlY3V0b3IgVGhlIGV4ZWN1dG9yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBDYW5jZWxUb2tlbihleGVjdXRvcikge1xuICBpZiAodHlwZW9mIGV4ZWN1dG9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhlY3V0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICB9XG5cbiAgdmFyIHJlc29sdmVQcm9taXNlO1xuICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiBwcm9taXNlRXhlY3V0b3IocmVzb2x2ZSkge1xuICAgIHJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgfSk7XG5cbiAgdmFyIHRva2VuID0gdGhpcztcbiAgZXhlY3V0b3IoZnVuY3Rpb24gY2FuY2VsKG1lc3NhZ2UpIHtcbiAgICBpZiAodG9rZW4ucmVhc29uKSB7XG4gICAgICAvLyBDYW5jZWxsYXRpb24gaGFzIGFscmVhZHkgYmVlbiByZXF1ZXN0ZWRcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0b2tlbi5yZWFzb24gPSBuZXcgQ2FuY2VsKG1lc3NhZ2UpO1xuICAgIHJlc29sdmVQcm9taXNlKHRva2VuLnJlYXNvbik7XG4gIH0pO1xufVxuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbkNhbmNlbFRva2VuLnByb3RvdHlwZS50aHJvd0lmUmVxdWVzdGVkID0gZnVuY3Rpb24gdGhyb3dJZlJlcXVlc3RlZCgpIHtcbiAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgdGhyb3cgdGhpcy5yZWFzb247XG4gIH1cbn07XG5cbi8qKlxuICogUmV0dXJucyBhbiBvYmplY3QgdGhhdCBjb250YWlucyBhIG5ldyBgQ2FuY2VsVG9rZW5gIGFuZCBhIGZ1bmN0aW9uIHRoYXQsIHdoZW4gY2FsbGVkLFxuICogY2FuY2VscyB0aGUgYENhbmNlbFRva2VuYC5cbiAqL1xuQ2FuY2VsVG9rZW4uc291cmNlID0gZnVuY3Rpb24gc291cmNlKCkge1xuICB2YXIgY2FuY2VsO1xuICB2YXIgdG9rZW4gPSBuZXcgQ2FuY2VsVG9rZW4oZnVuY3Rpb24gZXhlY3V0b3IoYykge1xuICAgIGNhbmNlbCA9IGM7XG4gIH0pO1xuICByZXR1cm4ge1xuICAgIHRva2VuOiB0b2tlbixcbiAgICBjYW5jZWw6IGNhbmNlbFxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWxUb2tlbjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsVG9rZW4uanNcbi8vIG1vZHVsZSBpZCA9IDYzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU3ludGFjdGljIHN1Z2FyIGZvciBpbnZva2luZyBhIGZ1bmN0aW9uIGFuZCBleHBhbmRpbmcgYW4gYXJyYXkgZm9yIGFyZ3VtZW50cy5cbiAqXG4gKiBDb21tb24gdXNlIGNhc2Ugd291bGQgYmUgdG8gdXNlIGBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlgLlxuICpcbiAqICBgYGBqc1xuICogIGZ1bmN0aW9uIGYoeCwgeSwgeikge31cbiAqICB2YXIgYXJncyA9IFsxLCAyLCAzXTtcbiAqICBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICogIGBgYFxuICpcbiAqIFdpdGggYHNwcmVhZGAgdGhpcyBleGFtcGxlIGNhbiBiZSByZS13cml0dGVuLlxuICpcbiAqICBgYGBqc1xuICogIHNwcmVhZChmdW5jdGlvbih4LCB5LCB6KSB7fSkoWzEsIDIsIDNdKTtcbiAqICBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNwcmVhZChjYWxsYmFjaykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcChhcnIpIHtcbiAgICByZXR1cm4gY2FsbGJhY2suYXBwbHkobnVsbCwgYXJyKTtcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcHJlYWQuanNcbi8vIG1vZHVsZSBpZCA9IDY0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJpbXBvcnQgalF1ZXJ5IGZyb20gXCJqcW1pblwiO1xuaW1wb3J0IEFYNlVJQ29yZSBmcm9tIFwiLi9BWDZVSUNvcmUuanNcIjtcbmltcG9ydCBVIGZyb20gXCIuL0FYNlV0aWwuanNcIjtcbmltcG9ydCBpbmZvIGZyb20gXCIuL0FYNkluZm8uanNcIjtcbmltcG9ydCBtdXN0YWNoZSBmcm9tIFwiLi9BWDZNdXN0YWNoZS5qc1wiO1xuXG4vKiB+fn5+fn5+fn5+fn5+fn5+fn4gZW5kIG9mIGltcG9ydCAgfn5+fn5+fn5+fn5+fn5+fn5+fn4gKi9cblxuY29uc3QgZGlhbG9nVG1wbCA9IGZ1bmN0aW9uIChjb2x1bW5LZXlzKSB7XG4gIHJldHVybiBgIFxuPGRpdiBpZD1cInt7ZGlhbG9nSWR9fVwiIGRhdGEtZGlhbG9nLWVscz1cInJvb3RcIiBkYXRhLWF4NnVpLWRpYWxvZz1cIlwiIGNsYXNzPVwie3t0aGVtZX19XCI+XG4gICAgPGRpdiBjbGFzcz1cImF4LWRpYWxvZy1oZWFkZXJcIiBkYXRhLWRpYWxvZy1lbHM9XCJoZWFkZXJcIj5cbiAgICAgICAge3t7dGl0bGV9fX1cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiYXgtZGlhbG9nLWJvZHlcIiBkYXRhLWRpYWxvZy1lbHM9XCJib2R5XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJheC1kaWFsb2ctbXNnXCI+e3t7bXNnfX19PC9kaXY+XG4gICAgICAgIFxuICAgICAgICB7eyNpbnB1dH19XG4gICAgICAgIDxkaXYgY2xhc3M9XCJheC1kaWFsb2ctcHJvbXB0XCI+XG4gICAgICAgICAgICB7eyNAZWFjaH19XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAge3sjQHZhbHVlLmxhYmVsfX1cbiAgICAgICAgICAgIDxsYWJlbD57eyNfY3JsZn19e3t7Ln19fXt7L19jcmxmfX08L2xhYmVsPlxuICAgICAgICAgICAge3svQHZhbHVlLmxhYmVsfX1cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwie3tAdmFsdWUudHlwZX19XCIgcGxhY2Vob2xkZXI9XCJ7e0B2YWx1ZS5wbGFjZWhvbGRlcn19XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wge3tAdmFsdWUudGhlbWV9fVwiIGRhdGEtZGlhbG9nLXByb21wdD1cInt7QGtleX19XCIgc3R5bGU9XCJ3aWR0aDoxMDAlO1wiIHZhbHVlPVwie3tAdmFsdWUudmFsdWV9fVwiIC8+XG4gICAgICAgICAgICB7eyNAdmFsdWUuaGVscH19XG4gICAgICAgICAgICA8cCBjbGFzcz1cImhlbHAtYmxvY2tcIj57eyNfY3JsZn19e3sufX17ey9fY3JsZn19PC9wPlxuICAgICAgICAgICAge3svQHZhbHVlLmhlbHB9fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7ey9AZWFjaH19XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7ey9pbnB1dH19XG4gICAgICAgIFxuICAgICAgICA8ZGl2IGNsYXNzPVwiYXgtZGlhbG9nLWJ1dHRvbnNcIiBkYXRhLWRpYWxvZy1lbHM9XCJidXR0b25zXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXgtYnV0dG9uLXdyYXBcIj5cbiAgICAgICAgICAgIHt7I2J0bnN9fVxuICAgICAgICAgICAgICAgIHt7I0BlYWNofX1cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBkYXRhLWRpYWxvZy1idG49XCJ7e0BrZXl9fVwiIGNsYXNzPVwiYnRuIGJ0bi17e0B2YWx1ZS50aGVtZX19XCI+e3tAdmFsdWUubGFiZWx9fTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIHt7L0BlYWNofX1cbiAgICAgICAgICAgIHt7L2J0bnN9fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICAgICAge3sjYWRkaXRpb25hbENvbnRlbnR9fVxuICAgICAgICA8ZGl2IGRhdGEtZGlhbG9nLWVscz1cImFkZGl0aW9uYWwtY29udGVudFwiPnt7ey59fX08L2Rpdj5cbiAgICAgICAge3svYWRkaXRpb25hbENvbnRlbnR9fVxuICAgIDwvZGl2PlxuPC9kaXY+ICBcbmA7XG59O1xuY29uc3Qgb25TdGF0ZUNoYW5nZWQgPSBmdW5jdGlvbiAob3B0cywgdGhhdCkge1xuICBpZiAob3B0cyAmJiBvcHRzLm9uU3RhdGVDaGFuZ2VkKSB7XG4gICAgb3B0cy5vblN0YXRlQ2hhbmdlZC5jYWxsKHRoYXQsIHRoYXQpO1xuICB9XG4gIGVsc2UgaWYgKHRoaXMub25TdGF0ZUNoYW5nZWQpIHtcbiAgICB0aGlzLm9uU3RhdGVDaGFuZ2VkLmNhbGwodGhhdCwgdGhhdCk7XG4gIH1cblxuICBvcHRzID0gbnVsbDtcbiAgdGhhdCA9IG51bGw7XG4gIHJldHVybiB0cnVlO1xufTtcbmNvbnN0IGdldENvbnRlbnQgPSBmdW5jdGlvbiAoZGlhbG9nSWQsIG9wdHMpIHtcbiAgbGV0IGRhdGEgPSB7XG4gICAgZGlhbG9nSWQ6IGRpYWxvZ0lkLFxuICAgIHRpdGxlOiAob3B0cy50aXRsZSB8fCB0aGlzLmNvbmZpZy50aXRsZSB8fCBcIlwiKSxcbiAgICBtc2c6IChvcHRzLm1zZyB8fCB0aGlzLmNvbmZpZy5tc2cgfHwgXCJcIikucmVwbGFjZSgvXFxuL2csIFwiPGJyLz5cIiksXG4gICAgaW5wdXQ6IG9wdHMuaW5wdXQsXG4gICAgYnRuczogb3B0cy5idG5zLFxuICAgICdfY3JsZic6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlcGxhY2UoL1xcbi9nLCBcIjxici8+XCIpO1xuICAgIH0sXG4gICAgYWRkaXRpb25hbENvbnRlbnQ6IChmdW5jdGlvbiAoYWRkaXRpb25hbENvbnRlbnQpIHtcbiAgICAgIGlmIChVLmlzRnVuY3Rpb24oYWRkaXRpb25hbENvbnRlbnQpKSB7XG4gICAgICAgIHJldHVybiBhZGRpdGlvbmFsQ29udGVudC5jYWxsKG9wdHMpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBhZGRpdGlvbmFsQ29udGVudDtcbiAgICAgIH1cbiAgICB9KShvcHRzLmFkZGl0aW9uYWxDb250ZW50KVxuICB9O1xuXG4gIHJldHVybiBtdXN0YWNoZS5yZW5kZXIoZGlhbG9nVG1wbC5jYWxsKHRoaXMpLCBkYXRhKTtcbn07XG5jb25zdCBvcGVuID0gZnVuY3Rpb24gKG9wdHMsIGNhbGxiYWNrKSB7XG4gIGxldCBwb3MgPSB7fSxcbiAgICAgIGJveCA9IHtcbiAgICAgICAgd2lkdGg6IG9wdHMud2lkdGhcbiAgICAgIH07XG5cbiAgdGhpcy5kaWFsb2dDb25maWcgPSBvcHRzO1xuICB0aGlzLiRhY3RpdmVEaWFsb2cgPSBqUXVlcnkoZ2V0Q29udGVudC5jYWxsKHRoaXMsIG9wdHMuaWQsIG9wdHMpKTtcbiAgdGhpcy4kYWN0aXZlRGlhbG9nLmNzcyh7d2lkdGg6IGJveC53aWR0aH0pO1xuICBqUXVlcnkoZG9jdW1lbnQuYm9keSkuYXBwZW5kKHRoaXMuJGFjdGl2ZURpYWxvZyk7XG5cbiAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNhbGxiYWNrID0gb3B0cy5jYWxsYmFjaztcbiAgfVxuXG4gIC8vIGRpYWxvZyDrhpLsnbQg6rWs7ZWY6riwIC0g64SI67mE6rCAIOygle2VtOyngOuptCDrhpLsnbTqsIAg67OA6rK9IOuQoCDqsoMuXG4gIG9wdHMuaGVpZ2h0ID0gYm94LmhlaWdodCA9IHRoaXMuJGFjdGl2ZURpYWxvZy5oZWlnaHQoKTtcblxuICAvLy0gcG9zaXRpb24g7KCV66CsXG4gIGlmICh0eXBlb2Ygb3B0cy5wb3NpdGlvbiA9PT0gXCJ1bmRlZmluZWRcIiB8fCBvcHRzLnBvc2l0aW9uID09PSBcImNlbnRlclwiKSB7XG4gICAgcG9zLnRvcCA9IGpRdWVyeSh3aW5kb3cpLmhlaWdodCgpIC8gMiAtIGJveC5oZWlnaHQgLyAyO1xuICAgIHBvcy5sZWZ0ID0galF1ZXJ5KHdpbmRvdykud2lkdGgoKSAvIDIgLSBib3gud2lkdGggLyAyO1xuICB9XG4gIGVsc2Uge1xuICAgIHBvcy5sZWZ0ID0gb3B0cy5wb3NpdGlvbi5sZWZ0IHx8IDA7XG4gICAgcG9zLnRvcCA9IG9wdHMucG9zaXRpb24udG9wIHx8IDA7XG4gIH1cbiAgaWYgKHRoaXMuY29uZmlnLnpJbmRleCkge1xuICAgIHBvc1tcInotaW5kZXhcIl0gPSB0aGlzLmNvbmZpZy56SW5kZXg7XG4gIH1cblxuICB0aGlzLiRhY3RpdmVEaWFsb2dcbiAgICAuY3NzKHBvcylcbiAgICAub24ob3B0cy5jbGlja0V2ZW50TmFtZSwgXCJbZGF0YS1kaWFsb2ctYnRuXVwiLCAoZSkgPT4ge1xuICAgICAgYnRuT25DbGljay5jYWxsKHRoaXMsIGUgfHwgd2luZG93LmV2ZW50LCBvcHRzLCBjYWxsYmFjayk7XG4gICAgfSlcbiAgICAuZmluZChvcHRzLmRpYWxvZ1R5cGUgPT09IFwicHJvbXB0XCIgPyBcIltkYXRhLWRpYWxvZy1wcm9tcHRdXCIgOiBcIltkYXRhLWRpYWxvZy1idG5dXCIpLnRyaWdnZXIoXCJmb2N1c1wiKTtcblxuXG4gIC8vIGJpbmQga2V5IGV2ZW50XG4gIGpRdWVyeSh3aW5kb3cpXG4gICAgLm9uKFwia2V5ZG93bi5heDZkaWFsb2dcIiwgKGUpID0+IHtcbiAgICAgIG9uS2V5dXAuY2FsbCh0aGlzLCBlIHx8IHdpbmRvdy5ldmVudCwgb3B0cywgY2FsbGJhY2spO1xuICAgIH0pXG4gICAgLm9uKFwicmVzaXplLmF4NmRpYWxvZ1wiLCBVLnRocm90dGxlKGZ1bmN0aW9uIChlKSB7XG4gICAgICBhbGlnbi5jYWxsKHRoaXMsIGUgfHwgd2luZG93LmV2ZW50KTtcbiAgICB9LCAzMCkuYmluZCh0aGlzKSk7XG5cbiAgb25TdGF0ZUNoYW5nZWQuY2FsbCh0aGlzLCBvcHRzLCB7XG4gICAgc2VsZjogdGhpcyxcbiAgICBzdGF0ZTogXCJvcGVuXCJcbiAgfSk7XG5cbiAgaWYgKG9wdHMuYXV0b0Nsb3NlVGltZSkge1xuICAgIHRoaXMuYXV0b0Nsb3NlVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9LCBvcHRzLmF1dG9DbG9zZVRpbWUpO1xuICB9XG5cbiAgcG9zID0gbnVsbDtcbiAgYm94ID0gbnVsbDtcbn07XG5jb25zdCBhbGlnbiA9IGZ1bmN0aW9uIChlKSB7XG4gIGlmICghdGhpcy4kYWN0aXZlRGlhbG9nKSByZXR1cm4gdGhpcztcbiAgbGV0IG9wdHMgPSB0aGlzLmRpYWxvZ0NvbmZpZyxcbiAgICAgIGJveCAgPSB7XG4gICAgICAgIHdpZHRoOiBvcHRzLndpZHRoLFxuICAgICAgICBoZWlnaHQ6IG9wdHMuaGVpZ2h0XG4gICAgICB9O1xuXG4gIC8vLSBwb3NpdGlvbiDsoJXroKxcbiAgaWYgKHR5cGVvZiBvcHRzLnBvc2l0aW9uID09PSBcInVuZGVmaW5lZFwiIHx8IG9wdHMucG9zaXRpb24gPT09IFwiY2VudGVyXCIpIHtcbiAgICBib3gudG9wID0gd2luZG93LmlubmVySGVpZ2h0IC8gMiAtIGJveC5oZWlnaHQgLyAyO1xuICAgIGJveC5sZWZ0ID0gd2luZG93LmlubmVyV2lkdGggLyAyIC0gYm94LndpZHRoIC8gMjtcbiAgfVxuICBlbHNlIHtcbiAgICBib3gubGVmdCA9IG9wdHMucG9zaXRpb24ubGVmdCB8fCAwO1xuICAgIGJveC50b3AgPSBvcHRzLnBvc2l0aW9uLnRvcCB8fCAwO1xuICB9XG4gIGlmIChib3gubGVmdCA8IDApIGJveC5sZWZ0ID0gMDtcbiAgaWYgKGJveC50b3AgPCAwKSBib3gudG9wID0gMDtcblxuICB0aGlzLiRhY3RpdmVEaWFsb2cuY3NzKGJveCk7XG5cbiAgb3B0cyA9IG51bGw7XG4gIGJveCA9IG51bGw7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuY29uc3QgYnRuT25DbGljayA9IGZ1bmN0aW9uIChlLCBvcHRzLCBjYWxsYmFjaywgdGFyZ2V0LCBrKSB7XG4gIGxldCB0aGF0LFxuICAgICAgZW1wdHlLZXkgPSBudWxsO1xuXG4gIGlmIChlLnNyY0VsZW1lbnQpIGUudGFyZ2V0ID0gZS5zcmNFbGVtZW50O1xuXG4gIHRhcmdldCA9IFUuZmluZFBhcmVudE5vZGUoZS50YXJnZXQsIGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICBpZiAodGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtZGlhbG9nLWJ0blwiKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9KTtcblxuICBpZiAodGFyZ2V0KSB7XG4gICAgayA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWRpYWxvZy1idG5cIik7XG5cbiAgICB0aGF0ID0ge1xuICAgICAgc2VsZjogdGhpcyxcbiAgICAgIGtleTogaywgdmFsdWU6IG9wdHMuYnRuc1trXSxcbiAgICAgIGRpYWxvZ0lkOiBvcHRzLmlkLFxuICAgICAgYnRuVGFyZ2V0OiB0YXJnZXRcbiAgICB9O1xuICAgIGlmIChvcHRzLmRpYWxvZ1R5cGUgPT09IFwicHJvbXB0XCIpIHtcbiAgICAgIHRoYXQuaW5wdXQgPSB7fTtcbiAgICAgIGZvciAobGV0IG9pIGluIG9wdHMuaW5wdXQpIHtcbiAgICAgICAgdGhhdC5pbnB1dFtvaV0gPSB0aGlzLiRhY3RpdmVEaWFsb2cuZmluZCgnW2RhdGEtZGlhbG9nLXByb21wdD0nICsgb2kgKyAnXScpLnZhbCgpO1xuICAgICAgICBpZiAob3B0cy5pbnB1dFtvaV0ucmVxdWlyZWQgJiYgKHRoYXQuaW5wdXRbb2ldID09IFwiXCIgfHwgdGhhdC5pbnB1dFtvaV0gPT0gbnVsbCkpIHtcbiAgICAgICAgICBlbXB0eUtleSA9IG9pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvcHRzLmJ0bnNba10ub25DbGljaykge1xuICAgICAgb3B0cy5idG5zW2tdLm9uQ2xpY2suY2FsbCh0aGF0LCB0aGF0KTtcbiAgICB9XG4gICAgZWxzZSBpZiAob3B0cy5kaWFsb2dUeXBlID09PSBcImFsZXJ0XCIpIHtcbiAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2suY2FsbCh0aGF0LCB0aGF0KTtcbiAgICAgIHRoaXMuY2xvc2Uoe2RvTm90Q2FsbGJhY2s6IHRydWV9KTtcbiAgICB9XG4gICAgZWxzZSBpZiAob3B0cy5kaWFsb2dUeXBlID09PSBcImNvbmZpcm1cIikge1xuICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjay5jYWxsKHRoYXQsIHRoYXQpO1xuICAgICAgdGhpcy5jbG9zZSh7ZG9Ob3RDYWxsYmFjazogdHJ1ZX0pO1xuICAgIH1cbiAgICBlbHNlIGlmIChvcHRzLmRpYWxvZ1R5cGUgPT09IFwicHJvbXB0XCIpIHtcbiAgICAgIGlmIChrID09PSAnb2snKSB7XG4gICAgICAgIGlmIChlbXB0eUtleSkge1xuICAgICAgICAgIHRoaXMuJGFjdGl2ZURpYWxvZy5maW5kKCdbZGF0YS1kaWFsb2ctcHJvbXB0PVwiJyArIGVtcHR5S2V5ICsgJ1wiXScpLmdldCgwKS5mb2N1cygpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjay5jYWxsKHRoYXQsIHRoYXQpO1xuICAgICAgdGhpcy5jbG9zZSh7ZG9Ob3RDYWxsYmFjazogdHJ1ZX0pO1xuICAgIH1cbiAgfVxuXG4gIHRoYXQgPSBudWxsO1xuICBvcHRzID0gbnVsbDtcbiAgY2FsbGJhY2sgPSBudWxsO1xuICB0YXJnZXQgPSBudWxsO1xuICBrID0gbnVsbDtcbn07XG5jb25zdCBvbktleXVwID0gZnVuY3Rpb24gKGUsIG9wdHMsIGNhbGxiYWNrLCB0YXJnZXQsIGspIHtcbiAgbGV0IHRoYXQsXG4gICAgICBlbXB0eUtleSA9IG51bGw7XG5cbiAgaWYgKGUua2V5Q29kZSA9PSBpbmZvLmV2ZW50S2V5cy5FU0MpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cbiAgaWYgKG9wdHMuZGlhbG9nVHlwZSA9PT0gXCJwcm9tcHRcIikge1xuICAgIGlmIChlLmtleUNvZGUgPT0gaW5mby5ldmVudEtleXMuUkVUVVJOKSB7XG4gICAgICB0aGF0ID0ge1xuICAgICAgICBzZWxmOiB0aGlzLFxuICAgICAgICBrZXk6IGssIHZhbHVlOiBvcHRzLmJ0bnNba10sXG4gICAgICAgIGRpYWxvZ0lkOiBvcHRzLmlkLFxuICAgICAgICBidG5UYXJnZXQ6IHRhcmdldFxuICAgICAgfTtcbiAgICAgIHRoYXQuaW5wdXQgPSB7fTtcblxuICAgICAgZm9yIChsZXQgb2kgaW4gb3B0cy5pbnB1dCkge1xuICAgICAgICB0aGF0LmlucHV0W29pXSA9IHRoaXMuJGFjdGl2ZURpYWxvZy5maW5kKCdbZGF0YS1kaWFsb2ctcHJvbXB0PScgKyBvaSArICddJykudmFsKCk7XG4gICAgICAgIGlmIChvcHRzLmlucHV0W29pXS5yZXF1aXJlZCAmJiAodGhhdC5pbnB1dFtvaV0gPT0gXCJcIiB8fCB0aGF0LmlucHV0W29pXSA9PSBudWxsKSkge1xuICAgICAgICAgIGVtcHR5S2V5ID0gb2k7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChlbXB0eUtleSkge1xuICAgICAgICB0aGF0ID0gbnVsbDtcbiAgICAgICAgZW1wdHlLZXkgPSBudWxsO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrLmNhbGwodGhhdCwgdGhhdCk7XG4gICAgICB0aGlzLmNsb3NlKHtkb05vdENhbGxiYWNrOiB0cnVlfSk7XG4gICAgfVxuICB9XG5cbiAgdGhhdCA9IG51bGw7XG4gIGVtcHR5S2V5ID0gbnVsbDtcbiAgb3B0cyA9IG51bGw7XG4gIGNhbGxiYWNrID0gbnVsbDtcbiAgdGFyZ2V0ID0gbnVsbDtcbiAgayA9IG51bGw7XG59O1xuXG4vKiB+fn5+fn5+fn5+fn5+fn5+fn4gZW5kIG9mIHByaXZhdGUgIH5+fn5+fn5+fn5+fn5+fn5+fn5+ICovXG5cbi8qKlxuICogQGNsYXNzXG4gKi9cbmNsYXNzIEFYNlVJRGlhbG9nIGV4dGVuZHMgQVg2VUlDb3JlIHtcbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gY29uZmlnXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgLyoqXG4gICAgICogQG1lbWJlciB7SlNPTn1cbiAgICAgKiBAcGFyYW0gY29uZmlnXG4gICAgICogQHBhcmFtIFtjb25maWcudGhlbWU9J2RlZmF1bHQnXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLndpZHRoPTMwMF1cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy50aXRsZT0nJ11cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5tc2c9JyddXG4gICAgICogQHBhcmFtIFtjb25maWcubGFuZ11cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5sYW5nLm9rPSdvayddXG4gICAgICogQHBhcmFtIFtjb25maWcubGFuZy5jYW5jZWw9J2NhbmNlbCddXG4gICAgICogQHBhcmFtIFtjb25maWcuYW5pbWF0ZVRpbWU9MTUwXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmF1dG9DbG9zZVRpbWU9MF1cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5vblN0YXRlQ2hhbmdlZF1cbiAgICAgKlxuICAgICAqL1xuICAgIHRoaXMuY29uZmlnID0ge1xuICAgICAgaWQ6ICdheDYtZGlhbG9nLScgKyB0aGlzLmluc3RhbmNlSWQsXG4gICAgICBjbGlja0V2ZW50TmFtZTogXCJjbGlja1wiLFxuICAgICAgdGhlbWU6ICdkZWZhdWx0JyxcbiAgICAgIHdpZHRoOiAzMDAsXG4gICAgICB0aXRsZTogJ0FYNlVJRGlhbG9nJyxcbiAgICAgIG1zZzogJycsXG4gICAgICBsYW5nOiB7XG4gICAgICAgIFwib2tcIjogXCJva1wiLCBcImNhbmNlbFwiOiBcImNhbmNlbFwiXG4gICAgICB9LFxuICAgICAgYW5pbWF0ZVRpbWU6IDE1MCxcbiAgICAgIGF1dG9DbG9zZVRpbWU6IDBcbiAgICB9O1xuICAgIGpRdWVyeS5leHRlbmQodHJ1ZSwgdGhpcy5jb25maWcsIGNvbmZpZyk7XG5cbiAgICAvLyDrqaTrsoQg67OA7IiYIOy0iOq4sO2ZlFxuICAgIC8qKlxuICAgICAqIGRpYWxvZ+qwgCDsl7TroKTsnojripQg7IOB7YOc7JeQ7IScIOuLpOyLnCBvcGVu7J20IOuQmOuptCBxdWV1ZeyXkCDrs7TqtIAg7ZWY7JiA64uk6rCAIGNsb3Nl7ZuEIG9wZW5cbiAgICAgKiBAbWVtYmVyIHtBcnJheX1cbiAgICAgKi9cbiAgICB0aGlzLnF1ZXVlID0gW107XG4gICAgLyoqXG4gICAgICogQG1lbWJlciB7alF1ZXJ5RWxlbWVudH1cbiAgICAgKi9cbiAgICB0aGlzLiRhY3RpdmVEaWFsb2cgPSBudWxsO1xuICAgIC8qKlxuICAgICAqIEBtZW1iZXIge09iamVjdH1cbiAgICAgKi9cbiAgICB0aGlzLmF1dG9DbG9zZVRpbWVyID0gbnVsbDtcblxuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQHBhcmFtIGNvbmZpZ1xuICAgKi9cbiAgaW5pdCgpIHtcbiAgICB0aGlzLm9uU3RhdGVDaGFuZ2VkID0gdGhpcy5jb25maWcub25TdGF0ZUNoYW5nZWQ7XG4gICAgZGVsZXRlIHRoaXMuY29uZmlnLm9uU3RhdGVDaGFuZ2VkO1xuXG4gICAgLy8gaW5pdCDtmLjstpwg7Jes67aAXG4gICAgdGhpcy5pbml0T25jZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICovXG4gIGluaXRPbmNlKCkge1xuICAgIGlmICh0aGlzLmluaXRpYWxpemVkKSByZXR1cm4gdGhpcztcbiAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBwYXJhbSBvcHRzXG4gICAqIEBwYXJhbSBjYWxsYmFja1xuICAgKiBAcGFyYW0gdHJ5Q291bnRcbiAgICogQHJldHVybiB7QVg2VUlEaWFsb2d9XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqIGltcG9ydCB7RGlhbG9nfSBmcm9tIFwiYXg2dWlcIlxuICAgKlxuICAgKiBjb25zdCBkaWFsb2cgPSBuZXcgRGlhbG9nKCk7XG4gICAqIGRpYWxvZy5hbGVydChcIkFsZXJ0IE1lc3NhZ2VcIik7XG4gICAqIGRpYWxvZy5hbGVydCh7XG4gICAgICogICAgIHRpdGxlOiBcIlRpdGxlXCIsXG4gICAgICogICAgIG1zZzogXCJBbGVydCBNZXNzYWdlXCJcbiAgICAgKiB9KTtcbiAgICogYGBgXG4gICAqL1xuICBhbGVydChvcHRzLCBjYWxsYmFjaywgdHJ5Q291bnQpIHtcbiAgICBpZiAodHlwZW9mIG9wdHMgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIG9wdHMgPSB7XG4gICAgICAgIHRpdGxlOiB0aGlzLmNvbmZpZy50aXRsZSxcbiAgICAgICAgbXNnOiBcIlwiXG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChVLmlzU3RyaW5nKG9wdHMpKSB7XG4gICAgICBvcHRzID0ge1xuICAgICAgICB0aXRsZTogdGhpcy5jb25maWcudGl0bGUsXG4gICAgICAgIG1zZzogb3B0c1xuICAgICAgfVxuICAgIH1cblxuICAgIG9wdHMgPSBqUXVlcnkuZXh0ZW5kKHRydWUsIHt9LCB0aGlzLmNvbmZpZywgb3B0cywge1xuICAgICAgZGlhbG9nVHlwZTogXCJhbGVydFwiLFxuICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrXG4gICAgfSk7XG5cbiAgICBpZiAodHlwZW9mIG9wdHMuYnRucyA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgb3B0cy5idG5zID0ge1xuICAgICAgICBvazoge2xhYmVsOiBvcHRzLmxhbmdbXCJva1wiXSwgdGhlbWU6IG9wdHMudGhlbWV9XG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmICh0aGlzLiRhY3RpdmVEaWFsb2cpIHtcbiAgICAgIHRoaXMucXVldWUucHVzaChvcHRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3Blbi5jYWxsKHRoaXMsIG9wdHMsIGNhbGxiYWNrKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAcGFyYW0gb3B0c1xuICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICogQHBhcmFtIHRyeUNvdW50XG4gICAqIEByZXR1cm4ge0FYNlVJRGlhbG9nfVxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBqc1xuICAgKiBpbXBvcnQge0RpYWxvZ30gZnJvbSBcImF4NnVpXCJcbiAgICpcbiAgICogY29uc3QgZGlhbG9nID0gbmV3IERpYWxvZygpO1xuICAgKiBkaWFsb2cuY29uZmlybSh7XG4gICAgICogICAgIHRpdGxlOiBcIu2ZleyduFwiLFxuICAgICAqICAgICBtc2c6IFwi7ZmV7J24IOuYkOuKlCDst6jshozrpbwg64iE66W07IS47JqUXCJcbiAgICAgKiB9LCBmdW5jdGlvbiAocmVzKSB7XG4gICAgICogICAgIC8vY29uc29sZS5sb2codGhpcywgYSwgYik7XG4gICAgICogICAgIGlmKHJlcy5rZXkgPT0gXCJva1wiKXtcbiAgICAgKiAgICAgICAgIGNvbnNvbGUubG9nKFwiT0tcIik7XG4gICAgICogICAgIH1cbiAgICAgKiAgICAgZWxzZSBpZihyZXMua2V5ID09IFwiY2FuY2VsXCIpe1xuICAgICAqICAgICAgICAgY29uc29sZS5sb2coXCJDQU5DRUxcIik7XG4gICAgICogICAgIH1cbiAgICAgKiB9KTtcbiAgICpcbiAgICogLy8gYnRucyBjdXN0b21cbiAgICogZGlhbG9nLmNvbmZpZyh7XG4gICAgICogIHRpdGxlOiBcIuyYiC/slYTri4jsmKRcIixcbiAgICAgKiAgbXNnOiBcIuuLueyLoOydgCDqsJzrsJzsnpAg7J6F64uI6rmMP1wiLFxuICAgICAqICBidG5zOiB7XG4gICAgICogICAgICBZOiB7bGFiZWw6IFwi7JiIXCJ9LFxuICAgICAqICAgICAgTjoge2xhYmVsOiBcIuyVhOuLiOyYpFwifVxuICAgICAqICB9XG4gICAgICogfSwgZnVuY3Rpb24gKHJlcykge1xuICAgICAqICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgKiB9KTtcbiAgICogYGBgXG4gICAqL1xuICBjb25maXJtKG9wdHMsIGNhbGxiYWNrLCB0cnlDb3VudCkge1xuICAgIGlmICh0eXBlb2Ygb3B0cyA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgb3B0cyA9IHtcbiAgICAgICAgdGl0bGU6IHRoaXMuY29uZmlnLnRpdGxlLFxuICAgICAgICBtc2c6IFwiXCJcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKFUuaXNTdHJpbmcob3B0cykpIHtcbiAgICAgIG9wdHMgPSB7XG4gICAgICAgIHRpdGxlOiB0aGlzLmNvbmZpZy50aXRsZSxcbiAgICAgICAgbXNnOiBvcHRzXG4gICAgICB9XG4gICAgfVxuXG4gICAgb3B0cyA9IGpRdWVyeS5leHRlbmQodHJ1ZSwge30sIHRoaXMuY29uZmlnLCBvcHRzLCB7XG4gICAgICBkaWFsb2dUeXBlOiBcImNvbmZpcm1cIixcbiAgICAgIGNhbGxiYWNrOiBjYWxsYmFja1xuICAgIH0pO1xuXG4gICAgaWYgKHR5cGVvZiBvcHRzLmJ0bnMgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIG9wdHMuYnRucyA9IHtcbiAgICAgICAgb2s6IHtsYWJlbDogb3B0cy5sYW5nW1wib2tcIl0sIHRoZW1lOiBvcHRzLnRoZW1lfSxcbiAgICAgICAgY2FuY2VsOiB7bGFiZWw6IG9wdHMubGFuZ1tcImNhbmNlbFwiXX1cbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuJGFjdGl2ZURpYWxvZykge1xuICAgICAgdGhpcy5xdWV1ZS5wdXNoKG9wdHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcGVuLmNhbGwodGhpcywgb3B0cywgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQHBhcmFtIG9wdHNcbiAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAqIEBwYXJhbSB0cnlDb3VudFxuICAgKiBAcmV0dXJuIHtBWDZVSURpYWxvZ31cbiAgICogQGV4YW1wbGVcbiAgICogYGBganNcbiAgICogaW1wb3J0IHtEaWFsb2d9IGZyb20gXCJheDZ1aVwiXG4gICAqXG4gICAqIGNvbnN0IGRpYWxvZyA9IG5ldyBEaWFsb2coKTtcbiAgICpcbiAgICogZGlhbG9nLnByb21wdCh7XG4gICAgICogIHRpdGxlOiBcInByb21wdFwiLFxuICAgICAqICBtc2c6ICfri6TsnYzsnZgg6rCS7J2EIOyeheugpe2VmOyEuOyalC4nLFxuICAgICAqICBpbnB1dDoge1xuICAgICAqICAgICAgZGF0YTE6IHtsYWJlbDogXCJkYXRhMeydmCDrnbzrsqhcIiwgdHlwZTogXCJwYXNzd29yZFwifSxcbiAgICAgKiAgICAgIGRhdGEyOiB7bGFiZWw6IFwiZGF0YTLsnZgg652867KoXCJ9XG4gICAgICogIH1cbiAgICAgKiB9LCBmdW5jdGlvbihyZXMpe1xuICAgICAqICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgKiB9KTtcbiAgICogYGBgXG4gICAqL1xuICBwcm9tcHQob3B0cywgY2FsbGJhY2ssIHRyeUNvdW50KSB7XG4gICAgaWYgKHR5cGVvZiBvcHRzID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBvcHRzID0ge1xuICAgICAgICB0aXRsZTogdGhpcy5jb25maWcudGl0bGUsXG4gICAgICAgIG1zZzogXCJcIlxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoVS5pc1N0cmluZyhvcHRzKSkge1xuICAgICAgb3B0cyA9IHtcbiAgICAgICAgdGl0bGU6IHRoaXMuY29uZmlnLnRpdGxlLFxuICAgICAgICBtc2c6IG9wdHNcbiAgICAgIH1cbiAgICB9XG5cbiAgICBvcHRzID0galF1ZXJ5LmV4dGVuZCh0cnVlLCB7fSwgdGhpcy5jb25maWcsIG9wdHMsIHtcbiAgICAgIGRpYWxvZ1R5cGU6IFwicHJvbXB0XCIsXG4gICAgICBjYWxsYmFjazogY2FsbGJhY2tcbiAgICB9KTtcblxuICAgIGlmICh0eXBlb2Ygb3B0cy5pbnB1dCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgb3B0cy5pbnB1dCA9IHtcbiAgICAgICAgdmFsdWU6IHtsYWJlbDogXCJcIn1cbiAgICAgIH07XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygb3B0cy5idG5zID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBvcHRzLmJ0bnMgPSB7XG4gICAgICAgIG9rOiB7bGFiZWw6IG9wdHMubGFuZ1tcIm9rXCJdLCB0aGVtZTogb3B0cy50aGVtZX0sXG4gICAgICAgIGNhbmNlbDoge2xhYmVsOiBvcHRzLmxhbmdbXCJjYW5jZWxcIl19XG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmICh0aGlzLiRhY3RpdmVEaWFsb2cpIHtcbiAgICAgIHRoaXMucXVldWUucHVzaChvcHRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3Blbi5jYWxsKHRoaXMsIG9wdHMsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBwYXJhbSBfb3B0aW9uXG4gICAqIEByZXR1cm4ge0FYNlVJRGlhbG9nfVxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBqc1xuICAgKiBkaWFsb2cuY2xvc2UoKTtcbiAgICogZGlhbG9nLmNsb3NlKHtjYWxsYmFjazogZnVuY3Rpb24oKXtcbiAgICAgKlxuICAgICAqIH0pO1xuICAgICAqIGBgYFxuICAgICAqL1xuICBjbG9zZShfb3B0aW9uKSB7XG4gICAgbGV0IG9wdHMsIHRoYXQ7XG5cbiAgICBpZiAodGhpcy4kYWN0aXZlRGlhbG9nKSB7XG4gICAgICBpZiAodGhpcy5hdXRvQ2xvc2VUaW1lcikgY2xlYXJUaW1lb3V0KHRoaXMuYXV0b0Nsb3NlVGltZXIpO1xuXG4gICAgICBvcHRzID0gdGhpcy5kaWFsb2dDb25maWc7XG5cbiAgICAgIHRoaXMuJGFjdGl2ZURpYWxvZy5hZGRDbGFzcyhcImRlc3Ryb3lcIik7XG4gICAgICBqUXVlcnkod2luZG93KVxuICAgICAgICAub2ZmKFwia2V5ZG93bi5heDZkaWFsb2dcIilcbiAgICAgICAgLm9mZihcInJlc2l6ZS5heDZkaWFsb2dcIik7XG5cbiAgICAgIHNldFRpbWVvdXQoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuJGFjdGl2ZURpYWxvZykge1xuICAgICAgICAgIHRoaXMuJGFjdGl2ZURpYWxvZy5yZW1vdmUoKTtcbiAgICAgICAgICB0aGlzLiRhY3RpdmVEaWFsb2cgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhhdCA9IHtcbiAgICAgICAgICBzZWxmOiB0aGlzLFxuICAgICAgICAgIHN0YXRlOiBcImNsb3NlXCIsXG4gICAgICAgICAgZGlhbG9nSWQ6IG9wdHMuaWRcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoX29wdGlvbiAmJiBVLmlzRnVuY3Rpb24oX29wdGlvbi5jYWxsYmFjaykpIHtcbiAgICAgICAgICBfb3B0aW9uLmNhbGxiYWNrLmNhbGwodGhhdCwgdGhhdCk7XG4gICAgICAgIH0gZWxzZSBpZiAob3B0cy5jYWxsYmFjayAmJiAoIV9vcHRpb24gfHwgIV9vcHRpb24uZG9Ob3RDYWxsYmFjaykpIHtcbiAgICAgICAgICBvcHRzLmNhbGxiYWNrLmNhbGwodGhhdCwgdGhhdCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0cyAmJiBvcHRzLm9uU3RhdGVDaGFuZ2VkKSB7XG4gICAgICAgICAgb3B0cy5vblN0YXRlQ2hhbmdlZC5jYWxsKHRoYXQsIHRoYXQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMub25TdGF0ZUNoYW5nZWQpIHtcbiAgICAgICAgICB0aGlzLm9uU3RhdGVDaGFuZ2VkLmNhbGwodGhhdCwgdGhhdCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDsl7TroKTslbwg7ZWgIO2BkOqwgCDrgqjslYQg7J6I64uk66m0IO2BkOyVhOydtO2FnOycvOuhnCDri6Tsi5wgb3BlblxuICAgICAgICBpZiAodGhpcy5xdWV1ZSAmJiB0aGlzLnF1ZXVlLmxlbmd0aCkge1xuICAgICAgICAgIG9wZW4uY2FsbCh0aGlzLCB0aGlzLnF1ZXVlLnNoaWZ0KCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgb3B0cyA9IG51bGw7XG4gICAgICAgIHRoYXQgPSBudWxsO1xuICAgICAgfSkuYmluZCh0aGlzKSwgdGhpcy5jb25maWcuYW5pbWF0ZVRpbWUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBWDZVSURpYWxvZztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vc3JjL0FYNlVJRGlhbG9nLmpzIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3N0eWxlLnNjc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge31cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGUuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGUuc2Nzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vc3JjL0FYNlVJRGlhbG9nL3N0eWxlLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDc2XG4vLyBtb2R1bGUgY2h1bmtzID0gMSAxMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh1bmRlZmluZWQpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiQC13ZWJraXQta2V5ZnJhbWVzIGF4LWRpYWxvZyB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDAuMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlWCgxKTsgfVxcbiAgMC4xJSB7XFxuICAgIG9wYWNpdHk6IDAuMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlWCgxLjMpOyB9XFxuICAxMDAlIHtcXG4gICAgb3BhY2l0eTogMS4wO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGVYKDEpOyB9IH1cXG5cXG5ALW1vei1rZXlmcmFtZXMgYXgtZGlhbG9nIHtcXG4gIDAlIHtcXG4gICAgb3BhY2l0eTogMC4wO1xcbiAgICAtbW96LXRyYW5zZm9ybTogc2NhbGVYKDEpOyB9XFxuICAwLjElIHtcXG4gICAgb3BhY2l0eTogMC4wO1xcbiAgICAtbW96LXRyYW5zZm9ybTogc2NhbGVYKDEuMyk7IH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAxLjA7XFxuICAgIC1tb3otdHJhbnNmb3JtOiBzY2FsZVgoMSk7IH0gfVxcblxcbkBrZXlmcmFtZXMgYXgtZGlhbG9nIHtcXG4gIDAlIHtcXG4gICAgb3BhY2l0eTogMC4wO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGVYKDEpO1xcbiAgICAtbW96LXRyYW5zZm9ybTogc2NhbGVYKDEpO1xcbiAgICAtbXMtdHJhbnNmb3JtOiBzY2FsZVgoMSk7XFxuICAgIC1vLXRyYW5zZm9ybTogc2NhbGVYKDEpO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlWCgxKTsgfVxcbiAgMC4xJSB7XFxuICAgIG9wYWNpdHk6IDAuMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlWCgxLjMpO1xcbiAgICAtbW96LXRyYW5zZm9ybTogc2NhbGVYKDEuMyk7XFxuICAgIC1tcy10cmFuc2Zvcm06IHNjYWxlWCgxLjMpO1xcbiAgICAtby10cmFuc2Zvcm06IHNjYWxlWCgxLjMpO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlWCgxLjMpOyB9XFxuICAxMDAlIHtcXG4gICAgb3BhY2l0eTogMS4wO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGVYKDEpO1xcbiAgICAtbW96LXRyYW5zZm9ybTogc2NhbGVYKDEpO1xcbiAgICAtbXMtdHJhbnNmb3JtOiBzY2FsZVgoMSk7XFxuICAgIC1vLXRyYW5zZm9ybTogc2NhbGVYKDEpO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlWCgxKTsgfSB9XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIGF4LWRpYWxvZy1kZXN0cm95IHtcXG4gIGZyb20ge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDApO1xcbiAgICBvcGFjaXR5OiAxLjA7IH1cXG4gIHRvIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCA1MCUpO1xcbiAgICBvcGFjaXR5OiAwLjA7IH0gfVxcblxcbkAtbW96LWtleWZyYW1lcyBheC1kaWFsb2ctZGVzdHJveSB7XFxuICBmcm9tIHtcXG4gICAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAwKTtcXG4gICAgb3BhY2l0eTogMS4wOyB9XFxuICB0byB7XFxuICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgNTAlKTtcXG4gICAgb3BhY2l0eTogMC4wOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIGF4LWRpYWxvZy1kZXN0cm95IHtcXG4gIGZyb20ge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDApO1xcbiAgICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDApO1xcbiAgICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCk7XFxuICAgIC1vLXRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDApO1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAwKTtcXG4gICAgb3BhY2l0eTogMS4wOyB9XFxuICB0byB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgNTAlKTtcXG4gICAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCA1MCUpO1xcbiAgICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgNTAlKTtcXG4gICAgLW8tdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgNTAlKTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgNTAlKTtcXG4gICAgb3BhY2l0eTogMC4wOyB9IH1cXG5cXG5bZGF0YS1heDZ1aS1kaWFsb2ddIHtcXG4gIC13ZWJraXQtYW5pbWF0aW9uOiBheC1kaWFsb2cgMC4xNXMgY3ViaWMtYmV6aWVyKDAuMTc1LCAwLjg4NSwgMC4zMiwgMS4yNzUpO1xcbiAgLW1vei1hbmltYXRpb246IGF4LWRpYWxvZyAwLjE1cyBjdWJpYy1iZXppZXIoMC4xNzUsIDAuODg1LCAwLjMyLCAxLjI3NSk7XFxuICBhbmltYXRpb246IGF4LWRpYWxvZyAwLjE1cyBjdWJpYy1iZXppZXIoMC4xNzUsIDAuODg1LCAwLjMyLCAxLjI3NSk7XFxuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWigwKTtcXG4gIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDApO1xcbiAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWigwKTtcXG4gIC1vLXRyYW5zZm9ybTogdHJhbnNsYXRlWigwKTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWigwKTtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gIGJveC1zaGFkb3c6IDBweCAwcHggM3B4IDBweCByZ2JhKDAsIDAsIDAsIDAuMTc1KTtcXG4gIHotaW5kZXg6IDIwMDA7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICBsZWZ0OiAwO1xcbiAgdG9wOiAwO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7IH1cXG4gIFtkYXRhLWF4NnVpLWRpYWxvZ10gLmF4LWRpYWxvZy1oZWFkZXIge1xcbiAgICBmb250LXdlaWdodDogNjAwO1xcbiAgICBwYWRkaW5nOiAxMHB4IDE1cHg7XFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB0cmFuc3BhcmVudDsgfVxcbiAgICBbZGF0YS1heDZ1aS1kaWFsb2ddIC5heC1kaWFsb2ctaGVhZGVyIC5iYWRnZSB7XFxuICAgICAgZm9udC1zaXplOiAwLjhlbTtcXG4gICAgICBjb2xvcjogI2Y1ZjVmNTtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzMzOyB9XFxuICBbZGF0YS1heDZ1aS1kaWFsb2ddIC5heC1kaWFsb2ctYm9keSB7XFxuICAgIHBhZGRpbmc6IDE1cHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjsgfVxcbiAgICBbZGF0YS1heDZ1aS1kaWFsb2ddIC5heC1kaWFsb2ctYm9keSAuYXgtZGlhbG9nLW1zZyB7XFxuICAgICAgcGFkZGluZy10b3A6IDE1cHg7XFxuICAgICAgcGFkZGluZy1ib3R0b206IDE1cHg7IH1cXG4gICAgW2RhdGEtYXg2dWktZGlhbG9nXSAuYXgtZGlhbG9nLWJvZHkgLmF4LWRpYWxvZy1wcm9tcHQge1xcbiAgICAgIHRleHQtYWxpZ246IGxlZnQ7XFxuICAgICAgcGFkZGluZy1ib3R0b206IDcuNXB4OyB9XFxuICAgIFtkYXRhLWF4NnVpLWRpYWxvZ10gLmF4LWRpYWxvZy1ib2R5IC5heC1kaWFsb2ctYnV0dG9ucyB7XFxuICAgICAgbWFyZ2luLXRvcDogMTVweDsgfVxcbiAgICAgIFtkYXRhLWF4NnVpLWRpYWxvZ10gLmF4LWRpYWxvZy1ib2R5IC5heC1kaWFsb2ctYnV0dG9ucyBidXR0b246bm90KDpsYXN0LWNoaWxkKSB7XFxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDNweDsgfVxcbiAgICBbZGF0YS1heDZ1aS1kaWFsb2ddIC5heC1kaWFsb2ctYm9keSBbZGF0YS1kaWFsb2ctZWxzPVxcXCJhZGRpdGlvbmFsLWNvbnRlbnRcXFwiXSB7XFxuICAgICAgbWFyZ2luLXRvcDogMTVweDsgfVxcbiAgW2RhdGEtYXg2dWktZGlhbG9nXSAuYXgtZGlhbG9nLWhlYWRlciB7XFxuICAgIGNvbG9yOiAjMzMzO1xcbiAgICBiYWNrZ3JvdW5kOiAjZjVmNWY1OyB9XFxuICAgIFtkYXRhLWF4NnVpLWRpYWxvZ10gLmF4LWRpYWxvZy1oZWFkZXIgLmJhZGdlIHtcXG4gICAgICBjb2xvcjogI2Y1ZjVmNTtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzMzOyB9XFxuICBbZGF0YS1heDZ1aS1kaWFsb2ddLmRlc3Ryb3kge1xcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogYXgtZGlhbG9nLWRlc3Ryb3kgMC4xNXMgY3ViaWMtYmV6aWVyKDAuNzU1LCAwLjA1LCAwLjg1NSwgMC4wNikgZm9yd2FyZHM7XFxuICAgIC1tb3otYW5pbWF0aW9uOiBheC1kaWFsb2ctZGVzdHJveSAwLjE1cyBjdWJpYy1iZXppZXIoMC43NTUsIDAuMDUsIDAuODU1LCAwLjA2KSBmb3J3YXJkcztcXG4gICAgYW5pbWF0aW9uOiBheC1kaWFsb2ctZGVzdHJveSAwLjE1cyBjdWJpYy1iZXppZXIoMC43NTUsIDAuMDUsIDAuODU1LCAwLjA2KSBmb3J3YXJkczsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIhLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi9zcmMvQVg2VUlEaWFsb2cvc3R5bGUuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNzdcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDEwIiwiaW1wb3J0IGpRdWVyeSBmcm9tIFwianFtaW5cIjtcbmltcG9ydCBBWDZVSUNvcmUgZnJvbSBcIi4vQVg2VUlDb3JlLmpzXCI7XG5pbXBvcnQgVSBmcm9tIFwiLi9BWDZVdGlsXCI7XG5pbXBvcnQgaW5mbyBmcm9tIFwiLi9BWDZJbmZvXCI7XG5pbXBvcnQgbXVzdGFjaGUgZnJvbSBcIi4vQVg2TXVzdGFjaGVcIjtcbi8qIH5+fn5+fn5+fn5+fn5+fn5+fiBlbmQgb2YgaW1wb3J0ICB+fn5+fn5+fn5+fn5+fn5+fn5+fiAqL1xuXG5cbmxldCB0bXBsID0ge1xuICB1cGxvYWRQcm9ncmVzcyhjb2x1bW5LZXlzKSB7XG4gICAgcmV0dXJuIGBgO1xuICB9LFxuICBpbnB1dEZpbGUoY29sdW1uS2V5cykge1xuICAgIHJldHVybiBgPGlucHV0IHR5cGU9XCJmaWxlXCIgZGF0YS1heDZ1aS11cGxvYWRlci1pbnB1dD1cInt7aW5zdGFuY2VJZH19XCIgbmFtZT1cInt7bmFtZX19XCIge3sjbXVsdGlwbGV9fW11bHRpcGxle3svbXVsdGlwbGV9fSBhY2NlcHQ9XCJ7e2FjY2VwdH19XCIgLz5gO1xuICB9LFxuICBpbnB1dEZpbGVGb3JtKGNvbHVtbktleXMpIHtcbiAgICByZXR1cm4gYDxmb3JtIGRhdGEtYXg2dWktdXBsb2FkZXItZm9ybT1cInt7aW5zdGFuY2VJZH19XCIgbmFtZT1cImF4NXVwbG9hZGVyLXt7aW5zdGFuY2VJZH19LWZvcm1cIiBtZXRob2Q9XCJwb3N0XCIgZW5jdHlwZT1cIm11bHRpcGFydC9mb3JtLWRhdGFcIj48L2Zvcm0+YDtcbiAgfSxcbiAgcHJvZ3Jlc3NCb3goY29sdW1uS2V5cykge1xuICAgIHJldHVybiBgXG48ZGl2IGRhdGEtYXg2dWktdXBsb2FkZXItcHJvZ3Jlc3Nib3g9XCJ7e2luc3RhbmNlSWR9fVwiIGNsYXNzPVwie3t0aGVtZX19XCI+XG4gICAgPGRpdiBjbGFzcz1cImF4LXByb2dyZXNzYm94LWJvZHlcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImF4LXByZWdyZXNzYm94LWNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9ncmVzc1wiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZ3Jlc3MtYmFyIHByb2dyZXNzLWJhci1zdHJpcGVkIGFjdGl2ZVwiIHJvbGU9XCJwcm9ncmVzc2JhclwiIHN0eWxlPVwid2lkdGg6IDBcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNyLW9ubHlcIiByb2xlPVwicHJvZ3Jlc3NiYXJ2YWxcIj4wJSBDb21wbGV0ZTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHt7I2J0bnN9fVxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImF4LXByb2dyZXNzYm94LWJ1dHRvbnNcIj5cbiAgICAgICAgICAgIHt7I2J0bnN9fVxuICAgICAgICAgICAgICAgIHt7I0BlYWNofX1cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtcHJlZ3Jlc3Nib3gtYnRuPVwie3tAa2V5fX1cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCB7e0B2YWx1ZS50aGVtZX19XCI+e3tAdmFsdWUubGFiZWx9fTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIHt7L0BlYWNofX1cbiAgICAgICAgICAgIHt7L2J0bnN9fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIHt7L2J0bnN9fVxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJheC1wcm9ncmVzc2JveC1hcnJvd1wiPjwvZGl2PlxuPC9kaXY+XG5gO1xuICB9LFxuICB1cG9hZGVkQm94KGNvbHVtbktleXMpIHtcbiAgICByZXR1cm4gYFxue3sjdXBsb2FkZWRGaWxlc319PGRpdiBkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWl0ZW09XCJ7e0BpfX1cIj5cbiAgICA8ZGl2IGNsYXNzPVwidXBsb2FkZWQtaXRlbS1wcmV2aWV3XCI+XG4gICAgICAgIHt7IyR7Y29sdW1uS2V5cy50aHVtYm5haWx9fX08aW1nIHNyYz1cIiR7Y29sdW1uS2V5cy5hcGlTZXJ2ZXJVcmx9e3ske2NvbHVtbktleXMudGh1bWJuYWlsfX19XCI+e3svJHtjb2x1bW5LZXlzLnRodW1ibmFpbH19fVxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJ1cGxvYWRlZC1pdGVtLWhvbGRlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidXBsb2FkZWQtaXRlbS1jZWxsXCIgZGF0YS11cGxvYWRlZC1pdGVtLWNlbGw9XCJkb3dubG9hZFwiPnt7e2ljb24uZG93bmxvYWR9fX08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInVwbG9hZGVkLWl0ZW0tY2VsbFwiIGRhdGEtdXBsb2FkZWQtaXRlbS1jZWxsPVwiZmlsZW5hbWVcIj57eyR7Y29sdW1uS2V5cy5uYW1lfX19PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ1cGxvYWRlZC1pdGVtLWNlbGxcIiBkYXRhLXVwbG9hZGVkLWl0ZW0tY2VsbD1cImZpbGVzaXplXCI+KHt7I0Bmbl9nZXRfYnl0ZX19e3ske2NvbHVtbktleXMuc2l6ZX19fXt7L0Bmbl9nZXRfYnl0ZX19KTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidXBsb2FkZWQtaXRlbS1jZWxsXCIgZGF0YS11cGxvYWRlZC1pdGVtLWNlbGw9XCJkZWxldGVcIj57e3tpY29uLmRlbGV0ZX19fTwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+e3svdXBsb2FkZWRGaWxlc319XG57e151cGxvYWRlZEZpbGVzfX1cbjxkaXYgZGF0YS1heDZ1aS11cGxvYWRlci1lbXB0eUxpc3QtbXNnPVwidHJ1ZVwiPlxuICB7eyNzdXBwb3J0RmlsZUFwaX19e3t7bGFuZy5zdXBwb3J0ZWRIVE1MNV9lbXB0eUxpc3RNc2d9fX17ey9zdXBwb3J0RmlsZUFwaX19XG4gIHt7XnN1cHBvcnRGaWxlQXBpfX17e3tsYW5nLmVtcHR5TGlzdE1zZ319fXt7L3N1cHBvcnRGaWxlQXBpfX1cbjwvZGl2Plxue3svdXBsb2FkZWRGaWxlc319XG5gO1xuICB9XG59O1xuXG5jb25zdCBvblN0YXRlQ2hhbmdlZCA9IGZ1bmN0aW9uICh0aGF0KSB7XG4gIGlmICh0aGlzLmNvbmZpZy5vblN0YXRlQ2hhbmdlZCkge1xuICAgIHRoaXMuY29uZmlnLm9uU3RhdGVDaGFuZ2VkLmNhbGwodGhhdCwgdGhhdCk7XG4gIH1cbiAgZWxzZSBpZiAodGhpcy5vblN0YXRlQ2hhbmdlZCkge1xuICAgIHRoaXMub25TdGF0ZUNoYW5nZWQuY2FsbCh0aGF0LCB0aGF0KTtcbiAgfVxuXG4gIHRoYXQgPSBudWxsO1xuICByZXR1cm4gdHJ1ZTtcbn07XG5jb25zdCBvblNlbGVjdEZpbGUgPSBmdW5jdGlvbiAoX2V2dCkge1xuICBsZXQgZmlsZXM7XG5cbiAgaWYgKCFpbmZvLnN1cHBvcnRGaWxlQXBpKSB7XG4gICAgLy8gZmlsZSBBUEkg7KeA7JuQIOyViOuQmOuKlCDruIzrnbzsmrDsoIAuXG4gICAgLy8gaW5wdXQgZmlsZeyXkCBtdWx0aXBsZSDsp4Dsm5Ag7JWI65CoIOq3uOufrOuvgOuhnCDri6jsnbwg7YyM7J28IOyymOumrOunjCDtlZjrqbQg65CoLlxuICAgIGZpbGVzID0ge3BhdGg6IF9ldnQudGFyZ2V0LnZhbHVlfTtcbiAgfVxuICBlbHNlIGlmICgnZGF0YVRyYW5zZmVyJyBpbiBfZXZ0KSB7XG4gICAgZmlsZXMgPSBfZXZ0LmRhdGFUcmFuc2Zlci5maWxlcztcbiAgfVxuICBlbHNlIGlmICgndGFyZ2V0JyBpbiBfZXZ0KSB7XG4gICAgZmlsZXMgPSBfZXZ0LnRhcmdldC5maWxlcztcbiAgfVxuICBlbHNlIGlmIChfZXZ0KSB7XG4gICAgZmlsZXMgPSBfZXZ0O1xuICB9XG5cbiAgaWYgKCFmaWxlcykgcmV0dXJuIGZhbHNlO1xuXG4gIC8vLyBzZWxlY3RlZEZpbGVz7JeQIO2YhOyerCDtjIzsnbwg7KCV67O0IOuLtOyVhOuRkOq4sFxuICBpZiAobGVuZ3RoIGluIGZpbGVzKSB7XG4gICAgaWYgKGZpbGVzLmxlbmd0aCA9PSAxKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkRmlsZXMgPSBbZmlsZXNbMF1dO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbGVjdGVkRmlsZXMgPSBVLnRvQXJyYXkoZmlsZXMpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aGlzLnNlbGVjdGVkRmlsZXMgPSBbZmlsZXNdO1xuICB9XG5cbiAgaWYgKHRoaXMuY29uZmlnLnByb2dyZXNzQm94KSB7XG4gICAgb3BlblByb2dyZXNzQm94LmNhbGwodGhpcyk7XG4gIH1cbiAgaWYgKCF0aGlzLmNvbmZpZy5tYW51YWxVcGxvYWQpIHtcbiAgICB0aGlzLnNlbmQoKTtcbiAgfVxuXG4gIGlmICghaW5mby5zdXBwb3J0RmlsZUFwaSkge1xuICAgIGFsaWduTGF5b3V0LmNhbGwodGhpcywgZmFsc2UpO1xuICB9XG59O1xuY29uc3QgYmluZEV2ZW50ID0gZnVuY3Rpb24gKCkge1xuXG4gIHRoaXMuJGZpbGVTZWxlY3RvclxuICAgIC5vZmYoXCJjbGljay5heDV1cGxvYWRlclwiKVxuICAgIC5vbihcImNsaWNrLmF4NXVwbG9hZGVyXCIsIGUgPT4ge1xuICAgICAgdGhpcy4kaW5wdXRGaWxlLnRyaWdnZXIoXCJjbGlja1wiKTtcbiAgICB9KTtcblxuICBpZiAoIWluZm8uc3VwcG9ydEZpbGVBcGkpIHtcbiAgICB0aGlzLiRmaWxlU2VsZWN0b3JcbiAgICAgIC5vZmYoXCJtb3VzZW92ZXIuYXg1dXBsb2FkZXJcIilcbiAgICAgIC5vbihcIm1vdXNlb3Zlci5heDV1cGxvYWRlclwiLCBlID0+IHtcbiAgICAgICAgYWxpZ25MYXlvdXQuY2FsbCh0aGlzLCB0cnVlKTtcbiAgICAgIH0pO1xuXG4gICAgdGhpcy4kaW5wdXRGaWxlXG4gICAgICAub2ZmKFwibW91c2VvdmVyLmF4NXVwbG9hZGVyXCIpXG4gICAgICAub24oXCJtb3VzZW92ZXIuYXg1dXBsb2FkZXJcIiwgZSA9PiB7XG4gICAgICAgIHRoaXMuJGZpbGVTZWxlY3Rvci5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgIH0pO1xuXG4gICAgdGhpcy4kaW5wdXRGaWxlXG4gICAgICAub2ZmKFwibW91c2VvdXQuYXg1dXBsb2FkZXJcIilcbiAgICAgIC5vbihcIm1vdXNlb3V0LmF4NXVwbG9hZGVyXCIsIGUgPT4ge1xuICAgICAgICB0aGlzLiRmaWxlU2VsZWN0b3IucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICAgIGFsaWduTGF5b3V0LmNhbGwodGhpcywgZmFsc2UpO1xuICAgICAgfSk7XG4gIH1cblxuICB7XG4gICAgaWYgKCF0aGlzLiR1cGxvYWRlZEJveCB8fCAhdGhpcy4kdXBsb2FkZWRCb3guZ2V0KDApKSByZXR1cm4gZmFsc2U7XG5cbiAgICB0aGlzLiR1cGxvYWRlZEJveC5vbihcImNsaWNrXCIsIFwiW2RhdGEtdXBsb2FkZWQtaXRlbS1jZWxsXVwiLCBlID0+IHtcbiAgICAgIGxldCAkdGhpcyA9IGpRdWVyeShlLmN1cnJlbnRUYXJnZXQpLFxuICAgICAgICBjZWxsVHlwZSA9ICR0aGlzLmF0dHIoXCJkYXRhLXVwbG9hZGVkLWl0ZW0tY2VsbFwiKSxcbiAgICAgICAgdXBsb2FkZWRJdGVtSW5kZXggPSBOdW1iZXIoJHRoaXMucGFyZW50cygnW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtaXRlbV0nKS5hdHRyKCdkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWl0ZW0nKSksXG4gICAgICAgIHRoYXQgPSB7fTtcblxuICAgICAgaWYgKHRoaXMuY29uZmlnLnVwbG9hZGVkQm94ICYmIHRoaXMuY29uZmlnLnVwbG9hZGVkQm94Lm9uY2xpY2spIHtcbiAgICAgICAgdGhhdCA9IHtcbiAgICAgICAgICBzZWxmOiB0aGlzLFxuICAgICAgICAgIGNlbGxUeXBlOiBjZWxsVHlwZSxcbiAgICAgICAgICB1cGxvYWRlZEZpbGVzOiB0aGlzLnVwbG9hZGVkRmlsZXMsXG4gICAgICAgICAgZmlsZUluZGV4OiB1cGxvYWRlZEl0ZW1JbmRleFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNvbmZpZy51cGxvYWRlZEJveC5vbmNsaWNrLmNhbGwodGhhdCwgdGhhdCk7XG4gICAgICB9XG5cbiAgICAgICR0aGlzID0gbnVsbDtcbiAgICAgIGNlbGxUeXBlID0gbnVsbDtcbiAgICAgIHVwbG9hZGVkSXRlbUluZGV4ID0gbnVsbDtcbiAgICAgIHRoYXQgPSBudWxsO1xuICAgIH0pO1xuXG4gICAgdGhpcy4kdXBsb2FkZWRCb3hcbiAgICAgIC5vbihcImRyYWdzdGFydFwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBVLnN0b3BFdmVudChlKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gIH1cblxuICB7XG4gICAgLy8gZHJvcFpvbmUg7ISk7KCVIOuwqeyLnSDrs4Dqsr1cbiAgICBpZiAoIWluZm8uc3VwcG9ydEZpbGVBcGkpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIXRoaXMuJGRyb3Bab25lIHx8ICF0aGlzLiRkcm9wWm9uZS5nZXQoMCkpIHJldHVybiBmYWxzZTtcblxuICAgIGxldCB0aW1lcjtcblxuICAgIHRoaXMuJGRyb3Bab25lLnBhcmVudCgpXG4gICAgICAub24oXCJjbGlja1wiLCBcIltkYXRhLWF4NnVpLXVwbG9hZGVyLWRyb3B6b25lXVwiLCBlID0+IHtcbiAgICAgICAgbGV0ICR0YXJnZXQgPSBqUXVlcnkoZS5jdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgaWYgKCR0YXJnZXQucGFyZW50cygnW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtaXRlbV0nKS5sZW5ndGggPT0gMCAmJiAhJHRhcmdldC5hdHRyKCdkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWl0ZW0nKSkge1xuICAgICAgICAgIC8vY29uc29sZS5sb2coZS5jdXJyZW50VGFyZ2V0ID09IGUudGFyZ2V0LCAkLmNvbnRhaW5zKGUudGFyZ2V0LCBlLmN1cnJlbnRUYXJnZXQpLCBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYXg2dWktdXBsb2FkZXItZW1wdHlsaXN0LW1zZycpKTtcbiAgICAgICAgICBpZiAoZS5jdXJyZW50VGFyZ2V0ID09IGUudGFyZ2V0IHx8ICQuY29udGFpbnMoZS50YXJnZXQsIGUuY3VycmVudFRhcmdldCkgfHwgZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWF4NnVpLXVwbG9hZGVyLWVtcHR5bGlzdC1tc2cnKSkge1xuICAgICAgICAgICAgaWYgKFUuaXNGdW5jdGlvbih0aGlzLmNvbmZpZy5kcm9wWm9uZS5vbmNsaWNrKSkge1xuICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5kcm9wWm9uZS5vbmNsaWNrLmNhbGwoe1xuICAgICAgICAgICAgICAgIHNlbGY6IHRoaXNcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLiRpbnB1dEZpbGUudHJpZ2dlcihcImNsaWNrXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAkdGFyZ2V0ID0gbnVsbDtcbiAgICAgIH0pO1xuXG4gICAgdGhpcy4kZHJvcFpvbmUuZ2V0KDApLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgZSA9PiB7XG4gICAgICBVLnN0b3BFdmVudChlKTtcblxuICAgICAgaWYgKFUuaXNGdW5jdGlvbih0aGlzLmNvbmZpZy5kcm9wWm9uZS5vbmRyYWdvdmVyKSkge1xuICAgICAgICB0aGlzLmNvbmZpZy5kcm9wWm9uZS5vbmRyYWdvdmVyLmNhbGwoe1xuICAgICAgICAgIHNlbGY6IHRoaXNcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhpcy4kZHJvcFpvbmUuYWRkQ2xhc3MoXCJkcmFnb3ZlclwiKTtcbiAgICAgIH1cblxuICAgIH0sIGZhbHNlKTtcblxuICAgIHRoaXMuJGRyb3Bab25lLmdldCgwKS5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCBlID0+IHtcbiAgICAgIFUuc3RvcEV2ZW50KGUpO1xuXG4gICAgICBpZiAoVS5pc0Z1bmN0aW9uKHRoaXMuY29uZmlnLmRyb3Bab25lLm9uZHJhZ292ZXIpKSB7XG4gICAgICAgIHRoaXMuY29uZmlnLmRyb3Bab25lLm9uZHJhZ291dC5jYWxsKHtcbiAgICAgICAgICBzZWxmOiB0aGlzXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMuJGRyb3Bab25lLnJlbW92ZUNsYXNzKFwiZHJhZ292ZXJcIik7XG4gICAgICB9XG5cbiAgICB9LCBmYWxzZSk7XG5cbiAgICB0aGlzLiRkcm9wWm9uZS5nZXQoMCkuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIGUgPT4ge1xuICAgICAgVS5zdG9wRXZlbnQoZSk7XG5cbiAgICAgIGlmIChVLmlzRnVuY3Rpb24odGhpcy5jb25maWcuZHJvcFpvbmUub25kcm9wKSkge1xuICAgICAgICB0aGlzLmNvbmZpZy5kcm9wWm9uZS5vbmRyb3AuY2FsbCh7XG4gICAgICAgICAgc2VsZjogdGhpc1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aGlzLiRkcm9wWm9uZS5yZW1vdmVDbGFzcyhcImRyYWdvdmVyXCIpO1xuICAgICAgfVxuXG4gICAgICBvblNlbGVjdEZpbGUuY2FsbCh0aGlzLCBlIHx8IHdpbmRvdy5ldmVudCk7XG4gICAgfSwgZmFsc2UpO1xuXG4gIH1cbn07XG5jb25zdCBhbGlnbkxheW91dCA9IGZ1bmN0aW9uIChfVEYpIHtcbiAgLy8g7IOB7Zmp7J20IOyii+yngCDslYrsnYDqsr3smrAgKOunjOyVvSDrsoTtirwg7YG066at7Jy866GcIGlucHV0IGZpbGUgY2xpY2vsnbQg65CY7KeAIOyViuuKlCDri6TrqbQgei1pbmRleOqwkuydhCDrhpLsl6zshJwg67KE7Yq87JyE66W8IOuNruuKlOuLpC4pXG4gIGlmIChfVEYpIHtcbiAgICBpZiAoIWluZm8uc3VwcG9ydEZpbGVBcGkpIHtcbiAgICAgIC8vIGllOeyXkOyEnCBpbnB1dEZpbGXsnYQg7KeB7KCRIO2BtOumre2VmOyngCDslYrsnLzrqbQgc3VibWl0IOyYpOulmOuwnOyDne2VqC4gc3VibWl0IGFjY2VzcyBkZW5pZWRcbiAgICAgIC8vIOq3uOuemOyEnCDrsoTtirzsnITsl5AgaW5wdXRGaWxl7J2EIOyYrOugpOuRkOyWtOyVvCDtlaguIChwb3NpdGlvbuqwkuydhCDsnbTsmqntlZjrqbQg7Y647ZWY7KeA66eMLi4pXG4gICAgICAvLyDqt7jrn7DrjbAgZm9ybeydhCDslYjsl5DrkZDrqbQg65iQIOuLpOuluCDsnbTspJHtj7wg66y47KCcIOuwnOyDneyGjOyngCDjhZzjhZwg67aI6rCA7ZS87ZWY6rKMIOuyhO2KvOydmCBvZmZzZXQg6rCS7J2EIOydtOyaqS5cbiAgICAgIGxldCBib3ggPSB0aGlzLiRmaWxlU2VsZWN0b3Iub2Zmc2V0KCk7XG4gICAgICBib3gud2lkdGggPSB0aGlzLiRmaWxlU2VsZWN0b3Iub3V0ZXJXaWR0aCgpO1xuICAgICAgYm94LmhlaWdodCA9IHRoaXMuJGZpbGVTZWxlY3Rvci5vdXRlckhlaWdodCgpO1xuICAgICAgdGhpcy4kaW5wdXRGaWxlLmNzcyhib3gpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aGlzLiRpbnB1dEZpbGUuY3NzKHtcbiAgICAgIGxlZnQ6IC0xMDAwLCB0b3A6IC0xMDAwXG4gICAgfSk7XG4gIH1cbn1cbmNvbnN0IGFsaWduUHJvZ3Jlc3NCb3ggPSBmdW5jdGlvbiAoYXBwZW5kKSB7XG4gIGNvbnN0IF9hbGlnblByb2dyZXNzQm94ID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCAkd2luZG93ID0galF1ZXJ5KHdpbmRvdyksICRib2R5ID0galF1ZXJ5KGRvY3VtZW50LmJvZHkpO1xuICAgIGxldCBwb3MgPSB7fSwgcG9zaXRpb25NYXJnaW4gPSA2LFxuICAgICAgZGltID0ge30sIHBpY2tlckRpbSA9IHt9LFxuICAgICAgcGlja2VyRGlyZWN0aW9uO1xuXG4gICAgLy8gdGhpcy5jb25maWcudmlld3BvcnQuc2VsZWN0b3JcblxuICAgIHBvcyA9ICh0aGlzLiRwcm9ncmVzc0JveC5wYXJlbnQoKS5nZXQoMCkgPT0gdGhpcy4kdGFyZ2V0LmdldCgwKSkgPyB0aGlzLiRmaWxlU2VsZWN0b3IucG9zaXRpb24oKSA6IHRoaXMuJGZpbGVTZWxlY3Rvci5vZmZzZXQoKTtcbiAgICBkaW0gPSB7XG4gICAgICB3aWR0aDogdGhpcy4kZmlsZVNlbGVjdG9yLm91dGVyV2lkdGgoKSxcbiAgICAgIGhlaWdodDogdGhpcy4kZmlsZVNlbGVjdG9yLm91dGVySGVpZ2h0KClcbiAgICB9O1xuICAgIHBpY2tlckRpbSA9IHtcbiAgICAgIHdpbldpZHRoOiBNYXRoLm1heCgkd2luZG93LndpZHRoKCksICRib2R5LndpZHRoKCkpLFxuICAgICAgd2luSGVpZ2h0OiBNYXRoLm1heCgkd2luZG93LmhlaWdodCgpLCAkYm9keS5oZWlnaHQoKSksXG4gICAgICB3aWR0aDogdGhpcy4kcHJvZ3Jlc3NCb3gub3V0ZXJXaWR0aCgpLFxuICAgICAgaGVpZ2h0OiB0aGlzLiRwcm9ncmVzc0JveC5vdXRlckhlaWdodCgpXG4gICAgfTtcblxuICAgIC8vIHBpY2tlciBjc3Mod2lkdGgsIGxlZnQsIHRvcCkgJiBkaXJlY3Rpb24g6rKw7KCVXG4gICAgaWYgKCF0aGlzLmNvbmZpZy5wcm9ncmVzc0JveERpcmVjdGlvbiB8fCB0aGlzLmNvbmZpZy5wcm9ncmVzc0JveERpcmVjdGlvbiA9PT0gXCJcIiB8fCB0aGlzLmNvbmZpZy5wcm9ncmVzc0JveERpcmVjdGlvbiA9PT0gXCJhdXRvXCIpIHtcbiAgICAgIC8vIHNldCBkaXJlY3Rpb25cbiAgICAgIHBpY2tlckRpcmVjdGlvbiA9IFwidG9wXCI7XG4gICAgICBpZiAocG9zLnRvcCAtIHBpY2tlckRpbS5oZWlnaHQgLSBwb3NpdGlvbk1hcmdpbiA8IDApIHtcbiAgICAgICAgcGlja2VyRGlyZWN0aW9uID0gXCJ0b3BcIjtcbiAgICAgIH0gZWxzZSBpZiAocG9zLnRvcCArIGRpbS5oZWlnaHQgKyBwaWNrZXJEaW0uaGVpZ2h0ICsgcG9zaXRpb25NYXJnaW4gPiBwaWNrZXJEaW0ud2luSGVpZ2h0KSB7XG4gICAgICAgIHBpY2tlckRpcmVjdGlvbiA9IFwiYm90dG9tXCI7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHBpY2tlckRpcmVjdGlvbiA9IHRoaXMuY29uZmlnLnByb2dyZXNzQm94RGlyZWN0aW9uO1xuICAgIH1cblxuICAgIGlmIChhcHBlbmQpIHtcbiAgICAgIHRoaXMuJHByb2dyZXNzQm94XG4gICAgICAgIC5hZGRDbGFzcyhcImRpcmVjdGlvbi1cIiArIHBpY2tlckRpcmVjdGlvbik7XG4gICAgfVxuXG4gICAgbGV0IHBvc2l0aW9uQ1NTID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBjc3MgPSB7bGVmdDogMCwgdG9wOiAwfTtcbiAgICAgIHN3aXRjaCAocGlja2VyRGlyZWN0aW9uKSB7XG4gICAgICAgIGNhc2UgXCJ0b3BcIjpcbiAgICAgICAgICBjc3MubGVmdCA9IHBvcy5sZWZ0ICsgZGltLndpZHRoIC8gMiAtIHBpY2tlckRpbS53aWR0aCAvIDI7XG4gICAgICAgICAgY3NzLnRvcCA9IHBvcy50b3AgKyBkaW0uaGVpZ2h0ICsgcG9zaXRpb25NYXJnaW47XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJib3R0b21cIjpcbiAgICAgICAgICBjc3MubGVmdCA9IHBvcy5sZWZ0ICsgZGltLndpZHRoIC8gMiAtIHBpY2tlckRpbS53aWR0aCAvIDI7XG4gICAgICAgICAgY3NzLnRvcCA9IHBvcy50b3AgLSBwaWNrZXJEaW0uaGVpZ2h0IC0gcG9zaXRpb25NYXJnaW47XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJsZWZ0XCI6XG4gICAgICAgICAgY3NzLmxlZnQgPSBwb3MubGVmdCArIGRpbS53aWR0aCArIHBvc2l0aW9uTWFyZ2luO1xuICAgICAgICAgIGNzcy50b3AgPSBwb3MudG9wIC0gcGlja2VyRGltLmhlaWdodCAvIDIgKyBkaW0uaGVpZ2h0IC8gMjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInJpZ2h0XCI6XG4gICAgICAgICAgY3NzLmxlZnQgPSBwb3MubGVmdCAtIHBpY2tlckRpbS53aWR0aCAtIHBvc2l0aW9uTWFyZ2luO1xuICAgICAgICAgIGNzcy50b3AgPSBwb3MudG9wIC0gcGlja2VyRGltLmhlaWdodCAvIDIgKyBkaW0uaGVpZ2h0IC8gMjtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHJldHVybiBjc3M7XG4gICAgfSkoKTtcblxuICAgIHtcbiAgICAgIGlmIChwaWNrZXJEaXJlY3Rpb24gPT0gXCJ0b3BcIiB8fCBwaWNrZXJEaXJlY3Rpb24gPT0gXCJib3R0b21cIikge1xuICAgICAgICBpZiAocG9zaXRpb25DU1MubGVmdCA8IDApIHtcbiAgICAgICAgICBwb3NpdGlvbkNTUy5sZWZ0ID0gcG9zaXRpb25NYXJnaW47XG4gICAgICAgICAgdGhpcy4kcHJvZ3Jlc3NCb3hBcnJvdy5jc3Moe2xlZnQ6IChwb3MubGVmdCArIGRpbS53aWR0aCAvIDIpIC0gcG9zaXRpb25DU1MubGVmdH0pO1xuICAgICAgICB9IGVsc2UgaWYgKHBvc2l0aW9uQ1NTLmxlZnQgKyBwaWNrZXJEaW0ud2lkdGggPiBwaWNrZXJEaW0ud2luV2lkdGgpIHtcbiAgICAgICAgICBwb3NpdGlvbkNTUy5sZWZ0ID0gcGlja2VyRGltLndpbldpZHRoIC0gcGlja2VyRGltLndpZHRoIC0gcG9zaXRpb25NYXJnaW47XG4gICAgICAgICAgdGhpcy4kcHJvZ3Jlc3NCb3hBcnJvdy5jc3Moe2xlZnQ6IChwb3MubGVmdCArIGRpbS53aWR0aCAvIDIpIC0gcG9zaXRpb25DU1MubGVmdH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy4kcHJvZ3Jlc3NCb3hcbiAgICAgIC5jc3MocG9zaXRpb25DU1MpO1xuICB9O1xuXG4gIHRoaXMuJHByb2dyZXNzQm94LmNzcyh7dG9wOiAtOTk5fSk7XG5cbiAgaWYgKGFwcGVuZCkge1xuICAgIC8vIHByb2dyZXNzQm9466W8IGFwcGVuZCDtlaAg7YOA6rKfIOyXmOumrOuovO2KuCDtjoDri6gg7ZuEIOqysOyglS5cbiAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHRoaXMuY29uZmlnLnZpZXdwb3J0KSB7XG4gICAgICAgIHJldHVybiBqUXVlcnkodGhpcy5jb25maWcudmlld3BvcnQuc2VsZWN0b3IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHRhcmdldDtcbiAgICAgIH1cbiAgICB9KS5jYWxsKHRoaXMpLmFwcGVuZCh0aGlzLiRwcm9ncmVzc0JveCk7XG5cbiAgICAvLyBwcm9ncmVzc0JveCDrsoTtirzsl5Ag7J2067Kk7Yq4IOyXsOqysC5cbiAgICB0aGlzLiRwcm9ncmVzc0JveFxuICAgICAgLm9mZihcImNsaWNrLmF4NXVwbG9hZGVyXCIpXG4gICAgICAub24oXCJjbGljay5heDV1cGxvYWRlclwiLCBcImJ1dHRvblwiLCBlID0+IHtcbiAgICAgICAgbGV0IGFjdCA9IGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXByZWdyZXNzYm94LWJ0blwiKTtcbiAgICAgICAgbGV0IHByb2Nlc3NvciA9IHtcbiAgICAgICAgICBcInVwbG9hZFwiOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnNlbmQoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiYWJvcnRcIjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5hYm9ydCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHByb2Nlc3NvclthY3RdKSBwcm9jZXNzb3JbYWN0XS5jYWxsKHRoaXMpO1xuICAgICAgfSk7XG4gIH1cblxuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBfYWxpZ25Qcm9ncmVzc0JveC5jYWxsKHRoaXMpO1xuICB9KTtcbn07XG5jb25zdCBvcGVuUHJvZ3Jlc3NCb3ggPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuJHByb2dyZXNzQm94LnJlbW92ZUNsYXNzKFwiZGVzdHJveVwiKTtcbiAgdGhpcy4kcHJvZ3Jlc3NVcGxvYWQucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpO1xuICB0aGlzLiRwcm9ncmVzc0Fib3J0LnJlbW92ZUF0dHIoXCJkaXNhYmxlZFwiKTtcblxuICAvLyBhcGVuZCAmIGFsaWduIHByb2dyZXNzIGJveFxuICBhbGlnblByb2dyZXNzQm94LmNhbGwodGhpcywgXCJhcHBlbmRcIik7XG5cbiAgLy8gc3RhdGUgY2hhbmdlXG4gIG9uU3RhdGVDaGFuZ2VkLmNhbGwodGhpcywge1xuICAgIHNlbGY6IHRoaXMsXG4gICAgc3RhdGU6IFwib3BlblwiXG4gIH0pO1xufTtcbmNvbnN0IGNsb3NlUHJvZ3Jlc3NCb3ggPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuJHByb2dyZXNzQm94LmFkZENsYXNzKFwiZGVzdHJveVwiKTtcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgdGhpcy4kcHJvZ3Jlc3NCb3hcbiAgICAgIC5yZW1vdmUoKTtcbiAgfSwgdGhpcy5jb25maWcuYW5pbWF0ZVRpbWUpO1xufTtcbmNvbnN0IHN0YXJ0VXBsb2FkID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCBwcm9jZXNzb3IgPSB7XG4gICAgXCJodG1sNVwiKCkge1xuICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICBsZXQgdXBsb2FkRmlsZSA9IHRoaXMuc2VsZWN0ZWRGaWxlcy5zaGlmdCgpO1xuICAgICAgaWYgKCF1cGxvYWRGaWxlKSB7XG4gICAgICAgIC8vIOyXheuhnOuTnCDsooXro4xcbiAgICAgICAgdXBsb2FkQ29tcGxldGUuY2FsbCh0aGlzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGlmICh1cGxvYWRGaWxlWzBdKSB1cGxvYWRGaWxlID0gdXBsb2FkRmlsZVswXTtcblxuICAgICAgbGV0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAvL+yEnOuyhOuhnCDsoITshqHtlbTslbwg7ZWgIOy2lOqwgCDtjIzrnbzrr7jthLAg7KCV67O0IOyEpOyglVxuXG4gICAgICB0aGlzLiR0YXJnZXQuZmluZChcImlucHV0XCIpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQodGhpcy5uYW1lLCB0aGlzLnZhbHVlKTtcbiAgICAgIH0pO1xuICAgICAgLy8g7YyM7J28IOyVhOydtO2FnCDstpTqsIBcbiAgICAgIGZvcm1EYXRhLmFwcGVuZCh0aGlzLmNvbmZpZy5mb3JtLmZpbGVOYW1lLCB1cGxvYWRGaWxlKTtcblxuICAgICAgdGhpcy54aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgIHRoaXMueGhyLm9wZW4oXCJwb3N0XCIsIHRoaXMuY29uZmlnLmZvcm0uYWN0aW9uLCB0cnVlKTtcbiAgICAgIHRoaXMueGhyLm9ubG9hZCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGxldCByZXMgPSBlLnRhcmdldC5yZXNwb25zZTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAodHlwZW9mIHJlcyA9PSBcInN0cmluZ1wiKSByZXMgPSBVLnBhcnNlSnNvbihyZXMpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWxmLmNvbmZpZy5kZWJ1ZykgY29uc29sZS5sb2cocmVzKTtcblxuICAgICAgICBpZiAocmVzLmVycm9yKSB7XG4gICAgICAgICAgaWYgKHNlbGYuY29uZmlnLmRlYnVnKSBjb25zb2xlLmxvZyhyZXMuZXJyb3IpO1xuICAgICAgICAgIGlmIChVLmlzRnVuY3Rpb24oc2VsZi5jb25maWcub251cGxvYWRlcnJvcikpIHtcbiAgICAgICAgICAgIHNlbGYuY29uZmlnLm9udXBsb2FkZXJyb3IuY2FsbCh7XG4gICAgICAgICAgICAgIHNlbGY6IHNlbGYsXG4gICAgICAgICAgICAgIGVycm9yOiByZXMuZXJyb3JcbiAgICAgICAgICAgIH0sIHJlcyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNlbGYuc2VuZCgpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHVwbG9hZGVkLmNhbGwoc2VsZiwgcmVzKTtcbiAgICAgICAgc2VsZi5zZW5kKCk7XG4gICAgICB9O1xuICAgICAgdGhpcy54aHIudXBsb2FkLm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICB1cGRhdGVQcm9ncmVzc0Jhci5jYWxsKHNlbGYsIGUpO1xuICAgICAgICBpZiAoVS5pc0Z1bmN0aW9uKHNlbGYuY29uZmlnLm9ucHJvZ3Jlc3MpKSB7XG4gICAgICAgICAgc2VsZi5jb25maWcub25wcm9ncmVzcy5jYWxsKHtcbiAgICAgICAgICAgIGxvYWRlZDogZS5sb2FkZWQsXG4gICAgICAgICAgICB0b3RhbDogZS50b3RhbFxuICAgICAgICAgIH0sIGUpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgdGhpcy54aHIuc2VuZChmb3JtRGF0YSk7ICAvLyBtdWx0aXBhcnQvZm9ybS1kYXRhXG5cbiAgICB9LFxuICAgIFwiZm9ybVwiKCkge1xuXG4gICAgICAvLy8gaSdtIGJ1c3lcbiAgICAgIHRoaXMuX191cGxvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAvLyDtj7zqs7wgaWZyYW1l7J2EIOunjOuTpOyWtCDtjpjsnbTsp4Ag7JWE656Y7JeQIOyCveyehSDtm4Qg7JeF66Gc65OcXG4gICAgICBsZXQgJGlmcmFtZSA9IGpRdWVyeSgnPGlmcmFtZSBzcmM9XCJqYXZhc2NyaXB0OmZhbHNlO1wiIG5hbWU9XCJheDV1cGxvYWRlci0nICsgdGhpcy5pbnN0YW5jZUlkICsgJy1pZnJhbWVcIiBzdHlsZT1cImRpc3BsYXk6bm9uZTtcIj48L2lmcmFtZT4nKTtcbiAgICAgIGpRdWVyeShkb2N1bWVudC5ib2R5KS5hcHBlbmQoJGlmcmFtZSk7XG5cbiAgICAgIC8vIG9ubG9hZCDsnbTrsqTtirgg7ZW465Ok65+sXG4gICAgICAvLyBhY3Rpb27sl5DshJwg7YyM7J287J2EIOuwm+yVhCDsspjrpqztlZwg6rKw6rO86rCS7J2EIO2FjeyKpO2KuOuhnCDstpzroKXtlZzri6Tqs6Ag6rCA7KCV7ZWY6rOgIGlmcmFtZeydmCDrgrTrtoAg642w7J207YSw66W8IOqysOqzvOqwkuycvOuhnCBjYWxsYmFjayDtmLjstpxcbiAgICAgICRpZnJhbWUub24oJ2xvYWQnLCBlID0+IHtcbiAgICAgICAgbGV0IGRvYyA9IGUuY3VycmVudFRhcmdldC5jb250ZW50V2luZG93ID8gZS5jdXJyZW50VGFyZ2V0LmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQgOiAoZS5jdXJyZW50VGFyZ2V0LmNvbnRlbnREb2N1bWVudCA/IGUuY3VycmVudFRhcmdldC5jb250ZW50RG9jdW1lbnQgOiBlLmN1cnJlbnRUYXJnZXQuZG9jdW1lbnQpLFxuICAgICAgICAgIHJvb3QgPSBkb2MuZG9jdW1lbnRFbGVtZW50ID8gZG9jLmRvY3VtZW50RWxlbWVudCA6IGRvYy5ib2R5LFxuICAgICAgICAgIHJlc3VsdCA9IHJvb3QudGV4dENvbnRlbnQgPyByb290LnRleHRDb250ZW50IDogcm9vdC5pbm5lclRleHQsXG4gICAgICAgICAgcmVzO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmVzID0gSlNPTi5wYXJzZShyZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgcmVzID0ge1xuICAgICAgICAgICAgZXJyb3I6IFwiU3ludGF4IGVycm9yXCIsXG4gICAgICAgICAgICBib2R5OiByZXN1bHRcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmRlYnVnKSBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICBpZiAocmVzLmVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB1cGxvYWRlZC5jYWxsKHRoaXMsIHJlcyk7XG4gICAgICAgICAgJGlmcmFtZS5yZW1vdmUoKTtcblxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdXBsb2FkQ29tcGxldGUuY2FsbCh0aGlzKTtcbiAgICAgICAgICB9LCAzMDApO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdGhpcy4kaW5wdXRGaWxlRm9ybVxuICAgICAgICAuYXR0cihcInRhcmdldFwiLCAnYXg1dXBsb2FkZXItJyArIHRoaXMuaW5zdGFuY2VJZCArICctaWZyYW1lJylcbiAgICAgICAgLmF0dHIoXCJhY3Rpb25cIiwgdGhpcy5jb25maWcuZm9ybS5hY3Rpb24pXG4gICAgICAgIC5zdWJtaXQoKTtcblxuICAgICAgdGhpcy5zZWxlY3RlZEZpbGVzVG90YWwgPSAxO1xuICAgICAgdXBkYXRlUHJvZ3Jlc3NCYXIuY2FsbCh0aGlzLCB7XG4gICAgICAgIGxvYWRlZDogMSxcbiAgICAgICAgdG90YWw6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBpZiAodGhpcy5fX3VwbG9hZGluZyA9PT0gZmFsc2UpIHtcbiAgICAvLyDsoITssrQg7YyM7J28IOyCrOydtOymiCDqtaztlZjquLBcbiAgICBsZXQgZmlsZXNUb3RhbCA9IDA7XG4gICAgdGhpcy5zZWxlY3RlZEZpbGVzLmZvckVhY2goZnVuY3Rpb24gKG4pIHtcbiAgICAgIGZpbGVzVG90YWwgKz0gbi5zaXplO1xuICAgIH0pO1xuICAgIHRoaXMuc2VsZWN0ZWRGaWxlc1RvdGFsID0gZmlsZXNUb3RhbDtcbiAgICB0aGlzLl9fbG9hZGVkID0gMDtcblxuICAgIHRoaXMuX191cGxvYWRpbmcgPSB0cnVlOyAvLyDsl4XroZzrk5wg7Iuc7J6RIOyDge2DnCDsspjrpqxcbiAgICB0aGlzLiRwcm9ncmVzc1VwbG9hZC5hdHRyKFwiZGlzYWJsZWRcIiwgXCJkaXNhYmxlZFwiKTtcbiAgICB0aGlzLiRwcm9ncmVzc0Fib3J0LnJlbW92ZUF0dHIoXCJkaXNhYmxlZFwiKTtcbiAgfVxuXG4gIHByb2Nlc3NvcltpbmZvLnN1cHBvcnRGaWxlQXBpID8gXCJodG1sNVwiIDogXCJmb3JtXCJdLmNhbGwodGhpcyk7XG5cbn07XG5jb25zdCB1cGRhdGVQcm9ncmVzc0JhciA9IGZ1bmN0aW9uIChlKSB7XG4gIGxldCBwZXJjZW50ID0gVS5udW1iZXIoKHRoaXMuX19sb2FkZWQgKyBlLmxvYWRlZCkgLyB0aGlzLnNlbGVjdGVkRmlsZXNUb3RhbCAqIDEwMCwge3JvdW5kOiAyfSk7XG4gIHRoaXMuJHByb2dyZXNzQmFyLmNzcyh7d2lkdGg6IHBlcmNlbnQgKyAnJSd9KTtcbiAgdGhpcy4kcHJvZ3Jlc3NCYXJWYWwuaHRtbChwZXJjZW50ICsgJyUgQ29tcGxldGUnKTtcbiAgaWYoZS5sb2FkZWQgPj0gZS50b3RhbCl7XG4gICAgdGhpcy5fX2xvYWRlZCArPSBlLnRvdGFsO1xuICB9XG4gIGlmIChlLmxlbmd0aENvbXB1dGFibGUpIHtcbiAgICBpZiAoZS5sb2FkZWQgPj0gZS50b3RhbCkge1xuXG4gICAgfVxuICB9XG4gIHBlcmNlbnQgPSBudWxsO1xufTtcbmNvbnN0IHVwbG9hZGVkID0gZnVuY3Rpb24gKHJlcykge1xuICBpZiAodGhpcy5jb25maWcuZGVidWcpIGNvbnNvbGUubG9nKHJlcyk7XG4gIHRoaXMudXBsb2FkZWRGaWxlcy5wdXNoKHJlcyk7XG4gIHJlcGFpbnRVcGxvYWRlZEJveC5jYWxsKHRoaXMpOyAvLyDsl4XroZzrk5zrkJwg7YyM7J28IOy2nOugpVxuXG4gIGlmIChVLmlzRnVuY3Rpb24odGhpcy5jb25maWcub251cGxvYWRlZCkpIHtcbiAgICB0aGlzLmNvbmZpZy5vbnVwbG9hZGVkLmNhbGwoe1xuICAgICAgc2VsZjogdGhpc1xuICAgIH0sIHJlcyk7XG4gIH1cbn07XG5jb25zdCB1cGxvYWRDb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5fX3VwbG9hZGluZyA9IGZhbHNlOyAvLyDsl4XroZzrk5wg7JmE66OMIOyDge2DnOyymOumrFxuICB0aGlzLiRwcm9ncmVzc1VwbG9hZC5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIik7XG4gIHRoaXMuJHByb2dyZXNzQWJvcnQuYXR0cihcImRpc2FibGVkXCIsIFwiZGlzYWJsZWRcIik7XG5cbiAgaWYgKHRoaXMuY29uZmlnLnByb2dyZXNzQm94KSB7XG4gICAgY2xvc2VQcm9ncmVzc0JveC5jYWxsKHRoaXMpO1xuICB9XG4gIGlmIChVLmlzRnVuY3Rpb24odGhpcy5jb25maWcub251cGxvYWRDb21wbGV0ZSkpIHtcbiAgICB0aGlzLmNvbmZpZy5vbnVwbG9hZENvbXBsZXRlLmNhbGwoe1xuICAgICAgc2VsZjogdGhpc1xuICAgIH0pO1xuICB9XG4gIC8vIHVwZGF0ZSB1cGxvYWRlZEZpbGVzIGRpc3BsYXlcblxuICAvLy8gcmVzZXQgaW5wdXRGaWxlXG4gIGF0dGFjaEZpbGVUYWcuY2FsbCh0aGlzKTtcbn07XG5jb25zdCBjYW5jZWxVcGxvYWQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgY29uc3QgcHJvY2Vzc29yID0ge1xuICAgIFwiaHRtbDVcIjogZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHRoaXMueGhyKSB7XG4gICAgICAgIHRoaXMueGhyLmFib3J0KCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBcImZvcm1cIjogZnVuY3Rpb24gKCkge1xuXG4gICAgfVxuICB9O1xuXG4gIHRoaXMuX191cGxvYWRpbmcgPSBmYWxzZTsgLy8g7JeF66Gc65OcIOyZhOujjCDsg4Htg5zsspjrpqxcbiAgdGhpcy4kcHJvZ3Jlc3NVcGxvYWQucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpO1xuICB0aGlzLiRwcm9ncmVzc0Fib3J0LmF0dHIoXCJkaXNhYmxlZFwiLCBcImRpc2FibGVkXCIpO1xuXG4gIHByb2Nlc3NvcltpbmZvLnN1cHBvcnRGaWxlQXBpID8gXCJodG1sNVwiIDogXCJmb3JtXCJdLmNhbGwodGhpcyk7XG5cbiAgaWYgKHRoaXMuY29uZmlnLnByb2dyZXNzQm94KSB7XG4gICAgY2xvc2VQcm9ncmVzc0JveC5jYWxsKHRoaXMpO1xuICB9XG5cbiAgLy90aGlzLiRpbnB1dEZpbGUudmFsKFwiXCIpO1xuICAvLy8gcmVzZXQgaW5wdXRGaWxlXG4gIGF0dGFjaEZpbGVUYWcuY2FsbCh0aGlzKTtcblxuICBpZiAodGhpcy5jb25maWcuZGVidWcpIGNvbnNvbGUubG9nKFwiY2FuY2VsVXBsb2FkXCIpO1xuICAvLyB1cGRhdGUgdXBsb2FkZWRGaWxlcyBkaXNwbGF5XG59O1xuY29uc3QgcmVwYWludFVwbG9hZGVkQm94ID0gZnVuY3Rpb24gKCkge1xuICAvLyB1cGxvYWRlZEJveCDqsIAg7JeG64uk66m0IOyVhOustOydvOuPhCDtlZjsp4Ag7JWK7J2MLlxuICAvLyBvbnVwbG9hZGVkIO2VqOyImCDsnbTrsqTtirjrpbwg7J207Jqp7ZWY7JesIOqwnOuwnOyekOqwgCDsp4HsoJEg7JeF66Gc65Oc65SUIOuwleyKpOulvCDqtaztmIQg7ZWc64uk6rOgIOydtO2VtCDtlZjsnpAuXG4gIGlmICh0aGlzLiR1cGxvYWRlZEJveCA9PT0gbnVsbCkgcmV0dXJuIHRoaXM7XG5cbiAgdGhpcy4kdXBsb2FkZWRCb3guaHRtbChcbiAgICBtdXN0YWNoZS5yZW5kZXIodG1wbC51cG9hZGVkQm94LmNhbGwodGhpcywgdGhpcy5jb25maWcudXBsb2FkZWRCb3guY29sdW1uS2V5cyksIHtcbiAgICAgIFwiQGZuX2dldF9ieXRlXCIoKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodGV4dCwgcmVuZGVyKSB7XG4gICAgICAgICAgcmV0dXJuIFUubnVtYmVyKHJlbmRlcih0ZXh0KSwge3JvdW5kOiAyLCBieXRlOiB0cnVlfSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB1cGxvYWRlZEZpbGVzOiB0aGlzLnVwbG9hZGVkRmlsZXMsXG4gICAgICBpY29uOiB0aGlzLmNvbmZpZy51cGxvYWRlZEJveC5pY29uLFxuICAgICAgbGFuZzogdGhpcy5jb25maWcudXBsb2FkZWRCb3gubGFuZyxcbiAgICAgIHN1cHBvcnRGaWxlQXBpOiAhIWluZm8uc3VwcG9ydEZpbGVBcGlcbiAgICB9KVxuICApO1xuICB0aGlzLiR1cGxvYWRlZEJveC5maW5kKFwiaW1nXCIpLm9uKFwiZXJyb3JcIiwgZnVuY3Rpb24gKCkge1xuICAgIC8vdGhpcy5zcmMgPSBcIlwiO1xuICAgICQodGhpcykucGFyZW50KCkuYWRkQ2xhc3MoXCJuby1pbWFnZVwiKTtcbiAgfSk7XG5cbn07XG5jb25zdCBhdHRhY2hGaWxlVGFnID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy4kaW5wdXRGaWxlICYmIHRoaXMuJGlucHV0RmlsZS5nZXQoMCkpIHtcbiAgICB0aGlzLiRpbnB1dEZpbGUucmVtb3ZlKCk7XG4gIH1cbiAgaWYgKHRoaXMuJGlucHV0RmlsZUZvcm0gJiYgdGhpcy4kaW5wdXRGaWxlRm9ybS5nZXQoMCkpIHtcbiAgICB0aGlzLiRpbnB1dEZpbGVGb3JtLnJlbW92ZSgpO1xuICB9XG5cbiAgdGhpcy4kaW5wdXRGaWxlID0galF1ZXJ5KFxuICAgIG11c3RhY2hlLnJlbmRlcih0bXBsLmlucHV0RmlsZS5jYWxsKHRoaXMpLCB7XG4gICAgICBpbnN0YW5jZUlkOiB0aGlzLmluc3RhbmNlSWQsXG4gICAgICBtdWx0aXBsZTogdGhpcy5jb25maWcubXVsdGlwbGUsXG4gICAgICBhY2NlcHQ6IHRoaXMuY29uZmlnLmFjY2VwdCxcbiAgICAgIG5hbWU6IHRoaXMuY29uZmlnLmZvcm0uZmlsZU5hbWVcbiAgICB9KVxuICApO1xuXG4gIGlmIChpbmZvLnN1cHBvcnRGaWxlQXBpKSB7XG4gICAgalF1ZXJ5KGRvY3VtZW50LmJvZHkpLmFwcGVuZCh0aGlzLiRpbnB1dEZpbGUpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuJGZpbGVTZWxlY3Rvci5hdHRyKFwidGFiaW5kZXhcIiwgLTEpO1xuICAgIHRoaXMuJGlucHV0RmlsZUZvcm0gPSBqUXVlcnkoXG4gICAgICBtdXN0YWNoZS5yZW5kZXIodG1wbC5pbnB1dEZpbGVGb3JtLmNhbGwodGhpcyksIHtcbiAgICAgICAgaW5zdGFuY2VJZDogdGhpcy5pbnN0YW5jZUlkXG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLiRpbnB1dEZpbGVGb3JtLmFwcGVuZCh0aGlzLiRpbnB1dEZpbGUpO1xuICAgIGpRdWVyeShkb2N1bWVudC5ib2R5KS5hcHBlbmQodGhpcy4kaW5wdXRGaWxlRm9ybSk7XG4gIH1cblxuICB0aGlzLiRpbnB1dEZpbGVcbiAgICAub2ZmKFwiY2hhbmdlLmF4NXVwbG9hZGVyXCIpXG4gICAgLm9uKFwiY2hhbmdlLmF4NXVwbG9hZGVyXCIsIGUgPT4ge1xuICAgICAgb25TZWxlY3RGaWxlLmNhbGwodGhpcywgZSk7XG4gICAgfSk7XG59O1xuLyogfn5+fn5+fn5+fn5+fn5+fn5+IGVuZCBvZiBwcml2YXRlICB+fn5+fn5+fn5+fn5+fn5+fn5+fiAqL1xuXG4vKipcbiAqIEBjbGFzc1xuICovXG5jbGFzcyBBWDZVSVVwbG9hZGVyIGV4dGVuZHMgQVg2VUlDb3JlIHtcbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0gY29uZmlnXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgLyoqXG4gICAgICogQG1lbWJlciB7SlNPTn1cbiAgICAgKiBAcGFyYW0gY29uZmlnXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSBjb25maWcudGFyZ2V0XG4gICAgICogQHBhcmFtIFtjb25maWcudGhlbWU9J2RlZmF1bHQnXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmxhbmddXG4gICAgICogQHBhcmFtIFtjb25maWcubGFuZy51cGxvYWQ9J1VwbG9hZCddXG4gICAgICogQHBhcmFtIFtjb25maWcubGFuZy5hYm9ydD0nQWJvcnQnXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmFuaW1hdGVUaW1lPTEwMF1cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5hY2NlcHQ9XCIqXFwvKlwiXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLm11bHRpcGxlPWZhbHNlXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLm1hbnVhbFVwbG9hZD1mYWxzZV1cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5wcm9ncmVzc0JveD10cnVlXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLnByb2dyZXNzQm94RGlyZWN0aW9uPSdsZWZ0J10gLSB0b3AsIGJvdHRvbSwgbGVmdCwgcmlnaHQsIGF1dG9cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5mb3JtXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmZvcm0uYWN0aW9uPScnXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmZvcm0uZmlsZU5hbWU9J2ZpbGUnXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmRyb3Bab25lXVxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gW2NvbmZpZy5kcm9wWm9uZS50YXJnZXRdXG4gICAgICogQHBhcmFtIFtjb25maWcudXBsb2FkZWRCb3hdXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSBbY29uZmlnLnVwbG9hZGVkQm94LnRhcmdldF1cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy51cGxvYWRlZEJveC5pY29uXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLnVwbG9hZGVkQm94Lmljb24uZG93bmxvYWQ9J1UrMjkxMyddXG4gICAgICogQHBhcmFtIFtjb25maWcudXBsb2FkZWRCb3guaWNvbi5kZWxldGU9J1UrMjMyYiddXG4gICAgICogQHBhcmFtIFtjb25maWcudXBsb2FkZWRCb3guY29sdW1uS2V5cy5uYW1lPSduYW1lJ11cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy51cGxvYWRlZEJveC5jb2x1bW5LZXlzLnR5cGU9J3R5cGUnXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLnVwbG9hZGVkQm94LmNvbHVtbktleXMuc2l6ZT0nc2l6ZSddXG4gICAgICogQHBhcmFtIFtjb25maWcudXBsb2FkZWRCb3guY29sdW1uS2V5cy51cGxvYWRlZE5hbWU9J3VwbG9hZGVkTmFtZSddXG4gICAgICogQHBhcmFtIFtjb25maWcudXBsb2FkZWRCb3guY29sdW1uS2V5cy51cGxvYWRlZFBhdGg9J3VwbG9hZGVkUGF0aCddXG4gICAgICogQHBhcmFtIFtjb25maWcudXBsb2FkZWRCb3guY29sdW1uS2V5cy5kb3dubG9hZFBhdGg9J2Rvd25sb2FkUGF0aCddXG4gICAgICogQHBhcmFtIFtjb25maWcudXBsb2FkZWRCb3guY29sdW1uS2V5cy5wcmV2aWV3UGF0aD0ncHJldmlld1BhdGgnXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLnVwbG9hZGVkQm94LmNvbHVtbktleXMudGh1bWJuYWlsPSd0aHVtYm5haWwnXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLnVwbG9hZGVkQm94LmxhbmddXG4gICAgICogQHBhcmFtIFtjb25maWcudXBsb2FkZWRCb3gubGFuZy5zdXBwb3J0ZWRIVE1MNV9lbXB0eUxpc3RNc2c9J0Ryb3AgZmlsZXMgaGVyZSBvciBjbGljayB0byB1cGxvYWQuJ11cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy51cGxvYWRlZEJveC5sYW5nLmVtcHR5TGlzdE1zZz0nRW1wdHkgb2YgTGlzdC4nXVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjb25maWcudXBsb2FkZWRCb3gub25jaGFuZ2VdXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NvbmZpZy51cGxvYWRlZEJveC5vbmNsaWNrXVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjb25maWcub25wcm9ncmVzc11cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY29uZmlnLm9udXBsb2FkZXJyb3JdXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NvbmZpZy5vbnVwbG9hZGVkXVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjb25maWcub251cGxvYWRDb21wbGV0ZV1cbiAgICAgKi9cbiAgICB0aGlzLmNvbmZpZyA9IHtcbiAgICAgIHRoZW1lOiAnZGVmYXVsdCcsIC8vIHRoZW1lIG9mIHVwbG9hZGVyXG4gICAgICBsYW5nOiB7IC8vIOyXheuhnOuNlCDrsoTtirwg656t6reA7KeAIOyEpOyglVxuICAgICAgICBcInVwbG9hZFwiOiBcIlVwbG9hZFwiLFxuICAgICAgICBcImFib3J0XCI6IFwiQWJvcnRcIlxuICAgICAgfSxcbiAgICAgIGFuaW1hdGVUaW1lOiAxMDAsXG4gICAgICBhY2NlcHQ6IFwiKi8qXCIsIC8vIOyXheuhnOuTnCDshKDtg50g7YyM7J28IO2DgOyehSDshKTsoJVcbiAgICAgIG11bHRpcGxlOiBmYWxzZSwgLy8g64uk7KSRIO2MjOydvCDsl4XroZzrk5xcbiAgICAgIG1hbnVhbFVwbG9hZDogZmFsc2UsIC8vIOyXheuhnOuUqSDsi5zsnpEg7IiY64+Z7LKY66asIOyXrOu2gFxuICAgICAgcHJvZ3Jlc3NCb3g6IHRydWUsIC8vIOyXheuhnOuTnCDtlITroZzqt7jrnpjsiqQg67CV7IqkIOyCrOyaqeyXrOu2gCBmYWxzZSDsnbTrqbQg7JeF66Gc65OcIOynhO2WieuwlOulvCDtkZzsi5wg7ZWY7KeAIOyViuyKteuLiOuLpC4g6rCc67Cc7J6Q6rCAIG9ucHJvZ3Jlc3Mg7ZWo7IiY66W8IOydtOyaqe2VmOyXrCDsp4HsoJEg6rWs7ZiEIO2VtOyVvCDtlanri4jri6QuXG4gICAgICBwcm9ncmVzc0JveERpcmVjdGlvbjogXCJsZWZ0XCIsXG4gICAgICBmb3JtOiB7XG4gICAgICAgIGFjdGlvbjogXCJcIixcbiAgICAgICAgZmlsZU5hbWU6IFwiZmlsZVwiXG4gICAgICB9LFxuICAgICAgZHJvcFpvbmU6IHtcbiAgICAgICAgdGFyZ2V0OiBudWxsXG4gICAgICB9LFxuICAgICAgdXBsb2FkZWRCb3g6IHtcbiAgICAgICAgdGFyZ2V0OiBudWxsLFxuICAgICAgICBpY29uOiB7XG4gICAgICAgICAgZG93bmxvYWQ6IFwiVSsyOTEzXCIsXG4gICAgICAgICAgZGVsZXRlOiBcIlUrMjMyYlwiXG4gICAgICAgIH0sXG4gICAgICAgIGNvbHVtbktleXM6IHtcbiAgICAgICAgICBuYW1lOiBcIm5hbWVcIixcbiAgICAgICAgICB0eXBlOiBcInR5cGVcIixcbiAgICAgICAgICBzaXplOiBcInNpemVcIixcbiAgICAgICAgICB1cGxvYWRlZE5hbWU6IFwidXBsb2FkZWROYW1lXCIsXG4gICAgICAgICAgdXBsb2FkZWRQYXRoOiBcInVwbG9hZGVkUGF0aFwiLFxuICAgICAgICAgIGRvd25sb2FkUGF0aDogXCJkb3dubG9hZFBhdGhcIixcbiAgICAgICAgICBwcmV2aWV3UGF0aDogXCJwcmV2aWV3UGF0aFwiLFxuICAgICAgICAgIHRodW1ibmFpbDogXCJ0aHVtYm5haWxcIlxuICAgICAgICB9LFxuICAgICAgICBsYW5nOiB7XG4gICAgICAgICAgc3VwcG9ydGVkSFRNTDVfZW1wdHlMaXN0TXNnOiAnRHJvcCBmaWxlcyBoZXJlIG9yIGNsaWNrIHRvIHVwbG9hZC4nLFxuICAgICAgICAgIGVtcHR5TGlzdE1zZzogJ0VtcHR5IG9mIExpc3QuJ1xuICAgICAgICB9LFxuICAgICAgICBvbmNoYW5nZTogbnVsbCxcbiAgICAgICAgb25jbGljazogbnVsbFxuICAgICAgfSxcbiAgICAgIHZhbGlkYXRlU2VsZWN0ZWRGaWxlczogbnVsbCxcbiAgICAgIG9ucHJvZ3Jlc3M6IG51bGwsXG4gICAgICBvbnVwbG9hZGVycm9yOiBudWxsLFxuICAgICAgb251cGxvYWRlZDogbnVsbCxcbiAgICAgIG9udXBsb2FkQ29tcGxldGU6IG51bGxcbiAgICB9O1xuICAgIGpRdWVyeS5leHRlbmQodHJ1ZSwgdGhpcy5jb25maWcsIGNvbmZpZyk7XG5cbiAgICAvLyDrqaTrsoQg67OA7IiYIOy0iOq4sO2ZlFxuICAgIC8qKlxuICAgICAqIOuyhO2KvOyGjeyEsVxuICAgICAqIEBtZW1iZXIge0pTT059XG4gICAgICovXG4gICAgdGhpcy5kZWZhdWx0QnRucyA9IHtcbiAgICAgIFwidXBsb2FkXCI6IHtsYWJlbDogdGhpcy5jb25maWcubGFuZ1tcInVwbG9hZFwiXSwgdGhlbWU6IFwidXBsb2FkXCJ9LFxuICAgICAgXCJhYm9ydFwiOiB7bGFiZWw6IHRoaXMuY29uZmlnLmxhbmdbXCJhYm9ydFwiXSwgdGhlbWU6IFwiYWJvcnRcIn1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICog7JeF66Gc65Oc65CcIO2MjOydvFxuICAgICAqIEBtZW1iZXIge0FycmF5fVxuICAgICAqL1xuICAgIHRoaXMudXBsb2FkZWRGaWxlcyA9IFtdO1xuXG4gICAgLyoqXG4gICAgICog7JeF66Gc642UIO2DgOqyn1xuICAgICAqIEBtZW1iZXIge2pRdWVyeX1cbiAgICAgKi9cbiAgICB0aGlzLiR0YXJnZXQgPSBudWxsO1xuICAgICBcbiAgICAvKipcbiAgICAgKiBpbnB1dCBmaWxlIO2DnOq3uFxuICAgICAqIEBtZW1iZXIge2pRdWVyeX1cbiAgICAgKi9cbiAgICB0aGlzLiRpbnB1dEZpbGUgPSBudWxsO1xuICAgIC8qKlxuICAgICAqIGlucHV0IGZvcm1cbiAgICAgKiBAbWVtYmVyIHtqUXVlcnl9XG4gICAgICovXG4gICAgdGhpcy4kaW5wdXRGaWxlRm9ybSA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiDtjIzsnbwg7ISg7YOdIOuyhO2KvFxuICAgICAqIEBtZW1iZXIge2pRdWVyeX1cbiAgICAgKi9cbiAgICB0aGlzLiRmaWxlU2VsZWN0b3IgPSBudWxsO1xuICAgIFxuICAgIC8qKlxuICAgICAqIO2MjOydvCDrk5zrno3sobRcbiAgICAgKiBAbWVtYmVyIHtqUXVlcnl9XG4gICAgICovXG4gICAgdGhpcy4kZHJvcFpvbmUgPSBudWxsO1xuIFxuICAgIC8qKlxuICAgICAqIO2MjOydvCDrqqnroZ0g7ZGc7Iuc67CV7IqkXG4gICAgICogQG1lbWJlciB7alF1ZXJ5fVxuICAgICAqL1xuICAgIHRoaXMuJHVwbG9hZGVkQm94ID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIOyXheuhnOuTnCDsp4Ttlokg7IOB7YOc67CUXG4gICAgICogQG1lbWJlciB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLl9fdXBsb2FkaW5nID0gZmFsc2U7XG4gICAgXG4gICAgLyoqXG4gICAgICog7ISg7YOd65CcIO2MjOydvOuTpFxuICAgICAqIEBtZW1iZXIge0FycmF5fVxuICAgICAqL1xuICAgIHRoaXMuc2VsZWN0ZWRGaWxlcyA9IFtdO1xuXG4gICAgLyoqXG4gICAgICog7ISg7YOd65CcIO2MjOydvOydmCDsoITssrQg7YGs6riwXG4gICAgICogQG1lbWJlciB7TnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMuc2VsZWN0ZWRGaWxlc1RvdGFsID0gMDtcblxuICAgIC8qKlxuICAgICAqIOyghOyGoeuQnCDtjIzsnbwg7YGs6riwXG4gICAgICogQG1lbWJlciB7TnVtYmVyfVxuICAgICAqL1xuICAgIHRoaXMuX19sb2FkZWQgPSAwO1xuXG4gICAgaWYgKHR5cGVvZiBjb25maWcgIT09IFwidW5kZWZpbmVkXCIpIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICovXG4gIGluaXQoKSB7XG4gICAgdGhpcy5vblN0YXRlQ2hhbmdlZCA9IHRoaXMuY29uZmlnLm9uU3RhdGVDaGFuZ2VkO1xuICAgIGRlbGV0ZSB0aGlzLmNvbmZpZy5vblN0YXRlQ2hhbmdlZDtcblxuICAgIGlmICh0aGlzLmNvbmZpZy50YXJnZXQpIHtcbiAgICAgIHRoaXMuJHRhcmdldCA9IGpRdWVyeSh0aGlzLmNvbmZpZy50YXJnZXQpO1xuXG4gICAgICAvLyDtjIzsnbwg65Oc656N7KG07J2AIOyYteyFmCDsgqztla0uXG4gICAgICBpZiAodGhpcy5jb25maWcuZHJvcFpvbmUgJiYgdGhpcy5jb25maWcuZHJvcFpvbmUudGFyZ2V0ICYmIGluZm8uc3VwcG9ydEZpbGVBcGkpIHtcbiAgICAgICAgdGhpcy4kZHJvcFpvbmUgPSBqUXVlcnkodGhpcy5jb25maWcuZHJvcFpvbmUudGFyZ2V0KTtcbiAgICAgICAgdGhpcy4kZHJvcFpvbmVcbiAgICAgICAgICAuYXR0cihcImRhdGEtYXg2dWktdXBsb2FkZXItZHJvcHpvbmVcIiwgdGhpcy5pbnN0YW5jZUlkKTtcbiAgICAgIH1cblxuICAgICAgLy8gdXBsb2FkZWRCb3gg7Ji17IWYIOyCrO2VrVxuICAgICAgaWYgKHRoaXMuY29uZmlnLnVwbG9hZGVkQm94ICYmIHRoaXMuY29uZmlnLnVwbG9hZGVkQm94LnRhcmdldCkge1xuICAgICAgICB0aGlzLiR1cGxvYWRlZEJveCA9IGpRdWVyeSh0aGlzLmNvbmZpZy51cGxvYWRlZEJveC50YXJnZXQpO1xuICAgICAgfVxuXG4gICAgICAvLyB0YXJnZXQgYXR0cmlidXRlIGRhdGFcbiAgICAgIChmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBpZiAoVS5pc09iamVjdChkYXRhKSAmJiAhZGF0YS5lcnJvcikge1xuICAgICAgICAgIHRoaXMuY29uZmlnID0galF1ZXJ5LmV4dGVuZCh0cnVlLCB7fSwgdGhpcy5jb25maWcsIGRhdGEpO1xuICAgICAgICB9XG4gICAgICB9KS5jYWxsKHRoaXMsIFUucGFyc2VKc29uKHRoaXMuJHRhcmdldC5hdHRyKFwiZGF0YS1heDZ1aS11cGxvYWRlci1jb25maWdcIiksIHRydWUpKTtcblxuXG4gICAgICAvLyBkZXRlY3QgZWxlbWVudFxuICAgICAgLy8vIGZpbGVTZWxlY3RvciDsiJjsp5FcbiAgICAgIHRoaXMuJGZpbGVTZWxlY3RvciA9IHRoaXMuJHRhcmdldC5maW5kKCdbZGF0YS1heDZ1aS11cGxvYWRlci1idXR0b249XCJzZWxlY3RvclwiXScpO1xuICAgICAgaWYgKHRoaXMuJGZpbGVTZWxlY3Rvci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY29uc29sZS5sb2coaW5mby5nZXRFcnJvcihcImF4NnVpLXVwbG9hZGVyXCIsIFwiNDAyXCIsIFwiY2FuIG5vdCBmaW5kIGZpbGUgc2VsZWN0b3JcIikpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgLy8gaW5wdXQgZmlsZSDstpTqsIBcbiAgICAgIGF0dGFjaEZpbGVUYWcuY2FsbCh0aGlzKTtcblxuICAgICAgLy8gYnRucyDtmZXsnbhcbiAgICAgIHRoaXMuY29uZmlnLmJ0bnMgPSBqUXVlcnkuZXh0ZW5kKHt9LCB0aGlzLmRlZmF1bHRCdG5zLCB0aGlzLmNvbmZpZy5idG5zKTtcblxuICAgICAgdGhpcy4kcHJvZ3Jlc3NCb3ggPSBqUXVlcnkoXG4gICAgICAgIG11c3RhY2hlLnJlbmRlcih0bXBsLnByb2dyZXNzQm94LmNhbGwodGhpcyksIHtcbiAgICAgICAgICBpbnN0YW5jZUlkOiB0aGlzLmluc3RhbmNlSWQsXG4gICAgICAgICAgYnRuczogdGhpcy5jb25maWcuYnRuc1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICAgIHRoaXMuJHByb2dyZXNzQmFyID0gdGhpcy4kcHJvZ3Jlc3NCb3guZmluZCgnW3JvbGU9XCJwcm9ncmVzc2JhclwiXScpO1xuICAgICAgdGhpcy4kcHJvZ3Jlc3NCYXJWYWwgPSB0aGlzLiRwcm9ncmVzc0JveC5maW5kKCdbcm9sZT1cInByb2dyZXNzYmFydmFsXCJdJyk7XG4gICAgICB0aGlzLiRwcm9ncmVzc0JveEFycm93ID0gdGhpcy4kcHJvZ3Jlc3NCb3guZmluZChcIi5heC1wcm9ncmVzc2JveC1hcnJvd1wiKTtcbiAgICAgIHRoaXMuJHByb2dyZXNzVXBsb2FkID0gdGhpcy4kcHJvZ3Jlc3NCb3guZmluZCgnW2RhdGEtcHJlZ3Jlc3Nib3gtYnRuPVwidXBsb2FkXCJdJyk7XG4gICAgICB0aGlzLiRwcm9ncmVzc0Fib3J0ID0gdGhpcy4kcHJvZ3Jlc3NCb3guZmluZCgnW2RhdGEtcHJlZ3Jlc3Nib3gtYnRuPVwiYWJvcnRcIl0nKTtcblxuICAgICAgLy8gZmlsZSBBUEnqsIAg7KeA7JuQ65CY7KeAIOyViuuKlCDruIzrnbzsmrDsoIDripQg7KSR7KeAIOq4sOuKpSDsoJzqs7Ug66q77ZWoLlxuICAgICAgaWYgKCFpbmZvLnN1cHBvcnRGaWxlQXBpKSB7XG4gICAgICAgIHRoaXMuJHByb2dyZXNzQWJvcnQuY3NzKHtkaXNwbGF5Olwibm9uZVwifSk7XG4gICAgICB9XG5cbiAgICAgIC8vIO2MjOydvOuyhO2KvCDrk7Hsl5Ag7J2067Kk7Yq4IOyXsOqysC5cbiAgICAgIGJpbmRFdmVudC5jYWxsKHRoaXMpO1xuICAgICAgcmVwYWludFVwbG9hZGVkQm94LmNhbGwodGhpcyk7XG4gICAgfVxuXG4gICAgLy8gaW5pdCDtmLjstpwg7Jes67aAXG4gICAgdGhpcy5pbml0T25jZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICovXG4gIGluaXRPbmNlKCkge1xuICAgIGlmICh0aGlzLmluaXRpYWxpemVkKSByZXR1cm4gdGhpcztcbiAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQHJldHVybnMge0FYNlVJVXBsb2FkZXJ9XG4gICAqL1xuICBzZW5kKCkge1xuICAgIC8vIOyXheuhnOuTnCDsi5zsnpFcbiAgICBpZiAodGhpcy5zZWxlY3RlZEZpbGVzLmxlbmd0aCAmJiBVLmlzRnVuY3Rpb24odGhpcy5jb25maWcudmFsaWRhdGVTZWxlY3RlZEZpbGVzKSkge1xuICAgICAgbGV0IHRoYXQgPSB7XG4gICAgICAgIHNlbGY6IHRoaXMsXG4gICAgICAgIHVwbG9hZGVkRmlsZXM6IHRoaXMudXBsb2FkZWRGaWxlcyxcbiAgICAgICAgc2VsZWN0ZWRGaWxlczogdGhpcy5zZWxlY3RlZEZpbGVzXG4gICAgICB9O1xuICAgICAgaWYgKCF0aGlzLmNvbmZpZy52YWxpZGF0ZVNlbGVjdGVkRmlsZXMuY2FsbCh0aGF0LCB0aGF0KSkge1xuICAgICAgICBjYW5jZWxVcGxvYWQuY2FsbCh0aGlzKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAvLyDsoITshqHsspjrpqwg7JWI7ZWoLlxuICAgICAgfVxuICAgIH1cblxuICAgIHN0YXJ0VXBsb2FkLmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAcmV0dXJucyB7QVg2VUlVcGxvYWRlcn1cbiAgICovXG4gIGFib3J0KCkge1xuICAgIGlmICghaW5mby5zdXBwb3J0RmlsZUFwaSkge1xuICAgICAgYWxlcnQoXCJUaGlzIGJyb3dzZXIgbm90IHN1cHBvcnRlZCBhYm9ydCBtZXRob2RcIik7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgY2FuY2VsVXBsb2FkLmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAcGFyYW0ge0FycmF5fSBfZmlsZXMgLSBKU09OIGZvcm1hdHRpbmcgY2FuIGFsbCBiZSBvdmVycmlkZGVuIGluIGNvbHVtbktleXMuXG4gICAqIEByZXR1cm5zIHtBWDZVSVVwbG9hZGVyfVxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBqc1xuICAgKiAkLmFqYXgoe1xuICAgKiAgICAgdXJsOiBcImFwaS9maWxlTGlzdExvYWQucGhwXCIsXG4gICAqICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAqICAgICAgICAgLy8gcmVzIEpTT04gZm9ybWF0XG4gICAqICAgICAgICAgLy8gW3tcbiAgICogICAgICAgICAvLyBcIm5hbWVcIjogXCJiYXJjb2RlLXNjYW4tYW5pLmdpZlwiLFxuICAgKiAgICAgICAgIC8vIFwic2F2ZU5hbWVcIjogXCJiYXJjb2RlLXNjYW4tYW5pLmdpZlwiLFxuICAgKiAgICAgICAgIC8vIFwidHlwZVwiOiBcImZpbGVcIixcbiAgICogICAgICAgICAvLyBcImZpbGVTaXplXCI6IFwiMzg5MTY2NFwiLFxuICAgKiAgICAgICAgIC8vIFwidXBsb2FkZWRQYXRoXCI6IFwiL2F4NXVpLXVwbG9hZGVyL3Rlc3QvYXBpL2ZpbGVzXCIsXG4gICAqICAgICAgICAgLy8gXCJ0aHVtYlVybFwiOiBcIlwiXG4gICAqICAgICAgICAgLy8gfV1cbiAgICogICAgICAgICB1cGxvYWQuc2V0VXBsb2FkZWRGaWxlcyhyZXMpO1xuICAgKiAgICAgfVxuICAgKiB9KTtcbiAgICogYGBgXG4gICAqL1xuICBzZXRVcGxvYWRlZEZpbGVzKF9maWxlcykge1xuICAgIGlmIChVLmlzQXJyYXkoX2ZpbGVzKSkge1xuICAgICAgdGhpcy51cGxvYWRlZEZpbGVzID0gX2ZpbGVzO1xuICAgIH1cbiAgICBpZiAoVS5pc1N0cmluZyhfZmlsZXMpKSB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLnVwbG9hZGVkRmlsZXMgPSBKU09OLnBhcnNlKF9maWxlcyk7XG4gICAgICB9XG4gICAgICBjYXRjaCAoZSkge1xuXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmVwYWludFVwbG9hZGVkQm94LmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogY2xlYXIgdXBsb2FkZWRGaWxlc1xuICAgKiBAbWV0aG9kXG4gICAqIEByZXR1cm5zIHtBWDZVSVVwbG9hZGVyfVxuICAgKi9cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5zZXRVcGxvYWRlZEZpbGVzKFtdKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSBvYmplY3QgY29ycmVzcG9uZGluZyB0byB0aGUgaW5kZXggcGFzc2VkIHRvIHRoZSBhcmd1bWVudCBmcm9tIHVwbG9hZGVkRmlsZXMuXG4gICAqIEBtZXRob2RcbiAgICogQHBhcmFtIHtOdW1iZXJ9IF9pbmRleFxuICAgKiBAcmV0dXJucyB7QVg2VUlVcGxvYWRlcn1cbiAgICogQGV4YW1wbGVcbiAgICogYGBganNcbiAgICogLy8gVGhlIGFjdHVhbCBmaWxlIGlzIG5vdCBkZWxldGVkXG4gICAqIHVwbG9hZC5yZW1vdmVGaWxlKGZpbGVJbmRleCk7XG4gICAqIGBgYFxuICAgKi9cbiAgcmVtb3ZlRmlsZShfaW5kZXgpIHtcbiAgICBpZiAoIWlzTmFOKE51bWJlcihfaW5kZXgpKSkge1xuICAgICAgdGhpcy51cGxvYWRlZEZpbGVzLnNwbGljZShfaW5kZXgsIDEpO1xuICAgIH1cbiAgICByZXBhaW50VXBsb2FkZWRCb3guY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBFbXB0eSB1cGxvYWRlZEZpbGVzXG4gICAqIEBtZXRob2RcbiAgICogQHJldHVybnMge0FYNlVJVXBsb2FkZXJ9XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqXG4gICAqIGBgYFxuICAgKi9cbiAgcmVtb3ZlRmlsZUFsbCgpIHtcbiAgICB0aGlzLnVwbG9hZGVkRmlsZXMgPSBbXTtcbiAgICByZXBhaW50VXBsb2FkZWRCb3guY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgKi9cbiAgc2VsZWN0RmlsZSgpIHtcbiAgICBpZiAoaW5mby5zdXBwb3J0RmlsZUFwaSkge1xuICAgICAgdGhpcy4kaW5wdXRGaWxlLnRyaWdnZXIoXCJjbGlja1wiKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQVg2VUlVcGxvYWRlcjtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vc3JjL0FYNlVJVXBsb2FkZXIuanMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGUuc2Nzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7fVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zdHlsZS5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zdHlsZS5zY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9zcmMvQVg2VUlVcGxvYWRlci9zdHlsZS5zY3NzXG4vLyBtb2R1bGUgaWQgPSAxMDlcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHVuZGVmaW5lZCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJALXdlYmtpdC1rZXlmcmFtZXMgYXgtcHJvZ3Jlc3Nib3gge1xcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAwLjA7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwKTsgfVxcbiAgMTAwJSB7XFxuICAgIG9wYWNpdHk6IDEuMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEpOyB9IH1cXG5cXG5ALW1vei1rZXlmcmFtZXMgYXgtcHJvZ3Jlc3Nib3gge1xcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAwLjA7XFxuICAgIC1tb3otdHJhbnNmb3JtOiBzY2FsZSgwKTsgfVxcbiAgMTAwJSB7XFxuICAgIG9wYWNpdHk6IDEuMDtcXG4gICAgLW1vei10cmFuc2Zvcm06IHNjYWxlKDEpOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIGF4LXByb2dyZXNzYm94IHtcXG4gIDAlIHtcXG4gICAgb3BhY2l0eTogMC4wO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMCk7XFxuICAgIC1tb3otdHJhbnNmb3JtOiBzY2FsZSgwKTtcXG4gICAgLW1zLXRyYW5zZm9ybTogc2NhbGUoMCk7XFxuICAgIC1vLXRyYW5zZm9ybTogc2NhbGUoMCk7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7IH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAxLjA7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgLW1vei10cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICAtbXMtdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgLW8tdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxKTsgfSB9XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIHByb2dyZXNzLWJhci1zdHJpcGVzIHtcXG4gIGZyb20ge1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiA0MHB4IDA7IH1cXG4gIHRvIHtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwOyB9IH1cXG5cXG5ALW1vei1rZXlmcmFtZXMgcHJvZ3Jlc3MtYmFyLXN0cmlwZXMge1xcbiAgZnJvbSB7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDQwcHggMDsgfVxcbiAgdG8ge1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDA7IH0gfVxcblxcbkBrZXlmcmFtZXMgcHJvZ3Jlc3MtYmFyLXN0cmlwZXMge1xcbiAgZnJvbSB7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDQwcHggMDsgfVxcbiAgdG8ge1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDA7IH0gfVxcblxcbkAtd2Via2l0LWtleWZyYW1lcyBheC1wcm9ncmVzc2JveCB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDAuMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDApOyB9XFxuICAxMDAlIHtcXG4gICAgb3BhY2l0eTogMS4wO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMSk7IH0gfVxcblxcbkAtbW96LWtleWZyYW1lcyBheC1wcm9ncmVzc2JveCB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDAuMDtcXG4gICAgLW1vei10cmFuc2Zvcm06IHNjYWxlKDApOyB9XFxuICAxMDAlIHtcXG4gICAgb3BhY2l0eTogMS4wO1xcbiAgICAtbW96LXRyYW5zZm9ybTogc2NhbGUoMSk7IH0gfVxcblxcbkBrZXlmcmFtZXMgYXgtcHJvZ3Jlc3Nib3gge1xcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAwLjA7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwKTtcXG4gICAgLW1vei10cmFuc2Zvcm06IHNjYWxlKDApO1xcbiAgICAtbXMtdHJhbnNmb3JtOiBzY2FsZSgwKTtcXG4gICAgLW8tdHJhbnNmb3JtOiBzY2FsZSgwKTtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwKTsgfVxcbiAgMTAwJSB7XFxuICAgIG9wYWNpdHk6IDEuMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICAtbW96LXRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICAgIC1tcy10cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICAtby10cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEpOyB9IH1cXG5cXG5bZGF0YS1heDZ1aS11cGxvYWRlcl0ge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcbiAgW2RhdGEtYXg2dWktdXBsb2FkZXJdICosXFxuICBbZGF0YS1heDZ1aS11cGxvYWRlcl0gKjpiZWZvcmUsXFxuICBbZGF0YS1heDZ1aS11cGxvYWRlcl0gKjphZnRlciB7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IH1cXG4gIFtkYXRhLWF4NnVpLXVwbG9hZGVyXSBbZGF0YS1heDZ1aS11cGxvYWRlci1idXR0b249XFxcInNlbGVjdG9yXFxcIl0ge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG4gIFtkYXRhLWF4NnVpLXVwbG9hZGVyXSBbZGF0YS1heDZ1aS11cGxvYWRlci1kcm9wem9uZV0ge1xcbiAgICBiYWNrZ3JvdW5kOiAjZjNmM2YzO1xcbiAgICBib3JkZXI6IDJweCBkYXNoZWQgIzAwODdGNztcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgICBtYXJnaW46IDEwcHggMDtcXG4gICAgcGFkZGluZzogN3B4O1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7IH1cXG4gICAgW2RhdGEtYXg2dWktdXBsb2FkZXJdIFtkYXRhLWF4NnVpLXVwbG9hZGVyLWRyb3B6b25lXS5kcmFnb3ZlciB7XFxuICAgICAgYmFja2dyb3VuZDogI2ZmZjtcXG4gICAgICBib3JkZXI6IDJweCBzb2xpZCAjMDA4N0Y3O1xcbiAgICAgIG9wYWNpdHk6IDAuNjsgfVxcblxcbltkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveF0ge1xcbiAgYmFja2dyb3VuZDogI2YzZjNmMztcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBtYXJnaW46IDEwcHggMDtcXG4gIHBhZGRpbmc6IDdweDtcXG4gIG1pbi1oZWlnaHQ6IDEwMHB4OyB9XFxuICBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3hdW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94XSB7XFxuICAgIG1hcmdpbjogMTBweCAwO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG4gICAgW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94XVtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveF0gW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtaXRlbV0ge1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgIGNvbG9yOiAjNWE1YTVhO1xcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XFxuICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgICAgIHBhZGRpbmc6IDBweCAzcHg7XFxuICAgICAgbWFyZ2luOiAzcHg7XFxuICAgICAgYmFja2dyb3VuZDogI2ZmZjsgfVxcbiAgICAgIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveF1bZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3hdIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWl0ZW1dOmhvdmVyLCBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3hdW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94XSBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1pdGVtXTpmb2N1cywgW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94XVtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveF0gW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtaXRlbV0uZm9jdXMge1xcbiAgICAgICAgY29sb3I6ICM1YTVhNWE7XFxuICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7IH1cXG4gICAgICBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3hdW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94XSBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1pdGVtXTphY3RpdmUsIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveF1bZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3hdIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWl0ZW1dLmFjdGl2ZSB7XFxuICAgICAgICBvdXRsaW5lOiAwO1xcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogbm9uZTtcXG4gICAgICAgIGJveC1zaGFkb3c6IGluc2V0IDAgM3B4IDVweCByZ2JhKDAsIDAsIDAsIDAuMTI1KTsgfVxcbiAgICAgIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveF1bZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3hdIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWl0ZW1dLmRpc2FibGVkLCBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3hdW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94XSBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1pdGVtXVtkaXNhYmxlZF0sXFxuICAgICAgZmllbGRzZXRbZGlzYWJsZWRdIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveF1bZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3hdIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWl0ZW1dIHtcXG4gICAgICAgIGN1cnNvcjogbm90LWFsbG93ZWQ7XFxuICAgICAgICBvcGFjaXR5OiAuNjU7XFxuICAgICAgICBib3gtc2hhZG93OiBub25lOyB9XFxuICAgICAgW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94XVtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveF0gW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtaXRlbV0gLnVwbG9hZGVkLWl0ZW0tcHJldmlldyB7XFxuICAgICAgICBkaXNwbGF5OiBub25lOyB9XFxuICAgICAgW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94XVtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveF0gW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtaXRlbV0gLnVwbG9hZGVkLWl0ZW0taG9sZGVyIHtcXG4gICAgICAgIGRpc3BsYXk6IHRhYmxlOyB9XFxuICAgICAgICBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3hdW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94XSBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1pdGVtXSAudXBsb2FkZWQtaXRlbS1ob2xkZXIgLnVwbG9hZGVkLWl0ZW0tY2VsbCB7XFxuICAgICAgICAgIGRpc3BsYXk6IHRhYmxlLWNlbGw7XFxuICAgICAgICAgIHBhZGRpbmc6IDAgM3B4OyB9XFxuICAgICAgICBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3hdW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94XSBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1pdGVtXSAudXBsb2FkZWQtaXRlbS1ob2xkZXIgW2RhdGEtdXBsb2FkZWQtaXRlbS1jZWxsPVxcXCJkb3dubG9hZFxcXCJdIHtcXG4gICAgICAgICAgY3Vyc29yOiBwb2ludGVyOyB9XFxuICAgICAgICAgIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveF1bZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3hdIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWl0ZW1dIC51cGxvYWRlZC1pdGVtLWhvbGRlciBbZGF0YS11cGxvYWRlZC1pdGVtLWNlbGw9XFxcImRvd25sb2FkXFxcIl06aG92ZXIsIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveF1bZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3hdIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWl0ZW1dIC51cGxvYWRlZC1pdGVtLWhvbGRlciBbZGF0YS11cGxvYWRlZC1pdGVtLWNlbGw9XFxcImRvd25sb2FkXFxcIl06Zm9jdXMsIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveF1bZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3hdIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWl0ZW1dIC51cGxvYWRlZC1pdGVtLWhvbGRlciBbZGF0YS11cGxvYWRlZC1pdGVtLWNlbGw9XFxcImRvd25sb2FkXFxcIl0uZm9jdXMge1xcbiAgICAgICAgICAgIGNvbG9yOiAjMzM3YWI3O1xcbiAgICAgICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTsgfVxcbiAgICAgICAgW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94XVtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveF0gW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtaXRlbV0gLnVwbG9hZGVkLWl0ZW0taG9sZGVyIFtkYXRhLXVwbG9hZGVkLWl0ZW0tY2VsbD1cXFwiZGVsZXRlXFxcIl0ge1xcbiAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7IH1cXG4gICAgICAgICAgW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94XVtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveF0gW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtaXRlbV0gLnVwbG9hZGVkLWl0ZW0taG9sZGVyIFtkYXRhLXVwbG9hZGVkLWl0ZW0tY2VsbD1cXFwiZGVsZXRlXFxcIl06aG92ZXIsIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveF1bZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3hdIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWl0ZW1dIC51cGxvYWRlZC1pdGVtLWhvbGRlciBbZGF0YS11cGxvYWRlZC1pdGVtLWNlbGw9XFxcImRlbGV0ZVxcXCJdOmZvY3VzLCBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3hdW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94XSBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1pdGVtXSAudXBsb2FkZWQtaXRlbS1ob2xkZXIgW2RhdGEtdXBsb2FkZWQtaXRlbS1jZWxsPVxcXCJkZWxldGVcXFwiXS5mb2N1cyB7XFxuICAgICAgICAgICAgY29sb3I6ICMzMzdhYjc7XFxuICAgICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lOyB9XFxuICAgIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveF1bZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3hdIFtkYXRhLWF4NnVpLXVwbG9hZGVyLWVtcHR5TGlzdC1tc2ddIHtcXG4gICAgICBtaW4taGVpZ2h0OiA4NnB4O1xcbiAgICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgICBjb2xvcjogZ3JheTsgfVxcbiAgW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94XVtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveD1cXFwiaW5saW5lXFxcIl06YWZ0ZXIge1xcbiAgICBjb250ZW50OiBcXFwiIFxcXCI7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBjbGVhcjogYm90aDsgfVxcbiAgW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94XVtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveD1cXFwiaW5saW5lXFxcIl0gW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtaXRlbV0ge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgZmxvYXQ6IGxlZnQ7IH1cXG4gIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveF1bZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3g9XFxcInRodW1ibmFpbFxcXCJdOmFmdGVyIHtcXG4gICAgY29udGVudDogXFxcIiBcXFwiO1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgY2xlYXI6IGJvdGg7IH1cXG4gIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveF1bZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3g9XFxcInRodW1ibmFpbFxcXCJdIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWl0ZW1dIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIGZsb2F0OiBsZWZ0O1xcbiAgICB3aWR0aDogMTIwcHg7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50OyB9XFxuICAgIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveF1bZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3g9XFxcInRodW1ibmFpbFxcXCJdIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWl0ZW1dOmFjdGl2ZSwgW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94XVtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveD1cXFwidGh1bWJuYWlsXFxcIl0gW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtaXRlbV0uYWN0aXZlIHtcXG4gICAgICBvdXRsaW5lOiAwO1xcbiAgICAgIGJhY2tncm91bmQtaW1hZ2U6IG5vbmU7XFxuICAgICAgYm94LXNoYWRvdzogbm9uZTsgfVxcbiAgICBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3hdW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94PVxcXCJ0aHVtYm5haWxcXFwiXSBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1pdGVtXSAudXBsb2FkZWQtaXRlbS1wcmV2aWV3IHtcXG4gICAgICBkaXNwbGF5OiBibG9jazsgfVxcbiAgICAgIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveF1bZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3g9XFxcInRodW1ibmFpbFxcXCJdIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWl0ZW1dIC51cGxvYWRlZC1pdGVtLXByZXZpZXcubm8taW1hZ2Uge1xcbiAgICAgICAgd2lkdGg6IDEyMHB4O1xcbiAgICAgICAgaGVpZ2h0OiAxMjBweDtcXG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XFxuICAgICAgICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNjZiNGZiO1xcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoLTI5MGRlZywgIzY2YjRmYiwgI2ZmNzhiMik7XFxuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQoMjBkZWcsIzY2YjRmYiwgI2ZmNzhiMik7XFxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgICAgICBsaW5lLWhlaWdodDogMTIwcHg7XFxuICAgICAgICBjb2xvcjogI2ZmZjsgfVxcbiAgICAgICAgW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94XVtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveD1cXFwidGh1bWJuYWlsXFxcIl0gW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtaXRlbV0gLnVwbG9hZGVkLWl0ZW0tcHJldmlldy5uby1pbWFnZTpiZWZvcmUge1xcbiAgICAgICAgICBjb250ZW50OiAnTm8gSW1hZ2UnOyB9XFxuICAgICAgICBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3hdW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94PVxcXCJ0aHVtYm5haWxcXFwiXSBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1pdGVtXSAudXBsb2FkZWQtaXRlbS1wcmV2aWV3Lm5vLWltYWdlIGltZyB7XFxuICAgICAgICAgIGRpc3BsYXk6IG5vbmU7IH1cXG4gICAgICBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3hdW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94PVxcXCJ0aHVtYm5haWxcXFwiXSBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1pdGVtXSAudXBsb2FkZWQtaXRlbS1wcmV2aWV3IGltZyB7XFxuICAgICAgICB3aWR0aDogMTIwcHg7XFxuICAgICAgICBoZWlnaHQ6IDEyMHB4O1xcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDsgfVxcbiAgICBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3hdW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94PVxcXCJ0aHVtYm5haWxcXFwiXSBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1pdGVtXSAudXBsb2FkZWQtaXRlbS1ob2xkZXIge1xcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgICBkaXNwbGF5OiBibG9jazsgfVxcbiAgICAgIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveF1bZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3g9XFxcInRodW1ibmFpbFxcXCJdIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWl0ZW1dIC51cGxvYWRlZC1pdGVtLWhvbGRlciAudXBsb2FkZWQtaXRlbS1jZWxsIHtcXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpczsgfVxcbiAgICAgIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveF1bZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3g9XFxcInRodW1ibmFpbFxcXCJdIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWl0ZW1dIC51cGxvYWRlZC1pdGVtLWhvbGRlciBbZGF0YS11cGxvYWRlZC1pdGVtLWNlbGw9XFxcImRvd25sb2FkXFxcIl0ge1xcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgICAgbGVmdDogNXB4O1xcbiAgICAgICAgdG9wOiAtMTE1cHg7XFxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgICAgICBiYWNrZ3JvdW5kOiAjZmZmO1xcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4OyB9XFxuICAgICAgW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94XVtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveD1cXFwidGh1bWJuYWlsXFxcIl0gW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtaXRlbV0gLnVwbG9hZGVkLWl0ZW0taG9sZGVyIFtkYXRhLXVwbG9hZGVkLWl0ZW0tY2VsbD1cXFwiZGVsZXRlXFxcIl0ge1xcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgICAgcmlnaHQ6IDVweDtcXG4gICAgICAgIHRvcDogLTExNXB4O1xcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICAgICAgYmFja2dyb3VuZDogI2ZmZjtcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDsgfVxcbiAgICAgIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveF1bZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3g9XFxcInRodW1ibmFpbFxcXCJdIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWl0ZW1dIC51cGxvYWRlZC1pdGVtLWhvbGRlciBbZGF0YS11cGxvYWRlZC1pdGVtLWNlbGw9XFxcImZpbGVuYW1lXFxcIl0ge1xcbiAgICAgICAgcGFkZGluZy10b3A6IDVweDsgfVxcblxcbltkYXRhLWF4NnVpLXVwbG9hZGVyLWlucHV0XSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiAtMTAwMHB4O1xcbiAgdG9wOiAtMTAwMHB4O1xcbiAgb3BhY2l0eTogMDtcXG4gIGN1cnNvcjogcG9pbnRlcjsgfVxcblxcbltkYXRhLWF4NnVpLXVwbG9hZGVyLXByb2dyZXNzYm94XSB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgei1pbmRleDogMTAwMDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDBweDtcXG4gIHRvcDogMHB4O1xcbiAgd2lkdGg6IDIwMHB4O1xcbiAgLXdlYmtpdC1wZXJzcGVjdGl2ZTogMTAwMHB4O1xcbiAgLW1vei1wZXJzcGVjdGl2ZTogMTAwMHB4O1xcbiAgcGVyc3BlY3RpdmU6IDEwMDBweDtcXG4gIC13ZWJraXQtdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcXG4gIC1tb3otdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcXG4gIC1tcy10cmFuc2Zvcm0tc3R5bGU6IHByZXNlcnZlLTNkO1xcbiAgLW8tdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcXG4gIHRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XFxuICAtd2Via2l0LWFuaW1hdGlvbjogYXgtcHJvZ3Jlc3Nib3ggMC4xcztcXG4gIC1tb3otYW5pbWF0aW9uOiBheC1wcm9ncmVzc2JveCAwLjFzO1xcbiAgYW5pbWF0aW9uOiBheC1wcm9ncmVzc2JveCAwLjFzO1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7XFxuICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlWigwKTtcXG4gIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7XFxuICAtby10cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7XFxuICAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciB0b3A7XFxuICAtbW96LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciB0b3A7XFxuICAtbXMtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIHRvcDtcXG4gIC1vLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciB0b3A7XFxuICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgdG9wO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KGJvdHRvbSwgI2ZmZik7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gdG9wLCNmZmYpO1xcbiAgYm9yZGVyOiAxcHggc29saWQ7XFxuICBib3JkZXItY29sb3I6ICNkZGQ7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBib3gtc2hhZG93OiAwcHggMHB4IDNweCAwcHggcmdiYSgwLCAwLCAwLCAwLjE3NSk7IH1cXG4gIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXByb2dyZXNzYm94XSAucHJvZ3Jlc3Mge1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICBoZWlnaHQ6IDEycHg7XFxuICAgIG1hcmdpbi1ib3R0b206IDA7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7XFxuICAgIGJvcmRlci1yYWRpdXM6IDNweDtcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMnB4IHJnYmEoMCwgMCwgMCwgMC4xKTsgfVxcbiAgW2RhdGEtYXg2dWktdXBsb2FkZXItcHJvZ3Jlc3Nib3hdIC5wcm9ncmVzcy1iYXIge1xcbiAgICBmbG9hdDogbGVmdDtcXG4gICAgd2lkdGg6IDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGZvbnQtc2l6ZTogMTJweDtcXG4gICAgbGluZS1oZWlnaHQ6IDEycHg7XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMzMzdhYjc7XFxuICAgIGJveC1zaGFkb3c6IGluc2V0IDAgLTFweCAwIHJnYmEoMCwgMCwgMCwgMC4xNSk7XFxuICAgIC13ZWJraXQtdHJhbnNpdGlvbjogd2lkdGggMC42cyBlYXNlO1xcbiAgICAtbW96LXRyYW5zaXRpb246IHdpZHRoIDAuNnMgZWFzZTtcXG4gICAgdHJhbnNpdGlvbjogd2lkdGggMC42cyBlYXNlOyB9XFxuICBbZGF0YS1heDZ1aS11cGxvYWRlci1wcm9ncmVzc2JveF0gLnByb2dyZXNzLXN0cmlwZWQgLnByb2dyZXNzLWJhcixcXG4gIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXByb2dyZXNzYm94XSAucHJvZ3Jlc3MtYmFyLXN0cmlwZWQge1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCg0NWRlZywgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KSAyNSUsIHRyYW5zcGFyZW50IDI1JSwgdHJhbnNwYXJlbnQgNTAlLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpIDUwJSwgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KSA3NSUsIHRyYW5zcGFyZW50IDc1JSwgdHJhbnNwYXJlbnQpO1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiAtby1saW5lYXItZ3JhZGllbnQoNDVkZWcsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSkgMjUlLCB0cmFuc3BhcmVudCAyNSUsIHRyYW5zcGFyZW50IDUwJSwgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KSA1MCUsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSkgNzUlLCB0cmFuc3BhcmVudCA3NSUsIHRyYW5zcGFyZW50KTtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpIDI1JSwgdHJhbnNwYXJlbnQgMjUlLCB0cmFuc3BhcmVudCA1MCUsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSkgNTAlLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpIDc1JSwgdHJhbnNwYXJlbnQgNzUlLCB0cmFuc3BhcmVudCk7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogNDBweCA0MHB4OyB9XFxuICBbZGF0YS1heDZ1aS11cGxvYWRlci1wcm9ncmVzc2JveF0gLnByb2dyZXNzLmFjdGl2ZSAucHJvZ3Jlc3MtYmFyLFxcbiAgW2RhdGEtYXg2dWktdXBsb2FkZXItcHJvZ3Jlc3Nib3hdIC5wcm9ncmVzcy1iYXIuYWN0aXZlIHtcXG4gICAgLXdlYmtpdC1hbmltYXRpb246IHByb2dyZXNzLWJhci1zdHJpcGVzIDJzIGxpbmVhciBpbmZpbml0ZTtcXG4gICAgLW1vei1hbmltYXRpb246IHByb2dyZXNzLWJhci1zdHJpcGVzIDJzIGxpbmVhciBpbmZpbml0ZTtcXG4gICAgYW5pbWF0aW9uOiBwcm9ncmVzcy1iYXItc3RyaXBlcyAycyBsaW5lYXIgaW5maW5pdGU7IH1cXG4gIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXByb2dyZXNzYm94XSAuYXgtcHJvZ3Jlc3Nib3gtYm9keSB7XFxuICAgIHBhZGRpbmc6IDEwcHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjsgfVxcbiAgICBbZGF0YS1heDZ1aS11cGxvYWRlci1wcm9ncmVzc2JveF0gLmF4LXByb2dyZXNzYm94LWJvZHkgLmF4LXByZWdyZXNzYm94LWNvbnRlbnQge1xcbiAgICAgIG1pbi13aWR0aDogNTBweDsgfVxcbiAgICBbZGF0YS1heDZ1aS11cGxvYWRlci1wcm9ncmVzc2JveF0gLmF4LXByb2dyZXNzYm94LWJvZHkgLmF4LXByb2dyZXNzYm94LWJ1dHRvbnMge1xcbiAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xcbiAgICAgIHBhZGRpbmc6IDVweCAwcHggMHB4IDBweDsgfVxcbiAgICAgIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXByb2dyZXNzYm94XSAuYXgtcHJvZ3Jlc3Nib3gtYm9keSAuYXgtcHJvZ3Jlc3Nib3gtYnV0dG9ucyBidXR0b24uYnRuIHtcXG4gICAgICAgIHBhZGRpbmc6IDNweCA3cHg7XFxuICAgICAgICBmb250LXNpemU6IDAuOGVtOyB9XFxuICAgICAgW2RhdGEtYXg2dWktdXBsb2FkZXItcHJvZ3Jlc3Nib3hdIC5heC1wcm9ncmVzc2JveC1ib2R5IC5heC1wcm9ncmVzc2JveC1idXR0b25zIGJ1dHRvbjpub3QoOmxhc3QtY2hpbGQpIHtcXG4gICAgICAgIG1hcmdpbi1yaWdodDogM3B4OyB9XFxuICBbZGF0YS1heDZ1aS11cGxvYWRlci1wcm9ncmVzc2JveF0uZGlyZWN0aW9uLXRvcCAuYXgtcHJvZ3Jlc3Nib3gtYXJyb3cge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiAwO1xcbiAgICBoZWlnaHQ6IDA7XFxuICAgIGxlZnQ6IDUwJTtcXG4gICAgdG9wOiAwOyB9XFxuICAgIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXByb2dyZXNzYm94XS5kaXJlY3Rpb24tdG9wIC5heC1wcm9ncmVzc2JveC1hcnJvdzpiZWZvcmUge1xcbiAgICAgIGNvbnRlbnQ6ICcgJztcXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgd2lkdGg6IDA7XFxuICAgICAgaGVpZ2h0OiAwO1xcbiAgICAgIGxlZnQ6IC02cHg7XFxuICAgICAgdG9wOiAtMTJweDtcXG4gICAgICBib3JkZXItbGVmdDogNnB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICAgIGJvcmRlci1yaWdodDogNnB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICAgIGJvcmRlci10b3A6IDAgbm9uZTtcXG4gICAgICBib3JkZXItYm90dG9tOiAxMnB4IHNvbGlkICNkZGQ7IH1cXG4gICAgW2RhdGEtYXg2dWktdXBsb2FkZXItcHJvZ3Jlc3Nib3hdLmRpcmVjdGlvbi10b3AgLmF4LXByb2dyZXNzYm94LWFycm93OmFmdGVyIHtcXG4gICAgICBjb250ZW50OiAnICc7XFxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgIHdpZHRoOiAwO1xcbiAgICAgIGhlaWdodDogMDtcXG4gICAgICBsZWZ0OiAtNnB4O1xcbiAgICAgIHRvcDogLTEwcHg7XFxuICAgICAgYm9yZGVyLWxlZnQ6IDZweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gICAgICBib3JkZXItcmlnaHQ6IDZweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gICAgICBib3JkZXItdG9wOiAwIG5vbmU7XFxuICAgICAgYm9yZGVyLWJvdHRvbTogMTJweCBzb2xpZCAjZmZmOyB9XFxuICBbZGF0YS1heDZ1aS11cGxvYWRlci1wcm9ncmVzc2JveF0uZGlyZWN0aW9uLXJpZ2h0IC5heC1wcm9ncmVzc2JveC1hcnJvdyB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDA7XFxuICAgIGhlaWdodDogMDtcXG4gICAgcmlnaHQ6IDA7XFxuICAgIHRvcDogNTAlOyB9XFxuICAgIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXByb2dyZXNzYm94XS5kaXJlY3Rpb24tcmlnaHQgLmF4LXByb2dyZXNzYm94LWFycm93OmJlZm9yZSB7XFxuICAgICAgY29udGVudDogJyAnO1xcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICB3aWR0aDogMDtcXG4gICAgICBoZWlnaHQ6IDA7XFxuICAgICAgcmlnaHQ6IC0xMnB4O1xcbiAgICAgIHRvcDogLTZweDtcXG4gICAgICBib3JkZXItbGVmdDogMTJweCBzb2xpZCAjZGRkO1xcbiAgICAgIGJvcmRlci1yaWdodDogMCBub25lO1xcbiAgICAgIGJvcmRlci10b3A6IDZweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gICAgICBib3JkZXItYm90dG9tOiA2cHggc29saWQgdHJhbnNwYXJlbnQ7IH1cXG4gICAgW2RhdGEtYXg2dWktdXBsb2FkZXItcHJvZ3Jlc3Nib3hdLmRpcmVjdGlvbi1yaWdodCAuYXgtcHJvZ3Jlc3Nib3gtYXJyb3c6YWZ0ZXIge1xcbiAgICAgIGNvbnRlbnQ6ICcgJztcXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgd2lkdGg6IDA7XFxuICAgICAgaGVpZ2h0OiAwO1xcbiAgICAgIHJpZ2h0OiAtMTBweDtcXG4gICAgICB0b3A6IC02cHg7XFxuICAgICAgYm9yZGVyLWxlZnQ6IDEycHggc29saWQgI2ZmZjtcXG4gICAgICBib3JkZXItcmlnaHQ6IDAgbm9uZTtcXG4gICAgICBib3JkZXItdG9wOiA2cHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICAgICAgYm9yZGVyLWJvdHRvbTogNnB4IHNvbGlkIHRyYW5zcGFyZW50OyB9XFxuICBbZGF0YS1heDZ1aS11cGxvYWRlci1wcm9ncmVzc2JveF0uZGlyZWN0aW9uLWJvdHRvbSAuYXgtcHJvZ3Jlc3Nib3gtYXJyb3cge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiAwO1xcbiAgICBoZWlnaHQ6IDA7XFxuICAgIGxlZnQ6IDUwJTtcXG4gICAgYm90dG9tOiAwOyB9XFxuICAgIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXByb2dyZXNzYm94XS5kaXJlY3Rpb24tYm90dG9tIC5heC1wcm9ncmVzc2JveC1hcnJvdzpiZWZvcmUge1xcbiAgICAgIGNvbnRlbnQ6ICcgJztcXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgd2lkdGg6IDA7XFxuICAgICAgaGVpZ2h0OiAwO1xcbiAgICAgIGxlZnQ6IC02cHg7XFxuICAgICAgYm90dG9tOiAtMTJweDtcXG4gICAgICBib3JkZXItbGVmdDogNnB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICAgIGJvcmRlci1yaWdodDogNnB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICAgIGJvcmRlci10b3A6IDEycHggc29saWQgI2RkZDtcXG4gICAgICBib3JkZXItYm90dG9tOiAwIG5vbmU7IH1cXG4gICAgW2RhdGEtYXg2dWktdXBsb2FkZXItcHJvZ3Jlc3Nib3hdLmRpcmVjdGlvbi1ib3R0b20gLmF4LXByb2dyZXNzYm94LWFycm93OmFmdGVyIHtcXG4gICAgICBjb250ZW50OiAnICc7XFxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgIHdpZHRoOiAwO1xcbiAgICAgIGhlaWdodDogMDtcXG4gICAgICBsZWZ0OiAtNnB4O1xcbiAgICAgIGJvdHRvbTogLTEwcHg7XFxuICAgICAgYm9yZGVyLWxlZnQ6IDZweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gICAgICBib3JkZXItcmlnaHQ6IDZweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gICAgICBib3JkZXItdG9wOiAxMnB4IHNvbGlkICNmZmY7XFxuICAgICAgYm9yZGVyLWJvdHRvbTogMCBub25lOyB9XFxuICBbZGF0YS1heDZ1aS11cGxvYWRlci1wcm9ncmVzc2JveF0uZGlyZWN0aW9uLWxlZnQgLmF4LXByb2dyZXNzYm94LWFycm93IHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMDtcXG4gICAgaGVpZ2h0OiAwO1xcbiAgICBsZWZ0OiAwO1xcbiAgICB0b3A6IDUwJTsgfVxcbiAgICBbZGF0YS1heDZ1aS11cGxvYWRlci1wcm9ncmVzc2JveF0uZGlyZWN0aW9uLWxlZnQgLmF4LXByb2dyZXNzYm94LWFycm93OmJlZm9yZSB7XFxuICAgICAgY29udGVudDogJyAnO1xcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICB3aWR0aDogMDtcXG4gICAgICBoZWlnaHQ6IDA7XFxuICAgICAgbGVmdDogLTEycHg7XFxuICAgICAgdG9wOiAtNnB4O1xcbiAgICAgIGJvcmRlci1sZWZ0OiAwIG5vbmU7XFxuICAgICAgYm9yZGVyLXJpZ2h0OiAxMnB4IHNvbGlkICNkZGQ7XFxuICAgICAgYm9yZGVyLXRvcDogNnB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICAgIGJvcmRlci1ib3R0b206IDZweCBzb2xpZCB0cmFuc3BhcmVudDsgfVxcbiAgICBbZGF0YS1heDZ1aS11cGxvYWRlci1wcm9ncmVzc2JveF0uZGlyZWN0aW9uLWxlZnQgLmF4LXByb2dyZXNzYm94LWFycm93OmFmdGVyIHtcXG4gICAgICBjb250ZW50OiAnICc7XFxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgIHdpZHRoOiAwO1xcbiAgICAgIGhlaWdodDogMDtcXG4gICAgICBsZWZ0OiAtMTBweDtcXG4gICAgICB0b3A6IC02cHg7XFxuICAgICAgYm9yZGVyLWxlZnQ6IDAgbm9uZTtcXG4gICAgICBib3JkZXItcmlnaHQ6IDEycHggc29saWQgI2ZmZjtcXG4gICAgICBib3JkZXItdG9wOiA2cHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICAgICAgYm9yZGVyLWJvdHRvbTogNnB4IHNvbGlkIHRyYW5zcGFyZW50OyB9XFxuICBbZGF0YS1heDZ1aS11cGxvYWRlci1wcm9ncmVzc2JveF0uZGVzdHJveSB7XFxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBheC1wcm9ncmVzc2JveC1kZXN0cm95IDAuMXMgY3ViaWMtYmV6aWVyKDAuNiwgLTAuMjgsIDAuNzM1LCAwLjA0NSkgZm9yd2FyZHM7XFxuICAgIC1tb3otYW5pbWF0aW9uOiBheC1wcm9ncmVzc2JveC1kZXN0cm95IDAuMXMgY3ViaWMtYmV6aWVyKDAuNiwgLTAuMjgsIDAuNzM1LCAwLjA0NSkgZm9yd2FyZHM7XFxuICAgIGFuaW1hdGlvbjogYXgtcHJvZ3Jlc3Nib3gtZGVzdHJveSAwLjFzIGN1YmljLWJlemllcigwLjYsIC0wLjI4LCAwLjczNSwgMC4wNDUpIGZvcndhcmRzOyB9XFxuICBbZGF0YS1heDZ1aS11cGxvYWRlci1wcm9ncmVzc2JveF0uZGlyZWN0aW9uLXRvcCB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIHRvcDtcXG4gICAgLW1vei10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgdG9wO1xcbiAgICAtbXMtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIHRvcDtcXG4gICAgLW8tdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIHRvcDtcXG4gICAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIHRvcDsgfVxcbiAgW2RhdGEtYXg2dWktdXBsb2FkZXItcHJvZ3Jlc3Nib3hdLmRpcmVjdGlvbi1yaWdodCB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogcmlnaHQgY2VudGVyO1xcbiAgICAtbW96LXRyYW5zZm9ybS1vcmlnaW46IHJpZ2h0IGNlbnRlcjtcXG4gICAgLW1zLXRyYW5zZm9ybS1vcmlnaW46IHJpZ2h0IGNlbnRlcjtcXG4gICAgLW8tdHJhbnNmb3JtLW9yaWdpbjogcmlnaHQgY2VudGVyO1xcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiByaWdodCBjZW50ZXI7IH1cXG4gIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXByb2dyZXNzYm94XS5kaXJlY3Rpb24tYm90dG9tIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgYm90dG9tO1xcbiAgICAtbW96LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciBib3R0b207XFxuICAgIC1tcy10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgYm90dG9tO1xcbiAgICAtby10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgYm90dG9tO1xcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgYm90dG9tOyB9XFxuICBbZGF0YS1heDZ1aS11cGxvYWRlci1wcm9ncmVzc2JveF0uZGlyZWN0aW9uLWxlZnQge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IGxlZnQgY2VudGVyO1xcbiAgICAtbW96LXRyYW5zZm9ybS1vcmlnaW46IGxlZnQgY2VudGVyO1xcbiAgICAtbXMtdHJhbnNmb3JtLW9yaWdpbjogbGVmdCBjZW50ZXI7XFxuICAgIC1vLXRyYW5zZm9ybS1vcmlnaW46IGxlZnQgY2VudGVyO1xcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiBsZWZ0IGNlbnRlcjsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIhLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi9zcmMvQVg2VUlVcGxvYWRlci9zdHlsZS5zY3NzXG4vLyBtb2R1bGUgaWQgPSAxMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAxIl0sInNvdXJjZVJvb3QiOiIifQ==