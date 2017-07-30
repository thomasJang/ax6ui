import jQuery from "jqmin";
import AX6UICore from "./AX6UICore.js";
import U from "./AX6Util";
import info from "./AX6Info";
import mustache from "./AX6Mustache";

import "./AX6UIUploader/index.scss";

let tmpl = {
  uploadProgress(columnKeys) {
    return ``;
  },
  inputFile(columnKeys) {
    return `<input type="file" data-ax6ui-uploader-input="{{instanceId}}" name="{{name}}" {{#multiple}}multiple{{/multiple}} accept="{{accept}}" />`;
  },
  inputFileForm(columnKeys) {
    return `<form data-ax6ui-uploader-form="{{instanceId}}" name="ax5uploader-{{instanceId}}-form" method="post" enctype="multipart/form-data"></form>`;
  },
  progressBox(columnKeys) {
    return `
<div data-ax6ui-uploader-progressbox="{{instanceId}}" class="{{theme}}">
    <div class="ax-progressbox-body">
        <div class="ax-pregressbox-content">
            <div class="progress">
              <div class="progress-bar progress-bar-striped active" role="progressbar" style="width: 0">
                <span class="sr-only">0% Complete</span>
              </div>
            </div>
        </div>
        {{#btns}}
            <div class="ax-progressbox-buttons">
            {{#btns}}
                {{#@each}}
                <button data-pregressbox-btn="{{@key}}" class="btn btn-default {{@value.theme}}">{{@value.label}}</button>
                {{/@each}}
            {{/btns}}
            </div>
        {{/btns}}
    </div>
    <div class="ax-progressbox-arrow"></div>
</div>
`;
  },
  upoadedBox(columnKeys) {
    return `
{{#uploadedFiles}}<div data-ax6ui-uploader-uploaded-item="{{@i}}">
    <div class="uploaded-item-preview">
        {{#${columnKeys.thumbnail}}}<img src="${columnKeys.apiServerUrl}{{${columnKeys.thumbnail}}}">{{/${columnKeys.thumbnail}}}
    </div>
    <div class="uploaded-item-holder">
        <div class="uploaded-item-cell" data-uploaded-item-cell="download">{{{icon.download}}}</div>
        <div class="uploaded-item-cell" data-uploaded-item-cell="filename">{{${columnKeys.name}}}</div>
        <div class="uploaded-item-cell" data-uploaded-item-cell="filesize">({{#@fn_get_byte}}{{${columnKeys.size}}}{{/@fn_get_byte}})</div>
        <div class="uploaded-item-cell" data-uploaded-item-cell="delete">{{{icon.delete}}}</div>
    </div>
</div>{{/uploadedFiles}}
{{^uploadedFiles}}
{{#supportFileApi}}{{{lang.supportedHTML5_emptyListMsg}}}{{/supportFileApi}}
{{^supportFileApi}}{{{lang.emptyListMsg}}}{{/supportFileApi}}
{{/uploadedFiles}}
`;
  }
};

const bound_onStateChanged = function (that) {
  if (this.config.onStateChanged) {
    this.config.onStateChanged.call(that, that);
  }
  else if (this.onStateChanged) {
    this.onStateChanged.call(that, that);
  }

  that = null;
  return true;
};
const bound_onSelectFile = function (_evt) {
  let files;

  if (!info.supportFileApi) {
    // file API 지원 안되는 브라우저.
    // input file에 multiple 지원 안됨 그러므로 단일 파일 처리만 하면 됨.
    files = {path: _evt.target.value};
  }
  else if ('dataTransfer' in _evt) {
    files = _evt.dataTransfer.files;
  }
  else if ('target' in _evt) {
    files = _evt.target.files;
  }
  else if (_evt) {
    files = _evt;
  }

  if (!files) return false;

  /// selectedFiles에 현재 파일 정보 담아두기
  if (length in files) {
    if (files.length == 1) {
      this.selectedFiles = [files[0]];
    } else {
      this.selectedFiles = U.toArray(files);
    }
  } else {
    this.selectedFiles = [files];
  }

  if (this.config.progressBox) {
    bound_openProgressBox.call(this);
  }
  if (!this.config.manualUpload) {
    this.send();
  }

  if (!info.supportFileApi) {
    bound_alignLayout.call(this, false);
  }
};
const bound_bindEvent = function () {
  this.$fileSelector
    .off("click.ax5uploader")
    .on("click.ax5uploader", e => {
      this.$inputFile.trigger("click");
    });

  if (!info.supportFileApi) {
    this.$fileSelector
      .off("mouseover.ax5uploader")
      .on("mouseover.ax5uploader", e => {
        bound_alignLayout.call(this, true);
      });

    this.$inputFile
      .off("mouseover.ax5uploader")
      .on("mouseover.ax5uploader", e => {
        this.$fileSelector.addClass("active");
      });

    this.$inputFile
      .off("mouseout.ax5uploader")
      .on("mouseout.ax5uploader", e => {
        this.$fileSelector.removeClass("active");
        bound_alignLayout.call(this, false);
      });
  }

  {
    if (!this.$uploadedBox || !this.$uploadedBox.get(0)) return false;

    this.$uploadedBox.on("click", "[data-uploaded-item-cell]", e => {
      let $this = jQuery(e.currentTarget),
        cellType = $this.attr("data-uploaded-item-cell"),
        uploadedItemIndex = Number($this.parents('[data-ax6ui-uploader-uploaded-item]').attr('data-ax6ui-uploader-uploaded-item')),
        that = {};

      if (this.config.uploadedBox && this.config.uploadedBox.onclick) {
        that = {
          self: this,
          cellType: cellType,
          uploadedFiles: self.uploadedFiles,
          fileIndex: uploadedItemIndex
        };
        this.config.uploadedBox.onclick.call(that, that);
      }

      $this = null;
      cellType = null;
      uploadedItemIndex = null;
      that = null;
    });

    this.$uploadedBox
      .on("dragstart", function (e) {
        U.stopEvent(e);
        return false;
      });
  }

  {
    // dropZone 설정 방식 변경
    if (!info.supportFileApi) return false;
    if (!this.$dropZone || !this.$dropZone.get(0)) return false;

    let timer;

    this.$dropZone.parent()
      .on("click", "[data-ax6ui-uploader-dropzone]", e => {
        let $target = jQuery(e.currentTarget);
        if ($target.parents('[data-ax6ui-uploader-uploaded-item]').length == 0 && !$target.attr('data-ax6ui-uploader-uploaded-item')) {
          if (e.currentTarget == e.target || $.contains(e.currentTarget, e.target)) {
            if (U.isFunction(this.config.dropZone.onclick)) {
              this.config.dropZone.onclick.call({
                self: this
              });
            } else {
              this.$inputFile.trigger("click");
            }
          }
        }
      });

    this.$dropZone.get(0).addEventListener('dragover', e => {
      U.stopEvent(e);

      if (U.isFunction(this.config.dropZone.ondragover)) {
        this.config.dropZone.ondragover.call({
          self: this
        });
      }
      else {
        this.$dropZone.addClass("dragover");
      }

    }, false);

    this.$dropZone.get(0).addEventListener('dragleave', e => {
      U.stopEvent(e);

      if (U.isFunction(this.config.dropZone.ondragover)) {
        this.config.dropZone.ondragout.call({
          self: this
        });
      }
      else {
        this.$dropZone.removeClass("dragover");
      }

    }, false);

    this.$dropZone.get(0).addEventListener('drop', e => {
      U.stopEvent(e);

      if (U.isFunction(this.config.dropZone.ondrop)) {
        this.config.dropZone.ondrop.call({
          self: this
        });
      }
      else {
        this.$dropZone.removeClass("dragover");
      }

      bound_onSelectFile.call(this, e || window.event);
    }, false);

  }
};
const bound_alignLayout = function (_TF) {
  // 상황이 좋지 않은경우 (만약 버튼 클릭으로 input file click이 되지 않는 다면 z-index값을 높여서 버튼위를 덮는다.)
  if (_TF) {
    if (!info.supportFileApi) {
      // ie9에서 inputFile을 직접 클릭하지 않으면 submit 오류발생함. submit access denied
      // 그래서 버튼위에 inputFile을 올려두어야 함. (position값을 이용하면 편하지만..)
      // 그런데 form을 안에두면 또 다른 이중폼 문제 발생소지 ㅜㅜ 불가피하게 버튼의 offset 값을 이용.
      let box = this.$fileSelector.offset();
      box.width = this.$fileSelector.outerWidth();
      box.height = this.$fileSelector.outerHeight();
      this.$inputFile.css(box);
    }
  } else {
    this.$inputFile.css({
      left: -1000, top: -1000
    });
  }
}
const bound_alignProgressBox = function (append) {
  const _alignProgressBox = function () {
    let $window = jQuery(window), $body = jQuery(document.body);
    let pos = {}, positionMargin = 6,
      dim = {}, pickerDim = {},
      pickerDirection;

    // this.config.viewport.selector

    pos = (this.$progressBox.parent().get(0) == this.$target.get(0)) ? this.$fileSelector.position() : this.$fileSelector.offset();
    dim = {
      width: this.$fileSelector.outerWidth(),
      height: this.$fileSelector.outerHeight()
    };
    pickerDim = {
      winWidth: Math.max($window.width(), $body.width()),
      winHeight: Math.max($window.height(), $body.height()),
      width: this.$progressBox.outerWidth(),
      height: this.$progressBox.outerHeight()
    };

    // picker css(width, left, top) & direction 결정
    if (!this.config.progressBoxDirection || this.config.progressBoxDirection === "" || this.config.progressBoxDirection === "auto") {
      // set direction
      pickerDirection = "top";
      if (pos.top - pickerDim.height - positionMargin < 0) {
        pickerDirection = "top";
      } else if (pos.top + dim.height + pickerDim.height + positionMargin > pickerDim.winHeight) {
        pickerDirection = "bottom";
      }
    } else {
      pickerDirection = this.config.progressBoxDirection;
    }

    if (append) {
      this.$progressBox
        .addClass("direction-" + pickerDirection);
    }

    let positionCSS = (function () {
      let css = {left: 0, top: 0};
      switch (pickerDirection) {
        case "top":
          css.left = pos.left + dim.width / 2 - pickerDim.width / 2;
          css.top = pos.top + dim.height + positionMargin;
          break;
        case "bottom":
          css.left = pos.left + dim.width / 2 - pickerDim.width / 2;
          css.top = pos.top - pickerDim.height - positionMargin;
          break;
        case "left":
          css.left = pos.left + dim.width + positionMargin;
          css.top = pos.top - pickerDim.height / 2 + dim.height / 2;
          break;
        case "right":
          css.left = pos.left - pickerDim.width - positionMargin;
          css.top = pos.top - pickerDim.height / 2 + dim.height / 2;
          break;
      }
      return css;
    })();

    {
      if (pickerDirection == "top" || pickerDirection == "bottom") {
        if (positionCSS.left < 0) {
          positionCSS.left = positionMargin;
          this.$progressBoxArrow.css({left: (pos.left + dim.width / 2) - positionCSS.left});
        } else if (positionCSS.left + pickerDim.width > pickerDim.winWidth) {
          positionCSS.left = pickerDim.winWidth - pickerDim.width - positionMargin;
          this.$progressBoxArrow.css({left: (pos.left + dim.width / 2) - positionCSS.left});
        }
      }
    }

    this.$progressBox
      .css(positionCSS);
  };

  this.$progressBox.css({top: -999});

  if (append) {
    // progressBox를 append 할 타겟 엘리먼트 펀단 후 결정.
    (function () {
      if (this.config.viewport) {
        return jQuery(this.config.viewport.selector);
      } else {
        return this.$target;
      }
    }).call(this).append(this.$progressBox);

    // progressBox 버튼에 이벤트 연결.
    this.$progressBox
      .off("click.ax5uploader")
      .on("click.ax5uploader", "button", e => {
        let act = e.currentTarget.getAttribute("data-pregressbox-btn");
        let processor = {
          "upload": function () {
            this.send();
          },
          "abort": function () {
            this.abort();
          }
        };
        if (processor[act]) processor[act].call(this);
      });
  }

  setTimeout(() => {
    _alignProgressBox.call(this);
  });
};
const bound_openProgressBox = function () {
  this.$progressBox.removeClass("destroy");
  this.$progressUpload.removeAttr("disabled");
  this.$progressAbort.removeAttr("disabled");

  // apend & align progress box
  bound_alignProgressBox.call(this, "append");

  // state change
  bound_onStateChanged.call(this, {
    self: this,
    state: "open"
  });
};
const bound_closeProgressBox = function () {
  this.$progressBox.addClass("destroy");
  setTimeout(() => {
    this.$progressBox
      .remove();
  }, this.config.animateTime);
};
const bound_startUpload = function () {
  const processor = {
    "html5"() {
      const self = this;
      let uploadFile = this.selectedFiles.shift();
      if (!uploadFile) {
        // 업로드 종료
        bound_uploadComplete.call(this);
        return this;
      }

      if (uploadFile[0]) uploadFile = uploadFile[0];

      let formData = new FormData();
      //서버로 전송해야 할 추가 파라미터 정보 설정

      this.$target.find("input").each(function () {
        formData.append(this.name, this.value);
      });
      // 파일 아이템 추가
      formData.append(this.config.form.fileName, uploadFile);

      this.xhr = new XMLHttpRequest();
      this.xhr.open("post", this.config.form.action, true);
      this.xhr.onload = function (e) {
        let res = e.target.response;
        try {
          if (typeof res == "string") res = U.parseJson(res);
        }
        catch (e) {
          return false;
        }
        if (self.config.debug) console.log(res);

        if (res.error) {
          if (self.config.debug) console.log(res.error);
          if (U.isFunction(self.config.onuploaderror)) {
            self.config.onuploaderror.call({
              self: self,
              error: res.error
            }, res);
          }
          self.send();
          return false;
        }

        bound_uploaded.call(self, res);
        self.send();
      };
      this.xhr.upload.onprogress = function (e) {
        // console.log(e.loaded, e.total);
        bound_updateProgressBar.call(self, e);
        if (U.isFunction(self.config.onprogress)) {
          self.config.onprogress.call({
            loaded: e.loaded,
            total: e.total
          }, e);
        }
      };
      this.xhr.send(formData);  // multipart/form-data

    },
    "form"() {

      /// i'm busy
      this.__uploading = true;

      // 폼과 iframe을 만들어 페이지 아래에 삽입 후 업로드
      let $iframe = jQuery('<iframe src="javascript:false;" name="ax5uploader-' + this.instanceId + '-iframe" style="display:none;"></iframe>');
      jQuery(document.body).append($iframe);

      // onload 이벤트 핸들러
      // action에서 파일을 받아 처리한 결과값을 텍스트로 출력한다고 가정하고 iframe의 내부 데이터를 결과값으로 callback 호출
      $iframe.on('load', e => {
        let doc = e.currentTarget.contentWindow ? e.currentTarget.contentWindow.document : (e.currentTarget.contentDocument ? e.currentTarget.contentDocument : e.currentTarget.document),
          root = doc.documentElement ? doc.documentElement : doc.body,
          result = root.textContent ? root.textContent : root.innerText,
          res;

        try {
          res = JSON.parse(result);
        }
        catch (e) {
          res = {
            error: "Syntax error",
            body: result
          };
        }

        if (this.config.debug) console.log(res);
        if (res.error) {
          console.log(res);
        }
        else {
          bound_uploaded.call(this, res);
          $iframe.remove();

          setTimeout(() => {
            bound_uploadComplete.call(this);
          }, 300);
        }
      });

      this.$inputFileForm
        .attr("target", 'ax5uploader-' + this.instanceId + '-iframe')
        .attr("action", this.config.form.action)
        .submit();

      this.selectedFilesTotal = 1;
      bound_updateProgressBar.call(this, {
        loaded: 1,
        total: 1
      });
    }
  };

  if (this.__uploading === false) {
    // 전체 파일 사이즈 구하기
    let filesTotal = 0;
    this.selectedFiles.forEach(function (n) {
      filesTotal += n.size;
    });
    this.selectedFilesTotal = filesTotal;
    this.__loaded = 0;

    this.__uploading = true; // 업로드 시작 상태 처리
    this.$progressUpload.attr("disabled", "disabled");
    this.$progressAbort.removeAttr("disabled");
  }

  processor[info.supportFileApi ? "html5" : "form"].call(this);

};
const bound_updateProgressBar = function (e) {
  this.__loaded += e.loaded;
  this.$progressBar.css({width: U.number(this.__loaded / this.selectedFilesTotal * 100, {round: 2}) + '%'});
  if (e.lengthComputable) {
    if (e.loaded >= e.total) {

    }
  }
};
const bound_uploaded = function (res) {
  if (this.config.debug) console.log(res);
  this.uploadedFiles.push(res);
  bound_repaintUploadedBox.call(this); // 업로드된 파일 출력

  if (U.isFunction(this.config.onuploaded)) {
    this.config.onuploaded.call({
      self: this
    }, res);
  }
};
const bound_uploadComplete = function () {
  this.__uploading = false; // 업로드 완료 상태처리
  this.$progressUpload.removeAttr("disabled");
  this.$progressAbort.attr("disabled", "disabled");

  if (this.config.progressBox) {
    bound_closeProgressBox.call(this);
  }
  if (U.isFunction(this.config.onuploadComplete)) {
    this.config.onuploadComplete.call({
      self: this
    });
  }
  // update uploadedFiles display

  /// reset inputFile
  bound_attachFileTag.call(this);
};
const bound_cancelUpload = function () {

  let processor = {
    "html5": function () {
      if (this.xhr) {
        this.xhr.abort();
      }
    },
    "form": function () {

    }
  };

  this.__uploading = false; // 업로드 완료 상태처리
  this.$progressUpload.removeAttr("disabled");
  this.$progressAbort.attr("disabled", "disabled");

  processor[info.supportFileApi ? "html5" : "form"].call(this);

  if (this.config.progressBox) {
    bound_closeProgressBox.call(this);
  }

  //this.$inputFile.val("");
  /// reset inputFile
  bound_attachFileTag.call(this);

  if (this.config.debug) console.log("cancelUpload");
  // update uploadedFiles display
};
const bound_repaintUploadedBox = function () {
  // uploadedBox 가 없다면 아무일도 하지 않음.
  // onuploaded 함수 이벤트를 이용하여 개발자가 직접 업로드디 박스를 구현 한다고 이해 하자.
  if (this.$uploadedBox === null) return this;

  this.$uploadedBox.html(
    mustache.render(tmpl.upoadedBox.call(this, this.config.uploadedBox.columnKeys), {
      uploadedFiles: this.uploadedFiles,
      icon: this.config.uploadedBox.icon,
      lang: this.config.uploadedBox.lang,
      supportFileApi: !!info.supportFileApi
    })
  );
  this.$uploadedBox.find("img").on("error", function () {
    //this.src = "";
    $(this).parent().addClass("no-image");
  });

};
const bound_attachFileTag = function () {
  if (this.$inputFile && this.$inputFile.get(0)) {
    this.$inputFile.remove();
  }
  if (this.$inputFileForm && this.$inputFileForm.get(0)) {
    this.$inputFileForm.remove();
  }

  this.$inputFile = jQuery(
    mustache.render(tmpl.inputFile.call(this), {
      instanceId: this.instanceId,
      multiple: this.config.multiple,
      accept: this.config.accept,
      name: this.config.form.fileName
    })
  );

  if (info.supportFileApi) {
    jQuery(document.body).append(this.$inputFile);
  } else {
    this.$fileSelector.attr("tabindex", -1);
    this.$inputFileForm = jQuery(
      mustache.render(tmpl.inputFileForm.call(this), {
        instanceId: this.instanceId
      })
    );

    this.$inputFileForm.append(this.$inputFile);
    jQuery(document.body).append(this.$inputFileForm);
  }

  this.$inputFile
    .off("change.ax5uploader")
    .on("change.ax5uploader", e => {
      bound_onSelectFile.call(this, e);
    });
};

/**
 * @class
 */
class AX6UIUploader extends AX6UICore {
  /**
   * @constructor
   * @param config
   */
  constructor(config) {
    super();

    /**
     * @member {JSON}
     * @param config
     *
     */
    this.config = {
      clickEventName: "click", //(('ontouchstart' in document.documentElement) ? "touchend" : "click"),
      theme: 'default', // theme of uploader
      lang: { // 업로더 버튼 랭귀지 설정
        "upload": "Upload",
        "abort": "Abort"
      },
      uploadedBox: {
        columnKeys: {
          name: "name",
          type: "type",
          size: "size",
          uploadedName: "uploadedName",
          uploadedPath: "uploadedPath",
          downloadPath: "downloadPath",
          previewPath: "previewPath",
          thumbnail: "thumbnail"
        }
      },
      animateTime: 100,
      accept: "*/*", // 업로드 선택 파일 타입 설정
      multiple: false, // 다중 파일 업로드
      manualUpload: false, // 업로딩 시작 수동처리 여부
      progressBox: true // 업로드 프로그래스 박스 사용여부 false 이면 업로드 진행바를 표시 하지 않습니다. 개발자가 onprogress 함수를 이용하여 직접 구현 해야 합니다.
    };
    jQuery.extend(true, this.config, config);

    // 멤버 변수 초기화
    this.defaultBtns = {
      "upload": {label: this.config.lang["upload"], theme: "btn-primary"},
      "abort": {label: this.config.lang["abort"], theme: this.config.theme}
    };

    /// 업로드된 파일 큐
    this.uploadedFiles = [];
    /// 업로더 타겟
    this.$target = null;
    /// 업로드된 파일 정보들의 input 태그를 담아두는 컨테이너
    this.$inputContainer = null;
    /// input file 태그
    this.$inputFile = null;
    this.$inputFileForm = null;
    /// 파일 선택버튼
    this.$fileSelector = null;
    /// 파일 드랍존
    this.$dropZone = null;
    /// 파일 목록 표시박스
    this.$uploadedBox = null;

    this.__uploading = false;
    this.selectedFiles = [];
    this.selectedFilesTotal = 0;
    this.__loaded = 0;

    if (typeof config !== "undefined") this.init();
  }

  /**
   * @method
   */
  init() {
    this.onStateChanged = this.config.onStateChanged;
    delete this.config.onStateChanged;

    if (this.config.target) {
      this.$target = jQuery(this.config.target);

      // 파일 드랍존은 옵션 사항.
      if (this.config.dropZone && this.config.dropZone.target && info.supportFileApi) {
        this.$dropZone = jQuery(this.config.dropZone.target);
        this.$dropZone
          .attr("data-ax6ui-uploader-dropzone", this.instanceId);
      }

      // uploadedBox 옵션 사항
      if (this.config.uploadedBox && this.config.uploadedBox.target) {
        this.$uploadedBox = jQuery(this.config.uploadedBox.target);
      }

      // target attribute data
      (function (data) {
        if (U.isObject(data) && !data.error) {
          this.config = jQuery.extend(true, {}, this.config, data);
        }
      }).call(this, U.parseJson(this.$target.attr("data-ax6ui-uploader-config"), true));


      // detect element
      /// fileSelector 수집
      this.$fileSelector = this.$target.find('[data-ax6ui-uploader-button="selector"]');
      if (this.$fileSelector.length === 0) {
        console.log(info.getError("ax6ui-uploader", "402", "can not find file selector"));
        return this;
      }

      // input file 추가
      bound_attachFileTag.call(this);

      // btns 확인
      this.config.btns = jQuery.extend({}, this.defaultBtns, this.config.btns);

      this.$progressBox = jQuery(
        mustache.render(tmpl.progressBox.call(this), {
          instanceId: this.instanceId,
          btns: this.config.btns
        })
      );
      this.$progressBar = this.$progressBox.find('[role="progressbar"]');
      this.$progressBoxArrow = this.$progressBox.find(".ax-progressbox-arrow");
      this.$progressUpload = this.$progressBox.find('[data-pregressbox-btn="upload"]');
      this.$progressAbort = this.$progressBox.find('[data-pregressbox-btn="abort"]');

      // file API가 지원되지 않는 브라우저는 중지 기능 제공 못함.
      if (!info.supportFileApi) {
        this.$progressAbort.hide();
      }
      // 파일버튼 등에 이벤트 연결.
      bound_bindEvent.call(this);

      bound_repaintUploadedBox.call(this);

    }
    // init 호출 여부
    this.initOnce();
  }

  /**
   * @method
   */
  initOnce() {
    if (this.initialized) return this;
    this.initialized = true;
  }


  /**
   * @method
   * @returns {AX6UIUploader}
   *
   */
  send() {
    // 업로드 시작
    if (U.isFunction(this.config.validateSelectedFiles)) {
      let that = {
        self: this,
        uploadedFiles: this.uploadedFiles,
        selectedFiles: this.selectedFiles
      };
      if (!this.config.validateSelectedFiles.call(that, that)) {
        bound_cancelUpload.call(this);
        return false;
        // 전송처리 안함.
      }
    }

    bound_startUpload.call(this);
    return this;
  }

  /**
   * @method
   * @returns {AX6UIUploader}
   */
  abort() {
    if (!info.supportFileApi) {
      alert("This browser not supported abort method");
      return this;
    }
    bound_cancelUpload.call(this);
    return this;
  }

  /**
   * @method
   * @param {Array} _files - JSON formatting can all be overridden in columnKeys.
   * @returns {AX6UIUploader}
   * @example
   * ```js
   * $.ajax({
   *     url: "api/fileListLoad.php",
   *     success: function (res) {
   *         // res JSON format
   *         // [{
   *         // "name": "barcode-scan-ani.gif",
   *         // "saveName": "barcode-scan-ani.gif",
   *         // "type": "file",
   *         // "fileSize": "3891664",
   *         // "uploadedPath": "/ax5ui-uploader/test/api/files",
   *         // "thumbUrl": ""
   *         // }]
   *         upload.setUploadedFiles(res);
   *     }
   * });
   * ```
   */
  setUploadedFiles(_files) {
    if (U.isArray(_files)) {
      this.uploadedFiles = _files;
    }
    if (U.isString(_files)) {
      try {
        this.uploadedFiles = JSON.parse(_files);
      }
      catch (e) {

      }
    }

    bound_repaintUploadedBox.call(this);
    return this;
  }

  /**
   * clear uploadedFiles
   * @method
   * @returns {AX6UIUploader}
   */
  clear() {
    this.setUploadedFiles([]);
    return this;
  }

  /**
   * Removes the object corresponding to the index passed to the argument from uploadedFiles.
   * @method
   * @param {Number} _index
   * @returns {AX6UIUploader}
   * @example
   * ```js
   * // The actual file is not deleted
   * upload.removeFile(fileIndex);
   * ```
   */
  removeFile(_index) {
    if (!isNaN(Number(_index))) {
      this.uploadedFiles.splice(_index, 1);
    }
    bound_repaintUploadedBox.call(this);
    return this;
  }

  /**
   * Empty uploadedFiles
   * @method
   * @returns {AX6UIUploader}
   * @example
   * ```js
   *
   * ```
   */
  removeFileAll() {
    this.uploadedFiles = [];
    bound_repaintUploadedBox.call(this);
    return this;
  }

  /**
   * @method
   * @returns {Boolean}
   */
  selectFile() {
    if (info.supportFileApi) {
      this.$inputFile.trigger("click");
      return true;
    }
    return false;
  }
}

export default AX6UIUploader;