import React, { useState } from 'react';
import './style.scss';

function Top({ showLeft }) {
    const [searchActive, setSearchActive] = useState(false);

    const handleSearchClick = () => {
        setSearchActive(true);
    };

    const handleHideClick = () => {
        setSearchActive(false);
    };

    return (
        <div className={`admin-top ${searchActive ? 'search-active' : ''}`}>
            <div className='left-group'>
                <div className='top-icon'>
                    <span>facebook</span>
                    <div onClick={showLeft}><i className="fa-solid fa-bars"></i></div>
                </div>
                <div className={`top-search animate__animated ${searchActive ? 'animate__backInLeft' : ''}`}>
                    <button className='btn-icon-search' onClick={handleSearchClick}><i className="fa-solid fa-magnifying-glass"></i></button>
                    <input type='search' />
                    <button className='btn-icon-fill'><i className="fa-solid fa-sliders"></i></button>
                    <button className='btn-icon-hide' onClick={handleHideClick}><i className="fa-solid fa-xmark"></i></button>
                </div>
            </div>
            <div className='right-group'>
                <div className='top-notify'>
                    <button><i className="fa-solid fa-bell"></i></button>
                </div>
                <div className='top-account'>
                    <img src='/anh-nen.webp' alt='image person' />
                    <span><i className="fa-solid fa-gear"></i></span>
                </div>
            </div>
        </div>
    );
}

export default Top;
