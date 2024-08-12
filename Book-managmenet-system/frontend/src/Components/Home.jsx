import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [books, setbooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getBooks();
  }, [])


  const getBooks = async () => {
    let result = await fetch("http://localhost:5000/fetch-data");
    result = await result.json();
    setbooks(result);
  }

  const handleDelete = async (id) => {
    let result = await fetch(`http://localhost:5000/delete-data/${id}`, {
      method: "DELETE"
    });

    result = await result.json();
    if (result) {
      getBooks();
    }
  }


  return (
    <>
      <div className="container d-flex align-items-center justify-content-center flex-column">
        <h1 className='m-5 text-light'>Books : </h1>

        {books.length > 0 && books ? (<div className="d-flex align-items-center flex-wrap">
          {
            books.map((book) => (
              <div className="card m-3 bg-dark text-light border-light" style={{ width: "22rem" }}>
                {/* <img src="..." className="card-img-top" alt="..."/> */}
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h4 className="card-title">{book.title}</h4>
                    <h4 className="card-text"><span class="badge text-bg-secondary">${book.price}</span></h4>
                  </div>
                  <p className="card-text">{book.subTitle}</p>
                  <p className="card-text">Author : {book.author}</p>
                  <button className='btn btn-outline-light mx-1' onClick={()=>navigate(`/addEntry/${book._id}`)}>Edit</button>
                  <button className='btn btn-outline-danger mx-1' onClick={() => handleDelete(book._id)}>Delete</button>
                </div>
              </div>
            ))
          }
        </div>) : <p className='text-light'>Loading...</p>}
        <div>
          <button className='btn btn-light m-4' onClick={() => navigate('/addEntry')}>Add New Book</button>
        </div>
      </div>

    </>
  )
}

export default Home