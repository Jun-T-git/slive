import { db } from "~/common/firebase/fbConfig";
import {
  collection,
  doc,
  deleteDoc,
  setDoc,
  getDocs,
} from "firebase/firestore";
import { deleteAllComments } from "./comments";

// roomIdで指定したルームを削除する
export const deleteRoom = async (roomId: string) => {
  await deleteAllComments(roomId);
  await deleteDoc(doc(db, `rooms/${roomId}`));
};

// ルームを新規作成し，roomIdを返す
export const createRoom = async () => {
  const col = collection(db, "rooms");
  const newRoomRef = doc(col); // Add a new document with a generated id
  await setDoc(newRoomRef, {});
  return newRoomRef.id;
};

// roomIdで指定したルームが存在するか
export const isRoomExist = async (roomId: string) => {
  const col = collection(db, "rooms");
  const querySnapshot = await getDocs(col);
  let isExist = false;
  querySnapshot.forEach((document) => {
    if (document.id == roomId) {
      isExist = true;
    }
  });
  return isExist;
};
