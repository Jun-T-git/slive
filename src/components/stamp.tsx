import React from "react";
import { postComment } from "~/firebase/comments";

type Props = {
  code: string;
};

const Stamp: React.VFC<Props> = ({ code }) => {
  return (
    <button
      onClick={() => postComment({ content: `::${code}::`, color: "" })}
      className="px-5 py-1 bg-blue-200 rounded-full border border-gray-400 md:hover:opacity-80"
    >
      <img src={`../images/${code}.png`} className="w-5 h-5 mb-0.5" />
    </button>
  );
};

export default Stamp;
