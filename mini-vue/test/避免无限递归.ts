import reactive, { effect } from '../reactive'
const data = {
    foo: 1,
}
const obj = reactive(data)

effect(() => {
    obj.foo++
    console.log(obj.foo)
})