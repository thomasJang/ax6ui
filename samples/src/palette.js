import $ from "jqmin";
import Palette from "../../src/AX6UIPalette";


const $body = $("#sample-body");
let el = `
<div id="palette-target-0" style="width:270px;padding: 10px;border-radius: 5px;float:left;margin-right: 20px;" class="card"></div>
<div id="palette-target-1" style="width:270px;padding: 10px;border-radius: 5px;float:left;margin-right: 20px;" class="card"></div>
`;
$body.append(el);


/////~~~~~~~~~~~~~~~~~~
let myPalette_0 = new Palette({
  target: $('#palette-target-0'),
  onClick: function (hexColor) {
    console.log(hexColor);
  }
});
let myPalette_1 = new Palette({
  target: $('#palette-target-1'),
  selectedColor: "#F4F4F4",
  colors: {
    preview: {
      width: 26,
      height: 26,
      cellWidth: 32
    },
    label: {
      width: 70
    },
    slider: {
      trackHeight: 8,
      amount: 20,
      handleWidth: 18,
      handleHeight: 18
    },
    list: [
      {label: "red", value: "#ff0000"},
      {label: "orange", value: "#ff9802"},
      {label: "yellow", value: "#ffff00"},
      {label: "green", value: "#00ff36"},
      {label: "blue", value: "#0000ff"},
      {label: "purple", value: "#ba00ff"},
      {label: "skyblue", value: "#84e4ff"},
      {label: "pink", value: "#ff77c4"},
      {label: "black", value: "#000000"},
      {label: "white", value: "#ffffff"}
    ]
  }
});

myPalette_1.onClick = function (hexColor) {
  console.log(hexColor);
};

setTimeout(function () {
  //selectedColor: "#A0A0A0",
  myPalette_0.setSelectedColor("#4f4f4f  ");
}, 200);