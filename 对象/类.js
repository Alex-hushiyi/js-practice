class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    sayHello() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }

    get info() {
        return `${this.name}, ${this.age} years old`;
    }
    set info(value) {
        const [name, age] = value.split(', ');
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