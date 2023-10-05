import './App.css';
import NavBar from './components/NavBar/NavBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home'
import Catalog from './components/Catalog/Catalog'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/catalog" element={<Catalog/>} />
        <Route exact path="/catalog/:id" element={<ItemDetailContainer/>} />
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
