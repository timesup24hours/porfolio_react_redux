import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import TextField from 'material-ui/TextField'

const TextFieldGroupMaterialUI = ({ name, value, label, error, type, onChange, onBlur, className, errorClassName, multiLine, rowsMax, fullWidth, disabled, id, inputStyle, textareaStyle, underlineShow}) => {
  return (
    <div className={classnames({className}, { 'error': error })}>
      <TextField
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        hintText={label}
        floatingLabelText={label}
        type={type}
        errorText={error}
        multiLine={multiLine}
        rowsMax={rowsMax}
        fullWidth={fullWidth}
        disabled={disabled}
        id={id}
        inputStyle={inputStyle}
        underlineShow={underlineShow}
      />
    {/*error && <span className={errorClassName}>{error}</span>*/}
    </div>  )
}

TextFieldGroupMaterialUI.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  error: PropTypes.string,
  onBlur: PropTypes.func,
  className: PropTypes.string,
  errorClassName: PropTypes.string,
  multiLine: PropTypes.bool,
  rowsMax: PropTypes.number,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  inputStyle: PropTypes.object,
  textareaStyle: PropTypes.object,
  underlineShow: PropTypes.bool
}

TextFieldGroupMaterialUI.defaultProps = {
  type: 'text',
  disabled: false
}

export default TextFieldGroupMaterialUI
