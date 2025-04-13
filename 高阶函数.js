// var arr =[1,2,100,5,200,55]
// var nums = arr.filter((item,index,arr)=>{
//     return item % 2 === 0
// })
// console.log(nums)

// var arr =[1,2,100,5,200,55]
// var nums = arr.forEach((item,index)=>{
//     console.log(item);

// })
// console.log(nums)

// var arr = [1, 2, 100, 5, 200, 55];
// var nums = arr.findIndex((item) => {
//   return item === 10;
// });
// console.log(nums);

var arr = [1, 2, 100, 5, 200, 55];
var nums = arr.reduce((pre, item) => {
  return pre + item;
}, 0);
console.log(nums);
