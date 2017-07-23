import $ from "jqmin";
import Dialog from "../../src/AX6UIDialog";
import "./custom-materialize.scss";

const $body = $("#sample-body");
let el = `
<a class="waves-effect waves-light btn" data-btn="alert">alert</a>
<a class="waves-effect waves-light btn" data-btn="confirm">confirm</a>
<a class="waves-effect waves-light btn" data-btn="prompt">prompt</a>
`;
$body.append(el);


/////~~~~~~~~~~~~~~~~~~

let dialog = new Dialog();
dialog.setConfig({});

$body.on("click", '[data-btn]', (e) => {
    let btn = e.currentTarget.getAttribute("data-btn");
    let processor = {
        alert() {
            let $btn = jQuery('<a class="waves-effect waves-light btn red">alert close & open</a>');
            $btn.on("click", function () {
                dialog.close({callback: function (res) {
                    console.log("dialog closed");
                    dialog.alert({

                    });
                }});
            });

            dialog.alert({
                msg: "alert test",
                onStateChanged: function (res) {
                    if (res.state == "open") {
                        $body.append($btn);
                    }
                    if (res.state == "close") {
                        $btn.remove();
                    }
                }
            });


        },
        confirm() {
            /*
            dialog.confirm({
                title: "확인",
                msg: "확인 또는 취소를 누르세요"
            }, function (res) {
                //console.log(this, a, b);
                console.log(res);
                if(res.key == "ok"){
                    console.log("OK");
                }
                else if(res.key == "cancel"){
                    console.log("CANCEL");
                }
            });
            */

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
        }
    };

    if (btn in processor) {
        processor[btn]();
    }
});

