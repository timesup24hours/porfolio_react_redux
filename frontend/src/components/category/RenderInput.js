import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import classnames from 'classnames';
import * as UIActions from '../../store/actions/UIActions'
import * as snackbarActions from '../../store/actions/snackbarActions'

class RenderInput extends Component {
  state = {
    // [this.props.selectorName]: '',
    [`add-${this.props.inputName}`]: '',
    [`edit-${this.props.inputName}`]: '',
    addOpen: false,
    editOpen: false,
  }

  // edit department request
  handleEdit = e => {
    const id = document.querySelector(`#${this.props.inputName}-id`).value
    const name = document.querySelector(`#edit-${this.props.inputName}`).value
    const parentId = this.props.parentId || undefined

    let payload = {}
    payload.id = id
    payload.name = escape(name)
    if(parentId) payload.parentId = parentId

    this.props.eidtRequest(payload)
    this.setState({ editOpen: false })
  }

  // add department request
  handleAdd = e => {
    const name = document.querySelector(`#add-${this.props.inputName}`).value
    const parentId = this.props.parentId || undefined

    if(this.props.inputName === 'category') {
      if(!parentId) {
        this.props.snackbarOpen('Please select one departmen!')
        return false
      }
    }
    if(this.props.inputName === 'subCategory') {
      if(!parentId) {
        this.props.snackbarOpen('Please select one Category!')
        return false
      }
    }

    let payload = {}
    payload.name = escape(name)
    if(parentId) payload.parentId = parentId

    this.props.addRequest(payload)
    this.setState({ addOpen: false })
  }

  // call the parent onchange
  handleOnChange = e => {
    if(e.target.type === 'select-one') this.setState({ addOpen: false, editOpen: false })
    this.props.handleFormOnChange(e)
  }

  handleInputOnchange = e => {

  }

  handleDeleteBtnOpenDialog = e => {
    this.props.handleOpenDialog({
      title: 'Comfirm delete',
      content: this.props.dialogContent,
      action: {
        type: this.props.actionType,
        payload: { id: this.props.selectorValue },
      },
      trueBtnText: 'Delete',
    })
  }

  /*
   *  render input field
   */
  renderField = (name, label, type) => {
    let selector, defaultValue = null
    selector = document.querySelector(`#${this.props.selectorName}`)

    if(name.indexOf('edit') > -1 && selector.selectedIndex !== 0) {
      defaultValue = selector[selector.selectedIndex].text
    }

    return <div className={classnames('RenderInput-input', 'form-group',
              // { 'async-validating': asyncValidating,
              //   'has-error': error,
              //   // 'has-success': touched && valid && !pristine,
              // }
           )}>
              <label className="control-label" htmlFor={name}>{label}</label>
              <input
                id={name}
                type={type}
                name={name}
                placeholder={label}
                className={classnames('form-control')}
                defaultValue={defaultValue}
                onChange={e => this.handleInputOnchange(e)}
              />
              <span className='RenderInput-input-error text-danger'>{}</span>
            </div>
  }

  /*
   *  render selector
   */
  renderSelector = (name, label, children) => {
    return (<div className={classnames('RenderInput-input', 'form-group',
           )}>
              <label className="control-label" htmlFor={name}>{label}</label>
              <select
                id={name}
                name={name}
                placeholder={label}
                className={classnames('form-control')}
                value={this.props.selectorValue}
                onChange={e => this.handleOnChange(e)}
              >
                <option value="" disabled>Choose your option</option>
                 {children}
              </select>
              <span className='RenderInput-input-error text-danger'>{}</span>
            </div>)
  }

  /*
   *  render selector and input field
   */
  renderInput = (selectorName, selectorLabel, selectorChildren, inputName, inputLabel) => {
    return (
      <div className='row flexEndCenterWrap'>

        <div className="col-sm-6 col-xs-12">
          {this.renderSelector(selectorName, selectorLabel, selectorChildren)}
        </div>

        {this.state.addOpen || this.state.editOpen // open-add-section
          ? null
          : (<div className="col-sm-6 col-xs-12">
              <div className="row flexEndCenterWrap">
                <div className="col-sm-4 col-xs-3">
                  <RaisedButton
                    className='pull-right'
                    label='add'
                    onClick={e => this.setState({ addOpen: true })}
                  />
                </div>
                {this.props.selectorValue // open-edit-section
                  ? (<div className="col-sm-4 col-xs-3">
                      <RaisedButton
                        className='pull-right'
                        label='edit'
                        onClick={e => this.setState({ editOpen: true })}
                      />
                    </div>)
                  : null
                }
                {this.props.selectorValue // delete-btn
                  ? (<div className="col-sm-4 col-xs-3">
                      <RaisedButton
                        className='pull-right'
                        label='delete'
                        onClick={e => this.handleDeleteBtnOpenDialog(e)}
                      />
                    </div>)
                  : null
                }

              </div>
            </div>)
        }


        {this.state.addOpen // add-section
          ? <div className="col-sm-6 col-xs-12">
              <div className="row flexEndCenterWrap">
                <div className="col-sm-6 col-xs-12">
                  {this.renderField(`add-${inputName}`, `Add ${inputLabel}`, 'text')}
                </div>
                <div className="col-sm-3 col-xs-3 pull-right">
                  <RaisedButton
                    className='pull-right'
                    label='ADD'
                    onClick={e => this.handleAdd(e)}
                  />
                </div>
                <div className="col-sm-3 ccol-xs-3 pull-right">
                  <RaisedButton
                    className='pull-right'
                    label='CANCEL'
                    onClick={e => this.setState({ addOpen: false })}
                  />
                </div>
              </div>
            </div>
          : null
        }

        {this.state.editOpen // edit-section
          ? <div className="col-sm-6 col-xs-12">
              <div className="row flexEndCenterWrap">
                <div className="col-sm-6 col-xs-12">
                  <input id={`${inputName}-id`} type="text" hidden readOnly value={this.props.selectorValue} />
                  {this.renderField(`edit-${inputName}`, `Edit ${inputLabel}`, 'text')}
                </div>
                <div className="col-sm-3 col-xs-3">
                  <RaisedButton
                    className='pull-right'
                    label='EDIT'
                    onClick={e => this.handleEdit(e)}
                  />
                </div>
                <div className="col-sm-3 col-xs-3">
                  <RaisedButton
                    className='pull-right'
                    label='CANCEL'
                    onClick={e => this.setState({ editOpen: false })}
                  />
                </div>
              </div>
            </div>
          : null
        }


      </div>
    )
  }


  // return
  render() {

    return (
      <div>
        {this.renderInput(this.props.selectorName,
                          this.props.selectorLabel,
                          this.props.selectorChildren,
                          this.props.inputName,
                          this.props.inputLabel,
                        )}
      </div>
    )
  }
}

RenderInput.contextTypes = {
  router: PropTypes.object,
}
const mapStateToProps = state => ({
  menu: state.menu
})

const mapDispatchToProps = dispatch => ({
  handleOpenDialog: payload => dispatch(UIActions.handleOpenDialog(payload)),
  snackbarOpen: payload => dispatch(snackbarActions.snackbarOpen(payload)),
})

RenderInput.propTypes = {
}

export default connect(mapStateToProps, mapDispatchToProps)(RenderInput)
