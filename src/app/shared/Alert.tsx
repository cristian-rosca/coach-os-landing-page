"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Portal } from "@headlessui/react";
import { AlertData, useAlert } from "../contexts/AlertContext";

interface AlertProps extends AlertData {
  isVisible: boolean;
}

export const Alert: React.FC<AlertProps> = ({
  isVisible = false,
  title,
  message,
  timeout = 5,
  variant,
  id,
}) => {
  const { hideAlert } = useAlert();
  const [visible, setVisible] = useState(isVisible);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false);
        hideAlert(id);
      }, timeout * 1000);

      return () => clearTimeout(timer); // This will clear Timeout when component unmounts
    }
  }, [visible, timeout, id, hideAlert]);

  const colorTheme = {
    success: {
      bg: "bg-green-50",
      icon: "text-green-400",
      iconBg: "hover:bg-green-100",
      iconFocus: "focus:ring-green-600",
      iconOffset: "focus:ring-offset-green-50",
      h3: "text-green-800",
      p: "text-green-700",
      iconText: "text-green-500",
    },
    error: {
      bg: "bg-red-50",
      icon: "text-red-400",
      iconBg: "hover:bg-red-100",
      iconFocus: "focus:ring-red-600",
      iconOffset: "focus:ring-offset-red-50",
      h3: "text-red-800",
      p: "text-red-700",
      iconText: "text-red-500",
    },
    warn: {
      bg: "bg-yellow-50",
      icon: "text-yellow-400",
      iconBg: "hover:bg-yellow-100",
      iconFocus: "focus:ring-yellow-600",
      iconOffset: "focus:ring-offset-yellow-50",
      h3: "text-yellow-800",
      p: "text-yellow-700",
      iconText: "text-yellow-500",
    }
  };

  return (
    <Portal>
      <div
        className={`rounded-md ${colorTheme[variant].bg} p-4 ${
          visible ? "block" : "hidden"
        } alert-toast fixed left-1 right-1 top-2 z-30 mx-auto mb-2 max-w-sm`}
      >
        <div className="flex">
          <div className="ml-3">
            <h3 className={`text-sm font-medium ${colorTheme[variant].h3}`}>
              {title}
            </h3>
            {message && (
              <div className={`mt-2 text-sm ${colorTheme[variant].p}`}>
                <p>{message}</p>
              </div>
            )}
          </div>
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={() => {
                  hideAlert(id);
                }}
                className={`inline-flex rounded-md ${colorTheme[variant].bg} p-1.5 ${colorTheme[variant].iconText} ${colorTheme[variant].iconBg} focus:outline-none focus:ring-2 ${colorTheme[variant].iconFocus} focus:ring-offset-2 ${colorTheme[variant].iconOffset}`}
              >
                <span className="sr-only">Dismiss</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};
