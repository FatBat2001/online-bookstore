import DataTable from 'react-data-table-component';
import '../../styling/dashboard.css'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';


const AllBooks = () => {
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
            .get("http://localhost:4000/books/view-books")
            .then((res) => {
                console.log(books.results);
                setBooks({ ...books, results: res.data, loading: false, err: null })
            })
            .catch((err) => {
                setBooks({
                    ...books,
                    loading: false,
                    err: "something went wrong, please try again later !"
                })
            })
    }, []);

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
            name: <button>Delete All</button>,
            cell: (param) => deleteBook(param),
        },
    ];

    const handleDelete = (params) => {
        setBooks(books.results.filter((item) => item.id !== params.id))
    };

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
            />
        </>
    );
}

export default AllBooks;