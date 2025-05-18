function throttle(fn, delay, options = { leading: true, trailing: false }) {
  // 1. 定义一个变量,用来保存上一次执行的时间
  const { leading, trailing, resultCallback } = options;
  let lastTime = 0;
  let timer = null;

  // 2. 返回一个函数,这个函数就是节流函数
  const _throttle = function (...args) {
    return new Promise((resolve, reject) => {
      // 3. 获取当前时间
      const nowTime = new Date().getTime();
      // 3.1 如果是第一次执行,就直接执行函数
      // if (lastTime == 0 && leading === false) lastTime = nowTime;
      if (!lastTime && !leading) lastTime = nowTime;

      // 计算时间差
      const remainTime = delay - (nowTime - lastTime);
      // 4. 如果时间差小于0,就执行函数
      if (remainTime <= 0) {
        if (timer) {
          // 清除定时器
          clearTimeout(timer);
          timer = null;
        }
        // 5. 执行函数
        const result = fn.apply(this, args);
        if (resultCallback) resultCallback(result);
        resolve(result);
        // 6. 保存当前时间
        lastTime = nowTime;
        return;
      }
      // 7. 如果是尾部执行,就设置定时器
      if (trailing && !timer) {
        timer = setTimeout(() => {
          timer = null;
          lastTime = !leading ? 0 : new Date().getTime();
          const result = fn.apply(this, args);
          if (resultCallback) resultCallback(result);
          resolve(result);
        }, remainTime);
      }
    });
  };

  // 取消节流函数
  _throttle.cancel = function () {
    if (timer) clearTimeout(timer);
    timer = null;
    lastTime = 0;
  };
  return _throttle;
}
