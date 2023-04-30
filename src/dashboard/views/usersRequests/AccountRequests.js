import React from "react";
import DataTable from 'react-data-table-component';
import { data, userData } from '../../helper/helper';
import { useEffect, useState } from 'react';
import axios from 'axios';

const AccountRequests = () => {

    
    //Used to render users whose account requests are still pending

    const [currpendinguser, setpendinguser] = useState({
        loading: true,
        results: [],
        err: null,
        reload: 0
    });
    useEffect(() => {
        setpendinguser({ ...currpendinguser, loading: true });    
        axios
            .get("http://localhost:4000/admin/pending-user")
            .then((res) => {
                console.log(currpendinguser.results);
                setpendinguser({ ...currpendinguser, results: res.data, loading: false, err: null })
            })
            .catch((err) => {
                setpendinguser({
                    ...currpendinguser,
                    loading: false,
                    err: "something went wrong, please try again later !"
                })
            })
    }, []);
    // const [currdata, setData] = useState(() => {
    //     return data.filter(
    //         (item) => item.userStatus !== "Approved" && item.userStatus !== "Disapproved" 
    //     )
    // });
    
    const columns = [
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
        let arr = [...currpendinguser]
        arr = arr.filter(
            (item) => id != item.id
        )
        setpendinguser(arr)
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
        data={currpendinguser.results}
        pagination
        />
        </>
    );
}

export default AccountRequests