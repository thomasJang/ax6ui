import $ from "jqmin";
import U from "../../src/AX6Util";
import Calendar from "../../src/AX6UICalendar";
import "./custom-materialize.scss";

const $body = $("#sample-body");
let el = `
<div id="calendar-target-0" style="width:270px;padding: 10px;border-radius: 5px;float:left;margin-right: 20px;" class="card"></div>
<div id="calendar-target-1" style="width:270px;padding: 10px;border-radius: 5px;float:left;margin-right: 20px;" class="card"></div>
<div id="calendar-target-2" style="width:270px;padding: 10px;border-radius: 5px;float:left;margin-right: 20px;" class="card"></div>
`;
$body.append(el);


/////~~~~~~~~~~~~~~~~~~
let today = new Date();

let myCalendar_0 = new Calendar({
  control: {
    left: '<i class="material-icons">keyboard_arrow_left</i>',
    yearTmpl: '%s',
    monthTmpl: '%s',
    right: '<i class="material-icons">keyboard_arrow_right</i>',
    yearFirst: true
  },
  dimensions: {
    itemPadding: 1,
    height: 250
  },
  target: document.getElementById("calendar-target-0"),
  displayDate: (new Date()),
  startOfWeek: 1,
  mode: "day",
  selectMode: "day",
  onClick: function () {
    console.log(myCalendar_0.getSelection());
  },
  onStateChanged: function () {
    console.log(this);
  },
  multipleSelect: 2
});

let myCalendar_1 = new Calendar({
  control: {
    left: '<i class="material-icons">keyboard_arrow_left</i>',
    yearTmpl: '%s',
    monthTmpl: '%s',
    right: '<i class="material-icons">keyboard_arrow_right</i>',
    yearFirst: true
  },
  dimensions: {
    itemPadding: 1,
    height: 250
  },
  target: document.getElementById("calendar-target-1"),
  displayDate: today,
  startOfWeek: 0,
  mode: "day",
  selectMode: "day",
  multipleSelect: 2
});

myCalendar_1.setSelection([
  U.date(today, {'add': {d: -2}}),
  U.date(today, {'add': {d: -3}})
]);

let myCalendar_2 = new Calendar({
  target: document.getElementById("calendar-target-2"),
  marker: (function () {
    let marker = {};
    marker[U.date(today, {'return': 'yyyy-MM-dd', 'add': {d: -1}})] = true;
    marker[U.date(today, {'return': 'yyyy-MM-dd', 'add': {d: 0}})] = true;
    marker[U.date(today, {'return': 'yyyy-MM-dd', 'add': {d: 1}})] = true;
    return marker;
  })()
});