import React from "react";
import DataTable from 'react-data-table-component';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ModalComp from "../../../shared/ModalComp";

const AccountRequests = () => {

    const [show, setShow] = useState(false);
    const [accLimitId,setAccLimitId] = useState(null)
    const handleClose = () => setShow(false);
    const [limit,setLimit] = useState(3)
    

    //handle limit of borrowing books
    const handleLimit = () => {
        setShow(false)
        const url = "http://localhost:4000/admin/borrowLimit/" + accLimitId
        console.log(accLimitId);
        console.log(limit);
        const limitNum = parseInt(limit)
        console.log(limitNum);
        axios
            .post(url,{
                limit: limitNum
            })
            .then((resp) => {
                console.log(resp);
            })
            .catch((errors) => {
                console.log(errors);
            });
    }

    //Used to render users whose account requests are still pending
    const handleStatus = (accId, stat) => {
        setShow(true);
        const url = "http://localhost:4000/admin/accept-user/" + accId
        console.log(accId);
        axios
            .post(url, {
                status: stat
            }, {
                header: {
                    token: "520d8e5e880254ea31d7dd1fda14bcb6",
                }
            })
            .then((resp) => {
                console.log(resp);
                setAccLimitId(resp.data.ID)
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
            cell: (data) => <button onClick={() => { handleStatus(data.id, "1") }} id={data.id}>Accept</button>,
            sortable: false,
            center: true
        },
        {
            name: '',
            cell: (data) => <button onClick={() => { handleStatus(data.id, "0") }} id={data.id}>Reject</button>,
            sortable: false,
            center: true
        },
    ];

    return (
        <>
            <div>
                <h1>Account Requests</h1>
            </div>
            <DataTable
                columns={columns}
                data={currpendinguser.results}
                pagination
            />
            <ModalComp
                modalTitle={<h3>Edit Borrow Limit</h3>}
                modalBody={<>
                    <label htmlFor="limit">Enter Limit : </label>
                    <input 
                        type="number" 
                        placeholder={3} 
                        value={limit} 
                        onChange={(e) => setLimit(e.target.value)} 
                        required
                    />
                </>}
                show={show}
                handleClose={handleClose}
                handleLimit={() => {handleLimit()}}
            />
        </>
    );
}

export default AccountRequests