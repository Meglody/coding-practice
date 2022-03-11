import reactive, { effect } from '../reactive'
const data = {
    foo: 1,
}
const obj = reactive(data)

const jobQueue: Set<any> = new Set()
let isFlushing = false
const flushJobs = () => {
    if(isFlushing) return
    const p = Promise.resolve()
    isFlushing = true
    p
    .then(() => jobQueue.forEach(job => job()))
    .finally(() => {
        isFlushing = false
    })
}

effect(() => {
    console.log(obj.foo)
}, {
    scheduler(fn){
        jobQueue.add(fn)
        flushJobs()
    }
})

obj.foo++
obj.foo++
obj.foo++
obj.foo++
obj.foo++
obj.foo++