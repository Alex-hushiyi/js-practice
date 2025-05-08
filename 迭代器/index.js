const iterator = {
    next: function () {
        return {
            value: 1,
            done: false
        };
    }
}

const names = ["Alice", "Bob", "Charlie"];

let i = 0;

const namesIterator = {
    next: function () {
        if (i < names.length) {
            return {
                value: names[i++],
                done: false
            };
        } else {
            return {
                done: true,
                value: undefined
            };
        }
    }
};

console.log(namesIterator.next()); // { value: "Alice", done: false }
console.log(namesIterator.next()); // { value: "Bob", done: false }
console.log(namesIterator.next()); // { value: "Charlie", done: false }
console.log(namesIterator.next()); // { done: true, value: undefined }

// 生成迭代器函数
function createIterator() {
    let i = 0;
    return {
        next: function () {
            if (i < names.length) {
                return {
                    value: names[i++],
                    done: false
                };
            } else {
                return {
                    done: true,
                    value: undefined
                };
            }
        }
    };
}

const nums = [1, 2, 3, 4, 5];
const numsIterator = createIterator(nums);
console.log(numsIterator.next()); // { value: 1, done: false }
console.log(numsIterator.next()); // { value: 2, done: false }
console.log(numsIterator.next()); // { value: 3, done: false }
console.log(numsIterator.next()); // { value: 4, done: false }
console.log(numsIterator.next()); // { value: 5, done: false }
console.log(numsIterator.next()); // { done: true, value: undefined }


// 无限迭代器
function createInfiniteIterator() {
    let i = 0;
    return {
        next: function () {
            return {
                value: i++,
                done: false
            };
        }
    };
}