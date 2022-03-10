import MyPromise from '../index'
const p = new MyPromise((resolve, reject) => {
    resolve(123)
    reject(456)
})
p.then(value => {
    console.log('value ===>', value)
}, reason => {
    console.log('reason ===> ', reason)
})