import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  closeOnOverlayClick?: boolean;
  onAction?: () => void;
  width?: string;
  height?: string;
  hasFooter?: boolean;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  closeOnOverlayClick = true,
  onAction,
  width = "600px",
  height = "auto",
  hasFooter = true,
  className
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAction = () => {
    if (onAction) {
      onAction();
    }
    onClose();
  };

  return (
    <div
      className={"fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 " + className}
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white rounded-lg shadow-lg relative animate-fade-in"
        style={{ width, height }}
      >
        <div className="flex justify-end items-center p-6">
          <button
            onClick={onClose}
            className="text-gray hover:text-gray focus:outline-none"
          >
            ✖
          </button>
        </div>

        <div className="mb-4 flex flex-col justify-center align-middle">{children}</div>

        {hasFooter && (
          <div className="flex justify-end space-x-2 p-6">
            <button
              className="px-4 py-2 bg-red text-white rounded-md hover:bg-red"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              className="px-4 py-2 bg-green text-white rounded-md hover:bg-green"
              onClick={handleAction}
            >
              Confirmar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
