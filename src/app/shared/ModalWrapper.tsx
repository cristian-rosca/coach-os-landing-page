import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const ModalWrapper = ({ children, isOpen, setIsOpen }: ModalProps) => {

const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {    
  const targetElement = e.target as Element;
    if (targetElement?.closest('.alert-toast')) {      
      return;
    }
    setIsOpen(false);
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-20 overflow-y-auto"
        onClose={() => null}
        // If the user presses ESC, close the modal
        onKeyDown={(e) => {
          if (e.key === "Escape") setIsOpen(false);
        }}
        onClick={handleOutsideClick}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 z-20 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-20 overflow-y-auto">
          <div className="mx-auto flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0 md:max-w-lg">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              {children}
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalWrapper;
