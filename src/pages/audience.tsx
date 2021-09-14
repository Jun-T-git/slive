import React, { ChangeEvent, useMemo, useRef, useState } from "react";
import { postComment } from "~/firebase/comments";

const Audience: React.VFC = () => {
  const inputCommentRef = useRef(null);
  const [inputComment, setInputComment] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [commentColor, setCommentClolor] = useState<string>("#000000");
  const isDisabled = useMemo(
    () => !!errorMessage || !inputComment,
    [errorMessage, inputComment]
  );

  const HandleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const comment = e.target.value;
    if (comment.length > 100) {
      setErrorMessage("※100文字以内で入力してください");
    } else {
      setErrorMessage("");
      setInputComment(comment);
    }
  };

  const HandleButtonClick = () => {
    postComment({ content: inputComment, color: commentColor });
    inputCommentRef.current.value = "";
    setInputComment("");
  };

  return (
    <div className="p-5 mx-auto max-w-xl">
      <h1 className="text-center text-2xl font-bold py-5">
        コメントを送信する
      </h1>
      <p className="text-center">
        送信したコメントは発表者のスライド上に流れます
      </p>
      <textarea
        className="block w-full p-1 my-1 h-full border text-sm rounded"
        rows={4}
        ref={inputCommentRef}
        onChange={HandleTextareaChange}
      />
      <p className="text-red-500 text-xs">{errorMessage}</p>
      <div className="flex justify-between my-2">
        <p className="text-sm">※コメントは匿名です</p>
        <div className="flex align-middle">
          <span>Color</span>
          <input
            type="color"
            onChange={(e) => {
              setCommentClolor(e.target.value);
            }}
            className="w-5"
          />
        </div>
      </div>
      <button
        className={
          "block w-full py-1 my-2 h-full text-white text-sm rounded " +
          (isDisabled ? "bg-gray-500" : "bg-blue-500")
        }
        onClick={HandleButtonClick}
        disabled={isDisabled}
      >
        送信
      </button>
    </div>
  );
};

export default Audience;
