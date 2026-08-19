import { Search, SlidersHorizontal, Star, Heart, ShoppingCart } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import { categories } from "../../data/products";

function Products() {
  const { products, addToCart, toggleWishlist, isWishlisted } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const activeCategory = searchParams.get("category") || "All";
  const sort = searchParams.get("sort") || "featured";

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const nextProducts = products
      .filter((product) => activeCategory === "All" || product.category === activeCategory)
      .filter((product) =>
        [product.name, product.category, product.description]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery),
      );

    if (sort === "price-low") return [...nextProducts].sort((a, b) => a.price - b.price);
    if (sort === "price-high") return [...nextProducts].sort((a, b) => b.price - a.price);
    if (sort === "deal") return [...nextProducts].sort((a, b) => b.oldPrice - b.price - (a.oldPrice - a.price));
    return [...nextProducts].sort((a, b) => b.rating - a.rating);
  }, [activeCategory, products, query, sort]);

  const setCategory = (category) => {
    const next = new URLSearchParams(searchParams);
    if (category === "All") next.delete("category");
    else next.set("category", category);
    setSearchParams(next);
  };

  const setSort = (value) => {
    const next = new URLSearchParams(searchParams);
    next.set("sort", value);
    setSearchParams(next);
  };

  return (
    <section className="page-shell">
      <div className="page-heading">
        <span>Shop</span>
        <h1>Products Ready To Purchase</h1>
        <p>Filter, compare, wishlist, and add items to cart from a complete client-ready catalog.</p>
      </div>

      <div className="shop-toolbar">
        <label className="search-field">
          <Search size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products"
          />
        </label>

        <label className="select-field">
          <SlidersHorizontal size={18} />
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="featured">Top rated</option>
            <option value="deal">Best deals</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
          </select>
        </label>
      </div>

      <div className="category-tabs">
        {categories.map((category) => (
          <button
            className={activeCategory === category ? "active" : ""}
            key={category}
            onClick={() => setCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="product-grid shop-grid">
        {filteredProducts.map((item) => (
          <div className="product-card" key={item.id}>
            <Link to={`/products/${item.id}`} className="product-image">
              <span className="product-badge">{item.badge}</span>
              <img src={item.image} alt={item.name} />
            </Link>
            <div className="product-info">
              <div className="product-meta">
                <span>{item.category}</span>
                <span><Star size={15} fill="currentColor" /> {item.rating}</span>
              </div>
              <Link to={`/products/${item.id}`}><h3>{item.name}</h3></Link>
              <p className="product-copy">{item.description}</p>
              <div className="price-row">
                <strong>${item.price}</strong>
                <del>${item.oldPrice}</del>
              </div>
              <div className="product-actions">
                <button onClick={() => addToCart(item)}>
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
                <button
                  className={isWishlisted(item.id) ? "wish active" : "wish"}
                  onClick={() => toggleWishlist(item)}
                  aria-label="Toggle wishlist"
                >
                  <Heart size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="empty-state">
          <h2>No products found</h2>
          <p>Try a different category or search term.</p>
        </div>
      )}
    </section>
  );
}

export default Products;
