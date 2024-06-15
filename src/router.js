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
import ManageUser from "./pages/admin/manage/ManageUser";
import ManagePost from "./pages/admin/manage/ManagePost";
import ManageLike from "./pages/admin/manage/ManageLike";
import ManageComment from "./pages/admin/manage/ManageComment";
import ManageNotification from "./pages/admin/manage/ManageNotification";
import ManageMessenger from "./pages/admin/manage/ManageMessage";
import Dashboard from "./pages/admin/dashboard";
import MessengerPage from "./pages/users/messenger";

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
        },
        {
            path: ROUTERS.USER.MESSENGER + "/:id?",
            component: <MessengerPage />
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
        {
            path: ROUTERS.ADMIN.DASHBOARD,
            component: <Dashboard />
        },
        {
            path: ROUTERS.ADMIN.MANAGE_USER,
            component: <ManageUser />
        },
        {
            path: ROUTERS.ADMIN.MANAGE_POST,
            component: <ManagePost />
        },
        {
            path: ROUTERS.ADMIN.MANAGE_LIKE,
            component: <ManageLike />
        },
        {
            path: ROUTERS.ADMIN.MANAGE_COMMENT,
            component: <ManageComment />
        },
        {
            path: ROUTERS.ADMIN.MANAGE_NOTIFICATION,
            component: <ManageNotification />
        },
        {
            path: ROUTERS.ADMIN.MANAGE_MESSENGER,
            component: <ManageMessenger />
        }
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
