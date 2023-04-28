import React from "react";
import DataTable from 'react-data-table-component';
import { data, userData } from '../../helper/helper';
import { useEffect, useState } from 'react';
import axios from 'axios';

const BorrowRequests = () => {
    
    //Used to render users whose borrow requests are still pending
        // object to save
        const [BorrowRequests, setBorrowRequests] = useState({
            loading: true,
            results: [],
            err: null,
            reload: 0
        });
        //use effect load when enter the page
        useEffect(() => {
            setBorrowRequests({ ...BorrowRequests, loading: true });    
            axios
                .get("http://localhost:4000/admin/show-borrowed")
                .then((res) => {
                    console.log(BorrowRequests);
                    setBorrowRequests({ ...BorrowRequests, results: res.data, loading: false, err: null })
                })
                .catch((err) => {
                    setBorrowRequests({
                        ...BorrowRequests,
                        loading: false,
                        err: "something went wrong, please try again later !"
                    })
                })
        }, []);

    // const [currdata, setData] = useState(() => {
    //     return data.filter(
    //         (item) => item.borrowStatus !== "Accepted" && item.borrowStatus !== "Rejected" 
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
            selector: row => (<img src={row.photo} width={70} />),
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
            selector: row => row.rackNumber,
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
            name: '',
            cell:(data)=><button onClick={() => {deleteDataRow(data.id)}} id={data.id}>Accept</button>,
            sortable: false,
            center: true
        },
        {
            name: '',
            cell:(data)=><button onClick={() => {deleteDataRow(data.id)}} id={data.id}>Reject</button>,
            sortable: false,
            center: true
        },
    ];
    
    

    const deleteDataRow = (id) => {
        let arr = [...currdata]
        arr = arr.filter(
            (item) => id != item.id
        )
        setData(arr)
        console.log(arr);
    };

    return (
        <>
        <div>
            <h1>Borrow Requests</h1>
            
            <div>
                
            </div>
        </div>
        <DataTable
        columns={columns}
        data={currdata}
        pagination
        />
        </>
    );
}

export default BorrowRequests