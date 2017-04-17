import getDepartment from './getDepartment'
import postDepartment from './postDepartment'
import putDepartment from './putDepartment'
import deleteDepartment from './deleteDepartment'

export default (app) => {
  getDepartment(app)
  postDepartment(app)
  putDepartment(app)
  deleteDepartment(app)
}
