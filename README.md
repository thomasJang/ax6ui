[![npm version](https://badge.fury.io/js/ax6ui.svg)](https://badge.fury.io/js/ax6ui)
[![](https://img.shields.io/npm/dm/ax6ui.svg)](https://www.npmjs.com/package/ax6ui)

[![](https://github.com/ax6ui/assets/blob/master/ax6ui-logo-320.png)](ax6ui logo)

# ax6ui
ES6 Javascript UI Component
`ax6ui`는 ES6표준 문법으로 사용하는 Javascript UI 콤포넌트 입니다. 
React, Vue 등의 프로젝트와 함께 사용할 수 있습니다.

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

demo : http://ax6ui.com

## UI Component List

### AX6Info
```js
import { AX6Info as info } from "ax6ui";
```
- https://github.com/ax6ui/ax6ui/blob/master/md/AX6Info.md

### AX6Util
```js
import { AX6Util as U } from "ax6ui";
```
- https://github.com/ax6ui/ax6ui/blob/master/md/AX6Util.md

### AX6UIMask
```js
import { AX6UIMask as Mask } from "ax6ui";

let mask = new Mask();
mask.open();
mask.close();
```
- https://github.com/ax6ui/ax6ui/blob/master/md/AX6UIMask.md

### AX6UIFormatter
```js
import { AX6UIFormatter as Formatter } from "ax6ui";

let formatter = new Formatter();

formatter.bind({
  target: $('[data-ax6formatter="money(int)"]')
});
```
- https://github.com/ax6ui/ax6ui/blob/master/md/AX6UIFormatter.md

### AX6UICalendar
```js
import { AX6UICalendar as Calendar } from "ax6ui";
import "ax6ui/AX6UICalendar/style.scss"; // css

let myCalendar_0 = new Calendar({
  target: document.getElementById("target")
});
```
- https://github.com/ax6ui/ax6ui/blob/master/md/AX6UICalendar.md

### AX6UIPalette
```js
import { AX6UIPalette as Palette } from "ax6ui";
import "ax6ui/AX6UIPalette/style.scss";

let palette = new Palette({
  target: document.getElementById("target")
});
```
- https://github.com/ax6ui/ax6ui/blob/master/md/AX6UIPalette.md

### AX6UIPicker
```js
import { AX6UIPicker as Picker } from "ax6ui";
import "ax6ui/AX6UICalendar/style.scss";
import "ax6ui/AX6UIPalette/style.scss";
import "ax6ui/AX6UIPicker/style.scss";

let picker = new Picker();

picker.bind({
  target: document.getElementById("target"),
  content: {
    type: 'date',
    config: {
      mode: "year",
      selectMode: "month"
    },
    formatter: {
      pattern: 'date(month)'
    }
  }
});
```
- https://github.com/ax6ui/ax6ui/blob/master/md/AX6UIPicker.md

### AX6UIDialog
```js
import { AX6UIDialog as Dialog } from "ax6ui";
import "ax6ui/AX6UIDialog/style.scss";

let dialog = new Dialog();


dialog.alert("alert");
dialog.alert({
  msg: "alert "
});
dialog.confirm({
  msg: "alert "
});
dialog.prompt({
    title: "prompt",
    msg: 'Input Here!!',
    input: {
      data1: {label: "passwd", type: "password"},
      data2: {label: "text"}
    }
}, function () {
  console.log(this);
});
```
- https://github.com/ax6ui/ax6ui/blob/master/md/AX6UIDialog.md

### AX6UIToast
```js
import { AX6UIToast as Toast } from "ax6ui";
import "ax6ui/AX6UIToast/style.scss";

let toast = new Toast();

toast.push("Toast~!!");
toast.confirm({
  title: "Title",
  msg: "Choose!!",
  btns: {
    Y: {label: "Y"},
    N: {label: "N"}
  }
}, function (res) {
  console.log(res);
});
```
- https://github.com/ax6ui/ax6ui/blob/master/md/AX6UIToast.md

### AX6UIModal
```js
import { AX6UIModal as Modal } from "ax6ui";
import "ax6ui/AX6UIModal/style.scss";

let modal = new Modal();
modal.open({
  position: {
    left: "center",
    top: "middle",
    margin: 10
  },
  width: 800,
  height: 600,
  disableDrag: false
}, function () {
  this.$.body.append('<h1>div contents</h1>');
});
```
- https://github.com/ax6ui/ax6ui/blob/master/md/AX6UIModal.md

### AX6UISelect
```js
import { AX6UISelect as Select } from "ax6ui";
import "ax6ui/AX6UISelect/style.scss";

let select = new Select();
select.bind({
  target: document.getElementById("target"),
  columnKeys: {
    optionValue: 'id',
    optionText: 'alias'
  },
  options: [
    {id: "id", alias: "optionText"}
  ]
});
```
- https://github.com/ax6ui/ax6ui/blob/master/md/AX6UISelect.md

### AX6UIMenu
```js
import { AX6UIMenu as Menu } from "ax6ui";
import "ax6ui/AX6UIMenu/style.scss";

let menu = new Menu({
  iconWidth: 20,
  acceleratorWidth: 100,
  itemClickAndClose: false,
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
          name: "Menu Z",
          accelerator: "CmdOrCtrl+Z"
        }
      ]
    }
  ]
});

window.addEventListener('contextmenu', function (e) {
    menu.popup(e, {
        filter: function () {
          return true;
        }
    });
    e.preventDefault();
}, false);
```
- https://github.com/ax6ui/ax6ui/blob/master/md/AX6UIMenu.md

### AX6UIUploader
```js
import { AX6UIUploader as Uploader } from "ax6ui";
import "ax6ui/AX6UIUploader/style.scss";

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

    }
  },
  validateSelectedFiles: function () {
    if (this.uploadedFiles.length + this.selectedFiles.length > 10) {
      alert("You can not upload more than 10 files.");
      return false;
    }
    return true;
  },
  onprogress: function () {

  },
  onuploaderror: function () {

  },
  onuploaded: function () {

  },
  onuploadComplete: function () {

  }
});
```
- https://github.com/ax6ui/ax6ui/blob/master/md/AX6UIUploader.md

### AX6UIGrid
```js
import { AX6UIGrid as Grid } from "ax6ui";
import "ax6ui/AX6UIGrid/style.scss";

new Grid({
  target: document.getElementById("target"),
  columns: [
    {key: 'a', label: 'field A'},
    {key: 'b', label: 'field B', formatter: 'capital'},
    {key: 'c', label: 'number C', formatter: 'money'} // 그리드에 내장된 formatter
  ]
}).setData([
  {a: "토마스", b: "Thomas", c: 50000}
]);
```
- https://github.com/ax6ui/ax6ui/blob/master/md/AX6UIGrid.md

> ax6ui의 모든 컴포넌트를 사용한다면 개별 컴포넌트의 style.scss를 별도로 import하는 대신에 `import "ax6ui/style.scss";` 을 이용하여 모든 style을 사용할 수 있습니다.

## Question
- https://jsdev.kr/c/axisj/ax6ui
- https://github.com/ax6ui/ax6ui/issues 