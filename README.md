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
import {AX6UICalendar as Calendar} from "ax6ui";

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
import {AX6UIFormatter as Formatter} from "ax6ui";

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
import {AX6UIPicker as Picker} from "ax6ui";

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

## AX6UIMenu
```js
import $ from "jqmin";
import {AX6Util as U, AX6UIMenu as Menu} from "ax6ui";
import "./assets/sample.scss";


const $body = $("#sample-body");
let el = `
<div id="attachedMenu-target"
     style="width:100%;height:36px;background: #cccccc;border-bottom:1px solid #000;padding: 0px 20px;"></div>

<div style="background: #eee;height: 1000px;"></div>
`;
$body.append(el);


/////~~~~~~~~~~~~~~~~~~
let menu = new Menu({
  theme: 'primary',
  // width: 200,
  iconWidth: 20,
  acceleratorWidth: 100,
  // offset: {left: 10, top: 10},
  itemClickAndClose: false,
  //position: "absolute",
  icons: {
    'arrow': '<i class="tiny material-icons">chevron_right</i>'
  },
  columnKeys: {
    label: 'name',
    items: 'chidren'
  },
  items: [
    {
      icon: '<i class="tiny material-icons">class</i>',
      name: "Menu Parent 0",
      chidren: [
        {
          check: {
            type: 'checkbox',
            name: 'A',
            value: '0',
            checked: false
          },
          name: "Menu Z",
          data: {},
          role: "",
          accelerator: "CmdOrCtrl+Z"
        },
        {
          check: {
            type: 'checkbox',
            name: 'A',
            value: '1',
            checked: true
          },
          name: "Menu A",
          data: {},
          role: ""
          //accelerator: "CmdOrCtrl+A"
        }
      ],
      filterType: "A"
    },
    {
      divide: true,
      filterType: "A"
    },
    {
      icon: '<i class="tiny material-icons">class</i>',
      name: "Menu Parent 1",
      chidren: [
        {
          name: "Menu Z",
          data: {},
          role: "",
          //accelerator: "CmdOrCtrl+Z",
          chidren: [
            {
              name: "Menu Z",
              data: {},
              role: ""
              //accelerator: "CmdOrCtrl+Z"
            },
            {
              name: "Menu A",
              data: {},
              role: ""
              //accelerator: "CmdOrCtrl+A"
            }
          ]
        },
        {
          name: "Menu A",
          data: {},
          role: ""
          //accelerator: "CmdOrCtrl+A"
        }
      ],
      filterType: "A"
    },
    {
      check: {
        type: 'radio',
        name: 'radioName',
        value: '1',
        checked: false
      },
      icon: '<i class="tiny material-icons">class</i>',
      name: "Menu Parent 2"
    },
    {
      check: {
        type: 'radio',
        name: 'radioName',
        value: '2',
        checked: false
      },
      name: "Menu Parent 3"
    },
    {
      check: {
        type: 'radio',
        name: 'radioName',
        value: '3',
        checked: false
      },
      name: "Menu Parent 4"
    },
    {divide: true},
    {
      html: function () {
        // console.log(this);
        return '<div style="text-align: center;">' +
          '<button class="btn btn-primary" data-menu-btn="OK">OK</button> ' +
          '<button class="btn btn-danger" data-menu-btn="CANCEL">CANCEL</button>' +
          '</div>';
      }
    }
  ]
});

menu.onStateChanged = function () {
  if (this.state == 'close') {
    //console.log(this.self.getCheckValue());
  }
};
menu.onClick = function () {
  // console.log(this);
};

menu.onLoad = function () {
  if (!this.element) return this;
  $(this.element).on("click", '[data-menu-btn]', function () {
    var act = this.getAttribute("data-menu-btn");
    if (act == 'OK') {
      console.log(menu.getCheckValue());
    }
    menu.close();
  });
};

$(document.body).on("contextmenu", function (e) {
  menu.popup(e, {
    theme: "danger", filter: function () {
      return true;
    }
  });

  U.stopEvent(e.originalEvent);
});


let attachedMenu = new Menu({
  theme: 'danger',
  direction: "top",
  offset: {left: 0, top: 1},
  position: "absolute",
  icons: {
    'arrow': '<i class="tiny material-icons">chevron_right</i>'
  },
  onStateChanged: function () {
    console.log(this);
  },
  onClick: function () {
    console.log(this);
  },
  columnKeys: {
    label: 'name',
    items: 'chidren'
  },
  items: [
    {
      icon: '<i class="tiny material-icons">class</i>',
      name: "Menu Parent 0",
      chidren: []
    },
    {
      icon: '<i class="tiny material-icons">cloud_queue</i>',
      name: "Menu Parent 1",
      chidren: [
        {
          name: "Menu Z",
          data: {},
          role: "",
          //accelerator: "CmdOrCtrl+Z",
          chidren: [
            {
              name: "Menu Z",
              data: {},
              role: ""
              //accelerator: "CmdOrCtrl+Z"
            },
            {
              name: "Menu A",
              data: {},
              role: ""
              //accelerator: "CmdOrCtrl+A"
            }
          ]
        },
        {
          name: "Menu A",
          data: {},
          role: ""
          //accelerator: "CmdOrCtrl+A"
        }
      ]
    }
  ]
}).attach($('#attachedMenu-target'));
```
- API : https://github.com/ax6ui/ax6ui/blob/master/md/AX6UIMenu.md
- SAMPLE : https://github.com/ax6ui/ax6ui/blob/master/samples/src/menu.js

## AX6UIGrid
```js
import $ from "jqmin";
import axios from "axios";
import {AX6UIGrid as Grid} from "ax6ui";

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


## AX6UIUploader
```js
import $ from "jqmin";
import axios from "axios";
import {AX6UIDialog as Dialog, AX6UIUploader as Uploader} from "ax6ui";

const $body = $("#sample-body");
let el = `
<div data-ax6ui-uploader="upload1">
    <button data-ax6ui-uploader-button="selector" class="btn btn-primary">Select File (*/*)</button>
    (Upload Max fileSize 20MB)
    <div data-uploaded-box="upload1" data-ax6ui-uploader-uploaded-box="inline"></div>
</div>

<div style="padding: 0;" data-btn-wrap="">
    <h5>control</h5>
    <a class="waves-effect waves-light btn" data-btn="getUploadedFiles">getUploadedFiles</a>
    <a class="waves-effect waves-light btn" data-btn="removeFileAll">removeFileAll</a>
</div>
`;
$body.append(el);


/////~~~~~~~~~~~~~~~~~~
let dialog = new Dialog({
  title: "AX6UIUploader"
});
let uploader = new Uploader({
  //debug: true,
  target: $body.find('[data-ax6ui-uploader="upload1"]'),
  form: {
    action: "http://api-demo.ax5.io/api/v1/ax5uploader",
    fileName: "file"
  },
  multiple: true,
  manualUpload: false,
  progressBox: true,
  progressBoxDirection: "left",
  dropZone: {
    target: $body.find('[data-uploaded-box="upload1"]')
  },
  uploadedBox: {
    target: $body.find('[data-uploaded-box="upload1"]'),
    icon: {
      "download": '<i class="material-icons">file_download</i>',
      "delete": '<i class="material-icons">delete</i>'
    },
    columnKeys: {
      name: "fileName",
      type: "ext",
      size: "fileSize",
      uploadedName: "saveName",
      uploadedPath: "",
      downloadPath: "",
      previewPath: "",
      thumbnail: ""
    },
    lang: {
      supportedHTML5_emptyListMsg: 'Drop files here or click to upload.',
      emptyListMsg: 'Empty of List.'
    },
    onchange: function () {

    },
    onclick: function () {
      // console.log(this.cellType);
      let fileIndex = this.fileIndex;
      let file = this.uploadedFiles[fileIndex];
      switch (this.cellType) {
        case "delete":
          dialog.confirm({
            title: "AX5UI",
            msg: "Are you sure you want to delete it?"
          }, function () {
            if (this.key == "ok") {

              axios({
                headers: {
                  'Content-Type': "application/json",
                },
                method: "post",
                url: 'http://api-demo.ax5.io/api/v1/ax5uploader/delete',
                data: JSON.stringify([{
                  id: file.id
                }]),
              }).then(res => {
                uploader.removeFile(fileIndex);
              }).catch(error => {
                dialog.alert(error);
              });

            }
          });
          break;

        case "download":
          if (file.download) {
            location.href = "http://api-demo.ax5.io" + file.download;
          }
          break;
      }
    }
  },
  validateSelectedFiles: function () {
    console.log(this);
    // 10개 이상 업로드 되지 않도록 제한.
    if (this.uploadedFiles.length + this.selectedFiles.length > 10) {
      alert("You can not upload more than 10 files.");
      return false;
    }
    return true;
  },
  onprogress: function () {

  },
  onuploaderror: function () {
    console.log(this.error);
    dialog.alert(this.error.message);
  },
  onuploaded: function () {

  },
  onuploadComplete: function () {

  }
});

// 파일 목록 가져오기
axios({
  method: 'get',
  url: 'http://api-demo.ax5.io/api/v1/ax5uploader'
}).then(res => {
  uploader.setUploadedFiles(res.data);
}).catch(error => {
  console.log(error);
});
```
- API : https://github.com/ax6ui/ax6ui/blob/master/md/AX6UIUploader.md
- SAMPLE : https://github.com/ax6ui/ax6ui/blob/master/samples/src/uploader.js

## Question
- https://jsdev.kr/c/axisj/ax6ui
- https://github.com/ax6ui/ax6ui/issues 