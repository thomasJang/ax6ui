import $ from "jquery";
import "./sample.scss";
window.jQuery = window.$ = $;

$(document).ready(function (e) {
  require("materialize-css/dist/js/materialize.js");
  //require("https://fonts.googleapis.com/icon?family=Material+Icons");
  $('[data-activates="slide-out"]').sideNav();
});