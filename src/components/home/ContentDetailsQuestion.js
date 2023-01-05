import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../styles/buttonGeneral";
import { Text } from "../../styles/textGeneral";
import { Latex } from "../latex/Latex";
import { QuestionPrevContainer } from "./styles/sContentDetailsQuestion";

export const ContentDetailsQuestion = ({
  uqid = "No hay datos",
  topic = "No hay datos",
  authorId = "Sin autor",
  date = "Fecha no disponible",
  course = "No hay curso",
  universities = "Sin universidad",
  dataOfAuthors = [],
}) => {
  const fecha = new Date(date.seconds * 1000);
  const authorName = dataOfAuthors?.filter((e) => e.uid === authorId)[0];
  return (
    <QuestionPrevContainer>
      <div className="container-text ">
        <div className="latex-container">
          <Latex>{topic}</Latex>
        </div>
        <div className="container-text-data">
          <div>
            <Text>{`Autor: ${
              authorName?.name?.firstName
                ? `${authorName.name.firstName} ${authorName.name.lastName}`
                : authorName?.username
            }`}</Text>
          </div>
          <div>
            <Text>{`Creada el: ${fecha.toLocaleString()}`}</Text>
          </div>
          <div className="container-duplex">
            <Text>Curso: {course}</Text>
            <Text>Universidades: {universities.join(", ")}</Text>
          </div>
        </div>
      </div>
      <div className="container-button">
        <Link to={`/question/${uqid}`}>
          <Button primary>{"REVISAR"}</Button>
        </Link>
      </div>
    </QuestionPrevContainer>
  );
};
