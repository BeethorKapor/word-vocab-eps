import React from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";

const SuccessModal: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-4 bg-white rounded-md w-[200px] h-[200px] flex flex-col items-center justify-center gap-2">
        <IoIosCheckmarkCircle color="green" size={64} />
        <p className="text-[#000000] font-[500] text-lg text-center">
          {text || "ບັນທຶກສຳເລັດ"}
        </p>
      </div>
    </div>
  );
};

export default SuccessModal;
