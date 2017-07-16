import $ from "jqmin";
import Formatter from "../../src/AX6UIFormatter";

const $body = $("#sample-body");
let el = `
<input name="1" type="text" placeholder="" data-ax6formatter="money" onchange="console.log('change event : ' + this.value);" value="" />
`;
$body.append(el);


/////~~~~~~~~~~~~~~~~~~
var formatter = new Formatter();

formatter.bind({
    target: $('[data-ax6formatter="money"]')
});