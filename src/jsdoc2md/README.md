# Usage

https://github.com/jsdoc2md/jsdoc-to-markdown 를 설치합니다.
```
$ npm install -g jsdoc-to-markdown
```

build.sh 를 실행하여 md파일을 만들어 줍니다 끝.

# 문법

## 오브젝트
```
/**
 * 상수모음
 * @namespace AX6Info
 */
 
 /**
  * 에러 출력메세지 사용자 재 정의
  * @member {Object} AX6Info.onerror
  * @example
  * '''js
  * AX6Info.onerror = function(){
  *  console.log(arguments);
  * }
  * '''
  */
 ```

## 클래스
```js
/**
 *  @class
 */
class AX6UICore {
    /**
     * @constructor
     */
    constructor() {
        this.initialized = false;
        this.instanceId = AX6UICore.getInstanceId();
    }

    /**
     * @method
     * @param config
     * @param [config.name]
     * @return {AX6UICore}
     */
    setConfig(config) {
        _.merge(this.config, config);

        this.init();
        return this;
    }
}
```