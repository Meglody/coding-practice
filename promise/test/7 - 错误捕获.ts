import MyPromise from '../index'

// 执行器中的错，应该能在第一个then中的onRejected中捕获
const p = new MyPromise((resolve, reject) => {
    throw new Error('执行器错误')
})

p.then(value => {
    console.log('1.', value)
}, reason => {
    console.log('2.', reason) // 应该只打印这一条
})

// 链式调用，上一个then抛的错，应该在下一个then的onRejected中捕获
const p2 = new MyPromise((resolve, reject) => {
    resolve(123)
})

p2.then(value => {
    console.log('3.', value) // 应该打印这一条
    throw new Error('then 错误')
}, reason => {
    console.log('4.', reason)
}).then(value => {
    console.log('5.', value)
}, reason => {
    console.log('6.', reason) // 应该打印这一条
})