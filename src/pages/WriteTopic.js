import React from 'react'
import Helmet from 'react-helmet'
import MainWriteTopic from '../components/topics/MainWriteTopic'

export default function WriteTopic() {
  return (
    <>
      <Helmet>
        <title>Write Topics | Ebbiner</title>
      </Helmet>
      <MainWriteTopic />
    </>
  )
}
