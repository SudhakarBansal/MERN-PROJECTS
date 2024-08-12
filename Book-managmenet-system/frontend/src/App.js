import './App.css';
import AddData from './Components/AddData';
import Home from './Components/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addEntry" element={<AddData/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
