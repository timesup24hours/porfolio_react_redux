import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import { browserHistory } from 'react-router'

const style = {
  display: 'inline-block',
  margin: '16px 32px 16px 0',
}

const ProfileMenu = ({ handleLogout, id, cart }) => (
  <div className={`Nav-popMenu`}>
    <Paper style={style}>
      <Menu>
        <MenuItem primaryText="Profile" onClick={() => browserHistory.push('/profile')} />
        <MenuItem
          rightIcon={<div className='ProfileMenu-total'>{cart.totalQuantity}</div>}
          primaryText="Cart"
          onClick={() => browserHistory.push(`/cart`)} />
        <MenuItem
          primaryText="Upload Product"
          onClick={() => browserHistory.push(`/upload_product`)} />
        <MenuItem
          primaryText="Edit Product"
          onClick={() => browserHistory.push(`/edit_product`)} />
        <MenuItem
          primaryText="Category setup"
          onClick={() => browserHistory.push(`/category_setup`)} />
        <MenuItem primaryText="Log out" onClick={handleLogout} />
      </Menu>
    </Paper>
  </div>
)

ProfileMenu.propTypes = {
  handleLogout: PropTypes.func.isRequired,
}

export default ProfileMenu
