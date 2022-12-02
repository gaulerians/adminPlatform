import React from "react";

import { Title6, Text} from "../../styles/textGeneral";
import { Latex } from "../latex/Latex";
import { QuestionPrevContainer } from "./styles/sContentDetailsQuestion";

export const ContentDetailsQuestion = ({
  topic = "No hay datos",
  authorId = "Fernando la comelona",
  date = "Fecha no disponible",
  course = "No hay curso",
  universities = "UNSCH",
  dataOfAuthors = [],
}) => {
  const fecha = new Date(date.seconds * 1000);

  //recuperar cursos del subtopic
  const courses = (subTopicId) => {
    const subTopic = dataOfAuthors.filter((subTopic) => {
      return subTopic.subTopicId === subTopicId;
    });
    return subTopic[0].courses;
   };

  return (
    <QuestionPrevContainer>
      <Latex>{topic}</Latex>
      <div>
        <Text>{`Creada por: ${dataOfAuthors?.filter((e) => e.uid === authorId)[0]?.username}`}</Text>
      </div>
      <div>
        <Text>{`Creada el: ${fecha.toLocaleString()}`}</Text>
      </div>
      <div>
        <Text>{course}</Text>
      </div>
      <div>
        <Text>{universities}</Text>
      </div>
    </QuestionPrevContainer>
  );
};
