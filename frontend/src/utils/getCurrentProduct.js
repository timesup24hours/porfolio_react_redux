export const getCurrentProduct = (cart, productId) => {
  let product
  console.log('cart',cart);
  console.log('productId',productId);
  product = cart.filter(c => {
    return cart.product._id === productId
  })
  return product[0]
}
