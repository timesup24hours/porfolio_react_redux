import Block from '../Block';

test('# Block', () => {
  const wrapper = shallow(<Block />)
  expect(wrapper).toMatchSnapshot();
})
