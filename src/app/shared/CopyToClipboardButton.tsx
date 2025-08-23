"use client";

import { useState } from "react";
import Tooltip from "./Tooltip";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";

type CopyToClipboardButtonProps = {
  text: string;
};

export default function CopyToClipboardButton({
  text,
}: CopyToClipboardButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(text);
  };

  const resetState = () => {
    setIsCopied(false);
  };

  return (
    <Tooltip displayText={isCopied ? "Copied!" : "Copy to clipboard"} onClick={copyToClipboard}>
      <DocumentDuplicateIcon className="h-4 w-4 text-gray-800" onBlur={resetState} onMouseLeave={resetState} />
    </Tooltip>
  );
}
