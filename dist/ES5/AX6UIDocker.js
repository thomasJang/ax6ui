"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jqmin = require("jqmin");

var _jqmin2 = _interopRequireDefault(_jqmin);

var _AX6UICore2 = require("./AX6UICore.js");

var _AX6UICore3 = _interopRequireDefault(_AX6UICore2);

var _AX6Util = require("./AX6Util");

var _AX6Util2 = _interopRequireDefault(_AX6Util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** ~~~~~~~~~~~~~~~~~~ end of import  ~~~~~~~~~~~~~~~~~~~~ **/

var debouncer = {
  resizeDebouncedFn: null,
  panelDebouncedFn: null
};

var tmpl = {
  stack_panel: function stack_panel(columnKeys, data) {
    if (data.labelDirection === "bottom") {
      return "<div data-ax6ui-docker-pane=\"{{id}}\" data-ax6ui-docker-label-direction=\"{{labelDirection}}\" data-ax6ui-docker-path=\"{{panelPath}}\" style=\"flex-grow: {{#flexGrow}}{{.}}{{/flexGrow}}{{^flexGrow}}1{{/flexGrow}};\">\n    <div data-ax6ui-docker-pane-item-views=\"{{id}}\"></div>\n    <ul data-ax6ui-docker-pane-tabs=\"{{id}}\" data-ax6ui-docker-id=\"{{id}}\" data-ax6ui-docker-path=\"{{panelPath}}\"></ul>\n    <div data-ax6ui-docker-pane-tabs-more=\"{{id}}\">{{{icons.more}}}</div>\n</div>";
    } else {
      return "<div data-ax6ui-docker-pane=\"{{id}}\" data-ax6ui-docker-label-direction=\"{{labelDirection}}\" data-ax6ui-docker-path=\"{{panelPath}}\" style=\"flex-grow: {{#flexGrow}}{{.}}{{/flexGrow}}{{^flexGrow}}1{{/flexGrow}};\">\n    <ul data-ax6ui-docker-pane-tabs=\"{{id}}\" data-ax6ui-docker-id=\"{{id}}\" data-ax6ui-docker-path=\"{{panelPath}}\"></ul>\n    <div data-ax6ui-docker-pane-tabs-more=\"{{id}}\">{{{icons.more}}}</div>\n    <div data-ax6ui-docker-pane-item-views=\"{{id}}\"></div>\n</div>";
    }
  },
  panel_label: function panel_label() {
    return "<li data-ax6ui-docker-pane-tab=\"{{pIndex}}\" data-ax6ui-docker-id=\"{{id}}\" data-ax6ui-docker-path=\"{{panelPath}}\" class=\"{{#hasLabelColor}}hasLabelColor{{/hasLabelColor}}\">\n    <div class=\"label-icon\" style=\"{{#color}}background: {{color}};{{/color}}{{#borderColor}}border-color: {{borderColor}};{{/borderColor}}\"></div>\n    <div class=\"title\">{{{name}}}</div>\n    {{^disableClosePanel}}<div class=\"close-icon\">{{{icons.close}}}</div>{{/disableClosePanel}}\n</li><li class=\"pane-tab-margin\"></li>";
  }
};

/**
 * @private {Function}
 * @param event
 * @returns {AX6UIDocker}
 */
var fireEvent = function fireEvent(event) {
  var eventProcessor = {
    "resize": function resize(e) {
      if (this.onResize) {

        debouncer.resizeDebouncedFn(function () {
          var that = {
            self: this,
            resizer: e.target,
            resizedDom: [e.target.prev(), e.target.next()]
          };
          this.onResize.call(that, that);
        }.bind(this));
      }
    }
  };

  if (event.eventName in eventProcessor) {
    eventProcessor[event.eventName].call(this, event);
  }

  return this;
};

var getPanelId = function getPanelId() {
  return this.panelId++;
};

/**
 * defaultModule은 패널의 모듈이 정의되지 않은 경우를 위해 준비된 오브젝트
 */
var defaultModule = {
  init: function init(container, state) {
    container["$element"].html(state.name);
  },
  active: function active(container, state) {},
  deactive: function deactive(container, state) {},
  destroy: function destroy(container, state) {}
};

/**
 * 부모패널과 패널인덱스 값으로 패널 패스를 구합니다.
 * @private {Function}
 * @param parent
 * @param pIndex
 * @returns {string}
 */
var getPanelPath = function getPanelPath(parent, pIndex) {
  var paths = [];
  if (parent && typeof parent.panelPath !== "undefined") {
    paths.push(parent.panelPath);
  }

  paths.push('panels[' + (pIndex || 0) + ']');
  return paths.join(".");
};

/**
 * 패널패스를 이용하여 패널을 가져옵니다
 * @private {Function}
 * @param _panelPath
 * @returns {*}
 */
var getPanel = function getPanel(_panelPath) {
  var path = [],
      _path = _AX6Util2.default.isArray(_panelPath) ? [].concat(_panelPath) : [].concat(_panelPath.split(/[\.\[\]]/g));

  _path.forEach(function (n) {
    if (n !== "") path.push("[\"" + n.replace(/['\"]/g, "") + "\"]");
  });

  try {
    return Function("", "return this" + path.join('') + ";").call(this);
  } catch (e) {
    return;
  }
};

/**
 * 패널을 이용하여 패널의 부모 패널을 가져옵니다
 * @private {Function}
 * @param _panel
 */
var getPanelParent = function getPanelParent(_panel) {
  try {
    var _path = _panel.panelPath.substr(0, _panel.panelPath.lastIndexOf("."));
    return Function("", "return this." + _path + ";").call(this);
  } catch (e) {
    return;
  }
};

/**
 * 패널패스를 이용하여 패널오브젝트에 값을 부여합니다.
 * @private {Function}
 * @param _panelPath
 * @param _value
 * @returns {*}
 */
var setPanel = function setPanel(_panelPath, _value) {
  var path = [],
      _path = _AX6Util2.default.isArray(_panelPath) ? [].concat(_panelPath) : [].concat(_panelPath.split(/[\.\[\]]/g));

  _path.forEach(function (n) {
    if (n !== "") path.push("[\"" + n.replace(/['\"]/g, "") + "\"]");
  });

  return Function("val", "return this" + path.join('') + " = val;").call(this, _value);
};

/**
 * get mouse position
 * @private {Function}
 * @param e
 * @returns {{clientX, clientY}}
 */
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

/**
 * 패널의 모듈이 초기화, 활성화, 비활성, 제거 되는 일들을 제어하는 함수.
 * 모든 컨트롤은 실행되기전에 사용자가 정의한 control.before 함수의 결과에 따라 실행 여부를 결정합니다. 사용자가 control.before를 정의하지 않으면 무조건 실행합니다.
 * @private {Function}
 * @param {Object} _panel
 * @param {String} _control - "init","active","deactive","destroy"
 */
var controlPanel = function controlPanel(_panel, _control, _callback) {
  var _this = this;

  var moduleState = _jqmin2.default.extend(_panel.moduleState, {
    name: _panel.name
  }),
      moduleContainer = {
    '$element': _panel.$item
  },
      module = void 0;

  var processor = {
    init: function init() {
      _panel.builded = true;
      module = _panel.moduleName in _this.modules && 'init' in _this.modules[_panel.moduleName] ? _this.modules[_panel.moduleName] : defaultModule;
      module.init(moduleContainer, moduleState);
    },
    active: function active() {
      _panel.active = true;
      _panel.$label.addClass("active");
      _panel.$item.addClass("active");

      var $pane = _panel.$label.parent();
      if ($pane.get(0) && $pane.get(0).clientWidth !== $pane.get(0).scrollWidth) {
        $pane.animate({ scrollLeft: _panel.$label.position().left }, 300);
      }

      module = _panel.moduleName in _this.modules && 'active' in _this.modules[_panel.moduleName] ? _this.modules[_panel.moduleName] : defaultModule;
      module.active(moduleContainer, moduleState);
      $pane = null;
    },
    deactive: function deactive() {
      _panel.active = false;
      _panel.$label.removeClass("active");
      _panel.$item.removeClass("active");
      module = _panel.moduleName in _this.modules && 'deactive' in _this.modules[_panel.moduleName] ? _this.modules[_panel.moduleName] : defaultModule;
      module.deactive(moduleContainer, moduleState);
    },
    destroy: function destroy() {
      module = _panel.moduleName in _this.modules && 'destroy' in _this.modules[_panel.moduleName] ? _this.modules[_panel.moduleName] : defaultModule;
      module.destroy(moduleContainer, moduleState);

      // 패널 데이터 제거.
      setPanel(_panel.panelPath, null);
      // 현재 패널 정보를 검사하여 패널 정보를 재 구성합니다.
      arrangePanel();
    },
    remove: function remove() {
      module = _panel.moduleName in _this.modules && 'destroy' in _this.modules[_panel.moduleName] ? _this.modules[_panel.moduleName] : defaultModule;
      module.destroy(moduleContainer, moduleState);

      // 패널 데이터 제거.
      setPanel(_panel.panelPath, null);
      // 현재 패널 정보를 검사하여 패널 정보를 재 구성합니다.
      arrangePanel();
    }
  };

  // 사용자정의 함수 control.before, control.after에 전달할 인자 = that
  var that = {
    panel: _panel,
    controlType: _control
  };

  // 비동기 처리 상황에 대응하기 위해 runProcessor를 별도 처리
  var runProcessor = function runProcessor() {
    processor[_control]();
    module = null;

    if (_AX6Util2.default.isFunction(cfg.control.after)) {
      cfg.control.after.call(that, that);
    }
  };

  if (processor[_control]) {
    if (_AX6Util2.default.isFunction(cfg.control.before)) {
      cfg.control.before.call(that, that, function (result) {
        if (typeof result === "undefined") result = true;
        if (result) runProcessor();

        if (_AX6Util2.default.isFunction(_callback)) {
          _callback(result);
        }
      });
    } else {
      runProcessor();
    }
  }
};

/**
 * 패널들의 패널 데이터 구조에 맞게 다시 그리기
 */
var repaintPanels = function repaintPanels() {
  var appendProcessor = {
    stack: function stack($parent, parent, myself, pIndex) {

      var $dom = void 0,
          activeIndex = -1;
      myself.panelPath = getPanelPath(parent, pIndex);

      $dom = (0, _jqmin2.default)(DOCKER.tmpl.get.call(this, "stack-panel", {
        id: self.instanceId,
        name: myself.name,
        hasLabelColor: !_AX6Util2.default.isNothing(myself.color),
        color: myself.color,
        borderColor: myself.borderColor,
        panelPath: myself.panelPath,
        icons: cfg.icons,
        labelDirection: myself.labelDirection || cfg.labelDirection,
        disableClosePanel: cfg.disableClosePanel,
        disableDragPanel: cfg.disableDragPanel
      }, {}));
      $parent.append($dom);

      if (_AX6Util2.default.isArray(myself.panels)) {
        myself.panels.forEach(function (P, pIndex) {
          if (P.active) activeIndex = pIndex;
        });
        if (activeIndex === -1) activeIndex = 0;
        myself.panels[activeIndex].active = true;

        myself.panels.forEach(function (P, _pIndex) {
          P.panelIndex = _pIndex;
          appendProcessor[P.type]($dom, myself, P, _pIndex);
        });
      }

      $dom = null;
      activeIndex = null;
    },
    panel: function panel($parent, parent, myself, pIndex) {
      var $dom = void 0;
      myself.panelPath = getPanelPath(parent, pIndex);
      myself.$label = (0, _jqmin2.default)(DOCKER.tmpl.get.call(this, "panel-label", {
        id: self.instanceId,
        pIndex: pIndex,
        name: myself.name,
        hasLabelColor: !_AX6Util2.default.isNothing(myself.color),
        color: myself.color,
        borderColor: myself.borderColor,
        panelPath: myself.panelPath,
        icons: cfg.icons,
        disableClosePanel: cfg.disableClosePanel,
        disableDragPanel: cfg.disableDragPanel
      }, {}));

      if (!myself.$item) {
        myself.$item = (0, _jqmin2.default)('<div data-ax6ui-docker-pane-item="' + pIndex + '" data-ax6ui-docker-id="' + self.instanceId + '" data-ax6ui-docker-pane-id="' + getPanelId() + '" data-ax6ui-docker-path="' + myself.panelPath + '"></div>');
      } else {
        myself.$item.attr("data-ax6ui-docker-path", myself.panelPath);
        myself.$item.attr("data-ax6ui-docker-pane-item", pIndex);
      }

      if (parent && parent.type == "stack") {
        if (myself.active) {
          if (!myself.builded) controlPanel(myself, "init");
          controlPanel(myself, "active");
        }
        $parent.find('[data-ax6ui-docker-pane-tabs="' + self.instanceId + '"]').append(myself.$label);
        $parent.find('[data-ax6ui-docker-pane-item-views="' + self.instanceId + '"]').append(myself.$item);
      } else {
        $dom = (0, _jqmin2.default)(DOCKER.tmpl.get.call(this, "stack-panel", {
          id: self.instanceId,
          name: myself.name,
          hasLabelColor: !_AX6Util2.default.isNothing(myself.color),
          color: myself.color,
          borderColor: myself.borderColor,
          panelPath: myself.panelPath,
          flexGrow: myself.flexGrow,
          icons: cfg.icons,
          labelDirection: myself.labelDirection || cfg.labelDirection,
          disableClosePanel: cfg.disableClosePanel,
          disableDragPanel: cfg.disableDragPanel
        }, {}));

        if (!myself.builded) controlPanel(myself, "init");
        controlPanel(myself, "active");

        $dom.find('[data-ax6ui-docker-pane-tabs="' + self.instanceId + '"]').append(myself.$label);
        $dom.find('[data-ax6ui-docker-pane-item-views="' + self.instanceId + '"]').append(myself.$item);

        $parent.append($dom);
      }

      $dom = null;
    },
    resizeHandle: function resizeHandle($parent, parent, myself, pIndex) {
      var $dom = (0, _jqmin2.default)('<div data-ax6ui-docker-id="' + self.instanceId + '" data-ax6ui-docker-resize-handle="' + parent.type + "/" + parent.panelPath + "/" + pIndex + '"></div>');
      $parent.append($dom);
      $dom = null;
    },
    row: function row($parent, parent, myself, pIndex) {
      var $dom = void 0;
      myself.panelPath = getPanelPath(parent, pIndex);
      if (parent && parent.type == "stack") {
        throw "The 'stack' type child nodes are allowed only for the 'panel' type.";
      }
      $dom = (0, _jqmin2.default)('<div data-ax6ui-docker-pane-axis="row" data-ax6ui-docker-id="' + self.instanceId + '" data-ax6ui-docker-path="' + myself.panelPath + '" style="flex-grow: ' + (myself.flexGrow || 1) + ';"></div>');
      $parent.append($dom);

      if (_AX6Util2.default.isArray(myself.panels)) {
        myself.panels.forEach(function (P, _pIndex) {
          if (_pIndex > 0) appendProcessor["resizeHandle"]($dom, myself, P, _pIndex);
          P.panelIndex = _pIndex;
          appendProcessor[P.type]($dom, myself, P, _pIndex);
        });
      }

      $dom = null;
    },
    column: function column($parent, parent, myself, pIndex) {
      var $dom = void 0;
      myself.panelPath = getPanelPath(parent, pIndex);
      if (parent && parent.type == "stack") {
        throw "The 'stack' type child nodes are allowed only for the 'panel' type.";
      }
      $dom = (0, _jqmin2.default)('<div data-ax6ui-docker-pane-axis="column" data-ax6ui-docker-id="' + self.instanceId + '" data-ax6ui-docker-path="' + myself.panelPath + '" style="flex-grow: ' + (myself.flexGrow || 1) + ';"></div>');
      $parent.append($dom);

      if (_AX6Util2.default.isArray(myself.panels)) {
        myself.panels.forEach(function (P, _pIndex) {
          if (_pIndex > 0) appendProcessor["resizeHandle"]($dom, myself, P, _pIndex);
          P.panelIndex = _pIndex;
          appendProcessor[P.type]($dom, myself, P, _pIndex);
        });
      }

      $dom = null;
    }
  };

  var $root = (0, _jqmin2.default)('<div data-ax6ui-docker-panes="' + this.instanceId + '"></div>');
  if (this.panels[0]) appendProcessor[this.panels[0].type]($root, null, this.panels[0], 0);
  this.$target.html($root);

  this.$target.off("click.ax5docker-pane").on("click.ax5docker-pane", '[data-ax6ui-docker-id="' + self.instanceId + '"][data-ax6ui-docker-pane-tab] .close-icon', function (e) {
    self.removePanel($(this).parents('[data-ax6ui-docker-pane-tab]').attr("data-ax6ui-docker-path"));
    _AX6Util2.default.stopEvent(e);
  }).on("click.ax5docker-pane", '[data-ax6ui-docker-id="' + self.instanceId + '"][data-ax6ui-docker-pane-tab]', function (e) {
    // pane, panelIndex 인자 변경.
    var $clickedLabel = (0, _jqmin2.default)(this);
    var pane = getPanel($clickedLabel.parents('[data-ax6ui-docker-pane]').attr("data-ax6ui-docker-path"));
    var panelIndex = $clickedLabel.attr("data-ax6ui-docker-pane-tab");

    if (!$clickedLabel.hasClass("active")) {
      changeActiveStackPanel(pane, panelIndex);
    }

    $clickedLabel = null;
    pane = null;
    panelIndex = null;
    _AX6Util2.default.stopEvent(e);
  }).on("click.ax5docker-pane", '[data-ax6ui-docker-pane-tabs-more="' + this.instanceId + '"]', function (e) {
    openStackPanelMore($(this).parents('[data-ax6ui-docker-pane]'), e);
    _AX6Util2.default.stopEvent(e);
  });

  this.$target.off("mousedown.ax5docker-pane-resize").off("dragstart.ax5docker-pane-resize").on("dragstart.ax5docker-pane-resize", '[data-ax6ui-docker-id="' + self.instanceId + '"][data-ax6ui-docker-pane-tab]', function (e) {
    if (!cfg.disableDragPanel) {
      panelTabDragEvent.on(this);
    }
  }).on("mousedown.ax5docker-pane-resize", '[data-ax6ui-docker-id="' + self.instanceId + '"][data-ax6ui-docker-resize-handle]', function (e) {
    var datas = this.getAttribute("data-ax6ui-docker-resize-handle").split(/\//g);

    // panelResizerEvent.init
    self.xvar.mousePosition = getMousePosition(e);
    self.xvar.resizerType = datas[0];
    self.xvar.resizerPath = datas[1];
    self.xvar.resizerIndex = datas[2];
    // 주변 패널들
    self.xvar.resizer$dom = $(this);
    self.xvar.resizerParent$dom = self.xvar.resizer$dom.parent();
    self.xvar.resizerPrevGrow = _AX6Util2.default.number(self.xvar.resizer$dom.prev().css("flex-grow"));
    self.xvar.resizerNextGrow = _AX6Util2.default.number(self.xvar.resizer$dom.next().css("flex-grow"));

    if (self.xvar.resizerType == "row") {
      //self.xvar.resizerCanvasWidth = self.xvar.resizerParent$dom.innerWidth();
      self.xvar.resizerCanvasWidth = self.xvar.resizer$dom.prev().innerWidth() + self.xvar.resizer$dom.next().innerWidth() + self.xvar.resizer$dom.width();
    } else {
      //self.xvar.resizerCanvasHeight = self.xvar.resizerParent$dom.innerHeight();
      self.xvar.resizerCanvasHeight = self.xvar.resizer$dom.prev().innerHeight() + self.xvar.resizer$dom.next().innerHeight() + self.xvar.resizer$dom.height();
    }

    panelResizerEvent.on(this);
    _AX6Util2.default.stopEvent(e);
  }).on("dragstart.ax5docker-pane-resize", '[data-ax6ui-docker-id="' + self.instanceId + '"][data-ax6ui-docker-resize-handle]', function (e) {
    _AX6Util2.default.stopEvent(e);
    return false;
  });

  // stackPane tabs 스크롤처리
  alignStackPane();
  $root = null;
};

/**
 * repaintPanels이 작동할 때. 패널탭에 dragStart 이벤트를 연결합니다.
 * 발생된 이벤트가 panelTabDragEvent.on를 작동.
 */
var panelTabDragEvent = {
  "on": function on(dragPanel) {
    if (undefined.panels[0] && undefined.panels[0].panels && undefined.panels[0].panels.length) {

      undefined.xvar.dragger = {
        dragPanel: dragPanel,
        target: null,
        dragOverVertical: null,
        dragOverHorizontal: null
      };

      undefined.$target.on("dragover.ax5docker-" + undefined.instanceId, '[data-ax6ui-docker-id="' + undefined.instanceId + '"][data-ax6ui-docker-path]', function (e) {
        // todo : dragover 구현
        // console.log("dargover", getMousePosition(e));
        // console.log(e.target);
        panelTabDragEvent.dragover(this, e);
        _AX6Util2.default.stopEvent(e);
      }).on("drop.ax5docker-" + undefined.instanceId, function (e) {
        panelTabDragEvent.off("drop");
        _AX6Util2.default.stopEvent(e);
      }).on("dragend.ax5docker-" + undefined.instanceId, function (e) {
        panelTabDragEvent.off();
        _AX6Util2.default.stopEvent(e);
      });
    }
  },
  "dragover": function dragover(dragoverDom, e) {

    var $dragoverDom = (0, _jqmin2.default)(dragoverDom),
        box = {},
        mouse = getMousePosition(e),
        dragOverVertical = void 0,
        dragOverHorizontal = void 0;

    if (undefined.xvar.dragger.target == null || undefined.xvar.dragger.target.get(0) != $dragoverDom.get(0)) {
      if (undefined.xvar.dragger.target) undefined.xvar.dragger.target.removeAttr("data-dropper");

      undefined.xvar.dragger.target = $dragoverDom;
      undefined.xvar.dragger.dragOverVertical = null;
      undefined.xvar.dragger.dragOverHorizontal = null;
    }

    box = $dragoverDom.offset();
    box.width = $dragoverDom.width();
    box.height = $dragoverDom.height();

    if ($dragoverDom.attr("data-ax6ui-docker-pane-tab")) {
      var halfWidth = box.width / 2;
      if (box.left <= mouse.clientX && box.left + halfWidth >= mouse.clientX) {
        dragOverHorizontal = "left";
      } else if (box.left + halfWidth <= mouse.clientX && box.left + halfWidth * 2 >= mouse.clientX) {
        dragOverHorizontal = "right";
      }
      if (undefined.xvar.dragger.dragOverHorizontal != dragOverHorizontal && typeof dragOverHorizontal != "undefined") {
        undefined.xvar.dragger.dragOverHorizontal = dragOverHorizontal;
        var _draggerProcessor = {
          "left": function left($target) {
            $target.attr("data-dropper", "left");
          },
          "right": function right($target) {
            $target.attr("data-dropper", "right");
          }
        };
        if (undefined.xvar.dragger.dragOverHorizontal in _draggerProcessor) {
          _draggerProcessor[undefined.xvar.dragger.dragOverHorizontal](undefined.xvar.dragger.target);
        }
      }
      halfWidth = null;
    } else if ($dragoverDom.attr("data-ax6ui-docker-pane-tabs")) {
      //this.xvar.dragger.dragOverVertical = "center";
      undefined.xvar.dragger.dragOverHorizontal = "last-child";
      undefined.xvar.dragger.target.attr("data-dropper", "true");
    } else if ($dragoverDom.attr("data-ax6ui-docker-pane-item")) {
      // panel dragover 포지션 구하기
      var threeQuarterHeight = box.height / 3;
      var threeQuarterWidth = box.width / 3;

      if (box.top <= mouse.clientY && box.top + threeQuarterHeight >= mouse.clientY) {
        dragOverVertical = "top";
      } else if (box.top + threeQuarterHeight <= mouse.clientY && box.top + threeQuarterHeight * 2 >= mouse.clientY) {
        dragOverVertical = "middle";
      } else if (box.top + threeQuarterHeight * 2 <= mouse.clientY && box.top + threeQuarterHeight * 3 >= mouse.clientY) {
        dragOverVertical = "bottom";
      }

      if (box.left <= mouse.clientX && box.left + threeQuarterWidth >= mouse.clientX) {
        dragOverHorizontal = "left";
      } else if (box.left + threeQuarterWidth <= mouse.clientX && box.left + threeQuarterWidth * 2 >= mouse.clientX) {
        dragOverHorizontal = "center";
      } else if (box.left + threeQuarterWidth * 2 <= mouse.clientX && box.left + threeQuarterWidth * 3 >= mouse.clientX) {
        dragOverHorizontal = "right";
      }

      if (undefined.xvar.dragger.dragOverVertical != dragOverVertical || undefined.xvar.dragger.dragOverHorizontal != dragOverHorizontal) {
        undefined.xvar.dragger.dragOverVertical = dragOverVertical;
        undefined.xvar.dragger.dragOverHorizontal = dragOverHorizontal;

        var draggerProcessor = {
          "left-top": function leftTop($target) {
            $target.attr("data-dropper", "left");
          },
          "right-top": function rightTop($target) {
            $target.attr("data-dropper", "right");
          },
          "center-top": function centerTop($target) {
            $target.attr("data-dropper", "top");
          },
          "left-middle": function leftMiddle($target) {
            $target.attr("data-dropper", "left");
          },
          "right-middle": function rightMiddle($target) {
            $target.attr("data-dropper", "right");
          },
          "center-middle": function centerMiddle($target) {
            $target.attr("data-dropper", "center");
          },
          "left-bottom": function leftBottom($target) {
            $target.attr("data-dropper", "left");
          },
          "right-bottom": function rightBottom($target) {
            $target.attr("data-dropper", "right");
          },
          "center-bottom": function centerBottom($target) {
            $target.attr("data-dropper", "bottom");
          }
        };
        if (undefined.xvar.dragger.dragOverHorizontal + "-" + undefined.xvar.dragger.dragOverVertical in draggerProcessor) {
          draggerProcessor[undefined.xvar.dragger.dragOverHorizontal + "-" + undefined.xvar.dragger.dragOverVertical](undefined.xvar.dragger.target);
        }
      }

      threeQuarterHeight = null;
      threeQuarterWidth = null;
    }
  },
  "off": function off(isDrop) {
    if (isDrop) {
      var dragPanel = getPanel(undefined.xvar.dragger.dragPanel.getAttribute("data-ax6ui-docker-path")),
          appendType = [];

      if (undefined.xvar.dragger.dragOverHorizontal) appendType.push(undefined.xvar.dragger.dragOverHorizontal);
      if (undefined.xvar.dragger.dragOverVertical) appendType.push(undefined.xvar.dragger.dragOverVertical);

      undefined.appendPanel(dragPanel, undefined.xvar.dragger.target.attr("data-ax6ui-docker-path"), appendType);

      dragPanel = null;
      appendType = null;
    }

    alignStackPane();

    undefined.$target.off("dragover.ax5docker-" + undefined.instanceId).off("drop.ax5docker-" + undefined.instanceId).off("dragend.ax5docker-" + undefined.instanceId);

    undefined.xvar.dragger.target.removeAttr("data-dropper");
  }
};

/**
 * repaintPanels이 작동할 때. 리사이저에 mousedown 이벤트를 연결합니다.
 * 발생된 이벤트가 panelResizerEvent.on 을 작동시켜 리사이저를 움직이게 합니다
 */
var panelResizerEvent = {
  "on": function on(_resizer) {

    (0, _jqmin2.default)(document.body).on("mousemove.ax5docker-" + undefined.instanceId, function (e) {
      var mouseObj = getMousePosition(e),
          da_grow = void 0;

      if (self.xvar.resizerLived) {
        if (self.xvar.resizerType == "row") {
          self.xvar.__da = mouseObj.clientX - self.xvar.mousePosition.clientX;
          da_grow = _AX6Util2.default.number(self.xvar.__da * 2 / self.xvar.resizerCanvasWidth, { round: 6 });

          self.xvar.resizer$dom.prev().css({ "flex-grow": self.xvar.resizerPrevGrow + da_grow });
          self.xvar.resizer$dom.next().css({ "flex-grow": self.xvar.resizerNextGrow - da_grow });
        } else {
          self.xvar.__da = mouseObj.clientY - self.xvar.mousePosition.clientY;
          da_grow = _AX6Util2.default.number(self.xvar.__da * 2 / self.xvar.resizerCanvasHeight, { round: 6 });

          self.xvar.resizer$dom.prev().css({ "flex-grow": self.xvar.resizerPrevGrow + da_grow });
          self.xvar.resizer$dom.next().css({ "flex-grow": self.xvar.resizerNextGrow - da_grow });
        }

        fireEvent({
          eventName: "resize",
          target: self.xvar.resizer$dom
        });
      } else {
        self.xvar.resizerLived = true;
      }

      mouseObj = null;
      da_grow = null;
    }).on("mouseup.ax5docker-" + undefined.instanceId, function (e) {
      panelResizerEvent.off();
      _AX6Util2.default.stopEvent(e);
    }).on("mouseleave.ax5docker-" + undefined.instanceId, function (e) {
      panelResizerEvent.off();
      _AX6Util2.default.stopEvent(e);
    });

    (0, _jqmin2.default)(document.body).attr('unselectable', 'on').css('user-select', 'none').on('selectstart', false);
  },
  "off": function off() {
    self.xvar.resizerLived = false;

    if (typeof undefined.xvar.__da === "undefined") {} else {
      var $prevPanel = self.xvar.resizer$dom.prev(),
          $nextPanel = self.xvar.resizer$dom.next(),
          prevPane = getPanel($prevPanel.attr("data-ax6ui-docker-path")),
          nextPane = getPanel($nextPanel.attr("data-ax6ui-docker-path"));

      prevPane.flexGrow = _AX6Util2.default.number($prevPanel.css("flex-grow"));
      nextPane.flexGrow = _AX6Util2.default.number($nextPanel.css("flex-grow"));

      $prevPanel = null;
      $nextPanel = null;
      prevPane = null;
      nextPane = null;
    }

    alignStackPane();

    (0, _jqmin2.default)(document.body).off("mousemove.ax5docker-" + undefined.instanceId).off("mouseup.ax5docker-" + undefined.instanceId).off("mouseleave.ax5docker-" + undefined.instanceId);

    (0, _jqmin2.default)(document.body).removeAttr('unselectable').css('user-select', 'auto').off('selectstart');
  }
};

/**
 * 액티브 패널 변경(stack인 상황에서)
 * @private {Function}
 * @param pane
 * @param panelIndex
 * @returns {boolean}
 */
var changeActiveStackPanel = function changeActiveStackPanel(pane, panelIndex) {
  var panel = pane.panels[panelIndex];

  for (var p = 0, pl = pane.panels.length; p < pl; p++) {
    if (pane.panels[p].active) {
      controlPanel(pane.panels[p], "deactive");
    }
  }

  if (!panel.builded) controlPanel(panel, "init");
  controlPanel(panel, "active");

  pane = null;
  panelIndex = null;
  panel = null;
  return this;
};

/**
 * stackTab의 더보기 아이콘이 클릭되면~~~
 * @private {Function}
 * @param stackPane
 * @param e
 * @returns {AX6UIDocker}
 */
var openStackPanelMore = function openStackPanelMore(stackPane, e) {
  var $stackPane = (0, _jqmin2.default)(stackPane),
      panePath = $stackPane.attr("data-ax6ui-docker-path"),
      pane = getPanel(panePath);

  if (this.menu) {
    var menuItems = _AX6Util2.default.map(pane.panels, function (index) {
      return {
        label: this.name,
        index: index,
        panePath: panePath
      };
    });

    this.menu.setConfig({
      items: menuItems,
      onClick: function onClick() {
        //console.log(pane);
        changeActiveStackPanel(getPanel(this.panePath), this.index);
      }
    });

    this.menu.popup(e);
  } else {
    console.log(pane.panels);
    throw "'ax5ui-menu' is required to implement the function.";
  }

  $stackPane = null;
  panePath = null;
  pane = null;
  return this;
};

/**
 * stackPane이 리사이즈 되면 탭을 스크롤여부를 판단해야 합니다.
 */
var alignStackPane = function alignStackPane() {
  debouncer.panelDebouncedFn(function () {
    this.$target.find('[data-ax6ui-docker-pane-tabs="' + this.instanceId + '"]').each(function () {
      var $this = (0, _jqmin2.default)(this).parent();
      if (this.scrollWidth > this.clientWidth) {
        $this.addClass("tabs-scrolled");
      } else {
        $this.removeClass("tabs-scrolled");
      }
      $this = null;
    });
  }.bind(this));
};

var panelsDeactive = function panelsDeactive(panels) {
  if (_AX6Util2.default.isArray(panels)) {
    panels.forEach(function (p) {
      //p.active = false;
      //p.$item.removeClass("active");
      controlPanel(p, "deactive");
    });
  } else {
    //panels.active = false;
    //panels.$item.removeClass("active");
    controlPanel(panels, "deactive");
  }
};

/**
 * 패널중에 null이 된 요소를 찾아 panels를 정리 합니다.
 * @returns {*}
 */
var arrangePanel = function arrangePanel() {
  var processor = {
    stack: function stack(myself) {
      if (!_AX6Util2.default.isArray(myself.panels)) return false;

      var newObj = {
        type: "stack",
        panels: []
      };

      myself.panels.forEach(function (P, _pIndex) {
        if (P) {
          var _p = processor[P.type](P);
          if (_p) newObj.panels.push(_p);
          _p = null;
        }
      });

      if (newObj.panels.length == 0) {
        return null;
      } else if (newObj.panels.length < 2) {
        newObj = newObj.panels[0];
      }

      return newObj;
    },
    panel: function panel(myself) {
      //console.log(myself);
      return myself;
    },
    row: function row(myself) {

      if (!_AX6Util2.default.isArray(myself.panels)) return false;

      var newObj = {
        type: "row",
        panels: []
      };

      myself.panels.forEach(function (P, _pIndex) {
        if (P) {
          var _p = processor[P.type](P);
          if (_p) newObj.panels.push(_p);
          _p = null;
        }
      });

      if (newObj.panels.length == 0) {
        return null;
      } else if (newObj.panels.length < 2) {
        newObj = newObj.panels[0];
      }

      return newObj;
    },
    column: function column(myself) {
      if (!_AX6Util2.default.isArray(myself.panels)) return false;

      var newObj = {
        type: "column",
        panels: []
      };

      myself.panels.forEach(function (P, _pIndex) {
        if (P) {
          var _p = processor[P.type](P);
          if (_p) newObj.panels.push(_p);
          _p = null;
        }
      });

      if (newObj.panels.length == 0) {
        return null;
      } else if (newObj.panels.length < 2) {
        newObj = newObj.panels[0];
      }

      return newObj;
    }
  };

  if (this.panels[0]) {
    this.panels[0] = processor[this.panels[0].type](this.panels[0]);
    if (this.panels[0] && this.panels[0].type === "panel") {
      this.panels[0] = {
        type: "stack",
        panels: [this.panels[0]]
      };
    }
  } else {
    this.panels = [];
  }

  repaintPanels();
};

/** ~~~~~~~~~~~~~~~~~~ end of private  ~~~~~~~~~~~~~~~~~~~~ **/

/**
 * @class
 */

var AX6UIDocker = function (_AX6UICore) {
  _inherits(AX6UIDocker, _AX6UICore);

  /**
   * @constructor
   * @param config
   */
  function AX6UIDocker(config) {
    _classCallCheck(this, AX6UIDocker);

    /**
     * @member {JSON}
     * @param config
     * @param [config.theme]
     * @param [config.animateTime=250]
     * @param [config.columnKeys]
     * @param [config.control]
     * @param [config.icons]
     * @param [config.icons.close='X']
     * @param [config.icons.more='...']
     * @param [config.labelDirection='top']
     * @param [config.disableClosePanel=false]
     * @param [config.disableDragPanel=false]
     * @param [config.resizeDebounceTime=100]
     * @param [config.panelDebounceTime=300]
     *
     */
    var _this2 = _possibleConstructorReturn(this, (AX6UIDocker.__proto__ || Object.getPrototypeOf(AX6UIDocker)).call(this));

    _this2.config = {
      theme: 'default',
      animateTime: 250,
      columnKeys: {},
      control: {},
      icons: {
        close: 'X',
        more: '...'
      },
      labelDirection: 'top',
      disableClosePanel: false,
      disableDragPanel: false,
      resizeDebounceTime: 100,
      panelDebounceTime: 300
    };
    _jqmin2.default.extend(true, _this2.config, config);

    // 멤버 변수 초기화
    /**
     * @member {Object}
     */
    _this2.xvar = {};
    /**
     * @member {Object}
     */
    _this2.menu = null;

    _this2.onResize = null;
    // 패널 정보
    /**
     * @member {Array}
     */
    _this2.panels = [];
    /**
     * @member {Number}
     */
    _this2.panelId = 0;

    // 패널의 컨텐츠 모듈
    /**
     * @member {Object}
     */
    _this2.modules = {};

    if (typeof config !== "undefined") _this2.init();
    return _this2;
  }

  /**
   * @method
   */


  _createClass(AX6UIDocker, [{
    key: "init",
    value: function init() {
      this.onStateChanged = this.config.onStateChanged;
      this.onResize = this.config.onResize;
      this.onClick = this.config.onClick;
      this.onLoad = this.config.onLoad;
      this.onDataChanged = this.config.onDataChanged;

      // memory target
      this.$target = (0, _jqmin2.default)(this.config.target);
      // set panels
      this.panels = this.config.panels || [];

      debouncer.resizeDebouncedFn = _AX6Util2.default.throttle(function (fn) {
        fn();
      }, this.config.resizeDebounceTime);

      debouncer.panelDebouncedFn = _AX6Util2.default.debounce(function (fn) {
        fn();
      }, this.config.panelDebounceTime);

      // init 호출 여부
      this.initOnce();
    }

    /**
     * @method
     */

  }, {
    key: "initOnce",
    value: function initOnce() {
      if (this.initialized) return this;
      this.initialized = true;

      (0, _jqmin2.default)(window).off("resize.ax6ui-docker-" + this.instanceId).on("resize.ax6ui-docker-" + this.instanceId, _AX6Util2.default.throttle(function (e) {}, 30).bind(this));
    }

    /**
     * @method
     * @returns {AX6UIDocker}
     */

  }, {
    key: "setPanels",
    value: function setPanels(_panels) {
      // set panels
      this.panels = _panels || [];

      // 패널 다시 그리기
      repaintPanels.call(this);
      return this;
    }
  }, {
    key: "addModule",


    /**
     * @method
     * @param modules
     * @returns {AX6UIDocker}
     */
    value: function addModule(modules) {
      if (_AX6Util2.default.isObject(modules)) {
        _jqmin2.default.extend(true, this.modules, modules);
      }
      return this;
    }
  }, {
    key: "repaint",


    /**
     * repaint panels of docker
     * @method
     * @returns {AX6UIDocker}
     */
    value: function repaint() {
      // 패널 다시 그리기
      repaintPanels.call(this);
      return this;
    }
  }, {
    key: "addPanel",


    /**
     * @method
     * @param {String} _addPath - Position path to add panel
     * @param _addType
     * @param _panel
     * @param _panelIndex
     * @returns {AX6UIDocker}
     * @example
     * ```js
     * myDocker.addPanel('0.1', 'stack', {type:'panel', name:'addPanel', moduleName: 'content'});
     *
     * ```
     */
    value: function addPanel(_addPath, _addType, _panel, _panelIndex) {
      var addPath = "",
          pane = void 0,
          parent = void 0;
      var panelProcessor = {
        "stack": function stack(_pane, _addType, _panel, _panelIndex) {
          var copyPanel = _jqmin2.default.extend({}, _pane),
              addProcessor = {
            "stack": function stack(_pane, _panel) {
              if (_panel.active) {
                panelsDeactive(_pane.panels);
              }
              _pane.panels.push(_panel);
              arrangePanel();
            },
            "stack-left": function stackLeft(_pane, _panel) {
              if (_panel.active) {
                panelsDeactive(_pane.panels);
              }
              _pane.panels.splice(_panelIndex, 0, _panel);
              arrangePanel();
            },
            "stack-right": function stackRight(_pane, _panel) {
              if (_panel.active) {
                panelsDeactive(_pane.panels);
              }
              _pane.panels.splice(Number(_panelIndex) + 1, 0, _panel);
              arrangePanel();
            },
            "row-left": function rowLeft(_pane, _panel) {
              var parentPath = addPath.substr(0, addPath.lastIndexOf("."));
              var parentPane = getPanel(parentPath);
              if (parentPane && parentPane.type == "row") {
                this.addPanel(parentPane.panelPath, _addType, _panel, _pane.panelIndex);
              } else {
                _pane = setPanel(addPath, {
                  type: "row",
                  panels: []
                });
                _pane.panels.push(_panel);
                _pane.panels.push(copyPanel);
                arrangePanel();
              }
            },
            "row-right": function rowRight(_pane, _panel) {
              var parentPath = addPath.substr(0, addPath.lastIndexOf("."));
              var parentPane = getPanel(parentPath);
              if (parentPane && parentPane.type == "row") {
                this.addPanel(parentPane.panelPath, _addType, _panel, _pane.panelIndex);
              } else {
                _pane = setPanel(addPath, {
                  type: "row",
                  panels: []
                });
                _pane.panels.push(copyPanel);
                _pane.panels.push(_panel);
                arrangePanel();
              }
            },
            "column-top": function columnTop(_pane, _panel) {
              var parentPath = addPath.substr(0, addPath.lastIndexOf("."));
              var parentPane = getPanel(parentPath);
              if (parentPane && parentPane.type == "column") {
                this.addPanel(parentPane.panelPath, _addType, _panel, _pane.panelIndex);
              } else {
                _pane = setPanel(addPath, {
                  type: "column",
                  panels: []
                });
                _pane.panels.push(_panel);
                _pane.panels.push(copyPanel);
                arrangePanel();
              }
            },
            "column-bottom": function columnBottom(_pane, _panel) {
              var parentPath = addPath.substr(0, addPath.lastIndexOf("."));
              var parentPane = getPanel(parentPath);
              if (parentPane && parentPane.type == "column") {
                this.addPanel(parentPane.panelPath, _addType, _panel, _pane.panelIndex);
              } else {
                _pane = setPanel(addPath, {
                  type: "column",
                  panels: []
                });
                _pane.panels.push(copyPanel);
                _pane.panels.push(_panel);
                arrangePanel();
              }
            }
          };
          if (_addType in addProcessor) {
            addProcessor[_addType].call(this, _pane, _panel);
          }

          copyPanel = null;
          addProcessor = null;
        },
        "row": function row(_pane, _addType, _panel, _panelIndex) {
          var copyPanel = _jqmin2.default.extend({}, _pane),
              addProcessor = {
            "stack": function stack(_pane, _panel) {
              // 처리 할 수 없는 상황 첫번째 자식을 찾아 재 요청
              if (_pane.panels[0] && _pane.panels[0].panelPath) {
                this.addPanel(_pane.panels[0].panelPath, _addType, _panel);
              }
            },
            "row-left": function rowLeft(_pane, _panel, _panelIndex) {
              _pane.panels.splice(_panelIndex, 0, _panel);
              arrangePanel();
            },
            "row-right": function rowRight(_pane, _panel, _panelIndex) {
              _pane.panels.splice(_panelIndex + 1, 0, _panel);
              arrangePanel();
            },
            "column-top": function columnTop(_pane, _panel, _panelIndex) {
              var parentPath = addPath.substr(0, addPath.lastIndexOf("."));
              var parentPane = getPanel(parentPath);
              if (parentPane && parentPane.type == "column") {
                this.addPanel(parentPane.panelPath, _addType, _panel, _pane.panelIndex);
              } else {
                _pane = setPanel(addPath, {
                  type: "column",
                  panels: []
                });
                _pane.panels.push(_panel);
                _pane.panels.push(copyPanel);
                arrangePanel();
              }
            },
            "column-bottom": function columnBottom(_pane, _panel, _panelIndex) {
              var parentPath = addPath.substr(0, addPath.lastIndexOf("."));
              var parentPane = getPanel(parentPath);
              if (parentPane && parentPane.type == "column") {
                this.addPanel(parentPane.panelPath, _addType, _panel, _pane.panelIndex);
              } else {
                _pane = setPanel(addPath, {
                  type: "column",
                  panels: []
                });
                _pane.panels.push(copyPanel);
                _pane.panels.push(_panel);
                arrangePanel();
              }
            }
          };
          if (_addType in addProcessor) {
            addProcessor[_addType].call(this, _pane, _panel, _panelIndex);
          }

          addProcessor = null;
          copyPanel = null;
        },
        "column": function column(_pane, _addType, _panel, _panelIndex) {
          var copyPanel = _jqmin2.default.extend({}, _pane),
              addProcessor = {
            "stack": function stack(_pane, _panel) {
              if (_pane.panels[0] && _pane.panels[0].panelPath) {
                this.addPanel(_pane.panels[0].panelPath, _addType, _panel);
              }
            },
            "row-left": function rowLeft(_pane, _panel) {
              var parentPath = addPath.substr(0, addPath.lastIndexOf("."));
              var parentPane = getPanel(parentPath);
              if (parentPane && parentPane.type == "row") {
                this.addPanel(parentPane.panelPath, _addType, _panel, _pane.panelIndex);
              } else {
                _pane = setPanel(addPath, {
                  type: "row",
                  panels: []
                });
                _pane.panels.push(_panel);
                _pane.panels.push(copyPanel);
                arrangePanel();
              }
            },
            "row-right": function rowRight(_pane, _panel) {
              var parentPath = addPath.substr(0, addPath.lastIndexOf("."));
              var parentPane = getPanel(parentPath);
              if (parentPane && parentPane.type == "row") {
                this.addPanel(parentPane.panelPath, _addType, _panel, _pane.panelIndex);
              } else {
                _pane = setPanel(addPath, {
                  type: "row",
                  panels: []
                });
                _pane.panels.push(copyPanel);
                _pane.panels.push(_panel);
                arrangePanel();
              }
            },
            "column-top": function columnTop(_pane, _panel) {
              _pane.panels.splice(_panelIndex, 0, _panel);
              arrangePanel();
            },
            "column-bottom": function columnBottom(_pane, _panel) {
              _pane.panels.splice(_panelIndex + 1, 0, _panel);
              arrangePanel();
            }
          };
          if (_addType in addProcessor) {
            addProcessor[_addType].call(this, _pane, _panel);
          }

          addProcessor = null;
          copyPanel = null;
        },
        "panel": function panel(_pane, _addType, _panel) {
          var copyPanel = _jqmin2.default.extend({}, _pane),
              addProcessor = {
            "stack": function stack(_pane, _panel) {
              // _pane stack으로 재구성
              _pane = setPanel(addPath, {
                type: "stack",
                panels: []
              });

              if (_panel.active) {
                panelsDeactive(copyPanel);
              }

              _pane.panels.push(copyPanel);
              _pane.panels.push(_panel);
              arrangePanel();
            },
            "stack-left": function stackLeft(_pane, _panel) {
              // _pane stack으로 재구성
              _pane = setPanel(addPath, {
                type: "stack",
                panels: []
              });

              if (_panel.active) {
                panelsDeactive(copyPanel);
              }
              _pane.panels.push(_panel);
              _pane.panels.push(copyPanel);
              arrangePanel();
            },
            "stack-right": function stackRight(_pane, _panel) {
              // _pane stack으로 재구성
              _pane = setPanel(addPath, {
                type: "stack",
                panels: []
              });

              if (_panel.active) {
                panelsDeactive(copyPanel);
              }
              _pane.panels.push(copyPanel);
              _pane.panels.push(_panel);
              arrangePanel();
            },
            "row-left": function rowLeft(_pane, _panel) {
              var parentPath = addPath.substr(0, addPath.lastIndexOf("."));
              var parentPane = getPanel(parentPath);
              if (parentPane && parentPane.type == "row" || parentPane.type == "column") {
                this.addPanel(parentPane.panelPath, _addType, _panel, _pane.panelIndex);
              } else {
                _pane = setPanel(addPath, {
                  type: "row",
                  panels: []
                });
                _pane.panels.push(_panel);
                _pane.panels.push(copyPanel);
                arrangePanel();
              }
            },
            "row-right": function rowRight(_pane, _panel) {
              var parentPath = addPath.substr(0, addPath.lastIndexOf("."));
              var parentPane = getPanel(parentPath);
              if (parentPane && parentPane.type == "row" || parentPane.type == "column") {
                this.addPanel(parentPane.panelPath, _addType, _panel, _pane.panelIndex);
              } else {
                _pane = setPanel(addPath, {
                  type: "row",
                  panels: []
                });
                _pane.panels.push(copyPanel);
                _pane.panels.push(_panel);
                arrangePanel();
              }
            },
            "column-top": function columnTop(_pane, _panel) {
              var parentPath = addPath.substr(0, addPath.lastIndexOf("."));
              var parentPane = getPanel(parentPath);
              if (parentPane && parentPane.type == "column" || parentPane.type == "row") {
                this.addPanel(parentPane.panelPath, _addType, _panel, _pane.panelIndex);
              } else {
                _pane = setPanel(addPath, {
                  type: "column",
                  panels: []
                });
                _pane.panels.push(_panel);
                _pane.panels.push(copyPanel);
                arrangePanel();
              }
            },
            "column-bottom": function columnBottom(_pane, _panel) {
              var parentPath = addPath.substr(0, addPath.lastIndexOf("."));
              var parentPane = getPanel(parentPath);

              if (parentPane && parentPane.type == "column" || parentPane.type == "row") {
                this.addPanel(parentPane.panelPath, _addType, _panel, _pane.panelIndex);
              } else {
                _pane = setPanel(addPath, {
                  type: "column",
                  panels: []
                });
                _pane.panels.push(copyPanel);
                _pane.panels.push(_panel);
                arrangePanel();
              }
            }
          };

          if (_addType in addProcessor) {
            addProcessor[_addType].call(this, _pane, _panel);
          }

          copyPanel = null;
          addProcessor = null;
        }
      };

      if (this.panels.length === 0 || !this.panels[0]) {
        return this.setPanels([{ type: "stack", panels: [_panel] }]);
      } else {
        if (_addPath == "undefined") {
          addPath = "0";
        } else {
          addPath = _addPath.replace(/[a-zA-Z\[\]]+/g, "").replace(/(\d+)/g, function (a, b) {
            return "panels[" + a + "]";
          });
        }
        pane = getPanel.call(this, addPath);
        parent = getPanelParent.call(this, pane);
      }

      if (parent && parent.type == "stack") {
        // 부모패널로 ~
        pane = parent;
        addPath = pane.panelPath;
      }

      if (pane ? pane.type : "stack" in panelProcessor) {
        panelProcessor[pane ? pane.type : "stack"].call(this, pane, _addType, _panel, _panelIndex);
      }

      return this;
    }
  }, {
    key: "removePanel",


    /**
     * 패널 삭제하기
     * @method
     * @param {String} panelPath
     * @param {Function} callback
     * @returns {AX6UIDocker}
     * @example
     * ```js
     * function removePanel() {
                   *      var p = myDocker.searchPanel(function (panel) {
                   *          return (panel.key == "A");
                   *      });
                   *
                   *      if (p) {
                   *          myDocker.removePanel(p.panelPath, function () {
                   *              removePanel();
                   *          });
                   *      }
                   * }
     * removePanel();
     * ```
     */
    value: function removePanel(panelPath, callback) {
      var panel = getPanel.call(this, panelPath);

      controlPanel.call(this, panel, "destroy", callback);

      panel = null;
      return this;
    }
  }, {
    key: "appendPanel",


    /**
     * @method
     * @param _panel
     * @param _appendPath
     * @param _appendType
     * @returns {AX6UIDocker}
     */
    value: function appendPanel(_panel, _appendPath, _appendType) {

      var copiedPanel = $.extend({}, _panel, { panelPath: "" }),
          addType = void 0;

      var removePanelPath = _panel.panelPath;
      var appendPanelIndex = _AX6Util2.default.right(_appendPath, ".").replace(/\D/g, "");

      if (_appendType.length == 0) {
        return this;
      }

      if (_panel.panelPath === _appendPath) {
        var parentPath = _appendPath.substr(0, _appendPath.lastIndexOf("."));
        var parentPane = getPanel.call(this, parentPath);
        if (parentPane.type != "stack") {
          return this;
        }
      }

      if (_appendType.length == 1) {
        // stack
        addType = _appendType[0] == "last-child" ? "stack" : "stack-" + _appendType[0];
        copiedPanel.active = false;
        copiedPanel.$item.removeClass("active");
        controlPanel.call(this, copiedPanel, "deactive");
      } else {
        switch (_appendType[0] + "-" + _appendType[1]) {
          case "left-top":
            addType = "row-left";
            break;
          case "left-middle":
            addType = "row-left";
            break;
          case "left-bottom":
            addType = "row-left";
            break;
          case "center-top":
            addType = "column-top";
            break;
          case "center-middle":
            addType = "stack";
            copiedPanel.active = false;
            copiedPanel.$item.removeClass("active");
            appendPanelIndex = undefined;
            controlPanel.call(this, copiedPanel, "deactive");
            break;
          case "center-bottom":
            addType = "column-bottom";
            break;
          case "right-top":
            addType = "row-right";
            break;
          case "right-middle":
            addType = "row-right";
            break;
          case "right-bottom":
            addType = "row-right";
            break;
        }
      }

      if (_panel.panelPath === _appendPath) {
        // 부모레벨로 이동
        _appendPath = _AX6Util2.default.left(_appendPath, ".");
      }
      // todo : deactive call

      setPanel.call(this, removePanelPath, null);
      this.addPanel(_appendPath, addType, copiedPanel, appendPanelIndex);

      copiedPanel = null;
      return this;
    }
  }, {
    key: "align",


    /**
     * @method
     * @returns {AX6UIDocker}
     */
    value: function align() {
      alignStackPane.call(this);
      return this;
    }
  }, {
    key: "searchPanel",


    /**
     * @method
     * @param _condition
     * @returns {*}
     * @example
     * ```js
     * var p = myDocker.searchPanel(function (panel) {
                   *  return (panel.id == "A");
                   * });
     * ```
     */
    value: function searchPanel(_condition) {
      if (_AX6Util2.default.isFunction(_condition)) {
        var findPanel = function findPanel(_panels) {
          var i = 0,
              l = _panels.length,
              findResult = void 0;
          for (; i < l; i++) {
            if (_panels[i]) {
              if (_panels[i].type === "panel") {
                if (_condition.call({
                  config: self.config,
                  panel: _panels[i]
                }, _panels[i])) {
                  return _panels[i];
                }
              } else {
                if (findResult = findPanel(_panels[i].panels)) {
                  return findResult;
                }
              }
            }
          }
        };
        return findPanel(this.panels);
      } else if (_AX6Util2.default.isString(_condition)) {
        return getPanel.call(this, _condition);
      }
    }
  }, {
    key: "activePanel",


    /**
     * @method
     * @param {String} _panelPath
     * @param {Function} callback
     * @returns {AX6UIDocker}
     * @example
     * ```js
     * myDocker.activePanel("0.1");
     * myDocker.activePanel("0.0.1");
     * ```
     */
    value: function activePanel(_panelPath, callback) {
      var activePanelPath = "";
      var pane = void 0;
      var parent = void 0;

      if (this.panels.length === 0 || !this.panels[0]) {
        // 액티브 대상 없음.
        return this;
      } else {
        if (typeof _panelPath == "undefined") {
          activePanelPath = "0";
        } else {
          activePanelPath = _panelPath.replace(/[a-zA-Z\[\]]+/g, "").replace(/(\d+)/g, function (a, b) {
            return "panels[" + a + "]";
          });
        }
        pane = getPanel.call(this, activePanelPath);
        parent = getPanelParent.call(this, pane);
      }

      changeActiveStackPanel.call(this, parent, pane.panelIndex);
      return this;
    }
  }]);

  return AX6UIDocker;
}(_AX6UICore3.default);

exports.default = AX6UIDocker;