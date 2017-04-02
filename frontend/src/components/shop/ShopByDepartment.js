import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as productActions from '../../store/actions/productActions'
import { routeParamsFormatToName } from '../../utils'
import { Link } from 'react-router'
import { Tabs, Tab } from 'material-ui/Tabs';

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

  componentDidMount() {
    this.props.setCurrentDepartmentAndCategory({
      department: { name: routeParamsFormatToName(this.context.router.params.department), to: this.context.router.params.department },
    })
  }

  renderDepartmentsAndCategory = () => {
    if(routeParamsFormatToName(this.context.router.params.department)) {
      return this.props.menu.department.map((d, i) => {
        return <Tab className='blue' key={i} label={d.name.name} onActive={() => this.context.router.push(`/shop/${d.name.to}`)}>
                <div className='container'>
                  <h2 style={styles.headline}>Categories</h2>
                  {d.children.map((c, i) => {
                    return c.name ? <Link
                              className='waves-effect waves-light btn hover-cursor-pointer flexRowWrap ShopByDepartment-category-button'
                              key={i}
                              to={`/shop/${d.name.to}/${c.to}`}>
                              {c.name}</Link>
                            : false
                  })}
                </div>
              </Tab>
      })
    }
  }

  render() {
    let index = 0
    this.props.menu.department.forEach((d, i) => {
      if(d.name.to === this.context.router.params.department)
        index = i
    })

    return (
      <div className='ShopByDepartment-container marginTop50px'>
        <Tabs initialSelectedIndex={index}>
          {this.renderDepartmentsAndCategory()}
        </Tabs>
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
