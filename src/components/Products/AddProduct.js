import React from "react";

const AddProduct = ({ handleAddProduct, newProduct, setNewProduct }) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <h3>Add Product</h3>
      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          placeholder="Title"
          value={newProduct.title}
          onChange={(e) =>
            setNewProduct({ ...newProduct, title: e.target.value })
          }
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) =>
            setNewProduct({ ...newProduct, category: e.target.value })
          }
          required
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
