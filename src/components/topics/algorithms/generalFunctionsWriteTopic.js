export const addDataSubVideos = ({
  event,
  dataSubVideos,
  setDataSubVideos,
  uuidObj,
}) => {
  event.preventDefault();
  const newData = {
    id: uuidObj,
    title: "",
    facebook: "",
    youtube: "",
  };
  setDataSubVideos([...dataSubVideos, newData]);
};

export const deleteDataSubVideos = ({
  event,
  dataSubVideos,
  setDataSubVideos,
  uuidObj,
}) => {
  event.preventDefault();
  if (dataSubVideos.length > 0) {
    const newData = dataSubVideos.filter((obj) => obj.id !== uuidObj);
    setDataSubVideos(newData);
  }
};

export const updateTitleOfURLVideos = ({
  dataSubVideos,
  setDataSubVideos,
  event,
  id,
  type,
}) => {
  if (type === "title") {
    const newData = dataSubVideos.map((obj) => {
      if (obj.id === id) {
        return {
          ...obj,
          title: event.target.value,
        };
      } else {
        return obj;
      }
    });
    setDataSubVideos(newData);
  } else if (type === "urlFacebook") {
    const newData = dataSubVideos.map((obj) => {
      if (obj.id === id) {
        return {
          ...obj,
          facebook: event.target.value,
        };
      } else {
        return obj;
      }
    });
    setDataSubVideos(newData);
  } else {
    const newData = dataSubVideos.map((obj) => {
      if (obj.id === id) {
        return {
          ...obj,
          youtube: event.target.value,
        };
      } else {
        return obj;
      }
    });
    setDataSubVideos(newData);
  }
};

export const resetStates = ({
  setUrlsSuTopic = () => {},
  setTextSubTopic = () => {},
  setLocalTopics = () => {},
  setTopicSelected = () => {},
  setTopicsFilters = () => {},
  setSubTopicSelected = () => {},
  setDataSubTopicSelected = () => {},
  setDataSubVideos = () => {},
  setCoursesSelected = () => {},
}) => {
  setUrlsSuTopic({
    urlFacebook: "",
    urlYoutube: "",
  });
  setTextSubTopic("");
  setLocalTopics({});
  setTopicSelected(null);
  setTopicsFilters([]);
  setSubTopicSelected(null);
  setDataSubTopicSelected(null);
  setDataSubVideos([]);
  setCoursesSelected([]);
};
