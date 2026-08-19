import "./Categories.css";
import { Link } from "react-router-dom";

import electronics from "../../assets/categories/electronics.png";
import fashion from "../../assets/categories/fashion.png";
import furniture from "../../assets/categories/furniture.png";
import beauty from "../../assets/categories/beauty.png";
import watch from "../../assets/categories/watch.png";
import shoes from "../../assets/categories/shoes.png";

const categories = [
  {
    id: 1,
    title: "Electronics",
    image: electronics,
  },
  {
    id: 2,
    title: "Fashion",
    image: fashion,
  },
  {
    id: 3,
    title: "Furniture",
    image: furniture,
  },
  {
    id: 4,
    title: "Beauty",
    image: beauty,
  },
  {
    id: 5,
    title: "Watches",
    image: watch,
  },
  {
    id: 6,
    title: "Shoes",
    image: shoes,
  },
];

function Categories() {
  return (
    <section className="categories section">
      <div className="container">

        <div className="section-title">
          <span>Top Collection</span>
          <h2>Shop by Category</h2>
          <p>
            Find your favorite products from our premium collections.
          </p>
        </div>

        <div className="category-grid">
          {categories.map((item) => (
            <Link
              className="category-card"
              key={item.id}
              to={`/products?category=${item.title === "Watches" ? "Watches" : item.title}`}
            >
              <div className="category-image">
                <img src={item.image} alt={item.title} />
              </div>

              <h3>{item.title}</h3>

              <span className="category-action">
                Explore
              </span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Categories;
