import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Configurator from "./pages/Configurator";
import Identity from "./pages/Identity";
import Gallery from "./pages/Gallery";
import Drops from "./pages/Drops";
import Teams from "./pages/Teams";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Account from "./pages/Account";
import Orders from "./pages/Orders";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/shop" element={<Shop />} />

        <Route path="/product/:id" element={<Product />} />

        <Route path="/identity" element={<Identity />} />

        <Route path="/design" element={<Identity />} />
        <Route path="/configurator" element={<Configurator />} />

        <Route path="/gallery" element={<Gallery />} />

        <Route path="/drops" element={<Drops />} />

        <Route path="/teams" element={<Teams />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/checkout" element={<Checkout />} />

        <Route path="/account" element={<Account />} />

        <Route path="/orders" element={<Orders />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;