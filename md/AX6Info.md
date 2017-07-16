<a name="AX6Info"></a>

## AX6Info : <code>object</code>
상수모음

**Kind**: global namespace  

* [AX6Info](#AX6Info) : <code>object</code>
    * [.onerror](#AX6Info.onerror) : <code>Object</code>
    * [.eventKeys](#AX6Info.eventKeys) : <code>Object</code>
    * [.browser](#AX6Info.browser) : <code>Object</code>
    * [.isBrowser](#AX6Info.isBrowser) : <code>Boolean</code>
    * [.wheelEnm](#AX6Info.wheelEnm) : <code>Object</code>
    * [.errorMsg](#AX6Info.errorMsg) : <code>Object</code>
    * [.urlUtil()](#AX6Info.urlUtil) ⇒ <code>Object</code>
    * [.getError()](#AX6Info.getError) ⇒ <code>Object</code>
    * [.supportTouch()](#AX6Info.supportTouch) ⇒ <code>boolean</code>

<a name="AX6Info.onerror"></a>

### AX6Info.onerror : <code>Object</code>
에러 출력메세지 사용자 재 정의

**Kind**: static property of <code>[AX6Info](#AX6Info)</code>  
**Example**  
```
AX6Info.onerror = function(){
 console.log(arguments);
}
```
<a name="AX6Info.eventKeys"></a>

### AX6Info.eventKeys : <code>Object</code>
event keyCodes

**Kind**: static property of <code>[AX6Info](#AX6Info)</code>  
**Example**  
```
{
	BACKSPACE: 8, TAB: 9,
	RETURN: 13, ESC: 27, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, DELETE: 46,
	HOME: 36, END: 35, PAGEUP: 33, PAGEDOWN: 34, INSERT: 45, SPACE: 32
}
```
<a name="AX6Info.browser"></a>

### AX6Info.browser : <code>Object</code>
사용자 브라우저 식별용 오브젝트

**Kind**: static property of <code>[AX6Info](#AX6Info)</code>  
**Example**  
```
console.log( AX6Info.browser );
//Object {name: "chrome", version: "39.0.2171.71", mobile: false}
```
<a name="AX6Info.isBrowser"></a>

### AX6Info.isBrowser : <code>Boolean</code>
브라우저 여부

**Kind**: static property of <code>[AX6Info](#AX6Info)</code>  
<a name="AX6Info.wheelEnm"></a>

### AX6Info.wheelEnm : <code>Object</code>
브라우저에 따른 마우스 휠 이벤트이름

**Kind**: static property of <code>[AX6Info](#AX6Info)</code>  
<a name="AX6Info.errorMsg"></a>

### AX6Info.errorMsg : <code>Object</code>
첫번째 자리수 동사 - (필요한것이 없을때 : 4, 실행오류 : 5)
두번째 자리수 목적어 - 문자열 0, 숫자 1, 배열 2, 오브젝트 3, 함수 4, DOM 5, 파일 6, 기타 7
세번째 자리수 옵션

**Kind**: static property of <code>[AX6Info](#AX6Info)</code>  
<a name="AX6Info.urlUtil"></a>

### AX6Info.urlUtil() ⇒ <code>Object</code>
현재 페이지의 Url 정보를 리턴합니다.

**Kind**: static method of <code>[AX6Info](#AX6Info)</code>  
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
<a name="AX6Info.getError"></a>

### AX6Info.getError() ⇒ <code>Object</code>
ax5-error-msg.js 에 정의된 ax5 error를 반환합니다.

**Kind**: static method of <code>[AX6Info](#AX6Info)</code>  
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
<a name="AX6Info.supportTouch"></a>

### AX6Info.supportTouch() ⇒ <code>boolean</code>
브라우져의 터치 가능 유무를 확인합니다.

**Kind**: static method of <code>[AX6Info](#AX6Info)</code>  
**Example**  
```
var chkFlag = AX6Info.supportTouch;
