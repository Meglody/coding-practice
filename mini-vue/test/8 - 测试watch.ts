import reactive, { effect } from '../reactive'
import watch from '../watch'
// import { reactive, watch } from 'vue' // use node >= 16.0.0 and change file to .mjs ext
const data = {
    foo: 1
}

const obj = reactive(data)

watch(obj, (nv, ov) => {
    console.log(nv, ov)
})

setTimeout(() => {
    obj.foo++
}, 1000);