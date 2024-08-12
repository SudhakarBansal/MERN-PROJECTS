import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const AddData = ({ books }) => {
  let { id } = useParams();
  const [title, settitle] = useState("");
  const [subTitle, setsubTitle] = useState("");
  const [author, setauthor] = useState("");
  const [price, setprice] = useState("")
  const isEdit = id !== undefined;

  useEffect(() => {
    if (isEdit) {
      const book = books.find((bk) => bk._id === id);
      if (book) {
        settitle(book.title);
        setsubTitle(book.subTitle);
        setauthor(book.author);
        setprice(book.price);
      }
    }
  }, [id, books])


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result;

    if (isEdit) {
      result = await fetch(`http://localhost:5000/update-data/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title, subTitle, author, price }),
        headers: {
          "Content-type": "application/json"
        }
      });
    } else {
      result = await fetch("http://localhost:5000/add-data", {
        method: "POST",
        body: JSON.stringify({ title, subTitle, author, price }),
        headers: {
          "Content-type": "application/json"
        }
      });
    }
    console.log(result.json());
    navigate('/');
  }

  return (
    <>
      <div className="container d-flex justify-content-center flex-column align-items-center py-5 text-light">
        <h1>{isEdit ? ('Update') : ('Add New')} Book</h1>
        <form className='container py-5 w-50' onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
            <input type="text" className="form-control bg-dark border-light text-light" id="exampleInputEmail1" aria-describedby="emailHelp" value={title} onChange={(e) => settitle(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputSubtitle1" className="form-label">Subtitle</label>
            <input type="text" className="form-control bg-dark border-light text-light" id="exampleInputSubtitle1" value={subTitle} onChange={(e) => setsubTitle(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputSubtitle1" className="form-label">Author</label>
            <input type="text" className="form-control bg-dark border-light text-light" id="exampleInputSubtitle1" value={author} onChange={(e) => setauthor(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputSubtitle1" className="form-label">Price</label>
            <input type="text" className="form-control bg-dark border-light text-light" id="exampleInputSubtitle1" value={price} onChange={(e) => setprice(e.target.value)} />
          </div>

          <button type="submit" className="btn btn-primary">{isEdit ? ('Update') : ('Add')} Book</button>
        </form>
      </div>
    </>
  )
}

export default AddData