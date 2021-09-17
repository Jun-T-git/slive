import React from "react";
import AudienceLinkInfo from "./audienceLinkInfo";
import Exit from "./exit";
import FullScreen from "./fullScreen";

const ScreenMenu: React.VFC = () => {
  return (
    <div className="bg-[#00000077] p-2 fixed z-30 flex space-x-5">
      <Exit />
      <FullScreen />
      <AudienceLinkInfo />
    </div>
  );
};

export default ScreenMenu;
