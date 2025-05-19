// 定义事件总线类
class eventBus {
  constructor() {
    // 创建一个空对象用于存储事件
    this.eventBus = {};
  }

  // 订阅事件方法
  // eventName: 事件名称
  // eventCallback: 回调函数
  // thisArg: 回调函数的this指向
  on(eventName, eventCallback, thisArg) {
    // 获取当前事件名称对应的处理函数数组
    let handlers = this.eventBus[eventName];
    // 如果handlers不存在，初始化为空数组
    if (!handlers) {
      handlers = [];
      this.eventBus[eventName] = handlers;
    }
    // 将新的处理函数和this指向添加到数组中
    handlers.push({
      callback: eventCallback,
      thisArg: thisArg,
    });
  }

  // 取消订阅方法
  // eventName: 要取消的事件名称
  // eventCallback: 要取消的具体回调函数
  off(eventName, eventCallback) {
    // 获取事件对应的处理函数数组
    const handlers = this.eventBus[eventName];
    // 如果没有对应的事件处理数组，直接返回
    if (!handlers) return;
    // 创建处理函数数组的副本，避免遍历过程中修改数组导致的问题
    const newHandlers = [...handlers]
    // 遍历处理函数数组
    for (let i = 0; i < newHandlers.length; i++) {
      const handler = newHandlers[i];
      // 找到匹配的回调函数
      if (handler.callback === eventCallback) {
        // 获取在原数组中的索引
        const index = handlers.indexOf(handler);
        // 从原数组中删除该处理函数
        handlers.splice(index, 1);
      }
    }
  }

  // 触发事件方法
  // eventName: 要触发的事件名称
  // ...payload: 传递给回调函数的参数列表
  emit(eventName, ...payload) {
    // 获取事件对应的处理函数数组
    let handlers = this.eventBus[eventName];
    // 如果没有对应的处理函数，直接返回
    if (!handlers) return;
    // 遍历执行每个处理函数
    handlers.forEach((handler) => {
      // 使用apply调用回调函数，确保this指向正确，并传入参数
      handler.callback.apply(handler.thisArg, payload);
    });
  }
}

// 创建事件总线实例
const bus = new eventBus();

// 定义一个用于测试的回调函数
const handleCallback = (data) => {
    console.log("event1", data);
};

// 订阅事件示例1：添加一个可以被取消的事件监听
bus.on(
  "event",
  handleCallback,
  { name: "event1" }
);

// 订阅事件示例2：添加一个匿名回调函数作为事件监听
bus.on(
  "event",
  (data) => {
    console.log("event2", data);
  },
  { name: "event2" }
);

// 触发事件，两个监听器都会执行
bus.emit("event", { name: "event" });

// 取消第一个事件监听
bus.off("event", handleCallback);
// 再次触发事件，只有第二个监听器会执行
bus.emit("event", { name: "event" });
