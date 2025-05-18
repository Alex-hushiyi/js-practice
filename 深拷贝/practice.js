const s1 = Symbol("name");
const s2 = Symbol("age");
const obj = {
  name: "kobe",
  age: 18,
  address: "beijing",
  friend: {
    name: "james",
    age: 20,
  },
  [s1]: "hello",
  s2: s2,
};
// 浅拷贝
const info = Object.assign({}, obj);
info.friend.name = "alex";
console.log(info);
console.log(obj);
console.log(obj === info); // false
// 深拷贝
// 简单的深拷贝
const obj2 = JSON.parse(JSON.stringify(obj));
obj2.friend.name = "james";
console.log(obj2);
console.log(obj === obj2); // false
