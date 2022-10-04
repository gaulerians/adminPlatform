import {collection, query, where, doc, getDocs} from 'firebase/firestore';

export const recoverDataOfUser = async(db, user) => {
    const recoverUser = await getDocs(
        query(
            collection(db, "users"),
            where("uid", "==", user.uid)
        )
    )
    return recoverUser
}