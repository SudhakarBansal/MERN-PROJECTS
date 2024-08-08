import { useEffect, useState } from 'react';
import './App.css';
import Card from './Componets/Card';

function App() {
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

  useEffect(() => {
    console.log(todos); // Logs whenever todos changes
  }, [todos]);

  return (
    <>
      {
        todos.length > 0 && todos ? (
          <Card todos={todos} settodos={settodos} />
        ) : <p>loading..</p>
      }

    </>
  );
}

export default App;
