import { Pagination } from 'react-bootstrap';

export default function PaginationComponent({ currentPage, lastPage, onPageChange }) {
  if (lastPage <= 1) return null;

  const createPageItems = () => {
    const pages = [];

    for (let page = 1; page <= lastPage; page++) {
      pages.push(
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Pagination.Item>
      );
    }

    return pages;
  };

  return (
    <Pagination className="justify-content-center mt-3">
      {createPageItems()}
    </Pagination>
  );
}