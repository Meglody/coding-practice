import computed from '../computed'
import reactive from '../reactive'

const data = {
    foo: 1,
    bar: 2,
}

const obj = reactive(data)

const count = computed(() => obj.foo + obj.bar)

console.log(count.value)
obj.foo++
console.log(count.value)