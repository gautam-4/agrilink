import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/add' className={({isActive}) => isActive ? "sidebar-option active" : "sidebar-option"}>
          <img src={assets.add_item} alt="" className="default-icon" />
          <img src={assets.add_icon} alt="" className="active-icon" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to='/list' className={({isActive}) => isActive ? "sidebar-option active" : "sidebar-option"}>
          <img src={assets.list} alt="" className="default-icon" />
          <img src={assets.list_icon} alt="" className="active-icon" />
          <p>List Items</p>
        </NavLink>
        <NavLink to='/orders' className={({isActive}) => isActive ? "sidebar-option active" : "sidebar-option"}>
          <img src={assets.order} alt="" className="default-icon" />
          <img src={assets.order_icon} alt="" className="active-icon" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar