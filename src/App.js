import React, { useState, useEffect, createContext } from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./theme/GlobalStyles";
import { Routes, Route } from "react-router-dom";
import theme from "./theme/Theme";
import AdminLayout from "./components/layouts/AdminLayout";

//import firebase utils
import { getAuth, onAuthStateChanged, } from "firebase/auth";
import { FirestoreProvider, useFirebaseApp } from "reactfire";
import firestore, {
  doc,
  getFirestore,
  Timestamp,
  getDoc,} from "firebase/firestore";

//import Routes
import { adminRoutes } from "./routes";

//import ALGORITHMS
import { recoverDataOfUser } from "./algorithms/recoverDataOfUser";
import { recoverUniversities } from "./algorithms/recoverUniversities";

import Login from "./pages/Login";
import Register from "./pages/Register";
import { useReducedState } from "./hooks/useReducedState";

const AppContext = createContext();
const { Provider: AppProvider, Consumer } = AppContext;

export default function App() {
  const firestoreInstance = getFirestore(useFirebaseApp());
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState(auth.currentUser || null);
  const [dataOfUser, setDataOfUser] = useState(null);
  const [weekExam, setWeekExam] = useReducedState({
    questions: null,
    metadata: null,
    timers: null,
    totalMarkedAnswers: [],
  });
  const [simulacrum, setSimulacrum] = useReducedState({
    questions: null,
    metadata: null,
    timers: null,
    totalMarkedAnswers: [],
  });
  const [week, setWeek] = useState(null); //Temporal state
  const [dataOfClasses, setDataOfClasses] = useState(null);
  const [dataPrevOfClasses, setDataPrevOfClasses] = useState(null);
  const [weekSelected, setWeekSelected] = useState();
  const [universities, setUniversities] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subscriptionTime, setSubscriptionTime] = useReducedState({
    serverDateNow: null,
    endTimestamp: null,
    timeRemaining: 0,
  });
  //Lista de examenes simulacro resueltos para no ejecutar doble carga
  const [solvedExams, setSolvedExams] = useReducedState({});


  useEffect(() => {
    !universities && recoverUniversities(firestoreInstance, setUniversities);
    !currentUser &&
    onAuthStateChanged(auth, async (user) => {
        setLoading(true);
        user ? setCurrentUser(user) : setCurrentUser(null);
        if (user) {
          if (!dataOfClasses || !dataPrevOfClasses) {
            const classesRef = doc(
              firestoreInstance,
              "classes",
              "listOfNewLongClasses"
            );

            const classesRefBack = doc(
              firestoreInstance,
              "classes",
              "listOfClasses"
            );

            const classesSnap = await getDoc(classesRef);
            setDataOfClasses(classesSnap.exists() && classesSnap.data());

            const classesSnapPrev = await getDoc(classesRefBack);
            setDataPrevOfClasses(
              classesSnapPrev.exists() && classesSnapPrev.data()
            );

          }
          const recoverUser = await recoverDataOfUser(firestoreInstance, user);
          recoverUser.forEach((doc) => {
            setDataOfUser(doc.data());
            let serverTimestamp = Timestamp.now().toDate();
            if (doc.data()?.subscriptionData?.endTimestamp) {
              let time = Math.ceil(
                (doc.data().subscriptionData.endTimestamp.toDate().getTime() -
                  serverTimestamp.getTime()) /
                  (1000 * 60 * 60 * 24)
              );
              setSubscriptionTime({
                endTimestamp: doc.data().subscriptionData.endTimestamp.toDate(),
                serverDateNow: serverTimestamp,
                timeRemaining: time > 0 ? time : 0,
              });
            }
          });
        }
        setLoading(false);
      });

    return () => {};
  }, [auth, dataOfUser, currentUser]);

  const appValue = {
    setCurrentUser,
    currentUser,
    setSimulacrum,
    simulacrum,
    setDataOfUser,
    dataOfUser,
    week,
    dataPrevOfClasses,
    dataOfClasses,
    weekSelected,
    setWeekSelected,
    subscriptionTime,
    setSubscriptionTime,
    solvedExams,
    setSolvedExams,
    universities,
    weekExam,
    setWeekExam,
    setLoading,
  };
  
  return (
    <FirestoreProvider sdk={firestoreInstance}>
      <AppProvider value={appValue}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Routes>
            {/* <Route path="/" element={<h1>Landing</h1>} /> */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
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
      </AppProvider>
    </FirestoreProvider>
  );
}

export { App, Consumer as AppConsumer, AppContext };