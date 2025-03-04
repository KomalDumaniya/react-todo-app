import React from "react";

const EditProduct = ({ handleUpdateProduct, editProduct, setEditProduct }) => {
  return (
    <div
      style={{
        marginBottom: "10px",
      }}
    >
      <h3>Edit Product</h3>
      <form onSubmit={handleUpdateProduct}>
        <input
          type="text"
          value={editProduct.title}
          onChange={(e) =>
            setEditProduct({ ...editProduct, title: e.target.value })
          }
        />
        <input
          type="number"
          value={editProduct.price}
          onChange={(e) =>
            setEditProduct({ ...editProduct, price: e.target.value })
          }
        />
        <input
          type="text"
          value={editProduct.category}
          onChange={(e) =>
            setEditProduct({ ...editProduct, category: e.target.value })
          }
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditProduct;
