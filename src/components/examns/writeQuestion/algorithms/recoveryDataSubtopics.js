import { collection, query, where, getDocs } from "firebase/firestore";

export const recoveryDataSubTopics = async ({
  db,
  dataSubTopics,
  setDataSubTopics,
  courseSelected,
}) => {
  const courseTopics = await getDocs(
    query(
      collection(db, "subTopics"),
      where("courses", "array-contains", courseSelected)
    )
  );

  const dataTopicsArray = dataSubTopics ? dataSubTopics : [];
  if (dataTopicsArray.length === 0) {
    setDataSubTopics(courseTopics.docs.map((st) => st.data()));
  } else {
    setDataSubTopics(
      deleteRepeatedTopics([
        ...dataTopicsArray,
        ...courseTopics.docs.map((doc) => doc.data()),
      ])
    );
  }
};

const deleteRepeatedTopics = (arr) => {
  const topicMap = arr.map((obj) => {
    return [obj.subTopicId, obj];
  });
  return [...new Map(topicMap).values()];
};
