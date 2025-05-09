//async
async function foo() {
  return 1;
}

const bar = async () => {
  return 2;
};

class Baz {
  async method() {
    return 3;
  }
}
const baz = new Baz();

console.log(foo()); // Promise { 1 }
console.log(bar()); // Promise { 2 }
console.log(baz.method()); // Promise { 3 }

async function test() {
  // 1. 返回一个值
  // return 4;
  // 2. thenable
  // return {
  //     then(resolve) {
  //       resolve(4);
  //     },
  // }
  // 3. Promise
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(4);
    }, 1000);
  });
}

// const promise = test();
// promise.then((result) => {
//   console.log(result); // 4
// });

async function ems() {
  throw new Error("Error message~~~");
}

// ems().catch((error) => {
//   console.error(error); // Error: Error message~~~
// });

// await
console.log("---await-start~~~---");

// awaitFn
async function awaitFn() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("awaitFn~~~");
    }, 1000);
  });
}

// reject函数errFn
async function errFn() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("errFn~~~");
    }, 1000);
  });
}

async function fn() {
  // 1.返回一个值
  const res = await 123;
  console.log("res", res);
  // 2. 表达式
  const res1 = await awaitFn();
  console.log("res1", res1);
  // 3. thenable
  const res2 = await {
    then(resolve) {
      resolve(123);
    },
  };
  console.log("res2", res2);
  // 4. Promise
  const res3 = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(123);
    }, 1000);
  });
  console.log("res3", res3);
  // 5. 异常reject
  const res4 = await errFn();
  console.log("res4", res4);
}
// fn()
// fn().catch((error) => {
//   console.log("error~~", error); // errFn~~~
// });
fn().then(
  (result) => {
    console.log("result", result); // result undefined
  },
  (err) => {
    console.log("err", err);
  }
);
