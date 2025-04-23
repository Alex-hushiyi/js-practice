class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  sayHello() {
    console.log(
      `Hello, my name is ${this.name} and I am ${this.age} years old.`
    );
  }

  get info() {
    return `${this.name}, ${this.age} years old`;
  }
  set info(value) {
    const [name, age] = value.split(", ");
    this.name = name;
    this.age = parseInt(age);
  }
  static greet() {
    console.log("Hello from the Person class!");
  }
}

class Student extends Person {
  constructor(name, age, studentId) {
    super(name, age);
    this.studentId = studentId;
  }
  study() {
    console.log(`${this.name} is studying.`);
  }

  sayHello() {
    super.sayHello();
    console.log(`My student ID is ${this.studentId}.`);
  }
}

// 继承内置类
class ADate extends Date {
  constructor(year, month, day) {
    super(year, month, day);
  }
  getFormattedDate() {
    return `${this.getFullYear()}-${this.getMonth() + 1}-${this.getDate()}`;
  }
}

var AD = new ADate(2023, 10, 1);
console.log(AD.getFormattedDate()); // 2023-11-1

// 混入
function mixinRunner(BaseClass) {
  class NewClass extends BaseClass {
    running() {
      console.log("running~");
    }
  }
  return NewClass;
}

var ns = mixinRunner(Student);
ns.running(); // running~