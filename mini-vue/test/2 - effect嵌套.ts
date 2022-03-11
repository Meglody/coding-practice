import reactive, { effect } from '../reactive'
const data = {
    foo: 1,
    bar: 2
}
const obj = reactive(data)
let temp1,temp2

effect(() => {
    console.log('effectFn1执行了')
    effect(() => {
        console.log('effectFn2执行了')
        temp2 = obj.bar
    })
    temp1 = obj.foo
})

obj.foo = 2