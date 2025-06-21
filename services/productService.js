import { products } from "../data";

export const getProductList = async () => {
  return { products: products };
};
