import * as U from "AX6Util";


var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
    re_tag = /<([\w:]+)/,
    re_single_tags = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    re_html = /<|&#?\w+;/,
    re_noInnerhtml = /<(?:script|style|link)/i,
    core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    re_margin = /^margin/,
    re_numsplit = new RegExp("^(" + core_pnum + ")(.*)$", "i"),
    re_numnonpx = new RegExp("^(" + core_pnum + ")(?!px)[a-z%]+$", "i"),
    re_position = /^(top|right|bottom|left)$/,
    re_is_json = /^(["'](\\.|[^"\\\n\r])*?["']|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/,
    re_ms = /^-ms-/,
    re_snake_case = /[\-_]([\da-z])/gi,
    re_camelCase = /([A-Z])/g,
    re_dot = /\./,
    re_int = /[-|+]?[\D]/gi,
    re_not_num = /\D/gi,
    re_money_split = new RegExp('([0-9])([0-9][0-9][0-9][,.])'),
    re_amp = /&/g,
    re_eq = /=/,
    re_className_split = /[ ]+/g,
    body = doc.createElement('body'),
    safe_fragment = (function() {
        var list = nodeNames.split("|"),
            safeFrag = doc.createDocumentFragment();
        if (safeFrag.createElement) {
            while (list.length) {
                safeFrag.createElement(
                    list.pop()
                );
            }
        }
        return safeFrag;
    })(),
    fragment_div = safe_fragment.appendChild(doc.createElement("div")),
    tag_map = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        area: [1, "<map>", "</map>"],
        param: [1, "<object>", "</object>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"]
    },
    tag_not_support_innerhtml = {
        col: 1, colGroup: 1, frameSet: 1, html: 1, head: 1, style: 1, table: 1,
        tBody: 1, tFoot: 1, tHead: 1, title: 1, tr: 1
    };

// 이벤트 바인딩
function eBind(elem, type, eventHandle) {
    if (!U.isString(type)) console.error("type=" + type);
    type = U.left(type, ".");
    if (elem.addEventListener) {
        elem.addEventListener(type, eventHandle, false);
    }
    else if (elem.attachEvent) {
        elem.attachEvent("on" + type, eventHandle);
    }
}

// 이벤트 언바인딩
function eUnBind(elem, type, eventHandle) {
    type = U.left(type, ".");
    if (elem.removeEventListener) {
        if (eventHandle) elem.removeEventListener(type, eventHandle);
        else {
            elem.removeEventListener(type);
        }
    }
    else if (elem.detachEvent) {
        if (eventHandle) elem.detachEvent("on" + type, eventHandle);
        else elem.detachEvent("on" + type);
    }
}

// 엘리먼트 인자 체크
function validateEl(elem, fnName) {
    let type = U.getType(elem);
    if (type === "window") return elem;
    else if (type === "array" && U.isElement(elem[0])) return elem;
    else if (type === "element") return [elem];
    else if (elem && elem.nodeType === 9) return [elem.documentElement];
    else if (elem && elem.toString() == "[object AX6Dom]") return elem.elements;
    else if (type !== "array" && type !== "nodelist") {
        //console.error("AX6Dom." + fnName + " : elements parameter incorrect");
        return [];
    }
    return elem;
}

// 엘리먼트 순서이동
function sibling(els, forward, times) {
    let prop = (forward == "prev") ? "previousSibling" : "nextSibling",
        el = [].concat(els)[0];
    times = (typeof times == "undefined" || times < 1) ? 1 : times;

    do {
        el = el[prop];
    }
    while (
        (function () {
            if (!el) return false;
            if (el.nodeType == 1) times--;
            return (times > 0)
        })()
        );
    return el;
}

const curCSS = (function () {
    if (window.getComputedStyle) {
        return function (elem, name, num) {
            let width, minWidth, maxWidth, computed, ret, style, left, rs, rsLeft;

            computed = window.getComputedStyle(elem, null),
                ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined,
                style = elem.style;

            if (computed) {

                // A tribute to the "awesome hack by Dean Edwards"
                // Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
                // Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
                // this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
                if (re_numnonpx.test(ret) && re_margin.test(name)) {
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

            if (num) ret = parseFloat(ret) || 0;
            return ret;
        }
    }
    else {
        return function (elem, name, num) {
            var width, minWidth, maxWidth, computed, ret, style, left, rs, rsLeft;

            computed = elem.currentStyle,
                ret = computed ? computed[name] : undefined,
                style = elem.style;

            // Avoid setting ret to empty string here
            // so we don't default to auto
            if (ret == null && style && style[name]) {
                ret = style[name];
            }

            // From the awesome hack by Dean Edwards
            // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

            // If we're not dealing with a regular pixel number
            // but a number that has a weird ending, we need to convert it to pixels
            // but not position css attributes, as those are proportional to the parent element instead
            // and we can't measure the parent instead because it might trigger a "stacking dolls" problem
            if (re_numnonpx.test(ret) && !re_position.test(name)) {

                // Remember the original values
                left = style.left;
                rs = elem.runtimeStyle;
                rsLeft = rs && rs.left;

                // Put in the new values to get a computed value out
                if (rsLeft) {
                    rs.left = elem.currentStyle.left;
                }
                style.left = name === "fontSize" ? "1em" : ret;
                ret = style.pixelLeft + "px";

                // Revert the changed values
                style.left = left;
                if (rsLeft) {
                    rs.left = rsLeft;
                }
            }
            ret = ret === "" ? "auto" : ret;

            if (num) ret = parseFloat(ret) || 0;
            return ret;
        }
    }
})();
// jQuery 1.10.2 소스를 참고하여 curCSS를 재작성하였습니다.

// 엘리먼트 스타일 값 가져오기
function style(el, key) {
    if (U.isString(key)) {
        return curCSS(el, key);
    }
    else if (U.isArray(key)) {
        let css = {}, i = 0, l = key.length;
        for (; i < l; i++) {
            css[key[i]] = curCSS(el, key[i]);
        }
        return css;
    }
    return null;
}

// 박스사이즈 구하기
function boxSize(els, fnName, opts) {
    let d = -1, tagName = "",
        el = [].concat(els)[0];

    if (U.isWindow(el)) {
        return el.document.documentElement[U.camelCase("client-" + fnName)];
    }
    else {
        let _sbs = U.camelCase("scroll-" + fnName), 
            _obs = U.camelCase("offset-" + fnName), 
            _cbs = U.camelCase("client-" + fnName);
        
        if (el) {
            tagName = el.tagName.toLowerCase();
            if (tagName == "html") {
                d = Math.max(doc.body[_sbs], el[_sbs], doc.body[_obs], el[_obs], el[_cbs]);
            }
            else {
                if (el.getBoundingClientRect) {
                    d = el.getBoundingClientRect()[fnName];
                }

                if (typeof d == "undefined") {
                    d = style(el, fnName, fnName);
                    let box_cond = (fnName == "width") ?
                        style(el, ["box-sizing", "padding-left", "padding-right", "border-left-width", "border-right-width"], fnName) :
                        style(el, ["box-sizing", "padding-top", "padding-bottom", "border-top-width", "border-bottom-width"], fnName);

                    if (box_cond["box-sizing"] == "content-box") {
                        d = parseInt(d) + (ax5.util.reduce(box_cond, function (p, n) {
                                return U.number(p | 0) + U.number(n);
                            }));
                    }
                }
            }
        }
    }
    return U.number(d);
}

// nodeName check
function nodeName(el, node_nm) {
    return el.nodeName && el.nodeName.toLowerCase() === node_nm.toLowerCase();
}

// createFragment
function createFragment(elems) {
    let safe = safe_fragment.appendChild(doc.createElement("div")), tmp, nodes = [], tag, wrap, tbody,
        elem, i = 0, l = elems.length, j;
    // safe = doc.createDocumentFragment();

    for (; i < l; i++) {
        elem = elems[i];
        if (elem || elem === 0) {
            if (U.getType(elem) == "fragment") {
                nodes.push(elem.firstChild);
            }
            else if (U.getType(elem) == "element") {
                nodes.push(elem);
            }
            else if (!re_html.test(elem)) {
                nodes.push(doc.createTextNode(elem));
                //safe.appendChild(doc.createTextNode(elem));
            }
            else {
                tmp = safe.appendChild(doc.createElement("div"));
                // Deserialize a standard representation
                tag = ( re_tag.exec(elem) || ["", ""] )[1].toLowerCase();
                wrap = tag_map[tag] || [0, "", ""];
                tmp.innerHTML = wrap[1] + elem.replace(re_single_tags, "<$1></$2>") + wrap[2];

                // Descend through wrappers to the right content
                j = wrap[0];
                while (j--) {
                    tmp = tmp.lastChild;
                }

                U.merge(nodes, tmp.childNodes);

                // Fix #12392 for WebKit and IE > 9
                tmp.textContent = "";

                // Fix #12392 for oldIE
                while (tmp.firstChild) {
                    tmp.removeChild(tmp.firstChild);
                }

                // Remember the top-level container for proper cleanup
                tmp = safe.lastChild;
                //tmp = safe.firstChild;
                safe.removeChild(tmp);
                tmp = null;
            }
        }
    }

    i = 0;
    while ((elem = nodes[i++])) {
        if (elem.nodeName == "SCRIPT") {
            let s = doc.createElement('script');
            s.type = elem.type;
            if (elem.src) s.src = elem.src;
            s.text = elem.innerHTML;
            safe.appendChild(s);
        }
        else {
            safe.appendChild(elem);
        }
    }
    //console.log(safe.innerHTML);
    return safe;
}

// 엘리먼트와 자식 엘리먼트의 이벤트와 데이터를 모두 지워줍니다.
function clearElementData(el) {
    let e_hds, ei,
        c_el, ci, cl;

    for (let hd in el.e_hd) {
        if (typeof el.e_hd[hd] === "function") {
            eUnBind(el, hd, el.e_hd[hd]);
        }
        else {
            for (let ehi = 0; ehi < el.e_hd[hd].length; ehi++)
                eUnBind(el, hd, el.e_hd[hd][ehi]);
        }
    }

    try {
        if (el["e_hd"]) delete el["e_hd"];
        if (el["ax5_data"]) delete el["ax5_data"];
    }
    catch (e) {
        if (el["e_hd"]) el["e_hd"] = null;
        if (el["ax5_data"]) el["ax5_data"] = null;
    }

    // todo : attributes 걸리는 것이 없지만 혹시나 모를 데이터를 위해.
    /*
    if (ax5.info.browser.name !== "ie" && ax5.info.browser.version > 7) {
        for (var a in el.attributes) {
            if (typeof el.attributes[a] === "object") {
                try {
                    el.attributes[a] = null;
                }
                catch (e) {
                }
            }
        }
    }
    */

    // 자식들도 확인 합니다.
    if (el.hasChildNodes()) {
        c_el = el.childNodes, ci = 0, cl = c_el.length;
        for (; ci < cl; ci++)
            clearElementData(c_el[ci]);
    }
}

// jQuery.ready.promise jquery 1.10.2 를 참고하여 재 작성 했습니다.
/**
 * document 로드 완료를 체크 합니다.
 * @method AX6Dom.ready
 * @param {Function} _fn - 로드완료시 호출함수
 * @example
 * ```js
 * var a = 1;
 * setTimeout(function(){
		 *    AX6Dom.ready(function(){
		 *        console.log("test" + a);
		 *        console.log(ax5.util.left("axisj-ax5", "-"));
		 *    });
		 * }, 1000);
 * ```
 */
function ready(_fn) {
    let isReady = false;
    promise(function () {
        if (isReady) return;
        isReady = AX6Dom.isReady = true;
        _fn();
    });
}

function promise(_fn) {
    if (doc.readyState === "complete") {
        setTimeout(_fn);
    }
    else {
        if (doc.addEventListener) {
            doc.addEventListener("DOMContentLoaded", _fn, false);
            win.addEventListener("load", _fn, false);
        }
        else {
            doc.attachEvent("onreadystatechange", _fn);
            win.attachEvent("onload", _fn);
            // If IE and not a frame
            let top = false;
            try {
                top = win.frameElement == null && doc.documentElement;
            }
            catch (e) {
            }

            if (top && top.doScroll) {
                (function doScrollCheck() {
                    if (!AX6Dom.isReady) {
                        try {
                            // Use the trick by Diego Perini
                            // http://javascript.nwbox.com/IEContentLoaded/
                            top.doScroll("left");
                        }
                        catch (e) {
                            return setTimeout(doScrollCheck, 50);
                        }
                        // and execute any waiting functions
                        _fn();
                    }
                })();
            }
        }
    }
}

/**
 * 브라우저 resize 이벤트를 캐치합니다.
 * @method AX6Dom.resize
 * @param {Function} _fn - 캐치후 호출될 함수
 * @example
 * ```
 * AX6Dom.resize(function(){
		 * 	console.log( 1, document.body.clientWidth );
		 * });
 * ```
 */
function resize(_fn) {
    ready(function () {
        eBind(window, "resize", _fn);
    });
}

/**
 * 브라우저 scroll 이벤트를 캐치하여 사용자 함수를 호출 하거나 스트롤 포지션을 리턴합니다.
 * @method AX6Dom.scroll
 * @param {Function} [_fn] - 캐치후 호출될 함수
 * @example
 * ```
 * AX6Dom.scroll(function(){
		 * 	console.log( 1, AX6Dom.scroll().top );
		 * });
 * ```
 */
function scroll(_fn) {
    if (typeof _fn === "undefined") {
        return {
            top: docElem.scrollTop || doc.body.scrollTop,
            left: docElem.scrollLeft || doc.body.scrollLeft
        }
    }
    else {
        ready(function () {
            eBind(window, "scroll", _fn);
        });
        return false;
    }
}

/**
 * CSS Selector를 이용하여 HTML Elements를 찾습니다.
 * @method AX6Dom.get
 * @param {String|Element|AX6Dom0} query - CSS Selector | Element
 * @param {String} sub_query - CSS Selector
 * @returns {Array} elements
 * @example
 * ```js
 * AX6Dom.get("#element01");
 * AX6Dom.get("input[type='text']");
 * AX6Dom.get( AX6Dom.get("input[type='text']") );
 * ```
 */
function get(query, sub_query) {
    let els, r_els = [], p_els;
    if (!query) return r_els;
    let i = 0, l = query.length;
    
    if (query.toString() === "[object AX6Dom]") {
        r_els = query.elements;
    }
    else if (U.isWindow(query)) r_els.push(query);
    else if (U.isElement(query)) r_els.push(query);
    else if (U.isArray(query) || U.is_nodelist(query)) {
        for (i = 0; i < l; i++)  if (U.isElement(query[i])) r_els.push(query[i]);
    }
    else if (U.isString(query) && query.substr(0, 1) === "#") r_els.push(doc.getElementById(query.substr(1)));
    else {
        els = doc.querySelectorAll(query);
        l = els.length;
        for (i = 0; i < l; i++) r_els.push(els[i]);
    }
    if (typeof sub_query !== "undefined") {
        //p_els = (info.browser.name == "ie" && info.browser.version < 8) ? doc : r_els[0];
        p_els = r_els[0];
        r_els = [], els = p_els.querySelectorAll(sub_query), l = els.length;
        for (i = 0; i < l; i++) r_els.push(els[i]);
    }
    return r_els;
}

/**
 * CSS Selector를 이용하여 HTML Element를 찾습니다.
 * @method AX6Dom.getOne
 * @param {String|Element} query - CSS Selector | Element
 * @param {String} sub_query - CSS Selector
 * @returns {Element} element
 * @example
 * ```js
 * AX6Dom.getOne("#element01");
 * AX6Dom.getOne("input[type='text']");
 * ```
 */
function getOne(query, sub_query) {
    return get(query, sub_query)[0];
}

/**
 * createElement 구문을 효과적으로 수행합니다.
 * @method AX6Dom.create
 * @param {String} node_nm - 엘리먼트 이름
 * @param {Object} attr - 엘리먼트 속성정보
 * @param {String} val - innerHTML 값
 * @returns {Element}
 * @example
 * ```js
 * AX6Dom.create("script", {type:"text/javascript", src:"../ax5.js"});
 * AX6Dom.create("div", {id:"createEleId", "class":"createEleClass"}, "<a>내가만든</a>");
 * ```
 */
function create(node_nm, attr, val) {
    /*
     HTML - Use http://www.w3.org/1999/xhtml
     SVG - Use http://www.w3.org/2000/svg
     XBL - Use http://www.mozilla.org/xbl
     XUL - Use http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul
     document.createElementNS("http://www.w3.org/1999/xhtml","div");
     document.createElement("div")
     document.createTextNode(text)
     */
    let element = doc.createElement(node_nm);
    for (let k in attr) {
        element.setAttribute(k, attr[k]);
    }
    if (val) element.appendChild(createFragment([].concat(val)));
    return element;
}

/**
 * Elements에 CSS속성을 읽고 씁니다.
 * @method AX6Dom.css
 * @param {Array} elements - 대상의 엘리먼트 리스트 혹은 엘리먼트
 * @param {Object|Array|String} CSS
 * @returns {String|Object|Elements}
 * @example
 * ```js
 * AX6Dom.css(AX6Dom.get("#abcd"), {"color":"#ff3300"});
 * AX6Dom.css(AX6Dom.get("#abcd"), {"width":100});
 * ```
 */
function css(els, O) {
    els = validateEl(els, "css");
    if (U.isString(O) || U.isArray(O)) {
        return style(els[0], O, "css");
    }
    else {
        let i = 0, l = els.length, k, matchs;
        for (; i < l; i++) {
            for (k in O) {
                try {
                    els[i].style[U.camelCase(k)] = (matchs = re_numsplit.exec(O[k])) ? matchs[1] + ( matchs[2] || "px" ) : O[k];
                }
                catch (e) {
                }
            }
        }
    }
    return els;
}

/**
 * elements에 className 를 추가, 제거, 확인, 토글합니다.
 * @method AX6Dom.className
 * @param {Array} elements - 대상의 엘리먼트 리스트 혹은 엘리먼트
 * @param {String} [command=has] - add,remove,toggle,has
 * @param {String} O - 클래스명
 * @returns {String|Elements} return - elements 또는 클래스이름
 * @example
 * ```js
 * AX6Dom.className(AX6Dom.get("#abcd"), "class-text"); // has 와 동일
 * AX6Dom.className(AX6Dom.get("#abcd"), "add", "class-text");
 * AX6Dom.className(AX6Dom.get("#abcd"), "remove", "class-text");
 * AX6Dom.className(AX6Dom.get("#abcd"), "has", "class-text");
 * AX6Dom.className(AX6Dom.get("#abcd"), "toggle", "class-text");
 * ```
 */

// todo : className 여러개의 class 인자 동시 처리 지원
function className(els, command, O) {
    let cns;
    els = validateEl(els, "clazz");
    if (command === "add" || command === "remove" || command === "toggle") {
        O = [].concat(O);
        for (let di = 0; di < els.length; di++) {
            cns = els[di]["className"];
            if (cns !== "") cns = cns.split(re_className_split);
            else cns = [];
            if (command === "add") {
                O.forEach(function (O) {
                    if (U.search(cns, function () {
                            return O.trim() == this;
                        }) == -1) cns.push(O.trim());
                });
            }
            else if (command === "remove") {
                O.forEach(function (O) {
                    cns = U.filter(cns, function () {
                        return O.trim() != this;
                    });
                });
            }
            else if (command === "toggle") {
                O.forEach(function (O) {
                    let class_count = cns.length;
                    cns = U.filter(cns, function () {
                        return O.trim() != this;
                    });
                    if (class_count === cns.length) cns.push(O.trim());
                });
            }

            els[di]["className"] = cns.join(" ");
        }
        return els;
    }
    else { // has
        if (typeof O === "undefined") O = command;
        cns = els[0]["className"].trim().split(re_className_split);
        if (U.isString(O)) { // hasClass
            // get Class Name
            return (U.search(cns, function () {
                return this.trim() === O
            }) > -1);
        }
        else {
            console.error("set_class argument error");
        }
        return els;
    }
}

/**
 * elements에 attribute를 추가, 제거, 확인 합니다.
 * @method AX6Dom.attr
 * @param {Array} elements - 대상의 엘리먼트 리스트 혹은 엘리먼트
 * @param {Object|String} O - json타입또는 문자열
 * @returns {String|Elements} return - elements 또는 속성값
 * @example
 * ```
 * AX6Dom.attr(AX6Dom.get("[data-ax-grid=A]"), {"data-ax-spt":"ABCD"}); // set attribute
 * AX6Dom.attr(AX6Dom.get("[data-ax-grid=A]"), {"data-ax-spt":"9999", "data-next":"next"}); // set attribute
 * AX6Dom.attr(AX6Dom.get("[data-ax-grid=A]"), "data-ax-spt"); // get attribute
 * AX6Dom.attr(AX6Dom.get("[data-ax-grid=A]"), {"data-next":null}); // remove attribute
 * ```
 */
function attr(els, O) {
    els = validateEl(els, "attr");
    let i = 0, l = els.length, k;
    if (U.isObject(O)) {
        for (; i < l; i++) {
            for (k in O) {
                if (O[k] == null) {
                    els[i].removeAttribute(k);
                }
                else {
                    els[i].setAttribute(k, O[k]);
                }
            }
        }
    }
    else if (U.isString(O)) {
        return els[0].getAttribute(O);
    }
    return els;
}

/**
 * elements에 이벤트를 바인드 합니다.
 * @method AX6Dom.on
 * @param {Array} elements
 * @param {String} type - 이벤트 타입
 * @param {Function} _fn - 이벤트 콜백함수
 * @example
 * ```js
 * var fna = function(){console.log("fna")};
 * var fnb = function(){console.log("fnb")};
 * var fnc = function(){console.log("fnc")};
 *
 * var mydom = AX6Dom.get("[data-event-test=text-box]"), remove_dom = AX6Dom.get("[data-event-test=remove]");
 *
 * AX6Dom.on(mydom, "click", window.fna);
 * AX6Dom.on(mydom, "click", window.fnb);
 * AX6Dom.on(mydom, "click", window.fnc);
 *
 * AX6Dom.on(remove_dom, "click", function(){
		 * 	AX6Dom.off(mydom, "click", window.fna);
		 * 	AX6Dom.off(remove_dom, "click");
		 * 	alert("이벤트 제거");
		 * });
 *
 * // 핸들방식
 * AX6Dom.on(mydom, "click.fna", window.fna);
 * AX6Dom.on(mydom, "click.fnb", window.fnb);
 * AX6Dom.on(mydom, "click.fnc", window.fnc);
 * ```
 */
function on(els, typ, _fn) {
    els = validateEl(els, "on");
    for (var i = 0; i < els.length; i++) {
        var __fn, _d = els[i];
        if (!_d) break;
        if (!_d.e_hd) _d.e_hd = {};
        if (typeof _d.e_hd[typ] === "undefined") {
            __fn = _d.e_hd[typ] = _fn;
        }
        else {
            if (!U.isArray(_d.e_hd[typ])) _d.e_hd[typ] = [_d.e_hd[typ]];
            _d.e_hd[typ].push(_fn);
            __fn = _d.e_hd[typ][_d.e_hd[typ].length - 1];
        }
        eBind(_d, typ, __fn);
    }
}

/**
 * elements에 이벤트를 언바인드 합니다.
 * @method AX6Dom.off
 * @param {Array} elements
 * @param {String} type - 이벤트 타입
 * @param {Function} [_fn] - 이벤트 콜백함수
 * @example
 * ```js
 * var mydom = AX6Dom.get("[data-event-test=text-box]")
 * AX6Dom.off(mydom, "click");
 * AX6Dom.off(mydom, "click.fnb");
 * ```
 */
function off(els, typ, _fn) {
    els = validateEl(els, "off");
    for (var i = 0; i < els.length; i++) {
        var _d = els[i];
        if (_d.e_hd) {
            if (U.isArray(_d.e_hd[typ])) {
                var _na = [];
                for (var i = 0; i < _d.e_hd[typ].length; i++) {
                    if (_d.e_hd[typ][i] == _fn || typeof _fn === "undefined") eUnBind(_d, typ, _d.e_hd[typ][i]);
                    else _na.push(_d.e_hd[typ][i]);
                }
                _d.e_hd[typ] = _na;
            }
            else {
                if (_d.e_hd[typ] == _fn || typeof _fn === "undefined") {
                    eUnBind(_d, typ, _d.e_hd[typ]);
                    delete _d.e_hd[typ]; // 함수 제거
                }
            }
        }
    }
}

/**
 * 타겟 엘리먼트의 자식을 반환합니다.
 * @method AX6Dom.child
 * @param {Element|Elements} elements
 * @returns {Elements} elements
 * @example
 * ```
 * <ul id="list-container">
 *     <li data-list-item="0">
 *        <div>child>child</div>
 *     </li>
 *     <li data-list-item="1"></li>
 *     <li data-list-item="2"></li>
 *     <li data-list-item="3"></li>
 *     <li data-list-item="4"></li>
 *     <li data-list-item="5"></li>
 * </ul>
 * <script>
 * var el = AX6Dom.get("#list-container");
 * console.log(
 *     AX6Dom.child(el)[1].tagName,
 *     AX6Dom.attr(AX6Dom.child(el)[1], "data-list-item")
 * );
 * // LI 1
 * </script>
 * ```
 */
function child(els) {
    els = validateEl(els, "child");
    var return_elems = [], i = 0, l;
    if (els[0]) {
        l = els[0].children.length;
        for (; i < l; i++) {
            return_elems.push(els[0].children[i]);
        }
    }
    return return_elems;
}

/**
 * 타겟엘리먼트의 부모 엘리멘트 트리에서 원하는 조건의 엘리먼트를 얻습니다.
 * @method AX6Dom.parent
 * @param {Element} elements - target element
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
 *    AX6Dom.parent(e.target, {tagname:"a", clazz:"ax-menu-handel", "data-custom-attr":"attr_value"})
 * );
 * // cond 함수로 처리하기
 * AX6Dom.on(fnObj.layout.client_main, "click.app_expand", function(e){
		 * 	var target = AX6Dom.parent(e.target, function(target){
		 * 		if(AX6Dom.className(target, "aside")){
		 * 			return true;
		 * 		}
		 * 		else if(AX6Dom.className(target, "client-main")){
		 * 			return true;
		 * 		}
		 * 	});
		 * 	//client-aside
		 * 	if(target.id !== "client-aside"){
		 * 		fnObj.layout.expand_menu();
		 * 	}
		 * });
 * ```
 */
function parent(els, cond) {
    els = validateEl(els, "parent");
    var _target = els[0];
    if (_target) {
        while ((function () {
            var result = true;
            if (typeof cond === "undefined") {
                _target = (_target.parentNode) ? _target.parentNode : false;
            }
            else if (U.is_function(cond)) {
                result = cond(_target);
            }
            else if (U.isObject(cond)) {
                for (var k in cond) {
                    if (k === "tagname") {
                        if (_target.tagName.toLocaleLowerCase() != cond[k]) {
                            result = false;
                            break;
                        }
                    }
                    else if (k === "clazz" || k === "className") {
                        if ("className" in _target) {
                            var klasss = _target.className.split(re_className_split);
                            var hasClass = false;
                            for (var a = 0; a < klasss.length; a++) {
                                if (klasss[a] == cond[k]) {
                                    hasClass = true;
                                    break;
                                }
                            }
                            result = hasClass;
                        }
                        else {
                            result = false;
                            break;
                        }
                    }
                    else { // 그외 속성값들.
                        if (_target.getAttribute) {
                            if (_target.getAttribute(k) != cond[k]) {
                                result = false;
                                break;
                            }
                        }
                        else {
                            result = false;
                            break;
                        }
                    }
                }
            }
            return !result;
        })()) {
            if (_target.parentNode) {
                _target = _target.parentNode;
            }
            else {
                _target = false;
                break;
            }
        }
    }
    return _target;
}

/**
 * 형제 엘리먼트중에 앞서 위치한 엘리먼트를 반환합니다.
 * @method AX6Dom.prev
 * @param {Elements|Element} elements
 * @param {Number} [times=1] - 횟수
 * @returns {Element|null} element - 원하는 위치에 아이템이 없으면 null 을 반환합니다.
 * @example
 * ```
 * <div>
 *     <ul id="list-container">
 *         <li data-list-item="0" id="li0">
 *            <div>child>child</div>
 *         </li>
 *         <li data-list-item="1" id="li1"></li>
 *         <li data-list-item="2" id="li2"></li>
 *         <li data-list-item="3" id="li3"></li>
 *         <li data-list-item="4" id="li4"></li>
 *         <li data-list-item="5" id="li5"></li>
 *     </ul>
 * </div>
 * <script>
 * var el = AX6Dom.get("#list-container");
 * var li = AX6Dom.child(el)[0];
 * var c_li;
 *
 * console.log(
 *     (c_li = AX6Dom.next(li, 2)).id,
 *     (c_li = AX6Dom.prev(c_li)).id
 * );
 * </script>
 * ```
 */
function prev(els, times) {
    els = validateEl(els, "prev");
    return sibling(els, "prev", times);
}

/**
 * 형제 엘리먼트중에 다음에 위치한 엘리먼트를 반환합니다.
 * @method AX6Dom.next
 * @param {Elements|Element} elements
 * @param {Number} [times=1] - 횟수
 * @returns {Element|null} element - 원하는 위치에 아이템이 없으면 null 을 반환합니다.
 * @example
 * ```
 * <div>
 *     <ul id="list-container">
 *         <li data-list-item="0" id="li0">
 *            <div>child>child</div>
 *         </li>
 *         <li data-list-item="1" id="li1"></li>
 *         <li data-list-item="2" id="li2"></li>
 *         <li data-list-item="3" id="li3"></li>
 *         <li data-list-item="4" id="li4"></li>
 *         <li data-list-item="5" id="li5"></li>
 *     </ul>
 * </div>
 * <script>
 * var el = AX6Dom.get("#list-container");
 * var li = AX6Dom.child(el)[0];
 * var c_li;
 *
 * console.log(
 *     (c_li = AX6Dom.next(li, 2)).id,
 *     (c_li = AX6Dom.prev(c_li)).id
 * );
 * </script>
 * ```
 */
function next(els, times) {
    els = validateEl(els, "next");
    return sibling(els, "next", times);
}

/**
 * 엘리먼트의 너비를 반환합니다.
 * @method AX6Dom.width
 * @param {Elements|Element} elements
 * @returns {Number} width
 * @example
 * ```js
 * var el = AX6Dom.get("#list-container")
 * AX6Dom.width(el);
 * ```
 */
function width(els) {
    els = validateEl(els, "width");
    return boxSize(els, "width");
}

/**
 * 엘리먼트의 너비를 반환합니다.
 * @method AX6Dom.height
 * @param {Elements|Element} elements
 * @returns {Number} width
 * @example
 * ```js
 * var el = AX6Dom.get("#list-container")
 * AX6Dom.height(el);
 * ```
 */
function height(els) {
    els = validateEl(els, "height");
    return boxSize(els, "height");
}

/**
 * 엘리먼트의 자식을 모두 지워줍니다. 내용을 깨긋히 비워 냅니다.
 * @method AX6Dom.empty
 * @param {Elements|Element} elements
 * @returns {Elements}
 * @example
 * ```js
 * var el = AX6Dom.get("#list-container");
 * AX6Dom.empty(el);
 * ```
 */
function empty(els) {
    els = validateEl(els, "empty");
    var i = 0, l = els.length, el;
    for (; i < l; i++) {
        el = els[i];
        while (el.firstChild) {
            clearElementData(el.firstChild);
            el.removeChild(el.firstChild);
        }
        if (el.options && nodeName(el, "select")) {
            //noinspection JSAnnotator
            el.options.length = 0;
        }
    }
    return els;
}

/**
 * 엘리먼트안에 HTML코드를 바꿔치기 합니다.
 * @method AX6Dom.html
 * @param {Elements|Element} elements
 * @param {String} [htmlcode]
 * @returns {Elements|String}
 * @example
 * ```js
 * var el = AX6Dom.get("#list-container");
 * console.log( AX6Dom.html(el) );
 * AX6Dom.html(el, "<a href='#1234'>링크");
 * ```
 */
function html(els, val) {
    els = validateEl(els, "html");
    var tag, wrap;

    if (typeof val == "undefined") {
        if (!els || !els[0]) return "";
        return els[0].innerHTML;
    }
    else {
        tag = ( re_tag.exec(val) || ["", ""] )[1].toLowerCase();
        if (U.is_number(val)) val = '' + val;
        if (U.isString(val) && !re_noInnerhtml.test(val)) {
            if (tag_not_support_innerhtml[tag]) {
                append(empty(els), val);
            }
            else {
                val = val.replace(re_single_tags, "<$1></$2>");
                var i = 0, l = els.length;
                try {
                    for (; i < l; i++) {
                        if ("innerHTML" in els[i]) els[i].innerHTML = val;
                    }
                }
                catch (e) {

                }
            }
        }
        else if (U.isElement(val) || U.is_nodelist(val)) {
            append(empty(els), val);
        }
        return els;
    }
}

/**
 * 엘리먼트에 자식노드를 추가 합니다. (추가되는 위치는 맨 아래 입니다.)
 * @method AX6Dom.append
 * @param {Elements|Element} elements
 * @param {String|Element} val
 * @returns {Elements|Element}
 * @example
 * ```
 * var el = AX6Dom.get("[data-list-item='0']");
 * AX6Dom.append(el, "ㅈㅏㅇㄱㅣㅇㅕㅇ");
 * AX6Dom.append(el, "<div>장기영<a href='#ABCDE'>이건 어렵다</a></div>");
 * AX6Dom.append(AX6Dom.get("[data-list-item='2']"), AX6Dom.get("#move-item"));
 * ```
 */
function append(els, val) {
    // todo : 빈 노드에 append 할때 빈 div 태그 생성됨.
    return manipulate("append", els, val);
}

/**
 * 엘리먼트에 자식노드를 추가 합니다. (추가되는 위치는 맨 처음 입니다.)
 * @method AX6Dom.prepend
 * @param {els|Element} elements
 * @param {String|Element} val
 * @returns {Elements|Element}
 * @example
 * ```
 * var el = AX6Dom.get("[data-list-item='0']");
 * AX6Dom.prepend(el, "ㅈㅏㅇㄱㅣㅇㅕㅇ");
 * AX6Dom.prepend(el, "<div>장기영<a href='#ABCDE'>이건 어렵다</a></div>");
 * AX6Dom.prepend(AX6Dom.get("[data-list-item='2']"), AX6Dom.get("#move-item"));
 * ```
 */
function prepend(els, val) {
    return manipulate("prepend", els, val);
}

/**
 * 엘리먼트에 앞에 노드를 추가합니다.
 * @method AX6Dom.before
 * @param {Elements|Element} elements
 * @param {String|Element} val
 * @returns {Elements|Element}
 * @example
 * ```
 * var el = AX6Dom.get("[data-list-item='0']");
 * AX6Dom.before(el, "before");
 * ```
 */
function before(els, val) {
    return manipulate("before", els, val);
}

/**
 * 엘리먼트에 다음에 노드를 추가합니다.
 * @method AX6Dom.after
 * @param {Elements|Element} elements
 * @param {String|Element} val
 * @returns {Elements|Element}
 * @example
 * ```
 * var el = AX6Dom.get("[data-list-item='0']");
 * AX6Dom.after(el, "after");
 * ```
 */
function after(els, val) {
    return manipulate("after", els, val);
}

/**
 * 노드추가 조작 함수
 * @private
 * @method AX6Dom.manipulate
 * @param {String} act - 조작방식
 * @param {Elements|Element} elements
 * @param {String} val - 추가하려는 html tag 또는 문자열
 * @returns {Elements|Element}
 */
function manipulate(act, els, val) {
    els = validateEl(els, act);
    var flag, i = 0, l = els.length,
        el = [].concat(val), cf = createFragment, els = els, _el;

    if (act === "append") {
        for (; i < l; i++) {
            _el = cf(el);
            while (_el.firstChild) {
                els[i].appendChild(_el.firstChild);
            }
        }
    }
    else if (act == "prepend") {
        for (; i < l; i++) {
            _el = cf(el);
            while (_el.firstChild) {
                els[i].insertBefore(_el.firstChild, els[i].firstChild);
            }
        }
    }
    else if (act == "before") {
        for (; i < l; i++) {
            _el = cf(el);
            while (_el.firstChild) {
                els[i].parentNode.insertBefore(_el.firstChild, els[i]);
            }
        }
    }
    else if (act == "after") {
        for (; i < l; i++) {
            _el = cf(el);
            while (_el.firstChild) {
                els[i].parentNode.insertBefore(_el.firstChild, els[i].nextSibling);
            }
        }
        //els[i].parentNode.insertBefore(cf(el), els[i].nextSibling);
    }
    return els;
}

/**
 * 엘리먼트를 제거 합니다.
 * @method AX6Dom.remove
 * @param {Elements|Element} elements
 * @example
 * ```
 * var el = AX6Dom.get("[data-list-item='0']");
 * AX6Dom.remove(el);
 * ```
 */
function remove(els, val) {
    els = validateEl(els, "remove");
    var i = 0, l = els.length;
    for (; i < l; i++) {
        if (els[i].parentNode) {
            clearElementData(els[i]);
            els[i].parentNode.removeChild(els[i]);
        }
    }
}

/**
 * 엘리먼트의 offset 값을 반환합니다.
 * @method AX6Dom.offset
 * @param {Elements|Element} elements
 * @returns {Object}
 * @example
 * ```
 * console.log(
 * ax5.util.to_json(AX6Dom.offset(el))
 * );
 * // {"top": 8, "left": 8}
 * ```
 */
function offset(els) {
    els = validateEl(els, "offset");
    var el = els[0], box;
    if (el.getBoundingClientRect) {
        box = el.getBoundingClientRect();
    }
    return {
        top: box.top + ( win.pageYOffset || (docElem.scrollTop || doc.body.scrollTop) ) - ( docElem.clientTop || 0 ),
        left: box.left + ( win.pageXOffset || (docElem.scrollLeft || doc.body.scrollLeft) ) - ( docElem.clientLeft || 0 )
    }
}


function offset_parent(el) {
    var offsetParent = el.offsetParent || docElem;
    while (offsetParent && ( !nodeName(offsetParent, "html") && curCSS(offsetParent, "position") === "static" )) {
        offsetParent = offsetParent.offsetParent;
    }
    return offsetParent || docElem;
}

/**
 * 엘리먼트의 상대 offset 값을 반환합니다.
 * @method AX6Dom.position
 * @param {Elements|Element} elements
 * @returns {Object}
 * @example
 * ```
 * console.log(
 * ax5.util.to_json(AX6Dom.position(el))
 * );
 * // {"top": 8, "left": 8}
 * ```
 */
function position(els) {
    els = validateEl(els, "position");
    var el = els[0], el_parent,
        pos = {top: 0, left: 0}, parentPos = {top: 0, left: 0};

    if (css(el, "position") === "fixed") {
        pos = el.getBoundingClientRect();
    }
    else {
        el_parent = offset_parent(el);
        // Get correct offsets
        pos = offset(el);
        if (!nodeName(el_parent, "html")) {
            parentPos = offset(el_parent);
        }
        // Add offsetParent borders
        parentPos.top += curCSS(el_parent, "borderTopWidth", "float");
        parentPos.left += curCSS(el_parent, "borderLeftWidth", "float");
    }
    return {
        top: pos.top - parentPos.top - (curCSS(el, "marginTop", "float") || 0),
        left: pos.left - parentPos.left - (curCSS(el, "marginLeft", "float") || 0)
    };
}

/**
 * 엘리먼트의 box model 속성을 반환합니다.
 * @method AX6Dom.boxModel
 * @param {Elements|Element} elements
 * @param {String} [cond] - 원하는 박스 속성
 * @returns {Object}
 * @example
 * ```
 * var axd = AX6Dom;
 * axd.boxModel(el);
 * // {"offset": {"top": 101, "left": 110}, "position": {"top": 101, "left": 110}, "width": 181.71875, "height": 153, "padding": [5,4,3,2], "margin": [1,10,1,10], "border": ["2px double rgb(34, 34, 34)","2px double rgb(34, 34, 34)","2px double rgb(34, 34, 34)","2px double rgb(34, 34, 34)"], "borderWidth": ["2","2","2","2"], "boxSizing": "content-box"}
 *
 * axd.boxModel(el, "offset");
 * axd.boxModel(el, "position");
 * axd.boxModel(el, "width");
 * axd.boxModel(el, "height");
 * axd.boxModel(el, "padding");
 * axd.boxModel(el, "margin");
 * axd.boxModel(el, "border");
 * axd.boxModel(el, "borderWidth");
 * axd.boxModel(el, "border-width");
 * axd.boxModel(el, "boxSizing");
 * axd.boxModel(el, "box-sizing");
 * // 각각의 박스모델 속성을 지정하여 호출 할 수 있습니다. borderWidth, border-width 중 하나의 방법으로 사용 가능합니다.
 * ```
 */
function boxModel(els, cond) {
    els = validateEl(els, "boxModel");
    var el = els[0],
        model = {};
    if (cond) cond = U.camelCase(cond);
    if (typeof cond === "undefined" || cond == "offset") {
        model.offset = offset(el);
    }
    if (typeof cond === "undefined" || cond == "position") {
        model.position = position(el);
    }
    if (typeof cond === "undefined" || cond == "width") {
        model.width = width(el);
    }
    if (typeof cond === "undefined" || cond == "height") {
        model.height = height(el);
    }
    if (typeof cond === "undefined" || cond == "padding") {
        model.padding = U.map(style(el, ["padding-top", "padding-right", "padding-bottom", "padding-left"]), function (k, v) {
            return parseFloat(v);
        });
    }
    if (typeof cond === "undefined" || cond == "margin") {
        model.margin = U.map(style(el, ["margin-top", "margin-right", "margin-bottom", "margin-left"]), function (k, v) {
            return parseFloat(v);
        });
    }
    if (typeof cond === "undefined" || cond == "border") {
        model.border = U.map(style(el, ["border-top", "border-right", "border-bottom", "border-left"]), function (k, v) {
            return v;
        });
    }
    if (typeof cond === "undefined" || cond == "borderWidth") {
        model.borderWidth = U.map(style(el, ["border-top-width", "border-right-width", "border-bottom-width", "border-left-width"]), function (k, v) {
            return parseFloat(v);
        });
    }
    if (typeof cond === "undefined" || cond == "boxSizing") {
        model.boxSizing = style(el, "box-sizing");
    }

    return (typeof cond === "undefined") ? model : model[cond];
}

/**
 * 엘리먼트에 data를 속성을 추가하거나 반환합니다.
 * @method AX6Dom.data
 * @param {Elements|Element} elements
 * @param {String|Object} [command=get] - 명령어 "get|set|remove"
 * @param {Object|String} O - json타입 또는 문자열
 * @returns {Elements|Element|String}
 * @example
 * ```
 * var axd = AX6Dom, axu = ax5.util, res = "";
 *
 * var el = axd.get("#list-container");
 * axd.data(el, {a:1}); // set data
 * axd.data(el, "set", {a:1100, b:[0,1,2,3]}); // set data
 *
 * res += axd.data(el, "a"); // get data
 * res += axd.data(el, "get", "b"); // get data
 * console.log(res);
 * // 11000,1,2,3
 *
 * console.log(axd.data(el, "b"));
 * // [0, 1, 2, 3]
 * axd.data(el, "remove", "b"); // remove data
 * console.log(axd.data(el, "b"));
 * // ""
 *
 * axd.data(el, "remove"); // remove all
 * ```
 */
function data(els, command, O) {
    //console.log(els, command, O);
    els = validateEl(els, "data");
    var i = 0, l = els.length, k;
    if (command === "set" || (typeof O === "undefined" && U.isObject(command))) {
        if (typeof O === "undefined") O = command;
        for (; i < l; i++) {
            for (k in O) {
                if (typeof els[i].ax5_data === "undefined") els[i].ax5_data = {};
                els[i].ax5_data[k] = O[k];
            }
        }
    }
    else if (command !== "remove" && (command === "get" || command === "read" || (typeof O === "undefined" && U.isString(command)))) {
        if (typeof O === "undefined") O = command;
        if (!U.isString(O)) return els;
        return (typeof els[0].ax5_data === "undefined" || typeof els[0].ax5_data[O] === "undefined") ? "" : els[0].ax5_data[O];
    }
    else if (command === "remove") {
        if (typeof O === "undefined") {
            for (; i < l; i++) {
                els[i].ax5_data = {};
            }
        }
        else if (U.isString(O)) {
            for (; i < l; i++) {
                delete els[i].ax5_data[O];
            }
        }
        else {
            for (; i < l; i++) {
                each(O, function () {
                    delete els[i].ax5_data[this];
                });
            }
        }
    }
    return els;
}

/**
 * 엘리먼트 value값을 반환합니다.
 * @method AX6Dom.val
 * @param {Elements|Element} elements
 * @param {String} [v] - element.value에 부여할 값
 * @returns {String}
 */
function val(els, v) {
    els = validateEl(els, "val");
    if (els[0] && 'value' in els[0]) {
        if (typeof v !== "undefined") els[0].value = v;
        return els[0].value;
    }
    else {
        return null;
    }
}

/**
 * 엘리먼트 에 이벤트를 발생시킵니다.
 * @method AX6Dom.dispatch_event
 * @param {Elements|Element} elements
 * @param {String} [evt_nm] - 발생시킬 이벤트 이름
 */
function dispatch_event(els, evt_nm) {
    els = validateEl(els, "val");
    if ("createEvent" in document) {
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent(evt_nm, false, true);
        els[0].dispatchEvent(evt);
    }
    else {
        els[0].fireEvent("on" + evt_nm);
    }
}

let dom = function (query) {
    let axdom = function (query) {
        this.toString = function () {
            return "[object ax5.dom]";
        };
        if (typeof query === 'undefined') {
            U.error("ax5.dom(undefined) is error ");
            return;
        }
        /**
         * query selected elements
         * @member {Array} ax5.dom0.elements
         * @example
         * ```
         * ax5.dom("[data-ax-grid").elements
         * ```
         */
        this.elements = dom.get(query);
        /**
         * query selected elements length
         * @member {Number} ax5.dom0.length
         * @example
         * ```
         * ax5.dom("[data-ax-grid").length
         * ```
         */
        this.length = this.elements.length;
        /**
         * elements에 css 값을 적용또는 반환합니다.
         * @method ax5.dom0.css
         * @param {Object|Array|String} O
         * @returns {ax5.dom0|String|Object}
         * @example
         * ```js
         * ax5.dom("[data-ax-grid]").css({"color":"#ff3300", border:"1px solid #000"});
         * console.log( ax5.dom("[data-ax-grid]").css("color") );
         * // rgb(255, 51, 0)
         * console.log( ax5.dom("[data-ax-grid]").css(["border","color"]) );
         * // {border: "1px solid rgb(0, 0, 0)", color: "rgb(255, 51, 0)"}
         * ```
         */
        this.css = function (O) {
            var rs = dom.css(this.elements, O);
            return (rs === this.elements) ? this : rs;
        };
        /**
         * elements에 className 를 추가, 제거, 확인, 토글합니다.
         * @method ax5.dom0.className
         * @param {String} [command=has] - add,remove,toggle,has
         * @param {String} O - 클래스명
         * @returns {ax5.dom0|String} return - ax5.dom 또는 클래스이름
         * @example
         * ```
         * console.log(
         * ax5.dom("[data-ax-grid=A]").className("A"),
         * ax5.dom("[data-ax-grid='A']").className("has","A")
         * );
         * ax5.dom("[data-ax-grid=A]").className("add", "adclass").class("remove", "adclass").class("remove", "A");
         *
         * ax5.dom("[data-ax-grid=A]").className("toggle", "red");
         * ax5.dom("[data-ax-grid=\"9B\"]").className("toggle", "red");
         * ```
         */
        this.className = function (command, O) {
            var rs = dom.className(this.elements, command, O);
            return (rs === this.elements) ? this : rs;
        };
        /**
         * elements에 이벤트를 바인드 합니다.
         * @method ax5.dom0.on
         * @param {String} typ - 이벤트 타입
         * @param {Function} _fn - 이벤트 콜백함수
         * @returns {ax5.dom0}
         * @example
         * ```js
         * var axd = ax5.dom;
         * var mydom = axd("[data-event-test=text-box]"),
         * remove_dom = axd("[data-event-test=remove]");
         *
         * mydom.on("click", window.fna);
         * mydom.on("click", window.fnb);
         * mydom.on("click", window.fnc);
         *
         * remove_dom.on("click", function(){
				 *    mydom.off("click", window.fna);
				 *    remove_dom.off("click");
				 *    alert("이벤트 제거");
				 * });
         *
         * // 핸들방식
         * axd("[data-event-test=text-box]").on("click.fna", window.fna);
         * axd("[data-event-test=text-box]").on("click.fnb", window.fnb);
         * axd("[data-event-test=text-box]").on("click.fnc", window.fnc);
         * ```
         */
        // todo: event type 모두 체크
        this.on = function (typ, _fn) {
            dom.on(this.elements, typ, _fn);
            return this;
        };
        /**
         * elements에 이벤트를 언바인드 합니다.
         * @method ax5.dom0.off
         * @param {String} typ - 이벤트 타입
         * @param {Function} [_fn] - 이벤트 콜백함수
         * @returns {ax5.dom0}
         * @example
         * ```js
         * var axd = ax5.dom;
         * axd("[data-event-test=text-box]").off("click");
         * axd("[data-event-test=text-box]").off("click.fnb").off("click.fnc");
         * ```
         */
        this.off = function (typ, _fn) {
            dom.off(this.elements, typ, _fn);
            return this;
        };
        // todo : setAttributeNS, setAttribute 차이 찾아보기
        /**
         * element의 attribute를 추가 삭제 가져오기 합니다.
         * @method ax5.dom0.attr
         * @param {Object|String|null} O - json타입또는 문자열
         * @returns {ax5.dom0|String}
         * @example
         * ```js
         * // set attribute
         * ax5.dom("[data-ax-grid=A]").attr({"data-ax-spt":"9999", "data-next":"next"});
         * // get or read
         * console.log( ax5.dom("[data-ax-grid=A]").attr("data-ax-spt") );
         * // remove attribute, set null
         * ax5.dom("[data-ax-grid=A]").attr({"data-next2":null});
         * ```
         */
        this.attr = function (O) {
            var rs = dom.attr(this.elements, O);
            return (rs === this.elements) ? this : rs;
        };
        /**
         * element의 attribute를 추가 삭제 가져오기 합니다.
         * @method ax5.dom0.find
         * @param {String} query - selector query
         * @returns {ax5.dom0} ax5.dom0
         * @example
         * ```
         *
         * ```
         */
        this.find = function (query) {
            return new axdom(dom.get(this.elements[0], query));
        };

        /**
         * 형제 엘리먼트중에 다음에 위치한 엘리먼트를 반환합니다.
         * @method ax5.dom0.next
         * @param {Number} [times=0] - 횟수
         * @returns {axdom} ax5.dom0
         * @example
         * ```
         * <div>
         *     <ul id="list-container">
         *         <li data-list-item="0" id="li0">
         *            <div>child>child</div>
         *         </li>
         *         <li data-list-item="1" id="li1"></li>
         *         <li data-list-item="2" id="li2"></li>
         *         <li data-list-item="3" id="li3"></li>
         *         <li data-list-item="4" id="li4"></li>
         *         <li data-list-item="5" id="li5"></li>
         *     </ul>
         * </div>
         * <script>
         * var el = ax5.dom("#list-container");
         * var li = el.child(el);
         *
         * console.log(
         *     (c_li = li.next(2)).elements[0].id,
         *     (c_li = c_li.prev()).elements[0].id
         * );
         * </script>
         * ```
         */
        this.prev = function (times) {
            return new axdom(dom.prev(this.elements, times));
        };
        /**
         * 형제 엘리먼트중에 이전에 위치한 엘리먼트를 반환합니다.
         * @method ax5.dom0.prev
         * @param {Number} [times=0] - 횟수
         * @returns {ax5.dom0} ax5.dom0
         * @example
         * ```
         * <div>
         *     <ul id="list-container">
         *         <li data-list-item="0" id="li0">
         *            <div>child>child</div>
         *         </li>
         *         <li data-list-item="1" id="li1"></li>
         *         <li data-list-item="2" id="li2"></li>
         *         <li data-list-item="3" id="li3"></li>
         *         <li data-list-item="4" id="li4"></li>
         *         <li data-list-item="5" id="li5"></li>
         *     </ul>
         * </div>
         * <script>
         * var el = ax5.dom("#list-container");
         * var li = el.child(el);
         *
         * console.log(
         *     (c_li = li.next(2)).elements[0].id,
         *     (c_li = c_li.prev()).elements[0].id
         * );
         * </script>
         * ```
         */
        this.next = function (times) {
            return new axdom(dom.next(this.elements, times));
        };

        /**
         * 타겟엘리먼트의 부모 엘리멘트 트리에서 원하는 조건의 엘리먼트를 얻습니다.
         * @method ax5.dom0.parent
         * @param {Object} cond - 원하는 element를 찾을 조건
         * @returns {ax5.dom0} ax5.dom0 - 부모엘리먼트로 만들어진 새로운 ax5.dom0
         * @example
         * ```
         * var dom_child = ax5.dom("#list-container").child();
         * console.log(
         *    dom_child.parent({tagname:"div", clazz:"ax5-sample-view"}).elements[0]
         * );
         * console.log(
         *    ax5.dom(dom_child).parent({tagname:"div", clazz:"ax5-sample-view"}).elements[0]
         * );
         * // 같은 결과
         * ```
         */
        this.parent = function (cond) {
            return new axdom(dom.parent(this.elements, cond));
        };
        /**
         * 타겟 엘리먼트의 자식들을 반환합니다.
         * @method ax5.dom0.child
         * @returns {ax5.dom0} ax5.dom0 - 자식엘리먼트로 만들어진 새로운 ax5.dom0
         * @example
         * ```
         * var dom_child = ax5.dom("#list-container").child();
         * ax5.dom(dom_child).child();
         * dom_child.child();
         * // 원하는 대로~
         * ```
         */
        this.child = function () {
            return new axdom(dom.child(this.elements));
        };
        /**
         * 타겟 엘리먼트의 너비를 반환합니다.
         * @method ax5.dom0.width
         * @returns {Number}
         * @example
         * ```
         * console.log(
         *     ax5.dom("#list-container").css({"width":"400px", "box-sizing":"border-box",
				 * 	 "border":"2px solid", "padding":"50px"}).css({"background":"#ccc"}).width()
         * );
         * console.log(
         *    ax5.dom("#list-container").css({"width":"400px", "box-sizing":"content-box",
				 * 	"border":"2px solid", "padding":"50px"}).css({"background":"#ccc"}).width()
         * );
         * ```
         */
        this.width = function () {
            return dom.width(this.elements);
        };
        /**
         * 타겟 엘리먼트의 높이를 반환합니다.
         * @method ax5.dom0.height
         * @returns {Number}
         * @example
         * ```
         * // width 와 동일
         * ```
         */
        this.height = function () {
            return dom.height(this.elements);
        };
        /**
         * 타겟 엘리먼트안에 HTML코드를 바꿔치기 합니다.
         * @method ax5.dom0.html
         * @returns {ax5.dom0|String}
         * @example
         * ```
         * console.log( ax5.dom("#list-container").html() );
         * ax5.dom("#list-container").html("<a href='#1234'>링크");
         * ```
         */
        this.html = function (val) {
            var rs = dom.html(this.elements, val);
            return (rs === this.elements) ? this : rs;
        };
        /**
         * 엘리먼트에 자식노드를 추가 합니다. (추가되는 위치는 맨 아래 입니다.)
         * @method ax5.dom0.append
         * @param {String|Element} val
         * @returns {ax5.dom0}
         * @example
         * ```
         * ax5.dom("[data-list-item='0']")
         * .append("ㅈㅏㅇㄱㅣㅇㅕㅇ")
         * .append("<div>장기영<a href='#ABCDE'>이건 어렵다</a></div>")
         * .append(ax5.dom.get("#move-item"));
         * ```
         */
        this.append = function (val) {
            var rs = dom.manipulate("append", this.elements, val);
            return (rs === this.elements) ? this : rs;
        };
        /**
         * 엘리먼트에 자식노드를 추가 합니다. (추가되는 위치는 맨 위 입니다.)
         * @method ax5.dom0.prepend
         * @param {String|Element} val
         * @returns {ax5.dom0}
         * @example
         * ```
         * ax5.dom("[data-list-item='0']")
         * .prepend("ㅈㅏㅇㄱㅣㅇㅕㅇ")
         * .prepend("<div>장기영<a href='#ABCDE'>이건 어렵다</a></div>")
         * .prepend(ax5.dom.get("#move-item"));
         * ```
         */
        this.prepend = function (val) {
            var rs = dom.manipulate("prepend", this.elements, val);
            return (rs === this.elements) ? this : rs;
        };
        /**
         * 엘리먼트 이전위치에 노드를 추가 합니다.
         * @method ax5.dom0.before
         * @param {String|Element} val
         * @returns {ax5.dom0}
         * @example
         * ```
         * ax5.dom("[data-list-item='0']")
         * .before("ㅈㅏㅇㄱㅣㅇㅕㅇ")
         * .before("<div>장기영<a href='#ABCDE'>이건 어렵다</a></div>")
         * .before(ax5.dom.get("#move-item"));
         * ```
         */
        this.before = function (val) {
            var rs = dom.manipulate("before", this.elements, val);
            return (rs === this.elements) ? this : rs;
        };
        /**
         * 엘리먼트 다음위치에 노드를 추가 합니다.
         * @method ax5.dom0.after
         * @param {String|Element} val
         * @returns {ax5.dom0}
         * @example
         * ```
         * ax5.dom("[data-list-item='0']")
         * .after("ㅈㅏㅇㄱㅣㅇㅕㅇ")
         * .after("<div>장기영<a href='#ABCDE'>이건 어렵다</a></div>")
         * .after(ax5.dom.get("#move-item"));
         * ```
         */
        this.after = function (val) {
            var rs = dom.manipulate("after", this.elements, val);
            return (rs === this.elements) ? this : rs;
        };
        /**
         * 엘리먼트 다음위치에 노드를 추가 합니다.
         * @method ax5.dom0.remove
         * @example
         * ```
         * ax5.dom("[data-list-item='0']").remove();
         * ```
         */
        this.remove = function () {
            return dom.remove(this.elements);
        };
        /**
         * 엘리먼트의 offset 값을 반환합니다.
         * @method ax5.dom0.offset
         * @param {Elements|Element} elements
         * @returns {Object}
         * @example
         * ```
         * console.log(
         *    ax5.dom("#query").offset()
         * );
         * // {"top": 8, "left": 8}
         * ```
         */
        this.offset = function () {
            return dom.offset(this.elements);
        };
        /**
         * 엘리먼트의 position 값을 반환합니다.
         * @method ax5.dom0.position
         * @param {Elements|Element} elements
         * @returns {Object}
         * @example
         * ```
         * console.log(
         *    ax5.dom("#query").position()
         * );
         * // {"top": 8, "left": 8}
         * ```
         */
        this.position = function () {
            return dom.position(this.elements);
        };
        /**
         * 엘리먼트의 box model 속성을 반환합니다.
         * @method ax5.dom0.boxModel
         * @param {String} [cond] - 원하는 박스 속성
         * @returns {Object}
         * @example
         * ```
         * var axd = ax5.dom;
         * axd(".ax5-sample-view").boxModel()
         * // {"offset": {"top": 101, "left": 110}, "position": {"top": 101, "left": 110}, "width": 181.71875, "height": 153, "padding": [5,4,3,2], "margin": [1,10,1,10], "border": ["2px double rgb(34, 34, 34)","2px double rgb(34, 34, 34)","2px double rgb(34, 34, 34)","2px double rgb(34, 34, 34)"], "borderWidth": ["2","2","2","2"], "boxSizing": "content-box"}
         *
         * axd(".ax5-sample-view").boxModel("offset");
         * axd(".ax5-sample-view").boxModel("position");
         * axd(".ax5-sample-view").boxModel("width");
         * axd(".ax5-sample-view").boxModel("height");
         * axd(".ax5-sample-view").boxModel("padding");
         * axd(".ax5-sample-view").boxModel("margin");
         * axd(".ax5-sample-view").boxModel("border");
         * axd(".ax5-sample-view").boxModel("borderWidth");
         * axd(".ax5-sample-view").boxModel("border-width");
         * axd(".ax5-sample-view").boxModel("boxSizing");
         * axd(".ax5-sample-view").boxModel("box-sizing");
         * // 각각의 박스모델 속성을 지정하여 호출 할 수 있습니다. borderWidth, border-width 중 하나의 방법으로 사용 가능합니다.
         * ```
         */
        this.boxModel = function (cond) {
            return dom.boxModel(this.elements, cond);
        };
        /**
         * 엘리먼트에 data를 속성을 추가하거나 반환합니다.
         * @method ax5.dom0.data
         * @param {String|Object} [command=get] - 명령어 "get|set|remove"
         * @param {Object|String} O - json타입 또는 문자열
         * @returns {ax5.dom0|String}
         * @example
         * ```
         * var axd = ax5.dom, axu = ax5.util, res = "";
         *
         * var el = axd("#list-container");
         * el.data({a:1}); // set data
         * el.data("set", {a:1100, b:[0,1,2,3]}); // set data
         *
         * res += el.data("a"); // get data
         * res += el.data("get", "b"); // get data
         * console.log(res);
         * // 11000,1,2,3
         *
         * console.log(el.data("b"));
         * // [0, 1, 2, 3]
         * el.data("remove", "b"); // remove data
         * console.log(el.data("b"));
         * // ""
         *
         * el.data("remove"); // remove all
         * ```
         */
        this.data = function (command, O) {
            var rs = dom.data(this.elements, command, O);
            return (rs === this.elements) ? this : rs;
        };
        /**
         * 엘리먼트의 자식을 모두 지워줍니다. 내용을 깨긋히 비워 냅니다.
         * @method ax5.dom0.empty
         * @returns {ax5.dom0}
         * @example
         * ```
         * var axd = ax5.dom, axu = ax5.util, res = "";
         *
         * axd("#id").empty();
         * ```
         */
        this.empty = function () {
            dom.empty(this.elements);
            return this;
        };
        /**
         * 엘리먼트의 value값을 반환 또는 부여합니다.
         * @method ax5.dom0.val
         * @param {String} [v] - element.value에 부여할 값
         * @returns {String}
         */
        this.val = function (v) {
            return dom.val(this.elements, v);
        };
        /**
         * 첫번째 엘리먼트 오브젝트를 반환합니다.
         * @method ax5.dom0.elt
         * @returns {domElement}
         */
        this.elt = function () {
            return this.elements[0];
        };

        /**
         * 엘리먼트에 이벤트를 발생시킵니다.
         * @method ax5.dom0.dispatch_event
         * @param {String} [evt_nm] - 발생시킬 이벤트 이름
         * @returns {ax5.dom0}
         */
        this.dispatch_event = function (evt_nm) {
            dom.dispatch_event(this.elements, evt_nm);
            return this;
        }
    };
    return new axdom(query);
};

module.exports = Object.assign(dom, {
    ready: ready,
    scroll: scroll,
    resize: resize,
    get: get,
    getOne: getOne,
    create: create,
    css: css,
    className: className,
    attr: attr,
    on: on,
    off: off,
    child: child,
    parent: parent,
    prev: prev,
    next: next,
    html: html,
    width: width,
    height: height,
    append: append,
    prepend: prepend,
    before: before,
    after: after,
    manipulate: manipulate,
    remove: remove,
    empty: empty,
    offset: offset,
    position: position,
    boxModel: boxModel,
    data: data,
    val: val,
    dispatch_event: dispatch_event
});