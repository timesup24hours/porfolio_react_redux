import signup from './signup'
import login from './login'

export default (app, test) => {
  signup(app, test)
  login(app, test)
}
