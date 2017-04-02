import React from 'react'

const TextFieldGroup = ({ id, name, value, label, cols, rows,
  error, type, onChange, checkUserExists, classNameContainer,
  classNameLabel, classNameInput, classNameError, }) => {
  const classNameDiv = error ? classNameError + classNameContainer : classNameContainer
  return (
    <div className={classNameDiv}>
      <label className={classNameLabel}>{label}</label>
      <input
        onChange={onChange}
        id={id}
        onBlur={checkUserExists}
        value={value}
        type={type}
        name={name}
        className={classNameInput}
        cols={cols}
        rows={rows}
      />
    {error && <span className={classNameError}>{error}</span>}
    </div>)
}

TextFieldGroup.propTypes = {
  name: React.PropTypes.string,
  value: React.PropTypes.any,
  label: React.PropTypes.string,
  error: React.PropTypes.string,
  type: React.PropTypes.string,
  onChange: React.PropTypes.func,
  checkUserExists: React.PropTypes.func,
  cols: React.PropTypes.string,
  rows: React.PropTypes.string,
}

TextFieldGroup.defaultProps = {
  type: 'text',
}

export default TextFieldGroup;
