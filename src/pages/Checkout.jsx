import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function readStoredArray(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(() => readStoredArray("nexusCart"));
  const [ordered, setOrdered] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", pincode: "" });

  useEffect(() => {
    setCart(readStoredArray("nexusCart"));
  }, []);

  const subtotal = cart.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1), 0);
  const shipping = subtotal > 0 ? 99 : 0;
  const total = subtotal + shipping;

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (cart.length === 0) {
      alert("Your cart is empty. Add a jersey before placing an order.");
      navigate("/shop");
      return;
    }

    const order = {
      id: `NX-${Date.now().toString().slice(-8)}`,
      date: new Date().toISOString(),
      customer: { ...form },
      items: cart,
      subtotal,
      shipping,
      total,
      paymentMethod: "Cash on Delivery",
      status: "Order placed",
    };

    const previousOrders = readStoredArray("nexusOrders");
    localStorage.setItem("nexusOrders", JSON.stringify([order, ...previousOrders]));
    localStorage.setItem("nexusCart", JSON.stringify([]));
    setOrdered(order);
  };

  if (ordered) {
    return (
      <main className="checkout-page">
        <section className="order-success">
          <p className="hero-eyebrow">NEXUS ORDER</p>
          <h1>ORDER CONFIRMED.</h1>
          <p>Thanks, {ordered.customer.name}. Your order has been saved.</p>
          <div className="order-id">ORDER ID: {ordered.id}</div>
          <p>Total: ₹{ordered.total.toLocaleString("en-IN")}</p>
          <button onClick={() => navigate("/orders")}>VIEW MY ORDERS</button>
          <button onClick={() => navigate("/shop")}>CONTINUE SHOPPING</button>
        </section>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="checkout-page">
        <section className="order-success">
          <p className="hero-eyebrow">NEXUS CHECKOUT</p>
          <h1>YOUR CART IS EMPTY.</h1>
          <p>Add a jersey to your cart before checkout.</p>
          <button onClick={() => navigate("/shop")}>EXPLORE COLLECTION</button>
        </section>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <section className="checkout-header">
        <p className="hero-eyebrow">NEXUS CHECKOUT</p>
        <h1>CHECKOUT</h1>
        <p>Complete your Nexus order.</p>
      </section>

      <section className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="checkout-card">
            <p className="section-label">01 / CUSTOMER DETAILS</p>
            <h2>YOUR INFORMATION</h2>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="checkout-name">FULL NAME</label>
                <input id="checkout-name" type="text" name="name" autoComplete="name" placeholder="Enter your name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="checkout-email">EMAIL</label>
                <input id="checkout-email" type="email" name="email" autoComplete="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="checkout-phone">PHONE</label>
                <input id="checkout-phone" type="tel" name="phone" autoComplete="tel" pattern="[0-9+() -]{8,20}" placeholder="Enter phone number" value={form.phone} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="checkout-pincode">PINCODE</label>
                <input id="checkout-pincode" type="text" name="pincode" autoComplete="postal-code" pattern="[0-9]{6}" maxLength={6} placeholder="6-digit pincode" value={form.pincode} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="checkout-address">ADDRESS</label>
              <textarea id="checkout-address" name="address" autoComplete="street-address" placeholder="Enter your complete address" value={form.address} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="checkout-city">CITY</label>
              <input id="checkout-city" type="text" name="city" autoComplete="address-level2" placeholder="Enter your city" value={form.city} onChange={handleChange} required />
            </div>
          </div>

          <div className="checkout-card">
            <p className="section-label">02 / PAYMENT</p>
            <h2>PAYMENT METHOD</h2>
            <div className="payment-option">
              <input id="cod" type="radio" name="payment" checked readOnly />
              <div><strong>Cash on Delivery</strong><span>Pay when your jersey arrives.</span></div>
            </div>
            <p>This is a demo checkout. No real payment is collected.</p>
          </div>
          <button className="place-order" type="submit">PLACE ORDER →</button>
        </form>

        <aside className="order-summary">
          <p className="section-label">03 / ORDER SUMMARY</p>
          <h2>YOUR ORDER</h2>
          {cart.map((item, index) => (
            <div className="summary-product" key={`${item.id}-${item.size}-${index}`}>
              <div className="jersey-preview"><span>NEXUS</span><small>NX</small></div>
              <div>
                <h3>{item.name}</h3>
                <p>{item.category} Jersey</p>
                <p>Size: {item.size}</p>
                <p>Quantity: {item.quantity || 1}</p>
                {item.customization && <p>{item.customization.customName} · #{item.customization.jerseyNumber} · {item.customization.color}</p>}
                <strong>₹{(Number(item.price || 0) * Number(item.quantity || 1)).toLocaleString("en-IN")}</strong>
              </div>
            </div>
          ))}
          <div className="summary-line"><span>Subtotal</span><strong>₹{subtotal.toLocaleString("en-IN")}</strong></div>
          <div className="summary-line"><span>Shipping</span><strong>₹{shipping.toLocaleString("en-IN")}</strong></div>
          <div className="summary-total"><span>TOTAL</span><strong>₹{total.toLocaleString("en-IN")}</strong></div>
        </aside>
      </section>
    </main>
  );
}

export default Checkout;
