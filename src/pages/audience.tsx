import React, { ChangeEvent, useMemo, useRef, useState } from "react";
import Stamp from "~/components/stamp";
import { postComment } from "~/firebase/comments";

const Audience: React.VFC = () => {
  const [inputComment, setInputComment] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [commentColor, setCommentClolor] = useState<string>("#3333cc");
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
    setInputComment("");
  };

  return (
    <div className="p-5 mx-auto max-w-xl">
      <h1 className="text-center text-2xl font-bold py-5 mb-10">
        コメントを送信する
      </h1>
      <p className="text-center">
        コメントは発表者のスライド上に匿名で流れます
      </p>
      <textarea
        className="block w-full p-1 my-1 h-full border text-sm rounded"
        rows={4}
        value={inputComment}
        onChange={HandleTextareaChange}
      />
      <p className="text-red-500 text-xs">{errorMessage}</p>
      <div className="flex justify-between align-middle my-2">
        <div className="space-x-2.5">
          <Stamp code="clapping_hands" />
          <Stamp code="red_heart" />
          <Stamp code="laugh_face" />
          <Stamp code="cry_face" />
        </div>
        <div
          className="w-8 h-8 rounded-full border border-gray-400"
          style={{ background: commentColor }}
        >
          <input
            type="color"
            value={commentColor}
            onChange={(e) => {
              setCommentClolor(e.target.value);
            }}
            className="w-full h-full opacity-0"
          />
        </div>
      </div>
      <button
        className={
          "block w-full py-2 mt-20 h-full text-white rounded " +
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
