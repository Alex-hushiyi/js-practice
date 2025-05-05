// 保存当前需要收集的响应式函数
let activeReactiveFn = null;

// 1.Depend 类的封装
class Depend {
  constructor() {
    this.reactiveFns = new Set();
  }

  // 收集依赖
  depend() {
    if (activeReactiveFn) {
      this.reactiveFns.add(activeReactiveFn);
    }
  }

  notify() {
    this.reactiveFns.forEach((fn) => fn());
  }
}

// 2.函数封装
function watchFn(fn) {
  activeReactiveFn = fn;
  fn();
  activeReactiveFn = null;
}

// 3.依赖收集
const targetMap = new WeakMap();
function getDepend(target, key) {
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }
  let depend = depsMap.get(key);
  if (!depend) {
    depend = new Depend();
    depsMap.set(key, depend);
  }
  return depend;
}

let obj = {
  name: "John",
  age: 30,
};

// 4.监听对象的变化
// 4.1.使用Proxy监听对象的变化(Vue3)
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      // 根据target.key获取对应的depend
      const depend = getDepend(target, key);
      // 收集依赖
      depend.depend();
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      Reflect.set(target, key, value, receiver);
      // 依赖收集
      const depend = getDepend(target, key);
      // 触发更新
      depend.notify();
    },
  });
}
// 4.2.使用object.defineProperty监听对象的变化(Vue2)
// function reactive(obj) {
// ES6之前, 使用Object.defineProperty
//   Object.keys(obj).forEach((key) => {
//     let value = obj[key];
//     Object.defineProperty(obj, key, {
//       get() {
//         const depend = getDepend(obj, key);
//         depend.depend();
//         return value;
//       },
//       set(newValue) {
//         value = newValue;
//         const depend = getDepend(obj, key);
//         depend.notify();
//       },
//     });
//   });
//   return obj;
// }

const objProxy = watchFn(() => {
  console.log(objProxy.name, "-------");
  console.log(objProxy.name, "+++++++");
});

objProxy.name = "kobe";
