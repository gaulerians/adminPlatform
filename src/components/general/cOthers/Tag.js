import React from "react";
import { useTranslation } from "react-i18next";
import { TagContainer } from "./styles/sTag";

export default function Tag({ name, type, onDelete }) {
  const [t] = useTranslation("main");
  return (
    <li>
      <TagContainer type={type} name={name}>
        {
          type === "course" ? t(`courses.${name}`) :  name
        }
        <div onClick={() => onDelete(name)}>x</div>
      </TagContainer>
    </li>
  );
}
