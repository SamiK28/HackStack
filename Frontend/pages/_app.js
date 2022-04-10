import '../styles/globals.css'
import "../styles/car.css"
import React from 'react'
import Layout from '../components/layout'

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      < Component {...pageProps} />
    </Layout>
  );
}