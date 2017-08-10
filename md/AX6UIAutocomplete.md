<a name="AX6UIAutocomplete"></a>

## AX6UIAutocomplete
**Kind**: global class  

* [AX6UIAutocomplete](#AX6UIAutocomplete)
    * [new AX6UIAutocomplete(config)](#new_AX6UIAutocomplete_new)
    * [.config](#AX6UIAutocomplete+config) : <code>JSON</code>
    * [.queue](#AX6UIAutocomplete+queue) : <code>Array</code>
    * [.activeautocompleteOptionGroup](#AX6UIAutocomplete+activeautocompleteOptionGroup) : <code>Object</code>
    * [.activeautocompleteQueueIndex](#AX6UIAutocomplete+activeautocompleteQueueIndex) : <code>Number</code>
    * [.openTimer](#AX6UIAutocomplete+openTimer) : <code>Object</code>
    * [.closeTimer](#AX6UIAutocomplete+closeTimer) : <code>Object</code>
    * [.waitOptionsCallback](#AX6UIAutocomplete+waitOptionsCallback) : <code>function</code>
    * [.keyUpTimer](#AX6UIAutocomplete+keyUpTimer) : <code>Object</code>
    * [.xvar](#AX6UIAutocomplete+xvar) : <code>Object</code>
    * [.init(config)](#AX6UIAutocomplete+init)
    * [.initOnce()](#AX6UIAutocomplete+initOnce)
    * [.bind(item)](#AX6UIAutocomplete+bind) ⇒ <code>[AX6UIAutocomplete](#AX6UIAutocomplete)</code>
    * [.open(boundID, [tryCount])](#AX6UIAutocomplete+open) ⇒ <code>[AX6UIAutocomplete](#AX6UIAutocomplete)</code>
    * [.setValue(_boundID, _value)](#AX6UIAutocomplete+setValue) ⇒ <code>[AX6UIAutocomplete](#AX6UIAutocomplete)</code>
    * [.setText(_boundID, _text)](#AX6UIAutocomplete+setText) ⇒ <code>[AX6UIAutocomplete](#AX6UIAutocomplete)</code>
    * [.getSelectedOption(_boundID)](#AX6UIAutocomplete+getSelectedOption) ⇒ <code>Array</code>
    * [.close()](#AX6UIAutocomplete+close) ⇒ <code>[AX6UIAutocomplete](#AX6UIAutocomplete)</code>
    * [.blur(_boundID)](#AX6UIAutocomplete+blur) ⇒ <code>[AX6UIAutocomplete](#AX6UIAutocomplete)</code>
    * [.enable(_boundID)](#AX6UIAutocomplete+enable) ⇒ <code>[AX6UIAutocomplete](#AX6UIAutocomplete)</code>
    * [.disable(_boundID)](#AX6UIAutocomplete+disable) ⇒ <code>[AX6UIAutocomplete](#AX6UIAutocomplete)</code>
    * [.align()](#AX6UIAutocomplete+align) ⇒ <code>[AX6UIAutocomplete](#AX6UIAutocomplete)</code>

<a name="new_AX6UIAutocomplete_new"></a>

### new AX6UIAutocomplete(config)

| Param |
| --- |
| config | 

<a name="AX6UIAutocomplete+config"></a>

### aX6UIAutocomplete.config : <code>JSON</code>
**Kind**: instance property of <code>[AX6UIAutocomplete](#AX6UIAutocomplete)</code>  

| Param | Default | Description |
| --- | --- | --- |
| config |  |  |
| [config.theme] | <code>&#x27;default&#x27;</code> |  |
| [config.animateTime] | <code>250</code> |  |
| [config.height] | <code>34</code> |  |
| [config.lang] |  | 메세지들 |
| [config.lang.noSelected] | <code>&#x27;&#x27;</code> |  |
| [config.lang.noOptions] | <code>&#x27;no options&#x27;</code> |  |
| [config.lang.loading] | <code>&#x27;now loading..&#x27;</code> |  |
| [config.columnKeys] |  | 내부에서 사용 JSON key 정의 |
| [config.columnKeys.optionValue] | <code>&#x27;value&#x27;</code> |  |
| [config.columnKeys.optionText] | <code>&#x27;text&#x27;</code> |  |
| [config.columnKeys.optionSelected] | <code>&#x27;selected&#x27;</code> |  |

<a name="AX6UIAutocomplete+queue"></a>

### aX6UIAutocomplete.queue : <code>Array</code>
bind를 통해 연결된 select가 저장되는 변수

**Kind**: instance property of <code>[AX6UIAutocomplete](#AX6UIAutocomplete)</code>  
<a name="AX6UIAutocomplete+activeautocompleteOptionGroup"></a>

### aX6UIAutocomplete.activeautocompleteOptionGroup : <code>Object</code>
**Kind**: instance property of <code>[AX6UIAutocomplete](#AX6UIAutocomplete)</code>  
<a name="AX6UIAutocomplete+activeautocompleteQueueIndex"></a>

### aX6UIAutocomplete.activeautocompleteQueueIndex : <code>Number</code>
**Kind**: instance property of <code>[AX6UIAutocomplete](#AX6UIAutocomplete)</code>  
<a name="AX6UIAutocomplete+openTimer"></a>

### aX6UIAutocomplete.openTimer : <code>Object</code>
**Kind**: instance property of <code>[AX6UIAutocomplete](#AX6UIAutocomplete)</code>  
<a name="AX6UIAutocomplete+closeTimer"></a>

### aX6UIAutocomplete.closeTimer : <code>Object</code>
**Kind**: instance property of <code>[AX6UIAutocomplete](#AX6UIAutocomplete)</code>  
<a name="AX6UIAutocomplete+waitOptionsCallback"></a>

### aX6UIAutocomplete.waitOptionsCallback : <code>function</code>
**Kind**: instance property of <code>[AX6UIAutocomplete](#AX6UIAutocomplete)</code>  
<a name="AX6UIAutocomplete+keyUpTimer"></a>

### aX6UIAutocomplete.keyUpTimer : <code>Object</code>
**Kind**: instance property of <code>[AX6UIAutocomplete](#AX6UIAutocomplete)</code>  
<a name="AX6UIAutocomplete+xvar"></a>

### aX6UIAutocomplete.xvar : <code>Object</code>
**Kind**: instance property of <code>[AX6UIAutocomplete](#AX6UIAutocomplete)</code>  
<a name="AX6UIAutocomplete+init"></a>

### aX6UIAutocomplete.init(config)
**Kind**: instance method of <code>[AX6UIAutocomplete](#AX6UIAutocomplete)</code>  

| Param |
| --- |
| config | 

<a name="AX6UIAutocomplete+initOnce"></a>

### aX6UIAutocomplete.initOnce()
**Kind**: instance method of <code>[AX6UIAutocomplete](#AX6UIAutocomplete)</code>  
<a name="AX6UIAutocomplete+bind"></a>

### aX6UIAutocomplete.bind(item) ⇒ <code>[AX6UIAutocomplete](#AX6UIAutocomplete)</code>
bind autocomplete

**Kind**: instance method of <code>[AX6UIAutocomplete](#AX6UIAutocomplete)</code>  

| Param | Type |
| --- | --- |
| item | <code>Object</code> | 
| [item.id] | <code>String</code> | 
| [item.theme] | <code>String</code> | 
| [item.multiple] | <code>Boolean</code> | 
| item.target | <code>Element</code> | 

<a name="AX6UIAutocomplete+open"></a>

### aX6UIAutocomplete.open(boundID, [tryCount]) ⇒ <code>[AX6UIAutocomplete](#AX6UIAutocomplete)</code>
open the optionBox of autocomplete

**Kind**: instance method of <code>[AX6UIAutocomplete](#AX6UIAutocomplete)</code>  

| Param | Type |
| --- | --- |
| boundID | <code>String</code> &#124; <code>Number</code> &#124; <code>Element</code> | 
| [tryCount] | <code>Number</code> | 

<a name="AX6UIAutocomplete+setValue"></a>

### aX6UIAutocomplete.setValue(_boundID, _value) ⇒ <code>[AX6UIAutocomplete](#AX6UIAutocomplete)</code>
**Kind**: instance method of <code>[AX6UIAutocomplete](#AX6UIAutocomplete)</code>  

| Param | Type |
| --- | --- |
| _boundID | <code>jQueryObject</code> &#124; <code>Element</code> &#124; <code>Number</code> | 
| _value | <code>String</code> &#124; <code>Array</code> | 

**Example**  
```js
myAutocomplete.setValue($('[data-ax6ui-autocomplete="autocomplete1"]'), {value:"test", text:"test"});
myAutocomplete.setValue($('[data-ax6ui-autocomplete="autocomplete1"]'), [{value:"test1", text:"test1"}, {value:"test2", text:"test2"}]);
myAutocomplete.setValue($('[data-ax6ui-autocomplete="autocomplete1"]'), null);
```
<a name="AX6UIAutocomplete+setText"></a>

### aX6UIAutocomplete.setText(_boundID, _text) ⇒ <code>[AX6UIAutocomplete](#AX6UIAutocomplete)</code>
**Kind**: instance method of <code>[AX6UIAutocomplete](#AX6UIAutocomplete)</code>  

| Param | Type |
| --- | --- |
| _boundID | <code>jQueryObject</code> &#124; <code>Element</code> &#124; <code>Number</code> | 
| _text | <code>String</code> &#124; <code>Array</code> | 

**Example**  
```js
myAutocomplete.setText($('[data-ax6ui-autocomplete="autocomplete1"]'), "string");
myAutocomplete.setText($('[data-ax6ui-autocomplete="autocomplete1"]'), ["substring", "search"]);
```
<a name="AX6UIAutocomplete+getSelectedOption"></a>

### aX6UIAutocomplete.getSelectedOption(_boundID) ⇒ <code>Array</code>
**Kind**: instance method of <code>[AX6UIAutocomplete](#AX6UIAutocomplete)</code>  

| Param | Type |
| --- | --- |
| _boundID | <code>jQueryObject</code> &#124; <code>Element</code> &#124; <code>Number</code> | 

<a name="AX6UIAutocomplete+close"></a>

### aX6UIAutocomplete.close() ⇒ <code>[AX6UIAutocomplete](#AX6UIAutocomplete)</code>
**Kind**: instance method of <code>[AX6UIAutocomplete](#AX6UIAutocomplete)</code>  
<a name="AX6UIAutocomplete+blur"></a>

### aX6UIAutocomplete.blur(_boundID) ⇒ <code>[AX6UIAutocomplete](#AX6UIAutocomplete)</code>
**Kind**: instance method of <code>[AX6UIAutocomplete](#AX6UIAutocomplete)</code>  

| Param | Type |
| --- | --- |
| _boundID | <code>jQueryObject</code> &#124; <code>Element</code> &#124; <code>Number</code> | 

<a name="AX6UIAutocomplete+enable"></a>

### aX6UIAutocomplete.enable(_boundID) ⇒ <code>[AX6UIAutocomplete](#AX6UIAutocomplete)</code>
**Kind**: instance method of <code>[AX6UIAutocomplete](#AX6UIAutocomplete)</code>  

| Param | Type |
| --- | --- |
| _boundID | <code>jQueryObject</code> &#124; <code>Element</code> &#124; <code>Number</code> | 

<a name="AX6UIAutocomplete+disable"></a>

### aX6UIAutocomplete.disable(_boundID) ⇒ <code>[AX6UIAutocomplete](#AX6UIAutocomplete)</code>
**Kind**: instance method of <code>[AX6UIAutocomplete](#AX6UIAutocomplete)</code>  

| Param | Type |
| --- | --- |
| _boundID | <code>jQueryObject</code> &#124; <code>Element</code> &#124; <code>Number</code> | 

<a name="AX6UIAutocomplete+align"></a>

### aX6UIAutocomplete.align() ⇒ <code>[AX6UIAutocomplete](#AX6UIAutocomplete)</code>
**Kind**: instance method of <code>[AX6UIAutocomplete](#AX6UIAutocomplete)</code>  
