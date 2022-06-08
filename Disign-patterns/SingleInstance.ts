// 单例模式的实现(仅浏览器环境)
const createLoginModal = () => {
  const el = document.createElement('div')
  el.style.display = 'none'
  el.textContent = '我是登录框'
  document.body.prepend(el)
  return el
}

const createSingle = (function(){
  var instance = {}
  return function<T>(fn: (...args: any) => T) : T {
    if(!instance[fn.name]){
      instance[fn.name] = fn.apply(this, arguments)
    }
    return instance[fn.name]
  }
})()

let loginModal = createSingle(createLoginModal)
let loginModal2 = createSingle(createLoginModal)
// true
let judge = loginModal === loginModal2