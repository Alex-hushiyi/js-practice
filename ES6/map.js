const obj = {
  name: "John",
  age: 30,
  city: "New York",
};
const obj2 = {
  name: "John",
  age: 30,
  city: "New York",
};


const map = new Map()
const map2 = new Map([
  ["name", "John"],
  ["age", 30],
  ["city", "New York"],
]);
map.set(obj,"aaa")
map.set(obj2,"bbb")
map.set(1,"ccc")
console.log(map)

console.log(map.size) // 3
console.log(map.get(obj)) // aaa;

console.log(map.has(obj)) // true;

map.delete(1) // delete obj2
console.log(map);

map2.clear() // clear map2
console.log(map2.size) // 0
console.log(map2);

map.forEach((value, key) => {
  console.log(key, value);
}) // forEach
// console.log(map.entries()) // entries
// console.log(map.keys()) // keys
// console.log(map.values()) // values

for (const item of map.entries()) {
  console.log(item[0], item[1]);
} // for of

for (const [key, value] of map) {
  console.log(key, value);
} // for of


const map3 = new WeakMap()

map3.set(obj, "aaa")

console.log(map3.get(obj)) // aaa;
console.log(map3.has(obj)) // true;
// map3.delete(obj) // delete obj

