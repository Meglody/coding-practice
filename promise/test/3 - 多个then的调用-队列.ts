import MyPromise from '../index'
const p = new MyPromise((resolve, reject) => {
    // resolve(123)
    setTimeout(() => {
        resolve(123)
    }, 2000);
})

p.then(value => {
    console.log('1.', value)
})

p.then(value => {
    console.log('2.', value)
})

p.then(value => {
    console.log('3.', value)
})