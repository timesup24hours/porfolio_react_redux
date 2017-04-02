import { getCurrentProduct } from '../getCurrentProduct'

test('# getCurrentProduct', () => {
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
  const productId = '1'
  expect(getCurrentProduct(cart, productId)).toEqual(cart[0])
})
