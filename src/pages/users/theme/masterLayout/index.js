import React, { memo, useEffect } from 'react';
import Header from '../header';
import Footer from '../footer';
import { useLocation } from 'react-router-dom';

const MasterLayout = ({ children, ...props }) => {
    const location = useLocation();
    const path = location.pathname;
    const page = path.substring(path.lastIndexOf('/') + 1);

    useEffect(() => {
        if (page === 'login' || page === 'register' || page === 'change-password' || page === 'change') {
            document.body.style.paddingTop = '0';
        } else {
            document.body.style.paddingTop = '110px';
        }
    }, [page]);

    return (
        <>
            {(page === 'login' || page === 'register' || page === 'change-password' || page === 'change') ? (
                children
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
