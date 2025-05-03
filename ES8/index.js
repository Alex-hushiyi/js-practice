// Object value
const obj = {
    name: "John",
    age: 30,
}

console.log(Object.keys(obj)) // ['name', 'age'];
console.log(Object.values(obj)) // ['John', 30];

// Object entries

console.log(Object.entries(obj)) // [['name', 'John'], ['age', 30]];

// String Padding

const message = "Hello World"

const message2 = message.padStart(20, "*") // **********Hello World
const message3 = message.padEnd(20, "-") // Hello World-----
console.log(message2);
console.log(message3);

// Trailing Commas 结尾逗号
function foo(m, n,) {

}

foo(20, 30,)


// Object Descriptors

const descriptor = Object.getOwnPropertyDescriptor(obj, "name")
console.log(descriptor) // { value: 'John', writable: true, enumerable: true, configurable: true }

// async function
async function foo() {
    // await
  }