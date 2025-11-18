import React from "react";
import Link from "next/link";

const ButtonArrow = ({ href = "/projects", text }) => {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-wider bg-yellow-400 text-gray-900 px-6 py-3 rounded-full border-2 border-yellow-300 hover:bg-yellow-300 transition-colors"
    >
      {text}
      <span className="inline-flex w-7 h-7 items-center justify-center bg-gray-900 text-yellow-400 rounded-md">
        →
      </span>
    </Link>
  );
};

export default ButtonArrow;
