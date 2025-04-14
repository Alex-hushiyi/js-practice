function double(num) {
  return num * 2;
}

function square(num) {
  return num ** 2;
}

// 简单组合函数
function compose(m, n) {
  return function (count) {
    return m(n(count));
  };
}

var resultFn = compose(double, square);
console.log(resultFn(4)); // 32

// 通用组合函数
function newCompose(...fns) {
  var length = fns.length;
  for (var i = 0; i < length; i++) {
    if (typeof fns[i] !== "function") {
      throw new TypeError("参数必须是函数");
    }
  }
  function composeB(...args) {
    var index = 0;
    var result = length ? fns[index].apply(this, args) : args;
    while (++index < length) {
      result = fns[index].call(this, result);
    }
    return result;
  }
  return composeB;
}

// var newFn = newCompose(10, square); //  throw new TypeError("参数必须是函数");
var newFn = newCompose(double, square);
console.log(newFn(2)); // 
