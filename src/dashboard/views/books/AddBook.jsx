import AddForm from "../../components/AddForm";
import { bookInputs } from "../../FormSource";

const AddBook = () => {

    return (
        <div>
            <AddForm inputs={bookInputs} title={"Add New Book"} />
        </div>
    );
}

export default AddBook