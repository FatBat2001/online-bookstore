import React from "react";
import DataTable from 'react-data-table-component';
import { data, userData } from '../../helper/helper';
import { useEffect, useState } from 'react';
import axios from 'axios';

const BorrowHistory = () => {

    //Used to render users whose borrow requests got either Accepted or Rejected
     // object to save
     const [borrowHistory, setBorrowHistory] = useState({
        loading: true,
        results: [],
        err: null,
        reload: 0
    });
    //use effect load when enter the page
    useEffect(() => {
        setBorrowHistory({ ...borrowHistory, loading: true });    
        axios
            .get("http://localhost:4000/admin/get-request")
            .then((res) => {
                const {username , bookData , ret_data} = borrowHistory.results;
                console.log(borrowHistory.results);
                setBorrowHistory({ ...borrowHistory, results: res.data, loading: false, err: null })
            })
            .catch((err) => {
                setBorrowHistory({
                    ...borrowHistory,
                    loading: false,
                    err: "something went wrong, please try again later !"
                })
            })
    }, []);
    // const [currdata, setData] = useState(() => {
    //     return data.filter(
    //         (item) => item.borrowStatus == "Accepted" || item.borrowStatus == "Rejected"
    //     )
    // });
    
    const columns = [
        {
            name: 'User',
            selector: row => row.userName,
            sortable: true,
            center: true
        },
        {
            name: 'Photo',
            selector: row => (<img src={row.image_url} width={70} />),
            sortable: false,
            center: true
        },
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
            center: true
        },
        {
            name: 'Author',
            selector: row => row.author,
            sortable: true,
            center: true
        },
        {
            name: 'Rack',
            selector: row => row.rack_number,
            sortable: true,
            center: true
        },
        {
            name: 'ISBN',
            selector: row => row.ISBN,
            sortable: true,
            center: true
        },
        {
            //not working for unkown reasons O.K data is sent from backend
            name: 'Status',
            selector: row => row.status,
            sortable: true,
            center: true
        },
    ];
    


    return (
        <>
        <div>
            <h1>Borrow History</h1>
            
            <div>
                
            </div>
        </div>
        <DataTable
        columns={columns}
        data={borrowHistory.results}
        pagination
        />
        </>
    );
}

export default BorrowHistory