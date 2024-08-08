import React from 'react'

const Card = ({ todos, settodos,getProducts }) => {

  const handleDelete=async(id)=>{
    let result = await fetch(`http://localhost:4000/delete-data/${id}`,{
      method:"DELETE"
    });
    result = await result.json();
    console.log(result);
    if (result) {
      getProducts();
    }
  }

  return (
    <>
      {
        todos.map((todo,index) => (
          <div className="card mx-3" style={{ width: "18rem" }}>
            <div className="card-body" key={index}>
              <h5 className="card-title">{todo.title}</h5>
              <p className="card-text">{todo.subTitle}</p>
              <button className="btn btn-danger m-1" onClick={()=>handleDelete(todo._id)}>Delete</button>
              <button className="btn btn-info m-1">Delete</button>
            </div>
          </div>
        ))
      }
    </>
  )
}

export default Card