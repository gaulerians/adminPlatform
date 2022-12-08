import React from "react";
import { InputContainer } from "../../styles/inputGeneral";
import { InputTopicContainer } from "./styles/sMainWriteTopics";
import { useTranslation } from "react-i18next";

export const InputTextTopic = ({
  nameCurse = "biology",
  type,
  textSubTopic,
  setTextSubTopic,
  setLocalTopics,
  localTopic,
}) => {
  const [t] = useTranslation("main");
  return (
    <InputContainer>
      {type === "topic" ? (
        <InputTopicContainer>
          <label>{t(`courses.${nameCurse}`)}</label>
          <input
            required={true}
            value={localTopic ?? ""}
            onChange={(e) =>
              setLocalTopics((prev) => ({
                ...prev,
                [nameCurse]: e.target.value,
              }))
            }
            type="text"
          />
        </InputTopicContainer>
      ) : (
        <InputTopicContainer>
          <input
            required={true}
            onChange={(e) => setTextSubTopic(e.target.value)}
            value={textSubTopic}
            type="text"
          />
        </InputTopicContainer>
      )}
    </InputContainer>
  );
};
