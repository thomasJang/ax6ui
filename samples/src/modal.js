import $ from "jqmin";
import Modal from "../../src/AX6UIModal";
import "./custom-materialize.scss";

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

    },
  };

  if (btn in processor) {
    processor[btn]();
  }
});

