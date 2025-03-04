import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../redux/productSlice";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";

const Products = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);

  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    category: "",
  });
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddProduct = (e) => {
    e.preventDefault();
    dispatch(addProduct(newProduct));
    setNewProduct({ title: "", price: "", category: "" });
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    if (editProduct) {
      dispatch(updateProduct({ id: editProduct.id, updatedData: editProduct }));
      setEditProduct(null);
    }
  };

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div>
      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <AddProduct
        handleAddProduct={handleAddProduct}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
      />

      {editProduct && (
        <EditProduct
          editProduct={editProduct}
          handleUpdateProduct={handleUpdateProduct}
          setEditProduct={setEditProduct}
        />
      )}

      <h2>Product List</h2>

      {!loading && !error && (
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Price ($)</th>
              <th>Category</th>
              <th>Thumbnail</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>
                  <img src={product.thumbnail} alt={product.title} width="50" />
                </td>
                <td>
                  <button onClick={() => setEditProduct(product)}>Edit</button>
                  <button onClick={() => handleDeleteProduct(product.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Products;
