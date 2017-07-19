# ax6ui
ES6 Javascript UI Component
ax6ui는 ES6표준 문법 사용이 가능한 JSUI 컴포넌트 입니다. 
모든 샘플소스 제작환경은 webpack을 이용하였습니다. 제대로된 테스트를 위해서는 webpack이 필요합니다.

# Install
```
npm install ax6ui -S
```

# Usage

## AX6UIMask
```js
import $ from "jqmin";
import {AX6UIMask as Mask} from "ax6ui";
// or
// import ax6ui from "ax6ui"; 
import "ax6ui/AX6UIMask/index.scss";

const $body = $("#sample-body");
let el = `
<div id="making-div" style="height:500px;background: #ccc;">making div</div>
<br/>
<a class="waves-effect waves-light btn" data-btn="mask">button</a>
<a class="waves-effect waves-light btn" data-btn="mask-content">button(with content)</a>
<a class="waves-effect waves-light btn" data-btn="mask-div">button(masking)</a>
`;
$body.append(el);


/////~~~~~~~~~~~~~~~~~~

let myMask = new Mask();
// or
// let myMask = new ax6ui.AX6UIMask();

// set config of mask
myMask.setConfig({
    zIndex: 1000,
    onStateChanged: function () {
        console.log(this);
    },
    onClick: function () {
        myMask.fadeOut();
    }
});

$body.on("click", '[data-btn]', function () {
    let btn = this.getAttribute("data-btn");
    let processor = {
        mask(){
            myMask.open();
        },
        "mask-content"(){
            myMask.open({
                content: "MASK CONTENT"
            });
        },
        "mask-div"(){
            myMask.open({
                target: $('#making-div')
            });
        }
    };

    if(btn in processor){
        processor[btn]();
    }
});
```
