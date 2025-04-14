Function.prototype.useCall = function (thisArg, ...args) {
  // 1.获取需要被执行的函数
  // 隐式绑定，谁调用this就指向谁,所以此this指向外面带哦用此函数的对象
  var fn = this;

  // 2.将thisArg转成对象类型，并进行非null/undefined判断
  thisArg =(thisArg !== null && thisArg !== undefined) ? Object(thisArg) : window;

  // 3.调用需要被执行的函数
  thisArg.fn = fn;
  var result = thisArg.fn(...args);
  delete thisArg.fn;
  
  // 4.将最终结果返回出去
  return result;
};
