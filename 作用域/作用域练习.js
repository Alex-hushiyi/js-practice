// 1.
// var n = 100;
// function foo() {
//   n = 200;
// }
// foo()
// console.log(n);

//2.
// function foo() {
//     console.log(n);
//     var n = 200;
//     console.log(n);
// }

// var n = 100;
// foo();

//3.
// var n = 100;

// function foo() {
//     console.log(n);
// }

// function bar() {
//     var n = 200;
//     console.log(n);
//     foo();
// }

// bar();
// console.log(n);

//4.
// var n = 100;

// function foo() {
//   console.log(n);
//   return;
//   var n = 200;
// }
// foo();

//5.
// function foo() {
//   var a = (b = 100);
// }
// foo();
// console.log(a);
// console.log(b);