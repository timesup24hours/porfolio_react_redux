import React from 'react'
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
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.string,
  type: React.PropTypes.string,
  onChange: React.PropTypes.func,
  label: React.PropTypes.string,
  error: React.PropTypes.string,
  onBlur: React.PropTypes.func,
  className: React.PropTypes.string,
  errorClassName: React.PropTypes.string,
  multiLine: React.PropTypes.bool,
  rowsMax: React.PropTypes.number,
  fullWidth: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  id: React.PropTypes.string,
  inputStyle: React.PropTypes.object,
  textareaStyle: React.PropTypes.object,
  underlineShow: React.PropTypes.bool
}

TextFieldGroupMaterialUI.defaultProps = {
  type: 'text',
  disabled: false
}

export default TextFieldGroupMaterialUI
