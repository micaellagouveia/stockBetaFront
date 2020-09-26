import api from "../config/api";
class Product {
  async listProducts(userId) {
    const response = await api.get(`/products/${userId}`);
    return response.data;
  }

  async createProduct(name, price, user, category) {
    const response = await api.post(`/product/`, {
      name,
      price,
      user,
      category,
    });
    return response.data;
  }
}

export default new Product();
