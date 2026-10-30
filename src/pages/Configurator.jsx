import { useState } from "react";
import { useNavigate } from "react-router-dom";
import products from "../data/products";

function readCart() {
  try {
    const value = JSON.parse(localStorage.getItem("nexusCart") || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function Configurator() {
  const navigate = useNavigate();
  const [productId, setProductId] = useState(products[0]?.id || "");
  const [customName, setCustomName] = useState("");
  const [jerseyNumber, setJerseyNumber] = useState("07");
  const [size, setSize] = useState("M");
  const [color, setColor] = useState("Black");

  const selectedProduct = products.find((product) => product.id === productId);

  function handleAddToCart() {
    if (!selectedProduct) {
      alert("Please select a jersey.");
      return;
    }
    if (!customName.trim()) {
      alert("Please enter your name.");
      return;
    }
    if (jerseyNumber === "" || !Number.isInteger(Number(jerseyNumber)) || Number(jerseyNumber) < 0 || Number(jerseyNumber) > 99) {
      alert("Jersey number must be between 0 and 99.");
      return;
    }

    const customization = {
      color,
      customName: customName.trim().toUpperCase(),
      jerseyNumber: String(Number(jerseyNumber)).padStart(2, "0"),
    };
    const cart = readCart();
    const matchingIndex = cart.findIndex((item) =>
      item.id === selectedProduct.id &&
      item.size === size &&
      item.customization?.color === customization.color &&
      item.customization?.customName === customization.customName &&
      item.customization?.jerseyNumber === customization.jerseyNumber
    );

    if (matchingIndex >= 0) {
      cart[matchingIndex] = {
        ...cart[matchingIndex],
        quantity: Number(cart[matchingIndex].quantity || 1) + 1,
      };
    } else {
      cart.push({
        id: selectedProduct.id,
        name: selectedProduct.name,
        category: selectedProduct.category,
        price: selectedProduct.price,
        image: selectedProduct.image,
        size,
        quantity: 1,
        customization,
      });
    }

    localStorage.setItem("nexusCart", JSON.stringify(cart));
    alert("Customized jersey added to your cart!");
    navigate("/cart");
  }

  if (!products.length) {
    return <main className="page-placeholder"><h1>No jerseys available</h1><p>Add products before customizing a jersey.</p></main>;
  }

  return (
    <main className="page-placeholder configurator-page">
      <p className="hero-eyebrow">NEXUS CONFIGURATOR</p>
      <h1>DESIGN YOUR JERSEY</h1>
      <p>Customize your jersey and make it yours.</p>

      <div className="configurator-field">
        <label htmlFor="config-product">Choose Jersey</label>
        <select id="config-product" value={productId} onChange={(event) => setProductId(event.target.value)}>
          {products.map((product) => <option key={product.id} value={product.id}>{product.name} — ₹{product.price.toLocaleString("en-IN")}</option>)}
        </select>
      </div>

      <p><strong>Price:</strong> ₹{Number(selectedProduct?.price || 0).toLocaleString("en-IN")}</p>

      <div className="configurator-field">
        <label htmlFor="config-name">Name on Jersey</label>
        <input id="config-name" type="text" maxLength={15} placeholder="Enter your name" value={customName} onChange={(event) => setCustomName(event.target.value)} required />
      </div>

      <div className="configurator-field">
        <label htmlFor="config-number">Jersey Number (0–99)</label>
        <input id="config-number" type="number" min="0" max="99" value={jerseyNumber} onChange={(event) => setJerseyNumber(event.target.value)} required />
      </div>

      <div className="configurator-field">
        <label htmlFor="config-color">Jersey Color</label>
        <select id="config-color" value={color} onChange={(event) => setColor(event.target.value)}>
          <option>Black</option><option>White</option><option>Blue</option><option>Red</option><option>Purple</option>
        </select>
      </div>

      <div className="configurator-field">
        <label htmlFor="config-size">Size</label>
        <select id="config-size" value={size} onChange={(event) => setSize(event.target.value)}>
          <option value="S">S</option><option value="M">M</option><option value="L">L</option><option value="XL">XL</option>
        </select>
      </div>

      <button type="button" onClick={handleAddToCart}>ADD CUSTOM JERSEY TO CART</button>
    </main>
  );
}

export default Configurator;
