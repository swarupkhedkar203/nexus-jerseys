
import { useState } from "react";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchQuery.trim();

    if (!query) {
      navigate("/shop");
      setSearchOpen(false);
      return;
    }

    navigate(`/shop?search=${encodeURIComponent(query)}`);
    setSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          NEXUS
        </Link>

        <nav className="navbar-links">
          <Link to="/shop">SHOP</Link>
          <Link to="/gallery">GALLERY</Link>
          <Link to="/drops">DROPS</Link>
          <Link to="/teams">TEAMS</Link>
          <Link to="/configurator">DESIGN</Link>
        </nav>

        <div className="navbar-actions">
          {/* SEARCH */}
          <button
            type="button"
            aria-label="Search"
            onClick={() => setSearchOpen((open) => !open)}
          >
            {searchOpen ? (
              <X size={19} />
            ) : (
              <Search size={19} />
            )}
          </button>

          {/* WISHLIST */}
          <button
            type="button"
            aria-label="Wishlist"
            onClick={() => navigate("/account?tab=wishlist")}
          >
            <Heart size={19} />
          </button>

          {/* CART */}
          <Link
            to="/cart"
            className="nav-icon"
            aria-label="Cart"
          >
            <ShoppingBag size={18} />
          </Link>

          {/* ACCOUNT */}
          <button
            type="button"
            aria-label="Account"
            onClick={() => navigate("/account")}
          >
            <User size={19} />
          </button>
        </div>
      </div>

      {searchOpen && (
        <form
          className="navbar-search-panel"
          onSubmit={handleSearch}
        >
          <Search size={19} />

          <input
            type="search"
            placeholder="Search jerseys..."
            aria-label="Search jerseys"
            value={searchQuery}
            onChange={(event) =>
              setSearchQuery(event.target.value)
            }
            autoFocus
          />

          <button type="submit">
            SEARCH
          </button>
        </form>
      )}
    </header>
  );
}

export default Navbar;
