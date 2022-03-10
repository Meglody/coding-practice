import MyPromise from '../index'
const p = new MyPromise((resolve, reject) => {
    resolve(123)
})

// 打印null
p.then(() => {
    return null
}).then(res => {
    console.log(res)
}, reason => {
    console.error(reason)
})

// 打印456
p.then(() => {
    return {
        then: (resolve, reject) => {
            resolve(456)
        }
    }
}).then(res => {
    console.log(res)
}, reason => {
    console.error(reason)
})

// 打印456
p.then(() => {
    const fn = () => {}
    fn.then = (resolve, reject) => {
        resolve(456)
    }
    return fn
}).then(res => {
    console.log(res)
}, reason => {
    console.error(reason)
})


// 打印 {then: 'then'}
p.then(() => {
    return {
        then: 'then'
    }
}).then(res => {
    console.log(res)
}, reason => {
    console.error(reason)
})

// 打印 {foo: 'foo'}
p.then(() => {
    return {
        foo: 'foo'
    }
}).then(res => {
    console.log(res)
}, reason => {
    console.error(reason)
})