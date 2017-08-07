## Classes

<dl>
<dt><a href="#AX6UICalendar">AX6UICalendar</a></dt>
<dd></dd>
</dl>

## Members

<dl>
<dt><a href="#tmpl">tmpl</a></dt>
<dd><p><del>~</del><del>~</del><del>~</del><del>~ end of import  ~</del><del>~</del><del>~</del><del>~</del>~~</p>
</dd>
</dl>

<a name="AX6UICalendar"></a>

## AX6UICalendar
**Kind**: global class  

* [AX6UICalendar](#AX6UICalendar)
    * [new AX6UICalendar(config)](#new_AX6UICalendar_new)
    * [.init()](#AX6UICalendar.init)
    * [.initOnce()](#AX6UICalendar.initOnce)
    * [.changeMode(mode, [changeDate])](#AX6UICalendar.changeMode) ⇒ <code>[AX6UICalendar](#AX6UICalendar)</code>
    * [.setSelection(selection, [isPrint])](#AX6UICalendar.setSelection) ⇒ <code>[AX6UICalendar](#AX6UICalendar)</code>
    * [.getSelection()](#AX6UICalendar.getSelection) ⇒ <code>Array</code>
    * [.setSelectable(selectable, [isPrint])](#AX6UICalendar.setSelectable) ⇒ <code>[AX6UICalendar](#AX6UICalendar)</code>
    * [.marker(marker, [isApply])](#AX6UICalendar.marker) ⇒ <code>[AX6UICalendar](#AX6UICalendar)</code>
    * [.setPeriod(period, [isApply])](#AX6UICalendar.setPeriod) ⇒ <code>[AX6UICalendar](#AX6UICalendar)</code>

<a name="new_AX6UICalendar_new"></a>

### new AX6UICalendar(config)

| Param | Type | Default |
| --- | --- | --- |
| config | <code>object</code> |  | 
| [config.theme] | <code>string</code> | <code>&quot;&#x27;default&#x27;&quot;</code> | 
| [config.target] | <code>object</code> &#124; <code>string</code> |  | 
| [config.animateTime] | <code>number</code> | <code>100</code> | 
| [config.onStateChanged] | <code>function</code> |  | 
| [config.onClick] | <code>function</code> |  | 
| [config.content] |  |  | 

**Example**  
```js
var myCalendar = new AX6UICalendar();
```
<a name="AX6UICalendar.init"></a>

### AX6UICalendar.init()
**Kind**: static method of <code>[AX6UICalendar](#AX6UICalendar)</code>  
**Example**  
```js
myCalendar.init();
```
<a name="AX6UICalendar.initOnce"></a>

### AX6UICalendar.initOnce()
**Kind**: static method of <code>[AX6UICalendar](#AX6UICalendar)</code>  
**Example**  
```js
myCalendar.initOnce();
```
<a name="AX6UICalendar.changeMode"></a>

### AX6UICalendar.changeMode(mode, [changeDate]) ⇒ <code>[AX6UICalendar](#AX6UICalendar)</code>
Outputs to the screen in the output mode defined in the Calendar. If you pass an argument, you can change the output mode and output reference date.
캘린더의 모드를 변경합니다.

**Kind**: static method of <code>[AX6UICalendar](#AX6UICalendar)</code>  

| Param | Type | Description |
| --- | --- | --- |
| mode | <code>string</code> | day, d, month, m , year, y |
| [changeDate] | <code>Date</code> &#124; <code>string</code> |  |

**Example**  
```js
myCalendar.changeMode("y");
myCalendar.changeMode("year");
myCalendar.changeMode("month");
myCalendar.changeMode("m");
myCalendar.changeMode("day");
myCalendar.changeMode("d");
```
<a name="AX6UICalendar.setSelection"></a>

### AX6UICalendar.setSelection(selection, [isPrint]) ⇒ <code>[AX6UICalendar](#AX6UICalendar)</code>
Changes to state a date is selected, which is included in the selection.
캘린더에 해당일자를 선택된 상태로 설정합니다.

**Kind**: static method of <code>[AX6UICalendar](#AX6UICalendar)</code>  

| Param | Type |
| --- | --- |
| selection | <code>Array</code> | 
| [isPrint] | <code>boolean</code> | 

**Example**  
```js
myCalendar.setSelection([new Date()]);
```
<a name="AX6UICalendar.getSelection"></a>

### AX6UICalendar.getSelection() ⇒ <code>Array</code>
캘린더에서 선택된 일자를 반환합니다.

**Kind**: static method of <code>[AX6UICalendar](#AX6UICalendar)</code>  
**Example**  
```js
myCalendar.getSelection();
```
<a name="AX6UICalendar.setSelectable"></a>

### AX6UICalendar.setSelectable(selectable, [isPrint]) ⇒ <code>[AX6UICalendar](#AX6UICalendar)</code>
Set the date / year / month that can be selected from the Calendar. selectable is, Array and Object({from: '', to: ''}) is made up of.
캘린더에 해당일자를 선택할 수 있는 상태로 설정합니다.

**Kind**: static method of <code>[AX6UICalendar](#AX6UICalendar)</code>  

| Param | Type |
| --- | --- |
| selectable | <code>Array</code> | 
| [isPrint] | <code>boolean</code> | 

**Example**  
```js
myCalendar.setSelectable(['2016-01-01', ...]);
myCalendar.setSelectable([new Date(), ...]);
myCalendar.setSelectable({ range: [{from: '2016-01-01', to: '2016-01-10'}] });
myCalendar.setSelectable({ range: [{from: new Date(), to: new Date()}] });
myCalendar.setSelectable({ '2016-01-01': true, '2016-01-02': true });
```
<a name="AX6UICalendar.marker"></a>

### AX6UICalendar.marker(marker, [isApply]) ⇒ <code>[AX6UICalendar](#AX6UICalendar)</code>
캘린더에 휴일을 표시합니다.

**Kind**: static method of <code>[AX6UICalendar](#AX6UICalendar)</code>  

| Param | Type |
| --- | --- |
| marker | <code>Object</code> | 
| [isApply] | <code>boolean</code> | 

**Example**  
```js
myCalendar.setMarker({
'2016-02-07': {theme: 'holiday', label: '설날'},
'2016-02-08': {theme: 'holiday', label: '설날'},
'2016-02-09': {theme: 'holiday', label: '설날'},
'2016-02-10': {theme: 'holiday', label: '대체휴일'}
 });
```
<a name="AX6UICalendar.setPeriod"></a>

### AX6UICalendar.setPeriod(period, [isApply]) ⇒ <code>[AX6UICalendar](#AX6UICalendar)</code>
**Kind**: static method of <code>[AX6UICalendar](#AX6UICalendar)</code>  

| Param | Type |
| --- | --- |
| period | <code>Object</code> | 
| [isApply] | <code>boolean</code> | 

**Example**  
```js
myCalendar.setPeriod({
 range: [
     {from: '2016-07-05', to: '2016-07-09', fromLabel: '시작', toLabel: '종료'},
     {from: '2016-07-11', to: '2016-07-15', fromLabel: '시작', toLabel: '종료'}
 ]
});
```
<a name="tmpl"></a>

## tmpl
~~~~~~~~~~~~~~~~~~ end of import  ~~~~~~~~~~~~~~~~~~~~

**Kind**: global variable  
