import $ from "jqmin";
import Modal from "../../src/AX6UIModal";


const $body = $("#sample-body");
let el = `
<a class="waves-effect waves-light btn" data-btn="modal">modal</a>
`;
$body.append(el);


/////~~~~~~~~~~~~~~~~~~

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

