function* foo(param) {
  console.log("param~", param);
  const a = 1 + param;
  console.log("第一段代码~", a);
  const n = yield a;

  console.log("n~", n);
  const b = 2 * n;
  console.log("第二段代码~", b);
  try {
    yield b;
  } catch (error) {
    console.log("catch~捕获到异常~", error);
    // 处理异常
    // yield 0;
    // 继续执行
  }

  const c = 3;
  console.log("第三段代码~", c);
  yield c;

  const d = 4;
  console.log("第三段代码~", d);
  yield d;
}

// 返回一个生成器对象generator
// 传入参数2，生成器函数foo的参数param为2（很少这样操作）
const generator = foo(2);

// 使用生成器对象的next方法执行
console.log(generator.next()); // { value: 1, done: false }

// next方法传入参数，相当于上一个yield的返回值
const res = generator.next(6)
console.log(res); // { value: 12, done: false }

// throw方法抛出异常，catch捕获到异常
// 注意：throw方法只能在yield表达式中使用
if(res.value !== 12) {
  console.log(generator.throw("不满足条件，抛出异常")); // { value: undefined, done: false }
}
console.log(generator.throw("抛出异常")); // Uncaught Error: 抛出异常

console.log(generator.return(8)); // { value: 8, done: true }
console.log(generator.next()); // { value: undefined, done: true }
