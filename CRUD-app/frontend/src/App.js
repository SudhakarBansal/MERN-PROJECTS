import './App.css';
import AddEntry from './Componets/AddEntry';
import Home from './Componets/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addEntry" element={<AddEntry />} />
        </Routes>
      </BrowserRouter>
    </>
  )


}

export default App;
