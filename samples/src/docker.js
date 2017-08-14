import $ from "jqmin";
import axios from "axios";
import Docker from "../../src/AX6UIDocker";
import "../../src/AX6UIDocker/style.scss";

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
      target: document.getElementById("docker1")
    });

    docker.repaint();
  },
  moduleDestroy: function ($body) {
    $body.off("click");
  }
};

export default {
  html: `
<h1>공사중.</h1>
<div id="docker1" style="height: 500px;background: #eee;padding: 5px;"></div>

<div style="padding: 20px 0;">
    
</div>
`,
  fn: fn
}