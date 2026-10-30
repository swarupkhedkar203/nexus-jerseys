import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function readOrders() {
  try {
    const value = JSON.parse(localStorage.getItem("nexusOrders") || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function Orders() {
  const [orders, setOrders] = useState(() => readOrders());

  useEffect(() => {
    setOrders(readOrders());
  }, []);

  return (
    <main className="page-placeholder orders-page">
      <p className="hero-eyebrow">NEXUS ORDERS</p>
      <h1>YOUR ORDERS</h1>
      <p>View orders placed through this demo store.</p>

      {orders.length === 0 ? (
        <section className="empty-orders">
          <h2>NO ORDERS YET.</h2>
          <p>Your completed demo orders will appear here.</p>
          <Link to="/shop" className="primary-btn">EXPLORE COLLECTION</Link>
        </section>
      ) : (
        <section className="orders-list">
          {orders.map((order) => (
            <article className="account-panel order-card" key={order.id}>
              <div>
                <p className="hero-eyebrow">{order.id}</p>
                <h2>{order.status || "Order placed"}</h2>
                <p>{new Date(order.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                <p>Ship to: {order.customer?.name || "Customer"} · {order.customer?.city || ""}</p>
              </div>
              <div>
                {(order.items || []).map((item, index) => (
                  <p key={`${item.id}-${index}`}>
                    {item.name} — Size {item.size} × {item.quantity || 1}
                    {item.customization ? ` (${item.customization.customName}, #${item.customization.jerseyNumber}, ${item.customization.color})` : ""}
                  </p>
                ))}
                <strong>Total: ₹{Number(order.total || 0).toLocaleString("en-IN")}</strong>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default Orders;
