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
  },
  has(target, key) {
    console.log("has", target, key);
    return key in target;
  },
  deleteProperty(target, key) {
    console.log("deleteProperty", target, key);
    delete target[key];
  },
});

console.log("name" in objproxy); // has { name: 'zhangsan', age: 18 } name

delete objproxy.name;

function foo() {
  console.log("foo");
}

const fooproxy = new Proxy(foo, {
  apply(target, thisArg, args) {
    console.log("apply", target, thisArg, args);
    return target.apply(thisArg, args);
  },
  construct(target, args) {
    console.log("construct", target, args);
    return new target(...args);
  },
});

fooproxy.apply(null, [1, 2, 3]); // apply [Function: foo] null [ 1, 2, 3 ]
new fooproxy(1, 2, 3); // construct [Function: foo] [ 1, 2, 3 ]
