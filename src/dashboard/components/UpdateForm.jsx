import { useEffect, useRef, useState } from 'react';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import '../styling/UpdateForm.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateForm = ({ formTitle }) => {
    let { id } = useParams()

    const [book, setBook] = useState({
        image_url: null,
        isbn: 0,
        title: "",
        author: "",
        subject: "",
        rack_number: 0,
        reload: 0,
        loading: false,
        success: null,
    });
    
    
    const image = useRef(null);


    const updateBook = () => {
        e.preventDefault();

        setBook({ ...movie, loading: true });

        const formData = new FormData();
        formData.append("isbn", book.isbn)
        formData.append("title", book.title)
        formData.append("author", book.author)
        formData.append("subject", book.subject)
        formData.append("rack_number", book.rack_number)
        if (image.current.files && image.current.files[0]) {
            formData.append("image_url", image.current.files[0]);
        }

        console.log(formData);

        axios
            .put("http://localhost:4000/admin/update-book/" + id, formData, {
                headers: {
                    token: "520d8e5e880254ea31d7dd1fda14bcb6",
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((resp) => {
                setBook({
                    ...book,
                    err: null,
                    loading: false,
                    reload: !book.reload,
                    image_url: image.current.files[0],
                    success: "Movie Created Successfully !",
                });
                image.current.value = null;
            })
            .catch((errors) => {
                setBook({
                    ...book,
                    loading: false,
                    success: null,
                    err: "Something went wrong, please try again later !",
                });
            });
    }

    useEffect(() => {
        setBook({ ...book, loading: true });    
        axios
            .get("http://localhost:4000/admin/search-books/" + id)
            .then((res) => {
                setBook({ 
                    ...book, 
                    isbn: res.data.ISBN,
                    title: res.data.title,
                    author: res.data.author,
                    subject: res.data.subject,
                    image_url: res.data.image_url,
                    rack_number: res.data.rack_number,
                    loading: false,
                    err: null })
                console.log(book.subject);
            })
            .catch((err) => {
                setBook({
                    ...book,
                    loading: false,
                    err: "something went wrong, please try again later !"
                })
            })
    }, [book.reload]);

    return (
        <div className="new">
            <div className="newContainer">
                <div className="top">
                    <h1>{formTitle}</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img
                            src={book.image_url}
                            alt=""
                        />
                    </div>
                    <div className="right">
                    <form
                            method='post'
                            onSubmit={updateBook}
                        >
                            <div className="formInput">
                                <label htmlFor="file">
                                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    style={{ display: "none" }}
                                    onChange={
                                        () => {
                                            book.image_url = image.current.files[0];
                                        }
                                    }
                                    required
                                    ref={image}
                                />
                            </div>

                            <div className="formInput">
                                <label>Title</label>
                                <input 
                                    type="text"
                                    placeholder={"Lord of the rings"} 
                                    required 
                                    value={book.title}
                                    onChange={(e) => setBook({ ...book, title: e.target.value })}
                                    />
                            </div>
                            <div className="formInput">
                                <label>Author</label>
                                <input
                                    type="text"
                                    placeholder={"Abraham Lincolin"} 
                                    required 
                                    value={book.author}
                                    onChange={(e) => setBook({ ...book, author: e.target.value })}
                                />
                            </div>
                            <div className="formInput">
                                <label>Category</label>
                                <input 
                                    type="text"
                                    placeholder={"Action , Drama"} 
                                    required 
                                    defaultValue={book.subject}
                                    value={book.subject}
                                    onChange={(e) => setBook({ ...book, subject: e.target.value })}
                                />
                            </div>
                            <div className="formInput">
                                <label>ISBN</label>
                                <input 
                                    type="number"
                                    placeholder={3463473} 
                                    required 
                                    value={book.isbn}
                                    onChange={(e) => setBook({ ...book, isbn: e.target.value })}
                                />
                            </div>
                            <div className="formInput">
                                <label>Rack</label>
                                <input 
                                    type="number"
                                    placeholder={34} 
                                    required 
                                    value={book.rack_number}
                                    onChange={(e) => setBook({ ...book, rack_number: e.target.value })}
                                />
                            </div>
                            <button
                                type='submit'
                            >
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateForm
