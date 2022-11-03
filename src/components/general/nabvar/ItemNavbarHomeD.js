import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../App";
import { NavLink } from "react-router-dom";
import { ItemNavbarHomeDContainer } from "./styles/sItemNavbarHomeD";
import { closeSession } from "./algorithms/closeSession";

export default function ItemNavbarHomeD({ nameItem, icon, link, item }) {
  const navigate = useNavigate();
  const { setDataOfUser, setCurrentUser, setLoading } = useContext(AppContext);
  return (
    <ItemNavbarHomeDContainer>
      <NavLink
        to={link}
        className={({ isActive }) => (isActive ? "navbarMenu" : "")}
        onClick={() =>
          item === "signOut"
            ? closeSession({
                navigate,
                setDataOfUser,
                setCurrentUser,
                setLoading,
              })
            : undefined
        }
      >
        {icon}
        <span>{nameItem}</span>
      </NavLink>
    </ItemNavbarHomeDContainer>
  );
}
