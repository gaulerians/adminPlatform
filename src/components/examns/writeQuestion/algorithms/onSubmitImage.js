import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export const onSubmitImage = async ({
  imagesArr = [],
  setLoading,
  uuid,
  course,
}) => {
  setLoading({ status: true, title: "Preparando datos..." });
  const storage = getStorage();
  return await Promise.all(
    await imagesArr.map(async (i) => {
      if (i.image.type.substr(0, 5) !== "image") return null;
      let imageRenamed = new File([i.image], `${i.typeImage}_${uuid}.jpeg`, {
        type: "image/jpeg",
      });
      let routePath = `questionImages/${course}/${uuid}/${imageRenamed.name}`;
      const storageRef = ref(storage, routePath);
      const uploadTask = uploadBytesResumable(storageRef, imageRenamed);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setLoading({
            status: true,
            title: `Subiendo imagen ${parseInt(progress)}%`,
          });
        },
        (error) => {
          console.log(error);
        }
      );

      return await uploadTask.then(async (result) => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        if (result.state === "success" && downloadURL) {
          if (
            !i.typeImage.startsWith("alternative") &&
            (i.typeImage === "question" || i.typeImage === "solution")
          ) {
            return {
              urlImage: downloadURL,
              typeImage: i.typeImage,
              path: result.metadata.fullPath,
            };
          } else {
            const alternativeId = i.typeImage.split("-")[1];
            return {
              urlImage: downloadURL,
              typeImage: i.typeImage,
              alternativeId: alternativeId,
              path: result.metadata.fullPath,
            };
          }
        } else {
          //TODO: CANCEL TO SEND DATA
        }
      });
    })
  ).then((result) => result);
};
