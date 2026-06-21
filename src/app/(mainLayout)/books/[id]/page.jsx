
const bookDetailsPage = async ({params}) => {
    const {id} =await params;
    const res = await fetch(`http://localhost:5000/api/books/${id}`);
    const book = await res.json();
    console.log('book data', book);
    return (
        <div>
        <p>book details page {id}</p>
        </div>
    );
};

export default bookDetailsPage;