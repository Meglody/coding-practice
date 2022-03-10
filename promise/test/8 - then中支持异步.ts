import MyPromise from '../index'
const p = new MyPromise((resolve, reject) => {
    resolve(123)
})

// 按如下数字顺序，则正确
p.then(value => {
    console.log('1 ===> ', value)
    setTimeout(() => {
        console.log('4 ===> ', value)
    });
}).then(value => {
    console.log('3 ===> ', value)
})


p.then(value => {
    console.log('2 ===> ', value)
})