import React from 'react'

function AlertError({ message, hideAlert }) {
    return (
        <div className='alert-error'>
            <img src='/message.png' alt='img error' />
            <p className='mt-3'>{message}</p>
            <button onClick={hideAlert}><i className="fa-regular fa-circle-xmark"></i></button>
        </div>
    )
}

export default AlertError
