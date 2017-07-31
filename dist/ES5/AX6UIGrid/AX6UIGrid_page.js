"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AX6Util = require("../AX6Util");

var _AX6Util2 = _interopRequireDefault(_AX6Util);

var _AX6Mustache = require("../AX6Mustache");

var _AX6Mustache2 = _interopRequireDefault(_AX6Mustache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onclickPageMove = function onclickPageMove(_act) {
  var callback = function callback(_pageNo) {
    if (this.page.currentPage != _pageNo) {
      this.page.selectPage = _pageNo;
      if (this.config.page.onChange) {
        this.config.page.onChange.call({
          self: this,
          page: this.page,
          data: this.data
        });
      }
    }
  };
  var processor = {
    "first": function first() {
      callback.call(this, 0);
    },
    "prev": function prev() {
      var pageNo = this.page.currentPage - 1;
      if (pageNo < 0) pageNo = 0;
      callback.call(this, pageNo);
    },
    "next": function next() {
      var pageNo = this.page.currentPage + 1;
      if (pageNo > this.page.totalPages - 1) pageNo = this.page.totalPages - 1;
      callback.call(this, pageNo);
    },
    "last": function last() {
      callback.call(this, this.page.totalPages - 1);
    }
  };

  if (_act in processor) {
    processor[_act].call(this);
  } else {
    callback.call(this, _act - 1);
  }
};

var navigationUpdate = function navigationUpdate() {
  var self = this;
  if (this.page) {
    var page = {
      hasPage: false,
      currentPage: this.page.currentPage,
      pageSize: this.page.pageSize,
      totalElements: this.page.totalElements,
      totalPages: this.page.totalPages,
      firstIcon: this.config.page.firstIcon,
      prevIcon: this.config.page.prevIcon || "«",
      nextIcon: this.config.page.nextIcon || "»",
      lastIcon: this.config.page.lastIcon
    };
    var navigationItemCount = this.config.page.navigationItemCount;

    page["@paging"] = function () {
      var returns = [],
          startI = void 0,
          endI = void 0;

      startI = page.currentPage - Math.floor(navigationItemCount / 2);
      if (startI < 0) startI = 0;
      endI = page.currentPage + navigationItemCount;
      if (endI > page.totalPages) endI = page.totalPages;

      if (endI - startI > navigationItemCount) {
        endI = startI + navigationItemCount;
      }

      if (endI - startI < navigationItemCount) {
        startI = endI - navigationItemCount;
      }
      if (startI < 0) startI = 0;

      for (var p = startI, l = endI; p < l; p++) {
        returns.push({ 'pageNo': p + 1, 'selected': page.currentPage == p });
      }
      return returns;
    }();

    if (page["@paging"].length > 0) {
      page.hasPage = true;
    }

    this.$["page"]["navigation"].html(_AX6Mustache2.default.render(this.__tmpl.page_navigation.call(this), page));
    this.$["page"]["navigation"].find("[data-ax6grid-page-move]").on("click", function () {
      onclickPageMove.call(self, this.getAttribute("data-ax6grid-page-move"));
    });
  } else {
    this.$["page"]["navigation"].empty();
  }
};

var statusUpdate = function statusUpdate() {
  if (!this.config.page.statusDisplay) {
    return;
  }

  var toRowIndex = void 0;
  var data = {};

  toRowIndex = this.xvar.virtualPaintStartRowIndex + this.xvar.virtualPaintRowCount;

  if (toRowIndex > this.xvar.dataRowCount) {
    toRowIndex = this.xvar.dataRowCount;
  }

  data.fromRowIndex = _AX6Util2.default.number(this.xvar.virtualPaintStartRowIndex + 1, { "money": true });
  data.toRowIndex = _AX6Util2.default.number(toRowIndex, { "money": true });
  data.totalElements = false;
  data.dataRealRowCount = this.xvar.dataRowCount !== this.xvar.dataRealRowCount ? _AX6Util2.default.number(this.xvar.dataRealRowCount, { "money": true }) : false;
  data.dataRowCount = _AX6Util2.default.number(this.xvar.dataRowCount, { "money": true });
  data.progress = this.appendProgress ? this.config.appendProgressIcon : "";

  if (this.page) {
    data.fromRowIndex_page = _AX6Util2.default.number(this.xvar.virtualPaintStartRowIndex + this.page.currentPage * this.page.pageSize + 1, { "money": true });
    data.toRowIndex_page = _AX6Util2.default.number(this.xvar.virtualPaintStartRowIndex + this.xvar.virtualPaintRowCount + this.page.currentPage * this.page.pageSize, { "money": true });
    data.totalElements = _AX6Util2.default.number(this.page.totalElements, { "money": true });

    if (data.toRowIndex_page > this.page.totalElements) {
      data.toRowIndex_page = this.page.totalElements;
    }
  }

  this.$["page"]["status"].html(_AX6Mustache2.default.render(this.__tmpl.page_status.call(this), data));
};

exports.default = {
  navigationUpdate: navigationUpdate,
  statusUpdate: statusUpdate
};