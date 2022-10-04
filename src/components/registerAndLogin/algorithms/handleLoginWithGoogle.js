import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  collection,
  query,
  where,
  doc,
  setDoc,
  getDocs,
  arrayUnion,
} from "firebase/firestore";

const provider = new GoogleAuthProvider();

export const handleLoginWithGoogle = (
  db,
  navigate,
  setCurrentUser,
  setLoading
) => {
  const auth = getAuth();
  auth.languageCode = "es";
  signInWithPopup(auth, provider)
    .then(async (result) => {
      setLoading(true);
      const user = result.user;
      const usersRef = collection(db, "users");
      if (user) {
        const recoverQuery = query(usersRef, where("email", "==", user.email));
        const recoverUser = await getDocs(recoverQuery);
        if (!recoverUser.empty) {
          const thisUserRef = doc(db, "users", user.uid);
          await setDoc(
            thisUserRef,
            {
              metadata: {
                createdAt: parseInt(user.metadata.createdAt),
                listOfLogins: arrayUnion(parseInt(user.metadata.lastLoginAt)),
              }
            },
            { merge: true }
          ).then(async () => {
            setCurrentUser(auth.currentUser);
            setLoading(false);
            navigate("/home");
          });
        } else {
          signOut(auth).then(() => {
            setLoading(false);
            navigate("/register", { replace: true });
          });
          setCurrentUser(null);
        }
      }
    })
    .catch((error) => {
      setLoading(false);
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      console.log(errorCode, errorMessage);
      email && console.log(email);
    });
};
