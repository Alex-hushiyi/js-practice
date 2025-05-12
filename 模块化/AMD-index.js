require.config({
  baseUrl: "",
  paths: {
    foo: "./src/foo",
    bar: "./src/bar",
  },
});

require(["foo", "bar"], function (foo) {
  console.log("main:", foo);
});

// foo.js
define(function () {
  const name = "why";
  const age = 18;
  function sum(num1, num2) {
    return num1 + num2;
  }

  return {
    name,
    age,
    sum,
  };
});

// bar.js
define(["foo"], function (foo) {
  console.log("--------");
  // require(["foo"], function(foo) {
  //   console.log("bar:", foo)
  // })

  console.log("bar:", foo);
});
