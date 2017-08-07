## Classes

<dl>
<dt><a href="#AX6UIUploader">AX6UIUploader</a></dt>
<dd></dd>
</dl>

## Members

<dl>
<dt><a href="#tmpl">tmpl</a></dt>
<dd><p><del>~</del><del>~</del><del>~</del><del>~ end of import  ~</del><del>~</del><del>~</del><del>~</del>~~</p>
</dd>
</dl>

<a name="AX6UIUploader"></a>

## AX6UIUploader
**Kind**: global class  

* [AX6UIUploader](#AX6UIUploader)
    * [new AX6UIUploader(config)](#new_AX6UIUploader_new)
    * [.config](#AX6UIUploader+config) : <code>JSON</code>
    * [.defaultBtns](#AX6UIUploader+defaultBtns) : <code>JSON</code>
    * [.uploadedFiles](#AX6UIUploader+uploadedFiles) : <code>Array</code>
    * [.$target](#AX6UIUploader+$target) : <code>jQuery</code>
    * [.$inputFile](#AX6UIUploader+$inputFile) : <code>jQuery</code>
    * [.$inputFileForm](#AX6UIUploader+$inputFileForm) : <code>jQuery</code>
    * [.$fileSelector](#AX6UIUploader+$fileSelector) : <code>jQuery</code>
    * [.$dropZone](#AX6UIUploader+$dropZone) : <code>jQuery</code>
    * [.$uploadedBox](#AX6UIUploader+$uploadedBox) : <code>jQuery</code>
    * [.__uploading](#AX6UIUploader+__uploading) : <code>Boolean</code>
    * [.selectedFiles](#AX6UIUploader+selectedFiles) : <code>Array</code>
    * [.selectedFilesTotal](#AX6UIUploader+selectedFilesTotal) : <code>Number</code>
    * [.__loaded](#AX6UIUploader+__loaded) : <code>Number</code>
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

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| config |  |  |  |
| config.target | <code>Element</code> |  |  |
| [config.theme] |  | <code>&#x27;default&#x27;</code> |  |
| [config.lang] |  |  |  |
| [config.lang.upload] |  | <code>&#x27;Upload&#x27;</code> |  |
| [config.lang.abort] |  | <code>&#x27;Abort&#x27;</code> |  |
| [config.animateTime] |  | <code>100</code> |  |
| [config.accept] |  | <code>&quot;*\/*&quot;</code> |  |
| [config.multiple] |  | <code>false</code> |  |
| [config.manualUpload] |  | <code>false</code> |  |
| [config.progressBox] |  | <code>true</code> |  |
| [config.progressBoxDirection] |  | <code>&#x27;left&#x27;</code> | top, bottom, left, right, auto |
| [config.form] |  |  |  |
| [config.form.action] |  | <code>&#x27;&#x27;</code> |  |
| [config.form.fileName] |  | <code>&#x27;file&#x27;</code> |  |
| [config.dropZone] |  |  |  |
| [config.dropZone.target] | <code>Element</code> |  |  |
| [config.uploadedBox] |  |  |  |
| [config.uploadedBox.target] | <code>Element</code> |  |  |
| [config.uploadedBox.icon] |  |  |  |
| [config.uploadedBox.icon.download] |  | <code>&#x27;U+2913&#x27;</code> |  |
| [config.uploadedBox.icon.delete] |  | <code>&#x27;U+232b&#x27;</code> |  |
| [config.uploadedBox.columnKeys.name] |  | <code>&#x27;name&#x27;</code> |  |
| [config.uploadedBox.columnKeys.type] |  | <code>&#x27;type&#x27;</code> |  |
| [config.uploadedBox.columnKeys.size] |  | <code>&#x27;size&#x27;</code> |  |
| [config.uploadedBox.columnKeys.uploadedName] |  | <code>&#x27;uploadedName&#x27;</code> |  |
| [config.uploadedBox.columnKeys.uploadedPath] |  | <code>&#x27;uploadedPath&#x27;</code> |  |
| [config.uploadedBox.columnKeys.downloadPath] |  | <code>&#x27;downloadPath&#x27;</code> |  |
| [config.uploadedBox.columnKeys.previewPath] |  | <code>&#x27;previewPath&#x27;</code> |  |
| [config.uploadedBox.columnKeys.thumbnail] |  | <code>&#x27;thumbnail&#x27;</code> |  |
| [config.uploadedBox.lang] |  |  |  |
| [config.uploadedBox.lang.supportedHTML5_emptyListMsg] |  | <code>&#x27;Drop files here or click to upload.&#x27;</code> |  |
| [config.uploadedBox.lang.emptyListMsg] |  | <code>&#x27;Empty of List.&#x27;</code> |  |
| [config.uploadedBox.onchange] | <code>function</code> |  |  |
| [config.uploadedBox.onclick] | <code>function</code> |  |  |
| [config.onprogress] | <code>function</code> |  |  |
| [config.onuploaderror] | <code>function</code> |  |  |
| [config.onuploaded] | <code>function</code> |  |  |
| [config.onuploadComplete] | <code>function</code> |  |  |

<a name="AX6UIUploader+defaultBtns"></a>

### aX6UIUploader.defaultBtns : <code>JSON</code>
버튼속성

**Kind**: instance property of <code>[AX6UIUploader](#AX6UIUploader)</code>  
<a name="AX6UIUploader+uploadedFiles"></a>

### aX6UIUploader.uploadedFiles : <code>Array</code>
업로드된 파일

**Kind**: instance property of <code>[AX6UIUploader](#AX6UIUploader)</code>  
<a name="AX6UIUploader+$target"></a>

### aX6UIUploader.$target : <code>jQuery</code>
업로더 타겟

**Kind**: instance property of <code>[AX6UIUploader](#AX6UIUploader)</code>  
<a name="AX6UIUploader+$inputFile"></a>

### aX6UIUploader.$inputFile : <code>jQuery</code>
input file 태그

**Kind**: instance property of <code>[AX6UIUploader](#AX6UIUploader)</code>  
<a name="AX6UIUploader+$inputFileForm"></a>

### aX6UIUploader.$inputFileForm : <code>jQuery</code>
input form

**Kind**: instance property of <code>[AX6UIUploader](#AX6UIUploader)</code>  
<a name="AX6UIUploader+$fileSelector"></a>

### aX6UIUploader.$fileSelector : <code>jQuery</code>
파일 선택 버튼

**Kind**: instance property of <code>[AX6UIUploader](#AX6UIUploader)</code>  
<a name="AX6UIUploader+$dropZone"></a>

### aX6UIUploader.$dropZone : <code>jQuery</code>
파일 드랍존

**Kind**: instance property of <code>[AX6UIUploader](#AX6UIUploader)</code>  
<a name="AX6UIUploader+$uploadedBox"></a>

### aX6UIUploader.$uploadedBox : <code>jQuery</code>
파일 목록 표시박스

**Kind**: instance property of <code>[AX6UIUploader](#AX6UIUploader)</code>  
<a name="AX6UIUploader+__uploading"></a>

### aX6UIUploader.__uploading : <code>Boolean</code>
업로드 진행 상태바

**Kind**: instance property of <code>[AX6UIUploader](#AX6UIUploader)</code>  
<a name="AX6UIUploader+selectedFiles"></a>

### aX6UIUploader.selectedFiles : <code>Array</code>
선택된 파일들

**Kind**: instance property of <code>[AX6UIUploader](#AX6UIUploader)</code>  
<a name="AX6UIUploader+selectedFilesTotal"></a>

### aX6UIUploader.selectedFilesTotal : <code>Number</code>
선택된 파일의 전체 크기

**Kind**: instance property of <code>[AX6UIUploader](#AX6UIUploader)</code>  
<a name="AX6UIUploader+__loaded"></a>

### aX6UIUploader.__loaded : <code>Number</code>
전송된 파일 크기

**Kind**: instance property of <code>[AX6UIUploader](#AX6UIUploader)</code>  
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
<a name="tmpl"></a>

## tmpl
~~~~~~~~~~~~~~~~~~ end of import  ~~~~~~~~~~~~~~~~~~~~

**Kind**: global variable  
