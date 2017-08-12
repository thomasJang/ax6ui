import $ from "jqmin";
import U from "../../src/AX6Util";
import Menu from "../../src/AX6UIMenu";
import "../../src/AX6UIMenu/style.scss";

let html = `
<div id="attachedMenu-target"
     style="width:100%;height:36px;background: #cccccc;border-bottom:1px solid #000;padding: 0px 20px;"></div>

<div style="background: #eee;height: 1000px;"></div>
`;
let fn = {
  moduleRun: function ($body) {

    let menu = new Menu({
      // width: 200,
      iconWidth: 20,
      acceleratorWidth: 100,
      // offset: {left: 10, top: 10},
      itemClickAndClose: false,
      //position: "absolute",
      icons: {
        'arrow': '<i class="tiny material-icons">chevron_right</i>'
      },
      columnKeys: {
        label: 'name',
        items: 'chidren'
      },
      items: [
        {
          icon: '<i class="tiny material-icons">class</i>',
          name: "Menu Parent 0",
          chidren: [
            {
              check: {
                type: 'checkbox',
                name: 'A',
                value: '0',
                checked: false
              },
              name: "Menu Z",
              data: {},
              role: "",
              accelerator: "CmdOrCtrl+Z"
            },
            {
              check: {
                type: 'checkbox',
                name: 'A',
                value: '1',
                checked: true
              },
              name: "Menu A",
              data: {},
              role: ""
              //accelerator: "CmdOrCtrl+A"
            }
          ],
          filterType: "A"
        },
        {
          divide: true,
          filterType: "A"
        },
        {
          icon: '<i class="tiny material-icons">class</i>',
          name: "Menu Parent 1",
          chidren: [
            {
              name: "Menu Z",
              data: {},
              role: "",
              //accelerator: "CmdOrCtrl+Z",
              chidren: [
                {
                  name: "Menu Z",
                  data: {},
                  role: ""
                  //accelerator: "CmdOrCtrl+Z"
                },
                {
                  name: "Menu A",
                  data: {},
                  role: ""
                  //accelerator: "CmdOrCtrl+A"
                }
              ]
            },
            {
              name: "Menu A",
              data: {},
              role: ""
              //accelerator: "CmdOrCtrl+A"
            }
          ],
          filterType: "A"
        },
        {
          check: {
            type: 'radio',
            name: 'radioName',
            value: '1',
            checked: false
          },
          icon: '<i class="tiny material-icons">class</i>',
          name: "Menu Parent 2"
        },
        {
          check: {
            type: 'radio',
            name: 'radioName',
            value: '2',
            checked: false
          },
          name: "Menu Parent 3"
        },
        {
          check: {
            type: 'radio',
            name: 'radioName',
            value: '3',
            checked: false
          },
          name: "Menu Parent 4"
        },
        {divide: true},
        {
          html: function () {
            // console.log(this);
            return '<div style="text-align: center;">' +
              '<button class="btn btn-primary" data-menu-btn="OK">OK</button> ' +
              '<button class="btn btn-danger" data-menu-btn="CANCEL">CANCEL</button>' +
              '</div>';
          }
        }
      ]
    });

    menu.onStateChanged = function () {
      if (this.state == 'close') {
        //console.log(this.self.getCheckValue());
      }
    };
    menu.onClick = function () {
      // console.log(this);
    };

    menu.onLoad = function () {
      if (!this.element) return this;
      $(this.element).on("click", '[data-menu-btn]', function () {
        var act = this.getAttribute("data-menu-btn");
        if (act == 'OK') {
          console.log(menu.getCheckValue());
        }
        menu.close();
      });
    };

    $(document.body).on("contextmenu", function (e) {
      menu.popup(e, {
        filter: function () {
          return true;
        }
      });

      U.stopEvent(e.originalEvent);
    });


    let attachedMenu = new Menu({
      direction: "top",
      offset: {left: 0, top: 1},
      position: "absolute",
      icons: {
        'arrow': '<i class="tiny material-icons">chevron_right</i>'
      },
      onStateChanged: function () {
        console.log(this);
      },
      onClick: function () {
        console.log(this);
      },
      columnKeys: {
        label: 'name',
        items: 'chidren'
      },
      items: [
        {
          icon: '<i class="tiny material-icons">class</i>',
          name: "Menu Parent 0",
          chidren: []
        },
        {
          icon: '<i class="tiny material-icons">cloud_queue</i>',
          name: "Menu Parent 1",
          chidren: [
            {
              name: "Menu Z",
              data: {},
              role: "",
              //accelerator: "CmdOrCtrl+Z",
              chidren: [
                {
                  name: "Menu Z",
                  data: {},
                  role: ""
                  //accelerator: "CmdOrCtrl+Z"
                },
                {
                  name: "Menu A",
                  data: {},
                  role: ""
                  //accelerator: "CmdOrCtrl+A"
                }
              ]
            },
            {
              name: "Menu A",
              data: {},
              role: ""
              //accelerator: "CmdOrCtrl+A"
            }
          ]
        }
      ]
    }).attach($('#attachedMenu-target'));

  },
  moduleDestroy: function ($body) {
    $body.off("click");
  }
};

export default {
  html: html,
  fn: fn
}
