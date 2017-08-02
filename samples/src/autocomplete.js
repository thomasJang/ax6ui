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
