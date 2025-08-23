"use client";

import React, { ReactNode, useState } from "react";

export type TooltipProps = {
  displayText: string;
  children: ReactNode;
  onClick?: () => void;
}

const Tooltip = ({ displayText, children, onClick }: TooltipProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleOnClick = () => {
    if (onClick) {
      onClick();
    }
    setIsFocused(!isFocused);
  }

  return (
    <div className="group relative flex items-center gap-2">
      <button
        className="rounded text-sm"
        aria-describedby="tooltip-content"
        aria-expanded={isFocused ? "true" : "false"}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        type="button"
        onClick={handleOnClick}
      >
        {children}
      </button>
      <div
        className={`left-10 z-40 flex items-center  transition-all group-hover:scale-100 ${
          isFocused ? "scale-100" : "scale-0"
        }`}
      >
        <span
          id="tooltip-content"
          role="tooltip"
          aria-hidden={isFocused ? "false" : "true"}
          className={`absolute z-50 w-32 rounded bg-gray-800 p-2 text-xs text-white `}
        >
          {displayText}
        </span>
        <div className="absolute z-40 h-3 w-3 rotate-45 bg-gray-800" />
      </div>
    </div>
  );
};

export default Tooltip;
