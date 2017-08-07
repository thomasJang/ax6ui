## Classes

<dl>
<dt><a href="#AX6UIPalette">AX6UIPalette</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#frameTmpl">frameTmpl()</a></dt>
<dd><p><del>~</del><del>~</del><del>~</del><del>~ end of import  ~</del><del>~</del><del>~</del><del>~</del>~~</p>
</dd>
</dl>

<a name="AX6UIPalette"></a>

## AX6UIPalette
**Kind**: global class  

* [AX6UIPalette](#AX6UIPalette)
    * [new AX6UIPalette(config)](#new_AX6UIPalette_new)
    * [.config](#AX6UIPalette+config) : <code>JSON</code>
    * [.$target](#AX6UIPalette+$target) : <code>Object</code>
    * [.xvar](#AX6UIPalette+xvar) : <code>Object</code>
    * [.colors](#AX6UIPalette+colors) : <code>Array</code>
    * [.init(config)](#AX6UIPalette+init)
    * [.initOnce()](#AX6UIPalette+initOnce)
    * [.repaint()](#AX6UIPalette+repaint) ⇒ <code>[AX6UIPalette](#AX6UIPalette)</code>
    * [.setSelectedColor(selectedColor)](#AX6UIPalette+setSelectedColor) ⇒ <code>[AX6UIPalette](#AX6UIPalette)</code>

<a name="new_AX6UIPalette_new"></a>

### new AX6UIPalette(config)

| Param | Type | Default |
| --- | --- | --- |
| config |  |  | 
| [config.theme] |  |  | 
| config.target |  |  | 
| [config.animateTime] |  |  | 
| [config.selectedColor] | <code>String</code> |  | 
| [config.colors] | <code>Object</code> |  | 
| [config.colors.preview] | <code>Object</code> |  | 
| [config.colors.preview.width] | <code>Number</code> | <code>24</code> | 
| [config.colors.preview.height] | <code>Number</code> | <code>24</code> | 
| [config.colors.preview.cellWidth] | <code>Number</code> | <code>30</code> | 
| [config.colors.label] | <code>Object</code> |  | 
| [config.colors.label.width] | <code>Number</code> | <code>80</code> | 
| [config.colors.slider] | <code>Object</code> |  | 
| [config.colors.slider.trackHeight] | <code>Number</code> | <code>8</code> | 
| [config.colors.slider.amount] | <code>Number</code> | <code>32</code> | 
| [config.colors.slider.handleWidth] | <code>Number</code> | <code>18</code> | 
| [config.colors.slider.handleHeight] | <code>Number</code> | <code>18</code> | 
| [config.colors.list] | <code>Array.&lt;Object&gt;</code> | <code>[red,orange,yellow,green,blue,purple,black,white]</code> | 
| config.colors.list[].label | <code>String</code> |  | 
| config.colors.list[].value | <code>String</code> |  | 
| [config.controls] | <code>Object</code> |  | 
| [config.controls.height] | <code>Number</code> | <code>0</code> | 
| [config.onStateChanged] |  |  | 
| [config.onClick] |  |  | 
| [config.onUpdateColor] |  |  | 

**Example**  
```js
myPalette = new Palette({
 target: $('[data-ax5palette="01"]'),
 onClick: function (hexColor) {
     alert(hexColor);
 }
});

myPalette = new Palette({
 target: $('[data-ax5palette="01"]'),
 colors: {
     list: [
         {label: "red", value: "#ff0000"},
         {label: "orange", value: "#ff9802"},
         {label: "yellow", value: "#ffff00"},
         {label: "skyblue", value: "#84e4ff"},
         {label: "white", value: "#ffffff"}
     ]
 }
 onClick: function (hexColor) {

 }
});
```
<a name="AX6UIPalette+config"></a>

### aX6UIPalette.config : <code>JSON</code>
**Kind**: instance property of <code>[AX6UIPalette](#AX6UIPalette)</code>  

| Param | Default |
| --- | --- |
| config |  | 
| config.target |  | 
| [config.theme] | <code>default</code> | 
| [config.clickEventName] | <code>&quot;click&quot;</code> | 
| [config.animateTime] | <code>100</code> | 
| [config.colors] |  | 
| [config.colors.preview] |  | 
| [config.colors.preview.width] | <code>24</code> | 
| [config.colors.preview,height] | <code>24</code> | 
| [config.colors.preview.cellWidth] | <code>30</code> | 
| [config.colors.label] |  | 
| [config.colors.label.width] | <code>80</code> | 
| [config.colors.slider] |  | 
| [config.colors.slider.trackHeight] | <code>8</code> | 
| [config.colors.slider.amount] | <code>32</code> | 
| [config.colors.slider.handleWidth] | <code>18</code> | 
| [config.colors.slider.handleHeight] | <code>18</code> | 
| [config.colors.list] |  | 
| [config.colors.list[].label] |  | 
| [config.colors.list[].value] |  | 
| [config.controls] |  | 
| [config.controls.height] | <code>0</code> | 
| [config.columnKeys=] |  | 
| [config.onStateChanged] |  | 
| [config.onClick] |  | 

<a name="AX6UIPalette+$target"></a>

### aX6UIPalette.$target : <code>Object</code>
**Kind**: instance property of <code>[AX6UIPalette](#AX6UIPalette)</code>  
<a name="AX6UIPalette+xvar"></a>

### aX6UIPalette.xvar : <code>Object</code>
**Kind**: instance property of <code>[AX6UIPalette](#AX6UIPalette)</code>  
<a name="AX6UIPalette+colors"></a>

### aX6UIPalette.colors : <code>Array</code>
**Kind**: instance property of <code>[AX6UIPalette](#AX6UIPalette)</code>  
<a name="AX6UIPalette+init"></a>

### aX6UIPalette.init(config)
**Kind**: instance method of <code>[AX6UIPalette](#AX6UIPalette)</code>  

| Param | Type | Default |
| --- | --- | --- |
| config |  |  | 
| [config.theme] |  |  | 
| config.target |  |  | 
| [config.animateTime] |  |  | 
| [config.selectedColor] | <code>String</code> |  | 
| [config.colors] | <code>Object</code> |  | 
| [config.colors.preview] | <code>Object</code> |  | 
| [config.colors.preview.width] | <code>Number</code> | <code>24</code> | 
| [config.colors.preview.height] | <code>Number</code> | <code>24</code> | 
| [config.colors.preview.cellWidth] | <code>Number</code> | <code>30</code> | 
| [config.colors.label] | <code>Object</code> |  | 
| [config.colors.label.width] | <code>Number</code> | <code>80</code> | 
| [config.colors.slider] | <code>Object</code> |  | 
| [config.colors.slider.trackHeight] | <code>Number</code> | <code>8</code> | 
| [config.colors.slider.amount] | <code>Number</code> | <code>32</code> | 
| [config.colors.slider.handleWidth] | <code>Number</code> | <code>18</code> | 
| [config.colors.slider.handleHeight] | <code>Number</code> | <code>18</code> | 
| [config.colors.list] | <code>Array.&lt;Object&gt;</code> | <code>[red,orange,yellow,green,blue,purple,black,white]</code> | 
| config.colors.list[].label | <code>String</code> |  | 
| config.colors.list[].value | <code>String</code> |  | 
| [config.controls] | <code>Object</code> |  | 
| [config.controls.height] | <code>Number</code> | <code>0</code> | 
| [config.onStateChanged] |  |  | 
| [config.onClick] |  |  | 
| [config.onUpdateColor] |  |  | 

<a name="AX6UIPalette+initOnce"></a>

### aX6UIPalette.initOnce()
**Kind**: instance method of <code>[AX6UIPalette](#AX6UIPalette)</code>  
<a name="AX6UIPalette+repaint"></a>

### aX6UIPalette.repaint() ⇒ <code>[AX6UIPalette](#AX6UIPalette)</code>
**Kind**: instance method of <code>[AX6UIPalette](#AX6UIPalette)</code>  
<a name="AX6UIPalette+setSelectedColor"></a>

### aX6UIPalette.setSelectedColor(selectedColor) ⇒ <code>[AX6UIPalette](#AX6UIPalette)</code>
**Kind**: instance method of <code>[AX6UIPalette](#AX6UIPalette)</code>  

| Param |
| --- |
| selectedColor | 

<a name="frameTmpl"></a>

## frameTmpl()
~~~~~~~~~~~~~~~~~~ end of import  ~~~~~~~~~~~~~~~~~~~~

**Kind**: global function  
