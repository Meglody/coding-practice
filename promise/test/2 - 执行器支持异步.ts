import MyPromise from '../index'
const p = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(123)
    }, 1000);
})

p.then(value => {
    console.log('value ===>', value)
}, reason => {
    console.log('reason ===> ', reason)
})