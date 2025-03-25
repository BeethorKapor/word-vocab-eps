import { create } from "zustand";
import axios from "axios";
import { WordListModel } from "@/types";

import { API_URL } from "@/utils/constant";


interface VocabStore {
  word: WordListModel | null;
  isLaoding: boolean;
  error: string | null;
  fetchRandomWord: () => void;
}

export const useVocabStore = create<VocabStore>((set) => ({
  word: null,
  isLaoding: false,
  error: null,
  fetchRandomWord: async () => {
    set({ isLaoding: true });
    try {
      const res = await axios.get(`${API_URL}/words/random`);
      set({ word: res?.data });
    } catch (error) {
      console.log(error);
      set({ error: "ເກີດຂໍ້ຜິດພາດ ກະລຸນາລອງໃໝ່ອີກຄັ້ງ." });
    } finally {
      set({ isLaoding: false });
    }
  },
}));
