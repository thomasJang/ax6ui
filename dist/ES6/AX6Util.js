import info from "./AX6Info";

/**
 * @module AX6Util
 */

const _toString = Object.prototype.toString;
const reIsJson = /^(["'](\\.|[^"\\\n\r])*?["']|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/,
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
    let key,
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
        for (let key in O) {
            if (typeof O[key] != "undefined" && isFunction(_fn) && _fn.call(O[key], key, O[key])) {
                return key;
                break;
            } else if (O[key] == _fn) {
                return key;
                break;
            }
        }
    } else {
        for (let i = 0, l = O.length; i < l; i++) {
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
    let k,
        i = 0,
        l = O.length,
        results = [],
        fnResult;
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
    let jsonString = "";
    if (isArray(O)) {
        let i = 0,
            l = O.length;
        jsonString += "[";
        for (; i < l; i++) {
            if (i > 0) jsonString += ",";
            jsonString += toJson(O[i]);
        }
        jsonString += "]";
    } else if (isObject(O)) {
        jsonString += "{";
        let jsonObjectBody = [];
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
    let typeName;
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
    let result = false;

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
            let mm = O.substr(4, 2),
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
        let keys = Object.keys(O);
        let item = {};
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
        let keys = Object.keys(O);
        let item = {};
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
    let expire;
    if (typeof exdays === "number") {
        expire = new Date();
        expire.setDate(expire.getDate() + exdays);
    }
    opts = opts || {};
    return doc.cookie = [escape(cn), '=', escape(cv), expire ? "; expires=" + expire.toUTCString() : "", // use expires attribute, max-age is not supported by IE
    opts.path ? "; path=" + opts.path : "", opts.domain ? "; domain=" + opts.domain : "", opts.secure ? "; secure" : ""].join("");
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = doc.cookie.split(';'),
        i = 0,
        l = ca.length;
    for (; i < l; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return unescape(c.substring(name.length, c.length));
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
    let result,
        pair = ('' + str).split(reDot),
        isMinus,
        returnValue;

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
    info.onerror.apply(this, arguments);
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
    let yy,
        mm,
        dd,
        hh,
        mi,
        aDateTime,
        aTimes,
        aTime,
        aDate,
        va,
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
                let yy,
                    mm,
                    dd,
                    mxdd,
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
                let yy,
                    mm,
                    dd,
                    processor = {
                    "firstDayOfMonth": function (date) {
                        yy = date.getFullYear();
                        mm = date.getMonth();
                        dd = 1;
                        return new Date(yy, mm, dd, 12);
                    },
                    "lastDayOfMonth": function (date) {
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

                let fStr = cond["return"],
                    nY,
                    nM,
                    nD,
                    nH,
                    nMM,
                    nS,
                    nDW,
                    yre,
                    regY,
                    mre,
                    regM,
                    dre,
                    regD,
                    hre,
                    regH,
                    mire,
                    regMI,
                    sre,
                    regS,
                    dwre,
                    regDW;

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
                    fStr = fStr.replace(regDW, info.weekNames[nDW].label);
                }
                return fStr;
            }();
        } else {
            return d;
        }
    }
}

function dday(d, cond) {
    let memoryDay = date(d),
        DyMilli = 1000 * 60 * 60 * 24,
        today = new Date(),
        diffnum,
        thisYearMemoryDay;

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
    let myDate = date(d);
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
    let s = num.toString(radix || 10);
    return times(padder || '0', length - s.length) + s;
}

function times(s, count) {
    return count < 1 ? '' : new Array(count + 1).join(s);
}

function findParentNode(_target, cond) {
    if (_target) {
        while (function () {
            let result = true;
            if (typeof cond === "undefined") {
                _target = _target.parentNode ? _target.parentNode : false;
            } else if (isFunction(cond)) {
                result = cond(_target);
            } else if (isObject(cond)) {
                for (let k in cond) {
                    if (k === "tagname") {
                        if (_target.tagName.toLocaleLowerCase() != cond[k]) {
                            result = false;
                            break;
                        }
                    } else if (k === "clazz" || k === "class_name") {
                        if ("className" in _target) {
                            let klasss = _target.className.split(reClassNameSplit),
                                hasClass = false;

                            for (let a = 0; a < klasss.length; a++) {
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
    let re = /\D?(\d+)([a-zA-Z%]*)/i,
        found = ('' + val).match(re),
        unit = found[2] || "px";

    return found[1] + unit;
}

function css(val) {
    let returns;
    if (isObject(val)) {
        returns = '';
        for (let k in val) {
            returns += k + ':' + val[k] + ';';
        }
        return returns;
    } else if (isString(val)) {
        returns = {};
        let valSplited = val.split(/[ ]*;[ ]*/g);
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

const selectRange = function () {
    const processor = {
        'textRange': {
            'selectAll': function (el, range, offset) {},
            'arr': function (el, range, offset) {
                range.moveStart("character", offset[0]); // todo ie node select 체크필요
                range.collapse();
                range.moveEnd("character", offset[1]);
            },
            'start': function (el, range, offset) {
                range.moveStart("character", 0);
                range.collapse();
            },
            'end': function (el, range, offset) {
                range.moveStart("character", range.text.length);
                range.collapse();
            }
        },
        'range': {
            'selectAll': function (el, range, offset) {
                range.selectNodeContents(el);
            },
            'arr': function (el, range, offset) {
                if (isObject(offset[0])) {
                    range.setStart(offset[0].node, offset[0].offset);
                    range.setEnd(offset[1].node, offset[1].offset);
                } else {
                    range.setStart(el.firstChild, offset[0]);
                    range.setEnd(el.firstChild, offset[1]);
                }
            },
            'start': function (el, range, offset) {
                range.selectNodeContents(el);
                range.collapse(true);
            },
            'end': function (el, range, offset) {
                range.selectNodeContents(el);
                range.collapse(false);
            }
        }
    };
    return function (el, offset) {
        let range, rangeType, selection;

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

const debounce = function (func, wait, immediately) {
    let timeout, removeTimeout;
    const debounced = function () {
        let args = toArray(arguments);

        if (removeTimeout) clearTimeout(removeTimeout);
        if (timeout) {
            // 두번째 호출
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(function (args) {
                func.apply(this, args);
            }.bind(this, args), wait);
        } else {
            // 첫 호출
            timeout = setTimeout(function (args) {
                func.apply(this, args);
            }.bind(this, args), immediately ? 0 : wait);
        }
        removeTimeout = setTimeout(function () {
            clearTimeout(timeout);
            timeout = null;
        }, wait);
    };
    debounced.cancel = function () {
        clearTimeout(timeout);
        clearTimeout(removeTimeout);
        timeout = null;
    };

    return debounced;
};

function deepCopy(obj) {
    let r, l;
    if (typeof obj == 'object') {
        if (isArray(obj)) {
            l = obj.length;
            r = new Array(l);
            for (let i = 0; i < l; i++) {
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
            let args = [];
            for (let i = 0, l = arguments.length; i < l; i++) {
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

    const matchers = function () {

        // <http://www.w3.org/TR/css3-values/#integers>
        const CSS_INTEGER = "[-\\+]?\\d+%?";

        // <http://www.w3.org/TR/css3-values/#number-value>
        const CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";

        // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
        const CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";

        // Actual matching.
        // Parentheses and commas are optional, but not required.
        // Whitespace can take the place of commas or opening paren
        const PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
        const PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";

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

    const convertObject = function (_color) {
        let match;
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
        return AX6Util.number(Math.min(255, Math.max(n, 0)), { 'round': 2 });
    }

    function convertToHex(n) {
        return setDigit(Math.round(n).toString(16), 2);
    }

    function bound01(n, max) {
        if (isOnePointZero(n)) {
            n = "100%";
        }

        let processPercent = isPercentage(n);
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

        let max = Math.max(r, g, b),
            min = Math.min(r, g, b);
        let h,
            s,
            l = (max + min) / 2;

        if (max == min) {
            h = s = 0; // achromatic
        } else {
            let d = max - min;
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
        let r, g, b;

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
            let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            let p = 2 * l - q;
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
            let hsl = rgbToHsl(this.r, this.g, this.b),
                rgb = {};

            hsl.l += amount / 100;
            hsl.l = Math.min(1, Math.max(0, hsl.l));
            hsl.h = hsl.h * 360;

            rgb = hslToRgb(hsl.h, convertToPercentage(hsl.s), convertToPercentage(hsl.l));

            return color('rgba(' + convertTo255(rgb.r) + ', ' + convertTo255(rgb.g) + ', ' + convertTo255(rgb.b) + ', ' + this.a + ')');
        };

        this.darken = function (amount) {
            amount = amount === 0 ? 0 : amount || 10;
            let hsl = rgbToHsl(this.r, this.g, this.b),
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
            let hsl = rgbToHsl(this.r, this.g, this.b);
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

export default {

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
     * @param {Boolean} immediately
     * @returns {debounced}
     * @example
     * ```js
     * var debounceFn = AX6Util.debounce(function( val ) { console.log(val); }, 300);
     * $(document.body).click(function(){
         *  debounceFn(new Date());
         * });
     * ```
     */
    debounce: debounce,
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