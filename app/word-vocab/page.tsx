"use client";

//hooks
import { useState, useEffect } from "react";

//third party
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

//utils
import { API_URL, IMAGE_LINK } from "@/utils/constant";

//components
import CustomTable from "../components/CustomTable";
import Pagination from "../components/Pagination";
import ConfirmDeleteModal from "../components/ComfirmModal";
//types
import { WordListModel, WordListResponse } from "@/types";

//icons
import { MoveLeft } from "lucide-react";
import { BiSolidEditAlt } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

export default function WordVocabList() {
  const [isLoading, setIsLoading] = useState(false);
  const [words, setWords] = useState<WordListResponse>();
  const [error, setError] = useState("");

  const [skip, setSkip] = useState(1);
  const limit = 30;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const getAllWords = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/words`, {
        params: {
          skip: (skip - 1) * limit,
          limit,
        },
      });
      if (response.status === 200) {
        setWords(response?.data);
      }
    } catch (error) {
      console.log(error);
      setError("ເກີດຂໍ້ຜິດພາດ ກະລຸນາລອງໃໝ່ອີກຄັ້ງ.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDeleteModal = (id: string) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  // ✅ Confirm Delete Function
  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    try {
      const response = await axios.delete(`${API_URL}/words/${deleteId}`);
      if (response.status === 200) {
        getAllWords();
      }
    } catch (error) {
      console.log(error);
      setError("ເກີດຂໍ້ຜິດພາດ ກະລຸນາລອງໃໝ່ອີກຄັ້ງ.");
    } finally {
      setIsModalOpen(false);
      setDeleteId(null);
    }
  };

  useEffect(() => {
    getAllWords();
  }, [skip, limit]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 ">
        <span className="text-red-500">{error}</span>
        <Link
          href="/"
          className="border text-sm border-[var(--main-color)] text-[var(--main-color)] px-6 py-3 rounded-md flex items-center gap-2"
        >
          <MoveLeft /> ກັບຄືນ
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen px-[5%] py-12 md:px-[10%]">
      <div className="flex items-center justify-between mb-4">
        <Link
          href="/"
          className="border text-sm border-[var(--main-color)] text-[var(--main-color)] px-6 py-3 rounded-md flex items-center gap-2"
        >
          <MoveLeft /> ກັບຄືນ
        </Link>
        <Link
          href="/word-vocab/add"
          className="px-6 py-3 text-center text-sm text-white bg-[var(--main-color)] rounded-md"
        >
          ເພີ່ມຄຳສັບ
        </Link>
      </div>
      <h1 className="mb-4 text-2xl font-bold">
        ຄຳສັບທັງໝົດ {words?.total} ຄຳສັບ
      </h1>
      <div>
        <CustomTable
          header={[
            "ລຳດັບ",
            "ຮູບພາບ",
            "ພາສາລາວ",
            "ພາສາເກົາຫຼີ",
            "ພາສາໄທ",
            "ພາສາອັງກິດ",
            "ຈັດການ",
          ]}
        >
          {isLoading ? (
            <tr>
              <td colSpan={7} className="text-center">
                <span className="loader"></span>
              </td>
            </tr>
          ) : words?.total === 0 ? (
            <tr>
              <td colSpan={7}>ບໍ່ມີຂໍ້ມູນຄຳສັບ</td>
            </tr>
          ) : (
            words?.data?.map((word: WordListModel, index: number) => (
              <tr key={word?._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="items-center justify-center w-[50px] h-[50px]">
                    <Image
                      src={`${IMAGE_LINK}/${word?.image}`}
                      alt={word?.lao}
                      width={50}
                      height={50}
                      className="object-cover w-full h-full rounded-sm"
                    />
                  </div>
                </td>
                <td>{word?.lao || "-"}</td>
                <td>{word?.korean || "-"}</td>
                <td>{word?.thai || "-"}</td>
                <td>{word?.english || "-"}</td>
                <td>
                  <div className="flex items-center gap-4 ">
                    <Link
                      href={`/word-vocab/${word?._id}`}
                      className="p-1 text-sm text-blue-500 border border-gray-300 rounded-md hover:text-blue-700 hover:border-blue-700"
                    >
                      <BiSolidEditAlt size={20} />
                    </Link>
                    <button
                      onClick={() => handleOpenDeleteModal(word?._id)}
                      className="p-1 text-red-500 border border-gray-300 rounded-md hover:text-red-700"
                    >
                      <AiFillDelete size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </CustomTable>
        <div className="mt-4">
          <Pagination
            totalItems={words?.total || 0}
            itemsPerPage={limit}
            currentPage={skip}
            handlePageClick={(page: number) => setSkip(page)}
          />
        </div>
      </div>
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
