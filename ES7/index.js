// ES7
// 1. Array.prototype.includes
const names = ["abc", "cba", "nba", "mba", NaN]

console.log(names.indexOf("abc")) // 0;
console.log(names.indexOf("abc", 1)) // -1
console.log(names.indexOf(NaN)) // -1;



console.log(names.includes("abc")) // true
console.log(names.includes(NaN)) // true;

// 指数运算符
const result = Math.pow(2, 3) // 8

const result2 = 2 ** 3 // 8
console.log(result,result2)