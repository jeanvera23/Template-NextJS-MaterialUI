import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import Layout from '../../components/GeneralComponents/Blocks/Layout'
import ProtectedRoute from '../../components/GeneralComponents/Blocks/ProtectedRoute'

const Step2 = () => {

  const router = useRouter();
  const { clientId } = router.query;

  useEffect(() => {
    // Here you can control if Step1 was completed (using redux or ContextAPI)
    if (!clientId) {
      // Redirect to not found view..
    }
  }, [clientId])

  return (
    <div>step2 clientId:{clientId}</div>
  )
}

Step2.getLayout = (page) => (
  <Layout>
    {page}
  </Layout>
)

export default Step2