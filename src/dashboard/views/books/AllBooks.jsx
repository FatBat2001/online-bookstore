import DataTable from 'react-data-table-component';
import '../../styling/dashboard.css'
import { Link } from 'react-router-dom';
import { data } from '../../helper/helper';
import { useState } from 'react';


const AllBooks = () => {

    const [currdata, setData] = useState(data);

    const columns = [
        {
            name: 'Photo',
            selector: row => (
                <img src={row.photo} width={70} />
            ),
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
            selector: row => row.category,
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
            name: "",
            cell: (param) => updateBook(param),
            center: true
        },
        {
            name: "",
            cell: (param) => deleteBook(param),
        },
    ];

    const handleDelete = (params) => {
        setData(currdata.filter((item) => item.id !== params.id))
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
                data={currdata}
                selectableRows
                pagination
            />
        </>
    );
}

export default AllBooks;