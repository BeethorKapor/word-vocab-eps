"use client";

//hooks
import { useEffect, useState } from "react";

// third party
import Image from "next/image";
import Link from "next/link";

//store
import { useVocabStore } from "@/app/store/useVocabStore";

//utils
import { IMAGE_LINK } from "@/utils/constant";

//icons
import { MoveLeft, MoveRight } from "lucide-react";

export default function ImageToLanguage() {
  const { word, isLaoding, error, fetchRandomWord } = useVocabStore();
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    fetchRandomWord();
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <span className="text-red-500">{error}</span>
        <Link
          href="/"
          className="border text-sm border-[var(--main-color)] text-[var(--main-color)] px-6 py-3 rounded-md flex items-center gap-2"
        >
          <MoveLeft size={16} /> ກັບຄືນ
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen my-8 ">
      <div className="px-[5%]  sm:px-[10%] md:px-[20%]">
        <div className="flex items-center justify-between mb-4">
          <Link
            href="/"
            className="border text-sm border-[var(--main-color)] text-[var(--main-color)] px-6 py-3 rounded-md flex items-center gap-2"
          >
            <MoveLeft size={16} /> ກັບຄືນ
          </Link>
          <Link
            href="/lao-to-image"
            className="px-6 py-3 text-center text-sm text-white bg-[var(--main-color)] rounded-md"
          >
            ໄປໜວດທວາຍພາສາລາວ
          </Link>
        </div>
        <h1 className="mb-4 text-2xl font-bold text-center">ຮູບພາບ → ພາສາ</h1>

        {isLaoding ? (
          <div className="flex items-center justify-center">
            <span className="loader"></span>
          </div>
        ) : word ? (
          <div className="flex flex-col items-center justify-center">
            <div className="h-[300px] w-[300px] mb-4">
              <Image
                src={`${IMAGE_LINK}/${word?.image}`}
                width={300}
                height={300}
                alt="Picture of the author"
                className="object-cover w-full h-full rounded-md shadow-md"
              />
            </div>
            {showAnswer ? (
              <div className="font-[500] text-center text-md">
                <p>
                  ເກົາຫຼີ:{" "}
                  <span className="text-[20px] font-[700] text-blue-700">
                    {word?.korean}
                  </span>
                </p>
                <p>
                  ລາວ:{" "}
                  <span className="text-[20px] font-[700] text-green-700">
                    {word?.lao}
                  </span>
                </p>
              </div>
            ) : null}
            <div className="flex justify-end gap-4 ml-auto">
              {!showAnswer ? (
                <button
                  onClick={() => setShowAnswer(true)}
                  className="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg"
                >
                  ສະແດງຄຳຕອບ
                </button>
              ) : null}
              <button
                onClick={() => {
                  fetchRandomWord();
                  setShowAnswer(false);
                }}
                className=" text-sm  text-white bg-[var(--main-color)] px-6 py-3 rounded-md flex items-center gap-2"
              >
                ຖັດໄປ <MoveRight />
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
