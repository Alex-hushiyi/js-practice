// 是否是对象
function isObject(value) {
  const type = typeof value;
  //   return value !== null && (type === "object" || type === "function");
  return value !== null && type === "object";
}

// 深克隆执行函数
function deepClone(originValue, map = new WeakMap()) {
  // 如果是基本数据类型，直接返回
  if (!isObject(originValue)) {
    return originValue;
  }
  // 如果是日期类型，创建一个新的日期对象
  if (originValue instanceof Date) {
    return new Date(originValue.getTime());
  }

  // 如果是函数类型，直接返回
  if (typeof originValue === "function") {
    return originValue;
  }

  // 如果是symbo类型，创建一个新的symbol
  if (typeof originValue === "symbol") {
    return Symbol(originValue.description);
  }

  // 如果是set类型，创建一个新的set
  if (originValue instanceof Set) {
    const newSet = new Set();
    for (const item of originValue) {
      newSet.add(deepClone(item));
    }
    return newSet;
  }
  // 如果是map类型，创建一个新的map
  if (originValue instanceof Map) {
    const newMap = new Map();
    for (const [key, value] of originValue) {
      newMap.set(deepClone(key), deepClone(value));
    }
    return newMap;
  }

  // 处理正则表达式
  if (originValue instanceof RegExp) {
    return new RegExp(originValue.source, originValue.flags);
  }

  // 处理其他特殊对象
  if (originValue instanceof Error) {
    return new Error(originValue.message);
  }

  // 处理类型化数组
  if (ArrayBuffer.isView(originValue)) {
    return new originValue.constructor(originValue);
  }

  // 是否是循环引用
  if (map.has(originValue)) {
    return map.get(originValue);
  }

  //   const newObject = Array.isArray(originValue) ? [] : {};
  // 保留原型链
  const newObject = Array.isArray(originValue)
    ? []
    : Object.create(Object.getPrototypeOf(originValue));

  // 收集循环引用
  map.set(originValue, newObject);
  // 处理对象的属性
  for (const key in originValue) {
    newObject[key] = deepClone(originValue[key], map);
  }
  // 处理symbol属性
  const symbolKeys = Object.getOwnPropertySymbols(originValue);
  // 遍历symbol属性
  for (const sKey of symbolKeys) {
    const newSKey = Symbol(originValue[sKey].description);
    newObject[newSKey] = deepClone(originValue[sKey], map);
  }

  // 返回新的对象
  return newObject;
}

// 测试
const s1 = Symbol("name");
const s2 = Symbol("age");
// const regexp = /hello/g;
// const error = new Error('test');
// const int8Array = new Int8Array([1, 2, 3]);
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  sayHello() {
    console.log(
      `Hello, my name is ${this.name} and I am ${this.age} years old.`
    );
  }
}
const obj = {
  name: "kobe",
  age: 18,
  address: "beijing",
  friend: {
    name: "james",
    age: 20,
  },
  hobbies: ["basketball", "football"], // 数组类型
  date: new Date(), // 日期类型
  // Symbol类型
  [s1]: "hello",
  s2: s2,
  // 函数类型
  sayHello: function () {
    console.log("hello");
  },
  set: new Set([1, 2, 3]),
  map: new Map([
    ["name", "kobe"],
    ["age", 18],
  ]),
  regexp: /hello/g,
  error: new Error("test"),
  int8Array: new Int8Array([1, 2, 3]),
  person: new Person("Allen", 18),
};

const info = deepClone(obj);
obj.friend.name = "alex";
obj.hobbies[0] = "soccer";
console.log(obj === info); //false
console.log(obj);
console.log(info);
