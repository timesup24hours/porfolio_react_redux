import Calculator from '../Calculator';

test('# Calculator', () => {
  const wrapper = shallow(<Calculator cart={{ totalQuantity: '1', total: '1' }} />)
  expect(wrapper).toMatchSnapshot();
})
