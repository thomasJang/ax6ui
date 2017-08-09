import $ from "jqmin";
import "../../src/AX6UITooltip/style.scss";

const $body = $("#sample-body");
let el = `
<br/>
<br/>
<button data-ax6ui-tooltip="나는 툴팁" class="btn">default</button>
<button data-ax6ui-tooltip="tooltip bottom" class="btn tooltip-bottom">bottom</button>
<button data-ax6ui-tooltip="tooltip top" class="btn tooltip-top">top</button>
<button data-ax6ui-tooltip="tooltip left" class="btn tooltip-left">left</button>
<button data-ax6ui-tooltip="tooltip right" class="btn tooltip-right">right</button>
`;
$body.append(el);


/////~~~~~~~~~~~~~~~~~~