import React from 'react'
import Helmet from 'react-helmet'
import MainWriteQuestion from './../components/examns/writeQuestion/MainWriteQuestion'

export default function WriteQuestion() {
  return (
    <>
      <Helmet>
        <title>Write questions | Gauler</title>
      </Helmet>
      <MainWriteQuestion />
    </>
  )
}
