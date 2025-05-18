function debounce(fn, delay, immediate = false, resultCallback) {
  // 1.  // 先定义一个定时器,保存上一次的定时器
  let timer = null;
  // 定义一个变量,用来标记是否第一次执行
  let isInvoke = false;

  // 2. 返回一个函数,这个函数就是防抖函数
  const _debounce = function (...args) {
    return new Promise((resolve, reject) => {
      // 3. 每次调用这个函数,就清除上一次的定时器
      if (timer) clearTimeout(timer);
      // 4. 如果是第一次执行,就直接执行函数
      if (immediate && !isInvoke) {
        const result = fn.apply(this, args);
        // 直接返回结果
        if (resultCallback) resultCallback(result);
        resolve(result);
        // 设置标记,表示已经执行过一次了
        isInvoke = true;
      } else {
        // 5. 延迟执行
        timer = setTimeout(() => {
          // 6. 外部传入真正要执行的函数
          const result = fn.apply(this, args);
          // 返回结果
          if (resultCallback) resultCallback(result);
          resolve(result);
          //  清除标记
          isInvoke = false;
        }, delay);
      }
    });
  };

  // 7. 取消防抖函数
  _debounce.cancel = function () {
    // 清除定时器
    if (timer) clearTimeout(timer);
    // 清除标记
    isInvoke = false;
    timer = null;
  };

  return _debounce;
}
