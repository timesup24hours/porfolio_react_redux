// npm packages
import configureMockStore from 'redux-mock-store'

// our packages
import ProductInTheCartWrapper, { ProductInTheCart } from '../ProductInTheCart'

// create mock store
const mockStore = configureMockStore();

const cart = {
  cart: [],
  totalQuantity: 0,
  total: 0,
  pending: false,
  success: false,
  fail: false,
  errors: {
  },
  error: false,
  currentProduct: {},
  quantityOfCurrentProduct: 0,
}

const params = {
  productId: '1',
}
const product1 = {
  images: [],
  _id: '1',
  name: 'asd',
  price: 123,
  soldBy: 'asdf',
}

const product = {
  product: product1,
  total: 1,
  quantity: 1,
}

const subtractQuantityOfProductIntheCart = (params) => expect(cart.totalQuantity - 1).toBe(cart.totalQuantity - 1)
const increaseQuantityOfProductInTheCart = (params) => expect(cart.totalQuantity + 1).toBe(cart.totalQuantity + 1)
const removeProductFromCart = (params) => expect(cart.cart).toBe(cart.cart)
const totalQuantity = 1

test('# ProductInTheCartWrapper', () => {
  const store = mockStore({ cart: totalQuantity });
  const wrapper = shallow(<ProductInTheCartWrapper store={store} />);
  expect(wrapper).toMatchSnapshot();
});

test('# ProductInTheCart', () => {
  const wrapper = shallow(<ProductInTheCart
    subtractQuantityOfProductIntheCart={subtractQuantityOfProductIntheCart}
    increaseQuantityOfProductInTheCart={increaseQuantityOfProductInTheCart}
    removeProductFromCart={removeProductFromCart}
    totalQuantity={totalQuantity}
    product={product}
     />);
     
  expect(wrapper).toMatchSnapshot();
});
