import React from "react";
import Helmet from "react-helmet";
import MainUploadVideo from "../components/uploadVideo/MainUploadVideo";

export default function UploadVideo() {
  return (
    <>
      <Helmet>
        <title>Upload Video | Gauler</title>
      </Helmet>
      <MainUploadVideo />
    </>
  );
}
