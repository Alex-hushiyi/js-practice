// Object.defineProperty设计的初衷，不是为了去监听截止一个对象中所有的属性的。
// 如果我们想监听更加丰富的操作，比如新增属性、删除属性，那么Object.defineProperty是无能为力的。
const obj = {
  name: "zhangsan",
  age: 18,
};
const objproxy = new Proxy(obj, {
  get(target, key) {
    console.log("get", target, key);
    return target[key];
  },
  set(target, key, value) {
    console.log("set", target, key, value);
    target[key] = value;
  }
});

console.log(objproxy.name); // get { name: 'zhangsan', age: 18 } name
console.log(objproxy.age); // get { name: 'lisi', age: 18 } age
objproxy.name = "lisi"; // set { name: 'zhangsan', age: 18 } name lisi
objproxy.age = 20; // set { name: 'lisi', age: 18 } age 20
console.log(obj.name); // lisi
console.log(obj.age); //  20


