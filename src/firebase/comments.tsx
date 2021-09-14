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
import { Comment } from "~/types/comment";

type CommentHandler = (comment: Comment) => any;
export const observeCommentPost = (onPost: CommentHandler) => {
  const col = collection(db, "comments");
  const q = query(col);
  onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        const comment = change.doc.data();
        onPost({ content: comment.content, color: comment.color });
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

export const postComment = async ({ content, color }: Comment) => {
  const col = collection(db, "comments");
  await addDoc(col, { content: content, color: color });
};
