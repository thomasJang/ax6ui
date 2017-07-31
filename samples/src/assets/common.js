import $ from "jquery";
import "./sample.scss";
window.jQuery = window.$ = $;


$(document).ready(function (e) {


  require("materialize-css/dist/js/materialize.js");
  //require("https://fonts.googleapis.com/icon?family=Material+Icons");

  $('[data-activates="slide-out"]').sideNav();
  $(".dropdown-button").dropdown({
    inDuration: 300,
    outDuration: 225,
    constrainWidth: true, // Does not change width of dropdown to that of the activator
    hover: false, // Activate on hover
    gutter: 0, // Spacing from edge
    belowOrigin: true, // Displays dropdown below the button
    alignment: 'left', // Displays dropdown with edge aligned to the left of button
    stopPropagation: true // Stops event propagation
  });
});