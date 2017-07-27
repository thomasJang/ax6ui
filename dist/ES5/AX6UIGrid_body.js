"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jqmin = require("jqmin");

var _jqmin2 = _interopRequireDefault(_jqmin);

var _AX6Util = require("./AX6Util");

var _AX6Util2 = _interopRequireDefault(_AX6Util);

var _AX6UIGrid_util = require("./AX6UIGrid_util");

var _AX6UIGrid_util2 = _interopRequireDefault(_AX6UIGrid_util);

var _AX6UIGrid_data = require("./AX6UIGrid_data");

var _AX6UIGrid_data2 = _interopRequireDefault(_AX6UIGrid_data);

var _AX6UIGrid_page = require("./AX6UIGrid_page");

var _AX6UIGrid_page2 = _interopRequireDefault(_AX6UIGrid_page);

var _AX6UIGrid_inline_editor = require("./AX6UIGrid_inline_editor");

var _AX6UIGrid_inline_editor2 = _interopRequireDefault(_AX6UIGrid_inline_editor);

var _AX6UIGrid_collector = require("./AX6UIGrid_collector");

var _AX6UIGrid_collector2 = _interopRequireDefault(_AX6UIGrid_collector);

var _AX6UIGrid_formatter = require("./AX6UIGrid_formatter");

var _AX6UIGrid_formatter2 = _interopRequireDefault(_AX6UIGrid_formatter);

var _AX6UIGrid_scroller = require("./AX6UIGrid_scroller");

var _AX6UIGrid_scroller2 = _interopRequireDefault(_AX6UIGrid_scroller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var columnSelect = {
    focusClear: function focusClear() {
        var self = this,
            _column = void 0;
        for (var c in self.focusedColumn) {
            _column = self.focusedColumn[c];
            if (_column) {
                self.$.panel[_column.panelName].find('[data-ax6grid-tr-data-index="' + _column.dindex + '"]').find('[data-ax6grid-column-rowindex="' + _column.rowIndex + '"][data-ax6grid-column-colindex="' + _column.colIndex + '"]').removeAttr('data-ax6grid-column-focused');
            }
        }
        self.focusedColumn = {};
    },
    clear: function clear() {
        var self = this,
            _column = void 0;
        for (var c in self.selectedColumn) {
            _column = self.selectedColumn[c];
            if (_column) {
                self.$.panel[_column.panelName].find('[data-ax6grid-tr-data-index="' + _column.dindex + '"]').find('[data-ax6grid-column-rowindex="' + _column.rowIndex + '"][data-ax6grid-column-colindex="' + _column.colIndex + '"]').removeAttr('data-ax6grid-column-selected');
            }
        }
        self.selectedColumn = {};
    },
    init: function init(column) {
        var self = this;
        if (this.isInlineEditing) {
            for (var editKey in this.inlineEditing) {
                if (editKey == column.dindex + "_" + column.colIndex + "_" + column.rowIndex) {
                    return this;
                }
            }
        }

        // focus
        columnSelect.focusClear.call(self);
        self.focusedColumn[column.dindex + "_" + column.colIndex + "_" + column.rowIndex] = {
            panelName: column.panelName,
            dindex: column.dindex,
            doindex: column.doindex,
            rowIndex: column.rowIndex,
            colIndex: column.colIndex,
            colspan: column.colspan
        };

        // select
        columnSelect.clear.call(self);
        self.xvar.selectedRange = {
            start: [column.dindex, column.rowIndex, column.colIndex, column.colspan - 1],
            end: null
        };
        self.selectedColumn[column.dindex + "_" + column.colIndex + "_" + column.rowIndex] = function (data) {
            if (data) {
                return false;
            } else {
                return {
                    panelName: column.panelName,
                    dindex: column.dindex,
                    doindex: column.doindex,
                    rowIndex: column.rowIndex,
                    colIndex: column.colIndex,
                    colspan: column.colspan
                };
            }
        }(self.selectedColumn[column.dindex + "_" + column.colIndex + "_" + column.rowIndex]);

        this.$.panel[column.panelName].find('[data-ax6grid-tr-data-index="' + column.dindex + '"]').find('[data-ax6grid-column-rowindex="' + column.rowIndex + '"][data-ax6grid-column-colindex="' + column.colIndex + '"]').attr('data-ax6grid-column-focused', "true").attr('data-ax6grid-column-selected', "true");

        if (this.isInlineEditing) {
            inlineEdit.deActive.call(this, "RETURN");
        }
    },
    update: function update(column) {
        var self = this;
        var dindex = void 0,
            doindex = void 0,
            colIndex = void 0,
            rowIndex = void 0,
            trl = void 0;

        self.xvar.selectedRange["end"] = [column.dindex, column.rowIndex, column.colIndex, column.colspan - 1];
        columnSelect.clear.call(self);

        var range = {
            r: {
                s: Math.min(self.xvar.selectedRange["start"][0], self.xvar.selectedRange["end"][0]),
                e: Math.max(self.xvar.selectedRange["start"][0], self.xvar.selectedRange["end"][0])
            },
            c: {
                s: Math.min(self.xvar.selectedRange["start"][2], self.xvar.selectedRange["end"][2]),
                e: Math.max(self.xvar.selectedRange["start"][2] + self.xvar.selectedRange["start"][3], self.xvar.selectedRange["end"][2] + self.xvar.selectedRange["end"][3])
            }
        };

        dindex = range.r.s;
        for (; dindex <= range.r.e; dindex++) {

            trl = this.bodyRowTable.rows.length;
            rowIndex = 0;
            for (; rowIndex < trl; rowIndex++) {
                colIndex = range.c.s;
                for (; colIndex <= range.c.e; colIndex++) {
                    var _panels = [],
                        panelName = "";

                    if (self.xvar.frozenRowIndex > dindex) _panels.push("top");
                    if (self.xvar.frozenColumnIndex > colIndex) _panels.push("left");
                    _panels.push("body");
                    if (_panels[0] !== "top") _panels.push("scroll");
                    panelName = _panels.join("-");

                    self.selectedColumn[dindex + "_" + colIndex + "_" + rowIndex] = {
                        panelName: panelName,
                        dindex: dindex,
                        rowIndex: rowIndex,
                        colIndex: colIndex,
                        colspan: column.colspan
                    };

                    _panels = null;
                    panelName = null;
                }
            }
        }
        dindex = null;
        doindex = null;
        colIndex = null;
        rowIndex = null;

        for (var c in self.selectedColumn) {
            var _column = self.selectedColumn[c];
            if (_column) {
                self.$.panel[_column.panelName].find('[data-ax6grid-tr-data-index="' + _column.dindex + '"]').find('[data-ax6grid-column-rowindex="' + _column.rowIndex + '"][data-ax6grid-column-colindex="' + _column.colIndex + '"]').attr('data-ax6grid-column-selected', 'true');
            }
        }
    }
};

var columnSelector = {
    "on": function on(cell) {
        var self = this;

        if (this.inlineEditing[cell.dindex + "_" + cell.colIndex + "_" + cell.rowIndex]) {
            return;
        }

        columnSelect.init.call(self, cell);

        this.$["container"]["body"].on("mousemove.ax5grid-" + this.instanceId, '[data-ax6grid-column-attr="default"]', function (e) {
            if (this.getAttribute("data-ax6grid-column-rowIndex")) {
                columnSelect.update.call(self, {
                    panelName: this.getAttribute("data-ax6grid-panel-name"),
                    dindex: Number(this.getAttribute("data-ax6grid-data-index")),
                    doindex: Number(this.getAttribute("data-ax6grid-data-o-index")),
                    rowIndex: Number(this.getAttribute("data-ax6grid-column-rowIndex")),
                    colIndex: Number(this.getAttribute("data-ax6grid-column-colIndex")),
                    colspan: Number(this.getAttribute("colspan"))
                });
                _AX6Util2.default.stopEvent(e);
            }
        }).on("mouseup.ax5grid-" + this.instanceId, function () {
            columnSelector.off.call(self);
        }).on("mouseleave.ax5grid-" + this.instanceId, function () {
            columnSelector.off.call(self);
        });

        (0, _jqmin2.default)(document.body).attr('unselectable', 'on').css('user-select', 'none').on('selectstart', false);
    },
    "off": function off() {

        this.$["container"]["body"].off("mousemove.ax5grid-" + this.instanceId).off("mouseup.ax5grid-" + this.instanceId).off("mouseleave.ax5grid-" + this.instanceId);

        (0, _jqmin2.default)(document.body).removeAttr('unselectable').css('user-select', 'auto').off('selectstart');
    }
};

var updateRowState = function updateRowState(_states, _dindex, _doindex, _data) {
    var self = this,
        cfg = this.config,
        processor = {
        "selected": function selected(_dindex, _doindex) {
            if (this.list[_doindex]) {
                var i = this.$.livePanelKeys.length;
                while (i--) {
                    this.$.panel[this.$.livePanelKeys[i]].find('[data-ax6grid-tr-data-index="' + _dindex + '"]').attr("data-ax6grid-selected", this.list[_doindex][cfg.columnKeys.selected]);
                }
            }
        },
        "selectedClear": function selectedClear() {
            var di = this.list.length;
            var pi = void 0;

            if (!this.proxyList) {
                while (di--) {
                    if (this.list[di][cfg.columnKeys.selected]) {
                        pi = this.$.livePanelKeys.length;
                        while (pi--) {
                            this.$.panel[this.$.livePanelKeys[pi]].find('[data-ax6grid-tr-data-index="' + di + '"]').attr("data-ax6grid-selected", false);
                        }
                    }
                    this.list[di][cfg.columnKeys.selected] = false;
                }
            } else {
                while (di--) {
                    this.list[di][cfg.columnKeys.selected] = false;
                }
                di = this.proxyList.length;
                while (di--) {
                    if (this.list[doi][cfg.columnKeys.selected]) {
                        pi = this.$.livePanelKeys.length;
                        while (pi--) {
                            this.$.panel[this.$.livePanelKeys[pi]].find('[data-ax6grid-tr-data-index="' + di + '"]').attr("data-ax6grid-selected", false);
                        }
                    }

                    this.proxyList[di][cfg.columnKeys.selected] = false;
                    var doi = this.proxyList[di].__original_index__;
                }
            }
        },
        "cellChecked": function cellChecked(_dindex, _doindex, _data) {
            var key = _data.key,
                rowIndex = _data.rowIndex,
                colIndex = _data.colIndex;

            var panelName = function () {
                var _panels = [];
                if (this.xvar.frozenRowIndex > _dindex) _panels.push("top");
                if (this.xvar.frozenColumnIndex > colIndex) _panels.push("left");
                _panels.push("body");
                if (_panels[0] !== "top") _panels.push("scroll");
                return _panels.join("-");
            }.call(this);

            this.$.panel[panelName].find('[data-ax6grid-tr-data-index="' + _dindex + '"]').find('[data-ax6grid-column-rowIndex="' + rowIndex + '"][data-ax6grid-column-colIndex="' + colIndex + '"]').find('[data-ax6grid-editor="checkbox"]').attr("data-ax6grid-checked", '' + _data.checked);
        }
    };

    if (typeof _doindex === "undefined") _doindex = _dindex;

    _states.forEach(function (_state) {
        if (!processor[_state]) throw 'invaild state name';
        processor[_state].call(self, _dindex, _doindex, _data);
    });
};

var updateRowStateAll = function updateRowStateAll(_states, _data) {
    var self = this,
        cfg = this.config,
        processor = {
        "selected": function selected(_dindex) {
            repaint.call(this, true);
        }
    };

    _states.forEach(function (_state) {
        if (!processor[_state]) throw 'invaild state name';
        processor[_state].call(self, _data);
    });
};

var init = function init() {
    var self = this;

    this.$["container"]["body"].on("click", '[data-ax6grid-column-attr]', function (e) {
        var panelName = void 0,
            attr = void 0,
            row = void 0,
            col = void 0,
            dindex = void 0,
            doindex = void 0,
            rowIndex = void 0,
            colIndex = void 0,
            disableSelection = void 0,
            targetClick = {
            "default": function _default(_column) {
                var column = self.bodyRowMap[_column.rowIndex + "_" + _column.colIndex],
                    that = {
                    self: self,
                    page: self.page,
                    list: self.list,
                    item: self.list[_column.doindex],
                    dindex: _column.dindex,
                    doindex: _column.doindex,
                    rowIndex: _column.rowIndex,
                    colIndex: _column.colIndex,
                    column: column,
                    value: self.list[_column.dindex][column.key]
                };

                if (column.editor && column.editor.type == "checkbox") {
                    // todo : INLINE_EDITOR에서 처리 할수 있도록 구문 변경 필요.
                    var value = _AX6UIGrid_data2.default.getValue.call(self, _column.dindex, _column.doindex, column.key),
                        checked = void 0,
                        newValue = void 0;

                    if (column.editor.config && column.editor.config.trueValue) {
                        if (checked = !(value == column.editor.config.trueValue)) {
                            newValue = column.editor.config.trueValue;
                        } else {
                            newValue = column.editor.config.falseValue;
                        }
                    } else {
                        newValue = checked = value == false || value == "false" || value < "1" ? "true" : "false";
                    }

                    _AX6UIGrid_data2.default.setValue.call(self, _column.dindex, _column.doindex, column.key, newValue);

                    updateRowState.call(self, ["cellChecked"], _column.dindex, _column.doindex, {
                        key: column.key, rowIndex: _column.rowIndex, colIndex: _column.colIndex,
                        editorConfig: column.editor.config, checked: checked
                    });
                } else {
                    if (self.config.body.onClick) {
                        self.config.body.onClick.call(that);
                    }
                }
            },
            "rowSelector": function rowSelector(_column) {
                var item = self.list[_column.doindex];
                if (item[self.config.columnKeys.disableSelection]) {
                    return false;
                }

                if (!self.config.multipleSelect && self.selectedDataIndexs[0] !== _column.doindex) {
                    updateRowState.call(self, ["selectedClear"]);
                    _AX6UIGrid_data2.default.clearSelect.call(self);
                }

                _AX6UIGrid_data2.default.select.call(self, _column.dindex, _column.doindex, undefined, {
                    internalCall: true
                });
                updateRowState.call(self, ["selected"], _column.dindex, _column.doindex);
            },
            "lineNumber": function lineNumber(_column) {},
            "tree-control": function treeControl(_column, _el) {
                //console.log(_column);
                toggleCollapse.call(self, _column.dindex, _column.doindex);
            }
        };

        panelName = this.getAttribute("data-ax6grid-panel-name");
        attr = this.getAttribute("data-ax6grid-column-attr");
        row = Number(this.getAttribute("data-ax6grid-column-row"));
        col = Number(this.getAttribute("data-ax6grid-column-col"));
        rowIndex = Number(this.getAttribute("data-ax6grid-column-rowIndex"));
        colIndex = Number(this.getAttribute("data-ax6grid-column-colIndex"));
        dindex = Number(this.getAttribute("data-ax6grid-data-index"));
        doindex = Number(this.getAttribute("data-ax6grid-data-o-index"));

        if (attr in targetClick) {
            targetClick[attr]({
                panelName: panelName,
                attr: attr,
                row: row,
                col: col,
                dindex: dindex,
                doindex: doindex,
                rowIndex: rowIndex,
                colIndex: colIndex
            }, this);
        }
    });
    this.$["container"]["body"].on("dblclick", '[data-ax6grid-column-attr]', function (e) {
        var panelName = void 0,
            attr = void 0,
            row = void 0,
            col = void 0,
            dindex = void 0,
            doindex = void 0,
            rowIndex = void 0,
            colIndex = void 0,
            targetDBLClick = {
            "default": function _default(_column) {
                if (self.isInlineEditing) {
                    for (var columnKey in self.inlineEditing) {
                        if (columnKey == _column.dindex + "_" + _column.colIndex + "_" + _column.rowIndex) {
                            return this;
                        }
                    }
                }

                var column = self.bodyRowMap[_column.rowIndex + "_" + _column.colIndex],
                    value = "";
                if (column) {
                    if (!self.list[dindex].__isGrouping) {
                        value = _AX6UIGrid_data2.default.getValue.call(self, dindex, doindex, column.key);
                    }
                }

                var editor = self.colGroup[_column.colIndex].editor;
                if (_AX6Util2.default.isObject(editor)) {
                    inlineEdit.active.call(self, self.focusedColumn, e, value);
                } else {
                    // 더블클릭 실행
                    if (self.config.body.onDBLClick) {
                        var that = {
                            self: self,
                            page: self.page,
                            list: self.list,
                            item: self.list[_column.dindex],
                            dindex: _column.dindex,
                            doindex: _column.doindex,
                            rowIndex: _column.rowIndex,
                            colIndex: _column.colIndex,
                            column: column,
                            value: self.list[_column.dindex][column.key]
                        };
                        self.config.body.onDBLClick.call(that);
                    }
                }
            },
            "rowSelector": function rowSelector(_column) {},
            "lineNumber": function lineNumber(_column) {}
        };

        panelName = this.getAttribute("data-ax6grid-panel-name");
        attr = this.getAttribute("data-ax6grid-column-attr");
        row = Number(this.getAttribute("data-ax6grid-column-row"));
        col = Number(this.getAttribute("data-ax6grid-column-col"));
        rowIndex = Number(this.getAttribute("data-ax6grid-column-rowIndex"));
        colIndex = Number(this.getAttribute("data-ax6grid-column-colIndex"));
        dindex = Number(this.getAttribute("data-ax6grid-data-index"));
        doindex = Number(this.getAttribute("data-ax6grid-data-o-index"));

        if (attr in targetDBLClick) {
            targetDBLClick[attr]({
                panelName: panelName,
                attr: attr,
                row: row,
                col: col,
                dindex: dindex,
                doindex: doindex,
                rowIndex: rowIndex,
                colIndex: colIndex
            });
        }
    });

    if (this.config.contextMenu) {
        this.$["container"]["body"].on("contextmenu", function (e) {
            var target = void 0,
                dindex = void 0,
                doindex = void 0,
                rowIndex = void 0,
                colIndex = void 0,
                item = void 0,
                column = void 0,
                param = {};

            target = _AX6Util2.default.findParentNode(e.target, function (t) {
                if (t.getAttribute("data-ax6grid-column-attr")) {
                    return true;
                }
            });

            if (target) {
                // item 찾기
                rowIndex = Number(target.getAttribute("data-ax6grid-column-rowIndex"));
                colIndex = Number(target.getAttribute("data-ax6grid-column-colIndex"));
                dindex = Number(target.getAttribute("data-ax6grid-data-index"));
                doindex = Number(target.getAttribute("data-ax6grid-data-o-index"));
                column = self.bodyRowMap[rowIndex + "_" + colIndex];
                item = self.list[dindex];
            }

            if (!self.contextMenu) {
                self.contextMenu = new ax5.ui.menu();
            }

            self.contextMenu.setConfig(self.config.contextMenu);

            param = {
                element: target,
                dindex: dindex,
                doindex: doindex,
                rowIndex: rowIndex,
                colIndex: colIndex,
                item: item,
                column: column,
                gridSelf: self
            };

            self.contextMenu.popup(e, {
                filter: function filter() {
                    return self.config.contextMenu.popupFilter.call(this, this, param);
                },
                param: param
            });

            _AX6Util2.default.stopEvent(e.originalEvent);
            target = null;
            dindex = null;
            doindex = null;
            rowIndex = null;
            colIndex = null;
            item = null;
            column = null;
            param = null;
        });
    }

    this.$["container"]["body"].on("mousedown", '[data-ax6grid-column-attr="default"]', function (e) {
        if (self.xvar.touchmoved) return false;
        if (this.getAttribute("data-ax6grid-column-rowIndex")) {
            columnSelector.on.call(self, {
                panelName: this.getAttribute("data-ax6grid-panel-name"),
                dindex: Number(this.getAttribute("data-ax6grid-data-index")),
                doindex: Number(this.getAttribute("data-ax6grid-data-o-index")),
                rowIndex: Number(this.getAttribute("data-ax6grid-column-rowIndex")),
                colIndex: Number(this.getAttribute("data-ax6grid-column-colIndex")),
                colspan: Number(this.getAttribute("colspan"))
            });
        }
    }).on("dragstart", function (e) {
        _AX6Util2.default.stopEvent(e);
        return false;
    });

    resetFrozenColumn.call(this);

    // 그리드 바디에 출력할 여유 카운트
    this.xvar.paintRowCountMargin = this.config.virtualScrollYCountMargin;
    this.xvar.paintRowCountTopMargin = this.config.virtualScrollYCountMargin - Math.floor(this.config.virtualScrollYCountMargin / 2);

    if (this.config.virtualScrollAccelerated) {
        this.__throttledScroll = _AX6Util2.default.throttle(function (css, opts) {
            if (this.config.virtualScrollY && !opts.noRepaint && "top" in css) {
                repaint.call(this);
            } else if (this.config.virtualScrollX && !opts.noRepaint && "left" in css) {
                repaint.call(this);
            }
            if (opts.callback) {
                opts.callback();
            }
        }, this.config.virtualScrollAcceleratedDelayTime);
    } else {
        this.__throttledScroll = false;
    }
};

var resetFrozenColumn = function resetFrozenColumn() {
    var cfg = this.config,
        dividedBodyRowObj = _AX6UIGrid_util2.default.divideTableByFrozenColumnIndex(this.bodyRowTable, this.xvar.frozenColumnIndex);

    this.asideBodyRowData = function (dataTable) {
        var data = { rows: [] };
        for (var i = 0, l = dataTable.rows.length; i < l; i++) {
            data.rows[i] = { cols: [] };
            if (i === 0) {
                var col = {
                    label: "",
                    colspan: 1,
                    rowspan: dataTable.rows.length,
                    colIndex: null
                },
                    _col = {};

                if (cfg.showLineNumber) {
                    _col = _jqmin2.default.extend({}, col, {
                        width: cfg.lineNumberColumnWidth,
                        _width: cfg.lineNumberColumnWidth,
                        columnAttr: "lineNumber",
                        label: "&nbsp;", key: "__d-index__"
                    });
                    data.rows[i].cols.push(_col);
                }
                if (cfg.showRowSelector) {
                    _col = _jqmin2.default.extend({}, col, {
                        width: cfg.rowSelectorColumnWidth,
                        _width: cfg.rowSelectorColumnWidth,
                        columnAttr: "rowSelector",
                        label: "", key: "__d-checkbox__"
                    });
                    data.rows[i].cols.push(_col);
                }
            }
        }

        return data;
    }.call(this, this.bodyRowTable);

    //console.log(dividedBodyRowObj);

    this.leftBodyRowData = dividedBodyRowObj.leftData;
    this.bodyRowData = dividedBodyRowObj.rightData;

    if (cfg.body.grouping) {
        var dividedBodyGroupingObj = _AX6UIGrid_util2.default.divideTableByFrozenColumnIndex(this.bodyGroupingTable, this.xvar.frozenColumnIndex);
        this.asideBodyGroupingData = function (dataTable) {
            var data = { rows: [] };
            for (var i = 0, l = dataTable.rows.length; i < l; i++) {
                data.rows[i] = { cols: [] };
                if (i === 0) {
                    var col = {
                        label: "",
                        colspan: 1,
                        rowspan: dataTable.rows.length,
                        colIndex: null
                    },
                        _col = {};

                    if (cfg.showLineNumber) {
                        _col = _jqmin2.default.extend({}, col, {
                            width: cfg.lineNumberColumnWidth,
                            _width: cfg.lineNumberColumnWidth,
                            columnAttr: "lineNumber",
                            label: "&nbsp;", key: "__d-index__"
                        });
                        data.rows[i].cols.push(_col);
                    }
                    if (cfg.showRowSelector) {
                        _col = _jqmin2.default.extend({}, col, {
                            width: cfg.rowSelectorColumnWidth,
                            _width: cfg.rowSelectorColumnWidth,
                            columnAttr: "rowSelector",
                            label: "", key: "__d-checkbox__"
                        });
                        data.rows[i].cols.push(_col);
                    }
                }
            }

            return data;
        }.call(this, this.bodyGroupingTable);
        this.leftBodyGroupingData = dividedBodyGroupingObj.leftData;
        this.bodyGroupingData = dividedBodyGroupingObj.rightData;
        this.bodyGroupingMap = _AX6UIGrid_util2.default.makeBodyRowMap.call(this, this.bodyGroupingTable);
    }

    this.leftFootSumData = {};
    this.footSumData = {};
    if (this.config.footSum) {
        var dividedFootSumObj = _AX6UIGrid_util2.default.divideTableByFrozenColumnIndex(this.footSumTable, this.xvar.frozenColumnIndex);
        this.leftFootSumData = dividedFootSumObj.leftData;
        this.footSumData = dividedFootSumObj.rightData;
    }
};

var getFieldValue = function getFieldValue(_list, _item, _index, _col, _value, _returnPlainText) {

    var _key = _col.key,
        tagsToReplace = {
        '<': '&lt;',
        '>': '&gt;'
    };

    if (_key === "__d-index__") {
        return typeof _item["__index"] !== "undefined" ? _item["__index"] + 1 : "";
    } else if (_key === "__d-checkbox__") {
        return "<div class=\"checkBox\" style=\"max-height: " + (_col.width - 10) + "px;min-height: " + (_col.width - 10) + "px;\"></div>";
    } else {
        if (_col.editor && function (_editor) {
            if (_editor.type in _AX6UIGrid_inline_editor2.default) {
                return _AX6UIGrid_inline_editor2.default[_editor.type].editMode == "inline";
            }
            return false;
        }(_col.editor)) {
            // editor가 inline타입이라면

            _value = _value || _AX6UIGrid_data2.default.getValue.call(this, _index, _item.__origin_index__, _key);

            if (_AX6Util2.default.isFunction(_col.editor.disabled)) {
                if (_col.editor.disabled.call({
                    list: _list,
                    dindex: _index,
                    item: _list[_index],
                    key: _key,
                    value: _value
                })) {
                    return _value;
                }
            }

            // print editor
            return _returnPlainText ? _value : _AX6UIGrid_inline_editor2.default[_col.editor.type].getHtml(this, _col.editor, _value);
        }

        var valueProcessor = {
            "formatter": function formatter() {
                var that = {
                    key: _key,
                    value: _value || _AX6UIGrid_data2.default.getValue.call(this, _index, _item.__origin_index__, _key),
                    dindex: _index,
                    item: _item,
                    list: _list
                };

                var caller = _AX6Util2.default.isFunction(_col.formatter) ? _col.formatter : this.customFormatter[_col.formatter] || _AX6UIGrid_formatter2.default[_col.formatter];
                return caller ? caller.call(that) : that.value;
            },
            "default": function _default() {
                var returnValue = "";

                if (typeof _value !== "undefined") {
                    returnValue = _value;
                } else {
                    if (/[\.\[\]]/.test(_key)) {
                        _value = _AX6UIGrid_data2.default.getValue.call(this, _index, _item.__origin_index__, _key);
                    } else {
                        _value = _item[_key];
                    }

                    if (_value !== null && typeof _value !== "undefined") returnValue = _value;
                }

                // 키값이 Boolean일때 오류 발생하여 수정.
                return typeof returnValue !== "string" ? returnValue : returnValue.replace(/[<>]/g, function (tag) {
                    return tagsToReplace[tag] || tag;
                });
            },
            "treeControl": function treeControl(__value) {
                var cfg = this.config,
                    keys = this.config.tree.columnKeys,
                    indentNodeHtml = '';

                if (_item[keys.children].length) {
                    indentNodeHtml += '<a ' + 'data-ax6grid-data-index="' + _index + '" ' + 'data-ax6grid-column-attr="tree-control" ' + 'data-ax6grid-tnode-arrow="" ' + 'style="width: ' + cfg.tree.arrowWidth + 'px;padding-left:' + _item[keys.depth] * cfg.tree.indentWidth + 'px;"' + '>';
                    indentNodeHtml += _item[keys.collapse] ? cfg.tree.icons.collapsedArrow : cfg.tree.icons.openedArrow;
                    indentNodeHtml += '</a>';
                } else {
                    indentNodeHtml += '<span ' + 'data-ax6grid-tnode-arrow="" ' + 'style="width: ' + cfg.tree.arrowWidth + 'px;padding-left:' + _item[keys.depth] * cfg.tree.indentWidth + 'px;"' + '>&nbsp;</span>';
                }

                indentNodeHtml += '<span ' + 'data-ax6grid-tnode-item="' + (_item[keys.children].length ? 'group' : 'item') + '" ' + 'style="width: ' + cfg.tree.iconWidth + 'px;"' + '>';
                indentNodeHtml += _item[keys.children].length ? _item[keys.collapse] ? cfg.tree.icons.collapsedGroupIcon : cfg.tree.icons.groupIcon : cfg.tree.icons.itemIcon;
                indentNodeHtml += '</span>';

                return indentNodeHtml + __value;
            }
        };

        var returnValue = _col.formatter ? valueProcessor.formatter.call(this) : valueProcessor.default.call(this);
        if (this.config.tree.use && _col.treeControl) {
            returnValue = valueProcessor.treeControl.call(this, returnValue);
        }

        return returnValue;
    }
};

var getGroupingValue = function getGroupingValue(_item, _index, _col) {
    var value = void 0,
        that = void 0,
        caller = void 0,
        _key = _col.key,
        _label = _col.label;

    if (typeof _key === "undefined") {
        that = {
            key: _key,
            list: _item.__groupingList,
            groupBy: _item.__groupingBy
        };
        if (_AX6Util2.default.isFunction(_label)) {
            value = _label.call(that);
        } else {
            value = _label;
        }
        _item[_col.colIndex] = value;
        return value;
    } else if (_key === "__d-index__") {
        return '';
    } else if (_key === "__d-checkbox__") {
        return '';
    } else {
        if (_col.collector) {
            that = {
                key: _key,
                list: _item.__groupingList
            };
            _item[_col.colIndex] = value = (_AX6Util2.default.isFunction(_col.collector) ? _col.collector : this.customCollector[_col.collector] || _AX6UIGrid_collector2.default[_col.collector]).call(that);
            if (_col.formatter) {
                that.value = value;
                caller = _AX6Util2.default.isFunction(_col.formatter) ? _col.formatter : this.customFormatter[_col.formatter] || _AX6UIGrid_formatter2.default[_col.formatter];
                return caller ? caller.call(that) : value;
            } else {
                return value;
            }
        } else {
            return "&nbsp;";
        }
    }
};

var getSumFieldValue = function getSumFieldValue(_list, _col) {
    var _key = _col.key,
        _label = _col.label;
    //, _collector, _formatter
    if (typeof _key === "undefined") {
        return _label;
    } else if (_key === "__d-index__" || _key === "__d-checkbox__") {
        return '&nbsp;';
    } else {
        if (_col.collector) {
            var that = {
                key: _key,
                list: _list
            };
            var value = (_AX6Util2.default.isFunction(_col.collector) ? _col.collector : this.customCollector[_col.collector] || _AX6UIGrid_collector2.default[_col.collector]).call(that);
            that.value = value;

            if (_col.formatter) {
                return (_AX6Util2.default.isFunction(_col.formatter) ? _col.formatter : this.config.formatter[_col.formatter] || _AX6UIGrid_formatter2.default[_col.formatter]).call(that);
            } else {
                return value;
            }
        } else {
            return "&nbsp;";
        }
    }
};

var repaint = function repaint(_reset) {
    // debugger;
    var cfg = this.config,
        list = this.proxyList ? this.proxyList : this.list;

    /// repaint reset 타입이면 고정컬럼을 재조정
    if (_reset) {
        resetFrozenColumn.call(this);
        // 틀고정 이 변경되면 출력 시작 인덱스 값을 초기화
        this.xvar.paintStartRowIndex = undefined;
        this.xvar.paintStartColumnIndex = undefined;
    }

    /// 출력시작 인덱스
    var paintStartRowIndex = void 0,
        virtualPaintStartRowIndex = void 0;

    if (this.config.virtualScrollY) {
        virtualPaintStartRowIndex = paintStartRowIndex = Math.floor(-this.$.panel["body-scroll"].position().top / this.xvar.bodyTrHeight) + this.xvar.frozenRowIndex;
        if (this.xvar.paintRowCountTopMargin < paintStartRowIndex) {
            paintStartRowIndex -= this.xvar.paintRowCountTopMargin;
        }
    } else {
        paintStartRowIndex = this.xvar.frozenRowIndex;
    }

    if (isNaN(paintStartRowIndex)) return this;

    var paintStartColumnIndex = 0,
        paintEndColumnIndex = 0,
        nopaintLeftColumnsWidth = null,
        nopaintRightColumnsWidth = null;

    var bodyScrollLeft = -this.$.panel["body-scroll"].position().left;

    if (this.config.virtualScrollX) {
        // 페인트 시작컬럼위치와 종료컬럼위치 구하기
        for (var ci = this.xvar.frozenColumnIndex; ci < this.colGroup.length; ci++) {
            // bodyScrollLeft
            this.colGroup[ci]._sx = ci == this.xvar.frozenColumnIndex ? 0 : this.colGroup[ci - 1]._ex;
            this.colGroup[ci]._ex = this.colGroup[ci]._sx + this.colGroup[ci]._width;

            if (this.colGroup[ci]._sx <= bodyScrollLeft && this.colGroup[ci]._ex >= bodyScrollLeft) {
                paintStartColumnIndex = ci;
            }
            if (this.colGroup[ci]._sx <= bodyScrollLeft + this.xvar.bodyWidth && this.colGroup[ci]._ex >= bodyScrollLeft + this.xvar.bodyWidth) {
                paintEndColumnIndex = ci;

                if (nopaintLeftColumnsWidth === null) nopaintLeftColumnsWidth = this.colGroup[paintStartColumnIndex]._sx;
                if (nopaintRightColumnsWidth === null) nopaintRightColumnsWidth = this.xvar.scrollContentWidth - this.colGroup[ci]._ex;
            }
        }

        if (nopaintLeftColumnsWidth === null) nopaintLeftColumnsWidth = 0;
        if (nopaintRightColumnsWidth === null) nopaintRightColumnsWidth = 0;
        this.$.panel["top-body-scroll"].css({ "padding-left": nopaintLeftColumnsWidth, "padding-right": nopaintRightColumnsWidth });
        this.$.panel["body-scroll"].css({ "padding-left": nopaintLeftColumnsWidth, "padding-right": nopaintRightColumnsWidth });
        this.$.panel["bottom-body-scroll"].css({ "padding-left": nopaintLeftColumnsWidth, "padding-right": nopaintRightColumnsWidth });
    }

    var isFirstPaint = typeof this.xvar.paintStartRowIndex === "undefined",
        headerColGroup = this.headerColGroup,
        asideBodyRowData = this.asideBodyRowData,
        leftBodyRowData = this.leftBodyRowData,
        bodyRowData = this.bodyRowData,
        leftFootSumData = this.leftFootSumData,
        footSumData = this.footSumData,
        asideBodyGroupingData = this.asideBodyGroupingData,
        leftBodyGroupingData = this.leftBodyGroupingData,
        bodyGroupingData = this.bodyGroupingData,
        bodyAlign = cfg.body.align,
        paintRowCount = void 0,
        virtualPaintRowCount = void 0;

    if (!this.config.virtualScrollY) {
        virtualPaintRowCount = paintRowCount = list.length;
    } else {
        virtualPaintRowCount = Math.ceil(this.xvar.bodyHeight / this.xvar.bodyTrHeight);
        paintRowCount = virtualPaintRowCount + (this.xvar.paintRowCountMargin || 1);
    }

    // 여유범위 안에 있으면 페인팅 안할수 있게 paintStartRowIndex 변경하지 않음.
    if (this.xvar.paintRowCountTopMargin < paintStartRowIndex && Math.abs(this.xvar.paintStartRowIndex - paintStartRowIndex) <= this.xvar.paintRowCountTopMargin) {
        paintStartRowIndex = this.xvar.paintStartRowIndex;
    }

    if (this.xvar.dataRowCount === list.length && this.xvar.paintStartRowIndex === paintStartRowIndex && this.xvar.paintRowCount === paintRowCount && this.xvar.paintStartColumnIndex === paintStartColumnIndex && this.xvar.paintEndColumnIndex === paintEndColumnIndex) return this; // 스크롤 포지션 변경 여부에 따라 프로세스 진행여부 결정

    // bodyRowData 수정 : 페인트 컬럼 포지션이 달라지므로
    if (nopaintLeftColumnsWidth || nopaintRightColumnsWidth) {
        headerColGroup = [].concat(headerColGroup).splice(paintStartColumnIndex - this.xvar.frozenColumnIndex, paintEndColumnIndex - paintStartColumnIndex + 1 + this.xvar.frozenColumnIndex);
        bodyRowData = _AX6UIGrid_util2.default.getTableByStartEndColumnIndex(bodyRowData, paintStartColumnIndex, paintEndColumnIndex);

        if (cfg.body.grouping) {
            bodyGroupingData = _AX6UIGrid_util2.default.getTableByStartEndColumnIndex(bodyGroupingData, paintStartColumnIndex, paintEndColumnIndex);
        }
        if (cfg.footSum) {
            footSumData = _AX6UIGrid_util2.default.getTableByStartEndColumnIndex(footSumData, paintStartColumnIndex, paintEndColumnIndex);
        }
        if (this.xvar.paintStartColumnIndex !== paintStartColumnIndex || this.xvar.paintEndColumnIndex !== paintEndColumnIndex) {
            this.needToPaintSum = true;
        }
    }

    /// 스크롤 컨텐츠의 높이 : 그리드 스크롤의 실제 크기와는 관계 없이 데이터 갯수에 따라 스크롤 컨텐츠 높이값 구해서 저장해두기.
    this.xvar.scrollContentHeight = this.xvar.bodyTrHeight * (this.list.length - this.xvar.frozenRowIndex);
    /// 사용된 패널들의 키 모음
    this.$.livePanelKeys = [];

    // 그리드 바디 영역 페인트 함수
    /**
     * @param _elTargetKey
     * @param _colGroup
     * @param _bodyRow
     * @param _groupRow
     * @param _list
     * @param [_scrollConfig]
     * @returns {boolean}
     */
    var repaintBody = function repaintBody(_elTargetKey, _colGroup, _bodyRow, _groupRow, _list, _scrollConfig) {
        var _elTarget = this.$.panel[_elTargetKey];

        if (!isFirstPaint && !_scrollConfig) {
            this.$.livePanelKeys.push(_elTargetKey); // 사용중인 패널키를 모아둠. (뷰의 상태 변경시 사용하려고)
            return false;
        }

        var SS = [],
            cgi = void 0,
            cgl = void 0,
            di = void 0,
            dl = void 0,
            tri = void 0,
            trl = void 0,
            ci = void 0,
            cl = void 0,
            col = void 0,
            cellHeight = void 0,
            colAlign = void 0,
            isScrolled = function () {
            // 스크롤값이 변경되거나 처음 호출되었습니까?
            if (typeof _scrollConfig === "undefined" || typeof _scrollConfig['paintStartRowIndex'] === "undefined") {
                _scrollConfig = {
                    paintStartRowIndex: 0,
                    paintRowCount: _list.length
                };
                return false;
            } else {
                return true;
            }
        }(),
            stripeString = '#fff 0px, #fff ' + (cfg.body.columnHeight - cfg.body.columnBorderWidth) + 'px, #eee ' + (cfg.body.columnHeight - cfg.body.columnBorderWidth) + 'px, #eee ' + cfg.body.columnHeight + 'px';

        if (isScrolled) {
            SS.push('<div style="background:repeating-linear-gradient(to top, ' + stripeString + ');' + 'font-size:0;' + 'line-height:0;height: ' + (_scrollConfig.paintStartRowIndex - this.xvar.frozenRowIndex) * _scrollConfig.bodyTrHeight + 'px;"></div>');
        }

        SS.push('<table border="0" cellpadding="0" cellspacing="0">');
        SS.push('<colgroup>');
        for (cgi = 0, cgl = _colGroup.length; cgi < cgl; cgi++) {
            SS.push('<col style="width:' + _colGroup[cgi]._width + 'px;"  />');
        }
        SS.push('<col  />');
        SS.push('</colgroup>');

        di = _scrollConfig.paintStartRowIndex;

        for (dl = function () {
            var len = void 0;
            len = _list.length;
            if (_scrollConfig.paintRowCount + _scrollConfig.paintStartRowIndex < len) {
                len = _scrollConfig.paintRowCount + _scrollConfig.paintStartRowIndex;
            }
            return len;
        }(); di < dl; di++) {

            if (_list[di]) {
                var isGroupingRow = false,
                    rowTable = void 0,
                    odi = typeof _list[di].__origin_index__ !== "undefined" ? _list[di].__origin_index__ : di;
                if (_groupRow && "__isGrouping" in _list[di]) {
                    rowTable = _groupRow;
                    isGroupingRow = true;
                } else {
                    rowTable = _bodyRow;
                }

                for (tri = 0, trl = rowTable.rows.length; tri < trl; tri++) {

                    SS.push('<tr class="tr-' + di % 4 + '', cfg.body.trStyleClass ? _AX6Util2.default.isFunction(cfg.body.trStyleClass) ? ' ' + cfg.body.trStyleClass.call({
                        item: _list[di],
                        index: di
                    }, _list[di], di) : ' ' + cfg.body.trStyleClass : '', '"', isGroupingRow ? ' data-ax6grid-grouping-tr="true"' : '', ' data-ax6grid-tr-data-index="' + di + '"', ' data-ax6grid-tr-data-o-index="' + odi + '"', ' data-ax6grid-selected="' + (_list[di][cfg.columnKeys.selected] || "false") + '"', ' data-ax6grid-disable-selection="' + (_list[di][cfg.columnKeys.disableSelection] || "false") + '"', '>');
                    for (ci = 0, cl = rowTable.rows[tri].cols.length; ci < cl; ci++) {
                        col = rowTable.rows[tri].cols[ci];
                        cellHeight = cfg.body.columnHeight * col.rowspan - cfg.body.columnBorderWidth;
                        colAlign = col.align || bodyAlign;

                        SS.push('<td ', 'data-ax6grid-panel-name="' + _elTargetKey + '" ', 'data-ax6grid-data-index="' + di + '" ', 'data-ax6grid-data-o-index="' + odi + '" ', 'data-ax6grid-column-row="' + tri + '" ', 'data-ax6grid-column-col="' + ci + '" ', 'data-ax6grid-column-rowIndex="' + col.rowIndex + '" ', 'data-ax6grid-column-colIndex="' + col.colIndex + '" ', 'data-ax6grid-column-attr="' + (col.columnAttr || "default") + '" ', function (_focusedColumn, _selectedColumn) {
                            var attrs = "";
                            if (_focusedColumn) {
                                attrs += 'data-ax6grid-column-focused="true" ';
                            }
                            if (_selectedColumn) {
                                attrs += 'data-ax6grid-column-selected="true" ';
                            }
                            return attrs;
                        }(this.focusedColumn[di + "_" + col.colIndex + "_" + col.rowIndex], this.selectedColumn[di + "_" + col.colIndex + "_" + col.rowIndex]), 'colspan="' + col.colspan + '" ', 'rowspan="' + col.rowspan + '" ', 'class="' + function (_col) {
                            var tdCSS_class = "";
                            if (_col.styleClass) {
                                if (_AX6Util2.default.isFunction(_col.styleClass)) {
                                    tdCSS_class += _col.styleClass.call({
                                        column: _col,
                                        key: _col.key,
                                        item: _list[di],
                                        index: di
                                    }) + " ";
                                } else {
                                    tdCSS_class += _col.styleClass + " ";
                                }
                            }
                            if (cfg.body.columnBorderWidth) tdCSS_class += "hasBorder ";
                            if (ci == cl - 1) tdCSS_class += "isLastColumn ";
                            return tdCSS_class;
                        }.call(this, col) + '" ', 'style="height: ' + cellHeight + 'px;min-height: 1px;">');

                        SS.push(function (_cellHeight) {
                            var lineHeight = cfg.body.columnHeight - cfg.body.columnPadding * 2 - cfg.body.columnBorderWidth;
                            if (!col.multiLine) {
                                _cellHeight = cfg.body.columnHeight - cfg.body.columnBorderWidth;
                            }

                            return '<span data-ax6grid-cellHolder="' + (col.multiLine ? 'multiLine' : '') + '" ' + (colAlign ? 'data-ax6grid-text-align="' + colAlign + '"' : '') + '" style="height:' + _cellHeight + 'px;' + (col.multiLine ? '' : 'line-height: ' + lineHeight + 'px;') + '">';
                        }(cellHeight), isGroupingRow ? getGroupingValue.call(this, _list[di], di, col) : getFieldValue.call(this, _list, _list[di], di, col), '</span>');

                        SS.push('</td>');
                    }
                    SS.push('<td ', 'data-ax6grid-column-row="null" ', 'data-ax6grid-column-col="null" ', 'data-ax6grid-data-index="' + di + '" ', 'data-ax6grid-data-o-index="' + odi + '" ', 'data-ax6grid-column-attr="' + "default" + '" ', 'style="height: ' + cfg.body.columnHeight + 'px;min-height: 1px;" ', '></td>');
                    SS.push('</tr>');
                }
            }
        }
        SS.push('</table>');

        if (isScrolled && _list.length) {
            SS.push('<div style="background:repeating-linear-gradient(to bottom, ' + stripeString + ');' + 'font-size:0;' + 'line-height:0;height: ' + (_list.length - di) * _scrollConfig.bodyTrHeight + 'px;"></div>');
        }

        _elTarget.empty();
        SS = SS.join('');

        _elTarget.get(0).innerHTML = SS;

        this.$.livePanelKeys.push(_elTargetKey); // 사용중인 패널키를 모아둠. (뷰의 상태 변경시 사용하려고)
        return true;
    };

    /**
     * @param _elTargetKey
     * @param _colGroup
     * @param _bodyRow
     * @param _list
     * @param [_scrollConfig]
     * @returns {boolean}
     */
    var repaintSum = function repaintSum(_elTargetKey, _colGroup, _bodyRow, _list, _scrollConfig) {
        var _elTarget = this.$.panel[_elTargetKey];

        if (!isFirstPaint && !_scrollConfig) {
            this.$.livePanelKeys.push(_elTargetKey); // 사용중인 패널키를 모아둠. (뷰의 상태 변경시 사용하려고)
            return false;
        }

        var SS = [],
            cgi = void 0,
            cgl = void 0,
            tri = void 0,
            trl = void 0,
            ci = void 0,
            cl = void 0,
            col = void 0,
            cellHeight = void 0,
            colAlign = void 0;

        SS.push('<table border="0" cellpadding="0" cellspacing="0">');
        SS.push('<colgroup>');
        for (cgi = 0, cgl = _colGroup.length; cgi < cgl; cgi++) {
            SS.push('<col style="width:' + _colGroup[cgi]._width + 'px;"  />');
        }
        SS.push('<col  />');
        SS.push('</colgroup>');

        for (tri = 0, trl = _bodyRow.rows.length; tri < trl; tri++) {
            SS.push('<tr class="tr-sum">');
            for (ci = 0, cl = _bodyRow.rows[tri].cols.length; ci < cl; ci++) {
                col = _bodyRow.rows[tri].cols[ci];
                cellHeight = cfg.body.columnHeight * col.rowspan - cfg.body.columnBorderWidth;
                colAlign = col.align || bodyAlign;

                SS.push('<td ', 'data-ax6grid-panel-name="' + _elTargetKey + '" ', 'data-ax6grid-column-row="' + tri + '" ', 'data-ax6grid-column-col="' + ci + '" ', 'data-ax6grid-column-rowIndex="' + tri + '" ', 'data-ax6grid-column-colIndex="' + col.colIndex + '" ', 'data-ax6grid-column-attr="' + (col.columnAttr || "sum") + '" ', function (_focusedColumn, _selectedColumn) {
                    var attrs = "";
                    if (_focusedColumn) {
                        attrs += 'data-ax6grid-column-focused="true" ';
                    }
                    if (_selectedColumn) {
                        attrs += 'data-ax6grid-column-selected="true" ';
                    }
                    return attrs;
                }(this.focusedColumn["sum_" + col.colIndex + "_" + tri], this.selectedColumn["sum_" + col.colIndex + "_" + tri]), 'colspan="' + col.colspan + '" ', 'rowspan="' + col.rowspan + '" ', 'class="' + function (_col) {
                    var tdCSS_class = "";
                    if (_col.styleClass) {
                        if (_AX6Util2.default.isFunction(_col.styleClass)) {
                            tdCSS_class += _col.styleClass.call({
                                column: _col,
                                key: _col.key,
                                isFootSum: true
                            }) + " ";
                        } else {
                            tdCSS_class += _col.styleClass + " ";
                        }
                    }
                    if (cfg.body.columnBorderWidth) tdCSS_class += "hasBorder ";
                    if (ci == cl - 1) tdCSS_class += "isLastColumn ";
                    return tdCSS_class;
                }.call(this, col) + '" ', 'style="height: ' + cellHeight + 'px;min-height: 1px;">');

                SS.push(function (_cellHeight) {
                    var lineHeight = cfg.body.columnHeight - cfg.body.columnPadding * 2 - cfg.body.columnBorderWidth;
                    if (!col.multiLine) {
                        _cellHeight = cfg.body.columnHeight - cfg.body.columnBorderWidth;
                    }

                    return '<span data-ax6grid-cellHolder="' + (col.multiLine ? 'multiLine' : '') + '" ' + (colAlign ? 'data-ax6grid-text-align="' + colAlign + '"' : '') + '" style="height:' + _cellHeight + 'px;' + (col.multiLine ? '' : 'line-height: ' + lineHeight + 'px;') + '">';
                }(cellHeight), getSumFieldValue.call(this, _list, col), '</span>');

                SS.push('</td>');
            }
            SS.push('<td ', 'data-ax6grid-column-row="null" ', 'data-ax6grid-column-col="null" ', 'data-ax6grid-column-attr="' + "sum" + '" ', 'style="height: ' + cfg.body.columnHeight + 'px;min-height: 1px;" ', '></td>');
            SS.push('</tr>');
        }

        SS.push('</table>');

        _elTarget.empty();
        SS = SS.join('');

        _elTarget.get(0).innerHTML = SS;

        this.$.livePanelKeys.push(_elTargetKey); // 사용중인 패널키를 모아둠. (뷰의 상태 변경시 사용하려고)
        return true;
    };

    /**
     * @param _elTargetKey
     * @param _colGroup
     * @param _bodyRow
     * @param _list
     * @param [_scrollConfig]
     * @returns {boolean}
     */
    var mergeCellsBody = function mergeCellsBody(_elTargetKey, _colGroup, _bodyRow, _list, _scrollConfig) {
        var tblRowMaps = [];
        var _elTarget = this.$.panel[_elTargetKey];
        var token = {},
            hasMergeTd = void 0;

        // 테이블의 td들을 수잡하여 저장해두고 스크립트로 반복하여 정리.
        var tableTrs = _elTarget.find("tr");
        for (var ri = 0, rl = tableTrs.length; ri < rl; ri++) {
            var tableTrTds = void 0,
                trMaps = void 0;
            tableTrTds = tableTrs[ri].childNodes;
            trMaps = [];

            for (var _ci = 0, cl = tableTrTds.length; _ci < cl; _ci++) {
                var tdObj = {
                    "$": (0, _jqmin2.default)(tableTrTds[_ci])
                };

                if (tdObj["$"].attr("data-ax6grid-column-col") != "null") {
                    tdObj.dindex = tdObj["$"].attr("data-ax6grid-data-index");
                    tdObj.tri = tdObj["$"].attr("data-ax6grid-column-row");
                    tdObj.ci = tdObj["$"].attr("data-ax6grid-column-col");
                    tdObj.rowIndex = tdObj["$"].attr("data-ax6grid-column-rowIndex");
                    tdObj.colIndex = tdObj["$"].attr("data-ax6grid-column-colIndex");
                    tdObj.rowspan = tdObj["$"].attr("rowspan");
                    tdObj.text = tdObj["$"].text();
                    trMaps.push(tdObj);
                }

                tdObj = null;
            }
            tblRowMaps.push(trMaps);
        }

        // 두줄이상 일 때 의미가 있으니.
        if (tblRowMaps.length > 1) {
            hasMergeTd = false;

            var _loop = function _loop(_ri, _rl) {
                var prevTokenColIndexs = [];

                var _loop2 = function _loop2(_ci3, _cl2) {
                    // 적용 하려는 컬럼에 editor 속성이 없다면 머지 대상입니다.

                    if (!_colGroup[_ci3].editor && function () {
                        if (_AX6Util2.default.isArray(cfg.body.mergeCells)) {
                            return ax5.util.search(cfg.body.mergeCells, _colGroup[_ci3].key) > -1;
                        } else {
                            return true;
                        }
                    }()) {

                        // 앞줄과 값이 같다면.
                        if (token[_ci3] && function () {
                            if (prevTokenColIndexs.length > 0) {
                                var hasFalse = true;
                                prevTokenColIndexs.forEach(function (ti) {
                                    if (tblRowMaps[_ri - 1][ti].text != tblRowMaps[_ri][ti].text) {
                                        hasFalse = false;
                                    }
                                });
                                return hasFalse;
                            } else {
                                return true;
                            }
                        }() && token[_ci3].text == tblRowMaps[_ri][_ci3].text) {
                            tblRowMaps[_ri][_ci3].rowspan = 0;
                            tblRowMaps[token[_ci3].ri][_ci3].rowspan++;
                            hasMergeTd = true;
                        } else {
                            token[_ci3] = {
                                ri: _ri,
                                ci: _ci3,
                                text: tblRowMaps[_ri][_ci3].text
                            };
                        }

                        prevTokenColIndexs.push(_ci3);
                    }
                };

                for (var _ci3 = 0, _cl2 = tblRowMaps[_ri].length; _ci3 < _cl2; _ci3++) {
                    _loop2(_ci3, _cl2);
                }
            };

            for (var _ri = 0, _rl = tblRowMaps.length; _ri < _rl; _ri++) {
                _loop(_ri, _rl);
            }

            // rowspan을 다 구했으면 적용합니다.
            if (hasMergeTd) {
                for (var _ri2 = 0, _rl2 = tblRowMaps.length; _ri2 < _rl2; _ri2++) {
                    for (var _ci2 = 0, _cl = tblRowMaps[_ri2].length; _ci2 < _cl; _ci2++) {
                        if (tblRowMaps[_ri2][_ci2].rowspan == 0) {
                            tblRowMaps[_ri2][_ci2]["$"].remove();
                        } else if (tblRowMaps[_ri2][_ci2].rowspan > 1) {
                            tblRowMaps[_ri2][_ci2]["$"].attr("rowspan", tblRowMaps[_ri2][_ci2].rowspan).addClass("merged");
                        }
                    }
                }
            }
        }
    };

    var scrollConfig = {
        paintStartRowIndex: paintStartRowIndex,
        paintRowCount: paintRowCount,
        paintStartColumnIndex: paintStartColumnIndex,
        paintEndColumnIndex: paintEndColumnIndex,
        nopaintLeftColumnsWidth: nopaintLeftColumnsWidth,
        nopaintRightColumnsWidth: nopaintRightColumnsWidth,
        bodyTrHeight: this.xvar.bodyTrHeight,
        virtualScrollX: this.config.virtualScrollX,
        virtualScrollY: this.config.virtualScrollY
    };
    var frozenScrollConfig = _jqmin2.default.extend({}, scrollConfig, {
        paintStartRowIndex: 0,
        paintRowCount: this.xvar.frozenRowIndex
    });

    // aside
    if (cfg.asidePanelWidth > 0) {
        if (this.xvar.frozenRowIndex > 0) {
            // 상단 행고정
            repaintBody.call(this, "top-aside-body", this.asideColGroup, asideBodyRowData, asideBodyGroupingData, list.slice(0, this.xvar.frozenRowIndex), frozenScrollConfig);
        }

        repaintBody.call(this, "aside-body-scroll", this.asideColGroup, asideBodyRowData, asideBodyGroupingData, list, scrollConfig);

        if (cfg.footSum) {
            // 바닥 요약 (footSum에 대한 aside 사용안함)
            repaintSum.call(this, "bottom-aside-body", this.asideColGroup, asideBodyRowData, null, list);
        }
    }

    // left
    if (this.xvar.frozenColumnIndex > 0) {
        if (this.xvar.frozenRowIndex > 0) {
            // 상단 행고정
            repaintBody.call(this, "top-left-body", this.leftHeaderColGroup, leftBodyRowData, leftBodyGroupingData, list.slice(0, this.xvar.frozenRowIndex), frozenScrollConfig);
        }

        repaintBody.call(this, "left-body-scroll", this.leftHeaderColGroup, leftBodyRowData, leftBodyGroupingData, list, scrollConfig);

        if (cfg.footSum && this.needToPaintSum) {
            // 바닥 요약
            repaintSum.call(this, "bottom-left-body", this.leftHeaderColGroup, leftFootSumData, list);
        }
    }

    // body
    if (this.xvar.frozenRowIndex > 0) {
        // 상단 행고정
        repaintBody.call(this, "top-body-scroll", headerColGroup, bodyRowData, bodyGroupingData, list.slice(0, this.xvar.frozenRowIndex), frozenScrollConfig);
    }
    repaintBody.call(this, "body-scroll", headerColGroup, bodyRowData, bodyGroupingData, list, scrollConfig);

    // 바닥 요약
    if (cfg.footSum && this.needToPaintSum) {
        repaintSum.call(this, "bottom-body-scroll", headerColGroup, footSumData, list, scrollConfig);
    }
    // right
    if (cfg.rightSum) {}
    // todo : right 표현 정리


    /// mergeCells
    if (cfg.body.mergeCells && this.list.length) {
        // left
        if (this.xvar.frozenColumnIndex > 0) {
            if (this.xvar.frozenRowIndex > 0) {
                // 상단 행고정
                // console.log(this.leftHeaderColGroup, leftBodyRowData);
                mergeCellsBody.call(this, "top-left-body", this.leftHeaderColGroup, leftBodyRowData, list.slice(0, this.xvar.frozenRowIndex));
            }
            mergeCellsBody.call(this, "left-body-scroll", this.leftHeaderColGroup, leftBodyRowData, list, scrollConfig);
        }

        // body
        if (this.xvar.frozenRowIndex > 0) {
            // 상단 행고정
            mergeCellsBody.call(this, "top-body-scroll", this.headerColGroup, bodyRowData, list.slice(0, this.xvar.frozenRowIndex));
        }
        mergeCellsBody.call(this, "body-scroll", this.headerColGroup, bodyRowData, list, scrollConfig);
    }

    this.xvar.virtualPaintStartRowIndex = virtualPaintStartRowIndex;
    this.xvar.paintStartRowIndex = paintStartRowIndex;
    this.xvar.paintRowCount = paintRowCount;
    this.xvar.virtualPaintRowCount = virtualPaintRowCount;
    this.xvar.paintStartColumnIndex = paintStartColumnIndex;
    this.xvar.paintEndColumnIndex = paintEndColumnIndex;
    this.xvar.nopaintLeftColumnsWidth = nopaintLeftColumnsWidth;
    this.xvar.nopaintRightColumnsWidth = nopaintRightColumnsWidth;
    this.xvar.dataRowCount = list.length;
    this.needToPaintSum = false;

    _AX6UIGrid_page2.default.statusUpdate.call(this);
};

var repaintCell = function repaintCell(_panelName, _dindex, _doindex, _rowIndex, _colIndex, _newValue) {
    var self = this,
        cfg = this.config,
        list = this.list;

    var updateCell = this.$["panel"][_panelName].find('[data-ax6grid-tr-data-index="' + _dindex + '"]').find('[data-ax6grid-column-rowindex="' + _rowIndex + '"][data-ax6grid-column-colindex="' + _colIndex + '"]').find('[data-ax6grid-cellholder]'),
        colGroup = this.colGroup,
        col = colGroup[_colIndex];

    updateCell.html(getFieldValue.call(this, list, list[_dindex], _dindex, col));

    if (col.editor && col.editor.updateWith) {
        col.editor.updateWith.forEach(function (updateColumnKey) {
            colGroup.forEach(function (col) {
                if (col.key == updateColumnKey) {
                    var rowIndex = col.rowIndex,
                        colIndex = col.colIndex,
                        panelName = _AX6UIGrid_util2.default.findPanelByColumnIndex.call(self, _dindex, colIndex, rowIndex).panelName,
                        updateWithCell = self.$["panel"][panelName].find('[data-ax6grid-tr-data-index="' + _dindex + '"]').find('[data-ax6grid-column-rowindex="' + rowIndex + '"][data-ax6grid-column-colindex="' + colIndex + '"]').find('[data-ax6grid-cellholder]');

                    updateWithCell.html(getFieldValue.call(self, list, list[_dindex], _dindex, col));
                }
            });
        });
    }

    /// ~~~~~~

    var paintStartRowIndex = Math.floor(Math.abs(this.$.panel["body-scroll"].position().top) / this.xvar.bodyTrHeight) + this.xvar.frozenRowIndex,
        headerColGroup = this.headerColGroup,
        leftFootSumData = this.leftFootSumData,
        footSumData = this.footSumData,
        leftBodyGroupingData = this.leftBodyGroupingData,
        bodyGroupingData = this.bodyGroupingData,
        bodyAlign = cfg.body.align,
        paintRowCount = Math.ceil(this.$.panel["body"].height() / this.xvar.bodyTrHeight) + 1,
        scrollConfig = {
        paintStartRowIndex: paintStartRowIndex,
        paintRowCount: paintRowCount,
        bodyTrHeight: this.xvar.bodyTrHeight
    };

    if (this.xvar.nopaintLeftColumnsWidth || this.xvar.nopaintRightColumnsWidth) {
        headerColGroup = [].concat(headerColGroup).splice(this.xvar.paintStartColumnIndex, this.xvar.paintEndColumnIndex - this.xvar.paintStartColumnIndex + 1);
        if (cfg.body.grouping) {
            bodyGroupingData = _AX6UIGrid_util2.default.getTableByStartEndColumnIndex(bodyGroupingData, this.xvar.paintStartColumnIndex, this.xvar.paintEndColumnIndex);
        }
        if (cfg.footSum) {
            footSumData = _AX6UIGrid_util2.default.getTableByStartEndColumnIndex(footSumData, this.xvar.paintStartColumnIndex, this.xvar.paintEndColumnIndex);
        }
    }

    var repaintSum = function repaintSum(_elTargetKey, _colGroup, _bodyRow, _list, _scrollConfig) {
        var _elTarget = this.$.panel[_elTargetKey],
            SS = [],
            cgi = void 0,
            cgl = void 0,
            tri = void 0,
            trl = void 0,
            ci = void 0,
            cl = void 0,
            col = void 0,
            cellHeight = void 0,
            colAlign = void 0;

        SS.push('<table border="0" cellpadding="0" cellspacing="0">');
        SS.push('<colgroup>');
        for (cgi = 0, cgl = _colGroup.length; cgi < cgl; cgi++) {
            SS.push('<col style="width:' + _colGroup[cgi]._width + 'px;"  />');
        }
        SS.push('<col  />');
        SS.push('</colgroup>');

        for (tri = 0, trl = _bodyRow.rows.length; tri < trl; tri++) {
            SS.push('<tr class="tr-sum">');
            for (ci = 0, cl = _bodyRow.rows[tri].cols.length; ci < cl; ci++) {
                col = _bodyRow.rows[tri].cols[ci];
                cellHeight = cfg.body.columnHeight * col.rowspan - cfg.body.columnBorderWidth;
                colAlign = col.align || bodyAlign;

                SS.push('<td ', 'data-ax6grid-panel-name="' + _elTargetKey + '" ', 'data-ax6grid-column-row="' + tri + '" ', 'data-ax6grid-column-col="' + ci + '" ', 'data-ax6grid-column-rowIndex="' + tri + '" ', 'data-ax6grid-column-colIndex="' + col.colIndex + '" ', 'data-ax6grid-column-attr="' + (col.columnAttr || "sum") + '" ', function (_focusedColumn, _selectedColumn) {
                    var attrs = "";
                    if (_focusedColumn) {
                        attrs += 'data-ax6grid-column-focused="true" ';
                    }
                    if (_selectedColumn) {
                        attrs += 'data-ax6grid-column-selected="true" ';
                    }
                    return attrs;
                }(this.focusedColumn["sum_" + col.colIndex + "_" + tri], this.selectedColumn["sum_" + col.colIndex + "_" + tri]), 'colspan="' + col.colspan + '" ', 'rowspan="' + col.rowspan + '" ', 'class="' + function (_col) {
                    var tdCSS_class = "";
                    if (_col.styleClass) {
                        if (_AX6Util2.default.isFunction(_col.styleClass)) {
                            tdCSS_class += _col.styleClass.call({
                                column: _col,
                                key: _col.key,
                                isFootSum: true
                            }) + " ";
                        } else {
                            tdCSS_class += _col.styleClass + " ";
                        }
                    }
                    if (cfg.body.columnBorderWidth) tdCSS_class += "hasBorder ";
                    if (ci == cl - 1) tdCSS_class += "isLastColumn ";
                    return tdCSS_class;
                }.call(this, col) + '" ', 'style="height: ' + cellHeight + 'px;min-height: 1px;">');

                SS.push(function (_cellHeight) {
                    var lineHeight = cfg.body.columnHeight - cfg.body.columnPadding * 2 - cfg.body.columnBorderWidth;
                    if (!col.multiLine) {
                        _cellHeight = cfg.body.columnHeight - cfg.body.columnBorderWidth;
                    }

                    return '<span data-ax6grid-cellHolder="' + (col.multiLine ? 'multiLine' : '') + '" ' + (colAlign ? 'data-ax6grid-text-align="' + colAlign + '"' : '') + '" style="height:' + _cellHeight + 'px;' + (col.multiLine ? '' : 'line-height: ' + lineHeight + 'px;') + '">';
                }(cellHeight), getSumFieldValue.call(this, _list, col), '</span>');

                SS.push('</td>');
            }
            SS.push('<td ', 'data-ax6grid-column-row="null" ', 'data-ax6grid-column-col="null" ', 'data-ax6grid-column-attr="' + "sum" + '" ', 'style="height: ' + cfg.body.columnHeight + 'px;min-height: 1px;" ', '></td>');
            SS.push('</tr>');
        }

        SS.push('</table>');

        _elTarget.empty().get(0).innerHTML = SS.join('');
        return true;
    };
    var replaceGroupTr = function replaceGroupTr(_elTargetKey, _colGroup, _groupRow, _list, _scrollConfig) {
        var _elTarget = this.$.panel[_elTargetKey],
            SS = [],
            di = void 0,
            dl = void 0,
            tri = void 0,
            trl = void 0,
            ci = void 0,
            cl = void 0,
            col = void 0,
            cellHeight = void 0,
            colAlign = void 0;

        for (di = _scrollConfig.paintStartRowIndex, dl = function () {
            var len = void 0;
            len = _list.length;
            if (_scrollConfig.paintRowCount + _scrollConfig.paintStartRowIndex < len) {
                len = _scrollConfig.paintRowCount + _scrollConfig.paintStartRowIndex;
            }
            return len;
        }(); di < dl; di++) {
            if (_list[di] && _groupRow && "__isGrouping" in _list[di]) {
                var rowTable = _groupRow;
                SS = [];
                for (tri = 0, trl = rowTable.rows.length; tri < trl; tri++) {
                    for (ci = 0, cl = rowTable.rows[tri].cols.length; ci < cl; ci++) {
                        col = rowTable.rows[tri].cols[ci];
                        cellHeight = cfg.body.columnHeight * col.rowspan - cfg.body.columnBorderWidth;
                        colAlign = col.align || bodyAlign;

                        SS.push('<td ', 'data-ax6grid-panel-name="' + _elTargetKey + '" ', 'data-ax6grid-data-index="' + di + '" ', 'data-ax6grid-column-row="' + tri + '" ', 'data-ax6grid-column-col="' + ci + '" ', 'data-ax6grid-column-rowIndex="' + col.rowIndex + '" ', 'data-ax6grid-column-colIndex="' + col.colIndex + '" ', 'data-ax6grid-column-attr="' + (col.columnAttr || "default") + '" ', function (_focusedColumn, _selectedColumn) {
                            var attrs = "";
                            if (_focusedColumn) {
                                attrs += 'data-ax6grid-column-focused="true" ';
                            }
                            if (_selectedColumn) {
                                attrs += 'data-ax6grid-column-selected="true" ';
                            }
                            return attrs;
                        }(this.focusedColumn[di + "_" + col.colIndex + "_" + col.rowIndex], this.selectedColumn[di + "_" + col.colIndex + "_" + col.rowIndex]), 'colspan="' + col.colspan + '" ', 'rowspan="' + col.rowspan + '" ', 'class="' + function (_col) {
                            var tdCSS_class = "";
                            if (_col.styleClass) {
                                if (_AX6Util2.default.isFunction(_col.styleClass)) {
                                    tdCSS_class += _col.styleClass.call({
                                        column: _col,
                                        key: _col.key,
                                        item: _list[di],
                                        index: di
                                    }) + " ";
                                } else {
                                    tdCSS_class += _col.styleClass + " ";
                                }
                            }
                            if (cfg.body.columnBorderWidth) tdCSS_class += "hasBorder ";
                            if (ci == cl - 1) tdCSS_class += "isLastColumn ";
                            return tdCSS_class;
                        }.call(this, col) + '" ', 'style="height: ' + cellHeight + 'px;min-height: 1px;">');

                        SS.push(function (_cellHeight) {
                            var lineHeight = cfg.body.columnHeight - cfg.body.columnPadding * 2 - cfg.body.columnBorderWidth;
                            if (!col.multiLine) {
                                _cellHeight = cfg.body.columnHeight - cfg.body.columnBorderWidth;
                            }

                            return '<span data-ax6grid-cellHolder="' + (col.multiLine ? 'multiLine' : '') + '" ' + (colAlign ? 'data-ax6grid-text-align="' + colAlign + '"' : '') + '" style="height:' + _cellHeight + 'px;' + (col.multiLine ? '' : 'line-height: ' + lineHeight + 'px;') + '">';
                        }(cellHeight), getGroupingValue.call(this, _list[di], di, col), '</span>');

                        SS.push('</td>');
                    }
                    SS.push('<td ', 'data-ax6grid-column-row="null" ', 'data-ax6grid-column-col="null" ', 'data-ax6grid-data-index="' + di + '" ', 'data-ax6grid-column-attr="' + "default" + '" ', 'style="height: ' + cfg.body.columnHeight + 'px;min-height: 1px;" ', '></td>');
                }
                _elTarget.find('tr[data-ax6grid-tr-data-index="' + di + '"]').empty().get(0).innerHTML = SS.join('');
            }
        }
    };

    // body.grouping tr 다시 그리기..
    if (cfg.body.grouping) {
        // left
        if (this.xvar.frozenColumnIndex > 0) {
            if (this.xvar.frozenRowIndex > 0) {
                // 상단 행고정
                replaceGroupTr.call(this, "top-left-body", headerColGroup, leftBodyGroupingData, list.slice(0, this.xvar.frozenRowIndex), {
                    paintStartRowIndex: 0,
                    paintRowCount: this.xvar.frozenRowIndex,
                    bodyTrHeight: this.xvar.bodyTrHeight
                });
            }
            replaceGroupTr.call(this, "left-body-scroll", headerColGroup, leftBodyGroupingData, list, scrollConfig);
        }

        // body
        if (this.xvar.frozenRowIndex > 0) {
            // 상단 행고정
            replaceGroupTr.call(this, "top-body-scroll", headerColGroup, bodyGroupingData, list.slice(0, this.xvar.frozenRowIndex), {
                paintStartRowIndex: 0,
                paintRowCount: this.xvar.frozenRowIndex,
                bodyTrHeight: this.xvar.bodyTrHeight
            });
        }

        replaceGroupTr.call(this, "body-scroll", headerColGroup, bodyGroupingData, list, scrollConfig);
    }

    if (this.xvar.frozenColumnIndex > 0) {
        if (cfg.footSum && this.needToPaintSum) {
            // 바닥 요약
            repaintSum.call(this, "bottom-left-body", headerColGroup, leftFootSumData, list);
        }
    }

    if (cfg.footSum && this.needToPaintSum) {
        // 바닥 요약
        repaintSum.call(this, "bottom-body-scroll", headerColGroup, footSumData, list, scrollConfig);
    }
};

var repaintRow = function repaintRow(_dindex) {
    var self = this,
        cfg = this.config,
        list = this.list;
    /// ~~~~~~

    var paintStartRowIndex = Math.floor(Math.abs(this.$.panel["body-scroll"].position().top) / this.xvar.bodyTrHeight) + this.xvar.frozenRowIndex,
        asideBodyRowData = this.asideBodyRowData,
        leftBodyRowData = this.leftBodyRowData,
        bodyRowData = this.bodyRowData,
        leftFootSumData = this.leftFootSumData,
        footSumData = this.footSumData,
        asideBodyGroupingData = this.asideBodyGroupingData,
        leftBodyGroupingData = this.leftBodyGroupingData,
        bodyGroupingData = this.bodyGroupingData,
        bodyAlign = cfg.body.align,
        paintRowCount = Math.ceil(this.$.panel["body"].height() / this.xvar.bodyTrHeight) + 1,
        scrollConfig = {
        paintStartRowIndex: paintStartRowIndex,
        paintRowCount: paintRowCount,
        bodyTrHeight: this.xvar.bodyTrHeight
    };

    var repaintSum = function repaintSum(_elTargetKey, _colGroup, _bodyRow, _list) {
        var _elTarget = this.$.panel[_elTargetKey],
            SS = [],
            cgi = void 0,
            cgl = void 0,
            tri = void 0,
            trl = void 0,
            ci = void 0,
            cl = void 0,
            col = void 0,
            cellHeight = void 0,
            colAlign = void 0;

        SS.push('<table border="0" cellpadding="0" cellspacing="0">');
        SS.push('<colgroup>');
        for (cgi = 0, cgl = _colGroup.length; cgi < cgl; cgi++) {
            SS.push('<col style="width:' + _colGroup[cgi]._width + 'px;"  />');
        }
        SS.push('<col  />');
        SS.push('</colgroup>');

        for (tri = 0, trl = _bodyRow.rows.length; tri < trl; tri++) {
            SS.push('<tr class="tr-sum">');
            for (ci = 0, cl = _bodyRow.rows[tri].cols.length; ci < cl; ci++) {
                col = _bodyRow.rows[tri].cols[ci];
                cellHeight = cfg.body.columnHeight * col.rowspan - cfg.body.columnBorderWidth;
                colAlign = col.align || bodyAlign;

                SS.push('<td ', 'data-ax6grid-panel-name="' + _elTargetKey + '" ', 'data-ax6grid-column-row="' + tri + '" ', 'data-ax6grid-column-col="' + ci + '" ', 'data-ax6grid-column-rowIndex="' + tri + '" ', 'data-ax6grid-column-colIndex="' + col.colIndex + '" ', 'data-ax6grid-column-attr="' + (col.columnAttr || "sum") + '" ', function (_focusedColumn, _selectedColumn) {
                    var attrs = "";
                    if (_focusedColumn) {
                        attrs += 'data-ax6grid-column-focused="true" ';
                    }
                    if (_selectedColumn) {
                        attrs += 'data-ax6grid-column-selected="true" ';
                    }
                    return attrs;
                }(this.focusedColumn["sum_" + col.colIndex + "_" + tri], this.selectedColumn["sum_" + col.colIndex + "_" + tri]), 'colspan="' + col.colspan + '" ', 'rowspan="' + col.rowspan + '" ', 'class="' + function (_col) {
                    var tdCSS_class = "";
                    if (_col.styleClass) {
                        if (_AX6Util2.default.isFunction(_col.styleClass)) {
                            tdCSS_class += _col.styleClass.call({
                                column: _col,
                                key: _col.key,
                                isFootSum: true
                            }) + " ";
                        } else {
                            tdCSS_class += _col.styleClass + " ";
                        }
                    }
                    if (cfg.body.columnBorderWidth) tdCSS_class += "hasBorder ";
                    if (ci == cl - 1) tdCSS_class += "isLastColumn ";
                    return tdCSS_class;
                }.call(this, col) + '" ', 'style="height: ' + cellHeight + 'px;min-height: 1px;">');

                SS.push(function (_cellHeight) {
                    var lineHeight = cfg.body.columnHeight - cfg.body.columnPadding * 2 - cfg.body.columnBorderWidth;
                    if (!col.multiLine) {
                        _cellHeight = cfg.body.columnHeight - cfg.body.columnBorderWidth;
                    }

                    return '<span data-ax6grid-cellHolder="' + (col.multiLine ? 'multiLine' : '') + '" ' + (colAlign ? 'data-ax6grid-text-align="' + colAlign + '"' : '') + '" style="height:' + _cellHeight + 'px;line-height: ' + lineHeight + 'px;">';
                }(cellHeight), getSumFieldValue.call(this, _list, col), '</span>');

                SS.push('</td>');
            }
            SS.push('<td ', 'data-ax6grid-column-row="null" ', 'data-ax6grid-column-col="null" ', 'data-ax6grid-column-attr="' + "sum" + '" ', 'style="height: ' + cfg.body.columnHeight + 'px;min-height: 1px;" ', '></td>');
            SS.push('</tr>');
        }

        SS.push('</table>');

        _elTarget.empty().get(0).innerHTML = SS.join('');
        return true;
    };
    var replaceGroupTr = function replaceGroupTr(_elTargetKey, _colGroup, _groupRow, _list, _scrollConfig) {
        var _elTarget = this.$.panel[_elTargetKey],
            SS = [],
            di = void 0,
            dl = void 0,
            tri = void 0,
            trl = void 0,
            ci = void 0,
            cl = void 0,
            col = void 0,
            cellHeight = void 0,
            colAlign = void 0;

        if (typeof _scrollConfig === "undefined" || typeof _scrollConfig['paintStartRowIndex'] === "undefined") {
            _scrollConfig = {
                paintStartRowIndex: 0,
                paintRowCount: _list.length
            };
        }

        for (di = _scrollConfig.paintStartRowIndex, dl = function () {
            var len = void 0;
            len = _list.length;
            if (_scrollConfig.paintRowCount + _scrollConfig.paintStartRowIndex < len) {
                len = _scrollConfig.paintRowCount + _scrollConfig.paintStartRowIndex;
            }
            return len;
        }(); di < dl; di++) {
            if (_list[di] && _groupRow && "__isGrouping" in _list[di]) {
                var rowTable = _groupRow;
                SS = [];
                for (tri = 0, trl = rowTable.rows.length; tri < trl; tri++) {
                    for (ci = 0, cl = rowTable.rows[tri].cols.length; ci < cl; ci++) {
                        col = rowTable.rows[tri].cols[ci];
                        cellHeight = cfg.body.columnHeight * col.rowspan - cfg.body.columnBorderWidth;
                        colAlign = col.align || bodyAlign;

                        SS.push('<td ', 'data-ax6grid-panel-name="' + _elTargetKey + '" ', 'data-ax6grid-data-index="' + di + '" ', 'data-ax6grid-column-row="' + tri + '" ', 'data-ax6grid-column-col="' + ci + '" ', 'data-ax6grid-column-rowIndex="' + col.rowIndex + '" ', 'data-ax6grid-column-colIndex="' + col.colIndex + '" ', 'data-ax6grid-column-attr="' + (col.columnAttr || "default") + '" ', function (_focusedColumn, _selectedColumn) {
                            var attrs = "";
                            if (_focusedColumn) {
                                attrs += 'data-ax6grid-column-focused="true" ';
                            }
                            if (_selectedColumn) {
                                attrs += 'data-ax6grid-column-selected="true" ';
                            }
                            return attrs;
                        }(this.focusedColumn[di + "_" + col.colIndex + "_" + col.rowIndex], this.selectedColumn[di + "_" + col.colIndex + "_" + col.rowIndex]), 'colspan="' + col.colspan + '" ', 'rowspan="' + col.rowspan + '" ', 'class="' + function (_col) {
                            var tdCSS_class = "";
                            if (_col.styleClass) {
                                if (_AX6Util2.default.isFunction(_col.styleClass)) {
                                    tdCSS_class += _col.styleClass.call({
                                        column: _col,
                                        key: _col.key,
                                        item: _list[di],
                                        index: di
                                    }) + " ";
                                } else {
                                    tdCSS_class += _col.styleClass + " ";
                                }
                            }
                            if (cfg.body.columnBorderWidth) tdCSS_class += "hasBorder ";
                            if (ci == cl - 1) tdCSS_class += "isLastColumn ";
                            return tdCSS_class;
                        }.call(this, col) + '" ', 'style="height: ' + cellHeight + 'px;min-height: 1px;">');

                        SS.push(function (_cellHeight) {
                            var lineHeight = cfg.body.columnHeight - cfg.body.columnPadding * 2 - cfg.body.columnBorderWidth;
                            if (!col.multiLine) {
                                _cellHeight = cfg.body.columnHeight - cfg.body.columnBorderWidth;
                            }

                            return '<span data-ax6grid-cellHolder="' + (col.multiLine ? 'multiLine' : '') + '" ' + (colAlign ? 'data-ax6grid-text-align="' + colAlign + '"' : '') + '" style="height:' + _cellHeight + 'px;line-height: ' + lineHeight + 'px;">';
                        }(cellHeight), getGroupingValue.call(this, _list[di], di, col), '</span>');

                        SS.push('</td>');
                    }
                    SS.push('<td ', 'data-ax6grid-column-row="null" ', 'data-ax6grid-column-col="null" ', 'data-ax6grid-data-index="' + di + '" ', 'data-ax6grid-column-attr="' + "default" + '" ', 'style="height: ' + cfg.body.columnHeight + 'px;min-height: 1px;" ', '></td>');
                }
                _elTarget.find('tr[data-ax6grid-tr-data-index="' + di + '"]').empty().get(0).innerHTML = SS.join('');
            }
        }
    };
    var replaceTr = function replaceTr(_elTargetKey, _colGroup, _bodyRow, _list, di) {
        var _elTarget = this.$.panel[_elTargetKey],
            SS = [],
            tri = void 0,
            trl = void 0,
            ci = void 0,
            cl = void 0,
            col = void 0,
            cellHeight = void 0,
            colAlign = void 0,
            rowTable = _bodyRow,
            odi = typeof _list[di].__origin_index__ !== "undefined" ? _list[di].__origin_index__ : di;

        for (tri = 0, trl = rowTable.rows.length; tri < trl; tri++) {
            for (ci = 0, cl = rowTable.rows[tri].cols.length; ci < cl; ci++) {
                col = rowTable.rows[tri].cols[ci];
                cellHeight = cfg.body.columnHeight * col.rowspan - cfg.body.columnBorderWidth;
                colAlign = col.align || bodyAlign;

                SS.push('<td ', 'data-ax6grid-panel-name="' + _elTargetKey + '" ', 'data-ax6grid-data-index="' + di + '" ', 'data-ax6grid-data-o-index="' + odi + '" ', 'data-ax6grid-column-row="' + tri + '" ', 'data-ax6grid-column-col="' + ci + '" ', 'data-ax6grid-column-rowIndex="' + col.rowIndex + '" ', 'data-ax6grid-column-colIndex="' + col.colIndex + '" ', 'data-ax6grid-column-attr="' + (col.columnAttr || "default") + '" ', function (_focusedColumn, _selectedColumn) {
                    var attrs = "";
                    if (_focusedColumn) {
                        attrs += 'data-ax6grid-column-focused="true" ';
                    }
                    if (_selectedColumn) {
                        attrs += 'data-ax6grid-column-selected="true" ';
                    }
                    return attrs;
                }(this.focusedColumn[di + "_" + col.colIndex + "_" + col.rowIndex], this.selectedColumn[di + "_" + col.colIndex + "_" + col.rowIndex]), 'colspan="' + col.colspan + '" ', 'rowspan="' + col.rowspan + '" ', 'class="' + function (_col) {
                    var tdCSS_class = "";
                    if (_col.styleClass) {
                        if (_AX6Util2.default.isFunction(_col.styleClass)) {
                            tdCSS_class += _col.styleClass.call({
                                column: _col,
                                key: _col.key,
                                item: _list[di],
                                index: di
                            }) + " ";
                        } else {
                            tdCSS_class += _col.styleClass + " ";
                        }
                    }
                    if (cfg.body.columnBorderWidth) tdCSS_class += "hasBorder ";
                    if (ci == cl - 1) tdCSS_class += "isLastColumn ";
                    return tdCSS_class;
                }.call(this, col) + '" ', 'style="height: ' + cellHeight + 'px;min-height: 1px;">');

                SS.push(function (_cellHeight) {
                    var lineHeight = cfg.body.columnHeight - cfg.body.columnPadding * 2 - cfg.body.columnBorderWidth;
                    if (!col.multiLine) {
                        _cellHeight = cfg.body.columnHeight - cfg.body.columnBorderWidth;
                    }

                    return '<span data-ax6grid-cellHolder="' + (col.multiLine ? 'multiLine' : '') + '" ' + (colAlign ? 'data-ax6grid-text-align="' + colAlign + '"' : '') + '" style="height:' + _cellHeight + 'px;' + (col.multiLine ? '' : 'line-height: ' + lineHeight + 'px;') + '">';
                }(cellHeight), getFieldValue.call(this, _list, _list[di], di, col), '</span>');
                SS.push('</td>');
            }
            SS.push('<td ', 'data-ax6grid-column-row="null" ', 'data-ax6grid-column-col="null" ', 'data-ax6grid-data-index="' + di + '" ', 'data-ax6grid-column-attr="' + "default" + '" ', 'style="height: ' + cfg.body.columnHeight + 'px;min-height: 1px;" ', '></td>');
        }

        _elTarget.find('tr[data-ax6grid-tr-data-index="' + di + '"]').empty().get(0).innerHTML = SS.join('');
    };

    // left
    if (this.xvar.frozenColumnIndex > 0) {
        if (this.xvar.frozenRowIndex > _dindex) {
            // 상단 행고정
            replaceTr.call(this, "top-left-body", this.leftHeaderColGroup, leftBodyRowData, list.slice(0, this.xvar.frozenRowIndex), _dindex);
        } else {
            replaceTr.call(this, "left-body-scroll", this.leftHeaderColGroup, leftBodyRowData, list, _dindex);
        }
    }

    // body
    if (this.xvar.frozenRowIndex > _dindex) {
        // 상단 행고정
        replaceTr.call(this, "top-body-scroll", this.headerColGroup, bodyRowData, list.slice(0, this.xvar.frozenRowIndex), _dindex);
    } else {
        replaceTr.call(this, "body-scroll", this.headerColGroup, bodyRowData, list, _dindex);
    }

    // body.grouping tr 다시 그리기..
    if (cfg.body.grouping) {
        // left
        if (this.xvar.frozenColumnIndex > 0) {
            if (this.xvar.frozenRowIndex > _dindex) {
                // 상단 행고정
                replaceGroupTr.call(this, "top-left-body", this.leftHeaderColGroup, leftBodyGroupingData, list.slice(0, this.xvar.frozenRowIndex));
            } else {
                replaceGroupTr.call(this, "left-body-scroll", this.leftHeaderColGroup, leftBodyGroupingData, list, scrollConfig);
            }
        }

        // body
        if (this.xvar.frozenRowIndex > _dindex) {
            // 상단 행고정
            replaceGroupTr.call(this, "top-body-scroll", this.headerColGroup, bodyGroupingData, list.slice(0, this.xvar.frozenRowIndex));
        } else {
            replaceGroupTr.call(this, "body-scroll", this.headerColGroup, bodyGroupingData, list, scrollConfig);
        }
    }

    if (this.xvar.frozenColumnIndex > 0) {
        if (cfg.footSum && this.needToPaintSum) {
            // 바닥 요약
            repaintSum.call(this, "bottom-left-body", this.leftHeaderColGroup, leftFootSumData, list);
        }
    }

    if (cfg.footSum && this.needToPaintSum) {
        // 바닥 요약
        repaintSum.call(this, "bottom-body-scroll", this.headerColGroup, footSumData, list, scrollConfig);
    }
};

var scrollTo = function scrollTo(css, opts) {
    var self = this;
    if (typeof opts === "undefined") opts = { timeoutUnUse: false };
    if (this.isInlineEditing) {
        for (var key in this.inlineEditing) {
            //if(this.inlineEditing[key].editor.type === "select") {}
            // 인라인 에디팅 인데 스크롤 이벤트가 발생하면 디액티브 처리
            inlineEdit.deActive.call(this, "ESC", key);
        }
    }

    if (this.config.asidePanelWidth > 0 && "top" in css) {
        this.$.panel["aside-body-scroll"].css({ top: css.top });
    }
    if (this.xvar.frozenColumnIndex > 0 && "top" in css) {
        this.$.panel["left-body-scroll"].css({ top: css.top });
    }
    if (this.xvar.frozenRowIndex > 0 && "left" in css) {
        this.$.panel["top-body-scroll"].css({ left: css.left });
    }

    this.$.panel["body-scroll"].css(css);

    if (this.config.footSum && "left" in css) {
        this.$.panel["bottom-body-scroll"].css({ left: css.left });
    }

    // 바디 리페인팅 this.__throttledScroll 은 body init 에서 초기화
    if (this.__throttledScroll) {
        this.__throttledScroll(css, opts);
    } else {
        if (this.config.virtualScrollY && !opts.noRepaint && "top" in css) {
            repaint.call(this);
        } else if (this.config.virtualScrollX && !opts.noRepaint && "left" in css) {
            repaint.call(this);
        }
        if (opts.callback) {
            opts.callback();
        }
    }
};

var blur = function blur() {
    columnSelect.focusClear.call(this);
    columnSelect.clear.call(this);
    if (this.isInlineEditing) {
        inlineEdit.deActive.call(this);
    }
};

var moveFocus = function moveFocus(_position) {
    var focus = {
        "UD": function UD(_dy) {
            var moveResult = true,
                focusedColumn = void 0,
                originalColumn = void 0,
                while_i = void 0,
                nPanelInfo = void 0;

            for (var c in this.focusedColumn) {
                focusedColumn = _jqmin2.default.extend({}, this.focusedColumn[c], true);
                break;
            }

            if (!focusedColumn) return false;

            originalColumn = this.bodyRowMap[focusedColumn.rowIndex + "_" + focusedColumn.colIndex];
            columnSelect.focusClear.call(this);
            columnSelect.clear.call(this);

            if (_dy > 0) {
                // 아래로
                if (focusedColumn.rowIndex + (originalColumn.rowspan - 1) + _dy > this.bodyRowTable.rows.length - 1) {
                    focusedColumn.dindex = focusedColumn.dindex + _dy;
                    focusedColumn.doindex = focusedColumn.doindex + _dy;
                    focusedColumn.rowIndex = 0;
                    if (focusedColumn.dindex > this.list.length - 1) {
                        focusedColumn.dindex = focusedColumn.doindex = this.list.length - 1;
                        moveResult = false;
                    }
                } else {
                    focusedColumn.rowIndex = focusedColumn.rowIndex + _dy;
                }
            } else {
                // 위로
                if (focusedColumn.rowIndex + _dy < 0) {
                    focusedColumn.dindex = focusedColumn.dindex + _dy;
                    focusedColumn.doindex = focusedColumn.doindex + _dy;
                    focusedColumn.rowIndex = this.bodyRowTable.rows.length - 1;
                    if (focusedColumn.dindex < 0) {
                        focusedColumn.dindex = focusedColumn.doindex = 0;
                        moveResult = false;
                    }
                } else {
                    focusedColumn.rowIndex = focusedColumn.rowIndex + _dy;
                }
            }

            while_i = 0;
            while (typeof this.bodyRowMap[focusedColumn.rowIndex + "_" + focusedColumn.colIndex] === "undefined") {
                if (focusedColumn.rowIndex == 0 || while_i % 2 == (_dy > 0 ? 0 : 1)) {
                    focusedColumn.colIndex--;
                } else {
                    focusedColumn.rowIndex--;
                }

                if (focusedColumn.rowIndex <= 0 && focusedColumn.colIndex <= 0) {
                    // find fail
                    moveResult = false;
                    break;
                }
                while_i++;
            }

            nPanelInfo = _AX6UIGrid_util2.default.findPanelByColumnIndex.call(this, focusedColumn.dindex, focusedColumn.colIndex);

            // if mergeCells
            if (this.config.body.mergeCells && this.list.length) {
                while (!this.$.panel[nPanelInfo.panelName].find('[data-ax6grid-tr-data-index="' + focusedColumn.dindex + '"]').find('[data-ax6grid-column-rowindex="' + focusedColumn.rowIndex + '"][data-ax6grid-column-colindex="' + focusedColumn.colIndex + '"]').get(0)) {

                    if (_dy > 0) {
                        focusedColumn.dindex++;
                    } else {
                        focusedColumn.dindex--;
                    }

                    if (focusedColumn.dindex < 0 || focusedColumn.dindex > this.list.length - 1) {
                        break;
                    }
                }
                nPanelInfo = _AX6UIGrid_util2.default.findPanelByColumnIndex.call(this, focusedColumn.dindex, focusedColumn.colIndex);
            }

            focusedColumn.panelName = nPanelInfo.panelName;

            // 포커스 컬럼의 위치에 따라 스크롤 처리.ㅊㅇ

            if (focusedColumn.dindex + 1 > this.xvar.frozenRowIndex) {
                if (focusedColumn.dindex <= this.xvar.virtualPaintStartRowIndex) {
                    var newTop = (focusedColumn.dindex - this.xvar.frozenRowIndex - 1) * this.xvar.bodyTrHeight;
                    if (newTop < 0) newTop = 0;
                    scrollTo.call(this, { top: -newTop, timeoutUnUse: false });
                    _AX6UIGrid_scroller2.default.resize.call(this);
                } else if (focusedColumn.dindex + 1 > this.xvar.virtualPaintStartRowIndex + (this.xvar.virtualPaintRowCount - 2)) {
                    scrollTo.call(this, { top: (this.xvar.virtualPaintRowCount - 2 - focusedColumn.dindex) * this.xvar.bodyTrHeight, timeoutUnUse: false });
                    _AX6UIGrid_scroller2.default.resize.call(this);
                }
            }

            this.focusedColumn[focusedColumn.dindex + "_" + focusedColumn.colIndex + "_" + focusedColumn.rowIndex] = focusedColumn;
            this.$.panel[focusedColumn.panelName].find('[data-ax6grid-tr-data-index="' + focusedColumn.dindex + '"]').find('[data-ax6grid-column-rowindex="' + focusedColumn.rowIndex + '"][data-ax6grid-column-colindex="' + focusedColumn.colIndex + '"]').attr('data-ax6grid-column-focused', "true");

            return moveResult;
        },
        "LR": function LR(_dx) {
            var moveResult = true,
                focusedColumn = void 0,
                originalColumn = void 0,
                while_i = 0,
                isScrollPanel = false,
                containerPanelName = "",
                nPanelInfo = void 0;

            for (var c in this.focusedColumn) {
                focusedColumn = _jqmin2.default.extend({}, this.focusedColumn[c], true);
                break;
            }
            if (!focusedColumn) return false;

            originalColumn = this.bodyRowMap[focusedColumn.rowIndex + "_" + focusedColumn.colIndex];

            columnSelect.focusClear.call(this);
            columnSelect.clear.call(this);

            if (_dx < 0) {
                focusedColumn.colIndex = focusedColumn.colIndex + _dx;
                if (focusedColumn.colIndex < 0) {
                    focusedColumn.colIndex = 0;
                    moveResult = false;
                }
            } else {
                focusedColumn.colIndex = focusedColumn.colIndex + _dx;
                if (focusedColumn.colIndex > this.colGroup.length - 1) {
                    focusedColumn.colIndex = this.colGroup.length - 1;
                    moveResult = false;
                }
            }

            if (typeof this.bodyRowMap[focusedColumn.rowIndex + "_" + focusedColumn.colIndex] === "undefined") {
                focusedColumn.rowIndex = 0;
            }

            if (this.list[focusedColumn.dindex] && this.list[focusedColumn.dindex].__isGrouping) {
                if (_dx < 0) {
                    while (typeof this.bodyGroupingMap[focusedColumn.rowIndex + "_" + focusedColumn.colIndex] === "undefined") {
                        focusedColumn.colIndex--;
                        if (focusedColumn.colIndex <= 0) {
                            // find fail
                            moveResult = false;
                            break;
                        }
                    }
                } else {
                    while (typeof this.bodyGroupingMap[focusedColumn.rowIndex + "_" + focusedColumn.colIndex] === "undefined") {
                        focusedColumn.colIndex++;
                        if (focusedColumn.colIndex >= this.colGroup.length) {
                            // find fail
                            moveResult = false;
                            break;
                        }
                    }
                }
            } else {
                if (_dx < 0) {
                    while (typeof this.bodyRowMap[focusedColumn.rowIndex + "_" + focusedColumn.colIndex] === "undefined") {
                        focusedColumn.colIndex--;
                        if (focusedColumn.colIndex <= 0) {
                            // find fail
                            moveResult = false;
                            break;
                        }
                    }
                } else {
                    while (typeof this.bodyRowMap[focusedColumn.rowIndex + "_" + focusedColumn.colIndex] === "undefined") {
                        focusedColumn.colIndex++;
                        if (focusedColumn.colIndex >= this.colGroup.length) {
                            // find fail
                            moveResult = false;
                            break;
                        }
                    }
                }
            }

            nPanelInfo = _AX6UIGrid_util2.default.findPanelByColumnIndex.call(this, focusedColumn.dindex, focusedColumn.colIndex);

            // if mergeCells
            if (this.config.body.mergeCells && this.list.length && focusedColumn.dindex > 1) {
                while (!this.$.panel[nPanelInfo.panelName].find('[data-ax6grid-tr-data-index="' + focusedColumn.dindex + '"]').find('[data-ax6grid-column-rowindex="' + focusedColumn.rowIndex + '"][data-ax6grid-column-colindex="' + focusedColumn.colIndex + '"]').get(0)) {

                    focusedColumn.dindex--;

                    if (focusedColumn.dindex < 0 || focusedColumn.dindex > this.list.length - 1) {
                        break;
                    }
                }
                nPanelInfo = _AX6UIGrid_util2.default.findPanelByColumnIndex.call(this, focusedColumn.dindex, focusedColumn.colIndex);
            }

            focusedColumn.panelName = nPanelInfo.panelName;

            // 포커스 컬럼의 위치에 따라 스크롤 처리
            var isScrollTo = function () {
                if (!this.config.virtualScrollX) return false;
                var scrollLeft = 0;
                if (focusedColumn.colIndex + 1 > this.xvar.frozenColumnIndex) {
                    if (focusedColumn.colIndex <= this.xvar.paintStartColumnIndex && this.colGroup[focusedColumn.colIndex]) {
                        scrollLeft = -this.colGroup[Number(focusedColumn.colIndex)]._sx;
                        scrollTo.call(this, { left: scrollLeft });
                        GRID.header.scrollTo.call(this, { left: scrollLeft });
                        _AX6UIGrid_scroller2.default.resize.call(this);
                        return true;
                    } else if (focusedColumn.colIndex >= this.xvar.paintEndColumnIndex && this.colGroup[Number(focusedColumn.colIndex)]) {
                        if (this.colGroup[Number(focusedColumn.colIndex)]._ex > this.xvar.bodyWidth) {
                            scrollLeft = this.colGroup[Number(focusedColumn.colIndex)]._ex - this.xvar.bodyWidth;
                            scrollTo.call(this, { left: -scrollLeft });
                            GRID.header.scrollTo.call(this, { left: -scrollLeft });
                            _AX6UIGrid_scroller2.default.resize.call(this);
                        }
                        return true;
                    }
                }
                scrollLeft = null;
                return false;
            }.call(this);

            containerPanelName = nPanelInfo.containerPanelName;
            isScrollPanel = nPanelInfo.isScrollPanel;

            this.focusedColumn[focusedColumn.dindex + "_" + focusedColumn.colIndex + "_" + focusedColumn.rowIndex] = focusedColumn;

            var $column = this.$.panel[focusedColumn.panelName].find('[data-ax6grid-tr-data-index="' + focusedColumn.dindex + '"]').find('[data-ax6grid-column-rowindex="' + focusedColumn.rowIndex + '"][data-ax6grid-column-colindex="' + focusedColumn.colIndex + '"]').attr('data-ax6grid-column-focused', "true");

            if (!isScrollTo && $column && isScrollPanel) {
                // 스크롤 패널 이라면~
                // todo : 컬럼이동할 때에도 scrollTo 체크
                var newLeft = function () {
                    if ($column.position().left + $column.outerWidth() > Math.abs(this.$.panel[focusedColumn.panelName].position().left) + this.$.panel[containerPanelName].width()) {
                        return $column.position().left + $column.outerWidth() - this.$.panel[containerPanelName].width();
                    } else if (Math.abs(this.$.panel[focusedColumn.panelName].position().left) > $column.position().left) {
                        return $column.position().left;
                    } else {
                        return;
                    }
                }.call(this);

                if (typeof newLeft !== "undefined") {
                    GRID.header.scrollTo.call(this, { left: -newLeft });
                    scrollTo.call(this, { left: -newLeft });
                    _AX6UIGrid_scroller2.default.resize.call(this);
                }
            }

            return moveResult;
        },
        "INDEX": function INDEX(_dindex) {
            var moveResult = true,
                focusedColumn = void 0,
                originalColumn = void 0,
                while_i = void 0;

            for (var c in this.focusedColumn) {
                focusedColumn = _jqmin2.default.extend({}, this.focusedColumn[c], true);
                break;
            }
            if (!focusedColumn) {
                focusedColumn = {
                    rowIndex: 0,
                    colIndex: 0
                };
            }
            originalColumn = this.bodyRowMap[focusedColumn.rowIndex + "_" + focusedColumn.colIndex];

            columnSelect.focusClear.call(this);
            columnSelect.clear.call(this);

            if (_dindex == "end") {
                _dindex = this.list.length - 1;
            }

            focusedColumn.dindex = _dindex;
            focusedColumn.rowIndex = 0;

            while_i = 0;
            while (typeof this.bodyRowMap[focusedColumn.rowIndex + "_" + focusedColumn.colIndex] === "undefined") {
                if (focusedColumn.rowIndex == 0 || while_i % 2 == (_dy > 0 ? 0 : 1)) {
                    focusedColumn.colIndex--;
                } else {
                    focusedColumn.rowIndex--;
                }

                if (focusedColumn.rowIndex <= 0 && focusedColumn.colIndex <= 0) {
                    // find fail
                    break;
                }
                while_i++;
            }

            var nPanelInfo = _AX6UIGrid_util2.default.findPanelByColumnIndex.call(this, focusedColumn.dindex, focusedColumn.colIndex);
            focusedColumn.panelName = nPanelInfo.panelName;

            // 포커스 컬럼의 위치에 따라 스크롤 처리.
            (function () {
                if (focusedColumn.dindex + 1 > this.xvar.frozenRowIndex) {
                    if (focusedColumn.dindex < this.xvar.virtualPaintStartRowIndex) {
                        scrollTo.call(this, { top: -(focusedColumn.dindex - this.xvar.frozenRowIndex) * this.xvar.bodyTrHeight });
                        _AX6UIGrid_scroller2.default.resize.call(this);
                    } else if (focusedColumn.dindex + 1 > this.xvar.virtualPaintStartRowIndex + (this.xvar.virtualPaintRowCount - 2)) {
                        scrollTo.call(this, { top: -(focusedColumn.dindex - this.xvar.frozenRowIndex - this.xvar.virtualPaintRowCount + 3) * this.xvar.bodyTrHeight });
                        _AX6UIGrid_scroller2.default.resize.call(this);
                    }
                }
            }).call(this);

            this.focusedColumn[focusedColumn.dindex + "_" + focusedColumn.colIndex + "_" + focusedColumn.rowIndex] = focusedColumn;
            this.$.panel[focusedColumn.panelName].find('[data-ax6grid-tr-data-index="' + focusedColumn.dindex + '"]').find('[data-ax6grid-column-rowindex="' + focusedColumn.rowIndex + '"][data-ax6grid-column-colindex="' + focusedColumn.colIndex + '"]').attr('data-ax6grid-column-focused', "true");

            return moveResult;
        }
    };

    var processor = {
        "UP": function UP() {
            return focus["UD"].call(this, -1);
        },
        "DOWN": function DOWN() {
            return focus["UD"].call(this, 1);
        },
        "LEFT": function LEFT() {
            return focus["LR"].call(this, -1);
        },
        "RIGHT": function RIGHT() {
            return focus["LR"].call(this, 1);
        },
        "HOME": function HOME() {
            return focus["INDEX"].call(this, 0);
        },
        "END": function END() {
            return focus["INDEX"].call(this, "end");
        },
        "position": function position(_position) {
            return focus["INDEX"].call(this, _position);
        }
    };

    if (_position in processor) {
        return processor[_position].call(this);
    } else {
        return processor["position"].call(this, _position);
    }
};

var inlineEdit = {
    active: function active(_focusedColumn, _e, _initValue) {
        var self = this,
            dindex = void 0,
            doindex = void 0,
            colIndex = void 0,
            rowIndex = void 0,
            panelName = void 0,
            colspan = void 0,
            col = void 0,
            editor = void 0;

        for (var key in _focusedColumn) {
            panelName = _focusedColumn[key].panelName;
            dindex = _focusedColumn[key].dindex;
            doindex = _focusedColumn[key].doindex;
            colIndex = _focusedColumn[key].colIndex;
            rowIndex = _focusedColumn[key].rowIndex;
            colspan = _focusedColumn[key].colspan;

            // 인라인 에디팅을 멈춰야 하는 경우 조건
            col = this.colGroup[colIndex];
            if (!(editor = col.editor)) return this;

            // editor disabled 체크
            if (_AX6Util2.default.isFunction(editor.disabled)) {
                if (editor.disabled.call({
                    list: this.list,
                    dindex: dindex,
                    item: this.list[dindex],
                    key: col.key,
                    value: _initValue
                })) {
                    return this;
                }
            }

            // 조건에 맞지 않는 에디팅 타입이면 반응 없음.
            if (!function (_editor, _type) {
                if (_editor.type in _AX6UIGrid_inline_editor2.default) {
                    return _AX6UIGrid_inline_editor2.default[_editor.type].editMode == "popup";
                }
            }(editor)) {
                // 체크 박스 타입이면 값 변경 시도
                if (editor.type == "checkbox") {
                    var checked = void 0,
                        newValue = void 0;
                    if (editor.config && editor.config.trueValue) {
                        if (checked = !(_initValue == editor.config.trueValue)) {
                            newValue = editor.config.trueValue;
                        } else {
                            newValue = editor.config.falseValue;
                        }
                    } else {
                        newValue = checked = _initValue == false || _initValue == "false" || _initValue < "1" ? "true" : "false";
                    }

                    _AX6UIGrid_data2.default.setValue.call(self, dindex, doindex, col.key, newValue);
                    updateRowState.call(self, ["cellChecked"], dindex, doindex, {
                        key: col.key, rowIndex: rowIndex, colIndex: colIndex,
                        editorConfig: col.editor.config, checked: checked
                    });
                }
                return this;
            }

            if (this.list[dindex].__isGrouping) {
                return false;
            }
            if (key in this.inlineEditing) {
                return false;
            }

            this.inlineEditing[key] = {
                editor: editor,
                panelName: panelName,
                columnKey: key,
                column: _focusedColumn[key],
                useReturnToSave: _AX6UIGrid_inline_editor2.default[editor.type].useReturnToSave
            };
            this.isInlineEditing = true;
        }
        if (this.isInlineEditing) {

            var originalValue = _AX6UIGrid_data2.default.getValue.call(self, dindex, doindex, col.key),
                initValue = function (__value, __editor) {
                if (_AX6Util2.default.isNothing(__value)) {
                    __value = _AX6Util2.default.isNothing(originalValue) ? "" : originalValue;
                }

                if (__editor.type == "money") {
                    return _AX6Util2.default.number(__value, { "money": true });
                } else {
                    return __value;
                }
            }.call(this, _initValue, editor);

            this.inlineEditing[key].$inlineEditorCell = this.$["panel"][panelName].find('[data-ax6grid-tr-data-index="' + dindex + '"]').find('[data-ax6grid-column-rowindex="' + rowIndex + '"][data-ax6grid-column-colindex="' + colIndex + '"]').find('[data-ax6grid-cellholder]');

            this.inlineEditing[key].$inlineEditor = _AX6UIGrid_inline_editor2.default[editor.type].init(this, key, editor, this.inlineEditing[key].$inlineEditorCell, initValue);

            return true;
        }
    },
    deActive: function deActive(_msg, _key, _value) {
        // console.log(this.inlineEditing.column.dindex, this.inlineEditing.$inlineEditor.val());
        if (!this.inlineEditing[_key]) return this;

        var panelName = this.inlineEditing[_key].panelName,
            dindex = this.inlineEditing[_key].column.dindex,
            doindex = this.inlineEditing[_key].column.doindex,
            rowIndex = this.inlineEditing[_key].column.rowIndex,
            colIndex = this.inlineEditing[_key].column.colIndex,
            column = this.bodyRowMap[this.inlineEditing[_key].column.rowIndex + "_" + this.inlineEditing[_key].column.colIndex],
            editorValue = function ($inlineEditor) {
            if (typeof _value === "undefined") {
                if ($inlineEditor.get(0).tagName == "SELECT" || $inlineEditor.get(0).tagName == "INPUT" || $inlineEditor.get(0).tagName == "TEXTAREA") {
                    return $inlineEditor.val();
                } else {
                    _msg = "CANCEL";
                    return false;
                }
            } else {
                return _value;
            }
        }(this.inlineEditing[_key].$inlineEditor),
            newValue = function (__value, __editor) {
            if (__editor.type == "money") {
                return _AX6Util2.default.number(__value);
            } else {
                return __value;
            }
        }.call(this, editorValue, column.editor);

        var action = {
            "CANCEL": function CANCEL(_dindex, _column, _newValue) {
                action["__clear"].call(this);
            },
            "RETURN": function RETURN(_dindex, _doindex, _column, _newValue) {
                if (_AX6UIGrid_data2.default.setValue.call(this, _dindex, _doindex, _column.key, _newValue)) {
                    action["__clear"].call(this);
                    repaintCell.call(this, panelName, _dindex, _doindex, rowIndex, colIndex, _newValue);
                } else {
                    action["__clear"].call(this);
                }
            },
            "__clear": function __clear() {
                this.isInlineEditing = false;
                var bindedAx5ui = this.inlineEditing[_key].$inlineEditor.data("binded-ax5ui");
                if (bindedAx5ui == "ax5picker") {
                    this.inlineEditing[_key].$inlineEditor.ax5picker("close");
                } else if (bindedAx5ui == "ax5select") {
                    this.inlineEditing[_key].$inlineEditor.ax5select("close");
                }

                this.inlineEditing[_key].$inlineEditor.remove();
                this.inlineEditing[_key].$inlineEditor = null;
                this.inlineEditing[_key].$inlineEditorCell = null;
                this.inlineEditing[_key] = undefined;
                delete this.inlineEditing[_key]; // delete 지원안하는 브라우저 테스트..
            }
        };

        if (_msg in action) {
            action[_msg || "RETURN"].call(this, dindex, doindex, column, newValue);
        } else {
            action["__clear"].call(this);
        }
    },
    keydown: function keydown(key, columnKey, _options) {
        var processor = {
            "ESC": function ESC() {
                for (var columnKey in this.inlineEditing) {
                    inlineEdit.deActive.call(this, "CANCEL", columnKey);
                }
            },
            "RETURN": function RETURN() {
                if (this.isInlineEditing) {
                    if (this.inlineEditing[columnKey] && this.inlineEditing[columnKey].useReturnToSave) {
                        // todo : 네이밍 검증 할 필요있음.
                        inlineEdit.deActive.call(this, "RETURN", columnKey);
                    } else {
                        return false;
                    }
                } else {

                    for (var k in this.focusedColumn) {
                        var _column = this.focusedColumn[k],
                            column = this.bodyRowMap[_column.rowIndex + "_" + _column.colIndex],
                            dindex = _column.dindex,
                            doindex = _column.doindex,
                            value = "",
                            col = this.colGroup[_column.colIndex];

                        if (column) {
                            if (!this.list[dindex].__isGrouping) {
                                value = _AX6UIGrid_data2.default.getValue.call(this, dindex, doindex, column.key);
                            }
                        }

                        if (col.editor && _AX6UIGrid_inline_editor2.default[col.editor.type].editMode === "inline") {
                            if (_options && _options.moveFocus) {} else {
                                if (column.editor && column.editor.type == "checkbox") {
                                    value = _AX6UIGrid_data2.default.getValue.call(this, dindex, doindex, column.key);

                                    var checked = void 0,
                                        newValue = void 0;
                                    if (column.editor.config && column.editor.config.trueValue) {
                                        // console.log(value, column.editor.config.trueValue);

                                        if (value != column.editor.config.trueValue) {
                                            newValue = column.editor.config.trueValue;
                                            checked = true;
                                        } else {
                                            newValue = column.editor.config.falseValue;
                                            checked = false;
                                        }
                                    } else {
                                        newValue = checked = value == false || value == "false" || value < "1" ? "true" : "false";
                                    }

                                    _AX6UIGrid_data2.default.setValue.call(this, dindex, doindex, column.key, newValue);
                                    updateRowState.call(this, ["cellChecked"], dindex, doindex, {
                                        key: column.key, rowIndex: _column.rowIndex, colIndex: _column.colIndex,
                                        editorConfig: column.editor.config, checked: checked
                                    });
                                }
                            }
                        } else {
                            inlineEdit.active.call(this, this.focusedColumn, null, value);
                        }
                    }
                }
                return true;
            }
        };

        if (key in processor) {
            processor[key].call(this, key, columnKey, _options);
        }
    }
};

var getExcelString = function getExcelString() {
    var cfg = this.config,
        list = this.list,
        bodyRowData = this.bodyRowTable,
        footSumData = this.footSumTable,
        bodyGroupingData = this.bodyGroupingTable;

    // body-scroll 의 포지션에 의존적이므로..
    var getBody = function getBody(_colGroup, _bodyRow, _groupRow, _list) {
        var SS = [],
            di = void 0,
            dl = void 0,
            tri = void 0,
            trl = void 0,
            ci = void 0,
            cl = void 0,
            col = void 0,
            val = void 0;

        //SS.push('<table border="1">');
        for (di = 0, dl = _list.length; di < dl; di++) {
            var isGroupingRow = false,
                rowTable = void 0;

            if (_groupRow && "__isGrouping" in _list[di]) {
                rowTable = _groupRow;
                isGroupingRow = true;
            } else {
                rowTable = _bodyRow;
            }

            for (tri = 0, trl = rowTable.rows.length; tri < trl; tri++) {
                SS.push('\n<tr>');
                for (ci = 0, cl = rowTable.rows[tri].cols.length; ci < cl; ci++) {
                    col = rowTable.rows[tri].cols[ci];

                    SS.push('<td ', 'colspan="' + col.colspan + '" ', 'rowspan="' + col.rowspan + '" ', '>', isGroupingRow ? getGroupingValue.call(this, _list[di], di, col) : getFieldValue.call(this, _list, _list[di], di, col, val, "text"), '&nbsp;</td>');
                }
                SS.push('\n</tr>');
            }
        }
        //SS.push('</table>');
        return SS.join('');
    };
    var getSum = function getSum(_colGroup, _bodyRow, _list) {
        var SS = [],
            tri = void 0,
            trl = void 0,
            ci = void 0,
            cl = void 0,
            col = void 0;

        //SS.push('<table border="1">');
        for (tri = 0, trl = _bodyRow.rows.length; tri < trl; tri++) {
            SS.push('\n<tr>');
            for (ci = 0, cl = _bodyRow.rows[tri].cols.length; ci < cl; ci++) {
                col = _bodyRow.rows[tri].cols[ci];
                SS.push('<td ', 'colspan="' + col.colspan + '" ', 'rowspan="' + col.rowspan + '" ', '>', getSumFieldValue.call(this, _list, col), '</td>');
            }
            SS.push('\n</tr>');
        }
        //SS.push('</table>');

        return SS.join('');
    };

    var po = [];
    po.push(getBody.call(this, this.headerColGroup, bodyRowData, bodyGroupingData, list));
    if (cfg.footSum) {
        // 바닥 요약
        po.push(getSum.call(this, this.headerColGroup, footSumData, list));
    }

    // right
    if (cfg.rightSum) {
        // todo : right 표현 정리
    }

    return po.join('');
};

var toggleCollapse = function toggleCollapse(_dindex, _doindex, _collapse) {
    if (_AX6UIGrid_data2.default.toggleCollapse.call(this, _dindex, _doindex, _collapse)) {
        this.proxyList = _AX6UIGrid_data2.default.getProxyList.call(this, this.list);
        repaint.call(this);
    }
};

var click = function click(_dindex, _doindex) {
    var that = {
        self: this,
        page: this.page,
        list: this.list,
        item: this.list[_dindex],
        dindex: _dindex
    };

    moveFocus.call(this, _dindex);
    if (this.config.body.onClick) {
        this.config.body.onClick.call(that);
    }

    that = null;
    // console.log(this.$["panel"]["body-scroll"].find('[data-ax6grid-tr-data-index="' + _dindex + '"]>td:first-child'));
};

var dblClick = function dblClick(_dindex, _doindex) {
    var that = {
        self: this,
        page: this.page,
        list: this.list,
        item: this.list[_dindex],
        dindex: _dindex
    };

    moveFocus.call(this, _dindex);

    if (this.config.body.onDBLClick) {
        this.config.body.onDBLClick.call(that);
    }

    that = null;
};

exports.default = {
    init: init,
    repaint: repaint,
    repaintCell: repaintCell,
    repaintRow: repaintRow,
    updateRowState: updateRowState,
    updateRowStateAll: updateRowStateAll,
    scrollTo: scrollTo,
    blur: blur,
    moveFocus: moveFocus,
    inlineEdit: inlineEdit,
    getExcelString: getExcelString,
    toggleCollapse: toggleCollapse,
    click: click,
    dblClick: dblClick
};