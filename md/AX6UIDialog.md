<a name="AX6UIDialog"></a>

## AX6UIDialog
**Kind**: global class  

* [AX6UIDialog](#AX6UIDialog)
    * [new AX6UIDialog(config)](#new_AX6UIDialog_new)
    * [.config](#AX6UIDialog+config) : <code>JSON</code>
    * [.queue](#AX6UIDialog+queue) : <code>Array</code>
    * [.$activeDialog](#AX6UIDialog+$activeDialog) : <code>jQueryElement</code>
    * [.autoCloseTimer](#AX6UIDialog+autoCloseTimer) : <code>Object</code>
    * [.init(config)](#AX6UIDialog+init)
    * [.initOnce()](#AX6UIDialog+initOnce)
    * [.alert(opts, callback, tryCount)](#AX6UIDialog+alert) ⇒ <code>[AX6UIDialog](#AX6UIDialog)</code>
    * [.confirm(opts, callback, tryCount)](#AX6UIDialog+confirm) ⇒ <code>[AX6UIDialog](#AX6UIDialog)</code>
    * [.prompt(opts, callback, tryCount)](#AX6UIDialog+prompt) ⇒ <code>[AX6UIDialog](#AX6UIDialog)</code>
    * [.close(_option)](#AX6UIDialog+close) ⇒ <code>[AX6UIDialog](#AX6UIDialog)</code>

<a name="new_AX6UIDialog_new"></a>

### new AX6UIDialog(config)

| Param |
| --- |
| config | 

<a name="AX6UIDialog+config"></a>

### aX6UIDialog.config : <code>JSON</code>
**Kind**: instance property of <code>[AX6UIDialog](#AX6UIDialog)</code>  

| Param | Default |
| --- | --- |
| config |  | 
| [config.theme] | <code>&#x27;default&#x27;</code> | 
| [config.width] | <code>300</code> | 
| [config.title] | <code>&#x27;&#x27;</code> | 
| [config.msg] | <code>&#x27;&#x27;</code> | 
| [config.lang] |  | 
| [config.lang.ok] | <code>&#x27;ok&#x27;</code> | 
| [config.lang.cancel] | <code>&#x27;cancel&#x27;</code> | 
| [config.animateTime] | <code>150</code> | 
| [config.autoCloseTime] | <code>0</code> | 
| [config.onStateChanged] |  | 

<a name="AX6UIDialog+queue"></a>

### aX6UIDialog.queue : <code>Array</code>
dialog가 열려있는 상태에서 다시 open이 되면 queue에 보관 하였다가 close후 open

**Kind**: instance property of <code>[AX6UIDialog](#AX6UIDialog)</code>  
<a name="AX6UIDialog+$activeDialog"></a>

### aX6UIDialog.$activeDialog : <code>jQueryElement</code>
**Kind**: instance property of <code>[AX6UIDialog](#AX6UIDialog)</code>  
<a name="AX6UIDialog+autoCloseTimer"></a>

### aX6UIDialog.autoCloseTimer : <code>Object</code>
**Kind**: instance property of <code>[AX6UIDialog](#AX6UIDialog)</code>  
<a name="AX6UIDialog+init"></a>

### aX6UIDialog.init(config)
**Kind**: instance method of <code>[AX6UIDialog](#AX6UIDialog)</code>  

| Param |
| --- |
| config | 

<a name="AX6UIDialog+initOnce"></a>

### aX6UIDialog.initOnce()
**Kind**: instance method of <code>[AX6UIDialog](#AX6UIDialog)</code>  
<a name="AX6UIDialog+alert"></a>

### aX6UIDialog.alert(opts, callback, tryCount) ⇒ <code>[AX6UIDialog](#AX6UIDialog)</code>
**Kind**: instance method of <code>[AX6UIDialog](#AX6UIDialog)</code>  

| Param |
| --- |
| opts | 
| callback | 
| tryCount | 

**Example**  
```js
import {Dialog} from "ax6ui"

const dialog = new Dialog();
dialog.alert("Alert Message");
dialog.alert({
    title: "Title",
    msg: "Alert Message"
});
```
<a name="AX6UIDialog+confirm"></a>

### aX6UIDialog.confirm(opts, callback, tryCount) ⇒ <code>[AX6UIDialog](#AX6UIDialog)</code>
**Kind**: instance method of <code>[AX6UIDialog](#AX6UIDialog)</code>  

| Param |
| --- |
| opts | 
| callback | 
| tryCount | 

**Example**  
```js
import {Dialog} from "ax6ui"

const dialog = new Dialog();
dialog.confirm({
    title: "확인",
    msg: "확인 또는 취소를 누르세요"
}, function (res) {
    //console.log(this, a, b);
    if(res.key == "ok"){
        console.log("OK");
    }
    else if(res.key == "cancel"){
        console.log("CANCEL");
    }
});

// btns custom
dialog.config({
 title: "예/아니오",
 msg: "당신은 개발자 입니까?",
 btns: {
     Y: {label: "예"},
     N: {label: "아니오"}
 }
}, function (res) {
     console.log(res);
});
```
<a name="AX6UIDialog+prompt"></a>

### aX6UIDialog.prompt(opts, callback, tryCount) ⇒ <code>[AX6UIDialog](#AX6UIDialog)</code>
**Kind**: instance method of <code>[AX6UIDialog](#AX6UIDialog)</code>  

| Param |
| --- |
| opts | 
| callback | 
| tryCount | 

**Example**  
```js
import {Dialog} from "ax6ui"

const dialog = new Dialog();

dialog.prompt({
 title: "prompt",
 msg: '다음의 값을 입력하세요.',
 input: {
     data1: {label: "data1의 라벨", type: "password"},
     data2: {label: "data2의 라벨"}
 }
}, function(res){
     console.log(res);
});
```
<a name="AX6UIDialog+close"></a>

### aX6UIDialog.close(_option) ⇒ <code>[AX6UIDialog](#AX6UIDialog)</code>
**Kind**: instance method of <code>[AX6UIDialog](#AX6UIDialog)</code>  

| Param |
| --- |
| _option | 

**Example**  
```js
dialog.close();
dialog.close({callback: function(){

});
```
