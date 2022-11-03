import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

//Import languages
import main_es from "./lang/main-es.json";

//Firebase Configs
import { firebaseConfig } from "./firebase/Config";
import { FirebaseAppProvider, SuspenseWithPerf } from "reactfire";

i18next.init({
  interpolation: { escapeValue: false },
  lng: "es",
  resources: {
    es: {
      main: main_es,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig} suspense={true}>
      <I18nextProvider i18n={i18next}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </I18nextProvider>
    </FirebaseAppProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
