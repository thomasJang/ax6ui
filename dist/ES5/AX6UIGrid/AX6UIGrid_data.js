"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _jqmin = require("jqmin");

var _jqmin2 = _interopRequireDefault(_jqmin);

var _AX6Util = require("../AX6Util");

var _AX6Util2 = _interopRequireDefault(_AX6Util);

var _AX6UIGrid_page = require("./AX6UIGrid_page");

var _AX6UIGrid_page2 = _interopRequireDefault(_AX6UIGrid_page);

var _AX6UIGrid_util = require("./AX6UIGrid_util");

var _AX6UIGrid_util2 = _interopRequireDefault(_AX6UIGrid_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var init = function init() {};

var clearGroupingData = function clearGroupingData(_list) {
    var i = 0,
        l = _list.length,
        returnList = [];
    for (; i < l; i++) {
        if (_list[i] && !_list[i]["__isGrouping"]) {
            if (_list[i][this.config.columnKeys.selected]) {
                this.selectedDataIndexs.push(i);
            }
            returnList.push(_jqmin2.default.extend({}, _list[i]));
        }
    }
    return returnList;
};

var initData = function initData(_list) {
    this.selectedDataIndexs = [];
    // this.deletedList = [];
    // todo : deletedList 초기화 시점이 언제로 하는게 좋은가. set 메소드에서 초기화 하는 것으로 수정

    var i = 0,
        l = _list.length,
        returnList = [],
        appendIndex = 0,
        dataRealRowCount = 0,
        lineNumber = 0;

    if (this.config.body.grouping) {

        var groupingKeys = _AX6Util2.default.map(this.bodyGrouping.by, function () {
            return {
                key: this,
                compareString: "",
                grouping: false,
                list: []
            };
        });

        var gi = 0,
            gl = groupingKeys.length,
            compareString = void 0,
            appendRow = [],
            ari = void 0;
        for (; i < l + 1; i++) {
            gi = 0;

            if (_list[i] && _list[i][this.config.columnKeys.deleted]) {
                this.deletedList.push(_list[i]);
            } else {
                compareString = ""; // 그룹핑 구문검사용
                appendRow = []; // 현재줄 앞에 추가해줘야 하는 줄

                // 그룹핑 구문검사
                for (; gi < gl; gi++) {
                    if (_list[i]) {
                        compareString += "$|$" + _list[i][groupingKeys[gi].key];
                    }

                    if (appendIndex > 0 && compareString != groupingKeys[gi].compareString) {
                        var appendRowItem = { keys: [], labels: [], list: groupingKeys[gi].list };
                        for (var ki = 0; ki < gi + 1; ki++) {
                            appendRowItem.keys.push(groupingKeys[ki].key);
                            appendRowItem.labels.push(_list[i - 1][groupingKeys[ki].key]);
                        }
                        appendRow.push(appendRowItem);
                        groupingKeys[gi].list = [];
                    }

                    groupingKeys[gi].list.push(_list[i]);
                    groupingKeys[gi].compareString = compareString;
                }

                // 새로 추가해야할 그룹핑 row
                ari = appendRow.length;
                while (ari--) {
                    returnList.push({ __isGrouping: true, __groupingList: appendRow[ari].list, __groupingBy: { keys: appendRow[ari].keys, labels: appendRow[ari].labels } });
                }
                //~ 그룹핑 구문 검사 완료

                if (_list[i]) {
                    if (_list[i][this.config.columnKeys.selected]) {
                        this.selectedDataIndexs.push(i);
                    }
                    // 그룹핑이 적용된 경우 오리지널 인덱스 의미 없음 : 정렬보다 그룹핑이 더 중요하므로.
                    _list[i]["__original_index"] = _list[i]["__index"] = lineNumber;
                    returnList.push(_list[i]);

                    dataRealRowCount++;
                    appendIndex++;
                    lineNumber++;
                }
            }
        }
    } else {
        for (; i < l; i++) {
            if (_list[i]) {
                if (_list[i][this.config.columnKeys.deleted]) {
                    this.deletedList.push(_list[i]);
                } else {

                    if (_list[i][this.config.columnKeys.selected]) {
                        this.selectedDataIndexs.push(i);
                    }

                    // __original_index 인덱스 키가 없다면 추가.
                    if (typeof _list[i]["__original_index"] === "undefined") {
                        _list[i]["__original_index"] = lineNumber;
                    }
                    _list[i]["__index"] = lineNumber;
                    dataRealRowCount++;
                    lineNumber++;
                    returnList.push(_list[i]);
                }
            }
        }
    }

    // 원본 데이터의 갯수
    // grouping은 제외하고 수집됨.
    this.xvar.dataRealRowCount = dataRealRowCount;
    return returnList;
};

var arrangeData4tree = function arrangeData4tree(_list) {
    this.selectedDataIndexs = [];
    this.deletedList = [];
    var i = 0,
        seq = 0,
        appendIndex = 0,
        dataRealRowCount = 0,
        lineNumber = 0;

    var li = _list.length;
    var keys = this.config.tree.columnKeys;
    var hashDigit = this.config.tree.hashDigit;
    var listIndexMap = {};

    while (li--) {
        delete _list[li][keys.parentHash];
        delete _list[li][keys.selfHash];
        //delete _list[li][keys.childrenLength];
    }

    /// 루트 아이템 수집
    i = 0;
    seq = 0;
    li = _list.length;
    for (; i < li; i++) {
        if (_list[i]) {
            listIndexMap[_list[i][keys.selfKey]] = i; // 인덱싱

            if (_AX6Util2.default.isNothing(_list[i][keys.parentKey]) || _list[i][keys.parentKey] === "top") {
                // 최상위 아이템인 경우
                _list[i][keys.parentKey] = "top";
                _list[i][keys.children] = [];
                _list[i][keys.parentHash] = _AX6Util2.default.setDigit("0", hashDigit);
                _list[i][keys.selfHash] = _AX6Util2.default.setDigit("0", hashDigit) + "." + _AX6Util2.default.setDigit(seq, hashDigit);
                _list[i][keys.depth] = 0;
                _list[i][keys.hidden] = false;

                seq++;
            }
        }
    }

    /// 자식 아이템 수집
    i = 0;
    lineNumber = 0;
    for (; i < li; i++) {
        var _parent = void 0,
            _parentHash = void 0;
        if (_list[i] && _list[i][keys.parentKey] !== "top" && typeof _list[i][keys.parentHash] === "undefined") {

            if (_parent = _list[listIndexMap[_list[i][keys.parentKey]]]) {
                _parentHash = _parent[keys.selfHash];
                _list[i][keys.children] = [];
                _list[i][keys.parentHash] = _parentHash;
                _list[i][keys.selfHash] = _parentHash + "." + _AX6Util2.default.setDigit(_parent[keys.children].length, hashDigit);
                _list[i][keys.depth] = _parent[keys.depth] + 1;
                if (_parent[keys.collapse] || _parent[keys.hidden]) _list[i][keys.hidden] = true;
                _parent[keys.children].push(_list[i][keys.selfKey]);
            } else {
                _list[i][keys.parentKey] = "top";
                _list[i][keys.children] = [];
                _list[i][keys.parentHash] = _AX6Util2.default.setDigit("0", hashDigit);
                _list[i][keys.selfHash] = _AX6Util2.default.setDigit("0", hashDigit) + "." + _AX6Util2.default.setDigit(seq, hashDigit);
                _list[i][keys.hidden] = false;

                seq++;
            }
        }

        if (_list[i]) {
            if (_list[i][this.config.columnKeys.deleted]) {
                this.deletedList.push(_list[i]);
                _list[i][keys.hidden] = true;
            } else if (_list[i][this.config.columnKeys.selected]) {
                this.selectedDataIndexs.push(i);
            }

            _list[i]["__index"] = lineNumber;
            dataRealRowCount++;
            lineNumber++;
        }
    }

    this.listIndexMap = listIndexMap;
    this.xvar.dataRealRowCount = dataRealRowCount;

    return _list;
};

var getProxyList = function getProxyList(_list) {
    var i = 0,
        l = _list.length,
        returnList = [];
    for (; i < l; i++) {

        if (_list[i] && !_list[i][this.config.tree.columnKeys.hidden]) {
            _list[i].__origin_index__ = i;
            returnList.push(_list[i]);
        }
    }
    return returnList;
};

var set = function set(data) {

    var list = void 0;
    if (_AX6Util2.default.isArray(data)) {
        this.page = null;
        list = data;
    } else if ("page" in data) {
        this.page = _jqmin2.default.extend({}, data.page);
        list = data.list;
    }

    // console.log(this.list.length);

    if (this.config.tree.use) {
        this.list = arrangeData4tree.call(this, list);
        this.proxyList = getProxyList.call(this, sort.call(this, this.sortInfo, this.list));
    } else {
        this.proxyList = null;
        this.list = initData.call(this, !this.config.remoteSort && Object.keys(this.sortInfo).length ? sort.call(this, this.sortInfo, list) : list);
    }
    this.selectedDataIndexs = [];
    this.deletedList = [];

    this.needToPaintSum = true;
    this.xvar.frozenRowIndex = this.config.frozenRowIndex > this.list.length ? this.list.length : this.config.frozenRowIndex;
    this.xvar.paintStartRowIndex = undefined; // 스크롤 포지션 저장변수 초기화
    this.xvar.virtualPaintStartRowIndex = undefined; // 스크롤 포지션 저장변수 초기화
    _AX6UIGrid_page2.default.navigationUpdate.call(this);

    if (this.config.body.grouping) {}
    return this;
};

var get = function get(_type) {
    return {
        list: this.list,
        page: this.page
    };
};

var getList = function getList(_type) {
    var returnList = [];
    //let list = (this.proxyList) ? this.proxyList : this.list;
    var list = this.list;
    var i = 0,
        l = list.length;
    switch (_type) {
        case "modified":
            for (; i < l; i++) {
                if (list[i] && !list[i]["__isGrouping"] && list[i][this.config.columnKeys.modified]) {
                    returnList.push(_jqmin2.default.extend({}, list[i]));
                }
            }
            break;
        case "selected":
            for (; i < l; i++) {
                if (list[i] && !list[i]["__isGrouping"] && list[i][this.config.columnKeys.selected]) {
                    returnList.push(_jqmin2.default.extend({}, list[i]));
                }
            }
            break;
        case "deleted":
            //_list = clearGroupingData(this.list);
            returnList = [].concat(this.deletedList);
            break;
        default:
            returnList = clearGroupingData.call(this, list);
    }
    return returnList;
};

var add = function add(_row, _dindex, _options) {
    var list = this.config.body.grouping ? clearGroupingData.call(this, this.list) : this.list;
    var processor = {
        "first": function first() {
            list = [].concat(_row).concat(list);
        },
        "last": function last() {
            list = list.concat([].concat(_row));
        }
    };

    if (this.config.tree.use) {
        var _list2 = this.list.concat([].concat(_row));

        this.list = arrangeData4tree.call(this, _list2);
        this.proxyList = getProxyList.call(this, sort.call(this, this.sortInfo, this.list));
    } else {
        if (typeof _dindex === "undefined") _dindex = "last";
        if (_dindex in processor) {
            _row[this.config.columnKeys.modified] = true;
            processor[_dindex].call(this, _row);
        } else {
            if (!_AX6Util2.default.isNumber(_dindex)) {
                throw 'invalid argument _dindex';
            }
            if (_AX6Util2.default.isArray(_row)) {
                for (var _i = 0, _l = _row.length; _i < _l; _i++) {
                    list.splice(_dindex + _i, 0, _row[_i]);
                }
            } else {
                list.splice(_dindex, 0, _row);
            }
        }

        if (this.config.body.grouping) {
            list = initData.call(this, sort.call(this, this.sortInfo, list));
        } else if (_options && _options.sort && Object.keys(this.sortInfo).length) {
            list = initData.call(this, sort.call(this, this.sortInfo, list));
        } else {
            list = initData.call(this, list);
        }

        this.list = list;
    }

    this.needToPaintSum = true;
    this.xvar.frozenRowIndex = this.config.frozenRowIndex > this.list.length ? this.list.length : this.config.frozenRowIndex;
    this.xvar.paintStartRowIndex = undefined; // 스크롤 포지션 저장변수 초기화
    this.xvar.virtualPaintStartRowIndex = undefined; // 스크롤 포지션 저장변수 초기화
    _AX6UIGrid_page2.default.navigationUpdate.call(this);
    return this;
};

/**
 * list에서 완전 제거 하는 경우 사용.
 * ax5grid.data.remove
 */
var remove = function remove(_dindex) {
    var list = this.config.body.grouping ? clearGroupingData.call(this, this.list) : this.list;
    var processor = {
        "first": function first() {
            if (this.config.tree.use) {
                processor.tree.call(this, 0);
            } else {
                list.splice(0, 1);
            }
        },
        "last": function last() {
            if (this.config.tree.use) {
                processor.tree.call(this, list.length - 1);
            } else {
                list.splice(list.length - 1, 1);
            }
        },
        "index": function index(_dindex) {
            if (this.config.tree.use) {
                processor.tree.call(this, _dindex);
            } else {
                list.splice(_dindex, 1);
            }
        },
        "selected": function selected() {
            if (this.config.tree.use) {
                processor.tree.call(this, "selected");
            } else {
                var __list = [],
                    i = void 0,
                    l = void 0;

                for (i = 0, l = list.length; i < l; i++) {
                    if (!list[i][this.config.columnKeys.selected]) {
                        __list.push(list[i]);
                    }
                }
                list = __list;
                __list = null;
                i = null;
            }
        },
        "tree": function tree(_dindex) {
            var treeKeys = this.config.tree.columnKeys,
                selfHash = list[_dindex][this.config.tree.columnKeys.selfHash];
            list = _AX6Util2.default.filter(list, function () {
                return this[treeKeys.selfHash].substr(0, selfHash.length) != selfHash;
            });
            treeKeys = null;
            selfHash = null;
        }
    };

    if (typeof _dindex === "undefined") _dindex = "last";
    if (_dindex in processor) {
        processor[_dindex].call(this, _dindex);
    } else {
        if (!_AX6Util2.default.isNumber(_dindex)) {
            throw 'invalid argument _dindex';
        }
        processor["index"].call(this, _dindex);
    }

    if (this.config.tree.use) {
        this.list = arrangeData4tree.call(this, list);
        this.proxyList = getProxyList.call(this, sort.call(this, this.sortInfo, this.list));
    } else {
        if (this.config.body.grouping) {
            list = initData.call(this, sort.call(this, this.sortInfo, list));
        } else if (Object.keys(this.sortInfo).length) {
            list = initData.call(this, sort.call(this, this.sortInfo, list));
        } else {
            list = initData.call(this, list);
        }
        this.list = list;
    }

    this.needToPaintSum = true;
    this.xvar.frozenRowIndex = this.config.frozenRowIndex > this.list.length ? this.list.length : this.config.frozenRowIndex;
    this.xvar.paintStartRowIndex = undefined; // 스크롤 포지션 저장변수 초기화
    this.xvar.virtualPaintStartRowIndex = undefined; // 스크롤 포지션 저장변수 초기화
    _AX6UIGrid_page2.default.navigationUpdate.call(this);
    return this;
};

/**
 * list에서 deleted 처리 repaint
 * ax5grid.data.deleteRow
 */
var deleteRow = function deleteRow(_dindex) {
    var list = this.config.body.grouping ? clearGroupingData.call(this, this.list) : this.list;
    var processor = {
        "first": function first() {
            if (this.config.tree.use) {
                processor.tree.call(this, 0);
            } else {
                list[0][this.config.columnKeys.deleted] = true;
            }
        },
        "last": function last() {
            if (this.config.tree.use) {
                processor.tree.call(this, list.length - 1);
            } else {
                list[list.length - 1][this.config.columnKeys.deleted] = true;
            }
        },
        "selected": function selected() {
            if (this.config.tree.use) {
                processor.tree.call(this, "selected");
            } else {
                var i = list.length;
                while (i--) {
                    if (list[i][this.config.columnKeys.selected]) {
                        list[i][this.config.columnKeys.deleted] = true;
                    }
                }
                i = null;
            }
        },
        "tree": function tree(_dindex) {
            var keys = this.config.columnKeys,
                treeKeys = this.config.tree.columnKeys;

            if (_dindex === "selected") {

                var i = list.length;
                while (i--) {
                    if (list[i][this.config.columnKeys.selected]) {
                        list[i][this.config.columnKeys.deleted] = true;

                        var selfHash = list[i][treeKeys.selfHash];
                        var ii = list.length;

                        while (ii--) {
                            if (list[ii][treeKeys.selfHash].substr(0, selfHash.length) === selfHash) {
                                list[ii][keys.deleted] = true;
                            }
                        }

                        selfHash = null;
                        ii = null;
                    }
                }
                i = null;
            } else {
                var _selfHash = list[_dindex][treeKeys.selfHash];
                var _i2 = list.length;
                while (_i2--) {
                    if (list[_i2][treeKeys.selfHash].substr(0, _selfHash.length) !== _selfHash) {
                        list[_i2][keys.deleted] = true;
                    }
                }
                _selfHash = null;
                _i2 = null;
            }

            keys = null;
            treeKeys = null;
        }
    };

    if (typeof _dindex === "undefined") _dindex = "last";

    if (_dindex in processor) {
        processor[_dindex].call(this, _dindex);
    } else {
        if (!_AX6Util2.default.isNumber(_dindex)) {
            throw 'invalid argument _dindex';
        }
        list[_dindex][this.config.columnKeys.deleted] = true;
    }

    if (this.config.tree.use) {
        this.list = arrangeData4tree.call(this, list);
        this.proxyList = getProxyList.call(this, sort.call(this, this.sortInfo, this.list));
    } else {
        if (this.config.body.grouping) {
            list = initData.call(this, sort.call(this, this.sortInfo, list));
        } else if (Object.keys(this.sortInfo).length) {
            list = initData.call(this, sort.call(this, this.sortInfo, list));
        } else {
            list = initData.call(this, list);
        }

        this.list = list;
    }

    this.needToPaintSum = true;
    this.xvar.frozenRowIndex = this.config.frozenRowIndex > this.list.length ? this.list.length : this.config.frozenRowIndex;
    this.xvar.paintStartRowIndex = undefined; // 스크롤 포지션 저장변수 초기화
    this.xvar.virtualPaintStartRowIndex = undefined; // 스크롤 포지션 저장변수 초기화
    _AX6UIGrid_page2.default.navigationUpdate.call(this);
    return this;
};

var update = function update(_row, _dindex) {
    if (!_AX6Util2.default.isNumber(_dindex)) {
        throw 'invalid argument _dindex';
    }
    //
    this.needToPaintSum = true;
    this.list.splice(_dindex, 1, _row);

    if (this.config.body.grouping) {
        this.list = initData.call(this, clearGroupingData.call(this, this.list));
    }
};

var updateChild = function updateChild(_dindex, _updateData, _options) {
    var keys = this.config.tree.columnKeys,
        selfHash = void 0,
        originIndex = void 0;

    if (typeof _dindex === "undefined") return false;
    originIndex = this.proxyList[_dindex].__origin_index__;

    if (this.list[originIndex][keys.children]) {
        this.proxyList = []; // 리셋 프록시

        if (_options && _options.filter) {
            if (_options.filter.call({ item: this.list[originIndex], dindex: originIndex }, this.list[originIndex])) {
                for (var _k in _updateData) {
                    this.list[originIndex][_k] = _updateData[_k];
                }
            }
        } else {
            for (var _k2 in _updateData) {
                this.list[originIndex][_k2] = _updateData[_k2];
            }
        }

        selfHash = this.list[originIndex][keys.selfHash];

        var i = 0,
            l = this.list.length;
        for (; i < l; i++) {
            if (this.list[i]) {
                if (this.list[i][keys.parentHash].substr(0, selfHash.length) === selfHash) {

                    if (_options && _options.filter) {
                        if (_options.filter.call({ item: this.list[i], dindex: i }, this.list[i])) {
                            for (var _k3 in _updateData) {
                                this.list[i][_k3] = _updateData[_k3];
                            }
                        }
                    } else {
                        for (var _k4 in _updateData) {
                            this.list[i][_k4] = _updateData[_k4];
                        }
                    }
                }

                if (!this.list[i][keys.hidden]) {
                    this.proxyList.push(this.list[i]);
                }
            }
        }

        return true;
    } else {
        return false;
    }
};

var setValue = function setValue(_dindex, _doindex, _key, _value) {
    var originalValue = getValue.call(this, _dindex, _doindex, _key);
    var list = this.list;
    var listIndex = typeof _doindex === "undefined" ? _dindex : _doindex;
    this.needToPaintSum = true;

    if (originalValue !== _value) {
        if (/[\.\[\]]/.test(_key)) {
            try {
                list[listIndex][this.config.columnKeys.modified] = true;
                Function("val", "this" + _AX6UIGrid_util2.default.getRealPathForDataItem(_key) + " = val;").call(list[listIndex], _value);
            } catch (e) {}
        } else {
            list[listIndex][this.config.columnKeys.modified] = true;
            list[listIndex][_key] = _value;
        }

        if (this.onDataChanged) {
            this.onDataChanged.call({
                self: this,
                list: this.list,
                dindex: _dindex,
                doindex: _doindex,
                item: this.list[_dindex],
                key: _key,
                value: _value
            });
        }
    }

    return true;
};

var getValue = function getValue(_dindex, _doindex, _key, _value) {
    var list = this.list;
    var listIndex = typeof _doindex === "undefined" ? _dindex : _doindex;

    if (/[\.\[\]]/.test(_key)) {
        try {
            _value = Function("", "return this" + _AX6UIGrid_util2.default.getRealPathForDataItem(_key) + ";").call(list[listIndex]);
        } catch (e) {}
    } else {
        _value = list[listIndex][_key];
    }
    return _value;
};

var clearSelect = function clearSelect() {
    this.selectedDataIndexs = [];
};

var select = function select(_dindex, _doindex, _selected, _options) {
    var cfg = this.config;

    if (typeof _doindex === "undefined") _doindex = _dindex;

    if (!this.list[_doindex]) return false;
    if (this.list[_doindex].__isGrouping) return false;
    if (this.list[_doindex][cfg.columnKeys.disableSelection]) return false;

    if (typeof _selected === "undefined") {
        if (this.list[_doindex][cfg.columnKeys.selected] = !this.list[_doindex][cfg.columnKeys.selected]) {
            this.selectedDataIndexs.push(_doindex);
        } else {
            this.selectedDataIndexs.splice(_AX6Util2.default.search(this.selectedDataIndexs, function () {
                return this == _doindex;
            }), 1);
        }
    } else {
        if (this.list[_doindex][cfg.columnKeys.selected] = _selected) {
            this.selectedDataIndexs.push(_doindex);
        } else {
            this.selectedDataIndexs.splice(_AX6Util2.default.search(this.selectedDataIndexs, function () {
                return this == _doindex;
            }), 1);
        }
    }

    if (this.onDataChanged && _options && _options.internalCall) {
        this.onDataChanged.call({
            self: this,
            list: this.list,
            dindex: _dindex,
            doindex: _doindex,
            item: this.list[_doindex],
            key: cfg.columnKeys.selected,
            value: this.list[_doindex][cfg.columnKeys.selected]
        });
    }

    return this.list[_doindex][cfg.columnKeys.selected];
};

var selectAll = function selectAll(_selected, _options) {
    var cfg = this.config,
        dindex = this.list.length;

    this.selectedDataIndexs = [];

    if (typeof _selected === "undefined") {
        while (dindex--) {
            if (this.list[dindex].__isGrouping) continue;
            if (_options && _options.filter) {
                if (_options.filter.call(this.list[dindex]) !== true) {
                    continue;
                }
            }
            if (this.list[dindex][cfg.columnKeys.disableSelection]) continue;

            if (this.list[dindex][cfg.columnKeys.selected] = !this.list[dindex][cfg.columnKeys.selected]) {
                this.selectedDataIndexs.push(dindex);
            }
        }
    } else {
        while (dindex--) {
            if (this.list[dindex].__isGrouping) continue;
            if (_options && _options.filter) {
                if (_options.filter.call(this.list[dindex]) !== true) {
                    continue;
                }
            }
            if (this.list[dindex][cfg.columnKeys.disableSelection]) continue;

            if (this.list[dindex][cfg.columnKeys.selected] = _selected) {
                this.selectedDataIndexs.push(dindex);
            }
        }
    }

    if (this.onDataChanged && _options && _options.internalCall) {
        this.onDataChanged.call({
            self: this,
            list: this.list
        });
    }

    return this.list;
};

var sort = function sort(_sortInfo, _list, _options) {
    var self = this,
        list = _list || this.list,
        sortInfoArray = [],
        lineNumber = 0;
    var getKeyValue = function getKeyValue(_item, _key, _value) {
        if (/[\.\[\]]/.test(_key)) {
            try {
                _value = Function("", "return this" + _AX6UIGrid_util2.default.getRealPathForDataItem(_key) + ";").call(_item);
            } catch (e) {}
        } else {
            _value = _item[_key];
        }
        return _value;
    };

    for (var k in _sortInfo) {
        sortInfoArray[_sortInfo[k].seq] = { key: k, order: _sortInfo[k].orderBy };
    }
    sortInfoArray = _AX6Util2.default.filter(sortInfoArray, function () {
        return typeof this !== "undefined";
    });

    // 정렬조건이 없으면 original_index값을 이용하여 정렬처리
    if (_options && _options.resetLineNumber && sortInfoArray.length === 0) {
        sortInfoArray[0] = { key: '__original_index', order: "asc" };
    }

    var i = 0,
        l = sortInfoArray.length,
        _a_val = void 0,
        _b_val = void 0;

    list.sort(function (_a, _b) {
        for (i = 0; i < l; i++) {
            _a_val = getKeyValue(_a, sortInfoArray[i].key);
            _b_val = getKeyValue(_b, sortInfoArray[i].key);

            if ((typeof _a_val === "undefined" ? "undefined" : _typeof(_a_val)) !== (typeof _b_val === "undefined" ? "undefined" : _typeof(_b_val))) {
                _a_val = '' + _a_val;
                _b_val = '' + _b_val;
            }
            if (_a_val < _b_val) {
                return sortInfoArray[i].order === "asc" ? -1 : 1;
            } else if (_a_val > _b_val) {
                return sortInfoArray[i].order === "asc" ? 1 : -1;
            }
        }
    });

    if (_options && _options.resetLineNumber) {
        i = 0, l = list.length, lineNumber = 0;
        for (; i < l; i++) {
            if (_list[i] && !_list[i]["__isGrouping"]) {
                _list[i]["__index"] = lineNumber++;
            }
        }
    }

    if (_list) {
        return list;
    } else {
        this.xvar.frozenRowIndex = this.config.frozenRowIndex > this.list.length ? this.list.length : this.config.frozenRowIndex;
        this.xvar.paintStartRowIndex = undefined; // 스크롤 포지션 저장변수 초기화
        this.xvar.virtualPaintStartRowIndex = undefined; // 스크롤 포지션 저장변수 초기화
        _AX6UIGrid_page2.default.navigationUpdate.call(this);
        return this;
    }
};

var append = function append(_list, _callback) {
    var self = this;

    if (this.config.tree.use) {
        var list = this.list.concat([].concat(_list));

        this.list = arrangeData4tree.call(this, list);
        this.proxyList = getProxyList.call(this, sort.call(this, this.sortInfo, this.list));
        list = null;
    } else {
        this.list = this.list.concat([].concat(_list));
    }

    this.appendProgress = true;
    _AX6UIGrid_page2.default.statusUpdate.call(this);

    if (this.appendDebouncer) {
        if (self.appendDebounceTimes < this.config.debounceTime / 10) {
            clearTimeout(this.appendDebouncer);
            self.appendDebounceTimes++;
        } else {
            self.appendDebounceTimes = 0;
            appendIdle.call(self);
            _callback();
            return false;
        }
    }

    this.appendDebouncer = setTimeout(function () {
        self.appendDebounceTimes = 0;
        appendIdle.call(self);
        _callback();
    }, this.config.debounceTime);

    // todo : append bounce animation
};

var appendIdle = function appendIdle() {
    this.appendProgress = false;
    if (this.config.body.grouping) {
        this.list = initData.call(this, sort.call(this, this.sortInfo, this.list));
    } else {
        this.list = initData.call(this, this.list);
    }

    this.needToPaintSum = true;
    this.xvar.frozenRowIndex = this.config.frozenRowIndex > this.list.length ? this.list.length : this.config.frozenRowIndex;
    this.xvar.paintStartRowIndex = undefined; // 스크롤 포지션 저장변수 초기화
    this.xvar.virtualPaintStartRowIndex = undefined; // 스크롤 포지션 저장변수 초기화
    _AX6UIGrid_page2.default.navigationUpdate.call(this);
};

var toggleCollapse = function toggleCollapse(_dindex, _doindx, _collapse) {
    var keys = this.config.tree.columnKeys,
        selfHash = void 0,
        originIndex = void 0;

    if (typeof _dindex === "undefined") return false;
    originIndex = this.proxyList[_dindex].__origin_index__;

    if (this.list[originIndex][keys.children]) {
        this.proxyList = []; // 리셋 프록시
        if (typeof _collapse == "undefined") {
            _collapse = !(this.list[originIndex][keys.collapse] || false);
        }

        this.list[originIndex][keys.collapse] = _collapse;
        selfHash = this.list[originIndex][keys.selfHash];

        var i = this.list.length;
        while (i--) {
            if (this.list[i]) {
                // console.log(this.list[i][keys.parentHash].substr(0, selfHash.length), selfHash);
                if (this.list[i][keys.parentHash].substr(0, selfHash.length) === selfHash) {
                    this.list[i][keys.hidden] = _collapse;
                }

                if (!this.list[i][keys.hidden]) {
                    this.proxyList.push(this.list[i]);
                }
            }
        }

        return true;
    } else {
        return false;
    }
};

exports.default = {
    init: init,
    set: set,
    get: get,
    getList: getList,
    getProxyList: getProxyList,
    setValue: setValue,
    getValue: getValue,
    clearSelect: clearSelect,
    select: select,
    selectAll: selectAll,
    add: add,
    remove: remove,
    deleteRow: deleteRow,
    update: update,
    updateChild: updateChild,
    sort: sort,
    initData: initData,
    clearGroupingData: clearGroupingData,
    append: append,
    toggleCollapse: toggleCollapse
};