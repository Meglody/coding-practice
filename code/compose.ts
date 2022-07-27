// reduce实现compose

const compose = (...fns) => 
  fns.reduce((fn, gn) => 
    (...args) => fn(gn(...args))
  )

export const addOne = x => x + 1
export const multiTwo = x => x * 2

const res = compose(
  addOne,
  multiTwo
)(2) //5