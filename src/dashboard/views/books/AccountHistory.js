import React from "react";
import DataTable from 'react-data-table-component';
import { data, userData } from '../../helper/helper';
import { useState } from 'react';

const AccountHistory = () => {

    //Used to render users whose account requests got either Approved or Disapproved
    
    const [currdata, setData] = useState(() => {
        return data.filter(
            (item) => item.userStatus == "Approved" || item.userStatus == "Disapproved"
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
            name: 'Status',
            selector: row => row.userStatus,
            sortable: true,
            center: true
        },
        
    ];
    


    return (
        <>
        <div>
            <h1>Account History</h1>
            
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

export default AccountHistory