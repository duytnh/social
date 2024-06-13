import React, { memo, useEffect, useState } from 'react';
import Header from '../header';
import Footer from '../footer';
import { useLocation } from 'react-router-dom';
import Top from '../top';
import Left from '../left';

const MasterLayout = ({ children, ...props }) => {
    const location = useLocation();
    const path = location.pathname;
    const page = path.substring(path.lastIndexOf('/') + 1);
    const [showLeft, setShowLeft] = useState(false);

    useEffect(() => {
        if (page === 'login' ||
            page === 'register' ||
            page === 'change-password' ||
            page === 'change') {
            document.body.style.paddingTop = '0';
        } else if (page === 'dashboard' ||
            page === 'manage-post' ||
            page === 'manage-user' ||
            page === 'manage-like' ||
            page === 'manage-comment' ||
            page === 'manage-notification') {
            document.body.style.paddingTop = '80px';
        } else {
            document.body.style.paddingTop = '110px';
        }
    }, [page]);

    const handleHideShow = () => {
        setShowLeft(!showLeft);
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 900) {
                setShowLeft(true);
            } else {
                setShowLeft(false);
            }
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, [showLeft])

    return (
        <>
            {(page === 'login' || page === 'register' || page === 'change-password' || page === 'change') ? (
                children
            ) : (page === 'dashboard' ||
                page === 'manage-post' ||
                page === 'manage-user' ||
                page === 'manage-like' ||
                page === 'manage-comment' ||
                page === 'manage-notification') ? (
                <div {...props}>
                    <Top showLeft={handleHideShow} />
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Left style={{
                            display: showLeft ? 'block' : 'none',
                            position: window.innerWidth < 900 && showLeft ? 'fixed' : 'static',
                            zIndex: window.innerWidth < 900 && showLeft ? '100' : '100',
                            backgroundColor: window.innerWidth < 900 && showLeft ? '#fff' : '#fff',
                            flexShrink: 0,
                            maxWidth: '285px',
                        }} />
                        {children}
                    </div>
                </div>
            ) : (
                <div {...props}>
                    <Header />
                    {children}
                    <Footer />
                </div>
            )}
        </>
    );
};

export default memo(MasterLayout);
