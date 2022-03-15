
import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';

const ProtectedRoute = ({ children }) => {

    const router = useRouter();
    const userReducer = useSelector((state) => state.userReducer);

    if (!userReducer.currentUser) {
        router.push("/login");
        return (
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{
                    height: '100vh'
                }}>
                <CircularProgress />
            </Box>
        )
    } else {

        // validating if the saved token is expired

        /* const token = userReducer.currentUser.token;
        let decodedToken = jwt_decode(token);
        let dateNow = new Date();
        let tokenExp = new Date(decodedToken.exp);
        if (tokenExp.getTime() < Math.round(dateNow.getTime() / 1000)) {
            dispatch(userActions.logout());
            router.push("/login")
        }  */

    }

    return (
        <div>{children}</div>
    )
}

export default ProtectedRoute