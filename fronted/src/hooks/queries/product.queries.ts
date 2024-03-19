import { ProductService } from "../../api/service/product.service";
import { Products } from "../../interfaces/product.interface";
import { useQuery } from "@tanstack/react-query";

const useGetUsers = (page: number) => {
  return useQuery<Products>({
    queryKey: ["products", page],
    queryFn: () => ProductService.getProducts(page),
  });
};

export { useGetUsers };
