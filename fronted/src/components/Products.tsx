import { useState } from "react";
import { useGetAllsProducts } from "../hooks/queries/product.queries";

const Products = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data: productData } = useGetAllsProducts(pageNumber);

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
      <div className="mt-4 mx-4">
        <div className="flex justify-between mb-4">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Buscar..."
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
          {/* Additional Filtering Buttons */}
          <div className="space-x-2">
            <button className="bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded-md">
              Filtrar por Marca
            </button>
            <button className="bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded-md">
              Filtrar por Año
            </button>
            <button className="bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded-md">
              Filtrar por Año
            </button>
            <button className="bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded-md">
              Filtrar por Año
            </button>
            {/* Add more buttons for additional filtering options if needed */}
          </div>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          {/* Table */}
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            {/* Table Header */}
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              {/* Table Header Columns */}
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3">
                  Precio
                </th>
                <th scope="col" className="px-6 py-3">
                  Marca
                </th>
                <th scope="col" className="px-6 py-3">
                  Año del Modelo
                </th>
                <th scope="col" className="px-6 py-3">
                  Cantidad
                </th>
                <th scope="col" className="px-6 py-3">
                  Color
                </th>
                <th scope="col" className="px-6 py-3">
                  Disponibilidad
                </th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {/* Mapping through product data to populate table rows */}
              {productData?.products.map((product) => (
                <tr
                  key={product.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td
                    scope="row"
                    className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {product.name}
                  </td>
                  <td className="px-6 py-4">${product.price}</td>
                  <td className="px-6 py-4">{product.brand}</td>
                  <td className="px-6 py-4">{product.model_year}</td>
                  <td className="px-10 py-4">{product.quantity}</td>
                  <td className="px-6 py-4">{product.color}</td>
                  <td className="px-6 py-4">
                    {product.availability ? "Disponible" : "Agotado"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {productData && (
          <div className="flex justify-center mt-4 mb-8">
            {/* Pagination Buttons */}
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
        )}
      </div>
    </>
  );
};

export default Products;
