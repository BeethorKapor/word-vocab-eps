import Link from "next/link";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--bg-color)]">
      <h1 className="mb-6 text-3xl font-bold">ເລືອກໝວດການເຝິກຝົນ</h1>
      <div className="grid gap-4">
        <Link
          href="/image-to-language"
          className="px-6 py-3 text-center text-white bg-blue-500 rounded-lg"
        >
          ຮູບພາບ → ພາສາ
        </Link>
        <Link
          href="/lao-to-image"
          className="px-6 py-3 text-center text-white bg-green-500 rounded-lg"
        >
          ພາສາລາວ → ພາສາເກົາຫຼີ
        </Link>
        <Link
          href="/korean-to-image"
          className="px-6 py-3 text-center text-white bg-red-500 rounded-lg"
        >
          ພາສາເກົາຫຼີ → ພາສາລາວ
        </Link>
        <Link
          href="/word-vocab"
          className="px-6 py-3 text-center text-white bg-red-500 rounded-lg"
        >
          ເພີ່ມຄຳສັບ
        </Link>
      </div>
    </div>
  );
}
