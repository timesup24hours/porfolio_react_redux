import React from 'react'
import PropTypes from 'prop-types'

const TextFieldGroup = ({ id, name, value, label, cols, rows,
  error, type, onChange, onBlur, classNameContainer,
  classNameLabel, classNameInput, classNameError, }) => {
  const classNameDiv = error ? classNameError + classNameContainer : classNameContainer
  return (
    <div className={classNameDiv}>
      <label className={classNameLabel}>{label}</label>
      <input
        onChange={onChange}
        id={id}
        onblur={(e) => console.log('123')}
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
  name: PropTypes.string,
  value: PropTypes.any,
  label: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  cols: PropTypes.string,
  rows: PropTypes.string,
}

TextFieldGroup.defaultProps = {
  type: 'text',
}

export default TextFieldGroup;
