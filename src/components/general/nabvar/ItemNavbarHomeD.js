import React from 'react'
import { NavLink } from "react-router-dom";
import { ItemNavbarHomeDContainer } from './styles/sItemNavbarHomeD'

export default function ItemNavbarHomeD({ nameItem, icon, link }) {
  return (
    <ItemNavbarHomeDContainer>
      <NavLink
        to={link}
        className={({ isActive }) =>isActive ? "navbarMenu" : ""}
      >
        {icon}
        <span>{nameItem}</span>
      </NavLink>
    </ItemNavbarHomeDContainer>
  )
}
