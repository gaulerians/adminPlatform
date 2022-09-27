import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./theme/GlobalStyles";
import { Routes, Route } from "react-router-dom";
import theme from "./theme/Theme";
import AdminLayout from "./components/layouts/AdminLayout";

//import firebase utils
import { getAuth } from "firebase/auth";
import { FirestoreProvider, useFirebaseApp } from "reactfire";
import firestore, { getFirestore } from "firebase/firestore";

//import Routes
import { adminRoutes } from "./routes";

export default function App() {
  const firestoreInstance = getFirestore(useFirebaseApp());
  const auth = getAuth();

  useEffect(() => {
    console.log(firestoreInstance);
  }, []);

  return (
    <FirestoreProvider sdk={firestoreInstance}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<h1>Landing</h1>} />
          {adminRoutes.map((route) => (
            <Route
              path={route.path}
              key={route.path}
              element={<AdminLayout children={route.element} />}
            />
          ))}
          <Route path="*" element={<h1>Error 404</h1>} />
        </Routes>
      </ThemeProvider>
    </FirestoreProvider>
  );
}
