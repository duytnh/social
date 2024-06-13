import React, { useEffect, useState } from 'react'
import './style.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ROUTERS } from '../../../../utils/router';

function Left({ ...props }) {
    const location = useLocation();
    const currentPage = location.pathname;
    const page = currentPage.substring(currentPage.lastIndexOf('/') + 1);

    const data = [
        {
            path: ROUTERS.ADMIN.MANAGE_POST,
            icon: <i className="fa-regular fa-newspaper"></i>,
            name: 'Posts'
        },
        {
            path: ROUTERS.ADMIN.MANAGE_USER,
            icon: <i className="fa-solid fa-users"></i>,
            name: 'Users'
        },
        {
            path: ROUTERS.ADMIN.MANAGE_LIKE,
            icon: <i className="fa-solid fa-thumbs-up"></i>,
            name: 'Likes'
        },
        {
            path: ROUTERS.ADMIN.MANAGE_COMMENT,
            icon: <i className="fa-solid fa-comments"></i>,
            name: 'Comments'
        },
        {
            path: ROUTERS.ADMIN.MANAGE_NOTIFICATION,
            icon: <i className="fa-solid fa-bell"></i>,
            name: 'Notifications'
        }
    ];


    return (
        <div className='left' {...props}>
            <ul>
                <span>Dashboard</span>
                <Link className={page === 'dashboard' ? 'active' : ''} to={ROUTERS.ADMIN.DASHBOARD}><i className="fa-solid fa-gauge-high"></i>Dashboard</Link>
            </ul>
            <hr></hr>
            <ul>
                <span>Manage</span>
                {data.map((item, index) => {
                    return (
                        <Link className={page === item.path ? 'active' : ''} key={index} to={item.path}>{item.icon}{item.name}</Link>
                    )
                })}
            </ul>
        </div>
    )
}

export default Left
