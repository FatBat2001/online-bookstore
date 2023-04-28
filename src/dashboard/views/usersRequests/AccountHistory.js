import React from "react";
import DataTable from 'react-data-table-component';
import { data, userData } from '../../helper/helper';
import { useEffect, useState } from 'react';
import axios from 'axios';

const AccountHistory = () => {

    //Used to render users whose account requests got either Approved or Disapproved
    //Used to render users whose borrow requests are still pending
            // object to save
            const [currhistory, setHistory] = useState({
                loading: true,
                results: [],
                err: null,
                reload: 0
            });
            //use effect load when enter the page
            useEffect(() => {
                setHistory({ ...currhistory, loading: true });    
                axios
                    .get("http://localhost:4000/admin/history")
                    .then((res) => {
                        console.log(currhistory.results);
                        setHistory({ ...currhistory, results: res.data, loading: false, err: null })
                    })
                    .catch((err) => {
                        setHistory({
                            ...currhistory,
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
            name: 'User Name',
            selector: row => row.userName,
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
            name: 'Status',
            selector: row => row.status,
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
        data={currhistory.results}
        pagination
        />
        </>
    );
}

export default AccountHistory