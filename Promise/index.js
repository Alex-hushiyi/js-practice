const promise = new Promise((resolve, reject) => {
  resolve("Hello, world!");
//   reject("Error occurred");
});

promise
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    console.log("Promise settled");
  });

  const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Promise 2 resolved");
    }, 2000);
  });
  const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Promise 3 resolved");
    }, 1000);
  }); 

  Promise.all([p2, p3])
  .then((results) => {
    console.log(results); // ["Promise 2 resolved", "Promise 3 resolved"]
  })
  .catch((error) => {
    console.error(error);
  })
  
  Promise.allSettled([p2, p3])
  .then((results) => {
    console.log(results); // [{status: "fulfilled", value: "Promise 2 resolved"}, {status: "fulfilled", value: "Promise 3 resolved"}]
  })

  Promise.race([p2, p3])
  .then((result) => {
    console.log(result); // "Promise 3 resolved"
  })
  .catch((error) => {
    console.error(error);
  })

  Promise.any([p2, p3])
  .then((result) => {
    console.log(result); // "Promise 2 resolved"
  })
  .catch((error) => {
    console.error(error);
  })