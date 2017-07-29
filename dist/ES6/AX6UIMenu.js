import jQuery from "jqmin";
import AX6UICore from "./AX6UICore.js";
import info from "./AX6Info";
import U from "./AX6Util";
import mustache from "./AX6Mustache";
import "./AX6UIMenu/index.scss";

let tmpl = {
  menu(columnKeys) {
    return `
        <div data-ax6ui-menu="" class="{{theme}}" {{#width}}style="width:{{width}}px;"{{/width}}>
            <div class="ax-menu-body">
                {{#${columnKeys.items}}}
                    {{^@isMenu}}
                        {{#divide}}
                        <div class="ax-menu-item-divide" data-menu-item-index="{{@i}}"></div>
                        {{/divide}}
                        {{#html}}
                        <div class="ax-menu-item-html" data-menu-item-index="{{@i}}">{{{@html}}}</div>
                        {{/html}}
                    {{/@isMenu}}
                    {{#@isMenu}}
                    <div class="ax-menu-item" data-menu-item-depth="{{@depth}}" data-menu-item-index="{{@i}}" data-menu-item-path="{{@path}}.{{@i}}">
                        <span class="ax-menu-item-cell ax-menu-item-checkbox">
                            {{#check}}
                            <span class="item-checkbox-wrap useCheckBox" {{#checked}}data-item-checked="true"{{/checked}}></span>
                            {{/check}}
                            {{^check}}
                            <span class="item-checkbox-wrap"></span>
                            {{/check}}
                        </span>
                        {{#icon}}
                        <span class="ax-menu-item-cell ax-menu-item-icon" style="width:{{cfg.iconWidth}}px;">{{{.}}}</span>
                        {{/icon}}
                        <span class="ax-menu-item-cell ax-menu-item-label">{{{${columnKeys.label}}}}</span>
                        {{#accelerator}}
                        <span class="ax-menu-item-cell ax-menu-item-accelerator" style="width:{{cfg.acceleratorWidth}}px;"><span class="item-wrap">{{.}}</span></span>
                        {{/accelerator}}
                        {{#@hasChild}}
                        <span class="ax-menu-item-cell ax-menu-item-handle">{{{cfg.icons.arrow}}}</span>
                        {{/@hasChild}}
                    </div>
                    {{/@isMenu}}

                {{/${columnKeys.items}}}
            </div>
            <div class="ax-menu-arrow"></div>
        </div>
        `;
  },
  menubar(columnKeys) {
    return `
        <div data-ax6ui-menubar="" class="{{theme}}">
            <div class="ax-menu-body">
                {{#${columnKeys.items}}}
                    {{^@isMenu}}
                        {{#divide}}
                        <div class="ax-menu-item-divide" data-menu-item-index="{{@i}}"></div>
                        {{/divide}}
                        {{#html}}
                        <div class="ax-menu-item-html" data-menu-item-index="{{@i}}">{{{@html}}}</div>
                        {{/html}}
                    {{/@isMenu}}
                    {{#@isMenu}}
                    <div class="ax-menu-item" data-menu-item-index="{{@i}}">
                        {{#icon}}
                        <span class="ax-menu-item-cell ax-menu-item-icon" style="width:{{cfg.iconWidth}}px;">{{{.}}}</span>
                        {{/icon}}
                        <span class="ax-menu-item-cell ax-menu-item-label">{{{${columnKeys.label}}}}</span>
                    </div>
                    {{/@isMenu}}
                {{/${columnKeys.items}}}
            </div>
        </div>
        `;
  }
};

const appEventAttach = function (active, opt) {
  if (active) {
    jQuery(document.body).off("click.ax5menu-" + this.instanceId).on("click.ax5menu-" + this.instanceId, clickItem.bind(this, opt));

    jQuery(window).off("keydown.ax5menu-" + this.instanceId).on("keydown.ax5menu-" + this.instanceId, function (e) {
      if (e.which == info.eventKeys.ESC) {
        self.close();
      }
    }).off("resize.ax5menu-" + this.instanceId).on("resize.ax5menu-" + this.instanceId, function (e) {
      self.close();
    });
  } else {
    jQuery(document.body).off("click.ax5menu-" + this.instanceId);
    jQuery(window).off("keydown.ax5menu-" + this.instanceId);
    jQuery(window).off("resize.ax5menu-" + this.instanceId);
  }
};
const onStateChanged = function (opts, that) {
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
const onLoad = function (that) {
  if (this.onLoad) {
    this.onLoad.call(that, that);
  }

  that = null;
  return true;
};
const popup = function (opt, items, depth, path) {
  let self = this,
      cfg = this.config;
  let data = opt,
      $activeMenu,
      removed;

  data.theme = opt.theme || cfg.theme;
  data.cfg = {
    icons: jQuery.extend({}, cfg.icons),
    iconWidth: opt.iconWidth || cfg.iconWidth,
    acceleratorWidth: opt.acceleratorWidth || cfg.acceleratorWidth
  };

  items.forEach(n => {
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
  $activeMenu = jQuery(mustache.render(tmpl.menu.call(this, cfg.columnKeys), data));
  jQuery(document.body).append($activeMenu);

  // remove queue
  removed = this.queue.splice(depth);
  removed.forEach(n => {
    n.$target.remove();
  });

  this.queue.push({
    '$target': $activeMenu,
    'data': jQuery.extend({}, data)
  });

  $activeMenu.on('mouseover', '[data-menu-item-index]', function () {
    let depth = this.getAttribute("data-menu-item-depth"),
        index = this.getAttribute("data-menu-item-index"),
        path = this.getAttribute("data-menu-item-path"),
        $this,
        offset,
        scrollTop,
        childOpt,
        _items,
        _activeMenu;

    if (depth != null && typeof depth != "undefined") {
      _items = self.queue[depth].data[cfg.columnKeys.items][index][cfg.columnKeys.items];
      _activeMenu = self.queue[depth].$target;
      _activeMenu.find('[data-menu-item-index]').removeClass("hover");
      jQuery(this).addClass("hover");

      if (_activeMenu.attr("data-selected-menu-item-index") != index) {
        _activeMenu.attr("data-selected-menu-item-index", index);

        if (_items && _items.length > 0) {

          $this = jQuery(this);
          offset = $this.offset();
          scrollTop = cfg.position == "fixed" ? jQuery(document).scrollTop() : 0;
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

          childOpt = jQuery.extend(true, opt, childOpt);
          popup.call(self, childOpt, _items, Number(depth) + 1, path);
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
    let depth = this.getAttribute("data-menu-item-depth"),
        index = this.getAttribute("data-menu-item-index"),
        path = this.getAttribute("data-menu-item-path"),
        _items;

    if (path) {
      _items = self.queue[depth].data[cfg.columnKeys.items][index][cfg.columnKeys.items];
    }
    if (_items && _items.length > 0) {} else {
      jQuery(this).removeClass("hover");
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
const clickItem = function (opt, e) {
  let self = this,
      cfg = this.config;
  let target, item;

  target = U.findParentNode(e.target, function (target) {
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
        console.log(info.getError("ax5menu", "501", "menuItemClick"));
      } finally {
        item = null;
      }
    }(target.getAttribute("data-menu-item-path"));

    if (!item) return this;

    if (item.check) {
      (function (items) {
        let setValue = {
          'checkbox': function (value) {
            this.checked = !value;
          },
          'radio': function (value) {
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
        self.queue.forEach(n => {
          n.$target.find('[data-menu-item-index]').each(function () {
            let item = n.data[cfg.columnKeys.items][this.getAttribute("data-menu-item-index")];
            if (item.check) {
              jQuery(this).find(".item-checkbox-wrap").attr("data-item-checked", item.check.checked);
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
const align = function ($activeMenu, data) {
  let self = this,
      cfg = this.config;
  let $window = jQuery(window),
      $document = jQuery(document),
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

/**
 * @class
 */
class AX6UIMenu extends AX6UICore {
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
    this.config = {
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
    jQuery.extend(true, this.config, config);

    // 멤버 변수 초기화
    /**
     * @member
     */
    this.openTimer = null;
    /**
     * @member
     */
    this.closeTimer = null;
    /**
     * @member {Array}
     */
    this.queue = [];
    /**
     * @member {Object}
     */
    this.menuBar = {};
    /**
     * @member
     */
    this.state = undefined;

    if (typeof config !== "undefined") this.init();
  }

  /**
   * @method
   */
  init() {
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
  initOnce() {
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
  popup(e, opt) {
    let self = this,
        cfg = this.config;
    const getOption = {
      'event': function (e, opt) {
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
        opt = jQuery.extend(true, e, opt);

        try {
          return opt;
        } finally {
          e = null;
          //opt = null;
        }
      },
      'object': function (e, opt) {
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

        opt = jQuery.extend(true, e, opt);

        try {
          return opt;
        } finally {
          e = null;
          //opt = null;
        }
      }
    },
          updateTheme = function (theme) {
      if (theme) cfg.theme = theme;
    };

    if (!e) return this;
    opt = getOption[typeof e.clientX == "undefined" ? "object" : "event"].call(this, e, opt);
    updateTheme(opt.theme);

    let items = [].concat(cfg.items),
        filteringItem;
    opt.items = items;

    if (opt.filter) {
      filteringItem = function (_items) {
        let arr = [];
        _items.forEach(n => {
          if (n.items && n.items.length > 0) {
            n.items = filteringItem(n.items);
          }
          if (opt.filter.call(n)) {
            arr.push(n);
          }
        });
        return arr;
      };
      opt.items = items = filteringItem(items);
    }

    if (items.length) {
      appEventAttach.call(this, false);
      popup.call(this, opt, items, 0); // 0 is seq of queue

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
  attach(el, opt) {
    let self = this,
        cfg = this.config;
    const getOption = {
      'object': function (e, opt) {
        e = {
          left: e.left,
          top: e.top,
          width: e.width || cfg.width,
          theme: e.theme || cfg.theme,
          direction: e.direction || cfg.direction
        };
        opt = jQuery.extend(true, opt, e);

        try {
          return opt;
        } finally {
          e = null;
          opt = null;
        }
      }
    };

    const popUpChildMenu = function (target, opt, eType) {
      let $target = jQuery(target),
          offset = $target.offset(),
          height = $target.outerHeight(),
          index = Number(target.getAttribute("data-menu-item-index")),
          scrollTop = cfg.position == "fixed" ? jQuery(document).scrollTop() : 0;

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

        popup.call(self, opt, cfg.items[index][cfg.columnKeys.items], 0, 'root.' + target.getAttribute("data-menu-item-index")); // 0 is seq of queue
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
    const clickParentMenu = function (target, opt, eType) {
      let $target = jQuery(target),
          offset = $target.offset(),
          height = $target.outerHeight(),
          index = Number(target.getAttribute("data-menu-item-index")),
          scrollTop = cfg.position == "fixed" ? jQuery(document).scrollTop() : 0;
      if (cfg.items && (!cfg.items[index][cfg.columnKeys.items] || cfg.items[index][cfg.columnKeys.items].length == 0)) {
        if (self.onClick) {
          self.onClick.call(cfg.items[index], cfg.items[index]);
        }
      }
    };

    let data = {},
        items = cfg.items,
        $activeMenu;

    if (typeof opt === "undefined") opt = {};

    data.theme = opt.theme || cfg.theme;
    data.cfg = {
      icons: jQuery.extend({}, cfg.icons),
      iconWidth: opt.iconWidth || cfg.iconWidth,
      acceleratorWidth: opt.acceleratorWidth || cfg.acceleratorWidth
    };

    items.forEach(n => {
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

    $activeMenu = jQuery(mustache.render(tmpl.menubar.call(this, cfg.columnKeys), data));

    self.menuBar = {
      target: jQuery(el),
      opened: false
    };
    self.menuBar.target.html($activeMenu);

    // click, mouseover
    self.menuBar.target.on("click", function (e) {
      if (!e) return this;
      let target = U.findParentNode(e.target, function (target) {
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
      let target = U.findParentNode(e.target, function (target) {
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
  close() {
    let self = this,
        cfg = this.config;
    if (self.menuBar && self.menuBar.target) {
      self.menuBar.target.find('[data-menu-item-index]').removeClass("hover");
      self.menuBar.opened = false;
      self.menuBar.openedIndex = null;
    }

    appEventAttach.call(this, false); // 이벤트 제거

    this.queue.forEach(n => {
      n.$target.remove();
    });
    this.queue = [];

    onStateChanged.call(this, null, {
      self: this,
      state: "close"
    });

    return this;
  }

  /**
   * @method
   * @returns {Object} statusCheckItem
   */
  getCheckValue() {

    let checkItems = {};
    const collectItem = function (items) {
      let i = items.length;
      while (i--) {
        if (items[i].check && items[i].check.checked) {
          if (!checkItems[items[i].check.name]) checkItems[items[i].check.name] = items[i].check.value;else {
            if (U.isString(checkItems[items[i].check.name])) checkItems[items[i].check.name] = [checkItems[items[i].check.name]];
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
}

export default AX6UIMenu;