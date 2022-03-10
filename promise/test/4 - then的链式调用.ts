import MyPromise from '../index'
const p = new MyPromise((resolve, reject) => {
    resolve(123)
})

p.then(value => {
    console.log('1.', value)
    return 456
}).then(value => {
    console.log('2.', value)
})