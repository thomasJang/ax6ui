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
    "capital"(){ // 개발자가 직접 정의한.
        return this.value.toUpperCase();
    }
});
Grid.setCollector({
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
    {a:"토마스", b:"Thomas", c: 50000}
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
    {a:"토마스", b:"Thomas", c: 50000, d: 500, e: "E", f: "장서우", g: "2010년", h:"woman"},
    {a:"토마스", b:"Thomas", c: 50000, d: 500, e: "E", f: "이영희", g: "1977년", h:"woman"}
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
    {a:"토마스", b:"Thomas", c: 50000, d: 500, e: "E", f: "장서우", g: "2010년", h:"woman"},
    {a:"토마스", b:"Thomas", c: 50000, d: 500, e: "E", f: "이영희", g: "1977년", h:"woman"},
    {a:"토마스", b:"Thomas", c: 50000, d: 500, e: "E", f: "장서우", g: "2010년", h:"woman"},
    {a:"토마스", b:"Thomas", c: 50000, d: 500, e: "E", f: "이영희", g: "1977년", h:"woman"},
    {a:"토마스", b:"Thomas", c: 50000, d: 500, e: "E", f: "장서우", g: "2010년", h:"woman"},
    {a:"토마스", b:"Thomas", c: 50000, d: 500, e: "E", f: "이영희", g: "1977년", h:"woman"},
    {a:"토마스", b:"Thomas", c: 50000, d: 500, e: "E", f: "장서우", g: "2010년", h:"woman"},
    {a:"토마스", b:"Thomas", c: 50000, d: 500, e: "E", f: "이영희", g: "1977년", h:"woman"},
    {a:"토마스", b:"Thomas", c: 50000, d: 500, e: "E", f: "장서우", g: "2010년", h:"woman"},
    {a:"토마스", b:"Thomas", c: 50000, d: 500, e: "E", f: "이영희", g: "1977년", h:"woman"},
    {a:"토마스", b:"Thomas", c: 50000, d: 500, e: "E", f: "장서우", g: "2010년", h:"woman"},
    {a:"토마스", b:"Thomas", c: 50000, d: 500, e: "E", f: "이영희", g: "1977년", h:"woman"},
    {a:"토마스", b:"Thomas", c: 50000, d: 500, e: "E", f: "장서우", g: "2010년", h:"woman"},
    {a:"토마스", b:"Thomas", c: 50000, d: 500, e: "E", f: "이영희", g: "1977년", h:"woman"}
]);

new Grid({
    target: $body.find('[data-ax6ui-grid="grid-context-menu"]'),
    columns: [
        {key: "a", label: "field A"},
        {key: "b", label: "field B"},
        {key: "c", label: "field C", formatter: "money"},
        {key: "g", label: "field G"},
        {key: "h", label: "field H"}
    ],
    contextMenu: {
        iconWidth: 20,
        acceleratorWidth: 100,
        itemClickAndClose: false,
        icons: {
            'arrow': '<i class="fa fa-caret-right"></i>'
        },
        items: [
            {type: 1, label: "menu1"},
            {divide: true},
            {
                label: "Tools",
                items: [
                    {type: 1, label: "Ping"},
                    {type: 1, label: "SSH"},
                    {type: 1, label: "Telnet"},
                    {type: 1, label: "Winbox"},
                    {type: 1, label: "FileZilla Check SWF Hang"},
                    {label: "FileZilla IS_FILES"},
                    {label: "FileZilla CPU"}
                ]
            },
            {
                label: "Config",
                items: [
                    {label: "ssh"},
                    {type: 1, label: "ftp"},
                    {type: 1, label: "winbox"}
                ]
            }
        ],
        popupFilter: function (item, param) {
            //console.log(item, param);
            if(param.element) {
                return true;
            }else{
                return item.type == 1;
            }
        },
        onClick: function (item, param) {
            console.log(item, param);
            firstGrid.contextMenu.close();
            //또는 return true;
        }
    }
}).setData([
    {a:"토마스", b:"Thomas", c: 50000, d: 500, e: "E", f: "장서우", g: "2010년", h:"woman"},
    {a:"토마스", b:"Thomas", c: 50000, d: 500, e: "E", f: "이영희", g: "1977년", h:"woman"}
]);