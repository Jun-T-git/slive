import React, { ChangeEvent, useState } from "react";
import Header from "~/components/header";
import Stamp from "~/components/stamp";
import { postComment } from "~/firebase/comments";

const Audience: React.VFC = () => {
  const [inputComment, setInputComment] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [commentColor, setCommentClolor] = useState<string>("#5599cc");
  const isDisabled = () => !!errorMessage || !inputComment;

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
    <>
      <Header />
      <div className="p-5 mx-auto max-w-xl">
        <h2 className="text-center text-2xl font-bold py-5 mb-5">
          コメントを送信する
        </h2>
        <div>
          <p className="text-center">
            コメントは発表者のスライド上に匿名で流れます
          </p>
          <textarea
            className="block text-black bg-gray-300 w-full p-1 mt-2 mb-3 h-full border text-sm rounded"
            rows={4}
            value={inputComment}
            placeholder="こんにちは！"
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
        </div>
        <button
          className={
            "block w-full py-2 mt-10 text-white rounded " +
            (isDisabled() ? "bg-gray-500" : "bg-green-600")
          }
          onClick={HandleButtonClick}
          disabled={isDisabled()}
        >
          送信
        </button>
      </div>
    </>
  );
};

export default Audience;
