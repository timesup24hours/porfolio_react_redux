import { isUserExistAction } from '../../store/actions/authActions'

export const asyncValidate = (values, dispatch) => {
  if(values) {
    return new Promise(( resovle, reject ) => {
     return dispatch(isUserExistAction(values))
      .then( res => {
        if(res.data.success) {
          resovle()
        } else {
          reject(res.data)
        }
      })
    })
  }
}
