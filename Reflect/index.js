const obj = {
  _name: "John",
  age: 30,
  get name() {
    return this._name;
  },
  set name(newValue) {
    this._name = newValue;
  },
};

const objProxy = new Proxy(obj, {
  get(target, prop, receiver) {
    console.log(`Getting property ${prop}`, receiver);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    console.log(`Setting property ${prop} to ${value}`, receiver);
    Reflect.set(target, prop, value, receiver);
  },
});
console.log(objProxy.name); // Getting property name
objProxy.name = "Jane"; // Setting property name to Jane

function Student(name, age) {
  this.name = name;
  this.age = age;
}

function Teacher() {
  
}

const student = new Student("John", 30);
console.log(student);
console.log(student.__proto__ === Student.prototype); // true

const teacher = Reflect.construct(Teacher, ["kobe", 20], Teacher);
console.log(teacher);
console.log(teacher.__proto__ === Teacher.prototype); // true

