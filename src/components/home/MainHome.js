import React, { useContext, useState, useEffect } from "react";
import { Title4, Title5 } from "./../../styles/textGeneral";
import { WrapperAdmin } from "./../../styles/generalStyles";
import { ContentDetailsQuestion } from "./ContentDetailsQuestion";
import { Button } from "../../styles/buttonGeneral";
import { AppContext } from "../../App";
import { useNavigate } from "react-router";

export default function MainHome() {
  const { unreviewedQuestionData, setDataOfQuestionToReview, dataOfAuthors, dataOfUser } =
    useContext(AppContext);
  const navigate = useNavigate();

  const onRecoverDataOfQuestionSelected = (id) => {
    unreviewedQuestionData.filter((question) => {
      if (question.uqid === id) {
        setDataOfQuestionToReview(question);
      }
    });
    navigate("/check-questions", { replace: true });
  };


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
                  topic={question.latexQuestion}
                  authorId={question.authorId}
                  date={question.dateUpload}
                  universities={question.university}
                  dataOfAuthors={dataOfAuthors}
                  course={question.course}
                />
                <Button
                  primary
                  onClick={() => {
                    onRecoverDataOfQuestionSelected(question.uqid);
                  }}
                >
                  {"REVISAR"}
                </Button>
                ;
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
