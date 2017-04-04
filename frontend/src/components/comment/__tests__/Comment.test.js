import CommentWrapper, { Comment } from '../Comment'
import CommentList from '../CommentList'
import configureMockStore from 'redux-mock-store'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import CommentForm from '../CommentForm'
const mockStore = configureMockStore();

const auth = {
  user: {
    _id: 'testUserId123',
  }
}

const commentObj = {
  _id: '1',
  user: {},
  createdAt: '2099',
  comment: 'testComment',
}

const comment = {
  error: false,
  pending: false,
  success: false,
  fail: false,
  comments: [ commentObj, commentObj ],
}

const store = mockStore({
  auth,
  comment,
})

const commentGetAllRequest = jest.fn()

test('# CommentWrapper', () => {
  const wrapper = shallow(<CommentWrapper store={store} />)
  expect(wrapper).toMatchSnapshot()
})

test('# Comment', () => {
  const component = shallow(<Comment comment={{ comments: [ commentObj, commentObj ] }} auth={auth} commentGetAllRequest={commentGetAllRequest}  />)
  expect(component).toMatchSnapshot()
})

test('# Comment render nested component', () => {
  const component = shallow(<Comment comment={{ comments: [] }} auth={auth} commentGetAllRequest={commentGetAllRequest}  />)
  expect(component).toMatchSnapshot()
  expect(component.contains(<div className='Comment-noComment'>No Comment!</div>)).toEqual(true);
})

test('# Comment should run componentDidMount', () => {
  const component = (<Comment comment={comment} auth={auth} commentGetAllRequest={commentGetAllRequest} store={store}  />)
  // const app = mount(component)
})
