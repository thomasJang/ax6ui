## Classes

<dl>
<dt><a href="#AX6UIPicker">AX6UIPicker</a></dt>
<dd></dd>
</dl>

## Members

<dl>
<dt><a href="#tmpl">tmpl</a></dt>
<dd><p><del>~</del><del>~</del><del>~</del><del>~ end of import  ~</del><del>~</del><del>~</del><del>~</del>~~</p>
</dd>
</dl>

<a name="AX6UIPicker"></a>

## AX6UIPicker
**Kind**: global class  

* [AX6UIPicker](#AX6UIPicker)
    * [new AX6UIPicker(config)](#new_AX6UIPicker_new)
    * [.config](#AX6UIPicker+config) : <code>JSON</code>
    * [.queue](#AX6UIPicker+queue) : <code>Array</code>
    * [.activePicker](#AX6UIPicker+activePicker) : <code>Object</code>
    * [.activePickerQueueIndex](#AX6UIPicker+activePickerQueueIndex) : <code>Number</code>
    * [.openTimer](#AX6UIPicker+openTimer) : <code>Object</code>
    * [.closeTimer](#AX6UIPicker+closeTimer) : <code>Object</code>
    * [.init(config)](#AX6UIPicker+init)
    * [.initOnce()](#AX6UIPicker+initOnce)
    * [.bind(item)](#AX6UIPicker+bind) ⇒ <code>[AX6UIPicker](#AX6UIPicker)</code>
    * [.setContentValue(boundID, inputIndex, val, _option)](#AX6UIPicker+setContentValue) ⇒ <code>[AX6UIPicker](#AX6UIPicker)</code>
    * [.getContentValue(boundID, inputIndex)](#AX6UIPicker+getContentValue) ⇒ <code>\*</code>
    * [.open(boundID, tryCount)](#AX6UIPicker+open) ⇒ <code>[AX6UIPicker](#AX6UIPicker)</code>
    * [.close(item, state)](#AX6UIPicker+close) ⇒ <code>[AX6UIPicker](#AX6UIPicker)</code>

<a name="new_AX6UIPicker_new"></a>

### new AX6UIPicker(config)

| Param |
| --- |
| config | 
| [config.theme] | 
| [config.target] | 
| [config.animateTime] | 
| [config.onStateChanged] | 
| [config.onClick] | 
| [config.content] | 

<a name="AX6UIPicker+config"></a>

### aX6UIPicker.config : <code>JSON</code>
**Kind**: instance property of <code>[AX6UIPicker](#AX6UIPicker)</code>  

| Param | Default |
| --- | --- |
| config |  | 
| [config.theme] | <code>default</code> | 
| config.target |  | 
| [config.animateTime] | <code>100</code> | 
| [config.calendar] |  | 
| [config.calendar.multipleSelect] | <code>false</code> | 
| [config.calendar.control] |  | 
| [config.calendar.control.left] | <code>&#x27;&amp;#x02190&#x27;</code> | 
| [config.calendar.control.yearTmpl] | <code>&#x27;%s&#x27;</code> | 
| [config.calendar.control.monthTmpl] | <code>&#x27;%s&#x27;</code> | 
| [config.calendar.control.right] | <code>&#x27;&amp;#x02192&#x27;</code> | 
| [config.calendar.control.yearFirst] | <code>true</code> | 
| [config.palette=] |  | 
| [config.formatter=] |  | 
| [config.onStateChanged] |  | 
| [config.onClick] |  | 

<a name="AX6UIPicker+queue"></a>

### aX6UIPicker.queue : <code>Array</code>
**Kind**: instance property of <code>[AX6UIPicker](#AX6UIPicker)</code>  
<a name="AX6UIPicker+activePicker"></a>

### aX6UIPicker.activePicker : <code>Object</code>
**Kind**: instance property of <code>[AX6UIPicker](#AX6UIPicker)</code>  
<a name="AX6UIPicker+activePickerQueueIndex"></a>

### aX6UIPicker.activePickerQueueIndex : <code>Number</code>
**Kind**: instance property of <code>[AX6UIPicker](#AX6UIPicker)</code>  
<a name="AX6UIPicker+openTimer"></a>

### aX6UIPicker.openTimer : <code>Object</code>
**Kind**: instance property of <code>[AX6UIPicker](#AX6UIPicker)</code>  
<a name="AX6UIPicker+closeTimer"></a>

### aX6UIPicker.closeTimer : <code>Object</code>
**Kind**: instance property of <code>[AX6UIPicker](#AX6UIPicker)</code>  
<a name="AX6UIPicker+init"></a>

### aX6UIPicker.init(config)
**Kind**: instance method of <code>[AX6UIPicker](#AX6UIPicker)</code>  

| Param |
| --- |
| config | 
| [config.theme] | 
| [config.target] | 
| [config.animateTime] | 
| [config.onStateChanged] | 
| [config.onClick] | 
| [config.content] | 

<a name="AX6UIPicker+initOnce"></a>

### aX6UIPicker.initOnce()
**Kind**: instance method of <code>[AX6UIPicker](#AX6UIPicker)</code>  
<a name="AX6UIPicker+bind"></a>

### aX6UIPicker.bind(item) ⇒ <code>[AX6UIPicker](#AX6UIPicker)</code>
**Kind**: instance method of <code>[AX6UIPicker](#AX6UIPicker)</code>  

| Param | Type | Description |
| --- | --- | --- |
| item |  |  |
| item.target | <code>Element</code> |  |
| item.direction | <code>String</code> | top|left|right|bottom|auto |
| item.contentWidth | <code>Number</code> |  |
| item.disableChangeTrigger | <code>Boolean</code> |  |
| item.onStateChanged | <code>function</code> |  |
| item.btns | <code>Object</code> |  |
| item.content | <code>Object</code> |  |
| item.content.width | <code>Number</code> |  |
| item.content.margin | <code>Number</code> |  |
| item.content.type | <code>String</code> |  |
| item.content.config | <code>Object</code> | binded UI config |
| item.content.formatter | <code>Object</code> |  |
| item.content.formatter.pattern | <code>String</code> |  |

**Example**  
```js
import $ from "jqmin";
import Picker from "../../src/AX6UIPicker";

let picker = new Picker();
picker.bind({
    target: $("#color-0"),
    direction: "auto",
    content: {
        width: 250,
        margin: 10,
        type: 'color',
        config: {

        }
    },
    onStateChanged: function () {

    }
});
```
<a name="AX6UIPicker+setContentValue"></a>

### aX6UIPicker.setContentValue(boundID, inputIndex, val, _option) ⇒ <code>[AX6UIPicker](#AX6UIPicker)</code>
**Kind**: instance method of <code>[AX6UIPicker](#AX6UIPicker)</code>  

| Param |
| --- |
| boundID | 
| inputIndex | 
| val | 
| _option | 

<a name="AX6UIPicker+getContentValue"></a>

### aX6UIPicker.getContentValue(boundID, inputIndex) ⇒ <code>\*</code>
**Kind**: instance method of <code>[AX6UIPicker](#AX6UIPicker)</code>  

| Param |
| --- |
| boundID | 
| inputIndex | 

<a name="AX6UIPicker+open"></a>

### aX6UIPicker.open(boundID, tryCount) ⇒ <code>[AX6UIPicker](#AX6UIPicker)</code>
**Kind**: instance method of <code>[AX6UIPicker](#AX6UIPicker)</code>  

| Param |
| --- |
| boundID | 
| tryCount | 

<a name="AX6UIPicker+close"></a>

### aX6UIPicker.close(item, state) ⇒ <code>[AX6UIPicker](#AX6UIPicker)</code>
**Kind**: instance method of <code>[AX6UIPicker](#AX6UIPicker)</code>  

| Param |
| --- |
| item | 
| state | 

<a name="tmpl"></a>

## tmpl
~~~~~~~~~~~~~~~~~~ end of import  ~~~~~~~~~~~~~~~~~~~~

**Kind**: global variable  
