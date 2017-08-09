import $ from "jqmin";
import "../../src/AX6UITooltip/style.scss";

const $body = $("#sample-body");
let el = `
<br/>
<br/>
<a href="#" data-ax6ui-tooltip="tooltip">default</a>
<a href="#" data-ax6ui-tooltip="tooltip" class="tooltip-bottom">bottom</a>
<a href="#" data-ax6ui-tooltip="tooltip" class="tooltip-top">top</a>
<a href="#" data-ax6ui-tooltip="tooltip" class="tooltip-left">left</a>
<a href="#" data-ax6ui-tooltip="tooltip" class="tooltip-bottom">right</a>
`;
$body.append(el);


/////~~~~~~~~~~~~~~~~~~