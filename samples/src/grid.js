import $ from "jqmin";
import axios from "axios";
import Grid from "../../src/AX6UIGrid";
import Menu from "../../src/AX6UIMenu";
import "../../src/AX6UIGrid/style.scss";
import "../../src/AX6UIMenu/style.scss";
import "../../src/AX6UICalendar/style.scss";
import "../../src/AX6UIPicker/style.scss";

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

<h4>Grid column group</h4>
<div data-ax6ui-grid="grid-column-group" style="height: 200px;"></div>

<h4>Grid frozen col&row</h4>
<div data-ax6ui-grid="grid-frozen" style="height: 200px;"></div>

<h4>Grid context-menu</h4>
<div data-ax6ui-grid="grid-context-menu" style="height: 200px;"></div>
`;
$body.append(el);


/////~~~~~~~~~~~~~~~~~~

Grid.setFormatter({
  "capital"() { // 개발자가 직접 정의한.
    return this.value.toUpperCase();
  }
});
Grid.setCollector({});
Grid.setTmpl({
  "page_status": function () {
    return '<span>{{{progress}}} {{fromRowIndex}} - {{toRowIndex}} of {{dataRowCount}} {{#dataRealRowCount}}  현재페이지 {{.}}{{/dataRealRowCount}} {{#totalElements}}  전체갯수 {{.}}{{/totalElements}}</span>';
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

//
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

//
new Grid({
  target: $body.find('[data-ax6ui-grid="grid-column-group"]'),
  columns: [
    {key: "a", label: "field A"},
    {key: "b", label: "field B"},
    {
      key: "c", label: "field C", columns: [ // child columns
      {key: "d", label: "field D"},
      {key: "e", label: "field E"},
      {key: "f", label: "field F"}
    ]
    },
    {key: "g", label: "field G"},
    {key: "h", label: "field H"}
  ]
}).setData([
  {a: "토마스", b: "Thomas", c: 50000, d: 500, e: "E", f: "장서우", g: "2010년", h: "woman"},
  {a: "토마스", b: "Thomas", c: 50000, d: 500, e: "E", f: "이영희", g: "1977년", h: "woman"}
]);

//
new Grid({
  target: $body.find('[data-ax6ui-grid="grid-frozen"]'),
  frozenColumnIndex: 3,
  frozenRowIndex: 2,
  columns: [
    {key: "a", label: "field A", width: 80},
    {key: "b", label: "field B", width: 80},
    {
      label: "Group", columns: [ // child columns
      {key: "d", label: "field D"},
      {key: "e", label: "field E"},
      {key: "f", label: "field F"}
    ]
    },
    {key: "c", label: "field C", width: 200},
    {key: "g", label: "field G", width: 300},
    {key: "h", label: "field H"}
  ]
}).setData([
  {a: "토마스", b: "Thomas", c: 50000, d: 500, e: "E", f: "장서우", g: "2010년", h: "woman"},
  {a: "토마스", b: "Thomas", c: 50000, d: 500, e: "E", f: "이영희", g: "1977년", h: "woman"},
  {a: "토마스", b: "Thomas", c: 50000, d: 500, e: "E", f: "장서우", g: "2010년", h: "woman"},
  {a: "토마스", b: "Thomas", c: 50000, d: 500, e: "E", f: "이영희", g: "1977년", h: "woman"},
  {a: "토마스", b: "Thomas", c: 50000, d: 500, e: "E", f: "장서우", g: "2010년", h: "woman"},
  {a: "토마스", b: "Thomas", c: 50000, d: 500, e: "E", f: "이영희", g: "1977년", h: "woman"},
  {a: "토마스", b: "Thomas", c: 50000, d: 500, e: "E", f: "장서우", g: "2010년", h: "woman"},
  {a: "토마스", b: "Thomas", c: 50000, d: 500, e: "E", f: "이영희", g: "1977년", h: "woman"},
  {a: "토마스", b: "Thomas", c: 50000, d: 500, e: "E", f: "장서우", g: "2010년", h: "woman"},
  {a: "토마스", b: "Thomas", c: 50000, d: 500, e: "E", f: "이영희", g: "1977년", h: "woman"},
  {a: "토마스", b: "Thomas", c: 50000, d: 500, e: "E", f: "장서우", g: "2010년", h: "woman"},
  {a: "토마스", b: "Thomas", c: 50000, d: 500, e: "E", f: "이영희", g: "1977년", h: "woman"},
  {a: "토마스", b: "Thomas", c: 50000, d: 500, e: "E", f: "장서우", g: "2010년", h: "woman"},
  {a: "토마스", b: "Thomas", c: 50000, d: 500, e: "E", f: "이영희", g: "1977년", h: "woman"}
]);


let menu = new Menu({
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
menu.onClick = function (item, param) {
  console.log(item, param);
};

new Grid({
  target: $body.find('[data-ax6ui-grid="grid-context-menu"]'),
  columns: [
    {key: "a", label: "field A"},
    {key: "b", label: "field B"},
    {key: "c", label: "field C", formatter: "money"},
    {key: "g", label: "field G"},
    {key: "h", label: "field H"}
  ],
  body: {
    onContextMenu: function (e, param) {
      // console.log(e);
      menu.popup(e, {param: param});
    }
  }
}).setData([
  {a: "토마스", b: "Thomas", c: 50000, d: 500, e: "E", f: "장서우", g: "2010년", h: "woman"},
  {a: "토마스", b: "Thomas", c: 50000, d: 500, e: "E", f: "이영희", g: "1977년", h: "woman"}
]);