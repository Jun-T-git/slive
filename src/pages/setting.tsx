import { useRouter } from "next/router";
import React, { ChangeEvent, useState } from "react";
import { useRecoilState } from "recoil";
import { createRoom } from "~/common/firebase/rooms";
import { slideSrcState } from "~/common/recoil/atoms";
import Header from "~/components/header";

const Setting: React.VFC = () => {
  const [slideSrc, setSlideSrc] = useRecoilState(slideSrcState);
  const router = useRouter();

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const slideLink = e.target.value;
    const slideEmbedSrc = slideLink.replace(/\/pub/, "/embed");
    setSlideSrc(slideEmbedSrc);
  };

  const onClickButton = async () => {
    const roomId = await createRoom();
    router.push(`${roomId}/presentation`);
  };

  return (
    <>
      <Header />
      <div className="p-5 mx-auto max-w-xl">
        <h1 className="text-center text-2xl font-bold py-5">ルーム設定</h1>
        <p className="text-sm pt-7 pb-3">
          Googleスライドの [ファイル＞ウェブに公開＞リンク＞公開]
          で表示されるURLをコピーして貼り付けてください。
        </p>
        <textarea
          className="block text-black bg-gray-300 w-full p-1 my-1 h-full border text-sm rounded"
          rows={5}
          placeholder="https://docs.google.com/presentation/..."
          value={slideSrc}
          onChange={handleTextareaChange}
        />
        {slideSrc ? (
          <iframe src={slideSrc} className="my-10 w-full h-[21rem]" />
        ) : (
          <div className="my-10 w-full h-[21rem] bg-gray-800 text-gray-700 text-4xl font-bold flex justify-center items-center border border-gray-700">
            Slide Preview
          </div>
        )}
        <button
          className={
            "block text-center w-full py-2 my-5 h-full text-white text-sm rounded " +
            (slideSrc ? "bg-green-600" : "bg-gray-500")
          }
          disabled={!slideSrc}
          onClick={onClickButton}
        >
          ルームを作成する
        </button>
      </div>
    </>
  );
};

export default Setting;
