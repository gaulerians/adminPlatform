export const urlVideoFacebookValidatorR = {
  // required: "Campo obrigatório",
  pattern: { 
    value: /https:\/\/fb.watch\/|https:\/\/www.facebook.com\/watch\/\?v=/,
    message: "Ingrese una url válida de Facebook*",
  },
};

export const urlVideoYoutubeValidatorR = {
  // required: "campo obrigatório",
  pattern: {
    value: /https:\/\/www.youtube.com\/watch\?v=|https:\/\/youtu.be\/|https:\/\/www.youtube.com\/embed\//,
    message: "Ingrese una url válida de YouTube*",
  },
};

export const urlVideoFacebookValidatorNR = {
  pattern: { 
    value: /https:\/\/fb.watch\/|https:\/\/www.facebook.com\/watch\/\?v=/,
    message: "Ingrese una url válida de Facebook*",
  },
};

export const urlVideoYoutubeValidatorNR = {
  pattern: {
    value: /https:\/\/www.youtube.com\/watch\?v=|https:\/\/youtu.be\/|https:\/\/www.youtube.com\/embed\//,
    message: "Ingrese una url válida de YouTube*",
  },
};
export const typeQuestionValidator = {
  required: "Seleccionar tipo de pregunta *",
};

export const textRequiredValidator = {
  required: "Campo obligatorio*",
};
export const requeridValidator = {
  required: "Selecciona una opción *",
  pattern: {
    value: /^(?!Seleccione)/,
    message: "Seleccionar una opcion *",
  },
};

export const textValidator = {
  required: "Campo obligatorio*",
  pattern: {
    value: /^[a-zA-Z0-9À-ÿ\u00f1\u00d1\u00E0-\u00FC .]+$/,
    message: "Solo se permiten letras y números",
  },
};
