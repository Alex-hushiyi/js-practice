class classRoom {
  constructor(address, name, students) {
    this.address = address;
    this.name = name;
    this.students = students;
  }
  entry(newStudent) {
    console.log(`欢迎来到${this.name}教室`);
    this.students.push(newStudent);
  }
  [Symbol.iterator]() {
    let i = 0;
    const students = this.students;
    return {
      next: () => {
        if (i < students.length) {
          return {
            value: students[i++],
            done: false,
          };
        } else {
          return {
            done: true,
            value: undefined,
          };
        }
      },
      return: () => {
        console.log("迭代器提前终止了~");
        return {
          done: true,
          value: undefined,
        };
      },
    };
  }
}

const classroom = new classRoom("北京", "前端", ["小明", "小红", "小刚"]);
// console.log(classroom);
classroom.entry("小白");

for (const student of classroom) {
  console.log(student);
}

function Person() {}

Person.prototype[Symbol.iterator] = function () {};
