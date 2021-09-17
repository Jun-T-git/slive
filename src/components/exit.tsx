import React from "react";
import { useRouter } from "next/router";
import { cancelFullScreen } from "~/libs/cancelFullScreen";

const Exit: React.VFC = () => {
  const router = useRouter();
  const handleButtonClick = async () => {
    await cancelFullScreen();
    router.push("/setting");
  };
  return (
    <button onClick={handleButtonClick}>
      <img src="../exit.svg" className="w-10 h-10" />
    </button>
  );
};

export default Exit;
