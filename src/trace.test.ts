import { trace } from "./trace"

test(`Should return empty object if state is empty`, () => {
  const current = {}
  const previous = {}
  expect(trace(current, previous)).toEqual({})
})

test(`Should return empty object if states contain only equal primitive values`, () => {
  const current = {
    ["number"]: 1,
    ["string"]: "hello",
    ["null"]: null,
    ["undefined"]: undefined,
    ["boolean"]: true,
  }
  const previous = {
    ["number"]: 1,
    ["string"]: "hello",
    ["null"]: null,
    ["undefined"]: undefined,
    ["boolean"]: true,
  }
  expect(trace(current, previous)).toEqual({})
})

test(`Should return non-empty object if states contain only non-equal primitive values`, () => {
  const current = {
    ["number"]: 1,
    ["string"]: "hello",
    ["null"]: null,
    ["undefined"]: undefined,
    ["boolean"]: true,
  }
  const previous = {
    ["number"]: 2,
    ["string"]: "bye",
    ["null"]: null,
    ["undefined"]: undefined,
    ["boolean"]: false,
  }
  expect(trace(current, previous)).toEqual({
    ["number"]: true,
    ["string"]: true,
    ["boolean"]: true,
  })
})

// test(`Should return empty object if states contain same non-primitive values`, () => {
//   const current = {
//     foo: {},
//     bar: [],
//   }
//   const previous = {
//     foo: current.foo,
//     bar: current.bar,
//   }
//   expect(trace(current, previous)).toEqual({})
// })

test(`Should return non-empty object if states contain not same non-primitive values`, () => {
  const current = {
    foo: {},
    bar: [],
  }
  const previous = {
    foo: {},
    bar: [],
  }
  expect(trace(current, previous)).toEqual({
    foo: true,
    bar: true,
  })
})
