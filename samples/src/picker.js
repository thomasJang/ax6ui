import $ from "jqmin";
import util from "../../src/AX6Util";
import Picker from "../../src/AX6UIPicker";
import "./custom-materialize.scss";

const $body = $("#sample-body");
let el = `
<div class="row">
    <div class="input-field col s12">
        <input type="text" id="picker-date" value="" placeholder="" onchange="console.log('picker-date = ' + this.value)"/>
        <label for="picker-date">yyyy/mm/dd</label>
    </div>
</div>

<div class="row" data-picker="date-se">
    <div class="input-field col s6">
        <input type="text" id="picker-date-s" value="" placeholder=""/>
        <label for="picker-date-s">시작일</label>
    </div>
    <div class="input-field col s6">
        <input type="text" id="picker-date-e" value="" placeholder=""/>
        <label for="picker-date-e">종료일</label>
    </div>
</div>

<div class="row">
    <div class="input-field col s12">
        <input type="text" id="secure-num" placeholder=""  maxlength="4" readonly="readonly" />
        <label for="secure-num">Secure Number</label>
    </div>
</div>

<div class="row">
    <div class="input-field col s12">
        <input type="text" id="keyboard-0" placeholder="" />
        <label for="keyboard-0">Keyboard</label>
    </div>
</div>

<div class="row">
    <div class="input-field col s12">
        <input type="text" id="numpad-0" placeholder="" />
        <label for="numpad-0">Numpad</label>
    </div>
</div>

<div class="row">
    <div class="input-field col s12">
        <input type="text" id="custom-0" placeholder="" />
        <label for="custom-0">Custom</label>
    </div>
</div>

<div class="row">
    <div class="input-field col s12">
        <input type="text" id="color-0" placeholder="" />
        <label for="color-0">Color</label>
    </div>
</div>
`;
$body.append(el);


/////~~~~~~~~~~~~~~~~~~
let today = new Date();
let picker = new Picker();

// 단일 날짜 바인드
picker.bind({
    zIndex: 4000,
    target: $('#picker-date'),
    direction: "auto",
    content: {
        type: 'date',
        config: {
            mode: "year",
            selectMode: "month"
        },
        formatter: {
            pattern: 'date(month)'
        }
    },
    onStateChanged: function () {
        // console.log(this.values);
    }
});

// 기간 바인드
picker.bind({
    zIndex: 4000,
    target: $('[data-picker="date-se"]'),
    content: {
        width: 270,
        margin: 10,
        type: 'date',
        config: {
            control: {
                left: '<i class="material-icons">keyboard_arrow_left</i>',
                yearTmpl: '%s',
                monthTmpl: '%s',
                right: '<i class="material-icons">keyboard_arrow_right</i>',
            },
            lang: {
                yearTmpl: "%s년",
                months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
                dayTmpl: "%s"
            }
        },
        formatter: {
            pattern: 'date'
        }
    },
    btns: {
        today: {
            label: "오늘", theme: "waves-effect waves-light btn blue-grey", onClick: function () {
                if (this.item.inputLength == 1) {
                    this.self.setContentValue(this.item.id, 0, util.date(new Date(), {"return": "yyyy-MM-dd"}));
                }
                else {
                    this.self.setContentValue(this.item.id, 0, util.date(new Date(), {"return": "yyyy-MM-dd"}));
                    this.self.setContentValue(this.item.id, 1, util.date(new Date(), {"return": "yyyy-MM-dd"}));
                    this.self.close();
                }
            }
        },
        thisMonth: {
            label: "이번달 1일", theme: "waves-effect waves-light btn blue-grey", onClick: function () {
                var today = new Date();
                if (this.item.inputLength == 1) {
                    this.self.setContentValue(this.item.id, 0, util.date(today, {"return": "yyyy-MM-01"}));
                }
                else {
                    this.self.setContentValue(this.item.id, 0, util.date(today, {"return": "yyyy-MM-01"}));
                    this.self.setContentValue(this.item.id, 1, util.date(today, {"return": "yyyy-MM"}) + '-' + util.daysOfMonth(today.getFullYear(), today.getMonth()));
                    this.self.close();
                }
            }
        },
        ok: {label: "확인", theme: "waves-effect waves-light btn light-blue"}
    },
    onStateChanged: function (a) {
        if(this.state == "open"){
            if(this.item && this.item.calendar){
                this.item.pickerCalendar[0].calendar.setSelection([util.date(today, {'add': {d: 0}})]);
                if(this.item.pickerCalendar[1]) this.item.pickerCalendar[1].calendar.setSelection([util.date(today, {'add': {d: 0}})]);
            }
        }
        else if (this.state == "changeValue") {
            if (this.item.content.type == "date" && this.values.length > 1) {
                if (this.inputIndex == 0) {

                }
            }
        }
    }
});

// 보안번호
picker.bind({
    target: $('#secure-num'),
    direction: "top",
    content: {
        width: 200,
        margin: 10,
        type: 'secure-num',
        config: {
            btnWrapStyle: "padding:3px;width:25%;",
            btnStyle: "width:100%",
            btnTheme: "waves-effect btn blue-grey",
            specialBtnTheme: "waves-effect btn pink"
        },
        formatter: {
            pattern: 'number'
        }
    },
    btns: {
        ok: {label: "확인", theme: "waves-effect waves-light btn light-blue"}
    },
    onStateChanged: function () {
        console.log(this);
        if (this.value && this.value.length > 3) {
            picker.close();
        }
    }
});

// 키보드
picker.bind({
    target: $('#keyboard-0'),
    direction: "auto",
    content: {
        width: 550,
        margin: 10,
        type: 'keyboard',
        config: {
            btnWrapStyle: "padding:2px;",
            btnStyle: "width: 35px;",
            btnTheme: "btn",
            specialBtnWrapStyle: "padding:2px;",
            specialBtnStyle: "",
            specialBtnTheme: "btn blue-grey"
        }
    },
    onStateChanged: function () {

    }
});

// 숫자 키패드
picker.bind({
    target: $('#numpad-0'),
    direction: "auto",
    content: {
        width: 200,
        margin: 10,
        type: 'numpad',
        config: {
            btnWrapStyle: "padding:3px;width:25%;",
            btnStyle: "width:100%",
            btnTheme: "btn",
            specialBtnWrapStyle: "padding:3px;width:25%;",
            specialBtnStyle: "width:100%;padding-left:0px;padding-right:0px;",
            specialBtnTheme: "btn blue-grey"
            /*
             keyArray: [
             {value: "7"},
             {value: "8"},
             {value: "9"},
             {label: "BS", fn: "back"},
             {value: "4"},
             {value: "5"},
             {value: "6"},
             {value: "-"},
             {value: "1"},
             {value: "2"},
             {value: "3"},
             {value: ""},
             {value: "."},
             {value: "0"},
             {value: ""},
             {label: "OK", fn: "close"}
             ]
             */
        },
        formatter: {
            pattern: 'number'
        }
    },
    onStateChanged: function () {
        console.log(this);
    }
});

// 커스텀
picker.bind({
    target: $('#custom-0'),
    direction: "top",
    contentWidth: 200,
    content: function (callback) {
        var html = ''
            + '가나다라마바사'
            + '<div style="padding: 10px;">'
            + '<button class="btn btn-default">기능 1</button>'
            + '</div>'
        ;
        callback(html);
    }
});