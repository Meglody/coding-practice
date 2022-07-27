import { multiTwo, addOne } from "./compose"

// Functor
const Effect = fn => ({
  map: g => Effect(x => g(fn(x))),
  runWith: x => fn(x)
})

Effect.of =<T>(value: T) => Effect(() => value)

const r = Effect.of(9).runWith(1)

const res = Effect(multiTwo)
  .map(addOne)
  .runWith(3)

console.log(r, res)