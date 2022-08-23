import React from 'react'
import Helmet from 'react-helmet'
import MainLives from './../components/lives/MainLives'

export default function Lives() {
  return (
    <>
      <Helmet>
        <title>Lives | Gauler</title>
      </Helmet>
      <MainLives />
    </>
  )
}
