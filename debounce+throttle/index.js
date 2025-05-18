// 防抖和节流函数的实现
const inputEle = document.querySelector("input");
let counter = 0;

const inputChange = function (e) {
  console.log(`发送了第${++counter}次请求`, this, e);
  return `+value`;
};

// 防抖处理
// 1.第三方库underscore的防抖函数
// inputEle.oninput = _.debounce(inputChange, 2000)
// inputEle.oninput = _.throttle(inputChange, 2000)

// 2.自行封装的防抖函数(立即执行)
// inputEle.oninput = debounce(inputChange, 2000, true);

// 变量接收（无返回值）
// const debounceChange = debounce(inputChange, 2000);
// 变量接收（有返回值）
const debounceChange = debounce(inputChange, 2000, false, (result) => {
  console.log("result返回值", result);
});

// 3.使用promise封装的防抖函数
const debouncePromise = () => {
  debounceChange().then((res) => {
    console.log("promise返回值", res);
  });
};
// inputEle.oninput = debounceChange;
// inputEle.oninput = debouncePromise;

// 取消防抖
const cancelBtn = document.querySelector("#cancel");
// cancelBtn.onclick = function () {
//   debounceChange.cancel();
//   console.log("取消防抖");
// };

// 节流处理
// inputEle.oninput = throttle(inputChange, 1000);

// 变量接收（无返回值）
// const throttleChange = throttle(inputChange, 1000);
// 变量接收（有返回值）
const throttleChange = throttle(inputChange, 1000, {
  leading: false,
  trailing: true,
  resultCallback: (result) => {
    console.log("节流返回值", result);
  },
});
// 3.使用promise封装的节流函数
const throttlePromise = () => {
  throttleChange().then((res) => {
    console.log("promise返回值", res);
  });
};
// inputEle.oninput = throttleChange;
inputEle.oninput = throttlePromise;

// 取消节流
cancelBtn.onclick = function () {
  throttleChange.cancel();
  console.log("取消节流");
};
