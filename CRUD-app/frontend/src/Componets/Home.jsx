import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [todos, settodos] = useState([]);
  const [title, settitle] = useState("");
  const [subTitle, setsubTitle] = useState("");
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();

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
    setEditId(todo._id); // Set the ID of the item being edited
  };

  const handleDelete = async (id) => {
    let result = await fetch(`http://localhost:4000/delete-data/${id}`, {
      method: "DELETE"
    });
    result = await result.json();
    console.log(result);
    if (result) {
      getProducts();
    }
  };

  const handleEdit = async (id) => {
    await fetch(`http://localhost:4000/update-data/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, subTitle }),
      headers: {
        'Content-Type': "application/json"
      }
    });

    setEditId(null); // Reset the edit ID after editing
    getProducts(); // Refresh the list after editing
  };

  const handleAddClick = () => {
    navigate('/addEntry');
  };

  return (
    <>
      <div className="container d-flex align-items-center justify-content-center flex-wrap flex-column">
        <h1 className="m-4">
          Posts :
        </h1>
        <div className="container d-flex flex-wrap align-items-center justify-content-center">
          {
            todos.length > 0 ? (
              todos.map((todo) => (
                <div className="card m-3" style={{ width: "18rem" }} key={todo._id}>
                  {editId === todo._id ? (
                    <form className='p-3'>
                      <div className="form-group">
                        <label htmlFor="titleId" className='f'>Title</label>
                        <input type='text' className="form-control mt-1" id='titleId' value={title} onChange={(e) => settitle(e.target.value)} />
                      </div>
                      <div className="form-group mt-3">
                        <label htmlFor="exampleFormControlTextarea1">description</label>
                        <textarea className="form-control mt-1" id="exampleFormControlTextarea1" rows="3" value={subTitle} onChange={(e) => setsubTitle(e.target.value)} ></textarea>
                      </div>
                      <button className="btn btn-primary mt-3" type="button" onClick={() => handleEdit(todo._id)}>Done</button>
                    </form>
                  ) : (
                    <div className="card-body">
                      <h5 className="card-title">{todo.title}</h5>
                      <p className="card-text">{todo.subTitle}</p>
                      <button className="btn btn-info m-1" onClick={() => handleClick(todo)}>Edit</button>
                      <button className="btn btn-danger m-1" onClick={() => handleDelete(todo._id)}>Delete</button>
                    </div>
                  )}
                </div>
              ))
            ) : <p>loading..</p>
          }
        </div>

        <button className='btn btn-primary' onClick={handleAddClick}>Add Items</button>
      </div>
    </>
  );
}

export default Home;
