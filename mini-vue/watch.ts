import { effect } from './reactive'

const watch = (target, callback, options = { immediate: false, flush: 'post'}) => {
    let getter
    if(typeof target !== 'function'){
        getter = () => traverse(target)
    }else{
        getter = target
    }
    let cleanup = null
    const onValidation = (fn) => {
        cleanup = fn
    }
    let oldValue, newValue
    const job = () => {
        newValue = effectFn()
        if(cleanup){
            cleanup()
        }
        callback(newValue, oldValue, onValidation)
        oldValue = newValue
    }
    const effectFn = effect(() => getter(), {
        lazy: true,
        scheduler(){
            if(options.flush === 'post'){
                const p = Promise.resolve()
                p.then(job)
            }else{
                job()
            }
        }
    })
    if(options.immediate){
        job()        
    }else{
        oldValue = effectFn()
    }
}

const traverse = (target, set = new Set()) => {
    if(typeof target !== 'object' || target === null ||set.has(target)) return
    set.add(target)
    for(let key in target){
        traverse(target[key], set)
    }
    return target
}

export default watch