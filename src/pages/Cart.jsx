import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function readCart() {
  try {
    const value = JSON.parse(localStorage.getItem("nexusCart") || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(readCart());
  }, []);

  const saveCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("nexusCart", JSON.stringify(updatedCart));
  };

  const updateQuantity = (index, change) => {
    const updatedCart = [...cart];
    const nextQuantity = Number(updatedCart[index].quantity || 1) + change;
    if (nextQuantity <= 0) updatedCart.splice(index, 1);
    else updatedCart[index] = { ...updatedCart[index], quantity: nextQuantity };
    saveCart(updatedCart);
  };

  const removeItem = (index) => saveCart(cart.filter((_, i) => i !== index));

  const subtotal = cart.reduce(
    (total, item) => total + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );
  const shipping = subtotal > 0 ? 99 : 0;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <main className="cart-page empty-cart">
        <p className="hero-eyebrow">NEXUS CART</p>
        <h1>YOUR CART IS EMPTY.</h1>
        <p>Your jerseys will appear here.</p>
        <button className="primary-btn" onClick={() => navigate("/shop")}>
          EXPLORE COLLECTION
        </button>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-header">
        <p className="hero-eyebrow">NEXUS CART</p>
        <h1>YOUR CART.</h1>
        <p>Review your jerseys before checkout.</p>
      </div>

      <section className="cart-layout">
        <div className="cart-items">
          {cart.map((item, index) => (
            <div
              className="cart-item"
              key={`${item.id}-${item.size}-${item.customization?.color || "standard"}-${item.customization?.customName || ""}-${item.customization?.jerseyNumber || ""}-${index}`}
            >
              <div className="cart-product-image">
                <span>NEXUS</span>
                <strong>NX</strong>
              </div>

              <div className="cart-product-info">
                <p className="cart-category">{item.category}</p>
                <h2>{item.name}</h2>
                <p>Size: {item.size}</p>
                {item.customization && (
                  <div className="cart-customization-details">
                    <p>Name: {item.customization.customName}</p>
                    <p>Number: {item.customization.jerseyNumber}</p>
                    <p>Color: {item.customization.color}</p>
                  </div>
                )}

                <div className="cart-quantity">
                  <button aria-label={`Decrease ${item.name} quantity`} onClick={() => updateQuantity(index, -1)}>−</button>
                  <span>{item.quantity || 1}</span>
                  <button aria-label={`Increase ${item.name} quantity`} onClick={() => updateQuantity(index, 1)}>+</button>
                </div>

                <button className="remove-btn" onClick={() => removeItem(index)}>REMOVE</button>
              </div>

              <div className="cart-item-price">
                ₹{(Number(item.price || 0) * Number(item.quantity || 1)).toLocaleString("en-IN")}
              </div>
            </div>
          ))}
        </div>

        <aside className="cart-summary">
          <p className="hero-eyebrow">ORDER SUMMARY</p>
          <div className="summary-row"><span>Subtotal</span><span>₹{subtotal.toLocaleString("en-IN")}</span></div>
          <div className="summary-row"><span>Shipping</span><span>₹{shipping.toLocaleString("en-IN")}</span></div>
          <div className="summary-divider" />
          <div className="summary-total"><span>TOTAL</span><strong>₹{total.toLocaleString("en-IN")}</strong></div>
          <button className="checkout-btn" onClick={() => navigate("/checkout")}>PROCEED TO CHECKOUT</button>
          <button className="continue-btn" onClick={() => navigate("/shop")}>CONTINUE SHOPPING</button>
        </aside>
      </section>
    </main>
  );
}

export default Cart;
