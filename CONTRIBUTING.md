# Contribution Guide

## Issue 작성
Issue 작성 시 참고해주세요.

* 이슈작성은 버그만 해주세요. 기타 질문은 (https://jsdev.kr/c/axisj/ax6ui)에 해주세요.
* 작성하려는 이슈가 이미 있는지 검색 후 등록해주세요. 비슷한 이슈가 있다면 댓글로 추가 내용을 덧붙일 수 있습니다.
* 이슈에는 하나의 문제 또는 제안을 작성해주세요. 절대 하나의 이슈에 2개 이상의 내용을 적지마세요.
* 이슈는 가능한 상세하고 간결하게 작성해주세요.
	* 필요하다면 화면을 캡처하여 이미지를 업로드할 수 있습니다.

## Pull request(PR)
* dist 폴더는 변경하지 마세요. (npm 배포용으로 사용됩니다.)

## Coding Guidelines
코드를 기여할 때 Coding conventions을 따라야합니다.

* 모든 text 파일의 charset은 BOM이 없는 UTF-8입니다.
* 들여쓰기는 2개의 공백으로 합니다.
* `const onResetColumns = function () {` , `if () {` `for (let c = 0, cl = row.cols.length; c < cl; c++) {` 와 같이 공백을 유지해주세요.
#### 참고
```js
if (U.isNumber(colGroup[i].width)) {
  totalWidth += colGroup[i]._width = colGroup[i].width;
} else if (colGroup[i].width === "*") {
  autoWidthColgroupIndexs.push(i);
} else if (U.right(colGroup[i].width, 1) === "%") {
  totalWidth += colGroup[i]._width = CT_WIDTH * U.left(colGroup[i].width, "%") / 100;
}
```
* 코드를 설명하기위해 jsdoc3를 사용중입니다. http://usejsdoc.org/ 를 참고하여 주세요.
* **Coding convention에 맞지 않는 코드를 발견 하더라도 목적과 관계 없는 코드는 절대 고치지 마세요.**