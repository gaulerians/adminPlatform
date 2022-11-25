import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { onSubmitDataQuestion } from "./onSubmitDataQuestion";

export const onSubmitImage = async ({
  data,
  db,
  imagesArr = [],
  alternatives,
  // setAlternatives,
  question,
  // setQuestion,
  setLoading,
}) => {
  const storage = getStorage();
  let dataUrls = [];
  let counter = 0;
  setLoading({ status: true, title: "Preparando datos..." });
  imagesArr.map(async (i) => {
    const storageRef = ref(storage, `questionImages/${i.image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, i.image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setLoading({ status: true, title: `Subiendo imagen ${progress}%` });
        console.log("snapshot", snapshot.state);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        if (!i.typeImage.startsWith("alternative")) {
          if (i.typeImage === "question") {
            dataUrls.push({ urlImage: downloadURL, typeImage: i.typeImage });
          } else {
            dataUrls.push({ urlImage: downloadURL, typeImage: i.typeImage });
          }
        } else {
          const alternativeId = i.typeImage.split("-")[1];
          dataUrls.push({
            urlImage: downloadURL,
            typeImage: i.typeImage,
            alternativeId: alternativeId,
          });
        }
        counter = counter + 1;
        imagesArr.length === counter &&
          (await onSubmitDataQuestion({
            setLoading,
            data,
            db,
            dataUrls,
            question,
            alternatives,
          }));
      }
    );
  });
  imagesArr.length === counter &&
    (await onSubmitDataQuestion({
      setLoading,
      data,
      db,
      dataUrls,
      question,
      alternatives,
    }));
};
