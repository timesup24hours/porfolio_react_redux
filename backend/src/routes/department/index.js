import getDepartment from './getDepartment'
import postDepartment from './postDepartment'
import putDepartment from './putDepartment'

export default (app) => {
  getDepartment(app)
  postDepartment(app)
  putDepartment(app)
}
