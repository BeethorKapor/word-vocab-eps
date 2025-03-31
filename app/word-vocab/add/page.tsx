"use client";
import { useState, useRef } from "react";

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

export default function AddWord() {
  const router = useRouter();

  const [imageUrl, setImageUrl] = useState<string>("");

  // const [isCameraOpen, setIsCameraOpen] = useState(false);
  // const videoRef = useRef<HTMLVideoElement | null>(null);
  // const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [upLoading, setUpLoading] = useState(false);
  const [validateImage, setValidateImage] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);

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

  // ✅ เปิดกล้อง
  // const openCamera = async () => {
  //   setIsCameraOpen(true);
  //   const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  //   if (videoRef.current) videoRef.current.srcObject = stream;
  // };

  // // ✅ ปิดกล้อง
  // const closeCamera = () => {
  //   setIsCameraOpen(false);
  //   if (videoRef.current?.srcObject) {
  //     (videoRef.current.srcObject as MediaStream)
  //       .getTracks()
  //       .forEach((track) => track.stop());
  //   }
  // };

  // // 📸 ถ่ายรูปแล้วอัปโหลดทันที
  // const captureAndUploadImage = async () => {
  //   if (!videoRef.current || !canvasRef.current) return;

  //   // 📷 ถ่ายภาพ
  //   const context = canvasRef.current.getContext("2d");
  //   if (context) {
  //     context.drawImage(videoRef.current, 0, 0, 300, 200);
  //     const capturedImage = canvasRef.current.toDataURL("image/png");

  //     // 📤 อัปโหลด
  //     setUpLoading(true);
  //     closeCamera();
  //     const blob = await fetch(capturedImage).then((res) => res.blob());
  //     const formData = new FormData();
  //     formData.append("image", blob, "captured-image.png");
  //     try {
  //       const response = await axios.post(`${API_URL}/file-upload`, formData);
  //       setImageUrl(response.data.name);
  //       setUpLoading(false);
  //     } catch (error) {
  //       console.error("Upload failed", error);
  //     } finally {
  //       setUpLoading(false);
  //       // closeCamera(); // ปิดกล้องหลังจากอัปโหลดเสร็จ ✅
  //     }
  //   }
  // };

  const handleSubmit = async (
    values: WordFormProps,
    { resetForm }: { resetForm: () => void }
  ) => {
    setShowLoader(true);
    const newData = {
      ...values,
      image: imageUrl,
    };
    try {
      const response = await axios.post(`${API_URL}/words`, newData);
      if (response?.status === 200) {
        setShowLoader(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          resetForm();
          setImageUrl("");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setShowLoader(false);
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-screen">
      <h1 className="mb-4 text-2xl font-bold text-center">ເພີ່ມຄຳສັບ</h1>
      <div className="px-[5%]  sm:px-[10%] md:px-[20%]">
        <Formik
          initialValues={{
            lao: "",
            thai: "",
            english: "",
            korean: "",
          }}
          validate={(values) => {
            const errors: Record<string, string> = {};
            if (!values?.lao) {
              errors.lao = "ກະລຸນາປ້ອນຄໍາສັບພາສາລາວ";
            }
            // if (!values?.thai) {
            //   errors.thai = "ກະລຸນາປ້ອນຄໍາສັບພາສາໄທ";
            // }
            // if (!values?.english) {
            //   errors.english = "ກະລຸນາປ້ອນຄໍາສັບພາສາອັງກິດ";
            // }
            if (!values?.korean) {
              errors.korean = "ກະລຸນາປ້ອນຄໍາສັບພາສາເກົາຫຼີ";
            }
            if (!imageUrl) {
              setValidateImage(true);
            }
            return errors;
          }}
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values, { resetForm });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            isValid,
          }) => (
            <form onSubmit={handleSubmit}>
              <section>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="w-full flex flex-col items-center rounded-[6px]">
                    <p className="text-[#000000] font-[400] pb-2">ຮູບພາບ</p>

                    {upLoading ? (
                      <div className="h-[200px] w-[200px] flex justify-center items-center rounded-md border-dashed border-2">
                        <span className="loader"></span>
                      </div>
                    ) : (
                      <>
                        {imageUrl ? (
                          <div className="relative w-full">
                            <div className="w-full h-[200px] max-w-full flex justify-center rounded-md">
                              <Image
                                src={`${IMAGE_LINK}/${imageUrl}`}
                                width={200}
                                height={200}
                                alt="profile_image"
                                className="object-cover rounded-md"
                              />
                            </div>
                            <input
                              className="absolute inset-0 z-10 w-full h-full opacity-0 cursor-pointer"
                              type="file"
                              ref={fileInputRef}
                              onChange={handleFileChange}
                            />
                            <div className="absolute flex flex-col items-center justify-center p-2 text-white transform -translate-x-1/2 -translate-y-1/2 rounded-md content top-1/2 left-1/2">
                              <AiOutlineCloudUpload size={32} />
                              <span className="text-sm font-[500] underline">
                                ປ່ຽນຮູບ
                              </span>
                            </div>
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
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              type="file"
                              ref={fileInputRef}
                              accept="image/png, image/jpeg, image/jpg, image/webp"
                              onChange={handleFileChange}
                            />
                            <AiOutlineCloudUpload
                              className="text-[var(--primary-color)]"
                              size={32}
                            />
                            <p className="text-[var(--primary-color)] text-base">
                              ອັບໂຫຼດຮູບພາບ
                            </p>
                            <span className="text-[10px] font-[300]">
                              PNG, JPG, JPEG
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

                    {/* {!isCameraOpen ? (
                      <button
                        type="button"
                        onClick={openCamera}
                        className="px-4 py-2 mt-4 text-white bg-[var(--main-color)] rounded-md"
                      >
                        ເປີດກ້ອງ
                      </button>
                    ) : (
                      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="relative p-4 bg-white rounded-md shadow-lg">
                          <video
                            ref={videoRef}
                            autoPlay
                            className="w-[300px] h-[200px] rounded-md"
                          />
                          <canvas ref={canvasRef} className="hidden"></canvas>

                          <div className="flex justify-center gap-2 mt-4">
                            <button
                              type="button"
                              onClick={closeCamera}
                              className="border border-[var(--main-color)] text-md font-[400] text-[var(--main-color)] px-4 py-1 rounded-md"
                            >
                              ປິດກ້ອງ
                            </button>
                            <button
                              type="button"
                              onClick={captureAndUploadImage}
                              className="bg-[var(--main-color)] text-white text-sm font-[400] px-4 py-1 rounded-md"
                            >
                              ຖ່າຍຮູບ
                            </button>
                          </div>
                        </div>
                      </div>
                    )} */}
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
                    <InputField
                      id="thai"
                      name="thai"
                      type="text"
                      label="ພາສາໄທ (ບໍ່ບັງຄັບ)"
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
                      label="ພາສາອັງກິດ (ບໍ່ບັງຄັບ)"
                      placeholder="ປ້ອນຄໍາສັບພາສາອັງກິດ"
                      value={values?.english}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      errors={errors?.english}
                      touched={touched?.english}
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
                  className="bg-[var(--main-color)] text-white p-2 w-full mt-10 rounded-md disabled:bg-blue-500 disabled:bg-opacity-70 disabled:cursor-not-allowed"
                  disabled={
                    !isValid || !imageUrl || !values?.lao || !values?.korean
                  }
                >
                  {showLoader ? "ກຳລັງເພີ່ມ..." : "ເພີ່ມ"}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
      {success ? <SuccessModal text="ເພີ່ມສຳເລັດ" /> : null}
    </div>
  );
}
