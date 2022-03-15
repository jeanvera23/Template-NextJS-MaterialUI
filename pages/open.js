import { Typography } from '@mui/material'
import React from 'react'
import Layout from '../components/GeneralComponents/Blocks/Layout'

const OpenRoute = () => {
  return (
    <Typography>OpenRoute</Typography>
  )
}


OpenRoute.getLayout = (page) => (
  <Layout>
    {page}
  </Layout>
)

export default OpenRoute