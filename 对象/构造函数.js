// 构造函数
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayName = function () {
    console.log(this.name);
  };
}
var p1 = new Person("kobe", 18);
var p2 = new Person("james", 20);
console.log(p1);
console.log(p2);