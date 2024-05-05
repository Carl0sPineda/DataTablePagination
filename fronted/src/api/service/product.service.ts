import { AxiosError } from "axios";
import { axiosInstance } from "../config/axiosInstance";
import { Products } from "../../interfaces/product.interface";

export class ProductService {
  static getProducts = async (
    page: number,
    name: string
  ): Promise<Products> => {
    try {
      const { data } = await axiosInstance.get<Products>(
        `/products?_page=${page}&_name=${name}`
      );
      console.log(data);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        throw new Error(error.response?.data);
      }

      console.log(error);
      throw new Error("Unable to fetch products");
    }
  };
}
