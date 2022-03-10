import MyPromise from '../index'
const p = new MyPromise((resolve, reject) => {
    resolve(123)
})

p
.then()
.then()
.then()
.then(value => console.log(value))