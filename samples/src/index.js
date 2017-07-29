import $ from "jqmin";
import util from "../../src/AX6Util";
import "./custom-materialize.scss";

let $el = $('<div id="test-target"></div>');

//$el.append('<p>' + info + '</p>');

function describe(state, fn) {
  // console.log(state);
  $el.append('<h2>' + state + '</h2>');
  $el.append('<div>');
  fn();
  $el.append('</div>');
}

function it(state, fn) {
  $el.append('<span>' + state + '</span>');

  let result = fn(function () {
    $el.append('<span> : ' + util.toArray(arguments).join(",") + '</span>');
  });

  if (typeof result != "undefined") {
    $el.append('<p>' + result + '</p>');
  }

  $el.append('<br/>');
}

function equal(actual, expected) {

  if (actual.toString() == expected.toString()) {
    return "<span style='color:blue;'>ok</span>";
  } else {
    return "<span style='color:red;'>not equal (" + actual + "," + expected + ")</span>";
  }
}


describe('util.date TEST', function () {
  it('util.date("2013-01-01")', function (done) {
    var date = new Date(2013, 0, 1);
    date.setHours(12);
    date.setMinutes(0);
    done(equal(util.date('2013-01-01'), date));
  });


  //Usage 02
  it('util.date((new Date()) , {add:{d:10} , return:"yyyy/MM/dd"})', function (done) {
    var date = new Date();
    date.setDate(date.getDate() + 10);
    var str = date.getFullYear() + "/" + util.setDigit(date.getMonth() + 1, 2) + "/" + util.setDigit(date.getDate(), 2);

    done(equal(util.date((new Date()), {add: {d: 10}, return: 'yyyy/MM/dd'}), str));
  });

  //Usage 03
  it('util.date("1919-03-01", {add:{d:10}, return:"yyyy/MM/dd hh:mm:ss"})', function (done) {
    done(equal(util.date("1919-03-01", {
      add: {d: 10},
      return: "yyyy/MM/dd hh:mm:ss"
    }), '1919/03/11 12:00:00'));
  });

  //Usage 04
  it('util.date((new Date()) , {set:"firstDayOfMonth", return:"yyyy/MM/dd"})', function (done) {
    var date = new Date();
    var str = date.getFullYear() + "/" + util.setDigit(date.getMonth() + 1, 2) + "/01";
    done(equal(util.date((new Date()), {set: "firstDayOfMonth", return: 'yyyy/MM/dd'}), str));
  });

  //Usage 05
  it('util.date((new Date()) , {set:"lastDayOfMonth", return:"yyyy/MM/dd"})', function (done) {
    var date = new Date();
    var str = date.getFullYear() + "/" + util.setDigit(date.getMonth() + 1, 2) + "/" + util.daysOfMonth(date.getFullYear(), date.getMonth());
    done(equal(util.date((new Date()), {set: "lastDayOfMonth", return: 'yyyy/MM/dd'}), str));
  });

  //Usage 06
  it('util.date("")', function (done) {
    var date = new Date();
    done(equal(util.date(""), date));
  });

  //Usage 07
  it('util.date("1979-12-16T09:00:00") [string.length > 15]', function (done) {
    var date = new Date();
    date.setFullYear(1979, 11, 16);
    date.setHours(9, 0, 0, 0);

    done(equal(util.date("1979-12-16T09:00:00"), date));
  });

  //Usage 08
  it('util.date("20170411103317") [string.length == 14]', function (done) {
    var date = new Date(2017, 3, 11);
    date.setHours(10);
    date.setMinutes(33);
    date.setSeconds(17);
    done(equal(util.date("20170411103317"), date));
  });

  //Usage 09
  it('util.date("201704") [string.length > 7]', function (done) {
    var date = new Date(2017, 3, 12);
    date.setHours(12);
    done(equal(util.date("20170412"), date));
  });

  //Usage 10
  it('util.date("201704") [string.length > 4]', function (done) {
    var date = new Date(2017, 3);
    date.setHours(12);
    done(equal(util.date("201704"), date));
  });

  //Usage 11
  it('util.date("2017") [string.length > 2]', function (done) {
    var date = new Date(2017, 0);
    date.setHours(12);
    done(equal(util.date("2017"), date));
  });

  //Usage 12
  it('util.date("17") [string.length <= 2]', function (done) {
    var date = new Date();
    done(equal(util.date("17"), date));
  });

  //Usage 13
  it('util.date(date, {return: "yyyy-MM-dd"})', function (done) {
    var date = new Date(2017, 3, 16);
    done(equal(util.date(date, {return: "yyyy-MM-dd"}), "2017-04-16"));
  });

  //Usage 14
  it('util.date(date, {return: "yyyy-MM-dd hh:mm:ss"})', function (done) {
    var date = new Date(2017, 3, 16, 12, 30, 15);
    done(equal(util.date(date, {return: "yyyy-MM-dd hh:mm:ss"}), "2017-04-16 12:30:15"));
  });

  //Usage 15
  it('util.date(date, {return: "dw"})', function (done) {
    var date = new Date(2017, 3, 16);
    done(equal(util.date(date, {return: "dw"}), "SUN"));
  });

  //Usage 16
  it('util.date("2017-04-17 11:00:00", {add: {h: 1}})', function (done) {
    var date = new Date(2017, 3, 17, 12);
    done(equal(util.date("2017-04-17 11:00:00", {add: {h: 1}}), date));
  });

  //Usage 17
  it('util.date("2017-04-17 11:00:00", {add: {h: 1}})', function (done) {
    var date = new Date(2017, 3, 17, 12);
    done(equal(util.date("2017-04-17 11:00:00", {add: {h: 1}}), date));
  });

  //Usage 18
  it('util.date("2017-06-17 01:55:00", {add: {h: 1}})', function (done) {
    var date = new Date(2017, 5, 17, 2, 55);
    done(equal(util.date("2017-06-17 01:55:00", {add: {h: 1}}), date));
  });

  //Usage 19
  it('util.date("2017-04-16", {add: {d: 1}})', function (done) {
    var date = new Date(2017, 3, 17, 12);
    done(equal(util.date("2017-04-16", {add: {d: 1}}), date));
  });

  //Usage 20
  it('util.date("2017-05-16", {add: {m: 1}})', function (done) {
    var date = new Date(2017, 5, 16, 12);
    done(equal(util.date("2017-05-16", {add: {m: 1}}), date));
  });

  //Usage 21
  it('util.date("2017-04-22", {add: {y: 1}})', function (done) {
    var date = new Date(2018, 3, 22, 12);
    done(equal(util.date("2017-04-22", {add: {y: 1}}), date));
  });

  //Usage 22
  it('util.date("2016-04-23", {add: {d: 1.5}, return: "dd"})', function (done) {
    var str = "25";
    done(equal(util.date("2016-04-23", {add: {d: 1.5}, return: "dd"}), str));
  });

  /* end util.date */

});

describe('util.number TEST', function () {
  var testCases = [
    {
      args: [
        123456789.678,
        {
          round: 1
        }
      ],
      expect: 123456789.7,
      explanation: 123456789.678 + ', { round: 1 }'
    },
    {
      args: [
        123456789.678,
        {
          round: 1,
          money: true
        }
      ],
      expect: '123,456,789.7',
      explanation: 123456789.678 + ', { round: 1, money: true }'
    },
    {
      args: [
        123456789.678,
        {
          round: 2,
          byte: true
        }
      ],
      expect: '117.7MB',
      explanation: 123456789.678 + ', { round: 2, byte: true }'
    },
    {
      args: [
        -123456789.678,
        {
          abs: true,
          round: 2,
          money: true
        }
      ],
      expect: '123,456,789.68',
      explanation: -123456789.678 + ',{ abs: true, round: 2, money: true }'
    },
    {
      args: [
        -123456789.678,
        {
          abs: true,
          ceil: true,
          money: true
        }
      ],
      expect: '123,456,790',
      explanation: -123456789.678 + ',{ abs: true, ceil: true, money: true }'
    },
    {
      args: [
        -123456789.678,
        {
          abs: true,
          floor: true,
          money: true
        }
      ],
      expect: '123,456,789',
      explanation: -123456789.678 + ',{ abs: true, floor: true, money: true }'
    },
    {
      args: [
        1023,
        {
          byte: true
        }
      ],
      expect: '1KB',
      explanation: 1023 + ',{byte: true}'
    },
    {
      args: [
        1024 * 1024,
        {
          byte: true
        }
      ],
      expect: '1024KB',
      explanation: 1024 * 1024 + ',{byte: true}'
    },
    {
      args: [
        1024 * 1024 * 5,
        {
          byte: true
        }
      ],
      expect: '5MB',
      explanation: 1024 * 1024 * 5 + ',{byte: true}'
    },
    {
      args: [
        1024 * 1024 * 1024,
        {
          byte: true
        }
      ],
      expect: '1024MB',
      explanation: 1024 * 1024 * 1024 + ',{byte: true}'
    },
    {
      args: [
        1024 * 1024 * 1024 * 5,
        {
          byte: true
        }
      ],
      expect: '5GB',
      explanation: 1024 * 1024 * 1024 + ',{byte: true}'
    },
    {
      args: [
        'A-1234~~56789.8~888PX',
        {
          abs: true,
          round: 2,
          money: true
        }
      ],
      expect: '123,456,789.89',
      explanation: 'A-1234~~56789.8~888PX , { abs: true, round: 2, money: true }'
    }
  ];
  testCases.forEach(function (testCase) {
    it('util.number(' + testCase.explanation + ') expect ' + testCase.expect, function (done) {
      var actual = util.number.apply(this, testCase.args);
      done(equal(actual, testCase.expect));
    });
  });
});


$("#sample-body").append($el);