import reactive, { effect } from '../reactive'

const data = {
    show: true,
    foo: 1,
    bar: 2, 
}

const obj = reactive(data)


effect(() => {
    console.log(obj.show ? obj.foo : 'not')
})

obj.show = false
obj.foo = 2