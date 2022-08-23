import React from 'react'
import MainHome from './../components/home/MainHome'
import { Helmet } from 'react-helmet'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home | Gauler</title>
      </Helmet>
      <MainHome />
    </>
  )
}
