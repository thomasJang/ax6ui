"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var win = window;
var doc = win ? win.document : null;
var docElem = win ? win.document.documentElement : null;

/**
 * @module AX6Info
 */

/**
 * 에러 출력메세지 사용자 재 정의
 * @member {Object} AX6Info.onerror
 * @example
 * ```
 * AX6Info.onerror = function(){
 *  console.log(arguments);
 * }
 * ```
 */
var onerror = function onerror() {
    console.error(arguments);
};

/**
 * event keyCodes
 * @member {Object} AX6Info.eventKeys
 * @example
 * ```
 * {
		 * 	BACKSPACE: 8, TAB: 9,
		 * 	RETURN: 13, ESC: 27, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, DELETE: 46,
		 * 	HOME: 36, END: 35, PAGEUP: 33, PAGEDOWN: 34, INSERT: 45, SPACE: 32
		 * }
 * ```
 */
var eventKeys = {
    BACKSPACE: 8, TAB: 9,
    RETURN: 13, ESC: 27, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, DELETE: 46,
    HOME: 36, END: 35, PAGEUP: 33, PAGEDOWN: 34, INSERT: 45, SPACE: 32
};

/**
 * week names
 * @member {Object[]} weekNames
 * @member {string} weekNames[].label
 *
 * @example
 * ```
 * [
 *  {label: "SUN"},{label: "MON"},{label: "TUE"},{label: "WED"},{label: "THU"},{label: "FRI"},{label: "SAT"}
 * ]
 * console.log( weekNames[0] );
 * console.log( AX6Info.weekNames[(new Date()).getDay()].label )
 * ```
 */
var weekNames = [{ label: "SUN" }, { label: "MON" }, { label: "TUE" }, { label: "WED" }, { label: "THU" }, { label: "FRI" }, { label: "SAT" }];

/**
 * 사용자 브라우저 식별용 오브젝트
 * @member {Object} AX6Info.browser
 * @example
 * ```
 * console.log( AX6Info.browser );
 * //Object {name: "chrome", version: "39.0.2171.71", mobile: false}
 * ```
 */
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

/**
 * 브라우저 여부
 * @member {Boolean} AX6Info.isBrowser
 */
var isBrowser = !!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && win.document);

/**
 * 브라우저에 따른 마우스 휠 이벤트이름
 * @member {Object} AX6Info.wheelEnm
 */
var wheelEnm = win && /Firefox/i.test(navigator.userAgent) ? "DOMMouseScroll" : "mousewheel";

/**
 * 첫번째 자리수 동사 - (필요한것이 없을때 : 4, 실행오류 : 5)
 * 두번째 자리수 목적어 - 문자열 0, 숫자 1, 배열 2, 오브젝트 3, 함수 4, DOM 5, 파일 6, 기타 7
 * 세번째 자리수 옵션
 * @member {Object} AX6Info.errorMsg
 */
var errorMsg = {};

/**
 * 현재 페이지의 Url 정보를 리턴합니다.
 * @method AX6Info.urlUtil
 * @returns {Object}
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
function urlUtil(url, urls) {
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
}

/**
 * ax5-error-msg.js 에 정의된 ax5 error를 반환합니다.
 * @method AX6Info.getError
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
function getError(className, errorCode, methodName) {
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
}

/**
 * 브라우져의 터치 가능 유무를 확인합니다.
 * @method AX6Info.supportTouch
 * @returns {boolean}
 * @example
 * ```
 * var chkFlag = AX6Info.supportTouch;
 */
var supportTouch = win ? 'ontouchstart' in win || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 : false;

var supportFileApi = win ? win.FileReader && win.File && win.FileList && win.Blob : false;

exports.default = {
    errorMsg: errorMsg,
    onerror: onerror,
    eventKeys: eventKeys,
    weekNames: weekNames,
    browser: browser,
    isBrowser: isBrowser,
    supportTouch: supportTouch,
    supportFileApi: supportFileApi,
    wheelEnm: wheelEnm,
    urlUtil: urlUtil,
    getError: getError
};