
import React, { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'

import Layout from '../components/GeneralComponents/Blocks/Layout';
import ProtectedRoute from '../components/GeneralComponents/Blocks/ProtectedRoute';
import { Button, Typography } from '@mui/material';

import userActions from '../redux/user/user.actions';
import { Box } from '@mui/system';

const Dashboard = () => {

    const router = useRouter();
    const users = useSelector((state) => state.userReducer.users);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        dispatch(userActions.getUsers());
    }

    const onLogoutClick = () => {
        console.log("onLogoutClick")
        dispatch(userActions.logout());
        router.push("/login")
    }

    return (
        <>
            <Button onClick={onLogoutClick}>logout</Button>
            <Typography variant='h5'>Dashboard</Typography>
            <Box pt={2}>
                {users.length > 0 &&
                    users.map(item => (
                        <Typography>{item.firstName + " " + item.lastName + " (" + item.username+ ")"} </Typography>
                    ))
                }
            </Box>
        </>
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