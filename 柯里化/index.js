function add1(x, y, z) {
    return x + y + z
  }

// 柯里化函数实现
function currying(fn) {
  function curried(...args) {
    // 判断当前已经接收的参数的个数, 可以参数本身需要接受的参数是否已经一致了
    // 1.当已经传入的参数 大于等于 需要的参数时, 就执行函数
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      function curriedB(...argsb) {
        return curried.apply(this, args.concat(argsb));
      }
      return curriedB;
    }
  }
    return curried;
}

var curryAdd = currying(add1)

console.log(curryAdd(1)(2)(3)); // 6
console.log(curryAdd(1, 2)(3)); // 6
console.log(curryAdd(1, 2, 3)); // 6
