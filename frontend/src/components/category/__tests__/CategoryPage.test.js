// npm packages
import configureMockStore from 'redux-mock-store'
import CategoryPageWrapper, { CategoryPage } from '../CategoryPage'
import CategoryForm from '../CategoryForm'

// create mock store
const mockStore = configureMockStore();
const menu = {
  pending: false
}
const store = mockStore({ menu: menu });

test('# CategoryPageWrapper', () => {
  const wrapper = shallow(<CategoryPageWrapper store={store} />)
  expect(wrapper).toMatchSnapshot();
})

test('# CategoryPage', () => {
  const wrapper = shallow(<CategoryPage menu={menu} />)
  expect(wrapper).toMatchSnapshot();

  const app = mount(<CategoryPage menu={menu} />)
  expect(app.find('#CategoryPage-container').exists()).toBe(true)
})

test('# CategoryPage', () => {
  const app = mount(<CategoryPage menu={{ pending: true }} />)
  expect(app.find('#CategoryPage-container').exists()).toBe(false)
})
