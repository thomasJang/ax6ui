<a name="AX6UIMenu"></a>

## AX6UIMenu
**Kind**: global class  

* [AX6UIMenu](#AX6UIMenu)
    * [new AX6UIMenu(config)](#new_AX6UIMenu_new)
    * [.config](#AX6UIMenu+config) : <code>JSON</code>
    * [.openTimer](#AX6UIMenu+openTimer)
    * [.closeTimer](#AX6UIMenu+closeTimer)
    * [.queue](#AX6UIMenu+queue) : <code>Array</code>
    * [.menuBar](#AX6UIMenu+menuBar) : <code>Object</code>
    * [.state](#AX6UIMenu+state)
    * [.init()](#AX6UIMenu+init)
    * [.initOnce()](#AX6UIMenu+initOnce)
    * [.popup(e, [opt])](#AX6UIMenu+popup) ⇒ [<code>AX6UIMenu</code>](#AX6UIMenu)
    * [.attach(el)](#AX6UIMenu+attach) ⇒ [<code>AX6UIMenu</code>](#AX6UIMenu)
    * [.close()](#AX6UIMenu+close) ⇒ [<code>AX6UIMenu</code>](#AX6UIMenu)
    * [.getCheckValue()](#AX6UIMenu+getCheckValue) ⇒ <code>Object</code>

<a name="new_AX6UIMenu_new"></a>

### new AX6UIMenu(config)

| Param |
| --- |
| config | 

<a name="AX6UIMenu+config"></a>

### aX6UIMenu.config : <code>JSON</code>
**Kind**: instance property of [<code>AX6UIMenu</code>](#AX6UIMenu)  

| Param | Default |
| --- | --- |
| config |  | 
| [config.theme] |  | 
| [config.iconWidth] | <code>22</code> | 
| [config.acceleratorWidth] | <code>100</code> | 
| [config.menuBodyPadding] | <code>5</code> | 
| [config.offset] |  | 
| [config.offset.left] | <code>0</code> | 
| [config.offset.top] | <code>0</code> | 
| [config.position] | <code>&quot;fixed&quot;</code> | 
| [config.animateTime] | <code>250</code> | 
| [config.items] |  | 
| [config.itemClickAndClose] | <code>true</code> | 
| [config.columnKeys] |  | 
| [config.columnKeys.label] | <code>&#x27;label&#x27;</code> | 
| [config.columnKeys.items] | <code>&#x27;items&#x27;</code> | 
| [config.onStateChanged] |  | 
| [config.onClick] |  | 
| [config.onLoad] |  | 

<a name="AX6UIMenu+openTimer"></a>

### aX6UIMenu.openTimer
**Kind**: instance property of [<code>AX6UIMenu</code>](#AX6UIMenu)  
<a name="AX6UIMenu+closeTimer"></a>

### aX6UIMenu.closeTimer
**Kind**: instance property of [<code>AX6UIMenu</code>](#AX6UIMenu)  
<a name="AX6UIMenu+queue"></a>

### aX6UIMenu.queue : <code>Array</code>
**Kind**: instance property of [<code>AX6UIMenu</code>](#AX6UIMenu)  
<a name="AX6UIMenu+menuBar"></a>

### aX6UIMenu.menuBar : <code>Object</code>
**Kind**: instance property of [<code>AX6UIMenu</code>](#AX6UIMenu)  
<a name="AX6UIMenu+state"></a>

### aX6UIMenu.state
**Kind**: instance property of [<code>AX6UIMenu</code>](#AX6UIMenu)  
<a name="AX6UIMenu+init"></a>

### aX6UIMenu.init()
**Kind**: instance method of [<code>AX6UIMenu</code>](#AX6UIMenu)  
<a name="AX6UIMenu+initOnce"></a>

### aX6UIMenu.initOnce()
**Kind**: instance method of [<code>AX6UIMenu</code>](#AX6UIMenu)  
<a name="AX6UIMenu+popup"></a>

### aX6UIMenu.popup(e, [opt]) ⇒ [<code>AX6UIMenu</code>](#AX6UIMenu)
**Kind**: instance method of [<code>AX6UIMenu</code>](#AX6UIMenu)  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> \| <code>Object</code> | Event or Object |
| [opt] | <code>Object</code> |  |
| [opt.theme] | <code>String</code> |  |
| [opt.filter] | <code>function</code> |  |

<a name="AX6UIMenu+attach"></a>

### aX6UIMenu.attach(el) ⇒ [<code>AX6UIMenu</code>](#AX6UIMenu)
**Kind**: instance method of [<code>AX6UIMenu</code>](#AX6UIMenu)  

| Param | Type |
| --- | --- |
| el | <code>Element</code> \| <code>jQueryObject</code> | 

<a name="AX6UIMenu+close"></a>

### aX6UIMenu.close() ⇒ [<code>AX6UIMenu</code>](#AX6UIMenu)
**Kind**: instance method of [<code>AX6UIMenu</code>](#AX6UIMenu)  
<a name="AX6UIMenu+getCheckValue"></a>

### aX6UIMenu.getCheckValue() ⇒ <code>Object</code>
**Kind**: instance method of [<code>AX6UIMenu</code>](#AX6UIMenu)  
**Returns**: <code>Object</code> - statusCheckItem  
