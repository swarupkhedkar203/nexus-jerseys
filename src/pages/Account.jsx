import { useEffect, useState } from "react";
import { Heart, Package, User, Trash2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

function Account() {
  const [searchParams] = useSearchParams();

  const initialTab =
    searchParams.get("tab") || "profile";

  const [activeTab, setActiveTab] = useState(initialTab);

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const loadWishlist = () => {
      const saved =
        JSON.parse(localStorage.getItem("nexusWishlist")) || [];

      setWishlist(saved);
    };

    loadWishlist();

    window.addEventListener(
      "wishlistUpdated",
      loadWishlist
    );

    window.addEventListener(
      "storage",
      loadWishlist
    );

    return () => {
      window.removeEventListener(
        "wishlistUpdated",
        loadWishlist
      );

      window.removeEventListener(
        "storage",
        loadWishlist
      );
    };
  }, []);

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter(
      (product) => product.id !== id
    );

    localStorage.setItem(
      "nexusWishlist",
      JSON.stringify(updated)
    );

    setWishlist(updated);

    window.dispatchEvent(
      new Event("wishlistUpdated")
    );
  };

  return (
    <main className="account-page">

      <section className="account-header">

        <p className="hero-eyebrow">
          NEXUS ACCOUNT
        </p>

        <h1>YOUR ACCOUNT.</h1>

        <p>
          Manage your profile, wishlist, designs and orders.
        </p>

      </section>

      <section className="account-layout">

        {/* SIDEBAR */}

        <aside className="account-sidebar">

          <button
            className={
              activeTab === "profile"
                ? "account-nav active"
                : "account-nav"
            }
            onClick={() => setActiveTab("profile")}
          >
            <User size={18} />
            PROFILE
          </button>

          <button
            className={
              activeTab === "wishlist"
                ? "account-nav active"
                : "account-nav"
            }
            onClick={() => setActiveTab("wishlist")}
          >
            <Heart size={18} />
            WISHLIST
          </button>

          <Link
            to="/orders"
            className="account-nav"
          >
            <Package size={18} />
            ORDERS
          </Link>

        </aside>

        {/* CONTENT */}

        <div className="account-content">

          {activeTab === "profile" && (

            <div className="account-panel">

              <p className="hero-eyebrow">
                PROFILE
              </p>

              <h2>YOUR NEXUS PROFILE</h2>

              <div className="profile-placeholder">

                <div className="profile-avatar">
                  N
                </div>

                <div>
                  <h3>NEXUS MEMBER</h3>
                  <p>
                    Welcome to the Nexus community.
                  </p>
                </div>

              </div>

              <div className="account-actions">

                <button
                  type="button"
                  onClick={() => setActiveTab("wishlist")}
                >
                  VIEW WISHLIST
                </button>

                <Link to="/orders">
                  VIEW ORDERS
                </Link>

              </div>

            </div>

          )}

          {activeTab === "wishlist" && (

            <div className="account-panel">

              <div className="wishlist-heading">

                <div>
                  <p className="hero-eyebrow">
                    SAVED JERSEYS
                  </p>

                  <h2>YOUR WISHLIST</h2>
                </div>

                <span>
                  {wishlist.length} ITEMS
                </span>

              </div>

              {wishlist.length === 0 ? (

                <div className="empty-wishlist">

                  <Heart size={40} />

                  <h3>YOUR WISHLIST IS EMPTY.</h3>

                  <p>
                    Save jerseys you want to come back to.
                  </p>

                  <Link to="/shop">
                    EXPLORE COLLECTION
                  </Link>

                </div>

              ) : (

                <div className="wishlist-grid">

                  {wishlist.map((product) => (

                    <article
                      className="wishlist-card"
                      key={product.id}
                    >

                      <div
                        className="wishlist-visual"
                        style={{
                          "--product-accent":
                            product.accent
                        }}
                      >
                        <span>NEXUS</span>
                      </div>

                      <div className="wishlist-info">

                        <div>
                          <p>
                            {product.category}
                          </p>

                          <h3>
                            {product.name}
                          </h3>
                        </div>

                        <strong>
                          ₹
                          {product.price.toLocaleString(
                            "en-IN"
                          )}
                        </strong>

                      </div>

                      <div className="wishlist-actions">

                        <Link
                          to={`/product/${product.id}`}
                        >
                          VIEW PRODUCT
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            removeFromWishlist(product.id)
                          }
                          aria-label={`Remove ${product.name}`}
                        >
                          <Trash2 size={17} />
                        </button>

                      </div>

                    </article>

                  ))}

                </div>

              )}

            </div>

          )}

        </div>

      </section>

    </main>
  );
}

export default Account;