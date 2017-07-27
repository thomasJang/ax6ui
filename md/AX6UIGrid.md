<a name="AX6UIGrid"></a>

## AX6UIGrid
**Kind**: global class  

* [AX6UIGrid](#AX6UIGrid)
    * [new AX6UIGrid(config)](#new_AX6UIGrid_new)
    * _instance_
        * [.config](#AX6UIGrid+config) : <code>JSON</code>
        * [.xvar](#AX6UIGrid+xvar) : <code>Object</code>
        * [.columns](#AX6UIGrid+columns) : <code>Array</code>
        * [.colGroup](#AX6UIGrid+colGroup) : <code>Array</code>
        * [.footSumColumns](#AX6UIGrid+footSumColumns) : <code>Array</code>
        * [.bodyGrouping](#AX6UIGrid+bodyGrouping) : <code>Object</code>
        * [.list](#AX6UIGrid+list) : <code>Array</code>
        * [.proxyList](#AX6UIGrid+proxyList) : <code>Array</code>
        * [.page](#AX6UIGrid+page) : <code>Object</code>
        * [.sortInfo](#AX6UIGrid+sortInfo) : <code>Object</code>
        * [.focusedColumn](#AX6UIGrid+focusedColumn) : <code>Object</code>
        * [.selectedColumn](#AX6UIGrid+selectedColumn) : <code>Object</code>
        * [.inlineEditing](#AX6UIGrid+inlineEditing) : <code>Object</code>
        * [.listIndexMap](#AX6UIGrid+listIndexMap) : <code>Object</code>
        * [.contextMenu](#AX6UIGrid+contextMenu) : <code>Object</code>
        * [.headerTable](#AX6UIGrid+headerTable) : <code>Object</code>
        * [.leftHeaderData](#AX6UIGrid+leftHeaderData) : <code>Object</code>
        * [.headerData](#AX6UIGrid+headerData) : <code>Object</code>
        * [.rightHeaderData](#AX6UIGrid+rightHeaderData) : <code>Object</code>
        * [.bodyRowTable](#AX6UIGrid+bodyRowTable) : <code>Object</code>
        * [.leftBodyRowData](#AX6UIGrid+leftBodyRowData) : <code>Object</code>
        * [.bodyRowData](#AX6UIGrid+bodyRowData) : <code>Object</code>
        * [.rightBodyRowData](#AX6UIGrid+rightBodyRowData) : <code>Object</code>
        * [.bodyRowMap](#AX6UIGrid+bodyRowMap) : <code>Object</code>
        * [.bodyGroupingTable](#AX6UIGrid+bodyGroupingTable) : <code>Object</code>
        * [.leftBodyGroupingData](#AX6UIGrid+leftBodyGroupingData) : <code>Object</code>
        * [.bodyGroupingData](#AX6UIGrid+bodyGroupingData) : <code>Object</code>
        * [.rightBodyGroupingData](#AX6UIGrid+rightBodyGroupingData) : <code>Object</code>
        * [.bodyGroupingMap](#AX6UIGrid+bodyGroupingMap) : <code>Object</code>
        * [.footSumTable](#AX6UIGrid+footSumTable) : <code>Object</code>
        * [.leftFootSumData](#AX6UIGrid+leftFootSumData) : <code>Object</code>
        * [.footSumData](#AX6UIGrid+footSumData) : <code>Object</code>
        * [.needToPaintSum](#AX6UIGrid+needToPaintSum) : <code>Boolean</code>
        * [.customFormatter](#AX6UIGrid+customFormatter)
        * [.customCollector](#AX6UIGrid+customCollector)
        * [.init(config)](#AX6UIGrid+init)
        * [.initOnce()](#AX6UIGrid+initOnce)
        * [.align()](#AX6UIGrid+align) ⇒ <code>[AX6UIGrid](#AX6UIGrid)</code>
        * [.keyDown(_act, _data)](#AX6UIGrid+keyDown) ⇒ <code>[AX6UIGrid](#AX6UIGrid)</code>
        * [.copySelect()](#AX6UIGrid+copySelect) ⇒ <code>\*</code>
        * [.setData(_data)](#AX6UIGrid+setData) ⇒ <code>[AX6UIGrid](#AX6UIGrid)</code>
        * [.getList(_type)](#AX6UIGrid+getList) ⇒ <code>\*</code>
        * [.setHeight(_height)](#AX6UIGrid+setHeight) ⇒ <code>[AX6UIGrid](#AX6UIGrid)</code>
        * [.addRow(_row, [_dindex], _options)](#AX6UIGrid+addRow) ⇒ <code>[AX6UIGrid](#AX6UIGrid)</code>
        * [.appendToList(_list)](#AX6UIGrid+appendToList) ⇒ <code>[AX6UIGrid](#AX6UIGrid)</code>
        * [.removeRow([_dindex])](#AX6UIGrid+removeRow) ⇒ <code>[AX6UIGrid](#AX6UIGrid)</code>
        * [.updateRow(_row, _dindex)](#AX6UIGrid+updateRow) ⇒ <code>[AX6UIGrid](#AX6UIGrid)</code>
        * [.updateChildRows(_dindex, _updateData, [_options])](#AX6UIGrid+updateChildRows) ⇒ <code>[AX6UIGrid](#AX6UIGrid)</code>
        * [.deleteRow(_dindex)](#AX6UIGrid+deleteRow) ⇒ <code>[AX6UIGrid](#AX6UIGrid)</code>
        * [.setValue(_dindex, _key, _value)](#AX6UIGrid+setValue) ⇒ <code>[AX6UIGrid](#AX6UIGrid)</code>
        * [.addColumn(_column, [_cindex])](#AX6UIGrid+addColumn) ⇒ <code>[AX6UIGrid](#AX6UIGrid)</code>
        * [.removeColumn([_cindex])](#AX6UIGrid+removeColumn) ⇒ <code>[AX6UIGrid](#AX6UIGrid)</code>
        * [.updateColumn(_column, _cindex)](#AX6UIGrid+updateColumn) ⇒ <code>[AX6UIGrid](#AX6UIGrid)</code>
        * [.setColumnWidth(_width, _cindex)](#AX6UIGrid+setColumnWidth) ⇒ <code>[AX6UIGrid](#AX6UIGrid)</code>
        * [.getColumnSortInfo()](#AX6UIGrid+getColumnSortInfo) ⇒ <code>Object</code>
        * [.setColumnSort(_sortInfo)](#AX6UIGrid+setColumnSort) ⇒ <code>[AX6UIGrid](#AX6UIGrid)</code>
        * [.select(_selectObject, _options)](#AX6UIGrid+select) ⇒ <code>[AX6UIGrid](#AX6UIGrid)</code>
        * [.clickBody(_dindex)](#AX6UIGrid+clickBody) ⇒ <code>[AX6UIGrid](#AX6UIGrid)</code>
        * [.DBLClickBody(_dindex)](#AX6UIGrid+DBLClickBody) ⇒ <code>[AX6UIGrid](#AX6UIGrid)</code>
        * [.clearSelect()](#AX6UIGrid+clearSelect) ⇒ <code>[AX6UIGrid](#AX6UIGrid)</code>
        * [.selectAll(_options)](#AX6UIGrid+selectAll) ⇒ <code>[AX6UIGrid](#AX6UIGrid)</code>
        * [.exportExcel(_fileName)](#AX6UIGrid+exportExcel) ⇒ <code>[AX6UIGrid](#AX6UIGrid)</code> &#124; <code>String</code>
        * [.focus(_pos)](#AX6UIGrid+focus) ⇒ <code>[AX6UIGrid](#AX6UIGrid)</code>
        * [.destroy()](#AX6UIGrid+destroy) ⇒ <code>null</code>
    * _static_
        * [.setFormatter(_formatter)](#AX6UIGrid.setFormatter)
        * [.getFormatter()](#AX6UIGrid.getFormatter) ⇒ <code>Object</code>
        * [.setCollector(_collector)](#AX6UIGrid.setCollector)
        * [.getCollector()](#AX6UIGrid.getCollector) ⇒ <code>Object</code>
        * [.setTmpl(_tmpl)](#AX6UIGrid.setTmpl)

<a name="new_AX6UIGrid_new"></a>

### new AX6UIGrid(config)

| Param |
| --- |
| config | 

<a name="AX6UIGrid+config"></a>

### aX6UIGrid.config : <code>JSON</code>
**Kind**: instance property of <code>[AX6UIGrid](#AX6UIGrid)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| config |  |  |  |
| config.target | <code>Element</code> |  |  |
| [config.frozenColumnIndex] | <code>Number</code> | <code>0</code> |  |
| [config.frozenRowIndex] | <code>Number</code> | <code>0</code> |  |
| [config.showLineNumber] | <code>Boolean</code> | <code>false</code> |  |
| [config.showRowSelector] | <code>Boolean</code> | <code>false</code> |  |
| [config.multipleSelect] | <code>Boolean</code> | <code>true</code> |  |
| [config.columnMinWidth] | <code>Number</code> | <code>100</code> |  |
| [config.lineNumberColumnWidth] | <code>Number</code> | <code>30</code> |  |
| [config.rowSelectorColumnWidth] | <code>Number</code> | <code>25</code> |  |
| [config.sortable] | <code>Boolean</code> | <code>false</code> |  |
| [config.multiSort] | <code>Boolean</code> | <code>false</code> |  |
| [config.remoteSort] | <code>function</code> | <code>false</code> |  |
| [config.virtualScrollY] | <code>Boolean</code> | <code>true</code> | 세로축 가상스크롤 처리여부 |
| [config.virtualScrollX] | <code>Boolean</code> | <code>true</code> | 가로축 가상스크롤 처리여부 |
| [config.header] | <code>Object</code> |  |  |
| [config.header.align] | <code>String</code> |  |  |
| [config.header.columnHeight] | <code>Number</code> | <code>25</code> |  |
| [config.header.columnPadding] | <code>Number</code> | <code>3</code> |  |
| [config.header.columnBorderWidth] | <code>Number</code> | <code>1</code> |  |
| [config.body] | <code>Object</code> |  |  |
| [config.body.onClick] | <code>function</code> |  |  |
| [config.body.onDBLClick] | <code>function</code> |  |  |
| [config.body.onDataChanged] | <code>function</code> |  |  |
| [config.body.mergeCells] | <code>String</code> &#124; <code>Array</code> | <code>false</code> | - |
| [config.body.align] | <code>String</code> |  |  |
| [config.body.columnHeight] | <code>Number</code> | <code>25</code> |  |
| [config.body.columnPadding] | <code>Number</code> | <code>3</code> |  |
| [config.body.columnBorderWidth] | <code>Number</code> | <code>1</code> |  |
| [config.body.grouping] | <code>Object</code> |  |  |
| [config.body.grouping.by] | <code>Array</code> |  | list grouping keys |
| [config.body.grouping.columns] | <code>Array</code> |  | list grouping columns |
| [config.body.trStyleClass] | <code>String</code> &#124; <code>function</code> |  |  |
| [config.page] | <code>Object</code> |  |  |
| [config.page.height] | <code>Number</code> | <code>25</code> |  |
| [config.page.display] | <code>Boolean</code> | <code>true</code> | grid page display |
| [config.page.statusDisplay] | <code>Boolean</code> | <code>true</code> | grid status display |
| [config.page.navigationItemCount] | <code>Number</code> | <code>5</code> |  |
| [config.scroller] | <code>Object</code> |  |  |
| [config.scroller.size] | <code>Number</code> | <code>15</code> |  |
| [config.scroller.barMinSize] | <code>Number</code> | <code>15</code> |  |
| [config.scroller.trackPadding] | <code>Number</code> | <code>4</code> |  |
| [config.columnKeys] | <code>Object</code> |  |  |
| [config.columnKeys.selected] | <code>String</code> | <code>&quot;_SELECTED&quot;</code> |  |
| config.columns | <code>Array.&lt;Object&gt;</code> |  |  |
| config.columns[].key | <code>String</code> |  |  |
| config.columns[].label | <code>String</code> |  |  |
| config.columns[].width | <code>Number</code> |  |  |
| config.columns[].styleClass | <code>String</code> &#124; <code>function</code> |  |  |
| config.columns[].headerStyleClass | <code>String</code> &#124; <code>function</code> |  |  |
| config.columns[].enableFilter | <code>Boolean</code> |  |  |
| config.columns[].sortable | <code>Boolean</code> |  |  |
| config.columns[].align | <code>String</code> |  |  |
| config.columns[].formatter | <code>String</code> &#124; <code>function</code> |  |  |
| config.columns[].editor | <code>Object</code> |  |  |
| config.columns[].editor.type | <code>String</code> |  | text,number,money,date |
| config.columns[].editor.config | <code>Object</code> |  |  |
| config.columns[].editor.updateWith | <code>Array</code> |  |  |
| config.columns[].editor.disabled | <code>function</code> |  | disable editor |
| [config.columns[].multiLine] | <code>Boolean</code> | <code>false</code> |  |
| [config.tree] | <code>Object</code> |  |  |
| [config.tree.use] | <code>Boolean</code> | <code>false</code> | Whether tree-type data is used |
| [config.tree.hashDigit] | <code>Number</code> | <code>8</code> |  |
| [config.tree.indentWidth] | <code>Number</code> | <code>10</code> |  |
| [config.tree.arrowWidth] | <code>Number</code> | <code>15</code> |  |
| [config.tree.iconWidth] | <code>Number</code> | <code>18</code> |  |
| [config.tree.icons] | <code>Object</code> |  |  |
| [config.tree.icons.openedArrow] | <code>String</code> | <code>&#x27;▾&#x27;</code> |  |
| [config.tree.icons.collapsedArrow] | <code>String</code> | <code>&#x27;▸&#x27;</code> |  |
| [config.tree.icons.groupIcon] | <code>String</code> | <code>&#x27;⊚&#x27;</code> |  |
| [config.tree.icons.collapsedGroupIcon] | <code>String</code> | <code>&#x27;⊚&#x27;</code> |  |
| [config.tree.icons.itemIcon] | <code>String</code> | <code>&#x27;⊙&#x27;</code> |  |
| [config.tree.columnKeys] | <code>Object</code> |  |  |
| [config.tree.columnKeys.parentKey] | <code>String</code> | <code>&quot;pid&quot;</code> |  |
| [config.tree.columnKeys.selfKey] | <code>String</code> | <code>&quot;id&quot;</code> |  |
| [config.tree.columnKeys.collapse] | <code>String</code> | <code>&quot;collapse&quot;</code> |  |
| [config.tree.columnKeys.hidden] | <code>String</code> | <code>&quot;hidden&quot;</code> |  |
| [config.tree.columnKeys.parentHash] | <code>String</code> | <code>&quot;__hp__&quot;</code> |  |
| [config.tree.columnKeys.selfHash] | <code>String</code> | <code>&quot;__hs__&quot;</code> |  |
| [config.tree.columnKeys.children] | <code>String</code> | <code>&quot;__children__&quot;</code> |  |
| [config.tree.columnKeys.depth] | <code>String</code> | <code>&quot;__depth__&quot;</code> |  |

<a name="AX6UIGrid+xvar"></a>

### aX6UIGrid.xvar : <code>Object</code>
**Kind**: instance property of <code>[AX6UIGrid](#AX6UIGrid)</code>  
<a name="AX6UIGrid+columns"></a>

### aX6UIGrid.columns : <code>Array</code>
**Kind**: instance property of <code>[AX6UIGrid](#AX6UIGrid)</code>  
<a name="AX6UIGrid+colGroup"></a>

### aX6UIGrid.colGroup : <code>Array</code>
**Kind**: instance property of <code>[AX6UIGrid](#AX6UIGrid)</code>  
<a name="AX6UIGrid+footSumColumns"></a>

### aX6UIGrid.footSumColumns : <code>Array</code>
**Kind**: instance property of <code>[AX6UIGrid](#AX6UIGrid)</code>  
<a name="AX6UIGrid+bodyGrouping"></a>

### aX6UIGrid.bodyGrouping : <code>Object</code>
**Kind**: instance property of <code>[AX6UIGrid](#AX6UIGrid)</code>  
<a name="AX6UIGrid+list"></a>

### aX6UIGrid.list : <code>Array</code>
**Kind**: instance property of <code>[AX6UIGrid](#AX6UIGrid)</code>  
<a name="AX6UIGrid+proxyList"></a>

### aX6UIGrid.proxyList : <code>Array</code>
**Kind**: instance property of <code>[AX6UIGrid](#AX6UIGrid)</code>  
<a name="AX6UIGrid+page"></a>

### aX6UIGrid.page : <code>Object</code>
**Kind**: instance property of <code>[AX6UIGrid](#AX6UIGrid)</code>  
<a name="AX6UIGrid+sortInfo"></a>

### aX6UIGrid.sortInfo : <code>Object</code>
**Kind**: instance property of <code>[AX6UIGrid](#AX6UIGrid)</code>  
<a name="AX6UIGrid+focusedColumn"></a>

### aX6UIGrid.focusedColumn : <code>Object</code>
**Kind**: instance property of <code>[AX6UIGrid](#AX6UIGrid)</code>  
<a name="AX6UIGrid+selectedColumn"></a>

### aX6UIGrid.selectedColumn : <code>Object</code>
**Kind**: instance property of <code>[AX6UIGrid](#AX6UIGrid)</code>  
<a name="AX6UIGrid+inlineEditing"></a>

### aX6UIGrid.inlineEditing : <code>Object</code>
**Kind**: instance property of <code>[AX6UIGrid](#AX6UIGrid)</code>  
<a name="AX6UIGrid+listIndexMap"></a>

### aX6UIGrid.listIndexMap : <code>Object</code>
**Kind**: instance property of <code>[AX6UIGrid](#AX6UIGrid)</code>  
<a name="AX6UIGrid+contextMenu"></a>

### aX6UIGrid.contextMenu : <code>Object</code>
**Kind**: instance property of <code>[AX6UIGrid](#AX6UIGrid)</code>  
<a name="AX6UIGrid+headerTable"></a>

### aX6UIGrid.headerTable : <code>Object</code>
**Kind**: instance property of <code>[AX6UIGrid](#AX6UIGrid)</code>  
<a name="AX6UIGrid+leftHeaderData"></a>

### aX6UIGrid.leftHeaderData : <code>Object</code>
**Kind**: instance property of <code>[AX6UIGrid](#AX6UIGrid)</code>  
<a name="AX6UIGrid+headerData"></a>

### aX6UIGrid.headerData : <code>Object</code>
**Kind**: instance property of <code>[AX6UIGrid](#AX6UIGrid)</code>  
<a name="AX6UIGrid+rightHeaderData"></a>

### aX6UIGrid.rightHeaderData : <code>Object</code>
**Kind**: instance property of <code>[AX6UIGrid](#AX6UIGrid)</code>  
<a name="AX6UIGrid+bodyRowTable"></a>

### aX6UIGrid.bodyRowTable : <code>Object</code>
**Kind**: instance property of <code>[AX6UIGrid](#AX6UIGrid)</code>  
<a name="AX6UIGrid+leftBodyRowData"></a>

### aX6UIGrid.leftBodyRowData : <code>Object</code>
**Kind**: instance property of <code>[AX6UIGrid](#AX6UIGrid)</code>  
<a name="AX6UIGrid+bodyRowData"></a>

### aX6UIGrid.bodyRowData : <code>Object</code>
**Kind**: instance property of <code>[AX6UIGrid](#AX6UIGrid)</code>  
<a name="AX6UIGrid+rightBodyRowData"></a>

### aX6UIGrid.rightBodyRowData : <code>Object</code>
**Kind**: instance property of <code>[AX6UIGrid](#AX6UIGrid)</code>  
<a name="AX6UIGrid+bodyRowMap"></a>

### aX6UIGrid.bodyRowMap : <code>Object</code>
**Kind**: instance property of <code>[AX6UIGrid](#AX6UIGrid)</code>  
<a name="AX6UIGrid+bodyGroupingTable"></a>

### aX6UIGrid.bodyGroupingTable : <code>Object</code>
**Kind**: instance property of <code>[AX6UIGrid](#AX6UIGrid)</code>  
<a name="AX6UIGrid+leftBodyGroupingData"></a>

### aX6UIGrid.leftBodyGroupingData : <code>Object</code>
**Kind**: instance property of <code>[AX6UIGrid](#AX6UIGrid)</code>  
<a name="AX6UIGrid+bodyGroupingData"></a>

### aX6UIGrid.bodyGroupingData : <code>Object</code>
**Kind**: instance property of <code>[AX6UIGrid](#AX6UIGrid)</code>  
<a name="AX6UIGrid+rightBodyGroupingData"></a>

### aX6UIGrid.rightBodyGroupingData : <code>Object</code>
**Kind**: instance property of <code>[AX6UIGrid](#AX6UIGrid)</code>  
<a name="AX6UIGrid+bodyGroupingMap"></a>

### aX6UIGrid.bodyGroupingMap : <code>Object</code>
**Kind**: instance property of <code>[AX6UIGrid](#AX6UIGrid)</code>  
<a name="AX6UIGrid+footSumTable"></a>

### aX6UIGrid.footSumTable : <code>Object</code>
**Kind**: instance property of <code>[AX6UIGrid](#AX6UIGrid)</code>  
<a name="AX6UIGrid+leftFootSumData"></a>

### aX6UIGrid.leftFootSumData : <code>Object</code>
**Kind**: instance property of <code>[AX6UIGrid](#AX6UIGrid)</code>  
<a name="AX6UIGrid+footSumData"></a>

### aX6UIGrid.footSumData : <code>Object</code>
**Kind**: instance property of <code>[AX6UIGrid](#AX6UIGrid)</code>  
<a name="AX6UIGrid+needToPaintSum"></a>

### aX6UIGrid.needToPaintSum : <code>Boolean</code>
**Kind**: instance property of <code>[AX6UIGrid](#AX6UIGrid)</code>  
<a name="AX6UIGrid+customFormatter"></a>

### aX6UIGrid.customFormatter
사용자 정의 formatter. AX6UIGrid.setFormatter 를 이용하여 확장

**Kind**: instance property of <code>[AX6UIGrid](#AX6UIGrid)</code>  
<a name="AX6UIGrid+customCollector"></a>

### aX6UIGrid.customCollector
사용자 정의 collector. AX6UIGrid.setCollector 를 이용하여 확장

**Kind**: instance property of <code>[AX6UIGrid](#AX6UIGrid)</code>  
<a name="AX6UIGrid+init"></a>

### aX6UIGrid.init(config)
**Kind**: instance method of <code>[AX6UIGrid](#AX6UIGrid)</code>  

| Param |
| --- |
| config | 

<a name="AX6UIGrid+initOnce"></a>

### aX6UIGrid.initOnce()
**Kind**: instance method of <code>[AX6UIGrid](#AX6UIGrid)</code>  
<a name="AX6UIGrid+align"></a>

### aX6UIGrid.align() ⇒ <code>[AX6UIGrid](#AX6UIGrid)</code>
그리드의 각 패널들의 크기를 변경된 설정에 맞추어 다시 그림

**Kind**: instance method of <code>[AX6UIGrid](#AX6UIGrid)</code>  
<a name="AX6UIGrid+keyDown"></a>

### aX6UIGrid.keyDown(_act, _data) ⇒ <code>[AX6UIGrid](#AX6UIGrid)</code>
그리드에 키보드 액션을 전달

**Kind**: instance method of <code>[AX6UIGrid](#AX6UIGrid)</code>  

| Param |
| --- |
| _act | 
| _data | 

<a name="AX6UIGrid+copySelect"></a>

### aX6UIGrid.copySelect() ⇒ <code>\*</code>
선택된 셀을 클립보드에 복사합니다

**Kind**: instance method of <code>[AX6UIGrid](#AX6UIGrid)</code>  
<a name="AX6UIGrid+setData"></a>

### aX6UIGrid.setData(_data) ⇒ <code>[AX6UIGrid](#AX6UIGrid)</code>
**Kind**: instance method of <code>[AX6UIGrid](#AX6UIGrid)</code>  

| Param |
| --- |
| _data | 

**Example**  
```js
import {AX6UIGrid as Grid} from "ax6ui";

let grid = new Grid({target: el});
grid.setData([
 {name: "Thomas"}
]);

grid.setData({
 list: [],
 page: {
     currentPage: 0,
     pageSize: 50,
     totalElements: 500,
     totalPages: 100
 }
});
```
<a name="AX6UIGrid+getList"></a>

### aX6UIGrid.getList(_type) ⇒ <code>\*</code>
**Kind**: instance method of <code>[AX6UIGrid](#AX6UIGrid)</code>  

| Param |
| --- |
| _type | 

**Example**  
```js
import {AX6UIGrid as Grid} from "ax6ui";
let grid = new Grid({target: el});
grid.setData([]);

grid.getList(); // return all
grid.getList("selected");
grid.getList("modified");
grid.getList("deleted");
```
<a name="AX6UIGrid+setHeight"></a>

### aX6UIGrid.setHeight(_height) ⇒ <code>[AX6UIGrid](#AX6UIGrid)</code>
**Kind**: instance method of <code>[AX6UIGrid](#AX6UIGrid)</code>  

| Param |
| --- |
| _height | 

**Example**  
```js
grid.setHeight(height);
```
<a name="AX6UIGrid+addRow"></a>

### aX6UIGrid.addRow(_row, [_dindex], _options) ⇒ <code>[AX6UIGrid](#AX6UIGrid)</code>
**Kind**: instance method of <code>[AX6UIGrid](#AX6UIGrid)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _row |  |  |  |
| [_dindex] | <code>Number</code> &#124; <code>String</code> | <code>&quot;last&quot;</code> |  |
| _options |  |  |  |
| [_options.sort] | <code>Boolean</code> |  |  |
| [_options.focus] | <code>Number</code> &#124; <code>String</code> |  | HOME|END|[dindex] |

**Example**  
```js
grid.addRow($.extend({}, {...}), "first");
grid.addRow($.extend({}, {...}), "last", {focus: "END"});
grid.addRow($.extend({}, {...}), "last", {focus: "HOME"});
grid.addRow($.extend({}, {...}), "last", {focus: 10});
```
<a name="AX6UIGrid+appendToList"></a>

### aX6UIGrid.appendToList(_list) ⇒ <code>[AX6UIGrid](#AX6UIGrid)</code>
**Kind**: instance method of <code>[AX6UIGrid](#AX6UIGrid)</code>  

| Param |
| --- |
| _list | 

**Example**  
```js
grid.appendToList([{},{},{}]);
grid.appendToList([{},{},{}]);
```
<a name="AX6UIGrid+removeRow"></a>

### aX6UIGrid.removeRow([_dindex]) ⇒ <code>[AX6UIGrid](#AX6UIGrid)</code>
**Kind**: instance method of <code>[AX6UIGrid](#AX6UIGrid)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [_dindex] | <code>Number</code> &#124; <code>String</code> | <code>last</code> | 

**Example**  
```js
grid.removeRow();
grid.removeRow("first");
grid.removeRow("last");
grid.removeRow(1);
grid.removeRow("selected");
```
<a name="AX6UIGrid+updateRow"></a>

### aX6UIGrid.updateRow(_row, _dindex) ⇒ <code>[AX6UIGrid](#AX6UIGrid)</code>
**Kind**: instance method of <code>[AX6UIGrid](#AX6UIGrid)</code>  

| Param |
| --- |
| _row | 
| _dindex | 

**Example**  
```js
grid.updateRow({price: 100, amount: 100, cost: 10000}, 1);
```
<a name="AX6UIGrid+updateChildRows"></a>

### aX6UIGrid.updateChildRows(_dindex, _updateData, [_options]) ⇒ <code>[AX6UIGrid](#AX6UIGrid)</code>
**Kind**: instance method of <code>[AX6UIGrid](#AX6UIGrid)</code>  

| Param | Type |
| --- | --- |
| _dindex | <code>Number</code> | 
| _updateData | <code>Object</code> | 
| [_options] | <code>Object</code> | 
| [_options.filter] | <code>function</code> | 

**Example**  
```js
onDataChanged: function () {
     this.self.updateChildRows(this.dindex, {isChecked: this.item.isChecked});
}

onDataChanged: function () {
     this.self.updateChildRows(this.dindex, {isChecked: this.item.isChecked}, {filter: function(){
         return this.item.type == "A";
     });
}
```
<a name="AX6UIGrid+deleteRow"></a>

### aX6UIGrid.deleteRow(_dindex) ⇒ <code>[AX6UIGrid](#AX6UIGrid)</code>
**Kind**: instance method of <code>[AX6UIGrid](#AX6UIGrid)</code>  

| Param | Type |
| --- | --- |
| _dindex | <code>Number</code> &#124; <code>String</code> | 

**Example**  
```js
grid.deleteRow("first");
grid.deleteRow("last");
grid.deleteRow(1);
grid.deleteRow("selected");
```
<a name="AX6UIGrid+setValue"></a>

### aX6UIGrid.setValue(_dindex, _key, _value) ⇒ <code>[AX6UIGrid](#AX6UIGrid)</code>
**Kind**: instance method of <code>[AX6UIGrid](#AX6UIGrid)</code>  

| Param |
| --- |
| _dindex | 
| _key | 
| _value | 

**Example**  
```js
grid.setValue(0, "price", 100);
```
<a name="AX6UIGrid+addColumn"></a>

### aX6UIGrid.addColumn(_column, [_cindex]) ⇒ <code>[AX6UIGrid](#AX6UIGrid)</code>
**Kind**: instance method of <code>[AX6UIGrid](#AX6UIGrid)</code>  

| Param | Type | Default |
| --- | --- | --- |
| _column | <code>Object</code> |  | 
| [_cindex] | <code>Number</code> &#124; <code>String</code> | <code>last</code> | 

<a name="AX6UIGrid+removeColumn"></a>

### aX6UIGrid.removeColumn([_cindex]) ⇒ <code>[AX6UIGrid](#AX6UIGrid)</code>
**Kind**: instance method of <code>[AX6UIGrid](#AX6UIGrid)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [_cindex] | <code>Number</code> &#124; <code>String</code> | <code>last</code> | 

<a name="AX6UIGrid+updateColumn"></a>

### aX6UIGrid.updateColumn(_column, _cindex) ⇒ <code>[AX6UIGrid](#AX6UIGrid)</code>
**Kind**: instance method of <code>[AX6UIGrid](#AX6UIGrid)</code>  

| Param | Type |
| --- | --- |
| _column | <code>Object</code> | 
| _cindex | <code>Number</code> | 

<a name="AX6UIGrid+setColumnWidth"></a>

### aX6UIGrid.setColumnWidth(_width, _cindex) ⇒ <code>[AX6UIGrid](#AX6UIGrid)</code>
**Kind**: instance method of <code>[AX6UIGrid](#AX6UIGrid)</code>  

| Param | Type |
| --- | --- |
| _width | <code>Number</code> | 
| _cindex | <code>Number</code> | 

<a name="AX6UIGrid+getColumnSortInfo"></a>

### aX6UIGrid.getColumnSortInfo() ⇒ <code>Object</code>
**Kind**: instance method of <code>[AX6UIGrid](#AX6UIGrid)</code>  
**Returns**: <code>Object</code> - sortInfo  
<a name="AX6UIGrid+setColumnSort"></a>

### aX6UIGrid.setColumnSort(_sortInfo) ⇒ <code>[AX6UIGrid](#AX6UIGrid)</code>
**Kind**: instance method of <code>[AX6UIGrid](#AX6UIGrid)</code>  

| Param | Type | Description |
| --- | --- | --- |
| _sortInfo | <code>Object</code> |  |
| _sortInfo.key | <code>Object</code> |  |
| _sortInfo.key.seq | <code>Number</code> | seq of sortOrder |
| _sortInfo.key.orderBy | <code>String</code> | "desc"|"asc" |

**Example**  
```js
grid.setColumnSort({a:{seq:0, orderBy:"desc"}, b:{seq:1, orderBy:"asc"}});
```
<a name="AX6UIGrid+select"></a>

### aX6UIGrid.select(_selectObject, _options) ⇒ <code>[AX6UIGrid](#AX6UIGrid)</code>
**Kind**: instance method of <code>[AX6UIGrid](#AX6UIGrid)</code>  

| Param | Type | Description |
| --- | --- | --- |
| _selectObject | <code>Number</code> &#124; <code>Object</code> |  |
| _selectObject.index | <code>Number</code> | index of row |
| _selectObject.rowIndex | <code>Number</code> | rowIndex of columns |
| _selectObject.conIndex | <code>Number</code> | colIndex of columns |
| _options | <code>Object</code> |  |
| _options.selectedClear | <code>Boolean</code> |  |
| _options.selected | <code>Boolean</code> |  |

**Example**  
```js
grid.select(0);
grid.select(0, {selected: true});
grid.select(0, {selected: false});
grid.select(0, {selectedClear: true});
```
<a name="AX6UIGrid+clickBody"></a>

### aX6UIGrid.clickBody(_dindex) ⇒ <code>[AX6UIGrid](#AX6UIGrid)</code>
**Kind**: instance method of <code>[AX6UIGrid](#AX6UIGrid)</code>  

| Param |
| --- |
| _dindex | 

<a name="AX6UIGrid+DBLClickBody"></a>

### aX6UIGrid.DBLClickBody(_dindex) ⇒ <code>[AX6UIGrid](#AX6UIGrid)</code>
**Kind**: instance method of <code>[AX6UIGrid](#AX6UIGrid)</code>  

| Param |
| --- |
| _dindex | 

<a name="AX6UIGrid+clearSelect"></a>

### aX6UIGrid.clearSelect() ⇒ <code>[AX6UIGrid](#AX6UIGrid)</code>
**Kind**: instance method of <code>[AX6UIGrid](#AX6UIGrid)</code>  
<a name="AX6UIGrid+selectAll"></a>

### aX6UIGrid.selectAll(_options) ⇒ <code>[AX6UIGrid](#AX6UIGrid)</code>
**Kind**: instance method of <code>[AX6UIGrid](#AX6UIGrid)</code>  

| Param | Type |
| --- | --- |
| _options | <code>Object</code> | 
| _options.selected | <code>Boolean</code> | 
| _options.filter | <code>function</code> | 

**Example**  
```js
grid.selectAll();
grid.selectAll({selected: true});
grid.selectAll({selected: false});
grid.selectAll({filter: function(){
     return this["b"] == "A01";
});
grid.selectAll({selected: true, filter: function(){
     return this["b"] == "A01";
});
```
<a name="AX6UIGrid+exportExcel"></a>

### aX6UIGrid.exportExcel(_fileName) ⇒ <code>[AX6UIGrid](#AX6UIGrid)</code> &#124; <code>String</code>
**Kind**: instance method of <code>[AX6UIGrid](#AX6UIGrid)</code>  

| Param | Type |
| --- | --- |
| _fileName | <code>String</code> | 

**Example**  
```js
grid.exportExcel("grid-to-excel.xls");
console.log(grid.exportExcel());
```
<a name="AX6UIGrid+focus"></a>

### aX6UIGrid.focus(_pos) ⇒ <code>[AX6UIGrid](#AX6UIGrid)</code>
**Kind**: instance method of <code>[AX6UIGrid](#AX6UIGrid)</code>  

| Param | Type | Description |
| --- | --- | --- |
| _pos | <code>String</code> &#124; <code>Number</code> | UP, DOWN, LEFT, RIGHT, HOME, END |

**Example**  
```js
grid.focus("UP");
grid.focus("DOWN");
grid.focus("HOME");
grid.focus("END");
```
<a name="AX6UIGrid+destroy"></a>

### aX6UIGrid.destroy() ⇒ <code>null</code>
**Kind**: instance method of <code>[AX6UIGrid](#AX6UIGrid)</code>  
<a name="AX6UIGrid.setFormatter"></a>

### AX6UIGrid.setFormatter(_formatter)
**Kind**: static method of <code>[AX6UIGrid](#AX6UIGrid)</code>  

| Param |
| --- |
| _formatter | 

<a name="AX6UIGrid.getFormatter"></a>

### AX6UIGrid.getFormatter() ⇒ <code>Object</code>
**Kind**: static method of <code>[AX6UIGrid](#AX6UIGrid)</code>  
<a name="AX6UIGrid.setCollector"></a>

### AX6UIGrid.setCollector(_collector)
**Kind**: static method of <code>[AX6UIGrid](#AX6UIGrid)</code>  

| Param |
| --- |
| _collector | 

<a name="AX6UIGrid.getCollector"></a>

### AX6UIGrid.getCollector() ⇒ <code>Object</code>
**Kind**: static method of <code>[AX6UIGrid](#AX6UIGrid)</code>  
<a name="AX6UIGrid.setTmpl"></a>

### AX6UIGrid.setTmpl(_tmpl)
**Kind**: static method of <code>[AX6UIGrid](#AX6UIGrid)</code>  

| Param |
| --- |
| _tmpl | 

