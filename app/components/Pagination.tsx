import ReactPaginate from "react-paginate";
import { PaginationProps } from "@/types";
const Pagination: React.FC<PaginationProps> = ({
  handlePageClick,
  totalItems,
  itemsPerPage,
  currentPage,
}) => {
  return (
    <ReactPaginate
      previousLabel={"<"}
      nextLabel={">"}
      breakLabel={"..."}
      containerClassName="Pagination"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link prev"
      nextClassName="page-item"
      nextLinkClassName="page-link next"
      marginPagesDisplayed={1}
      pageRangeDisplayed={5}
      activeLinkClassName="active"
      onPageChange={({ selected }) => handlePageClick(selected + 1)}
      forcePage={currentPage ? currentPage - 1 : undefined}
      pageCount={Math.ceil(totalItems / itemsPerPage)}
    />
  );
};

export default Pagination;
