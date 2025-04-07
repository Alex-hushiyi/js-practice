# JavaScript高级语法

## 浏览器

### 事件循环：

#### 进程：

程序运行需要它自己专属的内存空间，可以把这块内存空间简单的理解为进程

每个应用至少有一个进程，进程之间相互独立，即使要通信也需要双方同意

![image-20250408000839716](C:\Users\Mr.Hu\AppData\Roaming\Typora\typora-user-images\image-20250408000839716.png)

#### 线程：

### 浏览器渲染过程：

<img src="D:\Project\JS\practice\public\image\浏览器渲染过程.png" alt="浏览器渲染过程" style="zoom:75%;" />

### V8引擎的原理：

<img src="D:\Project\JS\practice\public\image\V8引擎原理.png" alt="V8引擎原理" style="zoom:75%;" />

### 常见的垃圾回收机制GC（Garbage Collection）算法：

引用计数：存在一个内存地址指向它是，对象引用+1，对象引用为0时销毁，弊端循环引用

标记清除：设置一个根对象（root object）垃圾回收器定期从这个根开始，找所有从根开始有引用到的对象，对于没有引用到的对象认为不可用

