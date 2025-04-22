var obj = {};

console.log(obj.__proto__);
console.log(Object.getPrototypeOf(obj));

function Person(name, age, height, address) {
  this.name = name;
  this.age = age;
  this.height = height;
  this.address = address;
}

Person.prototype.sayName = function () {
  console.log(this.name);
};
Person.prototype.sayAge = function () {
  console.log(this.age);
};

var p1 = new Person("kobe", 18, 1.88, "beijing");
var p2 = new Person("james", 20, 1.98, "shanghai");

p1.sayName();
p2.sayAge();

console.log(p1);
console.log(p2);

Person.prototype = {
    constructor: Person,
    sayName: function () {
        console.log(this.name);
    },
    sayAge: function () {
        console.log(this.age);
    },
};

console.log(Person.prototype.constructor.name); // Person

Person.prototype.constructor


