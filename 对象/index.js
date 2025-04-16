var obj = new Object();
obj.message = "obj message";

var info = { 
    name: "kobe",
    _age: 18,
    set age(value) {
        this._age = value;
    },
    get age() {
        return this._age; ;
    }
 };

Object.defineProperty(obj, "name", {
  value: "kobe",
  writable: false,
  enumerable: true,
  configurable: false,
});

// 存取属性描述符
Object.defineProperty(obj, "age", {
  enumerable: true,
  configurable: true,
  get: function () {
    return 18;
  },
  set: function (value) {
    console.log(value);
  },
});

Object.defineProperties(info, {
  address: {
    value: "beijing",
    writable: false,
    enumerable: true,
    configurable: false,
  },
  age: {
    enumerable: true,
    configurable: true,
    get: function () {
      return 18;
    },
    set: function (value) {
      console.log(value);
    },
  },
});


// 获取属性描述符
console.log(Object.getOwnPropertyDescriptor(obj, "name"));
console.log(Object.getOwnPropertyDescriptor(obj, "age"));

// 禁止对象继续添加新属性
Object.preventExtensions(obj);
obj.height = 1.8;

console.log(obj); // undefined

// 禁止对象配置/删除内部属性
Object.seal(obj);
delete obj.name;
console.log(obj); // undefined

// 属性不可修改
Object.freeze(obj);
obj.name = "james";
console.log(obj); // undefined