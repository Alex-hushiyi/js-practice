// 工厂模式/工厂函数
function createPerson(name, age) {
  var obj = new Object();
  obj.name = name;
  obj.age = age;
  obj.sayName = function () {
    console.log(this.name);
  };
  return obj;
}
var p1 = createPerson("kobe", 18);
var p2 = createPerson("james", 20);

console.log(p1);
console.log(p2);
