import React from "react";
import DataTable from 'react-data-table-component';
import { data, userData } from '../../helper/helper';
import { useEffect, useState } from 'react';
import axios from 'axios';

const BorrowHistory = () => {

    //Used to render users whose borrow requests got either Accepted or Rejected
    
    const [currdata, setData] = useState(() => {
        return data.filter(
            (item) => item.borrowStatus == "Accepted" || item.borrowStatus == "Rejected"
        )
    });
    
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
            name: 'Status',
            selector: row => row.borrowStatus,
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
        data={currdata}
        pagination
        />
        </>
    );
}

export default BorrowHistory