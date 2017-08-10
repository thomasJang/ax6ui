## Classes

<dl>
<dt><a href="#AX6UIDocker">AX6UIDocker</a></dt>
<dd></dd>
</dl>

## Constants

<dl>
<dt><a href="#defaultModule">defaultModule</a></dt>
<dd><p>defaultModule은 패널의 모듈이 정의되지 않은 경우를 위해 준비된 오브젝트</p>
</dd>
<dt><a href="#panelTabDragEvent">panelTabDragEvent</a></dt>
<dd><p>repaintPanels이 작동할 때. 패널탭에 dragStart 이벤트를 연결합니다.
발생된 이벤트가 panelTabDragEvent.on를 작동.</p>
</dd>
<dt><a href="#panelResizerEvent">panelResizerEvent</a></dt>
<dd><p>repaintPanels이 작동할 때. 리사이저에 mousedown 이벤트를 연결합니다.
발생된 이벤트가 panelResizerEvent.on 을 작동시켜 리사이저를 움직이게 합니다</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#repaintPanels">repaintPanels()</a></dt>
<dd><p>패널들의 패널 데이터 구조에 맞게 다시 그리기</p>
</dd>
<dt><a href="#alignStackPane">alignStackPane()</a></dt>
<dd><p>stackPane이 리사이즈 되면 탭을 스크롤여부를 판단해야 합니다.</p>
</dd>
<dt><a href="#arrangePanel">arrangePanel()</a> ⇒ <code>*</code></dt>
<dd><p>패널중에 null이 된 요소를 찾아 panels를 정리 합니다.</p>
</dd>
</dl>

<a name="AX6UIDocker"></a>

## AX6UIDocker
**Kind**: global class  

* [AX6UIDocker](#AX6UIDocker)
    * [new AX6UIDocker(config)](#new_AX6UIDocker_new)
    * [.config](#AX6UIDocker+config) : <code>JSON</code>
    * [.xvar](#AX6UIDocker+xvar) : <code>Object</code>
    * [.menu](#AX6UIDocker+menu) : <code>Object</code>
    * [.panels](#AX6UIDocker+panels) : <code>Array</code>
    * [.panelId](#AX6UIDocker+panelId) : <code>Number</code>
    * [.modules](#AX6UIDocker+modules) : <code>Object</code>
    * [.init()](#AX6UIDocker+init)
    * [.initOnce()](#AX6UIDocker+initOnce)
    * [.setPanels()](#AX6UIDocker+setPanels) ⇒ <code>[AX6UIDocker](#AX6UIDocker)</code>
    * [.addModule(modules)](#AX6UIDocker+addModule) ⇒ <code>[AX6UIDocker](#AX6UIDocker)</code>
    * [.repaint()](#AX6UIDocker+repaint) ⇒ <code>[AX6UIDocker](#AX6UIDocker)</code>
    * [.addPanel(_addPath, _addType, _panel, _panelIndex)](#AX6UIDocker+addPanel) ⇒ <code>[AX6UIDocker](#AX6UIDocker)</code>
    * [.removePanel(panelPath, callback)](#AX6UIDocker+removePanel) ⇒ <code>[AX6UIDocker](#AX6UIDocker)</code>
    * [.appendPanel(_panel, _appendPath, _appendType)](#AX6UIDocker+appendPanel) ⇒ <code>[AX6UIDocker](#AX6UIDocker)</code>
    * [.align()](#AX6UIDocker+align) ⇒ <code>[AX6UIDocker](#AX6UIDocker)</code>
    * [.searchPanel(_condition)](#AX6UIDocker+searchPanel) ⇒ <code>\*</code>
    * [.activePanel(_panelPath, callback)](#AX6UIDocker+activePanel) ⇒ <code>[AX6UIDocker](#AX6UIDocker)</code>

<a name="new_AX6UIDocker_new"></a>

### new AX6UIDocker(config)

| Param |
| --- |
| config | 

<a name="AX6UIDocker+config"></a>

### aX6UIDocker.config : <code>JSON</code>
**Kind**: instance property of <code>[AX6UIDocker](#AX6UIDocker)</code>  

| Param | Default |
| --- | --- |
| config |  | 
| [config.theme] |  | 
| [config.animateTime] | <code>250</code> | 
| [config.columnKeys] |  | 
| [config.control] |  | 
| [config.icons] |  | 
| [config.icons.close] | <code>&#x27;X&#x27;</code> | 
| [config.icons.more] | <code>&#x27;...&#x27;</code> | 
| [config.labelDirection] | <code>&#x27;top&#x27;</code> | 
| [config.disableClosePanel] | <code>false</code> | 
| [config.disableDragPanel] | <code>false</code> | 
| [config.resizeDebounceTime] | <code>100</code> | 
| [config.panelDebounceTime] | <code>300</code> | 

<a name="AX6UIDocker+xvar"></a>

### aX6UIDocker.xvar : <code>Object</code>
**Kind**: instance property of <code>[AX6UIDocker](#AX6UIDocker)</code>  
<a name="AX6UIDocker+menu"></a>

### aX6UIDocker.menu : <code>Object</code>
**Kind**: instance property of <code>[AX6UIDocker](#AX6UIDocker)</code>  
<a name="AX6UIDocker+panels"></a>

### aX6UIDocker.panels : <code>Array</code>
**Kind**: instance property of <code>[AX6UIDocker](#AX6UIDocker)</code>  
<a name="AX6UIDocker+panelId"></a>

### aX6UIDocker.panelId : <code>Number</code>
**Kind**: instance property of <code>[AX6UIDocker](#AX6UIDocker)</code>  
<a name="AX6UIDocker+modules"></a>

### aX6UIDocker.modules : <code>Object</code>
**Kind**: instance property of <code>[AX6UIDocker](#AX6UIDocker)</code>  
<a name="AX6UIDocker+init"></a>

### aX6UIDocker.init()
**Kind**: instance method of <code>[AX6UIDocker](#AX6UIDocker)</code>  
<a name="AX6UIDocker+initOnce"></a>

### aX6UIDocker.initOnce()
**Kind**: instance method of <code>[AX6UIDocker](#AX6UIDocker)</code>  
<a name="AX6UIDocker+setPanels"></a>

### aX6UIDocker.setPanels() ⇒ <code>[AX6UIDocker](#AX6UIDocker)</code>
**Kind**: instance method of <code>[AX6UIDocker](#AX6UIDocker)</code>  
<a name="AX6UIDocker+addModule"></a>

### aX6UIDocker.addModule(modules) ⇒ <code>[AX6UIDocker](#AX6UIDocker)</code>
**Kind**: instance method of <code>[AX6UIDocker](#AX6UIDocker)</code>  

| Param |
| --- |
| modules | 

<a name="AX6UIDocker+repaint"></a>

### aX6UIDocker.repaint() ⇒ <code>[AX6UIDocker](#AX6UIDocker)</code>
repaint panels of docker

**Kind**: instance method of <code>[AX6UIDocker](#AX6UIDocker)</code>  
<a name="AX6UIDocker+addPanel"></a>

### aX6UIDocker.addPanel(_addPath, _addType, _panel, _panelIndex) ⇒ <code>[AX6UIDocker](#AX6UIDocker)</code>
**Kind**: instance method of <code>[AX6UIDocker](#AX6UIDocker)</code>  

| Param | Type | Description |
| --- | --- | --- |
| _addPath | <code>String</code> | Position path to add panel |
| _addType |  |  |
| _panel |  |  |
| _panelIndex |  |  |

**Example**  
```js
myDocker.addPanel('0.1', 'stack', {type:'panel', name:'addPanel', moduleName: 'content'});

```
<a name="AX6UIDocker+removePanel"></a>

### aX6UIDocker.removePanel(panelPath, callback) ⇒ <code>[AX6UIDocker](#AX6UIDocker)</code>
패널 삭제하기

**Kind**: instance method of <code>[AX6UIDocker](#AX6UIDocker)</code>  

| Param | Type |
| --- | --- |
| panelPath | <code>String</code> | 
| callback | <code>function</code> | 

**Example**  
```js
function removePanel() {
     var p = myDocker.searchPanel(function (panel) {
         return (panel.key == "A");
     });

     if (p) {
         myDocker.removePanel(p.panelPath, function () {
             removePanel();
         });
     }
}
removePanel();
```
<a name="AX6UIDocker+appendPanel"></a>

### aX6UIDocker.appendPanel(_panel, _appendPath, _appendType) ⇒ <code>[AX6UIDocker](#AX6UIDocker)</code>
**Kind**: instance method of <code>[AX6UIDocker](#AX6UIDocker)</code>  

| Param |
| --- |
| _panel | 
| _appendPath | 
| _appendType | 

<a name="AX6UIDocker+align"></a>

### aX6UIDocker.align() ⇒ <code>[AX6UIDocker](#AX6UIDocker)</code>
**Kind**: instance method of <code>[AX6UIDocker](#AX6UIDocker)</code>  
<a name="AX6UIDocker+searchPanel"></a>

### aX6UIDocker.searchPanel(_condition) ⇒ <code>\*</code>
**Kind**: instance method of <code>[AX6UIDocker](#AX6UIDocker)</code>  

| Param |
| --- |
| _condition | 

**Example**  
```js
var p = myDocker.searchPanel(function (panel) {
 return (panel.id == "A");
});
```
<a name="AX6UIDocker+activePanel"></a>

### aX6UIDocker.activePanel(_panelPath, callback) ⇒ <code>[AX6UIDocker](#AX6UIDocker)</code>
**Kind**: instance method of <code>[AX6UIDocker](#AX6UIDocker)</code>  

| Param | Type |
| --- | --- |
| _panelPath | <code>String</code> | 
| callback | <code>function</code> | 

**Example**  
```js
myDocker.activePanel("0.1");
myDocker.activePanel("0.0.1");
```
<a name="defaultModule"></a>

## defaultModule
defaultModule은 패널의 모듈이 정의되지 않은 경우를 위해 준비된 오브젝트

**Kind**: global constant  
<a name="panelTabDragEvent"></a>

## panelTabDragEvent
repaintPanels이 작동할 때. 패널탭에 dragStart 이벤트를 연결합니다.
발생된 이벤트가 panelTabDragEvent.on를 작동.

**Kind**: global constant  
<a name="panelResizerEvent"></a>

## panelResizerEvent
repaintPanels이 작동할 때. 리사이저에 mousedown 이벤트를 연결합니다.
발생된 이벤트가 panelResizerEvent.on 을 작동시켜 리사이저를 움직이게 합니다

**Kind**: global constant  
<a name="repaintPanels"></a>

## repaintPanels()
패널들의 패널 데이터 구조에 맞게 다시 그리기

**Kind**: global function  
<a name="alignStackPane"></a>

## alignStackPane()
stackPane이 리사이즈 되면 탭을 스크롤여부를 판단해야 합니다.

**Kind**: global function  
<a name="arrangePanel"></a>

## arrangePanel() ⇒ <code>\*</code>
패널중에 null이 된 요소를 찾아 panels를 정리 합니다.

**Kind**: global function  
