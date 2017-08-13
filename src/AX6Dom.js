import U from "./AX6Util";

let core_pnum   = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    re_numnonpx = new RegExp("^(" + core_pnum + ")(?!px)[a-z%]+$", "i"),
    re_margin   = /^margin/,
    re_numsplit = new RegExp("^(" + core_pnum + ")(.*)$", "i"),
    re_position = /^(top|right|bottom|left)$/;

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
      let width, minWidth, maxWidth, computed, ret, style, left, rs, rsLeft;

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

// 엘리먼트 스타일 값 가져오기
function style(el, key, fn_nm) {
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

function css(els, O) {
  if (U.isString(O) || U.isString(O)) {
    return style(els[0], O, "css");
  }
  else {
    let i = 0, l = els.length, k, matchs;
    for (; i < l; i++) {
      for (k in O) {
        try {
          els[i].style[U.camelCase(k)] = (matchs = re_numsplit.exec(O[k])) ? matchs[1] + ( matchs[2] || "px" ) : O[k];
        }
        catch (e) {}
      }
    }
  }
  return els;
}

export default {
  css: css
}