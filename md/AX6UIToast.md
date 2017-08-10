<a name="AX6UIToast"></a>

## AX6UIToast
**Kind**: global class  

* [AX6UIToast](#AX6UIToast)
    * [new AX6UIToast(config)](#new_AX6UIToast_new)
    * [.config](#AX6UIToast+config) : <code>JSON</code>
    * [.init()](#AX6UIToast+init)
    * [.initOnce()](#AX6UIToast+initOnce)
    * [.push(opts, callback)](#AX6UIToast+push) ⇒ <code>[AX6UIToast](#AX6UIToast)</code>
    * [.confirm(opts, callback)](#AX6UIToast+confirm) ⇒ <code>[AX6UIToast](#AX6UIToast)</code>
    * [.close()](#AX6UIToast+close) ⇒ <code>[AX6UIToast](#AX6UIToast)</code>

<a name="new_AX6UIToast_new"></a>

### new AX6UIToast(config)

| Param |
| --- |
| config | 

<a name="AX6UIToast+config"></a>

### aX6UIToast.config : <code>JSON</code>
**Kind**: instance property of <code>[AX6UIToast](#AX6UIToast)</code>  

| Param | Default |
| --- | --- |
| config |  | 
| [config.theme] | <code>&#x27;default&#x27;</code> | 
| [config.width] | <code>300</code> | 
| [config.icon] | <code>&#x27;&#x27;</code> | 
| [config.closeIcon] | <code>&#x27;&#x27;</code> | 
| [config.msg] | <code>&#x27;&#x27;</code> | 
| [config.lang] |  | 
| [config.lang.ok] | <code>&#x27;ok&#x27;</code> | 
| [config.lang.cancel] | <code>&#x27;cancel&#x27;</code> | 
| [config.displayTime] | <code>3000</code> | 
| [config.animateTime] | <code>250</code> | 
| [config.containerPosition] | <code>&#x27;bottom-left&#x27;</code> | 

<a name="AX6UIToast+init"></a>

### aX6UIToast.init()
**Kind**: instance method of <code>[AX6UIToast](#AX6UIToast)</code>  
<a name="AX6UIToast+initOnce"></a>

### aX6UIToast.initOnce()
**Kind**: instance method of <code>[AX6UIToast](#AX6UIToast)</code>  
<a name="AX6UIToast+push"></a>

### aX6UIToast.push(opts, callback) ⇒ <code>[AX6UIToast](#AX6UIToast)</code>
**Kind**: instance method of <code>[AX6UIToast](#AX6UIToast)</code>  

| Param |
| --- |
| opts | 
| callback | 

**Example**  
```js
import {AX6UIToast as Toast} from "ax6ui";

let toast = new Toast({
 containerPosition: "bottom-right"
});

toast.push("toast messages");
```
<a name="AX6UIToast+confirm"></a>

### aX6UIToast.confirm(opts, callback) ⇒ <code>[AX6UIToast](#AX6UIToast)</code>
**Kind**: instance method of <code>[AX6UIToast](#AX6UIToast)</code>  

| Param |
| --- |
| opts | 
| callback | 

**Example**  
```js
import {AX6UIToast as Toast} from "ax6ui";

let toast = new Toast({
 containerPosition: "bottom-right"
});

toast.confirm({
 title: "예/아니오",
 msg: "당신은 개발자 입니까?",
 btns: {
     Y: {label: "예"},
     N: {label: "아니오"}
 }
}, function(res){
 console.log(res);
});
```
<a name="AX6UIToast+close"></a>

### aX6UIToast.close() ⇒ <code>[AX6UIToast](#AX6UIToast)</code>
close the toast

**Kind**: instance method of <code>[AX6UIToast](#AX6UIToast)</code>  
**Example**  
```
toast.close();
```
