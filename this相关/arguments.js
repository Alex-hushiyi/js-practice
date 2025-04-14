function foo(num1,num2,num3){
    console.log(num1,num2,num3);

    console.log(arguments);
    // 获取参数的个数
    console.log(arguments.length);
    // 获取参数的值
    console.log(arguments[0],arguments[1],arguments[2]);
    /// 柯里化获取当前arguments所在的函数
    console.log(arguments.callee)
}
foo(1,2,3);

// slice方法
// var newArr = Array.prototype.slice.call(arguments, 1, 3);

// slice方法的实现
Array.prototype.useslice = function (start, end) {
    // 1.获取当前数组对象
    var arr = this;
    // 2.判断start和end的值是否合法
    start = start || 0;
    end = end || arr.length;
    // 3.创建一个新的数组对象
    var newArr = [];
    for (var i = start; i < end; i++) {
        newArr.push(arr[i]);
    }
    return newArr;
}

// 1.直接绑定一个给定数组
// var newArr = Array.prototype.useslice.call([1, 2, 3, 4, 5], 1, 3);
// console.log(newArr);

// 2.1绑定arguments
// var newArr = Array.prototype.useslice.call(arguments, 1, 3);
// 2.2
var newArr = [].useslice.call(arguments, 1, 3);
console.log(newArr);

// 3.ES6
var newArr = Array.from(arguments);
console.log(newArr);

// 4.ES6 ...扩展运算符
var newArr = [...arguments];
console.log(newArr);

var arr = [1, 2, 3, 4, 5];
console.log(arr.useslice(1, 3));