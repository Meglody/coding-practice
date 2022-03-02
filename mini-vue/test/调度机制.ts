import reactive, { effect } from '../reactive'
const data = {
    foo: 1,
}
const obj = reactive(data)

effect(() => {
    console.log(obj.foo)
}, {
    scheduler(fn){
        setTimeout(fn);
    }
})

obj.foo++
console.log('结束了')