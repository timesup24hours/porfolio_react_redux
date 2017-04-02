export const getProductsAndQuantitiesFromCartArray = ary => {
  let store =  ary.reduce((sum, current) => {
    sum[current] = sum[current] + 1 || 1
    return sum
  }, {})
  let products = []
  for(let k in store) {
    products.push({ _id: k, quantity: store[k] })
  }
  return products
}
