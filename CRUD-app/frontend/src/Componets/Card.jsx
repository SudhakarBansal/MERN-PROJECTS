import React from 'react'

const Card = ({ todos, settodos }) => {
  return (
    <>
      {
        todos.map((todo,index) => (
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body" key={index}>
              <h5 className="card-title">{todo.title}</h5>
              <p className="card-text">{todo.subTitle}</p>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        ))
      }
    </>
  )
}

export default Card