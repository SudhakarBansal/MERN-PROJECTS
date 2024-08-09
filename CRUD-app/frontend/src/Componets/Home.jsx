import { useEffect, useState } from 'react';

const Home = () => {
  const [todos, settodos] = useState([]);
  const [title, settitle] = useState("");
  const [subTitle, setsubTitle] = useState("");
  const [isEdit, setisEdit] = useState(false)

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const url = "http://localhost:4000/fetch-data";
    let result = await fetch(url);
    result = await result.json();
    settodos(result);
  };

  const handleClick = (todo) => {
    settitle(todo.title);
    setsubTitle(todo.subTitle);
    setisEdit((prev) => !prev)
  }

  const handleDelete = async (id) => {
    let result = await fetch(`http://localhost:4000/delete-data/${id}`, {
      method: "DELETE"
    });
    result = await result.json();
    console.log(result);
    if (result) {
      getProducts();
    }
  }
  const handleEdit = async (id) => {
    await fetch(`http://localhost:4000/update-data/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, subTitle }),
      headers: {
        'Content-Type': "application/json"
      }
    });

    setisEdit((prev) => !prev);
    

  }

  return (
    <>
      <div className="container d-flex align-items-center justify-content-center flex-wrap flex-column">
        <h1 className="m-4">
          Posts :
        </h1>
        <div className="container d-flex flex-wrap">
          {
            todos.length > 0 && todos ? (

              todos.map((todo, index) => (
                <div className="card mx-3" style={{ width: "18rem" }}>
                  {!isEdit ? (<div className="card-body" key={index}>
                    <h5 className="card-title">{todo.title}</h5>
                    <p className="card-text">{todo.subTitle}</p>
                    <button className="btn btn-info m-1" onClick={() => handleClick(todo)}>Edit</button>
                    <button className="btn btn-danger m-1" onClick={() => handleDelete(todo._id)}>Delete</button>
                  </div>) :
                    (
                      <form className='p-3'>
                        <div class="form-group">
                          <label for="titleId" className='f'>Title</label>
                          <input type='text' className="form-control mt-1" id='titleId' value={title} onChange={(e) => settitle(e.target.value)} />
                        </div>
                        <div class="form-group mt-3">
                          <label for="exampleFormControlTextarea1">description</label>
                          <textarea class="form-control mt-1" id="exampleFormControlTextarea1" rows="3" value={subTitle} onChange={(e) => setsubTitle(e.target.value)} ></textarea>
                        </div>
                        <button className="btn btn-primary mt-3" onClick={() => handleEdit(todo._id)}>Done</button>
                      </form>
                    )
                  }
                </div>
              ))
            ) : <p>loading..</p>
          }
        </div>
      </div>
    </>
  );
}

export default Home

