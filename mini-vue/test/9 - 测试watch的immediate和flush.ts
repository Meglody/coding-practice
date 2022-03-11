import reactive, { effect } from '../reactive'
import watch from '../watch'
// import { reactive, watch } from 'vue' // use node >= 16.0.0 and change file to .mjs ext
const data = {
    foo: 1
}

const obj = reactive(data)

// 同步的宏任务快
watch(() => obj.foo , (nv, ov) => {
    console.log('sync', nv, ov)
}, {
    immediate: true,
    flush: 'sync'
})

// post的推入了微任务队列，慢
watch(() => obj.foo , (nv, ov) => {
    console.log('post', nv, ov)
}, {
    immediate: true,
    flush: 'post'
})

setTimeout(() => {
    obj.foo++
}, 1000);