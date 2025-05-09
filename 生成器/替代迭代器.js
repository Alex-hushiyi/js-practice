// 生成器替换迭代器
// 生成器函数是一个特殊的函数，它可以在执行过程中暂停和恢复。
// 生成器函数的返回值是一个迭代器对象，可以用来遍历生成器函数中定义的值。
// 生成器函数的语法是使用 function* 关键字定义函数，
// 在函数体内使用 yield 关键字定义要返回的值。
function* createArrayIterator(array) {
  // 1.直接yeild生成或者for循环yeild生成
  // for (let i = 0; i < array.length; i++) {
  //   yield array[i];
  // }
  // 2. for of循环yeild生成
  // for (const item of array) {
  //   yield item;
  // }
  // 3. yeild*生成，for of循环生成的语法糖
  yield* array;
}

const array = [1, 2, 3, 4, 5];
const iterator = createArrayIterator(array);
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: 4, done: false }
console.log(iterator.next()); // { value: 5, done: false }
console.log(iterator.next()); // { done: true }

// 4. 迭代数字生成器
function* createRangeIterator(start, end) {
  let current = start;
  while (current <= end) {
    yield current++;
  }

  //   let index = start;
  //   return {
  //     next: () => {
  //       if (index <= end) {
  //         return { value: index++, done: false };
  //       } else {
  //         return { done: true };
  //       }
  //     },
  //   };
}

const rangeIterator = createRangeIterator(1, 5);
console.log(rangeIterator.next()); // { value: 1, done: false }
console.log(rangeIterator.next()); // { value: 2, done: false }
console.log(rangeIterator.next()); // { value: 3, done: false }
console.log(rangeIterator.next()); // { value: 4, done: false }
console.log(rangeIterator.next()); // { value: 5, done: false }
console.log(rangeIterator.next()); // { done: true }

// class案例
class GeneratorClass {
  constructor(arr) {
    this.arr = arr;
  }

  // 函数方法
  entry = (n) => {
    this.arr.push(n);
  };

  *[Symbol.iterator]() {
    yield* this.arr;
  }
}

const generatorClass = new GeneratorClass([1, 2, 3, 4, 5]);
const iteratorClass = generatorClass[Symbol.iterator]();
console.log(generatorClass, iteratorClass);
for (const item of generatorClass) {
  console.log(item); // [1, 2, 3, 4, 5]
}
