import React, { useState } from "react";
import { useRouter } from "next/router";
import Modal from "./modal";

const Exit: React.VFC = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleButtonClick = async () => {
    await cancelFullScreen();
    setIsOpen(false);
    router.push("/setting");
  };

  // フルスクリーン状態なら解除
  const cancelFullScreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    }
  };

  return isOpen ? (
    <Modal
      title="発表を終了しますか？"
      description="終了すると、ルーム・コメントは削除されます。"
      isOpen={isOpen}
    >
      <div className="max-w-lg mx-auto">
        <img src="../exit.svg" className="w-40 h-40 mx-auto my-8" />
        <div className="flex gap-4">
          <button
            onClick={handleButtonClick}
            className="block text-center w-full py-2 mt-5 h-full text-white text-sm rounded bg-green-600"
          >
            終了する
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="block text-center w-full py-2 mt-5 h-full text-white text-sm rounded bg-gray-500"
          >
            キャンセル
          </button>
        </div>
      </div>
    </Modal>
  ) : (
    <button onClick={() => setIsOpen(true)}>
      <img src="../exit.svg" className="w-10 h-10" />
    </button>
  );
};

export default Exit;
