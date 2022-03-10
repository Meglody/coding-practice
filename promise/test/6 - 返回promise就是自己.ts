import MyPromise from '../index'
const p = new MyPromise((resolve, reject) => {
    resolve(123)
})

// 正确的结果应该是，1打印了，3打印了错误信息
const p1 = p.then(value => {
    console.log('1.', value)
    return p1
})

p1.then(value => {
    console.log('2.', value)
}, reason => {
    console.log('3.', reason)
})