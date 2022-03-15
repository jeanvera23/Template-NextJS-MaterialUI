import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import Layout from '../../components/GeneralComponents/Blocks/Layout'
import ProtectedRoute from '../../components/GeneralComponents/Blocks/ProtectedRoute'

const Step1 = () => {

    const router = useRouter();
    const { clientId } = router.query;

    useEffect(() => {
        if (!clientId) {
            // Redirect to not found view..
        }
    }, [clientId])

    return (
        <div>step1 clientId:{clientId}</div>
    )
}

Step1.getLayout = (page) => (
    <Layout>
        {page}
    </Layout>
)

export default Step1