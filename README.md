[![npm version](https://badge.fury.io/js/ax6ui.svg)](https://badge.fury.io/js/ax6ui)
[![](https://img.shields.io/npm/dm/ax6ui.svg)](https://www.npmjs.com/package/ax6ui)


# ax6ui
ES6 Javascript UI Component
`ax6ui`는 ES6표준 문법으로 사용하는 Javascript UI 콤포넌트 입니다. 
React, Vue 등의 프로젝트와 함께 사용할 수 있습니다.

# Install

### ES6 버전
```
npm install ax6ui -S
```

### ES5 버전
```
npm install ax6ui-es5 -S
```


# Usage

## Sample 폴더 사용법
```js
cd samples
npm install
npm start
```
입력 후 웹 브라우저 주소줄에 `localhost:4000`을 입력하면 으로 samples 소스를 확인 할 수 있습니다. 데스크탑의 경우 메뉴가 우측 상단에 메뉴로 다른 페에지들을 확인 할 수 있습니다.

## AX6UIMask
```js
import $ from "jqmin";
import {AX6UIMask as Mask} from "ax6ui";
// or
// import ax6ui from "ax6ui"; 

const $body = $("#sample-body");
let el = `
<div id="making-div" 
    style="height:500px;background: #ccc;">
    making div
</div>

<a class="btn" data-btn="mask">
button</a>
`;
$body.append(el);

/////~~~~~~~~~~~~~~~~~~
let myMask = new Mask();
// or
// let myMask = new ax6ui.AX6UIMask();

// set config of mask
myMask.setConfig({
    zIndex: 1000,
    onStateChanged: function () {
        console.log(this);
    },
    onClick: function () {
        myMask.fadeOut();
    }
});

$body.on("click", '[data-btn]', function () {
    let btn = this.getAttribute("data-btn");
    let processor = {
        mask(){
            myMask.open();
        }
    };
    if(btn in processor){
        processor[btn]();
    }
});
```

- API : https://github.com/ax6ui/ax6ui/blob/master/md/AX6UIMask.md
- SAMPLE : https://github.com/ax6ui/ax6ui/blob/master/samples/src/mask.js

## AX6UICalendar
```js
import $ from "jqmin";
import Calendar from "../../src/AX6UICalendar";

const $body = $("#sample-body");
let el = `
<div id="calendar-target-0" style="width:270px;"></div>
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
```

- API : https://github.com/ax6ui/ax6ui/blob/master/md/AX6UICalendar.md
- SAMPLE : https://github.com/ax6ui/ax6ui/blob/master/samples/src/calendar.js

## AX6UIFormatter
```js
import $ from "jqmin";
import Formatter from "../../src/AX6UIFormatter";

const $body = $("#sample-body");
let el = `
<div class="row">
    <div class="input-field col s12">
        <input type="text" id="money_formatter" data-ax6formatter="money" value="" />
        <label for="money_formatter">Money Formatter</label>
    </div>
    <div class="col s12">
        <button class="btn" data-btn="bind-money">bind</button>
        <button class="btn" data-btn="unbind-money">unbind</button>
    </div>
</div>
`;
$body.append(el);


/////~~~~~~~~~~~~~~~~~~
var formatter = new Formatter();

$body.on("click", '[data-btn]', function () {
    let btn = this.getAttribute("data-btn");
    let processor = {
        "bind-money"(){
            formatter.bind({
                target: $('[data-ax6formatter="money"]')
            });
        },
        "unbind-money"(){
            formatter.unbind({
                target: $('[data-ax6formatter="money"]')
            });
        }
    };
    processor[btn]();
})
```
- API : https://github.com/ax6ui/ax6ui/blob/master/md/AX6UIFormatter.md
- SAMPLE : https://github.com/ax6ui/ax6ui/blob/master/samples/src/formatter.js


## AX6UIPicker
```js
import $ from "jqmin";
import Picker from "../../src/AX6UIPicker";
import "./custom-materialize.scss";

const $body = $("#sample-body");
let el = `
<div class="row">
    <div class="input-field col s12">
        <input type="text" id="picker-date" value="" placeholder="" onchange="console.log('picker-date = ' + this.value)"/>
        <label for="picker-date">yyyy/mm/dd</label>
    </div>
</div>
`;
$body.append(el);


/////~~~~~~~~~~~~~~~~~~
let today = new Date();
let picker = new Picker();

// 단일 날짜 바인드
picker.bind({
    zIndex: 4000,
    target: $('#picker-date'),
    direction: "auto",
    content: {
        type: 'date',
        config: {
            mode: "year",
            selectMode: "month"
        },
        formatter: {
            pattern: 'date(month)'
        }
    },
    onStateChanged: function () {
        // console.log(this.values);
    }
});
```
- API : https://github.com/ax6ui/ax6ui/blob/master/md/AX6UIPicker.md
- SAMPLE : https://github.com/ax6ui/ax6ui/blob/master/samples/src/picker.js



## AX6UIGrid
```js
import $ from "jqmin";
import axios from "axios";
import Grid from "../../src/AX6UIGrid";
import "./custom-materialize.scss";

const $body = $("#sample-body");
let el = `
<h4>Grid basic</h4>
<div data-ax6ui-grid="grid-basic" data-ax6ui-grid-config="{columns: [
        {key: 'a', label: 'field A'},
        {key: 'b', label: 'field B'},
        {key: 'c', label: 'numbers C'},
        {key: 'd', label: 'field D'},
        {key: 'e', label: 'field E'},
        {key: 'f', label: 'field F'},
        {key: 'g', label: 'field G'},
        {key: 'h', label: 'field H'}
    ]}" style="height: 200px;"></div>
    
<h4>Grid formatter</h4>
<div data-ax6ui-grid="grid-formatter" style="height: 200px;"></div>
`;
$body.append(el);


/////~~~~~~~~~~~~~~~~~~

Grid.setFormatter({
  "capital"() { // 개발자가 직접 정의한.
    return this.value.toUpperCase();
  }
});

let grid_basic = new Grid({
  target: $body.find('[data-ax6ui-grid="grid-basic"]'),
});

// xhr 호출
axios({
  method: 'get',
  url: 'http://api-demo.ax5.io/api/v1/ax5grid'
}).then(res => {
  grid_basic.setData(res.data);
}).catch(error => {
  console.log(error);
});

// formatter 사용
new Grid({
  target: $body.find('[data-ax6ui-grid="grid-formatter"]'),
  showLineNumber: true,
  showRowSelector: true,
  multipleSelect: true,
  lineNumberColumnWidth: 40,
  rowSelectorColumnWidth: 27,
  columns: [
    {key: 'a', label: 'field A'},
    {key: 'b', label: 'field B', formatter: 'capital'},
    {key: 'c', label: 'number C', formatter: 'money'} // 그리드에 내장된 formatter
  ]
}).setData([
  {a: "토마스", b: "Thomas", c: 50000}
]);
```
- API : https://github.com/ax6ui/ax6ui/blob/master/md/AX6UIGrid.md
- SAMPLE : https://github.com/ax6ui/ax6ui/blob/master/samples/src/grid.js


## Question
- https://jsdev.kr/c/axisj/ax6ui
- https://github.com/ax6ui/ax6ui/issues 