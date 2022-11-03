import { getAuth, signOut } from "firebase/auth";

export const closeSession = ({
  navigate,
  setDataOfUser,
  setCurrentUser,
  setLoading,
}) => {
  const auth = getAuth();
  if (auth) {
    setLoading(true);
    signOut(auth).then(() => {
      setDataOfUser(null);
      setCurrentUser(null);
      navigate("/");
      setLoading(false);
    });
  }
};
