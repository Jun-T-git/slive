// フルスクリーン状態なら解除
export const cancelFullScreen = async () => {
  if (document.fullscreenElement) {
    await document.exitFullscreen();
  }
};
