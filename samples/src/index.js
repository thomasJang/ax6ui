import $ from "jquery";
import U from "../../src/AX6Util";
import "./assets/sample.scss";

//require("materialize-css/dist/js/materialize.js");
window.jQuery = window.$ = $;

let $slide_out;
let $body;
let module;
let currentModule = '';

function loadModule(moduleName) {
  if (module && module.fn) module.fn.moduleDestroy($body);
  module = null;
  $body.empty();
  currentModule = moduleName;

  switch (moduleName) {
    case "AX6Util":
      require.ensure([], function (n) {
        module = require("./util").default;
        $body.html(module.html);
        module.fn.moduleRun($body);
      });
      break;

    case "AX6UIMask":
      require.ensure([], function (n) {
        module = require("./mask").default;
        $body.html(module.html);
        module.fn.moduleRun($body);
      });
      break;

    case "AX6UIFormatter":
      require.ensure([], function (n) {
        module = require("./formatter").default;
        $body.html(module.html);
        module.fn.moduleRun($body);
      });
      break;

    case 'AX6UICalendar':
      require.ensure([], function (n) {
        module = require("./calendar").default;
        $body.html(module.html);
        module.fn.moduleRun($body);
      });
      break;

    case 'AX6UIPicker':
      require.ensure([], function (n) {
        module = require("./picker").default;
        $body.html(module.html);
        module.fn.moduleRun($body);
      });
      break;

    case 'AX6UIPalette':
      require.ensure([], function (n) {
        module = require("./palette").default;
        $body.html(module.html);
        module.fn.moduleRun($body);
      });
      break;

    case 'AX6UIDialog':
      require.ensure([], function (n) {
        module = require("./dialog").default;
        $body.html(module.html);
        module.fn.moduleRun($body);
      });
      break;

    case 'AX6UIToast':
      require.ensure([], function (n) {
        module = require("./toast").default;
        $body.html(module.html);
        module.fn.moduleRun($body);
      });
      break;

    case 'AX6UISelect':
      require.ensure([], function (n) {
        module = require("./select").default;
        $body.html(module.html);
        module.fn.moduleRun($body);
      });
      break;

    case 'AX6UIAutocomplete':
      require.ensure([], function (n) {
        module = require("./autocomplete").default;
        $body.html(module.html);
        module.fn.moduleRun($body);
      });
      break;

    case 'AX6UIMenu':
      require.ensure([], function (n) {
        module = require("./menu").default;
        $body.html(module.html);
        module.fn.moduleRun($body);
      });
      break;

    case 'AX6UIGrid':
      require.ensure([], function (n) {
        module = require("./grid").default;
        $body.html(module.html);
        module.fn.moduleRun($body);
      });
      break;

    case 'AX6UIModal':
      require.ensure([], function (n) {
        module = require("./modal").default;
        $body.html(module.html);
        module.fn.moduleRun($body);
      });
      break;

    case 'AX6UIUploader':
      require.ensure([], function (n) {
        module = require("./uploader").default;
        $body.html(module.html);
        module.fn.moduleRun($body);
      });
      break;

    case 'AX6UITooltip':
      require.ensure([], function (n) {
        module = require("./tooltip").default;
        $body.html(module.html);
        module.fn.moduleRun($body);
      });
      break;

    case 'AX6UIDocker':
      require.ensure([], function (n) {
        module = require("./docker").default;
        $body.html(module.html);
        module.fn.moduleRun($body);
      });
      break;
  }
}

window.onpopstate = function (e) {
  let param = U.param(document.location.search.replace("?", ""));
  if (param.module != currentModule) {
    loadModule(param.module);
  }
};

$(document).ready(function (e) {
  $slide_out = $('#slide-out');
  $body = $("#sample-body");

  $('[data-activates="slide-out"]').on('click', function () {
    $slide_out.css({transform: "translateX(0px)"});
  });

  $('[data-href]').on("click", function (e) {
    $slide_out.css({transform: "translateX(-100%)"});

    let moduleName = this.getAttribute("data-href");
    history.pushState(null, null, "?module=" + moduleName);
    loadModule(moduleName);
  });

  let param = U.param(document.location.search.replace("?", ""));
  if (param.module != currentModule) {
    loadModule(param.module);
  }
});