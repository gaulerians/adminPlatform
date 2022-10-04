import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {
  doc,
  arrayUnion,
  writeBatch,
  query,
  where,
  collection,
  getDocs,
  Timestamp,
} from "firebase/firestore";

export const SignInWithGoogle = (db, navigate) => {
  try {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    auth.languageCode = "es";
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = await result.user;
        const data = {
          displayName: user.displayName,
          email: user.email,
          createdAt: user.metadata.createdAt,
          listOfLogins: user.metadata.lastLoginAt,
          photoURL: user.photoURL.replace("s96-c", "s400-c"),
        };
        await sendDataUserFromGoogle(data, user.uid, db);
        return navigate("/home", { replace: true });
        console.log("Logged Successfully");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        // The email of the user's account used.
        console.log(errorCode, errorMessage);
        email && console.log(email);
      });
  } catch (err) {
    console.error(err.message);
  }
};

const sendDataUserFromGoogle = async (data, uid, db) => {
  try {
    const { displayName, email, createdAt, listOfLogins, photoURL } = data;
    const batch = await writeBatch(db);
    const thisUserRef = doc(db, "users", uid);
    const recoverQuery = await query(
      collection(db, "users"),
      where("uid", "==", uid)
    );
    const querySnapshot = await getDocs(recoverQuery);
    if (querySnapshot.empty) {
      batch.set(
        thisUserRef,
        {
          username: displayName,
          name: {
            firstName: "",
            lastName: "",
          },
          email,
          uid,
          photoURL,
          universityAcronym: "UNSCH",
          unversityName: "Universidad Nacional de San Cristóbal de Huamanga",
          subscriptionData: {
            //Le damos 15 dias a partir del momento del registro RECORDAR QUE ES TEMPORAL
            endTimestamp: null,
          },
          metadata: {
            createdAt: parseInt(createdAt),
            listOfLogins: arrayUnion(parseInt(listOfLogins)),
          },
        },
        { merge: true }
      );

      await batch
        .commit()
        .then(() => {
          console.log("User created");
          window.location.reload();
        })
        .catch((err) => {
          console.error(err.message);
        });
    }
  } catch (err) {
    console.error(err.message);
  }
};
