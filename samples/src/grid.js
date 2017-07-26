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
    target: $body.find('[data-ax6ui-grid="first-grid"]'),
    columns: [
        {
            key: "id",
            label: "ID",
            width: 80,
            styleClass: function () {
                return "ABC";
            },
            enableFilter: true,
            align: "center",
            editor: {
                type: "text", disabled: function () {
                    // item, value
                    return false;
                }
            }
        },
        {key: "name", label: "Name", align: "left", width: 200},
        {
            key: "isChecked", label: "Checkbox", width: 50, sortable: false, align: "center", editor: {
            type: "checkbox", config: {height: 17, trueValue: "Y", falseValue: "N"}
        }
        },
        {
            key: "saleType", label: "saleType", align: "center"
        },
        {
            key: "saleDt", label: "saleDt", align: "center", editor: {
            type: "date", config: {}
        }
        },
        {
            key: "customer", label: "Customer", align: "center", editor: {type: "text"}
        }
    ],
});

let sampleData = [
    {id: 0, name: "Thomas Jang", price: 1000, amount: null, saleDt: "2016-08-29", customer: "장기영", saleType: "A", isChecked: "Y"},
    {id: "2", name: "Seowoo", price: 1100, amount: 11, saleDt: "2016-08-28", customer: "장서우", saleType: "B", isChecked: "N"},
    {id: "3", name: "Mondo", price: 1200, amount: 10, saleDt: "2016-08-27", customer: "이영희", saleType: "A", isChecked: "N"},
    {id: "4", name: "Brant", price: 1300, amount: 8, saleDt: "2016-08-25", customer: "황인서", saleType: "C", isChecked: "Y"},
    {id: "5", name: "Tiffany", price: 1500, amount: 2, saleDt: "2016-08-26", customer: "이서연", saleType: "A", isChecked: "N"},
    {id: "6", name: "Edward", price: 1400, amount: 5, saleDt: "2016-08-29", customer: "황세진", saleType: "D", isChecked: "Y"},
    {id: "7", name: "Bill", price: 1400, amount: 5, saleDt: "2016-08-29", customer: "이하종", saleType: "B", isChecked: "N"},
    {id: "8", name: "Aeei", price: 1400, amount: 5, saleDt: "2016-08-29", customer: "김혜미", saleType: "C", isChecked: "Y"}
];
grid.setData(sampleData);