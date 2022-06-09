// 订阅发布模式的实现
const login = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('已登录')
    }, 500);
  })
}

const publishers = {}

const trigger = (s: string) => {
  if(!publishers[s]) return
  publishers[s].forEach(fn => fn())
}

const listen = (s: string, cb: () => any) => {
  const newCb = (...args) => cb.apply(this, args)
  if(!publishers[s]){
    publishers[s] = [newCb]
  }else{
    publishers[s].push(newCb)
  }
  return () => publishers[s].splice(publishers[s].indexOf(newCb), 1)
}

// 创建自定义事件
// const loginEvent = new Event('login')

login().then(res => {
  console.log(res)
  trigger('logined')
  trigger('logined')
  // window.dispatchEvent(loginEvent)
})

listen('logined', () => console.log(123))
const unsubscribe = listen('logined', () => {
  console.log(456)
  unsubscribe()
})

// 自定义事件（需要有window对象）
// window.addEventListener('login', () => {
//   console.log(789)
// })