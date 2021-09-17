import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { deleteAllComments, observeCommentPost } from "~/firebase/comments";
import { useRecoilValue } from "recoil";
import { slideSrcState } from "~/recoil/atoms";
import { Comment } from "~/types/comment";
import { Unsubscribe } from "@firebase/firestore";
import ScreenMenu from "~/components/screenMenu";

const Presentation: React.VFC = () => {
  const count = useRef<number>(0);
  const unsubscribeRef = useRef<Unsubscribe | null>(null);
  const slideSrc = useRecoilValue(slideSrcState);

  useEffect(() => {
    (async () => {
      await deleteAllComments(); // 入室前に送信されたコメントの削除
      unsubscribeRef.current = observeCommentPost((newComment) =>
        createCommentElm(newComment)
      );
    })();

    return () => {
      (async () => {
        await deleteAllComments();
        if (unsubscribeRef.current) {
          unsubscribeRef.current();
        }
      })();
    };
  }, []);

  // コメントの表示
  const createCommentElm = async (comment: Comment) => {
    count.current++;
    const div_comment = document.createElement("div");
    const div_wrapper = document.getElementById("screen");
    div_comment.id = "text" + count.current; //アニメーション処理で対象の指定に必要なidを設定
    div_comment.style.position = "fixed";
    div_comment.style.whiteSpace = "nowrap"; //画面右端での折り返しがなく、画面外へはみ出すようにする
    div_comment.style.left = document.documentElement.clientWidth + "px"; //初期状態の横方向の位置は画面の右端に設定
    const random = Math.round(Math.random() * div_wrapper.clientHeight * 0.3);
    div_comment.style.top = random + "px"; //縦方向の位置

    let commentChild;
    if (comment.content.match(/^::.*::$/)) {
      commentChild = document.createElement("img");
      commentChild.src = `../stamps/${comment.content.slice(2, -2)}.png`;
      div_comment.style.width = "30px";
      div_comment.style.height = "30px";
    } else {
      commentChild = document.createTextNode(comment.content);
      div_comment.style.color = comment.color; // 色設定
      div_comment.style.fontSize = "24px";
    }
    div_comment.appendChild(commentChild);
    div_wrapper.appendChild(div_comment);
    await gsap.to("#" + div_comment.id, {
      duration: 5 - comment.content.length / 100,
      x: -1 * (document.documentElement.clientWidth + div_comment.clientWidth),
    });

    div_comment.parentNode.removeChild(div_comment); //画面上の移動終了後に削除
  };

  return (
    <div id="screen" className="mx-auto border-2">
      <ScreenMenu />
      <iframe src={slideSrc} className="w-screen h-screen" />
    </div>
  );
};

export default Presentation;
