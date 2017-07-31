<a name="module_AX6Info"></a>

## AX6Info

* [AX6Info](#module_AX6Info)
    * [.errorMsg](#module_AX6Info.errorMsg)
    * [.onerror](#module_AX6Info.onerror)
    * [.eventKeys](#module_AX6Info.eventKeys)
    * [.weekNames](#module_AX6Info.weekNames)
    * [.browser](#module_AX6Info.browser)
    * [.isBrowser](#module_AX6Info.isBrowser)
    * [.supportTouch](#module_AX6Info.supportTouch) ⇒ <code>boolean</code>
    * [.supportFileApi](#module_AX6Info.supportFileApi)
    * [.wheelEnm](#module_AX6Info.wheelEnm)
    * [.urlUtil](#module_AX6Info.urlUtil)
    * [.getError](#module_AX6Info.getError) ⇒ <code>Object</code>

<a name="module_AX6Info.errorMsg"></a>

### AX6Info.errorMsg
첫번째 자리수 동사 - (필요한것이 없을때 : 4, 실행오류 : 5)
두번째 자리수 목적어 - 문자열 0, 숫자 1, 배열 2, 오브젝트 3, 함수 4, DOM 5, 파일 6, 기타 7
세번째 자리수 옵션

**Kind**: static property of [<code>AX6Info</code>](#module_AX6Info)  
<a name="module_AX6Info.onerror"></a>

### AX6Info.onerror
에러 출력메세지 사용자 재 정의

**Kind**: static property of [<code>AX6Info</code>](#module_AX6Info)  
**Example**  
```
AX6Info.onerror = function(){
 console.log(arguments);
}
```
<a name="module_AX6Info.eventKeys"></a>

### AX6Info.eventKeys
event keyCodes

**Kind**: static property of [<code>AX6Info</code>](#module_AX6Info)  
**Example**  
```
{
	BACKSPACE: 8, TAB: 9,
	RETURN: 13, ESC: 27, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, DELETE: 46,
	HOME: 36, END: 35, PAGEUP: 33, PAGEDOWN: 34, INSERT: 45, SPACE: 32
}
```
<a name="module_AX6Info.weekNames"></a>

### AX6Info.weekNames
week names

**Kind**: static property of [<code>AX6Info</code>](#module_AX6Info)  
**Example**  
```
[
 {label: "SUN"},{label: "MON"},{label: "TUE"},{label: "WED"},{label: "THU"},{label: "FRI"},{label: "SAT"}
]
console.log( weekNames[0] );
console.log( AX6Info.weekNames[(new Date()).getDay()].label )
```
<a name="module_AX6Info.browser"></a>

### AX6Info.browser
사용자 브라우저 식별용 오브젝트

**Kind**: static property of [<code>AX6Info</code>](#module_AX6Info)  
**Example**  
```
console.log( AX6Info.browser );
//Object {name: "chrome", version: "39.0.2171.71", mobile: false}
```
<a name="module_AX6Info.isBrowser"></a>

### AX6Info.isBrowser
브라우저 여부

**Kind**: static property of [<code>AX6Info</code>](#module_AX6Info)  
<a name="module_AX6Info.supportTouch"></a>

### AX6Info.supportTouch ⇒ <code>boolean</code>
브라우져의 터치 가능 유무를 확인합니다.

**Kind**: static property of [<code>AX6Info</code>](#module_AX6Info)  
**Example**  
```
var chkFlag = AX6Info.supportTouch;
<a name="module_AX6Info.supportFileApi"></a>

### AX6Info.supportFileApi
HTML5 FileApi 지원여부

**Kind**: static property of [<code>AX6Info</code>](#module_AX6Info)  
<a name="module_AX6Info.wheelEnm"></a>

### AX6Info.wheelEnm
브라우저에 따른 마우스 휠 이벤트이름

**Kind**: static property of [<code>AX6Info</code>](#module_AX6Info)  
<a name="module_AX6Info.urlUtil"></a>

### AX6Info.urlUtil
현재 페이지의 Url 정보를 리턴합니다.

**Kind**: static property of [<code>AX6Info</code>](#module_AX6Info)  
**Example**  
```
console.log( ax5.util.toJson( AX6Info.urlUtil() ) );
{
	"baseUrl": "http://ax5:2018",
	"href": "http://ax5:2018/samples/index.html?a=1&b=1#abc",
	"param": "a=1&b=1",
	"referrer": "",
	"pathname": "/samples/index.html",
	"hostname": "ax5",
	"port": "2018",
	"url": "http://ax5:2018/samples/index.html",
	"hashdata": "abc"
}
```
<a name="module_AX6Info.getError"></a>

### AX6Info.getError ⇒ <code>Object</code>
ax5-error-msg.js 에 정의된 ax5 error를 반환합니다.

**Kind**: static property of [<code>AX6Info</code>](#module_AX6Info)  
**Example**  
```
console.log( AX6Info.getError("single-uploader", "460", "upload") );

if(!this.selectedFile){
     if (cfg.onEvent) {
     	var that = {
     		action: "error",
     		error: AX6Info.getError("single-uploader", "460", "upload")
     	};
     	cfg.onEvent.call(that, that);
     }
     return this;
}
```
