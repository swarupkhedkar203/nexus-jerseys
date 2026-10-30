import { Heart, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function ProductCard({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const wishlist =
      JSON.parse(localStorage.getItem("nexusWishlist")) || [];

    setIsWishlisted(
      wishlist.some((item) => item.id === product.id)
    );
  }, [product.id]);

  const toggleWishlist = () => {
    const wishlist =
      JSON.parse(localStorage.getItem("nexusWishlist")) || [];

    const alreadyExists = wishlist.some(
      (item) => item.id === product.id
    );

    let updatedWishlist;

    if (alreadyExists) {
      updatedWishlist = wishlist.filter(
        (item) => item.id !== product.id
      );
      setIsWishlisted(false);
    } else {
      updatedWishlist = [...wishlist, product];
      setIsWishlisted(true);
    }

    localStorage.setItem(
      "nexusWishlist",
      JSON.stringify(updatedWishlist)
    );

    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  return (
    <article className="product-card">

      <div
        className="product-visual"
        style={{
        "--product-accent": product.accent,
        }}
      >

        <span className="product-badge">
          {product.badge}
        </span>

        <button
          type="button"
          className={`product-wishlist ${
            isWishlisted ? "active" : ""
          }`}
          aria-label={
            isWishlisted
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          onClick={toggleWishlist}
        >
          <Heart
            size={18}
            fill={isWishlisted ? "currentColor" : "none"}
          />
        </button>

<div className="product-jersey">
  <span className="jersey-brand">NEXUS</span>
  <span className="jersey-number">07</span>
  <span className="jersey-label">{product.name}</span>
</div>

        <Link
          to={`/product/${product.id}`}
          className="product-view"
        >
          VIEW
          <ArrowUpRight size={16} />
        </Link>

      </div>

      <div className="product-info">

        <div>
          <p className="product-category">
            {product.category}
          </p>

          <h3>{product.name}</h3>
        </div>

        <p className="product-price">
          ₹{product.price.toLocaleString("en-IN")}
        </p>

      </div>

    </article>
  );
}

export default ProductCard;