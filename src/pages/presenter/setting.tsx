import React, { ChangeEvent } from "react";
import Link from "next/link";
import { useSetRecoilState } from "recoil";
import { slideSrcState } from "~/recoil/atoms";

const Setting: React.VFC = () => {
  const setSlideSrc = useSetRecoilState(slideSrcState);

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const slideLink = e.target.value;
    const slideEmbedSrc = slideLink.replace(/\/pub/, "/embed");
    setSlideSrc(slideEmbedSrc);
  };

  return (
    <div className="p-5 mx-auto max-w-md">
      <textarea
        className="block w-full p-1 my-1 h-full border text-sm rounded"
        rows={5}
        onChange={handleTextareaChange}
      />
      <Link href="/presenter/presentation">
        <a className="block text-center w-full py-1 my-5 h-full text-white text-sm rounded bg-blue-500">
          スライドを設定する
        </a>
      </Link>
    </div>
  );
};

export default Setting;
