import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { deleteAllComments, observeCommentPost } from "~/firebase/comments";

const Presenter: React.VFC = () => {
  const count = useRef(0);

  useEffect(() => {
    (async () => {
      await deleteAllComments();
      observeCommentPost((newComment) => createCommentElm(newComment));
    })();
  }, []);

  const createCommentElm = async (comment: string) => {
    count.current++;
    const div_comment = document.createElement("div");
    const div_wrapper = document.getElementById("commentWrapper");
    div_comment.id = "text" + count.current; //アニメーション処理で対象の指定に必要なidを設定
    div_comment.style.position = "fixed"; //テキストのは位置を絶対位置にするための設定
    div_comment.style.whiteSpace = "nowrap"; //画面右端での折り返しがなく、画面外へはみ出すようにする
    div_comment.style.left = document.documentElement.clientWidth + "px"; //初期状態の横方向の位置は画面の右端に設定
    var random = Math.round(Math.random() * div_wrapper.clientHeight * 0.3);
    div_comment.style.top = random + "px"; //初期状態の縦方向の位置は画面の上端から下端の間に設定（ランダムな配置に）
    div_comment.appendChild(document.createTextNode(comment)); //画面上に表示されるテキストを設定
    div_wrapper.appendChild(div_comment); //body直下へ挿入

    //ライブラリを用いたテキスト移動のアニメーション： durationはアニメーションの時間、
    //横方向の移動距離は「画面の横幅＋画面を流れるテキストの要素の横幅」、移動中に次の削除処理がされないようawait
    await gsap.to("#" + div_comment.id, {
      duration: 5 - comment.length / 100,
      x: -1 * (document.documentElement.clientWidth + div_comment.clientWidth),
    });

    div_comment.parentNode.removeChild(div_comment); //画面上の移動終了後に削除
  };

  return <div id="commentWrapper" className="w-80 h-80 mx-auto border-2"></div>;
};

export default Presenter;
