import axiosInstance from "./axiosInstance";

export const login = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/login", userData);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getProducts = async () => {
  try {
    const response = await axiosInstance.get("/products");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addNewProduct = async (newProduct) => {
  try {
    const response = await axiosInstance.post("/products/add", newProduct);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const updateProductData = async (updatedData, id) => {
  try {
    const response = await axiosInstance.put(`/products/${id}`, updatedData);

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const removeProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(`/products/${id}`);

    return response;
  } catch (error) {
    console.error(error);
  }
};
