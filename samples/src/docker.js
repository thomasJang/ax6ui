import $ from "jqmin";
import axios from "axios";
import Docker from "../../src/AX6UIDocker";
import "../../src/AX6UIDocker/style.scss";

const $body = $("#sample-body");
let el = `
<div data-ax5docker="docker1" style="height: 500px;background: #eee;padding: 5px;"></div>

<div style="padding: 20px 0;">
    <form class="form-inline" onsubmit="return false;">
        <input type="text" name="addPath" class="form-control" value="0.0" placeholder="0.0"/>
        <select name="addType" class="form-control">
            <option value="stack">stack</option>
            <option value="row-left">row-left</option>
            <option value="row-right" selected="selected">row-right</option>
            <option value="column-top">column-top</option>
            <option value="column-bottom">column-bottom</option>
        </select>
        <button class="btn btn-default" data-docker-control="add-panel">add Panel</button>
        <button class="btn btn-default" data-docker-control="set-panels">set Panels</button>
        <button class="btn btn-default" data-docker-control="find-panel">find panel</button>
        <button class="btn btn-default" data-docker-control="remove-panel">remove panel</button>

        <button class="btn btn-default" data-docker-control="active-panel">active panel</button>
    </form>
</div>
`;
$body.append(el);


/////~~~~~~~~~~~~~~~~~~
let docker = new Docker();

var _panel = {
  type: "row", // type : row, column, stack
  panels: [
    {
      type: "column",
      panels: [
        {
          type: "panel",
          name: "my name 1",
          color: "#ff3300",
          borderColor: "#000000",
          moduleName: "content",
          moduleState: {
            data1: "data1"
          }
        },
        {
          type: "panel",
          name: "my name 2",
          moduleName: "content",
          moduleState: {
            data1: "data2"
          },
          key: "T"
        }
      ]
    },
    {
      type: "stack",
      panels: [
        {
          type: "panel",
          name: "my name 3",
          moduleName: "content",
          moduleState: {
            data1: "data3"
          },
          key: "A"
        }
      ]
    }
  ]
};

var __panel = {
  type: "stack",
  panels: [
    /*
    {
        type: "panel",
        name: "my name 1 ~~ long name i'm long",
        moduleName: "content",
        moduleState: {
            data1: "data1"
        }
    },
    {
        type: "panel",
        name: "my name 1 ~~ long name i'm long",
        moduleName: "content",
        moduleState: {
            data1: "data1"
        }
    },
    {
        type: "panel",
        name: "my name 2",
        moduleName: "content",
        moduleState: {
            data1: "data2"
        }
    },
    {
        type: "panel",
        name: "my name 3",
        moduleName: "content",
        moduleState: {
            data1: "data3"
        }
    },
    {
        type: "panel",
        name: "my name 3",
        moduleName: "content",
        moduleState: {
            data1: "data3"
        }
    },
    {
        type: "panel",
        name: "my name 3",
        moduleName: "content",
        moduleState: {
            data1: "data3"
        }
    },
    {
        type: "panel",
        name: "my name 3",
        moduleName: "content",
        moduleState: {
            data1: "data3"
        }
    },
    */
    {
      type: "panel",
      name: "my name 3",
      key: "A",
      moduleName: "content",
      moduleState: {
        data1: "data3"
      }
    },
    {
      type: "panel",
      name: "my name 4",
      key: "A",
      moduleName: "content",
      moduleState: {
        data1: "data3"
      }
    },
  ]
};


docker.setConfig({
  target: $('[data-ax5docker="docker1"]'),
  icons: {
    close: '<i class="fa fa-times" aria-hidden="true"></i>',
    more: '<i class="fa fa-chevron-circle-down" aria-hidden="true"></i>'
  },
  panels: [
    __panel
  ],
  disableClosePanel: false,
  disableDragPanel: false,
  control: {
    before: function (that, callback) {
      if (that.controlType === "destroy") {
        if (confirm("정말 삭제 할까요?")) {
          setTimeout(function () {
            callback(true);
          }, 300);

          return;
        }else{
          callback(false);
        }
      } else {
        callback(true);
        return;
      }
    }
  },
  menu: {
    theme: 'default',
    position: "absolute",
    icons: {
      'arrow': '▸'
    }
  }
});

docker.onResize = function (e) {
  console.log(e);
};

docker.addModule({
  "content": {
    init: function (container, state) {
      container["$element"].html(JSON.stringify(state));
      // console.log(state, "init");
    },
    active: function (container, state) {
      // console.log(state, "active");
    },
    deactive: function (container, state) {
      // console.log(state, "deactive");
    },
    destroy: function (container, state) {
      // console.log(state, "destroy");
    }
  }
});

docker.repaint();