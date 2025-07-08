import { Pagination } from "react-bootstrap";

export default function PaginationControlls({ className, paginationData, handlePageChange }) {

    if (!paginationData || paginationData.last_page <= 1) return null;

    const items = [];
    const currentPage = paginationData.current_page;
    const lastPage = paginationData.last_page;

    // Botão anterior
    items.push(
        <Pagination.Prev
            key="prev"
            disabled={currentPage === 1}
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
        />
    );

    // Páginas
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(lastPage, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
        items.push(<Pagination.Item key={1} onClick={() => handlePageChange(1)}>1</Pagination.Item>);
        if (startPage > 2) {
            items.push(<Pagination.Ellipsis key="ellipsis1" />);
        }
    }

    for (let page = startPage; page <= endPage; page++) {
        items.push(
            <Pagination.Item
                key={page}
                active={page === currentPage}
                onClick={() => handlePageChange(page)}
            >
                {page}
            </Pagination.Item>
        );
    }

    if (endPage < lastPage) {
        if (endPage < lastPage - 1) {
            items.push(<Pagination.Ellipsis key="ellipsis2" />);
        }
        items.push(
            <Pagination.Item key={lastPage} onClick={() => handlePageChange(lastPage)}>
                {lastPage}
            </Pagination.Item>
        );
    }

    // Botão próximo
    items.push(
        <Pagination.Next
            key="next"
            disabled={currentPage === lastPage}
            onClick={() => currentPage < lastPage && handlePageChange(currentPage + 1)}
        />
    );

    return (
        <div className={className}>
            <Pagination >{items}</Pagination>
        </div>
    );
}