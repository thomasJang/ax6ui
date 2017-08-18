import $ from "jqmin";
import U from "../src/AX6Util.js";
import SideNav from "../src/AX6UISideNav.js";
import "../src/AX6UISideNav/style.scss";
import "./src/assets/sample.scss";


let $slide_out;
let $body;
let module;
let currentModule = '';
let sideNav;

function loadModule(moduleName) {
  if (module && module.fn) module.fn.moduleDestroy($body);
  module = null;
  $body.empty();
  currentModule = moduleName;

  switch (moduleName) {
    case "AX6Util":
      require.ensure([], function (n) {
        module = require("./src/util").default;
        $body.html(module.html);
        module.fn.moduleRun($body);
      });
      break;

    case "AX6UIMask":
      require.ensure([], function (n) {
        module = require("./src/mask").default;
        $body.html(module.html);
        module.fn.moduleRun($body);
      });
      break;

    case "AX6UIFormatter":
      require.ensure([], function (n) {
        module = require("./src/formatter").default;
        $body.html(module.html);
        module.fn.moduleRun($body);
      });
      break;

    case 'AX6UICalendar':
      require.ensure([], function (n) {
        module = require("./src/calendar").default;
        $body.html(module.html);
        module.fn.moduleRun($body);
      });
      break;

    case 'AX6UIPicker':
      require.ensure([], function (n) {
        module = require("./src/picker").default;
        $body.html(module.html);
        module.fn.moduleRun($body);
      });
      break;

    case 'AX6UIPalette':
      require.ensure([], function (n) {
        module = require("./src/palette").default;
        $body.html(module.html);
        module.fn.moduleRun($body);
      });
      break;

    case 'AX6UIDialog':
      require.ensure([], function (n) {
        module = require("./src/dialog").default;
        $body.html(module.html);
        module.fn.moduleRun($body);
      });
      break;

    case 'AX6UIToast':
      require.ensure([], function (n) {
        module = require("./src/toast").default;
        $body.html(module.html);
        module.fn.moduleRun($body);
      });
      break;

    case 'AX6UISelect':
      require.ensure([], function (n) {
        module = require("./src/select").default;
        $body.html(module.html);
        module.fn.moduleRun($body);
      });
      break;

    case 'AX6UIAutocomplete':
      require.ensure([], function (n) {
        module = require("./src/autocomplete").default;
        $body.html(module.html);
        module.fn.moduleRun($body);
      });
      break;

    case 'AX6UIMenu':
      require.ensure([], function (n) {
        module = require("./src/menu").default;
        $body.html(module.html);
        module.fn.moduleRun($body);
      });
      break;

    case 'AX6UIGrid':
      require.ensure([], function (n) {
        module = require("./src/grid").default;
        $body.html(module.html);
        module.fn.moduleRun($body);
      });
      break;

    case 'AX6UIModal':
      require.ensure([], function (n) {
        module = require("./src/modal").default;
        $body.html(module.html);
        module.fn.moduleRun($body);
      });
      break;

    case 'AX6UIUploader':
      require.ensure([], function (n) {
        module = require("./src/uploader").default;
        $body.html(module.html);
        module.fn.moduleRun($body);
      });
      break;

    case 'AX6UITooltip':
      require.ensure([], function (n) {
        module = require("./src/tooltip").default;
        $body.html(module.html);
        module.fn.moduleRun($body);
      });
      break;

    case 'AX6UIDocker':
      require.ensure([], function (n) {
        module = require("./src/docker").default;
        $body.html(module.html);
        module.fn.moduleRun($body);
      });
      break;
  }
}

window.onpopstate = function (e) {
  let param = U.param(document.location.search.replace("?", ""));
  if (typeof param.module !== 'undefined' && param.module != currentModule) {
    loadModule(param.module);
  }
};

$(document).ready(function (e) {
  sideNav = new SideNav({
    menu: {
      target: document.querySelector('[data-ax6ui-sidenav-menu]')
    },
    panel: {
      target: document.querySelector('[data-ax6ui-sidenav-panel]')
    }
  });

  $slide_out = $('#slide-out');
  $body = $("#sample-body");

  $('[data-activates="slide-out"]').on('click', function () {
    sideNav.open();
  });

  $('[data-href]').on("click", function (e) {
    sideNav.close();

    let moduleName = this.getAttribute("data-href");
    history.pushState(null, null, "?module=" + moduleName);
    loadModule(moduleName);
  });

  let param = U.param(document.location.search.replace("?", ""));

  if(typeof param.module == 'undefined'){
    loadModule("AX6Util");
  }
  else if (param.module != currentModule) {
    loadModule(param.module);
  }
});