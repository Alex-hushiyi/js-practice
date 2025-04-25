var set = new Set();
set.add(1);
set.add(2);
set.add(3);
set.add(4);
set.add(5);

set.add({})
set.add({})

set.add(1); // 重复的值不会被添加
console.log(set); // Set(5) { 1, 2, 3, 4, 5 }

var arr = [0,1,2,1,3]
const nset = new Set(arr)
const newArr = Array.from(nset)
const newArr2 = [...nset]
console.log(nset) // nset(4) { 0, 1, 2, 3 };
console.log(newArr) // newArr(4) [ 0, 1, 2, 3 ];
console.log(newArr2) // newArr2(4) [ 0, 1, 2, 3 ];

console.log(set.size) // 5;
console.log(set.delete(1)) // true;
console.log(set.has(1)) // false;
// console.log(set.clear()) // undefined;
set.forEach((item) => {
  console.log(item);
}) // 2 3 4 5
for (const item of set) {
  console.log(item);
} // 2 3 4 5


// 3.WeakSet的应用场景
const personSet = new WeakSet()
class Person {
  constructor() {
    personSet.add(this)
  }

  running() {
    if (!personSet.has(this)) {
      throw new Error("不能通过非构造方法创建出来的对象调用running方法")
    }
    console.log("running~", this)
  }
}

let p = new Person()
p.running()
p = null

p.running.call({name: "why"})
