import React, { useState, useEffect, createContext } from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./theme/GlobalStyles";
import { Routes, Route } from "react-router-dom";
import theme from "./theme/Theme";
import AdminLayout from "./components/layouts/AdminLayout";
import MainSpinner from "./components/spinner/MainSpinner";

//import firebase utils
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FirestoreProvider, useFirebaseApp } from "reactfire";
import { getFirestore } from "firebase/firestore";

//import Routes
import Login from "./pages/Login";
import { adminRoutes } from "./routes";

//import ALGORITHMS
import { recoverDataOfUser } from "./algorithms/recoverDataOfUser";
import { recoverUniversities } from "./algorithms/recoverUniversities";
import { recoverDataListOfCourses } from "./algorithms/recoverDataListOfCourses";
import { recoverDataUnreviewedQuestions } from "./algorithms/recoverDataUnreviewedQuestions";
import { recoverDataOfAuthor } from "./algorithms/recoverDataOfAuthor";
import { roles } from "./constants/roles";

const AppContext = createContext();
const { Provider: AppProvider, Consumer } = AppContext;

export default function App() {
  const firestoreInstance = getFirestore(useFirebaseApp()); //db
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState(auth.currentUser || null);
  const [dataOfUser, setDataOfUser] = useState(null);
  const [listOfCourses, setListOfCourses] = useState(null);
  const [universities, setUniversities] = useState(null);
  const [dataSubTopics, setDataSubTopics] = useState([]);
  const [dataOfAuthors, setDataOfAuthors] = useState(null);
  const [dataOfQuestionToReview, setDataOfQuestionToReview] = useState(null);
  const [unreviewedQuestionData, setUnreviewedQuestionData] = useState(null);
  const [loading, setLoading] = useState({ status: true, title: null });

  useEffect(() => {
    !universities && recoverUniversities(firestoreInstance, setUniversities);
    !listOfCourses &&
      recoverDataListOfCourses(firestoreInstance, setListOfCourses);
    !dataOfAuthors && recoverDataOfAuthor(firestoreInstance, setDataOfAuthors);
    !currentUser &&
      onAuthStateChanged(auth, async (user) => {
        setLoading({ status: true, title: null });
        user ? setCurrentUser(user) : setCurrentUser(null);
        if (user) {
          const recoverUser = await recoverDataOfUser(firestoreInstance, user);
          recoverUser.forEach((doc) => setDataOfUser(doc.data()));
        }
        setLoading({ status: false, title: null });
      });
    return () => {};
  }, [auth, dataOfUser, currentUser]);

  useEffect(() => {
    !unreviewedQuestionData &&
      recoverDataUnreviewedQuestions({
        firestoreInstance,
        setUnreviewedQuestionData,
        setLoading,
      });
    // unreviewedQuestionData && console.log(unreviewedQuestionData);
  }, [unreviewedQuestionData]);

  const appValue = {
    setCurrentUser,
    currentUser,
    setDataOfUser,
    dataOfUser,
    universities,
    setLoading,
    dataSubTopics,
    setDataSubTopics,
    listOfCourses,
    setListOfCourses,
    dataOfQuestionToReview,
    setDataOfQuestionToReview,
    unreviewedQuestionData,
    setUnreviewedQuestionData,
    setDataOfAuthors,
    dataOfAuthors,
  };

  if ((loading.status && !currentUser) || loading.status) {
    return (
      <MainSpinner
        title={loading.title ?? "Hey tú, sí tú... ¡ME IMPORTAS MUCHO!"}
      />
    );
  }

  return (
    <FirestoreProvider sdk={firestoreInstance}>
      <AppProvider value={appValue}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Routes>
            {/* <Route path="/" element={<h1>Landing</h1>} /> */}
            <Route path="/" element={<Login />} />
            {currentUser && dataOfUser
              ? dataOfUser.typeOfUser?.includes(roles.DATA_ADMIN)
                ? adminRoutes.map((route) => (
                    <Route
                      path={route.path}
                      key={route.path}
                      element={<AdminLayout children={route.element} />}
                    />
                  ))
                : window.open("https://www.ebbiner.com", "_self")
              : undefined}
            <Route path="*" element={<h1>Error 404</h1>} />
          </Routes>
        </ThemeProvider>
      </AppProvider>
    </FirestoreProvider>
  );
}

export { App, Consumer as AppConsumer, AppContext };
