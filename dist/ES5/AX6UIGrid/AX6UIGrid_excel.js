"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jqmin = require("jqmin");

var _jqmin2 = _interopRequireDefault(_jqmin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var base64 = function base64(s) {
    return window.btoa(unescape(encodeURIComponent(s)));
};

var uri = "data:application/vnd.ms-excel;base64,";

var getExcelTmpl = function getExcelTmpl() {
    return "\uFEFF\n{{#tables}}{{{body}}}{{/tables}}\n";
};

var tableToExcel = function tableToExcel(table, fileName) {
    var link = void 0,
        a = void 0,
        output = void 0,
        tables = [].concat(table);

    output = ax5.mustache.render(getExcelTmpl(), {
        worksheet: function () {
            var arr = [];
            tables.forEach(function (t, ti) {
                arr.push({ name: "Sheet" + (ti + 1) });
            });
            return arr;
        }(),
        tables: function () {
            var arr = [];
            tables.forEach(function (t, ti) {
                arr.push({ body: t });
            });
            return arr;
        }()
    });

    var isChrome = navigator.userAgent.indexOf("Chrome") > -1,
        isSafari = !isChrome && navigator.userAgent.indexOf("Safari") > -1,
        isIE = /*@cc_on!@*/false || !!document.documentMode; // this works with IE10 and IE11 both :)

    var blob1 = void 0,
        blankWindow = void 0,
        $iframe = void 0,
        iframe = void 0,
        anchor = void 0;

    if (navigator.msSaveOrOpenBlob) {
        blob1 = new Blob([output], { type: "text/html" });
        window.navigator.msSaveOrOpenBlob(blob1, fileName);
    } else if (isSafari) {
        // 사파리는 지원이 안되므로 그냥 테이블을 클립보드에 복사처리
        //tables
        blankWindow = window.open('about:blank', this.id + '-excel-export', 'width=600,height=400');
        blankWindow.document.write(output);
        blankWindow = null;
    } else {
        if (isIE && typeof Blob === "undefined") {
            //otherwise use the iframe and save
            //requires a blank iframe on page called txtArea1
            $iframe = (0, _jqmin2.default)('<iframe id="' + this.id + '-excel-export" style="display:none"></iframe>');
            (0, _jqmin2.default)(document.body).append($iframe);

            iframe = window[this.id + '-excel-export'];
            iframe.document.open("text/html", "replace");
            iframe.document.write(output);
            iframe.document.close();
            iframe.focus();
            iframe.document.execCommand("SaveAs", true, fileName);
            $iframe.remove();
        } else {
            // Attempt to use an alternative method
            anchor = document.body.appendChild(document.createElement("a"));

            // If the [download] attribute is supported, try to use it
            if ("download" in anchor) {
                anchor.download = fileName;
                //anchor.href = URL.createObjectURL( blob );
                anchor.href = uri + base64(output);
                anchor.click();
                document.body.removeChild(anchor);
            }
        }
    }

    return true;
};

exports.default = {
    export: tableToExcel
};