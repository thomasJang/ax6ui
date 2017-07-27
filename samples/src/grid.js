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
    ]}" style="height: 300px;"></div>
    

<h4>Grid formatter</h4>
<div data-ax6ui-grid="grid-formatter" style="height: 300px;"></div>
    
`;
$body.append(el);


/////~~~~~~~~~~~~~~~~~~

Grid.setFormatter({
    "capital"(){ // 개발자가 직접 정의한.
        return this.value.toUpperCase();
    }
});
Grid.setTmpl({
    "page_status": function () {
        return `<span>{{{progress}}} {{fromRowIndex}} - {{toRowIndex}}</span>`;
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
let grid_formatter = new Grid({
    target: $body.find('[data-ax6ui-grid="grid-formatter"]'),
    columns: [
        {key: 'a', label: 'field A'},
        {key: 'b', label: 'field B', formatter: 'capital'},
        {key: 'c', label: 'number C', formatter: 'money'} // 그리드에 내장된 formatter
    ]
}).setData([
    {a:"토마스", b:"Thomas", c: 50000}
]);