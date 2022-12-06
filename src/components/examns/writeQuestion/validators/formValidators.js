export const urlVideoFacebookValidator = {
  required: "Campo obrigatório",
  pattern: { 
    value: /https:\/\/fb.watch\/|https:\/\/www.facebook.com\/watch\/\?v=/,
    message: "Ingrese una url válida de Facebook*",
  },
};

export const urlVideoYoutubeValidator = {
  required: "campo obrigatório",
  pattern: {
    value: /https:\/\/www.youtube.com\/watch\?v=|https:\/\/youtu.be\/|https:\/\/www.youtube.com\/embed\//,
    message: "Ingrese una url válida de YouTube*",
  },
};

export const typeQuestionValidator = {
  required: "Seleccionar tipo de pregunta *",
};

export const textRequiredValidator = {
  required: "Obligatorio*",
};
export const requeridValidator = {
  required: "Selecciona una opción *",
  pattern: {
    value: /^(?!Seleccione)/,
    message: "Seleccionar una opcion *",
  },
};
