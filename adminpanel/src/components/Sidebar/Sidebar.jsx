import React from 'react';
import { Link } from 'react-router-dom';
import {assets} from '../../assets/assets';

const Sidebar = ({sidebarVisible}) => {
  return (
    <div className={`border-end bg-white ${sidebarVisible ? '' : 'd-none'}`} id="sidebar-wrapper">
            <div className="sidebar-heading border-bottom bg-light d-flex align-items-center gap-2">
                <img src={assets.logo} alt="Logo" height={48} width={48}/>
                <h5 className="text-center">Namma Food</h5>
            </div>
            <div className="list-group list-group-flush">
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/add">
            <i class="bi bi-file-plus-fill me-2 "></i>Add Food
            </Link>
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/list">
            <i class="bi bi-list-stars me-2 "></i>List Food
            </Link>
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/orders">
            <i class="bi bi-cart me-2 "></i>Orders
            </Link>
        </div>
    </div>
  )
}

export default Sidebar;