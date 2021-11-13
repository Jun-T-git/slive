import React from "react";
import { useRouter } from "next/router";

const Exit: React.VFC = () => {
  const router = useRouter();
  const handleButtonClick = async () => {
    await cancelFullScreen();
    router.push("/setting");
  };

  // フルスクリーン状態なら解除
  const cancelFullScreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    }
  };

  return (
    <button onClick={handleButtonClick}>
      <img src="../exit.svg" className="w-10 h-10" />
    </button>
  );
};

export default Exit;
