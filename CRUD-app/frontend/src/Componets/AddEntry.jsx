import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddEntry = () => {
  const [title, settitle] = useState("");
  const [subTitle, setsubTitle] = useState("");

  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:4000/add-data`, {
      method: "POST",
      body: JSON.stringify({ title, subTitle }),
      headers: {
        'Content-Type': "application/json"
      }
    });
    navigate('/');
  }
  return (
    <>
      <div className="container">
        <h1 className="m-3">Add New Item</h1>
        <form className='p-3'>
          <div className="form-group">
            <label htmlFor="titleId" className='f'>Title</label>
            <input type='text' className="form-control mt-1" id='titleId' value={title} onChange={(e) => settitle(e.target.value)} />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="exampleFormControlTextarea1">description</label>
            <textarea className="form-control mt-1" id="exampleFormControlTextarea1" rows="3" value={subTitle} onChange={(e) => setsubTitle(e.target.value)} ></textarea>
          </div>
          <button className="btn btn-primary mt-3" onClick={handleAdd}>Done</button>
        </form>
      </div>
    </>
  )
}


export default AddEntry