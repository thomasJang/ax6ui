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

var _jqmin = __webpack_require__(1);

var _jqmin2 = _interopRequireDefault(_jqmin);

var _AX6UICore2 = __webpack_require__(5);

var _AX6UICore3 = _interopRequireDefault(_AX6UICore2);

var _AX6Util = __webpack_require__(4);

var _AX6Util2 = _interopRequireDefault(_AX6Util);

var _AX6Info = __webpack_require__(3);

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

var _jqmin = __webpack_require__(1);

var _jqmin2 = _interopRequireDefault(_jqmin);

var _AX6UICore2 = __webpack_require__(5);

var _AX6UICore3 = _interopRequireDefault(_AX6UICore2);

var _AX6Util = __webpack_require__(4);

var _AX6Util2 = _interopRequireDefault(_AX6Util);

var _AX6Info = __webpack_require__(3);

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
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "@-webkit-keyframes ax-progressbox {\n  0% {\n    opacity: 0.0;\n    -webkit-transform: scale(0); }\n  100% {\n    opacity: 1.0;\n    -webkit-transform: scale(1); } }\n\n@-moz-keyframes ax-progressbox {\n  0% {\n    opacity: 0.0;\n    -moz-transform: scale(0); }\n  100% {\n    opacity: 1.0;\n    -moz-transform: scale(1); } }\n\n@keyframes ax-progressbox {\n  0% {\n    opacity: 0.0;\n    -webkit-transform: scale(0);\n    -moz-transform: scale(0);\n    -ms-transform: scale(0);\n    -o-transform: scale(0);\n    transform: scale(0); }\n  100% {\n    opacity: 1.0;\n    -webkit-transform: scale(1);\n    -moz-transform: scale(1);\n    -ms-transform: scale(1);\n    -o-transform: scale(1);\n    transform: scale(1); } }\n\n@-webkit-keyframes progress-bar-stripes {\n  from {\n    background-position: 40px 0; }\n  to {\n    background-position: 0 0; } }\n\n@-moz-keyframes progress-bar-stripes {\n  from {\n    background-position: 40px 0; }\n  to {\n    background-position: 0 0; } }\n\n@keyframes progress-bar-stripes {\n  from {\n    background-position: 40px 0; }\n  to {\n    background-position: 0 0; } }\n\n@-webkit-keyframes ax-progressbox {\n  0% {\n    opacity: 0.0;\n    -webkit-transform: scale(0); }\n  100% {\n    opacity: 1.0;\n    -webkit-transform: scale(1); } }\n\n@-moz-keyframes ax-progressbox {\n  0% {\n    opacity: 0.0;\n    -moz-transform: scale(0); }\n  100% {\n    opacity: 1.0;\n    -moz-transform: scale(1); } }\n\n@keyframes ax-progressbox {\n  0% {\n    opacity: 0.0;\n    -webkit-transform: scale(0);\n    -moz-transform: scale(0);\n    -ms-transform: scale(0);\n    -o-transform: scale(0);\n    transform: scale(0); }\n  100% {\n    opacity: 1.0;\n    -webkit-transform: scale(1);\n    -moz-transform: scale(1);\n    -ms-transform: scale(1);\n    -o-transform: scale(1);\n    transform: scale(1); } }\n\n[data-ax6ui-uploader] {\n  box-sizing: border-box;\n  position: relative; }\n  [data-ax6ui-uploader] *,\n  [data-ax6ui-uploader] *:before,\n  [data-ax6ui-uploader] *:after {\n    box-sizing: border-box; }\n  [data-ax6ui-uploader] [data-ax6ui-uploader-button=\"selector\"] {\n    position: relative; }\n  [data-ax6ui-uploader] [data-ax6ui-uploader-dropzone] {\n    background: #f3f3f3;\n    border: 2px dashed #0087F7;\n    border-radius: 5px;\n    margin: 10px 0;\n    padding: 7px;\n    cursor: pointer; }\n    [data-ax6ui-uploader] [data-ax6ui-uploader-dropzone].dragover {\n      background: #fff;\n      border: 2px solid #0087F7;\n      opacity: 0.6; }\n\n[data-ax6ui-uploader-uploaded-box] {\n  background: #f3f3f3;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  margin: 10px 0;\n  padding: 7px;\n  min-height: 100px; }\n  [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box] {\n    margin: 10px 0;\n    position: relative; }\n    [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box] [data-ax6ui-uploader-uploaded-item] {\n      display: block;\n      color: #5a5a5a;\n      border: 1px solid #ddd;\n      border-radius: 4px;\n      padding: 0px 3px;\n      margin: 3px;\n      background: #fff; }\n      [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box] [data-ax6ui-uploader-uploaded-item]:hover, [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box] [data-ax6ui-uploader-uploaded-item]:focus, [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box] [data-ax6ui-uploader-uploaded-item].focus {\n        color: #5a5a5a;\n        text-decoration: none; }\n      [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box] [data-ax6ui-uploader-uploaded-item]:active, [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box] [data-ax6ui-uploader-uploaded-item].active {\n        outline: 0;\n        background-image: none;\n        box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125); }\n      [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box] [data-ax6ui-uploader-uploaded-item].disabled, [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box] [data-ax6ui-uploader-uploaded-item][disabled],\n      fieldset[disabled] [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box] [data-ax6ui-uploader-uploaded-item] {\n        cursor: not-allowed;\n        opacity: .65;\n        box-shadow: none; }\n      [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box] [data-ax6ui-uploader-uploaded-item] .uploaded-item-preview {\n        display: none; }\n      [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box] [data-ax6ui-uploader-uploaded-item] .uploaded-item-holder {\n        display: table; }\n        [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box] [data-ax6ui-uploader-uploaded-item] .uploaded-item-holder .uploaded-item-cell {\n          display: table-cell;\n          padding: 0 3px; }\n        [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box] [data-ax6ui-uploader-uploaded-item] .uploaded-item-holder [data-uploaded-item-cell=\"download\"] {\n          cursor: pointer; }\n          [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box] [data-ax6ui-uploader-uploaded-item] .uploaded-item-holder [data-uploaded-item-cell=\"download\"]:hover, [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box] [data-ax6ui-uploader-uploaded-item] .uploaded-item-holder [data-uploaded-item-cell=\"download\"]:focus, [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box] [data-ax6ui-uploader-uploaded-item] .uploaded-item-holder [data-uploaded-item-cell=\"download\"].focus {\n            color: #337ab7;\n            text-decoration: none; }\n        [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box] [data-ax6ui-uploader-uploaded-item] .uploaded-item-holder [data-uploaded-item-cell=\"delete\"] {\n          cursor: pointer; }\n          [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box] [data-ax6ui-uploader-uploaded-item] .uploaded-item-holder [data-uploaded-item-cell=\"delete\"]:hover, [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box] [data-ax6ui-uploader-uploaded-item] .uploaded-item-holder [data-uploaded-item-cell=\"delete\"]:focus, [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box] [data-ax6ui-uploader-uploaded-item] .uploaded-item-holder [data-uploaded-item-cell=\"delete\"].focus {\n            color: #337ab7;\n            text-decoration: none; }\n    [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box] [data-ax6ui-uploader-emptyList-msg] {\n      min-height: 86px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      color: gray; }\n  [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box=\"inline\"]:after {\n    content: \" \";\n    display: block;\n    clear: both; }\n  [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box=\"inline\"] [data-ax6ui-uploader-uploaded-item] {\n    display: block;\n    float: left; }\n  [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box=\"thumbnail\"]:after {\n    content: \" \";\n    display: block;\n    clear: both; }\n  [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box=\"thumbnail\"] [data-ax6ui-uploader-uploaded-item] {\n    display: block;\n    float: left;\n    width: 120px;\n    padding: 0;\n    background: transparent; }\n    [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box=\"thumbnail\"] [data-ax6ui-uploader-uploaded-item]:active, [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box=\"thumbnail\"] [data-ax6ui-uploader-uploaded-item].active {\n      outline: 0;\n      background-image: none;\n      box-shadow: none; }\n    [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box=\"thumbnail\"] [data-ax6ui-uploader-uploaded-item] .uploaded-item-preview {\n      display: block; }\n      [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box=\"thumbnail\"] [data-ax6ui-uploader-uploaded-item] .uploaded-item-preview.no-image {\n        width: 120px;\n        height: 120px;\n        border: 1px solid #ddd;\n        border-radius: 4px;\n        background-color: #66b4fb;\n        background-image: -webkit-linear-gradient(-290deg, #66b4fb, #ff78b2);\n        background-image: linear-gradient(20deg,#66b4fb, #ff78b2);\n        text-align: center;\n        line-height: 120px;\n        color: #fff; }\n        [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box=\"thumbnail\"] [data-ax6ui-uploader-uploaded-item] .uploaded-item-preview.no-image:before {\n          content: 'No Image'; }\n        [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box=\"thumbnail\"] [data-ax6ui-uploader-uploaded-item] .uploaded-item-preview.no-image img {\n          display: none; }\n      [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box=\"thumbnail\"] [data-ax6ui-uploader-uploaded-item] .uploaded-item-preview img {\n        width: 120px;\n        height: 120px;\n        border: 1px solid #ddd;\n        border-radius: 4px; }\n    [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box=\"thumbnail\"] [data-ax6ui-uploader-uploaded-item] .uploaded-item-holder {\n      position: relative;\n      display: block; }\n      [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box=\"thumbnail\"] [data-ax6ui-uploader-uploaded-item] .uploaded-item-holder .uploaded-item-cell {\n        display: block;\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis; }\n      [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box=\"thumbnail\"] [data-ax6ui-uploader-uploaded-item] .uploaded-item-holder [data-uploaded-item-cell=\"download\"] {\n        position: absolute;\n        left: 5px;\n        top: -115px;\n        cursor: pointer;\n        background: #fff;\n        border-radius: 4px; }\n      [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box=\"thumbnail\"] [data-ax6ui-uploader-uploaded-item] .uploaded-item-holder [data-uploaded-item-cell=\"delete\"] {\n        position: absolute;\n        right: 5px;\n        top: -115px;\n        cursor: pointer;\n        background: #fff;\n        border-radius: 4px; }\n      [data-ax6ui-uploader-uploaded-box][data-ax6ui-uploader-uploaded-box=\"thumbnail\"] [data-ax6ui-uploader-uploaded-item] .uploaded-item-holder [data-uploaded-item-cell=\"filename\"] {\n        padding-top: 5px; }\n\n[data-ax6ui-uploader-input] {\n  position: absolute;\n  left: -1000px;\n  top: -1000px;\n  opacity: 0;\n  cursor: pointer; }\n\n[data-ax6ui-uploader-progressbox] {\n  box-sizing: border-box;\n  z-index: 1000;\n  position: absolute;\n  left: 0px;\n  top: 0px;\n  width: 200px;\n  -webkit-perspective: 1000px;\n  -moz-perspective: 1000px;\n  perspective: 1000px;\n  -webkit-transform-style: preserve-3d;\n  -moz-transform-style: preserve-3d;\n  -ms-transform-style: preserve-3d;\n  -o-transform-style: preserve-3d;\n  transform-style: preserve-3d;\n  -webkit-animation: ax-progressbox 0.1s;\n  -moz-animation: ax-progressbox 0.1s;\n  animation: ax-progressbox 0.1s;\n  -webkit-transform: translateZ(0);\n  -moz-transform: translateZ(0);\n  -ms-transform: translateZ(0);\n  -o-transform: translateZ(0);\n  transform: translateZ(0);\n  -webkit-transform-origin: center top;\n  -moz-transform-origin: center top;\n  -ms-transform-origin: center top;\n  -o-transform-origin: center top;\n  transform-origin: center top;\n  background-color: #fff;\n  background-image: -webkit-linear-gradient(bottom, #fff);\n  background-image: linear-gradient(to top,#fff);\n  border: 1px solid;\n  border-color: #ddd;\n  border-radius: 5px;\n  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.175); }\n  [data-ax6ui-uploader-progressbox] .progress {\n    overflow: hidden;\n    height: 12px;\n    margin-bottom: 0;\n    background-color: #f5f5f5;\n    border-radius: 3px;\n    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1); }\n  [data-ax6ui-uploader-progressbox] .progress-bar {\n    float: left;\n    width: 0%;\n    height: 100%;\n    font-size: 12px;\n    line-height: 12px;\n    color: #fff;\n    text-align: center;\n    background-color: #337ab7;\n    box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);\n    -webkit-transition: width 0.6s ease;\n    -moz-transition: width 0.6s ease;\n    transition: width 0.6s ease; }\n  [data-ax6ui-uploader-progressbox] .progress-striped .progress-bar,\n  [data-ax6ui-uploader-progressbox] .progress-bar-striped {\n    background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n    background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n    background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n    background-size: 40px 40px; }\n  [data-ax6ui-uploader-progressbox] .progress.active .progress-bar,\n  [data-ax6ui-uploader-progressbox] .progress-bar.active {\n    -webkit-animation: progress-bar-stripes 2s linear infinite;\n    -moz-animation: progress-bar-stripes 2s linear infinite;\n    animation: progress-bar-stripes 2s linear infinite; }\n  [data-ax6ui-uploader-progressbox] .ax-progressbox-body {\n    padding: 10px;\n    text-align: center; }\n    [data-ax6ui-uploader-progressbox] .ax-progressbox-body .ax-pregressbox-content {\n      min-width: 50px; }\n    [data-ax6ui-uploader-progressbox] .ax-progressbox-body .ax-progressbox-buttons {\n      text-align: right;\n      padding: 5px 0px 0px 0px; }\n      [data-ax6ui-uploader-progressbox] .ax-progressbox-body .ax-progressbox-buttons button.btn {\n        padding: 3px 7px;\n        font-size: 0.8em; }\n      [data-ax6ui-uploader-progressbox] .ax-progressbox-body .ax-progressbox-buttons button:not(:last-child) {\n        margin-right: 3px; }\n  [data-ax6ui-uploader-progressbox].direction-top .ax-progressbox-arrow {\n    position: absolute;\n    width: 0;\n    height: 0;\n    left: 50%;\n    top: 0; }\n    [data-ax6ui-uploader-progressbox].direction-top .ax-progressbox-arrow:before {\n      content: ' ';\n      position: absolute;\n      width: 0;\n      height: 0;\n      left: -6px;\n      top: -12px;\n      border-left: 6px solid transparent;\n      border-right: 6px solid transparent;\n      border-top: 0 none;\n      border-bottom: 12px solid #ddd; }\n    [data-ax6ui-uploader-progressbox].direction-top .ax-progressbox-arrow:after {\n      content: ' ';\n      position: absolute;\n      width: 0;\n      height: 0;\n      left: -6px;\n      top: -10px;\n      border-left: 6px solid transparent;\n      border-right: 6px solid transparent;\n      border-top: 0 none;\n      border-bottom: 12px solid #fff; }\n  [data-ax6ui-uploader-progressbox].direction-right .ax-progressbox-arrow {\n    position: absolute;\n    width: 0;\n    height: 0;\n    right: 0;\n    top: 50%; }\n    [data-ax6ui-uploader-progressbox].direction-right .ax-progressbox-arrow:before {\n      content: ' ';\n      position: absolute;\n      width: 0;\n      height: 0;\n      right: -12px;\n      top: -6px;\n      border-left: 12px solid #ddd;\n      border-right: 0 none;\n      border-top: 6px solid transparent;\n      border-bottom: 6px solid transparent; }\n    [data-ax6ui-uploader-progressbox].direction-right .ax-progressbox-arrow:after {\n      content: ' ';\n      position: absolute;\n      width: 0;\n      height: 0;\n      right: -10px;\n      top: -6px;\n      border-left: 12px solid #fff;\n      border-right: 0 none;\n      border-top: 6px solid transparent;\n      border-bottom: 6px solid transparent; }\n  [data-ax6ui-uploader-progressbox].direction-bottom .ax-progressbox-arrow {\n    position: absolute;\n    width: 0;\n    height: 0;\n    left: 50%;\n    bottom: 0; }\n    [data-ax6ui-uploader-progressbox].direction-bottom .ax-progressbox-arrow:before {\n      content: ' ';\n      position: absolute;\n      width: 0;\n      height: 0;\n      left: -6px;\n      bottom: -12px;\n      border-left: 6px solid transparent;\n      border-right: 6px solid transparent;\n      border-top: 12px solid #ddd;\n      border-bottom: 0 none; }\n    [data-ax6ui-uploader-progressbox].direction-bottom .ax-progressbox-arrow:after {\n      content: ' ';\n      position: absolute;\n      width: 0;\n      height: 0;\n      left: -6px;\n      bottom: -10px;\n      border-left: 6px solid transparent;\n      border-right: 6px solid transparent;\n      border-top: 12px solid #fff;\n      border-bottom: 0 none; }\n  [data-ax6ui-uploader-progressbox].direction-left .ax-progressbox-arrow {\n    position: absolute;\n    width: 0;\n    height: 0;\n    left: 0;\n    top: 50%; }\n    [data-ax6ui-uploader-progressbox].direction-left .ax-progressbox-arrow:before {\n      content: ' ';\n      position: absolute;\n      width: 0;\n      height: 0;\n      left: -12px;\n      top: -6px;\n      border-left: 0 none;\n      border-right: 12px solid #ddd;\n      border-top: 6px solid transparent;\n      border-bottom: 6px solid transparent; }\n    [data-ax6ui-uploader-progressbox].direction-left .ax-progressbox-arrow:after {\n      content: ' ';\n      position: absolute;\n      width: 0;\n      height: 0;\n      left: -10px;\n      top: -6px;\n      border-left: 0 none;\n      border-right: 12px solid #fff;\n      border-top: 6px solid transparent;\n      border-bottom: 6px solid transparent; }\n  [data-ax6ui-uploader-progressbox].destroy {\n    -webkit-animation: ax-progressbox-destroy 0.1s cubic-bezier(0.6, -0.28, 0.735, 0.045) forwards;\n    -moz-animation: ax-progressbox-destroy 0.1s cubic-bezier(0.6, -0.28, 0.735, 0.045) forwards;\n    animation: ax-progressbox-destroy 0.1s cubic-bezier(0.6, -0.28, 0.735, 0.045) forwards; }\n  [data-ax6ui-uploader-progressbox].direction-top {\n    -webkit-transform-origin: center top;\n    -moz-transform-origin: center top;\n    -ms-transform-origin: center top;\n    -o-transform-origin: center top;\n    transform-origin: center top; }\n  [data-ax6ui-uploader-progressbox].direction-right {\n    -webkit-transform-origin: right center;\n    -moz-transform-origin: right center;\n    -ms-transform-origin: right center;\n    -o-transform-origin: right center;\n    transform-origin: right center; }\n  [data-ax6ui-uploader-progressbox].direction-bottom {\n    -webkit-transform-origin: center bottom;\n    -moz-transform-origin: center bottom;\n    -ms-transform-origin: center bottom;\n    -o-transform-origin: center bottom;\n    transform-origin: center bottom; }\n  [data-ax6ui-uploader-progressbox].direction-left {\n    -webkit-transform-origin: left center;\n    -moz-transform-origin: left center;\n    -ms-transform-origin: left center;\n    -o-transform-origin: left center;\n    transform-origin: left center; }\n", ""]);

// exports


/***/ })
]));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdXBsb2FkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL0FYNk11c3RhY2hlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2FkYXB0ZXJzL3hoci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvY3JlYXRlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2F4aW9zLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pcy1idWZmZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2VuaGFuY2VFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idG9hLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2Rpc3BhdGNoUmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvdHJhbnNmb3JtRGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29tYmluZVVSTHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsVG9rZW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL0FYNlVJRGlhbG9nLmpzIiwid2VicGFjazovLy8uLi9zcmMvQVg2VUlEaWFsb2cvc3R5bGUuc2Nzcz9hNTgyIiwid2VicGFjazovLy8uLi9zcmMvQVg2VUlEaWFsb2cvc3R5bGUuc2NzcyIsIndlYnBhY2s6Ly8vLi4vc3JjL0FYNlVJVXBsb2FkZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9BWDZVSVVwbG9hZGVyL3N0eWxlLnNjc3M/ZDNkOSIsIndlYnBhY2s6Ly8vLi4vc3JjL0FYNlVJVXBsb2FkZXIvc3R5bGUuc2NzcyJdLCJuYW1lcyI6WyJodG1sIiwiZm4iLCJtb2R1bGVSdW4iLCIkYm9keSIsImRpYWxvZyIsInRpdGxlIiwidXBsb2FkZXIiLCJ0YXJnZXQiLCJmaW5kIiwiZm9ybSIsImFjdGlvbiIsImZpbGVOYW1lIiwibXVsdGlwbGUiLCJtYW51YWxVcGxvYWQiLCJwcm9ncmVzc0JveCIsInByb2dyZXNzQm94RGlyZWN0aW9uIiwiZHJvcFpvbmUiLCJ1cGxvYWRlZEJveCIsImljb24iLCJjb2x1bW5LZXlzIiwibmFtZSIsInR5cGUiLCJzaXplIiwidXBsb2FkZWROYW1lIiwidXBsb2FkZWRQYXRoIiwiZG93bmxvYWRQYXRoIiwicHJldmlld1BhdGgiLCJ0aHVtYm5haWwiLCJsYW5nIiwic3VwcG9ydGVkSFRNTDVfZW1wdHlMaXN0TXNnIiwiZW1wdHlMaXN0TXNnIiwib25jaGFuZ2UiLCJvbmNsaWNrIiwiZmlsZUluZGV4IiwiZmlsZSIsInVwbG9hZGVkRmlsZXMiLCJjZWxsVHlwZSIsImNvbmZpcm0iLCJtc2ciLCJrZXkiLCJoZWFkZXJzIiwibWV0aG9kIiwidXJsIiwiZGF0YSIsIkpTT04iLCJzdHJpbmdpZnkiLCJpZCIsInRoZW4iLCJyZW1vdmVGaWxlIiwiY2F0Y2giLCJhbGVydCIsImVycm9yIiwiZG93bmxvYWQiLCJsb2NhdGlvbiIsImhyZWYiLCJ2YWxpZGF0ZVNlbGVjdGVkRmlsZXMiLCJjb25zb2xlIiwibG9nIiwibGVuZ3RoIiwic2VsZWN0ZWRGaWxlcyIsIm9ucHJvZ3Jlc3MiLCJvbnVwbG9hZGVycm9yIiwibWVzc2FnZSIsIm9udXBsb2FkZWQiLCJvbnVwbG9hZENvbXBsZXRlIiwic2V0VXBsb2FkZWRGaWxlcyIsInJlcyIsIm9uIiwiZSIsImJ0biIsImN1cnJlbnRUYXJnZXQiLCJnZXRBdHRyaWJ1dGUiLCJwcm9jZXNzb3IiLCJmaWxlcyIsImRlbGV0ZUZpbGVzIiwiZm9yRWFjaCIsImYiLCJwdXNoIiwicmVtb3ZlRmlsZUFsbCIsIm1vZHVsZURlc3Ryb3kiLCJvZmYiLCJBWDYiLCJkZWZpbmVNdXN0YWNoZSIsImdsb2JhbCIsImZhY3RvcnkiLCJtdXN0YWNoZSIsIm11c3RhY2hlRmFjdG9yeSIsIm9iamVjdFRvU3RyaW5nIiwiT2JqZWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJpc0FycmF5IiwiQXJyYXkiLCJpc0FycmF5UG9seWZpbGwiLCJvYmplY3QiLCJjYWxsIiwiaXNGdW5jdGlvbiIsInR5cGVTdHIiLCJvYmoiLCJlc2NhcGVSZWdFeHAiLCJzdHJpbmciLCJyZXBsYWNlIiwiaGFzUHJvcGVydHkiLCJwcm9wTmFtZSIsInJlZ0V4cFRlc3QiLCJSZWdFeHAiLCJ0ZXN0IiwidGVzdFJlZ0V4cCIsInJlIiwibm9uU3BhY2VSZSIsImlzV2hpdGVzcGFjZSIsImVudGl0eU1hcCIsImVzY2FwZUh0bWwiLCJTdHJpbmciLCJmcm9tRW50aXR5TWFwIiwicyIsIndoaXRlUmUiLCJzcGFjZVJlIiwiZXF1YWxzUmUiLCJjdXJseVJlIiwidGFnUmUiLCJwYXJzZVRlbXBsYXRlIiwidGVtcGxhdGUiLCJ0YWdzIiwic2VjdGlvbnMiLCJ0b2tlbnMiLCJzcGFjZXMiLCJoYXNUYWciLCJub25TcGFjZSIsInN0cmlwU3BhY2UiLCJwb3AiLCJvcGVuaW5nVGFnUmUiLCJjbG9zaW5nVGFnUmUiLCJjbG9zaW5nQ3VybHlSZSIsImNvbXBpbGVUYWdzIiwidGFnc1RvQ29tcGlsZSIsInNwbGl0IiwiRXJyb3IiLCJzY2FubmVyIiwiU2Nhbm5lciIsInN0YXJ0IiwidmFsdWUiLCJjaHIiLCJ0b2tlbiIsIm9wZW5TZWN0aW9uIiwiZW9zIiwicG9zIiwic2NhblVudGlsIiwiaSIsInZhbHVlTGVuZ3RoIiwiY2hhckF0Iiwic2NhbiIsIm5lc3RUb2tlbnMiLCJzcXVhc2hUb2tlbnMiLCJzcXVhc2hlZFRva2VucyIsImxhc3RUb2tlbiIsIm51bVRva2VucyIsIm5lc3RlZFRva2VucyIsImNvbGxlY3RvciIsInNlY3Rpb24iLCJ0YWlsIiwibWF0Y2giLCJpbmRleCIsInN1YnN0cmluZyIsInNlYXJjaCIsIkNvbnRleHQiLCJ2aWV3IiwicGFyZW50Q29udGV4dCIsImNhY2hlIiwicmV0dXJucyIsImsiLCJwYXJlbnQiLCJsb29rdXAiLCJoYXNPd25Qcm9wZXJ0eSIsImNvbnRleHQiLCJuYW1lcyIsImxvb2t1cEhpdCIsImluZGV4T2YiLCJXcml0ZXIiLCJjbGVhckNhY2hlIiwicGFyc2UiLCJyZW5kZXIiLCJwYXJ0aWFscyIsInJlbmRlclRva2VucyIsIm9yaWdpbmFsVGVtcGxhdGUiLCJidWZmZXIiLCJzeW1ib2wiLCJ1bmRlZmluZWQiLCJyZW5kZXJTZWN0aW9uIiwicmVuZGVySW52ZXJ0ZWQiLCJyZW5kZXJQYXJ0aWFsIiwidW5lc2NhcGVkVmFsdWUiLCJlc2NhcGVkVmFsdWUiLCJyYXdWYWx1ZSIsInNlbGYiLCJzdWJSZW5kZXIiLCJqIiwic2xpY2UiLCJlc2NhcGUiLCJ2ZXJzaW9uIiwiZGVmYXVsdFdyaXRlciIsIlR5cGVFcnJvciIsInRvX2h0bWwiLCJzZW5kIiwicmVzdWx0IiwiZGlhbG9nVG1wbCIsIm9uU3RhdGVDaGFuZ2VkIiwib3B0cyIsInRoYXQiLCJnZXRDb250ZW50IiwiZGlhbG9nSWQiLCJjb25maWciLCJpbnB1dCIsImJ0bnMiLCJhZGRpdGlvbmFsQ29udGVudCIsIm9wZW4iLCJjYWxsYmFjayIsImJveCIsIndpZHRoIiwiZGlhbG9nQ29uZmlnIiwiJGFjdGl2ZURpYWxvZyIsImNzcyIsImRvY3VtZW50IiwiYm9keSIsImFwcGVuZCIsImhlaWdodCIsInBvc2l0aW9uIiwidG9wIiwid2luZG93IiwibGVmdCIsInpJbmRleCIsImNsaWNrRXZlbnROYW1lIiwiYnRuT25DbGljayIsImV2ZW50IiwiZGlhbG9nVHlwZSIsInRyaWdnZXIiLCJvbktleXVwIiwidGhyb3R0bGUiLCJhbGlnbiIsImJpbmQiLCJzdGF0ZSIsImF1dG9DbG9zZVRpbWUiLCJhdXRvQ2xvc2VUaW1lciIsInNldFRpbWVvdXQiLCJjbG9zZSIsImlubmVySGVpZ2h0IiwiaW5uZXJXaWR0aCIsImVtcHR5S2V5Iiwic3JjRWxlbWVudCIsImZpbmRQYXJlbnROb2RlIiwiYnRuVGFyZ2V0Iiwib2kiLCJ2YWwiLCJvbkNsaWNrIiwiZG9Ob3RDYWxsYmFjayIsImdldCIsImZvY3VzIiwia2V5Q29kZSIsImV2ZW50S2V5cyIsIkVTQyIsIlJFVFVSTiIsIkFYNlVJRGlhbG9nIiwiaW5zdGFuY2VJZCIsInRoZW1lIiwiYW5pbWF0ZVRpbWUiLCJleHRlbmQiLCJxdWV1ZSIsImluaXQiLCJpbml0T25jZSIsImluaXRpYWxpemVkIiwidHJ5Q291bnQiLCJpc1N0cmluZyIsIm9rIiwibGFiZWwiLCJjYW5jZWwiLCJfb3B0aW9uIiwiY2xlYXJUaW1lb3V0IiwiYWRkQ2xhc3MiLCJyZW1vdmUiLCJzaGlmdCIsInRtcGwiLCJ1cGxvYWRQcm9ncmVzcyIsImlucHV0RmlsZSIsImlucHV0RmlsZUZvcm0iLCJ1cG9hZGVkQm94IiwiYXBpU2VydmVyVXJsIiwib25TZWxlY3RGaWxlIiwiX2V2dCIsInN1cHBvcnRGaWxlQXBpIiwicGF0aCIsImRhdGFUcmFuc2ZlciIsInRvQXJyYXkiLCJvcGVuUHJvZ3Jlc3NCb3giLCJhbGlnbkxheW91dCIsImJpbmRFdmVudCIsIiRmaWxlU2VsZWN0b3IiLCIkaW5wdXRGaWxlIiwicmVtb3ZlQ2xhc3MiLCIkdXBsb2FkZWRCb3giLCIkdGhpcyIsImF0dHIiLCJ1cGxvYWRlZEl0ZW1JbmRleCIsIk51bWJlciIsInBhcmVudHMiLCJzdG9wRXZlbnQiLCIkZHJvcFpvbmUiLCJ0aW1lciIsIiR0YXJnZXQiLCIkIiwiY29udGFpbnMiLCJhZGRFdmVudExpc3RlbmVyIiwib25kcmFnb3ZlciIsIm9uZHJhZ291dCIsIm9uZHJvcCIsIl9URiIsIm9mZnNldCIsIm91dGVyV2lkdGgiLCJvdXRlckhlaWdodCIsImFsaWduUHJvZ3Jlc3NCb3giLCJfYWxpZ25Qcm9ncmVzc0JveCIsIiR3aW5kb3ciLCJwb3NpdGlvbk1hcmdpbiIsImRpbSIsInBpY2tlckRpbSIsInBpY2tlckRpcmVjdGlvbiIsIiRwcm9ncmVzc0JveCIsIndpbldpZHRoIiwiTWF0aCIsIm1heCIsIndpbkhlaWdodCIsInBvc2l0aW9uQ1NTIiwiJHByb2dyZXNzQm94QXJyb3ciLCJ2aWV3cG9ydCIsInNlbGVjdG9yIiwiYWN0IiwiYWJvcnQiLCIkcHJvZ3Jlc3NVcGxvYWQiLCJyZW1vdmVBdHRyIiwiJHByb2dyZXNzQWJvcnQiLCJjbG9zZVByb2dyZXNzQm94Iiwic3RhcnRVcGxvYWQiLCJ1cGxvYWRGaWxlIiwidXBsb2FkQ29tcGxldGUiLCJmb3JtRGF0YSIsIkZvcm1EYXRhIiwiZWFjaCIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib25sb2FkIiwicmVzcG9uc2UiLCJwYXJzZUpzb24iLCJkZWJ1ZyIsInVwbG9hZGVkIiwidXBsb2FkIiwidXBkYXRlUHJvZ3Jlc3NCYXIiLCJsb2FkZWQiLCJ0b3RhbCIsIl9fdXBsb2FkaW5nIiwiJGlmcmFtZSIsImRvYyIsImNvbnRlbnRXaW5kb3ciLCJjb250ZW50RG9jdW1lbnQiLCJyb290IiwiZG9jdW1lbnRFbGVtZW50IiwidGV4dENvbnRlbnQiLCJpbm5lclRleHQiLCIkaW5wdXRGaWxlRm9ybSIsInN1Ym1pdCIsInNlbGVjdGVkRmlsZXNUb3RhbCIsImZpbGVzVG90YWwiLCJuIiwiX19sb2FkZWQiLCJwZXJjZW50IiwibnVtYmVyIiwicm91bmQiLCIkcHJvZ3Jlc3NCYXIiLCIkcHJvZ3Jlc3NCYXJWYWwiLCJsZW5ndGhDb21wdXRhYmxlIiwicmVwYWludFVwbG9hZGVkQm94IiwiYXR0YWNoRmlsZVRhZyIsImNhbmNlbFVwbG9hZCIsInRleHQiLCJieXRlIiwiYWNjZXB0IiwiQVg2VUlVcGxvYWRlciIsImRlbGV0ZSIsImRlZmF1bHRCdG5zIiwiaXNPYmplY3QiLCJnZXRFcnJvciIsImRpc3BsYXkiLCJfZmlsZXMiLCJfaW5kZXgiLCJpc05hTiIsInNwbGljZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNB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QUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDOztBQUVyQztBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixVQUFVOzs7Ozs7OzsrQ0N2THRDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNENBQTRDO0FBQzVDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7Ozs7Ozs7OztBQ25MQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsTUFBTTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ2pCQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDSkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOzs7Ozs7Ozs7QUNsQkEseUM7Ozs7Ozs7QUNBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWSxNQUFNO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7Ozs7Ozs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3BCQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBLGlEQUFpRCxnQkFBZ0I7QUFDakU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDOztBQUVEOzs7Ozs7OztBQ3JGQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7Ozs7Ozs7O0FDWEE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsU0FBUztBQUNwQixXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN6QkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixhQUFhLE1BQU07QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDcEJBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUNuRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsZUFBZTs7QUFFaEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOzs7Ozs7OztBQ3BDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckIsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYyxPQUFPO0FBQ3JCLGdCQUFnQixRQUFRO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7QUNuRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7QUNuQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHdDQUF3QztBQUN4QyxPQUFPOztBQUVQO0FBQ0EsMERBQTBELHdCQUF3QjtBQUNsRjtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQztBQUNoQyw2QkFBNkIsYUFBYSxFQUFFO0FBQzVDO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7Ozs7Ozs7O0FDcERBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEIsV0FBVyxTQUFTO0FBQ3BCO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7Ozs7Ozs7O0FDbkRBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLCtCQUErQjtBQUMvQix1Q0FBdUM7QUFDdkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7Ozs7Ozs7O0FDOUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsY0FBYztBQUN6QixXQUFXLE1BQU07QUFDakIsV0FBVyxlQUFlO0FBQzFCLGFBQWEsRUFBRTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7Ozs7Ozs7O0FDbkJBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDYkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ2JBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7QUN4REE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUJBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBOztBQUVBLElBQU13SCxhQUFhLFNBQWJBLFVBQWEsQ0FBVTFMLFVBQVYsRUFBc0I7QUFDdkM7QUF3Q0QsQ0F6Q0Q7QUEwQ0EsSUFBTTJMLGlCQUFpQixTQUFqQkEsY0FBaUIsQ0FBVUMsSUFBVixFQUFnQkMsSUFBaEIsRUFBc0I7QUFDM0MsTUFBSUQsUUFBUUEsS0FBS0QsY0FBakIsRUFBaUM7QUFDL0JDLFNBQUtELGNBQUwsQ0FBb0IvRyxJQUFwQixDQUF5QmlILElBQXpCLEVBQStCQSxJQUEvQjtBQUNELEdBRkQsTUFHSyxJQUFJLEtBQUtGLGNBQVQsRUFBeUI7QUFDNUIsU0FBS0EsY0FBTCxDQUFvQi9HLElBQXBCLENBQXlCaUgsSUFBekIsRUFBK0JBLElBQS9CO0FBQ0Q7O0FBRURELFNBQU8sSUFBUDtBQUNBQyxTQUFPLElBQVA7QUFDQSxTQUFPLElBQVA7QUFDRCxDQVhEO0FBWUEsSUFBTUMsYUFBYSxTQUFiQSxVQUFhLENBQVVDLFFBQVYsRUFBb0JILElBQXBCLEVBQTBCO0FBQzNDLE1BQUlwSyxPQUFPO0FBQ1R1SyxjQUFVQSxRQUREO0FBRVQ3TSxXQUFRME0sS0FBSzFNLEtBQUwsSUFBYyxLQUFLOE0sTUFBTCxDQUFZOU0sS0FBMUIsSUFBbUMsRUFGbEM7QUFHVGlDLFNBQUssQ0FBQ3lLLEtBQUt6SyxHQUFMLElBQVksS0FBSzZLLE1BQUwsQ0FBWTdLLEdBQXhCLElBQStCLEVBQWhDLEVBQW9DK0QsT0FBcEMsQ0FBNEMsS0FBNUMsRUFBbUQsT0FBbkQsQ0FISTtBQUlUK0csV0FBT0wsS0FBS0ssS0FKSDtBQUtUQyxVQUFNTixLQUFLTSxJQUxGO0FBTVQsYUFBUyxpQkFBWTtBQUNuQixhQUFPLEtBQUtoSCxPQUFMLENBQWEsS0FBYixFQUFvQixPQUFwQixDQUFQO0FBQ0QsS0FSUTtBQVNUaUgsdUJBQW9CLFVBQVVBLGlCQUFWLEVBQTZCO0FBQy9DLFVBQUksa0JBQUV0SCxVQUFGLENBQWFzSCxpQkFBYixDQUFKLEVBQXFDO0FBQ25DLGVBQU9BLGtCQUFrQnZILElBQWxCLENBQXVCZ0gsSUFBdkIsQ0FBUDtBQUNELE9BRkQsTUFHSztBQUNILGVBQU9PLGlCQUFQO0FBQ0Q7QUFDRixLQVBrQixDQU9oQlAsS0FBS08saUJBUFc7QUFUVixHQUFYOztBQW1CQSxTQUFPLHNCQUFTakMsTUFBVCxDQUFnQndCLFdBQVc5RyxJQUFYLENBQWdCLElBQWhCLENBQWhCLEVBQXVDcEQsSUFBdkMsQ0FBUDtBQUNELENBckJEO0FBc0JBLElBQU00SyxPQUFPLFNBQVBBLElBQU8sQ0FBVVIsSUFBVixFQUFnQlMsUUFBaEIsRUFBMEI7QUFBQTs7QUFDckMsTUFBSXRFLE1BQU0sRUFBVjtBQUFBLE1BQ0l1RSxNQUFNO0FBQ0pDLFdBQU9YLEtBQUtXO0FBRFIsR0FEVjs7QUFLQSxPQUFLQyxZQUFMLEdBQW9CWixJQUFwQjtBQUNBLE9BQUthLGFBQUwsR0FBcUIscUJBQU9YLFdBQVdsSCxJQUFYLENBQWdCLElBQWhCLEVBQXNCZ0gsS0FBS2pLLEVBQTNCLEVBQStCaUssSUFBL0IsQ0FBUCxDQUFyQjtBQUNBLE9BQUthLGFBQUwsQ0FBbUJDLEdBQW5CLENBQXVCLEVBQUNILE9BQU9ELElBQUlDLEtBQVosRUFBdkI7QUFDQSx1QkFBT0ksU0FBU0MsSUFBaEIsRUFBc0JDLE1BQXRCLENBQTZCLEtBQUtKLGFBQWxDOztBQUVBLE1BQUksT0FBT0osUUFBUCxLQUFvQixXQUF4QixFQUFxQztBQUNuQ0EsZUFBV1QsS0FBS1MsUUFBaEI7QUFDRDs7QUFFRDtBQUNBVCxPQUFLa0IsTUFBTCxHQUFjUixJQUFJUSxNQUFKLEdBQWEsS0FBS0wsYUFBTCxDQUFtQkssTUFBbkIsRUFBM0I7O0FBRUE7QUFDQSxNQUFJLE9BQU9sQixLQUFLbUIsUUFBWixLQUF5QixXQUF6QixJQUF3Q25CLEtBQUttQixRQUFMLEtBQWtCLFFBQTlELEVBQXdFO0FBQ3RFaEYsUUFBSWlGLEdBQUosR0FBVSxxQkFBT0MsTUFBUCxFQUFlSCxNQUFmLEtBQTBCLENBQTFCLEdBQThCUixJQUFJUSxNQUFKLEdBQWEsQ0FBckQ7QUFDQS9FLFFBQUltRixJQUFKLEdBQVcscUJBQU9ELE1BQVAsRUFBZVYsS0FBZixLQUF5QixDQUF6QixHQUE2QkQsSUFBSUMsS0FBSixHQUFZLENBQXBEO0FBQ0QsR0FIRCxNQUlLO0FBQ0h4RSxRQUFJbUYsSUFBSixHQUFXdEIsS0FBS21CLFFBQUwsQ0FBY0csSUFBZCxJQUFzQixDQUFqQztBQUNBbkYsUUFBSWlGLEdBQUosR0FBVXBCLEtBQUttQixRQUFMLENBQWNDLEdBQWQsSUFBcUIsQ0FBL0I7QUFDRDtBQUNELE1BQUksS0FBS2hCLE1BQUwsQ0FBWW1CLE1BQWhCLEVBQXdCO0FBQ3RCcEYsUUFBSSxTQUFKLElBQWlCLEtBQUtpRSxNQUFMLENBQVltQixNQUE3QjtBQUNEOztBQUVELE9BQUtWLGFBQUwsQ0FDR0MsR0FESCxDQUNPM0UsR0FEUCxFQUVHL0UsRUFGSCxDQUVNNEksS0FBS3dCLGNBRlgsRUFFMkIsbUJBRjNCLEVBRWdELFVBQUNuSyxDQUFELEVBQU87QUFDbkRvSyxlQUFXekksSUFBWCxRQUFzQjNCLEtBQUtnSyxPQUFPSyxLQUFsQyxFQUF5QzFCLElBQXpDLEVBQStDUyxRQUEvQztBQUNELEdBSkgsRUFLR2hOLElBTEgsQ0FLUXVNLEtBQUsyQixVQUFMLEtBQW9CLFFBQXBCLEdBQStCLHNCQUEvQixHQUF3RCxtQkFMaEUsRUFLcUZDLE9BTHJGLENBSzZGLE9BTDdGOztBQVFBO0FBQ0EsdUJBQU9QLE1BQVAsRUFDR2pLLEVBREgsQ0FDTSxtQkFETixFQUMyQixVQUFDQyxDQUFELEVBQU87QUFDOUJ3SyxZQUFRN0ksSUFBUixRQUFtQjNCLEtBQUtnSyxPQUFPSyxLQUEvQixFQUFzQzFCLElBQXRDLEVBQTRDUyxRQUE1QztBQUNELEdBSEgsRUFJR3JKLEVBSkgsQ0FJTSxrQkFKTixFQUkwQixrQkFBRTBLLFFBQUYsQ0FBVyxVQUFVekssQ0FBVixFQUFhO0FBQzlDMEssVUFBTS9JLElBQU4sQ0FBVyxJQUFYLEVBQWlCM0IsS0FBS2dLLE9BQU9LLEtBQTdCO0FBQ0QsR0FGdUIsRUFFckIsRUFGcUIsRUFFakJNLElBRmlCLENBRVosSUFGWSxDQUoxQjs7QUFRQWpDLGlCQUFlL0csSUFBZixDQUFvQixJQUFwQixFQUEwQmdILElBQTFCLEVBQWdDO0FBQzlCYixVQUFNLElBRHdCO0FBRTlCOEMsV0FBTztBQUZ1QixHQUFoQzs7QUFLQSxNQUFJakMsS0FBS2tDLGFBQVQsRUFBd0I7QUFDdEIsU0FBS0MsY0FBTCxHQUFzQkMsV0FBVyxZQUFNO0FBQ3JDLFlBQUtDLEtBQUw7QUFDRCxLQUZxQixFQUVuQnJDLEtBQUtrQyxhQUZjLENBQXRCO0FBR0Q7O0FBRUQvRixRQUFNLElBQU47QUFDQXVFLFFBQU0sSUFBTjtBQUNELENBN0REO0FBOERBLElBQU1xQixRQUFRLFNBQVJBLEtBQVEsQ0FBVTFLLENBQVYsRUFBYTtBQUN6QixNQUFJLENBQUMsS0FBS3dKLGFBQVYsRUFBeUIsT0FBTyxJQUFQO0FBQ3pCLE1BQUliLE9BQU8sS0FBS1ksWUFBaEI7QUFBQSxNQUNJRixNQUFPO0FBQ0xDLFdBQU9YLEtBQUtXLEtBRFA7QUFFTE8sWUFBUWxCLEtBQUtrQjtBQUZSLEdBRFg7O0FBTUE7QUFDQSxNQUFJLE9BQU9sQixLQUFLbUIsUUFBWixLQUF5QixXQUF6QixJQUF3Q25CLEtBQUttQixRQUFMLEtBQWtCLFFBQTlELEVBQXdFO0FBQ3RFVCxRQUFJVSxHQUFKLEdBQVVDLE9BQU9pQixXQUFQLEdBQXFCLENBQXJCLEdBQXlCNUIsSUFBSVEsTUFBSixHQUFhLENBQWhEO0FBQ0FSLFFBQUlZLElBQUosR0FBV0QsT0FBT2tCLFVBQVAsR0FBb0IsQ0FBcEIsR0FBd0I3QixJQUFJQyxLQUFKLEdBQVksQ0FBL0M7QUFDRCxHQUhELE1BSUs7QUFDSEQsUUFBSVksSUFBSixHQUFXdEIsS0FBS21CLFFBQUwsQ0FBY0csSUFBZCxJQUFzQixDQUFqQztBQUNBWixRQUFJVSxHQUFKLEdBQVVwQixLQUFLbUIsUUFBTCxDQUFjQyxHQUFkLElBQXFCLENBQS9CO0FBQ0Q7QUFDRCxNQUFJVixJQUFJWSxJQUFKLEdBQVcsQ0FBZixFQUFrQlosSUFBSVksSUFBSixHQUFXLENBQVg7QUFDbEIsTUFBSVosSUFBSVUsR0FBSixHQUFVLENBQWQsRUFBaUJWLElBQUlVLEdBQUosR0FBVSxDQUFWOztBQUVqQixPQUFLUCxhQUFMLENBQW1CQyxHQUFuQixDQUF1QkosR0FBdkI7O0FBRUFWLFNBQU8sSUFBUDtBQUNBVSxRQUFNLElBQU47O0FBRUEsU0FBTyxJQUFQO0FBQ0QsQ0ExQkQ7QUEyQkEsSUFBTWUsYUFBYSxTQUFiQSxVQUFhLENBQVVwSyxDQUFWLEVBQWEySSxJQUFiLEVBQW1CUyxRQUFuQixFQUE2QmpOLE1BQTdCLEVBQXFDbUssQ0FBckMsRUFBd0M7QUFDekQsTUFBSXNDLGFBQUo7QUFBQSxNQUNJdUMsV0FBVyxJQURmOztBQUdBLE1BQUluTCxFQUFFb0wsVUFBTixFQUFrQnBMLEVBQUU3RCxNQUFGLEdBQVc2RCxFQUFFb0wsVUFBYjs7QUFFbEJqUCxXQUFTLGtCQUFFa1AsY0FBRixDQUFpQnJMLEVBQUU3RCxNQUFuQixFQUEyQixVQUFVQSxNQUFWLEVBQWtCO0FBQ3BELFFBQUlBLE9BQU9nRSxZQUFQLENBQW9CLGlCQUFwQixDQUFKLEVBQTRDO0FBQzFDLGFBQU8sSUFBUDtBQUNEO0FBQ0YsR0FKUSxDQUFUOztBQU1BLE1BQUloRSxNQUFKLEVBQVk7QUFDVm1LLFFBQUluSyxPQUFPZ0UsWUFBUCxDQUFvQixpQkFBcEIsQ0FBSjs7QUFFQXlJLFdBQU87QUFDTGQsWUFBTSxJQUREO0FBRUwzSixXQUFLbUksQ0FGQSxFQUVHN0IsT0FBT2tFLEtBQUtNLElBQUwsQ0FBVTNDLENBQVYsQ0FGVjtBQUdMd0MsZ0JBQVVILEtBQUtqSyxFQUhWO0FBSUw0TSxpQkFBV25QO0FBSk4sS0FBUDtBQU1BLFFBQUl3TSxLQUFLMkIsVUFBTCxLQUFvQixRQUF4QixFQUFrQztBQUNoQyxXQUFLLElBQUlpQixFQUFULElBQWU1QyxLQUFLSyxLQUFwQixFQUEyQjtBQUN6QkosYUFBSzJDLEVBQUwsSUFBVyxLQUFLL0IsYUFBTCxDQUFtQnBOLElBQW5CLENBQXdCLHlCQUF5Qm1QLEVBQXpCLEdBQThCLEdBQXRELEVBQTJEQyxHQUEzRCxFQUFYO0FBQ0EsWUFBSTVDLEtBQUsyQyxFQUFMLEtBQVksRUFBWixJQUFrQjNDLEtBQUsyQyxFQUFMLEtBQVksSUFBbEMsRUFBd0M7QUFDdENKLHFCQUFXSSxFQUFYO0FBQ0E7QUFDRDtBQUNGO0FBQ0Y7QUFDRCxRQUFJNUMsS0FBS00sSUFBTCxDQUFVM0MsQ0FBVixFQUFhbUYsT0FBakIsRUFBMEI7QUFDeEI5QyxXQUFLTSxJQUFMLENBQVUzQyxDQUFWLEVBQWFtRixPQUFiLENBQXFCOUosSUFBckIsQ0FBMEJpSCxJQUExQixFQUFnQ0EsSUFBaEM7QUFDRCxLQUZELE1BR0ssSUFBSUQsS0FBSzJCLFVBQUwsS0FBb0IsT0FBeEIsRUFBaUM7QUFDcEMsVUFBSWxCLFFBQUosRUFBY0EsU0FBU3pILElBQVQsQ0FBY2lILElBQWQsRUFBb0JBLElBQXBCO0FBQ2QsV0FBS29DLEtBQUwsQ0FBVyxFQUFDVSxlQUFlLElBQWhCLEVBQVg7QUFDRCxLQUhJLE1BSUEsSUFBSS9DLEtBQUsyQixVQUFMLEtBQW9CLFNBQXhCLEVBQW1DO0FBQ3RDLFVBQUlsQixRQUFKLEVBQWNBLFNBQVN6SCxJQUFULENBQWNpSCxJQUFkLEVBQW9CQSxJQUFwQjtBQUNkLFdBQUtvQyxLQUFMLENBQVcsRUFBQ1UsZUFBZSxJQUFoQixFQUFYO0FBQ0QsS0FISSxNQUlBLElBQUkvQyxLQUFLMkIsVUFBTCxLQUFvQixRQUF4QixFQUFrQztBQUNyQyxVQUFJaEUsTUFBTSxJQUFWLEVBQWdCO0FBQ2QsWUFBSTZFLFFBQUosRUFBYztBQUNaLGVBQUszQixhQUFMLENBQW1CcE4sSUFBbkIsQ0FBd0IsMEJBQTBCK08sUUFBMUIsR0FBcUMsSUFBN0QsRUFBbUVRLEdBQW5FLENBQXVFLENBQXZFLEVBQTBFQyxLQUExRTtBQUNBLGlCQUFPLEtBQVA7QUFDRDtBQUNGO0FBQ0QsVUFBSXhDLFFBQUosRUFBY0EsU0FBU3pILElBQVQsQ0FBY2lILElBQWQsRUFBb0JBLElBQXBCO0FBQ2QsV0FBS29DLEtBQUwsQ0FBVyxFQUFDVSxlQUFlLElBQWhCLEVBQVg7QUFDRDtBQUNGOztBQUVEOUMsU0FBTyxJQUFQO0FBQ0FELFNBQU8sSUFBUDtBQUNBUyxhQUFXLElBQVg7QUFDQWpOLFdBQVMsSUFBVDtBQUNBbUssTUFBSSxJQUFKO0FBQ0QsQ0ExREQ7QUEyREEsSUFBTWtFLFVBQVUsU0FBVkEsT0FBVSxDQUFVeEssQ0FBVixFQUFhMkksSUFBYixFQUFtQlMsUUFBbkIsRUFBNkJqTixNQUE3QixFQUFxQ21LLENBQXJDLEVBQXdDO0FBQ3RELE1BQUlzQyxhQUFKO0FBQUEsTUFDSXVDLFdBQVcsSUFEZjs7QUFHQSxNQUFJbkwsRUFBRTZMLE9BQUYsSUFBYSxrQkFBS0MsU0FBTCxDQUFlQyxHQUFoQyxFQUFxQztBQUNuQyxTQUFLZixLQUFMO0FBQ0Q7QUFDRCxNQUFJckMsS0FBSzJCLFVBQUwsS0FBb0IsUUFBeEIsRUFBa0M7QUFDaEMsUUFBSXRLLEVBQUU2TCxPQUFGLElBQWEsa0JBQUtDLFNBQUwsQ0FBZUUsTUFBaEMsRUFBd0M7QUFDdENwRCxhQUFPO0FBQ0xkLGNBQU0sSUFERDtBQUVMM0osYUFBS21JLENBRkEsRUFFRzdCLE9BQU9rRSxLQUFLTSxJQUFMLENBQVUzQyxDQUFWLENBRlY7QUFHTHdDLGtCQUFVSCxLQUFLakssRUFIVjtBQUlMNE0sbUJBQVduUDtBQUpOLE9BQVA7O0FBT0EsV0FBSyxJQUFJb1AsRUFBVCxJQUFlNUMsS0FBS0ssS0FBcEIsRUFBMkI7QUFDekJKLGFBQUsyQyxFQUFMLElBQVcsS0FBSy9CLGFBQUwsQ0FBbUJwTixJQUFuQixDQUF3Qix5QkFBeUJtUCxFQUF6QixHQUE4QixHQUF0RCxFQUEyREMsR0FBM0QsRUFBWDtBQUNBLFlBQUk1QyxLQUFLMkMsRUFBTCxLQUFZLEVBQVosSUFBa0IzQyxLQUFLMkMsRUFBTCxLQUFZLElBQWxDLEVBQXdDO0FBQ3RDSixxQkFBV0ksRUFBWDtBQUNBO0FBQ0Q7QUFDRjtBQUNELFVBQUlKLFFBQUosRUFBYztBQUNadkMsZUFBTyxJQUFQO0FBQ0F1QyxtQkFBVyxJQUFYO0FBQ0EsZUFBTyxLQUFQO0FBQ0Q7QUFDRCxVQUFJL0IsUUFBSixFQUFjQSxTQUFTekgsSUFBVCxDQUFjaUgsSUFBZCxFQUFvQkEsSUFBcEI7QUFDZCxXQUFLb0MsS0FBTCxDQUFXLEVBQUNVLGVBQWUsSUFBaEIsRUFBWDtBQUNEO0FBQ0Y7O0FBRUQ5QyxTQUFPLElBQVA7QUFDQXVDLGFBQVcsSUFBWDtBQUNBeEMsU0FBTyxJQUFQO0FBQ0FTLGFBQVcsSUFBWDtBQUNBak4sV0FBUyxJQUFUO0FBQ0FtSyxNQUFJLElBQUo7QUFDRCxDQXZDRDs7QUF5Q0E7O0FBRUE7Ozs7SUFHTTJGLFc7OztBQUNKOzs7O0FBSUEsdUJBQVlsRCxNQUFaLEVBQW9CO0FBQUE7O0FBR2xCOzs7Ozs7Ozs7Ozs7Ozs7QUFIa0I7O0FBa0JsQixXQUFLQSxNQUFMLEdBQWM7QUFDWnJLLFVBQUksZ0JBQWdCLE9BQUt3TixVQURiO0FBRVovQixzQkFBZ0IsT0FGSjtBQUdaZ0MsYUFBTyxTQUhLO0FBSVo3QyxhQUFPLEdBSks7QUFLWnJOLGFBQU8sYUFMSztBQU1aaUMsV0FBSyxFQU5PO0FBT1pWLFlBQU07QUFDSixjQUFNLElBREYsRUFDUSxVQUFVO0FBRGxCLE9BUE07QUFVWjRPLG1CQUFhLEdBVkQ7QUFXWnZCLHFCQUFlO0FBWEgsS0FBZDtBQWFBLG9CQUFPd0IsTUFBUCxDQUFjLElBQWQsRUFBb0IsT0FBS3RELE1BQXpCLEVBQWlDQSxNQUFqQzs7QUFFQTtBQUNBOzs7O0FBSUEsV0FBS3VELEtBQUwsR0FBYSxFQUFiO0FBQ0E7OztBQUdBLFdBQUs5QyxhQUFMLEdBQXFCLElBQXJCO0FBQ0E7OztBQUdBLFdBQUtzQixjQUFMLEdBQXNCLElBQXRCOztBQUVBLFdBQUt5QixJQUFMO0FBaERrQjtBQWlEbkI7O0FBRUQ7Ozs7Ozs7OzJCQUlPO0FBQ0wsV0FBSzdELGNBQUwsR0FBc0IsS0FBS0ssTUFBTCxDQUFZTCxjQUFsQztBQUNBLGFBQU8sS0FBS0ssTUFBTCxDQUFZTCxjQUFuQjs7QUFFQTtBQUNBLFdBQUs4RCxRQUFMO0FBQ0Q7O0FBRUQ7Ozs7OzsrQkFHVztBQUNULFVBQUksS0FBS0MsV0FBVCxFQUFzQixPQUFPLElBQVA7QUFDdEIsV0FBS0EsV0FBTCxHQUFtQixJQUFuQjtBQUNEOztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBa0JNOUQsSSxFQUFNUyxRLEVBQVVzRCxRLEVBQVU7QUFDOUIsVUFBSSxPQUFPL0QsSUFBUCxLQUFnQixXQUFwQixFQUFpQztBQUMvQkEsZUFBTztBQUNMMU0saUJBQU8sS0FBSzhNLE1BQUwsQ0FBWTlNLEtBRGQ7QUFFTGlDLGVBQUs7QUFGQSxTQUFQO0FBSUQsT0FMRCxNQUtPLElBQUksa0JBQUV5TyxRQUFGLENBQVdoRSxJQUFYLENBQUosRUFBc0I7QUFDM0JBLGVBQU87QUFDTDFNLGlCQUFPLEtBQUs4TSxNQUFMLENBQVk5TSxLQURkO0FBRUxpQyxlQUFLeUs7QUFGQSxTQUFQO0FBSUQ7O0FBRURBLGFBQU8sZ0JBQU8wRCxNQUFQLENBQWMsSUFBZCxFQUFvQixFQUFwQixFQUF3QixLQUFLdEQsTUFBN0IsRUFBcUNKLElBQXJDLEVBQTJDO0FBQ2hEMkIsb0JBQVksT0FEb0M7QUFFaERsQixrQkFBVUE7QUFGc0MsT0FBM0MsQ0FBUDs7QUFLQSxVQUFJLE9BQU9ULEtBQUtNLElBQVosS0FBcUIsV0FBekIsRUFBc0M7QUFDcENOLGFBQUtNLElBQUwsR0FBWTtBQUNWMkQsY0FBSSxFQUFDQyxPQUFPbEUsS0FBS25MLElBQUwsQ0FBVSxJQUFWLENBQVIsRUFBeUIyTyxPQUFPeEQsS0FBS3dELEtBQXJDO0FBRE0sU0FBWjtBQUdEOztBQUVELFVBQUksS0FBSzNDLGFBQVQsRUFBd0I7QUFDdEIsYUFBSzhDLEtBQUwsQ0FBVzdMLElBQVgsQ0FBZ0JrSSxJQUFoQjtBQUNELE9BRkQsTUFFTztBQUNMUSxhQUFLeEgsSUFBTCxDQUFVLElBQVYsRUFBZ0JnSCxJQUFoQixFQUFzQlMsUUFBdEI7QUFDRDtBQUNGOztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzRCQXFDUVQsSSxFQUFNUyxRLEVBQVVzRCxRLEVBQVU7QUFDaEMsVUFBSSxPQUFPL0QsSUFBUCxLQUFnQixXQUFwQixFQUFpQztBQUMvQkEsZUFBTztBQUNMMU0saUJBQU8sS0FBSzhNLE1BQUwsQ0FBWTlNLEtBRGQ7QUFFTGlDLGVBQUs7QUFGQSxTQUFQO0FBSUQsT0FMRCxNQUtPLElBQUksa0JBQUV5TyxRQUFGLENBQVdoRSxJQUFYLENBQUosRUFBc0I7QUFDM0JBLGVBQU87QUFDTDFNLGlCQUFPLEtBQUs4TSxNQUFMLENBQVk5TSxLQURkO0FBRUxpQyxlQUFLeUs7QUFGQSxTQUFQO0FBSUQ7O0FBRURBLGFBQU8sZ0JBQU8wRCxNQUFQLENBQWMsSUFBZCxFQUFvQixFQUFwQixFQUF3QixLQUFLdEQsTUFBN0IsRUFBcUNKLElBQXJDLEVBQTJDO0FBQ2hEMkIsb0JBQVksU0FEb0M7QUFFaERsQixrQkFBVUE7QUFGc0MsT0FBM0MsQ0FBUDs7QUFLQSxVQUFJLE9BQU9ULEtBQUtNLElBQVosS0FBcUIsV0FBekIsRUFBc0M7QUFDcENOLGFBQUtNLElBQUwsR0FBWTtBQUNWMkQsY0FBSSxFQUFDQyxPQUFPbEUsS0FBS25MLElBQUwsQ0FBVSxJQUFWLENBQVIsRUFBeUIyTyxPQUFPeEQsS0FBS3dELEtBQXJDLEVBRE07QUFFVlcsa0JBQVEsRUFBQ0QsT0FBT2xFLEtBQUtuTCxJQUFMLENBQVUsUUFBVixDQUFSO0FBRkUsU0FBWjtBQUlEOztBQUVELFVBQUksS0FBS2dNLGFBQVQsRUFBd0I7QUFDdEIsYUFBSzhDLEtBQUwsQ0FBVzdMLElBQVgsQ0FBZ0JrSSxJQUFoQjtBQUNELE9BRkQsTUFFTztBQUNMUSxhQUFLeEgsSUFBTCxDQUFVLElBQVYsRUFBZ0JnSCxJQUFoQixFQUFzQlMsUUFBdEI7QUFDRDs7QUFFRCxhQUFPLElBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzJCQXdCT1QsSSxFQUFNUyxRLEVBQVVzRCxRLEVBQVU7QUFDL0IsVUFBSSxPQUFPL0QsSUFBUCxLQUFnQixXQUFwQixFQUFpQztBQUMvQkEsZUFBTztBQUNMMU0saUJBQU8sS0FBSzhNLE1BQUwsQ0FBWTlNLEtBRGQ7QUFFTGlDLGVBQUs7QUFGQSxTQUFQO0FBSUQsT0FMRCxNQUtPLElBQUksa0JBQUV5TyxRQUFGLENBQVdoRSxJQUFYLENBQUosRUFBc0I7QUFDM0JBLGVBQU87QUFDTDFNLGlCQUFPLEtBQUs4TSxNQUFMLENBQVk5TSxLQURkO0FBRUxpQyxlQUFLeUs7QUFGQSxTQUFQO0FBSUQ7O0FBRURBLGFBQU8sZ0JBQU8wRCxNQUFQLENBQWMsSUFBZCxFQUFvQixFQUFwQixFQUF3QixLQUFLdEQsTUFBN0IsRUFBcUNKLElBQXJDLEVBQTJDO0FBQ2hEMkIsb0JBQVksUUFEb0M7QUFFaERsQixrQkFBVUE7QUFGc0MsT0FBM0MsQ0FBUDs7QUFLQSxVQUFJLE9BQU9ULEtBQUtLLEtBQVosS0FBc0IsV0FBMUIsRUFBdUM7QUFDckNMLGFBQUtLLEtBQUwsR0FBYTtBQUNYdkUsaUJBQU8sRUFBQ29JLE9BQU8sRUFBUjtBQURJLFNBQWI7QUFHRDtBQUNELFVBQUksT0FBT2xFLEtBQUtNLElBQVosS0FBcUIsV0FBekIsRUFBc0M7QUFDcENOLGFBQUtNLElBQUwsR0FBWTtBQUNWMkQsY0FBSSxFQUFDQyxPQUFPbEUsS0FBS25MLElBQUwsQ0FBVSxJQUFWLENBQVIsRUFBeUIyTyxPQUFPeEQsS0FBS3dELEtBQXJDLEVBRE07QUFFVlcsa0JBQVEsRUFBQ0QsT0FBT2xFLEtBQUtuTCxJQUFMLENBQVUsUUFBVixDQUFSO0FBRkUsU0FBWjtBQUlEOztBQUVELFVBQUksS0FBS2dNLGFBQVQsRUFBd0I7QUFDdEIsYUFBSzhDLEtBQUwsQ0FBVzdMLElBQVgsQ0FBZ0JrSSxJQUFoQjtBQUNELE9BRkQsTUFFTztBQUNMUSxhQUFLeEgsSUFBTCxDQUFVLElBQVYsRUFBZ0JnSCxJQUFoQixFQUFzQlMsUUFBdEI7QUFDRDs7QUFFRCxhQUFPLElBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7OzBCQVlNMkQsTyxFQUFTO0FBQ2IsVUFBSXBFLGFBQUo7QUFBQSxVQUFVQyxhQUFWOztBQUVBLFVBQUksS0FBS1ksYUFBVCxFQUF3QjtBQUN0QixZQUFJLEtBQUtzQixjQUFULEVBQXlCa0MsYUFBYSxLQUFLbEMsY0FBbEI7O0FBRXpCbkMsZUFBTyxLQUFLWSxZQUFaOztBQUVBLGFBQUtDLGFBQUwsQ0FBbUJ5RCxRQUFuQixDQUE0QixTQUE1QjtBQUNBLDZCQUFPakQsTUFBUCxFQUNHcEosR0FESCxDQUNPLG1CQURQLEVBRUdBLEdBRkgsQ0FFTyxrQkFGUDs7QUFJQW1LLG1CQUFZLFlBQVk7QUFDdEIsY0FBSSxLQUFLdkIsYUFBVCxFQUF3QjtBQUN0QixpQkFBS0EsYUFBTCxDQUFtQjBELE1BQW5CO0FBQ0EsaUJBQUsxRCxhQUFMLEdBQXFCLElBQXJCO0FBQ0Q7O0FBRURaLGlCQUFPO0FBQ0xkLGtCQUFNLElBREQ7QUFFTDhDLG1CQUFPLE9BRkY7QUFHTDlCLHNCQUFVSCxLQUFLaks7QUFIVixXQUFQOztBQU1BLGNBQUlxTyxXQUFXLGtCQUFFbkwsVUFBRixDQUFhbUwsUUFBUTNELFFBQXJCLENBQWYsRUFBK0M7QUFDN0MyRCxvQkFBUTNELFFBQVIsQ0FBaUJ6SCxJQUFqQixDQUFzQmlILElBQXRCLEVBQTRCQSxJQUE1QjtBQUNELFdBRkQsTUFFTyxJQUFJRCxLQUFLUyxRQUFMLEtBQWtCLENBQUMyRCxPQUFELElBQVksQ0FBQ0EsUUFBUXJCLGFBQXZDLENBQUosRUFBMkQ7QUFDaEUvQyxpQkFBS1MsUUFBTCxDQUFjekgsSUFBZCxDQUFtQmlILElBQW5CLEVBQXlCQSxJQUF6QjtBQUNEOztBQUVELGNBQUlELFFBQVFBLEtBQUtELGNBQWpCLEVBQWlDO0FBQy9CQyxpQkFBS0QsY0FBTCxDQUFvQi9HLElBQXBCLENBQXlCaUgsSUFBekIsRUFBK0JBLElBQS9CO0FBQ0QsV0FGRCxNQUdLLElBQUksS0FBS0YsY0FBVCxFQUF5QjtBQUM1QixpQkFBS0EsY0FBTCxDQUFvQi9HLElBQXBCLENBQXlCaUgsSUFBekIsRUFBK0JBLElBQS9CO0FBQ0Q7O0FBRUQ7QUFDQSxjQUFJLEtBQUswRCxLQUFMLElBQWMsS0FBS0EsS0FBTCxDQUFXaE4sTUFBN0IsRUFBcUM7QUFDbkM2SixpQkFBS3hILElBQUwsQ0FBVSxJQUFWLEVBQWdCLEtBQUsySyxLQUFMLENBQVdhLEtBQVgsRUFBaEI7QUFDRDs7QUFFRHhFLGlCQUFPLElBQVA7QUFDQUMsaUJBQU8sSUFBUDtBQUNELFNBaENVLENBZ0NSK0IsSUFoQ1EsQ0FnQ0gsSUFoQ0csQ0FBWCxFQWdDZSxLQUFLNUIsTUFBTCxDQUFZcUQsV0FoQzNCO0FBaUNEO0FBQ0QsYUFBTyxJQUFQO0FBQ0Q7Ozs7OztrQkFHWUgsVzs7Ozs7O0FDeGxCZjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxnQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDLEM7Ozs7OztBQ3pCQTtBQUNBOzs7QUFHQTtBQUNBLHVEQUF3RCxRQUFRLG1CQUFtQixtQ0FBbUMsRUFBRSxVQUFVLG1CQUFtQixxQ0FBcUMsRUFBRSxVQUFVLG1CQUFtQixtQ0FBbUMsRUFBRSxFQUFFLCtCQUErQixRQUFRLG1CQUFtQixnQ0FBZ0MsRUFBRSxVQUFVLG1CQUFtQixrQ0FBa0MsRUFBRSxVQUFVLG1CQUFtQixnQ0FBZ0MsRUFBRSxFQUFFLDBCQUEwQixRQUFRLG1CQUFtQixtQ0FBbUMsZ0NBQWdDLCtCQUErQiw4QkFBOEIsMkJBQTJCLEVBQUUsVUFBVSxtQkFBbUIscUNBQXFDLGtDQUFrQyxpQ0FBaUMsZ0NBQWdDLDZCQUE2QixFQUFFLFVBQVUsbUJBQW1CLG1DQUFtQyxnQ0FBZ0MsK0JBQStCLDhCQUE4QiwyQkFBMkIsRUFBRSxFQUFFLDBDQUEwQyxVQUFVLHlDQUF5QyxtQkFBbUIsRUFBRSxRQUFRLDJDQUEyQyxtQkFBbUIsRUFBRSxFQUFFLHVDQUF1QyxVQUFVLHNDQUFzQyxtQkFBbUIsRUFBRSxRQUFRLHdDQUF3QyxtQkFBbUIsRUFBRSxFQUFFLGtDQUFrQyxVQUFVLHlDQUF5QyxzQ0FBc0MscUNBQXFDLG9DQUFvQyxpQ0FBaUMsbUJBQW1CLEVBQUUsUUFBUSwyQ0FBMkMsd0NBQXdDLHVDQUF1QyxzQ0FBc0MsbUNBQW1DLG1CQUFtQixFQUFFLEVBQUUseUJBQXlCLCtFQUErRSw0RUFBNEUsdUVBQXVFLHFDQUFxQyxrQ0FBa0MsaUNBQWlDLGdDQUFnQyw2QkFBNkIsMkJBQTJCLDJCQUEyQiwyQkFBMkIsdUJBQXVCLHFEQUFxRCxrQkFBa0Isb0JBQW9CLFlBQVksV0FBVyxxQkFBcUIsMkJBQTJCLEVBQUUsMkNBQTJDLHVCQUF1Qix5QkFBeUIsMkNBQTJDLEVBQUUsb0RBQW9ELHlCQUF5Qix1QkFBdUIsK0JBQStCLEVBQUUseUNBQXlDLG9CQUFvQix5QkFBeUIsRUFBRSwwREFBMEQsMEJBQTBCLDZCQUE2QixFQUFFLDZEQUE2RCx5QkFBeUIsOEJBQThCLEVBQUUsOERBQThELHlCQUF5QixFQUFFLHdGQUF3Riw0QkFBNEIsRUFBRSxvRkFBb0YseUJBQXlCLEVBQUUsMkNBQTJDLGtCQUFrQiwwQkFBMEIsRUFBRSxvREFBb0QsdUJBQXVCLCtCQUErQixFQUFFLGlDQUFpQyxpR0FBaUcsOEZBQThGLHlGQUF5RixFQUFFOztBQUVuN0g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFDQTs7QUFHQSxJQUFJbUIsT0FBTztBQUNUQyxnQkFEUywwQkFDTXRRLFVBRE4sRUFDa0I7QUFDekI7QUFDRCxHQUhRO0FBSVR1USxXQUpTLHFCQUlDdlEsVUFKRCxFQUlhO0FBQ3BCO0FBQ0QsR0FOUTtBQU9Ud1EsZUFQUyx5QkFPS3hRLFVBUEwsRUFPaUI7QUFDeEI7QUFDRCxHQVRRO0FBVVRMLGFBVlMsdUJBVUdLLFVBVkgsRUFVZTtBQUN0QjtBQXVCRCxHQWxDUTtBQW1DVHlRLFlBbkNTLHNCQW1DRXpRLFVBbkNGLEVBbUNjO0FBQ3JCLDhJQUdTQSxXQUFXUSxTQUhwQixxQkFHNENSLFdBQVcwUSxZQUh2RCxVQUd3RTFRLFdBQVdRLFNBSG5GLGdCQUdzR1IsV0FBV1EsU0FIakgsNlBBTzJFUixXQUFXQyxJQVB0RixxSEFRNkZELFdBQVdHLElBUnhHO0FBbUJEO0FBdkRRLENBQVg7O0FBMERBLElBQU13TCxpQkFBaUIsU0FBakJBLGNBQWlCLENBQVVFLElBQVYsRUFBZ0I7QUFDckMsTUFBSSxLQUFLRyxNQUFMLENBQVlMLGNBQWhCLEVBQWdDO0FBQzlCLFNBQUtLLE1BQUwsQ0FBWUwsY0FBWixDQUEyQi9HLElBQTNCLENBQWdDaUgsSUFBaEMsRUFBc0NBLElBQXRDO0FBQ0QsR0FGRCxNQUdLLElBQUksS0FBS0YsY0FBVCxFQUF5QjtBQUM1QixTQUFLQSxjQUFMLENBQW9CL0csSUFBcEIsQ0FBeUJpSCxJQUF6QixFQUErQkEsSUFBL0I7QUFDRDs7QUFFREEsU0FBTyxJQUFQO0FBQ0EsU0FBTyxJQUFQO0FBQ0QsQ0FWRDtBQVdBLElBQU04RSxlQUFlLFNBQWZBLFlBQWUsQ0FBVUMsSUFBVixFQUFnQjtBQUNuQyxNQUFJdE4sY0FBSjs7QUFFQSxNQUFJLENBQUMsa0JBQUt1TixjQUFWLEVBQTBCO0FBQ3hCO0FBQ0E7QUFDQXZOLFlBQVEsRUFBQ3dOLE1BQU1GLEtBQUt4UixNQUFMLENBQVlzSSxLQUFuQixFQUFSO0FBQ0QsR0FKRCxNQUtLLElBQUksa0JBQWtCa0osSUFBdEIsRUFBNEI7QUFDL0J0TixZQUFRc04sS0FBS0csWUFBTCxDQUFrQnpOLEtBQTFCO0FBQ0QsR0FGSSxNQUdBLElBQUksWUFBWXNOLElBQWhCLEVBQXNCO0FBQ3pCdE4sWUFBUXNOLEtBQUt4UixNQUFMLENBQVlrRSxLQUFwQjtBQUNELEdBRkksTUFHQSxJQUFJc04sSUFBSixFQUFVO0FBQ2J0TixZQUFRc04sSUFBUjtBQUNEOztBQUVELE1BQUksQ0FBQ3ROLEtBQUwsRUFBWSxPQUFPLEtBQVA7O0FBRVo7QUFDQSxNQUFJZixVQUFVZSxLQUFkLEVBQXFCO0FBQ25CLFFBQUlBLE1BQU1mLE1BQU4sSUFBZ0IsQ0FBcEIsRUFBdUI7QUFDckIsV0FBS0MsYUFBTCxHQUFxQixDQUFDYyxNQUFNLENBQU4sQ0FBRCxDQUFyQjtBQUNELEtBRkQsTUFFTztBQUNMLFdBQUtkLGFBQUwsR0FBcUIsa0JBQUV3TyxPQUFGLENBQVUxTixLQUFWLENBQXJCO0FBQ0Q7QUFDRixHQU5ELE1BTU87QUFDTCxTQUFLZCxhQUFMLEdBQXFCLENBQUNjLEtBQUQsQ0FBckI7QUFDRDs7QUFFRCxNQUFJLEtBQUswSSxNQUFMLENBQVlyTSxXQUFoQixFQUE2QjtBQUMzQnNSLG9CQUFnQnJNLElBQWhCLENBQXFCLElBQXJCO0FBQ0Q7QUFDRCxNQUFJLENBQUMsS0FBS29ILE1BQUwsQ0FBWXRNLFlBQWpCLEVBQStCO0FBQzdCLFNBQUs4TCxJQUFMO0FBQ0Q7O0FBRUQsTUFBSSxDQUFDLGtCQUFLcUYsY0FBVixFQUEwQjtBQUN4QkssZ0JBQVl0TSxJQUFaLENBQWlCLElBQWpCLEVBQXVCLEtBQXZCO0FBQ0Q7QUFDRixDQXpDRDtBQTBDQSxJQUFNdU0sWUFBWSxTQUFaQSxTQUFZLEdBQVk7QUFBQTs7QUFFNUIsT0FBS0MsYUFBTCxDQUNHdk4sR0FESCxDQUNPLG1CQURQLEVBRUdiLEVBRkgsQ0FFTSxtQkFGTixFQUUyQixhQUFLO0FBQzVCLFVBQUtxTyxVQUFMLENBQWdCN0QsT0FBaEIsQ0FBd0IsT0FBeEI7QUFDRCxHQUpIOztBQU1BLE1BQUksQ0FBQyxrQkFBS3FELGNBQVYsRUFBMEI7QUFDeEIsU0FBS08sYUFBTCxDQUNHdk4sR0FESCxDQUNPLHVCQURQLEVBRUdiLEVBRkgsQ0FFTSx1QkFGTixFQUUrQixhQUFLO0FBQ2hDa08sa0JBQVl0TSxJQUFaLFFBQXVCLElBQXZCO0FBQ0QsS0FKSDs7QUFNQSxTQUFLeU0sVUFBTCxDQUNHeE4sR0FESCxDQUNPLHVCQURQLEVBRUdiLEVBRkgsQ0FFTSx1QkFGTixFQUUrQixhQUFLO0FBQ2hDLFlBQUtvTyxhQUFMLENBQW1CbEIsUUFBbkIsQ0FBNEIsUUFBNUI7QUFDRCxLQUpIOztBQU1BLFNBQUttQixVQUFMLENBQ0d4TixHQURILENBQ08sc0JBRFAsRUFFR2IsRUFGSCxDQUVNLHNCQUZOLEVBRThCLGFBQUs7QUFDL0IsWUFBS29PLGFBQUwsQ0FBbUJFLFdBQW5CLENBQStCLFFBQS9CO0FBQ0FKLGtCQUFZdE0sSUFBWixRQUF1QixLQUF2QjtBQUNELEtBTEg7QUFNRDs7QUFFRDtBQUNFLFFBQUksQ0FBQyxLQUFLMk0sWUFBTixJQUFzQixDQUFDLEtBQUtBLFlBQUwsQ0FBa0IzQyxHQUFsQixDQUFzQixDQUF0QixDQUEzQixFQUFxRCxPQUFPLEtBQVA7O0FBRXJELFNBQUsyQyxZQUFMLENBQWtCdk8sRUFBbEIsQ0FBcUIsT0FBckIsRUFBOEIsMkJBQTlCLEVBQTJELGFBQUs7QUFDOUQsVUFBSXdPLFFBQVEscUJBQU92TyxFQUFFRSxhQUFULENBQVo7QUFBQSxVQUNFbEMsV0FBV3VRLE1BQU1DLElBQU4sQ0FBVyx5QkFBWCxDQURiO0FBQUEsVUFFRUMsb0JBQW9CQyxPQUFPSCxNQUFNSSxPQUFOLENBQWMscUNBQWQsRUFBcURILElBQXJELENBQTBELG1DQUExRCxDQUFQLENBRnRCO0FBQUEsVUFHRTVGLE9BQU8sRUFIVDs7QUFLQSxVQUFJLE1BQUtHLE1BQUwsQ0FBWWxNLFdBQVosSUFBMkIsTUFBS2tNLE1BQUwsQ0FBWWxNLFdBQVosQ0FBd0JlLE9BQXZELEVBQWdFO0FBQzlEZ0wsZUFBTztBQUNMZCxxQkFESztBQUVMOUosb0JBQVVBLFFBRkw7QUFHTEQseUJBQWUsTUFBS0EsYUFIZjtBQUlMRixxQkFBVzRRO0FBSk4sU0FBUDtBQU1BLGNBQUsxRixNQUFMLENBQVlsTSxXQUFaLENBQXdCZSxPQUF4QixDQUFnQytELElBQWhDLENBQXFDaUgsSUFBckMsRUFBMkNBLElBQTNDO0FBQ0Q7O0FBRUQyRixjQUFRLElBQVI7QUFDQXZRLGlCQUFXLElBQVg7QUFDQXlRLDBCQUFvQixJQUFwQjtBQUNBN0YsYUFBTyxJQUFQO0FBQ0QsS0FwQkQ7O0FBc0JBLFNBQUswRixZQUFMLENBQ0d2TyxFQURILENBQ00sV0FETixFQUNtQixVQUFVQyxDQUFWLEVBQWE7QUFDNUIsd0JBQUU0TyxTQUFGLENBQVk1TyxDQUFaO0FBQ0EsYUFBTyxLQUFQO0FBQ0QsS0FKSDtBQUtEOztBQUVEO0FBQ0U7QUFDQSxRQUFJLENBQUMsa0JBQUs0TixjQUFWLEVBQTBCLE9BQU8sS0FBUDtBQUMxQixRQUFJLENBQUMsS0FBS2lCLFNBQU4sSUFBbUIsQ0FBQyxLQUFLQSxTQUFMLENBQWVsRCxHQUFmLENBQW1CLENBQW5CLENBQXhCLEVBQStDLE9BQU8sS0FBUDs7QUFFL0MsUUFBSW1ELGNBQUo7O0FBRUEsU0FBS0QsU0FBTCxDQUFldEksTUFBZixHQUNHeEcsRUFESCxDQUNNLE9BRE4sRUFDZSxnQ0FEZixFQUNpRCxhQUFLO0FBQ2xELFVBQUlnUCxVQUFVLHFCQUFPL08sRUFBRUUsYUFBVCxDQUFkO0FBQ0EsVUFBSTZPLFFBQVFKLE9BQVIsQ0FBZ0IscUNBQWhCLEVBQXVEclAsTUFBdkQsSUFBaUUsQ0FBakUsSUFBc0UsQ0FBQ3lQLFFBQVFQLElBQVIsQ0FBYSxtQ0FBYixDQUEzRSxFQUE4SDtBQUM1SDtBQUNBLFlBQUl4TyxFQUFFRSxhQUFGLElBQW1CRixFQUFFN0QsTUFBckIsSUFBK0I2UyxFQUFFQyxRQUFGLENBQVdqUCxFQUFFN0QsTUFBYixFQUFxQjZELEVBQUVFLGFBQXZCLENBQS9CLElBQXdFRixFQUFFN0QsTUFBRixDQUFTZ0UsWUFBVCxDQUFzQixtQ0FBdEIsQ0FBNUUsRUFBd0k7QUFDdEksY0FBSSxrQkFBRXlCLFVBQUYsQ0FBYSxNQUFLbUgsTUFBTCxDQUFZbk0sUUFBWixDQUFxQmdCLE9BQWxDLENBQUosRUFBZ0Q7QUFDOUMsa0JBQUttTCxNQUFMLENBQVluTSxRQUFaLENBQXFCZ0IsT0FBckIsQ0FBNkIrRCxJQUE3QixDQUFrQztBQUNoQ21HO0FBRGdDLGFBQWxDO0FBR0QsV0FKRCxNQUlPO0FBQ0wsa0JBQUtzRyxVQUFMLENBQWdCN0QsT0FBaEIsQ0FBd0IsT0FBeEI7QUFDRDtBQUNGO0FBQ0Y7QUFDRHdFLGdCQUFVLElBQVY7QUFDRCxLQWhCSDs7QUFrQkEsU0FBS0YsU0FBTCxDQUFlbEQsR0FBZixDQUFtQixDQUFuQixFQUFzQnVELGdCQUF0QixDQUF1QyxVQUF2QyxFQUFtRCxhQUFLO0FBQ3RELHdCQUFFTixTQUFGLENBQVk1TyxDQUFaOztBQUVBLFVBQUksa0JBQUU0QixVQUFGLENBQWEsTUFBS21ILE1BQUwsQ0FBWW5NLFFBQVosQ0FBcUJ1UyxVQUFsQyxDQUFKLEVBQW1EO0FBQ2pELGNBQUtwRyxNQUFMLENBQVluTSxRQUFaLENBQXFCdVMsVUFBckIsQ0FBZ0N4TixJQUFoQyxDQUFxQztBQUNuQ21HO0FBRG1DLFNBQXJDO0FBR0QsT0FKRCxNQUtLO0FBQ0gsY0FBSytHLFNBQUwsQ0FBZTVCLFFBQWYsQ0FBd0IsVUFBeEI7QUFDRDtBQUVGLEtBWkQsRUFZRyxLQVpIOztBQWNBLFNBQUs0QixTQUFMLENBQWVsRCxHQUFmLENBQW1CLENBQW5CLEVBQXNCdUQsZ0JBQXRCLENBQXVDLFdBQXZDLEVBQW9ELGFBQUs7QUFDdkQsd0JBQUVOLFNBQUYsQ0FBWTVPLENBQVo7O0FBRUEsVUFBSSxrQkFBRTRCLFVBQUYsQ0FBYSxNQUFLbUgsTUFBTCxDQUFZbk0sUUFBWixDQUFxQnVTLFVBQWxDLENBQUosRUFBbUQ7QUFDakQsY0FBS3BHLE1BQUwsQ0FBWW5NLFFBQVosQ0FBcUJ3UyxTQUFyQixDQUErQnpOLElBQS9CLENBQW9DO0FBQ2xDbUc7QUFEa0MsU0FBcEM7QUFHRCxPQUpELE1BS0s7QUFDSCxjQUFLK0csU0FBTCxDQUFlUixXQUFmLENBQTJCLFVBQTNCO0FBQ0Q7QUFFRixLQVpELEVBWUcsS0FaSDs7QUFjQSxTQUFLUSxTQUFMLENBQWVsRCxHQUFmLENBQW1CLENBQW5CLEVBQXNCdUQsZ0JBQXRCLENBQXVDLE1BQXZDLEVBQStDLGFBQUs7QUFDbEQsd0JBQUVOLFNBQUYsQ0FBWTVPLENBQVo7O0FBRUEsVUFBSSxrQkFBRTRCLFVBQUYsQ0FBYSxNQUFLbUgsTUFBTCxDQUFZbk0sUUFBWixDQUFxQnlTLE1BQWxDLENBQUosRUFBK0M7QUFDN0MsY0FBS3RHLE1BQUwsQ0FBWW5NLFFBQVosQ0FBcUJ5UyxNQUFyQixDQUE0QjFOLElBQTVCLENBQWlDO0FBQy9CbUc7QUFEK0IsU0FBakM7QUFHRCxPQUpELE1BS0s7QUFDSCxjQUFLK0csU0FBTCxDQUFlUixXQUFmLENBQTJCLFVBQTNCO0FBQ0Q7O0FBRURYLG1CQUFhL0wsSUFBYixRQUF3QjNCLEtBQUtnSyxPQUFPSyxLQUFwQztBQUNELEtBYkQsRUFhRyxLQWJIO0FBZUQ7QUFDRixDQWxJRDtBQW1JQSxJQUFNNEQsY0FBYyxTQUFkQSxXQUFjLENBQVVxQixHQUFWLEVBQWU7QUFDakM7QUFDQSxNQUFJQSxHQUFKLEVBQVM7QUFDUCxRQUFJLENBQUMsa0JBQUsxQixjQUFWLEVBQTBCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBLFVBQUl2RSxNQUFNLEtBQUs4RSxhQUFMLENBQW1Cb0IsTUFBbkIsRUFBVjtBQUNBbEcsVUFBSUMsS0FBSixHQUFZLEtBQUs2RSxhQUFMLENBQW1CcUIsVUFBbkIsRUFBWjtBQUNBbkcsVUFBSVEsTUFBSixHQUFhLEtBQUtzRSxhQUFMLENBQW1Cc0IsV0FBbkIsRUFBYjtBQUNBLFdBQUtyQixVQUFMLENBQWdCM0UsR0FBaEIsQ0FBb0JKLEdBQXBCO0FBQ0Q7QUFDRixHQVZELE1BVU87QUFDTCxTQUFLK0UsVUFBTCxDQUFnQjNFLEdBQWhCLENBQW9CO0FBQ2xCUSxZQUFNLENBQUMsSUFEVyxFQUNMRixLQUFLLENBQUM7QUFERCxLQUFwQjtBQUdEO0FBQ0YsQ0FqQkQ7QUFrQkEsSUFBTTJGLG1CQUFtQixTQUFuQkEsZ0JBQW1CLENBQVU5RixNQUFWLEVBQWtCO0FBQUE7O0FBQ3pDLE1BQU0rRixvQkFBb0IsU0FBcEJBLGlCQUFvQixHQUFZO0FBQ3BDLFFBQUlDLFVBQVUscUJBQU81RixNQUFQLENBQWQ7QUFBQSxRQUE4QmpPLFFBQVEscUJBQU8yTixTQUFTQyxJQUFoQixDQUF0QztBQUNBLFFBQUk3RSxNQUFNLEVBQVY7QUFBQSxRQUFjK0ssaUJBQWlCLENBQS9CO0FBQUEsUUFDRUMsTUFBTSxFQURSO0FBQUEsUUFDWUMsWUFBWSxFQUR4QjtBQUFBLFFBRUVDLHdCQUZGOztBQUlBOztBQUVBbEwsVUFBTyxLQUFLbUwsWUFBTCxDQUFrQjFKLE1BQWxCLEdBQTJCb0YsR0FBM0IsQ0FBK0IsQ0FBL0IsS0FBcUMsS0FBS29ELE9BQUwsQ0FBYXBELEdBQWIsQ0FBaUIsQ0FBakIsQ0FBdEMsR0FBNkQsS0FBS3dDLGFBQUwsQ0FBbUJyRSxRQUFuQixFQUE3RCxHQUE2RixLQUFLcUUsYUFBTCxDQUFtQm9CLE1BQW5CLEVBQW5HO0FBQ0FPLFVBQU07QUFDSnhHLGFBQU8sS0FBSzZFLGFBQUwsQ0FBbUJxQixVQUFuQixFQURIO0FBRUozRixjQUFRLEtBQUtzRSxhQUFMLENBQW1Cc0IsV0FBbkI7QUFGSixLQUFOO0FBSUFNLGdCQUFZO0FBQ1ZHLGdCQUFVQyxLQUFLQyxHQUFMLENBQVNSLFFBQVF0RyxLQUFSLEVBQVQsRUFBMEJ2TixNQUFNdU4sS0FBTixFQUExQixDQURBO0FBRVYrRyxpQkFBV0YsS0FBS0MsR0FBTCxDQUFTUixRQUFRL0YsTUFBUixFQUFULEVBQTJCOU4sTUFBTThOLE1BQU4sRUFBM0IsQ0FGRDtBQUdWUCxhQUFPLEtBQUsyRyxZQUFMLENBQWtCVCxVQUFsQixFQUhHO0FBSVYzRixjQUFRLEtBQUtvRyxZQUFMLENBQWtCUixXQUFsQjtBQUpFLEtBQVo7O0FBT0E7QUFDQSxRQUFJLENBQUMsS0FBSzFHLE1BQUwsQ0FBWXBNLG9CQUFiLElBQXFDLEtBQUtvTSxNQUFMLENBQVlwTSxvQkFBWixLQUFxQyxFQUExRSxJQUFnRixLQUFLb00sTUFBTCxDQUFZcE0sb0JBQVosS0FBcUMsTUFBekgsRUFBaUk7QUFDL0g7QUFDQXFULHdCQUFrQixLQUFsQjtBQUNBLFVBQUlsTCxJQUFJaUYsR0FBSixHQUFVZ0csVUFBVWxHLE1BQXBCLEdBQTZCZ0csY0FBN0IsR0FBOEMsQ0FBbEQsRUFBcUQ7QUFDbkRHLDBCQUFrQixLQUFsQjtBQUNELE9BRkQsTUFFTyxJQUFJbEwsSUFBSWlGLEdBQUosR0FBVStGLElBQUlqRyxNQUFkLEdBQXVCa0csVUFBVWxHLE1BQWpDLEdBQTBDZ0csY0FBMUMsR0FBMkRFLFVBQVVNLFNBQXpFLEVBQW9GO0FBQ3pGTCwwQkFBa0IsUUFBbEI7QUFDRDtBQUNGLEtBUkQsTUFRTztBQUNMQSx3QkFBa0IsS0FBS2pILE1BQUwsQ0FBWXBNLG9CQUE5QjtBQUNEOztBQUVELFFBQUlpTixNQUFKLEVBQVk7QUFDVixXQUFLcUcsWUFBTCxDQUNHaEQsUUFESCxDQUNZLGVBQWUrQyxlQUQzQjtBQUVEOztBQUVELFFBQUlNLGNBQWUsWUFBWTtBQUM3QixVQUFJN0csTUFBTSxFQUFDUSxNQUFNLENBQVAsRUFBVUYsS0FBSyxDQUFmLEVBQVY7QUFDQSxjQUFRaUcsZUFBUjtBQUNFLGFBQUssS0FBTDtBQUNFdkcsY0FBSVEsSUFBSixHQUFXbkYsSUFBSW1GLElBQUosR0FBVzZGLElBQUl4RyxLQUFKLEdBQVksQ0FBdkIsR0FBMkJ5RyxVQUFVekcsS0FBVixHQUFrQixDQUF4RDtBQUNBRyxjQUFJTSxHQUFKLEdBQVVqRixJQUFJaUYsR0FBSixHQUFVK0YsSUFBSWpHLE1BQWQsR0FBdUJnRyxjQUFqQztBQUNBO0FBQ0YsYUFBSyxRQUFMO0FBQ0VwRyxjQUFJUSxJQUFKLEdBQVduRixJQUFJbUYsSUFBSixHQUFXNkYsSUFBSXhHLEtBQUosR0FBWSxDQUF2QixHQUEyQnlHLFVBQVV6RyxLQUFWLEdBQWtCLENBQXhEO0FBQ0FHLGNBQUlNLEdBQUosR0FBVWpGLElBQUlpRixHQUFKLEdBQVVnRyxVQUFVbEcsTUFBcEIsR0FBNkJnRyxjQUF2QztBQUNBO0FBQ0YsYUFBSyxNQUFMO0FBQ0VwRyxjQUFJUSxJQUFKLEdBQVduRixJQUFJbUYsSUFBSixHQUFXNkYsSUFBSXhHLEtBQWYsR0FBdUJ1RyxjQUFsQztBQUNBcEcsY0FBSU0sR0FBSixHQUFVakYsSUFBSWlGLEdBQUosR0FBVWdHLFVBQVVsRyxNQUFWLEdBQW1CLENBQTdCLEdBQWlDaUcsSUFBSWpHLE1BQUosR0FBYSxDQUF4RDtBQUNBO0FBQ0YsYUFBSyxPQUFMO0FBQ0VKLGNBQUlRLElBQUosR0FBV25GLElBQUltRixJQUFKLEdBQVc4RixVQUFVekcsS0FBckIsR0FBNkJ1RyxjQUF4QztBQUNBcEcsY0FBSU0sR0FBSixHQUFVakYsSUFBSWlGLEdBQUosR0FBVWdHLFVBQVVsRyxNQUFWLEdBQW1CLENBQTdCLEdBQWlDaUcsSUFBSWpHLE1BQUosR0FBYSxDQUF4RDtBQUNBO0FBaEJKO0FBa0JBLGFBQU9KLEdBQVA7QUFDRCxLQXJCaUIsRUFBbEI7O0FBdUJBO0FBQ0UsVUFBSXVHLG1CQUFtQixLQUFuQixJQUE0QkEsbUJBQW1CLFFBQW5ELEVBQTZEO0FBQzNELFlBQUlNLFlBQVlyRyxJQUFaLEdBQW1CLENBQXZCLEVBQTBCO0FBQ3hCcUcsc0JBQVlyRyxJQUFaLEdBQW1CNEYsY0FBbkI7QUFDQSxlQUFLVSxpQkFBTCxDQUF1QjlHLEdBQXZCLENBQTJCLEVBQUNRLE1BQU9uRixJQUFJbUYsSUFBSixHQUFXNkYsSUFBSXhHLEtBQUosR0FBWSxDQUF4QixHQUE2QmdILFlBQVlyRyxJQUFoRCxFQUEzQjtBQUNELFNBSEQsTUFHTyxJQUFJcUcsWUFBWXJHLElBQVosR0FBbUI4RixVQUFVekcsS0FBN0IsR0FBcUN5RyxVQUFVRyxRQUFuRCxFQUE2RDtBQUNsRUksc0JBQVlyRyxJQUFaLEdBQW1COEYsVUFBVUcsUUFBVixHQUFxQkgsVUFBVXpHLEtBQS9CLEdBQXVDdUcsY0FBMUQ7QUFDQSxlQUFLVSxpQkFBTCxDQUF1QjlHLEdBQXZCLENBQTJCLEVBQUNRLE1BQU9uRixJQUFJbUYsSUFBSixHQUFXNkYsSUFBSXhHLEtBQUosR0FBWSxDQUF4QixHQUE2QmdILFlBQVlyRyxJQUFoRCxFQUEzQjtBQUNEO0FBQ0Y7QUFDRjs7QUFFRCxTQUFLZ0csWUFBTCxDQUNHeEcsR0FESCxDQUNPNkcsV0FEUDtBQUVELEdBM0VEOztBQTZFQSxPQUFLTCxZQUFMLENBQWtCeEcsR0FBbEIsQ0FBc0IsRUFBQ00sS0FBSyxDQUFDLEdBQVAsRUFBdEI7O0FBRUEsTUFBSUgsTUFBSixFQUFZO0FBQ1Y7QUFDQSxLQUFDLFlBQVk7QUFDWCxVQUFJLEtBQUtiLE1BQUwsQ0FBWXlILFFBQWhCLEVBQTBCO0FBQ3hCLGVBQU8scUJBQU8sS0FBS3pILE1BQUwsQ0FBWXlILFFBQVosQ0FBcUJDLFFBQTVCLENBQVA7QUFDRCxPQUZELE1BRU87QUFDTCxlQUFPLEtBQUsxQixPQUFaO0FBQ0Q7QUFDRixLQU5ELEVBTUdwTixJQU5ILENBTVEsSUFOUixFQU1jaUksTUFOZCxDQU1xQixLQUFLcUcsWUFOMUI7O0FBUUE7QUFDQSxTQUFLQSxZQUFMLENBQ0dyUCxHQURILENBQ08sbUJBRFAsRUFFR2IsRUFGSCxDQUVNLG1CQUZOLEVBRTJCLFFBRjNCLEVBRXFDLGFBQUs7QUFDdEMsVUFBSTJRLE1BQU0xUSxFQUFFRSxhQUFGLENBQWdCQyxZQUFoQixDQUE2QixzQkFBN0IsQ0FBVjtBQUNBLFVBQUlDLFlBQVk7QUFDZCxrQkFBVSxrQkFBWTtBQUNwQixlQUFLbUksSUFBTDtBQUNELFNBSGE7QUFJZCxpQkFBUyxpQkFBWTtBQUNuQixlQUFLb0ksS0FBTDtBQUNEO0FBTmEsT0FBaEI7QUFRQSxVQUFJdlEsVUFBVXNRLEdBQVYsQ0FBSixFQUFvQnRRLFVBQVVzUSxHQUFWLEVBQWUvTyxJQUFmO0FBQ3JCLEtBYkg7QUFjRDs7QUFFRG9KLGFBQVcsWUFBTTtBQUNmNEUsc0JBQWtCaE8sSUFBbEI7QUFDRCxHQUZEO0FBR0QsQ0E5R0Q7QUErR0EsSUFBTXFNLGtCQUFrQixTQUFsQkEsZUFBa0IsR0FBWTtBQUNsQyxPQUFLaUMsWUFBTCxDQUFrQjVCLFdBQWxCLENBQThCLFNBQTlCO0FBQ0EsT0FBS3VDLGVBQUwsQ0FBcUJDLFVBQXJCLENBQWdDLFVBQWhDO0FBQ0EsT0FBS0MsY0FBTCxDQUFvQkQsVUFBcEIsQ0FBK0IsVUFBL0I7O0FBRUE7QUFDQW5CLG1CQUFpQi9OLElBQWpCLENBQXNCLElBQXRCLEVBQTRCLFFBQTVCOztBQUVBO0FBQ0ErRyxpQkFBZS9HLElBQWYsQ0FBb0IsSUFBcEIsRUFBMEI7QUFDeEJtRyxVQUFNLElBRGtCO0FBRXhCOEMsV0FBTztBQUZpQixHQUExQjtBQUlELENBYkQ7QUFjQSxJQUFNbUcsbUJBQW1CLFNBQW5CQSxnQkFBbUIsR0FBWTtBQUFBOztBQUNuQyxPQUFLZCxZQUFMLENBQWtCaEQsUUFBbEIsQ0FBMkIsU0FBM0I7QUFDQWxDLGFBQVcsWUFBTTtBQUNmLFdBQUtrRixZQUFMLENBQ0cvQyxNQURIO0FBRUQsR0FIRCxFQUdHLEtBQUtuRSxNQUFMLENBQVlxRCxXQUhmO0FBSUQsQ0FORDtBQU9BLElBQU00RSxjQUFjLFNBQWRBLFdBQWMsR0FBWTtBQUM5QixNQUFNNVEsWUFBWTtBQUNoQixXQURnQixtQkFDTjtBQUNSLFVBQU0wSCxPQUFPLElBQWI7QUFDQSxVQUFJbUosYUFBYSxLQUFLMVIsYUFBTCxDQUFtQjROLEtBQW5CLEVBQWpCO0FBQ0EsVUFBSSxDQUFDOEQsVUFBTCxFQUFpQjtBQUNmO0FBQ0FDLHVCQUFldlAsSUFBZixDQUFvQixJQUFwQjtBQUNBLGVBQU8sSUFBUDtBQUNEOztBQUVELFVBQUlzUCxXQUFXLENBQVgsQ0FBSixFQUFtQkEsYUFBYUEsV0FBVyxDQUFYLENBQWI7O0FBRW5CLFVBQUlFLFdBQVcsSUFBSUMsUUFBSixFQUFmO0FBQ0E7O0FBRUEsV0FBS3JDLE9BQUwsQ0FBYTNTLElBQWIsQ0FBa0IsT0FBbEIsRUFBMkJpVixJQUEzQixDQUFnQyxZQUFZO0FBQzFDRixpQkFBU3ZILE1BQVQsQ0FBZ0IsS0FBSzVNLElBQXJCLEVBQTJCLEtBQUt5SCxLQUFoQztBQUNELE9BRkQ7QUFHQTtBQUNBME0sZUFBU3ZILE1BQVQsQ0FBZ0IsS0FBS2IsTUFBTCxDQUFZMU0sSUFBWixDQUFpQkUsUUFBakMsRUFBMkMwVSxVQUEzQzs7QUFFQSxXQUFLSyxHQUFMLEdBQVcsSUFBSUMsY0FBSixFQUFYO0FBQ0EsV0FBS0QsR0FBTCxDQUFTbkksSUFBVCxDQUFjLE1BQWQsRUFBc0IsS0FBS0osTUFBTCxDQUFZMU0sSUFBWixDQUFpQkMsTUFBdkMsRUFBK0MsSUFBL0M7QUFDQSxXQUFLZ1YsR0FBTCxDQUFTRSxNQUFULEdBQWtCLFVBQVV4UixDQUFWLEVBQWE7QUFDN0IsWUFBSUYsTUFBTUUsRUFBRTdELE1BQUYsQ0FBU3NWLFFBQW5CO0FBQ0EsWUFBSTtBQUNGLGNBQUksT0FBTzNSLEdBQVAsSUFBYyxRQUFsQixFQUE0QkEsTUFBTSxrQkFBRTRSLFNBQUYsQ0FBWTVSLEdBQVosQ0FBTjtBQUM3QixTQUZELENBR0EsT0FBT0UsQ0FBUCxFQUFVO0FBQ1IsaUJBQU8sS0FBUDtBQUNEO0FBQ0QsWUFBSThILEtBQUtpQixNQUFMLENBQVk0SSxLQUFoQixFQUF1QnZTLFFBQVFDLEdBQVIsQ0FBWVMsR0FBWjs7QUFFdkIsWUFBSUEsSUFBSWYsS0FBUixFQUFlO0FBQ2IsY0FBSStJLEtBQUtpQixNQUFMLENBQVk0SSxLQUFoQixFQUF1QnZTLFFBQVFDLEdBQVIsQ0FBWVMsSUFBSWYsS0FBaEI7QUFDdkIsY0FBSSxrQkFBRTZDLFVBQUYsQ0FBYWtHLEtBQUtpQixNQUFMLENBQVl0SixhQUF6QixDQUFKLEVBQTZDO0FBQzNDcUksaUJBQUtpQixNQUFMLENBQVl0SixhQUFaLENBQTBCa0MsSUFBMUIsQ0FBK0I7QUFDN0JtRyxvQkFBTUEsSUFEdUI7QUFFN0IvSSxxQkFBT2UsSUFBSWY7QUFGa0IsYUFBL0IsRUFHR2UsR0FISDtBQUlEO0FBQ0RnSSxlQUFLUyxJQUFMO0FBQ0EsaUJBQU8sS0FBUDtBQUNEOztBQUVEcUosaUJBQVNqUSxJQUFULENBQWNtRyxJQUFkLEVBQW9CaEksR0FBcEI7QUFDQWdJLGFBQUtTLElBQUw7QUFDRCxPQXhCRDtBQXlCQSxXQUFLK0ksR0FBTCxDQUFTTyxNQUFULENBQWdCclMsVUFBaEIsR0FBNkIsVUFBVVEsQ0FBVixFQUFhO0FBQ3hDOFIsMEJBQWtCblEsSUFBbEIsQ0FBdUJtRyxJQUF2QixFQUE2QjlILENBQTdCO0FBQ0EsWUFBSSxrQkFBRTRCLFVBQUYsQ0FBYWtHLEtBQUtpQixNQUFMLENBQVl2SixVQUF6QixDQUFKLEVBQTBDO0FBQ3hDc0ksZUFBS2lCLE1BQUwsQ0FBWXZKLFVBQVosQ0FBdUJtQyxJQUF2QixDQUE0QjtBQUMxQm9RLG9CQUFRL1IsRUFBRStSLE1BRGdCO0FBRTFCQyxtQkFBT2hTLEVBQUVnUztBQUZpQixXQUE1QixFQUdHaFMsQ0FISDtBQUlEO0FBQ0YsT0FSRDtBQVNBLFdBQUtzUixHQUFMLENBQVMvSSxJQUFULENBQWM0SSxRQUFkLEVBeERRLENBd0RrQjtBQUUzQixLQTNEZTtBQTREaEIsVUE1RGdCLGtCQTREUDtBQUFBOztBQUVQO0FBQ0EsV0FBS2MsV0FBTCxHQUFtQixJQUFuQjs7QUFFQTtBQUNBLFVBQUlDLFVBQVUscUJBQU8sdURBQXVELEtBQUtoRyxVQUE1RCxHQUF5RSwwQ0FBaEYsQ0FBZDtBQUNBLDJCQUFPeEMsU0FBU0MsSUFBaEIsRUFBc0JDLE1BQXRCLENBQTZCc0ksT0FBN0I7O0FBRUE7QUFDQTtBQUNBQSxjQUFRblMsRUFBUixDQUFXLE1BQVgsRUFBbUIsYUFBSztBQUN0QixZQUFJb1MsTUFBTW5TLEVBQUVFLGFBQUYsQ0FBZ0JrUyxhQUFoQixHQUFnQ3BTLEVBQUVFLGFBQUYsQ0FBZ0JrUyxhQUFoQixDQUE4QjFJLFFBQTlELEdBQTBFMUosRUFBRUUsYUFBRixDQUFnQm1TLGVBQWhCLEdBQWtDclMsRUFBRUUsYUFBRixDQUFnQm1TLGVBQWxELEdBQW9FclMsRUFBRUUsYUFBRixDQUFnQndKLFFBQXhLO0FBQUEsWUFDRTRJLE9BQU9ILElBQUlJLGVBQUosR0FBc0JKLElBQUlJLGVBQTFCLEdBQTRDSixJQUFJeEksSUFEekQ7QUFBQSxZQUVFbkIsU0FBUzhKLEtBQUtFLFdBQUwsR0FBbUJGLEtBQUtFLFdBQXhCLEdBQXNDRixLQUFLRyxTQUZ0RDtBQUFBLFlBR0UzUyxZQUhGOztBQUtBLFlBQUk7QUFDRkEsZ0JBQU10QixLQUFLd0ksS0FBTCxDQUFXd0IsTUFBWCxDQUFOO0FBQ0QsU0FGRCxDQUdBLE9BQU94SSxDQUFQLEVBQVU7QUFDUkYsZ0JBQU07QUFDSmYsbUJBQU8sY0FESDtBQUVKNEssa0JBQU1uQjtBQUZGLFdBQU47QUFJRDs7QUFFRCxZQUFJLE9BQUtPLE1BQUwsQ0FBWTRJLEtBQWhCLEVBQXVCdlMsUUFBUUMsR0FBUixDQUFZUyxHQUFaO0FBQ3ZCLFlBQUlBLElBQUlmLEtBQVIsRUFBZTtBQUNiSyxrQkFBUUMsR0FBUixDQUFZUyxHQUFaO0FBQ0QsU0FGRCxNQUdLO0FBQ0g4UixtQkFBU2pRLElBQVQsU0FBb0I3QixHQUFwQjtBQUNBb1Msa0JBQVFoRixNQUFSOztBQUVBbkMscUJBQVcsWUFBTTtBQUNmbUcsMkJBQWV2UCxJQUFmO0FBQ0QsV0FGRCxFQUVHLEdBRkg7QUFHRDtBQUNGLE9BNUJEOztBQThCQSxXQUFLK1EsY0FBTCxDQUNHbEUsSUFESCxDQUNRLFFBRFIsRUFDa0IsaUJBQWlCLEtBQUt0QyxVQUF0QixHQUFtQyxTQURyRCxFQUVHc0MsSUFGSCxDQUVRLFFBRlIsRUFFa0IsS0FBS3pGLE1BQUwsQ0FBWTFNLElBQVosQ0FBaUJDLE1BRm5DLEVBR0dxVyxNQUhIOztBQUtBLFdBQUtDLGtCQUFMLEdBQTBCLENBQTFCO0FBQ0FkLHdCQUFrQm5RLElBQWxCLENBQXVCLElBQXZCLEVBQTZCO0FBQzNCb1EsZ0JBQVEsQ0FEbUI7QUFFM0JDLGVBQU87QUFGb0IsT0FBN0I7QUFJRDtBQS9HZSxHQUFsQjs7QUFrSEEsTUFBSSxLQUFLQyxXQUFMLEtBQXFCLEtBQXpCLEVBQWdDO0FBQzlCO0FBQ0EsUUFBSVksYUFBYSxDQUFqQjtBQUNBLFNBQUt0VCxhQUFMLENBQW1CZ0IsT0FBbkIsQ0FBMkIsVUFBVXVTLENBQVYsRUFBYTtBQUN0Q0Qsb0JBQWNDLEVBQUU1VixJQUFoQjtBQUNELEtBRkQ7QUFHQSxTQUFLMFYsa0JBQUwsR0FBMEJDLFVBQTFCO0FBQ0EsU0FBS0UsUUFBTCxHQUFnQixDQUFoQjs7QUFFQSxTQUFLZCxXQUFMLEdBQW1CLElBQW5CLENBVDhCLENBU0w7QUFDekIsU0FBS3JCLGVBQUwsQ0FBcUJwQyxJQUFyQixDQUEwQixVQUExQixFQUFzQyxVQUF0QztBQUNBLFNBQUtzQyxjQUFMLENBQW9CRCxVQUFwQixDQUErQixVQUEvQjtBQUNEOztBQUVEelEsWUFBVSxrQkFBS3dOLGNBQUwsR0FBc0IsT0FBdEIsR0FBZ0MsTUFBMUMsRUFBa0RqTSxJQUFsRCxDQUF1RCxJQUF2RDtBQUVELENBbklEO0FBb0lBLElBQU1tUSxvQkFBb0IsU0FBcEJBLGlCQUFvQixDQUFVOVIsQ0FBVixFQUFhO0FBQ3JDLE1BQUlnVCxVQUFVLGtCQUFFQyxNQUFGLENBQVMsQ0FBQyxLQUFLRixRQUFMLEdBQWdCL1MsRUFBRStSLE1BQW5CLElBQTZCLEtBQUthLGtCQUFsQyxHQUF1RCxHQUFoRSxFQUFxRSxFQUFDTSxPQUFPLENBQVIsRUFBckUsQ0FBZDtBQUNBLE9BQUtDLFlBQUwsQ0FBa0IxSixHQUFsQixDQUFzQixFQUFDSCxPQUFPMEosVUFBVSxHQUFsQixFQUF0QjtBQUNBLE9BQUtJLGVBQUwsQ0FBcUJ4WCxJQUFyQixDQUEwQm9YLFVBQVUsWUFBcEM7QUFDQSxNQUFHaFQsRUFBRStSLE1BQUYsSUFBWS9SLEVBQUVnUyxLQUFqQixFQUF1QjtBQUNyQixTQUFLZSxRQUFMLElBQWlCL1MsRUFBRWdTLEtBQW5CO0FBQ0Q7QUFDRCxNQUFJaFMsRUFBRXFULGdCQUFOLEVBQXdCO0FBQ3RCLFFBQUlyVCxFQUFFK1IsTUFBRixJQUFZL1IsRUFBRWdTLEtBQWxCLEVBQXlCLENBRXhCO0FBQ0Y7QUFDRGdCLFlBQVUsSUFBVjtBQUNELENBYkQ7QUFjQSxJQUFNcEIsV0FBVyxTQUFYQSxRQUFXLENBQVU5UixHQUFWLEVBQWU7QUFDOUIsTUFBSSxLQUFLaUosTUFBTCxDQUFZNEksS0FBaEIsRUFBdUJ2UyxRQUFRQyxHQUFSLENBQVlTLEdBQVo7QUFDdkIsT0FBSy9CLGFBQUwsQ0FBbUIwQyxJQUFuQixDQUF3QlgsR0FBeEI7QUFDQXdULHFCQUFtQjNSLElBQW5CLENBQXdCLElBQXhCLEVBSDhCLENBR0M7O0FBRS9CLE1BQUksa0JBQUVDLFVBQUYsQ0FBYSxLQUFLbUgsTUFBTCxDQUFZcEosVUFBekIsQ0FBSixFQUEwQztBQUN4QyxTQUFLb0osTUFBTCxDQUFZcEosVUFBWixDQUF1QmdDLElBQXZCLENBQTRCO0FBQzFCbUcsWUFBTTtBQURvQixLQUE1QixFQUVHaEksR0FGSDtBQUdEO0FBQ0YsQ0FWRDtBQVdBLElBQU1vUixpQkFBaUIsU0FBakJBLGNBQWlCLEdBQVk7QUFDakMsT0FBS2UsV0FBTCxHQUFtQixLQUFuQixDQURpQyxDQUNQO0FBQzFCLE9BQUtyQixlQUFMLENBQXFCQyxVQUFyQixDQUFnQyxVQUFoQztBQUNBLE9BQUtDLGNBQUwsQ0FBb0J0QyxJQUFwQixDQUF5QixVQUF6QixFQUFxQyxVQUFyQzs7QUFFQSxNQUFJLEtBQUt6RixNQUFMLENBQVlyTSxXQUFoQixFQUE2QjtBQUMzQnFVLHFCQUFpQnBQLElBQWpCLENBQXNCLElBQXRCO0FBQ0Q7QUFDRCxNQUFJLGtCQUFFQyxVQUFGLENBQWEsS0FBS21ILE1BQUwsQ0FBWW5KLGdCQUF6QixDQUFKLEVBQWdEO0FBQzlDLFNBQUttSixNQUFMLENBQVluSixnQkFBWixDQUE2QitCLElBQTdCLENBQWtDO0FBQ2hDbUcsWUFBTTtBQUQwQixLQUFsQztBQUdEO0FBQ0Q7O0FBRUE7QUFDQXlMLGdCQUFjNVIsSUFBZCxDQUFtQixJQUFuQjtBQUNELENBakJEO0FBa0JBLElBQU02UixlQUFlLFNBQWZBLFlBQWUsR0FBWTs7QUFFL0IsTUFBTXBULFlBQVk7QUFDaEIsYUFBUyxpQkFBWTtBQUNuQixVQUFJLEtBQUtrUixHQUFULEVBQWM7QUFDWixhQUFLQSxHQUFMLENBQVNYLEtBQVQ7QUFDRDtBQUNGLEtBTGU7QUFNaEIsWUFBUSxnQkFBWSxDQUVuQjtBQVJlLEdBQWxCOztBQVdBLE9BQUtzQixXQUFMLEdBQW1CLEtBQW5CLENBYitCLENBYUw7QUFDMUIsT0FBS3JCLGVBQUwsQ0FBcUJDLFVBQXJCLENBQWdDLFVBQWhDO0FBQ0EsT0FBS0MsY0FBTCxDQUFvQnRDLElBQXBCLENBQXlCLFVBQXpCLEVBQXFDLFVBQXJDOztBQUVBcE8sWUFBVSxrQkFBS3dOLGNBQUwsR0FBc0IsT0FBdEIsR0FBZ0MsTUFBMUMsRUFBa0RqTSxJQUFsRCxDQUF1RCxJQUF2RDs7QUFFQSxNQUFJLEtBQUtvSCxNQUFMLENBQVlyTSxXQUFoQixFQUE2QjtBQUMzQnFVLHFCQUFpQnBQLElBQWpCLENBQXNCLElBQXRCO0FBQ0Q7O0FBRUQ7QUFDQTtBQUNBNFIsZ0JBQWM1UixJQUFkLENBQW1CLElBQW5COztBQUVBLE1BQUksS0FBS29ILE1BQUwsQ0FBWTRJLEtBQWhCLEVBQXVCdlMsUUFBUUMsR0FBUixDQUFZLGNBQVo7QUFDdkI7QUFDRCxDQTdCRDtBQThCQSxJQUFNaVUscUJBQXFCLFNBQXJCQSxrQkFBcUIsR0FBWTtBQUNyQztBQUNBO0FBQ0EsTUFBSSxLQUFLaEYsWUFBTCxLQUFzQixJQUExQixFQUFnQyxPQUFPLElBQVA7O0FBRWhDLE9BQUtBLFlBQUwsQ0FBa0IxUyxJQUFsQixDQUNFLHNCQUFTcUwsTUFBVCxDQUFnQm1HLEtBQUtJLFVBQUwsQ0FBZ0I3TCxJQUFoQixDQUFxQixJQUFyQixFQUEyQixLQUFLb0gsTUFBTCxDQUFZbE0sV0FBWixDQUF3QkUsVUFBbkQsQ0FBaEIsRUFBZ0Y7QUFDOUUsa0JBRDhFLHlCQUM3RDtBQUNmLGFBQU8sVUFBVTBXLElBQVYsRUFBZ0J4TSxNQUFoQixFQUF3QjtBQUM3QixlQUFPLGtCQUFFZ00sTUFBRixDQUFTaE0sT0FBT3dNLElBQVAsQ0FBVCxFQUF1QixFQUFDUCxPQUFPLENBQVIsRUFBV1EsTUFBTSxJQUFqQixFQUF2QixDQUFQO0FBQ0QsT0FGRDtBQUdELEtBTDZFOztBQU05RTNWLG1CQUFlLEtBQUtBLGFBTjBEO0FBTzlFakIsVUFBTSxLQUFLaU0sTUFBTCxDQUFZbE0sV0FBWixDQUF3QkMsSUFQZ0Q7QUFROUVVLFVBQU0sS0FBS3VMLE1BQUwsQ0FBWWxNLFdBQVosQ0FBd0JXLElBUmdEO0FBUzlFb1Esb0JBQWdCLENBQUMsQ0FBQyxrQkFBS0E7QUFUdUQsR0FBaEYsQ0FERjtBQWFBLE9BQUtVLFlBQUwsQ0FBa0JsUyxJQUFsQixDQUF1QixLQUF2QixFQUE4QjJELEVBQTlCLENBQWlDLE9BQWpDLEVBQTBDLFlBQVk7QUFDcEQ7QUFDQWlQLE1BQUUsSUFBRixFQUFRekksTUFBUixHQUFpQjBHLFFBQWpCLENBQTBCLFVBQTFCO0FBQ0QsR0FIRDtBQUtELENBdkJEO0FBd0JBLElBQU1zRyxnQkFBZ0IsU0FBaEJBLGFBQWdCLEdBQVk7QUFBQTs7QUFDaEMsTUFBSSxLQUFLbkYsVUFBTCxJQUFtQixLQUFLQSxVQUFMLENBQWdCekMsR0FBaEIsQ0FBb0IsQ0FBcEIsQ0FBdkIsRUFBK0M7QUFDN0MsU0FBS3lDLFVBQUwsQ0FBZ0JsQixNQUFoQjtBQUNEO0FBQ0QsTUFBSSxLQUFLd0YsY0FBTCxJQUF1QixLQUFLQSxjQUFMLENBQW9CL0csR0FBcEIsQ0FBd0IsQ0FBeEIsQ0FBM0IsRUFBdUQ7QUFDckQsU0FBSytHLGNBQUwsQ0FBb0J4RixNQUFwQjtBQUNEOztBQUVELE9BQUtrQixVQUFMLEdBQWtCLHFCQUNoQixzQkFBU25ILE1BQVQsQ0FBZ0JtRyxLQUFLRSxTQUFMLENBQWUzTCxJQUFmLENBQW9CLElBQXBCLENBQWhCLEVBQTJDO0FBQ3pDdUssZ0JBQVksS0FBS0EsVUFEd0I7QUFFekMxUCxjQUFVLEtBQUt1TSxNQUFMLENBQVl2TSxRQUZtQjtBQUd6Q21YLFlBQVEsS0FBSzVLLE1BQUwsQ0FBWTRLLE1BSHFCO0FBSXpDM1csVUFBTSxLQUFLK0wsTUFBTCxDQUFZMU0sSUFBWixDQUFpQkU7QUFKa0IsR0FBM0MsQ0FEZ0IsQ0FBbEI7O0FBU0EsTUFBSSxrQkFBS3FSLGNBQVQsRUFBeUI7QUFDdkIseUJBQU9sRSxTQUFTQyxJQUFoQixFQUFzQkMsTUFBdEIsQ0FBNkIsS0FBS3dFLFVBQWxDO0FBQ0QsR0FGRCxNQUVPO0FBQ0wsU0FBS0QsYUFBTCxDQUFtQkssSUFBbkIsQ0FBd0IsVUFBeEIsRUFBb0MsQ0FBQyxDQUFyQztBQUNBLFNBQUtrRSxjQUFMLEdBQXNCLHFCQUNwQixzQkFBU3pMLE1BQVQsQ0FBZ0JtRyxLQUFLRyxhQUFMLENBQW1CNUwsSUFBbkIsQ0FBd0IsSUFBeEIsQ0FBaEIsRUFBK0M7QUFDN0N1SyxrQkFBWSxLQUFLQTtBQUQ0QixLQUEvQyxDQURvQixDQUF0Qjs7QUFNQSxTQUFLd0csY0FBTCxDQUFvQjlJLE1BQXBCLENBQTJCLEtBQUt3RSxVQUFoQztBQUNBLHlCQUFPMUUsU0FBU0MsSUFBaEIsRUFBc0JDLE1BQXRCLENBQTZCLEtBQUs4SSxjQUFsQztBQUNEOztBQUVELE9BQUt0RSxVQUFMLENBQ0d4TixHQURILENBQ08sb0JBRFAsRUFFR2IsRUFGSCxDQUVNLG9CQUZOLEVBRTRCLGFBQUs7QUFDN0IyTixpQkFBYS9MLElBQWIsU0FBd0IzQixDQUF4QjtBQUNELEdBSkg7QUFLRCxDQXBDRDtBQXFDQTs7QUFFQTs7OztJQUdNNFQsYTs7O0FBQ0o7Ozs7QUFJQSx5QkFBWTdLLE1BQVosRUFBb0I7QUFBQTs7QUFHbEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUhrQjs7QUE2Q2xCLFdBQUtBLE1BQUwsR0FBYztBQUNab0QsYUFBTyxTQURLLEVBQ007QUFDbEIzTyxZQUFNLEVBQUU7QUFDTixrQkFBVSxRQUROO0FBRUosaUJBQVM7QUFGTCxPQUZNO0FBTVo0TyxtQkFBYSxHQU5EO0FBT1p1SCxjQUFRLEtBUEksRUFPRztBQUNmblgsZ0JBQVUsS0FSRSxFQVFLO0FBQ2pCQyxvQkFBYyxLQVRGLEVBU1M7QUFDckJDLG1CQUFhLElBVkQsRUFVTztBQUNuQkMsNEJBQXNCLE1BWFY7QUFZWk4sWUFBTTtBQUNKQyxnQkFBUSxFQURKO0FBRUpDLGtCQUFVO0FBRk4sT0FaTTtBQWdCWkssZ0JBQVU7QUFDUlQsZ0JBQVE7QUFEQSxPQWhCRTtBQW1CWlUsbUJBQWE7QUFDWFYsZ0JBQVEsSUFERztBQUVYVyxjQUFNO0FBQ0prQyxvQkFBVSxRQUROO0FBRUo2VSxrQkFBUTtBQUZKLFNBRks7QUFNWDlXLG9CQUFZO0FBQ1ZDLGdCQUFNLE1BREk7QUFFVkMsZ0JBQU0sTUFGSTtBQUdWQyxnQkFBTSxNQUhJO0FBSVZDLHdCQUFjLGNBSko7QUFLVkMsd0JBQWMsY0FMSjtBQU1WQyx3QkFBYyxjQU5KO0FBT1ZDLHVCQUFhLGFBUEg7QUFRVkMscUJBQVc7QUFSRCxTQU5EO0FBZ0JYQyxjQUFNO0FBQ0pDLHVDQUE2QixxQ0FEekI7QUFFSkMsd0JBQWM7QUFGVixTQWhCSztBQW9CWEMsa0JBQVUsSUFwQkM7QUFxQlhDLGlCQUFTO0FBckJFLE9BbkJEO0FBMENadUIsNkJBQXVCLElBMUNYO0FBMkNaSyxrQkFBWSxJQTNDQTtBQTRDWkMscUJBQWUsSUE1Q0g7QUE2Q1pFLGtCQUFZLElBN0NBO0FBOENaQyx3QkFBa0I7QUE5Q04sS0FBZDtBQWdEQSxvQkFBT3lNLE1BQVAsQ0FBYyxJQUFkLEVBQW9CLE9BQUt0RCxNQUF6QixFQUFpQ0EsTUFBakM7O0FBRUE7QUFDQTs7OztBQUlBLFdBQUsrSyxXQUFMLEdBQW1CO0FBQ2pCLGdCQUFVLEVBQUNqSCxPQUFPLE9BQUs5RCxNQUFMLENBQVl2TCxJQUFaLENBQWlCLFFBQWpCLENBQVIsRUFBb0MyTyxPQUFPLFFBQTNDLEVBRE87QUFFakIsZUFBUyxFQUFDVSxPQUFPLE9BQUs5RCxNQUFMLENBQVl2TCxJQUFaLENBQWlCLE9BQWpCLENBQVIsRUFBbUMyTyxPQUFPLE9BQTFDO0FBRlEsS0FBbkI7O0FBS0E7Ozs7QUFJQSxXQUFLcE8sYUFBTCxHQUFxQixFQUFyQjs7QUFFQTs7OztBQUlBLFdBQUtnUixPQUFMLEdBQWUsSUFBZjs7QUFFQTs7OztBQUlBLFdBQUtYLFVBQUwsR0FBa0IsSUFBbEI7QUFDQTs7OztBQUlBLFdBQUtzRSxjQUFMLEdBQXNCLElBQXRCOztBQUVBOzs7O0FBSUEsV0FBS3ZFLGFBQUwsR0FBcUIsSUFBckI7O0FBRUE7Ozs7QUFJQSxXQUFLVSxTQUFMLEdBQWlCLElBQWpCOztBQUVBOzs7O0FBSUEsV0FBS1AsWUFBTCxHQUFvQixJQUFwQjs7QUFFQTs7OztBQUlBLFdBQUsyRCxXQUFMLEdBQW1CLEtBQW5COztBQUVBOzs7O0FBSUEsV0FBSzFTLGFBQUwsR0FBcUIsRUFBckI7O0FBRUE7Ozs7QUFJQSxXQUFLcVQsa0JBQUwsR0FBMEIsQ0FBMUI7O0FBRUE7Ozs7QUFJQSxXQUFLRyxRQUFMLEdBQWdCLENBQWhCOztBQUVBLFFBQUksT0FBT2hLLE1BQVAsS0FBa0IsV0FBdEIsRUFBbUMsT0FBS3dELElBQUw7QUExS2pCO0FBMktuQjs7QUFFRDs7Ozs7OzsyQkFHTztBQUNMLFdBQUs3RCxjQUFMLEdBQXNCLEtBQUtLLE1BQUwsQ0FBWUwsY0FBbEM7QUFDQSxhQUFPLEtBQUtLLE1BQUwsQ0FBWUwsY0FBbkI7O0FBRUEsVUFBSSxLQUFLSyxNQUFMLENBQVk1TSxNQUFoQixFQUF3QjtBQUN0QixhQUFLNFMsT0FBTCxHQUFlLHFCQUFPLEtBQUtoRyxNQUFMLENBQVk1TSxNQUFuQixDQUFmOztBQUVBO0FBQ0EsWUFBSSxLQUFLNE0sTUFBTCxDQUFZbk0sUUFBWixJQUF3QixLQUFLbU0sTUFBTCxDQUFZbk0sUUFBWixDQUFxQlQsTUFBN0MsSUFBdUQsa0JBQUt5UixjQUFoRSxFQUFnRjtBQUM5RSxlQUFLaUIsU0FBTCxHQUFpQixxQkFBTyxLQUFLOUYsTUFBTCxDQUFZbk0sUUFBWixDQUFxQlQsTUFBNUIsQ0FBakI7QUFDQSxlQUFLMFMsU0FBTCxDQUNHTCxJQURILENBQ1EsOEJBRFIsRUFDd0MsS0FBS3RDLFVBRDdDO0FBRUQ7O0FBRUQ7QUFDQSxZQUFJLEtBQUtuRCxNQUFMLENBQVlsTSxXQUFaLElBQTJCLEtBQUtrTSxNQUFMLENBQVlsTSxXQUFaLENBQXdCVixNQUF2RCxFQUErRDtBQUM3RCxlQUFLbVMsWUFBTCxHQUFvQixxQkFBTyxLQUFLdkYsTUFBTCxDQUFZbE0sV0FBWixDQUF3QlYsTUFBL0IsQ0FBcEI7QUFDRDs7QUFFRDtBQUNBLFNBQUMsVUFBVW9DLElBQVYsRUFBZ0I7QUFDZixjQUFJLGtCQUFFd1YsUUFBRixDQUFXeFYsSUFBWCxLQUFvQixDQUFDQSxLQUFLUSxLQUE5QixFQUFxQztBQUNuQyxpQkFBS2dLLE1BQUwsR0FBYyxnQkFBT3NELE1BQVAsQ0FBYyxJQUFkLEVBQW9CLEVBQXBCLEVBQXdCLEtBQUt0RCxNQUE3QixFQUFxQ3hLLElBQXJDLENBQWQ7QUFDRDtBQUNGLFNBSkQsRUFJR29ELElBSkgsQ0FJUSxJQUpSLEVBSWMsa0JBQUUrUCxTQUFGLENBQVksS0FBSzNDLE9BQUwsQ0FBYVAsSUFBYixDQUFrQiw0QkFBbEIsQ0FBWixFQUE2RCxJQUE3RCxDQUpkOztBQU9BO0FBQ0E7QUFDQSxhQUFLTCxhQUFMLEdBQXFCLEtBQUtZLE9BQUwsQ0FBYTNTLElBQWIsQ0FBa0IseUNBQWxCLENBQXJCO0FBQ0EsWUFBSSxLQUFLK1IsYUFBTCxDQUFtQjdPLE1BQW5CLEtBQThCLENBQWxDLEVBQXFDO0FBQ25DRixrQkFBUUMsR0FBUixDQUFZLGtCQUFLMlUsUUFBTCxDQUFjLGdCQUFkLEVBQWdDLEtBQWhDLEVBQXVDLDRCQUF2QyxDQUFaO0FBQ0EsaUJBQU8sSUFBUDtBQUNEOztBQUVEO0FBQ0FULHNCQUFjNVIsSUFBZCxDQUFtQixJQUFuQjs7QUFFQTtBQUNBLGFBQUtvSCxNQUFMLENBQVlFLElBQVosR0FBbUIsZ0JBQU9vRCxNQUFQLENBQWMsRUFBZCxFQUFrQixLQUFLeUgsV0FBdkIsRUFBb0MsS0FBSy9LLE1BQUwsQ0FBWUUsSUFBaEQsQ0FBbkI7O0FBRUEsYUFBS2dILFlBQUwsR0FBb0IscUJBQ2xCLHNCQUFTaEosTUFBVCxDQUFnQm1HLEtBQUsxUSxXQUFMLENBQWlCaUYsSUFBakIsQ0FBc0IsSUFBdEIsQ0FBaEIsRUFBNkM7QUFDM0N1SyxzQkFBWSxLQUFLQSxVQUQwQjtBQUUzQ2pELGdCQUFNLEtBQUtGLE1BQUwsQ0FBWUU7QUFGeUIsU0FBN0MsQ0FEa0IsQ0FBcEI7QUFNQSxhQUFLa0ssWUFBTCxHQUFvQixLQUFLbEQsWUFBTCxDQUFrQjdULElBQWxCLENBQXVCLHNCQUF2QixDQUFwQjtBQUNBLGFBQUtnWCxlQUFMLEdBQXVCLEtBQUtuRCxZQUFMLENBQWtCN1QsSUFBbEIsQ0FBdUIseUJBQXZCLENBQXZCO0FBQ0EsYUFBS21VLGlCQUFMLEdBQXlCLEtBQUtOLFlBQUwsQ0FBa0I3VCxJQUFsQixDQUF1Qix1QkFBdkIsQ0FBekI7QUFDQSxhQUFLd1UsZUFBTCxHQUF1QixLQUFLWCxZQUFMLENBQWtCN1QsSUFBbEIsQ0FBdUIsaUNBQXZCLENBQXZCO0FBQ0EsYUFBSzBVLGNBQUwsR0FBc0IsS0FBS2IsWUFBTCxDQUFrQjdULElBQWxCLENBQXVCLGdDQUF2QixDQUF0Qjs7QUFFQTtBQUNBLFlBQUksQ0FBQyxrQkFBS3dSLGNBQVYsRUFBMEI7QUFDeEIsZUFBS2tELGNBQUwsQ0FBb0JySCxHQUFwQixDQUF3QixFQUFDd0ssU0FBUSxNQUFULEVBQXhCO0FBQ0Q7O0FBRUQ7QUFDQS9GLGtCQUFVdk0sSUFBVixDQUFlLElBQWY7QUFDQTJSLDJCQUFtQjNSLElBQW5CLENBQXdCLElBQXhCO0FBQ0Q7O0FBRUQ7QUFDQSxXQUFLNkssUUFBTDtBQUNEOztBQUVEOzs7Ozs7K0JBR1c7QUFDVCxVQUFJLEtBQUtDLFdBQVQsRUFBc0IsT0FBTyxJQUFQO0FBQ3RCLFdBQUtBLFdBQUwsR0FBbUIsSUFBbkI7QUFDRDs7QUFHRDs7Ozs7OzsyQkFJTztBQUNMO0FBQ0EsVUFBSSxLQUFLbE4sYUFBTCxDQUFtQkQsTUFBbkIsSUFBNkIsa0JBQUVzQyxVQUFGLENBQWEsS0FBS21ILE1BQUwsQ0FBWTVKLHFCQUF6QixDQUFqQyxFQUFrRjtBQUNoRixZQUFJeUosT0FBTztBQUNUZCxnQkFBTSxJQURHO0FBRVQvSix5QkFBZSxLQUFLQSxhQUZYO0FBR1R3Qix5QkFBZSxLQUFLQTtBQUhYLFNBQVg7QUFLQSxZQUFJLENBQUMsS0FBS3dKLE1BQUwsQ0FBWTVKLHFCQUFaLENBQWtDd0MsSUFBbEMsQ0FBdUNpSCxJQUF2QyxFQUE2Q0EsSUFBN0MsQ0FBTCxFQUF5RDtBQUN2RDRLLHVCQUFhN1IsSUFBYixDQUFrQixJQUFsQjtBQUNBLGlCQUFPLEtBQVA7QUFDQTtBQUNEO0FBQ0Y7O0FBRURxUCxrQkFBWXJQLElBQVosQ0FBaUIsSUFBakI7QUFDQSxhQUFPLElBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs0QkFJUTtBQUNOLFVBQUksQ0FBQyxrQkFBS2lNLGNBQVYsRUFBMEI7QUFDeEI5TyxjQUFNLHlDQUFOO0FBQ0EsZUFBTyxJQUFQO0FBQ0Q7QUFDRDBVLG1CQUFhN1IsSUFBYixDQUFrQixJQUFsQjtBQUNBLGFBQU8sSUFBUDtBQUNEOztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQ0F1QmlCdVMsTSxFQUFRO0FBQ3ZCLFVBQUksa0JBQUUzUyxPQUFGLENBQVUyUyxNQUFWLENBQUosRUFBdUI7QUFDckIsYUFBS25XLGFBQUwsR0FBcUJtVyxNQUFyQjtBQUNEO0FBQ0QsVUFBSSxrQkFBRXZILFFBQUYsQ0FBV3VILE1BQVgsQ0FBSixFQUF3QjtBQUN0QixZQUFJO0FBQ0YsZUFBS25XLGFBQUwsR0FBcUJTLEtBQUt3SSxLQUFMLENBQVdrTixNQUFYLENBQXJCO0FBQ0QsU0FGRCxDQUdBLE9BQU9sVSxDQUFQLEVBQVUsQ0FFVDtBQUNGOztBQUVEc1QseUJBQW1CM1IsSUFBbkIsQ0FBd0IsSUFBeEI7QUFDQSxhQUFPLElBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7NEJBS1E7QUFDTixXQUFLOUIsZ0JBQUwsQ0FBc0IsRUFBdEI7QUFDQSxhQUFPLElBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7K0JBV1dzVSxNLEVBQVE7QUFDakIsVUFBSSxDQUFDQyxNQUFNMUYsT0FBT3lGLE1BQVAsQ0FBTixDQUFMLEVBQTRCO0FBQzFCLGFBQUtwVyxhQUFMLENBQW1Cc1csTUFBbkIsQ0FBMEJGLE1BQTFCLEVBQWtDLENBQWxDO0FBQ0Q7QUFDRGIseUJBQW1CM1IsSUFBbkIsQ0FBd0IsSUFBeEI7QUFDQSxhQUFPLElBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs7O29DQVNnQjtBQUNkLFdBQUs1RCxhQUFMLEdBQXFCLEVBQXJCO0FBQ0F1Vix5QkFBbUIzUixJQUFuQixDQUF3QixJQUF4QjtBQUNBLGFBQU8sSUFBUDtBQUNEOztBQUVEOzs7Ozs7O2lDQUlhO0FBQ1gsVUFBSSxrQkFBS2lNLGNBQVQsRUFBeUI7QUFDdkIsYUFBS1EsVUFBTCxDQUFnQjdELE9BQWhCLENBQXdCLE9BQXhCO0FBQ0EsZUFBTyxJQUFQO0FBQ0Q7QUFDRCxhQUFPLEtBQVA7QUFDRDs7Ozs7O2tCQUdZcUosYTs7Ozs7O0FDcmlDZjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxnQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDLEM7Ozs7OztBQ3pCQTtBQUNBOzs7QUFHQTtBQUNBLDREQUE2RCxRQUFRLG1CQUFtQixrQ0FBa0MsRUFBRSxVQUFVLG1CQUFtQixrQ0FBa0MsRUFBRSxFQUFFLG9DQUFvQyxRQUFRLG1CQUFtQiwrQkFBK0IsRUFBRSxVQUFVLG1CQUFtQiwrQkFBK0IsRUFBRSxFQUFFLCtCQUErQixRQUFRLG1CQUFtQixrQ0FBa0MsK0JBQStCLDhCQUE4Qiw2QkFBNkIsMEJBQTBCLEVBQUUsVUFBVSxtQkFBbUIsa0NBQWtDLCtCQUErQiw4QkFBOEIsNkJBQTZCLDBCQUEwQixFQUFFLEVBQUUsNkNBQTZDLFVBQVUsa0NBQWtDLEVBQUUsUUFBUSwrQkFBK0IsRUFBRSxFQUFFLDBDQUEwQyxVQUFVLGtDQUFrQyxFQUFFLFFBQVEsK0JBQStCLEVBQUUsRUFBRSxxQ0FBcUMsVUFBVSxrQ0FBa0MsRUFBRSxRQUFRLCtCQUErQixFQUFFLEVBQUUsdUNBQXVDLFFBQVEsbUJBQW1CLGtDQUFrQyxFQUFFLFVBQVUsbUJBQW1CLGtDQUFrQyxFQUFFLEVBQUUsb0NBQW9DLFFBQVEsbUJBQW1CLCtCQUErQixFQUFFLFVBQVUsbUJBQW1CLCtCQUErQixFQUFFLEVBQUUsK0JBQStCLFFBQVEsbUJBQW1CLGtDQUFrQywrQkFBK0IsOEJBQThCLDZCQUE2QiwwQkFBMEIsRUFBRSxVQUFVLG1CQUFtQixrQ0FBa0MsK0JBQStCLDhCQUE4Qiw2QkFBNkIsMEJBQTBCLEVBQUUsRUFBRSwyQkFBMkIsMkJBQTJCLHVCQUF1QixFQUFFLGtHQUFrRyw2QkFBNkIsRUFBRSxxRUFBcUUseUJBQXlCLEVBQUUsMERBQTBELDBCQUEwQixpQ0FBaUMseUJBQXlCLHFCQUFxQixtQkFBbUIsc0JBQXNCLEVBQUUscUVBQXFFLHlCQUF5QixrQ0FBa0MscUJBQXFCLEVBQUUsd0NBQXdDLHdCQUF3QiwyQkFBMkIsdUJBQXVCLG1CQUFtQixpQkFBaUIsc0JBQXNCLEVBQUUsMEVBQTBFLHFCQUFxQix5QkFBeUIsRUFBRSxnSEFBZ0gsdUJBQXVCLHVCQUF1QiwrQkFBK0IsMkJBQTJCLHlCQUF5QixvQkFBb0IseUJBQXlCLEVBQUUsd1ZBQXdWLHlCQUF5QixnQ0FBZ0MsRUFBRSwwT0FBME8scUJBQXFCLGlDQUFpQywyREFBMkQsRUFBRSxtWEFBbVgsOEJBQThCLHVCQUF1QiwyQkFBMkIsRUFBRSx5SUFBeUksd0JBQXdCLEVBQUUsd0lBQXdJLHlCQUF5QixFQUFFLDhKQUE4SixnQ0FBZ0MsMkJBQTJCLEVBQUUsaUxBQWlMLDRCQUE0QixFQUFFLG1oQkFBbWhCLDZCQUE2QixvQ0FBb0MsRUFBRSwrS0FBK0ssNEJBQTRCLEVBQUUsNmdCQUE2Z0IsNkJBQTZCLG9DQUFvQyxFQUFFLGdIQUFnSCx5QkFBeUIsc0JBQXNCLDRCQUE0QixnQ0FBZ0Msb0JBQW9CLEVBQUUsMkZBQTJGLHFCQUFxQixxQkFBcUIsa0JBQWtCLEVBQUUseUhBQXlILHFCQUFxQixrQkFBa0IsRUFBRSw4RkFBOEYscUJBQXFCLHFCQUFxQixrQkFBa0IsRUFBRSw0SEFBNEgscUJBQXFCLGtCQUFrQixtQkFBbUIsaUJBQWlCLDhCQUE4QixFQUFFLG9RQUFvUSxtQkFBbUIsK0JBQStCLHlCQUF5QixFQUFFLHFKQUFxSix1QkFBdUIsRUFBRSxnS0FBZ0ssdUJBQXVCLHdCQUF3QixpQ0FBaUMsNkJBQTZCLG9DQUFvQywrRUFBK0Usb0VBQW9FLDZCQUE2Qiw2QkFBNkIsc0JBQXNCLEVBQUUseUtBQXlLLGdDQUFnQyxFQUFFLHNLQUFzSywwQkFBMEIsRUFBRSwySkFBMkosdUJBQXVCLHdCQUF3QixpQ0FBaUMsNkJBQTZCLEVBQUUsb0pBQW9KLDJCQUEyQix1QkFBdUIsRUFBRSwwS0FBMEsseUJBQXlCLDhCQUE4QiwyQkFBMkIsa0NBQWtDLEVBQUUsNkxBQTZMLDZCQUE2QixvQkFBb0Isc0JBQXNCLDBCQUEwQiwyQkFBMkIsNkJBQTZCLEVBQUUsMkxBQTJMLDZCQUE2QixxQkFBcUIsc0JBQXNCLDBCQUEwQiwyQkFBMkIsNkJBQTZCLEVBQUUsNkxBQTZMLDJCQUEyQixFQUFFLGlDQUFpQyx1QkFBdUIsa0JBQWtCLGlCQUFpQixlQUFlLG9CQUFvQixFQUFFLHVDQUF1QywyQkFBMkIsa0JBQWtCLHVCQUF1QixjQUFjLGFBQWEsaUJBQWlCLGdDQUFnQyw2QkFBNkIsd0JBQXdCLHlDQUF5QyxzQ0FBc0MscUNBQXFDLG9DQUFvQyxpQ0FBaUMsMkNBQTJDLHdDQUF3QyxtQ0FBbUMscUNBQXFDLGtDQUFrQyxpQ0FBaUMsZ0NBQWdDLDZCQUE2Qix5Q0FBeUMsc0NBQXNDLHFDQUFxQyxvQ0FBb0MsaUNBQWlDLDJCQUEyQiw0REFBNEQsbURBQW1ELHNCQUFzQix1QkFBdUIsdUJBQXVCLHFEQUFxRCxFQUFFLGlEQUFpRCx1QkFBdUIsbUJBQW1CLHVCQUF1QixnQ0FBZ0MseUJBQXlCLHFEQUFxRCxFQUFFLHFEQUFxRCxrQkFBa0IsZ0JBQWdCLG1CQUFtQixzQkFBc0Isd0JBQXdCLGtCQUFrQix5QkFBeUIsZ0NBQWdDLHFEQUFxRCwwQ0FBMEMsdUNBQXVDLGtDQUFrQyxFQUFFLG1JQUFtSSxvTkFBb04sK01BQStNLDRNQUE0TSxpQ0FBaUMsRUFBRSxpSUFBaUksaUVBQWlFLDhEQUE4RCx5REFBeUQsRUFBRSw0REFBNEQsb0JBQW9CLHlCQUF5QixFQUFFLHNGQUFzRix3QkFBd0IsRUFBRSxzRkFBc0YsMEJBQTBCLGlDQUFpQyxFQUFFLG1HQUFtRywyQkFBMkIsMkJBQTJCLEVBQUUsZ0hBQWdILDRCQUE0QixFQUFFLDJFQUEyRSx5QkFBeUIsZUFBZSxnQkFBZ0IsZ0JBQWdCLGFBQWEsRUFBRSxvRkFBb0YscUJBQXFCLDJCQUEyQixpQkFBaUIsa0JBQWtCLG1CQUFtQixtQkFBbUIsMkNBQTJDLDRDQUE0QywyQkFBMkIsdUNBQXVDLEVBQUUsbUZBQW1GLHFCQUFxQiwyQkFBMkIsaUJBQWlCLGtCQUFrQixtQkFBbUIsbUJBQW1CLDJDQUEyQyw0Q0FBNEMsMkJBQTJCLHVDQUF1QyxFQUFFLDZFQUE2RSx5QkFBeUIsZUFBZSxnQkFBZ0IsZUFBZSxlQUFlLEVBQUUsc0ZBQXNGLHFCQUFxQiwyQkFBMkIsaUJBQWlCLGtCQUFrQixxQkFBcUIsa0JBQWtCLHFDQUFxQyw2QkFBNkIsMENBQTBDLDZDQUE2QyxFQUFFLHFGQUFxRixxQkFBcUIsMkJBQTJCLGlCQUFpQixrQkFBa0IscUJBQXFCLGtCQUFrQixxQ0FBcUMsNkJBQTZCLDBDQUEwQyw2Q0FBNkMsRUFBRSw4RUFBOEUseUJBQXlCLGVBQWUsZ0JBQWdCLGdCQUFnQixnQkFBZ0IsRUFBRSx1RkFBdUYscUJBQXFCLDJCQUEyQixpQkFBaUIsa0JBQWtCLG1CQUFtQixzQkFBc0IsMkNBQTJDLDRDQUE0QyxvQ0FBb0MsOEJBQThCLEVBQUUsc0ZBQXNGLHFCQUFxQiwyQkFBMkIsaUJBQWlCLGtCQUFrQixtQkFBbUIsc0JBQXNCLDJDQUEyQyw0Q0FBNEMsb0NBQW9DLDhCQUE4QixFQUFFLDRFQUE0RSx5QkFBeUIsZUFBZSxnQkFBZ0IsY0FBYyxlQUFlLEVBQUUscUZBQXFGLHFCQUFxQiwyQkFBMkIsaUJBQWlCLGtCQUFrQixvQkFBb0Isa0JBQWtCLDRCQUE0QixzQ0FBc0MsMENBQTBDLDZDQUE2QyxFQUFFLG9GQUFvRixxQkFBcUIsMkJBQTJCLGlCQUFpQixrQkFBa0Isb0JBQW9CLGtCQUFrQiw0QkFBNEIsc0NBQXNDLDBDQUEwQyw2Q0FBNkMsRUFBRSwrQ0FBK0MscUdBQXFHLGtHQUFrRyw2RkFBNkYsRUFBRSxxREFBcUQsMkNBQTJDLHdDQUF3Qyx1Q0FBdUMsc0NBQXNDLG1DQUFtQyxFQUFFLHVEQUF1RCw2Q0FBNkMsMENBQTBDLHlDQUF5Qyx3Q0FBd0MscUNBQXFDLEVBQUUsd0RBQXdELDhDQUE4QywyQ0FBMkMsMENBQTBDLHlDQUF5QyxzQ0FBc0MsRUFBRSxzREFBc0QsNENBQTRDLHlDQUF5Qyx3Q0FBd0MsdUNBQXVDLG9DQUFvQyxFQUFFOztBQUV6cGxCIiwiZmlsZSI6IjEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tIFwianFtaW5cIjtcbmltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcbmltcG9ydCBEaWFsb2cgZnJvbSBcIi4uLy4uL3NyYy9BWDZVSURpYWxvZ1wiO1xuaW1wb3J0IFVwbG9hZGVyIGZyb20gXCIuLi8uLi9zcmMvQVg2VUlVcGxvYWRlclwiO1xuaW1wb3J0IFwiLi4vLi4vc3JjL0FYNlVJRGlhbG9nL3N0eWxlLnNjc3NcIjtcbmltcG9ydCBcIi4uLy4uL3NyYy9BWDZVSVVwbG9hZGVyL3N0eWxlLnNjc3NcIjtcblxubGV0IGh0bWwgPSBgXG48ZGl2IGRhdGEtYXg2dWktdXBsb2FkZXI9XCJ1cGxvYWQxXCI+XG4gICAgPGJ1dHRvbiBkYXRhLWF4NnVpLXVwbG9hZGVyLWJ1dHRvbj1cInNlbGVjdG9yXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIj5TZWxlY3QgRmlsZSAoKi8qKTwvYnV0dG9uPlxuICAgIChVcGxvYWQgTWF4IGZpbGVTaXplIDIwTUIpXG4gICAgPGRpdiBkYXRhLXVwbG9hZGVkLWJveD1cInVwbG9hZDFcIiBkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveD1cImlubGluZVwiPjwvZGl2PlxuPC9kaXY+XG5cbjxkaXYgc3R5bGU9XCJwYWRkaW5nOiAwO1wiIGRhdGEtYnRuLXdyYXA9XCJcIj5cbiAgICA8aDU+Y29udHJvbDwvaDU+XG4gICAgPGEgY2xhc3M9XCJ3YXZlcy1lZmZlY3Qgd2F2ZXMtbGlnaHQgYnRuXCIgZGF0YS1idG49XCJnZXRVcGxvYWRlZEZpbGVzXCI+Z2V0VXBsb2FkZWRGaWxlczwvYT5cbiAgICA8YSBjbGFzcz1cIndhdmVzLWVmZmVjdCB3YXZlcy1saWdodCBidG5cIiBkYXRhLWJ0bj1cInJlbW92ZUZpbGVBbGxcIj5yZW1vdmVGaWxlQWxsPC9hPlxuPC9kaXY+XG5gO1xubGV0IGZuID0ge1xuICBtb2R1bGVSdW46IGZ1bmN0aW9uICgkYm9keSkge1xuICAgIGxldCBkaWFsb2cgPSBuZXcgRGlhbG9nKHtcbiAgICAgIHRpdGxlOiBcIkFYNlVJVXBsb2FkZXJcIlxuICAgIH0pO1xuICAgIGxldCB1cGxvYWRlciA9IG5ldyBVcGxvYWRlcih7XG4gICAgICAvL2RlYnVnOiB0cnVlLFxuICAgICAgdGFyZ2V0OiAkYm9keS5maW5kKCdbZGF0YS1heDZ1aS11cGxvYWRlcj1cInVwbG9hZDFcIl0nKSxcbiAgICAgIGZvcm06IHtcbiAgICAgICAgYWN0aW9uOiBcImh0dHA6Ly9hcGktZGVtby5heDUuaW8vYXBpL3YxL2F4NXVwbG9hZGVyXCIsXG4gICAgICAgIGZpbGVOYW1lOiBcImZpbGVcIlxuICAgICAgfSxcbiAgICAgIG11bHRpcGxlOiB0cnVlLFxuICAgICAgbWFudWFsVXBsb2FkOiBmYWxzZSxcbiAgICAgIHByb2dyZXNzQm94OiB0cnVlLFxuICAgICAgcHJvZ3Jlc3NCb3hEaXJlY3Rpb246IFwibGVmdFwiLFxuICAgICAgZHJvcFpvbmU6IHtcbiAgICAgICAgdGFyZ2V0OiAkYm9keS5maW5kKCdbZGF0YS11cGxvYWRlZC1ib3g9XCJ1cGxvYWQxXCJdJylcbiAgICAgIH0sXG4gICAgICB1cGxvYWRlZEJveDoge1xuICAgICAgICB0YXJnZXQ6ICRib2R5LmZpbmQoJ1tkYXRhLXVwbG9hZGVkLWJveD1cInVwbG9hZDFcIl0nKSxcbiAgICAgICAgaWNvbjoge1xuICAgICAgICAgIFwiZG93bmxvYWRcIjogJzxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5maWxlX2Rvd25sb2FkPC9pPicsXG4gICAgICAgICAgXCJkZWxldGVcIjogJzxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5kZWxldGU8L2k+J1xuICAgICAgICB9LFxuICAgICAgICBjb2x1bW5LZXlzOiB7XG4gICAgICAgICAgbmFtZTogXCJmaWxlTmFtZVwiLFxuICAgICAgICAgIHR5cGU6IFwiZXh0XCIsXG4gICAgICAgICAgc2l6ZTogXCJmaWxlU2l6ZVwiLFxuICAgICAgICAgIHVwbG9hZGVkTmFtZTogXCJzYXZlTmFtZVwiLFxuICAgICAgICAgIHVwbG9hZGVkUGF0aDogXCJcIixcbiAgICAgICAgICBkb3dubG9hZFBhdGg6IFwiXCIsXG4gICAgICAgICAgcHJldmlld1BhdGg6IFwiXCIsXG4gICAgICAgICAgdGh1bWJuYWlsOiBcIlwiXG4gICAgICAgIH0sXG4gICAgICAgIGxhbmc6IHtcbiAgICAgICAgICBzdXBwb3J0ZWRIVE1MNV9lbXB0eUxpc3RNc2c6ICdEcm9wIGZpbGVzIGhlcmUgb3IgY2xpY2sgdG8gdXBsb2FkLicsXG4gICAgICAgICAgZW1wdHlMaXN0TXNnOiAnRW1wdHkgb2YgTGlzdC4nXG4gICAgICAgIH0sXG4gICAgICAgIG9uY2hhbmdlOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgfSxcbiAgICAgICAgb25jbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuY2VsbFR5cGUpO1xuICAgICAgICAgIGxldCBmaWxlSW5kZXggPSB0aGlzLmZpbGVJbmRleDtcbiAgICAgICAgICBsZXQgZmlsZSA9IHRoaXMudXBsb2FkZWRGaWxlc1tmaWxlSW5kZXhdO1xuICAgICAgICAgIHN3aXRjaCAodGhpcy5jZWxsVHlwZSkge1xuICAgICAgICAgICAgY2FzZSBcImRlbGV0ZVwiOlxuICAgICAgICAgICAgICBkaWFsb2cuY29uZmlybSh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiQVg1VUlcIixcbiAgICAgICAgICAgICAgICBtc2c6IFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSBpdD9cIlxuICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMua2V5ID09IFwib2tcIikge1xuXG4gICAgICAgICAgICAgICAgICBheGlvcyh7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogXCJwb3N0XCIsXG4gICAgICAgICAgICAgICAgICAgIHVybDogJ2h0dHA6Ly9hcGktZGVtby5heDUuaW8vYXBpL3YxL2F4NXVwbG9hZGVyL2RlbGV0ZScsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KFt7XG4gICAgICAgICAgICAgICAgICAgICAgaWQ6IGZpbGUuaWRcbiAgICAgICAgICAgICAgICAgICAgfV0pLFxuICAgICAgICAgICAgICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICB1cGxvYWRlci5yZW1vdmVGaWxlKGZpbGVJbmRleCk7XG4gICAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZy5hbGVydChlcnJvcik7XG4gICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFwiZG93bmxvYWRcIjpcbiAgICAgICAgICAgICAgaWYgKGZpbGUuZG93bmxvYWQpIHtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gXCJodHRwOi8vYXBpLWRlbW8uYXg1LmlvXCIgKyBmaWxlLmRvd25sb2FkO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHZhbGlkYXRlU2VsZWN0ZWRGaWxlczogZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzKTtcbiAgICAgICAgLy8gMTDqsJwg7J207IOBIOyXheuhnOuTnCDrkJjsp4Ag7JWK64+E66GdIOygnO2VnC5cbiAgICAgICAgaWYgKHRoaXMudXBsb2FkZWRGaWxlcy5sZW5ndGggKyB0aGlzLnNlbGVjdGVkRmlsZXMubGVuZ3RoID4gMTApIHtcbiAgICAgICAgICBhbGVydChcIllvdSBjYW4gbm90IHVwbG9hZCBtb3JlIHRoYW4gMTAgZmlsZXMuXCIpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgICBvbnByb2dyZXNzOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIH0sXG4gICAgICBvbnVwbG9hZGVycm9yOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZXJyb3IpO1xuICAgICAgICBkaWFsb2cuYWxlcnQodGhpcy5lcnJvci5tZXNzYWdlKTtcbiAgICAgIH0sXG4gICAgICBvbnVwbG9hZGVkOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIH0sXG4gICAgICBvbnVwbG9hZENvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIO2MjOydvCDrqqnroZ0g6rCA7KC47Jik6riwXG4gICAgYXhpb3Moe1xuICAgICAgbWV0aG9kOiAnZ2V0JyxcbiAgICAgIHVybDogJ2h0dHA6Ly9hcGktZGVtby5heDUuaW8vYXBpL3YxL2F4NXVwbG9hZGVyJ1xuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgIHVwbG9hZGVyLnNldFVwbG9hZGVkRmlsZXMocmVzLmRhdGEpO1xuICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9KTtcblxuICAgICRib2R5Lm9uKFwiY2xpY2tcIiwgJ1tkYXRhLWJ0bl0nLCAoZSkgPT4ge1xuICAgICAgbGV0IGJ0biA9IGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWJ0blwiKTtcbiAgICAgIGxldCBwcm9jZXNzb3IgPSB7XG4gICAgICAgIFwiZ2V0VXBsb2FkZWRGaWxlc1wiKCkge1xuICAgICAgICAgIGxldCBmaWxlcyA9IHVwbG9hZGVyLnVwbG9hZGVkRmlsZXM7XG4gICAgICAgICAgY29uc29sZS5sb2coZmlsZXMpO1xuICAgICAgICAgIGRpYWxvZy5hbGVydChKU09OLnN0cmluZ2lmeShmaWxlcykpO1xuICAgICAgICB9LFxuICAgICAgICBcInJlbW92ZUZpbGVBbGxcIigpIHtcbiAgICAgICAgICBkaWFsb2cuY29uZmlybSh7XG4gICAgICAgICAgICB0aXRsZTogXCJBWDZVSVVwbG9hZGVyXCIsXG4gICAgICAgICAgICBtc2c6IFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSBpdD9cIlxuICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmtleSA9PSBcIm9rXCIpIHtcbiAgICAgICAgICAgICAgbGV0IGRlbGV0ZUZpbGVzID0gW107XG4gICAgICAgICAgICAgIHVwbG9hZGVyLnVwbG9hZGVkRmlsZXMuZm9yRWFjaChmdW5jdGlvbiAoZikge1xuICAgICAgICAgICAgICAgIGRlbGV0ZUZpbGVzLnB1c2goe2lkOiBmLmlkfSk7XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgIGF4aW9zKHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwicG9zdFwiLFxuICAgICAgICAgICAgICAgIHVybDogJ2h0dHA6Ly9hcGktZGVtby5heDUuaW8vYXBpL3YxL2F4NXVwbG9hZGVyL2RlbGV0ZScsXG4gICAgICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoZGVsZXRlRmlsZXMpLFxuICAgICAgICAgICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgdXBsb2FkZXIucmVtb3ZlRmlsZUFsbCgpO1xuICAgICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBpZiAoYnRuIGluIHByb2Nlc3Nvcikge1xuICAgICAgICBwcm9jZXNzb3JbYnRuXSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuICBtb2R1bGVEZXN0cm95OiBmdW5jdGlvbiAoJGJvZHkpIHtcbiAgICAkYm9keS5vZmYoXCJjbGlja1wiKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBodG1sOiBodG1sLFxuICBmbjogZm5cbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3VwbG9hZGVyLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG52YXIgaXNCdWZmZXIgPSByZXF1aXJlKCdpcy1idWZmZXInKTtcblxuLypnbG9iYWwgdG9TdHJpbmc6dHJ1ZSovXG5cbi8vIHV0aWxzIGlzIGEgbGlicmFyeSBvZiBnZW5lcmljIGhlbHBlciBmdW5jdGlvbnMgbm9uLXNwZWNpZmljIHRvIGF4aW9zXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXkodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXIodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5QnVmZmVyXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEZvcm1EYXRhLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGb3JtRGF0YSh2YWwpIHtcbiAgcmV0dXJuICh0eXBlb2YgRm9ybURhdGEgIT09ICd1bmRlZmluZWQnKSAmJiAodmFsIGluc3RhbmNlb2YgRm9ybURhdGEpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJWaWV3KHZhbCkge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcpICYmIChBcnJheUJ1ZmZlci5pc1ZpZXcpKSB7XG4gICAgcmVzdWx0ID0gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gKHZhbCkgJiYgKHZhbC5idWZmZXIpICYmICh2YWwuYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJpbmdcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmluZywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZyc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBOdW1iZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIE51bWJlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTnVtYmVyKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ251bWJlcic7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgdW5kZWZpbmVkXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIHVuZGVmaW5lZCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBEYXRlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBEYXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNEYXRlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBEYXRlXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGaWxlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGaWxlXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCbG9iXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCbG9iLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNCbG9iKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBCbG9iXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRnVuY3Rpb24sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyZWFtXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJlYW0sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmVhbSh2YWwpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHZhbCkgJiYgaXNGdW5jdGlvbih2YWwucGlwZSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNVUkxTZWFyY2hQYXJhbXModmFsKSB7XG4gIHJldHVybiB0eXBlb2YgVVJMU2VhcmNoUGFyYW1zICE9PSAndW5kZWZpbmVkJyAmJiB2YWwgaW5zdGFuY2VvZiBVUkxTZWFyY2hQYXJhbXM7XG59XG5cbi8qKlxuICogVHJpbSBleGNlc3Mgd2hpdGVzcGFjZSBvZmYgdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgU3RyaW5nIHRvIHRyaW1cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBTdHJpbmcgZnJlZWQgb2YgZXhjZXNzIHdoaXRlc3BhY2VcbiAqL1xuZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzKi8sICcnKS5yZXBsYWNlKC9cXHMqJC8sICcnKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgd2UncmUgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnRcbiAqXG4gKiBUaGlzIGFsbG93cyBheGlvcyB0byBydW4gaW4gYSB3ZWIgd29ya2VyLCBhbmQgcmVhY3QtbmF0aXZlLlxuICogQm90aCBlbnZpcm9ubWVudHMgc3VwcG9ydCBYTUxIdHRwUmVxdWVzdCwgYnV0IG5vdCBmdWxseSBzdGFuZGFyZCBnbG9iYWxzLlxuICpcbiAqIHdlYiB3b3JrZXJzOlxuICogIHR5cGVvZiB3aW5kb3cgLT4gdW5kZWZpbmVkXG4gKiAgdHlwZW9mIGRvY3VtZW50IC0+IHVuZGVmaW5lZFxuICpcbiAqIHJlYWN0LW5hdGl2ZTpcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnUmVhY3ROYXRpdmUnXG4gKi9cbmZ1bmN0aW9uIGlzU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdSZWFjdE5hdGl2ZScpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIChcbiAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdcbiAgKTtcbn1cblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYW4gQXJyYXkgb3IgYW4gT2JqZWN0IGludm9raW5nIGEgZnVuY3Rpb24gZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiBgb2JqYCBpcyBhbiBBcnJheSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGluZGV4LCBhbmQgY29tcGxldGUgYXJyYXkgZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiAnb2JqJyBpcyBhbiBPYmplY3QgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBrZXksIGFuZCBjb21wbGV0ZSBvYmplY3QgZm9yIGVhY2ggcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IG9iaiBUaGUgb2JqZWN0IHRvIGl0ZXJhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBjYWxsYmFjayB0byBpbnZva2UgZm9yIGVhY2ggaXRlbVxuICovXG5mdW5jdGlvbiBmb3JFYWNoKG9iaiwgZm4pIHtcbiAgLy8gRG9uJ3QgYm90aGVyIGlmIG5vIHZhbHVlIHByb3ZpZGVkXG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBGb3JjZSBhbiBhcnJheSBpZiBub3QgYWxyZWFkeSBzb21ldGhpbmcgaXRlcmFibGVcbiAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnICYmICFpc0FycmF5KG9iaikpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBvYmogPSBbb2JqXTtcbiAgfVxuXG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgYXJyYXkgdmFsdWVzXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtpXSwgaSwgb2JqKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIG9iamVjdCBrZXlzXG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgZm4uY2FsbChudWxsLCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEFjY2VwdHMgdmFyYXJncyBleHBlY3RpbmcgZWFjaCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QsIHRoZW5cbiAqIGltbXV0YWJseSBtZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgZWFjaCBvYmplY3QgYW5kIHJldHVybnMgcmVzdWx0LlxuICpcbiAqIFdoZW4gbXVsdGlwbGUgb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIGtleSB0aGUgbGF0ZXIgb2JqZWN0IGluXG4gKiB0aGUgYXJndW1lbnRzIGxpc3Qgd2lsbCB0YWtlIHByZWNlZGVuY2UuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJlc3VsdCBvZiBhbGwgbWVyZ2UgcHJvcGVydGllc1xuICovXG5mdW5jdGlvbiBtZXJnZSgvKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi8pIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0eXBlb2YgcmVzdWx0W2tleV0gPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXN1bHRba2V5XSA9IG1lcmdlKHJlc3VsdFtrZXldLCB2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRXh0ZW5kcyBvYmplY3QgYSBieSBtdXRhYmx5IGFkZGluZyB0byBpdCB0aGUgcHJvcGVydGllcyBvZiBvYmplY3QgYi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkXG4gKiBAcGFyYW0ge09iamVjdH0gYiBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc0FyZyBUaGUgb2JqZWN0IHRvIGJpbmQgZnVuY3Rpb24gdG9cbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIHJlc3VsdGluZyB2YWx1ZSBvZiBvYmplY3QgYVxuICovXG5mdW5jdGlvbiBleHRlbmQoYSwgYiwgdGhpc0FyZykge1xuICBmb3JFYWNoKGIsIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHRoaXNBcmcgJiYgdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYVtrZXldID0gYmluZCh2YWwsIHRoaXNBcmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSB2YWw7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc0FycmF5OiBpc0FycmF5LFxuICBpc0FycmF5QnVmZmVyOiBpc0FycmF5QnVmZmVyLFxuICBpc0J1ZmZlcjogaXNCdWZmZXIsXG4gIGlzRm9ybURhdGE6IGlzRm9ybURhdGEsXG4gIGlzQXJyYXlCdWZmZXJWaWV3OiBpc0FycmF5QnVmZmVyVmlldyxcbiAgaXNTdHJpbmc6IGlzU3RyaW5nLFxuICBpc051bWJlcjogaXNOdW1iZXIsXG4gIGlzT2JqZWN0OiBpc09iamVjdCxcbiAgaXNVbmRlZmluZWQ6IGlzVW5kZWZpbmVkLFxuICBpc0RhdGU6IGlzRGF0ZSxcbiAgaXNGaWxlOiBpc0ZpbGUsXG4gIGlzQmxvYjogaXNCbG9iLFxuICBpc0Z1bmN0aW9uOiBpc0Z1bmN0aW9uLFxuICBpc1N0cmVhbTogaXNTdHJlYW0sXG4gIGlzVVJMU2VhcmNoUGFyYW1zOiBpc1VSTFNlYXJjaFBhcmFtcyxcbiAgaXNTdGFuZGFyZEJyb3dzZXJFbnY6IGlzU3RhbmRhcmRCcm93c2VyRW52LFxuICBmb3JFYWNoOiBmb3JFYWNoLFxuICBtZXJnZTogbWVyZ2UsXG4gIGV4dGVuZDogZXh0ZW5kLFxuICB0cmltOiB0cmltXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3V0aWxzLmpzXG4vLyBtb2R1bGUgaWQgPSAzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiLyohXG4gKiBtdXN0YWNoZS5qcyAtIExvZ2ljLWxlc3Mge3ttdXN0YWNoZX19IHRlbXBsYXRlcyB3aXRoIEphdmFTY3JpcHRcbiAqIGh0dHA6Ly9naXRodWIuY29tL2phbmwvbXVzdGFjaGUuanNcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS90aG9tYXNKYW5nL211c3RhY2hlLmpzIC0tIGltcG9yb3ZlIHNvbWUgdmFyaWFibGVzXG4gKi9cblxuXG4vKipcbiAqIEFYNk11c3RhY2hl64qUIGh0dHA6Ly9naXRodWIuY29tL2phbmwvbXVzdGFjaGUuanPsl5Ag66qH6rCA7KeAIOy1nOyGjO2VnOydmCDquLDriqXsnYQg7Yqc64ud7ZWY7JesIOyCrOyaqe2VmOuKlCDthZztlIzrpr8g7JeU7KeE7J6F64uI64ukLlxuICogQG5hbWVzcGFjZSBBWDZNdXN0YWNoZVxuICovXG5cbi8qKlxuICogQG1ldGhvZCBBWDZNdXN0YWNoZS5yZW5kZXJcbiAqIEBleGFtcGxlXG4gKiBgYGBqc1xuICogYXg1Lm11c3RhY2hlLnJlbmRlcih0ZW1wbGF0ZSwgdmlldylcbiAqXG4gKlxuICogLy9BcnJheSBAaVxuICogLy97eyNiZWF0bGVzfX1cbiAqIC8ve3tmaXJzdE5hbWV9fSB7e2xhc3ROYW1lfX0gKHt7QGl9fSkgKHt7QGZpcnN0fX0pXG4gKiAvL3t7L2JlYXRsZXN9fVxuICpcbiAqIC8vT2JqZWN0IEBlYWNoXG4gKiB7eyNiZWF0bGVzfX1cbiAqICB7eyNAZWFjaH19XG4gKiAgICAgIHt7QGtleX19IDoge3tAdmFsdWUuZmlyc3ROYW1lfX0ge3tAdmFsdWUubGFzdE5hbWV9fVxuICogIHt7L0BlYWNofX1cbiAqIHt7L2JlYXRsZXN9fVxuICpcbiAqIGBgYFxuICovXG5cblxuXG5sZXQgQVg2ID0ge307XG5cbihmdW5jdGlvbiBkZWZpbmVNdXN0YWNoZShnbG9iYWwsIGZhY3RvcnkpIHtcblxuICBmYWN0b3J5KGdsb2JhbC5tdXN0YWNoZSA9IHt9KTtcblxufShBWDYsIGZ1bmN0aW9uIG11c3RhY2hlRmFjdG9yeShtdXN0YWNoZSkge1xuXG4gIHZhciBvYmplY3RUb1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG4gIHZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiBpc0FycmF5UG9seWZpbGwob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdFRvU3RyaW5nLmNhbGwob2JqZWN0KSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgfTtcblxuICBmdW5jdGlvbiBpc0Z1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnZnVuY3Rpb24nO1xuICB9XG5cbiAgLyoqXG4gICAqIE1vcmUgY29ycmVjdCB0eXBlb2Ygc3RyaW5nIGhhbmRsaW5nIGFycmF5XG4gICAqIHdoaWNoIG5vcm1hbGx5IHJldHVybnMgdHlwZW9mICdvYmplY3QnXG4gICAqL1xuICBmdW5jdGlvbiB0eXBlU3RyKG9iaikge1xuICAgIHJldHVybiBpc0FycmF5KG9iaikgPyAnYXJyYXknIDogdHlwZW9mIG9iajtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVzY2FwZVJlZ0V4cChzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoL1tcXC1cXFtcXF17fSgpKis/LixcXFxcXFxeJHwjXFxzXS9nLCAnXFxcXCQmJyk7XG4gIH1cblxuICAvKipcbiAgICogTnVsbCBzYWZlIHdheSBvZiBjaGVja2luZyB3aGV0aGVyIG9yIG5vdCBhbiBvYmplY3QsXG4gICAqIGluY2x1ZGluZyBpdHMgcHJvdG90eXBlLCBoYXMgYSBnaXZlbiBwcm9wZXJ0eVxuICAgKi9cbiAgZnVuY3Rpb24gaGFzUHJvcGVydHkob2JqLCBwcm9wTmFtZSkge1xuICAgIHJldHVybiBvYmogIT0gbnVsbCAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiAocHJvcE5hbWUgaW4gb2JqKTtcbiAgfVxuXG4gIC8vIFdvcmthcm91bmQgZm9yIGh0dHBzOi8vaXNzdWVzLmFwYWNoZS5vcmcvamlyYS9icm93c2UvQ09VQ0hEQi01NzdcbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qYW5sL211c3RhY2hlLmpzL2lzc3Vlcy8xODlcbiAgdmFyIHJlZ0V4cFRlc3QgPSBSZWdFeHAucHJvdG90eXBlLnRlc3Q7XG5cbiAgZnVuY3Rpb24gdGVzdFJlZ0V4cChyZSwgc3RyaW5nKSB7XG4gICAgcmV0dXJuIHJlZ0V4cFRlc3QuY2FsbChyZSwgc3RyaW5nKTtcbiAgfVxuXG4gIHZhciBub25TcGFjZVJlID0gL1xcUy87XG5cbiAgZnVuY3Rpb24gaXNXaGl0ZXNwYWNlKHN0cmluZykge1xuICAgIHJldHVybiAhdGVzdFJlZ0V4cChub25TcGFjZVJlLCBzdHJpbmcpO1xuICB9XG5cbiAgdmFyIGVudGl0eU1hcCA9IHtcbiAgICAnJic6ICcmYW1wOycsICc8JzogJyZsdDsnLCAnPic6ICcmZ3Q7JywgJ1wiJzogJyZxdW90OycsIFwiJ1wiOiAnJiMzOTsnLCAnLyc6ICcmI3gyRjsnXG4gIH07XG5cbiAgZnVuY3Rpb24gZXNjYXBlSHRtbChzdHJpbmcpIHtcbiAgICByZXR1cm4gU3RyaW5nKHN0cmluZykucmVwbGFjZSgvWyY8PlwiJ1xcL10vZywgZnVuY3Rpb24gZnJvbUVudGl0eU1hcChzKSB7XG4gICAgICByZXR1cm4gZW50aXR5TWFwW3NdO1xuICAgIH0pO1xuICB9XG5cbiAgdmFyIHdoaXRlUmUgPSAvXFxzKi87XG4gIHZhciBzcGFjZVJlID0gL1xccysvO1xuICB2YXIgZXF1YWxzUmUgPSAvXFxzKj0vO1xuICB2YXIgY3VybHlSZSA9IC9cXHMqXFx9LztcbiAgdmFyIHRhZ1JlID0gLyN8XFxefFxcL3w+fFxce3wmfD18IS87XG5cbiAgLyoqXG4gICAqIEJyZWFrcyB1cCB0aGUgZ2l2ZW4gYHRlbXBsYXRlYCBzdHJpbmcgaW50byBhIHRyZWUgb2YgdG9rZW5zLiBJZiB0aGUgYHRhZ3NgXG4gICAqIGFyZ3VtZW50IGlzIGdpdmVuIGhlcmUgaXQgbXVzdCBiZSBhbiBhcnJheSB3aXRoIHR3byBzdHJpbmcgdmFsdWVzOiB0aGVcbiAgICogb3BlbmluZyBhbmQgY2xvc2luZyB0YWdzIHVzZWQgaW4gdGhlIHRlbXBsYXRlIChlLmcuIFsgXCI8JVwiLCBcIiU+XCIgXSkuIE9mXG4gICAqIGNvdXJzZSwgdGhlIGRlZmF1bHQgaXMgdG8gdXNlIG11c3RhY2hlcyAoaS5lLiBtdXN0YWNoZS50YWdzKS5cbiAgICpcbiAgICogQSB0b2tlbiBpcyBhbiBhcnJheSB3aXRoIGF0IGxlYXN0IDQgZWxlbWVudHMuIFRoZSBmaXJzdCBlbGVtZW50IGlzIHRoZVxuICAgKiBtdXN0YWNoZSBzeW1ib2wgdGhhdCB3YXMgdXNlZCBpbnNpZGUgdGhlIHRhZywgZS5nLiBcIiNcIiBvciBcIiZcIi4gSWYgdGhlIHRhZ1xuICAgKiBkaWQgbm90IGNvbnRhaW4gYSBzeW1ib2wgKGkuZS4ge3tteVZhbHVlfX0pIHRoaXMgZWxlbWVudCBpcyBcIm5hbWVcIi4gRm9yXG4gICAqIGFsbCB0ZXh0IHRoYXQgYXBwZWFycyBvdXRzaWRlIGEgc3ltYm9sIHRoaXMgZWxlbWVudCBpcyBcInRleHRcIi5cbiAgICpcbiAgICogVGhlIHNlY29uZCBlbGVtZW50IG9mIGEgdG9rZW4gaXMgaXRzIFwidmFsdWVcIi4gRm9yIG11c3RhY2hlIHRhZ3MgdGhpcyBpc1xuICAgKiB3aGF0ZXZlciBlbHNlIHdhcyBpbnNpZGUgdGhlIHRhZyBiZXNpZGVzIHRoZSBvcGVuaW5nIHN5bWJvbC4gRm9yIHRleHQgdG9rZW5zXG4gICAqIHRoaXMgaXMgdGhlIHRleHQgaXRzZWxmLlxuICAgKlxuICAgKiBUaGUgdGhpcmQgYW5kIGZvdXJ0aCBlbGVtZW50cyBvZiB0aGUgdG9rZW4gYXJlIHRoZSBzdGFydCBhbmQgZW5kIGluZGljZXMsXG4gICAqIHJlc3BlY3RpdmVseSwgb2YgdGhlIHRva2VuIGluIHRoZSBvcmlnaW5hbCB0ZW1wbGF0ZS5cbiAgICpcbiAgICogVG9rZW5zIHRoYXQgYXJlIHRoZSByb290IG5vZGUgb2YgYSBzdWJ0cmVlIGNvbnRhaW4gdHdvIG1vcmUgZWxlbWVudHM6IDEpIGFuXG4gICAqIGFycmF5IG9mIHRva2VucyBpbiB0aGUgc3VidHJlZSBhbmQgMikgdGhlIGluZGV4IGluIHRoZSBvcmlnaW5hbCB0ZW1wbGF0ZSBhdFxuICAgKiB3aGljaCB0aGUgY2xvc2luZyB0YWcgZm9yIHRoYXQgc2VjdGlvbiBiZWdpbnMuXG4gICAqL1xuICBmdW5jdGlvbiBwYXJzZVRlbXBsYXRlKHRlbXBsYXRlLCB0YWdzKSB7XG4gICAgaWYgKCF0ZW1wbGF0ZSlcbiAgICAgIHJldHVybiBbXTtcblxuICAgIHZhciBzZWN0aW9ucyA9IFtdOyAgICAgLy8gU3RhY2sgdG8gaG9sZCBzZWN0aW9uIHRva2Vuc1xuICAgIHZhciB0b2tlbnMgPSBbXTsgICAgICAgLy8gQnVmZmVyIHRvIGhvbGQgdGhlIHRva2Vuc1xuICAgIHZhciBzcGFjZXMgPSBbXTsgICAgICAgLy8gSW5kaWNlcyBvZiB3aGl0ZXNwYWNlIHRva2VucyBvbiB0aGUgY3VycmVudCBsaW5lXG4gICAgdmFyIGhhc1RhZyA9IGZhbHNlOyAgICAvLyBJcyB0aGVyZSBhIHt7dGFnfX0gb24gdGhlIGN1cnJlbnQgbGluZT9cbiAgICB2YXIgbm9uU3BhY2UgPSBmYWxzZTsgIC8vIElzIHRoZXJlIGEgbm9uLXNwYWNlIGNoYXIgb24gdGhlIGN1cnJlbnQgbGluZT9cblxuICAgIC8vIFN0cmlwcyBhbGwgd2hpdGVzcGFjZSB0b2tlbnMgYXJyYXkgZm9yIHRoZSBjdXJyZW50IGxpbmVcbiAgICAvLyBpZiB0aGVyZSB3YXMgYSB7eyN0YWd9fSBvbiBpdCBhbmQgb3RoZXJ3aXNlIG9ubHkgc3BhY2UuXG4gICAgZnVuY3Rpb24gc3RyaXBTcGFjZSgpIHtcbiAgICAgIGlmIChoYXNUYWcgJiYgIW5vblNwYWNlKSB7XG4gICAgICAgIHdoaWxlIChzcGFjZXMubGVuZ3RoKVxuICAgICAgICAgIGRlbGV0ZSB0b2tlbnNbc3BhY2VzLnBvcCgpXTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBzcGFjZXMgPSBbXTtcbiAgICAgIH1cblxuICAgICAgaGFzVGFnID0gZmFsc2U7XG4gICAgICBub25TcGFjZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBvcGVuaW5nVGFnUmUsIGNsb3NpbmdUYWdSZSwgY2xvc2luZ0N1cmx5UmU7XG5cbiAgICBmdW5jdGlvbiBjb21waWxlVGFncyh0YWdzVG9Db21waWxlKSB7XG4gICAgICBpZiAodHlwZW9mIHRhZ3NUb0NvbXBpbGUgPT09ICdzdHJpbmcnKVxuICAgICAgICB0YWdzVG9Db21waWxlID0gdGFnc1RvQ29tcGlsZS5zcGxpdChzcGFjZVJlLCAyKTtcblxuICAgICAgaWYgKCFpc0FycmF5KHRhZ3NUb0NvbXBpbGUpIHx8IHRhZ3NUb0NvbXBpbGUubGVuZ3RoICE9PSAyKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgdGFnczogJyArIHRhZ3NUb0NvbXBpbGUpO1xuXG4gICAgICBvcGVuaW5nVGFnUmUgPSBuZXcgUmVnRXhwKGVzY2FwZVJlZ0V4cCh0YWdzVG9Db21waWxlWzBdKSArICdcXFxccyonKTtcbiAgICAgIGNsb3NpbmdUYWdSZSA9IG5ldyBSZWdFeHAoJ1xcXFxzKicgKyBlc2NhcGVSZWdFeHAodGFnc1RvQ29tcGlsZVsxXSkpO1xuICAgICAgY2xvc2luZ0N1cmx5UmUgPSBuZXcgUmVnRXhwKCdcXFxccyonICsgZXNjYXBlUmVnRXhwKCd9JyArIHRhZ3NUb0NvbXBpbGVbMV0pKTtcbiAgICB9XG5cbiAgICBjb21waWxlVGFncyh0YWdzIHx8IG11c3RhY2hlLnRhZ3MpO1xuXG4gICAgdmFyIHNjYW5uZXIgPSBuZXcgU2Nhbm5lcih0ZW1wbGF0ZSk7XG5cbiAgICB2YXIgc3RhcnQsIHR5cGUsIHZhbHVlLCBjaHIsIHRva2VuLCBvcGVuU2VjdGlvbjtcbiAgICB3aGlsZSAoIXNjYW5uZXIuZW9zKCkpIHtcbiAgICAgIHN0YXJ0ID0gc2Nhbm5lci5wb3M7XG5cbiAgICAgIC8vIE1hdGNoIGFueSB0ZXh0IGJldHdlZW4gdGFncy5cbiAgICAgIHZhbHVlID0gc2Nhbm5lci5zY2FuVW50aWwob3BlbmluZ1RhZ1JlKTtcblxuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCB2YWx1ZUxlbmd0aCA9IHZhbHVlLmxlbmd0aDsgaSA8IHZhbHVlTGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBjaHIgPSB2YWx1ZS5jaGFyQXQoaSk7XG5cbiAgICAgICAgICBpZiAoaXNXaGl0ZXNwYWNlKGNocikpIHtcbiAgICAgICAgICAgIHNwYWNlcy5wdXNoKHRva2Vucy5sZW5ndGgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG5vblNwYWNlID0gdHJ1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0b2tlbnMucHVzaChbJ3RleHQnLCBjaHIsIHN0YXJ0LCBzdGFydCArIDFdKTtcbiAgICAgICAgICBzdGFydCArPSAxO1xuXG4gICAgICAgICAgLy8gQ2hlY2sgZm9yIHdoaXRlc3BhY2Ugb24gdGhlIGN1cnJlbnQgbGluZS5cbiAgICAgICAgICBpZiAoY2hyID09PSAnXFxuJylcbiAgICAgICAgICAgIHN0cmlwU3BhY2UoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBNYXRjaCB0aGUgb3BlbmluZyB0YWcuXG4gICAgICBpZiAoIXNjYW5uZXIuc2NhbihvcGVuaW5nVGFnUmUpKVxuICAgICAgICBicmVhaztcblxuICAgICAgaGFzVGFnID0gdHJ1ZTtcblxuICAgICAgLy8gR2V0IHRoZSB0YWcgdHlwZS5cbiAgICAgIHR5cGUgPSBzY2FubmVyLnNjYW4odGFnUmUpIHx8ICduYW1lJztcbiAgICAgIHNjYW5uZXIuc2Nhbih3aGl0ZVJlKTtcblxuICAgICAgLy8gR2V0IHRoZSB0YWcgdmFsdWUuXG4gICAgICBpZiAodHlwZSA9PT0gJz0nKSB7XG4gICAgICAgIHZhbHVlID0gc2Nhbm5lci5zY2FuVW50aWwoZXF1YWxzUmUpO1xuICAgICAgICBzY2FubmVyLnNjYW4oZXF1YWxzUmUpO1xuICAgICAgICBzY2FubmVyLnNjYW5VbnRpbChjbG9zaW5nVGFnUmUpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJ3snKSB7XG4gICAgICAgIHZhbHVlID0gc2Nhbm5lci5zY2FuVW50aWwoY2xvc2luZ0N1cmx5UmUpO1xuICAgICAgICBzY2FubmVyLnNjYW4oY3VybHlSZSk7XG4gICAgICAgIHNjYW5uZXIuc2NhblVudGlsKGNsb3NpbmdUYWdSZSk7XG4gICAgICAgIHR5cGUgPSAnJic7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBzY2FubmVyLnNjYW5VbnRpbChjbG9zaW5nVGFnUmUpO1xuICAgICAgfVxuXG4gICAgICAvLyBNYXRjaCB0aGUgY2xvc2luZyB0YWcuXG4gICAgICBpZiAoIXNjYW5uZXIuc2NhbihjbG9zaW5nVGFnUmUpKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuY2xvc2VkIHRhZyBhdCAnICsgc2Nhbm5lci5wb3MpO1xuXG4gICAgICB0b2tlbiA9IFt0eXBlLCB2YWx1ZSwgc3RhcnQsIHNjYW5uZXIucG9zXTtcbiAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcblxuICAgICAgaWYgKHR5cGUgPT09ICcjJyB8fCB0eXBlID09PSAnXicpIHtcbiAgICAgICAgc2VjdGlvbnMucHVzaCh0b2tlbik7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0eXBlID09PSAnLycpIHtcbiAgICAgICAgLy8gQ2hlY2sgc2VjdGlvbiBuZXN0aW5nLlxuICAgICAgICBvcGVuU2VjdGlvbiA9IHNlY3Rpb25zLnBvcCgpO1xuXG4gICAgICAgIGlmICghb3BlblNlY3Rpb24pXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbm9wZW5lZCBzZWN0aW9uIFwiJyArIHZhbHVlICsgJ1wiIGF0ICcgKyBzdGFydCk7XG5cbiAgICAgICAgaWYgKG9wZW5TZWN0aW9uWzFdICE9PSB2YWx1ZSlcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuY2xvc2VkIHNlY3Rpb24gXCInICsgb3BlblNlY3Rpb25bMV0gKyAnXCIgYXQgJyArIHN0YXJ0KTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICduYW1lJyB8fCB0eXBlID09PSAneycgfHwgdHlwZSA9PT0gJyYnKSB7XG4gICAgICAgIG5vblNwYWNlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICc9Jykge1xuICAgICAgICAvLyBTZXQgdGhlIHRhZ3MgZm9yIHRoZSBuZXh0IHRpbWUgYXJvdW5kLlxuICAgICAgICBjb21waWxlVGFncyh2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gTWFrZSBzdXJlIHRoZXJlIGFyZSBubyBvcGVuIHNlY3Rpb25zIHdoZW4gd2UncmUgZG9uZS5cbiAgICBvcGVuU2VjdGlvbiA9IHNlY3Rpb25zLnBvcCgpO1xuXG4gICAgaWYgKG9wZW5TZWN0aW9uKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmNsb3NlZCBzZWN0aW9uIFwiJyArIG9wZW5TZWN0aW9uWzFdICsgJ1wiIGF0ICcgKyBzY2FubmVyLnBvcyk7XG5cbiAgICByZXR1cm4gbmVzdFRva2VucyhzcXVhc2hUb2tlbnModG9rZW5zKSk7XG4gIH1cblxuICAvKipcbiAgICogQ29tYmluZXMgdGhlIHZhbHVlcyBvZiBjb25zZWN1dGl2ZSB0ZXh0IHRva2VucyBpbiB0aGUgZ2l2ZW4gYHRva2Vuc2AgYXJyYXlcbiAgICogdG8gYSBzaW5nbGUgdG9rZW4uXG4gICAqL1xuICBmdW5jdGlvbiBzcXVhc2hUb2tlbnModG9rZW5zKSB7XG4gICAgdmFyIHNxdWFzaGVkVG9rZW5zID0gW107XG5cbiAgICB2YXIgdG9rZW4sIGxhc3RUb2tlbjtcbiAgICBmb3IgKHZhciBpID0gMCwgbnVtVG9rZW5zID0gdG9rZW5zLmxlbmd0aDsgaSA8IG51bVRva2VuczsgKytpKSB7XG4gICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcblxuICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgIGlmICh0b2tlblswXSA9PT0gJ3RleHQnICYmIGxhc3RUb2tlbiAmJiBsYXN0VG9rZW5bMF0gPT09ICd0ZXh0Jykge1xuICAgICAgICAgIGxhc3RUb2tlblsxXSArPSB0b2tlblsxXTtcbiAgICAgICAgICBsYXN0VG9rZW5bM10gPSB0b2tlblszXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBzcXVhc2hlZFRva2Vucy5wdXNoKHRva2VuKTtcbiAgICAgICAgICBsYXN0VG9rZW4gPSB0b2tlbjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzcXVhc2hlZFRva2VucztcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JtcyB0aGUgZ2l2ZW4gYXJyYXkgb2YgYHRva2Vuc2AgaW50byBhIG5lc3RlZCB0cmVlIHN0cnVjdHVyZSB3aGVyZVxuICAgKiB0b2tlbnMgdGhhdCByZXByZXNlbnQgYSBzZWN0aW9uIGhhdmUgdHdvIGFkZGl0aW9uYWwgaXRlbXM6IDEpIGFuIGFycmF5IG9mXG4gICAqIGFsbCB0b2tlbnMgdGhhdCBhcHBlYXIgaW4gdGhhdCBzZWN0aW9uIGFuZCAyKSB0aGUgaW5kZXggaW4gdGhlIG9yaWdpbmFsXG4gICAqIHRlbXBsYXRlIHRoYXQgcmVwcmVzZW50cyB0aGUgZW5kIG9mIHRoYXQgc2VjdGlvbi5cbiAgICovXG4gIGZ1bmN0aW9uIG5lc3RUb2tlbnModG9rZW5zKSB7XG4gICAgdmFyIG5lc3RlZFRva2VucyA9IFtdO1xuICAgIHZhciBjb2xsZWN0b3IgPSBuZXN0ZWRUb2tlbnM7XG4gICAgdmFyIHNlY3Rpb25zID0gW107XG5cbiAgICB2YXIgdG9rZW4sIHNlY3Rpb247XG4gICAgZm9yICh2YXIgaSA9IDAsIG51bVRva2VucyA9IHRva2Vucy5sZW5ndGg7IGkgPCBudW1Ub2tlbnM7ICsraSkge1xuICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XG5cbiAgICAgIHN3aXRjaCAodG9rZW5bMF0pIHtcbiAgICAgICAgY2FzZSAnIyc6XG4gICAgICAgIGNhc2UgJ14nOlxuICAgICAgICAgIGNvbGxlY3Rvci5wdXNoKHRva2VuKTtcbiAgICAgICAgICBzZWN0aW9ucy5wdXNoKHRva2VuKTtcbiAgICAgICAgICBjb2xsZWN0b3IgPSB0b2tlbls0XSA9IFtdO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICcvJzpcbiAgICAgICAgICBzZWN0aW9uID0gc2VjdGlvbnMucG9wKCk7XG4gICAgICAgICAgc2VjdGlvbls1XSA9IHRva2VuWzJdO1xuICAgICAgICAgIGNvbGxlY3RvciA9IHNlY3Rpb25zLmxlbmd0aCA+IDAgPyBzZWN0aW9uc1tzZWN0aW9ucy5sZW5ndGggLSAxXVs0XSA6IG5lc3RlZFRva2VucztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb2xsZWN0b3IucHVzaCh0b2tlbik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5lc3RlZFRva2VucztcbiAgfVxuXG4gIC8qKlxuICAgKiBBIHNpbXBsZSBzdHJpbmcgc2Nhbm5lciB0aGF0IGlzIHVzZWQgYnkgdGhlIHRlbXBsYXRlIHBhcnNlciB0byBmaW5kXG4gICAqIHRva2VucyBpbiB0ZW1wbGF0ZSBzdHJpbmdzLlxuICAgKi9cbiAgZnVuY3Rpb24gU2Nhbm5lcihzdHJpbmcpIHtcbiAgICB0aGlzLnN0cmluZyA9IHN0cmluZztcbiAgICB0aGlzLnRhaWwgPSBzdHJpbmc7XG4gICAgdGhpcy5wb3MgPSAwO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYHRydWVgIGlmIHRoZSB0YWlsIGlzIGVtcHR5IChlbmQgb2Ygc3RyaW5nKS5cbiAgICovXG4gIFNjYW5uZXIucHJvdG90eXBlLmVvcyA9IGZ1bmN0aW9uIGVvcygpIHtcbiAgICByZXR1cm4gdGhpcy50YWlsID09PSAnJztcbiAgfTtcblxuICAvKipcbiAgICogVHJpZXMgdG8gbWF0Y2ggdGhlIGdpdmVuIHJlZ3VsYXIgZXhwcmVzc2lvbiBhdCB0aGUgY3VycmVudCBwb3NpdGlvbi5cbiAgICogUmV0dXJucyB0aGUgbWF0Y2hlZCB0ZXh0IGlmIGl0IGNhbiBtYXRjaCwgdGhlIGVtcHR5IHN0cmluZyBvdGhlcndpc2UuXG4gICAqL1xuICBTY2FubmVyLnByb3RvdHlwZS5zY2FuID0gZnVuY3Rpb24gc2NhbihyZSkge1xuICAgIHZhciBtYXRjaCA9IHRoaXMudGFpbC5tYXRjaChyZSk7XG5cbiAgICBpZiAoIW1hdGNoIHx8IG1hdGNoLmluZGV4ICE9PSAwKVxuICAgICAgcmV0dXJuICcnO1xuXG4gICAgdmFyIHN0cmluZyA9IG1hdGNoWzBdO1xuXG4gICAgdGhpcy50YWlsID0gdGhpcy50YWlsLnN1YnN0cmluZyhzdHJpbmcubGVuZ3RoKTtcbiAgICB0aGlzLnBvcyArPSBzdHJpbmcubGVuZ3RoO1xuXG4gICAgcmV0dXJuIHN0cmluZztcbiAgfTtcblxuICAvKipcbiAgICogU2tpcHMgYWxsIHRleHQgdW50aWwgdGhlIGdpdmVuIHJlZ3VsYXIgZXhwcmVzc2lvbiBjYW4gYmUgbWF0Y2hlZC4gUmV0dXJuc1xuICAgKiB0aGUgc2tpcHBlZCBzdHJpbmcsIHdoaWNoIGlzIHRoZSBlbnRpcmUgdGFpbCBpZiBubyBtYXRjaCBjYW4gYmUgbWFkZS5cbiAgICovXG4gIFNjYW5uZXIucHJvdG90eXBlLnNjYW5VbnRpbCA9IGZ1bmN0aW9uIHNjYW5VbnRpbChyZSkge1xuICAgIHZhciBpbmRleCA9IHRoaXMudGFpbC5zZWFyY2gocmUpLCBtYXRjaDtcblxuICAgIHN3aXRjaCAoaW5kZXgpIHtcbiAgICAgIGNhc2UgLTE6XG4gICAgICAgIG1hdGNoID0gdGhpcy50YWlsO1xuICAgICAgICB0aGlzLnRhaWwgPSAnJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIG1hdGNoID0gJyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbWF0Y2ggPSB0aGlzLnRhaWwuc3Vic3RyaW5nKDAsIGluZGV4KTtcbiAgICAgICAgdGhpcy50YWlsID0gdGhpcy50YWlsLnN1YnN0cmluZyhpbmRleCk7XG4gICAgfVxuXG4gICAgdGhpcy5wb3MgKz0gbWF0Y2gubGVuZ3RoO1xuXG4gICAgcmV0dXJuIG1hdGNoO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXByZXNlbnRzIGEgcmVuZGVyaW5nIGNvbnRleHQgYnkgd3JhcHBpbmcgYSB2aWV3IG9iamVjdCBhbmRcbiAgICogbWFpbnRhaW5pbmcgYSByZWZlcmVuY2UgdG8gdGhlIHBhcmVudCBjb250ZXh0LlxuICAgKi9cbiAgZnVuY3Rpb24gQ29udGV4dCh2aWV3LCBwYXJlbnRDb250ZXh0KSB7XG4gICAgdGhpcy52aWV3ID0gdmlldztcbiAgICB0aGlzLmNhY2hlID0ge1xuICAgICAgJy4nOiB0aGlzLnZpZXcsXG4gICAgICAnQGVhY2gnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByZXR1cm5zID0gW107XG4gICAgICAgIGZvciAodmFyIGsgaW4gdGhpcykge1xuICAgICAgICAgIHJldHVybnMucHVzaCh7J0BrZXknOiBrLCAnQHZhbHVlJzogdGhpc1trXX0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXR1cm5zO1xuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5wYXJlbnQgPSBwYXJlbnRDb250ZXh0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgY29udGV4dCB1c2luZyB0aGUgZ2l2ZW4gdmlldyB3aXRoIHRoaXMgY29udGV4dFxuICAgKiBhcyB0aGUgcGFyZW50LlxuICAgKi9cbiAgQ29udGV4dC5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIHB1c2godmlldykge1xuICAgIHJldHVybiBuZXcgQ29udGV4dCh2aWV3LCB0aGlzKTtcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhlIGdpdmVuIG5hbWUgaW4gdGhpcyBjb250ZXh0LCB0cmF2ZXJzaW5nXG4gICAqIHVwIHRoZSBjb250ZXh0IGhpZXJhcmNoeSBpZiB0aGUgdmFsdWUgaXMgYWJzZW50IGluIHRoaXMgY29udGV4dCdzIHZpZXcuXG4gICAqL1xuICBDb250ZXh0LnByb3RvdHlwZS5sb29rdXAgPSBmdW5jdGlvbiBsb29rdXAobmFtZSkge1xuICAgIHZhciBjYWNoZSA9IHRoaXMuY2FjaGU7XG5cbiAgICB2YXIgdmFsdWU7XG4gICAgaWYgKGNhY2hlLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICB2YWx1ZSA9IGNhY2hlW25hbWVdO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcywgbmFtZXMsIGluZGV4LCBsb29rdXBIaXQgPSBmYWxzZTtcblxuICAgICAgd2hpbGUgKGNvbnRleHQpIHtcbiAgICAgICAgaWYgKG5hbWUuaW5kZXhPZignLicpID4gMCkge1xuICAgICAgICAgIHZhbHVlID0gY29udGV4dC52aWV3O1xuICAgICAgICAgIG5hbWVzID0gbmFtZS5zcGxpdCgnLicpO1xuICAgICAgICAgIGluZGV4ID0gMDtcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIFVzaW5nIHRoZSBkb3Qgbm90aW9uIHBhdGggaW4gYG5hbWVgLCB3ZSBkZXNjZW5kIHRocm91Z2ggdGhlXG4gICAgICAgICAgICogbmVzdGVkIG9iamVjdHMuXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBUbyBiZSBjZXJ0YWluIHRoYXQgdGhlIGxvb2t1cCBoYXMgYmVlbiBzdWNjZXNzZnVsLCB3ZSBoYXZlIHRvXG4gICAgICAgICAgICogY2hlY2sgaWYgdGhlIGxhc3Qgb2JqZWN0IGluIHRoZSBwYXRoIGFjdHVhbGx5IGhhcyB0aGUgcHJvcGVydHlcbiAgICAgICAgICAgKiB3ZSBhcmUgbG9va2luZyBmb3IuIFdlIHN0b3JlIHRoZSByZXN1bHQgaW4gYGxvb2t1cEhpdGAuXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBUaGlzIGlzIHNwZWNpYWxseSBuZWNlc3NhcnkgZm9yIHdoZW4gdGhlIHZhbHVlIGhhcyBiZWVuIHNldCB0b1xuICAgICAgICAgICAqIGB1bmRlZmluZWRgIGFuZCB3ZSB3YW50IHRvIGF2b2lkIGxvb2tpbmcgdXAgcGFyZW50IGNvbnRleHRzLlxuICAgICAgICAgICAqKi9cbiAgICAgICAgICB3aGlsZSAodmFsdWUgIT0gbnVsbCAmJiBpbmRleCA8IG5hbWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGluZGV4ID09PSBuYW1lcy5sZW5ndGggLSAxKVxuICAgICAgICAgICAgICBsb29rdXBIaXQgPSBoYXNQcm9wZXJ0eSh2YWx1ZSwgbmFtZXNbaW5kZXhdKTtcblxuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZVtuYW1lc1tpbmRleCsrXV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHZhbHVlID0gY29udGV4dC52aWV3W25hbWVdO1xuICAgICAgICAgIGxvb2t1cEhpdCA9IGhhc1Byb3BlcnR5KGNvbnRleHQudmlldywgbmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobG9va3VwSGl0KVxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNvbnRleHQgPSBjb250ZXh0LnBhcmVudDtcbiAgICAgIH1cblxuICAgICAgY2FjaGVbbmFtZV0gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpXG4gICAgICB2YWx1ZSA9IHZhbHVlLmNhbGwodGhpcy52aWV3KTtcblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcblxuICAvKipcbiAgICogQSBXcml0ZXIga25vd3MgaG93IHRvIHRha2UgYSBzdHJlYW0gb2YgdG9rZW5zIGFuZCByZW5kZXIgdGhlbSB0byBhXG4gICAqIHN0cmluZywgZ2l2ZW4gYSBjb250ZXh0LiBJdCBhbHNvIG1haW50YWlucyBhIGNhY2hlIG9mIHRlbXBsYXRlcyB0b1xuICAgKiBhdm9pZCB0aGUgbmVlZCB0byBwYXJzZSB0aGUgc2FtZSB0ZW1wbGF0ZSB0d2ljZS5cbiAgICovXG4gIGZ1bmN0aW9uIFdyaXRlcigpIHtcbiAgICB0aGlzLmNhY2hlID0ge307XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIGFsbCBjYWNoZWQgdGVtcGxhdGVzIGluIHRoaXMgd3JpdGVyLlxuICAgKi9cbiAgV3JpdGVyLnByb3RvdHlwZS5jbGVhckNhY2hlID0gZnVuY3Rpb24gY2xlYXJDYWNoZSgpIHtcbiAgICB0aGlzLmNhY2hlID0ge307XG4gIH07XG5cbiAgLyoqXG4gICAqIFBhcnNlcyBhbmQgY2FjaGVzIHRoZSBnaXZlbiBgdGVtcGxhdGVgIGFuZCByZXR1cm5zIHRoZSBhcnJheSBvZiB0b2tlbnNcbiAgICogdGhhdCBpcyBnZW5lcmF0ZWQgZnJvbSB0aGUgcGFyc2UuXG4gICAqL1xuICBXcml0ZXIucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24gcGFyc2UodGVtcGxhdGUsIHRhZ3MpIHtcbiAgICB2YXIgY2FjaGUgPSB0aGlzLmNhY2hlO1xuICAgIHZhciB0b2tlbnMgPSBjYWNoZVt0ZW1wbGF0ZV07XG5cbiAgICBpZiAodG9rZW5zID09IG51bGwpXG4gICAgICB0b2tlbnMgPSBjYWNoZVt0ZW1wbGF0ZV0gPSBwYXJzZVRlbXBsYXRlKHRlbXBsYXRlLCB0YWdzKTtcblxuICAgIHJldHVybiB0b2tlbnM7XG4gIH07XG5cbiAgLyoqXG4gICAqIEhpZ2gtbGV2ZWwgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byByZW5kZXIgdGhlIGdpdmVuIGB0ZW1wbGF0ZWAgd2l0aFxuICAgKiB0aGUgZ2l2ZW4gYHZpZXdgLlxuICAgKlxuICAgKiBUaGUgb3B0aW9uYWwgYHBhcnRpYWxzYCBhcmd1bWVudCBtYXkgYmUgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgdGhlXG4gICAqIG5hbWVzIGFuZCB0ZW1wbGF0ZXMgb2YgcGFydGlhbHMgdGhhdCBhcmUgdXNlZCBpbiB0aGUgdGVtcGxhdGUuIEl0IG1heVxuICAgKiBhbHNvIGJlIGEgZnVuY3Rpb24gdGhhdCBpcyB1c2VkIHRvIGxvYWQgcGFydGlhbCB0ZW1wbGF0ZXMgb24gdGhlIGZseVxuICAgKiB0aGF0IHRha2VzIGEgc2luZ2xlIGFyZ3VtZW50OiB0aGUgbmFtZSBvZiB0aGUgcGFydGlhbC5cbiAgICovXG4gIFdyaXRlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscykge1xuICAgIHZhciB0b2tlbnMgPSB0aGlzLnBhcnNlKHRlbXBsYXRlKTtcbiAgICB2YXIgY29udGV4dCA9ICh2aWV3IGluc3RhbmNlb2YgQ29udGV4dCkgPyB2aWV3IDogbmV3IENvbnRleHQodmlldyk7XG4gICAgcmV0dXJuIHRoaXMucmVuZGVyVG9rZW5zKHRva2VucywgY29udGV4dCwgcGFydGlhbHMsIHRlbXBsYXRlKTtcbiAgfTtcblxuICAvKipcbiAgICogTG93LWxldmVsIG1ldGhvZCB0aGF0IHJlbmRlcnMgdGhlIGdpdmVuIGFycmF5IG9mIGB0b2tlbnNgIHVzaW5nXG4gICAqIHRoZSBnaXZlbiBgY29udGV4dGAgYW5kIGBwYXJ0aWFsc2AuXG4gICAqXG4gICAqIE5vdGU6IFRoZSBgb3JpZ2luYWxUZW1wbGF0ZWAgaXMgb25seSBldmVyIHVzZWQgdG8gZXh0cmFjdCB0aGUgcG9ydGlvblxuICAgKiBvZiB0aGUgb3JpZ2luYWwgdGVtcGxhdGUgdGhhdCB3YXMgY29udGFpbmVkIGluIGEgaGlnaGVyLW9yZGVyIHNlY3Rpb24uXG4gICAqIElmIHRoZSB0ZW1wbGF0ZSBkb2Vzbid0IHVzZSBoaWdoZXItb3JkZXIgc2VjdGlvbnMsIHRoaXMgYXJndW1lbnQgbWF5XG4gICAqIGJlIG9taXR0ZWQuXG4gICAqL1xuICBXcml0ZXIucHJvdG90eXBlLnJlbmRlclRva2VucyA9IGZ1bmN0aW9uIHJlbmRlclRva2Vucyh0b2tlbnMsIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKSB7XG4gICAgdmFyIGJ1ZmZlciA9ICcnO1xuICAgIHZhciB0b2tlbiwgc3ltYm9sLCB2YWx1ZTtcbiAgICBmb3IgKHZhciBpID0gMCwgbnVtVG9rZW5zID0gdG9rZW5zLmxlbmd0aDsgaSA8IG51bVRva2VuczsgKytpKSB7XG4gICAgICB2YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgIHRva2VuID0gdG9rZW5zW2ldO1xuICAgICAgc3ltYm9sID0gdG9rZW5bMF07XG5cbiAgICAgIGlmIChzeW1ib2wgPT09ICcjJykgdmFsdWUgPSB0aGlzLnJlbmRlclNlY3Rpb24odG9rZW4sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgICAgIGVsc2UgaWYgKHN5bWJvbCA9PT0gJ14nKSB2YWx1ZSA9IHRoaXMucmVuZGVySW52ZXJ0ZWQodG9rZW4sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgICAgIGVsc2UgaWYgKHN5bWJvbCA9PT0gJz4nKSB2YWx1ZSA9IHRoaXMucmVuZGVyUGFydGlhbCh0b2tlbiwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUpO1xuICAgICAgZWxzZSBpZiAoc3ltYm9sID09PSAnJicpIHZhbHVlID0gdGhpcy51bmVzY2FwZWRWYWx1ZSh0b2tlbiwgY29udGV4dCk7XG4gICAgICBlbHNlIGlmIChzeW1ib2wgPT09ICduYW1lJykgdmFsdWUgPSB0aGlzLmVzY2FwZWRWYWx1ZSh0b2tlbiwgY29udGV4dCk7XG4gICAgICBlbHNlIGlmIChzeW1ib2wgPT09ICd0ZXh0JykgdmFsdWUgPSB0aGlzLnJhd1ZhbHVlKHRva2VuKTtcblxuICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpXG4gICAgICAgIGJ1ZmZlciArPSB2YWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmZmVyO1xuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUucmVuZGVyU2VjdGlvbiA9IGZ1bmN0aW9uIHJlbmRlclNlY3Rpb24odG9rZW4sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBidWZmZXIgPSAnJztcblxuICAgIHZhciB2YWx1ZSA9IGNvbnRleHQubG9va3VwKHRva2VuWzFdKTtcblxuICAgIC8vIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byByZW5kZXIgYW4gYXJiaXRyYXJ5IHRlbXBsYXRlXG4gICAgLy8gaW4gdGhlIGN1cnJlbnQgY29udGV4dCBieSBoaWdoZXItb3JkZXIgc2VjdGlvbnMuXG4gICAgZnVuY3Rpb24gc3ViUmVuZGVyKHRlbXBsYXRlKSB7XG4gICAgICByZXR1cm4gc2VsZi5yZW5kZXIodGVtcGxhdGUsIGNvbnRleHQsIHBhcnRpYWxzKTtcbiAgICB9XG5cbiAgICBpZiAoIXZhbHVlKSByZXR1cm47XG5cbiAgICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIGZvciAodmFyIGogPSAwLCB2YWx1ZUxlbmd0aCA9IHZhbHVlLmxlbmd0aDsgaiA8IHZhbHVlTGVuZ3RoOyArK2opIHtcbiAgICAgICAgaWYgKHZhbHVlW2pdKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZVtqXSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHZhbHVlW2pdWydAaSddID0gajtcbiAgICAgICAgICAgIHZhbHVlW2pdWydAZmlyc3QnXSA9IChqID09PSAwKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBidWZmZXIgKz0gdGhpcy5yZW5kZXJUb2tlbnModG9rZW5bNF0sIGNvbnRleHQucHVzaCh2YWx1ZVtqXSksIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgYnVmZmVyICs9IHRoaXMucmVuZGVyVG9rZW5zKHRva2VuWzRdLCBjb250ZXh0LnB1c2godmFsdWUpLCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgICBpZiAodHlwZW9mIG9yaWdpbmFsVGVtcGxhdGUgIT09ICdzdHJpbmcnKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCB1c2UgaGlnaGVyLW9yZGVyIHNlY3Rpb25zIHdpdGhvdXQgdGhlIG9yaWdpbmFsIHRlbXBsYXRlJyk7XG5cbiAgICAgIC8vIEV4dHJhY3QgdGhlIHBvcnRpb24gb2YgdGhlIG9yaWdpbmFsIHRlbXBsYXRlIHRoYXQgdGhlIHNlY3Rpb24gY29udGFpbnMuXG4gICAgICB2YWx1ZSA9IHZhbHVlLmNhbGwoY29udGV4dC52aWV3LCBvcmlnaW5hbFRlbXBsYXRlLnNsaWNlKHRva2VuWzNdLCB0b2tlbls1XSksIHN1YlJlbmRlcik7XG5cbiAgICAgIGlmICh2YWx1ZSAhPSBudWxsKVxuICAgICAgICBidWZmZXIgKz0gdmFsdWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgYnVmZmVyICs9IHRoaXMucmVuZGVyVG9rZW5zKHRva2VuWzRdLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XG4gICAgfVxuICAgIHJldHVybiBidWZmZXI7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5yZW5kZXJJbnZlcnRlZCA9IGZ1bmN0aW9uIHJlbmRlckludmVydGVkKHRva2VuLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSkge1xuICAgIHZhciB2YWx1ZSA9IGNvbnRleHQubG9va3VwKHRva2VuWzFdKTtcblxuICAgIC8vIFVzZSBKYXZhU2NyaXB0J3MgZGVmaW5pdGlvbiBvZiBmYWxzeS4gSW5jbHVkZSBlbXB0eSBhcnJheXMuXG4gICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qYW5sL211c3RhY2hlLmpzL2lzc3Vlcy8xODZcbiAgICBpZiAoIXZhbHVlIHx8IChpc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPT09IDApKVxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyVG9rZW5zKHRva2VuWzRdLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSk7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5yZW5kZXJQYXJ0aWFsID0gZnVuY3Rpb24gcmVuZGVyUGFydGlhbCh0b2tlbiwgY29udGV4dCwgcGFydGlhbHMpIHtcbiAgICBpZiAoIXBhcnRpYWxzKSByZXR1cm47XG5cbiAgICB2YXIgdmFsdWUgPSBpc0Z1bmN0aW9uKHBhcnRpYWxzKSA/IHBhcnRpYWxzKHRva2VuWzFdKSA6IHBhcnRpYWxzW3Rva2VuWzFdXTtcbiAgICBpZiAodmFsdWUgIT0gbnVsbClcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlclRva2Vucyh0aGlzLnBhcnNlKHZhbHVlKSwgY29udGV4dCwgcGFydGlhbHMsIHZhbHVlKTtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLnVuZXNjYXBlZFZhbHVlID0gZnVuY3Rpb24gdW5lc2NhcGVkVmFsdWUodG9rZW4sIGNvbnRleHQpIHtcbiAgICB2YXIgdmFsdWUgPSBjb250ZXh0Lmxvb2t1cCh0b2tlblsxXSk7XG4gICAgaWYgKHZhbHVlICE9IG51bGwpXG4gICAgICByZXR1cm4gdmFsdWU7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5lc2NhcGVkVmFsdWUgPSBmdW5jdGlvbiBlc2NhcGVkVmFsdWUodG9rZW4sIGNvbnRleHQpIHtcbiAgICB2YXIgdmFsdWUgPSBjb250ZXh0Lmxvb2t1cCh0b2tlblsxXSk7XG4gICAgaWYgKHZhbHVlICE9IG51bGwpXG4gICAgICByZXR1cm4gbXVzdGFjaGUuZXNjYXBlKHZhbHVlKTtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLnJhd1ZhbHVlID0gZnVuY3Rpb24gcmF3VmFsdWUodG9rZW4pIHtcbiAgICByZXR1cm4gdG9rZW5bMV07XG4gIH07XG5cbiAgbXVzdGFjaGUubmFtZSA9ICdtdXN0YWNoZS5qcyc7XG4gIG11c3RhY2hlLnZlcnNpb24gPSAnMi4xLjMnO1xuICBtdXN0YWNoZS50YWdzID0gWyd7eycsICd9fSddO1xuXG4gIC8vIEFsbCBoaWdoLWxldmVsIG11c3RhY2hlLiogZnVuY3Rpb25zIHVzZSB0aGlzIHdyaXRlci5cbiAgdmFyIGRlZmF1bHRXcml0ZXIgPSBuZXcgV3JpdGVyKCk7XG5cbiAgLyoqXG4gICAqIENsZWFycyBhbGwgY2FjaGVkIHRlbXBsYXRlcyBpbiB0aGUgZGVmYXVsdCB3cml0ZXIuXG4gICAqL1xuICBtdXN0YWNoZS5jbGVhckNhY2hlID0gZnVuY3Rpb24gY2xlYXJDYWNoZSgpIHtcbiAgICByZXR1cm4gZGVmYXVsdFdyaXRlci5jbGVhckNhY2hlKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFBhcnNlcyBhbmQgY2FjaGVzIHRoZSBnaXZlbiB0ZW1wbGF0ZSBpbiB0aGUgZGVmYXVsdCB3cml0ZXIgYW5kIHJldHVybnMgdGhlXG4gICAqIGFycmF5IG9mIHRva2VucyBpdCBjb250YWlucy4gRG9pbmcgdGhpcyBhaGVhZCBvZiB0aW1lIGF2b2lkcyB0aGUgbmVlZCB0b1xuICAgKiBwYXJzZSB0ZW1wbGF0ZXMgb24gdGhlIGZseSBhcyB0aGV5IGFyZSByZW5kZXJlZC5cbiAgICovXG4gIG11c3RhY2hlLnBhcnNlID0gZnVuY3Rpb24gcGFyc2UodGVtcGxhdGUsIHRhZ3MpIHtcbiAgICByZXR1cm4gZGVmYXVsdFdyaXRlci5wYXJzZSh0ZW1wbGF0ZSwgdGFncyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbmRlcnMgdGhlIGB0ZW1wbGF0ZWAgd2l0aCB0aGUgZ2l2ZW4gYHZpZXdgIGFuZCBgcGFydGlhbHNgIHVzaW5nIHRoZVxuICAgKiBkZWZhdWx0IHdyaXRlci5cbiAgICovXG4gIG11c3RhY2hlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcih0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMpIHtcbiAgICBpZiAodHlwZW9mIHRlbXBsYXRlICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCB0ZW1wbGF0ZSEgVGVtcGxhdGUgc2hvdWxkIGJlIGEgXCJzdHJpbmdcIiAnICsgJ2J1dCBcIicgKyB0eXBlU3RyKHRlbXBsYXRlKSArICdcIiB3YXMgZ2l2ZW4gYXMgdGhlIGZpcnN0ICcgKyAnYXJndW1lbnQgZm9yIG11c3RhY2hlI3JlbmRlcih0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMpJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlZmF1bHRXcml0ZXIucmVuZGVyKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscyk7XG4gIH07XG5cbiAgLy8gVGhpcyBpcyBoZXJlIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSB3aXRoIDAuNC54LixcbiAgLyplc2xpbnQtZGlzYWJsZSAqLyAvLyBlc2xpbnQgd2FudHMgY2FtZWwgY2FzZWQgZnVuY3Rpb24gbmFtZVxuICBtdXN0YWNoZS50b19odG1sID0gZnVuY3Rpb24gdG9faHRtbCh0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMsIHNlbmQpIHtcbiAgICAvKmVzbGludC1lbmFibGUqL1xuXG4gICAgdmFyIHJlc3VsdCA9IG11c3RhY2hlLnJlbmRlcih0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMpO1xuXG4gICAgaWYgKGlzRnVuY3Rpb24oc2VuZCkpIHtcbiAgICAgIHNlbmQocmVzdWx0KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfTtcblxuICAvLyBFeHBvcnQgdGhlIGVzY2FwaW5nIGZ1bmN0aW9uIHNvIHRoYXQgdGhlIHVzZXIgbWF5IG92ZXJyaWRlIGl0LlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2phbmwvbXVzdGFjaGUuanMvaXNzdWVzLzI0NFxuICBtdXN0YWNoZS5lc2NhcGUgPSBlc2NhcGVIdG1sO1xuXG4gIC8vIEV4cG9ydCB0aGVzZSBtYWlubHkgZm9yIHRlc3RpbmcsIGJ1dCBhbHNvIGZvciBhZHZhbmNlZCB1c2FnZS5cbiAgbXVzdGFjaGUuU2Nhbm5lciA9IFNjYW5uZXI7XG4gIG11c3RhY2hlLkNvbnRleHQgPSBDb250ZXh0O1xuICBtdXN0YWNoZS5Xcml0ZXIgPSBXcml0ZXI7XG5cbn0pKTtcblxuZXhwb3J0IGRlZmF1bHQgQVg2Lm11c3RhY2hlO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9zcmMvQVg2TXVzdGFjaGUuanMiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBub3JtYWxpemVIZWFkZXJOYW1lID0gcmVxdWlyZSgnLi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUnKTtcblxudmFyIERFRkFVTFRfQ09OVEVOVF9UWVBFID0ge1xuICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbn07XG5cbmZ1bmN0aW9uIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCB2YWx1ZSkge1xuICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnMpICYmIHV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddKSkge1xuICAgIGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gdmFsdWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdEFkYXB0ZXIoKSB7XG4gIHZhciBhZGFwdGVyO1xuICBpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEZvciBicm93c2VycyB1c2UgWEhSIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy94aHInKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBGb3Igbm9kZSB1c2UgSFRUUCBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMvaHR0cCcpO1xuICB9XG4gIHJldHVybiBhZGFwdGVyO1xufVxuXG52YXIgZGVmYXVsdHMgPSB7XG4gIGFkYXB0ZXI6IGdldERlZmF1bHRBZGFwdGVyKCksXG5cbiAgdHJhbnNmb3JtUmVxdWVzdDogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlcXVlc3QoZGF0YSwgaGVhZGVycykge1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0NvbnRlbnQtVHlwZScpO1xuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0FycmF5QnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0J1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNTdHJlYW0oZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzRmlsZShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCbG9iKGRhdGEpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXJWaWV3KGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YS5idWZmZXI7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIGRhdGEudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7IC8qIElnbm9yZSAqLyB9XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICB0aW1lb3V0OiAwLFxuXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcblxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcblxuICB2YWxpZGF0ZVN0YXR1czogZnVuY3Rpb24gdmFsaWRhdGVTdGF0dXMoc3RhdHVzKSB7XG4gICAgcmV0dXJuIHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwO1xuICB9XG59O1xuXG5kZWZhdWx0cy5oZWFkZXJzID0ge1xuICBjb21tb246IHtcbiAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKidcbiAgfVxufTtcblxudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB7fTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB1dGlscy5tZXJnZShERUZBVUxUX0NPTlRFTlRfVFlQRSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZhdWx0cztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy5qc1xuLy8gbW9kdWxlIGlkID0gMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanNcbi8vIG1vZHVsZSBpZCA9IDM4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAzOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgc2V0dGxlID0gcmVxdWlyZSgnLi8uLi9jb3JlL3NldHRsZScpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG52YXIgcGFyc2VIZWFkZXJzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL3BhcnNlSGVhZGVycycpO1xudmFyIGlzVVJMU2FtZU9yaWdpbiA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9pc1VSTFNhbWVPcmlnaW4nKTtcbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4uL2NvcmUvY3JlYXRlRXJyb3InKTtcbnZhciBidG9hID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5idG9hICYmIHdpbmRvdy5idG9hLmJpbmQod2luZG93KSkgfHwgcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J0b2EnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB4aHJBZGFwdGVyKGNvbmZpZykge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gZGlzcGF0Y2hYaHJSZXF1ZXN0KHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciByZXF1ZXN0RGF0YSA9IGNvbmZpZy5kYXRhO1xuICAgIHZhciByZXF1ZXN0SGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzO1xuXG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEocmVxdWVzdERhdGEpKSB7XG4gICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddOyAvLyBMZXQgdGhlIGJyb3dzZXIgc2V0IGl0XG4gICAgfVxuXG4gICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICB2YXIgbG9hZEV2ZW50ID0gJ29ucmVhZHlzdGF0ZWNoYW5nZSc7XG4gICAgdmFyIHhEb21haW4gPSBmYWxzZTtcblxuICAgIC8vIEZvciBJRSA4LzkgQ09SUyBzdXBwb3J0XG4gICAgLy8gT25seSBzdXBwb3J0cyBQT1NUIGFuZCBHRVQgY2FsbHMgYW5kIGRvZXNuJ3QgcmV0dXJucyB0aGUgcmVzcG9uc2UgaGVhZGVycy5cbiAgICAvLyBET04nVCBkbyB0aGlzIGZvciB0ZXN0aW5nIGIvYyBYTUxIdHRwUmVxdWVzdCBpcyBtb2NrZWQsIG5vdCBYRG9tYWluUmVxdWVzdC5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICd0ZXN0JyAmJlxuICAgICAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICB3aW5kb3cuWERvbWFpblJlcXVlc3QgJiYgISgnd2l0aENyZWRlbnRpYWxzJyBpbiByZXF1ZXN0KSAmJlxuICAgICAgICAhaXNVUkxTYW1lT3JpZ2luKGNvbmZpZy51cmwpKSB7XG4gICAgICByZXF1ZXN0ID0gbmV3IHdpbmRvdy5YRG9tYWluUmVxdWVzdCgpO1xuICAgICAgbG9hZEV2ZW50ID0gJ29ubG9hZCc7XG4gICAgICB4RG9tYWluID0gdHJ1ZTtcbiAgICAgIHJlcXVlc3Qub25wcm9ncmVzcyA9IGZ1bmN0aW9uIGhhbmRsZVByb2dyZXNzKCkge307XG4gICAgICByZXF1ZXN0Lm9udGltZW91dCA9IGZ1bmN0aW9uIGhhbmRsZVRpbWVvdXQoKSB7fTtcbiAgICB9XG5cbiAgICAvLyBIVFRQIGJhc2ljIGF1dGhlbnRpY2F0aW9uXG4gICAgaWYgKGNvbmZpZy5hdXRoKSB7XG4gICAgICB2YXIgdXNlcm5hbWUgPSBjb25maWcuYXV0aC51c2VybmFtZSB8fCAnJztcbiAgICAgIHZhciBwYXNzd29yZCA9IGNvbmZpZy5hdXRoLnBhc3N3b3JkIHx8ICcnO1xuICAgICAgcmVxdWVzdEhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCYXNpYyAnICsgYnRvYSh1c2VybmFtZSArICc6JyArIHBhc3N3b3JkKTtcbiAgICB9XG5cbiAgICByZXF1ZXN0Lm9wZW4oY29uZmlnLm1ldGhvZC50b1VwcGVyQ2FzZSgpLCBidWlsZFVSTChjb25maWcudXJsLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplciksIHRydWUpO1xuXG4gICAgLy8gU2V0IHRoZSByZXF1ZXN0IHRpbWVvdXQgaW4gTVNcbiAgICByZXF1ZXN0LnRpbWVvdXQgPSBjb25maWcudGltZW91dDtcblxuICAgIC8vIExpc3RlbiBmb3IgcmVhZHkgc3RhdGVcbiAgICByZXF1ZXN0W2xvYWRFdmVudF0gPSBmdW5jdGlvbiBoYW5kbGVMb2FkKCkge1xuICAgICAgaWYgKCFyZXF1ZXN0IHx8IChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQgJiYgIXhEb21haW4pKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gVGhlIHJlcXVlc3QgZXJyb3JlZCBvdXQgYW5kIHdlIGRpZG4ndCBnZXQgYSByZXNwb25zZSwgdGhpcyB3aWxsIGJlXG4gICAgICAvLyBoYW5kbGVkIGJ5IG9uZXJyb3IgaW5zdGVhZFxuICAgICAgLy8gV2l0aCBvbmUgZXhjZXB0aW9uOiByZXF1ZXN0IHRoYXQgdXNpbmcgZmlsZTogcHJvdG9jb2wsIG1vc3QgYnJvd3NlcnNcbiAgICAgIC8vIHdpbGwgcmV0dXJuIHN0YXR1cyBhcyAwIGV2ZW4gdGhvdWdoIGl0J3MgYSBzdWNjZXNzZnVsIHJlcXVlc3RcbiAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJiAhKHJlcXVlc3QucmVzcG9uc2VVUkwgJiYgcmVxdWVzdC5yZXNwb25zZVVSTC5pbmRleE9mKCdmaWxlOicpID09PSAwKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFByZXBhcmUgdGhlIHJlc3BvbnNlXG4gICAgICB2YXIgcmVzcG9uc2VIZWFkZXJzID0gJ2dldEFsbFJlc3BvbnNlSGVhZGVycycgaW4gcmVxdWVzdCA/IHBhcnNlSGVhZGVycyhyZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpKSA6IG51bGw7XG4gICAgICB2YXIgcmVzcG9uc2VEYXRhID0gIWNvbmZpZy5yZXNwb25zZVR5cGUgfHwgY29uZmlnLnJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnID8gcmVxdWVzdC5yZXNwb25zZVRleHQgOiByZXF1ZXN0LnJlc3BvbnNlO1xuICAgICAgdmFyIHJlc3BvbnNlID0ge1xuICAgICAgICBkYXRhOiByZXNwb25zZURhdGEsXG4gICAgICAgIC8vIElFIHNlbmRzIDEyMjMgaW5zdGVhZCBvZiAyMDQgKGh0dHBzOi8vZ2l0aHViLmNvbS9temFicmlza2llL2F4aW9zL2lzc3Vlcy8yMDEpXG4gICAgICAgIHN0YXR1czogcmVxdWVzdC5zdGF0dXMgPT09IDEyMjMgPyAyMDQgOiByZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVxdWVzdC5zdGF0dXMgPT09IDEyMjMgPyAnTm8gQ29udGVudCcgOiByZXF1ZXN0LnN0YXR1c1RleHQsXG4gICAgICAgIGhlYWRlcnM6IHJlc3BvbnNlSGVhZGVycyxcbiAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgIHJlcXVlc3Q6IHJlcXVlc3RcbiAgICAgIH07XG5cbiAgICAgIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcbiAgICAgIC8vIFJlYWwgZXJyb3JzIGFyZSBoaWRkZW4gZnJvbSB1cyBieSB0aGUgYnJvd3NlclxuICAgICAgLy8gb25lcnJvciBzaG91bGQgb25seSBmaXJlIGlmIGl0J3MgYSBuZXR3b3JrIGVycm9yXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBjb25maWcsIG51bGwsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSB0aW1lb3V0XG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCd0aW1lb3V0IG9mICcgKyBjb25maWcudGltZW91dCArICdtcyBleGNlZWRlZCcsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsXG4gICAgICAgIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgIC8vIFRoaXMgaXMgb25seSBkb25lIGlmIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50LlxuICAgIC8vIFNwZWNpZmljYWxseSBub3QgaWYgd2UncmUgaW4gYSB3ZWIgd29ya2VyLCBvciByZWFjdC1uYXRpdmUuXG4gICAgaWYgKHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkpIHtcbiAgICAgIHZhciBjb29raWVzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2Nvb2tpZXMnKTtcblxuICAgICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgICB2YXIgeHNyZlZhbHVlID0gKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMgfHwgaXNVUkxTYW1lT3JpZ2luKGNvbmZpZy51cmwpKSAmJiBjb25maWcueHNyZkNvb2tpZU5hbWUgP1xuICAgICAgICAgIGNvb2tpZXMucmVhZChjb25maWcueHNyZkNvb2tpZU5hbWUpIDpcbiAgICAgICAgICB1bmRlZmluZWQ7XG5cbiAgICAgIGlmICh4c3JmVmFsdWUpIHtcbiAgICAgICAgcmVxdWVzdEhlYWRlcnNbY29uZmlnLnhzcmZIZWFkZXJOYW1lXSA9IHhzcmZWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgaGVhZGVycyB0byB0aGUgcmVxdWVzdFxuICAgIGlmICgnc2V0UmVxdWVzdEhlYWRlcicgaW4gcmVxdWVzdCkge1xuICAgICAgdXRpbHMuZm9yRWFjaChyZXF1ZXN0SGVhZGVycywgZnVuY3Rpb24gc2V0UmVxdWVzdEhlYWRlcih2YWwsIGtleSkge1xuICAgICAgICBpZiAodHlwZW9mIHJlcXVlc3REYXRhID09PSAndW5kZWZpbmVkJyAmJiBrZXkudG9Mb3dlckNhc2UoKSA9PT0gJ2NvbnRlbnQtdHlwZScpIHtcbiAgICAgICAgICAvLyBSZW1vdmUgQ29udGVudC1UeXBlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gICAgICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzW2tleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gT3RoZXJ3aXNlIGFkZCBoZWFkZXIgdG8gdGhlIHJlcXVlc3RcbiAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgd2l0aENyZWRlbnRpYWxzIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMpIHtcbiAgICAgIHJlcXVlc3Qud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gRXhwZWN0ZWQgRE9NRXhjZXB0aW9uIHRocm93biBieSBicm93c2VycyBub3QgY29tcGF0aWJsZSBYTUxIdHRwUmVxdWVzdCBMZXZlbCAyLlxuICAgICAgICAvLyBCdXQsIHRoaXMgY2FuIGJlIHN1cHByZXNzZWQgZm9yICdqc29uJyB0eXBlIGFzIGl0IGNhbiBiZSBwYXJzZWQgYnkgZGVmYXVsdCAndHJhbnNmb3JtUmVzcG9uc2UnIGZ1bmN0aW9uLlxuICAgICAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSAhPT0gJ2pzb24nKSB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25Eb3dubG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdXBsb2FkIGV2ZW50c1xuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicgJiYgcmVxdWVzdC51cGxvYWQpIHtcbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICAgIC8vIEhhbmRsZSBjYW5jZWxsYXRpb25cbiAgICAgIGNvbmZpZy5jYW5jZWxUb2tlbi5wcm9taXNlLnRoZW4oZnVuY3Rpb24gb25DYW5jZWxlZChjYW5jZWwpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICByZWplY3QoY2FuY2VsKTtcbiAgICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChyZXF1ZXN0RGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXF1ZXN0RGF0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gU2VuZCB0aGUgcmVxdWVzdFxuICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0RGF0YSk7XG4gIH0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanNcbi8vIG1vZHVsZSBpZCA9IDQwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciBlbmhhbmNlRXJyb3IgPSByZXF1aXJlKCcuL2VuaGFuY2VFcnJvcicpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSwgY29uZmlnLCBlcnJvciBjb2RlLCByZXF1ZXN0IGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGVFcnJvcihtZXNzYWdlLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIHZhciBlcnJvciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgcmV0dXJuIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvY3JlYXRlRXJyb3IuanNcbi8vIG1vZHVsZSBpZCA9IDQxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNDYW5jZWwodmFsdWUpIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlLl9fQ0FOQ0VMX18pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanNcbi8vIG1vZHVsZSBpZCA9IDQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQSBgQ2FuY2VsYCBpcyBhbiBvYmplY3QgdGhhdCBpcyB0aHJvd24gd2hlbiBhbiBvcGVyYXRpb24gaXMgY2FuY2VsZWQuXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2UgVGhlIG1lc3NhZ2UuXG4gKi9cbmZ1bmN0aW9uIENhbmNlbChtZXNzYWdlKSB7XG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG59XG5cbkNhbmNlbC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuICdDYW5jZWwnICsgKHRoaXMubWVzc2FnZSA/ICc6ICcgKyB0aGlzLm1lc3NhZ2UgOiAnJyk7XG59O1xuXG5DYW5jZWwucHJvdG90eXBlLl9fQ0FOQ0VMX18gPSB0cnVlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzXG4vLyBtb2R1bGUgaWQgPSA0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9heGlvcycpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG52YXIgQXhpb3MgPSByZXF1aXJlKCcuL2NvcmUvQXhpb3MnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdHMnKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdENvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICogQHJldHVybiB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRDb25maWcpIHtcbiAgdmFyIGNvbnRleHQgPSBuZXcgQXhpb3MoZGVmYXVsdENvbmZpZyk7XG4gIHZhciBpbnN0YW5jZSA9IGJpbmQoQXhpb3MucHJvdG90eXBlLnJlcXVlc3QsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgYXhpb3MucHJvdG90eXBlIHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgQXhpb3MucHJvdG90eXBlLCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGNvbnRleHQgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0KTtcblxuICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbi8vIENyZWF0ZSB0aGUgZGVmYXVsdCBpbnN0YW5jZSB0byBiZSBleHBvcnRlZFxudmFyIGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMpO1xuXG4vLyBFeHBvc2UgQXhpb3MgY2xhc3MgdG8gYWxsb3cgY2xhc3MgaW5oZXJpdGFuY2VcbmF4aW9zLkF4aW9zID0gQXhpb3M7XG5cbi8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcbmF4aW9zLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpbnN0YW5jZUNvbmZpZykge1xuICByZXR1cm4gY3JlYXRlSW5zdGFuY2UodXRpbHMubWVyZ2UoZGVmYXVsdHMsIGluc3RhbmNlQ29uZmlnKSk7XG59O1xuXG4vLyBFeHBvc2UgQ2FuY2VsICYgQ2FuY2VsVG9rZW5cbmF4aW9zLkNhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbCcpO1xuYXhpb3MuQ2FuY2VsVG9rZW4gPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWxUb2tlbicpO1xuYXhpb3MuaXNDYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9pc0NhbmNlbCcpO1xuXG4vLyBFeHBvc2UgYWxsL3NwcmVhZFxuYXhpb3MuYWxsID0gZnVuY3Rpb24gYWxsKHByb21pc2VzKSB7XG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59O1xuYXhpb3Muc3ByZWFkID0gcmVxdWlyZSgnLi9oZWxwZXJzL3NwcmVhZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGF4aW9zO1xuXG4vLyBBbGxvdyB1c2Ugb2YgZGVmYXVsdCBpbXBvcnQgc3ludGF4IGluIFR5cGVTY3JpcHRcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBheGlvcztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9heGlvcy5qc1xuLy8gbW9kdWxlIGlkID0gNDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIi8qIVxuICogRGV0ZXJtaW5lIGlmIGFuIG9iamVjdCBpcyBhIEJ1ZmZlclxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxmZXJvc3NAZmVyb3NzLm9yZz4gPGh0dHA6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG5cbi8vIFRoZSBfaXNCdWZmZXIgY2hlY2sgaXMgZm9yIFNhZmFyaSA1LTcgc3VwcG9ydCwgYmVjYXVzZSBpdCdzIG1pc3Npbmdcbi8vIE9iamVjdC5wcm90b3R5cGUuY29uc3RydWN0b3IuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHlcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICE9IG51bGwgJiYgKGlzQnVmZmVyKG9iaikgfHwgaXNTbG93QnVmZmVyKG9iaikgfHwgISFvYmouX2lzQnVmZmVyKVxufVxuXG5mdW5jdGlvbiBpc0J1ZmZlciAob2JqKSB7XG4gIHJldHVybiAhIW9iai5jb25zdHJ1Y3RvciAmJiB0eXBlb2Ygb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihvYmopXG59XG5cbi8vIEZvciBOb2RlIHYwLjEwIHN1cHBvcnQuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHkuXG5mdW5jdGlvbiBpc1Nsb3dCdWZmZXIgKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iai5yZWFkRmxvYXRMRSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygb2JqLnNsaWNlID09PSAnZnVuY3Rpb24nICYmIGlzQnVmZmVyKG9iai5zbGljZSgwLCAwKSlcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2lzLWJ1ZmZlci9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi8uLi9kZWZhdWx0cycpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIEludGVyY2VwdG9yTWFuYWdlciA9IHJlcXVpcmUoJy4vSW50ZXJjZXB0b3JNYW5hZ2VyJyk7XG52YXIgZGlzcGF0Y2hSZXF1ZXN0ID0gcmVxdWlyZSgnLi9kaXNwYXRjaFJlcXVlc3QnKTtcbnZhciBpc0Fic29sdXRlVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwnKTtcbnZhciBjb21iaW5lVVJMcyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9jb21iaW5lVVJMcycpO1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZUNvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBBeGlvcyhpbnN0YW5jZUNvbmZpZykge1xuICB0aGlzLmRlZmF1bHRzID0gaW5zdGFuY2VDb25maWc7XG4gIHRoaXMuaW50ZXJjZXB0b3JzID0ge1xuICAgIHJlcXVlc3Q6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKSxcbiAgICByZXNwb25zZTogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpXG4gIH07XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHNwZWNpZmljIGZvciB0aGlzIHJlcXVlc3QgKG1lcmdlZCB3aXRoIHRoaXMuZGVmYXVsdHMpXG4gKi9cbkF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24gcmVxdWVzdChjb25maWcpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIC8vIEFsbG93IGZvciBheGlvcygnZXhhbXBsZS91cmwnWywgY29uZmlnXSkgYSBsYSBmZXRjaCBBUElcbiAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uZmlnID0gdXRpbHMubWVyZ2Uoe1xuICAgICAgdXJsOiBhcmd1bWVudHNbMF1cbiAgICB9LCBhcmd1bWVudHNbMV0pO1xuICB9XG5cbiAgY29uZmlnID0gdXRpbHMubWVyZ2UoZGVmYXVsdHMsIHRoaXMuZGVmYXVsdHMsIHsgbWV0aG9kOiAnZ2V0JyB9LCBjb25maWcpO1xuICBjb25maWcubWV0aG9kID0gY29uZmlnLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuXG4gIC8vIFN1cHBvcnQgYmFzZVVSTCBjb25maWdcbiAgaWYgKGNvbmZpZy5iYXNlVVJMICYmICFpc0Fic29sdXRlVVJMKGNvbmZpZy51cmwpKSB7XG4gICAgY29uZmlnLnVybCA9IGNvbWJpbmVVUkxzKGNvbmZpZy5iYXNlVVJMLCBjb25maWcudXJsKTtcbiAgfVxuXG4gIC8vIEhvb2sgdXAgaW50ZXJjZXB0b3JzIG1pZGRsZXdhcmVcbiAgdmFyIGNoYWluID0gW2Rpc3BhdGNoUmVxdWVzdCwgdW5kZWZpbmVkXTtcbiAgdmFyIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXF1ZXN0LmZvckVhY2goZnVuY3Rpb24gdW5zaGlmdFJlcXVlc3RJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi51bnNoaWZ0KGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIHB1c2hSZXNwb25zZUludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnB1c2goaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHdoaWxlIChjaGFpbi5sZW5ndGgpIHtcbiAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKGNoYWluLnNoaWZ0KCksIGNoYWluLnNoaWZ0KCkpO1xuICB9XG5cbiAgcmV0dXJuIHByb21pc2U7XG59O1xuXG4vLyBQcm92aWRlIGFsaWFzZXMgZm9yIHN1cHBvcnRlZCByZXF1ZXN0IG1ldGhvZHNcbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAnb3B0aW9ucyddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh1dGlscy5tZXJnZShjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmxcbiAgICB9KSk7XG4gIH07XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGRhdGEsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXRpbHMubWVyZ2UoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEF4aW9zO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3MuanNcbi8vIG1vZHVsZSBpZCA9IDQ5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCBub3JtYWxpemVkTmFtZSkge1xuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMsIGZ1bmN0aW9uIHByb2Nlc3NIZWFkZXIodmFsdWUsIG5hbWUpIHtcbiAgICBpZiAobmFtZSAhPT0gbm9ybWFsaXplZE5hbWUgJiYgbmFtZS50b1VwcGVyQ2FzZSgpID09PSBub3JtYWxpemVkTmFtZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICBoZWFkZXJzW25vcm1hbGl6ZWROYW1lXSA9IHZhbHVlO1xuICAgICAgZGVsZXRlIGhlYWRlcnNbbmFtZV07XG4gICAgfVxuICB9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lLmpzXG4vLyBtb2R1bGUgaWQgPSA1MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuL2NyZWF0ZUVycm9yJyk7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpIHtcbiAgdmFyIHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuICAvLyBOb3RlOiBzdGF0dXMgaXMgbm90IGV4cG9zZWQgYnkgWERvbWFpblJlcXVlc3RcbiAgaWYgKCFyZXNwb25zZS5zdGF0dXMgfHwgIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QoY3JlYXRlRXJyb3IoXG4gICAgICAnUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgcmVzcG9uc2UuY29uZmlnLFxuICAgICAgbnVsbCxcbiAgICAgIHJlc3BvbnNlLnJlcXVlc3QsXG4gICAgICByZXNwb25zZVxuICAgICkpO1xuICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvc2V0dGxlLmpzXG4vLyBtb2R1bGUgaWQgPSA1MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVwZGF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgY29uZmlnLCBlcnJvciBjb2RlLCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyb3IgVGhlIGVycm9yIHRvIHVwZGF0ZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIGVycm9yLmNvbmZpZyA9IGNvbmZpZztcbiAgaWYgKGNvZGUpIHtcbiAgICBlcnJvci5jb2RlID0gY29kZTtcbiAgfVxuICBlcnJvci5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgZXJyb3IucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgcmV0dXJuIGVycm9yO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2VuaGFuY2VFcnJvci5qc1xuLy8gbW9kdWxlIGlkID0gNTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5cbiAgICByZXBsYWNlKC8lNDAvZ2ksICdAJykuXG4gICAgcmVwbGFjZSgvJTNBL2dpLCAnOicpLlxuICAgIHJlcGxhY2UoLyUyNC9nLCAnJCcpLlxuICAgIHJlcGxhY2UoLyUyQy9naSwgJywnKS5cbiAgICByZXBsYWNlKC8lMjAvZywgJysnKS5cbiAgICByZXBsYWNlKC8lNUIvZ2ksICdbJykuXG4gICAgcmVwbGFjZSgvJTVEL2dpLCAnXScpO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgVVJMIGJ5IGFwcGVuZGluZyBwYXJhbXMgdG8gdGhlIGVuZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIGJhc2Ugb2YgdGhlIHVybCAoZS5nLiwgaHR0cDovL3d3dy5nb29nbGUuY29tKVxuICogQHBhcmFtIHtvYmplY3R9IFtwYXJhbXNdIFRoZSBwYXJhbXMgdG8gYmUgYXBwZW5kZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgdXJsXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHZhciBzZXJpYWxpemVkUGFyYW1zO1xuICBpZiAocGFyYW1zU2VyaWFsaXplcikge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXNTZXJpYWxpemVyKHBhcmFtcyk7XG4gIH0gZWxzZSBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSkge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXMudG9TdHJpbmcoKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcGFydHMgPSBbXTtcblxuICAgIHV0aWxzLmZvckVhY2gocGFyYW1zLCBmdW5jdGlvbiBzZXJpYWxpemUodmFsLCBrZXkpIHtcbiAgICAgIGlmICh2YWwgPT09IG51bGwgfHwgdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodXRpbHMuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIGtleSA9IGtleSArICdbXSc7XG4gICAgICB9XG5cbiAgICAgIGlmICghdXRpbHMuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIHZhbCA9IFt2YWxdO1xuICAgICAgfVxuXG4gICAgICB1dGlscy5mb3JFYWNoKHZhbCwgZnVuY3Rpb24gcGFyc2VWYWx1ZSh2KSB7XG4gICAgICAgIGlmICh1dGlscy5pc0RhdGUodikpIHtcbiAgICAgICAgICB2ID0gdi50b0lTT1N0cmluZygpO1xuICAgICAgICB9IGVsc2UgaWYgKHV0aWxzLmlzT2JqZWN0KHYpKSB7XG4gICAgICAgICAgdiA9IEpTT04uc3RyaW5naWZ5KHYpO1xuICAgICAgICB9XG4gICAgICAgIHBhcnRzLnB1c2goZW5jb2RlKGtleSkgKyAnPScgKyBlbmNvZGUodikpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFydHMuam9pbignJicpO1xuICB9XG5cbiAgaWYgKHNlcmlhbGl6ZWRQYXJhbXMpIHtcbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J1aWxkVVJMLmpzXG4vLyBtb2R1bGUgaWQgPSA1M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqIEByZXR1cm5zIHtPYmplY3R9IEhlYWRlcnMgcGFyc2VkIGludG8gYW4gb2JqZWN0XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2VIZWFkZXJzKGhlYWRlcnMpIHtcbiAgdmFyIHBhcnNlZCA9IHt9O1xuICB2YXIga2V5O1xuICB2YXIgdmFsO1xuICB2YXIgaTtcblxuICBpZiAoIWhlYWRlcnMpIHsgcmV0dXJuIHBhcnNlZDsgfVxuXG4gIHV0aWxzLmZvckVhY2goaGVhZGVycy5zcGxpdCgnXFxuJyksIGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XG4gICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGtleSA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoMCwgaSkpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cihpICsgMSkpO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VIZWFkZXJzLmpzXG4vLyBtb2R1bGUgaWQgPSA1NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgaGF2ZSBmdWxsIHN1cHBvcnQgb2YgdGhlIEFQSXMgbmVlZGVkIHRvIHRlc3RcbiAgLy8gd2hldGhlciB0aGUgcmVxdWVzdCBVUkwgaXMgb2YgdGhlIHNhbWUgb3JpZ2luIGFzIGN1cnJlbnQgbG9jYXRpb24uXG4gIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgdmFyIG1zaWUgPSAvKG1zaWV8dHJpZGVudCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgIHZhciB1cmxQYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICB2YXIgb3JpZ2luVVJMO1xuXG4gICAgLyoqXG4gICAgKiBQYXJzZSBhIFVSTCB0byBkaXNjb3ZlciBpdCdzIGNvbXBvbmVudHNcbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIFRoZSBVUkwgdG8gYmUgcGFyc2VkXG4gICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICovXG4gICAgZnVuY3Rpb24gcmVzb2x2ZVVSTCh1cmwpIHtcbiAgICAgIHZhciBocmVmID0gdXJsO1xuXG4gICAgICBpZiAobXNpZSkge1xuICAgICAgICAvLyBJRSBuZWVkcyBhdHRyaWJ1dGUgc2V0IHR3aWNlIHRvIG5vcm1hbGl6ZSBwcm9wZXJ0aWVzXG4gICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuICAgICAgICBocmVmID0gdXJsUGFyc2luZ05vZGUuaHJlZjtcbiAgICAgIH1cblxuICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG5cbiAgICAgIC8vIHVybFBhcnNpbmdOb2RlIHByb3ZpZGVzIHRoZSBVcmxVdGlscyBpbnRlcmZhY2UgLSBodHRwOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsdXRpbHNcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGhyZWY6IHVybFBhcnNpbmdOb2RlLmhyZWYsXG4gICAgICAgIHByb3RvY29sOiB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbCA/IHVybFBhcnNpbmdOb2RlLnByb3RvY29sLnJlcGxhY2UoLzokLywgJycpIDogJycsXG4gICAgICAgIGhvc3Q6IHVybFBhcnNpbmdOb2RlLmhvc3QsXG4gICAgICAgIHNlYXJjaDogdXJsUGFyc2luZ05vZGUuc2VhcmNoID8gdXJsUGFyc2luZ05vZGUuc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJykgOiAnJyxcbiAgICAgICAgaGFzaDogdXJsUGFyc2luZ05vZGUuaGFzaCA/IHVybFBhcnNpbmdOb2RlLmhhc2gucmVwbGFjZSgvXiMvLCAnJykgOiAnJyxcbiAgICAgICAgaG9zdG5hbWU6IHVybFBhcnNpbmdOb2RlLmhvc3RuYW1lLFxuICAgICAgICBwb3J0OiB1cmxQYXJzaW5nTm9kZS5wb3J0LFxuICAgICAgICBwYXRobmFtZTogKHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSA/XG4gICAgICAgICAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZSA6XG4gICAgICAgICAgICAgICAgICAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuICAgIC8qKlxuICAgICogRGV0ZXJtaW5lIGlmIGEgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4gYXMgdGhlIGN1cnJlbnQgbG9jYXRpb25cbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gcmVxdWVzdFVSTCBUaGUgVVJMIHRvIHRlc3RcbiAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luLCBvdGhlcndpc2UgZmFsc2VcbiAgICAqL1xuICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4ocmVxdWVzdFVSTCkge1xuICAgICAgdmFyIHBhcnNlZCA9ICh1dGlscy5pc1N0cmluZyhyZXF1ZXN0VVJMKSkgPyByZXNvbHZlVVJMKHJlcXVlc3RVUkwpIDogcmVxdWVzdFVSTDtcbiAgICAgIHJldHVybiAocGFyc2VkLnByb3RvY29sID09PSBvcmlnaW5VUkwucHJvdG9jb2wgJiZcbiAgICAgICAgICAgIHBhcnNlZC5ob3N0ID09PSBvcmlnaW5VUkwuaG9zdCk7XG4gICAgfTtcbiAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgfSkoKVxuKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbi5qc1xuLy8gbW9kdWxlIGlkID0gNTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIid1c2Ugc3RyaWN0JztcblxuLy8gYnRvYSBwb2x5ZmlsbCBmb3IgSUU8MTAgY291cnRlc3kgaHR0cHM6Ly9naXRodWIuY29tL2RhdmlkY2hhbWJlcnMvQmFzZTY0LmpzXG5cbnZhciBjaGFycyA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvPSc7XG5cbmZ1bmN0aW9uIEUoKSB7XG4gIHRoaXMubWVzc2FnZSA9ICdTdHJpbmcgY29udGFpbnMgYW4gaW52YWxpZCBjaGFyYWN0ZXInO1xufVxuRS5wcm90b3R5cGUgPSBuZXcgRXJyb3I7XG5FLnByb3RvdHlwZS5jb2RlID0gNTtcbkUucHJvdG90eXBlLm5hbWUgPSAnSW52YWxpZENoYXJhY3RlckVycm9yJztcblxuZnVuY3Rpb24gYnRvYShpbnB1dCkge1xuICB2YXIgc3RyID0gU3RyaW5nKGlucHV0KTtcbiAgdmFyIG91dHB1dCA9ICcnO1xuICBmb3IgKFxuICAgIC8vIGluaXRpYWxpemUgcmVzdWx0IGFuZCBjb3VudGVyXG4gICAgdmFyIGJsb2NrLCBjaGFyQ29kZSwgaWR4ID0gMCwgbWFwID0gY2hhcnM7XG4gICAgLy8gaWYgdGhlIG5leHQgc3RyIGluZGV4IGRvZXMgbm90IGV4aXN0OlxuICAgIC8vICAgY2hhbmdlIHRoZSBtYXBwaW5nIHRhYmxlIHRvIFwiPVwiXG4gICAgLy8gICBjaGVjayBpZiBkIGhhcyBubyBmcmFjdGlvbmFsIGRpZ2l0c1xuICAgIHN0ci5jaGFyQXQoaWR4IHwgMCkgfHwgKG1hcCA9ICc9JywgaWR4ICUgMSk7XG4gICAgLy8gXCI4IC0gaWR4ICUgMSAqIDhcIiBnZW5lcmF0ZXMgdGhlIHNlcXVlbmNlIDIsIDQsIDYsIDhcbiAgICBvdXRwdXQgKz0gbWFwLmNoYXJBdCg2MyAmIGJsb2NrID4+IDggLSBpZHggJSAxICogOClcbiAgKSB7XG4gICAgY2hhckNvZGUgPSBzdHIuY2hhckNvZGVBdChpZHggKz0gMyAvIDQpO1xuICAgIGlmIChjaGFyQ29kZSA+IDB4RkYpIHtcbiAgICAgIHRocm93IG5ldyBFKCk7XG4gICAgfVxuICAgIGJsb2NrID0gYmxvY2sgPDwgOCB8IGNoYXJDb2RlO1xuICB9XG4gIHJldHVybiBvdXRwdXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYnRvYTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J0b2EuanNcbi8vIG1vZHVsZSBpZCA9IDU2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoXG4gIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBzdXBwb3J0IGRvY3VtZW50LmNvb2tpZVxuICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHJldHVybiB7XG4gICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUobmFtZSwgdmFsdWUsIGV4cGlyZXMsIHBhdGgsIGRvbWFpbiwgc2VjdXJlKSB7XG4gICAgICAgIHZhciBjb29raWUgPSBbXTtcbiAgICAgICAgY29va2llLnB1c2gobmFtZSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpO1xuXG4gICAgICAgIGlmICh1dGlscy5pc051bWJlcihleHBpcmVzKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdleHBpcmVzPScgKyBuZXcgRGF0ZShleHBpcmVzKS50b0dNVFN0cmluZygpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhwYXRoKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdwYXRoPScgKyBwYXRoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhkb21haW4pKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ2RvbWFpbj0nICsgZG9tYWluKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWN1cmUgPT09IHRydWUpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgnc2VjdXJlJyk7XG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWUuam9pbignOyAnKTtcbiAgICAgIH0sXG5cbiAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQobmFtZSkge1xuICAgICAgICB2YXIgbWF0Y2ggPSBkb2N1bWVudC5jb29raWUubWF0Y2gobmV3IFJlZ0V4cCgnKF58O1xcXFxzKikoJyArIG5hbWUgKyAnKT0oW147XSopJykpO1xuICAgICAgICByZXR1cm4gKG1hdGNoID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzNdKSA6IG51bGwpO1xuICAgICAgfSxcblxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUobmFtZSkge1xuICAgICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDApO1xuICAgICAgfVxuICAgIH07XG4gIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudiAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge30sXG4gICAgICByZWFkOiBmdW5jdGlvbiByZWFkKCkgeyByZXR1cm4gbnVsbDsgfSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9KSgpXG4pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29va2llcy5qc1xuLy8gbW9kdWxlIGlkID0gNTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBJbnRlcmNlcHRvck1hbmFnZXIoKSB7XG4gIHRoaXMuaGFuZGxlcnMgPSBbXTtcbn1cblxuLyoqXG4gKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVsZmlsbGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHRoZW5gIGZvciBhIGBQcm9taXNlYFxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IEFuIElEIHVzZWQgdG8gcmVtb3ZlIGludGVyY2VwdG9yIGxhdGVyXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpIHtcbiAgdGhpcy5oYW5kbGVycy5wdXNoKHtcbiAgICBmdWxmaWxsZWQ6IGZ1bGZpbGxlZCxcbiAgICByZWplY3RlZDogcmVqZWN0ZWRcbiAgfSk7XG4gIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbiBpbnRlcmNlcHRvciBmcm9tIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5lamVjdCA9IGZ1bmN0aW9uIGVqZWN0KGlkKSB7XG4gIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgIHRoaXMuaGFuZGxlcnNbaWRdID0gbnVsbDtcbiAgfVxufTtcblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICpcbiAqIFRoaXMgbWV0aG9kIGlzIHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIHNraXBwaW5nIG92ZXIgYW55XG4gKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBpbnRlcmNlcHRvclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGZuKSB7XG4gIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xuICAgIGlmIChoICE9PSBudWxsKSB7XG4gICAgICBmbihoKTtcbiAgICB9XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnRlcmNlcHRvck1hbmFnZXI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanNcbi8vIG1vZHVsZSBpZCA9IDU4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciB0cmFuc2Zvcm1EYXRhID0gcmVxdWlyZSgnLi90cmFuc2Zvcm1EYXRhJyk7XG52YXIgaXNDYW5jZWwgPSByZXF1aXJlKCcuLi9jYW5jZWwvaXNDYW5jZWwnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRzJyk7XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpIHtcbiAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgIGNvbmZpZy5jYW5jZWxUb2tlbi50aHJvd0lmUmVxdWVzdGVkKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3QgdG8gdGhlIHNlcnZlciB1c2luZyB0aGUgY29uZmlndXJlZCBhZGFwdGVyLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGlzcGF0Y2hSZXF1ZXN0KGNvbmZpZykge1xuICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgLy8gRW5zdXJlIGhlYWRlcnMgZXhpc3RcbiAgY29uZmlnLmhlYWRlcnMgPSBjb25maWcuaGVhZGVycyB8fCB7fTtcblxuICAvLyBUcmFuc2Zvcm0gcmVxdWVzdCBkYXRhXG4gIGNvbmZpZy5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICBjb25maWcuZGF0YSxcbiAgICBjb25maWcuaGVhZGVycyxcbiAgICBjb25maWcudHJhbnNmb3JtUmVxdWVzdFxuICApO1xuXG4gIC8vIEZsYXR0ZW4gaGVhZGVyc1xuICBjb25maWcuaGVhZGVycyA9IHV0aWxzLm1lcmdlKFxuICAgIGNvbmZpZy5oZWFkZXJzLmNvbW1vbiB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVyc1tjb25maWcubWV0aG9kXSB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVycyB8fCB7fVxuICApO1xuXG4gIHV0aWxzLmZvckVhY2goXG4gICAgWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAnY29tbW9uJ10sXG4gICAgZnVuY3Rpb24gY2xlYW5IZWFkZXJDb25maWcobWV0aG9kKSB7XG4gICAgICBkZWxldGUgY29uZmlnLmhlYWRlcnNbbWV0aG9kXTtcbiAgICB9XG4gICk7XG5cbiAgdmFyIGFkYXB0ZXIgPSBjb25maWcuYWRhcHRlciB8fCBkZWZhdWx0cy5hZGFwdGVyO1xuXG4gIHJldHVybiBhZGFwdGVyKGNvbmZpZykudGhlbihmdW5jdGlvbiBvbkFkYXB0ZXJSZXNvbHV0aW9uKHJlc3BvbnNlKSB7XG4gICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICByZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICAgIHJlc3BvbnNlLmRhdGEsXG4gICAgICByZXNwb25zZS5oZWFkZXJzLFxuICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgKTtcblxuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSwgZnVuY3Rpb24gb25BZGFwdGVyUmVqZWN0aW9uKHJlYXNvbikge1xuICAgIGlmICghaXNDYW5jZWwocmVhc29uKSkge1xuICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgICAgaWYgKHJlYXNvbiAmJiByZWFzb24ucmVzcG9uc2UpIHtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhLFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzLFxuICAgICAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xuICB9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanNcbi8vIG1vZHVsZSBpZCA9IDU5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBkYXRhIFRoZSBkYXRhIHRvIGJlIHRyYW5zZm9ybWVkXG4gKiBAcGFyYW0ge0FycmF5fSBoZWFkZXJzIFRoZSBoZWFkZXJzIGZvciB0aGUgcmVxdWVzdCBvciByZXNwb25zZVxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZGF0YSwgaGVhZGVycywgZm5zKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICB1dGlscy5mb3JFYWNoKGZucywgZnVuY3Rpb24gdHJhbnNmb3JtKGZuKSB7XG4gICAgZGF0YSA9IGZuKGRhdGEsIGhlYWRlcnMpO1xuICB9KTtcblxuICByZXR1cm4gZGF0YTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzXG4vLyBtb2R1bGUgaWQgPSA2MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNBYnNvbHV0ZVVSTCh1cmwpIHtcbiAgLy8gQSBVUkwgaXMgY29uc2lkZXJlZCBhYnNvbHV0ZSBpZiBpdCBiZWdpbnMgd2l0aCBcIjxzY2hlbWU+Oi8vXCIgb3IgXCIvL1wiIChwcm90b2NvbC1yZWxhdGl2ZSBVUkwpLlxuICAvLyBSRkMgMzk4NiBkZWZpbmVzIHNjaGVtZSBuYW1lIGFzIGEgc2VxdWVuY2Ugb2YgY2hhcmFjdGVycyBiZWdpbm5pbmcgd2l0aCBhIGxldHRlciBhbmQgZm9sbG93ZWRcbiAgLy8gYnkgYW55IGNvbWJpbmF0aW9uIG9mIGxldHRlcnMsIGRpZ2l0cywgcGx1cywgcGVyaW9kLCBvciBoeXBoZW4uXG4gIHJldHVybiAvXihbYS16XVthLXpcXGRcXCtcXC1cXC5dKjopP1xcL1xcLy9pLnRlc3QodXJsKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzXG4vLyBtb2R1bGUgaWQgPSA2MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgVVJMXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMXG4gICAgPyBiYXNlVVJMLnJlcGxhY2UoL1xcLyskLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJylcbiAgICA6IGJhc2VVUkw7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29tYmluZVVSTHMuanNcbi8vIG1vZHVsZSBpZCA9IDYyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIndXNlIHN0cmljdCc7XG5cbnZhciBDYW5jZWwgPSByZXF1aXJlKCcuL0NhbmNlbCcpO1xuXG4vKipcbiAqIEEgYENhbmNlbFRva2VuYCBpcyBhbiBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byByZXF1ZXN0IGNhbmNlbGxhdGlvbiBvZiBhbiBvcGVyYXRpb24uXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGVjdXRvciBUaGUgZXhlY3V0b3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIENhbmNlbFRva2VuKGV4ZWN1dG9yKSB7XG4gIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleGVjdXRvciBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICB2YXIgcmVzb2x2ZVByb21pc2U7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIHByb21pc2VFeGVjdXRvcihyZXNvbHZlKSB7XG4gICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICB9KTtcblxuICB2YXIgdG9rZW4gPSB0aGlzO1xuICBleGVjdXRvcihmdW5jdGlvbiBjYW5jZWwobWVzc2FnZSkge1xuICAgIGlmICh0b2tlbi5yZWFzb24pIHtcbiAgICAgIC8vIENhbmNlbGxhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHJlcXVlc3RlZFxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRva2VuLnJlYXNvbiA9IG5ldyBDYW5jZWwobWVzc2FnZSk7XG4gICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcbiAgfSk7XG59XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuQ2FuY2VsVG9rZW4ucHJvdG90eXBlLnRocm93SWZSZXF1ZXN0ZWQgPSBmdW5jdGlvbiB0aHJvd0lmUmVxdWVzdGVkKCkge1xuICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICB0aHJvdyB0aGlzLnJlYXNvbjtcbiAgfVxufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbmV3IGBDYW5jZWxUb2tlbmAgYW5kIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsXG4gKiBjYW5jZWxzIHRoZSBgQ2FuY2VsVG9rZW5gLlxuICovXG5DYW5jZWxUb2tlbi5zb3VyY2UgPSBmdW5jdGlvbiBzb3VyY2UoKSB7XG4gIHZhciBjYW5jZWw7XG4gIHZhciB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XG4gICAgY2FuY2VsID0gYztcbiAgfSk7XG4gIHJldHVybiB7XG4gICAgdG9rZW46IHRva2VuLFxuICAgIGNhbmNlbDogY2FuY2VsXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbFRva2VuO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxUb2tlbi5qc1xuLy8gbW9kdWxlIGlkID0gNjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTeW50YWN0aWMgc3VnYXIgZm9yIGludm9raW5nIGEgZnVuY3Rpb24gYW5kIGV4cGFuZGluZyBhbiBhcnJheSBmb3IgYXJndW1lbnRzLlxuICpcbiAqIENvbW1vbiB1c2UgY2FzZSB3b3VsZCBiZSB0byB1c2UgYEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseWAuXG4gKlxuICogIGBgYGpzXG4gKiAgZnVuY3Rpb24gZih4LCB5LCB6KSB7fVxuICogIHZhciBhcmdzID0gWzEsIDIsIDNdO1xuICogIGYuYXBwbHkobnVsbCwgYXJncyk7XG4gKiAgYGBgXG4gKlxuICogV2l0aCBgc3ByZWFkYCB0aGlzIGV4YW1wbGUgY2FuIGJlIHJlLXdyaXR0ZW4uXG4gKlxuICogIGBgYGpzXG4gKiAgc3ByZWFkKGZ1bmN0aW9uKHgsIHksIHopIHt9KShbMSwgMiwgM10pO1xuICogIGBgYFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qc1xuLy8gbW9kdWxlIGlkID0gNjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsImltcG9ydCBqUXVlcnkgZnJvbSBcImpxbWluXCI7XG5pbXBvcnQgQVg2VUlDb3JlIGZyb20gXCIuL0FYNlVJQ29yZS5qc1wiO1xuaW1wb3J0IFUgZnJvbSBcIi4vQVg2VXRpbC5qc1wiO1xuaW1wb3J0IGluZm8gZnJvbSBcIi4vQVg2SW5mby5qc1wiO1xuaW1wb3J0IG11c3RhY2hlIGZyb20gXCIuL0FYNk11c3RhY2hlLmpzXCI7XG5cbi8qIH5+fn5+fn5+fn5+fn5+fn5+fiBlbmQgb2YgaW1wb3J0ICB+fn5+fn5+fn5+fn5+fn5+fn5+fiAqL1xuXG5jb25zdCBkaWFsb2dUbXBsID0gZnVuY3Rpb24gKGNvbHVtbktleXMpIHtcbiAgcmV0dXJuIGAgXG48ZGl2IGlkPVwie3tkaWFsb2dJZH19XCIgZGF0YS1kaWFsb2ctZWxzPVwicm9vdFwiIGRhdGEtYXg2dWktZGlhbG9nPVwiXCIgY2xhc3M9XCJ7e3RoZW1lfX1cIj5cbiAgICA8ZGl2IGNsYXNzPVwiYXgtZGlhbG9nLWhlYWRlclwiIGRhdGEtZGlhbG9nLWVscz1cImhlYWRlclwiPlxuICAgICAgICB7e3t0aXRsZX19fVxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJheC1kaWFsb2ctYm9keVwiIGRhdGEtZGlhbG9nLWVscz1cImJvZHlcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImF4LWRpYWxvZy1tc2dcIj57e3ttc2d9fX08L2Rpdj5cbiAgICAgICAgXG4gICAgICAgIHt7I2lucHV0fX1cbiAgICAgICAgPGRpdiBjbGFzcz1cImF4LWRpYWxvZy1wcm9tcHRcIj5cbiAgICAgICAgICAgIHt7I0BlYWNofX1cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICB7eyNAdmFsdWUubGFiZWx9fVxuICAgICAgICAgICAgPGxhYmVsPnt7I19jcmxmfX17e3sufX19e3svX2NybGZ9fTwvbGFiZWw+XG4gICAgICAgICAgICB7ey9AdmFsdWUubGFiZWx9fVxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ7e0B2YWx1ZS50eXBlfX1cIiBwbGFjZWhvbGRlcj1cInt7QHZhbHVlLnBsYWNlaG9sZGVyfX1cIiBjbGFzcz1cImZvcm0tY29udHJvbCB7e0B2YWx1ZS50aGVtZX19XCIgZGF0YS1kaWFsb2ctcHJvbXB0PVwie3tAa2V5fX1cIiBzdHlsZT1cIndpZHRoOjEwMCU7XCIgdmFsdWU9XCJ7e0B2YWx1ZS52YWx1ZX19XCIgLz5cbiAgICAgICAgICAgIHt7I0B2YWx1ZS5oZWxwfX1cbiAgICAgICAgICAgIDxwIGNsYXNzPVwiaGVscC1ibG9ja1wiPnt7I19jcmxmfX17ey59fXt7L19jcmxmfX08L3A+XG4gICAgICAgICAgICB7ey9AdmFsdWUuaGVscH19XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHt7L0BlYWNofX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHt7L2lucHV0fX1cbiAgICAgICAgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJheC1kaWFsb2ctYnV0dG9uc1wiIGRhdGEtZGlhbG9nLWVscz1cImJ1dHRvbnNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJheC1idXR0b24td3JhcFwiPlxuICAgICAgICAgICAge3sjYnRuc319XG4gICAgICAgICAgICAgICAge3sjQGVhY2h9fVxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGRhdGEtZGlhbG9nLWJ0bj1cInt7QGtleX19XCIgY2xhc3M9XCJidG4gYnRuLXt7QHZhbHVlLnRoZW1lfX1cIj57e0B2YWx1ZS5sYWJlbH19PC9idXR0b24+XG4gICAgICAgICAgICAgICAge3svQGVhY2h9fVxuICAgICAgICAgICAge3svYnRuc319XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIFxuICAgICAgICB7eyNhZGRpdGlvbmFsQ29udGVudH19XG4gICAgICAgIDxkaXYgZGF0YS1kaWFsb2ctZWxzPVwiYWRkaXRpb25hbC1jb250ZW50XCI+e3t7Ln19fTwvZGl2PlxuICAgICAgICB7ey9hZGRpdGlvbmFsQ29udGVudH19XG4gICAgPC9kaXY+XG48L2Rpdj4gIFxuYDtcbn07XG5jb25zdCBvblN0YXRlQ2hhbmdlZCA9IGZ1bmN0aW9uIChvcHRzLCB0aGF0KSB7XG4gIGlmIChvcHRzICYmIG9wdHMub25TdGF0ZUNoYW5nZWQpIHtcbiAgICBvcHRzLm9uU3RhdGVDaGFuZ2VkLmNhbGwodGhhdCwgdGhhdCk7XG4gIH1cbiAgZWxzZSBpZiAodGhpcy5vblN0YXRlQ2hhbmdlZCkge1xuICAgIHRoaXMub25TdGF0ZUNoYW5nZWQuY2FsbCh0aGF0LCB0aGF0KTtcbiAgfVxuXG4gIG9wdHMgPSBudWxsO1xuICB0aGF0ID0gbnVsbDtcbiAgcmV0dXJuIHRydWU7XG59O1xuY29uc3QgZ2V0Q29udGVudCA9IGZ1bmN0aW9uIChkaWFsb2dJZCwgb3B0cykge1xuICBsZXQgZGF0YSA9IHtcbiAgICBkaWFsb2dJZDogZGlhbG9nSWQsXG4gICAgdGl0bGU6IChvcHRzLnRpdGxlIHx8IHRoaXMuY29uZmlnLnRpdGxlIHx8IFwiXCIpLFxuICAgIG1zZzogKG9wdHMubXNnIHx8IHRoaXMuY29uZmlnLm1zZyB8fCBcIlwiKS5yZXBsYWNlKC9cXG4vZywgXCI8YnIvPlwiKSxcbiAgICBpbnB1dDogb3B0cy5pbnB1dCxcbiAgICBidG5zOiBvcHRzLmJ0bnMsXG4gICAgJ19jcmxmJzogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMucmVwbGFjZSgvXFxuL2csIFwiPGJyLz5cIik7XG4gICAgfSxcbiAgICBhZGRpdGlvbmFsQ29udGVudDogKGZ1bmN0aW9uIChhZGRpdGlvbmFsQ29udGVudCkge1xuICAgICAgaWYgKFUuaXNGdW5jdGlvbihhZGRpdGlvbmFsQ29udGVudCkpIHtcbiAgICAgICAgcmV0dXJuIGFkZGl0aW9uYWxDb250ZW50LmNhbGwob3B0cyk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGFkZGl0aW9uYWxDb250ZW50O1xuICAgICAgfVxuICAgIH0pKG9wdHMuYWRkaXRpb25hbENvbnRlbnQpXG4gIH07XG5cbiAgcmV0dXJuIG11c3RhY2hlLnJlbmRlcihkaWFsb2dUbXBsLmNhbGwodGhpcyksIGRhdGEpO1xufTtcbmNvbnN0IG9wZW4gPSBmdW5jdGlvbiAob3B0cywgY2FsbGJhY2spIHtcbiAgbGV0IHBvcyA9IHt9LFxuICAgICAgYm94ID0ge1xuICAgICAgICB3aWR0aDogb3B0cy53aWR0aFxuICAgICAgfTtcblxuICB0aGlzLmRpYWxvZ0NvbmZpZyA9IG9wdHM7XG4gIHRoaXMuJGFjdGl2ZURpYWxvZyA9IGpRdWVyeShnZXRDb250ZW50LmNhbGwodGhpcywgb3B0cy5pZCwgb3B0cykpO1xuICB0aGlzLiRhY3RpdmVEaWFsb2cuY3NzKHt3aWR0aDogYm94LndpZHRofSk7XG4gIGpRdWVyeShkb2N1bWVudC5ib2R5KS5hcHBlbmQodGhpcy4kYWN0aXZlRGlhbG9nKTtcblxuICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY2FsbGJhY2sgPSBvcHRzLmNhbGxiYWNrO1xuICB9XG5cbiAgLy8gZGlhbG9nIOuGkuydtCDqtaztlZjquLAgLSDrhIjruYTqsIAg7KCV7ZW07KeA66m0IOuGkuydtOqwgCDrs4Dqsr0g65CgIOqygy5cbiAgb3B0cy5oZWlnaHQgPSBib3guaGVpZ2h0ID0gdGhpcy4kYWN0aXZlRGlhbG9nLmhlaWdodCgpO1xuXG4gIC8vLSBwb3NpdGlvbiDsoJXroKxcbiAgaWYgKHR5cGVvZiBvcHRzLnBvc2l0aW9uID09PSBcInVuZGVmaW5lZFwiIHx8IG9wdHMucG9zaXRpb24gPT09IFwiY2VudGVyXCIpIHtcbiAgICBwb3MudG9wID0galF1ZXJ5KHdpbmRvdykuaGVpZ2h0KCkgLyAyIC0gYm94LmhlaWdodCAvIDI7XG4gICAgcG9zLmxlZnQgPSBqUXVlcnkod2luZG93KS53aWR0aCgpIC8gMiAtIGJveC53aWR0aCAvIDI7XG4gIH1cbiAgZWxzZSB7XG4gICAgcG9zLmxlZnQgPSBvcHRzLnBvc2l0aW9uLmxlZnQgfHwgMDtcbiAgICBwb3MudG9wID0gb3B0cy5wb3NpdGlvbi50b3AgfHwgMDtcbiAgfVxuICBpZiAodGhpcy5jb25maWcuekluZGV4KSB7XG4gICAgcG9zW1wiei1pbmRleFwiXSA9IHRoaXMuY29uZmlnLnpJbmRleDtcbiAgfVxuXG4gIHRoaXMuJGFjdGl2ZURpYWxvZ1xuICAgIC5jc3MocG9zKVxuICAgIC5vbihvcHRzLmNsaWNrRXZlbnROYW1lLCBcIltkYXRhLWRpYWxvZy1idG5dXCIsIChlKSA9PiB7XG4gICAgICBidG5PbkNsaWNrLmNhbGwodGhpcywgZSB8fCB3aW5kb3cuZXZlbnQsIG9wdHMsIGNhbGxiYWNrKTtcbiAgICB9KVxuICAgIC5maW5kKG9wdHMuZGlhbG9nVHlwZSA9PT0gXCJwcm9tcHRcIiA/IFwiW2RhdGEtZGlhbG9nLXByb21wdF1cIiA6IFwiW2RhdGEtZGlhbG9nLWJ0bl1cIikudHJpZ2dlcihcImZvY3VzXCIpO1xuXG5cbiAgLy8gYmluZCBrZXkgZXZlbnRcbiAgalF1ZXJ5KHdpbmRvdylcbiAgICAub24oXCJrZXlkb3duLmF4NmRpYWxvZ1wiLCAoZSkgPT4ge1xuICAgICAgb25LZXl1cC5jYWxsKHRoaXMsIGUgfHwgd2luZG93LmV2ZW50LCBvcHRzLCBjYWxsYmFjayk7XG4gICAgfSlcbiAgICAub24oXCJyZXNpemUuYXg2ZGlhbG9nXCIsIFUudGhyb3R0bGUoZnVuY3Rpb24gKGUpIHtcbiAgICAgIGFsaWduLmNhbGwodGhpcywgZSB8fCB3aW5kb3cuZXZlbnQpO1xuICAgIH0sIDMwKS5iaW5kKHRoaXMpKTtcblxuICBvblN0YXRlQ2hhbmdlZC5jYWxsKHRoaXMsIG9wdHMsIHtcbiAgICBzZWxmOiB0aGlzLFxuICAgIHN0YXRlOiBcIm9wZW5cIlxuICB9KTtcblxuICBpZiAob3B0cy5hdXRvQ2xvc2VUaW1lKSB7XG4gICAgdGhpcy5hdXRvQ2xvc2VUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jbG9zZSgpO1xuICAgIH0sIG9wdHMuYXV0b0Nsb3NlVGltZSk7XG4gIH1cblxuICBwb3MgPSBudWxsO1xuICBib3ggPSBudWxsO1xufTtcbmNvbnN0IGFsaWduID0gZnVuY3Rpb24gKGUpIHtcbiAgaWYgKCF0aGlzLiRhY3RpdmVEaWFsb2cpIHJldHVybiB0aGlzO1xuICBsZXQgb3B0cyA9IHRoaXMuZGlhbG9nQ29uZmlnLFxuICAgICAgYm94ICA9IHtcbiAgICAgICAgd2lkdGg6IG9wdHMud2lkdGgsXG4gICAgICAgIGhlaWdodDogb3B0cy5oZWlnaHRcbiAgICAgIH07XG5cbiAgLy8tIHBvc2l0aW9uIOygleugrFxuICBpZiAodHlwZW9mIG9wdHMucG9zaXRpb24gPT09IFwidW5kZWZpbmVkXCIgfHwgb3B0cy5wb3NpdGlvbiA9PT0gXCJjZW50ZXJcIikge1xuICAgIGJveC50b3AgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyIC0gYm94LmhlaWdodCAvIDI7XG4gICAgYm94LmxlZnQgPSB3aW5kb3cuaW5uZXJXaWR0aCAvIDIgLSBib3gud2lkdGggLyAyO1xuICB9XG4gIGVsc2Uge1xuICAgIGJveC5sZWZ0ID0gb3B0cy5wb3NpdGlvbi5sZWZ0IHx8IDA7XG4gICAgYm94LnRvcCA9IG9wdHMucG9zaXRpb24udG9wIHx8IDA7XG4gIH1cbiAgaWYgKGJveC5sZWZ0IDwgMCkgYm94LmxlZnQgPSAwO1xuICBpZiAoYm94LnRvcCA8IDApIGJveC50b3AgPSAwO1xuXG4gIHRoaXMuJGFjdGl2ZURpYWxvZy5jc3MoYm94KTtcblxuICBvcHRzID0gbnVsbDtcbiAgYm94ID0gbnVsbDtcblxuICByZXR1cm4gdGhpcztcbn07XG5jb25zdCBidG5PbkNsaWNrID0gZnVuY3Rpb24gKGUsIG9wdHMsIGNhbGxiYWNrLCB0YXJnZXQsIGspIHtcbiAgbGV0IHRoYXQsXG4gICAgICBlbXB0eUtleSA9IG51bGw7XG5cbiAgaWYgKGUuc3JjRWxlbWVudCkgZS50YXJnZXQgPSBlLnNyY0VsZW1lbnQ7XG5cbiAgdGFyZ2V0ID0gVS5maW5kUGFyZW50Tm9kZShlLnRhcmdldCwgZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGlmICh0YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1kaWFsb2ctYnRuXCIpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIGlmICh0YXJnZXQpIHtcbiAgICBrID0gdGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtZGlhbG9nLWJ0blwiKTtcblxuICAgIHRoYXQgPSB7XG4gICAgICBzZWxmOiB0aGlzLFxuICAgICAga2V5OiBrLCB2YWx1ZTogb3B0cy5idG5zW2tdLFxuICAgICAgZGlhbG9nSWQ6IG9wdHMuaWQsXG4gICAgICBidG5UYXJnZXQ6IHRhcmdldFxuICAgIH07XG4gICAgaWYgKG9wdHMuZGlhbG9nVHlwZSA9PT0gXCJwcm9tcHRcIikge1xuICAgICAgZm9yIChsZXQgb2kgaW4gb3B0cy5pbnB1dCkge1xuICAgICAgICB0aGF0W29pXSA9IHRoaXMuJGFjdGl2ZURpYWxvZy5maW5kKCdbZGF0YS1kaWFsb2ctcHJvbXB0PScgKyBvaSArICddJykudmFsKCk7XG4gICAgICAgIGlmICh0aGF0W29pXSA9PSBcIlwiIHx8IHRoYXRbb2ldID09IG51bGwpIHtcbiAgICAgICAgICBlbXB0eUtleSA9IG9pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvcHRzLmJ0bnNba10ub25DbGljaykge1xuICAgICAgb3B0cy5idG5zW2tdLm9uQ2xpY2suY2FsbCh0aGF0LCB0aGF0KTtcbiAgICB9XG4gICAgZWxzZSBpZiAob3B0cy5kaWFsb2dUeXBlID09PSBcImFsZXJ0XCIpIHtcbiAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2suY2FsbCh0aGF0LCB0aGF0KTtcbiAgICAgIHRoaXMuY2xvc2Uoe2RvTm90Q2FsbGJhY2s6IHRydWV9KTtcbiAgICB9XG4gICAgZWxzZSBpZiAob3B0cy5kaWFsb2dUeXBlID09PSBcImNvbmZpcm1cIikge1xuICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjay5jYWxsKHRoYXQsIHRoYXQpO1xuICAgICAgdGhpcy5jbG9zZSh7ZG9Ob3RDYWxsYmFjazogdHJ1ZX0pO1xuICAgIH1cbiAgICBlbHNlIGlmIChvcHRzLmRpYWxvZ1R5cGUgPT09IFwicHJvbXB0XCIpIHtcbiAgICAgIGlmIChrID09PSAnb2snKSB7XG4gICAgICAgIGlmIChlbXB0eUtleSkge1xuICAgICAgICAgIHRoaXMuJGFjdGl2ZURpYWxvZy5maW5kKCdbZGF0YS1kaWFsb2ctcHJvbXB0PVwiJyArIGVtcHR5S2V5ICsgJ1wiXScpLmdldCgwKS5mb2N1cygpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjay5jYWxsKHRoYXQsIHRoYXQpO1xuICAgICAgdGhpcy5jbG9zZSh7ZG9Ob3RDYWxsYmFjazogdHJ1ZX0pO1xuICAgIH1cbiAgfVxuXG4gIHRoYXQgPSBudWxsO1xuICBvcHRzID0gbnVsbDtcbiAgY2FsbGJhY2sgPSBudWxsO1xuICB0YXJnZXQgPSBudWxsO1xuICBrID0gbnVsbDtcbn07XG5jb25zdCBvbktleXVwID0gZnVuY3Rpb24gKGUsIG9wdHMsIGNhbGxiYWNrLCB0YXJnZXQsIGspIHtcbiAgbGV0IHRoYXQsXG4gICAgICBlbXB0eUtleSA9IG51bGw7XG5cbiAgaWYgKGUua2V5Q29kZSA9PSBpbmZvLmV2ZW50S2V5cy5FU0MpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cbiAgaWYgKG9wdHMuZGlhbG9nVHlwZSA9PT0gXCJwcm9tcHRcIikge1xuICAgIGlmIChlLmtleUNvZGUgPT0gaW5mby5ldmVudEtleXMuUkVUVVJOKSB7XG4gICAgICB0aGF0ID0ge1xuICAgICAgICBzZWxmOiB0aGlzLFxuICAgICAgICBrZXk6IGssIHZhbHVlOiBvcHRzLmJ0bnNba10sXG4gICAgICAgIGRpYWxvZ0lkOiBvcHRzLmlkLFxuICAgICAgICBidG5UYXJnZXQ6IHRhcmdldFxuICAgICAgfTtcblxuICAgICAgZm9yIChsZXQgb2kgaW4gb3B0cy5pbnB1dCkge1xuICAgICAgICB0aGF0W29pXSA9IHRoaXMuJGFjdGl2ZURpYWxvZy5maW5kKCdbZGF0YS1kaWFsb2ctcHJvbXB0PScgKyBvaSArICddJykudmFsKCk7XG4gICAgICAgIGlmICh0aGF0W29pXSA9PSBcIlwiIHx8IHRoYXRbb2ldID09IG51bGwpIHtcbiAgICAgICAgICBlbXB0eUtleSA9IG9pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZW1wdHlLZXkpIHtcbiAgICAgICAgdGhhdCA9IG51bGw7XG4gICAgICAgIGVtcHR5S2V5ID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjay5jYWxsKHRoYXQsIHRoYXQpO1xuICAgICAgdGhpcy5jbG9zZSh7ZG9Ob3RDYWxsYmFjazogdHJ1ZX0pO1xuICAgIH1cbiAgfVxuXG4gIHRoYXQgPSBudWxsO1xuICBlbXB0eUtleSA9IG51bGw7XG4gIG9wdHMgPSBudWxsO1xuICBjYWxsYmFjayA9IG51bGw7XG4gIHRhcmdldCA9IG51bGw7XG4gIGsgPSBudWxsO1xufTtcblxuLyogfn5+fn5+fn5+fn5+fn5+fn5+IGVuZCBvZiBwcml2YXRlICB+fn5+fn5+fn5+fn5+fn5+fn5+fiAqL1xuXG4vKipcbiAqIEBjbGFzc1xuICovXG5jbGFzcyBBWDZVSURpYWxvZyBleHRlbmRzIEFYNlVJQ29yZSB7XG4gIC8qKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIGNvbmZpZ1xuICAgKi9cbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIC8qKlxuICAgICAqIEBtZW1iZXIge0pTT059XG4gICAgICogQHBhcmFtIGNvbmZpZ1xuICAgICAqIEBwYXJhbSBbY29uZmlnLnRoZW1lPSdkZWZhdWx0J11cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy53aWR0aD0zMDBdXG4gICAgICogQHBhcmFtIFtjb25maWcudGl0bGU9JyddXG4gICAgICogQHBhcmFtIFtjb25maWcubXNnPScnXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmxhbmddXG4gICAgICogQHBhcmFtIFtjb25maWcubGFuZy5vaz0nb2snXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmxhbmcuY2FuY2VsPSdjYW5jZWwnXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmFuaW1hdGVUaW1lPTE1MF1cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5hdXRvQ2xvc2VUaW1lPTBdXG4gICAgICogQHBhcmFtIFtjb25maWcub25TdGF0ZUNoYW5nZWRdXG4gICAgICpcbiAgICAgKi9cbiAgICB0aGlzLmNvbmZpZyA9IHtcbiAgICAgIGlkOiAnYXg2LWRpYWxvZy0nICsgdGhpcy5pbnN0YW5jZUlkLFxuICAgICAgY2xpY2tFdmVudE5hbWU6IFwiY2xpY2tcIixcbiAgICAgIHRoZW1lOiAnZGVmYXVsdCcsXG4gICAgICB3aWR0aDogMzAwLFxuICAgICAgdGl0bGU6ICdBWDZVSURpYWxvZycsXG4gICAgICBtc2c6ICcnLFxuICAgICAgbGFuZzoge1xuICAgICAgICBcIm9rXCI6IFwib2tcIiwgXCJjYW5jZWxcIjogXCJjYW5jZWxcIlxuICAgICAgfSxcbiAgICAgIGFuaW1hdGVUaW1lOiAxNTAsXG4gICAgICBhdXRvQ2xvc2VUaW1lOiAwXG4gICAgfTtcbiAgICBqUXVlcnkuZXh0ZW5kKHRydWUsIHRoaXMuY29uZmlnLCBjb25maWcpO1xuXG4gICAgLy8g66mk67KEIOuzgOyImCDstIjquLDtmZRcbiAgICAvKipcbiAgICAgKiBkaWFsb2fqsIAg7Je066Ck7J6I64qUIOyDge2DnOyXkOyEnCDri6Tsi5wgb3BlbuydtCDrkJjrqbQgcXVldWXsl5Ag67O06rSAIO2VmOyYgOuLpOqwgCBjbG9zZe2bhCBvcGVuXG4gICAgICogQG1lbWJlciB7QXJyYXl9XG4gICAgICovXG4gICAgdGhpcy5xdWV1ZSA9IFtdO1xuICAgIC8qKlxuICAgICAqIEBtZW1iZXIge2pRdWVyeUVsZW1lbnR9XG4gICAgICovXG4gICAgdGhpcy4kYWN0aXZlRGlhbG9nID0gbnVsbDtcbiAgICAvKipcbiAgICAgKiBAbWVtYmVyIHtPYmplY3R9XG4gICAgICovXG4gICAgdGhpcy5hdXRvQ2xvc2VUaW1lciA9IG51bGw7XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBwYXJhbSBjb25maWdcbiAgICovXG4gIGluaXQoKSB7XG4gICAgdGhpcy5vblN0YXRlQ2hhbmdlZCA9IHRoaXMuY29uZmlnLm9uU3RhdGVDaGFuZ2VkO1xuICAgIGRlbGV0ZSB0aGlzLmNvbmZpZy5vblN0YXRlQ2hhbmdlZDtcblxuICAgIC8vIGluaXQg7Zi47LacIOyXrOu2gFxuICAgIHRoaXMuaW5pdE9uY2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqL1xuICBpbml0T25jZSgpIHtcbiAgICBpZiAodGhpcy5pbml0aWFsaXplZCkgcmV0dXJuIHRoaXM7XG4gICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAcGFyYW0gb3B0c1xuICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICogQHBhcmFtIHRyeUNvdW50XG4gICAqIEByZXR1cm4ge0FYNlVJRGlhbG9nfVxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBqc1xuICAgKiBpbXBvcnQge0RpYWxvZ30gZnJvbSBcImF4NnVpXCJcbiAgICpcbiAgICogY29uc3QgZGlhbG9nID0gbmV3IERpYWxvZygpO1xuICAgKiBkaWFsb2cuYWxlcnQoXCJBbGVydCBNZXNzYWdlXCIpO1xuICAgKiBkaWFsb2cuYWxlcnQoe1xuICAgICAqICAgICB0aXRsZTogXCJUaXRsZVwiLFxuICAgICAqICAgICBtc2c6IFwiQWxlcnQgTWVzc2FnZVwiXG4gICAgICogfSk7XG4gICAqIGBgYFxuICAgKi9cbiAgYWxlcnQob3B0cywgY2FsbGJhY2ssIHRyeUNvdW50KSB7XG4gICAgaWYgKHR5cGVvZiBvcHRzID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBvcHRzID0ge1xuICAgICAgICB0aXRsZTogdGhpcy5jb25maWcudGl0bGUsXG4gICAgICAgIG1zZzogXCJcIlxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoVS5pc1N0cmluZyhvcHRzKSkge1xuICAgICAgb3B0cyA9IHtcbiAgICAgICAgdGl0bGU6IHRoaXMuY29uZmlnLnRpdGxlLFxuICAgICAgICBtc2c6IG9wdHNcbiAgICAgIH1cbiAgICB9XG5cbiAgICBvcHRzID0galF1ZXJ5LmV4dGVuZCh0cnVlLCB7fSwgdGhpcy5jb25maWcsIG9wdHMsIHtcbiAgICAgIGRpYWxvZ1R5cGU6IFwiYWxlcnRcIixcbiAgICAgIGNhbGxiYWNrOiBjYWxsYmFja1xuICAgIH0pO1xuXG4gICAgaWYgKHR5cGVvZiBvcHRzLmJ0bnMgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIG9wdHMuYnRucyA9IHtcbiAgICAgICAgb2s6IHtsYWJlbDogb3B0cy5sYW5nW1wib2tcIl0sIHRoZW1lOiBvcHRzLnRoZW1lfVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy4kYWN0aXZlRGlhbG9nKSB7XG4gICAgICB0aGlzLnF1ZXVlLnB1c2gob3B0cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wZW4uY2FsbCh0aGlzLCBvcHRzLCBjYWxsYmFjayk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQHBhcmFtIG9wdHNcbiAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAqIEBwYXJhbSB0cnlDb3VudFxuICAgKiBAcmV0dXJuIHtBWDZVSURpYWxvZ31cbiAgICogQGV4YW1wbGVcbiAgICogYGBganNcbiAgICogaW1wb3J0IHtEaWFsb2d9IGZyb20gXCJheDZ1aVwiXG4gICAqXG4gICAqIGNvbnN0IGRpYWxvZyA9IG5ldyBEaWFsb2coKTtcbiAgICogZGlhbG9nLmNvbmZpcm0oe1xuICAgICAqICAgICB0aXRsZTogXCLtmZXsnbhcIixcbiAgICAgKiAgICAgbXNnOiBcIu2ZleyduCDrmJDripQg7Leo7IaM66W8IOuIhOultOyEuOyalFwiXG4gICAgICogfSwgZnVuY3Rpb24gKHJlcykge1xuICAgICAqICAgICAvL2NvbnNvbGUubG9nKHRoaXMsIGEsIGIpO1xuICAgICAqICAgICBpZihyZXMua2V5ID09IFwib2tcIil7XG4gICAgICogICAgICAgICBjb25zb2xlLmxvZyhcIk9LXCIpO1xuICAgICAqICAgICB9XG4gICAgICogICAgIGVsc2UgaWYocmVzLmtleSA9PSBcImNhbmNlbFwiKXtcbiAgICAgKiAgICAgICAgIGNvbnNvbGUubG9nKFwiQ0FOQ0VMXCIpO1xuICAgICAqICAgICB9XG4gICAgICogfSk7XG4gICAqXG4gICAqIC8vIGJ0bnMgY3VzdG9tXG4gICAqIGRpYWxvZy5jb25maWcoe1xuICAgICAqICB0aXRsZTogXCLsmIgv7JWE64uI7JikXCIsXG4gICAgICogIG1zZzogXCLri7nsi6DsnYAg6rCc67Cc7J6QIOyeheuLiOq5jD9cIixcbiAgICAgKiAgYnRuczoge1xuICAgICAqICAgICAgWToge2xhYmVsOiBcIuyYiFwifSxcbiAgICAgKiAgICAgIE46IHtsYWJlbDogXCLslYTri4jsmKRcIn1cbiAgICAgKiAgfVxuICAgICAqIH0sIGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgKiAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICogfSk7XG4gICAqIGBgYFxuICAgKi9cbiAgY29uZmlybShvcHRzLCBjYWxsYmFjaywgdHJ5Q291bnQpIHtcbiAgICBpZiAodHlwZW9mIG9wdHMgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIG9wdHMgPSB7XG4gICAgICAgIHRpdGxlOiB0aGlzLmNvbmZpZy50aXRsZSxcbiAgICAgICAgbXNnOiBcIlwiXG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChVLmlzU3RyaW5nKG9wdHMpKSB7XG4gICAgICBvcHRzID0ge1xuICAgICAgICB0aXRsZTogdGhpcy5jb25maWcudGl0bGUsXG4gICAgICAgIG1zZzogb3B0c1xuICAgICAgfVxuICAgIH1cblxuICAgIG9wdHMgPSBqUXVlcnkuZXh0ZW5kKHRydWUsIHt9LCB0aGlzLmNvbmZpZywgb3B0cywge1xuICAgICAgZGlhbG9nVHlwZTogXCJjb25maXJtXCIsXG4gICAgICBjYWxsYmFjazogY2FsbGJhY2tcbiAgICB9KTtcblxuICAgIGlmICh0eXBlb2Ygb3B0cy5idG5zID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBvcHRzLmJ0bnMgPSB7XG4gICAgICAgIG9rOiB7bGFiZWw6IG9wdHMubGFuZ1tcIm9rXCJdLCB0aGVtZTogb3B0cy50aGVtZX0sXG4gICAgICAgIGNhbmNlbDoge2xhYmVsOiBvcHRzLmxhbmdbXCJjYW5jZWxcIl19XG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmICh0aGlzLiRhY3RpdmVEaWFsb2cpIHtcbiAgICAgIHRoaXMucXVldWUucHVzaChvcHRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3Blbi5jYWxsKHRoaXMsIG9wdHMsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEBwYXJhbSBvcHRzXG4gICAqIEBwYXJhbSBjYWxsYmFja1xuICAgKiBAcGFyYW0gdHJ5Q291bnRcbiAgICogQHJldHVybiB7QVg2VUlEaWFsb2d9XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqIGltcG9ydCB7RGlhbG9nfSBmcm9tIFwiYXg2dWlcIlxuICAgKlxuICAgKiBjb25zdCBkaWFsb2cgPSBuZXcgRGlhbG9nKCk7XG4gICAqXG4gICAqIGRpYWxvZy5wcm9tcHQoe1xuICAgICAqICB0aXRsZTogXCJwcm9tcHRcIixcbiAgICAgKiAgbXNnOiAn64uk7J2M7J2YIOqwkuydhCDsnoXroKXtlZjshLjsmpQuJyxcbiAgICAgKiAgaW5wdXQ6IHtcbiAgICAgKiAgICAgIGRhdGExOiB7bGFiZWw6IFwiZGF0YTHsnZgg652867KoXCIsIHR5cGU6IFwicGFzc3dvcmRcIn0sXG4gICAgICogICAgICBkYXRhMjoge2xhYmVsOiBcImRhdGEy7J2YIOudvOuyqFwifVxuICAgICAqICB9XG4gICAgICogfSwgZnVuY3Rpb24ocmVzKXtcbiAgICAgKiAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICogfSk7XG4gICAqIGBgYFxuICAgKi9cbiAgcHJvbXB0KG9wdHMsIGNhbGxiYWNrLCB0cnlDb3VudCkge1xuICAgIGlmICh0eXBlb2Ygb3B0cyA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgb3B0cyA9IHtcbiAgICAgICAgdGl0bGU6IHRoaXMuY29uZmlnLnRpdGxlLFxuICAgICAgICBtc2c6IFwiXCJcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKFUuaXNTdHJpbmcob3B0cykpIHtcbiAgICAgIG9wdHMgPSB7XG4gICAgICAgIHRpdGxlOiB0aGlzLmNvbmZpZy50aXRsZSxcbiAgICAgICAgbXNnOiBvcHRzXG4gICAgICB9XG4gICAgfVxuXG4gICAgb3B0cyA9IGpRdWVyeS5leHRlbmQodHJ1ZSwge30sIHRoaXMuY29uZmlnLCBvcHRzLCB7XG4gICAgICBkaWFsb2dUeXBlOiBcInByb21wdFwiLFxuICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrXG4gICAgfSk7XG5cbiAgICBpZiAodHlwZW9mIG9wdHMuaW5wdXQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIG9wdHMuaW5wdXQgPSB7XG4gICAgICAgIHZhbHVlOiB7bGFiZWw6IFwiXCJ9XG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG9wdHMuYnRucyA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgb3B0cy5idG5zID0ge1xuICAgICAgICBvazoge2xhYmVsOiBvcHRzLmxhbmdbXCJva1wiXSwgdGhlbWU6IG9wdHMudGhlbWV9LFxuICAgICAgICBjYW5jZWw6IHtsYWJlbDogb3B0cy5sYW5nW1wiY2FuY2VsXCJdfVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy4kYWN0aXZlRGlhbG9nKSB7XG4gICAgICB0aGlzLnF1ZXVlLnB1c2gob3B0cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wZW4uY2FsbCh0aGlzLCBvcHRzLCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAcGFyYW0gX29wdGlvblxuICAgKiBAcmV0dXJuIHtBWDZVSURpYWxvZ31cbiAgICogQGV4YW1wbGVcbiAgICogYGBganNcbiAgICogZGlhbG9nLmNsb3NlKCk7XG4gICAqIGRpYWxvZy5jbG9zZSh7Y2FsbGJhY2s6IGZ1bmN0aW9uKCl7XG4gICAgICpcbiAgICAgKiB9KTtcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgY2xvc2UoX29wdGlvbikge1xuICAgIGxldCBvcHRzLCB0aGF0O1xuXG4gICAgaWYgKHRoaXMuJGFjdGl2ZURpYWxvZykge1xuICAgICAgaWYgKHRoaXMuYXV0b0Nsb3NlVGltZXIpIGNsZWFyVGltZW91dCh0aGlzLmF1dG9DbG9zZVRpbWVyKTtcblxuICAgICAgb3B0cyA9IHRoaXMuZGlhbG9nQ29uZmlnO1xuXG4gICAgICB0aGlzLiRhY3RpdmVEaWFsb2cuYWRkQ2xhc3MoXCJkZXN0cm95XCIpO1xuICAgICAgalF1ZXJ5KHdpbmRvdylcbiAgICAgICAgLm9mZihcImtleWRvd24uYXg2ZGlhbG9nXCIpXG4gICAgICAgIC5vZmYoXCJyZXNpemUuYXg2ZGlhbG9nXCIpO1xuXG4gICAgICBzZXRUaW1lb3V0KChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLiRhY3RpdmVEaWFsb2cpIHtcbiAgICAgICAgICB0aGlzLiRhY3RpdmVEaWFsb2cucmVtb3ZlKCk7XG4gICAgICAgICAgdGhpcy4kYWN0aXZlRGlhbG9nID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoYXQgPSB7XG4gICAgICAgICAgc2VsZjogdGhpcyxcbiAgICAgICAgICBzdGF0ZTogXCJjbG9zZVwiLFxuICAgICAgICAgIGRpYWxvZ0lkOiBvcHRzLmlkXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKF9vcHRpb24gJiYgVS5pc0Z1bmN0aW9uKF9vcHRpb24uY2FsbGJhY2spKSB7XG4gICAgICAgICAgX29wdGlvbi5jYWxsYmFjay5jYWxsKHRoYXQsIHRoYXQpO1xuICAgICAgICB9IGVsc2UgaWYgKG9wdHMuY2FsbGJhY2sgJiYgKCFfb3B0aW9uIHx8ICFfb3B0aW9uLmRvTm90Q2FsbGJhY2spKSB7XG4gICAgICAgICAgb3B0cy5jYWxsYmFjay5jYWxsKHRoYXQsIHRoYXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdHMgJiYgb3B0cy5vblN0YXRlQ2hhbmdlZCkge1xuICAgICAgICAgIG9wdHMub25TdGF0ZUNoYW5nZWQuY2FsbCh0aGF0LCB0aGF0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLm9uU3RhdGVDaGFuZ2VkKSB7XG4gICAgICAgICAgdGhpcy5vblN0YXRlQ2hhbmdlZC5jYWxsKHRoYXQsIHRoYXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g7Je066Ck7JW8IO2VoCDtgZDqsIAg64Ko7JWEIOyeiOuLpOuptCDtgZDslYTsnbTthZzsnLzroZwg64uk7IucIG9wZW5cbiAgICAgICAgaWYgKHRoaXMucXVldWUgJiYgdGhpcy5xdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgICBvcGVuLmNhbGwodGhpcywgdGhpcy5xdWV1ZS5zaGlmdCgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wdHMgPSBudWxsO1xuICAgICAgICB0aGF0ID0gbnVsbDtcbiAgICAgIH0pLmJpbmQodGhpcyksIHRoaXMuY29uZmlnLmFuaW1hdGVUaW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQVg2VUlEaWFsb2c7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL3NyYy9BWDZVSURpYWxvZy5qcyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zdHlsZS5zY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHt9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3N0eWxlLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3N0eWxlLnNjc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL3NyYy9BWDZVSURpYWxvZy9zdHlsZS5zY3NzXG4vLyBtb2R1bGUgaWQgPSA3NlxuLy8gbW9kdWxlIGNodW5rcyA9IDEgMTAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodW5kZWZpbmVkKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIkAtd2Via2l0LWtleWZyYW1lcyBheC1kaWFsb2cge1xcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAwLjA7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZVgoMSk7IH1cXG4gIDAuMSUge1xcbiAgICBvcGFjaXR5OiAwLjA7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZVgoMS4zKTsgfVxcbiAgMTAwJSB7XFxuICAgIG9wYWNpdHk6IDEuMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlWCgxKTsgfSB9XFxuXFxuQC1tb3ota2V5ZnJhbWVzIGF4LWRpYWxvZyB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDAuMDtcXG4gICAgLW1vei10cmFuc2Zvcm06IHNjYWxlWCgxKTsgfVxcbiAgMC4xJSB7XFxuICAgIG9wYWNpdHk6IDAuMDtcXG4gICAgLW1vei10cmFuc2Zvcm06IHNjYWxlWCgxLjMpOyB9XFxuICAxMDAlIHtcXG4gICAgb3BhY2l0eTogMS4wO1xcbiAgICAtbW96LXRyYW5zZm9ybTogc2NhbGVYKDEpOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIGF4LWRpYWxvZyB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDAuMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlWCgxKTtcXG4gICAgLW1vei10cmFuc2Zvcm06IHNjYWxlWCgxKTtcXG4gICAgLW1zLXRyYW5zZm9ybTogc2NhbGVYKDEpO1xcbiAgICAtby10cmFuc2Zvcm06IHNjYWxlWCgxKTtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZVgoMSk7IH1cXG4gIDAuMSUge1xcbiAgICBvcGFjaXR5OiAwLjA7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZVgoMS4zKTtcXG4gICAgLW1vei10cmFuc2Zvcm06IHNjYWxlWCgxLjMpO1xcbiAgICAtbXMtdHJhbnNmb3JtOiBzY2FsZVgoMS4zKTtcXG4gICAgLW8tdHJhbnNmb3JtOiBzY2FsZVgoMS4zKTtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZVgoMS4zKTsgfVxcbiAgMTAwJSB7XFxuICAgIG9wYWNpdHk6IDEuMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlWCgxKTtcXG4gICAgLW1vei10cmFuc2Zvcm06IHNjYWxlWCgxKTtcXG4gICAgLW1zLXRyYW5zZm9ybTogc2NhbGVYKDEpO1xcbiAgICAtby10cmFuc2Zvcm06IHNjYWxlWCgxKTtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZVgoMSk7IH0gfVxcblxcbkAtd2Via2l0LWtleWZyYW1lcyBheC1kaWFsb2ctZGVzdHJveSB7XFxuICBmcm9tIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAwKTtcXG4gICAgb3BhY2l0eTogMS4wOyB9XFxuICB0byB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgNTAlKTtcXG4gICAgb3BhY2l0eTogMC4wOyB9IH1cXG5cXG5ALW1vei1rZXlmcmFtZXMgYXgtZGlhbG9nLWRlc3Ryb3kge1xcbiAgZnJvbSB7XFxuICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCk7XFxuICAgIG9wYWNpdHk6IDEuMDsgfVxcbiAgdG8ge1xcbiAgICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDUwJSk7XFxuICAgIG9wYWNpdHk6IDAuMDsgfSB9XFxuXFxuQGtleWZyYW1lcyBheC1kaWFsb2ctZGVzdHJveSB7XFxuICBmcm9tIHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAwKTtcXG4gICAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAwKTtcXG4gICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDApO1xcbiAgICAtby10cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAwKTtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCk7XFxuICAgIG9wYWNpdHk6IDEuMDsgfVxcbiAgdG8ge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDUwJSk7XFxuICAgIC1tb3otdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgNTAlKTtcXG4gICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDUwJSk7XFxuICAgIC1vLXRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDUwJSk7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDUwJSk7XFxuICAgIG9wYWNpdHk6IDAuMDsgfSB9XFxuXFxuW2RhdGEtYXg2dWktZGlhbG9nXSB7XFxuICAtd2Via2l0LWFuaW1hdGlvbjogYXgtZGlhbG9nIDAuMTVzIGN1YmljLWJlemllcigwLjE3NSwgMC44ODUsIDAuMzIsIDEuMjc1KTtcXG4gIC1tb3otYW5pbWF0aW9uOiBheC1kaWFsb2cgMC4xNXMgY3ViaWMtYmV6aWVyKDAuMTc1LCAwLjg4NSwgMC4zMiwgMS4yNzUpO1xcbiAgYW5pbWF0aW9uOiBheC1kaWFsb2cgMC4xNXMgY3ViaWMtYmV6aWVyKDAuMTc1LCAwLjg4NSwgMC4zMiwgMS4yNzUpO1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7XFxuICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlWigwKTtcXG4gIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7XFxuICAtby10cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICBib3gtc2hhZG93OiAwcHggMHB4IDNweCAwcHggcmdiYSgwLCAwLCAwLCAwLjE3NSk7XFxuICB6LWluZGV4OiAyMDAwO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgbGVmdDogMDtcXG4gIHRvcDogMDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkOyB9XFxuICBbZGF0YS1heDZ1aS1kaWFsb2ddIC5heC1kaWFsb2ctaGVhZGVyIHtcXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gICAgcGFkZGluZzogMTBweCAxNXB4O1xcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7IH1cXG4gICAgW2RhdGEtYXg2dWktZGlhbG9nXSAuYXgtZGlhbG9nLWhlYWRlciAuYmFkZ2Uge1xcbiAgICAgIGZvbnQtc2l6ZTogMC44ZW07XFxuICAgICAgY29sb3I6ICNmNWY1ZjU7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzMzMzsgfVxcbiAgW2RhdGEtYXg2dWktZGlhbG9nXSAuYXgtZGlhbG9nLWJvZHkge1xcbiAgICBwYWRkaW5nOiAxNXB4O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cXG4gICAgW2RhdGEtYXg2dWktZGlhbG9nXSAuYXgtZGlhbG9nLWJvZHkgLmF4LWRpYWxvZy1tc2cge1xcbiAgICAgIHBhZGRpbmctdG9wOiAxNXB4O1xcbiAgICAgIHBhZGRpbmctYm90dG9tOiAxNXB4OyB9XFxuICAgIFtkYXRhLWF4NnVpLWRpYWxvZ10gLmF4LWRpYWxvZy1ib2R5IC5heC1kaWFsb2ctcHJvbXB0IHtcXG4gICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xcbiAgICAgIHBhZGRpbmctYm90dG9tOiA3LjVweDsgfVxcbiAgICBbZGF0YS1heDZ1aS1kaWFsb2ddIC5heC1kaWFsb2ctYm9keSAuYXgtZGlhbG9nLWJ1dHRvbnMge1xcbiAgICAgIG1hcmdpbi10b3A6IDE1cHg7IH1cXG4gICAgICBbZGF0YS1heDZ1aS1kaWFsb2ddIC5heC1kaWFsb2ctYm9keSAuYXgtZGlhbG9nLWJ1dHRvbnMgYnV0dG9uOm5vdCg6bGFzdC1jaGlsZCkge1xcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAzcHg7IH1cXG4gICAgW2RhdGEtYXg2dWktZGlhbG9nXSAuYXgtZGlhbG9nLWJvZHkgW2RhdGEtZGlhbG9nLWVscz1cXFwiYWRkaXRpb25hbC1jb250ZW50XFxcIl0ge1xcbiAgICAgIG1hcmdpbi10b3A6IDE1cHg7IH1cXG4gIFtkYXRhLWF4NnVpLWRpYWxvZ10gLmF4LWRpYWxvZy1oZWFkZXIge1xcbiAgICBjb2xvcjogIzMzMztcXG4gICAgYmFja2dyb3VuZDogI2Y1ZjVmNTsgfVxcbiAgICBbZGF0YS1heDZ1aS1kaWFsb2ddIC5heC1kaWFsb2ctaGVhZGVyIC5iYWRnZSB7XFxuICAgICAgY29sb3I6ICNmNWY1ZjU7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzMzMzsgfVxcbiAgW2RhdGEtYXg2dWktZGlhbG9nXS5kZXN0cm95IHtcXG4gICAgLXdlYmtpdC1hbmltYXRpb246IGF4LWRpYWxvZy1kZXN0cm95IDAuMTVzIGN1YmljLWJlemllcigwLjc1NSwgMC4wNSwgMC44NTUsIDAuMDYpIGZvcndhcmRzO1xcbiAgICAtbW96LWFuaW1hdGlvbjogYXgtZGlhbG9nLWRlc3Ryb3kgMC4xNXMgY3ViaWMtYmV6aWVyKDAuNzU1LCAwLjA1LCAwLjg1NSwgMC4wNikgZm9yd2FyZHM7XFxuICAgIGFuaW1hdGlvbjogYXgtZGlhbG9nLWRlc3Ryb3kgMC4xNXMgY3ViaWMtYmV6aWVyKDAuNzU1LCAwLjA1LCAwLjg1NSwgMC4wNikgZm9yd2FyZHM7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vc3JjL0FYNlVJRGlhbG9nL3N0eWxlLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDc3XG4vLyBtb2R1bGUgY2h1bmtzID0gMSAxMCIsImltcG9ydCBqUXVlcnkgZnJvbSBcImpxbWluXCI7XG5pbXBvcnQgQVg2VUlDb3JlIGZyb20gXCIuL0FYNlVJQ29yZS5qc1wiO1xuaW1wb3J0IFUgZnJvbSBcIi4vQVg2VXRpbFwiO1xuaW1wb3J0IGluZm8gZnJvbSBcIi4vQVg2SW5mb1wiO1xuaW1wb3J0IG11c3RhY2hlIGZyb20gXCIuL0FYNk11c3RhY2hlXCI7XG4vKiB+fn5+fn5+fn5+fn5+fn5+fn4gZW5kIG9mIGltcG9ydCAgfn5+fn5+fn5+fn5+fn5+fn5+fn4gKi9cblxuXG5sZXQgdG1wbCA9IHtcbiAgdXBsb2FkUHJvZ3Jlc3MoY29sdW1uS2V5cykge1xuICAgIHJldHVybiBgYDtcbiAgfSxcbiAgaW5wdXRGaWxlKGNvbHVtbktleXMpIHtcbiAgICByZXR1cm4gYDxpbnB1dCB0eXBlPVwiZmlsZVwiIGRhdGEtYXg2dWktdXBsb2FkZXItaW5wdXQ9XCJ7e2luc3RhbmNlSWR9fVwiIG5hbWU9XCJ7e25hbWV9fVwiIHt7I211bHRpcGxlfX1tdWx0aXBsZXt7L211bHRpcGxlfX0gYWNjZXB0PVwie3thY2NlcHR9fVwiIC8+YDtcbiAgfSxcbiAgaW5wdXRGaWxlRm9ybShjb2x1bW5LZXlzKSB7XG4gICAgcmV0dXJuIGA8Zm9ybSBkYXRhLWF4NnVpLXVwbG9hZGVyLWZvcm09XCJ7e2luc3RhbmNlSWR9fVwiIG5hbWU9XCJheDV1cGxvYWRlci17e2luc3RhbmNlSWR9fS1mb3JtXCIgbWV0aG9kPVwicG9zdFwiIGVuY3R5cGU9XCJtdWx0aXBhcnQvZm9ybS1kYXRhXCI+PC9mb3JtPmA7XG4gIH0sXG4gIHByb2dyZXNzQm94KGNvbHVtbktleXMpIHtcbiAgICByZXR1cm4gYFxuPGRpdiBkYXRhLWF4NnVpLXVwbG9hZGVyLXByb2dyZXNzYm94PVwie3tpbnN0YW5jZUlkfX1cIiBjbGFzcz1cInt7dGhlbWV9fVwiPlxuICAgIDxkaXYgY2xhc3M9XCJheC1wcm9ncmVzc2JveC1ib2R5XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJheC1wcmVncmVzc2JveC1jb250ZW50XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZ3Jlc3NcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2dyZXNzLWJhciBwcm9ncmVzcy1iYXItc3RyaXBlZCBhY3RpdmVcIiByb2xlPVwicHJvZ3Jlc3NiYXJcIiBzdHlsZT1cIndpZHRoOiAwXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzci1vbmx5XCIgcm9sZT1cInByb2dyZXNzYmFydmFsXCI+MCUgQ29tcGxldGU8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7eyNidG5zfX1cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJheC1wcm9ncmVzc2JveC1idXR0b25zXCI+XG4gICAgICAgICAgICB7eyNidG5zfX1cbiAgICAgICAgICAgICAgICB7eyNAZWFjaH19XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLXByZWdyZXNzYm94LWJ0bj1cInt7QGtleX19XCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQge3tAdmFsdWUudGhlbWV9fVwiPnt7QHZhbHVlLmxhYmVsfX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICB7ey9AZWFjaH19XG4gICAgICAgICAgICB7ey9idG5zfX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICB7ey9idG5zfX1cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiYXgtcHJvZ3Jlc3Nib3gtYXJyb3dcIj48L2Rpdj5cbjwvZGl2PlxuYDtcbiAgfSxcbiAgdXBvYWRlZEJveChjb2x1bW5LZXlzKSB7XG4gICAgcmV0dXJuIGBcbnt7I3VwbG9hZGVkRmlsZXN9fTxkaXYgZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1pdGVtPVwie3tAaX19XCI+XG4gICAgPGRpdiBjbGFzcz1cInVwbG9hZGVkLWl0ZW0tcHJldmlld1wiPlxuICAgICAgICB7eyMke2NvbHVtbktleXMudGh1bWJuYWlsfX19PGltZyBzcmM9XCIke2NvbHVtbktleXMuYXBpU2VydmVyVXJsfXt7JHtjb2x1bW5LZXlzLnRodW1ibmFpbH19fVwiPnt7LyR7Y29sdW1uS2V5cy50aHVtYm5haWx9fX1cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwidXBsb2FkZWQtaXRlbS1ob2xkZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInVwbG9hZGVkLWl0ZW0tY2VsbFwiIGRhdGEtdXBsb2FkZWQtaXRlbS1jZWxsPVwiZG93bmxvYWRcIj57e3tpY29uLmRvd25sb2FkfX19PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ1cGxvYWRlZC1pdGVtLWNlbGxcIiBkYXRhLXVwbG9hZGVkLWl0ZW0tY2VsbD1cImZpbGVuYW1lXCI+e3ske2NvbHVtbktleXMubmFtZX19fTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidXBsb2FkZWQtaXRlbS1jZWxsXCIgZGF0YS11cGxvYWRlZC1pdGVtLWNlbGw9XCJmaWxlc2l6ZVwiPih7eyNAZm5fZ2V0X2J5dGV9fXt7JHtjb2x1bW5LZXlzLnNpemV9fX17ey9AZm5fZ2V0X2J5dGV9fSk8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInVwbG9hZGVkLWl0ZW0tY2VsbFwiIGRhdGEtdXBsb2FkZWQtaXRlbS1jZWxsPVwiZGVsZXRlXCI+e3t7aWNvbi5kZWxldGV9fX08L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2Pnt7L3VwbG9hZGVkRmlsZXN9fVxue3tedXBsb2FkZWRGaWxlc319XG48ZGl2IGRhdGEtYXg2dWktdXBsb2FkZXItZW1wdHlMaXN0LW1zZz1cInRydWVcIj5cbiAge3sjc3VwcG9ydEZpbGVBcGl9fXt7e2xhbmcuc3VwcG9ydGVkSFRNTDVfZW1wdHlMaXN0TXNnfX19e3svc3VwcG9ydEZpbGVBcGl9fVxuICB7e15zdXBwb3J0RmlsZUFwaX19e3t7bGFuZy5lbXB0eUxpc3RNc2d9fX17ey9zdXBwb3J0RmlsZUFwaX19XG48L2Rpdj5cbnt7L3VwbG9hZGVkRmlsZXN9fVxuYDtcbiAgfVxufTtcblxuY29uc3Qgb25TdGF0ZUNoYW5nZWQgPSBmdW5jdGlvbiAodGhhdCkge1xuICBpZiAodGhpcy5jb25maWcub25TdGF0ZUNoYW5nZWQpIHtcbiAgICB0aGlzLmNvbmZpZy5vblN0YXRlQ2hhbmdlZC5jYWxsKHRoYXQsIHRoYXQpO1xuICB9XG4gIGVsc2UgaWYgKHRoaXMub25TdGF0ZUNoYW5nZWQpIHtcbiAgICB0aGlzLm9uU3RhdGVDaGFuZ2VkLmNhbGwodGhhdCwgdGhhdCk7XG4gIH1cblxuICB0aGF0ID0gbnVsbDtcbiAgcmV0dXJuIHRydWU7XG59O1xuY29uc3Qgb25TZWxlY3RGaWxlID0gZnVuY3Rpb24gKF9ldnQpIHtcbiAgbGV0IGZpbGVzO1xuXG4gIGlmICghaW5mby5zdXBwb3J0RmlsZUFwaSkge1xuICAgIC8vIGZpbGUgQVBJIOyngOybkCDslYjrkJjripQg67iM65287Jqw7KCALlxuICAgIC8vIGlucHV0IGZpbGXsl5AgbXVsdGlwbGUg7KeA7JuQIOyViOuQqCDqt7jrn6zrr4DroZwg64uo7J28IO2MjOydvCDsspjrpqzrp4wg7ZWY66m0IOuQqC5cbiAgICBmaWxlcyA9IHtwYXRoOiBfZXZ0LnRhcmdldC52YWx1ZX07XG4gIH1cbiAgZWxzZSBpZiAoJ2RhdGFUcmFuc2ZlcicgaW4gX2V2dCkge1xuICAgIGZpbGVzID0gX2V2dC5kYXRhVHJhbnNmZXIuZmlsZXM7XG4gIH1cbiAgZWxzZSBpZiAoJ3RhcmdldCcgaW4gX2V2dCkge1xuICAgIGZpbGVzID0gX2V2dC50YXJnZXQuZmlsZXM7XG4gIH1cbiAgZWxzZSBpZiAoX2V2dCkge1xuICAgIGZpbGVzID0gX2V2dDtcbiAgfVxuXG4gIGlmICghZmlsZXMpIHJldHVybiBmYWxzZTtcblxuICAvLy8gc2VsZWN0ZWRGaWxlc+yXkCDtmITsnqwg7YyM7J28IOygleuztCDri7TslYTrkZDquLBcbiAgaWYgKGxlbmd0aCBpbiBmaWxlcykge1xuICAgIGlmIChmaWxlcy5sZW5ndGggPT0gMSkge1xuICAgICAgdGhpcy5zZWxlY3RlZEZpbGVzID0gW2ZpbGVzWzBdXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZWxlY3RlZEZpbGVzID0gVS50b0FycmF5KGZpbGVzKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5zZWxlY3RlZEZpbGVzID0gW2ZpbGVzXTtcbiAgfVxuXG4gIGlmICh0aGlzLmNvbmZpZy5wcm9ncmVzc0JveCkge1xuICAgIG9wZW5Qcm9ncmVzc0JveC5jYWxsKHRoaXMpO1xuICB9XG4gIGlmICghdGhpcy5jb25maWcubWFudWFsVXBsb2FkKSB7XG4gICAgdGhpcy5zZW5kKCk7XG4gIH1cblxuICBpZiAoIWluZm8uc3VwcG9ydEZpbGVBcGkpIHtcbiAgICBhbGlnbkxheW91dC5jYWxsKHRoaXMsIGZhbHNlKTtcbiAgfVxufTtcbmNvbnN0IGJpbmRFdmVudCA9IGZ1bmN0aW9uICgpIHtcblxuICB0aGlzLiRmaWxlU2VsZWN0b3JcbiAgICAub2ZmKFwiY2xpY2suYXg1dXBsb2FkZXJcIilcbiAgICAub24oXCJjbGljay5heDV1cGxvYWRlclwiLCBlID0+IHtcbiAgICAgIHRoaXMuJGlucHV0RmlsZS50cmlnZ2VyKFwiY2xpY2tcIik7XG4gICAgfSk7XG5cbiAgaWYgKCFpbmZvLnN1cHBvcnRGaWxlQXBpKSB7XG4gICAgdGhpcy4kZmlsZVNlbGVjdG9yXG4gICAgICAub2ZmKFwibW91c2VvdmVyLmF4NXVwbG9hZGVyXCIpXG4gICAgICAub24oXCJtb3VzZW92ZXIuYXg1dXBsb2FkZXJcIiwgZSA9PiB7XG4gICAgICAgIGFsaWduTGF5b3V0LmNhbGwodGhpcywgdHJ1ZSk7XG4gICAgICB9KTtcblxuICAgIHRoaXMuJGlucHV0RmlsZVxuICAgICAgLm9mZihcIm1vdXNlb3Zlci5heDV1cGxvYWRlclwiKVxuICAgICAgLm9uKFwibW91c2VvdmVyLmF4NXVwbG9hZGVyXCIsIGUgPT4ge1xuICAgICAgICB0aGlzLiRmaWxlU2VsZWN0b3IuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICB9KTtcblxuICAgIHRoaXMuJGlucHV0RmlsZVxuICAgICAgLm9mZihcIm1vdXNlb3V0LmF4NXVwbG9hZGVyXCIpXG4gICAgICAub24oXCJtb3VzZW91dC5heDV1cGxvYWRlclwiLCBlID0+IHtcbiAgICAgICAgdGhpcy4kZmlsZVNlbGVjdG9yLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgICBhbGlnbkxheW91dC5jYWxsKHRoaXMsIGZhbHNlKTtcbiAgICAgIH0pO1xuICB9XG5cbiAge1xuICAgIGlmICghdGhpcy4kdXBsb2FkZWRCb3ggfHwgIXRoaXMuJHVwbG9hZGVkQm94LmdldCgwKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgdGhpcy4kdXBsb2FkZWRCb3gub24oXCJjbGlja1wiLCBcIltkYXRhLXVwbG9hZGVkLWl0ZW0tY2VsbF1cIiwgZSA9PiB7XG4gICAgICBsZXQgJHRoaXMgPSBqUXVlcnkoZS5jdXJyZW50VGFyZ2V0KSxcbiAgICAgICAgY2VsbFR5cGUgPSAkdGhpcy5hdHRyKFwiZGF0YS11cGxvYWRlZC1pdGVtLWNlbGxcIiksXG4gICAgICAgIHVwbG9hZGVkSXRlbUluZGV4ID0gTnVtYmVyKCR0aGlzLnBhcmVudHMoJ1tkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWl0ZW1dJykuYXR0cignZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1pdGVtJykpLFxuICAgICAgICB0aGF0ID0ge307XG5cbiAgICAgIGlmICh0aGlzLmNvbmZpZy51cGxvYWRlZEJveCAmJiB0aGlzLmNvbmZpZy51cGxvYWRlZEJveC5vbmNsaWNrKSB7XG4gICAgICAgIHRoYXQgPSB7XG4gICAgICAgICAgc2VsZjogdGhpcyxcbiAgICAgICAgICBjZWxsVHlwZTogY2VsbFR5cGUsXG4gICAgICAgICAgdXBsb2FkZWRGaWxlczogdGhpcy51cGxvYWRlZEZpbGVzLFxuICAgICAgICAgIGZpbGVJbmRleDogdXBsb2FkZWRJdGVtSW5kZXhcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jb25maWcudXBsb2FkZWRCb3gub25jbGljay5jYWxsKHRoYXQsIHRoYXQpO1xuICAgICAgfVxuXG4gICAgICAkdGhpcyA9IG51bGw7XG4gICAgICBjZWxsVHlwZSA9IG51bGw7XG4gICAgICB1cGxvYWRlZEl0ZW1JbmRleCA9IG51bGw7XG4gICAgICB0aGF0ID0gbnVsbDtcbiAgICB9KTtcblxuICAgIHRoaXMuJHVwbG9hZGVkQm94XG4gICAgICAub24oXCJkcmFnc3RhcnRcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgVS5zdG9wRXZlbnQoZSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICB9XG5cbiAge1xuICAgIC8vIGRyb3Bab25lIOyEpOyglSDrsKnsi50g67OA6rK9XG4gICAgaWYgKCFpbmZvLnN1cHBvcnRGaWxlQXBpKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCF0aGlzLiRkcm9wWm9uZSB8fCAhdGhpcy4kZHJvcFpvbmUuZ2V0KDApKSByZXR1cm4gZmFsc2U7XG5cbiAgICBsZXQgdGltZXI7XG5cbiAgICB0aGlzLiRkcm9wWm9uZS5wYXJlbnQoKVxuICAgICAgLm9uKFwiY2xpY2tcIiwgXCJbZGF0YS1heDZ1aS11cGxvYWRlci1kcm9wem9uZV1cIiwgZSA9PiB7XG4gICAgICAgIGxldCAkdGFyZ2V0ID0galF1ZXJ5KGUuY3VycmVudFRhcmdldCk7XG4gICAgICAgIGlmICgkdGFyZ2V0LnBhcmVudHMoJ1tkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWl0ZW1dJykubGVuZ3RoID09IDAgJiYgISR0YXJnZXQuYXR0cignZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1pdGVtJykpIHtcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKGUuY3VycmVudFRhcmdldCA9PSBlLnRhcmdldCwgJC5jb250YWlucyhlLnRhcmdldCwgZS5jdXJyZW50VGFyZ2V0KSwgZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWF4NnVpLXVwbG9hZGVyLWVtcHR5bGlzdC1tc2cnKSk7XG4gICAgICAgICAgaWYgKGUuY3VycmVudFRhcmdldCA9PSBlLnRhcmdldCB8fCAkLmNvbnRhaW5zKGUudGFyZ2V0LCBlLmN1cnJlbnRUYXJnZXQpIHx8IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1heDZ1aS11cGxvYWRlci1lbXB0eWxpc3QtbXNnJykpIHtcbiAgICAgICAgICAgIGlmIChVLmlzRnVuY3Rpb24odGhpcy5jb25maWcuZHJvcFpvbmUub25jbGljaykpIHtcbiAgICAgICAgICAgICAgdGhpcy5jb25maWcuZHJvcFpvbmUub25jbGljay5jYWxsKHtcbiAgICAgICAgICAgICAgICBzZWxmOiB0aGlzXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy4kaW5wdXRGaWxlLnRyaWdnZXIoXCJjbGlja1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgJHRhcmdldCA9IG51bGw7XG4gICAgICB9KTtcblxuICAgIHRoaXMuJGRyb3Bab25lLmdldCgwKS5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIGUgPT4ge1xuICAgICAgVS5zdG9wRXZlbnQoZSk7XG5cbiAgICAgIGlmIChVLmlzRnVuY3Rpb24odGhpcy5jb25maWcuZHJvcFpvbmUub25kcmFnb3ZlcikpIHtcbiAgICAgICAgdGhpcy5jb25maWcuZHJvcFpvbmUub25kcmFnb3Zlci5jYWxsKHtcbiAgICAgICAgICBzZWxmOiB0aGlzXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMuJGRyb3Bab25lLmFkZENsYXNzKFwiZHJhZ292ZXJcIik7XG4gICAgICB9XG5cbiAgICB9LCBmYWxzZSk7XG5cbiAgICB0aGlzLiRkcm9wWm9uZS5nZXQoMCkuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgZSA9PiB7XG4gICAgICBVLnN0b3BFdmVudChlKTtcblxuICAgICAgaWYgKFUuaXNGdW5jdGlvbih0aGlzLmNvbmZpZy5kcm9wWm9uZS5vbmRyYWdvdmVyKSkge1xuICAgICAgICB0aGlzLmNvbmZpZy5kcm9wWm9uZS5vbmRyYWdvdXQuY2FsbCh7XG4gICAgICAgICAgc2VsZjogdGhpc1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aGlzLiRkcm9wWm9uZS5yZW1vdmVDbGFzcyhcImRyYWdvdmVyXCIpO1xuICAgICAgfVxuXG4gICAgfSwgZmFsc2UpO1xuXG4gICAgdGhpcy4kZHJvcFpvbmUuZ2V0KDApLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCBlID0+IHtcbiAgICAgIFUuc3RvcEV2ZW50KGUpO1xuXG4gICAgICBpZiAoVS5pc0Z1bmN0aW9uKHRoaXMuY29uZmlnLmRyb3Bab25lLm9uZHJvcCkpIHtcbiAgICAgICAgdGhpcy5jb25maWcuZHJvcFpvbmUub25kcm9wLmNhbGwoe1xuICAgICAgICAgIHNlbGY6IHRoaXNcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhpcy4kZHJvcFpvbmUucmVtb3ZlQ2xhc3MoXCJkcmFnb3ZlclwiKTtcbiAgICAgIH1cblxuICAgICAgb25TZWxlY3RGaWxlLmNhbGwodGhpcywgZSB8fCB3aW5kb3cuZXZlbnQpO1xuICAgIH0sIGZhbHNlKTtcblxuICB9XG59O1xuY29uc3QgYWxpZ25MYXlvdXQgPSBmdW5jdGlvbiAoX1RGKSB7XG4gIC8vIOyDge2ZqeydtCDsoovsp4Ag7JWK7J2A6rK97JqwICjrp4zslb0g67KE7Yq8IO2BtOumreycvOuhnCBpbnB1dCBmaWxlIGNsaWNr7J20IOuQmOyngCDslYrripQg64uk66m0IHotaW5kZXjqsJLsnYQg64aS7Jes7IScIOuyhO2KvOychOulvCDrja7ripTri6QuKVxuICBpZiAoX1RGKSB7XG4gICAgaWYgKCFpbmZvLnN1cHBvcnRGaWxlQXBpKSB7XG4gICAgICAvLyBpZTnsl5DshJwgaW5wdXRGaWxl7J2EIOyngeygkSDtgbTrpq3tlZjsp4Ag7JWK7Jy866m0IHN1Ym1pdCDsmKTrpZjrsJzsg53tlaguIHN1Ym1pdCBhY2Nlc3MgZGVuaWVkXG4gICAgICAvLyDqt7jrnpjshJwg67KE7Yq87JyE7JeQIGlucHV0RmlsZeydhCDsmKzroKTrkZDslrTslbwg7ZWoLiAocG9zaXRpb27qsJLsnYQg7J207Jqp7ZWY66m0IO2OuO2VmOyngOunjC4uKVxuICAgICAgLy8g6re465+w642wIGZvcm3snYQg7JWI7JeQ65GQ66m0IOuYkCDri6Trpbgg7J207KSR7Y+8IOusuOygnCDrsJzsg53shozsp4Ag44Wc44WcIOu2iOqwgO2UvO2VmOqyjCDrsoTtirzsnZggb2Zmc2V0IOqwkuydhCDsnbTsmqkuXG4gICAgICBsZXQgYm94ID0gdGhpcy4kZmlsZVNlbGVjdG9yLm9mZnNldCgpO1xuICAgICAgYm94LndpZHRoID0gdGhpcy4kZmlsZVNlbGVjdG9yLm91dGVyV2lkdGgoKTtcbiAgICAgIGJveC5oZWlnaHQgPSB0aGlzLiRmaWxlU2VsZWN0b3Iub3V0ZXJIZWlnaHQoKTtcbiAgICAgIHRoaXMuJGlucHV0RmlsZS5jc3MoYm94KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhpcy4kaW5wdXRGaWxlLmNzcyh7XG4gICAgICBsZWZ0OiAtMTAwMCwgdG9wOiAtMTAwMFxuICAgIH0pO1xuICB9XG59XG5jb25zdCBhbGlnblByb2dyZXNzQm94ID0gZnVuY3Rpb24gKGFwcGVuZCkge1xuICBjb25zdCBfYWxpZ25Qcm9ncmVzc0JveCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgJHdpbmRvdyA9IGpRdWVyeSh3aW5kb3cpLCAkYm9keSA9IGpRdWVyeShkb2N1bWVudC5ib2R5KTtcbiAgICBsZXQgcG9zID0ge30sIHBvc2l0aW9uTWFyZ2luID0gNixcbiAgICAgIGRpbSA9IHt9LCBwaWNrZXJEaW0gPSB7fSxcbiAgICAgIHBpY2tlckRpcmVjdGlvbjtcblxuICAgIC8vIHRoaXMuY29uZmlnLnZpZXdwb3J0LnNlbGVjdG9yXG5cbiAgICBwb3MgPSAodGhpcy4kcHJvZ3Jlc3NCb3gucGFyZW50KCkuZ2V0KDApID09IHRoaXMuJHRhcmdldC5nZXQoMCkpID8gdGhpcy4kZmlsZVNlbGVjdG9yLnBvc2l0aW9uKCkgOiB0aGlzLiRmaWxlU2VsZWN0b3Iub2Zmc2V0KCk7XG4gICAgZGltID0ge1xuICAgICAgd2lkdGg6IHRoaXMuJGZpbGVTZWxlY3Rvci5vdXRlcldpZHRoKCksXG4gICAgICBoZWlnaHQ6IHRoaXMuJGZpbGVTZWxlY3Rvci5vdXRlckhlaWdodCgpXG4gICAgfTtcbiAgICBwaWNrZXJEaW0gPSB7XG4gICAgICB3aW5XaWR0aDogTWF0aC5tYXgoJHdpbmRvdy53aWR0aCgpLCAkYm9keS53aWR0aCgpKSxcbiAgICAgIHdpbkhlaWdodDogTWF0aC5tYXgoJHdpbmRvdy5oZWlnaHQoKSwgJGJvZHkuaGVpZ2h0KCkpLFxuICAgICAgd2lkdGg6IHRoaXMuJHByb2dyZXNzQm94Lm91dGVyV2lkdGgoKSxcbiAgICAgIGhlaWdodDogdGhpcy4kcHJvZ3Jlc3NCb3gub3V0ZXJIZWlnaHQoKVxuICAgIH07XG5cbiAgICAvLyBwaWNrZXIgY3NzKHdpZHRoLCBsZWZ0LCB0b3ApICYgZGlyZWN0aW9uIOqysOyglVxuICAgIGlmICghdGhpcy5jb25maWcucHJvZ3Jlc3NCb3hEaXJlY3Rpb24gfHwgdGhpcy5jb25maWcucHJvZ3Jlc3NCb3hEaXJlY3Rpb24gPT09IFwiXCIgfHwgdGhpcy5jb25maWcucHJvZ3Jlc3NCb3hEaXJlY3Rpb24gPT09IFwiYXV0b1wiKSB7XG4gICAgICAvLyBzZXQgZGlyZWN0aW9uXG4gICAgICBwaWNrZXJEaXJlY3Rpb24gPSBcInRvcFwiO1xuICAgICAgaWYgKHBvcy50b3AgLSBwaWNrZXJEaW0uaGVpZ2h0IC0gcG9zaXRpb25NYXJnaW4gPCAwKSB7XG4gICAgICAgIHBpY2tlckRpcmVjdGlvbiA9IFwidG9wXCI7XG4gICAgICB9IGVsc2UgaWYgKHBvcy50b3AgKyBkaW0uaGVpZ2h0ICsgcGlja2VyRGltLmhlaWdodCArIHBvc2l0aW9uTWFyZ2luID4gcGlja2VyRGltLndpbkhlaWdodCkge1xuICAgICAgICBwaWNrZXJEaXJlY3Rpb24gPSBcImJvdHRvbVwiO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBwaWNrZXJEaXJlY3Rpb24gPSB0aGlzLmNvbmZpZy5wcm9ncmVzc0JveERpcmVjdGlvbjtcbiAgICB9XG5cbiAgICBpZiAoYXBwZW5kKSB7XG4gICAgICB0aGlzLiRwcm9ncmVzc0JveFxuICAgICAgICAuYWRkQ2xhc3MoXCJkaXJlY3Rpb24tXCIgKyBwaWNrZXJEaXJlY3Rpb24pO1xuICAgIH1cblxuICAgIGxldCBwb3NpdGlvbkNTUyA9IChmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgY3NzID0ge2xlZnQ6IDAsIHRvcDogMH07XG4gICAgICBzd2l0Y2ggKHBpY2tlckRpcmVjdGlvbikge1xuICAgICAgICBjYXNlIFwidG9wXCI6XG4gICAgICAgICAgY3NzLmxlZnQgPSBwb3MubGVmdCArIGRpbS53aWR0aCAvIDIgLSBwaWNrZXJEaW0ud2lkdGggLyAyO1xuICAgICAgICAgIGNzcy50b3AgPSBwb3MudG9wICsgZGltLmhlaWdodCArIHBvc2l0aW9uTWFyZ2luO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiYm90dG9tXCI6XG4gICAgICAgICAgY3NzLmxlZnQgPSBwb3MubGVmdCArIGRpbS53aWR0aCAvIDIgLSBwaWNrZXJEaW0ud2lkdGggLyAyO1xuICAgICAgICAgIGNzcy50b3AgPSBwb3MudG9wIC0gcGlja2VyRGltLmhlaWdodCAtIHBvc2l0aW9uTWFyZ2luO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwibGVmdFwiOlxuICAgICAgICAgIGNzcy5sZWZ0ID0gcG9zLmxlZnQgKyBkaW0ud2lkdGggKyBwb3NpdGlvbk1hcmdpbjtcbiAgICAgICAgICBjc3MudG9wID0gcG9zLnRvcCAtIHBpY2tlckRpbS5oZWlnaHQgLyAyICsgZGltLmhlaWdodCAvIDI7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgICAgIGNzcy5sZWZ0ID0gcG9zLmxlZnQgLSBwaWNrZXJEaW0ud2lkdGggLSBwb3NpdGlvbk1hcmdpbjtcbiAgICAgICAgICBjc3MudG9wID0gcG9zLnRvcCAtIHBpY2tlckRpbS5oZWlnaHQgLyAyICsgZGltLmhlaWdodCAvIDI7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICByZXR1cm4gY3NzO1xuICAgIH0pKCk7XG5cbiAgICB7XG4gICAgICBpZiAocGlja2VyRGlyZWN0aW9uID09IFwidG9wXCIgfHwgcGlja2VyRGlyZWN0aW9uID09IFwiYm90dG9tXCIpIHtcbiAgICAgICAgaWYgKHBvc2l0aW9uQ1NTLmxlZnQgPCAwKSB7XG4gICAgICAgICAgcG9zaXRpb25DU1MubGVmdCA9IHBvc2l0aW9uTWFyZ2luO1xuICAgICAgICAgIHRoaXMuJHByb2dyZXNzQm94QXJyb3cuY3NzKHtsZWZ0OiAocG9zLmxlZnQgKyBkaW0ud2lkdGggLyAyKSAtIHBvc2l0aW9uQ1NTLmxlZnR9KTtcbiAgICAgICAgfSBlbHNlIGlmIChwb3NpdGlvbkNTUy5sZWZ0ICsgcGlja2VyRGltLndpZHRoID4gcGlja2VyRGltLndpbldpZHRoKSB7XG4gICAgICAgICAgcG9zaXRpb25DU1MubGVmdCA9IHBpY2tlckRpbS53aW5XaWR0aCAtIHBpY2tlckRpbS53aWR0aCAtIHBvc2l0aW9uTWFyZ2luO1xuICAgICAgICAgIHRoaXMuJHByb2dyZXNzQm94QXJyb3cuY3NzKHtsZWZ0OiAocG9zLmxlZnQgKyBkaW0ud2lkdGggLyAyKSAtIHBvc2l0aW9uQ1NTLmxlZnR9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuJHByb2dyZXNzQm94XG4gICAgICAuY3NzKHBvc2l0aW9uQ1NTKTtcbiAgfTtcblxuICB0aGlzLiRwcm9ncmVzc0JveC5jc3Moe3RvcDogLTk5OX0pO1xuXG4gIGlmIChhcHBlbmQpIHtcbiAgICAvLyBwcm9ncmVzc0JveOulvCBhcHBlbmQg7ZWgIO2DgOqynyDsl5jrpqzrqLztirgg7Y6A64uoIO2bhCDqsrDsoJUuXG4gICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLmNvbmZpZy52aWV3cG9ydCkge1xuICAgICAgICByZXR1cm4galF1ZXJ5KHRoaXMuY29uZmlnLnZpZXdwb3J0LnNlbGVjdG9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLiR0YXJnZXQ7XG4gICAgICB9XG4gICAgfSkuY2FsbCh0aGlzKS5hcHBlbmQodGhpcy4kcHJvZ3Jlc3NCb3gpO1xuXG4gICAgLy8gcHJvZ3Jlc3NCb3gg67KE7Yq87JeQIOydtOuypO2KuCDsl7DqsrAuXG4gICAgdGhpcy4kcHJvZ3Jlc3NCb3hcbiAgICAgIC5vZmYoXCJjbGljay5heDV1cGxvYWRlclwiKVxuICAgICAgLm9uKFwiY2xpY2suYXg1dXBsb2FkZXJcIiwgXCJidXR0b25cIiwgZSA9PiB7XG4gICAgICAgIGxldCBhY3QgPSBlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1wcmVncmVzc2JveC1idG5cIik7XG4gICAgICAgIGxldCBwcm9jZXNzb3IgPSB7XG4gICAgICAgICAgXCJ1cGxvYWRcIjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5zZW5kKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImFib3J0XCI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuYWJvcnQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGlmIChwcm9jZXNzb3JbYWN0XSkgcHJvY2Vzc29yW2FjdF0uY2FsbCh0aGlzKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgX2FsaWduUHJvZ3Jlc3NCb3guY2FsbCh0aGlzKTtcbiAgfSk7XG59O1xuY29uc3Qgb3BlblByb2dyZXNzQm94ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLiRwcm9ncmVzc0JveC5yZW1vdmVDbGFzcyhcImRlc3Ryb3lcIik7XG4gIHRoaXMuJHByb2dyZXNzVXBsb2FkLnJlbW92ZUF0dHIoXCJkaXNhYmxlZFwiKTtcbiAgdGhpcy4kcHJvZ3Jlc3NBYm9ydC5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIik7XG5cbiAgLy8gYXBlbmQgJiBhbGlnbiBwcm9ncmVzcyBib3hcbiAgYWxpZ25Qcm9ncmVzc0JveC5jYWxsKHRoaXMsIFwiYXBwZW5kXCIpO1xuXG4gIC8vIHN0YXRlIGNoYW5nZVxuICBvblN0YXRlQ2hhbmdlZC5jYWxsKHRoaXMsIHtcbiAgICBzZWxmOiB0aGlzLFxuICAgIHN0YXRlOiBcIm9wZW5cIlxuICB9KTtcbn07XG5jb25zdCBjbG9zZVByb2dyZXNzQm94ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLiRwcm9ncmVzc0JveC5hZGRDbGFzcyhcImRlc3Ryb3lcIik7XG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIHRoaXMuJHByb2dyZXNzQm94XG4gICAgICAucmVtb3ZlKCk7XG4gIH0sIHRoaXMuY29uZmlnLmFuaW1hdGVUaW1lKTtcbn07XG5jb25zdCBzdGFydFVwbG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgcHJvY2Vzc29yID0ge1xuICAgIFwiaHRtbDVcIigpIHtcbiAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgbGV0IHVwbG9hZEZpbGUgPSB0aGlzLnNlbGVjdGVkRmlsZXMuc2hpZnQoKTtcbiAgICAgIGlmICghdXBsb2FkRmlsZSkge1xuICAgICAgICAvLyDsl4XroZzrk5wg7KKF66OMXG4gICAgICAgIHVwbG9hZENvbXBsZXRlLmNhbGwodGhpcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBpZiAodXBsb2FkRmlsZVswXSkgdXBsb2FkRmlsZSA9IHVwbG9hZEZpbGVbMF07XG5cbiAgICAgIGxldCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgLy/shJzrsoTroZwg7KCE7Iah7ZW07JW8IO2VoCDstpTqsIAg7YyM652866+47YSwIOygleuztCDshKTsoJVcblxuICAgICAgdGhpcy4kdGFyZ2V0LmZpbmQoXCJpbnB1dFwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKHRoaXMubmFtZSwgdGhpcy52YWx1ZSk7XG4gICAgICB9KTtcbiAgICAgIC8vIO2MjOydvCDslYTsnbTthZwg7LaU6rCAXG4gICAgICBmb3JtRGF0YS5hcHBlbmQodGhpcy5jb25maWcuZm9ybS5maWxlTmFtZSwgdXBsb2FkRmlsZSk7XG5cbiAgICAgIHRoaXMueGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICB0aGlzLnhoci5vcGVuKFwicG9zdFwiLCB0aGlzLmNvbmZpZy5mb3JtLmFjdGlvbiwgdHJ1ZSk7XG4gICAgICB0aGlzLnhoci5vbmxvYWQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICBsZXQgcmVzID0gZS50YXJnZXQucmVzcG9uc2U7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiByZXMgPT0gXCJzdHJpbmdcIikgcmVzID0gVS5wYXJzZUpzb24ocmVzKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VsZi5jb25maWcuZGVidWcpIGNvbnNvbGUubG9nKHJlcyk7XG5cbiAgICAgICAgaWYgKHJlcy5lcnJvcikge1xuICAgICAgICAgIGlmIChzZWxmLmNvbmZpZy5kZWJ1ZykgY29uc29sZS5sb2cocmVzLmVycm9yKTtcbiAgICAgICAgICBpZiAoVS5pc0Z1bmN0aW9uKHNlbGYuY29uZmlnLm9udXBsb2FkZXJyb3IpKSB7XG4gICAgICAgICAgICBzZWxmLmNvbmZpZy5vbnVwbG9hZGVycm9yLmNhbGwoe1xuICAgICAgICAgICAgICBzZWxmOiBzZWxmLFxuICAgICAgICAgICAgICBlcnJvcjogcmVzLmVycm9yXG4gICAgICAgICAgICB9LCByZXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzZWxmLnNlbmQoKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB1cGxvYWRlZC5jYWxsKHNlbGYsIHJlcyk7XG4gICAgICAgIHNlbGYuc2VuZCgpO1xuICAgICAgfTtcbiAgICAgIHRoaXMueGhyLnVwbG9hZC5vbnByb2dyZXNzID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdXBkYXRlUHJvZ3Jlc3NCYXIuY2FsbChzZWxmLCBlKTtcbiAgICAgICAgaWYgKFUuaXNGdW5jdGlvbihzZWxmLmNvbmZpZy5vbnByb2dyZXNzKSkge1xuICAgICAgICAgIHNlbGYuY29uZmlnLm9ucHJvZ3Jlc3MuY2FsbCh7XG4gICAgICAgICAgICBsb2FkZWQ6IGUubG9hZGVkLFxuICAgICAgICAgICAgdG90YWw6IGUudG90YWxcbiAgICAgICAgICB9LCBlKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHRoaXMueGhyLnNlbmQoZm9ybURhdGEpOyAgLy8gbXVsdGlwYXJ0L2Zvcm0tZGF0YVxuXG4gICAgfSxcbiAgICBcImZvcm1cIigpIHtcblxuICAgICAgLy8vIGknbSBidXN5XG4gICAgICB0aGlzLl9fdXBsb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgLy8g7Y+86rO8IGlmcmFtZeydhCDrp4zrk6TslrQg7Y6Y7J207KeAIOyVhOuemOyXkCDsgr3snoUg7ZuEIOyXheuhnOuTnFxuICAgICAgbGV0ICRpZnJhbWUgPSBqUXVlcnkoJzxpZnJhbWUgc3JjPVwiamF2YXNjcmlwdDpmYWxzZTtcIiBuYW1lPVwiYXg1dXBsb2FkZXItJyArIHRoaXMuaW5zdGFuY2VJZCArICctaWZyYW1lXCIgc3R5bGU9XCJkaXNwbGF5Om5vbmU7XCI+PC9pZnJhbWU+Jyk7XG4gICAgICBqUXVlcnkoZG9jdW1lbnQuYm9keSkuYXBwZW5kKCRpZnJhbWUpO1xuXG4gICAgICAvLyBvbmxvYWQg7J2067Kk7Yq4IO2VuOuTpOufrFxuICAgICAgLy8gYWN0aW9u7JeQ7IScIO2MjOydvOydhCDrsJvslYQg7LKY66as7ZWcIOqysOqzvOqwkuydhCDthY3siqTtirjroZwg7Lac66Cl7ZWc64uk6rOgIOqwgOygle2VmOqzoCBpZnJhbWXsnZgg64K067aAIOuNsOydtO2EsOulvCDqsrDqs7zqsJLsnLzroZwgY2FsbGJhY2sg7Zi47LacXG4gICAgICAkaWZyYW1lLm9uKCdsb2FkJywgZSA9PiB7XG4gICAgICAgIGxldCBkb2MgPSBlLmN1cnJlbnRUYXJnZXQuY29udGVudFdpbmRvdyA/IGUuY3VycmVudFRhcmdldC5jb250ZW50V2luZG93LmRvY3VtZW50IDogKGUuY3VycmVudFRhcmdldC5jb250ZW50RG9jdW1lbnQgPyBlLmN1cnJlbnRUYXJnZXQuY29udGVudERvY3VtZW50IDogZS5jdXJyZW50VGFyZ2V0LmRvY3VtZW50KSxcbiAgICAgICAgICByb290ID0gZG9jLmRvY3VtZW50RWxlbWVudCA/IGRvYy5kb2N1bWVudEVsZW1lbnQgOiBkb2MuYm9keSxcbiAgICAgICAgICByZXN1bHQgPSByb290LnRleHRDb250ZW50ID8gcm9vdC50ZXh0Q29udGVudCA6IHJvb3QuaW5uZXJUZXh0LFxuICAgICAgICAgIHJlcztcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIHJlcyA9IEpTT04ucGFyc2UocmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgIHJlcyA9IHtcbiAgICAgICAgICAgIGVycm9yOiBcIlN5bnRheCBlcnJvclwiLFxuICAgICAgICAgICAgYm9keTogcmVzdWx0XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5kZWJ1ZykgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgaWYgKHJlcy5lcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdXBsb2FkZWQuY2FsbCh0aGlzLCByZXMpO1xuICAgICAgICAgICRpZnJhbWUucmVtb3ZlKCk7XG5cbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHVwbG9hZENvbXBsZXRlLmNhbGwodGhpcyk7XG4gICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuJGlucHV0RmlsZUZvcm1cbiAgICAgICAgLmF0dHIoXCJ0YXJnZXRcIiwgJ2F4NXVwbG9hZGVyLScgKyB0aGlzLmluc3RhbmNlSWQgKyAnLWlmcmFtZScpXG4gICAgICAgIC5hdHRyKFwiYWN0aW9uXCIsIHRoaXMuY29uZmlnLmZvcm0uYWN0aW9uKVxuICAgICAgICAuc3VibWl0KCk7XG5cbiAgICAgIHRoaXMuc2VsZWN0ZWRGaWxlc1RvdGFsID0gMTtcbiAgICAgIHVwZGF0ZVByb2dyZXNzQmFyLmNhbGwodGhpcywge1xuICAgICAgICBsb2FkZWQ6IDEsXG4gICAgICAgIHRvdGFsOiAxXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgaWYgKHRoaXMuX191cGxvYWRpbmcgPT09IGZhbHNlKSB7XG4gICAgLy8g7KCE7LK0IO2MjOydvCDsgqzsnbTspogg6rWs7ZWY6riwXG4gICAgbGV0IGZpbGVzVG90YWwgPSAwO1xuICAgIHRoaXMuc2VsZWN0ZWRGaWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChuKSB7XG4gICAgICBmaWxlc1RvdGFsICs9IG4uc2l6ZTtcbiAgICB9KTtcbiAgICB0aGlzLnNlbGVjdGVkRmlsZXNUb3RhbCA9IGZpbGVzVG90YWw7XG4gICAgdGhpcy5fX2xvYWRlZCA9IDA7XG5cbiAgICB0aGlzLl9fdXBsb2FkaW5nID0gdHJ1ZTsgLy8g7JeF66Gc65OcIOyLnOyekSDsg4Htg5wg7LKY66asXG4gICAgdGhpcy4kcHJvZ3Jlc3NVcGxvYWQuYXR0cihcImRpc2FibGVkXCIsIFwiZGlzYWJsZWRcIik7XG4gICAgdGhpcy4kcHJvZ3Jlc3NBYm9ydC5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIik7XG4gIH1cblxuICBwcm9jZXNzb3JbaW5mby5zdXBwb3J0RmlsZUFwaSA/IFwiaHRtbDVcIiA6IFwiZm9ybVwiXS5jYWxsKHRoaXMpO1xuXG59O1xuY29uc3QgdXBkYXRlUHJvZ3Jlc3NCYXIgPSBmdW5jdGlvbiAoZSkge1xuICBsZXQgcGVyY2VudCA9IFUubnVtYmVyKCh0aGlzLl9fbG9hZGVkICsgZS5sb2FkZWQpIC8gdGhpcy5zZWxlY3RlZEZpbGVzVG90YWwgKiAxMDAsIHtyb3VuZDogMn0pO1xuICB0aGlzLiRwcm9ncmVzc0Jhci5jc3Moe3dpZHRoOiBwZXJjZW50ICsgJyUnfSk7XG4gIHRoaXMuJHByb2dyZXNzQmFyVmFsLmh0bWwocGVyY2VudCArICclIENvbXBsZXRlJyk7XG4gIGlmKGUubG9hZGVkID49IGUudG90YWwpe1xuICAgIHRoaXMuX19sb2FkZWQgKz0gZS50b3RhbDtcbiAgfVxuICBpZiAoZS5sZW5ndGhDb21wdXRhYmxlKSB7XG4gICAgaWYgKGUubG9hZGVkID49IGUudG90YWwpIHtcblxuICAgIH1cbiAgfVxuICBwZXJjZW50ID0gbnVsbDtcbn07XG5jb25zdCB1cGxvYWRlZCA9IGZ1bmN0aW9uIChyZXMpIHtcbiAgaWYgKHRoaXMuY29uZmlnLmRlYnVnKSBjb25zb2xlLmxvZyhyZXMpO1xuICB0aGlzLnVwbG9hZGVkRmlsZXMucHVzaChyZXMpO1xuICByZXBhaW50VXBsb2FkZWRCb3guY2FsbCh0aGlzKTsgLy8g7JeF66Gc65Oc65CcIO2MjOydvCDstpzroKVcblxuICBpZiAoVS5pc0Z1bmN0aW9uKHRoaXMuY29uZmlnLm9udXBsb2FkZWQpKSB7XG4gICAgdGhpcy5jb25maWcub251cGxvYWRlZC5jYWxsKHtcbiAgICAgIHNlbGY6IHRoaXNcbiAgICB9LCByZXMpO1xuICB9XG59O1xuY29uc3QgdXBsb2FkQ29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuX191cGxvYWRpbmcgPSBmYWxzZTsgLy8g7JeF66Gc65OcIOyZhOujjCDsg4Htg5zsspjrpqxcbiAgdGhpcy4kcHJvZ3Jlc3NVcGxvYWQucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpO1xuICB0aGlzLiRwcm9ncmVzc0Fib3J0LmF0dHIoXCJkaXNhYmxlZFwiLCBcImRpc2FibGVkXCIpO1xuXG4gIGlmICh0aGlzLmNvbmZpZy5wcm9ncmVzc0JveCkge1xuICAgIGNsb3NlUHJvZ3Jlc3NCb3guY2FsbCh0aGlzKTtcbiAgfVxuICBpZiAoVS5pc0Z1bmN0aW9uKHRoaXMuY29uZmlnLm9udXBsb2FkQ29tcGxldGUpKSB7XG4gICAgdGhpcy5jb25maWcub251cGxvYWRDb21wbGV0ZS5jYWxsKHtcbiAgICAgIHNlbGY6IHRoaXNcbiAgICB9KTtcbiAgfVxuICAvLyB1cGRhdGUgdXBsb2FkZWRGaWxlcyBkaXNwbGF5XG5cbiAgLy8vIHJlc2V0IGlucHV0RmlsZVxuICBhdHRhY2hGaWxlVGFnLmNhbGwodGhpcyk7XG59O1xuY29uc3QgY2FuY2VsVXBsb2FkID0gZnVuY3Rpb24gKCkge1xuXG4gIGNvbnN0IHByb2Nlc3NvciA9IHtcbiAgICBcImh0bWw1XCI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLnhocikge1xuICAgICAgICB0aGlzLnhoci5hYm9ydCgpO1xuICAgICAgfVxuICAgIH0sXG4gICAgXCJmb3JtXCI6IGZ1bmN0aW9uICgpIHtcblxuICAgIH1cbiAgfTtcblxuICB0aGlzLl9fdXBsb2FkaW5nID0gZmFsc2U7IC8vIOyXheuhnOuTnCDsmYTro4wg7IOB7YOc7LKY66asXG4gIHRoaXMuJHByb2dyZXNzVXBsb2FkLnJlbW92ZUF0dHIoXCJkaXNhYmxlZFwiKTtcbiAgdGhpcy4kcHJvZ3Jlc3NBYm9ydC5hdHRyKFwiZGlzYWJsZWRcIiwgXCJkaXNhYmxlZFwiKTtcblxuICBwcm9jZXNzb3JbaW5mby5zdXBwb3J0RmlsZUFwaSA/IFwiaHRtbDVcIiA6IFwiZm9ybVwiXS5jYWxsKHRoaXMpO1xuXG4gIGlmICh0aGlzLmNvbmZpZy5wcm9ncmVzc0JveCkge1xuICAgIGNsb3NlUHJvZ3Jlc3NCb3guY2FsbCh0aGlzKTtcbiAgfVxuXG4gIC8vdGhpcy4kaW5wdXRGaWxlLnZhbChcIlwiKTtcbiAgLy8vIHJlc2V0IGlucHV0RmlsZVxuICBhdHRhY2hGaWxlVGFnLmNhbGwodGhpcyk7XG5cbiAgaWYgKHRoaXMuY29uZmlnLmRlYnVnKSBjb25zb2xlLmxvZyhcImNhbmNlbFVwbG9hZFwiKTtcbiAgLy8gdXBkYXRlIHVwbG9hZGVkRmlsZXMgZGlzcGxheVxufTtcbmNvbnN0IHJlcGFpbnRVcGxvYWRlZEJveCA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gdXBsb2FkZWRCb3gg6rCAIOyXhuuLpOuptCDslYTrrLTsnbzrj4Qg7ZWY7KeAIOyViuydjC5cbiAgLy8gb251cGxvYWRlZCDtlajsiJgg7J2067Kk7Yq466W8IOydtOyaqe2VmOyXrCDqsJzrsJzsnpDqsIAg7KeB7KCRIOyXheuhnOuTnOuUlCDrsJXsiqTrpbwg6rWs7ZiEIO2VnOuLpOqzoCDsnbTtlbQg7ZWY7J6QLlxuICBpZiAodGhpcy4kdXBsb2FkZWRCb3ggPT09IG51bGwpIHJldHVybiB0aGlzO1xuXG4gIHRoaXMuJHVwbG9hZGVkQm94Lmh0bWwoXG4gICAgbXVzdGFjaGUucmVuZGVyKHRtcGwudXBvYWRlZEJveC5jYWxsKHRoaXMsIHRoaXMuY29uZmlnLnVwbG9hZGVkQm94LmNvbHVtbktleXMpLCB7XG4gICAgICBcIkBmbl9nZXRfYnl0ZVwiKCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHRleHQsIHJlbmRlcikge1xuICAgICAgICAgIHJldHVybiBVLm51bWJlcihyZW5kZXIodGV4dCksIHtyb3VuZDogMiwgYnl0ZTogdHJ1ZX0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdXBsb2FkZWRGaWxlczogdGhpcy51cGxvYWRlZEZpbGVzLFxuICAgICAgaWNvbjogdGhpcy5jb25maWcudXBsb2FkZWRCb3guaWNvbixcbiAgICAgIGxhbmc6IHRoaXMuY29uZmlnLnVwbG9hZGVkQm94LmxhbmcsXG4gICAgICBzdXBwb3J0RmlsZUFwaTogISFpbmZvLnN1cHBvcnRGaWxlQXBpXG4gICAgfSlcbiAgKTtcbiAgdGhpcy4kdXBsb2FkZWRCb3guZmluZChcImltZ1wiKS5vbihcImVycm9yXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAvL3RoaXMuc3JjID0gXCJcIjtcbiAgICAkKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKFwibm8taW1hZ2VcIik7XG4gIH0pO1xuXG59O1xuY29uc3QgYXR0YWNoRmlsZVRhZyA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuJGlucHV0RmlsZSAmJiB0aGlzLiRpbnB1dEZpbGUuZ2V0KDApKSB7XG4gICAgdGhpcy4kaW5wdXRGaWxlLnJlbW92ZSgpO1xuICB9XG4gIGlmICh0aGlzLiRpbnB1dEZpbGVGb3JtICYmIHRoaXMuJGlucHV0RmlsZUZvcm0uZ2V0KDApKSB7XG4gICAgdGhpcy4kaW5wdXRGaWxlRm9ybS5yZW1vdmUoKTtcbiAgfVxuXG4gIHRoaXMuJGlucHV0RmlsZSA9IGpRdWVyeShcbiAgICBtdXN0YWNoZS5yZW5kZXIodG1wbC5pbnB1dEZpbGUuY2FsbCh0aGlzKSwge1xuICAgICAgaW5zdGFuY2VJZDogdGhpcy5pbnN0YW5jZUlkLFxuICAgICAgbXVsdGlwbGU6IHRoaXMuY29uZmlnLm11bHRpcGxlLFxuICAgICAgYWNjZXB0OiB0aGlzLmNvbmZpZy5hY2NlcHQsXG4gICAgICBuYW1lOiB0aGlzLmNvbmZpZy5mb3JtLmZpbGVOYW1lXG4gICAgfSlcbiAgKTtcblxuICBpZiAoaW5mby5zdXBwb3J0RmlsZUFwaSkge1xuICAgIGpRdWVyeShkb2N1bWVudC5ib2R5KS5hcHBlbmQodGhpcy4kaW5wdXRGaWxlKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLiRmaWxlU2VsZWN0b3IuYXR0cihcInRhYmluZGV4XCIsIC0xKTtcbiAgICB0aGlzLiRpbnB1dEZpbGVGb3JtID0galF1ZXJ5KFxuICAgICAgbXVzdGFjaGUucmVuZGVyKHRtcGwuaW5wdXRGaWxlRm9ybS5jYWxsKHRoaXMpLCB7XG4gICAgICAgIGluc3RhbmNlSWQ6IHRoaXMuaW5zdGFuY2VJZFxuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy4kaW5wdXRGaWxlRm9ybS5hcHBlbmQodGhpcy4kaW5wdXRGaWxlKTtcbiAgICBqUXVlcnkoZG9jdW1lbnQuYm9keSkuYXBwZW5kKHRoaXMuJGlucHV0RmlsZUZvcm0pO1xuICB9XG5cbiAgdGhpcy4kaW5wdXRGaWxlXG4gICAgLm9mZihcImNoYW5nZS5heDV1cGxvYWRlclwiKVxuICAgIC5vbihcImNoYW5nZS5heDV1cGxvYWRlclwiLCBlID0+IHtcbiAgICAgIG9uU2VsZWN0RmlsZS5jYWxsKHRoaXMsIGUpO1xuICAgIH0pO1xufTtcbi8qIH5+fn5+fn5+fn5+fn5+fn5+fiBlbmQgb2YgcHJpdmF0ZSAgfn5+fn5+fn5+fn5+fn5+fn5+fn4gKi9cblxuLyoqXG4gKiBAY2xhc3NcbiAqL1xuY2xhc3MgQVg2VUlVcGxvYWRlciBleHRlbmRzIEFYNlVJQ29yZSB7XG4gIC8qKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIGNvbmZpZ1xuICAgKi9cbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIC8qKlxuICAgICAqIEBtZW1iZXIge0pTT059XG4gICAgICogQHBhcmFtIGNvbmZpZ1xuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gY29uZmlnLnRhcmdldFxuICAgICAqIEBwYXJhbSBbY29uZmlnLnRoZW1lPSdkZWZhdWx0J11cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5sYW5nXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmxhbmcudXBsb2FkPSdVcGxvYWQnXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLmxhbmcuYWJvcnQ9J0Fib3J0J11cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5hbmltYXRlVGltZT0xMDBdXG4gICAgICogQHBhcmFtIFtjb25maWcuYWNjZXB0PVwiKlxcLypcIl1cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5tdWx0aXBsZT1mYWxzZV1cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5tYW51YWxVcGxvYWQ9ZmFsc2VdXG4gICAgICogQHBhcmFtIFtjb25maWcucHJvZ3Jlc3NCb3g9dHJ1ZV1cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5wcm9ncmVzc0JveERpcmVjdGlvbj0nbGVmdCddIC0gdG9wLCBib3R0b20sIGxlZnQsIHJpZ2h0LCBhdXRvXG4gICAgICogQHBhcmFtIFtjb25maWcuZm9ybV1cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5mb3JtLmFjdGlvbj0nJ11cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5mb3JtLmZpbGVOYW1lPSdmaWxlJ11cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy5kcm9wWm9uZV1cbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IFtjb25maWcuZHJvcFpvbmUudGFyZ2V0XVxuICAgICAqIEBwYXJhbSBbY29uZmlnLnVwbG9hZGVkQm94XVxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gW2NvbmZpZy51cGxvYWRlZEJveC50YXJnZXRdXG4gICAgICogQHBhcmFtIFtjb25maWcudXBsb2FkZWRCb3guaWNvbl1cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy51cGxvYWRlZEJveC5pY29uLmRvd25sb2FkPSdVKzI5MTMnXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLnVwbG9hZGVkQm94Lmljb24uZGVsZXRlPSdVKzIzMmInXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLnVwbG9hZGVkQm94LmNvbHVtbktleXMubmFtZT0nbmFtZSddXG4gICAgICogQHBhcmFtIFtjb25maWcudXBsb2FkZWRCb3guY29sdW1uS2V5cy50eXBlPSd0eXBlJ11cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy51cGxvYWRlZEJveC5jb2x1bW5LZXlzLnNpemU9J3NpemUnXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLnVwbG9hZGVkQm94LmNvbHVtbktleXMudXBsb2FkZWROYW1lPSd1cGxvYWRlZE5hbWUnXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLnVwbG9hZGVkQm94LmNvbHVtbktleXMudXBsb2FkZWRQYXRoPSd1cGxvYWRlZFBhdGgnXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLnVwbG9hZGVkQm94LmNvbHVtbktleXMuZG93bmxvYWRQYXRoPSdkb3dubG9hZFBhdGgnXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLnVwbG9hZGVkQm94LmNvbHVtbktleXMucHJldmlld1BhdGg9J3ByZXZpZXdQYXRoJ11cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy51cGxvYWRlZEJveC5jb2x1bW5LZXlzLnRodW1ibmFpbD0ndGh1bWJuYWlsJ11cbiAgICAgKiBAcGFyYW0gW2NvbmZpZy51cGxvYWRlZEJveC5sYW5nXVxuICAgICAqIEBwYXJhbSBbY29uZmlnLnVwbG9hZGVkQm94Lmxhbmcuc3VwcG9ydGVkSFRNTDVfZW1wdHlMaXN0TXNnPSdEcm9wIGZpbGVzIGhlcmUgb3IgY2xpY2sgdG8gdXBsb2FkLiddXG4gICAgICogQHBhcmFtIFtjb25maWcudXBsb2FkZWRCb3gubGFuZy5lbXB0eUxpc3RNc2c9J0VtcHR5IG9mIExpc3QuJ11cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY29uZmlnLnVwbG9hZGVkQm94Lm9uY2hhbmdlXVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjb25maWcudXBsb2FkZWRCb3gub25jbGlja11cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY29uZmlnLm9ucHJvZ3Jlc3NdXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NvbmZpZy5vbnVwbG9hZGVycm9yXVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjb25maWcub251cGxvYWRlZF1cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY29uZmlnLm9udXBsb2FkQ29tcGxldGVdXG4gICAgICovXG4gICAgdGhpcy5jb25maWcgPSB7XG4gICAgICB0aGVtZTogJ2RlZmF1bHQnLCAvLyB0aGVtZSBvZiB1cGxvYWRlclxuICAgICAgbGFuZzogeyAvLyDsl4XroZzrjZQg67KE7Yq8IOuereq3gOyngCDshKTsoJVcbiAgICAgICAgXCJ1cGxvYWRcIjogXCJVcGxvYWRcIixcbiAgICAgICAgXCJhYm9ydFwiOiBcIkFib3J0XCJcbiAgICAgIH0sXG4gICAgICBhbmltYXRlVGltZTogMTAwLFxuICAgICAgYWNjZXB0OiBcIiovKlwiLCAvLyDsl4XroZzrk5wg7ISg7YOdIO2MjOydvCDtg4DsnoUg7ISk7KCVXG4gICAgICBtdWx0aXBsZTogZmFsc2UsIC8vIOuLpOykkSDtjIzsnbwg7JeF66Gc65OcXG4gICAgICBtYW51YWxVcGxvYWQ6IGZhbHNlLCAvLyDsl4XroZzrlKkg7Iuc7J6RIOyImOuPmeyymOumrCDsl6zrtoBcbiAgICAgIHByb2dyZXNzQm94OiB0cnVlLCAvLyDsl4XroZzrk5wg7ZSE66Gc6re4656Y7IqkIOuwleyKpCDsgqzsmqnsl6zrtoAgZmFsc2Ug7J2066m0IOyXheuhnOuTnCDsp4TtlonrsJTrpbwg7ZGc7IucIO2VmOyngCDslYrsirXri4jri6QuIOqwnOuwnOyekOqwgCBvbnByb2dyZXNzIO2VqOyImOulvCDsnbTsmqntlZjsl6wg7KeB7KCRIOq1rO2YhCDtlbTslbwg7ZWp64uI64ukLlxuICAgICAgcHJvZ3Jlc3NCb3hEaXJlY3Rpb246IFwibGVmdFwiLFxuICAgICAgZm9ybToge1xuICAgICAgICBhY3Rpb246IFwiXCIsXG4gICAgICAgIGZpbGVOYW1lOiBcImZpbGVcIlxuICAgICAgfSxcbiAgICAgIGRyb3Bab25lOiB7XG4gICAgICAgIHRhcmdldDogbnVsbFxuICAgICAgfSxcbiAgICAgIHVwbG9hZGVkQm94OiB7XG4gICAgICAgIHRhcmdldDogbnVsbCxcbiAgICAgICAgaWNvbjoge1xuICAgICAgICAgIGRvd25sb2FkOiBcIlUrMjkxM1wiLFxuICAgICAgICAgIGRlbGV0ZTogXCJVKzIzMmJcIlxuICAgICAgICB9LFxuICAgICAgICBjb2x1bW5LZXlzOiB7XG4gICAgICAgICAgbmFtZTogXCJuYW1lXCIsXG4gICAgICAgICAgdHlwZTogXCJ0eXBlXCIsXG4gICAgICAgICAgc2l6ZTogXCJzaXplXCIsXG4gICAgICAgICAgdXBsb2FkZWROYW1lOiBcInVwbG9hZGVkTmFtZVwiLFxuICAgICAgICAgIHVwbG9hZGVkUGF0aDogXCJ1cGxvYWRlZFBhdGhcIixcbiAgICAgICAgICBkb3dubG9hZFBhdGg6IFwiZG93bmxvYWRQYXRoXCIsXG4gICAgICAgICAgcHJldmlld1BhdGg6IFwicHJldmlld1BhdGhcIixcbiAgICAgICAgICB0aHVtYm5haWw6IFwidGh1bWJuYWlsXCJcbiAgICAgICAgfSxcbiAgICAgICAgbGFuZzoge1xuICAgICAgICAgIHN1cHBvcnRlZEhUTUw1X2VtcHR5TGlzdE1zZzogJ0Ryb3AgZmlsZXMgaGVyZSBvciBjbGljayB0byB1cGxvYWQuJyxcbiAgICAgICAgICBlbXB0eUxpc3RNc2c6ICdFbXB0eSBvZiBMaXN0LidcbiAgICAgICAgfSxcbiAgICAgICAgb25jaGFuZ2U6IG51bGwsXG4gICAgICAgIG9uY2xpY2s6IG51bGxcbiAgICAgIH0sXG4gICAgICB2YWxpZGF0ZVNlbGVjdGVkRmlsZXM6IG51bGwsXG4gICAgICBvbnByb2dyZXNzOiBudWxsLFxuICAgICAgb251cGxvYWRlcnJvcjogbnVsbCxcbiAgICAgIG9udXBsb2FkZWQ6IG51bGwsXG4gICAgICBvbnVwbG9hZENvbXBsZXRlOiBudWxsXG4gICAgfTtcbiAgICBqUXVlcnkuZXh0ZW5kKHRydWUsIHRoaXMuY29uZmlnLCBjb25maWcpO1xuXG4gICAgLy8g66mk67KEIOuzgOyImCDstIjquLDtmZRcbiAgICAvKipcbiAgICAgKiDrsoTtirzsho3shLFcbiAgICAgKiBAbWVtYmVyIHtKU09OfVxuICAgICAqL1xuICAgIHRoaXMuZGVmYXVsdEJ0bnMgPSB7XG4gICAgICBcInVwbG9hZFwiOiB7bGFiZWw6IHRoaXMuY29uZmlnLmxhbmdbXCJ1cGxvYWRcIl0sIHRoZW1lOiBcInVwbG9hZFwifSxcbiAgICAgIFwiYWJvcnRcIjoge2xhYmVsOiB0aGlzLmNvbmZpZy5sYW5nW1wiYWJvcnRcIl0sIHRoZW1lOiBcImFib3J0XCJ9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIOyXheuhnOuTnOuQnCDtjIzsnbxcbiAgICAgKiBAbWVtYmVyIHtBcnJheX1cbiAgICAgKi9cbiAgICB0aGlzLnVwbG9hZGVkRmlsZXMgPSBbXTtcblxuICAgIC8qKlxuICAgICAqIOyXheuhnOuNlCDtg4Dqsp9cbiAgICAgKiBAbWVtYmVyIHtqUXVlcnl9XG4gICAgICovXG4gICAgdGhpcy4kdGFyZ2V0ID0gbnVsbDtcbiAgICAgXG4gICAgLyoqXG4gICAgICogaW5wdXQgZmlsZSDtg5zqt7hcbiAgICAgKiBAbWVtYmVyIHtqUXVlcnl9XG4gICAgICovXG4gICAgdGhpcy4kaW5wdXRGaWxlID0gbnVsbDtcbiAgICAvKipcbiAgICAgKiBpbnB1dCBmb3JtXG4gICAgICogQG1lbWJlciB7alF1ZXJ5fVxuICAgICAqL1xuICAgIHRoaXMuJGlucHV0RmlsZUZvcm0gPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICog7YyM7J28IOyEoO2DnSDrsoTtirxcbiAgICAgKiBAbWVtYmVyIHtqUXVlcnl9XG4gICAgICovXG4gICAgdGhpcy4kZmlsZVNlbGVjdG9yID0gbnVsbDtcbiAgICBcbiAgICAvKipcbiAgICAgKiDtjIzsnbwg65Oc656N7KG0XG4gICAgICogQG1lbWJlciB7alF1ZXJ5fVxuICAgICAqL1xuICAgIHRoaXMuJGRyb3Bab25lID0gbnVsbDtcbiBcbiAgICAvKipcbiAgICAgKiDtjIzsnbwg66qp66GdIO2RnOyLnOuwleyKpFxuICAgICAqIEBtZW1iZXIge2pRdWVyeX1cbiAgICAgKi9cbiAgICB0aGlzLiR1cGxvYWRlZEJveCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiDsl4XroZzrk5wg7KeE7ZaJIOyDge2DnOuwlFxuICAgICAqIEBtZW1iZXIge0Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5fX3VwbG9hZGluZyA9IGZhbHNlO1xuICAgIFxuICAgIC8qKlxuICAgICAqIOyEoO2DneuQnCDtjIzsnbzrk6RcbiAgICAgKiBAbWVtYmVyIHtBcnJheX1cbiAgICAgKi9cbiAgICB0aGlzLnNlbGVjdGVkRmlsZXMgPSBbXTtcblxuICAgIC8qKlxuICAgICAqIOyEoO2DneuQnCDtjIzsnbzsnZgg7KCE7LK0IO2BrOq4sFxuICAgICAqIEBtZW1iZXIge051bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLnNlbGVjdGVkRmlsZXNUb3RhbCA9IDA7XG5cbiAgICAvKipcbiAgICAgKiDsoITshqHrkJwg7YyM7J28IO2BrOq4sFxuICAgICAqIEBtZW1iZXIge051bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLl9fbG9hZGVkID0gMDtcblxuICAgIGlmICh0eXBlb2YgY29uZmlnICE9PSBcInVuZGVmaW5lZFwiKSB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqL1xuICBpbml0KCkge1xuICAgIHRoaXMub25TdGF0ZUNoYW5nZWQgPSB0aGlzLmNvbmZpZy5vblN0YXRlQ2hhbmdlZDtcbiAgICBkZWxldGUgdGhpcy5jb25maWcub25TdGF0ZUNoYW5nZWQ7XG5cbiAgICBpZiAodGhpcy5jb25maWcudGFyZ2V0KSB7XG4gICAgICB0aGlzLiR0YXJnZXQgPSBqUXVlcnkodGhpcy5jb25maWcudGFyZ2V0KTtcblxuICAgICAgLy8g7YyM7J28IOuTnOuejeyhtOydgCDsmLXshZgg7IKs7ZWtLlxuICAgICAgaWYgKHRoaXMuY29uZmlnLmRyb3Bab25lICYmIHRoaXMuY29uZmlnLmRyb3Bab25lLnRhcmdldCAmJiBpbmZvLnN1cHBvcnRGaWxlQXBpKSB7XG4gICAgICAgIHRoaXMuJGRyb3Bab25lID0galF1ZXJ5KHRoaXMuY29uZmlnLmRyb3Bab25lLnRhcmdldCk7XG4gICAgICAgIHRoaXMuJGRyb3Bab25lXG4gICAgICAgICAgLmF0dHIoXCJkYXRhLWF4NnVpLXVwbG9hZGVyLWRyb3B6b25lXCIsIHRoaXMuaW5zdGFuY2VJZCk7XG4gICAgICB9XG5cbiAgICAgIC8vIHVwbG9hZGVkQm94IOyYteyFmCDsgqztla1cbiAgICAgIGlmICh0aGlzLmNvbmZpZy51cGxvYWRlZEJveCAmJiB0aGlzLmNvbmZpZy51cGxvYWRlZEJveC50YXJnZXQpIHtcbiAgICAgICAgdGhpcy4kdXBsb2FkZWRCb3ggPSBqUXVlcnkodGhpcy5jb25maWcudXBsb2FkZWRCb3gudGFyZ2V0KTtcbiAgICAgIH1cblxuICAgICAgLy8gdGFyZ2V0IGF0dHJpYnV0ZSBkYXRhXG4gICAgICAoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgaWYgKFUuaXNPYmplY3QoZGF0YSkgJiYgIWRhdGEuZXJyb3IpIHtcbiAgICAgICAgICB0aGlzLmNvbmZpZyA9IGpRdWVyeS5leHRlbmQodHJ1ZSwge30sIHRoaXMuY29uZmlnLCBkYXRhKTtcbiAgICAgICAgfVxuICAgICAgfSkuY2FsbCh0aGlzLCBVLnBhcnNlSnNvbih0aGlzLiR0YXJnZXQuYXR0cihcImRhdGEtYXg2dWktdXBsb2FkZXItY29uZmlnXCIpLCB0cnVlKSk7XG5cblxuICAgICAgLy8gZGV0ZWN0IGVsZW1lbnRcbiAgICAgIC8vLyBmaWxlU2VsZWN0b3Ig7IiY7KeRXG4gICAgICB0aGlzLiRmaWxlU2VsZWN0b3IgPSB0aGlzLiR0YXJnZXQuZmluZCgnW2RhdGEtYXg2dWktdXBsb2FkZXItYnV0dG9uPVwic2VsZWN0b3JcIl0nKTtcbiAgICAgIGlmICh0aGlzLiRmaWxlU2VsZWN0b3IubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGluZm8uZ2V0RXJyb3IoXCJheDZ1aS11cGxvYWRlclwiLCBcIjQwMlwiLCBcImNhbiBub3QgZmluZCBmaWxlIHNlbGVjdG9yXCIpKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIC8vIGlucHV0IGZpbGUg7LaU6rCAXG4gICAgICBhdHRhY2hGaWxlVGFnLmNhbGwodGhpcyk7XG5cbiAgICAgIC8vIGJ0bnMg7ZmV7J24XG4gICAgICB0aGlzLmNvbmZpZy5idG5zID0galF1ZXJ5LmV4dGVuZCh7fSwgdGhpcy5kZWZhdWx0QnRucywgdGhpcy5jb25maWcuYnRucyk7XG5cbiAgICAgIHRoaXMuJHByb2dyZXNzQm94ID0galF1ZXJ5KFxuICAgICAgICBtdXN0YWNoZS5yZW5kZXIodG1wbC5wcm9ncmVzc0JveC5jYWxsKHRoaXMpLCB7XG4gICAgICAgICAgaW5zdGFuY2VJZDogdGhpcy5pbnN0YW5jZUlkLFxuICAgICAgICAgIGJ0bnM6IHRoaXMuY29uZmlnLmJ0bnNcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgICB0aGlzLiRwcm9ncmVzc0JhciA9IHRoaXMuJHByb2dyZXNzQm94LmZpbmQoJ1tyb2xlPVwicHJvZ3Jlc3NiYXJcIl0nKTtcbiAgICAgIHRoaXMuJHByb2dyZXNzQmFyVmFsID0gdGhpcy4kcHJvZ3Jlc3NCb3guZmluZCgnW3JvbGU9XCJwcm9ncmVzc2JhcnZhbFwiXScpO1xuICAgICAgdGhpcy4kcHJvZ3Jlc3NCb3hBcnJvdyA9IHRoaXMuJHByb2dyZXNzQm94LmZpbmQoXCIuYXgtcHJvZ3Jlc3Nib3gtYXJyb3dcIik7XG4gICAgICB0aGlzLiRwcm9ncmVzc1VwbG9hZCA9IHRoaXMuJHByb2dyZXNzQm94LmZpbmQoJ1tkYXRhLXByZWdyZXNzYm94LWJ0bj1cInVwbG9hZFwiXScpO1xuICAgICAgdGhpcy4kcHJvZ3Jlc3NBYm9ydCA9IHRoaXMuJHByb2dyZXNzQm94LmZpbmQoJ1tkYXRhLXByZWdyZXNzYm94LWJ0bj1cImFib3J0XCJdJyk7XG5cbiAgICAgIC8vIGZpbGUgQVBJ6rCAIOyngOybkOuQmOyngCDslYrripQg67iM65287Jqw7KCA64qUIOykkeyngCDquLDriqUg7KCc6rO1IOuqu+2VqC5cbiAgICAgIGlmICghaW5mby5zdXBwb3J0RmlsZUFwaSkge1xuICAgICAgICB0aGlzLiRwcm9ncmVzc0Fib3J0LmNzcyh7ZGlzcGxheTpcIm5vbmVcIn0pO1xuICAgICAgfVxuXG4gICAgICAvLyDtjIzsnbzrsoTtirwg65Ox7JeQIOydtOuypO2KuCDsl7DqsrAuXG4gICAgICBiaW5kRXZlbnQuY2FsbCh0aGlzKTtcbiAgICAgIHJlcGFpbnRVcGxvYWRlZEJveC5jYWxsKHRoaXMpO1xuICAgIH1cblxuICAgIC8vIGluaXQg7Zi47LacIOyXrOu2gFxuICAgIHRoaXMuaW5pdE9uY2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqL1xuICBpbml0T25jZSgpIHtcbiAgICBpZiAodGhpcy5pbml0aWFsaXplZCkgcmV0dXJuIHRoaXM7XG4gICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBAbWV0aG9kXG4gICAqIEByZXR1cm5zIHtBWDZVSVVwbG9hZGVyfVxuICAgKi9cbiAgc2VuZCgpIHtcbiAgICAvLyDsl4XroZzrk5wg7Iuc7J6RXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRGaWxlcy5sZW5ndGggJiYgVS5pc0Z1bmN0aW9uKHRoaXMuY29uZmlnLnZhbGlkYXRlU2VsZWN0ZWRGaWxlcykpIHtcbiAgICAgIGxldCB0aGF0ID0ge1xuICAgICAgICBzZWxmOiB0aGlzLFxuICAgICAgICB1cGxvYWRlZEZpbGVzOiB0aGlzLnVwbG9hZGVkRmlsZXMsXG4gICAgICAgIHNlbGVjdGVkRmlsZXM6IHRoaXMuc2VsZWN0ZWRGaWxlc1xuICAgICAgfTtcbiAgICAgIGlmICghdGhpcy5jb25maWcudmFsaWRhdGVTZWxlY3RlZEZpbGVzLmNhbGwodGhhdCwgdGhhdCkpIHtcbiAgICAgICAgY2FuY2VsVXBsb2FkLmNhbGwodGhpcyk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgLy8g7KCE7Iah7LKY66asIOyViO2VqC5cbiAgICAgIH1cbiAgICB9XG5cbiAgICBzdGFydFVwbG9hZC5jYWxsKHRoaXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQHJldHVybnMge0FYNlVJVXBsb2FkZXJ9XG4gICAqL1xuICBhYm9ydCgpIHtcbiAgICBpZiAoIWluZm8uc3VwcG9ydEZpbGVBcGkpIHtcbiAgICAgIGFsZXJ0KFwiVGhpcyBicm93c2VyIG5vdCBzdXBwb3J0ZWQgYWJvcnQgbWV0aG9kXCIpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGNhbmNlbFVwbG9hZC5jYWxsKHRoaXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBtZXRob2RcbiAgICogQHBhcmFtIHtBcnJheX0gX2ZpbGVzIC0gSlNPTiBmb3JtYXR0aW5nIGNhbiBhbGwgYmUgb3ZlcnJpZGRlbiBpbiBjb2x1bW5LZXlzLlxuICAgKiBAcmV0dXJucyB7QVg2VUlVcGxvYWRlcn1cbiAgICogQGV4YW1wbGVcbiAgICogYGBganNcbiAgICogJC5hamF4KHtcbiAgICogICAgIHVybDogXCJhcGkvZmlsZUxpc3RMb2FkLnBocFwiLFxuICAgKiAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgKiAgICAgICAgIC8vIHJlcyBKU09OIGZvcm1hdFxuICAgKiAgICAgICAgIC8vIFt7XG4gICAqICAgICAgICAgLy8gXCJuYW1lXCI6IFwiYmFyY29kZS1zY2FuLWFuaS5naWZcIixcbiAgICogICAgICAgICAvLyBcInNhdmVOYW1lXCI6IFwiYmFyY29kZS1zY2FuLWFuaS5naWZcIixcbiAgICogICAgICAgICAvLyBcInR5cGVcIjogXCJmaWxlXCIsXG4gICAqICAgICAgICAgLy8gXCJmaWxlU2l6ZVwiOiBcIjM4OTE2NjRcIixcbiAgICogICAgICAgICAvLyBcInVwbG9hZGVkUGF0aFwiOiBcIi9heDV1aS11cGxvYWRlci90ZXN0L2FwaS9maWxlc1wiLFxuICAgKiAgICAgICAgIC8vIFwidGh1bWJVcmxcIjogXCJcIlxuICAgKiAgICAgICAgIC8vIH1dXG4gICAqICAgICAgICAgdXBsb2FkLnNldFVwbG9hZGVkRmlsZXMocmVzKTtcbiAgICogICAgIH1cbiAgICogfSk7XG4gICAqIGBgYFxuICAgKi9cbiAgc2V0VXBsb2FkZWRGaWxlcyhfZmlsZXMpIHtcbiAgICBpZiAoVS5pc0FycmF5KF9maWxlcykpIHtcbiAgICAgIHRoaXMudXBsb2FkZWRGaWxlcyA9IF9maWxlcztcbiAgICB9XG4gICAgaWYgKFUuaXNTdHJpbmcoX2ZpbGVzKSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy51cGxvYWRlZEZpbGVzID0gSlNPTi5wYXJzZShfZmlsZXMpO1xuICAgICAgfVxuICAgICAgY2F0Y2ggKGUpIHtcblxuICAgICAgfVxuICAgIH1cblxuICAgIHJlcGFpbnRVcGxvYWRlZEJveC5jYWxsKHRoaXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIGNsZWFyIHVwbG9hZGVkRmlsZXNcbiAgICogQG1ldGhvZFxuICAgKiBAcmV0dXJucyB7QVg2VUlVcGxvYWRlcn1cbiAgICovXG4gIGNsZWFyKCkge1xuICAgIHRoaXMuc2V0VXBsb2FkZWRGaWxlcyhbXSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgb2JqZWN0IGNvcnJlc3BvbmRpbmcgdG8gdGhlIGluZGV4IHBhc3NlZCB0byB0aGUgYXJndW1lbnQgZnJvbSB1cGxvYWRlZEZpbGVzLlxuICAgKiBAbWV0aG9kXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBfaW5kZXhcbiAgICogQHJldHVybnMge0FYNlVJVXBsb2FkZXJ9XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqIC8vIFRoZSBhY3R1YWwgZmlsZSBpcyBub3QgZGVsZXRlZFxuICAgKiB1cGxvYWQucmVtb3ZlRmlsZShmaWxlSW5kZXgpO1xuICAgKiBgYGBcbiAgICovXG4gIHJlbW92ZUZpbGUoX2luZGV4KSB7XG4gICAgaWYgKCFpc05hTihOdW1iZXIoX2luZGV4KSkpIHtcbiAgICAgIHRoaXMudXBsb2FkZWRGaWxlcy5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICB9XG4gICAgcmVwYWludFVwbG9hZGVkQm94LmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogRW1wdHkgdXBsb2FkZWRGaWxlc1xuICAgKiBAbWV0aG9kXG4gICAqIEByZXR1cm5zIHtBWDZVSVVwbG9hZGVyfVxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBqc1xuICAgKlxuICAgKiBgYGBcbiAgICovXG4gIHJlbW92ZUZpbGVBbGwoKSB7XG4gICAgdGhpcy51cGxvYWRlZEZpbGVzID0gW107XG4gICAgcmVwYWludFVwbG9hZGVkQm94LmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQG1ldGhvZFxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICovXG4gIHNlbGVjdEZpbGUoKSB7XG4gICAgaWYgKGluZm8uc3VwcG9ydEZpbGVBcGkpIHtcbiAgICAgIHRoaXMuJGlucHV0RmlsZS50cmlnZ2VyKFwiY2xpY2tcIik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFYNlVJVXBsb2FkZXI7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL3NyYy9BWDZVSVVwbG9hZGVyLmpzIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL3NhbXBsZXMvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3N0eWxlLnNjc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge31cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGUuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vc2FtcGxlcy9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGUuc2Nzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vc3JjL0FYNlVJVXBsb2FkZXIvc3R5bGUuc2Nzc1xuLy8gbW9kdWxlIGlkID0gMTA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9zYW1wbGVzL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh1bmRlZmluZWQpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiQC13ZWJraXQta2V5ZnJhbWVzIGF4LXByb2dyZXNzYm94IHtcXG4gIDAlIHtcXG4gICAgb3BhY2l0eTogMC4wO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMCk7IH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAxLjA7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxKTsgfSB9XFxuXFxuQC1tb3ota2V5ZnJhbWVzIGF4LXByb2dyZXNzYm94IHtcXG4gIDAlIHtcXG4gICAgb3BhY2l0eTogMC4wO1xcbiAgICAtbW96LXRyYW5zZm9ybTogc2NhbGUoMCk7IH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAxLjA7XFxuICAgIC1tb3otdHJhbnNmb3JtOiBzY2FsZSgxKTsgfSB9XFxuXFxuQGtleWZyYW1lcyBheC1wcm9ncmVzc2JveCB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDAuMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDApO1xcbiAgICAtbW96LXRyYW5zZm9ybTogc2NhbGUoMCk7XFxuICAgIC1tcy10cmFuc2Zvcm06IHNjYWxlKDApO1xcbiAgICAtby10cmFuc2Zvcm06IHNjYWxlKDApO1xcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDApOyB9XFxuICAxMDAlIHtcXG4gICAgb3BhY2l0eTogMS4wO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICAgIC1tb3otdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgLW1zLXRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICAgIC1vLXRyYW5zZm9ybTogc2NhbGUoMSk7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7IH0gfVxcblxcbkAtd2Via2l0LWtleWZyYW1lcyBwcm9ncmVzcy1iYXItc3RyaXBlcyB7XFxuICBmcm9tIHtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogNDBweCAwOyB9XFxuICB0byB7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMDsgfSB9XFxuXFxuQC1tb3ota2V5ZnJhbWVzIHByb2dyZXNzLWJhci1zdHJpcGVzIHtcXG4gIGZyb20ge1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiA0MHB4IDA7IH1cXG4gIHRvIHtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIHByb2dyZXNzLWJhci1zdHJpcGVzIHtcXG4gIGZyb20ge1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiA0MHB4IDA7IH1cXG4gIHRvIHtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwOyB9IH1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgYXgtcHJvZ3Jlc3Nib3gge1xcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAwLjA7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwKTsgfVxcbiAgMTAwJSB7XFxuICAgIG9wYWNpdHk6IDEuMDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEpOyB9IH1cXG5cXG5ALW1vei1rZXlmcmFtZXMgYXgtcHJvZ3Jlc3Nib3gge1xcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAwLjA7XFxuICAgIC1tb3otdHJhbnNmb3JtOiBzY2FsZSgwKTsgfVxcbiAgMTAwJSB7XFxuICAgIG9wYWNpdHk6IDEuMDtcXG4gICAgLW1vei10cmFuc2Zvcm06IHNjYWxlKDEpOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIGF4LXByb2dyZXNzYm94IHtcXG4gIDAlIHtcXG4gICAgb3BhY2l0eTogMC4wO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMCk7XFxuICAgIC1tb3otdHJhbnNmb3JtOiBzY2FsZSgwKTtcXG4gICAgLW1zLXRyYW5zZm9ybTogc2NhbGUoMCk7XFxuICAgIC1vLXRyYW5zZm9ybTogc2NhbGUoMCk7XFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7IH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAxLjA7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgLW1vei10cmFuc2Zvcm06IHNjYWxlKDEpO1xcbiAgICAtbXMtdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgLW8tdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxKTsgfSB9XFxuXFxuW2RhdGEtYXg2dWktdXBsb2FkZXJdIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG4gIFtkYXRhLWF4NnVpLXVwbG9hZGVyXSAqLFxcbiAgW2RhdGEtYXg2dWktdXBsb2FkZXJdICo6YmVmb3JlLFxcbiAgW2RhdGEtYXg2dWktdXBsb2FkZXJdICo6YWZ0ZXIge1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94OyB9XFxuICBbZGF0YS1heDZ1aS11cGxvYWRlcl0gW2RhdGEtYXg2dWktdXBsb2FkZXItYnV0dG9uPVxcXCJzZWxlY3RvclxcXCJdIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuICBbZGF0YS1heDZ1aS11cGxvYWRlcl0gW2RhdGEtYXg2dWktdXBsb2FkZXItZHJvcHpvbmVdIHtcXG4gICAgYmFja2dyb3VuZDogI2YzZjNmMztcXG4gICAgYm9yZGVyOiAycHggZGFzaGVkICMwMDg3Rjc7XFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gICAgbWFyZ2luOiAxMHB4IDA7XFxuICAgIHBhZGRpbmc6IDdweDtcXG4gICAgY3Vyc29yOiBwb2ludGVyOyB9XFxuICAgIFtkYXRhLWF4NnVpLXVwbG9hZGVyXSBbZGF0YS1heDZ1aS11cGxvYWRlci1kcm9wem9uZV0uZHJhZ292ZXIge1xcbiAgICAgIGJhY2tncm91bmQ6ICNmZmY7XFxuICAgICAgYm9yZGVyOiAycHggc29saWQgIzAwODdGNztcXG4gICAgICBvcGFjaXR5OiAwLjY7IH1cXG5cXG5bZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3hdIHtcXG4gIGJhY2tncm91bmQ6ICNmM2YzZjM7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgbWFyZ2luOiAxMHB4IDA7XFxuICBwYWRkaW5nOiA3cHg7XFxuICBtaW4taGVpZ2h0OiAxMDBweDsgfVxcbiAgW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94XVtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveF0ge1xcbiAgICBtYXJnaW46IDEwcHggMDtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuICAgIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveF1bZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3hdIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWl0ZW1dIHtcXG4gICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICBjb2xvcjogIzVhNWE1YTtcXG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xcbiAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gICAgICBwYWRkaW5nOiAwcHggM3B4O1xcbiAgICAgIG1hcmdpbjogM3B4O1xcbiAgICAgIGJhY2tncm91bmQ6ICNmZmY7IH1cXG4gICAgICBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3hdW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94XSBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1pdGVtXTpob3ZlciwgW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94XVtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveF0gW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtaXRlbV06Zm9jdXMsIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveF1bZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3hdIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWl0ZW1dLmZvY3VzIHtcXG4gICAgICAgIGNvbG9yOiAjNWE1YTVhO1xcbiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lOyB9XFxuICAgICAgW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94XVtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveF0gW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtaXRlbV06YWN0aXZlLCBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3hdW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94XSBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1pdGVtXS5hY3RpdmUge1xcbiAgICAgICAgb3V0bGluZTogMDtcXG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IG5vbmU7XFxuICAgICAgICBib3gtc2hhZG93OiBpbnNldCAwIDNweCA1cHggcmdiYSgwLCAwLCAwLCAwLjEyNSk7IH1cXG4gICAgICBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3hdW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94XSBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1pdGVtXS5kaXNhYmxlZCwgW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94XVtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveF0gW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtaXRlbV1bZGlzYWJsZWRdLFxcbiAgICAgIGZpZWxkc2V0W2Rpc2FibGVkXSBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3hdW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94XSBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1pdGVtXSB7XFxuICAgICAgICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xcbiAgICAgICAgb3BhY2l0eTogLjY1O1xcbiAgICAgICAgYm94LXNoYWRvdzogbm9uZTsgfVxcbiAgICAgIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveF1bZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3hdIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWl0ZW1dIC51cGxvYWRlZC1pdGVtLXByZXZpZXcge1xcbiAgICAgICAgZGlzcGxheTogbm9uZTsgfVxcbiAgICAgIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveF1bZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3hdIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWl0ZW1dIC51cGxvYWRlZC1pdGVtLWhvbGRlciB7XFxuICAgICAgICBkaXNwbGF5OiB0YWJsZTsgfVxcbiAgICAgICAgW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94XVtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveF0gW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtaXRlbV0gLnVwbG9hZGVkLWl0ZW0taG9sZGVyIC51cGxvYWRlZC1pdGVtLWNlbGwge1xcbiAgICAgICAgICBkaXNwbGF5OiB0YWJsZS1jZWxsO1xcbiAgICAgICAgICBwYWRkaW5nOiAwIDNweDsgfVxcbiAgICAgICAgW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94XVtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveF0gW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtaXRlbV0gLnVwbG9hZGVkLWl0ZW0taG9sZGVyIFtkYXRhLXVwbG9hZGVkLWl0ZW0tY2VsbD1cXFwiZG93bmxvYWRcXFwiXSB7XFxuICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjsgfVxcbiAgICAgICAgICBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3hdW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94XSBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1pdGVtXSAudXBsb2FkZWQtaXRlbS1ob2xkZXIgW2RhdGEtdXBsb2FkZWQtaXRlbS1jZWxsPVxcXCJkb3dubG9hZFxcXCJdOmhvdmVyLCBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3hdW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94XSBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1pdGVtXSAudXBsb2FkZWQtaXRlbS1ob2xkZXIgW2RhdGEtdXBsb2FkZWQtaXRlbS1jZWxsPVxcXCJkb3dubG9hZFxcXCJdOmZvY3VzLCBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3hdW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94XSBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1pdGVtXSAudXBsb2FkZWQtaXRlbS1ob2xkZXIgW2RhdGEtdXBsb2FkZWQtaXRlbS1jZWxsPVxcXCJkb3dubG9hZFxcXCJdLmZvY3VzIHtcXG4gICAgICAgICAgICBjb2xvcjogIzMzN2FiNztcXG4gICAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7IH1cXG4gICAgICAgIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveF1bZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3hdIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWl0ZW1dIC51cGxvYWRlZC1pdGVtLWhvbGRlciBbZGF0YS11cGxvYWRlZC1pdGVtLWNlbGw9XFxcImRlbGV0ZVxcXCJdIHtcXG4gICAgICAgICAgY3Vyc29yOiBwb2ludGVyOyB9XFxuICAgICAgICAgIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveF1bZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3hdIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWl0ZW1dIC51cGxvYWRlZC1pdGVtLWhvbGRlciBbZGF0YS11cGxvYWRlZC1pdGVtLWNlbGw9XFxcImRlbGV0ZVxcXCJdOmhvdmVyLCBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3hdW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94XSBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1pdGVtXSAudXBsb2FkZWQtaXRlbS1ob2xkZXIgW2RhdGEtdXBsb2FkZWQtaXRlbS1jZWxsPVxcXCJkZWxldGVcXFwiXTpmb2N1cywgW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94XVtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveF0gW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtaXRlbV0gLnVwbG9hZGVkLWl0ZW0taG9sZGVyIFtkYXRhLXVwbG9hZGVkLWl0ZW0tY2VsbD1cXFwiZGVsZXRlXFxcIl0uZm9jdXMge1xcbiAgICAgICAgICAgIGNvbG9yOiAjMzM3YWI3O1xcbiAgICAgICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTsgfVxcbiAgICBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3hdW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94XSBbZGF0YS1heDZ1aS11cGxvYWRlci1lbXB0eUxpc3QtbXNnXSB7XFxuICAgICAgbWluLWhlaWdodDogODZweDtcXG4gICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgICAgY29sb3I6IGdyYXk7IH1cXG4gIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveF1bZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3g9XFxcImlubGluZVxcXCJdOmFmdGVyIHtcXG4gICAgY29udGVudDogXFxcIiBcXFwiO1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgY2xlYXI6IGJvdGg7IH1cXG4gIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveF1bZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3g9XFxcImlubGluZVxcXCJdIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWl0ZW1dIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIGZsb2F0OiBsZWZ0OyB9XFxuICBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3hdW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94PVxcXCJ0aHVtYm5haWxcXFwiXTphZnRlciB7XFxuICAgIGNvbnRlbnQ6IFxcXCIgXFxcIjtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIGNsZWFyOiBib3RoOyB9XFxuICBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3hdW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94PVxcXCJ0aHVtYm5haWxcXFwiXSBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1pdGVtXSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBmbG9hdDogbGVmdDtcXG4gICAgd2lkdGg6IDEyMHB4O1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDsgfVxcbiAgICBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3hdW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94PVxcXCJ0aHVtYm5haWxcXFwiXSBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1pdGVtXTphY3RpdmUsIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveF1bZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3g9XFxcInRodW1ibmFpbFxcXCJdIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWl0ZW1dLmFjdGl2ZSB7XFxuICAgICAgb3V0bGluZTogMDtcXG4gICAgICBiYWNrZ3JvdW5kLWltYWdlOiBub25lO1xcbiAgICAgIGJveC1zaGFkb3c6IG5vbmU7IH1cXG4gICAgW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94XVtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveD1cXFwidGh1bWJuYWlsXFxcIl0gW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtaXRlbV0gLnVwbG9hZGVkLWl0ZW0tcHJldmlldyB7XFxuICAgICAgZGlzcGxheTogYmxvY2s7IH1cXG4gICAgICBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3hdW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94PVxcXCJ0aHVtYm5haWxcXFwiXSBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1pdGVtXSAudXBsb2FkZWQtaXRlbS1wcmV2aWV3Lm5vLWltYWdlIHtcXG4gICAgICAgIHdpZHRoOiAxMjBweDtcXG4gICAgICAgIGhlaWdodDogMTIwcHg7XFxuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzY2YjRmYjtcXG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KC0yOTBkZWcsICM2NmI0ZmIsICNmZjc4YjIpO1xcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KDIwZGVnLCM2NmI0ZmIsICNmZjc4YjIpO1xcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICAgICAgbGluZS1oZWlnaHQ6IDEyMHB4O1xcbiAgICAgICAgY29sb3I6ICNmZmY7IH1cXG4gICAgICAgIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveF1bZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3g9XFxcInRodW1ibmFpbFxcXCJdIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWl0ZW1dIC51cGxvYWRlZC1pdGVtLXByZXZpZXcubm8taW1hZ2U6YmVmb3JlIHtcXG4gICAgICAgICAgY29udGVudDogJ05vIEltYWdlJzsgfVxcbiAgICAgICAgW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94XVtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveD1cXFwidGh1bWJuYWlsXFxcIl0gW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtaXRlbV0gLnVwbG9hZGVkLWl0ZW0tcHJldmlldy5uby1pbWFnZSBpbWcge1xcbiAgICAgICAgICBkaXNwbGF5OiBub25lOyB9XFxuICAgICAgW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94XVtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveD1cXFwidGh1bWJuYWlsXFxcIl0gW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtaXRlbV0gLnVwbG9hZGVkLWl0ZW0tcHJldmlldyBpbWcge1xcbiAgICAgICAgd2lkdGg6IDEyMHB4O1xcbiAgICAgICAgaGVpZ2h0OiAxMjBweDtcXG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XFxuICAgICAgICBib3JkZXItcmFkaXVzOiA0cHg7IH1cXG4gICAgW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94XVtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveD1cXFwidGh1bWJuYWlsXFxcIl0gW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtaXRlbV0gLnVwbG9hZGVkLWl0ZW0taG9sZGVyIHtcXG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgICAgZGlzcGxheTogYmxvY2s7IH1cXG4gICAgICBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3hdW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94PVxcXCJ0aHVtYm5haWxcXFwiXSBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1pdGVtXSAudXBsb2FkZWQtaXRlbS1ob2xkZXIgLnVwbG9hZGVkLWl0ZW0tY2VsbCB7XFxuICAgICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7IH1cXG4gICAgICBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3hdW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94PVxcXCJ0aHVtYm5haWxcXFwiXSBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1pdGVtXSAudXBsb2FkZWQtaXRlbS1ob2xkZXIgW2RhdGEtdXBsb2FkZWQtaXRlbS1jZWxsPVxcXCJkb3dubG9hZFxcXCJdIHtcXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICAgIGxlZnQ6IDVweDtcXG4gICAgICAgIHRvcDogLTExNXB4O1xcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICAgICAgYmFja2dyb3VuZDogI2ZmZjtcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDsgfVxcbiAgICAgIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWJveF1bZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3g9XFxcInRodW1ibmFpbFxcXCJdIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXVwbG9hZGVkLWl0ZW1dIC51cGxvYWRlZC1pdGVtLWhvbGRlciBbZGF0YS11cGxvYWRlZC1pdGVtLWNlbGw9XFxcImRlbGV0ZVxcXCJdIHtcXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICAgIHJpZ2h0OiA1cHg7XFxuICAgICAgICB0b3A6IC0xMTVweDtcXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgICAgIGJhY2tncm91bmQ6ICNmZmY7XFxuICAgICAgICBib3JkZXItcmFkaXVzOiA0cHg7IH1cXG4gICAgICBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1ib3hdW2RhdGEtYXg2dWktdXBsb2FkZXItdXBsb2FkZWQtYm94PVxcXCJ0aHVtYm5haWxcXFwiXSBbZGF0YS1heDZ1aS11cGxvYWRlci11cGxvYWRlZC1pdGVtXSAudXBsb2FkZWQtaXRlbS1ob2xkZXIgW2RhdGEtdXBsb2FkZWQtaXRlbS1jZWxsPVxcXCJmaWxlbmFtZVxcXCJdIHtcXG4gICAgICAgIHBhZGRpbmctdG9wOiA1cHg7IH1cXG5cXG5bZGF0YS1heDZ1aS11cGxvYWRlci1pbnB1dF0ge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgbGVmdDogLTEwMDBweDtcXG4gIHRvcDogLTEwMDBweDtcXG4gIG9wYWNpdHk6IDA7XFxuICBjdXJzb3I6IHBvaW50ZXI7IH1cXG5cXG5bZGF0YS1heDZ1aS11cGxvYWRlci1wcm9ncmVzc2JveF0ge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIHotaW5kZXg6IDEwMDA7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiAwcHg7XFxuICB0b3A6IDBweDtcXG4gIHdpZHRoOiAyMDBweDtcXG4gIC13ZWJraXQtcGVyc3BlY3RpdmU6IDEwMDBweDtcXG4gIC1tb3otcGVyc3BlY3RpdmU6IDEwMDBweDtcXG4gIHBlcnNwZWN0aXZlOiAxMDAwcHg7XFxuICAtd2Via2l0LXRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XFxuICAtbW96LXRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XFxuICAtbXMtdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcXG4gIC1vLXRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XFxuICB0cmFuc2Zvcm0tc3R5bGU6IHByZXNlcnZlLTNkO1xcbiAgLXdlYmtpdC1hbmltYXRpb246IGF4LXByb2dyZXNzYm94IDAuMXM7XFxuICAtbW96LWFuaW1hdGlvbjogYXgtcHJvZ3Jlc3Nib3ggMC4xcztcXG4gIGFuaW1hdGlvbjogYXgtcHJvZ3Jlc3Nib3ggMC4xcztcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDApO1xcbiAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7XFxuICAtbXMtdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDApO1xcbiAgLW8tdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDApO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDApO1xcbiAgLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgdG9wO1xcbiAgLW1vei10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgdG9wO1xcbiAgLW1zLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciB0b3A7XFxuICAtby10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgdG9wO1xcbiAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIHRvcDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudChib3R0b20sICNmZmYpO1xcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KHRvIHRvcCwjZmZmKTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkO1xcbiAgYm9yZGVyLWNvbG9yOiAjZGRkO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgYm94LXNoYWRvdzogMHB4IDBweCAzcHggMHB4IHJnYmEoMCwgMCwgMCwgMC4xNzUpOyB9XFxuICBbZGF0YS1heDZ1aS11cGxvYWRlci1wcm9ncmVzc2JveF0gLnByb2dyZXNzIHtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgaGVpZ2h0OiAxMnB4O1xcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1O1xcbiAgICBib3JkZXItcmFkaXVzOiAzcHg7XFxuICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDJweCByZ2JhKDAsIDAsIDAsIDAuMSk7IH1cXG4gIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXByb2dyZXNzYm94XSAucHJvZ3Jlc3MtYmFyIHtcXG4gICAgZmxvYXQ6IGxlZnQ7XFxuICAgIHdpZHRoOiAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBmb250LXNpemU6IDEycHg7XFxuICAgIGxpbmUtaGVpZ2h0OiAxMnB4O1xcbiAgICBjb2xvcjogI2ZmZjtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzM3YWI3O1xcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIC0xcHggMCByZ2JhKDAsIDAsIDAsIDAuMTUpO1xcbiAgICAtd2Via2l0LXRyYW5zaXRpb246IHdpZHRoIDAuNnMgZWFzZTtcXG4gICAgLW1vei10cmFuc2l0aW9uOiB3aWR0aCAwLjZzIGVhc2U7XFxuICAgIHRyYW5zaXRpb246IHdpZHRoIDAuNnMgZWFzZTsgfVxcbiAgW2RhdGEtYXg2dWktdXBsb2FkZXItcHJvZ3Jlc3Nib3hdIC5wcm9ncmVzcy1zdHJpcGVkIC5wcm9ncmVzcy1iYXIsXFxuICBbZGF0YS1heDZ1aS11cGxvYWRlci1wcm9ncmVzc2JveF0gLnByb2dyZXNzLWJhci1zdHJpcGVkIHtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoNDVkZWcsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSkgMjUlLCB0cmFuc3BhcmVudCAyNSUsIHRyYW5zcGFyZW50IDUwJSwgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KSA1MCUsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSkgNzUlLCB0cmFuc3BhcmVudCA3NSUsIHRyYW5zcGFyZW50KTtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogLW8tbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpIDI1JSwgdHJhbnNwYXJlbnQgMjUlLCB0cmFuc3BhcmVudCA1MCUsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSkgNTAlLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpIDc1JSwgdHJhbnNwYXJlbnQgNzUlLCB0cmFuc3BhcmVudCk7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KSAyNSUsIHRyYW5zcGFyZW50IDI1JSwgdHJhbnNwYXJlbnQgNTAlLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpIDUwJSwgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KSA3NSUsIHRyYW5zcGFyZW50IDc1JSwgdHJhbnNwYXJlbnQpO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDQwcHggNDBweDsgfVxcbiAgW2RhdGEtYXg2dWktdXBsb2FkZXItcHJvZ3Jlc3Nib3hdIC5wcm9ncmVzcy5hY3RpdmUgLnByb2dyZXNzLWJhcixcXG4gIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXByb2dyZXNzYm94XSAucHJvZ3Jlc3MtYmFyLmFjdGl2ZSB7XFxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBwcm9ncmVzcy1iYXItc3RyaXBlcyAycyBsaW5lYXIgaW5maW5pdGU7XFxuICAgIC1tb3otYW5pbWF0aW9uOiBwcm9ncmVzcy1iYXItc3RyaXBlcyAycyBsaW5lYXIgaW5maW5pdGU7XFxuICAgIGFuaW1hdGlvbjogcHJvZ3Jlc3MtYmFyLXN0cmlwZXMgMnMgbGluZWFyIGluZmluaXRlOyB9XFxuICBbZGF0YS1heDZ1aS11cGxvYWRlci1wcm9ncmVzc2JveF0gLmF4LXByb2dyZXNzYm94LWJvZHkge1xcbiAgICBwYWRkaW5nOiAxMHB4O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cXG4gICAgW2RhdGEtYXg2dWktdXBsb2FkZXItcHJvZ3Jlc3Nib3hdIC5heC1wcm9ncmVzc2JveC1ib2R5IC5heC1wcmVncmVzc2JveC1jb250ZW50IHtcXG4gICAgICBtaW4td2lkdGg6IDUwcHg7IH1cXG4gICAgW2RhdGEtYXg2dWktdXBsb2FkZXItcHJvZ3Jlc3Nib3hdIC5heC1wcm9ncmVzc2JveC1ib2R5IC5heC1wcm9ncmVzc2JveC1idXR0b25zIHtcXG4gICAgICB0ZXh0LWFsaWduOiByaWdodDtcXG4gICAgICBwYWRkaW5nOiA1cHggMHB4IDBweCAwcHg7IH1cXG4gICAgICBbZGF0YS1heDZ1aS11cGxvYWRlci1wcm9ncmVzc2JveF0gLmF4LXByb2dyZXNzYm94LWJvZHkgLmF4LXByb2dyZXNzYm94LWJ1dHRvbnMgYnV0dG9uLmJ0biB7XFxuICAgICAgICBwYWRkaW5nOiAzcHggN3B4O1xcbiAgICAgICAgZm9udC1zaXplOiAwLjhlbTsgfVxcbiAgICAgIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXByb2dyZXNzYm94XSAuYXgtcHJvZ3Jlc3Nib3gtYm9keSAuYXgtcHJvZ3Jlc3Nib3gtYnV0dG9ucyBidXR0b246bm90KDpsYXN0LWNoaWxkKSB7XFxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDNweDsgfVxcbiAgW2RhdGEtYXg2dWktdXBsb2FkZXItcHJvZ3Jlc3Nib3hdLmRpcmVjdGlvbi10b3AgLmF4LXByb2dyZXNzYm94LWFycm93IHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMDtcXG4gICAgaGVpZ2h0OiAwO1xcbiAgICBsZWZ0OiA1MCU7XFxuICAgIHRvcDogMDsgfVxcbiAgICBbZGF0YS1heDZ1aS11cGxvYWRlci1wcm9ncmVzc2JveF0uZGlyZWN0aW9uLXRvcCAuYXgtcHJvZ3Jlc3Nib3gtYXJyb3c6YmVmb3JlIHtcXG4gICAgICBjb250ZW50OiAnICc7XFxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgIHdpZHRoOiAwO1xcbiAgICAgIGhlaWdodDogMDtcXG4gICAgICBsZWZ0OiAtNnB4O1xcbiAgICAgIHRvcDogLTEycHg7XFxuICAgICAgYm9yZGVyLWxlZnQ6IDZweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gICAgICBib3JkZXItcmlnaHQ6IDZweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gICAgICBib3JkZXItdG9wOiAwIG5vbmU7XFxuICAgICAgYm9yZGVyLWJvdHRvbTogMTJweCBzb2xpZCAjZGRkOyB9XFxuICAgIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXByb2dyZXNzYm94XS5kaXJlY3Rpb24tdG9wIC5heC1wcm9ncmVzc2JveC1hcnJvdzphZnRlciB7XFxuICAgICAgY29udGVudDogJyAnO1xcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICB3aWR0aDogMDtcXG4gICAgICBoZWlnaHQ6IDA7XFxuICAgICAgbGVmdDogLTZweDtcXG4gICAgICB0b3A6IC0xMHB4O1xcbiAgICAgIGJvcmRlci1sZWZ0OiA2cHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICAgICAgYm9yZGVyLXJpZ2h0OiA2cHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICAgICAgYm9yZGVyLXRvcDogMCBub25lO1xcbiAgICAgIGJvcmRlci1ib3R0b206IDEycHggc29saWQgI2ZmZjsgfVxcbiAgW2RhdGEtYXg2dWktdXBsb2FkZXItcHJvZ3Jlc3Nib3hdLmRpcmVjdGlvbi1yaWdodCAuYXgtcHJvZ3Jlc3Nib3gtYXJyb3cge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiAwO1xcbiAgICBoZWlnaHQ6IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICB0b3A6IDUwJTsgfVxcbiAgICBbZGF0YS1heDZ1aS11cGxvYWRlci1wcm9ncmVzc2JveF0uZGlyZWN0aW9uLXJpZ2h0IC5heC1wcm9ncmVzc2JveC1hcnJvdzpiZWZvcmUge1xcbiAgICAgIGNvbnRlbnQ6ICcgJztcXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgd2lkdGg6IDA7XFxuICAgICAgaGVpZ2h0OiAwO1xcbiAgICAgIHJpZ2h0OiAtMTJweDtcXG4gICAgICB0b3A6IC02cHg7XFxuICAgICAgYm9yZGVyLWxlZnQ6IDEycHggc29saWQgI2RkZDtcXG4gICAgICBib3JkZXItcmlnaHQ6IDAgbm9uZTtcXG4gICAgICBib3JkZXItdG9wOiA2cHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICAgICAgYm9yZGVyLWJvdHRvbTogNnB4IHNvbGlkIHRyYW5zcGFyZW50OyB9XFxuICAgIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXByb2dyZXNzYm94XS5kaXJlY3Rpb24tcmlnaHQgLmF4LXByb2dyZXNzYm94LWFycm93OmFmdGVyIHtcXG4gICAgICBjb250ZW50OiAnICc7XFxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgIHdpZHRoOiAwO1xcbiAgICAgIGhlaWdodDogMDtcXG4gICAgICByaWdodDogLTEwcHg7XFxuICAgICAgdG9wOiAtNnB4O1xcbiAgICAgIGJvcmRlci1sZWZ0OiAxMnB4IHNvbGlkICNmZmY7XFxuICAgICAgYm9yZGVyLXJpZ2h0OiAwIG5vbmU7XFxuICAgICAgYm9yZGVyLXRvcDogNnB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICAgIGJvcmRlci1ib3R0b206IDZweCBzb2xpZCB0cmFuc3BhcmVudDsgfVxcbiAgW2RhdGEtYXg2dWktdXBsb2FkZXItcHJvZ3Jlc3Nib3hdLmRpcmVjdGlvbi1ib3R0b20gLmF4LXByb2dyZXNzYm94LWFycm93IHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMDtcXG4gICAgaGVpZ2h0OiAwO1xcbiAgICBsZWZ0OiA1MCU7XFxuICAgIGJvdHRvbTogMDsgfVxcbiAgICBbZGF0YS1heDZ1aS11cGxvYWRlci1wcm9ncmVzc2JveF0uZGlyZWN0aW9uLWJvdHRvbSAuYXgtcHJvZ3Jlc3Nib3gtYXJyb3c6YmVmb3JlIHtcXG4gICAgICBjb250ZW50OiAnICc7XFxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgIHdpZHRoOiAwO1xcbiAgICAgIGhlaWdodDogMDtcXG4gICAgICBsZWZ0OiAtNnB4O1xcbiAgICAgIGJvdHRvbTogLTEycHg7XFxuICAgICAgYm9yZGVyLWxlZnQ6IDZweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gICAgICBib3JkZXItcmlnaHQ6IDZweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gICAgICBib3JkZXItdG9wOiAxMnB4IHNvbGlkICNkZGQ7XFxuICAgICAgYm9yZGVyLWJvdHRvbTogMCBub25lOyB9XFxuICAgIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXByb2dyZXNzYm94XS5kaXJlY3Rpb24tYm90dG9tIC5heC1wcm9ncmVzc2JveC1hcnJvdzphZnRlciB7XFxuICAgICAgY29udGVudDogJyAnO1xcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICB3aWR0aDogMDtcXG4gICAgICBoZWlnaHQ6IDA7XFxuICAgICAgbGVmdDogLTZweDtcXG4gICAgICBib3R0b206IC0xMHB4O1xcbiAgICAgIGJvcmRlci1sZWZ0OiA2cHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICAgICAgYm9yZGVyLXJpZ2h0OiA2cHggc29saWQgdHJhbnNwYXJlbnQ7XFxuICAgICAgYm9yZGVyLXRvcDogMTJweCBzb2xpZCAjZmZmO1xcbiAgICAgIGJvcmRlci1ib3R0b206IDAgbm9uZTsgfVxcbiAgW2RhdGEtYXg2dWktdXBsb2FkZXItcHJvZ3Jlc3Nib3hdLmRpcmVjdGlvbi1sZWZ0IC5heC1wcm9ncmVzc2JveC1hcnJvdyB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDA7XFxuICAgIGhlaWdodDogMDtcXG4gICAgbGVmdDogMDtcXG4gICAgdG9wOiA1MCU7IH1cXG4gICAgW2RhdGEtYXg2dWktdXBsb2FkZXItcHJvZ3Jlc3Nib3hdLmRpcmVjdGlvbi1sZWZ0IC5heC1wcm9ncmVzc2JveC1hcnJvdzpiZWZvcmUge1xcbiAgICAgIGNvbnRlbnQ6ICcgJztcXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgd2lkdGg6IDA7XFxuICAgICAgaGVpZ2h0OiAwO1xcbiAgICAgIGxlZnQ6IC0xMnB4O1xcbiAgICAgIHRvcDogLTZweDtcXG4gICAgICBib3JkZXItbGVmdDogMCBub25lO1xcbiAgICAgIGJvcmRlci1yaWdodDogMTJweCBzb2xpZCAjZGRkO1xcbiAgICAgIGJvcmRlci10b3A6IDZweCBzb2xpZCB0cmFuc3BhcmVudDtcXG4gICAgICBib3JkZXItYm90dG9tOiA2cHggc29saWQgdHJhbnNwYXJlbnQ7IH1cXG4gICAgW2RhdGEtYXg2dWktdXBsb2FkZXItcHJvZ3Jlc3Nib3hdLmRpcmVjdGlvbi1sZWZ0IC5heC1wcm9ncmVzc2JveC1hcnJvdzphZnRlciB7XFxuICAgICAgY29udGVudDogJyAnO1xcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICB3aWR0aDogMDtcXG4gICAgICBoZWlnaHQ6IDA7XFxuICAgICAgbGVmdDogLTEwcHg7XFxuICAgICAgdG9wOiAtNnB4O1xcbiAgICAgIGJvcmRlci1sZWZ0OiAwIG5vbmU7XFxuICAgICAgYm9yZGVyLXJpZ2h0OiAxMnB4IHNvbGlkICNmZmY7XFxuICAgICAgYm9yZGVyLXRvcDogNnB4IHNvbGlkIHRyYW5zcGFyZW50O1xcbiAgICAgIGJvcmRlci1ib3R0b206IDZweCBzb2xpZCB0cmFuc3BhcmVudDsgfVxcbiAgW2RhdGEtYXg2dWktdXBsb2FkZXItcHJvZ3Jlc3Nib3hdLmRlc3Ryb3kge1xcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogYXgtcHJvZ3Jlc3Nib3gtZGVzdHJveSAwLjFzIGN1YmljLWJlemllcigwLjYsIC0wLjI4LCAwLjczNSwgMC4wNDUpIGZvcndhcmRzO1xcbiAgICAtbW96LWFuaW1hdGlvbjogYXgtcHJvZ3Jlc3Nib3gtZGVzdHJveSAwLjFzIGN1YmljLWJlemllcigwLjYsIC0wLjI4LCAwLjczNSwgMC4wNDUpIGZvcndhcmRzO1xcbiAgICBhbmltYXRpb246IGF4LXByb2dyZXNzYm94LWRlc3Ryb3kgMC4xcyBjdWJpYy1iZXppZXIoMC42LCAtMC4yOCwgMC43MzUsIDAuMDQ1KSBmb3J3YXJkczsgfVxcbiAgW2RhdGEtYXg2dWktdXBsb2FkZXItcHJvZ3Jlc3Nib3hdLmRpcmVjdGlvbi10b3Age1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciB0b3A7XFxuICAgIC1tb3otdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIHRvcDtcXG4gICAgLW1zLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciB0b3A7XFxuICAgIC1vLXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciB0b3A7XFxuICAgIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciB0b3A7IH1cXG4gIFtkYXRhLWF4NnVpLXVwbG9hZGVyLXByb2dyZXNzYm94XS5kaXJlY3Rpb24tcmlnaHQge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IHJpZ2h0IGNlbnRlcjtcXG4gICAgLW1vei10cmFuc2Zvcm0tb3JpZ2luOiByaWdodCBjZW50ZXI7XFxuICAgIC1tcy10cmFuc2Zvcm0tb3JpZ2luOiByaWdodCBjZW50ZXI7XFxuICAgIC1vLXRyYW5zZm9ybS1vcmlnaW46IHJpZ2h0IGNlbnRlcjtcXG4gICAgdHJhbnNmb3JtLW9yaWdpbjogcmlnaHQgY2VudGVyOyB9XFxuICBbZGF0YS1heDZ1aS11cGxvYWRlci1wcm9ncmVzc2JveF0uZGlyZWN0aW9uLWJvdHRvbSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIGJvdHRvbTtcXG4gICAgLW1vei10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgYm90dG9tO1xcbiAgICAtbXMtdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIGJvdHRvbTtcXG4gICAgLW8tdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIGJvdHRvbTtcXG4gICAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIGJvdHRvbTsgfVxcbiAgW2RhdGEtYXg2dWktdXBsb2FkZXItcHJvZ3Jlc3Nib3hdLmRpcmVjdGlvbi1sZWZ0IHtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBsZWZ0IGNlbnRlcjtcXG4gICAgLW1vei10cmFuc2Zvcm0tb3JpZ2luOiBsZWZ0IGNlbnRlcjtcXG4gICAgLW1zLXRyYW5zZm9ybS1vcmlnaW46IGxlZnQgY2VudGVyO1xcbiAgICAtby10cmFuc2Zvcm0tb3JpZ2luOiBsZWZ0IGNlbnRlcjtcXG4gICAgdHJhbnNmb3JtLW9yaWdpbjogbGVmdCBjZW50ZXI7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vc3JjL0FYNlVJVXBsb2FkZXIvc3R5bGUuc2Nzc1xuLy8gbW9kdWxlIGlkID0gMTEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMSJdLCJzb3VyY2VSb290IjoiIn0=