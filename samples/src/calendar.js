import $ from "jqmin";
import Calendar from "../../src/AX6UICalendar";
import "../../src/AX6UICalendar/index.scss";

const $body = $("#sample-body");
let el = `
<div id="calendar-target" style="width:250px;"></div>
`;
$body.append(el);


/////~~~~~~~~~~~~~~~~~~

let myCalendar = new Calendar({
    control: {
        left: '≪',
        yearTmpl: '%s',
        monthTmpl: '%s',
        right: '≫',
        yearFirst: true
    },
    dimensions: {
        itemPadding: 1,
        height: 200
    },
    target: document.getElementById("calendar-target"),
    displayDate: (new Date()),
    startOfWeek: 1,
    mode: "day",
    selectMode: "day",
    onClick: function () {
        console.log(myCalendar.getSelection());
    },
    onStateChanged: function () {
        console.log(this);
    },
    multipleSelect: 2
});


