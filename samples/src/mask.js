import $ from "jqmin";
import Mask from "../../src/AX6UIMask";
import "../../src/scss/AX6UIMask/AX6Mask.scss";

let el = $('<button>mask open</button>');
let myMask = new Mask();
myMask.setConfig({
    zIndex: 1000,
    onStateChanged: function () {
        console.log(this);
    }
});

myMask.onClick = function () {
    myMask.fadeOut();
};

el.on("click", function () {
    myMask.open();
});

$(function () {
    $(document.body).append(el);
});
