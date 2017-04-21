import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as productActions from '../../store/actions/productActions'
import { routeParamsFormatToName } from '../../utils'
import { Link } from 'react-router'
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};


class ShopByDepartment extends Component {

  static contextTypes = {
    router: React.PropTypes.object,
  }

  closeDropDown = e => {
    if (document.querySelector('.dropdown').classList.contains('open') // if open && click outside of the element than close the profileMenu
      && !document.querySelector('.dropdown').contains(e.target)) {
      document.querySelector('.dropdown').classList.remove('open')
    }
  }

  componentDidMount() {
    window.addEventListener('click', this.closeDropDown)
    this.props.setCurrentDepartmentAndCategory({
      department: { name: routeParamsFormatToName(this.context.router.params.department), to: this.context.router.params.department },
    })
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.closeDropDown)
  }

  handleChangeCategory = (d) => {
    this.context.router.push(`/shop/${d.to}`)
    document.querySelector('.dropdown').classList.remove('open')
  }

  renderDepartments = () => {
    if(routeParamsFormatToName(this.context.router.params.department)) {
      return this.props.menu.categories ? this.props.menu.categories.map((d, i) => {
        return (<ListItem
                  key={i}
                  onClick={() => this.handleChangeCategory(d)}
                  primaryText={d.name}
                  secondaryText={d.desc}
                />)
      }) : null
    }
  }


  handleToggleDropDown = e => {
    e.preventDefault()
    document.querySelector('.dropdown').classList.toggle('open')
  }

  render() {

    const renderCategory = this.props.menu.categories ? this.props.menu.categories.map((d, i) => {
        if(d.to === this.context.router.params.department) {
          return d.category.map((c, i) => {
            return c.name ? <Link
                              className='btn hover-cursor-pointer flexRowWrap ShopByDepartment-category-button'
                              key={i}
                              to={`/shop/${d.to}/${c.to}`}>
                              {c.name}</Link>
                              : false
          })
        }
        return false
      }) : null


    return (
      <div className='ShopByDepartment-container marginTop50px'>

        <ol className="breadcrumb" >
          <li>
            <div className="dropdown" >
              <a onClick={e => this.handleToggleDropDown(e)}>
                {routeParamsFormatToName(this.context.router.params.department)}
                <span className="caret"></span>
              </a>
              <ul className="dropdown-menu">
                <List >
                  <Subheader>Departments</Subheader>
                  {this.renderDepartments()}
                </List>
              </ul>
            </div>
          </li>
        </ol>

        <div className='container'>
          <h2 style={styles.headline}>Categories</h2>
          {renderCategory}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  menu: state.menu,
  product: state.product,
})
const mapDispatchToProps = dispatch => ({
  setCurrentDepartmentAndCategory: payload => dispatch(productActions.setCurrentDepartmentAndCategory(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopByDepartment)
