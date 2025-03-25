import React from "react";
import { ConfirmModalProps } from "@/types";
import { FaRegCircleQuestion } from "react-icons/fa6";

const ConfirmDeleteModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg w-96">
        <FaRegCircleQuestion color="orange" size={36} className="mb-4" />
        <h2 className="mb-4 text-lg font-bold">ຢືນຢັນການລຶບ</h2>
        <p className="mb-4 text-sm">ທ່ານແນ່ໃຈບໍ່ທີ່ຈະລຶບຄຳສັບນີ້?</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            ຍົກເລີກ
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-white bg-red-500 rounded-md"
          >
            ຍືນຍັນ
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
