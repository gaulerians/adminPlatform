export const urlVideoFacebookValidator = {
    pattern: {
        value: /^(https:\/\/fb.watch\/[a-zA-Z0-9]+\/|https:\/\/www.facebook.com\/watch\?v=[a-zA-Z0-9]+)$/,
        message: "Ingrese una url válida (copie desde la opcion compartir)*",
    },
};

export const urlVideoYoutubeValidator = {
    pattern: {
        value: /^(https:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9]+)$/,
        message: "Ingrese una url válida *",
    },
};


export const typeQuestionValidator = {
    required: "Seleccionar tipo de pregunta *",
};

export const requeridValidator = {
    // required: "Selecciona una opción *",
    pattern: {
        value: /^(?!Seleccione)/,
        message: "Seleccionar una opcion *",	
    },
};