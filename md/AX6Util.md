<a name="AX6Util"></a>

## AX6Util : <code>object</code>
**Kind**: global namespace  

* [AX6Util](#AX6Util) : <code>object</code>
    * [.each(O, _fn)](#AX6Util.each)
    * [.search(O, _fn)](#AX6Util.search) ⇒ <code>Number</code> &#124; <code>String</code>
    * [.filter(O, _fn)](#AX6Util.filter) ⇒ <code>Array</code>
    * [.toJson(O)](#AX6Util.toJson) ⇒ <code>String</code>
    * [.parseJson(JSONString, [force])](#AX6Util.parseJson) ⇒ <code>Object</code>
    * [.getType(O)](#AX6Util.getType) ⇒ <code>String</code>
    * [.isWindow(O)](#AX6Util.isWindow) ⇒ <code>Boolean</code>
    * [.isElement(O)](#AX6Util.isElement) ⇒ <code>Boolean</code>
    * [.isObject(O)](#AX6Util.isObject) ⇒ <code>Boolean</code>
    * [.isArray(O)](#AX6Util.isArray) ⇒ <code>Boolean</code>
    * [.isFunction(O)](#AX6Util.isFunction) ⇒ <code>Boolean</code>
    * [.isString(O)](#AX6Util.isString) ⇒ <code>Boolean</code>
    * [.isNumber(O)](#AX6Util.isNumber) ⇒ <code>Boolean</code>
    * [.isNodelist(O)](#AX6Util.isNodelist) ⇒ <code>Boolean</code>
    * [.isUndefined(O)](#AX6Util.isUndefined) ⇒ <code>Boolean</code>
    * [.isNothing(O)](#AX6Util.isNothing) ⇒ <code>Boolean</code>
    * [.isDate(O)](#AX6Util.isDate) ⇒ <code>Boolean</code>
    * [.first(O)](#AX6Util.first) ⇒ <code>Object</code>
    * [.last(O)](#AX6Util.last) ⇒ <code>Object</code>
    * [.setCookie(cname, cvalue, [exdays], [opts])](#AX6Util.setCookie)
    * [.getCookie(cname)](#AX6Util.getCookie) ⇒ <code>String</code>
    * [.alert(O)](#AX6Util.alert) ⇒ <code>Object</code> &#124; <code>Array</code> &#124; <code>String</code> &#124; <code>Number</code>
    * [.left(str, pos)](#AX6Util.left) ⇒ <code>String</code>
    * [.right(str, pos)](#AX6Util.right) ⇒ <code>String</code>
    * [.camelCase(str)](#AX6Util.camelCase) ⇒ <code>String</code>
    * [.snakeCase(str)](#AX6Util.snakeCase) ⇒ <code>String</code>
    * [.number(str, cond)](#AX6Util.number) ⇒ <code>String</code> &#124; <code>Number</code>
    * [.toArray(O)](#AX6Util.toArray) ⇒ <code>Array</code>
    * [.param(O, [cond])](#AX6Util.param) ⇒ <code>Object</code> &#124; <code>String</code>
    * [.date(d, cond)](#AX6Util.date) ⇒ <code>Date</code> &#124; <code>String</code>
    * [.dday(d, cond)](#AX6Util.dday) ⇒ <code>Number</code>
    * [.weeksOfMonth(d)](#AX6Util.weeksOfMonth) ⇒ <code>Object</code>
    * [.daysOfMonth(y, m)](#AX6Util.daysOfMonth) ⇒ <code>Number</code>
    * [.setDigit(num, length, [padder], [radix])](#AX6Util.setDigit) ⇒ <code>String</code>
    * [.times(s, count)](#AX6Util.times) ⇒ <code>string</code>
    * [.findParentNode(_target, cond)](#AX6Util.findParentNode) ⇒ <code>Element</code>
    * [.cssNumber(val)](#AX6Util.cssNumber) ⇒ <code>String</code>
    * [.css(val)](#AX6Util.css) ⇒ <code>String</code> &#124; <code>Object</code>
    * [.stopEvent(e)](#AX6Util.stopEvent)
    * [.selectRange(el, offset)](#AX6Util.selectRange)
    * [.debounce(func, wait, immediately)](#AX6Util.debounce) ⇒ <code>debounced</code>
    * [.deepCopy(obj)](#AX6Util.deepCopy) ⇒ <code>Object</code>
    * [.escapeHtml(s)](#AX6Util.escapeHtml) ⇒ <code>string</code>
    * [.unescapeHtml(s)](#AX6Util.unescapeHtml) ⇒ <code>string</code>
    * [.string(tmpl, args)](#AX6Util.string) ⇒ <code>ax5string</code>
        * [.format()](#AX6Util.string.format) ⇒ <code>\*</code>
        * [.escape()](#AX6Util.string.escape) ⇒ <code>\*</code>
        * [.unescape()](#AX6Util.string.unescape) ⇒ <code>\*</code>
        * [.encode()](#AX6Util.string.encode) ⇒ <code>\*</code>
        * [.decode()](#AX6Util.string.decode) ⇒ <code>\*</code>
        * [.left(pos)](#AX6Util.string.left) ⇒ <code>\*</code>
        * [.right(pos)](#AX6Util.string.right) ⇒ <code>\*</code>
        * [.camelCase()](#AX6Util.string.camelCase) ⇒ <code>\*</code>
        * [.snakeCase()](#AX6Util.string.snakeCase) ⇒ <code>\*</code>
    * [.color(_hexColor)](#AX6Util.color) ⇒ <code>ax5color</code>

<a name="AX6Util.each"></a>

### AX6Util.each(O, _fn)
Object나 Array의 아이템으로 사용자 함수를 호출합니다.

**Kind**: static method of <code>[AX6Util](#AX6Util)</code>  

| Param | Type |
| --- | --- |
| O | <code>Object</code> &#124; <code>Array</code> | 
| _fn | <code>function</code> | 

**Example**  
```js
var axf = AX6Util;
axf.each([0,1,2], function(){
	// with this
});
axf.each({a:1, b:2}, function(){
	// with this
});
```
<a name="AX6Util.search"></a>

### AX6Util.search(O, _fn) ⇒ <code>Number</code> &#124; <code>String</code>
원본 아이템들을 이용하여 사용자 함수의 리턴값이 참인 아이템의 위치나 키값을 반환합니다.

**Kind**: static method of <code>[AX6Util](#AX6Util)</code>  

| Param | Type | Description |
| --- | --- | --- |
| O | <code>Object</code> &#124; <code>Array</code> |  |
| _fn | <code>function</code> &#124; <code>String</code> &#124; <code>Number</code> | 함수 또는 값 |

**Example**  
```js
var myArray = [0,1,2,3,4,5,6];
var myObject = {a:"123","b":"123",c:123};

AX6Util.search(myArray,  function(){
   return this > 3;
});
// 4
AX6Util.search(myObject,  function(k, v){
   return v === 123;
});
// "c"
AX6Util.search([1,2,3,4], 3);
// 2
AX6Util.search([1,2], 4);
// -1
AX6Util.search(["name","value"], "value");
// 1
AX6Util.search(["name","value"], "values");
// -1
AX6Util.search({k1:"name",k2:"value"}, "value2");
// -1
AX6Util.search({k1:"name",k2:"value"}, "value");
// "k2"
```
<a name="AX6Util.filter"></a>

### AX6Util.filter(O, _fn) ⇒ <code>Array</code>
배열또는 오브젝트의 각 아이템을 인자로 하는 사용자 함수의 결과가 참인 아이템들의 배열을 반환합니다.

**Kind**: static method of <code>[AX6Util](#AX6Util)</code>  

| Param | Type |
| --- | --- |
| O | <code>Object</code> &#124; <code>Array</code> | 
| _fn | <code>function</code> | 

**Example**  
```js
var aarray = [5,4,3,2,1];
result = AX6Util.filter( aarray, function(){
   return this % 2;
});
console.log(result);
// [5, 3, 1]

var filObject = {a:1, s:"string", oa:{pickup:true, name:"AXISJ"}, os:{pickup:true, name:"AX5"}};
result = AX6Util.filter( filObject, function(){
	return this.pickup;
});
console.log( AX6Util.toJson(result) );
// [{"pickup": , "name": "AXISJ"}, {"pickup": , "name": "AX5"}]
```
<a name="AX6Util.toJson"></a>

### AX6Util.toJson(O) ⇒ <code>String</code>
Object를 JSONString 으로 반환합니다.

**Kind**: static method of <code>[AX6Util](#AX6Util)</code>  
**Returns**: <code>String</code> - JSON  

| Param | Type |
| --- | --- |
| O | <code>Object</code> &#124; <code>Array</code> | 

**Example**  
```js
var ax = AX6Util;
var myObject = {
   a:1, b:"2", c:{axj:"what", arrs:[0,2,"3"]},
   fn: function(abcdd){
       return abcdd;
   }
};
console.log( ax.toJson(myObject) );
```
<a name="AX6Util.parseJson"></a>

### AX6Util.parseJson(JSONString, [force]) ⇒ <code>Object</code>
관용의 JSON Parser

**Kind**: static method of <code>[AX6Util](#AX6Util)</code>  

| Param | Type | Description |
| --- | --- | --- |
| JSONString | <code>String</code> |  |
| [force] | <code>Boolean</code> | 강제 적용 여부 (json 문자열 검사를 무시하고 오브젝트 변환을 시도합니다.) |

**Example**  
```
console.log(AX6Util.parseJson('{"a":1}'));
// Object {a: 1}
console.log(AX6Util.parseJson("{'a':1, 'b':'b'}"));
// Object {a: 1, b: "b"}
console.log(AX6Util.parseJson("{'a':1, 'b':function(){return 1;}}", true));
// Object {a: 1, b: function}
console.log(AX6Util.parseJson("{a:1}"));
// Object {a: 1}
console.log(AX6Util.parseJson("[1,2,3]"));
// [1, 2, 3]
console.log(AX6Util.parseJson("['1','2','3']"));
// ["1", "2", "3"]
console.log(AX6Util.parseJson("[{'a':'99'},'2','3']"));
// [Object, "2", "3"]
```
<a name="AX6Util.getType"></a>

### AX6Util.getType(O) ⇒ <code>String</code>
인자의 타입을 반환합니다.

**Kind**: static method of <code>[AX6Util](#AX6Util)</code>  
**Returns**: <code>String</code> - window|element|object|array|function|string|number|undefined|nodelist  

| Param | Type |
| --- | --- |
| O | <code>Object</code> &#124; <code>Array</code> &#124; <code>String</code> &#124; <code>Number</code> &#124; <code>Element</code> &#124; <code>Etc</code> | 

**Example**  
```js
var axf = AX6Util;
var a = 11;
var b = "11";
console.log( axf.getType(a) );
console.log( axf.getType(b) );
```
<a name="AX6Util.isWindow"></a>

### AX6Util.isWindow(O) ⇒ <code>Boolean</code>
오브젝트가 window 인지 판단합니다.

**Kind**: static method of <code>[AX6Util](#AX6Util)</code>  

| Param | Type |
| --- | --- |
| O | <code>Object</code> | 

<a name="AX6Util.isElement"></a>

### AX6Util.isElement(O) ⇒ <code>Boolean</code>
오브젝트가 HTML 엘리먼트여부인지 판단합니다.

**Kind**: static method of <code>[AX6Util](#AX6Util)</code>  

| Param | Type |
| --- | --- |
| O | <code>Object</code> | 

<a name="AX6Util.isObject"></a>

### AX6Util.isObject(O) ⇒ <code>Boolean</code>
오브젝트가 Object인지 판단합니다.

**Kind**: static method of <code>[AX6Util](#AX6Util)</code>  

| Param | Type |
| --- | --- |
| O | <code>Object</code> | 

<a name="AX6Util.isArray"></a>

### AX6Util.isArray(O) ⇒ <code>Boolean</code>
오브젝트가 Array인지 판단합니다.

**Kind**: static method of <code>[AX6Util](#AX6Util)</code>  

| Param | Type |
| --- | --- |
| O | <code>Object</code> | 

<a name="AX6Util.isFunction"></a>

### AX6Util.isFunction(O) ⇒ <code>Boolean</code>
오브젝트가 Function인지 판단합니다.

**Kind**: static method of <code>[AX6Util](#AX6Util)</code>  

| Param | Type |
| --- | --- |
| O | <code>Object</code> | 

<a name="AX6Util.isString"></a>

### AX6Util.isString(O) ⇒ <code>Boolean</code>
오브젝트가 String인지 판단합니다.

**Kind**: static method of <code>[AX6Util](#AX6Util)</code>  

| Param | Type |
| --- | --- |
| O | <code>Object</code> | 

<a name="AX6Util.isNumber"></a>

### AX6Util.isNumber(O) ⇒ <code>Boolean</code>
오브젝트가 Number인지 판단합니다.

**Kind**: static method of <code>[AX6Util](#AX6Util)</code>  

| Param | Type |
| --- | --- |
| O | <code>Object</code> | 

<a name="AX6Util.isNodelist"></a>

### AX6Util.isNodelist(O) ⇒ <code>Boolean</code>
오브젝트가 NodeList인지 판단합니다.

**Kind**: static method of <code>[AX6Util](#AX6Util)</code>  

| Param | Type |
| --- | --- |
| O | <code>Object</code> | 

<a name="AX6Util.isUndefined"></a>

### AX6Util.isUndefined(O) ⇒ <code>Boolean</code>
오브젝트가 undefined인지 판단합니다.

**Kind**: static method of <code>[AX6Util](#AX6Util)</code>  

| Param | Type |
| --- | --- |
| O | <code>Object</code> | 

<a name="AX6Util.isNothing"></a>

### AX6Util.isNothing(O) ⇒ <code>Boolean</code>
오브젝트가 undefined이거나 null이거나 빈값인지 판단합니다.

**Kind**: static method of <code>[AX6Util](#AX6Util)</code>  

| Param | Type |
| --- | --- |
| O | <code>Object</code> | 

<a name="AX6Util.isDate"></a>

### AX6Util.isDate(O) ⇒ <code>Boolean</code>
오브젝트가 날자값인지 판단합니다.

**Kind**: static method of <code>[AX6Util](#AX6Util)</code>  

| Param | Type |
| --- | --- |
| O | <code>Date</code> | 

**Example**  
```js
AX6Util.isDate('2016-09-30');
// false
AX6Util.isDate( new Date('2016-09-30') );
// true
```
<a name="AX6Util.first"></a>

### AX6Util.first(O) ⇒ <code>Object</code>
오브젝트의 첫번째 아이템을 반환합니다.

**Kind**: static method of <code>[AX6Util](#AX6Util)</code>  

| Param | Type |
| --- | --- |
| O | <code>Object</code> &#124; <code>Array</code> | 

**Example**  
```js
AX6Util.first({a:1, b:2});
// Object {a: 1}
AX6Util.first([1,2,3,4]);
// 1
```
<a name="AX6Util.last"></a>

### AX6Util.last(O) ⇒ <code>Object</code>
오브젝트의 마지막 아이템을 반환합니다.

**Kind**: static method of <code>[AX6Util](#AX6Util)</code>  

| Param | Type |
| --- | --- |
| O | <code>Object</code> &#124; <code>Array</code> | 

**Example**  
```js
AX6Util.last({a:1, b:2});
// Object {b: 2}
AX6Util.last([1,2,3,4]);
// 4
```
<a name="AX6Util.setCookie"></a>

### AX6Util.setCookie(cname, cvalue, [exdays], [opts])
쿠키를 설정합니다.

**Kind**: static method of <code>[AX6Util](#AX6Util)</code>  

| Param | Type | Description |
| --- | --- | --- |
| cname | <code>String</code> | 쿠키이름 |
| cvalue | <code>String</code> | 쿠키값 |
| [exdays] | <code>Number</code> | 쿠키 유지일수 |
| [opts] | <code>Object</code> | path, domain 설정 옵션 |

**Example**  
```js
AX6Util.setCookie("jslib", "AX5");
AX6Util.setCookie("jslib", "AX5", 3);
AX6Util.setCookie("jslib", "AX5", 3, {path:"/", domain:".axisj.com"});
```
<a name="AX6Util.getCookie"></a>

### AX6Util.getCookie(cname) ⇒ <code>String</code>
쿠키를 가져옵니다.

**Kind**: static method of <code>[AX6Util](#AX6Util)</code>  
**Returns**: <code>String</code> - cookie value  

| Param | Type |
| --- | --- |
| cname | <code>String</code> | 

**Example**  
```js
AX6Util.getCookie("jslib");
```
<a name="AX6Util.alert"></a>

### AX6Util.alert(O) ⇒ <code>Object</code> &#124; <code>Array</code> &#124; <code>String</code> &#124; <code>Number</code>
jsonString 으로 alert 합니다.

**Kind**: static method of <code>[AX6Util](#AX6Util)</code>  
**Returns**: <code>Object</code> &#124; <code>Array</code> &#124; <code>String</code> &#124; <code>Number</code> - O  

| Param | Type |
| --- | --- |
| O | <code>Object</code> &#124; <code>Array</code> &#124; <code>String</code> &#124; <code>Number</code> | 

**Example**  
```js
AX6Util.alert({a:1,b:2});
AX6Util.alert("정말?");
```
<a name="AX6Util.left"></a>

### AX6Util.left(str, pos) ⇒ <code>String</code>
문자열의 특정 문자열까지 잘라주거나 원하는 포지션까지 잘라줍니다.

**Kind**: static method of <code>[AX6Util](#AX6Util)</code>  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | 문자열 |
| pos | <code>String</code> &#124; <code>Number</code> | 찾을 문자열 또는 포지션 |

**Example**  
```js
AX6Util.left("abcd.efd", 3);
// abc
AX6Util.left("abcd.efd", ".");
// abcd
```
<a name="AX6Util.right"></a>

### AX6Util.right(str, pos) ⇒ <code>String</code>
문자열의 특정 문자열까지 잘라주거나 원하는 포지션까지 잘라줍니다.

**Kind**: static method of <code>[AX6Util](#AX6Util)</code>  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | 문자열 |
| pos | <code>String</code> &#124; <code>Number</code> | 찾을 문자열 또는 포지션 |

**Example**  
```js
AX6Util.right("abcd.efd", 3);
// efd
AX6Util.right("abcd.efd", ".");
// efd
```
<a name="AX6Util.camelCase"></a>

### AX6Util.camelCase(str) ⇒ <code>String</code>
css형 문자열이나 특수문자가 포함된 문자열을 카멜케이스로 바꾸어 반환합니다.

**Kind**: static method of <code>[AX6Util](#AX6Util)</code>  

| Param | Type |
| --- | --- |
| str | <code>String</code> | 

**Example**  
```js
AX6Util.camelCase("inner-width");
AX6Util.camelCase("innerWidth");
// innerWidth
```
<a name="AX6Util.snakeCase"></a>

### AX6Util.snakeCase(str) ⇒ <code>String</code>
css형 문자열이나 카멜케이스문자열을 스네이크 케이스 문자열로 바꾸어 반환합니다.

**Kind**: static method of <code>[AX6Util](#AX6Util)</code>  

| Param | Type |
| --- | --- |
| str | <code>String</code> | 

**Example**  
```js
AX6Util.snakeCase("innerWidth");
AX6Util.snakeCase("inner-Width");
AX6Util.snakeCase("innerWidth");
// inner-width
```
<a name="AX6Util.number"></a>

### AX6Util.number(str, cond) ⇒ <code>String</code> &#124; <code>Number</code>
문자열에서 -. 을 제외한 모든 문자열을 제거하고 숫자로 반환합니다. 옵션에 따라 원하는 형식의 숫자로 변환 할 수 도 있습니다.

**Kind**: static method of <code>[AX6Util](#AX6Util)</code>  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> &#124; <code>Number</code> |  |
| cond | <code>Object</code> | 옵션 |

**Example**  
```js
var cond = {
	round: {Number|Boolean} - 반올림할 자릿수,
	money: {Boolean} - 통화,
	abs: {Boolean} - 절대값,
	byte: {Boolean} - 바이트
}

console.log(AX6Util.number(123456789.678, {round:1}));
console.log(AX6Util.number(123456789.678, {round:1, money:true}));
console.log(AX6Util.number(123456789.678, {round:2, byte:true}));
console.log(AX6Util.number(-123456789.8888, {abs:true, round:2, money:true}));
console.log(AX6Util.number("A-1234~~56789.8~888PX", {abs:true, round:2, money:true}));

//123456789.7
//123,456,789.7
//117.7MB
//123,456,789.89
//123,456,789.89
```
<a name="AX6Util.toArray"></a>

### AX6Util.toArray(O) ⇒ <code>Array</code>
배열 비슷한 오브젝트를 배열로 변환해줍니다.

**Kind**: static method of <code>[AX6Util](#AX6Util)</code>  

| Param | Type |
| --- | --- |
| O | <code>Object</code> &#124; <code>Elements</code> &#124; <code>Arguments</code> | 

**Example**  
```js
AX6Util.toArray(arguments);
//
```
<a name="AX6Util.param"></a>

### AX6Util.param(O, [cond]) ⇒ <code>Object</code> &#124; <code>String</code>
오브젝트를 파라미터형식으로 또는 파라미터를 오브젝트 형식으로 변환합니다.

**Kind**: static method of <code>[AX6Util](#AX6Util)</code>  

| Param | Type | Description |
| --- | --- | --- |
| O | <code>Object</code> &#124; <code>Array</code> &#124; <code>String</code> |  |
| [cond] | <code>String</code> | param|object |

**Example**  
```
AX6Util.param({a:1,b:'1232'}, "param");
AX6Util.param("a=1&b=1232", "param");
// "a=1&b=1232"
AX6Util.param("a=1&b=1232");
// {a: "1", b: "1232"}
```
<a name="AX6Util.date"></a>

### AX6Util.date(d, cond) ⇒ <code>Date</code> &#124; <code>String</code>
날짜 형식의 문자열이나 Date객체를 조건에 맞게 처리 한 후 원하는 return 값으로 반환합니다.

**Kind**: static method of <code>[AX6Util](#AX6Util)</code>  

| Param | Type |
| --- | --- |
| d | <code>String</code> &#124; <code>Date</code> | 
| cond | <code>Object</code> | 

**Example**  
```js
AX6Util.date('2013-01-01'); // Tue Jan 01 2013 23:59:00 GMT+0900 (KST)
AX6Util.date((new Date()), {add:{d:10}, return:'yyyy/MM/dd'}); // "2015/07/01"
AX6Util.date('1919-03-01', {add:{d:10}, return:'yyyy/MM/dd hh:mm:ss'}); // "1919/03/11 23:59:00"
```
<a name="AX6Util.dday"></a>

### AX6Util.dday(d, cond) ⇒ <code>Number</code>
인자인 날짜가 오늘부터 몇일전인지 반환합니다. 또는 인자인 날짜가 가까운 미래에 몇일 후인지 반환합니다.

**Kind**: static method of <code>[AX6Util](#AX6Util)</code>  

| Param | Type |
| --- | --- |
| d | <code>String</code> &#124; <code>Data</code> | 
| cond | <code>Object</code> | 

**Example**  
```js
AX6Util.dday('2016-01-29');
// 1
AX6Util.dday('2016-01-29', {today:'2016-01-28'});
// 1
AX6Util.dday('1977-03-29', {today:'2016-01-28', age:true});
// 39
```
<a name="AX6Util.weeksOfMonth"></a>

### AX6Util.weeksOfMonth(d) ⇒ <code>Object</code>
인자인 날짜가 몇년 몇월의 몇번째 주차인지 반환합니다.

**Kind**: static method of <code>[AX6Util](#AX6Util)</code>  

| Param | Type |
| --- | --- |
| d | <code>String</code> &#124; <code>Data</code> | 

**Example**  
```js
AX6Util.weeksOfMonth("2015-10-01"); // {year: 2015, month: 10, count: 1}
AX6Util.weeksOfMonth("2015-09-19"); // {year: 2015, month: 9, count: 3}
```
<a name="AX6Util.daysOfMonth"></a>

### AX6Util.daysOfMonth(y, m) ⇒ <code>Number</code>
년월에 맞는 날자수를 반환합니다.
(new Date()).getMonth() 기준으로 월값을 보냅니다. "2월" 인경우 "1" 을 넘기게 됩니다.

**Kind**: static method of <code>[AX6Util](#AX6Util)</code>  
**Examples**: ```js
AX6Util.daysOfMonth(2015, 11); // 31
AX6Util.daysOfMonth(2015, 1); // 28
```  

| Param | Type |
| --- | --- |
| y | <code>Number</code> | 
| m | <code>Number</code> | 

<a name="AX6Util.setDigit"></a>

### AX6Util.setDigit(num, length, [padder], [radix]) ⇒ <code>String</code>
원하는 횟수 만큼 자릿수 맞춤 문자열을 포함한 문자열을 반환합니다.
문자열 길이보다 작은값을 보내면 무시됩니다.

**Kind**: static method of <code>[AX6Util](#AX6Util)</code>  

| Param | Type | Default |
| --- | --- | --- |
| num | <code>String</code> &#124; <code>Number</code> |  | 
| length | <code>Number</code> |  | 
| [padder] | <code>String</code> | <code>0</code> | 
| [radix] | <code>Number</code> |  | 

**Example**  
```
AX6Util.setDigit(2016, 6)
// "002016"
AX6Util.setDigit(2016, 2)
// "2016"
```
<a name="AX6Util.times"></a>

### AX6Util.times(s, count) ⇒ <code>string</code>
문자열을 지정된 수만큼 반복 합니다.

**Kind**: static method of <code>[AX6Util](#AX6Util)</code>  

| Param | Type |
| --- | --- |
| s | <code>String</code> | 
| count | <code>Number</code> | 

**Example**  
```
AX6Util.times(2016, 2)
//"20162016"
```
<a name="AX6Util.findParentNode"></a>

### AX6Util.findParentNode(_target, cond) ⇒ <code>Element</code>
타겟엘리먼트의 부모 엘리멘트 트리에서 원하는 조건의 엘리먼트를 얻습니다.

**Kind**: static method of <code>[AX6Util](#AX6Util)</code>  

| Param | Type | Description |
| --- | --- | --- |
| _target | <code>Element</code> | target element |
| cond | <code>Object</code> &#124; <code>function</code> | 원하는 element를 찾을 조건 |

**Example**  
```
// cond 속성정의
var cond = {
	tagname: {String} - 태그명 (ex. a, div, span..),
	clazz: {String} - 클래스명
	[, 그 외 찾고 싶은 attribute명들]
};
console.log(
console.log(
   AX6Util.findParentNode(e.target, {tagname:"a", clazz:"ax-menu-handel", "data-custom-attr":"attr_value"})
);
// cond 함수로 처리하기
jQuery('#id').bind("click.app_expand", function(e){
	var target = AX6Util.findParentNode(e.target, function(target){
		if($(target).hasClass("aside")){
			return true;
		}
		else{
			return true;
		}
	});
	//client-aside
	if(target.id !== "client-aside"){
		// some action
	}
});
```
<a name="AX6Util.cssNumber"></a>

### AX6Util.cssNumber(val) ⇒ <code>String</code>
**Kind**: static method of <code>[AX6Util](#AX6Util)</code>  

| Param | Type |
| --- | --- |
| val | <code>String</code> &#124; <code>Number</code> | 

**Example**  
```
console.log(AX6Util.cssNumber("100px"))
console.log(AX6Util.cssNumber("100%"))
console.log(AX6Util.cssNumber("100"))
console.log(AX6Util.cssNumber(100))
console.log(AX6Util.cssNumber("!!100@#"))
```
<a name="AX6Util.css"></a>

### AX6Util.css(val) ⇒ <code>String</code> &#124; <code>Object</code>
css string 및 object 를 넘기면 object 및 string 으로 변환되어 리턴됩니다.

**Kind**: static method of <code>[AX6Util](#AX6Util)</code>  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>Object</code> &#124; <code>String</code> | CSS String or CSS Object |

**Example**  
```
console.log(AX6Util.css({background: "#ccc", padding: "50px", width: "100px"}));
//"background:#ccc;padding:50px;width:100px;"
console.log(AX6Util.css('width:100px;padding: 50px; background: #ccc'));
// object {width: "100px", padding: "50px", background: "#ccc"}
```
<a name="AX6Util.stopEvent"></a>

### AX6Util.stopEvent(e)
**Kind**: static method of <code>[AX6Util](#AX6Util)</code>  

| Param | Type |
| --- | --- |
| e | <code>Event</code> | 

**Example**  
```
AX6Util.stopEvent(e);
```
<a name="AX6Util.selectRange"></a>

### AX6Util.selectRange(el, offset)
**Kind**: static method of <code>[AX6Util](#AX6Util)</code>  

| Param | Type |
| --- | --- |
| el | <code>Element</code> | 
| offset | <code>Element</code> | 

**Example**  
```
AX6Util.selectRange($("#select-test-0")); // selectAll
AX6Util.selectRange($("#select-test-0"), "selectAll"); //selectAll
AX6Util.selectRange($("#select-test-0"), "start"); // focus on start
AX6Util.selectRange($("#select-test-0"), "end"); // focus on end
AX6Util.selectRange($("#select-test-0"), [1, 5]); // select 1~5
```
<a name="AX6Util.debounce"></a>

### AX6Util.debounce(func, wait, immediately) ⇒ <code>debounced</code>
지정한 시간을 지연시켜 함수를 실행합니다.

**Kind**: static method of <code>[AX6Util](#AX6Util)</code>  

| Param | Type |
| --- | --- |
| func | <code>function</code> | 
| wait | <code>Number</code> | 
| immediately | <code>Boolean</code> | 

**Example**  
```js
var debounceFn = AX6Util.debounce(function( val ) { console.log(val); }, 300);
$(document.body).click(function(){
 debounceFn(new Date());
});
```
<a name="AX6Util.deepCopy"></a>

### AX6Util.deepCopy(obj) ⇒ <code>Object</code>
**Kind**: static method of <code>[AX6Util](#AX6Util)</code>  

| Param | Type |
| --- | --- |
| obj | <code>Object</code> | 

**Example**  
```js
var obj = [
 {name:"A", child:[{name:"a-1"}]},
 {name:"B", child:[{name:"b-1"}], callBack: function(){ console.log('callBack'); }}
];
var copiedObj = AX6Util.deepCopy(obj)
```
<a name="AX6Util.escapeHtml"></a>

### AX6Util.escapeHtml(s) ⇒ <code>string</code>
HTML 문자열을 escape 처리합니다.
"&lt;" represents the < sign.
"&gt;" represents the > sign.
"&amp;" represents the & sign.
"&quot; represents the " mark.
[Character entity references](https://www.w3.org/TR/html401/charset.html#h-5.3)

**Kind**: static method of <code>[AX6Util](#AX6Util)</code>  

| Param | Type |
| --- | --- |
| s | <code>String</code> | 

**Example**  
```
AX6Util.escapeHtml('HTML <span>string</span> & "escape"')
//"HTML &lt;span&gt;string&lt;/span&gt; &amp; &quot;escape&quot;"
```
<a name="AX6Util.unescapeHtml"></a>

### AX6Util.unescapeHtml(s) ⇒ <code>string</code>
HTML 문자열을 unescape 처리합니다.
escapeHtml를 참고하세요.

**Kind**: static method of <code>[AX6Util](#AX6Util)</code>  

| Param | Type |
| --- | --- |
| s | <code>String</code> | 

**Example**  
```
AX6Util.unescapeHtml('HTML &lt;span&gt;string&lt;/span&gt; &amp; &quot;escape&quot;')
//"HTML <span>string</span> & "escape""
```
<a name="AX6Util.string"></a>

### AX6Util.string(tmpl, args) ⇒ <code>ax5string</code>
**Kind**: static method of <code>[AX6Util](#AX6Util)</code>  

| Param | Type |
| --- | --- |
| tmpl | <code>String</code> | 
| args | <code>\*</code> | 

**Example**  
```js
AX6Util.string("{0} is dead, but {1} is alive! {0} {2}").format("ASP", "ASP.NET");
AX6Util.string("{0} is dead, but {1} is alive! {0} {2}").format(["ASP", "ASP.NET"]);
AX6Util.stinrg("{0} counts").format(100);
```

* [.string(tmpl, args)](#AX6Util.string) ⇒ <code>ax5string</code>
    * [.format()](#AX6Util.string.format) ⇒ <code>\*</code>
    * [.escape()](#AX6Util.string.escape) ⇒ <code>\*</code>
    * [.unescape()](#AX6Util.string.unescape) ⇒ <code>\*</code>
    * [.encode()](#AX6Util.string.encode) ⇒ <code>\*</code>
    * [.decode()](#AX6Util.string.decode) ⇒ <code>\*</code>
    * [.left(pos)](#AX6Util.string.left) ⇒ <code>\*</code>
    * [.right(pos)](#AX6Util.string.right) ⇒ <code>\*</code>
    * [.camelCase()](#AX6Util.string.camelCase) ⇒ <code>\*</code>
    * [.snakeCase()](#AX6Util.string.snakeCase) ⇒ <code>\*</code>

<a name="AX6Util.string.format"></a>

#### string.format() ⇒ <code>\*</code>
**Kind**: static method of <code>[string](#AX6Util.string)</code>  
<a name="AX6Util.string.escape"></a>

#### string.escape() ⇒ <code>\*</code>
**Kind**: static method of <code>[string](#AX6Util.string)</code>  
<a name="AX6Util.string.unescape"></a>

#### string.unescape() ⇒ <code>\*</code>
**Kind**: static method of <code>[string](#AX6Util.string)</code>  
<a name="AX6Util.string.encode"></a>

#### string.encode() ⇒ <code>\*</code>
**Kind**: static method of <code>[string](#AX6Util.string)</code>  
<a name="AX6Util.string.decode"></a>

#### string.decode() ⇒ <code>\*</code>
**Kind**: static method of <code>[string](#AX6Util.string)</code>  
<a name="AX6Util.string.left"></a>

#### string.left(pos) ⇒ <code>\*</code>
**Kind**: static method of <code>[string](#AX6Util.string)</code>  

| Param | Type | Description |
| --- | --- | --- |
| pos | <code>String</code> &#124; <code>Number</code> | 찾을 문자열 또는 포지션 |

<a name="AX6Util.string.right"></a>

#### string.right(pos) ⇒ <code>\*</code>
**Kind**: static method of <code>[string](#AX6Util.string)</code>  

| Param | Type | Description |
| --- | --- | --- |
| pos | <code>String</code> &#124; <code>Number</code> | 찾을 문자열 또는 포지션 |

<a name="AX6Util.string.camelCase"></a>

#### string.camelCase() ⇒ <code>\*</code>
**Kind**: static method of <code>[string](#AX6Util.string)</code>  
<a name="AX6Util.string.snakeCase"></a>

#### string.snakeCase() ⇒ <code>\*</code>
**Kind**: static method of <code>[string](#AX6Util.string)</code>  
<a name="AX6Util.color"></a>

### AX6Util.color(_hexColor) ⇒ <code>ax5color</code>
**Kind**: static method of <code>[AX6Util](#AX6Util)</code>  

| Param |
| --- |
| _hexColor | 

**Example**  
```js
AX6Util.color("#ff3300").lighten(10).getHexValue()
console.log(AX6Util.color("#ff3300").darken(10).getHexValue());
```
