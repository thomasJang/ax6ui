import $ from "jqmin";
import Formatter from "../../src/AX6UIFormatter";


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
        <input type="text" id="money_int_formatter" data-ax6formatter="money(int)" value="" />
        <label for="money_int_formatter">Money(int) Formatter</label>
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

<div class="row">
    <div class="input-field col s12">
        <input type="text" id="date_time_formatter" data-ax6formatter="date(time)" value="" />
        <label for="date_time_formatter">Date(time) Formatter</label>
    </div>
</div>

<div class="row">
    <div class="input-field col s12">
        <input type="text" id="time_formatter" data-ax6formatter="time" value="" />
        <label for="time_formatter">Time Formatter</label>
    </div>
</div>

<div class="row">
    <div class="input-field col s12">
        <input type="text" id="my_formatter" data-ax6formatter="myPattern" value="" />
        <label for="my_formatter">myPattern</label>
    </div>
</div>
`;
$body.append(el);


/////~~~~~~~~~~~~~~~~~~
let formatter = new Formatter();

formatter.bind({
  target: $('[data-ax6formatter="money(int)"]')
});
formatter.bind({
  target: $('[data-ax6formatter="date(time)"]')
});
formatter.bind({
  target: $('[data-ax6formatter="time"]')
});

// 사용자 정의 포멧터 정의
Formatter.setFormatter({
  "myPattern": {
    getEnterableKeyCodes: function (_opts) {
      let enterableKeyCodes = {
        '189': '-' // eventKeyCode
      };
      return jQuery.extend(
        enterableKeyCodes,
        Formatter.getCtrlKeys(),
        Formatter.getNumKeys()
      );
    },
    getPatternValue: function (_opts, optIdx, e, val, eType) {
      val = val.replace(/\D/g, "");
      let regExpPattern = /^([0-9]{2})\-?([0-9]{2})?\-?([0-9]{2})?\-?([0-9]{2})?/;
      return val.replace(regExpPattern, function (a, b) {
        let nval = [arguments[1]];
        if (arguments[2]) nval.push(arguments[2]);
        if (arguments[3]) nval.push(arguments[3]);
        if (arguments[4]) nval.push(arguments[4]);
        return nval.join("-");
      });
    }
  }
});

formatter.bind({
  target: $('[data-ax6formatter="myPattern"]')
});


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