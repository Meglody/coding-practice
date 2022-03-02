import { effect, track, trigger, activeEffect } from './reactive'

const computed = (fn) => {
    let dirty = true
    let value
    const effectFn = effect(fn, {
        lazy: true,
        scheduler(){
            // 一旦触发了设置操作，调度器把脏值重置，等待下一次value的读取再调用副作用函数
            if(!dirty){
                dirty = true
                trigger(obj, 'value')
            }
        }
    })

    const obj = {
        get value(){
            // 每读取一次value都会因为调度制度调用一次副作用函数
            // 检查脏值，如果脏值为true，调用副作用函数获取最新结果
            if(dirty){
                value = effectFn()
                // 设置脏值为false，即如下文不再产生变化，一直使用缓存
                dirty = false
            }
            // 如果脏值为false，即上次更改后没有触发过设置操作，使用缓存即可
            // console.log('activeEffect===>', activeEffect)
            track(obj, 'value')
            return value
        }
    }

    return obj
}

export default computed