const iterableObj = {
  names: ["Alice", "Bob", "Charlie"],
  [Symbol.iterator]: function () {
    let i = 0;
    const names = this.names;
    return {
      next: () => {
        if (i < names.length) {
          return {
            value: names[i++],
            done: false,
          };
        } else {
          return {
            done: true,
            value: undefined,
          };
        }
      },
    };
  },
};

for (const name of iterableObj) {
  console.log(name); // "Alice", "Bob", "Charlie"
}

// 内置创建可迭代对象
const iterable = [1, 2, 3, 4, 5];
const iterator = iterable[Symbol.iterator]();
console.log(iterator); // [Object Iterator]
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: 4, done: false }
console.log(iterator.next()); // { value: 5, done: false }
console.log(iterator.next()); // { done: true, value: undefined }

for (const value of iterable) {
  console.log(value); // 1, 2, 3, 4, 5
}

const set = new Set([1, 2, 3]);
set.add(4);
set.add(5);
console.log(set[Symbol.iterator]);
for (const value of set) {
  console.log(value); // 1, 2, 3, 4, 5
}

function foo(x, y, z) {
  console.log(arguments[Symbol.iterator]); // [Object Iterator]
  for (const value of arguments) {
    console.log(value); // 1, 2, 3
  }
}

foo(1, 2, 3);

// 应用场景
// 1. 遍历数据结构：可以使用 for...of 循环遍历数组、字符串、Map、Set 等可迭代对象。
for (const value of iterableObj) {
  console.log(value); // "Alice", "Bob", "Charlie"
}

// 2.展开运算符：可以使用展开运算符 (...) 将可迭代对象展开为单独的元素。
const arr = [...iterableObj]; // ["Alice", "Bob", "Charlie"]

// 3.解构赋值：可以使用解构赋值从可迭代对象中提取元素。
const [first, second] = iterableObj; // "Alice", "Bob"

// 4.创建可迭代对象。
const setA = new Set(iterableObj);

const setB = new Set(names);

const arrA = Array.from(iterableObj);

// 5. promise.all：可以使用 Promise.all 来处理多个 Promise 对象。
Promise.all(iterableObj).then((res) => {
  console.log(res);
});
