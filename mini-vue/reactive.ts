export let activeEffect
let effectStack = []
const cleanup = (effectFn) => {
    effectFn.deps.forEach(deps => {
        deps.delete(effectFn)
    })
    effectFn.deps.length = 0
}
interface EffectOptions {
    lazy?: boolean,
    scheduler?: (fn: Function) => void
}
const effect = (fn, options: EffectOptions = {lazy: false}) => {
    const effectFn = () => {
        cleanup(effectFn)
        activeEffect = effectFn
        effectStack.push(effectFn)
        const res = fn()
        effectStack.pop()
        activeEffect = effectStack[effectStack.length - 1]
        return res
    }
    effectFn.deps = []
    effectFn.options = options
    if(!options.lazy){
        effectFn()
    }
    return effectFn
}

const bucket = new WeakMap()
const track = (target, key) => {
    if(!activeEffect) return
    let depsMap = bucket.get(target)
    !depsMap && bucket.set(target, (depsMap = new Map()))
    let deps = depsMap.get(key)
    !deps && depsMap.set(key, (deps = new Set()))
    deps.add(activeEffect)
    activeEffect.deps.push(deps)
}
const trigger = (target, key) => {
    const depsMap = bucket.get(target)
    if(!depsMap) return
    const effects = depsMap.get(key)
    const newEffect: Set<any> = new Set()
    effects && effects.forEach(effect => {
        if(effect !== activeEffect){
            newEffect.add(effect)
        }
    })
    newEffect && newEffect.forEach(effectFn => {
        if(effectFn.options.scheduler){
            effectFn.options.scheduler(effectFn)
        }else{
            effectFn()
        }
    })
}
const handler = {
    get(target, key){
        track(target, key)
        return target[key]
    },
    set(target, key, newValue){
        target[key] = newValue
        trigger(target, key)
        return true
    }
}

const reactive = (target) => {
    return new Proxy(target, handler)
}

export {
    effect,
    track,
    trigger
}

export default reactive