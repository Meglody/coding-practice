export default function debounce(fn: Function, interval:number = 300){
    let I = null
    return (...args: any) => {
        if(!!I){
            clearTimeout(I)
        }else{
            fn(...args)
        }
        I = setTimeout(() => {
            I = null
        }, interval);
    }
}