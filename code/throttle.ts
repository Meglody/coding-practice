export default function throttle(fn: Function, interval: number = 300){
    let I = null
    let locked = false
    let start:number
    return (...args: any) => {
        start = new Date().getTime()
        if(locked){
            return
        }
        locked = true
        fn(...args)
        const spend = new Date().getTime() - start
        I = setTimeout(() => {
            locked = false
        }, interval - spend % interval);
    }
}