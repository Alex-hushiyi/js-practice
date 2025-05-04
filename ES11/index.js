const maxInt = Number.MAX_SAFE_INTEGER; // 9007199254740991
const minInt = Number.MIN_SAFE_INTEGER; // -9007199254740991
const maxFloat = Number.MAX_VALUE; // 1.7976931348623157e+308
const minFloat = Number.MIN_VALUE; // 5e-324
const pi = Math.PI; // 3.141592653589793
const e = Math.E; // 2.718281828459045
console.log(maxInt);
console.log(minInt);
console.log(maxFloat);
console.log(minFloat);
console.log(pi);
console.log(e);

console.log(maxInt + 1);
console.log(maxInt + 2);

// BigInt
const bigInt = 900719925474099100n
console.log(bigInt + 10n); // 900719925474099110n

const num = 100
console.log(bigInt + BigInt(num)); // 900719925474099200n


const smallNum = Number(bigInt)
console.log(smallNum); // 900719925474099200

// Nullish Coalescing Operator
const a = null
const b = undefined
const c = 0

const foo = a ?? b ?? c ?? "default value"
console.log(foo); // 0
const bar = a || b || c || "default value"
console.log(bar); // "default value"

// Optional Chaining
const obj = {
    name: "lyh",
    age: 18,
    address: {
        city: "Beijing",
        country: "China"
    }
}
const city = obj.address?.city
console.log(city); // Beijing

// globalThis
console.log(globalThis); // { ... }  // globalThis是一个全局对象，包含了所有的全局变量和函数

// for...in...
for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const element = obj[key];
        console.log(`${key}: ${element}`);
        
    }
}
