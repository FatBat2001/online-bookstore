import React from "react";
import DataTable from 'react-data-table-component';
import { data, userData } from '../../helper/helper';
import { useState } from 'react';

const AccountRequests = () => {

    
    //Used to render users whose account requests are still pending
    
    const [currdata, setData] = useState(() => {
        return data.filter(
            (item) => item.userStatus !== "Approved" && item.userStatus !== "Disapproved" 
        )
    });
    
    const columns = [
        {
            name: 'User Name',
            selector: row => row.userName,
            sortable: true,
            center: true
        },
        {
            name: 'Email',
            selector: row => row.userEmail,
            sortable: true,
            center: true
        },
        {
            name: 'Phone Number',
            selector: row => row.userPhoneNum,
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
            <h1>Account Requests</h1>
            
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

export default AccountRequests