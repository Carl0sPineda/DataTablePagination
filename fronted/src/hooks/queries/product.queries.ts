import { ProductService } from "../../api/service/product.service";
import { Products } from "../../interfaces/product.interface";
import { useQuery } from "@tanstack/react-query";

const useGetAllsProducts = (page: number, name: string) => {
  return useQuery<Products>({
    queryKey: ["products", page, name],
    queryFn: () => ProductService.getProducts(page, name),
  });
};

export { useGetAllsProducts };
