import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory from 'react-bootstrap-table2-filter';
import './style.scss';

const TableComponent = ({ data = [], columns = [], keyId = 'id', paginationOptions = {} }) => {
    return (
        <div className='table-container'>
            <BootstrapTable
                keyField={keyId}
                data={data}
                columns={columns}
                filter={filterFactory()}
                pagination={paginationFactory(paginationOptions)}
                striped
                hover
                condensed
                className="table"
            />
        </div>
    );
};

export default TableComponent;
