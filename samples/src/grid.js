import $ from "jqmin";
import U from "../../src/AX6Util";
import Grid from "../../src/AX6UIGrid";
import "./custom-materialize.scss";

const $body = $("#sample-body");
let el = `
<div data-ax6ui-grid="first-grid" data-ax6ui-grid-config="{}" style="height: 300px;"></div>
`;
$body.append(el);


/////~~~~~~~~~~~~~~~~~~
let grid = new Grid();

grid.setConfig({
    target: $('[data-ax6ui-grid="first-grid"]'),
    columns: [
        {key: "a", label: "field A"},
        {key: "b", label: "field B"},
        {key: "c", label: "numbers C"},
        {key: "d", label: "field D"},
        {key: "e", label: "field E"},
        {key: "f", label: "field F"},
        {key: "g", label: "field G"},
        {key: "h", label: "field H"}
    ]
});