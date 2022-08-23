import React from 'react'
import { TagContainer } from './styles/sTag'

export default function Tag({ name, type }) {
  return (
    <li>
      <TagContainer type={type} name={name}>{name}</TagContainer>
    </li>
  )
}
