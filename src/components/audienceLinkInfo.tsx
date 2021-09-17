import React, { useState } from "react";
import Modal from "~/components/modal";

const AudienceLinkInfo: React.VFC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
          <img src="../qrcode.png" className="w-52 h-52 mx-auto" />
          <input
            type="text"
            value="https://slive-xi.vercel.app/audience"
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
