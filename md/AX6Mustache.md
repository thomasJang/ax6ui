<a name="AX6Mustache"></a>

## AX6Mustache : <code>object</code>
AX6Mustache는 http://github.com/janl/mustache.js에 몇가지 최소한의 기능을 튜닝하여 사용하는 템플릿 엔진입니다.

**Kind**: global namespace  
<a name="AX6Mustache.render"></a>

### AX6Mustache.render()
**Kind**: static method of <code>[AX6Mustache](#AX6Mustache)</code>  
**Example**  
```js
ax5.mustache.render(template, view)


//Array @i
//{{#beatles}}
//{{firstName}} {{lastName}} ({{@i}}) ({{@first}})
//{{/beatles}}

//Object @each
{{#beatles}}
 {{#@each}}
     {{@key}} : {{@value.firstName}} {{@value.lastName}}
 {{/@each}}
{{/beatles}}

```
