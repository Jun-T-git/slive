import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { postComment } from "~/firebase/comments";

const Audience: React.VFC = () => {
  const [inputComment, setInputComment] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const isDisabled = useMemo(
    () => !!errorMessage || !inputComment,
    [errorMessage, inputComment]
  );

  const ChangeTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const comment = e.target.value;
    if (comment.length > 100) {
      setErrorMessage("※100文字以内で入力してください");
    } else {
      setErrorMessage("");
      setInputComment(comment);
    }
  };

  return (
    <div className="p-5 mx-auto max-w-md">
      <textarea
        className="block w-full p-1 my-1 h-full border text-sm rounded"
        rows={4}
        onChange={ChangeTextHandler}
      />
      <p className="text-red-500 text-xs">{errorMessage}</p>
      <button
        className={
          "block w-full py-1 my-5 h-full text-white text-sm rounded " +
          (isDisabled ? "bg-gray-500" : "bg-blue-500")
        }
        onClick={() => postComment(inputComment)}
        disabled={isDisabled}
      >
        送信
      </button>
    </div>
  );
};

export default Audience;
