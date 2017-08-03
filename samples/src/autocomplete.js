import $ from "jqmin";
import Autocomplete from "../../src/AX6UIAutocomplete";
import "../../src/AX6UIAutocomplete/style.scss";

const $body = $("#sample-body");
let el = `
<div class="row">
    <div class="input-field col s12">
        <div data-ax6ui-autocomplete="ac1" data-ax6ui-autocomplete-config='{}'></div>
    </div>
</div>
`;
$body.append(el);


/////~~~~~~~~~~~~~~~~~~
let options = [];
options.push({value: "1", text: "string"});
options.push({value: "2", text: "number"});
options.push({value: "3", text: "substr"});
options.push({value: "4", text: "substring"});
options.push({value: "5", text: "search"});
options.push({value: "6", text: "parseInt"});
options.push({value: "7", text: "toFixed"});
options.push({value: "8", text: "min"});
options.push({value: "9", text: "max"});
options.push({value: "10", text: "장기영"});
options.push({value: "11", text: "장서우"});
options.push({value: "12", text: "이영희"});
options.push({value: "13", text: "황인서"});
options.push({value: "14", text: "황세진"});
options.push({value: "15", text: "이서연"});
options.push({value: "16", text: "액시스제이"});
options.push({value: "17", text: "ax5"});
options.push({value: "18", text: "ax5grid"});
options.push({value: "19", text: "ax5combobox"});
options.push({value: "20", text: "ax5autocomplete"});
options.push({value: "21", text: "ax5binder"});
options.push({value: "22", text: "ax5select"});
options.push({value: "23", text: "ax5mask"});
options.push({value: "24", text: "ax5toast"});
options.push({value: "25", text: "ax5dialog"});
options.push({value: "26", text: "ax5modal"});

let autocomplete = new Autocomplete({
  removeIcon: '<i class="fa fa-times"></i>'
});

autocomplete.bind({
  target: $('[data-ax6ui-autocomplete="ac1"]'),
  onSearch: function (callback) {
    var searchWord = this.searchWord;
    setTimeout(function () {
      var regExp = new RegExp(searchWord);
      var myOptions = [];
      options.forEach(function (n) {
        if (n.text.match(regExp)) {
          myOptions.push({
            value: n.value,
            text: n.text
          })
        }
      });
      callback({
        options: myOptions
      });
    }, 150);

  }
});
