import DataTable from 'react-data-table-component';
import '../../styling/dashboard.css'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';


const AllBooks = () => {

    const [disabled,setDisabled] = useState(true)
    // object to save
    const [books, setBooks] = useState({
        loading: true,
        results: [],
        err: null,
        reload: 0
    });
    //use effect load when enter the page
    useEffect(() => {
        setBooks({ ...books, loading: true });    
        axios
            .get("http://localhost:4000/admin/view-books")
            .then((res) => {
                setBooks({ ...books, results: res.data, loading: false, err: null })
                console.log(books.results.length);
            })
            .catch((err) => {
                setBooks({
                    ...books,
                    loading: false,
                    err: "something went wrong, please try again later !"
                })
            })
    }, [books.reload]);

    const handleDeleteAll = () => {
        setBooks({ ...books, loading: true });    
        console.log("deleting");
        axios
            .delete("http://localhost:4000/admin/delete-allBooks",{
                headers: {
                    token: "520d8e5e880254ea31d7dd1fda14bcb6",
                }
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                setBooks({
                    ...books,
                    loading: false,
                    err: "something went wrong, please try again later !"
                })
                console.log(err);
            })
    }

    const handleDelete = (params) => {
        setBooks({ ...books, loading: true });  
        axios
            .delete("http://localhost:4000/admin/delete-book/" + params.id,{
                headers: {
                    token: "520d8e5e880254ea31d7dd1fda14bcb6",
                }
            })
            .then((res) => {
                setBooks({...books,reload: !books.reload,loading: false})
            })
            .catch((err) => {
                setBooks({
                    ...books,
                    loading: false,
                    err: "something went wrong  , please try again later ! error desc :" + err
                })
            })
    };

    const columns = [
        {
            name: 'Photo',
            selector: row => (<img src={row.image_url} width={70} />),
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
            name: 'Category',
            selector: row => row.subject,
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
            name: "",
            cell: (param) => updateBook(param),
            center: true
        },
        {
            name: <button disabled={disabled} className='btn deleteAllBtn' onClick={() => handleDeleteAll()}>Delete All</button>,
            cell: (param) => deleteBook(param),
        },
    ];

    const handleChange = ({ selectedRows }) =>{
        if (selectedRows.length === books.results.length && selectedRows.length !== 0){
            setDisabled(false)
        }else{
            setDisabled(true)
        }

    }

    const updateBook = (param) => {
        return (
            <>
                <Link to={`update_book/${param.id}`} className='btn updateBtn' >
                    update
                </Link>
            </>
        );
    };

    const deleteBook = (param) => {
        return (
            <>
                <button className='btn deleteBtn' onClick={() => handleDelete(param)}>
                    delete
                </button>
            </>
        );
    };

    return (
        <>
            <div className="title-datatable">
                <h2>All Books</h2>
                <div className="a-container">
                    <Link to={"add_book"} className="">
                        Add Book
                    </Link>
                </div>
            </div>
            <DataTable
                columns={columns}
                data={books.results}
                selectableRows
                pagination
                onSelectedRowsChange={handleChange}
            />
        </>
    );
}

export default AllBooks;