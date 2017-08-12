import $ from "jqmin";
import axios from "axios";
import Docker from "../../src/AX6UIDocker";
import "../../src/AX6UIDocker/style.scss";


let html = `
<div data-ax6ui-docker="docker1" style="height: 500px;background: #eee;padding: 5px;"></div>

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
let fn = {
  moduleRun: function ($body) {
    let rowPanel = {
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
    let statckPanel = {
      type: "stack",
      panels: [
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

    let docker = new Docker({
      target: $('[data-ax6ui-docker="docker1"]')
    });

    docker.repaint();
  },
  moduleDestroy: function ($body) {
    $body.off("click");
  }
};

export default {
  html: html,
  fn: fn
}