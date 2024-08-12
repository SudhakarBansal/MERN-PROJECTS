import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddData = () => {
  const [title, settitle] = useState("");
  const [subTitle, setsubTitle] = useState("");
  const [author, setauthor] = useState("");
  const [price, setprice] = useState("")

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    let result = await fetch("http://localhost:5000/add-data",{
      method:"POST",
      body:JSON.stringify({title,subTitle,author,price}),
      headers:{
        "Content-type":"application/json"
      }
    });
    console.log(result.json());
    navigate('/');
  }

  return (
    <>
      <div className="container d-flex justify-content-center flex-column align-items-center py-5 text-light">
        <h1>Add new Book</h1>
        <form className='container py-5 w-50' onSubmit={handleSubmit}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Title</label>
            <input type="text" class="form-control bg-dark border-light text-light" id="exampleInputEmail1" aria-describedby="emailHelp" value={title} onChange={(e)=>settitle(e.target.value)}/>
          </div>
          <div class="mb-3">
            <label for="exampleInputSubtitle1" class="form-label">Subtitle</label>
            <input type="text" class="form-control bg-dark border-light text-light" id="exampleInputSubtitle1" value={subTitle} onChange={(e)=>setsubTitle(e.target.value)}/>
          </div>
          <div class="mb-3">
            <label for="exampleInputSubtitle1" class="form-label">Author</label>
            <input type="text" class="form-control bg-dark border-light text-light" id="exampleInputSubtitle1" value={author} onChange={(e)=>setauthor(e.target.value)}/>
          </div>
          <div class="mb-3">
            <label for="exampleInputSubtitle1" class="form-label">Price</label>
            <input type="text" class="form-control bg-dark border-light text-light" id="exampleInputSubtitle1" value={price} onChange={(e)=>setprice(e.target.value)}/>
          </div>

          <button type="submit" class="btn btn-primary">Add Book</button>
        </form>
      </div>
    </>
  )
}

export default AddData