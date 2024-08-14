import React, { useEffect, useState } from 'react'

const Home = () => {
  const [students, setstudents] = useState([]);


  useEffect(() => {
    getStudents();
  }, [])

  const handleDelete=async(sId)=>{
    try {
      await fetch(`http://localhost:5000/delete-data/${sId}`,{
        method:"DELETE"
      });
      getStudents();
    } catch (error) {
      console.log(error);
    } 
  }

  const getStudents = async () => {
    let result = await fetch('http://localhost:5000/fetch-data');
    result = await result.json();
    setstudents(result);
  }
  return (
    <>
      {students && students.length > 0 ? (
        <div className="container">
          <h1 className='my-5'>Students</h1>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Roll no</th>
                <th scope="col">Name</th>
                <th scope="col">Class</th>
                <th scope="col">Operations</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student,index) => (
                <tr key={index}>
                  <td>{student.roll_no}</td>
                  <td>{student.st_name}</td>
                  <td>{student.st_class}</td>
                  <td><button className='btn btn-primary mx-1'>Edit</button>
                    <button className='btn btn-danger mx-1' onClick={()=>handleDelete(student._id)}>Delete</button></td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      ) : <p>loading...</p>
      }
    </>
  )
}

export default Home