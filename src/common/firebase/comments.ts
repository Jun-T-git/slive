import { db } from "~/common/firebase/fbConfig";
import {
  collection,
  doc,
  getDocs,
  deleteDoc,
  addDoc,
  onSnapshot,
  query,
  Unsubscribe,
} from "firebase/firestore";
import { Comment } from "~/types/comment";

type CommentHandler = (comment: Comment) => any;

// roomIdで指定したルームにコメントが投稿されたときにonPostを実行する
export const observeCommentPost = (
  roomId: string,
  onPost: CommentHandler
): Unsubscribe => {
  const col = collection(db, `/rooms/${roomId}/comments`);
  const q = query(col);
  return onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        const comment = change.doc.data();
        onPost({ content: comment.content, color: comment.color });
      }
    });
  });
};

// roomIdで指定したルームのコメントを全て削除する
export const deleteAllComments = async (roomId: string) => {
  const col = collection(db, `/rooms/${roomId}/comments`);
  const querySnapshot = await getDocs(col);
  querySnapshot.forEach((document) => {
    deleteDoc(doc(db, `${document.id}`));
  });
};

// roomIdで指定したルームにコメントを投稿する
export const postComment = async (
  roomId: string,
  { content, color }: Comment
) => {
  const col = collection(db, `/rooms/${roomId}/comments`);
  await addDoc(col, { content: content, color: color });
};
