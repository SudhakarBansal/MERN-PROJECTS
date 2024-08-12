import { useState } from 'react';
import './App.css';
import AddData from './Components/AddData';
import Home from './Components/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [books, setbooks] = useState([]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home books={books} setbooks={setbooks}/>} />
          <Route path="/addEntry" element={<AddData/>} />
          <Route path="/editEntry/:id" element={<AddData books={books}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
