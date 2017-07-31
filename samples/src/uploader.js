import $ from "jqmin";
import axios from "axios";
import Dialog from "../../src/AX6UIDialog";
import Uploader from "../../src/AX6UIUploader";


const $body = $("#sample-body");
let el = `
<div data-ax6ui-uploader="upload1">
    <button data-ax6ui-uploader-button="selector" class="btn btn-primary">Select File (*/*)</button>
    (Upload Max fileSize 20MB)
    <div data-uploaded-box="upload1" data-ax6ui-uploader-uploaded-box="inline"></div>
</div>

<div style="padding: 0;" data-btn-wrap="">
    <h5>control</h5>
    <a class="waves-effect waves-light btn" data-btn="getUploadedFiles">getUploadedFiles</a>
    <a class="waves-effect waves-light btn" data-btn="removeFileAll">removeFileAll</a>
</div>
`;
$body.append(el);


/////~~~~~~~~~~~~~~~~~~
let dialog = new Dialog({
  title: "AX6UIUploader"
});
let uploader = new Uploader({
  //debug: true,
  target: $body.find('[data-ax6ui-uploader="upload1"]'),
  form: {
    action: "http://api-demo.ax5.io/api/v1/ax5uploader",
    fileName: "file"
  },
  multiple: true,
  manualUpload: false,
  progressBox: true,
  progressBoxDirection: "left",
  dropZone: {
    target: $body.find('[data-uploaded-box="upload1"]')
  },
  uploadedBox: {
    target: $body.find('[data-uploaded-box="upload1"]'),
    icon: {
      "download": '<i class="material-icons">file_download</i>',
      "delete": '<i class="material-icons">delete</i>'
    },
    columnKeys: {
      name: "fileName",
      type: "ext",
      size: "fileSize",
      uploadedName: "saveName",
      uploadedPath: "",
      downloadPath: "",
      previewPath: "",
      thumbnail: ""
    },
    lang: {
      supportedHTML5_emptyListMsg: 'Drop files here or click to upload.',
      emptyListMsg: 'Empty of List.'
    },
    onchange: function () {

    },
    onclick: function () {
      // console.log(this.cellType);
      let fileIndex = this.fileIndex;
      let file = this.uploadedFiles[fileIndex];
      switch (this.cellType) {
        case "delete":
          dialog.confirm({
            title: "AX5UI",
            msg: "Are you sure you want to delete it?"
          }, function () {
            if (this.key == "ok") {

              axios({
                headers: {
                  'Content-Type': "application/json",
                },
                method: "post",
                url: 'http://api-demo.ax5.io/api/v1/ax5uploader/delete',
                data: JSON.stringify([{
                  id: file.id
                }]),
              }).then(res => {
                uploader.removeFile(fileIndex);
              }).catch(error => {
                dialog.alert(error);
              });

            }
          });
          break;

        case "download":
          if (file.download) {
            location.href = "http://api-demo.ax5.io" + file.download;
          }
          break;
      }
    }
  },
  validateSelectedFiles: function () {
    console.log(this);
    // 10개 이상 업로드 되지 않도록 제한.
    if (this.uploadedFiles.length + this.selectedFiles.length > 10) {
      alert("You can not upload more than 10 files.");
      return false;
    }
    return true;
  },
  onprogress: function () {

  },
  onuploaderror: function () {
    console.log(this.error);
    dialog.alert(this.error.message);
  },
  onuploaded: function () {

  },
  onuploadComplete: function () {

  }
});

// 파일 목록 가져오기
axios({
  method: 'get',
  url: 'http://api-demo.ax5.io/api/v1/ax5uploader'
}).then(res => {
  uploader.setUploadedFiles(res.data);
}).catch(error => {
  console.log(error);
});

$body.on("click", '[data-btn]', (e) => {
  let btn = e.currentTarget.getAttribute("data-btn");
  let processor = {
    "getUploadedFiles"() {
      let files = uploader.uploadedFiles;
      console.log(files);
      dialog.alert(JSON.stringify(files));
    },
    "removeFileAll"() {
      dialog.confirm({
        title: "AX6UIUploader",
        msg: "Are you sure you want to delete it?"
      }, function () {
        if (this.key == "ok") {
          let deleteFiles = [];
          uploader.uploadedFiles.forEach(function (f) {
            deleteFiles.push({id: f.id});
          });

          axios({
            headers: {
              'Content-Type': "application/json",
            },
            method: "post",
            url: 'http://api-demo.ax5.io/api/v1/ax5uploader/delete',
            data: JSON.stringify(deleteFiles),
          }).then(res => {
            uploader.removeFileAll();
          }).catch(error => {
            console.log(error);
          });

        }
      });
    }
  };

  if (btn in processor) {
    processor[btn]();
  }
});