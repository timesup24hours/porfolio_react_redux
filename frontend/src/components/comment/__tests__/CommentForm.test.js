import CommentFormWrapper, { CommentForm } from '../CommentForm'
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const date = '2014-04-03T01:40:41.448Z'
const commentObj = {
  _id: '1',
  createdAt: date,
  comment: 'testComment',
}

const comments = [
  commentObj,
  commentObj,
]

const comment = {
  comments: [],
  pending: false,
  success: false,
  fail: false,
  errors: {
    login: 'loginError',
    comment: 'commentError'
  },
  error: false,
  values: {
    comment: ''
  }
}

const commentId = 'comentId'
const commentContent = 'testCommentContent'
const editedComment = 'editedComment'

const store = mockStore({})

test('# CommentFormWrapper', () => {
  const wrapper = shallow(<CommentFormWrapper store={store} />)
  expect(wrapper).toMatchSnapshot()
})

test('# CommentForm', () => {
  const wrapper = shallow(<CommentForm comment={comment} />)
  expect(wrapper).toMatchSnapshot()
})

test('# CommentForm', () => {
  const component = <CommentForm comment={comment} />
  const app = mount(component, {
      context: {
        muiTheme: getMuiTheme(),
      },
      childContextTypes: {
        muiTheme: React.PropTypes.object.isRequired,
      },
    });

  app.find('button').simulate('click');
})
