export default function curry<T>(fn : (...args: T[]) => T){
    const R = (...args: T[]) => {
        if(args.length < fn.length){
            return (...left: T[]) => R(...args, ...left)
        }
        return fn(...args)
    }
    return R
}