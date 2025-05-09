function requestData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(url);
    }, 1000);
  });
}

// 1. 回调地狱
requestData("url1").then((res1) => {
  console.log("res1", res1);
  requestData(res1 + "url2").then((res2) => {
    console.log("res2", res2);
    requestData(res2 + "url3").then((res3) => {
      console.log("res3", res3);
    });
  });
});

// 2. Promise中的then返回值
requestData("url1")
  .then((res1) => {
    console.log("res1", res1);
    return requestData(res1 + "url2");
  })
  .then((res2) => {
    console.log("res2", res2);
    return requestData(res2 + "url3");
  })
  .then((res3) => {
    console.log("res3", res3);
  });

// 3. Promise+generator
function* fetchData() {
  const res1 = yield requestData("url1");
  console.log("res1", res1);
  const res2 = yield requestData(res1 + "url2");
  console.log("res2", res2);
  const res3 = yield requestData(res2 + "url3");
  console.log("res3", res3);
}

// 手动执行生成器函数
const generator = fetchData();
generator.next().value.then((res1) => {
  generator.next(res1).value.then((res2) => {
    generator.next(res2).value.then((res3) => {
      generator.next(res3);
    });
  });
});
// 自动执行生成器函数（递归函数）
function run(generator) {
  const iterator = generator();
  function handle(result) {
    if (result.done) return;
    result.value.then((res) => {
      handle(iterator.next(res));
    });
  }
  handle(iterator.next());
}

run(fetchData);

// 自动执行生成器函数（第三方库co）TJ
// TJ: co/n(nvm)/commander(coderwhy/vue cli)/express/koa(egg)
// co是一个自动执行generator函数的库 npm install co
const co = require("co");
co(fetchData)

// 4. async/await
async function fetchData() {
  const res1 = await requestData("url1");
  console.log("res1", res1);
  const res2 = await requestData(res1 + "url2");
  console.log("res2", res2);
  const res3 = await requestData(res2 + "url3");
  console.log("res3", res3);
}
fetchData();
