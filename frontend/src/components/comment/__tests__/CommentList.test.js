import CommentListWrapper, { CommentList } from '../CommentList'
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const comments = {

}
const commentId = 'comentId'
const comment = 'testComment'
const editedComment = 'editedComment'
const snackbar = {
  open: true,
  message: '13'
}
const auth = {
  user: {
    _id: '123',
    local: {
      nickname: '123',
      username: '123'
    }
  }
}
// const d = new Date();
const d = '2014-04-03T01:40:41.448Z'
const commentDeleteRequest = (id) => expect(id).toBe(commentId)
const commentEditRequest = ({ id, c }) => expect({ id, c }).toBe({ id: commentId, comment })
const snackbarClose = () => jest.fn()

const store = mockStore({ comments, snackbar, auth })
const componentWrapper = (<CommentListWrapper
  commentId={commentId}
  key='123'
  user={auth.user}
  loginUserId='123'
  createdAt={d}
  comment={comment}
  store={store}
/>)

const component = (<CommentList
  commentId={commentId}
  key='123'
  user={auth.user}
  loginUserId='123'
  createdAt={d}
  comment={comment}
  snackbar={snackbar}
  auth={auth}
  comments={comments}
/>)

const componentWithDispatch = (<CommentList
  commentId='123'
  key='123'
  user={auth.user}
  loginUserId='123'
  createdAt={d}
  comment={comment}
  snackbar={snackbar}
  auth={auth}
  comments={comments}
  commentDeleteRequest={commentDeleteRequest}
  commentEditRequest={commentEditRequest}
  snackbarClose={snackbarClose}
/>)

test('# CommentListWrapper', () => {
  const wrapper = shallow(componentWrapper)
  expect(wrapper).toMatchSnapshot()
})

test('# CommentList itself', () => {
  const shallowCom = shallow(component)
  expect(shallowCom).toMatchSnapshot()
})

test('# CommentList with dispatch', () => {
  const shallowCom = shallow(componentWithDispatch)
  expect(shallowCom).toMatchSnapshot()
})

test('# CommentList call componentDidMount', () => {
  sinon.spy(CommentList.prototype, 'componentDidMount');
  const app = mount(componentWithDispatch, {
      context: {
        muiTheme: getMuiTheme(),
      },
      childContextTypes: {
        muiTheme: React.PropTypes.object.isRequired,
      },
    });

  expect(CommentList.prototype.componentDidMount.calledOnce).toEqual(true);
  expect(app.state().comment).toBe(comment)
})

test('# CommentList edit comment', () => {
  const app = mount(componentWithDispatch, {
      context: {
        muiTheme: getMuiTheme(),
      },
      childContextTypes: {
        muiTheme: React.PropTypes.object.isRequired,
      },
    });

  expect(app.state().comment).toBe(comment)
  app.find('#CommentList-edit').simulate('click')
})
