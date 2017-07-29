<a name="AX6UIUploader"></a>

## AX6UIUploader
**Kind**: global class  

* [AX6UIUploader](#AX6UIUploader)
    * [new AX6UIUploader(config)](#new_AX6UIUploader_new)
    * [.config](#AX6UIUploader+config) : <code>JSON</code>
    * [.init()](#AX6UIUploader+init)
    * [.initOnce()](#AX6UIUploader+initOnce)
    * [.send()](#AX6UIUploader+send) ⇒ <code>[AX6UIUploader](#AX6UIUploader)</code>
    * [.abort()](#AX6UIUploader+abort) ⇒ <code>[AX6UIUploader](#AX6UIUploader)</code>
    * [.setUploadedFiles(_files)](#AX6UIUploader+setUploadedFiles) ⇒ <code>[AX6UIUploader](#AX6UIUploader)</code>
    * [.clear()](#AX6UIUploader+clear) ⇒ <code>[AX6UIUploader](#AX6UIUploader)</code>
    * [.removeFile(_index)](#AX6UIUploader+removeFile) ⇒ <code>[AX6UIUploader](#AX6UIUploader)</code>
    * [.removeFileAll()](#AX6UIUploader+removeFileAll) ⇒ <code>[AX6UIUploader](#AX6UIUploader)</code>
    * [.selectFile()](#AX6UIUploader+selectFile) ⇒ <code>Boolean</code>

<a name="new_AX6UIUploader_new"></a>

### new AX6UIUploader(config)

| Param |
| --- |
| config | 

<a name="AX6UIUploader+config"></a>

### aX6UIUploader.config : <code>JSON</code>
**Kind**: instance property of <code>[AX6UIUploader](#AX6UIUploader)</code>  

| Param |
| --- |
| config | 

<a name="AX6UIUploader+init"></a>

### aX6UIUploader.init()
**Kind**: instance method of <code>[AX6UIUploader](#AX6UIUploader)</code>  
<a name="AX6UIUploader+initOnce"></a>

### aX6UIUploader.initOnce()
**Kind**: instance method of <code>[AX6UIUploader](#AX6UIUploader)</code>  
<a name="AX6UIUploader+send"></a>

### aX6UIUploader.send() ⇒ <code>[AX6UIUploader](#AX6UIUploader)</code>
**Kind**: instance method of <code>[AX6UIUploader](#AX6UIUploader)</code>  
<a name="AX6UIUploader+abort"></a>

### aX6UIUploader.abort() ⇒ <code>[AX6UIUploader](#AX6UIUploader)</code>
**Kind**: instance method of <code>[AX6UIUploader](#AX6UIUploader)</code>  
<a name="AX6UIUploader+setUploadedFiles"></a>

### aX6UIUploader.setUploadedFiles(_files) ⇒ <code>[AX6UIUploader](#AX6UIUploader)</code>
**Kind**: instance method of <code>[AX6UIUploader](#AX6UIUploader)</code>  

| Param | Type | Description |
| --- | --- | --- |
| _files | <code>Array</code> | JSON formatting can all be overridden in columnKeys. |

**Example**  
```js
$.ajax({
    url: "api/fileListLoad.php",
    success: function (res) {
        // res JSON format
        // [{
        // "name": "barcode-scan-ani.gif",
        // "saveName": "barcode-scan-ani.gif",
        // "type": "file",
        // "fileSize": "3891664",
        // "uploadedPath": "/ax5ui-uploader/test/api/files",
        // "thumbUrl": ""
        // }]
        upload.setUploadedFiles(res);
    }
});
```
<a name="AX6UIUploader+clear"></a>

### aX6UIUploader.clear() ⇒ <code>[AX6UIUploader](#AX6UIUploader)</code>
clear uploadedFiles

**Kind**: instance method of <code>[AX6UIUploader](#AX6UIUploader)</code>  
<a name="AX6UIUploader+removeFile"></a>

### aX6UIUploader.removeFile(_index) ⇒ <code>[AX6UIUploader](#AX6UIUploader)</code>
Removes the object corresponding to the index passed to the argument from uploadedFiles.

**Kind**: instance method of <code>[AX6UIUploader](#AX6UIUploader)</code>  

| Param | Type |
| --- | --- |
| _index | <code>Number</code> | 

**Example**  
```js
// The actual file is not deleted
upload.removeFile(fileIndex);
```
<a name="AX6UIUploader+removeFileAll"></a>

### aX6UIUploader.removeFileAll() ⇒ <code>[AX6UIUploader](#AX6UIUploader)</code>
Empty uploadedFiles

**Kind**: instance method of <code>[AX6UIUploader](#AX6UIUploader)</code>  
**Example**  
```js

```
<a name="AX6UIUploader+selectFile"></a>

### aX6UIUploader.selectFile() ⇒ <code>Boolean</code>
**Kind**: instance method of <code>[AX6UIUploader](#AX6UIUploader)</code>  
