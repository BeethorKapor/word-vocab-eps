export interface WordListModel {
    _id: string;
    image: string;
    lao: string;
    thai: string;
    english: string;
    korean: string;
  }

export interface InputFieldProps {
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  errors?: string;
  touched?: boolean;
  id: string;
  name: string;
  icon?: React.ReactNode;
  type: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  label?: string;
}

export interface WordFormProps {
  lao: string;
  thai: string;
  english: string;
  korean: string;
  image?: string;
}

export interface CustomTableProps {
  header: string[];
  children: React.ReactNode;
}
export interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  handlePageClick: (page: number) => void;
}

export interface WordListResponse {
  data: WordListModel[];
  total: number;
}

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}