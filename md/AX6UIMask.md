<a name="AX6UIMask"></a>

## AX6UIMask
**Kind**: global class  

* [AX6UIMask](#AX6UIMask)
    * [new AX6UIMask(config)](#new_AX6UIMask_new)
    * [.config](#AX6UIMask+config) : <code>JSON</code>
    * [.maskContent](#AX6UIMask+maskContent) : <code>String</code>
    * [.status](#AX6UIMask+status) : <code>String</code>
    * [.activeConfig](#AX6UIMask+activeConfig) : <code>JSON</code>
    * [.init()](#AX6UIMask+init)
    * [.initOnce()](#AX6UIMask+initOnce)
    * [.open(options)](#AX6UIMask+open) ⇒ <code>[AX6UIMask](#AX6UIMask)</code>
    * [.close(delay)](#AX6UIMask+close) ⇒ <code>[AX6UIMask](#AX6UIMask)</code>
    * [.fadeOut()](#AX6UIMask+fadeOut) ⇒ <code>[AX6UIMask](#AX6UIMask)</code>
    * [.align()](#AX6UIMask+align) ⇒ <code>[AX6UIMask](#AX6UIMask)</code>

<a name="new_AX6UIMask_new"></a>

### new AX6UIMask(config)

| Param |
| --- |
| config | 

<a name="AX6UIMask+config"></a>

### aX6UIMask.config : <code>JSON</code>
**Kind**: instance property of <code>[AX6UIMask](#AX6UIMask)</code>  

| Param | Default |
| --- | --- |
| config |  | 
| [config.theme] |  | 
| [config.target] | <code>document.body</code> | 
| [config.animateTime] | <code>250</code> | 
| [config.onStateChanged] |  | 
| [config.onClick] |  | 
| [config.content] |  | 

<a name="AX6UIMask+maskContent"></a>

### aX6UIMask.maskContent : <code>String</code>
**Kind**: instance property of <code>[AX6UIMask](#AX6UIMask)</code>  
<a name="AX6UIMask+status"></a>

### aX6UIMask.status : <code>String</code>
**Kind**: instance property of <code>[AX6UIMask](#AX6UIMask)</code>  
<a name="AX6UIMask+activeConfig"></a>

### aX6UIMask.activeConfig : <code>JSON</code>
**Kind**: instance property of <code>[AX6UIMask](#AX6UIMask)</code>  
<a name="AX6UIMask+init"></a>

### aX6UIMask.init()
**Kind**: instance method of <code>[AX6UIMask](#AX6UIMask)</code>  
<a name="AX6UIMask+initOnce"></a>

### aX6UIMask.initOnce()
**Kind**: instance method of <code>[AX6UIMask](#AX6UIMask)</code>  
<a name="AX6UIMask+open"></a>

### aX6UIMask.open(options) ⇒ <code>[AX6UIMask](#AX6UIMask)</code>
**Kind**: instance method of <code>[AX6UIMask](#AX6UIMask)</code>  

| Param | Type | Description |
| --- | --- | --- |
| options |  |  |
| [options.zIndex] | <code>number</code> | 마스크 엘리먼트의 z-index 값을 정합니다 |

**Example**  
```js
let myMask = new Mask();
myMask.setConfig({
 zIndex: 1000
});

myMask.open();
```
<a name="AX6UIMask+close"></a>

### aX6UIMask.close(delay) ⇒ <code>[AX6UIMask](#AX6UIMask)</code>
**Kind**: instance method of <code>[AX6UIMask](#AX6UIMask)</code>  

| Param |
| --- |
| delay | 

<a name="AX6UIMask+fadeOut"></a>

### aX6UIMask.fadeOut() ⇒ <code>[AX6UIMask](#AX6UIMask)</code>
**Kind**: instance method of <code>[AX6UIMask](#AX6UIMask)</code>  
<a name="AX6UIMask+align"></a>

### aX6UIMask.align() ⇒ <code>[AX6UIMask](#AX6UIMask)</code>
**Kind**: instance method of <code>[AX6UIMask](#AX6UIMask)</code>  
