import React, { useState } from "react";
import { postComment } from "~/firebase/comments";

type Props = {
  code: string;
};

const Stamp: React.VFC<Props> = ({ code }) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const handleButtonClick = () => {
    setIsDisabled(true); // 連打防止
    postComment({ content: `::${code}::`, color: "" });
    setTimeout(() => setIsDisabled(false), 500);
  };

  return (
    <button
      onClick={handleButtonClick}
      disabled={isDisabled}
      className="px-5 py-1 bg-green-900 rounded-full border border-green-700 md:hover:opacity-80"
    >
      {isDisabled ? (
        <img src="../loading.png" className="animate-spin w-5 h-5 mb-0.5" />
      ) : (
        <img src={`../stamps/${code}.png`} className="w-5 h-5 mb-0.5" />
      )}
    </button>
  );
};

export default Stamp;
