/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 78);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _AX6Info = __webpack_require__(2);

var _AX6Info2 = _interopRequireDefault(_AX6Info);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module AX6Util
 */

var _toString = Object.prototype.toString;
var reIsJson = /^(["'](\\.|[^"\\\n\r])*?["']|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/,
    reMs = /^-ms-/,
    reSnakeCase = /[\-_]([\da-z])/gi,
    reCamelCase = /([A-Z])/g,
    reDot = /\./,
    reInt = /[-|+]?[\D]/gi,
    reNotNum = /\D/gi,
    reMoneySplit = new RegExp('([0-9])([0-9][0-9][0-9][,.])'),
    reAmp = /&/g,
    reEq = /=/,
    reClassNameSplit = /[ ]+/g;

function each(O, _fn) {
  if (isNothing(O)) return [];
  var key = void 0,
      i = 0,
      l = O.length,
      isObj = l === undefined || typeof O === "function";
  if (isObj) {
    for (key in O) {
      if (typeof O[key] != "undefined") if (_fn.call(O[key], key, O[key]) === false) break;
    }
  } else {
    for (; i < l;) {
      if (typeof O[i] != "undefined") if (_fn.call(O[i], i, O[i++]) === false) break;
    }
  }
  return O;
}

function search(O, _fn) {
  if (isNothing(O)) return -1;
  if (isObject(O)) {
    for (var key in O) {
      if (typeof O[key] != "undefined" && isFunction(_fn) && _fn.call(O[key], key, O[key])) {
        return key;
        break;
      } else if (O[key] == _fn) {
        return key;
        break;
      }
    }
  } else {
    for (var i = 0, l = O.length; i < l; i++) {
      if (typeof O[i] != "undefined" && isFunction(_fn) && _fn.call(O[i], i, O[i])) {
        return i;
        break;
      } else if (O[i] == _fn) {
        return i;
        break;
      }
    }
  }
  return -1;
}

function filter(O, _fn) {
  if (isNothing(O)) return [];
  var k = void 0,
      i = 0,
      l = O.length,
      results = [],
      fnResult = void 0;
  if (isObject(O)) {
    for (k in O) {
      if (typeof O[k] != "undefined") {
        if (fnResult = _fn.call(O[k], k, O[k])) results.push(O[k]);
      }
    }
  } else {
    for (; i < l;) {
      if (typeof O[i] != "undefined") {
        if (fnResult = _fn.call(O[i], i, O[i])) results.push(O[i]);
        i++;
      }
    }
  }
  return results;
}

function toJson(O) {
  var jsonString = "";
  if (isArray(O)) {
    var i = 0,
        l = O.length;
    jsonString += "[";
    for (; i < l; i++) {
      if (i > 0) jsonString += ",";
      jsonString += toJson(O[i]);
    }
    jsonString += "]";
  } else if (isObject(O)) {
    jsonString += "{";
    var jsonObjectBody = [];
    each(O, function (key, value) {
      jsonObjectBody.push('"' + key + '": ' + toJson(value));
    });
    jsonString += jsonObjectBody.join(", ");
    jsonString += "}";
  } else if (isString(O)) {
    jsonString = '"' + O + '"';
  } else if (isNumber(O)) {
    jsonString = O;
  } else if (isUndefined(O)) {
    jsonString = "undefined";
  } else if (isFunction(O)) {
    jsonString = '"{Function}"';
  } else {
    jsonString = O;
  }
  return jsonString;
}

function parseJson(str, force) {
  if (force || reIsJson.test(str)) {
    try {
      return new Function('', 'return ' + str)();
    } catch (e) {
      return { error: 500, msg: 'syntax error' };
    }
  } else {
    return { error: 500, msg: 'syntax error' };
  }
}

function getType(O) {
  var typeName = void 0;
  if (O != null && O == O.window) {
    typeName = "window";
  } else if (!!(O && O.nodeType == 1)) {
    typeName = "element";
  } else if (!!(O && O.nodeType == 11)) {
    typeName = "fragment";
  } else if (O === null) {
    typeName = "null";
  } else if (typeof O === "undefined") {
    typeName = "undefined";
  } else if (_toString.call(O) == "[object Object]") {
    typeName = "object";
  } else if (_toString.call(O) == "[object Array]") {
    typeName = "array";
  } else if (_toString.call(O) == "[object String]") {
    typeName = "string";
  } else if (_toString.call(O) == "[object Number]") {
    typeName = "number";
  } else if (_toString.call(O) == "[object NodeList]") {
    typeName = "nodelist";
  } else if (typeof O === "function") {
    typeName = "function";
  }
  return typeName;
}

function isWindow(O) {
  return O != null && O == O.window;
}

function isElement(O) {
  return !!(O && (O.nodeType == 1 || O.nodeType == 11));
}

function isObject(O) {
  return _toString.call(O) == "[object Object]";
}

function isArray(O) {
  return _toString.call(O) == "[object Array]";
}

function isFunction(O) {
  return typeof O === "function";
}

function isString(O) {
  return _toString.call(O) == "[object String]";
}

function isNumber(O) {
  return _toString.call(O) == "[object Number]";
}

function isNodelist(O) {
  return !!(_toString.call(O) == "[object NodeList]" || typeof O !== "undefined" && O && O[0] && O[0].nodeType == 1);
}

function isUndefined(O) {
  return typeof O === "undefined";
}

function isNothing(O) {
  return typeof O === "undefined" || O === null || O === "";
}

function isDate(O) {
  return O instanceof Date && !isNaN(O.valueOf());
}

function isDateFormat(O) {
  var result = false;

  if (!O) {} else if (O instanceof Date && !isNaN(O.valueOf())) {
    result = true;
  } else {
    if (O.length > 7) {
      if (date(O) instanceof Date) {
        return true;
      }
    }
    O = O.replace(/\D/g, '');
    if (O.length > 7) {
      var mm = O.substr(4, 2),
          dd = O.substr(6, 2);

      O = date(O);
      if (O.getMonth() == mm - 1 && O.getDate() == dd) {
        result = true;
      }
    }
  }
  return result;
}

function first(O) {
  if (isObject(O)) {
    var keys = Object.keys(O);
    var item = {};
    item[keys[0]] = O[keys[0]];
    return item;
  } else if (isArray(O)) {
    return O[0];
  } else {
    console.error("AX6Util.object.first", "argument type error");
    return undefined;
  }
}

function last(O) {
  if (isObject(O)) {
    var keys = Object.keys(O);
    var item = {};
    item[keys[keys.length - 1]] = O[keys[keys.length - 1]];
    return item;
  } else if (isArray(O)) {
    return O[O.length - 1];
  } else {
    console.error("AX6Util.object.last", "argument type error");
    return undefined;
  }
}

function setCookie(cn, cv, exdays, opts) {
  var expire = void 0;
  if (typeof exdays === "number") {
    expire = new Date();
    expire.setDate(expire.getDate() + exdays);
  }
  opts = opts || {};
  return doc.cookie = [escape(cn), '=', escape(cv), expire ? "; expires=" + expire.toUTCString() : "", // use expires attribute, max-age is not supported by IE
  opts.path ? "; path=" + opts.path : "", opts.domain ? "; domain=" + opts.domain : "", opts.secure ? "; secure" : ""].join("");
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = doc.cookie.split(';'),
      i = 0,
      l = ca.length;
  for (; i < l; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }if (c.indexOf(name) != -1) return unescape(c.substring(name.length, c.length));
  }
  return "";
}

function alert(O) {
  win.alert(toJson(O));
  return O;
}

function left(str, pos) {
  if (typeof str === "undefined" || typeof pos === "undefined") return "";
  if (isString(pos)) {
    return str.indexOf(pos) > -1 ? str.substr(0, str.indexOf(pos)) : "";
  } else if (isNumber(pos)) {
    return str.substr(0, pos);
  } else {
    return "";
  }
}

function right(str, pos) {
  if (typeof str === "undefined" || typeof pos === "undefined") return "";
  str = '' + str;
  if (isString(pos)) {
    return str.lastIndexOf(pos) > -1 ? str.substr(str.lastIndexOf(pos) + 1) : "";
  } else if (isNumber(pos)) {
    return str.substr(str.length - pos);
  } else {
    return "";
  }
}

function camelCase(str) {
  return str.replace(reMs, "ms-").replace(reSnakeCase, function (all, letter) {
    return letter.toUpperCase();
  });
}

function snakeCase(str) {
  return camelCase(str).replace(reCamelCase, function (all, letter) {
    return "-" + letter.toLowerCase();
  });
}

function number(str, cond) {
  var result = void 0,
      pair = ('' + str).split(reDot),
      isMinus = void 0,
      returnValue = void 0;

  isMinus = Number(pair[0].replace(/,/g, "")) < 0 || pair[0] == "-0";
  returnValue = 0.0;
  pair[0] = pair[0].replace(reInt, "");

  if (pair[1]) {
    pair[1] = pair[1].replace(reNotNum, "");
    returnValue = Number(pair[0] + "." + pair[1]) || 0;
  } else {
    returnValue = Number(pair[0]) || 0;
  }
  result = isMinus ? -returnValue : returnValue;

  each(cond, function (k, c) {
    if (k == "round") {
      if (isNumber(c)) {
        if (c < 0) {
          result = +(Math.round(result + "e-" + Math.abs(c)) + "e+" + Math.abs(c));
        } else {
          result = +(Math.round(result + "e+" + c) + "e-" + c);
        }
      } else {
        result = Math.round(result);
      }
    }
    if (k == "floor") {
      result = Math.floor(result);
    }
    if (k == "ceil") {
      result = Math.ceil(result);
    } else if (k == "money") {
      result = function (val) {
        var txtNumber = '' + val;
        if (isNaN(txtNumber) || txtNumber == "") {
          return "";
        } else {
          var arrNumber = txtNumber.split('.');
          arrNumber[0] += '.';
          do {
            arrNumber[0] = arrNumber[0].replace(reMoneySplit, '$1,$2');
          } while (reMoneySplit.test(arrNumber[0]));
          if (arrNumber.length > 1) {
            return arrNumber.join('');
          } else {
            return arrNumber[0].split('.')[0];
          }
        }
      }(result);
    } else if (k == "abs") {
      result = Math.abs(Number(result));
    } else if (k == "byte") {
      result = function (val) {
        val = Number(result);
        var nUnit = "KB";
        var myByte = val / 1024;
        if (myByte / 1024 > 1) {
          nUnit = "MB";
          myByte = myByte / 1024;
        }
        if (myByte / 1024 > 1) {
          nUnit = "GB";
          myByte = myByte / 1024;
        }
        return number(myByte, { round: 1 }) + nUnit;
      }(result);
    }
  });

  return result;
}

function toArray(O) {
  if (typeof O.length != "undefined") return Array.prototype.slice.call(O);
  return [];
}

function param(O, cond) {
  var p;
  if (isString(O) && typeof cond !== "undefined" && cond == "param") {
    return O;
  } else if (isString(O) && typeof cond !== "undefined" && cond == "object" || isString(O) && typeof cond === "undefined") {
    p = {};
    each(O.split(reAmp), function () {
      var item = this.split(reEq);
      if (!p[item[0]]) p[item[0]] = item[1];else {
        if (isString(p[item[0]])) p[item[0]] = [p[item[0]]];
        p[item[0]].push(item[1]);
      }
    });
    return p;
  } else {
    p = [];
    each(O, function (k, v) {
      p.push(k + "=" + escape(v));
    });
    return p.join('&');
  }
}

function encode(s) {
  return encodeURIComponent(s);
}

function decode(s) {
  return decodeURIComponent(s);
}

function error() {
  _AX6Info2.default.onerror.apply(this, arguments);
}

function localDate(yy, mm, dd, hh, mi, ss) {
  var utcD, localD;
  localD = new Date();
  if (mm < 0) mm = 0;
  if (typeof hh === "undefined") hh = 12;
  if (typeof mi === "undefined") mi = 0;
  utcD = new Date(Date.UTC(yy, mm, dd || 1, hh, mi, ss || 0));

  if (mm == 0 && dd == 1 && utcD.getUTCHours() + utcD.getTimezoneOffset() / 60 < 0) {
    utcD.setUTCHours(0);
  } else {
    utcD.setUTCHours(utcD.getUTCHours() + utcD.getTimezoneOffset() / 60);
  }
  return utcD;
}

function date(d, cond) {
  var yy = void 0,
      mm = void 0,
      dd = void 0,
      hh = void 0,
      mi = void 0,
      aDateTime = void 0,
      aTimes = void 0,
      aTime = void 0,
      aDate = void 0,
      va = void 0,
      ISO_8601 = /^\d{4}(-\d\d(-\d\d(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?)?)?)?$/i,
      ISO_8601_FULL = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i;

  if (isString(d)) {
    if (d.length == 0) {
      d = new Date();
    } else if (d.length > 15) {
      if (ISO_8601_FULL.test(d) || ISO_8601.test(d)) {
        d = new Date(d);
      } else {
        aDateTime = d.split(/ /g), aTimes, aTime, aDate = aDateTime[0].split(/\D/g), yy = aDate[0];
        mm = parseFloat(aDate[1]);
        dd = parseFloat(aDate[2]);
        aTime = aDateTime[1] || "09:00";
        aTimes = aTime.substring(0, 5).split(":");
        hh = parseFloat(aTimes[0]);
        mi = parseFloat(aTimes[1]);
        if (right(aTime, 2) === "AM" || right(aTime, 2) === "PM") hh += 12;
        d = localDate(yy, mm - 1, dd, hh, mi);
      }
    } else if (d.length == 14) {
      va = d.replace(/\D/g, "");
      d = localDate(va.substr(0, 4), va.substr(4, 2) - 1, number(va.substr(6, 2)), number(va.substr(8, 2)), number(va.substr(10, 2)), number(va.substr(12, 2)));
    } else if (d.length > 7) {
      va = d.replace(/\D/g, "");
      d = localDate(va.substr(0, 4), va.substr(4, 2) - 1, number(va.substr(6, 2)));
    } else if (d.length > 4) {
      va = d.replace(/\D/g, "");
      d = localDate(va.substr(0, 4), va.substr(4, 2) - 1, 1);
    } else if (d.length > 2) {
      va = d.replace(/\D/g, "");
      return localDate(va.substr(0, 4), va.substr(4, 2) - 1, 1);
    } else {
      d = new Date();
    }
  }
  if (typeof cond === "undefined" || typeof d === "undefined") {
    return d;
  } else {
    if ("add" in cond) {
      d = function (_d, opts) {
        var yy = void 0,
            mm = void 0,
            dd = void 0,
            mxdd = void 0,
            DyMilli = 1000 * 60 * 60 * 24;

        if (typeof opts["d"] !== "undefined") {
          _d.setTime(_d.getTime() + opts["d"] * DyMilli);
        } else if (typeof opts["m"] !== "undefined") {
          yy = _d.getFullYear();
          mm = _d.getMonth();
          dd = _d.getDate();
          yy = yy + parseInt(opts["m"] / 12);
          mm += opts["m"] % 12;
          mxdd = daysOfMonth(yy, mm);
          if (mxdd < dd) dd = mxdd;
          _d = new Date(yy, mm, dd, 12);
        } else if (typeof opts["y"] !== "undefined") {
          _d.setTime(_d.getTime() + opts["y"] * 365 * DyMilli);
        } else if (typeof opts["h"] !== "undefined") {
          _d.setTime(_d.getTime() + opts["h"] * 1000 * 60 * 60);
        }

        return _d;
      }(new Date(d), cond["add"]);
    }
    if ("set" in cond) {
      d = function (_d, opts) {
        var yy = void 0,
            mm = void 0,
            dd = void 0,
            processor = {
          "firstDayOfMonth": function firstDayOfMonth(date) {
            yy = date.getFullYear();
            mm = date.getMonth();
            dd = 1;
            return new Date(yy, mm, dd, 12);
          },
          "lastDayOfMonth": function lastDayOfMonth(date) {
            yy = date.getFullYear();
            mm = date.getMonth();
            dd = daysOfMonth(yy, mm);
            return new Date(yy, mm, dd, 12);
          }
        };
        if (opts in processor) {
          return processor[opts](_d);
        } else {
          return _d;
        }
      }(new Date(d), cond["set"]);
    }
    if ("return" in cond) {
      return function () {

        var fStr = cond["return"],
            nY = void 0,
            nM = void 0,
            nD = void 0,
            nH = void 0,
            nMM = void 0,
            nS = void 0,
            nDW = void 0,
            yre = void 0,
            regY = void 0,
            mre = void 0,
            regM = void 0,
            dre = void 0,
            regD = void 0,
            hre = void 0,
            regH = void 0,
            mire = void 0,
            regMI = void 0,
            sre = void 0,
            regS = void 0,
            dwre = void 0,
            regDW = void 0;

        nY = d.getUTCFullYear();
        nM = setDigit(d.getMonth() + 1, 2);
        nD = setDigit(d.getDate(), 2);
        nH = setDigit(d.getHours(), 2);
        nMM = setDigit(d.getMinutes(), 2);
        nS = setDigit(d.getSeconds(), 2);
        nDW = d.getDay();

        yre = /[^y]*(yyyy)[^y]*/gi;
        yre.exec(fStr);
        regY = RegExp.$1;
        mre = /[^m]*(MM)[^m]*/g;
        mre.exec(fStr);
        regM = RegExp.$1;
        dre = /[^d]*(dd)[^d]*/gi;
        dre.exec(fStr);
        regD = RegExp.$1;
        hre = /[^h]*(hh)[^h]*/gi;
        hre.exec(fStr);
        regH = RegExp.$1;
        mire = /[^m]*(mm)[^i]*/g;
        mire.exec(fStr);
        regMI = RegExp.$1;
        sre = /[^s]*(ss)[^s]*/gi;
        sre.exec(fStr);
        regS = RegExp.$1;
        dwre = /[^d]*(dw)[^w]*/gi;
        dwre.exec(fStr);
        regDW = RegExp.$1;

        if (regY === "yyyy") {
          fStr = fStr.replace(regY, right(nY, regY.length));
        }
        if (regM === "MM") {
          if (regM.length == 1) nM = d.getMonth() + 1;
          fStr = fStr.replace(regM, nM);
        }
        if (regD === "dd") {
          if (regD.length == 1) nD = d.getDate();
          fStr = fStr.replace(regD, nD);
        }
        if (regH === "hh") {
          fStr = fStr.replace(regH, nH);
        }
        if (regMI === "mm") {
          fStr = fStr.replace(regMI, nMM);
        }
        if (regS === "ss") {
          fStr = fStr.replace(regS, nS);
        }
        if (regDW == "dw") {
          fStr = fStr.replace(regDW, _AX6Info2.default.weekNames[nDW].label);
        }
        return fStr;
      }();
    } else {
      return d;
    }
  }
}

function dday(d, cond) {
  var memoryDay = date(d),
      DyMilli = 1000 * 60 * 60 * 24,
      today = new Date(),
      diffnum = void 0,
      thisYearMemoryDay = void 0;

  function getDayTime(_d) {
    return Math.floor(_d.getTime() / DyMilli) * DyMilli;
  }

  if (typeof cond === "undefined") {
    diffnum = number((getDayTime(memoryDay) - getDayTime(today)) / DyMilli, { floor: true });
    return diffnum;
  } else {
    diffnum = number((getDayTime(memoryDay) - getDayTime(today)) / DyMilli, { floor: true });
    if (cond["today"]) {
      today = date(cond.today);
      diffnum = number((getDayTime(memoryDay) - getDayTime(today)) / DyMilli, { floor: true });
    }
    if (cond["thisYear"]) {
      thisYearMemoryDay = new Date(today.getFullYear(), memoryDay.getMonth(), memoryDay.getDate());
      diffnum = number((getDayTime(thisYearMemoryDay) - getDayTime(today)) / DyMilli, { floor: true });
      if (diffnum < 0) {
        thisYearMemoryDay = new Date(today.getFullYear() + 1, memoryDay.getMonth(), memoryDay.getDate());
        diffnum = number((getDayTime(thisYearMemoryDay) - getDayTime(today)) / DyMilli, { floor: true });
      }
    }
    if (cond["age"]) {
      thisYearMemoryDay = new Date(today.getFullYear(), memoryDay.getMonth(), memoryDay.getDate());
      diffnum = thisYearMemoryDay.getFullYear() - memoryDay.getFullYear();
    }

    return diffnum;
  }
}

function weeksOfMonth(d) {
  var myDate = date(d);
  return {
    year: myDate.getFullYear(),
    month: myDate.getMonth() + 1,
    count: parseInt(myDate.getDate() / 7 + 1)
  };
}

function daysOfMonth(y, m) {
  if (m == 3 || m == 5 || m == 8 || m == 10) {
    return 30;
  } else if (m == 1) {
    return y % 4 == 0 && y % 100 != 0 || y % 400 == 0 ? 29 : 28;
  } else {
    return 31;
  }
}

function setDigit(num, length, padder, radix) {
  var s = num.toString(radix || 10);
  return times(padder || '0', length - s.length) + s;
}

function times(s, count) {
  return count < 1 ? '' : new Array(count + 1).join(s);
}

function findParentNode(_target, cond) {
  if (_target) {
    while (function () {
      var result = true;
      if (typeof cond === "undefined") {
        _target = _target.parentNode ? _target.parentNode : false;
      } else if (isFunction(cond)) {
        result = cond(_target);
      } else if (isObject(cond)) {
        for (var k in cond) {
          if (k === "tagname") {
            if (_target.tagName.toLocaleLowerCase() != cond[k]) {
              result = false;
              break;
            }
          } else if (k === "clazz" || k === "class_name") {
            if ("className" in _target) {
              var klasss = _target.className.split(reClassNameSplit),
                  hasClass = false;

              for (var a = 0; a < klasss.length; a++) {
                if (klasss[a] == cond[k]) {
                  hasClass = true;
                  break;
                }
              }
              result = hasClass;
            } else {
              result = false;
              break;
            }
          } else {
            // 그외 속성값들.
            if (_target.getAttribute) {
              if (_target.getAttribute(k) != cond[k]) {
                result = false;
                break;
              }
            } else {
              result = false;
              break;
            }
          }
        }
      }
      return !result;
    }()) {
      if (_target.parentNode && _target.parentNode.parentNode) {
        _target = _target.parentNode;
      } else {
        _target = false;
        break;
      }
    }
  }
  return _target;
}

function cssNumber(val) {
  var re = /\D?(\d+)([a-zA-Z%]*)/i,
      found = ('' + val).match(re),
      unit = found[2] || "px";

  return found[1] + unit;
}

function css(val) {
  var returns = void 0;
  if (isObject(val)) {
    returns = '';
    for (var k in val) {
      returns += k + ':' + val[k] + ';';
    }
    return returns;
  } else if (isString(val)) {
    returns = {};
    var valSplited = val.split(/[ ]*;[ ]*/g);
    valSplited.forEach(function (v) {
      if ((v = v.trim()) !== "") {
        var vSplited = v.split(/[ ]*:[ ]*/g);
        returns[vSplited[0]] = vSplited[1];
      }
    });
    return returns;
  }
}

function stopEvent(e) {
  // 이벤트 중지 구문
  if (!e) e = window.event;

  //e.cancelBubble is supported by IE -
  // this will kill the bubbling process.
  e.cancelBubble = true;
  e.returnValue = false;

  //e.stopPropagation works only in Firefox.
  if (e.stopPropagation) e.stopPropagation();
  if (e.preventDefault) e.preventDefault();

  return false;
  // 이벤트 중지 구문 끝
}

var selectRange = function () {
  var processor = {
    'textRange': {
      'selectAll': function selectAll(el, range, offset) {},
      'arr': function arr(el, range, offset) {
        range.moveStart("character", offset[0]); // todo ie node select 체크필요
        range.collapse();
        range.moveEnd("character", offset[1]);
      },
      'start': function start(el, range, offset) {
        range.moveStart("character", 0);
        range.collapse();
      },
      'end': function end(el, range, offset) {
        range.moveStart("character", range.text.length);
        range.collapse();
      }
    },
    'range': {
      'selectAll': function selectAll(el, range, offset) {
        range.selectNodeContents(el);
      },
      'arr': function arr(el, range, offset) {
        if (isObject(offset[0])) {
          range.setStart(offset[0].node, offset[0].offset);
          range.setEnd(offset[1].node, offset[1].offset);
        } else {
          range.setStart(el.firstChild, offset[0]);
          range.setEnd(el.firstChild, offset[1]);
        }
      },
      'start': function start(el, range, offset) {
        range.selectNodeContents(el);
        range.collapse(true);
      },
      'end': function end(el, range, offset) {
        range.selectNodeContents(el);
        range.collapse(false);
      }
    }
  };
  return function (el, offset) {
    var range = void 0,
        rangeType = void 0,
        selection = void 0;

    if (el instanceof jQuery) {
      el = el.get(0);
    }
    if (!el) return;

    // 레인지 타입 선택
    if (doc.body.createTextRange) {
      range = document.body.createTextRange();
      range.moveToElementText(el);
      rangeType = "textRange";
    } else if (window.getSelection) {
      selection = window.getSelection();
      range = document.createRange();
      rangeType = "range";
    }

    // range 적용
    if (typeof offset == "undefined") {
      processor[rangeType].selectAll.call(this, el, range, offset);
    } else if (isArray(offset)) {
      processor[rangeType].arr.call(this, el, range, offset);
    } else {
      for (var key in processor[rangeType]) {
        if (offset == key) {
          processor[rangeType][key].call(this, el, range, offset);
          break;
        }
      }
    }

    // 포커스 및 셀렉트
    if (doc.body.createTextRange) {
      range.select();
      el.focus();
    } else if (window.getSelection) {
      el.focus();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };
}();

// https://github.com/lodash/lodash/blob/master/debounce.js
var debounce = function debounce(func, wait, options) {
  var lastArgs = void 0,
      lastThis = void 0,
      maxWait = void 0,
      result = void 0,
      timerId = void 0,
      lastCallTime = void 0;

  var lastInvokeTime = 0;
  var leading = false;
  var maxing = false;
  var trailing = true;

  if (typeof func != 'function') {
    throw new TypeError('Expected a function');
  }
  wait = +wait || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs;
    var thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime;
    var timeSinceLastInvoke = time - lastInvokeTime;
    var result = wait - timeSinceLastCall;

    return maxing ? Math.min(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime;
    var timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }

  function timerExpired() {
    var time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(Date.now());
  }

  function debounced() {
    var time = Date.now();
    var isInvoking = shouldInvoke(time);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    lastArgs = args;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }

  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
};

//https://github.com/lodash/lodash/blob/master/throttle.js
var throttle = function throttle(func, wait, options) {
  var leading = true;
  var trailing = true;

  if (typeof func != 'function') {
    throw new TypeError('Expected a function');
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
};

function deepCopy(obj) {
  var r = void 0,
      l = void 0;
  if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) == 'object') {
    if (isArray(obj)) {
      l = obj.length;
      r = new Array(l);
      for (var i = 0; i < l; i++) {
        r[i] = deepCopy(obj[i]);
      }
      return r;
    } else {
      return Object.assign({}, obj);
    }
  }
  return obj;
}

function escapeHtml(s) {
  if (_toString.call(s) != "[object String]") return s;
  if (!s) return "";
  return s.replace(/[\<\>\&\"]/gm, function (match) {
    switch (match) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "\"":
        return "&quot;";
      default:
        return match;
    }
  });
}

function unescapeHtml(s) {
  if (_toString.call(s) != "[object String]") return s;
  if (!s) return "";
  return s.replace(/(&lt;)|(&gt;)|(&amp;)|(&quot;)/gm, function (match) {
    switch (match) {
      case "&lt;":
        return "<";
      case "&gt;":
        return ">";
      case "&amp;":
        return "&";
      case "&quot;":
        return "\"";
      default:
        return match;
    }
  });
}

/**
 * @namespace ax6string
 * @example
 * ```js
 * AX6Util.string("{0} is dead").format("A");
 * AX6Util.string("String").escape();
 * AX6Util.string("String").unescape();
 * AX6Util.string("String").encode();
 * AX6Util.string("String").decode();
 * AX6Util.string("String").left(1);
 * AX6Util.string("String").right(1);
 * AX6Util.string("String").camelCase();
 * AX6Util.string("String").snakeCase();
 * ```
 */

function string(_string) {
  return new function (_string) {
    this.value = _string;
    this.toString = function () {
      return this.value;
    };
    this.format = function () {
      var args = [];
      for (var i = 0, l = arguments.length; i < l; i++) {
        args = args.concat(arguments[i]);
      }
      return this.value.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match;
      });
    };
    this.escape = function () {
      return escapeHtml(this.value);
    };
    this.unescape = function () {
      return unescapeHtml(this.value);
    };
    this.encode = function () {
      return encode(this.value);
    };
    this.decode = function () {
      return decode(this.value);
    };
    this.left = function (_pos) {
      return left(this.value, _pos);
    };
    this.right = function (_pos) {
      return right(this.value, _pos);
    };
    this.camelCase = function () {
      return camelCase(this.value);
    };
    this.snakeCase = function () {
      return snakeCase(this.value);
    };
  }(_string);
}

function color(_hexColor) {

  var matchers = function () {

    // <http://www.w3.org/TR/css3-values/#integers>
    var CSS_INTEGER = "[-\\+]?\\d+%?";

    // <http://www.w3.org/TR/css3-values/#number-value>
    var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";

    // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
    var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";

    // Actual matching.
    // Parentheses and commas are optional, but not required.
    // Whitespace can take the place of commas or opening paren
    var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
    var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";

    return {
      CSS_UNIT: new RegExp(CSS_UNIT),
      rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
      rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
      hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
      hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
      hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
      hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
      hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
      hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
      hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
      hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
    };
  }();

  var convertObject = function convertObject(_color) {
    var match = void 0;
    if (match = matchers.rgb.exec(_color)) {
      return { r: match[1], g: match[2], b: match[3] };
    }
    if (match = matchers.rgba.exec(_color)) {
      return { r: match[1], g: match[2], b: match[3], a: match[4] };
    }
    if (match = matchers.hsl.exec(_color)) {
      return { h: match[1], s: match[2], l: match[3] };
    }
    if (match = matchers.hsla.exec(_color)) {
      return { h: match[1], s: match[2], l: match[3], a: match[4] };
    }
    if (match = matchers.hsv.exec(_color)) {
      return { h: match[1], s: match[2], v: match[3] };
    }
    if (match = matchers.hsva.exec(_color)) {
      return { h: match[1], s: match[2], v: match[3], a: match[4] };
    }
    if (match = matchers.hex8.exec(_color)) {
      return {
        r: parseInt(match[1], 16),
        g: parseInt(match[2], 16),
        b: parseInt(match[3], 16),
        a: parseInt(match[4] / 255, 16),
        format: "hex8"
      };
    }
    if (match = matchers.hex6.exec(_color)) {
      return {
        r: parseInt(match[1], 16),
        g: parseInt(match[2], 16),
        b: parseInt(match[3], 16),
        format: "hex"
      };
    }
    if (match = matchers.hex4.exec(_color)) {
      return {
        r: parseInt(match[1] + '' + match[1], 16),
        g: parseInt(match[2] + '' + match[2], 16),
        b: parseInt(match[3] + '' + match[3], 16),
        a: parseInt(match[4] + '' + match[4], 16),
        format: "hex8"
      };
    }
    if (match = matchers.hex3.exec(_color)) {
      return {
        r: parseInt(match[1] + '' + match[1], 16),
        g: parseInt(match[2] + '' + match[2], 16),
        b: parseInt(match[3] + '' + match[3], 16),
        format: "hex"
      };
    }

    return false;
  };

  function isOnePointZero(n) {
    return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
  }

  function isPercentage(n) {
    return typeof n === "string" && n.indexOf('%') != -1;
  }

  function convertToPercentage(n) {
    if (n <= 1) {
      n = n * 100 + "%";
    }

    return n;
  }

  function convertTo255(n) {
    return number(Math.min(255, Math.max(n, 0)), { 'round': 2 });
  }

  function convertToHex(n) {
    return setDigit(Math.round(n).toString(16), 2);
  }

  function bound01(n, max) {
    if (isOnePointZero(n)) {
      n = "100%";
    }

    var processPercent = isPercentage(n);
    n = Math.min(max, Math.max(0, parseFloat(n)));

    // Automatically convert percentage into number
    if (processPercent) {
      n = parseInt(n * max, 10) / 100;
    }

    // Handle floating point rounding errors
    if (Math.abs(n - max) < 0.000001) {
      return 1;
    }

    // Convert into [0, 1] range if it isn't already
    return n % max / parseFloat(max);
  }

  function rgbToHsl(r, g, b) {
    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);

    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    var h = void 0,
        s = void 0,
        l = (max + min) / 2;

    if (max == min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }

      h /= 6;
    }

    return { h: h, s: s, l: l };
  }

  function hslToRgb(h, s, l) {
    var r = void 0,
        g = void 0,
        b = void 0;

    h = bound01(h, 360);
    s = bound01(s, 100);
    l = bound01(l, 100);

    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return { r: r * 255, g: g * 255, b: b * 255 };
  }

  return new function (_color) {
    this._originalValue = _color;
    _color = convertObject(_color);
    this.r = _color.r;
    this.g = _color.g;
    this.b = _color.b;
    this.a = _color.a || 1;
    this._format = _color.format;
    this._hex = convertToHex(this.r) + convertToHex(this.g) + convertToHex(this.b);

    this.getHexValue = function () {
      return this._hex;
    };

    this.lighten = function (amount) {
      amount = amount === 0 ? 0 : amount || 10;
      var hsl = rgbToHsl(this.r, this.g, this.b),
          rgb = {};

      hsl.l += amount / 100;
      hsl.l = Math.min(1, Math.max(0, hsl.l));
      hsl.h = hsl.h * 360;

      rgb = hslToRgb(hsl.h, convertToPercentage(hsl.s), convertToPercentage(hsl.l));

      return color('rgba(' + convertTo255(rgb.r) + ', ' + convertTo255(rgb.g) + ', ' + convertTo255(rgb.b) + ', ' + this.a + ')');
    };

    this.darken = function (amount) {
      amount = amount === 0 ? 0 : amount || 10;
      var hsl = rgbToHsl(this.r, this.g, this.b),
          rgb = {};

      hsl.l -= amount / 100;
      hsl.l = Math.min(1, Math.max(0, hsl.l));
      hsl.h = hsl.h * 360;

      rgb = hslToRgb(hsl.h, convertToPercentage(hsl.s), convertToPercentage(hsl.l));

      return color('rgba(' + convertTo255(rgb.r) + ', ' + convertTo255(rgb.g) + ', ' + convertTo255(rgb.b) + ', ' + this.a + ')');
    };

    this.getBrightness = function () {
      return (this.r * 299 + this.g * 587 + this.b * 114) / 1000;
    };

    this.isDark = function () {
      return this.getBrightness() < 128;
    };

    this.isLight = function () {
      return !this.isDark();
    };

    this.getHsl = function () {
      var hsl = rgbToHsl(this.r, this.g, this.b);
      hsl.l = Math.min(1, Math.max(0, hsl.l));
      hsl.h = hsl.h * 360;
      return {
        h: hsl.h,
        s: hsl.s,
        l: hsl.l
      };
    };
  }(_hexColor);
}

exports.default = {

  /**
   * jsonString 으로 alert 합니다.
   * @param {Object|Array|String|Number} O
   * @returns {Object|Array|String|Number} O
   * @example ```js
   * AX6Util.alert({a:1,b:2});
   * AX6Util.alert("정말?");
   * ```
   */
  alert: alert,
  /**
   * Object나 Array의 아이템으로 사용자 함수를 호출합니다.
   * @param {Object|Array} O
   * @param {Function} _fn
   * @example
   * ```js
   * var axf = AX6Util;
   * axf.each([0,1,2], function(){
   * 	// with this
   * });
   * axf.each({a:1, b:2}, function(){
   * 	// with this
   * });
   * ```
   */
  each: each,
  /**
   * 원본 아이템들을 이용하여 사용자 함수의 리턴값이 참인 아이템의 위치나 키값을 반환합니다.
   * @param {Object|Array} O
   * @param {Function|String|Number} _fn - 함수 또는 값
   * @returns {Number|String}
   * @example
   * ```js
   * var myArray = [0,1,2,3,4,5,6];
   * var myObject = {a:"123","b":"123",c:123};
   *
   * AX6Util.search(myArray,  function(){
   *    return this > 3;
   * });
   * // 4
   * AX6Util.search(myObject,  function(k, v){
   *    return v === 123;
   * });
   * // "c"
   * AX6Util.search([1,2,3,4], 3);
   * // 2
   * AX6Util.search([1,2], 4);
   * // -1
   * AX6Util.search(["name","value"], "value");
   * // 1
   * AX6Util.search(["name","value"], "values");
   * // -1
   * AX6Util.search({k1:"name",k2:"value"}, "value2");
   * // -1
   * AX6Util.search({k1:"name",k2:"value"}, "value");
   * // "k2"
   * ```
   */
  search: search,
  /**
   * 배열또는 오브젝트의 각 아이템을 인자로 하는 사용자 함수의 결과가 참인 아이템들의 배열을 반환합니다.
   * @param {Object|Array} O
   * @param {Function} _fn
   * @returns {Array}
   * @example
   * ```js
   * var aarray = [5,4,3,2,1];
   * result = AX6Util.filter( aarray, function(){
   *    return this % 2;
   * });
   * console.log(result);
   * // [5, 3, 1]
   *
   * var filObject = {a:1, s:"string", oa:{pickup:true, name:"AXISJ"}, os:{pickup:true, name:"AX5"}};
   * result = AX6Util.filter( filObject, function(){
   * 	return this.pickup;
   * });
   * console.log( AX6Util.toJson(result) );
   * // [{"pickup": , "name": "AXISJ"}, {"pickup": , "name": "AX5"}]
   * ```
   */
  filter: filter,
  /**
   * Object를 JSONString 으로 반환합니다.
   * @method AX6Util.toJson
   * @param {Object|Array} O
   * @returns {String} JSON
   * @example
   * ```js
   * var ax = AX6Util;
   * var myObject = {
   *    a:1, b:"2", c:{axj:"what", arrs:[0,2,"3"]},
   *    fn: function(abcdd){
   *        return abcdd;
   *    }
   * };
   * console.log( ax.toJson(myObject) );
   * ```
   */
  toJson: toJson,
  /**
   * 관용의 JSON Parser
   * @param {String} JSONString
   * @param {Boolean} [force] - 강제 적용 여부 (json 문자열 검사를 무시하고 오브젝트 변환을 시도합니다.)
   * @returns {Object}
   * @example
   * ```
   * console.log(AX6Util.parseJson('{"a":1}'));
   * // Object {a: 1}
   * console.log(AX6Util.parseJson("{'a':1, 'b':'b'}"));
   * // Object {a: 1, b: "b"}
   * console.log(AX6Util.parseJson("{'a':1, 'b':function(){return 1;}}", true));
   * // Object {a: 1, b: function}
   * console.log(AX6Util.parseJson("{a:1}"));
   * // Object {a: 1}
   * console.log(AX6Util.parseJson("[1,2,3]"));
   * // [1, 2, 3]
   * console.log(AX6Util.parseJson("['1','2','3']"));
   * // ["1", "2", "3"]
   * console.log(AX6Util.parseJson("[{'a':'99'},'2','3']"));
   * // [Object, "2", "3"]
   * ```
   */
  parseJson: parseJson,
  /**
   * 오브젝트의 첫번째 아이템을 반환합니다.
   * @param {Object|Array} O
   * @returns {Object}
   * @example
   * ```js
   * AX6Util.first({a:1, b:2});
   * // Object {a: 1}
   * AX6Util.first([1,2,3,4]);
   * // 1
   * ```
   */
  first: first,
  /**
   * 오브젝트의 마지막 아이템을 반환합니다.
   * @param {Object|Array} O
   * @returns {Object}
   * @example
   * ```js
   * AX6Util.last({a:1, b:2});
   * // Object {b: 2}
   * AX6Util.last([1,2,3,4]);
   * // 4
   * ```
   */
  last: last,
  /**
   * 문자열의 특정 문자열까지 잘라주거나 원하는 포지션까지 잘라줍니다.
   * @param {String} str - 문자열
   * @param {String|Number} pos - 찾을 문자열 또는 포지션
   * @returns {String}
   * @example
   * ```js
   * AX6Util.left("abcd.efd", 3);
   * // abc
   * AX6Util.left("abcd.efd", ".");
   * // abcd
   * ```
   */
  left: left,
  /**
   * 문자열의 특정 문자열까지 잘라주거나 원하는 포지션까지 잘라줍니다.
   * @param {String} str - 문자열
   * @param {String|Number} pos - 찾을 문자열 또는 포지션
   * @returns {String}
   * @example
   * ```js
   * AX6Util.right("abcd.efd", 3);
   * // efd
   * AX6Util.right("abcd.efd", ".");
   * // efd
   * ```
   */
  right: right,
  /**
   * 인자의 타입을 반환합니다.
   * @param {Object|Array|String|Number|Element|Etc} O
   * @returns {String} window|element|object|array|function|string|number|undefined|nodelist
   * @example
   * ```js
   * var axf = AX6Util;
   * var a = 11;
   * var b = "11";
   * console.log( axf.getType(a) );
   * console.log( axf.getType(b) );
   * ```
   */
  getType: getType,
  /**
   * 오브젝트가 window 인지 판단합니다.
   * @param {Object} O
   * @returns {Boolean}
   */
  isWindow: isWindow,
  /**
   * 오브젝트가 HTML 엘리먼트여부인지 판단합니다.
   * @param {Object} O
   * @returns {Boolean}
   */
  isElement: isElement,
  /**
   * 오브젝트가 Object인지 판단합니다.
   * @param {Object} O
   * @returns {Boolean}
   */
  isObject: isObject,
  /**
   * 오브젝트가 Array인지 판단합니다.
   * @param {Object} O
   * @returns {Boolean}
   */
  isArray: isArray,
  /**
   * 오브젝트가 Function인지 판단합니다.
   * @param {Object} O
   * @returns {Boolean}
   */
  isFunction: isFunction,
  /**
   * 오브젝트가 String인지 판단합니다.
   * @param {Object} O
   * @returns {Boolean}
   */
  isString: isString,
  /**
   * 오브젝트가 Number인지 판단합니다.
   * @param {Object} O
   * @returns {Boolean}
   */
  isNumber: isNumber,
  /**
   * 오브젝트가 NodeList인지 판단합니다.
   * @param {Object} O
   * @returns {Boolean}
   */
  isNodelist: isNodelist,
  /**
   * 오브젝트가 undefined인지 판단합니다.
   * @param {Object} O
   * @returns {Boolean}
   */
  isUndefined: isUndefined,
  /**
   * 오브젝트가 undefined이거나 null이거나 빈값인지 판단합니다.
   * @param {Object} O
   * @returns {Boolean}
   */
  /**
   * 오브젝트가 날자값인지 판단합니다.
   * @param {Date} O
   * @returns {Boolean}
   * @example
   * ```js
   * AX6Util.isDate('2016-09-30');
   * // false
   * AX6Util.isDate( new Date('2016-09-30') );
   * // true
   * ```
   */
  isDate: isDate,
  /**
   * 오브젝트가 날짜형 변수인지 판단합니다
   */
  isDateFormat: isDateFormat,
  isNothing: isNothing,
  /**
   * 쿠키를 설정합니다.
   * @param {String} cname - 쿠키이름
   * @param {String} cvalue - 쿠키값
   * @param {Number} [exdays] - 쿠키 유지일수
   * @param {Object} [opts] - path, domain 설정 옵션
   * @example
   * ```js
   * AX6Util.setCookie("jslib", "AX5");
   * AX6Util.setCookie("jslib", "AX5", 3);
   * AX6Util.setCookie("jslib", "AX5", 3, {path:"/", domain:".axisj.com"});
   * ```
   */
  setCookie: setCookie,
  /**
   * 쿠키를 가져옵니다.
   * @param {String} cname
   * @returns {String} cookie value
   * @example
   * ```js
   * AX6Util.getCookie("jslib");
   * ```
   */
  getCookie: getCookie,
  /**
   * css형 문자열이나 특수문자가 포함된 문자열을 카멜케이스로 바꾸어 반환합니다.
   * @param {String} str
   * @returns {String}
   * @example
   * ```js
   * AX6Util.camelCase("inner-width");
   * AX6Util.camelCase("innerWidth");
   * // innerWidth
   * ```
   */
  camelCase: camelCase,
  /**
   * css형 문자열이나 카멜케이스문자열을 스네이크 케이스 문자열로 바꾸어 반환합니다.
   * @param {String} str
   * @returns {String}
   * @example
   * ```js
   * AX6Util.snakeCase("innerWidth");
   * AX6Util.snakeCase("inner-Width");
   * AX6Util.snakeCase("innerWidth");
   * // inner-width
   * ```
   */
  snakeCase: snakeCase,
  /**
   * 문자열에서 -. 을 제외한 모든 문자열을 제거하고 숫자로 반환합니다. 옵션에 따라 원하는 형식의 숫자로 변환 할 수 도 있습니다.
   * @param {String|Number} str
   * @param {Object} cond - 옵션
   * @returns {String|Number}
   * @example
   * ```js
   * var cond = {
   * 	round: {Number|Boolean} - 반올림할 자릿수,
   * 	money: {Boolean} - 통화,
   * 	abs: {Boolean} - 절대값,
   * 	byte: {Boolean} - 바이트
   * }
   *
   * console.log(AX6Util.number(123456789.678, {round:1}));
   * console.log(AX6Util.number(123456789.678, {round:1, money:true}));
   * console.log(AX6Util.number(123456789.678, {round:2, byte:true}));
   * console.log(AX6Util.number(-123456789.8888, {abs:true, round:2, money:true}));
   * console.log(AX6Util.number("A-1234~~56789.8~888PX", {abs:true, round:2, money:true}));
   *
   * //123456789.7
   * //123,456,789.7
   * //117.7MB
   * //123,456,789.89
   * //123,456,789.89
   * ```
   */
  number: number,
  /**
   * 배열 비슷한 오브젝트를 배열로 변환해줍니다.
   * @param {Object|Elements|Arguments} O
   * @returns {Array}
   * @example
   * ```js
   * AX6Util.toArray(arguments);
   * //
   * ```
   */
  toArray: toArray,
  /**
   * 오브젝트를 파라미터형식으로 또는 파라미터를 오브젝트 형식으로 변환합니다.
   * @param {Object|Array|String} O
   * @param {String} [cond] - param|object
   * @returns {Object|String}
   * @example
   * ```
   * AX6Util.param({a:1,b:'1232'}, "param");
   * AX6Util.param("a=1&b=1232", "param");
   * // "a=1&b=1232"
   * AX6Util.param("a=1&b=1232");
   * // {a: "1", b: "1232"}
   * ```
   */
  param: param,
  error: error,
  /**
   * 날짜 형식의 문자열이나 Date객체를 조건에 맞게 처리 한 후 원하는 return 값으로 반환합니다.
   * @param {String|Date} d
   * @param {Object} cond
   * @returns {Date|String}
   * @example
   * ```js
   * AX6Util.date('2013-01-01'); // Tue Jan 01 2013 23:59:00 GMT+0900 (KST)
   * AX6Util.date((new Date()), {add:{d:10}, return:'yyyy/MM/dd'}); // "2015/07/01"
   * AX6Util.date('1919-03-01', {add:{d:10}, return:'yyyy/MM/dd hh:mm:ss'}); // "1919/03/11 23:59:00"
   * ```
   */
  date: date,
  /**
   * 인자인 날짜가 오늘부터 몇일전인지 반환합니다. 또는 인자인 날짜가 가까운 미래에 몇일 후인지 반환합니다.
   * @param {String|Data} d
   * @param {Object} cond
   * @returns {Number}
   * @example
   * ```js
   * AX6Util.dday('2016-01-29');
   * // 1
   * AX6Util.dday('2016-01-29', {today:'2016-01-28'});
   * // 1
   * AX6Util.dday('1977-03-29', {today:'2016-01-28', age:true});
   * // 39
   * ```
   */
  dday: dday,
  /**
   * 년월에 맞는 날자수를 반환합니다.
   * (new Date()).getMonth() 기준으로 월값을 보냅니다. "2월" 인경우 "1" 을 넘기게 됩니다.
   * @param {Number} y
   * @param {Number} m
   * @returns {Number}
   * @examples
   * ```js
   * AX6Util.daysOfMonth(2015, 11); // 31
   * AX6Util.daysOfMonth(2015, 1); // 28
   * ```
   */
  daysOfMonth: daysOfMonth,
  /**
   * 인자인 날짜가 몇년 몇월의 몇번째 주차인지 반환합니다.
   * @param {String|Data} d
   * @returns {Object}
   * @example
   * ```js
   * AX6Util.weeksOfMonth("2015-10-01"); // {year: 2015, month: 10, count: 1}
   * AX6Util.weeksOfMonth("2015-09-19"); // {year: 2015, month: 9, count: 3}
   * ```
   */
  weeksOfMonth: weeksOfMonth,
  /**
   * 원하는 횟수 만큼 자릿수 맞춤 문자열을 포함한 문자열을 반환합니다.
   * 문자열 길이보다 작은값을 보내면 무시됩니다.
   * @param {String|Number} num
   * @param {Number} length
   * @param {String} [padder=0]
   * @param {Number} [radix]
   * @returns {String}
   * @example
   * ```
   * AX6Util.setDigit(2016, 6)
   * // "002016"
   * AX6Util.setDigit(2016, 2)
   * // "2016"
   * ```
   */
  setDigit: setDigit,
  /**
   * 문자열을 지정된 수만큼 반복 합니다.
   * @param {String} s
   * @param {Number} count
   * @returns {string}
   * @example
   * ```
   * AX6Util.times(2016, 2)
   * //"20162016"
   * ```
   */
  times: times,
  /**
   * 타겟엘리먼트의 부모 엘리멘트 트리에서 원하는 조건의 엘리먼트를 얻습니다.
   * @param {Element} _target - target element
   * @param {Object|Function} cond - 원하는 element를 찾을 조건
   * @returns {Element}
   * @example
   * ```
   * // cond 속성정의
   * var cond = {
   * 	tagname: {String} - 태그명 (ex. a, div, span..),
   * 	clazz: {String} - 클래스명
   * 	[, 그 외 찾고 싶은 attribute명들]
   * };
   * console.log(
   * console.log(
   *    AX6Util.findParentNode(e.target, {tagname:"a", clazz:"ax-menu-handel", "data-custom-attr":"attr_value"})
   * );
   * // cond 함수로 처리하기
   * jQuery('#id').bind("click.app_expand", function(e){
   * 	var target = AX6Util.findParentNode(e.target, function(target){
   * 		if($(target).hasClass("aside")){
   * 			return true;
   * 		}
   * 		else{
   * 			return true;
   * 		}
   * 	});
   * 	//client-aside
   * 	if(target.id !== "client-aside"){
   * 		// some action
   * 	}
   * });
   * ```
   */
  findParentNode: findParentNode,
  /**
   * @param {String|Number} val
   * @returns {String}
   * @example
   * ```
   * console.log(AX6Util.cssNumber("100px"))
   * console.log(AX6Util.cssNumber("100%"))
   * console.log(AX6Util.cssNumber("100"))
   * console.log(AX6Util.cssNumber(100))
   * console.log(AX6Util.cssNumber("!!100@#"))
   * ```
   */
  cssNumber: cssNumber,
  /**
   * css string 및 object 를 넘기면 object 및 string 으로 변환되어 리턴됩니다.
   * @param {Object|String} val - CSS String or CSS Object
   * @returns {String|Object}
   * @example
   * ```
   * console.log(AX6Util.css({background: "#ccc", padding: "50px", width: "100px"}));
   * //"background:#ccc;padding:50px;width:100px;"
   * console.log(AX6Util.css('width:100px;padding: 50px; background: #ccc'));
   * // object {width: "100px", padding: "50px", background: "#ccc"}
   * ```
   */
  css: css,
  /**
   * @param {Event} e
   * @example
   * ```
   * AX6Util.stopEvent(e);
   * ```
   */
  stopEvent: stopEvent,
  /**
   * @param {Element} el
   * @param {Element} offset
   * @example
   * ```
   * AX6Util.selectRange($("#select-test-0")); // selectAll
   * AX6Util.selectRange($("#select-test-0"), "selectAll"); //selectAll
   * AX6Util.selectRange($("#select-test-0"), "start"); // focus on start
   * AX6Util.selectRange($("#select-test-0"), "end"); // focus on end
   * AX6Util.selectRange($("#select-test-0"), [1, 5]); // select 1~5
   * ```
   */
  selectRange: selectRange,
  /**
   * 지정한 시간을 지연시켜 함수를 실행합니다.
   * @param {Function} func
   * @param {Number} wait
   * @param {Object} options
   * @returns {debounced}
   * @example
   * ```js
   * // https://github.com/lodash/lodash/blob/master/debounce.js
   * var debounceFn = AX6Util.debounce(function( val ) { console.log(val); }, 300);
   * $(document.body).click(function(){
         *  debounceFn(new Date());
         * });
   * ```
   */
  debounce: debounce,
  /**
   * @param func
   * @param wait
   * @param options
   * @return {throttled}
   * @example
   * ```js
   * //https://github.com/lodash/lodash/blob/master/throttle.js
   * var throttleFn = AX6Util.throttle(function( val ) { console.log(val); }, 300);
   * $(window).scroll(function(){
     *      throttleFn(new Date());
     * });
   * ```
   */
  throttle: throttle,
  /**
   * @param {Object} obj
   * @returns {Object}
   * @example
   * ```js
   * var obj = [
   *  {name:"A", child:[{name:"a-1"}]},
   *  {name:"B", child:[{name:"b-1"}], callBack: function(){ console.log('callBack'); }}
   * ];
   * var copiedObj = AX6Util.deepCopy(obj)
   * ```
   */
  deepCopy: deepCopy,
  /**
   * HTML 문자열을 escape 처리합니다.
   * "&lt;" represents the < sign.
   * "&gt;" represents the > sign.
   * "&amp;" represents the & sign.
   * "&quot; represents the " mark.
   * [Character entity references](https://www.w3.org/TR/html401/charset.html#h-5.3)
   * @param {String} s
   * @returns {string}
   * @example
   * ```
   * AX6Util.escapeHtml('HTML <span>string</span> & "escape"')
   * //"HTML &lt;span&gt;string&lt;/span&gt; &amp; &quot;escape&quot;"
   * ```
   */
  escapeHtml: escapeHtml,
  /**
   * HTML 문자열을 unescape 처리합니다.
   * escapeHtml를 참고하세요.
   * @param {String} s
   * @returns {string}
   * @example
   * ```
   * AX6Util.unescapeHtml('HTML &lt;span&gt;string&lt;/span&gt; &amp; &quot;escape&quot;')
   * //"HTML <span>string</span> & "escape""
   * ```
   */
  unescapeHtml: unescapeHtml,
  /**
   * @param {String} tmpl
   * @param {*} args
   * @return {ax6string}
   * @example
   * ```js
   * AX6Util.string("{0} is dead, but {1} is alive! {0} {2}").format("ASP", "ASP.NET");
   * AX6Util.string("{0} is dead, but {1} is alive! {0} {2}").format(["ASP", "ASP.NET"]);
   * AX6Util.stinrg("{0} counts").format(100);
   * ```
   */
  string: string,
  /**
   * @param _hexColor
   * @return {ax5color}
   * @example
   * ```js
   * AX6Util.color("#ff3300").lighten(10).getHexValue()
   * console.log(AX6Util.color("#ff3300").darken(10).getHexValue());
   * ```
   */
  color: color
};

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var win = window;
var doc = win ? win.document : null;
var docElem = win ? win.document.documentElement : null;

var onerror = function onerror() {
  console.error(arguments);
};

var eventKeys = {
  BACKSPACE: 8, TAB: 9,
  RETURN: 13, ESC: 27, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, DELETE: 46,
  HOME: 36, END: 35, PAGEUP: 33, PAGEDOWN: 34, INSERT: 45, SPACE: 32
};

var weekNames = [{ label: "SUN" }, { label: "MON" }, { label: "TUE" }, { label: "WED" }, { label: "THU" }, { label: "FRI" }, { label: "SAT" }];

var browser = function (ua, mobile, browserName, match, browser, browserVersion) {
  if (!win || !win.navigator) return {};

  ua = navigator.userAgent.toLowerCase(), mobile = ua.search(/mobile/g) != -1, browserName, match, browser, browserVersion;

  if (ua.search(/iphone/g) != -1) {
    return { name: "iphone", version: 0, mobile: true };
  } else if (ua.search(/ipad/g) != -1) {
    return { name: "ipad", version: 0, mobile: true };
  } else if (ua.search(/android/g) != -1) {
    match = /(android)[ \/]([\w.]+)/.exec(ua) || [];
    browserVersion = match[2] || "0";
    return { name: "android", version: browserVersion, mobile: mobile };
  } else {
    browserName = "";
    match = /(opr)[ \/]([\w.]+)/.exec(ua) || /(chrome)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
    browser = match[1] || "";
    browserVersion = match[2] || "0";

    if (browser == "msie") browser = "ie";
    return {
      name: browser,
      version: browserVersion,
      mobile: mobile
    };
  }
  ua = null, mobile = null, browserName = null, match = null, browser = null, browserVersion = null;
}();

var isBrowser = !!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && win.document);

var wheelEnm = win && /Firefox/i.test(navigator.userAgent) ? "DOMMouseScroll" : "mousewheel";

var errorMsg = {};

var urlUtil = function urlUtil(url, urls) {
  url = {
    href: win.location.href,
    param: win.location.search,
    referrer: doc.referrer,
    pathname: win.location.pathname,
    hostname: win.location.hostname,
    port: win.location.port
  };
  urls = url.href.split(/[\?#]/);
  url.param = url.param.replace("?", "");
  url.url = urls[0];
  if (url.href.search("#") > -1) {
    url.hashdata = urls[urls.length - 1];
  }
  urls = null;
  url.baseUrl = url.href.substr(0, url.href.indexOf("?")).replace(url.pathname, "");

  return url;
};

var getError = function getError(className, errorCode, methodName) {
  if (errorMsg && errorMsg[className]) {
    return {
      className: className,
      errorCode: errorCode,
      methodName: methodName,
      msg: errorMsg[className][errorCode]
    };
  } else {
    return { className: className, errorCode: errorCode, methodName: methodName };
  }
};

var supportTouch = win ? 'ontouchstart' in win || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 : false;

var supportFileApi = win ? win.FileReader && win.File && win.FileList && win.Blob : false;

/**
 * @module AX6Info
 */
exports.default = {
  /**
   * 첫번째 자리수 동사 - (필요한것이 없을때 : 4, 실행오류 : 5)
   * 두번째 자리수 목적어 - 문자열 0, 숫자 1, 배열 2, 오브젝트 3, 함수 4, DOM 5, 파일 6, 기타 7
   * 세번째 자리수 옵션
   */
  errorMsg: errorMsg,
  /**
   * 에러 출력메세지 사용자 재 정의
   * @example
   * ```
   * AX6Info.onerror = function(){
     *  console.log(arguments);
     * }
   * ```
   */
  onerror: onerror,
  /**
   * event keyCodes
   * @example
   * ```
   * {
   * 	BACKSPACE: 8, TAB: 9,
   * 	RETURN: 13, ESC: 27, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, DELETE: 46,
   * 	HOME: 36, END: 35, PAGEUP: 33, PAGEDOWN: 34, INSERT: 45, SPACE: 32
   * }
   * ```
   */
  eventKeys: eventKeys,
  /**
   * week names
   * @example
   * ```
   * [
   *  {label: "SUN"},{label: "MON"},{label: "TUE"},{label: "WED"},{label: "THU"},{label: "FRI"},{label: "SAT"}
   * ]
   * console.log( weekNames[0] );
   * console.log( AX6Info.weekNames[(new Date()).getDay()].label )
   * ```
   */
  weekNames: weekNames,
  /**
   * 사용자 브라우저 식별용 오브젝트
   * @example
   * ```
   * console.log( AX6Info.browser );
   * //Object {name: "chrome", version: "39.0.2171.71", mobile: false}
   * ```
   */
  browser: browser,
  /**
   * 브라우저 여부
   */
  isBrowser: isBrowser,
  /**
   * 브라우져의 터치 가능 유무를 확인합니다.
   * @returns {boolean}
   * @example
   * ```
   * var chkFlag = AX6Info.supportTouch;
   */
  supportTouch: supportTouch,
  /**
   * HTML5 FileApi 지원여부
   */
  supportFileApi: supportFileApi,
  /**
   * 브라우저에 따른 마우스 휠 이벤트이름
   */
  wheelEnm: wheelEnm,
  /**
   * 현재 페이지의 Url 정보를 리턴합니다.
   * @example
   * ```
   * console.log( ax5.util.toJson( AX6Info.urlUtil() ) );
   * {
   *	"baseUrl": "http://ax5:2018",
   *	"href": "http://ax5:2018/samples/index.html?a=1&b=1#abc",
   *	"param": "a=1&b=1",
   *	"referrer": "",
   *	"pathname": "/samples/index.html",
   *	"hostname": "ax5",
   *	"port": "2018",
   *	"url": "http://ax5:2018/samples/index.html",
   *	"hashdata": "abc"
   * }
   * ```
   */
  urlUtil: urlUtil,
  /**
   * ax5-error-msg.js 에 정의된 ax5 error를 반환합니다.
   * @returns {Object}
   * @example
   * ```
   * console.log( AX6Info.getError("single-uploader", "460", "upload") );
   *
   * if(!this.selectedFile){
   *      if (cfg.onEvent) {
   *      	var that = {
   *      		action: "error",
   *      		error: AX6Info.getError("single-uploader", "460", "upload")
   *      	};
   *      	cfg.onEvent.call(that, that);
   *      }
   *      return this;
   * }
   * ```
   */
  getError: getError
};

/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery JavaScript Library v3.2.2 -ajax,-ajax/jsonp,-ajax/load,-ajax/parseXML,-ajax/script,-ajax/var/location,-ajax/var/nonce,-ajax/var/rquery,-ajax/xhr,-manipulation/_evalUrl,-event/ajax,-attributes/prop,-attributes/support,-deprecated,-effects,-effects/Tween,-effects/animatedSelector,-wrap,-deferred,-deferred/exceptionHook,-queue,-queue/delay,-core/ready,-event/focusin,-event/alias,-css/showHide,-css/hiddenVisibleSelectors
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2017-07-14T08:07Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};




	function DOMEval( code, doc ) {
		doc = doc || document;

		var script = doc.createElement( "script" );

		script.text = code;
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.2.2 -ajax,-ajax/jsonp,-ajax/load,-ajax/parseXML,-ajax/script,-ajax/var/location,-ajax/var/nonce,-ajax/var/rquery,-ajax/xhr,-manipulation/_evalUrl,-event/ajax,-attributes/prop,-attributes/support,-deprecated,-effects,-effects/Tween,-effects/animatedSelector,-wrap,-deferred,-deferred/exceptionHook,-queue,-queue/delay,-core/ready,-event/focusin,-event/alias,-css/showHide,-css/hiddenVisibleSelectors",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {

		// Support: Chrome <=57, Firefox <=52
		// In some browsers, typeof returns "function" for HTML <object> elements
		// (i.e., `typeof document.createElement( "object" ) === "function"`).
		// We don't want to classify *any* DOM node as a function.
		return typeof obj === "function" && typeof obj.nodeType !== "number";
	},

	isNumeric: function( obj ) {

		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN( obj - parseFloat( obj ) );
	},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 15
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( jQuery.isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var documentElement = document.documentElement;



/*
 * Optional (non-Sizzle) selector module for custom builds.
 *
 * Note that this DOES NOT SUPPORT many documented jQuery
 * features in exchange for its smaller size:
 *
 * Attribute not equal selector
 * Positional selectors (:first; :eq(n); :odd; etc.)
 * Type selectors (:input; :checkbox; :button; etc.)
 * State-based selectors (:animated; :visible; :hidden; etc.)
 * :has(selector)
 * :not(complex selector)
 * custom selectors via Sizzle extensions
 * Leading combinators (e.g., $collection.find("> *"))
 * Reliable functionality on XML fragments
 * Requiring all parts of a selector to match elements under context
 *   (e.g., $div.find("div > *") now matches children of $div)
 * Matching against non-elements
 * Reliable sorting of disconnected nodes
 * querySelectorAll bug fixes (e.g., unreliable :focus on WebKit)
 *
 * If any of these are unacceptable tradeoffs, either use Sizzle or
 * customize this stub for the project's specific needs.
 */

var hasDuplicate, sortInput,
	sortStable = jQuery.expando.split( "" ).sort( sortOrder ).join( "" ) === jQuery.expando,
	matches = documentElement.matches ||
		documentElement.webkitMatchesSelector ||
		documentElement.mozMatchesSelector ||
		documentElement.oMatchesSelector ||
		documentElement.msMatchesSelector,

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	};

function sortOrder( a, b ) {

	// Flag for duplicate removal
	if ( a === b ) {
		hasDuplicate = true;
		return 0;
	}

	// Sort on method existence if only one input has compareDocumentPosition
	var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
	if ( compare ) {
		return compare;
	}

	// Calculate position if both inputs belong to the same document
	compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
		a.compareDocumentPosition( b ) :

		// Otherwise we know they are disconnected
		1;

	// Disconnected nodes
	if ( compare & 1 ) {

		// Choose the first element that is related to our preferred document
		if ( a === document || a.ownerDocument === document &&
			jQuery.contains( document, a ) ) {
			return -1;
		}
		if ( b === document || b.ownerDocument === document &&
			jQuery.contains( document, b ) ) {
			return 1;
		}

		// Maintain original order
		return sortInput ?
			( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
			0;
	}

	return compare & 4 ? -1 : 1;
}

function uniqueSort( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	hasDuplicate = false;
	sortInput = !sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( ( elem = results[ i++ ] ) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
}

function escape( sel ) {
	return ( sel + "" ).replace( rcssescape, fcssescape );
}

jQuery.extend( {
	uniqueSort: uniqueSort,
	unique: uniqueSort,
	escapeSelector: escape,
	find: function( selector, context, results, seed ) {
		var elem, nodeType,
			i = 0;

		results = results || [];
		context = context || document;

		// Same basic safeguard as Sizzle
		if ( !selector || typeof selector !== "string" ) {
			return results;
		}

		// Early return if context is not an element or document
		if ( ( nodeType = context.nodeType ) !== 1 && nodeType !== 9 ) {
			return [];
		}

		if ( seed ) {
			while ( ( elem = seed[ i++ ] ) ) {
				if ( jQuery.find.matchesSelector( elem, selector ) ) {
					results.push( elem );
				}
			}
		} else {
			jQuery.merge( results, context.querySelectorAll( selector ) );
		}

		return results;
	},
	text: function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;

		if ( !nodeType ) {

			// If no nodeType, this is expected to be an array
			while ( ( node = elem[ i++ ] ) ) {

				// Do not traverse comment nodes
				ret += jQuery.text( node );
			}
		} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {

			// Use textContent for elements
			return elem.textContent;
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}

		// Do not include comment or processing instruction nodes

		return ret;
	},
	contains: function( a, b ) {
		var adown = a.nodeType === 9 ? a.documentElement : a,
			bup = b && b.parentNode;
		return a === bup || !!( bup && bup.nodeType === 1 && adown.contains( bup ) );
	},
	isXMLDoc: function( elem ) {

		// documentElement is verified for cases where it doesn't yet exist
		// (such as loading iframes in IE - #4833)
		var documentElement = elem && ( elem.ownerDocument || elem ).documentElement;
		return documentElement ? documentElement.nodeName !== "HTML" : false;
	},
	expr: {
		attrHandle: {},
		match: {
			bool: new RegExp( "^(?:checked|selected|async|autofocus|autoplay|controls|defer" +
				"|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)$", "i" ),
			needsContext: /^[\x20\t\r\n\f]*[>+~]/
		}
	}
} );

jQuery.extend( jQuery.find, {
	matches: function( expr, elements ) {
		return jQuery.find( expr, null, null, elements );
	},
	matchesSelector: function( elem, expr ) {
		return matches.call( elem, expr );
	},
	attr: function( elem, name ) {
		var fn = jQuery.expr.attrHandle[ name.toLowerCase() ],

			// Don't get fooled by Object.prototype properties (jQuery #13807)
			value = fn && hasOwn.call( jQuery.expr.attrHandle, name.toLowerCase() ) ?
				fn( elem, name, jQuery.isXMLDoc( elem ) ) :
				undefined;
		return value !== undefined ? value : elem.getAttribute( name );
	}
} );



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Simple selector that can be filtered directly, removing non-Elements
	if ( risSimple.test( qualifier ) ) {
		return jQuery.filter( qualifier, elements, not );
	}

	// Complex selector, compare the two sets, removing non-Elements
	qualifier = jQuery.filter( qualifier, elements );
	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ jQuery.camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ jQuery.camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( jQuery.camelCase );
			} else {
				key = jQuery.camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: jQuery.isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( ">tbody", elem )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		div.style.cssText =
			"box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "5px";

		// Support: IE 9 only
		// Detect misreporting of content dimensions for border-box elements (gh-3699)
		borderBoxReliableVal = divStyle.width[ 0 ] === "5";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "5px";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	var pixelPositionVal, boxSizingReliableVal, borderBoxReliableVal, pixelMarginRightVal,
		reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:10px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	jQuery.extend( support, {
		borderBoxReliable: function() {
			computeStyleTests();
			return borderBoxReliableVal;
		},
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		pixelMarginRight: function() {
			computeStyleTests();
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5
		) );
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),
		val = curCSS( elem, dimension, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox;

	// Computed unit is not pixels. Stop here and return.
	if ( rnumnonpx.test( val ) ) {
		return val;
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = valueIsBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ dimension ] );

	// Fall back to offsetWidth/Height when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	if ( val === "auto" ) {
		val = elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ];
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),
				isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra && boxModelAdjustment(
					elem,
					dimension,
					extra,
					isBorderBox,
					styles
				);

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && !support.borderBoxReliable() ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnothtmlwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


support.focusin = "onfocusin" in window;


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( true ) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
		return jQuery;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}





var readyCallbacks = [],
	whenReady = function( fn ) {
		readyCallbacks.push( fn );
	},
	executeReady = function( fn ) {

		// Prevent errors from freezing future callback execution (gh-1823)
		// Not backwards-compatible as this does not execute sync
		window.setTimeout( function() {
			fn.call( document, jQuery );
		} );
	};

jQuery.fn.ready = function( fn ) {
	whenReady( fn );
	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		whenReady = function( fn ) {
			readyCallbacks.push( fn );

			while ( readyCallbacks.length ) {
				fn = readyCallbacks.shift();
				if ( jQuery.isFunction( fn ) ) {
					executeReady( fn );
				}
			}
		};

		whenReady();
	}
} );

// Make jQuery.ready Promise consumable (gh-1778)
jQuery.ready.then = jQuery.fn.ready;

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE9-10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}



return jQuery;
} );


/***/ }),

/***/ 78:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jqmin = __webpack_require__(7);

var _jqmin2 = _interopRequireDefault(_jqmin);

var _AX6Util = __webpack_require__(1);

var _AX6Util2 = _interopRequireDefault(_AX6Util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $el = (0, _jqmin2.default)('<div id="test-target"></div>');

//$el.append('<p>' + info + '</p>');

function describe(state, fn) {
  // console.log(state);
  $el.append('<h2>' + state + '</h2>');
  $el.append('<div>');
  fn();
  $el.append('</div>');
}

function it(state, fn) {
  $el.append('<span>' + state + '</span>');

  var result = fn(function () {
    $el.append('<span> : ' + _AX6Util2.default.toArray(arguments).join(",") + '</span>');
  });

  if (typeof result != "undefined") {
    $el.append('<p>' + result + '</p>');
  }

  $el.append('<br/>');
}

function equal(actual, expected) {

  if (actual.toString() == expected.toString()) {
    return "<span style='color:blue;'>ok</span>";
  } else {
    return "<span style='color:red;'>not equal (" + actual + "," + expected + ")</span>";
  }
}

describe('util.date TEST', function () {
  it('util.date("2013-01-01")', function (done) {
    var date = new Date(2013, 0, 1);
    date.setHours(12);
    date.setMinutes(0);
    done(equal(_AX6Util2.default.date('2013-01-01'), date));
  });

  //Usage 02
  it('util.date((new Date()) , {add:{d:10} , return:"yyyy/MM/dd"})', function (done) {
    var date = new Date();
    date.setDate(date.getDate() + 10);
    var str = date.getFullYear() + "/" + _AX6Util2.default.setDigit(date.getMonth() + 1, 2) + "/" + _AX6Util2.default.setDigit(date.getDate(), 2);

    done(equal(_AX6Util2.default.date(new Date(), { add: { d: 10 }, return: 'yyyy/MM/dd' }), str));
  });

  //Usage 03
  it('util.date("1919-03-01", {add:{d:10}, return:"yyyy/MM/dd hh:mm:ss"})', function (done) {
    done(equal(_AX6Util2.default.date("1919-03-01", {
      add: { d: 10 },
      return: "yyyy/MM/dd hh:mm:ss"
    }), '1919/03/11 12:00:00'));
  });

  //Usage 04
  it('util.date((new Date()) , {set:"firstDayOfMonth", return:"yyyy/MM/dd"})', function (done) {
    var date = new Date();
    var str = date.getFullYear() + "/" + _AX6Util2.default.setDigit(date.getMonth() + 1, 2) + "/01";
    done(equal(_AX6Util2.default.date(new Date(), { set: "firstDayOfMonth", return: 'yyyy/MM/dd' }), str));
  });

  //Usage 05
  it('util.date((new Date()) , {set:"lastDayOfMonth", return:"yyyy/MM/dd"})', function (done) {
    var date = new Date();
    var str = date.getFullYear() + "/" + _AX6Util2.default.setDigit(date.getMonth() + 1, 2) + "/" + _AX6Util2.default.daysOfMonth(date.getFullYear(), date.getMonth());
    done(equal(_AX6Util2.default.date(new Date(), { set: "lastDayOfMonth", return: 'yyyy/MM/dd' }), str));
  });

  //Usage 06
  it('util.date("")', function (done) {
    var date = new Date();
    done(equal(_AX6Util2.default.date(""), date));
  });

  //Usage 07
  it('util.date("1979-12-16T09:00:00") [string.length > 15]', function (done) {
    var date = new Date();
    date.setFullYear(1979, 11, 16);
    date.setHours(9, 0, 0, 0);

    done(equal(_AX6Util2.default.date("1979-12-16T09:00:00"), date));
  });

  //Usage 08
  it('util.date("20170411103317") [string.length == 14]', function (done) {
    var date = new Date(2017, 3, 11);
    date.setHours(10);
    date.setMinutes(33);
    date.setSeconds(17);
    done(equal(_AX6Util2.default.date("20170411103317"), date));
  });

  //Usage 09
  it('util.date("201704") [string.length > 7]', function (done) {
    var date = new Date(2017, 3, 12);
    date.setHours(12);
    done(equal(_AX6Util2.default.date("20170412"), date));
  });

  //Usage 10
  it('util.date("201704") [string.length > 4]', function (done) {
    var date = new Date(2017, 3);
    date.setHours(12);
    done(equal(_AX6Util2.default.date("201704"), date));
  });

  //Usage 11
  it('util.date("2017") [string.length > 2]', function (done) {
    var date = new Date(2017, 0);
    date.setHours(12);
    done(equal(_AX6Util2.default.date("2017"), date));
  });

  //Usage 12
  it('util.date("17") [string.length <= 2]', function (done) {
    var date = new Date();
    done(equal(_AX6Util2.default.date("17"), date));
  });

  //Usage 13
  it('util.date(date, {return: "yyyy-MM-dd"})', function (done) {
    var date = new Date(2017, 3, 16);
    done(equal(_AX6Util2.default.date(date, { return: "yyyy-MM-dd" }), "2017-04-16"));
  });

  //Usage 14
  it('util.date(date, {return: "yyyy-MM-dd hh:mm:ss"})', function (done) {
    var date = new Date(2017, 3, 16, 12, 30, 15);
    done(equal(_AX6Util2.default.date(date, { return: "yyyy-MM-dd hh:mm:ss" }), "2017-04-16 12:30:15"));
  });

  //Usage 15
  it('util.date(date, {return: "dw"})', function (done) {
    var date = new Date(2017, 3, 16);
    done(equal(_AX6Util2.default.date(date, { return: "dw" }), "SUN"));
  });

  //Usage 16
  it('util.date("2017-04-17 11:00:00", {add: {h: 1}})', function (done) {
    var date = new Date(2017, 3, 17, 12);
    done(equal(_AX6Util2.default.date("2017-04-17 11:00:00", { add: { h: 1 } }), date));
  });

  //Usage 17
  it('util.date("2017-04-17 11:00:00", {add: {h: 1}})', function (done) {
    var date = new Date(2017, 3, 17, 12);
    done(equal(_AX6Util2.default.date("2017-04-17 11:00:00", { add: { h: 1 } }), date));
  });

  //Usage 18
  it('util.date("2017-06-17 01:55:00", {add: {h: 1}})', function (done) {
    var date = new Date(2017, 5, 17, 2, 55);
    done(equal(_AX6Util2.default.date("2017-06-17 01:55:00", { add: { h: 1 } }), date));
  });

  //Usage 19
  it('util.date("2017-04-16", {add: {d: 1}})', function (done) {
    var date = new Date(2017, 3, 17, 12);
    done(equal(_AX6Util2.default.date("2017-04-16", { add: { d: 1 } }), date));
  });

  //Usage 20
  it('util.date("2017-05-16", {add: {m: 1}})', function (done) {
    var date = new Date(2017, 5, 16, 12);
    done(equal(_AX6Util2.default.date("2017-05-16", { add: { m: 1 } }), date));
  });

  //Usage 21
  it('util.date("2017-04-22", {add: {y: 1}})', function (done) {
    var date = new Date(2018, 3, 22, 12);
    done(equal(_AX6Util2.default.date("2017-04-22", { add: { y: 1 } }), date));
  });

  //Usage 22
  it('util.date("2016-04-23", {add: {d: 1.5}, return: "dd"})', function (done) {
    var str = "25";
    done(equal(_AX6Util2.default.date("2016-04-23", { add: { d: 1.5 }, return: "dd" }), str));
  });

  /* end util.date */
});

describe('util.number TEST', function () {
  var testCases = [{
    args: [123456789.678, {
      round: 1
    }],
    expect: 123456789.7,
    explanation: 123456789.678 + ', { round: 1 }'
  }, {
    args: [123456789.678, {
      round: 1,
      money: true
    }],
    expect: '123,456,789.7',
    explanation: 123456789.678 + ', { round: 1, money: true }'
  }, {
    args: [123456789.678, {
      round: 2,
      byte: true
    }],
    expect: '117.7MB',
    explanation: 123456789.678 + ', { round: 2, byte: true }'
  }, {
    args: [-123456789.678, {
      abs: true,
      round: 2,
      money: true
    }],
    expect: '123,456,789.68',
    explanation: -123456789.678 + ',{ abs: true, round: 2, money: true }'
  }, {
    args: [-123456789.678, {
      abs: true,
      ceil: true,
      money: true
    }],
    expect: '123,456,790',
    explanation: -123456789.678 + ',{ abs: true, ceil: true, money: true }'
  }, {
    args: [-123456789.678, {
      abs: true,
      floor: true,
      money: true
    }],
    expect: '123,456,789',
    explanation: -123456789.678 + ',{ abs: true, floor: true, money: true }'
  }, {
    args: [1023, {
      byte: true
    }],
    expect: '1KB',
    explanation: 1023 + ',{byte: true}'
  }, {
    args: [1024 * 1024, {
      byte: true
    }],
    expect: '1024KB',
    explanation: 1024 * 1024 + ',{byte: true}'
  }, {
    args: [1024 * 1024 * 5, {
      byte: true
    }],
    expect: '5MB',
    explanation: 1024 * 1024 * 5 + ',{byte: true}'
  }, {
    args: [1024 * 1024 * 1024, {
      byte: true
    }],
    expect: '1024MB',
    explanation: 1024 * 1024 * 1024 + ',{byte: true}'
  }, {
    args: [1024 * 1024 * 1024 * 5, {
      byte: true
    }],
    expect: '5GB',
    explanation: 1024 * 1024 * 1024 + ',{byte: true}'
  }, {
    args: ['A-1234~~56789.8~888PX', {
      abs: true,
      round: 2,
      money: true
    }],
    expect: '123,456,789.89',
    explanation: 'A-1234~~56789.8~888PX , { abs: true, round: 2, money: true }'
  }];
  testCases.forEach(function (testCase) {
    it('util.number(' + testCase.explanation + ') expect ' + testCase.expect, function (done) {
      var actual = _AX6Util2.default.number.apply(this, testCase.args);
      done(equal(actual, testCase.expect));
    });
  });
});

(0, _jqmin2.default)("#sample-body").append($el);

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODE5NGU2ZjJlYTlhY2I1NjQxYTEiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9BWDZVdGlsLmpzIiwid2VicGFjazovLy8uLi9zcmMvQVg2SW5mby5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvanFtaW4vanF1ZXJ5LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJfdG9TdHJpbmciLCJPYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsInJlSXNKc29uIiwicmVNcyIsInJlU25ha2VDYXNlIiwicmVDYW1lbENhc2UiLCJyZURvdCIsInJlSW50IiwicmVOb3ROdW0iLCJyZU1vbmV5U3BsaXQiLCJSZWdFeHAiLCJyZUFtcCIsInJlRXEiLCJyZUNsYXNzTmFtZVNwbGl0IiwiZWFjaCIsIk8iLCJfZm4iLCJpc05vdGhpbmciLCJrZXkiLCJpIiwibCIsImxlbmd0aCIsImlzT2JqIiwidW5kZWZpbmVkIiwiY2FsbCIsInNlYXJjaCIsImlzT2JqZWN0IiwiaXNGdW5jdGlvbiIsImZpbHRlciIsImsiLCJyZXN1bHRzIiwiZm5SZXN1bHQiLCJwdXNoIiwidG9Kc29uIiwianNvblN0cmluZyIsImlzQXJyYXkiLCJqc29uT2JqZWN0Qm9keSIsInZhbHVlIiwiam9pbiIsImlzU3RyaW5nIiwiaXNOdW1iZXIiLCJpc1VuZGVmaW5lZCIsInBhcnNlSnNvbiIsInN0ciIsImZvcmNlIiwidGVzdCIsIkZ1bmN0aW9uIiwiZSIsImVycm9yIiwibXNnIiwiZ2V0VHlwZSIsInR5cGVOYW1lIiwid2luZG93Iiwibm9kZVR5cGUiLCJpc1dpbmRvdyIsImlzRWxlbWVudCIsImlzTm9kZWxpc3QiLCJpc0RhdGUiLCJEYXRlIiwiaXNOYU4iLCJ2YWx1ZU9mIiwiaXNEYXRlRm9ybWF0IiwicmVzdWx0IiwiZGF0ZSIsInJlcGxhY2UiLCJtbSIsInN1YnN0ciIsImRkIiwiZ2V0TW9udGgiLCJnZXREYXRlIiwiZmlyc3QiLCJrZXlzIiwiaXRlbSIsImNvbnNvbGUiLCJsYXN0Iiwic2V0Q29va2llIiwiY24iLCJjdiIsImV4ZGF5cyIsIm9wdHMiLCJleHBpcmUiLCJzZXREYXRlIiwiZG9jIiwiY29va2llIiwiZXNjYXBlIiwidG9VVENTdHJpbmciLCJwYXRoIiwiZG9tYWluIiwic2VjdXJlIiwiZ2V0Q29va2llIiwiY25hbWUiLCJuYW1lIiwiY2EiLCJzcGxpdCIsImMiLCJjaGFyQXQiLCJzdWJzdHJpbmciLCJpbmRleE9mIiwidW5lc2NhcGUiLCJhbGVydCIsIndpbiIsImxlZnQiLCJwb3MiLCJyaWdodCIsImxhc3RJbmRleE9mIiwiY2FtZWxDYXNlIiwiYWxsIiwibGV0dGVyIiwidG9VcHBlckNhc2UiLCJzbmFrZUNhc2UiLCJ0b0xvd2VyQ2FzZSIsIm51bWJlciIsImNvbmQiLCJwYWlyIiwiaXNNaW51cyIsInJldHVyblZhbHVlIiwiTnVtYmVyIiwiTWF0aCIsInJvdW5kIiwiYWJzIiwiZmxvb3IiLCJjZWlsIiwidmFsIiwidHh0TnVtYmVyIiwiYXJyTnVtYmVyIiwiblVuaXQiLCJteUJ5dGUiLCJ0b0FycmF5IiwiQXJyYXkiLCJzbGljZSIsInBhcmFtIiwicCIsInYiLCJlbmNvZGUiLCJzIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiZGVjb2RlIiwiZGVjb2RlVVJJQ29tcG9uZW50Iiwib25lcnJvciIsImFwcGx5IiwiYXJndW1lbnRzIiwibG9jYWxEYXRlIiwieXkiLCJoaCIsIm1pIiwic3MiLCJ1dGNEIiwibG9jYWxEIiwiVVRDIiwiZ2V0VVRDSG91cnMiLCJnZXRUaW1lem9uZU9mZnNldCIsInNldFVUQ0hvdXJzIiwiZCIsImFEYXRlVGltZSIsImFUaW1lcyIsImFUaW1lIiwiYURhdGUiLCJ2YSIsIklTT184NjAxIiwiSVNPXzg2MDFfRlVMTCIsInBhcnNlRmxvYXQiLCJfZCIsIm14ZGQiLCJEeU1pbGxpIiwic2V0VGltZSIsImdldFRpbWUiLCJnZXRGdWxsWWVhciIsInBhcnNlSW50IiwiZGF5c09mTW9udGgiLCJwcm9jZXNzb3IiLCJmU3RyIiwiblkiLCJuTSIsIm5EIiwibkgiLCJuTU0iLCJuUyIsIm5EVyIsInlyZSIsInJlZ1kiLCJtcmUiLCJyZWdNIiwiZHJlIiwicmVnRCIsImhyZSIsInJlZ0giLCJtaXJlIiwicmVnTUkiLCJzcmUiLCJyZWdTIiwiZHdyZSIsInJlZ0RXIiwiZ2V0VVRDRnVsbFllYXIiLCJzZXREaWdpdCIsImdldEhvdXJzIiwiZ2V0TWludXRlcyIsImdldFNlY29uZHMiLCJnZXREYXkiLCJleGVjIiwiJDEiLCJ3ZWVrTmFtZXMiLCJsYWJlbCIsImRkYXkiLCJtZW1vcnlEYXkiLCJ0b2RheSIsImRpZmZudW0iLCJ0aGlzWWVhck1lbW9yeURheSIsImdldERheVRpbWUiLCJ3ZWVrc09mTW9udGgiLCJteURhdGUiLCJ5ZWFyIiwibW9udGgiLCJjb3VudCIsInkiLCJtIiwibnVtIiwicGFkZGVyIiwicmFkaXgiLCJ0aW1lcyIsImZpbmRQYXJlbnROb2RlIiwiX3RhcmdldCIsInBhcmVudE5vZGUiLCJ0YWdOYW1lIiwidG9Mb2NhbGVMb3dlckNhc2UiLCJrbGFzc3MiLCJjbGFzc05hbWUiLCJoYXNDbGFzcyIsImEiLCJnZXRBdHRyaWJ1dGUiLCJjc3NOdW1iZXIiLCJyZSIsImZvdW5kIiwibWF0Y2giLCJ1bml0IiwiY3NzIiwicmV0dXJucyIsInZhbFNwbGl0ZWQiLCJmb3JFYWNoIiwidHJpbSIsInZTcGxpdGVkIiwic3RvcEV2ZW50IiwiZXZlbnQiLCJjYW5jZWxCdWJibGUiLCJzdG9wUHJvcGFnYXRpb24iLCJwcmV2ZW50RGVmYXVsdCIsInNlbGVjdFJhbmdlIiwiZWwiLCJyYW5nZSIsIm9mZnNldCIsIm1vdmVTdGFydCIsImNvbGxhcHNlIiwibW92ZUVuZCIsInRleHQiLCJzZWxlY3ROb2RlQ29udGVudHMiLCJzZXRTdGFydCIsIm5vZGUiLCJzZXRFbmQiLCJmaXJzdENoaWxkIiwicmFuZ2VUeXBlIiwic2VsZWN0aW9uIiwialF1ZXJ5IiwiZ2V0IiwiYm9keSIsImNyZWF0ZVRleHRSYW5nZSIsImRvY3VtZW50IiwibW92ZVRvRWxlbWVudFRleHQiLCJnZXRTZWxlY3Rpb24iLCJjcmVhdGVSYW5nZSIsInNlbGVjdEFsbCIsImFyciIsInNlbGVjdCIsImZvY3VzIiwicmVtb3ZlQWxsUmFuZ2VzIiwiYWRkUmFuZ2UiLCJkZWJvdW5jZSIsImZ1bmMiLCJ3YWl0Iiwib3B0aW9ucyIsImxhc3RBcmdzIiwibGFzdFRoaXMiLCJtYXhXYWl0IiwidGltZXJJZCIsImxhc3RDYWxsVGltZSIsImxhc3RJbnZva2VUaW1lIiwibGVhZGluZyIsIm1heGluZyIsInRyYWlsaW5nIiwiVHlwZUVycm9yIiwibWF4IiwiaW52b2tlRnVuYyIsInRpbWUiLCJhcmdzIiwidGhpc0FyZyIsImxlYWRpbmdFZGdlIiwic2V0VGltZW91dCIsInRpbWVyRXhwaXJlZCIsInJlbWFpbmluZ1dhaXQiLCJ0aW1lU2luY2VMYXN0Q2FsbCIsInRpbWVTaW5jZUxhc3RJbnZva2UiLCJtaW4iLCJzaG91bGRJbnZva2UiLCJub3ciLCJ0cmFpbGluZ0VkZ2UiLCJjYW5jZWwiLCJjbGVhclRpbWVvdXQiLCJmbHVzaCIsImRlYm91bmNlZCIsImlzSW52b2tpbmciLCJ0aHJvdHRsZSIsImRlZXBDb3B5Iiwib2JqIiwiciIsImFzc2lnbiIsImVzY2FwZUh0bWwiLCJ1bmVzY2FwZUh0bWwiLCJzdHJpbmciLCJfc3RyaW5nIiwiZm9ybWF0IiwiY29uY2F0IiwiX3BvcyIsImNvbG9yIiwiX2hleENvbG9yIiwibWF0Y2hlcnMiLCJDU1NfSU5URUdFUiIsIkNTU19OVU1CRVIiLCJDU1NfVU5JVCIsIlBFUk1JU1NJVkVfTUFUQ0gzIiwiUEVSTUlTU0lWRV9NQVRDSDQiLCJyZ2IiLCJyZ2JhIiwiaHNsIiwiaHNsYSIsImhzdiIsImhzdmEiLCJoZXgzIiwiaGV4NiIsImhleDQiLCJoZXg4IiwiY29udmVydE9iamVjdCIsIl9jb2xvciIsImciLCJiIiwiaCIsImlzT25lUG9pbnRaZXJvIiwibiIsImlzUGVyY2VudGFnZSIsImNvbnZlcnRUb1BlcmNlbnRhZ2UiLCJjb252ZXJ0VG8yNTUiLCJjb252ZXJ0VG9IZXgiLCJib3VuZDAxIiwicHJvY2Vzc1BlcmNlbnQiLCJyZ2JUb0hzbCIsImhzbFRvUmdiIiwiaHVlMnJnYiIsInEiLCJ0IiwiX29yaWdpbmFsVmFsdWUiLCJfZm9ybWF0IiwiX2hleCIsImdldEhleFZhbHVlIiwibGlnaHRlbiIsImFtb3VudCIsImRhcmtlbiIsImdldEJyaWdodG5lc3MiLCJpc0RhcmsiLCJpc0xpZ2h0IiwiZ2V0SHNsIiwiZG9jRWxlbSIsImRvY3VtZW50RWxlbWVudCIsImV2ZW50S2V5cyIsIkJBQ0tTUEFDRSIsIlRBQiIsIlJFVFVSTiIsIkVTQyIsIkxFRlQiLCJVUCIsIlJJR0hUIiwiRE9XTiIsIkRFTEVURSIsIkhPTUUiLCJFTkQiLCJQQUdFVVAiLCJQQUdFRE9XTiIsIklOU0VSVCIsIlNQQUNFIiwiYnJvd3NlciIsInVhIiwibW9iaWxlIiwiYnJvd3Nlck5hbWUiLCJicm93c2VyVmVyc2lvbiIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsInZlcnNpb24iLCJpc0Jyb3dzZXIiLCJ3aGVlbEVubSIsImVycm9yTXNnIiwidXJsVXRpbCIsInVybCIsInVybHMiLCJocmVmIiwibG9jYXRpb24iLCJyZWZlcnJlciIsInBhdGhuYW1lIiwiaG9zdG5hbWUiLCJwb3J0IiwiaGFzaGRhdGEiLCJiYXNlVXJsIiwiZ2V0RXJyb3IiLCJlcnJvckNvZGUiLCJtZXRob2ROYW1lIiwic3VwcG9ydFRvdWNoIiwibWF4VG91Y2hQb2ludHMiLCJtc01heFRvdWNoUG9pbnRzIiwic3VwcG9ydEZpbGVBcGkiLCJGaWxlUmVhZGVyIiwiRmlsZSIsIkZpbGVMaXN0IiwiQmxvYiIsIiRlbCIsImRlc2NyaWJlIiwic3RhdGUiLCJmbiIsImFwcGVuZCIsIml0IiwiZXF1YWwiLCJhY3R1YWwiLCJleHBlY3RlZCIsImRvbmUiLCJzZXRIb3VycyIsInNldE1pbnV0ZXMiLCJhZGQiLCJyZXR1cm4iLCJzZXQiLCJzZXRGdWxsWWVhciIsInNldFNlY29uZHMiLCJ0ZXN0Q2FzZXMiLCJleHBlY3QiLCJleHBsYW5hdGlvbiIsIm1vbmV5IiwiYnl0ZSIsInRlc3RDYXNlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0RBOzs7Ozs7QUFFQTs7OztBQUlBLElBQU1BLFlBQVlDLE9BQU9DLFNBQVAsQ0FBaUJDLFFBQW5DO0FBQ0EsSUFBTUMsV0FBVyxvRUFBakI7QUFBQSxJQUNFQyxPQUFPLE9BRFQ7QUFBQSxJQUVFQyxjQUFjLGtCQUZoQjtBQUFBLElBR0VDLGNBQWMsVUFIaEI7QUFBQSxJQUlFQyxRQUFRLElBSlY7QUFBQSxJQUtFQyxRQUFRLGNBTFY7QUFBQSxJQU1FQyxXQUFXLE1BTmI7QUFBQSxJQU9FQyxlQUFlLElBQUlDLE1BQUosQ0FBVyw4QkFBWCxDQVBqQjtBQUFBLElBUUVDLFFBQVEsSUFSVjtBQUFBLElBU0VDLE9BQU8sR0FUVDtBQUFBLElBVUVDLG1CQUFtQixPQVZyQjs7QUFZQSxTQUFTQyxJQUFULENBQWNDLENBQWQsRUFBaUJDLEdBQWpCLEVBQXNCO0FBQ3BCLE1BQUlDLFVBQVVGLENBQVYsQ0FBSixFQUFrQixPQUFPLEVBQVA7QUFDbEIsTUFBSUcsWUFBSjtBQUFBLE1BQVNDLElBQUksQ0FBYjtBQUFBLE1BQWdCQyxJQUFJTCxFQUFFTSxNQUF0QjtBQUFBLE1BQ0VDLFFB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QUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7O0FBRUY7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLFlBQVk7O0FBRXBCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRixvQkFBb0I7O0FBRXBCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUYsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVLFlBQVk7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVMsU0FBUztBQUNsQjtBQUNBOztBQUVBOztBQUVBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVMsWUFBWTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsWUFBWTtBQUN0Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsRUFBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLFFBQVEsTUFBTTtBQUM5QywwQkFBMEIsV0FBVyxTQUFTO0FBQzlDLG9DQUFvQyxVQUFVLFNBQVM7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7QUFJRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUEsUUFBUSxHQUFHO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7Ozs7QUFJQTs7QUFFQTs7QUFFQTtBQUNBOzs7O0FBSUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnQkFBZ0IsU0FBUztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTs7QUFFQSxjQUFjLFNBQVM7QUFDdkI7QUFDQTs7QUFFQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsS0FBSztBQUNMOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVLE9BQU87QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVUsT0FBTztBQUNqQiwwQkFBMEIsd0JBQXdCOztBQUVsRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQSwwQ0FBMEM7QUFDMUMsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7QUFDRDs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1COztBQUVuQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLGNBQWM7QUFDeEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFROztBQUVSO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVLFNBQVM7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUIsYUFBYTtBQUNwQyxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQixTQUFTO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNILEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQztBQUNEOztBQUVBOzs7QUFHQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOzs7O0FBSUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxFQUFFO0FBQ0Y7O0FBRUEsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFFBQVEsT0FBTztBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSxzQkFBc0I7O0FBRXRCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLE9BQU87QUFDZjs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSxnQkFBZ0I7QUFDbEI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFdBQVc7O0FBRVg7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0RBQW9EO0FBQ3BEOztBQUVBO0FBQ0E7O0FBRUEsY0FBYyxzQkFBc0I7QUFDcEM7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLCtEQUErRDtBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVUsY0FBYzs7QUFFeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixtQkFBbUI7QUFDcEM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQix1Q0FBdUM7QUFDakU7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHVEQUF1RDtBQUM5RTs7QUFFQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRztBQUNILEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDLGNBQWM7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7OztBQUdEOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkNBQTJDLE9BQU87QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7O0FBRTlCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsT0FBTztBQUNqQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQixnQkFBZ0I7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLCtCQUErQjtBQUN2QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsdUNBQXVDLE9BQU87QUFDOUM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0NBQXdDLE9BQU87QUFDL0M7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTLHFDQUFxQztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSCxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7O0FBRUY7QUFDQTtBQUNBOztBQUVBLFNBQVMsOEJBQThCO0FBQ3ZDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7O0FBRUY7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxZQUFZLE9BQU87QUFDbkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFOztBQUVGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTLFdBQVc7QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7O0FBSUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCO0FBQzFCLHNCQUFzQixjQUFjO0FBQ3BDLGdCQUFnQixXQUFXLFlBQVk7QUFDdkMsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDLFdBQVcsU0FBUyxNQUFNLGFBQWE7QUFDNUUsYUFBYSxlQUFlO0FBQzVCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGLENBQUM7OztBQUdEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksK0RBQStEO0FBQzNFO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsUUFBUSxPQUFPOztBQUVmO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUEsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGdCQUFnQjtBQUNsQztBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTs7QUFFQSxVQUFVLE9BQU87QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXLFNBQVM7QUFDcEI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7OztBQUdEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7O0FBS0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFOztBQUVGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7O0FBRUY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOzs7OztBQUtEOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUEsaUNBQWlDO0FBQ2pDO0FBQ0E7O0FBRUEsSUFBSTtBQUNKOztBQUVBLElBQUk7QUFDSjtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBLFdBQVcsU0FBUztBQUNwQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7QUFLRDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw4Q0FBOEM7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQ0FBMkM7QUFDM0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLEtBQUs7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLENBQUM7O0FBRUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUgsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVILEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLEtBQUs7QUFDTDs7QUFFQSxXQUFXO0FBQ1gsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxxREFBcUQ7QUFDckQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxF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QjtBQVJqQyxHQXpGYyxFQW1HZDtBQUNFbEosVUFBTSxDQUNKLE9BQU8sSUFBUCxHQUFjLElBRFYsRUFFSjtBQUNFb0osWUFBTTtBQURSLEtBRkksQ0FEUjtBQU9FSCxZQUFRLFFBUFY7QUFRRUMsaUJBQWEsT0FBTyxJQUFQLEdBQWMsSUFBZCxHQUFxQjtBQVJwQyxHQW5HYyxFQTZHZDtBQUNFbEosVUFBTSxDQUNKLE9BQU8sSUFBUCxHQUFjLElBQWQsR0FBcUIsQ0FEakIsRUFFSjtBQUNFb0osWUFBTTtBQURSLEtBRkksQ0FEUjtBQU9FSCxZQUFRLEtBUFY7QUFRRUMsaUJBQWEsT0FBTyxJQUFQLEdBQWMsSUFBZCxHQUFxQjtBQVJwQyxHQTdHYyxFQXVIZDtBQUNFbEosVUFBTSxDQUNKLHVCQURJLEVBRUo7QUFDRTVLLFdBQUssSUFEUDtBQUVFRCxhQUFPLENBRlQ7QUFHRWdVLGFBQU87QUFIVCxLQUZJLENBRFI7QUFTRUYsWUFBUSxnQkFUVjtBQVVFQyxpQkFBYTtBQVZmLEdBdkhjLENBQWhCO0FBb0lBRixZQUFVdE0sT0FBVixDQUFrQixVQUFVMk0sUUFBVixFQUFvQjtBQUNwQ2pCLE9BQUcsaUJBQWlCaUIsU0FBU0gsV0FBMUIsR0FBd0MsV0FBeEMsR0FBc0RHLFNBQVNKLE1BQWxFLEVBQTBFLFVBQVVULElBQVYsRUFBZ0I7QUFDeEYsVUFBSUYsU0FBUyxrQkFBSzFULE1BQUwsQ0FBWTRCLEtBQVosQ0FBa0IsSUFBbEIsRUFBd0I2UyxTQUFTckosSUFBakMsQ0FBYjtBQUNBd0ksV0FBS0gsTUFBTUMsTUFBTixFQUFjZSxTQUFTSixNQUF2QixDQUFMO0FBQ0QsS0FIRDtBQUlELEdBTEQ7QUFNRCxDQTNJRDs7QUE4SUEscUJBQUUsY0FBRixFQUFrQmQsTUFBbEIsQ0FBeUJKLEdBQXpCLEUiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA3OCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgODE5NGU2ZjJlYTlhY2I1NjQxYTEiLCJpbXBvcnQgaW5mbyBmcm9tIFwiLi9BWDZJbmZvXCI7XG5cbi8qKlxuICogQG1vZHVsZSBBWDZVdGlsXG4gKi9cblxuY29uc3QgX3RvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbmNvbnN0IHJlSXNKc29uID0gL14oW1wiJ10oXFxcXC58W15cIlxcXFxcXG5cXHJdKSo/W1wiJ118Wyw6e31cXFtcXF0wLTkuXFwtK0VhZWZsbnItdSBcXG5cXHJcXHRdKSs/JC8sXG4gIHJlTXMgPSAvXi1tcy0vLFxuICByZVNuYWtlQ2FzZSA9IC9bXFwtX10oW1xcZGEtel0pL2dpLFxuICByZUNhbWVsQ2FzZSA9IC8oW0EtWl0pL2csXG4gIHJlRG90ID0gL1xcLi8sXG4gIHJlSW50ID0gL1stfCtdP1tcXERdL2dpLFxuICByZU5vdE51bSA9IC9cXEQvZ2ksXG4gIHJlTW9uZXlTcGxpdCA9IG5ldyBSZWdFeHAoJyhbMC05XSkoWzAtOV1bMC05XVswLTldWywuXSknKSxcbiAgcmVBbXAgPSAvJi9nLFxuICByZUVxID0gLz0vLFxuICByZUNsYXNzTmFtZVNwbGl0ID0gL1sgXSsvZztcblxuZnVuY3Rpb24gZWFjaChPLCBfZm4pIHtcbiAgaWYgKGlzTm90aGluZyhPKSkgcmV0dXJuIFtdO1xuICBsZXQga2V5LCBpID0gMCwgbCA9IE8ubGVuZ3RoLFxuICAgIGlzT2JqID0gbCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBPID09PSBcImZ1bmN0aW9uXCI7XG4gIGlmIChpc09iaikge1xuICAgIGZvciAoa2V5IGluIE8pIHtcbiAgICAgIGlmICh0eXBlb2YgT1trZXldICE9IFwidW5kZWZpbmVkXCIpXG4gICAgICAgIGlmIChfZm4uY2FsbChPW2tleV0sIGtleSwgT1trZXldKSA9PT0gZmFsc2UpIGJyZWFrO1xuICAgIH1cbiAgfVxuICBlbHNlIHtcbiAgICBmb3IgKDsgaSA8IGw7KSB7XG4gICAgICBpZiAodHlwZW9mIE9baV0gIT0gXCJ1bmRlZmluZWRcIilcbiAgICAgICAgaWYgKF9mbi5jYWxsKE9baV0sIGksIE9baSsrXSkgPT09IGZhbHNlKSBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIE87XG59XG5cbmZ1bmN0aW9uIHNlYXJjaChPLCBfZm4pIHtcbiAgaWYgKGlzTm90aGluZyhPKSkgcmV0dXJuIC0xO1xuICBpZiAoaXNPYmplY3QoTykpIHtcbiAgICBmb3IgKGxldCBrZXkgaW4gTykge1xuICAgICAgaWYgKHR5cGVvZiBPW2tleV0gIT0gXCJ1bmRlZmluZWRcIiAmJiBpc0Z1bmN0aW9uKF9mbikgJiYgX2ZuLmNhbGwoT1trZXldLCBrZXksIE9ba2V5XSkpIHtcbiAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChPW2tleV0gPT0gX2ZuKSB7XG4gICAgICAgIHJldHVybiBrZXk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBlbHNlIHtcbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IE8ubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBpZiAodHlwZW9mIE9baV0gIT0gXCJ1bmRlZmluZWRcIiAmJiBpc0Z1bmN0aW9uKF9mbikgJiYgX2ZuLmNhbGwoT1tpXSwgaSwgT1tpXSkpIHtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoT1tpXSA9PSBfZm4pIHtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbmZ1bmN0aW9uIGZpbHRlcihPLCBfZm4pIHtcbiAgaWYgKGlzTm90aGluZyhPKSkgcmV0dXJuIFtdO1xuICBsZXQgaywgaSA9IDAsIGwgPSBPLmxlbmd0aCwgcmVzdWx0cyA9IFtdLCBmblJlc3VsdDtcbiAgaWYgKGlzT2JqZWN0KE8pKSB7XG4gICAgZm9yIChrIGluIE8pIHtcbiAgICAgIGlmICh0eXBlb2YgT1trXSAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmIChmblJlc3VsdCA9IF9mbi5jYWxsKE9ba10sIGssIE9ba10pKSByZXN1bHRzLnB1c2goT1trXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgIGZvciAoOyBpIDwgbDspIHtcbiAgICAgIGlmICh0eXBlb2YgT1tpXSAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmIChmblJlc3VsdCA9IF9mbi5jYWxsKE9baV0sIGksIE9baV0pKSByZXN1bHRzLnB1c2goT1tpXSk7XG4gICAgICAgIGkrKztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdHM7XG59XG5cblxuZnVuY3Rpb24gdG9Kc29uKE8pIHtcbiAgbGV0IGpzb25TdHJpbmcgPSBcIlwiO1xuICBpZiAoaXNBcnJheShPKSkge1xuICAgIGxldCBpID0gMCwgbCA9IE8ubGVuZ3RoO1xuICAgIGpzb25TdHJpbmcgKz0gXCJbXCI7XG4gICAgZm9yICg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGlmIChpID4gMCkganNvblN0cmluZyArPSBcIixcIjtcbiAgICAgIGpzb25TdHJpbmcgKz0gdG9Kc29uKE9baV0pO1xuICAgIH1cbiAgICBqc29uU3RyaW5nICs9IFwiXVwiO1xuICB9XG4gIGVsc2UgaWYgKGlzT2JqZWN0KE8pKSB7XG4gICAganNvblN0cmluZyArPSBcIntcIjtcbiAgICBsZXQganNvbk9iamVjdEJvZHkgPSBbXTtcbiAgICBlYWNoKE8sIGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICBqc29uT2JqZWN0Qm9keS5wdXNoKCdcIicgKyBrZXkgKyAnXCI6ICcgKyB0b0pzb24odmFsdWUpKTtcbiAgICB9KTtcbiAgICBqc29uU3RyaW5nICs9IGpzb25PYmplY3RCb2R5LmpvaW4oXCIsIFwiKTtcbiAgICBqc29uU3RyaW5nICs9IFwifVwiO1xuICB9XG4gIGVsc2UgaWYgKGlzU3RyaW5nKE8pKSB7XG4gICAganNvblN0cmluZyA9ICdcIicgKyBPICsgJ1wiJztcbiAgfVxuICBlbHNlIGlmIChpc051bWJlcihPKSkge1xuICAgIGpzb25TdHJpbmcgPSBPO1xuICB9XG4gIGVsc2UgaWYgKGlzVW5kZWZpbmVkKE8pKSB7XG4gICAganNvblN0cmluZyA9IFwidW5kZWZpbmVkXCI7XG4gIH1cbiAgZWxzZSBpZiAoaXNGdW5jdGlvbihPKSkge1xuICAgIGpzb25TdHJpbmcgPSAnXCJ7RnVuY3Rpb259XCInO1xuICB9XG4gIGVsc2Uge1xuICAgIGpzb25TdHJpbmcgPSBPO1xuICB9XG4gIHJldHVybiBqc29uU3RyaW5nO1xufVxuXG5cbmZ1bmN0aW9uIHBhcnNlSnNvbihzdHIsIGZvcmNlKSB7XG4gIGlmIChmb3JjZSB8fCAocmVJc0pzb24pLnRlc3Qoc3RyKSkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKG5ldyBGdW5jdGlvbignJywgJ3JldHVybiAnICsgc3RyKSkoKTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiB7ZXJyb3I6IDUwMCwgbXNnOiAnc3ludGF4IGVycm9yJ307XG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgIHJldHVybiB7ZXJyb3I6IDUwMCwgbXNnOiAnc3ludGF4IGVycm9yJ307XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0VHlwZShPKSB7XG4gIGxldCB0eXBlTmFtZTtcbiAgaWYgKE8gIT0gbnVsbCAmJiBPID09IE8ud2luZG93KSB7XG4gICAgdHlwZU5hbWUgPSBcIndpbmRvd1wiO1xuICB9XG4gIGVsc2UgaWYgKCEhKE8gJiYgTy5ub2RlVHlwZSA9PSAxKSkge1xuICAgIHR5cGVOYW1lID0gXCJlbGVtZW50XCI7XG4gIH1cbiAgZWxzZSBpZiAoISEoTyAmJiBPLm5vZGVUeXBlID09IDExKSkge1xuICAgIHR5cGVOYW1lID0gXCJmcmFnbWVudFwiO1xuICB9XG4gIGVsc2UgaWYgKE8gPT09IG51bGwpIHtcbiAgICB0eXBlTmFtZSA9IFwibnVsbFwiO1xuICB9XG4gIGVsc2UgaWYgKHR5cGVvZiBPID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdHlwZU5hbWUgPSBcInVuZGVmaW5lZFwiO1xuICB9XG4gIGVsc2UgaWYgKF90b1N0cmluZy5jYWxsKE8pID09IFwiW29iamVjdCBPYmplY3RdXCIpIHtcbiAgICB0eXBlTmFtZSA9IFwib2JqZWN0XCI7XG4gIH1cbiAgZWxzZSBpZiAoX3RvU3RyaW5nLmNhbGwoTykgPT0gXCJbb2JqZWN0IEFycmF5XVwiKSB7XG4gICAgdHlwZU5hbWUgPSBcImFycmF5XCI7XG4gIH1cbiAgZWxzZSBpZiAoX3RvU3RyaW5nLmNhbGwoTykgPT0gXCJbb2JqZWN0IFN0cmluZ11cIikge1xuICAgIHR5cGVOYW1lID0gXCJzdHJpbmdcIjtcbiAgfVxuICBlbHNlIGlmIChfdG9TdHJpbmcuY2FsbChPKSA9PSBcIltvYmplY3QgTnVtYmVyXVwiKSB7XG4gICAgdHlwZU5hbWUgPSBcIm51bWJlclwiO1xuICB9XG4gIGVsc2UgaWYgKF90b1N0cmluZy5jYWxsKE8pID09IFwiW29iamVjdCBOb2RlTGlzdF1cIikge1xuICAgIHR5cGVOYW1lID0gXCJub2RlbGlzdFwiO1xuICB9XG4gIGVsc2UgaWYgKHR5cGVvZiBPID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB0eXBlTmFtZSA9IFwiZnVuY3Rpb25cIjtcbiAgfVxuICByZXR1cm4gdHlwZU5hbWU7XG59XG5cblxuZnVuY3Rpb24gaXNXaW5kb3coTykge1xuICByZXR1cm4gTyAhPSBudWxsICYmIE8gPT0gTy53aW5kb3c7XG59XG5cbmZ1bmN0aW9uIGlzRWxlbWVudChPKSB7XG4gIHJldHVybiAhIShPICYmIChPLm5vZGVUeXBlID09IDEgfHwgTy5ub2RlVHlwZSA9PSAxMSkpO1xufVxuXG5mdW5jdGlvbiBpc09iamVjdChPKSB7XG4gIHJldHVybiBfdG9TdHJpbmcuY2FsbChPKSA9PSBcIltvYmplY3QgT2JqZWN0XVwiO1xufVxuXG5mdW5jdGlvbiBpc0FycmF5KE8pIHtcbiAgcmV0dXJuIF90b1N0cmluZy5jYWxsKE8pID09IFwiW29iamVjdCBBcnJheV1cIjtcbn1cblxuZnVuY3Rpb24gaXNGdW5jdGlvbihPKSB7XG4gIHJldHVybiB0eXBlb2YgTyA9PT0gXCJmdW5jdGlvblwiO1xufVxuXG5mdW5jdGlvbiBpc1N0cmluZyhPKSB7XG4gIHJldHVybiBfdG9TdHJpbmcuY2FsbChPKSA9PSBcIltvYmplY3QgU3RyaW5nXVwiO1xufVxuXG5mdW5jdGlvbiBpc051bWJlcihPKSB7XG4gIHJldHVybiBfdG9TdHJpbmcuY2FsbChPKSA9PSBcIltvYmplY3QgTnVtYmVyXVwiO1xufVxuXG5mdW5jdGlvbiBpc05vZGVsaXN0KE8pIHtcbiAgcmV0dXJuICEhKF90b1N0cmluZy5jYWxsKE8pID09IFwiW29iamVjdCBOb2RlTGlzdF1cIiB8fCAodHlwZW9mIE8gIT09IFwidW5kZWZpbmVkXCIgJiYgTyAmJiBPWzBdICYmIE9bMF0ubm9kZVR5cGUgPT0gMSkpO1xufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChPKSB7XG4gIHJldHVybiB0eXBlb2YgTyA9PT0gXCJ1bmRlZmluZWRcIjtcbn1cblxuZnVuY3Rpb24gaXNOb3RoaW5nKE8pIHtcbiAgcmV0dXJuICh0eXBlb2YgTyA9PT0gXCJ1bmRlZmluZWRcIiB8fCBPID09PSBudWxsIHx8IE8gPT09IFwiXCIpO1xufVxuXG5mdW5jdGlvbiBpc0RhdGUoTykge1xuICByZXR1cm4gKE8gaW5zdGFuY2VvZiBEYXRlICYmICFpc05hTihPLnZhbHVlT2YoKSkpO1xufVxuXG5mdW5jdGlvbiBpc0RhdGVGb3JtYXQoTykge1xuICBsZXQgcmVzdWx0ID0gZmFsc2U7XG5cbiAgaWYgKCFPKSB7XG4gIH1cbiAgZWxzZSBpZiAoTyBpbnN0YW5jZW9mIERhdGUgJiYgIWlzTmFOKE8udmFsdWVPZigpKSkge1xuICAgIHJlc3VsdCA9IHRydWU7XG4gIH1cbiAgZWxzZSB7XG4gICAgaWYgKE8ubGVuZ3RoID4gNykge1xuICAgICAgaWYgKGRhdGUoTykgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICBPID0gTy5yZXBsYWNlKC9cXEQvZywgJycpO1xuICAgIGlmIChPLmxlbmd0aCA+IDcpIHtcbiAgICAgIGxldCBtbSA9IE8uc3Vic3RyKDQsIDIpLFxuICAgICAgICBkZCA9IE8uc3Vic3RyKDYsIDIpO1xuXG4gICAgICBPID0gZGF0ZShPKTtcbiAgICAgIGlmIChPLmdldE1vbnRoKCkgPT0gKG1tIC0gMSkgJiYgTy5nZXREYXRlKCkgPT0gZGQpIHtcbiAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gZmlyc3QoTykge1xuICBpZiAoaXNPYmplY3QoTykpIHtcbiAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKE8pO1xuICAgIGxldCBpdGVtID0ge307XG4gICAgaXRlbVtrZXlzWzBdXSA9IE9ba2V5c1swXV07XG4gICAgcmV0dXJuIGl0ZW07XG4gIH1cbiAgZWxzZSBpZiAoaXNBcnJheShPKSkge1xuICAgIHJldHVybiBPWzBdO1xuICB9XG4gIGVsc2Uge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJBWDZVdGlsLm9iamVjdC5maXJzdFwiLCBcImFyZ3VtZW50IHR5cGUgZXJyb3JcIik7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuXG5mdW5jdGlvbiBsYXN0KE8pIHtcbiAgaWYgKGlzT2JqZWN0KE8pKSB7XG4gICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhPKTtcbiAgICBsZXQgaXRlbSA9IHt9O1xuICAgIGl0ZW1ba2V5c1trZXlzLmxlbmd0aCAtIDFdXSA9IE9ba2V5c1trZXlzLmxlbmd0aCAtIDFdXTtcbiAgICByZXR1cm4gaXRlbTtcbiAgfVxuICBlbHNlIGlmIChpc0FycmF5KE8pKSB7XG4gICAgcmV0dXJuIE9bTy5sZW5ndGggLSAxXTtcbiAgfVxuICBlbHNlIHtcbiAgICBjb25zb2xlLmVycm9yKFwiQVg2VXRpbC5vYmplY3QubGFzdFwiLCBcImFyZ3VtZW50IHR5cGUgZXJyb3JcIik7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuXG5mdW5jdGlvbiBzZXRDb29raWUoY24sIGN2LCBleGRheXMsIG9wdHMpIHtcbiAgbGV0IGV4cGlyZTtcbiAgaWYgKHR5cGVvZiBleGRheXMgPT09IFwibnVtYmVyXCIpIHtcbiAgICBleHBpcmUgPSBuZXcgRGF0ZSgpO1xuICAgIGV4cGlyZS5zZXREYXRlKGV4cGlyZS5nZXREYXRlKCkgKyBleGRheXMpO1xuICB9XG4gIG9wdHMgPSBvcHRzIHx8IHt9O1xuICByZXR1cm4gKGRvYy5jb29raWUgPSBbXG4gICAgZXNjYXBlKGNuKSwgJz0nLCBlc2NhcGUoY3YpLFxuICAgIGV4cGlyZSA/IFwiOyBleHBpcmVzPVwiICsgZXhwaXJlLnRvVVRDU3RyaW5nKCkgOiBcIlwiLCAvLyB1c2UgZXhwaXJlcyBhdHRyaWJ1dGUsIG1heC1hZ2UgaXMgbm90IHN1cHBvcnRlZCBieSBJRVxuICAgIG9wdHMucGF0aCA/IFwiOyBwYXRoPVwiICsgb3B0cy5wYXRoIDogXCJcIixcbiAgICBvcHRzLmRvbWFpbiA/IFwiOyBkb21haW49XCIgKyBvcHRzLmRvbWFpbiA6IFwiXCIsXG4gICAgb3B0cy5zZWN1cmUgPyBcIjsgc2VjdXJlXCIgOiBcIlwiXG4gIF0uam9pbihcIlwiKSk7XG59XG5cbmZ1bmN0aW9uIGdldENvb2tpZShjbmFtZSkge1xuICBsZXQgbmFtZSA9IGNuYW1lICsgXCI9XCI7XG4gIGxldCBjYSA9IGRvYy5jb29raWUuc3BsaXQoJzsnKSwgaSA9IDAsIGwgPSBjYS5sZW5ndGg7XG4gIGZvciAoOyBpIDwgbDsgaSsrKSB7XG4gICAgbGV0IGMgPSBjYVtpXTtcbiAgICB3aGlsZSAoYy5jaGFyQXQoMCkgPT0gJyAnKSBjID0gYy5zdWJzdHJpbmcoMSk7XG4gICAgaWYgKGMuaW5kZXhPZihuYW1lKSAhPSAtMSkgcmV0dXJuIHVuZXNjYXBlKGMuc3Vic3RyaW5nKG5hbWUubGVuZ3RoLCBjLmxlbmd0aCkpO1xuICB9XG4gIHJldHVybiBcIlwiO1xufVxuXG5mdW5jdGlvbiBhbGVydChPKSB7XG4gIHdpbi5hbGVydCh0b0pzb24oTykpO1xuICByZXR1cm4gTztcbn1cblxuZnVuY3Rpb24gbGVmdChzdHIsIHBvcykge1xuICBpZiAodHlwZW9mIHN0ciA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2YgcG9zID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gXCJcIjtcbiAgaWYgKGlzU3RyaW5nKHBvcykpIHtcbiAgICByZXR1cm4gKHN0ci5pbmRleE9mKHBvcykgPiAtMSkgPyBzdHIuc3Vic3RyKDAsIHN0ci5pbmRleE9mKHBvcykpIDogXCJcIjtcbiAgfVxuICBlbHNlIGlmIChpc051bWJlcihwb3MpKSB7XG4gICAgcmV0dXJuIHN0ci5zdWJzdHIoMCwgcG9zKTtcbiAgfVxuICBlbHNlIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxufVxuXG5mdW5jdGlvbiByaWdodChzdHIsIHBvcykge1xuICBpZiAodHlwZW9mIHN0ciA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2YgcG9zID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gXCJcIjtcbiAgc3RyID0gJycgKyBzdHI7XG4gIGlmIChpc1N0cmluZyhwb3MpKSB7XG4gICAgcmV0dXJuIChzdHIubGFzdEluZGV4T2YocG9zKSA+IC0xKSA/IHN0ci5zdWJzdHIoc3RyLmxhc3RJbmRleE9mKHBvcykgKyAxKSA6IFwiXCI7XG4gIH1cbiAgZWxzZSBpZiAoaXNOdW1iZXIocG9zKSkge1xuICAgIHJldHVybiBzdHIuc3Vic3RyKHN0ci5sZW5ndGggLSBwb3MpO1xuICB9XG4gIGVsc2Uge1xuICAgIHJldHVybiBcIlwiO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNhbWVsQ2FzZShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKHJlTXMsIFwibXMtXCIpLnJlcGxhY2UocmVTbmFrZUNhc2UsIGZ1bmN0aW9uIChhbGwsIGxldHRlcikge1xuICAgIHJldHVybiBsZXR0ZXIudG9VcHBlckNhc2UoKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHNuYWtlQ2FzZShzdHIpIHtcbiAgcmV0dXJuIGNhbWVsQ2FzZShzdHIpLnJlcGxhY2UocmVDYW1lbENhc2UsIGZ1bmN0aW9uIChhbGwsIGxldHRlcikge1xuICAgIHJldHVybiBcIi1cIiArIGxldHRlci50b0xvd2VyQ2FzZSgpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gbnVtYmVyKHN0ciwgY29uZCkge1xuICBsZXQgcmVzdWx0LCBwYWlyID0gKCcnICsgc3RyKS5zcGxpdChyZURvdCksIGlzTWludXMsIHJldHVyblZhbHVlO1xuXG4gIGlzTWludXMgPSAoTnVtYmVyKHBhaXJbMF0ucmVwbGFjZSgvLC9nLCBcIlwiKSkgPCAwIHx8IHBhaXJbMF0gPT0gXCItMFwiKTtcbiAgcmV0dXJuVmFsdWUgPSAwLjA7XG4gIHBhaXJbMF0gPSBwYWlyWzBdLnJlcGxhY2UocmVJbnQsIFwiXCIpO1xuXG4gIGlmIChwYWlyWzFdKSB7XG4gICAgcGFpclsxXSA9IHBhaXJbMV0ucmVwbGFjZShyZU5vdE51bSwgXCJcIik7XG4gICAgcmV0dXJuVmFsdWUgPSBOdW1iZXIocGFpclswXSArIFwiLlwiICsgcGFpclsxXSkgfHwgMDtcbiAgfVxuICBlbHNlIHtcbiAgICByZXR1cm5WYWx1ZSA9IE51bWJlcihwYWlyWzBdKSB8fCAwO1xuICB9XG4gIHJlc3VsdCA9IChpc01pbnVzKSA/IC1yZXR1cm5WYWx1ZSA6IHJldHVyblZhbHVlO1xuXG4gIGVhY2goY29uZCwgZnVuY3Rpb24gKGssIGMpIHtcbiAgICBpZiAoayA9PSBcInJvdW5kXCIpIHtcbiAgICAgIGlmIChpc051bWJlcihjKSkge1xuICAgICAgICBpZiAoYyA8IDApIHtcbiAgICAgICAgICByZXN1bHQgPSArKE1hdGgucm91bmQocmVzdWx0ICsgXCJlLVwiICsgTWF0aC5hYnMoYykpICsgXCJlK1wiICsgTWF0aC5hYnMoYykpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHJlc3VsdCA9ICsoTWF0aC5yb3VuZChyZXN1bHQgKyBcImUrXCIgKyBjKSArIFwiZS1cIiArIGMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmVzdWx0ID0gTWF0aC5yb3VuZChyZXN1bHQpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoayA9PSBcImZsb29yXCIpIHtcbiAgICAgIHJlc3VsdCA9IE1hdGguZmxvb3IocmVzdWx0KTtcbiAgICB9XG4gICAgaWYgKGsgPT0gXCJjZWlsXCIpIHtcbiAgICAgIHJlc3VsdCA9IE1hdGguY2VpbChyZXN1bHQpO1xuICAgIH1cbiAgICBlbHNlIGlmIChrID09IFwibW9uZXlcIikge1xuICAgICAgcmVzdWx0ID0gKGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgdmFyIHR4dE51bWJlciA9ICcnICsgdmFsO1xuICAgICAgICBpZiAoaXNOYU4odHh0TnVtYmVyKSB8fCB0eHROdW1iZXIgPT0gXCJcIikge1xuICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHZhciBhcnJOdW1iZXIgPSB0eHROdW1iZXIuc3BsaXQoJy4nKTtcbiAgICAgICAgICBhcnJOdW1iZXJbMF0gKz0gJy4nO1xuICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgIGFyck51bWJlclswXSA9IGFyck51bWJlclswXS5yZXBsYWNlKHJlTW9uZXlTcGxpdCwgJyQxLCQyJyk7XG4gICAgICAgICAgfSB3aGlsZSAocmVNb25leVNwbGl0LnRlc3QoYXJyTnVtYmVyWzBdKSk7XG4gICAgICAgICAgaWYgKGFyck51bWJlci5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICByZXR1cm4gYXJyTnVtYmVyLmpvaW4oJycpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBhcnJOdW1iZXJbMF0uc3BsaXQoJy4nKVswXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pKHJlc3VsdCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGsgPT0gXCJhYnNcIikge1xuICAgICAgcmVzdWx0ID0gTWF0aC5hYnMoTnVtYmVyKHJlc3VsdCkpO1xuICAgIH1cbiAgICBlbHNlIGlmIChrID09IFwiYnl0ZVwiKSB7XG4gICAgICByZXN1bHQgPSAoZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICB2YWwgPSBOdW1iZXIocmVzdWx0KTtcbiAgICAgICAgdmFyIG5Vbml0ID0gXCJLQlwiO1xuICAgICAgICB2YXIgbXlCeXRlID0gdmFsIC8gMTAyNDtcbiAgICAgICAgaWYgKG15Qnl0ZSAvIDEwMjQgPiAxKSB7XG4gICAgICAgICAgblVuaXQgPSBcIk1CXCI7XG4gICAgICAgICAgbXlCeXRlID0gbXlCeXRlIC8gMTAyNDtcbiAgICAgICAgfVxuICAgICAgICBpZiAobXlCeXRlIC8gMTAyNCA+IDEpIHtcbiAgICAgICAgICBuVW5pdCA9IFwiR0JcIjtcbiAgICAgICAgICBteUJ5dGUgPSBteUJ5dGUgLyAxMDI0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudW1iZXIobXlCeXRlLCB7cm91bmQ6IDF9KSArIG5Vbml0O1xuICAgICAgfSkocmVzdWx0KTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIHRvQXJyYXkoTykge1xuICBpZiAodHlwZW9mIE8ubGVuZ3RoICE9IFwidW5kZWZpbmVkXCIpIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChPKTtcbiAgcmV0dXJuIFtdO1xufVxuXG5mdW5jdGlvbiBwYXJhbShPLCBjb25kKSB7XG4gIHZhciBwO1xuICBpZiAoaXNTdHJpbmcoTykgJiYgdHlwZW9mIGNvbmQgIT09IFwidW5kZWZpbmVkXCIgJiYgY29uZCA9PSBcInBhcmFtXCIpIHtcbiAgICByZXR1cm4gTztcbiAgfVxuICBlbHNlIGlmICgoaXNTdHJpbmcoTykgJiYgdHlwZW9mIGNvbmQgIT09IFwidW5kZWZpbmVkXCIgJiYgY29uZCA9PSBcIm9iamVjdFwiKSB8fCAoaXNTdHJpbmcoTykgJiYgdHlwZW9mIGNvbmQgPT09IFwidW5kZWZpbmVkXCIpKSB7XG4gICAgcCA9IHt9O1xuICAgIGVhY2goTy5zcGxpdChyZUFtcCksIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBpdGVtID0gdGhpcy5zcGxpdChyZUVxKTtcbiAgICAgIGlmICghcFtpdGVtWzBdXSkgcFtpdGVtWzBdXSA9IGl0ZW1bMV07XG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKGlzU3RyaW5nKHBbaXRlbVswXV0pKSBwW2l0ZW1bMF1dID0gW3BbaXRlbVswXV1dO1xuICAgICAgICBwW2l0ZW1bMF1dLnB1c2goaXRlbVsxXSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHA7XG4gIH1cbiAgZWxzZSB7XG4gICAgcCA9IFtdO1xuICAgIGVhY2goTywgZnVuY3Rpb24gKGssIHYpIHtcbiAgICAgIHAucHVzaChrICsgXCI9XCIgKyBlc2NhcGUodikpO1xuICAgIH0pO1xuICAgIHJldHVybiBwLmpvaW4oJyYnKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBlbmNvZGUocykge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHMpO1xufVxuXG5mdW5jdGlvbiBkZWNvZGUocykge1xuICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHMpO1xufVxuXG5mdW5jdGlvbiBlcnJvcigpIHtcbiAgaW5mby5vbmVycm9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5cbmZ1bmN0aW9uIGxvY2FsRGF0ZSh5eSwgbW0sIGRkLCBoaCwgbWksIHNzKSB7XG4gIHZhciB1dGNELCBsb2NhbEQ7XG4gIGxvY2FsRCA9IG5ldyBEYXRlKCk7XG4gIGlmIChtbSA8IDApIG1tID0gMDtcbiAgaWYgKHR5cGVvZiBoaCA9PT0gXCJ1bmRlZmluZWRcIikgaGggPSAxMjtcbiAgaWYgKHR5cGVvZiBtaSA9PT0gXCJ1bmRlZmluZWRcIikgbWkgPSAwO1xuICB1dGNEID0gbmV3IERhdGUoRGF0ZS5VVEMoeXksIG1tLCBkZCB8fCAxLCBoaCwgbWksIHNzIHx8IDApKTtcblxuICBpZiAobW0gPT0gMCAmJiBkZCA9PSAxICYmIHV0Y0QuZ2V0VVRDSG91cnMoKSArICh1dGNELmdldFRpbWV6b25lT2Zmc2V0KCkgLyA2MCkgPCAwKSB7XG4gICAgdXRjRC5zZXRVVENIb3VycygwKTtcbiAgfVxuICBlbHNlIHtcbiAgICB1dGNELnNldFVUQ0hvdXJzKHV0Y0QuZ2V0VVRDSG91cnMoKSArICh1dGNELmdldFRpbWV6b25lT2Zmc2V0KCkgLyA2MCkpO1xuICB9XG4gIHJldHVybiB1dGNEO1xufVxuXG5mdW5jdGlvbiBkYXRlKGQsIGNvbmQpIHtcbiAgbGV0IHl5LCBtbSwgZGQsIGhoLCBtaSxcbiAgICBhRGF0ZVRpbWUsIGFUaW1lcywgYVRpbWUsIGFEYXRlLFxuICAgIHZhLFxuICAgIElTT184NjAxID0gL15cXGR7NH0oLVxcZFxcZCgtXFxkXFxkKFRcXGRcXGQ6XFxkXFxkKDpcXGRcXGQpPyhcXC5cXGQrKT8oKFsrLV1cXGRcXGQ6XFxkXFxkKXxaKT8pPyk/KT8kL2ksXG4gICAgSVNPXzg2MDFfRlVMTCA9IC9eXFxkezR9LVxcZFxcZC1cXGRcXGRUXFxkXFxkOlxcZFxcZDpcXGRcXGQoXFwuXFxkKyk/KChbKy1dXFxkXFxkOlxcZFxcZCl8Wik/JC9pO1xuXG4gIGlmIChpc1N0cmluZyhkKSkge1xuICAgIGlmIChkLmxlbmd0aCA9PSAwKSB7XG4gICAgICBkID0gbmV3IERhdGUoKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZC5sZW5ndGggPiAxNSkge1xuICAgICAgaWYgKElTT184NjAxX0ZVTEwudGVzdChkKSB8fCBJU09fODYwMS50ZXN0KGQpKSB7XG4gICAgICAgIGQgPSBuZXcgRGF0ZShkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFEYXRlVGltZSA9IGQuc3BsaXQoLyAvZyksIGFUaW1lcywgYVRpbWUsXG4gICAgICAgICAgYURhdGUgPSBhRGF0ZVRpbWVbMF0uc3BsaXQoL1xcRC9nKSxcbiAgICAgICAgICB5eSA9IGFEYXRlWzBdO1xuICAgICAgICBtbSA9IHBhcnNlRmxvYXQoYURhdGVbMV0pO1xuICAgICAgICBkZCA9IHBhcnNlRmxvYXQoYURhdGVbMl0pO1xuICAgICAgICBhVGltZSA9IGFEYXRlVGltZVsxXSB8fCBcIjA5OjAwXCI7XG4gICAgICAgIGFUaW1lcyA9IGFUaW1lLnN1YnN0cmluZygwLCA1KS5zcGxpdChcIjpcIik7XG4gICAgICAgIGhoID0gcGFyc2VGbG9hdChhVGltZXNbMF0pO1xuICAgICAgICBtaSA9IHBhcnNlRmxvYXQoYVRpbWVzWzFdKTtcbiAgICAgICAgaWYgKHJpZ2h0KGFUaW1lLCAyKSA9PT0gXCJBTVwiIHx8IHJpZ2h0KGFUaW1lLCAyKSA9PT0gXCJQTVwiKSBoaCArPSAxMjtcbiAgICAgICAgZCA9IGxvY2FsRGF0ZSh5eSwgbW0gLSAxLCBkZCwgaGgsIG1pKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoZC5sZW5ndGggPT0gMTQpIHtcbiAgICAgIHZhID0gZC5yZXBsYWNlKC9cXEQvZywgXCJcIik7XG4gICAgICBkID0gbG9jYWxEYXRlKHZhLnN1YnN0cigwLCA0KSwgdmEuc3Vic3RyKDQsIDIpIC0gMSwgbnVtYmVyKHZhLnN1YnN0cig2LCAyKSksIG51bWJlcih2YS5zdWJzdHIoOCwgMikpLCBudW1iZXIodmEuc3Vic3RyKDEwLCAyKSksIG51bWJlcih2YS5zdWJzdHIoMTIsIDIpKSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGQubGVuZ3RoID4gNykge1xuICAgICAgdmEgPSBkLnJlcGxhY2UoL1xcRC9nLCBcIlwiKTtcbiAgICAgIGQgPSBsb2NhbERhdGUodmEuc3Vic3RyKDAsIDQpLCB2YS5zdWJzdHIoNCwgMikgLSAxLCBudW1iZXIodmEuc3Vic3RyKDYsIDIpKSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGQubGVuZ3RoID4gNCkge1xuICAgICAgdmEgPSBkLnJlcGxhY2UoL1xcRC9nLCBcIlwiKTtcbiAgICAgIGQgPSBsb2NhbERhdGUodmEuc3Vic3RyKDAsIDQpLCB2YS5zdWJzdHIoNCwgMikgLSAxLCAxKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZC5sZW5ndGggPiAyKSB7XG4gICAgICB2YSA9IGQucmVwbGFjZSgvXFxEL2csIFwiXCIpO1xuICAgICAgcmV0dXJuIGxvY2FsRGF0ZSh2YS5zdWJzdHIoMCwgNCksIHZhLnN1YnN0cig0LCAyKSAtIDEsIDEpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGQgPSBuZXcgRGF0ZSgpO1xuICAgIH1cbiAgfVxuICBpZiAodHlwZW9mIGNvbmQgPT09IFwidW5kZWZpbmVkXCIgfHwgdHlwZW9mIGQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4gZDtcbiAgfVxuICBlbHNlIHtcbiAgICBpZiAoXCJhZGRcIiBpbiBjb25kKSB7XG4gICAgICBkID0gKGZ1bmN0aW9uIChfZCwgb3B0cykge1xuICAgICAgICBsZXQgeXksIG1tLCBkZCwgbXhkZCxcbiAgICAgICAgICBEeU1pbGxpID0gKCgxMDAwICogNjApICogNjApICogMjQ7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvcHRzW1wiZFwiXSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIF9kLnNldFRpbWUoX2QuZ2V0VGltZSgpICsgKG9wdHNbXCJkXCJdICogRHlNaWxsaSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvcHRzW1wibVwiXSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIHl5ID0gX2QuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgICBtbSA9IF9kLmdldE1vbnRoKCk7XG4gICAgICAgICAgZGQgPSBfZC5nZXREYXRlKCk7XG4gICAgICAgICAgeXkgPSB5eSArIHBhcnNlSW50KG9wdHNbXCJtXCJdIC8gMTIpO1xuICAgICAgICAgIG1tICs9IG9wdHNbXCJtXCJdICUgMTI7XG4gICAgICAgICAgbXhkZCA9IGRheXNPZk1vbnRoKHl5LCBtbSk7XG4gICAgICAgICAgaWYgKG14ZGQgPCBkZCkgZGQgPSBteGRkO1xuICAgICAgICAgIF9kID0gbmV3IERhdGUoeXksIG1tLCBkZCwgMTIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvcHRzW1wieVwiXSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIF9kLnNldFRpbWUoX2QuZ2V0VGltZSgpICsgKChvcHRzW1wieVwiXSAqIDM2NSkgKiBEeU1pbGxpKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIG9wdHNbXCJoXCJdICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgX2Quc2V0VGltZShfZC5nZXRUaW1lKCkgKyAob3B0c1tcImhcIl0gKiAxMDAwICogNjAgKiA2MCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIF9kO1xuICAgICAgfSkobmV3IERhdGUoZCksIGNvbmRbXCJhZGRcIl0pO1xuICAgIH1cbiAgICBpZiAoXCJzZXRcIiBpbiBjb25kKSB7XG4gICAgICBkID0gKGZ1bmN0aW9uIChfZCwgb3B0cykge1xuICAgICAgICBsZXQgeXksIG1tLCBkZCxcbiAgICAgICAgICBwcm9jZXNzb3IgPSB7XG4gICAgICAgICAgICBcImZpcnN0RGF5T2ZNb250aFwiOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgICAgICAgICAgICB5eSA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgICAgICAgbW0gPSBkYXRlLmdldE1vbnRoKCk7XG4gICAgICAgICAgICAgIGRkID0gMTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHl5LCBtbSwgZGQsIDEyKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImxhc3REYXlPZk1vbnRoXCI6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgICAgICAgIHl5ID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgICAgICAgICBtbSA9IGRhdGUuZ2V0TW9udGgoKTtcbiAgICAgICAgICAgICAgZGQgPSBkYXlzT2ZNb250aCh5eSwgbW0pO1xuICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoeXksIG1tLCBkZCwgMTIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIGlmIChvcHRzIGluIHByb2Nlc3Nvcikge1xuICAgICAgICAgIHJldHVybiBwcm9jZXNzb3Jbb3B0c10oX2QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBfZDtcbiAgICAgICAgfVxuICAgICAgfSkobmV3IERhdGUoZCksIGNvbmRbXCJzZXRcIl0pO1xuICAgIH1cbiAgICBpZiAoXCJyZXR1cm5cIiBpbiBjb25kKSB7XG4gICAgICByZXR1cm4gKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBsZXQgZlN0ciA9IGNvbmRbXCJyZXR1cm5cIl0sIG5ZLCBuTSwgbkQsIG5ILCBuTU0sIG5TLCBuRFcsXG4gICAgICAgICAgeXJlLCByZWdZLCBtcmUsIHJlZ00sIGRyZSwgcmVnRCwgaHJlLCByZWdILCBtaXJlLCByZWdNSSwgc3JlLCByZWdTLCBkd3JlLCByZWdEVztcblxuICAgICAgICBuWSA9IGQuZ2V0VVRDRnVsbFllYXIoKTtcbiAgICAgICAgbk0gPSBzZXREaWdpdChkLmdldE1vbnRoKCkgKyAxLCAyKTtcbiAgICAgICAgbkQgPSBzZXREaWdpdChkLmdldERhdGUoKSwgMik7XG4gICAgICAgIG5IID0gc2V0RGlnaXQoZC5nZXRIb3VycygpLCAyKTtcbiAgICAgICAgbk1NID0gc2V0RGlnaXQoZC5nZXRNaW51dGVzKCksIDIpO1xuICAgICAgICBuUyA9IHNldERpZ2l0KGQuZ2V0U2Vjb25kcygpLCAyKTtcbiAgICAgICAgbkRXID0gZC5nZXREYXkoKTtcblxuICAgICAgICB5cmUgPSAvW155XSooeXl5eSlbXnldKi9naTtcbiAgICAgICAgeXJlLmV4ZWMoZlN0cik7XG4gICAgICAgIHJlZ1kgPSBSZWdFeHAuJDE7XG4gICAgICAgIG1yZSA9IC9bXm1dKihNTSlbXm1dKi9nO1xuICAgICAgICBtcmUuZXhlYyhmU3RyKTtcbiAgICAgICAgcmVnTSA9IFJlZ0V4cC4kMTtcbiAgICAgICAgZHJlID0gL1teZF0qKGRkKVteZF0qL2dpO1xuICAgICAgICBkcmUuZXhlYyhmU3RyKTtcbiAgICAgICAgcmVnRCA9IFJlZ0V4cC4kMTtcbiAgICAgICAgaHJlID0gL1teaF0qKGhoKVteaF0qL2dpO1xuICAgICAgICBocmUuZXhlYyhmU3RyKTtcbiAgICAgICAgcmVnSCA9IFJlZ0V4cC4kMTtcbiAgICAgICAgbWlyZSA9IC9bXm1dKihtbSlbXmldKi9nO1xuICAgICAgICBtaXJlLmV4ZWMoZlN0cik7XG4gICAgICAgIHJlZ01JID0gUmVnRXhwLiQxO1xuICAgICAgICBzcmUgPSAvW15zXSooc3MpW15zXSovZ2k7XG4gICAgICAgIHNyZS5leGVjKGZTdHIpO1xuICAgICAgICByZWdTID0gUmVnRXhwLiQxO1xuICAgICAgICBkd3JlID0gL1teZF0qKGR3KVted10qL2dpO1xuICAgICAgICBkd3JlLmV4ZWMoZlN0cik7XG4gICAgICAgIHJlZ0RXID0gUmVnRXhwLiQxO1xuXG4gICAgICAgIGlmIChyZWdZID09PSBcInl5eXlcIikge1xuICAgICAgICAgIGZTdHIgPSBmU3RyLnJlcGxhY2UocmVnWSwgcmlnaHQoblksIHJlZ1kubGVuZ3RoKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlZ00gPT09IFwiTU1cIikge1xuICAgICAgICAgIGlmIChyZWdNLmxlbmd0aCA9PSAxKSBuTSA9IChkLmdldE1vbnRoKCkgKyAxKTtcbiAgICAgICAgICBmU3RyID0gZlN0ci5yZXBsYWNlKHJlZ00sIG5NKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVnRCA9PT0gXCJkZFwiKSB7XG4gICAgICAgICAgaWYgKHJlZ0QubGVuZ3RoID09IDEpIG5EID0gZC5nZXREYXRlKCk7XG4gICAgICAgICAgZlN0ciA9IGZTdHIucmVwbGFjZShyZWdELCBuRCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlZ0ggPT09IFwiaGhcIikge1xuICAgICAgICAgIGZTdHIgPSBmU3RyLnJlcGxhY2UocmVnSCwgbkgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZWdNSSA9PT0gXCJtbVwiKSB7XG4gICAgICAgICAgZlN0ciA9IGZTdHIucmVwbGFjZShyZWdNSSwgbk1NKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVnUyA9PT0gXCJzc1wiKSB7XG4gICAgICAgICAgZlN0ciA9IGZTdHIucmVwbGFjZShyZWdTLCBuUyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlZ0RXID09IFwiZHdcIikge1xuICAgICAgICAgIGZTdHIgPSBmU3RyLnJlcGxhY2UocmVnRFcsIGluZm8ud2Vla05hbWVzW25EV10ubGFiZWwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmU3RyO1xuICAgICAgfSkoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gZDtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZGRheShkLCBjb25kKSB7XG4gIGxldCBtZW1vcnlEYXkgPSBkYXRlKGQpLCBEeU1pbGxpID0gKCgxMDAwICogNjApICogNjApICogMjQsIHRvZGF5ID0gbmV3IERhdGUoKSwgZGlmZm51bSwgdGhpc1llYXJNZW1vcnlEYXk7XG5cbiAgZnVuY3Rpb24gZ2V0RGF5VGltZShfZCkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKF9kLmdldFRpbWUoKSAvIER5TWlsbGkpICogRHlNaWxsaTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgY29uZCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGRpZmZudW0gPSBudW1iZXIoKCggZ2V0RGF5VGltZShtZW1vcnlEYXkpIC0gZ2V0RGF5VGltZSh0b2RheSkgKSAvIER5TWlsbGkpLCB7Zmxvb3I6IHRydWV9KTtcbiAgICByZXR1cm4gZGlmZm51bTtcbiAgfVxuXG4gIGVsc2Uge1xuICAgIGRpZmZudW0gPSBudW1iZXIoKCggZ2V0RGF5VGltZShtZW1vcnlEYXkpIC0gZ2V0RGF5VGltZSh0b2RheSkgKSAvIER5TWlsbGkpLCB7Zmxvb3I6IHRydWV9KTtcbiAgICBpZiAoY29uZFtcInRvZGF5XCJdKSB7XG4gICAgICB0b2RheSA9IGRhdGUoY29uZC50b2RheSk7XG4gICAgICBkaWZmbnVtID0gbnVtYmVyKCgoIGdldERheVRpbWUobWVtb3J5RGF5KSAtIGdldERheVRpbWUodG9kYXkpICkgLyBEeU1pbGxpKSwge2Zsb29yOiB0cnVlfSk7XG4gICAgfVxuICAgIGlmIChjb25kW1widGhpc1llYXJcIl0pIHtcbiAgICAgIHRoaXNZZWFyTWVtb3J5RGF5ID0gbmV3IERhdGUodG9kYXkuZ2V0RnVsbFllYXIoKSwgbWVtb3J5RGF5LmdldE1vbnRoKCksIG1lbW9yeURheS5nZXREYXRlKCkpO1xuICAgICAgZGlmZm51bSA9IG51bWJlcigoKCBnZXREYXlUaW1lKHRoaXNZZWFyTWVtb3J5RGF5KSAtIGdldERheVRpbWUodG9kYXkpICkgLyBEeU1pbGxpKSwge2Zsb29yOiB0cnVlfSk7XG4gICAgICBpZiAoZGlmZm51bSA8IDApIHtcbiAgICAgICAgdGhpc1llYXJNZW1vcnlEYXkgPSBuZXcgRGF0ZSh0b2RheS5nZXRGdWxsWWVhcigpICsgMSwgbWVtb3J5RGF5LmdldE1vbnRoKCksIG1lbW9yeURheS5nZXREYXRlKCkpO1xuICAgICAgICBkaWZmbnVtID0gbnVtYmVyKCgoIGdldERheVRpbWUodGhpc1llYXJNZW1vcnlEYXkpIC0gZ2V0RGF5VGltZSh0b2RheSkgKSAvIER5TWlsbGkpLCB7Zmxvb3I6IHRydWV9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNvbmRbXCJhZ2VcIl0pIHtcbiAgICAgIHRoaXNZZWFyTWVtb3J5RGF5ID0gbmV3IERhdGUodG9kYXkuZ2V0RnVsbFllYXIoKSwgbWVtb3J5RGF5LmdldE1vbnRoKCksIG1lbW9yeURheS5nZXREYXRlKCkpO1xuICAgICAgZGlmZm51bSA9IHRoaXNZZWFyTWVtb3J5RGF5LmdldEZ1bGxZZWFyKCkgLSBtZW1vcnlEYXkuZ2V0RnVsbFllYXIoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGlmZm51bTtcbiAgfVxufVxuXG5mdW5jdGlvbiB3ZWVrc09mTW9udGgoZCkge1xuICBsZXQgbXlEYXRlID0gZGF0ZShkKTtcbiAgcmV0dXJuIHtcbiAgICB5ZWFyOiBteURhdGUuZ2V0RnVsbFllYXIoKSxcbiAgICBtb250aDogbXlEYXRlLmdldE1vbnRoKCkgKyAxLFxuICAgIGNvdW50OiBwYXJzZUludChteURhdGUuZ2V0RGF0ZSgpIC8gNyArIDEpXG4gIH07XG59XG5cbmZ1bmN0aW9uIGRheXNPZk1vbnRoKHksIG0pIHtcbiAgaWYgKG0gPT0gMyB8fCBtID09IDUgfHwgbSA9PSA4IHx8IG0gPT0gMTApIHtcbiAgICByZXR1cm4gMzA7XG4gIH1cbiAgZWxzZSBpZiAobSA9PSAxKSB7XG4gICAgcmV0dXJuICgoKHkgJSA0ID09IDApICYmICh5ICUgMTAwICE9IDApKSB8fCAoeSAlIDQwMCA9PSAwKSkgPyAyOSA6IDI4O1xuICB9XG4gIGVsc2Uge1xuICAgIHJldHVybiAzMTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzZXREaWdpdChudW0sIGxlbmd0aCwgcGFkZGVyLCByYWRpeCkge1xuICBsZXQgcyA9IG51bS50b1N0cmluZyhyYWRpeCB8fCAxMCk7XG4gIHJldHVybiB0aW1lcygocGFkZGVyIHx8ICcwJyksIChsZW5ndGggLSBzLmxlbmd0aCkpICsgcztcbn1cblxuZnVuY3Rpb24gdGltZXMocywgY291bnQpIHtcbiAgcmV0dXJuIGNvdW50IDwgMSA/ICcnIDogbmV3IEFycmF5KGNvdW50ICsgMSkuam9pbihzKTtcbn1cblxuZnVuY3Rpb24gZmluZFBhcmVudE5vZGUoX3RhcmdldCwgY29uZCkge1xuICBpZiAoX3RhcmdldCkge1xuICAgIHdoaWxlICgoZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IHJlc3VsdCA9IHRydWU7XG4gICAgICBpZiAodHlwZW9mIGNvbmQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgX3RhcmdldCA9IChfdGFyZ2V0LnBhcmVudE5vZGUpID8gX3RhcmdldC5wYXJlbnROb2RlIDogZmFsc2U7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpc0Z1bmN0aW9uKGNvbmQpKSB7XG4gICAgICAgIHJlc3VsdCA9IGNvbmQoX3RhcmdldCk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpc09iamVjdChjb25kKSkge1xuICAgICAgICBmb3IgKGxldCBrIGluIGNvbmQpIHtcbiAgICAgICAgICBpZiAoayA9PT0gXCJ0YWduYW1lXCIpIHtcbiAgICAgICAgICAgIGlmIChfdGFyZ2V0LnRhZ05hbWUudG9Mb2NhbGVMb3dlckNhc2UoKSAhPSBjb25kW2tdKSB7XG4gICAgICAgICAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAoayA9PT0gXCJjbGF6elwiIHx8IGsgPT09IFwiY2xhc3NfbmFtZVwiKSB7XG4gICAgICAgICAgICBpZiAoXCJjbGFzc05hbWVcIiBpbiBfdGFyZ2V0KSB7XG4gICAgICAgICAgICAgIGxldCBrbGFzc3MgPSBfdGFyZ2V0LmNsYXNzTmFtZS5zcGxpdChyZUNsYXNzTmFtZVNwbGl0KSxcbiAgICAgICAgICAgICAgICBoYXNDbGFzcyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgIGZvciAobGV0IGEgPSAwOyBhIDwga2xhc3NzLmxlbmd0aDsgYSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGtsYXNzc1thXSA9PSBjb25kW2tdKSB7XG4gICAgICAgICAgICAgICAgICBoYXNDbGFzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmVzdWx0ID0gaGFzQ2xhc3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHsgLy8g6re47Jm4IOyGjeyEseqwkuuTpC5cbiAgICAgICAgICAgIGlmIChfdGFyZ2V0LmdldEF0dHJpYnV0ZSkge1xuICAgICAgICAgICAgICBpZiAoX3RhcmdldC5nZXRBdHRyaWJ1dGUoaykgIT0gY29uZFtrXSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuICFyZXN1bHQ7XG4gICAgfSkoKSkge1xuICAgICAgaWYgKF90YXJnZXQucGFyZW50Tm9kZSAmJiBfdGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZSkge1xuICAgICAgICBfdGFyZ2V0ID0gX3RhcmdldC5wYXJlbnROb2RlO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIF90YXJnZXQgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBfdGFyZ2V0O1xufVxuXG5mdW5jdGlvbiBjc3NOdW1iZXIodmFsKSB7XG4gIGxldCByZSA9IC9cXEQ/KFxcZCspKFthLXpBLVolXSopL2ksXG4gICAgZm91bmQgPSAoJycgKyB2YWwpLm1hdGNoKHJlKSxcbiAgICB1bml0ID0gZm91bmRbMl0gfHwgXCJweFwiO1xuXG4gIHJldHVybiBmb3VuZFsxXSArIHVuaXQ7XG59XG5cbmZ1bmN0aW9uIGNzcyh2YWwpIHtcbiAgbGV0IHJldHVybnM7XG4gIGlmIChpc09iamVjdCh2YWwpKSB7XG4gICAgcmV0dXJucyA9ICcnO1xuICAgIGZvciAobGV0IGsgaW4gdmFsKSB7XG4gICAgICByZXR1cm5zICs9IGsgKyAnOicgKyB2YWxba10gKyAnOyc7XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5zO1xuICB9XG4gIGVsc2UgaWYgKGlzU3RyaW5nKHZhbCkpIHtcbiAgICByZXR1cm5zID0ge307XG4gICAgbGV0IHZhbFNwbGl0ZWQgPSB2YWwuc3BsaXQoL1sgXSo7WyBdKi9nKTtcbiAgICB2YWxTcGxpdGVkLmZvckVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICAgIGlmICgodiA9IHYudHJpbSgpKSAhPT0gXCJcIikge1xuICAgICAgICB2YXIgdlNwbGl0ZWQgPSB2LnNwbGl0KC9bIF0qOlsgXSovZyk7XG4gICAgICAgIHJldHVybnNbdlNwbGl0ZWRbMF1dID0gdlNwbGl0ZWRbMV07XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJldHVybnM7XG4gIH1cbn1cblxuZnVuY3Rpb24gc3RvcEV2ZW50KGUpIHtcbiAgLy8g7J2067Kk7Yq4IOykkeyngCDqtazrrLhcbiAgaWYgKCFlKSBlID0gd2luZG93LmV2ZW50O1xuXG4gIC8vZS5jYW5jZWxCdWJibGUgaXMgc3VwcG9ydGVkIGJ5IElFIC1cbiAgLy8gdGhpcyB3aWxsIGtpbGwgdGhlIGJ1YmJsaW5nIHByb2Nlc3MuXG4gIGUuY2FuY2VsQnViYmxlID0gdHJ1ZTtcbiAgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuXG4gIC8vZS5zdG9wUHJvcGFnYXRpb24gd29ya3Mgb25seSBpbiBGaXJlZm94LlxuICBpZiAoZS5zdG9wUHJvcGFnYXRpb24pIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIGlmIChlLnByZXZlbnREZWZhdWx0KSBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgcmV0dXJuIGZhbHNlO1xuICAvLyDsnbTrsqTtirgg7KSR7KeAIOq1rOusuCDrgZ1cbn1cblxuY29uc3Qgc2VsZWN0UmFuZ2UgPSAoZnVuY3Rpb24gKCkge1xuICBjb25zdCBwcm9jZXNzb3IgPSB7XG4gICAgJ3RleHRSYW5nZSc6IHtcbiAgICAgICdzZWxlY3RBbGwnOiBmdW5jdGlvbiAoZWwsIHJhbmdlLCBvZmZzZXQpIHtcblxuICAgICAgfSxcbiAgICAgICdhcnInOiBmdW5jdGlvbiAoZWwsIHJhbmdlLCBvZmZzZXQpIHtcbiAgICAgICAgcmFuZ2UubW92ZVN0YXJ0KFwiY2hhcmFjdGVyXCIsIG9mZnNldFswXSk7IC8vIHRvZG8gaWUgbm9kZSBzZWxlY3Qg7LK07YGs7ZWE7JqUXG4gICAgICAgIHJhbmdlLmNvbGxhcHNlKCk7XG4gICAgICAgIHJhbmdlLm1vdmVFbmQoXCJjaGFyYWN0ZXJcIiwgb2Zmc2V0WzFdKTtcbiAgICAgIH0sXG4gICAgICAnc3RhcnQnOiBmdW5jdGlvbiAoZWwsIHJhbmdlLCBvZmZzZXQpIHtcbiAgICAgICAgcmFuZ2UubW92ZVN0YXJ0KFwiY2hhcmFjdGVyXCIsIDApO1xuICAgICAgICByYW5nZS5jb2xsYXBzZSgpO1xuICAgICAgfSxcbiAgICAgICdlbmQnOiBmdW5jdGlvbiAoZWwsIHJhbmdlLCBvZmZzZXQpIHtcbiAgICAgICAgcmFuZ2UubW92ZVN0YXJ0KFwiY2hhcmFjdGVyXCIsIHJhbmdlLnRleHQubGVuZ3RoKTtcbiAgICAgICAgcmFuZ2UuY29sbGFwc2UoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgICdyYW5nZSc6IHtcbiAgICAgICdzZWxlY3RBbGwnOiBmdW5jdGlvbiAoZWwsIHJhbmdlLCBvZmZzZXQpIHtcbiAgICAgICAgcmFuZ2Uuc2VsZWN0Tm9kZUNvbnRlbnRzKGVsKTtcbiAgICAgIH0sXG4gICAgICAnYXJyJzogZnVuY3Rpb24gKGVsLCByYW5nZSwgb2Zmc2V0KSB7XG4gICAgICAgIGlmIChpc09iamVjdChvZmZzZXRbMF0pKSB7XG4gICAgICAgICAgcmFuZ2Uuc2V0U3RhcnQob2Zmc2V0WzBdLm5vZGUsIG9mZnNldFswXS5vZmZzZXQpO1xuICAgICAgICAgIHJhbmdlLnNldEVuZChvZmZzZXRbMV0ubm9kZSwgb2Zmc2V0WzFdLm9mZnNldCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgcmFuZ2Uuc2V0U3RhcnQoZWwuZmlyc3RDaGlsZCwgb2Zmc2V0WzBdKTtcbiAgICAgICAgICByYW5nZS5zZXRFbmQoZWwuZmlyc3RDaGlsZCwgb2Zmc2V0WzFdKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgICdzdGFydCc6IGZ1bmN0aW9uIChlbCwgcmFuZ2UsIG9mZnNldCkge1xuICAgICAgICByYW5nZS5zZWxlY3ROb2RlQ29udGVudHMoZWwpO1xuICAgICAgICByYW5nZS5jb2xsYXBzZSh0cnVlKTtcbiAgICAgIH0sXG4gICAgICAnZW5kJzogZnVuY3Rpb24gKGVsLCByYW5nZSwgb2Zmc2V0KSB7XG4gICAgICAgIHJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyhlbCk7XG4gICAgICAgIHJhbmdlLmNvbGxhcHNlKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIHJldHVybiBmdW5jdGlvbiAoZWwsIG9mZnNldCkge1xuICAgIGxldCByYW5nZSwgcmFuZ2VUeXBlLCBzZWxlY3Rpb247XG5cbiAgICBpZiAoZWwgaW5zdGFuY2VvZiBqUXVlcnkpIHtcbiAgICAgIGVsID0gZWwuZ2V0KDApO1xuICAgIH1cbiAgICBpZiAoIWVsKSByZXR1cm47XG5cbiAgICAvLyDroIjsnbjsp4Ag7YOA7J6FIOyEoO2DnVxuICAgIGlmIChkb2MuYm9keS5jcmVhdGVUZXh0UmFuZ2UpIHtcbiAgICAgIHJhbmdlID0gZG9jdW1lbnQuYm9keS5jcmVhdGVUZXh0UmFuZ2UoKTtcbiAgICAgIHJhbmdlLm1vdmVUb0VsZW1lbnRUZXh0KGVsKTtcbiAgICAgIHJhbmdlVHlwZSA9IFwidGV4dFJhbmdlXCI7XG4gICAgfVxuICAgIGVsc2UgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24pIHtcbiAgICAgIHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgIHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICAgIHJhbmdlVHlwZSA9IFwicmFuZ2VcIjtcbiAgICB9XG5cbiAgICAvLyByYW5nZSDsoIHsmqlcbiAgICBpZiAodHlwZW9mIG9mZnNldCA9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBwcm9jZXNzb3JbcmFuZ2VUeXBlXS5zZWxlY3RBbGwuY2FsbCh0aGlzLCBlbCwgcmFuZ2UsIG9mZnNldCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzQXJyYXkob2Zmc2V0KSkge1xuICAgICAgcHJvY2Vzc29yW3JhbmdlVHlwZV0uYXJyLmNhbGwodGhpcywgZWwsIHJhbmdlLCBvZmZzZXQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGZvciAodmFyIGtleSBpbiBwcm9jZXNzb3JbcmFuZ2VUeXBlXSkge1xuICAgICAgICBpZiAob2Zmc2V0ID09IGtleSkge1xuICAgICAgICAgIHByb2Nlc3NvcltyYW5nZVR5cGVdW2tleV0uY2FsbCh0aGlzLCBlbCwgcmFuZ2UsIG9mZnNldCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyDtj6zsu6TsiqQg67CPIOyFgOugie2KuFxuICAgIGlmIChkb2MuYm9keS5jcmVhdGVUZXh0UmFuZ2UpIHtcbiAgICAgIHJhbmdlLnNlbGVjdCgpO1xuICAgICAgZWwuZm9jdXMoKTtcbiAgICB9XG4gICAgZWxzZSBpZiAod2luZG93LmdldFNlbGVjdGlvbikge1xuICAgICAgZWwuZm9jdXMoKTtcbiAgICAgIHNlbGVjdGlvbi5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICAgIHNlbGVjdGlvbi5hZGRSYW5nZShyYW5nZSk7XG4gICAgfVxuXG4gIH1cbn0pKCk7XG5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9sb2Rhc2gvbG9kYXNoL2Jsb2IvbWFzdGVyL2RlYm91bmNlLmpzXG5jb25zdCBkZWJvdW5jZSA9IGZ1bmN0aW9uIChmdW5jLCB3YWl0LCBvcHRpb25zKSB7XG4gIGxldCBsYXN0QXJncyxcbiAgICBsYXN0VGhpcyxcbiAgICBtYXhXYWl0LFxuICAgIHJlc3VsdCxcbiAgICB0aW1lcklkLFxuICAgIGxhc3RDYWxsVGltZTtcblxuICBsZXQgbGFzdEludm9rZVRpbWUgPSAwO1xuICBsZXQgbGVhZGluZyA9IGZhbHNlO1xuICBsZXQgbWF4aW5nID0gZmFsc2U7XG4gIGxldCB0cmFpbGluZyA9IHRydWU7XG5cbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBhIGZ1bmN0aW9uJylcbiAgfVxuICB3YWl0ID0gK3dhaXQgfHwgMDtcbiAgaWYgKGlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgbGVhZGluZyA9ICEhb3B0aW9ucy5sZWFkaW5nO1xuICAgIG1heGluZyA9ICdtYXhXYWl0JyBpbiBvcHRpb25zO1xuICAgIG1heFdhaXQgPSBtYXhpbmcgPyBNYXRoLm1heCgrb3B0aW9ucy5tYXhXYWl0IHx8IDAsIHdhaXQpIDogbWF4V2FpdDtcbiAgICB0cmFpbGluZyA9ICd0cmFpbGluZycgaW4gb3B0aW9ucyA/ICEhb3B0aW9ucy50cmFpbGluZyA6IHRyYWlsaW5nO1xuICB9XG5cbiAgZnVuY3Rpb24gaW52b2tlRnVuYyh0aW1lKSB7XG4gICAgY29uc3QgYXJncyA9IGxhc3RBcmdzO1xuICAgIGNvbnN0IHRoaXNBcmcgPSBsYXN0VGhpcztcblxuICAgIGxhc3RBcmdzID0gbGFzdFRoaXMgPSB1bmRlZmluZWQ7XG4gICAgbGFzdEludm9rZVRpbWUgPSB0aW1lO1xuICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpc0FyZywgYXJncyk7XG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgZnVuY3Rpb24gbGVhZGluZ0VkZ2UodGltZSkge1xuICAgIC8vIFJlc2V0IGFueSBgbWF4V2FpdGAgdGltZXIuXG4gICAgbGFzdEludm9rZVRpbWUgPSB0aW1lO1xuICAgIC8vIFN0YXJ0IHRoZSB0aW1lciBmb3IgdGhlIHRyYWlsaW5nIGVkZ2UuXG4gICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICAvLyBJbnZva2UgdGhlIGxlYWRpbmcgZWRnZS5cbiAgICByZXR1cm4gbGVhZGluZyA/IGludm9rZUZ1bmModGltZSkgOiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiByZW1haW5pbmdXYWl0KHRpbWUpIHtcbiAgICBjb25zdCB0aW1lU2luY2VMYXN0Q2FsbCA9IHRpbWUgLSBsYXN0Q2FsbFRpbWU7XG4gICAgY29uc3QgdGltZVNpbmNlTGFzdEludm9rZSA9IHRpbWUgLSBsYXN0SW52b2tlVGltZTtcbiAgICBjb25zdCByZXN1bHQgPSB3YWl0IC0gdGltZVNpbmNlTGFzdENhbGw7XG5cbiAgICByZXR1cm4gbWF4aW5nID8gTWF0aC5taW4ocmVzdWx0LCBtYXhXYWl0IC0gdGltZVNpbmNlTGFzdEludm9rZSkgOiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBzaG91bGRJbnZva2UodGltZSkge1xuICAgIGNvbnN0IHRpbWVTaW5jZUxhc3RDYWxsID0gdGltZSAtIGxhc3RDYWxsVGltZTtcbiAgICBjb25zdCB0aW1lU2luY2VMYXN0SW52b2tlID0gdGltZSAtIGxhc3RJbnZva2VUaW1lO1xuXG4gICAgLy8gRWl0aGVyIHRoaXMgaXMgdGhlIGZpcnN0IGNhbGwsIGFjdGl2aXR5IGhhcyBzdG9wcGVkIGFuZCB3ZSdyZSBhdCB0aGVcbiAgICAvLyB0cmFpbGluZyBlZGdlLCB0aGUgc3lzdGVtIHRpbWUgaGFzIGdvbmUgYmFja3dhcmRzIGFuZCB3ZSdyZSB0cmVhdGluZ1xuICAgIC8vIGl0IGFzIHRoZSB0cmFpbGluZyBlZGdlLCBvciB3ZSd2ZSBoaXQgdGhlIGBtYXhXYWl0YCBsaW1pdC5cbiAgICByZXR1cm4gKGxhc3RDYWxsVGltZSA9PT0gdW5kZWZpbmVkIHx8ICh0aW1lU2luY2VMYXN0Q2FsbCA+PSB3YWl0KSB8fFxuICAgICAgKHRpbWVTaW5jZUxhc3RDYWxsIDwgMCkgfHwgKG1heGluZyAmJiB0aW1lU2luY2VMYXN0SW52b2tlID49IG1heFdhaXQpKVxuICB9XG5cbiAgZnVuY3Rpb24gdGltZXJFeHBpcmVkKCkge1xuICAgIGNvbnN0IHRpbWUgPSBEYXRlLm5vdygpO1xuICAgIGlmIChzaG91bGRJbnZva2UodGltZSkpIHtcbiAgICAgIHJldHVybiB0cmFpbGluZ0VkZ2UodGltZSk7XG4gICAgfVxuICAgIC8vIFJlc3RhcnQgdGhlIHRpbWVyLlxuICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgcmVtYWluaW5nV2FpdCh0aW1lKSk7XG4gIH1cblxuICBmdW5jdGlvbiB0cmFpbGluZ0VkZ2UodGltZSkge1xuICAgIHRpbWVySWQgPSB1bmRlZmluZWQ7XG5cbiAgICAvLyBPbmx5IGludm9rZSBpZiB3ZSBoYXZlIGBsYXN0QXJnc2Agd2hpY2ggbWVhbnMgYGZ1bmNgIGhhcyBiZWVuXG4gICAgLy8gZGVib3VuY2VkIGF0IGxlYXN0IG9uY2UuXG4gICAgaWYgKHRyYWlsaW5nICYmIGxhc3RBcmdzKSB7XG4gICAgICByZXR1cm4gaW52b2tlRnVuYyh0aW1lKVxuICAgIH1cbiAgICBsYXN0QXJncyA9IGxhc3RUaGlzID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbmNlbCgpIHtcbiAgICBpZiAodGltZXJJZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXJJZCk7XG4gICAgfVxuICAgIGxhc3RJbnZva2VUaW1lID0gMDtcbiAgICBsYXN0QXJncyA9IGxhc3RDYWxsVGltZSA9IGxhc3RUaGlzID0gdGltZXJJZCA9IHVuZGVmaW5lZFxuICB9XG5cbiAgZnVuY3Rpb24gZmx1c2goKSB7XG4gICAgcmV0dXJuIHRpbWVySWQgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IHRyYWlsaW5nRWRnZShEYXRlLm5vdygpKVxuICB9XG5cbiAgZnVuY3Rpb24gZGVib3VuY2VkKC4uLmFyZ3MpIHtcbiAgICBjb25zdCB0aW1lID0gRGF0ZS5ub3coKTtcbiAgICBjb25zdCBpc0ludm9raW5nID0gc2hvdWxkSW52b2tlKHRpbWUpO1xuXG4gICAgbGFzdEFyZ3MgPSBhcmdzO1xuICAgIGxhc3RUaGlzID0gdGhpcztcbiAgICBsYXN0Q2FsbFRpbWUgPSB0aW1lO1xuXG4gICAgaWYgKGlzSW52b2tpbmcpIHtcbiAgICAgIGlmICh0aW1lcklkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGxlYWRpbmdFZGdlKGxhc3RDYWxsVGltZSlcbiAgICAgIH1cbiAgICAgIGlmIChtYXhpbmcpIHtcbiAgICAgICAgLy8gSGFuZGxlIGludm9jYXRpb25zIGluIGEgdGlnaHQgbG9vcC5cbiAgICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICAgICAgcmV0dXJuIGludm9rZUZ1bmMobGFzdENhbGxUaW1lKVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGltZXJJZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpXG4gICAgfVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIGRlYm91bmNlZC5jYW5jZWwgPSBjYW5jZWw7XG4gIGRlYm91bmNlZC5mbHVzaCA9IGZsdXNoO1xuICByZXR1cm4gZGVib3VuY2VkXG59O1xuXG4vL2h0dHBzOi8vZ2l0aHViLmNvbS9sb2Rhc2gvbG9kYXNoL2Jsb2IvbWFzdGVyL3Rocm90dGxlLmpzXG5jb25zdCB0aHJvdHRsZSA9IGZ1bmN0aW9uIChmdW5jLCB3YWl0LCBvcHRpb25zKSB7XG4gIGxldCBsZWFkaW5nID0gdHJ1ZTtcbiAgbGV0IHRyYWlsaW5nID0gdHJ1ZTtcblxuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGEgZnVuY3Rpb24nKTtcbiAgfVxuICBpZiAoaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICBsZWFkaW5nID0gJ2xlYWRpbmcnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMubGVhZGluZyA6IGxlYWRpbmc7XG4gICAgdHJhaWxpbmcgPSAndHJhaWxpbmcnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMudHJhaWxpbmcgOiB0cmFpbGluZztcbiAgfVxuICByZXR1cm4gZGVib3VuY2UoZnVuYywgd2FpdCwge1xuICAgICdsZWFkaW5nJzogbGVhZGluZyxcbiAgICAnbWF4V2FpdCc6IHdhaXQsXG4gICAgJ3RyYWlsaW5nJzogdHJhaWxpbmdcbiAgfSk7XG59XG5cblxuZnVuY3Rpb24gZGVlcENvcHkob2JqKSB7XG4gIGxldCByLCBsO1xuICBpZiAodHlwZW9mIG9iaiA9PSAnb2JqZWN0Jykge1xuICAgIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAgIGwgPSBvYmoubGVuZ3RoO1xuICAgICAgciA9IG5ldyBBcnJheShsKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHJbaV0gPSBkZWVwQ29weShvYmpbaV0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBvYmopO1xuICAgIH1cbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG5mdW5jdGlvbiBlc2NhcGVIdG1sKHMpIHtcbiAgaWYgKF90b1N0cmluZy5jYWxsKHMpICE9IFwiW29iamVjdCBTdHJpbmddXCIpIHJldHVybiBzO1xuICBpZiAoIXMpIHJldHVybiBcIlwiO1xuICByZXR1cm4gcy5yZXBsYWNlKC9bXFw8XFw+XFwmXFxcIl0vZ20sIGZ1bmN0aW9uIChtYXRjaCkge1xuICAgIHN3aXRjaCAobWF0Y2gpIHtcbiAgICAgIGNhc2UgXCI8XCI6XG4gICAgICAgIHJldHVybiBcIiZsdDtcIjtcbiAgICAgIGNhc2UgXCI+XCI6XG4gICAgICAgIHJldHVybiBcIiZndDtcIjtcbiAgICAgIGNhc2UgXCImXCI6XG4gICAgICAgIHJldHVybiBcIiZhbXA7XCI7XG4gICAgICBjYXNlIFwiXFxcIlwiOlxuICAgICAgICByZXR1cm4gXCImcXVvdDtcIjtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBtYXRjaDtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiB1bmVzY2FwZUh0bWwocykge1xuICBpZiAoX3RvU3RyaW5nLmNhbGwocykgIT0gXCJbb2JqZWN0IFN0cmluZ11cIikgcmV0dXJuIHM7XG4gIGlmICghcykgcmV0dXJuIFwiXCI7XG4gIHJldHVybiBzLnJlcGxhY2UoLygmbHQ7KXwoJmd0Oyl8KCZhbXA7KXwoJnF1b3Q7KS9nbSwgZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgc3dpdGNoIChtYXRjaCkge1xuICAgICAgY2FzZSBcIiZsdDtcIjpcbiAgICAgICAgcmV0dXJuIFwiPFwiO1xuICAgICAgY2FzZSBcIiZndDtcIjpcbiAgICAgICAgcmV0dXJuIFwiPlwiO1xuICAgICAgY2FzZSBcIiZhbXA7XCI6XG4gICAgICAgIHJldHVybiBcIiZcIjtcbiAgICAgIGNhc2UgXCImcXVvdDtcIjpcbiAgICAgICAgcmV0dXJuIFwiXFxcIlwiO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIG1hdGNoO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogQG5hbWVzcGFjZSBheDZzdHJpbmdcbiAqIEBleGFtcGxlXG4gKiBgYGBqc1xuICogQVg2VXRpbC5zdHJpbmcoXCJ7MH0gaXMgZGVhZFwiKS5mb3JtYXQoXCJBXCIpO1xuICogQVg2VXRpbC5zdHJpbmcoXCJTdHJpbmdcIikuZXNjYXBlKCk7XG4gKiBBWDZVdGlsLnN0cmluZyhcIlN0cmluZ1wiKS51bmVzY2FwZSgpO1xuICogQVg2VXRpbC5zdHJpbmcoXCJTdHJpbmdcIikuZW5jb2RlKCk7XG4gKiBBWDZVdGlsLnN0cmluZyhcIlN0cmluZ1wiKS5kZWNvZGUoKTtcbiAqIEFYNlV0aWwuc3RyaW5nKFwiU3RyaW5nXCIpLmxlZnQoMSk7XG4gKiBBWDZVdGlsLnN0cmluZyhcIlN0cmluZ1wiKS5yaWdodCgxKTtcbiAqIEFYNlV0aWwuc3RyaW5nKFwiU3RyaW5nXCIpLmNhbWVsQ2FzZSgpO1xuICogQVg2VXRpbC5zdHJpbmcoXCJTdHJpbmdcIikuc25ha2VDYXNlKCk7XG4gKiBgYGBcbiAqL1xuXG5mdW5jdGlvbiBzdHJpbmcoX3N0cmluZykge1xuICByZXR1cm4gbmV3IChmdW5jdGlvbiAoX3N0cmluZykge1xuICAgIHRoaXMudmFsdWUgPSBfc3RyaW5nO1xuICAgIHRoaXMudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICB9O1xuICAgIHRoaXMuZm9ybWF0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IGFyZ3MgPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBhcmdzID0gYXJncy5jb25jYXQoYXJndW1lbnRzW2ldKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLnZhbHVlLnJlcGxhY2UoL3soXFxkKyl9L2csIGZ1bmN0aW9uIChtYXRjaCwgbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgYXJnc1tudW1iZXJdICE9ICd1bmRlZmluZWQnID8gYXJnc1tudW1iZXJdIDogbWF0Y2g7XG4gICAgICB9KTtcbiAgICB9O1xuICAgIHRoaXMuZXNjYXBlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGVzY2FwZUh0bWwodGhpcy52YWx1ZSk7XG4gICAgfTtcbiAgICB0aGlzLnVuZXNjYXBlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHVuZXNjYXBlSHRtbCh0aGlzLnZhbHVlKTtcbiAgICB9O1xuICAgIHRoaXMuZW5jb2RlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGVuY29kZSh0aGlzLnZhbHVlKTtcbiAgICB9O1xuICAgIHRoaXMuZGVjb2RlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGRlY29kZSh0aGlzLnZhbHVlKTtcbiAgICB9O1xuICAgIHRoaXMubGVmdCA9IGZ1bmN0aW9uIChfcG9zKSB7XG4gICAgICByZXR1cm4gbGVmdCh0aGlzLnZhbHVlLCBfcG9zKTtcbiAgICB9O1xuICAgIHRoaXMucmlnaHQgPSBmdW5jdGlvbiAoX3Bvcykge1xuICAgICAgcmV0dXJuIHJpZ2h0KHRoaXMudmFsdWUsIF9wb3MpO1xuICAgIH07XG4gICAgdGhpcy5jYW1lbENhc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gY2FtZWxDYXNlKHRoaXMudmFsdWUpO1xuICAgIH07XG4gICAgdGhpcy5zbmFrZUNhc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gc25ha2VDYXNlKHRoaXMudmFsdWUpO1xuICAgIH07XG4gIH0pKF9zdHJpbmcpO1xufVxuXG5mdW5jdGlvbiBjb2xvcihfaGV4Q29sb3IpIHtcblxuICBjb25zdCBtYXRjaGVycyA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICAvLyA8aHR0cDovL3d3dy53My5vcmcvVFIvY3NzMy12YWx1ZXMvI2ludGVnZXJzPlxuICAgIGNvbnN0IENTU19JTlRFR0VSID0gXCJbLVxcXFwrXT9cXFxcZCslP1wiO1xuXG4gICAgLy8gPGh0dHA6Ly93d3cudzMub3JnL1RSL2NzczMtdmFsdWVzLyNudW1iZXItdmFsdWU+XG4gICAgY29uc3QgQ1NTX05VTUJFUiA9IFwiWy1cXFxcK10/XFxcXGQqXFxcXC5cXFxcZCslP1wiO1xuXG4gICAgLy8gQWxsb3cgcG9zaXRpdmUvbmVnYXRpdmUgaW50ZWdlci9udW1iZXIuICBEb24ndCBjYXB0dXJlIHRoZSBlaXRoZXIvb3IsIGp1c3QgdGhlIGVudGlyZSBvdXRjb21lLlxuICAgIGNvbnN0IENTU19VTklUID0gXCIoPzpcIiArIENTU19OVU1CRVIgKyBcIil8KD86XCIgKyBDU1NfSU5URUdFUiArIFwiKVwiO1xuXG4gICAgLy8gQWN0dWFsIG1hdGNoaW5nLlxuICAgIC8vIFBhcmVudGhlc2VzIGFuZCBjb21tYXMgYXJlIG9wdGlvbmFsLCBidXQgbm90IHJlcXVpcmVkLlxuICAgIC8vIFdoaXRlc3BhY2UgY2FuIHRha2UgdGhlIHBsYWNlIG9mIGNvbW1hcyBvciBvcGVuaW5nIHBhcmVuXG4gICAgY29uc3QgUEVSTUlTU0lWRV9NQVRDSDMgPSBcIltcXFxcc3xcXFxcKF0rKFwiICsgQ1NTX1VOSVQgKyBcIilbLHxcXFxcc10rKFwiICsgQ1NTX1VOSVQgKyBcIilbLHxcXFxcc10rKFwiICsgQ1NTX1VOSVQgKyBcIilcXFxccypcXFxcKT9cIjtcbiAgICBjb25zdCBQRVJNSVNTSVZFX01BVENINCA9IFwiW1xcXFxzfFxcXFwoXSsoXCIgKyBDU1NfVU5JVCArIFwiKVssfFxcXFxzXSsoXCIgKyBDU1NfVU5JVCArIFwiKVssfFxcXFxzXSsoXCIgKyBDU1NfVU5JVCArIFwiKVssfFxcXFxzXSsoXCIgKyBDU1NfVU5JVCArIFwiKVxcXFxzKlxcXFwpP1wiO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIENTU19VTklUOiBuZXcgUmVnRXhwKENTU19VTklUKSxcbiAgICAgIHJnYjogbmV3IFJlZ0V4cChcInJnYlwiICsgUEVSTUlTU0lWRV9NQVRDSDMpLFxuICAgICAgcmdiYTogbmV3IFJlZ0V4cChcInJnYmFcIiArIFBFUk1JU1NJVkVfTUFUQ0g0KSxcbiAgICAgIGhzbDogbmV3IFJlZ0V4cChcImhzbFwiICsgUEVSTUlTU0lWRV9NQVRDSDMpLFxuICAgICAgaHNsYTogbmV3IFJlZ0V4cChcImhzbGFcIiArIFBFUk1JU1NJVkVfTUFUQ0g0KSxcbiAgICAgIGhzdjogbmV3IFJlZ0V4cChcImhzdlwiICsgUEVSTUlTU0lWRV9NQVRDSDMpLFxuICAgICAgaHN2YTogbmV3IFJlZ0V4cChcImhzdmFcIiArIFBFUk1JU1NJVkVfTUFUQ0g0KSxcbiAgICAgIGhleDM6IC9eIz8oWzAtOWEtZkEtRl17MX0pKFswLTlhLWZBLUZdezF9KShbMC05YS1mQS1GXXsxfSkkLyxcbiAgICAgIGhleDY6IC9eIz8oWzAtOWEtZkEtRl17Mn0pKFswLTlhLWZBLUZdezJ9KShbMC05YS1mQS1GXXsyfSkkLyxcbiAgICAgIGhleDQ6IC9eIz8oWzAtOWEtZkEtRl17MX0pKFswLTlhLWZBLUZdezF9KShbMC05YS1mQS1GXXsxfSkoWzAtOWEtZkEtRl17MX0pJC8sXG4gICAgICBoZXg4OiAvXiM/KFswLTlhLWZBLUZdezJ9KShbMC05YS1mQS1GXXsyfSkoWzAtOWEtZkEtRl17Mn0pKFswLTlhLWZBLUZdezJ9KSQvXG4gICAgfTtcbiAgfSkoKTtcblxuICBjb25zdCBjb252ZXJ0T2JqZWN0ID0gZnVuY3Rpb24gKF9jb2xvcikge1xuICAgIGxldCBtYXRjaDtcbiAgICBpZiAoKG1hdGNoID0gbWF0Y2hlcnMucmdiLmV4ZWMoX2NvbG9yKSkpIHtcbiAgICAgIHJldHVybiB7cjogbWF0Y2hbMV0sIGc6IG1hdGNoWzJdLCBiOiBtYXRjaFszXX07XG4gICAgfVxuICAgIGlmICgobWF0Y2ggPSBtYXRjaGVycy5yZ2JhLmV4ZWMoX2NvbG9yKSkpIHtcbiAgICAgIHJldHVybiB7cjogbWF0Y2hbMV0sIGc6IG1hdGNoWzJdLCBiOiBtYXRjaFszXSwgYTogbWF0Y2hbNF19O1xuICAgIH1cbiAgICBpZiAoKG1hdGNoID0gbWF0Y2hlcnMuaHNsLmV4ZWMoX2NvbG9yKSkpIHtcbiAgICAgIHJldHVybiB7aDogbWF0Y2hbMV0sIHM6IG1hdGNoWzJdLCBsOiBtYXRjaFszXX07XG4gICAgfVxuICAgIGlmICgobWF0Y2ggPSBtYXRjaGVycy5oc2xhLmV4ZWMoX2NvbG9yKSkpIHtcbiAgICAgIHJldHVybiB7aDogbWF0Y2hbMV0sIHM6IG1hdGNoWzJdLCBsOiBtYXRjaFszXSwgYTogbWF0Y2hbNF19O1xuICAgIH1cbiAgICBpZiAoKG1hdGNoID0gbWF0Y2hlcnMuaHN2LmV4ZWMoX2NvbG9yKSkpIHtcbiAgICAgIHJldHVybiB7aDogbWF0Y2hbMV0sIHM6IG1hdGNoWzJdLCB2OiBtYXRjaFszXX07XG4gICAgfVxuICAgIGlmICgobWF0Y2ggPSBtYXRjaGVycy5oc3ZhLmV4ZWMoX2NvbG9yKSkpIHtcbiAgICAgIHJldHVybiB7aDogbWF0Y2hbMV0sIHM6IG1hdGNoWzJdLCB2OiBtYXRjaFszXSwgYTogbWF0Y2hbNF19O1xuICAgIH1cbiAgICBpZiAoKG1hdGNoID0gbWF0Y2hlcnMuaGV4OC5leGVjKF9jb2xvcikpKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByOiBwYXJzZUludChtYXRjaFsxXSwgMTYpLFxuICAgICAgICBnOiBwYXJzZUludChtYXRjaFsyXSwgMTYpLFxuICAgICAgICBiOiBwYXJzZUludChtYXRjaFszXSwgMTYpLFxuICAgICAgICBhOiBwYXJzZUludCgobWF0Y2hbNF0pIC8gMjU1LCAxNiksXG4gICAgICAgIGZvcm1hdDogXCJoZXg4XCJcbiAgICAgIH07XG4gICAgfVxuICAgIGlmICgobWF0Y2ggPSBtYXRjaGVycy5oZXg2LmV4ZWMoX2NvbG9yKSkpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHI6IHBhcnNlSW50KG1hdGNoWzFdLCAxNiksXG4gICAgICAgIGc6IHBhcnNlSW50KG1hdGNoWzJdLCAxNiksXG4gICAgICAgIGI6IHBhcnNlSW50KG1hdGNoWzNdLCAxNiksXG4gICAgICAgIGZvcm1hdDogXCJoZXhcIlxuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKChtYXRjaCA9IG1hdGNoZXJzLmhleDQuZXhlYyhfY29sb3IpKSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcjogcGFyc2VJbnQobWF0Y2hbMV0gKyAnJyArIG1hdGNoWzFdLCAxNiksXG4gICAgICAgIGc6IHBhcnNlSW50KG1hdGNoWzJdICsgJycgKyBtYXRjaFsyXSwgMTYpLFxuICAgICAgICBiOiBwYXJzZUludChtYXRjaFszXSArICcnICsgbWF0Y2hbM10sIDE2KSxcbiAgICAgICAgYTogcGFyc2VJbnQobWF0Y2hbNF0gKyAnJyArIG1hdGNoWzRdLCAxNiksXG4gICAgICAgIGZvcm1hdDogXCJoZXg4XCJcbiAgICAgIH07XG4gICAgfVxuICAgIGlmICgobWF0Y2ggPSBtYXRjaGVycy5oZXgzLmV4ZWMoX2NvbG9yKSkpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHI6IHBhcnNlSW50KG1hdGNoWzFdICsgJycgKyBtYXRjaFsxXSwgMTYpLFxuICAgICAgICBnOiBwYXJzZUludChtYXRjaFsyXSArICcnICsgbWF0Y2hbMl0sIDE2KSxcbiAgICAgICAgYjogcGFyc2VJbnQobWF0Y2hbM10gKyAnJyArIG1hdGNoWzNdLCAxNiksXG4gICAgICAgIGZvcm1hdDogXCJoZXhcIlxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgZnVuY3Rpb24gaXNPbmVQb2ludFplcm8obikge1xuICAgIHJldHVybiB0eXBlb2YgbiA9PSBcInN0cmluZ1wiICYmIG4uaW5kZXhPZignLicpICE9IC0xICYmIHBhcnNlRmxvYXQobikgPT09IDE7XG4gIH1cblxuICBmdW5jdGlvbiBpc1BlcmNlbnRhZ2Uobikge1xuICAgIHJldHVybiB0eXBlb2YgbiA9PT0gXCJzdHJpbmdcIiAmJiBuLmluZGV4T2YoJyUnKSAhPSAtMTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnZlcnRUb1BlcmNlbnRhZ2Uobikge1xuICAgIGlmIChuIDw9IDEpIHtcbiAgICAgIG4gPSAobiAqIDEwMCkgKyBcIiVcIjtcbiAgICB9XG5cbiAgICByZXR1cm4gbjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnZlcnRUbzI1NShuKSB7XG4gICAgcmV0dXJuIG51bWJlcihNYXRoLm1pbigyNTUsIE1hdGgubWF4KG4sIDApKSwgeydyb3VuZCc6IDJ9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnZlcnRUb0hleChuKSB7XG4gICAgcmV0dXJuIHNldERpZ2l0KE1hdGgucm91bmQobikudG9TdHJpbmcoMTYpLCAyKVxuICB9XG5cbiAgZnVuY3Rpb24gYm91bmQwMShuLCBtYXgpIHtcbiAgICBpZiAoaXNPbmVQb2ludFplcm8obikpIHtcbiAgICAgIG4gPSBcIjEwMCVcIjtcbiAgICB9XG5cbiAgICBsZXQgcHJvY2Vzc1BlcmNlbnQgPSBpc1BlcmNlbnRhZ2Uobik7XG4gICAgbiA9IE1hdGgubWluKG1heCwgTWF0aC5tYXgoMCwgcGFyc2VGbG9hdChuKSkpO1xuXG4gICAgLy8gQXV0b21hdGljYWxseSBjb252ZXJ0IHBlcmNlbnRhZ2UgaW50byBudW1iZXJcbiAgICBpZiAocHJvY2Vzc1BlcmNlbnQpIHtcbiAgICAgIG4gPSBwYXJzZUludChuICogbWF4LCAxMCkgLyAxMDA7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIGZsb2F0aW5nIHBvaW50IHJvdW5kaW5nIGVycm9yc1xuICAgIGlmICgoTWF0aC5hYnMobiAtIG1heCkgPCAwLjAwMDAwMSkpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH1cblxuICAgIC8vIENvbnZlcnQgaW50byBbMCwgMV0gcmFuZ2UgaWYgaXQgaXNuJ3QgYWxyZWFkeVxuICAgIHJldHVybiAobiAlIG1heCkgLyBwYXJzZUZsb2F0KG1heCk7XG4gIH1cblxuICBmdW5jdGlvbiByZ2JUb0hzbChyLCBnLCBiKSB7XG4gICAgciA9IGJvdW5kMDEociwgMjU1KTtcbiAgICBnID0gYm91bmQwMShnLCAyNTUpO1xuICAgIGIgPSBib3VuZDAxKGIsIDI1NSk7XG5cbiAgICBsZXQgbWF4ID0gTWF0aC5tYXgociwgZywgYiksIG1pbiA9IE1hdGgubWluKHIsIGcsIGIpO1xuICAgIGxldCBoLCBzLCBsID0gKG1heCArIG1pbikgLyAyO1xuXG4gICAgaWYgKG1heCA9PSBtaW4pIHtcbiAgICAgIGggPSBzID0gMDsgLy8gYWNocm9tYXRpY1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGxldCBkID0gbWF4IC0gbWluO1xuICAgICAgcyA9IGwgPiAwLjUgPyBkIC8gKDIgLSBtYXggLSBtaW4pIDogZCAvIChtYXggKyBtaW4pO1xuICAgICAgc3dpdGNoIChtYXgpIHtcbiAgICAgICAgY2FzZSByOlxuICAgICAgICAgIGggPSAoZyAtIGIpIC8gZCArIChnIDwgYiA/IDYgOiAwKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBnOlxuICAgICAgICAgIGggPSAoYiAtIHIpIC8gZCArIDI7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgYjpcbiAgICAgICAgICBoID0gKHIgLSBnKSAvIGQgKyA0O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBoIC89IDY7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtoOiBoLCBzOiBzLCBsOiBsfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhzbFRvUmdiKGgsIHMsIGwpIHtcbiAgICBsZXQgciwgZywgYjtcblxuICAgIGggPSBib3VuZDAxKGgsIDM2MCk7XG4gICAgcyA9IGJvdW5kMDEocywgMTAwKTtcbiAgICBsID0gYm91bmQwMShsLCAxMDApO1xuXG4gICAgZnVuY3Rpb24gaHVlMnJnYihwLCBxLCB0KSB7XG4gICAgICBpZiAodCA8IDApIHQgKz0gMTtcbiAgICAgIGlmICh0ID4gMSkgdCAtPSAxO1xuICAgICAgaWYgKHQgPCAxIC8gNikgcmV0dXJuIHAgKyAocSAtIHApICogNiAqIHQ7XG4gICAgICBpZiAodCA8IDEgLyAyKSByZXR1cm4gcTtcbiAgICAgIGlmICh0IDwgMiAvIDMpIHJldHVybiBwICsgKHEgLSBwKSAqICgyIC8gMyAtIHQpICogNjtcbiAgICAgIHJldHVybiBwO1xuICAgIH1cblxuICAgIGlmIChzID09PSAwKSB7XG4gICAgICByID0gZyA9IGIgPSBsOyAvLyBhY2hyb21hdGljXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgbGV0IHEgPSBsIDwgMC41ID8gbCAqICgxICsgcykgOiBsICsgcyAtIGwgKiBzO1xuICAgICAgbGV0IHAgPSAyICogbCAtIHE7XG4gICAgICByID0gaHVlMnJnYihwLCBxLCBoICsgMSAvIDMpO1xuICAgICAgZyA9IGh1ZTJyZ2IocCwgcSwgaCk7XG4gICAgICBiID0gaHVlMnJnYihwLCBxLCBoIC0gMSAvIDMpO1xuICAgIH1cblxuICAgIHJldHVybiB7cjogciAqIDI1NSwgZzogZyAqIDI1NSwgYjogYiAqIDI1NX07XG4gIH1cblxuICByZXR1cm4gbmV3IChmdW5jdGlvbiAoX2NvbG9yKSB7XG4gICAgdGhpcy5fb3JpZ2luYWxWYWx1ZSA9IF9jb2xvcjtcbiAgICBfY29sb3IgPSBjb252ZXJ0T2JqZWN0KF9jb2xvcik7XG4gICAgdGhpcy5yID0gX2NvbG9yLnI7XG4gICAgdGhpcy5nID0gX2NvbG9yLmc7XG4gICAgdGhpcy5iID0gX2NvbG9yLmI7XG4gICAgdGhpcy5hID0gX2NvbG9yLmEgfHwgMTtcbiAgICB0aGlzLl9mb3JtYXQgPSBfY29sb3IuZm9ybWF0O1xuICAgIHRoaXMuX2hleCA9IGNvbnZlcnRUb0hleCh0aGlzLnIpICsgY29udmVydFRvSGV4KHRoaXMuZykgKyBjb252ZXJ0VG9IZXgodGhpcy5iKTtcblxuICAgIHRoaXMuZ2V0SGV4VmFsdWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5faGV4O1xuICAgIH07XG5cbiAgICB0aGlzLmxpZ2h0ZW4gPSBmdW5jdGlvbiAoYW1vdW50KSB7XG4gICAgICBhbW91bnQgPSAoYW1vdW50ID09PSAwKSA/IDAgOiAoYW1vdW50IHx8IDEwKTtcbiAgICAgIGxldCBoc2wgPSByZ2JUb0hzbCh0aGlzLnIsIHRoaXMuZywgdGhpcy5iKSwgcmdiID0ge307XG5cbiAgICAgIGhzbC5sICs9IGFtb3VudCAvIDEwMDtcbiAgICAgIGhzbC5sID0gTWF0aC5taW4oMSwgTWF0aC5tYXgoMCwgaHNsLmwpKTtcbiAgICAgIGhzbC5oID0gaHNsLmggKiAzNjA7XG5cbiAgICAgIHJnYiA9IGhzbFRvUmdiKGhzbC5oLCBjb252ZXJ0VG9QZXJjZW50YWdlKGhzbC5zKSwgY29udmVydFRvUGVyY2VudGFnZShoc2wubCkpO1xuXG4gICAgICByZXR1cm4gY29sb3IoJ3JnYmEoJyArIGNvbnZlcnRUbzI1NShyZ2IucikgKyAnLCAnICsgY29udmVydFRvMjU1KHJnYi5nKSArICcsICcgKyBjb252ZXJ0VG8yNTUocmdiLmIpICsgJywgJyArIHRoaXMuYSArICcpJyk7XG4gICAgfTtcblxuICAgIHRoaXMuZGFya2VuID0gZnVuY3Rpb24gKGFtb3VudCkge1xuICAgICAgYW1vdW50ID0gKGFtb3VudCA9PT0gMCkgPyAwIDogKGFtb3VudCB8fCAxMCk7XG4gICAgICBsZXQgaHNsID0gcmdiVG9Ic2wodGhpcy5yLCB0aGlzLmcsIHRoaXMuYiksIHJnYiA9IHt9O1xuXG4gICAgICBoc2wubCAtPSBhbW91bnQgLyAxMDA7XG4gICAgICBoc2wubCA9IE1hdGgubWluKDEsIE1hdGgubWF4KDAsIGhzbC5sKSk7XG4gICAgICBoc2wuaCA9IGhzbC5oICogMzYwO1xuXG4gICAgICByZ2IgPSBoc2xUb1JnYihoc2wuaCwgY29udmVydFRvUGVyY2VudGFnZShoc2wucyksIGNvbnZlcnRUb1BlcmNlbnRhZ2UoaHNsLmwpKTtcblxuICAgICAgcmV0dXJuIGNvbG9yKCdyZ2JhKCcgKyBjb252ZXJ0VG8yNTUocmdiLnIpICsgJywgJyArIGNvbnZlcnRUbzI1NShyZ2IuZykgKyAnLCAnICsgY29udmVydFRvMjU1KHJnYi5iKSArICcsICcgKyB0aGlzLmEgKyAnKScpO1xuICAgIH07XG5cbiAgICB0aGlzLmdldEJyaWdodG5lc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gKHRoaXMuciAqIDI5OSArIHRoaXMuZyAqIDU4NyArIHRoaXMuYiAqIDExNCkgLyAxMDAwO1xuICAgIH07XG5cbiAgICB0aGlzLmlzRGFyayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldEJyaWdodG5lc3MoKSA8IDEyODtcbiAgICB9O1xuXG4gICAgdGhpcy5pc0xpZ2h0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuICF0aGlzLmlzRGFyaygpO1xuICAgIH07XG5cbiAgICB0aGlzLmdldEhzbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBoc2wgPSByZ2JUb0hzbCh0aGlzLnIsIHRoaXMuZywgdGhpcy5iKTtcbiAgICAgIGhzbC5sID0gTWF0aC5taW4oMSwgTWF0aC5tYXgoMCwgaHNsLmwpKTtcbiAgICAgIGhzbC5oID0gaHNsLmggKiAzNjA7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBoOiBoc2wuaCxcbiAgICAgICAgczogaHNsLnMsXG4gICAgICAgIGw6IGhzbC5sXG4gICAgICB9XG4gICAgfTtcblxuICB9KShfaGV4Q29sb3IpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgLyoqXG4gICAqIGpzb25TdHJpbmcg7Jy866GcIGFsZXJ0IO2VqeuLiOuLpC5cbiAgICogQHBhcmFtIHtPYmplY3R8QXJyYXl8U3RyaW5nfE51bWJlcn0gT1xuICAgKiBAcmV0dXJucyB7T2JqZWN0fEFycmF5fFN0cmluZ3xOdW1iZXJ9IE9cbiAgICogQGV4YW1wbGUgYGBganNcbiAgICogQVg2VXRpbC5hbGVydCh7YToxLGI6Mn0pO1xuICAgKiBBWDZVdGlsLmFsZXJ0KFwi7KCV66eQP1wiKTtcbiAgICogYGBgXG4gICAqL1xuICBhbGVydDogYWxlcnQsXG4gIC8qKlxuICAgKiBPYmplY3TrgpggQXJyYXnsnZgg7JWE7J207YWc7Jy866GcIOyCrOyaqeyekCDtlajsiJjrpbwg7Zi47Lac7ZWp64uI64ukLlxuICAgKiBAcGFyYW0ge09iamVjdHxBcnJheX0gT1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBfZm5cbiAgICogQGV4YW1wbGVcbiAgICogYGBganNcbiAgICogdmFyIGF4ZiA9IEFYNlV0aWw7XG4gICAqIGF4Zi5lYWNoKFswLDEsMl0sIGZ1bmN0aW9uKCl7XG5cdFx0ICogXHQvLyB3aXRoIHRoaXNcblx0XHQgKiB9KTtcbiAgICogYXhmLmVhY2goe2E6MSwgYjoyfSwgZnVuY3Rpb24oKXtcblx0XHQgKiBcdC8vIHdpdGggdGhpc1xuXHRcdCAqIH0pO1xuICAgKiBgYGBcbiAgICovXG4gIGVhY2g6IGVhY2gsXG4gIC8qKlxuICAgKiDsm5Drs7gg7JWE7J207YWc65Ok7J2EIOydtOyaqe2VmOyXrCDsgqzsmqnsnpAg7ZWo7IiY7J2YIOumrO2EtOqwkuydtCDssLjsnbgg7JWE7J207YWc7J2YIOychOy5mOuCmCDtgqTqsJLsnYQg67CY7ZmY7ZWp64uI64ukLlxuICAgKiBAcGFyYW0ge09iamVjdHxBcnJheX0gT1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufFN0cmluZ3xOdW1iZXJ9IF9mbiAtIO2VqOyImCDrmJDripQg6rCSXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ8U3RyaW5nfVxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBqc1xuICAgKiB2YXIgbXlBcnJheSA9IFswLDEsMiwzLDQsNSw2XTtcbiAgICogdmFyIG15T2JqZWN0ID0ge2E6XCIxMjNcIixcImJcIjpcIjEyM1wiLGM6MTIzfTtcbiAgICpcbiAgICogQVg2VXRpbC5zZWFyY2gobXlBcnJheSwgIGZ1bmN0aW9uKCl7XG5cdFx0ICogICAgcmV0dXJuIHRoaXMgPiAzO1xuXHRcdCAqIH0pO1xuICAgKiAvLyA0XG4gICAqIEFYNlV0aWwuc2VhcmNoKG15T2JqZWN0LCAgZnVuY3Rpb24oaywgdil7XG5cdFx0ICogICAgcmV0dXJuIHYgPT09IDEyMztcblx0XHQgKiB9KTtcbiAgICogLy8gXCJjXCJcbiAgICogQVg2VXRpbC5zZWFyY2goWzEsMiwzLDRdLCAzKTtcbiAgICogLy8gMlxuICAgKiBBWDZVdGlsLnNlYXJjaChbMSwyXSwgNCk7XG4gICAqIC8vIC0xXG4gICAqIEFYNlV0aWwuc2VhcmNoKFtcIm5hbWVcIixcInZhbHVlXCJdLCBcInZhbHVlXCIpO1xuICAgKiAvLyAxXG4gICAqIEFYNlV0aWwuc2VhcmNoKFtcIm5hbWVcIixcInZhbHVlXCJdLCBcInZhbHVlc1wiKTtcbiAgICogLy8gLTFcbiAgICogQVg2VXRpbC5zZWFyY2goe2sxOlwibmFtZVwiLGsyOlwidmFsdWVcIn0sIFwidmFsdWUyXCIpO1xuICAgKiAvLyAtMVxuICAgKiBBWDZVdGlsLnNlYXJjaCh7azE6XCJuYW1lXCIsazI6XCJ2YWx1ZVwifSwgXCJ2YWx1ZVwiKTtcbiAgICogLy8gXCJrMlwiXG4gICAqIGBgYFxuICAgKi9cbiAgc2VhcmNoOiBzZWFyY2gsXG4gIC8qKlxuICAgKiDrsLDsl7TrmJDripQg7Jik67iM7KCd7Yq47J2YIOqwgSDslYTsnbTthZzsnYQg7J247J6Q66GcIO2VmOuKlCDsgqzsmqnsnpAg7ZWo7IiY7J2YIOqysOqzvOqwgCDssLjsnbgg7JWE7J207YWc65Ok7J2YIOuwsOyXtOydhCDrsJjtmZjtlanri4jri6QuXG4gICAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBPXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IF9mblxuICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqIHZhciBhYXJyYXkgPSBbNSw0LDMsMiwxXTtcbiAgICogcmVzdWx0ID0gQVg2VXRpbC5maWx0ZXIoIGFhcnJheSwgZnVuY3Rpb24oKXtcblx0XHQgKiAgICByZXR1cm4gdGhpcyAlIDI7XG5cdFx0ICogfSk7XG4gICAqIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAqIC8vIFs1LCAzLCAxXVxuICAgKlxuICAgKiB2YXIgZmlsT2JqZWN0ID0ge2E6MSwgczpcInN0cmluZ1wiLCBvYTp7cGlja3VwOnRydWUsIG5hbWU6XCJBWElTSlwifSwgb3M6e3BpY2t1cDp0cnVlLCBuYW1lOlwiQVg1XCJ9fTtcbiAgICogcmVzdWx0ID0gQVg2VXRpbC5maWx0ZXIoIGZpbE9iamVjdCwgZnVuY3Rpb24oKXtcblx0XHQgKiBcdHJldHVybiB0aGlzLnBpY2t1cDtcblx0XHQgKiB9KTtcbiAgICogY29uc29sZS5sb2coIEFYNlV0aWwudG9Kc29uKHJlc3VsdCkgKTtcbiAgICogLy8gW3tcInBpY2t1cFwiOiAsIFwibmFtZVwiOiBcIkFYSVNKXCJ9LCB7XCJwaWNrdXBcIjogLCBcIm5hbWVcIjogXCJBWDVcIn1dXG4gICAqIGBgYFxuICAgKi9cbiAgZmlsdGVyOiBmaWx0ZXIsXG4gIC8qKlxuICAgKiBPYmplY3TrpbwgSlNPTlN0cmluZyDsnLzroZwg67CY7ZmY7ZWp64uI64ukLlxuICAgKiBAbWV0aG9kIEFYNlV0aWwudG9Kc29uXG4gICAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBPXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IEpTT05cbiAgICogQGV4YW1wbGVcbiAgICogYGBganNcbiAgICogdmFyIGF4ID0gQVg2VXRpbDtcbiAgICogdmFyIG15T2JqZWN0ID0ge1xuXHRcdCAqICAgIGE6MSwgYjpcIjJcIiwgYzp7YXhqOlwid2hhdFwiLCBhcnJzOlswLDIsXCIzXCJdfSxcblx0XHQgKiAgICBmbjogZnVuY3Rpb24oYWJjZGQpe1xuXHRcdCAqICAgICAgICByZXR1cm4gYWJjZGQ7XG5cdFx0ICogICAgfVxuXHRcdCAqIH07XG4gICAqIGNvbnNvbGUubG9nKCBheC50b0pzb24obXlPYmplY3QpICk7XG4gICAqIGBgYFxuICAgKi9cbiAgdG9Kc29uOiB0b0pzb24sXG4gIC8qKlxuICAgKiDqtIDsmqnsnZggSlNPTiBQYXJzZXJcbiAgICogQHBhcmFtIHtTdHJpbmd9IEpTT05TdHJpbmdcbiAgICogQHBhcmFtIHtCb29sZWFufSBbZm9yY2VdIC0g6rCV7KCcIOyggeyaqSDsl6zrtoAgKGpzb24g66y47J6Q7Je0IOqygOyCrOulvCDrrLTsi5ztlZjqs6Ag7Jik67iM7KCd7Yq4IOuzgO2ZmOydhCDsi5zrj4Ttlanri4jri6QuKVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBcbiAgICogY29uc29sZS5sb2coQVg2VXRpbC5wYXJzZUpzb24oJ3tcImFcIjoxfScpKTtcbiAgICogLy8gT2JqZWN0IHthOiAxfVxuICAgKiBjb25zb2xlLmxvZyhBWDZVdGlsLnBhcnNlSnNvbihcInsnYSc6MSwgJ2InOidiJ31cIikpO1xuICAgKiAvLyBPYmplY3Qge2E6IDEsIGI6IFwiYlwifVxuICAgKiBjb25zb2xlLmxvZyhBWDZVdGlsLnBhcnNlSnNvbihcInsnYSc6MSwgJ2InOmZ1bmN0aW9uKCl7cmV0dXJuIDE7fX1cIiwgdHJ1ZSkpO1xuICAgKiAvLyBPYmplY3Qge2E6IDEsIGI6IGZ1bmN0aW9ufVxuICAgKiBjb25zb2xlLmxvZyhBWDZVdGlsLnBhcnNlSnNvbihcInthOjF9XCIpKTtcbiAgICogLy8gT2JqZWN0IHthOiAxfVxuICAgKiBjb25zb2xlLmxvZyhBWDZVdGlsLnBhcnNlSnNvbihcIlsxLDIsM11cIikpO1xuICAgKiAvLyBbMSwgMiwgM11cbiAgICogY29uc29sZS5sb2coQVg2VXRpbC5wYXJzZUpzb24oXCJbJzEnLCcyJywnMyddXCIpKTtcbiAgICogLy8gW1wiMVwiLCBcIjJcIiwgXCIzXCJdXG4gICAqIGNvbnNvbGUubG9nKEFYNlV0aWwucGFyc2VKc29uKFwiW3snYSc6Jzk5J30sJzInLCczJ11cIikpO1xuICAgKiAvLyBbT2JqZWN0LCBcIjJcIiwgXCIzXCJdXG4gICAqIGBgYFxuICAgKi9cbiAgcGFyc2VKc29uOiBwYXJzZUpzb24sXG4gIC8qKlxuICAgKiDsmKTruIzsoJ3tirjsnZgg7LKr67KI7Ke4IOyVhOydtO2FnOydhCDrsJjtmZjtlanri4jri6QuXG4gICAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBPXG4gICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqIEFYNlV0aWwuZmlyc3Qoe2E6MSwgYjoyfSk7XG4gICAqIC8vIE9iamVjdCB7YTogMX1cbiAgICogQVg2VXRpbC5maXJzdChbMSwyLDMsNF0pO1xuICAgKiAvLyAxXG4gICAqIGBgYFxuICAgKi9cbiAgZmlyc3Q6IGZpcnN0LFxuICAvKipcbiAgICog7Jik67iM7KCd7Yq47J2YIOuniOyngOuniSDslYTsnbTthZzsnYQg67CY7ZmY7ZWp64uI64ukLlxuICAgKiBAcGFyYW0ge09iamVjdHxBcnJheX0gT1xuICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBqc1xuICAgKiBBWDZVdGlsLmxhc3Qoe2E6MSwgYjoyfSk7XG4gICAqIC8vIE9iamVjdCB7YjogMn1cbiAgICogQVg2VXRpbC5sYXN0KFsxLDIsMyw0XSk7XG4gICAqIC8vIDRcbiAgICogYGBgXG4gICAqL1xuICBsYXN0OiBsYXN0LFxuICAvKipcbiAgICog66y47J6Q7Je07J2YIO2KueyglSDrrLjsnpDsl7TquYzsp4Ag7J6Y65287KO86rGw64KYIOybkO2VmOuKlCDtj6zsp4DshZjquYzsp4Ag7J6Y65287KSN64uI64ukLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyIC0g66y47J6Q7Je0XG4gICAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcn0gcG9zIC0g7LC+7J2EIOusuOyekOyXtCDrmJDripQg7Y+s7KeA7IWYXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqIEFYNlV0aWwubGVmdChcImFiY2QuZWZkXCIsIDMpO1xuICAgKiAvLyBhYmNcbiAgICogQVg2VXRpbC5sZWZ0KFwiYWJjZC5lZmRcIiwgXCIuXCIpO1xuICAgKiAvLyBhYmNkXG4gICAqIGBgYFxuICAgKi9cbiAgbGVmdDogbGVmdCxcbiAgLyoqXG4gICAqIOusuOyekOyXtOydmCDtirnsoJUg66y47J6Q7Je06rmM7KeAIOyemOudvOyjvOqxsOuCmCDsm5DtlZjripQg7Y+s7KeA7IWY6rmM7KeAIOyemOudvOykjeuLiOuLpC5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHN0ciAtIOusuOyekOyXtFxuICAgKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IHBvcyAtIOywvuydhCDrrLjsnpDsl7Qg65iQ64qUIO2PrOyngOyFmFxuICAgKiBAcmV0dXJucyB7U3RyaW5nfVxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBqc1xuICAgKiBBWDZVdGlsLnJpZ2h0KFwiYWJjZC5lZmRcIiwgMyk7XG4gICAqIC8vIGVmZFxuICAgKiBBWDZVdGlsLnJpZ2h0KFwiYWJjZC5lZmRcIiwgXCIuXCIpO1xuICAgKiAvLyBlZmRcbiAgICogYGBgXG4gICAqL1xuICByaWdodDogcmlnaHQsXG4gIC8qKlxuICAgKiDsnbjsnpDsnZgg7YOA7J6F7J2EIOuwmO2ZmO2VqeuLiOuLpC5cbiAgICogQHBhcmFtIHtPYmplY3R8QXJyYXl8U3RyaW5nfE51bWJlcnxFbGVtZW50fEV0Y30gT1xuICAgKiBAcmV0dXJucyB7U3RyaW5nfSB3aW5kb3d8ZWxlbWVudHxvYmplY3R8YXJyYXl8ZnVuY3Rpb258c3RyaW5nfG51bWJlcnx1bmRlZmluZWR8bm9kZWxpc3RcbiAgICogQGV4YW1wbGVcbiAgICogYGBganNcbiAgICogdmFyIGF4ZiA9IEFYNlV0aWw7XG4gICAqIHZhciBhID0gMTE7XG4gICAqIHZhciBiID0gXCIxMVwiO1xuICAgKiBjb25zb2xlLmxvZyggYXhmLmdldFR5cGUoYSkgKTtcbiAgICogY29uc29sZS5sb2coIGF4Zi5nZXRUeXBlKGIpICk7XG4gICAqIGBgYFxuICAgKi9cbiAgZ2V0VHlwZTogZ2V0VHlwZSxcbiAgLyoqXG4gICAqIOyYpOu4jOygne2KuOqwgCB3aW5kb3cg7J247KeAIO2MkOuLqO2VqeuLiOuLpC5cbiAgICogQHBhcmFtIHtPYmplY3R9IE9cbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqL1xuICBpc1dpbmRvdzogaXNXaW5kb3csXG4gIC8qKlxuICAgKiDsmKTruIzsoJ3tirjqsIAgSFRNTCDsl5jrpqzrqLztirjsl6zrtoDsnbjsp4Ag7YyQ64uo7ZWp64uI64ukLlxuICAgKiBAcGFyYW0ge09iamVjdH0gT1xuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICovXG4gIGlzRWxlbWVudDogaXNFbGVtZW50LFxuICAvKipcbiAgICog7Jik67iM7KCd7Yq46rCAIE9iamVjdOyduOyngCDtjJDri6jtlanri4jri6QuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBPXG4gICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgKi9cbiAgaXNPYmplY3Q6IGlzT2JqZWN0LFxuICAvKipcbiAgICog7Jik67iM7KCd7Yq46rCAIEFycmF57J247KeAIO2MkOuLqO2VqeuLiOuLpC5cbiAgICogQHBhcmFtIHtPYmplY3R9IE9cbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqL1xuICBpc0FycmF5OiBpc0FycmF5LFxuICAvKipcbiAgICog7Jik67iM7KCd7Yq46rCAIEZ1bmN0aW9u7J247KeAIO2MkOuLqO2VqeuLiOuLpC5cbiAgICogQHBhcmFtIHtPYmplY3R9IE9cbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqL1xuICBpc0Z1bmN0aW9uOiBpc0Z1bmN0aW9uLFxuICAvKipcbiAgICog7Jik67iM7KCd7Yq46rCAIFN0cmluZ+yduOyngCDtjJDri6jtlanri4jri6QuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBPXG4gICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgKi9cbiAgaXNTdHJpbmc6IGlzU3RyaW5nLFxuICAvKipcbiAgICog7Jik67iM7KCd7Yq46rCAIE51bWJlcuyduOyngCDtjJDri6jtlanri4jri6QuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBPXG4gICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgKi9cbiAgaXNOdW1iZXI6IGlzTnVtYmVyLFxuICAvKipcbiAgICog7Jik67iM7KCd7Yq46rCAIE5vZGVMaXN07J247KeAIO2MkOuLqO2VqeuLiOuLpC5cbiAgICogQHBhcmFtIHtPYmplY3R9IE9cbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqL1xuICBpc05vZGVsaXN0OiBpc05vZGVsaXN0LFxuICAvKipcbiAgICog7Jik67iM7KCd7Yq46rCAIHVuZGVmaW5lZOyduOyngCDtjJDri6jtlanri4jri6QuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBPXG4gICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgKi9cbiAgaXNVbmRlZmluZWQ6IGlzVW5kZWZpbmVkLFxuICAvKipcbiAgICog7Jik67iM7KCd7Yq46rCAIHVuZGVmaW5lZOydtOqxsOuCmCBudWxs7J206rGw64KYIOu5iOqwkuyduOyngCDtjJDri6jtlanri4jri6QuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBPXG4gICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgKi9cbiAgLyoqXG4gICAqIOyYpOu4jOygne2KuOqwgCDrgqDsnpDqsJLsnbjsp4Ag7YyQ64uo7ZWp64uI64ukLlxuICAgKiBAcGFyYW0ge0RhdGV9IE9cbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqIEFYNlV0aWwuaXNEYXRlKCcyMDE2LTA5LTMwJyk7XG4gICAqIC8vIGZhbHNlXG4gICAqIEFYNlV0aWwuaXNEYXRlKCBuZXcgRGF0ZSgnMjAxNi0wOS0zMCcpICk7XG4gICAqIC8vIHRydWVcbiAgICogYGBgXG4gICAqL1xuICBpc0RhdGU6IGlzRGF0ZSxcbiAgLyoqXG4gICAqIOyYpOu4jOygne2KuOqwgCDrgqDsp5ztmJUg67OA7IiY7J247KeAIO2MkOuLqO2VqeuLiOuLpFxuICAgKi9cbiAgaXNEYXRlRm9ybWF0OiBpc0RhdGVGb3JtYXQsXG4gIGlzTm90aGluZzogaXNOb3RoaW5nLFxuICAvKipcbiAgICog7L+g7YKk66W8IOyEpOygle2VqeuLiOuLpC5cbiAgICogQHBhcmFtIHtTdHJpbmd9IGNuYW1lIC0g7L+g7YKk7J2066aEXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBjdmFsdWUgLSDsv6DtgqTqsJJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtleGRheXNdIC0g7L+g7YKkIOycoOyngOydvOyImFxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdHNdIC0gcGF0aCwgZG9tYWluIOyEpOyglSDsmLXshZhcbiAgICogQGV4YW1wbGVcbiAgICogYGBganNcbiAgICogQVg2VXRpbC5zZXRDb29raWUoXCJqc2xpYlwiLCBcIkFYNVwiKTtcbiAgICogQVg2VXRpbC5zZXRDb29raWUoXCJqc2xpYlwiLCBcIkFYNVwiLCAzKTtcbiAgICogQVg2VXRpbC5zZXRDb29raWUoXCJqc2xpYlwiLCBcIkFYNVwiLCAzLCB7cGF0aDpcIi9cIiwgZG9tYWluOlwiLmF4aXNqLmNvbVwifSk7XG4gICAqIGBgYFxuICAgKi9cbiAgc2V0Q29va2llOiBzZXRDb29raWUsXG4gIC8qKlxuICAgKiDsv6DtgqTrpbwg6rCA7KC47Ji164uI64ukLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gY25hbWVcbiAgICogQHJldHVybnMge1N0cmluZ30gY29va2llIHZhbHVlXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqIEFYNlV0aWwuZ2V0Q29va2llKFwianNsaWJcIik7XG4gICAqIGBgYFxuICAgKi9cbiAgZ2V0Q29va2llOiBnZXRDb29raWUsXG4gIC8qKlxuICAgKiBjc3PtmJUg66y47J6Q7Je07J2064KYIO2KueyImOusuOyekOqwgCDtj6ztlajrkJwg66y47J6Q7Je07J2EIOy5tOupnOy8gOydtOyKpOuhnCDrsJTqvrjslrQg67CY7ZmY7ZWp64uI64ukLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqIEFYNlV0aWwuY2FtZWxDYXNlKFwiaW5uZXItd2lkdGhcIik7XG4gICAqIEFYNlV0aWwuY2FtZWxDYXNlKFwiaW5uZXJXaWR0aFwiKTtcbiAgICogLy8gaW5uZXJXaWR0aFxuICAgKiBgYGBcbiAgICovXG4gIGNhbWVsQ2FzZTogY2FtZWxDYXNlLFxuICAvKipcbiAgICogY3Nz7ZiVIOusuOyekOyXtOydtOuCmCDsubTrqZzsvIDsnbTsiqTrrLjsnpDsl7TsnYQg7Iqk64Sk7J207YGsIOy8gOydtOyKpCDrrLjsnpDsl7TroZwg67CU6r647Ja0IOuwmO2ZmO2VqeuLiOuLpC5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICAgKiBAcmV0dXJucyB7U3RyaW5nfVxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBqc1xuICAgKiBBWDZVdGlsLnNuYWtlQ2FzZShcImlubmVyV2lkdGhcIik7XG4gICAqIEFYNlV0aWwuc25ha2VDYXNlKFwiaW5uZXItV2lkdGhcIik7XG4gICAqIEFYNlV0aWwuc25ha2VDYXNlKFwiaW5uZXJXaWR0aFwiKTtcbiAgICogLy8gaW5uZXItd2lkdGhcbiAgICogYGBgXG4gICAqL1xuICBzbmFrZUNhc2U6IHNuYWtlQ2FzZSxcbiAgLyoqXG4gICAqIOusuOyekOyXtOyXkOyEnCAtLiDsnYQg7KCc7Jm47ZWcIOuqqOuToCDrrLjsnpDsl7TsnYQg7KCc6rGw7ZWY6rOgIOyIq+yekOuhnCDrsJjtmZjtlanri4jri6QuIOyYteyFmOyXkCDrlLDrnbwg7JuQ7ZWY64qUIO2YleyLneydmCDsiKvsnpDroZwg67OA7ZmYIO2VoCDsiJgg64+EIOyeiOyKteuLiOuLpC5cbiAgICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSBzdHJcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbmQgLSDsmLXshZhcbiAgICogQHJldHVybnMge1N0cmluZ3xOdW1iZXJ9XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqIHZhciBjb25kID0ge1xuXHRcdCAqIFx0cm91bmQ6IHtOdW1iZXJ8Qm9vbGVhbn0gLSDrsJjsmKzrprztlaAg7J6Q66a/7IiYLFxuXHRcdCAqIFx0bW9uZXk6IHtCb29sZWFufSAtIO2Gte2ZlCxcblx0XHQgKiBcdGFiczoge0Jvb2xlYW59IC0g7KCI64yA6rCSLFxuXHRcdCAqIFx0Ynl0ZToge0Jvb2xlYW59IC0g67CU7J207Yq4XG5cdFx0ICogfVxuICAgKlxuICAgKiBjb25zb2xlLmxvZyhBWDZVdGlsLm51bWJlcigxMjM0NTY3ODkuNjc4LCB7cm91bmQ6MX0pKTtcbiAgICogY29uc29sZS5sb2coQVg2VXRpbC5udW1iZXIoMTIzNDU2Nzg5LjY3OCwge3JvdW5kOjEsIG1vbmV5OnRydWV9KSk7XG4gICAqIGNvbnNvbGUubG9nKEFYNlV0aWwubnVtYmVyKDEyMzQ1Njc4OS42NzgsIHtyb3VuZDoyLCBieXRlOnRydWV9KSk7XG4gICAqIGNvbnNvbGUubG9nKEFYNlV0aWwubnVtYmVyKC0xMjM0NTY3ODkuODg4OCwge2Ficzp0cnVlLCByb3VuZDoyLCBtb25leTp0cnVlfSkpO1xuICAgKiBjb25zb2xlLmxvZyhBWDZVdGlsLm51bWJlcihcIkEtMTIzNH5+NTY3ODkuOH44ODhQWFwiLCB7YWJzOnRydWUsIHJvdW5kOjIsIG1vbmV5OnRydWV9KSk7XG4gICAqXG4gICAqIC8vMTIzNDU2Nzg5LjdcbiAgICogLy8xMjMsNDU2LDc4OS43XG4gICAqIC8vMTE3LjdNQlxuICAgKiAvLzEyMyw0NTYsNzg5Ljg5XG4gICAqIC8vMTIzLDQ1Niw3ODkuODlcbiAgICogYGBgXG4gICAqL1xuICBudW1iZXI6IG51bWJlcixcbiAgLyoqXG4gICAqIOuwsOyXtCDruYTsirftlZwg7Jik67iM7KCd7Yq466W8IOuwsOyXtOuhnCDrs4DtmZjtlbTspI3ri4jri6QuXG4gICAqIEBwYXJhbSB7T2JqZWN0fEVsZW1lbnRzfEFyZ3VtZW50c30gT1xuICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqIEFYNlV0aWwudG9BcnJheShhcmd1bWVudHMpO1xuICAgKiAvL1xuICAgKiBgYGBcbiAgICovXG4gIHRvQXJyYXk6IHRvQXJyYXksXG4gIC8qKlxuICAgKiDsmKTruIzsoJ3tirjrpbwg7YyM652866+47YSw7ZiV7Iud7Jy866GcIOuYkOuKlCDtjIzrnbzrr7jthLDrpbwg7Jik67iM7KCd7Yq4IO2YleyLneycvOuhnCDrs4DtmZjtlanri4jri6QuXG4gICAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fFN0cmluZ30gT1xuICAgKiBAcGFyYW0ge1N0cmluZ30gW2NvbmRdIC0gcGFyYW18b2JqZWN0XG4gICAqIEByZXR1cm5zIHtPYmplY3R8U3RyaW5nfVxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBcbiAgICogQVg2VXRpbC5wYXJhbSh7YToxLGI6JzEyMzInfSwgXCJwYXJhbVwiKTtcbiAgICogQVg2VXRpbC5wYXJhbShcImE9MSZiPTEyMzJcIiwgXCJwYXJhbVwiKTtcbiAgICogLy8gXCJhPTEmYj0xMjMyXCJcbiAgICogQVg2VXRpbC5wYXJhbShcImE9MSZiPTEyMzJcIik7XG4gICAqIC8vIHthOiBcIjFcIiwgYjogXCIxMjMyXCJ9XG4gICAqIGBgYFxuICAgKi9cbiAgcGFyYW06IHBhcmFtLFxuICBlcnJvcjogZXJyb3IsXG4gIC8qKlxuICAgKiDrgqDsp5wg7ZiV7Iud7J2YIOusuOyekOyXtOydtOuCmCBEYXRl6rCd7LK066W8IOyhsOqxtOyXkCDrp57qsowg7LKY66asIO2VnCDtm4Qg7JuQ7ZWY64qUIHJldHVybiDqsJLsnLzroZwg67CY7ZmY7ZWp64uI64ukLlxuICAgKiBAcGFyYW0ge1N0cmluZ3xEYXRlfSBkXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25kXG4gICAqIEByZXR1cm5zIHtEYXRlfFN0cmluZ31cbiAgICogQGV4YW1wbGVcbiAgICogYGBganNcbiAgICogQVg2VXRpbC5kYXRlKCcyMDEzLTAxLTAxJyk7IC8vIFR1ZSBKYW4gMDEgMjAxMyAyMzo1OTowMCBHTVQrMDkwMCAoS1NUKVxuICAgKiBBWDZVdGlsLmRhdGUoKG5ldyBEYXRlKCkpLCB7YWRkOntkOjEwfSwgcmV0dXJuOid5eXl5L01NL2RkJ30pOyAvLyBcIjIwMTUvMDcvMDFcIlxuICAgKiBBWDZVdGlsLmRhdGUoJzE5MTktMDMtMDEnLCB7YWRkOntkOjEwfSwgcmV0dXJuOid5eXl5L01NL2RkIGhoOm1tOnNzJ30pOyAvLyBcIjE5MTkvMDMvMTEgMjM6NTk6MDBcIlxuICAgKiBgYGBcbiAgICovXG4gIGRhdGU6IGRhdGUsXG4gIC8qKlxuICAgKiDsnbjsnpDsnbgg64Kg7Kec6rCAIOyYpOuKmOu2gO2EsCDrqofsnbzsoITsnbjsp4Ag67CY7ZmY7ZWp64uI64ukLiDrmJDripQg7J247J6Q7J24IOuCoOynnOqwgCDqsIDquYzsmrQg66+4656Y7JeQIOuqh+ydvCDtm4Tsnbjsp4Ag67CY7ZmY7ZWp64uI64ukLlxuICAgKiBAcGFyYW0ge1N0cmluZ3xEYXRhfSBkXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25kXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqIEFYNlV0aWwuZGRheSgnMjAxNi0wMS0yOScpO1xuICAgKiAvLyAxXG4gICAqIEFYNlV0aWwuZGRheSgnMjAxNi0wMS0yOScsIHt0b2RheTonMjAxNi0wMS0yOCd9KTtcbiAgICogLy8gMVxuICAgKiBBWDZVdGlsLmRkYXkoJzE5NzctMDMtMjknLCB7dG9kYXk6JzIwMTYtMDEtMjgnLCBhZ2U6dHJ1ZX0pO1xuICAgKiAvLyAzOVxuICAgKiBgYGBcbiAgICovXG4gIGRkYXk6IGRkYXksXG4gIC8qKlxuICAgKiDrhYTsm5Tsl5Ag66ee64qUIOuCoOyekOyImOulvCDrsJjtmZjtlanri4jri6QuXG4gICAqIChuZXcgRGF0ZSgpKS5nZXRNb250aCgpIOq4sOykgOycvOuhnCDsm5TqsJLsnYQg67O064OF64uI64ukLiBcIjLsm5RcIiDsnbjqsr3smrAgXCIxXCIg7J2EIOuEmOq4sOqyjCDrkKnri4jri6QuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB5XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAqIEBleGFtcGxlc1xuICAgKiBgYGBqc1xuICAgKiBBWDZVdGlsLmRheXNPZk1vbnRoKDIwMTUsIDExKTsgLy8gMzFcbiAgICogQVg2VXRpbC5kYXlzT2ZNb250aCgyMDE1LCAxKTsgLy8gMjhcbiAgICogYGBgXG4gICAqL1xuICBkYXlzT2ZNb250aDogZGF5c09mTW9udGgsXG4gIC8qKlxuICAgKiDsnbjsnpDsnbgg64Kg7Kec6rCAIOuqh+uFhCDrqofsm5TsnZgg66qH67KI7Ke4IOyjvOywqOyduOyngCDrsJjtmZjtlanri4jri6QuXG4gICAqIEBwYXJhbSB7U3RyaW5nfERhdGF9IGRcbiAgICogQHJldHVybnMge09iamVjdH1cbiAgICogQGV4YW1wbGVcbiAgICogYGBganNcbiAgICogQVg2VXRpbC53ZWVrc09mTW9udGgoXCIyMDE1LTEwLTAxXCIpOyAvLyB7eWVhcjogMjAxNSwgbW9udGg6IDEwLCBjb3VudDogMX1cbiAgICogQVg2VXRpbC53ZWVrc09mTW9udGgoXCIyMDE1LTA5LTE5XCIpOyAvLyB7eWVhcjogMjAxNSwgbW9udGg6IDksIGNvdW50OiAzfVxuICAgKiBgYGBcbiAgICovXG4gIHdlZWtzT2ZNb250aDogd2Vla3NPZk1vbnRoLFxuICAvKipcbiAgICog7JuQ7ZWY64qUIO2an+yImCDrp4ztgbwg7J6Q66a/7IiYIOunnuy2pCDrrLjsnpDsl7TsnYQg7Y+s7ZWo7ZWcIOusuOyekOyXtOydhCDrsJjtmZjtlanri4jri6QuXG4gICAqIOusuOyekOyXtCDquLjsnbTrs7Tri6Qg7J6R7J2A6rCS7J2EIOuztOuCtOuptCDrrLTsi5zrkKnri4jri6QuXG4gICAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcn0gbnVtXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBsZW5ndGhcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtwYWRkZXI9MF1cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtyYWRpeF1cbiAgICogQHJldHVybnMge1N0cmluZ31cbiAgICogQGV4YW1wbGVcbiAgICogYGBgXG4gICAqIEFYNlV0aWwuc2V0RGlnaXQoMjAxNiwgNilcbiAgICogLy8gXCIwMDIwMTZcIlxuICAgKiBBWDZVdGlsLnNldERpZ2l0KDIwMTYsIDIpXG4gICAqIC8vIFwiMjAxNlwiXG4gICAqIGBgYFxuICAgKi9cbiAgc2V0RGlnaXQ6IHNldERpZ2l0LFxuICAvKipcbiAgICog66y47J6Q7Je07J2EIOyngOygleuQnCDsiJjrp4ztgbwg67CY67O1IO2VqeuLiOuLpC5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHNcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGNvdW50XG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYFxuICAgKiBBWDZVdGlsLnRpbWVzKDIwMTYsIDIpXG4gICAqIC8vXCIyMDE2MjAxNlwiXG4gICAqIGBgYFxuICAgKi9cbiAgdGltZXM6IHRpbWVzLFxuICAvKipcbiAgICog7YOA6rKf7JeY66as66i87Yq47J2YIOu2gOuqqCDsl5jrpqzrqZjtirgg7Yq466as7JeQ7IScIOybkO2VmOuKlCDsobDqsbTsnZgg7JeY66as66i87Yq466W8IOyWu+yKteuLiOuLpC5cbiAgICogQHBhcmFtIHtFbGVtZW50fSBfdGFyZ2V0IC0gdGFyZ2V0IGVsZW1lbnRcbiAgICogQHBhcmFtIHtPYmplY3R8RnVuY3Rpb259IGNvbmQgLSDsm5DtlZjripQgZWxlbWVudOulvCDssL7snYQg7KGw6rG0XG4gICAqIEByZXR1cm5zIHtFbGVtZW50fVxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBcbiAgICogLy8gY29uZCDsho3shLHsoJXsnZhcbiAgICogdmFyIGNvbmQgPSB7XG5cdFx0ICogXHR0YWduYW1lOiB7U3RyaW5nfSAtIO2DnOq3uOuqhSAoZXguIGEsIGRpdiwgc3Bhbi4uKSxcblx0XHQgKiBcdGNsYXp6OiB7U3RyaW5nfSAtIO2BtOuemOyKpOuqhVxuXHRcdCAqIFx0Wywg6re4IOyZuCDssL7qs6Ag7Iu27J2AIGF0dHJpYnV0ZeuqheuTpF1cblx0XHQgKiB9O1xuICAgKiBjb25zb2xlLmxvZyhcbiAgICogY29uc29sZS5sb2coXG4gICAqICAgIEFYNlV0aWwuZmluZFBhcmVudE5vZGUoZS50YXJnZXQsIHt0YWduYW1lOlwiYVwiLCBjbGF6ejpcImF4LW1lbnUtaGFuZGVsXCIsIFwiZGF0YS1jdXN0b20tYXR0clwiOlwiYXR0cl92YWx1ZVwifSlcbiAgICogKTtcbiAgICogLy8gY29uZCDtlajsiJjroZwg7LKY66as7ZWY6riwXG4gICAqIGpRdWVyeSgnI2lkJykuYmluZChcImNsaWNrLmFwcF9leHBhbmRcIiwgZnVuY3Rpb24oZSl7XG5cdFx0ICogXHR2YXIgdGFyZ2V0ID0gQVg2VXRpbC5maW5kUGFyZW50Tm9kZShlLnRhcmdldCwgZnVuY3Rpb24odGFyZ2V0KXtcblx0XHQgKiBcdFx0aWYoJCh0YXJnZXQpLmhhc0NsYXNzKFwiYXNpZGVcIikpe1xuXHRcdCAqIFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdCAqIFx0XHR9XG5cdFx0ICogXHRcdGVsc2V7XG5cdFx0ICogXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0ICogXHRcdH1cblx0XHQgKiBcdH0pO1xuXHRcdCAqIFx0Ly9jbGllbnQtYXNpZGVcblx0XHQgKiBcdGlmKHRhcmdldC5pZCAhPT0gXCJjbGllbnQtYXNpZGVcIil7XG5cdFx0ICogXHRcdC8vIHNvbWUgYWN0aW9uXG5cdFx0ICogXHR9XG5cdFx0ICogfSk7XG4gICAqIGBgYFxuICAgKi9cbiAgZmluZFBhcmVudE5vZGU6IGZpbmRQYXJlbnROb2RlLFxuICAvKipcbiAgICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSB2YWxcbiAgICogQHJldHVybnMge1N0cmluZ31cbiAgICogQGV4YW1wbGVcbiAgICogYGBgXG4gICAqIGNvbnNvbGUubG9nKEFYNlV0aWwuY3NzTnVtYmVyKFwiMTAwcHhcIikpXG4gICAqIGNvbnNvbGUubG9nKEFYNlV0aWwuY3NzTnVtYmVyKFwiMTAwJVwiKSlcbiAgICogY29uc29sZS5sb2coQVg2VXRpbC5jc3NOdW1iZXIoXCIxMDBcIikpXG4gICAqIGNvbnNvbGUubG9nKEFYNlV0aWwuY3NzTnVtYmVyKDEwMCkpXG4gICAqIGNvbnNvbGUubG9nKEFYNlV0aWwuY3NzTnVtYmVyKFwiISExMDBAI1wiKSlcbiAgICogYGBgXG4gICAqL1xuICBjc3NOdW1iZXI6IGNzc051bWJlcixcbiAgLyoqXG4gICAqIGNzcyBzdHJpbmcg67CPIG9iamVjdCDrpbwg64SY6riw66m0IG9iamVjdCDrsI8gc3RyaW5nIOycvOuhnCDrs4DtmZjrkJjslrQg66as7YS065Cp64uI64ukLlxuICAgKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IHZhbCAtIENTUyBTdHJpbmcgb3IgQ1NTIE9iamVjdFxuICAgKiBAcmV0dXJucyB7U3RyaW5nfE9iamVjdH1cbiAgICogQGV4YW1wbGVcbiAgICogYGBgXG4gICAqIGNvbnNvbGUubG9nKEFYNlV0aWwuY3NzKHtiYWNrZ3JvdW5kOiBcIiNjY2NcIiwgcGFkZGluZzogXCI1MHB4XCIsIHdpZHRoOiBcIjEwMHB4XCJ9KSk7XG4gICAqIC8vXCJiYWNrZ3JvdW5kOiNjY2M7cGFkZGluZzo1MHB4O3dpZHRoOjEwMHB4O1wiXG4gICAqIGNvbnNvbGUubG9nKEFYNlV0aWwuY3NzKCd3aWR0aDoxMDBweDtwYWRkaW5nOiA1MHB4OyBiYWNrZ3JvdW5kOiAjY2NjJykpO1xuICAgKiAvLyBvYmplY3Qge3dpZHRoOiBcIjEwMHB4XCIsIHBhZGRpbmc6IFwiNTBweFwiLCBiYWNrZ3JvdW5kOiBcIiNjY2NcIn1cbiAgICogYGBgXG4gICAqL1xuICBjc3M6IGNzcyxcbiAgLyoqXG4gICAqIEBwYXJhbSB7RXZlbnR9IGVcbiAgICogQGV4YW1wbGVcbiAgICogYGBgXG4gICAqIEFYNlV0aWwuc3RvcEV2ZW50KGUpO1xuICAgKiBgYGBcbiAgICovXG4gIHN0b3BFdmVudDogc3RvcEV2ZW50LFxuICAvKipcbiAgICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IG9mZnNldFxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBcbiAgICogQVg2VXRpbC5zZWxlY3RSYW5nZSgkKFwiI3NlbGVjdC10ZXN0LTBcIikpOyAvLyBzZWxlY3RBbGxcbiAgICogQVg2VXRpbC5zZWxlY3RSYW5nZSgkKFwiI3NlbGVjdC10ZXN0LTBcIiksIFwic2VsZWN0QWxsXCIpOyAvL3NlbGVjdEFsbFxuICAgKiBBWDZVdGlsLnNlbGVjdFJhbmdlKCQoXCIjc2VsZWN0LXRlc3QtMFwiKSwgXCJzdGFydFwiKTsgLy8gZm9jdXMgb24gc3RhcnRcbiAgICogQVg2VXRpbC5zZWxlY3RSYW5nZSgkKFwiI3NlbGVjdC10ZXN0LTBcIiksIFwiZW5kXCIpOyAvLyBmb2N1cyBvbiBlbmRcbiAgICogQVg2VXRpbC5zZWxlY3RSYW5nZSgkKFwiI3NlbGVjdC10ZXN0LTBcIiksIFsxLCA1XSk7IC8vIHNlbGVjdCAxfjVcbiAgICogYGBgXG4gICAqL1xuICBzZWxlY3RSYW5nZTogc2VsZWN0UmFuZ2UsXG4gIC8qKlxuICAgKiDsp4DsoJXtlZwg7Iuc6rCE7J2EIOyngOyXsOyLnOy8nCDtlajsiJjrpbwg7Iuk7ZaJ7ZWp64uI64ukLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB3YWl0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqIEByZXR1cm5zIHtkZWJvdW5jZWR9XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9sb2Rhc2gvbG9kYXNoL2Jsb2IvbWFzdGVyL2RlYm91bmNlLmpzXG4gICAqIHZhciBkZWJvdW5jZUZuID0gQVg2VXRpbC5kZWJvdW5jZShmdW5jdGlvbiggdmFsICkgeyBjb25zb2xlLmxvZyh2YWwpOyB9LCAzMDApO1xuICAgKiAkKGRvY3VtZW50LmJvZHkpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICAgICAqICBkZWJvdW5jZUZuKG5ldyBEYXRlKCkpO1xuICAgICAgICAgKiB9KTtcbiAgICogYGBgXG4gICAqL1xuICBkZWJvdW5jZTogZGVib3VuY2UsXG4gIC8qKlxuICAgKiBAcGFyYW0gZnVuY1xuICAgKiBAcGFyYW0gd2FpdFxuICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIHt0aHJvdHRsZWR9XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqIC8vaHR0cHM6Ly9naXRodWIuY29tL2xvZGFzaC9sb2Rhc2gvYmxvYi9tYXN0ZXIvdGhyb3R0bGUuanNcbiAgICogdmFyIHRocm90dGxlRm4gPSBBWDZVdGlsLnRocm90dGxlKGZ1bmN0aW9uKCB2YWwgKSB7IGNvbnNvbGUubG9nKHZhbCk7IH0sIDMwMCk7XG4gICAqICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKXtcbiAgICAgKiAgICAgIHRocm90dGxlRm4obmV3IERhdGUoKSk7XG4gICAgICogfSk7XG4gICAqIGBgYFxuICAgKi9cbiAgdGhyb3R0bGU6IHRocm90dGxlLFxuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R9IG9ialxuICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBqc1xuICAgKiB2YXIgb2JqID0gW1xuICAgKiAge25hbWU6XCJBXCIsIGNoaWxkOlt7bmFtZTpcImEtMVwifV19LFxuICAgKiAge25hbWU6XCJCXCIsIGNoaWxkOlt7bmFtZTpcImItMVwifV0sIGNhbGxCYWNrOiBmdW5jdGlvbigpeyBjb25zb2xlLmxvZygnY2FsbEJhY2snKTsgfX1cbiAgICogXTtcbiAgICogdmFyIGNvcGllZE9iaiA9IEFYNlV0aWwuZGVlcENvcHkob2JqKVxuICAgKiBgYGBcbiAgICovXG4gIGRlZXBDb3B5OiBkZWVwQ29weSxcbiAgLyoqXG4gICAqIEhUTUwg66y47J6Q7Je07J2EIGVzY2FwZSDsspjrpqztlanri4jri6QuXG4gICAqIFwiJmx0O1wiIHJlcHJlc2VudHMgdGhlIDwgc2lnbi5cbiAgICogXCImZ3Q7XCIgcmVwcmVzZW50cyB0aGUgPiBzaWduLlxuICAgKiBcIiZhbXA7XCIgcmVwcmVzZW50cyB0aGUgJiBzaWduLlxuICAgKiBcIiZxdW90OyByZXByZXNlbnRzIHRoZSBcIiBtYXJrLlxuICAgKiBbQ2hhcmFjdGVyIGVudGl0eSByZWZlcmVuY2VzXShodHRwczovL3d3dy53My5vcmcvVFIvaHRtbDQwMS9jaGFyc2V0Lmh0bWwjaC01LjMpXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYFxuICAgKiBBWDZVdGlsLmVzY2FwZUh0bWwoJ0hUTUwgPHNwYW4+c3RyaW5nPC9zcGFuPiAmIFwiZXNjYXBlXCInKVxuICAgKiAvL1wiSFRNTCAmbHQ7c3BhbiZndDtzdHJpbmcmbHQ7L3NwYW4mZ3Q7ICZhbXA7ICZxdW90O2VzY2FwZSZxdW90O1wiXG4gICAqIGBgYFxuICAgKi9cbiAgZXNjYXBlSHRtbDogZXNjYXBlSHRtbCxcbiAgLyoqXG4gICAqIEhUTUwg66y47J6Q7Je07J2EIHVuZXNjYXBlIOyymOumrO2VqeuLiOuLpC5cbiAgICogZXNjYXBlSHRtbOulvCDssLjqs6DtlZjshLjsmpQuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYFxuICAgKiBBWDZVdGlsLnVuZXNjYXBlSHRtbCgnSFRNTCAmbHQ7c3BhbiZndDtzdHJpbmcmbHQ7L3NwYW4mZ3Q7ICZhbXA7ICZxdW90O2VzY2FwZSZxdW90OycpXG4gICAqIC8vXCJIVE1MIDxzcGFuPnN0cmluZzwvc3Bhbj4gJiBcImVzY2FwZVwiXCJcbiAgICogYGBgXG4gICAqL1xuICB1bmVzY2FwZUh0bWw6IHVuZXNjYXBlSHRtbCxcbiAgLyoqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0bXBsXG4gICAqIEBwYXJhbSB7Kn0gYXJnc1xuICAgKiBAcmV0dXJuIHtheDZzdHJpbmd9XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqIEFYNlV0aWwuc3RyaW5nKFwiezB9IGlzIGRlYWQsIGJ1dCB7MX0gaXMgYWxpdmUhIHswfSB7Mn1cIikuZm9ybWF0KFwiQVNQXCIsIFwiQVNQLk5FVFwiKTtcbiAgICogQVg2VXRpbC5zdHJpbmcoXCJ7MH0gaXMgZGVhZCwgYnV0IHsxfSBpcyBhbGl2ZSEgezB9IHsyfVwiKS5mb3JtYXQoW1wiQVNQXCIsIFwiQVNQLk5FVFwiXSk7XG4gICAqIEFYNlV0aWwuc3RpbnJnKFwiezB9IGNvdW50c1wiKS5mb3JtYXQoMTAwKTtcbiAgICogYGBgXG4gICAqL1xuICBzdHJpbmc6IHN0cmluZyxcbiAgLyoqXG4gICAqIEBwYXJhbSBfaGV4Q29sb3JcbiAgICogQHJldHVybiB7YXg1Y29sb3J9XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYGpzXG4gICAqIEFYNlV0aWwuY29sb3IoXCIjZmYzMzAwXCIpLmxpZ2h0ZW4oMTApLmdldEhleFZhbHVlKClcbiAgICogY29uc29sZS5sb2coQVg2VXRpbC5jb2xvcihcIiNmZjMzMDBcIikuZGFya2VuKDEwKS5nZXRIZXhWYWx1ZSgpKTtcbiAgICogYGBgXG4gICAqL1xuICBjb2xvcjogY29sb3Jcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL3NyYy9BWDZVdGlsLmpzIiwiY29uc3Qgd2luID0gd2luZG93O1xuY29uc3QgZG9jID0gKHdpbikgPyB3aW4uZG9jdW1lbnQgOiBudWxsO1xuY29uc3QgZG9jRWxlbSA9ICh3aW4pID8gd2luLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCA6IG51bGw7XG5cbmNvbnN0IG9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnNvbGUuZXJyb3IoYXJndW1lbnRzKTtcbn07XG5cbmxldCBldmVudEtleXMgPSB7XG4gIEJBQ0tTUEFDRTogOCwgVEFCOiA5LFxuICBSRVRVUk46IDEzLCBFU0M6IDI3LCBMRUZUOiAzNywgVVA6IDM4LCBSSUdIVDogMzksIERPV046IDQwLCBERUxFVEU6IDQ2LFxuICBIT01FOiAzNiwgRU5EOiAzNSwgUEFHRVVQOiAzMywgUEFHRURPV046IDM0LCBJTlNFUlQ6IDQ1LCBTUEFDRTogMzJcbn07XG5cbmxldCB3ZWVrTmFtZXMgPSBbXG4gIHtsYWJlbDogXCJTVU5cIn0sXG4gIHtsYWJlbDogXCJNT05cIn0sXG4gIHtsYWJlbDogXCJUVUVcIn0sXG4gIHtsYWJlbDogXCJXRURcIn0sXG4gIHtsYWJlbDogXCJUSFVcIn0sXG4gIHtsYWJlbDogXCJGUklcIn0sXG4gIHtsYWJlbDogXCJTQVRcIn1cbl07XG5cbmNvbnN0IGJyb3dzZXIgPSAoZnVuY3Rpb24gKHVhLCBtb2JpbGUsIGJyb3dzZXJOYW1lLCBtYXRjaCwgYnJvd3NlciwgYnJvd3NlclZlcnNpb24pIHtcbiAgaWYgKCF3aW4gfHwgIXdpbi5uYXZpZ2F0b3IpIHJldHVybiB7fTtcblxuICB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSwgbW9iaWxlID0gKHVhLnNlYXJjaCgvbW9iaWxlL2cpICE9IC0xKSwgYnJvd3Nlck5hbWUsIG1hdGNoLCBicm93c2VyLCBicm93c2VyVmVyc2lvbjtcblxuICBpZiAodWEuc2VhcmNoKC9pcGhvbmUvZykgIT0gLTEpIHtcbiAgICByZXR1cm4ge25hbWU6IFwiaXBob25lXCIsIHZlcnNpb246IDAsIG1vYmlsZTogdHJ1ZX1cbiAgfVxuICBlbHNlIGlmICh1YS5zZWFyY2goL2lwYWQvZykgIT0gLTEpIHtcbiAgICByZXR1cm4ge25hbWU6IFwiaXBhZFwiLCB2ZXJzaW9uOiAwLCBtb2JpbGU6IHRydWV9XG4gIH1cbiAgZWxzZSBpZiAodWEuc2VhcmNoKC9hbmRyb2lkL2cpICE9IC0xKSB7XG4gICAgbWF0Y2ggPSAvKGFuZHJvaWQpWyBcXC9dKFtcXHcuXSspLy5leGVjKHVhKSB8fCBbXTtcbiAgICBicm93c2VyVmVyc2lvbiA9IChtYXRjaFsyXSB8fCBcIjBcIik7XG4gICAgcmV0dXJuIHtuYW1lOiBcImFuZHJvaWRcIiwgdmVyc2lvbjogYnJvd3NlclZlcnNpb24sIG1vYmlsZTogbW9iaWxlfVxuICB9XG4gIGVsc2Uge1xuICAgIGJyb3dzZXJOYW1lID0gXCJcIjtcbiAgICBtYXRjaCA9IC8ob3ByKVsgXFwvXShbXFx3Ll0rKS8uZXhlYyh1YSkgfHwgLyhjaHJvbWUpWyBcXC9dKFtcXHcuXSspLy5leGVjKHVhKSB8fCAvKHdlYmtpdClbIFxcL10oW1xcdy5dKykvLmV4ZWModWEpIHx8IC8obXNpZSkgKFtcXHcuXSspLy5leGVjKHVhKSB8fCB1YS5pbmRleE9mKFwiY29tcGF0aWJsZVwiKSA8IDAgJiYgLyhtb3ppbGxhKSg/Oi4qPyBydjooW1xcdy5dKyl8KS8uZXhlYyh1YSkgfHwgW107XG4gICAgYnJvd3NlciA9IChtYXRjaFsxXSB8fCBcIlwiKTtcbiAgICBicm93c2VyVmVyc2lvbiA9IChtYXRjaFsyXSB8fCBcIjBcIik7XG5cbiAgICBpZiAoYnJvd3NlciA9PSBcIm1zaWVcIikgYnJvd3NlciA9IFwiaWVcIjtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogYnJvd3NlcixcbiAgICAgIHZlcnNpb246IGJyb3dzZXJWZXJzaW9uLFxuICAgICAgbW9iaWxlOiBtb2JpbGVcbiAgICB9XG4gIH1cbiAgdWEgPSBudWxsLCBtb2JpbGUgPSBudWxsLCBicm93c2VyTmFtZSA9IG51bGwsIG1hdGNoID0gbnVsbCwgYnJvd3NlciA9IG51bGwsIGJyb3dzZXJWZXJzaW9uID0gbnVsbDtcbn0pKCk7XG5cbmNvbnN0IGlzQnJvd3NlciA9ICEhKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIHdpbi5kb2N1bWVudCk7XG5cbmxldCB3aGVlbEVubSA9ICh3aW4gJiYgKC9GaXJlZm94L2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkgPyBcIkRPTU1vdXNlU2Nyb2xsXCIgOiBcIm1vdXNld2hlZWxcIik7XG5cbmxldCBlcnJvck1zZyA9IHt9O1xuXG5jb25zdCB1cmxVdGlsID0gZnVuY3Rpb24gKHVybCwgdXJscykge1xuICB1cmwgPSB7XG4gICAgaHJlZjogd2luLmxvY2F0aW9uLmhyZWYsXG4gICAgcGFyYW06IHdpbi5sb2NhdGlvbi5zZWFyY2gsXG4gICAgcmVmZXJyZXI6IGRvYy5yZWZlcnJlcixcbiAgICBwYXRobmFtZTogd2luLmxvY2F0aW9uLnBhdGhuYW1lLFxuICAgIGhvc3RuYW1lOiB3aW4ubG9jYXRpb24uaG9zdG5hbWUsXG4gICAgcG9ydDogd2luLmxvY2F0aW9uLnBvcnRcbiAgfTtcbiAgdXJscyA9IHVybC5ocmVmLnNwbGl0KC9bXFw/I10vKTtcbiAgdXJsLnBhcmFtID0gdXJsLnBhcmFtLnJlcGxhY2UoXCI/XCIsIFwiXCIpO1xuICB1cmwudXJsID0gdXJsc1swXTtcbiAgaWYgKHVybC5ocmVmLnNlYXJjaChcIiNcIikgPiAtMSkge1xuICAgIHVybC5oYXNoZGF0YSA9IHVybHNbdXJscy5sZW5ndGggLSAxXTtcbiAgfVxuICB1cmxzID0gbnVsbDtcbiAgdXJsLmJhc2VVcmwgPSB1cmwuaHJlZi5zdWJzdHIoMCwgdXJsLmhyZWYuaW5kZXhPZihcIj9cIikpLnJlcGxhY2UodXJsLnBhdGhuYW1lLCBcIlwiKTtcblxuICByZXR1cm4gdXJsO1xufTtcblxuY29uc3QgZ2V0RXJyb3IgPSBmdW5jdGlvbiAoY2xhc3NOYW1lLCBlcnJvckNvZGUsIG1ldGhvZE5hbWUpIHtcbiAgaWYgKGVycm9yTXNnICYmIGVycm9yTXNnW2NsYXNzTmFtZV0pIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWUsXG4gICAgICBlcnJvckNvZGU6IGVycm9yQ29kZSxcbiAgICAgIG1ldGhvZE5hbWU6IG1ldGhvZE5hbWUsXG4gICAgICBtc2c6IGVycm9yTXNnW2NsYXNzTmFtZV1bZXJyb3JDb2RlXVxuICAgIH07XG4gIH1cbiAgZWxzZSB7XG4gICAgcmV0dXJuIHtjbGFzc05hbWU6IGNsYXNzTmFtZSwgZXJyb3JDb2RlOiBlcnJvckNvZGUsIG1ldGhvZE5hbWU6IG1ldGhvZE5hbWV9O1xuICB9XG59O1xuXG5jb25zdCBzdXBwb3J0VG91Y2ggPSAod2luKSA/ICgoJ29udG91Y2hzdGFydCcgaW4gd2luKSB8fCAobmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzID4gMCkgfHwgKG5hdmlnYXRvci5tc01heFRvdWNoUG9pbnRzID4gMCkpIDogZmFsc2U7XG5cbmNvbnN0IHN1cHBvcnRGaWxlQXBpID0gKHdpbikgPyAoIHdpbi5GaWxlUmVhZGVyICYmIHdpbi5GaWxlICYmIHdpbi5GaWxlTGlzdCAmJiB3aW4uQmxvYiApIDogZmFsc2U7XG5cbi8qKlxuICogQG1vZHVsZSBBWDZJbmZvXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIOyyq+uyiOynuCDsnpDrpqzsiJgg64+Z7IKsIC0gKO2VhOyalO2VnOqyg+ydtCDsl4bsnYTrlYwgOiA0LCDsi6TtlonsmKTrpZggOiA1KVxuICAgKiDrkZDrsojsp7gg7J6Q66as7IiYIOuqqeyggeyWtCAtIOusuOyekOyXtCAwLCDsiKvsnpAgMSwg67Cw7Je0IDIsIOyYpOu4jOygne2KuCAzLCDtlajsiJggNCwgRE9NIDUsIO2MjOydvCA2LCDquLDtg4AgN1xuICAgKiDshLjrsojsp7gg7J6Q66as7IiYIOyYteyFmFxuICAgKi9cbiAgZXJyb3JNc2c6IGVycm9yTXNnLFxuICAvKipcbiAgICog7JeQ65+sIOy2nOugpeuplOyEuOyngCDsgqzsmqnsnpAg7J6sIOygleydmFxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBcbiAgICogQVg2SW5mby5vbmVycm9yID0gZnVuY3Rpb24oKXtcbiAgICAgKiAgY29uc29sZS5sb2coYXJndW1lbnRzKTtcbiAgICAgKiB9XG4gICAqIGBgYFxuICAgKi9cbiAgb25lcnJvcjogb25lcnJvcixcbiAgLyoqXG4gICAqIGV2ZW50IGtleUNvZGVzXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYFxuICAgKiB7XG5cdFx0ICogXHRCQUNLU1BBQ0U6IDgsIFRBQjogOSxcblx0XHQgKiBcdFJFVFVSTjogMTMsIEVTQzogMjcsIExFRlQ6IDM3LCBVUDogMzgsIFJJR0hUOiAzOSwgRE9XTjogNDAsIERFTEVURTogNDYsXG5cdFx0ICogXHRIT01FOiAzNiwgRU5EOiAzNSwgUEFHRVVQOiAzMywgUEFHRURPV046IDM0LCBJTlNFUlQ6IDQ1LCBTUEFDRTogMzJcblx0XHQgKiB9XG4gICAqIGBgYFxuICAgKi9cbiAgZXZlbnRLZXlzOiBldmVudEtleXMsXG4gIC8qKlxuICAgKiB3ZWVrIG5hbWVzXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYFxuICAgKiBbXG4gICAqICB7bGFiZWw6IFwiU1VOXCJ9LHtsYWJlbDogXCJNT05cIn0se2xhYmVsOiBcIlRVRVwifSx7bGFiZWw6IFwiV0VEXCJ9LHtsYWJlbDogXCJUSFVcIn0se2xhYmVsOiBcIkZSSVwifSx7bGFiZWw6IFwiU0FUXCJ9XG4gICAqIF1cbiAgICogY29uc29sZS5sb2coIHdlZWtOYW1lc1swXSApO1xuICAgKiBjb25zb2xlLmxvZyggQVg2SW5mby53ZWVrTmFtZXNbKG5ldyBEYXRlKCkpLmdldERheSgpXS5sYWJlbCApXG4gICAqIGBgYFxuICAgKi9cbiAgd2Vla05hbWVzOiB3ZWVrTmFtZXMsXG4gIC8qKlxuICAgKiDsgqzsmqnsnpAg67iM65287Jqw7KCAIOyLneuzhOyaqSDsmKTruIzsoJ3tirhcbiAgICogQGV4YW1wbGVcbiAgICogYGBgXG4gICAqIGNvbnNvbGUubG9nKCBBWDZJbmZvLmJyb3dzZXIgKTtcbiAgICogLy9PYmplY3Qge25hbWU6IFwiY2hyb21lXCIsIHZlcnNpb246IFwiMzkuMC4yMTcxLjcxXCIsIG1vYmlsZTogZmFsc2V9XG4gICAqIGBgYFxuICAgKi9cbiAgYnJvd3NlcjogYnJvd3NlcixcbiAgLyoqXG4gICAqIOu4jOudvOyasOyggCDsl6zrtoBcbiAgICovXG4gIGlzQnJvd3NlcjogaXNCcm93c2VyLFxuICAvKipcbiAgICog67iM65287Jqw7KC47J2YIO2EsOy5mCDqsIDriqUg7Jyg66y066W8IO2ZleyduO2VqeuLiOuLpC5cbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqIEBleGFtcGxlXG4gICAqIGBgYFxuICAgKiB2YXIgY2hrRmxhZyA9IEFYNkluZm8uc3VwcG9ydFRvdWNoO1xuICAgKi9cbiAgc3VwcG9ydFRvdWNoOiBzdXBwb3J0VG91Y2gsXG4gIC8qKlxuICAgKiBIVE1MNSBGaWxlQXBpIOyngOybkOyXrOu2gFxuICAgKi9cbiAgc3VwcG9ydEZpbGVBcGk6IHN1cHBvcnRGaWxlQXBpLFxuICAvKipcbiAgICog67iM65287Jqw7KCA7JeQIOuUsOuluCDrp4jsmrDsiqQg7ZygIOydtOuypO2KuOydtOumhFxuICAgKi9cbiAgd2hlZWxFbm06IHdoZWVsRW5tLFxuICAvKipcbiAgICog7ZiE7J6sIO2OmOydtOyngOydmCBVcmwg7KCV67O066W8IOumrO2EtO2VqeuLiOuLpC5cbiAgICogQGV4YW1wbGVcbiAgICogYGBgXG4gICAqIGNvbnNvbGUubG9nKCBheDUudXRpbC50b0pzb24oIEFYNkluZm8udXJsVXRpbCgpICkgKTtcbiAgICoge1xuXHRcdCAqXHRcImJhc2VVcmxcIjogXCJodHRwOi8vYXg1OjIwMThcIixcblx0XHQgKlx0XCJocmVmXCI6IFwiaHR0cDovL2F4NToyMDE4L3NhbXBsZXMvaW5kZXguaHRtbD9hPTEmYj0xI2FiY1wiLFxuXHRcdCAqXHRcInBhcmFtXCI6IFwiYT0xJmI9MVwiLFxuXHRcdCAqXHRcInJlZmVycmVyXCI6IFwiXCIsXG5cdFx0ICpcdFwicGF0aG5hbWVcIjogXCIvc2FtcGxlcy9pbmRleC5odG1sXCIsXG5cdFx0ICpcdFwiaG9zdG5hbWVcIjogXCJheDVcIixcblx0XHQgKlx0XCJwb3J0XCI6IFwiMjAxOFwiLFxuXHRcdCAqXHRcInVybFwiOiBcImh0dHA6Ly9heDU6MjAxOC9zYW1wbGVzL2luZGV4Lmh0bWxcIixcblx0XHQgKlx0XCJoYXNoZGF0YVwiOiBcImFiY1wiXG5cdFx0ICogfVxuICAgKiBgYGBcbiAgICovXG4gIHVybFV0aWw6IHVybFV0aWwsXG4gIC8qKlxuICAgKiBheDUtZXJyb3ItbXNnLmpzIOyXkCDsoJXsnZjrkJwgYXg1IGVycm9y66W8IOuwmO2ZmO2VqeuLiOuLpC5cbiAgICogQHJldHVybnMge09iamVjdH1cbiAgICogQGV4YW1wbGVcbiAgICogYGBgXG4gICAqIGNvbnNvbGUubG9nKCBBWDZJbmZvLmdldEVycm9yKFwic2luZ2xlLXVwbG9hZGVyXCIsIFwiNDYwXCIsIFwidXBsb2FkXCIpICk7XG4gICAqXG4gICAqIGlmKCF0aGlzLnNlbGVjdGVkRmlsZSl7XG5cdFx0ICogICAgICBpZiAoY2ZnLm9uRXZlbnQpIHtcblx0XHQgKiAgICAgIFx0dmFyIHRoYXQgPSB7XG5cdFx0ICogICAgICBcdFx0YWN0aW9uOiBcImVycm9yXCIsXG5cdFx0ICogICAgICBcdFx0ZXJyb3I6IEFYNkluZm8uZ2V0RXJyb3IoXCJzaW5nbGUtdXBsb2FkZXJcIiwgXCI0NjBcIiwgXCJ1cGxvYWRcIilcblx0XHQgKiAgICAgIFx0fTtcblx0XHQgKiAgICAgIFx0Y2ZnLm9uRXZlbnQuY2FsbCh0aGF0LCB0aGF0KTtcblx0XHQgKiAgICAgIH1cblx0XHQgKiAgICAgIHJldHVybiB0aGlzO1xuXHRcdCAqIH1cbiAgICogYGBgXG4gICAqL1xuICBnZXRFcnJvcjogZ2V0RXJyb3Jcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL3NyYy9BWDZJbmZvLmpzIiwiLyohXG4gKiBqUXVlcnkgSmF2YVNjcmlwdCBMaWJyYXJ5IHYzLjIuMiAtYWpheCwtYWpheC9qc29ucCwtYWpheC9sb2FkLC1hamF4L3BhcnNlWE1MLC1hamF4L3NjcmlwdCwtYWpheC92YXIvbG9jYXRpb24sLWFqYXgvdmFyL25vbmNlLC1hamF4L3Zhci9ycXVlcnksLWFqYXgveGhyLC1tYW5pcHVsYXRpb24vX2V2YWxVcmwsLWV2ZW50L2FqYXgsLWF0dHJpYnV0ZXMvcHJvcCwtYXR0cmlidXRlcy9zdXBwb3J0LC1kZXByZWNhdGVkLC1lZmZlY3RzLC1lZmZlY3RzL1R3ZWVuLC1lZmZlY3RzL2FuaW1hdGVkU2VsZWN0b3IsLXdyYXAsLWRlZmVycmVkLC1kZWZlcnJlZC9leGNlcHRpb25Ib29rLC1xdWV1ZSwtcXVldWUvZGVsYXksLWNvcmUvcmVhZHksLWV2ZW50L2ZvY3VzaW4sLWV2ZW50L2FsaWFzLC1jc3Mvc2hvd0hpZGUsLWNzcy9oaWRkZW5WaXNpYmxlU2VsZWN0b3JzXG4gKiBodHRwczovL2pxdWVyeS5jb20vXG4gKlxuICogSW5jbHVkZXMgU2l6emxlLmpzXG4gKiBodHRwczovL3NpenpsZWpzLmNvbS9cbiAqXG4gKiBDb3B5cmlnaHQgSlMgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIGh0dHBzOi8vanF1ZXJ5Lm9yZy9saWNlbnNlXG4gKlxuICogRGF0ZTogMjAxNy0wNy0xNFQwODowN1pcbiAqL1xuKCBmdW5jdGlvbiggZ2xvYmFsLCBmYWN0b3J5ICkge1xuXG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGlmICggdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09IFwib2JqZWN0XCIgKSB7XG5cblx0XHQvLyBGb3IgQ29tbW9uSlMgYW5kIENvbW1vbkpTLWxpa2UgZW52aXJvbm1lbnRzIHdoZXJlIGEgcHJvcGVyIGB3aW5kb3dgXG5cdFx0Ly8gaXMgcHJlc2VudCwgZXhlY3V0ZSB0aGUgZmFjdG9yeSBhbmQgZ2V0IGpRdWVyeS5cblx0XHQvLyBGb3IgZW52aXJvbm1lbnRzIHRoYXQgZG8gbm90IGhhdmUgYSBgd2luZG93YCB3aXRoIGEgYGRvY3VtZW50YFxuXHRcdC8vIChzdWNoIGFzIE5vZGUuanMpLCBleHBvc2UgYSBmYWN0b3J5IGFzIG1vZHVsZS5leHBvcnRzLlxuXHRcdC8vIFRoaXMgYWNjZW50dWF0ZXMgdGhlIG5lZWQgZm9yIHRoZSBjcmVhdGlvbiBvZiBhIHJlYWwgYHdpbmRvd2AuXG5cdFx0Ly8gZS5nLiB2YXIgalF1ZXJ5ID0gcmVxdWlyZShcImpxdWVyeVwiKSh3aW5kb3cpO1xuXHRcdC8vIFNlZSB0aWNrZXQgIzE0NTQ5IGZvciBtb3JlIGluZm8uXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBnbG9iYWwuZG9jdW1lbnQgP1xuXHRcdFx0ZmFjdG9yeSggZ2xvYmFsLCB0cnVlICkgOlxuXHRcdFx0ZnVuY3Rpb24oIHcgKSB7XG5cdFx0XHRcdGlmICggIXcuZG9jdW1lbnQgKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCBcImpRdWVyeSByZXF1aXJlcyBhIHdpbmRvdyB3aXRoIGEgZG9jdW1lbnRcIiApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBmYWN0b3J5KCB3ICk7XG5cdFx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdGZhY3RvcnkoIGdsb2JhbCApO1xuXHR9XG5cbi8vIFBhc3MgdGhpcyBpZiB3aW5kb3cgaXMgbm90IGRlZmluZWQgeWV0XG59ICkoIHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB0aGlzLCBmdW5jdGlvbiggd2luZG93LCBub0dsb2JhbCApIHtcblxuLy8gRWRnZSA8PSAxMiAtIDEzKywgRmlyZWZveCA8PTE4IC0gNDUrLCBJRSAxMCAtIDExLCBTYWZhcmkgNS4xIC0gOSssIGlPUyA2IC0gOS4xXG4vLyB0aHJvdyBleGNlcHRpb25zIHdoZW4gbm9uLXN0cmljdCBjb2RlIChlLmcuLCBBU1AuTkVUIDQuNSkgYWNjZXNzZXMgc3RyaWN0IG1vZGVcbi8vIGFyZ3VtZW50cy5jYWxsZWUuY2FsbGVyICh0cmFjLTEzMzM1KS4gQnV0IGFzIG9mIGpRdWVyeSAzLjAgKDIwMTYpLCBzdHJpY3QgbW9kZSBzaG91bGQgYmUgY29tbW9uXG4vLyBlbm91Z2ggdGhhdCBhbGwgc3VjaCBhdHRlbXB0cyBhcmUgZ3VhcmRlZCBpbiBhIHRyeSBibG9jay5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgYXJyID0gW107XG5cbnZhciBkb2N1bWVudCA9IHdpbmRvdy5kb2N1bWVudDtcblxudmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuXG52YXIgc2xpY2UgPSBhcnIuc2xpY2U7XG5cbnZhciBjb25jYXQgPSBhcnIuY29uY2F0O1xuXG52YXIgcHVzaCA9IGFyci5wdXNoO1xuXG52YXIgaW5kZXhPZiA9IGFyci5pbmRleE9mO1xuXG52YXIgY2xhc3MydHlwZSA9IHt9O1xuXG52YXIgdG9TdHJpbmcgPSBjbGFzczJ0eXBlLnRvU3RyaW5nO1xuXG52YXIgaGFzT3duID0gY2xhc3MydHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxudmFyIGZuVG9TdHJpbmcgPSBoYXNPd24udG9TdHJpbmc7XG5cbnZhciBPYmplY3RGdW5jdGlvblN0cmluZyA9IGZuVG9TdHJpbmcuY2FsbCggT2JqZWN0ICk7XG5cbnZhciBzdXBwb3J0ID0ge307XG5cbnZhciBpc1dpbmRvdyA9IGZ1bmN0aW9uIGlzV2luZG93KCBvYmogKSB7XG5cdFx0cmV0dXJuIG9iaiAhPSBudWxsICYmIG9iaiA9PT0gb2JqLndpbmRvdztcblx0fTtcblxuXG5cblxuXHRmdW5jdGlvbiBET01FdmFsKCBjb2RlLCBkb2MgKSB7XG5cdFx0ZG9jID0gZG9jIHx8IGRvY3VtZW50O1xuXG5cdFx0dmFyIHNjcmlwdCA9IGRvYy5jcmVhdGVFbGVtZW50KCBcInNjcmlwdFwiICk7XG5cblx0XHRzY3JpcHQudGV4dCA9IGNvZGU7XG5cdFx0ZG9jLmhlYWQuYXBwZW5kQ2hpbGQoIHNjcmlwdCApLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoIHNjcmlwdCApO1xuXHR9XG4vKiBnbG9iYWwgU3ltYm9sICovXG4vLyBEZWZpbmluZyB0aGlzIGdsb2JhbCBpbiAuZXNsaW50cmMuanNvbiB3b3VsZCBjcmVhdGUgYSBkYW5nZXIgb2YgdXNpbmcgdGhlIGdsb2JhbFxuLy8gdW5ndWFyZGVkIGluIGFub3RoZXIgcGxhY2UsIGl0IHNlZW1zIHNhZmVyIHRvIGRlZmluZSBnbG9iYWwgb25seSBmb3IgdGhpcyBtb2R1bGVcblxuXG5cbnZhclxuXHR2ZXJzaW9uID0gXCIzLjIuMiAtYWpheCwtYWpheC9qc29ucCwtYWpheC9sb2FkLC1hamF4L3BhcnNlWE1MLC1hamF4L3NjcmlwdCwtYWpheC92YXIvbG9jYXRpb24sLWFqYXgvdmFyL25vbmNlLC1hamF4L3Zhci9ycXVlcnksLWFqYXgveGhyLC1tYW5pcHVsYXRpb24vX2V2YWxVcmwsLWV2ZW50L2FqYXgsLWF0dHJpYnV0ZXMvcHJvcCwtYXR0cmlidXRlcy9zdXBwb3J0LC1kZXByZWNhdGVkLC1lZmZlY3RzLC1lZmZlY3RzL1R3ZWVuLC1lZmZlY3RzL2FuaW1hdGVkU2VsZWN0b3IsLXdyYXAsLWRlZmVycmVkLC1kZWZlcnJlZC9leGNlcHRpb25Ib29rLC1xdWV1ZSwtcXVldWUvZGVsYXksLWNvcmUvcmVhZHksLWV2ZW50L2ZvY3VzaW4sLWV2ZW50L2FsaWFzLC1jc3Mvc2hvd0hpZGUsLWNzcy9oaWRkZW5WaXNpYmxlU2VsZWN0b3JzXCIsXG5cblx0Ly8gRGVmaW5lIGEgbG9jYWwgY29weSBvZiBqUXVlcnlcblx0alF1ZXJ5ID0gZnVuY3Rpb24oIHNlbGVjdG9yLCBjb250ZXh0ICkge1xuXG5cdFx0Ly8gVGhlIGpRdWVyeSBvYmplY3QgaXMgYWN0dWFsbHkganVzdCB0aGUgaW5pdCBjb25zdHJ1Y3RvciAnZW5oYW5jZWQnXG5cdFx0Ly8gTmVlZCBpbml0IGlmIGpRdWVyeSBpcyBjYWxsZWQgKGp1c3QgYWxsb3cgZXJyb3IgdG8gYmUgdGhyb3duIGlmIG5vdCBpbmNsdWRlZClcblx0XHRyZXR1cm4gbmV3IGpRdWVyeS5mbi5pbml0KCBzZWxlY3RvciwgY29udGV4dCApO1xuXHR9LFxuXG5cdC8vIFN1cHBvcnQ6IEFuZHJvaWQgPD00LjAgb25seVxuXHQvLyBNYWtlIHN1cmUgd2UgdHJpbSBCT00gYW5kIE5CU1Bcblx0cnRyaW0gPSAvXltcXHNcXHVGRUZGXFx4QTBdK3xbXFxzXFx1RkVGRlxceEEwXSskL2csXG5cblx0Ly8gTWF0Y2hlcyBkYXNoZWQgc3RyaW5nIGZvciBjYW1lbGl6aW5nXG5cdHJtc1ByZWZpeCA9IC9eLW1zLS8sXG5cdHJkYXNoQWxwaGEgPSAvLShbYS16XSkvZyxcblxuXHQvLyBVc2VkIGJ5IGpRdWVyeS5jYW1lbENhc2UgYXMgY2FsbGJhY2sgdG8gcmVwbGFjZSgpXG5cdGZjYW1lbENhc2UgPSBmdW5jdGlvbiggYWxsLCBsZXR0ZXIgKSB7XG5cdFx0cmV0dXJuIGxldHRlci50b1VwcGVyQ2FzZSgpO1xuXHR9O1xuXG5qUXVlcnkuZm4gPSBqUXVlcnkucHJvdG90eXBlID0ge1xuXG5cdC8vIFRoZSBjdXJyZW50IHZlcnNpb24gb2YgalF1ZXJ5IGJlaW5nIHVzZWRcblx0anF1ZXJ5OiB2ZXJzaW9uLFxuXG5cdGNvbnN0cnVjdG9yOiBqUXVlcnksXG5cblx0Ly8gVGhlIGRlZmF1bHQgbGVuZ3RoIG9mIGEgalF1ZXJ5IG9iamVjdCBpcyAwXG5cdGxlbmd0aDogMCxcblxuXHR0b0FycmF5OiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gc2xpY2UuY2FsbCggdGhpcyApO1xuXHR9LFxuXG5cdC8vIEdldCB0aGUgTnRoIGVsZW1lbnQgaW4gdGhlIG1hdGNoZWQgZWxlbWVudCBzZXQgT1Jcblx0Ly8gR2V0IHRoZSB3aG9sZSBtYXRjaGVkIGVsZW1lbnQgc2V0IGFzIGEgY2xlYW4gYXJyYXlcblx0Z2V0OiBmdW5jdGlvbiggbnVtICkge1xuXG5cdFx0Ly8gUmV0dXJuIGFsbCB0aGUgZWxlbWVudHMgaW4gYSBjbGVhbiBhcnJheVxuXHRcdGlmICggbnVtID09IG51bGwgKSB7XG5cdFx0XHRyZXR1cm4gc2xpY2UuY2FsbCggdGhpcyApO1xuXHRcdH1cblxuXHRcdC8vIFJldHVybiBqdXN0IHRoZSBvbmUgZWxlbWVudCBmcm9tIHRoZSBzZXRcblx0XHRyZXR1cm4gbnVtIDwgMCA/IHRoaXNbIG51bSArIHRoaXMubGVuZ3RoIF0gOiB0aGlzWyBudW0gXTtcblx0fSxcblxuXHQvLyBUYWtlIGFuIGFycmF5IG9mIGVsZW1lbnRzIGFuZCBwdXNoIGl0IG9udG8gdGhlIHN0YWNrXG5cdC8vIChyZXR1cm5pbmcgdGhlIG5ldyBtYXRjaGVkIGVsZW1lbnQgc2V0KVxuXHRwdXNoU3RhY2s6IGZ1bmN0aW9uKCBlbGVtcyApIHtcblxuXHRcdC8vIEJ1aWxkIGEgbmV3IGpRdWVyeSBtYXRjaGVkIGVsZW1lbnQgc2V0XG5cdFx0dmFyIHJldCA9IGpRdWVyeS5tZXJnZSggdGhpcy5jb25zdHJ1Y3RvcigpLCBlbGVtcyApO1xuXG5cdFx0Ly8gQWRkIHRoZSBvbGQgb2JqZWN0IG9udG8gdGhlIHN0YWNrIChhcyBhIHJlZmVyZW5jZSlcblx0XHRyZXQucHJldk9iamVjdCA9IHRoaXM7XG5cblx0XHQvLyBSZXR1cm4gdGhlIG5ld2x5LWZvcm1lZCBlbGVtZW50IHNldFxuXHRcdHJldHVybiByZXQ7XG5cdH0sXG5cblx0Ly8gRXhlY3V0ZSBhIGNhbGxiYWNrIGZvciBldmVyeSBlbGVtZW50IGluIHRoZSBtYXRjaGVkIHNldC5cblx0ZWFjaDogZnVuY3Rpb24oIGNhbGxiYWNrICkge1xuXHRcdHJldHVybiBqUXVlcnkuZWFjaCggdGhpcywgY2FsbGJhY2sgKTtcblx0fSxcblxuXHRtYXA6IGZ1bmN0aW9uKCBjYWxsYmFjayApIHtcblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIGpRdWVyeS5tYXAoIHRoaXMsIGZ1bmN0aW9uKCBlbGVtLCBpICkge1xuXHRcdFx0cmV0dXJuIGNhbGxiYWNrLmNhbGwoIGVsZW0sIGksIGVsZW0gKTtcblx0XHR9ICkgKTtcblx0fSxcblxuXHRzbGljZTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCBzbGljZS5hcHBseSggdGhpcywgYXJndW1lbnRzICkgKTtcblx0fSxcblxuXHRmaXJzdDogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMuZXEoIDAgKTtcblx0fSxcblxuXHRsYXN0OiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5lcSggLTEgKTtcblx0fSxcblxuXHRlcTogZnVuY3Rpb24oIGkgKSB7XG5cdFx0dmFyIGxlbiA9IHRoaXMubGVuZ3RoLFxuXHRcdFx0aiA9ICtpICsgKCBpIDwgMCA/IGxlbiA6IDAgKTtcblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIGogPj0gMCAmJiBqIDwgbGVuID8gWyB0aGlzWyBqIF0gXSA6IFtdICk7XG5cdH0sXG5cblx0ZW5kOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5wcmV2T2JqZWN0IHx8IHRoaXMuY29uc3RydWN0b3IoKTtcblx0fSxcblxuXHQvLyBGb3IgaW50ZXJuYWwgdXNlIG9ubHkuXG5cdC8vIEJlaGF2ZXMgbGlrZSBhbiBBcnJheSdzIG1ldGhvZCwgbm90IGxpa2UgYSBqUXVlcnkgbWV0aG9kLlxuXHRwdXNoOiBwdXNoLFxuXHRzb3J0OiBhcnIuc29ydCxcblx0c3BsaWNlOiBhcnIuc3BsaWNlXG59O1xuXG5qUXVlcnkuZXh0ZW5kID0galF1ZXJ5LmZuLmV4dGVuZCA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgb3B0aW9ucywgbmFtZSwgc3JjLCBjb3B5LCBjb3B5SXNBcnJheSwgY2xvbmUsXG5cdFx0dGFyZ2V0ID0gYXJndW1lbnRzWyAwIF0gfHwge30sXG5cdFx0aSA9IDEsXG5cdFx0bGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCxcblx0XHRkZWVwID0gZmFsc2U7XG5cblx0Ly8gSGFuZGxlIGEgZGVlcCBjb3B5IHNpdHVhdGlvblxuXHRpZiAoIHR5cGVvZiB0YXJnZXQgPT09IFwiYm9vbGVhblwiICkge1xuXHRcdGRlZXAgPSB0YXJnZXQ7XG5cblx0XHQvLyBTa2lwIHRoZSBib29sZWFuIGFuZCB0aGUgdGFyZ2V0XG5cdFx0dGFyZ2V0ID0gYXJndW1lbnRzWyBpIF0gfHwge307XG5cdFx0aSsrO1xuXHR9XG5cblx0Ly8gSGFuZGxlIGNhc2Ugd2hlbiB0YXJnZXQgaXMgYSBzdHJpbmcgb3Igc29tZXRoaW5nIChwb3NzaWJsZSBpbiBkZWVwIGNvcHkpXG5cdGlmICggdHlwZW9mIHRhcmdldCAhPT0gXCJvYmplY3RcIiAmJiAhalF1ZXJ5LmlzRnVuY3Rpb24oIHRhcmdldCApICkge1xuXHRcdHRhcmdldCA9IHt9O1xuXHR9XG5cblx0Ly8gRXh0ZW5kIGpRdWVyeSBpdHNlbGYgaWYgb25seSBvbmUgYXJndW1lbnQgaXMgcGFzc2VkXG5cdGlmICggaSA9PT0gbGVuZ3RoICkge1xuXHRcdHRhcmdldCA9IHRoaXM7XG5cdFx0aS0tO1xuXHR9XG5cblx0Zm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG5cblx0XHQvLyBPbmx5IGRlYWwgd2l0aCBub24tbnVsbC91bmRlZmluZWQgdmFsdWVzXG5cdFx0aWYgKCAoIG9wdGlvbnMgPSBhcmd1bWVudHNbIGkgXSApICE9IG51bGwgKSB7XG5cblx0XHRcdC8vIEV4dGVuZCB0aGUgYmFzZSBvYmplY3Rcblx0XHRcdGZvciAoIG5hbWUgaW4gb3B0aW9ucyApIHtcblx0XHRcdFx0c3JjID0gdGFyZ2V0WyBuYW1lIF07XG5cdFx0XHRcdGNvcHkgPSBvcHRpb25zWyBuYW1lIF07XG5cblx0XHRcdFx0Ly8gUHJldmVudCBuZXZlci1lbmRpbmcgbG9vcFxuXHRcdFx0XHRpZiAoIHRhcmdldCA9PT0gY29weSApIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFJlY3Vyc2UgaWYgd2UncmUgbWVyZ2luZyBwbGFpbiBvYmplY3RzIG9yIGFycmF5c1xuXHRcdFx0XHRpZiAoIGRlZXAgJiYgY29weSAmJiAoIGpRdWVyeS5pc1BsYWluT2JqZWN0KCBjb3B5ICkgfHxcblx0XHRcdFx0XHQoIGNvcHlJc0FycmF5ID0gQXJyYXkuaXNBcnJheSggY29weSApICkgKSApIHtcblxuXHRcdFx0XHRcdGlmICggY29weUlzQXJyYXkgKSB7XG5cdFx0XHRcdFx0XHRjb3B5SXNBcnJheSA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0Y2xvbmUgPSBzcmMgJiYgQXJyYXkuaXNBcnJheSggc3JjICkgPyBzcmMgOiBbXTtcblxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRjbG9uZSA9IHNyYyAmJiBqUXVlcnkuaXNQbGFpbk9iamVjdCggc3JjICkgPyBzcmMgOiB7fTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBOZXZlciBtb3ZlIG9yaWdpbmFsIG9iamVjdHMsIGNsb25lIHRoZW1cblx0XHRcdFx0XHR0YXJnZXRbIG5hbWUgXSA9IGpRdWVyeS5leHRlbmQoIGRlZXAsIGNsb25lLCBjb3B5ICk7XG5cblx0XHRcdFx0Ly8gRG9uJ3QgYnJpbmcgaW4gdW5kZWZpbmVkIHZhbHVlc1xuXHRcdFx0XHR9IGVsc2UgaWYgKCBjb3B5ICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0dGFyZ2V0WyBuYW1lIF0gPSBjb3B5O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gUmV0dXJuIHRoZSBtb2RpZmllZCBvYmplY3Rcblx0cmV0dXJuIHRhcmdldDtcbn07XG5cbmpRdWVyeS5leHRlbmQoIHtcblxuXHQvLyBVbmlxdWUgZm9yIGVhY2ggY29weSBvZiBqUXVlcnkgb24gdGhlIHBhZ2Vcblx0ZXhwYW5kbzogXCJqUXVlcnlcIiArICggdmVyc2lvbiArIE1hdGgucmFuZG9tKCkgKS5yZXBsYWNlKCAvXFxEL2csIFwiXCIgKSxcblxuXHQvLyBBc3N1bWUgalF1ZXJ5IGlzIHJlYWR5IHdpdGhvdXQgdGhlIHJlYWR5IG1vZHVsZVxuXHRpc1JlYWR5OiB0cnVlLFxuXG5cdGVycm9yOiBmdW5jdGlvbiggbXNnICkge1xuXHRcdHRocm93IG5ldyBFcnJvciggbXNnICk7XG5cdH0sXG5cblx0bm9vcDogZnVuY3Rpb24oKSB7fSxcblxuXHRpc0Z1bmN0aW9uOiBmdW5jdGlvbiggb2JqICkge1xuXG5cdFx0Ly8gU3VwcG9ydDogQ2hyb21lIDw9NTcsIEZpcmVmb3ggPD01MlxuXHRcdC8vIEluIHNvbWUgYnJvd3NlcnMsIHR5cGVvZiByZXR1cm5zIFwiZnVuY3Rpb25cIiBmb3IgSFRNTCA8b2JqZWN0PiBlbGVtZW50c1xuXHRcdC8vIChpLmUuLCBgdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwib2JqZWN0XCIgKSA9PT0gXCJmdW5jdGlvblwiYCkuXG5cdFx0Ly8gV2UgZG9uJ3Qgd2FudCB0byBjbGFzc2lmeSAqYW55KiBET00gbm9kZSBhcyBhIGZ1bmN0aW9uLlxuXHRcdHJldHVybiB0eXBlb2Ygb2JqID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIG9iai5ub2RlVHlwZSAhPT0gXCJudW1iZXJcIjtcblx0fSxcblxuXHRpc051bWVyaWM6IGZ1bmN0aW9uKCBvYmogKSB7XG5cblx0XHQvLyBBcyBvZiBqUXVlcnkgMy4wLCBpc051bWVyaWMgaXMgbGltaXRlZCB0b1xuXHRcdC8vIHN0cmluZ3MgYW5kIG51bWJlcnMgKHByaW1pdGl2ZXMgb3Igb2JqZWN0cylcblx0XHQvLyB0aGF0IGNhbiBiZSBjb2VyY2VkIHRvIGZpbml0ZSBudW1iZXJzIChnaC0yNjYyKVxuXHRcdHZhciB0eXBlID0galF1ZXJ5LnR5cGUoIG9iaiApO1xuXHRcdHJldHVybiAoIHR5cGUgPT09IFwibnVtYmVyXCIgfHwgdHlwZSA9PT0gXCJzdHJpbmdcIiApICYmXG5cblx0XHRcdC8vIHBhcnNlRmxvYXQgTmFOcyBudW1lcmljLWNhc3QgZmFsc2UgcG9zaXRpdmVzIChcIlwiKVxuXHRcdFx0Ly8gLi4uYnV0IG1pc2ludGVycHJldHMgbGVhZGluZy1udW1iZXIgc3RyaW5ncywgcGFydGljdWxhcmx5IGhleCBsaXRlcmFscyAoXCIweC4uLlwiKVxuXHRcdFx0Ly8gc3VidHJhY3Rpb24gZm9yY2VzIGluZmluaXRpZXMgdG8gTmFOXG5cdFx0XHQhaXNOYU4oIG9iaiAtIHBhcnNlRmxvYXQoIG9iaiApICk7XG5cdH0sXG5cblx0aXNQbGFpbk9iamVjdDogZnVuY3Rpb24oIG9iaiApIHtcblx0XHR2YXIgcHJvdG8sIEN0b3I7XG5cblx0XHQvLyBEZXRlY3Qgb2J2aW91cyBuZWdhdGl2ZXNcblx0XHQvLyBVc2UgdG9TdHJpbmcgaW5zdGVhZCBvZiBqUXVlcnkudHlwZSB0byBjYXRjaCBob3N0IG9iamVjdHNcblx0XHRpZiAoICFvYmogfHwgdG9TdHJpbmcuY2FsbCggb2JqICkgIT09IFwiW29iamVjdCBPYmplY3RdXCIgKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cHJvdG8gPSBnZXRQcm90byggb2JqICk7XG5cblx0XHQvLyBPYmplY3RzIHdpdGggbm8gcHJvdG90eXBlIChlLmcuLCBgT2JqZWN0LmNyZWF0ZSggbnVsbCApYCkgYXJlIHBsYWluXG5cdFx0aWYgKCAhcHJvdG8gKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHQvLyBPYmplY3RzIHdpdGggcHJvdG90eXBlIGFyZSBwbGFpbiBpZmYgdGhleSB3ZXJlIGNvbnN0cnVjdGVkIGJ5IGEgZ2xvYmFsIE9iamVjdCBmdW5jdGlvblxuXHRcdEN0b3IgPSBoYXNPd24uY2FsbCggcHJvdG8sIFwiY29uc3RydWN0b3JcIiApICYmIHByb3RvLmNvbnN0cnVjdG9yO1xuXHRcdHJldHVybiB0eXBlb2YgQ3RvciA9PT0gXCJmdW5jdGlvblwiICYmIGZuVG9TdHJpbmcuY2FsbCggQ3RvciApID09PSBPYmplY3RGdW5jdGlvblN0cmluZztcblx0fSxcblxuXHRpc0VtcHR5T2JqZWN0OiBmdW5jdGlvbiggb2JqICkge1xuXG5cdFx0LyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cblx0XHQvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2VzbGludC9lc2xpbnQvaXNzdWVzLzYxMjVcblx0XHR2YXIgbmFtZTtcblxuXHRcdGZvciAoIG5hbWUgaW4gb2JqICkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblxuXHR0eXBlOiBmdW5jdGlvbiggb2JqICkge1xuXHRcdGlmICggb2JqID09IG51bGwgKSB7XG5cdFx0XHRyZXR1cm4gb2JqICsgXCJcIjtcblx0XHR9XG5cblx0XHQvLyBTdXBwb3J0OiBBbmRyb2lkIDw9Mi4zIG9ubHkgKGZ1bmN0aW9uaXNoIFJlZ0V4cClcblx0XHRyZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2Ygb2JqID09PSBcImZ1bmN0aW9uXCIgP1xuXHRcdFx0Y2xhc3MydHlwZVsgdG9TdHJpbmcuY2FsbCggb2JqICkgXSB8fCBcIm9iamVjdFwiIDpcblx0XHRcdHR5cGVvZiBvYmo7XG5cdH0sXG5cblx0Ly8gRXZhbHVhdGVzIGEgc2NyaXB0IGluIGEgZ2xvYmFsIGNvbnRleHRcblx0Z2xvYmFsRXZhbDogZnVuY3Rpb24oIGNvZGUgKSB7XG5cdFx0RE9NRXZhbCggY29kZSApO1xuXHR9LFxuXG5cdC8vIENvbnZlcnQgZGFzaGVkIHRvIGNhbWVsQ2FzZTsgdXNlZCBieSB0aGUgY3NzIGFuZCBkYXRhIG1vZHVsZXNcblx0Ly8gU3VwcG9ydDogSUUgPD05IC0gMTEsIEVkZ2UgMTIgLSAxNVxuXHQvLyBNaWNyb3NvZnQgZm9yZ290IHRvIGh1bXAgdGhlaXIgdmVuZG9yIHByZWZpeCAoIzk1NzIpXG5cdGNhbWVsQ2FzZTogZnVuY3Rpb24oIHN0cmluZyApIHtcblx0XHRyZXR1cm4gc3RyaW5nLnJlcGxhY2UoIHJtc1ByZWZpeCwgXCJtcy1cIiApLnJlcGxhY2UoIHJkYXNoQWxwaGEsIGZjYW1lbENhc2UgKTtcblx0fSxcblxuXHRlYWNoOiBmdW5jdGlvbiggb2JqLCBjYWxsYmFjayApIHtcblx0XHR2YXIgbGVuZ3RoLCBpID0gMDtcblxuXHRcdGlmICggaXNBcnJheUxpa2UoIG9iaiApICkge1xuXHRcdFx0bGVuZ3RoID0gb2JqLmxlbmd0aDtcblx0XHRcdGZvciAoIDsgaSA8IGxlbmd0aDsgaSsrICkge1xuXHRcdFx0XHRpZiAoIGNhbGxiYWNrLmNhbGwoIG9ialsgaSBdLCBpLCBvYmpbIGkgXSApID09PSBmYWxzZSApIHtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRmb3IgKCBpIGluIG9iaiApIHtcblx0XHRcdFx0aWYgKCBjYWxsYmFjay5jYWxsKCBvYmpbIGkgXSwgaSwgb2JqWyBpIF0gKSA9PT0gZmFsc2UgKSB7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gb2JqO1xuXHR9LFxuXG5cdC8vIFN1cHBvcnQ6IEFuZHJvaWQgPD00LjAgb25seVxuXHR0cmltOiBmdW5jdGlvbiggdGV4dCApIHtcblx0XHRyZXR1cm4gdGV4dCA9PSBudWxsID9cblx0XHRcdFwiXCIgOlxuXHRcdFx0KCB0ZXh0ICsgXCJcIiApLnJlcGxhY2UoIHJ0cmltLCBcIlwiICk7XG5cdH0sXG5cblx0Ly8gcmVzdWx0cyBpcyBmb3IgaW50ZXJuYWwgdXNhZ2Ugb25seVxuXHRtYWtlQXJyYXk6IGZ1bmN0aW9uKCBhcnIsIHJlc3VsdHMgKSB7XG5cdFx0dmFyIHJldCA9IHJlc3VsdHMgfHwgW107XG5cblx0XHRpZiAoIGFyciAhPSBudWxsICkge1xuXHRcdFx0aWYgKCBpc0FycmF5TGlrZSggT2JqZWN0KCBhcnIgKSApICkge1xuXHRcdFx0XHRqUXVlcnkubWVyZ2UoIHJldCxcblx0XHRcdFx0XHR0eXBlb2YgYXJyID09PSBcInN0cmluZ1wiID9cblx0XHRcdFx0XHRbIGFyciBdIDogYXJyXG5cdFx0XHRcdCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRwdXNoLmNhbGwoIHJldCwgYXJyICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJldDtcblx0fSxcblxuXHRpbkFycmF5OiBmdW5jdGlvbiggZWxlbSwgYXJyLCBpICkge1xuXHRcdHJldHVybiBhcnIgPT0gbnVsbCA/IC0xIDogaW5kZXhPZi5jYWxsKCBhcnIsIGVsZW0sIGkgKTtcblx0fSxcblxuXHQvLyBTdXBwb3J0OiBBbmRyb2lkIDw9NC4wIG9ubHksIFBoYW50b21KUyAxIG9ubHlcblx0Ly8gcHVzaC5hcHBseShfLCBhcnJheWxpa2UpIHRocm93cyBvbiBhbmNpZW50IFdlYktpdFxuXHRtZXJnZTogZnVuY3Rpb24oIGZpcnN0LCBzZWNvbmQgKSB7XG5cdFx0dmFyIGxlbiA9ICtzZWNvbmQubGVuZ3RoLFxuXHRcdFx0aiA9IDAsXG5cdFx0XHRpID0gZmlyc3QubGVuZ3RoO1xuXG5cdFx0Zm9yICggOyBqIDwgbGVuOyBqKysgKSB7XG5cdFx0XHRmaXJzdFsgaSsrIF0gPSBzZWNvbmRbIGogXTtcblx0XHR9XG5cblx0XHRmaXJzdC5sZW5ndGggPSBpO1xuXG5cdFx0cmV0dXJuIGZpcnN0O1xuXHR9LFxuXG5cdGdyZXA6IGZ1bmN0aW9uKCBlbGVtcywgY2FsbGJhY2ssIGludmVydCApIHtcblx0XHR2YXIgY2FsbGJhY2tJbnZlcnNlLFxuXHRcdFx0bWF0Y2hlcyA9IFtdLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRsZW5ndGggPSBlbGVtcy5sZW5ndGgsXG5cdFx0XHRjYWxsYmFja0V4cGVjdCA9ICFpbnZlcnQ7XG5cblx0XHQvLyBHbyB0aHJvdWdoIHRoZSBhcnJheSwgb25seSBzYXZpbmcgdGhlIGl0ZW1zXG5cdFx0Ly8gdGhhdCBwYXNzIHRoZSB2YWxpZGF0b3IgZnVuY3Rpb25cblx0XHRmb3IgKCA7IGkgPCBsZW5ndGg7IGkrKyApIHtcblx0XHRcdGNhbGxiYWNrSW52ZXJzZSA9ICFjYWxsYmFjayggZWxlbXNbIGkgXSwgaSApO1xuXHRcdFx0aWYgKCBjYWxsYmFja0ludmVyc2UgIT09IGNhbGxiYWNrRXhwZWN0ICkge1xuXHRcdFx0XHRtYXRjaGVzLnB1c2goIGVsZW1zWyBpIF0gKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gbWF0Y2hlcztcblx0fSxcblxuXHQvLyBhcmcgaXMgZm9yIGludGVybmFsIHVzYWdlIG9ubHlcblx0bWFwOiBmdW5jdGlvbiggZWxlbXMsIGNhbGxiYWNrLCBhcmcgKSB7XG5cdFx0dmFyIGxlbmd0aCwgdmFsdWUsXG5cdFx0XHRpID0gMCxcblx0XHRcdHJldCA9IFtdO1xuXG5cdFx0Ly8gR28gdGhyb3VnaCB0aGUgYXJyYXksIHRyYW5zbGF0aW5nIGVhY2ggb2YgdGhlIGl0ZW1zIHRvIHRoZWlyIG5ldyB2YWx1ZXNcblx0XHRpZiAoIGlzQXJyYXlMaWtlKCBlbGVtcyApICkge1xuXHRcdFx0bGVuZ3RoID0gZWxlbXMubGVuZ3RoO1xuXHRcdFx0Zm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG5cdFx0XHRcdHZhbHVlID0gY2FsbGJhY2soIGVsZW1zWyBpIF0sIGksIGFyZyApO1xuXG5cdFx0XHRcdGlmICggdmFsdWUgIT0gbnVsbCApIHtcblx0XHRcdFx0XHRyZXQucHVzaCggdmFsdWUgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0Ly8gR28gdGhyb3VnaCBldmVyeSBrZXkgb24gdGhlIG9iamVjdCxcblx0XHR9IGVsc2Uge1xuXHRcdFx0Zm9yICggaSBpbiBlbGVtcyApIHtcblx0XHRcdFx0dmFsdWUgPSBjYWxsYmFjayggZWxlbXNbIGkgXSwgaSwgYXJnICk7XG5cblx0XHRcdFx0aWYgKCB2YWx1ZSAhPSBudWxsICkge1xuXHRcdFx0XHRcdHJldC5wdXNoKCB2YWx1ZSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gRmxhdHRlbiBhbnkgbmVzdGVkIGFycmF5c1xuXHRcdHJldHVybiBjb25jYXQuYXBwbHkoIFtdLCByZXQgKTtcblx0fSxcblxuXHQvLyBBIGdsb2JhbCBHVUlEIGNvdW50ZXIgZm9yIG9iamVjdHNcblx0Z3VpZDogMSxcblxuXHQvLyBCaW5kIGEgZnVuY3Rpb24gdG8gYSBjb250ZXh0LCBvcHRpb25hbGx5IHBhcnRpYWxseSBhcHBseWluZyBhbnlcblx0Ly8gYXJndW1lbnRzLlxuXHRwcm94eTogZnVuY3Rpb24oIGZuLCBjb250ZXh0ICkge1xuXHRcdHZhciB0bXAsIGFyZ3MsIHByb3h5O1xuXG5cdFx0aWYgKCB0eXBlb2YgY29udGV4dCA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdHRtcCA9IGZuWyBjb250ZXh0IF07XG5cdFx0XHRjb250ZXh0ID0gZm47XG5cdFx0XHRmbiA9IHRtcDtcblx0XHR9XG5cblx0XHQvLyBRdWljayBjaGVjayB0byBkZXRlcm1pbmUgaWYgdGFyZ2V0IGlzIGNhbGxhYmxlLCBpbiB0aGUgc3BlY1xuXHRcdC8vIHRoaXMgdGhyb3dzIGEgVHlwZUVycm9yLCBidXQgd2Ugd2lsbCBqdXN0IHJldHVybiB1bmRlZmluZWQuXG5cdFx0aWYgKCAhalF1ZXJ5LmlzRnVuY3Rpb24oIGZuICkgKSB7XG5cdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHRcdH1cblxuXHRcdC8vIFNpbXVsYXRlZCBiaW5kXG5cdFx0YXJncyA9IHNsaWNlLmNhbGwoIGFyZ3VtZW50cywgMiApO1xuXHRcdHByb3h5ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gZm4uYXBwbHkoIGNvbnRleHQgfHwgdGhpcywgYXJncy5jb25jYXQoIHNsaWNlLmNhbGwoIGFyZ3VtZW50cyApICkgKTtcblx0XHR9O1xuXG5cdFx0Ly8gU2V0IHRoZSBndWlkIG9mIHVuaXF1ZSBoYW5kbGVyIHRvIHRoZSBzYW1lIG9mIG9yaWdpbmFsIGhhbmRsZXIsIHNvIGl0IGNhbiBiZSByZW1vdmVkXG5cdFx0cHJveHkuZ3VpZCA9IGZuLmd1aWQgPSBmbi5ndWlkIHx8IGpRdWVyeS5ndWlkKys7XG5cblx0XHRyZXR1cm4gcHJveHk7XG5cdH0sXG5cblx0bm93OiBEYXRlLm5vdyxcblxuXHQvLyBqUXVlcnkuc3VwcG9ydCBpcyBub3QgdXNlZCBpbiBDb3JlIGJ1dCBvdGhlciBwcm9qZWN0cyBhdHRhY2ggdGhlaXJcblx0Ly8gcHJvcGVydGllcyB0byBpdCBzbyBpdCBuZWVkcyB0byBleGlzdC5cblx0c3VwcG9ydDogc3VwcG9ydFxufSApO1xuXG5pZiAoIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiApIHtcblx0alF1ZXJ5LmZuWyBTeW1ib2wuaXRlcmF0b3IgXSA9IGFyclsgU3ltYm9sLml0ZXJhdG9yIF07XG59XG5cbi8vIFBvcHVsYXRlIHRoZSBjbGFzczJ0eXBlIG1hcFxualF1ZXJ5LmVhY2goIFwiQm9vbGVhbiBOdW1iZXIgU3RyaW5nIEZ1bmN0aW9uIEFycmF5IERhdGUgUmVnRXhwIE9iamVjdCBFcnJvciBTeW1ib2xcIi5zcGxpdCggXCIgXCIgKSxcbmZ1bmN0aW9uKCBpLCBuYW1lICkge1xuXHRjbGFzczJ0eXBlWyBcIltvYmplY3QgXCIgKyBuYW1lICsgXCJdXCIgXSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcbn0gKTtcblxuZnVuY3Rpb24gaXNBcnJheUxpa2UoIG9iaiApIHtcblxuXHQvLyBTdXBwb3J0OiByZWFsIGlPUyA4LjIgb25seSAobm90IHJlcHJvZHVjaWJsZSBpbiBzaW11bGF0b3IpXG5cdC8vIGBpbmAgY2hlY2sgdXNlZCB0byBwcmV2ZW50IEpJVCBlcnJvciAoZ2gtMjE0NSlcblx0Ly8gaGFzT3duIGlzbid0IHVzZWQgaGVyZSBkdWUgdG8gZmFsc2UgbmVnYXRpdmVzXG5cdC8vIHJlZ2FyZGluZyBOb2RlbGlzdCBsZW5ndGggaW4gSUVcblx0dmFyIGxlbmd0aCA9ICEhb2JqICYmIFwibGVuZ3RoXCIgaW4gb2JqICYmIG9iai5sZW5ndGgsXG5cdFx0dHlwZSA9IGpRdWVyeS50eXBlKCBvYmogKTtcblxuXHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBvYmogKSB8fCBpc1dpbmRvdyggb2JqICkgKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0cmV0dXJuIHR5cGUgPT09IFwiYXJyYXlcIiB8fCBsZW5ndGggPT09IDAgfHxcblx0XHR0eXBlb2YgbGVuZ3RoID09PSBcIm51bWJlclwiICYmIGxlbmd0aCA+IDAgJiYgKCBsZW5ndGggLSAxICkgaW4gb2JqO1xufVxudmFyIGRvY3VtZW50RWxlbWVudCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuXG5cbi8qXG4gKiBPcHRpb25hbCAobm9uLVNpenpsZSkgc2VsZWN0b3IgbW9kdWxlIGZvciBjdXN0b20gYnVpbGRzLlxuICpcbiAqIE5vdGUgdGhhdCB0aGlzIERPRVMgTk9UIFNVUFBPUlQgbWFueSBkb2N1bWVudGVkIGpRdWVyeVxuICogZmVhdHVyZXMgaW4gZXhjaGFuZ2UgZm9yIGl0cyBzbWFsbGVyIHNpemU6XG4gKlxuICogQXR0cmlidXRlIG5vdCBlcXVhbCBzZWxlY3RvclxuICogUG9zaXRpb25hbCBzZWxlY3RvcnMgKDpmaXJzdDsgOmVxKG4pOyA6b2RkOyBldGMuKVxuICogVHlwZSBzZWxlY3RvcnMgKDppbnB1dDsgOmNoZWNrYm94OyA6YnV0dG9uOyBldGMuKVxuICogU3RhdGUtYmFzZWQgc2VsZWN0b3JzICg6YW5pbWF0ZWQ7IDp2aXNpYmxlOyA6aGlkZGVuOyBldGMuKVxuICogOmhhcyhzZWxlY3RvcilcbiAqIDpub3QoY29tcGxleCBzZWxlY3RvcilcbiAqIGN1c3RvbSBzZWxlY3RvcnMgdmlhIFNpenpsZSBleHRlbnNpb25zXG4gKiBMZWFkaW5nIGNvbWJpbmF0b3JzIChlLmcuLCAkY29sbGVjdGlvbi5maW5kKFwiPiAqXCIpKVxuICogUmVsaWFibGUgZnVuY3Rpb25hbGl0eSBvbiBYTUwgZnJhZ21lbnRzXG4gKiBSZXF1aXJpbmcgYWxsIHBhcnRzIG9mIGEgc2VsZWN0b3IgdG8gbWF0Y2ggZWxlbWVudHMgdW5kZXIgY29udGV4dFxuICogICAoZS5nLiwgJGRpdi5maW5kKFwiZGl2ID4gKlwiKSBub3cgbWF0Y2hlcyBjaGlsZHJlbiBvZiAkZGl2KVxuICogTWF0Y2hpbmcgYWdhaW5zdCBub24tZWxlbWVudHNcbiAqIFJlbGlhYmxlIHNvcnRpbmcgb2YgZGlzY29ubmVjdGVkIG5vZGVzXG4gKiBxdWVyeVNlbGVjdG9yQWxsIGJ1ZyBmaXhlcyAoZS5nLiwgdW5yZWxpYWJsZSA6Zm9jdXMgb24gV2ViS2l0KVxuICpcbiAqIElmIGFueSBvZiB0aGVzZSBhcmUgdW5hY2NlcHRhYmxlIHRyYWRlb2ZmcywgZWl0aGVyIHVzZSBTaXp6bGUgb3JcbiAqIGN1c3RvbWl6ZSB0aGlzIHN0dWIgZm9yIHRoZSBwcm9qZWN0J3Mgc3BlY2lmaWMgbmVlZHMuXG4gKi9cblxudmFyIGhhc0R1cGxpY2F0ZSwgc29ydElucHV0LFxuXHRzb3J0U3RhYmxlID0galF1ZXJ5LmV4cGFuZG8uc3BsaXQoIFwiXCIgKS5zb3J0KCBzb3J0T3JkZXIgKS5qb2luKCBcIlwiICkgPT09IGpRdWVyeS5leHBhbmRvLFxuXHRtYXRjaGVzID0gZG9jdW1lbnRFbGVtZW50Lm1hdGNoZXMgfHxcblx0XHRkb2N1bWVudEVsZW1lbnQud2Via2l0TWF0Y2hlc1NlbGVjdG9yIHx8XG5cdFx0ZG9jdW1lbnRFbGVtZW50Lm1vek1hdGNoZXNTZWxlY3RvciB8fFxuXHRcdGRvY3VtZW50RWxlbWVudC5vTWF0Y2hlc1NlbGVjdG9yIHx8XG5cdFx0ZG9jdW1lbnRFbGVtZW50Lm1zTWF0Y2hlc1NlbGVjdG9yLFxuXG5cdC8vIENTUyBzdHJpbmcvaWRlbnRpZmllciBzZXJpYWxpemF0aW9uXG5cdC8vIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3NvbS8jY29tbW9uLXNlcmlhbGl6aW5nLWlkaW9tc1xuXHRyY3NzZXNjYXBlID0gLyhbXFwwLVxceDFmXFx4N2ZdfF4tP1xcZCl8Xi0kfFteXFx4ODAtXFx1RkZGRlxcdy1dL2csXG5cdGZjc3Nlc2NhcGUgPSBmdW5jdGlvbiggY2gsIGFzQ29kZVBvaW50ICkge1xuXHRcdGlmICggYXNDb2RlUG9pbnQgKSB7XG5cblx0XHRcdC8vIFUrMDAwMCBOVUxMIGJlY29tZXMgVStGRkZEIFJFUExBQ0VNRU5UIENIQVJBQ1RFUlxuXHRcdFx0aWYgKCBjaCA9PT0gXCJcXDBcIiApIHtcblx0XHRcdFx0cmV0dXJuIFwiXFx1RkZGRFwiO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDb250cm9sIGNoYXJhY3RlcnMgYW5kIChkZXBlbmRlbnQgdXBvbiBwb3NpdGlvbikgbnVtYmVycyBnZXQgZXNjYXBlZCBhcyBjb2RlIHBvaW50c1xuXHRcdFx0cmV0dXJuIGNoLnNsaWNlKCAwLCAtMSApICsgXCJcXFxcXCIgKyBjaC5jaGFyQ29kZUF0KCBjaC5sZW5ndGggLSAxICkudG9TdHJpbmcoIDE2ICkgKyBcIiBcIjtcblx0XHR9XG5cblx0XHQvLyBPdGhlciBwb3RlbnRpYWxseS1zcGVjaWFsIEFTQ0lJIGNoYXJhY3RlcnMgZ2V0IGJhY2tzbGFzaC1lc2NhcGVkXG5cdFx0cmV0dXJuIFwiXFxcXFwiICsgY2g7XG5cdH07XG5cbmZ1bmN0aW9uIHNvcnRPcmRlciggYSwgYiApIHtcblxuXHQvLyBGbGFnIGZvciBkdXBsaWNhdGUgcmVtb3ZhbFxuXHRpZiAoIGEgPT09IGIgKSB7XG5cdFx0aGFzRHVwbGljYXRlID0gdHJ1ZTtcblx0XHRyZXR1cm4gMDtcblx0fVxuXG5cdC8vIFNvcnQgb24gbWV0aG9kIGV4aXN0ZW5jZSBpZiBvbmx5IG9uZSBpbnB1dCBoYXMgY29tcGFyZURvY3VtZW50UG9zaXRpb25cblx0dmFyIGNvbXBhcmUgPSAhYS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiAtICFiLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uO1xuXHRpZiAoIGNvbXBhcmUgKSB7XG5cdFx0cmV0dXJuIGNvbXBhcmU7XG5cdH1cblxuXHQvLyBDYWxjdWxhdGUgcG9zaXRpb24gaWYgYm90aCBpbnB1dHMgYmVsb25nIHRvIHRoZSBzYW1lIGRvY3VtZW50XG5cdGNvbXBhcmUgPSAoIGEub3duZXJEb2N1bWVudCB8fCBhICkgPT09ICggYi5vd25lckRvY3VtZW50IHx8IGIgKSA/XG5cdFx0YS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiggYiApIDpcblxuXHRcdC8vIE90aGVyd2lzZSB3ZSBrbm93IHRoZXkgYXJlIGRpc2Nvbm5lY3RlZFxuXHRcdDE7XG5cblx0Ly8gRGlzY29ubmVjdGVkIG5vZGVzXG5cdGlmICggY29tcGFyZSAmIDEgKSB7XG5cblx0XHQvLyBDaG9vc2UgdGhlIGZpcnN0IGVsZW1lbnQgdGhhdCBpcyByZWxhdGVkIHRvIG91ciBwcmVmZXJyZWQgZG9jdW1lbnRcblx0XHRpZiAoIGEgPT09IGRvY3VtZW50IHx8IGEub3duZXJEb2N1bWVudCA9PT0gZG9jdW1lbnQgJiZcblx0XHRcdGpRdWVyeS5jb250YWlucyggZG9jdW1lbnQsIGEgKSApIHtcblx0XHRcdHJldHVybiAtMTtcblx0XHR9XG5cdFx0aWYgKCBiID09PSBkb2N1bWVudCB8fCBiLm93bmVyRG9jdW1lbnQgPT09IGRvY3VtZW50ICYmXG5cdFx0XHRqUXVlcnkuY29udGFpbnMoIGRvY3VtZW50LCBiICkgKSB7XG5cdFx0XHRyZXR1cm4gMTtcblx0XHR9XG5cblx0XHQvLyBNYWludGFpbiBvcmlnaW5hbCBvcmRlclxuXHRcdHJldHVybiBzb3J0SW5wdXQgP1xuXHRcdFx0KCBpbmRleE9mLmNhbGwoIHNvcnRJbnB1dCwgYSApIC0gaW5kZXhPZi5jYWxsKCBzb3J0SW5wdXQsIGIgKSApIDpcblx0XHRcdDA7XG5cdH1cblxuXHRyZXR1cm4gY29tcGFyZSAmIDQgPyAtMSA6IDE7XG59XG5cbmZ1bmN0aW9uIHVuaXF1ZVNvcnQoIHJlc3VsdHMgKSB7XG5cdHZhciBlbGVtLFxuXHRcdGR1cGxpY2F0ZXMgPSBbXSxcblx0XHRqID0gMCxcblx0XHRpID0gMDtcblxuXHRoYXNEdXBsaWNhdGUgPSBmYWxzZTtcblx0c29ydElucHV0ID0gIXNvcnRTdGFibGUgJiYgcmVzdWx0cy5zbGljZSggMCApO1xuXHRyZXN1bHRzLnNvcnQoIHNvcnRPcmRlciApO1xuXG5cdGlmICggaGFzRHVwbGljYXRlICkge1xuXHRcdHdoaWxlICggKCBlbGVtID0gcmVzdWx0c1sgaSsrIF0gKSApIHtcblx0XHRcdGlmICggZWxlbSA9PT0gcmVzdWx0c1sgaSBdICkge1xuXHRcdFx0XHRqID0gZHVwbGljYXRlcy5wdXNoKCBpICk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHdoaWxlICggai0tICkge1xuXHRcdFx0cmVzdWx0cy5zcGxpY2UoIGR1cGxpY2F0ZXNbIGogXSwgMSApO1xuXHRcdH1cblx0fVxuXG5cdC8vIENsZWFyIGlucHV0IGFmdGVyIHNvcnRpbmcgdG8gcmVsZWFzZSBvYmplY3RzXG5cdC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vanF1ZXJ5L3NpenpsZS9wdWxsLzIyNVxuXHRzb3J0SW5wdXQgPSBudWxsO1xuXG5cdHJldHVybiByZXN1bHRzO1xufVxuXG5mdW5jdGlvbiBlc2NhcGUoIHNlbCApIHtcblx0cmV0dXJuICggc2VsICsgXCJcIiApLnJlcGxhY2UoIHJjc3Nlc2NhcGUsIGZjc3Nlc2NhcGUgKTtcbn1cblxualF1ZXJ5LmV4dGVuZCgge1xuXHR1bmlxdWVTb3J0OiB1bmlxdWVTb3J0LFxuXHR1bmlxdWU6IHVuaXF1ZVNvcnQsXG5cdGVzY2FwZVNlbGVjdG9yOiBlc2NhcGUsXG5cdGZpbmQ6IGZ1bmN0aW9uKCBzZWxlY3RvciwgY29udGV4dCwgcmVzdWx0cywgc2VlZCApIHtcblx0XHR2YXIgZWxlbSwgbm9kZVR5cGUsXG5cdFx0XHRpID0gMDtcblxuXHRcdHJlc3VsdHMgPSByZXN1bHRzIHx8IFtdO1xuXHRcdGNvbnRleHQgPSBjb250ZXh0IHx8IGRvY3VtZW50O1xuXG5cdFx0Ly8gU2FtZSBiYXNpYyBzYWZlZ3VhcmQgYXMgU2l6emxlXG5cdFx0aWYgKCAhc2VsZWN0b3IgfHwgdHlwZW9mIHNlbGVjdG9yICE9PSBcInN0cmluZ1wiICkge1xuXHRcdFx0cmV0dXJuIHJlc3VsdHM7XG5cdFx0fVxuXG5cdFx0Ly8gRWFybHkgcmV0dXJuIGlmIGNvbnRleHQgaXMgbm90IGFuIGVsZW1lbnQgb3IgZG9jdW1lbnRcblx0XHRpZiAoICggbm9kZVR5cGUgPSBjb250ZXh0Lm5vZGVUeXBlICkgIT09IDEgJiYgbm9kZVR5cGUgIT09IDkgKSB7XG5cdFx0XHRyZXR1cm4gW107XG5cdFx0fVxuXG5cdFx0aWYgKCBzZWVkICkge1xuXHRcdFx0d2hpbGUgKCAoIGVsZW0gPSBzZWVkWyBpKysgXSApICkge1xuXHRcdFx0XHRpZiAoIGpRdWVyeS5maW5kLm1hdGNoZXNTZWxlY3RvciggZWxlbSwgc2VsZWN0b3IgKSApIHtcblx0XHRcdFx0XHRyZXN1bHRzLnB1c2goIGVsZW0gKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRqUXVlcnkubWVyZ2UoIHJlc3VsdHMsIGNvbnRleHQucXVlcnlTZWxlY3RvckFsbCggc2VsZWN0b3IgKSApO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHRzO1xuXHR9LFxuXHR0ZXh0OiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHR2YXIgbm9kZSxcblx0XHRcdHJldCA9IFwiXCIsXG5cdFx0XHRpID0gMCxcblx0XHRcdG5vZGVUeXBlID0gZWxlbS5ub2RlVHlwZTtcblxuXHRcdGlmICggIW5vZGVUeXBlICkge1xuXG5cdFx0XHQvLyBJZiBubyBub2RlVHlwZSwgdGhpcyBpcyBleHBlY3RlZCB0byBiZSBhbiBhcnJheVxuXHRcdFx0d2hpbGUgKCAoIG5vZGUgPSBlbGVtWyBpKysgXSApICkge1xuXG5cdFx0XHRcdC8vIERvIG5vdCB0cmF2ZXJzZSBjb21tZW50IG5vZGVzXG5cdFx0XHRcdHJldCArPSBqUXVlcnkudGV4dCggbm9kZSApO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAoIG5vZGVUeXBlID09PSAxIHx8IG5vZGVUeXBlID09PSA5IHx8IG5vZGVUeXBlID09PSAxMSApIHtcblxuXHRcdFx0Ly8gVXNlIHRleHRDb250ZW50IGZvciBlbGVtZW50c1xuXHRcdFx0cmV0dXJuIGVsZW0udGV4dENvbnRlbnQ7XG5cdFx0fSBlbHNlIGlmICggbm9kZVR5cGUgPT09IDMgfHwgbm9kZVR5cGUgPT09IDQgKSB7XG5cdFx0XHRyZXR1cm4gZWxlbS5ub2RlVmFsdWU7XG5cdFx0fVxuXG5cdFx0Ly8gRG8gbm90IGluY2x1ZGUgY29tbWVudCBvciBwcm9jZXNzaW5nIGluc3RydWN0aW9uIG5vZGVzXG5cblx0XHRyZXR1cm4gcmV0O1xuXHR9LFxuXHRjb250YWluczogZnVuY3Rpb24oIGEsIGIgKSB7XG5cdFx0dmFyIGFkb3duID0gYS5ub2RlVHlwZSA9PT0gOSA/IGEuZG9jdW1lbnRFbGVtZW50IDogYSxcblx0XHRcdGJ1cCA9IGIgJiYgYi5wYXJlbnROb2RlO1xuXHRcdHJldHVybiBhID09PSBidXAgfHwgISEoIGJ1cCAmJiBidXAubm9kZVR5cGUgPT09IDEgJiYgYWRvd24uY29udGFpbnMoIGJ1cCApICk7XG5cdH0sXG5cdGlzWE1MRG9jOiBmdW5jdGlvbiggZWxlbSApIHtcblxuXHRcdC8vIGRvY3VtZW50RWxlbWVudCBpcyB2ZXJpZmllZCBmb3IgY2FzZXMgd2hlcmUgaXQgZG9lc24ndCB5ZXQgZXhpc3Rcblx0XHQvLyAoc3VjaCBhcyBsb2FkaW5nIGlmcmFtZXMgaW4gSUUgLSAjNDgzMylcblx0XHR2YXIgZG9jdW1lbnRFbGVtZW50ID0gZWxlbSAmJiAoIGVsZW0ub3duZXJEb2N1bWVudCB8fCBlbGVtICkuZG9jdW1lbnRFbGVtZW50O1xuXHRcdHJldHVybiBkb2N1bWVudEVsZW1lbnQgPyBkb2N1bWVudEVsZW1lbnQubm9kZU5hbWUgIT09IFwiSFRNTFwiIDogZmFsc2U7XG5cdH0sXG5cdGV4cHI6IHtcblx0XHRhdHRySGFuZGxlOiB7fSxcblx0XHRtYXRjaDoge1xuXHRcdFx0Ym9vbDogbmV3IFJlZ0V4cCggXCJeKD86Y2hlY2tlZHxzZWxlY3RlZHxhc3luY3xhdXRvZm9jdXN8YXV0b3BsYXl8Y29udHJvbHN8ZGVmZXJcIiArXG5cdFx0XHRcdFwifGRpc2FibGVkfGhpZGRlbnxpc21hcHxsb29wfG11bHRpcGxlfG9wZW58cmVhZG9ubHl8cmVxdWlyZWR8c2NvcGVkKSRcIiwgXCJpXCIgKSxcblx0XHRcdG5lZWRzQ29udGV4dDogL15bXFx4MjBcXHRcXHJcXG5cXGZdKls+K35dL1xuXHRcdH1cblx0fVxufSApO1xuXG5qUXVlcnkuZXh0ZW5kKCBqUXVlcnkuZmluZCwge1xuXHRtYXRjaGVzOiBmdW5jdGlvbiggZXhwciwgZWxlbWVudHMgKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5maW5kKCBleHByLCBudWxsLCBudWxsLCBlbGVtZW50cyApO1xuXHR9LFxuXHRtYXRjaGVzU2VsZWN0b3I6IGZ1bmN0aW9uKCBlbGVtLCBleHByICkge1xuXHRcdHJldHVybiBtYXRjaGVzLmNhbGwoIGVsZW0sIGV4cHIgKTtcblx0fSxcblx0YXR0cjogZnVuY3Rpb24oIGVsZW0sIG5hbWUgKSB7XG5cdFx0dmFyIGZuID0galF1ZXJ5LmV4cHIuYXR0ckhhbmRsZVsgbmFtZS50b0xvd2VyQ2FzZSgpIF0sXG5cblx0XHRcdC8vIERvbid0IGdldCBmb29sZWQgYnkgT2JqZWN0LnByb3RvdHlwZSBwcm9wZXJ0aWVzIChqUXVlcnkgIzEzODA3KVxuXHRcdFx0dmFsdWUgPSBmbiAmJiBoYXNPd24uY2FsbCggalF1ZXJ5LmV4cHIuYXR0ckhhbmRsZSwgbmFtZS50b0xvd2VyQ2FzZSgpICkgP1xuXHRcdFx0XHRmbiggZWxlbSwgbmFtZSwgalF1ZXJ5LmlzWE1MRG9jKCBlbGVtICkgKSA6XG5cdFx0XHRcdHVuZGVmaW5lZDtcblx0XHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCA/IHZhbHVlIDogZWxlbS5nZXRBdHRyaWJ1dGUoIG5hbWUgKTtcblx0fVxufSApO1xuXG5cblxudmFyIGRpciA9IGZ1bmN0aW9uKCBlbGVtLCBkaXIsIHVudGlsICkge1xuXHR2YXIgbWF0Y2hlZCA9IFtdLFxuXHRcdHRydW5jYXRlID0gdW50aWwgIT09IHVuZGVmaW5lZDtcblxuXHR3aGlsZSAoICggZWxlbSA9IGVsZW1bIGRpciBdICkgJiYgZWxlbS5ub2RlVHlwZSAhPT0gOSApIHtcblx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cdFx0XHRpZiAoIHRydW5jYXRlICYmIGpRdWVyeSggZWxlbSApLmlzKCB1bnRpbCApICkge1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdG1hdGNoZWQucHVzaCggZWxlbSApO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gbWF0Y2hlZDtcbn07XG5cblxudmFyIHNpYmxpbmdzID0gZnVuY3Rpb24oIG4sIGVsZW0gKSB7XG5cdHZhciBtYXRjaGVkID0gW107XG5cblx0Zm9yICggOyBuOyBuID0gbi5uZXh0U2libGluZyApIHtcblx0XHRpZiAoIG4ubm9kZVR5cGUgPT09IDEgJiYgbiAhPT0gZWxlbSApIHtcblx0XHRcdG1hdGNoZWQucHVzaCggbiApO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBtYXRjaGVkO1xufTtcblxuXG52YXIgcm5lZWRzQ29udGV4dCA9IGpRdWVyeS5leHByLm1hdGNoLm5lZWRzQ29udGV4dDtcblxuXG5cbmZ1bmN0aW9uIG5vZGVOYW1lKCBlbGVtLCBuYW1lICkge1xuXG4gIHJldHVybiBlbGVtLm5vZGVOYW1lICYmIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuXG59O1xudmFyIHJzaW5nbGVUYWcgPSAoIC9ePChbYS16XVteXFwvXFwwPjpcXHgyMFxcdFxcclxcblxcZl0qKVtcXHgyMFxcdFxcclxcblxcZl0qXFwvPz4oPzo8XFwvXFwxPnwpJC9pICk7XG5cblxuXG52YXIgcmlzU2ltcGxlID0gL14uW146I1xcW1xcLixdKiQvO1xuXG4vLyBJbXBsZW1lbnQgdGhlIGlkZW50aWNhbCBmdW5jdGlvbmFsaXR5IGZvciBmaWx0ZXIgYW5kIG5vdFxuZnVuY3Rpb24gd2lubm93KCBlbGVtZW50cywgcXVhbGlmaWVyLCBub3QgKSB7XG5cdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIHF1YWxpZmllciApICkge1xuXHRcdHJldHVybiBqUXVlcnkuZ3JlcCggZWxlbWVudHMsIGZ1bmN0aW9uKCBlbGVtLCBpICkge1xuXHRcdFx0cmV0dXJuICEhcXVhbGlmaWVyLmNhbGwoIGVsZW0sIGksIGVsZW0gKSAhPT0gbm90O1xuXHRcdH0gKTtcblx0fVxuXG5cdC8vIFNpbmdsZSBlbGVtZW50XG5cdGlmICggcXVhbGlmaWVyLm5vZGVUeXBlICkge1xuXHRcdHJldHVybiBqUXVlcnkuZ3JlcCggZWxlbWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuICggZWxlbSA9PT0gcXVhbGlmaWVyICkgIT09IG5vdDtcblx0XHR9ICk7XG5cdH1cblxuXHQvLyBBcnJheWxpa2Ugb2YgZWxlbWVudHMgKGpRdWVyeSwgYXJndW1lbnRzLCBBcnJheSlcblx0aWYgKCB0eXBlb2YgcXVhbGlmaWVyICE9PSBcInN0cmluZ1wiICkge1xuXHRcdHJldHVybiBqUXVlcnkuZ3JlcCggZWxlbWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuICggaW5kZXhPZi5jYWxsKCBxdWFsaWZpZXIsIGVsZW0gKSA+IC0xICkgIT09IG5vdDtcblx0XHR9ICk7XG5cdH1cblxuXHQvLyBTaW1wbGUgc2VsZWN0b3IgdGhhdCBjYW4gYmUgZmlsdGVyZWQgZGlyZWN0bHksIHJlbW92aW5nIG5vbi1FbGVtZW50c1xuXHRpZiAoIHJpc1NpbXBsZS50ZXN0KCBxdWFsaWZpZXIgKSApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmZpbHRlciggcXVhbGlmaWVyLCBlbGVtZW50cywgbm90ICk7XG5cdH1cblxuXHQvLyBDb21wbGV4IHNlbGVjdG9yLCBjb21wYXJlIHRoZSB0d28gc2V0cywgcmVtb3Zpbmcgbm9uLUVsZW1lbnRzXG5cdHF1YWxpZmllciA9IGpRdWVyeS5maWx0ZXIoIHF1YWxpZmllciwgZWxlbWVudHMgKTtcblx0cmV0dXJuIGpRdWVyeS5ncmVwKCBlbGVtZW50cywgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuICggaW5kZXhPZi5jYWxsKCBxdWFsaWZpZXIsIGVsZW0gKSA+IC0xICkgIT09IG5vdCAmJiBlbGVtLm5vZGVUeXBlID09PSAxO1xuXHR9ICk7XG59XG5cbmpRdWVyeS5maWx0ZXIgPSBmdW5jdGlvbiggZXhwciwgZWxlbXMsIG5vdCApIHtcblx0dmFyIGVsZW0gPSBlbGVtc1sgMCBdO1xuXG5cdGlmICggbm90ICkge1xuXHRcdGV4cHIgPSBcIjpub3QoXCIgKyBleHByICsgXCIpXCI7XG5cdH1cblxuXHRpZiAoIGVsZW1zLmxlbmd0aCA9PT0gMSAmJiBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuXHRcdHJldHVybiBqUXVlcnkuZmluZC5tYXRjaGVzU2VsZWN0b3IoIGVsZW0sIGV4cHIgKSA/IFsgZWxlbSBdIDogW107XG5cdH1cblxuXHRyZXR1cm4galF1ZXJ5LmZpbmQubWF0Y2hlcyggZXhwciwgalF1ZXJ5LmdyZXAoIGVsZW1zLCBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4gZWxlbS5ub2RlVHlwZSA9PT0gMTtcblx0fSApICk7XG59O1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdGZpbmQ6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHR2YXIgaSwgcmV0LFxuXHRcdFx0bGVuID0gdGhpcy5sZW5ndGgsXG5cdFx0XHRzZWxmID0gdGhpcztcblxuXHRcdGlmICggdHlwZW9mIHNlbGVjdG9yICE9PSBcInN0cmluZ1wiICkge1xuXHRcdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCBqUXVlcnkoIHNlbGVjdG9yICkuZmlsdGVyKCBmdW5jdGlvbigpIHtcblx0XHRcdFx0Zm9yICggaSA9IDA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRcdFx0XHRpZiAoIGpRdWVyeS5jb250YWlucyggc2VsZlsgaSBdLCB0aGlzICkgKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gKSApO1xuXHRcdH1cblxuXHRcdHJldCA9IHRoaXMucHVzaFN0YWNrKCBbXSApO1xuXG5cdFx0Zm9yICggaSA9IDA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRcdGpRdWVyeS5maW5kKCBzZWxlY3Rvciwgc2VsZlsgaSBdLCByZXQgKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbGVuID4gMSA/IGpRdWVyeS51bmlxdWVTb3J0KCByZXQgKSA6IHJldDtcblx0fSxcblx0ZmlsdGVyOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCB3aW5ub3coIHRoaXMsIHNlbGVjdG9yIHx8IFtdLCBmYWxzZSApICk7XG5cdH0sXG5cdG5vdDogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggd2lubm93KCB0aGlzLCBzZWxlY3RvciB8fCBbXSwgdHJ1ZSApICk7XG5cdH0sXG5cdGlzOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0cmV0dXJuICEhd2lubm93KFxuXHRcdFx0dGhpcyxcblxuXHRcdFx0Ly8gSWYgdGhpcyBpcyBhIHBvc2l0aW9uYWwvcmVsYXRpdmUgc2VsZWN0b3IsIGNoZWNrIG1lbWJlcnNoaXAgaW4gdGhlIHJldHVybmVkIHNldFxuXHRcdFx0Ly8gc28gJChcInA6Zmlyc3RcIikuaXMoXCJwOmxhc3RcIikgd29uJ3QgcmV0dXJuIHRydWUgZm9yIGEgZG9jIHdpdGggdHdvIFwicFwiLlxuXHRcdFx0dHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiICYmIHJuZWVkc0NvbnRleHQudGVzdCggc2VsZWN0b3IgKSA/XG5cdFx0XHRcdGpRdWVyeSggc2VsZWN0b3IgKSA6XG5cdFx0XHRcdHNlbGVjdG9yIHx8IFtdLFxuXHRcdFx0ZmFsc2Vcblx0XHQpLmxlbmd0aDtcblx0fVxufSApO1xuXG5cbi8vIEluaXRpYWxpemUgYSBqUXVlcnkgb2JqZWN0XG5cblxuLy8gQSBjZW50cmFsIHJlZmVyZW5jZSB0byB0aGUgcm9vdCBqUXVlcnkoZG9jdW1lbnQpXG52YXIgcm9vdGpRdWVyeSxcblxuXHQvLyBBIHNpbXBsZSB3YXkgdG8gY2hlY2sgZm9yIEhUTUwgc3RyaW5nc1xuXHQvLyBQcmlvcml0aXplICNpZCBvdmVyIDx0YWc+IHRvIGF2b2lkIFhTUyB2aWEgbG9jYXRpb24uaGFzaCAoIzk1MjEpXG5cdC8vIFN0cmljdCBIVE1MIHJlY29nbml0aW9uICgjMTEyOTA6IG11c3Qgc3RhcnQgd2l0aCA8KVxuXHQvLyBTaG9ydGN1dCBzaW1wbGUgI2lkIGNhc2UgZm9yIHNwZWVkXG5cdHJxdWlja0V4cHIgPSAvXig/OlxccyooPFtcXHdcXFddKz4pW14+XSp8IyhbXFx3LV0rKSkkLyxcblxuXHRpbml0ID0galF1ZXJ5LmZuLmluaXQgPSBmdW5jdGlvbiggc2VsZWN0b3IsIGNvbnRleHQsIHJvb3QgKSB7XG5cdFx0dmFyIG1hdGNoLCBlbGVtO1xuXG5cdFx0Ly8gSEFORExFOiAkKFwiXCIpLCAkKG51bGwpLCAkKHVuZGVmaW5lZCksICQoZmFsc2UpXG5cdFx0aWYgKCAhc2VsZWN0b3IgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cblx0XHQvLyBNZXRob2QgaW5pdCgpIGFjY2VwdHMgYW4gYWx0ZXJuYXRlIHJvb3RqUXVlcnlcblx0XHQvLyBzbyBtaWdyYXRlIGNhbiBzdXBwb3J0IGpRdWVyeS5zdWIgKGdoLTIxMDEpXG5cdFx0cm9vdCA9IHJvb3QgfHwgcm9vdGpRdWVyeTtcblxuXHRcdC8vIEhhbmRsZSBIVE1MIHN0cmluZ3Ncblx0XHRpZiAoIHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdGlmICggc2VsZWN0b3JbIDAgXSA9PT0gXCI8XCIgJiZcblx0XHRcdFx0c2VsZWN0b3JbIHNlbGVjdG9yLmxlbmd0aCAtIDEgXSA9PT0gXCI+XCIgJiZcblx0XHRcdFx0c2VsZWN0b3IubGVuZ3RoID49IDMgKSB7XG5cblx0XHRcdFx0Ly8gQXNzdW1lIHRoYXQgc3RyaW5ncyB0aGF0IHN0YXJ0IGFuZCBlbmQgd2l0aCA8PiBhcmUgSFRNTCBhbmQgc2tpcCB0aGUgcmVnZXggY2hlY2tcblx0XHRcdFx0bWF0Y2ggPSBbIG51bGwsIHNlbGVjdG9yLCBudWxsIF07XG5cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG1hdGNoID0gcnF1aWNrRXhwci5leGVjKCBzZWxlY3RvciApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBNYXRjaCBodG1sIG9yIG1ha2Ugc3VyZSBubyBjb250ZXh0IGlzIHNwZWNpZmllZCBmb3IgI2lkXG5cdFx0XHRpZiAoIG1hdGNoICYmICggbWF0Y2hbIDEgXSB8fCAhY29udGV4dCApICkge1xuXG5cdFx0XHRcdC8vIEhBTkRMRTogJChodG1sKSAtPiAkKGFycmF5KVxuXHRcdFx0XHRpZiAoIG1hdGNoWyAxIF0gKSB7XG5cdFx0XHRcdFx0Y29udGV4dCA9IGNvbnRleHQgaW5zdGFuY2VvZiBqUXVlcnkgPyBjb250ZXh0WyAwIF0gOiBjb250ZXh0O1xuXG5cdFx0XHRcdFx0Ly8gT3B0aW9uIHRvIHJ1biBzY3JpcHRzIGlzIHRydWUgZm9yIGJhY2stY29tcGF0XG5cdFx0XHRcdFx0Ly8gSW50ZW50aW9uYWxseSBsZXQgdGhlIGVycm9yIGJlIHRocm93biBpZiBwYXJzZUhUTUwgaXMgbm90IHByZXNlbnRcblx0XHRcdFx0XHRqUXVlcnkubWVyZ2UoIHRoaXMsIGpRdWVyeS5wYXJzZUhUTUwoXG5cdFx0XHRcdFx0XHRtYXRjaFsgMSBdLFxuXHRcdFx0XHRcdFx0Y29udGV4dCAmJiBjb250ZXh0Lm5vZGVUeXBlID8gY29udGV4dC5vd25lckRvY3VtZW50IHx8IGNvbnRleHQgOiBkb2N1bWVudCxcblx0XHRcdFx0XHRcdHRydWVcblx0XHRcdFx0XHQpICk7XG5cblx0XHRcdFx0XHQvLyBIQU5ETEU6ICQoaHRtbCwgcHJvcHMpXG5cdFx0XHRcdFx0aWYgKCByc2luZ2xlVGFnLnRlc3QoIG1hdGNoWyAxIF0gKSAmJiBqUXVlcnkuaXNQbGFpbk9iamVjdCggY29udGV4dCApICkge1xuXHRcdFx0XHRcdFx0Zm9yICggbWF0Y2ggaW4gY29udGV4dCApIHtcblxuXHRcdFx0XHRcdFx0XHQvLyBQcm9wZXJ0aWVzIG9mIGNvbnRleHQgYXJlIGNhbGxlZCBhcyBtZXRob2RzIGlmIHBvc3NpYmxlXG5cdFx0XHRcdFx0XHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIHRoaXNbIG1hdGNoIF0gKSApIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzWyBtYXRjaCBdKCBjb250ZXh0WyBtYXRjaCBdICk7XG5cblx0XHRcdFx0XHRcdFx0Ly8gLi4uYW5kIG90aGVyd2lzZSBzZXQgYXMgYXR0cmlidXRlc1xuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuYXR0ciggbWF0Y2gsIGNvbnRleHRbIG1hdGNoIF0gKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0XHRcdC8vIEhBTkRMRTogJCgjaWQpXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCBtYXRjaFsgMiBdICk7XG5cblx0XHRcdFx0XHRpZiAoIGVsZW0gKSB7XG5cblx0XHRcdFx0XHRcdC8vIEluamVjdCB0aGUgZWxlbWVudCBkaXJlY3RseSBpbnRvIHRoZSBqUXVlcnkgb2JqZWN0XG5cdFx0XHRcdFx0XHR0aGlzWyAwIF0gPSBlbGVtO1xuXHRcdFx0XHRcdFx0dGhpcy5sZW5ndGggPSAxO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdFx0fVxuXG5cdFx0XHQvLyBIQU5ETEU6ICQoZXhwciwgJCguLi4pKVxuXHRcdFx0fSBlbHNlIGlmICggIWNvbnRleHQgfHwgY29udGV4dC5qcXVlcnkgKSB7XG5cdFx0XHRcdHJldHVybiAoIGNvbnRleHQgfHwgcm9vdCApLmZpbmQoIHNlbGVjdG9yICk7XG5cblx0XHRcdC8vIEhBTkRMRTogJChleHByLCBjb250ZXh0KVxuXHRcdFx0Ly8gKHdoaWNoIGlzIGp1c3QgZXF1aXZhbGVudCB0bzogJChjb250ZXh0KS5maW5kKGV4cHIpXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5jb25zdHJ1Y3RvciggY29udGV4dCApLmZpbmQoIHNlbGVjdG9yICk7XG5cdFx0XHR9XG5cblx0XHQvLyBIQU5ETEU6ICQoRE9NRWxlbWVudClcblx0XHR9IGVsc2UgaWYgKCBzZWxlY3Rvci5ub2RlVHlwZSApIHtcblx0XHRcdHRoaXNbIDAgXSA9IHNlbGVjdG9yO1xuXHRcdFx0dGhpcy5sZW5ndGggPSAxO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHQvLyBIQU5ETEU6ICQoZnVuY3Rpb24pXG5cdFx0Ly8gU2hvcnRjdXQgZm9yIGRvY3VtZW50IHJlYWR5XG5cdFx0fSBlbHNlIGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIHNlbGVjdG9yICkgKSB7XG5cdFx0XHRyZXR1cm4gcm9vdC5yZWFkeSAhPT0gdW5kZWZpbmVkID9cblx0XHRcdFx0cm9vdC5yZWFkeSggc2VsZWN0b3IgKSA6XG5cblx0XHRcdFx0Ly8gRXhlY3V0ZSBpbW1lZGlhdGVseSBpZiByZWFkeSBpcyBub3QgcHJlc2VudFxuXHRcdFx0XHRzZWxlY3RvciggalF1ZXJ5ICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGpRdWVyeS5tYWtlQXJyYXkoIHNlbGVjdG9yLCB0aGlzICk7XG5cdH07XG5cbi8vIEdpdmUgdGhlIGluaXQgZnVuY3Rpb24gdGhlIGpRdWVyeSBwcm90b3R5cGUgZm9yIGxhdGVyIGluc3RhbnRpYXRpb25cbmluaXQucHJvdG90eXBlID0galF1ZXJ5LmZuO1xuXG4vLyBJbml0aWFsaXplIGNlbnRyYWwgcmVmZXJlbmNlXG5yb290alF1ZXJ5ID0galF1ZXJ5KCBkb2N1bWVudCApO1xuXG5cbnZhciBycGFyZW50c3ByZXYgPSAvXig/OnBhcmVudHN8cHJldig/OlVudGlsfEFsbCkpLyxcblxuXHQvLyBNZXRob2RzIGd1YXJhbnRlZWQgdG8gcHJvZHVjZSBhIHVuaXF1ZSBzZXQgd2hlbiBzdGFydGluZyBmcm9tIGEgdW5pcXVlIHNldFxuXHRndWFyYW50ZWVkVW5pcXVlID0ge1xuXHRcdGNoaWxkcmVuOiB0cnVlLFxuXHRcdGNvbnRlbnRzOiB0cnVlLFxuXHRcdG5leHQ6IHRydWUsXG5cdFx0cHJldjogdHJ1ZVxuXHR9O1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdGhhczogZnVuY3Rpb24oIHRhcmdldCApIHtcblx0XHR2YXIgdGFyZ2V0cyA9IGpRdWVyeSggdGFyZ2V0LCB0aGlzICksXG5cdFx0XHRsID0gdGFyZ2V0cy5sZW5ndGg7XG5cblx0XHRyZXR1cm4gdGhpcy5maWx0ZXIoIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGkgPSAwO1xuXHRcdFx0Zm9yICggOyBpIDwgbDsgaSsrICkge1xuXHRcdFx0XHRpZiAoIGpRdWVyeS5jb250YWlucyggdGhpcywgdGFyZ2V0c1sgaSBdICkgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9ICk7XG5cdH0sXG5cblx0Y2xvc2VzdDogZnVuY3Rpb24oIHNlbGVjdG9ycywgY29udGV4dCApIHtcblx0XHR2YXIgY3VyLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRsID0gdGhpcy5sZW5ndGgsXG5cdFx0XHRtYXRjaGVkID0gW10sXG5cdFx0XHR0YXJnZXRzID0gdHlwZW9mIHNlbGVjdG9ycyAhPT0gXCJzdHJpbmdcIiAmJiBqUXVlcnkoIHNlbGVjdG9ycyApO1xuXG5cdFx0Ly8gUG9zaXRpb25hbCBzZWxlY3RvcnMgbmV2ZXIgbWF0Y2gsIHNpbmNlIHRoZXJlJ3Mgbm8gX3NlbGVjdGlvbl8gY29udGV4dFxuXHRcdGlmICggIXJuZWVkc0NvbnRleHQudGVzdCggc2VsZWN0b3JzICkgKSB7XG5cdFx0XHRmb3IgKCA7IGkgPCBsOyBpKysgKSB7XG5cdFx0XHRcdGZvciAoIGN1ciA9IHRoaXNbIGkgXTsgY3VyICYmIGN1ciAhPT0gY29udGV4dDsgY3VyID0gY3VyLnBhcmVudE5vZGUgKSB7XG5cblx0XHRcdFx0XHQvLyBBbHdheXMgc2tpcCBkb2N1bWVudCBmcmFnbWVudHNcblx0XHRcdFx0XHRpZiAoIGN1ci5ub2RlVHlwZSA8IDExICYmICggdGFyZ2V0cyA/XG5cdFx0XHRcdFx0XHR0YXJnZXRzLmluZGV4KCBjdXIgKSA+IC0xIDpcblxuXHRcdFx0XHRcdFx0Ly8gRG9uJ3QgcGFzcyBub24tZWxlbWVudHMgdG8gU2l6emxlXG5cdFx0XHRcdFx0XHRjdXIubm9kZVR5cGUgPT09IDEgJiZcblx0XHRcdFx0XHRcdFx0alF1ZXJ5LmZpbmQubWF0Y2hlc1NlbGVjdG9yKCBjdXIsIHNlbGVjdG9ycyApICkgKSB7XG5cblx0XHRcdFx0XHRcdG1hdGNoZWQucHVzaCggY3VyICk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIG1hdGNoZWQubGVuZ3RoID4gMSA/IGpRdWVyeS51bmlxdWVTb3J0KCBtYXRjaGVkICkgOiBtYXRjaGVkICk7XG5cdH0sXG5cblx0Ly8gRGV0ZXJtaW5lIHRoZSBwb3NpdGlvbiBvZiBhbiBlbGVtZW50IHdpdGhpbiB0aGUgc2V0XG5cdGluZGV4OiBmdW5jdGlvbiggZWxlbSApIHtcblxuXHRcdC8vIE5vIGFyZ3VtZW50LCByZXR1cm4gaW5kZXggaW4gcGFyZW50XG5cdFx0aWYgKCAhZWxlbSApIHtcblx0XHRcdHJldHVybiAoIHRoaXNbIDAgXSAmJiB0aGlzWyAwIF0ucGFyZW50Tm9kZSApID8gdGhpcy5maXJzdCgpLnByZXZBbGwoKS5sZW5ndGggOiAtMTtcblx0XHR9XG5cblx0XHQvLyBJbmRleCBpbiBzZWxlY3RvclxuXHRcdGlmICggdHlwZW9mIGVsZW0gPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRyZXR1cm4gaW5kZXhPZi5jYWxsKCBqUXVlcnkoIGVsZW0gKSwgdGhpc1sgMCBdICk7XG5cdFx0fVxuXG5cdFx0Ly8gTG9jYXRlIHRoZSBwb3NpdGlvbiBvZiB0aGUgZGVzaXJlZCBlbGVtZW50XG5cdFx0cmV0dXJuIGluZGV4T2YuY2FsbCggdGhpcyxcblxuXHRcdFx0Ly8gSWYgaXQgcmVjZWl2ZXMgYSBqUXVlcnkgb2JqZWN0LCB0aGUgZmlyc3QgZWxlbWVudCBpcyB1c2VkXG5cdFx0XHRlbGVtLmpxdWVyeSA/IGVsZW1bIDAgXSA6IGVsZW1cblx0XHQpO1xuXHR9LFxuXG5cdGFkZDogZnVuY3Rpb24oIHNlbGVjdG9yLCBjb250ZXh0ICkge1xuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayhcblx0XHRcdGpRdWVyeS51bmlxdWVTb3J0KFxuXHRcdFx0XHRqUXVlcnkubWVyZ2UoIHRoaXMuZ2V0KCksIGpRdWVyeSggc2VsZWN0b3IsIGNvbnRleHQgKSApXG5cdFx0XHQpXG5cdFx0KTtcblx0fSxcblxuXHRhZGRCYWNrOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0cmV0dXJuIHRoaXMuYWRkKCBzZWxlY3RvciA9PSBudWxsID9cblx0XHRcdHRoaXMucHJldk9iamVjdCA6IHRoaXMucHJldk9iamVjdC5maWx0ZXIoIHNlbGVjdG9yIClcblx0XHQpO1xuXHR9XG59ICk7XG5cbmZ1bmN0aW9uIHNpYmxpbmcoIGN1ciwgZGlyICkge1xuXHR3aGlsZSAoICggY3VyID0gY3VyWyBkaXIgXSApICYmIGN1ci5ub2RlVHlwZSAhPT0gMSApIHt9XG5cdHJldHVybiBjdXI7XG59XG5cbmpRdWVyeS5lYWNoKCB7XG5cdHBhcmVudDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0dmFyIHBhcmVudCA9IGVsZW0ucGFyZW50Tm9kZTtcblx0XHRyZXR1cm4gcGFyZW50ICYmIHBhcmVudC5ub2RlVHlwZSAhPT0gMTEgPyBwYXJlbnQgOiBudWxsO1xuXHR9LFxuXHRwYXJlbnRzOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4gZGlyKCBlbGVtLCBcInBhcmVudE5vZGVcIiApO1xuXHR9LFxuXHRwYXJlbnRzVW50aWw6IGZ1bmN0aW9uKCBlbGVtLCBpLCB1bnRpbCApIHtcblx0XHRyZXR1cm4gZGlyKCBlbGVtLCBcInBhcmVudE5vZGVcIiwgdW50aWwgKTtcblx0fSxcblx0bmV4dDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIHNpYmxpbmcoIGVsZW0sIFwibmV4dFNpYmxpbmdcIiApO1xuXHR9LFxuXHRwcmV2OiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4gc2libGluZyggZWxlbSwgXCJwcmV2aW91c1NpYmxpbmdcIiApO1xuXHR9LFxuXHRuZXh0QWxsOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4gZGlyKCBlbGVtLCBcIm5leHRTaWJsaW5nXCIgKTtcblx0fSxcblx0cHJldkFsbDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIGRpciggZWxlbSwgXCJwcmV2aW91c1NpYmxpbmdcIiApO1xuXHR9LFxuXHRuZXh0VW50aWw6IGZ1bmN0aW9uKCBlbGVtLCBpLCB1bnRpbCApIHtcblx0XHRyZXR1cm4gZGlyKCBlbGVtLCBcIm5leHRTaWJsaW5nXCIsIHVudGlsICk7XG5cdH0sXG5cdHByZXZVbnRpbDogZnVuY3Rpb24oIGVsZW0sIGksIHVudGlsICkge1xuXHRcdHJldHVybiBkaXIoIGVsZW0sIFwicHJldmlvdXNTaWJsaW5nXCIsIHVudGlsICk7XG5cdH0sXG5cdHNpYmxpbmdzOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4gc2libGluZ3MoICggZWxlbS5wYXJlbnROb2RlIHx8IHt9ICkuZmlyc3RDaGlsZCwgZWxlbSApO1xuXHR9LFxuXHRjaGlsZHJlbjogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIHNpYmxpbmdzKCBlbGVtLmZpcnN0Q2hpbGQgKTtcblx0fSxcblx0Y29udGVudHM6IGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgICBpZiAoIG5vZGVOYW1lKCBlbGVtLCBcImlmcmFtZVwiICkgKSB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbS5jb250ZW50RG9jdW1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTdXBwb3J0OiBJRSA5IC0gMTEgb25seSwgaU9TIDcgb25seSwgQW5kcm9pZCBCcm93c2VyIDw9NC4zIG9ubHlcbiAgICAgICAgLy8gVHJlYXQgdGhlIHRlbXBsYXRlIGVsZW1lbnQgYXMgYSByZWd1bGFyIG9uZSBpbiBicm93c2VycyB0aGF0XG4gICAgICAgIC8vIGRvbid0IHN1cHBvcnQgaXQuXG4gICAgICAgIGlmICggbm9kZU5hbWUoIGVsZW0sIFwidGVtcGxhdGVcIiApICkge1xuICAgICAgICAgICAgZWxlbSA9IGVsZW0uY29udGVudCB8fCBlbGVtO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGpRdWVyeS5tZXJnZSggW10sIGVsZW0uY2hpbGROb2RlcyApO1xuXHR9XG59LCBmdW5jdGlvbiggbmFtZSwgZm4gKSB7XG5cdGpRdWVyeS5mblsgbmFtZSBdID0gZnVuY3Rpb24oIHVudGlsLCBzZWxlY3RvciApIHtcblx0XHR2YXIgbWF0Y2hlZCA9IGpRdWVyeS5tYXAoIHRoaXMsIGZuLCB1bnRpbCApO1xuXG5cdFx0aWYgKCBuYW1lLnNsaWNlKCAtNSApICE9PSBcIlVudGlsXCIgKSB7XG5cdFx0XHRzZWxlY3RvciA9IHVudGlsO1xuXHRcdH1cblxuXHRcdGlmICggc2VsZWN0b3IgJiYgdHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0bWF0Y2hlZCA9IGpRdWVyeS5maWx0ZXIoIHNlbGVjdG9yLCBtYXRjaGVkICk7XG5cdFx0fVxuXG5cdFx0aWYgKCB0aGlzLmxlbmd0aCA+IDEgKSB7XG5cblx0XHRcdC8vIFJlbW92ZSBkdXBsaWNhdGVzXG5cdFx0XHRpZiAoICFndWFyYW50ZWVkVW5pcXVlWyBuYW1lIF0gKSB7XG5cdFx0XHRcdGpRdWVyeS51bmlxdWVTb3J0KCBtYXRjaGVkICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFJldmVyc2Ugb3JkZXIgZm9yIHBhcmVudHMqIGFuZCBwcmV2LWRlcml2YXRpdmVzXG5cdFx0XHRpZiAoIHJwYXJlbnRzcHJldi50ZXN0KCBuYW1lICkgKSB7XG5cdFx0XHRcdG1hdGNoZWQucmV2ZXJzZSgpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggbWF0Y2hlZCApO1xuXHR9O1xufSApO1xudmFyIHJub3RodG1sd2hpdGUgPSAoIC9bXlxceDIwXFx0XFxyXFxuXFxmXSsvZyApO1xuXG5cblxuLy8gQ29udmVydCBTdHJpbmctZm9ybWF0dGVkIG9wdGlvbnMgaW50byBPYmplY3QtZm9ybWF0dGVkIG9uZXNcbmZ1bmN0aW9uIGNyZWF0ZU9wdGlvbnMoIG9wdGlvbnMgKSB7XG5cdHZhciBvYmplY3QgPSB7fTtcblx0alF1ZXJ5LmVhY2goIG9wdGlvbnMubWF0Y2goIHJub3RodG1sd2hpdGUgKSB8fCBbXSwgZnVuY3Rpb24oIF8sIGZsYWcgKSB7XG5cdFx0b2JqZWN0WyBmbGFnIF0gPSB0cnVlO1xuXHR9ICk7XG5cdHJldHVybiBvYmplY3Q7XG59XG5cbi8qXG4gKiBDcmVhdGUgYSBjYWxsYmFjayBsaXN0IHVzaW5nIHRoZSBmb2xsb3dpbmcgcGFyYW1ldGVyczpcbiAqXG4gKlx0b3B0aW9uczogYW4gb3B0aW9uYWwgbGlzdCBvZiBzcGFjZS1zZXBhcmF0ZWQgb3B0aW9ucyB0aGF0IHdpbGwgY2hhbmdlIGhvd1xuICpcdFx0XHR0aGUgY2FsbGJhY2sgbGlzdCBiZWhhdmVzIG9yIGEgbW9yZSB0cmFkaXRpb25hbCBvcHRpb24gb2JqZWN0XG4gKlxuICogQnkgZGVmYXVsdCBhIGNhbGxiYWNrIGxpc3Qgd2lsbCBhY3QgbGlrZSBhbiBldmVudCBjYWxsYmFjayBsaXN0IGFuZCBjYW4gYmVcbiAqIFwiZmlyZWRcIiBtdWx0aXBsZSB0aW1lcy5cbiAqXG4gKiBQb3NzaWJsZSBvcHRpb25zOlxuICpcbiAqXHRvbmNlOlx0XHRcdHdpbGwgZW5zdXJlIHRoZSBjYWxsYmFjayBsaXN0IGNhbiBvbmx5IGJlIGZpcmVkIG9uY2UgKGxpa2UgYSBEZWZlcnJlZClcbiAqXG4gKlx0bWVtb3J5Olx0XHRcdHdpbGwga2VlcCB0cmFjayBvZiBwcmV2aW91cyB2YWx1ZXMgYW5kIHdpbGwgY2FsbCBhbnkgY2FsbGJhY2sgYWRkZWRcbiAqXHRcdFx0XHRcdGFmdGVyIHRoZSBsaXN0IGhhcyBiZWVuIGZpcmVkIHJpZ2h0IGF3YXkgd2l0aCB0aGUgbGF0ZXN0IFwibWVtb3JpemVkXCJcbiAqXHRcdFx0XHRcdHZhbHVlcyAobGlrZSBhIERlZmVycmVkKVxuICpcbiAqXHR1bmlxdWU6XHRcdFx0d2lsbCBlbnN1cmUgYSBjYWxsYmFjayBjYW4gb25seSBiZSBhZGRlZCBvbmNlIChubyBkdXBsaWNhdGUgaW4gdGhlIGxpc3QpXG4gKlxuICpcdHN0b3BPbkZhbHNlOlx0aW50ZXJydXB0IGNhbGxpbmdzIHdoZW4gYSBjYWxsYmFjayByZXR1cm5zIGZhbHNlXG4gKlxuICovXG5qUXVlcnkuQ2FsbGJhY2tzID0gZnVuY3Rpb24oIG9wdGlvbnMgKSB7XG5cblx0Ly8gQ29udmVydCBvcHRpb25zIGZyb20gU3RyaW5nLWZvcm1hdHRlZCB0byBPYmplY3QtZm9ybWF0dGVkIGlmIG5lZWRlZFxuXHQvLyAod2UgY2hlY2sgaW4gY2FjaGUgZmlyc3QpXG5cdG9wdGlvbnMgPSB0eXBlb2Ygb3B0aW9ucyA9PT0gXCJzdHJpbmdcIiA/XG5cdFx0Y3JlYXRlT3B0aW9ucyggb3B0aW9ucyApIDpcblx0XHRqUXVlcnkuZXh0ZW5kKCB7fSwgb3B0aW9ucyApO1xuXG5cdHZhciAvLyBGbGFnIHRvIGtub3cgaWYgbGlzdCBpcyBjdXJyZW50bHkgZmlyaW5nXG5cdFx0ZmlyaW5nLFxuXG5cdFx0Ly8gTGFzdCBmaXJlIHZhbHVlIGZvciBub24tZm9yZ2V0dGFibGUgbGlzdHNcblx0XHRtZW1vcnksXG5cblx0XHQvLyBGbGFnIHRvIGtub3cgaWYgbGlzdCB3YXMgYWxyZWFkeSBmaXJlZFxuXHRcdGZpcmVkLFxuXG5cdFx0Ly8gRmxhZyB0byBwcmV2ZW50IGZpcmluZ1xuXHRcdGxvY2tlZCxcblxuXHRcdC8vIEFjdHVhbCBjYWxsYmFjayBsaXN0XG5cdFx0bGlzdCA9IFtdLFxuXG5cdFx0Ly8gUXVldWUgb2YgZXhlY3V0aW9uIGRhdGEgZm9yIHJlcGVhdGFibGUgbGlzdHNcblx0XHRxdWV1ZSA9IFtdLFxuXG5cdFx0Ly8gSW5kZXggb2YgY3VycmVudGx5IGZpcmluZyBjYWxsYmFjayAobW9kaWZpZWQgYnkgYWRkL3JlbW92ZSBhcyBuZWVkZWQpXG5cdFx0ZmlyaW5nSW5kZXggPSAtMSxcblxuXHRcdC8vIEZpcmUgY2FsbGJhY2tzXG5cdFx0ZmlyZSA9IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHQvLyBFbmZvcmNlIHNpbmdsZS1maXJpbmdcblx0XHRcdGxvY2tlZCA9IGxvY2tlZCB8fCBvcHRpb25zLm9uY2U7XG5cblx0XHRcdC8vIEV4ZWN1dGUgY2FsbGJhY2tzIGZvciBhbGwgcGVuZGluZyBleGVjdXRpb25zLFxuXHRcdFx0Ly8gcmVzcGVjdGluZyBmaXJpbmdJbmRleCBvdmVycmlkZXMgYW5kIHJ1bnRpbWUgY2hhbmdlc1xuXHRcdFx0ZmlyZWQgPSBmaXJpbmcgPSB0cnVlO1xuXHRcdFx0Zm9yICggOyBxdWV1ZS5sZW5ndGg7IGZpcmluZ0luZGV4ID0gLTEgKSB7XG5cdFx0XHRcdG1lbW9yeSA9IHF1ZXVlLnNoaWZ0KCk7XG5cdFx0XHRcdHdoaWxlICggKytmaXJpbmdJbmRleCA8IGxpc3QubGVuZ3RoICkge1xuXG5cdFx0XHRcdFx0Ly8gUnVuIGNhbGxiYWNrIGFuZCBjaGVjayBmb3IgZWFybHkgdGVybWluYXRpb25cblx0XHRcdFx0XHRpZiAoIGxpc3RbIGZpcmluZ0luZGV4IF0uYXBwbHkoIG1lbW9yeVsgMCBdLCBtZW1vcnlbIDEgXSApID09PSBmYWxzZSAmJlxuXHRcdFx0XHRcdFx0b3B0aW9ucy5zdG9wT25GYWxzZSApIHtcblxuXHRcdFx0XHRcdFx0Ly8gSnVtcCB0byBlbmQgYW5kIGZvcmdldCB0aGUgZGF0YSBzbyAuYWRkIGRvZXNuJ3QgcmUtZmlyZVxuXHRcdFx0XHRcdFx0ZmlyaW5nSW5kZXggPSBsaXN0Lmxlbmd0aDtcblx0XHRcdFx0XHRcdG1lbW9yeSA9IGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBGb3JnZXQgdGhlIGRhdGEgaWYgd2UncmUgZG9uZSB3aXRoIGl0XG5cdFx0XHRpZiAoICFvcHRpb25zLm1lbW9yeSApIHtcblx0XHRcdFx0bWVtb3J5ID0gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdGZpcmluZyA9IGZhbHNlO1xuXG5cdFx0XHQvLyBDbGVhbiB1cCBpZiB3ZSdyZSBkb25lIGZpcmluZyBmb3IgZ29vZFxuXHRcdFx0aWYgKCBsb2NrZWQgKSB7XG5cblx0XHRcdFx0Ly8gS2VlcCBhbiBlbXB0eSBsaXN0IGlmIHdlIGhhdmUgZGF0YSBmb3IgZnV0dXJlIGFkZCBjYWxsc1xuXHRcdFx0XHRpZiAoIG1lbW9yeSApIHtcblx0XHRcdFx0XHRsaXN0ID0gW107XG5cblx0XHRcdFx0Ly8gT3RoZXJ3aXNlLCB0aGlzIG9iamVjdCBpcyBzcGVudFxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGxpc3QgPSBcIlwiO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIEFjdHVhbCBDYWxsYmFja3Mgb2JqZWN0XG5cdFx0c2VsZiA9IHtcblxuXHRcdFx0Ly8gQWRkIGEgY2FsbGJhY2sgb3IgYSBjb2xsZWN0aW9uIG9mIGNhbGxiYWNrcyB0byB0aGUgbGlzdFxuXHRcdFx0YWRkOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKCBsaXN0ICkge1xuXG5cdFx0XHRcdFx0Ly8gSWYgd2UgaGF2ZSBtZW1vcnkgZnJvbSBhIHBhc3QgcnVuLCB3ZSBzaG91bGQgZmlyZSBhZnRlciBhZGRpbmdcblx0XHRcdFx0XHRpZiAoIG1lbW9yeSAmJiAhZmlyaW5nICkge1xuXHRcdFx0XHRcdFx0ZmlyaW5nSW5kZXggPSBsaXN0Lmxlbmd0aCAtIDE7XG5cdFx0XHRcdFx0XHRxdWV1ZS5wdXNoKCBtZW1vcnkgKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQoIGZ1bmN0aW9uIGFkZCggYXJncyApIHtcblx0XHRcdFx0XHRcdGpRdWVyeS5lYWNoKCBhcmdzLCBmdW5jdGlvbiggXywgYXJnICkge1xuXHRcdFx0XHRcdFx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBhcmcgKSApIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoICFvcHRpb25zLnVuaXF1ZSB8fCAhc2VsZi5oYXMoIGFyZyApICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0bGlzdC5wdXNoKCBhcmcgKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoIGFyZyAmJiBhcmcubGVuZ3RoICYmIGpRdWVyeS50eXBlKCBhcmcgKSAhPT0gXCJzdHJpbmdcIiApIHtcblxuXHRcdFx0XHRcdFx0XHRcdC8vIEluc3BlY3QgcmVjdXJzaXZlbHlcblx0XHRcdFx0XHRcdFx0XHRhZGQoIGFyZyApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9ICk7XG5cdFx0XHRcdFx0fSApKCBhcmd1bWVudHMgKTtcblxuXHRcdFx0XHRcdGlmICggbWVtb3J5ICYmICFmaXJpbmcgKSB7XG5cdFx0XHRcdFx0XHRmaXJlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gUmVtb3ZlIGEgY2FsbGJhY2sgZnJvbSB0aGUgbGlzdFxuXHRcdFx0cmVtb3ZlOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0alF1ZXJ5LmVhY2goIGFyZ3VtZW50cywgZnVuY3Rpb24oIF8sIGFyZyApIHtcblx0XHRcdFx0XHR2YXIgaW5kZXg7XG5cdFx0XHRcdFx0d2hpbGUgKCAoIGluZGV4ID0galF1ZXJ5LmluQXJyYXkoIGFyZywgbGlzdCwgaW5kZXggKSApID4gLTEgKSB7XG5cdFx0XHRcdFx0XHRsaXN0LnNwbGljZSggaW5kZXgsIDEgKTtcblxuXHRcdFx0XHRcdFx0Ly8gSGFuZGxlIGZpcmluZyBpbmRleGVzXG5cdFx0XHRcdFx0XHRpZiAoIGluZGV4IDw9IGZpcmluZ0luZGV4ICkge1xuXHRcdFx0XHRcdFx0XHRmaXJpbmdJbmRleC0tO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSApO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cblx0XHRcdC8vIENoZWNrIGlmIGEgZ2l2ZW4gY2FsbGJhY2sgaXMgaW4gdGhlIGxpc3QuXG5cdFx0XHQvLyBJZiBubyBhcmd1bWVudCBpcyBnaXZlbiwgcmV0dXJuIHdoZXRoZXIgb3Igbm90IGxpc3QgaGFzIGNhbGxiYWNrcyBhdHRhY2hlZC5cblx0XHRcdGhhczogZnVuY3Rpb24oIGZuICkge1xuXHRcdFx0XHRyZXR1cm4gZm4gP1xuXHRcdFx0XHRcdGpRdWVyeS5pbkFycmF5KCBmbiwgbGlzdCApID4gLTEgOlxuXHRcdFx0XHRcdGxpc3QubGVuZ3RoID4gMDtcblx0XHRcdH0sXG5cblx0XHRcdC8vIFJlbW92ZSBhbGwgY2FsbGJhY2tzIGZyb20gdGhlIGxpc3Rcblx0XHRcdGVtcHR5OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKCBsaXN0ICkge1xuXHRcdFx0XHRcdGxpc3QgPSBbXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cblx0XHRcdC8vIERpc2FibGUgLmZpcmUgYW5kIC5hZGRcblx0XHRcdC8vIEFib3J0IGFueSBjdXJyZW50L3BlbmRpbmcgZXhlY3V0aW9uc1xuXHRcdFx0Ly8gQ2xlYXIgYWxsIGNhbGxiYWNrcyBhbmQgdmFsdWVzXG5cdFx0XHRkaXNhYmxlOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0bG9ja2VkID0gcXVldWUgPSBbXTtcblx0XHRcdFx0bGlzdCA9IG1lbW9yeSA9IFwiXCI7XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fSxcblx0XHRcdGRpc2FibGVkOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuICFsaXN0O1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gRGlzYWJsZSAuZmlyZVxuXHRcdFx0Ly8gQWxzbyBkaXNhYmxlIC5hZGQgdW5sZXNzIHdlIGhhdmUgbWVtb3J5IChzaW5jZSBpdCB3b3VsZCBoYXZlIG5vIGVmZmVjdClcblx0XHRcdC8vIEFib3J0IGFueSBwZW5kaW5nIGV4ZWN1dGlvbnNcblx0XHRcdGxvY2s6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRsb2NrZWQgPSBxdWV1ZSA9IFtdO1xuXHRcdFx0XHRpZiAoICFtZW1vcnkgJiYgIWZpcmluZyApIHtcblx0XHRcdFx0XHRsaXN0ID0gbWVtb3J5ID0gXCJcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cdFx0XHRsb2NrZWQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gISFsb2NrZWQ7XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBDYWxsIGFsbCBjYWxsYmFja3Mgd2l0aCB0aGUgZ2l2ZW4gY29udGV4dCBhbmQgYXJndW1lbnRzXG5cdFx0XHRmaXJlV2l0aDogZnVuY3Rpb24oIGNvbnRleHQsIGFyZ3MgKSB7XG5cdFx0XHRcdGlmICggIWxvY2tlZCApIHtcblx0XHRcdFx0XHRhcmdzID0gYXJncyB8fCBbXTtcblx0XHRcdFx0XHRhcmdzID0gWyBjb250ZXh0LCBhcmdzLnNsaWNlID8gYXJncy5zbGljZSgpIDogYXJncyBdO1xuXHRcdFx0XHRcdHF1ZXVlLnB1c2goIGFyZ3MgKTtcblx0XHRcdFx0XHRpZiAoICFmaXJpbmcgKSB7XG5cdFx0XHRcdFx0XHRmaXJlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gQ2FsbCBhbGwgdGhlIGNhbGxiYWNrcyB3aXRoIHRoZSBnaXZlbiBhcmd1bWVudHNcblx0XHRcdGZpcmU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRzZWxmLmZpcmVXaXRoKCB0aGlzLCBhcmd1bWVudHMgKTtcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBUbyBrbm93IGlmIHRoZSBjYWxsYmFja3MgaGF2ZSBhbHJlYWR5IGJlZW4gY2FsbGVkIGF0IGxlYXN0IG9uY2Vcblx0XHRcdGZpcmVkOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuICEhZmlyZWQ7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRyZXR1cm4gc2VsZjtcbn07XG5cblxualF1ZXJ5LnJlYWR5RXhjZXB0aW9uID0gZnVuY3Rpb24oIGVycm9yICkge1xuXHR3aW5kb3cuc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG5cdFx0dGhyb3cgZXJyb3I7XG5cdH0gKTtcbn07XG5cblxuXG5cbi8vIE11bHRpZnVuY3Rpb25hbCBtZXRob2QgdG8gZ2V0IGFuZCBzZXQgdmFsdWVzIG9mIGEgY29sbGVjdGlvblxuLy8gVGhlIHZhbHVlL3MgY2FuIG9wdGlvbmFsbHkgYmUgZXhlY3V0ZWQgaWYgaXQncyBhIGZ1bmN0aW9uXG52YXIgYWNjZXNzID0gZnVuY3Rpb24oIGVsZW1zLCBmbiwga2V5LCB2YWx1ZSwgY2hhaW5hYmxlLCBlbXB0eUdldCwgcmF3ICkge1xuXHR2YXIgaSA9IDAsXG5cdFx0bGVuID0gZWxlbXMubGVuZ3RoLFxuXHRcdGJ1bGsgPSBrZXkgPT0gbnVsbDtcblxuXHQvLyBTZXRzIG1hbnkgdmFsdWVzXG5cdGlmICggalF1ZXJ5LnR5cGUoIGtleSApID09PSBcIm9iamVjdFwiICkge1xuXHRcdGNoYWluYWJsZSA9IHRydWU7XG5cdFx0Zm9yICggaSBpbiBrZXkgKSB7XG5cdFx0XHRhY2Nlc3MoIGVsZW1zLCBmbiwgaSwga2V5WyBpIF0sIHRydWUsIGVtcHR5R2V0LCByYXcgKTtcblx0XHR9XG5cblx0Ly8gU2V0cyBvbmUgdmFsdWVcblx0fSBlbHNlIGlmICggdmFsdWUgIT09IHVuZGVmaW5lZCApIHtcblx0XHRjaGFpbmFibGUgPSB0cnVlO1xuXG5cdFx0aWYgKCAhalF1ZXJ5LmlzRnVuY3Rpb24oIHZhbHVlICkgKSB7XG5cdFx0XHRyYXcgPSB0cnVlO1xuXHRcdH1cblxuXHRcdGlmICggYnVsayApIHtcblxuXHRcdFx0Ly8gQnVsayBvcGVyYXRpb25zIHJ1biBhZ2FpbnN0IHRoZSBlbnRpcmUgc2V0XG5cdFx0XHRpZiAoIHJhdyApIHtcblx0XHRcdFx0Zm4uY2FsbCggZWxlbXMsIHZhbHVlICk7XG5cdFx0XHRcdGZuID0gbnVsbDtcblxuXHRcdFx0Ly8gLi4uZXhjZXB0IHdoZW4gZXhlY3V0aW5nIGZ1bmN0aW9uIHZhbHVlc1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0YnVsayA9IGZuO1xuXHRcdFx0XHRmbiA9IGZ1bmN0aW9uKCBlbGVtLCBrZXksIHZhbHVlICkge1xuXHRcdFx0XHRcdHJldHVybiBidWxrLmNhbGwoIGpRdWVyeSggZWxlbSApLCB2YWx1ZSApO1xuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICggZm4gKSB7XG5cdFx0XHRmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRcdFx0Zm4oXG5cdFx0XHRcdFx0ZWxlbXNbIGkgXSwga2V5LCByYXcgP1xuXHRcdFx0XHRcdHZhbHVlIDpcblx0XHRcdFx0XHR2YWx1ZS5jYWxsKCBlbGVtc1sgaSBdLCBpLCBmbiggZWxlbXNbIGkgXSwga2V5ICkgKVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGlmICggY2hhaW5hYmxlICkge1xuXHRcdHJldHVybiBlbGVtcztcblx0fVxuXG5cdC8vIEdldHNcblx0aWYgKCBidWxrICkge1xuXHRcdHJldHVybiBmbi5jYWxsKCBlbGVtcyApO1xuXHR9XG5cblx0cmV0dXJuIGxlbiA/IGZuKCBlbGVtc1sgMCBdLCBrZXkgKSA6IGVtcHR5R2V0O1xufTtcbnZhciBhY2NlcHREYXRhID0gZnVuY3Rpb24oIG93bmVyICkge1xuXG5cdC8vIEFjY2VwdHMgb25seTpcblx0Ly8gIC0gTm9kZVxuXHQvLyAgICAtIE5vZGUuRUxFTUVOVF9OT0RFXG5cdC8vICAgIC0gTm9kZS5ET0NVTUVOVF9OT0RFXG5cdC8vICAtIE9iamVjdFxuXHQvLyAgICAtIEFueVxuXHRyZXR1cm4gb3duZXIubm9kZVR5cGUgPT09IDEgfHwgb3duZXIubm9kZVR5cGUgPT09IDkgfHwgISggK293bmVyLm5vZGVUeXBlICk7XG59O1xuXG5cblxuXG5mdW5jdGlvbiBEYXRhKCkge1xuXHR0aGlzLmV4cGFuZG8gPSBqUXVlcnkuZXhwYW5kbyArIERhdGEudWlkKys7XG59XG5cbkRhdGEudWlkID0gMTtcblxuRGF0YS5wcm90b3R5cGUgPSB7XG5cblx0Y2FjaGU6IGZ1bmN0aW9uKCBvd25lciApIHtcblxuXHRcdC8vIENoZWNrIGlmIHRoZSBvd25lciBvYmplY3QgYWxyZWFkeSBoYXMgYSBjYWNoZVxuXHRcdHZhciB2YWx1ZSA9IG93bmVyWyB0aGlzLmV4cGFuZG8gXTtcblxuXHRcdC8vIElmIG5vdCwgY3JlYXRlIG9uZVxuXHRcdGlmICggIXZhbHVlICkge1xuXHRcdFx0dmFsdWUgPSB7fTtcblxuXHRcdFx0Ly8gV2UgY2FuIGFjY2VwdCBkYXRhIGZvciBub24tZWxlbWVudCBub2RlcyBpbiBtb2Rlcm4gYnJvd3NlcnMsXG5cdFx0XHQvLyBidXQgd2Ugc2hvdWxkIG5vdCwgc2VlICM4MzM1LlxuXHRcdFx0Ly8gQWx3YXlzIHJldHVybiBhbiBlbXB0eSBvYmplY3QuXG5cdFx0XHRpZiAoIGFjY2VwdERhdGEoIG93bmVyICkgKSB7XG5cblx0XHRcdFx0Ly8gSWYgaXQgaXMgYSBub2RlIHVubGlrZWx5IHRvIGJlIHN0cmluZ2lmeS1lZCBvciBsb29wZWQgb3ZlclxuXHRcdFx0XHQvLyB1c2UgcGxhaW4gYXNzaWdubWVudFxuXHRcdFx0XHRpZiAoIG93bmVyLm5vZGVUeXBlICkge1xuXHRcdFx0XHRcdG93bmVyWyB0aGlzLmV4cGFuZG8gXSA9IHZhbHVlO1xuXG5cdFx0XHRcdC8vIE90aGVyd2lzZSBzZWN1cmUgaXQgaW4gYSBub24tZW51bWVyYWJsZSBwcm9wZXJ0eVxuXHRcdFx0XHQvLyBjb25maWd1cmFibGUgbXVzdCBiZSB0cnVlIHRvIGFsbG93IHRoZSBwcm9wZXJ0eSB0byBiZVxuXHRcdFx0XHQvLyBkZWxldGVkIHdoZW4gZGF0YSBpcyByZW1vdmVkXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KCBvd25lciwgdGhpcy5leHBhbmRvLCB7XG5cdFx0XHRcdFx0XHR2YWx1ZTogdmFsdWUsXG5cdFx0XHRcdFx0XHRjb25maWd1cmFibGU6IHRydWVcblx0XHRcdFx0XHR9ICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdmFsdWU7XG5cdH0sXG5cdHNldDogZnVuY3Rpb24oIG93bmVyLCBkYXRhLCB2YWx1ZSApIHtcblx0XHR2YXIgcHJvcCxcblx0XHRcdGNhY2hlID0gdGhpcy5jYWNoZSggb3duZXIgKTtcblxuXHRcdC8vIEhhbmRsZTogWyBvd25lciwga2V5LCB2YWx1ZSBdIGFyZ3Ncblx0XHQvLyBBbHdheXMgdXNlIGNhbWVsQ2FzZSBrZXkgKGdoLTIyNTcpXG5cdFx0aWYgKCB0eXBlb2YgZGF0YSA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdGNhY2hlWyBqUXVlcnkuY2FtZWxDYXNlKCBkYXRhICkgXSA9IHZhbHVlO1xuXG5cdFx0Ly8gSGFuZGxlOiBbIG93bmVyLCB7IHByb3BlcnRpZXMgfSBdIGFyZ3Ncblx0XHR9IGVsc2Uge1xuXG5cdFx0XHQvLyBDb3B5IHRoZSBwcm9wZXJ0aWVzIG9uZS1ieS1vbmUgdG8gdGhlIGNhY2hlIG9iamVjdFxuXHRcdFx0Zm9yICggcHJvcCBpbiBkYXRhICkge1xuXHRcdFx0XHRjYWNoZVsgalF1ZXJ5LmNhbWVsQ2FzZSggcHJvcCApIF0gPSBkYXRhWyBwcm9wIF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBjYWNoZTtcblx0fSxcblx0Z2V0OiBmdW5jdGlvbiggb3duZXIsIGtleSApIHtcblx0XHRyZXR1cm4ga2V5ID09PSB1bmRlZmluZWQgP1xuXHRcdFx0dGhpcy5jYWNoZSggb3duZXIgKSA6XG5cblx0XHRcdC8vIEFsd2F5cyB1c2UgY2FtZWxDYXNlIGtleSAoZ2gtMjI1Nylcblx0XHRcdG93bmVyWyB0aGlzLmV4cGFuZG8gXSAmJiBvd25lclsgdGhpcy5leHBhbmRvIF1bIGpRdWVyeS5jYW1lbENhc2UoIGtleSApIF07XG5cdH0sXG5cdGFjY2VzczogZnVuY3Rpb24oIG93bmVyLCBrZXksIHZhbHVlICkge1xuXG5cdFx0Ly8gSW4gY2FzZXMgd2hlcmUgZWl0aGVyOlxuXHRcdC8vXG5cdFx0Ly8gICAxLiBObyBrZXkgd2FzIHNwZWNpZmllZFxuXHRcdC8vICAgMi4gQSBzdHJpbmcga2V5IHdhcyBzcGVjaWZpZWQsIGJ1dCBubyB2YWx1ZSBwcm92aWRlZFxuXHRcdC8vXG5cdFx0Ly8gVGFrZSB0aGUgXCJyZWFkXCIgcGF0aCBhbmQgYWxsb3cgdGhlIGdldCBtZXRob2QgdG8gZGV0ZXJtaW5lXG5cdFx0Ly8gd2hpY2ggdmFsdWUgdG8gcmV0dXJuLCByZXNwZWN0aXZlbHkgZWl0aGVyOlxuXHRcdC8vXG5cdFx0Ly8gICAxLiBUaGUgZW50aXJlIGNhY2hlIG9iamVjdFxuXHRcdC8vICAgMi4gVGhlIGRhdGEgc3RvcmVkIGF0IHRoZSBrZXlcblx0XHQvL1xuXHRcdGlmICgga2V5ID09PSB1bmRlZmluZWQgfHxcblx0XHRcdFx0KCAoIGtleSAmJiB0eXBlb2Yga2V5ID09PSBcInN0cmluZ1wiICkgJiYgdmFsdWUgPT09IHVuZGVmaW5lZCApICkge1xuXG5cdFx0XHRyZXR1cm4gdGhpcy5nZXQoIG93bmVyLCBrZXkgKTtcblx0XHR9XG5cblx0XHQvLyBXaGVuIHRoZSBrZXkgaXMgbm90IGEgc3RyaW5nLCBvciBib3RoIGEga2V5IGFuZCB2YWx1ZVxuXHRcdC8vIGFyZSBzcGVjaWZpZWQsIHNldCBvciBleHRlbmQgKGV4aXN0aW5nIG9iamVjdHMpIHdpdGggZWl0aGVyOlxuXHRcdC8vXG5cdFx0Ly8gICAxLiBBbiBvYmplY3Qgb2YgcHJvcGVydGllc1xuXHRcdC8vICAgMi4gQSBrZXkgYW5kIHZhbHVlXG5cdFx0Ly9cblx0XHR0aGlzLnNldCggb3duZXIsIGtleSwgdmFsdWUgKTtcblxuXHRcdC8vIFNpbmNlIHRoZSBcInNldFwiIHBhdGggY2FuIGhhdmUgdHdvIHBvc3NpYmxlIGVudHJ5IHBvaW50c1xuXHRcdC8vIHJldHVybiB0aGUgZXhwZWN0ZWQgZGF0YSBiYXNlZCBvbiB3aGljaCBwYXRoIHdhcyB0YWtlblsqXVxuXHRcdHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdmFsdWUgOiBrZXk7XG5cdH0sXG5cdHJlbW92ZTogZnVuY3Rpb24oIG93bmVyLCBrZXkgKSB7XG5cdFx0dmFyIGksXG5cdFx0XHRjYWNoZSA9IG93bmVyWyB0aGlzLmV4cGFuZG8gXTtcblxuXHRcdGlmICggY2FjaGUgPT09IHVuZGVmaW5lZCApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAoIGtleSAhPT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHQvLyBTdXBwb3J0IGFycmF5IG9yIHNwYWNlIHNlcGFyYXRlZCBzdHJpbmcgb2Yga2V5c1xuXHRcdFx0aWYgKCBBcnJheS5pc0FycmF5KCBrZXkgKSApIHtcblxuXHRcdFx0XHQvLyBJZiBrZXkgaXMgYW4gYXJyYXkgb2Yga2V5cy4uLlxuXHRcdFx0XHQvLyBXZSBhbHdheXMgc2V0IGNhbWVsQ2FzZSBrZXlzLCBzbyByZW1vdmUgdGhhdC5cblx0XHRcdFx0a2V5ID0ga2V5Lm1hcCggalF1ZXJ5LmNhbWVsQ2FzZSApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0a2V5ID0galF1ZXJ5LmNhbWVsQ2FzZSgga2V5ICk7XG5cblx0XHRcdFx0Ly8gSWYgYSBrZXkgd2l0aCB0aGUgc3BhY2VzIGV4aXN0cywgdXNlIGl0LlxuXHRcdFx0XHQvLyBPdGhlcndpc2UsIGNyZWF0ZSBhbiBhcnJheSBieSBtYXRjaGluZyBub24td2hpdGVzcGFjZVxuXHRcdFx0XHRrZXkgPSBrZXkgaW4gY2FjaGUgP1xuXHRcdFx0XHRcdFsga2V5IF0gOlxuXHRcdFx0XHRcdCgga2V5Lm1hdGNoKCBybm90aHRtbHdoaXRlICkgfHwgW10gKTtcblx0XHRcdH1cblxuXHRcdFx0aSA9IGtleS5sZW5ndGg7XG5cblx0XHRcdHdoaWxlICggaS0tICkge1xuXHRcdFx0XHRkZWxldGUgY2FjaGVbIGtleVsgaSBdIF07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gUmVtb3ZlIHRoZSBleHBhbmRvIGlmIHRoZXJlJ3Mgbm8gbW9yZSBkYXRhXG5cdFx0aWYgKCBrZXkgPT09IHVuZGVmaW5lZCB8fCBqUXVlcnkuaXNFbXB0eU9iamVjdCggY2FjaGUgKSApIHtcblxuXHRcdFx0Ly8gU3VwcG9ydDogQ2hyb21lIDw9MzUgLSA0NVxuXHRcdFx0Ly8gV2Via2l0ICYgQmxpbmsgcGVyZm9ybWFuY2Ugc3VmZmVycyB3aGVuIGRlbGV0aW5nIHByb3BlcnRpZXNcblx0XHRcdC8vIGZyb20gRE9NIG5vZGVzLCBzbyBzZXQgdG8gdW5kZWZpbmVkIGluc3RlYWRcblx0XHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTM3ODYwNyAoYnVnIHJlc3RyaWN0ZWQpXG5cdFx0XHRpZiAoIG93bmVyLm5vZGVUeXBlICkge1xuXHRcdFx0XHRvd25lclsgdGhpcy5leHBhbmRvIF0gPSB1bmRlZmluZWQ7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkZWxldGUgb3duZXJbIHRoaXMuZXhwYW5kbyBdO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0aGFzRGF0YTogZnVuY3Rpb24oIG93bmVyICkge1xuXHRcdHZhciBjYWNoZSA9IG93bmVyWyB0aGlzLmV4cGFuZG8gXTtcblx0XHRyZXR1cm4gY2FjaGUgIT09IHVuZGVmaW5lZCAmJiAhalF1ZXJ5LmlzRW1wdHlPYmplY3QoIGNhY2hlICk7XG5cdH1cbn07XG52YXIgZGF0YVByaXYgPSBuZXcgRGF0YSgpO1xuXG52YXIgZGF0YVVzZXIgPSBuZXcgRGF0YSgpO1xuXG5cblxuLy9cdEltcGxlbWVudGF0aW9uIFN1bW1hcnlcbi8vXG4vL1x0MS4gRW5mb3JjZSBBUEkgc3VyZmFjZSBhbmQgc2VtYW50aWMgY29tcGF0aWJpbGl0eSB3aXRoIDEuOS54IGJyYW5jaFxuLy9cdDIuIEltcHJvdmUgdGhlIG1vZHVsZSdzIG1haW50YWluYWJpbGl0eSBieSByZWR1Y2luZyB0aGUgc3RvcmFnZVxuLy9cdFx0cGF0aHMgdG8gYSBzaW5nbGUgbWVjaGFuaXNtLlxuLy9cdDMuIFVzZSB0aGUgc2FtZSBzaW5nbGUgbWVjaGFuaXNtIHRvIHN1cHBvcnQgXCJwcml2YXRlXCIgYW5kIFwidXNlclwiIGRhdGEuXG4vL1x0NC4gX05ldmVyXyBleHBvc2UgXCJwcml2YXRlXCIgZGF0YSB0byB1c2VyIGNvZGUgKFRPRE86IERyb3AgX2RhdGEsIF9yZW1vdmVEYXRhKVxuLy9cdDUuIEF2b2lkIGV4cG9zaW5nIGltcGxlbWVudGF0aW9uIGRldGFpbHMgb24gdXNlciBvYmplY3RzIChlZy4gZXhwYW5kbyBwcm9wZXJ0aWVzKVxuLy9cdDYuIFByb3ZpZGUgYSBjbGVhciBwYXRoIGZvciBpbXBsZW1lbnRhdGlvbiB1cGdyYWRlIHRvIFdlYWtNYXAgaW4gMjAxNFxuXG52YXIgcmJyYWNlID0gL14oPzpcXHtbXFx3XFxXXSpcXH18XFxbW1xcd1xcV10qXFxdKSQvLFxuXHRybXVsdGlEYXNoID0gL1tBLVpdL2c7XG5cbmZ1bmN0aW9uIGdldERhdGEoIGRhdGEgKSB7XG5cdGlmICggZGF0YSA9PT0gXCJ0cnVlXCIgKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHRpZiAoIGRhdGEgPT09IFwiZmFsc2VcIiApIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRpZiAoIGRhdGEgPT09IFwibnVsbFwiICkge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0Ly8gT25seSBjb252ZXJ0IHRvIGEgbnVtYmVyIGlmIGl0IGRvZXNuJ3QgY2hhbmdlIHRoZSBzdHJpbmdcblx0aWYgKCBkYXRhID09PSArZGF0YSArIFwiXCIgKSB7XG5cdFx0cmV0dXJuICtkYXRhO1xuXHR9XG5cblx0aWYgKCByYnJhY2UudGVzdCggZGF0YSApICkge1xuXHRcdHJldHVybiBKU09OLnBhcnNlKCBkYXRhICk7XG5cdH1cblxuXHRyZXR1cm4gZGF0YTtcbn1cblxuZnVuY3Rpb24gZGF0YUF0dHIoIGVsZW0sIGtleSwgZGF0YSApIHtcblx0dmFyIG5hbWU7XG5cblx0Ly8gSWYgbm90aGluZyB3YXMgZm91bmQgaW50ZXJuYWxseSwgdHJ5IHRvIGZldGNoIGFueVxuXHQvLyBkYXRhIGZyb20gdGhlIEhUTUw1IGRhdGEtKiBhdHRyaWJ1dGVcblx0aWYgKCBkYXRhID09PSB1bmRlZmluZWQgJiYgZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcblx0XHRuYW1lID0gXCJkYXRhLVwiICsga2V5LnJlcGxhY2UoIHJtdWx0aURhc2gsIFwiLSQmXCIgKS50b0xvd2VyQ2FzZSgpO1xuXHRcdGRhdGEgPSBlbGVtLmdldEF0dHJpYnV0ZSggbmFtZSApO1xuXG5cdFx0aWYgKCB0eXBlb2YgZGF0YSA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGRhdGEgPSBnZXREYXRhKCBkYXRhICk7XG5cdFx0XHR9IGNhdGNoICggZSApIHt9XG5cblx0XHRcdC8vIE1ha2Ugc3VyZSB3ZSBzZXQgdGhlIGRhdGEgc28gaXQgaXNuJ3QgY2hhbmdlZCBsYXRlclxuXHRcdFx0ZGF0YVVzZXIuc2V0KCBlbGVtLCBrZXksIGRhdGEgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGF0YSA9IHVuZGVmaW5lZDtcblx0XHR9XG5cdH1cblx0cmV0dXJuIGRhdGE7XG59XG5cbmpRdWVyeS5leHRlbmQoIHtcblx0aGFzRGF0YTogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIGRhdGFVc2VyLmhhc0RhdGEoIGVsZW0gKSB8fCBkYXRhUHJpdi5oYXNEYXRhKCBlbGVtICk7XG5cdH0sXG5cblx0ZGF0YTogZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGRhdGEgKSB7XG5cdFx0cmV0dXJuIGRhdGFVc2VyLmFjY2VzcyggZWxlbSwgbmFtZSwgZGF0YSApO1xuXHR9LFxuXG5cdHJlbW92ZURhdGE6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lICkge1xuXHRcdGRhdGFVc2VyLnJlbW92ZSggZWxlbSwgbmFtZSApO1xuXHR9LFxuXG5cdC8vIFRPRE86IE5vdyB0aGF0IGFsbCBjYWxscyB0byBfZGF0YSBhbmQgX3JlbW92ZURhdGEgaGF2ZSBiZWVuIHJlcGxhY2VkXG5cdC8vIHdpdGggZGlyZWN0IGNhbGxzIHRvIGRhdGFQcml2IG1ldGhvZHMsIHRoZXNlIGNhbiBiZSBkZXByZWNhdGVkLlxuXHRfZGF0YTogZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGRhdGEgKSB7XG5cdFx0cmV0dXJuIGRhdGFQcml2LmFjY2VzcyggZWxlbSwgbmFtZSwgZGF0YSApO1xuXHR9LFxuXG5cdF9yZW1vdmVEYXRhOiBmdW5jdGlvbiggZWxlbSwgbmFtZSApIHtcblx0XHRkYXRhUHJpdi5yZW1vdmUoIGVsZW0sIG5hbWUgKTtcblx0fVxufSApO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdGRhdGE6IGZ1bmN0aW9uKCBrZXksIHZhbHVlICkge1xuXHRcdHZhciBpLCBuYW1lLCBkYXRhLFxuXHRcdFx0ZWxlbSA9IHRoaXNbIDAgXSxcblx0XHRcdGF0dHJzID0gZWxlbSAmJiBlbGVtLmF0dHJpYnV0ZXM7XG5cblx0XHQvLyBHZXRzIGFsbCB2YWx1ZXNcblx0XHRpZiAoIGtleSA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0aWYgKCB0aGlzLmxlbmd0aCApIHtcblx0XHRcdFx0ZGF0YSA9IGRhdGFVc2VyLmdldCggZWxlbSApO1xuXG5cdFx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSAmJiAhZGF0YVByaXYuZ2V0KCBlbGVtLCBcImhhc0RhdGFBdHRyc1wiICkgKSB7XG5cdFx0XHRcdFx0aSA9IGF0dHJzLmxlbmd0aDtcblx0XHRcdFx0XHR3aGlsZSAoIGktLSApIHtcblxuXHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogSUUgMTEgb25seVxuXHRcdFx0XHRcdFx0Ly8gVGhlIGF0dHJzIGVsZW1lbnRzIGNhbiBiZSBudWxsICgjMTQ4OTQpXG5cdFx0XHRcdFx0XHRpZiAoIGF0dHJzWyBpIF0gKSB7XG5cdFx0XHRcdFx0XHRcdG5hbWUgPSBhdHRyc1sgaSBdLm5hbWU7XG5cdFx0XHRcdFx0XHRcdGlmICggbmFtZS5pbmRleE9mKCBcImRhdGEtXCIgKSA9PT0gMCApIHtcblx0XHRcdFx0XHRcdFx0XHRuYW1lID0galF1ZXJ5LmNhbWVsQ2FzZSggbmFtZS5zbGljZSggNSApICk7XG5cdFx0XHRcdFx0XHRcdFx0ZGF0YUF0dHIoIGVsZW0sIG5hbWUsIGRhdGFbIG5hbWUgXSApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGRhdGFQcml2LnNldCggZWxlbSwgXCJoYXNEYXRhQXR0cnNcIiwgdHJ1ZSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH1cblxuXHRcdC8vIFNldHMgbXVsdGlwbGUgdmFsdWVzXG5cdFx0aWYgKCB0eXBlb2Yga2V5ID09PSBcIm9iamVjdFwiICkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGRhdGFVc2VyLnNldCggdGhpcywga2V5ICk7XG5cdFx0XHR9ICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGFjY2VzcyggdGhpcywgZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdFx0dmFyIGRhdGE7XG5cblx0XHRcdC8vIFRoZSBjYWxsaW5nIGpRdWVyeSBvYmplY3QgKGVsZW1lbnQgbWF0Y2hlcykgaXMgbm90IGVtcHR5XG5cdFx0XHQvLyAoYW5kIHRoZXJlZm9yZSBoYXMgYW4gZWxlbWVudCBhcHBlYXJzIGF0IHRoaXNbIDAgXSkgYW5kIHRoZVxuXHRcdFx0Ly8gYHZhbHVlYCBwYXJhbWV0ZXIgd2FzIG5vdCB1bmRlZmluZWQuIEFuIGVtcHR5IGpRdWVyeSBvYmplY3Rcblx0XHRcdC8vIHdpbGwgcmVzdWx0IGluIGB1bmRlZmluZWRgIGZvciBlbGVtID0gdGhpc1sgMCBdIHdoaWNoIHdpbGxcblx0XHRcdC8vIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhbiBhdHRlbXB0IHRvIHJlYWQgYSBkYXRhIGNhY2hlIGlzIG1hZGUuXG5cdFx0XHRpZiAoIGVsZW0gJiYgdmFsdWUgPT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0XHQvLyBBdHRlbXB0IHRvIGdldCBkYXRhIGZyb20gdGhlIGNhY2hlXG5cdFx0XHRcdC8vIFRoZSBrZXkgd2lsbCBhbHdheXMgYmUgY2FtZWxDYXNlZCBpbiBEYXRhXG5cdFx0XHRcdGRhdGEgPSBkYXRhVXNlci5nZXQoIGVsZW0sIGtleSApO1xuXHRcdFx0XHRpZiAoIGRhdGEgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHRyZXR1cm4gZGF0YTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEF0dGVtcHQgdG8gXCJkaXNjb3ZlclwiIHRoZSBkYXRhIGluXG5cdFx0XHRcdC8vIEhUTUw1IGN1c3RvbSBkYXRhLSogYXR0cnNcblx0XHRcdFx0ZGF0YSA9IGRhdGFBdHRyKCBlbGVtLCBrZXkgKTtcblx0XHRcdFx0aWYgKCBkYXRhICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGRhdGE7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBXZSB0cmllZCByZWFsbHkgaGFyZCwgYnV0IHRoZSBkYXRhIGRvZXNuJ3QgZXhpc3QuXG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU2V0IHRoZSBkYXRhLi4uXG5cdFx0XHR0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdC8vIFdlIGFsd2F5cyBzdG9yZSB0aGUgY2FtZWxDYXNlZCBrZXlcblx0XHRcdFx0ZGF0YVVzZXIuc2V0KCB0aGlzLCBrZXksIHZhbHVlICk7XG5cdFx0XHR9ICk7XG5cdFx0fSwgbnVsbCwgdmFsdWUsIGFyZ3VtZW50cy5sZW5ndGggPiAxLCBudWxsLCB0cnVlICk7XG5cdH0sXG5cblx0cmVtb3ZlRGF0YTogZnVuY3Rpb24oIGtleSApIHtcblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdGRhdGFVc2VyLnJlbW92ZSggdGhpcywga2V5ICk7XG5cdFx0fSApO1xuXHR9XG59ICk7XG52YXIgcG51bSA9ICggL1srLV0/KD86XFxkKlxcLnwpXFxkKyg/OltlRV1bKy1dP1xcZCt8KS8gKS5zb3VyY2U7XG5cbnZhciByY3NzTnVtID0gbmV3IFJlZ0V4cCggXCJeKD86KFsrLV0pPXwpKFwiICsgcG51bSArIFwiKShbYS16JV0qKSRcIiwgXCJpXCIgKTtcblxuXG52YXIgY3NzRXhwYW5kID0gWyBcIlRvcFwiLCBcIlJpZ2h0XCIsIFwiQm90dG9tXCIsIFwiTGVmdFwiIF07XG5cbnZhciBpc0hpZGRlbldpdGhpblRyZWUgPSBmdW5jdGlvbiggZWxlbSwgZWwgKSB7XG5cblx0XHQvLyBpc0hpZGRlbldpdGhpblRyZWUgbWlnaHQgYmUgY2FsbGVkIGZyb20galF1ZXJ5I2ZpbHRlciBmdW5jdGlvbjtcblx0XHQvLyBpbiB0aGF0IGNhc2UsIGVsZW1lbnQgd2lsbCBiZSBzZWNvbmQgYXJndW1lbnRcblx0XHRlbGVtID0gZWwgfHwgZWxlbTtcblxuXHRcdC8vIElubGluZSBzdHlsZSB0cnVtcHMgYWxsXG5cdFx0cmV0dXJuIGVsZW0uc3R5bGUuZGlzcGxheSA9PT0gXCJub25lXCIgfHxcblx0XHRcdGVsZW0uc3R5bGUuZGlzcGxheSA9PT0gXCJcIiAmJlxuXG5cdFx0XHQvLyBPdGhlcndpc2UsIGNoZWNrIGNvbXB1dGVkIHN0eWxlXG5cdFx0XHQvLyBTdXBwb3J0OiBGaXJlZm94IDw9NDMgLSA0NVxuXHRcdFx0Ly8gRGlzY29ubmVjdGVkIGVsZW1lbnRzIGNhbiBoYXZlIGNvbXB1dGVkIGRpc3BsYXk6IG5vbmUsIHNvIGZpcnN0IGNvbmZpcm0gdGhhdCBlbGVtIGlzXG5cdFx0XHQvLyBpbiB0aGUgZG9jdW1lbnQuXG5cdFx0XHRqUXVlcnkuY29udGFpbnMoIGVsZW0ub3duZXJEb2N1bWVudCwgZWxlbSApICYmXG5cblx0XHRcdGpRdWVyeS5jc3MoIGVsZW0sIFwiZGlzcGxheVwiICkgPT09IFwibm9uZVwiO1xuXHR9O1xuXG52YXIgc3dhcCA9IGZ1bmN0aW9uKCBlbGVtLCBvcHRpb25zLCBjYWxsYmFjaywgYXJncyApIHtcblx0dmFyIHJldCwgbmFtZSxcblx0XHRvbGQgPSB7fTtcblxuXHQvLyBSZW1lbWJlciB0aGUgb2xkIHZhbHVlcywgYW5kIGluc2VydCB0aGUgbmV3IG9uZXNcblx0Zm9yICggbmFtZSBpbiBvcHRpb25zICkge1xuXHRcdG9sZFsgbmFtZSBdID0gZWxlbS5zdHlsZVsgbmFtZSBdO1xuXHRcdGVsZW0uc3R5bGVbIG5hbWUgXSA9IG9wdGlvbnNbIG5hbWUgXTtcblx0fVxuXG5cdHJldCA9IGNhbGxiYWNrLmFwcGx5KCBlbGVtLCBhcmdzIHx8IFtdICk7XG5cblx0Ly8gUmV2ZXJ0IHRoZSBvbGQgdmFsdWVzXG5cdGZvciAoIG5hbWUgaW4gb3B0aW9ucyApIHtcblx0XHRlbGVtLnN0eWxlWyBuYW1lIF0gPSBvbGRbIG5hbWUgXTtcblx0fVxuXG5cdHJldHVybiByZXQ7XG59O1xuXG5cblxuXG5mdW5jdGlvbiBhZGp1c3RDU1MoIGVsZW0sIHByb3AsIHZhbHVlUGFydHMsIHR3ZWVuICkge1xuXHR2YXIgYWRqdXN0ZWQsXG5cdFx0c2NhbGUgPSAxLFxuXHRcdG1heEl0ZXJhdGlvbnMgPSAyMCxcblx0XHRjdXJyZW50VmFsdWUgPSB0d2VlbiA/XG5cdFx0XHRmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIHR3ZWVuLmN1cigpO1xuXHRcdFx0fSA6XG5cdFx0XHRmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIGpRdWVyeS5jc3MoIGVsZW0sIHByb3AsIFwiXCIgKTtcblx0XHRcdH0sXG5cdFx0aW5pdGlhbCA9IGN1cnJlbnRWYWx1ZSgpLFxuXHRcdHVuaXQgPSB2YWx1ZVBhcnRzICYmIHZhbHVlUGFydHNbIDMgXSB8fCAoIGpRdWVyeS5jc3NOdW1iZXJbIHByb3AgXSA/IFwiXCIgOiBcInB4XCIgKSxcblxuXHRcdC8vIFN0YXJ0aW5nIHZhbHVlIGNvbXB1dGF0aW9uIGlzIHJlcXVpcmVkIGZvciBwb3RlbnRpYWwgdW5pdCBtaXNtYXRjaGVzXG5cdFx0aW5pdGlhbEluVW5pdCA9ICggalF1ZXJ5LmNzc051bWJlclsgcHJvcCBdIHx8IHVuaXQgIT09IFwicHhcIiAmJiAraW5pdGlhbCApICYmXG5cdFx0XHRyY3NzTnVtLmV4ZWMoIGpRdWVyeS5jc3MoIGVsZW0sIHByb3AgKSApO1xuXG5cdGlmICggaW5pdGlhbEluVW5pdCAmJiBpbml0aWFsSW5Vbml0WyAzIF0gIT09IHVuaXQgKSB7XG5cblx0XHQvLyBUcnVzdCB1bml0cyByZXBvcnRlZCBieSBqUXVlcnkuY3NzXG5cdFx0dW5pdCA9IHVuaXQgfHwgaW5pdGlhbEluVW5pdFsgMyBdO1xuXG5cdFx0Ly8gTWFrZSBzdXJlIHdlIHVwZGF0ZSB0aGUgdHdlZW4gcHJvcGVydGllcyBsYXRlciBvblxuXHRcdHZhbHVlUGFydHMgPSB2YWx1ZVBhcnRzIHx8IFtdO1xuXG5cdFx0Ly8gSXRlcmF0aXZlbHkgYXBwcm94aW1hdGUgZnJvbSBhIG5vbnplcm8gc3RhcnRpbmcgcG9pbnRcblx0XHRpbml0aWFsSW5Vbml0ID0gK2luaXRpYWwgfHwgMTtcblxuXHRcdGRvIHtcblxuXHRcdFx0Ly8gSWYgcHJldmlvdXMgaXRlcmF0aW9uIHplcm9lZCBvdXQsIGRvdWJsZSB1bnRpbCB3ZSBnZXQgKnNvbWV0aGluZyouXG5cdFx0XHQvLyBVc2Ugc3RyaW5nIGZvciBkb3VibGluZyBzbyB3ZSBkb24ndCBhY2NpZGVudGFsbHkgc2VlIHNjYWxlIGFzIHVuY2hhbmdlZCBiZWxvd1xuXHRcdFx0c2NhbGUgPSBzY2FsZSB8fCBcIi41XCI7XG5cblx0XHRcdC8vIEFkanVzdCBhbmQgYXBwbHlcblx0XHRcdGluaXRpYWxJblVuaXQgPSBpbml0aWFsSW5Vbml0IC8gc2NhbGU7XG5cdFx0XHRqUXVlcnkuc3R5bGUoIGVsZW0sIHByb3AsIGluaXRpYWxJblVuaXQgKyB1bml0ICk7XG5cblx0XHQvLyBVcGRhdGUgc2NhbGUsIHRvbGVyYXRpbmcgemVybyBvciBOYU4gZnJvbSB0d2Vlbi5jdXIoKVxuXHRcdC8vIEJyZWFrIHRoZSBsb29wIGlmIHNjYWxlIGlzIHVuY2hhbmdlZCBvciBwZXJmZWN0LCBvciBpZiB3ZSd2ZSBqdXN0IGhhZCBlbm91Z2guXG5cdFx0fSB3aGlsZSAoXG5cdFx0XHRzY2FsZSAhPT0gKCBzY2FsZSA9IGN1cnJlbnRWYWx1ZSgpIC8gaW5pdGlhbCApICYmIHNjYWxlICE9PSAxICYmIC0tbWF4SXRlcmF0aW9uc1xuXHRcdCk7XG5cdH1cblxuXHRpZiAoIHZhbHVlUGFydHMgKSB7XG5cdFx0aW5pdGlhbEluVW5pdCA9ICtpbml0aWFsSW5Vbml0IHx8ICtpbml0aWFsIHx8IDA7XG5cblx0XHQvLyBBcHBseSByZWxhdGl2ZSBvZmZzZXQgKCs9Ly09KSBpZiBzcGVjaWZpZWRcblx0XHRhZGp1c3RlZCA9IHZhbHVlUGFydHNbIDEgXSA/XG5cdFx0XHRpbml0aWFsSW5Vbml0ICsgKCB2YWx1ZVBhcnRzWyAxIF0gKyAxICkgKiB2YWx1ZVBhcnRzWyAyIF0gOlxuXHRcdFx0K3ZhbHVlUGFydHNbIDIgXTtcblx0XHRpZiAoIHR3ZWVuICkge1xuXHRcdFx0dHdlZW4udW5pdCA9IHVuaXQ7XG5cdFx0XHR0d2Vlbi5zdGFydCA9IGluaXRpYWxJblVuaXQ7XG5cdFx0XHR0d2Vlbi5lbmQgPSBhZGp1c3RlZDtcblx0XHR9XG5cdH1cblx0cmV0dXJuIGFkanVzdGVkO1xufVxudmFyIHJjaGVja2FibGVUeXBlID0gKCAvXig/OmNoZWNrYm94fHJhZGlvKSQvaSApO1xuXG52YXIgcnRhZ05hbWUgPSAoIC88KFthLXpdW15cXC9cXDA+XFx4MjBcXHRcXHJcXG5cXGZdKykvaSApO1xuXG52YXIgcnNjcmlwdFR5cGUgPSAoIC9eJHxcXC8oPzpqYXZhfGVjbWEpc2NyaXB0L2kgKTtcblxuXG5cbi8vIFdlIGhhdmUgdG8gY2xvc2UgdGhlc2UgdGFncyB0byBzdXBwb3J0IFhIVE1MICgjMTMyMDApXG52YXIgd3JhcE1hcCA9IHtcblxuXHQvLyBTdXBwb3J0OiBJRSA8PTkgb25seVxuXHRvcHRpb246IFsgMSwgXCI8c2VsZWN0IG11bHRpcGxlPSdtdWx0aXBsZSc+XCIsIFwiPC9zZWxlY3Q+XCIgXSxcblxuXHQvLyBYSFRNTCBwYXJzZXJzIGRvIG5vdCBtYWdpY2FsbHkgaW5zZXJ0IGVsZW1lbnRzIGluIHRoZVxuXHQvLyBzYW1lIHdheSB0aGF0IHRhZyBzb3VwIHBhcnNlcnMgZG8uIFNvIHdlIGNhbm5vdCBzaG9ydGVuXG5cdC8vIHRoaXMgYnkgb21pdHRpbmcgPHRib2R5PiBvciBvdGhlciByZXF1aXJlZCBlbGVtZW50cy5cblx0dGhlYWQ6IFsgMSwgXCI8dGFibGU+XCIsIFwiPC90YWJsZT5cIiBdLFxuXHRjb2w6IFsgMiwgXCI8dGFibGU+PGNvbGdyb3VwPlwiLCBcIjwvY29sZ3JvdXA+PC90YWJsZT5cIiBdLFxuXHR0cjogWyAyLCBcIjx0YWJsZT48dGJvZHk+XCIsIFwiPC90Ym9keT48L3RhYmxlPlwiIF0sXG5cdHRkOiBbIDMsIFwiPHRhYmxlPjx0Ym9keT48dHI+XCIsIFwiPC90cj48L3Rib2R5PjwvdGFibGU+XCIgXSxcblxuXHRfZGVmYXVsdDogWyAwLCBcIlwiLCBcIlwiIF1cbn07XG5cbi8vIFN1cHBvcnQ6IElFIDw9OSBvbmx5XG53cmFwTWFwLm9wdGdyb3VwID0gd3JhcE1hcC5vcHRpb247XG5cbndyYXBNYXAudGJvZHkgPSB3cmFwTWFwLnRmb290ID0gd3JhcE1hcC5jb2xncm91cCA9IHdyYXBNYXAuY2FwdGlvbiA9IHdyYXBNYXAudGhlYWQ7XG53cmFwTWFwLnRoID0gd3JhcE1hcC50ZDtcblxuXG5mdW5jdGlvbiBnZXRBbGwoIGNvbnRleHQsIHRhZyApIHtcblxuXHQvLyBTdXBwb3J0OiBJRSA8PTkgLSAxMSBvbmx5XG5cdC8vIFVzZSB0eXBlb2YgdG8gYXZvaWQgemVyby1hcmd1bWVudCBtZXRob2QgaW52b2NhdGlvbiBvbiBob3N0IG9iamVjdHMgKCMxNTE1MSlcblx0dmFyIHJldDtcblxuXHRpZiAoIHR5cGVvZiBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lICE9PSBcInVuZGVmaW5lZFwiICkge1xuXHRcdHJldCA9IGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIHRhZyB8fCBcIipcIiApO1xuXG5cdH0gZWxzZSBpZiAoIHR5cGVvZiBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwgIT09IFwidW5kZWZpbmVkXCIgKSB7XG5cdFx0cmV0ID0gY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKCB0YWcgfHwgXCIqXCIgKTtcblxuXHR9IGVsc2Uge1xuXHRcdHJldCA9IFtdO1xuXHR9XG5cblx0aWYgKCB0YWcgPT09IHVuZGVmaW5lZCB8fCB0YWcgJiYgbm9kZU5hbWUoIGNvbnRleHQsIHRhZyApICkge1xuXHRcdHJldHVybiBqUXVlcnkubWVyZ2UoIFsgY29udGV4dCBdLCByZXQgKTtcblx0fVxuXG5cdHJldHVybiByZXQ7XG59XG5cblxuLy8gTWFyayBzY3JpcHRzIGFzIGhhdmluZyBhbHJlYWR5IGJlZW4gZXZhbHVhdGVkXG5mdW5jdGlvbiBzZXRHbG9iYWxFdmFsKCBlbGVtcywgcmVmRWxlbWVudHMgKSB7XG5cdHZhciBpID0gMCxcblx0XHRsID0gZWxlbXMubGVuZ3RoO1xuXG5cdGZvciAoIDsgaSA8IGw7IGkrKyApIHtcblx0XHRkYXRhUHJpdi5zZXQoXG5cdFx0XHRlbGVtc1sgaSBdLFxuXHRcdFx0XCJnbG9iYWxFdmFsXCIsXG5cdFx0XHQhcmVmRWxlbWVudHMgfHwgZGF0YVByaXYuZ2V0KCByZWZFbGVtZW50c1sgaSBdLCBcImdsb2JhbEV2YWxcIiApXG5cdFx0KTtcblx0fVxufVxuXG5cbnZhciByaHRtbCA9IC88fCYjP1xcdys7LztcblxuZnVuY3Rpb24gYnVpbGRGcmFnbWVudCggZWxlbXMsIGNvbnRleHQsIHNjcmlwdHMsIHNlbGVjdGlvbiwgaWdub3JlZCApIHtcblx0dmFyIGVsZW0sIHRtcCwgdGFnLCB3cmFwLCBjb250YWlucywgaixcblx0XHRmcmFnbWVudCA9IGNvbnRleHQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpLFxuXHRcdG5vZGVzID0gW10sXG5cdFx0aSA9IDAsXG5cdFx0bCA9IGVsZW1zLmxlbmd0aDtcblxuXHRmb3IgKCA7IGkgPCBsOyBpKysgKSB7XG5cdFx0ZWxlbSA9IGVsZW1zWyBpIF07XG5cblx0XHRpZiAoIGVsZW0gfHwgZWxlbSA9PT0gMCApIHtcblxuXHRcdFx0Ly8gQWRkIG5vZGVzIGRpcmVjdGx5XG5cdFx0XHRpZiAoIGpRdWVyeS50eXBlKCBlbGVtICkgPT09IFwib2JqZWN0XCIgKSB7XG5cblx0XHRcdFx0Ly8gU3VwcG9ydDogQW5kcm9pZCA8PTQuMCBvbmx5LCBQaGFudG9tSlMgMSBvbmx5XG5cdFx0XHRcdC8vIHB1c2guYXBwbHkoXywgYXJyYXlsaWtlKSB0aHJvd3Mgb24gYW5jaWVudCBXZWJLaXRcblx0XHRcdFx0alF1ZXJ5Lm1lcmdlKCBub2RlcywgZWxlbS5ub2RlVHlwZSA/IFsgZWxlbSBdIDogZWxlbSApO1xuXG5cdFx0XHQvLyBDb252ZXJ0IG5vbi1odG1sIGludG8gYSB0ZXh0IG5vZGVcblx0XHRcdH0gZWxzZSBpZiAoICFyaHRtbC50ZXN0KCBlbGVtICkgKSB7XG5cdFx0XHRcdG5vZGVzLnB1c2goIGNvbnRleHQuY3JlYXRlVGV4dE5vZGUoIGVsZW0gKSApO1xuXG5cdFx0XHQvLyBDb252ZXJ0IGh0bWwgaW50byBET00gbm9kZXNcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRtcCA9IHRtcCB8fCBmcmFnbWVudC5hcHBlbmRDaGlsZCggY29udGV4dC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICkgKTtcblxuXHRcdFx0XHQvLyBEZXNlcmlhbGl6ZSBhIHN0YW5kYXJkIHJlcHJlc2VudGF0aW9uXG5cdFx0XHRcdHRhZyA9ICggcnRhZ05hbWUuZXhlYyggZWxlbSApIHx8IFsgXCJcIiwgXCJcIiBdIClbIDEgXS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHR3cmFwID0gd3JhcE1hcFsgdGFnIF0gfHwgd3JhcE1hcC5fZGVmYXVsdDtcblx0XHRcdFx0dG1wLmlubmVySFRNTCA9IHdyYXBbIDEgXSArIGpRdWVyeS5odG1sUHJlZmlsdGVyKCBlbGVtICkgKyB3cmFwWyAyIF07XG5cblx0XHRcdFx0Ly8gRGVzY2VuZCB0aHJvdWdoIHdyYXBwZXJzIHRvIHRoZSByaWdodCBjb250ZW50XG5cdFx0XHRcdGogPSB3cmFwWyAwIF07XG5cdFx0XHRcdHdoaWxlICggai0tICkge1xuXHRcdFx0XHRcdHRtcCA9IHRtcC5sYXN0Q2hpbGQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBTdXBwb3J0OiBBbmRyb2lkIDw9NC4wIG9ubHksIFBoYW50b21KUyAxIG9ubHlcblx0XHRcdFx0Ly8gcHVzaC5hcHBseShfLCBhcnJheWxpa2UpIHRocm93cyBvbiBhbmNpZW50IFdlYktpdFxuXHRcdFx0XHRqUXVlcnkubWVyZ2UoIG5vZGVzLCB0bXAuY2hpbGROb2RlcyApO1xuXG5cdFx0XHRcdC8vIFJlbWVtYmVyIHRoZSB0b3AtbGV2ZWwgY29udGFpbmVyXG5cdFx0XHRcdHRtcCA9IGZyYWdtZW50LmZpcnN0Q2hpbGQ7XG5cblx0XHRcdFx0Ly8gRW5zdXJlIHRoZSBjcmVhdGVkIG5vZGVzIGFyZSBvcnBoYW5lZCAoIzEyMzkyKVxuXHRcdFx0XHR0bXAudGV4dENvbnRlbnQgPSBcIlwiO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIFJlbW92ZSB3cmFwcGVyIGZyb20gZnJhZ21lbnRcblx0ZnJhZ21lbnQudGV4dENvbnRlbnQgPSBcIlwiO1xuXG5cdGkgPSAwO1xuXHR3aGlsZSAoICggZWxlbSA9IG5vZGVzWyBpKysgXSApICkge1xuXG5cdFx0Ly8gU2tpcCBlbGVtZW50cyBhbHJlYWR5IGluIHRoZSBjb250ZXh0IGNvbGxlY3Rpb24gKHRyYWMtNDA4Nylcblx0XHRpZiAoIHNlbGVjdGlvbiAmJiBqUXVlcnkuaW5BcnJheSggZWxlbSwgc2VsZWN0aW9uICkgPiAtMSApIHtcblx0XHRcdGlmICggaWdub3JlZCApIHtcblx0XHRcdFx0aWdub3JlZC5wdXNoKCBlbGVtICk7XG5cdFx0XHR9XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHRjb250YWlucyA9IGpRdWVyeS5jb250YWlucyggZWxlbS5vd25lckRvY3VtZW50LCBlbGVtICk7XG5cblx0XHQvLyBBcHBlbmQgdG8gZnJhZ21lbnRcblx0XHR0bXAgPSBnZXRBbGwoIGZyYWdtZW50LmFwcGVuZENoaWxkKCBlbGVtICksIFwic2NyaXB0XCIgKTtcblxuXHRcdC8vIFByZXNlcnZlIHNjcmlwdCBldmFsdWF0aW9uIGhpc3Rvcnlcblx0XHRpZiAoIGNvbnRhaW5zICkge1xuXHRcdFx0c2V0R2xvYmFsRXZhbCggdG1wICk7XG5cdFx0fVxuXG5cdFx0Ly8gQ2FwdHVyZSBleGVjdXRhYmxlc1xuXHRcdGlmICggc2NyaXB0cyApIHtcblx0XHRcdGogPSAwO1xuXHRcdFx0d2hpbGUgKCAoIGVsZW0gPSB0bXBbIGorKyBdICkgKSB7XG5cdFx0XHRcdGlmICggcnNjcmlwdFR5cGUudGVzdCggZWxlbS50eXBlIHx8IFwiXCIgKSApIHtcblx0XHRcdFx0XHRzY3JpcHRzLnB1c2goIGVsZW0gKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBmcmFnbWVudDtcbn1cblxuXG4oIGZ1bmN0aW9uKCkge1xuXHR2YXIgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCksXG5cdFx0ZGl2ID0gZnJhZ21lbnQuYXBwZW5kQ2hpbGQoIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiZGl2XCIgKSApLFxuXHRcdGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJpbnB1dFwiICk7XG5cblx0Ly8gU3VwcG9ydDogQW5kcm9pZCA0LjAgLSA0LjMgb25seVxuXHQvLyBDaGVjayBzdGF0ZSBsb3N0IGlmIHRoZSBuYW1lIGlzIHNldCAoIzExMjE3KVxuXHQvLyBTdXBwb3J0OiBXaW5kb3dzIFdlYiBBcHBzIChXV0EpXG5cdC8vIGBuYW1lYCBhbmQgYHR5cGVgIG11c3QgdXNlIC5zZXRBdHRyaWJ1dGUgZm9yIFdXQSAoIzE0OTAxKVxuXHRpbnB1dC5zZXRBdHRyaWJ1dGUoIFwidHlwZVwiLCBcInJhZGlvXCIgKTtcblx0aW5wdXQuc2V0QXR0cmlidXRlKCBcImNoZWNrZWRcIiwgXCJjaGVja2VkXCIgKTtcblx0aW5wdXQuc2V0QXR0cmlidXRlKCBcIm5hbWVcIiwgXCJ0XCIgKTtcblxuXHRkaXYuYXBwZW5kQ2hpbGQoIGlucHV0ICk7XG5cblx0Ly8gU3VwcG9ydDogQW5kcm9pZCA8PTQuMSBvbmx5XG5cdC8vIE9sZGVyIFdlYktpdCBkb2Vzbid0IGNsb25lIGNoZWNrZWQgc3RhdGUgY29ycmVjdGx5IGluIGZyYWdtZW50c1xuXHRzdXBwb3J0LmNoZWNrQ2xvbmUgPSBkaXYuY2xvbmVOb2RlKCB0cnVlICkuY2xvbmVOb2RlKCB0cnVlICkubGFzdENoaWxkLmNoZWNrZWQ7XG5cblx0Ly8gU3VwcG9ydDogSUUgPD0xMSBvbmx5XG5cdC8vIE1ha2Ugc3VyZSB0ZXh0YXJlYSAoYW5kIGNoZWNrYm94KSBkZWZhdWx0VmFsdWUgaXMgcHJvcGVybHkgY2xvbmVkXG5cdGRpdi5pbm5lckhUTUwgPSBcIjx0ZXh0YXJlYT54PC90ZXh0YXJlYT5cIjtcblx0c3VwcG9ydC5ub0Nsb25lQ2hlY2tlZCA9ICEhZGl2LmNsb25lTm9kZSggdHJ1ZSApLmxhc3RDaGlsZC5kZWZhdWx0VmFsdWU7XG59ICkoKTtcblxuXG52YXJcblx0cmtleUV2ZW50ID0gL15rZXkvLFxuXHRybW91c2VFdmVudCA9IC9eKD86bW91c2V8cG9pbnRlcnxjb250ZXh0bWVudXxkcmFnfGRyb3ApfGNsaWNrLyxcblx0cnR5cGVuYW1lc3BhY2UgPSAvXihbXi5dKikoPzpcXC4oLispfCkvO1xuXG5mdW5jdGlvbiByZXR1cm5UcnVlKCkge1xuXHRyZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gcmV0dXJuRmFsc2UoKSB7XG5cdHJldHVybiBmYWxzZTtcbn1cblxuLy8gU3VwcG9ydDogSUUgPD05IG9ubHlcbi8vIFNlZSAjMTMzOTMgZm9yIG1vcmUgaW5mb1xuZnVuY3Rpb24gc2FmZUFjdGl2ZUVsZW1lbnQoKSB7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG5cdH0gY2F0Y2ggKCBlcnIgKSB7IH1cbn1cblxuZnVuY3Rpb24gb24oIGVsZW0sIHR5cGVzLCBzZWxlY3RvciwgZGF0YSwgZm4sIG9uZSApIHtcblx0dmFyIG9yaWdGbiwgdHlwZTtcblxuXHQvLyBUeXBlcyBjYW4gYmUgYSBtYXAgb2YgdHlwZXMvaGFuZGxlcnNcblx0aWYgKCB0eXBlb2YgdHlwZXMgPT09IFwib2JqZWN0XCIgKSB7XG5cblx0XHQvLyAoIHR5cGVzLU9iamVjdCwgc2VsZWN0b3IsIGRhdGEgKVxuXHRcdGlmICggdHlwZW9mIHNlbGVjdG9yICE9PSBcInN0cmluZ1wiICkge1xuXG5cdFx0XHQvLyAoIHR5cGVzLU9iamVjdCwgZGF0YSApXG5cdFx0XHRkYXRhID0gZGF0YSB8fCBzZWxlY3Rvcjtcblx0XHRcdHNlbGVjdG9yID0gdW5kZWZpbmVkO1xuXHRcdH1cblx0XHRmb3IgKCB0eXBlIGluIHR5cGVzICkge1xuXHRcdFx0b24oIGVsZW0sIHR5cGUsIHNlbGVjdG9yLCBkYXRhLCB0eXBlc1sgdHlwZSBdLCBvbmUgKTtcblx0XHR9XG5cdFx0cmV0dXJuIGVsZW07XG5cdH1cblxuXHRpZiAoIGRhdGEgPT0gbnVsbCAmJiBmbiA9PSBudWxsICkge1xuXG5cdFx0Ly8gKCB0eXBlcywgZm4gKVxuXHRcdGZuID0gc2VsZWN0b3I7XG5cdFx0ZGF0YSA9IHNlbGVjdG9yID0gdW5kZWZpbmVkO1xuXHR9IGVsc2UgaWYgKCBmbiA9PSBudWxsICkge1xuXHRcdGlmICggdHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiICkge1xuXG5cdFx0XHQvLyAoIHR5cGVzLCBzZWxlY3RvciwgZm4gKVxuXHRcdFx0Zm4gPSBkYXRhO1xuXHRcdFx0ZGF0YSA9IHVuZGVmaW5lZDtcblx0XHR9IGVsc2Uge1xuXG5cdFx0XHQvLyAoIHR5cGVzLCBkYXRhLCBmbiApXG5cdFx0XHRmbiA9IGRhdGE7XG5cdFx0XHRkYXRhID0gc2VsZWN0b3I7XG5cdFx0XHRzZWxlY3RvciA9IHVuZGVmaW5lZDtcblx0XHR9XG5cdH1cblx0aWYgKCBmbiA9PT0gZmFsc2UgKSB7XG5cdFx0Zm4gPSByZXR1cm5GYWxzZTtcblx0fSBlbHNlIGlmICggIWZuICkge1xuXHRcdHJldHVybiBlbGVtO1xuXHR9XG5cblx0aWYgKCBvbmUgPT09IDEgKSB7XG5cdFx0b3JpZ0ZuID0gZm47XG5cdFx0Zm4gPSBmdW5jdGlvbiggZXZlbnQgKSB7XG5cblx0XHRcdC8vIENhbiB1c2UgYW4gZW1wdHkgc2V0LCBzaW5jZSBldmVudCBjb250YWlucyB0aGUgaW5mb1xuXHRcdFx0alF1ZXJ5KCkub2ZmKCBldmVudCApO1xuXHRcdFx0cmV0dXJuIG9yaWdGbi5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG5cdFx0fTtcblxuXHRcdC8vIFVzZSBzYW1lIGd1aWQgc28gY2FsbGVyIGNhbiByZW1vdmUgdXNpbmcgb3JpZ0ZuXG5cdFx0Zm4uZ3VpZCA9IG9yaWdGbi5ndWlkIHx8ICggb3JpZ0ZuLmd1aWQgPSBqUXVlcnkuZ3VpZCsrICk7XG5cdH1cblx0cmV0dXJuIGVsZW0uZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0alF1ZXJ5LmV2ZW50LmFkZCggdGhpcywgdHlwZXMsIGZuLCBkYXRhLCBzZWxlY3RvciApO1xuXHR9ICk7XG59XG5cbi8qXG4gKiBIZWxwZXIgZnVuY3Rpb25zIGZvciBtYW5hZ2luZyBldmVudHMgLS0gbm90IHBhcnQgb2YgdGhlIHB1YmxpYyBpbnRlcmZhY2UuXG4gKiBQcm9wcyB0byBEZWFuIEVkd2FyZHMnIGFkZEV2ZW50IGxpYnJhcnkgZm9yIG1hbnkgb2YgdGhlIGlkZWFzLlxuICovXG5qUXVlcnkuZXZlbnQgPSB7XG5cblx0Z2xvYmFsOiB7fSxcblxuXHRhZGQ6IGZ1bmN0aW9uKCBlbGVtLCB0eXBlcywgaGFuZGxlciwgZGF0YSwgc2VsZWN0b3IgKSB7XG5cblx0XHR2YXIgaGFuZGxlT2JqSW4sIGV2ZW50SGFuZGxlLCB0bXAsXG5cdFx0XHRldmVudHMsIHQsIGhhbmRsZU9iaixcblx0XHRcdHNwZWNpYWwsIGhhbmRsZXJzLCB0eXBlLCBuYW1lc3BhY2VzLCBvcmlnVHlwZSxcblx0XHRcdGVsZW1EYXRhID0gZGF0YVByaXYuZ2V0KCBlbGVtICk7XG5cblx0XHQvLyBEb24ndCBhdHRhY2ggZXZlbnRzIHRvIG5vRGF0YSBvciB0ZXh0L2NvbW1lbnQgbm9kZXMgKGJ1dCBhbGxvdyBwbGFpbiBvYmplY3RzKVxuXHRcdGlmICggIWVsZW1EYXRhICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIENhbGxlciBjYW4gcGFzcyBpbiBhbiBvYmplY3Qgb2YgY3VzdG9tIGRhdGEgaW4gbGlldSBvZiB0aGUgaGFuZGxlclxuXHRcdGlmICggaGFuZGxlci5oYW5kbGVyICkge1xuXHRcdFx0aGFuZGxlT2JqSW4gPSBoYW5kbGVyO1xuXHRcdFx0aGFuZGxlciA9IGhhbmRsZU9iakluLmhhbmRsZXI7XG5cdFx0XHRzZWxlY3RvciA9IGhhbmRsZU9iakluLnNlbGVjdG9yO1xuXHRcdH1cblxuXHRcdC8vIEVuc3VyZSB0aGF0IGludmFsaWQgc2VsZWN0b3JzIHRocm93IGV4Y2VwdGlvbnMgYXQgYXR0YWNoIHRpbWVcblx0XHQvLyBFdmFsdWF0ZSBhZ2FpbnN0IGRvY3VtZW50RWxlbWVudCBpbiBjYXNlIGVsZW0gaXMgYSBub24tZWxlbWVudCBub2RlIChlLmcuLCBkb2N1bWVudClcblx0XHRpZiAoIHNlbGVjdG9yICkge1xuXHRcdFx0alF1ZXJ5LmZpbmQubWF0Y2hlc1NlbGVjdG9yKCBkb2N1bWVudEVsZW1lbnQsIHNlbGVjdG9yICk7XG5cdFx0fVxuXG5cdFx0Ly8gTWFrZSBzdXJlIHRoYXQgdGhlIGhhbmRsZXIgaGFzIGEgdW5pcXVlIElELCB1c2VkIHRvIGZpbmQvcmVtb3ZlIGl0IGxhdGVyXG5cdFx0aWYgKCAhaGFuZGxlci5ndWlkICkge1xuXHRcdFx0aGFuZGxlci5ndWlkID0galF1ZXJ5Lmd1aWQrKztcblx0XHR9XG5cblx0XHQvLyBJbml0IHRoZSBlbGVtZW50J3MgZXZlbnQgc3RydWN0dXJlIGFuZCBtYWluIGhhbmRsZXIsIGlmIHRoaXMgaXMgdGhlIGZpcnN0XG5cdFx0aWYgKCAhKCBldmVudHMgPSBlbGVtRGF0YS5ldmVudHMgKSApIHtcblx0XHRcdGV2ZW50cyA9IGVsZW1EYXRhLmV2ZW50cyA9IHt9O1xuXHRcdH1cblx0XHRpZiAoICEoIGV2ZW50SGFuZGxlID0gZWxlbURhdGEuaGFuZGxlICkgKSB7XG5cdFx0XHRldmVudEhhbmRsZSA9IGVsZW1EYXRhLmhhbmRsZSA9IGZ1bmN0aW9uKCBlICkge1xuXG5cdFx0XHRcdC8vIERpc2NhcmQgdGhlIHNlY29uZCBldmVudCBvZiBhIGpRdWVyeS5ldmVudC50cmlnZ2VyKCkgYW5kXG5cdFx0XHRcdC8vIHdoZW4gYW4gZXZlbnQgaXMgY2FsbGVkIGFmdGVyIGEgcGFnZSBoYXMgdW5sb2FkZWRcblx0XHRcdFx0cmV0dXJuIHR5cGVvZiBqUXVlcnkgIT09IFwidW5kZWZpbmVkXCIgJiYgalF1ZXJ5LmV2ZW50LnRyaWdnZXJlZCAhPT0gZS50eXBlID9cblx0XHRcdFx0XHRqUXVlcnkuZXZlbnQuZGlzcGF0Y2guYXBwbHkoIGVsZW0sIGFyZ3VtZW50cyApIDogdW5kZWZpbmVkO1xuXHRcdFx0fTtcblx0XHR9XG5cblx0XHQvLyBIYW5kbGUgbXVsdGlwbGUgZXZlbnRzIHNlcGFyYXRlZCBieSBhIHNwYWNlXG5cdFx0dHlwZXMgPSAoIHR5cGVzIHx8IFwiXCIgKS5tYXRjaCggcm5vdGh0bWx3aGl0ZSApIHx8IFsgXCJcIiBdO1xuXHRcdHQgPSB0eXBlcy5sZW5ndGg7XG5cdFx0d2hpbGUgKCB0LS0gKSB7XG5cdFx0XHR0bXAgPSBydHlwZW5hbWVzcGFjZS5leGVjKCB0eXBlc1sgdCBdICkgfHwgW107XG5cdFx0XHR0eXBlID0gb3JpZ1R5cGUgPSB0bXBbIDEgXTtcblx0XHRcdG5hbWVzcGFjZXMgPSAoIHRtcFsgMiBdIHx8IFwiXCIgKS5zcGxpdCggXCIuXCIgKS5zb3J0KCk7XG5cblx0XHRcdC8vIFRoZXJlICptdXN0KiBiZSBhIHR5cGUsIG5vIGF0dGFjaGluZyBuYW1lc3BhY2Utb25seSBoYW5kbGVyc1xuXHRcdFx0aWYgKCAhdHlwZSApIHtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIGV2ZW50IGNoYW5nZXMgaXRzIHR5cGUsIHVzZSB0aGUgc3BlY2lhbCBldmVudCBoYW5kbGVycyBmb3IgdGhlIGNoYW5nZWQgdHlwZVxuXHRcdFx0c3BlY2lhbCA9IGpRdWVyeS5ldmVudC5zcGVjaWFsWyB0eXBlIF0gfHwge307XG5cblx0XHRcdC8vIElmIHNlbGVjdG9yIGRlZmluZWQsIGRldGVybWluZSBzcGVjaWFsIGV2ZW50IGFwaSB0eXBlLCBvdGhlcndpc2UgZ2l2ZW4gdHlwZVxuXHRcdFx0dHlwZSA9ICggc2VsZWN0b3IgPyBzcGVjaWFsLmRlbGVnYXRlVHlwZSA6IHNwZWNpYWwuYmluZFR5cGUgKSB8fCB0eXBlO1xuXG5cdFx0XHQvLyBVcGRhdGUgc3BlY2lhbCBiYXNlZCBvbiBuZXdseSByZXNldCB0eXBlXG5cdFx0XHRzcGVjaWFsID0galF1ZXJ5LmV2ZW50LnNwZWNpYWxbIHR5cGUgXSB8fCB7fTtcblxuXHRcdFx0Ly8gaGFuZGxlT2JqIGlzIHBhc3NlZCB0byBhbGwgZXZlbnQgaGFuZGxlcnNcblx0XHRcdGhhbmRsZU9iaiA9IGpRdWVyeS5leHRlbmQoIHtcblx0XHRcdFx0dHlwZTogdHlwZSxcblx0XHRcdFx0b3JpZ1R5cGU6IG9yaWdUeXBlLFxuXHRcdFx0XHRkYXRhOiBkYXRhLFxuXHRcdFx0XHRoYW5kbGVyOiBoYW5kbGVyLFxuXHRcdFx0XHRndWlkOiBoYW5kbGVyLmd1aWQsXG5cdFx0XHRcdHNlbGVjdG9yOiBzZWxlY3Rvcixcblx0XHRcdFx0bmVlZHNDb250ZXh0OiBzZWxlY3RvciAmJiBqUXVlcnkuZXhwci5tYXRjaC5uZWVkc0NvbnRleHQudGVzdCggc2VsZWN0b3IgKSxcblx0XHRcdFx0bmFtZXNwYWNlOiBuYW1lc3BhY2VzLmpvaW4oIFwiLlwiIClcblx0XHRcdH0sIGhhbmRsZU9iakluICk7XG5cblx0XHRcdC8vIEluaXQgdGhlIGV2ZW50IGhhbmRsZXIgcXVldWUgaWYgd2UncmUgdGhlIGZpcnN0XG5cdFx0XHRpZiAoICEoIGhhbmRsZXJzID0gZXZlbnRzWyB0eXBlIF0gKSApIHtcblx0XHRcdFx0aGFuZGxlcnMgPSBldmVudHNbIHR5cGUgXSA9IFtdO1xuXHRcdFx0XHRoYW5kbGVycy5kZWxlZ2F0ZUNvdW50ID0gMDtcblxuXHRcdFx0XHQvLyBPbmx5IHVzZSBhZGRFdmVudExpc3RlbmVyIGlmIHRoZSBzcGVjaWFsIGV2ZW50cyBoYW5kbGVyIHJldHVybnMgZmFsc2Vcblx0XHRcdFx0aWYgKCAhc3BlY2lhbC5zZXR1cCB8fFxuXHRcdFx0XHRcdHNwZWNpYWwuc2V0dXAuY2FsbCggZWxlbSwgZGF0YSwgbmFtZXNwYWNlcywgZXZlbnRIYW5kbGUgKSA9PT0gZmFsc2UgKSB7XG5cblx0XHRcdFx0XHRpZiAoIGVsZW0uYWRkRXZlbnRMaXN0ZW5lciApIHtcblx0XHRcdFx0XHRcdGVsZW0uYWRkRXZlbnRMaXN0ZW5lciggdHlwZSwgZXZlbnRIYW5kbGUgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKCBzcGVjaWFsLmFkZCApIHtcblx0XHRcdFx0c3BlY2lhbC5hZGQuY2FsbCggZWxlbSwgaGFuZGxlT2JqICk7XG5cblx0XHRcdFx0aWYgKCAhaGFuZGxlT2JqLmhhbmRsZXIuZ3VpZCApIHtcblx0XHRcdFx0XHRoYW5kbGVPYmouaGFuZGxlci5ndWlkID0gaGFuZGxlci5ndWlkO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFkZCB0byB0aGUgZWxlbWVudCdzIGhhbmRsZXIgbGlzdCwgZGVsZWdhdGVzIGluIGZyb250XG5cdFx0XHRpZiAoIHNlbGVjdG9yICkge1xuXHRcdFx0XHRoYW5kbGVycy5zcGxpY2UoIGhhbmRsZXJzLmRlbGVnYXRlQ291bnQrKywgMCwgaGFuZGxlT2JqICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRoYW5kbGVycy5wdXNoKCBoYW5kbGVPYmogKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gS2VlcCB0cmFjayBvZiB3aGljaCBldmVudHMgaGF2ZSBldmVyIGJlZW4gdXNlZCwgZm9yIGV2ZW50IG9wdGltaXphdGlvblxuXHRcdFx0alF1ZXJ5LmV2ZW50Lmdsb2JhbFsgdHlwZSBdID0gdHJ1ZTtcblx0XHR9XG5cblx0fSxcblxuXHQvLyBEZXRhY2ggYW4gZXZlbnQgb3Igc2V0IG9mIGV2ZW50cyBmcm9tIGFuIGVsZW1lbnRcblx0cmVtb3ZlOiBmdW5jdGlvbiggZWxlbSwgdHlwZXMsIGhhbmRsZXIsIHNlbGVjdG9yLCBtYXBwZWRUeXBlcyApIHtcblxuXHRcdHZhciBqLCBvcmlnQ291bnQsIHRtcCxcblx0XHRcdGV2ZW50cywgdCwgaGFuZGxlT2JqLFxuXHRcdFx0c3BlY2lhbCwgaGFuZGxlcnMsIHR5cGUsIG5hbWVzcGFjZXMsIG9yaWdUeXBlLFxuXHRcdFx0ZWxlbURhdGEgPSBkYXRhUHJpdi5oYXNEYXRhKCBlbGVtICkgJiYgZGF0YVByaXYuZ2V0KCBlbGVtICk7XG5cblx0XHRpZiAoICFlbGVtRGF0YSB8fCAhKCBldmVudHMgPSBlbGVtRGF0YS5ldmVudHMgKSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBPbmNlIGZvciBlYWNoIHR5cGUubmFtZXNwYWNlIGluIHR5cGVzOyB0eXBlIG1heSBiZSBvbWl0dGVkXG5cdFx0dHlwZXMgPSAoIHR5cGVzIHx8IFwiXCIgKS5tYXRjaCggcm5vdGh0bWx3aGl0ZSApIHx8IFsgXCJcIiBdO1xuXHRcdHQgPSB0eXBlcy5sZW5ndGg7XG5cdFx0d2hpbGUgKCB0LS0gKSB7XG5cdFx0XHR0bXAgPSBydHlwZW5hbWVzcGFjZS5leGVjKCB0eXBlc1sgdCBdICkgfHwgW107XG5cdFx0XHR0eXBlID0gb3JpZ1R5cGUgPSB0bXBbIDEgXTtcblx0XHRcdG5hbWVzcGFjZXMgPSAoIHRtcFsgMiBdIHx8IFwiXCIgKS5zcGxpdCggXCIuXCIgKS5zb3J0KCk7XG5cblx0XHRcdC8vIFVuYmluZCBhbGwgZXZlbnRzIChvbiB0aGlzIG5hbWVzcGFjZSwgaWYgcHJvdmlkZWQpIGZvciB0aGUgZWxlbWVudFxuXHRcdFx0aWYgKCAhdHlwZSApIHtcblx0XHRcdFx0Zm9yICggdHlwZSBpbiBldmVudHMgKSB7XG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LnJlbW92ZSggZWxlbSwgdHlwZSArIHR5cGVzWyB0IF0sIGhhbmRsZXIsIHNlbGVjdG9yLCB0cnVlICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbFsgdHlwZSBdIHx8IHt9O1xuXHRcdFx0dHlwZSA9ICggc2VsZWN0b3IgPyBzcGVjaWFsLmRlbGVnYXRlVHlwZSA6IHNwZWNpYWwuYmluZFR5cGUgKSB8fCB0eXBlO1xuXHRcdFx0aGFuZGxlcnMgPSBldmVudHNbIHR5cGUgXSB8fCBbXTtcblx0XHRcdHRtcCA9IHRtcFsgMiBdICYmXG5cdFx0XHRcdG5ldyBSZWdFeHAoIFwiKF58XFxcXC4pXCIgKyBuYW1lc3BhY2VzLmpvaW4oIFwiXFxcXC4oPzouKlxcXFwufClcIiApICsgXCIoXFxcXC58JClcIiApO1xuXG5cdFx0XHQvLyBSZW1vdmUgbWF0Y2hpbmcgZXZlbnRzXG5cdFx0XHRvcmlnQ291bnQgPSBqID0gaGFuZGxlcnMubGVuZ3RoO1xuXHRcdFx0d2hpbGUgKCBqLS0gKSB7XG5cdFx0XHRcdGhhbmRsZU9iaiA9IGhhbmRsZXJzWyBqIF07XG5cblx0XHRcdFx0aWYgKCAoIG1hcHBlZFR5cGVzIHx8IG9yaWdUeXBlID09PSBoYW5kbGVPYmoub3JpZ1R5cGUgKSAmJlxuXHRcdFx0XHRcdCggIWhhbmRsZXIgfHwgaGFuZGxlci5ndWlkID09PSBoYW5kbGVPYmouZ3VpZCApICYmXG5cdFx0XHRcdFx0KCAhdG1wIHx8IHRtcC50ZXN0KCBoYW5kbGVPYmoubmFtZXNwYWNlICkgKSAmJlxuXHRcdFx0XHRcdCggIXNlbGVjdG9yIHx8IHNlbGVjdG9yID09PSBoYW5kbGVPYmouc2VsZWN0b3IgfHxcblx0XHRcdFx0XHRcdHNlbGVjdG9yID09PSBcIioqXCIgJiYgaGFuZGxlT2JqLnNlbGVjdG9yICkgKSB7XG5cdFx0XHRcdFx0aGFuZGxlcnMuc3BsaWNlKCBqLCAxICk7XG5cblx0XHRcdFx0XHRpZiAoIGhhbmRsZU9iai5zZWxlY3RvciApIHtcblx0XHRcdFx0XHRcdGhhbmRsZXJzLmRlbGVnYXRlQ291bnQtLTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKCBzcGVjaWFsLnJlbW92ZSApIHtcblx0XHRcdFx0XHRcdHNwZWNpYWwucmVtb3ZlLmNhbGwoIGVsZW0sIGhhbmRsZU9iaiApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBSZW1vdmUgZ2VuZXJpYyBldmVudCBoYW5kbGVyIGlmIHdlIHJlbW92ZWQgc29tZXRoaW5nIGFuZCBubyBtb3JlIGhhbmRsZXJzIGV4aXN0XG5cdFx0XHQvLyAoYXZvaWRzIHBvdGVudGlhbCBmb3IgZW5kbGVzcyByZWN1cnNpb24gZHVyaW5nIHJlbW92YWwgb2Ygc3BlY2lhbCBldmVudCBoYW5kbGVycylcblx0XHRcdGlmICggb3JpZ0NvdW50ICYmICFoYW5kbGVycy5sZW5ndGggKSB7XG5cdFx0XHRcdGlmICggIXNwZWNpYWwudGVhcmRvd24gfHxcblx0XHRcdFx0XHRzcGVjaWFsLnRlYXJkb3duLmNhbGwoIGVsZW0sIG5hbWVzcGFjZXMsIGVsZW1EYXRhLmhhbmRsZSApID09PSBmYWxzZSApIHtcblxuXHRcdFx0XHRcdGpRdWVyeS5yZW1vdmVFdmVudCggZWxlbSwgdHlwZSwgZWxlbURhdGEuaGFuZGxlICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRkZWxldGUgZXZlbnRzWyB0eXBlIF07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gUmVtb3ZlIGRhdGEgYW5kIHRoZSBleHBhbmRvIGlmIGl0J3Mgbm8gbG9uZ2VyIHVzZWRcblx0XHRpZiAoIGpRdWVyeS5pc0VtcHR5T2JqZWN0KCBldmVudHMgKSApIHtcblx0XHRcdGRhdGFQcml2LnJlbW92ZSggZWxlbSwgXCJoYW5kbGUgZXZlbnRzXCIgKTtcblx0XHR9XG5cdH0sXG5cblx0ZGlzcGF0Y2g6IGZ1bmN0aW9uKCBuYXRpdmVFdmVudCApIHtcblxuXHRcdC8vIE1ha2UgYSB3cml0YWJsZSBqUXVlcnkuRXZlbnQgZnJvbSB0aGUgbmF0aXZlIGV2ZW50IG9iamVjdFxuXHRcdHZhciBldmVudCA9IGpRdWVyeS5ldmVudC5maXgoIG5hdGl2ZUV2ZW50ICk7XG5cblx0XHR2YXIgaSwgaiwgcmV0LCBtYXRjaGVkLCBoYW5kbGVPYmosIGhhbmRsZXJRdWV1ZSxcblx0XHRcdGFyZ3MgPSBuZXcgQXJyYXkoIGFyZ3VtZW50cy5sZW5ndGggKSxcblx0XHRcdGhhbmRsZXJzID0gKCBkYXRhUHJpdi5nZXQoIHRoaXMsIFwiZXZlbnRzXCIgKSB8fCB7fSApWyBldmVudC50eXBlIF0gfHwgW10sXG5cdFx0XHRzcGVjaWFsID0galF1ZXJ5LmV2ZW50LnNwZWNpYWxbIGV2ZW50LnR5cGUgXSB8fCB7fTtcblxuXHRcdC8vIFVzZSB0aGUgZml4LWVkIGpRdWVyeS5FdmVudCByYXRoZXIgdGhhbiB0aGUgKHJlYWQtb25seSkgbmF0aXZlIGV2ZW50XG5cdFx0YXJnc1sgMCBdID0gZXZlbnQ7XG5cblx0XHRmb3IgKCBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKyApIHtcblx0XHRcdGFyZ3NbIGkgXSA9IGFyZ3VtZW50c1sgaSBdO1xuXHRcdH1cblxuXHRcdGV2ZW50LmRlbGVnYXRlVGFyZ2V0ID0gdGhpcztcblxuXHRcdC8vIENhbGwgdGhlIHByZURpc3BhdGNoIGhvb2sgZm9yIHRoZSBtYXBwZWQgdHlwZSwgYW5kIGxldCBpdCBiYWlsIGlmIGRlc2lyZWRcblx0XHRpZiAoIHNwZWNpYWwucHJlRGlzcGF0Y2ggJiYgc3BlY2lhbC5wcmVEaXNwYXRjaC5jYWxsKCB0aGlzLCBldmVudCApID09PSBmYWxzZSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBEZXRlcm1pbmUgaGFuZGxlcnNcblx0XHRoYW5kbGVyUXVldWUgPSBqUXVlcnkuZXZlbnQuaGFuZGxlcnMuY2FsbCggdGhpcywgZXZlbnQsIGhhbmRsZXJzICk7XG5cblx0XHQvLyBSdW4gZGVsZWdhdGVzIGZpcnN0OyB0aGV5IG1heSB3YW50IHRvIHN0b3AgcHJvcGFnYXRpb24gYmVuZWF0aCB1c1xuXHRcdGkgPSAwO1xuXHRcdHdoaWxlICggKCBtYXRjaGVkID0gaGFuZGxlclF1ZXVlWyBpKysgXSApICYmICFldmVudC5pc1Byb3BhZ2F0aW9uU3RvcHBlZCgpICkge1xuXHRcdFx0ZXZlbnQuY3VycmVudFRhcmdldCA9IG1hdGNoZWQuZWxlbTtcblxuXHRcdFx0aiA9IDA7XG5cdFx0XHR3aGlsZSAoICggaGFuZGxlT2JqID0gbWF0Y2hlZC5oYW5kbGVyc1sgaisrIF0gKSAmJlxuXHRcdFx0XHQhZXZlbnQuaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQoKSApIHtcblxuXHRcdFx0XHQvLyBUcmlnZ2VyZWQgZXZlbnQgbXVzdCBlaXRoZXIgMSkgaGF2ZSBubyBuYW1lc3BhY2UsIG9yIDIpIGhhdmUgbmFtZXNwYWNlKHMpXG5cdFx0XHRcdC8vIGEgc3Vic2V0IG9yIGVxdWFsIHRvIHRob3NlIGluIHRoZSBib3VuZCBldmVudCAoYm90aCBjYW4gaGF2ZSBubyBuYW1lc3BhY2UpLlxuXHRcdFx0XHRpZiAoICFldmVudC5ybmFtZXNwYWNlIHx8IGV2ZW50LnJuYW1lc3BhY2UudGVzdCggaGFuZGxlT2JqLm5hbWVzcGFjZSApICkge1xuXG5cdFx0XHRcdFx0ZXZlbnQuaGFuZGxlT2JqID0gaGFuZGxlT2JqO1xuXHRcdFx0XHRcdGV2ZW50LmRhdGEgPSBoYW5kbGVPYmouZGF0YTtcblxuXHRcdFx0XHRcdHJldCA9ICggKCBqUXVlcnkuZXZlbnQuc3BlY2lhbFsgaGFuZGxlT2JqLm9yaWdUeXBlIF0gfHwge30gKS5oYW5kbGUgfHxcblx0XHRcdFx0XHRcdGhhbmRsZU9iai5oYW5kbGVyICkuYXBwbHkoIG1hdGNoZWQuZWxlbSwgYXJncyApO1xuXG5cdFx0XHRcdFx0aWYgKCByZXQgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHRcdGlmICggKCBldmVudC5yZXN1bHQgPSByZXQgKSA9PT0gZmFsc2UgKSB7XG5cdFx0XHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIENhbGwgdGhlIHBvc3REaXNwYXRjaCBob29rIGZvciB0aGUgbWFwcGVkIHR5cGVcblx0XHRpZiAoIHNwZWNpYWwucG9zdERpc3BhdGNoICkge1xuXHRcdFx0c3BlY2lhbC5wb3N0RGlzcGF0Y2guY2FsbCggdGhpcywgZXZlbnQgKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZXZlbnQucmVzdWx0O1xuXHR9LFxuXG5cdGhhbmRsZXJzOiBmdW5jdGlvbiggZXZlbnQsIGhhbmRsZXJzICkge1xuXHRcdHZhciBpLCBoYW5kbGVPYmosIHNlbCwgbWF0Y2hlZEhhbmRsZXJzLCBtYXRjaGVkU2VsZWN0b3JzLFxuXHRcdFx0aGFuZGxlclF1ZXVlID0gW10sXG5cdFx0XHRkZWxlZ2F0ZUNvdW50ID0gaGFuZGxlcnMuZGVsZWdhdGVDb3VudCxcblx0XHRcdGN1ciA9IGV2ZW50LnRhcmdldDtcblxuXHRcdC8vIEZpbmQgZGVsZWdhdGUgaGFuZGxlcnNcblx0XHRpZiAoIGRlbGVnYXRlQ291bnQgJiZcblxuXHRcdFx0Ly8gU3VwcG9ydDogSUUgPD05XG5cdFx0XHQvLyBCbGFjay1ob2xlIFNWRyA8dXNlPiBpbnN0YW5jZSB0cmVlcyAodHJhYy0xMzE4MClcblx0XHRcdGN1ci5ub2RlVHlwZSAmJlxuXG5cdFx0XHQvLyBTdXBwb3J0OiBGaXJlZm94IDw9NDJcblx0XHRcdC8vIFN1cHByZXNzIHNwZWMtdmlvbGF0aW5nIGNsaWNrcyBpbmRpY2F0aW5nIGEgbm9uLXByaW1hcnkgcG9pbnRlciBidXR0b24gKHRyYWMtMzg2MSlcblx0XHRcdC8vIGh0dHBzOi8vd3d3LnczLm9yZy9UUi9ET00tTGV2ZWwtMy1FdmVudHMvI2V2ZW50LXR5cGUtY2xpY2tcblx0XHRcdC8vIFN1cHBvcnQ6IElFIDExIG9ubHlcblx0XHRcdC8vIC4uLmJ1dCBub3QgYXJyb3cga2V5IFwiY2xpY2tzXCIgb2YgcmFkaW8gaW5wdXRzLCB3aGljaCBjYW4gaGF2ZSBgYnV0dG9uYCAtMSAoZ2gtMjM0Mylcblx0XHRcdCEoIGV2ZW50LnR5cGUgPT09IFwiY2xpY2tcIiAmJiBldmVudC5idXR0b24gPj0gMSApICkge1xuXG5cdFx0XHRmb3IgKCA7IGN1ciAhPT0gdGhpczsgY3VyID0gY3VyLnBhcmVudE5vZGUgfHwgdGhpcyApIHtcblxuXHRcdFx0XHQvLyBEb24ndCBjaGVjayBub24tZWxlbWVudHMgKCMxMzIwOClcblx0XHRcdFx0Ly8gRG9uJ3QgcHJvY2VzcyBjbGlja3Mgb24gZGlzYWJsZWQgZWxlbWVudHMgKCM2OTExLCAjODE2NSwgIzExMzgyLCAjMTE3NjQpXG5cdFx0XHRcdGlmICggY3VyLm5vZGVUeXBlID09PSAxICYmICEoIGV2ZW50LnR5cGUgPT09IFwiY2xpY2tcIiAmJiBjdXIuZGlzYWJsZWQgPT09IHRydWUgKSApIHtcblx0XHRcdFx0XHRtYXRjaGVkSGFuZGxlcnMgPSBbXTtcblx0XHRcdFx0XHRtYXRjaGVkU2VsZWN0b3JzID0ge307XG5cdFx0XHRcdFx0Zm9yICggaSA9IDA7IGkgPCBkZWxlZ2F0ZUNvdW50OyBpKysgKSB7XG5cdFx0XHRcdFx0XHRoYW5kbGVPYmogPSBoYW5kbGVyc1sgaSBdO1xuXG5cdFx0XHRcdFx0XHQvLyBEb24ndCBjb25mbGljdCB3aXRoIE9iamVjdC5wcm90b3R5cGUgcHJvcGVydGllcyAoIzEzMjAzKVxuXHRcdFx0XHRcdFx0c2VsID0gaGFuZGxlT2JqLnNlbGVjdG9yICsgXCIgXCI7XG5cblx0XHRcdFx0XHRcdGlmICggbWF0Y2hlZFNlbGVjdG9yc1sgc2VsIF0gPT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHRcdFx0bWF0Y2hlZFNlbGVjdG9yc1sgc2VsIF0gPSBoYW5kbGVPYmoubmVlZHNDb250ZXh0ID9cblx0XHRcdFx0XHRcdFx0XHRqUXVlcnkoIHNlbCwgdGhpcyApLmluZGV4KCBjdXIgKSA+IC0xIDpcblx0XHRcdFx0XHRcdFx0XHRqUXVlcnkuZmluZCggc2VsLCB0aGlzLCBudWxsLCBbIGN1ciBdICkubGVuZ3RoO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKCBtYXRjaGVkU2VsZWN0b3JzWyBzZWwgXSApIHtcblx0XHRcdFx0XHRcdFx0bWF0Y2hlZEhhbmRsZXJzLnB1c2goIGhhbmRsZU9iaiApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoIG1hdGNoZWRIYW5kbGVycy5sZW5ndGggKSB7XG5cdFx0XHRcdFx0XHRoYW5kbGVyUXVldWUucHVzaCggeyBlbGVtOiBjdXIsIGhhbmRsZXJzOiBtYXRjaGVkSGFuZGxlcnMgfSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIEFkZCB0aGUgcmVtYWluaW5nIChkaXJlY3RseS1ib3VuZCkgaGFuZGxlcnNcblx0XHRjdXIgPSB0aGlzO1xuXHRcdGlmICggZGVsZWdhdGVDb3VudCA8IGhhbmRsZXJzLmxlbmd0aCApIHtcblx0XHRcdGhhbmRsZXJRdWV1ZS5wdXNoKCB7IGVsZW06IGN1ciwgaGFuZGxlcnM6IGhhbmRsZXJzLnNsaWNlKCBkZWxlZ2F0ZUNvdW50ICkgfSApO1xuXHRcdH1cblxuXHRcdHJldHVybiBoYW5kbGVyUXVldWU7XG5cdH0sXG5cblx0YWRkUHJvcDogZnVuY3Rpb24oIG5hbWUsIGhvb2sgKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KCBqUXVlcnkuRXZlbnQucHJvdG90eXBlLCBuYW1lLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuXG5cdFx0XHRnZXQ6IGpRdWVyeS5pc0Z1bmN0aW9uKCBob29rICkgP1xuXHRcdFx0XHRmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRpZiAoIHRoaXMub3JpZ2luYWxFdmVudCApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGhvb2soIHRoaXMub3JpZ2luYWxFdmVudCApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSA6XG5cdFx0XHRcdGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGlmICggdGhpcy5vcmlnaW5hbEV2ZW50ICkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5vcmlnaW5hbEV2ZW50WyBuYW1lIF07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXG5cdFx0XHRzZXQ6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KCB0aGlzLCBuYW1lLCB7XG5cdFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cdFx0XHRcdFx0d3JpdGFibGU6IHRydWUsXG5cdFx0XHRcdFx0dmFsdWU6IHZhbHVlXG5cdFx0XHRcdH0gKTtcblx0XHRcdH1cblx0XHR9ICk7XG5cdH0sXG5cblx0Zml4OiBmdW5jdGlvbiggb3JpZ2luYWxFdmVudCApIHtcblx0XHRyZXR1cm4gb3JpZ2luYWxFdmVudFsgalF1ZXJ5LmV4cGFuZG8gXSA/XG5cdFx0XHRvcmlnaW5hbEV2ZW50IDpcblx0XHRcdG5ldyBqUXVlcnkuRXZlbnQoIG9yaWdpbmFsRXZlbnQgKTtcblx0fSxcblxuXHRzcGVjaWFsOiB7XG5cdFx0bG9hZDoge1xuXG5cdFx0XHQvLyBQcmV2ZW50IHRyaWdnZXJlZCBpbWFnZS5sb2FkIGV2ZW50cyBmcm9tIGJ1YmJsaW5nIHRvIHdpbmRvdy5sb2FkXG5cdFx0XHRub0J1YmJsZTogdHJ1ZVxuXHRcdH0sXG5cdFx0Zm9jdXM6IHtcblxuXHRcdFx0Ly8gRmlyZSBuYXRpdmUgZXZlbnQgaWYgcG9zc2libGUgc28gYmx1ci9mb2N1cyBzZXF1ZW5jZSBpcyBjb3JyZWN0XG5cdFx0XHR0cmlnZ2VyOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKCB0aGlzICE9PSBzYWZlQWN0aXZlRWxlbWVudCgpICYmIHRoaXMuZm9jdXMgKSB7XG5cdFx0XHRcdFx0dGhpcy5mb2N1cygpO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGRlbGVnYXRlVHlwZTogXCJmb2N1c2luXCJcblx0XHR9LFxuXHRcdGJsdXI6IHtcblx0XHRcdHRyaWdnZXI6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoIHRoaXMgPT09IHNhZmVBY3RpdmVFbGVtZW50KCkgJiYgdGhpcy5ibHVyICkge1xuXHRcdFx0XHRcdHRoaXMuYmx1cigpO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGRlbGVnYXRlVHlwZTogXCJmb2N1c291dFwiXG5cdFx0fSxcblx0XHRjbGljazoge1xuXG5cdFx0XHQvLyBGb3IgY2hlY2tib3gsIGZpcmUgbmF0aXZlIGV2ZW50IHNvIGNoZWNrZWQgc3RhdGUgd2lsbCBiZSByaWdodFxuXHRcdFx0dHJpZ2dlcjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICggdGhpcy50eXBlID09PSBcImNoZWNrYm94XCIgJiYgdGhpcy5jbGljayAmJiBub2RlTmFtZSggdGhpcywgXCJpbnB1dFwiICkgKSB7XG5cdFx0XHRcdFx0dGhpcy5jbGljaygpO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblxuXHRcdFx0Ly8gRm9yIGNyb3NzLWJyb3dzZXIgY29uc2lzdGVuY3ksIGRvbid0IGZpcmUgbmF0aXZlIC5jbGljaygpIG9uIGxpbmtzXG5cdFx0XHRfZGVmYXVsdDogZnVuY3Rpb24oIGV2ZW50ICkge1xuXHRcdFx0XHRyZXR1cm4gbm9kZU5hbWUoIGV2ZW50LnRhcmdldCwgXCJhXCIgKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0YmVmb3JldW5sb2FkOiB7XG5cdFx0XHRwb3N0RGlzcGF0Y2g6IGZ1bmN0aW9uKCBldmVudCApIHtcblxuXHRcdFx0XHQvLyBTdXBwb3J0OiBGaXJlZm94IDIwK1xuXHRcdFx0XHQvLyBGaXJlZm94IGRvZXNuJ3QgYWxlcnQgaWYgdGhlIHJldHVyblZhbHVlIGZpZWxkIGlzIG5vdCBzZXQuXG5cdFx0XHRcdGlmICggZXZlbnQucmVzdWx0ICE9PSB1bmRlZmluZWQgJiYgZXZlbnQub3JpZ2luYWxFdmVudCApIHtcblx0XHRcdFx0XHRldmVudC5vcmlnaW5hbEV2ZW50LnJldHVyblZhbHVlID0gZXZlbnQucmVzdWx0O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59O1xuXG5qUXVlcnkucmVtb3ZlRXZlbnQgPSBmdW5jdGlvbiggZWxlbSwgdHlwZSwgaGFuZGxlICkge1xuXG5cdC8vIFRoaXMgXCJpZlwiIGlzIG5lZWRlZCBmb3IgcGxhaW4gb2JqZWN0c1xuXHRpZiAoIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lciApIHtcblx0XHRlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoIHR5cGUsIGhhbmRsZSApO1xuXHR9XG59O1xuXG5qUXVlcnkuRXZlbnQgPSBmdW5jdGlvbiggc3JjLCBwcm9wcyApIHtcblxuXHQvLyBBbGxvdyBpbnN0YW50aWF0aW9uIHdpdGhvdXQgdGhlICduZXcnIGtleXdvcmRcblx0aWYgKCAhKCB0aGlzIGluc3RhbmNlb2YgalF1ZXJ5LkV2ZW50ICkgKSB7XG5cdFx0cmV0dXJuIG5ldyBqUXVlcnkuRXZlbnQoIHNyYywgcHJvcHMgKTtcblx0fVxuXG5cdC8vIEV2ZW50IG9iamVjdFxuXHRpZiAoIHNyYyAmJiBzcmMudHlwZSApIHtcblx0XHR0aGlzLm9yaWdpbmFsRXZlbnQgPSBzcmM7XG5cdFx0dGhpcy50eXBlID0gc3JjLnR5cGU7XG5cblx0XHQvLyBFdmVudHMgYnViYmxpbmcgdXAgdGhlIGRvY3VtZW50IG1heSBoYXZlIGJlZW4gbWFya2VkIGFzIHByZXZlbnRlZFxuXHRcdC8vIGJ5IGEgaGFuZGxlciBsb3dlciBkb3duIHRoZSB0cmVlOyByZWZsZWN0IHRoZSBjb3JyZWN0IHZhbHVlLlxuXHRcdHRoaXMuaXNEZWZhdWx0UHJldmVudGVkID0gc3JjLmRlZmF1bHRQcmV2ZW50ZWQgfHxcblx0XHRcdFx0c3JjLmRlZmF1bHRQcmV2ZW50ZWQgPT09IHVuZGVmaW5lZCAmJlxuXG5cdFx0XHRcdC8vIFN1cHBvcnQ6IEFuZHJvaWQgPD0yLjMgb25seVxuXHRcdFx0XHRzcmMucmV0dXJuVmFsdWUgPT09IGZhbHNlID9cblx0XHRcdHJldHVyblRydWUgOlxuXHRcdFx0cmV0dXJuRmFsc2U7XG5cblx0XHQvLyBDcmVhdGUgdGFyZ2V0IHByb3BlcnRpZXNcblx0XHQvLyBTdXBwb3J0OiBTYWZhcmkgPD02IC0gNyBvbmx5XG5cdFx0Ly8gVGFyZ2V0IHNob3VsZCBub3QgYmUgYSB0ZXh0IG5vZGUgKCM1MDQsICMxMzE0Mylcblx0XHR0aGlzLnRhcmdldCA9ICggc3JjLnRhcmdldCAmJiBzcmMudGFyZ2V0Lm5vZGVUeXBlID09PSAzICkgP1xuXHRcdFx0c3JjLnRhcmdldC5wYXJlbnROb2RlIDpcblx0XHRcdHNyYy50YXJnZXQ7XG5cblx0XHR0aGlzLmN1cnJlbnRUYXJnZXQgPSBzcmMuY3VycmVudFRhcmdldDtcblx0XHR0aGlzLnJlbGF0ZWRUYXJnZXQgPSBzcmMucmVsYXRlZFRhcmdldDtcblxuXHQvLyBFdmVudCB0eXBlXG5cdH0gZWxzZSB7XG5cdFx0dGhpcy50eXBlID0gc3JjO1xuXHR9XG5cblx0Ly8gUHV0IGV4cGxpY2l0bHkgcHJvdmlkZWQgcHJvcGVydGllcyBvbnRvIHRoZSBldmVudCBvYmplY3Rcblx0aWYgKCBwcm9wcyApIHtcblx0XHRqUXVlcnkuZXh0ZW5kKCB0aGlzLCBwcm9wcyApO1xuXHR9XG5cblx0Ly8gQ3JlYXRlIGEgdGltZXN0YW1wIGlmIGluY29taW5nIGV2ZW50IGRvZXNuJ3QgaGF2ZSBvbmVcblx0dGhpcy50aW1lU3RhbXAgPSBzcmMgJiYgc3JjLnRpbWVTdGFtcCB8fCBqUXVlcnkubm93KCk7XG5cblx0Ly8gTWFyayBpdCBhcyBmaXhlZFxuXHR0aGlzWyBqUXVlcnkuZXhwYW5kbyBdID0gdHJ1ZTtcbn07XG5cbi8vIGpRdWVyeS5FdmVudCBpcyBiYXNlZCBvbiBET00zIEV2ZW50cyBhcyBzcGVjaWZpZWQgYnkgdGhlIEVDTUFTY3JpcHQgTGFuZ3VhZ2UgQmluZGluZ1xuLy8gaHR0cHM6Ly93d3cudzMub3JnL1RSLzIwMDMvV0QtRE9NLUxldmVsLTMtRXZlbnRzLTIwMDMwMzMxL2VjbWEtc2NyaXB0LWJpbmRpbmcuaHRtbFxualF1ZXJ5LkV2ZW50LnByb3RvdHlwZSA9IHtcblx0Y29uc3RydWN0b3I6IGpRdWVyeS5FdmVudCxcblx0aXNEZWZhdWx0UHJldmVudGVkOiByZXR1cm5GYWxzZSxcblx0aXNQcm9wYWdhdGlvblN0b3BwZWQ6IHJldHVybkZhbHNlLFxuXHRpc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZDogcmV0dXJuRmFsc2UsXG5cdGlzU2ltdWxhdGVkOiBmYWxzZSxcblxuXHRwcmV2ZW50RGVmYXVsdDogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGUgPSB0aGlzLm9yaWdpbmFsRXZlbnQ7XG5cblx0XHR0aGlzLmlzRGVmYXVsdFByZXZlbnRlZCA9IHJldHVyblRydWU7XG5cblx0XHRpZiAoIGUgJiYgIXRoaXMuaXNTaW11bGF0ZWQgKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0fVxuXHR9LFxuXHRzdG9wUHJvcGFnYXRpb246IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBlID0gdGhpcy5vcmlnaW5hbEV2ZW50O1xuXG5cdFx0dGhpcy5pc1Byb3BhZ2F0aW9uU3RvcHBlZCA9IHJldHVyblRydWU7XG5cblx0XHRpZiAoIGUgJiYgIXRoaXMuaXNTaW11bGF0ZWQgKSB7XG5cdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdH1cblx0fSxcblx0c3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgZSA9IHRoaXMub3JpZ2luYWxFdmVudDtcblxuXHRcdHRoaXMuaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQgPSByZXR1cm5UcnVlO1xuXG5cdFx0aWYgKCBlICYmICF0aGlzLmlzU2ltdWxhdGVkICkge1xuXHRcdFx0ZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcblx0XHR9XG5cblx0XHR0aGlzLnN0b3BQcm9wYWdhdGlvbigpO1xuXHR9XG59O1xuXG4vLyBJbmNsdWRlcyBhbGwgY29tbW9uIGV2ZW50IHByb3BzIGluY2x1ZGluZyBLZXlFdmVudCBhbmQgTW91c2VFdmVudCBzcGVjaWZpYyBwcm9wc1xualF1ZXJ5LmVhY2goIHtcblx0YWx0S2V5OiB0cnVlLFxuXHRidWJibGVzOiB0cnVlLFxuXHRjYW5jZWxhYmxlOiB0cnVlLFxuXHRjaGFuZ2VkVG91Y2hlczogdHJ1ZSxcblx0Y3RybEtleTogdHJ1ZSxcblx0ZGV0YWlsOiB0cnVlLFxuXHRldmVudFBoYXNlOiB0cnVlLFxuXHRtZXRhS2V5OiB0cnVlLFxuXHRwYWdlWDogdHJ1ZSxcblx0cGFnZVk6IHRydWUsXG5cdHNoaWZ0S2V5OiB0cnVlLFxuXHR2aWV3OiB0cnVlLFxuXHRcImNoYXJcIjogdHJ1ZSxcblx0Y2hhckNvZGU6IHRydWUsXG5cdGtleTogdHJ1ZSxcblx0a2V5Q29kZTogdHJ1ZSxcblx0YnV0dG9uOiB0cnVlLFxuXHRidXR0b25zOiB0cnVlLFxuXHRjbGllbnRYOiB0cnVlLFxuXHRjbGllbnRZOiB0cnVlLFxuXHRvZmZzZXRYOiB0cnVlLFxuXHRvZmZzZXRZOiB0cnVlLFxuXHRwb2ludGVySWQ6IHRydWUsXG5cdHBvaW50ZXJUeXBlOiB0cnVlLFxuXHRzY3JlZW5YOiB0cnVlLFxuXHRzY3JlZW5ZOiB0cnVlLFxuXHR0YXJnZXRUb3VjaGVzOiB0cnVlLFxuXHR0b0VsZW1lbnQ6IHRydWUsXG5cdHRvdWNoZXM6IHRydWUsXG5cblx0d2hpY2g6IGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHR2YXIgYnV0dG9uID0gZXZlbnQuYnV0dG9uO1xuXG5cdFx0Ly8gQWRkIHdoaWNoIGZvciBrZXkgZXZlbnRzXG5cdFx0aWYgKCBldmVudC53aGljaCA9PSBudWxsICYmIHJrZXlFdmVudC50ZXN0KCBldmVudC50eXBlICkgKSB7XG5cdFx0XHRyZXR1cm4gZXZlbnQuY2hhckNvZGUgIT0gbnVsbCA/IGV2ZW50LmNoYXJDb2RlIDogZXZlbnQua2V5Q29kZTtcblx0XHR9XG5cblx0XHQvLyBBZGQgd2hpY2ggZm9yIGNsaWNrOiAxID09PSBsZWZ0OyAyID09PSBtaWRkbGU7IDMgPT09IHJpZ2h0XG5cdFx0aWYgKCAhZXZlbnQud2hpY2ggJiYgYnV0dG9uICE9PSB1bmRlZmluZWQgJiYgcm1vdXNlRXZlbnQudGVzdCggZXZlbnQudHlwZSApICkge1xuXHRcdFx0aWYgKCBidXR0b24gJiAxICkge1xuXHRcdFx0XHRyZXR1cm4gMTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCBidXR0b24gJiAyICkge1xuXHRcdFx0XHRyZXR1cm4gMztcblx0XHRcdH1cblxuXHRcdFx0aWYgKCBidXR0b24gJiA0ICkge1xuXHRcdFx0XHRyZXR1cm4gMjtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIDA7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGV2ZW50LndoaWNoO1xuXHR9XG59LCBqUXVlcnkuZXZlbnQuYWRkUHJvcCApO1xuXG4vLyBDcmVhdGUgbW91c2VlbnRlci9sZWF2ZSBldmVudHMgdXNpbmcgbW91c2VvdmVyL291dCBhbmQgZXZlbnQtdGltZSBjaGVja3Ncbi8vIHNvIHRoYXQgZXZlbnQgZGVsZWdhdGlvbiB3b3JrcyBpbiBqUXVlcnkuXG4vLyBEbyB0aGUgc2FtZSBmb3IgcG9pbnRlcmVudGVyL3BvaW50ZXJsZWF2ZSBhbmQgcG9pbnRlcm92ZXIvcG9pbnRlcm91dFxuLy9cbi8vIFN1cHBvcnQ6IFNhZmFyaSA3IG9ubHlcbi8vIFNhZmFyaSBzZW5kcyBtb3VzZWVudGVyIHRvbyBvZnRlbjsgc2VlOlxuLy8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDcwMjU4XG4vLyBmb3IgdGhlIGRlc2NyaXB0aW9uIG9mIHRoZSBidWcgKGl0IGV4aXN0ZWQgaW4gb2xkZXIgQ2hyb21lIHZlcnNpb25zIGFzIHdlbGwpLlxualF1ZXJ5LmVhY2goIHtcblx0bW91c2VlbnRlcjogXCJtb3VzZW92ZXJcIixcblx0bW91c2VsZWF2ZTogXCJtb3VzZW91dFwiLFxuXHRwb2ludGVyZW50ZXI6IFwicG9pbnRlcm92ZXJcIixcblx0cG9pbnRlcmxlYXZlOiBcInBvaW50ZXJvdXRcIlxufSwgZnVuY3Rpb24oIG9yaWcsIGZpeCApIHtcblx0alF1ZXJ5LmV2ZW50LnNwZWNpYWxbIG9yaWcgXSA9IHtcblx0XHRkZWxlZ2F0ZVR5cGU6IGZpeCxcblx0XHRiaW5kVHlwZTogZml4LFxuXG5cdFx0aGFuZGxlOiBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdFx0XHR2YXIgcmV0LFxuXHRcdFx0XHR0YXJnZXQgPSB0aGlzLFxuXHRcdFx0XHRyZWxhdGVkID0gZXZlbnQucmVsYXRlZFRhcmdldCxcblx0XHRcdFx0aGFuZGxlT2JqID0gZXZlbnQuaGFuZGxlT2JqO1xuXG5cdFx0XHQvLyBGb3IgbW91c2VlbnRlci9sZWF2ZSBjYWxsIHRoZSBoYW5kbGVyIGlmIHJlbGF0ZWQgaXMgb3V0c2lkZSB0aGUgdGFyZ2V0LlxuXHRcdFx0Ly8gTkI6IE5vIHJlbGF0ZWRUYXJnZXQgaWYgdGhlIG1vdXNlIGxlZnQvZW50ZXJlZCB0aGUgYnJvd3NlciB3aW5kb3dcblx0XHRcdGlmICggIXJlbGF0ZWQgfHwgKCByZWxhdGVkICE9PSB0YXJnZXQgJiYgIWpRdWVyeS5jb250YWlucyggdGFyZ2V0LCByZWxhdGVkICkgKSApIHtcblx0XHRcdFx0ZXZlbnQudHlwZSA9IGhhbmRsZU9iai5vcmlnVHlwZTtcblx0XHRcdFx0cmV0ID0gaGFuZGxlT2JqLmhhbmRsZXIuYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuXHRcdFx0XHRldmVudC50eXBlID0gZml4O1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHJldDtcblx0XHR9XG5cdH07XG59ICk7XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblxuXHRvbjogZnVuY3Rpb24oIHR5cGVzLCBzZWxlY3RvciwgZGF0YSwgZm4gKSB7XG5cdFx0cmV0dXJuIG9uKCB0aGlzLCB0eXBlcywgc2VsZWN0b3IsIGRhdGEsIGZuICk7XG5cdH0sXG5cdG9uZTogZnVuY3Rpb24oIHR5cGVzLCBzZWxlY3RvciwgZGF0YSwgZm4gKSB7XG5cdFx0cmV0dXJuIG9uKCB0aGlzLCB0eXBlcywgc2VsZWN0b3IsIGRhdGEsIGZuLCAxICk7XG5cdH0sXG5cdG9mZjogZnVuY3Rpb24oIHR5cGVzLCBzZWxlY3RvciwgZm4gKSB7XG5cdFx0dmFyIGhhbmRsZU9iaiwgdHlwZTtcblx0XHRpZiAoIHR5cGVzICYmIHR5cGVzLnByZXZlbnREZWZhdWx0ICYmIHR5cGVzLmhhbmRsZU9iaiApIHtcblxuXHRcdFx0Ly8gKCBldmVudCApICBkaXNwYXRjaGVkIGpRdWVyeS5FdmVudFxuXHRcdFx0aGFuZGxlT2JqID0gdHlwZXMuaGFuZGxlT2JqO1xuXHRcdFx0alF1ZXJ5KCB0eXBlcy5kZWxlZ2F0ZVRhcmdldCApLm9mZihcblx0XHRcdFx0aGFuZGxlT2JqLm5hbWVzcGFjZSA/XG5cdFx0XHRcdFx0aGFuZGxlT2JqLm9yaWdUeXBlICsgXCIuXCIgKyBoYW5kbGVPYmoubmFtZXNwYWNlIDpcblx0XHRcdFx0XHRoYW5kbGVPYmoub3JpZ1R5cGUsXG5cdFx0XHRcdGhhbmRsZU9iai5zZWxlY3Rvcixcblx0XHRcdFx0aGFuZGxlT2JqLmhhbmRsZXJcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cdFx0aWYgKCB0eXBlb2YgdHlwZXMgPT09IFwib2JqZWN0XCIgKSB7XG5cblx0XHRcdC8vICggdHlwZXMtb2JqZWN0IFssIHNlbGVjdG9yXSApXG5cdFx0XHRmb3IgKCB0eXBlIGluIHR5cGVzICkge1xuXHRcdFx0XHR0aGlzLm9mZiggdHlwZSwgc2VsZWN0b3IsIHR5cGVzWyB0eXBlIF0gKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblx0XHRpZiAoIHNlbGVjdG9yID09PSBmYWxzZSB8fCB0eXBlb2Ygc2VsZWN0b3IgPT09IFwiZnVuY3Rpb25cIiApIHtcblxuXHRcdFx0Ly8gKCB0eXBlcyBbLCBmbl0gKVxuXHRcdFx0Zm4gPSBzZWxlY3Rvcjtcblx0XHRcdHNlbGVjdG9yID0gdW5kZWZpbmVkO1xuXHRcdH1cblx0XHRpZiAoIGZuID09PSBmYWxzZSApIHtcblx0XHRcdGZuID0gcmV0dXJuRmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0alF1ZXJ5LmV2ZW50LnJlbW92ZSggdGhpcywgdHlwZXMsIGZuLCBzZWxlY3RvciApO1xuXHRcdH0gKTtcblx0fVxufSApO1xuXG5cbnZhclxuXG5cdC8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cblxuXHQvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2VzbGludC9lc2xpbnQvaXNzdWVzLzMyMjlcblx0cnhodG1sVGFnID0gLzwoPyFhcmVhfGJyfGNvbHxlbWJlZHxocnxpbWd8aW5wdXR8bGlua3xtZXRhfHBhcmFtKSgoW2Etel1bXlxcL1xcMD5cXHgyMFxcdFxcclxcblxcZl0qKVtePl0qKVxcLz4vZ2ksXG5cblx0LyogZXNsaW50LWVuYWJsZSAqL1xuXG5cdC8vIFN1cHBvcnQ6IElFIDw9MTAgLSAxMSwgRWRnZSAxMiAtIDEzIG9ubHlcblx0Ly8gSW4gSUUvRWRnZSB1c2luZyByZWdleCBncm91cHMgaGVyZSBjYXVzZXMgc2V2ZXJlIHNsb3dkb3ducy5cblx0Ly8gU2VlIGh0dHBzOi8vY29ubmVjdC5taWNyb3NvZnQuY29tL0lFL2ZlZWRiYWNrL2RldGFpbHMvMTczNjUxMi9cblx0cm5vSW5uZXJodG1sID0gLzxzY3JpcHR8PHN0eWxlfDxsaW5rL2ksXG5cblx0Ly8gY2hlY2tlZD1cImNoZWNrZWRcIiBvciBjaGVja2VkXG5cdHJjaGVja2VkID0gL2NoZWNrZWRcXHMqKD86W149XXw9XFxzKi5jaGVja2VkLikvaSxcblx0cnNjcmlwdFR5cGVNYXNrZWQgPSAvXnRydWVcXC8oLiopLyxcblx0cmNsZWFuU2NyaXB0ID0gL15cXHMqPCEoPzpcXFtDREFUQVxcW3wtLSl8KD86XFxdXFxdfC0tKT5cXHMqJC9nO1xuXG4vLyBQcmVmZXIgYSB0Ym9keSBvdmVyIGl0cyBwYXJlbnQgdGFibGUgZm9yIGNvbnRhaW5pbmcgbmV3IHJvd3NcbmZ1bmN0aW9uIG1hbmlwdWxhdGlvblRhcmdldCggZWxlbSwgY29udGVudCApIHtcblx0aWYgKCBub2RlTmFtZSggZWxlbSwgXCJ0YWJsZVwiICkgJiZcblx0XHRub2RlTmFtZSggY29udGVudC5ub2RlVHlwZSAhPT0gMTEgPyBjb250ZW50IDogY29udGVudC5maXJzdENoaWxkLCBcInRyXCIgKSApIHtcblxuXHRcdHJldHVybiBqUXVlcnkoIFwiPnRib2R5XCIsIGVsZW0gKVsgMCBdIHx8IGVsZW07XG5cdH1cblxuXHRyZXR1cm4gZWxlbTtcbn1cblxuLy8gUmVwbGFjZS9yZXN0b3JlIHRoZSB0eXBlIGF0dHJpYnV0ZSBvZiBzY3JpcHQgZWxlbWVudHMgZm9yIHNhZmUgRE9NIG1hbmlwdWxhdGlvblxuZnVuY3Rpb24gZGlzYWJsZVNjcmlwdCggZWxlbSApIHtcblx0ZWxlbS50eXBlID0gKCBlbGVtLmdldEF0dHJpYnV0ZSggXCJ0eXBlXCIgKSAhPT0gbnVsbCApICsgXCIvXCIgKyBlbGVtLnR5cGU7XG5cdHJldHVybiBlbGVtO1xufVxuZnVuY3Rpb24gcmVzdG9yZVNjcmlwdCggZWxlbSApIHtcblx0dmFyIG1hdGNoID0gcnNjcmlwdFR5cGVNYXNrZWQuZXhlYyggZWxlbS50eXBlICk7XG5cblx0aWYgKCBtYXRjaCApIHtcblx0XHRlbGVtLnR5cGUgPSBtYXRjaFsgMSBdO1xuXHR9IGVsc2Uge1xuXHRcdGVsZW0ucmVtb3ZlQXR0cmlidXRlKCBcInR5cGVcIiApO1xuXHR9XG5cblx0cmV0dXJuIGVsZW07XG59XG5cbmZ1bmN0aW9uIGNsb25lQ29weUV2ZW50KCBzcmMsIGRlc3QgKSB7XG5cdHZhciBpLCBsLCB0eXBlLCBwZGF0YU9sZCwgcGRhdGFDdXIsIHVkYXRhT2xkLCB1ZGF0YUN1ciwgZXZlbnRzO1xuXG5cdGlmICggZGVzdC5ub2RlVHlwZSAhPT0gMSApIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvLyAxLiBDb3B5IHByaXZhdGUgZGF0YTogZXZlbnRzLCBoYW5kbGVycywgZXRjLlxuXHRpZiAoIGRhdGFQcml2Lmhhc0RhdGEoIHNyYyApICkge1xuXHRcdHBkYXRhT2xkID0gZGF0YVByaXYuYWNjZXNzKCBzcmMgKTtcblx0XHRwZGF0YUN1ciA9IGRhdGFQcml2LnNldCggZGVzdCwgcGRhdGFPbGQgKTtcblx0XHRldmVudHMgPSBwZGF0YU9sZC5ldmVudHM7XG5cblx0XHRpZiAoIGV2ZW50cyApIHtcblx0XHRcdGRlbGV0ZSBwZGF0YUN1ci5oYW5kbGU7XG5cdFx0XHRwZGF0YUN1ci5ldmVudHMgPSB7fTtcblxuXHRcdFx0Zm9yICggdHlwZSBpbiBldmVudHMgKSB7XG5cdFx0XHRcdGZvciAoIGkgPSAwLCBsID0gZXZlbnRzWyB0eXBlIF0ubGVuZ3RoOyBpIDwgbDsgaSsrICkge1xuXHRcdFx0XHRcdGpRdWVyeS5ldmVudC5hZGQoIGRlc3QsIHR5cGUsIGV2ZW50c1sgdHlwZSBdWyBpIF0gKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIDIuIENvcHkgdXNlciBkYXRhXG5cdGlmICggZGF0YVVzZXIuaGFzRGF0YSggc3JjICkgKSB7XG5cdFx0dWRhdGFPbGQgPSBkYXRhVXNlci5hY2Nlc3MoIHNyYyApO1xuXHRcdHVkYXRhQ3VyID0galF1ZXJ5LmV4dGVuZCgge30sIHVkYXRhT2xkICk7XG5cblx0XHRkYXRhVXNlci5zZXQoIGRlc3QsIHVkYXRhQ3VyICk7XG5cdH1cbn1cblxuLy8gRml4IElFIGJ1Z3MsIHNlZSBzdXBwb3J0IHRlc3RzXG5mdW5jdGlvbiBmaXhJbnB1dCggc3JjLCBkZXN0ICkge1xuXHR2YXIgbm9kZU5hbWUgPSBkZXN0Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG5cblx0Ly8gRmFpbHMgdG8gcGVyc2lzdCB0aGUgY2hlY2tlZCBzdGF0ZSBvZiBhIGNsb25lZCBjaGVja2JveCBvciByYWRpbyBidXR0b24uXG5cdGlmICggbm9kZU5hbWUgPT09IFwiaW5wdXRcIiAmJiByY2hlY2thYmxlVHlwZS50ZXN0KCBzcmMudHlwZSApICkge1xuXHRcdGRlc3QuY2hlY2tlZCA9IHNyYy5jaGVja2VkO1xuXG5cdC8vIEZhaWxzIHRvIHJldHVybiB0aGUgc2VsZWN0ZWQgb3B0aW9uIHRvIHRoZSBkZWZhdWx0IHNlbGVjdGVkIHN0YXRlIHdoZW4gY2xvbmluZyBvcHRpb25zXG5cdH0gZWxzZSBpZiAoIG5vZGVOYW1lID09PSBcImlucHV0XCIgfHwgbm9kZU5hbWUgPT09IFwidGV4dGFyZWFcIiApIHtcblx0XHRkZXN0LmRlZmF1bHRWYWx1ZSA9IHNyYy5kZWZhdWx0VmFsdWU7XG5cdH1cbn1cblxuZnVuY3Rpb24gZG9tTWFuaXAoIGNvbGxlY3Rpb24sIGFyZ3MsIGNhbGxiYWNrLCBpZ25vcmVkICkge1xuXG5cdC8vIEZsYXR0ZW4gYW55IG5lc3RlZCBhcnJheXNcblx0YXJncyA9IGNvbmNhdC5hcHBseSggW10sIGFyZ3MgKTtcblxuXHR2YXIgZnJhZ21lbnQsIGZpcnN0LCBzY3JpcHRzLCBoYXNTY3JpcHRzLCBub2RlLCBkb2MsXG5cdFx0aSA9IDAsXG5cdFx0bCA9IGNvbGxlY3Rpb24ubGVuZ3RoLFxuXHRcdGlOb0Nsb25lID0gbCAtIDEsXG5cdFx0dmFsdWUgPSBhcmdzWyAwIF0sXG5cdFx0aXNGdW5jdGlvbiA9IGpRdWVyeS5pc0Z1bmN0aW9uKCB2YWx1ZSApO1xuXG5cdC8vIFdlIGNhbid0IGNsb25lTm9kZSBmcmFnbWVudHMgdGhhdCBjb250YWluIGNoZWNrZWQsIGluIFdlYktpdFxuXHRpZiAoIGlzRnVuY3Rpb24gfHxcblx0XHRcdCggbCA+IDEgJiYgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmXG5cdFx0XHRcdCFzdXBwb3J0LmNoZWNrQ2xvbmUgJiYgcmNoZWNrZWQudGVzdCggdmFsdWUgKSApICkge1xuXHRcdHJldHVybiBjb2xsZWN0aW9uLmVhY2goIGZ1bmN0aW9uKCBpbmRleCApIHtcblx0XHRcdHZhciBzZWxmID0gY29sbGVjdGlvbi5lcSggaW5kZXggKTtcblx0XHRcdGlmICggaXNGdW5jdGlvbiApIHtcblx0XHRcdFx0YXJnc1sgMCBdID0gdmFsdWUuY2FsbCggdGhpcywgaW5kZXgsIHNlbGYuaHRtbCgpICk7XG5cdFx0XHR9XG5cdFx0XHRkb21NYW5pcCggc2VsZiwgYXJncywgY2FsbGJhY2ssIGlnbm9yZWQgKTtcblx0XHR9ICk7XG5cdH1cblxuXHRpZiAoIGwgKSB7XG5cdFx0ZnJhZ21lbnQgPSBidWlsZEZyYWdtZW50KCBhcmdzLCBjb2xsZWN0aW9uWyAwIF0ub3duZXJEb2N1bWVudCwgZmFsc2UsIGNvbGxlY3Rpb24sIGlnbm9yZWQgKTtcblx0XHRmaXJzdCA9IGZyYWdtZW50LmZpcnN0Q2hpbGQ7XG5cblx0XHRpZiAoIGZyYWdtZW50LmNoaWxkTm9kZXMubGVuZ3RoID09PSAxICkge1xuXHRcdFx0ZnJhZ21lbnQgPSBmaXJzdDtcblx0XHR9XG5cblx0XHQvLyBSZXF1aXJlIGVpdGhlciBuZXcgY29udGVudCBvciBhbiBpbnRlcmVzdCBpbiBpZ25vcmVkIGVsZW1lbnRzIHRvIGludm9rZSB0aGUgY2FsbGJhY2tcblx0XHRpZiAoIGZpcnN0IHx8IGlnbm9yZWQgKSB7XG5cdFx0XHRzY3JpcHRzID0galF1ZXJ5Lm1hcCggZ2V0QWxsKCBmcmFnbWVudCwgXCJzY3JpcHRcIiApLCBkaXNhYmxlU2NyaXB0ICk7XG5cdFx0XHRoYXNTY3JpcHRzID0gc2NyaXB0cy5sZW5ndGg7XG5cblx0XHRcdC8vIFVzZSB0aGUgb3JpZ2luYWwgZnJhZ21lbnQgZm9yIHRoZSBsYXN0IGl0ZW1cblx0XHRcdC8vIGluc3RlYWQgb2YgdGhlIGZpcnN0IGJlY2F1c2UgaXQgY2FuIGVuZCB1cFxuXHRcdFx0Ly8gYmVpbmcgZW1wdGllZCBpbmNvcnJlY3RseSBpbiBjZXJ0YWluIHNpdHVhdGlvbnMgKCM4MDcwKS5cblx0XHRcdGZvciAoIDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdFx0bm9kZSA9IGZyYWdtZW50O1xuXG5cdFx0XHRcdGlmICggaSAhPT0gaU5vQ2xvbmUgKSB7XG5cdFx0XHRcdFx0bm9kZSA9IGpRdWVyeS5jbG9uZSggbm9kZSwgdHJ1ZSwgdHJ1ZSApO1xuXG5cdFx0XHRcdFx0Ly8gS2VlcCByZWZlcmVuY2VzIHRvIGNsb25lZCBzY3JpcHRzIGZvciBsYXRlciByZXN0b3JhdGlvblxuXHRcdFx0XHRcdGlmICggaGFzU2NyaXB0cyApIHtcblxuXHRcdFx0XHRcdFx0Ly8gU3VwcG9ydDogQW5kcm9pZCA8PTQuMCBvbmx5LCBQaGFudG9tSlMgMSBvbmx5XG5cdFx0XHRcdFx0XHQvLyBwdXNoLmFwcGx5KF8sIGFycmF5bGlrZSkgdGhyb3dzIG9uIGFuY2llbnQgV2ViS2l0XG5cdFx0XHRcdFx0XHRqUXVlcnkubWVyZ2UoIHNjcmlwdHMsIGdldEFsbCggbm9kZSwgXCJzY3JpcHRcIiApICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y2FsbGJhY2suY2FsbCggY29sbGVjdGlvblsgaSBdLCBub2RlLCBpICk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICggaGFzU2NyaXB0cyApIHtcblx0XHRcdFx0ZG9jID0gc2NyaXB0c1sgc2NyaXB0cy5sZW5ndGggLSAxIF0ub3duZXJEb2N1bWVudDtcblxuXHRcdFx0XHQvLyBSZWVuYWJsZSBzY3JpcHRzXG5cdFx0XHRcdGpRdWVyeS5tYXAoIHNjcmlwdHMsIHJlc3RvcmVTY3JpcHQgKTtcblxuXHRcdFx0XHQvLyBFdmFsdWF0ZSBleGVjdXRhYmxlIHNjcmlwdHMgb24gZmlyc3QgZG9jdW1lbnQgaW5zZXJ0aW9uXG5cdFx0XHRcdGZvciAoIGkgPSAwOyBpIDwgaGFzU2NyaXB0czsgaSsrICkge1xuXHRcdFx0XHRcdG5vZGUgPSBzY3JpcHRzWyBpIF07XG5cdFx0XHRcdFx0aWYgKCByc2NyaXB0VHlwZS50ZXN0KCBub2RlLnR5cGUgfHwgXCJcIiApICYmXG5cdFx0XHRcdFx0XHQhZGF0YVByaXYuYWNjZXNzKCBub2RlLCBcImdsb2JhbEV2YWxcIiApICYmXG5cdFx0XHRcdFx0XHRqUXVlcnkuY29udGFpbnMoIGRvYywgbm9kZSApICkge1xuXG5cdFx0XHRcdFx0XHRpZiAoIG5vZGUuc3JjICkge1xuXG5cdFx0XHRcdFx0XHRcdC8vIE9wdGlvbmFsIEFKQVggZGVwZW5kZW5jeSwgYnV0IHdvbid0IHJ1biBzY3JpcHRzIGlmIG5vdCBwcmVzZW50XG5cdFx0XHRcdFx0XHRcdGlmICggalF1ZXJ5Ll9ldmFsVXJsICkge1xuXHRcdFx0XHRcdFx0XHRcdGpRdWVyeS5fZXZhbFVybCggbm9kZS5zcmMgKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0RE9NRXZhbCggbm9kZS50ZXh0Q29udGVudC5yZXBsYWNlKCByY2xlYW5TY3JpcHQsIFwiXCIgKSwgZG9jICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGNvbGxlY3Rpb247XG59XG5cbmZ1bmN0aW9uIHJlbW92ZSggZWxlbSwgc2VsZWN0b3IsIGtlZXBEYXRhICkge1xuXHR2YXIgbm9kZSxcblx0XHRub2RlcyA9IHNlbGVjdG9yID8galF1ZXJ5LmZpbHRlciggc2VsZWN0b3IsIGVsZW0gKSA6IGVsZW0sXG5cdFx0aSA9IDA7XG5cblx0Zm9yICggOyAoIG5vZGUgPSBub2Rlc1sgaSBdICkgIT0gbnVsbDsgaSsrICkge1xuXHRcdGlmICggIWtlZXBEYXRhICYmIG5vZGUubm9kZVR5cGUgPT09IDEgKSB7XG5cdFx0XHRqUXVlcnkuY2xlYW5EYXRhKCBnZXRBbGwoIG5vZGUgKSApO1xuXHRcdH1cblxuXHRcdGlmICggbm9kZS5wYXJlbnROb2RlICkge1xuXHRcdFx0aWYgKCBrZWVwRGF0YSAmJiBqUXVlcnkuY29udGFpbnMoIG5vZGUub3duZXJEb2N1bWVudCwgbm9kZSApICkge1xuXHRcdFx0XHRzZXRHbG9iYWxFdmFsKCBnZXRBbGwoIG5vZGUsIFwic2NyaXB0XCIgKSApO1xuXHRcdFx0fVxuXHRcdFx0bm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCBub2RlICk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGVsZW07XG59XG5cbmpRdWVyeS5leHRlbmQoIHtcblx0aHRtbFByZWZpbHRlcjogZnVuY3Rpb24oIGh0bWwgKSB7XG5cdFx0cmV0dXJuIGh0bWwucmVwbGFjZSggcnhodG1sVGFnLCBcIjwkMT48LyQyPlwiICk7XG5cdH0sXG5cblx0Y2xvbmU6IGZ1bmN0aW9uKCBlbGVtLCBkYXRhQW5kRXZlbnRzLCBkZWVwRGF0YUFuZEV2ZW50cyApIHtcblx0XHR2YXIgaSwgbCwgc3JjRWxlbWVudHMsIGRlc3RFbGVtZW50cyxcblx0XHRcdGNsb25lID0gZWxlbS5jbG9uZU5vZGUoIHRydWUgKSxcblx0XHRcdGluUGFnZSA9IGpRdWVyeS5jb250YWlucyggZWxlbS5vd25lckRvY3VtZW50LCBlbGVtICk7XG5cblx0XHQvLyBGaXggSUUgY2xvbmluZyBpc3N1ZXNcblx0XHRpZiAoICFzdXBwb3J0Lm5vQ2xvbmVDaGVja2VkICYmICggZWxlbS5ub2RlVHlwZSA9PT0gMSB8fCBlbGVtLm5vZGVUeXBlID09PSAxMSApICYmXG5cdFx0XHRcdCFqUXVlcnkuaXNYTUxEb2MoIGVsZW0gKSApIHtcblxuXHRcdFx0Ly8gV2UgZXNjaGV3IFNpenpsZSBoZXJlIGZvciBwZXJmb3JtYW5jZSByZWFzb25zOiBodHRwczovL2pzcGVyZi5jb20vZ2V0YWxsLXZzLXNpenpsZS8yXG5cdFx0XHRkZXN0RWxlbWVudHMgPSBnZXRBbGwoIGNsb25lICk7XG5cdFx0XHRzcmNFbGVtZW50cyA9IGdldEFsbCggZWxlbSApO1xuXG5cdFx0XHRmb3IgKCBpID0gMCwgbCA9IHNyY0VsZW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdFx0Zml4SW5wdXQoIHNyY0VsZW1lbnRzWyBpIF0sIGRlc3RFbGVtZW50c1sgaSBdICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gQ29weSB0aGUgZXZlbnRzIGZyb20gdGhlIG9yaWdpbmFsIHRvIHRoZSBjbG9uZVxuXHRcdGlmICggZGF0YUFuZEV2ZW50cyApIHtcblx0XHRcdGlmICggZGVlcERhdGFBbmRFdmVudHMgKSB7XG5cdFx0XHRcdHNyY0VsZW1lbnRzID0gc3JjRWxlbWVudHMgfHwgZ2V0QWxsKCBlbGVtICk7XG5cdFx0XHRcdGRlc3RFbGVtZW50cyA9IGRlc3RFbGVtZW50cyB8fCBnZXRBbGwoIGNsb25lICk7XG5cblx0XHRcdFx0Zm9yICggaSA9IDAsIGwgPSBzcmNFbGVtZW50cy5sZW5ndGg7IGkgPCBsOyBpKysgKSB7XG5cdFx0XHRcdFx0Y2xvbmVDb3B5RXZlbnQoIHNyY0VsZW1lbnRzWyBpIF0sIGRlc3RFbGVtZW50c1sgaSBdICk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNsb25lQ29weUV2ZW50KCBlbGVtLCBjbG9uZSApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFByZXNlcnZlIHNjcmlwdCBldmFsdWF0aW9uIGhpc3Rvcnlcblx0XHRkZXN0RWxlbWVudHMgPSBnZXRBbGwoIGNsb25lLCBcInNjcmlwdFwiICk7XG5cdFx0aWYgKCBkZXN0RWxlbWVudHMubGVuZ3RoID4gMCApIHtcblx0XHRcdHNldEdsb2JhbEV2YWwoIGRlc3RFbGVtZW50cywgIWluUGFnZSAmJiBnZXRBbGwoIGVsZW0sIFwic2NyaXB0XCIgKSApO1xuXHRcdH1cblxuXHRcdC8vIFJldHVybiB0aGUgY2xvbmVkIHNldFxuXHRcdHJldHVybiBjbG9uZTtcblx0fSxcblxuXHRjbGVhbkRhdGE6IGZ1bmN0aW9uKCBlbGVtcyApIHtcblx0XHR2YXIgZGF0YSwgZWxlbSwgdHlwZSxcblx0XHRcdHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbCxcblx0XHRcdGkgPSAwO1xuXG5cdFx0Zm9yICggOyAoIGVsZW0gPSBlbGVtc1sgaSBdICkgIT09IHVuZGVmaW5lZDsgaSsrICkge1xuXHRcdFx0aWYgKCBhY2NlcHREYXRhKCBlbGVtICkgKSB7XG5cdFx0XHRcdGlmICggKCBkYXRhID0gZWxlbVsgZGF0YVByaXYuZXhwYW5kbyBdICkgKSB7XG5cdFx0XHRcdFx0aWYgKCBkYXRhLmV2ZW50cyApIHtcblx0XHRcdFx0XHRcdGZvciAoIHR5cGUgaW4gZGF0YS5ldmVudHMgKSB7XG5cdFx0XHRcdFx0XHRcdGlmICggc3BlY2lhbFsgdHlwZSBdICkge1xuXHRcdFx0XHRcdFx0XHRcdGpRdWVyeS5ldmVudC5yZW1vdmUoIGVsZW0sIHR5cGUgKTtcblxuXHRcdFx0XHRcdFx0XHQvLyBUaGlzIGlzIGEgc2hvcnRjdXQgdG8gYXZvaWQgalF1ZXJ5LmV2ZW50LnJlbW92ZSdzIG92ZXJoZWFkXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0alF1ZXJ5LnJlbW92ZUV2ZW50KCBlbGVtLCB0eXBlLCBkYXRhLmhhbmRsZSApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gU3VwcG9ydDogQ2hyb21lIDw9MzUgLSA0NStcblx0XHRcdFx0XHQvLyBBc3NpZ24gdW5kZWZpbmVkIGluc3RlYWQgb2YgdXNpbmcgZGVsZXRlLCBzZWUgRGF0YSNyZW1vdmVcblx0XHRcdFx0XHRlbGVtWyBkYXRhUHJpdi5leHBhbmRvIF0gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCBlbGVtWyBkYXRhVXNlci5leHBhbmRvIF0gKSB7XG5cblx0XHRcdFx0XHQvLyBTdXBwb3J0OiBDaHJvbWUgPD0zNSAtIDQ1K1xuXHRcdFx0XHRcdC8vIEFzc2lnbiB1bmRlZmluZWQgaW5zdGVhZCBvZiB1c2luZyBkZWxldGUsIHNlZSBEYXRhI3JlbW92ZVxuXHRcdFx0XHRcdGVsZW1bIGRhdGFVc2VyLmV4cGFuZG8gXSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxufSApO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdGRldGFjaDogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHJldHVybiByZW1vdmUoIHRoaXMsIHNlbGVjdG9yLCB0cnVlICk7XG5cdH0sXG5cblx0cmVtb3ZlOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0cmV0dXJuIHJlbW92ZSggdGhpcywgc2VsZWN0b3IgKTtcblx0fSxcblxuXHR0ZXh0OiBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0cmV0dXJuIGFjY2VzcyggdGhpcywgZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdFx0cmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgP1xuXHRcdFx0XHRqUXVlcnkudGV4dCggdGhpcyApIDpcblx0XHRcdFx0dGhpcy5lbXB0eSgpLmVhY2goIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGlmICggdGhpcy5ub2RlVHlwZSA9PT0gMSB8fCB0aGlzLm5vZGVUeXBlID09PSAxMSB8fCB0aGlzLm5vZGVUeXBlID09PSA5ICkge1xuXHRcdFx0XHRcdFx0dGhpcy50ZXh0Q29udGVudCA9IHZhbHVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSApO1xuXHRcdH0sIG51bGwsIHZhbHVlLCBhcmd1bWVudHMubGVuZ3RoICk7XG5cdH0sXG5cblx0YXBwZW5kOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gZG9tTWFuaXAoIHRoaXMsIGFyZ3VtZW50cywgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRpZiAoIHRoaXMubm9kZVR5cGUgPT09IDEgfHwgdGhpcy5ub2RlVHlwZSA9PT0gMTEgfHwgdGhpcy5ub2RlVHlwZSA9PT0gOSApIHtcblx0XHRcdFx0dmFyIHRhcmdldCA9IG1hbmlwdWxhdGlvblRhcmdldCggdGhpcywgZWxlbSApO1xuXHRcdFx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoIGVsZW0gKTtcblx0XHRcdH1cblx0XHR9ICk7XG5cdH0sXG5cblx0cHJlcGVuZDogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGRvbU1hbmlwKCB0aGlzLCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0aWYgKCB0aGlzLm5vZGVUeXBlID09PSAxIHx8IHRoaXMubm9kZVR5cGUgPT09IDExIHx8IHRoaXMubm9kZVR5cGUgPT09IDkgKSB7XG5cdFx0XHRcdHZhciB0YXJnZXQgPSBtYW5pcHVsYXRpb25UYXJnZXQoIHRoaXMsIGVsZW0gKTtcblx0XHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZSggZWxlbSwgdGFyZ2V0LmZpcnN0Q2hpbGQgKTtcblx0XHRcdH1cblx0XHR9ICk7XG5cdH0sXG5cblx0YmVmb3JlOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gZG9tTWFuaXAoIHRoaXMsIGFyZ3VtZW50cywgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRpZiAoIHRoaXMucGFyZW50Tm9kZSApIHtcblx0XHRcdFx0dGhpcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZSggZWxlbSwgdGhpcyApO1xuXHRcdFx0fVxuXHRcdH0gKTtcblx0fSxcblxuXHRhZnRlcjogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGRvbU1hbmlwKCB0aGlzLCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0aWYgKCB0aGlzLnBhcmVudE5vZGUgKSB7XG5cdFx0XHRcdHRoaXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoIGVsZW0sIHRoaXMubmV4dFNpYmxpbmcgKTtcblx0XHRcdH1cblx0XHR9ICk7XG5cdH0sXG5cblx0ZW1wdHk6IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBlbGVtLFxuXHRcdFx0aSA9IDA7XG5cblx0XHRmb3IgKCA7ICggZWxlbSA9IHRoaXNbIGkgXSApICE9IG51bGw7IGkrKyApIHtcblx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcblxuXHRcdFx0XHQvLyBQcmV2ZW50IG1lbW9yeSBsZWFrc1xuXHRcdFx0XHRqUXVlcnkuY2xlYW5EYXRhKCBnZXRBbGwoIGVsZW0sIGZhbHNlICkgKTtcblxuXHRcdFx0XHQvLyBSZW1vdmUgYW55IHJlbWFpbmluZyBub2Rlc1xuXHRcdFx0XHRlbGVtLnRleHRDb250ZW50ID0gXCJcIjtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRjbG9uZTogZnVuY3Rpb24oIGRhdGFBbmRFdmVudHMsIGRlZXBEYXRhQW5kRXZlbnRzICkge1xuXHRcdGRhdGFBbmRFdmVudHMgPSBkYXRhQW5kRXZlbnRzID09IG51bGwgPyBmYWxzZSA6IGRhdGFBbmRFdmVudHM7XG5cdFx0ZGVlcERhdGFBbmRFdmVudHMgPSBkZWVwRGF0YUFuZEV2ZW50cyA9PSBudWxsID8gZGF0YUFuZEV2ZW50cyA6IGRlZXBEYXRhQW5kRXZlbnRzO1xuXG5cdFx0cmV0dXJuIHRoaXMubWFwKCBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBqUXVlcnkuY2xvbmUoIHRoaXMsIGRhdGFBbmRFdmVudHMsIGRlZXBEYXRhQW5kRXZlbnRzICk7XG5cdFx0fSApO1xuXHR9LFxuXG5cdGh0bWw6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRyZXR1cm4gYWNjZXNzKCB0aGlzLCBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0XHR2YXIgZWxlbSA9IHRoaXNbIDAgXSB8fCB7fSxcblx0XHRcdFx0aSA9IDAsXG5cdFx0XHRcdGwgPSB0aGlzLmxlbmd0aDtcblxuXHRcdFx0aWYgKCB2YWx1ZSA9PT0gdW5kZWZpbmVkICYmIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cdFx0XHRcdHJldHVybiBlbGVtLmlubmVySFRNTDtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU2VlIGlmIHdlIGNhbiB0YWtlIGEgc2hvcnRjdXQgYW5kIGp1c3QgdXNlIGlubmVySFRNTFxuXHRcdFx0aWYgKCB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgIXJub0lubmVyaHRtbC50ZXN0KCB2YWx1ZSApICYmXG5cdFx0XHRcdCF3cmFwTWFwWyAoIHJ0YWdOYW1lLmV4ZWMoIHZhbHVlICkgfHwgWyBcIlwiLCBcIlwiIF0gKVsgMSBdLnRvTG93ZXJDYXNlKCkgXSApIHtcblxuXHRcdFx0XHR2YWx1ZSA9IGpRdWVyeS5odG1sUHJlZmlsdGVyKCB2YWx1ZSApO1xuXG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Zm9yICggOyBpIDwgbDsgaSsrICkge1xuXHRcdFx0XHRcdFx0ZWxlbSA9IHRoaXNbIGkgXSB8fCB7fTtcblxuXHRcdFx0XHRcdFx0Ly8gUmVtb3ZlIGVsZW1lbnQgbm9kZXMgYW5kIHByZXZlbnQgbWVtb3J5IGxlYWtzXG5cdFx0XHRcdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cdFx0XHRcdFx0XHRcdGpRdWVyeS5jbGVhbkRhdGEoIGdldEFsbCggZWxlbSwgZmFsc2UgKSApO1xuXHRcdFx0XHRcdFx0XHRlbGVtLmlubmVySFRNTCA9IHZhbHVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGVsZW0gPSAwO1xuXG5cdFx0XHRcdC8vIElmIHVzaW5nIGlubmVySFRNTCB0aHJvd3MgYW4gZXhjZXB0aW9uLCB1c2UgdGhlIGZhbGxiYWNrIG1ldGhvZFxuXHRcdFx0XHR9IGNhdGNoICggZSApIHt9XG5cdFx0XHR9XG5cblx0XHRcdGlmICggZWxlbSApIHtcblx0XHRcdFx0dGhpcy5lbXB0eSgpLmFwcGVuZCggdmFsdWUgKTtcblx0XHRcdH1cblx0XHR9LCBudWxsLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCApO1xuXHR9LFxuXG5cdHJlcGxhY2VXaXRoOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgaWdub3JlZCA9IFtdO1xuXG5cdFx0Ly8gTWFrZSB0aGUgY2hhbmdlcywgcmVwbGFjaW5nIGVhY2ggbm9uLWlnbm9yZWQgY29udGV4dCBlbGVtZW50IHdpdGggdGhlIG5ldyBjb250ZW50XG5cdFx0cmV0dXJuIGRvbU1hbmlwKCB0aGlzLCBhcmd1bWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0dmFyIHBhcmVudCA9IHRoaXMucGFyZW50Tm9kZTtcblxuXHRcdFx0aWYgKCBqUXVlcnkuaW5BcnJheSggdGhpcywgaWdub3JlZCApIDwgMCApIHtcblx0XHRcdFx0alF1ZXJ5LmNsZWFuRGF0YSggZ2V0QWxsKCB0aGlzICkgKTtcblx0XHRcdFx0aWYgKCBwYXJlbnQgKSB7XG5cdFx0XHRcdFx0cGFyZW50LnJlcGxhY2VDaGlsZCggZWxlbSwgdGhpcyApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHQvLyBGb3JjZSBjYWxsYmFjayBpbnZvY2F0aW9uXG5cdFx0fSwgaWdub3JlZCApO1xuXHR9XG59ICk7XG5cbmpRdWVyeS5lYWNoKCB7XG5cdGFwcGVuZFRvOiBcImFwcGVuZFwiLFxuXHRwcmVwZW5kVG86IFwicHJlcGVuZFwiLFxuXHRpbnNlcnRCZWZvcmU6IFwiYmVmb3JlXCIsXG5cdGluc2VydEFmdGVyOiBcImFmdGVyXCIsXG5cdHJlcGxhY2VBbGw6IFwicmVwbGFjZVdpdGhcIlxufSwgZnVuY3Rpb24oIG5hbWUsIG9yaWdpbmFsICkge1xuXHRqUXVlcnkuZm5bIG5hbWUgXSA9IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHR2YXIgZWxlbXMsXG5cdFx0XHRyZXQgPSBbXSxcblx0XHRcdGluc2VydCA9IGpRdWVyeSggc2VsZWN0b3IgKSxcblx0XHRcdGxhc3QgPSBpbnNlcnQubGVuZ3RoIC0gMSxcblx0XHRcdGkgPSAwO1xuXG5cdFx0Zm9yICggOyBpIDw9IGxhc3Q7IGkrKyApIHtcblx0XHRcdGVsZW1zID0gaSA9PT0gbGFzdCA/IHRoaXMgOiB0aGlzLmNsb25lKCB0cnVlICk7XG5cdFx0XHRqUXVlcnkoIGluc2VydFsgaSBdIClbIG9yaWdpbmFsIF0oIGVsZW1zICk7XG5cblx0XHRcdC8vIFN1cHBvcnQ6IEFuZHJvaWQgPD00LjAgb25seSwgUGhhbnRvbUpTIDEgb25seVxuXHRcdFx0Ly8gLmdldCgpIGJlY2F1c2UgcHVzaC5hcHBseShfLCBhcnJheWxpa2UpIHRocm93cyBvbiBhbmNpZW50IFdlYktpdFxuXHRcdFx0cHVzaC5hcHBseSggcmV0LCBlbGVtcy5nZXQoKSApO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggcmV0ICk7XG5cdH07XG59ICk7XG52YXIgcm1hcmdpbiA9ICggL15tYXJnaW4vICk7XG5cbnZhciBybnVtbm9ucHggPSBuZXcgUmVnRXhwKCBcIl4oXCIgKyBwbnVtICsgXCIpKD8hcHgpW2EteiVdKyRcIiwgXCJpXCIgKTtcblxudmFyIGdldFN0eWxlcyA9IGZ1bmN0aW9uKCBlbGVtICkge1xuXG5cdFx0Ly8gU3VwcG9ydDogSUUgPD0xMSBvbmx5LCBGaXJlZm94IDw9MzAgKCMxNTA5OCwgIzE0MTUwKVxuXHRcdC8vIElFIHRocm93cyBvbiBlbGVtZW50cyBjcmVhdGVkIGluIHBvcHVwc1xuXHRcdC8vIEZGIG1lYW53aGlsZSB0aHJvd3Mgb24gZnJhbWUgZWxlbWVudHMgdGhyb3VnaCBcImRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGVcIlxuXHRcdHZhciB2aWV3ID0gZWxlbS5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3O1xuXG5cdFx0aWYgKCAhdmlldyB8fCAhdmlldy5vcGVuZXIgKSB7XG5cdFx0XHR2aWV3ID0gd2luZG93O1xuXHRcdH1cblxuXHRcdHJldHVybiB2aWV3LmdldENvbXB1dGVkU3R5bGUoIGVsZW0gKTtcblx0fTtcblxuXG5cbiggZnVuY3Rpb24oKSB7XG5cblx0Ly8gRXhlY3V0aW5nIGJvdGggcGl4ZWxQb3NpdGlvbiAmIGJveFNpemluZ1JlbGlhYmxlIHRlc3RzIHJlcXVpcmUgb25seSBvbmUgbGF5b3V0XG5cdC8vIHNvIHRoZXkncmUgZXhlY3V0ZWQgYXQgdGhlIHNhbWUgdGltZSB0byBzYXZlIHRoZSBzZWNvbmQgY29tcHV0YXRpb24uXG5cdGZ1bmN0aW9uIGNvbXB1dGVTdHlsZVRlc3RzKCkge1xuXG5cdFx0Ly8gVGhpcyBpcyBhIHNpbmdsZXRvbiwgd2UgbmVlZCB0byBleGVjdXRlIGl0IG9ubHkgb25jZVxuXHRcdGlmICggIWRpdiApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRkaXYuc3R5bGUuY3NzVGV4dCA9XG5cdFx0XHRcImJveC1zaXppbmc6Ym9yZGVyLWJveDtcIiArXG5cdFx0XHRcInBvc2l0aW9uOnJlbGF0aXZlO2Rpc3BsYXk6YmxvY2s7XCIgK1xuXHRcdFx0XCJtYXJnaW46YXV0bztib3JkZXI6MXB4O3BhZGRpbmc6MXB4O1wiICtcblx0XHRcdFwidG9wOjElO3dpZHRoOjUwJVwiO1xuXHRcdGRpdi5pbm5lckhUTUwgPSBcIlwiO1xuXHRcdGRvY3VtZW50RWxlbWVudC5hcHBlbmRDaGlsZCggY29udGFpbmVyICk7XG5cblx0XHR2YXIgZGl2U3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSggZGl2ICk7XG5cdFx0cGl4ZWxQb3NpdGlvblZhbCA9IGRpdlN0eWxlLnRvcCAhPT0gXCIxJVwiO1xuXG5cdFx0Ly8gU3VwcG9ydDogQW5kcm9pZCA0LjAgLSA0LjMgb25seSwgRmlyZWZveCA8PTMgLSA0NFxuXHRcdHJlbGlhYmxlTWFyZ2luTGVmdFZhbCA9IGRpdlN0eWxlLm1hcmdpbkxlZnQgPT09IFwiMnB4XCI7XG5cdFx0Ym94U2l6aW5nUmVsaWFibGVWYWwgPSBkaXZTdHlsZS53aWR0aCA9PT0gXCI1cHhcIjtcblxuXHRcdC8vIFN1cHBvcnQ6IElFIDkgb25seVxuXHRcdC8vIERldGVjdCBtaXNyZXBvcnRpbmcgb2YgY29udGVudCBkaW1lbnNpb25zIGZvciBib3JkZXItYm94IGVsZW1lbnRzIChnaC0zNjk5KVxuXHRcdGJvcmRlckJveFJlbGlhYmxlVmFsID0gZGl2U3R5bGUud2lkdGhbIDAgXSA9PT0gXCI1XCI7XG5cblx0XHQvLyBTdXBwb3J0OiBBbmRyb2lkIDQuMCAtIDQuMyBvbmx5XG5cdFx0Ly8gU29tZSBzdHlsZXMgY29tZSBiYWNrIHdpdGggcGVyY2VudGFnZSB2YWx1ZXMsIGV2ZW4gdGhvdWdoIHRoZXkgc2hvdWxkbid0XG5cdFx0ZGl2LnN0eWxlLm1hcmdpblJpZ2h0ID0gXCI1MCVcIjtcblx0XHRwaXhlbE1hcmdpblJpZ2h0VmFsID0gZGl2U3R5bGUubWFyZ2luUmlnaHQgPT09IFwiNXB4XCI7XG5cblx0XHRkb2N1bWVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoIGNvbnRhaW5lciApO1xuXG5cdFx0Ly8gTnVsbGlmeSB0aGUgZGl2IHNvIGl0IHdvdWxkbid0IGJlIHN0b3JlZCBpbiB0aGUgbWVtb3J5IGFuZFxuXHRcdC8vIGl0IHdpbGwgYWxzbyBiZSBhIHNpZ24gdGhhdCBjaGVja3MgYWxyZWFkeSBwZXJmb3JtZWRcblx0XHRkaXYgPSBudWxsO1xuXHR9XG5cblx0dmFyIHBpeGVsUG9zaXRpb25WYWwsIGJveFNpemluZ1JlbGlhYmxlVmFsLCBib3JkZXJCb3hSZWxpYWJsZVZhbCwgcGl4ZWxNYXJnaW5SaWdodFZhbCxcblx0XHRyZWxpYWJsZU1hcmdpbkxlZnRWYWwsXG5cdFx0Y29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJkaXZcIiApLFxuXHRcdGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwiZGl2XCIgKTtcblxuXHQvLyBGaW5pc2ggZWFybHkgaW4gbGltaXRlZCAobm9uLWJyb3dzZXIpIGVudmlyb25tZW50c1xuXHRpZiAoICFkaXYuc3R5bGUgKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gU3VwcG9ydDogSUUgPD05IC0gMTEgb25seVxuXHQvLyBTdHlsZSBvZiBjbG9uZWQgZWxlbWVudCBhZmZlY3RzIHNvdXJjZSBlbGVtZW50IGNsb25lZCAoIzg5MDgpXG5cdGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ2xpcCA9IFwiY29udGVudC1ib3hcIjtcblx0ZGl2LmNsb25lTm9kZSggdHJ1ZSApLnN0eWxlLmJhY2tncm91bmRDbGlwID0gXCJcIjtcblx0c3VwcG9ydC5jbGVhckNsb25lU3R5bGUgPSBkaXYuc3R5bGUuYmFja2dyb3VuZENsaXAgPT09IFwiY29udGVudC1ib3hcIjtcblxuXHRjb250YWluZXIuc3R5bGUuY3NzVGV4dCA9IFwiYm9yZGVyOjA7d2lkdGg6MTBweDtoZWlnaHQ6MDt0b3A6MDtsZWZ0Oi05OTk5cHg7XCIgK1xuXHRcdFwicGFkZGluZzowO21hcmdpbi10b3A6MXB4O3Bvc2l0aW9uOmFic29sdXRlXCI7XG5cdGNvbnRhaW5lci5hcHBlbmRDaGlsZCggZGl2ICk7XG5cblx0alF1ZXJ5LmV4dGVuZCggc3VwcG9ydCwge1xuXHRcdGJvcmRlckJveFJlbGlhYmxlOiBmdW5jdGlvbigpIHtcblx0XHRcdGNvbXB1dGVTdHlsZVRlc3RzKCk7XG5cdFx0XHRyZXR1cm4gYm9yZGVyQm94UmVsaWFibGVWYWw7XG5cdFx0fSxcblx0XHRib3hTaXppbmdSZWxpYWJsZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRjb21wdXRlU3R5bGVUZXN0cygpO1xuXHRcdFx0cmV0dXJuIGJveFNpemluZ1JlbGlhYmxlVmFsO1xuXHRcdH0sXG5cdFx0cGl4ZWxQb3NpdGlvbjogZnVuY3Rpb24oKSB7XG5cdFx0XHRjb21wdXRlU3R5bGVUZXN0cygpO1xuXHRcdFx0cmV0dXJuIHBpeGVsUG9zaXRpb25WYWw7XG5cdFx0fSxcblx0XHRwaXhlbE1hcmdpblJpZ2h0OiBmdW5jdGlvbigpIHtcblx0XHRcdGNvbXB1dGVTdHlsZVRlc3RzKCk7XG5cdFx0XHRyZXR1cm4gcGl4ZWxNYXJnaW5SaWdodFZhbDtcblx0XHR9LFxuXHRcdHJlbGlhYmxlTWFyZ2luTGVmdDogZnVuY3Rpb24oKSB7XG5cdFx0XHRjb21wdXRlU3R5bGVUZXN0cygpO1xuXHRcdFx0cmV0dXJuIHJlbGlhYmxlTWFyZ2luTGVmdFZhbDtcblx0XHR9XG5cdH0gKTtcbn0gKSgpO1xuXG5cbmZ1bmN0aW9uIGN1ckNTUyggZWxlbSwgbmFtZSwgY29tcHV0ZWQgKSB7XG5cdHZhciB3aWR0aCwgbWluV2lkdGgsIG1heFdpZHRoLCByZXQsXG5cblx0XHQvLyBTdXBwb3J0OiBGaXJlZm94IDUxK1xuXHRcdC8vIFJldHJpZXZpbmcgc3R5bGUgYmVmb3JlIGNvbXB1dGVkIHNvbWVob3dcblx0XHQvLyBmaXhlcyBhbiBpc3N1ZSB3aXRoIGdldHRpbmcgd3JvbmcgdmFsdWVzXG5cdFx0Ly8gb24gZGV0YWNoZWQgZWxlbWVudHNcblx0XHRzdHlsZSA9IGVsZW0uc3R5bGU7XG5cblx0Y29tcHV0ZWQgPSBjb21wdXRlZCB8fCBnZXRTdHlsZXMoIGVsZW0gKTtcblxuXHQvLyBnZXRQcm9wZXJ0eVZhbHVlIGlzIG5lZWRlZCBmb3I6XG5cdC8vICAgLmNzcygnZmlsdGVyJykgKElFIDkgb25seSwgIzEyNTM3KVxuXHQvLyAgIC5jc3MoJy0tY3VzdG9tUHJvcGVydHkpICgjMzE0NClcblx0aWYgKCBjb21wdXRlZCApIHtcblx0XHRyZXQgPSBjb21wdXRlZC5nZXRQcm9wZXJ0eVZhbHVlKCBuYW1lICkgfHwgY29tcHV0ZWRbIG5hbWUgXTtcblxuXHRcdGlmICggcmV0ID09PSBcIlwiICYmICFqUXVlcnkuY29udGFpbnMoIGVsZW0ub3duZXJEb2N1bWVudCwgZWxlbSApICkge1xuXHRcdFx0cmV0ID0galF1ZXJ5LnN0eWxlKCBlbGVtLCBuYW1lICk7XG5cdFx0fVxuXG5cdFx0Ly8gQSB0cmlidXRlIHRvIHRoZSBcImF3ZXNvbWUgaGFjayBieSBEZWFuIEVkd2FyZHNcIlxuXHRcdC8vIEFuZHJvaWQgQnJvd3NlciByZXR1cm5zIHBlcmNlbnRhZ2UgZm9yIHNvbWUgdmFsdWVzLFxuXHRcdC8vIGJ1dCB3aWR0aCBzZWVtcyB0byBiZSByZWxpYWJseSBwaXhlbHMuXG5cdFx0Ly8gVGhpcyBpcyBhZ2FpbnN0IHRoZSBDU1NPTSBkcmFmdCBzcGVjOlxuXHRcdC8vIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3NvbS8jcmVzb2x2ZWQtdmFsdWVzXG5cdFx0aWYgKCAhc3VwcG9ydC5waXhlbE1hcmdpblJpZ2h0KCkgJiYgcm51bW5vbnB4LnRlc3QoIHJldCApICYmIHJtYXJnaW4udGVzdCggbmFtZSApICkge1xuXG5cdFx0XHQvLyBSZW1lbWJlciB0aGUgb3JpZ2luYWwgdmFsdWVzXG5cdFx0XHR3aWR0aCA9IHN0eWxlLndpZHRoO1xuXHRcdFx0bWluV2lkdGggPSBzdHlsZS5taW5XaWR0aDtcblx0XHRcdG1heFdpZHRoID0gc3R5bGUubWF4V2lkdGg7XG5cblx0XHRcdC8vIFB1dCBpbiB0aGUgbmV3IHZhbHVlcyB0byBnZXQgYSBjb21wdXRlZCB2YWx1ZSBvdXRcblx0XHRcdHN0eWxlLm1pbldpZHRoID0gc3R5bGUubWF4V2lkdGggPSBzdHlsZS53aWR0aCA9IHJldDtcblx0XHRcdHJldCA9IGNvbXB1dGVkLndpZHRoO1xuXG5cdFx0XHQvLyBSZXZlcnQgdGhlIGNoYW5nZWQgdmFsdWVzXG5cdFx0XHRzdHlsZS53aWR0aCA9IHdpZHRoO1xuXHRcdFx0c3R5bGUubWluV2lkdGggPSBtaW5XaWR0aDtcblx0XHRcdHN0eWxlLm1heFdpZHRoID0gbWF4V2lkdGg7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHJldCAhPT0gdW5kZWZpbmVkID9cblxuXHRcdC8vIFN1cHBvcnQ6IElFIDw9OSAtIDExIG9ubHlcblx0XHQvLyBJRSByZXR1cm5zIHpJbmRleCB2YWx1ZSBhcyBhbiBpbnRlZ2VyLlxuXHRcdHJldCArIFwiXCIgOlxuXHRcdHJldDtcbn1cblxuXG5mdW5jdGlvbiBhZGRHZXRIb29rSWYoIGNvbmRpdGlvbkZuLCBob29rRm4gKSB7XG5cblx0Ly8gRGVmaW5lIHRoZSBob29rLCB3ZSdsbCBjaGVjayBvbiB0aGUgZmlyc3QgcnVuIGlmIGl0J3MgcmVhbGx5IG5lZWRlZC5cblx0cmV0dXJuIHtcblx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKCBjb25kaXRpb25GbigpICkge1xuXG5cdFx0XHRcdC8vIEhvb2sgbm90IG5lZWRlZCAob3IgaXQncyBub3QgcG9zc2libGUgdG8gdXNlIGl0IGR1ZVxuXHRcdFx0XHQvLyB0byBtaXNzaW5nIGRlcGVuZGVuY3kpLCByZW1vdmUgaXQuXG5cdFx0XHRcdGRlbGV0ZSB0aGlzLmdldDtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBIb29rIG5lZWRlZDsgcmVkZWZpbmUgaXQgc28gdGhhdCB0aGUgc3VwcG9ydCB0ZXN0IGlzIG5vdCBleGVjdXRlZCBhZ2Fpbi5cblx0XHRcdHJldHVybiAoIHRoaXMuZ2V0ID0gaG9va0ZuICkuYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuXHRcdH1cblx0fTtcbn1cblxuXG52YXJcblxuXHQvLyBTd2FwcGFibGUgaWYgZGlzcGxheSBpcyBub25lIG9yIHN0YXJ0cyB3aXRoIHRhYmxlXG5cdC8vIGV4Y2VwdCBcInRhYmxlXCIsIFwidGFibGUtY2VsbFwiLCBvciBcInRhYmxlLWNhcHRpb25cIlxuXHQvLyBTZWUgaGVyZSBmb3IgZGlzcGxheSB2YWx1ZXM6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvQ1NTL2Rpc3BsYXlcblx0cmRpc3BsYXlzd2FwID0gL14obm9uZXx0YWJsZSg/IS1jW2VhXSkuKykvLFxuXHRyY3VzdG9tUHJvcCA9IC9eLS0vLFxuXHRjc3NTaG93ID0geyBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLCB2aXNpYmlsaXR5OiBcImhpZGRlblwiLCBkaXNwbGF5OiBcImJsb2NrXCIgfSxcblx0Y3NzTm9ybWFsVHJhbnNmb3JtID0ge1xuXHRcdGxldHRlclNwYWNpbmc6IFwiMFwiLFxuXHRcdGZvbnRXZWlnaHQ6IFwiNDAwXCJcblx0fSxcblxuXHRjc3NQcmVmaXhlcyA9IFsgXCJXZWJraXRcIiwgXCJNb3pcIiwgXCJtc1wiIF0sXG5cdGVtcHR5U3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImRpdlwiICkuc3R5bGU7XG5cbi8vIFJldHVybiBhIGNzcyBwcm9wZXJ0eSBtYXBwZWQgdG8gYSBwb3RlbnRpYWxseSB2ZW5kb3IgcHJlZml4ZWQgcHJvcGVydHlcbmZ1bmN0aW9uIHZlbmRvclByb3BOYW1lKCBuYW1lICkge1xuXG5cdC8vIFNob3J0Y3V0IGZvciBuYW1lcyB0aGF0IGFyZSBub3QgdmVuZG9yIHByZWZpeGVkXG5cdGlmICggbmFtZSBpbiBlbXB0eVN0eWxlICkge1xuXHRcdHJldHVybiBuYW1lO1xuXHR9XG5cblx0Ly8gQ2hlY2sgZm9yIHZlbmRvciBwcmVmaXhlZCBuYW1lc1xuXHR2YXIgY2FwTmFtZSA9IG5hbWVbIDAgXS50b1VwcGVyQ2FzZSgpICsgbmFtZS5zbGljZSggMSApLFxuXHRcdGkgPSBjc3NQcmVmaXhlcy5sZW5ndGg7XG5cblx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0bmFtZSA9IGNzc1ByZWZpeGVzWyBpIF0gKyBjYXBOYW1lO1xuXHRcdGlmICggbmFtZSBpbiBlbXB0eVN0eWxlICkge1xuXHRcdFx0cmV0dXJuIG5hbWU7XG5cdFx0fVxuXHR9XG59XG5cbi8vIFJldHVybiBhIHByb3BlcnR5IG1hcHBlZCBhbG9uZyB3aGF0IGpRdWVyeS5jc3NQcm9wcyBzdWdnZXN0cyBvciB0b1xuLy8gYSB2ZW5kb3IgcHJlZml4ZWQgcHJvcGVydHkuXG5mdW5jdGlvbiBmaW5hbFByb3BOYW1lKCBuYW1lICkge1xuXHR2YXIgcmV0ID0galF1ZXJ5LmNzc1Byb3BzWyBuYW1lIF07XG5cdGlmICggIXJldCApIHtcblx0XHRyZXQgPSBqUXVlcnkuY3NzUHJvcHNbIG5hbWUgXSA9IHZlbmRvclByb3BOYW1lKCBuYW1lICkgfHwgbmFtZTtcblx0fVxuXHRyZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBzZXRQb3NpdGl2ZU51bWJlciggZWxlbSwgdmFsdWUsIHN1YnRyYWN0ICkge1xuXG5cdC8vIEFueSByZWxhdGl2ZSAoKy8tKSB2YWx1ZXMgaGF2ZSBhbHJlYWR5IGJlZW5cblx0Ly8gbm9ybWFsaXplZCBhdCB0aGlzIHBvaW50XG5cdHZhciBtYXRjaGVzID0gcmNzc051bS5leGVjKCB2YWx1ZSApO1xuXHRyZXR1cm4gbWF0Y2hlcyA/XG5cblx0XHQvLyBHdWFyZCBhZ2FpbnN0IHVuZGVmaW5lZCBcInN1YnRyYWN0XCIsIGUuZy4sIHdoZW4gdXNlZCBhcyBpbiBjc3NIb29rc1xuXHRcdE1hdGgubWF4KCAwLCBtYXRjaGVzWyAyIF0gLSAoIHN1YnRyYWN0IHx8IDAgKSApICsgKCBtYXRjaGVzWyAzIF0gfHwgXCJweFwiICkgOlxuXHRcdHZhbHVlO1xufVxuXG5mdW5jdGlvbiBib3hNb2RlbEFkanVzdG1lbnQoIGVsZW0sIGRpbWVuc2lvbiwgYm94LCBpc0JvcmRlckJveCwgc3R5bGVzLCBjb21wdXRlZFZhbCApIHtcblx0dmFyIGkgPSBkaW1lbnNpb24gPT09IFwid2lkdGhcIiA/IDEgOiAwLFxuXHRcdGV4dHJhID0gMCxcblx0XHRkZWx0YSA9IDA7XG5cblx0Ly8gQWRqdXN0bWVudCBtYXkgbm90IGJlIG5lY2Vzc2FyeVxuXHRpZiAoIGJveCA9PT0gKCBpc0JvcmRlckJveCA/IFwiYm9yZGVyXCIgOiBcImNvbnRlbnRcIiApICkge1xuXHRcdHJldHVybiAwO1xuXHR9XG5cblx0Zm9yICggOyBpIDwgNDsgaSArPSAyICkge1xuXG5cdFx0Ly8gQm90aCBib3ggbW9kZWxzIGV4Y2x1ZGUgbWFyZ2luXG5cdFx0aWYgKCBib3ggPT09IFwibWFyZ2luXCIgKSB7XG5cdFx0XHRkZWx0YSArPSBqUXVlcnkuY3NzKCBlbGVtLCBib3ggKyBjc3NFeHBhbmRbIGkgXSwgdHJ1ZSwgc3R5bGVzICk7XG5cdFx0fVxuXG5cdFx0Ly8gSWYgd2UgZ2V0IGhlcmUgd2l0aCBhIGNvbnRlbnQtYm94LCB3ZSdyZSBzZWVraW5nIFwicGFkZGluZ1wiIG9yIFwiYm9yZGVyXCIgb3IgXCJtYXJnaW5cIlxuXHRcdGlmICggIWlzQm9yZGVyQm94ICkge1xuXG5cdFx0XHQvLyBBZGQgcGFkZGluZ1xuXHRcdFx0ZGVsdGEgKz0galF1ZXJ5LmNzcyggZWxlbSwgXCJwYWRkaW5nXCIgKyBjc3NFeHBhbmRbIGkgXSwgdHJ1ZSwgc3R5bGVzICk7XG5cblx0XHRcdC8vIEZvciBcImJvcmRlclwiIG9yIFwibWFyZ2luXCIsIGFkZCBib3JkZXJcblx0XHRcdGlmICggYm94ICE9PSBcInBhZGRpbmdcIiApIHtcblx0XHRcdFx0ZGVsdGEgKz0galF1ZXJ5LmNzcyggZWxlbSwgXCJib3JkZXJcIiArIGNzc0V4cGFuZFsgaSBdICsgXCJXaWR0aFwiLCB0cnVlLCBzdHlsZXMgKTtcblxuXHRcdFx0Ly8gQnV0IHN0aWxsIGtlZXAgdHJhY2sgb2YgaXQgb3RoZXJ3aXNlXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRleHRyYSArPSBqUXVlcnkuY3NzKCBlbGVtLCBcImJvcmRlclwiICsgY3NzRXhwYW5kWyBpIF0gKyBcIldpZHRoXCIsIHRydWUsIHN0eWxlcyApO1xuXHRcdFx0fVxuXG5cdFx0Ly8gSWYgd2UgZ2V0IGhlcmUgd2l0aCBhIGJvcmRlci1ib3ggKGNvbnRlbnQgKyBwYWRkaW5nICsgYm9yZGVyKSwgd2UncmUgc2Vla2luZyBcImNvbnRlbnRcIiBvclxuXHRcdC8vIFwicGFkZGluZ1wiIG9yIFwibWFyZ2luXCJcblx0XHR9IGVsc2Uge1xuXG5cdFx0XHQvLyBGb3IgXCJjb250ZW50XCIsIHN1YnRyYWN0IHBhZGRpbmdcblx0XHRcdGlmICggYm94ID09PSBcImNvbnRlbnRcIiApIHtcblx0XHRcdFx0ZGVsdGEgLT0galF1ZXJ5LmNzcyggZWxlbSwgXCJwYWRkaW5nXCIgKyBjc3NFeHBhbmRbIGkgXSwgdHJ1ZSwgc3R5bGVzICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEZvciBcImNvbnRlbnRcIiBvciBcInBhZGRpbmdcIiwgc3VidHJhY3QgYm9yZGVyXG5cdFx0XHRpZiAoIGJveCAhPT0gXCJtYXJnaW5cIiApIHtcblx0XHRcdFx0ZGVsdGEgLT0galF1ZXJ5LmNzcyggZWxlbSwgXCJib3JkZXJcIiArIGNzc0V4cGFuZFsgaSBdICsgXCJXaWR0aFwiLCB0cnVlLCBzdHlsZXMgKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBBY2NvdW50IGZvciBwb3NpdGl2ZSBjb250ZW50LWJveCBzY3JvbGwgZ3V0dGVyIHdoZW4gcmVxdWVzdGVkIGJ5IHByb3ZpZGluZyBjb21wdXRlZFZhbFxuXHRpZiAoICFpc0JvcmRlckJveCAmJiBjb21wdXRlZFZhbCA+PSAwICkge1xuXG5cdFx0Ly8gb2Zmc2V0V2lkdGgvb2Zmc2V0SGVpZ2h0IGlzIGEgcm91bmRlZCBzdW0gb2YgY29udGVudCwgcGFkZGluZywgc2Nyb2xsIGd1dHRlciwgYW5kIGJvcmRlclxuXHRcdC8vIEFzc3VtaW5nIGludGVnZXIgc2Nyb2xsIGd1dHRlciwgc3VidHJhY3QgdGhlIHJlc3QgYW5kIHJvdW5kIGRvd25cblx0XHRkZWx0YSArPSBNYXRoLm1heCggMCwgTWF0aC5jZWlsKFxuXHRcdFx0ZWxlbVsgXCJvZmZzZXRcIiArIGRpbWVuc2lvblsgMCBdLnRvVXBwZXJDYXNlKCkgKyBkaW1lbnNpb24uc2xpY2UoIDEgKSBdIC1cblx0XHRcdGNvbXB1dGVkVmFsIC1cblx0XHRcdGRlbHRhIC1cblx0XHRcdGV4dHJhIC1cblx0XHRcdDAuNVxuXHRcdCkgKTtcblx0fVxuXG5cdHJldHVybiBkZWx0YTtcbn1cblxuZnVuY3Rpb24gZ2V0V2lkdGhPckhlaWdodCggZWxlbSwgZGltZW5zaW9uLCBleHRyYSApIHtcblxuXHQvLyBTdGFydCB3aXRoIGNvbXB1dGVkIHN0eWxlXG5cdHZhciBzdHlsZXMgPSBnZXRTdHlsZXMoIGVsZW0gKSxcblx0XHR2YWwgPSBjdXJDU1MoIGVsZW0sIGRpbWVuc2lvbiwgc3R5bGVzICksXG5cdFx0aXNCb3JkZXJCb3ggPSBqUXVlcnkuY3NzKCBlbGVtLCBcImJveFNpemluZ1wiLCBmYWxzZSwgc3R5bGVzICkgPT09IFwiYm9yZGVyLWJveFwiLFxuXHRcdHZhbHVlSXNCb3JkZXJCb3ggPSBpc0JvcmRlckJveDtcblxuXHQvLyBDb21wdXRlZCB1bml0IGlzIG5vdCBwaXhlbHMuIFN0b3AgaGVyZSBhbmQgcmV0dXJuLlxuXHRpZiAoIHJudW1ub25weC50ZXN0KCB2YWwgKSApIHtcblx0XHRyZXR1cm4gdmFsO1xuXHR9XG5cblx0Ly8gQ2hlY2sgZm9yIHN0eWxlIGluIGNhc2UgYSBicm93c2VyIHdoaWNoIHJldHVybnMgdW5yZWxpYWJsZSB2YWx1ZXNcblx0Ly8gZm9yIGdldENvbXB1dGVkU3R5bGUgc2lsZW50bHkgZmFsbHMgYmFjayB0byB0aGUgcmVsaWFibGUgZWxlbS5zdHlsZVxuXHR2YWx1ZUlzQm9yZGVyQm94ID0gdmFsdWVJc0JvcmRlckJveCAmJlxuXHRcdCggc3VwcG9ydC5ib3hTaXppbmdSZWxpYWJsZSgpIHx8IHZhbCA9PT0gZWxlbS5zdHlsZVsgZGltZW5zaW9uIF0gKTtcblxuXHQvLyBGYWxsIGJhY2sgdG8gb2Zmc2V0V2lkdGgvSGVpZ2h0IHdoZW4gdmFsdWUgaXMgXCJhdXRvXCJcblx0Ly8gVGhpcyBoYXBwZW5zIGZvciBpbmxpbmUgZWxlbWVudHMgd2l0aCBubyBleHBsaWNpdCBzZXR0aW5nIChnaC0zNTcxKVxuXHRpZiAoIHZhbCA9PT0gXCJhdXRvXCIgKSB7XG5cdFx0dmFsID0gZWxlbVsgXCJvZmZzZXRcIiArIGRpbWVuc2lvblsgMCBdLnRvVXBwZXJDYXNlKCkgKyBkaW1lbnNpb24uc2xpY2UoIDEgKSBdO1xuXHR9XG5cblx0Ly8gTm9ybWFsaXplIFwiXCIgYW5kIGF1dG9cblx0dmFsID0gcGFyc2VGbG9hdCggdmFsICkgfHwgMDtcblxuXHQvLyBBZGp1c3QgZm9yIHRoZSBlbGVtZW50J3MgYm94IG1vZGVsXG5cdHJldHVybiAoIHZhbCArXG5cdFx0Ym94TW9kZWxBZGp1c3RtZW50KFxuXHRcdFx0ZWxlbSxcblx0XHRcdGRpbWVuc2lvbixcblx0XHRcdGV4dHJhIHx8ICggaXNCb3JkZXJCb3ggPyBcImJvcmRlclwiIDogXCJjb250ZW50XCIgKSxcblx0XHRcdHZhbHVlSXNCb3JkZXJCb3gsXG5cdFx0XHRzdHlsZXMsXG5cblx0XHRcdC8vIFByb3ZpZGUgdGhlIGN1cnJlbnQgY29tcHV0ZWQgc2l6ZSB0byByZXF1ZXN0IHNjcm9sbCBndXR0ZXIgY2FsY3VsYXRpb24gKGdoLTM1ODkpXG5cdFx0XHR2YWxcblx0XHQpXG5cdCkgKyBcInB4XCI7XG59XG5cbmpRdWVyeS5leHRlbmQoIHtcblxuXHQvLyBBZGQgaW4gc3R5bGUgcHJvcGVydHkgaG9va3MgZm9yIG92ZXJyaWRpbmcgdGhlIGRlZmF1bHRcblx0Ly8gYmVoYXZpb3Igb2YgZ2V0dGluZyBhbmQgc2V0dGluZyBhIHN0eWxlIHByb3BlcnR5XG5cdGNzc0hvb2tzOiB7XG5cdFx0b3BhY2l0eToge1xuXHRcdFx0Z2V0OiBmdW5jdGlvbiggZWxlbSwgY29tcHV0ZWQgKSB7XG5cdFx0XHRcdGlmICggY29tcHV0ZWQgKSB7XG5cblx0XHRcdFx0XHQvLyBXZSBzaG91bGQgYWx3YXlzIGdldCBhIG51bWJlciBiYWNrIGZyb20gb3BhY2l0eVxuXHRcdFx0XHRcdHZhciByZXQgPSBjdXJDU1MoIGVsZW0sIFwib3BhY2l0eVwiICk7XG5cdFx0XHRcdFx0cmV0dXJuIHJldCA9PT0gXCJcIiA/IFwiMVwiIDogcmV0O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdC8vIERvbid0IGF1dG9tYXRpY2FsbHkgYWRkIFwicHhcIiB0byB0aGVzZSBwb3NzaWJseS11bml0bGVzcyBwcm9wZXJ0aWVzXG5cdGNzc051bWJlcjoge1xuXHRcdFwiYW5pbWF0aW9uSXRlcmF0aW9uQ291bnRcIjogdHJ1ZSxcblx0XHRcImNvbHVtbkNvdW50XCI6IHRydWUsXG5cdFx0XCJmaWxsT3BhY2l0eVwiOiB0cnVlLFxuXHRcdFwiZmxleEdyb3dcIjogdHJ1ZSxcblx0XHRcImZsZXhTaHJpbmtcIjogdHJ1ZSxcblx0XHRcImZvbnRXZWlnaHRcIjogdHJ1ZSxcblx0XHRcImxpbmVIZWlnaHRcIjogdHJ1ZSxcblx0XHRcIm9wYWNpdHlcIjogdHJ1ZSxcblx0XHRcIm9yZGVyXCI6IHRydWUsXG5cdFx0XCJvcnBoYW5zXCI6IHRydWUsXG5cdFx0XCJ3aWRvd3NcIjogdHJ1ZSxcblx0XHRcInpJbmRleFwiOiB0cnVlLFxuXHRcdFwiem9vbVwiOiB0cnVlXG5cdH0sXG5cblx0Ly8gQWRkIGluIHByb3BlcnRpZXMgd2hvc2UgbmFtZXMgeW91IHdpc2ggdG8gZml4IGJlZm9yZVxuXHQvLyBzZXR0aW5nIG9yIGdldHRpbmcgdGhlIHZhbHVlXG5cdGNzc1Byb3BzOiB7fSxcblxuXHQvLyBHZXQgYW5kIHNldCB0aGUgc3R5bGUgcHJvcGVydHkgb24gYSBET00gTm9kZVxuXHRzdHlsZTogZnVuY3Rpb24oIGVsZW0sIG5hbWUsIHZhbHVlLCBleHRyYSApIHtcblxuXHRcdC8vIERvbid0IHNldCBzdHlsZXMgb24gdGV4dCBhbmQgY29tbWVudCBub2Rlc1xuXHRcdGlmICggIWVsZW0gfHwgZWxlbS5ub2RlVHlwZSA9PT0gMyB8fCBlbGVtLm5vZGVUeXBlID09PSA4IHx8ICFlbGVtLnN0eWxlICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIE1ha2Ugc3VyZSB0aGF0IHdlJ3JlIHdvcmtpbmcgd2l0aCB0aGUgcmlnaHQgbmFtZVxuXHRcdHZhciByZXQsIHR5cGUsIGhvb2tzLFxuXHRcdFx0b3JpZ05hbWUgPSBqUXVlcnkuY2FtZWxDYXNlKCBuYW1lICksXG5cdFx0XHRpc0N1c3RvbVByb3AgPSByY3VzdG9tUHJvcC50ZXN0KCBuYW1lICksXG5cdFx0XHRzdHlsZSA9IGVsZW0uc3R5bGU7XG5cblx0XHQvLyBNYWtlIHN1cmUgdGhhdCB3ZSdyZSB3b3JraW5nIHdpdGggdGhlIHJpZ2h0IG5hbWUuIFdlIGRvbid0XG5cdFx0Ly8gd2FudCB0byBxdWVyeSB0aGUgdmFsdWUgaWYgaXQgaXMgYSBDU1MgY3VzdG9tIHByb3BlcnR5XG5cdFx0Ly8gc2luY2UgdGhleSBhcmUgdXNlci1kZWZpbmVkLlxuXHRcdGlmICggIWlzQ3VzdG9tUHJvcCApIHtcblx0XHRcdG5hbWUgPSBmaW5hbFByb3BOYW1lKCBvcmlnTmFtZSApO1xuXHRcdH1cblxuXHRcdC8vIEdldHMgaG9vayBmb3IgdGhlIHByZWZpeGVkIHZlcnNpb24sIHRoZW4gdW5wcmVmaXhlZCB2ZXJzaW9uXG5cdFx0aG9va3MgPSBqUXVlcnkuY3NzSG9va3NbIG5hbWUgXSB8fCBqUXVlcnkuY3NzSG9va3NbIG9yaWdOYW1lIF07XG5cblx0XHQvLyBDaGVjayBpZiB3ZSdyZSBzZXR0aW5nIGEgdmFsdWVcblx0XHRpZiAoIHZhbHVlICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHR0eXBlID0gdHlwZW9mIHZhbHVlO1xuXG5cdFx0XHQvLyBDb252ZXJ0IFwiKz1cIiBvciBcIi09XCIgdG8gcmVsYXRpdmUgbnVtYmVycyAoIzczNDUpXG5cdFx0XHRpZiAoIHR5cGUgPT09IFwic3RyaW5nXCIgJiYgKCByZXQgPSByY3NzTnVtLmV4ZWMoIHZhbHVlICkgKSAmJiByZXRbIDEgXSApIHtcblx0XHRcdFx0dmFsdWUgPSBhZGp1c3RDU1MoIGVsZW0sIG5hbWUsIHJldCApO1xuXG5cdFx0XHRcdC8vIEZpeGVzIGJ1ZyAjOTIzN1xuXHRcdFx0XHR0eXBlID0gXCJudW1iZXJcIjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gTWFrZSBzdXJlIHRoYXQgbnVsbCBhbmQgTmFOIHZhbHVlcyBhcmVuJ3Qgc2V0ICgjNzExNilcblx0XHRcdGlmICggdmFsdWUgPT0gbnVsbCB8fCB2YWx1ZSAhPT0gdmFsdWUgKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgYSBudW1iZXIgd2FzIHBhc3NlZCBpbiwgYWRkIHRoZSB1bml0IChleGNlcHQgZm9yIGNlcnRhaW4gQ1NTIHByb3BlcnRpZXMpXG5cdFx0XHRpZiAoIHR5cGUgPT09IFwibnVtYmVyXCIgKSB7XG5cdFx0XHRcdHZhbHVlICs9IHJldCAmJiByZXRbIDMgXSB8fCAoIGpRdWVyeS5jc3NOdW1iZXJbIG9yaWdOYW1lIF0gPyBcIlwiIDogXCJweFwiICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGJhY2tncm91bmQtKiBwcm9wcyBhZmZlY3Qgb3JpZ2luYWwgY2xvbmUncyB2YWx1ZXNcblx0XHRcdGlmICggIXN1cHBvcnQuY2xlYXJDbG9uZVN0eWxlICYmIHZhbHVlID09PSBcIlwiICYmIG5hbWUuaW5kZXhPZiggXCJiYWNrZ3JvdW5kXCIgKSA9PT0gMCApIHtcblx0XHRcdFx0c3R5bGVbIG5hbWUgXSA9IFwiaW5oZXJpdFwiO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBJZiBhIGhvb2sgd2FzIHByb3ZpZGVkLCB1c2UgdGhhdCB2YWx1ZSwgb3RoZXJ3aXNlIGp1c3Qgc2V0IHRoZSBzcGVjaWZpZWQgdmFsdWVcblx0XHRcdGlmICggIWhvb2tzIHx8ICEoIFwic2V0XCIgaW4gaG9va3MgKSB8fFxuXHRcdFx0XHQoIHZhbHVlID0gaG9va3Muc2V0KCBlbGVtLCB2YWx1ZSwgZXh0cmEgKSApICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdFx0aWYgKCBpc0N1c3RvbVByb3AgKSB7XG5cdFx0XHRcdFx0c3R5bGUuc2V0UHJvcGVydHkoIG5hbWUsIHZhbHVlICk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0c3R5bGVbIG5hbWUgXSA9IHZhbHVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHQvLyBJZiBhIGhvb2sgd2FzIHByb3ZpZGVkIGdldCB0aGUgbm9uLWNvbXB1dGVkIHZhbHVlIGZyb20gdGhlcmVcblx0XHRcdGlmICggaG9va3MgJiYgXCJnZXRcIiBpbiBob29rcyAmJlxuXHRcdFx0XHQoIHJldCA9IGhvb2tzLmdldCggZWxlbSwgZmFsc2UsIGV4dHJhICkgKSAhPT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRcdHJldHVybiByZXQ7XG5cdFx0XHR9XG5cblx0XHRcdC8vIE90aGVyd2lzZSBqdXN0IGdldCB0aGUgdmFsdWUgZnJvbSB0aGUgc3R5bGUgb2JqZWN0XG5cdFx0XHRyZXR1cm4gc3R5bGVbIG5hbWUgXTtcblx0XHR9XG5cdH0sXG5cblx0Y3NzOiBmdW5jdGlvbiggZWxlbSwgbmFtZSwgZXh0cmEsIHN0eWxlcyApIHtcblx0XHR2YXIgdmFsLCBudW0sIGhvb2tzLFxuXHRcdFx0b3JpZ05hbWUgPSBqUXVlcnkuY2FtZWxDYXNlKCBuYW1lICksXG5cdFx0XHRpc0N1c3RvbVByb3AgPSByY3VzdG9tUHJvcC50ZXN0KCBuYW1lICk7XG5cblx0XHQvLyBNYWtlIHN1cmUgdGhhdCB3ZSdyZSB3b3JraW5nIHdpdGggdGhlIHJpZ2h0IG5hbWUuIFdlIGRvbid0XG5cdFx0Ly8gd2FudCB0byBtb2RpZnkgdGhlIHZhbHVlIGlmIGl0IGlzIGEgQ1NTIGN1c3RvbSBwcm9wZXJ0eVxuXHRcdC8vIHNpbmNlIHRoZXkgYXJlIHVzZXItZGVmaW5lZC5cblx0XHRpZiAoICFpc0N1c3RvbVByb3AgKSB7XG5cdFx0XHRuYW1lID0gZmluYWxQcm9wTmFtZSggb3JpZ05hbWUgKTtcblx0XHR9XG5cblx0XHQvLyBUcnkgcHJlZml4ZWQgbmFtZSBmb2xsb3dlZCBieSB0aGUgdW5wcmVmaXhlZCBuYW1lXG5cdFx0aG9va3MgPSBqUXVlcnkuY3NzSG9va3NbIG5hbWUgXSB8fCBqUXVlcnkuY3NzSG9va3NbIG9yaWdOYW1lIF07XG5cblx0XHQvLyBJZiBhIGhvb2sgd2FzIHByb3ZpZGVkIGdldCB0aGUgY29tcHV0ZWQgdmFsdWUgZnJvbSB0aGVyZVxuXHRcdGlmICggaG9va3MgJiYgXCJnZXRcIiBpbiBob29rcyApIHtcblx0XHRcdHZhbCA9IGhvb2tzLmdldCggZWxlbSwgdHJ1ZSwgZXh0cmEgKTtcblx0XHR9XG5cblx0XHQvLyBPdGhlcndpc2UsIGlmIGEgd2F5IHRvIGdldCB0aGUgY29tcHV0ZWQgdmFsdWUgZXhpc3RzLCB1c2UgdGhhdFxuXHRcdGlmICggdmFsID09PSB1bmRlZmluZWQgKSB7XG5cdFx0XHR2YWwgPSBjdXJDU1MoIGVsZW0sIG5hbWUsIHN0eWxlcyApO1xuXHRcdH1cblxuXHRcdC8vIENvbnZlcnQgXCJub3JtYWxcIiB0byBjb21wdXRlZCB2YWx1ZVxuXHRcdGlmICggdmFsID09PSBcIm5vcm1hbFwiICYmIG5hbWUgaW4gY3NzTm9ybWFsVHJhbnNmb3JtICkge1xuXHRcdFx0dmFsID0gY3NzTm9ybWFsVHJhbnNmb3JtWyBuYW1lIF07XG5cdFx0fVxuXG5cdFx0Ly8gTWFrZSBudW1lcmljIGlmIGZvcmNlZCBvciBhIHF1YWxpZmllciB3YXMgcHJvdmlkZWQgYW5kIHZhbCBsb29rcyBudW1lcmljXG5cdFx0aWYgKCBleHRyYSA9PT0gXCJcIiB8fCBleHRyYSApIHtcblx0XHRcdG51bSA9IHBhcnNlRmxvYXQoIHZhbCApO1xuXHRcdFx0cmV0dXJuIGV4dHJhID09PSB0cnVlIHx8IGlzRmluaXRlKCBudW0gKSA/IG51bSB8fCAwIDogdmFsO1xuXHRcdH1cblxuXHRcdHJldHVybiB2YWw7XG5cdH1cbn0gKTtcblxualF1ZXJ5LmVhY2goIFsgXCJoZWlnaHRcIiwgXCJ3aWR0aFwiIF0sIGZ1bmN0aW9uKCBpLCBkaW1lbnNpb24gKSB7XG5cdGpRdWVyeS5jc3NIb29rc1sgZGltZW5zaW9uIF0gPSB7XG5cdFx0Z2V0OiBmdW5jdGlvbiggZWxlbSwgY29tcHV0ZWQsIGV4dHJhICkge1xuXHRcdFx0aWYgKCBjb21wdXRlZCApIHtcblxuXHRcdFx0XHQvLyBDZXJ0YWluIGVsZW1lbnRzIGNhbiBoYXZlIGRpbWVuc2lvbiBpbmZvIGlmIHdlIGludmlzaWJseSBzaG93IHRoZW1cblx0XHRcdFx0Ly8gYnV0IGl0IG11c3QgaGF2ZSBhIGN1cnJlbnQgZGlzcGxheSBzdHlsZSB0aGF0IHdvdWxkIGJlbmVmaXRcblx0XHRcdFx0cmV0dXJuIHJkaXNwbGF5c3dhcC50ZXN0KCBqUXVlcnkuY3NzKCBlbGVtLCBcImRpc3BsYXlcIiApICkgJiZcblxuXHRcdFx0XHRcdC8vIFN1cHBvcnQ6IFNhZmFyaSA4K1xuXHRcdFx0XHRcdC8vIFRhYmxlIGNvbHVtbnMgaW4gU2FmYXJpIGhhdmUgbm9uLXplcm8gb2Zmc2V0V2lkdGggJiB6ZXJvXG5cdFx0XHRcdFx0Ly8gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGggdW5sZXNzIGRpc3BsYXkgaXMgY2hhbmdlZC5cblx0XHRcdFx0XHQvLyBTdXBwb3J0OiBJRSA8PTExIG9ubHlcblx0XHRcdFx0XHQvLyBSdW5uaW5nIGdldEJvdW5kaW5nQ2xpZW50UmVjdCBvbiBhIGRpc2Nvbm5lY3RlZCBub2RlXG5cdFx0XHRcdFx0Ly8gaW4gSUUgdGhyb3dzIGFuIGVycm9yLlxuXHRcdFx0XHRcdCggIWVsZW0uZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGggfHwgIWVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGggKSA/XG5cdFx0XHRcdFx0XHRzd2FwKCBlbGVtLCBjc3NTaG93LCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGdldFdpZHRoT3JIZWlnaHQoIGVsZW0sIGRpbWVuc2lvbiwgZXh0cmEgKTtcblx0XHRcdFx0XHRcdH0gKSA6XG5cdFx0XHRcdFx0XHRnZXRXaWR0aE9ySGVpZ2h0KCBlbGVtLCBkaW1lbnNpb24sIGV4dHJhICk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdHNldDogZnVuY3Rpb24oIGVsZW0sIHZhbHVlLCBleHRyYSApIHtcblx0XHRcdHZhciBtYXRjaGVzLFxuXHRcdFx0XHRzdHlsZXMgPSBnZXRTdHlsZXMoIGVsZW0gKSxcblx0XHRcdFx0aXNCb3JkZXJCb3ggPSBqUXVlcnkuY3NzKCBlbGVtLCBcImJveFNpemluZ1wiLCBmYWxzZSwgc3R5bGVzICkgPT09IFwiYm9yZGVyLWJveFwiLFxuXHRcdFx0XHRzdWJ0cmFjdCA9IGV4dHJhICYmIGJveE1vZGVsQWRqdXN0bWVudChcblx0XHRcdFx0XHRlbGVtLFxuXHRcdFx0XHRcdGRpbWVuc2lvbixcblx0XHRcdFx0XHRleHRyYSxcblx0XHRcdFx0XHRpc0JvcmRlckJveCxcblx0XHRcdFx0XHRzdHlsZXNcblx0XHRcdFx0KTtcblxuXHRcdFx0Ly8gQWNjb3VudCBmb3IgdW5yZWxpYWJsZSBib3JkZXItYm94IGRpbWVuc2lvbnMgYnkgY29tcGFyaW5nIG9mZnNldCogdG8gY29tcHV0ZWQgYW5kXG5cdFx0XHQvLyBmYWtpbmcgYSBjb250ZW50LWJveCB0byBnZXQgYm9yZGVyIGFuZCBwYWRkaW5nIChnaC0zNjk5KVxuXHRcdFx0aWYgKCBpc0JvcmRlckJveCAmJiAhc3VwcG9ydC5ib3JkZXJCb3hSZWxpYWJsZSgpICkge1xuXHRcdFx0XHRzdWJ0cmFjdCAtPSBNYXRoLmNlaWwoXG5cdFx0XHRcdFx0ZWxlbVsgXCJvZmZzZXRcIiArIGRpbWVuc2lvblsgMCBdLnRvVXBwZXJDYXNlKCkgKyBkaW1lbnNpb24uc2xpY2UoIDEgKSBdIC1cblx0XHRcdFx0XHRwYXJzZUZsb2F0KCBzdHlsZXNbIGRpbWVuc2lvbiBdICkgLVxuXHRcdFx0XHRcdGJveE1vZGVsQWRqdXN0bWVudCggZWxlbSwgZGltZW5zaW9uLCBcImJvcmRlclwiLCBmYWxzZSwgc3R5bGVzICkgLVxuXHRcdFx0XHRcdDAuNVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDb252ZXJ0IHRvIHBpeGVscyBpZiB2YWx1ZSBhZGp1c3RtZW50IGlzIG5lZWRlZFxuXHRcdFx0aWYgKCBzdWJ0cmFjdCAmJiAoIG1hdGNoZXMgPSByY3NzTnVtLmV4ZWMoIHZhbHVlICkgKSAmJlxuXHRcdFx0XHQoIG1hdGNoZXNbIDMgXSB8fCBcInB4XCIgKSAhPT0gXCJweFwiICkge1xuXG5cdFx0XHRcdGVsZW0uc3R5bGVbIGRpbWVuc2lvbiBdID0gdmFsdWU7XG5cdFx0XHRcdHZhbHVlID0galF1ZXJ5LmNzcyggZWxlbSwgZGltZW5zaW9uICk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBzZXRQb3NpdGl2ZU51bWJlciggZWxlbSwgdmFsdWUsIHN1YnRyYWN0ICk7XG5cdFx0fVxuXHR9O1xufSApO1xuXG5qUXVlcnkuY3NzSG9va3MubWFyZ2luTGVmdCA9IGFkZEdldEhvb2tJZiggc3VwcG9ydC5yZWxpYWJsZU1hcmdpbkxlZnQsXG5cdGZ1bmN0aW9uKCBlbGVtLCBjb21wdXRlZCApIHtcblx0XHRpZiAoIGNvbXB1dGVkICkge1xuXHRcdFx0cmV0dXJuICggcGFyc2VGbG9hdCggY3VyQ1NTKCBlbGVtLCBcIm1hcmdpbkxlZnRcIiApICkgfHxcblx0XHRcdFx0ZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0IC1cblx0XHRcdFx0XHRzd2FwKCBlbGVtLCB7IG1hcmdpbkxlZnQ6IDAgfSwgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuXHRcdFx0XHRcdH0gKVxuXHRcdFx0XHQpICsgXCJweFwiO1xuXHRcdH1cblx0fVxuKTtcblxuLy8gVGhlc2UgaG9va3MgYXJlIHVzZWQgYnkgYW5pbWF0ZSB0byBleHBhbmQgcHJvcGVydGllc1xualF1ZXJ5LmVhY2goIHtcblx0bWFyZ2luOiBcIlwiLFxuXHRwYWRkaW5nOiBcIlwiLFxuXHRib3JkZXI6IFwiV2lkdGhcIlxufSwgZnVuY3Rpb24oIHByZWZpeCwgc3VmZml4ICkge1xuXHRqUXVlcnkuY3NzSG9va3NbIHByZWZpeCArIHN1ZmZpeCBdID0ge1xuXHRcdGV4cGFuZDogZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdFx0dmFyIGkgPSAwLFxuXHRcdFx0XHRleHBhbmRlZCA9IHt9LFxuXG5cdFx0XHRcdC8vIEFzc3VtZXMgYSBzaW5nbGUgbnVtYmVyIGlmIG5vdCBhIHN0cmluZ1xuXHRcdFx0XHRwYXJ0cyA9IHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiA/IHZhbHVlLnNwbGl0KCBcIiBcIiApIDogWyB2YWx1ZSBdO1xuXG5cdFx0XHRmb3IgKCA7IGkgPCA0OyBpKysgKSB7XG5cdFx0XHRcdGV4cGFuZGVkWyBwcmVmaXggKyBjc3NFeHBhbmRbIGkgXSArIHN1ZmZpeCBdID1cblx0XHRcdFx0XHRwYXJ0c1sgaSBdIHx8IHBhcnRzWyBpIC0gMiBdIHx8IHBhcnRzWyAwIF07XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBleHBhbmRlZDtcblx0XHR9XG5cdH07XG5cblx0aWYgKCAhcm1hcmdpbi50ZXN0KCBwcmVmaXggKSApIHtcblx0XHRqUXVlcnkuY3NzSG9va3NbIHByZWZpeCArIHN1ZmZpeCBdLnNldCA9IHNldFBvc2l0aXZlTnVtYmVyO1xuXHR9XG59ICk7XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0Y3NzOiBmdW5jdGlvbiggbmFtZSwgdmFsdWUgKSB7XG5cdFx0cmV0dXJuIGFjY2VzcyggdGhpcywgZnVuY3Rpb24oIGVsZW0sIG5hbWUsIHZhbHVlICkge1xuXHRcdFx0dmFyIHN0eWxlcywgbGVuLFxuXHRcdFx0XHRtYXAgPSB7fSxcblx0XHRcdFx0aSA9IDA7XG5cblx0XHRcdGlmICggQXJyYXkuaXNBcnJheSggbmFtZSApICkge1xuXHRcdFx0XHRzdHlsZXMgPSBnZXRTdHlsZXMoIGVsZW0gKTtcblx0XHRcdFx0bGVuID0gbmFtZS5sZW5ndGg7XG5cblx0XHRcdFx0Zm9yICggOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0XHRcdFx0bWFwWyBuYW1lWyBpIF0gXSA9IGpRdWVyeS5jc3MoIGVsZW0sIG5hbWVbIGkgXSwgZmFsc2UsIHN0eWxlcyApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIG1hcDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQgP1xuXHRcdFx0XHRqUXVlcnkuc3R5bGUoIGVsZW0sIG5hbWUsIHZhbHVlICkgOlxuXHRcdFx0XHRqUXVlcnkuY3NzKCBlbGVtLCBuYW1lICk7XG5cdFx0fSwgbmFtZSwgdmFsdWUsIGFyZ3VtZW50cy5sZW5ndGggPiAxICk7XG5cdH1cbn0gKTtcblxuXG52YXIgYm9vbEhvb2ssXG5cdGF0dHJIYW5kbGUgPSBqUXVlcnkuZXhwci5hdHRySGFuZGxlO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdGF0dHI6IGZ1bmN0aW9uKCBuYW1lLCB2YWx1ZSApIHtcblx0XHRyZXR1cm4gYWNjZXNzKCB0aGlzLCBqUXVlcnkuYXR0ciwgbmFtZSwgdmFsdWUsIGFyZ3VtZW50cy5sZW5ndGggPiAxICk7XG5cdH0sXG5cblx0cmVtb3ZlQXR0cjogZnVuY3Rpb24oIG5hbWUgKSB7XG5cdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHRqUXVlcnkucmVtb3ZlQXR0ciggdGhpcywgbmFtZSApO1xuXHRcdH0gKTtcblx0fVxufSApO1xuXG5qUXVlcnkuZXh0ZW5kKCB7XG5cdGF0dHI6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCB2YWx1ZSApIHtcblx0XHR2YXIgcmV0LCBob29rcyxcblx0XHRcdG5UeXBlID0gZWxlbS5ub2RlVHlwZTtcblxuXHRcdC8vIERvbid0IGdldC9zZXQgYXR0cmlidXRlcyBvbiB0ZXh0LCBjb21tZW50IGFuZCBhdHRyaWJ1dGUgbm9kZXNcblx0XHRpZiAoIG5UeXBlID09PSAzIHx8IG5UeXBlID09PSA4IHx8IG5UeXBlID09PSAyICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIEZhbGxiYWNrIHRvIHByb3Agd2hlbiBhdHRyaWJ1dGVzIGFyZSBub3Qgc3VwcG9ydGVkXG5cdFx0aWYgKCB0eXBlb2YgZWxlbS5nZXRBdHRyaWJ1dGUgPT09IFwidW5kZWZpbmVkXCIgKSB7XG5cdFx0XHRyZXR1cm4galF1ZXJ5LnByb3AoIGVsZW0sIG5hbWUsIHZhbHVlICk7XG5cdFx0fVxuXG5cdFx0Ly8gQXR0cmlidXRlIGhvb2tzIGFyZSBkZXRlcm1pbmVkIGJ5IHRoZSBsb3dlcmNhc2UgdmVyc2lvblxuXHRcdC8vIEdyYWIgbmVjZXNzYXJ5IGhvb2sgaWYgb25lIGlzIGRlZmluZWRcblx0XHRpZiAoIG5UeXBlICE9PSAxIHx8ICFqUXVlcnkuaXNYTUxEb2MoIGVsZW0gKSApIHtcblx0XHRcdGhvb2tzID0galF1ZXJ5LmF0dHJIb29rc1sgbmFtZS50b0xvd2VyQ2FzZSgpIF0gfHxcblx0XHRcdFx0KCBqUXVlcnkuZXhwci5tYXRjaC5ib29sLnRlc3QoIG5hbWUgKSA/IGJvb2xIb29rIDogdW5kZWZpbmVkICk7XG5cdFx0fVxuXG5cdFx0aWYgKCB2YWx1ZSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0aWYgKCB2YWx1ZSA9PT0gbnVsbCApIHtcblx0XHRcdFx0alF1ZXJ5LnJlbW92ZUF0dHIoIGVsZW0sIG5hbWUgKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIGhvb2tzICYmIFwic2V0XCIgaW4gaG9va3MgJiZcblx0XHRcdFx0KCByZXQgPSBob29rcy5zZXQoIGVsZW0sIHZhbHVlLCBuYW1lICkgKSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRyZXR1cm4gcmV0O1xuXHRcdFx0fVxuXG5cdFx0XHRlbGVtLnNldEF0dHJpYnV0ZSggbmFtZSwgdmFsdWUgKyBcIlwiICk7XG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0fVxuXG5cdFx0aWYgKCBob29rcyAmJiBcImdldFwiIGluIGhvb2tzICYmICggcmV0ID0gaG9va3MuZ2V0KCBlbGVtLCBuYW1lICkgKSAhPT0gbnVsbCApIHtcblx0XHRcdHJldHVybiByZXQ7XG5cdFx0fVxuXG5cdFx0cmV0ID0galF1ZXJ5LmZpbmQuYXR0ciggZWxlbSwgbmFtZSApO1xuXG5cdFx0Ly8gTm9uLWV4aXN0ZW50IGF0dHJpYnV0ZXMgcmV0dXJuIG51bGwsIHdlIG5vcm1hbGl6ZSB0byB1bmRlZmluZWRcblx0XHRyZXR1cm4gcmV0ID09IG51bGwgPyB1bmRlZmluZWQgOiByZXQ7XG5cdH0sXG5cblx0YXR0ckhvb2tzOiB7XG5cdFx0dHlwZToge1xuXHRcdFx0c2V0OiBmdW5jdGlvbiggZWxlbSwgdmFsdWUgKSB7XG5cdFx0XHRcdGlmICggIXN1cHBvcnQucmFkaW9WYWx1ZSAmJiB2YWx1ZSA9PT0gXCJyYWRpb1wiICYmXG5cdFx0XHRcdFx0bm9kZU5hbWUoIGVsZW0sIFwiaW5wdXRcIiApICkge1xuXHRcdFx0XHRcdHZhciB2YWwgPSBlbGVtLnZhbHVlO1xuXHRcdFx0XHRcdGVsZW0uc2V0QXR0cmlidXRlKCBcInR5cGVcIiwgdmFsdWUgKTtcblx0XHRcdFx0XHRpZiAoIHZhbCApIHtcblx0XHRcdFx0XHRcdGVsZW0udmFsdWUgPSB2YWw7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHRyZW1vdmVBdHRyOiBmdW5jdGlvbiggZWxlbSwgdmFsdWUgKSB7XG5cdFx0dmFyIG5hbWUsXG5cdFx0XHRpID0gMCxcblxuXHRcdFx0Ly8gQXR0cmlidXRlIG5hbWVzIGNhbiBjb250YWluIG5vbi1IVE1MIHdoaXRlc3BhY2UgY2hhcmFjdGVyc1xuXHRcdFx0Ly8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2Uvc3ludGF4Lmh0bWwjYXR0cmlidXRlcy0yXG5cdFx0XHRhdHRyTmFtZXMgPSB2YWx1ZSAmJiB2YWx1ZS5tYXRjaCggcm5vdGh0bWx3aGl0ZSApO1xuXG5cdFx0aWYgKCBhdHRyTmFtZXMgJiYgZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcblx0XHRcdHdoaWxlICggKCBuYW1lID0gYXR0ck5hbWVzWyBpKysgXSApICkge1xuXHRcdFx0XHRlbGVtLnJlbW92ZUF0dHJpYnV0ZSggbmFtZSApO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufSApO1xuXG4vLyBIb29rcyBmb3IgYm9vbGVhbiBhdHRyaWJ1dGVzXG5ib29sSG9vayA9IHtcblx0c2V0OiBmdW5jdGlvbiggZWxlbSwgdmFsdWUsIG5hbWUgKSB7XG5cdFx0aWYgKCB2YWx1ZSA9PT0gZmFsc2UgKSB7XG5cblx0XHRcdC8vIFJlbW92ZSBib29sZWFuIGF0dHJpYnV0ZXMgd2hlbiBzZXQgdG8gZmFsc2Vcblx0XHRcdGpRdWVyeS5yZW1vdmVBdHRyKCBlbGVtLCBuYW1lICk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGVsZW0uc2V0QXR0cmlidXRlKCBuYW1lLCBuYW1lICk7XG5cdFx0fVxuXHRcdHJldHVybiBuYW1lO1xuXHR9XG59O1xuXG5qUXVlcnkuZWFjaCggalF1ZXJ5LmV4cHIubWF0Y2guYm9vbC5zb3VyY2UubWF0Y2goIC9cXHcrL2cgKSwgZnVuY3Rpb24oIGksIG5hbWUgKSB7XG5cdHZhciBnZXR0ZXIgPSBhdHRySGFuZGxlWyBuYW1lIF0gfHwgalF1ZXJ5LmZpbmQuYXR0cjtcblxuXHRhdHRySGFuZGxlWyBuYW1lIF0gPSBmdW5jdGlvbiggZWxlbSwgbmFtZSwgaXNYTUwgKSB7XG5cdFx0dmFyIHJldCwgaGFuZGxlLFxuXHRcdFx0bG93ZXJjYXNlTmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcblxuXHRcdGlmICggIWlzWE1MICkge1xuXG5cdFx0XHQvLyBBdm9pZCBhbiBpbmZpbml0ZSBsb29wIGJ5IHRlbXBvcmFyaWx5IHJlbW92aW5nIHRoaXMgZnVuY3Rpb24gZnJvbSB0aGUgZ2V0dGVyXG5cdFx0XHRoYW5kbGUgPSBhdHRySGFuZGxlWyBsb3dlcmNhc2VOYW1lIF07XG5cdFx0XHRhdHRySGFuZGxlWyBsb3dlcmNhc2VOYW1lIF0gPSByZXQ7XG5cdFx0XHRyZXQgPSBnZXR0ZXIoIGVsZW0sIG5hbWUsIGlzWE1MICkgIT0gbnVsbCA/XG5cdFx0XHRcdGxvd2VyY2FzZU5hbWUgOlxuXHRcdFx0XHRudWxsO1xuXHRcdFx0YXR0ckhhbmRsZVsgbG93ZXJjYXNlTmFtZSBdID0gaGFuZGxlO1xuXHRcdH1cblx0XHRyZXR1cm4gcmV0O1xuXHR9O1xufSApO1xuXG5cblxuXG5cdC8vIFN0cmlwIGFuZCBjb2xsYXBzZSB3aGl0ZXNwYWNlIGFjY29yZGluZyB0byBIVE1MIHNwZWNcblx0Ly8gaHR0cHM6Ly9pbmZyYS5zcGVjLndoYXR3Zy5vcmcvI3N0cmlwLWFuZC1jb2xsYXBzZS1hc2NpaS13aGl0ZXNwYWNlXG5cdGZ1bmN0aW9uIHN0cmlwQW5kQ29sbGFwc2UoIHZhbHVlICkge1xuXHRcdHZhciB0b2tlbnMgPSB2YWx1ZS5tYXRjaCggcm5vdGh0bWx3aGl0ZSApIHx8IFtdO1xuXHRcdHJldHVybiB0b2tlbnMuam9pbiggXCIgXCIgKTtcblx0fVxuXG5cbmZ1bmN0aW9uIGdldENsYXNzKCBlbGVtICkge1xuXHRyZXR1cm4gZWxlbS5nZXRBdHRyaWJ1dGUgJiYgZWxlbS5nZXRBdHRyaWJ1dGUoIFwiY2xhc3NcIiApIHx8IFwiXCI7XG59XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0YWRkQ2xhc3M6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHR2YXIgY2xhc3NlcywgZWxlbSwgY3VyLCBjdXJWYWx1ZSwgY2xhenosIGosIGZpbmFsVmFsdWUsXG5cdFx0XHRpID0gMDtcblxuXHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIHZhbHVlICkgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbiggaiApIHtcblx0XHRcdFx0alF1ZXJ5KCB0aGlzICkuYWRkQ2xhc3MoIHZhbHVlLmNhbGwoIHRoaXMsIGosIGdldENsYXNzKCB0aGlzICkgKSApO1xuXHRcdFx0fSApO1xuXHRcdH1cblxuXHRcdGlmICggdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmIHZhbHVlICkge1xuXHRcdFx0Y2xhc3NlcyA9IHZhbHVlLm1hdGNoKCBybm90aHRtbHdoaXRlICkgfHwgW107XG5cblx0XHRcdHdoaWxlICggKCBlbGVtID0gdGhpc1sgaSsrIF0gKSApIHtcblx0XHRcdFx0Y3VyVmFsdWUgPSBnZXRDbGFzcyggZWxlbSApO1xuXHRcdFx0XHRjdXIgPSBlbGVtLm5vZGVUeXBlID09PSAxICYmICggXCIgXCIgKyBzdHJpcEFuZENvbGxhcHNlKCBjdXJWYWx1ZSApICsgXCIgXCIgKTtcblxuXHRcdFx0XHRpZiAoIGN1ciApIHtcblx0XHRcdFx0XHRqID0gMDtcblx0XHRcdFx0XHR3aGlsZSAoICggY2xhenogPSBjbGFzc2VzWyBqKysgXSApICkge1xuXHRcdFx0XHRcdFx0aWYgKCBjdXIuaW5kZXhPZiggXCIgXCIgKyBjbGF6eiArIFwiIFwiICkgPCAwICkge1xuXHRcdFx0XHRcdFx0XHRjdXIgKz0gY2xhenogKyBcIiBcIjtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBPbmx5IGFzc2lnbiBpZiBkaWZmZXJlbnQgdG8gYXZvaWQgdW5uZWVkZWQgcmVuZGVyaW5nLlxuXHRcdFx0XHRcdGZpbmFsVmFsdWUgPSBzdHJpcEFuZENvbGxhcHNlKCBjdXIgKTtcblx0XHRcdFx0XHRpZiAoIGN1clZhbHVlICE9PSBmaW5hbFZhbHVlICkge1xuXHRcdFx0XHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoIFwiY2xhc3NcIiwgZmluYWxWYWx1ZSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdHJlbW92ZUNsYXNzOiBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0dmFyIGNsYXNzZXMsIGVsZW0sIGN1ciwgY3VyVmFsdWUsIGNsYXp6LCBqLCBmaW5hbFZhbHVlLFxuXHRcdFx0aSA9IDA7XG5cblx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCB2YWx1ZSApICkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oIGogKSB7XG5cdFx0XHRcdGpRdWVyeSggdGhpcyApLnJlbW92ZUNsYXNzKCB2YWx1ZS5jYWxsKCB0aGlzLCBqLCBnZXRDbGFzcyggdGhpcyApICkgKTtcblx0XHRcdH0gKTtcblx0XHR9XG5cblx0XHRpZiAoICFhcmd1bWVudHMubGVuZ3RoICkge1xuXHRcdFx0cmV0dXJuIHRoaXMuYXR0ciggXCJjbGFzc1wiLCBcIlwiICk7XG5cdFx0fVxuXG5cdFx0aWYgKCB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgdmFsdWUgKSB7XG5cdFx0XHRjbGFzc2VzID0gdmFsdWUubWF0Y2goIHJub3RodG1sd2hpdGUgKSB8fCBbXTtcblxuXHRcdFx0d2hpbGUgKCAoIGVsZW0gPSB0aGlzWyBpKysgXSApICkge1xuXHRcdFx0XHRjdXJWYWx1ZSA9IGdldENsYXNzKCBlbGVtICk7XG5cblx0XHRcdFx0Ly8gVGhpcyBleHByZXNzaW9uIGlzIGhlcmUgZm9yIGJldHRlciBjb21wcmVzc2liaWxpdHkgKHNlZSBhZGRDbGFzcylcblx0XHRcdFx0Y3VyID0gZWxlbS5ub2RlVHlwZSA9PT0gMSAmJiAoIFwiIFwiICsgc3RyaXBBbmRDb2xsYXBzZSggY3VyVmFsdWUgKSArIFwiIFwiICk7XG5cblx0XHRcdFx0aWYgKCBjdXIgKSB7XG5cdFx0XHRcdFx0aiA9IDA7XG5cdFx0XHRcdFx0d2hpbGUgKCAoIGNsYXp6ID0gY2xhc3Nlc1sgaisrIF0gKSApIHtcblxuXHRcdFx0XHRcdFx0Ly8gUmVtb3ZlICphbGwqIGluc3RhbmNlc1xuXHRcdFx0XHRcdFx0d2hpbGUgKCBjdXIuaW5kZXhPZiggXCIgXCIgKyBjbGF6eiArIFwiIFwiICkgPiAtMSApIHtcblx0XHRcdFx0XHRcdFx0Y3VyID0gY3VyLnJlcGxhY2UoIFwiIFwiICsgY2xhenogKyBcIiBcIiwgXCIgXCIgKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBPbmx5IGFzc2lnbiBpZiBkaWZmZXJlbnQgdG8gYXZvaWQgdW5uZWVkZWQgcmVuZGVyaW5nLlxuXHRcdFx0XHRcdGZpbmFsVmFsdWUgPSBzdHJpcEFuZENvbGxhcHNlKCBjdXIgKTtcblx0XHRcdFx0XHRpZiAoIGN1clZhbHVlICE9PSBmaW5hbFZhbHVlICkge1xuXHRcdFx0XHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoIFwiY2xhc3NcIiwgZmluYWxWYWx1ZSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdHRvZ2dsZUNsYXNzOiBmdW5jdGlvbiggdmFsdWUsIHN0YXRlVmFsICkge1xuXHRcdHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuXG5cdFx0aWYgKCB0eXBlb2Ygc3RhdGVWYWwgPT09IFwiYm9vbGVhblwiICYmIHR5cGUgPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRyZXR1cm4gc3RhdGVWYWwgPyB0aGlzLmFkZENsYXNzKCB2YWx1ZSApIDogdGhpcy5yZW1vdmVDbGFzcyggdmFsdWUgKTtcblx0XHR9XG5cblx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCB2YWx1ZSApICkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oIGkgKSB7XG5cdFx0XHRcdGpRdWVyeSggdGhpcyApLnRvZ2dsZUNsYXNzKFxuXHRcdFx0XHRcdHZhbHVlLmNhbGwoIHRoaXMsIGksIGdldENsYXNzKCB0aGlzICksIHN0YXRlVmFsICksXG5cdFx0XHRcdFx0c3RhdGVWYWxcblx0XHRcdFx0KTtcblx0XHRcdH0gKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBjbGFzc05hbWUsIGksIHNlbGYsIGNsYXNzTmFtZXM7XG5cblx0XHRcdGlmICggdHlwZSA9PT0gXCJzdHJpbmdcIiApIHtcblxuXHRcdFx0XHQvLyBUb2dnbGUgaW5kaXZpZHVhbCBjbGFzcyBuYW1lc1xuXHRcdFx0XHRpID0gMDtcblx0XHRcdFx0c2VsZiA9IGpRdWVyeSggdGhpcyApO1xuXHRcdFx0XHRjbGFzc05hbWVzID0gdmFsdWUubWF0Y2goIHJub3RodG1sd2hpdGUgKSB8fCBbXTtcblxuXHRcdFx0XHR3aGlsZSAoICggY2xhc3NOYW1lID0gY2xhc3NOYW1lc1sgaSsrIF0gKSApIHtcblxuXHRcdFx0XHRcdC8vIENoZWNrIGVhY2ggY2xhc3NOYW1lIGdpdmVuLCBzcGFjZSBzZXBhcmF0ZWQgbGlzdFxuXHRcdFx0XHRcdGlmICggc2VsZi5oYXNDbGFzcyggY2xhc3NOYW1lICkgKSB7XG5cdFx0XHRcdFx0XHRzZWxmLnJlbW92ZUNsYXNzKCBjbGFzc05hbWUgKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0c2VsZi5hZGRDbGFzcyggY2xhc3NOYW1lICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdC8vIFRvZ2dsZSB3aG9sZSBjbGFzcyBuYW1lXG5cdFx0XHR9IGVsc2UgaWYgKCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHR5cGUgPT09IFwiYm9vbGVhblwiICkge1xuXHRcdFx0XHRjbGFzc05hbWUgPSBnZXRDbGFzcyggdGhpcyApO1xuXHRcdFx0XHRpZiAoIGNsYXNzTmFtZSApIHtcblxuXHRcdFx0XHRcdC8vIFN0b3JlIGNsYXNzTmFtZSBpZiBzZXRcblx0XHRcdFx0XHRkYXRhUHJpdi5zZXQoIHRoaXMsIFwiX19jbGFzc05hbWVfX1wiLCBjbGFzc05hbWUgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIElmIHRoZSBlbGVtZW50IGhhcyBhIGNsYXNzIG5hbWUgb3IgaWYgd2UncmUgcGFzc2VkIGBmYWxzZWAsXG5cdFx0XHRcdC8vIHRoZW4gcmVtb3ZlIHRoZSB3aG9sZSBjbGFzc25hbWUgKGlmIHRoZXJlIHdhcyBvbmUsIHRoZSBhYm92ZSBzYXZlZCBpdCkuXG5cdFx0XHRcdC8vIE90aGVyd2lzZSBicmluZyBiYWNrIHdoYXRldmVyIHdhcyBwcmV2aW91c2x5IHNhdmVkIChpZiBhbnl0aGluZyksXG5cdFx0XHRcdC8vIGZhbGxpbmcgYmFjayB0byB0aGUgZW1wdHkgc3RyaW5nIGlmIG5vdGhpbmcgd2FzIHN0b3JlZC5cblx0XHRcdFx0aWYgKCB0aGlzLnNldEF0dHJpYnV0ZSApIHtcblx0XHRcdFx0XHR0aGlzLnNldEF0dHJpYnV0ZSggXCJjbGFzc1wiLFxuXHRcdFx0XHRcdFx0Y2xhc3NOYW1lIHx8IHZhbHVlID09PSBmYWxzZSA/XG5cdFx0XHRcdFx0XHRcIlwiIDpcblx0XHRcdFx0XHRcdGRhdGFQcml2LmdldCggdGhpcywgXCJfX2NsYXNzTmFtZV9fXCIgKSB8fCBcIlwiXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gKTtcblx0fSxcblxuXHRoYXNDbGFzczogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHZhciBjbGFzc05hbWUsIGVsZW0sXG5cdFx0XHRpID0gMDtcblxuXHRcdGNsYXNzTmFtZSA9IFwiIFwiICsgc2VsZWN0b3IgKyBcIiBcIjtcblx0XHR3aGlsZSAoICggZWxlbSA9IHRoaXNbIGkrKyBdICkgKSB7XG5cdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgJiZcblx0XHRcdFx0KCBcIiBcIiArIHN0cmlwQW5kQ29sbGFwc2UoIGdldENsYXNzKCBlbGVtICkgKSArIFwiIFwiICkuaW5kZXhPZiggY2xhc3NOYW1lICkgPiAtMSApIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn0gKTtcblxuXG5cblxudmFyIHJyZXR1cm4gPSAvXFxyL2c7XG5cbmpRdWVyeS5mbi5leHRlbmQoIHtcblx0dmFsOiBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0dmFyIGhvb2tzLCByZXQsIGlzRnVuY3Rpb24sXG5cdFx0XHRlbGVtID0gdGhpc1sgMCBdO1xuXG5cdFx0aWYgKCAhYXJndW1lbnRzLmxlbmd0aCApIHtcblx0XHRcdGlmICggZWxlbSApIHtcblx0XHRcdFx0aG9va3MgPSBqUXVlcnkudmFsSG9va3NbIGVsZW0udHlwZSBdIHx8XG5cdFx0XHRcdFx0alF1ZXJ5LnZhbEhvb2tzWyBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgXTtcblxuXHRcdFx0XHRpZiAoIGhvb2tzICYmXG5cdFx0XHRcdFx0XCJnZXRcIiBpbiBob29rcyAmJlxuXHRcdFx0XHRcdCggcmV0ID0gaG9va3MuZ2V0KCBlbGVtLCBcInZhbHVlXCIgKSApICE9PSB1bmRlZmluZWRcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0cmV0dXJuIHJldDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldCA9IGVsZW0udmFsdWU7XG5cblx0XHRcdFx0Ly8gSGFuZGxlIG1vc3QgY29tbW9uIHN0cmluZyBjYXNlc1xuXHRcdFx0XHRpZiAoIHR5cGVvZiByZXQgPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHJldC5yZXBsYWNlKCBycmV0dXJuLCBcIlwiICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBIYW5kbGUgY2FzZXMgd2hlcmUgdmFsdWUgaXMgbnVsbC91bmRlZiBvciBudW1iZXJcblx0XHRcdFx0cmV0dXJuIHJldCA9PSBudWxsID8gXCJcIiA6IHJldDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlzRnVuY3Rpb24gPSBqUXVlcnkuaXNGdW5jdGlvbiggdmFsdWUgKTtcblxuXHRcdHJldHVybiB0aGlzLmVhY2goIGZ1bmN0aW9uKCBpICkge1xuXHRcdFx0dmFyIHZhbDtcblxuXHRcdFx0aWYgKCB0aGlzLm5vZGVUeXBlICE9PSAxICkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGlmICggaXNGdW5jdGlvbiApIHtcblx0XHRcdFx0dmFsID0gdmFsdWUuY2FsbCggdGhpcywgaSwgalF1ZXJ5KCB0aGlzICkudmFsKCkgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHZhbCA9IHZhbHVlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBUcmVhdCBudWxsL3VuZGVmaW5lZCBhcyBcIlwiOyBjb252ZXJ0IG51bWJlcnMgdG8gc3RyaW5nXG5cdFx0XHRpZiAoIHZhbCA9PSBudWxsICkge1xuXHRcdFx0XHR2YWwgPSBcIlwiO1xuXG5cdFx0XHR9IGVsc2UgaWYgKCB0eXBlb2YgdmFsID09PSBcIm51bWJlclwiICkge1xuXHRcdFx0XHR2YWwgKz0gXCJcIjtcblxuXHRcdFx0fSBlbHNlIGlmICggQXJyYXkuaXNBcnJheSggdmFsICkgKSB7XG5cdFx0XHRcdHZhbCA9IGpRdWVyeS5tYXAoIHZhbCwgZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdFx0XHRcdHJldHVybiB2YWx1ZSA9PSBudWxsID8gXCJcIiA6IHZhbHVlICsgXCJcIjtcblx0XHRcdFx0fSApO1xuXHRcdFx0fVxuXG5cdFx0XHRob29rcyA9IGpRdWVyeS52YWxIb29rc1sgdGhpcy50eXBlIF0gfHwgalF1ZXJ5LnZhbEhvb2tzWyB0aGlzLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgXTtcblxuXHRcdFx0Ly8gSWYgc2V0IHJldHVybnMgdW5kZWZpbmVkLCBmYWxsIGJhY2sgdG8gbm9ybWFsIHNldHRpbmdcblx0XHRcdGlmICggIWhvb2tzIHx8ICEoIFwic2V0XCIgaW4gaG9va3MgKSB8fCBob29rcy5zZXQoIHRoaXMsIHZhbCwgXCJ2YWx1ZVwiICkgPT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0dGhpcy52YWx1ZSA9IHZhbDtcblx0XHRcdH1cblx0XHR9ICk7XG5cdH1cbn0gKTtcblxualF1ZXJ5LmV4dGVuZCgge1xuXHR2YWxIb29rczoge1xuXHRcdG9wdGlvbjoge1xuXHRcdFx0Z2V0OiBmdW5jdGlvbiggZWxlbSApIHtcblxuXHRcdFx0XHR2YXIgdmFsID0galF1ZXJ5LmZpbmQuYXR0ciggZWxlbSwgXCJ2YWx1ZVwiICk7XG5cdFx0XHRcdHJldHVybiB2YWwgIT0gbnVsbCA/XG5cdFx0XHRcdFx0dmFsIDpcblxuXHRcdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDw9MTAgLSAxMSBvbmx5XG5cdFx0XHRcdFx0Ly8gb3B0aW9uLnRleHQgdGhyb3dzIGV4Y2VwdGlvbnMgKCMxNDY4NiwgIzE0ODU4KVxuXHRcdFx0XHRcdC8vIFN0cmlwIGFuZCBjb2xsYXBzZSB3aGl0ZXNwYWNlXG5cdFx0XHRcdFx0Ly8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy8jc3RyaXAtYW5kLWNvbGxhcHNlLXdoaXRlc3BhY2Vcblx0XHRcdFx0XHRzdHJpcEFuZENvbGxhcHNlKCBqUXVlcnkudGV4dCggZWxlbSApICk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRzZWxlY3Q6IHtcblx0XHRcdGdldDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdHZhciB2YWx1ZSwgb3B0aW9uLCBpLFxuXHRcdFx0XHRcdG9wdGlvbnMgPSBlbGVtLm9wdGlvbnMsXG5cdFx0XHRcdFx0aW5kZXggPSBlbGVtLnNlbGVjdGVkSW5kZXgsXG5cdFx0XHRcdFx0b25lID0gZWxlbS50eXBlID09PSBcInNlbGVjdC1vbmVcIixcblx0XHRcdFx0XHR2YWx1ZXMgPSBvbmUgPyBudWxsIDogW10sXG5cdFx0XHRcdFx0bWF4ID0gb25lID8gaW5kZXggKyAxIDogb3B0aW9ucy5sZW5ndGg7XG5cblx0XHRcdFx0aWYgKCBpbmRleCA8IDAgKSB7XG5cdFx0XHRcdFx0aSA9IG1heDtcblxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGkgPSBvbmUgPyBpbmRleCA6IDA7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBMb29wIHRocm91Z2ggYWxsIHRoZSBzZWxlY3RlZCBvcHRpb25zXG5cdFx0XHRcdGZvciAoIDsgaSA8IG1heDsgaSsrICkge1xuXHRcdFx0XHRcdG9wdGlvbiA9IG9wdGlvbnNbIGkgXTtcblxuXHRcdFx0XHRcdC8vIFN1cHBvcnQ6IElFIDw9OSBvbmx5XG5cdFx0XHRcdFx0Ly8gSUU4LTkgZG9lc24ndCB1cGRhdGUgc2VsZWN0ZWQgYWZ0ZXIgZm9ybSByZXNldCAoIzI1NTEpXG5cdFx0XHRcdFx0aWYgKCAoIG9wdGlvbi5zZWxlY3RlZCB8fCBpID09PSBpbmRleCApICYmXG5cblx0XHRcdFx0XHRcdFx0Ly8gRG9uJ3QgcmV0dXJuIG9wdGlvbnMgdGhhdCBhcmUgZGlzYWJsZWQgb3IgaW4gYSBkaXNhYmxlZCBvcHRncm91cFxuXHRcdFx0XHRcdFx0XHQhb3B0aW9uLmRpc2FibGVkICYmXG5cdFx0XHRcdFx0XHRcdCggIW9wdGlvbi5wYXJlbnROb2RlLmRpc2FibGVkIHx8XG5cdFx0XHRcdFx0XHRcdFx0IW5vZGVOYW1lKCBvcHRpb24ucGFyZW50Tm9kZSwgXCJvcHRncm91cFwiICkgKSApIHtcblxuXHRcdFx0XHRcdFx0Ly8gR2V0IHRoZSBzcGVjaWZpYyB2YWx1ZSBmb3IgdGhlIG9wdGlvblxuXHRcdFx0XHRcdFx0dmFsdWUgPSBqUXVlcnkoIG9wdGlvbiApLnZhbCgpO1xuXG5cdFx0XHRcdFx0XHQvLyBXZSBkb24ndCBuZWVkIGFuIGFycmF5IGZvciBvbmUgc2VsZWN0c1xuXHRcdFx0XHRcdFx0aWYgKCBvbmUgKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gTXVsdGktU2VsZWN0cyByZXR1cm4gYW4gYXJyYXlcblx0XHRcdFx0XHRcdHZhbHVlcy5wdXNoKCB2YWx1ZSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB2YWx1ZXM7XG5cdFx0XHR9LFxuXG5cdFx0XHRzZXQ6IGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSApIHtcblx0XHRcdFx0dmFyIG9wdGlvblNldCwgb3B0aW9uLFxuXHRcdFx0XHRcdG9wdGlvbnMgPSBlbGVtLm9wdGlvbnMsXG5cdFx0XHRcdFx0dmFsdWVzID0galF1ZXJ5Lm1ha2VBcnJheSggdmFsdWUgKSxcblx0XHRcdFx0XHRpID0gb3B0aW9ucy5sZW5ndGg7XG5cblx0XHRcdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRcdFx0b3B0aW9uID0gb3B0aW9uc1sgaSBdO1xuXG5cdFx0XHRcdFx0LyogZXNsaW50LWRpc2FibGUgbm8tY29uZC1hc3NpZ24gKi9cblxuXHRcdFx0XHRcdGlmICggb3B0aW9uLnNlbGVjdGVkID1cblx0XHRcdFx0XHRcdGpRdWVyeS5pbkFycmF5KCBqUXVlcnkudmFsSG9va3Mub3B0aW9uLmdldCggb3B0aW9uICksIHZhbHVlcyApID4gLTFcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdG9wdGlvblNldCA9IHRydWU7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0LyogZXNsaW50LWVuYWJsZSBuby1jb25kLWFzc2lnbiAqL1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gRm9yY2UgYnJvd3NlcnMgdG8gYmVoYXZlIGNvbnNpc3RlbnRseSB3aGVuIG5vbi1tYXRjaGluZyB2YWx1ZSBpcyBzZXRcblx0XHRcdFx0aWYgKCAhb3B0aW9uU2V0ICkge1xuXHRcdFx0XHRcdGVsZW0uc2VsZWN0ZWRJbmRleCA9IC0xO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB2YWx1ZXM7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59ICk7XG5cbi8vIFJhZGlvcyBhbmQgY2hlY2tib3hlcyBnZXR0ZXIvc2V0dGVyXG5qUXVlcnkuZWFjaCggWyBcInJhZGlvXCIsIFwiY2hlY2tib3hcIiBdLCBmdW5jdGlvbigpIHtcblx0alF1ZXJ5LnZhbEhvb2tzWyB0aGlzIF0gPSB7XG5cdFx0c2V0OiBmdW5jdGlvbiggZWxlbSwgdmFsdWUgKSB7XG5cdFx0XHRpZiAoIEFycmF5LmlzQXJyYXkoIHZhbHVlICkgKSB7XG5cdFx0XHRcdHJldHVybiAoIGVsZW0uY2hlY2tlZCA9IGpRdWVyeS5pbkFycmF5KCBqUXVlcnkoIGVsZW0gKS52YWwoKSwgdmFsdWUgKSA+IC0xICk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRpZiAoICFzdXBwb3J0LmNoZWNrT24gKSB7XG5cdFx0alF1ZXJ5LnZhbEhvb2tzWyB0aGlzIF0uZ2V0ID0gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gZWxlbS5nZXRBdHRyaWJ1dGUoIFwidmFsdWVcIiApID09PSBudWxsID8gXCJvblwiIDogZWxlbS52YWx1ZTtcblx0XHR9O1xuXHR9XG59ICk7XG5cblxuXG5cbi8vIFJldHVybiBqUXVlcnkgZm9yIGF0dHJpYnV0ZXMtb25seSBpbmNsdXNpb25cblxuXG52YXIgcmZvY3VzTW9ycGggPSAvXig/OmZvY3VzaW5mb2N1c3xmb2N1c291dGJsdXIpJC8sXG5cdHN0b3BQcm9wYWdhdGlvbkNhbGxiYWNrID0gZnVuY3Rpb24oIGUgKSB7XG5cdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblx0fTtcblxualF1ZXJ5LmV4dGVuZCggalF1ZXJ5LmV2ZW50LCB7XG5cblx0dHJpZ2dlcjogZnVuY3Rpb24oIGV2ZW50LCBkYXRhLCBlbGVtLCBvbmx5SGFuZGxlcnMgKSB7XG5cblx0XHR2YXIgaSwgY3VyLCB0bXAsIGJ1YmJsZVR5cGUsIG9udHlwZSwgaGFuZGxlLCBzcGVjaWFsLCBsYXN0RWxlbWVudCxcblx0XHRcdGV2ZW50UGF0aCA9IFsgZWxlbSB8fCBkb2N1bWVudCBdLFxuXHRcdFx0dHlwZSA9IGhhc093bi5jYWxsKCBldmVudCwgXCJ0eXBlXCIgKSA/IGV2ZW50LnR5cGUgOiBldmVudCxcblx0XHRcdG5hbWVzcGFjZXMgPSBoYXNPd24uY2FsbCggZXZlbnQsIFwibmFtZXNwYWNlXCIgKSA/IGV2ZW50Lm5hbWVzcGFjZS5zcGxpdCggXCIuXCIgKSA6IFtdO1xuXG5cdFx0Y3VyID0gbGFzdEVsZW1lbnQgPSB0bXAgPSBlbGVtID0gZWxlbSB8fCBkb2N1bWVudDtcblxuXHRcdC8vIERvbid0IGRvIGV2ZW50cyBvbiB0ZXh0IGFuZCBjb21tZW50IG5vZGVzXG5cdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAzIHx8IGVsZW0ubm9kZVR5cGUgPT09IDggKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gZm9jdXMvYmx1ciBtb3JwaHMgdG8gZm9jdXNpbi9vdXQ7IGVuc3VyZSB3ZSdyZSBub3QgZmlyaW5nIHRoZW0gcmlnaHQgbm93XG5cdFx0aWYgKCByZm9jdXNNb3JwaC50ZXN0KCB0eXBlICsgalF1ZXJ5LmV2ZW50LnRyaWdnZXJlZCApICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICggdHlwZS5pbmRleE9mKCBcIi5cIiApID4gLTEgKSB7XG5cblx0XHRcdC8vIE5hbWVzcGFjZWQgdHJpZ2dlcjsgY3JlYXRlIGEgcmVnZXhwIHRvIG1hdGNoIGV2ZW50IHR5cGUgaW4gaGFuZGxlKClcblx0XHRcdG5hbWVzcGFjZXMgPSB0eXBlLnNwbGl0KCBcIi5cIiApO1xuXHRcdFx0dHlwZSA9IG5hbWVzcGFjZXMuc2hpZnQoKTtcblx0XHRcdG5hbWVzcGFjZXMuc29ydCgpO1xuXHRcdH1cblx0XHRvbnR5cGUgPSB0eXBlLmluZGV4T2YoIFwiOlwiICkgPCAwICYmIFwib25cIiArIHR5cGU7XG5cblx0XHQvLyBDYWxsZXIgY2FuIHBhc3MgaW4gYSBqUXVlcnkuRXZlbnQgb2JqZWN0LCBPYmplY3QsIG9yIGp1c3QgYW4gZXZlbnQgdHlwZSBzdHJpbmdcblx0XHRldmVudCA9IGV2ZW50WyBqUXVlcnkuZXhwYW5kbyBdID9cblx0XHRcdGV2ZW50IDpcblx0XHRcdG5ldyBqUXVlcnkuRXZlbnQoIHR5cGUsIHR5cGVvZiBldmVudCA9PT0gXCJvYmplY3RcIiAmJiBldmVudCApO1xuXG5cdFx0Ly8gVHJpZ2dlciBiaXRtYXNrOiAmIDEgZm9yIG5hdGl2ZSBoYW5kbGVyczsgJiAyIGZvciBqUXVlcnkgKGFsd2F5cyB0cnVlKVxuXHRcdGV2ZW50LmlzVHJpZ2dlciA9IG9ubHlIYW5kbGVycyA/IDIgOiAzO1xuXHRcdGV2ZW50Lm5hbWVzcGFjZSA9IG5hbWVzcGFjZXMuam9pbiggXCIuXCIgKTtcblx0XHRldmVudC5ybmFtZXNwYWNlID0gZXZlbnQubmFtZXNwYWNlID9cblx0XHRcdG5ldyBSZWdFeHAoIFwiKF58XFxcXC4pXCIgKyBuYW1lc3BhY2VzLmpvaW4oIFwiXFxcXC4oPzouKlxcXFwufClcIiApICsgXCIoXFxcXC58JClcIiApIDpcblx0XHRcdG51bGw7XG5cblx0XHQvLyBDbGVhbiB1cCB0aGUgZXZlbnQgaW4gY2FzZSBpdCBpcyBiZWluZyByZXVzZWRcblx0XHRldmVudC5yZXN1bHQgPSB1bmRlZmluZWQ7XG5cdFx0aWYgKCAhZXZlbnQudGFyZ2V0ICkge1xuXHRcdFx0ZXZlbnQudGFyZ2V0ID0gZWxlbTtcblx0XHR9XG5cblx0XHQvLyBDbG9uZSBhbnkgaW5jb21pbmcgZGF0YSBhbmQgcHJlcGVuZCB0aGUgZXZlbnQsIGNyZWF0aW5nIHRoZSBoYW5kbGVyIGFyZyBsaXN0XG5cdFx0ZGF0YSA9IGRhdGEgPT0gbnVsbCA/XG5cdFx0XHRbIGV2ZW50IF0gOlxuXHRcdFx0alF1ZXJ5Lm1ha2VBcnJheSggZGF0YSwgWyBldmVudCBdICk7XG5cblx0XHQvLyBBbGxvdyBzcGVjaWFsIGV2ZW50cyB0byBkcmF3IG91dHNpZGUgdGhlIGxpbmVzXG5cdFx0c3BlY2lhbCA9IGpRdWVyeS5ldmVudC5zcGVjaWFsWyB0eXBlIF0gfHwge307XG5cdFx0aWYgKCAhb25seUhhbmRsZXJzICYmIHNwZWNpYWwudHJpZ2dlciAmJiBzcGVjaWFsLnRyaWdnZXIuYXBwbHkoIGVsZW0sIGRhdGEgKSA9PT0gZmFsc2UgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZXJtaW5lIGV2ZW50IHByb3BhZ2F0aW9uIHBhdGggaW4gYWR2YW5jZSwgcGVyIFczQyBldmVudHMgc3BlYyAoIzk5NTEpXG5cdFx0Ly8gQnViYmxlIHVwIHRvIGRvY3VtZW50LCB0aGVuIHRvIHdpbmRvdzsgd2F0Y2ggZm9yIGEgZ2xvYmFsIG93bmVyRG9jdW1lbnQgdmFyICgjOTcyNClcblx0XHRpZiAoICFvbmx5SGFuZGxlcnMgJiYgIXNwZWNpYWwubm9CdWJibGUgJiYgIWlzV2luZG93KCBlbGVtICkgKSB7XG5cblx0XHRcdGJ1YmJsZVR5cGUgPSBzcGVjaWFsLmRlbGVnYXRlVHlwZSB8fCB0eXBlO1xuXHRcdFx0aWYgKCAhcmZvY3VzTW9ycGgudGVzdCggYnViYmxlVHlwZSArIHR5cGUgKSApIHtcblx0XHRcdFx0Y3VyID0gY3VyLnBhcmVudE5vZGU7XG5cdFx0XHR9XG5cdFx0XHRmb3IgKCA7IGN1cjsgY3VyID0gY3VyLnBhcmVudE5vZGUgKSB7XG5cdFx0XHRcdGV2ZW50UGF0aC5wdXNoKCBjdXIgKTtcblx0XHRcdFx0dG1wID0gY3VyO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBPbmx5IGFkZCB3aW5kb3cgaWYgd2UgZ290IHRvIGRvY3VtZW50IChlLmcuLCBub3QgcGxhaW4gb2JqIG9yIGRldGFjaGVkIERPTSlcblx0XHRcdGlmICggdG1wID09PSAoIGVsZW0ub3duZXJEb2N1bWVudCB8fCBkb2N1bWVudCApICkge1xuXHRcdFx0XHRldmVudFBhdGgucHVzaCggdG1wLmRlZmF1bHRWaWV3IHx8IHRtcC5wYXJlbnRXaW5kb3cgfHwgd2luZG93ICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gRmlyZSBoYW5kbGVycyBvbiB0aGUgZXZlbnQgcGF0aFxuXHRcdGkgPSAwO1xuXHRcdHdoaWxlICggKCBjdXIgPSBldmVudFBhdGhbIGkrKyBdICkgJiYgIWV2ZW50LmlzUHJvcGFnYXRpb25TdG9wcGVkKCkgKSB7XG5cdFx0XHRsYXN0RWxlbWVudCA9IGN1cjtcblx0XHRcdGV2ZW50LnR5cGUgPSBpID4gMSA/XG5cdFx0XHRcdGJ1YmJsZVR5cGUgOlxuXHRcdFx0XHRzcGVjaWFsLmJpbmRUeXBlIHx8IHR5cGU7XG5cblx0XHRcdC8vIGpRdWVyeSBoYW5kbGVyXG5cdFx0XHRoYW5kbGUgPSAoIGRhdGFQcml2LmdldCggY3VyLCBcImV2ZW50c1wiICkgfHwge30gKVsgZXZlbnQudHlwZSBdICYmXG5cdFx0XHRcdGRhdGFQcml2LmdldCggY3VyLCBcImhhbmRsZVwiICk7XG5cdFx0XHRpZiAoIGhhbmRsZSApIHtcblx0XHRcdFx0aGFuZGxlLmFwcGx5KCBjdXIsIGRhdGEgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gTmF0aXZlIGhhbmRsZXJcblx0XHRcdGhhbmRsZSA9IG9udHlwZSAmJiBjdXJbIG9udHlwZSBdO1xuXHRcdFx0aWYgKCBoYW5kbGUgJiYgaGFuZGxlLmFwcGx5ICYmIGFjY2VwdERhdGEoIGN1ciApICkge1xuXHRcdFx0XHRldmVudC5yZXN1bHQgPSBoYW5kbGUuYXBwbHkoIGN1ciwgZGF0YSApO1xuXHRcdFx0XHRpZiAoIGV2ZW50LnJlc3VsdCA9PT0gZmFsc2UgKSB7XG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRldmVudC50eXBlID0gdHlwZTtcblxuXHRcdC8vIElmIG5vYm9keSBwcmV2ZW50ZWQgdGhlIGRlZmF1bHQgYWN0aW9uLCBkbyBpdCBub3dcblx0XHRpZiAoICFvbmx5SGFuZGxlcnMgJiYgIWV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpICkge1xuXG5cdFx0XHRpZiAoICggIXNwZWNpYWwuX2RlZmF1bHQgfHxcblx0XHRcdFx0c3BlY2lhbC5fZGVmYXVsdC5hcHBseSggZXZlbnRQYXRoLnBvcCgpLCBkYXRhICkgPT09IGZhbHNlICkgJiZcblx0XHRcdFx0YWNjZXB0RGF0YSggZWxlbSApICkge1xuXG5cdFx0XHRcdC8vIENhbGwgYSBuYXRpdmUgRE9NIG1ldGhvZCBvbiB0aGUgdGFyZ2V0IHdpdGggdGhlIHNhbWUgbmFtZSBhcyB0aGUgZXZlbnQuXG5cdFx0XHRcdC8vIERvbid0IGRvIGRlZmF1bHQgYWN0aW9ucyBvbiB3aW5kb3csIHRoYXQncyB3aGVyZSBnbG9iYWwgdmFyaWFibGVzIGJlICgjNjE3MClcblx0XHRcdFx0aWYgKCBvbnR5cGUgJiYgalF1ZXJ5LmlzRnVuY3Rpb24oIGVsZW1bIHR5cGUgXSApICYmICFpc1dpbmRvdyggZWxlbSApICkge1xuXG5cdFx0XHRcdFx0Ly8gRG9uJ3QgcmUtdHJpZ2dlciBhbiBvbkZPTyBldmVudCB3aGVuIHdlIGNhbGwgaXRzIEZPTygpIG1ldGhvZFxuXHRcdFx0XHRcdHRtcCA9IGVsZW1bIG9udHlwZSBdO1xuXG5cdFx0XHRcdFx0aWYgKCB0bXAgKSB7XG5cdFx0XHRcdFx0XHRlbGVtWyBvbnR5cGUgXSA9IG51bGw7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gUHJldmVudCByZS10cmlnZ2VyaW5nIG9mIHRoZSBzYW1lIGV2ZW50LCBzaW5jZSB3ZSBhbHJlYWR5IGJ1YmJsZWQgaXQgYWJvdmVcblx0XHRcdFx0XHRqUXVlcnkuZXZlbnQudHJpZ2dlcmVkID0gdHlwZTtcblxuXHRcdFx0XHRcdGlmICggZXZlbnQuaXNQcm9wYWdhdGlvblN0b3BwZWQoKSApIHtcblx0XHRcdFx0XHRcdGxhc3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoIHR5cGUsIHN0b3BQcm9wYWdhdGlvbkNhbGxiYWNrICk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0ZWxlbVsgdHlwZSBdKCk7XG5cblx0XHRcdFx0XHRpZiAoIGV2ZW50LmlzUHJvcGFnYXRpb25TdG9wcGVkKCkgKSB7XG5cdFx0XHRcdFx0XHRsYXN0RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCB0eXBlLCBzdG9wUHJvcGFnYXRpb25DYWxsYmFjayApO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGpRdWVyeS5ldmVudC50cmlnZ2VyZWQgPSB1bmRlZmluZWQ7XG5cblx0XHRcdFx0XHRpZiAoIHRtcCApIHtcblx0XHRcdFx0XHRcdGVsZW1bIG9udHlwZSBdID0gdG1wO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBldmVudC5yZXN1bHQ7XG5cdH0sXG5cblx0Ly8gUGlnZ3liYWNrIG9uIGEgZG9ub3IgZXZlbnQgdG8gc2ltdWxhdGUgYSBkaWZmZXJlbnQgb25lXG5cdC8vIFVzZWQgb25seSBmb3IgYGZvY3VzKGluIHwgb3V0KWAgZXZlbnRzXG5cdHNpbXVsYXRlOiBmdW5jdGlvbiggdHlwZSwgZWxlbSwgZXZlbnQgKSB7XG5cdFx0dmFyIGUgPSBqUXVlcnkuZXh0ZW5kKFxuXHRcdFx0bmV3IGpRdWVyeS5FdmVudCgpLFxuXHRcdFx0ZXZlbnQsXG5cdFx0XHR7XG5cdFx0XHRcdHR5cGU6IHR5cGUsXG5cdFx0XHRcdGlzU2ltdWxhdGVkOiB0cnVlXG5cdFx0XHR9XG5cdFx0KTtcblxuXHRcdGpRdWVyeS5ldmVudC50cmlnZ2VyKCBlLCBudWxsLCBlbGVtICk7XG5cdH1cblxufSApO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cblx0dHJpZ2dlcjogZnVuY3Rpb24oIHR5cGUsIGRhdGEgKSB7XG5cdFx0cmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG5cdFx0XHRqUXVlcnkuZXZlbnQudHJpZ2dlciggdHlwZSwgZGF0YSwgdGhpcyApO1xuXHRcdH0gKTtcblx0fSxcblx0dHJpZ2dlckhhbmRsZXI6IGZ1bmN0aW9uKCB0eXBlLCBkYXRhICkge1xuXHRcdHZhciBlbGVtID0gdGhpc1sgMCBdO1xuXHRcdGlmICggZWxlbSApIHtcblx0XHRcdHJldHVybiBqUXVlcnkuZXZlbnQudHJpZ2dlciggdHlwZSwgZGF0YSwgZWxlbSwgdHJ1ZSApO1xuXHRcdH1cblx0fVxufSApO1xuXG5cbnN1cHBvcnQuZm9jdXNpbiA9IFwib25mb2N1c2luXCIgaW4gd2luZG93O1xuXG5cbnZhclxuXHRyYnJhY2tldCA9IC9cXFtcXF0kLyxcblx0ckNSTEYgPSAvXFxyP1xcbi9nLFxuXHRyc3VibWl0dGVyVHlwZXMgPSAvXig/OnN1Ym1pdHxidXR0b258aW1hZ2V8cmVzZXR8ZmlsZSkkL2ksXG5cdHJzdWJtaXR0YWJsZSA9IC9eKD86aW5wdXR8c2VsZWN0fHRleHRhcmVhfGtleWdlbikvaTtcblxuZnVuY3Rpb24gYnVpbGRQYXJhbXMoIHByZWZpeCwgb2JqLCB0cmFkaXRpb25hbCwgYWRkICkge1xuXHR2YXIgbmFtZTtcblxuXHRpZiAoIEFycmF5LmlzQXJyYXkoIG9iaiApICkge1xuXG5cdFx0Ly8gU2VyaWFsaXplIGFycmF5IGl0ZW0uXG5cdFx0alF1ZXJ5LmVhY2goIG9iaiwgZnVuY3Rpb24oIGksIHYgKSB7XG5cdFx0XHRpZiAoIHRyYWRpdGlvbmFsIHx8IHJicmFja2V0LnRlc3QoIHByZWZpeCApICkge1xuXG5cdFx0XHRcdC8vIFRyZWF0IGVhY2ggYXJyYXkgaXRlbSBhcyBhIHNjYWxhci5cblx0XHRcdFx0YWRkKCBwcmVmaXgsIHYgKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHQvLyBJdGVtIGlzIG5vbi1zY2FsYXIgKGFycmF5IG9yIG9iamVjdCksIGVuY29kZSBpdHMgbnVtZXJpYyBpbmRleC5cblx0XHRcdFx0YnVpbGRQYXJhbXMoXG5cdFx0XHRcdFx0cHJlZml4ICsgXCJbXCIgKyAoIHR5cGVvZiB2ID09PSBcIm9iamVjdFwiICYmIHYgIT0gbnVsbCA/IGkgOiBcIlwiICkgKyBcIl1cIixcblx0XHRcdFx0XHR2LFxuXHRcdFx0XHRcdHRyYWRpdGlvbmFsLFxuXHRcdFx0XHRcdGFkZFxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH0gKTtcblxuXHR9IGVsc2UgaWYgKCAhdHJhZGl0aW9uYWwgJiYgalF1ZXJ5LnR5cGUoIG9iaiApID09PSBcIm9iamVjdFwiICkge1xuXG5cdFx0Ly8gU2VyaWFsaXplIG9iamVjdCBpdGVtLlxuXHRcdGZvciAoIG5hbWUgaW4gb2JqICkge1xuXHRcdFx0YnVpbGRQYXJhbXMoIHByZWZpeCArIFwiW1wiICsgbmFtZSArIFwiXVwiLCBvYmpbIG5hbWUgXSwgdHJhZGl0aW9uYWwsIGFkZCApO1xuXHRcdH1cblxuXHR9IGVsc2Uge1xuXG5cdFx0Ly8gU2VyaWFsaXplIHNjYWxhciBpdGVtLlxuXHRcdGFkZCggcHJlZml4LCBvYmogKTtcblx0fVxufVxuXG4vLyBTZXJpYWxpemUgYW4gYXJyYXkgb2YgZm9ybSBlbGVtZW50cyBvciBhIHNldCBvZlxuLy8ga2V5L3ZhbHVlcyBpbnRvIGEgcXVlcnkgc3RyaW5nXG5qUXVlcnkucGFyYW0gPSBmdW5jdGlvbiggYSwgdHJhZGl0aW9uYWwgKSB7XG5cdHZhciBwcmVmaXgsXG5cdFx0cyA9IFtdLFxuXHRcdGFkZCA9IGZ1bmN0aW9uKCBrZXksIHZhbHVlT3JGdW5jdGlvbiApIHtcblxuXHRcdFx0Ly8gSWYgdmFsdWUgaXMgYSBmdW5jdGlvbiwgaW52b2tlIGl0IGFuZCB1c2UgaXRzIHJldHVybiB2YWx1ZVxuXHRcdFx0dmFyIHZhbHVlID0galF1ZXJ5LmlzRnVuY3Rpb24oIHZhbHVlT3JGdW5jdGlvbiApID9cblx0XHRcdFx0dmFsdWVPckZ1bmN0aW9uKCkgOlxuXHRcdFx0XHR2YWx1ZU9yRnVuY3Rpb247XG5cblx0XHRcdHNbIHMubGVuZ3RoIF0gPSBlbmNvZGVVUklDb21wb25lbnQoIGtleSApICsgXCI9XCIgK1xuXHRcdFx0XHRlbmNvZGVVUklDb21wb25lbnQoIHZhbHVlID09IG51bGwgPyBcIlwiIDogdmFsdWUgKTtcblx0XHR9O1xuXG5cdC8vIElmIGFuIGFycmF5IHdhcyBwYXNzZWQgaW4sIGFzc3VtZSB0aGF0IGl0IGlzIGFuIGFycmF5IG9mIGZvcm0gZWxlbWVudHMuXG5cdGlmICggQXJyYXkuaXNBcnJheSggYSApIHx8ICggYS5qcXVlcnkgJiYgIWpRdWVyeS5pc1BsYWluT2JqZWN0KCBhICkgKSApIHtcblxuXHRcdC8vIFNlcmlhbGl6ZSB0aGUgZm9ybSBlbGVtZW50c1xuXHRcdGpRdWVyeS5lYWNoKCBhLCBmdW5jdGlvbigpIHtcblx0XHRcdGFkZCggdGhpcy5uYW1lLCB0aGlzLnZhbHVlICk7XG5cdFx0fSApO1xuXG5cdH0gZWxzZSB7XG5cblx0XHQvLyBJZiB0cmFkaXRpb25hbCwgZW5jb2RlIHRoZSBcIm9sZFwiIHdheSAodGhlIHdheSAxLjMuMiBvciBvbGRlclxuXHRcdC8vIGRpZCBpdCksIG90aGVyd2lzZSBlbmNvZGUgcGFyYW1zIHJlY3Vyc2l2ZWx5LlxuXHRcdGZvciAoIHByZWZpeCBpbiBhICkge1xuXHRcdFx0YnVpbGRQYXJhbXMoIHByZWZpeCwgYVsgcHJlZml4IF0sIHRyYWRpdGlvbmFsLCBhZGQgKTtcblx0XHR9XG5cdH1cblxuXHQvLyBSZXR1cm4gdGhlIHJlc3VsdGluZyBzZXJpYWxpemF0aW9uXG5cdHJldHVybiBzLmpvaW4oIFwiJlwiICk7XG59O1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cdHNlcmlhbGl6ZTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5wYXJhbSggdGhpcy5zZXJpYWxpemVBcnJheSgpICk7XG5cdH0sXG5cdHNlcmlhbGl6ZUFycmF5OiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAoIGZ1bmN0aW9uKCkge1xuXG5cdFx0XHQvLyBDYW4gYWRkIHByb3BIb29rIGZvciBcImVsZW1lbnRzXCIgdG8gZmlsdGVyIG9yIGFkZCBmb3JtIGVsZW1lbnRzXG5cdFx0XHR2YXIgZWxlbWVudHMgPSBqUXVlcnkucHJvcCggdGhpcywgXCJlbGVtZW50c1wiICk7XG5cdFx0XHRyZXR1cm4gZWxlbWVudHMgPyBqUXVlcnkubWFrZUFycmF5KCBlbGVtZW50cyApIDogdGhpcztcblx0XHR9IClcblx0XHQuZmlsdGVyKCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciB0eXBlID0gdGhpcy50eXBlO1xuXG5cdFx0XHQvLyBVc2UgLmlzKCBcIjpkaXNhYmxlZFwiICkgc28gdGhhdCBmaWVsZHNldFtkaXNhYmxlZF0gd29ya3Ncblx0XHRcdHJldHVybiB0aGlzLm5hbWUgJiYgIWpRdWVyeSggdGhpcyApLmlzKCBcIjpkaXNhYmxlZFwiICkgJiZcblx0XHRcdFx0cnN1Ym1pdHRhYmxlLnRlc3QoIHRoaXMubm9kZU5hbWUgKSAmJiAhcnN1Ym1pdHRlclR5cGVzLnRlc3QoIHR5cGUgKSAmJlxuXHRcdFx0XHQoIHRoaXMuY2hlY2tlZCB8fCAhcmNoZWNrYWJsZVR5cGUudGVzdCggdHlwZSApICk7XG5cdFx0fSApXG5cdFx0Lm1hcCggZnVuY3Rpb24oIGksIGVsZW0gKSB7XG5cdFx0XHR2YXIgdmFsID0galF1ZXJ5KCB0aGlzICkudmFsKCk7XG5cblx0XHRcdGlmICggdmFsID09IG51bGwgKSB7XG5cdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIEFycmF5LmlzQXJyYXkoIHZhbCApICkge1xuXHRcdFx0XHRyZXR1cm4galF1ZXJ5Lm1hcCggdmFsLCBmdW5jdGlvbiggdmFsICkge1xuXHRcdFx0XHRcdHJldHVybiB7IG5hbWU6IGVsZW0ubmFtZSwgdmFsdWU6IHZhbC5yZXBsYWNlKCByQ1JMRiwgXCJcXHJcXG5cIiApIH07XG5cdFx0XHRcdH0gKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHsgbmFtZTogZWxlbS5uYW1lLCB2YWx1ZTogdmFsLnJlcGxhY2UoIHJDUkxGLCBcIlxcclxcblwiICkgfTtcblx0XHR9ICkuZ2V0KCk7XG5cdH1cbn0gKTtcblxuXG4vLyBTdXBwb3J0OiBTYWZhcmkgOCBvbmx5XG4vLyBJbiBTYWZhcmkgOCBkb2N1bWVudHMgY3JlYXRlZCB2aWEgZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uY3JlYXRlSFRNTERvY3VtZW50XG4vLyBjb2xsYXBzZSBzaWJsaW5nIGZvcm1zOiB0aGUgc2Vjb25kIG9uZSBiZWNvbWVzIGEgY2hpbGQgb2YgdGhlIGZpcnN0IG9uZS5cbi8vIEJlY2F1c2Ugb2YgdGhhdCwgdGhpcyBzZWN1cml0eSBtZWFzdXJlIGhhcyB0byBiZSBkaXNhYmxlZCBpbiBTYWZhcmkgOC5cbi8vIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xMzczMzdcbnN1cHBvcnQuY3JlYXRlSFRNTERvY3VtZW50ID0gKCBmdW5jdGlvbigpIHtcblx0dmFyIGJvZHkgPSBkb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5jcmVhdGVIVE1MRG9jdW1lbnQoIFwiXCIgKS5ib2R5O1xuXHRib2R5LmlubmVySFRNTCA9IFwiPGZvcm0+PC9mb3JtPjxmb3JtPjwvZm9ybT5cIjtcblx0cmV0dXJuIGJvZHkuY2hpbGROb2Rlcy5sZW5ndGggPT09IDI7XG59ICkoKTtcblxuXG4vLyBBcmd1bWVudCBcImRhdGFcIiBzaG91bGQgYmUgc3RyaW5nIG9mIGh0bWxcbi8vIGNvbnRleHQgKG9wdGlvbmFsKTogSWYgc3BlY2lmaWVkLCB0aGUgZnJhZ21lbnQgd2lsbCBiZSBjcmVhdGVkIGluIHRoaXMgY29udGV4dCxcbi8vIGRlZmF1bHRzIHRvIGRvY3VtZW50XG4vLyBrZWVwU2NyaXB0cyAob3B0aW9uYWwpOiBJZiB0cnVlLCB3aWxsIGluY2x1ZGUgc2NyaXB0cyBwYXNzZWQgaW4gdGhlIGh0bWwgc3RyaW5nXG5qUXVlcnkucGFyc2VIVE1MID0gZnVuY3Rpb24oIGRhdGEsIGNvbnRleHQsIGtlZXBTY3JpcHRzICkge1xuXHRpZiAoIHR5cGVvZiBkYXRhICE9PSBcInN0cmluZ1wiICkge1xuXHRcdHJldHVybiBbXTtcblx0fVxuXHRpZiAoIHR5cGVvZiBjb250ZXh0ID09PSBcImJvb2xlYW5cIiApIHtcblx0XHRrZWVwU2NyaXB0cyA9IGNvbnRleHQ7XG5cdFx0Y29udGV4dCA9IGZhbHNlO1xuXHR9XG5cblx0dmFyIGJhc2UsIHBhcnNlZCwgc2NyaXB0cztcblxuXHRpZiAoICFjb250ZXh0ICkge1xuXG5cdFx0Ly8gU3RvcCBzY3JpcHRzIG9yIGlubGluZSBldmVudCBoYW5kbGVycyBmcm9tIGJlaW5nIGV4ZWN1dGVkIGltbWVkaWF0ZWx5XG5cdFx0Ly8gYnkgdXNpbmcgZG9jdW1lbnQuaW1wbGVtZW50YXRpb25cblx0XHRpZiAoIHN1cHBvcnQuY3JlYXRlSFRNTERvY3VtZW50ICkge1xuXHRcdFx0Y29udGV4dCA9IGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudCggXCJcIiApO1xuXG5cdFx0XHQvLyBTZXQgdGhlIGJhc2UgaHJlZiBmb3IgdGhlIGNyZWF0ZWQgZG9jdW1lbnRcblx0XHRcdC8vIHNvIGFueSBwYXJzZWQgZWxlbWVudHMgd2l0aCBVUkxzXG5cdFx0XHQvLyBhcmUgYmFzZWQgb24gdGhlIGRvY3VtZW50J3MgVVJMIChnaC0yOTY1KVxuXHRcdFx0YmFzZSA9IGNvbnRleHQuY3JlYXRlRWxlbWVudCggXCJiYXNlXCIgKTtcblx0XHRcdGJhc2UuaHJlZiA9IGRvY3VtZW50LmxvY2F0aW9uLmhyZWY7XG5cdFx0XHRjb250ZXh0LmhlYWQuYXBwZW5kQ2hpbGQoIGJhc2UgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29udGV4dCA9IGRvY3VtZW50O1xuXHRcdH1cblx0fVxuXG5cdHBhcnNlZCA9IHJzaW5nbGVUYWcuZXhlYyggZGF0YSApO1xuXHRzY3JpcHRzID0gIWtlZXBTY3JpcHRzICYmIFtdO1xuXG5cdC8vIFNpbmdsZSB0YWdcblx0aWYgKCBwYXJzZWQgKSB7XG5cdFx0cmV0dXJuIFsgY29udGV4dC5jcmVhdGVFbGVtZW50KCBwYXJzZWRbIDEgXSApIF07XG5cdH1cblxuXHRwYXJzZWQgPSBidWlsZEZyYWdtZW50KCBbIGRhdGEgXSwgY29udGV4dCwgc2NyaXB0cyApO1xuXG5cdGlmICggc2NyaXB0cyAmJiBzY3JpcHRzLmxlbmd0aCApIHtcblx0XHRqUXVlcnkoIHNjcmlwdHMgKS5yZW1vdmUoKTtcblx0fVxuXG5cdHJldHVybiBqUXVlcnkubWVyZ2UoIFtdLCBwYXJzZWQuY2hpbGROb2RlcyApO1xufTtcblxuXG5qUXVlcnkub2Zmc2V0ID0ge1xuXHRzZXRPZmZzZXQ6IGZ1bmN0aW9uKCBlbGVtLCBvcHRpb25zLCBpICkge1xuXHRcdHZhciBjdXJQb3NpdGlvbiwgY3VyTGVmdCwgY3VyQ1NTVG9wLCBjdXJUb3AsIGN1ck9mZnNldCwgY3VyQ1NTTGVmdCwgY2FsY3VsYXRlUG9zaXRpb24sXG5cdFx0XHRwb3NpdGlvbiA9IGpRdWVyeS5jc3MoIGVsZW0sIFwicG9zaXRpb25cIiApLFxuXHRcdFx0Y3VyRWxlbSA9IGpRdWVyeSggZWxlbSApLFxuXHRcdFx0cHJvcHMgPSB7fTtcblxuXHRcdC8vIFNldCBwb3NpdGlvbiBmaXJzdCwgaW4tY2FzZSB0b3AvbGVmdCBhcmUgc2V0IGV2ZW4gb24gc3RhdGljIGVsZW1cblx0XHRpZiAoIHBvc2l0aW9uID09PSBcInN0YXRpY1wiICkge1xuXHRcdFx0ZWxlbS5zdHlsZS5wb3NpdGlvbiA9IFwicmVsYXRpdmVcIjtcblx0XHR9XG5cblx0XHRjdXJPZmZzZXQgPSBjdXJFbGVtLm9mZnNldCgpO1xuXHRcdGN1ckNTU1RvcCA9IGpRdWVyeS5jc3MoIGVsZW0sIFwidG9wXCIgKTtcblx0XHRjdXJDU1NMZWZ0ID0galF1ZXJ5LmNzcyggZWxlbSwgXCJsZWZ0XCIgKTtcblx0XHRjYWxjdWxhdGVQb3NpdGlvbiA9ICggcG9zaXRpb24gPT09IFwiYWJzb2x1dGVcIiB8fCBwb3NpdGlvbiA9PT0gXCJmaXhlZFwiICkgJiZcblx0XHRcdCggY3VyQ1NTVG9wICsgY3VyQ1NTTGVmdCApLmluZGV4T2YoIFwiYXV0b1wiICkgPiAtMTtcblxuXHRcdC8vIE5lZWQgdG8gYmUgYWJsZSB0byBjYWxjdWxhdGUgcG9zaXRpb24gaWYgZWl0aGVyXG5cdFx0Ly8gdG9wIG9yIGxlZnQgaXMgYXV0byBhbmQgcG9zaXRpb24gaXMgZWl0aGVyIGFic29sdXRlIG9yIGZpeGVkXG5cdFx0aWYgKCBjYWxjdWxhdGVQb3NpdGlvbiApIHtcblx0XHRcdGN1clBvc2l0aW9uID0gY3VyRWxlbS5wb3NpdGlvbigpO1xuXHRcdFx0Y3VyVG9wID0gY3VyUG9zaXRpb24udG9wO1xuXHRcdFx0Y3VyTGVmdCA9IGN1clBvc2l0aW9uLmxlZnQ7XG5cblx0XHR9IGVsc2Uge1xuXHRcdFx0Y3VyVG9wID0gcGFyc2VGbG9hdCggY3VyQ1NTVG9wICkgfHwgMDtcblx0XHRcdGN1ckxlZnQgPSBwYXJzZUZsb2F0KCBjdXJDU1NMZWZ0ICkgfHwgMDtcblx0XHR9XG5cblx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBvcHRpb25zICkgKSB7XG5cblx0XHRcdC8vIFVzZSBqUXVlcnkuZXh0ZW5kIGhlcmUgdG8gYWxsb3cgbW9kaWZpY2F0aW9uIG9mIGNvb3JkaW5hdGVzIGFyZ3VtZW50IChnaC0xODQ4KVxuXHRcdFx0b3B0aW9ucyA9IG9wdGlvbnMuY2FsbCggZWxlbSwgaSwgalF1ZXJ5LmV4dGVuZCgge30sIGN1ck9mZnNldCApICk7XG5cdFx0fVxuXG5cdFx0aWYgKCBvcHRpb25zLnRvcCAhPSBudWxsICkge1xuXHRcdFx0cHJvcHMudG9wID0gKCBvcHRpb25zLnRvcCAtIGN1ck9mZnNldC50b3AgKSArIGN1clRvcDtcblx0XHR9XG5cdFx0aWYgKCBvcHRpb25zLmxlZnQgIT0gbnVsbCApIHtcblx0XHRcdHByb3BzLmxlZnQgPSAoIG9wdGlvbnMubGVmdCAtIGN1ck9mZnNldC5sZWZ0ICkgKyBjdXJMZWZ0O1xuXHRcdH1cblxuXHRcdGlmICggXCJ1c2luZ1wiIGluIG9wdGlvbnMgKSB7XG5cdFx0XHRvcHRpb25zLnVzaW5nLmNhbGwoIGVsZW0sIHByb3BzICk7XG5cblx0XHR9IGVsc2Uge1xuXHRcdFx0Y3VyRWxlbS5jc3MoIHByb3BzICk7XG5cdFx0fVxuXHR9XG59O1xuXG5qUXVlcnkuZm4uZXh0ZW5kKCB7XG5cblx0Ly8gb2Zmc2V0KCkgcmVsYXRlcyBhbiBlbGVtZW50J3MgYm9yZGVyIGJveCB0byB0aGUgZG9jdW1lbnQgb3JpZ2luXG5cdG9mZnNldDogZnVuY3Rpb24oIG9wdGlvbnMgKSB7XG5cblx0XHQvLyBQcmVzZXJ2ZSBjaGFpbmluZyBmb3Igc2V0dGVyXG5cdFx0aWYgKCBhcmd1bWVudHMubGVuZ3RoICkge1xuXHRcdFx0cmV0dXJuIG9wdGlvbnMgPT09IHVuZGVmaW5lZCA/XG5cdFx0XHRcdHRoaXMgOlxuXHRcdFx0XHR0aGlzLmVhY2goIGZ1bmN0aW9uKCBpICkge1xuXHRcdFx0XHRcdGpRdWVyeS5vZmZzZXQuc2V0T2Zmc2V0KCB0aGlzLCBvcHRpb25zLCBpICk7XG5cdFx0XHRcdH0gKTtcblx0XHR9XG5cblx0XHR2YXIgcmVjdCwgd2luLFxuXHRcdFx0ZWxlbSA9IHRoaXNbIDAgXTtcblxuXHRcdGlmICggIWVsZW0gKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gUmV0dXJuIHplcm9zIGZvciBkaXNjb25uZWN0ZWQgYW5kIGhpZGRlbiAoZGlzcGxheTogbm9uZSkgZWxlbWVudHMgKGdoLTIzMTApXG5cdFx0Ly8gU3VwcG9ydDogSUUgPD0xMSBvbmx5XG5cdFx0Ly8gUnVubmluZyBnZXRCb3VuZGluZ0NsaWVudFJlY3Qgb24gYVxuXHRcdC8vIGRpc2Nvbm5lY3RlZCBub2RlIGluIElFIHRocm93cyBhbiBlcnJvclxuXHRcdGlmICggIWVsZW0uZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGggKSB7XG5cdFx0XHRyZXR1cm4geyB0b3A6IDAsIGxlZnQ6IDAgfTtcblx0XHR9XG5cblx0XHQvLyBHZXQgZG9jdW1lbnQtcmVsYXRpdmUgcG9zaXRpb24gYnkgYWRkaW5nIHZpZXdwb3J0IHNjcm9sbCB0byB2aWV3cG9ydC1yZWxhdGl2ZSBnQkNSXG5cdFx0cmVjdCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0d2luID0gZWxlbS5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3O1xuXHRcdHJldHVybiB7XG5cdFx0XHR0b3A6IHJlY3QudG9wICsgd2luLnBhZ2VZT2Zmc2V0LFxuXHRcdFx0bGVmdDogcmVjdC5sZWZ0ICsgd2luLnBhZ2VYT2Zmc2V0XG5cdFx0fTtcblx0fSxcblxuXHQvLyBwb3NpdGlvbigpIHJlbGF0ZXMgYW4gZWxlbWVudCdzIG1hcmdpbiBib3ggdG8gaXRzIG9mZnNldCBwYXJlbnQncyBwYWRkaW5nIGJveFxuXHQvLyBUaGlzIGNvcnJlc3BvbmRzIHRvIHRoZSBiZWhhdmlvciBvZiBDU1MgYWJzb2x1dGUgcG9zaXRpb25pbmdcblx0cG9zaXRpb246IGZ1bmN0aW9uKCkge1xuXHRcdGlmICggIXRoaXNbIDAgXSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR2YXIgb2Zmc2V0UGFyZW50LCBvZmZzZXQsIGRvYyxcblx0XHRcdGVsZW0gPSB0aGlzWyAwIF0sXG5cdFx0XHRwYXJlbnRPZmZzZXQgPSB7IHRvcDogMCwgbGVmdDogMCB9O1xuXG5cdFx0Ly8gcG9zaXRpb246Zml4ZWQgZWxlbWVudHMgYXJlIG9mZnNldCBmcm9tIHRoZSB2aWV3cG9ydCwgd2hpY2ggaXRzZWxmIGFsd2F5cyBoYXMgemVybyBvZmZzZXRcblx0XHRpZiAoIGpRdWVyeS5jc3MoIGVsZW0sIFwicG9zaXRpb25cIiApID09PSBcImZpeGVkXCIgKSB7XG5cblx0XHRcdC8vIEFzc3VtZSBwb3NpdGlvbjpmaXhlZCBpbXBsaWVzIGF2YWlsYWJpbGl0eSBvZiBnZXRCb3VuZGluZ0NsaWVudFJlY3Rcblx0XHRcdG9mZnNldCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cblx0XHR9IGVsc2Uge1xuXHRcdFx0b2Zmc2V0ID0gdGhpcy5vZmZzZXQoKTtcblxuXHRcdFx0Ly8gQWNjb3VudCBmb3IgdGhlICpyZWFsKiBvZmZzZXQgcGFyZW50LCB3aGljaCBjYW4gYmUgdGhlIGRvY3VtZW50IG9yIGl0cyByb290IGVsZW1lbnRcblx0XHRcdC8vIHdoZW4gYSBzdGF0aWNhbGx5IHBvc2l0aW9uZWQgZWxlbWVudCBpcyBpZGVudGlmaWVkXG5cdFx0XHRkb2MgPSBlbGVtLm93bmVyRG9jdW1lbnQ7XG5cdFx0XHRvZmZzZXRQYXJlbnQgPSBlbGVtLm9mZnNldFBhcmVudCB8fCBkb2MuZG9jdW1lbnRFbGVtZW50O1xuXHRcdFx0d2hpbGUgKCBvZmZzZXRQYXJlbnQgJiZcblx0XHRcdFx0KCBvZmZzZXRQYXJlbnQgPT09IGRvYy5ib2R5IHx8IG9mZnNldFBhcmVudCA9PT0gZG9jLmRvY3VtZW50RWxlbWVudCApICYmXG5cdFx0XHRcdGpRdWVyeS5jc3MoIG9mZnNldFBhcmVudCwgXCJwb3NpdGlvblwiICkgPT09IFwic3RhdGljXCIgKSB7XG5cblx0XHRcdFx0b2Zmc2V0UGFyZW50ID0gb2Zmc2V0UGFyZW50LnBhcmVudE5vZGU7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIG9mZnNldFBhcmVudCAmJiBvZmZzZXRQYXJlbnQgIT09IGVsZW0gJiYgb2Zmc2V0UGFyZW50Lm5vZGVUeXBlID09PSAxICkge1xuXG5cdFx0XHRcdC8vIEluY29ycG9yYXRlIGJvcmRlcnMgaW50byBpdHMgb2Zmc2V0LCBzaW5jZSB0aGV5IGFyZSBvdXRzaWRlIGl0cyBjb250ZW50IG9yaWdpblxuXHRcdFx0XHRwYXJlbnRPZmZzZXQgPSBqUXVlcnkoIG9mZnNldFBhcmVudCApLm9mZnNldCgpO1xuXHRcdFx0XHRwYXJlbnRPZmZzZXQudG9wICs9IGpRdWVyeS5jc3MoIG9mZnNldFBhcmVudCwgXCJib3JkZXJUb3BXaWR0aFwiLCB0cnVlICk7XG5cdFx0XHRcdHBhcmVudE9mZnNldC5sZWZ0ICs9IGpRdWVyeS5jc3MoIG9mZnNldFBhcmVudCwgXCJib3JkZXJMZWZ0V2lkdGhcIiwgdHJ1ZSApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFN1YnRyYWN0IHBhcmVudCBvZmZzZXRzIGFuZCBlbGVtZW50IG1hcmdpbnNcblx0XHRyZXR1cm4ge1xuXHRcdFx0dG9wOiBvZmZzZXQudG9wIC0gcGFyZW50T2Zmc2V0LnRvcCAtIGpRdWVyeS5jc3MoIGVsZW0sIFwibWFyZ2luVG9wXCIsIHRydWUgKSxcblx0XHRcdGxlZnQ6IG9mZnNldC5sZWZ0IC0gcGFyZW50T2Zmc2V0LmxlZnQgLSBqUXVlcnkuY3NzKCBlbGVtLCBcIm1hcmdpbkxlZnRcIiwgdHJ1ZSApXG5cdFx0fTtcblx0fSxcblxuXHQvLyBUaGlzIG1ldGhvZCB3aWxsIHJldHVybiBkb2N1bWVudEVsZW1lbnQgaW4gdGhlIGZvbGxvd2luZyBjYXNlczpcblx0Ly8gMSkgRm9yIHRoZSBlbGVtZW50IGluc2lkZSB0aGUgaWZyYW1lIHdpdGhvdXQgb2Zmc2V0UGFyZW50LCB0aGlzIG1ldGhvZCB3aWxsIHJldHVyblxuXHQvLyAgICBkb2N1bWVudEVsZW1lbnQgb2YgdGhlIHBhcmVudCB3aW5kb3dcblx0Ly8gMikgRm9yIHRoZSBoaWRkZW4gb3IgZGV0YWNoZWQgZWxlbWVudFxuXHQvLyAzKSBGb3IgYm9keSBvciBodG1sIGVsZW1lbnQsIGkuZS4gaW4gY2FzZSBvZiB0aGUgaHRtbCBub2RlIC0gaXQgd2lsbCByZXR1cm4gaXRzZWxmXG5cdC8vXG5cdC8vIGJ1dCB0aG9zZSBleGNlcHRpb25zIHdlcmUgbmV2ZXIgcHJlc2VudGVkIGFzIGEgcmVhbCBsaWZlIHVzZS1jYXNlc1xuXHQvLyBhbmQgbWlnaHQgYmUgY29uc2lkZXJlZCBhcyBtb3JlIHByZWZlcmFibGUgcmVzdWx0cy5cblx0Ly9cblx0Ly8gVGhpcyBsb2dpYywgaG93ZXZlciwgaXMgbm90IGd1YXJhbnRlZWQgYW5kIGNhbiBjaGFuZ2UgYXQgYW55IHBvaW50IGluIHRoZSBmdXR1cmVcblx0b2Zmc2V0UGFyZW50OiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAoIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG9mZnNldFBhcmVudCA9IHRoaXMub2Zmc2V0UGFyZW50O1xuXG5cdFx0XHR3aGlsZSAoIG9mZnNldFBhcmVudCAmJiBqUXVlcnkuY3NzKCBvZmZzZXRQYXJlbnQsIFwicG9zaXRpb25cIiApID09PSBcInN0YXRpY1wiICkge1xuXHRcdFx0XHRvZmZzZXRQYXJlbnQgPSBvZmZzZXRQYXJlbnQub2Zmc2V0UGFyZW50O1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gb2Zmc2V0UGFyZW50IHx8IGRvY3VtZW50RWxlbWVudDtcblx0XHR9ICk7XG5cdH1cbn0gKTtcblxuLy8gQ3JlYXRlIHNjcm9sbExlZnQgYW5kIHNjcm9sbFRvcCBtZXRob2RzXG5qUXVlcnkuZWFjaCggeyBzY3JvbGxMZWZ0OiBcInBhZ2VYT2Zmc2V0XCIsIHNjcm9sbFRvcDogXCJwYWdlWU9mZnNldFwiIH0sIGZ1bmN0aW9uKCBtZXRob2QsIHByb3AgKSB7XG5cdHZhciB0b3AgPSBcInBhZ2VZT2Zmc2V0XCIgPT09IHByb3A7XG5cblx0alF1ZXJ5LmZuWyBtZXRob2QgXSA9IGZ1bmN0aW9uKCB2YWwgKSB7XG5cdFx0cmV0dXJuIGFjY2VzcyggdGhpcywgZnVuY3Rpb24oIGVsZW0sIG1ldGhvZCwgdmFsICkge1xuXG5cdFx0XHQvLyBDb2FsZXNjZSBkb2N1bWVudHMgYW5kIHdpbmRvd3Ncblx0XHRcdHZhciB3aW47XG5cdFx0XHRpZiAoIGlzV2luZG93KCBlbGVtICkgKSB7XG5cdFx0XHRcdHdpbiA9IGVsZW07XG5cdFx0XHR9IGVsc2UgaWYgKCBlbGVtLm5vZGVUeXBlID09PSA5ICkge1xuXHRcdFx0XHR3aW4gPSBlbGVtLmRlZmF1bHRWaWV3O1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIHZhbCA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRyZXR1cm4gd2luID8gd2luWyBwcm9wIF0gOiBlbGVtWyBtZXRob2QgXTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCB3aW4gKSB7XG5cdFx0XHRcdHdpbi5zY3JvbGxUbyhcblx0XHRcdFx0XHQhdG9wID8gdmFsIDogd2luLnBhZ2VYT2Zmc2V0LFxuXHRcdFx0XHRcdHRvcCA/IHZhbCA6IHdpbi5wYWdlWU9mZnNldFxuXHRcdFx0XHQpO1xuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRlbGVtWyBtZXRob2QgXSA9IHZhbDtcblx0XHRcdH1cblx0XHR9LCBtZXRob2QsIHZhbCwgYXJndW1lbnRzLmxlbmd0aCApO1xuXHR9O1xufSApO1xuXG4vLyBTdXBwb3J0OiBTYWZhcmkgPD03IC0gOS4xLCBDaHJvbWUgPD0zNyAtIDQ5XG4vLyBBZGQgdGhlIHRvcC9sZWZ0IGNzc0hvb2tzIHVzaW5nIGpRdWVyeS5mbi5wb3NpdGlvblxuLy8gV2Via2l0IGJ1ZzogaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTI5MDg0XG4vLyBCbGluayBidWc6IGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTU4OTM0N1xuLy8gZ2V0Q29tcHV0ZWRTdHlsZSByZXR1cm5zIHBlcmNlbnQgd2hlbiBzcGVjaWZpZWQgZm9yIHRvcC9sZWZ0L2JvdHRvbS9yaWdodDtcbi8vIHJhdGhlciB0aGFuIG1ha2UgdGhlIGNzcyBtb2R1bGUgZGVwZW5kIG9uIHRoZSBvZmZzZXQgbW9kdWxlLCBqdXN0IGNoZWNrIGZvciBpdCBoZXJlXG5qUXVlcnkuZWFjaCggWyBcInRvcFwiLCBcImxlZnRcIiBdLCBmdW5jdGlvbiggaSwgcHJvcCApIHtcblx0alF1ZXJ5LmNzc0hvb2tzWyBwcm9wIF0gPSBhZGRHZXRIb29rSWYoIHN1cHBvcnQucGl4ZWxQb3NpdGlvbixcblx0XHRmdW5jdGlvbiggZWxlbSwgY29tcHV0ZWQgKSB7XG5cdFx0XHRpZiAoIGNvbXB1dGVkICkge1xuXHRcdFx0XHRjb21wdXRlZCA9IGN1ckNTUyggZWxlbSwgcHJvcCApO1xuXG5cdFx0XHRcdC8vIElmIGN1ckNTUyByZXR1cm5zIHBlcmNlbnRhZ2UsIGZhbGxiYWNrIHRvIG9mZnNldFxuXHRcdFx0XHRyZXR1cm4gcm51bW5vbnB4LnRlc3QoIGNvbXB1dGVkICkgP1xuXHRcdFx0XHRcdGpRdWVyeSggZWxlbSApLnBvc2l0aW9uKClbIHByb3AgXSArIFwicHhcIiA6XG5cdFx0XHRcdFx0Y29tcHV0ZWQ7XG5cdFx0XHR9XG5cdFx0fVxuXHQpO1xufSApO1xuXG5cbi8vIENyZWF0ZSBpbm5lckhlaWdodCwgaW5uZXJXaWR0aCwgaGVpZ2h0LCB3aWR0aCwgb3V0ZXJIZWlnaHQgYW5kIG91dGVyV2lkdGggbWV0aG9kc1xualF1ZXJ5LmVhY2goIHsgSGVpZ2h0OiBcImhlaWdodFwiLCBXaWR0aDogXCJ3aWR0aFwiIH0sIGZ1bmN0aW9uKCBuYW1lLCB0eXBlICkge1xuXHRqUXVlcnkuZWFjaCggeyBwYWRkaW5nOiBcImlubmVyXCIgKyBuYW1lLCBjb250ZW50OiB0eXBlLCBcIlwiOiBcIm91dGVyXCIgKyBuYW1lIH0sXG5cdFx0ZnVuY3Rpb24oIGRlZmF1bHRFeHRyYSwgZnVuY05hbWUgKSB7XG5cblx0XHQvLyBNYXJnaW4gaXMgb25seSBmb3Igb3V0ZXJIZWlnaHQsIG91dGVyV2lkdGhcblx0XHRqUXVlcnkuZm5bIGZ1bmNOYW1lIF0gPSBmdW5jdGlvbiggbWFyZ2luLCB2YWx1ZSApIHtcblx0XHRcdHZhciBjaGFpbmFibGUgPSBhcmd1bWVudHMubGVuZ3RoICYmICggZGVmYXVsdEV4dHJhIHx8IHR5cGVvZiBtYXJnaW4gIT09IFwiYm9vbGVhblwiICksXG5cdFx0XHRcdGV4dHJhID0gZGVmYXVsdEV4dHJhIHx8ICggbWFyZ2luID09PSB0cnVlIHx8IHZhbHVlID09PSB0cnVlID8gXCJtYXJnaW5cIiA6IFwiYm9yZGVyXCIgKTtcblxuXHRcdFx0cmV0dXJuIGFjY2VzcyggdGhpcywgZnVuY3Rpb24oIGVsZW0sIHR5cGUsIHZhbHVlICkge1xuXHRcdFx0XHR2YXIgZG9jO1xuXG5cdFx0XHRcdGlmICggaXNXaW5kb3coIGVsZW0gKSApIHtcblxuXHRcdFx0XHRcdC8vICQoIHdpbmRvdyApLm91dGVyV2lkdGgvSGVpZ2h0IHJldHVybiB3L2ggaW5jbHVkaW5nIHNjcm9sbGJhcnMgKGdoLTE3MjkpXG5cdFx0XHRcdFx0cmV0dXJuIGZ1bmNOYW1lLmluZGV4T2YoIFwib3V0ZXJcIiApID09PSAwID9cblx0XHRcdFx0XHRcdGVsZW1bIFwiaW5uZXJcIiArIG5hbWUgXSA6XG5cdFx0XHRcdFx0XHRlbGVtLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudFsgXCJjbGllbnRcIiArIG5hbWUgXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEdldCBkb2N1bWVudCB3aWR0aCBvciBoZWlnaHRcblx0XHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSA5ICkge1xuXHRcdFx0XHRcdGRvYyA9IGVsZW0uZG9jdW1lbnRFbGVtZW50O1xuXG5cdFx0XHRcdFx0Ly8gRWl0aGVyIHNjcm9sbFtXaWR0aC9IZWlnaHRdIG9yIG9mZnNldFtXaWR0aC9IZWlnaHRdIG9yIGNsaWVudFtXaWR0aC9IZWlnaHRdLFxuXHRcdFx0XHRcdC8vIHdoaWNoZXZlciBpcyBncmVhdGVzdFxuXHRcdFx0XHRcdHJldHVybiBNYXRoLm1heChcblx0XHRcdFx0XHRcdGVsZW0uYm9keVsgXCJzY3JvbGxcIiArIG5hbWUgXSwgZG9jWyBcInNjcm9sbFwiICsgbmFtZSBdLFxuXHRcdFx0XHRcdFx0ZWxlbS5ib2R5WyBcIm9mZnNldFwiICsgbmFtZSBdLCBkb2NbIFwib2Zmc2V0XCIgKyBuYW1lIF0sXG5cdFx0XHRcdFx0XHRkb2NbIFwiY2xpZW50XCIgKyBuYW1lIF1cblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgP1xuXG5cdFx0XHRcdFx0Ly8gR2V0IHdpZHRoIG9yIGhlaWdodCBvbiB0aGUgZWxlbWVudCwgcmVxdWVzdGluZyBidXQgbm90IGZvcmNpbmcgcGFyc2VGbG9hdFxuXHRcdFx0XHRcdGpRdWVyeS5jc3MoIGVsZW0sIHR5cGUsIGV4dHJhICkgOlxuXG5cdFx0XHRcdFx0Ly8gU2V0IHdpZHRoIG9yIGhlaWdodCBvbiB0aGUgZWxlbWVudFxuXHRcdFx0XHRcdGpRdWVyeS5zdHlsZSggZWxlbSwgdHlwZSwgdmFsdWUsIGV4dHJhICk7XG5cdFx0XHR9LCB0eXBlLCBjaGFpbmFibGUgPyBtYXJnaW4gOiB1bmRlZmluZWQsIGNoYWluYWJsZSApO1xuXHRcdH07XG5cdH0gKTtcbn0gKTtcblxuXG4vLyBSZWdpc3RlciBhcyBhIG5hbWVkIEFNRCBtb2R1bGUsIHNpbmNlIGpRdWVyeSBjYW4gYmUgY29uY2F0ZW5hdGVkIHdpdGggb3RoZXJcbi8vIGZpbGVzIHRoYXQgbWF5IHVzZSBkZWZpbmUsIGJ1dCBub3QgdmlhIGEgcHJvcGVyIGNvbmNhdGVuYXRpb24gc2NyaXB0IHRoYXRcbi8vIHVuZGVyc3RhbmRzIGFub255bW91cyBBTUQgbW9kdWxlcy4gQSBuYW1lZCBBTUQgaXMgc2FmZXN0IGFuZCBtb3N0IHJvYnVzdFxuLy8gd2F5IHRvIHJlZ2lzdGVyLiBMb3dlcmNhc2UganF1ZXJ5IGlzIHVzZWQgYmVjYXVzZSBBTUQgbW9kdWxlIG5hbWVzIGFyZVxuLy8gZGVyaXZlZCBmcm9tIGZpbGUgbmFtZXMsIGFuZCBqUXVlcnkgaXMgbm9ybWFsbHkgZGVsaXZlcmVkIGluIGEgbG93ZXJjYXNlXG4vLyBmaWxlIG5hbWUuIERvIHRoaXMgYWZ0ZXIgY3JlYXRpbmcgdGhlIGdsb2JhbCBzbyB0aGF0IGlmIGFuIEFNRCBtb2R1bGUgd2FudHNcbi8vIHRvIGNhbGwgbm9Db25mbGljdCB0byBoaWRlIHRoaXMgdmVyc2lvbiBvZiBqUXVlcnksIGl0IHdpbGwgd29yay5cblxuLy8gTm90ZSB0aGF0IGZvciBtYXhpbXVtIHBvcnRhYmlsaXR5LCBsaWJyYXJpZXMgdGhhdCBhcmUgbm90IGpRdWVyeSBzaG91bGRcbi8vIGRlY2xhcmUgdGhlbXNlbHZlcyBhcyBhbm9ueW1vdXMgbW9kdWxlcywgYW5kIGF2b2lkIHNldHRpbmcgYSBnbG9iYWwgaWYgYW5cbi8vIEFNRCBsb2FkZXIgaXMgcHJlc2VudC4galF1ZXJ5IGlzIGEgc3BlY2lhbCBjYXNlLiBGb3IgbW9yZSBpbmZvcm1hdGlvbiwgc2VlXG4vLyBodHRwczovL2dpdGh1Yi5jb20vanJidXJrZS9yZXF1aXJlanMvd2lraS9VcGRhdGluZy1leGlzdGluZy1saWJyYXJpZXMjd2lraS1hbm9uXG5cbmlmICggdHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQgKSB7XG5cdGRlZmluZSggXCJqcXVlcnlcIiwgW10sIGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBqUXVlcnk7XG5cdH0gKTtcbn1cblxuXG5cblxudmFyXG5cblx0Ly8gTWFwIG92ZXIgalF1ZXJ5IGluIGNhc2Ugb2Ygb3ZlcndyaXRlXG5cdF9qUXVlcnkgPSB3aW5kb3cualF1ZXJ5LFxuXG5cdC8vIE1hcCBvdmVyIHRoZSAkIGluIGNhc2Ugb2Ygb3ZlcndyaXRlXG5cdF8kID0gd2luZG93LiQ7XG5cbmpRdWVyeS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24oIGRlZXAgKSB7XG5cdGlmICggd2luZG93LiQgPT09IGpRdWVyeSApIHtcblx0XHR3aW5kb3cuJCA9IF8kO1xuXHR9XG5cblx0aWYgKCBkZWVwICYmIHdpbmRvdy5qUXVlcnkgPT09IGpRdWVyeSApIHtcblx0XHR3aW5kb3cualF1ZXJ5ID0gX2pRdWVyeTtcblx0fVxuXG5cdHJldHVybiBqUXVlcnk7XG59O1xuXG4vLyBFeHBvc2UgalF1ZXJ5IGFuZCAkIGlkZW50aWZpZXJzLCBldmVuIGluIEFNRFxuLy8gKCM3MTAyI2NvbW1lbnQ6MTAsIGh0dHBzOi8vZ2l0aHViLmNvbS9qcXVlcnkvanF1ZXJ5L3B1bGwvNTU3KVxuLy8gYW5kIENvbW1vbkpTIGZvciBicm93c2VyIGVtdWxhdG9ycyAoIzEzNTY2KVxuaWYgKCAhbm9HbG9iYWwgKSB7XG5cdHdpbmRvdy5qUXVlcnkgPSB3aW5kb3cuJCA9IGpRdWVyeTtcbn1cblxuXG5cblxuXG52YXIgcmVhZHlDYWxsYmFja3MgPSBbXSxcblx0d2hlblJlYWR5ID0gZnVuY3Rpb24oIGZuICkge1xuXHRcdHJlYWR5Q2FsbGJhY2tzLnB1c2goIGZuICk7XG5cdH0sXG5cdGV4ZWN1dGVSZWFkeSA9IGZ1bmN0aW9uKCBmbiApIHtcblxuXHRcdC8vIFByZXZlbnQgZXJyb3JzIGZyb20gZnJlZXppbmcgZnV0dXJlIGNhbGxiYWNrIGV4ZWN1dGlvbiAoZ2gtMTgyMylcblx0XHQvLyBOb3QgYmFja3dhcmRzLWNvbXBhdGlibGUgYXMgdGhpcyBkb2VzIG5vdCBleGVjdXRlIHN5bmNcblx0XHR3aW5kb3cuc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG5cdFx0XHRmbi5jYWxsKCBkb2N1bWVudCwgalF1ZXJ5ICk7XG5cdFx0fSApO1xuXHR9O1xuXG5qUXVlcnkuZm4ucmVhZHkgPSBmdW5jdGlvbiggZm4gKSB7XG5cdHdoZW5SZWFkeSggZm4gKTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG5qUXVlcnkuZXh0ZW5kKCB7XG5cblx0Ly8gSXMgdGhlIERPTSByZWFkeSB0byBiZSB1c2VkPyBTZXQgdG8gdHJ1ZSBvbmNlIGl0IG9jY3Vycy5cblx0aXNSZWFkeTogZmFsc2UsXG5cblx0Ly8gQSBjb3VudGVyIHRvIHRyYWNrIGhvdyBtYW55IGl0ZW1zIHRvIHdhaXQgZm9yIGJlZm9yZVxuXHQvLyB0aGUgcmVhZHkgZXZlbnQgZmlyZXMuIFNlZSAjNjc4MVxuXHRyZWFkeVdhaXQ6IDEsXG5cblx0cmVhZHk6IGZ1bmN0aW9uKCB3YWl0ICkge1xuXG5cdFx0Ly8gQWJvcnQgaWYgdGhlcmUgYXJlIHBlbmRpbmcgaG9sZHMgb3Igd2UncmUgYWxyZWFkeSByZWFkeVxuXHRcdGlmICggd2FpdCA9PT0gdHJ1ZSA/IC0talF1ZXJ5LnJlYWR5V2FpdCA6IGpRdWVyeS5pc1JlYWR5ICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIFJlbWVtYmVyIHRoYXQgdGhlIERPTSBpcyByZWFkeVxuXHRcdGpRdWVyeS5pc1JlYWR5ID0gdHJ1ZTtcblxuXHRcdC8vIElmIGEgbm9ybWFsIERPTSBSZWFkeSBldmVudCBmaXJlZCwgZGVjcmVtZW50LCBhbmQgd2FpdCBpZiBuZWVkIGJlXG5cdFx0aWYgKCB3YWl0ICE9PSB0cnVlICYmIC0talF1ZXJ5LnJlYWR5V2FpdCA+IDAgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0d2hlblJlYWR5ID0gZnVuY3Rpb24oIGZuICkge1xuXHRcdFx0cmVhZHlDYWxsYmFja3MucHVzaCggZm4gKTtcblxuXHRcdFx0d2hpbGUgKCByZWFkeUNhbGxiYWNrcy5sZW5ndGggKSB7XG5cdFx0XHRcdGZuID0gcmVhZHlDYWxsYmFja3Muc2hpZnQoKTtcblx0XHRcdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggZm4gKSApIHtcblx0XHRcdFx0XHRleGVjdXRlUmVhZHkoIGZuICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0d2hlblJlYWR5KCk7XG5cdH1cbn0gKTtcblxuLy8gTWFrZSBqUXVlcnkucmVhZHkgUHJvbWlzZSBjb25zdW1hYmxlIChnaC0xNzc4KVxualF1ZXJ5LnJlYWR5LnRoZW4gPSBqUXVlcnkuZm4ucmVhZHk7XG5cbi8qKlxuICogVGhlIHJlYWR5IGV2ZW50IGhhbmRsZXIgYW5kIHNlbGYgY2xlYW51cCBtZXRob2RcbiAqL1xuZnVuY3Rpb24gY29tcGxldGVkKCkge1xuXHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCBcIkRPTUNvbnRlbnRMb2FkZWRcIiwgY29tcGxldGVkICk7XG5cdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCBcImxvYWRcIiwgY29tcGxldGVkICk7XG5cdGpRdWVyeS5yZWFkeSgpO1xufVxuXG4vLyBDYXRjaCBjYXNlcyB3aGVyZSAkKGRvY3VtZW50KS5yZWFkeSgpIGlzIGNhbGxlZFxuLy8gYWZ0ZXIgdGhlIGJyb3dzZXIgZXZlbnQgaGFzIGFscmVhZHkgb2NjdXJyZWQuXG4vLyBTdXBwb3J0OiBJRTktMTAgb25seVxuLy8gT2xkZXIgSUUgc29tZXRpbWVzIHNpZ25hbHMgXCJpbnRlcmFjdGl2ZVwiIHRvbyBzb29uXG5pZiAoIGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiY29tcGxldGVcIiB8fFxuXHQoIGRvY3VtZW50LnJlYWR5U3RhdGUgIT09IFwibG9hZGluZ1wiICYmICFkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZG9TY3JvbGwgKSApIHtcblxuXHQvLyBIYW5kbGUgaXQgYXN5bmNocm9ub3VzbHkgdG8gYWxsb3cgc2NyaXB0cyB0aGUgb3Bwb3J0dW5pdHkgdG8gZGVsYXkgcmVhZHlcblx0d2luZG93LnNldFRpbWVvdXQoIGpRdWVyeS5yZWFkeSApO1xuXG59IGVsc2Uge1xuXG5cdC8vIFVzZSB0aGUgaGFuZHkgZXZlbnQgY2FsbGJhY2tcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggXCJET01Db250ZW50TG9hZGVkXCIsIGNvbXBsZXRlZCApO1xuXG5cdC8vIEEgZmFsbGJhY2sgdG8gd2luZG93Lm9ubG9hZCwgdGhhdCB3aWxsIGFsd2F5cyB3b3JrXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCBcImxvYWRcIiwgY29tcGxldGVkICk7XG59XG5cblxuXG5yZXR1cm4galF1ZXJ5O1xufSApO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvanFtaW4vanF1ZXJ5LmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMTMiLCJpbXBvcnQgJCBmcm9tIFwianFtaW5cIjtcbmltcG9ydCB1dGlsIGZyb20gXCIuLi8uLi9zcmMvQVg2VXRpbFwiO1xuXG5cbmxldCAkZWwgPSAkKCc8ZGl2IGlkPVwidGVzdC10YXJnZXRcIj48L2Rpdj4nKTtcblxuLy8kZWwuYXBwZW5kKCc8cD4nICsgaW5mbyArICc8L3A+Jyk7XG5cbmZ1bmN0aW9uIGRlc2NyaWJlKHN0YXRlLCBmbikge1xuICAvLyBjb25zb2xlLmxvZyhzdGF0ZSk7XG4gICRlbC5hcHBlbmQoJzxoMj4nICsgc3RhdGUgKyAnPC9oMj4nKTtcbiAgJGVsLmFwcGVuZCgnPGRpdj4nKTtcbiAgZm4oKTtcbiAgJGVsLmFwcGVuZCgnPC9kaXY+Jyk7XG59XG5cbmZ1bmN0aW9uIGl0KHN0YXRlLCBmbikge1xuICAkZWwuYXBwZW5kKCc8c3Bhbj4nICsgc3RhdGUgKyAnPC9zcGFuPicpO1xuXG4gIGxldCByZXN1bHQgPSBmbihmdW5jdGlvbiAoKSB7XG4gICAgJGVsLmFwcGVuZCgnPHNwYW4+IDogJyArIHV0aWwudG9BcnJheShhcmd1bWVudHMpLmpvaW4oXCIsXCIpICsgJzwvc3Bhbj4nKTtcbiAgfSk7XG5cbiAgaWYgKHR5cGVvZiByZXN1bHQgIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICRlbC5hcHBlbmQoJzxwPicgKyByZXN1bHQgKyAnPC9wPicpO1xuICB9XG5cbiAgJGVsLmFwcGVuZCgnPGJyLz4nKTtcbn1cblxuZnVuY3Rpb24gZXF1YWwoYWN0dWFsLCBleHBlY3RlZCkge1xuXG4gIGlmIChhY3R1YWwudG9TdHJpbmcoKSA9PSBleHBlY3RlZC50b1N0cmluZygpKSB7XG4gICAgcmV0dXJuIFwiPHNwYW4gc3R5bGU9J2NvbG9yOmJsdWU7Jz5vazwvc3Bhbj5cIjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gXCI8c3BhbiBzdHlsZT0nY29sb3I6cmVkOyc+bm90IGVxdWFsIChcIiArIGFjdHVhbCArIFwiLFwiICsgZXhwZWN0ZWQgKyBcIik8L3NwYW4+XCI7XG4gIH1cbn1cblxuXG5kZXNjcmliZSgndXRpbC5kYXRlIFRFU1QnLCBmdW5jdGlvbiAoKSB7XG4gIGl0KCd1dGlsLmRhdGUoXCIyMDEzLTAxLTAxXCIpJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKDIwMTMsIDAsIDEpO1xuICAgIGRhdGUuc2V0SG91cnMoMTIpO1xuICAgIGRhdGUuc2V0TWludXRlcygwKTtcbiAgICBkb25lKGVxdWFsKHV0aWwuZGF0ZSgnMjAxMy0wMS0wMScpLCBkYXRlKSk7XG4gIH0pO1xuXG5cbiAgLy9Vc2FnZSAwMlxuICBpdCgndXRpbC5kYXRlKChuZXcgRGF0ZSgpKSAsIHthZGQ6e2Q6MTB9ICwgcmV0dXJuOlwieXl5eS9NTS9kZFwifSknLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcbiAgICBkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgKyAxMCk7XG4gICAgdmFyIHN0ciA9IGRhdGUuZ2V0RnVsbFllYXIoKSArIFwiL1wiICsgdXRpbC5zZXREaWdpdChkYXRlLmdldE1vbnRoKCkgKyAxLCAyKSArIFwiL1wiICsgdXRpbC5zZXREaWdpdChkYXRlLmdldERhdGUoKSwgMik7XG5cbiAgICBkb25lKGVxdWFsKHV0aWwuZGF0ZSgobmV3IERhdGUoKSksIHthZGQ6IHtkOiAxMH0sIHJldHVybjogJ3l5eXkvTU0vZGQnfSksIHN0cikpO1xuICB9KTtcblxuICAvL1VzYWdlIDAzXG4gIGl0KCd1dGlsLmRhdGUoXCIxOTE5LTAzLTAxXCIsIHthZGQ6e2Q6MTB9LCByZXR1cm46XCJ5eXl5L01NL2RkIGhoOm1tOnNzXCJ9KScsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgZG9uZShlcXVhbCh1dGlsLmRhdGUoXCIxOTE5LTAzLTAxXCIsIHtcbiAgICAgIGFkZDoge2Q6IDEwfSxcbiAgICAgIHJldHVybjogXCJ5eXl5L01NL2RkIGhoOm1tOnNzXCJcbiAgICB9KSwgJzE5MTkvMDMvMTEgMTI6MDA6MDAnKSk7XG4gIH0pO1xuXG4gIC8vVXNhZ2UgMDRcbiAgaXQoJ3V0aWwuZGF0ZSgobmV3IERhdGUoKSkgLCB7c2V0OlwiZmlyc3REYXlPZk1vbnRoXCIsIHJldHVybjpcInl5eXkvTU0vZGRcIn0pJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgdmFyIHN0ciA9IGRhdGUuZ2V0RnVsbFllYXIoKSArIFwiL1wiICsgdXRpbC5zZXREaWdpdChkYXRlLmdldE1vbnRoKCkgKyAxLCAyKSArIFwiLzAxXCI7XG4gICAgZG9uZShlcXVhbCh1dGlsLmRhdGUoKG5ldyBEYXRlKCkpLCB7c2V0OiBcImZpcnN0RGF5T2ZNb250aFwiLCByZXR1cm46ICd5eXl5L01NL2RkJ30pLCBzdHIpKTtcbiAgfSk7XG5cbiAgLy9Vc2FnZSAwNVxuICBpdCgndXRpbC5kYXRlKChuZXcgRGF0ZSgpKSAsIHtzZXQ6XCJsYXN0RGF5T2ZNb250aFwiLCByZXR1cm46XCJ5eXl5L01NL2RkXCJ9KScsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIHZhciBzdHIgPSBkYXRlLmdldEZ1bGxZZWFyKCkgKyBcIi9cIiArIHV0aWwuc2V0RGlnaXQoZGF0ZS5nZXRNb250aCgpICsgMSwgMikgKyBcIi9cIiArIHV0aWwuZGF5c09mTW9udGgoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCkpO1xuICAgIGRvbmUoZXF1YWwodXRpbC5kYXRlKChuZXcgRGF0ZSgpKSwge3NldDogXCJsYXN0RGF5T2ZNb250aFwiLCByZXR1cm46ICd5eXl5L01NL2RkJ30pLCBzdHIpKTtcbiAgfSk7XG5cbiAgLy9Vc2FnZSAwNlxuICBpdCgndXRpbC5kYXRlKFwiXCIpJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgZG9uZShlcXVhbCh1dGlsLmRhdGUoXCJcIiksIGRhdGUpKTtcbiAgfSk7XG5cbiAgLy9Vc2FnZSAwN1xuICBpdCgndXRpbC5kYXRlKFwiMTk3OS0xMi0xNlQwOTowMDowMFwiKSBbc3RyaW5nLmxlbmd0aCA+IDE1XScsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIGRhdGUuc2V0RnVsbFllYXIoMTk3OSwgMTEsIDE2KTtcbiAgICBkYXRlLnNldEhvdXJzKDksIDAsIDAsIDApO1xuXG4gICAgZG9uZShlcXVhbCh1dGlsLmRhdGUoXCIxOTc5LTEyLTE2VDA5OjAwOjAwXCIpLCBkYXRlKSk7XG4gIH0pO1xuXG4gIC8vVXNhZ2UgMDhcbiAgaXQoJ3V0aWwuZGF0ZShcIjIwMTcwNDExMTAzMzE3XCIpIFtzdHJpbmcubGVuZ3RoID09IDE0XScsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgyMDE3LCAzLCAxMSk7XG4gICAgZGF0ZS5zZXRIb3VycygxMCk7XG4gICAgZGF0ZS5zZXRNaW51dGVzKDMzKTtcbiAgICBkYXRlLnNldFNlY29uZHMoMTcpO1xuICAgIGRvbmUoZXF1YWwodXRpbC5kYXRlKFwiMjAxNzA0MTExMDMzMTdcIiksIGRhdGUpKTtcbiAgfSk7XG5cbiAgLy9Vc2FnZSAwOVxuICBpdCgndXRpbC5kYXRlKFwiMjAxNzA0XCIpIFtzdHJpbmcubGVuZ3RoID4gN10nLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgIHZhciBkYXRlID0gbmV3IERhdGUoMjAxNywgMywgMTIpO1xuICAgIGRhdGUuc2V0SG91cnMoMTIpO1xuICAgIGRvbmUoZXF1YWwodXRpbC5kYXRlKFwiMjAxNzA0MTJcIiksIGRhdGUpKTtcbiAgfSk7XG5cbiAgLy9Vc2FnZSAxMFxuICBpdCgndXRpbC5kYXRlKFwiMjAxNzA0XCIpIFtzdHJpbmcubGVuZ3RoID4gNF0nLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgIHZhciBkYXRlID0gbmV3IERhdGUoMjAxNywgMyk7XG4gICAgZGF0ZS5zZXRIb3VycygxMik7XG4gICAgZG9uZShlcXVhbCh1dGlsLmRhdGUoXCIyMDE3MDRcIiksIGRhdGUpKTtcbiAgfSk7XG5cbiAgLy9Vc2FnZSAxMVxuICBpdCgndXRpbC5kYXRlKFwiMjAxN1wiKSBbc3RyaW5nLmxlbmd0aCA+IDJdJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKDIwMTcsIDApO1xuICAgIGRhdGUuc2V0SG91cnMoMTIpO1xuICAgIGRvbmUoZXF1YWwodXRpbC5kYXRlKFwiMjAxN1wiKSwgZGF0ZSkpO1xuICB9KTtcblxuICAvL1VzYWdlIDEyXG4gIGl0KCd1dGlsLmRhdGUoXCIxN1wiKSBbc3RyaW5nLmxlbmd0aCA8PSAyXScsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIGRvbmUoZXF1YWwodXRpbC5kYXRlKFwiMTdcIiksIGRhdGUpKTtcbiAgfSk7XG5cbiAgLy9Vc2FnZSAxM1xuICBpdCgndXRpbC5kYXRlKGRhdGUsIHtyZXR1cm46IFwieXl5eS1NTS1kZFwifSknLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgIHZhciBkYXRlID0gbmV3IERhdGUoMjAxNywgMywgMTYpO1xuICAgIGRvbmUoZXF1YWwodXRpbC5kYXRlKGRhdGUsIHtyZXR1cm46IFwieXl5eS1NTS1kZFwifSksIFwiMjAxNy0wNC0xNlwiKSk7XG4gIH0pO1xuXG4gIC8vVXNhZ2UgMTRcbiAgaXQoJ3V0aWwuZGF0ZShkYXRlLCB7cmV0dXJuOiBcInl5eXktTU0tZGQgaGg6bW06c3NcIn0pJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKDIwMTcsIDMsIDE2LCAxMiwgMzAsIDE1KTtcbiAgICBkb25lKGVxdWFsKHV0aWwuZGF0ZShkYXRlLCB7cmV0dXJuOiBcInl5eXktTU0tZGQgaGg6bW06c3NcIn0pLCBcIjIwMTctMDQtMTYgMTI6MzA6MTVcIikpO1xuICB9KTtcblxuICAvL1VzYWdlIDE1XG4gIGl0KCd1dGlsLmRhdGUoZGF0ZSwge3JldHVybjogXCJkd1wifSknLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgIHZhciBkYXRlID0gbmV3IERhdGUoMjAxNywgMywgMTYpO1xuICAgIGRvbmUoZXF1YWwodXRpbC5kYXRlKGRhdGUsIHtyZXR1cm46IFwiZHdcIn0pLCBcIlNVTlwiKSk7XG4gIH0pO1xuXG4gIC8vVXNhZ2UgMTZcbiAgaXQoJ3V0aWwuZGF0ZShcIjIwMTctMDQtMTcgMTE6MDA6MDBcIiwge2FkZDoge2g6IDF9fSknLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgIHZhciBkYXRlID0gbmV3IERhdGUoMjAxNywgMywgMTcsIDEyKTtcbiAgICBkb25lKGVxdWFsKHV0aWwuZGF0ZShcIjIwMTctMDQtMTcgMTE6MDA6MDBcIiwge2FkZDoge2g6IDF9fSksIGRhdGUpKTtcbiAgfSk7XG5cbiAgLy9Vc2FnZSAxN1xuICBpdCgndXRpbC5kYXRlKFwiMjAxNy0wNC0xNyAxMTowMDowMFwiLCB7YWRkOiB7aDogMX19KScsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgyMDE3LCAzLCAxNywgMTIpO1xuICAgIGRvbmUoZXF1YWwodXRpbC5kYXRlKFwiMjAxNy0wNC0xNyAxMTowMDowMFwiLCB7YWRkOiB7aDogMX19KSwgZGF0ZSkpO1xuICB9KTtcblxuICAvL1VzYWdlIDE4XG4gIGl0KCd1dGlsLmRhdGUoXCIyMDE3LTA2LTE3IDAxOjU1OjAwXCIsIHthZGQ6IHtoOiAxfX0pJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKDIwMTcsIDUsIDE3LCAyLCA1NSk7XG4gICAgZG9uZShlcXVhbCh1dGlsLmRhdGUoXCIyMDE3LTA2LTE3IDAxOjU1OjAwXCIsIHthZGQ6IHtoOiAxfX0pLCBkYXRlKSk7XG4gIH0pO1xuXG4gIC8vVXNhZ2UgMTlcbiAgaXQoJ3V0aWwuZGF0ZShcIjIwMTctMDQtMTZcIiwge2FkZDoge2Q6IDF9fSknLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgIHZhciBkYXRlID0gbmV3IERhdGUoMjAxNywgMywgMTcsIDEyKTtcbiAgICBkb25lKGVxdWFsKHV0aWwuZGF0ZShcIjIwMTctMDQtMTZcIiwge2FkZDoge2Q6IDF9fSksIGRhdGUpKTtcbiAgfSk7XG5cbiAgLy9Vc2FnZSAyMFxuICBpdCgndXRpbC5kYXRlKFwiMjAxNy0wNS0xNlwiLCB7YWRkOiB7bTogMX19KScsIGZ1bmN0aW9uIChkb25lKSB7XG4gICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgyMDE3LCA1LCAxNiwgMTIpO1xuICAgIGRvbmUoZXF1YWwodXRpbC5kYXRlKFwiMjAxNy0wNS0xNlwiLCB7YWRkOiB7bTogMX19KSwgZGF0ZSkpO1xuICB9KTtcblxuICAvL1VzYWdlIDIxXG4gIGl0KCd1dGlsLmRhdGUoXCIyMDE3LTA0LTIyXCIsIHthZGQ6IHt5OiAxfX0pJywgZnVuY3Rpb24gKGRvbmUpIHtcbiAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKDIwMTgsIDMsIDIyLCAxMik7XG4gICAgZG9uZShlcXVhbCh1dGlsLmRhdGUoXCIyMDE3LTA0LTIyXCIsIHthZGQ6IHt5OiAxfX0pLCBkYXRlKSk7XG4gIH0pO1xuXG4gIC8vVXNhZ2UgMjJcbiAgaXQoJ3V0aWwuZGF0ZShcIjIwMTYtMDQtMjNcIiwge2FkZDoge2Q6IDEuNX0sIHJldHVybjogXCJkZFwifSknLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgIHZhciBzdHIgPSBcIjI1XCI7XG4gICAgZG9uZShlcXVhbCh1dGlsLmRhdGUoXCIyMDE2LTA0LTIzXCIsIHthZGQ6IHtkOiAxLjV9LCByZXR1cm46IFwiZGRcIn0pLCBzdHIpKTtcbiAgfSk7XG5cbiAgLyogZW5kIHV0aWwuZGF0ZSAqL1xuXG59KTtcblxuZGVzY3JpYmUoJ3V0aWwubnVtYmVyIFRFU1QnLCBmdW5jdGlvbiAoKSB7XG4gIHZhciB0ZXN0Q2FzZXMgPSBbXG4gICAge1xuICAgICAgYXJnczogW1xuICAgICAgICAxMjM0NTY3ODkuNjc4LFxuICAgICAgICB7XG4gICAgICAgICAgcm91bmQ6IDFcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIGV4cGVjdDogMTIzNDU2Nzg5LjcsXG4gICAgICBleHBsYW5hdGlvbjogMTIzNDU2Nzg5LjY3OCArICcsIHsgcm91bmQ6IDEgfSdcbiAgICB9LFxuICAgIHtcbiAgICAgIGFyZ3M6IFtcbiAgICAgICAgMTIzNDU2Nzg5LjY3OCxcbiAgICAgICAge1xuICAgICAgICAgIHJvdW5kOiAxLFxuICAgICAgICAgIG1vbmV5OiB0cnVlXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBleHBlY3Q6ICcxMjMsNDU2LDc4OS43JyxcbiAgICAgIGV4cGxhbmF0aW9uOiAxMjM0NTY3ODkuNjc4ICsgJywgeyByb3VuZDogMSwgbW9uZXk6IHRydWUgfSdcbiAgICB9LFxuICAgIHtcbiAgICAgIGFyZ3M6IFtcbiAgICAgICAgMTIzNDU2Nzg5LjY3OCxcbiAgICAgICAge1xuICAgICAgICAgIHJvdW5kOiAyLFxuICAgICAgICAgIGJ5dGU6IHRydWVcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIGV4cGVjdDogJzExNy43TUInLFxuICAgICAgZXhwbGFuYXRpb246IDEyMzQ1Njc4OS42NzggKyAnLCB7IHJvdW5kOiAyLCBieXRlOiB0cnVlIH0nXG4gICAgfSxcbiAgICB7XG4gICAgICBhcmdzOiBbXG4gICAgICAgIC0xMjM0NTY3ODkuNjc4LFxuICAgICAgICB7XG4gICAgICAgICAgYWJzOiB0cnVlLFxuICAgICAgICAgIHJvdW5kOiAyLFxuICAgICAgICAgIG1vbmV5OiB0cnVlXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBleHBlY3Q6ICcxMjMsNDU2LDc4OS42OCcsXG4gICAgICBleHBsYW5hdGlvbjogLTEyMzQ1Njc4OS42NzggKyAnLHsgYWJzOiB0cnVlLCByb3VuZDogMiwgbW9uZXk6IHRydWUgfSdcbiAgICB9LFxuICAgIHtcbiAgICAgIGFyZ3M6IFtcbiAgICAgICAgLTEyMzQ1Njc4OS42NzgsXG4gICAgICAgIHtcbiAgICAgICAgICBhYnM6IHRydWUsXG4gICAgICAgICAgY2VpbDogdHJ1ZSxcbiAgICAgICAgICBtb25leTogdHJ1ZVxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgZXhwZWN0OiAnMTIzLDQ1Niw3OTAnLFxuICAgICAgZXhwbGFuYXRpb246IC0xMjM0NTY3ODkuNjc4ICsgJyx7IGFiczogdHJ1ZSwgY2VpbDogdHJ1ZSwgbW9uZXk6IHRydWUgfSdcbiAgICB9LFxuICAgIHtcbiAgICAgIGFyZ3M6IFtcbiAgICAgICAgLTEyMzQ1Njc4OS42NzgsXG4gICAgICAgIHtcbiAgICAgICAgICBhYnM6IHRydWUsXG4gICAgICAgICAgZmxvb3I6IHRydWUsXG4gICAgICAgICAgbW9uZXk6IHRydWVcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIGV4cGVjdDogJzEyMyw0NTYsNzg5JyxcbiAgICAgIGV4cGxhbmF0aW9uOiAtMTIzNDU2Nzg5LjY3OCArICcseyBhYnM6IHRydWUsIGZsb29yOiB0cnVlLCBtb25leTogdHJ1ZSB9J1xuICAgIH0sXG4gICAge1xuICAgICAgYXJnczogW1xuICAgICAgICAxMDIzLFxuICAgICAgICB7XG4gICAgICAgICAgYnl0ZTogdHJ1ZVxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgZXhwZWN0OiAnMUtCJyxcbiAgICAgIGV4cGxhbmF0aW9uOiAxMDIzICsgJyx7Ynl0ZTogdHJ1ZX0nXG4gICAgfSxcbiAgICB7XG4gICAgICBhcmdzOiBbXG4gICAgICAgIDEwMjQgKiAxMDI0LFxuICAgICAgICB7XG4gICAgICAgICAgYnl0ZTogdHJ1ZVxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgZXhwZWN0OiAnMTAyNEtCJyxcbiAgICAgIGV4cGxhbmF0aW9uOiAxMDI0ICogMTAyNCArICcse2J5dGU6IHRydWV9J1xuICAgIH0sXG4gICAge1xuICAgICAgYXJnczogW1xuICAgICAgICAxMDI0ICogMTAyNCAqIDUsXG4gICAgICAgIHtcbiAgICAgICAgICBieXRlOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBleHBlY3Q6ICc1TUInLFxuICAgICAgZXhwbGFuYXRpb246IDEwMjQgKiAxMDI0ICogNSArICcse2J5dGU6IHRydWV9J1xuICAgIH0sXG4gICAge1xuICAgICAgYXJnczogW1xuICAgICAgICAxMDI0ICogMTAyNCAqIDEwMjQsXG4gICAgICAgIHtcbiAgICAgICAgICBieXRlOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBleHBlY3Q6ICcxMDI0TUInLFxuICAgICAgZXhwbGFuYXRpb246IDEwMjQgKiAxMDI0ICogMTAyNCArICcse2J5dGU6IHRydWV9J1xuICAgIH0sXG4gICAge1xuICAgICAgYXJnczogW1xuICAgICAgICAxMDI0ICogMTAyNCAqIDEwMjQgKiA1LFxuICAgICAgICB7XG4gICAgICAgICAgYnl0ZTogdHJ1ZVxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgZXhwZWN0OiAnNUdCJyxcbiAgICAgIGV4cGxhbmF0aW9uOiAxMDI0ICogMTAyNCAqIDEwMjQgKyAnLHtieXRlOiB0cnVlfSdcbiAgICB9LFxuICAgIHtcbiAgICAgIGFyZ3M6IFtcbiAgICAgICAgJ0EtMTIzNH5+NTY3ODkuOH44ODhQWCcsXG4gICAgICAgIHtcbiAgICAgICAgICBhYnM6IHRydWUsXG4gICAgICAgICAgcm91bmQ6IDIsXG4gICAgICAgICAgbW9uZXk6IHRydWVcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIGV4cGVjdDogJzEyMyw0NTYsNzg5Ljg5JyxcbiAgICAgIGV4cGxhbmF0aW9uOiAnQS0xMjM0fn41Njc4OS44fjg4OFBYICwgeyBhYnM6IHRydWUsIHJvdW5kOiAyLCBtb25leTogdHJ1ZSB9J1xuICAgIH1cbiAgXTtcbiAgdGVzdENhc2VzLmZvckVhY2goZnVuY3Rpb24gKHRlc3RDYXNlKSB7XG4gICAgaXQoJ3V0aWwubnVtYmVyKCcgKyB0ZXN0Q2FzZS5leHBsYW5hdGlvbiArICcpIGV4cGVjdCAnICsgdGVzdENhc2UuZXhwZWN0LCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgdmFyIGFjdHVhbCA9IHV0aWwubnVtYmVyLmFwcGx5KHRoaXMsIHRlc3RDYXNlLmFyZ3MpO1xuICAgICAgZG9uZShlcXVhbChhY3R1YWwsIHRlc3RDYXNlLmV4cGVjdCkpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuXG5cbiQoXCIjc2FtcGxlLWJvZHlcIikuYXBwZW5kKCRlbCk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==