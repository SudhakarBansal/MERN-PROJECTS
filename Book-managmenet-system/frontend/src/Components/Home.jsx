import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = ({ books, setbooks }) => {
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

  const handleSearch=async(event)=>{
    let key = event.target.value;
    if (key) {
      key = key.slice(0, 1).toUpperCase() + key.slice(1);
      let result = await fetch(`http://localhost:5000/search/${key}`);
      result = await result.json();
      if (result) {
        setbooks(result)
      }
    }else{
      getBooks();
    }
  }


  return (
    <>
      <div className="container d-flex align-items-center justify-content-center flex-column">
        <h1 className='m-5 text-light'>Books : </h1>

        <div className="input-group mb-3 w-50">
          <input type="text" className="form-control" placeholder="Search here..." aria-label="Recipient's username" aria-describedby="button-addon2" onChange={handleSearch}/>
        </div>

        {books.length > 0 && books ? (<div className="d-flex align-items-center flex-wrap">
          {
            books.map((book, index) => (
              <div className="card m-3 bg-dark text-light border-light" style={{ width: "22rem" }} key={index}>
                {/* <img src="..." className="card-img-top" alt="..."/> */}
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h4 className="card-title">{book.title}</h4>
                    <h4 className="card-text"><span className="badge text-bg-secondary">${book.price}</span></h4>
                  </div>
                  <p className="card-text">{book.subTitle}</p>
                  <p className="card-text">Author : {book.author}</p>
                  <button className='btn btn-outline-light mx-1' onClick={() => navigate(`/editEntry/${book._id}`)}>Edit</button>
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