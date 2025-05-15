const dbRequest = indexedDB.open("myDatabase", 1);

dbRequest.onerror = function (event) {
  console.error("Error opening database:", event.target.error);
};

dbRequest.onsuccess = function (event) {
  const db = event.target.result;
  console.log("Database opened successfully:", db);
  // Perform database operations here
};

dbRequest.onupgradeneeded = function (event) {
  const db = event.target.result;
  console.log("Database upgrade needed:", db);
  // Create an object store if it doesn't exist
  if (!db.objectStoreNames.contains("myObjectStore")) {
    const objectStore = db.createObjectStore("myObjectStore", {
      keyPath: "id",
    });
    console.log("Object store created:", objectStore);
  }
};

class User {
  constructor(id, name, age) {
    this.id = id;
    this.name = name;
    this.age = age;
  }
}

const users = [
  new User(1, "Alice", 25),
  new User(2, "Bob", 30),
  new User(3, "Charlie", 35),
];

function addUsers(store) {
  users.forEach((user) => {
    const request = store.add(user);
    request.onsuccess = function (event) {
      console.log("User added:", event.target.result);
    };
    request.onerror = function (event) {
      console.error("Error adding user:", event.target.error);
    };
  });
}

function Operation(index, store) {
  const request = store.openCursor();
  request.onsuccess = function (event) {
    const cursor = event.target.result;
    if (cursor) {
      if (cursor.key === index) {
        // 这里的 index 是用户的 id对应按钮的索引
        switch (index) {
          case 0:
            // cursor.update({ ...cursor.value, age: 18 });
            break;
          case 1:
            console.log("查询用户");
            console.log(cursor.key, cursor.value);
            break;
          case 2:
            console.log("更新用户");
            const value = cursor.value;
            value.name = "Alex";
            cursor.update(value);
            console.log(cursor.key, cursor.value);
            break;
          case 3:
            console.log("删除用户");
            cursor.delete();
            break;
        }
      } else {
        cursor.continue();
      }
    } else {
      console.log("查询完成");
    }
  };
}

const btns = document.querySelectorAll("button");
btns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    console.log("Button clicked:", index);
    const db = dbRequest.result;
    const transaction = db.transaction("myObjectStore", "readwrite");
    const objectStore = transaction.objectStore("myObjectStore");

    switch (index) {
      case 0:
        console.log("Add users to the object store.");
        addUsers(objectStore);
        transaction.oncomplete = function () {
          console.log("添加操作全部完成");
        };
        break;
      case 1:
        console.log("Get user from the object store.");
        Operation(index, objectStore);
        break;
      case 2:
        console.log("Update user from the object store.");
        Operation(index, objectStore);
        break;
      case 3:
        console.log("Delete user from the object store.");
        Operation(index, objectStore);
        break;
    }
  });
});
