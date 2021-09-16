import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { deleteAllComments, observeCommentPost } from "~/firebase/comments";
import { useRecoilValue } from "recoil";
import { slideSrcState } from "~/recoil/atoms";
import { Comment } from "~/types/comment";
import { Unsubscribe } from "@firebase/firestore";

const Presentation: React.VFC = () => {
  const count = useRef<number>(0);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const unsubscribeRef = useRef<Unsubscribe | null>(null);
  const slideSrc = useRecoilValue(slideSrcState);

  useEffect(() => {
    initFullScreen();

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

  const initFullScreen = () => {
    const screenElm = document.getElementById("screen");
    const fullScreenElm = document.fullscreenElement;
    setIsFullScreen(!!fullScreenElm);
    screenElm.onfullscreenchange = () => setIsFullScreen((prev) => !prev);
    if (!fullScreenElm && slideSrc) {
      console.log(screenElm);
      screenElm.requestFullscreen();
    }
  };

  const changeFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      document.getElementById("screen").requestFullscreen();
    }
  };

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
      <div className="bg-[#00000077] p-2 fixed z-30 flex space-x-5">
        <Link href="/presenter/setting">
          <a>
            <img src="../exit.svg" className="w-10 h-10" />
          </a>
        </Link>
        <button onClick={changeFullScreen}>
          {isFullScreen ? (
            <img src="../zoom_out.svg" className="w-10 h-10" />
          ) : (
            <img src="../zoom_in.svg" className="w-10 h-10" />
          )}
        </button>
      </div>
      <iframe src={slideSrc} className="w-screen h-screen" />
    </div>
  );
};

export default Presentation;
