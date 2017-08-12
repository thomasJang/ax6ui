import $ from "jqmin";
import Select from "../../src/AX6UISelect";
import "../../src/AX6UISelect/style.scss";

let html = `
<div class="row">
    <div class="input-field col s12">
        <div data-ax6ui-select="select1" data-ax6ui-select-config='{}'>
            <select data-ax-path="select1"></select>
        </div>
    </div>
</div>
`;
let fn = {
  moduleRun: function ($body) {
    let select = new Select();
    let options = [];
    options.push({id: "", alias: "-- 전체 --"});
    for (let i = 0; i < 20; i++) {
      options.push({id: i, alias: "optionText" + i});
    }

    select.bind({
      target: $('[data-ax6ui-select="select1"]'),
      //height: 30,
      columnKeys: {
        optionValue: 'id',
        optionText: 'alias'
      },
      options: options
    });
  },
  moduleDestroy: function ($body) {
    $body.off("click");
  }
};

export default {
  html: html,
  fn: fn
}