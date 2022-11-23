import { collection, query, where, getDocs } from "firebase/firestore";

export const recoveryDataSubTopics = async (
  db,
  dataTopics,
  setDataTopics,
  courseSelected
) => {
  const courseTopics = await getDocs(
    query(
      collection(db, "subTopics"),
      where("courses", "array-contains", courseSelected)
    )
  );

  // setDataTopics((prev) => [
  //   ...prev,
  //   ...deleteRepeatedTopics(courseTopics.docs.map((doc) => doc.data())),
  // ]);

  const dataTopicsArray = dataTopics ? dataTopics : [];
  if (dataTopicsArray.length === 0) {
    setDataTopics(courseTopics.docs.map((st) => st.data()));
  } else {
    setDataTopics(
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
