// Promise的三种状态常量定义
const PROMISE_STATUS_PENDING = "pending";     // 初始状态：等待中
const PROMISE_STATUS_FULFILLED = "fulfilled"; // 成功状态：已完成
const PROMISE_STATUS_REJECTED = "rejected";   // 失败状态：已拒绝

/**
 * 统一的函数执行与错误处理包装函数
 * @param {Function} exectorFn - 需要执行的函数
 * @param {any} value - 函数的输入值
 * @param {Function} resolve - 成功时的回调函数
 * @param {Function} reject - 失败时的回调函数
 */
function execFunctionWithCatchError(exectorFn, value, resolve, reject) {
  try {
    const result = exectorFn(value);
    resolve(result); // 调用 resolve 方法
  } catch (error) {
    // 捕获错误并调用 reject
    reject(error);
  }
}

/**
 * 自定义Promise类实现，符合Promise A+规范
 */
class MyPromise {
  constructor(executor) {
    // 状态属性初始化
    this.status = PROMISE_STATUS_PENDING;    // Promise当前状态
    this.value = undefined;                  // 成功时的值
    this.reason = undefined;                 // 失败时的原因
    this.onFulfilledFns = [];               // 成功回调函数队列
    this.onRejectedFns = [];                // 失败回调函数队列

    /**
     * resolve方法：将Promise状态改为成功
     * @param {any} value - Promise成功时的值
     */
    const resolve = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 使用微任务确保执行顺序
        queueMicrotask(() => {
          // 二次检查，确保状态未被改变
          if (this.status !== PROMISE_STATUS_PENDING) return;
          this.status = PROMISE_STATUS_FULFILLED;  // 设置状态为成功
          this.value = value;                      // 保存成功值
          // 执行所有成功回调
          this.onFulfilledFns.forEach((fn) => fn(this.value));
        });
      }
    };

    /**
     * reject方法：将Promise状态改为失败
     * @param {any} reason - Promise失败的原因
     */
    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 使用微任务确保执行顺序
        queueMicrotask(() => {
          // 二次检查，确保状态未被改变
          if (this.status !== PROMISE_STATUS_PENDING) return;
          this.status = PROMISE_STATUS_REJECTED;   // 设置状态为失败
          this.reason = reason;                    // 保存失败原因
          // 执行所有失败回调
          this.onRejectedFns.forEach((fn) => fn(this.reason));
        });
      }
    };

    // 立即执行executor，并捕获可能发生的错误
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  /**
   * then方法：注册Promise状态改变后的回调
   * @param {Function} onFulfilled - 成功回调
   * @param {Function} onRejected - 失败回调
   * @returns {MyPromise} 新的Promise实例，实现链式调用
   */
  then(onFulfilled, onRejected) {
    // 处理catch的默认reject回调
    const defaultOnRejected = (error) => {
      throw error;
    };
    onRejected = onRejected || defaultOnRejected;

    // 处理finally的默认fulfilled回调
    const defaultOnFulfilled = (value) => value;
    onFulfilled = onFulfilled || defaultOnFulfilled;

    // 返回新的Promise以实现链式调用
    return new MyPromise((resolve, reject) => {
      if (this.status === PROMISE_STATUS_FULFILLED) {
        // 如果当前状态是 fulfilled，直接执行 onFulfilled
        // 并将结果传递给下一个 then 的 resolve
        execFunctionWithCatchError(onFulfilled, this.value, resolve, reject);
      }
      if (this.status === PROMISE_STATUS_REJECTED) {
        // 如果当前状态是 rejected，直接执行 onRejected
        // 并将结果传递给下一个 then 的 resolve
        execFunctionWithCatchError(onRejected, this.reason, resolve, reject);
      }
      if (this.status === PROMISE_STATUS_PENDING) {
        // 如果当前状态是 pending，将 onFulfilled 和 onRejected
        // 函数存储起来，等到状态改变时再执行

        this.onFulfilledFns.push(() => {
          execFunctionWithCatchError(onFulfilled, this.value, resolve, reject);
        });

        this.onRejectedFns.push(() => {
          execFunctionWithCatchError(onRejected, this.reason, resolve, reject);
        });
      }
    });
  }

  /**
   * catch方法：处理Promise的错误情况
   * @param {Function} onRejected - 失败回调
   * @returns {MyPromise} 新的Promise实例
   */
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  /**
   * finally方法：无论Promise结果如何都会执行的回调
   * @param {Function} onFinally - 最终执行的回调函数
   * @returns {MyPromise} 新的Promise实例
   */
  finally(onFinally) {
    return this.then(
      () => onFinally(),  // 成功时执行
      () => onFinally()   // 失败时执行
    );
  }

  /**
   * 静态resolve方法：创建一个成功的Promise
   * @param {any} value - 需要resolve的值
   * @returns {MyPromise} 新的Promise实例
   */
  static resolve(value) {
    return new MyPromise((resolve) => resolve(value));
  }

  /**
   * 静态reject方法：创建一个失败的Promise
   * @param {any} reason - 需要reject的原因
   * @returns {MyPromise} 新的Promise实例
   */
  static reject(reason) {
    return new MyPromise((resolve, reject) => reject(reason));
  }

  /**
   * 静态all方法：等待所有Promise完成
   * @param {MyPromise[]} promises - Promise数组
   * @returns {MyPromise} 包含所有结果的Promise
   */
  static all(promises) {
    return new MyPromise((resolve, reject) => {
      const values = [];              // 存储所有Promise的结果
      let resolvedCount = 0;          // 已完成的Promise计数
      
      promises.forEach((promise, index) => {
        promise.then(
          (res) => {
            values[index] = res;      // 保持结果顺序
            resolvedCount++;
            // 所有Promise都完成时，返回结果数组
            if (resolvedCount === promises.length) {
              resolve(values);
            }
          },
          (err) => reject(err)        // 任一Promise失败则整体失败
        );
      });
    });
  }

  /**
   * 静态allSettled方法：等待所有Promise完成（无论成功或失败）
   * @param {MyPromise[]} promises - Promise数组
   * @returns {MyPromise} 包含所有结果的Promise
   */
  static allSettled(promises) {
    return new MyPromise((resolve) => {
      const values = [];
      promises.forEach((promise) => {
        promise.then(
          (res) => {
            values.push({ status: PROMISE_STATUS_FULFILLED, value: res });
            if (values.length === promises.length) {
              resolve(values);
            }
          },
          (err) => {
            values.push({ status: PROMISE_STATUS_REJECTED, reason: err });
            if (values.length === promises.length) {
              resolve(values);
            }
          }
        );
      });
    });
  }

  /**
   * 静态race方法：返回最先完成的Promise结果
   * @param {MyPromise[]} promises - Promise数组
   * @returns {MyPromise} 最先完成的Promise
   */
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise) => {
        promise.then(resolve, reject);
      });
    });
  }

  /**
   * 静态any方法：返回最先成功的Promise结果，所有Promise都失败才失败
   * @param {MyPromise[]} promises - Promise数组
   * @returns {MyPromise} 最先成功的Promise
   */
  static any(promises) {
    return new MyPromise((resolve, reject) => {
      const reasons = [];
      promises.forEach((promise) => {
        promise.then(resolve, (err) => {
          reasons.push(err);
          if (reasons.length === promises.length) {
            reject(new AggregateError(reasons));
          }
        });
      });
    });
  }
}

// 测试代码部分
// 基础Promise功能测试
const promise = new MyPromise((resolve, reject) => {
  resolve("Hello, world!");    // 创建一个立即完成的Promise
  reject("Error occurred");    // 这行不会执行，因为Promise状态一旦改变就不可变
});

// 测试Promise链式调用
promise
  .then(
    (message) => {
      console.log("promise--", message);
    },
    (error) => {
      console.log("then-error--", error);
    }
  )
  .catch((error) => {
    console.log("catch-error--", error);
  })
  .finally(() => {
    console.log("Promise finally---");
  });

// 测试静态方法
MyPromise.resolve("Hello, world!").then((message) => {
  console.log("resolve--", message);
});
MyPromise.reject("Error occurred").catch((error) => {
  console.log("reject--", error);
});

// 创建测试用的Promise实例
const p2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject("Promise 2 rejected");
  }, 2000);
});

const p3 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise 3 resolved");
  }, 1000);
});

const p4 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise 4 resolved");
  }, 3000);
});

// 测试Promise.all方法
MyPromise.all([p2, p3, p4])
  .then((results) => {
    console.log("all---");
    console.log(results);
  })
  .catch((error) => {
    console.log(error);
  });

// 测试Promise.allSettled方法
MyPromise.allSettled([p2, p3, p4]).then((results) => {
  console.log("allsettled---");
  console.log(results);
});

// 测试Promise.race方法
MyPromise.race([p2, p3, p4])
  .then((result) => {
    console.log("race-resolve---");
    console.log(result);
  })
  .catch((error) => {
    console.log("race-reject---");
    console.log(error);
  });

// 测试Promise.any方法
MyPromise.any([p2, p3, p4])
  .then((result) => {
    console.log("any-resolve---");
    console.log(result);
  })
  .catch((error) => {
    console.log("any-reject---");
    console.log(error, error.errors);
  });
