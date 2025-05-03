const nums = [10, 20, [2, 9], [[30, 40], [10, 45]], 78, [55, 88]]

const flat = nums.flat(2) // 2 is the depth of the array
console.log(flat) // [10, 20, 2, 9, 30, 40, 10, 45, 78, 55, 88]

const num = [1, 2, 3, 4, 5]
const newNum =  num.flatMap((item) => {
    return item * 2
})

console.log(newNum);


const messages = ["hello world","nihao lyh","mmy name is lyh"]
const newMessages = messages.flatMap((item) => {
    return item.split(" ")
})
console.log(newMessages); // ["hello", "world", "nihao", "lyh", "mmy", "name", "is", "lyh"]

const obj = {
    name: "John",
    age: 30,
    gender:"man"
}

const entries = Object.entries(obj)
console.log(entries);


const newObj = Object.fromEntries(entries)
console.log(newObj);

const queryString = 'name=why&age=18&height=1.88'
const params = new URLSearchParams(queryString)
console.log(params);

const newParams = Object.fromEntries(params)
console.log(newParams); // { name: 'why', age: '18', height: '1.88' }


// trimStart and trimEnd
const str = "   hello world   "
const newStr = str.trimStart()
console.log(newStr); // "hello world   "
const newStr2 = str.trimEnd()
console.log(newStr2); // "   hello world"

const s = Symbol("foo")
console.log(s.description);
