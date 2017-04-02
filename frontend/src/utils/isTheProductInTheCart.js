/************************
 * Is the product in the cart
 * @param {Array} cart - the actual cart array with Product object and quantity
 * @param {String} productId - the productId
 * return Boolean - whether product is in the cart or not
 */
export const isTheProductInTheCart = (cart, productId) => {
  if(cart.length === 0) return false
  return cart.some(c => {
    return c.product._id === productId
  })
}
