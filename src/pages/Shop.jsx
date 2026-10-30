import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import products from "../data/products";
import ProductCard from "../components/common/ProductCard";

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize the search input from the URL.
  const [search, setSearch] = useState(
    () => searchParams.get("search") || ""
  );

  // Keep the input synchronized when the URL search parameter changes.
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  // Update the URL after the user stops typing.
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const nextSearch = search.trim();
      const currentSearch = searchParams.get("search") || "";

      // Avoid unnecessary URL updates.
      if (nextSearch === currentSearch) return;

      // Preserve unrelated query parameters.
      const nextParams = new URLSearchParams(searchParams);

      if (nextSearch) {
        nextParams.set("search", nextSearch);
      } else {
        nextParams.delete("search");
      }

      setSearchParams(nextParams, { replace: true });
    }, 250);

    // Cancel the pending update if the user types again.
    return () => clearTimeout(timeoutId);
  }, [search, searchParams, setSearchParams]);

  // Normalize the search query.
  const query = search.trim().toLowerCase();

  // Filter products by name, category, style, or description.
  const filteredProducts = products.filter((product) => {
    const searchableText = [
      product.name,
      product.category,
      product.style,
      product.description,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchableText.includes(query);
  });

  // Clear the search input.
  const clearSearch = () => {
    setSearch("");
  };

  return (
    <main className="shop-page">
      {/* Shop heading and search */}
      <section className="shop-hero">
        <p className="hero-eyebrow">NEXUS COLLECTION</p>

        <h1>BUILT FOR YOUR GAME.</h1>

        <p>
          Explore designs created around different player identities.
        </p>

        <div className="shop-search">
          <Search size={19} aria-hidden="true" />

          <input
            type="search"
            placeholder="Search jerseys..."
            aria-label="Search jerseys"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          {search && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </section>

      {/* Product listing */}
      <section className="shop-products">
        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="no-products">
            <h2>NO JERSEYS FOUND.</h2>

            <p>
              Try searching for another jersey, category, or style.
            </p>

            <button
              type="button"
              onClick={clearSearch}
            >
              VIEW ALL JERSEYS
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default Shop;