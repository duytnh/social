import React, { useEffect, useState } from 'react'
import './style.scss'
import { useSelector } from 'react-redux';
import AlertError from '../../../components/Alert/AlertError';
import { textFilter } from 'react-bootstrap-table2-filter';
import apiAnalytics from '../../../services/Analytics';
import TableComponent from '../../../components/Table';

function ManagePost() {
    const user = useSelector(state => state.auth.user);
    const token = user && user.jwt;

    const [allUser, setAllUser] = useState([]);
    const [error, setError] = useState('');
    const [showTable, setShowTable] = useState(false);

    let columns = [
        { dataField: 'post_id', text: 'ID', sort: true },
        { dataField: 'username', text: 'Username ', filter: textFilter() },
        { dataField: 'description', text: 'Description' },
    ];

    if (showTable) {
        columns.push({ dataField: 'created_at', text: 'Date', sort: true });
    }


    const paginationOptions = {
        sizePerPageList: [
            { text: '5', value: 5 },
            { text: '10', value: 10 },
            { text: 'All', value: allUser.length }
        ],
        sizePerPage: 5,
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setError('');
        }, 3000);
        return () => clearTimeout(timer);
    }, [error]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 900) {
                setShowTable(true);
            } else {
                setShowTable(false);
            }
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, [showTable])

    useEffect(() => {
        const fetchAllUser = async () => {
            try {
                const response = await apiAnalytics.getAllPost(token);
                if (response.data.status === 200) {
                    setAllUser(response.data.data);
                } else {
                    setError(response.data.message);
                }
            } catch (error) {
                setError('Máy chủ không phản hồi');
            }
        };

        fetchAllUser();
    }, [token]);
    return (
        <div className='manage-post'>
            <TableComponent data={allUser} columns={columns} keyId={'post_id'} paginationOptions={paginationOptions} />
            {error && (<AlertError message={error} />)}
        </div>
    )
}

export default ManagePost
