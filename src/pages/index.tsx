import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Header from "~/components/header";

const Index: React.VFC = () => {
  const [roomId, setRoomId] = useState<string>("");
  const [isAudience, setIsAudience] = useState<boolean>(false);
  return (
    <>
      <Header />
      <div className="flex flex-col space-y-7 my-10 px-2 max-w-md mx-auto">
        <Link href="/setting">
          <a>
            <div className="w-full border bg-[#112233] mx-auto flex items-center rounded hover:opacity-50">
              <img
                src="../presenter.svg"
                alt="発表者"
                className="max-w-[55px] m-5"
              />
              <h2 className="m-5 text-xl font-bold">発表する</h2>
            </div>
          </a>
        </Link>
        <button
          onClick={() => setIsAudience((prev) => !prev)}
          className="w-full border bg-[#112233] mx-auto flex items-center rounded hover:opacity-50"
        >
          <img
            src="../audience.svg"
            alt="発表者"
            className="max-w-[55px] m-5"
          />
          <h2 className="m-5 text-xl font-bold">視聴・コメントする</h2>
        </button>
        {isAudience && (
          <div>
            <p className="text-sm pt-5 pb-2">
              入室したいルームのルームIDを入力してください。
            </p>
            <input
              className="block text-black bg-gray-300 w-full p-1 my-1 h-full border text-sm rounded"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            />
            <Link href={`/${roomId}/audience`}>
              <a
                className={
                  "block text-center w-full py-2 my-5 h-full text-white text-sm rounded " +
                  (roomId ? "bg-green-600" : "bg-gray-500 pointer-events-none")
                }
              >
                入室する
              </a>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Index;
