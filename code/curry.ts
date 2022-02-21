export default function curry<T, U>(fn : (...args: T[]) => U){
    const R = (...args: T[]) => {
        if(args.length < fn.length){
            return (...left: T[]) => R(...args, ...left)
        }
        return fn(...args)
    }
    return R
}