import $ from "jqmin";
import Toast from "../../src/AX6UIToast";
import "../../src/AX6UIToast/style.scss";

const $body = $("#sample-body");
let el = `
<a class="waves-effect waves-light btn" data-btn="push">push</a>
<a class="waves-effect waves-light btn" data-btn="confirm">confirm</a>
`;
$body.append(el);


/////~~~~~~~~~~~~~~~~~~

let toast = new Toast({
  width: 600,
  containerPosition: "bottom-right"
});

$body.on("click", '[data-btn]', (e) => {
  let btn = e.currentTarget.getAttribute("data-btn");
  let processor = {
    push() {
      toast.push("테스트")
    },
    confirm() {
      toast.confirm({
        title: "예/아니오",
        msg: "당신은 개발자 입니까?",
        btns: {
          Y: {label: "예"},
          N: {label: "아니오"}
        }
      }, function (res) {
        console.log(res);
      });
    }
  };

  if (btn in processor) {
    processor[btn]();
  }
});

