export const filterTopics = ({
  courseSelectedName = "",
  dataSubTopics = [],
  setTopicsFilters,
}) => {
  setTopicsFilters(
    dataSubTopics
      ?.map((st) => {
        if (
          st?.topics &&
          Object.keys(st?.topics).includes(courseSelectedName)
        ) {
          return st.topics[courseSelectedName];
        }
      })
      .filter(
        (st) => st !== undefined && st !== false && st !== true && st !== null
      )
  );
};
