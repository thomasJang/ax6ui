import $ from "jquery";
import "./assets/sample.scss";

window.jQuery = window.$ = $;

$(document).ready(function (e) {
  require("materialize-css/dist/js/materialize.js");

  let $slide_out = $('[data-activates="slide-out"]');
  let $body = $("#sample-body");
  let moduleName, module;

  $slide_out.sideNav();

  $('[data-href]').on("click", function (e) {
    if(module && module.fn) module.fn.moduleDestroy($body);
    module = null;
    $body.empty();
    $slide_out.sideNav('hide');
    moduleName = this.getAttribute("data-href");
    require.ensure([], function (n) {
      module = require("./" + moduleName + ".js").default;
      module.fn.moduleRun($body);
      $body.html(module.html);
    });

  });

});