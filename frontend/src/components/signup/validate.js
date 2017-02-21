export const validate = values => {
  const errors = {}
  const requiredFields = [ 'username', 'password', 'passwordConfirm' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
  if (values.username && values.username.length < 6) errors.username = `mush be longer than 6 characters! ${values.username.length}/6`
  if (values.username && values.username.length > 20) errors.username = `mush be less than 20 characters! ${values.username.length}/20`
  if (values.username && values.username.indexOf(' ') >= 0) errors.username = `Could not contain white space!`
  if (values.passwordConfirm && values.password !== values.passwordConfirm) {
    errors.password = 'Password mush be match'
  }
  // if (values.password && values.password.length < 6) errors.password = `mush be longer than 6 characters! ${values.password.length}/6`
  // if (values.password && values.password.length > 20) errors.password = `mush be less than 20 characters! ${values.password.length}/20`
  // if (values.password && values.password.indexOf(' ') >= 0) errors.password = `Could not contain white space!`
  // if (values.passwordConfirm && values.passwordConfirm.length < 6) errors.passwordConfirm = `mush be longer than 6 characters! ${values.passwordConfirm.length}/6`
  // if (values.passwordConfirm && values.passwordConfirm.length > 20) errors.passwordConfirm = `mush be less than 20 characters! ${values.passwordConfirm.length}/20`
  // if (values.passwordConfirm && values.passwordConfirm.indexOf(' ') >= 0) errors.passwordConfirm = `Could not contain white space!`
  // if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //   errors.email = 'Invalid email address'
  // }
  return errors
}
