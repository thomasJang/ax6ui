import $ from "jqmin";
import Mask from "@AX6UI/AX6UIMask";
import "ax6ui/AX6UIMask/style.scss";

const html = `
<div id="making-div" style="height:500px;background: #ccc;">making div</div>
<br/>
<a class="waves-effect waves-light btn" data-btn="mask">Open Mask</a>
<a class="waves-effect waves-light btn" data-btn="mask-content">Open Mask(with content)</a>
<a class="waves-effect waves-light btn" data-btn="mask-div">Open Mask(masking)</a>
`;

let fn = {};
fn.moduleRun = function ($body) {
  /////~~~~~~~~~~~~~~~~~~
  fn.myMask = new Mask();
  fn.myMask.setConfig({
    zIndex: 1000,
    onStateChanged: function () {
      console.log(this);
    }
  });

  fn.myMask.onClick = function () {
    console.log(this);
    fn.myMask.fadeOut();
  };

  $body.on("click", '[data-btn]', (e) => {
    let btn = e.currentTarget.getAttribute("data-btn");
    let processor = {
      mask() {
        fn.myMask.open();
      },
      "mask-content"() {
        fn.myMask.open({
          content: "MASK CONTENT"
        });
      },
      "mask-div"() {
        fn.myMask.open({
          target: $('#making-div')
        });
      }
    };

    if (btn in processor) {
      processor[btn]();
    }
  });
};

fn.moduleDestroy = function ($body) {
  fn.myMask.destory();
  fn.myMask = null;
  $body.off("click");
};

export default {
  html: html,
  fn: fn
}
