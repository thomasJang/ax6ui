"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jqmin = require("jqmin");

var _jqmin2 = _interopRequireDefault(_jqmin);

var _AX6UICore2 = require("./AX6UICore.js");

var _AX6UICore3 = _interopRequireDefault(_AX6UICore2);

var _AX6Info = require("./AX6Info");

var _AX6Info2 = _interopRequireDefault(_AX6Info);

var _AX6Util = require("./AX6Util");

var _AX6Util2 = _interopRequireDefault(_AX6Util);

var _AX6Mustache = require("./AX6Mustache");

var _AX6Mustache2 = _interopRequireDefault(_AX6Mustache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** ~~~~~~~~~~~~~~~~~~ end of import  ~~~~~~~~~~~~~~~~~~~~ **/

var tmpl = {
  menu: function menu(columnKeys) {
    return "\n        <div data-ax6ui-menu=\"\" class=\"{{theme}}\" {{#width}}style=\"width:{{width}}px;\"{{/width}}>\n            <div class=\"ax-menu-body\">\n                {{#" + columnKeys.items + "}}\n                    {{^@isMenu}}\n                        {{#divide}}\n                        <div class=\"ax-menu-item-divide\" data-menu-item-index=\"{{@i}}\"></div>\n                        {{/divide}}\n                        {{#html}}\n                        <div class=\"ax-menu-item-html\" data-menu-item-index=\"{{@i}}\">{{{@html}}}</div>\n                        {{/html}}\n                    {{/@isMenu}}\n                    {{#@isMenu}}\n                    <div class=\"ax-menu-item\" data-menu-item-depth=\"{{@depth}}\" data-menu-item-index=\"{{@i}}\" data-menu-item-path=\"{{@path}}.{{@i}}\">\n                        <span class=\"ax-menu-item-cell ax-menu-item-checkbox\">\n                            {{#check}}\n                            <span class=\"item-checkbox-wrap useCheckBox\" {{#checked}}data-item-checked=\"true\"{{/checked}}></span>\n                            {{/check}}\n                            {{^check}}\n                            <span class=\"item-checkbox-wrap\"></span>\n                            {{/check}}\n                        </span>\n                        {{#icon}}\n                        <span class=\"ax-menu-item-cell ax-menu-item-icon\" style=\"width:{{cfg.iconWidth}}px;\">{{{.}}}</span>\n                        {{/icon}}\n                        <span class=\"ax-menu-item-cell ax-menu-item-label\">{{{" + columnKeys.label + "}}}</span>\n                        {{#accelerator}}\n                        <span class=\"ax-menu-item-cell ax-menu-item-accelerator\" style=\"width:{{cfg.acceleratorWidth}}px;\"><span class=\"item-wrap\">{{.}}</span></span>\n                        {{/accelerator}}\n                        {{#@hasChild}}\n                        <span class=\"ax-menu-item-cell ax-menu-item-handle\">{{{cfg.icons.arrow}}}</span>\n                        {{/@hasChild}}\n                    </div>\n                    {{/@isMenu}}\n\n                {{/" + columnKeys.items + "}}\n            </div>\n            <div class=\"ax-menu-arrow\"></div>\n        </div>\n        ";
  },
  menubar: function menubar(columnKeys) {
    return "\n        <div data-ax6ui-menubar=\"\" class=\"{{theme}}\">\n            <div class=\"ax-menu-body\">\n                {{#" + columnKeys.items + "}}\n                    {{^@isMenu}}\n                        {{#divide}}\n                        <div class=\"ax-menu-item-divide\" data-menu-item-index=\"{{@i}}\"></div>\n                        {{/divide}}\n                        {{#html}}\n                        <div class=\"ax-menu-item-html\" data-menu-item-index=\"{{@i}}\">{{{@html}}}</div>\n                        {{/html}}\n                    {{/@isMenu}}\n                    {{#@isMenu}}\n                    <div class=\"ax-menu-item\" data-menu-item-index=\"{{@i}}\">\n                        {{#icon}}\n                        <span class=\"ax-menu-item-cell ax-menu-item-icon\" style=\"width:{{cfg.iconWidth}}px;\">{{{.}}}</span>\n                        {{/icon}}\n                        <span class=\"ax-menu-item-cell ax-menu-item-label\">{{{" + columnKeys.label + "}}}</span>\n                    </div>\n                    {{/@isMenu}}\n                {{/" + columnKeys.items + "}}\n            </div>\n        </div>\n        ";
  }
};

var appEventAttach = function appEventAttach(active, opt) {
  if (active) {
    (0, _jqmin2.default)(document.body).off("click.ax5menu-" + this.instanceId).on("click.ax5menu-" + this.instanceId, clickItem.bind(this, opt));

    (0, _jqmin2.default)(window).off("keydown.ax5menu-" + this.instanceId).on("keydown.ax5menu-" + this.instanceId, function (e) {
      if (e.which == _AX6Info2.default.eventKeys.ESC) {
        self.close();
      }
    }).off("resize.ax5menu-" + this.instanceId).on("resize.ax5menu-" + this.instanceId, function (e) {
      self.close();
    });
  } else {
    (0, _jqmin2.default)(document.body).off("click.ax5menu-" + this.instanceId);
    (0, _jqmin2.default)(window).off("keydown.ax5menu-" + this.instanceId);
    (0, _jqmin2.default)(window).off("resize.ax5menu-" + this.instanceId);
  }
};
var onStateChanged = function onStateChanged(opts, that) {
  if (opts && opts.onStateChanged) {
    opts.onStateChanged.call(that, that);
  } else if (this.onStateChanged) {
    this.onStateChanged.call(that, that);
  }

  this.state = that.state;
  opts = null;
  that = null;
  return true;
};
var onLoad = function onLoad(that) {
  if (this.onLoad) {
    this.onLoad.call(that, that);
  }

  that = null;
  return true;
};
var _popup = function _popup(opt, items, depth, path) {
  var self = this,
      cfg = this.config;
  var data = opt,
      $activeMenu = void 0,
      removed = void 0;

  data.theme = opt.theme || cfg.theme;
  data.cfg = {
    icons: _jqmin2.default.extend({}, cfg.icons),
    iconWidth: opt.iconWidth || cfg.iconWidth,
    acceleratorWidth: opt.acceleratorWidth || cfg.acceleratorWidth
  };

  items.forEach(function (n) {
    if (n.html || n.divide) {
      n['@isMenu'] = false;
      if (n.html) {
        n['@html'] = n.html.call({
          item: n,
          config: cfg,
          opt: opt
        });
      }
    } else {
      n['@isMenu'] = true;
    }
  });

  data[cfg.columnKeys.items] = items;
  data['@depth'] = depth;
  data['@path'] = path || "root";
  data['@hasChild'] = function () {
    return this[cfg.columnKeys.items] && this[cfg.columnKeys.items].length > 0;
  };
  $activeMenu = (0, _jqmin2.default)(_AX6Mustache2.default.render(tmpl.menu.call(this, cfg.columnKeys), data));
  (0, _jqmin2.default)(document.body).append($activeMenu);

  // remove queue
  removed = this.queue.splice(depth);
  removed.forEach(function (n) {
    n.$target.remove();
  });

  this.queue.push({
    '$target': $activeMenu,
    'data': _jqmin2.default.extend({}, data)
  });

  $activeMenu.on('mouseover', '[data-menu-item-index]', function () {
    var depth = this.getAttribute("data-menu-item-depth"),
        index = this.getAttribute("data-menu-item-index"),
        path = this.getAttribute("data-menu-item-path"),
        $this = void 0,
        offset = void 0,
        scrollTop = void 0,
        childOpt = void 0,
        _items = void 0,
        _activeMenu = void 0;

    if (depth != null && typeof depth != "undefined") {
      _items = self.queue[depth].data[cfg.columnKeys.items][index][cfg.columnKeys.items];
      _activeMenu = self.queue[depth].$target;
      _activeMenu.find('[data-menu-item-index]').removeClass("hover");
      (0, _jqmin2.default)(this).addClass("hover");

      if (_activeMenu.attr("data-selected-menu-item-index") != index) {
        _activeMenu.attr("data-selected-menu-item-index", index);

        if (_items && _items.length > 0) {

          $this = (0, _jqmin2.default)(this);
          offset = $this.offset();
          scrollTop = cfg.position == "fixed" ? (0, _jqmin2.default)(document).scrollTop() : 0;
          childOpt = {
            '@parent': {
              left: offset.left,
              top: offset.top,
              width: $this.outerWidth(),
              height: $this.outerHeight()
            },
            left: offset.left + $this.outerWidth() - cfg.menuBodyPadding,
            top: offset.top - cfg.menuBodyPadding - 1 - scrollTop
          };

          childOpt = _jqmin2.default.extend(true, opt, childOpt);
          _popup.call(self, childOpt, _items, Number(depth) + 1, path);
        } else {
          self.queue.splice(Number(depth) + 1).forEach(function (n) {
            n.$target.remove();
          });
        }
      }
    }

    depth = null;
    index = null;
    path = null;
    $this = null;
    offset = null;
    scrollTop = null;
    childOpt = null;
    _items = null;
    _activeMenu = null;
  });

  // mouse out
  $activeMenu.on('mouseout', '[data-menu-item-index]', function () {
    var depth = this.getAttribute("data-menu-item-depth"),
        index = this.getAttribute("data-menu-item-index"),
        path = this.getAttribute("data-menu-item-path"),
        _items = void 0;

    if (path) {
      _items = self.queue[depth].data[cfg.columnKeys.items][index][cfg.columnKeys.items];
    }
    if (_items && _items.length > 0) {} else {
      (0, _jqmin2.default)(this).removeClass("hover");
    }
  });

  // is Root
  if (depth == 0) {
    if (data.direction) $activeMenu.addClass("direction-" + data.direction);
    onStateChanged.call(this, null, {
      self: this,
      items: items,
      parent: function (path) {
        if (!path) return false;
        try {
          return Function("", "return this.config.items[" + path.substring(5).replace(/\./g, '].items[') + "];").call(self);
        } catch (e) {}
      }(data['@path']),
      state: "popup"
    });
  }

  align.call(this, $activeMenu, data);
  onLoad.call(this, {
    self: this,
    items: items,
    element: $activeMenu.get(0)
  });

  data = null;
  $activeMenu = null;
  removed = null;
  opt = null;
  items = null;
  depth = null;
  path = null;

  return this;
};
var clickItem = function clickItem(opt, e) {
  var self = this,
      cfg = this.config;
  var target = void 0,
      item = void 0;

  target = _AX6Util2.default.findParentNode(e.target, function (target) {
    if (target.getAttribute("data-menu-item-index")) {
      return true;
    }
  });
  if (target) {
    if (typeof opt === "undefined") opt = {};
    item = function (path) {
      if (!path) return false;
      try {
        return Function("", "return this[" + path.substring(5).replace(/\./g, '].' + cfg.columnKeys.items + '[') + "];").call(opt.items || cfg.items);
      } catch (e) {
        console.log(_AX6Info2.default.getError("ax5menu", "501", "menuItemClick"));
      } finally {
        item = null;
      }
    }(target.getAttribute("data-menu-item-path"));

    if (!item) return this;

    if (item.check) {
      (function (items) {
        var setValue = {
          'checkbox': function checkbox(value) {
            this.checked = !value;
          },
          'radio': function radio(value) {
            var name = this.name;
            items.forEach(function (n) {
              if (n.check && n.check.type === 'radio' && n.check.name == name) {
                n.check.checked = false;
              }
            });
            this.checked = !value;
          }
        };
        if (setValue[this.type]) setValue[this.type].call(this, this.checked);
        setValue = null;
      }).call(item.check, cfg.items);

      if (!cfg.itemClickAndClose) {
        self.queue.forEach(function (n) {
          n.$target.find('[data-menu-item-index]').each(function () {
            var item = n.data[cfg.columnKeys.items][this.getAttribute("data-menu-item-index")];
            if (item.check) {
              (0, _jqmin2.default)(this).find(".item-checkbox-wrap").attr("data-item-checked", item.check.checked);
            }
            item = null;
          });
        });
      }
    }

    if (self.onClick) {
      if (self.onClick.call(item, item, opt.param)) {
        self.close();
      }
    }
    if ((!item[cfg.columnKeys.items] || item[cfg.columnKeys.items].length == 0) && cfg.itemClickAndClose) self.close();
  } else {
    self.close();
  }

  target = null;
  item = null;
  return this;
};
var align = function align($activeMenu, data) {
  var self = this,
      cfg = this.config;
  var $window = (0, _jqmin2.default)(window),
      $document = (0, _jqmin2.default)(document),
      wh = cfg.position == "fixed" ? $window.height() : $document.height(),
      ww = $window.width(),
      h = $activeMenu.outerHeight(),
      w = $activeMenu.outerWidth(),
      l = data.left,
      t = data.top,
      position = cfg.position || "fixed";

  if (l + w > ww) {
    if (data['@parent']) {
      l = data['@parent'].left - w + cfg.menuBodyPadding;
    } else {
      l = ww - w;
    }
  }

  if (t + h > wh) {
    t = wh - h;
  }

  $activeMenu.css({ left: l, top: t, position: position });

  $activeMenu = null;
  data = null;
  $window = null;
  $document = null;
  wh = null;
  ww = null;
  h = null;
  w = null;
  l = null;
  t = null;
  position = null;
  return this;
};
/** ~~~~~~~~~~~~~~~~~~ end of private  ~~~~~~~~~~~~~~~~~~~~ **/

/**
 * @class
 */

var AX6UIMenu = function (_AX6UICore) {
  _inherits(AX6UIMenu, _AX6UICore);

  /**
   * @constructor
   * @param config
   */
  function AX6UIMenu(config) {
    _classCallCheck(this, AX6UIMenu);

    /**
     * @member {JSON}
     * @param config
     * @param [config.theme]
     * @param [config.iconWidth=22]
     * @param [config.acceleratorWidth=100]
     * @param [config.menuBodyPadding=5]
     * @param [config.offset]
     * @param [config.offset.left=0]
     * @param [config.offset.top=0]
     * @param [config.position="fixed"]
     * @param [config.animateTime=250]
     * @param [config.items]
     * @param [config.itemClickAndClose=true]
     * @param [config.columnKeys]
     * @param [config.columnKeys.label='label']
     * @param [config.columnKeys.items='items']
     * @param [config.onStateChanged]
     * @param [config.onClick]
     * @param [config.onLoad]
     *
     */
    var _this = _possibleConstructorReturn(this, (AX6UIMenu.__proto__ || Object.getPrototypeOf(AX6UIMenu)).call(this));

    _this.config = {
      theme: "default",
      iconWidth: 22,
      acceleratorWidth: 100,
      menuBodyPadding: 5,
      offset: { left: 0, top: 0 },
      position: "fixed",
      animateTime: 250,
      items: [],
      itemClickAndClose: true,
      columnKeys: {
        label: 'label',
        items: 'items'
      }
    };
    _jqmin2.default.extend(true, _this.config, config);

    // 멤버 변수 초기화
    /**
     * @member
     */
    _this.openTimer = null;
    /**
     * @member
     */
    _this.closeTimer = null;
    /**
     * @member {Array}
     */
    _this.queue = [];
    /**
     * @member {Object}
     */
    _this.menuBar = {};
    /**
     * @member
     */
    _this.state = undefined;

    if (typeof config !== "undefined") _this.init();
    return _this;
  }

  /**
   * @method
   */


  _createClass(AX6UIMenu, [{
    key: "init",
    value: function init() {
      this.onStateChanged = this.config.onStateChanged;
      delete this.config.onStateChanged;
      this.onClick = this.config.onClick;
      delete this.config.onClick;
      this.onLoad = this.config.onLoad;
      delete this.config.onLoad;

      onStateChanged.call(this, null, {
        self: this,
        state: "init"
      });
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
    }

    /**
     * @method
     * @param {Event|Object} e - Event or Object
     * @param {Object} [opt]
     * @param {String} [opt.theme]
     * @param {Function} [opt.filter]
     * @returns {AX6UIMenu}
     */

  }, {
    key: "popup",
    value: function popup(e, opt) {
      var self = this,
          cfg = this.config;
      var getOption = {
        'event': function event(e, opt) {
          e = {
            left: e.clientX,
            top: cfg.position == "fixed" ? e.clientY : e.pageY,
            width: cfg.width,
            theme: cfg.theme
          };

          e.left -= 5;
          e.top -= 5;

          if (cfg.offset) {
            if (cfg.offset.left) e.left += cfg.offset.left;
            if (cfg.offset.top) e.top += cfg.offset.top;
          }
          opt = _jqmin2.default.extend(true, e, opt);

          try {
            return opt;
          } finally {
            e = null;
            //opt = null;
          }
        },
        'object': function object(e, opt) {
          e = {
            left: e.left,
            top: e.top,
            width: e.width || cfg.width,
            theme: e.theme || cfg.theme
          };

          if (cfg.offset) {
            if (cfg.offset.left) e.left += cfg.offset.left;
            if (cfg.offset.top) e.top += cfg.offset.top;
          }

          opt = _jqmin2.default.extend(true, e, opt);

          try {
            return opt;
          } finally {
            e = null;
            //opt = null;
          }
        }
      },
          updateTheme = function updateTheme(theme) {
        if (theme) cfg.theme = theme;
      };

      if (!e) return this;
      opt = getOption[typeof e.clientX == "undefined" ? "object" : "event"].call(this, e, opt);
      updateTheme(opt.theme);

      var items = [].concat(cfg.items),
          _filteringItem = void 0;
      opt.items = items;

      if (opt.filter) {
        _filteringItem = function filteringItem(_items) {
          var arr = [];
          _items.forEach(function (n) {
            if (n.items && n.items.length > 0) {
              n.items = _filteringItem(n.items);
            }
            if (opt.filter.call(n)) {
              arr.push(n);
            }
          });
          return arr;
        };
        opt.items = items = _filteringItem(items);
      }

      if (items.length) {
        appEventAttach.call(this, false);
        _popup.call(this, opt, items, 0); // 0 is seq of queue

        if (this.popupEventAttachTimer) clearTimeout(this.popupEventAttachTimer);
        this.popupEventAttachTimer = setTimeout(function () {
          appEventAttach.call(this, true, opt); // 이벤트 연결
        }.bind(this), 500);
      }

      e = null;
      return this;
    }

    /**
     * @method
     * @param {Element|jQueryObject} el
     * @returns {AX6UIMenu}
     */

  }, {
    key: "attach",
    value: function attach(el, opt) {
      var self = this,
          cfg = this.config;
      var getOption = {
        'object': function object(e, opt) {
          e = {
            left: e.left,
            top: e.top,
            width: e.width || cfg.width,
            theme: e.theme || cfg.theme,
            direction: e.direction || cfg.direction
          };
          opt = _jqmin2.default.extend(true, opt, e);

          try {
            return opt;
          } finally {
            e = null;
            opt = null;
          }
        }
      };

      var popUpChildMenu = function popUpChildMenu(target, opt, eType) {
        var $target = (0, _jqmin2.default)(target),
            offset = $target.offset(),
            height = $target.outerHeight(),
            index = Number(target.getAttribute("data-menu-item-index")),
            scrollTop = cfg.position == "fixed" ? (0, _jqmin2.default)(document).scrollTop() : 0;

        if (cfg.items && cfg.items[index][cfg.columnKeys.items] && cfg.items[index][cfg.columnKeys.items].length) {

          if (self.menuBar.openedIndex == index) {
            if (eType == "click") self.close();
            return false;
          }

          self.menuBar.target.find('[data-menu-item-index]').removeClass("hover");
          self.menuBar.opened = true;
          self.menuBar.openedIndex = index;

          $target.attr("data-menu-item-opened", "true");
          $target.addClass("hover");

          if (cfg.offset) {
            if (cfg.offset.left) offset.left += cfg.offset.left;
            if (cfg.offset.top) offset.top += cfg.offset.top;
          }

          opt = getOption["object"].call(this, { left: offset.left, top: offset.top + height - scrollTop }, opt);

          _popup.call(self, opt, cfg.items[index][cfg.columnKeys.items], 0, 'root.' + target.getAttribute("data-menu-item-index")); // 0 is seq of queue
          appEventAttach.call(self, true, {}); // 이벤트 연결
        }

        target = null;
        opt = null;
        $target = null;
        offset = null;
        height = null;
        index = null;
        scrollTop = null;
      };
      var clickParentMenu = function clickParentMenu(target, opt, eType) {
        var $target = (0, _jqmin2.default)(target),
            offset = $target.offset(),
            height = $target.outerHeight(),
            index = Number(target.getAttribute("data-menu-item-index")),
            scrollTop = cfg.position == "fixed" ? (0, _jqmin2.default)(document).scrollTop() : 0;
        if (cfg.items && (!cfg.items[index][cfg.columnKeys.items] || cfg.items[index][cfg.columnKeys.items].length == 0)) {
          if (self.onClick) {
            self.onClick.call(cfg.items[index], cfg.items[index]);
          }
        }
      };

      var data = {},
          items = cfg.items,
          $activeMenu = void 0;

      if (typeof opt === "undefined") opt = {};

      data.theme = opt.theme || cfg.theme;
      data.cfg = {
        icons: _jqmin2.default.extend({}, cfg.icons),
        iconWidth: opt.iconWidth || cfg.iconWidth,
        acceleratorWidth: opt.acceleratorWidth || cfg.acceleratorWidth
      };

      items.forEach(function (n) {
        if (n.html || n.divide) {
          n['@isMenu'] = false;
          if (n.html) {
            n['@html'] = n.html.call({
              item: n,
              config: cfg,
              opt: opt
            });
          }
        } else {
          n['@isMenu'] = true;
        }
      });

      data[cfg.columnKeys.items] = items;

      $activeMenu = (0, _jqmin2.default)(_AX6Mustache2.default.render(tmpl.menubar.call(this, cfg.columnKeys), data));

      self.menuBar = {
        target: (0, _jqmin2.default)(el),
        opened: false
      };
      self.menuBar.target.html($activeMenu);

      // click, mouseover
      self.menuBar.target.on("click", function (e) {
        if (!e) return this;
        var target = _AX6Util2.default.findParentNode(e.target, function (target) {
          if (target.getAttribute("data-menu-item-index")) {
            return true;
          }
        });
        if (target) {
          clickParentMenu(target, opt, "click");
          popUpChildMenu(target, opt, "click");
        }

        target = null;
      });
      self.menuBar.target.on("mouseover", function (e) {
        if (!self.menuBar.opened) return false;
        var target = _AX6Util2.default.findParentNode(e.target, function (target) {
          if (target.getAttribute("data-menu-item-index")) {
            return true;
          }
        });
        if (target) popUpChildMenu(target, opt, "mouseover");

        target = null;
      });

      el = null;
      opt = null;
      data = null;
      items = null;
      $activeMenu = null;

      return this;
    }

    /**
     * @method
     * @returns {AX6UIMenu}
     */

  }, {
    key: "close",
    value: function close() {
      var self = this,
          cfg = this.config;
      if (self.menuBar && self.menuBar.target) {
        self.menuBar.target.find('[data-menu-item-index]').removeClass("hover");
        self.menuBar.opened = false;
        self.menuBar.openedIndex = null;
      }

      appEventAttach.call(this, false); // 이벤트 제거

      this.queue.forEach(function (n) {
        n.$target.remove();
      });
      this.queue = [];

      onStateChanged.call(this, null, {
        self: this,
        state: "close"
      });

      return this;
    }
  }, {
    key: "getCheckValue",


    /**
     * @method
     * @returns {Object} statusCheckItem
     */
    value: function getCheckValue() {

      var checkItems = {};
      var collectItem = function collectItem(items) {
        var i = items.length;
        while (i--) {
          if (items[i].check && items[i].check.checked) {
            if (!checkItems[items[i].check.name]) checkItems[items[i].check.name] = items[i].check.value;else {
              if (_AX6Util2.default.isString(checkItems[items[i].check.name])) checkItems[items[i].check.name] = [checkItems[items[i].check.name]];
              checkItems[items[i].check.name].push(items[i].check.value);
            }
          }
          if (items[i].items && items[i].items.length > 0) collectItem(items[i].items);
        }
      };

      collectItem(this.config.items);

      try {
        return checkItems;
      } finally {
        checkItems = null;
      }
    }
  }]);

  return AX6UIMenu;
}(_AX6UICore3.default);

exports.default = AX6UIMenu;