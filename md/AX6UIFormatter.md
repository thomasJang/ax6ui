<a name="AX6UIFormatter"></a>

## AX6UIFormatter
**Kind**: global class  

* [AX6UIFormatter](#AX6UIFormatter)
    * [new AX6UIFormatter(config)](#new_AX6UIFormatter_new)
    * _instance_
        * [.config](#AX6UIFormatter+config) : <code>JSON</code>
        * [.queue](#AX6UIFormatter+queue) : <code>Array</code>
        * [.init()](#AX6UIFormatter+init)
        * [.initOnce()](#AX6UIFormatter+initOnce) ⇒ <code>[AX6UIFormatter](#AX6UIFormatter)</code>
        * [.bind(opts)](#AX6UIFormatter+bind) ⇒ <code>[AX6UIFormatter](#AX6UIFormatter)</code>
        * [.formatting()](#AX6UIFormatter+formatting) ⇒ <code>[AX6UIFormatter](#AX6UIFormatter)</code>
        * [.unbind(opts)](#AX6UIFormatter+unbind) ⇒ <code>[AX6UIFormatter](#AX6UIFormatter)</code>
    * _static_
        * [.setFormatter(_formatter)](#AX6UIFormatter.setFormatter)
        * [.getFormatter()](#AX6UIFormatter.getFormatter) ⇒ <code>Object</code>
        * [.getCtrlKeys()](#AX6UIFormatter.getCtrlKeys) ⇒ <code>Object</code>
        * [.getNumKeys()](#AX6UIFormatter.getNumKeys) ⇒ <code>Object</code>

<a name="new_AX6UIFormatter_new"></a>

### new AX6UIFormatter(config)

| Param | Type |
| --- | --- |
| config |  | 
| [config.formatter] | <code>Object</code> | 

**Example**  
```js
var formatter = new Formatter();

// Extend formatter
var myFormatter = new Formatter({
 formatter: {
     "mystyle": {
         getEnterableKeyCodes: function (_opts) {
             var enterableKeyCodes = {
                 '189': '-' // eventKeyCode
             };
             return jQuery.extend(enterableKeyCodes, {});
         }
         getPatternValue: function (_opts, optIdx, e, val, eType) {
             val = val.replace(/\D/g, "");
             var regExpPattern = /^([0-9]{2})\-?([0-9]{2})?\-?([0-9]{2})?\-?([0-9]{2})?/;
             return val.replace(regExpPattern, function (a, b) {
                 var nval = [arguments[1]];
                 if (arguments[2]) nval.push(arguments[2]);
                 if (arguments[3]) nval.push(arguments[3]);
                 if (arguments[4]) nval.push(arguments[4]);
                 return nval.join("-");
             });
         }
     }
 }
});
```
<a name="AX6UIFormatter+config"></a>

### aX6UIFormatter.config : <code>JSON</code>
**Kind**: instance property of <code>[AX6UIFormatter](#AX6UIFormatter)</code>  

| Param | Default |
| --- | --- |
| config |  | 
| [config.animateTime] | <code>250</code> | 

<a name="AX6UIFormatter+queue"></a>

### aX6UIFormatter.queue : <code>Array</code>
**Kind**: instance property of <code>[AX6UIFormatter](#AX6UIFormatter)</code>  
<a name="AX6UIFormatter+init"></a>

### aX6UIFormatter.init()
**Kind**: instance method of <code>[AX6UIFormatter](#AX6UIFormatter)</code>  
<a name="AX6UIFormatter+initOnce"></a>

### aX6UIFormatter.initOnce() ⇒ <code>[AX6UIFormatter](#AX6UIFormatter)</code>
**Kind**: instance method of <code>[AX6UIFormatter](#AX6UIFormatter)</code>  
<a name="AX6UIFormatter+bind"></a>

### aX6UIFormatter.bind(opts) ⇒ <code>[AX6UIFormatter](#AX6UIFormatter)</code>
**Kind**: instance method of <code>[AX6UIFormatter](#AX6UIFormatter)</code>  

| Param | Type |
| --- | --- |
| opts | <code>Object</code> | 
| opts.target | <code>Element</code> | 

<a name="AX6UIFormatter+formatting"></a>

### aX6UIFormatter.formatting() ⇒ <code>[AX6UIFormatter](#AX6UIFormatter)</code>
**Kind**: instance method of <code>[AX6UIFormatter](#AX6UIFormatter)</code>  
<a name="AX6UIFormatter+unbind"></a>

### aX6UIFormatter.unbind(opts) ⇒ <code>[AX6UIFormatter](#AX6UIFormatter)</code>
**Kind**: instance method of <code>[AX6UIFormatter](#AX6UIFormatter)</code>  

| Param |
| --- |
| opts | 

<a name="AX6UIFormatter.setFormatter"></a>

### AX6UIFormatter.setFormatter(_formatter)
**Kind**: static method of <code>[AX6UIFormatter](#AX6UIFormatter)</code>  

| Param |
| --- |
| _formatter | 

<a name="AX6UIFormatter.getFormatter"></a>

### AX6UIFormatter.getFormatter() ⇒ <code>Object</code>
**Kind**: static method of <code>[AX6UIFormatter](#AX6UIFormatter)</code>  
<a name="AX6UIFormatter.getCtrlKeys"></a>

### AX6UIFormatter.getCtrlKeys() ⇒ <code>Object</code>
**Kind**: static method of <code>[AX6UIFormatter](#AX6UIFormatter)</code>  
<a name="AX6UIFormatter.getNumKeys"></a>

### AX6UIFormatter.getNumKeys() ⇒ <code>Object</code>
**Kind**: static method of <code>[AX6UIFormatter](#AX6UIFormatter)</code>  
