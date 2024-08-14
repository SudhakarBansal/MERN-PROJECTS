import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Entry = () => {

  const [roll_no, setroll_no] = useState("");
  const [st_name, setname] = useState("");
  const [st_class, setclass] = useState("")
  const navigate = useNavigate();

  const handleClick = async(e)=>{
    e.preventDefault();
    let result = await fetch("http://localhost:5000/add-data",{
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify({roll_no,st_name,st_class})
    })
    navigate('/');
  }
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center flex-column">
        <h1 className='my-5'>Add Student</h1>
        <form className='w-25'>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Roll No</label>
            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={roll_no} onChange={(e)=>setroll_no(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Name</label>
            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={st_name} onChange={(e)=>setname(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Class</label>
            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={st_class} onChange={(e)=>setclass(e.target.value)}/>
          </div>
          
          <button type="submit" className="btn btn-primary" onClick={handleClick}>Add</button>
        </form>
      </div>

    </>
  )
}

export default Entry