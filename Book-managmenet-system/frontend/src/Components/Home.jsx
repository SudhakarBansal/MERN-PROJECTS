import React, { useState } from 'react'
import { useEffect } from 'react'

const Home = () => {
  const [books, setbooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, [])


  const getBooks = async () => {
    let result = await fetch("http://localhost:5000/fetch-data");
    result = await result.json();
    setbooks(result);
  }

  const handleEdit=()=>{

  }

  const handleDelete=async(id)=>{
    let result = await fetch(`http://localhost:5000/delete-data/${id}`,{
      method:"DELETE"
    });

    result = await result.json();
    if (result) {
      getBooks();
    }

  }


  return (
    <>
      {books.length > 0 && books ? (<div className="container d-flex align-items-center justify-content-center flex-column">
        <h1 className='m-5'>Books : </h1>

        <div className="d-flex align-items-center flex-wrap">
          {
            books.map((book) => (
              <div className="card m-3" style={{ width: "22rem" }}>
                {/* <img src="..." className="card-img-top" alt="..."/> */}
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                  <h4 className="card-title">{book.title}</h4>
                  <h4 className="card-text"><span class="badge text-bg-secondary">${book.price}</span></h4>
                  </div>
                  <p className="card-text">{book.subTitle}</p>
                  <p className="card-text">Author : {book.author}</p>
                  <button className='btn btn-outline-dark mx-1' onClick={handleEdit}>Edit</button>
                  <button className='btn btn-outline-danger mx-1' onClick={()=>handleDelete(book._id)}>Delete</button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    ) : <p>Loading...</p>}
    </>
  )
}

export default Home