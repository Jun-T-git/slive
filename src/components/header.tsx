import Link from "next/link";
import React from "react";

const Header: React.VFC = () => {
  return (
    <nav className="p-2 md:px-5 border-b-2 border-green-900">
      <h1 className="text-gray-50 text-3xl font-bold">
        <Link href="/">
          <a>SLive</a>
        </Link>
      </h1>
    </nav>
  );
};

export default Header;
