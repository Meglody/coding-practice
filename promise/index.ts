const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'
class MyPromise {
    excutor: any
    constructor(excutor){
        this.excutor = excutor
        try{
            this.excutor(this.resolve, this.reject)
        }catch(e){
            this.reject(e)
        }
    }
    currentStatus = PENDING
    result = ''
    reason = ''
    fulfilledStack = []
    rejectedStack = []
    resolve = (payload) => {
        if(this.currentStatus === PENDING){
            this.currentStatus = FULFILLED
            this.result = payload
            this.fulfilledStack.forEach(myFn => myFn(this.result));
        }
    }
    reject = (error) => {
        if(this.currentStatus === PENDING){
            this.currentStatus = REJECTED
            this.reason = error
            this.rejectedStack.forEach(myFn => myFn(this.reason))
        }
    }
    then = (onFulfilled?, onRejected?) => {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : result => result
        onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason}
        const promise2 = new MyPromise((resolve, reject) => {
            if(this.currentStatus === PENDING){
                this.fulfilledStack.push(() => {
                    try {
                        queueMicrotask(() => {
                            try {
                                const x = onFulfilled(this.result)
                                resolvePromise(promise2, x, resolve, reject)
                            } catch (error) {
                                reject(error)
                            }
                        })
                    } catch (error) {
                        reject(error)
                    }
                })
                this.rejectedStack.push(() => {
                    try {
                        queueMicrotask(() => {
                            try {
                                const x = onRejected(this.reason)
                                resolvePromise(promise2, x, resolve, reject)
                            } catch (error) {
                                reject(error)
                            }
                        })
                    } catch (error) {
                        reject(error)
                    }
                })
            }else if(this.currentStatus === FULFILLED){
                try {
                    queueMicrotask(() => {
                        try {
                            const x = onFulfilled(this.result)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    })
                } catch (error) {
                    reject(error)
                }
            }else if(this.currentStatus === REJECTED){
                try {
                    queueMicrotask(() => {
                        try {
                            const x = onRejected(this.reason)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    })
                } catch (error) {
                    reject(error)
                }
            }
        })
        return promise2
    }

    static resolve = (result) => {
        if(result instanceof MyPromise){
            return result
        }
        return new MyPromise((resolve, _) => {
            resolve(result)
        })
    }

    static reject = (reason) => {
        return new MyPromise((_, reject) => {
            reject(reason)
        })
    }

    static deferred = () => {
        var result = {
            promise:null,
            resolve:null,
            reject:null,
        };
        result.promise = new MyPromise(function (resolve, reject) {
            result.resolve = resolve;
            result.reject = reject;
        });
        return result;
    }
}

module.exports = MyPromise

const resolvePromise = (promise2, x, resolve, reject) => {
    if(x === promise2){
        reject(new TypeError('Chaining cycle detected for promise #<MyPromise>'))
    }
    
    if(typeof x === 'object' || typeof x === 'function'){
        // null 直接当作一般值 resolve
        if(x === null){
            return resolve(x)
        }

        let then
        try {
            then = x.then
        } catch (error) {
            reject(error)
        }

        // x 不简单，x.then 是一个函数
        if(typeof then === 'function'){
            let called = false
            try {
                then.call(x, y => {
                    if(called) return 
                    called = true
                    resolvePromise(promise2, y, resolve, reject)
                }, r => {
                    if(called) return 
                    called = true
                    reject(r)
                })
            } catch (error) {
                if(called) return 
                called = true
                reject(error)
            }
        // x.then 不是一个函数，因此 x 是一个普通的对象
        }else{
            resolve(x)
        }
    // x 既不是 object 也不是 function，是一个一般值
    }else{
        resolve(x)
    }
}