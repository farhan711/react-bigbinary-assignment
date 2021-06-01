import React from 'react';
import Pagination from 'react-js-pagination';

import './Pagination.scss';

const TablePagination = ({ totalCount, onChange, activePage, countPerPage }) => {
  return (
    <>
      {totalCount > 0 && (
        <div className="table-page table-pagination">
          <Pagination
            onChange={onChange}
            hideFirstLastPages
            itemsCountPerPage={countPerPage}
            totalItemsCount={totalCount}
            itemClass="page-item"
            linkClass="page-link"
            activePage={activePage}
            pageRangeDisplayed={5}
          />
        </div>
      )}
    </>
  );
};

TablePagination.propTypes = {
  countPerPage: PropTypes.Number,
  activePage: PropTypes.Number,
  totalCount: PropTypes.Number,
  onChange: PropTypes.function,
};

export default TablePagination;
