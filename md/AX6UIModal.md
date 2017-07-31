<a name="AX6UIModal"></a>

## AX6UIModal
**Kind**: global class  

* [AX6UIModal](#AX6UIModal)
    * [new AX6UIModal(config)](#new_AX6UIModal_new)
    * [.config](#AX6UIModal+config) : <code>JSON</code>
    * [.queue](#AX6UIModal+queue) : <code>Array</code>
    * [.$activeModal](#AX6UIModal+$activeModal) : <code>jQueryElement</code>
    * [.init()](#AX6UIModal+init)
    * [.initOnce()](#AX6UIModal+initOnce)
    * [.open()](#AX6UIModal+open) ⇒ [<code>AX6UIModal</code>](#AX6UIModal)
    * [.close(_option)](#AX6UIModal+close) ⇒ [<code>AX6UIModal</code>](#AX6UIModal)
    * [.minimize()](#AX6UIModal+minimize) ⇒ [<code>AX6UIModal</code>](#AX6UIModal)
    * [.setModalConfig(_config)](#AX6UIModal+setModalConfig) ⇒ [<code>AX6UIModal</code>](#AX6UIModal)

<a name="new_AX6UIModal_new"></a>

### new AX6UIModal(config)

| Param |
| --- |
| config | 

<a name="AX6UIModal+config"></a>

### aX6UIModal.config : <code>JSON</code>
**Kind**: instance property of [<code>AX6UIModal</code>](#AX6UIModal)  

| Param | Default |
| --- | --- |
| config |  | 
| [config.id] | <code>&#x27;ax6ui-modal-&#x27; + this.instanceId</code> | 
| [config.position] |  | 
| [config.position.left] | <code>&#x27;cener&#x27;</code> | 
| [config.position.top] | <code>&#x27;middle&#x27;</code> | 
| [config.position.margin] | <code>10</code> | 
| [config.minimizePosition] | <code>&#x27;bottom-right&#x27;</code> | 
| [config.clickEventName] |  | 
| [config.theme] |  | 
| [config.width] | <code>300</code> | 
| [config.height] | <code>400</code> | 
| [config.closeToEsc] |  | 
| [config.disableDrag] |  | 
| [config.disableResize] |  | 
| [config.animateTime] | <code>250</code> | 
| [config.iframe] | <code>false</code> | 

<a name="AX6UIModal+queue"></a>

### aX6UIModal.queue : <code>Array</code>
열려있는 상태에서 다시 open이 되면 queue에 보관 하였다가 close후 open

**Kind**: instance property of [<code>AX6UIModal</code>](#AX6UIModal)  
<a name="AX6UIModal+$activeModal"></a>

### aX6UIModal.$activeModal : <code>jQueryElement</code>
**Kind**: instance property of [<code>AX6UIModal</code>](#AX6UIModal)  
<a name="AX6UIModal+init"></a>

### aX6UIModal.init()
**Kind**: instance method of [<code>AX6UIModal</code>](#AX6UIModal)  
<a name="AX6UIModal+initOnce"></a>

### aX6UIModal.initOnce()
**Kind**: instance method of [<code>AX6UIModal</code>](#AX6UIModal)  
<a name="AX6UIModal+open"></a>

### aX6UIModal.open() ⇒ [<code>AX6UIModal</code>](#AX6UIModal)
open the modal

**Kind**: instance method of [<code>AX6UIModal</code>](#AX6UIModal)  
**Example**  
```
modal.open();
modal.open({
 width: 500,
 height: 500
});
moaal.open({}, function(){
 console.log(this);
});
```
<a name="AX6UIModal+close"></a>

### aX6UIModal.close(_option) ⇒ [<code>AX6UIModal</code>](#AX6UIModal)
close the modal

**Kind**: instance method of [<code>AX6UIModal</code>](#AX6UIModal)  

| Param |
| --- |
| _option | 

**Example**  
```
modal.close();
modal.close({callback: function(){
 // on close event
});
// close 함수에 callback을 전달하면 정확한 close 타이밍을 캐치할 수 있습니다
```
<a name="AX6UIModal+minimize"></a>

### aX6UIModal.minimize() ⇒ [<code>AX6UIModal</code>](#AX6UIModal)
**Kind**: instance method of [<code>AX6UIModal</code>](#AX6UIModal)  
<a name="AX6UIModal+setModalConfig"></a>

### aX6UIModal.setModalConfig(_config) ⇒ [<code>AX6UIModal</code>](#AX6UIModal)
**Kind**: instance method of [<code>AX6UIModal</code>](#AX6UIModal)  

| Param |
| --- |
| _config | 

