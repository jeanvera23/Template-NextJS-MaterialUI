
import React, { useState, useEffect, useRef } from 'react';
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router'
import SignatureCanvas from 'react-signature-canvas'

import Layout from '../components/GeneralComponents/Blocks/Layout';
import ProtectedRoute from '../components/GeneralComponents/Blocks/ProtectedRoute';
import { Button, Typography } from '@mui/material';

import userActions from '../redux/user/user.actions';
import { Box } from '@mui/system';

const Dashboard = () => {

    const router = useRouter();
    const users = useSelector((state) => state.userReducer.users);
    const dispatch = useDispatch();
    let signatureRef = useRef();
    const [sign, setSign] = useState(false);

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

    const setRefCanvas = sigObj => {

        console.log("settings ref");
        signatureRef = sigObj;
    }

    const insertParticipant = () => {

        if (!sign) {
            alert("signature blank")
            return;
        }
        const trimmedDataURL = signatureRef.getTrimmedCanvas().toDataURL('image/png');
        const body = {
            "site": "HCF",
            "email": "jeanvs23@gmail.com",
            "firstName": "Jean",
            "lastName": "Vera",
            "HCFNumber": "HCF1234",
            "password": "12345678",
            signature: trimmedDataURL
        }
        const bodyST_VINCENTS = {
            "site": "ST_VINCENTS",
            "email": "jeanvs23@gmail.com",
            "password": "12345678",
            "studyID": "ABCDE5SDs",
            signature: trimmedDataURL
        }
        dispatch(userActions.insetParticipant(bodyST_VINCENTS));
    }

    console.log("sign" + sign)
    return (
        <>
            <Button onClick={onLogoutClick}>logout</Button>
            <Button onClick={insertParticipant}>insert paticipant</Button>

            <Typography variant='h5'>Dashboard</Typography>
            <Box pt={2}>
                {users.length > 0 &&
                    users.map(item => (
                        <Typography>{item.firstName + " " + item.lastName + " (" + item.username + ")"} </Typography>
                    ))
                }
            </Box>
            <Box p={2} sx={{backgroundColor: "green"}} width={220}>
                <SignatureCanvas penColor='blue'
                    canvasProps={{ className: 'sigPad md-bg-grey-50' }}
                    onEnd={() => setSign(true)}
                    ref={setRefCanvas} />
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