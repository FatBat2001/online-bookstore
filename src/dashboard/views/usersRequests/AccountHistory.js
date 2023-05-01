import React from "react";
import DataTable from 'react-data-table-component';
import { data, userData } from '../../helper/helper';
import { useEffect, useState } from 'react';
import axios from 'axios';

const AccountHistory = () => {

    //Used to render users whose account requests got either Approved or Disapproved
    //Used to render users whose borrow requests are still pending
            // object to save
            const [currUsers, setUsers] = useState({
                loading: true,
                results: [],
                err: null,
                reload: 0
            });
            //use effect load when enter the page
            useEffect(() => {
                setUsers({ ...currUsers, loading: true });    
                axios
                    .get("http://localhost:4000/admin/get-allusers")
                    .then((res) => {
                        console.log(currUsers.results);
                        setUsers({ ...currUsers, results: res.data, loading: false, err: null })
                    })
                    .catch((err) => {
                        setUsers({
                            ...currUsers,
                            loading: false,
                            err: "something went wrong, please try again later !"
                        })
                    })
            }, []);
        
    // const [currdata, setData] = useState(() => {
    //     return data.filter(
    //         (item) => item.userStatus == "Approved" || item.userStatus == "Disapproved"
    //     )
    // });
    
    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
            center: true
        },
        {
            name: 'User Name',
            selector: row => row.name,
            sortable: true,
            center: true
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
            center: true
        },
        {
            name: 'Phone Number',
            selector: row => row.phone,
            sortable: true,
            center: true
        },
        {
            name: 'Type',
            selector: row => row.type,
            sortable: true,
            center: true
        },
        
    ];
    


    return (
        <>
        <div>
            <h1>Accounts</h1>
            
            <div>
                
            </div>
        </div>
        <DataTable
        columns={columns}
        data={currUsers.results}
        pagination
        />
        </>
    );
}

export default AccountHistory