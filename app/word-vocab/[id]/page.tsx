"use client";
import { useState, useRef, use, useEffect } from "react";

//third party
import axios from "axios";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import Image from "next/image";

//utils
import { API_URL, IMAGE_LINK } from "@/utils/constant";

//components
import InputField from "@/app/components/InputField";
import SuccessModal from "@/app/components/SuccessModal";

//types
import { WordFormProps } from "@/types";

//icons
import { AiOutlineCloudUpload } from "react-icons/ai";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

export default function EditWord({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const unwrappedParams = use(params);

  const [word, setWord] = useState<WordFormProps>();
  const [isLaoding, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [upLoading, setUpLoading] = useState(false);
  const [validateImage, setValidateImage] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);

  console.log("slug", unwrappedParams.id);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    console.log(selectedFile);
    if (
      !selectedFile?.type?.includes("image/png") &&
      !selectedFile?.type?.includes("image/jpeg") &&
      !selectedFile?.type?.includes("image/jpg") &&
      !selectedFile?.type?.includes("image/webp")
    ) {
      return alert("ກະລຸນາເລືອກ png, jpeg, jpg,webp");
    }
    setUpLoading(true);
    const formData = new FormData();
    formData.append("image", selectedFile);
    try {
      const response = await axios.post(`${API_URL}/file-upload`, formData);
      const data = await response.data;
      setImageUrl(data.name);
      setUpLoading(false);
    } catch (error) {
      console.log(error);
      setUpLoading(false);
    }
  };

  const getWordByID = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/words/${unwrappedParams?.id}`
      );
      if (response.status === 200) {
        setWord(response?.data);
        setImageUrl(response?.data?.image);
      }
    } catch (error) {
      console.log(error);
      setError("ເກີດຂໍ້ຜິດພາດ ກະລຸນາລອງໃໝ່ອີກຄັ້ງ.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (values: WordFormProps) => {
    setShowLoader(true);
    const newData = {
      ...values,
      image: imageUrl,
    };
    try {
      const response = await axios.put(
        `${API_URL}/words/${unwrappedParams?.id}`,
        newData
      );
      if (response?.status === 200) {
        setShowLoader(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          router.push("/word-vocab");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setShowLoader(false);
    }
  };

  useEffect(() => {
    getWordByID();
  }, [unwrappedParams?.id]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen ">
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
    <div className="flex flex-col justify-center min-h-screen">
      <h1 className="mb-4 text-2xl font-bold text-center">ແກ້ໄຂຄຳສັບ</h1>
      <div className="px-[5%]  sm:px-[10%] md:px-[20%]">
        {isLaoding ? (
          <div className="flex items-center justify-center">
            <span className="loader"></span>
          </div>
        ) : (
          <Formik
            enableReinitialize
            initialValues={{
              lao: word?.lao || "",
              thai: word?.thai || "",
              english: word?.english || "",
              korean: word?.korean || "",
            }}
            validate={(values) => {
              const errors: Record<string, string> = {};
              if (!values?.lao) {
                errors.lao = "ກະລຸນາປ້ອນຄໍາສັບພາສາລາວ";
              }
              if (!values?.thai) {
                errors.thai = "ກະລຸນາປ້ອນຄໍາສັບພາສາໄທ";
              }
              if (!values?.english) {
                errors.english = "ກະລຸນາປ້ອນຄໍາສັບພາສາອັງກິດ";
              }
              if (!values?.korean) {
                errors.korean = "ກະລຸນາປ້ອນຄໍາສັບພາສາເກົາຫຼີ";
              }
              if (!imageUrl) {
                setValidateImage(true);
              }
              return errors;
            }}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <section>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="w-full flex flex-col items-center rounded-[6px]">
                      <p className="text-[#000000] font-[400] pb-2">ຮູບພາບ</p>
                      {upLoading ? (
                        <div className=" h-[200px] w-[200px] flex justify-center items-center rounded-md border-dashed border-2">
                          <span className="loader"></span>
                        </div>
                      ) : (
                        <>
                          {imageUrl ? (
                            <div className="relative w-full">
                              <div className="w-full h-[200px] max-w-full flex justify-center rounded-md ">
                                {imageUrl && (
                                  <Image
                                    src={IMAGE_LINK + imageUrl}
                                    width={200}
                                    height={200}
                                    alt="profile_image"
                                    className="object-cover rounded-md"
                                  />
                                )}
                              </div>
                              <input
                                className="absolute inset-0 z-10 w-full h-full opacity-0 cursor-pointer "
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                              />
                              {imageUrl ? (
                                <div className="absolute flex flex-col items-center justify-center p-2 text-white transform -translate-x-1/2 -translate-y-1/2 rounded-md content top-1/2 left-1/2">
                                  <AiOutlineCloudUpload size={32} />
                                  <span className="text-sm font-[500] underline">
                                    ປ່ຽນຮູບ
                                  </span>
                                </div>
                              ) : null}
                            </div>
                          ) : (
                            <div
                              className={` min-h-[200px] min-w-[200px] w-[200px] flex flex-col justify-center items-center rounded-md overflow-hidden relative ${
                                validateImage
                                  ? "border-dashed border-2 border-red-600"
                                  : ""
                              } border-2 border-dashed`}
                            >
                              <input
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer "
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                              />
                              <AiOutlineCloudUpload
                                className=" text-[var(--primary-color)]"
                                size={32}
                              />
                              <p className=" text-[var(--primary-color)] text-base">
                                ອັບໂຫຼດຮູບພາບ
                              </p>
                              <span className=" text-[10px] font-[300]">
                                PNG, JPG,JPEG
                              </span>
                              {validateImage && (
                                <span className="text-sm font-medium text-red-600 ">
                                  ກະລຸນາອັບໂຫລດຮູບພາບ
                                </span>
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                    <div className="flex flex-col gap-4">
                      <InputField
                        id="lao"
                        name="lao"
                        type="text"
                        label="ພາສາລາວ"
                        placeholder="ປ້ອນຄໍາສັບພາສາລາວ"
                        value={values?.lao}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        errors={errors?.lao}
                        touched={touched?.lao}
                      />
                      <InputField
                        id="thai"
                        name="thai"
                        type="text"
                        label="ພາສາໄທ"
                        placeholder="ປ້ອນຄໍາສັບພາສາໄທ"
                        value={values?.thai}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        errors={errors?.thai}
                        touched={touched?.thai}
                      />
                      <InputField
                        id="english"
                        name="english"
                        type="text"
                        label="ພາສາອັງກິດ"
                        placeholder="ປ້ອນຄໍາສັບພາສາອັງກິດ"
                        value={values?.english}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        errors={errors?.english}
                        touched={touched?.english}
                      />
                      <InputField
                        id="korean"
                        name="korean"
                        type="text"
                        label="ພາສາເກົາຫຼີ"
                        placeholder="ປ້ອນຄໍາສັບພາສາເກົາຫຼີ"
                        value={values?.korean}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        errors={errors?.korean}
                        touched={touched?.korean}
                      />
                    </div>
                  </div>
                </section>
                <div className="flex justify-end gap-2 sm:w-[50%] ml-auto pl-2">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="border border-[var(--main-color)] text-[var(--main-color)] p-2 w-full mt-10 rounded-md"
                  >
                    ກັບຄືນ
                  </button>
                  <button
                    type="submit"
                    className="bg-[var(--main-color)] text-white p-2 w-full mt-10 rounded-md"
                  >
                    {showLoader ? "ກຳລັງບັນທຶກ..." : "ບັນທຶກ"}
                  </button>
                </div>
              </form>
            )}
          </Formik>
        )}
      </div>
      {success ? <SuccessModal text="ບັນທຶກສຳເລັດ" /> : null}
    </div>
  );
}
