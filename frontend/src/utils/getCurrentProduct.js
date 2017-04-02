export const getCurrentProduct = (cart, productId) => {
  let product
  product = cart.filter(c => {
    return c.product._id === productId
  })
  return product[0]
}
