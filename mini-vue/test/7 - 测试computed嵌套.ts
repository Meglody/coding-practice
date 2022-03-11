import computed from '../computed'
import reactive from '../reactive'

const data = {
    foo: 1,
    bar: 2,
}

const obj = reactive(data)

const sum = computed(() => obj.foo + obj.bar)

const sumcopy = computed(() => sum.value)

console.log(sumcopy.value)
obj.foo++
console.log(sum.value, sumcopy.value)