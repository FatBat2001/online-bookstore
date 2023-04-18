import { useLoaderData } from "react-router-dom";
import { bookInputs } from "../../FormSource";
import UpdateForm from "../../components/UpdateForm";
import { findById } from "../../helper/helper";

export async function UpdateBookLoader({params}) {
    const oldData = findById({params})

    return oldData;
}

const UpdateBook = () => {

    const oldData = useLoaderData()

    return (
        <div>
            <UpdateForm oldData={oldData} inputs={bookInputs} formTitle={"Update Book"} />
        </div>
    );
}

export default UpdateBook