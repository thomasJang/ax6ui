import $ from "jqmin";
import Dialog from "../../src/AX6UIDialog";


const $body = $("#sample-body");
let el = `
<a class="waves-effect waves-light btn" data-btn="alert">alert</a>
<a class="waves-effect waves-light btn" data-btn="confirm">confirm</a>
<a class="waves-effect waves-light btn" data-btn="prompt">prompt</a>
<hr/>
<a class="waves-effect waves-light btn" data-btn="dblalert">double alert call</a>
<a class="waves-effect waves-light btn" data-btn="dblconfirm">double confirm call</a>
`;
$body.append(el);


/////~~~~~~~~~~~~~~~~~~

let dialog = new Dialog();
dialog.setConfig({});

$body.on("click", '[data-btn]', (e) => {
  let btn = e.currentTarget.getAttribute("data-btn");
  let processor = {
    alert() {
      dialog.alert({
        msg: "alert " + new Date(),
        onStateChanged: function (res) {
          if (res.state == "open") {
            //$body.append($btn);
          }
          if (res.state == "close") {
            //$btn.remove();
          }
        }
      });
    },
    confirm() {
      dialog.confirm({
        title: "예/아니오",
        msg: "당신은 개발자 입니까?",
        btns: {
          Y: {label: "예"},
          N: {label: "아니오"}
        }
      }, function (res) {
        console.log(res);
      });
    },
    prompt() {
      dialog.prompt({
        title: "prompt",
        msg: '다음의 값을 입력하세요.',
        input: {
          data1: {label: "data1의 라벨", type: "password"},
          data2: {label: "data2의 라벨"}
        }
      }, function () {
        console.log(this);
      });
    },
    dblalert() {
      dialog.alert({
        msg: "alert " + (new Date() + " close 1s later"),
        onStateChanged: function (res) {
          if (res.state == "open") {
            //$body.append($btn);
          }
          if (res.state == "close") {
            //$btn.remove();
          }
        }
      });

      setTimeout(function () {
        dialog.close();
        dialog.alert({
          msg: "alert " + (new Date())
        });

      }, 1000);
    },
    dblconfirm() {
      dialog.confirm({
        title: "예/아니오",
        msg: "당신은 개발자 입니까? 버튼을 누르면 한번 더 물어봅니다.",
        btns: {
          Y: {label: "예"},
          N: {label: "아니오"}
        }
      }, function (res) {
        console.log(res);
      });

      dialog.confirm({
        title: "예/아니오",
        msg: "당신은 개발자 입니까?",
        btns: {
          K: {label: "예"},
          S: {label: "아니오"}
        }
      }, function (res) {
        console.log(res);
      });
    },
  };

  if (btn in processor) {
    processor[btn]();
  }
});

