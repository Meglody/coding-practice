import MyPromise from '../index'
MyPromise.resolve(123).then(value => {
    console.log(1, value) // 这行会被打印
})

MyPromise.reject(456).then(value => {
    console.log(2, value)
}, reason => {
    console.log(3, reason) // 这行会被打印
})