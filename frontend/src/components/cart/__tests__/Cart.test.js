// npm packages
import configureMockStore from 'redux-mock-store'

// our packages
import CartWrapper, { Cart } from '../Cart'
import Calculator from '../../calculator/Calculator'
import ProductInTheCart from '../ProductInTheCart'

// create mock store
const mockStore = configureMockStore();

const totalQuantity = 1
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


const getCartRequest = () => {
  cart.cart.push({
    product: { _id: '1' },
    quantity: 5,
    total: 155,
  });
  cart.cart.push({
    product: { _id: '2' },
    quantity: 5,
    total: 155,
  });
};

const auth = {
  isAuthenticated: true
}

const router = {
  push: jest.fn()
}

const store = mockStore({ cart: cart });

test('# CartWrapper', () => {
  const wrapper = shallow(<CartWrapper totalQuantity={totalQuantity} store={store} />);
  expect(wrapper).toMatchSnapshot();
});

test('# Cart, should render <div>no item</div>', () => {
  const wrapper = shallow(<Cart cart={cart} totalQuantity={0} store={store} />);
  expect(wrapper).toMatchSnapshot();
});

test('# Cart should render nested component # Calculator', () => {
  const component = (
    <Cart
      cart={cart}
      totalQuantity={totalQuantity}
      getCartRequest={getCartRequest}
      auth={auth}
    />
  );
  // test rendering
  const wrapper = shallow(component);
  expect(wrapper).toMatchSnapshot();

  // test if has Calculator
  const app = mount(component);
  expect(app.contains(<Calculator cart={cart} />)).toBe(true);

})

test('# CartWrapper calls componentDidMount', () => {
    const component = (
      <CartWrapper
        cart={cart}
        totalQuantity={totalQuantity}
        getCartRequest={getCartRequest}
        auth={auth}
        store={store}
      />
    );
    sinon.spy(CartWrapper.prototype, 'componentDidMount');
    const wrapper = mount(component);
    expect(CartWrapper.prototype.componentDidMount.calledOnce).toEqual(true);
    expect(wrapper).toMatchSnapshot();
  });
