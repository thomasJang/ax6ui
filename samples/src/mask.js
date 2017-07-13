import $ from "jqLite";
import Mask from "../../src/AX6UIMask";

let el = $('<div>DIV</div>');
let myMask = new Mask();
myMask.setConfig({
    zIndex: 1000
});

el.on("click", function () {
    myMask.open();
});

$(function () {
    $(document.body).append(el);
});
