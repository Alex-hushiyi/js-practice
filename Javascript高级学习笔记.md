JavaScript高级语法

浏览器渲染过程：

<img src="D:\Project\JS\practice\public\image\浏览器渲染过程.png" alt="浏览器渲染过程" style="zoom:75%;" />

V8引擎的原理：

<img src="D:\Project\JS\practice\public\image\V8引擎原理.png" alt="V8引擎原理" style="zoom:75%;" />

常见的垃圾回收机制GC（Garbage Collection）算法：

引用计数：存在一个内存地址指向它是，对象引用+1，对象引用为0时销毁，弊端循环引用

标记清除：设置一个根对象（root object）垃圾回收器定期从这个根开始，找所有从根开始有引用到的对象，对于没有引用到的对象认为不可用

