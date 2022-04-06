const obj = {
    a: 123,
    b(s0, s1){
        return `${this.a}, ${s0} - ${s1}`
    }
}

const obj2 = {
    a: 456
}

function myCall(context, ...args){
    context.fn = this
    let res
    try {
        res = context.fn(...args)
        delete context.fn
    } catch (error) {
        throw error
    }
    return res
}

function myApply(context, [...args]){
    context.fn = this
    let res
    try {
        res = context.fn(...args)
        delete context.fn
    } catch (error) {
        throw error
    }
    return res
}

function myBind(context, ...args){
    return (...rest) => {
        return this.myCall(context, ...args, ...rest)
    }
}

interface Function {
    myCall(this: Function, thisArg: any, ...argArray: any[]): any;
    myBind(this: Function, thisArg: any, ...argArray: any[]): any;
    myApply(this: Function, thisArg: any, argArray?: any): any;
}

Function.prototype.myCall = myCall
Function.prototype.myApply = myApply
Function.prototype.myBind = myBind

const res1 = obj.b.myCall(obj2, 'hi', 'javascript')
const res2 = obj.b.myApply(obj2, ['hi', 'javascript'])
const _fn_1 = obj.b.myBind(obj2, 'hi', 'javascript')
const _fn_2 = obj.b.myBind(obj2, 'hi')
const _fn_3 = obj.b.myBind(obj2)
console.log(res1)
console.log(res2)
console.log(_fn_1())
console.log(_fn_2('javascript'))
console.log(_fn_3('hi', 'javascript'))
console.log(obj2)
