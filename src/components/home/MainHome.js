import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Title4, Title5 } from "./../../styles/textGeneral";
import { WrapperAdmin } from "./../../styles/generalStyles";
import { ContentDetailsQuestion } from "./ContentDetailsQuestion";
import { AppContext } from "../../App";

export default function MainHome() {
  const navigate = useNavigate();
  const { unreviewedQuestionData, dataOfAuthors, dataOfUser, currentUser } =
    useContext(AppContext);

  useEffect(() => {
    !currentUser && navigate("/");
  }, []);

  return (
    <main>
      <WrapperAdmin>
        <div>
          <Title4>{`Hola ${dataOfUser?.username}`}</Title4>
        </div>
        <div>
          <Title5>Preguntas para revisar</Title5>
        </div>
        {unreviewedQuestionData ? (
          unreviewedQuestionData?.map((question, index) => {
            return (
              <div key={index}>
                <ContentDetailsQuestion
                  key={question.uqid}
                  uqid={question.uqid}
                  topic={question.latexQuestion}
                  authorId={question.authorId}
                  date={question.dateUpload}
                  universities={question.university}
                  dataOfAuthors={dataOfAuthors}
                  course={question.course}
                />
              </div>
            );
          })
        ) : (
          <div>No hay preguntas para revisar</div>
        )}
      </WrapperAdmin>
    </main>
  );
}
