import { Alert, Icon, IconButton, Snackbar } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { closeAlert } from '../../../redux/alert/alert.actions';


const SnackBar = () => {

    const alert = useSelector((state) => state.alertReducer);
    const dispatch = useDispatch();

    const closeSnackBar = () => {
        dispatch(closeAlert())
    }

    return (
        <>
            {alert.type === "success" ?
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={alert.open}
                    autoHideDuration={5000}
                    onClose={closeSnackBar}
                    action={
                        <IconButton size="small" aria-label="close" color="inherit" onClick={closeSnackBar}>
                            <Icon fontSize="small" color="inherit">close</Icon>
                        </IconButton>
                    }
                >
                    {alert.type == "success" ?
                        <Alert onClose={closeSnackBar} severity="success" sx={{ width: '100%' }}>
                            {alert.msg}
                        </Alert>
                        : <></>
                    }
                </Snackbar>
                :
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={alert.open}
                    autoHideDuration={5000}
                    onClose={closeSnackBar}
                    message={alert.msg}
                    action={
                        <IconButton size="small" aria-label="close" color="inherit" onClick={closeSnackBar}>
                            <Icon fontSize="small" color="inherit">close</Icon>
                        </IconButton>
                    }
                />
            }
        </>
    )
}

export default SnackBar
