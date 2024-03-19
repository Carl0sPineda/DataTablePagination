import { useState } from "react";
import { useGetAllsProducts } from "../hooks/queries/product.queries";

const Products = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data: productData, error } = useGetAllsProducts(pageNumber);

  const goToNextPage = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const goToPreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber((prevPageNumber) => prevPageNumber - 1);
    }
  };

  return (
    <>
      <h1 className="text-red-800 text-4xl text-center">Productos</h1>
      {error && <p>Error: {error.message}</p>}
      <div className="flex justify-center mt-4">
        <button
          onClick={goToPreviousPage}
          disabled={pageNumber === 1}
          className={`${
            pageNumber === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300 text-gray-800 hover:text-gray-900"
          } font-bold py-2 px-4 mr-2 rounded-l`}
        >
          Anterior
        </button>
        <span className="py-2 px-4 bg-gray-200">
          {pageNumber}/{productData?.totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={pageNumber === productData?.totalPages}
          className={`${
            pageNumber === productData?.totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300 text-gray-800 hover:text-gray-900"
          } font-bold py-2 px-4 ml-2 rounded-r`}
        >
          Siguiente
        </button>
      </div>
      <div className="mt-4 mx-4">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-2 text-center">Nombre</th>
              <th className="px-4 py-2 text-center">Precio</th>
              <th className="px-4 py-2 text-center">Marca</th>
              <th className="px-4 py-2 text-center">Año del Modelo</th>
              <th className="px-4 py-2 text-center">Cantidad</th>
              <th className="px-4 py-2 text-center">Color</th>
              <th className="px-4 py-2 text-center">Disponibilidad</th>
            </tr>
          </thead>
          <tbody>
            {productData?.products.map((product) => (
              <tr key={product.id} className="bg-gray-200 text-gray-800">
                <td className="border px-4 py-2 text-center">{product.name}</td>
                <td className="border px-4 py-2 text-center">
                  ${product.price}
                </td>
                <td className="border px-4 py-2 text-center">
                  {product.brand}
                </td>
                <td className="border px-4 py-2 text-center">
                  {product.model_year}
                </td>
                <td className="border px-4 py-2 text-center">
                  {product.quantity}
                </td>
                <td className="border px-4 py-2 text-center">
                  {product.color}
                </td>
                <td className="border px-4 py-2 text-center">
                  {product.availability ? "Disponible" : "Agotado"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Products;
