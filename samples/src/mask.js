import $ from "jqLite";
import info from "../../src/AX6Info";
import util from "../../src/AX6Util";

let el = $('<div>DIV</div>');
el.css({"background": "#ccc", "padding": "10px"});


console.log(info.browser);
console.log(util.left("AXISJ", 3));
console.log(util.test);

$(function () {
    $(document.body).append(el);
});
