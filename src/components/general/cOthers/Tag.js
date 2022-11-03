import React from "react";
import { TagContainer } from "./styles/sTag";

export default function Tag({ name, type, onDelete }) {
  return (
    <li>
      <TagContainer type={type} name={name}>
        {name}
        <div onClick={() => onDelete(name)}>x</div>
      </TagContainer>
    </li>
  );
}
