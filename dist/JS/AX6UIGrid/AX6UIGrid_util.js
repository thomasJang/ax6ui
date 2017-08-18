"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jqmin = require("jqmin");

var _jqmin2 = _interopRequireDefault(_jqmin);

var _AX6Util = require("../AX6Util");

var _AX6Util2 = _interopRequireDefault(_AX6Util);

var _AX6Info = require("../AX6Info");

var _AX6Info2 = _interopRequireDefault(_AX6Info);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @method ax5grid.util.divideTableByFrozenColumnIndex
 * @param _table
 * @param _frozenColumnIndex
 * @returns {{leftHeaderData: {rows: Array}, headerData: {rows: Array}}}
 */
var divideTableByFrozenColumnIndex = function divideTableByFrozenColumnIndex(_table, _frozenColumnIndex) {

  var tempTable_l = { rows: [] },
      tempTable_r = { rows: [] };

  for (var r = 0, rl = _table.rows.length; r < rl; r++) {
    var row = _table.rows[r];

    tempTable_l.rows[r] = { cols: [] };
    tempTable_r.rows[r] = { cols: [] };

    for (var c = 0, cl = row.cols.length; c < cl; c++) {
      var col = _jqmin2.default.extend({}, row.cols[c]),
          colStartIndex = col.colIndex,
          colEndIndex = col.colIndex + col.colspan;

      if (colStartIndex < _frozenColumnIndex) {
        if (colEndIndex <= _frozenColumnIndex) {
          // 좌측편에 변형없이 추가
          tempTable_l.rows[r].cols.push(col);
        } else {
          var leftCol = _jqmin2.default.extend({}, col),
              rightCol = _jqmin2.default.extend({}, leftCol);

          leftCol.colspan = _frozenColumnIndex - leftCol.colIndex;
          rightCol.colIndex = _frozenColumnIndex;
          rightCol.colspan = col.colspan - leftCol.colspan;

          tempTable_l.rows[r].cols.push(leftCol);
          if (rightCol.colspan) {
            tempTable_r.rows[r].cols.push(rightCol);
          }
        }
      } else {
        // 오른편
        tempTable_r.rows[r].cols.push(col);
      }

      col = null;
      colStartIndex = null;
      colEndIndex = null;
    }

    row = null;
  }

  return {
    leftData: tempTable_l,
    rightData: tempTable_r
  };
};

var getTableByStartEndColumnIndex = function getTableByStartEndColumnIndex(_table, _startColumnIndex, _endColumnIndex) {

  var tempTable = { rows: [] };
  for (var r = 0, rl = _table.rows.length; r < rl; r++) {
    var row = _table.rows[r];

    tempTable.rows[r] = { cols: [] };
    for (var c = 0, cl = row.cols.length; c < cl; c++) {
      var col = _jqmin2.default.extend({}, row.cols[c]),
          colStartIndex = col.colIndex,
          colEndIndex = col.colIndex + col.colspan;

      if (_startColumnIndex <= colStartIndex || colEndIndex <= _endColumnIndex) {
        if (_startColumnIndex <= colStartIndex && colEndIndex <= _endColumnIndex) {
          // 변형없이 추가
          tempTable.rows[r].cols.push(col);
        } else if (_startColumnIndex > colStartIndex && colEndIndex > _startColumnIndex) {
          // 앞에서 걸친경우
          col.colspan = colEndIndex - _startColumnIndex;
          tempTable.rows[r].cols.push(col);
        } else if (colEndIndex > _endColumnIndex && colStartIndex <= _endColumnIndex) {
          tempTable.rows[r].cols.push(col);
        }
      }
    }
  }

  return tempTable;
};

var getMousePosition = function getMousePosition(e) {
  var mouseObj = void 0,
      originalEvent = e.originalEvent ? e.originalEvent : e;

  mouseObj = 'changedTouches' in originalEvent && originalEvent.changedTouches ? originalEvent.changedTouches[0] : originalEvent;
  // clientX, Y 쓰면 스크롤에서 문제 발생
  return {
    clientX: mouseObj.pageX,
    clientY: mouseObj.pageY
  };
};

var ENM = {
  "mousedown": _AX6Info2.default.supportTouch ? "touchstart" : "mousedown",
  "mousemove": _AX6Info2.default.supportTouch ? "touchmove" : "mousemove",
  "mouseup": _AX6Info2.default.supportTouch ? "touchend" : "mouseup"
};

var makeHeaderTable = function makeHeaderTable(_columns) {
  var columns = _AX6Util2.default.deepCopy(_columns),
      cfg = this.config,
      table = {
    rows: []
  },
      colIndex = 0,
      maekRows = function maekRows(_columns, depth, parentField) {
    var row = { cols: [] };
    var i = 0,
        l = _columns.length;

    for (; i < l; i++) {
      var field = _columns[i];
      var colspan = 1;

      if (!field.hidden) {
        field.colspan = 1;
        field.rowspan = 1;

        field.rowIndex = depth;
        field.colIndex = function () {
          if (!parentField) {
            return colIndex++;
          } else {
            colIndex = parentField.colIndex + i + 1;
            return parentField.colIndex + i;
          }
        }();

        row.cols.push(field);

        if ('columns' in field) {
          colspan = maekRows(field.columns, depth + 1, field);
        } else {
          field.width = 'width' in field ? field.width : cfg.columnMinWidth;
        }
        field.colspan = colspan;
      } else {}
    }

    if (row.cols.length > 0) {
      if (!table.rows[depth]) {
        table.rows[depth] = { cols: [] };
      }
      table.rows[depth].cols = table.rows[depth].cols.concat(row.cols);
      return row.cols.length - 1 + colspan;
    } else {
      return colspan;
    }
  };

  maekRows(columns, 0);

  // set rowspan
  for (var r = 0, rl = table.rows.length; r < rl; r++) {
    for (var c = 0, cl = table.rows[r].cols.length; c < cl; c++) {
      if (!('columns' in table.rows[r].cols[c])) {
        table.rows[r].cols[c].rowspan = rl - r;
      }
    }
  }

  return table;
};

var makeBodyRowTable = function makeBodyRowTable(_columns) {
  var columns = _AX6Util2.default.deepCopy(_columns),
      table = {
    rows: []
  },
      colIndex = 0,
      maekRows = function maekRows(_columns, depth, parentField) {
    var row = { cols: [] },
        i = 0,
        l = _columns.length,
        colspan = 1;

    var selfMakeRow = function selfMakeRow(__columns) {
      var i = 0,
          l = __columns.length;
      for (; i < l; i++) {
        var field = __columns[i],
            _colspan = 1;

        if (!field.hidden) {

          if ('key' in field) {
            field.colspan = 1;
            field.rowspan = 1;

            field.rowIndex = depth;
            field.colIndex = function () {
              if (!parentField) {
                return colIndex++;
              } else {
                colIndex = parentField.colIndex + i + 1;
                return parentField.colIndex + i;
              }
            }();

            row.cols.push(field);
            if ('columns' in field) {
              _colspan = maekRows(field.columns, depth + 1, field);
            }
            field.colspan = _colspan;
          } else {
            if ('columns' in field) {
              selfMakeRow(field.columns, depth);
            }
          }
        } else {}
      }
    };

    for (; i < l; i++) {
      var field = _columns[i];
      colspan = 1;

      if (!field.hidden) {

        if ('key' in field) {
          field.colspan = 1;
          field.rowspan = 1;

          field.rowIndex = depth;
          field.colIndex = function () {
            if (!parentField) {
              return colIndex++;
            } else {
              colIndex = parentField.colIndex + i + 1;
              return parentField.colIndex + i;
            }
          }();

          row.cols.push(field);
          if ('columns' in field) {
            colspan = maekRows(field.columns, depth + 1, field);
          }
          field.colspan = colspan;
        } else {
          if ('columns' in field) {
            selfMakeRow(field.columns, depth);
          }
        }
      } else {}

      field = null;
    }

    if (row.cols.length > 0) {
      if (!table.rows[depth]) {
        table.rows[depth] = { cols: [] };
      }
      table.rows[depth].cols = table.rows[depth].cols.concat(row.cols);
      return row.cols.length - 1 + colspan;
    } else {
      return colspan;
    }
  };

  maekRows(columns, 0);

  (function (table) {
    // set rowspan
    for (var r = 0, rl = table.rows.length; r < rl; r++) {
      var row = table.rows[r];
      for (var c = 0, cl = row.cols.length; c < cl; c++) {
        var col = row.cols[c];
        if (!('columns' in col)) {
          col.rowspan = rl - r;
        }
        col = null;
      }
      row = null;
    }
  })(table);

  return table;
};

var makeBodyRowMap = function makeBodyRowMap(_table) {
  var map = {};
  _table.rows.forEach(function (row) {
    row.cols.forEach(function (col) {
      map[col.rowIndex + "_" + col.colIndex] = _jqmin2.default.extend({}, col);
    });
  });
  return map;
};

var makeFootSumTable = function makeFootSumTable(_footSumColumns) {
  var table = {
    rows: []
  };

  for (var r = 0, rl = _footSumColumns.length; r < rl; r++) {
    var footSumRow = _footSumColumns[r],
        addC = 0;

    table.rows[r] = { cols: [] };

    for (var c = 0, cl = footSumRow.length; c < cl; c++) {
      if (addC > this.colGroup.length) break;
      var colspan = footSumRow[c].colspan || 1;
      if (footSumRow[c].label || footSumRow[c].key) {
        table.rows[r].cols.push({
          colspan: colspan,
          rowspan: 1,
          colIndex: addC,
          columnAttr: "sum",
          align: footSumRow[c].align,
          label: footSumRow[c].label,
          key: footSumRow[c].key,
          collector: footSumRow[c].collector,
          formatter: footSumRow[c].formatter
        });
      } else {
        table.rows[r].cols.push({
          colIndex: addC,
          colspan: colspan,
          rowspan: 1,
          label: "&nbsp;"
        });
      }
      addC += colspan;
      colspan = null;
    }

    if (addC < this.colGroup.length) {
      for (var _c = addC; _c < this.colGroup.length; _c++) {
        table.rows[r].cols.push({
          colIndex: _c,
          colspan: 1,
          rowspan: 1,
          label: "&nbsp;"
        });
      }
    }
    footSumRow = null;
    addC = null;
  }

  return table;
};

var makeBodyGroupingTable = function makeBodyGroupingTable(_bodyGroupingColumns) {
  var table = {
    rows: []
  },
      r = 0,
      addC = 0;

  table.rows[r] = { cols: [] };
  for (var _c2 = 0, cl = _bodyGroupingColumns.length; _c2 < cl; _c2++) {
    if (addC > this.columns.length) break;
    var colspan = _bodyGroupingColumns[_c2].colspan || 1;
    if (_bodyGroupingColumns[_c2].label || _bodyGroupingColumns[_c2].key) {
      table.rows[r].cols.push({
        colspan: colspan,
        rowspan: 1,
        rowIndex: 0,
        colIndex: addC,
        columnAttr: "default",
        align: _bodyGroupingColumns[_c2].align,
        label: _bodyGroupingColumns[_c2].label,
        key: _bodyGroupingColumns[_c2].key,
        collector: _bodyGroupingColumns[_c2].collector,
        formatter: _bodyGroupingColumns[_c2].formatter
      });
    } else {
      table.rows[r].cols.push({
        rowIndex: 0,
        colIndex: addC,
        colspan: colspan,
        rowspan: 1,
        label: "&nbsp;"
      });
    }
    addC += colspan;
  }

  if (addC < this.colGroup.length) {
    for (var c = addC; c < this.colGroup.length; c++) {
      table.rows[r].cols.push({
        rowIndex: 0,
        colIndex: c,
        colspan: 1,
        rowspan: 1,
        label: "&nbsp;"
      });
    }
  }

  return table;
};

var findPanelByColumnIndex = function findPanelByColumnIndex(_dindex, _colIndex, _rowIndex) {
  var _containerPanelName = void 0,
      _isScrollPanel = false,
      _panels = [];

  if (this.xvar.frozenRowIndex > _dindex) _panels.push("top");
  if (this.xvar.frozenColumnIndex > _colIndex) _panels.push("left");
  _panels.push("body");

  if (this.xvar.frozenColumnIndex <= _colIndex || this.xvar.frozenRowIndex <= _dindex) {
    _containerPanelName = _panels.join("-");
    _panels.push("scroll");
    _isScrollPanel = true;
  }

  return {
    panelName: _panels.join("-"),
    containerPanelName: _containerPanelName,
    isScrollPanel: _isScrollPanel
  };
};

var getRealPathForDataItem = function getRealPathForDataItem(_dataPath) {
  var path = [],
      _path = [].concat(_dataPath.split(/[\.\[\]]/g));

  _path.forEach(function (n) {
    if (n !== "") path.push("[\"" + n.replace(/['\"]/g, "") + "\"]");
  });
  _path = null;
  return path.join("");
};

exports.default = {
  divideTableByFrozenColumnIndex: divideTableByFrozenColumnIndex,
  getTableByStartEndColumnIndex: getTableByStartEndColumnIndex,
  getMousePosition: getMousePosition,
  ENM: ENM,
  makeHeaderTable: makeHeaderTable,
  makeBodyRowTable: makeBodyRowTable,
  makeBodyRowMap: makeBodyRowMap,
  makeFootSumTable: makeFootSumTable,
  makeBodyGroupingTable: makeBodyGroupingTable,
  findPanelByColumnIndex: findPanelByColumnIndex,
  getRealPathForDataItem: getRealPathForDataItem
};