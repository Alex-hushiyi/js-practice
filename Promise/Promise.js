const PROMISE_STATUS_PENDING = "pending";
const PROMISE_STATUS_FULFILLED = "fulfilled";
const PROMISE_STATUS_REJECTED = "rejected";

function execFunctionWithCatchError(exectorFn, value, resolve, reject) {
  try {
    const result = exectorFn(value);
    resolve(result); // 调用 resolve 方法
  } catch (error) {
    // 捕获错误并调用 reject
    reject(error);
  }
}

class MyPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledFns = [];
    this.onRejectedFns = [];

    const resolve = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return;
          this.status = PROMISE_STATUS_FULFILLED;
          this.value = value;
          this.onFulfilledFns.forEach((fn) => fn(this.value));
        });
      }
    };
    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 添加微任务
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return;
          this.status = PROMISE_STATUS_REJECTED;
          this.reason = reason;
          this.onRejectedFns.forEach((fn) => fn(this.reason));
        });
      }
    };
    executor(resolve, reject);
  }

  then(onFulfilled, onRejected) {
    // 如果 onRejected 不是函数，则使用默认函数,解决catch方法无回调问题
    const defaultOnRejected = (error) => {
      throw error;
    };
    onRejected = onRejected || defaultOnRejected;

    // 如果 onFulfilled 不是函数，则使用默认函数,解决finally方法无回调问题
    const defaultOnFulfilled = (value) => value;
    onFulfilled = onFulfilled || defaultOnFulfilled;

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

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  finally(onFinally) {
    // 这里的 finally 方法是为了兼容 Promise/A+ 规范
    this.then(
      () => onFinally(),
      () => onFinally()
    );
  }

  static resolve(value) {
    return new MyPromise((resolve) => resolve(value));
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => reject(reason));
  }

  static all(promises) {
    return new MyPromise((resolve, reject) => {
      const values = [];
      promises.forEach((promise) => {
        promise.then(
          (res) => {
            values.push(res);
            if (values.length === promises.length) {
              resolve(values);
            }
          },
          (err) => {
            reject(err);
          }
        );
      });
    });
  }

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

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise) => {
        // 优化代码
        promise.then(resolve, reject);
        // 正常代码
        // promise.then(
        //   (res) => {
        //     resolve(res);
        //   },
        //   (err) => {
        //     reject(err);
        //   }
        // );
      });
    });
  }

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

const promise = new MyPromise((resolve, reject) => {
  resolve("Hello, world!");
  reject("Error occurred");
});

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

MyPromise.resolve("Hello, world!").then((message) => {
  console.log("resolve--", message);
});
MyPromise.reject("Error occurred").catch((error) => {
  console.log("reject--", error);
});

const p2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    // resolve("Promise 2 resolved");
    reject("Promise 2 rejected");
  }, 2000);
});

const p3 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise 3 resolved");
    // reject("Promise 3 rejected");
  }, 1000);
});

const p4 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise 4 resolved");
    // reject("Promise 4 rejected");
  }, 3000);
});

MyPromise.all([p2, p3, p4])
  .then((results) => {
    console.log("all---");
    console.log(results); // 
  })
  .catch((error) => {
    console.log(error);
  });

MyPromise.allSettled([p2, p3, p4]).then((results) => {
  console.log("allsettled---");
  console.log(results); // 
});

MyPromise.race([p2, p3, p4])
  .then((result) => {
    console.log("race-resolve---");
    console.log(result); // 
  })
  .catch((error) => {
    console.log("race-reject---");
    console.log(error); // 
  });

MyPromise.any([p2, p3, p4]).then((result) => {
  console.log("any-resolve---");
  console.log(result); // 
}).catch((error) => {
  console.log("any-reject---");
  console.log(error,error.errors); // 
})
