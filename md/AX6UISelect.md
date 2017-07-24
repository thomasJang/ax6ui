<a name="AX6UISelect"></a>

## AX6UISelect
**Kind**: global class  

* [AX6UISelect](#AX6UISelect)
    * [new AX6UISelect(config)](#new_AX6UISelect_new)
    * [.config](#AX6UISelect+config) : <code>JSON</code>
    * [.queue](#AX6UISelect+queue) : <code>Array</code>
    * [.activeSelectOptionGroup](#AX6UISelect+activeSelectOptionGroup) : <code>Object</code>
    * [.activeSelectQueueIndex](#AX6UISelect+activeSelectQueueIndex) : <code>Number</code>
    * [.openTimer](#AX6UISelect+openTimer) : <code>Object</code>
    * [.closeTimer](#AX6UISelect+closeTimer) : <code>Object</code>
    * [.waitOptionsCallback](#AX6UISelect+waitOptionsCallback) : <code>function</code>
    * [.keyUpTimer](#AX6UISelect+keyUpTimer) : <code>Object</code>
    * [.xvar](#AX6UISelect+xvar) : <code>Object</code>
    * [.init(config)](#AX6UISelect+init)
    * [.initOnce()](#AX6UISelect+initOnce) ⇒ <code>AX6UIMask</code>
    * [.bind(item)](#AX6UISelect+bind) ⇒ <code>[AX6UISelect](#AX6UISelect)</code>
    * [.open(boundID, tryCount)](#AX6UISelect+open) ⇒ <code>[AX6UISelect](#AX6UISelect)</code>
    * [.update(_item)](#AX6UISelect+update) ⇒ <code>[AX6UISelect](#AX6UISelect)</code>
    * [.setOptions(boundID, options)](#AX6UISelect+setOptions) ⇒ <code>[AX6UISelect](#AX6UISelect)</code>
    * [.val(boundID, value, selected, internal)](#AX6UISelect+val) ⇒ <code>\*</code>
    * [.close(item)](#AX6UISelect+close) ⇒ <code>[AX6UISelect](#AX6UISelect)</code>
    * [.enable(boundID)](#AX6UISelect+enable) ⇒ <code>[AX6UISelect](#AX6UISelect)</code>
    * [.disable(boundID)](#AX6UISelect+disable) ⇒ <code>[AX6UISelect](#AX6UISelect)</code>

<a name="new_AX6UISelect_new"></a>

### new AX6UISelect(config)

| Param |
| --- |
| config | 

<a name="AX6UISelect+config"></a>

### aX6UISelect.config : <code>JSON</code>
**Kind**: instance property of <code>[AX6UISelect](#AX6UISelect)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| config |  |  |  |
| [config.theme] |  | <code>&#x27;default&#x27;</code> |  |
| [config.animateTime] |  | <code>100</code> |  |
| [config.lang] |  |  | 메세지들 |
| [config.lang.noSelected] |  | <code>&#x27;&#x27;</code> |  |
| [config.lang.noOptions] |  | <code>&#x27;no options&#x27;</code> |  |
| [config.lang.loading] |  | <code>&#x27;now loading..&#x27;</code> |  |
| [config.lang.multipleLabel] | <code>Object</code> | <code>&#x27;&quot;&quot;외 {{length}}건&#x27;</code> |  |
| [config.columnKeys] |  |  | 내부에서 사용 JSON key 정의 |
| [config.columnKeys.optionValue] |  | <code>&#x27;value&#x27;</code> |  |
| [config.columnKeys.optionText] |  | <code>&#x27;text&#x27;</code> |  |
| [config.columnKeys.optionSelected] |  | <code>&#x27;selected&#x27;</code> |  |

<a name="AX6UISelect+queue"></a>

### aX6UISelect.queue : <code>Array</code>
bind를 통해 연결된 select가 저장되는 변수

**Kind**: instance property of <code>[AX6UISelect](#AX6UISelect)</code>  
<a name="AX6UISelect+activeSelectOptionGroup"></a>

### aX6UISelect.activeSelectOptionGroup : <code>Object</code>
**Kind**: instance property of <code>[AX6UISelect](#AX6UISelect)</code>  
<a name="AX6UISelect+activeSelectQueueIndex"></a>

### aX6UISelect.activeSelectQueueIndex : <code>Number</code>
**Kind**: instance property of <code>[AX6UISelect](#AX6UISelect)</code>  
<a name="AX6UISelect+openTimer"></a>

### aX6UISelect.openTimer : <code>Object</code>
**Kind**: instance property of <code>[AX6UISelect](#AX6UISelect)</code>  
<a name="AX6UISelect+closeTimer"></a>

### aX6UISelect.closeTimer : <code>Object</code>
**Kind**: instance property of <code>[AX6UISelect](#AX6UISelect)</code>  
<a name="AX6UISelect+waitOptionsCallback"></a>

### aX6UISelect.waitOptionsCallback : <code>function</code>
**Kind**: instance property of <code>[AX6UISelect](#AX6UISelect)</code>  
<a name="AX6UISelect+keyUpTimer"></a>

### aX6UISelect.keyUpTimer : <code>Object</code>
**Kind**: instance property of <code>[AX6UISelect](#AX6UISelect)</code>  
<a name="AX6UISelect+xvar"></a>

### aX6UISelect.xvar : <code>Object</code>
**Kind**: instance property of <code>[AX6UISelect](#AX6UISelect)</code>  
<a name="AX6UISelect+init"></a>

### aX6UISelect.init(config)
**Kind**: instance method of <code>[AX6UISelect](#AX6UISelect)</code>  

| Param |
| --- |
| config | 

<a name="AX6UISelect+initOnce"></a>

### aX6UISelect.initOnce() ⇒ <code>AX6UIMask</code>
**Kind**: instance method of <code>[AX6UISelect](#AX6UISelect)</code>  
<a name="AX6UISelect+bind"></a>

### aX6UISelect.bind(item) ⇒ <code>[AX6UISelect](#AX6UISelect)</code>
**Kind**: instance method of <code>[AX6UISelect](#AX6UISelect)</code>  

| Param |
| --- |
| item | 

<a name="AX6UISelect+open"></a>

### aX6UISelect.open(boundID, tryCount) ⇒ <code>[AX6UISelect](#AX6UISelect)</code>
**Kind**: instance method of <code>[AX6UISelect](#AX6UISelect)</code>  

| Param |
| --- |
| boundID | 
| tryCount | 

<a name="AX6UISelect+update"></a>

### aX6UISelect.update(_item) ⇒ <code>[AX6UISelect](#AX6UISelect)</code>
**Kind**: instance method of <code>[AX6UISelect](#AX6UISelect)</code>  

| Param |
| --- |
| _item | 

<a name="AX6UISelect+setOptions"></a>

### aX6UISelect.setOptions(boundID, options) ⇒ <code>[AX6UISelect](#AX6UISelect)</code>
**Kind**: instance method of <code>[AX6UISelect](#AX6UISelect)</code>  

| Param |
| --- |
| boundID | 
| options | 

<a name="AX6UISelect+val"></a>

### aX6UISelect.val(boundID, value, selected, internal) ⇒ <code>\*</code>
**Kind**: instance method of <code>[AX6UISelect](#AX6UISelect)</code>  

| Param |
| --- |
| boundID | 
| value | 
| selected | 
| internal | 

<a name="AX6UISelect+close"></a>

### aX6UISelect.close(item) ⇒ <code>[AX6UISelect](#AX6UISelect)</code>
**Kind**: instance method of <code>[AX6UISelect](#AX6UISelect)</code>  

| Param |
| --- |
| item | 

<a name="AX6UISelect+enable"></a>

### aX6UISelect.enable(boundID) ⇒ <code>[AX6UISelect](#AX6UISelect)</code>
**Kind**: instance method of <code>[AX6UISelect](#AX6UISelect)</code>  

| Param |
| --- |
| boundID | 

<a name="AX6UISelect+disable"></a>

### aX6UISelect.disable(boundID) ⇒ <code>[AX6UISelect](#AX6UISelect)</code>
**Kind**: instance method of <code>[AX6UISelect](#AX6UISelect)</code>  

| Param |
| --- |
| boundID | 

