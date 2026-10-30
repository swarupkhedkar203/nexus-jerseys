import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import products from "../data/products";

function Product() {
const navigate = useNavigate();
const { id } = useParams();

// Find the selected product using its URL ID.
const product = products.find((item) => item.id === id);

const [size, setSize] = useState("M");
const [quantity, setQuantity] = useState(1);

// Handle invalid product IDs.
if (!product) {
return ( <main className="product-page"> <h1>PRODUCT NOT FOUND</h1> <p>The jersey you're looking for doesn't exist.</p>
<button
className="primary-btn"
onClick={() => navigate("/shop")}
>
BACK TO SHOP </button> </main>
);
}

const addToCart = () => {
const cartItem = {
id: product.id,
name: product.name,
category: product.category,
price: product.price,
image: product.image,
size,
quantity,
};
const existingCart =
  JSON.parse(localStorage.getItem("nexusCart")) || [];

const existingIndex = existingCart.findIndex(
  (item) => item.id === cartItem.id && item.size === cartItem.size
);

if (existingIndex >= 0) {
  existingCart[existingIndex].quantity += quantity;
} else {
  existingCart.push(cartItem);
}

localStorage.setItem("nexusCart", JSON.stringify(existingCart));

alert(`${product.name} added to cart!`);

};

return ( <main className="product-page"> <section className="product-details">
{/* Product visual */}
<div
className="product-visual"
style={{ "--product-accent": product.accent }}
> <div className="jersey-preview">
{product.image ? (
<img
src={product.image}
alt={`${product.name} jersey`}
loading="lazy"
/>
) : (
<> <span>NEXUS</span> <strong>NX</strong>
</>
)} </div> </div>

```
    {/* Product information */}
    <div className="product-info">
      <p className="hero-eyebrow">{product.category}</p>

      <h1>{product.name}</h1>

      <p className="product-description">
        {product.description}
      </p>

      <h2>₹{product.price.toLocaleString("en-IN")}</h2>

      {/* Size selection */}
      <div className="product-option">
        <label>SELECT SIZE</label>

        <div className="size-options">
          {["S", "M", "L", "XL"].map((item) => (
            <button
              type="button"
              key={item}
              className={size === item ? "active" : ""}
              aria-pressed={size === item}
              onClick={() => setSize(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity selection */}
      <div className="product-option">
        <label>QUANTITY</label>

        <div className="quantity-control">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() =>
              setQuantity((current) => Math.max(1, current - 1))
            }
          >
            −
          </button>

          <span>{quantity}</span>

          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQuantity((current) => current + 1)}
          >
            +
          </button>
        </div>
      </div>

      {/* Product actions */}
      <div className="product-actions">
        <button
          type="button"
          className="primary-btn"
          onClick={addToCart}
        >
          ADD TO CART
        </button>

        <button
          type="button"
          className="secondary-btn"
          onClick={() => navigate("/shop")}
        >
          BACK TO SHOP
        </button>
      </div>
    </div>
  </section>
</main>
);
}

export default Product;
