import jQuery from "jqmin";
import AX6UICore from "./AX6UICore.js";
import U from "./AX6Util";
/** ~~~~~~~~~~~~~~~~~~ end of import  ~~~~~~~~~~~~~~~~~~~~ **/


let debouncer = {
  resizeDebouncedFn: null,
  panelDebouncedFn: null
};

let tmpl = {
  stack_panel(columnKeys, data) {
    if (data.labelDirection === "bottom") {
      return `<div data-ax6ui-docker-pane="{{id}}" data-ax6ui-docker-label-direction="{{labelDirection}}" data-ax6ui-docker-path="{{panelPath}}" style="flex-grow: {{#flexGrow}}{{.}}{{/flexGrow}}{{^flexGrow}}1{{/flexGrow}};">
    <div data-ax6ui-docker-pane-item-views="{{id}}"></div>
    <ul data-ax6ui-docker-pane-tabs="{{id}}" data-ax6ui-docker-id="{{id}}" data-ax6ui-docker-path="{{panelPath}}"></ul>
    <div data-ax6ui-docker-pane-tabs-more="{{id}}">{{{icons.more}}}</div>
</div>`;
    } else {
      return `<div data-ax6ui-docker-pane="{{id}}" data-ax6ui-docker-label-direction="{{labelDirection}}" data-ax6ui-docker-path="{{panelPath}}" style="flex-grow: {{#flexGrow}}{{.}}{{/flexGrow}}{{^flexGrow}}1{{/flexGrow}};">
    <ul data-ax6ui-docker-pane-tabs="{{id}}" data-ax6ui-docker-id="{{id}}" data-ax6ui-docker-path="{{panelPath}}"></ul>
    <div data-ax6ui-docker-pane-tabs-more="{{id}}">{{{icons.more}}}</div>
    <div data-ax6ui-docker-pane-item-views="{{id}}"></div>
</div>`;
    }
  },
  panel_label() {
    return `<li data-ax6ui-docker-pane-tab="{{pIndex}}" data-ax6ui-docker-id="{{id}}" data-ax6ui-docker-path="{{panelPath}}" class="{{#hasLabelColor}}hasLabelColor{{/hasLabelColor}}">
    <div class="label-icon" style="{{#color}}background: {{color}};{{/color}}{{#borderColor}}border-color: {{borderColor}};{{/borderColor}}"></div>
    <div class="title">{{{name}}}</div>
    {{^disableClosePanel}}<div class="close-icon">{{{icons.close}}}</div>{{/disableClosePanel}}
</li><li class="pane-tab-margin"></li>`;
  }
};

/**
 * @private {Function}
 * @param event
 * @returns {AX6UIDocker}
 */
const fireEvent = function (event) {
  const eventProcessor = {
    "resize"(e) {
      if (this.onResize) {

        debouncer.resizeDebouncedFn((function () {
          let that = {
            self: this,
            resizer: e.target,
            resizedDom: [e.target.prev(), e.target.next()]
          };
          this.onResize.call(that, that);
        }).bind(this));

      }
    }
  };

  if (event.eventName in eventProcessor) {
    eventProcessor[event.eventName].call(this, event);
  }

  return this;
};

const getPanelId = function () {
  return this.panelId++;
};

/**
 * defaultModule은 패널의 모듈이 정의되지 않은 경우를 위해 준비된 오브젝트
 */
const defaultModule = {
  init(container, state) {
    container["$element"].html(state.name);
  },
  active(container, state) {

  },
  deactive(container, state) {

  },
  destroy(container, state) {

  }
};

/**
 * 부모패널과 패널인덱스 값으로 패널 패스를 구합니다.
 * @private {Function}
 * @param parent
 * @param pIndex
 * @returns {string}
 */
const getPanelPath = function (parent, pIndex) {
  let paths = [];
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
const getPanel = function (_panelPath) {
  let path  = [],
      _path = (U.isArray(_panelPath)) ? [].concat(_panelPath) : [].concat(_panelPath.split(/[\.\[\]]/g));

  _path.forEach(function (n) {
    if (n !== "") path.push("[\"" + n.replace(/['\"]/g, "") + "\"]");
  });

  try {
    return (Function("", "return this" + path.join('') + ";")).call(this);
  }
  catch (e) {
    return;
  }
};

/**
 * 패널을 이용하여 패널의 부모 패널을 가져옵니다
 * @private {Function}
 * @param _panel
 */
const getPanelParent = function (_panel) {
  try {
    let _path = _panel.panelPath.substr(0, _panel.panelPath.lastIndexOf("."));
    return (Function("", "return this." + _path + ";")).call(this);
  }
  catch (e) {
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
const setPanel = function (_panelPath, _value) {
  let path  = [],
      _path = (U.isArray(_panelPath)) ? [].concat(_panelPath) : [].concat(_panelPath.split(/[\.\[\]]/g));

  _path.forEach(function (n) {
    if (n !== "") path.push("[\"" + n.replace(/['\"]/g, "") + "\"]");
  });

  return (Function("val", "return this" + path.join('') + " = val;")).call(this, _value);
};

/**
 * get mouse position
 * @private {Function}
 * @param e
 * @returns {{clientX, clientY}}
 */
const getMousePosition = (e) => {
  let mouseObj, originalEvent = (e.originalEvent) ? e.originalEvent : e;
  mouseObj = ('changedTouches' in originalEvent && originalEvent.changedTouches) ? originalEvent.changedTouches[0] : originalEvent;
  // clientX, Y 쓰면 스크롤에서 문제 발생
  return {
    clientX: mouseObj.pageX,
    clientY: mouseObj.pageY
  }
};

/**
 * 패널의 모듈이 초기화, 활성화, 비활성, 제거 되는 일들을 제어하는 함수.
 * 모든 컨트롤은 실행되기전에 사용자가 정의한 control.before 함수의 결과에 따라 실행 여부를 결정합니다. 사용자가 control.before를 정의하지 않으면 무조건 실행합니다.
 * @private {Function}
 * @param {Object} _panel
 * @param {String} _control - "init","active","deactive","destroy"
 */
const controlPanel = function (_panel, _control, _callback) {
  let moduleState     = jQuery.extend(_panel.moduleState, {
        name: _panel.name
      }),
      moduleContainer = {
        '$element': _panel.$item
      },
      module;

  let processor = {
    init: () => {
      _panel.builded = true;
      module = (_panel.moduleName in this.modules && 'init' in this.modules[_panel.moduleName]) ? this.modules[_panel.moduleName] : defaultModule;
      module.init(moduleContainer, moduleState);
    },
    active: () => {
      _panel.active = true;
      _panel.$label.addClass("active");
      _panel.$item.addClass("active");

      let $pane = _panel.$label.parent();
      if ($pane.get(0) && $pane.get(0).clientWidth !== $pane.get(0).scrollWidth) {
        $pane.animate({scrollLeft: _panel.$label.position().left}, 300);
      }

      module = (_panel.moduleName in this.modules && 'active' in this.modules[_panel.moduleName]) ? this.modules[_panel.moduleName] : defaultModule;
      module.active(moduleContainer, moduleState);
      $pane = null;
    },
    deactive: () => {
      _panel.active = false;
      _panel.$label.removeClass("active");
      _panel.$item.removeClass("active");
      module = (_panel.moduleName in this.modules && 'deactive' in this.modules[_panel.moduleName]) ? this.modules[_panel.moduleName] : defaultModule;
      module.deactive(moduleContainer, moduleState);
    },
    destroy: () => {
      module = (_panel.moduleName in this.modules && 'destroy' in this.modules[_panel.moduleName]) ? this.modules[_panel.moduleName] : defaultModule;
      module.destroy(moduleContainer, moduleState);

      // 패널 데이터 제거.
      setPanel(_panel.panelPath, null);
      // 현재 패널 정보를 검사하여 패널 정보를 재 구성합니다.
      arrangePanel();
    },
    remove: () => {
      module = (_panel.moduleName in this.modules && 'destroy' in this.modules[_panel.moduleName]) ? this.modules[_panel.moduleName] : defaultModule;
      module.destroy(moduleContainer, moduleState);

      // 패널 데이터 제거.
      setPanel(_panel.panelPath, null);
      // 현재 패널 정보를 검사하여 패널 정보를 재 구성합니다.
      arrangePanel();
    },
  };

  // 사용자정의 함수 control.before, control.after에 전달할 인자 = that
  let that = {
    panel: _panel,
    controlType: _control
  };

  // 비동기 처리 상황에 대응하기 위해 runProcessor를 별도 처리
  let runProcessor = () => {
    processor[_control]();
    module = null;

    if (U.isFunction(cfg.control.after)) {
      cfg.control.after.call(that, that);
    }
  };

  if (processor[_control]) {
    if (U.isFunction(cfg.control.before)) {
      cfg.control.before.call(that, that, function (result) {
        if (typeof result === "undefined") result = true;
        if (result) runProcessor();

        if (U.isFunction(_callback)) {
          _callback(result);
        }

      });
    }
    else {
      runProcessor();
    }
  }
};

/**
 * 패널들의 패널 데이터 구조에 맞게 다시 그리기
 */
const repaintPanels = function () {
  const appendProcessor = {
    stack($parent, parent, myself, pIndex) {

      let $dom, activeIndex = -1;
      myself.panelPath = getPanelPath(parent, pIndex);

      $dom = jQuery(DOCKER.tmpl.get.call(this, "stack-panel", {
        id: self.instanceId,
        name: myself.name,
        hasLabelColor: !U.isNothing(myself.color),
        color: myself.color,
        borderColor: myself.borderColor,
        panelPath: myself.panelPath,
        icons: cfg.icons,
        labelDirection: myself.labelDirection || cfg.labelDirection,
        disableClosePanel: cfg.disableClosePanel,
        disableDragPanel: cfg.disableDragPanel,
      }, {}));
      $parent.append($dom);

      if (U.isArray(myself.panels)) {
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
    panel($parent, parent, myself, pIndex) {
      let $dom;
      myself.panelPath = getPanelPath(parent, pIndex);
      myself.$label = jQuery(DOCKER.tmpl.get.call(this, "panel-label", {
        id: self.instanceId,
        pIndex: pIndex,
        name: myself.name,
        hasLabelColor: !U.isNothing(myself.color),
        color: myself.color,
        borderColor: myself.borderColor,
        panelPath: myself.panelPath,
        icons: cfg.icons,
        disableClosePanel: cfg.disableClosePanel,
        disableDragPanel: cfg.disableDragPanel,
      }, {}));

      if (!myself.$item) {
        myself.$item = jQuery('<div data-ax6ui-docker-pane-item="' + pIndex + '" data-ax6ui-docker-id="' + self.instanceId + '" data-ax6ui-docker-pane-id="' + getPanelId() + '" data-ax6ui-docker-path="' + myself.panelPath + '"></div>');
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
        $dom = jQuery(DOCKER.tmpl.get.call(this, "stack-panel", {
          id: self.instanceId,
          name: myself.name,
          hasLabelColor: !U.isNothing(myself.color),
          color: myself.color,
          borderColor: myself.borderColor,
          panelPath: myself.panelPath,
          flexGrow: myself.flexGrow,
          icons: cfg.icons,
          labelDirection: myself.labelDirection || cfg.labelDirection,
          disableClosePanel: cfg.disableClosePanel,
          disableDragPanel: cfg.disableDragPanel,
        }, {}));

        if (!myself.builded) controlPanel(myself, "init");
        controlPanel(myself, "active");

        $dom.find('[data-ax6ui-docker-pane-tabs="' + self.instanceId + '"]').append(myself.$label);
        $dom.find('[data-ax6ui-docker-pane-item-views="' + self.instanceId + '"]').append(myself.$item);

        $parent.append($dom);
      }

      $dom = null;
    },
    resizeHandle($parent, parent, myself, pIndex) {
      let $dom = jQuery('<div data-ax6ui-docker-id="' + self.instanceId + '" data-ax6ui-docker-resize-handle="' + parent.type + "/" + parent.panelPath + "/" + pIndex + '"></div>');
      $parent.append($dom);
      $dom = null;
    },
    row($parent, parent, myself, pIndex) {
      let $dom;
      myself.panelPath = getPanelPath(parent, pIndex);
      if (parent && parent.type == "stack") {
        throw "The 'stack' type child nodes are allowed only for the 'panel' type.";
      }
      $dom = jQuery('<div data-ax6ui-docker-pane-axis="row" data-ax6ui-docker-id="' + self.instanceId + '" data-ax6ui-docker-path="' + myself.panelPath + '" style="flex-grow: ' + (myself.flexGrow || 1) + ';"></div>');
      $parent.append($dom);

      if (U.isArray(myself.panels)) {
        myself.panels.forEach(function (P, _pIndex) {
          if (_pIndex > 0) appendProcessor["resizeHandle"]($dom, myself, P, _pIndex);
          P.panelIndex = _pIndex;
          appendProcessor[P.type]($dom, myself, P, _pIndex);
        });
      }

      $dom = null;
    },
    column($parent, parent, myself, pIndex) {
      let $dom;
      myself.panelPath = getPanelPath(parent, pIndex);
      if (parent && parent.type == "stack") {
        throw "The 'stack' type child nodes are allowed only for the 'panel' type.";
      }
      $dom = jQuery('<div data-ax6ui-docker-pane-axis="column" data-ax6ui-docker-id="' + self.instanceId + '" data-ax6ui-docker-path="' + myself.panelPath + '" style="flex-grow: ' + (myself.flexGrow || 1) + ';"></div>');
      $parent.append($dom);

      if (U.isArray(myself.panels)) {
        myself.panels.forEach(function (P, _pIndex) {
          if (_pIndex > 0) appendProcessor["resizeHandle"]($dom, myself, P, _pIndex);
          P.panelIndex = _pIndex;
          appendProcessor[P.type]($dom, myself, P, _pIndex);
        });
      }

      $dom = null;
    }
  };

  let $root = jQuery('<div data-ax6ui-docker-panes="' + this.instanceId + '"></div>');
  if (this.panels[0]) appendProcessor[this.panels[0].type]($root, null, this.panels[0], 0);
  this.$target.html($root);

  this.$target
    .off("click.ax5docker-pane")
    .on("click.ax5docker-pane", '[data-ax6ui-docker-id="' + self.instanceId + '"][data-ax6ui-docker-pane-tab] .close-icon', function (e) {
      self.removePanel($(this).parents('[data-ax6ui-docker-pane-tab]').attr("data-ax6ui-docker-path"));
      U.stopEvent(e);
    })
    .on("click.ax5docker-pane", '[data-ax6ui-docker-id="' + self.instanceId + '"][data-ax6ui-docker-pane-tab]', function (e) {
      // pane, panelIndex 인자 변경.
      let $clickedLabel = jQuery(this);
      let pane = getPanel($clickedLabel.parents('[data-ax6ui-docker-pane]').attr("data-ax6ui-docker-path"));
      let panelIndex = $clickedLabel.attr("data-ax6ui-docker-pane-tab");

      if (!$clickedLabel.hasClass("active")) {
        changeActiveStackPanel(pane, panelIndex);
      }

      $clickedLabel = null;
      pane = null;
      panelIndex = null;
      U.stopEvent(e);
    })
    .on("click.ax5docker-pane", '[data-ax6ui-docker-pane-tabs-more="' + this.instanceId + '"]', function (e) {
      openStackPanelMore($(this).parents('[data-ax6ui-docker-pane]'), e);
      U.stopEvent(e);
    });

  this.$target
    .off("mousedown.ax5docker-pane-resize")
    .off("dragstart.ax5docker-pane-resize")
    .on("dragstart.ax5docker-pane-resize", '[data-ax6ui-docker-id="' + self.instanceId + '"][data-ax6ui-docker-pane-tab]', function (e) {
      if (!cfg.disableDragPanel) {
        panelTabDragEvent.on(this);
      }
    })
    .on("mousedown.ax5docker-pane-resize", '[data-ax6ui-docker-id="' + self.instanceId + '"][data-ax6ui-docker-resize-handle]', function (e) {
      let datas = this.getAttribute("data-ax6ui-docker-resize-handle").split(/\//g);

      // panelResizerEvent.init
      self.xvar.mousePosition = getMousePosition(e);
      self.xvar.resizerType = datas[0];
      self.xvar.resizerPath = datas[1];
      self.xvar.resizerIndex = datas[2];
      // 주변 패널들
      self.xvar.resizer$dom = $(this);
      self.xvar.resizerParent$dom = self.xvar.resizer$dom.parent();
      self.xvar.resizerPrevGrow = U.number(self.xvar.resizer$dom.prev().css("flex-grow"));
      self.xvar.resizerNextGrow = U.number(self.xvar.resizer$dom.next().css("flex-grow"));

      if (self.xvar.resizerType == "row") {
        //self.xvar.resizerCanvasWidth = self.xvar.resizerParent$dom.innerWidth();
        self.xvar.resizerCanvasWidth = self.xvar.resizer$dom.prev().innerWidth() + self.xvar.resizer$dom.next().innerWidth() + self.xvar.resizer$dom.width();
      } else {
        //self.xvar.resizerCanvasHeight = self.xvar.resizerParent$dom.innerHeight();
        self.xvar.resizerCanvasHeight = self.xvar.resizer$dom.prev().innerHeight() + self.xvar.resizer$dom.next().innerHeight() + self.xvar.resizer$dom.height();
      }

      panelResizerEvent.on(this);
      U.stopEvent(e);
    })
    .on("dragstart.ax5docker-pane-resize", '[data-ax6ui-docker-id="' + self.instanceId + '"][data-ax6ui-docker-resize-handle]', function (e) {
      U.stopEvent(e);
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
const panelTabDragEvent = {
  "on": (dragPanel) => {
    if (this.panels[0] && this.panels[0].panels && this.panels[0].panels.length) {

      this.xvar.dragger = {
        dragPanel: dragPanel,
        target: null,
        dragOverVertical: null,
        dragOverHorizontal: null,
      };

      this.$target
        .on("dragover.ax5docker-" + this.instanceId, '[data-ax6ui-docker-id="' + this.instanceId + '"][data-ax6ui-docker-path]', function (e) {
          // todo : dragover 구현
          // console.log("dargover", getMousePosition(e));
          // console.log(e.target);
          panelTabDragEvent.dragover(this, e);
          U.stopEvent(e);
        })
        .on("drop.ax5docker-" + this.instanceId, function (e) {
          panelTabDragEvent.off("drop");
          U.stopEvent(e);
        })
        .on("dragend.ax5docker-" + this.instanceId, function (e) {
          panelTabDragEvent.off();
          U.stopEvent(e);
        });
    }
  },
  "dragover": (dragoverDom, e) => {

    let $dragoverDom = jQuery(dragoverDom),
        box          = {},
        mouse        = getMousePosition(e),
        dragOverVertical,
        dragOverHorizontal;

    if (this.xvar.dragger.target == null || this.xvar.dragger.target.get(0) != $dragoverDom.get(0)) {
      if (this.xvar.dragger.target) this.xvar.dragger.target.removeAttr("data-dropper");

      this.xvar.dragger.target = $dragoverDom;
      this.xvar.dragger.dragOverVertical = null;
      this.xvar.dragger.dragOverHorizontal = null;
    }

    box = $dragoverDom.offset();
    box.width = $dragoverDom.width();
    box.height = $dragoverDom.height();

    if ($dragoverDom.attr("data-ax6ui-docker-pane-tab")) {
      let halfWidth = box.width / 2;
      if (box.left <= mouse.clientX && (box.left + halfWidth) >= mouse.clientX) {
        dragOverHorizontal = "left";
      }
      else if ((box.left + halfWidth) <= mouse.clientX && (box.left + halfWidth * 2) >= mouse.clientX) {
        dragOverHorizontal = "right";
      }
      if (this.xvar.dragger.dragOverHorizontal != dragOverHorizontal && typeof dragOverHorizontal != "undefined") {
        this.xvar.dragger.dragOverHorizontal = dragOverHorizontal;
        const draggerProcessor = {
          "left"($target) {
            $target.attr("data-dropper", "left");
          },
          "right"($target) {
            $target.attr("data-dropper", "right");
          },
        };
        if (this.xvar.dragger.dragOverHorizontal in draggerProcessor) {
          draggerProcessor[this.xvar.dragger.dragOverHorizontal](this.xvar.dragger.target);
        }
      }
      halfWidth = null;
    }
    else if ($dragoverDom.attr("data-ax6ui-docker-pane-tabs")) {
      //this.xvar.dragger.dragOverVertical = "center";
      this.xvar.dragger.dragOverHorizontal = "last-child";
      this.xvar.dragger.target.attr("data-dropper", "true");
    }
    else if ($dragoverDom.attr("data-ax6ui-docker-pane-item")) {
      // panel dragover 포지션 구하기
      let threeQuarterHeight = box.height / 3;
      let threeQuarterWidth = box.width / 3;

      if (box.top <= mouse.clientY && (box.top + threeQuarterHeight) >= mouse.clientY) {
        dragOverVertical = "top";
      }
      else if ((box.top + threeQuarterHeight) <= mouse.clientY && (box.top + threeQuarterHeight * 2) >= mouse.clientY) {
        dragOverVertical = "middle";
      }
      else if ((box.top + threeQuarterHeight * 2) <= mouse.clientY && (box.top + threeQuarterHeight * 3) >= mouse.clientY) {
        dragOverVertical = "bottom";
      }

      if (box.left <= mouse.clientX && (box.left + threeQuarterWidth) >= mouse.clientX) {
        dragOverHorizontal = "left";
      }
      else if ((box.left + threeQuarterWidth) <= mouse.clientX && (box.left + threeQuarterWidth * 2) >= mouse.clientX) {
        dragOverHorizontal = "center";
      }
      else if ((box.left + threeQuarterWidth * 2) <= mouse.clientX && (box.left + threeQuarterWidth * 3) >= mouse.clientX) {
        dragOverHorizontal = "right";
      }

      if (this.xvar.dragger.dragOverVertical != dragOverVertical || this.xvar.dragger.dragOverHorizontal != dragOverHorizontal) {
        this.xvar.dragger.dragOverVertical = dragOverVertical;
        this.xvar.dragger.dragOverHorizontal = dragOverHorizontal;

        var draggerProcessor = {
          "left-top"($target) {
            $target.attr("data-dropper", "left");
          },
          "right-top"($target) {
            $target.attr("data-dropper", "right");
          },
          "center-top"($target) {
            $target.attr("data-dropper", "top");
          },
          "left-middle"($target) {
            $target.attr("data-dropper", "left");
          },
          "right-middle"($target) {
            $target.attr("data-dropper", "right");
          },
          "center-middle"($target) {
            $target.attr("data-dropper", "center");
          },
          "left-bottom"($target) {
            $target.attr("data-dropper", "left");
          },
          "right-bottom"($target) {
            $target.attr("data-dropper", "right");
          },
          "center-bottom"($target) {
            $target.attr("data-dropper", "bottom");
          },
        };
        if (this.xvar.dragger.dragOverHorizontal + "-" + this.xvar.dragger.dragOverVertical in draggerProcessor) {
          draggerProcessor[this.xvar.dragger.dragOverHorizontal + "-" + this.xvar.dragger.dragOverVertical](this.xvar.dragger.target);
        }
      }

      threeQuarterHeight = null;
      threeQuarterWidth = null;
    }
  },
  "off": (isDrop) => {
    if (isDrop) {
      let dragPanel  = getPanel(this.xvar.dragger.dragPanel.getAttribute("data-ax6ui-docker-path")),
          appendType = [];

      if (this.xvar.dragger.dragOverHorizontal) appendType.push(this.xvar.dragger.dragOverHorizontal);
      if (this.xvar.dragger.dragOverVertical) appendType.push(this.xvar.dragger.dragOverVertical);

      this.appendPanel(dragPanel, this.xvar.dragger.target.attr("data-ax6ui-docker-path"), appendType);

      dragPanel = null;
      appendType = null;
    }

    alignStackPane();

    this.$target
      .off("dragover.ax5docker-" + this.instanceId)
      .off("drop.ax5docker-" + this.instanceId)
      .off("dragend.ax5docker-" + this.instanceId);

    this.xvar.dragger.target.removeAttr("data-dropper");
  }
};

/**
 * repaintPanels이 작동할 때. 리사이저에 mousedown 이벤트를 연결합니다.
 * 발생된 이벤트가 panelResizerEvent.on 을 작동시켜 리사이저를 움직이게 합니다
 */
const panelResizerEvent = {
  "on": (_resizer) => {

    jQuery(document.body)
      .on("mousemove.ax5docker-" + this.instanceId, function (e) {
        let mouseObj = getMousePosition(e),
            da_grow;

        if (self.xvar.resizerLived) {
          if (self.xvar.resizerType == "row") {
            self.xvar.__da = mouseObj.clientX - self.xvar.mousePosition.clientX;
            da_grow = U.number(self.xvar.__da * 2 / self.xvar.resizerCanvasWidth, {round: 6});

            self.xvar.resizer$dom.prev().css({"flex-grow": self.xvar.resizerPrevGrow + da_grow});
            self.xvar.resizer$dom.next().css({"flex-grow": self.xvar.resizerNextGrow - da_grow});
          } else {
            self.xvar.__da = mouseObj.clientY - self.xvar.mousePosition.clientY;
            da_grow = U.number(self.xvar.__da * 2 / self.xvar.resizerCanvasHeight, {round: 6});

            self.xvar.resizer$dom.prev().css({"flex-grow": self.xvar.resizerPrevGrow + da_grow});
            self.xvar.resizer$dom.next().css({"flex-grow": self.xvar.resizerNextGrow - da_grow});
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
      })
      .on("mouseup.ax5docker-" + this.instanceId, function (e) {
        panelResizerEvent.off();
        U.stopEvent(e);
      })
      .on("mouseleave.ax5docker-" + this.instanceId, function (e) {
        panelResizerEvent.off();
        U.stopEvent(e);
      });

    jQuery(document.body)
      .attr('unselectable', 'on')
      .css('user-select', 'none')
      .on('selectstart', false);
  },
  "off": () => {
    self.xvar.resizerLived = false;

    if (typeof this.xvar.__da === "undefined") {

    }
    else {
      let $prevPanel = self.xvar.resizer$dom.prev(),
          $nextPanel = self.xvar.resizer$dom.next(),
          prevPane   = getPanel($prevPanel.attr("data-ax6ui-docker-path")),
          nextPane   = getPanel($nextPanel.attr("data-ax6ui-docker-path"));

      prevPane.flexGrow = U.number($prevPanel.css("flex-grow"));
      nextPane.flexGrow = U.number($nextPanel.css("flex-grow"));

      $prevPanel = null;
      $nextPanel = null;
      prevPane = null;
      nextPane = null;
    }

    alignStackPane();

    jQuery(document.body)
      .off("mousemove.ax5docker-" + this.instanceId)
      .off("mouseup.ax5docker-" + this.instanceId)
      .off("mouseleave.ax5docker-" + this.instanceId);

    jQuery(document.body)
      .removeAttr('unselectable')
      .css('user-select', 'auto')
      .off('selectstart');
  }
};

/**
 * 액티브 패널 변경(stack인 상황에서)
 * @private {Function}
 * @param pane
 * @param panelIndex
 * @returns {boolean}
 */
const changeActiveStackPanel = function (pane, panelIndex) {
  let panel = pane.panels[panelIndex];

  for (let p = 0, pl = pane.panels.length; p < pl; p++) {
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
const openStackPanelMore = function (stackPane, e) {
  let $stackPane = jQuery(stackPane),
      panePath   = $stackPane.attr("data-ax6ui-docker-path"),
      pane       = getPanel(panePath);

  if (this.menu) {
    let menuItems = U.map(pane.panels, function (index) {
      return {
        label: this.name,
        index: index,
        panePath: panePath
      }
    });

    this.menu.setConfig({
      items: menuItems,
      onClick: function () {
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
const alignStackPane = function () {
  debouncer.panelDebouncedFn((function () {
    this.$target.find('[data-ax6ui-docker-pane-tabs="' + this.instanceId + '"]').each(function () {
      let $this = jQuery(this).parent();
      if (this.scrollWidth > this.clientWidth) {
        $this.addClass("tabs-scrolled");
      } else {
        $this.removeClass("tabs-scrolled");
      }
      $this = null;
    });
  }).bind(this));
};

const panelsDeactive = function (panels) {
  if (U.isArray(panels)) {
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
const arrangePanel = function () {
  const processor = {
    stack(myself) {
      if (!U.isArray(myself.panels)) return false;

      let newObj = {
        type: "stack",
        panels: []
      };

      myself.panels.forEach(function (P, _pIndex) {
        if (P) {
          let _p = processor[P.type](P);
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
    panel(myself) {
      //console.log(myself);
      return myself;
    },
    row(myself) {

      if (!U.isArray(myself.panels)) return false;

      let newObj = {
        type: "row",
        panels: []
      };

      myself.panels.forEach(function (P, _pIndex) {
        if (P) {
          let _p = processor[P.type](P);
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
    column(myself) {
      if (!U.isArray(myself.panels)) return false;

      let newObj = {
        type: "column",
        panels: []
      };

      myself.panels.forEach(function (P, _pIndex) {
        if (P) {
          let _p = processor[P.type](P);
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
class AX6UIDocker extends AX6UICore {
  /**
   * @constructor
   * @param config
   */
  constructor(config) {
    super();

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
    this.config = {
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
      panelDebounceTime: 300,
    };
    jQuery.extend(true, this.config, config);

    // 멤버 변수 초기화
    /**
     * @member {Object}
     */
    this.xvar = {};
    /**
     * @member {Object}
     */
    this.menu = null;

    this.onResize = null;
    // 패널 정보
    /**
     * @member {Array}
     */
    this.panels = [];
    /**
     * @member {Number}
     */
    this.panelId = 0;

    // 패널의 컨텐츠 모듈
    /**
     * @member {Object}
     */
    this.modules = {};

    if (typeof config !== "undefined") this.init();
  }

  /**
   * @method
   */
  init() {
    this.onStateChanged = this.config.onStateChanged;
    this.onResize = this.config.onResize;
    this.onClick = this.config.onClick;
    this.onLoad = this.config.onLoad;
    this.onDataChanged = this.config.onDataChanged;

    // memory target
    this.$target = jQuery(this.config.target);
    // set panels
    this.panels = this.config.panels || [];


    debouncer.resizeDebouncedFn = U.throttle(function (fn) {
      fn();
    }, this.config.resizeDebounceTime);

    debouncer.panelDebouncedFn = U.debounce(function (fn) {
      fn();
    }, this.config.panelDebounceTime);

    // init 호출 여부
    this.initOnce();
  }

  /**
   * @method
   */
  initOnce() {
    if (this.initialized) return this;
    this.initialized = true;

    jQuery(window)
      .off("resize.ax6ui-docker-" + this.instanceId)
      .on("resize.ax6ui-docker-" + this.instanceId, U.throttle(function (e) {

      }, 30).bind(this));
  }


  /**
   * @method
   * @returns {AX6UIDocker}
   */
  setPanels(_panels) {
    // set panels
    this.panels = _panels || [];

    // 패널 다시 그리기
    repaintPanels.call(this);
    return this;
  };

  /**
   * @method
   * @param modules
   * @returns {AX6UIDocker}
   */
  addModule(modules) {
    if (U.isObject(modules)) {
      jQuery.extend(true, this.modules, modules);
    }
    return this;
  };

  /**
   * repaint panels of docker
   * @method
   * @returns {AX6UIDocker}
   */
  repaint() {
    // 패널 다시 그리기
    repaintPanels.call(this);
    return this;
  };

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
  addPanel(_addPath, _addType, _panel, _panelIndex) {
    let addPath = "",
        pane, parent;
    const panelProcessor = {
      "stack"(_pane, _addType, _panel, _panelIndex) {
        let copyPanel    = jQuery.extend({}, _pane),
            addProcessor = {
              "stack"(_pane, _panel) {
                if (_panel.active) {
                  panelsDeactive(_pane.panels);
                }
                _pane.panels.push(_panel);
                arrangePanel();
              },
              "stack-left"(_pane, _panel) {
                if (_panel.active) {
                  panelsDeactive(_pane.panels);
                }
                _pane.panels.splice(_panelIndex, 0, _panel);
                arrangePanel();
              },
              "stack-right"(_pane, _panel) {
                if (_panel.active) {
                  panelsDeactive(_pane.panels);
                }
                _pane.panels.splice(Number(_panelIndex) + 1, 0, _panel);
                arrangePanel();
              },
              "row-left"(_pane, _panel) {
                let parentPath = addPath.substr(0, addPath.lastIndexOf("."));
                let parentPane = getPanel(parentPath);
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
              "row-right"(_pane, _panel) {
                let parentPath = addPath.substr(0, addPath.lastIndexOf("."));
                let parentPane = getPanel(parentPath);
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
              "column-top"(_pane, _panel) {
                let parentPath = addPath.substr(0, addPath.lastIndexOf("."));
                let parentPane = getPanel(parentPath);
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
              "column-bottom"(_pane, _panel) {
                let parentPath = addPath.substr(0, addPath.lastIndexOf("."));
                let parentPane = getPanel(parentPath);
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
      "row"(_pane, _addType, _panel, _panelIndex) {
        let copyPanel    = jQuery.extend({}, _pane),
            addProcessor = {
              "stack"(_pane, _panel) {
                // 처리 할 수 없는 상황 첫번째 자식을 찾아 재 요청
                if (_pane.panels[0] && _pane.panels[0].panelPath) {
                  this.addPanel(_pane.panels[0].panelPath, _addType, _panel);
                }
              },
              "row-left"(_pane, _panel, _panelIndex) {
                _pane.panels.splice(_panelIndex, 0, _panel);
                arrangePanel();
              },
              "row-right"(_pane, _panel, _panelIndex) {
                _pane.panels.splice(_panelIndex + 1, 0, _panel);
                arrangePanel();
              },
              "column-top"(_pane, _panel, _panelIndex) {
                let parentPath = addPath.substr(0, addPath.lastIndexOf("."));
                let parentPane = getPanel(parentPath);
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
              "column-bottom"(_pane, _panel, _panelIndex) {
                let parentPath = addPath.substr(0, addPath.lastIndexOf("."));
                let parentPane = getPanel(parentPath);
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
      "column"(_pane, _addType, _panel, _panelIndex) {
        let copyPanel    = jQuery.extend({}, _pane),
            addProcessor = {
              "stack"(_pane, _panel) {
                if (_pane.panels[0] && _pane.panels[0].panelPath) {
                  this.addPanel(_pane.panels[0].panelPath, _addType, _panel);
                }
              },
              "row-left"(_pane, _panel) {
                let parentPath = addPath.substr(0, addPath.lastIndexOf("."));
                let parentPane = getPanel(parentPath);
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
              "row-right"(_pane, _panel) {
                let parentPath = addPath.substr(0, addPath.lastIndexOf("."));
                let parentPane = getPanel(parentPath);
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
              "column-top"(_pane, _panel) {
                _pane.panels.splice(_panelIndex, 0, _panel);
                arrangePanel();
              },
              "column-bottom"(_pane, _panel) {
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
      "panel"(_pane, _addType, _panel) {
        let copyPanel    = jQuery.extend({}, _pane),
            addProcessor = {
              "stack"(_pane, _panel) {
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
              "stack-left"(_pane, _panel) {
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
              "stack-right"(_pane, _panel) {
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
              "row-left"(_pane, _panel) {
                let parentPath = addPath.substr(0, addPath.lastIndexOf("."));
                let parentPane = getPanel(parentPath);
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
              "row-right"(_pane, _panel) {
                let parentPath = addPath.substr(0, addPath.lastIndexOf("."));
                let parentPane = getPanel(parentPath);
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
              "column-top"(_pane, _panel) {
                let parentPath = addPath.substr(0, addPath.lastIndexOf("."));
                let parentPane = getPanel(parentPath);
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
              "column-bottom"(_pane, _panel) {
                let parentPath = addPath.substr(0, addPath.lastIndexOf("."));
                let parentPane = getPanel(parentPath);

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
      return this.setPanels([{type: "stack", panels: [_panel]}]);
    } else {
      if (_addPath == "undefined") {
        addPath = "0";
      } else {
        addPath = _addPath
          .replace(/[a-zA-Z\[\]]+/g, "")
          .replace(/(\d+)/g, function (a, b) {
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

    if ((pane) ? pane.type : "stack" in panelProcessor) {
      panelProcessor[(pane) ? pane.type : "stack"].call(this, pane, _addType, _panel, _panelIndex);
    }

    return this;
  };

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
  removePanel(panelPath, callback) {
    let panel = getPanel.call(this, panelPath);

    controlPanel.call(this, panel, "destroy", callback);

    panel = null;
    return this;
  };

  /**
   * @method
   * @param _panel
   * @param _appendPath
   * @param _appendType
   * @returns {AX6UIDocker}
   */
  appendPanel(_panel, _appendPath, _appendType) {

    let copiedPanel = $.extend({}, _panel, {panelPath: ""}),
        addType;

    let removePanelPath = _panel.panelPath;
    let appendPanelIndex = U.right(_appendPath, ".").replace(/\D/g, "");

    if (_appendType.length == 0) {
      return this;
    }

    if (_panel.panelPath === _appendPath) {
      let parentPath = _appendPath.substr(0, _appendPath.lastIndexOf("."));
      let parentPane = getPanel.call(this, parentPath);
      if (parentPane.type != "stack") {
        return this;
      }
    }

    if (_appendType.length == 1) { // stack
      addType = (_appendType[0] == "last-child") ? "stack" : "stack-" + _appendType[0];
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
      _appendPath = U.left(_appendPath, ".");
    }
    // todo : deactive call

    setPanel.call(this, removePanelPath, null);
    this.addPanel(_appendPath, addType, copiedPanel, appendPanelIndex);

    copiedPanel = null;
    return this;
  };

  /**
   * @method
   * @returns {AX6UIDocker}
   */
  align() {
    alignStackPane.call(this, );
    return this;
  };

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
  searchPanel(_condition) {
    if (U.isFunction(_condition)) {
      const findPanel = function (_panels) {
        let i = 0, l = _panels.length, findResult;
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
    } else if (U.isString(_condition)) {
      return getPanel.call(this, _condition);
    }
  };

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
  activePanel(_panelPath, callback) {
    let activePanelPath = "";
    let pane;
    let parent;

    if (this.panels.length === 0 || !this.panels[0]) {
      // 액티브 대상 없음.
      return this;
    } else {
      if (typeof _panelPath == "undefined") {
        activePanelPath = "0";
      } else {
        activePanelPath = _panelPath
          .replace(/[a-zA-Z\[\]]+/g, "")
          .replace(/(\d+)/g, function (a, b) {
            return "panels[" + a + "]";
          });
      }
      pane = getPanel.call(this, activePanelPath);
      parent = getPanelParent.call(this, pane);
    }

    changeActiveStackPanel.call(this, parent, pane.panelIndex);
    return this;
  };
  
}

export default AX6UIDocker;