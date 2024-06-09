import React from 'react'
import './style.scss'

function AlertSuccess({ message, hideAlert }) {
    return (
        <div className='alert-success'>
            <img src='/check.png' alt='img success' />
            <p className='mt-3'>{message}</p>
            <button onClick={hideAlert}><i className="fa-regular fa-circle-xmark"></i></button>
        </div>
    )
}

export default AlertSuccess
