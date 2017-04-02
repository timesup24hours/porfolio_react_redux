import { isTheProductInTheCart } from '../isTheProductInTheCart'

test('# isTheProductInTheCart', () => {
  const productId = '2'
  const cart = [
    {
      product: {
        _id: '1',
      },
    },
    {
      product: {
        _id: '2',
      },
    },
  ]
  expect(isTheProductInTheCart(cart, productId)).toBe(true)
  expect(isTheProductInTheCart([], productId)).toBe(false)
  expect(isTheProductInTheCart(cart, '3')).toBe(false)
})
