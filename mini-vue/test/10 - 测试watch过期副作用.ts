import reactive, { effect } from '../reactive'
import watch from '../watch'
// import { reactive, watch } from 'vue' // use node >= 16.0.0 and change file to .mjs ext
const data = {
    foo: 1
}

const obj = reactive(data)

let finalTime = 0
let rdmTime = 3000

// 这里模拟的A任务是2000毫秒左右的执行时间，而晚执行200毫秒的B任务是1000毫秒的执行时间，B应该先完成
// 测试的是A任务完成时，是否会覆盖B任务完成的结果，没有覆盖则通过
watch(() => obj.foo , async (nv, ov, onValidation) => {
    const time = Date.now()
    console.log(`任务执行时间:${time}`)
    let expire = false
    onValidation(() => {
        console.log('前置任务已过期')
        expire = true
    })
    setTimeout(() => {
        if(!expire){
            console.log(`执行的实际任务是时间为: ${time}的任务`)
            finalTime = time
        }else{
            console.log(`执行时间为: ${time}的任务已过时，不执行`)
        }
    }, rdmTime);
    rdmTime -= 1000
})

obj.foo++
setTimeout(() => {
    obj.foo++
}, 200);