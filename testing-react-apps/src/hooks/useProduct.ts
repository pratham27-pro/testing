import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import type { Product } from "../entities";

const useProduct = (productId: number) => {
  return useQuery<Product | null, Error>({
    queryKey: ["products", productId],
    queryFn: () => fetchProduct(productId),
  });
};

const fetchProduct = async (id: number): Promise<Product | null> => {
  try {
    if (isNaN(id)) return null;

    const { data } = await axios.get<Product>(`/products/${id}`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 404)
      return null;

    throw error;
  }
};

export default useProduct;
