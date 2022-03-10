var PENDING = 'PENDING';
var FULFILLED = 'FULFILLED';
var REJECTED = 'REJECTED';
var MyPromise = /** @class */ (function () {
    function MyPromise(excutor) {
        var _this = this;
        this.currentStatus = PENDING;
        this.result = '';
        this.reason = '';
        this.fulfilledStack = [];
        this.rejectedStack = [];
        this.resolve = function (payload) {
            if (_this.currentStatus === PENDING) {
                _this.currentStatus = FULFILLED;
                _this.result = payload;
                _this.fulfilledStack.forEach(function (myFn) { return myFn(_this.result); });
            }
        };
        this.reject = function (error) {
            if (_this.currentStatus === PENDING) {
                _this.currentStatus = REJECTED;
                _this.reason = error;
                _this.rejectedStack.forEach(function (myFn) { return myFn(_this.reason); });
            }
        };
        this.then = function (onFulfilled, onRejected) {
            onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (result) { return result; };
            onRejected = typeof onRejected === 'function' ? onRejected : function (reason) { throw reason; };
            var promise2 = new MyPromise(function (resolve, reject) {
                if (_this.currentStatus === PENDING) {
                    _this.fulfilledStack.push(function () {
                        try {
                            queueMicrotask(function () {
                                try {
                                    var x = onFulfilled(_this.result);
                                    resolvePromise(promise2, x, resolve, reject);
                                }
                                catch (error) {
                                    reject(error);
                                }
                            });
                        }
                        catch (error) {
                            reject(error);
                        }
                    });
                    _this.rejectedStack.push(function () {
                        try {
                            queueMicrotask(function () {
                                try {
                                    var x = onRejected(_this.reason);
                                    resolvePromise(promise2, x, resolve, reject);
                                }
                                catch (error) {
                                    reject(error);
                                }
                            });
                        }
                        catch (error) {
                            reject(error);
                        }
                    });
                }
                else if (_this.currentStatus === FULFILLED) {
                    try {
                        queueMicrotask(function () {
                            try {
                                var x = onFulfilled(_this.result);
                                resolvePromise(promise2, x, resolve, reject);
                            }
                            catch (error) {
                                reject(error);
                            }
                        });
                    }
                    catch (error) {
                        reject(error);
                    }
                }
                else if (_this.currentStatus === REJECTED) {
                    try {
                        queueMicrotask(function () {
                            try {
                                var x = onRejected(_this.reason);
                                resolvePromise(promise2, x, resolve, reject);
                            }
                            catch (error) {
                                reject(error);
                            }
                        });
                    }
                    catch (error) {
                        reject(error);
                    }
                }
            });
            return promise2;
        };
        this.excutor = excutor;
        try {
            this.excutor(this.resolve, this.reject);
        }
        catch (e) {
            this.reject(e);
        }
    }
    MyPromise.resolve = function (result) {
        if (result instanceof MyPromise) {
            return result;
        }
        return new MyPromise(function (resolve, _) {
            resolve(result);
        });
    };
    MyPromise.reject = function (reason) {
        return new MyPromise(function (_, reject) {
            reject(reason);
        });
    };
    MyPromise.deferred = function () {
        var result = {
            promise: null,
            resolve: null,
            reject: null
        };
        result.promise = new MyPromise(function (resolve, reject) {
            result.resolve = resolve;
            result.reject = reject;
        });
        return result;
    };
    return MyPromise;
}());
module.exports = MyPromise;
var resolvePromise = function (promise2, x, resolve, reject) {
    if (x === promise2) {
        reject(new TypeError('Chaining cycle detected for promise #<MyPromise>'));
    }
    if (typeof x === 'object' || typeof x === 'function') {
        // null 直接当作一般值 resolve
        if (x === null) {
            return resolve(x);
        }
        var then = void 0;
        try {
            then = x.then;
        }
        catch (error) {
            reject(error);
        }
        // x 不简单，x.then 是一个函数
        if (typeof then === 'function') {
            var called_1 = false;
            try {
                then.call(x, function (y) {
                    if (called_1)
                        return;
                    called_1 = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, function (r) {
                    if (called_1)
                        return;
                    called_1 = true;
                    reject(r);
                });
            }
            catch (error) {
                if (called_1)
                    return;
                called_1 = true;
                reject(error);
            }
            // x.then 不是一个函数，因此 x 是一个普通的对象
        }
        else {
            resolve(x);
        }
        // x 既不是 object 也不是 function，是一个一般值
    }
    else {
        resolve(x);
    }
};
