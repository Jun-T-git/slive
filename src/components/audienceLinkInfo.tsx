import { useRouter } from "next/router";
import React, { useState } from "react";
import { useQRCode } from "next-qrcode";
import Modal from "~/components/modal";

const AudienceLinkInfo: React.VFC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const roomId = router.query.roomId as string;
  const audienceUrl =
    process.env.NODE_ENV === "production"
      ? `https://slive-xi.vercel.app/${roomId}/audience`
      : `http://localhost:3000/${roomId}/audience`;

  const { inputRef } = useQRCode<HTMLImageElement>({
    text: audienceUrl,
    options: {
      type: "image/jpeg",
      quality: 0.3,
      level: "M",
      margin: 1,
      scale: 1,
      width: 200,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    },
  });

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        <img src="../barcode.svg" className="w-10 h-10" />
      </button>
      <Modal
        title="視聴用ページ"
        description="以下のQRコードまたはURLにアクセスすると、コメントやスタンプを送ることができます。"
        isOpen={isOpen}
      >
        <div className="text-center max-w-lg mx-auto">
          <img ref={inputRef} className="mx-auto" />
          <input
            type="text"
            value={audienceUrl}
            onFocus={(e) => e.target.select()}
            readOnly={true}
            className="text-black bg-gray-200 w-full p-1 my-5 h-full border text-lg rounded"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="block text-center w-full py-2 mt-5 h-full text-white text-sm rounded bg-green-600"
          >
            閉じる
          </button>
        </div>
      </Modal>
    </>
  );
};

export default AudienceLinkInfo;
