import React from "react";
import katex from "katex";

export const Latex = ({ children }) => {
  return (
    <span
      className="katex"
      dangerouslySetInnerHTML={{
        __html: katex.renderToString(children, {
          throwOnError: false,
        }),
      }}
    ></span>
  );
};
