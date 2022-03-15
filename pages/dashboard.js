
import React, { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'

import Layout from '../components/GeneralComponents/Blocks/Layout';
import ProtectedRoute from '../components/GeneralComponents/Blocks/ProtectedRoute';
import { Button, Typography } from '@mui/material';

import userActions from '../redux/user/user.actions';

const Dashboard = () => {

    const router = useRouter();
    const userReducer = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const onLogoutClick = () => {
        console.log("onLogoutClick")
        dispatch(userActions.logout());
        router.push("/login")
    }

    return (
        <div>
            <Typography>Dashboard</Typography>

            <Button onClick={onLogoutClick}>logout</Button>
        </div>
    )
}



Dashboard.getLayout = (page) => (
    <Layout>
        <ProtectedRoute>
            {page}
        </ProtectedRoute>
    </Layout>
)

export default Dashboard