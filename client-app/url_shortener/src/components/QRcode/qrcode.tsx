import React from "react";
import Modal from "react-modal";
import QRCode from "qrcode.react";

interface IQRCodeModalProps {
  isOpen: boolean;
  qrUrl: string;
  onClose: () => void;
}

const QRCodeModal: React.FunctionComponent<IQRCodeModalProps> = ({
  isOpen,
  qrUrl,
  onClose,
}) => {
  const handleDownload = () => {
    const canvas = document.querySelector("canvas");
    const url = canvas?.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url || "";
    a.download = "qrcode.png";
    a.click();
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="QR Code Modal"
      className="Modal bg-white p-4 rounded-lg shadow-lg max-w-sm mx-auto relative"
      overlayClassName="Overlay fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
    >
      <div className="w-full px-6">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-2 p-1 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-lg mb-2">QR Code</h2>
        <QRCode value={qrUrl} size={200} />
        <button
          onClick={handleDownload}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Download
        </button>
      </div>
    </Modal>
  );
};

export default QRCodeModal;
