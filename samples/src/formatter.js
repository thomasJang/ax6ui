import $ from "jqmin";
import Formatter from "../../src/AX6UIFormatter";
import "./custom-materialize.scss";

const $body = $("#sample-body");
let el = `
<div class="row">
    <div class="input-field col s12">
        <input type="text" id="money_formatter" data-ax6formatter="money" value="" />
        <label for="money_formatter">Money Formatter</label>
    </div>
    <div class="col s12">
        <button class="btn" data-btn="bind-money">bind</button>
        <button class="btn" data-btn="unbind-money">unbind</button>
    </div>
</div>

<div class="row">
    <div class="input-field col s12">
        <input type="text" id="date_formatter" data-ax6formatter="date" value="" />
        <label for="date_formatter">Date Formatter</label>
    </div>
    <div class="col s12">
        <button class="btn" data-btn="bind-date">bind</button>
        <button class="btn" data-btn="unbind-date">unbind</button>
    </div>
</div>
`;
$body.append(el);


/////~~~~~~~~~~~~~~~~~~
var formatter = new Formatter();

$body.on("click", '[data-btn]', function () {
  let btn = this.getAttribute("data-btn");
  let processor = {
    "bind-money"() {
      formatter.bind({
        target: $('[data-ax6formatter="money"]')
      });
    },
    "unbind-money"() {
      formatter.unbind({
        target: $('[data-ax6formatter="money"]')
      });
    },
    "bind-date"() {
      formatter.bind({
        target: $('[data-ax6formatter="date"]')
      });
    },
    "unbind-date"() {
      formatter.unbind({
        target: $('[data-ax6formatter="date"]')
      });
    }
  };
  processor[btn]();
})