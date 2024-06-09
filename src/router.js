import React from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTERS } from "./utils/router";
import MasterLayout from "./pages/users/theme/masterLayout";
import HomePage from "./pages/users/home";
import Personal from "./pages/users/personal";
import Friend from "./pages/users/friend";
import Login from "./pages/admin/login";
import Register from "./pages/admin/register";
import ResetPassword from "./pages/users/resetpassword";
import ChangePassword from "./pages/users/changepassword";
import DetailsUser from "./pages/users/detailsuser";
import Notify from "./pages/users/notify";
import DetailsPost from "./pages/users/detailspost";

const RenderUserRouter = () => {
    const userRouters = [
        {
            path: ROUTERS.USER.HOME,
            component: <HomePage />
        },
        {
            path: ROUTERS.USER.INFO,
            component: <Personal />
        },
        {
            path: ROUTERS.USER.FRIENDS,
            component: <Friend />
        },
        {
            path: ROUTERS.USER.RESET,
            component: <ResetPassword />
        },
        {
            path: ROUTERS.USER.CHANGE_PASSWORD,
            component: <ChangePassword />
        },
        {
            path: ROUTERS.USER.DETAILS_USER + "/:id",
            component: <DetailsUser />
        },
        {
            path: ROUTERS.USER.DETAILS_POST + "/:id",
            component: <DetailsPost />
        },
        {
            path: ROUTERS.USER.NOTIFY,
            component: <Notify />
        }
    ];

    const adminRouters = [
        {
            path: ROUTERS.ADMIN.LOGIN,
            component: <Login />
        },
        {
            path: ROUTERS.ADMIN.REGISTER,
            component: <Register />
        },
    ];

    const allRouters = [...userRouters, ...adminRouters];

    return (
        <MasterLayout>
            <Routes>
                {
                    allRouters.map((item, key) => (
                        <Route key={key} path={item.path} element={item.component} />
                    ))
                }
            </Routes>
        </MasterLayout>
    );
};

const RouterCustom = () => {
    return <RenderUserRouter />;
};

export default RouterCustom;
