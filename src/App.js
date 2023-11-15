import './App.css';
import NavBar from './components/NavBar/NavBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import Catalog from './components/Catalog/Catalog'
import Cart from './components/Cart/Cart'
import Checkout from './components/Checkout/Checkout'
import CheckoutCreated from './components/Checkout/CheckoutCreated'
import { CartProvider } from './context/CartContext';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <CartProvider>
      <NavBar/>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/catalog" element={<Catalog/>} />
        <Route exact path="/catalog/:id" element={<ItemDetailContainer/>} />
        <Route exact path="/cart" element={<Cart/>} />
        <Route exact path="/checkout" element={<Checkout/>} />
        <Route exact path="/checkoutcreated/:id" element={<CheckoutCreated />} />
      </Routes>
      </CartProvider>
      </BrowserRouter>

    </div>
  );
}

export default App;
