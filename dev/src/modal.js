import $ from "jqmin";
import Modal from "@AX6UI/AX6UIModal";
import "@AX6UI/AX6UIModal/style.scss";

let html = `
<a class="waves-effect waves-light btn" data-btn="modal">modal</a>
`;
let fn = {
  moduleRun: function ($body) {

    let modal = new Modal();
    modal.setConfig({});

    $body.on("click", '[data-btn]', (e) => {
      let btn = e.currentTarget.getAttribute("data-btn");
      let processor = {
        modal() {
          modal.open({
            position: {
              left: "center",
              top: "middle",
              margin: 10
            },
            width: 800,
            height: 600,
            disableDrag: false,
            fullScreen: function () {
              return ($(window).width() < 600);
            }
          }, function () {
            this.$.body.append('<h1>div contents</h1>');
          });
        },
      };

      if (btn in processor) {
        processor[btn]();
      }
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