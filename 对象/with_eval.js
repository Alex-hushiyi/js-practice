var obj = { message: "obj message" };
function foo() {
  function bar() {
    with (obj) {
      console.log(message);
      console.log("------");
    }
  }
  bar();
}

var info = { name: "kobe" };
with (info) {
  console.log(name);
}


var jsString = 'var message = "Hello World"; console.log(message);'

var message = "Hello World"
console.log(message)

eval(jsString)

setTimeout(function () {
  console.log(this)
}, 1000)