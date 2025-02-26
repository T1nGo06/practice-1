import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";

const categories = [
  "All",
  "men's clothing",
  "women's clothing",
  "electronics",
  "jewelery",
];

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const filteredProducts =
    filter === "All"
      ? products
      : products.filter((product) => product.category === filter);

  return (
    <div className="container">
      <h1 className="title">Product List</h1>
      <div className="filter-buttons">
        {categories.map((category) => (
          <button
            key={category}
            className={filter === category ? "active" : ""}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="spinner">Loading...</div>
      ) : (
        <div className="product-list">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.title} className="product-image" />
              <h2 className="product-title">{product.title}</h2>
              <p className="product-category">{product.category}</p>
              <p className="product-price">${product.price}</p>
              {cart[product.id] ? (
                <div className="cart-controls">
                  <button onClick={() => removeFromCart(product.id)}>-</button>
                  <span>{cart[product.id].quantity}</span>
                  <button onClick={() => addToCart(product)}>+</button>
                </div>
              ) : (
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
