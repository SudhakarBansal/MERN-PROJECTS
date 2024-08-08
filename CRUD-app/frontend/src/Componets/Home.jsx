import { useEffect, useState } from 'react';
import Card from './Card';

const Home = () => {
  const [todos, settodos] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const url = "http://localhost:4000/fetch-data";
    let result = await fetch(url);
    result = await result.json();
    settodos(result);
  };

  return (
    <>
      <div className="container d-flex align-items-center justify-content-center flex-wrap flex-column">
        <h1 className="m-4">
          Posts :
        </h1>
        <div className="container d-flex flex-wrap">
          {
            todos.length > 0 && todos ? (
              <Card todos={todos} settodos={settodos} getProducts={getProducts}/>
            ) : <p>loading..</p>
          }
        </div>
      </div>
    </>
  );
}

export default Home

