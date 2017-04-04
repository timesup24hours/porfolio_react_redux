// npm packages
import configureMockStore from 'redux-mock-store'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Dialog from 'material-ui/Dialog';

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


const product = {
  images: [],
  _id: '1',
  name: 'asd',
  price: 123,
  soldBy: 'asdf',
}

const product1 = {
  product: product,
  total: 1,
  quantity: 1,
}

const product2 = {
  product: product,
  total: 1,
  quantity: 2,
}

const subtractQuantityOfProductIntheCart = payload => expect(payload.productId).toBe(product1.product._id)
const increaseQuantityOfProductInTheCart = payload => expect(payload.productId).toBe(product1.product._id)
const removeProductFromCart = payload => expect(payload.productId).toBe(product1.product._id)
const totalQuantity = 1


const store = mockStore({ cart: totalQuantity });

test('# ProductInTheCartWrapper', () => {
  const wrapper = shallow(<ProductInTheCartWrapper store={store} />);
  expect(wrapper).toMatchSnapshot();
});

test('# ProductInTheCart', () => {
  const wrapper = shallow(<ProductInTheCart
    subtractQuantityOfProductIntheCart={subtractQuantityOfProductIntheCart}
    increaseQuantityOfProductInTheCart={increaseQuantityOfProductInTheCart}
    removeProductFromCart={removeProductFromCart}
    totalQuantity={totalQuantity}
    product={product1}
     />);

  expect(wrapper).toMatchSnapshot();
});

test('# ProductInTheCart should render nested div', () => {
  const component = (
    <ProductInTheCart
      subtractQuantityOfProductIntheCart={subtractQuantityOfProductIntheCart}
      increaseQuantityOfProductInTheCart={increaseQuantityOfProductInTheCart}
      removeProductFromCart={removeProductFromCart}
      totalQuantity={totalQuantity}
      product={product2}
      store={store}
       />
  )

  const app = shallow(component);
  expect(app).toMatchSnapshot();

});

test('# ProductInTheCart should render nested div', () => {
  const component = (
    <ProductInTheCart
      subtractQuantityOfProductIntheCart={subtractQuantityOfProductIntheCart}
      increaseQuantityOfProductInTheCart={increaseQuantityOfProductInTheCart}
      removeProductFromCart={removeProductFromCart}
      totalQuantity={totalQuantity}
      product={product2}
   />
  )
  const app = mount(component, {
      context: {
        muiTheme: getMuiTheme(),
      },
      childContextTypes: {
        muiTheme: React.PropTypes.object.isRequired,
      },
    });

  app.find('#ProductInTheCart-substract').hasClass('ProductInTheCart-info-quantity-change')
});

test('# ProductInTheCart simulate click', () => {
  const component = (
    <ProductInTheCart
      subtractQuantityOfProductIntheCart={subtractQuantityOfProductIntheCart}
      increaseQuantityOfProductInTheCart={increaseQuantityOfProductInTheCart}
      removeProductFromCart={removeProductFromCart}
      totalQuantity={totalQuantity}
      product={product2}
   />
  )
  const app = mount(component, {
      context: {
        muiTheme: getMuiTheme(),
      },
      childContextTypes: {
        muiTheme: React.PropTypes.object.isRequired,
      },
    });

  // const mountWithTheme = (node) => mount(<MuiThemeProvider>{node}</MuiThemeProvider>);
  // const app = mount(mountWithTheme(component))

  app.find('#ProductInTheCart-substract').simulate('click');
  app.find('#ProductInTheCart-add').simulate('click')
  app.find('#ProductInTheCart-open-dialog').simulate('click')
  expect(app.state().open).toBe(true)

});
