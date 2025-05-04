// ES12 features
// FinalizationRegistry
const obj = {
    name: "lyh",
    age: 18,
    address: {
        city: "Beijing",
        country: "China"
    }
}

const finalRegistry = new FinalizationRegistry((heldValue) => {
    console.log(`FinalizationRegistry: ${heldValue}`);
})
finalRegistry.register(obj, "lyh")
console.log(finalRegistry);
// finalRegistry.unregister(obj)
// console.log(finalRegistry);

// obj = null

const info = new WeakRef(obj)
console.log(info.deref()); // { name: 'lyh', age: 18, address: { city: 'Beijing', country: 'China' } }


// logical assignment operators
// ||= 逻辑或赋值
const a = "hello"
a ||= "world"
console.log(a); // hello

// &&= 逻辑与赋值
let b = {name: "lyh"}
b &&= b.name
console.log(b); // lyh

// ??= 空值合并赋值
let c = null
c ??= "default value"
console.log(c); // default value