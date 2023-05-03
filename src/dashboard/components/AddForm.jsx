import { useState,useRef } from 'react';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import '../styling/AddForm.css'
import axios from 'axios';


const AddForm = ({ title }) => {
    
    const [book, setBook] = useState({
        image_url: null,
        isbn: 0,
        title: "",
        author: "",
        subject: "",
        rack_number: 0,
        loading: false,
        reload: 0,
        success: null,
    });
    
    
    const image = useRef(null);
    
    
    const createBook = (e) => {
        e.preventDefault();
        const url = "http://localhost:4000/admin/create-book"

        setBook({ ...book, loading: true});

        const formData = new FormData();
        if (image.current.files && image.current.files[0] ) {
            book.image_url = image.current.files[0]
            formData.append("image_url", image.current.files[0])
            console.log(book.image_url);
        }
        formData.append("isbn", book.isbn)
        formData.append("title", book.title)
        formData.append("author", book.author)
        formData.append("subject", book.subject)
        formData.append("rack_number", book.rack_number)


        console.log("this is form data" + formData.entries);
        for (var key of formData.entries()) {
			console.log(key[0] + ', ' + key[1])
		}
        axios
            .post(url, formData, {
                headers: {
                    token: "520d8e5e880254ea31d7dd1fda14bcb6",
                    "Content-Type": "multipart/form-data",
                }
            })
            .then((resp) => {
                setBook({
                    ...book,
                    err: null,
                    loading: false,
                    success: "Movie Created Successfully !",
                });
                image.current.value = null;
            })
            .catch((errors) => {
                setBook({
                    ...book,
                    loading: false,
                    success: null,
                    err: "Something went wrong, please try again later ! err",
                });
                console.log(errors);
            });
    };


    return (
        <div className="new">
            <div className="newContainer">
                <div className="top">
                    <h1>{title}</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img
                            src={
                                book.image_url ? URL.createObjectURL(book.image_url) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                            }
                            alt=""
                        />
                    </div>
                    <div className="right">
                        <form
                            method='post'
                            onSubmit={createBook}
                        >
                            <div className="formInput">
                                <label htmlFor="file">
                                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    style={{ display: "none" }}
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
                                    value={book.subject}
                                    onChange={(e) => setBook({ ...book, subject: e.target.value })}
                                />
                            </div>
                            <div className="formInput">
                                <label>ISBN</label>
                                <input 
                                    type="text"
                                    placeholder={3463473} 
                                    required 
                                    value={book.isbn}
                                    onChange={(e) => setBook({ ...book, isbn: e.target.value })}
                                />
                            </div>
                            <div className="formInput">
                                <label>Rack</label>
                                <input 
                                    type="text"
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

export default AddForm
