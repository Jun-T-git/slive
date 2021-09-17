import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { slideSrcState } from "~/recoil/atoms";

const FullScreen: React.VFC = () => {
  const slideSrc = useRecoilValue(slideSrcState);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  useEffect(() => {
    initFullScreen();
  }, []);

  const initFullScreen = () => {
    const screenElm = document.getElementsByTagName("body")[0];
    const fullScreenElm = document.fullscreenElement;
    setIsFullScreen(!!fullScreenElm);
    screenElm.onfullscreenchange = () => setIsFullScreen((prev) => !prev);
    if (!fullScreenElm && slideSrc) {
      screenElm.requestFullscreen();
    }
  };

  const changeFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      document.getElementsByTagName("body")[0].requestFullscreen();
    }
  };

  return (
    <button onClick={changeFullScreen}>
      {isFullScreen ? (
        <img src="../zoom_out.svg" className="w-10 h-10" />
      ) : (
        <img src="../zoom_in.svg" className="w-10 h-10" />
      )}
    </button>
  );
};

export default FullScreen;
