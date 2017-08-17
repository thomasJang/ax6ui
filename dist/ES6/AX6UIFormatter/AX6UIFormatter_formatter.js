import U from "../AX6Util";

let TODAY = new Date();

/**
 * @module AX6UIFormatter_formatter
 */

let ctrlKeys = {
  "18": "KEY_ALT",
  "8": "KEY_BACKSPACE",
  "17": "KEY_CONTROL",
  "46": "KEY_DELETE",
  "40": "KEY_DOWN",
  "35": "KEY_END",
  "187": "KEY_EQUAL",
  "27": "KEY_ESC",
  "36": "KEY_HOME",
  "45": "KEY_INSERT",
  "37": "KEY_LEFT",
  "189": "KEY_MINUS",
  "34": "KEY_PAGEDOWN",
  "33": "KEY_PAGEUP",
  // "190": "KEY_PERIOD",
  "13": "KEY_RETURN",
  "39": "KEY_RIGHT",
  "16": "KEY_SHIFT",
  // "32": "KEY_SPACE",
  "9": "KEY_TAB",
  "38": "KEY_UP",
  "91": "KEY_WINDOW"
  //"107" : "NUMPAD_ADD",
  //"194" : "NUMPAD_COMMA",
  //"110" : "NUMPAD_DECIMAL",
  //"111" : "NUMPAD_DIVIDE",
  //"12" : "NUMPAD_EQUAL",
  //"106" : "NUMPAD_MULTIPLY",
  //"109" : "NUMPAD_SUBTRACT"
};

let numKeys = {
  '48': 1, '49': 1, '50': 1, '51': 1, '52': 1, '53': 1, '54': 1, '55': 1, '56': 1, '57': 1,
  '96': 1, '97': 1, '98': 1, '99': 1, '100': 1, '101': 1, '102': 1, '103': 1, '104': 1, '105': 1
};

let pattern_money = {
  getEnterableKeyCodes: function (_opts) {
    let enterableKeyCodes = {
      '188': ','
    };
    if (_opts.patternArgument == "int") {
      // 소수점 입력 안됨
    } else {
      enterableKeyCodes['190'] = "."; // 소수점 입력 허용
    }
    return Object.assign(enterableKeyCodes, ctrlKeys, numKeys);
  },
  getPatternValue: function (_opts, optIdx, e, val, eType) {
    val = val.replace(/[^0-9^\.^\-]/g, "");
    let regExpPattern = new RegExp('([0-9])([0-9][0-9][0-9][,.])'),
        arrNumber = val.split('.'),
        returnValue;

    arrNumber[0] += '.';

    do {
      arrNumber[0] = arrNumber[0].replace(regExpPattern, '$1,$2');
    } while (regExpPattern.test(arrNumber[0]));

    if (arrNumber.length > 1) {
      if (U.isNumber(_opts.maxRound)) {
        returnValue = arrNumber[0] + U.left(arrNumber[1], _opts.maxRound);
      } else {
        returnValue = arrNumber.join('');
      }
    } else {
      returnValue = arrNumber[0].split('.')[0];
    }

    return returnValue;
  }
};

let pattern_number = {
  getEnterableKeyCodes: function getEnterableKeyCodes(_opts) {
    let enterableKeyCodes = {
      '190': '.',
      '110': '.'

    };
    return Object.assign(enterableKeyCodes, ctrlKeys, numKeys);
  },
  getPatternValue: function (_opts, optIdx, e, val, eType) {
    val = val.replace(/[^0-9^\.^\-]/g, "");
    let arrNumber = val.split('.'),
        returnValue;

    arrNumber[0] += ".";

    if (arrNumber.length > 1) {
      if (U.isNumber(_opts.maxRound)) {
        returnValue = arrNumber[0] + U.left(arrNumber[1], _opts.maxRound);
      } else {
        returnValue = arrNumber.join('');
      }
    } else {
      returnValue = arrNumber[0].split('.')[0];
    }

    return returnValue;
  }
};

let pattern_date = {
  getEnterableKeyCodes: function (_opts) {
    let enterableKeyCodes = {
      '189': '-', '191': '/'
    };
    return Object.assign(enterableKeyCodes, ctrlKeys, numKeys);
  },
  getPatternValue: function (_opts, optIdx, e, val, eType) {
    val = val.replace(/\D/g, "");
    if (val == "") return val;
    let regExpPattern = /^([0-9]{4})\-?([0-9]{1,2})?\-?([0-9]{1,2})?.*$/;

    if (_opts.patternArgument == "time") {
      regExpPattern = /^([0-9]{4})\-?([0-9]{1,2})?\-?([0-9]{1,2})? ?([0-9]{1,2})?:?([0-9]{1,2})?:?([0-9]{1,2})?.*$/;
    } else if (_opts.patternArgument == "year") {
      regExpPattern = /^([0-9]{0,4})?.*$/;
    } else if (_opts.patternArgument == "month") {
      regExpPattern = /^([0-9]{4})\-?([0-9]{1,2})?.*$/;
    }

    let matchedPattern = val.match(regExpPattern),
        returnValue = "",
        inspectValue = function (val, format, inspect, data) {
      let _val = {
        'Y': function (v) {
          if (typeof v == "undefined") v = TODAY.getFullYear();
          if (v == '' || v == '0000') v = TODAY.getFullYear();
          return v.length < 4 ? U.setDigit(v, 4) : v;
        },
        'M': function (v) {
          if (typeof v == "undefined") v = TODAY.getMonth() + 1;
          return v > 12 ? 12 : v == 0 ? '01' : U.setDigit(v, 2);
        },
        'D': function (v) {
          if (typeof v == "undefined") v = TODAY.getDate() + 1;
          let dLen = U.daysOfMonth(data[1], data[2] - 1);
          return v > dLen ? dLen : v == 0 ? '01' : U.setDigit(v, 2);
        },
        'h': function (v) {
          if (!v) v = 0;
          return v > 23 ? 23 : U.setDigit(v, 2);
        },
        'm': function (v) {
          if (!v) v = 0;
          return v > 59 ? 59 : U.setDigit(v, 2);
        },
        's': function (v) {
          if (!v) v = 0;
          return v > 59 ? 59 : U.setDigit(v, 2);
        }
      };
      return inspect ? _val[format](val) : val;
    };

    returnValue = val.replace(regExpPattern, function (a, b) {
      let nval = [];

      if (_opts.patternArgument == "year") {
        nval.push(inspectValue(arguments[1], "Y", eType));
      } else if (_opts.patternArgument == "month") {
        nval.push(inspectValue(arguments[1], "Y", eType));
        if (arguments[2] || eType) nval.push('-' + inspectValue(arguments[2], "M", eType));
      } else if (_opts.patternArgument == "time") {
        nval.push(inspectValue(arguments[1], "Y", eType));
        if (arguments[2] || eType) nval.push('-' + inspectValue(arguments[2], "M", eType));
        if (arguments[3] || eType) nval.push('-' + inspectValue(arguments[3], "D", eType, arguments));
        if (arguments[4] || eType) nval.push(' ' + inspectValue(arguments[4], "h", eType));
        if (arguments[5] || eType) nval.push(':' + inspectValue(arguments[5], "m", eType));
        if (arguments[6] || eType) nval.push(':' + inspectValue(arguments[6], "s", eType));
      } else {
        nval.push(inspectValue(arguments[1], "Y", eType));
        if (arguments[2] || eType) nval.push('-' + inspectValue(arguments[2], "M", eType));
        if (arguments[3] || eType) nval.push('-' + inspectValue(arguments[3], "D", eType, arguments));
      }
      return nval.join('');
    });

    if (eType == 'blur' && !matchedPattern) {
      returnValue = function () {
        let nval = [];

        if (_opts.patternArgument == "year") {
          nval.push(inspectValue(0, "Y", eType));
        } else if (_opts.patternArgument == "month") {
          nval.push(inspectValue(0, "Y", eType));
          nval.push('-' + inspectValue(0, "M", eType));
        } else if (_opts.patternArgument == "time") {
          nval.push(inspectValue(0, "Y", eType));
          nval.push('-' + inspectValue(0, "M", eType));
          nval.push('-' + inspectValue(0, "D", eType, arguments));
          nval.push(' ' + inspectValue(0, "h", eType));
          nval.push(':' + inspectValue(0, "m", eType));
          nval.push(':' + inspectValue(0, "s", eType));
        } else {
          nval.push(inspectValue(0, "Y", eType));
          nval.push('-' + inspectValue(0, "M", eType));
          nval.push('-' + inspectValue(0, "D", eType, arguments));
        }
        return nval.join('');
      }();
    } else if (!matchedPattern) returnValue = returnValue.length > 4 ? U.left(returnValue, 4) : returnValue;

    return returnValue;
  }
};

let pattern_time = {
  getEnterableKeyCodes: function (_opts) {
    let enterableKeyCodes = {
      '186': ':'
    };
    return Object.assign(enterableKeyCodes, ctrlKeys, numKeys);
  },
  getPatternValue: function (_opts, optIdx, e, val, eType) {
    val = val.replace(/\D/g, "");
    let regExpPattern = /^([0-9]{1,2})?:?([0-9]{1,2})?:?([0-9]{1,2})?.*$/;

    let matchedPattern = val.match(regExpPattern),
        returnValue = val.replace(regExpPattern, function (a, b) {
      let nval = [arguments[1]];
      if (arguments[2]) nval.push(':' + arguments[2]);
      if (arguments[3]) nval.push(':' + arguments[3]);
      return nval.join('');
    });

    if (!matchedPattern) returnValue = returnValue.length > 2 ? U.left(returnValue, 2) : returnValue;

    return returnValue;
  }
};

let pattern_bizno = {
  getEnterableKeyCodes: function (_opts) {
    let enterableKeyCodes = {
      '189': '-'
    };
    return Object.assign(enterableKeyCodes, ctrlKeys, numKeys);
  },
  getPatternValue: function (_opts, optIdx, e, val, eType) {
    val = val.replace(/\D/g, "");
    let regExpPattern = /^([0-9]{3})\-?([0-9]{1,2})?\-?([0-9]{1,5})?.*$/,
        returnValue = val.replace(regExpPattern, function (a, b) {
      let nval = [arguments[1]];
      if (arguments[2]) nval.push(arguments[2]);
      if (arguments[3]) nval.push(arguments[3]);
      return nval.join("-");
    });

    return returnValue;
  }
};

let pattern_phone = {
  getEnterableKeyCodes: function (_opts) {
    let enterableKeyCodes = {
      '189': '-', '188': ','
    };
    return Object.assign(enterableKeyCodes, ctrlKeys, numKeys);
  },
  getPatternValue: function (_opts, optIdx, e, val, eType) {
    val = val.replace(/\D/g, "");
    let regExpPattern3 = /^([0-9]{3})\-?([0-9]{1,4})?\-?([0-9]{1,4})?\-?([0-9]{1,4})?\-?([0-9]{1,4})?/;
    if (val.substr(0, 2) == "02") {
      regExpPattern3 = /^([0-9]{2})\-?([0-9]{1,4})?\-?([0-9]{1,4})?\-?([0-9]{1,4})?\-?([0-9]{1,4})?/;
    }

    let returnValue = val.replace(regExpPattern3, function (a, b) {
      let nval = [arguments[1]];
      if (arguments[2]) nval.push(arguments[2]);
      if (arguments[3]) nval.push(arguments[3]);
      if (arguments[4]) nval.push(arguments[4]);
      if (arguments[5]) nval.push(arguments[5]);
      return nval.join("-");
    });
    return returnValue;
  }
};

let pattern_credit = {
  getEnterableKeyCodes: function (_opts) {
    let enterableKeyCodes = {
      '189': '-'
    };
    return Object.assign(enterableKeyCodes, ctrlKeys, numKeys);
  },
  getPatternValue: function (_opts, optIdx, e, val, eType) {
    val = val.replace(/\D/g, "").substring(0, 16);

    let regExpPattern3 = /^([0-9]{4})\-?([0-9]{4})?\-?([0-9]{4})?\-?([0-9]{4})?/,
        returnValue = val.replace(regExpPattern3, function (a, b) {
      let nval = [arguments[1]];
      if (arguments[2]) nval.push(arguments[2]);
      if (arguments[3]) nval.push(arguments[3]);
      if (arguments[4]) nval.push(arguments[4]);
      return nval.join("-");
    });
    return returnValue;
  }
};

let pattern_custom = {
  getEnterableKeyCodes: function (_opts) {
    if (_opts.getEnterableKeyCodes) {
      return _opts.getEnterableKeyCodes.call(_opts, { $input: _opts.$input });
    } else {
      return null;
    }
  },
  getPatternValue: function (_opts, optIdx, e, val, eType) {
    if (_opts.getPatternValue) {
      return _opts.getPatternValue.call(_opts, { event: e, $input: _opts.$input, value: val });
    }
  }
};

export default {
  /**
   * 컨트롤 keycodes
   * @example
   * ```js
   * let ctrlKeys = {
    "18": "KEY_ALT",
    "8": "KEY_BACKSPACE",
    "17": "KEY_CONTROL",
    "46": "KEY_DELETE",
    "40": "KEY_DOWN",
    "35": "KEY_END",
    "187": "KEY_EQUAL",
    "27": "KEY_ESC",
    "36": "KEY_HOME",
    "45": "KEY_INSERT",
    "37": "KEY_LEFT",
    "189": "KEY_MINUS",
    "34": "KEY_PAGEDOWN",
    "33": "KEY_PAGEUP",
    "13": "KEY_RETURN",
    "39": "KEY_RIGHT",
    "16": "KEY_SHIFT",
    // "32": "KEY_SPACE",
    "9": "KEY_TAB",
    "38": "KEY_UP",
    "91": "KEY_WINDOW"
  };
   * ```
   */
  ctrlKeys: ctrlKeys,
  /**
   * 숫자키패드 keycodes
   * @example
   * ```js
   * let numKeys = {
    '48': 1, '49': 1, '50': 1, '51': 1, '52': 1, '53': 1, '54': 1, '55': 1, '56': 1, '57': 1,
    '96': 1, '97': 1, '98': 1, '99': 1, '100': 1, '101': 1, '102': 1, '103': 1, '104': 1, '105': 1
  };
   * ```
   */
  numKeys: numKeys,
  /**
   * 통화패턴
   */
  money: pattern_money,
  /**
   * 숫자패턴
   */
  number: pattern_number,
  /**
   * 날짜패턴
   */
  date: pattern_date,
  /**
   * 시간패턴
   */
  time: pattern_time,
  /**
   * 한국 사업자 번호 패턴
   */
  bizno: pattern_bizno,
  /**
   * 전화번호 패턴
   */
  phone: pattern_phone,
  credit: pattern_credit,
  /**
   * 사용자 정의 패턴 사용시
   */
  custom: pattern_custom
};