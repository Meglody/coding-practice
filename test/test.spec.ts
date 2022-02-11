import {timer} from 'rxjs'
import debounce from '../code/debounce'
import throttle from '../code/throttle'
import curry from '../code/curry'
type tuple<n extends number, v extends any = 0, counter extends any[] = []> =
    counter['length'] extends n ? counter : tuple<n, v, [...counter, v]>
describe("测试用例", () => {
    it("节流", (done) => {
        let count = 0
        const _addCount = () => {
            count++
        }
        const addCount = throttle(_addCount, 300)
        const source = timer(0, 100)
        const subscription = source.subscribe(i => {
            if(i === 30){
                subscription.unsubscribe()
                expect(count).toBe(10)
                done()
            }else{
                addCount()
            }
        })
    })
    it("防抖", (done) => {
        let count = 0
        const _addCount = () => {
            count++
        }
        const addCount = debounce(_addCount, 300)
        const source = timer(0, 10)
        const subscription = source.subscribe(i => {
            if(i === 100){
                subscription.unsubscribe()
                setTimeout(() => {
                    expect(count).toBe(1)
                    done()
                }, 200);
            }else{
                addCount()
            }
        })
    })
    it("柯里化", (done) => {
        const generateNumberArray = <T extends number>(count: number) => {
            let arr = new Array(count)
            let counter = count
            while(counter){
                const n = Math.floor(Math.random() * 10)
                arr[count - counter] = n
                counter--
            }
            return arr as tuple<T, number>
        }
        const arr = generateNumberArray<5>(5)
        const add = (a: number, b: number, c: number, d: number, e: number) => {
            return a + b + c + d + e
        }
        const ret_1 = add(...arr)
        const curryAdd = curry(add)
        let ret_2: any = 0
        let index = 0
        ret_2 = curryAdd(arr[index])
        index++
        while(typeof ret_2 != 'number'){
            ret_2 = ret_2(arr[index])
            index++
        }
        expect(ret_2).toEqual(ret_1)
        done()
    })
})