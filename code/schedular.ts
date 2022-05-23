let stack: Set<Function> = new Set()
const p = Promise.resolve()
const pushToStack = (event: Function) => {
  stack.add(event)
  p.then(() => {
    stack.forEach(e => {
      e()
      stack.delete(e)
    })
  })
  return true
}
const effect = (callback: Function) => {
  pushToStack(callback)
}

const console4 = () => console.log(4)
console.log(0)
effect(() => console.log(1))
effect(() => console.log(2))
console.log(3)
effect(console4)
effect(console4)
effect(console4)
effect(console4)
effect(() => console.log(5))
console.log(6)