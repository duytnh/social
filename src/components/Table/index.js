import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import './style.scss';

const Table = ({ data, columns, onDelete, itemsPerPage }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [filterText, setFilterText] = useState('');

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const handleSort = (accessor) => {
        let direction = 'asc';
        if (sortConfig.key === accessor && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key: accessor, direction });
    };

    const handleFilterChange = (e) => {
        setFilterText(e.target.value);
        setCurrentPage(0); // Reset to the first page when filtering
    };

    // Lọc dữ liệu
    const filteredData = data.filter(item =>
        columns.some(col =>
            item[col.accessor]?.toString().toLowerCase().includes(filterText.toLowerCase())
        )
    );

    // Sắp xếp dữ liệu
    const sortedData = [...filteredData].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    // Phân trang dữ liệu
    const offset = currentPage * itemsPerPage;
    const currentData = sortedData.slice(offset, offset + itemsPerPage);

    return (
        <div className="table-responsive p-3 animate__animated animate__bounceIn">
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Filter"
                value={filterText}
                onChange={handleFilterChange}
            />
            <table className="table table-bordered">
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th
                                key={col.accessor}
                                className={col.hideOnSmall ? 'd-none d-sm-table-cell' : ''}
                                onClick={() => handleSort(col.accessor)}
                            >
                                {col.header}
                                {sortConfig.key === col.accessor ? (
                                    sortConfig.direction === 'asc' ? ' ▲' : ' ▼'
                                ) : null}
                            </th>
                        ))}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((col, colIndex) => (
                                <td key={col.accessor} className={col.hideOnSmall ? 'd-none d-sm-table-cell' : ''}>
                                    {row[col.accessor]}
                                </td>
                            ))}
                            <td className='text-center'>
                                <button className="btnDelete" onClick={() => onDelete(row)}><i className="fa-regular fa-trash-can"></i></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ReactPaginate
                previousLabel={<i className="fa-solid fa-caret-left"></i>}
                nextLabel={<i className="fa-solid fa-caret-right"></i>}
                breakLabel={'...'}
                pageCount={Math.ceil(filteredData.length / itemsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />
        </div>
    );
};

export default Table;
