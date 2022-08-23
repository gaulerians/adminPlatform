import React from 'react'
import { Helmet } from 'react-helmet'
import MainCheckQuestion from './../components/examns/checkQuestion/MainCheckQuestion'

export default function CheckQuestion() {
  return (
    <>
      <Helmet>
        <title>Home | Gauler</title>
      </Helmet>
      <MainCheckQuestion />
    </>
  )
}
