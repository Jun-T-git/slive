import { db } from "~/firebase/fbConfig";
import {
  collection,
  doc,
  getDocs,
  deleteDoc,
  addDoc,
  onSnapshot,
  query,
} from "firebase/firestore";

type CommentHandler = (comment: string) => any;

export const observeCommentPost = (onPost: CommentHandler) => {
  const col = collection(db, "comments");
  const q = query(col);
  onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        onPost(change.doc.data().content);
      }
    });
  });
};

export const deleteAllComments = async () => {
  const col = collection(db, "comments");
  const querySnapshot = await getDocs(col);
  querySnapshot.forEach((document) => {
    deleteDoc(doc(db, `comments/${document.id}`));
  });
};

export const postComment = async (comment: string) => {
  const col = collection(db, "comments");
  await addDoc(col, { content: comment });
};
