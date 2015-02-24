var sas = require('../sas');


var r_t = function() {
  return Math.random() * 1000;
}

var line;
var count = 0;

var test = function(result) {
  return function(cb,ext) {
    setTimeout(function() {
      cb(result);

    }, r_t());
  }
}

line = [
  test('同步start'),
  test('同步1'), {
    '2-1': test('异步2-1'),
    '2-2': test('异步2-2'),
    '2-3': test('异步2-3'),
    '2-4': [
      test('同步2-3-1'),
      test('同步2-3-2'),
      test('同步2-3-3')
    ]
  },
  {
    '4-5': 22,
    '4-4': 22,
    '4-3': 22,
    '4-2': 22
  },
  test('同步3'),
  function(cb,ext){
    cb('1',2);
  }
]

line2 = [
  test('同步start'), {
    '2-1': [test('异步2-1-1'), test('异步2-2-2'), test('异步2-3-3') ],
    '2-3': [
      test('同步2-3-1'),
      test('同步2-3-2'),
      test('同步2-3-3')
    ]
  },
  test('同步end')
]

sas(line,{debug:true});