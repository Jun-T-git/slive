import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Header from "~/components/header";

const Index: React.VFC = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col space-y-7 my-10 px-2">
        <Link href="/setting">
          <div className="w-full max-w-md border bg-[#112233] mx-auto flex items-center rounded hover:opacity-50">
            <img
              src="../presenter.svg"
              alt="発表者"
              className="max-w-[55px] m-5"
            />
            <h2 className="m-5 text-xl font-bold">発表する</h2>
          </div>
        </Link>
        <Link href="/audience">
          <div className="w-full max-w-md border bg-[#112233] mx-auto flex items-center rounded hover:opacity-50">
            <img
              src="../audience.svg"
              alt="発表者"
              className="max-w-[55px] m-5"
            />
            <h2 className="m-5 text-xl font-bold">視聴・コメントする</h2>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Index;
