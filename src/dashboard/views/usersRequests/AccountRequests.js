import React from "react";
import DataTable from 'react-data-table-component';
import { data, userData } from '../../helper/helper';
import { useEffect, useState } from 'react';
import axios from 'axios';

const AccountRequests = () => {

    const [accId, setAccId] = useState()
    const [accStatus, setAccStatus] = useState()
    //Used to render users whose account requests are still pending
    const handleStatus = (accId,stat) => {
        const url = "http://localhost:4000/admin/accept-user/" + accId
        console.log(accId);
        axios
          .post(url, {
            status: stat
          },{
            header:{
                token : "520d8e5e880254ea31d7dd1fda14bcb6",
            }
          })
          .then((resp) => {
            window.location.reload();
            console.log(resp);
          })
          .catch((errors) => {
            console.log(errors);
          });
      }; 

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
            selector: row => row.id,
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
            cell:(data)=><button onClick={() => {handleStatus(data.id,"1")}} id={data.id}>Accept</button>,
            sortable: false,
            center: true
        },
        {
            name: '',
            cell:(data)=><button  onClick={() => {handleStatus(data.id,"0")}} id={data.id}>Reject</button>,
            sortable: false,
            center: true
        },
    ];
    
    

    // const handleAccept = (id) => {
    //     setAccId(id)
    //     setAccStatus(1)
    //     currpendinguser.results = currpendinguser.results.filter(
    //         (item) => id != item.id
    //     )
    //     submitAccRequest()
    // };

    // const handleReject = (id) => {
    //     setAccId(id)
    //     setAccStatus(0)
    //     currpendinguser.results = currpendinguser.results.filter(
    //         (item) => id != item.id
    //     )
    //     submitAccRequest()
    // };

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