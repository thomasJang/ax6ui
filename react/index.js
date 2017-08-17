import React from 'react';
import ReactDOM from 'react-dom';

import axios from "axios";
import Grid from "./src/AX6UIGrid";
import Menu from "./src/AX6UIMenu";
import "./src/AX6UIGrid/style.scss";
import "./src/AX6UIMenu/style.scss";
import "./src/AX6UICalendar/style.scss";
import "./src/AX6UIPicker/style.scss";

const element = (
  <div>
    <h4>Grid basic</h4>
    <div data-ax6ui-grid="grid-basic" data-ax6ui-grid-config="{height: 400, columns: [
      {key: 'a', label: 'field A'},
      {key: 'b', label: 'field B'},
      {key: 'c', label: 'numbers C'},
      {key: 'd', label: 'field D'},
      {key: 'e', label: 'field E'},
      {key: 'f', label: 'field F'},
      {key: 'g', label: 'field G'},
      {key: 'h', label: 'field H'}
      ]}"></div>


    <h4>Grid formatter</h4>
    <div data-ax6ui-grid="grid-formatter" data-ax6ui-grid-config="{height: 400}"></div>

  </div>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);

let grid_basic = new Grid({
  target: document.querySelector('[data-ax6ui-grid="grid-basic"]'),
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

new Grid({
  target: document.querySelector('[data-ax6ui-grid="grid-formatter"]'),
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